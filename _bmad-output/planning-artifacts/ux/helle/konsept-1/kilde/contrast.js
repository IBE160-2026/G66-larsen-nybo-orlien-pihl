const {C}=require('./lib.js');
const lum=h=>{const c=[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255).map(v=>v<=.03928?v/12.92:((v+.055)/1.055)**2.4);return .2126*c[0]+.7152*c[1]+.0722*c[2]};
const cr=(a,b)=>{const x=lum(a),y=lum(b);return ((Math.max(x,y)+.05)/(Math.min(x,y)+.05)).toFixed(2)};
const W='#FFFFFF', SEL='#F3F6F9';
const pairs=[['ink','bg'],['ink','surface'],['ink','sand'],['muted','bg'],['muted','surface'],['muted','sand'],['accent','bg'],['accent','surface'],['accent','accentSoft'],['W','accent'],['ok','okBg'],['ok','bg'],['gap','gapBg'],['gap','surface'],['ink','gapBg'],['muted','gapBg'],['err','errBg'],['err','bg'],['ink','errBg'],['muted','errBg'],['W','err'],['ink','okBg'],['ink','accentSoft'],['ink','mark'],['disabledInk','disabledBg'],['border','surface'],['border','bg'],['accent','bg'],['muted','SEL'],['ink','SEL']];
const g=k=>k==='W'?W:k==='SEL'?SEL:C[k];
for(const [f,b] of pairs) console.log(`${f} ${g(f)} på ${b} ${g(b)}: ${cr(g(f),g(b))}`);
