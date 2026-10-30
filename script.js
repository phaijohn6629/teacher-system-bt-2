/* ========================================================================
   script.js — ប្រព័ន្ធគ្រប់គ្រងទិន្នន័យគ្រូបង្រៀន
   ------------------------------------------------------------------------
   មាតិកា៖
     ផ្នែកទី ១ · Firebase (Authentication + Firestore) ← ទីនេះ
     ផ្នែកទី ២ · កម្មវិធីគោល
        - ការផ្ទៀងផ្ទាត់ (Login / Logout / ប្ដូរលេខសម្ងាត់ / បង្កើតគណនី)
        - ផ្ទាំងទាំង ១០ (ទិន្នន័យគ្រូ ... ឯកសារជំនួយ) និងការគណនា
        - Backup / Restore / Print
        - Firebase Realtime Sync (ដំណើរការបន្ទាប់ពី Login)
   ចំណាំ៖ ត្រូវបម្រើតាម http(s) (Firebase Hosting, GitHub Pages ...)។
          Firebase Authentication មិនដំណើរការពេលបើកឯកសារដោយចុចពីរដង (file://)។
   ======================================================================== */
(function () {
  var firebaseConfig = {
    apiKey: "AIzaSyAtfudfLGNHCFYUwGxLM8_lfSZ-jYWQ6J8",
    authDomain: "math-teacher-system-bt.firebaseapp.com",
    projectId: "math-teacher-system-bt",
    storageBucket: "math-teacher-system-bt.firebasestorage.app",
    messagingSenderId: "134725787928",
    appId: "1:134725787928:web:50343e4b7c7247833c3e6d"
  };
  var B = "https://www.gstatic.com/firebasejs/10.8.0/";
  /* ផ្ទុក SDK ដោយ dynamic import ដើម្បីឱ្យកូដកម្មវិធីគោលនៅជា script ធម្មតា */
  window.FBREADY = Promise.all([
    import(B + "firebase-app.js"),
    import(B + "firebase-auth.js"),
    import(B + "firebase-firestore.js")
  ]).then(function (m) {
    var A = m[0], AU = m[1], FS = m[2];
    var app = A.initializeApp(firebaseConfig);
    var auth = AU.getAuth(app);
    /* App ទីពីរ ប្រើសម្រាប់ឱ្យ Admin បង្កើតគណនីគ្រូ ដោយមិនចាំបាច់ចាកចេញពីគណនីខ្លួន */
    var sauth = AU.getAuth(A.initializeApp(firebaseConfig, "secondary"));
    window.db = FS.getFirestore(app);
    window.FB = {
      auth: auth, sauth: sauth,
      doc: FS.doc, collection: FS.collection, getDoc: FS.getDoc, getDocs: FS.getDocs,
      setDoc: FS.setDoc, updateDoc: FS.updateDoc, deleteDoc: FS.deleteDoc,
      query: FS.query, where: FS.where, onSnapshot: FS.onSnapshot,
      signInWithEmailAndPassword: AU.signInWithEmailAndPassword, signOut: AU.signOut,
      onAuthStateChanged: AU.onAuthStateChanged,
      createUserWithEmailAndPassword: AU.createUserWithEmailAndPassword,
      updatePassword: AU.updatePassword, reauthenticateWithCredential: AU.reauthenticateWithCredential,
      EmailAuthProvider: AU.EmailAuthProvider
    };
    /* Session តែប៉ុណ្ណោះ៖ បិទ Tab ត្រូវ Login ឡើងវិញ */
    return AU.setPersistence(auth, AU.browserSessionPersistence)
      .then(function () { return AU.setPersistence(sauth, AU.inMemoryPersistence); })
      .catch(function () {});
  });
})();

/* ========================================================================
   ផ្នែកទី ២ · កម្មវិធីគោល (ការគណនា ផ្ទាំងទាំង ១០ ការ Backup និង Sync)
   ======================================================================== */

var KEY="teachers-v4",M=["មករា","កុម្ភៈ","មីនា","មេសា","ឧសភា","មិថុនា","កក្កដា","សីហា","កញ្ញា","តុលា","វិច្ឆិកា","ធ្នូ"];
var RL=["ប្រធាន","អនុប្រធាន","សមាជិក"], DG=["គ្រូបង្រៀនកម្រិតឧត្តម","គ្រូបង្រៀនកម្រិតមូលដ្ឋាន","គ្រូកិច្ចសន្យា"];
var SEED=[];
var D2=["កម្រិត ១","កម្រិត ២"],SK={T001:{lv:["10","11","12"],w:{}},T002:{lv:D2.slice(),w:{}},T003:{lv:["9","10"],w:{}},T004:{lv:["9","10"],w:{}},T005:{lv:["10","11"],w:{}},T006:{lv:D2.slice(),w:{}},T007:{lv:D2.slice(),w:{}},T008:{lv:D2.slice(),w:{}}};
var MK=["តុលា","វិច្ឆិកា","ធ្នូ","មករា","កុម្ភៈ","មីនា","មេសា","ឧសភា","មិថុនា","កក្កដា","សីហា"],WK=["ស.១","ស.២","ស.៣","ស.៤"];

function $(i){return document.getElementById(i)}
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function csvSafe(v){var s=String(v==null?"":v);return(/^[=+@\t\r]/.test(s)||/^-[^0-9.]/.test(s))?"'"+s:s}
function notify(msg){var t=$("toast");t.textContent=msg;t.classList.add("show");clearTimeout(t._tm);t._tm=setTimeout(function(){t.classList.remove("show")},2600)}
function fd(s){if(!s||!/^\d{4}-\d{2}-\d{2}$/.test(s))return"";var p=s.split("-");return +p[2]+" "+M[+p[1]-1]+" "+p[0]}
function selOpts(arr,val){return arr.map(function(o){return"<option"+(o===val?" selected":"")+">"+esc(o)+"</option>"}).join("")}

var data=load(),editing=null,tasks=loadK(),cur=0,who=null;
function load(){
  try{
    var s=sessionStorage.getItem(KEY);
    if(s){var d=JSON.parse(s);if(Array.isArray(d)&&d.length)return d}
  }catch(e){}
  return JSON.parse(JSON.stringify(SEED));
}
function loadK(){try{var s=sessionStorage.getItem(KEY+"-k");if(s)return JSON.parse(s)}catch(e){}return JSON.parse(JSON.stringify(SK))}
function save(){try{sessionStorage.setItem(KEY,JSON.stringify(data));sessionStorage.setItem(KEY+"-k",JSON.stringify(tasks));if(isAdm())push("teachers");push("tasks");}catch(e){alert("មិនអាចរក្សាទុកទិន្នន័យបានទេ!")}}

function gk(id){if(!tasks[id])tasks[id]={lv:D2.slice(),w:{}};if(!tasks[id].lv||!tasks[id].lv.length)tasks[id].lv=["កម្រិត ១"];return tasks[id]}
function gw(id,m,l){var k=gk(id);if(!k.w[m])k.w[m]=[];if(!k.w[m][l])k.w[m][l]=[0,0,0,0];return k.w[m][l]}
function sm(a){return a.reduce(function(x,y){return x+(+y||0)},0)}
function lt(id,l){var k=gk(id),s=0;for(var m=0;m<11;m++){var r=k.w[m]&&k.w[m][l];if(r)s+=sm(r)}return s}
function tt(id){var s=0;gk(id).lv.forEach(function(_,l){s+=lt(id,l)});return s}
function mt(m){var s=0;data.forEach(function(t){gk(t.id).lv.forEach(function(_,l){var r=gk(t.id).w[m]&&gk(t.id).w[m][l];if(r)s+=sm(r)})});return s}

/* ===== ការផ្ទៀងផ្ទាត់ (Firebase Authentication) =====
   - Login ដោយ "លេខសម្គាល់គ្រូ + លេខសម្ងាត់" (បំលែងជាអ៊ីមែលផ្ទៃក្នុង)
   - តួនាទី (admin/member) និងសិទ្ធិប្រើ (enabled) ទាញពី Firestore: users/{uid}
     ដែលមានតែ Admin ទេអាចសរសេរ (ត្រូវបានបង្ខំដោយ firestore.rules)
   - គ្មានលេខសម្ងាត់ក្នុងទិន្នន័យកម្មវិធីទៀតទេ */
var EMAIL_DOMAIN="bt-teachers.example.com",usersById={},prof=null,unsubs=[],forcePass=false;
function isAdm(){return !!(who&&who.role==="admin")}
function idEmail(id){return String(id).trim().toLowerCase()+"@"+EMAIL_DOMAIN}
function genPw(){
  var c="ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789",a=new Uint32Array(10),s="";
  (window.crypto||window.msCrypto).getRandomValues(a);
  for(var i=0;i<a.length;i++)s+=c[a[i]%c.length];
  return s;
}
function authErr(e){
  var c=(e&&e.code)||"";
  if(c==="auth/too-many-requests")return "ព្យាយាមច្រើនដងពេក សូមរង់ចាំបន្តិចរួចសាកម្ដងទៀត!";
  if(/invalid-credential|user-not-found|wrong-password|invalid-email|invalid-login/.test(c))return "លេខសម្គាល់ ឬលេខសម្ងាត់មិនត្រឹមត្រូវ!";
  if(c==="auth/network-request-failed")return "មិនអាចភ្ជាប់បណ្ដាញបានទេ!";
  if(c==="permission-denied"||c==="firestore/permission-denied")return "គ្មានសិទ្ធិអនុវត្តសកម្មភាពនេះទេ!";
  return "មានបញ្ហា៖ "+(c||(e&&e.message)||e);
}
function updateUserInfo(){
  if(!who)return;
  var role=isAdm()?"អ្នកគ្រប់គ្រង":(who.rl||"សមាជិក"),nm=who.name||who.id;
  var set=function(id,t){var e=$(id);if(e)e.textContent=t};
  set("userInfo",role+" · "+who.id);
  set("dropUserName",nm);set("profileNameDisplay",nm);
  var av=$("profileAvatar");if(av)av.innerHTML=avInner(who.id,nm);
}
function showLogin(){
  who=null;prof=null;stopSync();
  $("appSection").hidden=true;$("loginSection").hidden=false;
}
function doLogout(){
  stopSync();
  var done=function(){try{sessionStorage.clear()}catch(e){}location.reload()};
  if(window.FB&&window.FB.auth)window.FB.signOut(window.FB.auth).then(done,done);else done();
}
function enterApp(user){
  window.FB.getDoc(window.FB.doc(window.db,"users",user.uid)).then(function(sn){
    var p=sn.exists()?sn.data():null;
    if(!p){alert("គណនីនេះមិនទាន់ត្រូវបានកំណត់សិទ្ធិក្នុងប្រព័ន្ធទេ។ សូមទាក់ទងអ្នកគ្រប់គ្រង។");return doLogout()}
    if(p.enabled!==true){alert("គណនីរបស់អ្នកមិនទាន់បើកសិទ្ធិប្រើប្រាស់ទេ។ សូមទាក់ទងអ្នកគ្រប់គ្រង។");return doLogout()}
    prof={uid:user.uid,id:String(p.id||"").toUpperCase(),name:p.name||p.id,role:p.role==="admin"?"admin":"member",mustChange:p.mustChange===true};
    who={id:prof.id,name:prof.name,role:prof.role,rl:""};
    rt=who.id;
    $("loginSection").hidden=true;$("appSection").hidden=false;
    $("add").style.display=isAdm()?"inline-block":"none";
    $("mkAll").style.display=isAdm()?"inline-block":"none";
    updateUserInfo();
    show("p0");
    if(isAdm()){loadUsers().then(function(){render()});migrateLegacy().then(startSync,startSync)}
    else startSync();
    if(prof.mustChange)openPass(true);
  }).catch(function(e){alert(authErr(e));doLogout()});
}
function loadUsers(){
  return window.FB.getDocs(window.FB.collection(window.db,"users")).then(function(qs){
    usersById={};
    qs.forEach(function(d){var v=d.data();if(v&&v.id)usersById[String(v.id).toUpperCase()]={uid:d.id,enabled:v.enabled===true,role:v.role,name:v.name}});
  }).catch(function(e){console.error("users:",e)});
}

$("btnLogin").onclick=function(){
  var id=$("loginId").value.trim().toUpperCase(),pass=$("loginPass").value,btn=$("btnLogin");
  if(!id||!pass){alert("សូមបញ្ចូលលេខសម្គាល់ និងលេខសម្ងាត់!");return}
  btn.disabled=true;
  window.FBREADY.then(function(){return window.FB.signInWithEmailAndPassword(window.FB.auth,idEmail(id),pass)})
    .then(function(){$("loginPass").value=""})
    .catch(function(e){alert(authErr(e))})
    .then(function(){btn.disabled=false});
};
["loginId","loginPass"].forEach(function(i){$(i).onkeydown=function(e){if(e.key==="Enter")$("btnLogin").onclick()}});
$("btnLogout").onclick=doLogout;
window.FBREADY.then(function(){
  window.FB.onAuthStateChanged(window.FB.auth,function(user){if(user)enterApp(user);else showLogin()});
}).catch(function(e){
  console.error(e);$("loginSection").hidden=false;
  alert("មិនអាចផ្ទុក Firebase បានទេ។ សូមពិនិត្យអ៊ីនធឺណិត ហើយបើកគេហទំព័រតាម http(s) (មិនមែនបើកឯកសារដោយចុចពីរដងទេ)។");
});

/* ===== បង្កើតគណនី (Admin) ===== */
function mkAccount(t){
  var pw=genPw();
  return window.FB.createUserWithEmailAndPassword(window.FB.sauth,idEmail(t.id),pw).then(function(cr){
    var uid=cr.user.uid;
    return window.FB.signOut(window.FB.sauth).catch(function(){}).then(function(){
      return window.FB.setDoc(window.FB.doc(window.db,"users",uid),{id:t.id,name:t.name,role:"member",enabled:true,mustChange:true});
    }).then(function(){
      usersById[t.id]={uid:uid,enabled:true,role:"member",name:t.name};
      return{id:t.id,name:t.name,pw:pw};
    });
  });
}
function createAccounts(list){
  if(!isAdm())return;
  list=list.filter(function(t){return !usersById[t.id]});
  if(!list.length){notify("គ្រូទាំងអស់មានគណនីរួចហើយ");return}
  var out=[],errs=[],p=Promise.resolve();
  list.forEach(function(t){
    p=p.then(function(){return mkAccount(t).then(function(r){out.push(r)},function(e){
      errs.push(t.id+" — "+authErr(e)+((e&&e.code==="auth/email-already-in-use")?" (មានគណនីក្នុង Firebase រួចហើយ តែគ្មាន profile។ សូមលុបគណនីនោះក្នុង Firebase Console រួចសាកម្ដងទៀត)":""));
    })});
  });
  p.then(function(){render();showCreds(out,errs)});
}
function showCreds(out,errs){
  var t="";
  out.forEach(function(r){t+=r.id+"  |  "+r.name+"  |  "+r.pw+"\n"});
  if(errs.length)t+=(out.length?"\n":"")+"⚠️ មិនបានបង្កើត៖\n"+errs.join("\n")+"\n";
  $("credsT").value=t;$("dlgCreds").showModal();
}
$("mkAll").onclick=function(){if(isAdm())createAccounts(data)};
$("credsClose").onclick=function(){$("credsT").value="";$("dlgCreds").close()};
$("credsCopy").onclick=function(){
  var ta=$("credsT");ta.select();
  try{if(navigator.clipboard)navigator.clipboard.writeText(ta.value);else document.execCommand("copy");notify("បានចម្លងរួចរាល់")}catch(e){notify("សូមជ្រើសអត្ថបទ រួចចម្លងដោយដៃ")}
};
function setEnabled(id,el){
  var u=usersById[id];
  if(!u){el.checked=!el.checked;return}
  if(id===who.id){alert("មិនអាចបិទគណនីខ្លួនឯងបានទេ!");el.checked=true;return}
  var on=el.checked;
  window.FB.updateDoc(window.FB.doc(window.db,"users",u.uid),{enabled:on}).then(function(){
    u.enabled=on;data.forEach(function(t){if(t.id===id)t.en=on});
    save();render();notify(on?"បានបើកសិទ្ធិឱ្យប្រើ":"បានបិទសិទ្ធិ");
  }).catch(function(e){el.checked=!on;alert(authErr(e))});
}
function disableAccount(id){
  var u=usersById[id];if(!u)return;
  window.FB.updateDoc(window.FB.doc(window.db,"users",u.uid),{enabled:false}).then(function(){u.enabled=false}).catch(function(e){console.error(e)});
}

/* ===== ប្ដូរលេខសម្ងាត់ (ត្រូវបញ្ជាក់លេខចាស់ ហើយអប្បបរមា ៨ តួ) ===== */
function openPass(force){
  forcePass=!!force;
  ["oldPass","newPass","confPass"].forEach(function(i){$(i).value=""});
  $("cxPass").hidden=forcePass;$("passNote").hidden=!forcePass;
  $("dlgPass").showModal();
}
$("btnPass").onclick=function(){openPass(false)};
$("cxPass").onclick=function(){$("dlgPass").close()};
$("dlgPass").addEventListener("cancel",function(e){if(forcePass)e.preventDefault()});
$("fPass").onsubmit=function(e){
  e.preventDefault();
  var oldP=$("oldPass").value,newP=$("newPass").value,confP=$("confPass").value;
  if(newP.length<8){alert("លេខសម្ងាត់ថ្មីត្រូវមានយ៉ាងតិច ៨ តួ!");return}
  if(newP.toUpperCase()===who.id){alert("លេខសម្ងាត់មិនត្រូវដូចលេខសម្គាល់ទេ!");return}
  if(newP===oldP){alert("លេខសម្ងាត់ថ្មីត្រូវខុសពីលេខសម្ងាត់បច្ចុប្បន្ន!");return}
  if(newP!==confP){alert("ការបញ្ជាក់លេខសម្ងាត់ថ្មីមិនដូចគ្នាទេ!");return}
  var u=window.FB.auth.currentUser;
  window.FB.reauthenticateWithCredential(u,window.FB.EmailAuthProvider.credential(u.email,oldP))
    .then(function(){return window.FB.updatePassword(u,newP)})
    .then(function(){return(prof&&prof.mustChange)?window.FB.updateDoc(window.FB.doc(window.db,"users",prof.uid),{mustChange:false}):null})
    .then(function(){if(prof)prof.mustChange=false;forcePass=false;$("dlgPass").close();notify("បានប្ដូរលេខសម្ងាត់ផ្ទាល់ខ្លួនជោគជ័យ!")})
    .catch(function(e){alert(/invalid-credential|wrong-password/.test((e&&e.code)||"")?"លេខសម្ងាត់បច្ចុប្បន្នមិនត្រឹមត្រូវ!":authErr(e))});
};

/* ផ្ទាំងទី ១៖ ទិន្នន័យគ្រូ */
function accCell(t){
  if(isAdm()){
    var u=usersById[t.id];
    if(!u)return "<button type=button class=sm-btn data-mk='"+esc(t.id)+"'>+ បង្កើតគណនី</button>";
    var on=u.enabled===true;
    return "<label style='display:flex;gap:6px;align-items:center'><input type=checkbox class=chk data-en='"+esc(t.id)+"'"+(on?" checked":"")+(t.id===who.id?" disabled":"")+"> "+(on?"បានបើក":"មិនទាន់បើក")+"</label>";
  }
  return t.en===false?"⛔ មិនទាន់បើក":"✅ បានបើក";
}

function render(){
  var q=$("q").value.trim().toLowerCase(),fs=$("fs").value;
  var rows=data.filter(function(t){return(!fs||t.stt===fs)&&(!q||[t.id,t.name,t.cl,t.ph,t.ad,t.sub].join(" ").toLowerCase().indexOf(q)>-1)});
  var isOwner = (isAdm());
  $("tb").innerHTML=rows.length?rows.map(function(t0){var t=tinfo(t0);
    var c=t.stt==="កំពុងបម្រើការងារ"?"a":t.stt==="ច្បាប់ឈប់សម្រាក"?"l":"s";
    return"<tr><td>"+esc(t.id)+"</td><td class=nm><span class=nmw>"+avHtml(t.id,t.name,30)+esc(t.name)+"</span></td><td><select class=tsel data-rl='"+esc(t.id)+"' "+(isOwner?"":"disabled")+">"+selOpts(RL,t.rl||"សមាជិក")+"</select></td><td>"+esc(t.g)+"</td><td>"+fd(t.dob)+"</td><td>"+esc(t.ph)+"<br><span style='color:var(--mute)'>"+esc(t.ad)+"</span></td><td>"+(t.cl||"").split(",").filter(function(x){return x.trim()}).map(function(x){return"<span class=tag>"+esc(x.trim())+"</span>"}).join("")+"</td><td><select class=tsel data-dg='"+esc(t.id)+"' "+(isOwner?"":"disabled")+">"+selOpts(DG,t.deg||DG[0])+"</select></td><td>"+fd(t.sd)+"</td><td><span class='st "+c+"'>"+esc(t.stt)+"</span></td><td>"+accCell(t)+"</td><td class=acts><button data-e='"+esc(t.id)+"'>កែប្រែ</button> "+(isOwner?"<button class=danger data-d='"+esc(t.id)+"'>លុប</button>":"")+"</td></tr>"
  }).join(""):"<tr><td colspan=12 class=empty>រកមិនឃើញទិន្នន័យ។</td></tr>";
  var m=data.filter(function(t){return t.g==="ប្រុស"}).length,a=data.filter(function(t){return t.stt==="កំពុងបម្រើការងារ"}).length;
  $("stats").innerHTML=[["គ្រូសរុប",data.length],["កំពុងបម្រើការងារ",a],["គ្រូប្រុស",m],["គ្រូស្រី",data.filter(function(t){return t.g==="ស្រី"}).length]].map(function(x){return"<div class=stat><b>"+x[1]+"</b><span>"+x[0]+"</span></div>"}).join("");
}

function nextId(){
  var max=0;
  data.forEach(function(t){var m=String(t.id).match(/^T(\d+)$/i);if(m&&+m[1]>max)max=+m[1]});
  return"T"+String(max+1).padStart(3,"0");
}

function openForm(t){
  editing=t?t.id:null;
  $("ft").textContent=t?"កែប្រែព័ត៌មានគ្រូ":"បន្ថែមគ្រូថ្មី";
  var n=t||{id:nextId(),name:"",g:"ប្រុស",dob:"",ph:"",ad:"",sub:"គណិតវិទ្យា",deg:"គ្រូបង្រៀនកម្រិតឧត្តម",cl:"",sd:"",stt:"កំពុងបម្រើការងារ",nt:"",rl:"សមាជិក",en:true};
  ["id","name","g","dob","ph","ad","sub","deg","cl","sd","stt","nt","rl"].forEach(function(k){var v=n[k]||(k==="rl"?"សមាជិក":"");if(k==="deg"&&v&&![].some.call($(k).options,function(o){return o.value===v})){$(k).add(new Option(v,v))}$(k).value=v});
  $("id").readOnly=!!t;
  $("dlg").showModal();
}

$("add").onclick=function(){
  if(who && !isAdm()) { alert("មានតែអ្នកគ្រប់គ្រង (Admin) ទេដែលមានសិទ្ធិបន្ថែមគ្រូថ្មី!"); return; }
  openForm();
};
$("cx").onclick=function(){$("dlg").close()};
$("q").oninput=render;$("fs").onchange=render;

$("f").onsubmit=function(e){
  e.preventDefault();
  var isNewT=(editing===null);
  var o={};["id","name","g","dob","ph","ad","sub","deg","cl","sd","stt","nt","rl"].forEach(function(k){o[k]=$(k).value.trim()});
  if(editing===null){o.id=o.id.toUpperCase();if(!/^[A-Z0-9_-]{1,20}$/.test(o.id)){alert("លេខសម្គាល់ត្រូវជាអក្សរឡាតាំង/លេខ ១–២០ តួ (ឧ. T009)");return}}
  if(editing===null&&data.some(function(t){return t.id.toLowerCase()===o.id.toLowerCase()})){
    alert("លេខសម្គាល់ «"+o.id+"» មានរួចហើយ សូមប្តូរលេខសម្គាល់ផ្សេង។");return;
  }
  if(editing!==null){
    var old = data.find(t => t.id === editing);
    o.en = old ? old.en : true;
    data=data.map(function(t){return t.id===editing?Object.assign({},t,o):t});
  }else{
    o.en = true;
    data.push(o);
  }
  save();$("dlg").close();render();notify("រក្សាទុកព័ត៌មានគ្រូរួចរាល់!");if(isNewT)createAccounts([o]);
};

$("tb").onclick=function(e){
  var b=e.target.closest("button");if(!b)return;
  if(b.dataset.mk){if(!isAdm())return;createAccounts(data.filter(function(x){return x.id===b.dataset.mk}));return}
  if(b.dataset.e){
    var t = data.find(x => x.id === b.dataset.e);
    if(!isAdm()) { alert("មានតែអ្នកគ្រប់គ្រង (Admin) ទេដែលអាចកែប្រែព័ត៌មានគ្រូ!"); return; }
    openForm(t);
  }
  if(b.dataset.d){
    if(!isAdm()) { alert("មានតែអ្នកគ្រប់គ្រង (Admin) ទេដែលមានសិទ្ធិលុបទិន្នន័យ!"); return; }
    var t=data.filter(function(x){return x.id===b.dataset.d})[0];
    if(t&&t.id===who.id){alert("មិនអាចលុបគណនីខ្លួនឯងបានទេ!");return}
    if(t&&confirm("តើអ្នកពិតជាចង់លុបគ្រូឈ្មោះ «"+t.name+"» មែនទេ?")){
      disableAccount(b.dataset.d);
      data=data.filter(function(x){return x.id!==b.dataset.d});
      delete tasks[b.dataset.d];
      if(rs&&rs.c)delete rs.c[b.dataset.d];
      save();savR();render();notify("បានលុបទិន្នន័យគ្រូរួចរាល់!");
    }
  }
};

$("tb").onchange=function(e){
  var d=e.target.dataset,v=e.target.value;
  if(d.en!=null){
    if(!isAdm()){ alert("មានតែអ្នកគ្រប់គ្រង (Admin) ទេដែលអាចប្ដូរសិទ្ធិប្រើប្រាស់!"); e.target.checked = !e.target.checked; return; }
    setEnabled(d.en,e.target);
  }else if(d.rl!=null||d.dg!=null){
    if(!isAdm()){ alert("មានតែអ្នកគ្រប់គ្រង (Admin) ទេដែលអាចកែប្រែតួនាទី!"); render(); return; }
    var id=d.rl!=null?d.rl:d.dg;
    data.forEach(function(t){if(t.id===id){if(d.rl!=null) t.rl=v; else t.deg=v}});
    save(); render(); notify("បានកែប្រែរួចរាល់");
  }
};

