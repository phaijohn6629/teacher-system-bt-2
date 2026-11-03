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
function list(){return Object.keys(mts).filter(function(id){return !mts[id].x}).sort(function(a,b){return(mts[b].n-mts[a].n)||String(mts[b].d).localeCompare(mts[a].d)})}

function load(){
  mts={};Object.keys(SEEDS).forEach(function(id){mts[id]=JSON.parse(JSON.stringify(SEEDS[id]))});
  if(!window.db||!window.FB)return Promise.resolve();
  return window.FB.getDocs(window.FB.collection(window.db,"mt")).then(function(sn){
    sn.forEach(function(d){var v=d.data(),m;try{m=JSON.parse(v.j)}catch(e){m=null}
      if(m){m.o=v.o;mts[d.id]=m}else if(v.x)mts[d.id]={x:1}});
    loaded=true;
  }).catch(function(e){console.error("mt load",e)});
}
function save(id){
  var m=mts[id],o=owner(id,m)||who.id,v=JSON.parse(JSON.stringify(m));delete v.o;
  return window.FB.setDoc(window.FB.doc(window.db,"mt",id),{o:o,j:JSON.stringify(v),u:new Date().toISOString()}).then(function(){m.o=o});
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
  var X=window.SCHX,h=head(),rid=m.rc||idByName(m.rn),sg=function(id){return X&&id?X.getSig(id):""};
  var at=(m.at||[]).filter(function(a){return a.n}),half=Math.ceil(at.length/2);
  var atl=function(a,i){return"<div>"+kn(i+1)+". "+esc((a.t?a.t+" ":"")+a.n)+(a.r?" ("+esc(a.r)+")":"")+"</div>"};
  var sig=function(id){var s=sg(id);return"<div class=mt-sg>"+(s?"<img src='"+s+"' alt=''>":"")+"</div>"};
  return"<div class='pg mt-doc'>"+
   "<div class=mt-top><div class=mt-sch><img src='"+LOGOBT()+"' alt=''><div class=moul>វិទ្យាល័យបឹងត្របែក</div><div class=moul>សាលារៀនជំនាន់ថ្មី</div></div>"+
    "<div class=mt-kh><div class=moul>ព្រះរាជាណាចក្រកម្ពុជា</div><div class=moul>ជាតិ សាសនា ព្រះមហាក្សត្រ</div><div class=mt-orn>❧❧❧</div></div></div>"+
   "<div class='moul mt-ti'>កំណត់ហេតុប្រជុំក្រុមបច្ចេកទេស លើកទី"+kn(m.n)+"</div>"+
   "<p class=mt-p>"+esc(lunar(m.d).replace("ព.ស.","ពុទ្ធសករាជ"))+" "+esc(greg(m.d))+" នៃវិទ្យាល័យបឹងត្របែក សាលារៀនជំនាន់ថ្មី បានរៀបចំប្រជុំបច្ចេកទេសលើកទី "+n2(m.n)+" ។</p>"+
   "<div class=mt-li>❖ ទីកន្លែងប្រជុំ៖ "+esc(m.pl||"")+"</div><div class=mt-li>❖ មធ្យោបាយប្រជុំ៖ "+esc(m.md||"")+"</div>"+
   "<div class=mt-li>❖ ម៉ោងចាប់ផ្ដើម៖ "+esc(tm(m.st))+" នាទី បញ្ចប់ម៉ោង "+esc(tm(m.en))+" នាទី ថ្ងៃត្រង់</div>"+
   "<div class=mt-s>I. សមាសភាពចូលរួម</div><div class=mt-at><div>"+at.slice(0,half).map(atl).join("")+"</div><div>"+at.slice(half).map(function(a,i){return atl(a,i+half)}).join("")+"</div></div>"+
   "<div class=mt-s>II. របៀបវារៈ</div>"+String(m.ag||"").split("\n").filter(function(l){return l.trim()}).map(function(l){return"<div class=mt-i>"+esc(l.trim())+"</div>"}).join("")+
   "<div class=mt-s>III. ដំណើរការប្រជុំ</div>"+prHtml(m.pr)+
   "<div class=mt-ft><div class=mt-dt><div>"+esc(lunar(m.d))+"</div><div>"+esc(greg(m.d))+"</div></div>"+
    "<div class=mt-cols><div><div>បានឃើញ និងពិនិត្យ</div><div class=moul>ជ.គណៈគ្រប់គ្រងសាលារៀនជំនាន់ថ្មី</div></div>"+
     "<div><div>បានឃើញ និងពិនិត្យ</div><div class=moul>ប្រធានក្រុមបច្ចេកទេស</div>"+sig(h.id)+"<div class=moul>"+esc(h.n)+"</div></div>"+
     "<div><div>&nbsp;</div><div class=moul>អ្នកកត់ត្រា</div>"+sig(rid)+"<div class=moul>"+esc(m.rn||"")+"</div></div></div></div>"+
  "</div>";
}

