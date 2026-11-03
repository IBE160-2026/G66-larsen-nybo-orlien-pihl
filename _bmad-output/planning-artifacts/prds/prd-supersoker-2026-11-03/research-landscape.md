---
title: "Research digest: landscape, Norwegian context, regulation and failure modes for Supersøker"
status: input-to-prd
created: 2026-11-03
method: Web research (WebSearch/WebFetch), 2026-11-03. AI-assisted; sources listed per section.
---

# Research digest: Supersøker landscape

This digest supports the Supersøker PRD. Supersøker is a Norwegian web app where a job seeker provides their CV/background and a job ad, and OpenAI-based AI helps tailor the CV and write a søknad in Norwegian.

**How reliable this is:** Pricing figures come mostly from third-party review sites and often disagree with each other. Treat them as rough levels and check the vendor pages before you rely on them. Legal points are research notes, not legal advice. Dates for the AI Act in Norway are still moving (see §3.4). Where a statement is my own reading or comes from background knowledge without a source fetched in this session, it is marked **[unverified]**.

---

## 1. Comparable products

| Product | Positioning | Key features | Pricing (approx.) | Strengths | Weaknesses (vs. Supersøker) |
|---|---|---|---|---|---|
| **Teal** (US) | Job-search "career OS": resume builder + job tracker | Resume builder, job tracker (browser extension), keyword match against job description, AI bullet points/summaries, cover-letter generator | Free tier (unlimited resumes and tracking, few AI credits, ~1 cover letter); Teal+ ~USD 29/mo (sources also say $9/wk or $13/wk) | Generous free tier; tracking + tailoring in one workflow | English/US-centric; reviewers call cover letters "a starting point that needs editing"; no Norwegian conventions |
| **Kickresume** (SK/EU) | Template-led resume and cover-letter builder with an AI writer | AI writer from job title + description, ATS checker, 40+ cover-letter templates, multilingual sites | ~USD 24/mo per official page; third-party listings show €14–16/mo on longer billing | Polished design templates; EU-based company | AI writer is paywalled; output is generic unless edited; not built around Norwegian søknad norms |
| **Rezi** (US) | ATS-optimisation resume builder | AI resume writer, "Rezi Score", keyword targeting, cover-letter and resignation-letter builders | Free (1 resume, 3 PDFs); Pro USD 29/mo; Lifetime ~USD 149 | Strong ATS/keyword focus; lifetime option | Its keyword focus pushes toward stuffing (see §4); US-format resumes |
| **Jobscan** (US) | ATS "match-rate" scanner | Compares resume against a job ad, reports keyword overlap, recommends ~75% match rate; LinkedIn optimisation | Free 5 scans/mo; Premium ~USD 49.95/mo | Clear, measurable "fit" feedback | Expensive; the score measures keyword overlap, not quality; English-centric |
| **Huntr** (US) | Job tracker with AI documents | Kanban job tracker, AI-tailored resumes, unlimited AI cover letters (Pro), job matching | Free tracker + limited AI credits; Pro ~USD 40/mo | Good pipeline/tracking UX | Most AI features are Pro-only; no Norwegian focus |
| **Enhancv** (US, localised NB site) | Resume builder with a localised "søknadsbrev-generator" | Upload CV + fill in position/company → templated letter; AI CV builder | Free generator, paid builder | Has a Norwegian-language landing page | Machine-translated feel; template-driven structure; no evidence of Norwegian-quality output |
| **FINN jobb** (NO; market leader for job ads) | Job board adding AI assistance | SmartSøk (AI job matching from a free-text self-description), an AI assistant for application text on "Enkel søknad" ads, autofill from profile, free CV builder, salary comparison; a career advisor was in testing in autumn 2025 | Free for job seekers | Owns the job ads and the traffic; free; Norwegian language | Help is tied to FINN ads and the "Enkel søknad" flow; publicly documented features are shallow; does not tailor the CV per ad |
| **NAV / arbeidsplassen.no** (NO, public) | Public job service | CV on arbeidsplassen (shared with Nav while registered; employers may use CVs only for recruitment), tips on søknad and CV | Free | Trusted; huge reach | No AI tailoring; generic advice ("tilpass søknaden til annonsen") |
| **ChatGPT used directly** (and other general chatbots) | Default baseline for many users | Free-form drafting in Norwegian | Free / ~USD 20/mo | Free, flexible, good Norwegian | Needs prompting skill; invents details freely; no structure, no checks against Norwegian norms; on consumer plans, chats may be used for training unless the user opts out **[unverified for current terms]** |

