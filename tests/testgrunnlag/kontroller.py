# /// script
# requires-python = ">=3.11"
# dependencies = ["reportlab==4.4.5", "pypdf==6.2.0"]
# ///
"""Kontroll av testmateriale, ikke av Supersøker. Kjør fra valgfri mappe."""

import argparse
import hashlib
import json
import sys
from pathlib import Path

from pypdf import PdfReader
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import simpleSplit
from reportlab.pdfgen import canvas

BASE = Path(__file__).resolve().parent
ROOT = BASE.parents[1]
ORIGINAL = ROOT / "tests/fixtures/job-applications"
NO_REQUIREMENTS = (
    "Vi fant ingen tydelige krav i annonsen. Du kan rette annonsen eller lage tekst "
    "basert på CV-en og opplysningene du har gitt."
)


def require(condition, message):
    if not condition:
        raise ValueError(message)


def unique_keys(pairs):
    result = {}
    for key, value in pairs:
        require(key not in result, f"Duplisert JSON-nøkkel: {key}")
        result[key] = value
    return result


def read_json(path):
    return json.loads(path.read_text(encoding="utf-8"), object_pairs_hook=unique_keys)


def normalized(text):
    return " ".join(text.split())


def check_sources():
    manifest = read_json(BASE / "kildegrunnlag.json")
    expected = {item["path"] for item in manifest["filer"]}
    actual = {p.relative_to(ROOT).as_posix() for p in ORIGINAL.rglob("*") if p.is_file()}
    original_expected = {p for p in expected if p.startswith("tests/fixtures/")}
    require(actual == original_expected, "Originalmappen har nye eller manglende filer")
    require(len(actual) == 13, "Forventet README og fire originale testpar à tre filer")
    for item in manifest["filer"]:
        require(hashlib.sha256((ROOT / item["path"]).read_bytes()).hexdigest() == item["sha256"],
                f"Endret kilde: {item['path']}")
    print("Kilder: 13 originalfiler og PRD samsvarer bytevis med registrert SHA-256.")


def generate_pdfs():
    (BASE / "pdf").mkdir(exist_ok=True)
    for source in sorted(ORIGINAL.glob("*/cv.txt")):
        target = BASE / "pdf" / (source.parent.name + ".pdf")
        pdf = canvas.Canvas(str(target), pagesize=A4, invariant=1, pageCompression=1)
        pdf.setTitle(f"Fiktiv CV – {source.parent.name}")
        pdf.setAuthor("Supersøker – fiktive testdata")
        width, height = A4
        y = height - 48
        pdf.setFont("Helvetica", 10)
        for line in source.read_text(encoding="utf-8").splitlines():
            for wrapped in simpleSplit(line, "Helvetica", 10, width - 96) or [""]:
                if y < 48:
                    pdf.showPage()
                    pdf.setFont("Helvetica", 10)
                    y = height - 48
                pdf.drawString(48, y, wrapped)
                y -= 13
        pdf.save()
    print("Generert fire tekstbaserte PDF-er under tests/testgrunnlag/pdf/.")


def check_pdfs():
    sources = sorted(ORIGINAL.glob("*/cv.txt"))
    require({p.name for p in (BASE / "pdf").glob("*.pdf")} ==
            {p.parent.name + ".pdf" for p in sources}, "Forventet nøyaktig fire PDF-er")
    for source in sources:
        target = BASE / "pdf" / (source.parent.name + ".pdf")
        reader = PdfReader(target)
        require(not reader.is_encrypted, f"Kryptert PDF: {target.name}")
        require(len(reader.pages) > 0, f"Ingen sider: {target.name}")
        require(all(not list(page.images) for page in reader.pages), f"Bilde i PDF: {target.name}")
        extracted = "\n".join(page.extract_text() or "" for page in reader.pages)
        original = source.read_text(encoding="utf-8")
        require(normalized(extracted) == normalized(original), f"PDF-tekst avviker: {target.name}")
        for char in "æøåÆØÅ":
            require(extracted.count(char) == original.count(char),
                    f"Norsk tegn {char} avviker: {target.name}")
        for heading in ["UTDANNING", "ARBEIDSERFARING", "SPRÅK"]:
            require(heading in extracted, f"Mangler {heading}: {target.name}")
        answer = read_json(source.parent / "fasit.json")
        for requirement in answer["krav"]:
            if requirement["status"] == "dekket":
                require(normalized(requirement["kilde"]) in normalized(extracted),
                        f"Fasitsitat mangler i PDF: {target.name}/{requirement['id']}")
        print(f"PDF {target.name}: {len(reader.pages)} side(r), full tekst og norske tegn OK, ingen bilder.")


