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
print("practice: grades "+Object.keys(GR).length+" made "+tot+" bad "+bad);