function dlCSV(rows,fname){
  var csv=rows.map(function(r){return r.map(function(v){return'"'+csvSafe(v).replace(/"/g,'""')+'"'}).join(",")}).join("\r\n");
  var a=document.createElement("a");
  a.href=URL.createObjectURL(new Blob(["\ufeff"+csv],{type:"text/csv;charset=utf-8"}));
  a.download=fname;document.body.appendChild(a);a.click();a.remove();
}

$("exp").onclick=function(){
  var h=["លេខសម្គាល់","ឈ្មោះ","តួនាទី","ភេទ","ថ្ងៃខែឆ្នាំកំណើត","ទូរស័ព្ទ","អាសយដ្ឋាន","មុខវិជ្ជា","ថ្នាក់បង្រៀន","កម្រិតវប្បធម៌","ចូលបម្រើការងារ","ស្ថានភាព","កំណត់សម្គាល់"];
  dlCSV([h].concat(data.map(function(t){return[t.id,t.name,t.rl||"សមាជិក",t.g,fd(t.dob),t.ph,t.ad,t.sub,t.cl,t.deg,fd(t.sd),t.stt,t.nt]})),"teachers.csv");
};

/* ផ្ទាំងទី ២៖ ចំនួនកិច្ចតែងការ */
function lvop(v){
  var o=["<option value=''>— ជ្រើសរើស —</option>"];
  ["7","8","9","10","11","12","កម្រិត ១","កម្រិត ២"].forEach(function(x){o.push("<option"+(x===v?" selected":"")+">"+x+"</option>")});
  if(v&&["7","8","9","10","11","12","កម្រិត ១","កម្រិត ២"].indexOf(v)<0)o.push("<option selected>"+esc(v)+"</option>");
  return o.join("");
}

function renderK(f){
  var p=f&&document.activeElement&&document.activeElement.dataset.p;
  var b="",cs=[0,0,0,0],all=0;
  data.forEach(function(t){
    var k=gk(t.id);
    k.lv.forEach(function(lv,l){
      var w=gw(t.id,cur,l);
      w.forEach(function(v,i){cs[i]+=+v||0});
      var isMe = (who && who.id === t.id);
      var isAdmin = (isAdm());
      var canEdit = (isAdmin || isMe);
      var btns=(canEdit?"<button type=button class=sm-btn data-kl='add|"+t.id+"' title='បន្ថែមកម្រិតថ្នាក់'>+</button>"+(k.lv.length>1?"<button type=button class='sm-btn danger' data-kl='del|"+t.id+"' title='លុបកម្រិតថ្នាក់ចុងក្រោយ'>−</button>":""):"");
      b+="<tr>"+(l?"":"<td class=nm rowspan="+k.lv.length+">"+esc(t.name)+"<div style='margin-top:4px'>"+btns+"</div></td>")+
        "<td><select class=lv aria-label='កម្រិតថ្នាក់' data-p='"+t.id+"|"+l+"|L' "+(canEdit?"":"disabled")+">"+lvop(lv)+"</select></td>"+
        w.map(function(v,i){return"<td><input class=n type=number min=0 aria-label='"+WK[i]+"' data-p='"+t.id+"|"+l+"|"+i+"' value='"+(v||"")+"' "+(canEdit?"":"readonly")+"></td>"}).join("")+
        "<td id='km-"+t.id+"-"+l+"' style='font-weight:700'>"+sm(w)+"</td><td id='kt-"+t.id+"-"+l+"'>"+lt(t.id,l)+"</td></tr>";
    });
  });
  for(var m=0;m<11;m++)all+=mt(m);
  $("kt").innerHTML="<thead><tr><th>ឈ្មោះសមាជិក</th><th>កម្រិតថ្នាក់</th>"+WK.map(function(x){return"<th>"+x+"</th>"}).join("")+"<th>សរុបខែ</th><th>សរុបទាំងអស់</th></tr></thead><tbody>"+b+"<tr class=tr id='ktr-foot'><td colspan=2>សរុប (ខែ"+MK[cur]+")</td>"+cs.map(function(c){return"<td>"+c+"</td>"}).join("")+"<td>"+mt(cur)+"</td><td>"+all+"</td></tr></tbody>";
  if(p){var e=$("kt").querySelector("[data-p='"+p+"']");if(e)e.focus()}
}

function renderS(){
  var tot=0,rows=data.map(function(t){var s=tt(t.id);tot+=s;return{n:t.name,s:s}});
  rows.sort(function(a,b){return b.s-a.s});
  var so=rows.map(function(r){return r.s});
  $("sm").innerHTML="<thead><tr><th>ចំណាត់ថ្នាក់</th><th>ឈ្មោះសមាជិក</th><th>កិច្ចតែងការសរុប</th><th>ភាគរយ</th></tr></thead><tbody>"+rows.map(function(r){
    var pc=tot?r.s/tot*100:0;
    return"<tr><td><b>"+(tot?so.indexOf(r.s)+1:"-")+"</b></td><td class=nm>"+esc(r.n)+"</td><td><b>"+r.s+"</b></td><td><span class=pb><i style='width:"+pc+"%'></i></span> "+pc.toFixed(1)+"%</td></tr>";
  }).join("")+"<tr class=tr><td></td><td>សរុបរួម</td><td>"+tot+"</td><td>100%</td></tr></tbody>";
  $("mm").innerHTML="<thead><tr><th>ខែ</th><th>សរុបប្រចាំខែ</th></tr></thead><tbody>"+MK.map(function(m,i){return"<tr><td>"+m+"</td><td><b>"+mt(i)+"</b></td></tr>"}).join("")+"</tbody>";
}

/* បោះពុម្ពរបាយការណ៍ចំនួនកិច្ចតែងការប្រចាំខែ · ជើងក្រោមតាមគម្រូ Workplan */
function kPrintHTML(){
  var X=window.SCHX,y0=parseInt(syStart()),yr=cur<3?y0:y0+1,cs=[0,0,0,0],ga=0,b="";
  function nc(v,c){v=+v||0;return"<td class='"+(c||"")+(v?"":" z")+"'>"+kn(v)+"</td>"}
  data.forEach(function(t,ti){
    var k=gk(t.id);b+="<tbody class="+(ti%2?"ev":"od")+">";
    k.lv.forEach(function(lv,l){
      var w=gw(t.id,cur,l),a=lt(t.id,l);w.forEach(function(v,i){cs[i]+=+v||0});ga+=a;
      b+="<tr>"+(l?"":"<td rowspan="+k.lv.length+" class=no>"+kn(ti+1)+"</td><td rowspan="+k.lv.length+" class=nm>"+esc(t.name)+"</td>")+"<td class=lv>"+esc(kn(lv))+"</td>"+w.map(function(v){return nc(v)}).join("")+nc(sm(w),"mt")+nc(a,"at")+"</tr>";
    });
    b+="</tbody>";
  });
  return"<div class='pg cxp'>"+
   "<div class=cxh><img src='"+((document.querySelector(".brand-logo")||{}).src||LOGO)+"' class='cxlogo kplogo' alt=''><div class=cxt><div class=moul style='font-size:12pt'>វិទ្យាល័យបឹងត្របែក</div><div style='font-size:10.5pt;margin:2px 0 4px'>សាលារៀនជំនាន់ថ្មី (NGS) · ក្រុមបច្ចេកទេសគណិតវិទ្យា</div>"+
    "<div class=moul style='font-size:13pt'>របាយការណ៍ចំនួនកិច្ចតែងការ</div><div class=cxper>ខែ"+esc(MK[cur])+" ឆ្នាំ"+kn(yr)+"</div></div></div>"+
   "<table class='cxg kpg'><colgroup><col style='width:6%'><col style='width:22%'><col style='width:11%'><col span=4 style='width:9%'><col span=2 style='width:12%'></colgroup>"+
   "<thead><tr><th>ល.រ</th><th>ឈ្មោះសមាជិក</th><th>កម្រិតថ្នាក់</th>"+WK.map(function(x){return"<th>"+x+"</th>"}).join("")+"<th>សរុបខែ</th><th>សរុបទាំងអស់</th></tr></thead>"+b+
   "<tfoot><tr><td colspan=3>សរុបរួម</td>"+cs.map(function(c){return"<td>"+kn(c)+"</td>"}).join("")+"<td>"+kn(sm(cs))+"</td><td>"+kn(ga)+"</td></tr></tfoot></table>"+
   wpFoot(who.id,who.name)+"</div>";
}
/* ជើងក្រោមតាមគម្រូ Workplan៖ ឆ្វេង = គណៈគ្រប់គ្រង · ស្ដាំ = ថ្ងៃចន្ទគតិ + ទីកន្លែង/ថ្ងៃទី + ហត្ថលេខា និងឈ្មោះ */
function wpFoot(id,name,lbl){
  var X=window.SCHX,tdy=new Date(),wg="ថ្ងៃទី "+kn(tdy.getDate())+" ខែ "+M[tdy.getMonth()]+" ឆ្នាំ"+kn(tdy.getFullYear());
  var wl=window.KhCal?KhCal.fmt(tdy.getFullYear(),tdy.getMonth()+1,tdy.getDate()):"",sig=X?X.getSig(id):"";
  return"<div class=cxf><div class=moul style='font-size:10.5pt;line-height:1.7'>បានឃើញ និងត្រួតពិនិត្យ<br>ជ.គណៈគ្រប់គ្រងសាលារៀនជំនាន់ថ្មី</div>"+
   "<div class=cxr>"+(wl?"<div class=lu>"+esc(wl)+"</div>":"")+"<div class=gd>រាជធានីភ្នំពេញ "+esc(wg)+"</div><div class=sn>"+esc(lbl||"ហត្ថលេខា និងឈ្មោះ")+"</div>"+
   "<div class=sb>"+(sig?"<img src='"+sig+"' class=sgi alt=''>":"<span style='width:30mm;display:inline-block'></span>")+"<b>"+esc(name||"")+"</b></div></div></div>";
}
$("kpr").onclick=function(){var X=window.SCHX;X.fontsOk().then(function(){X.doPrintNow(kPrintHTML())})};
$("mo").innerHTML=MK.map(function(m,i){return"<option value="+i+">"+m+"</option>"}).join("");
$("mo").onchange=function(){cur=+this.value;renderK()};

$("kt").onclick=function(e){
  var b=e.target.closest("button[data-kl]");if(!b)return;
  var a=b.dataset.kl.split("|"),id=a[1];
  if(!isAdm() && who.id !== id) { alert("លោកគ្រូអាចកែប្រែបានតែកិច្ចតែងការផ្ទាល់ខ្លួនប៉ុណ្ណោះ!"); return; }
  var k=gk(id);
  if(a[0]==="add"){k.lv.push("10")}
  else if(a[0]==="del"&&k.lv.length>1){
    var idx=k.lv.length-1;k.lv.pop();
    for(var m in k.w)if(k.w[m])k.w[m].splice(idx,1);
  }
  save();renderK();renderS();
};

$("kt").oninput=function(e){
  var p=e.target.dataset.p;if(!p)return;
  var a=p.split("|"),id=a[0],l=+a[1];
  if(!isAdm() && who.id !== id) { alert("លោកគ្រូអាចកែប្រែបានតែកិច្ចតែងការផ្ទាល់ខ្លួនប៉ុណ្ណោះ!"); renderK(); return; }
  if(a[2]==="L"){gk(id).lv[l]=e.target.value;save();return}
  gw(id,cur,l)[+a[2]]=Math.max(0,+e.target.value||0);
  save();
  var w=gw(id,cur,l);
  var km=$("km-"+id+"-"+l),ktEl=$("kt-"+id+"-"+l);
  if(km)km.textContent=sm(w);
  if(ktEl)ktEl.textContent=lt(id,l);
  var cs=[0,0,0,0],all=0;
  data.forEach(function(t){gk(t.id).lv.forEach(function(_,li){var rw=gw(t.id,cur,li);rw.forEach(function(v,i){cs[i]+=+v||0})})});
  for(var m=0;m<11;m++)all+=mt(m);
  var ft=$("ktr-foot");
  if(ft)ft.innerHTML="<td colspan=2>សរុប (ខែ"+MK[cur]+")</td>"+cs.map(function(c){return"<td>"+c+"</td>"}).join("")+"<td>"+mt(cur)+"</td><td>"+all+"</td>";
  renderS();
};

$("kexp").onclick=function(){
  var rows=[["ឈ្មោះ","កម្រិតថ្នាក់"].concat(MK).concat(["សរុបទាំងអស់"])];
  data.forEach(function(t){var k=gk(t.id);k.lv.forEach(function(lv,l){rows.push([t.name,lv].concat(MK.map(function(_,m){var r=k.w[m]&&k.w[m][l];return r?sm(r):0})).concat([lt(t.id,l)]))})});
  dlCSV(rows,"lesson-plans.csv");
};

/* ផ្ទាំងទី ៣៖ ថ្នាក់និទស្សន៍ */
var DY=["ច័ន្ទ","អង្គារ","ពុធ","ព្រហស្បតិ៍","សុក្រ"],XM=[11,12,1,2,3,4,5,6,7,8,9,10],ex=loadX();
function loadX(){
  try{var s=sessionStorage.getItem(KEY+"-x");if(s){var o=JSON.parse(s);while(o.r.length<12)o.r.push({t:["T001","T002","T003","T004"][o.r.length-8]||"T001",tm:"",sc:"",nt:""});return o}}catch(e){}
  return{d:2,w:0,y:2026,r:["T001","T002","T003","T004","T005","T006","T007","T008","T001","T002","T003","T004"].map(function(i){return{t:i,tm:"",sc:"",nt:""}})}}
function savX(){try{sessionStorage.setItem(KEY+"-x",JSON.stringify(ex));push("ex");}catch(e){}}
function xm(i){var r=ex.r[i];if(r.dt){var p=r.dt.split("-");return +p[1]}return r.m||XM[i]}
function xyr(m){return ex.y+(m>=11?0:1)}
function iso(d){return d.getFullYear()+"-"+("0"+(d.getMonth()+1)).slice(-2)+"-"+("0"+d.getDate()).slice(-2)}
function xdef(i){var m=xm(i),y=xyr(m),w=new Date(y,m-1,1).getDay()||7;return new Date(y,m-1,1+((ex.d+1-w)%7+7)%7+7*ex.w)}
function xdate(i){var r=ex.r[i];if(r.dt){var p=r.dt.split("-"),d=new Date(+p[0],+p[1]-1,+p[2]);if(!isNaN(d))return d}return xdef(i)}
function pd(d){function z(n){return(n<10?"0":"")+n}return z(d.getDate())+"/"+z(d.getMonth()+1)+"/"+z(d.getFullYear()%100)}
function tn(id){var t=data.filter(function(x){return x.id===id})[0];return t?t.name:""}

var CL="7NGS-B,7NGS-C,7NGS-P,7NGS-BO,7NGS-CO,7NGS-PO,8NGS-B,8NGS-C,8NGS-P1,8NGS-P2,8NGS-P3,8NGS-BO,9NGS-B1,9NGS-B2,9NGS-C1,9NGS-C2,9NGS-P1,9NGS-P2,9NGS-P3,9NGS-BO,9NGS-CO,10NGS-B,10NGS-C,10NGS-P1,10NGS-P2,10NGS-P3,11NGS-C,11NGS-P,12NGS-A,12NGS-B,10GT-Ele/Electro-Y1,10GT-ICT-Y1,11GT-ICT-Y2".split(",").map(function(c){return"M-"+c});
function sop(v){var o=["<option value=''>— ជ្រើសរើសថ្នាក់ —</option>"];CL.forEach(function(x){o.push("<option"+(x===v?" selected":"")+">"+x+"</option>")});if(v&&CL.indexOf(v)<0)o.push("<option selected>"+esc(v)+"</option>");return o.join("")}
var TM=["7:30 - 8:15","8:20 - 9:05","9:25 - 10:10","10:15 - 11:00","12:30 - 13:15","13:20 - 14:05","14:25 - 15:10","15:15 - 16:00","16:10 - 16:55","17:10 - 17:55","18:10 - 18:55"].map(function(t,i){return"ម៉ោង "+(i+1)+" ("+t+")"});
function tmop(v){var o=["<option value=''>— ជ្រើសរើសម៉ោង —</option>"];TM.forEach(function(x){o.push("<option"+(x===v?" selected":"")+">"+x+"</option>")});if(v&&TM.indexOf(v)<0)o.push("<option selected>"+esc(v)+"</option>");return o.join("")}
function mop(s){return XM.map(function(m){return"<option value="+m+(m===s?" selected":"")+">"+M[m-1]+" "+xyr(m)+"</option>"}).join("")}

function renderX(){
  $("xd").innerHTML=DY.map(function(d,i){return"<option value="+i+(i===ex.d?" selected":"")+">"+d+"</option>"}).join("");
  $("xw").innerHTML=[0,1,2,3].map(function(i){return"<option value="+i+(i===ex.w?" selected":"")+">សប្ដាហ៍ទី"+"១២៣៤"[i]+"</option>"}).join("");
  $("xy").value=ex.y;
  function op(s){return data.map(function(t){return"<option value='"+esc(t.id)+"'"+(t.id===s?" selected":"")+">"+esc(t.name)+"</option>"}).join("")}
  var isAdmin = (isAdm());
  $("xt").innerHTML="<thead><tr><th>ល.រ</th><th>ខែ</th><th>គ្រូបង្រៀន</th><th>កាលបរិច្ឆេទ</th><th>ម៉ោង</th><th>មុខវិជ្ជា / ថ្នាក់</th><th>កំណត់ចំណាំ</th></tr></thead><tbody>"+ex.r.map(function(r,i){
    var canEdit = (isAdmin || (who && who.id === r.t));
    return"<tr><td>"+(i+1)+"</td><td><select data-x='"+i+"|m' aria-label='ខែ' "+(canEdit?"":"disabled")+">"+mop(xm(i))+"</select></td><td><select data-x='"+i+"|t' aria-label='គ្រូបង្រៀន' "+(isAdmin?"":"disabled")+">"+op(r.t)+"</select></td><td><input type=date data-x='"+i+"|dt' aria-label='កាលបរិច្ឆេទ' value='"+iso(xdate(i))+"' "+(canEdit?"":"readonly")+"></td><td><select data-x='"+i+"|tm' aria-label='ម៉ោង' "+(canEdit?"":"disabled")+">"+tmop(r.tm)+"</select></td><td><select data-x='"+i+"|sc' aria-label='ថ្នាក់' "+(canEdit?"":"disabled")+">"+sop(r.sc)+"</select></td><td><input data-x='"+i+"|nt' value='"+esc(r.nt)+"' placeholder='កំណត់ចំណាំ...' "+(canEdit?"":"readonly")+"></td></tr>";
  }).join("")+"</tbody>";
  $("xs").innerHTML="<thead><tr><th>គ្រូបង្រៀន</th>"+ex.r.map(function(r,i){return"<th>"+M[xm(i)-1]+"</th>"}).join("")+"<th>សរុប</th></tr></thead><tbody>"+data.map(function(t){
    var c=0,cl=ex.r.map(function(r,i){if(r.t===t.id){c++;return"<td class=hit>"+pd(xdate(i))+"</td>"}return"<td></td>"}).join("");
    return"<tr><td class=nm>"+esc(t.name)+"</td>"+cl+"<td><b>"+c+"</b></td></tr>";
  }).join("")+"</tbody>";
}

$("xt").oninput=function(e){
  var p=e.target.dataset.x;if(!p)return;
  var a=p.split("|"),r=ex.r[+a[0]];
  var isAdmin = (isAdm());
  if(!isAdmin && who.id !== r.t) { alert("លោកគ្រូអាចកែប្រែបានតែកាលវិភាគផ្ទាល់ខ្លួនប៉ុណ្ណោះ!"); renderX(); return; }
  r[a[1]]=a[1]==="m"?+e.target.value:e.target.value;
  if(a[1]==="m")r.dt="";
  savX();if(e.target.tagName==="SELECT"||e.target.type==="date")renderX();
};
$("xd").onchange=function(){
  var isAdmin = (isAdm());
  if(!isAdmin) { alert("មានតែអ្នកគ្រប់គ្រង (Admin) ទេដែលអាចប្ដូរការកំណត់ថ្ងៃប្រចាំខែ!"); renderX(); return; }
  ex.d=+this.value;ex.r.forEach(function(r){r.dt=""});savX();renderX();
};
$("xw").onchange=function(){
  var isAdmin = (isAdm());
  if(!isAdmin) { alert("មានតែអ្នកគ្រប់គ្រង (Admin) ទេដែលអាចប្ដូរសប្ដាហ៍!"); renderX(); return; }
  ex.w=+this.value;ex.r.forEach(function(r){r.dt=""});savX();renderX();
};
$("xy").onchange=function(){
  var isAdmin = (isAdm());
  if(!isAdmin) { alert("មានតែអ្នកគ្រប់គ្រង (Admin) ទេដែលអាចប្ដូរឆ្នាំ!"); renderX(); return; }
  ex.y=+this.value||2026;ex.r.forEach(function(r){r.dt=""});savX();renderX();
};
$("xexp").onclick=function(){
  var rows=[["ល.រ","ខែ","គ្រូបង្រៀន","កាលបរិច្ឆេទ","ម៉ោង","មុខវិជ្ជា / ថ្នាក់","កំណត់ចំណាំ"]].concat(ex.r.map(function(r,i){return[i+1,M[xm(i)-1],tn(r.t),pd(xdate(i)),r.tm,r.sc,r.nt]}));
  dlCSV(rows,"demonstration-class.csv");
};

/* ផ្ទាំងទី ៤៖ លទ្ធផលសិក្សា */
var RK=KEY+"-r",SM1=["តុលា","វិច្ឆិកា","ធ្នូ","មករា","កុម្ភៈ","ប្រឡងឆមាស"],SM2=["មីនា","មេសា","ឧសភា","មិថុនា","ប្រឡងឆមាស"],rs=loadR(),rt="",rc=0,rp=1;
function loadR(){
  try{var s=sessionStorage.getItem(RK);if(s)return JSON.parse(s)}catch(e){}
  return{c:{},mx:{7:100,8:100,9:100,10:150,11:125,12:125},pc:[90,80,70,60,50]};
}
function savR(){try{sessionStorage.setItem(RK,JSON.stringify(rs));push("rs");}catch(e){}}
function ss(a){return a.reduce(function(x,y){return x+(+y||0)},0)}
/* ===== ជំនួយ៖ ជួរដែលប្រើក្នុងថ្នាក់នីមួយៗ, ការគណនានិទ្ទេស, ចំណាត់ថ្នាក់, អវត្តមាន ===== */
function inf(){var i=rs.info||{};return{school:i.school||"វិទ្យាល័យបឹងត្របែក",year:i.year||""}}
function ccf(c,p){return(c&&c.cf&&c.cf[p])||(p===1?[1,1,1,1,1,1]:[1,1,1,1,1])}
function ac(c,p){var f=ccf(c,p),o=[];for(var i=0;i<f.length;i++)if(f[i])o.push(i);return o}
function sa(s,k,c){var p=k==="a"?1:2;return ac(c,p).reduce(function(x,j){return x+(+s[k][j]||0)},0)}
function fl(s,k,c){var A=ac(c,k==="a"?1:2);return A.length>0&&A.every(function(j){return s[k][j]!==""&&s[k][j]!=null})}
function kn(n){return String(n).replace(/\d/g,function(d){return"០១២៣៤៥៦៧៨៩"[d]})}
function canM(){return !!(who&&(isAdm()||who.id===rt))}
function curCls(){return(rs.c[rt]||[])[rc]}
function gr(sum,cols,c){
  var g=parseInt(c.n),p=sum/((rs.mx[g]||100)*cols)*100,pg=rs.pg&&rs.pg[g];
  var pc=(pg&&pg.length===5&&pg.every(function(x){return x!==""&&x!=null&&!isNaN(+x)}))?pg:rs.pc;
  for(var i=0;i<5;i++)if(p>=+pc[i])return"ABCDE"[i];return"F"}
function gof(s,c,p){
  var n1=ac(c,1).length,n2=ac(c,2).length;
  return p===1?(fl(s,"a",c)?gr(sa(s,"a",c),n1,c):""):p===2?(fl(s,"b",c)?gr(sa(s,"b",c),n2,c):""):(fl(s,"a",c)&&fl(s,"b",c)?gr(sa(s,"a",c)+sa(s,"b",c),n1+n2,c):"")}
function met(s,c,p){if(!gof(s,c,p))return"";return p===1?sa(s,"a",c):p===2?sa(s,"b",c):sa(s,"a",c)+sa(s,"b",c)}
function ranks(c,p){var m=c.st.map(function(s){return met(s,c,p)});return m.map(function(v){if(v==="")return"";var r=1;m.forEach(function(x){if(x!==""&&x>v)r++});return r})}
function nranked(rk){return rk.filter(function(x){return x!==""}).length}
function abr(p){return p===1?[0,4]:p===2?[5,10]:[0,10]}
function abp(s,p){var r=abr(p),e=0,u=0,a=s.ab||{};for(var m=r[0];m<=r[1];m++){var v=a[m];if(v){e+=+v[0]||0;u+=+v[1]||0}}return[e,u]}
function gbadge(g){return g?"<span class='gr-badge gr-"+g+"'>"+g+"</span>":"—"}
function cnt(c,p){var o={A:0,B:0,C:0,D:0,E:0,F:0};c.st.forEach(function(s){var g=gof(s,c,p);if(g)o[g]++});return o}
function crow(l,o){var t=0,G="ABCDEF".split("");G.forEach(function(g){t+=o[g]});return"<tr><td class=nm>"+esc(l)+"</td>"+G.map(function(g){return"<td>"+o[g]+(t?" <span style='color:var(--mute);font-size:.8rem'>("+(o[g]/t*100).toFixed(1)+"%)</span>":"")+"</td>"}).join("")+"<td><b>"+t+"</b></td></tr>"}
function teacherOf(id){return data.filter(function(x){return x.id===id})[0]||{}}

function renderRStats(){
  var cl=rs.c[rt]||[],c=cl[rc];
  var H="<thead><tr><th>រយៈពេល</th>"+"ABCDEF".split("").map(function(g){return"<th>និទ្ទេស "+g+"</th>"}).join("")+"<th>សិស្សសរុប</th></tr></thead>",tot={A:0,B:0,C:0,D:0,E:0,F:0};
  $("rst").innerHTML=H+"<tbody>"+(c?[["ឆមាសទី១",1],["ឆមាសទី២",2],["ប្រចាំឆ្នាំ",3]].map(function(x){return crow(x[0],cnt(c,x[1]))}).join(""):"<tr><td colspan=8 class=empty>គ្មានទិន្នន័យ</td></tr>")+"</tbody>";
  $("rah").textContent="សង្ខេបគ្រប់ថ្នាក់របស់គ្រូ ("+["","ឆមាសទី១","ឆមាសទី២","ប្រចាំឆ្នាំ"][rp]+")";
  $("rall").innerHTML=H.replace("រយៈពេល","ថ្នាក់")+"<tbody>"+(cl.length?cl.map(function(x){var o=cnt(x,rp);for(var g in o)tot[g]+=o[g];return crow(x.n,o)}).join("")+crow("សរុបទាំងអស់",tot):"<tr><td colspan=8 class=empty>គ្មានទិន្នន័យ</td></tr>")+"</tbody>";
}

function clsOpts(cl,cnt){
  var have=cl.map(function(c){return c.n}),add=canM();
  return(cl.length?cl.map(function(c,i){return"<option value="+i+(i===rc?" selected":"")+">"+esc(c.n)+(cnt?" ("+c.st.length+" នាក់)":"")+"</option>"}).join(""):"<option value=''>— "+(add?"ជ្រើសថ្នាក់ដើម្បីបន្ថែម":"គ្មានថ្នាក់")+" —</option>")+
    (add?"<optgroup label='＋ បន្ថែមថ្នាក់ថ្មី (ចុចជ្រើស = បន្ថែមភ្លាម)'>"+CL.map(function(x){return x.slice(2)}).filter(function(n){return have.indexOf(n)<0}).map(function(n){return"<option value='n:"+esc(n)+"'>"+esc(n)+"</option>"}).join("")+"</optgroup>":"");
}
function clsPick(v,fn){
  if(v.slice(0,2)==="n:"){
    if(!canM()){fn();return}
    var n=v.slice(2),l=rs.c[rt]=rs.c[rt]||[],i=l.map(function(c){return c.n}).indexOf(n);
    if(i<0){l.push({n:n,st:[]});i=l.length-1;notify("បានបន្ថែមថ្នាក់ "+n)}
    rc=i;savR();fn();return;
  }
  if(v!==""&&!isNaN(+v))rc=+v;
  fn();
}
var rsort=false;
function renderR(){
  if(!data.some(function(t){return t.id===rt})&&data.length)rt=data[0].id;
  $("rt").innerHTML=data.map(function(t){return"<option value='"+esc(t.id)+"'"+(t.id===rt?" selected":"")+">"+esc(t.name)+"</option>"}).join("");
  var cl=rs.c[rt]||[];if(rc>=cl.length)rc=0;
  var have=cl.map(function(c){return c.n}),canAdd=canM();
  $("rc").innerHTML=(cl.length?cl.map(function(c,i){return"<option value="+i+(i===rc?" selected":"")+">"+esc(c.n)+" ("+c.st.length+" នាក់)</option>"}).join(""):"<option value=''>— "+(canAdd?"ជ្រើសថ្នាក់ដើម្បីបន្ថែម":"គ្មានថ្នាក់")+" —</option>")+
    (canAdd?"<optgroup label='＋ បន្ថែមថ្នាក់ថ្មី (ចុចជ្រើស = បន្ថែមភ្លាម)'>"+CL.map(function(x){return x.slice(2)}).filter(function(n){return have.indexOf(n)<0}).map(function(n){return"<option value='n:"+esc(n)+"'>"+esc(n)+"</option>"}).join("")+"</optgroup>":"");
  $("rp").value=rp;
  if(!$("rn").options.length)$("rn").innerHTML=CL.map(function(c){return"<option>"+c.slice(2)+"</option>"}).join("");

  var isAdmin=(isAdm()),manage=canM();
  ["rac","rdc","ras","rim","rnm"].forEach(function(i){$(i).style.display=manage?"inline-block":"none"});

  var c=cl[rc],b="";
  if(!c){
    $("rtb").innerHTML="<tbody><tr><td class=empty>គ្រូនេះមិនទាន់មានថ្នាក់ទេ។ សូមជ្រើសថ្នាក់ក្នុងប្រអប់ខាងលើ ឬនាំចូលពី Excel។</td></tr></tbody>";
  }else{
    var cols=rp===1?SM1:SM2,k=rp===1?"a":"b",mxScore=rs.mx[parseInt(c.n)]||100,act=rp===3?[]:ac(c,rp),rk=ranks(c,rp);
    var ord=c.st.map(function(_,i){return i});
    if(rsort)ord.sort(function(x,y){var a=rk[x]===""?1e9:rk[x],z=rk[y]===""?1e9:rk[y];return a-z||x-y});
    ord.forEach(function(i){
      var s=c.st[i],t1=sa(s,"a",c),t2=sa(s,"b",c),g=gof(s,c,rp);
      b+="<tr><td>"+(i+1)+"</td><td><input data-r='"+i+"|id' value='"+esc(s.id||"")+"' placeholder='ID' style='width:95px' "+(manage?"":"readonly")+"></td><td><input data-r='"+i+"|n' value='"+esc(s.n)+"' placeholder='ឈ្មោះសិស្ស...' style='min-width:150px' "+(manage?"":"readonly")+"></td>"+
        (rp===3?"<td>"+t1+"</td><td>"+t2+"</td><td><b>"+(t1+t2)+"</b></td><td><b>"+((t1+t2)/2).toFixed(2)+"</b></td>":
        act.map(function(j){return"<td><input class=n type=number min=0 max="+mxScore+" step=any data-r='"+i+"|"+k+"|"+j+"' value='"+s[k][j]+"' "+(manage?"":"readonly")+"></td>"}).join("")+"<td id='rsum-"+i+"' style='font-weight:700'>"+sa(s,k,c)+"</td>")+
        "<td id='rgr-"+i+"'>"+gbadge(g)+"</td><td id='rrk-"+i+"'>"+(rk[i]===""?"—":rk[i])+"</td><td class=acts><button data-rc='"+i+"' title='ប័ណ្ណពិន្ទុ'>🧾 ប័ណ្ណ</button>"+(manage?"<button class=danger data-rd='"+i+"'>លុប</button>":"")+"</td></tr>";
    });
    $("rtb").innerHTML="<thead><tr><th>ល.រ</th><th>លេខសម្គាល់ (ID)</th><th>ឈ្មោះសិស្ស</th>"+(rp===3?"<th>ឆមាសទី១</th><th>ឆមាសទី២</th><th>សរុបពីរឆមាស</th><th>មធ្យមភាគ</th>":act.map(function(j){return"<th>"+cols[j]+" <span style='font-weight:400;font-size:.78rem'>(/"+mxScore+")</span></th>"}).join("")+"<th>សរុប</th>")+"<th>និទ្ទេស</th><th>ចំ.ថ្នាក់</th><th></th></tr></thead><tbody>"+(b||"<tr><td colspan=13 class=empty>មិនទាន់មានឈ្មោះសិស្សទេ។</td></tr>")+"</tbody>";
  }
  $("rso").checked=rsort;
  renderRStats();
  /* ការកំណត់ */
  var h="<p class=note style='margin:0 0 8px'>ភាគរយអប្បបរមា (% នៃពិន្ទុអតិបរមា) សម្រាប់និទ្ទេស A–E (លំនាំដើមគ្រប់ថ្នាក់)៖</p><div class=bar>"+rs.pc.map(function(v,i){return"<label>"+"ABCDE"[i]+" ≥</label><input type=number data-s='p|"+i+"' value='"+v+"' style='flex:0 0 80px;width:80px' "+(isAdmin?"":"disabled")+">"}).join("")+"</div>";
  h+="<p class=note style='margin:8px 0'>ពិន្ទុអតិបរមាក្នុងមួយជួរ តាមកម្រិតថ្នាក់៖</p><div class=bar>"+[7,8,9,10,11,12].map(function(l){return"<label>ថ្នាក់ទី"+l+"</label><input type=number data-s='m|"+l+"' value='"+rs.mx[l]+"' style='flex:0 0 80px;width:80px' "+(isAdmin?"":"disabled")+">"}).join("")+"</div>";
  h+="<p class=note style='margin:8px 0'>ភាគរយនិទ្ទេសផ្សេងសម្រាប់ថ្នាក់ណាមួយ (ទុកទទេ = ប្រើលំនាំដើម)៖</p>"+[7,8,9,10,11,12].map(function(l){var pg=(rs.pg&&rs.pg[l])||[];return"<div class=bar><label style='min-width:70px'>ថ្នាក់ទី"+l+"</label>"+[0,1,2,3,4].map(function(i){return"<input type=number step=any data-s='g|"+l+"|"+i+"' placeholder='"+"ABCDE"[i]+" ≥ "+rs.pc[i]+"' value='"+(pg[i]==null?"":pg[i])+"' style='flex:0 0 90px;width:90px' "+(isAdmin?"":"disabled")+">"}).join("")+"</div>"}).join("");
  if(c){
    h+="<p class=note style='margin:8px 0'>ជួរដែលគិតពិន្ទុសម្រាប់ថ្នាក់ «"+esc(c.n)+"» (ដោះធីកជួរដែលមិនមាន ដូចជាខែកុម្ភៈ ឬខែឧសភា)៖</p>";
    [[1,SM1],[2,SM2]].forEach(function(x){h+="<div class=bar><label style='min-width:70px'>ឆមាសទី"+x[0]+"</label>"+x[1].map(function(n,j){return"<label style='display:flex;gap:4px;align-items:center'><input type=checkbox class=chk data-s='k|"+x[0]+"|"+j+"'"+(ccf(c,x[0])[j]?" checked":"")+(manage?"":" disabled")+"> "+n+"</label>"}).join("")+"</div>"});
  }
  var I=inf();
  h+="<p class=note style='margin:8px 0'>ព័ត៌មានសាលា (សម្រាប់ប័ណ្ណពិន្ទុ និងរបាយការណ៍)៖</p><div class=bar><label>សាលា</label><input data-s='i|school' value='"+esc(I.school)+"' style='flex:1 1 220px' "+(isAdmin?"":"disabled")+"><label>ឆ្នាំសិក្សា</label><input data-s='i|year' value='"+esc(I.year)+"' placeholder='២០២៥-២០២៦' style='flex:0 0 130px;width:130px' "+(isAdmin?"":"disabled")+"></div>";
  $("rset").innerHTML=h;
}

$("rt").onchange=function(){rt=this.value;rc=0;renderR()};
$("rc").onchange=function(){
  var v=this.value;
  if(v.slice(0,2)==="n:"){
    if(!canM()){renderR();return}
    var n=v.slice(2),l=rs.c[rt]=rs.c[rt]||[],i=l.map(function(c){return c.n}).indexOf(n);
    if(i<0){l.push({n:n,st:[]});i=l.length-1;notify("បានបន្ថែមថ្នាក់ "+n)}
    rc=i;savR();renderR();return;
  }
  if(v===""){renderR();return}
  rc=+v;renderR();
};
$("rp").onchange=function(){rp=+this.value;renderR()};
$("rso").onchange=function(){rsort=this.checked;renderR()};
$("rac").onclick=function(){
  if(!canM()){alert("លោកគ្រូអាចបន្ថែមថ្នាក់បានតែលើគណនីផ្ទាល់ខ្លួនប៉ុណ្ណោះ!");return}
  var n=$("rn").value,l=rs.c[rt]=rs.c[rt]||[],i=l.map(function(c){return c.n}).indexOf(n);
  if(i<0){l.push({n:n,st:[]});i=l.length-1;notify("បានបន្ថែមថ្នាក់ "+n)}
  rc=i;savR();renderR();
};
$("rdc").onclick=function(){
  if(!canM()){alert("លោកគ្រូអាចលុបថ្នាក់បានតែលើគណនីផ្ទាល់ខ្លួនប៉ុណ្ណោះ!");return}
  var l=rs.c[rt]||[];
  if(l[rc]&&confirm("តើអ្នកពិតជាចង់លុបថ្នាក់ «"+l[rc].n+"» មែនទេ?")){l.splice(rc,1);rc=0;savR();renderR();notify("បានលុបថ្នាក់រួចរាល់")}
};
$("ras").onclick=function(){
  if(!canM()){alert("លោកគ្រូអាចបន្ថែមសិស្សបានតែលើគណនីផ្ទាល់ខ្លួនប៉ុណ្ណោះ!");return}
  var c=curCls();
  if(!c){alert("សូមបន្ថែមថ្នាក់ជាមុនសិន។");return}
  c.st.push({n:"សិស្ស "+(c.st.length+1),a:["","","","","",""],b:["","","","",""]});
  savR();renderR();
};

/* ការពារការបញ្ចូលពិន្ទុលើសកម្រិតអតិបរមា និងសិទ្ធិ */
function updRanks(c){
  var rk=ranks(c,rp);
  c.st.forEach(function(s,i){var e=$("rrk-"+i);if(e)e.textContent=rk[i]===""?"—":rk[i]});
}
$("rtb").oninput=function(e){
  var p=e.target.dataset.r;if(!p)return;
  if(!canM()){alert("លោកគ្រូមិនមានសិទ្ធិកែប្រែពិន្ទុរបស់គ្រូដទៃទេ!");renderR();return}
  var a=p.split("|"),idx=+a[0],c=curCls(),s=c.st[idx];
  if(a[1]==="n"){s.n=e.target.value;savR();return}
  if(a[1]==="id"){
    s.id=e.target.value.trim();savR();
    if(s.id&&c.st.some(function(x,k){return k!==idx&&String(x.id||"").toLowerCase()===s.id.toLowerCase()}))notify("⚠️ ID «"+s.id+"» ជាន់គ្នានឹងសិស្សផ្សេងក្នុងថ្នាក់នេះ!");
    return;
  }
  var mx=rs.mx[parseInt(c.n)]||100;
  var val=e.target.value;
  if(val!==""&&+val>mx){
    alert("ពិន្ទុមិនអាចធំជាងពិន្ទុអតិបរមា ("+mx+") បានទេ!");
    e.target.value=mx;val=mx;
  }
  var num=val===""?"":Math.min(mx,Math.max(0,+val||0));
  s[a[1]][+a[2]]=num;
  savR();
  var sumEl=$("rsum-"+idx),grEl=$("rgr-"+idx);
  if(sumEl)sumEl.textContent=sa(s,a[1],c);
  if(grEl)grEl.innerHTML=gbadge(gof(s,c,rp));
  updRanks(c);
  renderRStats();
};

$("rtb").onkeydown=function(e){
  var p=e.target.dataset.r;if(!p)return;
  var a=p.split("|");if(a.length<3)return;
  if(e.key==="Enter"||e.key==="ArrowDown"||e.key==="ArrowUp"){
    e.preventDefault();
    var tr=e.target.closest("tr"),nt=e.key==="ArrowUp"?tr.previousElementSibling:tr.nextElementSibling;
    if(nt){var el=nt.querySelector("[data-r$='|"+a[1]+"|"+a[2]+"']");if(el){el.focus();el.select()}}
  }
};

$("rtb").onclick=function(e){
  var b=e.target.closest("button");if(!b)return;
  if(b.dataset.rc!=null){showCards(+b.dataset.rc);return}
  if(b.dataset.rd!=null){
    if(!canM()){alert("លោកគ្រូមិនមានសិទ្ធិលុបសិស្សក្នុងបញ្ជីរបស់គ្រូដទៃទេ!");return}
    var s=curCls().st[+b.dataset.rd];
    if(confirm("តើអ្នកពិតជាចង់លុបឈ្មោះ «"+(s.n||"សិស្សនេះ")+"» មែនទេ?")){
      curCls().st.splice(+b.dataset.rd,1);savR();renderR();
    }
  }
};
$("rset").onchange=function(e){
  var p=e.target.dataset.s;if(!p)return;
  var a=p.split("|"),isAdmin=(isAdm());
  if(a[0]==="k"){
    if(!canM()){alert("គ្មានសិទ្ធិកែប្រែថ្នាក់របស់គ្រូដទៃទេ!");renderR();return}
    var c=curCls();if(!c)return;
    c.cf=c.cf||{1:ccf(c,1).slice(),2:ccf(c,2).slice()};
    c.cf[a[1]][+a[2]]=e.target.checked?1:0;
    if(!c.cf[a[1]].some(Boolean)){c.cf[a[1]][+a[2]]=1;alert("ត្រូវមានយ៉ាងតិច ១ ជួរក្នុងមួយឆមាស!")}
    savR();renderR();notify("បានកែប្រែជួរពិន្ទុរបស់ថ្នាក់");return;
  }
  if(!isAdmin){alert("មានតែអ្នកគ្រប់គ្រង (Admin) ទេដែលអាចកំណត់ស្តង់ដារពិន្ទុទូទៅ!");renderR();return}
  if(a[0]==="g"){
    rs.pg=rs.pg||{};var arr=rs.pg[a[1]]=rs.pg[a[1]]||["","","","",""];
    arr[+a[2]]=e.target.value===""?"":+e.target.value;
    if(arr.every(function(x){return x===""}))delete rs.pg[a[1]];
  }else if(a[0]==="i"){rs.info=rs.info||{};rs.info[a[1]]=e.target.value}
  else{var v=+e.target.value||0;if(a[0]==="p")rs.pc[+a[1]]=v;else rs.mx[a[1]]=v}
  savR();renderR();notify("បានកែប្រែការកំណត់ពិន្ទុ!");
};
$("rex").onclick=function(){
  var c=curCls();if(!c)return;
  var rk1=ranks(c,1),rk2=ranks(c,2),rk3=ranks(c,3);
  var rows=[["ល.រ","ID","ឈ្មោះសិស្ស"].concat(SM1).concat(["សរុបឆមាស១","និទ្ទេសឆមាស១","ចំ.ឆមាស១"]).concat(SM2).concat(["សរុបឆមាស២","និទ្ទេសឆមាស២","ចំ.ឆមាស២","សរុបពីរឆមាស","មធ្យមភាគ","និទ្ទេសប្រចាំឆ្នាំ","ចំ.ប្រចាំឆ្នាំ"])];
  c.st.forEach(function(s,i){var t1=sa(s,"a",c),t2=sa(s,"b",c);rows.push([i+1,s.id||"",s.n].concat(s.a).concat([t1,gof(s,c,1),rk1[i]]).concat(s.b).concat([t2,gof(s,c,2),rk2[i],t1+t2,(t1+t2)/2,gof(s,c,3),rk3[i]]))});
  dlCSV(rows,"results-"+c.n+".csv");
};

/* ===== នាំចូលពិន្ទុពី Excel ===== */
var XLSX_URL="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js",imp=[];
function loadXL(cb){
  if(window.XLSX)return cb();
  var s=document.createElement("script");s.src=XLSX_URL;s.onload=cb;
  s.onerror=function(){alert("មិនអាចទាញយកបណ្ណាល័យអាន Excel បានទេ។ សូមពិនិត្យអ៊ីនធឺណិតរួចព្យាយាមម្ដងទៀត។")};
  document.head.appendChild(s);
}
var HM=(function(){
  var m={},A=["october|តុលា","november|វិច្ឆិកា","december|ធ្នូ","january|មករា","february|កុម្ភៈ","s_1|s1|ប្រឡងឆមាសទី១|ប្រឡងឆមាស១|exam1"],B=["march|មីនា","april|មេសា","may|ឧសភា","june|មិថុនា","s_2|s2|ប្រឡងឆមាសទី២|ប្រឡងឆមាស២|exam2"];
  A.forEach(function(x,j){x.split("|").forEach(function(n){m[n]=["a",j]})});
  B.forEach(function(x,j){x.split("|").forEach(function(n){m[n]=["b",j]})});
  return m;
})();
function hn(v){return String(v==null?"":v).toLowerCase().replace(/[\s.]/g,"")}
function parseWB(wb){
  imp=[];
  wb.SheetNames.forEach(function(sn){
    var rows=XLSX.utils.sheet_to_json(wb.Sheets[sn],{header:1,defval:"",raw:true}),hr=-1,map={},nc=-1,idc=-1;
    for(var r=0;r<Math.min(6,rows.length)&&hr<0;r++){
      var mm={},n=0,nm=-1,ic=-1;
      rows[r].forEach(function(h,ci){var x=hn(h);if(HM[x]&&!mm[ci]&&!Object.keys(mm).some(function(k){return mm[k][0]===HM[x][0]&&mm[k][1]===HM[x][1]})){mm[ci]=HM[x];n++}else if(/^(id|studentid|stuid|លេខសម្គាល់|លេខសម្កាល់|លេខសំគាល់|លេខអត្តសញ្ញាណ|អត្តលេខ)/.test(x))ic=ci;else if(/^(name|studentname|ឈ្មោះ|ឈ្មោះសិស្ស|គោត្តនាម)/.test(x))nm=ci});
      if(n>=3){hr=r;map=mm;nc=nm;idc=ic}
    }
    if(hr<0)return;
    var st=[],found={a:[0,0,0,0,0,0],b:[0,0,0,0,0]},mxv=0,skip=0,dup=0,seen={};
    Object.keys(map).forEach(function(ci){found[map[ci][0]][map[ci][1]]=1});
    if(idc>=0)for(var r=hr+1;r<rows.length;r++){
      var s={id:"",n:"",a:["","","","","",""],b:["","","","",""]},any=false;
      Object.keys(map).forEach(function(ci){var v=rows[r][ci];if(v!==""&&v!=null&&!isNaN(+v)){var x=+v;s[map[ci][0]][map[ci][1]]=x;any=true;if(x>mxv)mxv=x}});
      var idv=String(rows[r][idc]==null?"":rows[r][idc]).trim();
      if(!any&&!idv)continue;
      if(!idv){skip++;continue}
      if(seen[idv.toLowerCase()]){dup++;continue}
      seen[idv.toLowerCase()]=1;
      s.id=idv;s.n=nc>=0&&rows[r][nc]!==""?String(rows[r][nc]).trim():"";
      st.push(s);
    }
    if(!st.length&&idc>=0&&!skip)return;
    var cn=sn.trim().replace(/[\s_]+/g,"-");
    imp.push({sn:sn,n:cn,st:st,found:found,max:mxv,names:nc>=0,noid:idc<0,skip:skip,dup:dup});
  });
  if(!imp.length){alert("រកមិនឃើញតារាងពិន្ទុក្នុងឯកសារនេះទេ។ ត្រូវមានជួរ ID សិស្ស (ក្បាលតារាង «ID» ឬ «លេខសម្គាល់») ហើយជួរពិន្ទុមានឈ្មោះដូចជា October, November, December, January, S_1, March, April, May, June, S_2។");return}
  $("impl").innerHTML=imp.map(function(x,i){
    var ex=(rs.c[rt]||[]).filter(function(c){return c.n===x.n})[0],mt=0;
    if(ex)x.st.forEach(function(s){if(ex.st.some(function(q){return String(q.id||"").toLowerCase()===s.id.toLowerCase()}))mt++});
    return"<label class=it style='display:grid;grid-template-columns:auto 1fr;gap:4px 10px;align-items:start'><input type=checkbox class=chk data-i='"+i+"' "+(x.noid?"disabled":"checked")+" style='margin-top:6px'><span><b>"+esc(x.n)+"</b> · "+x.st.length+" សិស្ស (មាន ID) · ពិន្ទុខ្ពស់បំផុត "+x.max+
      (x.noid?" · <span style='color:var(--danger)'>គ្មានជួរ ID — មិនអាចនាំចូលបានទេ</span>":ex?" · <span style='color:var(--accent)'>ថ្នាក់មានរួចហើយ៖ ត្រូវ ID "+mt+" នាក់ (ធ្វើបច្ចុប្បន្នភាព) · ថ្មី "+(x.st.length-mt)+" នាក់</span>":" · ថ្នាក់ថ្មី")+
      (x.skip?" · <span style='color:var(--danger)'>រំលង "+x.skip+" ជួរគ្មាន ID</span>":"")+(x.dup?" · <span style='color:var(--danger)'>រំលង "+x.dup+" ជួរ ID ជាន់គ្នា</span>":"")+
      "<br><span class=note style='margin:0'>(សន្លឹក «"+esc(x.sn)+"»)</span></span></label>"}).join("");
  $("impt").textContent="ចូលទៅក្នុងគណនីគ្រូ៖ "+teacherOf(rt).name;
  $("dlgImp").showModal();
}
$("rim").onclick=function(){if(!canM()){alert("គ្មានសិទ្ធិនាំចូលទិន្នន័យទៅគ្រូដទៃទេ!");return}$("fileImp").click()};
$("fileImp").onchange=function(e){
  var f=e.target.files[0];e.target.value="";if(!f)return;
  loadXL(function(){
    var r=new FileReader();
    r.onload=function(ev){try{parseWB(XLSX.read(ev.target.result,{type:"array"}))}catch(x){console.error(x);alert("មិនអាចអានឯកសារ Excel នេះបានទេ!")}};
    r.readAsArrayBuffer(f);
  });
};
$("cxImp").onclick=function(){$("dlgImp").close()};
$("okImp").onclick=function(){
  var sel=[].slice.call($("impl").querySelectorAll("input:checked")).map(function(x){return imp[+x.dataset.i]});
  if(!sel.length){alert("សូមជ្រើសរើសយ៉ាងតិចមួយថ្នាក់!");return}
  var l=rs.c[rt]=rs.c[rt]||[],last=-1,warn=[],nu=0,nn=0;
  sel.forEach(function(x){
    var i=l.map(function(c){return c.n}).indexOf(x.n),c;
    if(i<0){c={n:x.n,st:[]};l.push(c);i=l.length-1}else c=l[i];
    x.st.forEach(function(s){
      var t=c.st.filter(function(q){return String(q.id||"").toLowerCase()===s.id.toLowerCase()})[0];
      if(!t){t={id:s.id,n:s.n||"សិស្ស "+(c.st.length+1),a:["","","","","",""],b:["","","","",""]};c.st.push(t);nn++}else{nu++;if(s.n)t.n=s.n}
      ["a","b"].forEach(function(k){x.found[k].forEach(function(f,j){if(f)t[k][j]=s[k][j]})});
    });
    /* ជួរសកម្ម = ជួរនៅក្នុង Excel ឬជួរដែលមានពិន្ទុរួចហើយ */
    var cf={1:[],2:[]};
    [[1,"a"],[2,"b"]].forEach(function(q){x.found[q[1]].forEach(function(f,j){cf[q[0]][j]=(f||c.st.some(function(t){return t[q[1]][j]!==""&&t[q[1]][j]!=null}))?1:0})});
    c.cf=cf;
    last=i;
    var g=parseInt(x.n)||0;if(g&&x.max>(rs.mx[g]||100))warn.push([g,x.max]);
  });
  rc=last;savR();$("dlgImp").close();renderR();
  notify("នាំចូល "+sel.length+" ថ្នាក់៖ ធ្វើបច្ចុប្បន្នភាព "+nu+" នាក់ តាម ID · បន្ថែមថ្មី "+nn+" នាក់");
  var done={};
  warn.forEach(function(w){
    if(done[w[0]])return;done[w[0]]=1;
    var cur=rs.mx[w[0]]||100,mx=Math.max.apply(null,warn.filter(function(q){return q[0]===w[0]}).map(function(q){return q[1]})),nx=[100,125,150,200,250].filter(function(v){return v>=mx})[0]||Math.ceil(mx);
    if(isAdm()){
      if(confirm("ថ្នាក់ទី"+w[0]+" មានពិន្ទុខ្ពស់បំផុត "+mx+" ដែលលើសពិន្ទុអតិបរមា "+cur+"។\nតើចង់កែពិន្ទុអតិបរមាថ្នាក់ទី"+w[0]+" ទៅ "+nx+" ដែរឬទេ?")){rs.mx[w[0]]=nx;savR();renderR()}
    }else alert("ថ្នាក់ទី"+w[0]+" មានពិន្ទុលើសអតិបរមា "+cur+"។ សូមឱ្យអ្នកគ្រប់គ្រងកែពិន្ទុអតិបរមាក្នុង «ការកំណត់ស្តង់ដារពិន្ទុ»។");
  });
};

/* ===== បិទភ្ជាប់បញ្ជីឈ្មោះសិស្ស ===== */
$("rnm").onclick=function(){
  if(!canM()){alert("គ្មានសិទ្ធិ!");return}
  if(!curCls()){alert("សូមជ្រើសថ្នាក់ជាមុនសិន។");return}
  $("nmt").value="";$("dlgNm").showModal();
};
$("cxNm").onclick=function(){$("dlgNm").close()};
$("okNm").onclick=function(){
  var c=curCls(),lines=$("nmt").value.split(/\r?\n/).map(function(x){return x.trim()}).filter(Boolean),nu=0,nn=0,bad=0;
  if(!c||!lines.length){alert("សូមបិទភ្ជាប់បញ្ជី (ID ហើយតាមដោយឈ្មោះ)។");return}
  lines.forEach(function(ln){
    var m=ln.match(/^([^\t,]+)[\t,]+(.+)$/)||ln.match(/^(\S+)\s+(.+)$/);
    if(!m){bad++;return}
    var id=m[1].trim(),nm=m[2].trim(),t=c.st.filter(function(q){return String(q.id||"").toLowerCase()===id.toLowerCase()})[0];
    if(t){t.n=nm;nu++}else{c.st.push({id:id,n:nm,a:["","","","","",""],b:["","","","",""]});nn++}
  });
  savR();$("dlgNm").close();renderR();notify("ធ្វើបច្ចុប្បន្នភាព "+nu+" នាក់ តាម ID · បន្ថែមថ្មី "+nn+" នាក់"+(bad?" · រំលង "+bad+" បន្ទាត់គ្មាន ID":""));
};

/* ===== ប័ណ្ណពិន្ទុសិស្ស ===== */
function cardHTML(c,i,RK){
  var s=c.st[i],t=teacherOf(rt),I=inf(),mx=rs.mx[parseInt(c.n)]||100,ab=abp(s,3);
  function rkt(p){var r=RK[p][i];return r===""?"—":r+" / "+nranked(RK[p])}
  function sem(p){
    var k=p===1?"a":"b",cols=p===1?SM1:SM2,A=ac(c,p),tot=sa(s,k,c),done=fl(s,k,c);
    return"<table class=ct><thead><tr><th colspan="+(A.length+4)+" style='text-align:left'>ឆមាសទី"+kn(p)+"</th></tr><tr>"+A.map(function(j){return"<th>"+cols[j]+"</th>"}).join("")+"<th>សរុប</th><th>មធ្យម %</th><th>និទ្ទេស</th><th>ចំ.ថ្នាក់</th></tr></thead><tbody><tr>"+A.map(function(j){return"<td>"+(s[k][j]===""?"":s[k][j])+"</td>"}).join("")+"<td><b>"+(done?tot:"—")+"</b></td><td>"+(done?(tot/(mx*A.length)*100).toFixed(1):"—")+"</td><td><b>"+(gof(s,c,p)||"—")+"</b></td><td>"+rkt(p)+"</td></tr></tbody></table>";
  }
  var t1=sa(s,"a",c),t2=sa(s,"b",c),n=ac(c,1).length+ac(c,2).length,ok=!!gof(s,c,3),a1=abp(s,1),a2=abp(s,2);
  return"<div class='pg card-pr'><div class=hd><div class=moul>ព្រះរាជាណាចក្រកម្ពុជា</div><div class=moul style='font-size:11pt'>ជាតិ សាសនា ព្រះមហាក្សត្រ</div></div>"+
    "<div class=hl><div style='display:flex;align-items:center;gap:10px'><img src='"+LOGO+"' class=logo alt=''><div><b>"+esc(I.school)+"</b><br>កម្មវិធីសាលារៀនជំនាន់ថ្មី</div></div><div style='text-align:right'>ឆ្នាំសិក្សា៖ <b>"+esc(I.year||"............")+"</b></div></div>"+
    "<h2 class=moul style='text-align:center;font-size:14pt;margin:10px 0'>ប័ណ្ណពិន្ទុសិស្ស</h2>"+
    "<table class=ct style='margin-bottom:10px'><tbody><tr><td style='text-align:left'>ឈ្មោះសិស្ស៖ <b>"+esc(s.n)+"</b></td><td style='text-align:left'>លេខសម្គាល់៖ "+esc(s.id||"—")+"</td><td style='text-align:left'>ភេទ៖ "+esc(s.g||"—")+"</td></tr><tr><td style='text-align:left'>ថ្នាក់៖ <b>"+esc(c.n)+"</b></td><td style='text-align:left'>មុខវិជ្ជា៖ គណិតវិទ្យា</td><td style='text-align:left'>គ្រូបង្រៀន៖ "+esc(t.name||"")+"</td></tr></tbody></table>"+
    sem(1)+"<div style='height:8px'></div>"+sem(2)+"<div style='height:8px'></div>"+
    "<table class=ct><thead><tr><th colspan=6 style='text-align:left'>លទ្ធផលប្រចាំឆ្នាំ</th></tr><tr><th>សរុបឆមាស១</th><th>សរុបឆមាស២</th><th>សរុបពីរឆមាស</th><th>មធ្យម %</th><th>និទ្ទេសប្រចាំឆ្នាំ</th><th>ចំ.ថ្នាក់</th></tr></thead><tbody><tr><td>"+(fl(s,"a",c)?t1:"—")+"</td><td>"+(fl(s,"b",c)?t2:"—")+"</td><td><b>"+(ok?t1+t2:"—")+"</b></td><td>"+(ok?((t1+t2)/(mx*n)*100).toFixed(1):"—")+"</td><td><b style='font-size:13pt'>"+(gof(s,c,3)||"—")+"</b></td><td>"+rkt(3)+"</td></tr></tbody></table>"+
    "<table class=ct style='margin-top:8px'><thead><tr><th colspan=4 style='text-align:left'>អវត្តមាន (ថ្ងៃ)</th></tr><tr><th></th><th>មានច្បាប់</th><th>គ្មានច្បាប់</th><th>សរុប</th></tr></thead><tbody>"+
    [["ឆមាសទី១",a1],["ឆមាសទី២",a2],["ប្រចាំឆ្នាំ",ab]].map(function(x){return"<tr><td style='text-align:left'>"+x[0]+"</td><td>"+x[1][0]+"</td><td>"+x[1][1]+"</td><td><b>"+(x[1][0]+x[1][1])+"</b></td></tr>"}).join("")+"</tbody></table>"+
    "<p class=note style='margin:8px 0 0'>កម្រិតនិទ្ទេស៖ "+rs.pc.map(function(v,j){return"ABCDE"[j]+" ≥ "+v+"%"}).join(" · ")+" · F ក្រោម "+rs.pc[4]+"% (នៃពិន្ទុអតិបរមា)</p>"+
    "<div class=sig><div>មតិមាតា-បិតា ឬអ្នកអាណាព្យាបាល<br><br><br><br>ហត្ថលេខា</div><div>គ្រូបង្រៀន<br><br><br><br>"+esc(t.name||"")+"</div><div>នាយក/នាយិកាសាលា<br><br><br><br>ហត្ថលេខា</div></div></div>";
}
function cardsFor(c,idx){
  var RK={1:ranks(c,1),2:ranks(c,2),3:ranks(c,3)};
  return(idx==null?c.st.map(function(_,i){return i}):[idx]).map(function(i){return cardHTML(c,i,RK)}).join("");
}
function showCards(idx){
  var c=curCls();if(!c)return;
  $("cardBody").innerHTML=cardsFor(c,idx);
  $("cardBody").dataset.all=idx==null?"1":"";
  $("dlgCard").showModal();
}
$("rpa").onclick=function(){var c=curCls();if(!c||!c.st.length){alert("មិនទាន់មានសិស្សក្នុងថ្នាក់នេះទេ។");return}showCards(null)};
$("cxCard").onclick=function(){$("dlgCard").close()};
$("prCard").onclick=function(){doPrint($("cardBody").innerHTML)};
function doPrint(html){
  $("prt").innerHTML=html;document.body.classList.add("pm");
  setTimeout(function(){window.print()},60);
}
window.addEventListener("afterprint",function(){document.body.classList.remove("pm");$("prt").innerHTML=""});


/* ===== ផ្ទាំងទី ៦៖ ក្រាហ្វិក និងវិភាគ ===== */
function stackBar(label,o){
  var G="ABCDEF".split(""),t=0;G.forEach(function(g){t+=o[g]});
  return"<div class=sbr><div class=sbl>"+esc(label)+"</div><div class=sbt>"+(t?G.map(function(g){return o[g]?"<i class='sg g"+g+"' style='flex:"+o[g]+"' title='និទ្ទេស "+g+"៖ "+o[g]+" នាក់ ("+(o[g]/t*100).toFixed(1)+"%)'>"+g+" "+o[g]+"</i>":""}).join(""):"<span class=note style='margin:0'>គ្មានទិន្នន័យ</span>")+"</div><div class=sbn>"+t+" នាក់</div></div>";
}
function lgd(){return"<div class=lgd>"+"ABCDEF".split("").map(function(g){return"<span><i class='sw g"+g+"'></i>"+g+"</span>"}).join("")+"</div>"}
function trendSVG(c,p){
  var pts=[],mx=rs.mx[parseInt(c.n)]||100;
  [[1,"a",SM1],[2,"b",SM2]].forEach(function(x){
    if(p!==3&&p!==x[0])return;
    ac(c,x[0]).forEach(function(j){
      var v=c.st.map(function(s){return s[x[1]][j]}).filter(function(z){return z!==""&&z!=null}).map(Number);
      pts.push({l:x[2][j],v:v.length?ss(v)/v.length/mx*100:null,n:v.length});
    });
  });
  if(!pts.length)return"";
  var W=640,H=220,L=36,R=12,T=14,B=48,iw=W-L-R,ih=H-T-B,n=pts.length;
  function X(i){return L+(n===1?iw/2:i*iw/(n-1))}function Y(v){return T+ih-(v/100*ih)}
  var g="",d="",dots="";
  [0,25,50,75,100].forEach(function(v){g+="<line x1='"+L+"' x2='"+(W-R)+"' y1='"+Y(v)+"' y2='"+Y(v)+"' class=gl /><text x='"+(L-6)+"' y='"+(Y(v)+4)+"' text-anchor='end' class=ax>"+v+"%</text>"});
  var seg=[];pts.forEach(function(q,i){if(q.v==null){seg.push(null);return}seg.push(i)});
  var first=true;
  pts.forEach(function(q,i){
    if(q.v==null)return;
    d+=(first?"M":"L")+X(i).toFixed(1)+" "+Y(q.v).toFixed(1)+" ";first=false;
    dots+="<circle cx='"+X(i).toFixed(1)+"' cy='"+Y(q.v).toFixed(1)+"' r=4.5 class=dt><title>"+esc(q.l)+"៖ មធ្យម "+q.v.toFixed(1)+"% ("+q.n+" នាក់)</title></circle><text x='"+X(i).toFixed(1)+"' y='"+(Y(q.v)-9).toFixed(1)+"' text-anchor='middle' class=ax style='fill:var(--ink)'>"+q.v.toFixed(0)+"</text>";
  });
  var xl=pts.map(function(q,i){return"<text x='"+X(i).toFixed(1)+"' y='"+(H-B+16)+"' text-anchor='middle' class=ax>"+esc(q.l.length>5?q.l.slice(0,5)+"…":q.l)+"</text>"}).join("");
  return"<svg viewBox='0 0 "+W+" "+H+"' class=trend role=img aria-label='ក្រាហ្វិកមធ្យមភាគថ្នាក់តាមខែ'>"+g+"<path d='"+d+"' class=ln />"+dots+xl+"</svg>";
}
function renderV(){
  if(!data.some(function(t){return t.id===rt})&&data.length)rt=data[0].id;
  var isAdmin=(isAdm()),cl=rs.c[rt]||[];if(rc>=cl.length)rc=0;
  $("vt").innerHTML=data.map(function(t){return"<option value='"+esc(t.id)+"'"+(t.id===rt?" selected":"")+">"+esc(t.name)+"</option>"}).join("");
  $("vc").innerHTML=clsOpts(cl,false);
  $("vp").value=rp;
  var PN=["","ឆមាសទី១","ឆមាសទី២","ប្រចាំឆ្នាំ"][rp],c=cl[rc],h="";
  /* ទិដ្ឋភាពទូទៅ */
  var tot={A:0,B:0,C:0,D:0,E:0,F:0},ov="";
  data.forEach(function(t){
    if(!isAdmin&&t.id!==who.id)return;
    var o={A:0,B:0,C:0,D:0,E:0,F:0},cn=(rs.c[t.id]||[]),ns=0;
    cn.forEach(function(x){var q=cnt(x,rp);for(var g in q){o[g]+=q[g];tot[g]+=q[g]}ns+=x.st.length});
    var gd=0;for(var g in o)gd+=o[g];
    ov+="<tr><td class=nm>"+esc(t.name)+"</td><td>"+cn.length+"</td><td>"+ns+"</td><td>"+gd+"</td><td>"+(gd?((gd-o.F)/gd*100).toFixed(1)+"%":"—")+"</td><td>"+(gd?((o.A+o.B+o.C)/gd*100).toFixed(1)+"%":"—")+"</td><td>"+(gd?(o.F/gd*100).toFixed(1)+"%":"—")+"</td></tr>";
  });
  h+="<div class=card><h3>ទិដ្ឋភាពទូទៅ — "+PN+"</h3><div class=wrap><table style='min-width:560px'><thead><tr><th>គ្រូ</th><th>ថ្នាក់</th><th>សិស្ស</th><th>មាននិទ្ទេស</th><th>អត្រាជាប់ (A–E)</th><th>A–C</th><th>ធ្លាក់ (F)</th></tr></thead><tbody>"+(ov||"<tr><td colspan=7 class=empty>គ្មានទិន្នន័យ</td></tr>")+"</tbody></table></div></div>";
  /* ការបែងចែកនិទ្ទេស */
  h+="<div class=card><h3>ការបែងចែកនិទ្ទេសតាមថ្នាក់ — "+esc(teacherOf(rt).name||"")+" ("+PN+")</h3>"+lgd()+
    (cl.length?cl.map(function(x){return stackBar(x.n,cnt(x,rp))}).join("")+stackBar("សរុប",(function(){var o={A:0,B:0,C:0,D:0,E:0,F:0};cl.forEach(function(x){var q=cnt(x,rp);for(var g in q)o[g]+=q[g]});return o})()):"<p class=empty>គ្មានថ្នាក់</p>")+"</div>";
  if(c){
    var rk=ranks(c,rp),list=c.st.map(function(s,i){return{i:i,s:s,r:rk[i],g:gof(s,c,rp),ab:abp(s,rp)}});
    var mxs=rs.mx[parseInt(c.n)]||100;
    h+="<div class=card><h3>មធ្យមភាគថ្នាក់ «"+esc(c.n)+"» តាមខែ (% នៃពិន្ទុអតិបរមា)</h3>"+(trendSVG(c,rp)||"<p class=empty>គ្មានទិន្នន័យ</p>")+"</div>";
    var top=list.filter(function(x){return x.r!==""}).sort(function(a,b){return a.r-b.r}).slice(0,5);
    h+="<div class=card><h3>សិស្សពូកែ ៥ នាក់ដំបូង — "+esc(c.n)+" ("+PN+")</h3><div class=wrap><table style='min-width:420px'><thead><tr><th>ចំ.ថ្នាក់</th><th>ឈ្មោះ</th><th>ពិន្ទុសរុប</th><th>និទ្ទេស</th></tr></thead><tbody>"+(top.length?top.map(function(x){return"<tr><td>"+x.r+"</td><td class=nm>"+esc(x.s.n)+"</td><td>"+met(x.s,c,rp)+"</td><td>"+gbadge(x.g)+"</td></tr>"}).join(""):"<tr><td colspan=4 class=empty>មិនទាន់មានសិស្សបញ្ចប់ការបញ្ចូលពិន្ទុ</td></tr>")+"</tbody></table></div></div>";
    var risk=list.filter(function(x){return x.g==="F"||x.g==="E"||x.ab[1]>=5});
    h+="<div class=card><h3>សិស្សត្រូវការការជួយជំនួយ — "+esc(c.n)+" ("+PN+")</h3><p class=note style='margin:0 0 8px'>និទ្ទេស E ឬ F ឬអវត្តមានគ្មានច្បាប់ចាប់ពី ៥ ថ្ងៃឡើង។</p><div class=wrap><table style='min-width:480px'><thead><tr><th>ឈ្មោះ</th><th>និទ្ទេស</th><th>ពិន្ទុសរុប</th><th>អវត្តមាន (ច្បាប់/គ្មានច្បាប់)</th></tr></thead><tbody>"+(risk.length?risk.map(function(x){return"<tr><td class=nm>"+esc(x.s.n)+"</td><td>"+gbadge(x.g)+"</td><td>"+(met(x.s,c,rp)===""?"—":met(x.s,c,rp))+"</td><td>"+x.ab[0]+" / <b style='color:"+(x.ab[1]>=5?"var(--danger)":"inherit")+"'>"+x.ab[1]+"</b></td></tr>"}).join(""):"<tr><td colspan=4 class=empty>មិនមានសិស្សត្រូវការការជួយជំនួយ 🎉</td></tr>")+"</tbody></table></div></div>";
  }
  $("vbody").innerHTML=h;
}
$("vt").onchange=function(){rt=this.value;rc=0;renderV()};
$("vc").onchange=function(){clsPick(this.value,renderV)};
$("vp").onchange=function(){rp=+this.value;renderV()};

/* ===== ផ្ទាំងទី ៧៖ បញ្ជីសិស្ស និងអវត្តមាន ===== */
var pv=1,pmo=0;
function renderP(){
  if(!data.some(function(t){return t.id===rt})&&data.length)rt=data[0].id;
  var cl=rs.c[rt]||[];if(rc>=cl.length)rc=0;
  $("pt").innerHTML=data.map(function(t){return"<option value='"+esc(t.id)+"'"+(t.id===rt?" selected":"")+">"+esc(t.name)+"</option>"}).join("");
  $("pc").innerHTML=clsOpts(cl,true);
  $("pmo").innerHTML=MK.map(function(m,i){return"<option value="+i+(i===pmo?" selected":"")+">"+m+"</option>"}).join("");
  $("pmo").hidden=pv!==2;
  [].forEach.call($("pseg").children,function(b){b.setAttribute("aria-selected",+b.dataset.pv===pv)});
  var c=cl[rc],ro=!canM(),b="";
  if(!c){$("ptb").innerHTML="<tbody><tr><td class=empty>មិនទាន់មានថ្នាក់ទេ។</td></tr></tbody>";return}
  if(pv===1){
    c.st.forEach(function(s,i){
      var a=abp(s,3);
      b+="<tr><td>"+(i+1)+"</td><td><input data-p='"+i+"|id' value='"+esc(s.id||"")+"' style='width:100px' "+(ro?"readonly":"")+"></td><td><input data-p='"+i+"|n' value='"+esc(s.n)+"' style='min-width:150px' "+(ro?"readonly":"")+"></td><td><select data-p='"+i+"|g' style='width:auto;margin:0' "+(ro?"disabled":"")+"><option value=''>—</option>"+["ប្រុស","ស្រី"].map(function(x){return"<option"+(s.g===x?" selected":"")+">"+x+"</option>"}).join("")+"</select></td><td><input type=date data-p='"+i+"|dob' value='"+esc(s.dob||"")+"' style='width:150px' "+(ro?"readonly":"")+"></td><td><input data-p='"+i+"|ph' value='"+esc(s.ph||"")+"' inputmode=tel style='width:140px' "+(ro?"readonly":"")+"></td><td>"+(a[0]+a[1])+"</td></tr>";
    });
    $("ptb").innerHTML="<thead><tr><th>ល.រ</th><th>លេខសម្គាល់</th><th>ឈ្មោះសិស្ស</th><th>ភេទ</th><th>ថ្ងៃខែឆ្នាំកំណើត</th><th>ទូរស័ព្ទអាណាព្យាបាល</th><th>អវត្តមានសរុប (ថ្ងៃ)</th></tr></thead><tbody>"+(b||"<tr><td colspan=7 class=empty>មិនទាន់មានសិស្សទេ។</td></tr>")+"</tbody>";
    var m=c.st.filter(function(s){return s.g==="ប្រុស"}).length,f=c.st.filter(function(s){return s.g==="ស្រី"}).length;
    $("pnote").textContent="សិស្សសរុប "+c.st.length+" នាក់ · ប្រុស "+m+" · ស្រី "+f;
  }else{
    var te=0,tu=0;
    c.st.forEach(function(s,i){
      var v=(s.ab&&s.ab[pmo])||[0,0],y=abp(s,3);te+=+v[0]||0;tu+=+v[1]||0;
      b+="<tr><td>"+(i+1)+"</td><td class=nm>"+esc(s.n)+"</td><td><input class=n type=number min=0 max=31 data-p='"+i+"|ab|0' value='"+(v[0]||"")+"' "+(ro?"readonly":"")+"></td><td><input class=n type=number min=0 max=31 data-p='"+i+"|ab|1' value='"+(v[1]||"")+"' "+(ro?"readonly":"")+"></td><td id='pms-"+i+"'>"+((+v[0]||0)+(+v[1]||0))+"</td><td"+(y[1]>=5?" style='color:var(--danger);font-weight:700'":"")+">"+y[0]+" / "+y[1]+"</td></tr>";
    });
    $("ptb").innerHTML="<thead><tr><th>ល.រ</th><th>ឈ្មោះសិស្ស</th><th>មានច្បាប់</th><th>គ្មានច្បាប់</th><th>សរុបខែ "+MK[pmo]+"</th><th>ប្រចាំឆ្នាំ (ច្បាប់ / គ្មានច្បាប់)</th></tr></thead><tbody>"+(b||"<tr><td colspan=6 class=empty>មិនទាន់មានសិស្សទេ។</td></tr>")+"<tr class=tr><td></td><td>សរុបខែនេះ</td><td>"+te+"</td><td>"+tu+"</td><td>"+(te+tu)+"</td><td></td></tr></tbody>";
    $("pnote").textContent="💡 បញ្ចូលចំនួនថ្ងៃអវត្តមាននៃខែនីមួយៗ។ អវត្តមានគ្មានច្បាប់ចាប់ពី ៥ ថ្ងៃ នឹងបង្ហាញពណ៌ក្រហម ហើយចូលក្នុងបញ្ជី «សិស្សត្រូវការការជួយជំនួយ»។";
  }
}
$("pt").onchange=function(){rt=this.value;rc=0;renderP()};
$("pc").onchange=function(){clsPick(this.value,renderP)};
$("pmo").onchange=function(){pmo=+this.value;renderP()};
$("pseg").onclick=function(e){var b=e.target.closest("button");if(b){pv=+b.dataset.pv;renderP()}};
$("ptb").oninput=function(e){
  var p=e.target.dataset.p;if(!p)return;
  if(!canM()){renderP();return}
  var a=p.split("|"),c=curCls(),s=c&&c.st[+a[0]];if(!s)return;
  if(a[1]==="ab"){
    var v=e.target.value===""?0:Math.min(31,Math.max(0,Math.round(+e.target.value)||0));
    s.ab=s.ab||{};var x=s.ab[pmo]=s.ab[pmo]||[0,0];x[+a[2]]=v;
    if(!x[0]&&!x[1])delete s.ab[pmo];
    var el=$("pms-"+a[0]);if(el)el.textContent=(+x[0]||0)+(+x[1]||0);
  }else s[a[1]]=e.target.value;
  savR();
};
$("ptb").onchange=function(e){if(e.target.dataset.p&&e.target.dataset.p.indexOf("|ab|")>0)renderP()};
$("pex").onclick=function(){
  var c=curCls();if(!c)return;
  var rows=[["ល.រ","លេខសម្គាល់","ឈ្មោះ","ភេទ","ថ្ងៃកំណើត","ទូរស័ព្ទអាណាព្យាបាល"].concat(MK.map(function(m){return"អវត្តមាន "+m})).concat(["សរុបមានច្បាប់","សរុបគ្មានច្បាប់"])];
  c.st.forEach(function(s,i){var a=abp(s,3);rows.push([i+1,s.id||"",s.n,s.g||"",s.dob||"",s.ph||""].concat(MK.map(function(_,m){var v=s.ab&&s.ab[m];return v?(+v[0]||0)+(+v[1]||0):""})).concat([a[0],a[1]]))});
  dlCSV(rows,"students-"+c.n+".csv");
};

/* នាំចូលបញ្ជីសិស្សពី Excel/CSV៖ រកក្បាលតារាងស្វ័យប្រវត្តិ · ផ្គូផ្គងតាម ID (បើគ្មាន ID ផ្គូផ្គងតាមឈ្មោះ) · ធ្វើបច្ចុប្បន្នភាពតែជួរឈរដែលមានក្នុងឯកសារ */
var PCOL={id:/^(id|studentid|stuid|លេខសម្គាល់|លេខសម្កាល់|លេខសំគាល់|អត្តលេខ)/,n:/^(name|studentname|fullname|ឈ្មោះ|គោត្តនាម)/,g:/^(gender|sex|ភេទ)/,dob:/^(dob|birth|dateofbirth|birthday|ថ្ងៃខែឆ្នាំកំណើត|ថ្ងៃកំណើត)/,ph:/^(phone|tel|mobile|guardian|parent|ទូរស័ព្ទ|លេខទូរស័ព្ទ)/};
function pGender(v){v=hn(v);return/^(ប្រុស|ប|m|male|boy)$/.test(v)?"ប្រុស":/^(ស្រី|ស|f|female|girl)$/.test(v)?"ស្រី":""}
function pDate(v){
  if(v===""||v==null)return"";
  if(typeof v==="number"&&v>0){var d=new Date(Math.round((v-25569)*864e5));return d.getUTCFullYear()+"-"+pad2(d.getUTCMonth()+1)+"-"+pad2(d.getUTCDate())}
  v=String(v).trim().replace(/[០-៩]/g,function(c){return"០១២៣៤៥៦៧៨៩".indexOf(c)});
  var m=/^(\d{4})[-\/.](\d{1,2})[-\/.](\d{1,2})$/.exec(v);if(m)return m[1]+"-"+pad2(+m[2])+"-"+pad2(+m[3]);
  m=/^(\d{1,2})[-\/.](\d{1,2})[-\/.](\d{4})$/.exec(v);if(m)return m[3]+"-"+pad2(+m[2])+"-"+pad2(+m[1]);
  return"";
}
function pParse(wb){
  for(var k=0;k<wb.SheetNames.length;k++){
    var rows=XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[k]],{header:1,defval:"",raw:true});
    for(var r=0;r<Math.min(10,rows.length);r++){
      var map={};rows[r].forEach(function(h,ci){var x=hn(h);Object.keys(PCOL).forEach(function(f){if(map[f]==null&&PCOL[f].test(x))map[f]=ci})});
      if(map.n==null)continue;
      var out=[],bad=0;
      for(var i=r+1;i<rows.length;i++){
        var row=rows[i],cell=function(f){return map[f]==null?"":String(row[map[f]]==null?"":row[map[f]]).trim()},o={n:cell("n")};
        if(!o.n){if(cell("id"))bad++;continue}
        if(map.id!=null)o.id=cell("id");
        if(map.g!=null)o.g=pGender(cell("g"));
        if(map.dob!=null){o.dob=pDate(row[map.dob]);if(!o.dob&&cell("dob"))bad++}
        if(map.ph!=null){o.ph=cell("ph");if(typeof row[map.ph]==="number"&&o.ph.charAt(0)!=="0")o.ph="0"+o.ph}   /* Excel លុបលេខ 0 ខាងមុខលេខទូរស័ព្ទ */
        out.push(o);
      }
      return{sn:wb.SheetNames[k],cols:Object.keys(map),st:out,bad:bad};
    }
  }
  return null;
}
$("pim").onclick=function(){
  if(!canM()){alert("គ្មានសិទ្ធិនាំចូលទិន្នន័យទៅគ្រូដទៃទេ!");return}
  if(!curCls()){alert("សូមបង្កើតថ្នាក់ជាមុនសិន (ផ្ទាំង «លទ្ធផលសិក្សា»)។");return}
  $("pfile").click();
};
$("pfile").onchange=function(e){
  var f=e.target.files[0];e.target.value="";if(!f)return;
  loadXL(function(){
    var r=new FileReader();
    r.onload=function(ev){
      var x;try{x=pParse(XLSX.read(ev.target.result,{type:"array",codepage:65001,raw:/\.csv$/i.test(f.name)}))}catch(er){console.error(er);alert("មិនអាចអានឯកសារនេះបានទេ!");return}
      if(!x||!x.st.length){alert("រកមិនឃើញបញ្ជីសិស្សក្នុងឯកសារនេះទេ។ ជួរក្បាលតារាងត្រូវមាន «ឈ្មោះសិស្ស» ហើយអាចមាន «លេខសម្គាល់», «ភេទ», «ថ្ងៃខែឆ្នាំកំណើត», «ទូរស័ព្ទ»។ ចុច «📄 ទាញយកគំរូ» ដើម្បីមើលទម្រង់។");return}
      var c=curCls(),add=[],upd=0;
      x.st.forEach(function(o){
        var t=c.st.filter(function(q){return o.id?String(q.id||"").toLowerCase()===o.id.toLowerCase():q.n===o.n})[0];
        if(t)upd++;else add.push(o);
      });
      var L={id:"លេខសម្គាល់",n:"ឈ្មោះ",g:"ភេទ",dob:"ថ្ងៃកំណើត",ph:"ទូរស័ព្ទ"};
      if(!confirm("នាំចូលទៅថ្នាក់ «"+c.n+"» (សន្លឹក «"+x.sn+"»)\n\n• សិស្សថ្មី៖ "+add.length+" នាក់\n• ធ្វើបច្ចុប្បន្នភាព (មានរួចហើយ)៖ "+upd+" នាក់\n• ជួរឈរ៖ "+x.cols.map(function(k){return L[k]}).join(", ")+(x.bad?"\n• ⚠️ "+x.bad+" ជួរមានទិន្នន័យមិនត្រឹមត្រូវ (គ្មានឈ្មោះ ឬថ្ងៃខែមិនស្គាល់) ត្រូវរំលង":"")+"\n\nពិន្ទុ និងអវត្តមានដែលមានស្រាប់ នឹងនៅដដែល។ បន្តទេ?"))return;
      x.st.forEach(function(o){
        var t=c.st.filter(function(q){return o.id?String(q.id||"").toLowerCase()===o.id.toLowerCase():q.n===o.n})[0];
        if(!t){t={id:"",n:o.n,a:["","","","","",""],b:["","","","",""]};c.st.push(t)}
        Object.keys(o).forEach(function(k){if(o[k]!==""||k==="n")t[k]=o[k]});
      });
      savR();renderP();notify("បាននាំចូល៖ ថ្មី "+add.length+" នាក់ · ធ្វើបច្ចុប្បន្នភាព "+upd+" នាក់");
    };
    r.readAsArrayBuffer(f);
  });
};
$("ptpl").onclick=function(){dlCSV([["លេខសម្គាល់","ឈ្មោះសិស្ស","ភេទ","ថ្ងៃខែឆ្នាំកំណើត","ទូរស័ព្ទអាណាព្យាបាល"],["S001","សុខ ដារ៉ា","ប្រុស","15/03/2012","012345678"],["S002","ចាន់ ស្រីពៅ","ស្រី","2012-07-21","098765432"]],"គំរូ-បញ្ជីសិស្ស.csv")};

/* ===== ផ្ទាំងទី ៨៖ របាយការណ៍ការងារប្រចាំខែ ===== */
var WKEY=KEY+"-w",wr=loadW(),wmo=(function(){var d=new Date();return d.getFullYear()+"-"+("0"+(d.getMonth()+1)).slice(-2)})(),wt="",wimg={};
function loadW(){try{var s=sessionStorage.getItem(WKEY);if(s){var o=JSON.parse(s);if(o&&o.r)return o}}catch(e){}return{r:{}}}
function savW(){try{sessionStorage.setItem(WKEY,JSON.stringify(wr))}catch(e){}push("wr")}
function tmin(t){var p=(t||"").split(":");return p.length<2?NaN:+p[0]*60+ +p[1]}
function dur(a,b){var m=tmin(b)-tmin(a);if(!(m>0))return"";var h=Math.floor(m/60),n=m%60;return(h?kn(h)+"ម៉ោង":"")+(n?(h?" ":"")+kn(n)+"នាទី":"")}
function ft(t){var m=/^(\d{1,2}):(\d{2})/.exec(t||"");return m?(+m[1])+":"+m[2]:""}
function ampm(t){var p=(t||"").split(":");return +p[0]<12?"am":"pm"}
function fdd(s){if(!s||!/^\d{4}-\d{2}-\d{2}$/.test(s))return"";var p=s.split("-");return p[2]+"."+p[1]+"."+p[0]}
function wlist(){return(wr.r[wt]||[]).filter(function(e){return(e.d||"").slice(0,7)===wmo}).sort(function(a,b){return(a.d+(a.a||"")).localeCompare(b.d+(b.a||""))})}
function renderW(){
  var isAdmin=(isAdm());
  if(!wt||(!isAdmin&&wt!==who.id))wt=who.id;
  $("wt").innerHTML=data.filter(function(t){return isAdmin||t.id===who.id}).map(function(t){return"<option value='"+esc(t.id)+"'"+(t.id===wt?" selected":"")+">"+esc(t.name)+"</option>"}).join("");
  $("wm").value=wmo;
  var ro=!(isAdmin||who.id===wt);
  $("wadd").style.display=ro?"none":"inline-block";
  var L=wlist(),b="";
  L.forEach(function(e){
    b+="<tr><td><input type=date data-w='"+e.u+"|d' value='"+esc(e.d)+"' style='width:150px' "+(ro?"readonly":"")+"></td><td><input type=time data-w='"+e.u+"|a' value='"+esc(e.a||"")+"' style='width:105px;margin-bottom:4px' "+(ro?"readonly":"")+"><br><input type=time data-w='"+e.u+"|b' value='"+esc(e.b||"")+"' style='width:105px' "+(ro?"readonly":"")+"><div class=note style='margin:2px 0 0' id='wd-"+e.u+"'>"+dur(e.a,e.b)+"</div></td><td><textarea rows=3 data-w='"+e.u+"|c' style='min-width:260px;margin:0' placeholder='ខ្លឹមសារសកម្មភាព (មួយចំណុចក្នុងមួយបន្ទាត់)' "+(ro?"readonly":"")+">"+esc(e.c||"")+"</textarea></td><td class=acts>"+(ro?"":"<button data-wi='"+e.u+"'>🖼️ រូបភាព"+(wimg[e.u]&&wimg[e.u].length?" ("+wimg[e.u].length+")":"")+"</button> <button class=danger data-wd='"+e.u+"'>លុប</button>")+"</td></tr>";
  });
  $("wtb").innerHTML="<thead><tr><th>កាលបរិច្ឆេទ</th><th>ម៉ោង (ចាប់ផ្ដើម/បញ្ចប់)</th><th>ខ្លឹមសារសកម្មភាព</th><th></th></tr></thead><tbody>"+(b||"<tr><td colspan=4 class=empty>មិនទាន់មានសកម្មភាពក្នុងខែនេះទេ។ ចុច «+ បន្ថែមសកម្មភាព»។</td></tr>")+"</tbody>";
}
$("wt").onchange=function(){wt=this.value;renderW()};
$("wm").onchange=function(){wmo=this.value||wmo;renderW()};
$("wadd").onclick=function(){
  var arr=wr.r[wt]=wr.r[wt]||[],today=new Date(),d=wmo+"-"+("0"+Math.min(today.getDate(),28)).slice(-2);
  if(today.toISOString().slice(0,7)===wmo)d=today.getFullYear()+"-"+("0"+(today.getMonth()+1)).slice(-2)+"-"+("0"+today.getDate()).slice(-2);
  arr.push({u:"w"+Date.now().toString(36)+Math.random().toString(36).slice(2,5),d:d,a:"",b:"",c:""});
  savW();renderW();
};
$("wtb").oninput=function(e){
  var p=e.target.dataset.w;if(!p)return;
  var a=p.split("|"),en=(wr.r[wt]||[]).filter(function(x){return x.u===a[0]})[0];if(!en)return;
  en[a[1]]=e.target.value;savW();
  if(a[1]==="a"||a[1]==="b"){var el=$("wd-"+a[0]);if(el)el.textContent=dur(en.a,en.b)}
};
$("wtb").onchange=function(e){var p=e.target.dataset.w;if(p&&p.slice(-2)==="|d")renderW()};
$("wtb").onclick=function(e){
  var b=e.target.closest("button");if(!b)return;
  if(b.dataset.wd){if(confirm("តើអ្នកពិតជាចង់លុបសកម្មភាពនេះមែនទេ?")){wr.r[wt]=(wr.r[wt]||[]).filter(function(x){return x.u!==b.dataset.wd});savW();renderW()}}
  if(b.dataset.wi){$("wfile").dataset.u=b.dataset.wi;$("wfile").click()}
};
$("wfile").onchange=function(e){
  var u=e.target.dataset.u,fs=[].slice.call(e.target.files);e.target.value="";
  fs.forEach(function(f){
    var r=new FileReader();
    r.onload=function(ev){
      var im=new Image();
      im.onload=function(){
        var k=Math.min(1,900/Math.max(im.width,im.height)),cv=document.createElement("canvas");
        cv.width=Math.round(im.width*k);cv.height=Math.round(im.height*k);
        cv.getContext("2d").drawImage(im,0,0,cv.width,cv.height);
        (wimg[u]=wimg[u]||[]).push(cv.toDataURL("image/jpeg",.8));renderW();
      };
      im.src=ev.target.result;
    };
    r.readAsDataURL(f);
  });
  notify("បានភ្ជាប់រូបភាពសម្រាប់ការបោះពុម្ព (មិនរក្សាទុកក្នុង Cloud)");
};
var LOGO=(document.getElementById("ngsLogo")||{}).src||new URL("logo-ngs.jpg",location.href).href;
function reportHTML(){
  var t=teacherOf(wt),I=inf(),L=wlist(),p=wmo.split("-"),mn=M[+p[1]-1]||"";
  var role=(t.rl||"សមាជិក")+"ក្រុមបច្ចេកទេស";
  var rows=L.map(function(e){
    var cc=(e.c||"").split(/\r?\n/).filter(Boolean),ims=(wimg[e.u]||[]).map(function(s){return"<img src='"+s+"' class=wim>"}).join("");
    return"<tr><td>"+fdd(e.d)+"</td><td>"+(dur(e.a,e.b)||"")+(e.a&&e.b?"<br>("+ft(e.a)+"-"+ft(e.b)+")"+ampm(e.b):"")+"</td><td style='text-align:left'>"+cc.map(function(x,i){return esc(x)}).join("<br>")+"</td><td>"+ims+"</td></tr>";
  }).join("");
  return"<div class='pg rpt'><div class=hd><div class=moul>ព្រះរាជាណាចក្រកម្ពុជា</div><div class=moul style='font-size:11pt'>ជាតិ សាសនា ព្រះមហាក្សត្រ</div></div>"+
    "<div style='display:flex;align-items:center;gap:10px;margin:6px 0 10px'><img src='"+LOGO+"' class=logo alt=''><div><div class=moul style='text-align:left'>"+esc(I.school)+"</div><div>កម្មវិធីសាលារៀនជំនាន់ថ្មី</div></div></div>"+
    "<h2 class=moul style='text-align:center;font-size:13pt;margin:10px 0'>របាយការណ៍ការងារ"+esc(role)+"គណិតវិទ្យា ប្រចាំខែ"+mn+" ឆ្នាំ"+kn(p[0])+"</h2>"+
    "<p style='text-indent:1.2cm;margin:6px 0'>គោរពជម្រាបជូនគណៈគ្រប់គ្រង សូមជូនរបាយការណ៍ការងារក្រុមបច្ចេកទេសគណិតវិទ្យា នៅ"+esc(I.school)+" សាលារៀនជំនាន់ថ្មី (NGS) មានដូចតទៅ៖</p>"+
    "<table class=ct style='width:100%'><thead><tr><th style='width:16%'>កាលបរិច្ឆេទ</th><th style='width:18%'>រយៈពេល</th><th>ខ្លឹមសារសកម្មភាព</th><th style='width:24%'>សកម្មភាព (រូបភាព...)</th></tr></thead><tbody>"+(rows||"<tr><td colspan=4>—</td></tr>")+"</tbody></table>"+
    wpFoot(wt,t.name,"អ្នករៀបចំរបាយការណ៍")+"</div>";
}
$("wpr").onclick=function(){if(!wlist().length){alert("មិនទាន់មានសកម្មភាពក្នុងខែនេះទេ។");return}window.SCHX.fontsOk().then(function(){doPrint(reportHTML())})};
$("wex").onclick=function(){
  var rows=[["កាលបរិច្ឆេទ","ម៉ោងចាប់ផ្ដើម","ម៉ោងបញ្ចប់","រយៈពេល","ខ្លឹមសារសកម្មភាព"]].concat(wlist().map(function(e){return[fdd(e.d),e.a||"",e.b||"",dur(e.a,e.b),(e.c||"").replace(/\r?\n/g," | ")]}));
  dlCSV(rows,"work-report-"+wmo+".csv");
};


/* ===== ផ្ទាំងទី ៩៖ តារាងស្នាដៃគ្រូបង្រៀន ===== */
var AHC=["ធ្វើកិច្ចតែងការស្ដង់ដារ","PISA តេស្ត","សន្លឹកកិច្ចការបង្រៀន","ស្លាយបង្រៀន","ស្លាយប្រជុំបច្ចេកទេស","របាយការណ៍ប្រជុំបច្ចេកទេស","ប៉បនសិស្សខ្សោយ/ពូកែ","បង្រៀនវគ្គ Summer Course","សិក្ខាសាលា","ផ្សេងៗ"];
var LV=["7","8","9","10","11","12"];
var AKEY=KEY+"-a",ah=loadA(),ahT="",ahEd=null;
function loadA(){try{var s=sessionStorage.getItem(AKEY);if(s){var o=JSON.parse(s);if(o&&o.r)return o}}catch(e){}return{r:{}}}
function savA(){try{sessionStorage.setItem(AKEY,JSON.stringify(ah))}catch(e){}push("ah")}
function uid(p){return p+Date.now().toString(36)+Math.random().toString(36).slice(2,5)}
function safeUrl(u){u=(u||"").trim();if(!u)return"";if(!/^https?:\/\//i.test(u))u="https://"+u;return/^https?:\/\/[^\s"'<>]+$/i.test(u)?u:""}
function lvt(l){return l?"ថ្នាក់ទី"+l:"ទូទៅ"}
function lvOpts(v,all){return(all?"<option value='*'"+(v==="*"?" selected":"")+">គ្រប់កម្រិត</option>":"")+"<option value=''"+(v===""?" selected":"")+">ទូទៅ</option>"+LV.map(function(l){return"<option value='"+l+"'"+(v===l?" selected":"")+">ថ្នាក់ទី"+l+"</option>"}).join("")}
function catOpts(v,all){return(all?"<option value='*'"+(v==="*"?" selected":"")+">គ្រប់ប្រភេទ</option>":"")+AHC.map(function(c,i){return"<option value='"+i+"'"+(String(v)===String(i)?" selected":"")+">"+esc(c)+"</option>"}).join("")}
/* ទាញបញ្ជីស្នាដៃតាមគ្រូ និងកាលបរិច្ឆេទ */
function ahAll(){
  var isAdmin=(isAdm()),ids=(ahT==="*"&&isAdmin)?data.map(function(t){return t.id}):[ahT],f=$("ahF").value,g=$("ahG").value,o=[];
  ids.forEach(function(id){(ah.r[id]||[]).forEach(function(e){if((!f||e.d>=f)&&(!g||e.d<=g))o.push({e:e,o:id})})});
  return o;
}
function renderA(){
  var isAdmin=(isAdm());
  if(!isAdmin)ahT=who.id;else if(!ahT)ahT=who.id;
  $("ahT").innerHTML=(isAdmin?"<option value='*'"+(ahT==="*"?" selected":"")+">គ្រូទាំងអស់</option>":"")+data.filter(function(t){return isAdmin||t.id===who.id}).map(function(t){return"<option value='"+esc(t.id)+"'"+(t.id===ahT?" selected":"")+">"+esc(t.name)+"</option>"}).join("");
  var fk=$("ahK").value||"*",fl2=$("ahL").value||"*";
  $("ahK").innerHTML=catOpts(fk,true);$("ahL").innerHTML=lvOpts(fl2,true);
  var all=ahAll(),m={},CT=[];
  AHC.forEach(function(_,i){m[i]={"":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0}});
  all.forEach(function(x){var c=+x.e.c;if(m[c])m[c][x.e.l||""]++});
  var colT={"":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0},gt2=0,b="";
  AHC.forEach(function(c,i){
    var rt2=0,tds=LV.concat([""]).map(function(l){var v=m[i][l];rt2+=v;colT[l]+=v;return"<td>"+(v||"<span style='color:var(--mute)'>·</span>")+"</td>"}).join("");gt2+=rt2;
    b+="<tr><td class=nm style='white-space:normal'>"+(i+1)+". "+esc(c)+"</td>"+tds+"<td><b>"+rt2+"</b></td></tr>";
  });
  b+="<tr class=tr><td>សរុប</td>"+LV.concat([""]).map(function(l){return"<td>"+colT[l]+"</td>"}).join("")+"<td>"+gt2+"</td></tr>";
  $("ahM").innerHTML="<thead><tr><th>ប្រភេទស្នាដៃ</th>"+LV.map(function(l){return"<th>ថ្នាក់ទី"+l+"</th>"}).join("")+"<th>ទូទៅ</th><th>សរុប</th></tr></thead><tbody>"+b+"</tbody>";
  /* តារាងសង្ខេបតាមគ្រូ (Admin) */
  if(isAdmin&&ahT==="*"){
    var rows=data.map(function(t){
      var cs=AHC.map(function(){return 0}),tot=0;all.forEach(function(x){if(x.o===t.id&&cs[+x.e.c]!=null){cs[+x.e.c]++;tot++}});
      return"<tr><td class=nm>"+esc(t.name)+"</td>"+cs.map(function(v){return"<td>"+(v||"<span style='color:var(--mute)'>·</span>")+"</td>"}).join("")+"<td><b>"+tot+"</b></td></tr>"}).join("");
    $("ahS").innerHTML="<thead><tr><th>គ្រូ</th>"+AHC.map(function(c,i){return"<th title='"+esc(c)+"'>"+(i+1)+"</th>"}).join("")+"<th>សរុប</th></tr></thead><tbody>"+rows+"</tbody>";
    $("ahSW").hidden=false;
  }else $("ahSW").hidden=true;
  /* បញ្ជីលម្អិត */
  var L=all.filter(function(x){return(fk==="*"||String(x.e.c)===fk)&&(fl2==="*"||(x.e.l||"")===fl2)}).sort(function(a,b){return(b.e.d||"").localeCompare(a.e.d||"")});
  var h="";
  L.forEach(function(x){
    var e=x.e,ok=isAdmin||who.id===x.o,u=safeUrl(e.k);
    h+="<tr><td style='white-space:nowrap'>"+esc(fdd(e.d))+"</td>"+(ahT==="*"?"<td>"+esc(teacherOf(x.o).name||x.o)+"</td>":"")+"<td>"+esc(AHC[+e.c]||"")+"</td><td>"+esc(lvt(e.l))+"</td><td style='white-space:normal;min-width:200px'>"+esc(e.t)+(e.n?"<div class=note style='margin:2px 0 0'>"+esc(e.n)+"</div>":"")+"</td><td>"+(u?"<a href='"+esc(u)+"' target=_blank rel='noopener noreferrer'>🔗 បើក</a>":"")+"</td><td class=acts>"+(ok?"<button data-ae='"+e.u+"|"+x.o+"'>កែ</button> <button class=danger data-ad='"+e.u+"|"+x.o+"'>លុប</button>":"")+"</td></tr>";
  });
  $("ahL2").innerHTML="<thead><tr><th>កាលបរិច្ឆេទ</th>"+(ahT==="*"?"<th>គ្រូ</th>":"")+"<th>ប្រភេទ</th><th>កម្រិត</th><th>ចំណងជើង / ខ្លឹមសារ</th><th>តំណ</th><th></th></tr></thead><tbody>"+(h||"<tr><td colspan=7 class=empty>មិនទាន់មានស្នាដៃទេ។ ចុច «+ បន្ថែមស្នាដៃ»។</td></tr>")+"</tbody>";
  $("ahA").style.display=(ahT==="*"&&!isAdmin)?"none":"inline-block";
}
["ahT","ahK","ahL","ahF","ahG"].forEach(function(i){$(i).onchange=function(){if(i==="ahT")ahT=this.value;renderA()}});
function ahOpen(e,owner){
  ahEd=e?{u:e.u,o:owner}:null;
  $("dAhH").textContent=e?"កែស្នាដៃ":"បន្ថែមស្នាដៃ";
  $("dAhC").innerHTML=catOpts(e?e.c:"0",false);$("dAhL").innerHTML=lvOpts(e?(e.l||""):"",false);
  $("dAhD").value=e?e.d:new Date().toISOString().slice(0,10);
  $("dAhT").value=e?e.t:"";$("dAhK").value=e?(e.k||""):"";$("dAhN").value=e?(e.n||""):"";
  $("dlgAh").showModal();
}
$("ahA").onclick=function(){ahOpen(null)};
$("cxAh").onclick=function(){$("dlgAh").close()};
$("okAh").onclick=function(){
  var t=$("dAhT").value.trim(),d=$("dAhD").value,k=$("dAhK").value.trim();
  if(!t||!d){alert("សូមបញ្ចូលកាលបរិច្ឆេទ និងចំណងជើង!");return}
  if(k&&!safeUrl(k)){alert("តំណ (Link) មិនត្រឹមត្រូវ!");return}
  var rec={c:$("dAhC").value,l:$("dAhL").value,d:d,t:t,k:k?safeUrl(k):"",n:$("dAhN").value.trim()};
  if(ahEd){
    var a=ah.r[ahEd.o]||[],x=a.filter(function(q){return q.u===ahEd.u})[0];if(x){for(var f in rec)x[f]=rec[f]}
  }else{
    var owner=(ahT==="*"?who.id:ahT);rec.u=uid("a");(ah.r[owner]=ah.r[owner]||[]).push(rec);
  }
  savA();$("dlgAh").close();renderA();notify("បានរក្សាទុកស្នាដៃ");
};
$("ahL2").onclick=function(e){
  var b=e.target.closest("button");if(!b)return;
  var isAdmin=(isAdm());
  if(b.dataset.ae){var p=b.dataset.ae.split("|");var x=(ah.r[p[1]]||[]).filter(function(q){return q.u===p[0]})[0];if(x&&(isAdmin||who.id===p[1]))ahOpen(x,p[1])}
  if(b.dataset.ad){var p2=b.dataset.ad.split("|");if((isAdmin||who.id===p2[1])&&confirm("តើអ្នកពិតជាចង់លុបស្នាដៃនេះមែនទេ?")){ah.r[p2[1]]=(ah.r[p2[1]]||[]).filter(function(q){return q.u!==p2[0]});savA();renderA()}}
};
$("ahX").onclick=function(){
  var rows=[["កាលបរិច្ឆេទ","គ្រូ","ប្រភេទ","កម្រិត","ចំណងជើង","តំណ","កំណត់សម្គាល់"]];
  ahAll().sort(function(a,b){return(a.e.d||"").localeCompare(b.e.d||"")}).forEach(function(x){rows.push([fdd(x.e.d),teacherOf(x.o).name||x.o,AHC[+x.e.c]||"",lvt(x.e.l),x.e.t,x.e.k||"",x.e.n||""])});
  dlCSV(rows,"achievements.csv");
};
$("ahP").onclick=function(){
  var I=inf(),nm=ahT==="*"?"គ្រូទាំងអស់":(teacherOf(ahT).name||""),f=$("ahF").value,g=$("ahG").value;
  var h="<div class='pg'><div class=hd><div class=moul>ព្រះរាជាណាចក្រកម្ពុជា</div><div class=moul style='font-size:11pt'>ជាតិ សាសនា ព្រះមហាក្សត្រ</div></div>"+
    "<div style='display:flex;align-items:center;gap:10px;margin:6px 0 10px'><img src='"+LOGO+"' class=logo alt=''><div><div class=moul style='text-align:left'>"+esc(I.school)+"</div><div>កម្មវិធីសាលារៀនជំនាន់ថ្មី</div></div></div>"+
    "<h2 class=moul style='text-align:center;font-size:13pt;margin:10px 0'>តារាងស្នាដៃគ្រូបង្រៀន</h2><p style='margin:4px 0'>គ្រូ៖ <b>"+esc(nm)+"</b>"+(f||g?" · រយៈពេល៖ "+esc(fdd(f)||"…")+" ដល់ "+esc(fdd(g)||"…"):"")+"</p>"+
    "<table class=ct>"+$("ahM").innerHTML+"</table>"+
    (ahT==="*"?"<div style='height:10px'></div><table class=ct>"+$("ahS").innerHTML+"</table><p style='font-size:9.5pt;margin:4px 0'>"+AHC.map(function(c,i){return(i+1)+"="+esc(c)}).join(" · ")+"</p>":"")+
    "<div class=sig><div>&nbsp;<br>បានឃើញ និងពិនិត្យ<br>ជ.គណៈគ្រប់គ្រងសាលារៀនជំនាន់ថ្មី<br><br><br><br>&nbsp;</div><div>ធ្វើនៅភ្នំពេញ ថ្ងៃទី......ខែ......ឆ្នាំ......<br>អ្នករៀបចំ<br><br><br><br><b>"+esc(who.name||"")+"</b></div></div></div>";
  doPrint(h);
};

/* ===== ផ្ទាំងទី ១០៖ ឯកសារជំនួយការបង្រៀន ===== */
var LBC=["កិច្ចតែងការ","ស្លាយបង្រៀន","សន្លឹកកិច្ចការ","វិដេអូមេរៀន","ផ្សេងៗ"],LBI=["📘","🖼️","📝","🎬","📎"];
var LKEY=KEY+"-l",lib=loadL(),lbc="*",lbEd=null;
function loadL(){try{var s=sessionStorage.getItem(LKEY);if(s){var o=JSON.parse(s);if(o&&o.i)return o}}catch(e){}return{i:[]}}
function savL(){try{sessionStorage.setItem(LKEY,JSON.stringify(lib))}catch(e){}push("lib")}
function renderL(){
  var q=($("lbQ").value||"").trim().toLowerCase(),lv=$("lbL").value||"*";
  $("lbL").innerHTML=lvOpts(lv,true);
  var base=lib.i.filter(function(x){return(lv==="*"||(x.l||"")===lv)&&(!q||[x.t,x.n,x.by].join(" ").toLowerCase().indexOf(q)>-1)});
  $("lbS").innerHTML="<button data-lc='*' aria-selected='"+(lbc==="*")+"'>ទាំងអស់ ("+base.length+")</button>"+LBC.map(function(c,i){return"<button data-lc='"+i+"' aria-selected='"+(lbc===String(i))+"'>"+LBI[i]+" "+esc(c)+" ("+base.filter(function(x){return String(x.c)===String(i)}).length+")</button>"}).join("");
  var L=base.filter(function(x){return lbc==="*"||String(x.c)===lbc}).sort(function(a,b){return(b.d||"").localeCompare(a.d||"")});
  var isAdmin=(isAdm());
  $("lbG").innerHTML=L.length?L.map(function(x){
    var u=safeUrl(x.k),ok=isAdmin||who.id===x.o;
    return"<div class=card style='margin:0;display:flex;flex-direction:column;gap:6px'><div style='display:flex;gap:6px;flex-wrap:wrap'><span class=tag>"+LBI[+x.c]+" "+esc(LBC[+x.c]||"")+"</span><span class=tag>"+esc(lvt(x.l))+"</span></div><b style='font-size:1rem'>"+esc(x.t)+"</b>"+(x.n?"<div class=note style='margin:0'>"+esc(x.n)+"</div>":"")+"<div class=note style='margin:0'>ដោយ "+esc(teacherOf(x.o).name||x.by||"")+" · "+esc(fdd(x.d))+"</div><div style='margin-top:auto;display:flex;gap:6px;flex-wrap:wrap'>"+(u?"<a class='primary lnk' href='"+esc(u)+"' target=_blank rel='noopener noreferrer'>"+(+x.c===3?"▶ មើលវិដេអូ":"📂 បើកឯកសារ")+"</a>":"")+(ok?"<button data-le='"+x.u+"'>កែ</button><button class=danger data-ld='"+x.u+"'>លុប</button>":"")+"</div></div>"}).join(""):"<p class=empty style='grid-column:1/-1'>មិនទាន់មានឯកសារក្នុងចំណាត់ថ្នាក់នេះទេ។ ចុច «+ បន្ថែមឯកសារ»។</p>";
}
$("lbQ").oninput=renderL;$("lbL").onchange=renderL;
$("lbS").onclick=function(e){var b=e.target.closest("button");if(b){lbc=b.dataset.lc;renderL()}};
function lbOpen(x){
  lbEd=x?x.u:null;$("dLbH").textContent=x?"កែឯកសារ":"បន្ថែមឯកសារជំនួយ";
  $("dLbC").innerHTML=LBC.map(function(c,i){return"<option value='"+i+"'"+(x&&String(x.c)===String(i)||(!x&&lbc===String(i))?" selected":"")+">"+LBI[i]+" "+esc(c)+"</option>"}).join("");
  $("dLbL").innerHTML=lvOpts(x?(x.l||""):"",false);
  $("dLbT").value=x?x.t:"";$("dLbK").value=x?x.k:"";$("dLbN").value=x?(x.n||""):"";$("dlgLb").showModal();
}
$("lbA").onclick=function(){lbOpen(null)};
$("cxLb").onclick=function(){$("dlgLb").close()};
$("okLb").onclick=function(){
  var t=$("dLbT").value.trim(),k=safeUrl($("dLbK").value);
  if(!t||!k){alert("សូមបញ្ចូលចំណងជើង និងតំណ (Link) ដែលត្រឹមត្រូវ (ឧ. Google Drive, YouTube)!");return}
  var rec={c:$("dLbC").value,l:$("dLbL").value,t:t,k:k,n:$("dLbN").value.trim()};
  if(lbEd){var x=lib.i.filter(function(q){return q.u===lbEd})[0];if(x)for(var f in rec)x[f]=rec[f]}
  else{rec.u=uid("l");rec.o=who.id;rec.by=who.name;rec.d=new Date().toISOString().slice(0,10);lib.i.push(rec)}
  savL();$("dlgLb").close();renderL();notify("បានរក្សាទុកឯកសារ");
};
$("lbG").onclick=function(e){
  var b=e.target.closest("button");if(!b)return;
  var isAdmin=(isAdm());
  var id=b.dataset.le||b.dataset.ld,x=lib.i.filter(function(q){return q.u===id})[0];if(!x||!(isAdmin||who.id===x.o))return;
  if(b.dataset.le)lbOpen(x);
  else if(confirm("តើអ្នកពិតជាចង់លុបឯកសារ «"+x.t+"» មែនទេ?")){lib.i=lib.i.filter(function(q){return q.u!==id});savL();renderL()}
};

/* មុខងារប្ដូរផ្ទាំង (Tabs) */
function show(p){
  ["p0","p1","p2","p4","p5","p6","p7","p8","p9","p10","p11","p12","p13","p14","p15"].forEach(function(x){$(x).hidden=x!==p});
  [].forEach.call(document.querySelectorAll("#tabs button"),function(b){b.setAttribute("aria-selected",b.dataset.p===p)});
  if(p==="p1")render();
  if(p==="p2"){renderK();renderS()}
  if(p==="p4")renderX();
  if(p==="p5")renderR();
  if(p==="p6")renderO();
  if(p==="p7")renderV();
  if(p==="p8")renderP();
  if(p==="p9")renderW();
  if(p==="p10")renderA();
  if(p==="p11")renderL();
  if(p==="p12"&&window.renderSched)renderSched();
  if(p==="p13"&&window.renderTS)renderTS();
  if(p==="p14"&&window.renderCx)renderCx();
  if(p==="p15"&&window.renderCur)renderCur();
  if(p==="p0")renderDash();syncNav(p);
}
$("tabs").onclick=function(e){var b=e.target.closest("button");if(b)show(b.dataset.p)};

/* ===== Dashboard ទំនើប៖ បដាស្វាគមន៍ + កាតស្ថិតិ (Bento) + ម៉ឺនុយអណ្ដែត (modern.css) ===== */
var FN=[["p0","🏠","ទំព័រដើម"],["p1","👥","គ្រូ"],["p2","📋","កិច្ចការ"],["p4","🎓","និទស្សន៍"],["p5","📊","លទ្ធផល"],["p6","🔍","សង្កេត"],["p7","📈","ក្រាហ្វិក"],["p8","🧑‍🎓","សិស្ស"],["p9","📝","របាយការណ៍"],["p10","🏆","ស្នាដៃ"],["p11","📚","ឯកសារ"],["p12","🗓️","កាលវិភាគ"],["p13","⏱️","Timesheet"],["p14","📖","សម្រង់អត្ថបទ"],["p15","📘","កម្មវិធីសិក្សា"]];
function buildFnav(){
  var full={};[].forEach.call(document.querySelectorAll("#tabs button"),function(b){full[b.dataset.p]=b.textContent});
  $("fnav").innerHTML=FN.filter(function(x){return x[0]!=="p6"&&x[0]!=="p7"&&x[0]!=="p9"&&x[0]!=="p11"&&x[0]!=="p13"&&x[0]!=="p14"&&x[0]!=="p15"}).map(function(x){
    if(x[0]==="p4")x=["p4","🎓","និទស្សន៍·សង្កេត"];
    if(x[0]==="p5")x=["p5","📊","លទ្ធផលសិក្សា"];
    if(x[0]==="p2")x=["p2","📋","ការងាររដ្ឋបាល"];
    if(x[0]==="p12")x=["p12","🗓️","គ្រប់គ្រងថ្នាក់រៀន"];
    if(x[0]==="p10")x=["p10","📚","ឯកសារផ្សេងៗ"];
    return "<button type=button class=nav-item data-p='"+x[0]+"' title='"+esc(full[x[0]]||x[2])+"' aria-label='"+esc(full[x[0]]||x[2])+"'><span class=ni-ico aria-hidden=true>"+x[1]+"</span><span class=ni-lbl>"+x[2]+"</span></button>";
  }).join("");
  $("fnav").insertAdjacentHTML("afterbegin","<button type=button class='nav-item nav-more' id=fnMore aria-haspopup=dialog aria-label='ម៉ឺនុយមុខងារទាំងអស់'><span class=ni-ico aria-hidden=true>☰</span><span class=ni-lbl>ទាំងអស់</span></button>");
  var m=$("allMenu");if(!m){m=document.createElement("div");m.id="allMenu";m.hidden=true;m.setAttribute("role","dialog");m.setAttribute("aria-label","មុខងារទាំងអស់");document.body.appendChild(m);
    m.onclick=function(e){var b=e.target.closest("button[data-p]");if(b){m.hidden=true;show(b.dataset.p);return}if(e.target===m||e.target.closest(".am-x"))m.hidden=true};
    document.addEventListener("keydown",function(e){if(e.key==="Escape")m.hidden=true})}
  m.innerHTML="<div class=am-box><div class=am-h><b>មុខងារទាំងអស់</b><button type=button class=am-x aria-label='បិទ'>✕</button></div><div class=am-g>"+FN.map(function(x){return"<button type=button data-p='"+x[0]+"'><span aria-hidden=true>"+x[1]+"</span><em>"+esc(full[x[0]]||x[2])+"</em></button>"}).join("")+"</div></div>";
}
document.addEventListener("click",function(e){var g=e.target.closest(".gseg button[data-go]");if(g)show(g.dataset.go)});
$("fnav").onclick=function(e){
  if(e.target.closest("#fnMore")){$("allMenu").hidden=false;return}
  var b=e.target.closest("button[data-p]");if(b)show(b.dataset.p)};
/* ម៉ឺនុយចំហៀងខាងឆ្វេង (អេក្រង់ធំ ≥1200px)៖ ស្លាយចេញ/ចូល · ចងចាំស្ថានភាពក្នុង localStorage */
var SNG=[["ទូទៅ",["p0","p1"]],["ការងាររដ្ឋបាល",["p2","p9","p13"]],["និទស្សន៍ · សង្កេត",["p4","p6"]],["លទ្ធផលសិក្សា",["p5","p7","p8"]],["គ្រប់គ្រងថ្នាក់រៀន",["p12","p14","p15"]],["ឯកសារ",["p10","p11"]]];
function buildSnav(){
  var ic={},full={};FN.forEach(function(x){ic[x[0]]=x[1]});
  [].forEach.call(document.querySelectorAll("#tabs button"),function(b){full[b.dataset.p]=b.textContent.replace(/^[០-៩]+\.\s*/,"")});
  $("snList").innerHTML=SNG.map(function(g){
    return"<div class=sn-g><div class=sn-h>"+esc(g[0])+"</div>"+g[1].map(function(p){return"<button type=button class=sn-i data-p='"+p+"'><span aria-hidden=true>"+ic[p]+"</span><em>"+esc(full[p]||"")+"</em></button>"}).join("")+"</div>"}).join("");
}
function snTop(){var h=document.querySelector("#appSection header");$("snav").style.top=Math.max(0,h?h.getBoundingClientRect().bottom:0)+"px"}
(function(){
  var open=true;try{open=localStorage.getItem("snav")!=="0"}catch(x){}
  function set(o){open=o;document.body.classList.toggle("sn-off",!o);$("snTog").setAttribute("aria-expanded",String(o));$("snTog").textContent=o?"‹":"›";try{localStorage.setItem("snav",o?"1":"0")}catch(x){}}
  set(open);snTop();
  window.addEventListener("resize",snTop);window.addEventListener("scroll",snTop,{passive:true});
  $("snTog").onclick=function(){set(!open)};
  $("snList").onclick=function(e){var b=e.target.closest("button[data-p]");if(b)show(b.dataset.p)};
})();
function syncNav(p){
  snTop();
  [].forEach.call(document.querySelectorAll("#snList button"),function(b){var on=b.dataset.p===p;b.classList.toggle("active",on);if(on)b.setAttribute("aria-current","page");else b.removeAttribute("aria-current")});
  [].forEach.call(document.querySelectorAll("#fnav button"),function(b){
    var on=b.dataset.p===p||(b.dataset.p==="p4"&&p==="p6")||(b.dataset.p==="p5"&&p==="p7")||(b.dataset.p==="p2"&&(p==="p9"||p==="p13"))||(b.dataset.p==="p10"&&p==="p11")||(b.dataset.p==="p12"&&(p==="p14"||p==="p15"));b.classList.toggle("active",on);
    if(on)b.setAttribute("aria-current","page");else b.removeAttribute("aria-current");
  });
}
function pad2(n){return(n<10?"0":"")+n}
/* ===== ប្រវត្តិរូបគ្រូ (Profile) — រូបថត + ព័ត៌មានផ្ទាល់ខ្លួន ដែលគ្រូកែបានដោយខ្លួនឯង =====
   រក្សាទុកក្នុង Firestore: profiles/{ID}  (ម្ចាស់ ឬ Admin សរសេរ · គ្រូទាំងអស់អាន) */
var profs={},pfPhoto="";
var PHOTO_RE=/^data:image\/jpeg;base64,[A-Za-z0-9+\/=]+$/;
function okPhoto(s){return typeof s==="string"&&s.length<90000&&PHOTO_RE.test(s)}
function tinfo(t){
  var p=profs[String(t.id).toUpperCase()];if(!p)return t;
  var o=Object.assign({},t);["ph","ad","dob","g"].forEach(function(k){if(p[k])o[k]=p[k]});return o;
}
function avInner(id,name){
  var p=profs[String(id).toUpperCase()];
  if(p&&okPhoto(p.photo))return"<img src='"+p.photo+"' alt=''>";
  return esc(Array.from(String(name||id).trim())[0]||"?");
}
function avHtml(id,name,sz){
  var p=profs[String(id).toUpperCase()],s=sz||28;
  if(p&&okPhoto(p.photo))return"<img class=av src='"+p.photo+"' alt='' width="+s+" height="+s+" style='width:"+s+"px;height:"+s+"px'>";
  return"<span class=av-i style='width:"+s+"px;height:"+s+"px;font-size:"+Math.round(s*.48)+"px'>"+esc(Array.from(String(name||id).trim())[0]||"?")+"</span>";
}
function curPage(){return["p0","p1","p2","p4","p5","p6","p7","p8","p9","p10","p11","p12","p13","p14","p15"].filter(function(x){return !$(x).hidden})[0]||"p0"}
function subProfiles(){
  try{
    var un=window.FB.onSnapshot(window.FB.collection(window.db,"profiles"),function(sn){
      var o={};sn.forEach(function(d){var v=d.data();if(v&&v.o)o[String(v.o).toUpperCase()]=v});
      profs=o;updateUserInfo();
      var c=curPage();if(c==="p0")renderDash();else if(c==="p1")render();
    },function(err){console.error("profiles:",err)});
    unsubs.push(un);
  }catch(e){console.error(e)}
}
function paintPf(){
  var box=$("pfPhoto"),nm=($("pfName").value||who.id);
  box.innerHTML=pfPhoto&&okPhoto(pfPhoto)?"<img src='"+pfPhoto+"' alt=''>":"<span>"+esc(Array.from(nm.trim())[0]||"?")+"</span>";
  $("pfDel").hidden=!pfPhoto;
}
function openProfile(){
  if(!who)return;
  var t=data.filter(function(x){return x.id===who.id})[0]||{},p=profs[who.id]||{};
  $("pfId").value=who.id;$("pfName").value=who.name||t.name||who.id;
  $("pfRole").value=isAdm()?"អ្នកគ្រប់គ្រង":(who.rl||t.rl||"សមាជិក");
  $("pfG").value=p.g||t.g||"";$("pfDob").value=p.dob||t.dob||"";
  $("pfPh").value=p.ph||t.ph||"";$("pfAd").value=p.ad||t.ad||"";$("pfBio").value=p.bio||"";
  pfPhoto=okPhoto(p.photo)?p.photo:"";paintPf();
  $("dlgProf").showModal();
}
function shrinkPhoto(file,cb){
  if(!/^image\//.test(file.type)){alert("សូមជ្រើសរើសឯកសាររូបភាព!");return}
  if(file.size>12*1024*1024){alert("រូបភាពធំពេក (អតិបរមា ១២MB)!");return}
  var r=new FileReader();
  r.onload=function(e){
    var im=new Image();
    im.onload=function(){
      var s=Math.min(im.width,im.height),cv=document.createElement("canvas"),N=240;
      cv.width=cv.height=N;var cx=cv.getContext("2d");
      cx.fillStyle="#fff";cx.fillRect(0,0,N,N);
      cx.drawImage(im,(im.width-s)/2,(im.height-s)/2,s,s,0,0,N,N);
      cb(cv.toDataURL("image/jpeg",.82));
    };
    im.onerror=function(){alert("មិនអាចអានរូបភាពនេះបានទេ!")};
    im.src=e.target.result;
  };
  r.readAsDataURL(file);
}
$("btnProf").onclick=openProfile;
$("wbAvatar").onclick=openProfile;
$("pfPick").onclick=function(){$("pfFile").click()};
$("pfFile").onchange=function(e){
  var f=e.target.files[0];e.target.value="";if(!f)return;
  shrinkPhoto(f,function(d){pfPhoto=d;paintPf()});
};
$("pfDel").onclick=function(){pfPhoto="";paintPf()};
$("cxProf").onclick=function(){$("dlgProf").close()};
$("fProf").onsubmit=function(e){
  e.preventDefault();
  if(!who||!window.FB)return;
  var dob=$("pfDob").value.trim();
  if(dob&&!/^\d{4}-\d{2}-\d{2}$/.test(dob)){alert("ថ្ងៃខែឆ្នាំកំណើតមិនត្រឹមត្រូវ!");return}
  var rec={o:who.id,g:$("pfG").value,dob:dob,ph:$("pfPh").value.trim().slice(0,40),ad:$("pfAd").value.trim().slice(0,200),bio:$("pfBio").value.trim().slice(0,500),photo:pfPhoto,u:new Date().toISOString()};
  var btn=$("okProf");btn.disabled=true;
  window.FB.setDoc(window.FB.doc(window.db,"profiles",who.id),rec).then(function(){
    profs[who.id]=rec;$("dlgProf").close();updateUserInfo();
    var c=curPage();if(c==="p0")renderDash();else if(c==="p1")render();
    notify("បានរក្សាទុកប្រវត្តិរូបរបស់អ្នក!");
  }).catch(function(e2){alert(e2&&e2.code==="permission-denied"?"គ្មានសិទ្ធិរក្សាទុកប្រវត្តិរូបទេ។ សូមប្រាប់អ្នកគ្រប់គ្រងឱ្យ Publish firestore.rules កំណែថ្មី (មាន profiles)។":authErr(e2))})
    .then(function(){btn.disabled=false});
};

/* ===== Dashboard — ទំព័រដើម (ស្ដង់ដារ៖ ស្វាគមន៍ · ស្ថិតិ · ចូលរហ័ស · លទ្ធផល · កាលវិភាគខាងមុខ · សកម្មភាពថ្មីៗ) ===== */
var DAYF=["អាទិត្យ","ច័ន្ទ","អង្គារ","ពុធ","ព្រហស្បតិ៍","សុក្រ","សៅរ៍"];
function curMK(){var m=new Date().getMonth()+1,i=[10,11,12,1,2,3,4,5,6,7,8].indexOf(m);return i}
function ymNow(){var d=new Date();return d.getFullYear()+"-"+pad2(d.getMonth()+1)}
function syStart(){var d=new Date(),y=d.getMonth()+1>=10?d.getFullYear():d.getFullYear()-1;return y+"-10-01"}
function allCls(ids){var o=[];ids.forEach(function(id){(rs.c&&rs.c[id]||[]).forEach(function(c){o.push({c:c,o:id})})});return o}
function dCard(num,lbl,col){return"<div class=modern-card><h3 style='font-size:28px;color:"+col+";font-weight:bold'>"+num+"</h3><p style='color:var(--text-muted)'>"+esc(lbl)+"</p></div>"}
function dEmpty(t){return"<p class=note style='margin:0'>"+t+"</p>"}
function renderDash(){
  if(!who||$("p0").hidden)return;
  var adm=isAdm(),me=who.id,hr=new Date().getHours(),g=hr<12?["Good Morning","☀️"]:hr<17?["Good Afternoon","🌤️"]:["Good Evening","🌙"],now=new Date();
  /* បដាស្វាគមន៍ */
  $("wbName").textContent=g[0]+", "+who.name+"! "+g[1];
  $("wbDate").textContent="ថ្ងៃ"+DAYF[now.getDay()]+" ទី"+kn(now.getDate())+" ខែ"+M[now.getMonth()]+" ឆ្នាំ"+kn(now.getFullYear());
  $("wbAvatar").innerHTML=avInner(me,who.name);
  var ids=adm?data.map(function(t){return t.id}):[me],cls=allCls(ids),stu=cls.reduce(function(s,x){return s+x.c.st.length},0);
  var mk=curMK(),tk=0;
  if(mk>=0)ids.forEach(function(id){((gk(id).w[mk])||[]).forEach(function(r){tk+=sm(r||[])})});
  var ym=ymNow(),rep=0;ids.forEach(function(id){rep+=(wr.r[id]||[]).filter(function(e){return(e.d||"").slice(0,7)===ym}).length});
  var s0=syStart(),ach=0;ids.forEach(function(id){ach+=(ah.r[id]||[]).filter(function(e){return(e.d||"")>=s0}).length});
  var k=[];
  if(adm){
    k.push(dCard(pad2(data.length),"គ្រូបង្រៀនសរុប","#a855f7"),dCard(pad2(data.filter(function(t){return t.stt==="កំពុងបម្រើការងារ"}).length),"កំពុងបំពេញការងារ","#10b981"));
  }
  k.push(dCard(pad2(cls.length),adm?"ថ្នាក់សរុប":"ថ្នាក់របស់ខ្ញុំ","#38bdf8"),dCard(stu,adm?"សិស្សសរុប":"សិស្សរបស់ខ្ញុំ","#f59e0b"),
    dCard(tk,"កិច្ចតែងការខែនេះ","#ec4899"),dCard(rep,"សកម្មភាពរបាយការណ៍ខែនេះ","#8b5cf6"),dCard(ach,"ស្នាដៃឆ្នាំសិក្សានេះ","#14b8a6"));
  $("dKpi").innerHTML=k.join("");
  /* ចូលរហ័ស */
  var qa=[["p5","📊","បញ្ចូលពិន្ទុសិស្ស","លទ្ធផលសិក្សា"],["p8","🧑‍🎓","សិស្ស និងអវត្តមាន","បញ្ជី · អវត្តមាន"],["p2","📋","កិច្ចតែងការ","ចំនួនប្រចាំខែ"],["p9","📝","របាយការណ៍ការងារ","ប្រចាំខែ"],["p10","🏆","ស្នាដៃរបស់ខ្ញុំ","កត់ត្រា · បោះពុម្ព"],["p11","📚","ឯកសារជំនួយ","កិច្ចតែងការ · ស្លាយ · វីដេអូ"],["p12","🗓️","កាលវិភាគបង្រៀន","តារាង ១១ ម៉ោង"],["p13","⏱️","Timesheet & Workplan","ប្រចាំខែ · ប្រតិទិនខ្មែរ"],["prof","👤","ប្រវត្តិរូបរបស់ខ្ញុំ","រូបថត · ព័ត៌មាន"]];
  if(adm)qa.unshift(["p1","👥","ទិន្នន័យគ្រូ","គ្រប់គ្រងគណនី"]);
  $("dQa").innerHTML=qa.map(function(x){return"<button type=button class=qa data-go='"+x[0]+"'><span class=qi aria-hidden=true>"+x[1]+"</span><b>"+x[2]+"</b><span class=qs>"+x[3]+"</span></button>"}).join("");
  /* លទ្ធផលសិក្សា (និទ្ទេស) */
  var per=0,PN=["","ឆមាសទី១","ឆមាសទី២","ប្រចាំឆ្នាំ"];
  [3,2,1].forEach(function(p){if(!per&&cls.some(function(x){var o=cnt(x.c,p);return o.A+o.B+o.C+o.D+o.E+o.F>0}))per=p});
  var h="<h3>📊 លទ្ធផលសិក្សា"+(per?" — "+PN[per]:"")+"</h3>";
  if(!per)h+=dEmpty("មិនទាន់មានទិន្នន័យពិន្ទុគ្រប់គ្រាន់ទេ។ សូមចូលទៅ «បញ្ចូលពិន្ទុសិស្ស»។");
  else{
    h+=lgd();
    if(adm){
      data.forEach(function(t){var o={A:0,B:0,C:0,D:0,E:0,F:0};allCls([t.id]).forEach(function(x){var q=cnt(x.c,per);for(var gg in q)o[gg]+=q[gg]});h+=stackBar(t.name,o)});
    }else cls.forEach(function(x){h+=stackBar(x.c.n,cnt(x.c,per))});
    var tot={A:0,B:0,C:0,D:0,E:0,F:0};cls.forEach(function(x){var q=cnt(x.c,per);for(var gg in q)tot[gg]+=q[gg]});
    var n=tot.A+tot.B+tot.C+tot.D+tot.E+tot.F;
    h+="<p class=note style='margin:8px 0 0'>អត្រាជាប់ (A–E)៖ <b>"+(n?((n-tot.F)/n*100).toFixed(1)+"%":"—")+"</b> · សិស្សមាននិទ្ទេស "+n+" នាក់</p>";
  }
  $("dRes").innerHTML=h;
  /* កាលវិភាគខាងមុខ */
  var t0=new Date();t0.setHours(0,0,0,0);var ev=[];
  ex.r.forEach(function(r,i){if(!adm&&r.t!==me)return;var d=xdate(i);if(d>=t0)ev.push({d:d,k:"🎓 ថ្នាក់និទស្សន៍",w:adm?tn(r.t):"",tm:r.tm,x:r.sc,go:"p4"})});
  ob.r.forEach(function(r,i){
    if(!adm&&r.t!==me&&r.o!==me)return;var d=odt(i);if(!(d>=t0))return;
    var k=adm?"🔍 សង្កេតថ្នាក់":(r.t===me?"🔍 ត្រូវគេមកសង្កេតថ្នាក់អ្នក":"🔍 ត្រូវទៅសង្កេតថ្នាក់");
    ev.push({d:d,k:k,w:adm?(tn(r.o)+" → "+tn(r.t)):(r.t===me?"អ្នកសង្កេត៖ "+tn(r.o):"គ្រូ៖ "+tn(r.t)),tm:r.tm,x:r.cl,go:"p6"});
  });
  ev.sort(function(a,b){return a.d-b.d});ev=ev.slice(0,6);
  $("dUp").innerHTML="<h3>🗓️ កាលវិភាគខាងមុខ</h3>"+(ev.length?ev.map(function(e){
    return"<div class=up-row data-go='"+e.go+"' role=button tabindex=0><div class=up-d><b>"+kn(e.d.getDate())+"</b><span>"+esc(M[e.d.getMonth()])+"</span></div><div style='min-width:0'><div><b>"+e.k+"</b></div><div class=note style='margin:0'>ថ្ងៃ"+DAYF[e.d.getDay()]+(e.tm?" · "+esc(e.tm):"")+(e.w?" · "+esc(e.w):"")+(e.x?" · "+esc(e.x):"")+"</div></div></div>"}).join(""):dEmpty("មិនមានកាលវិភាគខាងមុខទេ។"));
  /* ស្នាដៃថ្មីៗ */
  var al=[];ids.forEach(function(id){(ah.r[id]||[]).forEach(function(e){al.push({e:e,o:id})})});
  al.sort(function(a,b){return(b.e.d||"").localeCompare(a.e.d||"")});al=al.slice(0,5);
  $("dAch").innerHTML="<h3>🏆 ស្នាដៃថ្មីៗ</h3>"+(al.length?al.map(function(x){
    return"<div class=up-row><div class=up-d><b>"+kn(+(x.e.d||"").slice(8,10)||0)+"</b><span>"+esc(M[(+(x.e.d||"").slice(5,7)||1)-1])+"</span></div><div style='min-width:0'><div><b>"+esc(x.e.t)+"</b></div><div class=note style='margin:0'>"+esc(AHC[+x.e.c]||"")+" · "+esc(lvt(x.e.l))+(adm?" · "+esc(tn(x.o)):"")+"</div></div></div>"}).join(""):dEmpty("មិនទាន់មានស្នាដៃទេ។ ចុច «ស្នាដៃរបស់ខ្ញុំ» ដើម្បីកត់ត្រា។"));
  /* ឯកសារជំនួយថ្មីៗ */
  var ll=lib.i.slice().sort(function(a,b){return(b.d||"").localeCompare(a.d||"")}).slice(0,5);
  $("dLib").innerHTML="<h3>📚 ឯកសារជំនួយថ្មីៗ</h3>"+(ll.length?ll.map(function(x){
    var u=safeUrl(x.k);
    return"<div class=up-row><div class=up-d style='font-size:1.3rem'>"+(LBI[+x.c]||"📎")+"</div><div style='min-width:0;flex:1'><div><b>"+esc(x.t)+"</b></div><div class=note style='margin:0'>"+esc(LBC[+x.c]||"")+" · "+esc(lvt(x.l))+" · "+esc(tn(x.o)||x.by||"")+"</div></div>"+(u?"<a class=lnk href='"+esc(u)+"' target=_blank rel='noopener noreferrer'>បើក</a>":"")+"</div>"}).join(""):dEmpty("មិនទាន់មានឯកសារទេ។"));
  /* Admin៖ ចំណុចត្រូវយកចិត្តទុកដាក់ */
  var A=$("dAdm");A.hidden=!adm;
  if(adm){
    var noAcc=data.filter(function(t){return !usersById[t.id]}),noRep=data.filter(function(t){return !(wr.r[t.id]||[]).some(function(e){return(e.d||"").slice(0,7)===ym})}),noCls=data.filter(function(t){return !((rs.c&&rs.c[t.id])||[]).length});
    function chips(a,empty){return a.length?a.map(function(t){return"<span class=tag>"+esc(t.name)+"</span>"}).join(""):"<span class=note style='margin:0'>"+empty+"</span>"}
    A.innerHTML="<h3>⚠️ ចំណុចត្រូវយកចិត្តទុកដាក់ (Admin)</h3><div class=attn><div><b>មិនទាន់មានគណនី Login ("+noAcc.length+")</b><div>"+chips(noAcc,"✅ គ្រប់គ្នាមានគណនីរួចហើយ")+"</div></div><div><b>មិនទាន់មានរបាយការណ៍ខែនេះ ("+noRep.length+")</b><div>"+chips(noRep,"✅ គ្រប់គ្នាមានរបាយការណ៍")+"</div></div><div><b>មិនទាន់មានថ្នាក់ក្នុងប្រព័ន្ធពិន្ទុ ("+noCls.length+")</b><div>"+chips(noCls,"✅ គ្រប់គ្នាមានថ្នាក់")+"</div></div></div>";
  }
  /* ការជូនដំណឹង (🔔)៖ កាលវិភាគក្នុង ៧ ថ្ងៃខាងមុខ + ការងារដែលនៅខ្វះ */
  var nt=[],t7=new Date(t0);t7.setDate(t7.getDate()+7);
  ev.forEach(function(e){if(e.d<t7)nt.push(["🗓️",e.k,"ថ្ងៃ"+DAYF[e.d.getDay()]+" "+kn(e.d.getDate())+" "+M[e.d.getMonth()]+(e.tm?" · "+e.tm:"")+(e.w?" · "+e.w:""),e.go])});
  if(adm){
    if(noAcc.length)nt.push(["🔐","គ្រូ "+kn(noAcc.length)+" នាក់មិនទាន់មានគណនី Login","ទិន្នន័យគ្រូ","p1"]);
    if(noRep.length)nt.push(["📝","គ្រូ "+kn(noRep.length)+" នាក់មិនទាន់មានរបាយការណ៍ខែនេះ","របាយការណ៍ការងារ","p9"]);
    if(noCls.length)nt.push(["📊","គ្រូ "+kn(noCls.length)+" នាក់មិនទាន់មានថ្នាក់ក្នុងប្រព័ន្ធពិន្ទុ","លទ្ធផលសិក្សា","p5"]);
  }else if(!rep)nt.push(["📝","អ្នកមិនទាន់មានរបាយការណ៍ខែនេះ","របាយការណ៍ការងារ","p9"]);
  var nc=$("ntCount");nc.hidden=!nt.length;nc.textContent=nt.length>9?"9+":kn(nt.length);
  $("ntBell").setAttribute("aria-label","ការជូនដំណឹង ("+nt.length+")");
  $("ntPanel").innerHTML="<h4>🔔 ការជូនដំណឹង</h4>"+(nt.length?nt.map(function(x){
    return"<button type=button class=nt-item role=menuitem data-go='"+x[3]+"'><span class=ni aria-hidden=true>"+x[0]+"</span><span><b>"+esc(x[1])+"</b><small>"+esc(x[2])+"</small></span></button>"}).join(""):"<div class=nt-empty>✅ មិនមានការជូនដំណឹងថ្មីទេ</div>");
}
/* ប៊ូតុង 🔔៖ បើក/បិទបញ្ជី · ចុចក្រៅ ឬ Esc ដើម្បីបិទ */
(function(){
  var bt=$("ntBell"),pn=$("ntPanel");
  function close(f){pn.hidden=true;bt.setAttribute("aria-expanded","false");if(f)bt.focus()}
  bt.addEventListener("click",function(e){e.stopPropagation();var open=pn.hidden;pn.hidden=!open;bt.setAttribute("aria-expanded",String(open))});
  pn.addEventListener("click",function(e){if(e.target.closest("[data-go]"))close()});
  document.addEventListener("click",function(e){if(!pn.hidden&&!pn.contains(e.target)&&!bt.contains(e.target))close()});
  document.addEventListener("keydown",function(e){if(e.key==="Escape"&&!pn.hidden)close(true)});
})();
$("p0").addEventListener("click",function(e){
  var b=e.target.closest("[data-go]");if(!b)return;
  if(b.dataset.go==="prof")openProfile();else show(b.dataset.go);
});
$("p0").addEventListener("keydown",function(e){
  if(e.key!=="Enter"&&e.key!==" ")return;var b=e.target.closest(".up-row[data-go]");if(b){e.preventDefault();show(b.dataset.go)}
});

buildFnav();buildSnav();

/* មុខងារ Backup, Restore, Print និង Theme */
function validBackup(o){
  if(!o||typeof o!=="object"||!Array.isArray(o.teachers))return false;
  var ok=o.teachers.every(function(t){return t&&typeof t==="object"&&typeof t.id==="string"&&/^[A-Za-z0-9_-]{1,20}$/.test(t.id)&&typeof t.name==="string"});
  if(!ok)return false;
  var objs=["tasks","demo","results","obs","reports","achievements","library"];
  return objs.every(function(k){return o[k]==null||typeof o[k]==="object"});
}
$("btnBackup").onclick=function(){
  var payload={version:4,date:new Date().toISOString(),teachers:data.map(function(t){var c=Object.assign({},t);delete c.pw;return c}),tasks:tasks,demo:ex,results:rs,obs:ob,reports:wr,achievements:ah,library:lib};
  var a=document.createElement("a");
  a.href=URL.createObjectURL(new Blob([JSON.stringify(payload,null,2)],{type:"application/json"}));
  a.download="teacher-system-backup-"+new Date().toISOString().slice(0,10)+".json";
  document.body.appendChild(a);a.click();a.remove();
  notify("បានទាញយកឯកសារបម្រុងទុក (Backup) រួចរាល់!");
};

$("btnRestore").onclick=function(){
  var isAdmin = (isAdm());
  if(!isAdmin) { alert("មានតែអ្នកគ្រប់គ្រង (Admin) ទេដែលអាចបម្រុងទុក ឬទាញយកទិន្នន័យចូលវិញ!"); return; }
  $("fileRestore").click();
};
$("fileRestore").onchange=function(e){
  var file=e.target.files[0];if(!file)return;
  var reader=new FileReader();
  reader.onload=function(ev){
    try{
      var obj=JSON.parse(ev.target.result);
      if(!validBackup(obj))throw new Error("Invalid format");
      if(confirm("តើអ្នកពិតជាចង់បញ្ចូលទិន្នន័យពីឯកសារនេះជំនួសទិន្នន័យបច្ចុប្បន្នមែនទេ?")){
        $("btnBackup").onclick();
        data=obj.teachers.map(function(t){var c=Object.assign({},t);delete c.pw;return c});
        if(obj.tasks)tasks=obj.tasks;
        if(obj.demo)ex=obj.demo;
        if(obj.results)rs=obj.results;
        if(obj.obs)ob=obj.obs;
        if(obj.reports)wr=obj.reports;
        if(obj.achievements)ah=obj.achievements;
        if(obj.library)lib=obj.library;
        save();savX();savR();saveO();savW();savA();savL();
        render();renderK();renderS();renderX();renderR();renderO();
        notify("បានបញ្ចូលទិន្នន័យមកវិញដោយជោគជ័យ!");
      }
    }catch(err){alert("ឯកសារមិនត្រឹមត្រូវ ឬខូចទ្រង់ទ្រាយ!")}
    e.target.value="";
  };
  reader.readAsText(file);
};

$("btnPrint").onclick=function(){window.print()};
$("btnTheme").onclick=function(){
  var curTheme=document.documentElement.getAttribute("data-theme");
  var next=curTheme==="dark"?"light":"dark";
  document.documentElement.setAttribute("data-theme",next);
};
var OK="teachers-v4-o",OC=[{"t": "ការរៀបចំ", "q": "តើគ្រូបង្រៀន...", "items": ["រៀបចំខ្លួនសមរម្យល្អកម្រិតណា (ឯកសណ្ឋាន)?", "មានសមា្ភរៈឧបទ្ទេសដើម្បីប្រើប្រាស់បានល្អកម្រិតណា (វីដេអូ សន្លឹកកិច្ចការ កិច្ចតែងការ...)?", "ប្រើប្រាស់គម្រូថ្នាក់រៀនត្រឡប់ (Flipped-Classroom) បានល្អកម្រិតណា?", "បានរៀបចំការអង្គុយរបស់សិស្ស ស្របតាមវិធីសាស្ត្របង្រៀនល្អកម្រិតណា?"], "max": 20}, {"t": "ការបង្រៀន", "q": "តើគ្រូបង្រៀន...", "items": ["បានប្រាប់សិស្សពីអ្វីដែលពួកគេនឹងរៀនក្នុងមេរៀននេះល្អកម្រិតណា (ប្រធានបទ វត្ថុបំណង...)?", "បានប្រើវិធីបង្រៀនបែបសតវត្សទី២១ មួយណា និងល្អកម្រិតណា?", "បានប្រើប្រភេទផ្សេងគ្នានៃសំណួរតាមកម្រិត ប្លូមតាក់សូណូមីកម្រិតណា? (ឧ. ចងចាំ, យល់ដឹង, អនុវត្ត វិភាគ វាយតម្លៃ បង្កើតថ្មី)", "បានលើកឧទាហរណ៍ និងពន្យល់បន្ថែមល្អកម្រិតណា?", "បានដឹកនាំសកម្មភាពបង្រៀនដោយលើកកម្ពស់ការគិតបែបស៊ីជម្រៅកម្រិតណា?", "បានផ្ដល់មតិយោបល់វិជ្ជមាន ដើម្បីជំរុញការរៀនសូត្រ និងទំនុកចិត្តដល់សិស្សសមរម្យកម្រិតណា?", "បានជួយសិស្សម្នាក់ៗមានឱកាសបញ្ចេញសមត្ថភាពរបស់ពួកគេ និងសកម្មកម្រិតណា?", "បានផ្តល់កិច្ចការបន្ថែមដល់សិស្សរៀនលឿនល្អកម្រិតណា?", "បានបញ្ចូលល្បែងសិក្សាជំនួយដល់ការបង្រៀនល្អកម្រិតណា?", "បានប្រើប្រាស់សម្ភារៈឧបទេសក្នុងការបង្រៀនល្អកម្រិតណា?", "បានពន្យល់ខ្លឹមសារមេរៀនប្រទាក់ក្រឡាគ្នាល្អកម្រិតណា?", "បានសម្រេចវត្ថុបំណងនៃមេរៀនល្អកម្រិតណា?", "បានដើរតាមជំហាននៃកិច្ចតែងការបង្រៀនមានប្រសិទ្ធភាពកម្រិតណា?"], "max": 65}, {"t": "ការគ្រប់គ្រងថ្នាក់រៀន", "q": "តើគ្រូបង្រៀន...", "items": ["បានចាប់ផ្តើម និងបញ្ចប់ការបង្រៀនទាន់ពេលវេលាល្អកម្រិតណា?", "បានប្រើពេលឱ្យសិស្សធ្វើកិច្ចការមានប្រសិទ្ធភាពកម្រិតណា?", "បានណែនាំសិស្សឱ្យធ្វើការងារច្បាស់លាស់ល្អកម្រិតណា?", "បានប្រើពេលវេលាបង្រៀនមានប្រសិទ្ធភាពល្អកម្រិតណា? (ខ្លឹមសារមេរៀន ត្រូវនឹងរយៈពេល)", "បានគ្រប់គ្រងសកម្មភាពសិស្សក្នុងថ្នាក់ល្អកម្រិតណា?"], "max": 25}, {"t": "ឥរិយាបថ", "q": "តើគ្រូបង្រៀន...", "items": ["បានប្រើប្រាស់សម្លេងក្នុងពេលបង្រៀនលឺ និងច្បាស់លាស់ល្អកម្រិតណា?", "បានប្រើប្រាស់ពាក្យសំដីទៅកាន់សិស្សសមរម្យកម្រិតណា?", "បានប្រើប្រាស់ទឹកមុខដាក់សិស្សមានភាពទាក់ទាញកម្រិតណា?", "បានទទួលយកគំនិតខុសប្លែកគ្នារបស់សិស្សល្អកម្រិតណា?", "បានបង្ហាញពីកាយវិការដាក់សិស្សសមរម្យកម្រិតណា?"], "max": 25}, {"t": "ការរៀន", "q": "តើសិស្ស...", "items": ["មានឱកាសក្នុងការបញ្ចេញមតិផ្ទាល់ខ្លួនដល់កម្រិតណា?", "ចាប់អារម្មណ៍ និងចូលរួមនៅក្នុងការងាររបស់ពួកគេសកម្មកម្រិតណា?", "បានប្រើធនធានផ្សេងៗបន្ថែមលើសសៀវភៅសិក្សាគោលបានច្រើនល្អកម្រិតណា?"], "max": 15}, {"t": "ឥរិយាបថ", "q": "តើសិស្ស...", "items": ["មានការគោរពគ្រូ ពេលចូល ឬចេញសមរម្យកម្រិតណា?", "បានប្រើពាក្យសំដីសមរម្យទៅគ្រូរបស់ពួកគេល្អកម្រិតណា?", "បានសម្តែងអាកប្បកិរិយាពេញចិត្តក្នុងម៉ោងសិក្សាកម្រិតណា?"], "max": 15}],OL=["ល្អប្រសើរ", "ល្អ", "មធ្យម", "ត្រូវកែលម្អ"],ob=loadO(),oc=0,ov=1,om=0;
function defO(){var ids=data.map(function(t){return t.id}),r=[];
  for(var i=0;i<36;i++){r.push({t:ids.length?ids[i%ids.length]:"",o:ids.length?ids[(i+1)%ids.length]:"",sub:"គណិតវិទ្យា",cl:"",tm:"",rm:"",n:"",ab:"",ch:"",ls:"",ct:"",dt:"",sc:[],cm:[],g:["","","","","",""]})}
  return{d:2,y:2026,th:[90,75,50],r:r}}
function loadO(){try{var s=sessionStorage.getItem(OK);if(s)return JSON.parse(s)}catch(e){}return defO()}
function saveO(){try{sessionStorage.setItem(OK,JSON.stringify(ob));push("obs");}catch(e){}}
function omn(i){return XM[Math.floor(i/4)]}
function odt(i){var r=ob.r[i];if(r.dt){var p=r.dt.split("-");return new Date(+p[0],+p[1]-1,+p[2])}var m=omn(i),y=ob.y+(m>=11?0:1),w=new Date(y,m-1,1).getDay()||7;return new Date(y,m-1,1+((ob.d+1-w)%7+7)%7+7*(i%4))}
function gs(i,g){var r=ob.r[i],s=0,n=0,k0=0;for(var a=0;a<g;a++)k0+=OC[a].items.length;OC[g].items.forEach(function(_,j){var v=r.sc[k0+j];if(v!=null&&v!==""){s+=+v;n++}});return n?s:""}
function gt(i){var s=0,n=0;OC.forEach(function(_,g){var v=gs(i,g);if(v!==""){s+=v;n++}});return n?s:""}
function lvl(p){return p>=ob.th[0]/100?OL[0]:p>=ob.th[1]/100?OL[1]:p>=ob.th[2]/100?OL[2]:OL[3]}
function tots(i){var T=gt(i);return T===""?"សរុប៖ —":"សរុប៖ <b>"+T+" / 165</b> ("+(T/165*100).toFixed(1)+"%) · <b>"+lvl(T/165)+"</b>"}
function oopt(sel){return data.map(function(t){return"<option value='"+esc(t.id)+"'"+(t.id===sel?" selected":"")+">"+esc(t.name)+"</option>"}).join("")}
function renderO(){[1,2,3].forEach(function(n){$("ov"+n).hidden=n!==ov});
[].forEach.call(document.querySelectorAll("#oseg button"),function(b){b.setAttribute("aria-selected",+b.dataset.ov===ov)});
$("od").innerHTML=DY.map(function(d,i){return"<option value="+i+(i===ob.d?" selected":"")+">"+d+"</option>"}).join("");
$("oy").value=ob.y;
$("om").innerHTML="<option value=-1"+(om===-1?" selected":"")+">ទាំងអស់</option>"+XM.slice(0,9).map(function(m,i){return"<option value="+i+(i===om?" selected":"")+">"+M[m-1]+"</option>"}).join("");
if(ov===1)renderO1();if(ov===2)renderO2();if(ov===3)renderO3()}
function renderO1(){var b="";
ob.r.forEach(function(r,i){var mi=Math.floor(i/4);if(om!==-1&&mi!==om)return;var t=gt(i);
var isAdmin = (isAdm());
var canEditObs = (isAdmin || (who && who.id === r.o));
b+=(i%4===0?"<tr class=tr><td colspan=9>"+M[omn(i)-1]+" "+(ob.y+(omn(i)>=11?0:1))+"</td></tr>":"")+"<tr><td>"+(i+1)+"</td><td>សប្ដាហ៍ទី"+"១២៣៤"[i%4]+"</td><td><input type=date data-o='"+i+"|dt' value='"+iso(odt(i))+"' "+(isAdmin?"":"readonly")+"></td><td><select data-o='"+i+"|t' "+(isAdmin?"":"disabled")+">"+oopt(r.t)+"</select></td><td><select data-o='"+i+"|o' "+(canEditObs?"":"disabled")+">"+oopt(r.o)+"</select></td><td><select data-o='"+i+"|cl' "+(canEditObs?"":"disabled")+">"+sop(r.cl)+"</select></td><td><select data-o='"+i+"|tm' "+(canEditObs?"":"disabled")+">"+tmop(r.tm)+"</select></td><td>"+(t===""?"—":t+"/165 · <b>អ្វីជា…</b>")+"</td><td><button data-of='"+i+"'>បើកទម្រង់</button></td></tr>"});
$("ov1t").innerHTML="<thead><tr><th>ល.រ</th><th>សប្ដាហ៍</th><th>កាលបរិច្ឆេទ</th><th>គ្រូត្រូវសង្កេត</th><th>អ្នកសង្កេត</th><th>ថ្នាក់</th><th>ម៉ោង</th><th>លទ្ធផល</th><th></th></tr></thead><tbody>"+b+"</tbody>"}
function renderO2(){var i=oc,r=ob.r[i],h="";
$("oi").innerHTML=ob.r.map(function(x,k){return"<option value="+k+(k===i?" selected":"")+">"+(k+1)+". "+M[omn(k)-1]+" ស."+"១២៣៤"[k%4]+" — "+esc(tn(x.t))+"</option>"}).join("");
var isAdmin = (isAdm());
var canEditObs = (isAdmin || (who && who.id === r.o));

function F(l,x){return"<div><label>"+l+"</label>"+x+"</div>"}
function I(f,ty){return"<input "+(ty?"type="+ty+" ":"")+"data-f='"+f+"' value='"+esc(r[f])+"' "+(canEditObs?"":"readonly")+">"}
h+="<div class=card><h3>ផ្នែកទី១ ៖ សាវតាទូទៅ</h3><div class=fg>"+F("គ្រូត្រូវសង្កេត","<select data-f='t' "+(isAdmin?"":"disabled")+">"+oopt(r.t)+"</select>")+F("អ្នកសង្កេត","<select data-f='o' "+(isAdmin?"":"disabled")+">"+oopt(r.o)+"</select>")+F("មុខវិជ្ជា",I("sub"))+F("ថ្នាក់","<select data-f='cl' "+(canEditObs?"":"disabled")+">"+sop(r.cl)+"</select>")+F("កាលបរិច្ឆេទ","<input type=date data-f='dt' value='"+iso(odt(i))+"' "+(canEditObs?"":"readonly")+">")+F("ម៉ោង","<select data-f='tm' "+(canEditObs?"":"disabled")+">"+tmop(r.tm)+"</select>")+F("បន្ទប់",I("rm"))+F("សិស្សសរុប (នាក់)",I("n","number"))+F("អវត្តមាន (នាក់)",I("ab","number"))+F("ជំពូកទី",I("ch"))+F("មេរៀនទី",I("ls"))+F("ខ្លឹមសារ",I("ct"))+"</div></div>";
h+="<div class=card><h3>ផ្នែកទី២ ៖ លក្ខណៈវិនិច្ឆ័យការសង្កេត</h3><p class=note style='margin:0 0 8px'>០ = គ្មាន · ១ = មិនទាន់បានល្អ · ២–៤ = មធ្យម · ៥ = បានល្អប្រសើរ</p>";
var k0=0;
OC.forEach(function(g,gi){var s=gs(i,gi);h+="<details open><summary><b>"+(gi+1)+". "+esc(g.t)+"</b> <span class=sub id=gs"+gi+">"+(s===""?"—":s)+" / "+g.max+"</span></summary>";
g.items.forEach(function(q,j){var k=k0+j,v=r.sc[k];h+="<div class=it><div><b>"+(k+1)+".</b> "+esc(q)+"</div><div class=sc>"+[0,1,2,3,4,5].map(function(n){return"<button data-sc='"+k+"|"+n+"'"+(v===n?" class=on":"")+(canEditObs?"":" disabled")+">"+n+"</button>"}).join("")+"</div><input class=cm data-cm='"+k+"' placeholder='កំណត់ត្រា / យោបល់' value='"+esc(r.cm[k]||"")+"' "+(canEditObs?"":"readonly")+"></div>"});
k0+=g.items.length;h+="</details>"});
h+="<div class=tot id=otot>"+tots(i)+"</div></div>";
var GL=["ដំណើរការទូទៅនៃការបង្រៀន","១. ចំណុចល្អ — អ្នកសង្កេត","១. ចំណុចល្អ — គ្រូបង្រៀន","២. ចំណុចគួរអភិវឌ្ឍ — អ្នកសង្កេត","២. ចំណុចគួរអភិវឌ្ឍ — គ្រូបង្រៀន","៣. ផែនការកែលម្អសម្រាប់បង្រៀនពេលក្រោយ"];
h+="<div class=card><h3>ផ្នែកទី៣ ៖ កំណត់ហេតុនៃការសង្កេត</h3><div class=fg>"+GL.map(function(l,j){
  var isTeacherNote = (j===2 || j===4);
  var fieldCanEdit = (canEditObs || (isTeacherNote && who && who.id === r.t));
  return"<div"+(j===0||j===5?" class=full":"")+"><label>"+l+"</label><textarea rows=3 data-g='"+j+"' "+(fieldCanEdit?"":"readonly")+">"+esc(r.g[j])+"</textarea></div>"
}).join("")+"</div></div>";
$("of").innerHTML=h}
function upd(){OC.forEach(function(g,gi){var s=gs(oc,gi);$("gs"+gi).textContent=(s===""?"—":s)+" / "+g.max});$("otot").innerHTML=tots(oc)}
function renderO3(){var cols=[[],[],[],[],[],[],[]],c1=0,c2=0,c3=0,b="";
data.forEach(function(t){var ix=[];ob.r.forEach(function(r,i){if(r.t===t.id)ix.push(i)});
var by=ob.r.filter(function(r){return r.o===t.id}).length,sc=ix.filter(function(i){return gt(i)>0}).length;c1+=ix.length;c2+=by;c3+=sc;
var av=OC.map(function(g,gi){var v=ix.map(function(i){return gs(i,gi)}).filter(function(x){return x!==""});return v.length?ss(v)/v.length:""});
var tv=ix.map(function(i){return gt(i)}).filter(function(x){return x!==""}),ta=tv.length?ss(tv)/tv.length:"";
av.push(ta);av.forEach(function(v,k){if(v!=="")cols[k].push(v)});
b+="<tr><td class=nm>"+esc(t.name)+"</td><td>"+ix.length+"</td><td>"+by+"</td><td>"+sc+"</td>"+av.map(function(v){return"<td>"+(v===""?"":v.toFixed(1))+"</td>"}).join("")+"<td>"+(ta===""?"":(ta/165*100).toFixed(1)+"% · <b>"+lvl(ta/165)+"</b>")+"</td></tr>"});
var tr=cols.map(function(a){return a.length?ss(a)/a.length:""});
b+="<tr class=tr><td>សរុប / មធ្យម</td><td>"+c1+"</td><td>"+c2+"</td><td>"+c3+"</td>"+tr.map(function(v){return"<td>"+(v===""?"":v.toFixed(1))+"</td>"}).join("")+"<td>"+(tr[6]===""?"":(tr[6]/165*100).toFixed(1)+"%")+"</td></tr>";
$("o3t").innerHTML="<thead><tr><th>គ្រូបង្រៀន</th><th>ត្រូវសង្កេត (ដង)</th><th>បានសង្កេតគេ (ដង)</th><th>ដាក់ពិន្ទុរួច (ដង)</th>"+OC.map(function(g){return"<th>"+esc(g.t)+" (/"+g.max+")</th>"}).join("")+"<th>មធ្យមសរុប (/165)</th><th>ភាគរយ · និទ្ទេស</th></tr></thead><tbody>"+b+"</tbody>";
$("oth").innerHTML="<div class=bar>"+[0,1,2].map(function(k){return"<label>"+OL[k]+" ≥ (%)</label><input type=number data-th='"+k+"' value='"+ob.th[k]+"' style='flex:0 0 80px;width:80px' "+(isAdm()?"":"disabled")+">"}).join("")+"</div>"}
$("oseg").onclick=function(e){var b=e.target.closest("button");if(b){ov=+b.dataset.ov;renderO()}};
$("od").onchange=function(){
  if(!isAdm()) { alert("មានតែអ្នកគ្រប់គ្រង (Admin) ទេដែលអាចប្ដូរថ្ងៃសង្កេត!"); renderO(); return; }
  ob.d=+this.value;saveO();renderO();
};
$("oy").onchange=function(){
  if(!isAdm()) { alert("មានតែអ្នកគ្រប់គ្រង (Admin) ទេដែលអាចប្ដូរឆ្នាំសង្កេត!"); renderO(); return; }
  ob.y=+this.value||2026;saveO();renderO();
};
$("om").onchange=function(){om=+this.value;renderO1()};
$("oi").onchange=function(){oc=+this.value;renderO2()};
$("opv").onclick=function(){oc=(oc+35)%36;renderO2()};
$("onx").onclick=function(){oc=(oc+1)%36;renderO2()};
$("ov1t").oninput=function(e){var p=e.target.dataset.o;if(!p)return;var a=p.split("|"),r=ob.r[+a[0]];
var isAdmin = (isAdm());
if(!isAdmin) { alert("លោកគ្រូមិនមានសិទ្ធិកែប្រែកាលវិភាគសង្កេតនេះទេ!"); renderO1(); return; }
r[a[1]]=e.target.value;saveO();renderO1();};
$("ov1t").onclick=function(e){var b=e.target.closest("button");if(b&&b.dataset.of!=null){oc=+b.dataset.of;ov=2;renderO()}};
$("of").oninput=function(e){var t=e.target,r=ob.r[oc],d=t.dataset;
var isAdmin = (isAdm());
var canEditObs = (isAdmin || (who && who.id === r.o));
if(d.f){
  if((d.f==="t"||d.f==="o")&&!isAdmin){alert("មានតែអ្នកគ្រប់គ្រង (Admin) ទេដែលអាចប្ដូរគ្រូ ឬអ្នកសង្កេត!");renderO2();return}
  var isTeacherNote = (d.f==="sub"||d.f==="rm"||d.f==="n"||d.f==="ab"||d.f==="ch"||d.f==="ls"||d.f==="ct");
  if(!canEditObs && !(isTeacherNote && who.id === r.t)) { alert("អ្នកមិនមានសិទ្ធិកែប្រែទិន្នន័យនេះទេ!"); renderO2(); return; }
  r[d.f]=t.value;saveO();if(t.tagName==="SELECT"||t.type==="date")renderO2();return;
}
if(d.cm!=null){
  if(!canEditObs) { alert("មានតែអ្នកសង្កេតការណ៍ ឬ Admin ទេដែលអាចកែប្រែកំណត់ត្រាយោបល់!"); renderO2(); return; }
  r.cm[+d.cm]=t.value;
}else if(d.g!=null){
  var isTNote = (d.g==="2"||d.g==="4");
  if(!canEditObs && !(isTNote && who.id === r.t)) { alert("អ្នកមិនមានសិទ្ធិកែប្រែចំណាំនេះទេ!"); renderO2(); return; }
  r.g[+d.g]=t.value;
}
saveO();};

$("of").onclick=function(e){
  var b=e.target.closest("button");if(!b||!b.dataset.sc)return;
  var r=ob.r[oc];
  var isAdmin = (isAdm());
  var canEditObs = (isAdmin || (who && who.id === r.o));
  if(!canEditObs) { alert("មានតែអ្នកសង្កេតការណ៍ ឬ Admin ទេដែលអាចដាក់ពិន្ទុសង្កេតថ្នាក់បាន!"); return; }
  var a=b.dataset.sc.split("|"),k=+a[0],n=+a[1];
  r.sc[k]=r.sc[k]===n?null:n;[].forEach.call(b.parentNode.children,function(x){x.className=""});if(r.sc[k]===n)b.className="on";saveO();upd()
};

$("oth").onchange=function(e){
  if(!isAdm()) { alert("មានតែអ្នកគ្រប់គ្រង (Admin) ទេដែលអាចកែប្រែភាគរយនិទ្ទេសសង្កេត!"); renderO3(); return; }
  var k=e.target.dataset.th;if(k==null)return;
  ob.th[+k]=+e.target.value||0;saveO();renderO3()
};

/* ===== Firebase Realtime Sync — ទិន្នន័យបំបែកជា document ក្នុងមួយគ្រូ (ដើម្បីឱ្យ Rules ការពារបានពេញលេញ) =====
   app/teachers          : បញ្ជីគ្រូ (Admin សរសេរ)
   tasks/{ID}  rs/{ID}  wr/{ID}  ah/{ID} : ទិន្នន័យរបស់គ្រូម្នាក់ៗ (ម្ចាស់ ឬ Admin សរសេរ)
   lib/{u}               : ឯកសារជំនួយម្នាក់ៗ (ម្ចាស់ o)
   exrows/rNN  obsrows/rNN : ជួរកាលវិភាគ/សង្កេត (តាមសិទ្ធិក្នុង Rules)
   cfg/rs  cfg/ex  cfg/obs : ការកំណត់ទូទៅ (Admin សរសេរ)    cfg/migrated : សញ្ញាបំលែងទិន្នន័យចាស់រួច */
var sy={t:{},busy:{},dirty:{},pending:{},seeded:{},synced:{},cache:{},got:{},need:{},first:{},mig:null,migFail:false,legacy:{},teachersReady:false};
function jcl(x){return JSON.parse(JSON.stringify(x))}
function sj(x){   /* stringify មានលំដាប់ key ថេរ សម្រាប់ប្រៀបធៀប */
  if(x===null||typeof x!=="object")return JSON.stringify(x);
  if(Array.isArray(x))return "["+x.map(sj).join(",")+"]";
  return "{"+Object.keys(x).sort().filter(function(k){return x[k]!==undefined}).map(function(k){return JSON.stringify(k)+":"+sj(x[k])}).join(",")+"}";
}
function rid(i){return "r"+("0"+i).slice(-2)}
function encO(id,v){return{o:id,j:JSON.stringify(v)}}   /* JSON ជា string ដើម្បីជៀស nested array ដែល Firestore មិនអនុញ្ញាត */
function decO(d){try{return JSON.parse(d.j)}catch(e){return null}}
function safeId(u){return String(u).replace(/[\/\s]/g,"_").slice(0,120)}
function pick(c,pre){var o={};Object.keys(c).forEach(function(p){if(p.indexOf(pre)===0)o[p.slice(pre.length)]=c[p]});return o}

var MAP={
  teachers:{
    docs:function(){return{"app/teachers":{v:jcl(data)}}},
    load:function(c){var x=c["app/teachers"];if(x&&Array.isArray(x.v)&&x.v.length)data=x.v}
  },
  tasks:{
    docs:function(){var o={};Object.keys(tasks).forEach(function(id){o["tasks/"+id]=encO(id,tasks[id])});return o},
    load:function(c){var t={},m=pick(c,"tasks/");Object.keys(m).forEach(function(id){var v=decO(m[id]);if(v)t[id]=v});tasks=t}
  },
  rs:{
    docs:function(){var o={},cf=jcl(rs),c=cf.c||{};delete cf.c;Object.keys(c).forEach(function(id){o["rs/"+id]=encO(id,c[id])});o["cfg/rs"]=cf;return o},
    load:function(c){var cf=c["cfg/rs"]?jcl(c["cfg/rs"]):{mx:{7:100,8:100,9:100,10:150,11:125,12:125},pc:[90,80,70,60,50]},m=pick(c,"rs/");
      cf.c={};Object.keys(m).forEach(function(id){var v=decO(m[id]);if(v)cf.c[id]=v});rs=cf}
  },
  ex:{
    docs:function(){var o={"cfg/ex":{d:ex.d,w:ex.w,y:ex.y}};ex.r.forEach(function(r,i){o["exrows/"+rid(i)]=jcl(r)});return o},
    load:function(c){var cf=c["cfg/ex"]||{},r=ex.r.map(function(x,i){var d=c["exrows/"+rid(i)];return d?jcl(d):x});
      ex={d:cf.d!=null?cf.d:ex.d,w:cf.w!=null?cf.w:ex.w,y:cf.y!=null?cf.y:ex.y,r:r}}
  },
  obs:{
    docs:function(){var o={"cfg/obs":{d:ob.d,y:ob.y,th:jcl(ob.th)}};ob.r.forEach(function(r,i){o["obsrows/"+rid(i)]=jcl(r)});return o},
    load:function(c){var cf=c["cfg/obs"]||{},r=ob.r.map(function(x,i){var d=c["obsrows/"+rid(i)];return d?jcl(d):x});
      ob={d:cf.d!=null?cf.d:ob.d,y:cf.y!=null?cf.y:ob.y,th:cf.th?jcl(cf.th):ob.th,r:r}}
  },
  wr:{
    docs:function(){var o={};Object.keys(wr.r||{}).forEach(function(id){o["wr/"+id]=encO(id,wr.r[id])});return o},
    load:function(c){var r={},m=pick(c,"wr/");Object.keys(m).forEach(function(id){var v=decO(m[id]);if(v)r[id]=v});wr={r:r}}
  },
  ah:{
    docs:function(){var o={};Object.keys(ah.r||{}).forEach(function(id){o["ah/"+id]=encO(id,ah.r[id])});return o},
    load:function(c){var r={},m=pick(c,"ah/");Object.keys(m).forEach(function(id){var v=decO(m[id]);if(v)r[id]=v});ah={r:r}}
  },
  lib:{
    docs:function(){var o={};(lib.i||[]).forEach(function(x){if(x&&x.u)o["lib/"+safeId(x.u)]=jcl(x)});return o},
    load:function(c){var a=[],m=pick(c,"lib/");Object.keys(m).forEach(function(id){a.push(jcl(m[id]))});
      a.sort(function(x,y){return String(x.d||"").localeCompare(String(y.d||""))||String(x.u).localeCompare(String(y.u))});lib={i:a}}
  }
};
/* ទិន្នន័យចាស់ (document ធំមួយក្នុងមួយប្រភេទ) → ទម្រង់ក្នុង memory (ពិនិត្យរចនាសម្ព័ន្ធមុន) */
var LEG={
  tasks:function(v){if(v&&typeof v==="object"&&!Array.isArray(v)){tasks=v;return true}},
  ex:function(v){if(v&&Array.isArray(v.r)){ex=v;return true}},
  rs:function(v){if(v&&v.c&&typeof v.c==="object"){rs=v;return true}},
  obs:function(v){if(v&&Array.isArray(v.r)){ob=v;return true}},
  wr:function(v){if(v&&v.r&&typeof v.r==="object"){wr=v;return true}},
  ah:function(v){if(v&&v.r&&typeof v.r==="object"){ah=v;return true}},
  lib:function(v){if(v&&Array.isArray(v.i)){lib=v;return true}}
};

function subsFor(k){
  return({teachers:[{doc:"app/teachers"}],tasks:[{col:"tasks"}],rs:[{col:"rs"},{doc:"cfg/rs"}],ex:[{col:"exrows"},{doc:"cfg/ex"}],
    obs:[{col:"obsrows"},{doc:"cfg/obs"}],wr:[{col:"wr",own:1}],ah:[{col:"ah",own:1}],lib:[{col:"lib"}],sched:[{col:"sched"}],ts:[{col:"ts",own:1}],sig:[{col:"sig",own:1}],cx:[{col:"cx",own:1}]})[k];
}
function canWrite(p,d,isNew){
  if(isAdm())return true;
  var m=p.split("/"),c=m[0],id=m[1],me=who.id;
  if(c==="tasks"||c==="rs"||c==="wr"||c==="ah")return id===me;
  if(c==="sched"||c==="sig")return id===me;
  if(c==="ts"||c==="cx")return String(id).split("_")[0]===me;
  if(c==="lib")return !!d&&d.o===me;
  if(c==="exrows")return !isNew&&!!d&&d.t===me;
  if(c==="obsrows")return !isNew&&!!d&&(d.o===me||d.t===me);
  return false;
}
function canDel(p,old){
  if(isAdm())return true;
  return p.indexOf("lib/")===0&&!!old&&old.o===who.id;
}

function push(k){
  if(!window.db||!window.FB||!window.FB.auth||!window.FB.auth.currentUser)return;
  sy.dirty[k]=1;
  clearTimeout(sy.t[k]);
  sy.t[k]=setTimeout(function(){flush(k)},700);
}
async function flush(k){
  if(sy.busy[k]){sy.t[k]=setTimeout(function(){flush(k)},300);return}
  sy.busy[k]=1;delete sy.dirty[k];
  var ok=true;
  try{
    var docs=MAP[k].docs(),syn=sy.synced[k]||(sy.synced[k]={}),cache=sy.cache[k]||{},ops=[];
    Object.keys(docs).forEach(function(p){
      var j=sj(docs[p]);if(syn[p]===j)return;                 /* មិនមានការប្ដូរ */
      if(!canWrite(p,docs[p],!(p in syn)))return;               /* មិនមែនរបស់ខ្លួន → រំលង */
      ops.push({p:p,j:j,d:docs[p]});
    });
    Object.keys(syn).forEach(function(p){if(!(p in docs)&&canDel(p,cache[p]))ops.push({p:p,del:1})});
    for(var n=0;n<ops.length;n++){
      var op=ops[n];
      try{
        var ref=window.FB.doc.apply(null,[window.db].concat(op.p.split("/")));
        if(op.del){await window.FB.deleteDoc(ref);delete syn[op.p]}
        else{await window.FB.setDoc(ref,op.d);syn[op.p]=op.j}
      }catch(e){
        ok=false;console.error("Sync error:",op.p,e);
        if(e&&e.code==="permission-denied")notify("គ្មានសិទ្ធិរក្សាទុកទៅ Cloud ("+op.p+")");
      }
    }
  }catch(e){ok=false;console.error("Sync error:",e)}
  finally{
    sy.busy[k]=0;(sy.fail||(sy.fail={}))[k]=!ok;
    if(!sy.dirty[k]&&sy.pending[k]){delete sy.pending[k];applyCloud(k)}
    finishMig(k,ok);
  }
}
function finishMig(k,ok){
  if(!sy.mig||!sy.mig[k]||!sy.seeded[k])return;
  if(ok)delete sy.mig[k];else sy.migFail=true;
  if(!Object.keys(sy.mig).length){
    var m=sy.mig;sy.mig=null;
    if(!sy.migFail)window.FB.setDoc(window.FB.doc(window.db,"cfg","migrated"),{at:new Date().toISOString(),legacy:true}).catch(function(e){console.error(e)});
  }
}

function refreshView(){
  if($("appSection").hidden)return;
  var c=["p0","p1","p2","p4","p5","p6","p7","p8","p9","p10","p11","p12","p13","p14","p15"].filter(function(x){return !$(x).hidden})[0]||"p0";
  show(c);
}
function ensureSelf(){
  if(!who||data.some(function(t){return t.id===who.id}))return;
  data.push({id:who.id,name:who.name,g:"",dob:"",ph:"",ad:"",sub:"គណិតវិទ្យា",deg:"គ្រូបង្រៀនកម្រិតឧត្តម",cl:"",sd:"",stt:"កំពុងបម្រើការងារ",nt:"",rl:"សមាជិក",en:true});
  try{sessionStorage.setItem(KEY,JSON.stringify(data))}catch(e){}
}
function afterTeachers(){
  var dirty=false;
  data.forEach(function(t){if(t&&"pw" in t){delete t.pw;dirty=true}});   /* សម្អាតលេខសម្ងាត់ចាស់ចេញពី Cloud */
  var me=data.filter(function(t){return t.id===who.id})[0];
  if(me){who.name=me.name||who.name;who.rl=me.rl||""}
  else if(isAdm()){ensureSelf();dirty=true}
  try{sessionStorage.setItem(KEY,JSON.stringify(data))}catch(e){}
  if(dirty&&isAdm())push("teachers");
  sy.teachersReady=true;
  updateUserInfo();render();
  if(sy.first.obs)trySeed("obs");
}
function migrateRs(){   /* លំនាំដើមថ្នាក់ទី ១១ ត្រូវជា ១២៥ (ម្ដងគត់) */
  if(rs&&!rs.mig1){if(rs.mx&&rs.mx[11]===100)rs.mx[11]=125;rs.mig1=1;savR()}
}
function trySeed(k){      /* មានតែ Admin ទេដែលបង្កើត document ដំបូង */
  if(!isAdm()||sy.seeded[k])return;
  if(k==="obs"&&!sy.teachersReady)return;
  sy.seeded[k]=1;
  if(k==="obs"&&!Object.keys(sy.cache.obs||{}).length&&!sy.legacy.obs)ob=defO();
  push(k);
}
function applyCloud(k){
  var cache=sy.cache[k]||{},has=Object.keys(cache).length>0;
  if(has){
    MAP[k].load(cache);
    var s={};Object.keys(cache).forEach(function(p){s[p]=sj(cache[p])});sy.synced[k]=s;
  }else if(!sy.synced[k])sy.synced[k]={};
  sy.first[k]=1;
  if(k==="teachers")afterTeachers();
  if(k==="rs"&&isAdm())migrateRs();
  trySeed(k);
  var a=document.activeElement;
  if(a&&/INPUT|TEXTAREA|SELECT/.test(a.tagName))setTimeout(refreshView,200);else refreshView();
}
function onData(k){
  if(Object.keys(sy.got[k]).length<sy.need[k])return;   /* រង់ចាំរហូតទាំងអស់បានមកដល់ */
  if(sy.dirty[k]||sy.busy[k]){sy.pending[k]=1;return}   /* កុំជាន់ការកែដែលមិនទាន់រក្សាទុក */
  applyCloud(k);
}
function subscribe(k){
  var subs=subsFor(k);
  sy.need[k]=subs.length;sy.got[k]={};sy.cache[k]={};
  subs.forEach(function(s,si){
    var ref;
    if(s.doc)ref=window.FB.doc.apply(null,[window.db].concat(s.doc.split("/")));
    else if(s.own&&!isAdm())ref=window.FB.query(window.FB.collection(window.db,s.col),window.FB.where("o","==",who.id));
    else ref=window.FB.collection(window.db,s.col);
    var un=window.FB.onSnapshot(ref,function(sn){
      var cache=sy.cache[k];
      if(s.doc){if(sn.exists())cache[s.doc]=sn.data();else delete cache[s.doc]}
      else{
        Object.keys(cache).forEach(function(p){if(p.indexOf(s.col+"/")===0)delete cache[p]});
        sn.forEach(function(d){cache[s.col+"/"+d.id]=d.data()});
      }
      sy.got[k][si]=1;onData(k);
    },function(err){
      console.error("Sync error:",k,err);
      if(err&&err.code==="permission-denied")notify("គ្មានសិទ្ធិអានទិន្នន័យពី Cloud ("+k+") — សូមទាក់ទងអ្នកគ្រប់គ្រង");
    });
    unsubs.push(un);
  });
}
function stopSync(){unsubs.forEach(function(f){try{f()}catch(e){}});unsubs=[]}
function startSync(){
  stopSync();
  sy.cache={};sy.got={};sy.first={};sy.synced={};sy.seeded={};
  Object.keys(MAP).forEach(subscribe);
  subProfiles();
}
/* Admin ម្នាក់ដំបូង៖ បំលែងទិន្នន័យចាស់ (app/tasks ... app/lib) ទៅទម្រង់ថ្មី ម្ដងគត់ */
function migrateLegacy(){
  return window.FB.getDoc(window.FB.doc(window.db,"cfg","migrated")).then(function(sn){
    if(sn.exists())return;
    var keys=Object.keys(LEG);
    return Promise.all(keys.map(function(k){
      return window.FB.getDoc(window.FB.doc(window.db,"app",k)).then(function(s){return s.exists()?s.data().v:null},function(){return null});
    })).then(function(vals){
      var m={};
      keys.forEach(function(k,i){if(vals[i]!=null){try{if(LEG[k](vals[i])){sy.legacy[k]=1;m[k]=1}}catch(e){}}});
      if(Object.keys(m).length){sy.mig=m;sy.migFail=false}
      else return window.FB.setDoc(window.FB.doc(window.db,"cfg","migrated"),{at:new Date().toISOString(),legacy:false});
    });
  }).catch(function(e){console.error("migrate:",e)});
}

/* ម៉ឺនុយ Profile (Avatar + Dropdown)៖ បើក/បិទ, ចុចក្រៅ ឬ Esc ដើម្បីបិទ */
function initProfileMenu(){
  var tr=$("profileTrigger"),dd=$("profileDropdown");
  if(!tr||!dd)return;
  function close(f){dd.hidden=true;tr.setAttribute("aria-expanded","false");if(f)tr.focus()}
  tr.addEventListener("click",function(e){e.stopPropagation();var open=dd.hidden;dd.hidden=!open;tr.setAttribute("aria-expanded",String(open))});
  dd.addEventListener("click",function(e){if(e.target.closest("button"))close()});
  document.addEventListener("click",function(e){if(!dd.hidden&&!dd.contains(e.target)&&!tr.contains(e.target))close()});
  document.addEventListener("keydown",function(e){if(e.key==="Escape"&&!dd.hidden)close(true)});
}
initProfileMenu();
