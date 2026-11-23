/* 🧪 ក្រាហ្វិក និងវិភាគ៖ vcov/vagg/vrt/pcmp (ភាពពេញលេញ) · មិនប៉ះ gof — ដំណើរការ៖ jsc tests/vcov.js */
var bad=0,n=0;function ok(c,m){n++;if(!c){bad++;print("FAIL "+m)}}
var S=read("script.js"),window=this;
function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;")}
var SM1=["តុលា","វិច្ឆិកា","ធ្នូ","មករា","កុម្ភៈ","ប្រឡងឆមាស"],SM2=["មីនា","មេសា","ឧសភា","មិថុនា","ប្រឡងឆមាស"];
var rs={c:{},mx:{9:100},pc:[90,80,70,60,50]};
var a=S.indexOf("function ccf("),b=S.indexOf("function crow(");eval(S.slice(a,b));
a=S.indexOf("var vprov=");b=S.indexOf("function lgd(");eval(S.slice(a,b));
function st(av,bv){return{n:"x",a:av,b:bv}}
var full1=[90,90,90,90,90,90],full2=[80,80,80,80,80];
var c={n:"9NGS-B",st:[st(full1,full2),st(full1,["","","","",""]),st(full1.slice(0,5).concat([""]),full2)]};
var v1=vcov(c,1);ok(v1.n===3&&v1.d===2&&v1.miss.length===1&&v1.miss[0].l==="ប្រឡងឆមាស"&&v1.miss[0].k===1,"sem1: 2/3 graded, exam col missing 1");
var v2=vcov(c,2);ok(v2.d===2&&v2.miss.length===5&&v2.miss[0].k===1,"sem2: 2/3 graded, 5 cols missing 1");
var v3=vcov(c,3);ok(v3.d===1&&v3.miss.some(function(m){return m.l==="ឆ១·ប្រឡងឆមាស"})&&v3.miss.some(function(m){return m.l==="ឆ២·មីនា"}),"year: needs both, labels prefixed");
/* ត្រូវនឹង cnt/gof ស្រាប់ */
[1,2,3].forEach(function(p){var o=cnt(c,p),d=0;for(var g in o)d+=o[g];ok(vcov(c,p).d===d,"d equals cnt total p"+p)});
/* ជួរមិនសកម្ម មិនរាប់ជាខ្វះ */
var c2={n:"9NGS-C",cf:{1:[1,1,1,1,1,0],2:[1,1,1,1,1]},st:[st(full1.slice(0,5).concat([""]),full2)]};
ok(vcov(c2,1).d===1&&vcov(c2,1).miss.length===0,"inactive column not counted missing");
/* aggregate */
var ag=vagg([c,c2],1);ok(ag.n===4&&ag.d===3&&ag.inc.length===1&&ag.inc[0].n==="9NGS-B","vagg sums and lists incomplete classes");
ok(vmiss(ag.inc).indexOf("9NGS-B")===0&&vmiss(ag.inc).indexOf("ប្រឡងឆមាស (1)")>0,"vmiss text");
/* rates */
var r=vrt({A:1,B:1,C:0,D:0,E:1,F:1},4);ok(r.ac===50&&r.pass===75&&r.f===25,"rates");
ok(vrt({A:0,B:0,C:0,D:0,E:0,F:0},0)===null,"no data → null (no divide by zero)");
/* render */
var h=pcmp([{l:"ឆមាសទី១",o:ag.o,n:ag.n,d:ag.d},{l:"ទទេ",o:{A:0,B:0,C:0,D:0,E:0,F:0},n:3,d:0}]);
ok(h.indexOf("0/3 នាក់")>0&&h.indexOf("មិនទាន់មានទិន្នន័យពេញ")>0&&h.indexOf("NaN")<0,"pcmp handles empty rows");
ok(/function stackBar\(label,o,cv\)/.test(S)&&/\$\("vpr"\)\.onclick/.test(S),"stackBar optional cv, print kept");
/* មិនប៉ះ gof/fl */
ok(/function gof\(s,c,p\)\{\n  var n1=ac\(c,1\)\.length,n2=ac\(c,2\)\.length;/.test(S),"gof untouched");
var big=[{n:"A",m:[{l:"x1",k:1},{l:"x2",k:1},{l:"x3",k:1},{l:"x4",k:1}]},{n:"B",m:[{l:"y",k:2}]},{n:"C",m:[{l:"z",k:2}]}];
var vm=vmiss(big);ok(vm.indexOf("+2 ជួរ")>0&&vm.indexOf("x3")<0&&vm.indexOf("+1 ថ្នាក់ទៀត")>0&&vm.indexOf("C៖")<0,"vmiss compact: 2 cols, 2 classes max");

/* ===== ដំណាក់កាល B ===== */
var snap=JSON.stringify(rs),cnt0=JSON.stringify([1,2,3].map(function(p){return cnt(c,p)})),gof0=JSON.stringify(c.st.map(function(x){return[1,2,3].map(function(p){return gof(x,c,p)})}));
[1,2,3].forEach(function(p){var o=vagg([c,c2],p,false).o,e={A:0,B:0,C:0,D:0,E:0,F:0};[c,c2].forEach(function(x){var q=cnt(x,p);for(var g in q)e[g]+=q[g]});ok(JSON.stringify(o)===JSON.stringify(e),"official vagg.o equals cnt p"+p)});
/* mean % ផ្លូវការ៖ សិស្សពេញ 90/6 ជួរ → 90% */
var cm={n:"9NGS-B",st:[st(full1,full2)]};
ok(Math.abs(vstu(cm.st[0],cm,1,false).pct-90)<1e-9,"official pct s1 = 90");
ok(Math.abs(vstu(cm.st[0],cm,3,false).pct-(6*90+5*80)/11)<1e-9,"official pct year weighted by columns");
/* បណ្តោះអាសន្ន៖ ខ្វះជួរ → រាប់តែជួរមាន */
var part=st([90,90,"","","",""],["","","","",""]);
ok(vstu(part,cm,1,false)===null,"official: partial student has no grade");
var pv=vstu(part,cm,1,true);ok(pv&&pv.g==="A"&&Math.abs(pv.pct-90)<1e-9,"provisional: 2 filled cols of 90 → A, 90%");
ok(vstu(st(["","","","","",""],["","","","",""]),cm,1,true)===null,"provisional: no scores → null");
var pa=vagg([c],1,true),oa=vagg([c],1,false);ok(pa.d>=oa.d&&pa.d===3,"provisional counts students with any score");
ok(JSON.stringify(rs)===snap&&JSON.stringify([1,2,3].map(function(p){return cnt(c,p)}))===cnt0&&JSON.stringify(c.st.map(function(x){return[1,2,3].map(function(p){return gof(x,c,p)})}))===gof0,"provisional mode leaves rs, cnt and gof unchanged");
/* មធ្យម % សរុបឆ្លងកម្រិត (mx ខុសគ្នា) */
rs.mx[10]=150;var c10={n:"10NGS-B",st:[st([150,150,150,150,150,150],["","","","",""])]};
ok(Math.abs(vagg([cm,c10],1,false).m-(90+100)/2)<1e-9,"mean % per student pct across different mx");
/* កម្រិតថ្នាក់ */
var lv=vlevels([cm,c10,{n:"12NGS-B",st:[]},{n:"Cam-X",st:[]}],1,false);
ok(lv.map(function(x){return x.g}).join()==="9,10,12,0"&&lv[0].l==="ថ្នាក់ទី ៩"&&lv[3].l==="ផ្សេងៗ"&&lv[2].a.m===null,"grade levels parsed from class name, other group, empty→null");
ok(vmf(null)==="—"&&vmf(NaN)==="—"&&vmf(72.345)==="72.3%","vmf safe");
var nn=vlevels([{n:"7NGS-B",st:[]}],3,true);ok(nn.length===1&&nn[0].a.n===0&&nn[0].a.m===null&&JSON.stringify(nn).indexOf("NaN")<0,"empty class no NaN");
/* renderV idempotent (refreshView) */
var W={},ST=0,dstub={};
function mk(id){var o={_h:"",w:0,options:{length:0},firstChild:null,value:"",checked:false};Object.defineProperty(o,"innerHTML",{get:function(){return o._h},set:function(v){o._h=v;o.w++;o.options.length=v?1:0;o.firstChild=v?{}:null}});return o}
function $(id){return W[id]||(W[id]=mk(id))}
var data=[{id:"t1",name:"A"},{id:"t2",name:"B"}],who={id:"t1"},rt="t1",rc=0,rp=1;
function isAdm(){return true}function clsOpts(cl){return cl.map(function(x){return"<option>"+x.n+"</option>"}).join("")}function gbadge(g){return g}function trendSVG(){return""}function teacherOf(id){return data.filter(function(x){return x.id===id})[0]||{}}
rs.c={t1:[cm,c],t2:[c10]};
a=S.indexOf("function stackBar(");b=S.indexOf("function trendSVG(");eval(S.slice(a,b));
a=S.indexOf("function renderV(");b=S.indexOf("/* បោះពុម្ពក្រាហ្វិក");eval(S.slice(a,b));
renderV();var w1=[$("vt").w,$("vc").w,$("vbody").w];ok(w1.join()==="1,1,1","first render writes once");
renderV();renderV();ok([$("vt").w,$("vc").w,$("vbody").w].join()==="1,1,1","renderV idempotent: no rewrite when nothing changed (selects keep open)");
var html0=$("vbody").innerHTML;ok(html0.indexOf("ការវិភាគតាមកម្រិតថ្នាក់")>0&&html0.indexOf("pvw")<0&&!/NaN|undefined/.test(html0),"grade-level card, no banner by default, no NaN/undefined");
rs.c.t2[0].st[0].a[0]=50;renderV();ok($("vbody").w===2&&$("vt").w===1,"body rewritten only when data changes, selects untouched");
vprov=true;renderV();ok($("vbody").w===3&&$("vbody").innerHTML.indexOf("pvw")>0&&$("vbody").innerHTML.indexOf("របៀបមើលបណ្តោះអាសន្ន")>0&&$("vpv").checked===true,"provisional banner shown, checkbox synced");
vprov=false;renderV();ok($("vbody").innerHTML.indexOf("pvw")<0&&rt==="t1"&&rp===1,"toggle off restores; filters kept");
[1,2,3].forEach(function(p){rp=p;[false,true].forEach(function(v){vprov=v;renderV();ok(!/NaN|undefined/.test($("vbody").innerHTML),"no NaN/undefined p"+p+" prov"+v)})});
ok(/\$\("vpv"\)\.onchange=function\(\)\{vprov=this\.checked;renderV\(\)\}/.test(S)&&/id="vpv"/.test(read("index.html")),"toggle wired, default off (vprov=false)");
ok(/var vprov=false,/.test(S)&&!/localStorage[^\n]*vprov|vprov[^\n]*(localStorage|sessionStorage|push\()/.test(S),"vprov not persisted");
print("vcov: checks "+n+" bad "+bad);
