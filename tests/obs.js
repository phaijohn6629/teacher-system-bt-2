/* 🧪 script.js ៖ normObsRow / normalizeObsData — sc(33) · cm(33) · g(6) · dt · ជួរបន្ថែម · ដំណើរការ៖ jsc tests/obs.js */
var bad=0,n=0;function ok(c,m){n++;if(!c){bad++;print("FAIL "+m)}}
var S=read("script.js"),data=[],XM=[11,12,1,2,3,4,5,6,7,8,9,10];
var a=S.indexOf("function defO()"),b=S.indexOf("function loadO()");
eval(S.slice(a,b));
function chk(v,m){ok(v.r.length>=36,m+" ≥36 rows");v.r.forEach(function(r,i){
  ok(Array.isArray(r.sc)&&r.sc.length===33,m+" sc33 #"+i);ok(Array.isArray(r.cm)&&r.cm.length===33,m+" cm33 #"+i);
  ok(Array.isArray(r.g)&&r.g.length===6&&r.g.every(function(x){return typeof x==="string"}),m+" g6 #"+i);
  ok(r.sc.every(function(x){return x===null||(x>=0&&x<=5)}),m+" sc range #"+i)})}
[null,undefined,0,"x",[],{},{r:null},{r:5},{r:[null,1,"a",{sc:"zz",g:7,cm:null}]},{r:{T1:[{sc:{"0":"4","40":3,"2":9},g:{"1":"x"}}],T2:{sc:[1]}}},
 {r:[{sc:[5,"3","",null,undefined,NaN,-1,6]}],d:"zz",y:1,th:["a",1]}].forEach(function(v,i){chk(normalizeObsData(v),"case"+i)});
var v=normalizeObsData({r:{T1:[{sc:{"0":"4","40":3,"2":9}}]}});
ok(v.r[0].t==="T1"&&v.r[0].sc[0]===4&&v.r[0].sc[2]===null&&v.r[0].sc.length===33,"legacy object");
v=normalizeObsData({d:"zz",y:1,th:["a",1]});ok(v.d===2&&v.y===2026&&v.th.length===3&&v.th[0]===90,"bad d/y/th default");
v=normalizeObsData({r:[].concat(new Array(36).fill({}),[{x:1,dt:"2026-11-20"},{x:1,dt:"2026-11-18",dt2:1},{x:1,dt:"bad"}])});
ok(v.r.length===39&&v.r[36].dt===""&&v.r[37].dt==="2026-11-18"&&v.r[38].dt==="2026-11-20"&&v.r[36].k,"extras sorted+keyed");
/* 🔐 obsPatch / obsAllowed ៖ អ្នកសង្កេត (o) · គ្រូត្រូវសង្កេត (t) · គ្រូផ្សេង */
var OBT=["sub","rm","n","ab","ch","ls","ct"];
function sj(x){if(x===null||typeof x!=="object")return JSON.stringify(x);if(Array.isArray(x))return "["+x.map(sj).join(",")+"]";return "{"+Object.keys(x).sort().filter(function(k){return x[k]!==undefined}).map(function(k){return JSON.stringify(k)+":"+sj(x[k])}).join(",")+"}"}
var a2=S.indexOf("var OBO="),b2=S.indexOf("function wkday");eval(S.slice(a2,b2));
var old={t:"T2",o:"T1",sub:"គណិត",g:["","","","","",""],sc:[],cm:[]};
var nw=JSON.parse(JSON.stringify(old));nw.g[2]="ល្អ";nw.sc=[5];nw.cl="";nw.dt="";
var pt=obsPatch(nw,old,"T2");ok(Object.keys(pt).join()==="g","teacher t sends only g (not sc/cl/dt): "+Object.keys(pt));
pt=obsPatch(nw,old,"T1");ok(Object.keys(pt).sort().join()==="g,sc","observer o sends g+sc only: "+Object.keys(pt));
pt=obsPatch(nw,old,"T9");ok(Object.keys(pt).length===0,"unpaired teacher sends nothing");
ok(obsAllowed(old,"T9").length===0&&obsAllowed(old,"").length===0&&obsAllowed(null,"T1").length===0,"no rights for others / empty");
var leg={t:"T2",o:"T1"};nw={t:"T2",o:"T1",sub:"គណិតវិទ្យា",cl:"",tm:"",rm:"",n:"",ab:"",ch:"",ls:"",ct:"",sc:new Array(33).fill(null),cm:new Array(33).fill(""),g:["x","","","","",""]};
pt=obsPatch(nw,leg,"T2");ok(Object.keys(pt).join()==="sub,g"||Object.keys(pt).join()==="g"||Object.keys(pt).sort().join()==="g,sub","legacy row: defaults not sent, sub default allowed: "+Object.keys(pt));
ok(!("sc" in pt)&&!("cm" in pt)&&!("cl" in pt),"legacy row: no sc/cm/cl for teacher t");
print("obs: checks "+n+" bad "+bad);