def check_requirements(answer, cv, ad):
    ids = [r["id"] for r in answer["krav"]]
    require(len(ids) == len(set(ids)), "Dupliserte krav-ID-er")
    for item in answer["krav"]:
        require(item["status"] in ["dekket", "mangler"], "Ukjent kompetansestatus")
        require(bool(item["annonsekilde"]) and item["annonsekilde"] in ad,
                f"Krav mangler i annonsen: {item['id']}")
        if item["status"] == "dekket":
            require(bool(item.get("kilde")) and item["kilde"] in cv,
                    f"CV-sitat er ikke ordrett: {item['id']}")
        else:
            require("kilde" not in item, "Manglende krav skal ikke ha dokumenterende sitat")
    expected = answer["forventet"]
    covered = sum(r["status"] == "dekket" for r in answer["krav"])
    missing = [r["id"] for r in answer["krav"] if r["status"] == "mangler"]
    require(expected["kompetansekrav"] == len(ids) and expected["dokumentert"] == covered
            and expected["mangler"] == len(missing), "Feil kompetanseopptelling")
    require(expected["svarfelt_for"] == missing, "Svarfelt skal bare gjelde manglende kompetansekrav")
    require(expected["alle_kompetansekrav_dokumentert"] == (bool(ids) and not missing),
            "Feil alle-dokumentert-forventning")


