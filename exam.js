/* ========================================================================
   📝 ប្រឡងទម្រង់បើក (ផ្ទាំង «តេស្ត») — បង្កើតវិញ្ញាសាស្វ័យប្រវត្តិពីម៉ាស៊ីនលំហាត់ (practice*.js)
   - ផ្នែក I, II, … = មេរៀន + កម្រិត + ចំនួនលំហាត់រង (ក ខ គ …) + ពិន្ទុ · 🔄 បង្កើតឡើងវិញ · ✏️ កែដោយដៃ
   - 🖨️ បោះពុម្ព A4 (ក្បាល/ជើងតាមគំរូសាលា · ថ្ងៃចន្ទគតិ) · វិញ្ញាសា ក/ខ (លេខខុសគ្នា) · 🔑 ចម្លើយ និងដំណោះស្រាយ
   - 📱 អនឡាញ៖ សិស្សមើលប្រធានលើទូរស័ព្ទ (exam.html) ក្នុងនាទីកំណត់ · សរសេរចម្លើយលើក្រដាស · មិនទទួលចម្លើយ
   Firestore៖ exams/{id} = {o, cls, t, u, j:JSON} (គ្រូ) · exm/{id} = {o,t,cls,dur,endMs,open,names,sch} (សាធារណៈពេលបើក)
              exq/{id}_{លេខកូដ} = {o, t:id, j:JSON វិញ្ញាសា (គ្មានចម្លើយ)} · exv/{id}_{សិស្ស} = អ្នកកំពុងមើល (🚩)
   ត្រូវផ្ទុកបន្ទាប់ពី quiz.js · expaper.js
   ======================================================================== */
(function(){
"use strict";
var GENS=["pisa12.js?v=2","practice11.js?v=4","practice10.js?v=3","practice9.js?v=4","practice8.js?v=2","practice7.js?v=2"],GENE=["practiceen2.js?v=1","practiceen3.js?v=1"],GEN4=["practiceen4.js?v=4","practiceen5.js?v=2","practiceen6.js?v=2"],genP=null,kxP=null;
var CAMG=[106,107,108,109,110,111,112];   /* 🇬🇧 ថ្នាក់ Cambridge (practiceen*.js) */
var KX="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/",KXM={"\\R":"\\mathbb{R}","\\C":"\\mathbb{C}","\\N":"\\mathbb{N}","\\Z":"\\mathbb{Z}","\\Q":"\\mathbb{Q}"};
var LVN={1:"កម្រិត ១ · មូលដ្ឋាន",2:"កម្រិត ២ · មធ្យម",3:"កម្រិត ៣ · ពិបាក",4:"🌍 PISA · ជីវិតពិត"};
var TITLES=["ប្រឡងតេស្តប្រចាំខែ","ប្រឡងប្រចាំខែ","ប្រឡងឆមាសទី១","ប្រឡងឆមាសទី២","ប្រឡងសាកល្បង"];
var X={list:null,E:null,err:"",dirty:false,saveT:0,status:"",vUn:null,views:[],tick:0};
function ld(src){return new Promise(function(ok,no){var s=document.createElement("script");s.src=src;s.onload=ok;s.onerror=no;document.head.appendChild(s)})}
/* ⏱ កុំឱ្យជាប់ «កំពុងផ្ទុក…» រហូត៖ កំណត់ពេលអតិបរមា រួចបង្ហាញប៊ូតុង 🔄 ផ្ទុកម្ដងទៀត */
function tmo(p,ms){return Promise.race([p,new Promise(function(_,no){setTimeout(function(){no({code:"timeout"})},ms)})])}
function retryBtn(){return" <button type=button data-ex=reload>🔄 ផ្ទុកម្ដងទៀត</button>"}
/* ⚡ ម៉ាស៊ីនលំហាត់៖ ទាញព្រមគ្នាទាំងអស់ (async=false = ដំណើរការតាមលំដាប់) ជំនួសឱ្យការរង់ចាំម្ដងមួយ */
function ENG(){return["practice.js?v=13","exgen.js?v=13"].concat(GENS,["practiceen.js?v=4"],GENE,GEN4)}
function engReady(){return!!(window.PRACT&&PRACT.GR&&PRACT.GR[7]&&PRACT.GR[112]&&PRACT.GR[110]&&PRACT.GR[110].G[31]&&window.EXGEN&&window.CAMPAPERS&&CAMPAPERS[112])}
function gen(){
  if(engReady())return Promise.resolve();
  if(!genP)genP=new Promise(function(ok,no){var L=ENG().filter(function(u){return!(/^exgen\.js/.test(u)&&window.EXGEN)}),left=L.length;
    L.forEach(function(u){var sc=document.createElement("script");sc.src=u;sc.async=false;sc.onload=function(){if(--left===0)ok()};sc.onerror=function(){no(u)};document.head.appendChild(sc)})})
    .catch(function(e){genP=null;throw e});
  return genP;
}
/* 📥 ទាញទុកជាមុនពេលទំនេរ (ទុកក្នុង cache · មិនដំណើរការ) → ពេលបើក «ប្រឡងបើក» លឿន */
setTimeout(function(){if(navigator.connection&&navigator.connection.saveData)return;var go=function(){if(engReady()||genP)return;ENG().forEach(function(u){var l=document.createElement("link");l.rel="prefetch";l.as="script";l.href=u;document.head.appendChild(l)})};if(window.requestIdleCallback)requestIdleCallback(go,{timeout:15000});else go()},12000);
function katex(){
  if(window.renderMathInElement)return Promise.resolve();
  if(!kxP){var l=document.createElement("link");l.rel="stylesheet";l.href=KX+"katex.min.css";document.head.appendChild(l);
    kxP=(window.katex?Promise.resolve():ld(KX+"katex.min.js")).then(function(){return ld(KX+"contrib/auto-render.min.js")})}
  return kxP;
}
function math(el){return katex().then(function(){try{renderMathInElement(el,{delimiters:[{left:"$$",right:"$$",display:true},{left:"$",right:"$",display:false},{left:"\\(",right:"\\)",display:false}],throwOnError:false,macros:KXM})}catch(e){}})}
function today(){var d=new Date();return d.getFullYear()+"-"+("0"+(d.getMonth()+1)).slice(-2)+"-"+("0"+d.getDate()).slice(-2)}
function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2,6)}
function myCls(){return(rs.c&&rs.c[X.E&&X.E.o||who.id])||[]}
function body(){return $("qzBody")}
function lsList(g){var G=window.PRACT&&PRACT.GR[g];return G?G.les:[]}
function lsTitle(g,ls){var t="";lsList(g).forEach(function(c){c[1].forEach(function(x){if(+x[0]===+ls)t=x[1]})});return t}
function tplOpts(g,s){var T=window.EXGEN&&EXGEN.list(g+"|"+s.ls);if(!T||!T.length)return"";
  return"<optgroup label='🇰🇭 គំរូប្រឡង (ទម្រង់កម្ពុជា)'>"+T.map(function(x){var v="t:"+x.id;return"<option value='"+v+"'"+(v===String(s.lv)?" selected":"")+">"+esc(x.t)+"</option>"}).join("")+"</optgroup>"}
