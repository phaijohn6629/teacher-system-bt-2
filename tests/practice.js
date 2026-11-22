/* 🧪 practice*.js — លំហាត់ហ្វឹកហាត់ (ខ្មែរ ទី៧–១២ · Cambridge G6–G12 · exam-style)
   ពិនិត្យ៖ គ្មាន NaN · $ និង {} គ្រប់គូ · ចម្លើយត្រឹមត្រូវ check() ថាត្រូវ · ចម្លើយលេខ (Cambridge) ជាចំនួនពិតកំណត់ (ខ្មែរទី១២ អាចជាកុំផ្លិច/∞) · អង់គ្លេសគ្មានអក្សរខ្មែរ
   ដំណើរការពីថតគម្រោង៖ jsc tests/practice.js */
var H=function(){return P};var P=new Proxy(H,{get:function(t,k){if(k===Symbol.toPrimitive)return function(){return""};if(k==="length")return 0;return P},apply:function(){return P},construct:function(){return P}});
var window=this;var document=P,localStorage={getItem:function(){return null},setItem:function(){}},location={hash:"",search:""},navigator={},setInterval=function(){},setTimeout=function(){},addEventListener=function(){},console={log:print,error:print,warn:print};
eval(read("practice.js").replace("window.PX={","window.PX={check:check,parse:parse,ev:ev,"));
["pisa12.js","practice11.js","practice10.js","practice9.js","practice8.js","practice7.js","practiceen.js","practiceen2.js","practiceen3.js","practiceen4.js","practiceen5.js","practiceen6.js"].forEach(function(f){eval(read(f))});
var X=window.PX,GR=window.PRACT.GR,N=60,bad=0,tot=0;
function bal(s){var d=(s.replace(/\\\$/g,"").match(/\$/g)||[]).length%2,b=0;for(var i=0;i<s.length;i++){if(s[i]=="{"&&s[i-1]!="\\")b++;if(s[i]=="}"&&s[i-1]!="\\")b--}return!d&&!b}
function B(m){bad++;if(bad<25)print(m)}
Object.keys(GR).forEach(function(g){var en=!!GR[g].en,G=GR[g].G;Object.keys(G).forEach(function(l){[1,2,3,4,5,6].forEach(function(v){if(!G[l][v])return;for(var i=0;i<N;i++){var q;
  try{q=G[l][v]()}catch(e){B("THROW g"+g+" l"+l+" v"+v+" "+e);break}tot++;
  if(!q||!q.a||!q.a.length){B("EMPTY g"+g+" l"+l+" v"+v);continue}
  var all=q.q+JSON.stringify(q.a)+q.s;if(/undefined|NaN|\[object/.test(all))B("BADVAL g"+g+" l"+l+" v"+v+" "+(q.kd||"")+": "+q.q.slice(0,100));
  [q.q,q.s].forEach(function(t){if(!bal(t))B("BAL g"+g+" l"+l+" v"+v+" "+(q.kd||"")+": "+t.slice(0,140));if(en&&/[ក-៿]/.test(t))B("KH-IN-EN g"+g+" l"+l+" "+(q.kd||""))});
  q.a.forEach(function(a){if(!bal("$"+a.t+"$"))B("TBAL "+(q.kd||"")+" "+a.t);var r=X.check(a.v,a.v,a.k);if(!r.ok)B("CHK g"+g+" l"+l+" v"+v+" "+(q.kd||"")+" "+a.v);
    if(en&&a.k==="num"){try{var e=X.ev(X.parse(a.v));if(!isFinite(e[0])||Math.abs(e[1])>1e-9)B("VAL "+(q.kd||"")+" "+a.v)}catch(e){B("PARSE "+(q.kd||"")+" "+a.v)}}})}})})});
/* ក្រដាសប្រឡង Cambridge ពេញ */
Object.keys(window.CAMPAPERS||{}).forEach(function(g){Object.keys(CAMPAPERS[g]).forEach(function(k){CAMPAPERS[g][k].secs.forEach(function(s){if(!GR[g].G[s[0]]||!GR[g].G[s[0]][s[1]])B("PAPER missing g"+g+" "+k+" "+s)})})});
/* ថ្នាក់ទី៧ ដល់ទី១២៖ មេរៀន×កម្រិតនីមួយៗ ត្រូវមានយ៉ាងតិច ៤ ទម្រង់ (kd) ផ្សេងគ្នា — ការពារកុំឱ្យវិញ្ញាសាត្រឡប់ទៅដដែលៗ */
[7,8,9,10,11,12].forEach(function(g){Object.keys(GR[g].G).forEach(function(l){[1,2,3].forEach(function(v){var k={};for(var i=0;i<300;i++){var q=GR[g].G[l][v]();k[q.kd||"?"]=1}if(Object.keys(k).length<4)B("FORMS g"+g+" l"+l+" v"+v+" only "+Object.keys(k).length)})})});
/* ថ្នាក់ទី៩៖ ៥ កម្រិត + PISA (គន្លឹះ 1,5,2,6,3,4) — មេរៀន×កម្រិតនីមួយៗ ≥ ៦ ទម្រង់ (kd) */
Object.keys(GR[9].G).forEach(function(l){[1,5,2,6,3,4].forEach(function(v){var k={};for(var i=0;i<600;i++){var q=GR[9].G[l][v]();k[q.kd||"?"]=1}if(Object.keys(k).length<6||k["?"])B("FORMS9 l"+l+" v"+v+" only "+Object.keys(k).length)})});
/* ឫសគូប/ឫសទី៤៖ ∛ ∜ cbrt root(n,x) · គុណបង្កប់ (11∛5) · ឫសគូបនៃចំនួនអវិជ្ជមាន */
[["11∛(5)","11*5^(1/3)"],["11 ∛(5)","11*5^(1/3)"],["11∛5","11*5^(1/3)"],["11*∛5","11*5^(1/3)"],["១១∛៥","11*5^(1/3)"],["11cbrt(5)","11*5^(1/3)"],["11 root(3, 5)","11*5^(1/3)"],
 ["2∜3","2*3^(1/4)"],["root(4;16)","2"],["∛(-8)","-2"],["∛8+√4","4"],["∛2∛4","2"],["root(5,32)x","2x"]].forEach(function(c){var r=X.check(c[0],c[1],/x/.test(c[1])?"expr":"num");if(!r.ok)B("ROOT "+c[0]+" ≠ "+c[1]+" "+(r.err||""))});
["11∛5","2∜3","root(5,x)"].forEach(function(u){try{var t=window.PRACT.tex(X.parse(u));if(!/\\sqrt\[[345]\]/.test(t))B("ROOTTEX "+u+" "+t)}catch(e){B("ROOTTEX "+u+" "+e)}});
if(X.check("11∛5","11*5^(1/2)","num").ok)B("ROOT false positive");
/* 🖼 រូបសំណួរ (fig)៖ ពិនិត្យថា FIG.svg គូរបានគ្រប់រូបដោយគ្មាន fig-err (សរុបតាមម៉ូឌុល Cambridge G9 មេរៀន 8–9 ដែលប្រើ PXEN.GF) */
try{eval(read("fig.js"))}catch(e){B("FIGLOAD "+e)}
var figN=0;if(window.FIG)Object.keys(GR).forEach(function(g){var G=GR[g].G;Object.keys(G).forEach(function(l){[1,2,3,4,5,6].forEach(function(v){if(!G[l][v])return;for(var i=0;i<40;i++){var q=G[l][v]();if(!q.fig)continue;figN++;var h;try{h=window.FIG.svg(q.fig)}catch(e){B("FIGTHROW g"+g+" l"+l+" v"+v+" "+(q.kd||"")+" "+e);continue}
  if(h.indexOf("<svg")<0||h.indexOf("fig-err")>=0||/NaN|undefined|Infinity/.test(h))B("FIGBAD g"+g+" l"+l+" v"+v+" "+(q.kd||"")+" "+q.fig.slice(0,120))}})})});
[[109,8],[109,9],[106,9],[107,9],[108,9],[106,10],[109,10],[110,11],[106,11],[110,12],[110,13],[9,12],[9,13],[8,18],[10,51],[10,52],[107,9],[10,22],[109,13],[110,16],[106,13],[111,11],[7,14],[7,15],[7,16],[8,13],[8,14],[8,15],[9,15],[9,16],[9,8],[109,7],[109,11],[107,11],[108,7],[108,12],[110,10]].forEach(function(c){var n=0;[1,2,3].forEach(function(v){for(var i=0;i<60;i++){if(GR[c[0]].G[c[1]][v]().fig)n++}});if(n<20)B("FIGCOV g"+c[0]+" l"+c[1]+" only "+n+" figs")});
print("practice: grades "+Object.keys(GR).length+" made "+tot+" figs "+figN+" bad "+bad);