def check_scenarios():
    folders = sorted((BASE / "scenarioer").iterdir())
    require({f.name for f in folders} ==
            {"t8-kompetanse-og-vilkar", "t8-bare-vilkar", "t9-uten-krav"}, "Uventede scenarioer")
    for folder in folders:
        answer = read_json(folder / "fasit.json")
        cv = (folder / "cv.txt").read_text(encoding="utf-8")
        ad = (folder / "annonse.txt").read_text(encoding="utf-8")
        require(answer["schema_versjon"] == 1 and answer["fiktivt"] is True, "Feil versjon/fiktiv-markering")
        require(answer["scenario"] == folder.name and answer["test_id"] ==
                ("T-8" if folder.name.startswith("t8-") else "T-9"), "Feil scenario/test-ID")
        require(answer["teststatus"] == "Ikke kjørt", "App-/KI-test er ikke utført")
        check_requirements(answer, cv, ad)
        if answer["test_id"] == "T-8":
            require(len(answer["ansettelsesvilkar"]) == 1, "Forventet ett separat vilkår")
            for item in answer["ansettelsesvilkar"]:
                require(set(item) == {"id", "vilkar", "annonsekilde"}, "Vilkår har kompetansefelt")
                require(item["id"] == "politiattest" and item["annonsekilde"] in ad, "Vilkår mangler")
                require(item["vilkar"] == item["annonsekilde"] ==
                        "Politiattest må fremlegges før tiltredelse.", "Vilkårstekst og kilde avviker")
            expected = answer["forventet"]
            require(expected["vilkar_separat"] is True and
                    all(expected[k] is False for k in ["vilkar_har_status", "vilkar_har_svarfelt",
                                                       "vilkar_telles_som_kompetanse"]), "Feil vilkårskontrakt")
            require(answer["stilling"]["tittel"] in ad and answer["stilling"]["arbeidsgiver"] in ad,
                    "Stillingsopplysninger mangler")
            if folder.name == "t8-bare-vilkar":
                require(not answer["krav"] and expected["melding"] ==
                        "Vi fant ingen tydelige kompetansekrav i annonsen.", "Feil tomtilstand for vilkår")
            else:
                require({r["id"] for r in answer["krav"]} ==
                        {"kundeservice", "norsk", "forerkort-b"}, "Feil kompetansekrav i blandet scenario")
                require(expected["ubesvarte_krav_utelates_fra_forslag"] == ["forerkort-b"] and
                        expected["veiledning_utenfor_tekst"] is True and
                        expected["veiledning_folger_ikke_kopiering"] is True, "Feil utelatelsesregel")
            require(expected["begge_resultattyper_mulig"] and expected["kan_rette_annonse"], "Feil valg")
        else:
            require(answer["test_id"] == "T-9" and not answer["krav"]
                    and not answer["ansettelsesvilkar"], "T-9 skal ha null krav og vilkår")
            require(answer["forventet"]["melding"] == NO_REQUIREMENTS, "Feil T-9-melding")
            require(all(answer["forventet"][k] is True for k in
                        ["begge_resultattyper_mulig", "kan_rette_annonse", "ingen_oppdiktede_krav"]),
                    "Feil T-9-handlinger eller ærlighetsforventning")
            variants = answer["varianter"]
            require({v["id"] for v in variants} == {"grunnscenario", "mangler-tittel", "mangler-arbeidsgiver",
                    "mangler-begge", "tvetydig-tittel", "tvetydig-arbeidsgiver", "tvetydig-begge"}
                    and len(variants) == 7, "T-9-varianter mangler eller er duplisert")
            for variant in variants:
                ad_path = (folder / variant["annonsefil"]).resolve()
                require(ad_path.is_relative_to(folder.resolve()), "Annonsefil utenfor scenario")
                variant_ad = ad_path.read_text(encoding="utf-8")
                check_requirements(answer, cv, variant_ad)
                found = variant["funnet_stilling"]
                require(set(found) == set(variant["stilling_etter_avklaring"]) ==
                        {"tittel", "arbeidsgiver"}, "Feil felter i stilling")
                require(set(variant["etterspor"]) == {k for k, v in found.items() if v is None},
                        "Feil avklaringsfelt")
                require(set(variant["brukersvar"]) == set(variant["etterspor"]), "Feil svarfelt")
                for field, value in found.items():
                    require(value is None or value in variant_ad, "Funnet stilling står ikke i annonsen")
                    final = variant["brukersvar"].get(field, value)
                    require(isinstance(final, str) and bool(final.strip()) and
                            final == variant["stilling_etter_avklaring"][field], "Feil sluttverdi")
            rules = answer["avklaringsregler"]
            require(all(not v.strip() for v in rules["blanke_svar"]), "Blanke kontrollverdier er ikke blanke")
            require(rules["avvis_blankt"] and rules["analyse_blokkert_for_avklaring"], "Feil avklaringsregler")
            usages = ["analyseoverskrift", "helt_soknadsutkast", "forslag_til_formuleringer"]
            require(rules["funnet_stilling_kan_rettes"] is True and
                    rules["ingen_kvalifikasjoner_utover_cv_og_svar"] is True and
                    rules["bruk_avklart_stilling_i"] == usages, "Feil bruk av avklart stilling")
            ground = variants[0]["stilling_etter_avklaring"]
            require(all(any(v["stilling_etter_avklaring"][field] != ground[field] for v in variants)
                        for field in ["tittel", "arbeidsgiver"]), "Avklaringer må avsløre faste standardverdier")
            correction = answer["retting_av_funnet_stilling"]
            require(correction["variant"] == "grunnscenario" and correction["bruk_i"] == usages,
                    "Feil rettingsscenario")
            require(set(correction["brukerretting"]) == set(correction["forventet_stilling"]) ==
                    {"tittel", "arbeidsgiver"}, "Retting mangler stillingsfelt")
            require(correction["brukerretting"] == correction["forventet_stilling"] and
                    all(isinstance(value, str) and bool(value.strip()) and value != ground[field]
                        for field, value in correction["brukerretting"].items()), "Feil rettet stilling")
        print(f"Fasit {folder.name}: struktur, krav, sitater og opptelling OK.")
    print("T-9: 7 annonsevarianter med eksisterende filer og konsistente avklaringsfelt/sluttverdier.")


def main():
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--lag-pdf", action="store_true", help="Generer bare de fire nye PDF-variantene før kontroll")
    args = parser.parse_args()
    check_sources()
    for path in BASE.rglob("*.json"):
        read_json(path)
    print("Alle nye JSON-filer kan parses; ingen dupliserte nøkler.")
    if args.lag_pdf:
        generate_pdfs()
    check_pdfs()
    check_scenarios()
    print("BESTÅTT: datakontroll. App-, mock-, KI- og installasjonstester: Ikke kjørt.")


if __name__ == "__main__":
    main()
