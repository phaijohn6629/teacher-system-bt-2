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
    /* ☑️ ចងចាំខ្ញុំ៖ remUntil (ពេលផុតកំណត់) ក្នុង localStorage → រក្សា Login ក្នុងឧបករណ៍ · គ្មាន/ផុតកំណត់ → Session តែប៉ុណ្ណោះ (បិទ Tab ត្រូវ Login ឡើងវិញ) */
    var ru = 0; try { ru = +localStorage.getItem("remUntil") || 0; } catch (e) {}
    var rem = ru > Date.now();
    if (ru && !rem) { try { localStorage.removeItem("remUntil"); indexedDB.deleteDatabase("firebaseLocalStorageDb"); } catch (e) {} }
    var auth = AU.initializeAuth(app, { persistence: rem ? [AU.indexedDBLocalPersistence, AU.browserLocalPersistence] : AU.browserSessionPersistence });
    /* App ទីពីរ ប្រើសម្រាប់ឱ្យ Admin បង្កើតគណនីគ្រូ ដោយមិនចាំបាច់ចាកចេញពីគណនីខ្លួន */
    var sauth = AU.getAuth(A.initializeApp(firebaseConfig, "secondary"));
    /* 📱 ចងចាំខ្ញុំ → រក្សាទិន្នន័យក្នុងឧបករណ៍ (IndexedDB) → បើកលើកក្រោយ បង្ហាញភ្លាមពី cache រួចធ្វើបច្ចុប្បន្នភាពពី Cloud
       មិនចងចាំ (ឧបករណ៍រួម) → memory តែប៉ុណ្ណោះ ហើយលុប cache ចាស់ចោល */
    var db = null;
    if (rem) { try { db = FS.initializeFirestore(app, { localCache: FS.persistentLocalCache({ tabManager: FS.persistentMultipleTabManager() }) }); } catch (e) { console.warn("persistent cache:", e); } }
    else { try { indexedDB.databases().then(function (l) { l.forEach(function (d) { if (d.name && d.name.indexOf("firestore/") === 0) indexedDB.deleteDatabase(d.name); }); }).catch(function () {}); } catch (e) {} }
    window.db = db || FS.getFirestore(app);
    window.FBPERSIST = !!db;
    window.FB = {
      auth: auth, sauth: sauth,
      doc: FS.doc, collection: FS.collection, getDoc: FS.getDoc, getDocs: FS.getDocs,
      setDoc: FS.setDoc, updateDoc: FS.updateDoc, deleteDoc: FS.deleteDoc,
      query: FS.query, where: FS.where, onSnapshot: FS.onSnapshot, disableNetwork: FS.disableNetwork, enableNetwork: FS.enableNetwork,
      runTransaction: FS.runTransaction, addDoc: FS.addDoc, serverTimestamp: FS.serverTimestamp, writeBatch: FS.writeBatch, getCountFromServer: FS.getCountFromServer,
      signInWithEmailAndPassword: AU.signInWithEmailAndPassword, signOut: AU.signOut,
      onAuthStateChanged: AU.onAuthStateChanged,
      createUserWithEmailAndPassword: AU.createUserWithEmailAndPassword,
      updatePassword: AU.updatePassword, deleteUser: AU.deleteUser, reauthenticateWithCredential: AU.reauthenticateWithCredential,
      EmailAuthProvider: AU.EmailAuthProvider,
      setRemember: function (on) { return AU.setPersistence(auth, on ? AU.indexedDBLocalPersistence : AU.browserSessionPersistence); }
    };
    return AU.setPersistence(sauth, AU.inMemoryPersistence)
      .catch(function () {});
  });
})();

/* ========================================================================
   ផ្នែកទី ២ · កម្មវិធីគោល (ការគណនា ផ្ទាំងទាំង ១០ ការ Backup និង Sync)
   ======================================================================== */

var KEY="teachers-v4",M=["មករា","កុម្ភៈ","មីនា","មេសា","ឧសភា","មិថុនា","កក្កដា","សីហា","កញ្ញា","តុលា","វិច្ឆិកា","ធ្នូ"];
var KEY_EX=KEY+"-ex",KEY_OBS=KEY+"-obs";
var RL=["ប្រធាន","អនុប្រធាន","សមាជិក"], DG=["គ្រូបង្រៀនកម្រិតឧត្តម","គ្រូបង្រៀនកម្រិតមូលដ្ឋាន","គ្រូកិច្ចសន្យា"];
var SEED=[];
var D2=["កម្រិត ១","កម្រិត ២"],SK={T001:{lv:["10","11","12"],w:{}},T002:{lv:D2.slice(),w:{}},T003:{lv:["9","10"],w:{}},T004:{lv:["9","10"],w:{}},T005:{lv:["10","11"],w:{}},T006:{lv:D2.slice(),w:{}},T007:{lv:D2.slice(),w:{}},T008:{lv:D2.slice(),w:{}}};
var MK=["តុលា","វិច្ឆិកា","ធ្នូ","មករា","កុម្ភៈ","មីនា","មេសា","ឧសភា","មិថុនា","កក្កដា","សីហា"],WK=["ស.១","ស.២","ស.៣","ស.៤"];

function $(i){return document.getElementById(i)}
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
/* 🛡️ src រូបភាពពីទិន្នន័យអ្នកប្រើ (ហត្ថលេខា · រូបសិស្ស · រូបលំហាត់ …)៖ ទទួលតែ data:image base64 ឬ https គ្មានសញ្ញាពិសេស → ការពារ XSS (' onerror=…) */
function safeSrc(u){u=String(u==null?"":u);return/^data:image\/(png|jpe?g|gif|webp|svg\+xml);base64,[A-Za-z0-9+\/=\s]+$/.test(u)||/^https:\/\/[^\s'"<>`\\]+$/.test(u)?u:""}
function csvSafe(v){var s=String(v==null?"":v);return(/^[=+@\t\r]/.test(s)||/^-[^0-9.]/.test(s))?"'"+s:s}
function notify(msg){if(window.WALKER)WALKER.toast(msg);var t=$("toast");t.textContent=msg;t.classList.add("show");clearTimeout(t._tm);t._tm=setTimeout(function(){t.classList.remove("show")},2600)}
function notifyErr(e){notify(authErr(e))}
function fd(s){if(!s||!/^\d{4}-\d{2}-\d{2}$/.test(s))return"";var p=s.split("-");return +p[2]+" "+M[+p[1]-1]+" "+p[0]}
function selOpts(arr,val){return arr.map(function(o){return"<option"+(o===val?" selected":"")+">"+esc(o)+"</option>"}).join("")}

var data=load(),editing=null,tasks=loadK(),cur=0,who=null;
/* កែលំដាប់អក្សរខ្មែរ៖ ស្រៈ/សញ្ញា (៉ ៊ ុ ...) ដែលវាយមុនជើង (្រ ្ក ...) → ដាក់ក្រោយជើង
   (ឧ. «ស៊្រុន» → «ស្រ៊ុន») · ទូរស័ព្ទបង្ហាញ ◌ បើលំដាប់ខុស ទោះកុំព្យូទ័របង្ហាញត្រឹមត្រូវ */
function khNorm(v){
  if(typeof v!=="string")return v;
  for(var i=0,o;i<3&&o!==v;i++){o=v;v=v.replace(/([\u17B6-\u17D1\u17D3\u17DD]+)((?:\u17D2[\u1780-\u17B3])+)/g,"$2$1")}
  return v;
}
function normNames(a){(a||[]).forEach(function(t){if(t&&t.name)t.name=khNorm(t.name)});return a}
function load(){
  try{
    var s=sessionStorage.getItem(KEY);
    if(s){var d=JSON.parse(s);if(Array.isArray(d)&&d.length)return normNames(d)}
  }catch(e){}
  return JSON.parse(JSON.stringify(SEED));
}
function loadK(){try{var s=sessionStorage.getItem(KEY+"-k");if(s)return JSON.parse(s)}catch(e){}return{}}   /* កុំប្រើទិន្នន័យគំរូ (SK) — ធ្លាប់ជាន់ទិន្នន័យពិតក្នុង Cloud */
function save(){try{sessionStorage.setItem(KEY,JSON.stringify(data));sessionStorage.setItem(KEY+"-k",JSON.stringify(tasks));if(isAdm()&&sy.teachersReady){push("teachers");syncKLead()}push("tasks");}catch(e){alert("មិនអាចរក្សាទុកទិន្នន័យបានទេ!")}}

function tTouch(id){(sy.touch||(sy.touch={}))[id]=1}   /* កិច្ចតែងការដែលបានកែដោយដៃ (Admin សរសេរតែគ្រូទាំងនេះ) */
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
/* កិច្ចតែងការ៖ តែ Admin · ប្រធាន · អនុប្រធាន (ក្រុមបច្ចេកទេស) វាយបញ្ចូល/កែបាន · សមាជិក = មើលតែប៉ុណ្ណោះ */
var KLEAD=["ប្រធាន","អនុប្រធាន"];
/* មិនប្រកាន់ដកឃ្លា/តួអក្សរទទេ (zero-width) ក្នុងតួនាទី ដើម្បីឱ្យ «អនុប្រធាន» ស្មើ «ប្រធាន» ជានិច្ច */
function isLead(rl){return KLEAD.indexOf(String(rl||"").replace(/[\u200b\u200c\u200d\s]/g,""))>=0}
function canK(){return isAdm()||!!(who&&who.role!=="monitor"&&isLead(who.rl))}
/* Rules មិនអាចអានតួនាទីក្នុង app/teachers → Admin សរសេរបញ្ជី ID ប្រធាន/អនុប្រធាន ទៅ cfg/klead (ពេលតួនាទីប្ដូរ) */
function syncKLead(){
  if(!isAdm()||!sy.teachersReady||!window.FB||!window.db)return;
  var ids=data.filter(function(t){return t&&isLead(t.rl)}).map(function(t){return String(t.id)}).sort(),j=JSON.stringify(ids);
  if(syncKLead.j===j)return;syncKLead.j=j;
  window.FB.setDoc(window.FB.doc(window.db,"cfg","klead"),{ids:ids,u:new Date().toISOString()}).catch(function(e){syncKLead.j="";console.warn("klead:",e)});
}
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
  set("userInfo",role+" · "+(who.role==="monitor"&&prof?prof.id:who.id));
  set("dropUserName",nm);set("profileNameDisplay",nm);
  var av=$("profileAvatar");if(av)av.innerHTML=avInner(who.id,nm);
}
function showLogin(){
  who=null;prof=null;stopSync();
  $("appSection").hidden=true;$("loginSection").hidden=false;
}
function doLogout(){
  stopSync();
  try{localStorage.removeItem("remUntil")}catch(e){}   /* ចាកចេញ = ឈប់ចងចាំលើឧបករណ៍នេះ */
  var done=function(){try{sessionStorage.clear()}catch(e){}location.reload()};
  if(window.FB&&window.FB.auth)window.FB.signOut(window.FB.auth).then(done,done);else done();
}
/* ⚡ ចូលលឿន៖ ចងចាំព័ត៌មានគណនី (id · ឈ្មោះ · តួនាទី) ក្នុងឧបករណ៍ → បើកកម្មវិធីភ្លាម ហើយផ្ទៀងផ្ទាត់ពី Cloud នៅពីក្រោយ
   បើ Cloud ខុសពីអ្វីដែលចងចាំ (ឧ. ត្រូវបានបិទសិទ្ធិ/ប្ដូរតួនាទី) → ផ្ទុកឡើងវិញ · សិទ្ធិពិតនៅតែការពារដោយ firestore.rules */
function enterApp(user){
  var ck="profC_"+user.uid,c=null;
  try{c=JSON.parse(localStorage.getItem(ck))}catch(e){}
  var net=window.FB.getDoc(window.FB.doc(window.db,"users",user.uid)).then(function(sn){
    var p=sn.exists()?sn.data():null;
    /* 🆕 Bootstrap បណ្ដោះអាសន្ន៖ Project ថ្មី math-exam-temp ទទេ → គណនី T001 ដែលមិនទាន់មាន profile ក្លាយជា Admin (តែ T001 · តែ Project នេះ) */
    var pj="";try{pj=window.FB.auth.app.options.projectId}catch(e){}
    if(!p&&pj==="math-exam-temp"&&String(user.email||"").toLowerCase()===idEmail("T001")){
      p={id:"T001",name:"T001",role:"admin",enabled:true,mustChange:false};
      return window.FB.setDoc(window.FB.doc(window.db,"users",user.uid),p).then(function(){return p});
    }
    try{if(p&&p.enabled===true)localStorage.setItem(ck,JSON.stringify(p));else localStorage.removeItem(ck)}catch(e){}
    return p;
  });
  var sig=function(p){return p?JSON.stringify([p.id,p.name,p.role,p.enabled,p.mustChange,p.t,p.k,p.c,p.r,p.sn]):""};
  if(c&&c.enabled===true){
    net.then(function(p){if(sig(p)!==sig(c))location.reload()},function(e){console.warn("profile:",e)});
    return goApp(user,c);
  }
  net.then(function(p){goApp(user,p)}).catch(function(e){alert(authErr(e));doLogout()});   /* alert៖ doLogout ផ្ទុកទំព័រឡើងវិញ → toast នឹងបាត់មុនអាន */
}
function goApp(user,p){
  (function(){
    if(!p){alert("គណនីនេះមិនទាន់ត្រូវបានកំណត់សិទ្ធិក្នុងប្រព័ន្ធទេ។ សូមទាក់ទងអ្នកគ្រប់គ្រង។");return doLogout()}
    if(p.enabled!==true){alert("គណនីរបស់អ្នកមិនទាន់បើកសិទ្ធិប្រើប្រាស់ទេ។ សូមទាក់ទងអ្នកគ្រប់គ្រង។");return doLogout()}
    if(p.role==="monitor"){   /* គណនីប្រធានថ្នាក់៖ ចូលបានតែ វត្តមាន · ប្លង់តុ · សម្រង់អត្ថបទ នៃថ្នាក់ខ្លួន (monitor.js) */
      prof={uid:user.uid,id:String(p.id||"").toUpperCase(),name:p.name||p.id,role:"monitor",mustChange:false};
      var RL={h:"ប្រធានថ្នាក់",v1:"អនុប្រធានទី១",v2:"អនុប្រធានទី២"},mr=RL[p.r]?p.r:"h";
      who={id:String(p.t||"").toUpperCase(),name:p.name||p.id,role:"monitor",rl:RL[mr],mk:p.k,mc:p.c,mr:mr,msn:p.sn||""};
      rt=who.id;data=[];rs={c:{}};
      $("loginSection").hidden=true;$("appSection").hidden=false;
      updateUserInfo();if(window.MONUI)MONUI.enter();
      startSync();
      if(window._justLogin)loginPop();window._justLogin=false;
      return;
    }
    prof={uid:user.uid,id:String(p.id||"").toUpperCase(),name:khNorm(p.name||p.id),role:p.role==="admin"?"admin":"member",mustChange:p.mustChange===true};
    if(prof.role==="admin")try{var ru=+localStorage.getItem("remUntil")||0,mx=Date.now()+7*864e5;if(ru>mx)localStorage.setItem("remUntil",String(mx))}catch(e){}   /* អ្នកគ្រប់គ្រង៖ ចងចាំយូរបំផុត ៧ ថ្ងៃ */
    who={id:prof.id,name:prof.name,role:prof.role,rl:""};
    rt=who.id;
    $("loginSection").hidden=true;$("appSection").hidden=false;
    $("add").style.display=isAdm()?"inline-block":"none";
    $("mkAll").style.display=isAdm()?"inline-block":"none";
    $("tRec").style.display=$("tRecL").style.display=isAdm()?"inline-block":"none";
    updateUserInfo();
    show("p0");
    if(isAdm()){loadUsers().then(function(){render()});migrateLegacy().then(startSync,startSync)}
    else startSync();
    if(prof.mustChange)openPass(true);
    else if(window._justLogin)loginPop();
    window._justLogin=false;
  })();
}
function loadUsers(){
  return window.FB.getDocs(window.FB.collection(window.db,"users")).then(function(qs){
    usersById={};
    qs.forEach(function(d){var v=d.data();if(v&&v.id)usersById[String(v.id).toUpperCase()]={uid:d.id,enabled:v.enabled===true,role:v.role,name:v.name}});
  }).catch(function(e){console.error("users:",e)});
}

/* Popup «ចូលប្រព័ន្ធជោគជ័យ» (តែពេលចុច Login · មិនមែនពេល Reload) */
function loginPop(){
  var old=$("loginPop");if(old)old.remove();
  var hr=new Date().getHours(),gr=hr<12?"អរុណសួស្ដី":hr<17?"ទិវាសួស្ដី":"សាយណ្ហសួស្ដី",ic=hr<12?"☀️":hr<17?"🌤️":"🌙";
  var d=document.createElement("div");d.id="loginPop";d.setAttribute("role","status");d.setAttribute("aria-live","polite");
  d.innerHTML="<div class=lp-card><div class=lp-burst>"+new Array(12).join("<i></i>")+"</div>"+
    "<div class=lp-check><svg viewBox='0 0 52 52'><circle cx=26 cy=26 r=24 /><path d='M14 27 l8 8 l16 -17' /></svg></div>"+
    "<h2>ចូលប្រព័ន្ធជោគជ័យ!</h2><p class=lp-hi>"+gr+" "+ic+"</p>"+
    "<div class=lp-user>"+avHtml(who.id,who.name,40)+"<span><b>"+esc(who.name)+"</b><small>"+(isAdm()?"អ្នកគ្រប់គ្រង":who.role==="monitor"?esc(who.rl+" "+(who.mc||"")):"គ្រូបង្រៀន")+" · "+esc(who.role==="monitor"?prof.id:who.id)+"</small></span></div>"+
    "<div class=lp-bar><i></i></div></div>";
  document.body.appendChild(d);
  var close=function(){if(!d.isConnected)return;d.classList.add("out");setTimeout(function(){d.remove()},350)};
  d.onclick=close;setTimeout(close,2800);
}
$("btnLogin").onclick=function(){
  var id=$("loginId").value.trim().toUpperCase(),pass=$("loginPass").value,btn=$("btnLogin");
  if(!id||!pass){alert("សូមបញ្ចូលលេខសម្គាល់ និងលេខសម្ងាត់!");return}
  btn.disabled=true;
  var rem=!!($("loginRem")&&$("loginRem").checked);
  window.FBREADY.then(function(){return window.FB.setRemember(rem).catch(function(){})})
    .then(function(){return window.FB.signInWithEmailAndPassword(window.FB.auth,idEmail(id),pass)})
    .then(function(){$("loginPass").value="";window._justLogin=true;
      try{if(rem)localStorage.setItem("remUntil",String(Date.now()+30*864e5));else localStorage.removeItem("remUntil")}catch(e){}})
    .catch(function(e){notifyErr(e)})
    .then(function(){btn.disabled=false});
};
["loginId","loginPass"].forEach(function(i){$(i).onkeydown=function(e){if(e.key==="Enter")$("btnLogin").onclick()}});
$("btnLogout").onclick=doLogout;
/* ⚡ បង្ហាញផ្ទាំង Login ភ្លាម (មិនរង់ចាំ Firebase ទាញរួច) បើ Tab នេះមិនទាន់បាន Login */
try{if(!((+localStorage.getItem("remUntil")||0)>Date.now())&&!Object.keys(sessionStorage).some(function(k){return k.indexOf("firebase:authUser:")===0}))$("loginSection").hidden=false}catch(e){$("loginSection").hidden=false}
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
/* ស្ដារបញ្ជីគ្រូ (Admin)៖ បន្ថែមគ្រូដែលបាត់ ពីគណនី Login (users) · ប្រវត្តិរូប (profiles) · ទិន្នន័យថ្នាក់/កិច្ចការ · ឬឯកសារ Backup — មិនជាន់លើគ្រូដែលមានស្រាប់ */
function tFromProf(id,nm,en){
  var p=profs[id]||{},o={id:id,name:khNorm(p.nm||nm||id),g:p.g||"",dob:p.dob||"",ph:p.ph||"",ad:p.ad||"",sub:p.sub||"គណិតវិទ្យា",deg:p.deg||"",cl:"",sd:p.sd||"",stt:"កំពុងបម្រើការងារ",nt:"",rl:"សមាជិក",en:en!==false};
  return o;
}
function recoverTeachers(extra){
  if(!isAdm())return;
  var have={};data.forEach(function(t){have[String(t.id).toUpperCase()]=1});
  loadUsers().then(function(){
    var add=[],seen={};
    function put(o){var k=String(o.id).toUpperCase();if(!k||have[k]||seen[k])return;seen[k]=1;add.push(o)}
    (extra||[]).forEach(function(t){if(t&&t.id){var c=Object.assign({},t);delete c.pw;put(c)}});
    Object.keys(usersById).forEach(function(id){var u=usersById[id];if(u.role==="monitor"||/-/.test(id))return;put(tFromProf(id,u.name,u.enabled))});
    Object.keys(profs).forEach(function(id){put(tFromProf(id,"",true))});
    Object.keys(rs.c||{}).concat(Object.keys(tasks||{})).forEach(function(id){if(/^T\d+$/i.test(id))put(tFromProf(id.toUpperCase(),"",true))});
    if(!add.length){alert("មិនមានគ្រូដែលបាត់ទេ (គ្រូទាំងអស់មានក្នុងបញ្ជីរួចហើយ)។");return}
    add.sort(function(a,b){return String(a.id).localeCompare(String(b.id),undefined,{numeric:true})});
    if(!confirm("រកឃើញគ្រូ "+add.length+" នាក់ដែលបាត់ពីបញ្ជី៖\n\n"+add.map(function(t){return"• "+t.id+" — "+t.name}).join("\n")+"\n\nបន្ថែមចូលបញ្ជីគ្រូវិញ? (គ្រូដែលមានស្រាប់មិនប៉ះពាល់ទេ)"))return;
    data=data.concat(add).sort(function(a,b){return String(a.id).localeCompare(String(b.id),undefined,{numeric:true})});
    save();render();notify("បានស្ដារគ្រូ "+add.length+" នាក់ · សូមពិនិត្យ និងកែព័ត៌មាន (ថ្នាក់បង្រៀន · តួនាទី) បើចាំបាច់");
  });
}
$("tRec").onclick=function(){if(isAdm())recoverTeachers()};
$("tRecF").onchange=function(e){
  var f=e.target.files[0];e.target.value="";if(!f)return;
  var r=new FileReader();r.onload=function(){try{var o=JSON.parse(r.result);if(!o||!Array.isArray(o.teachers))throw 0;recoverTeachers(o.teachers)}catch(x){alert("ឯកសារ Backup មិនត្រឹមត្រូវ")}};r.readAsText(f);
};
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
  }).catch(function(e){el.checked=!on;notifyErr(e)});
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
  var pp=profs[o.id];   /* ប្រវត្តិរូបដែលគ្រូបានកែ → ធ្វើបច្ចុប្បន្នភាពតាម Admin កុំឱ្យជាន់គ្នា */
  if(!isNewT&&pp&&window.FB){var np=Object.assign({},pp,{nm:o.name,g:o.g,dob:o.dob,ph:o.ph.slice(0,40),ad:o.ad.slice(0,200),sub:o.sub.slice(0,60),deg:o.deg.slice(0,80),sd:o.sd,u:new Date().toISOString()});
    window.FB.setDoc(window.FB.doc(window.db,"profiles",o.id),np).then(function(){profs[o.id]=np}).catch(function(e){console.error(e)})}
};

$("tb").onclick=function(e){
  var b=e.target.closest("button");if(!b)return;
  if(b.dataset.mk){if(!isAdm())return;createAccounts(data.filter(function(x){return x.id===b.dataset.mk}));return}
  if(b.dataset.e){
    var t = data.find(x => x.id === b.dataset.e);
    if(!isAdm()){
      if(who&&b.dataset.e===who.id){openProfile();return}
      alert("អ្នកកែបានតែព័ត៌មានរបស់ខ្លួនឯងប៉ុណ្ណោះ!");return;
    }
    openForm(t);
  }
  if(b.dataset.d){
    if(!isAdm()) { alert("មានតែអ្នកគ្រប់គ្រង (Admin) ទេដែលមានសិទ្ធិលុបទិន្នន័យ!"); return; }
    var t=data.filter(function(x){return x.id===b.dataset.d})[0];
    if(t&&t.id===who.id){alert("មិនអាចលុបគណនីខ្លួនឯងបានទេ!");return}
    if(t&&confirm("តើអ្នកពិតជាចង់លុបគ្រូឈ្មោះ «"+t.name+"» មែនទេ?")){
      disableAccount(b.dataset.d);
      data=data.filter(function(x){return x.id!==b.dataset.d});sy.tDel=(sy.tDel||0)+1;   /* អនុញ្ញាតឱ្យបញ្ជីខ្លីជាងមុន ១ */
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
  if($("krec"))$("krec").hidden=!isAdm();
  var p=f&&document.activeElement&&document.activeElement.dataset.p;
  var b="",cs=[0,0,0,0],all=0;
  data.forEach(function(t){
    var k=gk(t.id);
    k.lv.forEach(function(lv,l){
      var w=gw(t.id,cur,l);
      w.forEach(function(v,i){cs[i]+=+v||0});
      var canEdit = canK();
      var btns=(canEdit?"<button type=button class=sm-btn data-kl='add|"+t.id+"' title='បន្ថែមកម្រិតថ្នាក់'>+</button>"+(k.lv.length>1?"<button type=button class='sm-btn danger' data-kl='del|"+t.id+"' title='លុបកម្រិតថ្នាក់ចុងក្រោយ'>−</button>":""):"");
      b+="<tr>"+(l?"":"<td class=nm rowspan="+k.lv.length+">"+esc(t.name)+"<div style='margin-top:4px'>"+btns+"</div></td>")+
        "<td><select class=lv aria-label='កម្រិតថ្នាក់' data-p='"+t.id+"|"+l+"|L' "+(canEdit?"":"disabled")+">"+lvop(lv)+"</select></td>"+
        w.map(function(v,i){return"<td><input class=n type=number min=0 aria-label='"+WK[i]+"' data-p='"+t.id+"|"+l+"|"+i+"' value='"+(v||"")+"' "+(canEdit?"":"readonly")+"></td>"}).join("")+
        "<td id='km-"+t.id+"-"+l+"' style='font-weight:700'>"+sm(w)+"</td><td id='kt-"+t.id+"-"+l+"'>"+lt(t.id,l)+"</td></tr>";
    });
  });
  for(var m=0;m<11;m++)all+=mt(m);
  var kn0=$("kRO");if(!kn0&&$("kt")){kn0=document.createElement("p");kn0.id="kRO";kn0.className="note";$("kt").parentNode.insertBefore(kn0,$("kt"))}
  if(kn0){kn0.hidden=canK();kn0.textContent="👁 មើលតែប៉ុណ្ណោះ · មានតែប្រធាន និងអនុប្រធានក្រុមបច្ចេកទេស ទើបអាចបញ្ចូល/កែចំនួនកិច្ចតែងការបាន"}
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
  return"<div class='pg cxp'>"+"<div class=hd><div class=moul>ព្រះរាជាណាចក្រកម្ពុជា</div><div class=moul style='font-size:11pt'>ជាតិ សាសនា ព្រះមហាក្សត្រ</div></div>"+
   "<div class=cxh><img src='"+((document.querySelector(".brand-logo")||{}).src||LOGO)+"' class='cxlogo kplogo' alt=''><div class=cxt><div class=moul style='font-size:12pt'>វិទ្យាល័យបឹងត្របែក</div><div style='font-size:10.5pt;margin:2px 0 4px'>សាលារៀនជំនាន់ថ្មី (NGS) · ក្រុមបច្ចេកទេសគណិតវិទ្យា</div>"+
    "<div class=moul style='font-size:13pt'>របាយការណ៍ចំនួនកិច្ចតែងការ</div><div class=cxper>ខែ"+esc(MK[cur])+" ឆ្នាំ"+kn(yr)+"</div></div></div>"+
   "<table class='cxg kpg'><colgroup><col style='width:6%'><col style='width:22%'><col style='width:11%'><col span=4 style='width:9%'><col span=2 style='width:12%'></colgroup>"+
   "<thead><tr><th>ល.រ</th><th>ឈ្មោះសមាជិក</th><th>កម្រិតថ្នាក់</th>"+WK.map(function(x){return"<th>"+x+"</th>"}).join("")+"<th>សរុបខែ</th><th>សរុបទាំងអស់</th></tr></thead>"+b+
   "<tfoot><tr><td colspan=3>សរុបរួម</td>"+cs.map(function(c){return"<td>"+kn(c)+"</td>"}).join("")+"<td>"+kn(sm(cs))+"</td><td>"+kn(ga)+"</td></tr></tfoot></table>"+
   wpFoot(who.id,who.name)+"</div>";
}
/* ជើងក្រោមតាមគម្រូ Workplan៖ ឆ្វេង = គណៈគ្រប់គ្រង · ស្ដាំ = ថ្ងៃចន្ទគតិ + ទីកន្លែង/ថ្ងៃទី + ហត្ថលេខា និងឈ្មោះ */
/* ជើងហត្ថលេខាផ្លូវការ៖ ឆ្វេង «បានឃើញ និងឯកភាព» · កណ្ដាល (mid) «បានឃើញ និងពិនិត្យ / ប្រធានក្រុមបច្ចេកទេស» · ស្ដាំ ចន្ទគតិ + សុរិយគតិ + តួនាទី + ឈ្មោះ */
function wpFoot(id,name,lbl,mid){
  var X=window.SCHX,tdy=new Date(),wg="ថ្ងៃទី "+kn(tdy.getDate())+" ខែ "+M[tdy.getMonth()]+" ឆ្នាំ"+kn(tdy.getFullYear());
  var wl=window.KhCal?KhCal.fmt(tdy.getFullYear(),tdy.getMonth()+1,tdy.getDate()):"",sig=X?X.getSig(id):"";
  return"<div class=cxf><div class=moul style='font-size:10.5pt;line-height:1.7'>បានឃើញ និងឯកភាព<br>ជ.គណៈគ្រប់គ្រងសាលារៀនជំនាន់ថ្មី</div>"+
   (mid?"<div class='moul cxm' style='font-size:10.5pt;line-height:1.7'>បានឃើញ និងពិនិត្យ<br>ប្រធានក្រុមបច្ចេកទេស</div>":"")+
   "<div class=cxr>"+(wl?"<div class=lu>"+esc(wl)+"</div>":"")+"<div class=gd>រាជធានីភ្នំពេញ "+esc(wg)+"</div><div class=sn>"+esc(lbl||"ហត្ថលេខា និងឈ្មោះ")+"</div>"+
   "<div class=sb>"+(sig?"<img src='"+safeSrc(sig)+"' class=sgi alt=''>":"<span style='width:30mm;display:inline-block'></span>")+"<b>"+esc(name||"")+"</b></div></div></div>";
}
$("kpr").onclick=function(){var X=window.SCHX;X.fontsOk().then(function(){X.doPrintNow(kPrintHTML())})};
$("mo").innerHTML=MK.map(function(m,i){return"<option value="+i+">"+m+"</option>"}).join("");
$("mo").onchange=function(){cur=+this.value;renderK()};

$("kt").onclick=function(e){
  var b=e.target.closest("button[data-kl]");if(!b)return;
  var a=b.dataset.kl.split("|"),id=a[1];
  if(!canK()) { alert("មានតែប្រធាន និងអនុប្រធាន ទើបអាចបញ្ចូល/កែចំនួនកិច្ចតែងការបាន"); return; }
  var k=gk(id);tTouch(id);
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
  if(!canK()) { alert("មានតែប្រធាន និងអនុប្រធាន ទើបអាចបញ្ចូល/កែចំនួនកិច្ចតែងការបាន"); renderK(); return; }
  tTouch(id);
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

/* 🛟 ស្ដារកិច្ចតែងការពី Backup (Admin)៖ បំពេញតែប្រអប់ដែលទទេ (មិនជាន់លេខដែលមាន) · គាំទ្រ Backup ចាស់ (tasks) និង Backup ពេញលេញ (cloud.tasks) */
function tRecover(o){
  var src={};
  if(o&&o.cloud&&o.cloud.tasks)Object.keys(o.cloud.tasks).forEach(function(id){var v=decO(o.cloud.tasks[id]);if(v)src[id]=v});
  if(o&&o.tasks&&typeof o.tasks==="object")Object.keys(o.tasks).forEach(function(id){if(!src[id]||tSum(o.tasks[id])>tSum(src[id]))src[id]=o.tasks[id]});
  var cells=0,ppl=0;
  Object.keys(src).forEach(function(id){
    var b=src[id];if(!b||!b.w||!tSum(b))return;
    var k=gk(id),got=0,curEmpty=!tSum(k);
    if(curEmpty&&Array.isArray(b.lv)&&b.lv.length)k.lv=b.lv.slice();
    Object.keys(b.w).forEach(function(m){(b.w[m]||[]).forEach(function(r,l){
      if(!r||!sm(r))return;k.w[m]=k.w[m]||[];var c=k.w[m][l]||[0,0,0,0];
      if(sm(c))return;k.w[m][l]=r.map(function(x){return+x||0});got++;
    })});
    if(got){cells+=got;ppl++;tTouch(id)}
  });
  if(!cells){alert("រកមិនឃើញកិច្ចតែងការដែលត្រូវស្ដារក្នុងឯកសារនេះទេ (ឬប្រអប់ទាំងនោះមានលេខស្រាប់)។");return}
  save();renderK();renderS();notify("🛟 បានស្ដារកិច្ចតែងការ "+cells+" ជួរ សម្រាប់គ្រូ "+ppl+" នាក់");
}
if($("krec")){$("krec").onclick=function(){$("krecF").value="";$("krecF").click()};
  $("krecF").onchange=function(e){var f=e.target.files[0];if(!f)return;var r=new FileReader();r.onload=function(){try{tRecover(JSON.parse(r.result))}catch(x){alert("ឯកសារ Backup មិនត្រឹមត្រូវ")}};r.readAsText(f)}}
$("kexp").onclick=function(){
  var rows=[["ឈ្មោះ","កម្រិតថ្នាក់"].concat(MK).concat(["សរុបទាំងអស់"])];
  data.forEach(function(t){var k=gk(t.id);k.lv.forEach(function(lv,l){rows.push([t.name,lv].concat(MK.map(function(_,m){var r=k.w[m]&&k.w[m][l];return r?sm(r):0})).concat([lt(t.id,l)]))})});
  dlCSV(rows,"lesson-plans.csv");
};

/* ផ្ទាំងទី ៣៖ ថ្នាក់និទស្សន៍ */
var DY=["ច័ន្ទ","អង្គារ","ពុធ","ព្រហស្បតិ៍","សុក្រ"],XM=[11,12,1,2,3,4,5,6,7,8,9,10],ex=loadX();
function loadX() {
  try {
    var s = sessionStorage.getItem(KEY_EX);
    if (!s) { // Migration
      s = sessionStorage.getItem(KEY + "-x");
      if (s) {
        sessionStorage.setItem(KEY_EX, s);
        sessionStorage.removeItem(KEY + "-x");
      }
    }
    if (s) {
      var o = JSON.parse(s);
      while (o.r.length < 12) o.r.push({ t: ["T001", "T002", "T003", "T004"][o.r.length - 8] || "T001", tm: "", sc: "", nt: "" });
      return o
    }
  } catch (e) { }
  return { d: 2, w: 0, y: 2026, r: ["T001", "T002", "T003", "T004", "T005", "T006", "T007", "T008", "T001", "T002", "T003", "T004"].map(function (i) { return { t: i, tm: "", sc: "", nt: "" } }) }
}
function savX() { try { sessionStorage.setItem(KEY_EX, JSON.stringify(ex)); push("ex"); } catch (e) { } }
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
/* push() ត្រូវតែរត់ជានិច្ច — បើ sessionStorage ពេញ (QuotaExceeded) មុននេះ exception រំលង push("rs") ហើយការកែបញ្ជីសិស្សមិនទៅ Cloud សោះ */
function savR(){try{var j=JSON.stringify(rs);if(window.LSG&&LSG.set)LSG.set(sessionStorage,RK,j);else sessionStorage.setItem(RK,j)}catch(e){}push("rs")}
function ss(a){return a.reduce(function(x,y){return x+(+y||0)},0)}
/* ===== ជំនួយ៖ ជួរដែលប្រើក្នុងថ្នាក់នីមួយៗ, ការគណនានិទ្ទេស, ចំណាត់ថ្នាក់, អវត្តមាន ===== */
function inf(){var i=rs.info||{};return{school:i.school||"វិទ្យាល័យបឹងត្របែក",year:i.year||syLabel(parseInt(syStart()))}}
/* ឆ្នាំសិក្សា៖ ចាប់ពីខែតុលា (ឧ. ២០២៦-២០២៧) · ទុកទទេ = ស្វ័យប្រវត្តិតាមកាលបរិច្ឆេទថ្ងៃនេះ */
function syLabel(y){return kn(y)+"-"+kn(y+1)}
function renderSY(){
  var y0=parseInt(syStart()),cur=(rs.info&&rs.info.year)||"",o="<option value=''>ស្វ័យប្រវត្តិ ("+syLabel(y0)+")</option>";
  for(var y=y0+1;y>=y0-4;y--){var v=syLabel(y);o+="<option"+(v===cur?" selected":"")+">"+v+"</option>"}
  if(cur&&o.indexOf(">"+cur+"<")<0)o+="<option selected>"+esc(cur)+"</option>";   /* តម្លៃចាស់ដែលវាយដោយដៃ */
  $("rsy").innerHTML=o;$("rsy").disabled=!isAdm();
  $("rsy").title=isAdm()?"ជ្រើសឆ្នាំសិក្សាសម្រាប់ប័ណ្ណពិន្ទុ និងរបាយការណ៍":"មានតែ Admin ទេដែលអាចប្ដូរឆ្នាំសិក្សា";
}
function ccf(c,p){return(c&&c.cf&&c.cf[p])||(p===1?[1,1,1,1,1,1]:[1,1,1,1,1])}
function ac(c,p){var f=ccf(c,p),o=[];for(var i=0;i<f.length;i++)if(f[i])o.push(i);return o}
function sa(s,k,c){var p=k==="a"?1:2;return ac(c,p).reduce(function(x,j){return x+(+(s[k]||[])[j]||0)},0)}
function fl(s,k,c){var A=ac(c,k==="a"?1:2);var v=s[k]||[];return A.length>0&&A.every(function(j){return v[j]!==""&&v[j]!=null})}
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
function abp(s,p){var r=abr(p),e=0,u=0,l=0,a=s.ab||{};for(var m=r[0];m<=r[1];m++){var v=a[m];if(v){e+=+v[0]||0;u+=+v[1]||0;l+=+v[2]||0}}return[e,u,l]}
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
  renderSY();
  if(!data.some(function(t){return t.id===rt})&&data.length)rt=data[0].id;
  $("rt").innerHTML=data.map(function(t){return"<option value='"+esc(t.id)+"'"+(t.id===rt?" selected":"")+">"+esc(t.name)+"</option>"}).join("");
  var cl=rs.c[rt]||[];if(rc>=cl.length)rc=0;
  pxFill(rt);
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
  h+="<p class=note style='margin:8px 0'>ព័ត៌មានសាលា (សម្រាប់ប័ណ្ណពិន្ទុ និងរបាយការណ៍)៖</p><div class=bar><label>សាលា</label><input data-s='i|school' value='"+esc(I.school)+"' style='flex:1 1 220px' "+(isAdmin?"":"disabled")+"></div>";
  $("rset").innerHTML=h;
}

$("rt").onchange=function(){rt=this.value;rc=0;renderR()};
$("rsy").onchange=function(){
  if(!isAdm()){renderSY();return}
  rs.info=rs.info||{};rs.info.year=this.value;savR();notify("ឆ្នាំសិក្សា៖ "+inf().year);
};
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
/* ជួរឈរពិន្ទុ៖ គ្រូជ្រើស/ផ្ទៀងផ្ទាត់ក្នុង COLMAP (colmap.js) · ប្រព័ន្ធទាយតាមឈ្មោះក្បាលតារាង */
var SCF=(function(){
  var A=[["october|oct|តុលា|ខែតុលា","តុលា"],["november|nov|វិច្ឆិកា|ខែវិច្ឆិកា","វិច្ឆិកា"],["december|dec|ធ្នូ|ខែធ្នូ","ធ្នូ"],["january|jan|មករា|ខែមករា","មករា"],["february|feb|កុម្ភៈ|កុម្ភះ|ខែកុម្ភៈ","កុម្ភៈ"],["s_1|s1|sem1|semester1|exam1|ប្រឡងឆមាសទី១|ប្រឡងឆមាស១|ឆមាសទី១","ប្រឡងឆមាសទី១"]],
      B=[["march|mar|មីនា|ខែមីនា","មីនា"],["april|apr|មេសា|ខែមេសា","មេសា"],["may|ឧសភា|ខែឧសភា","ឧសភា"],["june|jun|មិថុនា|ខែមិថុនា","មិថុនា"],["s_2|s2|sem2|semester2|exam2|ប្រឡងឆមាសទី២|ប្រឡងឆមាស២|ឆមាសទី២","ប្រឡងឆមាសទី២"]];
  function re(x){return new RegExp("^("+x.replace(/_/g,"_?")+")$")}
  return[{k:"id",l:"ID សិស្ស",req:true,re:/^(id|studentid|stuid|លេខសម្គាល់|លេខសម្កាល់|លេខសំគាល់|លេខអត្តសញ្ញាណ|អត្តលេខ)/},{k:"n",l:"ឈ្មោះសិស្ស",re:/^(name|studentname|fullname|ឈ្មោះ|គោត្តនាម)/}]
    .concat(A.map(function(x,j){return{k:"a"+j,l:x[1],re:re(x[0])}})).concat(B.map(function(x,j){return{k:"b"+j,l:x[1]+(j===4?"":" (ឆមាស២)"),re:re(x[0])}}));
})();
function parseWB(wb){
  COLMAP.open({title:"📥 នាំចូលពិន្ទុពី Excel — ផ្គូផ្គងជួរឈរ",wb:wb,fields:SCF,multi:true,
    note:"មួយសន្លឹក = មួយថ្នាក់ (ឈ្មោះសន្លឹក = ឈ្មោះថ្នាក់)។ ត្រូវមាន ID សិស្ស ហើយយ៉ាងតិចមួយជួរពិន្ទុ។",
    onOk:function(res){
      if(!Object.keys(res.sheets[0].map).some(function(k){return/^[ab]\d$/.test(k)})){alert("សូមជ្រើសយ៉ាងតិចមួយជួរពិន្ទុ (ឧ. តុលា)");return}
      impBuild(res);
    }});
}
function impBuild(res){
  imp=[];var errs=[];
  res.sheets.forEach(function(sh){
    var rows=sh.rows,m=sh.map,st=[],found={a:[0,0,0,0,0,0],b:[0,0,0,0,0]},mxv=0,skip=0,dup=0,seen={},bad=0;
    Object.keys(m).forEach(function(k){if(/^[ab]\d$/.test(k))found[k[0]][+k[1]]=1});
    function E(r,t){errs.push("សន្លឹក «"+sh.sn+"» · ជួរទី "+(r+1)+"៖ "+t)}
    for(var r=sh.hr+1;r<rows.length;r++){
      var row=rows[r];if(!row.some(function(v){return COLMAP.txt(v)}))continue;
      var idv=COLMAP.txt(row[m.id]),nm=m.n!=null?COLMAP.txt(row[m.n]):"",s={id:idv,n:nm,a:["","","","","",""],b:["","","","",""]},any=false;
      Object.keys(m).forEach(function(k){
        if(!/^[ab]\d$/.test(k))return;var v=row[m[k]];if(COLMAP.txt(v)==="")return;
        var x=COLMAP.num(v),lb=SCF.filter(function(f){return f.k===k})[0].l;
        if(isNaN(x)){E(r,(idv||nm||"")+" · "+lb+" «"+COLMAP.txt(v)+"» មិនមែនជាលេខ");bad++;return}
        if(x<0){E(r,(idv||nm||"")+" · "+lb+" "+x+" ជាលេខអវិជ្ជមាន");bad++;return}
        s[k[0]][+k[1]]=x;any=true;if(x>mxv)mxv=x;
      });
      if(!idv){if(any||nm){E(r,"គ្មាន ID"+(nm?" ("+nm+")":"")+" — មិនអាចផ្គូផ្គងសិស្សបានទេ");skip++}continue}
      if(seen[idv.toLowerCase()]){E(r,"ID «"+idv+"» ជាន់នឹងជួរទី "+seen[idv.toLowerCase()]);dup++;continue}
      seen[idv.toLowerCase()]=r+1;st.push(s);
    }
    imp.push({sn:sh.sn,n:sh.sn.trim().replace(/[\s_]+/g,"-"),st:st,found:found,max:mxv,names:m.n!=null,noid:false,skip:skip,dup:dup,bad:bad});
  });
  imp.errs=errs;
  if(!imp.length){alert("រកមិនឃើញតារាងពិន្ទុក្នុងឯកសារនេះទេ។ ត្រូវមានជួរ ID សិស្ស (ក្បាលតារាង «ID» ឬ «លេខសម្គាល់») ហើយជួរពិន្ទុមានឈ្មោះដូចជា October, November, December, January, S_1, March, April, May, June, S_2។");return}
  $("impl").innerHTML=imp.map(function(x,i){
    var ex=(rs.c[rt]||[]).filter(function(c){return c.n===x.n})[0],mt=0;
    if(ex)x.st.forEach(function(s){if(ex.st.some(function(q){return String(q.id||"").toLowerCase()===s.id.toLowerCase()}))mt++});
    return"<label class=it style='display:grid;grid-template-columns:auto 1fr;gap:4px 10px;align-items:start'><input type=checkbox class=chk data-i='"+i+"' "+(x.noid?"disabled":"checked")+" style='margin-top:6px'><span><b>"+esc(x.n)+"</b> · "+x.st.length+" សិស្ស (មាន ID) · ពិន្ទុខ្ពស់បំផុត "+x.max+
      (x.noid?" · <span style='color:var(--danger)'>គ្មានជួរ ID — មិនអាចនាំចូលបានទេ</span>":ex?" · <span style='color:var(--accent)'>ថ្នាក់មានរួចហើយ៖ ត្រូវ ID "+mt+" នាក់ (ធ្វើបច្ចុប្បន្នភាព) · ថ្មី "+(x.st.length-mt)+" នាក់</span>":" · ថ្នាក់ថ្មី")+
      (x.skip?" · <span style='color:var(--danger)'>រំលង "+x.skip+" ជួរគ្មាន ID</span>":"")+(x.dup?" · <span style='color:var(--danger)'>រំលង "+x.dup+" ជួរ ID ជាន់គ្នា</span>":"")+(x.bad?" · <span style='color:var(--danger)'>"+x.bad+" ពិន្ទុមិនត្រឹមត្រូវ</span>":"")+
      "<br><span class=note style='margin:0'>(សន្លឹក «"+esc(x.sn)+"»)</span></span></label>"}).join("")+
    (imp.errs&&imp.errs.length?"<details class=cm-err open><summary>⚠️ មាន "+kn(imp.errs.length)+" ចំណុចត្រូវពិនិត្យ (ទិន្នន័យទាំងនេះមិនត្រូវនាំចូលទេ)</summary><ol>"+imp.errs.slice(0,300).map(function(t){return"<li>"+esc(t)+"</li>"}).join("")+"</ol></details>":"");
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
    "<div class=hl><div style='display:flex;align-items:center;gap:10px'><img src='"+LOGOBT()+"' class=logo style='border-radius:50%' alt=''><div><b>"+esc(I.school)+"</b><br>កម្មវិធីសាលារៀនជំនាន់ថ្មី</div></div><div style='text-align:right'>ឆ្នាំសិក្សា៖ <b>"+esc(I.year||"............")+"</b></div></div>"+
    "<h2 class=moul style='text-align:center;font-size:14pt;margin:10px 0'>ប័ណ្ណពិន្ទុសិស្ស</h2>"+
    "<table class=ct style='margin-bottom:10px'><tbody><tr><td style='text-align:left'>ឈ្មោះសិស្ស៖ <b>"+esc(s.n)+"</b></td><td style='text-align:left'>លេខសម្គាល់៖ "+esc(s.id||"—")+"</td><td style='text-align:left'>ភេទ៖ "+esc(s.g||"—")+"</td></tr><tr><td style='text-align:left'>ថ្នាក់៖ <b>"+esc(c.n)+"</b></td><td style='text-align:left'>មុខវិជ្ជា៖ គណិតវិទ្យា</td><td style='text-align:left'>គ្រូបង្រៀន៖ "+esc(t.name||"")+"</td></tr></tbody></table>"+
    sem(1)+"<div style='height:8px'></div>"+sem(2)+"<div style='height:8px'></div>"+
    "<table class=ct><thead><tr><th colspan=6 style='text-align:left'>លទ្ធផលប្រចាំឆ្នាំ</th></tr><tr><th>សរុបឆមាស១</th><th>សរុបឆមាស២</th><th>សរុបពីរឆមាស</th><th>មធ្យម %</th><th>និទ្ទេសប្រចាំឆ្នាំ</th><th>ចំ.ថ្នាក់</th></tr></thead><tbody><tr><td>"+(fl(s,"a",c)?t1:"—")+"</td><td>"+(fl(s,"b",c)?t2:"—")+"</td><td><b>"+(ok?t1+t2:"—")+"</b></td><td>"+(ok?((t1+t2)/(mx*n)*100).toFixed(1):"—")+"</td><td><b style='font-size:13pt'>"+(gof(s,c,3)||"—")+"</b></td><td>"+rkt(3)+"</td></tr></tbody></table>"+
    "<table class=ct style='margin-top:8px'><thead><tr><th colspan=4 style='text-align:left'>អវត្តមាន (ថ្ងៃ)</th></tr><tr><th></th><th>មានច្បាប់</th><th>គ្មានច្បាប់</th><th>សរុប</th></tr></thead><tbody>"+
    [["ឆមាសទី១",a1],["ឆមាសទី២",a2],["ប្រចាំឆ្នាំ",ab]].map(function(x){return"<tr><td style='text-align:left'>"+x[0]+"</td><td>"+x[1][0]+"</td><td>"+x[1][1]+"</td><td><b>"+(x[1][0]+x[1][1])+"</b></td></tr>"}).join("")+"</tbody></table>"+
    "<p class=note style='margin:8px 0 0'>កម្រិតនិទ្ទេស៖ "+rs.pc.map(function(v,j){return"ABCDE"[j]+" ≥ "+v+"%"}).join(" · ")+" · F ក្រោម "+rs.pc[4]+"% (នៃពិន្ទុអតិបរមា)</p>"+
    "<div class=sig><div>មតិមាតា-បិតា ឬអ្នកអាណាព្យាបាល<br><br><br><br>ហត្ថលេខា</div><div>គ្រូបង្រៀន<br><br><br><br><b>"+esc(t.name||"")+"</b></div><div>នាយក/នាយិកាសាលា<br><br><br><br>ហត្ថលេខា</div></div></div>";
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
function doPrint(html){outChoose(html)}
/* ហ្វុងរៀបចំជាមុន (ផ្ទុកម្ដងពេលបើកកម្មវិធី) → realPrint ហៅ window.print() ភ្លាមៗក្នុង click handler ·
   Safari (macOS) មិនអនុញ្ញាត print() បន្ទាប់ពី Promise/setTimeout ក្រោយ user gesture */
var FONTS_READY=false;
(function(){
  var F=document.fonts,done=function(){FONTS_READY=true};
  if(!F||!F.load){done();return}
  var go=function(){Promise.all(['10pt "Khmer OS Muol Light"','10pt "Moul"','10pt "Battambang"','bold 10pt "Battambang"'].map(function(f){return F.load(f,"ក្សា").catch(function(){})})).then(done,done)};
  if(document.readyState==="complete")go();else window.addEventListener("load",go);
  setTimeout(done,6000);
})();
function realPrint(html){
  $("prt").innerHTML=html;document.body.classList.add("pm");
  var go=function(){window.print();setTimeout(prtClean,120000)};
  if(FONTS_READY||!(window.SCHX&&SCHX.fontsOk))go();   /* synchronous */
  else SCHX.fontsOk().then(function(){FONTS_READY=true;go()});
}
/* ជម្រើសបោះពុម្ព៖ «🖨️ បោះពុម្ព» (ផ្ទាំងបោះពុម្ពរបស់ប្រព័ន្ធ) ឬ «📄 ទាញយក PDF» (បង្កើតក្នុង browser ភ្លាម មិនឆ្លងកាត់ម៉ាស៊ីនបោះពុម្ព) */
var H2P_URL="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
function outChoose(html){
  var pm="";try{pm=localStorage.getItem("pmode")||""}catch(x){}
  if(pm==="pdf")return savePdf(html);if(pm==="print")return realPrint(html);
  var m=$("pchoose");
  if(!m){
    m=document.createElement("div");m.id="pchoose";m.setAttribute("role","dialog");m.setAttribute("aria-label","ជ្រើសរបៀបបោះពុម្ព");
    m.innerHTML="<div class=pc-box><b>តើចង់ធ្វើអ្វី?</b><div class=pc-btns><button type=button data-pc=pdf class=primary>📄 ទាញយក PDF<small>លឿន · មិនត្រូវការម៉ាស៊ីនបោះពុម្ព</small></button><button type=button data-pc=print>🖨️ បោះពុម្ព<small>បើកផ្ទាំងបោះពុម្ព</small></button></div><button type=button data-pc=x class=pc-x>បោះបង់</button></div>";
    document.body.appendChild(m);
    m.onclick=function(e){
      var b=e.target.closest("[data-pc]");if(!b&&e.target!==m)return;
      var k=b?b.dataset.pc:"x",h=m._html;m.hidden=true;m._html="";
      if(k==="print")realPrint(h);else if(k==="pdf")savePdf(h);
    };
    document.addEventListener("keydown",function(e){if(e.key==="Escape"&&!m.hidden){m.hidden=true;m._html=""}});
  }
  m._html=html;m.hidden=false;
  var b=m.querySelector("[data-pc=pdf]");if(b)b.focus();
}
function savePdf(html){
  notify("កំពុងបង្កើត PDF…");
  function go(){
    var land=/class=["']?pg\b[^"'>]*\b(land|osum)\b/.test(html),w=document.createElement("div");
    var hold=document.createElement("div");hold.className="pdfhold";   /* ទុកនៅក្រៅអេក្រង់ · html2pdf ចម្លងតែ w */
    w.className="pdfw";w.style.width=land?"281mm":"190mm";w.innerHTML=html;hold.appendChild(w);document.body.appendChild(hold);
    var t=(document.querySelector("#tabs button[aria-selected=true]")||{}).textContent||"ឯកសារ",d=new Date();
    var name=t.replace(/^[០-៩]+\.\s*/,"").replace(/[\\/:*?"<>|&]+/g,"-").trim()+"-"+d.getFullYear()+"-"+("0"+(d.getMonth()+1)).slice(-2)+"-"+("0"+d.getDate()).slice(-2)+".pdf";
    var done=function(){hold.remove()};
    pdfLineFix(w);pdfPaginate(w,land?194:277,land?281:190);
    window.html2pdf().set({margin:land?8:10,filename:name,image:{type:"jpeg",quality:0.95},html2canvas:{scale:2,backgroundColor:"#ffffff",useCORS:true,scrollX:0,scrollY:0},
      jsPDF:{unit:"mm",format:"a4",orientation:land?"landscape":"portrait"},pagebreak:{mode:[]}})
      .from(w).save().then(function(){done();notify("បានទាញយក PDF៖ "+name)},function(e){done();console.error(e);alert("មិនអាចបង្កើត PDF បានទេ។ សូមប្រើ «🖨️ បោះពុម្ព» ជំនួសវិញ។")});
  }
  if(window.html2pdf)return (document.fonts?document.fonts.ready:Promise.resolve()).then(go);
  var s=document.createElement("script");s.src=H2P_URL;s.onload=function(){(document.fonts?document.fonts.ready:Promise.resolve()).then(go)};
  s.onerror=function(){alert("មិនអាចទាញយកកម្មវិធីបង្កើត PDF បានទេ។ សូមពិនិត្យអ៊ីនធឺណិត ឬប្រើ «🖨️ បោះពុម្ព»។")};
  document.head.appendChild(s);
}
window.outChoose=outChoose;
/* PDF៖ html2canvas កាត់បន្ទាត់អក្សរខ្មែរខុសពី browser (គ្មានដកឃ្លារវាងពាក្យ → ពាក្យជាន់គ្នាត្រង់ចុងបន្ទាត់)
   ដំណោះស្រាយ៖ វាស់តួអក្សរដែល browser ចាប់ផ្ដើមបន្ទាត់ថ្មី រួចដាក់ <br> ត្រង់នោះ (ប្លង់ដដែល · html2canvas លែងកាត់បន្ទាត់ខ្លួនឯង) */
function pdfLineFix(w){
  var tw=document.createTreeWalker(w,NodeFilter.SHOW_TEXT,{acceptNode:function(n){return/\S/.test(n.nodeValue)&&n.nodeValue.length>1?1:2}}),L=[],n,rg=document.createRange();
  while((n=tw.nextNode()))L.push(n);
  L.forEach(function(t){
    var s=t.nodeValue,br=[],cy=null,cs=getComputedStyle(t.parentNode),lh=parseFloat(cs.lineHeight)||parseFloat(cs.fontSize)*1.5;
    /* បន្ទាត់ថ្មី = កណ្ដាលបញ្ឈរនៃតួអក្សរចុះក្រោមលើសពាក់កណ្ដាល line-height (អក្សរឡាតាំង/ខ្មែរ ពុម្ពផ្សេងគ្នា ស្ថិតលើបន្ទាត់ដដែល) */
    for(var i=0;i<s.length;i++){
      rg.setStart(t,i);rg.setEnd(t,i+1);var r=rg.getClientRects()[0];if(!r||!r.width)continue;
      var c=(r.top+r.bottom)/2;
      if(cy!==null&&c>cy+lh*.5){br.push(i);cy=c}else if(cy===null)cy=c;
    }
    for(var j=br.length-1;j>=0;j--){var rest=t.splitText(br[j]);rest.parentNode.insertBefore(document.createElement("br"),rest)}
  });
}
/* PDF៖ រុញផ្នែកដែលធ្លាក់ត្រង់បន្ទាត់ទំព័រ (ជួរ · ក្រុមជួរថ្ងៃតែមួយ · ជើងក្រោម · ហត្ថលេខា) ទៅទំព័របន្ទាប់
   pageH/contentW = កម្ពស់/ទទឹងផ្ទៃសរសេរនៃទំព័រ (mm) · .pg នីមួយៗចាប់ផ្ដើមទំព័រថ្មី */
function pdfPaginate(w,pageH,contentW){
  var H=pageH*w.getBoundingClientRect().width/contentW;
  var FT=/(^|\s)(cxf|sig|wpf|tsx-s|mt-ft)(\s|$)/,HD=/^H[234]$|(^|\s)(mt-s|mt-h|mt-b)(\s|$)/;
  /* រុញ el ទៅទំព័របន្ទាប់ដោយបន្ថែមចន្លោះ pad (ជួរតារាង → ជួរទទេ + ក្បាលតារាងឡើងវិញ) */
  function push(el,pad){
    if(el.tagName==="TR"||el.tagName==="TBODY"){
      var tbl=el.closest("table"),r0=tbl&&tbl.rows[0],nc=0;if(r0)[].forEach.call(r0.cells,function(c){nc+=c.colSpan});   /* colspan ត្រូវតែស្មើចំនួនជួរឈរ */
      var tr=document.createElement("tr");tr.className="pdfpad";tr.innerHTML="<td colspan="+(nc||1)+" style='height:"+pad+"px;padding:0;border:0!important;background:none!important'></td>";
      if(el.tagName==="TR")el.parentNode.insertBefore(tr,el);
      else{var tb=document.createElement("tbody");tb.className="pdfpad";tb.appendChild(tr);el.parentNode.insertBefore(tb,el)}
      /* ក្បាលតារាងឡើងវិញនៅទំព័រថ្មី (ដូចការបោះពុម្ព) */
      if(tbl&&tbl.tHead){var host=el.tagName==="TR"?el.parentNode:el,ref=el.tagName==="TR"?el:el.firstElementChild;
        [].forEach.call(tbl.tHead.rows,function(hr){var c=hr.cloneNode(true);c.classList.add("pdfpad");[].forEach.call(c.cells,function(td){var x=document.createElement("td");x.colSpan=td.colSpan;x.rowSpan=td.rowSpan;x.innerHTML=td.innerHTML;x.setAttribute("style",(td.getAttribute("style")||"")+";background:#eee;font-weight:700;text-align:center");td.parentNode.replaceChild(x,td)});host.insertBefore(c,ref)})}
    }else el.style.marginTop=(parseFloat(getComputedStyle(el).marginTop)||0)+pad+"px";
  }
  [].forEach.call(w.querySelectorAll(".pg"),function(pg){
    var items=pg.querySelectorAll("tbody,tr,.cxf,.sig,.card,.tsx-s,.wpf,.tsx-c,h2,h3,h4,.og,p,li,.cxi,.mt-ft,.mt-s,.mt-h,.mt-b,.mt-i,.mt-li,.mt-at");
    [].forEach.call(items,function(el){
      if(el.closest(".pdfpad")||el.closest("thead"))return;
      var P0=pg.getBoundingClientRect().top,r=el.getBoundingClientRect(),top=r.top-P0,h=r.height;
      if(!h||h>=H)return;
      var p=Math.floor(top/H),cross=Math.floor((top+h-1)/H)!==p,ft=FT.test(el.className),orph=ft&&p>0&&top-p*H<40;
      /* ចំណងជើង/ចំណងជើងរងនៅចុងទំព័រ (នៅសល់ < ៤៥px) → ទៅទំព័របន្ទាប់ជាមួយខ្លឹមសាររបស់វា */
      if(!cross&&!orph&&!(HD.test(el.tagName+" "+el.className)&&(p+1)*H-(top+h)<45))return;
      /* ហត្ថលេខា/ជើងឯកសារ៖ មិនឱ្យនៅតែឯងលើទំព័រថ្មី (កាត់ចន្លោះទំព័រ ឬធ្លាក់ទៅដើមទំព័រ) → យកជួរចុងក្រោយ (ឬប្លុកមុន) ទៅជាមួយ */
      if(ft){
        var q=cross?p+1:p,pv=el.previousElementSibling;while(pv&&!pv.getBoundingClientRect().height)pv=pv.previousElementSibling;
        var tg=null;if(pv)tg=pv.tagName==="TABLE"?(pv.tBodies.length>1?pv.tBodies[pv.tBodies.length-1]:pv.rows[pv.rows.length-1]):pv;
        if(tg&&!tg.closest("thead")){var t2=tg.getBoundingClientRect().top-P0;if(t2>=(q-1)*H&&t2<q*H&&top+h-t2<H*.9){push(tg,q*H-t2+2);return}}
        if(orph)return;
      }
      push(el,(p+1)*H-top+2);
    });
    /* .pg បន្ទាប់ចាប់ផ្ដើមទំព័រថ្មី៖ ពង្រីកដល់ពហុគុណកម្ពស់ទំព័រ · .pg ចុងក្រោយ៖ ខ្លីជាងមួយទំព័រ → ទុកកម្ពស់ដើម · វែងជាង → ដក ៤px កុំឱ្យការបង្គត់បង្កើតទំព័រទទេ */
    var ph=pg.getBoundingClientRect().height,last=!pg.nextElementSibling,np=Math.max(1,Math.ceil((ph-1)/H));
    if(!last)pg.style.setProperty("height",np*H+"px","important");
    else if(ph>H-4)pg.style.setProperty("height",(np*H-4)+"px","important");
    pg.style.overflow="hidden";pg.style.boxSizing="border-box";
  });
}
/* សម្អាត #prt ក្រោយបោះពុម្ព ៖ Safari ខ្លះមិនបាញ់ afterprint → ប្រើទាំង afterprint · matchMedia("print") · setTimeout ជំនួយ (មិនប៉ះ DOM កម្មវិធីទេ · CSS @media print លាក់ត្រឹម body.pm ពេលកំពុងព្រីន) */
function prtClean(){if(window.lpPrintUnmark)lpPrintUnmark();var cps=$("cuPageStyle");if(cps)cps.remove();if(!document.body.classList.contains("pm"))return;document.body.classList.remove("pm");var p=$("prt");if(p)p.innerHTML=""}
window.addEventListener("afterprint",prtClean);
try{var _mq=window.matchMedia("print");var _mf=function(e){if(!e.matches)setTimeout(prtClean,300)};if(_mq.addEventListener)_mq.addEventListener("change",_mf);else if(_mq.addListener)_mq.addListener(_mf)}catch(e){}
/* 💾 ប៊ូតុងរក្សាទុក (ការងាររដ្ឋបាល)៖ បង្ហាញស្ថានភាពពិត (មិនទាន់ · កំពុង · បាន ម៉ោង… · បរាជ័យ) · ចុច = រក្សាទុកភ្លាម
   p2 កិច្ចតែងការ (tasks) · p9 របាយការណ៍ (wr) · p13 Timesheet (ts) · p19 កំណត់ហេតុប្រជុំ (meetings.js · MTSAVE) */
var SVK={p2:"tasks",p8:"rs",p9:"wr",p13:"ts",p19:"mt"},svAt={},svWas={};
function svState(k){
  if(k==="mt"){var M=window.MTSAVE;return M&&M.dirty()?"dirty":M&&M.busy()?"busy":"ok"}
  if(sy.busy[k])return"busy";if(sy.dirty[k])return"dirty";if(sy.fail&&sy.fail[k])return"err";return"ok";
}
function svUI(){
  Object.keys(SVK).forEach(function(p){
    var b=$("sv-"+p);if(!b||$(p).hidden)return;var k=SVK[p],st=svState(k);
    if(svWas[k]==="busy"&&st==="ok"){var n=new Date();svAt[k]=("0"+n.getHours()).slice(-2)+":"+("0"+n.getMinutes()).slice(-2)}
    svWas[k]=st;
    if(b.dataset.st===st&&b.dataset.at===(svAt[k]||""))return;b.dataset.st=st;b.dataset.at=svAt[k]||"";
    b.innerHTML={dirty:k==="mt"?"💾 រក្សាទុកកំណត់ហេតុ":"💾 រក្សាទុក",busy:"⏳ កំពុងរក្សាទុក…",ok:"✅ បានរក្សាទុក"+(svAt[k]?" "+svAt[k]:""),err:"⚠️ មិនបានរក្សាទុក · ចុចម្ដងទៀត"}[st];
    b.disabled=st==="busy";
  });
}
function svInit(){
  Object.keys(SVK).forEach(function(p){
    var sec=$(p);if(!sec||$("sv-"+p))return;var bar=sec.querySelector(".bar");if(!bar)return;
    var b=document.createElement("button");b.type="button";b.id="sv-"+p;b.className="save-btn sv-btn";b.title="ទិន្នន័យរក្សាទុកដោយស្វ័យប្រវត្តិ · ចុចដើម្បីរក្សាទុកភ្លាម";
    b.onclick=function(){
      var k=SVK[p];
      if(k==="mt"){var M=window.MTSAVE;if(M&&M.dirty())M.save();else notify("បានរក្សាទុករួចហើយ");return}
      if(!window.FB||!FB.auth||!FB.auth.currentUser){notify("មិនទាន់ភ្ជាប់ Cloud");return}
      if(svState(k)==="ok"){notify("បានរក្សាទុករួចហើយ");return}
      clearTimeout(sy.t[k]);sy.dirty[k]=1;flush(k);svUI();
    };
    bar.appendChild(b);
  });
  setInterval(svUI,500);
}
svInit();
/* បិទ/ផ្ទុកទំព័រឡើងវិញ ខណៈទិន្នន័យមិនទាន់រក្សាទុក → ព្រមាន */
window.addEventListener("beforeunload",function(e){
  var pend=Object.keys(sy.dirty||{}).some(function(k){return sy.dirty[k]})||Object.keys(sy.busy||{}).some(function(k){return sy.busy[k]})||(window.MTSAVE&&MTSAVE.dirty());
  if(pend){e.preventDefault();e.returnValue=""}
});


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
/* បោះពុម្ពក្រាហ្វិក និងវិភាគ (ប្រើមាតិកាដែលបង្ហាញនៅលើអេក្រង់) */
$("vpr").onclick=function(){
  renderV();var I=inf(),PN=["","ឆមាសទី១","ឆមាសទី២","ប្រចាំឆ្នាំ"],c=curCls();
  var h="<div class='pg opr vpr'><div class=hd><div class=moul>ព្រះរាជាណាចក្រកម្ពុជា</div><div class=moul style='font-size:11pt'>ជាតិ សាសនា ព្រះមហាក្សត្រ</div></div>"+
   "<div class=hl><div style='display:flex;align-items:center;gap:10px'><img src='"+LOGOBT()+"' class=logo style='border-radius:50%' alt=''><div><b>"+esc(I.school)+"</b><br>កម្មវិធីសាលារៀនជំនាន់ថ្មី</div></div><div style='text-align:right'>ឆ្នាំសិក្សា៖ <b>"+esc(I.year)+"</b></div></div>"+
   "<h2 class=moul style='text-align:center;font-size:14pt;margin:6px 0 2px'>ក្រាហ្វិក និងវិភាគលទ្ធផលសិក្សា</h2>"+
   "<p style='text-align:center;margin:0 0 8px'>គ្រូ៖ <b>"+esc(tn(rt))+"</b>"+(c?" · ថ្នាក់៖ <b>"+esc(c.n)+"</b>":"")+" · "+PN[rp]+"</p>"+
   $("vbody").innerHTML+wpFoot(who.id,who.name,"អ្នករៀបចំ",true)+"</div>";
  window.SCHX.fontsOk().then(function(){doPrint(h)});
};
$("vt").onchange=function(){rt=this.value;rc=0;renderV()};
$("vc").onchange=function(){clsPick(this.value,renderV)};
$("vp").onchange=function(){rp=+this.value;renderV()};

/* ===== ផ្ទាំងទី ៧៖ បញ្ជីសិស្ស និងអវត្តមាន ===== */
var pv=1,pmo=0;
function renderP(){
  if(!data.some(function(t){return t.id===rt})&&data.length)rt=data[0].id;
  var cl=rs.c[rt]||[];if(rc>=cl.length)rc=0;
  pxFill(rt);
  $("pt").innerHTML=data.map(function(t){return"<option value='"+esc(t.id)+"'"+(t.id===rt?" selected":"")+">"+esc(t.name)+"</option>"}).join("");
  $("pc").innerHTML=clsOpts(cl,true);
  $("pmo").innerHTML=MK.map(function(m,i){return"<option value="+i+(i===pmo?" selected":"")+">"+m+"</option>"}).join("");
  $("pmo").hidden=pv!==2;
  [].forEach.call($("pseg").children,function(b){b.setAttribute("aria-selected",+b.dataset.pv===pv)});
  ["pim","ptpl","pex"].forEach(function(id){$(id).style.display=pv===3?"none":""});
  $("pren").style.display=pv===3||!canM()||!(rs.c[rt]||[]).length?"none":"";
  if(pv===3){renderPAll();return}
  var c=cl[rc],ro=!canM(),b="";
  if(!c){$("ptb").innerHTML="<tbody><tr><td class=empty>មិនទាន់មានថ្នាក់ទេ។</td></tr></tbody>";abSum(null);return}
  if(pv===1){
    c.st.forEach(function(s,i){
      var a=abp(s,3);
      b+="<tr><td>"+(i+1)+"</td><td><input data-p='"+i+"|id' value='"+esc(s.id||"")+"' style='width:100px' "+(ro?"readonly":"")+"></td><td><input data-p='"+i+"|n' value='"+esc(s.n)+"' style='min-width:150px' "+(ro?"readonly":"")+"></td><td><select data-p='"+i+"|g' style='width:auto;margin:0' "+(ro?"disabled":"")+"><option value=''>—</option>"+["ប្រុស","ស្រី"].map(function(x){return"<option"+(s.g===x?" selected":"")+">"+x+"</option>"}).join("")+"</select></td><td><input type=date data-p='"+i+"|dob' value='"+esc(s.dob||"")+"' style='width:150px' "+(ro?"readonly":"")+"></td><td><input data-p='"+i+"|ph' value='"+esc(s.ph||"")+"' inputmode=tel style='width:140px' "+(ro?"readonly":"")+"></td><td>"+(a[0]+a[1])+"</td>"+(ro?"":"<td><button type=button class=danger data-pdel='"+i+"' title='លុបសិស្សនេះ'>🗑️</button></td>")+"</tr>";
    });
    $("ptb").innerHTML="<thead><tr><th>ល.រ</th><th>លេខសម្គាល់</th><th>ឈ្មោះសិស្ស</th><th>ភេទ</th><th>ថ្ងៃខែឆ្នាំកំណើត</th><th>ទូរស័ព្ទអាណាព្យាបាល</th><th>អវត្តមានសរុប (ថ្ងៃ)</th>"+(ro?"":"<th></th>")+"</tr></thead><tbody>"+(b||"<tr><td colspan=8 class=empty>មិនទាន់មានសិស្សទេ។</td></tr>")+"</tbody>"+
      (ro?"":"<tfoot><tr><td colspan=8><button type=button class=primary data-padd>＋ បន្ថែមសិស្ស</button></td></tr></tfoot>");
    var m=c.st.filter(function(s){return s.g==="ប្រុស"}).length,f=c.st.filter(function(s){return s.g==="ស្រី"}).length;
    $("pnote").textContent="សិស្សសរុប "+c.st.length+" នាក់ · ប្រុស "+m+" · ស្រី "+f;
  }else{
    c.st.forEach(function(s,i){
      var v=(s.ab&&s.ab[pmo])||[0,0,0],y=abp(s,3);
      b+="<tr data-abr="+i+"><td>"+(i+1)+"</td><td class=nm>"+esc(s.n)+"</td>"+ABK.map(function(k){return"<td>"+abCell(i,k,v,ro)+"</td>"}).join("")+
        "<td class=ab-tot id='pms-"+i+"'>"+((+v[0]||0)+(+v[1]||0))+"</td><td class=ab-yr id='pyr-"+i+"'>"+abYr(y)+"</td></tr>";
    });
    $("ptb").innerHTML="<thead><tr><th>ល.រ</th><th>ឈ្មោះសិស្ស</th>"+ABK.map(function(k){return"<th>"+k.t+"</th>"}).join("")+"<th>អវត្តមានខែ "+MK[pmo]+"</th><th>ប្រចាំឆ្នាំ<br><small>យឺត · ច្បាប់ · ឥតច្បាប់</small></th></tr></thead><tbody>"+(b||"<tr><td colspan=7 class=empty>មិនទាន់មានសិស្សទេ។</td></tr>")+"</tbody>";
    $("pnote").textContent="💡 ចុចប៊ូតុង «មកយឺត» «ច្បាប់» ឬ «ឥតច្បាប់» ដើម្បីបូក ១ ដង (ចុច − ដើម្បីដក) ឬវាយលេខក្នុងប្រអប់ផ្ទាល់។ អវត្តមានឥតច្បាប់ចាប់ពី ៥ ថ្ងៃក្នុងមួយឆ្នាំ នឹងចូលក្នុងបញ្ជី «សិស្សត្រូវការការជួយជំនួយ»។";
  }
  abSum(c);
}
/* ថ្នាក់ទាំងអស់៖ ទិន្នន័យរួមពីគ្រប់គ្រូ · ថ្នាក់ដែលគ្រូច្រើននាក់បញ្ចូលស្ទួន → រាប់តែមួយ (យកបញ្ជីដែលមានសិស្សច្រើនជាងគេ) */
var pxOpen={};
function pkey(n){return String(n||"").toUpperCase().replace(/\s+/g,"")}
function pxGroups(){
  var G={};
  Object.keys(rs.c||{}).forEach(function(tid){(rs.c[tid]||[]).forEach(function(c){
    var k=pkey(c&&c.n);if(!k)return;(G[k]=G[k]||{k:k,src:[]}).src.push({t:tid,c:c});
  })});
  return Object.keys(G).map(function(k){
    var g=G[k];g.src.sort(function(a,b){return b.c.st.length-a.c.st.length});
    g.main=g.src[0];g.dup=g.src.slice(1);g.n=g.main.c.n;
    var st=g.main.c.st;g.tot=st.length;g.m=st.filter(function(s){return s.g==="ប្រុស"}).length;g.f=st.filter(function(s){return s.g==="ស្រី"}).length;
    return g;
  }).sort(function(a,b){return(parseInt(a.n)||99)-(parseInt(b.n)||99)||a.n.localeCompare(b.n)});
}
/* ថ្នាក់ទទេរបស់គ្រូ (០ នាក់) ដែលគ្រូផ្សេងបានបញ្ចូលសិស្សរួច → ចម្លងបញ្ជីសិស្សមក (ឈ្មោះ · ID · ភេទ · ថ្ងៃកំណើត · ទូរស័ព្ទ · មិនយកពិន្ទុ/អវត្តមាន) */
function pxFill(tid){
  if(!who||who.role==="monitor"||!(isAdm()||who.id===tid))return;
  var own=rs.c[tid]||[],empty=own.filter(function(c){return c&&(!c.st||!c.st.length)});if(!empty.length)return;
  var best={};
  Object.keys(rs.c||{}).forEach(function(t){if(t===tid)return;(rs.c[t]||[]).forEach(function(c){var k=pkey(c&&c.n);if(k&&c.st&&c.st.length&&(!best[k]||c.st.length>best[k].c.st.length))best[k]={t:t,c:c}})});
  var done=[];
  empty.forEach(function(c){var b=best[pkey(c.n)];if(!b)return;
    c.st=b.c.st.map(function(s){var o={id:s.id||"",n:s.n||"",g:s.g||"",a:["","","","","",""],b:["","","","",""]};if(s.dob)o.dob=s.dob;if(s.ph)o.ph=s.ph;return o});
    done.push(c.n+" ("+c.st.length+" នាក់ ពី "+(teacherOf(b.t).name||b.t)+")");
  });
  if(done.length){savR();notify("បានចម្លងបញ្ជីសិស្ស៖ "+done.join(" · "))}
}
function renderPAll(){
  var L=pxGroups(),T=0,Mb=0,F=0,nc=0,nd=0,b="",gr=null;
  L.forEach(function(g){if(g.tot)nc++;T+=g.tot;Mb+=g.m;F+=g.f;nd+=g.dup.length});
  function tn(id){return esc(teacherOf(id).name||id)}
  L.forEach(function(g){
    var gd=parseInt(g.n)||0;
    if(gd!==gr){gr=gd;var sub=L.filter(function(x){return(parseInt(x.n)||0)===gd}),st=sub.reduce(function(a,x){return a+x.tot},0);
      b+="<tr class=tr><td colspan=6>"+(gd?"ថ្នាក់ទី"+kn(gd):"ផ្សេងៗ")+" · "+kn(sub.length)+" ថ្នាក់ · "+kn(st)+" នាក់</td></tr>"}
    var op=pxOpen[g.k]!==false;
    b+="<tr><td class=nm><button type=button class=px-go data-pgo='"+esc(g.main.t)+"|"+esc(g.main.c.n)+"' title='បើកបញ្ជីសិស្សថ្នាក់នេះ'>"+esc(g.n)+"</button></td><td><b>"+kn(g.tot)+"</b></td><td>"+kn(g.m)+"</td><td>"+kn(g.f)+"</td><td>"+tn(g.main.t)+"</td>"+
      "<td>"+(g.tot?"<button type=button data-px='"+esc(g.k)+"'>"+(op?"🔼 បិទ":"👁️ មើលសិស្ស")+"</button>":"<span class=note>គ្មានសិស្ស</span>")+"</td></tr>";
    if(op&&g.tot)b+="<tr class=px-row><td colspan=6><ol class=px-list>"+g.main.c.st.map(function(s){return"<li class='"+(s.g==="ស្រី"?"f":s.g==="ប្រុស"?"m":"")+"'>"+esc(s.n)+"</li>"}).join("")+"</ol></td></tr>";
  });
  $("ptb").innerHTML="<thead><tr><th>ថ្នាក់</th><th>សិស្សសរុប</th><th>ប្រុស</th><th>ស្រី</th><th>បញ្ចូលដោយគ្រូ</th><th></th></tr></thead><tbody>"+(b||"<tr><td colspan=6 class=empty>មិនទាន់មានគ្រូណាបញ្ចូលសិស្សទេ។</td></tr>")+"</tbody>";
  var el=$("pabs");el.hidden=false;
  el.innerHTML="<h3>📚 ទិន្នន័យសិស្សរួម (គ្រប់គ្រូ · គ្រប់ថ្នាក់)</h3><div class=ab-sts>"+
    "<div class='ab-st ab-exc'><b>"+kn(nc)+"</b><span>ថ្នាក់ដែលមានសិស្ស</span></div><div class='ab-st ab-ok'><b>"+kn(T)+"</b><span>សិស្សសរុប (នាក់)</span></div>"+
    "<div class='ab-st ab-exc'><b>"+kn(Mb)+"</b><span>ប្រុស</span></div><div class='ab-st ab-une'><b>"+kn(F)+"</b><span>ស្រី</span></div></div>"+
    "";
  $("pnote").textContent="💡 ទិន្នន័យនេះរួមបញ្ចូលថ្នាក់ដែលគ្រូទាំងអស់បានបញ្ចូល។ ចុច «👁️ មើលសិស្ស» ដើម្បីមើលបញ្ជីឈ្មោះ។ ការកែបញ្ជីសិស្ស ធ្វើនៅផ្ទាំង «បញ្ជីសិស្ស» របស់គ្រូម្ចាស់ថ្នាក់។";
}
$("ptb").addEventListener("click",function(e){
  var b=e.target.closest("[data-px]");if(b){pxOpen[b.dataset.px]=pxOpen[b.dataset.px]===false;renderPAll();return}
  var g=e.target.closest("[data-pgo]");if(!g)return;
  var a=g.dataset.pgo.split("|"),i=(rs.c[a[0]]||[]).map(function(c){return c.n}).indexOf(a[1]);
  if(i>=0){rt=a[0];rc=i;pv=1;renderP();window.scrollTo(0,0)}
});
/* អវត្តមាន៖ s.ab[ខែ] = [ច្បាប់, ឥតច្បាប់, មកយឺត] */
var ABK=[{i:2,t:"មកយឺត",ic:"⏰",c:"late"},{i:0,t:"ច្បាប់",ic:"📝",c:"exc"},{i:1,t:"ឥតច្បាប់",ic:"❌",c:"une"}];
function abCell(i,k,v,ro){
  var n=+v[k.i]||0;
  return"<div class='ab-cell ab-"+k.c+"'><button type=button class=ab-b data-ab='"+i+"|"+k.i+"|1'"+(ro?" disabled":"")+"><span>"+k.ic+"</span>"+k.t+"</button>"+
    "<input class='ab-box"+(n?" on":"")+"' type=number min=0 max=31 inputmode=numeric data-p='"+i+"|ab|"+k.i+"' value='"+(n||"")+"' placeholder=0 aria-label='"+k.t+"' "+(ro?"readonly":"")+">"+
    (ro?"":"<button type=button class=ab-m data-ab='"+i+"|"+k.i+"|-1' title='ដក ១' aria-label='ដក ១'>−</button>")+"</div>";
}
function abYr(y){return"<span class=ab-late>"+y[2]+"</span> · <span class=ab-exc>"+y[0]+"</span> · <span class='ab-une"+(y[1]>=5?" hot":"")+"'>"+y[1]+"</span>"}
function abSet(s,k,n){
  s.ab=s.ab||{};var x=s.ab[pmo]=s.ab[pmo]||[0,0,0];
  while(x.length<3)x.push(0);x[k]=Math.min(31,Math.max(0,n));
  if(!x[0]&&!x[1]&&!x[2])delete s.ab[pmo];
  return x;
}
function abRow(i,s){
  var v=(s.ab&&s.ab[pmo])||[0,0,0],t=$("pms-"+i),y=$("pyr-"+i);
  if(t)t.textContent=(+v[0]||0)+(+v[1]||0);
  if(y)y.innerHTML=abYr(abp(s,3));
}
/* ចលនា «+១» លោតពីប៊ូតុង ចូលប្រអប់ចំនួន */
function abFly(btn,box,d){
  box.classList.remove("pop");void box.offsetWidth;
  var nm=document.documentElement.classList.contains("no-motion")||!box.animate;
  if(nm){box.classList.add("pop");return}
  var a=btn.getBoundingClientRect(),b=box.getBoundingClientRect(),f=document.createElement("span");
  f.className="ab-fly "+btn.parentNode.className.split(" ")[1];f.textContent=d>0?"+1":"−1";
  f.style.left=(a.left+a.width/2)+"px";f.style.top=(a.top+a.height/2)+"px";document.body.appendChild(f);
  var dx=b.left+b.width/2-a.left-a.width/2,dy=b.top+b.height/2-a.top-a.height/2;
  f.animate([{transform:"translate(-50%,-50%) scale(.6)",opacity:0},{transform:"translate(calc(-50% + "+dx/2+"px),calc(-50% + "+(dy/2-38)+"px)) scale(1.25)",opacity:1,offset:.45},{transform:"translate(calc(-50% + "+dx+"px),calc(-50% + "+dy+"px)) scale(.7)",opacity:.9}],{duration:520,easing:"cubic-bezier(.3,.7,.4,1)"}).onfinish=function(){f.remove();box.classList.add("pop")};
}
/* សង្ខេបវត្តមានប្រចាំខែ */
function abSum(c){
  var el=$("pabs");if(!el)return;
  if(pv!==2||!c||!c.st.length){el.innerHTML="";el.hidden=true;return}
  el.hidden=false;
  var T=[0,0,0],lst=[],n=c.st.length,ok=0,hot=[];
  c.st.forEach(function(s){
    var v=(s.ab&&s.ab[pmo])||[0,0,0],e=+v[0]||0,u=+v[1]||0,l=+v[2]||0;T[0]+=e;T[1]+=u;T[2]+=l;
    if(e+u+l)lst.push({n:s.n,e:e,u:u,l:l,t:e+u+l});else ok++;
    var y=abp(s,3);if(y[1]>=5)hot.push({n:s.n,u:y[1]});
  });
  lst.sort(function(a,b){return b.t-a.t||b.u-a.u});hot.sort(function(a,b){return b.u-a.u});
  var mx=lst.length?lst[0].t:1,all=T[0]+T[1]+T[2]||1;
  function card(k,v,lb){return"<div class='ab-st ab-"+k+"'><b data-cnt="+v+">0</b><span>"+lb+"</span></div>"}
  var h="<h3>📊 សង្ខេបវត្តមាន ខែ"+MK[pmo]+" — "+esc(c.n)+"</h3><div class=ab-sts>"+
    card("late",T[2],"⏰ មកយឺត (ដង)")+card("exc",T[0],"📝 ច្បាប់ (ថ្ងៃ)")+card("une",T[1],"❌ ឥតច្បាប់ (ថ្ងៃ)")+card("ok",ok,"✅ វត្តមានពេញ (នាក់)")+"</div>"+
    "<div class=ab-mix title='សមាមាត្រ'>"+[["late",2],["exc",0],["une",1]].map(function(k){return"<i class=ab-"+k[0]+" style='width:"+(T[k[1]]/all*100)+"%'></i>"}).join("")+"</div>"+
    "<div class=ab-legend><span class=ab-late>មកយឺត</span><span class=ab-exc>ច្បាប់</span><span class=ab-une>ឥតច្បាប់</span><span>សិស្សសរុប "+n+" នាក់ · មានអវត្តមាន/យឺត "+lst.length+" នាក់</span></div>"+
    "<div class=ab-cols><div><h4>សិស្សអវត្តមាន ឬមកយឺតច្រើនជាងគេ</h4>"+(lst.length?lst.slice(0,8).map(function(x){
      return"<div class=ab-rk><span class=nm>"+esc(x.n)+"</span><span class=ab-bar>"+[["late","l"],["exc","e"],["une","u"]].map(function(k){return x[k[1]]?"<i class=ab-"+k[0]+" style='width:"+(x[k[1]]/mx*100)+"%' title='"+x[k[1]]+"'>"+x[k[1]]+"</i>":""}).join("")+"</span><b>"+x.t+"</b></div>"}).join(""):"<p class=empty>ខែនេះសិស្សទាំងអស់មានវត្តមានពេញ 🎉</p>")+"</div>"+
    "<div><h4>⚠️ ឥតច្បាប់ចាប់ពី ៥ ថ្ងៃ (ប្រចាំឆ្នាំ)</h4>"+(hot.length?hot.map(function(x){return"<div class=ab-hot><span class=nm>"+esc(x.n)+"</span><b>"+x.u+" ថ្ងៃ</b></div>"}).join(""):"<p class=empty>មិនមានទេ ✅</p>")+"</div></div>";
  el.innerHTML=h;
  [].forEach.call(el.querySelectorAll("[data-cnt]"),function(b){
    var t=+b.dataset.cnt,t0=performance.now();
    if(!t||document.documentElement.classList.contains("no-motion")){b.textContent=t;return}
    (function st(now){var k=Math.max(0,Math.min(1,(now-t0)/600));b.textContent=Math.round(t*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(st)})(t0);
  });
}
$("pt").onchange=function(){rt=this.value;rc=0;if(pv===3)pv=1;renderP()};
$("pc").onchange=function(){if(pv===3)pv=1;clsPick(this.value,renderP)};
/* ✏️ ប្ដូរឈ្មោះថ្នាក់ (ឧ. ចូលខុសកម្រិត 11NGS-C → 10NGS-C)៖ សិស្ស ពិន្ទុ អវត្តមាន ប្លង់តុ នៅដដែល · តំណហាត់ប្ដូរតាម · គណនីប្រធាន/អនុប្រធាន បង្កើតឡើងវិញ */
$("pren").onclick=function(){
  var c=curCls();if(!c||!canM())return;
  var d=$("dlgRen");if(!d){d=document.createElement("dialog");d.id="dlgRen";document.body.appendChild(d)}
  var have=(rs.c[rt]||[]).map(function(x){return x.n}),nm=CL.map(function(x){return x.slice(2)}).filter(function(n){return n===c.n||have.indexOf(n)<0});
  var na=window.MONUI&&MONUI.has?MONUI.has(rt,c.n):0;
  d.innerHTML="<form method=dialog class=dlgb style='display:block;padding:18px;min-width:min(440px,92vw)'><h2 style='margin:0 0 10px'>✏️ ប្ដូរឈ្មោះថ្នាក់ «"+esc(c.n)+"»</h2>"+
    "<label>ឈ្មោះថ្មី</label><select id=renN style='width:100%'>"+nm.map(function(n){return"<option"+(n===c.n?" selected":"")+">"+esc(n)+"</option>"}).join("")+"</select>"+
    "<ul class=note style='margin:10px 0;padding-left:18px'><li>សិស្ស ពិន្ទុ អវត្តមាន រចនាសម្ព័ន្ធ និងប្លង់តុ នៅដដែល</li><li>តំណហ្វឹកហាត់បន្ថែមរបស់ថ្នាក់ ប្ដូរតាម</li>"+
    (na?"<li><b>គណនីប្រធាន/អនុប្រធាន "+na+"</b> នឹងបង្កើតឡើងវិញ (សិស្សដដែល) · <b>លេខសម្គាល់ និងលេខសម្ងាត់ថ្មី</b> ត្រូវផ្ដល់ឱ្យសិស្សម្ដងទៀត</li>":"")+
    "<li>កាលវិភាគបង្រៀន និងសម្រង់អត្ថបទ មិនប្ដូរទេ (កែនៅទីនោះ បើចាំបាច់)</li></ul>"+
    "<div class=dlgf style='display:flex;gap:8px;justify-content:flex-end'><button type=button id=renX>បោះបង់</button><button type=button class=primary id=renOk>ប្ដូរឈ្មោះ</button></div></form>";
  d.showModal();
  $("renX").onclick=function(){d.close()};
  $("renOk").onclick=function(){
    var nn=$("renN").value,old=c.n,tid=rt;if(!nn||nn===old){d.close();return}
    if((rs.c[tid]||[]).some(function(x){return x!==c&&x.n===nn})){alert("មានថ្នាក់ «"+nn+"» រួចហើយ");return}
    this.disabled=true;this.textContent="⏳ កំពុងប្ដូរ…";
    if(window.MONUI&&MONUI.apply)MONUI.apply();   /* បញ្ចូលទិន្នន័យប្រធានថ្នាក់ដែលមិនទាន់បញ្ចូល មុនប្ដូរ */
    c.n=nn;savR();
    var p1=window.FB&&FB.getDocs?FB.getDocs(FB.query(FB.collection(db,"pcls"),FB.where("o","==",tid))).then(function(sn){var ps=[];sn.forEach(function(x){if(x.data().cls===old)ps.push(FB.updateDoc(FB.doc(db,"pcls",x.id),{cls:nn,g:parseInt(nn)||0}))});return Promise.all(ps)}).catch(function(e){console.warn("pcls rename:",e)}):Promise.resolve();
    var p2=window.MONUI&&MONUI.migrate&&na?MONUI.migrate(tid,old,nn):Promise.resolve(0);
    Promise.all([p1,p2]).then(function(r){d.close();renderP();notify("បានប្ដូរ «"+old+"» → «"+nn+"»"+(r[1]?" · គណនីប្រធាន/អនុប្រធាន "+r[1]+" ត្រូវបានបង្កើតឡើងវិញ (មើលលេខសម្ងាត់ថ្មីខាងក្រោម)":""))},
      function(e){d.close();renderP();console.error(e);alert("ប្ដូរឈ្មោះថ្នាក់រួច ប៉ុន្តែការបង្កើតគណនីប្រធាន/អនុប្រធានឡើងវិញមានបញ្ហា៖ "+(e&&e.message||e)+"\nសូមលុប ហើយបង្កើតគណនីម្ដងទៀតដោយដៃ")});
  };
};
$("pmo").onchange=function(){pmo=+this.value;renderP()};
$("pseg").onclick=function(e){var b=e.target.closest("button");if(b){pv=+b.dataset.pv;renderP()}};
$("ptb").oninput=function(e){
  var p=e.target.dataset.p;if(!p)return;
  if(!canM()){renderP();return}
  var a=p.split("|"),c=curCls(),s=c&&c.st[+a[0]];if(!s)return;
  if(a[1]==="ab"){
    abSet(s,+a[2],e.target.value===""?0:Math.round(+e.target.value)||0);
    e.target.classList.toggle("on",+e.target.value>0);abRow(+a[0],s);abSum(c);
  }else s[a[1]]=e.target.value;
  savR();
};
$("ptb").onchange=function(e){if(e.target.dataset.p&&e.target.dataset.p.indexOf("|ab|")>0)renderP()};
/* ចុចប៊ូតុងអវត្តមាន៖ បូក/ដក ១ */
$("ptb").addEventListener("click",function(e){
  var bt=e.target.closest("[data-ab]");if(!bt)return;
  if(!canM())return;var c=curCls(),a=bt.dataset.ab.split("|"),i=+a[0],k=+a[1],d=+a[2],s=c&&c.st[i];if(!s)return;
  var cur=+(((s.ab||{})[pmo]||[])[k])||0;if(d<0&&!cur)return;
  var x=abSet(s,k,cur+d),box=bt.parentNode.querySelector(".ab-box"),n=+((s.ab[pmo]||x)[k])||0;
  box.value=n||"";box.classList.toggle("on",n>0);abFly(bt,box,d);abRow(i,s);abSum(c);savR();
});
/* បន្ថែម/លុបសិស្ស (ពិន្ទុ អវត្តមាន និងក្រុមរបស់សិស្សនោះត្រូវលុបជាមួយ) */
$("ptb").addEventListener("click",function(e){
  if(!canM())return;var c=curCls();if(!c)return;
  if(e.target.closest("[data-padd]")){
    c.st.push({id:"",n:"",g:"",a:["","","","","",""],b:["","","","",""]});savR();renderP();
    var ins=$("ptb").querySelectorAll("input[data-p$='|n']");if(ins.length)ins[ins.length-1].focus();return;
  }
  var d=e.target.closest("[data-pdel]");if(!d)return;
  var i=+d.dataset.pdel,st=c.st[i];if(!st)return;
  if(!confirm("លុបសិស្ស «"+(st.n||"(គ្មានឈ្មោះ)")+"» ចេញពីថ្នាក់ "+c.n+"?\n\nពិន្ទុ និងអវត្តមានរបស់សិស្សនេះនឹងត្រូវលុបផងដែរ។"))return;
  c.st.splice(i,1);savR();renderP();notify("បានលុបសិស្ស "+(st.n||""));
});
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
  var ok=function(y,mo,d){var t=new Date(y,mo-1,d);return t.getFullYear()===y&&t.getMonth()===mo-1&&t.getDate()===d?y+"-"+pad2(mo)+"-"+pad2(d):""};   /* បដិសេធ ខែ ១៣ · ថ្ងៃ ៤០ … */
  var m=/^(\d{4})[-\/.](\d{1,2})[-\/.](\d{1,2})$/.exec(v);if(m)return ok(+m[1],+m[2],+m[3]);
  m=/^(\d{1,2})[-\/.](\d{1,2})[-\/.](\d{4})$/.exec(v);if(m)return ok(+m[3],+m[2],+m[1]);
  return"";
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
      var wb;try{wb=XLSX.read(ev.target.result,{type:"array",codepage:65001,raw:/\.csv$/i.test(f.name)})}catch(er){console.error(er);alert("មិនអាចអានឯកសារនេះបានទេ!");return}
      var F=[{k:"id",l:"លេខសម្គាល់",re:PCOL.id},{k:"n",l:"ឈ្មោះសិស្ស",req:true,re:PCOL.n},{k:"g",l:"ភេទ",re:PCOL.g},{k:"dob",l:"ថ្ងៃខែឆ្នាំកំណើត",re:PCOL.dob},{k:"ph",l:"ទូរស័ព្ទអាណាព្យាបាល",re:PCOL.ph}];
      COLMAP.open({title:"📥 នាំចូលបញ្ជីសិស្ស — ផ្គូផ្គងជួរឈរ",wb:wb,fields:F,note:"យ៉ាងតិចត្រូវមាន «ឈ្មោះសិស្ស»។",onOk:function(res){
        var sh=res.sheets[0],rows=sh.rows,m=sh.map,out=[],errs=[],seen={};
        function E(r,t){errs.push("ជួរទី "+(r+1)+"៖ "+t)}
        for(var i=sh.hr+1;i<rows.length;i++){
          var row=rows[i];if(!row.some(function(v){return COLMAP.txt(v)}))continue;
          var cell=function(k){return m[k]==null?"":COLMAP.txt(row[m[k]])},o={n:cell("n")};
          if(!o.n){E(i,"គ្មានឈ្មោះសិស្ស"+(cell("id")?" (ID "+cell("id")+")":"")+" — រំលង");continue}
          if(m.id!=null){o.id=cell("id");if(o.id){var lk=o.id.toLowerCase();if(seen[lk]){E(i,o.n+" · ID «"+o.id+"» ជាន់នឹងជួរទី "+seen[lk]+" — រំលង");continue}seen[lk]=i+1}}
          if(m.g!=null){o.g=pGender(cell("g"));if(!o.g&&cell("g"))E(i,o.n+" · ភេទ «"+cell("g")+"» មិនស្គាល់ (ប្រើ ប្រុស/ស្រី · M/F) — ទុកទទេ")}
          if(m.dob!=null){o.dob=pDate(row[m.dob]);if(!o.dob&&cell("dob"))E(i,o.n+" · ថ្ងៃកំណើត «"+cell("dob")+"» មិនត្រឹមត្រូវ (ប្រើ dd/mm/yyyy) — ទុកទទេ")}
          if(m.ph!=null){o.ph=cell("ph");if(typeof row[m.ph]==="number"&&o.ph.charAt(0)!=="0")o.ph="0"+o.ph}   /* Excel លុបលេខ 0 ខាងមុខលេខទូរស័ព្ទ */
          out.push(o);
        }
        if(!out.length){COLMAP.report({title:"📥 នាំចូលបញ្ជីសិស្ស",html:"<p>រកមិនឃើញសិស្សក្នុងសន្លឹក «"+esc(sh.sn)+"» ទេ។</p>",errs:errs,ok:false});return}
        var c=curCls(),add=[],upd=0;
        out.forEach(function(o){
          var t=c.st.filter(function(q){return o.id?String(q.id||"").toLowerCase()===o.id.toLowerCase():q.n===o.n})[0];
          if(t)upd++;else add.push(o);
        });
        COLMAP.report({title:"📥 នាំចូលទៅថ្នាក់ «"+c.n+"»",okText:"នាំចូល "+out.length+" នាក់",errs:errs,
          html:"<ul><li>សិស្សថ្មី៖ <b>"+add.length+"</b> នាក់</li><li>ធ្វើបច្ចុប្បន្នភាព (មានរួចហើយ)៖ <b>"+upd+"</b> នាក់</li><li>សន្លឹក៖ «"+esc(sh.sn)+"»</li></ul>",
          onOk:function(){
            out.forEach(function(o){
              var t=c.st.filter(function(q){return o.id?String(q.id||"").toLowerCase()===o.id.toLowerCase():q.n===o.n})[0];
              if(!t){t={id:"",n:o.n,a:["","","","","",""],b:["","","","",""]};c.st.push(t)}
              Object.keys(o).forEach(function(k){if(o[k]!==""||k==="n")t[k]=o[k]});
            });
            savR();renderP();notify("បាននាំចូល៖ ថ្មី "+add.length+" នាក់ · ធ្វើបច្ចុប្បន្នភាព "+upd+" នាក់");
          }});
      }});
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
/* ម៉ោង = បញ្ជីជ្រើស «ម៉ោង : នាទី» (Safari/ទូរស័ព្ទ៖ input type=time គ្មានផ្ទាំងជ្រើស និងពិបាកកែ) */
function tmSel(k,v,ro){
  var m=/^(\d{1,2}):(\d{2})/.exec(v||""),h=m?+m[1]:-1,mi=m?+m[2]:-1,o="<select data-wt='"+k+"|h' class=wth"+(ro?" disabled":"")+"><option value=''>--</option>";
  for(var i=0;i<24;i++)o+="<option value="+i+(i===h?" selected":"")+">"+("0"+i).slice(-2)+"</option>";
  o+="</select><b>:</b><select data-wt='"+k+"|m' class=wtn"+(ro?" disabled":"")+"><option value=''>--</option>";
  var ms=[];for(var j=0;j<60;j+=5)ms.push(j);if(mi>=0&&ms.indexOf(mi)<0){ms.push(mi);ms.sort(function(a,b){return a-b})}
  ms.forEach(function(j){o+="<option value="+j+(j===mi?" selected":"")+">"+("0"+j).slice(-2)+"</option>"});
  return o+"</select>";
}
function renderW(){
  var isAdmin=(isAdm());
  if(!wt||(!isAdmin&&wt!==who.id))wt=who.id;
  $("wt").innerHTML=data.filter(function(t){return isAdmin||t.id===who.id}).map(function(t){return"<option value='"+esc(t.id)+"'"+(t.id===wt?" selected":"")+">"+esc(t.name)+"</option>"}).join("");
  $("wm").value=wmo;
  var ro=!(isAdmin||who.id===wt);
  $("wadd").style.display=ro?"none":"inline-block";
  var L=wlist(),b="";
  L.forEach(function(e){
    b+="<tr><td><input type=date data-w='"+e.u+"|d' value='"+esc(e.d)+"' style='width:150px' "+(ro?"readonly":"")+"></td><td><div class=wtm><span>ចាប់ផ្ដើម</span>"+tmSel(e.u+"|a",e.a,ro)+"</div><div class=wtm><span>បញ្ចប់</span>"+tmSel(e.u+"|b",e.b,ro)+"</div><div class=note style='margin:2px 0 0' id='wd-"+e.u+"'>"+dur(e.a,e.b)+"</div></td><td><textarea rows=3 data-w='"+e.u+"|c' style='min-width:260px;margin:0' placeholder='ខ្លឹមសារសកម្មភាព (មួយចំណុចក្នុងមួយបន្ទាត់)' "+(ro?"readonly":"")+">"+esc(e.c||"")+"</textarea></td><td class=acts>"+(ro?"":"<button data-wi='"+e.u+"'>🖼️ រូបភាព"+(wimg[e.u]&&wimg[e.u].length?" ("+wimg[e.u].length+")":"")+"</button> <button class=danger data-wd='"+e.u+"'>លុប</button>")+"</td></tr>";
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
$("wtb").addEventListener("change",function(e){
  var p=e.target.dataset.wt;if(!p)return;
  var a=p.split("|"),en=(wr.r[wt]||[]).filter(function(x){return x.u===a[0]})[0];if(!en)return;
  var td=e.target.closest(".wtm"),hs=td.querySelector(".wth"),ns=td.querySelector(".wtn");
  if(hs.value===""){en[a[1]]="";ns.value=""}else{if(ns.value==="")ns.value="0";en[a[1]]=("0"+hs.value).slice(-2)+":"+("0"+ns.value).slice(-2)}
  savW();var el=$("wd-"+a[0]);if(el)el.textContent=dur(en.a,en.b);
});
$("wtb").oninput=function(e){
  var p=e.target.dataset.w;if(!p)return;
  var a=p.split("|"),en=(wr.r[wt]||[]).filter(function(x){return x.u===a[0]})[0];if(!en)return;
  en[a[1]]=e.target.value;savW();
  if(a[1]==="a"||a[1]==="b"){var el=$("wd-"+a[0]);if(el)el.textContent=dur(en.a,en.b)}
};
/* ប្ដូរថ្ងៃ → តម្រៀបជួរឡើងវិញតែពេលចេញពីប្រអប់ថ្ងៃ (កុំកាត់ការវាយ/ផ្ទាំងប្រតិទិន) */
var wSort=false;
$("wtb").onchange=function(e){var p=e.target.dataset.w;if(p&&p.slice(-2)==="|d")wSort=true};
$("wtb").addEventListener("focusout",function(e){var p=e.target.dataset&&e.target.dataset.w;if(!wSort||!p||p.slice(-2)!=="|d")return;setTimeout(function(){if(wSort&&!pickerBusy()){wSort=false;renderW()}},250)});
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
function LOGOBT(){return(document.querySelector(".brand-logo")||{}).src||new URL("logo-bt.jpg",location.href).href}
function reportHTML(){
  var t=teacherOf(wt),I=inf(),L=wlist(),p=wmo.split("-"),mn=M[+p[1]-1]||"";
  var role=(t.rl||"សមាជិក")+"ក្រុមបច្ចេកទេស";
  var rows=L.map(function(e){
    var cc=(e.c||"").split(/\r?\n/).filter(Boolean),ims=(wimg[e.u]||[]).map(function(s){return"<img src='"+safeSrc(s)+"' class=wim>"}).join("");
    return"<tr><td>"+fdd(e.d)+"</td><td>"+(dur(e.a,e.b)||"")+(e.a&&e.b?"<br>("+ft(e.a)+"-"+ft(e.b)+")"+ampm(e.b):"")+"</td><td style='text-align:left'>"+cc.map(function(x,i){return esc(x)}).join("<br>")+"</td><td>"+ims+"</td></tr>";
  }).join("");
  return"<div class='pg rpt'><div class=hd><div class=moul>ព្រះរាជាណាចក្រកម្ពុជា</div><div class=moul style='font-size:11pt'>ជាតិ សាសនា ព្រះមហាក្សត្រ</div></div>"+
    "<div style='display:flex;align-items:center;gap:10px;margin:6px 0 10px'><img src='"+LOGO+"' class=logo alt=''><div><div class=moul style='text-align:left'>"+esc(I.school)+"</div><div>កម្មវិធីសាលារៀនជំនាន់ថ្មី</div></div></div>"+
    "<h2 class=moul style='text-align:center;font-size:13pt;margin:10px 0'>របាយការណ៍ការងារ"+esc(role)+"គណិតវិទ្យា ប្រចាំខែ"+mn+" ឆ្នាំ"+kn(p[0])+"</h2>"+
    "<p style='text-indent:1.2cm;margin:6px 0'>គោរពជម្រាបជូនគណៈគ្រប់គ្រង សូមជូនរបាយការណ៍ការងារក្រុមបច្ចេកទេសគណិតវិទ្យា នៅ"+esc(I.school)+" សាលារៀនជំនាន់ថ្មី (NGS) មានដូចតទៅ៖</p>"+
    "<table class=ct style='width:100%'><thead><tr><th style='width:16%'>កាលបរិច្ឆេទ</th><th style='width:18%'>រយៈពេល</th><th>ខ្លឹមសារសកម្មភាព</th><th style='width:24%'>សកម្មភាព (រូបភាព...)</th></tr></thead><tbody>"+(rows||"<tr><td colspan=4>—</td></tr>")+"</tbody></table>"+
    wpFoot(wt,t.name,"អ្នករៀបចំរបាយការណ៍",true)+"</div>";
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
    wpFoot(who.id,who.name,"អ្នករៀបចំ",true)+"</div>";
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
/* ទាញយក JavaScript តែពេលបើកផ្ទាំងដែលត្រូវការ (Lazy Loading) · បន្ទាប់ពីទំព័រទំនេរ ទាញទុកជាមុនដើម្បីប្ដូរផ្ទាំងបានលឿន */
var LAZY={cur:["curriculum7.js?v=4", "curriculum8.js?v=1", "curriculum9.js?v=1", "curriculum10.js?v=1", "curriculum11.js?v=2", "curriculum12.js?v=1", "curriculum.js?v=13"],mt:["meetings.js?v=15"],ls:["lessons.js?v=5","hubdata.js?v=6","hub.js?v=24","lessonedit.js?v=5"]};
var NEED={p21:["cur"],p13:["cur"],p14:["cur"],p15:["cur"],p17:["cur"],p18:["cur"],p19:["mt"],p20:["ls"]},lzP={},lzD={};
function lazy(g){
  if(lzP[g])return lzP[g];
  lzP[g]=LAZY[g].reduce(function(pr,src){return pr.then(function(){return new Promise(function(ok,no){var s=document.createElement("script");s.src=src;s.onload=ok;s.onerror=no;document.body.appendChild(s)})})},Promise.resolve())
    .then(function(){lzD[g]=1},function(e){delete lzP[g];throw e});
  return lzP[g];
}
setTimeout(function(){var go=function(){Object.keys(LAZY).forEach(function(g){lazy(g).catch(function(){})})};if(window.requestIdleCallback)requestIdleCallback(go,{timeout:6000});else go()},2500);
function show(p){
  if(p!=="p0"&&sy.started&&!sy.ph2)phase2();   /* ⚡ បើកផ្ទាំងផ្សេង → ទាញទិន្នន័យដំណាក់កាលទី២ ភ្លាម */
  var need=(NEED[p]||[]).filter(function(g){return!lzD[g]});
  if(need.length){
    ["p0","p1","p2","p4","p5","p6","p7","p8","p9","p10","p11","p12","p13","p14","p15","p16","p17","p18","p19","p20","p21"].forEach(function(x){$(x).hidden=x!==p});
    syncNav(p);show.want=p;
    Promise.all(need.map(lazy)).then(function(){if(show.want===p&&!$(p).hidden)show(p)},function(){notify("⚠️ មិនអាចទាញយកផ្ទាំងនេះបានទេ · សូមពិនិត្យអ៊ីនធឺណិត ហើយចុចម្ដងទៀត")});
    return;
  }
  show.want=p;
  ["p0","p1","p2","p4","p5","p6","p7","p8","p9","p10","p11","p12","p13","p14","p15","p16","p17","p18","p19","p20","p21"].forEach(function(x){$(x).hidden=x!==p});
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
  if(p==="p16"&&window.renderOrg)renderOrg();
  if(p==="p17"&&window.renderQuiz)renderQuiz(true);
  if(p==="p18"&&window.renderMs)renderMs();
  if(p==="p19"&&window.renderMt)renderMt();
  if(p==="p20"&&window.renderLs)renderLs();
  if(p==="p21")renderLp();
  if(p==="p0")renderDash();syncNav(p);
}
$("tabs").onclick=function(e){var b=e.target.closest("button");if(b)show(b.dataset.p)};
/* ===== 🧩 កិច្ចតែងការបង្រៀន (p21) · UI Layout + បញ្ជា · ខ្លឹមសារស្វ័យប្រវត្តិនឹងបន្ថែមជំហានបន្ទាប់ ===== */
/* 🧭 LPMAP ៖ Database វិធីសាស្ត្រ (m) និងយុទ្ធវិធី (s) ក្នុងកិច្ចតែងការ
   b = ឈ្មោះក្នុងបញ្ជី (ពាក្យមុនវង់ក្រចក = key ក្នុង LPD/LPFM/LPFT) · why = គោលបំណង · out = លទ្ធផលរំពឹងទុក
   at = ជំហានដែលសកម្មភាពនេះត្រូវទម្លាក់ចូល (១ = រំលឹកមេរៀនចាស់ · ២ = មេរៀនប្រចាំថ្ងៃ · ៣ = ពង្រឹងពុទ្ធិ · ៤ = បណ្តាំផ្ញើ) → lpFlow() ទម្លាក់ tc/st ចូលតារាងតាមនេះ
   វិធីសាស្ត្រ = ក្របខ័ណ្ឌរៀបជំហានទាំងមេរៀន · យុទ្ធវិធី = បច្ចេកទេសអនុវត្តក្នុងសកម្មភាពរៀន/ពង្រឹង (មិនស្ទួនគ្នា) */
var LPMAP={
 m:{
  "5Es":{b:"5Es (ចូលរួម · ស្វែងរក · ពន្យល់ · ពង្រីក · វាយតម្លៃ)",why:"ដឹកនាំសិស្សឱ្យសាងសង់ចំណេះដឹងតាម ៥ ដំណាក់កាល ពីចាប់អារម្មណ៍ ដល់ការវាយតម្លៃខ្លួនឯង",out:"សិស្សយល់ជ្រៅ អាចពន្យល់ និងអនុវត្តលើស្ថានភាពថ្មីបាន",at:{1:"Engage",2:"Explore · Explain",3:"Elaborate",4:"Evaluate"}},
  "PBL":{b:"PBL (រៀនតាមបញ្ហា)",why:"ប្រើបញ្ហាជីវិតពិតជាចំណុចចាប់ផ្តើម ដើម្បីបណ្តុះការគិតវិភាគ និងដោះស្រាយបញ្ហា",out:"សិស្សដោះស្រាយបញ្ហាដោយខ្លួនឯង ហើយភ្ជាប់គណិតវិទ្យាទៅនឹងជីវិតពិត",at:{1:"ចោទបញ្ហា",2:"ផែនការ · ស្រាវជ្រាវ",3:"បង្ហាញលទ្ធផល"}},
  "PrBL":{b:"PrBL (រៀនតាមគម្រោង)",why:"ឱ្យសិស្សបង្កើតផលិតផលតូចមួយតាមគម្រោង ដើម្បីអនុវត្តចំណេះដឹងជាប្រព័ន្ធ និងសហការ",out:"សិស្សមានផលិតផលជាក់ស្តែង និងជំនាញគ្រប់គ្រងពេល/តួនាទីក្នុងក្រុម",at:{1:"សំណួរគន្លឹះ",2:"ផែនការ · អនុវត្ត",3:"បង្កើតផលិតផល",4:"បង្ហាញ · ឆ្លុះបញ្ចាំង"}},
  "IBL":{b:"IBL (រៀនតាមការស្រាវជ្រាវ)",why:"ជំរុញឱ្យសិស្សសួរ សង្កេត សាកល្បង ហើយបង្កើតចំណេះដឹងដោយខ្លួនឯង",out:"សិស្សចេះដាក់សម្មតិកម្ម និងផ្ទៀងផ្ទាត់ ជំនួសការទន្ទេញ",at:{1:"សំណួរគន្លឹះ",2:"សង្កេត · សន្និដ្ឋាន"}},
  "Flipped Classroom":{b:"Flipped Classroom (ថ្នាក់រៀនបញ្ច្រាស)",why:"ផ្លាស់ទ្រឹស្តីទៅរៀននៅផ្ទះ ដើម្បីទុកម៉ោងក្នុងថ្នាក់សម្រាប់អនុវត្ត និងជួយតាមកម្រិត",out:"ម៉ោងក្នុងថ្នាក់ប្រើសម្រាប់លំហាត់ស៊ីជម្រៅ សិស្សខ្សោយទទួលបានជំនួយច្រើនជាង",at:{1:"ផ្ទៀងផ្ទាត់",2:"សង្ខេប · សួរចម្ងល់",3:"អនុវត្តស៊ីជម្រៅ"}},
  "Discovery":{b:"Discovery (រៀនតាមការរកឃើញ)",why:"ឱ្យសិស្សរកច្បាប់/រូបមន្តដោយខ្លួនឯងពីឧទាហរណ៍ មុនគ្រូសរុប",out:"សិស្សចងចាំរូបមន្តបានយូរ ព្រោះយល់ប្រភពរបស់វា",at:{1:"ស្ថានភាពបញ្ហា",2:"រកឃើញ · សន្និដ្ឋាន",3:"ផ្ទៀងផ្ទាត់",4:"សង្ខេប"}},
  "Inductive":{b:"Inductive (ពីឧទាហរណ៍ → ច្បាប់)",why:"ចាប់ផ្តើមពីឧទាហរណ៍ជាក់លាក់ ដើម្បីដឹកនាំទៅរកច្បាប់ទូទៅ",out:"សិស្សឃើញគំរូ ហើយអាចសន្និដ្ឋានច្បាប់បានដោយខ្លួនឯង",at:{2:"ឧទាហរណ៍ → ច្បាប់",3:"ផ្ទៀងផ្ទាត់"}},
  "Deductive":{b:"Deductive (ពីច្បាប់ → ឧទាហរណ៍)",why:"ផ្តល់និយមន័យ/រូបមន្តទូទៅមុន រួចអនុវត្តលើករណីជាក់លាក់ ដើម្បីសន្សំពេល",out:"សិស្សអនុវត្តរូបមន្តបានលឿន និងត្រឹមត្រូវ",at:{2:"ច្បាប់ → ឧទាហរណ៍",3:"អនុវត្ត"}},
  "ពន្យល់ និងអនុវត្ត":{b:"ពន្យល់ និងអនុវត្ត (Direct Instruction)",why:"គ្រូពន្យល់ត្រង់ៗ បង្ហាញគំរូ រួចឱ្យសិស្សអនុវត្តឯករាជ្យ សមស្របខ្លឹមសារបច្ចេកទេស",out:"សិស្សដឹងជំហានដោះស្រាយច្បាស់ ហើយអនុវត្តបានលឿន",at:{2:"ពន្យល់ · គំរូ",3:"អនុវត្តឯករាជ្យ"}}
 },
 s:{
  "Think-Pair-Share":{b:"Think-Pair-Share",why:"ឱ្យគ្រប់សិស្សគិតមុន ពិភាក្សាជាគូ រួចចែករំលែក ដើម្បីកុំឱ្យមានសិស្សស្ងៀម",out:"សិស្សទាំងអស់ចូលរួម និងហ៊ានបញ្ចេញគំនិត",at:{3:"Think → Pair → Share"}},
  "KWL":{b:"KWL (Know · Want · Learned)",why:"ភ្ជាប់ចំណេះដឹងចាស់ទៅថ្មី និងឱ្យសិស្សតាមដានការរៀនរបស់ខ្លួន",out:"សិស្សដឹងអ្វីដែលបានរៀន និងអ្វីដែលនៅចង់ដឹង",at:{1:"K · W",3:"L",4:"ពិនិត្យ L ↔ W"}},
  "Jigsaw":{b:"Jigsaw (ផ្គុំគំនិត)",why:"ឱ្យសិស្សម្នាក់ៗទទួលខុសត្រូវផ្នែកមួយ ហើយបង្រៀនមិត្ត",out:"ពង្រឹងការទទួលខុសត្រូវ និងការបង្រៀនមិត្តភក្តិ",at:{3:"ក្រុមអ្នកជំនាញ → ក្រុមមូលដ្ឋាន"}},
  "ក្រុមសហការ":{b:"ក្រុមសហការ (Cooperative Learning)",why:"ក្រុម ៤ នាក់មានតួនាទីច្បាស់លាស់ ដើម្បីទទួលខុសត្រូវរួមលើលទ្ធផល",out:"សិស្សសហការ និងរៀនពីគ្នាទៅវិញទៅមក",at:{3:"ក្រុម ៤ នាក់"}},
  "Gallery Walk":{b:"Gallery Walk",why:"ឱ្យក្រុមដើរមើល និងផ្តល់មតិលើស្នាដៃក្រុមផ្សេង",out:"សិស្សប្រៀបធៀបវិធីដោះស្រាយ និងរៀនពីមតិយោបល់",at:{3:"បង្ហោះ → ដើរមើល"}},
  "World Café":{b:"World Café",why:"ពិភាក្សាជុំវិញតុតាមប្រធានបទ ដោយវិលតុ ដើម្បីចែករំលែកគំនិតទូលំទូលាយ",out:"សិស្សប្រមូលគំនិតច្រើនទិស ហើយសន្និដ្ឋានរួមគ្នា",at:{3:"វិលតុ",4:"ម្ចាស់តុសង្ខេប"}},
  "Carousel":{b:"Carousel (រង្វិលស្ថានីយ)",why:"ក្រុមវិលតាមស្ថានីយលំហាត់ ដើម្បីអនុវត្តចំណុចខុសៗគ្នា និងមានចលនា",out:"សិស្សអនុវត្តច្រើនប្រភេទលំហាត់ក្នុងរយៈពេលខ្លី",at:{3:"វិលស្ថានីយ"}},
  "Reciprocal Teaching":{b:"Reciprocal Teaching (បង្រៀនគ្នាទៅវិញទៅមក)",why:"សិស្សប្តូរតួនាទី សង្ខេប · សួរ · បំភ្លឺ · ទស្សន៍ទាយ ដើម្បីយល់អត្ថបទ/ដំណោះស្រាយជ្រៅ",out:"សិស្សពន្យល់បាន និងត្រួតពិនិត្យការយល់ដឹងខ្លួនឯង",at:{2:"គំរូតួនាទី",3:"ប្តូរតួនាទី"}},
  "សំណួរ-ចម្លើយ":{b:"សំណួរ-ចម្លើយ និងពិភាក្សា",why:"ប្រើសំណួរតាមលំដាប់ងាយ → ពិបាក ដើម្បីជំរុញការគិត",out:"សិស្សគិតវិភាគ និងបញ្ជាក់ចម្លើយដោយហេតុផល",at:{2:"សំណួរគន្លឹះ"}},
  "ដោះស្រាយបញ្ហា":{b:"ដោះស្រាយបញ្ហា (Problem Solving)",why:"ដំណើរការតាមជំហានដោះស្រាយបញ្ហា (យល់ → ផែនការ → អនុវត្ត → ត្រួតពិនិត្យ)",out:"សិស្សមានវិធីសាស្ត្រដោះស្រាយច្បាស់លាស់",at:{3:"៤ ជំហាន Polya"}}
 }
},
LPM=Object.keys(LPMAP.m).map(function(k){return LPMAP.m[k].b}),
  LPT=Object.keys(LPMAP.s).map(function(k){return LPMAP.s[k].b}),
  LPS=["រដ្ឋបាលថ្នាក់រៀន","រំលឹកមេរៀនចាស់","មេរៀនប្រចាំថ្ងៃ","ពង្រឹងពុទ្ធិ","បណ្តាំផ្ញើ និងកិច្ចការផ្ទះ"];
/* 🧭 ជំហានលម្អិតនៃវិធីសាស្ត្រ/យុទ្ធវិធី (ជ្រើសតាមឈ្មោះមុនវង់ក្រចក) */
var LPD={
"5Es":["ចូលរួម (Engage) ៖ ដាក់បញ្ហា/សំណួរទាក់ទាញ ដើម្បីដាស់ចំណាប់អារម្មណ៍","ស្វែងរក (Explore) ៖ សិស្សសកម្មភាព/សាកល្បងជាក្រុម ដោយគ្រូណែនាំ","ពន្យល់ (Explain) ៖ សិស្សបកស្រាយ គ្រូបញ្ជាក់និយមន័យ និងរូបមន្ត","ពង្រីក (Elaborate) ៖ អនុវត្តចំណេះដឹងក្នុងស្ថានភាព/លំហាត់ថ្មី","វាយតម្លៃ (Evaluate) ៖ ត្រួតពិនិត្យការយល់ដឹងតាមសំណួរ ឬលំហាត់ខ្លី"],
"PBL":["កំណត់បញ្ហា ឬគម្រោងពីជីវិតពិត","រៀបចំផែនការ និងបែងចែកតួនាទីក្នុងក្រុម","ស្រាវជ្រាវ ប្រមូលទិន្នន័យ និងអនុវត្តគម្រោង","បង្ហាញលទ្ធផល និងឆ្លុះបញ្ចាំង/វាយតម្លៃ"],
"Flipped Classroom":["សិស្សសិក្សាមេរៀនសង្ខេប/វីដេអូនៅផ្ទះមុន","នៅថ្នាក់ ៖ ឆ្លើយសំណួរ និងបំភ្លឺចំណុចមិនទាន់យល់","ហ្វឹកហាត់លំហាត់ជាក្រុម ដោយគ្រូជួយតាមកម្រិត","សង្ខេប និងវាយតម្លៃលទ្ធផលរៀន"],
"IBL":["ដាក់សំណួរ/បញ្ហាស្រាវជ្រាវ","ផ្តើមសម្មតិកម្ម ឬការទស្សន៍ទាយ","ស្វែងរក និងធ្វើតេស្តសម្មតិកម្មតាមឧទាហរណ៍","សន្និដ្ឋាន និងចែករំលែកលទ្ធផល"],
"ពន្យល់ និងអនុវត្ត":["គ្រូពន្យល់ និយមន័យ និងរូបមន្ត","គ្រូបង្ហាញឧទាហរណ៍លម្អិតលើក្តារ","សិស្សអនុវត្តជាមួយគ្រូ (Guided Practice)","សិស្សអនុវត្តដោយខ្លួនឯង (Independent Practice)"],
"Think-Pair-Share":["Think ៖ សិស្សគិតដោះស្រាយម្នាក់ឯង","Pair ៖ ពិភាក្សាជាគូ","Share ៖ ចែករំលែកចម្លើយជាមួយថ្នាក់ទាំងមូល"],
"KWL":["K (Know) ៖ សិស្សរៀបរាប់អ្វីដែលដឹងរួចហើយ","W (Want) ៖ សិស្សសរសេរអ្វីដែលចង់ដឹង","L (Learned) ៖ សិស្សសង្ខេបអ្វីដែលបានរៀនបន្ទាប់ពីមេរៀន"],
"Jigsaw":["បែងចែកក្រុមមូលដ្ឋាន ហើយផ្តល់ផ្នែកខ្លឹមសារខុសគ្នា","ក្រុមអ្នកជំនាញ ៖ អ្នកកាន់ផ្នែកដូចគ្នាប្រជុំសិក្សា","សិស្សត្រឡប់ក្រុមដើម ហើយបង្រៀនមិត្តរួមក្រុម","វាយតម្លៃសរុបលើខ្លឹមសារទាំងអស់"],
"ក្រុមសហការ":["បែងចែកក្រុម ៤ នាក់ និងតួនាទី","ដោះស្រាយកិច្ចការរួមគ្នា","តំណាងក្រុមបង្ហាញលទ្ធផល","ក្រុមវាយតម្លៃគ្នាទៅវិញទៅមក"],
"Gallery Walk":["ក្រុមសរសេរចម្លើយលើក្រដាសធំ","ក្រុមដើរមើលស្នាដៃក្រុមផ្សេង","ផ្តល់មតិ និងសំណួរ","ត្រឡប់កែលម្អស្នាដៃ"],
"សំណួរ-ចម្លើយ":["គ្រូដាក់សំណួរតាមលំដាប់ងាយ → ពិបាក","សិស្សគិត និងឆ្លើយ","គ្រូផ្តល់មតិ និងសួរតាមដាន"],
"ដោះស្រាយបញ្ហា":["យល់បញ្ហា និងកំណត់ទិន្នន័យ","រៀបចំផែនការ ឬជ្រើសរូបមន្ត","អនុវត្តដំណោះស្រាយ","ត្រួតពិនិត្យចម្លើយ"]
};
Object.assign(LPD,{
"PrBL":["កំណត់ផលិតផលគម្រោង និងសំណួរគន្លឹះ","ក្រុមរៀបចំផែនការ ពេលវេលា និងតួនាទី","អនុវត្តគម្រោង ប្រមូលទិន្នន័យ/គណនា","បង្ហាញផលិតផល និងឆ្លុះបញ្ចាំង"],
"Discovery":["ដាក់ស្ថានភាព/ឧទាហរណ៍ច្រើនដែលលាក់ច្បាប់","សិស្សសង្កេត និងរកគំរូដោយខ្លួនឯង","សិស្សសរសេរច្បាប់/រូបមន្តដែលរកឃើញ","គ្រូបញ្ជាក់ ហើយផ្ទៀងផ្ទាត់លើករណីថ្មី"],
"Inductive":["បង្ហាញឧទាហរណ៍ជាក់លាក់ជាច្រើន","ដឹកនាំសិស្សរកចំណុចរួម","សន្និដ្ឋានជាច្បាប់ទូទៅ","ផ្ទៀងផ្ទាត់លើឧទាហរណ៍ថ្មី"],
"Deductive":["ប្រាប់និយមន័យ/រូបមន្តទូទៅ","បង្ហាញការអនុវត្តលើឧទាហរណ៍គំរូ","សិស្សអនុវត្តលើករណីជាក់លាក់","ពិនិត្យលទ្ធផល និងកែតម្រូវ"],
"World Café":["រៀបតុក្រុមតាមសំណួរ/ប្រធានបទ","ក្រុមពិភាក្សា និងសរសេរលើក្រដាសតុ","វិលទៅតុថ្មី ទុកម្ចាស់តុបកស្រាយ","ម្ចាស់តុសង្ខេប និងរួមគ្នាសន្និដ្ឋាន"],
"Carousel":["ព្យួរលំហាត់/សំណួរតាមស្ថានីយ","ក្រុមដោះស្រាយនៅស្ថានីយដំបូង","វិលស្ថានីយតាមសញ្ញា ហើយបន្ថែម/កែចម្លើយ","ត្រឡប់ទៅស្ថានីយដើម ពិនិត្យចម្លើយរួម"],
"Reciprocal Teaching":["គ្រូបង្ហាញគំរូតួនាទី ៖ សង្ខេប · សួរ · បំភ្លឺ · ទស្សន៍ទាយ","សិស្សអានលំហាត់/ដំណោះស្រាយជាក្រុមតូច","ប្តូរតួនាទីបង្រៀនគ្នា","ក្រុមបង្ហាញការយល់ដឹងរួម"]
});
function lpDetail(t){var k=String(t).split(" (")[0];return LPD[k]||LPD[Object.keys(LPD).filter(function(x){return String(t).indexOf(x)===0})[0]]||[]}
/* 📚 ទិន្នន័យគំរូ (key = «ថ្នាក់_លេខមេរៀនក្នុងប្រព័ន្ធ» · លេខមេរៀន = ជំពូក×១០ + មេរៀន ឧ. 12_11 = ថ្នាក់ទី១២ ជំពូក១ មេរៀន១) · បន្ថែមមេរៀនថ្មីដោយចម្លងទម្រង់នេះ
   obj = វត្ថុបំណង ៣ វិស័យ (ប្រភេទ: បញ្ជីអក្សរ) · mat = សម្ភារៈ · dur = រយៈពេលសរុប (នាទី) · steps[5] = {n: ឈ្មោះជំហាន, t: នាទី, tc: សកម្មភាពគ្រូ[], ct: ខ្លឹមសារមេរៀន[], st: សកម្មភាពសិស្ស[]} */
var lessonPlanDB={};   /* ទិន្នន័យថ្នាក់ទី១២ នៅក្នុង lp12.js (window.LP_DB) · lessonplans.js (LPX) */
/* 📦 ផ្ទុកឯកសារទិន្នន័យតាមថ្នាក់ (lp{g}.js → window.LP_DB) ពេលគ្រូជ្រើសថ្នាក់ · បន្ថែមថ្នាក់ថ្មី = បន្ថែមឈ្មោះឯកសារ (មានលេខ ?v=) ក្នុង LPF + sw.js + tools/bump.py ស្វ័យប្រវត្តិ */
var LPF={7:"lp7.js?v=3",8:"lp8.js?v=4",9:"lp9.js?v=3",10:"lp10.js?v=5",11:"lp11.js?v=6",12:"lp12.js?v=2"},LPP={};
function lpMerge(){
  if(window.LP_DB)Object.keys(LP_DB).forEach(function(k){lessonPlanDB[k]=LP_DB[k]});
  if(window.LPX)Object.keys(LPX).forEach(function(k){lessonPlanDB[k]=LPX[k]});   /* កិច្ចតែងការពី lessonplans.js មានអាទិភាពខ្ពស់ជាង */
  if(lessonPlanDB["12_11"]&&!lessonPlanDB["12_11#2"])lessonPlanDB["12_11#2"]=lessonPlanDB["12_11"];   /* ចំណុចរងទី២ «ចំនួនកុំផ្លិចទម្រង់ពីជគណិត» */
}
function lpLoadDB(g){
  g=+g;if(LPP[g])return LPP[g];
  if(!LPF[g])return Promise.resolve();
  return LPP[g]=new Promise(function(ok){
    var s=document.createElement("script");s.src=LPF[g];
    s.onload=function(){lpMerge();ok()};
    s.onerror=function(){delete LPP[g];ok()};   /* មិនទាន់មានឯកសារ/អ៊ីនធឺណិតដាច់ → ព្យាយាមម្ដងទៀតលើកក្រោយ */
    document.head.appendChild(s)});
}
lpMerge();
/* 🔣 KaTeX ៖ «$…$» ឬ «$$…$$» → រូបមន្ត · អត្ថបទក្រៅ $ ត្រូវ esc() ជានិច្ច (មិនទុកចិត្ត HTML) · KaTeX មិនទាន់ផ្ទុក → បង្ហាញអត្ថបទដើម ហើយគូរម្ដងទៀតពេលផ្ទុករួច */
/* ✂️ កន្សោមគណិតវែង → បំណែក (បំបែកត្រង់ = ⇒ ⇔ ជាន់ក្រៅវង់ក្រចក · រួចត្រង់ + − បើវែង) ដើម្បីកុំឱ្យ KaTeX ដាច់កណ្ដាលរូបមន្តក្នុងជួរតូច */
function lpSplit(s){
  var P=[],cur="",d=0,e=0,i=0,c;   /* d = ជម្រៅ {([ · e = ជម្រៅ \begin…\end / \left…\right (មិនកាត់ខាងក្នុង) */
  function brk(){if(cur.trim())P.push(cur);cur=""}
  while(i<s.length){
    c=s[i];
    if(c==="\\"){var m=/^\\[a-zA-Z]+/.exec(s.slice(i));
      if(m){var w=m[0];if(w==="\\begin"||w==="\\left")e++;else if(w==="\\end"||w==="\\right")e=Math.max(0,e-1);
        if(d===0&&e===0&&/^\\(iff|Rightarrow|Longrightarrow|Leftrightarrow|approx)$/.test(w))brk();cur+=w;i+=w.length;continue}
      cur+=c+(s[i+1]||"");i+=2;continue}
    if(c==="{"||c==="("||c==="[")d++;else if(c==="}"||c===")"||c==="]")d=Math.max(0,d-1);
    if(d===0&&e===0&&c==="="&&!/[<>!]/.test(s[i-1]||""))brk();
    else if(d===0&&e===0&&(c==="+"||c==="-")&&cur.replace(/\s/g,"").length>22&&!/[\^_{(=]\s*$/.test(cur)&&cur.trim())brk();
    cur+=c;i++;
  }
  brk();return P.length?P:[s];
}
/* 🖼️ រូបភាពក្នុងកិច្ចតែងការ «⟦img:hash⟧» → <img> ពី window.LP_IMG (data:image ក្នុង lp{g}.js · ឆ្លងកាត់ safeSrc) · អត្ថបទផ្សេង esc() */
function lpTx(t){
  return String(t).split(/⟦img:([0-9a-f]{10})⟧/).map(function(p,i){
    if(i%2===0)return esc(p);
    var u=window.LP_IMG&&safeSrc(window.LP_IMG[p]);return u?"<img class=lp-im alt='' src='"+u+"'>":""}).join("");
}
/* 🔤 អក្សរគណិតក្នុងអត្ថបទធម្មតា (ឧ. «y = (ax² + bx + c)/(dx + e)» · «M∈xy» · «បើ a ជាចំនួន») → KaTeX ស្អាត ដូចរូបមន្តដទៃ
   ចាប់តែ run ដែលមានតួអក្សរ ១ តួ ឬឈ្មោះខ្លី (≤៣) + ប្រមាណវិធី · មិនប៉ះពាក្យអង់គ្លេស (Think-Pair-Share · 5Es · Google Drive · URL) */
var LPSUP={"²":"2","³":"3","⁴":"4","⁵":"5","⁶":"6","⁷":"7","⁸":"8","⁹":"9","ⁿ":"n","⁰":"0","¹":"1"},
    LPSYM={"×":"\\times ","÷":"\\div ","≤":"\\le ","≥":"\\ge ","≠":"\\ne ","±":"\\pm ","∈":"\\in ","∉":"\\notin ","⊂":"\\subset ","⊃":"\\supset ","∪":"\\cup ","∩":"\\cap ","∅":"\\varnothing ","π":"\\pi ","·":"\\cdot ","°":"^\\circ ","′":"'","−":"-","⟺":"\\iff ","⇒":"\\Rightarrow ","→":"\\to ","∞":"\\infty ","△":"\\triangle ","∠":"\\angle ","⊥":"\\perp ","∥":"\\parallel "},
    LPFN={sin:1,cos:1,tan:1,cot:1,log:1,ln:1,lim:1,max:1,min:1,det:1,exp:1},
    LPMS=/[A-Za-z0-9²³⁴⁵⁶⁷⁸⁹ⁿ⁰¹.,+\-−×÷=<>≤≥≠±()\/√π∈∉⊂⊃∪∩∅′°|^_·→⇒⟺∞△∠⊥∥ ]/,
    LPACR={ICT:1,LMS:1,APP:1,NGS:1,PGCD:1,GCD:1,LCM:1,QR:1,AI:1,KWL:1,LCD:1,PDF:1,URL:1,USA:1,TV:1,ID:1,PPCM:1,CSS:1,PC:1,OK:1};
function lpTexRun(r){
  var core=r.replace(/^[\s.,]+|[\s.,]+$/g,"");if(!core||/^[0-9.,\s\-–/]+$/.test(core))return null;
  if(/\)\s*$/.test(core)===false&&/\(\s*$/.test(core))return null;
  if(/^[=+\-−×÷<>≤≥≠]+$/.test(core))return null;
  var bal=0,bad=false;core.split("").forEach(function(c){if(c==="(")bal++;else if(c===")"){bal--;if(bal<0)bad=true}});
  if(bad||bal!==0||/^[)\/]/.test(core))return null;   /* ក្រចកមិនគ្រប់គូ → កុំបម្លែង */
  var toks=core.match(/[A-Za-z]+/g)||[],trig=/[=<>≤≥≠±×÷√π∈∉⊂⊃∪∩∅²³⁴⁵⁶⁷⁸⁹ⁿ°^⟺⇒→△∠⊥∥]/.test(core),op=/[+\-−\/]/.test(core.replace(/^[-−]/,"")),dig=/[0-9]/.test(core);
  if(!toks.length&&!trig)return null;
  for(var i=0;i<toks.length;i++){var w=toks[i];
    if(w.length===1||LPFN[w])continue;
    if(w.length>3)return null;
    if(!(trig||op||(/^[A-Z]{2,3}$/.test(core)&&!LPACR[core])))return null;
    if(!(/^[a-z]+$/.test(w)||/^[A-Z]+$/.test(w)))return null}
  var single=toks.length&&toks.every(function(w){return w.length===1});
  var pname=/^[A-Z]{2,3}$/.test(core)&&!LPACR[core];
  if(!trig&&!op){ if(!((single&&!dig&&core.length<=12)||pname))return null }
  else if(!trig&&op&&!toks.length)return null;
  if(/^[A-Z]\d$/.test(core))return null;   /* A4 · B5 */
  var t=core;
  t=t.replace(/[²³⁴⁵⁶⁷⁸⁹ⁿ⁰¹]+/g,function(m){return"^{"+m.split("").map(function(c){return LPSUP[c]}).join("")+"}"});
  t=t.replace(/\^([A-Za-z0-9])/g,"^{$1}");
  t=t.replace(/√\(([^()]+)\)/g,"\\sqrt{$1}").replace(/√([A-Za-z0-9]+)/g,"\\sqrt{$1}");
  t=t.replace(/\(([^()]+)\)\s*\/\s*\(([^()]+)\)/g,"\\frac{$1}{$2}");
  t=t.replace(/[×÷≤≥≠±∈∉⊂⊃∪∩∅π·°′−⟺⇒→∞△∠⊥∥]/g,function(c){return LPSYM[c]||c});
  t=t.replace(/\b(sin|cos|tan|cot|log|ln|lim|max|min|det|exp)\b/g,"\\$1 ");
  t=t.replace(/m\/s/g,"\\text{m/s}").replace(/(\d)\s*(mm|cm|dm|km|kg|ml|ha|min)(?![A-Za-z])/g,"$1\\,\\text{$2}").replace(/(\d)\s*(m|g|s|h|l)(?![A-Za-z\\])/g,"$1\\,\\text{$2}");
  return"$"+t+"$"+(r.match(/[\s.,]+$/)||[""])[0];
}
function lpTexify(s){
  var out="",i=0,n=s.length;
  while(i<n){
    if(LPMS.test(s[i])&&s[i]!==" "&&!/[.,]/.test(s[i])){
      var j=i;while(j<n&&LPMS.test(s[j]))j++;
      var run=s.slice(i,j),pre=i>0?s[i-1]:"";
      if(/[A-Za-z0-9]/.test(pre)){out+=run;i=j;continue}   /* ជាផ្នែកនៃពាក្យ/លេខ */
      var tr=lpTexRun(run);out+=tr==null?run:tr;i=j;
    }else{out+=s[i];i++}
  }
  return out;
}
function lpDF(x){   /* \frac → \dfrac · រូបមន្តមាន lim/sum/prod/int → \displaystyle (ដែនកំណត់ដាក់ក្រោម lim ស្អាត) */
  x=String(x).replace(/\\frac(?![A-Za-z])/g,"\\dfrac");
  return/\\(lim|sum|prod|int|limsup|liminf)(?![A-Za-z])/.test(x)&&!/^\s*\\displaystyle/.test(x)?"\\displaystyle "+x:x}
/* 🛡️ lpMath មិនដែលបោះកំហុស/មិនបាត់ខ្លឹមសារ៖ រូបមន្តដែល KaTeX មិនអាចបកប្រែ (ឧ. $ ឬ { } មិនគូ) → បង្ហាញអត្ថបទដើម (esc) ជំនួស · < > & ត្រូវ esc ជានិច្ច */
function lpMath(t){try{return lpMath1(t)}catch(e){console.warn("lpMath:",e);return esc(String(t==null?"":t))}}
function lpMath1(t){
  t=String(t==null?"":t);
  t=t.split(/(\$\$[\s\S]+?\$\$|\$[^$\n]+?\$)/).map(function(p,i){return i%2?p:lpTexify(p)}).join("");
  var K=window.katex,re=/\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g,out="",i=0,m;
  while((m=re.exec(t))){
    out+=lpTx(t.slice(i,m.index));
    if(K&&K.renderToString){try{var src=m[1]!=null?m[1]:m[2];if(/^\s*\\square\s*$/.test(src))src="\\boxed{\\phantom{00000}}";src=lpDF(src);   /* រូបមន្តដែលបម្លែងមិនបាន → ប្រអប់ទទេសម្រាប់សរសេរដោយដៃ */
      if(m[1]!=null)out+=K.renderToString(src,{displayMode:true,throwOnError:true,strict:"ignore"});
      else out+=lpSplit(src).map(function(p){return"<span class=lp-mp>"+K.renderToString(lpDF(p),{throwOnError:true,strict:"ignore"})+"</span>"}).join("")}catch(e){out+=esc(m[0])}}
    else out+=esc(m[0]);
    i=m.index+m[0].length;
  }
  return out+lpTx(t.slice(i));
}
/* 📈 រូបភាពគូរស្វ័យប្រវត្តិ (SVG ពី fig.js · ពាក្យបញ្ជា FIG) ក្នុងជួរឈរខ្លឹមសារ */
function lpFg(a){if(!a||!a.length||!window.FIG)return"";return a.map(function(f){try{return"<div class=lp-fg>"+FIG.svg(f)+"</div>"}catch(e){return""}}).join("")}
/* ✂️ ចំណុចវែងពេក (>៣២០ តួ) → បំបែកជាចំណុចខ្លីៗ (ត្រង់ «។» ឬចន្លោះ · មិនកាត់ក្នុង $…$) ដើម្បីឱ្យតារាងបំបែកទំព័របាន មិនដាច់/កាត់ */
function lpChunk(x){
  x=String(x==null?"":x);if(x.length<=320)return[x];
  var out=[],cur="",d=0,i,c;
  for(i=0;i<x.length;i++){c=x[i];cur+=c;if(c==="$")d^=1;
    if(!d&&c===" "&&cur.length>=120&&(/[។៖:;]\s$/.test(cur)||cur.length>=230)){out.push(cur.trim());cur=""}}
  if(cur.trim())out.push(cur.trim());
  return out;
}
function lpLi(a,fg){try{return lpLi1(a,fg)}catch(e){console.warn("lpLi:",e);return(a&&a.length)?"<ul class=lp-ul>"+[].concat(a).map(function(x){return"<li>"+esc(x)+"</li>"}).join("")+"</ul>":""}}
function lpLi1(a,fg){
  a=a&&[].concat.apply([],a.map(lpChunk));
  var f=(fg&&window.FIG)?fg.map(function(x){try{return"<li class=lp-fgli><div class=lp-fg>"+FIG.svg(x)+"</div></li>"}catch(e){return""}}).join(""):"";
  return((a&&a.length)||f)?"<ul class=lp-ul>"+(a||[]).map(function(x){return/^\s*(⟦img:[0-9a-f]{10}⟧\s*)+$/.test(x)?"<li class=lp-fgli>"+lpMath(x)+"</li>":"<li>"+lpMath(x)+"</li>"}).join("")+f+"</ul>":"";
}
var lpLast=null,lpSugK="";
/* ⏱️ រយៈពេលបង្រៀន ៤៥ ឬ ៩០ នាទី (ជំហាននីមួយៗកាត់/ពង្រីកតាមសមាមាត្រ · ៩០ = ២ ម៉ោង) */
function lpDu(){var e=$("lpDu");return e&&e.value==="90"?90:45}
function lpDur(){var d=lpDu();$("lpHU").textContent=d===90?"៩០ នាទី (ម៉ោងទី១ ៤៥ នាទី · ម៉ោងទី២ ៤៥ នាទី)":"៤៥ នាទី"}
function lpSet(id,html){var e=$(id);if(!e)return;e.innerHTML=html;e.classList.toggle("lp-ph",!html)}
/* 📝 សន្លឹកកិច្ចការស្ដង់ដារ Flipped Classroom ៖ ប្រអប់ក្បាល (ឈ្មោះ · ពិន្ទុ) · ត្រៀមមុនរៀន (QR) · ៣ កម្រិតមានពិន្ទុ + គន្លឹះ + កន្លែងដំណោះស្រាយ · ឆ្លុះបញ្ចាំង · របាយពិន្ទុ */
/* 📏 កន្លែងដំណោះស្រាយស្វ័យប្រវត្តិ ៖ ចំនួនបន្ទាត់ (៦.៤ ម.ម/បន្ទាត់) តាមកម្រិត + ចំនួនសំណួររង (ក/ ខ/ …) + កន្សោមគណិត + រូបមន្តស្មុគ្គស្មាញ (ប្រភាគ ឫស លីមីត ប្រព័ន្ធ …) + ប្រវែងអត្ថបទ */
function lpWaN(x,t){
  x=String(x);var m=(x.match(/\$/g)||[]).length/2,sb=(x.match(/(^|\s)[កខគឃង]\/|(^|\s)[កខគឃង]\)|(^|\s)[0-9១-៩]\)/g)||[]).length,
    cx=(x.match(/\\(frac|dfrac|sqrt|lim|begin|sum|int|cos|sin|tan|ln|log)/g)||[]).length,ln=x.replace(/\$[^$]*\$/g,"").length;
  var n=1.5+t+sb*2.5+Math.max(0,m-2)*.4+cx*.5+Math.max(0,ln-100)/80;
  return Math.max(3,Math.min(9,Math.round(n)));
}
function lpWsRender(P){
  var ws=$("lpWS");if(!ws)return;
  var ex=P&&P.ex?P.ex:{pre:[],drill:[],hw:[],ws:(P&&P.worksheet)||[],key:[]};
  var it=[].concat(ex.drill||[],ex.ws||[],ex.hw||[]).filter(function(x,i,a){return x&&a.indexOf(x)===i});
  if(!P||!it.length){ws.hidden=true;ws.innerHTML="";return}
  var MX=7;   /* កំណត់ចំនួនលំហាត់ ៖ សន្លឹកមិនលើស ~៣ ទំព័រ */
  if(it.length>MX){var pick=[];for(var z=0;z<MX;z++)pick.push(it[Math.round(z*(it.length-1)/(MX-1))]);it=pick.filter(function(x,i,a){return a.indexOf(x)===i})}
  var n=it.length,n1=Math.max(1,Math.round(n*.4)),n3=n>=5?Math.max(1,Math.round(n*.2)):0,n2=n-n1-n3,W=[2,3,4],T=[];
  it.forEach(function(x,i){T.push(i<n1?0:i<n1+n2?1:2)});
  var sum=0;T.forEach(function(t){sum+=W[t]});var pt=T.map(function(t){return Math.max(1,Math.round(W[t]*20/sum))}),tot=pt.reduce(function(a,b){return a+b},0);
  for(var k=pt.length-1;tot!==20&&k>=0;k=(k>0?k-1:pt.length-1)){if(tot<20){pt[k]++;tot++}else if(pt[k]>1){pt[k]--;tot--}if(tot===20)break}
  var tp=[0,0,0];pt.forEach(function(p,i){tp[T[i]]+=p});
  var CL=["#15803d","#c2410c","#6d28d9"],TN=["មូលដ្ឋាន ★","ពង្រឹង ★★","ប្រឈម ★★★"],TH=["រូបមន្ត/គន្លឹះសំខាន់ៗដែលត្រូវចាំ","ជំហានដោះស្រាយ ៖ ១) អានលក្ខខណ្ឌ ២) សរសេររូបមន្ត ៣) ជំនួសតម្លៃ ៤) គណនា ៥) ត្រួតពិនិត្យចម្លើយ","ពិនិត្យកំហុសញឹកញាប់ (សញ្ញា ដក/បូក) · សាកល្បងដោះស្រាយតាមវិធីពីរ · ពន្យល់ហេតុផលជាដាច់ខាត"];
  var h=function(x){return lpMath(x)},G=$("lpG"),gt=G&&G.selectedIndex>=0?G.options[G.selectedIndex].text:"";
  var qr="",im=$("lpQB")&&$("lpQB").querySelector("img");if(im&&safeSrc(im.getAttribute("src")))qr="<img class=lp-wqr alt='QR' src='"+safeSrc(im.getAttribute("src"))+"'>";
  var out="<div class=lp-wh><div class=lp-whm><div class=lp-wht>សន្លឹកកិច្ចការ</div><div class=lp-whs>ថ្នាក់រៀនបញ្ច្រាស (Flipped Classroom) · គណិតវិទ្យា "+esc(gt)+"</div><div class=lp-whl>មេរៀន ៖ <b>"+esc(P.title)+"</b></div></div><div class=lp-whp><span>ពិន្ទុ</span><i></i><span>/ ២០</span></div>"+
    "<div class=lp-whf><span>ឈ្មោះសិស្ស ៖ <i></i></span><span>ថ្នាក់ ៖ <i class=s></i></span><span>កាលបរិច្ឆេទ ៖ <i class=s></i></span></div></div>";
  var pre=((P.steps&&P.steps[1]&&P.steps[1].tc&&P.steps[1].tc.length?[P.steps[1].tc[0]]:[]).concat(ex.pre&&0?ex.pre:[])).map(function(x){return String(x).replace(/^(សួរសិស្ស|សួរ)\s*[៖:]?\s*/,"").replace(/^ដាក់(លំហាត់|ឧទាហរណ៍)\s*[៖:]?\s*/,"")}).filter(Boolean);
  out+="<div class=lp-wpre><h4 class=lp-wsh style='--c:#1e3a8a'><b>១</b>ត្រៀមមុនរៀន · នៅផ្ទះ (Pre-class)</h4><div class=lp-wprb>"+qr+"<div><p>📱 ស្កេន QR Code ដើម្បីមើលមេរៀនសង្ខេប/វីដេអូ និងហ្វឹកហាត់ មុនចូលថ្នាក់ រួចឆ្លើយសំណួរពិនិត្យខ្លួនឯង ៖</p>"+
    pre.map(function(x){return"<div class=lp-wpq>"+h(x)+"</div>"}).join("")+"<div class='lp-wa' style='height:12mm'></div></div></div></div>";
  var i=0;
  [0,1,2].forEach(function(t){
    var idx=[];T.forEach(function(x,j){if(x===t)idx.push(j)});if(!idx.length)return;
    var kt=t===0&&ex.key&&ex.key.length?"<ul class=lp-ul>"+ex.key.map(function(x){return"<li>"+h(x)+"</li>"}).join("")+"</ul>":esc(TH[t]);
    out+="<div class=lp-wsec style='--c:"+CL[t]+"'><h4 class=lp-wsh><b>"+kn(t+2)+"</b>កម្រិត"+TN[t]+" <small>("+kn(tp[t])+" ពិន្ទុ)</small></h4><div class=lp-wk><b>💡 គន្លឹះសម្រាប់អ្នកត្រូវការជំនួយ ៖</b> "+kt+"</div></div>";
    idx.forEach(function(j){i++;out+="<div class=lp-wq style='--c:"+CL[t]+"'><span class=lp-wno>"+kn(i)+"</span><div class=lp-wb><div class=lp-wtx>"+h(it[j])+"</div><div class=lp-wa style='height:"+(lpWaN(it[j],t)*6+1)+"mm'></div></div><span class=lp-wp>"+kn(pt[j])+" ពិន្ទុ</span></div>"});
  });
  out+="<div class=lp-wrf><h4 class=lp-wsh style='--c:#0f766e'><b>"+kn(5)+"</b>ឆ្លុះបញ្ចាំង · របាយពិន្ទុ</h4><div class=lp-wrb><p>ខ្ញុំយល់មេរៀននេះ ៖ ☐ ច្បាស់ &nbsp; ☐ មួយចំណែក &nbsp; ☐ មិនទាន់យល់</p><p>ចំណុចដែលខ្ញុំត្រូវសួរគ្រូ ៖ <i></i></p>"+
    "<table class=lp-wsc><tr><th>កម្រិតមូលដ្ឋាន</th><th>កម្រិតពង្រឹង</th><th>កម្រិតប្រឈម</th><th>ពិន្ទុសរុប</th><th>មតិគ្រូ</th></tr><tr><td>…/"+kn(tp[0])+"</td><td>…/"+kn(tp[1])+"</td><td>…/"+kn(tp[2])+"</td><td>…/២០</td><td></td></tr></table></div></div>";
  ws.hidden=false;ws.innerHTML=out;
}
/* 🔀 Dynamic Pedagogy Workflow ៖ សកម្មភាពគ្រូ (tc) / សិស្ស (st) ក្នុងតារាង «ដំណើរការបង្រៀន» តាមវិធីសាស្ត្រ (#lpM) និងយុទ្ធវិធី (#lpT) ដែលបានជ្រើស · ខ្លឹមសារមេរៀន (ct) + KaTeX មិនប៉ះពាល់ · key = លេខជំហាន (០ រដ្ឋបាល · ១ រំលឹក · ២ មេរៀន · ៣ ពង្រឹង · ៤ កិច្ចការផ្ទះ) */
var LPFM={
"5Es":{1:{tc:["[១. Engage ចូលរួម] ដាក់ស្ថានភាព/សំណួរទាក់ទាញ ដើម្បីដាស់ចំណាប់អារម្មណ៍ និងភ្ជាប់ទៅមេរៀនថ្មី"],st:["[១. Engage ចូលរួម] ឆ្លើយសំណួរ ទស្សន៍ទាយ និងចាប់អារម្មណ៍ចំពោះបញ្ហា"]},
 2:{tc:["[២. Explore ស្វែងរក] ឱ្យសិស្សសាកល្បង/សង្កេតជាក្រុម ដោយគ្រូណែនាំតិចៗ","[៣. Explain ពន្យល់] ឱ្យសិស្សបកស្រាយ ហើយគ្រូបញ្ជាក់និយមន័យ និងរូបមន្ត"],st:["[២. Explore ស្វែងរក] សាកល្បង សង្កេត និងកត់ត្រាអ្វីដែលរកឃើញ","[៣. Explain ពន្យល់] បកស្រាយគំនិតរបស់ខ្លួន ហើយប្រៀបធៀបជាមួយនិយមន័យរបស់គ្រូ"]},
 3:{tc:["[៤. Elaborate ពង្រីក] ដាក់ស្ថានភាព/លំហាត់ថ្មីឱ្យសិស្សអនុវត្តចំណេះដឹងដែលទើបរៀន"],st:["[៤. Elaborate ពង្រីក] អនុវត្តចំណេះដឹងលើលំហាត់/ស្ថានភាពថ្មី"]},
 4:{tc:["[៥. Evaluate វាយតម្លៃ] សួរសំណួរខ្លីដើម្បីត្រួតពិនិត្យការយល់ដឹងរបស់សិស្ស"],st:["[៥. Evaluate វាយតម្លៃ] ឆ្លើយសំណួរវាយតម្លៃ និងឆ្លុះបញ្ចាំងអំពីអ្វីដែលបានរៀន"]}},
"PBL":{1:{tc:["[PBL · ចោទបញ្ហា] ដាក់បញ្ហា/គម្រោងជីវិតពិតដែលទាក់ទងនឹងមេរៀន"],st:["[PBL · ចោទបញ្ហា] ស្ដាប់ បកស្រាយបញ្ហា និងកំណត់អ្វីដែលត្រូវរកឱ្យឃើញ"]},
 2:{tc:["[PBL · ផែនការ និងស្រាវជ្រាវ] ណែនាំក្រុមរៀបចំផែនការ បែងចែកតួនាទី និងស្រាវជ្រាវដោះស្រាយបញ្ហា"],st:["[PBL · ផែនការ និងស្រាវជ្រាវ] រៀបចំផែនការ ស្រាវជ្រាវ និងអនុវត្តរូបមន្តដើម្បីដោះស្រាយបញ្ហា"]},
 3:{tc:["[PBL · បង្ហាញលទ្ធផល] អញ្ជើញក្រុមបង្ហាញលទ្ធផលគម្រោង ហើយដឹកនាំការឆ្លុះបញ្ចាំង"],st:["[PBL · បង្ហាញលទ្ធផល] តំណាងក្រុមបង្ហាញគម្រោង ហើយឆ្លុះបញ្ចាំងអំពីដំណើរការ"]}},
"IBL":{1:{tc:["[IBL · សំណួរគន្លឹះ] ដាក់សំណួរគន្លឹះ ហើយជំរុញឱ្យសិស្សបង្កើតសម្មតិកម្ម"],st:["[IBL · សម្មតិកម្ម] គិត និងសរសេរសម្មតិកម្ម/ការទស្សន៍ទាយរបស់ខ្លួន"]},
 2:{tc:["[IBL · សង្កេត និងសាកល្បង] ឱ្យសិស្សរកឃើញរូបមន្តដោយខ្លួនឯងតាមឧទាហរណ៍ មុនពេលគ្រូសំយោគ","[IBL · សន្និដ្ឋាន] សំយោគលទ្ធផលរបស់សិស្សទៅជាសេចក្ដីសន្និដ្ឋានផ្លូវការ"],st:["[IBL · សង្កេត និងសាកល្បង] សង្កេត សាកល្បងតាមឧទាហរណ៍ និងទាញសេចក្តីសន្និដ្ឋានរូបមន្តដោយខ្លួនឯង","[IBL · សន្និដ្ឋាន] ផ្ទៀងផ្ទាត់សម្មតិកម្ម និងចែករំលែកលទ្ធផល"]}},
"Flipped Classroom":{1:{tc:["[Flipped · ផ្ទៀងផ្ទាត់] ពិនិត្យការស្វ័យសិក្សាវីដេអូ/សន្លឹកកិច្ចការនៅផ្ទះ តាមសំណួរខ្លី"],st:["[Flipped · ផ្ទៀងផ្ទាត់] ឆ្លើយសំណួរ និងបង្ហាញសន្លឹកកិច្ចការដែលបានធ្វើនៅផ្ទះ"]},
 2:{tc:["[Flipped · សង្ខេប] សង្ខេបខ្លឹមសារគន្លឹះ និងបកស្រាយចម្ងល់ដែលសិស្សបានកត់ត្រា"],st:["[Flipped · សួរចម្ងល់] លើកចម្ងល់ពីការស្វ័យសិក្សា ហើយកែតម្រូវការយល់ដឹង"]},
 3:{tc:["[Flipped · អនុវត្តស៊ីជម្រៅ] ដាក់លំហាត់ស៊ីជម្រៅក្នុងថ្នាក់ ហើយដើរជួយតាមកម្រិត"],st:["[Flipped · អនុវត្តស៊ីជម្រៅ] ដោះស្រាយលំហាត់ស៊ីជម្រៅក្នុងថ្នាក់ជាគូ/ក្រុម"]}},
"ពន្យល់ និងអនុវត្ត":{2:{tc:["[Direct · ពន្យល់ និងបង្ហាញគំរូ] ពន្យល់និយមន័យ រូបមន្ត ហើយបង្ហាញឧទាហរណ៍គំរូលម្អិតលើក្ដារ","[Direct · អនុវត្តរួមគ្នា] ដោះស្រាយឧទាហរណ៍ជាមួយសិស្ស (Guided Practice)"],st:["[Direct · សង្កេតគំរូ] ស្ដាប់ កត់ត្រា និងតាមដានគំរូរបស់គ្រូ","[Direct · អនុវត្តរួមគ្នា] ដោះស្រាយជាមួយគ្រូលើក្ដារ"]},
 3:{tc:["[Direct · អនុវត្តឯករាជ្យ] ដាក់លំហាត់ឱ្យសិស្សធ្វើដោយខ្លួនឯង ហើយដើរពិនិត្យ"],st:["[Direct · អនុវត្តឯករាជ្យ] ដោះស្រាយលំហាត់ដោយខ្លួនឯងដោយមិនពឹងគ្រូ"]}}
},
LPFT={
"KWL":{1:{tc:["[KWL] ឱ្យសិស្សបំពេញតារាង K (អ្វីដែលដឹងរួច) និង W (អ្វីដែលចង់ដឹង) អំពីមេរៀន"],st:["[KWL] សរសេរ K (អ្វីដែលដឹង) និង W (អ្វីដែលចង់ដឹង) ក្នុងតារាង"]},
 3:{tc:["[KWL] ឱ្យសិស្សបំពេញជួរ L (អ្វីដែលបានរៀន) បន្ទាប់ពីអនុវត្ត"],st:["[KWL] សរសេរ L (អ្វីដែលបានរៀន) ហើយផ្ទៀងនឹង W ដែលបានសរសេរ"]},
 4:{tc:["[KWL] ពិនិត្យ L ជាមួយ W ថាសំណួរដែលចង់ដឹងទាំងអស់មានចម្លើយឬនៅ"],st:["[KWL] បំពេញ L ឱ្យពេញលេញ"]}},
"Think-Pair-Share":{3:{tc:["[TPS] ដាក់លំហាត់ឱ្យសិស្សគិតម្នាក់ឯង → ពិភាក្សាជាគូ → ចែករំលែកជាមួយថ្នាក់"],st:["[TPS] គិតម្នាក់ឯង (Think) → ពិភាក្សាជាគូ (Pair) → ចែករំលែក (Share)"]}},
"Jigsaw":{3:{tc:["[Jigsaw] បែងចែកក្រុមមូលដ្ឋាន ហើយចាត់លំហាត់ម្នាក់មួយផ្នែកទៅក្រុមអ្នកជំនាញ"],st:["[Jigsaw] ក្រុមអ្នកជំនាញសិក្សាផ្នែករបស់ខ្លួន រួចត្រឡប់ក្រុមដើមបង្រៀនមិត្ត"]}},
"ក្រុមសហការ":{3:{tc:["[Cooperative] បែងចែកក្រុម ៤ នាក់ មានតួនាទីច្បាស់លាស់ (ប្រធាន · អ្នកកត់ត្រា · អ្នកគណនា · អ្នកបង្ហាញ)"],st:["[Cooperative] ធ្វើការជាក្រុមតាមតួនាទី ហើយទទួលខុសត្រូវរួមគ្នាលើលទ្ធផល"]}},
"Gallery Walk":{3:{tc:["[Gallery Walk] ឱ្យក្រុមសរសេរចម្លើយលើក្រដាសធំ ព្យួរ ហើយដើរពិនិត្យស្នាដៃក្រុមផ្សេង"],st:["[Gallery Walk] ដើរមើលស្នាដៃក្រុមផ្សេង ផ្ដល់មតិ ហើយត្រឡប់កែលម្អស្នាដៃក្រុមខ្លួន"]}}
};
Object.assign(LPFM,{
"PrBL":{1:{tc:["[PrBL · សំណួរគន្លឹះ] ណែនាំគម្រោងខ្នាតតូចទាក់ទងនឹងមេរៀន និងផលិតផលដែលត្រូវបង្កើត"],st:["[PrBL · សំណួរគន្លឹះ] ស្ដាប់ គម្រោង និងកត់ត្រាសំណួរគន្លឹះ"]},
 2:{tc:["[PrBL · ផែនការ] ណែនាំក្រុមរៀបចំផែនការ បែងចែកតួនាទី និងកាលវិភាគ"],st:["[PrBL · ផែនការ] រៀបចំផែនការ ពេលវេលា និងតួនាទីក្នុងក្រុម"]},
 3:{tc:["[PrBL · បង្កើតផលិតផល] ដើរជួយក្រុមអនុវត្តគម្រោង និងប្រមូលទិន្នន័យ/គណនា"],st:["[PrBL · បង្កើតផលិតផល] អនុវត្តគម្រោង ប្រមូលទិន្នន័យ/គណនា ហើយរៀបចំផលិតផល"]},
 4:{tc:["[PrBL · បង្ហាញ] អញ្ជើញក្រុមបង្ហាញផលិតផល ហើយដឹកនាំការឆ្លុះបញ្ចាំង"],st:["[PrBL · បង្ហាញ] បង្ហាញផលិតផល និងឆ្លុះបញ្ចាំងអំពីអ្វីដែលបានរៀន"]}},
"Discovery":{1:{tc:["[Discovery · ស្ថានភាពបញ្ហា] ដាក់ស្ថានភាព/ឧទាហរណ៍ច្រើនដែលលាក់ច្បាប់ដែលត្រូវរក"],st:["[Discovery · ស្ថានភាពបញ្ហា] សង្កេតឧទាហរណ៍ ហើយទស្សន៍ទាយគំរូ"]},
 2:{tc:["[Discovery · រកឃើញ] ឱ្យសិស្សរកច្បាប់/រូបមន្តដោយខ្លួនឯងពីឧទាហរណ៍ មុនពេលគ្រូសរុប","[Discovery · សន្និដ្ឋាន] ឱ្យសិស្សសរសេរច្បាប់ ហើយគ្រូបញ្ជាក់ឱ្យត្រឹមត្រូវ"],st:["[Discovery · រកឃើញ] សាកល្បង ប្រៀបធៀប និងរកច្បាប់ដោយខ្លួនឯង","[Discovery · សន្និដ្ឋាន] សរសេរច្បាប់ដែលរកឃើញ ហើយផ្ទៀងនឹងគ្រូ"]},
 3:{tc:["[Discovery · ផ្ទៀងផ្ទាត់] ដាក់ករណីថ្មីឱ្យសិស្សផ្ទៀងផ្ទាត់ច្បាប់ដែលរកឃើញ"],st:["[Discovery · ផ្ទៀងផ្ទាត់] អនុវត្តច្បាប់លើករណីថ្មី ហើយពន្យល់ហេតុផល"]},
 4:{tc:["[Discovery · សង្ខេប] សង្ខេបច្បាប់ជាមួយសិស្ស"],st:["[Discovery · សង្ខេប] សង្ខេបច្បាប់ដោយពាក្យខ្លួនឯង"]}},
"Inductive":{2:{tc:["[Inductive · ឧទាហរណ៍ → ច្បាប់] បង្ហាញឧទាហរណ៍ជាក់លាក់ជាច្រើន រួចដឹកនាំឱ្យសិស្សសន្និដ្ឋានទូទៅ"],st:["[Inductive · ឧទាហរណ៍ → ច្បាប់] សង្កេតឧទាហរណ៍ រកចំណុចរួម ហើយសន្និដ្ឋានច្បាប់"]},
 3:{tc:["[Inductive · ផ្ទៀងផ្ទាត់] ដាក់ឧទាហរណ៍ថ្មីឱ្យសិស្សផ្ទៀងផ្ទាត់ច្បាប់ដែលសន្និដ្ឋាន"],st:["[Inductive · ផ្ទៀងផ្ទាត់] ផ្ទៀងផ្ទាត់ច្បាប់លើឧទាហរណ៍ថ្មី"]}},
"Deductive":{2:{tc:["[Deductive · ច្បាប់ → ឧទាហរណ៍] ប្រាប់និយមន័យ/រូបមន្តទូទៅ រួចបង្ហាញការអនុវត្តលើឧទាហរណ៍គំរូ"],st:["[Deductive · ច្បាប់ → ឧទាហរណ៍] កត់ច្បាប់ ហើយតាមដានការអនុវត្តលើគំរូ"]},
 3:{tc:["[Deductive · អនុវត្ត] ដាក់លំហាត់ឱ្យសិស្សអនុវត្តច្បាប់លើករណីជាក់លាក់"],st:["[Deductive · អនុវត្ត] អនុវត្តច្បាប់លើលំហាត់ ហើយពិនិត្យលទ្ធផល"]}}
});
Object.assign(LPFT,{
"World Café":{3:{tc:["[World Café] រៀបតុក្រុមតាមសំណួរ ឱ្យក្រុមវិលតុ ១០ នាទី ហើយទុកម្ចាស់តុបកស្រាយ"],st:["[World Café] ពិភាក្សាជុំវិញតុ សរសេរគំនិតលើក្រដាសតុ ហើយវិលទៅតុថ្មី"]},
 4:{tc:["[World Café] ឱ្យម្ចាស់តុសង្ខេបគំនិតសំខាន់ៗរបស់តុខ្លួន"],st:["[World Café] ម្ចាស់តុសង្ខេប ហើយក្រុមរួមគ្នាសន្និដ្ឋាន"]}},
"សំណួរ-ចម្លើយ":{2:{tc:["[សំណួរ-ចម្លើយ] ដាក់សំណួរតាមលំដាប់ងាយ → ពិបាក ហើយផ្តល់មតិឱ្យចម្លើយនីមួយៗ"],st:["[សំណួរ-ចម្លើយ] គិត ឆ្លើយ និងបញ្ជាក់ចម្លើយដោយហេតុផល"]}},
"ដោះស្រាយបញ្ហា":{3:{tc:["[Problem Solving] ដឹកនាំ ៤ ជំហាន ៖ យល់បញ្ហា → រៀបផែនការ → អនុវត្ត → ត្រួតពិនិត្យ"],st:["[Problem Solving] ដោះស្រាយតាម ៤ ជំហាន ហើយពន្យល់វិធីរបស់ខ្លួន"]}},
"Carousel":{3:{tc:["[Carousel] ព្យួរលំហាត់ ៤–៥ ស្ថានីយជុំវិញថ្នាក់ ឱ្យក្រុមវិលតាមសញ្ញា ១–២ នាទីក្នុងមួយស្ថានីយ"],st:["[Carousel] ដោះស្រាយនៅស្ថានីយ វិលតាមសញ្ញា ហើយបន្ថែម/កែចម្លើយក្រុមមុន"]}},
"Reciprocal Teaching":{2:{tc:["[Reciprocal] បង្ហាញគំរូតួនាទី ៤ ៖ សង្ខេប · សួរ · បំភ្លឺ · ទស្សន៍ទាយ"],st:["[Reciprocal] តាមដានគំរូតួនាទីរបស់គ្រូ"]},
 3:{tc:["[Reciprocal] ឱ្យសិស្សប្តូរតួនាទីបង្រៀនគ្នាក្នុងក្រុមតូចលើលំហាត់"],st:["[Reciprocal] ប្តូរតួនាទី សង្ខេប · សួរ · បំភ្លឺ · ទស្សន៍ទាយ ក្នុងក្រុម"]}}
});
function lpFlowKey(id,M){var e=$(id),t=e&&e.selectedIndex>=0?e.options[e.selectedIndex].text:"",k=String(t).split(" (")[0];
  return M[k]?k:Object.keys(M).filter(function(x){return String(t).indexOf(x)===0})[0]||""}
var LPSTG=/\b(Engage|Explore|Explain|Elaborate|Evaluate|Think|Pair|Share|KWL|Jigsaw|Cooperative|Gallery|TPS|Discovery|Inductive|Deductive|PrBL|PBL|IBL|Flipped|Direct|Reciprocal|Carousel|Caf[eé]|Problem Solving)\b|ចូលរួម|ស្វែងរក|ពន្យល់ \(|ពង្រីក|វាយតម្លៃ \(/;
function lpFlow(S,i){   /* S = ជំហាន · ត្រឡប់ {tc,st} (មិនកែ S) · ទម្លាក់សកម្មភាពវិធីសាស្ត្រ + យុទ្ធវិធី ចូលជំហាន i តាម LPMAP.at · ទិន្នន័យមានស្លាកដំណាក់កាលរួចហើយ → មិនស្ទួន */
  if(S&&S.edited)return{tc:S.tc||[],st:S.st||[]};   /* គ្រូបានកែដោយដៃ → បង្ហាញតាមដែលបានកែ (មិនបន្ថែមសកម្មភាពវិធីសាស្ត្រម្ដងទៀត) */
  var m=LPFM[lpFlowKey("lpM",LPFM)]||{},t=LPFT[lpFlowKey("lpT",LPFT)]||{},a=m[i]||{tc:[],st:[]},b=t[i]||{tc:[],st:[]};
  var tag=function(x){var r=/^\[([^\]]+)\]/.exec(String(x));return r?r[1]:""};
  var add=function(L,own){var seen={};(own||[]).forEach(function(x){var g=tag(x);if(g)seen[g]=1});
    return(L||[]).filter(function(x){var g=tag(x);return!(g&&seen[g])&&!(LPSTG.test(String(x))&&(own||[]).some(function(y){return LPSTG.test(String(y))&&tag(y)===g&&g}))})};
  return{tc:add(a.tc,S.tc).concat(add(b.tc,S.tc),S.tc||[]),st:add(a.st,S.st).concat(add(b.st,S.st),S.st||[])};
}
function lpRender(P){   /* P = ធាតុក្នុង lessonPlanDB · null → ត្រឡប់ទៅ Placeholder */
  var O=P&&P.obj||{};
  ["knowledge","skills","attitude"].forEach(function(k,i){var a=O[k];lpSet("lpOb"+i,a?(a.length>1?lpLi(a):lpMath(a[0])):"")});
  var Mt=P&&P.mat,ms="",mt="";if(Mt){if(Array.isArray(Mt))mt=Mt.join(" · ");else{ms=(Mt.st||[]).join(" · ");mt=(Mt.tc||[]).join(" · ")}}
  lpSet("lpMs",ms?lpMath(ms):"");lpSet("lpMt",mt?lpMath(mt):"");
  try{lpWsRender(P)}catch(e){console.warn("lpWsRender:",e);var w0=$("lpWS");if(w0){w0.hidden=true;w0.innerHTML=""}}
  lpLast=P;if(P&&!window.katex&&!lpRender.w){lpRender.w=1;setTimeout(function(){lpRender.w=0;if(window.katex&&lpLast===P)lpRender(P)},1500)}
  $("lpSteps").innerHTML=LPS.map(function(t,i){
    var S=P&&P.steps&&P.steps[i],h=S?esc(S.n)+(S.t?" · "+kn(Math.round(S.t*lpDu()/45))+" នាទី":""):esc(t);
    return"<tr class='lp-sh'><th colspan=3>ជំហានទី"+kn(i+1)+" ៖ "+h+"</th></tr><tr class='lp-sb"+(S?" lp-fill":"")+"'>"+
      (S?(function(F){return"<td>"+lpLi(F.tc)+"</td><td>"+lpLi(S.ct,S.fg)+"</td><td>"+lpLi(F.st)+"</td>"})(lpFlow(S,i)):"<td class='lp-ph'>…</td><td class='lp-ph'>…</td><td class='lp-ph'>…</td>")+"</tr>"}).join("");
  lpPages();
}
/* 🔳 QR Code ១–៤ ផ្ទាល់ខ្លួន (តំណ → បង្កើត QR · ឬ Upload រូប) + ចំណងជើងរង · ទទេ = QR ស្វ័យប្រវត្តិទៅ practice.html · QRCode ពី cdnjs */
var lpQA=[{},{},{},{}],lpQC={},lpQSig="";
function lpQLoad(){try{var a=JSON.parse(localStorage.getItem("lpQR")||"[]");if(Array.isArray(a))a.slice(0,4).forEach(function(x,i){if(x&&typeof x==="object")lpQA[i]={u:String(x.u||"").slice(0,500),c:String(x.c||"").slice(0,60),m:safeSrc(x.m)}})}catch(e){}}
function lpQSave(){lsSet("lpQR",JSON.stringify(lpQA))}
function lpQData(u){
  if(lpQC[u])return lpQC[u];
  return lpQC[u]=new Promise(function(ok){
    var go=function(){try{var d=document.createElement("div");new QRCode(d,{text:u,width:160,height:160,correctLevel:QRCode.CorrectLevel.M});
      setTimeout(function(){var c=d.querySelector("canvas");ok(c?c.toDataURL("image/png"):"")},30)}catch(e){ok("")}};
    if(window.QRCode)go();else{var s=document.createElement("script");s.src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js";s.onload=go;s.onerror=function(){ok("")};document.head.appendChild(s)}
  });
}
function lpQR(){
  var b=$("lpQB");if(!b)return;
  var g=$("lpG").value,l=$("lpL").value,auto=new URL("practice.html",location.href).href.split("#")[0]+(l!==""?"#g="+g+"&l="+l:"#g="+g);
  var it=lpQA.filter(function(x){return x&&(x.m||/^https?:\/\/\S+$/i.test(x.u||""))});
  if(!it.length)it=[{u:auto,c:"ហ្វឹកហាត់"}];
  var sig=JSON.stringify(it.map(function(x){return[x.u,x.c,(x.m||"").length]}));if(sig===lpQSig)return;lpQSig=sig;
  Promise.all(it.map(function(x){return x.m?Promise.resolve(safeSrc(x.m)):lpQData(x.u)})).then(function(src){
    if(sig!==lpQSig)return;
    b.innerHTML=it.map(function(x,i){var s=safeSrc(src[i]);return s?"<figure class=lp-qi><img alt='QR' src='"+s+"'><figcaption>"+esc(x.c||"")+"</figcaption></figure>":""}).join("");
    if(lpLast)lpWsRender(lpLast);lpPages();
  });
}
function lpQUI(){
  var h=$("lpQ4");if(!h||h.children.length)return;lpQLoad();var t=0;
  h.innerHTML=[0,1,2,3].map(function(i){var x=lpQA[i];return"<div class=lp-qrow data-i="+i+"><b>"+kn(i+1)+"</b><input class=qu type=url maxlength=500 placeholder='តំណ https://…' value='"+esc(x.u||"")+"'><input class=qc maxlength=60 placeholder='ចំណងជើងរង' value='"+esc(x.c||"")+"'><label class=qf title='Upload រូប QR'>🖼️<input type=file accept='image/*' hidden></label><button type=button class=qx title='លុប'>✕</button><span class=qi>"+(x.m?"✔":"")+"</span></div>"}).join("");
  var up=function(){lpQSave();clearTimeout(t);t=setTimeout(lpQR,300)};
  h.oninput=function(e){var r=e.target.closest(".lp-qrow");if(!r)return;var x=lpQA[+r.dataset.i];if(e.target.classList.contains("qu"))x.u=e.target.value.trim();else if(e.target.classList.contains("qc"))x.c=e.target.value;up()};
  h.onchange=function(e){
    var f=e.target;if(f.type!=="file"||!f.files[0])return;var r=f.closest(".lp-qrow"),x=lpQA[+r.dataset.i],fr=new FileReader();
    fr.onload=function(){var im=new Image();im.onload=function(){var k=Math.min(1,300/Math.max(im.width,im.height)),c=document.createElement("canvas");c.width=Math.max(1,Math.round(im.width*k));c.height=Math.max(1,Math.round(im.height*k));c.getContext("2d").drawImage(im,0,0,c.width,c.height);
      x.m=safeSrc(c.toDataURL("image/png"));r.querySelector(".qi").textContent=x.m?"✔":"";up()};im.src=fr.result};
    fr.readAsDataURL(f.files[0]);f.value="";
  };
  h.onclick=function(e){var b=e.target.closest(".qx");if(!b)return;var r=b.closest(".lp-qrow");lpQA[+r.dataset.i]={};r.querySelector(".qu").value="";r.querySelector(".qc").value="";r.querySelector(".qi").textContent="";up()};
}
/* 📄 វិធីបង្រៀនលម្អិត (រង្វង់ខៀវតូច) */
function lpMeth(id){   /* ទាញ record ពី LPMAP តាមជម្រើស select (វិធីសាស្ត្រ=m · យុទ្ធវិធី=s) */
  var e=$(id),t=e&&e.selectedIndex>=0?e.options[e.selectedIndex].text:"",M=LPMAP[id==="lpM"?"m":"s"],k=Object.keys(M).filter(function(x){return M[x].b===t})[0];
  return k?M[k]:null;
}
function lpMD(){
  var f=function(id,lab){var e=$(id),t=e.selectedIndex>=0?e.options[e.selectedIndex].text:"",a=lpDetail(t),R=lpMeth(id);
    var why=R?"<ol class=lp-sl><li><i>★</i><span><b>គោលបំណង ៖</b> "+esc(R.why)+"</span></li><li><i>★</i><span><b>លទ្ធផលរំពឹងទុក ៖</b> "+esc(R.out)+"</span></li></ol>":"";
    return a.length?"<div class=lp-mt>"+esc(lab)+" ៖ "+esc(t.split(" (")[0])+"</div>"+why+"<ol class=lp-sl>"+a.map(function(x,i){return"<li><i>"+kn(i+1)+"</i><span>"+esc(x)+"</span></li>"}).join("")+"</ol>":""};
  $("lpMD").innerHTML=f("lpM","វិធីសាស្ត្រ")+f("lpT","យុទ្ធវិធី");
  var w=$("lpMW");if(w){var m=lpMeth("lpM"),t=lpMeth("lpT"),at=function(R){return R?Object.keys(R.at).map(function(k){return"ជំហាន "+kn(+k+1)+" ៖ "+R.at[k]}).join(" · "):""};
    w.innerHTML=(m?"<b>វិធីសាស្ត្រ</b> → "+esc(at(m)):"")+(t?"<br><b>យុទ្ធវិធី</b> → "+esc(at(t)):"")}
}
/* 📑 Smart Pagination លើអេក្រង់ ៖ #lpA4 (ប្រភព · លាក់) → សន្លឹក .lp-sheet A4 ដាច់ៗ (រឹម ១៥/១៥/១៨ ម.ម = ដូចពេលបោះពុម្ព) · ធាតុណាដែលលើសបាតទំព័រ រុញទៅសន្លឹកបន្ទាប់ទាំងមូល (ក្បាលជំហាន+ជួរតារាង · ចំណងជើងមិនទុកតែឯង) · លេខទំព័រ = ផ្លាកលេខខ្មែរ (សេសស្តាំ គូឆ្វេង) */
var lpPSrc="",lpPT=0,lpPR=0,SHB=264*96/25.4;
function lpCl(e){var c=e.cloneNode(true);c.removeAttribute("id");[].forEach.call(c.querySelectorAll("[id]"),function(x){x.removeAttribute("id")});return c}
function lpUnits(A){
  var U=[],pre=[],nw=false,K=function(e){return e.nodeType===1};
  [].filter.call(A.children,K).forEach(function(c){
    if(c.hidden)return;
    if(c.tagName==="H3"&&c.classList.contains("lp-h")){pre.push(c);return}
    var u;
    if(c.classList.contains("lp-tw")){
      var th=c.querySelector("thead"),rs=[].slice.call(c.querySelectorAll("tbody tr"));
      for(var i=0;i<rs.length;i+=2)U.push({pre:i?[]:pre.splice(0),rows:[rs[i]].concat(rs[i+1]?[rs[i+1]]:[]),th:th});
      return}
    if(c.classList.contains("lp-md")){
      var k=[].filter.call(c.children,K);
      var P0=pre.splice(0),first=true,ol1=function(li){var o=document.createElement("ol");o.className="lp-sl";o.appendChild(li.cloneNode(true));return o};
      k.forEach(function(e){
        if(e.classList.contains("lp-mt")){U.push({pre:first?P0:[],els:[e],keep:1});first=false}
        else[].forEach.call(e.children,function(li){U.push({pre:first?P0:[],els:[ol1(li)]});first=false})});
      if(!k.length&&pre.length)pre.length=0;return}
    if(c.classList.contains("lp-ws")){var first=true;[].filter.call(c.children,K).forEach(function(x){if(x.classList.contains("lp-wsec")){pre.push(x);return}U.push({pre:pre.splice(0),els:[x],nw:first});first=false});return}
    U.push({pre:pre.splice(0),els:[c]});
  });
  return U;
}
function lpPaginate(){
  var A=$("lpA4"),S=$("lpSheets");if(!A||!S||!S.getBoundingClientRect().width)return false;
  var src=A.innerHTML;if(src===lpPSrc&&S.children.length)return true;
  var sheets=[],cur=null,body=null;
  var mk=function(){cur=document.createElement("article");cur.className="lp-a4 lp-sheet";body=document.createElement("div");body.className="lp-shb";cur.appendChild(body);S.appendChild(cur);sheets.push(cur)};
  var over=function(){return body.scrollHeight>body.clientHeight+1};
  S.innerHTML="";mk();
  var UL=lpUnits(A),UM=[];
  UL.forEach(function(u,i){if(u.keep&&UL[i+1]){UL[i+1].pre=(u.pre||[]).concat(u.els,UL[i+1].pre||[])}else UM.push(u)});
  var put=function(u){var added=[],tw=null;
    u.pre.forEach(function(p){var c=lpCl(p);body.appendChild(c);added.push(c)});
    if(u.rows){
      tw=body.lastElementChild&&body.lastElementChild.classList.contains("lp-tw")&&!u.pre.length?body.lastElementChild:null;
      var made=false;if(!tw){tw=document.createElement("div");tw.className="lp-tw";tw.innerHTML="<table class=lp-tb><colgroup><col style='width:28%'><col style='width:46%'><col style='width:26%'></colgroup></table>";tw.firstChild.appendChild(lpCl(u.th));tw.firstChild.appendChild(document.createElement("tbody"));body.appendChild(tw);added.push(tw);made=true}
      var tb=tw.querySelector("tbody");u.rows.forEach(function(r){var c=lpCl(r);tb.appendChild(c);if(!made)added.push(c)});
    }else u.els.forEach(function(e){var c=lpCl(e);body.appendChild(c);added.push(c)});
    return added},
  undo=function(a){a.forEach(function(x){x.remove()})},
  /* ✂️ Auto-fit ៖ ជួរខ្លឹមសារ (ul/li) ដែលមិនគ្រប់ទំព័រ → បំបែកតាមចំណុច li ទៅតាមសមាមាត្រ f (ជួរឈរនីមួយៗ) · ចំណុចដែលសល់បន្តទៅទំព័របន្ទាប់ */
  split=function(sb,f){
    var A=lpCl(sb),B=lpCl(sb),rest=0,kept=0;
    [].forEach.call(A.children,function(td,ci){
      var ua=td.querySelector("ul"),tb=B.children[ci],ub=tb&&tb.querySelector("ul");
      if(!ua){if(tb)tb.innerHTML="";return}
      var n=ua.children.length,k=Math.round(n*f),i;
      for(i=n-1;i>=k;i--)ua.removeChild(ua.children[i]);
      for(i=0;i<k;i++)ub.removeChild(ub.children[0]);
      kept+=k;rest+=n-k;
      if(!k)ua.remove();if(k===n)tb.innerHTML="";
    });
    return{a:A,b:B,rest:rest,kept:kept}};
  var guard=0,lastTH=null;
  function place(u,idx){
    if(u.rows&&u.th)lastTH=u.th;
    if(u.nw&&body.children.length)mk();
    var a=put(u);if(!over())return;
    undo(a);
    var sb=u.rows&&u.rows[u.rows.length-1];
    if(sb&&sb.querySelector("ul li")){
      var F=[.9,.8,.7,.6,.5,.4,.3,.22,.15,.1,.06,.03],fresh=body.children.length<=1;   /* ជួរខ្ពស់ជាងទំព័រ → បំបែកជាច្រើនជាន់ (ជួរដែលសល់ត្រូវបំបែកម្ដងទៀតនៅទំព័របន្ទាប់) */
      for(var q=0;q<F.length;q++){
        var sp=split(sb,F[q]);if(!sp.rest||sp.kept<(fresh?1:2))continue;
        var v={pre:u.pre,rows:u.rows.slice(0,-1).concat([sp.a]),th:u.th};a=put(v);
        if(!over()){UM.splice(idx+1,0,{pre:[],rows:[sp.b],th:u.th});return}
        undo(a)}}
    /* ហត្ថលេខាមិនត្រូវនៅតែឯងលើសន្លឹកថ្មី ៖ ដកជួរតារាងចុងក្រោយពីសន្លឹកមុនមកជាមួយ */
    if(u.els&&u.els[0]&&u.els[0].classList.contains("lp-sg")&&lastTH&&guard<400){
      var lt=body.lastElementChild,trs=lt&&lt.classList.contains("lp-tw")?lt.querySelectorAll("tbody tr"):[];
      if(trs.length>0&&trs[trs.length-1].querySelector("ul li")){   /* បំបែកជួរចុងក្រោយ ៖ ផ្នែកលើនៅសន្លឹកនេះ · ផ្នែកក្រោមទៅសន្លឹកថ្មីជាមួយហត្ថលេខា (កុំទុកចន្លោះទទេធំ) */
        var lastTr=trs[trs.length-1],FS=[.7,.55,.4,.25];
        for(var fi=0;fi<FS.length;fi++){
          var sp2=split(lastTr,FS[fi]);
          if(sp2.rest&&sp2.kept>=1){lastTr.parentNode.replaceChild(sp2.a,lastTr);UM.splice(idx,0,{pre:[],rows:[sp2.b],th:lastTH});guard++;mk();place(UM[idx],idx);return}
        }
      }
      if(trs.length>1){
        var tr=trs[trs.length-1],hd=trs.length>2&&trs[trs.length-2].classList.contains("lp-sh")?trs[trs.length-2]:null,rw=hd?[hd,tr]:[tr];   /* ជួរ «ជំហានទី N» ត្រូវទៅជាមួយខ្លឹមសាររបស់វា */
        if(trs.length-rw.length>=1){rw.forEach(function(r){r.parentNode.removeChild(r)});UM.splice(idx,0,{pre:[],rows:rw,th:lastTH});guard++;mk();place(UM[idx],idx);return}
      }
    }
    if(body.children.length&&guard++<400){mk();place(u,idx);return}
    put(u)}
  for(var ui=0;ui<UM.length;ui++)place(UM[ui],ui);
  lpFitMath(S);
  sheets.forEach(function(s,i){var n=document.createElement("span");n.className="lp-pb "+((i+1)%2?"r":"l");n.textContent=kn(i+1);s.appendChild(n)});
  lpPSrc=src;return true;
}
/* 📐 រូបមន្តដែលវែងជាងជួរឈរ → បង្រួមទំហំស្វ័យប្រវត្តិ (មិនកាត់ មិនធ្លាយ) */
function lpFitMath(root){
  [].forEach.call(root.querySelectorAll(".lp-tb td .lp-mp,.lp-tb td .katex-display"),function(m){
    var td=m.closest("td"),w=td?td.clientWidth-20:0,h=m.querySelector(".katex-html"),sw=Math.max(m.scrollWidth,h?h.getBoundingClientRect().width:0);
    if(w>40&&sw>w){m.style.zoom=Math.max(.34,w/sw).toFixed(3)}});
}
function lpPages(){clearTimeout(lpPT);lpPT=setTimeout(function(){if(lpPaginate())lpPR=0;else if(lpPR++<8)lpPages()},90)}
/* 🗓️ កាលបរិច្ឆេទ + សប្តាហ៍ → បន្ទាត់ «កាលបរិច្ឆេទ» នៃក្បាល A4 · លេខខ្មែរ · ហ្វុង Muol Light · មិនជ្រើស → ចំណុចចុចៗទទេ */
var LPWD=["អាទិត្យ","ច័ន្ទ","អង្គារ","ពុធ","ព្រហស្បតិ៍","សុក្រ","សៅរ៍"];   /* getUTCDay() ៖ ០ = អាទិត្យ */
function lpDateTxt(){
  var d=$("lpD").value,w=$("lpW").value,m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(d),t="";
  if(m)t="ថ្ងៃ"+LPWD[new Date(Date.UTC(+m[1],+m[2]-1,+m[3])).getUTCDay()]+" ទី"+kn(+m[3])+" ខែ"+M[+m[2]-1]+" ឆ្នាំ"+kn(m[1]);
  if(w)t+=t?" (សប្តាហ៍ទី"+kn(w)+")":"សប្តាហ៍ទី"+kn(w);
  return t;
}
function lpHeader(){
  var v=function(id,t){$(id).innerHTML=t?"<span class=lp-mu>"+esc(t)+"</span>":"<i></i>"},e=$("lpL");
  v("lpHG",$("lpG").value?"ថ្នាក់ទី"+kn($("lpG").value):"");
  /* LS[n] = [ឈ្មោះមេរៀន, ម៉ោង, "", លេខជំពូក, ឈ្មោះជំពូក, លេខមេរៀន] */
  var C=window.CUR&&window.CUR[+$("lpG").value],L=C&&C.LS&&e.value!==""?C.LS[e.value]:null,st=lpSubTxt();
  $("lpKC").textContent="ជំពូកទី"+(L&&L[3]!=null?kn(L[3]):"");v("lpHC",L?L[4]:"");
  $("lpKL").textContent="មេរៀនទី"+(L&&L[5]!=null?kn(L[5]):"");v("lpHL",L?L[0]:"");
  v("lpHD",lpDateTxt());lpDur();
  /* ២. ខ្លឹមសារមេរៀន ៖ ចំណងជើងមេរៀន + ចំណុចរង */
  $("lpCN").innerHTML=L?"<div class=lp-mt>"+lpMath(L[0])+"</div>"+(st.length?"<ol class=lp-sl>"+lpSel().map(function(x){return"<li><i>"+kn(x.n)+"</i><span>"+lpMath(x.t.replace(/^\s*[0-9០-៩]+\s*[.)]\s*/,""))+"</span></li>"}).join("")+"</ol>":""):"<span class=lp-ph>…</span>";
}
var lpPSig="";
/* 👥 គណៈគ្រប់គ្រង + ប្រធានក្រុមបច្ចេកទេស ជ្រើសបានពីបញ្ជីគ្រូ (data) · ប្រធានក្រុម លំនាំដើម = គ្រូដែលមានតួនាទី «ប្រធាន» (បើគ្មាន → ឈ្មោះថេរ) · គ្រូបង្រៀន = អ្នកដែលកំពុង Login ស្វ័យប្រវត្តិ (គ្មាន Dropdown) */
function lpPeople(){
  var T=(typeof data!=="undefined"&&data&&data.filter)?data.filter(function(t){return t&&t.name}):[];
  var sig=T.map(function(t){return t.id+"|"+t.name+"|"+t.rl}).join(",");
  if(sig===lpPSig&&$("lpMg").options.length)return;lpPSig=sig;
  var all=T.map(function(t){return"<option value='"+esc(t.id)+"'>"+esc(t.name)+"</option>"}).join(""),role=function(r){var t=T.filter(function(x){return x.rl===r})[0];return t?String(t.id):null};
  function fill(id,fixed,def){
    var e=$(id),prev=e.value;e.innerHTML=(fixed?"<option value='__f'>"+esc(fixed)+"</option>":"")+all;
    var has=function(v){return v!=null&&[].some.call(e.options,function(o){return o.value===v})};
    e.value=has(prev)?prev:has(def)?def:fixed?"__f":(e.options[0]?e.options[0].value:"");
  }
  fill("lpMg","គីម មិថុនា","__f");fill("lpTh","",role("ប្រធាន"));
}
/* ចំណងជើងប្រធានក្រុមបច្ចេកទេស តាមឈ្មោះដែលបានជ្រើស ៖ ម៉េត បញ្ញារិទ្ធ → ជ.ប្រធាន · ផៃ ចន → ប្រធាន · ផ្សេងទៀត → តាមតួនាទីក្នុងបញ្ជីគ្រូ */
var LPHT={"ម៉េត បញ្ញារិទ្ធ":"ជ.ប្រធានក្រុមបច្ចេកទេស","ផៃ ចន":"ប្រធានក្រុមបច្ចេកទេស"};
function lpHeadTitle(){
  var e=$("lpTh"),n=(lpNm("lpTh")||"").replace(/\s+/g," ").trim();if(LPHT[n])return LPHT[n];
  var t=(typeof data!=="undefined"&&data&&data.filter?data:[]).filter(function(x){return x&&String(x.id)===e.value})[0];
  return t&&t.rl==="អនុប្រធាន"?"ជ.ប្រធានក្រុមបច្ចេកទេស":"ប្រធានក្រុមបច្ចេកទេស";
}
function lpNm(id){var e=$(id);return e&&e.selectedIndex>=0?e.options[e.selectedIndex].text:""}
function lpMe(){return(typeof who!=="undefined"&&who&&(who.name||who.id))||""}
/* ✍️ ជើងហត្ថលេខា ៖ ស្ដាំ = កាលបរិច្ឆេទចន្ទគតិ + សុរិយគតិ (Date Picker · គ្មាន → ថ្ងៃនេះ) + «គ្រូបង្រៀន» + ឈ្មោះអ្នក Login */
function lpFooter(){
  var m=/^(\d{4})-(\d{2})-(\d{2})$/.exec($("lpD").value),n=new Date(),dd=n.getDate(),mm=n.getMonth(),yy=n.getFullYear();
  if(m){dd=+m[3];mm=+m[2]-1;yy=+m[1]}
  $("lpSD").textContent="រាជធានីភ្នំពេញ, ថ្ងៃទី"+kn(dd)+" ខែ"+M[mm]+" ឆ្នាំ"+kn(yy);
  var lu="";try{lu=window.KhCal?KhCal.fmt(yy,mm+1,dd):""}catch(e){}$("lpSL").textContent=lu;
  var tn=lpMe()||"…";$("lpST").textContent=tn;$("lpHT").textContent=tn;
  $("lpSM").textContent=lpNm("lpMg");$("lpSH").textContent=lpNm("lpTh");$("lpSHT").textContent=lpHeadTitle();lpPages();
}
/* 🖨️ បោះពុម្ព / PDF ៖ ច្បាប់ចម្លងក្រដាស A4 (ដកលេខសម្គាល់ជាន់គ្នា) ក្នុង #prt · @page ឈ្មោះ «lpdoc» ដាក់ «ទំព័រទី N» ខ្មែរ ៖ សេស = ស្ដាំ · គូ = ឆ្វេង (style.css) */
/* 🖨️ បោះពុម្ពភ្លាមៗពី #lpSheets ដែលមានស្រាប់លើអេក្រង់ (គ្មាន clone · គ្មាន setTimeout មុន print → Safari មិនទប់ស្កាត់ user gesture) ·
   លាក់ UI ផ្សេងដោយ class ស្រាលៗលើ ancestors/siblings (lpx/lpa) ហើយ @media print លើ body.lpp កំណត់សន្លឹក A4 */
function lpPrintMark(){
  lpPrintUnmark();var e=$("lpSheets");document.body.classList.add("lpp");document.documentElement.classList.add("lpp");
  /* Safari មិនស្គាល់ named page (@page lpsh) → @page សកល A4 គ្មានរឹម តែពេល lpp (រក្សារឹម 12×15mm របស់ឯកសាររដ្ឋបាលផ្សេង) */
  if(!$("lpPageStyle")){var st=document.createElement("style");st.id="lpPageStyle";st.textContent="@page{size:A4 portrait;margin:0!important}";document.head.appendChild(st)}
  while(e&&e!==document.body){e.classList.add("lpa");var p=e.parentNode;if(!p)break;[].forEach.call(p.children,function(c){if(c!==e&&c.nodeType===1)c.classList.add("lpx")});e=p}
}
function lpPrintUnmark(){
  if(!document.body.classList.contains("lpp")&&!document.querySelector(".lpa,.lpx"))return;
  document.body.classList.remove("lpp");document.documentElement.classList.remove("lpp");var ps=$("lpPageStyle");if(ps)ps.remove();[].forEach.call(document.querySelectorAll(".lpa,.lpx"),function(c){c.classList.remove("lpa","lpx")});
}
/* ⌘P / Ctrl+P / ម៉ឺនុយ File → Print ក៏បោះពុម្ពកិច្ចតែងការដែរ ពេលផ្ទាំង p21 កំពុងបើក និងមានសន្លឹក (មិនត្រូវការ #prt) */
function lpAutoMark(){
  if(document.body.classList.contains("pm")||document.body.classList.contains("lpp"))return;
  var sec=$("p21"),S=$("lpSheets");if(!sec||sec.hidden||!S||!S.children.length||!S.getBoundingClientRect().width)return;
  lpPrintMark();
}
window.addEventListener("beforeprint",lpAutoMark);
try{var _lq=window.matchMedia("print");var _lf=function(e){if(e.matches)lpAutoMark()};if(_lq.addEventListener)_lq.addEventListener("change",_lf);else if(_lq.addListener)_lq.addListener(_lf)}catch(e){}
var LPBP=0;   /* beforeprint បាញ់ពេលណា → ដឹងថា Safari បានបើកផ្ទាំង print ពិតឬអត់ */
window.addEventListener("beforeprint",function(){LPBP=Date.now()});
function lpPrint(){
  var S=$("lpSheets");
  if(!S||!S.children.length){
    if(!lpPaginate()||!S||!S.children.length){alert("សូមចុច «✨ បង្កើតកិច្ចតែងការ» ជាមុនសិន");return}
  }
  var t0=Date.now();
  try{window.print()}catch(e){console.error("lpPrint:",e)}
  /* Safari ខ្លះព្រងើយ window.print() ពី button → ព្យាយាម execCommand("print") (ក្នុង gesture ដដែល) បើ beforeprint មិនបាញ់ */
  if(!(LPBP>=t0)){try{document.execCommand("print",false,null)}catch(e){}}
  setTimeout(function(){if(!(LPBP>=t0)&&window.notify)notify("ផ្ទាំងបោះពុម្ពមិនបើក — សូមចុច ⌘P (Ctrl+P) ឬ File → Print (កិច្ចតែងការនឹងចេញដូចគ្នា)")},900);
}
window.lpPrint=lpPrint;
/* ✨ ចាប់តម្លៃពី Dropdown ទាំង ៤ → ទាញពី lessonPlanDB → ចាក់ចូលក្រដាស A4 */
/* 🤖 កិច្ចតែងការស្វ័យប្រវត្តិ សម្រាប់ចំណុចរងដែលមិនទាន់មានគំរូ ៖ ខ្លឹមសារ/ឧទាហរណ៍/លំហាត់ពីម៉ាស៊ីនលំហាត់ (practice*.js) + មេរៀនសង្ខេប (hub) · សកម្មភាពតាមវិធីសាស្ត្រ (5Es · PBL …) និងយុទ្ធវិធី (TPS · KWL …) ដែលបានជ្រើស */
function lpGram(s){s=String(s).replace(/[\s\d០-៩.,:;()៖·\-]+/g,"");var o={};for(var i=0;i<s.length-2;i++)o[s.substr(i,3)]=1;return o}
function lpSim(a,b){var A=lpGram(a),B=lpGram(b),n=0,u=0,k;for(k in A){u++;if(B[k])n++}for(k in B)if(!A[k])u++;return u?n/u:0}
function lpSteps(s){var o=[],cur="",d=0,m=String(s||"");for(var i=0;i<m.length;i++){var c=m[i];if(c==="$")d=1-d;if(c==="⇒"&&!d){if(cur.trim())o.push(cur.trim());cur=""}else cur+=c}if(cur.trim())o.push(cur.trim());return o}
function lpGenQ(g,l,v,seen){
  var G=window.PRACT&&PRACT.GR&&PRACT.GR[g]&&PRACT.GR[g].G&&PRACT.GR[g].G[l]&&PRACT.GR[g].G[l][v];if(!G)return null;
  for(var i=0;i<14;i++){try{var q=G();if(q&&q.q&&!seen[q.q]){seen[q.q]=1;return q}}catch(e){}}return null;
}
function lpAnsT(q){   /* ស្លាក + តម្លៃ ក្នុង $…$ តែមួយ (ឧ. $x=-\frac13$) → ពុម្ពអក្សរគណិតដូចគ្នា */
  return(q.a||[]).map(function(a){var l=String(a.l||"").trim().replace(/[:：]$/,"");
    if(!l)return"$"+a.t+"$";
    return/^[A-Za-z0-9_'′ ()]*=?$/.test(l)?"$"+l+(/=$/.test(l)?"":"=")+a.t+"$":l+" $"+a.t+"$"}).join(" · ");
}
function lpAuto(g,l,n,name,prev){
  var seen={},Q=function(v){return lpGenQ(g,+l,v,seen)},q1=Q(1),q2=Q(2),q2b=Q(5)||Q(2),q3=Q(3),q3b=Q(3),h1=Q(1),h2=Q(2),h3=Q(3);
  var mt=($("lpM").options[$("lpM").selectedIndex]||{}).text||"",tt=($("lpT").options[$("lpT").selectedIndex]||{}).text||"",md=lpDetail(mt),td=lpDetail(tt);
  var hub=null,best=0;try{var st=window.HUB&&HUB.starter&&HUB.starter(+g,+l);(st||[]).forEach(function(x){var s=lpSim(name,x.t);if(s>best){best=s;hub=x}})}catch(e){}
  if(best<.22)hub=null;
  var F=hub?(hub.f||[]).slice(0,3).map(function(f){return"$"+f+"$"}):[];
  var ex=function(q,k){if(!q)return[];var o=["ឧទាហរណ៍ "+kn(k)+" ៖ "+q.q],S=lpSteps(q.s).slice(0,4);S.forEach(function(x,i){o.push("ជំហាន "+kn(i+1)+" ៖ "+x)});o.push("ចម្លើយ ៖ "+lpAnsT(q));return o};
  var fg=[];[q1,q2].forEach(function(q){if(q&&q.fig)fg.push(q.fig)});
  var P=LPB.mk({title:name,obj:["ពន្យល់ និងអនុវត្តខ្លឹមសារ «"+name+"» បានត្រឹមត្រូវ","ដោះស្រាយលំហាត់ទាក់ទងនឹង «"+name+"» បានត្រឹមត្រូវ និងស្ទាត់ជំនាញ"],
    rev:{tc:[q1?"សួរ ៖ "+q1.q:"សួរសិស្សរំលឹកមេរៀនមុន «"+prev+"»","ឱ្យសិស្ស ២ នាក់ឡើងកែកិច្ចការផ្ទះលើក្ដារ"],ct:[q1?"ចម្លើយ ៖ "+lpAnsT(q1):"រំលឹក ៖ «"+prev+"»","ភ្ជាប់ទៅមេរៀនថ្មី ៖ «"+name+"»"]},
    nw:{tc:(md.length?md.slice(0,4):["ពន្យល់និយមន័យ និងរូបមន្ត","បង្ហាញឧទាហរណ៍លើក្ដារ"]).concat(["ឱ្យសិស្សអនុវត្តតាមយុទ្ធវិធី «"+(tt.split(" (")[0]||"ពិភាក្សា")+"»"]),
      ct:["មេរៀនទី "+kn(n)+" ៖ "+name].concat(hub?[hub.s].filter(Boolean):[],F,ex(q1,1),ex(q2,2)),
      st:(td.length?td.slice(0,3):["ស្ដាប់ និងកត់ត្រា"]).concat(["សិស្សធ្វើឧទាហរណ៍តាមគ្រូ"]),fg:fg},
    pr:{ct:[(q3||q2b||q2||{q:"ដោះស្រាយលំហាត់ពីសៀវភៅពុម្ព"}).q,q3?"ចម្លើយ ៖ "+lpAnsT(q3):"",(q3b?"លំហាត់បន្ថែម ៖ "+q3b.q:"")].filter(Boolean),
      tc:["ដាក់លំហាត់ឱ្យសិស្សធ្វើតាមយុទ្ធវិធី «"+(tt.split(" (")[0]||"ក្រុម")+"»","ដើរពិនិត្យ និងណែនាំក្រុមដែលជួបការលំបាក"],st:(td.length?td.slice(0,2):["ពិភាក្សាដោះស្រាយជាក្រុម"]).concat(["តំណាងក្រុមឡើងបកស្រាយលើក្ដារ"])},
    hw:[h1,h2,h3].filter(Boolean).map(function(q){return q.q}),
    ws:[q1,q2b,q3b,h2].filter(Boolean).map(function(q){return q.q})});
  P.auto=true;P.ex.key=F;P.ex.drill=[(q2||q1||{}).q].filter(Boolean);P.ex.hw=[h1,h3].filter(Boolean).map(function(q){return q.q});P.ex.ws=[q1,q2b,q3,q3b,h2].filter(Boolean).map(function(q){return q.q});
  return P;
}
function lpAutoBuild(g,l,need){
  var C=window.CUR&&window.CUR[+g],pts=lpPts(+g,l),lname=C&&C.LS&&C.LS[l]?C.LS[l][0]:"មេរៀន";
  return Promise.all([window.EXAM&&EXAM.gen?EXAM.gen().catch(function(){}):0,(typeof lazy==="function"?lazy("ls").catch(function(){}):0)]).then(function(){
    need.forEach(function(x){var i=-1;pts.forEach(function(p,j){if(String(p[0])===String(x.n))i=j});
      lessonPlanDB[g+"_"+l+"#"+x.n]=lpAuto(g,l,x.n,x.t.replace(/^\s*[0-9០-៩]+\s*[.)]\s*/,""),i>0?pts[i-1][1]:lname)})});
}

/* ✏️ កែសម្រួលកិច្ចតែងការដោយដៃ ៖ កែអ្វីដែលឃើញ (ចំណងជើង · វត្ថុបំណង · សម្ភារៈ · ៥ ជំហាន × ៣ ជួរ · សន្លឹកកិច្ចការ) · ១ បន្ទាត់ = ១ ចំណុច · LaTeX ក្នុង $…$
   រក្សាទុកក្នុងឧបករណ៍ (localStorage «lpEdit») តាមគ្រាប់ចុច «ថ្នាក់_មេរៀន#ចំណុចរង» → គ្រប់ពេលបង្កើតម្ដងទៀតបានកំណែដែលកែ · «↺» ត្រឡប់ទៅដើម · មិនកែទិន្នន័យដើម (lp*.js) */
var lpEKey="",LPE=null;
/* 💾 lpEdit = JSON (quotes " ' · Khmer Unicode · \n ត្រូវ JSON.stringify/parse ចាត់ចែងត្រឹមត្រូវ) · ពេលផ្ទុក ផ្ទៀងផ្ទាត់រចនាសម្ព័ន្ធ (ជួរអត្ថបទ) ដើម្បីកុំឱ្យទិន្នន័យខូចធ្វើឱ្យ render គាំង
   · JSON ខូច → រក្សាច្បាប់ចម្លងក្នុង «lpEdit_bad» (មិនជាន់ទិន្នន័យដើមដោយស្ងាត់ៗ) · រក្សាទុករួច អានមកផ្ទៀងផ្ទាត់ម្ដងទៀត */
function lpSArr(a){return Array.isArray(a)?a.map(function(x){return typeof x==="string"?x:(x==null?"":String(x))}):[]}
function lpSanE(o){
  if(!o||typeof o!=="object"||Array.isArray(o))return null;var r={};
  if(typeof o.title==="string")r.title=o.title;
  if(o.obj&&typeof o.obj==="object")r.obj={knowledge:lpSArr(o.obj.knowledge),skills:lpSArr(o.obj.skills),attitude:lpSArr(o.obj.attitude)};
  if(Array.isArray(o.mat))r.mat=lpSArr(o.mat);else if(o.mat&&typeof o.mat==="object")r.mat={st:lpSArr(o.mat.st),tc:lpSArr(o.mat.tc)};
  if(Array.isArray(o.steps))r.steps=o.steps.map(function(e){return e&&typeof e==="object"?{tc:lpSArr(e.tc),ct:lpSArr(e.ct),st:lpSArr(e.st)}:null});
  if(Array.isArray(o.ws))r.ws=lpSArr(o.ws);
  return r}
function lpELoad(){if(LPE)return LPE;var raw=null;LPE={};
  try{raw=localStorage.getItem("lpEdit");var v=raw?JSON.parse(raw):{};
    if(v&&typeof v==="object"&&!Array.isArray(v))Object.keys(v).forEach(function(k){var q=lpSanE(v[k]);if(q)LPE[k]=q})}
  catch(e){LPE={};console.warn("lpEdit corrupt:",e);try{if(raw)localStorage.setItem("lpEdit_bad",raw)}catch(x){}}
  return LPE}
function lpESave(){try{var j=JSON.stringify(LPE);if(j.length>3e6){alert("កំណែដែលបានកែច្រើនពេក · សូមត្រឡប់ខ្លះទៅដើម");return false}localStorage.setItem("lpEdit",j);if(localStorage.getItem("lpEdit")!==j)throw new Error("verify");return true}catch(e){alert("មិនអាចរក្សាទុកក្នុងឧបករណ៍បានទេ");return false}}
function lpApplyEdit(key,P){
  var o=lpELoad()[key];if(!o||!P||!P.steps)return P;
  var Q=Object.assign({},P);
  if(o.title)Q.title=o.title;
  if(o.obj)Q.obj=o.obj;
  if(o.mat)Q.mat=o.mat;
  Q.steps=P.steps.map(function(S,i){var e=o.steps&&o.steps[i];return e?Object.assign({},S,{tc:e.tc,ct:e.ct,st:e.st,edited:true}):S});
  if(o.ws){var ex=P.ex||{};Q.ex={pre:ex.pre||[],drill:[],ws:o.ws,hw:[],key:ex.key||[]};Q.worksheet=o.ws}
  return Q;
}
function lpELines(t){return String(t||"").split("\n").map(function(x){return x.trim()}).filter(Boolean)}
function lpEdOpen(){
  var P=lpLast;if(!P||!P.steps){alert("សូមចុច «✨ បង្កើតកិច្ចតែងការ» ជាមុនសិន");return}
  var d=$("lpEd");if(!d){d=document.createElement("dialog");d.id="lpEd";d.className="wide";document.body.appendChild(d)}
  var ta=function(id,v,rows){return"<textarea id='"+id+"' rows='"+(rows||3)+"' spellcheck='false' style='width:100%;font:inherit'>"+esc((v||[]).join("\n"))+"</textarea>"},O=P.obj||{},M=P.mat&&!Array.isArray(P.mat)?P.mat:{st:[],tc:Array.isArray(P.mat)?P.mat:[]};
  var ex=P.ex||{drill:[],ws:P.worksheet||[],hw:[]},wsl=[].concat(ex.drill||[],ex.ws||[],ex.hw||[]).filter(function(x,i,a){return x&&a.indexOf(x)===i});
  var h="<div class=dlgb style='max-height:78vh;overflow:auto'><h3 style='margin-top:0'>✏️ កែសម្រួលកិច្ចតែងការ</h3><p class=note>១ បន្ទាត់ = ១ ចំណុច · រូបមន្តសរសេរក្នុង $…$ (LaTeX) · រូប ⟦img:…⟧ កុំលុប · កែរួចចុច «រក្សាទុក» ហើយសន្លឹកនឹងត្រូវបង្កើតឡើងវិញ</p>"+
    "<label>ចំណងជើង</label><input id='lpEdT' value='"+esc(P.title||"")+"' style='width:100%'>"+
    "<label>វិជ្ជាសម្បទា</label>"+ta("lpEd0",O.knowledge)+"<label>បំណិនសម្បទា</label>"+ta("lpEd1",O.skills)+"<label>ចរិយាសម្បទា</label>"+ta("lpEd2",O.attitude,2)+
    "<label>សម្ភារៈ សម្រាប់សិស្ស</label>"+ta("lpEdMs",M.st,2)+"<label>សម្ភារៈ សម្រាប់គ្រូ</label>"+ta("lpEdMt",M.tc,2);
  P.steps.forEach(function(S,i){var F=lpFlow(S,i);
    h+="<fieldset style='margin:10px 0;border:1px solid #cbd5e1;border-radius:8px;padding:6px 8px'><legend><b>ជំហានទី "+kn(i+1)+" ៖ "+esc(S.n||LPS[i])+"</b></legend>"+
      "<div style='display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px'><div><small>សកម្មភាពគ្រូ</small>"+ta("lpEdC"+i+"_tc",F.tc,6)+"</div><div><small>ខ្លឹមសារមេរៀន</small>"+ta("lpEdC"+i+"_ct",S.ct,6)+"</div><div><small>សកម្មភាពសិស្ស</small>"+ta("lpEdC"+i+"_st",F.st,6)+"</div></div></fieldset>"});
  h+="<label>សន្លឹកកិច្ចការ (លំហាត់ ១ បន្ទាត់ = ១ លំហាត់)</label>"+ta("lpEdW",wsl,5)+"</div>"+
    "<div class=dlgf><button type=button id='lpEdR' class=danger>↺ ត្រឡប់ទៅដើម</button><span style='flex:1'></span><button type=button id='lpEdX'>បោះបង់</button><button type=button id='lpEdS' class=primary>💾 រក្សាទុក</button></div>";
  d.innerHTML=h;
  $("lpEdX").onclick=function(){d.close()};
  $("lpEdR").onclick=function(){if(!confirm("លុបការកែទាំងអស់នៃកិច្ចតែងការនេះ ហើយត្រឡប់ទៅកំណែដើម?"))return;delete lpELoad()[lpEKey];lpESave();d.close();generateLessonPlan()};
  $("lpEdS").onclick=function(){
    var o={title:$("lpEdT").value.trim(),obj:{knowledge:lpELines($("lpEd0").value),skills:lpELines($("lpEd1").value),attitude:lpELines($("lpEd2").value)},
      mat:{st:lpELines($("lpEdMs").value),tc:lpELines($("lpEdMt").value)},steps:P.steps.map(function(S,i){return{tc:lpELines($("lpEdC"+i+"_tc").value),ct:lpELines($("lpEdC"+i+"_ct").value),st:lpELines($("lpEdC"+i+"_st").value)}}),ws:lpELines($("lpEdW").value)};
    lpELoad()[lpEKey]=o;if(!lpESave())return;d.close();generateLessonPlan();
  };
  if(d.showModal)d.showModal();else d.setAttribute("open","")
}
function generateLessonPlan(){var g=$("lpG").value;if(LPF[+g]&&!lessonPlanDB[g+"_"+$("lpL").value]){$("lpSt").textContent="⏳ កំពុងផ្ទុកទិន្នន័យកិច្ចតែងការ…"}return lpLoadDB(g).then(lpGen1)}
function lpGen1(){
  var g=$("lpG").value,l=$("lpL").value,need=lpSel().filter(function(x){var P=lessonPlanDB[g+"_"+l+"#"+x.n];return!P||P.auto});
  if(!need.length)return lpGenDo();
  $("lpSt").textContent="⏳ កំពុងបង្កើតខ្លឹមសារស្វ័យប្រវត្តិ (ផ្ទុកម៉ាស៊ីនលំហាត់…)";
  return lpAutoBuild(g,l,need).then(lpGenDo,function(){return lpGenDo()});
}
/* ⚠️ រូបមន្តដែលបម្លែងពីឯកសារមិនបាន (□) → ប្រាប់គ្រូឱ្យបំពេញដោយដៃមុនព្រីន */
function lpSqNote(P){var n=(JSON.stringify(P).match(/\\\\square/g)||[]).length;return n?" · ✏️ មាន "+kn(n)+" ប្រអប់ □ ត្រូវបំពេញរូបមន្តដោយដៃ":""}
function lpGenDo(){
  var g=$("lpG").value,l=$("lpL").value,sel=lpSel(),sb=sel.map(function(x){return x.n}).join("+"),CB=lpCombine(g,l,sel),P=CB.P;lpEKey=g+"_"+l+"#"+sb;if(P)P=lpApplyEdit(lpEKey,P);
  lpPeople();lpMeta();lpHeader();lpFooter();
  if(!P){lpRender(null);lpPages();$("lpSt").textContent="ℹ️ មិនទាន់មានកិច្ចតែងការគំរូសម្រាប់"+(sel.length?"ចំណុចរងដែលបានជ្រើស":"មេរៀននេះ")+"ទេ (មានសម្រាប់ ថ្នាក់ទី១២ មេរៀន ១១ · ២២ · ២៣ · ៣១ · ៣២ តាមចំណុចរងដែលមានក្នុងបញ្ជី)";return false}
  if(P.sug&&lpSugK!==g+"_"+l+"#"+sb){lpSugK=g+"_"+l+"#"+sb;[["lpM",P.sug[0]],["lpT",P.sug[1]]].forEach(function(x){var e=$(x[0]);for(var i=0;i<e.options.length;i++)if(e.options[i].text.indexOf(x[1])===0){e.value=e.options[i].value;break}});lpMeta()}
  lpRender(P);lpPages();
  $("lpSt").textContent="✅ បានបង្កើតកិច្ចតែងការ «"+P.title+"» · "+kn(lpDu())+" នាទី"+(P.auto||sel.some(function(x){var Q=lessonPlanDB[g+"_"+l+"#"+x.n];return Q&&Q.auto})?" · 🤖 មានចំណុចបង្កើតស្វ័យប្រវត្តិ (ពិនិត្យមុនប្រើ)":"")+(CB.miss.length?" · ⚠️ មិនទាន់មានគំរូសម្រាប់៖ "+CB.miss.join(" · "):"")+lpSqNote(P)+(P&&P.steps&&P.steps[0]&&P.steps[0].edited?" · ✏️ ខ្លឹមសារដែលគ្រូបានកែ":"");
  $("lpA4").scrollIntoView({behavior:"smooth",block:"start"});return true;
}
/* 📑 ចំណុចរងនៃមេរៀន ពីកម្មវិធីសិក្សាលម្អិត CUR[g].W («1. ឯកតានិមិត្ត» → [1,"ឯកតានិមិត្ត"]) · ក. ខ. (ចំណុចតូចជាងនេះ) មិនរាប់ */
function lpPts(g,l){
  var C=window.CUR&&window.CUR[g],o=[],seen={};if(!C)return o;
  (C.W||[]).forEach(function(w){(w.x||[]).forEach(function(s){if(s.t!=="L"||+s.n!==+l)return;
    (s.s||[]).forEach(function(t){var m=/^\s*(\d+)\s*[.)]\s*(.+)$/.exec(t);if(m&&!seen[m[1]]){seen[m[1]]=1;o.push([+m[1],m[2].trim()])}})})});
  return o.sort(function(a,b){return a[0]-b[0]});
}
function lpSubs(){
  lpQR();
  var o=lpPts(+$("lpG").value,$("lpL").value).map(function(x){return"<option value='"+x[0]+"'>"+kn(x[0])+". "+esc(x[1])+"</option>"}).join("");
  $("lpS").innerHTML="<option value=''>— ទាំងមេរៀន —</option>"+o;$("lpS2").innerHTML=$("lpS3").innerHTML="<option value=''>— មិនជ្រើស —</option>"+o;
}
/* ចំណុចរងដែលបានជ្រើស ៖ ៤៥ នាទី = ១ · ៩០ នាទី = ២–៣ (lpS · lpS2 · lpS3) */
function lpSel(){var o=[],seen={};["lpS","lpS2","lpS3"].forEach(function(id){var e=$(id);if(!e||e.value===""||e.selectedIndex<0||seen[e.value])return;seen[e.value]=1;o.push({n:e.value,t:e.options[e.selectedIndex].text})});return o}
function lpSubTxt(){return lpSel().map(function(x){return x.t})}
/* 🧩 បញ្ចូលកិច្ចតែងការច្រើនចំណុចរងជាមួយគ្នា (៩០ នាទី) ៖ វត្ថុបំណង/ខ្លឹមសារ/លំហាត់ត្រូវបានបន្ត · ម៉ោងគោល ៤៥ (ត្រូវគុណតាមរយៈពេលពេលបង្ហាញ) */
function lpCombine(g,l,sel){
  var ps=[],miss=[];
  (sel.length?sel:[{n:"",t:""}]).forEach(function(x){var P=lessonPlanDB[g+"_"+l+(x.n?"#"+x.n:"")];if(P){if(ps.indexOf(P)<0)ps.push(P)}else miss.push(x.t||"ទាំងមេរៀន")});   /* កិច្ចតែងការតែមួយអាចចុះបញ្ជីក្នុងចំណុចរងច្រើន → រួមតែម្ដង */
  if(!ps.length)return{P:null,miss:miss};
  if(ps.length===1)return{P:ps[0],miss:miss};
  var cat=function(f){var o=[];ps.forEach(function(P){(f(P)||[]).forEach(function(x){if(o.indexOf(x)<0)o.push(x)})});return o};
  var st=function(i,k){var o=[];ps.forEach(function(P){var S=P.steps&&P.steps[i];if(S&&S[k])S[k].forEach(function(x){o.push(x)})});return o};
  var T=[3,5,23,9,5],s0=ps[0].steps;
  return{miss:miss,P:{title:ps.map(function(P){return P.title}).join(" + "),dur:45,sug:ps[0].sug,mat:ps[0].mat,
    obj:{knowledge:cat(function(P){return P.obj&&P.obj.knowledge}),skills:cat(function(P){return P.obj&&P.obj.skills}),attitude:cat(function(P){return P.obj&&P.obj.attitude}).slice(0,1)},
    steps:[0,1,2,3,4].map(function(i){var fg=[];ps.forEach(function(P){var S=P.steps&&P.steps[i];if(S&&S.fg)S.fg.forEach(function(x){fg.push(x)})});
      var a=i===0||i===1?[ps[0]]:ps;   /* រដ្ឋបាល · រំលឹក ពីកិច្ចតែងការទី១ */
      var f=function(k){var o=[];a.forEach(function(P){var S=P.steps&&P.steps[i];if(S&&S[k])S[k].forEach(function(x){if(o.indexOf(x)<0)o.push(x)})});return o};
      var R={n:s0[i].n,t:T[i],tc:f("tc"),ct:f("ct"),st:f("st"),fg:(i===0||i===1)?s0[i].fg:fg};
      if(i===2){   /* មេរៀនប្រចាំថ្ងៃ ៖ ចប់ចំណុចរងទី ១ ទាំង ៣ ជួរ រួចទើបចំណុចរងទី ២ (ម៉ោងទី ១ → ម៉ោងទី ២) */
        var hd=function(P,k,col){var h="ផ្នែកទី "+kn(k+1)+(ps.length===2?" (ម៉ោងទី "+kn(k+1)+")":"");return col==="ct"?"▸ "+h+" ៖ "+String(P.title||"").split(" · ").slice(-1)[0]:"▸ "+h};
        ["tc","ct","st"].forEach(function(col){var o=[];ps.forEach(function(P,k){var S=P.steps&&P.steps[i];o.push(hd(P,k,col));if(S&&S[col])S[col].forEach(function(x){if(o.indexOf(x)<0)o.push(x)})});R[col]=o});
      }
      return R}),
    ex:{pre:(ps[0].ex&&ps[0].ex.pre)||[],drill:cat(function(P){return P.ex&&P.ex.drill}),hw:cat(function(P){return P.ex&&P.ex.hw}),ws:cat(function(P){return P.ex&&P.ex.ws}),key:cat(function(P){return P.ex&&P.ex.key}).slice(0,3)},
    worksheet:cat(function(P){return P.worksheet})}};
}
function lpFill(id,a){var e=$(id);e.innerHTML=a.map(function(x,i){return"<option value='"+i+"'>"+esc(x)+"</option>"}).join("")}
function lpLessons(){
  var g=+$("lpG").value,C=window.CUR&&window.CUR[g],l=$("lpL");
  if(!C||!C.LS){l.innerHTML="<option value=''>— មិនទាន់ផ្ទុកបញ្ជីមេរៀន —</option>";return}
  l.innerHTML=Object.keys(C.LS).sort(function(a,b){return a-b}).map(function(n){var x=C.LS[n];return"<option value='"+esc(n)+"'>"+kn(n)+" · "+esc(x[0])+"</option>"}).join("")||"<option value=''>—</option>";
  lpSubs();
}
function lpMeta(){
  var sel=function(id){var e=$(id);return e.selectedIndex>=0?e.options[e.selectedIndex].text:"…"};
  $("lpM1").textContent=sel("lpM").split(" (")[0];$("lpM2").textContent=sel("lpT").split(" (")[0];lpMD();lpQR();lpPages();
}
function renderLp(){
  if(!$("lpG"))return;
  lpQUI();
  if(!$("lpG").options.length){   /* បំពេញម្ដងគត់ (idempotent · refreshView មិនបិទបញ្ជីដែលកំពុងបើក) */
    $("lpG").innerHTML=[7,8,9,10,11,12].map(function(g){return"<option value='"+g+"'>ថ្នាក់ទី"+kn(g)+"</option>"}).join("");
    $("lpG").value=12;lpFill("lpM",LPM);lpFill("lpT",LPT);
    $("lpW").innerHTML="<option value=''>— មិនកំណត់ —</option>"+Array.apply(null,Array(20)).map(function(_,i){return"<option value='"+(i+1)+"'>សប្តាហ៍ទី "+kn(i+1)+"</option>"}).join("");
    lpRender(null);lpFooter();lpMeta();
    $("lpM").onchange=$("lpT").onchange=function(){lpMeta();if(lpLast)lpRender(lpLast)};
    $("lpDu").onchange=function(){lpDur();lpHeader();lpRender(lpLast)};
    $("lpS").onchange=$("lpS2").onchange=$("lpS3").onchange=function(){lpHeader()};
    $("lpMg").onchange=$("lpTh").onchange=function(){lpFooter()};
    if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){lpPSrc="";lpPages()});
    $("lpG").onchange=function(){lpLoadDB($("lpG").value);lpLessons()};$("lpL").onchange=function(){lpSubs()};
    $("lpGen").onclick=generateLessonPlan;$("lpEdit")&&($("lpEdit").onclick=lpEdOpen);
  }
  if(!$("lpL").options.length||$("lpL").options[0].value==="")lpLessons();
  lpLoadDB($("lpG").value);
  lpPeople();
}


/* ===== Dashboard ទំនើប៖ បដាស្វាគមន៍ + កាតស្ថិតិ (Bento) + ម៉ឺនុយអណ្ដែត (modern.css) ===== */
var FN=[["p0","🏠","ទំព័រដើម"],["p1","👥","គ្រូ"],["p2","📋","កិច្ចការ"],["p4","🎓","និទស្សន៍"],["p5","📊","លទ្ធផល"],["p6","🔍","សង្កេត"],["p7","📈","ក្រាហ្វិក"],["p8","🧑‍🎓","សិស្ស"],["p9","📝","របាយការណ៍"],["p10","🏆","ស្នាដៃ"],["p11","📚","ឯកសារ"],["p12","🗓️","កាលវិភាគ"],["p13","⏱️","Timesheet"],["p14","📖","សម្រង់អត្ថបទ"],["p15","📘","កម្មវិធីសិក្សា"],["p16","🏛️","រចនាសម្ព័ន្ធថ្នាក់"],["p17","📝","តេស្ត"],["p18","🗓️","ពិន្ទុប្រចាំខែ"],["p19","🤝","កំណត់ហេតុប្រជុំ"],["p20","📖","មេរៀនសង្ខេប"],["p21","🧩","កិច្ចតែងការបង្រៀន"]];
function buildFnav(){
  var full={};[].forEach.call(document.querySelectorAll("#tabs button"),function(b){full[b.dataset.p]=b.textContent});
  $("fnav").innerHTML=FN.filter(function(x){return x[0]!=="p6"&&x[0]!=="p7"&&x[0]!=="p9"&&x[0]!=="p11"&&x[0]!=="p13"&&x[0]!=="p14"&&x[0]!=="p15"&&x[0]!=="p16"&&x[0]!=="p17"&&x[0]!=="p18"&&x[0]!=="p19"&&x[0]!=="p20"&&x[0]!=="p21"}).map(function(x){
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
var SNG=[["ទូទៅ",["p0","p1"]],["ការងាររដ្ឋបាល",["p2","p9","p13","p19"]],["មេរៀន · កិច្ចតែងការ",["p20","p21"]],["និទស្សន៍ · សង្កេត",["p4","p6"]],["លទ្ធផលសិក្សា",["p5","p7","p17","p18","p8"]],["គ្រប់គ្រងថ្នាក់រៀន",["p12","p14","p15","p16"]],["ឯកសារ",["p10","p11"]]];
function buildSnav(){
  var ic={},full={};FN.forEach(function(x){ic[x[0]]=x[1]});
  [].forEach.call(document.querySelectorAll("#tabs button"),function(b){full[b.dataset.p]=b.textContent.replace(/^[០-៩]+\.\s*/,"")});
  $("snList").innerHTML=SNG.map(function(g){
    return"<div class=sn-g><div class=sn-h>"+esc(g[0])+"</div>"+g[1].map(function(p){return"<button type=button class=sn-i data-p='"+p+"'><span aria-hidden=true>"+ic[p]+"</span><em>"+esc(full[p]||"")+"</em></button>"}).join("")+"</div>"}).join("");
  $("snList").insertAdjacentHTML("beforeend","<div class=sn-g><button type=button class=sn-i id=snSet><span aria-hidden=true>⚙️</span><em>ការកំណត់</em></button></div>");
}
function snTop(){var h=document.querySelector("#appSection header");$("snav").style.top=Math.max(0,h?h.getBoundingClientRect().bottom:0)+"px"}
(function(){
  var open=true;try{open=localStorage.getItem("snav")!=="0"}catch(x){}
  function set(o){open=o;document.body.classList.toggle("sn-off",!o);$("snTog").setAttribute("aria-expanded",String(o));$("snTog").textContent=o?"‹":"›";try{localStorage.setItem("snav",o?"1":"0")}catch(x){}}
  set(open);snTop();
  window.addEventListener("resize",snTop);window.addEventListener("scroll",snTop,{passive:true});
  $("snTog").onclick=function(){set(!open)};
  $("snList").onclick=function(e){if(e.target.closest("#snSet"))return openSettings();var b=e.target.closest("button[data-p]");if(b)show(b.dataset.p)};
})();
function syncNav(p){
  snTop();
  [].forEach.call(document.querySelectorAll("#snList button"),function(b){var on=b.dataset.p===p;b.classList.toggle("active",on);if(on)b.setAttribute("aria-current","page");else b.removeAttribute("aria-current")});
  [].forEach.call(document.querySelectorAll("#fnav button"),function(b){
    var on=b.dataset.p===p||(b.dataset.p==="p4"&&p==="p6")||(b.dataset.p==="p5"&&(p==="p7"||p==="p17"||p==="p18"))||(b.dataset.p==="p2"&&(p==="p9"||p==="p13"||p==="p19"))||(b.dataset.p==="p10"&&p==="p11")||(b.dataset.p==="p12"&&(p==="p14"||p==="p15"||p==="p16"));b.classList.toggle("active",on);
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
  var o=Object.assign({},t);["ph","ad","dob","g","sub","deg","sd"].forEach(function(k){if(p[k])o[k]=p[k]});if(p.nm)o.name=p.nm;return o;
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
function curPage(){return["p0","p1","p2","p4","p5","p6","p7","p8","p9","p10","p11","p12","p13","p14","p15","p16","p17","p18","p19","p20","p21"].filter(function(x){return !$(x).hidden})[0]||"p0"}
function subProfiles(){
  try{
    var un=window.FB.onSnapshot(window.FB.collection(window.db,"profiles"),function(sn){
      var o={};sn.forEach(function(d){var v=d.data();if(v&&v.o)o[String(v.o).toUpperCase()]=v});
      profs=o;applyProfNames();updateUserInfo();
      var c=curPage();if(c==="p0")renderDash();else if(c==="p1")render();
    },function(err){console.error("profiles:",err)});
    unsubs.push(un);
  }catch(e){console.error(e)}
}
/* ឈ្មោះដែលគ្រូកែខ្លួនឯង (profiles.nm) → បង្ហាញគ្រប់កន្លែង */
function applyProfNames(){
  data.forEach(function(t){var p=profs[String(t.id).toUpperCase()];if(p&&p.nm)t.name=khNorm(p.nm)});
  if(who){var q=profs[who.id];if(q&&q.nm)who.name=khNorm(q.nm)}
}
var pfFor="";   /* គ្រូដែលកំពុងកែប្រវត្តិរូប (ខ្លួនឯង ឬ Admin កែអ្នកផ្សេង) */
function paintPf(){
  var box=$("pfPhoto"),nm=($("pfName").value||pfFor);
  box.innerHTML=pfPhoto&&okPhoto(pfPhoto)?"<img src='"+pfPhoto+"' alt=''>":"<span>"+esc(Array.from(nm.trim())[0]||"?")+"</span>";
  $("pfDel").hidden=!pfPhoto;
}
function openProfile(id){
  if(!who)return;
  id=(typeof id==="string"&&id)?id:who.id;
  if(id!==who.id&&!isAdm()){alert("អ្នកកែបានតែព័ត៌មានរបស់ខ្លួនឯងប៉ុណ្ណោះ!");return}
  pfFor=id;
  var t=data.filter(function(x){return x.id===id})[0]||{},p=profs[id]||{},me=id===who.id;
  $("pfH").textContent=me?"👤 ប្រវត្តិរូបរបស់ខ្ញុំ":"👤 ប្រវត្តិរូប — "+(t.name||id);
  $("pfId").value=id;$("pfName").value=p.nm||t.name||(me?who.name:"")||id;
  $("pfRole").value=(me&&isAdm())?"អ្នកគ្រប់គ្រង":(t.rl||"សមាជិក");
  $("pfG").value=p.g||t.g||"";$("pfDob").value=p.dob||t.dob||"";
  $("pfPh").value=p.ph||t.ph||"";$("pfAd").value=p.ad||t.ad||"";$("pfBio").value=p.bio||"";
  $("pfSub").value=p.sub||t.sub||"";$("pfDeg").value=p.deg||t.deg||"";$("pfSd").value=p.sd||t.sd||"";
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
$("btnProf").onclick=function(){openProfile()};
$("wbAvatar").onclick=function(){openProfile()};
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
  var id=pfFor||who.id;if(id!==who.id&&!isAdm())return;
  var dob=$("pfDob").value.trim(),sd=$("pfSd").value.trim(),nm=khNorm($("pfName").value.trim().slice(0,100));
  if(!nm){alert("សូមបញ្ចូលឈ្មោះ!");return}
  if(dob&&!/^\d{4}-\d{2}-\d{2}$/.test(dob)){alert("ថ្ងៃខែឆ្នាំកំណើតមិនត្រឹមត្រូវ!");return}
  if(sd&&!/^\d{4}-\d{2}-\d{2}$/.test(sd)){alert("ថ្ងៃចូលបម្រើការងារមិនត្រឹមត្រូវ!");return}
  var rec={o:id,nm:nm,g:$("pfG").value,dob:dob,ph:$("pfPh").value.trim().slice(0,40),ad:$("pfAd").value.trim().slice(0,200),
    sub:$("pfSub").value.trim().slice(0,60),deg:$("pfDeg").value.trim().slice(0,80),sd:sd,bio:$("pfBio").value.trim().slice(0,500),photo:pfPhoto,u:new Date().toISOString()};
  var btn=$("okProf");btn.disabled=true;
  window.FB.setDoc(window.FB.doc(window.db,"profiles",id),rec).then(function(){
    profs[id]=rec;applyProfNames();$("dlgProf").close();updateUserInfo();
    if(isAdm()){var tt=data.filter(function(x){return x.id===id})[0];if(tt){["g","dob","ph","ad","sub","deg","sd"].forEach(function(k){tt[k]=rec[k]});tt.name=nm;save()}}   /* Admin៖ ធ្វើឱ្យតារាងគ្រូដូចគ្នា */
    var c=curPage();if(c==="p0")renderDash();else if(c==="p1")render();
    notify(id===who.id?"បានរក្សាទុកប្រវត្តិរូបរបស់អ្នក!":"បានរក្សាទុកប្រវត្តិរូប");
  }).catch(function(e2){alert(e2&&e2.code==="permission-denied"?"គ្មានសិទ្ធិរក្សាទុកប្រវត្តិរូបទេ។ សូមប្រាប់អ្នកគ្រប់គ្រងឱ្យ Publish firestore.rules កំណែថ្មី (មាន profiles)។":authErr(e2))})
    .then(function(){btn.disabled=false});
};

/* ===== Dashboard — ទំព័រដើម (ស្ដង់ដារ៖ ស្វាគមន៍ · ស្ថិតិ · ចូលរហ័ស · លទ្ធផល · កាលវិភាគខាងមុខ · សកម្មភាពថ្មីៗ) ===== */
var DAYF=["អាទិត្យ","ច័ន្ទ","អង្គារ","ពុធ","ព្រហស្បតិ៍","សុក្រ","សៅរ៍"];
function curMK(){var m=new Date().getMonth()+1,i=[10,11,12,1,2,3,4,5,6,7,8].indexOf(m);return i}
function ymNow(){var d=new Date();return d.getFullYear()+"-"+pad2(d.getMonth()+1)}
function syStart(){var d=new Date(),y=d.getMonth()+1>=10?d.getFullYear():d.getFullYear()-1;return y+"-10-01"}
function allCls(ids){var o=[];ids.forEach(function(id){(rs.c&&rs.c[id]||[]).forEach(function(c){o.push({c:c,o:id})})});return o}
function dCard(num,lbl,col){return"<div class=modern-card><h3 class=dnum style='font-size:28px;color:"+col+"'>"+kn(num)+"</h3><p style='color:var(--text-muted)'>"+esc(lbl)+"</p></div>"}
function dEmpty(t){return"<p class=note style='margin:0'>"+t+"</p>"}
function renderDash(){
  if(!who||$("p0").hidden)return;
  var adm=isAdm(),me=who.id,hr=new Date().getHours(),g=hr<12?["Good Morning","☀️"]:hr<17?["Good Afternoon","🌤️"]:["Good Evening","🌙"],now=new Date();
  /* បដាស្វាគមន៍ */
  $("wbName").innerHTML=esc(g[0])+", <span class=mu>"+esc(who.name)+"</span>! "+g[1];
  $("wbDate").textContent="ថ្ងៃ"+DAYF[now.getDay()]+" ទី"+kn(now.getDate())+" ខែ"+M[now.getMonth()]+" ឆ្នាំ"+kn(now.getFullYear());
  $("wbAvatar").innerHTML=avInner(me,who.name);
  var ids=adm?data.map(function(t){return t.id}):[me],cls=allCls(ids),stu=cls.reduce(function(s,x){return s+x.c.st.length},0);
  /* Admin៖ ថ្នាក់ដដែលដែលគ្រូច្រើននាក់បញ្ចូល (គ្រូមុខវិជ្ជា) រាប់តែម្ដង · សិស្ស = បញ្ជីវែងបំផុតនៃថ្នាក់នីមួយៗ (ដូច «📚 ថ្នាក់ទាំងអស់») */
  var nCls=cls.length;if(adm){var G=pxGroups();nCls=G.length;stu=G.reduce(function(s,g){return s+g.tot},0)}
  var mk=curMK(),tk=0;
  if(mk>=0)ids.forEach(function(id){((gk(id).w[mk])||[]).forEach(function(r){tk+=sm(r||[])})});
  var ym=ymNow(),rep=0;ids.forEach(function(id){rep+=(wr.r[id]||[]).filter(function(e){return(e.d||"").slice(0,7)===ym}).length});
  var s0=syStart(),ach=0;ids.forEach(function(id){ach+=(ah.r[id]||[]).filter(function(e){return(e.d||"")>=s0}).length});
  var k=[];
  if(adm){
    k.push(dCard(pad2(data.length),"គ្រូបង្រៀនសរុប","#a855f7"),dCard(pad2(data.filter(function(t){return t.stt==="កំពុងបម្រើការងារ"}).length),"កំពុងបំពេញការងារ","#10b981"));
  }
  k.push(dCard(pad2(nCls),adm?"ថ្នាក់សរុប":"ថ្នាក់របស់ខ្ញុំ","#38bdf8"),dCard(stu,adm?"សិស្សសរុប":"សិស្សរបស់ខ្ញុំ","#f59e0b"),
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
  if(window.WALKER)WALKER.react(nt);
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
/* Backup៖ ទិន្នន័យក្នុង memory (ទម្រង់ចាស់ · Restore បាន) + Admin៖ គ្រប់ collection ពី Cloud (cloud.{collection}.{id}) */
var BKC=["app","cfg","users","tasks","rs","wr","ah","sched","ts","cx","mc","mclog","lsn","sig","profiles","lib","exrows","obsrows","qb","qbq","qimg","pcls","prt","mt","plc","tests","tkeys","subs","timg","mcp","hub","att","exams"];
function bkCloud(){
  var F=window.FB,out={},err=[];if(!F||!window.db||!F.getDocs)return Promise.resolve({cloud:null,err:["offline"]});
  var one=function(c,q){return F.getDocs(q||F.collection(window.db,c)).then(function(sn){var o=out[c]||(out[c]={});sn.forEach(function(d){o[d.id]=d.data()})}).catch(function(e){err.push(c+": "+(e.code||e.message))})};
  var ps=BKC.map(function(c){return one(c)});
  ps.push(one("dl",F.query(F.collection(window.db,"dl"),F.where("o","==",who.id))));   /* កំណត់ហេតុប្រចាំថ្ងៃ = ឯកជន → តែរបស់ខ្លួន */
  return Promise.all(ps).then(function(){return{cloud:out,err:err}});
}
function bkPayload(full){
  var payload={version:5,date:new Date().toISOString(),teachers:data.map(function(t){var c=Object.assign({},t);delete c.pw;return c}),tasks:tasks,demo:ex,results:rs,obs:ob,reports:wr,achievements:ah,library:lib};
  if(!full)return Promise.resolve({p:payload,n:0,err:[]});
  return bkCloud().then(function(r){payload.cloud=r.cloud;payload.cloudErr=r.err;var n=0;Object.keys(r.cloud||{}).forEach(function(c){n+=Object.keys(r.cloud[c]).length});return{p:payload,n:n,nc:Object.keys(r.cloud||{}).length,err:r.err}});
}
function bkName(full){var d=new Date(),z=function(x){return("0"+x).slice(-2)};return"teacher-system-backup-"+(full?"full-":"")+d.getFullYear()+"-"+z(d.getMonth()+1)+"-"+z(d.getDate())+(full?"_"+z(d.getHours())+z(d.getMinutes()):"")+".json"}
function bkMark(){try{localStorage.setItem("lastBk_"+who.id,String(Date.now()))}catch(x){}bkBtn()}
function bkLast(){var t=0;try{t=+localStorage.getItem("lastBk_"+who.id)||0}catch(x){}return t}
function bkBtn(){var b=$("btnBackupD");if(!b)return;b.hidden=!isAdm();var t=bkLast();b.title="ផ្ញើ Backup ពេញលេញទៅ Google Drive › «Backup ប្រព័ន្ធគ្រូ»"+(t?" · លើកចុងក្រោយ "+new Date(t).toLocaleString("en-GB"):" · មិនទាន់ធ្លាប់")}
$("btnBackup").onclick=function(){
  var b=this,full=isAdm();
  if(b&&b.disabled)return Promise.resolve();
  if(full){if(b&&b.tagName)b.disabled=true;notify("⏳ កំពុងទាញទិន្នន័យទាំងអស់ពី Cloud ...")}
  var pr=bkPayload(full).then(function(r){
    var a=document.createElement("a");
    a.href=URL.createObjectURL(new Blob([JSON.stringify(r.p,null,2)],{type:"application/json"}));
    a.download=bkName(full);document.body.appendChild(a);a.click();a.remove();
    if(full){bkMark();notify("✅ Backup ពេញលេញ៖ "+kn(r.n)+" ឯកសារ ពី "+kn(r.nc)+" ប្រភេទ"+(r.err.length?" · ⚠️ "+r.err.length+" ប្រភេទអានមិនបាន":""));if(r.err.length)console.warn("backup errors",r.err)}
    else notify("បានទាញយកឯកសារបម្រុងទុក (Backup) រួចរាល់!");
  });
  return pr.finally(function(){if(b&&b.tagName)b.disabled=false});
};
/* ☁️ Backup ទៅ Google Drive (Admin) · folder «Backup ប្រព័ន្ធគ្រូ» · ប្រើការភ្ជាប់ Drive ដូចលទ្ធផលតេស្ត (scope drive.file) */
var BKF="Backup ប្រព័ន្ធគ្រូ";
function bkFolder(again){
  var D=window.DRIVE,k="drvBk_"+who.id,f=null;try{f=localStorage.getItem(k)}catch(x){}
  if(f&&!again)return Promise.resolve(f);
  var q="name='"+BKF+"' and mimeType='application/vnd.google-apps.folder' and trashed=false";
  return D.api("https://www.googleapis.com/drive/v3/files?q="+encodeURIComponent(q)+"&fields=files(id)").then(function(r){
    if(r.files&&r.files.length)return r.files[0].id;
    return D.api("https://www.googleapis.com/drive/v3/files",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:BKF,mimeType:"application/vnd.google-apps.folder"})}).then(function(x){return x.id});
  }).then(function(id){try{localStorage.setItem(k,id)}catch(x){}return id});
}
function bkUpload(json,name,again){
  var D=window.DRIVE;
  return bkFolder(again).then(function(fid){
    var b="bk"+Date.now().toString(36),meta={name:name,mimeType:"application/json",parents:[fid]};
    var body="--"+b+"\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n"+JSON.stringify(meta)+"\r\n--"+b+"\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n"+json+"\r\n--"+b+"--";
    return D.api("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,size",{method:"POST",headers:{"Content-Type":"multipart/related; boundary="+b},body:body});
  }).catch(function(e){if(!again&&/40[34]/.test(String(e)))return bkUpload(json,name,true);throw e});   /* folder ត្រូវបានលុប → បង្កើតថ្មី */
}
if($("btnBackupD"))$("btnBackupD").onclick=function(){
  var b=this,D=window.DRIVE;if(!isAdm()||b.disabled)return;
  if(!D){alert("មុខងារ Google Drive មិនទាន់ផ្ទុករួច សូមព្យាយាមម្ដងទៀត");return}
  b.disabled=true;var t0=b.textContent;
  (D.tok()?Promise.resolve():D.connect(false)).then(function(){
    b.textContent="⏳ កំពុងទាញទិន្នន័យ...";return bkPayload(true);
  }).then(function(r){
    b.textContent="⏳ កំពុងផ្ញើទៅ Drive...";var json=JSON.stringify(r.p);
    return bkUpload(json,bkName(true)).then(function(x){
      bkMark();notify("✅ បានផ្ញើ Backup ទៅ Google Drive › «"+BKF+"» ("+kn(r.n)+" ឯកសារ · "+(json.length/1048576).toFixed(1)+" MB)"+(r.err.length?" · ⚠️ "+r.err.length+" ប្រភេទអានមិនបាន":""));
    });
  }).catch(function(e){
    console.error("drive backup",e);
    if(e==="nocid")alert("Admin មិនទាន់កំណត់ Google Client ID ទេ។\n\nAdmin៖ ⚙️ ការកំណត់ → 🏫 សាលា → «Google Drive Client ID»");
    else alert("មិនអាចផ្ញើ Backup ទៅ Google Drive បានទេ ("+(e&&e.message||e&&e.error||e)+")\n\nអ្នកនៅតែអាចប្រើ «💾 បម្រុងទុក (Backup)» ដើម្បីទាញយកឯកសារបាន។");
  }).finally(function(){b.disabled=false;b.textContent=t0});
};
/* រំលឹក Admin ពេលមិនបាន Backup ៧ ថ្ងៃ */
function bkRemind(){
  bkBtn();if(!isAdm())return;
  if(window.DRIVE)DRIVE.prep();
  var t=bkLast();if(!t||Date.now()-t>7*864e5)setTimeout(function(){notify("⏰ "+(t?"មិនបាន Backup "+kn(Math.floor((Date.now()-t)/864e5))+" ថ្ងៃហើយ":"មិនទាន់ធ្លាប់ Backup ពីកុំព្យូទ័រនេះ")+" — សូមចុច «☁️ Backup ទៅ Drive»")},6000);
}
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
        if(obj.obs)ob=normalizeObsData(obj.obs);
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

$("btnTheme").onclick=function(){
  var curTheme=document.documentElement.getAttribute("data-theme")||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");
  setTheme(curTheme==="dark"?"light":"dark");
};
/* ពណ៌ផ្ទៃ៖ "light" · "dark" · "" (តាមកុំព្យូទ័រ) · ចងចាំក្នុង browser */
function setTheme(v){
  if(v)document.documentElement.setAttribute("data-theme",v);else document.documentElement.removeAttribute("data-theme");
  try{localStorage.setItem("theme",v||"auto")}catch(x){}
}
(function(){try{var v=localStorage.getItem("theme");if(v==="light"||v==="dark")document.documentElement.setAttribute("data-theme",v)}catch(x){}})();
/* ចលនា (Logo វិល · តួអង្គ cartoon)៖ "on" = បើកជានិច្ច (លំនាំដើម) · "auto" = តាមការកំណត់ «Reduce Motion» របស់ឧបករណ៍ */
function applyMotion(){
  var m="on";try{m=localStorage.getItem("motion")||"on"}catch(x){}
  document.documentElement.classList.toggle("no-motion",m==="auto"&&matchMedia("(prefers-reduced-motion: reduce)").matches);
}
applyMotion();
var OK="teachers-v4-o",OC=[{"t": "ការរៀបចំ", "q": "តើគ្រូបង្រៀន...", "items": ["រៀបចំខ្លួនសមរម្យល្អកម្រិតណា (ឯកសណ្ឋាន)?", "មានសមា្ភរៈឧបទ្ទេសដើម្បីប្រើប្រាស់បានល្អកម្រិតណា (វីដេអូ សន្លឹកកិច្ចការ កិច្ចតែងការ...)?", "ប្រើប្រាស់គម្រូថ្នាក់រៀនត្រឡប់ (Flipped-Classroom) បានល្អកម្រិតណា?", "បានរៀបចំការអង្គុយរបស់សិស្ស ស្របតាមវិធីសាស្ត្របង្រៀនល្អកម្រិតណា?"], "max": 20}, {"t": "ការបង្រៀន", "q": "តើគ្រូបង្រៀន...", "items": ["បានប្រាប់សិស្សពីអ្វីដែលពួកគេនឹងរៀនក្នុងមេរៀននេះល្អកម្រិតណា (ប្រធានបទ វត្ថុបំណង...)?", "បានប្រើវិធីបង្រៀនបែបសតវត្សទី២១ មួយណា និងល្អកម្រិតណា?", "បានប្រើប្រភេទផ្សេងគ្នានៃសំណួរតាមកម្រិត ប្លូមតាក់សូណូមីកម្រិតណា? (ឧ. ចងចាំ, យល់ដឹង, អនុវត្ត វិភាគ វាយតម្លៃ បង្កើតថ្មី)", "បានលើកឧទាហរណ៍ និងពន្យល់បន្ថែមល្អកម្រិតណា?", "បានដឹកនាំសកម្មភាពបង្រៀនដោយលើកកម្ពស់ការគិតបែបស៊ីជម្រៅកម្រិតណា?", "បានផ្ដល់មតិយោបល់វិជ្ជមាន ដើម្បីជំរុញការរៀនសូត្រ និងទំនុកចិត្តដល់សិស្សសមរម្យកម្រិតណា?", "បានជួយសិស្សម្នាក់ៗមានឱកាសបញ្ចេញសមត្ថភាពរបស់ពួកគេ និងសកម្មកម្រិតណា?", "បានផ្តល់កិច្ចការបន្ថែមដល់សិស្សរៀនលឿនល្អកម្រិតណា?", "បានបញ្ចូលល្បែងសិក្សាជំនួយដល់ការបង្រៀនល្អកម្រិតណា?", "បានប្រើប្រាស់សម្ភារៈឧបទេសក្នុងការបង្រៀនល្អកម្រិតណា?", "បានពន្យល់ខ្លឹមសារមេរៀនប្រទាក់ក្រឡាគ្នាល្អកម្រិតណា?", "បានសម្រេចវត្ថុបំណងនៃមេរៀនល្អកម្រិតណា?", "បានដើរតាមជំហាននៃកិច្ចតែងការបង្រៀនមានប្រសិទ្ធភាពកម្រិតណា?"], "max": 65}, {"t": "ការគ្រប់គ្រងថ្នាក់រៀន", "q": "តើគ្រូបង្រៀន...", "items": ["បានចាប់ផ្តើម និងបញ្ចប់ការបង្រៀនទាន់ពេលវេលាល្អកម្រិតណា?", "បានប្រើពេលឱ្យសិស្សធ្វើកិច្ចការមានប្រសិទ្ធភាពកម្រិតណា?", "បានណែនាំសិស្សឱ្យធ្វើការងារច្បាស់លាស់ល្អកម្រិតណា?", "បានប្រើពេលវេលាបង្រៀនមានប្រសិទ្ធភាពល្អកម្រិតណា? (ខ្លឹមសារមេរៀន ត្រូវនឹងរយៈពេល)", "បានគ្រប់គ្រងសកម្មភាពសិស្សក្នុងថ្នាក់ល្អកម្រិតណា?"], "max": 25}, {"t": "ឥរិយាបថ", "q": "តើគ្រូបង្រៀន...", "items": ["បានប្រើប្រាស់សម្លេងក្នុងពេលបង្រៀនលឺ និងច្បាស់លាស់ល្អកម្រិតណា?", "បានប្រើប្រាស់ពាក្យសំដីទៅកាន់សិស្សសមរម្យកម្រិតណា?", "បានប្រើប្រាស់ទឹកមុខដាក់សិស្សមានភាពទាក់ទាញកម្រិតណា?", "បានទទួលយកគំនិតខុសប្លែកគ្នារបស់សិស្សល្អកម្រិតណា?", "បានបង្ហាញពីកាយវិការដាក់សិស្សសមរម្យកម្រិតណា?"], "max": 25}, {"t": "ការរៀន", "q": "តើសិស្ស...", "items": ["មានឱកាសក្នុងការបញ្ចេញមតិផ្ទាល់ខ្លួនដល់កម្រិតណា?", "ចាប់អារម្មណ៍ និងចូលរួមនៅក្នុងការងាររបស់ពួកគេសកម្មកម្រិតណា?", "បានប្រើធនធានផ្សេងៗបន្ថែមលើសសៀវភៅសិក្សាគោលបានច្រើនល្អកម្រិតណា?"], "max": 15}, {"t": "ឥរិយាបថ", "q": "តើសិស្ស...", "items": ["មានការគោរពគ្រូ ពេលចូល ឬចេញសមរម្យកម្រិតណា?", "បានប្រើពាក្យសំដីសមរម្យទៅគ្រូរបស់ពួកគេល្អកម្រិតណា?", "បានសម្តែងអាកប្បកិរិយាពេញចិត្តក្នុងម៉ោងសិក្សាកម្រិតណា?"], "max": 15}],OL=["ល្អប្រសើរ", "ល្អ", "មធ្យម", "ត្រូវកែលម្អ"],ob=loadO(),oc=0,ov=1,om=0;
function defO(){var ids=data.map(function(t){return t.id}),r=[];
  for(var i=0;i<36;i++){r.push({t:ids.length?ids[i%ids.length]:"",o:ids.length?ids[(i+1)%ids.length]:"",sub:"គណិតវិទ្យា",cl:"",tm:"",rm:"",n:"",ab:"",ch:"",ls:"",ct:"",dt:"",sc:new Array(33).fill(null),cm:new Array(33).fill(""),g:["","","","","",""]})}
  return{d:2,y:2026,th:[90,75,50],r:r}}
/* ធ្វើឱ្យទិន្នន័យសង្កេតមានរចនាសម្ព័ន្ធតែមួយ៖ ទទួល r ជា array ឬ object {"T005":[…]} (Backup ចាស់) ហើយធានា sc/cm/g ជា array ជានិច្ច */
function normObsRow(x,tid){
  x=(x&&typeof x==="object"&&!Array.isArray(x))?x:{};
  var r={};Object.keys(x).forEach(function(k){r[k]=x[k]});
  if(!Array.isArray(r.sc)){var s=[];if(r.sc&&typeof r.sc==="object")Object.keys(r.sc).forEach(function(k){if(+k>=0&&+k<33)s[+k]=r.sc[k]});r.sc=s}
  if(!Array.isArray(r.cm)){var c=[];if(r.cm&&typeof r.cm==="object")Object.keys(r.cm).forEach(function(k){if(+k>=0&&+k<33)c[+k]=r.cm[k]});r.cm=c}
  var g=Array.isArray(r.g)?r.g.slice():(r.g&&typeof r.g==="object"?Object.keys(r.g).reduce(function(a,k){a[+k]=r.g[k];return a},[]):[]);
  for(var i=0;i<6;i++)if(typeof g[i]!=="string")g[i]=g[i]==null?"":String(g[i]);
  r.g=g.slice(0,6);
  r.sc=r.sc.slice(0,33);r.cm=r.cm.slice(0,33);
  for(var q=0;q<33;q++){var v=r.sc[q];r.sc[q]=(v===null||v===undefined||v==="")?null:(isFinite(+v)&&+v>=0&&+v<=5?Math.round(+v):null);if(typeof r.cm[q]!=="string")r.cm[q]=r.cm[q]==null?"":String(r.cm[q])}
  if(typeof r.dt!=="string"||!/^\d{4}-\d{2}-\d{2}$/.test(r.dt))r.dt="";
  if(r.x){r.x=1;if(!r.k)r.k="x"+Date.now().toString(36)+Math.random().toString(36).slice(2,6)}
  ["t","o","sub","cl","tm","rm","n","ab","ch","ls","ct","dt"].forEach(function(k){if(r[k]==null)r[k]=(k==="sub"?"គណិតវិទ្យា":"")});
  if(!r.t&&tid)r.t=tid;
  return r}
function normalizeObsData(v){
  if(!v||typeof v!=="object")return defO();
  var rows=[];
  if(Array.isArray(v.r))rows=v.r.map(function(x){return normObsRow(x)});
  else if(v.r&&typeof v.r==="object"){
    Object.keys(v.r).forEach(function(k){var a=v.r[k];
      if(Array.isArray(a))a.forEach(function(x){rows.push(normObsRow(x,k))});
      else if(a&&typeof a==="object")rows.push(normObsRow(a,k))})}
  var d=defO();
  var base=rows.filter(function(r){return !r.x}),ext=rows.filter(function(r){return r.x});
  for(var i=base.length;i<36;i++)base.push(d.r[i]);
  ext.sort(function(a,b){return (a.dt||"").localeCompare(b.dt||"")||String(a.k).localeCompare(String(b.k))});
  rows=base.concat(ext);
  var th=Array.isArray(v.th)&&v.th.length>=3?v.th.slice(0,3).map(function(x,k){x=+x;return isFinite(x)&&x>=0&&x<=100?x:d.th[k]}):d.th;
  var dd=Math.round(+v.d),yy=Math.round(+v.y);
  return{d:(v.d!=null&&dd>=0&&dd<=4)?dd:d.d,y:(v.y!=null&&yy>=2000&&yy<=2100)?yy:d.y,th:th,r:rows}}
function loadO() {
  try {
    var s = sessionStorage.getItem(KEY_OBS);
    if (!s) { // Migration
      s = sessionStorage.getItem(OK);
      if (s) {
        sessionStorage.setItem(KEY_OBS, s);
        sessionStorage.removeItem(OK);
      }
    }
    if (s) return normalizeObsData(JSON.parse(s))
  } catch (e) { }
  return defO()
}
function saveO() { try { sessionStorage.setItem(KEY_OBS, JSON.stringify(ob)); push("obs"); } catch (e) { } }
function omn(i){var r=ob.r[i];if(r&&r.x){var d=odt(i);return d.getMonth()+1}return XM[Math.floor(i/4)]}
/* សិទ្ធិសង្កេតថ្នាក់៖ Admin · ប្រធាន · អនុប្រធាន មានសិទ្ធិស្មើគ្នា (បន្ថែម · កែ · កំណត់ពេល) */
function obsLead(){return canK()}
function obsEdit(r){return obsLead()||!!(who&&r&&who.id===r.o)}
/* 🔒 ឯកជនភាព៖ គ្រូធម្មតាឃើញតែទម្រង់ដែលខ្លួនជា «គ្រូត្រូវសង្កេត» (t) ឬ «អ្នកសង្កេត» (o) · Admin/ប្រធាន/អនុប្រធាន ឃើញទាំងអស់
   r.hid = ជួរទទេក្នុង memory ជំនួសជួរដែលមិនមានសិទ្ធិអាន (មិនដែលសរសេរទៅ Cloud) */
function obsVis(r){return !!r&&(obsLead()||(!r.hid&&!!who&&(r.t===who.id||r.o===who.id)))}
function obsVisIdx(){var a=[];ob.r.forEach(function(r,i){if(obsVis(r))a.push(i)});return a}
/* ផ្នែកទី១ ដែលគ្រូត្រូវសង្កេតកែបានដោយខ្លួនឯង (ត្រូវនឹង firestore.rules ៖ sub rm n ab ch ls ct) · ថ្នាក់/ម៉ោង/ថ្ងៃ/ពិន្ទុ/គ្រូ/អ្នកសង្កេត = បិទ */
var OBT=["sub","rm","n","ab","ch","ls","ct"];
function obsTF(r,f){return !!who&&!!r&&r.t===who.id&&OBT.indexOf(f)>=0}
/* 🔐 ការសរសេរទៅ Cloud របស់គ្រូធម្មតា (មិនមែន Admin/ប្រធាន/អនុប្រធាន)៖ ផ្ញើតែវាលដែលប្ដូរ និងមានសិទ្ធិ (ត្រូវនឹង firestore.rules) ដោយ updateDoc
   — មុននេះ setDoc ផ្ញើទាំងជួរ (មានវាលលំនាំដើមដែល normObsRow បន្ថែមលើជួរចាស់) → Rules បដិសេធ «គ្មានសិទ្ធិ» ទោះគ្រូមានសិទ្ធិកែ g ក៏ដោយ
   អ្នកសង្កេត (o)៖ sub cl tm rm n ab ch ls ct sc cm g · គ្រូត្រូវសង្កេត (t)៖ sub rm n ab ch ls ct g · គ្រូផ្សេង៖ គ្មាន (បញ្ជីទទេ) */
var OBO=["sub","cl","tm","rm","n","ab","ch","ls","ct","sc","cm","g"];
function obsAllowed(old,me){var a=[];if(old&&me){if(old.o===me)a=a.concat(OBO);if(old.t===me)a=a.concat(OBT.concat(["g"]))}return a}
function obsEmptyV(v){return v==null||v===""||(Array.isArray(v)&&v.every(function(x){return x==null||x===""}))}
function obsPatch(nw,old,me){var p={};obsAllowed(old,me).forEach(function(k){
  if(sj(nw[k])===sj(old[k]))return;
  if(old[k]===undefined&&obsEmptyV(nw[k]))return;   /* ជួរចាស់គ្មានវាលនេះ ហើយតម្លៃថ្មីជាលំនាំដើមទទេ → មិនផ្ញើ */
  p[k]=nw[k]});return p}
function wkday(iso){var p=String(iso||"").split("-");if(p.length!==3)return false;var w=new Date(+p[0],+p[1]-1,+p[2]).getDay();return w>=1&&w<=5}
function obsLbl(k){var r=ob.r[k];return r&&r.x?(function(){var d=odt(k);return kn(d.getDate())+" "+M[d.getMonth()]+" (បន្ថែម)"})():M[omn(k)-1]+" ស."+"១២៣៤"[k%4]}
function odt(i){var r=ob.r[i];if(r&&r.x&&!r.dt)return new Date();if(r.dt){var p=r.dt.split("-");return new Date(+p[0],+p[1]-1,+p[2])}var m=omn(i),y=ob.y+(m>=11?0:1),w=new Date(y,m-1,1).getDay()||7;return new Date(y,m-1,1+((ob.d+1-w)%7+7)%7+7*(i%4))}
function gs(i,g){var r=ob.r[i]; if(!r||!Array.isArray(r.sc)){r=ob.r[i]=normObsRow(r)} var s=0,n=0,k0=0;for(var a=0;a<g;a++)k0+=OC[a].items.length;OC[g].items.forEach(function(_,j){var v=r.sc[k0+j];if(v!=null&&v!==""){s+=+v;n++}});return n?s:""}
function gt(i){var s=0,n=0;OC.forEach(function(_,g){var v=gs(i,g);if(v!==""){s+=v;n++}});return n?s:""}
function lvl(p){return p>=ob.th[0]/100?OL[0]:p>=ob.th[1]/100?OL[1]:p>=ob.th[2]/100?OL[2]:OL[3]}
function tots(i){var T=gt(i);return T===""?"សរុប៖ —":"សរុប៖ <b>"+T+" / 165</b> ("+(T/165*100).toFixed(1)+"%) · <b>"+lvl(T/165)+"</b>"}
function oopt(sel){return(obsLead()?data:data.filter(function(t){return t.id===sel})).map(function(t){return"<option value='"+esc(t.id)+"'"+(t.id===sel?" selected":"")+">"+esc(t.name)+"</option>"}).join("")}
function renderO(){obsRAuto();[1,2,3].forEach(function(n){$("ov"+n).hidden=n!==ov});
[].forEach.call(document.querySelectorAll("#oseg button"),function(b){b.setAttribute("aria-selected",+b.dataset.ov===ov)});
$("od").innerHTML=DY.map(function(d,i){return"<option value="+i+(i===ob.d?" selected":"")+">"+d+"</option>"}).join("");
$("oy").value=ob.y;
$("om").innerHTML="<option value=-1"+(om===-1?" selected":"")+">ទាំងអស់</option>"+XM.slice(0,9).map(function(m,i){return"<option value="+i+(i===om?" selected":"")+">"+M[m-1]+"</option>"}).join("");
if(ov===1)renderO1();if(ov===2)renderO2();if(ov===3)renderO3()}
/* ស្ដារកំណត់ត្រាសង្កេតដែលបាត់ (ជួរទទេប៉ុណ្ណោះ) · រកគ្រូតាម id រួចតាមឈ្មោះ ក្នុងបញ្ជីគ្រូ។ auto = Admin ស្ដារឱ្យ ក្រោយទិន្នន័យ Server មកដល់ · មិនដូច្នោះទេ មានប៊ូតុង */
var OBS_RESTORES=[
 {i:0,id:"T005",nm:"ណែត",by:"T001",auto:1,row:{"g":["ដំណើរការបង្រៀន គោរពតាមជំហានកិច្ចតែងការបង្រៀន និងមានសកម្មភាពជាក់ស្ដែង\n-ដាក់លំហាត់សិស្សបានអនុវត្តច្រើន\n-ដាក់លំហាត់ឱ្យសិស្សពិភាក្សាជាដៃគូ\n-ឡើងបទ្ហាញនិងសម្របសម្រួលដោយគ្រូ\n-មានកិច្ចការផ្ទះ និងបណ្ដាំផ្ញើរបែបវិជ្ចមាន។","","-ប្រើប្រាស់សម្លេងបានល្អ \n-ស្លាយមានភាពទាក់ទាញ\n-សិស្សសកម្មចូលរួមធ្វើលំហាត់\n-ណែនាំកម្មវិធីល្អៗសម្រាប់ជំនួយដល់ការរៀន\n-មានការសម្របសម្រួលក្រោយសិស្សធ្វើបទបង្ហាញរួច\n-មានភ្ជាប់លំហាត់ហ្វឹកហាត់","","-តាមដានសិស្សបន្ថែម(ខ្លះមិនបានផ្ដោតលើអ្វីដែលគ្រូបាននិយាយ)\n-ទាញចំណាប់អារម្មណ៍សិស្សមានកម្រិត\n-ស្លាយបង្រៀនមានភាពទាក់ទាញតែអក្សរតូចបន្តិច\n-សិស្សប្រុសៗផ្នែកខាងក្រោយមិនសូវស្ដាប់និងជជែករឿងផ្សេង\n-សិស្សប្រើទូរស័ព្ទច្រើននាក់(ជាពិសេសសិស្សម្នាក់ជិតបង្អុចជាប់ទ្វា)\n-គួរកំណត់ពេលវេលាជាក់លាក់មួយដើម្បីឱ្យសិស្សមានបម្រុងប្រយ័ត្នខ្ពស់\n-ផ្ដល់ពត៍មានត្រឡប់ទៅសិស្សភ្លាមៗបានល្អប៉ុន្តែគួរប្រើពាក្យពេជ្របែបស្ថបនា ឬលើកទឹកចិត្តច្រើនកាន់តែល្អ\n-បន្ទាប់ពិភាក្សាចប់គួរណែនាំសិស្សឱ្យទូរស័ព្ទជាសវាងការប្រើខុសគោលដៅ","១. បន្ថែមកម្រិតការគ្រប់គ្រងថ្នាក់រៀន(តឹងរឹង បែបទន់ភ្លន់)\n២. លើកទឹកចិត្តសិស្សឱ្យច្រើនប្រសើរស្ដីបន្ទោស\n៣. យកចិត្តទុកដាក់លើសិស្សដែលមិនសូវយកទុកដាក់លើការរៀនសូន្រ និងវិន័យ។"],"dt":"2026-11-06","rm":"F-M2","ct":"៤.៤ ដាក់កន្សោមដឺក្រេទី៣ជាផលគុណកត្តា","sc":[5,4,4,3,4,4,4,4,3,3,3,4,4,3,3,4,4,4,3,3,4,3,4,3,4,3,4,4,3,4,4,4,4],"sub":"គណិតវិទ្យា","n":"35","tm":"ម៉ោង 3 (9:25 - 10:10)","ab":"0","ch":"១","cl":"M-10NGS-P2","ls":"១","cm":[]}},
 {i:1,id:"",nm:"ពន្លឺ",by:"T001",row:{"o":"T001","sub":"គណិតវិទ្យា","cl":"M-11NGS-C","tm":"ម៉ោង 5 (12:30 - 13:15)","rm":"F-M2","n":"28","ab":"0","ch":"១","ls":"២","ct":"ផលគុណស្មើចម្រាយពីតួចុង","dt":"2026-11-11","sc":[5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,4,4,4,4,5,4,4,4,5,4],"cm":["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""],"g":["ដំណើរការបង្រៀន\n- បានរៀបចំសណ្ដាប់ធ្នាប់ថ្នាក់រៀនបានល្អ\n-រំឭកមេរៀនចាស់ដោយប្រើប្រព័ន្ធតេស្ត\n-មានសម្មភាពច្រើនសិស្សសប្បាយរីករាយ\n-មានលំហាត់អនុវត្តន៍ និងពង្រឹងពុទ្ធិ\n-មានដាក់កិច្ចការផ្ទះឱ្យសិស្សព្រមទាំងសារអេប់ល្អៗ ។","","-បានត្រៀមមុនបង្រៀនបានល្អ\n-បានលែងល្បែងរំឭកមេរៀនចាស់\n-សិស្សយកចិត្តទុកដាក់លើការងារ\n-មានសន្លឹកកិច្ចការផ្ដល់ជូនសិស្ស\n-បង្កើតសកម្មភាពថ្នាក់រៀន\n-មានកំណត់ពេលវេលាច្បាស់លាស់ តាមសកម្មភាពនីមួយៗ\n-បានផ្តល់ការគាំទ្រសិស្សគ្រប់សកម្មភាព","","-គួរឱ្យសិស្សក្រោកឈរមុនគោរពកុំឱ្យមានភាពញ៉ែញ៉ែ\n-គួរណែនាំសិស្សឱ្យប្រើកម្មវិធីណាមួយដែលមានគុណភាព សម្រាប់ Scan រូបឱ្យបានច្បាស់",""]}}
];
function obsRTeacher(x){var z=function(v){return String(v||"").replace(/[\u200b\u200c\u200d]/g,"")};
  var t=x.id?data.filter(function(u){return u.id===x.id})[0]:null;if(t)return t;
  var m=data.filter(function(u){return z(u.name).indexOf(x.nm)>=0});return m.length===1?m[0]:null}
function obsRCan(x){var r=ob.r[x.i];return isAdm()&&!!obsRTeacher(x)&&!!r&&gt(x.i)===""}
function obsRList(){return OBS_RESTORES.filter(obsRCan)}
function obsRApply(x){var t=obsRTeacher(x);if(!t||!obsRCan(x))return false;
  var r=normObsRow(jcl(x.row),t.id);r.t=t.id;r.o=(data.filter(function(u){return u.id===x.by})[0]||{}).id||ob.r[x.i].o||"";
  ob.r[x.i]=r;saveO();return true}
function obsRSrv(){var n=sy.need&&sy.need.obs;return !!n&&!!sy.srv&&!!sy.srv.obs&&Object.keys(sy.srv.obs).length>=n}
function obsRAuto(){if(!obsRSrv())return false;var ch=false;obsRList().forEach(function(x){if(x.auto&&obsRApply(x))ch=true});return ch}
function renderO1(){obsRAuto();var rb=$("orst");if(rb){var L=obsRList();rb.hidden=!L.length;rb.innerHTML=L.map(function(x,k){return"<button type=button data-or='"+k+"'>♻️ ស្ដារកំណត់ត្រាសង្កេត "+esc(obsRTeacher(x).name)+"</button> "}).join("")}
var b="";
var xh=0,hm=-1;
ob.r.forEach(function(r,i){var mi=r.x?XM.indexOf(omn(i)):Math.floor(i/4);if(om!==-1&&mi!==om)return;if(!obsVis(r))return;var t=gt(i);
var isAdmin = obsLead();
var canEditObs = obsEdit(r);
if(r.x&&!xh){xh=1;b+="<tr class=tr><td colspan=9>ការសង្កេតបន្ថែម (ច័ន្ទ–សុក្រ)</td></tr>"}
b+=(!r.x&&mi!==hm?(hm=mi,"<tr class=tr><td colspan=9>"+M[omn(i)-1]+" "+(ob.y+(omn(i)>=11?0:1))+"</td></tr>"):"")+"<tr><td>"+(i+1)+"</td><td>"+(r.x?"ថ្ងៃ"+DY[(odt(i).getDay()+6)%7]:"សប្ដាហ៍ទី"+"១២៣៤"[i%4])+"</td><td><input type=date data-o='"+i+"|dt' value='"+iso(odt(i))+"' "+(isAdmin?"":"readonly")+"></td><td><select data-o='"+i+"|t' "+(isAdmin?"":"disabled")+">"+oopt(r.t)+"</select></td><td><select data-o='"+i+"|o' "+(canEditObs?"":"disabled")+">"+oopt(r.o)+"</select></td><td><select data-o='"+i+"|cl' "+(canEditObs?"":"disabled")+">"+sop(r.cl)+"</select></td><td><select data-o='"+i+"|tm' "+(canEditObs?"":"disabled")+">"+tmop(r.tm)+"</select></td><td>"+(t===""?"—":t+"/165 · <b>អ្វីជា…</b>")+"</td><td><button data-of='"+i+"'>បើកទម្រង់</button>"+(r.x&&obsLead()?" <button data-odel='"+i+"' title='លុបការសង្កេតបន្ថែមនេះ'>🗑</button>":"")+"</td></tr>"});
var ad=$("oadd");if(!ad){ad=document.createElement("div");ad.id="oadd";ad.style.margin="6px 0";$("ov1t").parentNode.insertBefore(ad,$("ov1t"))}
var adH=obsLead()?"<button type=button data-oadd=1>➕ បន្ថែមការសង្កេតថ្មី (ច័ន្ទ–សុក្រ)</button>":"";if(ad.innerHTML!==adH)ad.innerHTML=adH;
$("ov1t").innerHTML="<thead><tr><th>ល.រ</th><th>សប្ដាហ៍</th><th>កាលបរិច្ឆេទ</th><th>គ្រូត្រូវសង្កេត</th><th>អ្នកសង្កេត</th><th>ថ្នាក់</th><th>ម៉ោង</th><th>លទ្ធផល</th><th></th></tr></thead><tbody>"+b+"</tbody>"}
function renderO2(){var VI=obsVisIdx();if(!VI.length){$("oi").innerHTML="";$("of").innerHTML="<div class=card><p class=note>មិនមានទម្រង់សង្កេតដែលពាក់ព័ន្ធនឹងអ្នកទេ។</p></div>";return}
if(oc<0||oc>=ob.r.length||VI.indexOf(oc)<0)oc=VI[0];var i=oc,r=ob.r[i]=normObsRow(ob.r[i]);var h="";
$("oi").innerHTML=VI.map(function(k){var x=ob.r[k];return"<option value="+k+(k===i?" selected":"")+">"+(k+1)+". "+obsLbl(k)+" — "+esc(tn(x.t))+"</option>"}).join("");
var isAdmin = obsLead();
var canEditObs = obsEdit(r);

function F(l,x){return"<div><label>"+l+"</label>"+x+"</div>"}
function I(f,ty){return"<input "+(ty?"type="+ty+" ":"")+"data-f='"+f+"' value='"+esc(r[f])+"' "+((canEditObs||obsTF(r,f))?"":"readonly")+">"}
h+="<div class=card><h3>ផ្នែកទី១ ៖ សាវតាទូទៅ</h3><div class=fg>"+F("គ្រូត្រូវសង្កេត","<select data-f='t' "+(isAdmin?"":"disabled")+">"+oopt(r.t)+"</select>")+F("អ្នកសង្កេត","<select data-f='o' "+(isAdmin?"":"disabled")+">"+oopt(r.o)+"</select>")+F("មុខវិជ្ជា",I("sub"))+F("ថ្នាក់","<select data-f='cl' "+(canEditObs?"":"disabled")+">"+sop(r.cl)+"</select>")+F("កាលបរិច្ឆេទ","<input type=date data-f='dt' value='"+iso(odt(i))+"' "+(canEditObs?"":"readonly")+">")+F("ម៉ោង","<select data-f='tm' "+(canEditObs?"":"disabled")+">"+tmop(r.tm)+"</select>")+F("បន្ទប់",I("rm"))+F("សិស្សសរុប (នាក់)",I("n","number"))+F("អវត្តមាន (នាក់)",I("ab","number"))+F("ជំពូកទី",I("ch"))+F("មេរៀនទី",I("ls"))+F("ខ្លឹមសារ",I("ct"))+"</div></div>";
h+="<div class=card><h3>ផ្នែកទី២ ៖ លក្ខណៈវិនិច្ឆ័យការសង្កេត</h3><p class=note style='margin:0 0 8px'>០ = គ្មាន · ១ = មិនទាន់បានល្អ · ២–៤ = មធ្យម · ៥ = បានល្អប្រសើរ</p>";
var k0=0;
OC.forEach(function(g,gi){var s=gs(i,gi);h+="<details open><summary><b>"+(gi+1)+". "+esc(g.t)+"</b> <span class=sub id=gs"+gi+">"+(s===""?"—":s)+" / "+g.max+"</span></summary>";
g.items.forEach(function(q,j){var k=k0+j,v=r.sc[k];h+="<div class=it><div><b>"+(k+1)+".</b> "+esc(q)+"</div><div class=sc>"+[0,1,2,3,4,5].map(function(n){return"<button data-sc='"+k+"|"+n+"'"+(v===n?" class=on":"")+(canEditObs?"":" disabled")+">"+n+"</button>"}).join("")+"</div><input class=cm data-cm='"+k+"' placeholder='កំណត់ត្រា / យោបល់' value='"+esc(r.cm[k]||"")+"' "+(canEditObs?"":"readonly")+"></div>"});
k0+=g.items.length;h+="</details>"});
h+="<div class=tot id=otot>"+tots(i)+"</div></div>";
var GL=["ដំណើរការទូទៅនៃការបង្រៀន","១. ចំណុចល្អ — អ្នកសង្កេត","១. ចំណុចល្អ — គ្រូបង្រៀន","២. ចំណុចគួរអភិវឌ្ឍ — អ្នកសង្កេត","២. ចំណុចគួរអភិវឌ្ឍ — គ្រូបង្រៀន","៣. ផែនការកែលម្អសម្រាប់បង្រៀនពេលក្រោយ"];
h+="<div class=card><h3>ផ្នែកទី៣ ៖ កំណត់ហេតុនៃការសង្កេត</h3><div class=fg>"+GL.map(function(l,j){
  var fieldCanEdit = (canEditObs || (!!who && who.id === r.t));   /* គ្រូត្រូវសង្កេតកែបានទាំង ៦ ប្រអប់នៃផ្នែកទី៣ */
  return"<div"+(j===0||j===5?" class=full":"")+"><label>"+l+"</label><textarea rows=3 data-g='"+j+"' "+(fieldCanEdit?"":"readonly")+">"+esc(r.g[j])+"</textarea></div>"
}).join("")+"</div></div>";
$("of").innerHTML=h}
function upd(){OC.forEach(function(g,gi){var s=gs(oc,gi);$("gs"+gi).textContent=(s===""?"—":s)+" / "+g.max});$("otot").innerHTML=tots(oc)}
function renderO3(){var cols=[[],[],[],[],[],[],[]],c1=0,c2=0,c3=0,b="";
(obsLead()?data:data.filter(function(t){return !!who&&t.id===who.id})).forEach(function(t){var ix=[];ob.r.forEach(function(r,i){if(r.t===t.id)ix.push(i)});
var by=ob.r.filter(function(r){return r.o===t.id}).length,sc=ix.filter(function(i){return gt(i)>0}).length;c1+=ix.length;c2+=by;c3+=sc;
var av=OC.map(function(g,gi){var v=ix.map(function(i){return gs(i,gi)}).filter(function(x){return x!==""});return v.length?ss(v)/v.length:""});
var tv=ix.map(function(i){return gt(i)}).filter(function(x){return x!==""}),ta=tv.length?ss(tv)/tv.length:"";
av.push(ta);av.forEach(function(v,k){if(v!=="")cols[k].push(v)});
b+="<tr><td class=nm data-ot='"+esc(t.id)+"' style='cursor:pointer;text-decoration:underline' title='បើកទម្រង់សង្កេត'>"+esc(t.name)+"</td><td>"+ix.length+"</td><td>"+by+"</td><td>"+sc+"</td>"+av.map(function(v){return"<td>"+(v===""?"":v.toFixed(1))+"</td>"}).join("")+"<td>"+(ta===""?"":(ta/165*100).toFixed(1)+"% · <b>"+lvl(ta/165)+"</b>")+"</td></tr>"});
var tr=cols.map(function(a){return a.length?ss(a)/a.length:""});
if(obsLead())b+="<tr class=tr><td>សរុប / មធ្យម</td><td>"+c1+"</td><td>"+c2+"</td><td>"+c3+"</td>"+tr.map(function(v){return"<td>"+(v===""?"":v.toFixed(1))+"</td>"}).join("")+"<td>"+(tr[6]===""?"":(tr[6]/165*100).toFixed(1)+"%")+"</td></tr>";
$("o3t").innerHTML="<thead><tr><th>គ្រូបង្រៀន</th><th>ត្រូវសង្កេត (ដង)</th><th>បានសង្កេតគេ (ដង)</th><th>ដាក់ពិន្ទុរួច (ដង)</th>"+OC.map(function(g){return"<th>"+esc(g.t)+" (/"+g.max+")</th>"}).join("")+"<th>មធ្យមសរុប (/165)</th><th>ភាគរយ · និទ្ទេស</th></tr></thead><tbody>"+b+"</tbody>";
$("oth").innerHTML="<div class=bar>"+[0,1,2].map(function(k){return"<label>"+OL[k]+" ≥ (%)</label><input type=number data-th='"+k+"' value='"+ob.th[k]+"' style='flex:0 0 80px;width:80px' "+(isAdm()?"":"disabled")+">"}).join("")+"</div>"}
$("o3t").onclick=function(e){var td=e.target.closest("td[data-ot]");if(!td)return;var id=td.getAttribute("data-ot"),f=-1,a=-1;
  ob.r.forEach(function(r,i){if(r&&r.t===id){if(a<0)a=i;if(f<0&&gt(i)!=="")f=i}});
  if(f<0)f=a;if(f<0){alert("មិនមានកាលវិភាគសង្កេតសម្រាប់គ្រូនេះទេ");return}
  oc=f;ov=2;renderO()};
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
/* បោះពុម្ពទម្រង់សង្កេតថ្នាក់មួយ (A4 បញ្ឈរ) */
function obsPrintHTML(i){
  var r=ob.r[i]=normObsRow(ob.r[i]),I=inf(),d=odt(i),T=gt(i),k0=0,rows="";
  function cell(l,v){return"<td><span class=opl>"+l+"៖</span> <b>"+esc(v==null||v===""?"—":v)+"</b></td>"}
  OC.forEach(function(g,gi){
    var s=gs(i,gi);rows+="<tr class=og><td colspan=2>"+(gi+1)+". "+esc(g.t)+"</td><td>"+(s===""?"—":s)+" / "+g.max+"</td><td></td></tr>";
    g.items.forEach(function(q,j){var k=k0+j,v=r.sc[k];rows+="<tr><td>"+(k+1)+"</td><td class=oq>"+esc(q)+"</td><td><b>"+(v==null||v===""?"":v)+"</b></td><td class=oq>"+esc(r.cm[k]||"")+"</td></tr>"});
    k0+=g.items.length;
  });
  var GL=["ដំណើរការទូទៅនៃការបង្រៀន","១. ចំណុចល្អ — អ្នកសង្កេត","១. ចំណុចល្អ — គ្រូបង្រៀន","២. ចំណុចគួរអភិវឌ្ឍ — អ្នកសង្កេត","២. ចំណុចគួរអភិវឌ្ឍ — គ្រូបង្រៀន","៣. ផែនការកែលម្អសម្រាប់បង្រៀនពេលក្រោយ"];
  return"<div class='pg opr'><div class=hd><div class=moul>ព្រះរាជាណាចក្រកម្ពុជា</div><div class=moul style='font-size:11pt'>ជាតិ សាសនា ព្រះមហាក្សត្រ</div></div>"+
   "<div class=hl><div style='display:flex;align-items:center;gap:10px'><img src='"+LOGOBT()+"' class=logo style='border-radius:50%' alt=''><div><b>"+esc(I.school)+"</b><br>កម្មវិធីសាលារៀនជំនាន់ថ្មី</div></div><div style='text-align:right'>ឆ្នាំសិក្សា៖ <b>"+esc(I.year)+"</b></div></div>"+
   "<h2 class=moul style='text-align:center;font-size:14pt;margin:6px 0 10px'>ទម្រង់សង្កេតថ្នាក់រៀន</h2>"+
   "<h4>ផ្នែកទី១ ៖ សាវតាទូទៅ</h4><table class='ct opi'><tbody>"+
    "<tr>"+cell("គ្រូត្រូវសង្កេត",tn(r.t))+cell("អ្នកសង្កេត",tn(r.o))+cell("មុខវិជ្ជា",r.sub)+"</tr>"+
    "<tr>"+cell("ថ្នាក់",r.cl)+cell("កាលបរិច្ឆេទ","ថ្ងៃ"+DAYF[d.getDay()]+" "+kn(d.getDate())+" "+M[d.getMonth()]+" "+kn(d.getFullYear()))+cell("ម៉ោង",r.tm)+"</tr>"+
    "<tr>"+cell("បន្ទប់",r.rm)+cell("សិស្សសរុប (នាក់)",r.n)+cell("អវត្តមាន (នាក់)",r.ab)+"</tr>"+
    "<tr>"+cell("ជំពូកទី",r.ch)+cell("មេរៀនទី",r.ls)+cell("ខ្លឹមសារ",r.ct)+"</tr></tbody></table>"+
   "<h4>ផ្នែកទី២ ៖ លក្ខណៈវិនិច្ឆ័យការសង្កេត <span style='font-weight:400;font-size:9pt'>(០ = គ្មាន · ១ = មិនទាន់បានល្អ · ២–៤ = មធ្យម · ៥ = បានល្អប្រសើរ)</span></h4>"+
   "<table class='ct ops'><colgroup><col style='width:6%'><col style='width:52%'><col style='width:12%'><col style='width:30%'></colgroup><thead><tr><th>ល.រ</th><th>លក្ខណៈវិនិច្ឆ័យ</th><th>ពិន្ទុ (០–៥)</th><th>កំណត់ត្រា / យោបល់</th></tr></thead><tbody>"+rows+
   "<tr class=og><td colspan=2>សរុប</td><td>"+(T===""?"—":T)+" / 165</td><td>"+(T===""?"":(T/165*100).toFixed(1)+"% · និទ្ទេស៖ "+lvl(T/165))+"</td></tr></tbody></table>"+
   "<h4>ផ្នែកទី៣ ៖ កំណត់ហេតុនៃការសង្កេត</h4><table class='ct opn'><tbody>"+GL.map(function(l,j){return"<tr><th>"+l+"</th><td>"+esc(r.g[j]||"").replace(/\n/g,"<br>")+"</td></tr>"}).join("")+"</tbody></table>"+
   "<div class=sig><div>បានឃើញ និងឯកភាព<br><b>ជ.គណៈគ្រប់គ្រងសាលារៀនជំនាន់ថ្មី</b><br><br><br><br>&nbsp;</div><div>&nbsp;<br>គ្រូត្រូវសង្កេត<br><br><br><br><b>"+esc(tn(r.t))+"</b></div><div><span style='white-space:nowrap'>រាជធានីភ្នំពេញ ថ្ងៃទី "+kn(d.getDate())+" ខែ "+M[d.getMonth()]+" ឆ្នាំ"+kn(d.getFullYear())+"</span><br>អ្នកសង្កេត<br><br><br><br><b>"+esc(tn(r.o))+"</b></div></div></div>";
}
/* បោះពុម្ពតារាងសង្ខេបការសង្កេត (A4 ផ្ដេក) */
function obsSumHTML(){
  renderO3();var I=inf(),y=ob.y;
  return"<div class='pg opr osum'><div class=hd><div class=moul>ព្រះរាជាណាចក្រកម្ពុជា</div><div class=moul style='font-size:11pt'>ជាតិ សាសនា ព្រះមហាក្សត្រ</div></div>"+
   "<div class=hl><div style='display:flex;align-items:center;gap:10px'><img src='"+LOGOBT()+"' class=logo style='border-radius:50%' alt=''><div><b>"+esc(I.school)+"</b><br>កម្មវិធីសាលារៀនជំនាន់ថ្មី</div></div><div style='text-align:right'>ឆ្នាំសិក្សា៖ <b>"+esc(I.year)+"</b></div></div>"+
   "<h2 class=moul style='text-align:center;font-size:14pt;margin:6px 0 10px'>របាយការណ៍សង្ខេបការសង្កេតថ្នាក់រៀន</h2>"+
   "<table class='ct ost'>"+$("o3t").innerHTML+"</table>"+
   "<p style='font-size:9pt;margin:4px 0 0'>កម្រិតនិទ្ទេស (ភាគរយនៃ ១៦៥)៖ "+[0,1,2].map(function(k){return esc(OL[k])+" ≥ "+kn(ob.th[k])+"%"}).join(" · ")+" · "+esc(OL[3])+" ក្រោម "+kn(ob.th[2])+"%</p>"+
   wpFoot(who.id,who.name,"អ្នករៀបចំ")+"</div>";
}
$("o3pr").onclick=function(){var X=window.SCHX;X.fontsOk().then(function(){doPrint(obsSumHTML())})};
$("opr").onclick=function(){if(!obsVis(ob.r[oc]))return;var X=window.SCHX;X.fontsOk().then(function(){doPrint(obsPrintHTML(oc))})};
$("oi").onchange=function(){var k=+this.value;if(obsVis(ob.r[k]))oc=k;renderO2()};
$("opv").onclick=function(){var V=obsVisIdx();if(!V.length)return;var q=V.indexOf(oc);oc=V[(q<0?0:q-1+V.length)%V.length];renderO2()};
$("onx").onclick=function(){var V=obsVisIdx();if(!V.length)return;var q=V.indexOf(oc);oc=V[(q+1)%V.length];renderO2()};
$("ov1t").oninput=function(e){var p=e.target.dataset.o;if(!p)return;var a=p.split("|"),r=ob.r[+a[0]];
var isAdmin = obsLead()||(a[1]!=="dt"&&a[1]!=="t"&&obsEdit(r));
if(!isAdmin) { alert("លោកគ្រូមិនមានសិទ្ធិកែប្រែកាលវិភាគសង្កេតនេះទេ!"); renderO1(); return; }
if(a[1]==="dt"&&e.target.value&&!wkday(e.target.value)){alert("សូមជ្រើសថ្ងៃច័ន្ទ ដល់ថ្ងៃសុក្រ ប៉ុណ្ណោះ!");renderO1();return}
r[a[1]]=e.target.value;saveO();renderO1();};
if($("orst"))$("orst").onclick=function(e){var b=e.target.closest("button[data-or]");if(!b)return;var x=obsRList()[+b.dataset.or];if(x&&obsRApply(x)){oc=x.i;ov=2;renderO()}};
$("ov1t").onclick=function(e){var b=e.target.closest("button");if(b&&b.dataset.of!=null){oc=+b.dataset.of;ov=2;renderO()}
  if(b&&b.dataset.odel!=null&&obsLead()){var i=+b.dataset.odel,r=ob.r[i];if(!r||!r.x)return;if(gt(i)!==""&&!confirm("ការសង្កេតនេះមានពិន្ទុរួចហើយ។ លុបមែនទេ?"))return;
    ob.r.splice(i,1);if(oc>=ob.r.length)oc=0;saveO();renderO()}};
document.addEventListener("click",function(e){var b=e.target.closest&&e.target.closest("button[data-oadd]");if(!b||!obsLead())return;
  var d=new Date();while(d.getDay()===0||d.getDay()===6)d.setDate(d.getDate()+1);
  var r=normObsRow({x:1,t:"",o:who.id,dt:iso(d)});
  ob.r.push(r);ob.r.sort(function(a,b){if(!a.x||!b.x)return 0;return (a.dt||"").localeCompare(b.dt||"")});
  oc=ob.r.indexOf(r);saveO();ov=2;renderO()});
$("of").oninput=function(e){var t=e.target,r=ob.r[oc],d=t.dataset;
var isAdmin = obsLead();
var canEditObs = obsEdit(r);
if(d.f){
  if((d.f==="t"||d.f==="o")&&!isAdmin){alert("មានតែ Admin · ប្រធាន · អនុប្រធាន ទេដែលអាចប្ដូរគ្រូ ឬអ្នកសង្កេត!");renderO2();return}
  if(d.f==="dt"&&t.value&&!wkday(t.value)){alert("សូមជ្រើសថ្ងៃច័ន្ទ ដល់ថ្ងៃសុក្រ ប៉ុណ្ណោះ!");renderO2();return}
  var isTeacherNote = (d.f==="sub"||d.f==="rm"||d.f==="n"||d.f==="ab"||d.f==="ch"||d.f==="ls"||d.f==="ct");
  if(!canEditObs && !(isTeacherNote && who.id === r.t)) { alert("អ្នកមិនមានសិទ្ធិកែប្រែទិន្នន័យនេះទេ!"); renderO2(); return; }
  r[d.f]=t.value;saveO();if(t.tagName==="SELECT"||t.type==="date")renderO2();return;
}
if(d.cm!=null){
  if(!canEditObs) { alert("មានតែអ្នកសង្កេតការណ៍ ឬ Admin ទេដែលអាចកែប្រែកំណត់ត្រាយោបល់!"); renderO2(); return; }
  r.cm[+d.cm]=t.value;
}else if(d.g!=null){
  if(!canEditObs && !(who && who.id === r.t)) { alert("អ្នកមិនមានសិទ្ធិកែប្រែចំណាំនេះទេ!"); renderO2(); return; }
  r.g[+d.g]=t.value;
}
saveO();};

$("of").onclick=function(e){
  var b=e.target.closest("button");if(!b||!b.dataset.sc)return;
  var r=ob.r[oc];
  var isAdmin = obsLead();
  var canEditObs = obsEdit(r);
  if(!canEditObs) { alert("មានតែអ្នកសង្កេតការណ៍ ឬ Admin · ប្រធាន · អនុប្រធាន ទេដែលអាចដាក់ពិន្ទុសង្កេតថ្នាក់បាន!"); return; }
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
function orid(r,i){return r&&r.x&&r.k?r.k:rid(i)}
function encO(id,v){return{o:id,j:JSON.stringify(v)}}   /* JSON ជា string ដើម្បីជៀស nested array ដែល Firestore មិនអនុញ្ញាត */
function decO(d){try{return JSON.parse(d.j)}catch(e){return null}}
function safeId(u){return String(u).replace(/[\/\s]/g,"_").slice(0,120)}
function pick(c,pre){var o={};Object.keys(c).forEach(function(p){if(p.indexOf(pre)===0)o[p.slice(pre.length)]=c[p]});return o}

var MAP={
  teachers:{
    docs:function(){return{"app/teachers":{v:jcl(data)}}},
    load:function(c){var x=c["app/teachers"];if(x&&Array.isArray(x.v)){sy.tLen=x.v.length;sy.tDel=0;if(x.v.length)data=normNames(x.v)}}
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
    docs:function(){var o={"cfg/obs":{d:ob.d,y:ob.y,th:jcl(ob.th)}};ob.r.forEach(function(r,i){if(r.hid)return;o["obsrows/"+orid(r,i)]=jcl(r)});return o},
    load:function(c){var cf=c["cfg/obs"]||{},bs=ob.r.filter(function(x){return !x.x}),r=bs.map(function(x,i){var d=c["obsrows/"+rid(i)];return d?jcl(d):(obsLead()?x:{hid:1})});
      var ob0=ob.r.filter(function(x){return x.x}),pk=pick(c,"obsrows/");
      Object.keys(pk).forEach(function(k){if(!/^r\d\d$/.test(k)&&pk[k]&&pk[k].x)r.push(jcl(pk[k]))});
      ob0.forEach(function(x){if(!pk[x.k]&&sy.dirty&&sy.dirty.obs)r.push(x)});
      ob=normalizeObsData({d:cf.d!=null?cf.d:ob.d,y:cf.y!=null?cf.y:ob.y,th:cf.th?jcl(cf.th):ob.th,r:r})}
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
  obs:function(v){if(v&&v.r&&typeof v.r==="object"){ob=normalizeObsData(v);return true}},
  wr:function(v){if(v&&v.r&&typeof v.r==="object"){wr=v;return true}},
  ah:function(v){if(v&&v.r&&typeof v.r==="object"){ah=v;return true}},
  lib:function(v){if(v&&Array.isArray(v.i)){lib=v;return true}}
};

function subsFor(k){
  return({teachers:[{doc:"app/teachers"}],tasks:[{col:"tasks"}],rs:[{col:"rs"},{doc:"cfg/rs"}],ex:[{col:"exrows"},{doc:"cfg/ex"}],
    obs:(obsLead()?[{col:"obsrows"},{doc:"cfg/obs"}]:[{col:"obsrows",w:"t"},{col:"obsrows",w:"o"},{doc:"cfg/obs"}]),wr:[{col:"wr",own:1}],ah:[{col:"ah",own:1}],lib:[{col:"lib"}],sched:[{col:"sched"}],ts:[{col:"ts",own:1}],sig:[{col:"sig",own:1}],cx:[{col:"cx",own:1}],
    mc:who&&who.role==="monitor"?[{doc:"mc/"+who.mk}]:[{col:"mc",own:1}]})[k];
}
function canWrite(p,d,isNew){
  if(isAdm())return true;
  var m=p.split("/"),c=m[0],id=m[1],me=who.id;
  if(c==="tasks")return canK();   /* ប្រធាន/អនុប្រធាន៖ គ្រប់គ្រូ · សមាជិក៖ មើលតែប៉ុណ្ណោះ */
  if(c==="rs"||c==="wr"||c==="ah")return id===me;
  if(c==="sched"||c==="sig")return id===me;
  if(c==="mc")return who.role==="monitor"?id===who.mk:String(id).split("_")[0]===me;
  if(who.role==="monitor")return false;
  if(c==="ts"||c==="cx")return String(id).split("_")[0]===me;
  if(c==="lib")return !!d&&d.o===me;
  if(c==="exrows")return !isNew&&!!d&&d.t===me;
  if(c==="obsrows")return canK()||(!isNew&&!!d&&(d.o===me||d.t===me));
  return false;
}
function canDel(p,old){
  if(isAdm())return true;
  if(p.indexOf("obsrows/")===0)return canK();
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
  /* ការពារ៖ កុំសរសេរមុនពេលទទួលទិន្នន័យពី Cloud ជាលើកដំបូង (Internet យឺត) — បើមិនដូច្នេះ ទិន្នន័យទទេក្នុង memory អាចជាន់ទិន្នន័យពិតក្នុង Cloud */
  if(!sy.first[k]){(sy.early||(sy.early={}))[k]=1;delete sy.dirty[k];console.warn("write before first load blocked:",k);return}
  /* ទិន្នន័យបង្ហាញពី cache ក្នុងឧបករណ៍ តែមិនទាន់ផ្ទៀងផ្ទាត់ពី Server → ពន្យារការសរសេរ (អតិបរមា ២០ វិនាទី) កុំឱ្យទិន្នន័យចាស់ជាន់ទិន្នន័យថ្មីក្នុង Cloud */
  if(!srvOk(k)&&Date.now()-(sy.t0||0)<20000){sy.t[k]=setTimeout(function(){flush(k)},1000);return}
  sy.busy[k]=1;delete sy.dirty[k];
  var ok=true;
  /* ការពារ៖ មិនសរសេរបញ្ជីគ្រូដែលខ្លីជាងក្នុង Cloud (លើកលែងលុបគ្រូដោយចេតនា) */
  if(k==="teachers"){
    var nT=data.length;
    if(!sy.teachersReady||(sy.tLen&&nT<sy.tLen-(sy.tDel||0))){
      sy.busy[k]=0;console.warn("teachers write blocked",nT,sy.tLen,sy.tDel);
      if(sy.teachersReady)notify("⚠️ បានបដិសេធការរក្សាទុកបញ្ជីគ្រូ ("+nT+" នាក់ តិចជាង "+sy.tLen+" ក្នុង Cloud) — ដើម្បីការពារទិន្នន័យ");
      return;
    }
  }
  try{
    var docs=MAP[k].docs(),syn=sy.synced[k]||(sy.synced[k]={}),cache=sy.cache[k]||{},ops=[];
    Object.keys(docs).forEach(function(p){
      var j=sj(docs[p]);if(syn[p]===j)return;                 /* មិនមានការប្ដូរ */
      if(!canWrite(p,docs[p],!(p in syn)))return;               /* មិនមែនរបស់ខ្លួន → រំលង */
      if(k==="tasks"){var tid=p.split("/")[1];
        if(tid!==who.id&&!(sy.touch&&sy.touch[tid]))return;      /* Admin៖ កុំសរសេរកិច្ចតែងការគ្រូផ្សេង ដែលមិនបានកែ (ការពារការជាន់) */
        if(syn[p]&&tSum(cache[p])>0&&tSum(docs[p])===0&&!(sy.touch&&sy.touch[tid])){console.warn("tasks wipe blocked",p);return}
      }
      ops.push({p:p,j:j,d:docs[p]});
    });
    Object.keys(syn).forEach(function(p){if(!(p in docs)&&canDel(p,cache[p]))ops.push({p:p,del:1})});
    for(var n=0;n<ops.length;n++){
      var op=ops[n];
      try{
        var ref=window.FB.doc.apply(null,[window.db].concat(op.p.split("/")));
        if(op.del){await window.FB.deleteDoc(ref);delete syn[op.p]}
        else if(op.p.indexOf("obsrows/")===0&&!canK()&&cache[op.p]&&who){
          var pt=obsPatch(op.d,cache[op.p],who.id);
          if(Object.keys(pt).length)await window.FB.updateDoc(ref,pt);
          syn[op.p]=op.j}
        else{await window.FB.setDoc(ref,op.d);syn[op.p]=op.j}
      }catch(e){
        ok=false;console.error("Sync error:",op.p,e);
        if(e&&e.code==="permission-denied")notify("គ្មានសិទ្ធិរក្សាទុកទៅ Cloud ("+op.p+")");
        else if(!sy.wN||Date.now()-sy.wN>8000){sy.wN=Date.now();notify("⚠️ រក្សាទុកទៅ Cloud មិនបាន ("+((e&&(e.code||e.message))||"error")+") — ចុច «រក្សាទុក» ម្ដងទៀត")}
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

/* ប្រអប់ថ្ងៃ/ម៉ោងកំពុងប្រើ (ផ្ទាំងប្រតិទិនបើក · ម៉ោងវាយបានពាក់កណ្ដាល = តម្លៃមិនទាន់មាន) → ការគូរឡើងវិញនឹងបិទ/លុបវា
   ដូច្នេះពន្យារ refreshView រហូតដល់ចេញពីប្រអប់នោះ */
var rvWait=false;
function pickerBusy(){var a=document.activeElement;return!!(a&&a.tagName==="INPUT"&&/^(date|time|month|week|datetime-local)$/.test(a.type))}
document.addEventListener("focusout",function(e){
  if(!rvWait||!e.target||e.target.tagName!=="INPUT")return;
  setTimeout(function(){if(rvWait&&!pickerBusy()){rvWait=false;refreshView()}},250);
},true);
function refreshView(){
  if($("appSection").hidden)return;
  if(pickerBusy()){rvWait=true;return}
  var c=["p0","p1","p2","p4","p5","p6","p7","p8","p9","p10","p11","p12","p13","p14","p15","p16","p17","p18","p19","p20","p21"].filter(function(x){return !$(x).hidden})[0]||"p0";
  keepFocus(function(){show(c)});
}
/* គូរទំព័រឡើងវិញ ដោយរក្សាប្រអប់ដែលកំពុងសរសេរ (focus · cursor · អក្សរដែលទើបវាយ) */
function keepFocus(fn){
  var a=document.activeElement,sel=null,val,ss,se,y=window.scrollY;
  if(a&&/INPUT|TEXTAREA|SELECT/.test(a.tagName)){
    var q=[].filter.call(a.attributes,function(x){return x.name==="id"||x.name.indexOf("data-")===0}).map(function(x){return"["+x.name+"='"+String(x.value).replace(/'/g,"\\'")+"']"}).join("");
    if(q){sel=a.tagName+q;val=a.value;try{ss=a.selectionStart;se=a.selectionEnd}catch(e){}}
  }
  fn();
  if(!sel)return;
  var b;try{b=document.querySelector(sel)}catch(e){}
  if(!b||b===a)return;
  if(b.tagName!=="SELECT"&&b.value!==val&&!b.readOnly){b.value=val;b.dispatchEvent(new Event("input",{bubbles:true}))}
  b.focus({preventScroll:true});
  try{if(ss!=null)b.setSelectionRange(ss,se)}catch(e){}
  window.scrollTo(0,y);
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
  sy.teachersReady=true;syncKLead();
  updateUserInfo();render();
  if(sy.first.obs)trySeed("obs");
  if(sy.subd&&sy.subd.obs&&sy.obsMode&&sy.obsMode!==(obsLead()?"all":"own")){   /* តួនាទីទើបដឹង (ប្រធាន/អនុប្រធាន) → subscribe ឡើងវិញ ដើម្បីអានគ្រប់ជួរ */
    ((sy.unK&&sy.unK.obs)||[]).forEach(function(f){try{f()}catch(e){}});subscribe("obs")}
}
function migrateRs(){   /* លំនាំដើមថ្នាក់ទី ១១ ត្រូវជា ១២៥ (ម្ដងគត់) */
  if(rs&&!rs.mig1){if(rs.mx&&rs.mx[11]===100)rs.mx[11]=125;rs.mig1=1;savR()}
}
function trySeed(k){      /* មានតែ Admin ទេដែលបង្កើត document ដំបូង */
  if(!isAdm()||sy.seeded[k])return;
  if(k==="tasks"||k==="rs"||k==="wr"||k==="ah"||k==="sched"){sy.seeded[k]=1;return}   /* ទិន្នន័យរបស់គ្រូ៖ កុំសរសេរពីកុំព្យូទ័រ Admin ពេលចាប់ផ្ដើម */
  if(k==="obs"&&!sy.teachersReady)return;
  sy.seeded[k]=1;
  if(k==="obs"&&!Object.keys(sy.cache.obs||{}).length&&!sy.legacy.obs)ob=defO();
  push(k);
}
function tSum(d){var v=d&&d.j?decO(d):d,s=0;if(v&&v.w)Object.keys(v.w).forEach(function(m){(v.w[m]||[]).forEach(function(r){(r||[]).forEach(function(x){s+=+x||0})})});return s}
function sameAsSynced(k){   /* Cloud បញ្ជូនមកវិញនូវអ្វីដែលយើងទើបរក្សាទុក → គ្មានអ្វីថ្មី */
  var cache=sy.cache[k]||{},syn=sy.synced[k],ks=Object.keys(cache);
  if(!sy.first[k]||!syn||ks.length!==Object.keys(syn).length)return false;
  return ks.every(function(p){return syn[p]===sj(cache[p])});
}
function applyCloud(k){
  var cache=sy.cache[k]||{},has=Object.keys(cache).length>0;
  if(sameAsSynced(k)){snapSave(k);return}   /* កុំគូរទំព័រឡើងវិញ (មិនឱ្យបាត់ cursor ពេលកំពុងសរសេរ) */
  if(has){
    MAP[k].load(cache);
    var s={};Object.keys(cache).forEach(function(p){s[p]=sj(cache[p])});sy.synced[k]=s;
  }else if(!sy.synced[k])sy.synced[k]={};
  sy.first[k]=1;firstDone(k);if($("syncBar"))syncDiag();
  if(k==="teachers")afterTeachers();
  if(k==="rs"&&isAdm())migrateRs();
  trySeed(k);
  snapSave(k);
  refreshSoon();
}
/* ⚡ ទិន្នន័យហូរចូលជាបន្តបន្ទាប់ពេលចាប់ផ្ដើម → គូរទំព័រម្ដងក្នុងមួយ frame (មិនមែន ១៣ ដង) */
var rvT=0;
function refreshSoon(){if(rvT)return;rvT=setTimeout(function(){rvT=0;refreshView()},16)}
function onData(k){
  if(Object.keys(sy.got[k]).length<sy.need[k])return;   /* រង់ចាំរហូតទាំងអស់បានមកដល់ */
  if(!sy.first[k]){   /* លើកដំបូង៖ យកទិន្នន័យ Cloud ជានិច្ច (ការកែមុនផ្ទុករួច មិនត្រូវបានសរសេរ) */
    var early=sy.early&&sy.early[k];if(early)delete sy.early[k];
    try{applyCloud(k)}finally{if(early)notify("⏳ ទិន្នន័យទើបផ្ទុកពី Cloud រួច — ការកែដែលធ្វើមុនពេលផ្ទុករួច មិនត្រូវបានរក្សាទុកទេ សូមពិនិត្យ ហើយធ្វើម្ដងទៀត")}
    return;
  }
  if(sy.dirty[k]||sy.busy[k]){sy.pending[k]=1;return}   /* កុំជាន់ការកែដែលមិនទាន់រក្សាទុក */
  applyCloud(k);
}
function subscribe(k){
  sy.subd[k]=1;var subs=subsFor(k);
  (sy.unK||(sy.unK={}))[k]=[];sy.qd=sy.qd||{};Object.keys(sy.qd).forEach(function(e){if(e.indexOf(k+"|")===0)delete sy.qd[e]});
  if(k==="obs")sy.obsMode=obsLead()?"all":"own";   /* គ្រូធម្មតា៖ query តាម t និង o របស់ខ្លួនតែប៉ុណ្ណោះ (ត្រូវនឹង rules) */
  sy.need[k]=subs.length;sy.got[k]={};sy.cache[k]={};
  subs.forEach(function(s,si){
    var ref;
    if(s.doc)ref=window.FB.doc.apply(null,[window.db].concat(s.doc.split("/")));
    else if(s.w)ref=window.FB.query(window.FB.collection(window.db,s.col),window.FB.where(s.w,"==",who.id));
    else if(s.own&&!isAdm())ref=window.FB.query(window.FB.collection(window.db,s.col),window.FB.where("o","==",who.id));
    else ref=window.FB.collection(window.db,s.col);
    var un=window.FB.onSnapshot(ref,{includeMetadataChanges:true},function(sn){
      /* លើកដំបូង៖ កុំទទួល snapshot «ទទេ» ពី cache (ពេល offline/យឺត) — រង់ចាំ Server · snapshot ពី cache ដែលមានទិន្នន័យ ទទួលបាន */
      var emp=s.doc?!sn.exists():sn.empty!==false&&!sn.size,eid=k+"|"+si,fc=!!(sn.metadata&&sn.metadata.fromCache);
      if(!fc&&!!sy.E[eid]!==emp)seSet(eid,emp);   /* ចងចាំថា Server ឆ្លើយ «ទទេ» (ឧ. Timesheet របស់គ្រូថ្មី) */
      if(!sy.first[k]&&fc&&emp&&!sy.E[eid])return;   /* ទទេពី cache តែ Server មិនធ្លាប់ថាទទេ → រង់ចាំ Server */
      (sy.ok||(sy.ok={}))[k]=1;
      var cache=sy.cache[k];
      if(s.doc){if(sn.exists())cache[s.doc]=sn.data();else delete cache[s.doc]}
      else if(s.w){   /* query ច្រើនលើ collection តែមួយ៖ ផ្ទុកក្នុង sy.qd ដាច់ដោយឡែក រួចបូករួមចូល cache (ជួរដែល t=o=ខ្លួន មកពីទាំងពីរ) */
        var qd=sy.qd[eid]={};sn.forEach(function(d){qd[s.col+"/"+d.id]=d.data()});
        Object.keys(cache).forEach(function(p){if(p.indexOf(s.col+"/")===0)delete cache[p]});
        Object.keys(sy.qd).forEach(function(e){if(e.indexOf(k+"|")===0)Object.keys(sy.qd[e]).forEach(function(p){cache[p]=sy.qd[e][p]})});
      }else{
        Object.keys(cache).forEach(function(p){if(p.indexOf(s.col+"/")===0)delete cache[p]});
        sn.forEach(function(d){cache[s.col+"/"+d.id]=d.data()});
      }
      if(!(sn.metadata&&sn.metadata.fromCache))((sy.srv[k]||(sy.srv[k]={}))[si]=1);   /* ទទួលពី Server ពិត (មិនមែន cache) */
      sy.got[k][si]=1;onData(k);
    },function(err){
      console.error("Sync error:",k,err);(sy.err||(sy.err={}))[k]=(err&&(err.code||err.message))||"error";if(sy.diagOn)syncDiag();
      if(err&&err.code==="permission-denied")notify("គ្មានសិទ្ធិអានទិន្នន័យពី Cloud ("+k+") — សូមទាក់ទងអ្នកគ្រប់គ្រង");
    });
    unsubs.push(un);sy.unK[k].push(un);
  });
}
function srvOk(k){return Object.keys((sy.srv||{})[k]||{}).length>=(sy.need[k]||1)}
function stopSync(){unsubs.forEach(function(f){try{f()}catch(e){}});unsubs=[];sy.started=false}
/* ⚡ ចាប់ផ្ដើម Sync (Stale-While-Revalidate + ២ ដំណាក់កាល)
   ០) Session មិន «ចងចាំខ្ញុំ» (គ្មាន cache Firestore ក្នុងឧបករណ៍)៖ បង្ហាញ snapshot ចុងក្រោយពី sessionStorage ភ្លាម (snapLoad)
   ១) ទិន្នន័យចាំបាច់សម្រាប់ Dashboard (CRIT) មុនគេ · រង់ចាំ Promise.allSettled + Timeout ៣ វិនាទី
   ២) ផ្នែកធំៗផ្សេងទៀត + រូបថតប្រវត្តិរូប នៅពីក្រោយ (ឬភ្លាមពេលគ្រូបើកផ្ទាំងផ្សេង · show())
   ការសរសេរនៅតែការពារដោយ flush(): មុនទិន្នន័យលើកដំបូង = បដិសេធ · មិនទាន់បញ្ជាក់ពី Server = ពន្យារ ≤ ២០ វិនាទី */
var CRIT=["teachers","tasks","rs","sched","sig","mc"],CRIT_MS=3000;
function critKeys(){return who&&who.role==="monitor"?["mc"]:CRIT.filter(function(k){return MAP[k]})}
function firstDone(k){var w=sy.wait&&sy.wait[k];if(w){delete sy.wait[k];w()}}
function startSync(){
  stopSync();try{bkRemind()}catch(e){console.error(e)}
  sy.cache={};sy.got={};sy.first={};sy.synced={};sy.seeded={};sy.touch={};sy.ok={};sy.err={};sy.srv={};sy.t0=Date.now();
  sy.E=seGet();sy.wait={};sy.ph2=false;sy.started=true;sy.subd={};
  var crit=critKeys();
  var waits=crit.map(function(k){return new Promise(function(ok){sy.wait[k]=ok})});
  snapLoad();
  crit.forEach(subscribe);
  Promise.race([Promise.allSettled(waits),new Promise(function(ok){setTimeout(ok,CRIT_MS)})]).then(phase2);
  diagArm();
}
function phase2(){
  if(sy.ph2||!sy.started)return;sy.ph2=true;
  Object.keys(MAP).forEach(function(k){if(!sy.subd[k])subscribe(k)});
  subProfiles();
}
/* 💾 snapshot ក្នុង sessionStorage (តែ Session មិនចងចាំ · លុបពេលបិទ Tab) · ចងចាំខ្ញុំ = Firestore IndexedDB cache រួចហើយ */
function snapK(k){return"syS_"+(prof&&prof.uid||"")+"_"+k}
var snapT={};
function snapSave(k){
  if(window.FBPERSIST||!srvOk(k))return;
  clearTimeout(snapT[k]);snapT[k]=setTimeout(function(){
    try{var j=JSON.stringify(sy.cache[k]||{}),tot=j.length;
      Object.keys(MAP).forEach(function(x){if(x!==k){var v=sessionStorage.getItem(snapK(x));if(v)tot+=v.length}});
      /* 🧹 snapshot សរុប ≤ ~2.5 MB (sessionStorage ក៏ផ្ទុក Login របស់ Firebase) · ធំពេក → មិនរក្សា key នេះ */
      if(j.length>1500000||tot>1300000)sessionStorage.removeItem(snapK(k));else if(!(window.LSG?LSG.set(sessionStorage,snapK(k),j):(sessionStorage.setItem(snapK(k),j),1)))sessionStorage.removeItem(snapK(k))}catch(e){try{sessionStorage.removeItem(snapK(k))}catch(x){}}
  },800);
}
function snapLoad(){
  if(window.FBPERSIST)return;
  var any=false;
  Object.keys(MAP).forEach(function(k){
    var c=null;try{c=JSON.parse(sessionStorage.getItem(snapK(k))||"null")}catch(e){}
    if(!c||typeof c!=="object")return;
    try{MAP[k].load(c)}catch(e){console.warn("snap:",k,e);return}
    var s={};Object.keys(c).forEach(function(p){s[p]=sj(c[p])});sy.synced[k]=s;
    sy.first[k]=1;firstDone(k);any=true;
    if(k==="teachers")afterTeachers();
  });
  if(any)refreshSoon();
}
function seKey(){return"syE_"+(prof&&prof.uid||"")}
function seGet(){try{return JSON.parse(localStorage.getItem(seKey())||"{}")||{}}catch(e){return{}}}
function seSet(id,emp){if(emp)sy.E[id]=1;else delete sy.E[id];try{localStorage.setItem(seKey(),JSON.stringify(sy.E))}catch(e){}}
function diagArm(){var b=$("syncBar");if(b)b.remove();sy.diagOn=false;sy.diagLog=false;sy.diagD=Date.now();clearTimeout(sy.diagT);clearTimeout(sy.diagT2);
  sy.diagT=setTimeout(function(){sy.diagOn=true;syncDiag()},1500);   /* សញ្ញា Sync តូចនៅជ្រុង (មិនរាំងស្ទះ) */sy.diagT2=setTimeout(syncDiag,30500)}
/* 📶 ទូរស័ព្ទ៖ ត្រឡប់មកទំព័រវិញ / អ៊ីនធឺណិតមកវិញ → តភ្ជាប់ Firestore ឡើងវិញភ្លាម (កុំរង់ចាំ backoff រហូតដល់ ១ នាទី) */
/* ⚡ Quota៖ ការផ្ដាច់/ភ្ជាប់ឡើងវិញ ធ្វើឱ្យ Listener ទាំងអស់ចុះឈ្មោះម្ដងទៀត (អាន) → ម្ដងយ៉ាងច្រើនក្នុង ២ នាទី · លាក់ទំព័រ ≥ ៣០ វិនាទី · SDK តភ្ជាប់ឡើងវិញដោយខ្លួនឯងស្រាប់ */
var hidAt=0,kickAt=0,KICK_GAP=120000,HIDE_MIN=30000;
function kick(why){
  if(!who||!window.db||!window.FB||!window.FB.disableNetwork||sy.kicking)return;
  if(!navigator.onLine){notify("⚠️ កំពុងដាច់ការតភ្ជាប់!"); return;}
  if(Date.now()-kickAt<KICK_GAP){console.info("reconnect skipped (cooldown):",why);return}
  kickAt=Date.now();sy.kicking=1;console.info("reconnect:",why);
  window.FB.disableNetwork(window.db).catch(function(){}).then(function(){return window.FB.enableNetwork(window.db)}).catch(function(e){console.error("reconnect:",e); notify("មិនអាចតភ្ជាប់ឡើងវិញបានទេ!")}).then(function(){sy.kicking=0});
  if(Object.keys(MAP).some(function(k){return!sy.first[k]}))diagArm();
}
document.addEventListener("visibilitychange",function(){if(document.hidden){hidAt=Date.now();Object.keys(sy.dirty||{}).forEach(function(k){if(sy.dirty[k]&&!sy.busy[k]&&MAP[k]){clearTimeout(sy.t[k]);flush(k)}});return}if(hidAt&&Date.now()-hidAt>HIDE_MIN)kick("visible")});
window.addEventListener("online",function(){kick("online")});
/* 🩺 ទិន្នន័យមិនមកពី Cloud ក្រោយ ១២ វិនាទី → របារព្រមាន (ទិន្នន័យណា · មូលហេតុ) + ប៊ូតុងទាញម្ដងទៀត */
var SYN={teachers:"បញ្ជីគ្រូ",tasks:"កិច្ចតែងការ",rs:"ថ្នាក់/សិស្ស",ex:"ថ្នាក់និទស្សន៍",obs:"សង្កេតថ្នាក់",wr:"របាយការណ៍",ah:"ស្នាដៃ",lib:"ឯកសារ",sched:"កាលវិភាគ",ts:"Timesheet",sig:"ហត្ថលេខា",cx:"សម្រង់អត្ថបទ",mc:"ប្រធានថ្នាក់"};
function syncDiag(){
  var b=$("syncBar");if(!who||$("appSection").hidden){if(b)b.remove();return}
  var miss=Object.keys(MAP).filter(function(k){return!sy.first[k]&&!(who.role==="monitor"&&k!=="mc")}),err=sy.err||{};
  if(!miss.length){if(b)b.remove();return}
  var codes=miss.map(function(k){return err[k]}).filter(function(c,i,a){return c&&a.indexOf(c)===i}),c0=codes[0]||"";
  var hard=codes.length||!navigator.onLine||Date.now()-(sy.diagD||0)>30000;   /* ក្រហមតែពេលមានកំហុសពិត · គ្មានអ៊ីនធឺណិត · ឬយូរលើស ៣០ វិនាទី */
  if(!b){b=document.createElement("div");b.id="syncBar";document.body.appendChild(b)}
  b.setAttribute("role",hard?"alert":"status");
  b.style.cssText="position:fixed;left:50%;transform:translateX(-50%);top:8px;z-index:9999;max-width:min(680px,94vw);background:"+(hard?"#b91c1c":"#334155")+";color:#fff;padding:"+(hard?"10px 14px":"6px 12px")+";border-radius:12px;box-shadow:0 6px 20px rgba(0,0,0,.25);font-size:"+(hard?14:13)+"px;line-height:1.6;opacity:"+(hard?1:.92);
  if(!hard){   /* 🔄 សញ្ញាតូចនៅជ្រុងខាងលើស្ដាំ · មិនរាំងស្ទះការងារ · ឈ្មោះទិន្នន័យក្នុង title */
    b.style.cssText="position:fixed;right:10px;top:10px;z-index:9999;background:rgba(51,65,85,.88);color:#fff;padding:3px 10px;border-radius:999px;font-size:12px;line-height:1.6;box-shadow:0 2px 8px rgba(0,0,0,.2);pointer-events:auto;cursor:default";
    b.title="កំពុងធ្វើបច្ចុប្បន្នភាព៖ "+miss.map(function(k){return SYN[k]||k}).join(" · ");
    b.innerHTML="<span class=sync-spin aria-hidden=true>🔄</span> Sync <small>"+kn(miss.length)+"</small>";return}
  b.title="";
  var why=!navigator.onLine?"ឧបករណ៍មិនមានអ៊ីនធឺណិត":/permission/.test(c0)?"គ្មានសិទ្ធិអាន (Rules)":/resource-exhausted|quota/i.test(c0)?"អស់កូតាអាន Firestore ប្រចាំថ្ងៃ":/unavailable|deadline/i.test(c0)?"មិនអាចភ្ជាប់ Server បាន":c0?c0:"Server មិនទាន់ឆ្លើយតប (អ៊ីនធឺណិតយឺត ឬត្រូវបានរារាំង)";
  b.innerHTML="⚠️ <b>មិនទាន់ទាញទិន្នន័យពី Cloud បាន៖</b> "+esc(miss.map(function(k){return SYN[k]||k}).join(" · "))+"<br><small>មូលហេតុ៖ "+esc(why)+(codes.length?" ("+esc(codes.join(", "))+")":"")+"</small> "+
    "<button type=button id=syncRe style='margin-left:6px;background:#fff;color:#b91c1c;border:0;border-radius:8px;padding:3px 10px;font-weight:700;cursor:pointer'>🔄 ទាញម្ដងទៀត</button>";
  $("syncRe").onclick=function(){b.remove();startSync()};
  if(!sy.diagLog){sy.diagLog=true;console.error("sync not loaded after 30s: "+miss.join(",")+(codes.length?" · "+codes.join(","):"")+" · online="+navigator.onLine)}
}
/* Admin ម្នាក់ដំបូង៖ បំលែងទិន្នន័យចាស់ (app/tasks ... app/lib) ទៅទម្រង់ថ្មី ម្ដងគត់ */
function migrateLegacy(){
  if(lsGet("cfgMigrated",""))return Promise.resolve();   /* ⚡ ពិនិត្យរួចម្ដងហើយ → មិនចាំបាច់សួរ Cloud ទៀត */
  return window.FB.getDoc(window.FB.doc(window.db,"cfg","migrated")).then(function(sn){
    if(sn.exists()){lsSet("cfgMigrated","1");return}
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

/* ===== ⚙️ ការកំណត់៖ ប្រមូលការកំណត់ទាំងអស់មកកន្លែងតែមួយ (ការកំណត់ក្នុងផ្ទាំងដើមនៅប្រើបានដដែល) ===== */
function lsGet(k,d){try{var v=localStorage.getItem(k);return v==null?d:v}catch(x){return d}}
function lsSet(k,v){if(window.LSG){LSG.set(localStorage,k,v);return}try{localStorage.setItem(k,v)}catch(x){}}
function openSettings(){
  if(!who)return;
  var m=$("dlgSet");
  if(!m){
    m=document.createElement("dialog");m.id="dlgSet";m.className="wide";document.body.appendChild(m);
    m.addEventListener("click",function(e){
      var b=e.target.closest("[data-st]");if(!b){if(e.target===m)m.close();return}
      var k=b.dataset.st;
      if(k==="x")return m.close();
      if(k.indexOf("sto")===0){if(window.STOADM)STOADM.act(k);return}
      if(k==="prof"){m.close();openProfile();return}
      if(k==="pass"){m.close();$("btnPass").click();return}
      if(k==="sig"){m.close();show("p13");setTimeout(function(){var s=document.querySelector("#tsBody [data-sg]");if(s)s.scrollIntoView({behavior:"smooth",block:"center"})},150);return}
      if(k==="tch"){m.close();show("p1");return}
      if(k==="toonUp"){var f=document.createElement("input");f.type="file";f.accept="image/*";f.onchange=function(){if(f.files[0])WALKER.setOwn(f.files[0],function(){openSettings();notify("បានដាក់រូប cartoon")})};f.click();return}
      if(k==="toonDel"){WALKER.clearOwn();openSettings();return}
      if(k==="grade"){m.close();show("p5");setTimeout(function(){var d=$("rset").closest("details");if(d){d.open=true;d.scrollIntoView({behavior:"smooth"})}},150);return}
      if(k==="obs"){m.close();ov=3;show("p6");setTimeout(function(){var d=$("oth").closest("details");if(d){d.open=true;d.scrollIntoView({behavior:"smooth"})}},150);return}
    });
    m.addEventListener("change",function(e){
      var el=e.target;
      if(el.name==="stTheme")setTheme(el.value==="auto"?"":el.value);
      else if(el.name==="stPm")lsSet("pmode",el.value);
      else if(el.name==="stMo"){lsSet("motion",el.value);applyMotion();if(!$("p0").hidden)renderDash()}
      else if(el.id==="stWalk"){WALKER.set(el.checked);if(el.checked&&!$("p0").hidden)renderDash()}
      else if(el.id==="stSnav"){var off=document.body.classList.contains("sn-off");if(el.checked===off)$("snTog").click()}
      else if(el.id==="stSchool"&&isAdm()){rs.info=rs.info||{};rs.info.school=el.value.trim();savR();notify("បានរក្សាទុកឈ្មោះសាលា")}
      else if(el.id==="stDrive"&&isAdm()){var cid=el.value.trim();window.FB.setDoc(window.FB.doc(window.db,"cfg","drive"),{cid:cid}).then(function(){notify("បានរក្សាទុក Client ID")}).catch(function(){alert("មិនអាចរក្សាទុកបានទេ")})}
      else if(el.id==="stYear"&&isAdm()){rs.info=rs.info||{};rs.info.year=el.value;savR();if(window.renderSY)renderSY();notify("ឆ្នាំសិក្សា៖ "+inf().year)}
    });
  }
  var th=lsGet("theme","auto"),pm=lsGet("pmode",""),adm=isAdm(),I=inf(),sig=window.SCHX&&SCHX.getSig(who.id);
  function rad(name,val,cur,lbl){return"<label class=st-r><input type=radio name="+name+" value='"+val+"'"+(val===cur?" checked":"")+"> "+lbl+"</label>"}
  var y0=parseInt(syStart()),cy=(rs.info&&rs.info.year)||"",yo="<option value=''>ស្វ័យប្រវត្តិ ("+syLabel(y0)+")</option>";
  for(var y=y0+1;y>=y0-4;y--){var v=syLabel(y);yo+="<option"+(v===cy?" selected":"")+">"+v+"</option>"}
  m.innerHTML="<div class=dlgb><h2 style='margin:0 0 12px'>⚙️ ការកំណត់</h2>"+
   "<section class=st-s><h3>👤 ផ្ទាល់ខ្លួន</h3><div class=st-g>"+
    "<button type=button data-st=prof>👤 កែប្រវត្តិរូប និងព័ត៌មានផ្ទាល់ខ្លួន<small>ឈ្មោះ · រូបថត · ភេទ · ថ្ងៃកំណើត · ទូរស័ព្ទ · អាសយដ្ឋាន · មុខវិជ្ជា · កម្រិតវប្បធម៌</small></button>"+
    "<button type=button data-st=sig>✍️ ហត្ថលេខា<small>"+(sig?"មានហត្ថលេខារួចហើយ · ប្ដូរ ឬលុប":"មិនទាន់មាន · ផ្ទុករូប ឬគូរ")+"</small></button>"+
    "<button type=button data-st=pass>🔑 ប្ដូរលេខសម្ងាត់<small>យ៉ាងតិច ៨ តួ</small></button></div></section>"+
   "<section class=st-s><h3>🎨 ការបង្ហាញ</h3><div class=st-row><b>ពណ៌ផ្ទៃ</b>"+rad("stTheme","light",th,"☀️ ភ្លឺ")+rad("stTheme","dark",th,"🌙 ងងឹត")+rad("stTheme","auto",th,"💻 តាមកុំព្យូទ័រ")+"</div>"+
    "<div class=st-row><b>ចលនា (Logo · តួអង្គ)</b>"+rad("stMo","on",lsGet("motion","on"),"▶️ បើកជានិច្ច")+rad("stMo","auto",lsGet("motion","on"),"📱 តាមការកំណត់ឧបករណ៍ (Reduce Motion)")+"</div>"+
    "<div class=st-row><label class=st-r><input type=checkbox id=stWalk"+(window.WALKER&&WALKER.on()?" checked":"")+"> 🚶 បង្ហាញតួអង្គ cartoon ដើរលើបដាស្វាគមន៍</label>"+
      "<button type=button data-st=toonUp>🖼️ ដាក់រូប cartoon ផ្ទាល់ខ្លួន</button>"+(window.WALKER&&WALKER.hasOwn()?"<button type=button data-st=toonDel class=danger>លុបរូប cartoon</button>":"")+
      "<span class=note style='margin:0'>បើមិនដាក់ ប្រព័ន្ធប្រើរូបថតប្រវត្តិរូប + តម្រង cartoon</span></div>"+
    "<div class=st-row><label class=st-r><input type=checkbox id=stSnav"+(document.body.classList.contains("sn-off")?"":" checked")+"> បង្ហាញម៉ឺនុយចំហៀងខាងឆ្វេង (អេក្រង់ធំ)</label></div></section>"+
   "<section class=st-s><h3>🖨️ ការបោះពុម្ព</h3><div class=st-row><b>ពេលចុចបោះពុម្ព</b>"+rad("stPm","",pm,"❓ សួររាល់ដង")+rad("stPm","pdf",pm,"📄 ទាញយក PDF ភ្លាម")+rad("stPm","print",pm,"🖨️ បើកផ្ទាំងបោះពុម្ពភ្លាម")+"</div></section>"+
   "<section class=st-s><h3>🏫 សាលា"+(adm?"":" <small class=note style='margin:0'>(មើលបានតែប៉ុណ្ណោះ · កែបានតែ Admin)</small>")+"</h3><div class=fg>"+
    "<div><label for=stSchool>ឈ្មោះសាលា</label><input id=stSchool value='"+esc(I.school)+"' "+(adm?"":"disabled")+"></div>"+
    "<div><label for=stYear>ឆ្នាំសិក្សា</label><select id=stYear "+(adm?"":"disabled")+">"+yo+"</select></div>"+
    (adm?"<div class=full><label for=stDrive>Google Drive Client ID (សម្រាប់រក្សាលទ្ធផលតេស្តចូល Drive របស់គ្រូ)</label><input id=stDrive placeholder='xxxxxxxx.apps.googleusercontent.com'></div>":"")+"</div>"+
    (adm?"<div class=st-g style='margin-top:10px'><button type=button data-st=tch>👥 គ្រប់គ្រងគ្រូ និងគណនី<small>បន្ថែម · កែ · តួនាទី · សិទ្ធិប្រើ</small></button><button type=button data-st=grade>📊 ស្តង់ដារពិន្ទុ និងនិទ្ទេស<small>ពិន្ទុអតិបរមា · ភាគរយ A–F</small></button><button type=button data-st=obs>🔍 កម្រិតនិទ្ទេសសង្កេត<small>ភាគរយនៃ ១៦៥</small></button></div>":"")+
   "</section>"+(window.STOADM?STOADM.html():"")+"</div><div class=dlgf><button type=button data-st=x class=primary>បិទ</button></div>";
  m.showModal();
  if(adm&&window.FB)window.FB.getDoc(window.FB.doc(window.db,"cfg","drive")).then(function(d){var i=$("stDrive");if(i&&d.exists())i.value=d.data().cid||""}).catch(function(){});
}
$("btnSet").onclick=openSettings;
