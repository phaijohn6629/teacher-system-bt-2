/* 🧪 ថ្ងៃបុណ្យ (sched.js FIXHOL/YHOL/holOf) + ការប្រើក្នុង att.js · excerpt.js · monitor.js
   ដំណើរការពីថតគម្រោង៖ jsc tests/hol.js */
var bad=0,n=0;function ok(c,m){n++;if(!c){bad++;print("FAIL "+m)}}
function grab(s,a,b){var i=s.indexOf(a);if(i<0)return"";var r=s.slice(i),j=r.indexOf(b);return j<0?r:r.slice(0,j)}
var SC=read("sched.js"),AT=read("att.js"),EX=read("excerpt.js"),MO=read("monitor.js");
var code=grab(SC,"function p2(","\n")+";"+grab(SC,"var FIXHOL=","\nfunction holLbl")+"\n"+grab(SC,"function holLbl","\n");
var H=eval("(function(){"+code+";return{FIXHOL:FIXHOL,YHOL:YHOL,holOf:holOf,holLbl:holLbl}})()");
ok(H.holOf&&H.FIXHOL&&H.YHOL,"extracted FIXHOL/YHOL/holOf");
Object.keys(H.FIXHOL).forEach(function(k){ok(/^\d\d-\d\d$/.test(k)&&(H.FIXHOL[k]==="NHD"||H.FIXHOL[k]==="HD"),"FIXHOL "+k+" is NHD|HD")});
Object.keys(H.YHOL).forEach(function(k){ok(/^\d{4}-\d\d-\d\d$/.test(k)&&(H.YHOL[k]==="NHD"||H.YHOL[k]==="HD"),"YHOL "+k+" is NHD|HD")});
/* ថ្ងៃបុណ្យជាតិ */
[[2026,11,9],[2026,11,23],[2026,11,24],[2026,11,25],[2027,4,14],[2026,10,29],[2026,9,24],[2026,12,29]].forEach(function(d){ok(H.holOf(d[0],d[1],d[2])==="NHD","NHD "+d.join("-"))});
/* ថ្ងៃបុណ្យអន្តរជាតិ */
[[2026,1,1],[2026,3,8],[2026,5,1],[2026,6,1],[2027,1,1]].forEach(function(d){ok(H.holOf(d[0],d[1],d[2])==="HD","HD "+d.join("-"))});
/* ថ្ងៃធម្មតា · YHOL មិនជាប់ឆ្នាំផ្សេង */
[[2026,11,26],[2026,11,22],[2026,10,20],[2027,11,23],[2025,11,24],[2026,2,2]].forEach(function(d){ok(H.holOf(d[0],d[1],d[2])==="","normal "+d.join("-"))});
ok(H.holLbl("NHD").indexOf("[NHD]")===0&&H.holLbl("HD").indexOf("[HD]")===0&&H.holLbl("")==="","holLbl tags");
ok(/holOf:holOf/.test(SC)&&/holLbl:holLbl/.test(SC)&&/YHOL:YHOL/.test(SC),"SCHX exports holOf/holLbl/YHOL");
/* អ្នកប្រើ */
ok(/X\.holOf\(y,m,d\)/.test(EX)&&!/FIXHOL\[/.test(EX),"excerpt.js uses holOf, not FIXHOL");
ok(/SCHX\.holOf\(y,m,d\)/.test(MO)&&!/FIXHOL\[/.test(MO),"monitor.js uses holOf, not FIXHOL");
ok(!/FIXHOL\[/.test(AT),"att.js no longer reads FIXHOL directly");
ok(/function holC\(/.test(AT),"att.js holC defined");
var log=grab(AT,"var bl=(dt.getDay()===0||holC(ds))?[]:blocksOf(x.list,di)","\n");
ok(log&&/Object\.keys\(R\)/.test(grab(AT,"var bl=(dt.getDay()===0||holC(ds))","if(!bl.length)continue")),"att log: holiday skipped like Sunday, recorded entries (R) still added");
ok(/bl=off\?\[\]:blocksOf/.test(AT)&&/off=sun\|\|!!hol/.test(AT)&&/if\(R\)Object\.keys\(R\)/.test(AT),"att day view: holiday = no scheduled blocks, recorded ones kept");
print("hol: checks "+n+" bad "+bad);
