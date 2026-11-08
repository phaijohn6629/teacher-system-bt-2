/* 🧪 exgen.js — គំរូវិញ្ញាសាខ្មែរ (ទី៩ · ទី១២) · គ្មាន NaN · $ និង {} គ្រប់គូ · គ្មានអក្សរខ្មែរក្នុងរូបមន្ត · TeX ក្រៅ $ · អត្រាកំណែពេញ
   ដំណើរការពីថតគម្រោង៖ jsc tests/exgen.js */
var window={};load("exgen.js");var EXGEN=window.EXGEN;
var KEYS=["9|1","9|2","9|3","9|4","9|7","9|8","9|10","9|11","9|12","9|13","9|15","9|16",
 "12|11","12|22","12|23","12|32","12|41","12|42","12|43","12|51","12|61","12|62","12|71","12|81","12|82","12|83","12|101","12|102"],N=120,bad=0,cnt=0;
function chk(s,where){s=String(s);
  if(/NaN|undefined|Infinity|\[object|null/.test(s)){print("BAD-VAL "+where+": "+s.slice(0,240));bad++;return}
  var parts=s.replace(/\$\$/g,"\u0001").split(/\$/);if((parts.length-1)%2){print("BAD-$ "+where+": "+s.slice(0,240));bad++}
  if(/\\[a-zA-Z]/.test(s.replace(/\$\$[\s\S]*?\$\$|\$[^$]*\$/g,""))){print("TEX-OUTSIDE "+where+": "+s.slice(0,200));bad++}
  var d=0;for(var i=0;i<s.length;i++){var c=s[i];if(c=="\\"){i++;continue}if(c=="{")d++;if(c=="}")d--;if(d<0)break}
  if(d!==0){print("BAD-{} "+where+": "+s.slice(0,240));bad++}
  var m=(s.match(/\$[^$]*\$/g)||[]).filter(function(x){return/[ក-៿]/.test(x)});if(m.length){print("KH-IN-MATH "+where+": "+m[0].slice(0,160));bad++}
}
KEYS.forEach(function(k){if(!EXGEN.has(k)){print("MISSING "+k);bad++;return}EXGEN.list(k).forEach(function(t){for(var n=0;n<N;n++){var o;try{o=EXGEN.make(k,t.id)}catch(e){print("THROW "+k+" "+t.id+" "+e);bad++;break}cnt++;
  chk(o.inst,k+" "+t.id+" inst");o.it.forEach(function(x,j){chk(x.q,k+" "+t.id+" "+j+" q");chk(x.ans,k+" "+t.id+" "+j+" ans");chk(x.sol,k+" "+t.id+" "+j+" sol")});if(bad>15)throw"stop"}})});
/* វិញ្ញាសាពេញ */
for(var i=0;i<40;i++){try{EXGEN.bac("a");EXGEN.bac("b");EXGEN.dip()}catch(e){print("THROW paper "+e);bad++;break}}
print("exgen: made "+cnt+" bad "+bad);
