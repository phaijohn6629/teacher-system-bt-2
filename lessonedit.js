/* ========================================================================
   📝 កម្មវិធីកែមេរៀនសង្ខេប (CMS) — គ្រូបង្កើត/កែមេរៀនផ្ទាល់លើគេហទំព័រ
   Firestore lsn/{id} = {o:ID គ្រូ, g:ថ្នាក់, ch:ជំពូកទី, cht:ចំណងជើងជំពូក, t:ចំណងជើងមេរៀន, m:វិធីសាស្ត្រ, j:JSON[ស្លាយ], u}
   ស្លាយ = {h, b:[{k:def|ex|sol|tip|warn|sum|img|plot, h, b}]} (ដូចមេរៀនក្នុង lessons.js)
   គ្រូទាំងអស់មើលបាន · ម្ចាស់ ឬ Admin កែ/លុប · ត្រូវផ្ទុកបន្ទាប់ពី lessons.js
   ======================================================================== */
(function(){
"use strict";
var CUS={},loaded=false,loading=false,E=null,pvT=null;
var KN=[["def","📘 និយមន័យ"],["ex","✏️ ឧទាហរណ៍"],["sol","✅ ចម្លើយ"],["tip","💡 គន្លឹះ"],["warn","⚠️ ប្រយ័ត្ន"],["sum","📌 សង្ខេប"],["img","🖼️ រូបភាព"],["plot","📈 ក្រាហ្វកុំផ្លិច (JSON)"]];
function isT(){return !!(who&&who.role!=="monitor")}
function canE(d){return !!(who&&(isAdm()||who.id===d.o))}
function jc(x){return JSON.parse(JSON.stringify(x))}
function load(){
  if(loading||!window.FB||!window.db||!who)return Promise.resolve();
  loading=true;
  return FB.getDocs(FB.collection(db,"lsn")).then(function(sn){
    var o={};sn.forEach(function(d){var v=d.data(),s=null;try{s=JSON.parse(v.j)}catch(x){}if(s)o[d.id]={id:d.id,o:v.o,g:+v.g,ch:+v.ch||1,cht:v.cht||"",t:v.t||"",m:v.m||"",s:s,u:v.u||""}});
    CUS=o;loaded=true;loading=false;
  },function(e){console.error("lsn:",e);loaded=true;loading=false});
}
window.LSC={
  list:function(g){
    return Object.keys(CUS).map(function(k){return CUS[k]}).filter(function(x){return x.g===g})
      .sort(function(a,b){return a.ch-b.ch||(a.u||"").localeCompare(b.u||"")})
      .map(function(x){return{t:x.t,m:x.m,s:x.s,id:x.id,o:x.o,ch:x.ch,cht:x.cht,cu:1,by:teacherOf(x.o).name||x.o}});
  },
  tools:function(){
    var el=$("lsTools");if(!el)return;
    if(!loaded&&!loading&&who){load().then(function(){LSX.render()})}
    el.innerHTML=isT()?"<button type=button class=primary data-lse=new>＋ បង្កើតមេរៀនថ្មី</button><button type=button data-lse=hub title='មេរៀនសង្ខេប · រូបមន្ត · គន្លឹះ · វីដេអូ ពីលើលំហាត់ក្នុងទំព័រហ្វឹកហាត់ (practice.html)'>🎓 ផ្ទាំងសិក្សាហ្វឹកហាត់</button><button type=button data-lse=reload title='ផ្ទុកមេរៀនរបស់គ្រូទាំងអស់ម្ដងទៀត'>🔄</button>"+(loading?"<span class=note>កំពុងផ្ទុក…</span>":""):"";
  },
  acts:function(l,g,ch){
    if(!isT())return"";
    if(l.cu)return"<div class=ls-ca><span>✍️ "+esc(l.by)+"</span>"+(canE(l)?"<button type=button data-lse='edit|"+esc(l.id)+"' title='កែ'>✏️</button><button type=button class=danger data-lse='del|"+esc(l.id)+"' title='លុប'>🗑️</button>":"")+"</div>";
    return"<div class=ls-ca><span>📦 ភ្ជាប់មកស្រាប់</span><button type=button data-lse='copy|"+g+"|"+ch.ch+"|"+esc(l.t)+"' title='ចម្លងជាមេរៀនរបស់ខ្ញុំ ដើម្បីកែ'>📄 ចម្លងដើម្បីកែ</button></div>";
  }
};
/* ---------- កម្មវិធីកែ ---------- */
function dlg(){
  var d=$("dlgLsEd");
  if(!d){d=document.createElement("dialog");d.id="dlgLsEd";d.className="wide ls-ed";document.body.appendChild(d);bindDlg(d)}
  return d;
}
function edit(x){
  E=x;E.sel=Math.min(E.sel||0,E.s.length-1);
  E.s.forEach(function(sl){sl.b.forEach(function(b){if(b.k==="plot"&&b._raw==null)b._raw=JSON.stringify(b.b||{})})});
  draw();var d=dlg();if(!d.open)d.showModal();
}
function blank(){var g=LSX.gSel();return{id:"",o:who.id,g:g,ch:1,cht:"",t:"",m:"",s:[{h:"",b:[{k:"def",h:"",b:""}]}],sel:0}}
function opt(a,v){return a.map(function(x){return"<option value='"+x[0]+"'"+(String(x[0])===String(v)?" selected":"")+">"+x[1]+"</option>"}).join("")}
function draw(){
  var d=dlg(),sl=E.s[E.sel];
  var h="<div class=lse-wrap><div class=lse-l><h2 style='margin:0 0 8px'>"+(E.id?"✏️ កែមេរៀន":"＋ មេរៀនថ្មី")+"</h2>"+
    "<div class=lse-meta><label>ថ្នាក់<select data-lm=g>"+opt([7,8,9,10,11,12].map(function(g){return[g,"ថ្នាក់ទី"+kn(g)]}),E.g)+"</select></label>"+
    "<label>ជំពូកទី<input type=number min=1 max=20 data-lm=ch value='"+E.ch+"'></label>"+
    "<label class=w>ចំណងជើងជំពូក<input data-lm=cht value='"+esc(E.cht)+"' placeholder='ឧ. ចំនួនកុំផ្លិច'></label>"+
    "<label class=w>ចំណងជើងមេរៀន *<input data-lm=t value='"+esc(E.t)+"' placeholder='ឧ. ទម្រង់ត្រីកោណមាត្រ'></label>"+
    "<label class=w>វិធីសាស្ត្របង្រៀន<input data-lm=m value='"+esc(E.m)+"' placeholder='ឧ. អនុមានរួម · Think-Pair-Share'></label></div>"+
    "<div class=lse-tabs>"+E.s.map(function(x,i){return"<button type=button data-lsl="+i+(i===E.sel?" class=on":"")+">"+kn(i+1)+". "+esc((x.h||"(គ្មានចំណងជើង)").slice(0,18))+"</button>"}).join("")+"<button type=button data-lse=addsl>＋ ស្លាយ</button></div>"+
    "<div class=lse-sl><div class=lse-slh><label class=w>ចំណងជើងស្លាយ<input data-ls=h value='"+esc(sl.h)+"'></label>"+
      "<span class=lse-mv><button type=button data-lse=slup title='ទៅមុខ'"+(E.sel?"":" disabled")+">◀</button><button type=button data-lse=sldn title='ទៅក្រោយ'"+(E.sel<E.s.length-1?"":" disabled")+">▶</button><button type=button data-lse=sldup title='ចម្លងស្លាយ'>⧉</button><button type=button class=danger data-lse=sldel title='លុបស្លាយ'"+(E.s.length>1?"":" disabled")+">🗑️</button></span></div>"+
    sl.b.map(function(b,i){
      var body;
      if(b.k==="img")body="<div class=lse-img>"+(b.b?"<img src='"+safeSrc(b.b)+"' alt=''>":"")+"<label class=lse-file>📷 "+(b.b?"ប្ដូររូប":"ជ្រើសរូបភាព")+"<input type=file accept='image/*' data-lb='"+i+"|file'></label></div>";
      else if(b.k==="plot")body="<textarea rows=4 data-lb='"+i+"|raw' spellcheck=false placeholder='{\"p\":[[1,1,\"z\",\"#b83a2e\"]],\"v\":true}'>"+esc(b._raw||"")+"</textarea>"+(b._bad?"<small class=lse-bad>⚠️ JSON មិនត្រឹមត្រូវ</small>":"");
      else body="<textarea rows=4 data-lb='"+i+"|b' placeholder='មួយបន្ទាត់មួយចំណុច · «- » = ចំណុចបញ្ជី · រូបមន្ត $\\frac{a}{b}$ ឬ $$x^2$$'>"+esc(b.b||"")+"</textarea>";
      return"<div class=lse-b><div class=lse-bh><select data-lb='"+i+"|k'>"+opt(KN,b.k)+"</select><input data-lb='"+i+"|h' value='"+esc(b.h||"")+"' placeholder='ចំណងជើងប្លុក (ទុកទទេ = លំនាំដើម)'>"+
        "<span class=lse-mv><button type=button data-lse='bup|"+i+"'"+(i?"":" disabled")+">▲</button><button type=button data-lse='bdn|"+i+"'"+(i<sl.b.length-1?"":" disabled")+">▼</button><button type=button class=danger data-lse='bdel|"+i+"'>✕</button></span></div>"+body+"</div>";
    }).join("")+
    "<div class=lse-add>"+KN.slice(0,7).map(function(k){return"<button type=button data-lse='badd|"+k[0]+"'>＋ "+k[1]+"</button>"}).join("")+"</div></div>"+
    "<p class=note>💡 រូបមន្តសរសេរជា LaTeX ក្នុង <code>$…$</code> (ក្នុងបន្ទាត់) ឬ <code>$$…$$</code> (ឯករាជ្យ)។ ឧ. <code>$z=a+bi$</code>, <code>$\\frac{\\pi}{3}$</code>, <code>$\\sqrt[n]{r}$</code>, <code>$\\R$ $\\C$</code></p></div>"+
    "<div class=lse-r><div class=lse-pvh>👁️ មើលជាមុន · ស្លាយទី"+kn(E.sel+1)+"</div><div class='lse-pv ls-stage' id=lsePv></div></div></div>"+
    "<div class=dlgf><span class=note id=lseSz></span><button type=button data-lse=close>បោះបង់</button><button type=button class=primary data-lse=save>💾 រក្សាទុក</button></div>";
  d.innerHTML=h;pv();
}
function pv(){
  clearTimeout(pvT);pvT=setTimeout(function(){
    var el=$("lsePv");if(!el||!E)return;
    var sl=E.s[E.sel],ls={t:E.t,m:E.m,s:E.s};
    el.innerHTML=LSX.slideHtml(ls,{ch:E.ch,t:E.cht},{h:sl.h,b:sl.b.filter(function(b){return!(b.k==="plot"&&b._bad)})},E.sel+1,E.s.length+2);
    LSX.math(el);
    var n=JSON.stringify(clean(E.s)).length,z=$("lseSz");if(z)z.textContent="ទំហំ "+kn(Math.round(n/1024))+" KB / ៩០០ KB";
  },250);
}
function clean(s){return s.map(function(sl){return{h:sl.h||"",b:sl.b.map(function(b){var o={k:b.k,h:b.h||"",b:b.b};if(b.k!=="plot"&&b.k!=="img")o.b=b.b||"";return o})}})}
/* រូបភាព → JPEG តូច (ទទឹងអតិបរមា ១០០០px) ដើម្បីកុំឱ្យលើសទំហំ Firestore */
function shrink(f,cb){
  var r=new FileReader();r.onload=function(){var im=new Image();im.onload=function(){
    var w=Math.min(1000,im.width),h=Math.round(im.height*w/im.width),c=document.createElement("canvas");c.width=w;c.height=h;
    var x=c.getContext("2d");x.fillStyle="#fff";x.fillRect(0,0,w,h);x.drawImage(im,0,0,w,h);
    var q=.82,u=c.toDataURL("image/jpeg",q);while(u.length>260000&&q>.4){q-=.1;u=c.toDataURL("image/jpeg",q)}cb(u);
  };im.src=r.result};r.readAsDataURL(f);
}
function bindDlg(d){
  d.addEventListener("input",function(e){
    if(!E)return;var t=e.target,sl=E.s[E.sel];
    if(t.dataset.lm){var k=t.dataset.lm;E[k]=k==="g"||k==="ch"?+t.value||1:t.value;pv();return}
    if(t.dataset.ls){sl.h=t.value;var b=d.querySelector("[data-lsl='"+E.sel+"']");if(b)b.textContent=kn(E.sel+1)+". "+(t.value||"(គ្មានចំណងជើង)").slice(0,18);pv();return}
    if(t.dataset.lb){
      var q=t.dataset.lb.split("|"),bl=sl.b[+q[0]];if(!bl)return;
      if(q[1]==="k"){var kd=function(k){return k==="img"||k==="plot"?k:"t"},ok=kd(bl.k);bl.k=t.value;
        if(ok!==kd(bl.k)){bl.b=bl.k==="plot"?{p:[],v:true}:"";bl._raw=bl.k==="plot"?JSON.stringify(bl.b):null;bl._bad=false}   /* ប្ដូរប្រភេទ (អត្ថបទ ↔ រូប ↔ ក្រាហ្វ) → ចាប់ផ្ដើមខ្លឹមសារថ្មី */
        draw();return}
      if(q[1]==="h"){bl.h=t.value;pv();return}
      if(q[1]==="b"){bl.b=t.value;pv();return}
      if(q[1]==="raw"){bl._raw=t.value;try{bl.b=JSON.parse(t.value);bl._bad=false}catch(x){bl._bad=true}pv();return}
    }
  });
  d.addEventListener("change",function(e){
    var t=e.target;if(!E||!t.dataset.lb)return;var q=t.dataset.lb.split("|");
    if(q[1]==="file"&&t.files[0]){var bl=E.s[E.sel].b[+q[0]];shrink(t.files[0],function(u){bl.b=u;draw()})}
    if(q[1]==="raw")draw();
  });
  d.addEventListener("click",function(e){
    var b=e.target.closest("[data-lsl],[data-lse]");if(!b||!E)return;
    if(b.dataset.lsl!=null){E.sel=+b.dataset.lsl;draw();return}
    var q=b.dataset.lse.split("|"),a=q[0],s=E.s,sl=s[E.sel],i=+q[1];
    if(a==="close"){if(confirm("បិទដោយមិនរក្សាទុក?"))d.close();return}
    if(a==="addsl"){s.push({h:"",b:[{k:"def",h:"",b:""}]});E.sel=s.length-1}
    else if(a==="slup"&&E.sel){s.splice(E.sel-1,0,s.splice(E.sel,1)[0]);E.sel--}
    else if(a==="sldn"&&E.sel<s.length-1){s.splice(E.sel+1,0,s.splice(E.sel,1)[0]);E.sel++}
    else if(a==="sldup"){s.splice(E.sel+1,0,jc(sl));E.sel++}
    else if(a==="sldel"&&s.length>1){if(!confirm("លុបស្លាយនេះ?"))return;s.splice(E.sel,1);E.sel=Math.max(0,E.sel-1)}
    else if(a==="badd")sl.b.push(q[1]==="plot"?{k:"plot",h:"",b:{p:[],v:true},_raw:"{\"p\":[],\"v\":true}"}:{k:q[1],h:"",b:""});
    else if(a==="bup"&&i)sl.b.splice(i-1,0,sl.b.splice(i,1)[0]);
    else if(a==="bdn"&&i<sl.b.length-1)sl.b.splice(i+1,0,sl.b.splice(i,1)[0]);
    else if(a==="bdel")sl.b.splice(i,1);
    else if(a==="save")return save();
    else return;
    draw();
  });
}
function save(){
  if(!E.t.trim()){alert("សូមបញ្ចូលចំណងជើងមេរៀន");return}
  if(E.s.some(function(sl){return sl.b.some(function(b){return b.k==="plot"&&b._bad})})){alert("មានក្រាហ្វ JSON មិនត្រឹមត្រូវ · សូមកែ ឬលុបប្លុកនោះ");return}
  var j=JSON.stringify(clean(E.s));
  if(j.length>900000){alert("មេរៀននេះធំពេក ("+Math.round(j.length/1024)+" KB) · សូមកាត់បន្ថយរូបភាព ឬបំបែកជាមេរៀនពីរ");return}
  var id=E.id||(who.id+"_"+Date.now().toString(36)),o=E.id?E.o:who.id,doc={o:o,g:E.g,ch:E.ch,cht:E.cht.trim(),t:E.t.trim(),m:E.m.trim(),j:j,u:new Date().toISOString()};
  var b=$("dlgLsEd").querySelector("[data-lse=save]");if(b){b.disabled=true;b.textContent="⏳ កំពុងរក្សាទុក…"}
  FB.setDoc(FB.doc(db,"lsn",id),doc).then(function(){
    CUS[id]={id:id,o:o,g:doc.g,ch:doc.ch,cht:doc.cht,t:doc.t,m:doc.m,s:JSON.parse(j),u:doc.u};
    $("dlgLsEd").close();E=null;LSX.render();notify("បានរក្សាទុកមេរៀន «"+doc.t+"»");
  },function(e){
    console.error(e);if(b){b.disabled=false;b.textContent="💾 រក្សាទុក"}
    alert(e&&e.code==="permission-denied"?"គ្មានសិទ្ធិរក្សាទុក · សូម Admin Publish firestore.rules កំណែថ្មី (មាន lsn)":"មិនអាចរក្សាទុកបានទេ · សូមពិនិត្យអ៊ីនធឺណិត");
  });
}
/* ---------- ប៊ូតុងក្នុងទំព័រមេរៀន ---------- */
$("p20").addEventListener("click",function(e){
  var b=e.target.closest("[data-lse]");if(!b||!isT()||b.closest("#dlgLsEd"))return;
  var q=b.dataset.lse.split("|"),a=q[0];
  if(a==="new")return edit(blank());
  if(a==="hub")return hubOpen();
  if(a==="reload"){loaded=false;load().then(function(){LSX.render()});LSX.render();return}
  if(a==="edit"){var x=CUS[q[1]];if(x&&canE(x))edit({id:x.id,o:x.o,g:x.g,ch:x.ch,cht:x.cht,t:x.t,m:x.m,s:jc(x.s),sel:0});return}
  if(a==="del"){
    var y=CUS[q[1]];if(!y||!canE(y)||!confirm("លុបមេរៀន «"+y.t+"»?\nការលុបនេះមិនអាចត្រឡប់វិញបានទេ។"))return;
    FB.deleteDoc(FB.doc(db,"lsn",y.id)).then(function(){delete CUS[y.id];LSX.render();notify("បានលុបមេរៀន")},function(e){console.error(e);alert("មិនអាចលុបបានទេ")});
    return;
  }
  if(a==="copy"){
    var g=+q[1],ch=+q[2],t=q.slice(3).join("|"),c=(LSX.LSUM[g]||[]).filter(function(c){return c.ch===ch})[0],l=c&&c.ls.filter(function(l){return l.t===t})[0];
    if(l)edit({id:"",o:who.id,g:g,ch:ch,cht:c.t,t:l.t+" (កែសម្រួល)",m:l.m||"",s:jc(l.s),sel:0});
  }
});

/* =================== 🎓 ផ្ទាំងសិក្សាហ្វឹកហាត់ (Flipped Classroom) ===================
   Firestore hub/{ថ្នាក់}_{មេរៀន} = {o:គ្រូចុងក្រោយ, g, l, j:JSON{subs:[…]}, r:កំណែ (កើន ១ ម្ដងៗ), u}
   សិស្សអានលើ practice.html (hub.js) · គ្រូសកម្មណាក៏កែបាន (មាតិការួមរបស់មេរៀន) · រក្សាទុកដោយ Transaction (ពិនិត្យកំណែ r)
   សេចក្ដីព្រាងរក្សាក្នុង localStorage hubDraft_{g}_{l} រហូតដល់រក្សាទុកជោគជ័យ */
var HE=null,hubT=null;
var HLV=[[1,"១"],[5,"២"],[2,"៣"],[6,"៤"],[3,"៥"],[4,"🌐 PISA"]];
function hubD(){var d=$("dlgHub");if(!d){d=document.createElement("dialog");d.id="dlgHub";d.className="wide ls-ed hub-ed";document.body.appendChild(d);hubBind(d)}return d}
function hubLes(g){var o=[];((window.PRACT&&PRACT.GR[g]&&PRACT.GR[g].les)||[]).forEach(function(c){c[1].forEach(function(x){o.push(x)})});return o}
function hubName(g,l){var x=hubLes(g).filter(function(x){return x[0]===l})[0];return x?x[1]:""}
function hubOpen(){
  var d=hubD();d.innerHTML="<p style='padding:30px;text-align:center'>⏳ កំពុងផ្ទុកបញ្ជីមេរៀន…</p>";if(!d.open)d.showModal();
  var go=function(){var g=HE?HE.g:9,L=hubLes(g);hubLoad(g,HE&&HE.l?HE.l:L.length?L[0][0]:1)};
  if(window.PRACT&&PRACT.GR&&PRACT.GR[7]&&PRACT.GR[9])return go();
  (window.EXAM?EXAM.gen():Promise.reject("noexam")).then(go,function(e){console.error(e);d.innerHTML="<p style='padding:30px;text-align:center'>⚠️ មិនអាចផ្ទុកបញ្ជីមេរៀនបានទេ · សូមពិនិត្យអ៊ីនធឺណិត</p><div class=dlgf><button type=button data-he=close>បិទ</button></div>"});
}
function hubLoad(g,l){
  var d=hubD(),name=hubName(g,l);
  d.innerHTML="<p style='padding:30px;text-align:center'>⏳ កំពុងផ្ទុក…</p>";
  FB.getDoc(FB.doc(db,"hub",g+"_"+l)).then(function(sn){
    var v=sn.exists()?sn.data():null,subs=null;
    if(v){try{subs=JSON.parse(v.j).subs}catch(e){subs=null}}
    var src=subs?"teacher":HUB.starter(g,l)?"starter":"generic";
    if(!subs)subs=HUB.starter(g,l)||HUB.generic(name,false,g,l);
    HE={g:g,l:l,name:name,subs:subs,r:v?+v.r||0:0,src:src,by:v?v.o:"",at:v?v.u:"",sel:0,dirty:false};
    var dr=null;try{dr=JSON.parse(localStorage.getItem("hubDraft_"+g+"_"+l)||"null")}catch(e){}
    if(dr&&dr.subs&&confirm("មានសេចក្ដីព្រាងមិនទាន់រក្សាទុក ("+String(dr.t||"").slice(0,16).replace("T"," ")+") សម្រាប់មេរៀននេះ ។ បើកសេចក្ដីព្រាងនោះ?")){HE.subs=dr.subs;HE.dirty=true}
    else if(dr)try{localStorage.removeItem("hubDraft_"+g+"_"+l)}catch(e){}
    if(HUB.put&&v&&subs)HUB.put(g,l,{subs:subs});
    hubDraw();
  },function(e){console.error(e);d.innerHTML="<p style='padding:30px;text-align:center'>⚠️ មិនអាចផ្ទុកបានទេ"+(e&&e.code==="permission-denied"?" · សូម Admin Publish firestore.rules កំណែថ្មី (មាន hub)":"")+"</p><div class=dlgf><button type=button data-he=close>បិទ</button></div>"});
}
function hubBlank(){return{t:"",lv:[],s:"",f:[],k:"",ex:[],v:""}}
function vChip(u){if(!String(u||"").trim())return"<small class=note>គ្មានវីដេអូ (ទុកទទេបាន)</small>";var v=HUB.vparse(u);return v?"<small class=hub-ok>✅ "+({yt:"YouTube",gd:"Google Drive",mp4:"ឯកសារវីដេអូ"})[v.k]+"</small> <button type=button data-he=vtest>▶ សាកចាក់</button>":"<small class=hub-bad>⚠️ តំណមិនស្គាល់ · ប្រើ YouTube · Google Drive (ចែករំលែក «Anyone with the link») ឬ https://….mp4</small>"}
function hubDraw(){
  var d=hubD(),x=HE.subs[HE.sel],G=[7,8,9,10,11,12],L=hubLes(HE.g);
  var src=HE.src==="teacher"?"✍️ កំណែគ្រូ"+(HE.by?" ("+esc(teacherOf(HE.by).name||HE.by)+(HE.at?" · "+esc(String(HE.at).slice(0,10)):"")+")":"")+" · កំណែ "+kn(HE.r):HE.src==="starter"?"📦 មាតិកាគំរូ (មិនទាន់កែ)":"📄 ទូទៅ (មិនទាន់មានមាតិកា)";
  var h="<div class=lse-wrap><div class=lse-l><h2 style='margin:0 0 6px'>🎓 ផ្ទាំងសិក្សាហ្វឹកហាត់</h2><p class=note style='margin:0 0 8px'>បង្ហាញពីលើលំហាត់ក្នុងទំព័រហ្វឹកហាត់ ៖ មេរៀនសង្ខេប · រូបមន្ត · គន្លឹះ · វីដេអូ តាមចំណុចរង</p>"+
    "<div class=lse-meta><label>ថ្នាក់<select data-hm=g>"+G.map(function(g){return"<option value="+g+(g===HE.g?" selected":"")+">ថ្នាក់ទី"+kn(g)+"</option>"}).join("")+"</select></label>"+
    "<label class=w>មេរៀន<select data-hm=l>"+L.map(function(y){return"<option value="+y[0]+(y[0]===HE.l?" selected":"")+">"+kn(y[0])+". "+esc(y[1])+"</option>"}).join("")+"</select></label></div>"+
    "<p class=note style='margin:4px 0'>"+src+(HE.dirty?" · <b style='color:#b45309'>● មិនទាន់រក្សាទុក</b>":"")+"</p>"+
    "<div class=lse-tabs>"+HE.subs.map(function(s,i){return"<button type=button data-hs="+i+(i===HE.sel?" class=on":"")+">"+esc((s.t||"(គ្មានចំណងជើង)").slice(0,22))+"</button>"}).join("")+"<button type=button data-he=add>＋ ចំណុចរង</button></div>";
  if(x){
    h+="<div class=lse-sl><div class=lse-slh><label class=w>ចំណងជើងចំណុចរង *<input data-hf=t value='"+esc(x.t)+"' placeholder='ឧ. ១.២ សម្រួលរ៉ាឌីកាល់'></label>"+
      "<span class=lse-mv><button type=button data-he=up title='ទៅមុខ'"+(HE.sel?"":" disabled")+">◀</button><button type=button data-he=dn title='ទៅក្រោយ'"+(HE.sel<HE.subs.length-1?"":" disabled")+">▶</button><button type=button data-he=dup title='ចម្លង'>⧉</button><button type=button class=danger data-he=del title='លុប'"+(HE.subs.length>1?"":" disabled")+">🗑️</button></span></div>"+
      "<div class=hub-lvs><span>បង្ហាញក្នុងកម្រិត ៖</span>"+HLV.map(function(v){return"<label><input type=checkbox data-hlv="+v[0]+((x.lv||[]).indexOf(v[0])>=0?" checked":"")+">"+v[1]+"</label>"}).join("")+"<small class=note>(មិនធីក = គ្រប់កម្រិត)</small></div>"+
      "<label class=hub-fld>📖 មេរៀនសង្ខេប<textarea rows=4 data-hf=s placeholder='មួយបន្ទាត់មួយចំណុច · «- » = ចំណុចបញ្ជី · គណិតក្នុង $…$'>"+esc(x.s||"")+"</textarea></label>"+
      "<label class=hub-fld>📐 រូបមន្តសំខាន់ៗ <small>(មួយបន្ទាត់មួយរូបមន្ត · LaTeX គ្មាន $ · ឧ. <code>(a+b)^2=a^2+2ab+b^2</code>)</small><textarea rows=3 data-hf=f spellcheck=false>"+esc((x.f||[]).join("\n"))+"</textarea></label>"+
      "<label class=hub-fld>💡 គន្លឹះដោះស្រាយ<textarea rows=3 data-hf=k placeholder='វិធីរហ័ស · ជំហានគិត · ចំណុចប្រយ័ត្ន'>"+esc(x.k||"")+"</textarea></label>"+
      "<div class=hub-fld>✏️ ឧទាហរណ៍គំរូ"+(x.ex||[]).map(function(e,i){return"<div class=hub-exr><textarea rows=2 data-hx='"+i+"|0' placeholder='សំណួរ'>"+esc(e[0]||"")+"</textarea><textarea rows=2 data-hx='"+i+"|1' placeholder='ដំណោះស្រាយ'>"+esc(e[1]||"")+"</textarea><button type=button class=danger data-he='exdel|"+i+"'>✕</button></div>"}).join("")+"<button type=button data-he=exadd>＋ ឧទាហរណ៍</button></div>"+
      "<label class=hub-fld>🎬 តំណវីដេអូ (Python/Manim · YouTube · Google Drive · MP4)<input data-hf=v value='"+esc(x.v||"")+"' placeholder='https://youtu.be/…'></label><div id=hubVc>"+vChip(x.v)+"</div></div>";
  }
  h+="</div><div class=lse-r><div class=lse-pvh>👁️ មើលជាមុន (ដូចសិស្សឃើញ)</div><div class=hub-pv id=hubPv></div></div></div>"+
    "<div class=dlgf><a class=note href='practice.html#g="+HE.g+"&l="+HE.l+"&v=1' target=_blank rel=noopener>📱 បើកទំព័រសិស្ស</a>"+(HE.src==="teacher"?"<button type=button data-he=reset title='លុបកំណែគ្រូ ហើយប្រើមាតិកាគំរូវិញ'>↺ ត្រឡប់ទៅលំនាំដើម</button>":"")+
    "<button type=button data-he=close>បិទ</button><button type=button class=primary data-he=save>💾 រក្សាទុក</button></div>";
  d.innerHTML=h;hubPv();
}
function hubPv(){clearTimeout(hubT);hubT=setTimeout(function(){var el=$("hubPv");if(!el||!HE)return;var x=HE.subs[HE.sel];el.innerHTML=x?HUB.subHtml(x,false):"";LSX.math(el)},250)}
function hubDirty(){HE.dirty=true;try{localStorage.setItem("hubDraft_"+HE.g+"_"+HE.l,JSON.stringify({subs:HE.subs,t:new Date().toISOString()}))}catch(e){}hubPv()}
function hubClean(){return HE.subs.map(function(x){var o={t:String(x.t||"").trim(),lv:(x.lv||[]).slice(),s:x.s||"",f:(x.f||[]).map(function(f){return String(f).trim()}).filter(Boolean),k:x.k||"",ex:(x.ex||[]).filter(function(e){return(e[0]||"").trim()||(e[1]||"").trim()}),v:String(x.v||"").trim()};if(!o.lv.length)delete o.lv;return o})}
function hubLeave(){return!HE||!HE.dirty||confirm("មានការកែមិនទាន់រក្សាទុក ។ បោះបង់ការកែ? (សេចក្ដីព្រាងនៅតែរក្សាក្នុងឧបករណ៍នេះ)")}
function hubSave(){
  var subs=hubClean();
  if(subs.some(function(x){return!x.t})){alert("សូមបញ្ចូលចំណងជើងគ្រប់ចំណុចរង");return}
  var bv=subs.filter(function(x){return x.v&&!HUB.vparse(x.v)})[0];if(bv){alert("តំណវីដេអូមិនត្រឹមត្រូវ ក្នុង «"+bv.t+"»");return}
  var j=JSON.stringify({subs:subs});if(j.length>190000){alert("មាតិកាធំពេក ("+Math.round(j.length/1024)+" KB / ១៩០ KB)");return}
  var g=HE.g,l=HE.l,ref=FB.doc(db,"hub",g+"_"+l),base=HE.r,b=$("dlgHub").querySelector("[data-he=save]");if(b){b.disabled=true;b.textContent="⏳ កំពុងរក្សាទុក…"}
  var run=function(force){return FB.runTransaction(db,function(tx){return tx.get(ref).then(function(sn){
    var cur=sn.exists()?+sn.data().r||0:0;if(cur!==base&&!force)throw{code:"conflict",cur:cur,by:sn.exists()?sn.data().o:""};
    var doc={o:who.id,g:g,l:l,j:j,r:cur+1,u:new Date().toISOString()};
    if(sn.exists())tx.update(ref,doc);else tx.set(ref,doc);return doc.r})})};
  var ok=function(r){HE.r=r;HE.subs=subs;HE.src="teacher";HE.by=who.id;HE.at=new Date().toISOString();HE.dirty=false;
    try{localStorage.removeItem("hubDraft_"+g+"_"+l)}catch(e){}HUB.put(g,l,{subs:subs});hubDraw();notify("បានរក្សាទុកផ្ទាំងសិក្សា «"+HE.name+"»")};
  var fail=function(e){
    if(b){b.disabled=false;b.textContent="💾 រក្សាទុក"}
    if(e&&e.code==="conflict"){if(confirm("គ្រូម្នាក់ទៀត ("+(teacherOf(e.by).name||e.by||"?")+") បានរក្សាទុកកំណែថ្មីជាងនេះ ។ សរសេរជាន់ពីលើ?\n(ចុច Cancel ដើម្បីផ្ទុកកំណែថ្មីមកមើលសិន · សេចក្ដីព្រាងរបស់អ្នកនៅតែរក្សាទុក)")){base=e.cur;run(true).then(ok,fail)}else hubLoad(g,l);return}
    console.error(e);alert(e&&e.code==="permission-denied"?"គ្មានសិទ្ធិរក្សាទុក · សូម Admin Publish firestore.rules កំណែថ្មី (មាន hub)":"មិនអាចរក្សាទុកបានទេ · សូមពិនិត្យអ៊ីនធឺណិត (សេចក្ដីព្រាងនៅតែរក្សាក្នុងឧបករណ៍)");
  };
  run(false).then(ok,fail);
}
function hubBind(d){
  d.addEventListener("input",function(e){
    var t=e.target;if(!HE)return;var x=HE.subs[HE.sel];
    if(t.dataset.hf&&x){var k=t.dataset.hf;x[k]=k==="f"?t.value.split("\n"):t.value;
      if(k==="t"){var b=d.querySelector("[data-hs='"+HE.sel+"']");if(b)b.textContent=(t.value||"(គ្មានចំណងជើង)").slice(0,22)}
      if(k==="v"){var c=$("hubVc");if(c)c.innerHTML=vChip(t.value)}
      return hubDirty()}
    if(t.dataset.hx&&x){var q=t.dataset.hx.split("|");x.ex[+q[0]][+q[1]]=t.value;return hubDirty()}
  });
  d.addEventListener("change",function(e){
    var t=e.target;if(!HE)return;
    if(t.dataset.hm){var g=t.dataset.hm==="g"?+t.value:HE.g,l=t.dataset.hm==="l"?+t.value:0;
      if(!hubLeave()){t.value=t.dataset.hm==="g"?HE.g:HE.l;return}
      if(!l){var L=hubLes(g);l=L.length?L[0][0]:1}return hubLoad(g,l)}
    if(t.dataset.hlv){var x=HE.subs[HE.sel];x.lv=HLV.map(function(v){return v[0]}).filter(function(v){var c=d.querySelector("[data-hlv='"+v+"']");return c&&c.checked});hubDirty()}
  });
  d.addEventListener("click",function(e){
    var b=e.target.closest("[data-hs],[data-he]");if(!b)return;
    if(b.dataset.hs!=null){HE.sel=+b.dataset.hs;return hubDraw()}
    var q=b.dataset.he.split("|"),a=q[0],s=HE&&HE.subs,x=s&&s[HE.sel];
    if(a==="close"){if(hubLeave()){d.close()}return}
    if(!HE)return;
    if(a==="save")return hubSave();
    if(a==="vtest")return HUB.vopen(x.v,x.t);
    if(a==="reset"){if(!confirm("លុបកំណែគ្រូរបស់មេរៀននេះ ហើយត្រឡប់ទៅមាតិកាគំរូ?\nសិស្សនឹងឃើញមាតិកាគំរូវិញ ពេលបើក ឬ Refresh ទំព័រ។"))return;
      FB.deleteDoc(FB.doc(db,"hub",HE.g+"_"+HE.l)).then(function(){HUB.clear(HE.g,HE.l);try{localStorage.removeItem("hubDraft_"+HE.g+"_"+HE.l)}catch(e){}HE.dirty=false;notify("បានត្រឡប់ទៅលំនាំដើម");hubLoad(HE.g,HE.l)},function(e){console.error(e);alert("មិនអាចលុបបានទេ (ត្រូវជាអ្នករក្សាទុកចុងក្រោយ ឬ Admin)")});return}
    if(a==="add"){s.push(hubBlank());HE.sel=s.length-1}
    else if(a==="up"&&HE.sel){s.splice(HE.sel-1,0,s.splice(HE.sel,1)[0]);HE.sel--}
    else if(a==="dn"&&HE.sel<s.length-1){s.splice(HE.sel+1,0,s.splice(HE.sel,1)[0]);HE.sel++}
    else if(a==="dup"){s.splice(HE.sel+1,0,jc(x));HE.sel++}
    else if(a==="del"&&s.length>1){if(!confirm("លុបចំណុចរង «"+(x.t||"")+"»?"))return;s.splice(HE.sel,1);HE.sel=Math.max(0,HE.sel-1)}
    else if(a==="exadd"){x.ex=x.ex||[];x.ex.push(["",""])}
    else if(a==="exdel"){x.ex.splice(+q[1],1)}
    else return;
    hubDirty();hubDraw();
  });
  d.addEventListener("cancel",function(e){if(HE&&HE.dirty&&!hubLeave())e.preventDefault()});
}
})();