**Other Nordic signals:**
- **ApplyNow** is a Norwegian-language mobile app: upload a CV, paste a FINN link, and get a tailored søknad, plus templates and deadline reminders. These claims come from the developer's store listing, and the listing page has since gone offline (HTTP 410). This is the closest match to Supersøker's core flow.
- **NordApply** is an AI CV and cover-letter tool from a job URL, in English and Swedish, with makers active since April 2026.
- **Karriereveiledning.no** (HK-dir, public) offers free chat guidance and a tool for a first draft of a søknad. Whether that tool uses AI is not confirmed.

**What the market shows:**
- The global tools compete on ATS keywords and templates.
- The Norwegian players (FINN, NAV) compete on reach and on being free.
- No product found makes all three of these its main promise:
  1. idiomatic Norwegian søknad/CV that follows local conventions,
  2. verifiable no-fabrication guarantees,
  3. transparent privacy for Norwegian users.

Sources:
- Teal: https://www.weekday.works/post/teal-hq-review · https://makerstack.co/reviews/teal-review/ · https://frontdeskreview.com/software/resume-builders/teal/
- Kickresume: https://www.kickresume.com/pricing · https://www.capterra.com/p/180489/Kickresume-for-Business/pricing/ · https://coverlettercopilot.ai/blog/kickresume-cover-letter-generator-review
- Rezi: https://www.rezi.ai/pricing · https://toolradar.com/tools/rezi/pricing · https://resumegenius.com/reviews/rezi-ai-review
- Jobscan: https://jobright.ai/blog/jobscan-review-2026-walkthrough-features-and-alternatives/ · https://blog.theinterviewguys.com/?p=10428
- Huntr: https://huntr.co/pricing · https://www.weekday.works/post/huntr-review
- Enhancv NB: https://enhancv.com/nb-no/soknadsbrev-generator/
- FINN: https://www.finn.no/bedriftskunde/aktuelt/jobbindeks/ai-endrer-spillereglene-i-jobbsoking · https://www.finn.no/job/artikler/jobbsoknad/finn-ai-ung-arbeidsmarkedet · https://www.finn.no/job/assistant/search · https://www.finn.no/bedriftskunde/aktuelt/jobbindeks/skille-seg-ut-soknad
- NAV: https://www.nav.no/soknaden-og-cv · https://www.nav.no/arbeidsplassen/cv · https://arbeidsplassen.nav.no/vilkar
- ApplyNow: https://mwm.ai/apps/applynow/6755319281 (now 410)
- NordApply: https://www.producthunt.com/products/nordapply/makers
- Karriereveiledning.no: https://euroguidance.eu/karriereveiledning-no-digital-career-guidance-for-norways-population · https://utdanning.no/yrkesfag/fullfort-yrkesfag-hva-na/jobb-etter-yrkesfag/soke-ny-jobb-slik-er-prosessen/slik-skriver-du-en-jobbsoknad

---

## 2. Norwegian context

### 2.1 Conventions for søknad and CV

**Søknadsbrev:**
- **Length:** About one page, never more. DN says "aldri mer enn én side". Commercial guides suggest about 300–500 words.
- **Structure:**
  1. Overskrift (the position, and where the ad was seen)
  2. Greeting (a name if known, otherwise e.g. "Til rekrutteringsansvarlig")
  3. Innledning (who you are and which role)
  4. Hoveddel (why you fit, with concrete experience)
  5. Avslutning (motivation, ask for an interview)
  6. "Med vennlig hilsen"
  7. Vedlegg (list the CV; attach certificates only if requested)