function hasLv4(g,ls){var G=PRACT.GR[g]&&PRACT.GR[g].G[ls];return!!(G&&G[4])}
/* ---------- បង្កើតលំហាត់ ---------- */
function mkItem(g,ls,lv,avoid){
  var G=PRACT.GR[g]&&PRACT.GR[g].G[ls],f=G&&(G[lv]||G[3]||G[1]);if(!f)return{q:"(មេរៀននេះមិនមានម៉ាស៊ីនបង្កើតលំហាត់ · សូមសរសេរដោយដៃ)",fig:"",ans:"",sol:""};
  var x=null;for(var k=0;k<6;k++){try{x=f()}catch(e){x=null}if(x&&(!avoid||avoid.indexOf(x.q)<0))break}
  if(!x)return{q:"(បង្កើតមិនបាន · ចុច 🔄 ម្ដងទៀត)",fig:"",ans:"",sol:""};
  return{q:x.q,fig:x.fig||"",ans:(x.a||[]).map(function(a){return(a.l?a.l+" ":"")+"$"+a.t+"$"}).join(" · "),sol:x.s||"",al:(x.a||[]).map(function(a){return a.l||""}),at:(x.a||[]).map(function(a){return a.t}),mk:x.mk||0,mks:x.mks||null,ex:!!x.ex,kd:x.kd||""};
}
function isT(s){return/^t:/.test(String(s.lv))}
function fill(s,g,which){
  var key=which||"it",out=[];
  /* 🇰🇭 គំរូប្រឡង (exgen.js)៖ ទិន្នន័យរួម + សំណួររង · វិញ្ញាសា ខ មានទិន្នន័យផ្ទាល់ខ្លួន (instB) */
  if(isT(s)&&window.EXGEN){var o=EXGEN.make(g+"|"+s.ls,String(s.lv).slice(2));if(o){s[key]=o.it;if(key==="it")s.inst=o.inst;else s.instB=o.inst;s.n=o.it.length;return}}for(var i=0;i<s.n;i++)out.push(mkItem(g,s.ls,s.lv,out.map(function(x){return x.q})));s[key]=out;
}
function newSec(g,ls){var T=window.EXGEN&&EXGEN.list(g+"|"+ls),s={ls:ls,lv:T&&T.length?"t:"+T[0].id:2,n:2,pts:4,inst:g>100?"":"ដោះស្រាយលំហាត់ខាងក្រោម៖"};fill(s,g);if(X.E&&X.E.ab)fill(s,g,"itB");return s}
function newExam(){
  var c=(rs.c&&rs.c[who.id]||[])[0],g=c?parseInt(c.n):0,t=teacherOf(who.id)||{},ck="";try{ck=localStorage.getItem("exCk")||""}catch(e){}
  var d=new Date(),E={id:uid(),o:who.id,cls:c?c.n:"",title:TITLES[0],mo:d.getFullYear()+"-"+("0"+(d.getMonth()+1)).slice(-2),sub:t.sub||"គណិតវិទ្យា",dur:45,date:today(),place:"រាជធានីភ្នំពេញ",au:t.name||who.name||"",ck:ck,ab:false,secs:[],cr:new Date().toISOString()};
  var L=lsList(g),first=L[0]&&L[0][1][0];if(first)E.secs.push(newSec(g,first[0]));
  return E;
}
function gOf(E){return E.fmt==="cam"?(+E.camg||110):parseInt(E.cls)||0}
function camDef(E){var c=parseInt(E.cls)||0;return 100+(c>=6&&c<=12?c:10)}
function resetSecs(E){var g=gOf(E),L=lsList(g),f0=L[0]&&L[0][1][0];E.secs=f0?[newSec(g,f0[0])]:[];if(E.ab)E.secs.forEach(function(s){fill(s,g,"itB")})}
function P(E){return{camg:E.camg,gt:E.fmt==="cam"&&window.PRACT&&PRACT.GR[gOf(E)]?PRACT.GR[gOf(E)].title:"",calc:E.calc!==false,font:E.font||"os",fmt:E.fmt||"",trk:E.trk||"",school:inf().school,title:E.title,mo:E.mo,sub:E.sub,cls:E.cls,dur:E.dur,date:E.date,place:E.place,au:E.au,ck:E.ck,secs:E.secs}}
/* ---------- រក្សាទុក (exams/{id}) ---------- */
function save(now){
  X.dirty=true;X.status="…";clearTimeout(X.saveT);
  X.saveT=setTimeout(function(){
    var E=X.E;if(!E)return;var F=window.FB,o=Object.assign({},E);delete o.id;
    E.u=new Date().toISOString();
    /* 📦 រក្សាទុកជាពីរឯកសារ៖ exams/{id} = សង្ខេប (បញ្ជីទាញតែនេះ · លឿន) · exams/{id}__c = ខ្លឹមសារពេញ (ទាញពេលបើក) */
    F.setDoc(F.doc(window.db,"exams",E.id+"__c"),{o:E.o,k:"c",u:E.u,j:JSON.stringify(o)}).then(function(){return F.setDoc(F.doc(window.db,"exams",E.id),sumOf(E))}).then(function(){X.dirty=false;X.status="✅ បានរក្សាទុក";stat()},function(e){console.error("exam save:",e);X.status="⚠️ មិនទាន់រក្សាទុក ("+(e&&e.code==="permission-denied"?"សូម Admin Publish firestore.rules":"អ៊ីនធឺណិត")+")";stat()});
    try{localStorage.setItem("exCk",E.ck||"")}catch(e){}
  },now?0:1200);stat();
}
function stat(){var s=$("exSt");if(s)s.textContent=X.status}
function sumOf(E){return{o:E.o,cls:E.cls,t:EXP.head(E),u:E.u,k:"s",ns:(E.secs||[]).length,pts:EXP.total(E),dur:+E.dur||0,fmt:E.fmt||"",on:E.on&&E.on.open?{open:true,endMs:E.on.endMs||0,code:E.on.code||""}:null}}
/* ផ្ទេរវិញ្ញាសាទម្រង់ចាស់ (ខ្លឹមសារក្នុងឯកសារតែមួយ) → ពីរឯកសារ · ម្ដងគត់ក្នុងឧបករណ៍មួយ */
function migrate(){var F=window.FB,key="exMig2_"+who.id;try{if(localStorage.getItem(key))return Promise.resolve()}catch(e){}
  var q=isAdm()?F.collection(window.db,"exams"):F.query(F.collection(window.db,"exams"),F.where("o","==",who.id));
  return tmo(F.getDocs(q),60000).then(function(sn){var todo=[];sn.forEach(function(d){var v=d.data();if(!v.k&&v.j)todo.push([d.id,v])});
    return todo.reduce(function(pr,x){return pr.then(function(){var E;try{E=JSON.parse(x[1].j)}catch(e){return}E.o=E.o||x[1].o;E.u=x[1].u||E.u;
      return F.setDoc(F.doc(window.db,"exams",x[0]+"__c"),{o:x[1].o,k:"c",u:x[1].u||"",j:x[1].j}).then(function(){var s=sumOf(E);s.o=x[1].o;s.cls=x[1].cls||s.cls;s.t=x[1].t||s.t;s.u=x[1].u||s.u;return F.setDoc(F.doc(window.db,"exams",x[0]),s)})})},Promise.resolve())
  }).then(function(){try{localStorage.setItem(key,"1")}catch(e){}},function(e){console.warn("exam migrate:",e)})}
