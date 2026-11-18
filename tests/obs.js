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
print("obs: checks "+n+" bad "+bad);