- **Tone:** Direct, concise, polite and fairly formal. It should be personal and concrete about motivation ("hvorfor du vil ha jobben, og hvorfor du passer"). Leave out salary expectations unless the ad asks for them.
- **Language:** Write in Norwegian for Norwegian-language roles. English is OK for international companies.

**CV:**
- Use stikkord and bullet points, tailored to the ad.
- Reverse chronological order is the norm **[unverified, general practice]**.
- The "max one page" rule is no longer strict. Keep it concise.
- People with little experience can include volunteering, languages, IT skills and courses (NAV).
- Two to three references are typical (utdanning.no).
- **Product implication:** Norway's public sector (e.g. Skatteetaten) wants CVs that document competence, projects and results, tailored to each position. "En generisk CV fungerer sjelden."

**Bokmål vs. nynorsk:** Applicants may need nynorsk, especially for public-sector roles in western Norway **[unverified, design consideration]**. This is a possible differentiator no competitor addresses.

### 2.2 How Norwegian employers view AI-written applications (2025–2026)

**FINN Jobbindeks 2025** (survey of 400–410 FINN users, April 2025; published 26 May 2025):
- **Job seekers:** 36% of job seekers have used AI for their CV or søknad (44% in a February 2025 survey). Among AI users, 42% say AI made their letters better. 21% deliberately avoid AI, and about 1 in 5 consider it cheating.
- **Recruiters:**
  - 86% notice when candidates use AI, and 69% say applications are becoming more impersonal.
  - Recruiters therefore weight competence, experience and results more heavily early in the process.
  - Recurring quotes: "Det viktigste er ikke om du har brukt AI, men hvordan du har brukt det" (Teft) and "et verktøy, ikke juks" (Baneservice).
- **The cover letter is losing ground; the CV gains:**
  - In 2024, Skatteetaten (770 postings) asked only for a CV in most ads. They called the cover letter "unødvendig støy" and a source of bias, for example from language errors and storytelling skill.
  - FINN's product director says the søknadsbrev is "no longer important" and the CV is now "nøkkeldokumentet".
  - FINN is building AI into its own application flow (SmartSøk plus an application-text helper).

**NHH study** (Olsen, Fiksdal & Halmrast, *Praktisk økonomi & ledelse*; NHH Bulletin, 18 Aug 2026): qualitative interviews with recruiters.
- AI-written applications became common quickly, and employers now give the cover letter "much less weight".
- The interview and the human assessment in the final round matter more.
- AI screening on clearly stated qualifications may reduce the advantage of strong self-promoters.

**What this means for the PRD:**
- Value is moving from "polished letter" to:
  - a **tailored, evidence-rich CV**,
  - a **short, specific, authentic søknad** that does not read as AI-generic,
  - helping the user **show real competence** they can defend in an interview.
- A tool that only generates fluent letters is a commodity. FINN gives this away free, and so does ChatGPT.

Sources:
- https://www.finn.no/bedriftskunde/aktuelt/jobbindeks/soknadsbrevet-er-dodt
- https://www.finn.no/bedriftskunde/aktuelt/jobbindeks/rekruttererens-ai-dilemma
- https://www.finn.no/bedriftskunde/aktuelt/jobbindeks/ai-endrer-spillereglene-i-jobbsoking
- https://nhh.no/nhh-bulletin/artikkelarkiv/2026/august/soknadsbrevet-er-ut-i-jobbsoking/
- https://nlsnorwegian.no/job-search-application-letter-in-norwegian-jobbsok-i-norge-soknadsbrev-pa-norsk-learn-norwegian-b1/
- https://www.dn.no/jobbsoknad/jobbintervju/jobb/cv/slik-skriver-du-jobbsoknad/1-1-1293440
- https://www.jobseeker.com/no/jobbsoknad/artikler/hvor-lang-skal-en-soknad-vaere
- https://www.smartepenger.no/jobb/668-cv
- https://utdanning.no/tema/arbeidsliv/hvordan_soke_jobb
- https://www.nav.no/soknaden-og-cv
- https://eures.europa.eu/five-ways-ai-can-help-your-job-search-2023-12-19_no (EURES: be critical of AI output and check that it is correct)