function loadList(){
  var F=window.FB;
  return migrate().then(function(){var q=isAdm()?F.query(F.collection(window.db,"exams"),F.where("k","==","s")):F.query(F.collection(window.db,"exams"),F.where("o","==",who.id),F.where("k","==","s"));return tmo(F.getDocs(q),25000)})
  .then(function(sn){var a=[];sn.forEach(function(d){var v=d.data();a.push({id:d.id,o:v.o,cls:v.cls,t:v.t,u:v.u,ns:v.ns,pts:v.pts,dur:v.dur,on:v.on})});a.sort(function(x,y){return(y.u||"").localeCompare(x.u||"")});X.list=a;X.err=""},
    function(e){X.list=[];X.err=e&&e.code==="permission-denied"?"គ្មានសិទ្ធិ · សូម Admin Publish firestore.rules កំណែថ្មី (មាន exams)":e&&e.code==="timeout"?"ផ្ទុកបញ្ជីវិញ្ញាសាយូរពេក (អ៊ីនធឺណិតយឺត)":"មិនអាចផ្ទុកបញ្ជីវិញ្ញាសាបានទេ"});
}
/* ===================== ផ្ទាំង ===================== */
function render(){
  var el=body();if(!el)return;
  if(!X.E&&!X.list&&!X.lp&&window.FB&&window.db)X.lp=loadList().then(function(){X.lp=null;if(QVx()==="exam")render()});   /* ទាញបញ្ជីព្រមគ្នានឹងម៉ាស៊ីន */
  if(!engReady()&&!genP)gen().catch(function(){});   /* ផ្ទុកនៅពីក្រោយ · បញ្ជីបង្ហាញភ្លាមដោយមិនរង់ចាំ */
  if(X.E&&!engReady()){el.innerHTML="<p class=note>⏳ កំពុងផ្ទុកម៉ាស៊ីនបង្កើតលំហាត់…</p>";tmo(gen(),45000).then(render,function(e){genP=null;el.innerHTML="<p class=cxwarn>⚠️ "+(e&&e.code==="timeout"?"ផ្ទុកម៉ាស៊ីនបង្កើតលំហាត់យូរពេក (អ៊ីនធឺណិតយឺត)":"មិនអាចផ្ទុកម៉ាស៊ីនបង្កើតលំហាត់បានទេ")+" · សូមពិនិត្យអ៊ីនធឺណិត"+retryBtn()+"</p>"});return}
  if(X.E)return editor();
  if(!X.list){el.innerHTML="<p class=note>⏳ កំពុងផ្ទុកបញ្ជីវិញ្ញាសា…</p>";if(!X.lp)X.lp=loadList().then(function(){X.lp=null;if(QVx()==="exam")render()});return}
  try{renderList(el)}catch(e){console.error("exam list:",e);el.innerHTML="<p class=cxwarn>⚠️ បង្ហាញបញ្ជីវិញ្ញាសាមិនបាន"+retryBtn()+"</p>"}
}
function renderList(el){
  el.innerHTML="<div class=bar><b>📝 ប្រឡងទម្រង់បើក</b><span class=note style='margin:0'>បង្កើតវិញ្ញាសាស្វ័យប្រវត្តិ · បោះពុម្ព ឬបើកឱ្យសិស្សមើលលើទូរស័ព្ទ (សរសេរចម្លើយលើក្រដាស)</span><button type=button class=primary data-ex=new>＋ វិញ្ញាសាថ្មី</button></div>"+
    (X.err?"<p class=cxwarn>⚠️ "+esc(X.err)+retryBtn()+"</p>":"")+
    (X.list.length?"<div class=qr-list>"+X.list.map(function(x){var on=x.on&&x.on.open&&x.on.endMs>Date.now();
      return"<div class=qr-card><div><b>"+esc(x.t||"វិញ្ញាសា")+"</b><small>"+esc(x.cls||"")+" · "+(x.ns!=null?kn(x.ns)+" ផ្នែក · "+kn(x.pts||0)+" ពិន្ទុ · "+kn(x.dur||0)+" នាទី":"")+" · "+esc((x.u||"").slice(0,10))+(isAdm()&&x.o!==who.id?" · "+esc((teacherOf(x.o)||{}).name||x.o):"")+"</small></div>"+
        "<span class='qr-st"+(on?" on":"")+"'>"+(on?"🟢 កំពុងប្រឡងអនឡាញ":"📄 ក្រដាស")+"</span><button type=button class=primary data-ex='open|"+x.id+"'>បើក</button><button type=button data-ex='dup|"+x.id+"' title='ចម្លងជាវិញ្ញាសាថ្មី'>📑</button><button type=button class=danger data-ex='del|"+x.id+"'>🗑️</button></div>"}).join("")+"</div>"
      :"<p class=note>មិនទាន់មានវិញ្ញាសាទេ។ ចុច «＋ វិញ្ញាសាថ្មី» ដើម្បីចាប់ផ្ដើម។</p>");
}
function lsOpts(g,sel){return lsList(g).map(function(c){return"<optgroup label='"+esc(c[0])+"'>"+c[1].map(function(x){return"<option value="+x[0]+(+x[0]===+sel?" selected":"")+">"+esc(x[1])+"</option>"}).join("")+"</optgroup>"}).join("")}
function editor(){
  var E=X.E,g=gOf(E),cl=myCls(),ro=!(E.o===who.id||isAdm()),on=E.on&&E.on.open;
  var h="<div class=bar><button type=button data-ex=back>‹ វិញ្ញាសាទាំងអស់</button><b>"+esc(EXP.head(E))+"</b><span id=exSt class=note style='margin:0'>"+esc(X.status)+"</span>"+
    "<span style='flex:1'></span><button type=button data-ex='pr|a'>🖨️ វិញ្ញាសា"+(E.ab?" ក":"")+"</button>"+(E.ab?"<button type=button data-ex='pr|b'>🖨️ វិញ្ញាសា ខ</button>":"")+"<button type=button data-ex='pr|k'>🔑 ចម្លើយ</button>"+
    "<button type=button class=primary data-ex=online>📱 "+(on?"កំពុងប្រឡងអនឡាញ":"បើកប្រឡងអនឡាញ")+"</button></div>";
  if(on)h+=onlineBox();
  h+="<div class=ex-grid><div class=card><h3 style='margin-top:0'>ក្បាល និងជើងវិញ្ញាសា</h3><div class=fg>"+
    "<div><label>ថ្នាក់</label><select data-ef=cls>"+cl.map(function(c){return"<option"+(c.n===E.cls?" selected":"")+">"+esc(c.n)+"</option>"}).join("")+(cl.some(function(c){return c.n===E.cls})?"":"<option selected>"+esc(E.cls)+"</option>")+"</select></div>"+
    "<div><label>ពុម្ពអក្សរ</label><select data-ef=font>"+Object.keys(EXP.FONTS).map(function(k){return"<option value="+k+((E.font||"os")===k?" selected":"")+">"+esc(EXP.FONTS[k].n)+"</option>"}).join("")+"</select></div>"+
    "<div><label>ទម្រង់ក្បាលវិញ្ញាសា</label><select data-ef=fmt><option value=''>🏫 ប្រឡងសាលា (ឈ្មោះសិស្ស · ហត្ថលេខា)</option><option value=bac"+(E.fmt==="bac"?" selected":"")+">📋 ទម្រង់បាក់ឌុប (មណ្ឌល · បន្ទប់ · តុ)</option><option value=dip"+(E.fmt==="dip"?" selected":"")+">🎓 ទម្រង់ឌីប្លូម ថ្នាក់ទី៩ (មណ្ឌល · បន្ទប់ · តុ)</option><option value=cam"+(E.fmt==="cam"?" selected":"")+">🇬🇧 Cambridge style (English · ក្រដាសសំណួរ + Mark scheme)</option></select></div>"+
    (E.fmt==="cam"?"<div><label>🇬🇧 កម្រិត Cambridge</label><select data-ef=camg>"+CAMG.filter(function(c){return PRACT.GR[c]}).map(function(c){return"<option value="+c+(c===gOf(E)?" selected":"")+">"+esc(PRACT.GR[c].title)+"</option>"}).join("")+"</select></div>"+
      "<div><label style='display:flex;gap:6px;align-items:center'><input type=checkbox data-ef=calc"+(E.calc!==false?" checked":"")+" style='width:auto;margin:0'> Calculator allowed</label><small class=note>បើមិនធីក៖ «Calculators must not be used»</small></div>":"")+
    (E.fmt==="bac"?"<div><label>ផ្នែក</label><input data-ef=trk list=exTrk value='"+esc(E.trk||"")+"'><datalist id=exTrk><option value='ថ្នាក់វិទ្យាសាស្ត្រពិត'><option value='ថ្នាក់វិទ្យាសាស្ត្រសង្គម'><option value='វិទ្យាសាស្ត្រ'></datalist></div>":"")+
    "<div><label>ចំណងជើង</label><input data-ef=title list=exTl value='"+esc(E.title)+"'><datalist id=exTl>"+TITLES.map(function(t){return"<option value='"+t+"'>"}).join("")+"</datalist></div>"+
    (E.fmt==="bac"||E.fmt==="dip"||E.fmt==="cam"?"":"<div><label>ខែ (ទុកទទេ = មិនបង្ហាញ)</label><input type=month data-ef=mo value='"+esc(E.mo||"")+"'></div>")+
    "<div><label>មុខវិជ្ជា</label><input data-ef=sub value='"+esc(E.sub)+"'></div>"+
    "<div><label>រយៈពេល (នាទី)</label><input type=number min=5 max=300 data-ef=dur value="+(+E.dur||45)+"></div>"+
    "<div><label>"+(E.fmt==="bac"||E.fmt==="dip"?"សម័យប្រឡង":"កាលបរិច្ឆេទ")+"</label><input type=date data-ef=date value='"+esc(E.date)+"'></div>"+
    "<div><label>ធ្វើនៅ</label><input data-ef=place value='"+esc(E.place)+"'></div>"+
    "<div><label>អ្នកចេញវិញ្ញាសា</label><input data-ef=au value='"+esc(E.au)+"'></div>"+
    "<div><label>បានឃើញ និងពិនិត្យ</label><input data-ef=ck value='"+esc(E.ck)+"' placeholder='ឈ្មោះនាយក/នាយករង'></div>"+
    "<div><label style='display:flex;gap:6px;align-items:center'><input type=checkbox data-ef=ab"+(E.ab?" checked":"")+" style='width:auto;margin:0'> វិញ្ញាសា ក/ខ (លេខខុសគ្នា)</label><small class=note>សិស្សអង្គុយជិតគ្នាទទួលវិញ្ញាសាខុសគ្នា</small></div>"+
    "</div></div>"+
    "<div class=card><h3 style='margin-top:0'>ផ្នែកនៃវិញ្ញាសា <small class=note>សរុប "+kn(EXP.total(E))+" ពិន្ទុ</small></h3>"+
    (g===12&&window.EXGEN&&EXGEN.bac?"<div style='display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px'><button type=button class=primary data-ex='bac|a' style='flex:1'>📋 វិញ្ញាសាត្រៀមបាក់ឌុប (៧ ផ្នែក · តាមសៀវភៅ)</button><button type=button data-ex='bac|b' style='flex:1'>📋 គំរូសាកល្បង NGS (៨ ផ្នែក)</button></div>":"")+
    (E.fmt==="cam"&&window.CAMPAPERS&&CAMPAPERS[g]?"<div style='display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px'>"+Object.keys(CAMPAPERS[g]).map(function(k){return"<button type=button class=primary data-ex='cpp|"+k+"' style='flex:1'>📋 "+esc(CAMPAPERS[g][k].label)+"</button>"}).join("")+"</div>":"")+
    (g===9&&window.EXGEN&&EXGEN.dip?"<div style='display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px'><button type=button class=primary data-ex=dip style='flex:1'>🎓 វិញ្ញាសាត្រៀមប្រឡងឌីប្លូម (៧ ផ្នែក · ១០០ ពិន្ទុ · ១២០ នាទី)</button></div>":"")+
    E.secs.map(function(s,i){
      return"<div class=ex-sec><div class=ex-sh><b>"+EXP.RN[i]+".</b><select data-es='"+i+"|ls'>"+lsOpts(g,s.ls)+"</select>"+
        "<select data-es='"+i+"|lv'>"+tplOpts(g,s)+"<optgroup label='🧮 លំហាត់ហ្វឹកហាត់'>"+[1,2,3,4].filter(function(v){return v<4||hasLv4(g,s.ls)}).map(function(v){return"<option value="+v+(String(v)===String(s.lv)?" selected":"")+">"+LVN[v]+"</option>"}).join("")+"</optgroup></select>"+
        (isT(s)?"":"<label>លំហាត់រង <input type=number min=1 max=8 data-es='"+i+"|n' value="+s.n+"></label>")+"<label>ពិន្ទុ <input type=number min=0 max=100 step=0.5 data-es='"+i+"|pts' value="+(+s.pts||0)+"></label>"+
        "<button type=button data-ex='rg|"+i+"' title='បង្កើតលំហាត់ផ្នែកនេះឡើងវិញ'>🔄</button><button type=button data-ex='up|"+i+"'"+(i?"":" disabled")+">↑</button><button type=button data-ex='dn|"+i+"'"+(i<E.secs.length-1?"":" disabled")+">↓</button><button type=button class=danger data-ex='rm|"+i+"'>🗑️</button></div>"+
        "<input class=ex-inst data-es='"+i+"|inst' value='"+esc(s.inst)+"' placeholder='សេចក្ដីណែនាំ (ឧ. គណនា · ដោះស្រាយសមីការ)'>"+
        "<div class=ex-its>"+s.it.map(function(x,j){return"<div class=ex-it><b>"+EXP.SUB[j]+".</b><textarea rows=1 data-ei='"+i+"|"+j+"' spellcheck=false>"+esc(x.q)+"</textarea><button type=button data-ex='ri|"+i+"|"+j+"' title='បង្កើតលំហាត់នេះឡើងវិញ'>🔄</button></div>"}).join("")+"</div></div>"}).join("")+
    "<button type=button data-ex=add style='width:100%'>＋ ផ្នែកថ្មី</button>"+
    "<p class=note>💡 ✏️ កែអត្ថបទលំហាត់ផ្ទាល់បាន (LaTeX ក្នុង $…$) · ពេលកែដោយដៃ ចម្លើយក្នុង «🔑 ចម្លើយ» មិនប្ដូរតាមទេ</p></div></div>"+
    "<div class=card><h3 style='margin-top:0'>👁️ មើលជាមុន</h3><div id=exPrev class=ex-prev></div></div>";
  body().innerHTML=h;prev();
  [].forEach.call(body().querySelectorAll(".ex-it textarea"),function(t){t.style.height=Math.max(36,t.scrollHeight)+"px"});
}
var pvT=0;
function prev(){clearTimeout(pvT);pvT=setTimeout(function(){var p=$("exPrev");if(!p)return;p.innerHTML="<style>"+EXP.css+"</style>"+EXP.html(P(X.E),{lbl:X.E.ab?"ក":""});math(p).then(function(){EXP.fit&&EXP.fit(p);EXP.shrink&&EXP.shrink(p)})},250)}
/* ---------- បោះពុម្ព ---------- */
/* ឈ្មោះឯកសារពេលព្រីន (= document.title) · លេខរៀងស្វ័យប្រវត្តិតាមប្រភេទប្រឡង
   វិញ្ញាសាដដែល (ខ្លឹមសារដដែល) → លេខដដែល · អត្រាកំណែប្រើលេខដូចវិញ្ញាសា */
