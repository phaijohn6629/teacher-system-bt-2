/* 🧪 ក្រាហ្វិក និងវិភាគ៖ vcov/vagg/vrt/pcmp (ភាពពេញលេញ) · មិនប៉ះ gof — ដំណើរការ៖ jsc tests/vcov.js */
var bad=0,n=0;function ok(c,m){n++;if(!c){bad++;print("FAIL "+m)}}
var S=read("script.js"),window=this;
function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;")}
var SM1=["តុលា","វិច្ឆិកា","ធ្នូ","មករា","កុម្ភៈ","ប្រឡងឆមាស"],SM2=["មីនា","មេសា","ឧសភា","មិថុនា","ប្រឡងឆមាស"];
var rs={c:{},mx:{9:100},pc:[90,80,70,60,50]};
var a=S.indexOf("function ccf("),b=S.indexOf("function crow(");eval(S.slice(a,b));
a=S.indexOf("function vcov(");b=S.indexOf("function lgd(");eval(S.slice(a,b));
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
print("vcov: checks "+n+" bad "+bad);