---

## 3. Regulatory concerns for a Norwegian launch

### 3.1 GDPR: CV data is personal data, and sometimes special-category data

**Roles and legal basis:**
- Supersøker is the **controller** for the data users upload, and OpenAI is a **processor**.
- The likely legal basis is Art. 6(1)(b), a contract with the user to deliver the service, possibly combined with consent for optional storage.

**Special categories (Art. 9):** CVs often contain this data incidentally:
- health, for example sick leave or disability explaining a gap, or "tilrettelegging"
- trade-union membership or roles
- religion, for example a church volunteer role
- political roles, for example youth-party positions
- ethnicity, which can be inferred from a photo or languages

Processing is prohibited unless an Art. 9(2) exception applies, most plausibly **explicit consent** (9(2)(a)).

**Criminal records (Art. 10):** Data such as a politiattest or a criminal history falls under Art. 10, which has stricter conditions. Supersøker should not ask for it and should discourage uploading it.

**Fødselsnummer:** Not a special category, but personopplysningsloven § 12 requires particular care. Strip or reject it.

**Must-haves for the PRD:**
- **Data minimisation in the UI.** Warn the user before upload, and ideally detect and redact automatically before sending to OpenAI:
  - fødselsnummer
  - home address (optional)
  - photo
  - health/union/religion/political mentions
- **Explicit consent text** if the user chooses to include special-category data. Default is "don't include".
- **Retention:**
  - Short and stated, with a "delete everything" button.
  - Don't keep CVs indefinitely.
  - Regulator practice elsewhere (Danish Datatilsynet on employers) accepts *up to* 3 years only with justification. Norwegian employers commonly use ≤12 months.
  - A job-seeker tool should default much shorter, or let the user choose.
- **Personvernerklæring** in Norwegian. It should name OpenAI as processor, give the transfer basis, retention, and the user's rights (access, erasure, portability). It should also state the right to complain to Datatilsynet.
- **DPIA (vurdering av personvernkonsekvenser):** Likely advisable, because the service uses new technology on data that may include special categories at scale. Datatilsynet's DPIA list should be checked **[unverified for the exact list entry]**.
- **Minors:** Young job seekers (16–18) are a realistic segment. In Norway, a child must be 13 to consent alone to information-society services (personopplysningsloven § 5) **[unverified, background knowledge]**.

**Datatilsynet:** No dedicated Datatilsynet guidance on generative AI and job-application data turned up in this research. Datatilsynet's AI strategy focuses on how the AI rules relate to GDPR. A 2024 Teknologirådet/Datatilsynet survey found that 54% of Norwegians worry about how AI uses their personal data. That makes visible privacy a selling point, not just compliance. Check datatilsynet.no ("kunstig intelligens", "innebygd personvern") before launch.

Sources:
- https://gdpr-text.com/no/read/article-9/
- https://gdpr-text.com/no/read/article-10
- https://www.legiscope.com/blog/saerlige-kategorier-art-9.html
- https://ansatt.oslomet.no/sensitive-personopplysninger
- https://www.legiscope.com/blog/ansoegninger-opbevaring-rekruttering.html
- https://www.nbim.no/no/om-oss/jobb-i-oljefondet/ledige-stillinger/personvernerklaring-ved-rekrutering/
- https://www.regjeringen.no/contentassets/9c922694cba941a5884132809284fe07/2025_datatilsynets-arsrapport.pdf
- https://www.regjeringen.no/contentassets/d0c7f859c7034c2d943158143e724783/nn-no/sved/datatilsynet.pdf

### 3.2 Sending personal data to OpenAI

What OpenAI's own documentation says:

