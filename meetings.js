/* ========================================================================
   ការងាររដ្ឋបាល › 🤝 កំណត់ហេតុប្រជុំបច្ចេកទេស
   - mt/{id} = {o:ID អ្នកកត់ត្រា, j:JSON{n,d,pl,md,st,en,at:[{t,n,r}],ag,pr,rc,rn}, u}
   - ក្បាល · ជើង ថេរតាមគំរូ · អ្នកកត់ត្រា = គណនីដែលបញ្ចូល · របៀបវារៈ និងដំណើរការប្រជុំ កែបាន
   - ប្រជុំលើកទី១ ទី២ (ពិត) ភ្ជាប់មកស្រាប់ (s1 s2) · រក្សាទុកទៅ Cloud ពេលកែលើកដំបូង
   ដំណើរការប្រជុំ៖ «# » = ចំណងជើង · «* » = ● · «- » = ធាតុ · «-- » = ធាតុរង · ផ្សេងទៀត = កថាខណ្ឌ
   ======================================================================== */
(function(){
"use strict";
var AT0=[["លោកគ្រូ","ផៃ ចន","ប្រធានក្រុម"],["លោកគ្រូ","ម៉េត បញ្ញារិទ្ធ","អនុប្រធាន"],["លោកគ្រូ","ស្រ៊ុន ពន្លឺ",""],["លោកគ្រូ","អូន ណែត",""],
  ["អ្នកគ្រូ","ធឿន សុភ័ស",""],["អ្នកគ្រូ","ហេន រចនីត",""],["អ្នកគ្រូ","អ៊ឹម ម៉ារី",""],["អ្នកគ្រូ","តិ វិច្ឆិកា",""]].map(function(x){return{t:x[0],n:x[1],r:x[2]}});
var SEEDS={
  s1:{n:1,d:"2026-10-24",pl:"Google Meeting",md:"Online",st:"11:20",en:"12:20",at:AT0,rn:"ម៉េត បញ្ញារិទ្ធ",
    ag:"I. ការបែងចែងម៉ោងជំនួយ លោកគ្រូ ចាន់ សុខហេង\nII. ការរៀបចំកិច្ចតែងការ\nIII. ការរៀបចំសៀវភៅរដ្ឋបាលគ្រូ\nIV. ការរៀបចំ Timesheet and Workplan\nV. ផ្សេងៗ",
    pr:["# ក. កិច្ចតែងការ (បទបង្ហាញពី លោកគ្រូ ផៃ ចន)",
      "- 1. ប្រើកិច្ចតែងការស្តង់ដាយយកគំរូក្បាលតែមួយ មិនមានប្រើលេខរ៉ូម៉ាំងព្រីនប្រើបានទូទៅ",
      "- 2. ជើងកិច្ចតែងការយកគំរូក្នុងស្លាយតាមការធ្វើបច្ចុប្បន្នភាពពីគណៈគ្រប់គ្រង",
      "- 3. បែងចែកសមាជិកក្នុងការពិនិត្យកិច្ចតែងការ",
      "- 4. ដាក់កិច្ចកែងការមុនការបង្រៀនមួយសប្តាហ៍យ៉ាងតិច",
      "# ខ. សៀវភៅរដ្ឋបានគ្រូ",
      "- 1. ប្រជុំ៖ រួម បច្ចេកទេស PLC ថ្នាក់និទស្សន៍ គណៈកម្មការស្វ័យភាព",
      "- 2. បំណែងចែកកម្មសិក្សា (គោល និងលម្អិត) ព្រីនមកបិទបាន",
      "- 3. សម្រង់អត្ថបទ និងអវត្តមានសិស្ស",
      "- 4. ពិន្ទុប្រចាំខែ និងឆមាស",
      "- 5. កំណត់ហេតុប្រចាំថ្ងៃ (អវត្តមាន កិច្ចសន្យាសិស្ស ទទួលភ្ញៀវ)",
      "# គ. ការរៀបចំ Timesheet and Workplan",
      "- 1. បំពេញតាមកាលវិភាគក្នុង Teaching (ម៉ោងបង្រៀន១៨ម៉ក្នុងមួយសប្តាហ៍)",
      "- 2. ម៉ោងលើកបំពេញក្នុង Extra class ក្នុង TimeSheet ថ្មីមួយទៀត",
      "- 3. ធ្វើការ Workplan ត្រូវធ្វើមុខថ្ងៃកំណត់ នឹងត្រឹមត្រូវតាម TimeSheet",
      "- 4. ចំពោះ TS+WP គោលដាក់ក្នុង Drive មុនថ្ងៃ២៥",
      "- 5. ចំពោះ TS+WP ថែមលើស ព្រីនឲ្យគណៈគ្រប់គ្រងពិនិត្យ មុនថ្ងៃ២៥",
      "- 6. ដាក់សៀវភៅរដ្ឋបានមុខថ្ងៃ២៨",
      "# ឃ. ការធ្វើគន្លងអាជីព",
      "- 1. ស្វែងយល់ពីអ្វីឲ្យចង់ចេះ និងរៀបចំផែនការ",
      "- 2. រៀនធ្វើ បន្ទាប់មកបន្តកែលម្អ",
      "- 3. កំណត់លោកគ្រូ អ្នកគ្រូត្រូវណាត់ជួប"].join("\n")},
  s2:{n:2,d:"2026-10-26",pl:"BT",md:"ដោយផ្ទាល់និង online",st:"11:20",en:"12:20",at:AT0,rn:"ស្រ៊ុន ពន្លឺ",
    ag:"១. ការបែងចែងម៉ោងជំនួស លោកគ្រូ ចាន់ សុខហេង + អ្នកគ្រូ តិ វិច្ឆិកា\n២. ផ្សេងៗ",
    pr:["លោកគ្រូ ផៃ ចន ជាប្រធានក្រុមបច្ចេកទេសបានលើកមតិសំណេះសំណាល ជាមួយសមាជិករួមក្រុម និងបានរំឭកអំពីរបៀបវារៈប្រជុំឡើងវិញដល់អង្គប្រជុំព្រមទាំងបញ្ជាក់អំពីគោលបំណងនៃការបើកអង្គប្រជុំថ្ងៃនេះ។",
      "# (១) ការបែងចែកម៉ោងជំនួសលោកគ្រូចាន់ សុខ ហេង និងអ្នកគ្រូតិ វិច្ឆិកា",
      "* អ្នកគ្រូ តិ វិច្ឆិកា",
      "- ចន្ទ: អ្នកគ្រូ រចនានីត (ទី៣-៤) + លោកគ្រូអូន ណែត (ទី៩-១០) online+",
      "- អង្គារ: អ្នកគ្រូ រចនានីត (ទី១-២ ទី៥-៦) + អ្នកគ្រូធឿន សំភ័ស (ទី៣-៤) + លោកគ្រូផៃ ចន (ទី១០-១១)",
      "- ពុធ: អ្នកគ្រូ រចនានីត (ទី៥-៦) + (ទី១១) online+ + លោកគ្រូអូន ណែត (ទី៣)",
      "- ព្រហ: អ្នកគ្រូ រចនានីត (ទី៥-៦) FC + អ្នកគ្រូធឿន សំភ័ស (ទី៧-៨) FC + លោកគ្រូ អូន ណែត (ទី១០)",
      "- សៅរ៍: អ្នកគ្រូ ធឿន សំភ័ស (ទី១-២)",
      "* លោកគ្រូចាន់ សុខហេង",
      "- ចន្ទ: លោកគ្រូស្រ៊ុន ពន្លឺ(ទី៥-៦) + អ្នកគ្រូ ម៉ារី (ទី១)",
      "- ពុធ: លោកគ្រូស្រ៊ុន ពន្លឺ(ទី៣-៤) + លោកគ្រូម៉េត បញ្ញារិទ្ធ(ទី៧-៨)",
      "- ព្រហ: លោកគ្រូស្រ៊ុន ពន្លឺ(ទី១-២ ទី៥-៦) + អ្នកគ្រូ ម៉ារី(ទី៣-៤ ទី១០-១១)",
      "- សុក្រ: លោកគ្រូស្រ៊ុន ពន្លឺ(ទី១-២) + លោកគ្រូម៉េត បញ្ញារិទ្ធ(ទី៧-៨)",
      "- សៅរ៍: លោកគ្រូស្រ៊ុន ពន្លឺ(ទី៣-៤) + លោកគ្រូម៉េត បញ្ញារិទ្ធ(ទី១-២)",
      "# (២) ផ្សេងៗ",
      "លោកគ្រូ ផៃ ចន ប្រធានអង្គប្រជុំ បានណែនាំឱ្យសមាជិកសមាជិកាយកចិត្តទុកដាក់អនុវត្តតាមបំណែងចែកខាងលើឱ្យមានប្រសិទ្ធភាព និងទំនួលខុសត្រូវខ្ពស់។ លើសពីនេះ លោកប្រធានក៏បានផ្តែផ្តាំឱ្យសមាជិកសមាជិកត្រៀមខ្លួនជានិច្ច ចំពោះការផ្លាស់ប្តូរកាលវិភាគបង្រៀននៅសប្តាហ៍ក្រោយ។"].join("\n")}
};
var mts={},loaded=false,cur=null,edit=null;

function nk(s){return String(s||"").replace(/[\s​]/g,"")}
function idByName(n){var k=nk(n),t=data.filter(function(x){return nk(x.name)===k})[0];return t?t.id:""}
function head(){var t=data.filter(function(x){return x.rl==="ប្រធាន"})[0];return t?{id:t.id,n:t.name}:{id:idByName("ផៃ ចន"),n:"ផៃ ចន"}}
function owner(id,m){return m.o||(m.rc)||idByName(m.rn)}
function canE(id){var m=mts[id];return !!(who&&m&&(isAdm()||owner(id,m)===who.id))}
var TY={b:"បច្ចេកទេស",r:"រួម",p:" PLC "},TT={b:"ក្រុមបច្ចេកទេស",r:"រួម",p:" PLC"},fTy="b";
function vTy(v){return v==="r"||v==="p"||v==="c"||v==="t"||v==="j"?v:"b"}
/* កំណត់ហេតុប្រចាំថ្ងៃ (ឯកជន · collection «dl» · អានបានតែម្ចាស់)៖ c = កិច្ចសន្យាសិស្ស · t = វគ្គបំប៉ន · j = កំណត់ហេតុផ្ទាល់ខ្លួន */
function isDL(ty){return ty==="c"||ty==="t"||ty==="j"}
var TN={b:"ប្រជុំក្រុមបច្ចេកទេស",r:"ប្រជុំរួម",p:"ប្រជុំ PLC",c:"កិច្ចសន្យាសិស្ស",t:"វគ្គបំប៉ន",j:"ផ្ទាល់ខ្លួន"};
try{fTy=vTy(localStorage.getItem("mtTy"))}catch(e){}
function tyOf(m){return vTy(m&&m.ty)}
/* តួនាទី៖ ប្រជុំបច្ចេកទេស = ប្រធាន/អនុប្រធាន/សមាជិក · ប្រជុំរួម = នាយករង (ធំជាងគេ) → ជំនួយការគណៈគ្រប់គ្រង → គ្រូបង្រៀន */
/* PLC (Professional Learning Centre)៖ គ្រូចែករំលែក → គ្រូទទួល */
var RL={b:["ប្រធានក្រុម","អនុប្រធាន","សមាជិក"],r:["នាយករង","ជំនួយការគណៈគ្រប់គ្រង","គ្រូបង្រៀន"],p:["គ្រូចែករំលែក","គ្រូទទួល"]},RD={b:"",r:"គ្រូបង្រៀន",p:"គ្រូទទួល"};
function known(r){return RL.b.indexOf(r)>=0||RL.r.indexOf(r)>=0||RL.p.indexOf(r)>=0}
function conv(at,ty){return(at||[]).map(function(a){var r=String(a.r||"").trim();if((!r||known(r))&&RL[ty].indexOf(r)<0)r=RD[ty];return{t:a.t,n:a.n,r:r}})}
function rk(r,ty){var L=RL[ty]||[],i=L.indexOf(String(r||"").trim());return i<0?L.length-1:i}
function shr(at){return(at||[]).filter(function(a){return a.n&&String(a.r||"").trim()==="គ្រូចែករំលែក"})}
function mine(id){var m=mts[id];return !!(who&&m&&owner(id,m)===who.id)}
function myAt(){var x=data.filter(function(q){return q.id===who.id})[0];return{t:x&&x.g==="ស្រី"?"អ្នកគ្រូ":"លោកគ្រូ",n:who.name,r:"គ្រូទទួល"}}
function nextN(ty,skip){return Object.keys(mts).filter(function(id){return !mts[id].x&&id!==skip&&tyOf(mts[id])===ty&&((ty!=="p"&&!isDL(ty))||mine(id))}).reduce(function(s,id){return Math.max(s,+mts[id].n||0)},0)+1}
function list(){return Object.keys(mts).filter(function(id){return !mts[id].x&&tyOf(mts[id])===fTy}).sort(function(a,b){return isDL(fTy)?(String(mts[b].d).localeCompare(mts[a].d)||(mts[b].n-mts[a].n)):((mts[b].n-mts[a].n)||String(mts[b].d).localeCompare(mts[a].d))})}

function load(){
  mts={};Object.keys(SEEDS).forEach(function(id){mts[id]=JSON.parse(JSON.stringify(SEEDS[id]))});
  if(!window.db||!window.FB)return Promise.resolve();
  var F=window.FB,db=window.db,mv=[];
  /* PLC ឯកជន (collection «plc»)៖ អានបានតែអ្នកកត់ត្រា គ្រូចែករំលែក និង Admin (Firestore Rules) */
  var take=function(sn,c){sn.forEach(function(d){var v=d.data(),m;try{m=JSON.parse(v.j)}catch(e){m=null}if(m){m.o=v.o;m._c=c||"plc";mts[d.id]=m}})};
  var dq=F.getDocs(F.query(F.collection(db,"dl"),F.where("o","==",who.id))).then(function(sn){take(sn,"dl")}).catch(function(e){console.error("dl load",e)});
  var pq=isAdm()?F.getDocs(F.collection(db,"plc")).then(take)
    :Promise.all([F.getDocs(F.query(F.collection(db,"plc"),F.where("o","==",who.id))),F.getDocs(F.query(F.collection(db,"plc"),F.where("s","array-contains",who.id)))]).then(function(r){r.forEach(take)});
  return F.getDocs(F.collection(db,"mt")).then(function(sn){
    sn.forEach(function(d){var v=d.data(),m;try{m=JSON.parse(v.j)}catch(e){m=null}
      if(m){m.o=v.o;m._c="mt";
        if(tyOf(m)==="p"){if(isAdm()||v.o===who.id){mts[d.id]=m;mv.push(d.id)}return}   /* PLC ចាស់ក្នុង «mt» → ផ្លាស់ទៅ «plc» */
        mts[d.id]=m}else if(v.x)mts[d.id]={x:1}});
    return Promise.all([pq.catch(function(e){console.error("plc load",e)}),dq]);
  }).then(function(){loaded=true;mv.forEach(function(id){save(id).catch(function(e){console.error("plc move",e)})})})
    .catch(function(e){console.error("mt load",e)});
}
function sIds(m){var r=[];shr(m.at).forEach(function(a){var i=idByName(a.n);if(i&&r.indexOf(i)<0)r.push(i)});return r.slice(0,10)}
function save(id){
  var F=window.FB,m=mts[id],o=owner(id,m)||who.id,v=JSON.parse(JSON.stringify(m)),c=tyOf(m)==="p"?"plc":isDL(tyOf(m))?"dl":"mt",old=m._c,now=new Date().toISOString();delete v.o;delete v._c;
  var doc={o:o,j:JSON.stringify(v),u:now};if(c==="plc")doc.s=sIds(m);if(c==="dl")doc.k=tyOf(m);
  return F.setDoc(F.doc(window.db,c,id),doc).then(function(){m.o=o;m._c=c;
    if(old&&old!==c)return(SEEDS[id]&&old==="mt"?F.setDoc(F.doc(window.db,"mt",id),{o:o,x:true,j:"null",u:now}):F.deleteDoc(F.doc(window.db,old,id))).catch(function(e){console.error("mt move",e)});
  });
}

/* ---------- ឯកសារ (មើល/បោះពុម្ព) ---------- */
function ymd(s){var a=String(s||"").split("-").map(Number);return a.length===3&&a[0]?a:null}
function lunar(s,noWd){var a=ymd(s);return a&&window.KhCal?KhCal.fmt(a[0],a[1],a[2],{noWd:noWd}):""}
function greg(s){var a=ymd(s);return a?"ត្រូវនឹងថ្ងៃទី"+kn(a[2])+" ខែ"+M[a[1]-1]+" ឆ្នាំ"+kn(a[0]):""}
function tm(s){return kn(String(s||""))}
function n2(n){return kn((n<10?"០":"")+n)}
function prHtml(s){
  return String(s||"").split("\n").map(function(l){
    var t=l.trim();if(!t)return"";
    if(/^#\s*/.test(t))return"<div class=mt-h>"+esc(t.replace(/^#+\s*/,""))+"</div>";
    if(/^\*\s*/.test(t))return"<div class=mt-b>● "+esc(t.replace(/^\*\s*/,""))+"</div>";
    if(/^--\s*/.test(t))return"<div class=mt-i2>"+esc(t.replace(/^--\s*/,""))+"</div>";
    if(/^-\s*/.test(t))return"<div class=mt-i>"+esc(t.replace(/^-\s*/,""))+"</div>";
    return"<p class=mt-p>"+esc(t)+"</p>";
  }).join("");
}
function docHtml(m){
  if(isDL(tyOf(m)))return docDL(m);
  var X=window.SCHX,h=head(),rid=m.rc||idByName(m.rn),sg=function(id){return X&&id?X.getSig(id):""};
  var ty=tyOf(m),at=(m.at||[]).filter(function(a){return a.n}),R=ty==="r",P=ty==="p",sh=P?shr(at):[];
  if(R||P)at=at.map(function(a,i){return{t:a.t,n:a.n,r:String(a.r||"").trim()||RD[ty],i:i}}).sort(function(a,b){return rk(a.r,ty)-rk(b.r,ty)||a.i-b.i});
  var half=Math.ceil(at.length/2);
  var atl=function(a,i){return"<div>"+kn(i+1)+". "+esc((a.t?a.t+" ":"")+a.n)+(a.r?" ("+esc(a.r)+")":"")+"</div>"};
  var sig=function(id){var s=sg(id);return"<div class=mt-sg>"+(s?"<img src='"+s+"' alt=''>":"")+"</div>"};
  return"<div class='pg mt-doc'>"+
   "<div class=mt-top><div class=mt-sch><img src='"+LOGOBT()+"' alt=''><div class=moul>វិទ្យាល័យបឹងត្របែក</div><div class=moul>សាលារៀនជំនាន់ថ្មី</div></div>"+
    "<div class=mt-kh><div class=moul>ព្រះរាជាណាចក្រកម្ពុជា</div><div class=moul>ជាតិ សាសនា ព្រះមហាក្សត្រ</div><div class=mt-orn>❧❧❧</div></div></div>"+
   "<div class='moul mt-ti'>កំណត់ហេតុប្រជុំ"+TT[ty]+" លើកទី"+kn(m.n)+"</div>"+
   "<p class=mt-p>"+esc(lunar(m.d).replace("ព.ស.","ពុទ្ធសករាជ"))+" "+esc(greg(m.d))+" នៃវិទ្យាល័យបឹងត្របែក សាលារៀនជំនាន់ថ្មី បានរៀបចំប្រជុំ"+TY[ty]+"លើកទី "+n2(m.n)+" ។</p>"+
   "<div class=mt-li>❖ ទីកន្លែងប្រជុំ៖ "+esc(m.pl||"")+"</div><div class=mt-li>❖ មធ្យោបាយប្រជុំ៖ "+esc(m.md||"")+"</div>"+
   "<div class=mt-li>❖ ម៉ោងចាប់ផ្ដើម៖ "+esc(tm(m.st))+" នាទី បញ្ចប់ម៉ោង "+esc(tm(m.en))+" នាទី ថ្ងៃត្រង់</div>"+
   "<div class=mt-s>I. សមាសភាពចូលរួម</div><div class=mt-at><div>"+at.slice(0,half).map(atl).join("")+"</div><div>"+at.slice(half).map(function(a,i){return atl(a,i+half)}).join("")+"</div></div>"+
   "<div class=mt-s>II. របៀបវារៈ</div>"+String(m.ag||"").split("\n").filter(function(l){return l.trim()}).map(function(l){return"<div class=mt-i>"+esc(l.trim())+"</div>"}).join("")+
   "<div class=mt-s>III. ដំណើរការប្រជុំ</div>"+prHtml(m.pr)+
   "<div class=mt-ft><div class=mt-dt><div>"+esc(lunar(m.d))+"</div><div>"+esc(greg(m.d))+"</div></div>"+
    "<div class=mt-cols><div><div>បានឃើញ និងពិនិត្យ</div><div class=moul>ជ.គណៈគ្រប់គ្រងសាលារៀនជំនាន់ថ្មី</div></div>"+
     (P?"<div><div>បានឃើញ និងពិនិត្យ</div><div class=moul>គ្រូចែករំលែក</div>"+sig(sh[0]?idByName(sh[0].n):"")+"<div class=moul>"+esc(sh.map(function(a){return a.n}).join(" · "))+"</div></div>"
      :R?"<div></div>"   /* ប្រជុំរួម៖ គ្មានហត្ថលេខាកណ្ដាល (ទុកកន្លែងទំនេរ ឱ្យអ្នកកត់ត្រានៅខាងស្ដាំដដែល) */
       :"<div><div>បានឃើញ និងពិនិត្យ</div><div class=moul>ប្រធានក្រុមបច្ចេកទេស</div>"+sig(h.id)+"<div class=moul>"+esc(h.n)+"</div></div>")+
     "<div><div>&nbsp;</div><div class=moul>អ្នកកត់ត្រា</div>"+sig(rid)+"<div class=moul>"+esc(m.rn||"")+"</div></div></div></div>"+
  "</div>";
}

/* ===================== កំណត់ហេតុប្រចាំថ្ងៃ ===================== */
var CM0="មករៀនឱ្យបានទៀងទាត់ និងទាន់ពេលវេលា មិនអវត្តមានដោយគ្មានច្បាប់\nគោរពវិន័យ និងបទបញ្ជាផ្ទៃក្នុងរបស់សាលា\nស្លៀកពាក់ឯកសណ្ឋានឱ្យបានត្រឹមត្រូវ និងមានអនាម័យ\nយកចិត្តទុកដាក់សិក្សា ធ្វើកិច្ចការសាលា និងកិច្ចការផ្ទះឱ្យបានគ្រប់គ្រាន់\nគោរពគ្រូ និងរាប់អានមិត្តភក្តិ មិនឈ្លោះប្រកែក ឬវាយតប់គ្នា\nមិនប្រើប្រាស់ទូរស័ព្ទក្នុងម៉ោងសិក្សា ដោយគ្មានការអនុញ្ញាតពីគ្រូ";
var CQ0="ប្រសិនបើខ្ញុំបំពានលើកិច្ចសន្យានេះ ខ្ញុំសុខចិត្តទទួលការដាក់វិន័យតាមបទបញ្ជាផ្ទៃក្នុងរបស់សាលា ហើយអាណាព្យាបាលរបស់ខ្ញុំយល់ព្រមសហការជាមួយសាលា ក្នុងការតាមដាន និងអប់រំខ្ញុំ។";
function dlName(m){var t=tyOf(m);return t==="c"?(m.sn||"—")+(m.cl?" ("+m.cl+")":""):(m.ti||"—")}
function today(){var d=new Date(),p=function(x){return("0"+x).slice(-2)};return d.getFullYear()+"-"+p(d.getMonth()+1)+"-"+p(d.getDate())}
function newDL(ty){
  var b={ty:ty,n:nextN(ty),d:today(),rc:who.id,rn:who.name};
  if(ty==="t")Object.assign(b,{ti:"",d2:"",pl:"",md:"ដោយផ្ទាល់",org:"",sp:"",hr:"",ob:"",ct:"",ap:"",fb:"",ce:"មាន"});
  else if(ty==="j")Object.assign(b,{ti:"",ac:"",gd:"",ch:"",so:"",pn:""});
  else Object.assign(b,{sn:"",sg:"ប្រុស",sb:"",cl:"",pa:"",rl:"ឪពុក",ph:"",ad:"",rs:"",cm:CM0,cq:CQ0});
  return b;
}
function dshort(s){return greg(s).replace("ត្រូវនឹង","")}
function lines(s){return String(s||"").split("\n").map(function(l){return l.trim()}).filter(Boolean)}
function hdr(){return"<div class=mt-top><div class=mt-sch><img src='"+LOGOBT()+"' alt=''><div class=moul>វិទ្យាល័យបឹងត្របែក</div><div class=moul>សាលារៀនជំនាន់ថ្មី</div></div>"+
    "<div class=mt-kh><div class=moul>ព្រះរាជាណាចក្រកម្ពុជា</div><div class=moul>ជាតិ សាសនា ព្រះមហាក្សត្រ</div><div class=mt-orn>❧❧❧</div></div></div>"}
function sec(n,t,body){return"<div class=mt-s>"+n+". "+t+"</div>"+(prHtml(body)||"<p class=mt-p>—</p>")}
function docDL(m){
  var X=window.SCHX,ty=tyOf(m),o=m.rc||owner("",m),me=data.filter(function(q){return q.id===o})[0],tt=me&&me.g==="ស្រី"?"អ្នកគ្រូ":"លោកគ្រូ";
  var sig=function(id){var s=X&&id?X.getSig(id):"";return"<div class=mt-sg>"+(s?"<img src='"+s+"' alt=''>":"")+"</div>"};
  var dt="<div class=mt-dt><div>"+esc(lunar(m.d))+"</div><div>"+esc(greg(m.d))+"</div></div>";
  var col=function(a,b,id,n){return"<div><div>"+(a||"&nbsp;")+"</div><div class=moul>"+b+"</div>"+sig(id)+"<div class=moul>"+esc(n||"")+"</div></div>"};
  var mgr="<div><div>បានឃើញ និងពិនិត្យ</div><div class=moul>ជ.គណៈគ្រប់គ្រងសាលារៀនជំនាន់ថ្មី</div></div>";
  var h="<div class='pg mt-doc'>"+hdr();
  if(ty==="t"){
    h+="<div class='moul mt-ti'>កំណត់ហេតុវគ្គបំប៉នសមត្ថភាព</div>"+
     "<p class=mt-p>"+esc(tt)+" <b>"+esc(m.rn||"")+"</b> គ្រូបង្រៀននៃវិទ្យាល័យបឹងត្របែក សាលារៀនជំនាន់ថ្មី បានចូលរួមវគ្គបំប៉ន «<b>"+esc(m.ti||"")+"</b>» ដូចខាងក្រោម៖</p>"+
     "<div class=mt-li>❖ អង្គភាពរៀបចំ៖ "+esc(m.org||"—")+"</div>"+
     "<div class=mt-li>❖ គ្រូឧទ្ទេស / វាគ្មិន៖ "+esc(m.sp||"—")+"</div>"+
     "<div class=mt-li>❖ កាលបរិច្ឆេទ៖ "+esc(dshort(m.d))+(m.d2&&m.d2!==m.d?" ដល់ "+esc(dshort(m.d2)):"")+(m.hr?" · រយៈពេល "+esc(kn(String(m.hr)))+" ម៉ោង":"")+"</div>"+
     "<div class=mt-li>❖ ទីកន្លែង៖ "+esc(m.pl||"—")+" · មធ្យោបាយ៖ "+esc(m.md||"—")+"</div>"+
     "<div class=mt-li>❖ វិញ្ញាបនបត្រ៖ "+esc(m.ce||"—")+"</div>"+
     sec("I","គោលបំណងនៃវគ្គ",m.ob)+sec("II","ខ្លឹមសារសំខាន់ៗដែលទទួលបាន",m.ct)+sec("III","ផែនការអនុវត្តក្នុងការបង្រៀន",m.ap)+sec("IV","មតិ និងសំណូមពរ",m.fb)+
     "<div class=mt-ft>"+dt+"<div class=mt-cols>"+mgr+"<div></div>"+col("","អ្នកចូលរួមវគ្គ",o,m.rn)+"</div></div>";
  }else if(ty==="j"){
    h+="<div class='moul mt-ti'>កំណត់ហេតុផ្ទាល់ខ្លួនប្រចាំថ្ងៃ</div>"+
     "<div class=mt-li>❖ ថ្ងៃ៖ "+esc(lunar(m.d))+" "+esc(greg(m.d))+"</div>"+
     "<div class=mt-li>❖ ឈ្មោះ៖ "+esc(tt+" "+(m.rn||""))+(m.ti?" · ប្រធានបទ៖ "+esc(m.ti):"")+"</div>"+
     sec("I","សកម្មភាព / ការងារដែលបានធ្វើ",m.ac)+sec("II","ចំណុចល្អ / លទ្ធផល",m.gd)+sec("III","បញ្ហាប្រឈម",m.ch)+sec("IV","ដំណោះស្រាយ និងមេរៀនដែលទទួលបាន",m.so)+sec("V","ផែនការបន្ទាប់",m.pn)+
     "<div class=mt-ft>"+dt+"<div class=mt-cols><div></div><div></div>"+col("","ហត្ថលេខា",o,m.rn)+"</div></div>";
  }else{
    var boy=m.sg!=="ស្រី";
    h+="<div class='moul mt-ti'>កិច្ចសន្យា</div><div style='text-align:center;margin:-2mm 0 3mm'>(រវាងសិស្ស អាណាព្យាបាល និងសាលារៀន)</div>"+
     "<p class=mt-p>"+(boy?"ខ្ញុំបាទ":"នាងខ្ញុំ")+"ឈ្មោះ <b>"+esc(m.sn||"……………")+"</b> ភេទ "+esc(m.sg||"…")+" ថ្ងៃខែឆ្នាំកំណើត "+esc(m.sb?dshort(m.sb):"……………")+" ជាសិស្សថ្នាក់ទី <b>"+esc(m.cl||"……")+"</b> នៃវិទ្យាល័យបឹងត្របែក សាលារៀនជំនាន់ថ្មី។</p>"+
     "<p class=mt-p>អាណាព្យាបាលឈ្មោះ <b>"+esc(m.pa||"……………")+"</b> ត្រូវជា"+esc(m.rl||"……")+" លេខទូរស័ព្ទ "+esc(m.ph||"……………")+(m.ad?" អាសយដ្ឋាន "+esc(m.ad):"")+"។</p>"+
     (m.rs?"<div class=mt-s>មូលហេតុនៃកិច្ចសន្យា</div><p class=mt-p>"+esc(m.rs)+"</p>":"")+
     "<div class=mt-s>"+(boy?"ខ្ញុំបាទ":"នាងខ្ញុំ")+"សូមសន្យាថា៖</div>"+lines(m.cm).map(function(l,i){return"<div class=mt-i>"+kn(i+1)+". "+esc(l)+"</div>"}).join("")+
     (m.cq?"<p class=mt-p style='margin-top:2mm'>"+esc(m.cq)+"</p>":"")+
     "<p class=mt-p>កិច្ចសន្យានេះធ្វើឡើងដោយស្ម័គ្រចិត្ត និងមានប្រសិទ្ធភាពចាប់ពីថ្ងៃចុះហត្ថលេខានេះតទៅ។</p>"+
     "<div class=mt-ft>"+dt+"<div class=mt-cols>"+col("","សិស្សសន្យា","",m.sn)+col("","អាណាព្យាបាល","",m.pa)+col("","គ្រូបន្ទុកថ្នាក់",o,m.rn)+"</div>"+
     "<div style='text-align:center;margin-top:3mm;font-size:10.5pt'><div>បានឃើញ និងឯកភាព</div><div class=moul style='font-size:10pt'>ជ.គណៈគ្រប់គ្រងសាលារៀនជំនាន់ថ្មី</div><div class=mt-sg></div></div></div>";
  }
  return h+"</div>";
}
function drawEditDL(){
  var e=edit.m,ty=tyOf(e);
  var inp=function(k,lbl,typ,ph){return"<label>"+lbl+"<input data-k="+k+" type="+(typ||"text")+" value='"+esc(e[k]||"")+"'"+(ph?" placeholder='"+esc(ph)+"'":"")+"></label>"};
  var ta=function(k,lbl,rows,ph){return"<h4>"+lbl+"</h4><textarea data-k="+k+" rows="+(rows||4)+(ph?" placeholder='"+esc(ph)+"'":"")+">"+esc(e[k]||"")+"</textarea>"};
  var sel=function(k,lbl,opts){return"<label>"+lbl+"<select data-k="+k+">"+opts.map(function(o){return"<option"+(e[k]===o?" selected":"")+">"+o+"</option>"}).join("")+"</select></label>"};
  $("mtEd").hidden=$("mtDel").hidden=$("mtPr").hidden=$("mtNew").hidden=true;$("mtSel").disabled=true;if($("mtTy"))$("mtTy").disabled=true;
  var h="<div class='card mt-form'><h3>"+(edit.id?"✏️ កែ":"➕ ")+({c:"📝 កិច្ចសន្យាសិស្ស",t:"🎓 កំណត់ហេតុវគ្គបំប៉ន",j:"📓 កំណត់ហេតុផ្ទាល់ខ្លួន"})[ty]+"</h3>"+
    "<p class=note>🔒 ឃើញតែអ្នកម្នាក់ប៉ុណ្ណោះ (គ្រូផ្សេង និង Admin មិនឃើញ) · ក្បាលលិខិត និងកាលបរិច្ឆេទចន្ទគតិ បង្កើតស្វ័យប្រវត្តិ · «# » ចំណងជើង · «- » ចំណុច</p>";
  if(ty==="t"){
    h+="<div class=mt-grid>"+inp("ti","ឈ្មោះវគ្គ / ប្រធានបទ","text","ឧ. វគ្គបំប៉នការបង្រៀនតាម STEM")+inp("org","អង្គភាពរៀបចំ","text","ឧ. មន្ទីរអប់រំ យុវជន និងកីឡា")+inp("sp","គ្រូឧទ្ទេស / វាគ្មិន")+
      inp("d","ថ្ងៃចាប់ផ្ដើម","date")+inp("d2","ថ្ងៃបញ្ចប់","date")+inp("hr","ចំនួនម៉ោង","number")+inp("pl","ទីកន្លែង")+
      "<label>មធ្យោបាយ<input data-k=md list=mtMd value='"+esc(e.md||"")+"'><datalist id=mtMd><option>ដោយផ្ទាល់</option><option>Online</option><option>ដោយផ្ទាល់និង online</option></datalist></label>"+
      sel("ce","វិញ្ញាបនបត្រ",["មាន","គ្មាន","កំពុងរង់ចាំ"])+"</div>"+
      ta("ob","I. គោលបំណងនៃវគ្គ",3)+ta("ct","II. ខ្លឹមសារសំខាន់ៗដែលទទួលបាន",8,"- ...")+ta("ap","III. ផែនការអនុវត្តក្នុងការបង្រៀន",4)+ta("fb","IV. មតិ និងសំណូមពរ",3);
  }else if(ty==="j"){
    h+="<div class=mt-grid>"+inp("d","កាលបរិច្ឆេទ","date")+inp("ti","ប្រធានបទ (បើមាន)")+"</div><div class=mt-lun id=mtLun>"+esc(lunar(e.d))+" "+esc(greg(e.d))+"</div>"+
      ta("ac","I. សកម្មភាព / ការងារដែលបានធ្វើ",5,"- បង្រៀនថ្នាក់ ...")+ta("gd","II. ចំណុចល្អ / លទ្ធផល",3)+ta("ch","III. បញ្ហាប្រឈម",3)+ta("so","IV. ដំណោះស្រាយ និងមេរៀនដែលទទួលបាន",3)+ta("pn","V. ផែនការបន្ទាប់",3);
  }else{
    var cl=(window.rs&&rs.c&&rs.c[who.id])||[],op="";
    cl.forEach(function(c,ci){(c.st||[]).forEach(function(x,si){if(x&&x.n)op+="<option value='"+ci+"|"+si+"'>"+esc(c.n+" · "+x.n)+"</option>"})});
    h+=(op?"<div class=bar><label for=dlSt><b>👤 ជ្រើសសិស្សពីបញ្ជីថ្នាក់៖</b></label><select id=dlSt><option value=''>— ជ្រើស —</option>"+op+"</select></div>":"")+
      "<h4>ព័ត៌មានសិស្ស</h4><div class=mt-grid>"+inp("sn","ឈ្មោះសិស្ស")+sel("sg","ភេទ",["ប្រុស","ស្រី"])+inp("sb","ថ្ងៃខែឆ្នាំកំណើត","date")+inp("cl","ថ្នាក់")+inp("d","ថ្ងៃធ្វើកិច្ចសន្យា","date")+"</div>"+
      "<h4>អាណាព្យាបាល</h4><div class=mt-grid>"+inp("pa","ឈ្មោះអាណាព្យាបាល")+"<label>ត្រូវជា<input data-k=rl list=dlRl value='"+esc(e.rl||"")+"'><datalist id=dlRl><option>ឪពុក</option><option>ម្ដាយ</option><option>បងប្អូន</option><option>ជីដូនជីតា</option><option>អាណាព្យាបាល</option></datalist></label>"+inp("ph","លេខទូរស័ព្ទ","tel")+inp("ad","អាសយដ្ឋាន")+"</div>"+
      ta("rs","មូលហេតុនៃកិច្ចសន្យា (ឧ. អវត្តមានញឹកញាប់ · បំពានវិន័យ)",3)+
      ta("cm","ការសន្យា (មួយបន្ទាត់ = មួយចំណុច · កែបាន)",7)+ta("cq","ការទទួលខុសត្រូវ បើបំពានកិច្ចសន្យា",3);
  }
  h+="<div class=bar><button type=button id=mtCancel>បោះបង់</button><button type=button id=mtPrev>👁️ មើលមុន</button><button type=button class=primary id=mtSave>💾 រក្សាទុក</button></div><div id=mtPv class=mt-view></div></div>";
  $("mtBody").innerHTML=h;
  var ds=$("dlSt");if(ds)ds.onchange=function(){var a=this.value.split("|"),c=cl[+a[0]],x=c&&c.st[+a[1]];if(!x)return;e.sn=x.n;if(x.g)e.sg=x.g==="ស្រី"?"ស្រី":"ប្រុស";e.cl=c.n;if(x.dob||x.b)e.sb=x.dob||x.b;drawEditDL();dPut()};
}

/* ---------- ផ្ទាំង ---------- */
function renderMt(){
  if(!who)return;
  (loaded?Promise.resolve():load()).then(draw);
}
function draw(){
  var b=$("mtBody");if(!b)return;
  if(edit)return drawEdit();
  var ids=list();if($("mtTy"))$("mtTy").value=fTy;$("mtTy")&&($("mtTy").disabled=false);
  if(!cur||!mts[cur]||mts[cur].x||tyOf(mts[cur])!==fTy)cur=ids[0]||null;
  $("mtSel").innerHTML=ids.map(function(id){var m=mts[id],a=ymd(m.d);return"<option value='"+id+"'"+(id===cur?" selected":"")+">"+(isDL(tyOf(m))?(a?kn(a[2])+" "+M[a[1]-1]+" "+kn(a[0]):"—")+" · "+esc(dlName(m)):"លើកទី"+kn(m.n)+(a?" · "+kn(a[2])+" "+M[a[1]-1]+" "+kn(a[0]):""))+(tyOf(m)==="p"?(mine(id)?" · ជាមួយ "+(shr(m.at).map(function(x){return x.n}).join(", ")||"—"):" · កត់ត្រាដោយ "+(m.rn||"")):"")+"</option>"}).join("")||"<option>— មិនទាន់មានកំណត់ហេតុ —</option>";
  var ce=cur&&canE(cur);
  $("mtEd").hidden=!ce;$("mtDel").hidden=!ce;$("mtPr").hidden=!cur;$("mtSel").disabled=!ids.length;$("mtNew").hidden=false;$("mtNew").textContent=isDL(fTy)?"➕ បង្កើតថ្មី":"➕ ប្រជុំថ្មី";
  b.innerHTML=cur?"<div class=mt-view>"+docHtml(mts[cur])+"</div>":"<p class=note>មិនទាន់មានកំណត់ហេតុ"+TN[fTy]+"ទេ។ ចុច «"+$("mtNew").textContent+"»។"+(isDL(fTy)?" 🔒 កំណត់ហេតុប្រចាំថ្ងៃ ឃើញតែអ្នកម្នាក់ប៉ុណ្ណោះ។":"")+"</p>";
}
function newMt(){
  if(isDL(fTy))return newDL(fTy);
  /* សមាសភាពស្រាប់ = តាមប្រជុំចុងក្រោយ (ដើមឡើយ ៨ នាក់ក្នុងក្រុម) */
  var ids=list(),n=nextN(fTy),d=new Date(),p=function(x){return("0"+x).slice(-2)};
  var last=fTy!=="p"&&ids.length?mts[ids[0]].at:null;
  return{ty:fTy,n:n,d:d.getFullYear()+"-"+p(d.getMonth()+1)+"-"+p(d.getDate()),pl:"BT",md:"ដោយផ្ទាល់",st:"11:20",en:"12:20",at:last&&last.length?JSON.parse(JSON.stringify(last)):fTy==="p"?[myAt()]:conv(AT0,fTy),ag:"",pr:"",rc:who.id,rn:who.name};
}
function drawEdit(){
  if(isDL(tyOf(edit.m)))return drawEditDL();
  var e=edit.m,inp=function(k,lbl,ty,w){return"<label>"+lbl+"<input data-k="+k+" type="+(ty||"text")+" value='"+esc(e[k]||"")+"'"+(w?" style='max-width:"+w+"'":"")+"></label>"};
  $("mtEd").hidden=$("mtDel").hidden=$("mtPr").hidden=$("mtNew").hidden=true;$("mtSel").disabled=true;if($("mtTy"))$("mtTy").disabled=true;
  $("mtBody").innerHTML="<div class='card mt-form'>"+
   "<h3>"+(edit.id?"✏️ កែកំណត់ហេតុ":"➕ ប្រជុំថ្មី")+"</h3>"+
   "<p class=note>ក្បាល ជើង និងកាលបរិច្ឆេទចន្ទគតិ បង្កើតស្វ័យប្រវត្តិ · អ្នកកត់ត្រា៖ <b>"+esc(e.rn)+"</b></p>"+
   "<div class=mt-grid><label>ប្រភេទប្រជុំ<select data-k=ty><option value=b"+(tyOf(e)==="b"?" selected":"")+">🛠️ ប្រជុំក្រុមបច្ចេកទេស</option><option value=r"+(tyOf(e)==="r"?" selected":"")+">👥 ប្រជុំរួម</option><option value=p"+(tyOf(e)==="p"?" selected":"")+">📚 ប្រជុំ PLC</option></select></label>"+inp("n","លើកទី","number","90px")+inp("d","កាលបរិច្ឆេទ","date")+inp("pl","ទីកន្លែងប្រជុំ")+
    "<label>មធ្យោបាយប្រជុំ<input data-k=md list=mtMd value='"+esc(e.md||"")+"'><datalist id=mtMd><option>ដោយផ្ទាល់</option><option>Online</option><option>ដោយផ្ទាល់និង online</option></datalist></label>"+
    inp("st","ម៉ោងចាប់ផ្ដើម","time")+inp("en","បញ្ចប់ម៉ោង","time")+"</div>"+
   "<div class=mt-lun id=mtLun>"+esc(lunar(e.d))+" "+esc(greg(e.d))+"</div>"+
   "<h4>I. សមាសភាពចូលរួម</h4><div id=mtAt>"+e.at.map(function(a,i){return"<div class=mt-ar><span>"+kn(i+1)+".</span>"+
     "<select data-a='"+i+"|t'><option"+(a.t==="លោកគ្រូ"?" selected":"")+">លោកគ្រូ</option><option"+(a.t==="អ្នកគ្រូ"?" selected":"")+">អ្នកគ្រូ</option><option"+(a.t!=="លោកគ្រូ"&&a.t!=="អ្នកគ្រូ"?" selected":"")+" value=''>—</option></select>"+
     "<input data-a='"+i+"|n' value='"+esc(a.n)+"' placeholder='ឈ្មោះ'><input data-a='"+i+"|r' list=mtRl value='"+esc(a.r||"")+"' placeholder='តួនាទី (បើមាន)'>"+
     "<button type=button class=mt-x data-rm="+i+" title='ដកចេញ'>✕</button></div>"}).join("")+"</div>"+
   (tyOf(e)==="p"?"<div class=bar style='margin:8px 0'><label for=mtShr><b>👩‍🏫 គ្រូចែករំលែក៖</b></label><select id=mtShr><option value=''>— ជ្រើសឈ្មោះគ្រូដែលអ្នកបានសួរ —</option>"+data.filter(function(t){return t.name&&t.id!==who.id}).map(function(t){return"<option value='"+esc(t.id)+"'"+(shr(e.at).some(function(a){return nk(a.n)===nk(t.name)})?" selected":"")+">"+esc(t.name)+"</option>"}).join("")+"</select><span class=note style='margin:0'>🔒 PLC នេះឃើញតែអ្នក និងគ្រូចែករំលែកប៉ុណ្ណោះ · ឈ្មោះនេះចេញក្នុងហត្ថលេខាកណ្ដាល</span></div>":"")+
   "<datalist id=mtRl>"+RL[tyOf(e)].map(function(r){return"<option>"+r+"</option>"}).join("")+"</datalist>"+
   "<div class=bar><select id=mtPick><option value=''>— ជ្រើសគ្រូដើម្បីបន្ថែម —</option>"+data.filter(function(t){return t.name&&!e.at.some(function(a){return nk(a.n)===nk(t.name)})}).map(function(t){return"<option value='"+esc(t.id)+"'>"+esc(t.name)+"</option>"}).join("")+"</select>"+
    "<button type=button id=mtAdd>➕ បន្ថែមគ្រូ</button><button type=button id=mtAddB>➕ បន្ថែមឈ្មោះផ្សេង</button></div>"+
   "<h4>II. របៀបវារៈ <small>(មួយបន្ទាត់ = មួយចំណុច)</small></h4><textarea data-k=ag rows=5 placeholder='១. ...&#10;២. ផ្សេងៗ'>"+esc(e.ag||"")+"</textarea>"+
   "<h4>III. ដំណើរការប្រជុំ</h4><p class=note>«# » ចំណងជើង · «* » ចំណុច ● · «- » ធាតុ · «-- » ធាតុរង · បន្ទាត់ធម្មតា = កថាខណ្ឌ</p>"+
   "<textarea data-k=pr rows=14 placeholder='# ក. ...&#10;- 1. ...'>"+esc(e.pr||"")+"</textarea>"+
   "<div class=bar><button type=button id=mtCancel>បោះបង់</button><button type=button id=mtPrev>👁️ មើលមុន</button><button type=button class=primary id=mtSave>💾 រក្សាទុក</button></div>"+
   "<div id=mtPv class=mt-view></div></div>";
}
function bind(){
  $("mtSel").onchange=function(){cur=this.value;draw()};
  if($("mtTy"))$("mtTy").onchange=function(){fTy=vTy(this.value);try{localStorage.setItem("mtTy",fTy)}catch(e){}cur=null;draw()};
  $("mtNew").onclick=function(){var d=dGet();edit=d&&!d.id&&confirm("មានសេចក្ដីព្រាងកំណត់ហេតុថ្មីដែលមិនទាន់រក្សាទុក។ បន្តសរសេរពីសេចក្ដីព្រាងនោះ?")?{id:null,m:d.m}:{id:null,m:newMt()};draw()};
  $("mtEd").onclick=function(){if(cur&&canE(cur)){var d=dGet();edit=d&&d.id===cur&&confirm("មានការកែកំណត់ហេតុនេះដែលមិនទាន់រក្សាទុក។ បន្តពីសេចក្ដីព្រាងនោះ?")?{id:cur,m:d.m}:{id:cur,m:JSON.parse(JSON.stringify(mts[cur]))};draw()}};
  $("mtPr").onclick=function(){if(!cur)return;var X=window.SCHX;(X?X.fontsOk():Promise.resolve()).then(function(){doPrint(docHtml(mts[cur]))})};
  $("mtDel").onclick=function(){
    var b=this;if(!cur||!canE(cur))return;
    if(b.dataset.ok!=="1"){b.dataset.ok="1";b.textContent="⚠️ ចុចម្ដងទៀតដើម្បីលុប";setTimeout(function(){b.dataset.ok="";b.textContent="🗑️ លុប"},3000);return}
    b.dataset.ok="";b.textContent="🗑️ លុប";
    var id=cur,ref=window.FB.doc(window.db,mts[id]._c||"mt",id),o=owner(id,mts[id])||who.id;
    (SEEDS[id]?window.FB.setDoc(ref,{o:o,x:true,j:"null",u:new Date().toISOString()}):window.FB.deleteDoc(ref))
      .then(function(){mts[id]={x:1};cur=null;draw();notify("បានលុបកំណត់ហេតុប្រជុំ")})
      .catch(function(e){console.error(e);notify("លុបមិនបាន៖ "+(e.code||e.message))});
  };
  var body=$("mtBody");
  /* សេចក្ដីព្រាង៖ រាល់ការកែ → រក្សាក្នុងកុំព្យូទ័រ (មិនបាត់ពេលបិទ/ផ្ទុកទំព័រ) រហូតដល់ចុច «រក្សាទុក» ឬ «បោះបង់» */
  ["input","change","click"].forEach(function(t){body.addEventListener(t,function(){setTimeout(dPut,0)})});
  body.addEventListener("input",function(ev){
    if(!edit)return;var t=ev.target,e=edit.m;
    if(t.id==="mtShr"){var x=data.filter(function(q){return q.id===t.value})[0];e.at=e.at.filter(function(a){return String(a.r||"").trim()!=="គ្រូចែករំលែក"});if(x){e.at=e.at.filter(function(a){return nk(a.n)!==nk(x.name)});e.at.unshift({t:x.g==="ស្រី"?"អ្នកគ្រូ":"លោកគ្រូ",n:x.name,r:"គ្រូចែករំលែក"})}drawEdit();return}
    if(t.dataset.k==="ty"){e.ty=vTy(t.value);if(!edit.id||tyOf(mts[edit.id])!==e.ty)e.n=nextN(e.ty,edit.id);e.at=e.ty==="p"&&!edit.id?[myAt()].concat(shr(e.at)):conv(e.at,e.ty);drawEdit()}
    else if(t.dataset.k){e[t.dataset.k]=t.dataset.k==="n"?(+t.value||1):t.value;if(t.dataset.k==="d"&&$("mtLun"))$("mtLun").textContent=lunar(e.d)+" "+greg(e.d)}
    else if(t.dataset.a){var a=t.dataset.a.split("|");e.at[+a[0]][a[1]]=t.value}
  });
  body.addEventListener("change",function(ev){var t=ev.target;if(edit&&t.id==="mtShr"){if(t.isConnected)t.dispatchEvent(new Event("input",{bubbles:true}));return}if(edit&&t.dataset.k==="ty"&&tyOf(edit.m)!==t.value){t.dispatchEvent(new Event("input",{bubbles:true}));return}if(edit&&t.dataset.a){var a=t.dataset.a.split("|");edit.m.at[+a[0]][a[1]]=t.value}});
  body.addEventListener("click",function(ev){
    if(!edit)return;var t=ev.target,e=edit.m;
    if(t.dataset.rm!=null){e.at.splice(+t.dataset.rm,1);drawEdit()}
    else if(t.id==="mtAdd"){var id=$("mtPick").value,x=data.filter(function(q){return q.id===id})[0];if(!x)return;e.at.push({t:x.g==="ស្រី"?"អ្នកគ្រូ":"លោកគ្រូ",n:x.name,r:RD[tyOf(e)]});drawEdit()}
    else if(t.id==="mtAddB"){e.at.push({t:"លោកគ្រូ",n:"",r:RD[tyOf(e)]});drawEdit();var ins=body.querySelectorAll("#mtAt input[data-a$='|n']");if(ins.length)ins[ins.length-1].focus()}
    else if(t.id==="mtCancel"){edit=null;dDel();draw()}
    else if(t.id==="mtPrev"){$("mtPv").innerHTML=docHtml(e);$("mtPv").scrollIntoView({behavior:"smooth"})}
    else if(t.id==="mtSave"){
      if(!e.d){notify("សូមបញ្ចូលកាលបរិច្ឆេទ");return}
      if(e.at)e.at=e.at.filter(function(a){return String(a.n||"").trim()});
      var id=edit.id||("m"+Date.now().toString(36));
      if(!edit.id){e.rc=who.id;e.rn=who.name}
      mts[id]=e;t.disabled=true;mtBusy=true;
      save(id).then(function(){mtBusy=false;edit=null;dDel();fTy=tyOf(e);try{localStorage.setItem("mtTy",fTy)}catch(x){}cur=id;draw();notify("បានរក្សាទុកកំណត់ហេតុប្រជុំ")})
        .catch(function(er){mtBusy=false;t.disabled=false;console.error(er);notify("រក្សាទុកមិនបាន៖ "+(er.code||er.message))});
    }
  });
}
var DK="mtDraft",mtBusy=false;
function dKey(){return DK+"_"+(window.who&&who.id||"")}
function dGet(){try{return JSON.parse(localStorage.getItem(dKey())||"null")}catch(e){return null}}
function dPut(){if(!edit)return;try{localStorage.setItem(dKey(),JSON.stringify({id:edit.id,m:edit.m,at:Date.now()}))}catch(e){}}
function dDel(){try{localStorage.removeItem(dKey())}catch(e){}}
window.MTSAVE={dirty:function(){return!!edit},busy:function(){return mtBusy},save:function(){var b=$("mtSave");if(b)b.click()}};
if($("mtBody"))bind();
window.renderMt=renderMt;
window.MTG={docHtml:docHtml,seeds:SEEDS};
})();
