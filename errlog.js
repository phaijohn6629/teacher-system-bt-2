/* ========================================================================
   🐞 កំណត់ហេតុកំហុស — កត់ត្រាកំហុស JS ពីកុំព្យូទ័រ/ទូរស័ព្ទរបស់គ្រូ ទៅ Firestore (errs/)
   - error · unhandled promise · ឯកសារផ្ទុកមិនបាន · console.error
   - មិនស្ទួន · អតិបរមា ២០ ក្នុងមួយដងបើក · រង់ចាំ Login រួចទើបផ្ញើ
   - Admin៖ ប៊ូតុង «🐞» នៅក្បាលទំព័រ → មើល / លុប
   ត្រូវផ្ទុកមុនគេបង្អស់ក្នុង index.html · Rules៖ errs (create = គ្រូ · read/delete = Admin)
   ======================================================================== */
(function(){
"use strict";
var Q=[],seen={},n=0,MAX=20;
function S(v,k){return String(v==null?"":v).slice(0,k)}
function rec(m,src,st){
  var k=S(m,160);if(!k||seen[k]||n>=MAX)return;seen[k]=1;n++;
  Q.push({m:S(m,500),src:S(src,200),s:S(st,1500),pg:S(location.pathname.split("/").pop()+location.hash,80),ua:S(navigator.userAgent,180),t:new Date().toISOString()});
  setTimeout(flush,0);
}
window.addEventListener("error",function(e){
  var t=e.target;if(t&&t!==window&&(t.src||t.href)){rec("load failed: "+(t.src||t.href),"resource","");return}
  rec(e.message,(e.filename||"").split("/").pop()+":"+(e.lineno||0)+":"+(e.colno||0),e.error&&e.error.stack);
},true);
window.addEventListener("unhandledrejection",function(e){var r=e.reason;rec("promise: "+(r&&(r.message||r.code)||r),"",r&&r.stack)});
var ce=console.error;console.error=function(){try{rec("console: "+[].slice.call(arguments).map(function(x){return x&&x.message?x.message+(x.code?" ("+x.code+")":""):typeof x==="object"?JSON.stringify(x):String(x)}).join(" "),"console","")}catch(e){}return ce.apply(console,arguments)};
function flush(){
  if(!Q.length)return;var F=window.FB,db=window.db,w=window.who;
  if(!F||!db||!w||!w.id){clearTimeout(flush.t);flush.t=setTimeout(flush,8000);return}
  Q.splice(0).forEach(function(x){x.u=S(w.id,40);x.n=S(w.name,60);try{F.addDoc(F.collection(db,"errs"),x).catch(function(){})}catch(e){}});
}
/* ---------- Admin៖ មើលកំហុស ---------- */
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function btn(){
  var a=document.querySelector(".hdr-acts");if(!a)return;var b=document.getElementById("btnErr"),adm=typeof window.isAdm==="function"&&window.who&&window.isAdm();
  if(!b){b=document.createElement("button");b.id="btnErr";b.type="button";b.title="កំណត់ហេតុកំហុសពីឧបករណ៍គ្រូ (Admin)";b.textContent="🐞";b.hidden=true;b.onclick=view;a.insertBefore(b,a.firstChild)}
  b.hidden=!adm;
}
setInterval(btn,4000);
function view(){
  var F=window.FB,db=window.db,d=document.getElementById("errDlg");if(!F||!db)return;
  if(!d){d=document.createElement("dialog");d.id="errDlg";d.style.cssText="max-width:900px;width:94vw;border:none;border-radius:16px;padding:16px";document.body.appendChild(d)}
  d.innerHTML="<p>⏳ កំពុងផ្ទុក…</p>";if(!d.open)d.showModal();
  F.getDocs(F.collection(db,"errs")).then(function(sn){
    var a=[];sn.forEach(function(x){var v=x.data();v.id=x.id;a.push(v)});a.sort(function(x,y){return(y.t||"").localeCompare(x.t||"")});
    d.innerHTML="<div style='display:flex;gap:8px;align-items:center;justify-content:space-between'><h2 style='margin:0'>🐞 កំណត់ហេតុកំហុស ("+a.length+")</h2><span><button type=button id=errClr"+(a.length?"":" disabled")+">🗑️ លុបទាំងអស់</button> <button type=button id=errX>បិទ</button></span></div>"+
      "<p style='color:#64748b;font-size:.85em;margin:4px 0 10px'>កំហុសដែលកើតលើកុំព្យូទ័រ/ទូរស័ព្ទរបស់គ្រូ · ផ្ញើទៅអ្នកអភិវឌ្ឍដើម្បីកែ</p>"+
      (a.length?"<div style='max-height:65vh;overflow:auto'>"+a.map(function(v){return"<details style='border:1px solid #e2e8f0;border-radius:10px;padding:6px 10px;margin:6px 0'><summary><b>"+esc((v.t||"").replace("T"," ").slice(0,16))+"</b> · "+esc(v.n||v.u)+" · <code>"+esc(v.pg)+"</code><br><span style='color:#b91c1c'>"+esc(v.m)+"</span></summary>"+
        "<pre style='white-space:pre-wrap;font-size:11px;background:#f8fafc;padding:6px;border-radius:6px'>"+esc((v.src?v.src+"\n":"")+(v.s||"")+"\n"+v.ua)+"</pre></details>"}).join("")+"</div>":"<p>✅ មិនមានកំហុសទេ</p>");
    document.getElementById("errX").onclick=function(){d.close()};
    document.getElementById("errClr").onclick=function(){if(!confirm("លុបកំណត់ហេតុកំហុសទាំងអស់?"))return;var b=F.writeBatch(db);a.slice(0,450).forEach(function(v){b.delete(F.doc(db,"errs",v.id))});b.commit().then(view,function(){alert("លុបមិនបាន")})};
  },function(e){d.innerHTML="<p>⚠️ មិនអាចផ្ទុកបានទេ ("+esc(e&&e.code)+") · សូម Admin Publish firestore.rules កំណែថ្មី (មាន errs)</p><button type=button onclick='this.closest(\"dialog\").close()'>បិទ</button>"});
}
window.ERRLOG={rec:rec,view:view};
})();