| Topic | What OpenAI says | Implication |
|---|---|---|
| **Training** | API data is not used for training by default (since 1 March 2023) unless the customer opts in. | This is the opposite of consumer ChatGPT, so the PRD can say it. |
| **Retention** | Abuse-monitoring logs are kept up to 30 days. The Responses API stores application state for 30 days by default (`store=true`). Assistants/threads are kept until deleted. | Use `store: false` and stateless calls. Don't use Assistants/threads for CV storage. Disclose the up-to-30-days log retention. |
| **Zero Data Retention / Modified Abuse Monitoring** | Requires prior approval from OpenAI. | Probably not available to a student project at launch. Plan for the default 30 days. |
| **EU data residency** | Eligible API projects can process and store data in Europe (`eu.api.openai.com`). OpenAI describes in-region requests as zero-retention, but third-party summaries say ZDR still needs approval. | Worth requesting or using if available. Check eligibility. |
| **DPA** | OpenAI offers a Data Processing Addendum (reportedly updated 1 Jan 2026). | Sign or accept it in the org settings before handling real user data. |
| **US transfer** | Transfers to certified US firms rely on the EU–US Data Privacy Framework (adequacy since 10 July 2023), which also covers the EEA/Norway, and on SCCs in the DPA. Legal certainty is not complete. The EDPB asked the Commission (31 July 2026) to examine DPF validity after *Trump v. Slaughter*, and a challenge to the adequacy decision was brought (Latombe; outcome of any appeal not confirmed here). | Document a transfer impact assessment. Use EU residency where possible, and keep a provider-swap option in the architecture. |

Sources:
- https://developers.openai.com/api/docs/guides/your-data
- https://openai.com/index/introducing-data-residency-in-europe/
- https://vantagepoint.io/docs/openai-api-data-controls
- https://wavect.io/blog/eu-data-residency-ai-apps-2026.md
- https://www.edpb.europa.eu/documents/other-guidance/eu-us-data-privacy-framework-faq-for-european-businesses-version-20_en
- https://www.hunton.com/privacy-and-cybersecurity-law-blog/tag/data-privacy-framework
- https://en.wikipedia.org/wiki/EU%E2%80%93US_Data_Privacy_Framework

### 3.3 EU AI Act: is Supersøker "high-risk"?

**Most likely not high-risk.**

- **What Annex III point 4(a) covers:** AI systems *intended to be used for the recruitment or selection of natural persons*, in particular:
  - to place targeted job ads,
  - to analyse and filter applications,
  - to evaluate candidates.

  These are systems used by or for **employers/recruiters**, the deployers who make decisions about candidates.
- **Commission draft guidance (19 May 2026):** The draft guidelines on high-risk classification, as summarised by Faegre Drinker, explicitly list as **not high-risk**:
  - "Candidate-side CV-tailoring assistant (candidate controlled)"
  - "Candidate job-recommendation tool run by the applicant"

  The functional test is whether the system "meaningfully shapes access to roles" from the decision-maker's side. The AI Act Service Desk similarly says a job-ad tool that is not used to recruit or select people falls outside 4(a).
- **Where Supersøker could cross the line:**
  - selling a "candidate score" or ranking to employers,
  - screening or filtering applicants on behalf of employers,
  - pushing targeted job ads that condition access to vacancies.

  Keep these **out of scope** and say so explicitly in the PRD.

**What does apply: transparency (Art. 50) and AI literacy (Art. 4).**

- **Art. 50(1):** If Supersøker has a chat-style interface, users must be told clearly that they are interacting with AI.
- **Art. 50(2):** Providers of systems that generate synthetic **text** must mark outputs in a machine-readable, detectable way.
  - There is an exception for systems that perform an "assistive function for standard editing" or do not substantially alter the input **[exception wording from the Regulation text; not re-fetched this session]**.
  - Generating a new søknad likely does *not* fit the exception. Light CV rephrasing might.
  - Applicable from **2 August 2026**. Systems already on the market before that date have a grace period to 2 December 2026; new systems get no grace.
  - Commission Code of Practice on AI-generated content transparency: June 2026.
- **Practical issue:** Machine-readable marking of plain text that the user copies into an employer's portal is technically unclear. Track the Code of Practice. At minimum, label outputs as AI-assisted in the UI and exports, and consider metadata in exported DOCX/PDF.

