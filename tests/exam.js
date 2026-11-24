/* 🧪 វិញ្ញាសា ក/ខ តាមប្លង់តុ (classorg.js abOf/syncAB ↔ exam.js abFor) + ការពារ Selection/Reset (quiz.js setBody)
   ដំណើរការពីថតគម្រោង៖ jsc tests/exam.js */
var bad=0,n=0;function ok(c,m){n++;if(!c){bad++;print("FAIL "+m)}}
function src(f){return read(f)}
function grab(s,startRe,endRe){var i=s.search(startRe);if(i<0)return"";var rest=s.slice(i),j=rest.search(endRe);return j<0?rest:rest.slice(0,j)}
var C=src("classorg.js"),X=src("exam.js"),Q=src("quiz.js");
/* យកតែកូដសុទ្ធ (មិនពឹងលើ DOM) */
var LAYsrc=grab(C,/var LAY=\{/,/\n/),ABsrc=grab(C,/function abOf\(/,/\n/),SYNCsrc=grab(C,/function syncAB\(/,/\n/);
var SEATWsrc=grab(X,/var SEATW=/,/\n/),FORsrc=grab(X,/function abFor\(/,/\nfunction goOnline/);
ok(LAYsrc&&ABsrc&&SYNCsrc&&SEATWsrc&&FORsrc,"extracted abOf/syncAB/abFor sources");
eval(LAYsrc+";"+ABsrc+";"+SYNCsrc+";"+SEATWsrc.replace(/\/\*.*$/,"")+";"+FORsrc);
/* ១) អ្នកជិតគ្នាទាំងឆ្វេង-ស្ដាំ និងមុខ-ក្រោយ ត្រូវទទួលវិញ្ញាសាខុសគ្នា (ក្នុងតុ ២ នាក់ ក៏ដូច្នេះ) */
["d2","d1"].forEach(function(lay){
  var L=LAY[lay],w=L.cols*L.per,N=L.cols*L.rows*L.per,ab=[],i;
  for(i=0;i<N;i++)ab.push(abOf(L,i));
  var hz=0,vt=0;
  for(i=0;i<N;i++){
    if(i%w<w-1&&ab[i]===ab[i+1])hz++;     /* ឆ្វេង-ស្ដាំ (រួមទាំងដៃគូតុតែមួយ) */
    if(i+w<N&&ab[i]===ab[i+w])vt++;       /* មុខ-ក្រោយ */
  }
  ok(hz===0,lay+": horizontal neighbours differ ("+hz+" same)");
  ok(vt===0,lay+": front/back neighbours differ ("+vt+" same)");
  ok(ab.filter(function(x){return x==="ក"}).length===N/2,lay+": half ក, half ខ");
});
/* ២) syncAB → abMap ហើយ exam.js abFor ផ្ដល់លទ្ធផលដូចគ្នា (abMap មុន · បើគ្មាន → តាមលេខកៅអី) */
["d2","d1"].forEach(function(lay){
  var N=LAY[lay].cols*LAY[lay].rows*LAY[lay].per,S={lay:lay,s:[]},c={seat:S},E={ab:true},st=[];
  for(var i=0;i<N-3;i++){S.s.push("i:S"+i);st.push({id:"S"+i,n:"N"+i})}
  S.s.splice(5,0,"");   /* កៅអីទំនេរ */
  syncAB(S);var good=true;
  st.forEach(function(s){var j=S.s.indexOf("i:"+s.id);if(abFor(E,c,s,0)!==abOf(LAY[lay],j))good=false});
  ok(good,lay+": abFor equals seat-based paper (abMap)");
  var S2={lay:lay,s:S.s.slice()},c2={seat:S2},good2=true;   /* គ្មាន abMap → តាមលេខកៅអី */
  st.forEach(function(s){var j=S2.s.indexOf("i:"+s.id);if(abFor(E,c2,s,0)!==abOf(LAY[lay],j))good2=false});
  ok(good2,lay+": abFor falls back to seat index");
  ok(abFor({ab:false},c,st[0],0)==="","abFor empty when A/B off");
  ok(abFor(E,{},{id:"x",n:"x"},3)==="ខ"&&abFor(E,{},{id:"x",n:"x"},2)==="ក","abFor falls back to alternating when no seat plan");
});
/* ៣) Selection/Reset ៖ quiz.js setBody មិនគូរ DOM ឡើងវិញពេល HTML ដដែល · exam.js render() no-op ពេលកំពុងកែ */
ok(/function setBody\(h\)/.test(Q)&&/b\.__h===k/.test(Q),"quiz.js setBody idempotent");
ok(/renderQuiz\(ext\)/.test(Q)&&/ext===true/.test(Q),"renderQuiz ignores external re-render while a field is focused");
ok(!/\$\("qzBody"\)\.innerHTML=h;math/.test(Q),"no direct innerHTML rebuild left in bank/make render");
ok(/dataset\.exid===X\.E\.id&&el\.querySelector\("#exPrev"\)/.test(X),"EXAM.render no-op while same exam open");
/* ៤) សុវត្ថិភាពទិន្នន័យ ៖ ទំហំវិញ្ញាសា · ប្រវែងសំណួរ */
ok(/jj\.length>900000/.test(X),"exam save size guard");
ok(/o\.q\.length>3000/.test(Q)&&/x\.length>600/.test(Q)&&/o\.a\.length>200/.test(Q),"question field length limits");
/* ៥) បញ្ជីឈ្មោះ ក/ខ (rosterPrint) ៖ គ្រប់សិស្សដែលមានកៅអីមានក/ខ ត្រូវតាមប្លង់ · ចំនួន ក+ខ = ចំនួនអង្គុយ · សិស្សគ្មានកៅអីត្រូវបានរាយ */
var KEYsrc=grab(C,/function key\(s\)/,/\n/),SEATsrc=grab(C,/function seat\(c\)/,/\n/),NSsrc=grab(C,/function nSeats\(/,/\n/),BKsrc=grab(C,/function byKey\(/,/\n/),
    CLsrc=grab(C,/function cleanSeat\(/,/\nfunction fillSeats/),RPsrc=grab(C,/function rosterPrint\(/,/\n\}\n/)+"\n}";
var esc=function(x){return String(x)},kn=function(x){return String(x)},inf=function(){return{school:"S"}},LOGOBT=function(){return""};
eval(KEYsrc+";"+SEATsrc+";"+NSsrc+";"+BKsrc+";"+CLsrc+";"+RPsrc);
var cl={n:"12A",st:[],seat:{lay:"d2",s:[]}};for(var q=0;q<40;q++)cl.st.push({id:"P"+q,n:"Name"+q});
for(var q2=0;q2<30;q2++)cl.seat.s.push("i:P"+q2);   /* ៣០ អង្គុយ · ១០ គ្មានកៅអី */
var html=rosterPrint(cl);
var nA=(html.match(/class='ab-a'/g)||[]).length,nB=(html.match(/class='ab-b'/g)||[]).length;
ok(nA+nB===30,"roster lists every seated student ("+(nA+nB)+")");
ok(/មិនទាន់មានកៅអី ៖ 10 នាក់/.test(html),"roster reports unseated students");
ok(html.indexOf("Name35")>=0,"unseated names listed");
/* ៦) អត្រាកំណែ ក/ខ ដាច់ពីគ្នា ៖ វិញ្ញាសា ខ មានសំណួរ/ចម្លើយផ្សេង → អត្រាកំណែ ខ ត្រូវបង្ហាញខ្លឹមសារ ខ មិនមែន ក */
var window=this;try{load("expaper.js")}catch(e){print("load expaper: "+e)}
ok(window.EXP&&EXP.html,"expaper loaded");
if(window.EXP&&EXP.html){
  var PP={school:"S",title:"T",sub:"M",cls:"12A",dur:45,date:"2026-01-01",place:"",au:"",ck:"",fmt:"",secs:[{pts:4,inst:"",it:[{q:"QA-one $x$",ans:"ANS-A",sol:"SOL-A"}],itB:[{q:"QB-one $y$",ans:"ANS-B",sol:"SOL-B"}]}]};
  var kA=EXP.html(PP,{v:"a",key:true,lbl:"ក"}),kB=EXP.html(PP,{v:"b",key:true,lbl:"ខ"}),pB=EXP.html(PP,{v:"b",lbl:"ខ"});
  ok(kA.indexOf("ANS-A")>=0&&kA.indexOf("ANS-B")<0,"answer key ក shows only paper ក answers");
  ok(kB.indexOf("ANS-B")>=0&&kB.indexOf("ANS-A")<0,"answer key ខ shows only paper ខ answers");
  ok(/អត្រាកំណែ\s*ក/.test(kA)&&/អត្រាកំណែ\s*ខ/.test(kB),"answer keys are labelled ក / ខ");
  ok(pB.indexOf("QB-one")>=0&&pB.indexOf("QA-one")<0,"paper ខ shows ខ questions");
}
ok(/data-ex='pr\|ka'/.test(X)&&/data-ex='pr\|kb'/.test(X),"editor has separate answer-key buttons ក / ខ");
ok(/isK=\/\^k\[ab\]\?\$\/\.test\(kind\)/.test(X)&&/isB=kind==="b"\|\|kind==="kb"/.test(X),"printIt handles ka/kb");
/* ៧) មើលជាមុន ក/ខ ដាច់ពីគ្នា + សង្ខេបវិញ្ញាសាតាមប្លង់តុក្នុងប្រអប់ប្រឡងអនឡាញ */
ok(/data-ex='pv\|a'/.test(X)&&/data-ex='pv\|b'/.test(X),"preview has separate ក / ខ buttons");
ok(/function pvOf\(E\)/.test(X)&&/EXP\.html\(P\(X\.E\),\{v:pvOf\(X\.E\)/.test(X),"preview renders the selected paper");
ok(/function abSummary\(E\)/.test(X)&&/abSummary\(E\)\+"<div id=exV>"/.test(X),"online box lists who gets paper ក / ខ");
/* ៨) កែវិញ្ញាសា ខ បាន ៖ textarea data-ei មាន |b · input instB · onInput សរសេរចូល itB/instB */
ok(/function editB\(E,s\)/.test(X)&&/data-ei='"\+i\+"\|"\+j\+\(editB\(E,s\)\?"\|b":""\)/.test(X),"editor renders paper ខ items with |b");
ok(/p\[2\]==="b"\?"itB":"it"/.test(X)&&/k==="instB"\)\{s\.instB=t\.value/.test(X),"edits of paper ខ are written to itB / instB");
ok(/if\(a==="pv"\)\{X\.pv=/.test(X)&&/ក\/ខ|វិញ្ញាសា ខ/.test(X),"switching ក/ខ rebuilds the editor");
/* 📊 ទម្រង់បើក៖ ចែកពិន្ទុតាមលំហាត់ និងតាមជំហាន — បូកត្រូវពិន្ទុជានិច្ច (ជំហាន ០,៥) · តាមថ្នាក់៖ ២០ (៧–៩) · ៣០ (១០) · ២៥ (១១–១២) */
var EXPsrc=src("expaper.js"),SPsrc=grab(EXPsrc,/function splitPts\(/,/\nfunction mathSplit/),STsrc=grab(EXPsrc,/function mathSplit\(/,/\nfunction stepHtml/);
ok(SPsrc&&STsrc,"extracted splitPts/solSteps sources");
var noP=function(s){return String(s||"")};eval(SPsrc+";"+STsrc);
var sm=function(a){return Math.round(a.reduce(function(x,y){return x+y},0)*2)/2};
[[20,4],[20,5],[30,5],[30,4],[30,6],[25,5],[25,4],[25,3],[20,3],[25,7],[30,10]].forEach(function(c){var a=splitPts(c[0],c[1]);ok(a.length===c[1]&&sm(a)===c[0],"splitPts "+c+" → "+a);ok(a.every(function(v){return v>0&&v*2===Math.floor(v*2)}),"splitPts half-units "+c);ok(Math.max.apply(null,a)-Math.min.apply(null,a)<=.5,"splitPts even "+c)});
ok(splitPts(20,4).join()==="5,5,5,5"&&splitPts(25,4).join()==="6,6,6.5,6.5","splitPts exact values");
/* stepGroups៖ បូក = ពិន្ទុ · គ្របដណ្ដប់គ្រប់ជំហាន · ជំហានច្រើនជាងពិន្ទុ → បញ្ចូលគ្នា */
for(var nn=1;nn<=9;nn++)[.5,1,2,3,4,5,6.5,7.5].forEach(function(p){var G=stepGroups(nn,p);ok(sm(G.map(function(g){return g.p}))===p,"stepGroups sum n"+n+" p"+p);ok(G[0].a===0&&G[G.length-1].b===nn-1,"stepGroups cover n"+n+" p"+p);
  ok(G.every(function(g,i){return g.b>=g.a&&(!i||g.a===G[i-1].b+1)&&g.p>0}),"stepGroups contiguous n"+n+" p"+p)});
/* ⚖️ ចែកតាមលេខរ៉ូម៉ាំង៖ បូកត្រូវសរុប · ជំហាន ០,៥ · ≥ ០,៥ · កើនតាមលំដាប់ (កម្រិតដូចគ្នា) · ទម្ងន់តាមកម្រិត/ចំនួនសំណួរ */
var WTsrc=grab(EXPsrc,/var LW=\{/,/\nfunction mathSplit/);ok(WTsrc,"extracted wts/splitW");eval(WTsrc);
[[20,4],[20,5],[30,5],[25,5],[25,4],[30,6],[20,3],[17.5,5],[1,3],[10,10]].forEach(function(c){var secs=[];for(var i=0;i<c[1];i++)secs.push({lv:2,it:[{}]});var a=splitW(c[0],wts(secs));
  ok(a.length===c[1]&&sm(a)===c[0],"splitW sum "+c+" → "+a);ok(a.every(function(v){return v*2===Math.floor(v*2)&&(c[0]<c[1]/2||v>=.5)}),"splitW half-units "+c);
  if(c[0]>=c[1]*1.5)ok(a.every(function(v,k){return!k||v>=a[k-1]}),"splitW non-decreasing "+c+" → "+a)});
ok(splitW(20,wts([{lv:2,it:[{}]},{lv:2,it:[{}]},{lv:2,it:[{}]},{lv:2,it:[{}]},{lv:2,it:[{}]}])).join()==="3,3.5,4,4.5,5","splitW 20/5 ramp exact");
var wA=splitW(20,wts([{lv:1,it:[{},{},{}]},{lv:2,it:[{},{}]},{lv:3,it:[{}]}]));ok(sm(wA)===20&&wA[2]>wA[0]/3,"splitW level+count weights "+wA);
ok(splitW(20,[]).length===0,"splitW empty");
var S1=solSteps("$f'(x)=2x+2=0$ ⇒ $x=-1$ ⇒ $f(-1)=6$");ok(S1.length>=4,"solSteps arrow+= split: "+S1.length);
var S2=solSteps("\\text{តាមរូបមន្ត}\n$$\\begin{aligned}a&=1\\\\b&=2\\\\c&=3\\end{aligned}$$");ok(S2.length===4&&S2[1].m==="a&=1","solSteps aligned rows: "+JSON.stringify(S2));
var S3=solSteps("$a=\\dfrac{-2-(4)}{-3-(-5)}=\\dfrac{-6}{2}=-3$");ok(S3.length===3&&/^a&=/.test(S3[0].m)&&/^&=/.test(S3[2].m),"solSteps chain = : "+JSON.stringify(S3));
ok(solSteps("").length===0&&solSteps(null).length===0,"solSteps empty");
ok(/stp:!!E\.stp/.test(X)&&/data-ex=opn/.test(X)&&/EXP\.splitPts/.test(X)&&/opTarget\(g\)\{return g>=11\?25:g===10\?30:20\}/.test(X),"exam.js wires open-format panel (20/30/25)");
ok(/total:total,splitPts/.test(EXPsrc)&&/function total\(P\)\{return\(P\.secs\|\|\[\]\)\.reduce\(function\(s,x\)\{return s\+\(\+x\.pts\|\|0\)\},0\)\}/.test(EXPsrc),"EXP.total unchanged (sum of secs pts)");
var HT=read("exam.html");
ok(/data-ef=lx/.test(X)&&/\[1,2,3,4,5\]\.map/.test(X)&&/lx:lxOf\(E\)/.test(X)&&/exLxDef_/.test(X),"exam.js: lx 1–5 option, default per teacher, published in exm");
ok(/function lockOut/.test(HT)&&/AC\.lv>=LX\(\)/.test(HT)&&/const LX=/.test(HT),"exam.html: lock after lx leaves, 0 = legacy record-only");
print("exam: checks "+n+" bad "+bad);