/* ---------- ផ្ទាំង ---------- */
function renderMt(){
  if(!who)return;
  (loaded?Promise.resolve():load()).then(draw);
}
function draw(){
  var b=$("mtBody");if(!b)return;
  if(edit)return drawEdit();
  var ids=list();
  if(!cur||!mts[cur]||mts[cur].x)cur=ids[0]||null;
  $("mtSel").innerHTML=ids.map(function(id){var m=mts[id],a=ymd(m.d);return"<option value='"+id+"'"+(id===cur?" selected":"")+">លើកទី"+kn(m.n)+(a?" · "+kn(a[2])+" "+M[a[1]-1]+" "+kn(a[0]):"")+"</option>"}).join("")||"<option>— មិនទាន់មានកំណត់ហេតុ —</option>";
  var ce=cur&&canE(cur);
  $("mtEd").hidden=!ce;$("mtDel").hidden=!ce;$("mtPr").hidden=!cur;$("mtSel").disabled=!ids.length;$("mtNew").hidden=false;
  b.innerHTML=cur?"<div class=mt-view>"+docHtml(mts[cur])+"</div>":"<p class=note>មិនទាន់មានកំណត់ហេតុប្រជុំទេ។ ចុច «➕ ប្រជុំថ្មី»។</p>";
}
function newMt(){
  /* សមាសភាពស្រាប់ = តាមប្រជុំចុងក្រោយ (ដើមឡើយ ៨ នាក់ក្នុងក្រុម) */
  var ids=list(),n=ids.reduce(function(s,id){return Math.max(s,+mts[id].n||0)},0)+1,d=new Date(),p=function(x){return("0"+x).slice(-2)};
  var last=ids.length?mts[ids[0]].at:null;
  return{n:n,d:d.getFullYear()+"-"+p(d.getMonth()+1)+"-"+p(d.getDate()),pl:"BT",md:"ដោយផ្ទាល់",st:"11:20",en:"12:20",at:JSON.parse(JSON.stringify(last&&last.length?last:AT0)),ag:"",pr:"",rc:who.id,rn:who.name};
}
function drawEdit(){
  var e=edit.m,inp=function(k,lbl,ty,w){return"<label>"+lbl+"<input data-k="+k+" type="+(ty||"text")+" value='"+esc(e[k]||"")+"'"+(w?" style='max-width:"+w+"'":"")+"></label>"};
  $("mtEd").hidden=$("mtDel").hidden=$("mtPr").hidden=$("mtNew").hidden=true;$("mtSel").disabled=true;
  $("mtBody").innerHTML="<div class='card mt-form'>"+
   "<h3>"+(edit.id?"✏️ កែកំណត់ហេតុ":"➕ ប្រជុំថ្មី")+"</h3>"+
   "<p class=note>ក្បាល ជើង និងកាលបរិច្ឆេទចន្ទគតិ បង្កើតស្វ័យប្រវត្តិ · អ្នកកត់ត្រា៖ <b>"+esc(e.rn)+"</b></p>"+
   "<div class=mt-grid>"+inp("n","លើកទី","number","90px")+inp("d","កាលបរិច្ឆេទ","date")+inp("pl","ទីកន្លែងប្រជុំ")+
    "<label>មធ្យោបាយប្រជុំ<input data-k=md list=mtMd value='"+esc(e.md||"")+"'><datalist id=mtMd><option>ដោយផ្ទាល់</option><option>Online</option><option>ដោយផ្ទាល់និង online</option></datalist></label>"+
    inp("st","ម៉ោងចាប់ផ្ដើម","time")+inp("en","បញ្ចប់ម៉ោង","time")+"</div>"+
   "<div class=mt-lun id=mtLun>"+esc(lunar(e.d))+" "+esc(greg(e.d))+"</div>"+
   "<h4>I. សមាសភាពចូលរួម</h4><div id=mtAt>"+e.at.map(function(a,i){return"<div class=mt-ar><span>"+kn(i+1)+".</span>"+
     "<select data-a='"+i+"|t'><option"+(a.t==="លោកគ្រូ"?" selected":"")+">លោកគ្រូ</option><option"+(a.t==="អ្នកគ្រូ"?" selected":"")+">អ្នកគ្រូ</option><option"+(a.t!=="លោកគ្រូ"&&a.t!=="អ្នកគ្រូ"?" selected":"")+" value=''>—</option></select>"+
     "<input data-a='"+i+"|n' value='"+esc(a.n)+"' placeholder='ឈ្មោះ'><input data-a='"+i+"|r' value='"+esc(a.r||"")+"' placeholder='តួនាទី (បើមាន)'>"+
     "<button type=button class=mt-x data-rm="+i+" title='ដកចេញ'>✕</button></div>"}).join("")+"</div>"+
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
  $("mtNew").onclick=function(){var d=dGet();edit=d&&!d.id&&confirm("មានសេចក្ដីព្រាងកំណត់ហេតុថ្មីដែលមិនទាន់រក្សាទុក។ បន្តសរសេរពីសេចក្ដីព្រាងនោះ?")?{id:null,m:d.m}:{id:null,m:newMt()};draw()};
  $("mtEd").onclick=function(){if(cur&&canE(cur)){var d=dGet();edit=d&&d.id===cur&&confirm("មានការកែកំណត់ហេតុនេះដែលមិនទាន់រក្សាទុក។ បន្តពីសេចក្ដីព្រាងនោះ?")?{id:cur,m:d.m}:{id:cur,m:JSON.parse(JSON.stringify(mts[cur]))};draw()}};
  $("mtPr").onclick=function(){if(!cur)return;var X=window.SCHX;(X?X.fontsOk():Promise.resolve()).then(function(){doPrint(docHtml(mts[cur]))})};
  $("mtDel").onclick=function(){
    var b=this;if(!cur||!canE(cur))return;
    if(b.dataset.ok!=="1"){b.dataset.ok="1";b.textContent="⚠️ ចុចម្ដងទៀតដើម្បីលុប";setTimeout(function(){b.dataset.ok="";b.textContent="🗑️ លុប"},3000);return}
    b.dataset.ok="";b.textContent="🗑️ លុប";
    var id=cur,ref=window.FB.doc(window.db,"mt",id),o=owner(id,mts[id])||who.id;
    (SEEDS[id]?window.FB.setDoc(ref,{o:o,x:true,j:"null",u:new Date().toISOString()}):window.FB.deleteDoc(ref))
      .then(function(){mts[id]={x:1};cur=null;draw();notify("បានលុបកំណត់ហេតុប្រជុំ")})
      .catch(function(e){console.error(e);notify("លុបមិនបាន៖ "+(e.code||e.message))});
  };
  var body=$("mtBody");
  /* សេចក្ដីព្រាង៖ រាល់ការកែ → រក្សាក្នុងកុំព្យូទ័រ (មិនបាត់ពេលបិទ/ផ្ទុកទំព័រ) រហូតដល់ចុច «រក្សាទុក» ឬ «បោះបង់» */
  ["input","change","click"].forEach(function(t){body.addEventListener(t,function(){setTimeout(dPut,0)})});
  body.addEventListener("input",function(ev){
    if(!edit)return;var t=ev.target,e=edit.m;
    if(t.dataset.k){e[t.dataset.k]=t.dataset.k==="n"?(+t.value||1):t.value;if(t.dataset.k==="d")$("mtLun").textContent=lunar(e.d)+" "+greg(e.d)}
    else if(t.dataset.a){var a=t.dataset.a.split("|");e.at[+a[0]][a[1]]=t.value}
  });
  body.addEventListener("change",function(ev){var t=ev.target;if(edit&&t.dataset.a){var a=t.dataset.a.split("|");edit.m.at[+a[0]][a[1]]=t.value}});
  body.addEventListener("click",function(ev){
    if(!edit)return;var t=ev.target,e=edit.m;
    if(t.dataset.rm!=null){e.at.splice(+t.dataset.rm,1);drawEdit()}
    else if(t.id==="mtAdd"){var id=$("mtPick").value,x=data.filter(function(q){return q.id===id})[0];if(!x)return;e.at.push({t:x.g==="ស្រី"?"អ្នកគ្រូ":"លោកគ្រូ",n:x.name,r:""});drawEdit()}
    else if(t.id==="mtAddB"){e.at.push({t:"លោកគ្រូ",n:"",r:""});drawEdit();var ins=body.querySelectorAll("#mtAt input[data-a$='|n']");if(ins.length)ins[ins.length-1].focus()}
    else if(t.id==="mtCancel"){edit=null;dDel();draw()}
    else if(t.id==="mtPrev"){$("mtPv").innerHTML=docHtml(e);$("mtPv").scrollIntoView({behavior:"smooth"})}
    else if(t.id==="mtSave"){
      if(!e.d){notify("សូមបញ្ចូលកាលបរិច្ឆេទ");return}
      e.at=e.at.filter(function(a){return String(a.n||"").trim()});
      var id=edit.id||("m"+Date.now().toString(36));
      if(!edit.id){e.rc=who.id;e.rn=who.name}
      mts[id]=e;t.disabled=true;mtBusy=true;
      save(id).then(function(){mtBusy=false;edit=null;dDel();cur=id;draw();notify("បានរក្សាទុកកំណត់ហេតុប្រជុំ")})
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