**Timeline for high-risk duties:** The AI Omnibus (reported as Regulation (EU) 2026/1744, in force 27 July 2026) postponed Annex III high-risk obligations, reportedly to 2 December 2027. This is not directly relevant if Supersøker stays candidate-side.

### 3.4 AI Act status in Norway

- Norway implements the AI Act through the EEA. A **KI-lov** draft went on consultation, originally with the aim of applying from late summer 2026.
- As of autumn 2026, reports say this is **delayed**:
  - The Omnibus changes go on consultation in autumn 2026.
  - A bill (proposisjon) is aimed for **spring 2027**.
  - The regulation was not yet incorporated into the EEA Agreement as of October 2026 (commercial source; verify on regjeringen.no).
- **Nkom** is designated as the coordinating AI supervisory authority. Datatilsynet remains the authority for GDPR.

**Practical stance for the PRD:** Design for Art. 50 transparency now. It is cheap, it builds trust, and the product will be needed in the EU anyway. GDPR applies fully today.

Sources:
- https://www.faegredrinker.com/en/insights/publications/2026/6/draft-commission-guidelines-on-high-risk-ai-implications-for-the-workplace
- https://knowledge.dlapiper.com/dlapiperknowledge/globalemploymentlatestdevelopments/2026/eu-commission-publishes-draft-guidelines-on-high-risk-ai-in-employment
- https://ai-act-service-desk.ec.europa.eu/es/node/464
- https://www.houthoff.com/insights/news/ai-act-transparency-obligations-and-the-ai-omnibus-regulation/
- https://www.goodwinlaw.com/en/insights/publications/2026/08/alerts-technology-dpc-eu-ai-act-transparency-obligations-now-in-force
- https://fedil.lu/en/?p=74908
- https://www.dastra.eu/en/blog/ai-act-transparency-rules-what-changes-august-2-2026/60164
- https://www.mccannfitzgerald.com/knowledge/technology-and-innovation/one-month-to-go-eu-ai-act-transparency-compliance
- https://www.regjeringen.no/no/aktuelt/lov-om-kunstig-intelligens-i-norge-sendes-na-pa-horing/id3113732/
- https://www.securityworldmarket.com/no/Nyheter/Bedriftsnyheter/nkom-blir-norges-vakthund-for-kunstig-intelligens
- https://opsiocloud.com/no/knowledge-base/ki-loven-ai-act-norge/
- https://www.finn.no/bedriftskunde/aktuelt/jobbindeks/rekruttererens-ai-dilemma (HR Norge: recruitment is a high-risk area for *employers*)

### 3.5 Other launch items (brief)

- **Markedsføringsloven / consumer law:** If paid plans are added, they need clear pricing, angrerett for digital services, and no misleading "guaranteed interview" claims **[unverified, general]**.
- **Accessibility:** Norway's likestillings- og diskrimineringsloven requires universal design for ICT solutions aimed at the public, including private businesses. The WCAG 2.x level should be checked **[unverified, background knowledge]**. This also matches course criterion 4.

---

## 4. Known failure modes of AI CV and application writers, and mitigations