function prName(E,kind){
  var cam=E.fmt==="cam",gt=cam&&window.PRACT&&PRACT.GR[gOf(E)]?PRACT.GR[gOf(E)].tab.replace(/^\S+\s/,""):"";
  var base=cam?gt+" "+(E.title||"Topic Test"):E.fmt==="bac"?"ប្រឡងមធ្យមសិក្សាទុតិយភូមិ":E.fmt==="dip"?"ប្រឡងមធ្យមសិក្សាបឋមភូមិ":EXP.head(E).replace(/^វិញ្ញាសា/,"");
  var s=E.id+JSON.stringify(E.secs||[]),h=5381;for(var i=0;i<s.length;i++)h=(h*33+s.charCodeAt(i))|0;var fp=String(h>>>0),m={},n;
  try{m=JSON.parse(localStorage.getItem("exPrn")||"{}")||{}}catch(e){}
  var c=m[base]||(m[base]={n:0,f:{}});n=c.f[fp];if(!n){n=++c.n;c.f[fp]=n;try{localStorage.setItem("exPrn",JSON.stringify(m))}catch(e){}}
  if(cam)return(kind==="k"?"Mark scheme - ":"Question paper - ")+base+" - "+n+(E.ab&&kind!=="k"?(kind==="b"?" B":" A"):"");
  return(kind==="k"?"អត្រាកំណែ":"វិញ្ញាសា")+base+"-"+n+(E.ab&&kind!=="k"?(kind==="b"?"ខ":"ក"):"");
}
function printIt(kind){
  var E=X.E,tmp=document.createElement("div");tmp.style.cssText="position:fixed;left:-9999px;top:0;width:800px";
  tmp.innerHTML=EXP.html(P(E),{v:kind==="b"?"b":"a",key:kind==="k",lbl:kind==="k"?"":E.ab?(kind==="b"?"ខ":"ក"):""});document.body.appendChild(tmp);
  var w=window.open("","_blank");if(!w){tmp.remove();alert("សូមអនុញ្ញាត Pop-up ដើម្បីបោះពុម្ព");return}
  w.document.write("<!doctype html><html lang=km><head><meta charset=utf-8><title>"+esc(prName(E,kind))+"</title><link rel=stylesheet href='https://fonts.googleapis.com/css2?family=Battambang:wght@400;700&family=Siemreap&family=Content:wght@400;700&family=Kantumruy+Pro:wght@400;700&family=Moul&display=swap'><link rel=stylesheet href='"+KX+"katex.min.css'><style>@page{size:A4;margin:14mm 14mm 12mm}body{margin:0}"+EXP.css+"</style></head><body><p style='text-align:center;font-family:sans-serif;color:#666'>កំពុងរៀបចំ…</p></body></html>");
  w.document.close();
  math(tmp).then(function(){
    w.document.body.innerHTML=tmp.innerHTML;tmp.remove();
    var go=function(){try{EXP.fit&&EXP.fit(w.document);EXP.shrink&&EXP.shrink(w.document);if(kind==="k"&&EXP.paginate)EXP.paginate(w.document);EXP.shrink&&EXP.shrink(w.document)}catch(e){}try{w.focus();w.print()}catch(e){}};
    if(w.document.fonts&&w.document.fonts.ready)w.document.fonts.ready.then(function(){setTimeout(go,300)});else setTimeout(go,900);
  });
}
/* ---------- 📱 ប្រឡងអនឡាញ ---------- */
function examLink(id){return location.origin+location.pathname.replace(/[^\/]*$/,"")+"exam.html?e="+encodeURIComponent(id)}
function code6(){var a=new Uint32Array(1);(window.crypto||window.msCrypto).getRandomValues(a);return String(100000+a[0]%900000)}
function pub(E){return JSON.stringify({font:E.font||"os",fmt:E.fmt||"",trk:E.trk||"",school:inf().school,title:E.title,mo:E.mo,sub:E.sub,cls:E.cls,dur:E.dur,date:E.date,place:E.place,au:E.au,ck:E.ck,
  secs:E.secs.map(function(s){return{pts:s.pts,inst:s.inst,it:s.it.map(function(x){return{q:x.q,fig:x.fig}})}})})}
