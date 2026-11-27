/* ➕ ថ្នាក់បន្ថែម / សិស្សក្រៅប្រព័ន្ធ (Custom / External Classes)
   Firestore៖ xcls/{id} = {o, n, g(7–12), kd(ប្រភេទ), isExternal:true, st:[{id,n,s}], u}
   • ដាច់ដោយឡែកពី rs.c (ថ្នាក់ផ្លូវការ) → មិនប៉ះពាល់ p5/p7/p18 ពិន្ទុប្រចាំខែ ឬបញ្ជីសិស្សសាលា
   • quiz.js / exam.js ហៅ XC.of(tid) ដើម្បីបន្ថែមថ្នាក់ទាំងនេះក្នុងបញ្ជីជ្រើសថ្នាក់ (ស្លាក [ក្រៅប្រព័ន្ធ])
   • ម្ចាស់ (o) ឬ Admin តែប៉ុណ្ណោះអាន/កែ (មើល firestore.rules) */
(function(){
"use strict";
var XC=window.XC={all:[],loaded:false,loading:null,sel:null};
function $(i){return document.getElementById(i)}
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function kn(n){return String(n).replace(/\d/g,function(d){return"០១២៣៤៥៦៧៨៩"[d]})}
function me(){return typeof who!=="undefined"?who:null}
function adm(){var w=me();return !!(w&&w.role==="admin")}

/* ថ្នាក់ក្នុងទម្រង់ដូច rs.c (n, st) + isExternal */
XC.shape=function(x){return{n:x.n,g:+x.g||0,kd:x.kd||"",isExternal:true,xid:x.id,st:(x.st||[]).map(function(s){return{id:s.id,n:s.n,g:s.s||""}})}};
XC.of=function(tid){return XC.all.filter(function(x){return x.o===tid}).map(XC.shape)};
XC.gc=function(c){return c&&c.isExternal?(+c.g||0):parseInt(c&&c.n)};            /* កម្រិតថ្នាក់ពី class object */
XC.byName=function(n){for(var i=0;i<XC.all.length;i++)if(XC.all[i].n===n)return XC.all[i];return null};
XC.gn=function(n){var x=XC.byName(n);return x?(+x.g||0):(parseInt(n)||0)};        /* កម្រិតថ្នាក់ពីឈ្មោះ */
XC.tag=function(c){return c&&c.isExternal?" [ក្រៅប្រព័ន្ធ]":""};

XC.load=function(force){
  if(XC.loading&&!force)return XC.loading;
  var w=me();if(!w||!window.FB||!window.db||w.role==="monitor"){XC.loaded=true;return Promise.resolve(XC.all)}
  var F=window.FB,c=F.collection(window.db,"xcls");
  XC.loading=F.getDocs(adm()?c:F.query(c,F.where("o","==",w.id))).then(function(sn){
    var a=[];sn.forEach(function(d){a.push(Object.assign({id:d.id},d.data()))});
    a.sort(function(x,y){return String(x.n).localeCompare(String(y.n))});XC.all=a;XC.loaded=true;XC.loading=null;return a
  },function(e){console.warn("xcls:",e&&e.code);XC.loaded=true;XC.loading=null;XC.err=e&&e.code==="permission-denied"?"គ្មានសិទ្ធិ (សូម Admin Publish firestore.rules កំណែថ្មី · មាន xcls)":"មិនអាចផ្ទុកបានទេ";return XC.all});
  return XC.loading;
};
function refresh(){try{if(window.renderQuiz)window.renderQuiz()}catch(e){}}

/* ---------- ឈ្មោះ ---------- */
function officialNames(){var a=[];try{(window.CL||(typeof CL!=="undefined"?CL:[])).forEach(function(c){a.push(String(c).replace(/^M-/,"").toUpperCase())})}catch(e){}
  Object.keys((typeof rs!=="undefined"&&rs.c)||{}).forEach(function(t){rs.c[t].forEach(function(c){a.push(String(c.n).toUpperCase())})});return a}
function nameOk(n,selfId){
  n=n.trim();if(!n)return"សូមបញ្ចូលឈ្មោះថ្នាក់";if(n.length>30)return"ឈ្មោះថ្នាក់វែងពេក (≤ ៣០ តួ)";
  if(officialNames().indexOf(n.toUpperCase())>=0)return"ឈ្មោះនេះដូចថ្នាក់ផ្លូវការរបស់សាលា · សូមដាក់ឈ្មោះផ្សេង";
  if(XC.all.some(function(x){return x.id!==selfId&&String(x.n).toUpperCase()===n.toUpperCase()}))return"មានថ្នាក់បន្ថែមឈ្មោះនេះរួចហើយ";return""}
/* បន្ទាត់ → សិស្ស · «ឈ្មោះ» ឬ «ឈ្មោះ, ស/ប» · ដកលេខរៀងនាំមុខ (១. / 1) / 1-) */
function parseNames(t){var out=[],seen={};
  String(t||"").split(/\r?\n/).forEach(function(l){
    l=l.replace(/^\s*[\d០-៩]+\s*[.)\-:]\s*/,"").trim();if(!l)return;
    var s="",m=l.match(/^(.*?)[\s,;\t]+(ស្រី|ប្រុស|ស|ប|F|M)\s*$/i);
    if(m&&m[1].trim()){l=m[1].trim();var g=m[2];s=/^(ស្រី|ស|F)$/i.test(g)?"ស":"ប"}
    l=l.replace(/\s+/g," ").slice(0,60);if(!l||seen[l])return;seen[l]=1;out.push({n:l,s:s})});
  return out}
function nextId(st){var m=0;st.forEach(function(s){var k=/^x(\d+)$/.exec(s.id||"");if(k)m=Math.max(m,+k[1])});return m+1}
function addStudents(st,list){var n=nextId(st),have={};st.forEach(function(s){have[s.n]=1});var add=0;
  list.forEach(function(p){if(have[p.n])return;have[p.n]=1;var o={id:"x"+(n++),n:p.n};if(p.s)o.s=p.s;st.push(o);add++});return add}

/* ---------- រក្សាទុក ---------- */
function stamp(){return new Date().toISOString()}
function create(n,g,kd){
  var w=me(),id=Date.now().toString(36)+Math.random().toString(36).slice(2,6),
      doc={o:w.id,n:n,g:g,kd:kd||"",isExternal:true,st:[],u:stamp()};
  return window.FB.setDoc(window.FB.doc(window.db,"xcls",id),doc).then(function(){XC.all.push(Object.assign({id:id},doc));XC.sel=id;return id})}
/* កែ st ដោយ transaction (កុំឱ្យឧបករណ៍ពីរសរសេរជាន់គ្នា) */
function mutate(id,fn){
  var F=window.FB,ref=F.doc(window.db,"xcls",id);
  return F.runTransaction(window.db,function(tx){return tx.get(ref).then(function(s){
    if(!s.exists())throw new Error("gone");var d=s.data(),p=fn(d)||{};p.u=stamp();tx.update(ref,p);return p})})
  .then(function(p){var x=XC.all.filter(function(y){return y.id===id})[0];if(x)Object.assign(x,p);return p})}

/* ---------- UI ---------- */
function dlgEl(){var d=$("xcDlg");if(!d){d=document.createElement("dialog");d.id="xcDlg";d.style.cssText="max-width:min(680px,96vw);width:100%;border:1px solid var(--bd,#cbd5e1);border-radius:14px;padding:0;background:var(--card,#fff);color:inherit";document.body.appendChild(d);
  d.addEventListener("click",xcClick);d.addEventListener("change",xcChange)}return d}
function xcDraw(){
  var d=dlgEl(),sel=XC.all.filter(function(x){return x.id===XC.sel})[0];if(!sel)XC.sel=null;
  var h="<div style='padding:14px 16px;max-height:88vh;overflow:auto'><div class=bar style='display:flex;gap:8px;align-items:center;flex-wrap:wrap'><b style='flex:1'>➕ ថ្នាក់បន្ថែម / សិស្សក្រៅប្រព័ន្ធ</b><button type=button data-xa=close>✕ បិទ</button></div>"+
   "<p class=note style='margin:6px 0 10px'>សម្រាប់ថ្នាក់បំប៉ន · រៀនគួរ · វគ្គបណ្តុះបណ្តាល។ <b>មិនលាយ</b>ជាមួយបញ្ជីសិស្ស ឬពិន្ទុប្រចាំខែរបស់សាលា។ ប្រើបានក្នុង MCQ · ប្រឡងបើក · ហ្វឹកហាត់។"+(adm()?" (Admin មើលបានទាំងអស់)":"")+"</p>"+(XC.err?"<p class=cxwarn>⚠️ "+esc(XC.err)+"</p>":"");
  h+="<div class=bar style='display:flex;gap:6px;flex-wrap:wrap;align-items:center'><label>ថ្នាក់៖</label><select id=xcSel>"+(XC.all.length?XC.all.map(function(x){return"<option value='"+esc(x.id)+"'"+(x.id===XC.sel?" selected":"")+">"+esc(x.n)+" ("+kn((x.st||[]).length)+")"+(adm()&&me()&&x.o!==me().id?" · "+esc(x.o):"")+"</option>"}).join(""):"<option value=''>— មិនទាន់មាន —</option>")+"</select></div>";
  h+="<details class=card style='margin:10px 0;padding:8px 12px'"+(XC.all.length?"":" open")+"><summary><b>＋ បង្កើតថ្នាក់បន្ថែមថ្មី</b></summary><div style='display:grid;gap:6px;margin-top:8px'>"+
   "<input id=xcN placeholder='ឈ្មោះថ្នាក់ (ឧ. បំប៉ន-12A · LSC105)' maxlength=30>"+
   "<div style='display:flex;gap:6px;flex-wrap:wrap'><select id=xcG>"+[7,8,9,10,11,12].map(function(g){return"<option value="+g+(g===9?" selected":"")+">កម្រិតថ្នាក់ទី "+kn(g)+"</option>"}).join("")+"</select>"+
   "<input id=xcK placeholder='ប្រភេទ (ឧ. បំប៉ន · រៀនគួរ · វគ្គ)' maxlength=30 style='flex:1;min-width:160px'></div>"+
   "<textarea id=xcT rows=5 placeholder='បញ្ជីសិស្ស · មួយបន្ទាត់ = សិស្សម្នាក់ (Copy-Paste បាន)&#10;ឧ.  សុខ ចាន់ណា ស&#10;     ចាន់ ដារា ប'></textarea>"+
   "<button type=button class=primary data-xa=create>✅ បង្កើតថ្នាក់</button></div></details>";
  if(sel){var st=sel.st||[];
    h+="<div class=card style='padding:10px 12px'><div class=bar style='display:flex;gap:6px;flex-wrap:wrap;align-items:center'><b>🏷️ "+esc(sel.n)+"</b><span class=note style='margin:0'>ថ្នាក់ទី "+kn(sel.g)+(sel.kd?" · "+esc(sel.kd):"")+" · "+kn(st.length)+" នាក់ · <span style='color:#b45309'>[ក្រៅប្រព័ន្ធ]</span></span><span style='flex:1'></span><button type=button data-xa=ren>✏️ កែឈ្មោះ/ប្រភេទ</button><button type=button data-xa=delc style='color:#b91c1c'>🗑️ លុបថ្នាក់</button></div>"+
     "<div style='margin-top:8px'><textarea id=xcAdd rows=3 style='width:100%' placeholder='បន្ថែមសិស្ស · មួយបន្ទាត់ = ម្នាក់ (ឈ្មោះ ឬ «ឈ្មោះ ស/ប»)'></textarea><button type=button data-xa=add>＋ បន្ថែមសិស្ស</button> "+
     "<span style='display:inline-flex;gap:4px;margin-left:6px'><input id=xcOne placeholder='ឈ្មោះពេញ (ម្នាក់)' style='width:170px'><select id=xcSx><option value=''>ភេទ?</option><option value=ប>ប្រុស</option><option value=ស>ស្រី</option></select><button type=button data-xa=add1>＋</button></span></div>"+
     "<div style='overflow:auto;max-height:36vh;margin-top:8px'><table style='width:100%;min-width:0'><tbody>"+(st.length?st.map(function(s,i){return"<tr><td style='width:34px'>"+kn(i+1)+"</td><td>"+esc(s.n)+"</td><td style='width:40px'>"+esc(s.s||"")+"</td><td style='width:40px'><button type=button data-xa=del data-i="+i+" title='លុបសិស្ស'>✕</button></td></tr>"}).join(""):"<tr><td class=note>មិនទាន់មានសិស្ស</td></tr>")+"</tbody></table></div></div>"}
  d.innerHTML=h+"</div>"}
XC.open=function(){
  var d=dlgEl();d.innerHTML="<div style='padding:20px'>⏳ កំពុងផ្ទុក…</div>";if(!d.open)d.showModal();
  XC.load(true).then(function(){if(!XC.sel&&XC.all.length)XC.sel=XC.all[0].id;xcDraw()})};
function xcChange(e){if(e.target.id==="xcSel"){XC.sel=e.target.value||null;xcDraw()}}
function busyWrap(p){return p.then(function(){xcDraw();refresh()},function(e){alert(e&&e.code==="permission-denied"?"គ្មានសិទ្ធិ · សូម Admin Publish firestore.rules កំណែថ្មី (មាន xcls)":"មិនអាចរក្សាទុកបានទេ · សូមព្យាយាមម្ដងទៀត")})}
function xcClick(e){
  var b=e.target.closest&&e.target.closest("[data-xa]");if(!b)return;var a=b.dataset.xa,sel=XC.all.filter(function(x){return x.id===XC.sel})[0];
  if(a==="close"){dlgEl().close();return}
  if(a==="create"){
    var n=$("xcN").value.trim(),er=nameOk(n,"");if(er){alert(er);return}
    var list=parseNames($("xcT").value);b.disabled=true;
    create(n,+$("xcG").value,$("xcK").value.trim()).then(function(id){
      if(!list.length)return;return mutate(id,function(d){var st=(d.st||[]).slice();addStudents(st,list);return{st:st}})
    }).then(function(){xcDraw();refresh();if(window.notify)notify("បានបង្កើតថ្នាក់ «"+n+"»")},function(er2){b.disabled=false;alert(er2&&er2.code==="permission-denied"?"គ្មានសិទ្ធិ · សូម Admin Publish firestore.rules កំណែថ្មី (មាន xcls)":"មិនអាចបង្កើតបានទេ")});return}
  if(!sel)return;
  if(a==="add"||a==="add1"){
    var list2=a==="add"?parseNames($("xcAdd").value):parseNames(($("xcOne").value||"")+($("xcSx").value?" "+$("xcSx").value:""));
    if(!list2.length){alert("សូមបញ្ចូលឈ្មោះសិស្ស");return}
    if((sel.st||[]).length+list2.length>300){alert("សិស្សច្រើនពេក (អតិបរមា ៣០០ នាក់ក្នុងមួយថ្នាក់)");return}
    var cnt=0;busyWrap(mutate(sel.id,function(d){var st=(d.st||[]).slice();cnt=addStudents(st,list2);return{st:st}}).then(function(){if(window.notify)notify("បានបន្ថែម "+cnt+" នាក់"+(cnt<list2.length?" (ឈ្មោះស្ទួនត្រូវរំលង)":""))}));return}
  if(a==="del"){var i=+b.dataset.i,nm=(sel.st[i]||{}).n;if(!confirm("លុបសិស្ស «"+nm+"» ?"))return;
    busyWrap(mutate(sel.id,function(d){var st=(d.st||[]).slice();st.splice(i,1);return{st:st}}));return}
  if(a==="ren"){var nn=prompt("ឈ្មោះថ្នាក់ថ្មី",sel.n);if(nn==null)return;nn=nn.trim();var er3=nn===sel.n?"":nameOk(nn,sel.id);if(er3){alert(er3);return}
    var kk=prompt("ប្រភេទ (ទុកទទេបាន)",sel.kd||"");if(kk==null)return;
    var old=sel.n;
    busyWrap(mutate(sel.id,function(){return{n:nn,kd:kk.trim().slice(0,30)}}).then(function(){if(old!==nn)alert("កំណត់សម្គាល់៖ វិញ្ញាសា/តេស្ត/តំណហ្វឹកហាត់ដែលបានបង្កើតរួច នៅរក្សាឈ្មោះថ្នាក់ចាស់ «"+old+"»")}));return}
  if(a==="delc"){if(!confirm("លុបថ្នាក់បន្ថែម «"+sel.n+"» និងបញ្ជីសិស្ស ("+(sel.st||[]).length+" នាក់)?\n(តេស្ត/វិញ្ញាសាដែលបានបង្កើតរួច មិនត្រូវលុបទេ)"))return;
    var id=sel.id;busyWrap(window.FB.deleteDoc(window.FB.doc(window.db,"xcls",id)).then(function(){XC.all=XC.all.filter(function(x){return x.id!==id});XC.sel=XC.all[0]?XC.all[0].id:null}));return}
}

/* ប៊ូតុងក្នុងផ្ទាំងតេស្ត/ប្រឡង (បន្ថែមម្ដងគត់) */
function mountBtn(){
  var seg=$("qzSeg");if(!seg||$("xcBtn"))return;
  var b=document.createElement("button");b.type="button";b.id="xcBtn";b.className="qz-prac";b.style.cssText="margin:6px 0";b.textContent="➕ ថ្នាក់បន្ថែម / សិស្សក្រៅប្រព័ន្ធ";
  b.addEventListener("click",function(){XC.open()});seg.parentNode.insertBefore(b,seg.nextSibling)}
function boot(){mountBtn();if(me()&&!XC.loaded&&!XC.loading)XC.load().then(refresh)}
document.addEventListener("DOMContentLoaded",boot);
setInterval(function(){mountBtn();var w=me();if(w&&window.FB&&window.db&&!XC.loading&&(!XC.loaded||XC.uid!==w.id)){XC.uid=w.id;XC.all=[];XC.loaded=false;XC.load().then(refresh)}},1500);
})();