| Failure mode | What happens | How better products and guides mitigate it | Supersøker requirement idea |
|---|---|---|---|
| **Hallucinated experience** | Invented metrics ("cut cloud spend 38%"), inflated scope ("led a team of 6"), tools never used, inflated titles, wrong dates/certifications, plausible fake projects. Recruiters report AI-fabricated portfolios and references. | A user-verified "source of truth"/master profile that the AI may only rephrase. Placeholders like `[NEEDS VERIFICATION]` instead of guessing. Claim-by-claim review. Some tools sell a "hard guard that refuses to invent anything" and show exactly what changed. | Generate only from user-supplied facts. Every claim in the output must trace to the input. Show a diff or highlights of new or changed claims. Flag numbers and tools not present in the input. Insert placeholders, never invented values. |
| **Generic, "AI-sounding" tone** | Recruiters: "recognisable phrasing, little personality". 69% say applications are getting more impersonal. Interchangeable letters lose impact as the cover letter loses weight. | Ask targeted questions (why this company, a concrete example) before generating. Use the user's own words. Keep it short. | Short guided interview (2–4 questions on motivation and one concrete example). Norwegian style rules: direct, concrete, ≤1 page. Ban list of English-calque clichés **[design idea]**. |
| **ATS keyword stuffing** | Over-optimising for "match rate", white-text keyword dumps. Parsers expose hidden text, and recruiters discard such CVs. The often-cited "75% auto-rejected by ATS" has no primary source. | Weave the job ad's real requirements into real achievements. Use the score as guidance, not a goal. Use simple, parseable layouts (no tables or text boxes). | Show "requirements in the ad vs. evidence in your CV" as a gap list. Never add a skill the user has not confirmed. Export a single-column, text-based layout. |
| **Interview indefensibility** | The candidate can't explain claims they didn't write or live. Interviews expose the gap, and interviews matter *more* now (NHH study). | "Can you explain this in 30 seconds?" test. Soften verbs ("bidro til") when ownership is unclear. | Optional "forbered deg" step: list the claims the user should be ready to explain. |
| **Language quality in Norwegian** | Translated templates, anglicisms, mixed bokmål/nynorsk. Language errors can also bias employers (Skatteetaten's point). | (No competitor found that explicitly addresses this.) | Norwegian-first prompts, few-shot examples written by Norwegians, bokmål/nynorsk choice, a human-review checklist. |
| **Privacy leakage** | Users paste fødselsnummer, health details and references' phone numbers into chatbots. Consumer chatbots may train on the input. | API with no training. Redaction. | See §3.1–3.2 must-haves. |

Sources:
- https://jobshinobi.com/blog/ai-resume-builder-hallucinations-how-to-fact-check
- https://jobshinobi.com/blog/free-resume-builder-ai-that-doesnt-add-fake-experience
- https://www.indiehackers.com/post/i-built-an-honest-job-application-copilot-because-the-ai-resume-tools-all-either-lie-or-sound-like-robots-1391483a05
- https://www.techradar.com/pro/most-job-applicants-use-ai-cv-builder-tools-to-get-into-work-and-to-my-dismay-they-say-it-is-fair-play
- https://www.hrmorning.com/articles/how-to-spot-ai-resume-fraud/
- https://blog.theinterviewguys.com/?p=15010
- https://www.hiration.com/blog/white-text-resume-hack/
- https://atsverification.com/blog/ats-resume-myths-debunked/
- https://airesume.guru/blog/hidden-keywords-white-text-on-resumes-the-myth-that-gets-you-blacklisted
- https://jobright.ai/blog/jobscan-review-2026-walkthrough-features-and-alternatives/

---

## 5. Implications for the PRD (summary)

1. **Differentiation:** The opportunity is "truthful, Norwegian-native tailoring", not "AI writes your letter".
   - Generated text must be grounded in the user's facts and must not fabricate.
   - Changes and gaps should be visible.
   - Output should follow Norwegian søknad and CV conventions, possibly with nynorsk support.
   - The CV gets priority over the letter, because Norwegian employers are moving toward CV-only applications.
2. **Positioning against free baselines:** FINN (free, built into its ads) and ChatGPT (free, flexible) set the price expectation. Supersøker must clearly beat them on *trust* (no fabrication, privacy) and *local quality*, or be free at launch.
3. **Regulatory must-haves for launch:**
   - GDPR basics: privacy notice, DPA with OpenAI, short retention plus delete, data-subject rights.
   - Minimise and redact special-category data and fødselsnummer before the API call.
   - Explicit-consent handling if the user keeps sensitive data.
   - Disclosed US transfer basis, with EU data residency if available.
   - `store:false` and no training use.
   - A DPIA.
   - AI-transparency labelling (Art. 50).
   - An explicit scope statement that Supersøker is **candidate-side only**, with no scoring or ranking for employers, to stay outside AI Act high-risk.
4. **Out of scope for now (and why):**
   - Employer-facing features: they would make the product high-risk under Annex III point 4.
   - Auto-apply: same risk, plus spam.
   - Keyword "match-rate" gamification: it pushes the product toward stuffing.