function goOnline(){
  var E=X.E,F=window.FB,c=myCls().filter(function(x){return x.n===E.cls})[0];
  if(!c||!c.st.length){alert("ថ្នាក់ «"+E.cls+"» មិនទាន់មានបញ្ជីឈ្មោះសិស្សទេ");return}
  if(!confirm("បើកប្រឡងអនឡាញ «"+EXP.head(E)+"» ឥឡូវនេះ?\n\n• រយៈពេល "+E.dur+" នាទី (ចាប់ពីពេលនេះ)\n• សិស្សមើលប្រធានលើទូរស័ព្ទ ហើយសរសេរចម្លើយលើក្រដាស\n• អស់ម៉ោង → ប្រធានលាក់ដោយស្វ័យប្រវត្តិ"))return;
  var code=code6(),endMs=Date.now()+(+E.dur||45)*60000,names=c.st.map(function(s,i){return{k:String(s.id||("n"+(i+1))).replace(/[^A-Za-z0-9_-]/g,"_"),n:s.n}});
  Promise.all([F.setDoc(F.doc(window.db,"exm",E.id),{o:E.o,t:EXP.head(E),cls:E.cls,sub:E.sub,dur:+E.dur||45,endMs:endMs,open:true,names:names,sch:inf().school}),
    F.setDoc(F.doc(window.db,"exq",E.id+"_"+code),{o:E.o,t:E.id,j:pub(E)})]).then(function(){
    E.on={open:true,code:code,endMs:endMs};save(true);editor();watch();showLink();
  },function(e){console.error(e);alert(e&&e.code==="permission-denied"?"គ្មានសិទ្ធិ · សូម Admin Publish firestore.rules កំណែថ្មី (មាន exm · exq · exv)":"មិនអាចបើកបានទេ · សូមពិនិត្យអ៊ីនធឺណិត")});
}
function stopOnline(){
  var E=X.E,F=window.FB;if(!E.on)return;if(!confirm("បិទប្រឡងអនឡាញឥឡូវនេះ? សិស្សនឹងមើលប្រធានលែងឃើញ"))return;
  F.updateDoc(F.doc(window.db,"exm",E.id),{open:false}).then(function(){return F.deleteDoc(F.doc(window.db,"exq",E.id+"_"+E.on.code)).catch(function(){})})
    .then(function(){E.on.open=false;save(true);unwatch();editor();notify("បានបិទប្រឡងអនឡាញ")},function(){alert("មិនអាចបិទបានទេ")});
}
function extend(min){
  var E=X.E,F=window.FB,end=Math.max(E.on.endMs,Date.now())+min*60000;
  F.updateDoc(F.doc(window.db,"exm",E.id),{endMs:end}).then(function(){E.on.endMs=end;save(true);editor();notify("បានបន្ថែម "+min+" នាទី")},function(){alert("មិនអាចបន្ថែមម៉ោងបានទេ")});
}
function watch(){
  unwatch();var E=X.E,F=window.FB;if(!E||!E.on||!E.on.open)return;
  X.vUn=F.onSnapshot(F.query(F.collection(window.db,"exv"),F.where("t","==",E.id)),function(sn){var a=[];sn.forEach(function(d){a.push(d.data())});X.views=a;var b=$("exV");if(b)b.innerHTML=viewList()},function(e){console.warn("exv:",e)});
  clearInterval(X.tick);X.tick=setInterval(function(){var t=$("exLeft");if(!t||!X.E||!X.E.on){clearInterval(X.tick);return}t.textContent=left(X.E.on.endMs)},1000);
}
function unwatch(){if(X.vUn){X.vUn();X.vUn=null}X.views=[];clearInterval(X.tick)}
function left(end){var s=Math.max(0,Math.round((end-Date.now())/1000));return s?kn(Math.floor(s/60))+":"+kn(("0"+s%60).slice(-2)):"អស់ម៉ោង"}
function hm(at){var d=at&&at.toDate?at.toDate():null;return d?kn(("0"+d.getHours()).slice(-2)+":"+("0"+d.getMinutes()).slice(-2)):"…"}
function viewList(){
  var c=myCls().filter(function(x){return x.n===X.E.cls})[0],tot=c?c.st.length:0;
  return"<div class=note style='margin:4px 0'>កំពុងមើល <b>"+kn(X.views.length)+"/"+kn(tot)+"</b> នាក់ · 🚩 = ចាកចេញពីផ្ទាំង (ឧ. ទៅរក AI) ឬព្យាយាមចម្លង</div>"+
    (X.views.length?"<div class=ex-vl>"+X.views.slice().sort(function(a,b){return(b.lv||0)+(b.cp||0)-(a.lv||0)-(a.cp||0)}).map(function(v){var bad=(v.lv||0)+(v.cp||0);
      return"<span class='ex-v"+(bad?" bad":"")+"'>"+esc(v.sn)+" <small>"+hm(v.at)+(v.lv?" · 🚩 ចាកចេញ "+kn(v.lv)+" ដង ("+kn(v.lt||0)+" វិ)":"")+(v.cp?" · 📋 "+kn(v.cp):"")+"</small><button type=button data-ex='vr|"+esc(v.sid)+"' title='អនុញ្ញាតឱ្យបើកលើឧបករណ៍ផ្សេង'>🔄</button></span>"}).join("")+"</div>":"");
}
function onlineBox(){
  var E=X.E;
  return"<div class=ex-on><div><b>📱 កំពុងប្រឡងអនឡាញ</b> · នៅសល់ <b id=exLeft class=ex-left>"+left(E.on.endMs)+"</b> · 🔑 លេខកូដចូល <b class=ex-code>"+esc(E.on.code)+"</b></div>"+
    "<div class=bar style='margin:6px 0'><button type=button data-ex=link>🔗 តំណ/QR</button><button type=button data-ex='ext|5'>＋៥ នាទី</button><button type=button data-ex='ext|10'>＋១០ នាទី</button><button type=button class=danger data-ex=stop>⏹ បិទប្រឡង</button></div>"+
    "<div id=exV>"+viewList()+"</div></div>";
}
function showLink(){
  var E=X.E,u=examLink(E.id),d=$("exLink");if(!d){d=document.createElement("dialog");d.id="exLink";document.body.appendChild(d)}
  d.innerHTML="<div class=dlgb style='text-align:center;min-width:320px'><h2 style='margin:0 0 8px'>📱 តំណប្រឡងសម្រាប់សិស្ស</h2><div id=exQR class=qz-qr></div>"+
    "<input value='"+esc(u)+"' readonly style='text-align:center;margin:10px 0' onclick='this.select()'>"+
    "<div class=qz-pc>🔑 លេខកូដចូល <b>"+esc(E.on.code)+"</b><small>សរសេរលើក្ដារខៀន · សិស្សបើកតំណ → ជ្រើសឈ្មោះ → វាយលេខកូដ</small></div>"+
    "<div class=bar style='justify-content:center'><button type=button class=primary id=exCp>📋 ចម្លងតំណ</button><button type=button id=exX>បិទ</button></div></div>";
  $("exX").onclick=function(){d.close()};$("exCp").onclick=function(){try{navigator.clipboard.writeText(u)}catch(x){}notify("បានចម្លងតំណ")};
  d.showModal();
  (window.QRCode?Promise.resolve():ld("https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js")).then(function(){new QRCode($("exQR"),{text:u,width:200,height:200})}).catch(function(){});
}
/* ---------- ព្រឹត្តិការណ៍ ---------- */
function act(a,q){
  var E=X.E,g=E?gOf(E):0,F=window.FB;
  if(a==="reload"){genP=null;X.list=null;X.lp=null;X.err="";render();return}
  if(a==="new"){if(!engReady()){body().innerHTML="<p class=note>⏳ កំពុងផ្ទុកម៉ាស៊ីនបង្កើតលំហាត់…</p>";tmo(gen(),45000).then(function(){act("new",q)},function(){render()});return}X.E=newExam();X.status="";save(true);render();return}
  if(a==="open"||a==="dup"){var x=(X.list||[]).filter(function(y){return y.id===q[1]})[0];if(!x)return;body().innerHTML="<p class=note>⏳ កំពុងបើកវិញ្ញាសា…</p>";
    tmo(F.getDoc(F.doc(window.db,"exams",x.id+"__c")),25000).then(function(d){var v=d.exists()?d.data():null;if(!v||!v.j)throw{code:"nf"};var e2=JSON.parse(v.j);e2.id=x.id;
    if(a==="dup"){e2.id=uid();e2.o=who.id;e2.on=null;e2.cr=new Date().toISOString();e2.title=e2.title;X.E=e2;save(true)}else{X.E=e2;X.status=""}
    render();if(X.E.on&&X.E.on.open)watch()}).catch(function(e){console.error("exam open:",e);alert(e&&e.code==="timeout"?"បើកវិញ្ញាសាយូរពេក (អ៊ីនធឺណិតយឺត) · សូមព្យាយាមម្ដងទៀត":"មិនអាចបើកវិញ្ញាសានេះបានទេ");render()});return}
  if(a==="del"){var y=(X.list||[]).filter(function(z){return z.id===q[1]})[0];if(!y||!confirm("លុបវិញ្ញាសា «"+(y.t||"")+"»?"))return;
    var e3={on:y.on};
    Promise.all([F.deleteDoc(F.doc(window.db,"exams",y.id)),F.deleteDoc(F.doc(window.db,"exams",y.id+"__c")).catch(function(){}),F.deleteDoc(F.doc(window.db,"exm",y.id)).catch(function(){}),e3.on&&e3.on.code?F.deleteDoc(F.doc(window.db,"exq",y.id+"_"+e3.on.code)).catch(function(){}):0])
      .then(function(){X.list=X.list.filter(function(z){return z.id!==y.id});render();notify("បានលុបវិញ្ញាសា")},function(){alert("មិនអាចលុបបានទេ")});return}
  if(!E)return;
  if(a==="back"){if(X.dirty)save(true);unwatch();X.E=null;X.list=null;render();return}
  if(a==="pr"){printIt(q[1]);return}
  if(a==="online"){if(E.on&&E.on.open)showLink();else goOnline();return}
  if(a==="stop"){stopOnline();return}
  if(a==="ext"){extend(+q[1]);return}
  if(a==="link"){showLink();return}
  if(a==="vr"){var sid=q[1];if(!confirm("អនុញ្ញាតឱ្យសិស្សនេះបើកវិញ្ញាសាលើឧបករណ៍ផ្សេង?"))return;F.deleteDoc(F.doc(window.db,"exv",E.id+"_"+sid)).then(function(){notify("បានអនុញ្ញាត")},function(){alert("មិនអាចលុបបានទេ")});return}
  var i=+q[1],s=E.secs[i];
  if(a==="add"){var last=E.secs[E.secs.length-1],L=lsList(g),ls=last?last.ls:(L[0]&&L[0][1][0][0]);if(!ls){alert("ថ្នាក់នេះមិនមានម៉ាស៊ីនបង្កើតលំហាត់");return}E.secs.push(newSec(g,ls))}
  else if(a==="bac"){if(E.secs.length&&!confirm("ជំនួសផ្នែកទាំងអស់ដោយវិញ្ញាសាគំរូបាក់ឌុប (១២៥ ពិន្ទុ)?\n\n"+(q[1]==="b"?"I ប្រូបាប · II លីមីត · III ចំនួនកុំផ្លិច · IV អាំងតេក្រាល · V សមីការឌីផេរ៉ង់ស្យែល · VI អេលីប · VII វ៉ិចទ័រក្នុងលំហ · VIII សិក្សាអនុគមន៍":"I លីមីត + អាំងតេក្រាល · II ចំនួនកុំផ្លិច · III ប្រូបាប · IV សមីការឌីផេរ៉ង់ស្យែល · V កោនិក · VI ធរណីមាត្រលំហ · VII សិក្សាអនុគមន៍")))return;
    var bk=q[1]==="b";E.secs=EXGEN.bac(bk?"b":"a").map(function(x){var s2={ls:x.ls,lv:x.lv,n:1,pts:x.pts,inst:""};fill(s2,g);if(E.ab)fill(s2,g,"itB");return s2});
    E.fmt="bac";E.dur=150;E.trk=E.trk||"ថ្នាក់វិទ្យាសាស្ត្រពិត";E.mo="";if(TITLES.indexOf(E.title)>=0||/^វិញ្ញាសាត្រៀម|^ប្រឡងសាកល្បង$/.test(E.title))E.title=bk?"ប្រឡងសាកល្បង":"វិញ្ញាសាត្រៀមប្រឡងសញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ"}
  else if(a==="dip"){if(E.secs.length&&!confirm("ជំនួសផ្នែកទាំងអស់ដោយវិញ្ញាសាគំរូឌីប្លូម (១០០ ពិន្ទុ)?\n\nI ពហុជម្រើស · II រ៉ាឌីកាល់ · III កន្សោម/សមីការ · IV ចំណោទ · V ប្រូបាប · VI តម្រុយ · VII ធរណីមាត្ររង្វង់"))return;
    E.secs=EXGEN.dip().map(function(x){var s2={ls:x.ls,lv:x.lv,n:1,pts:x.pts,inst:""};fill(s2,g);if(E.ab)fill(s2,g,"itB");return s2});
    E.fmt="dip";E.dur=120;E.mo="";if(!E.title||TITLES.indexOf(E.title)>=0||/^វិញ្ញាសាត្រៀម|^ប្រឡងសាកល្បង$/.test(E.title))E.title="ប្រឡងសញ្ញាបត្រមធ្យមសិក្សាបឋមភូមិ"}
  else if(a==="cpp"){var PD=window.CAMPAPERS&&CAMPAPERS[g]&&CAMPAPERS[g][q[1]],pp=PD&&PD.secs;if(!pp||E.secs.length&&!confirm("ជំនួសសំណួរទាំងអស់ដោយក្រដាសប្រឡង «"+PD.label+"» ពេញ?"))return;var used={};
    E.secs=pp.map(function(x){var s2={ls:x[0],lv:x[1],n:1,pts:4,inst:""};for(var t=0;t<8;t++){fill(s2,g);if(!used[s2.it[0].kd])break}used[s2.it[0].kd]=1;s2.pts=s2.it[0].mk||4;if(E.ab)fill(s2,g,"itB");return s2});
    E.calc=PD.calc;E.title=PD.title;E.dur=Math.round(EXP.total(E)*1.2/5)*5}
  else if(a==="rg"){fill(s,g);if(E.ab)fill(s,g,"itB")}
  else if(a==="ri"&&isT(s)){fill(s,g);if(E.ab)fill(s,g,"itB")}
  else if(a==="ri"){var j=+q[2],av=s.it.map(function(x){return x.q});s.it[j]=mkItem(g,s.ls,s.lv,av);if(E.ab&&s.itB)s.itB[j]=mkItem(g,s.ls,s.lv,av)}
  else if(a==="up"&&i>0){E.secs.splice(i-1,0,E.secs.splice(i,1)[0])}
  else if(a==="dn"&&i<E.secs.length-1){E.secs.splice(i+1,0,E.secs.splice(i,1)[0])}
  else if(a==="rm"){if(!confirm("លុបផ្នែក "+EXP.RN[i]+"?"))return;E.secs.splice(i,1)}
  else return;
  save();editor();
}
function onInput(e){
  var t=e.target,E=X.E;if(!E)return;
  if((t.tagName==="SELECT"||t.type==="checkbox")&&e.type!=="change")return;
  if(t.dataset.ef){var f=t.dataset.ef;
    if(f==="fmt"){var wasC=E.fmt==="cam";E.fmt=t.value;if(E.fmt==="bac"&&!E.trk)E.trk="ថ្នាក់វិទ្យាសាស្ត្រពិត";
      if(E.fmt==="cam"&&!wasC){E.camg=E.camg||camDef(E);if(TITLES.indexOf(E.title)>=0||/[\u1780-\u17FF]/.test(E.title||""))E.title="Topic Test";if(/[\u1780-\u17FF]/.test(E.sub||""))E.sub="Mathematics";if(E.calc==null)E.calc=true;resetSecs(E)}
      else if(wasC&&E.fmt!=="cam"){if(!/[\u1780-\u17FF]/.test(E.title||""))E.title=TITLES[0];if(!/[\u1780-\u17FF]/.test(E.sub||""))E.sub="គណិតវិទ្យា";resetSecs(E)}
      save();editor();return}
    if(f==="camg"){E.camg=+t.value;if(!E.secs.length||confirm("ប្ដូរកម្រិត Cambridge → បង្កើតផ្នែកទាំងអស់ឡើងវិញ?"))resetSecs(E);save();editor();return}
    if(f==="calc"){E.calc=t.checked;save();prev();return}
    if(f==="ab"){E.ab=t.checked;if(E.ab)E.secs.forEach(function(s){fill(s,gOf(E),"itB")});save();editor();return}
    if(f==="cls"){var og=gOf(E);E.cls=t.value;if(gOf(E)!==og&&E.secs.length&&confirm("ថ្នាក់ថ្មីជាកម្រិតផ្សេង។ បង្កើតផ្នែកទាំងអស់ឡើងវិញតាមកម្រិតថ្នាក់ថ្មី?")){var L=lsList(gOf(E)),f0=L[0]&&L[0][1][0];E.secs=f0?[newSec(gOf(E),f0[0])]:[]}save();editor();return}
    E[f]=f==="dur"?Math.max(5,+t.value||45):t.value;save();prev();if(f==="title"||f==="mo"){var b=body().querySelector(".bar b");if(b)b.textContent=EXP.head(E)}return}
  if(t.dataset.es){var q=t.dataset.es.split("|"),s=E.secs[+q[0]],k=q[1],g=gOf(E);
    if(k==="inst"){s.inst=t.value;save();prev();return}
    if(k==="pts"){s.pts=Math.max(0,+t.value||0);save();prev();var h3=body().querySelectorAll(".card h3 small")[0];if(h3)h3.textContent="សរុប "+kn(EXP.total(E))+" ពិន្ទុ";return}
    if(e.type!=="change")return;
    if(k==="ls"){s.ls=+t.value;var T2=window.EXGEN&&EXGEN.list(g+"|"+s.ls);if(isT(s))s.lv=T2&&T2.length?"t:"+T2[0].id:2;else if(T2&&T2.length)s.lv="t:"+T2[0].id;if(s.lv===4&&!hasLv4(g,s.ls))s.lv=3}else if(k==="lv")s.lv=/^t:/.test(t.value)?t.value:+t.value;else if(k==="n")s.n=Math.min(8,Math.max(1,+t.value||1));
    fill(s,g);if(E.ab)fill(s,g,"itB");save();editor();return}
  if(t.dataset.ei){var p=t.dataset.ei.split("|"),it=E.secs[+p[0]].it[+p[1]];it.q=t.value;t.style.height="auto";t.style.height=Math.max(36,t.scrollHeight)+"px";save();prev()}
}
var qb=$("qzBody");
qb.addEventListener("click",function(e){if(QVx()!=="exam")return;var b=e.target.closest("[data-ex]");if(!b||b.disabled)return;var q=b.dataset.ex.split("|");act(q[0],q)});
qb.addEventListener("input",function(e){if(QVx()==="exam")onInput(e)});
qb.addEventListener("change",function(e){if(QVx()==="exam")onInput(e)});
function QVx(){return window.QUIZVIEW?QUIZVIEW():""}
window.EXAM={gen:gen,ready:engReady,render:render,leave:function(){if(X.E&&X.dirty)save(true);unwatch()}};
})();
