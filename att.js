/* ========================================================================
   ស្រង់វត្តមានតាមម៉ោង + 📜 កំណត់ហេតុវត្តមាន (ផ្ទាំង «សិស្ស និងអវត្តមាន»)
   - ប្រធាន/អនុប្រធានថ្នាក់ ឬគ្រូ ជ្រើសថ្ងៃ → ម៉ោងសិក្សារបស់ថ្នាក់ (ពីកាលវិភាគគ្រូទាំងអស់) → ស្រង់
   - Firestore att/{ID គ្រូ}_{ថ្នាក់}_{YYYY-MM} = {o, k, m, d:{"DD":{"ម៉ោង":{r:{គន្លឹះសិស្ស:"L"|"E"|"U"}, by, bn, at, s, t}}}}
     រក្សាទុកតែសិស្សដែលមិនមក (L = យឺត · E = ច្បាប់ · U = ឥតច្បាប់) · មានកំណត់ត្រា = ម៉ោងនោះបានស្រង់រួច
     "ម៉ោង" = "3" ឬ "3-4" (ម៉ោងជាប់គ្នា មុខវិជ្ជាដដែល = ១ ដង · រាប់ជាចំនួនម៉ោង)
   - ប្រធានថ្នាក់ស្រង់/កែបានតែថ្ងៃនេះ និងម្សិលមិញ · គ្រូកែបានគ្រប់ថ្ងៃ · ការកែរបស់ប្រធានថ្នាក់ចូល «ប្រវត្តិសកម្មភាព» (mclog)
   - មិនប៉ះពាល់ចំនួនអវត្តមានប្រចាំខែ (s.ab) ដែលមានស្រាប់
   - tx = «ផៃ ចន(L), សុខា(P), ដារា(A)» → excerpt.js បំពេញ «អវត្តមានសិស្ស» ក្នុងសម្រង់អត្ថបទរបស់គ្រូដែលបង្រៀនម៉ោងនោះ (cn = ឈ្មោះថ្នាក់ សម្រាប់ស្វែងរក)
   ត្រូវផ្ទុកបន្ទាប់ពី script.js · sched.js · monitor.js
   ======================================================================== */
(function(){
"use strict";
var CODE={L:{t:"មកយឺត",ic:"⏰",c:"late"},E:{t:"ច្បាប់",ic:"📝",c:"exc"},U:{t:"ឥតច្បាប់",ic:"❌",c:"une"}},CYC=["","L","E","U"];
var A={day:"",ed:null,draft:{},docs:{},busy:false,logMo:"",logOpen:false,logSt:""};
function isMon(){return !!(who&&who.role==="monitor")}
function p2(n){return(n<10?"0":"")+n}
function ck(n){return String(n||"").replace(/[^A-Za-z0-9-]/g,"")}
function skey(s){return s.id?"i:"+s.id:"n:"+s.n}
function today(){var d=new Date();return d.getFullYear()+"-"+p2(d.getMonth()+1)+"-"+p2(d.getDate())}
function dOf(s){var a=s.split("-").map(Number);return new Date(a[0],a[1]-1,a[2])}
function dLabel(s){var a=s.split("-").map(Number);return"ថ្ងៃ"+KhCal.WD[dOf(s).getDay()]+" "+kn(p2(a[2])+"/"+p2(a[1])+"/"+a[0])}
function hrs(p){var m=/^(\d+)(?:-(\d+))?$/.exec(p);return m?(+(m[2]||m[1]))-(+m[1])+1:1}
function pFirst(p){return+(/^\d+/.exec(p)||[99])[0]}
function pName(p){var m=/^(\d+)(?:-(\d+))?$/.exec(p);if(!m)return esc(p);var a=+m[1],b=+(m[2]||a),PT=window.SCHX&&SCHX.PT||[];
  return"ម៉ោងទី"+kn(a)+(b>a?"–"+kn(b):"")+(PT[a]&&PT[b]?" <small>"+kn(PT[a].split(" - ")[0]+"–"+PT[b].split(" - ")[1])+"</small>":"")}

/* ---------- ម៉ោងសិក្សានៃថ្នាក់ (កាលវិភាគគ្រូទាំងអស់) ៖ [[ថ្ងៃ 0=ច័ន្ទ, ម៉ោង, មុខវិជ្ជា, គ្រូ]] ---------- */
function periodsAll(cn){
  if(!window.SCHX||typeof data==="undefined")return[];
  var out=[];
  data.forEach(function(t){SCHX.schOf(t.id).forEach(function(x){if(x[2]===cn&&x[4]!=="D")out.push([x[0],x[1],t.sub||"",t.name||t.id])})});
  return out.sort(function(a,b){return a[0]-b[0]||a[1]-b[1]});
}
/* ម៉ោងនៃថ្ងៃមួយ៖ ម៉ោងជាប់គ្នា (គ្មានសម្រាក) មុខវិជ្ជា/គ្រូដដែល → ប្លុកតែមួយ */
function blocksOf(list,di){
  var by={};list.filter(function(x){return x[0]===di}).forEach(function(x){
    var o=by[x[1]]||(by[x[1]]={p:x[1],s:[],t:[]});if(x[2]&&o.s.indexOf(x[2])<0)o.s.push(x[2]);if(x[3]&&o.t.indexOf(x[3])<0)o.t.push(x[3])});
  var ps=Object.keys(by).map(Number).sort(function(a,b){return a-b}),BRK=window.SCHX&&SCHX.BRK||{},out=[];
  ps.forEach(function(p){var o=by[p],s=o.s.join(" / "),t=o.t.join(" / "),l=out[out.length-1];
    if(l&&l.b===p-1&&!BRK[p-1]&&l.s===s&&l.t===t)l.b=p;else out.push({a:p,b:p,s:s,t:t})});
  return out.map(function(x){return{p:x.a+(x.b>x.a?"-"+x.b:""),s:x.s,t:x.t}});
}
function ctx(){
  var c=curCls();if(!c)return null;
  var mon=isMon(),k=mon?who.mk:rt+"_"+ck(c.n),tid=mon?who.id:rt;
  var list;
  if(mon){var j=window.MONUI&&MONUI.j();list=j&&j.sca&&j.sca.length?j.sca:((j&&j.sch)||[]).map(function(x){return[x[0],x[1],"",j.tn||""]})}
  else list=periodsAll(c.n);
  return{c:c,k:k,tid:tid,mon:mon,list:list,ed:mon||canM()};
}
function docId(x,mo){return x.k+"_"+mo}
function canDay(x,day){
  if(!x.ed)return false;if(!x.mon)return true;
  var y=new Date();y.setDate(y.getDate()-1);var ys=y.getFullYear()+"-"+p2(y.getMonth()+1)+"-"+p2(y.getDate());
  return day===today()||day===ys;
}
function load(x,mo,force){
  var id=docId(x,mo);
  if(A.docs[id]&&!force)return Promise.resolve(A.docs[id]);
  if(A.docs[id]&&A.docs[id].p)return A.docs[id].p;
  var o={p:null,d:null,err:""};A.docs[id]=o;
  o.p=FB.getDoc(FB.doc(db,"att",id)).then(function(sn){o.d=sn.exists()?(sn.data().d||{}):{};o.p=null;return o},
    function(e){console.error("att:",e);o.d={};o.err=e&&e.code==="permission-denied"?"គ្មានសិទ្ធិ (សូម Admin Publish firestore.rules កំណែថ្មី · មាន att)":"មិនអាចផ្ទុកបានទេ";o.p=null;return o});
  return o.p;
}
function recOf(x,day){var o=A.docs[docId(x,day.slice(0,7))];return o&&o.d?(o.d[day.slice(8)]||{}):null}

/* ---------- ប្រអប់ក្នុងផ្ទាំង ---------- */
function box(){
  var el=$("attBox");if(!el)return;
  var x=(typeof pv==="undefined"||pv!==3)&&window.db?ctx():null;
  if(!x||!x.c.st.length){el.innerHTML="";return}
  if(!A.day)A.day=today();
  var mo=A.day.slice(0,7),o=A.docs[docId(x,mo)];
  if(!o||(!o.d&&!o.p)){load(x,mo).then(box);}
  var di=(dOf(A.day).getDay()+6)%7,sun=dOf(A.day).getDay()===0,hol=window.SCHX&&SCHX.FIXHOL[A.day.slice(5)];
  var R=recOf(x,A.day),bl=sun?[]:blocksOf(x.list,di),seen={};bl.forEach(function(b){seen[b.p]=1});
  if(R)Object.keys(R).forEach(function(p){if(!seen[p])bl.push({p:p,s:R[p].s||"",t:R[p].t||"",x:1})});
  bl.sort(function(a,b){return pFirst(a.p)-pFirst(b.p)});
  var done=bl.filter(function(b){return R&&R[b.p]}).length,ed=canDay(x,A.day);
  var h="<div class=att-box><div class=att-h><b>🕘 ស្រង់វត្តមានតាមម៉ោង</b>"+
    "<input type=date id=attDay value='"+A.day+"' max='"+today()+"'><button type=button data-att=today>ថ្ងៃនេះ</button>"+
    "<span class=att-prog>"+(bl.length?"បានស្រង់ <b>"+kn(done)+"/"+kn(bl.length)+"</b> ម៉ោង":"")+"</span>"+
    "<button type=button class=primary data-att=log>📜 កំណត់ហេតុវត្តមាន</button></div>";
  if(o&&o.err)h+="<p class=cxwarn>⚠️ "+esc(o.err)+"</p>";
  if(!R)h+="<p class=note>កំពុងផ្ទុក…</p>";
  else{
    h+="<div class=att-day>"+esc(dLabel(A.day))+(hol?" · <span class=att-hol>ថ្ងៃបុណ្យ</span>":"")+(x.mon&&!ed?" · <span class=note style='margin:0'>🔒 ប្រធានថ្នាក់ស្រង់/កែបានតែថ្ងៃនេះ និងម្សិលមិញ</span>":"")+"</div>";
    if(!bl.length)h+="<p class=note>"+(sun?"ថ្ងៃអាទិត្យ — គ្មានម៉ោងសិក្សា។":"មិនមានម៉ោងសិក្សាក្នុងកាលវិភាគសម្រាប់ថ្ងៃនេះទេ។")+(ed&&!sun?" ចុច «＋ ម៉ោងផ្សេង» ដើម្បីស្រង់។":"")+"</p>";
    h+="<div class=att-ps>"+bl.map(function(b){
      var r=R[b.p],cnt={L:0,E:0,U:0};if(r)Object.keys(r.r||{}).forEach(function(s){cnt[r.r[s]]=(cnt[r.r[s]]||0)+1});
      return"<div class='att-p"+(r?" on":"")+(A.ed===b.p?" cur":"")+"'><div class=att-pt>"+(r?"✅":"⏳")+" "+pName(b.p)+"</div>"+
        "<div class=att-ps2>"+esc(b.s||"—")+(b.t?" · "+esc(b.t):"")+"</div>"+
        (r?"<div class=att-pc>"+(cnt.U?"<span class=att-une>❌ "+kn(cnt.U)+"</span>":"")+(cnt.E?"<span class=att-exc>📝 "+kn(cnt.E)+"</span>":"")+(cnt.L?"<span class=att-late>⏰ "+kn(cnt.L)+"</span>":"")+(!cnt.U&&!cnt.E&&!cnt.L?"<span>មកគ្រប់</span>":"")+
          "<small>"+esc(r.bn||r.by||"")+" · "+tm(r.at)+"</small></div>":"")+
        (ed?"<button type=button data-att='ed|"+esc(b.p)+"' data-s='"+esc(b.s)+"' data-t='"+esc(b.t)+"'>"+(r?"✏️ កែ":"📋 ស្រង់")+"</button>":"")+"</div>"}).join("")+
      (ed?"<button type=button class=att-add data-att=add>＋ ម៉ោងផ្សេង</button>":"")+"</div>";
    if(A.ed&&ed)h+=editor(x,R);
  }
  el.innerHTML=h+"</div>";
}
function tm(at){if(!at)return"";var d=new Date(at);return kn(p2(d.getHours())+":"+p2(d.getMinutes()))}
function editor(x,R){
  var n={L:0,E:0,U:0};Object.keys(A.draft).forEach(function(k){n[A.draft[k]]++});
  return"<div class=att-ed><div class=att-eh><b>📋 "+pName(A.ed)+"</b> "+esc(A.es||"")+"<span class=note style='margin:0'>ចុចលើឈ្មោះ ដើម្បីប្ដូរ ✅ មក → ⏰ យឺត → 📝 ច្បាប់ → ❌ ឥតច្បាប់</span></div>"+
    "<div class=att-st>"+x.c.st.map(function(s,i){var k=skey(s),v=A.draft[k]||"",C=CODE[v];
      return"<button type=button class='att-s"+(C?" "+C.c:"")+"' data-atts='"+esc(k)+"'><span>"+kn(i+1)+"</span>"+esc(s.n)+"<i>"+(C?C.ic+" "+C.t:"✅")+"</i></button>"}).join("")+"</div>"+
    "<div class=att-ef><span>✅ មក <b>"+kn(x.c.st.length-n.L-n.E-n.U)+"</b> · ⏰ <b>"+kn(n.L)+"</b> · 📝 <b>"+kn(n.E)+"</b> · ❌ <b>"+kn(n.U)+"</b></span>"+
    "<button type=button data-att=cancel>បោះបង់</button><button type=button class=primary data-att=save"+(A.busy?" disabled":"")+">💾 រក្សាទុក</button></div></div>";
}
function save(x){
  var day=A.day,mo=day.slice(0,7),dd=day.slice(8),p=A.ed,id=docId(x,mo),ref=FB.doc(db,"att",id),me=prof&&prof.id||who.id;
  var nm=x.mon?(who.msn||me)+" ("+(who.rl||"ប្រធានថ្នាក់")+")":(who.name||me);
  var r={};Object.keys(A.draft).forEach(function(k){if(CODE[A.draft[k]])r[k]=A.draft[k]});
  /* tx = អត្ថបទសម្រាប់ «សម្រង់អត្ថបទ» (excerpt.js)៖ ផៃ ចន(L), សុខា(P), ដារា(A) — តាមលំដាប់បញ្ជីឈ្មោះ */
  var TX={L:"L",E:"P",U:"A"},tx=x.c.st.filter(function(s){return r[skey(s)]}).map(function(s){return s.n+"("+TX[r[skey(s)]]+")"}).join(", ");
  var rec={r:r,tx:tx,by:me,bn:nm,at:Date.now(),s:A.es||"",t:A.et||""},old=null;
  A.busy=true;box();
  return FB.runTransaction(db,function(tx){
    return tx.get(ref).then(function(sn){
      var d=sn.exists()?(sn.data().d||{}):{};old=d[dd]&&d[dd][p]||null;d[dd]=d[dd]||{};d[dd][p]=rec;
      tx.set(ref,{o:x.tid,k:x.k,m:mo,cn:x.c.n,d:d});return d;
    });
  }).then(function(d){
    var o=A.docs[id]||(A.docs[id]={});o.d=d;o.err="";A.busy=false;A.ed=null;A.draft={};box();
    notify("បានរក្សាទុកវត្តមាន "+pName(p).replace(/<[^>]+>/g,""));
    if(x.mon)mLog(x,day,p,old,r);
  },function(e){A.busy=false;console.error("att save:",e);box();
    alert(e&&e.code==="permission-denied"?"គ្មានសិទ្ធិ។ សូម Admin Publish firestore.rules កំណែថ្មី (មាន att)។":"មិនអាចរក្សាទុកបានទេ · សូមពិនិត្យអ៊ីនធឺណិត")});
}
/* ប្រវត្តិសកម្មភាព (ដូច monitor.js) */
function mLog(x,day,p,old,r){
  var nm={};x.c.st.forEach(function(s){nm[skey(s)]=s.n});
  var parts=["U","E","L"].map(function(c){var a=Object.keys(r).filter(function(k){return r[k]===c}).map(function(k){return nm[k]||k});return a.length?CODE[c].ic+" "+CODE[c].t+"៖ "+a.join(", "):""}).filter(Boolean);
  var a=["វត្តមាន "+kn(day.slice(8)+"/"+day.slice(5,7))+" ម៉ោងទី"+kn(p)+(old?" (កែ)":"")+"៖ "+(parts.length?parts.join(" · "):"មកគ្រប់")];
  FB.addDoc(FB.collection(db,"mclog"),{k:who.mk,o:who.id,by:prof.id,r:who.mr||"h",sn:who.msn||"",at:FB.serverTimestamp(),a:[a[0].slice(0,900)]}).catch(function(e){console.warn("mclog:",e)});
}

/* ---------- 📜 កំណត់ហេតុវត្តមាន (ផ្ទាំងលោតចេញ) ---------- */
function logDlg(){
  var x=ctx();if(!x)return;
  if(!A.logMo)A.logMo=A.day.slice(0,7);
  var d=$("attDlg");if(!d){d=document.createElement("dialog");d.id="attDlg";d.className="wide";document.body.appendChild(d);
    d.addEventListener("click",function(e){var b=e.target.closest("[data-al]");if(e.target===d)d.close();if(!b)return;var a=b.dataset.al;
      if(a==="x")d.close();else if(a==="st"){A.logSt=A.logSt===b.dataset.k?"":b.dataset.k;logDlg()}else if(a==="pr")printLog();else if(a==="rf"){var y=ctx();if(y)load(y,A.logMo,true).then(logDlg)}});
    d.addEventListener("change",function(e){if(e.target.id==="alMo"&&/^\d{4}-\d{2}$/.test(e.target.value)){A.logMo=e.target.value;A.logSt="";logDlg()}});
    d.addEventListener("close",function(){A.logOpen=false});}
  A.logOpen=true;
  var o=A.docs[docId(x,A.logMo)];
  if(!o||(!o.d&&!o.p)){d.innerHTML="<div class=dlgb><p class=note>កំពុងផ្ទុក…</p></div>";if(!d.open)d.showModal();load(x,A.logMo).then(function(){if(A.logOpen)logDlg()});return}
  if(!o.d){if(!d.open)d.showModal();return}
  d.innerHTML=logHtml(x,o);
  if(!d.open)d.showModal();
}
function logHtml(x,o){
  var D=o.d,nm={},ix={};x.c.st.forEach(function(s,i){nm[skey(s)]=s.n;ix[skey(s)]=i});
  var y=+A.logMo.slice(0,4),m=+A.logMo.slice(5,7),nd=new Date(y,m,0).getDate(),td=today();
  /* សរុបតាមសិស្ស (ម៉ោង) */
  var T={};x.c.st.forEach(function(s){T[skey(s)]={L:0,E:0,U:0}});
  var days=[],taken=0,need=0;
  for(var dd=1;dd<=nd;dd++){
    var ds=A.logMo+"-"+p2(dd);if(ds>td)break;
    var dt=dOf(ds),di=(dt.getDay()+6)%7,R=D[p2(dd)]||{};
    var bl=dt.getDay()===0?[]:blocksOf(x.list,di),seen={};bl.forEach(function(b){seen[b.p]=1});
    Object.keys(R).forEach(function(p){if(!seen[p])bl.push({p:p,s:R[p].s||"",t:R[p].t||""})});
    if(!bl.length)continue;
    bl.sort(function(a,b){return pFirst(a.p)-pFirst(b.p)});
    bl.forEach(function(b){need++;var r=R[b.p];if(!r)return;taken++;Object.keys(r.r||{}).forEach(function(k){if(T[k])T[k][r.r[k]]+=r.r[k]==="L"?1:hrs(b.p)})});
    days.push({ds:ds,bl:bl,R:R});
  }
  var rows=x.c.st.map(function(s){var k=skey(s),t=T[k];return{k:k,n:s.n,i:ix[k],L:t.L,E:t.E,U:t.U,s:t.U*3+t.E+t.L}});
  var bad=rows.filter(function(r){return r.s}).sort(function(a,b){return b.U-a.U||b.s-a.s||a.i-b.i});
  var h="<div class=dlgb id=attPrint><div class=bar style='align-items:center'><h2 style='margin:0;flex:1'>📜 កំណត់ហេតុវត្តមាន · ថ្នាក់ "+esc(x.c.n)+"</h2>"+
    "<input type=month id=alMo value='"+A.logMo+"' style='width:160px;margin:0'><button type=button data-al=rf title='ផ្ទុកឡើងវិញ'>🔄</button><button type=button data-al=pr>🖨️ បោះពុម្ព</button><button type=button data-al=x>✕</button></div>"+
    (o.err?"<p class=cxwarn>⚠️ "+esc(o.err)+"</p>":"")+
    "<p class=note style='margin:4px 0 10px'>បានស្រង់ <b>"+kn(taken)+"/"+kn(need)+"</b> ម៉ោង · ⏰ យឺត = ចំនួនដង · 📝 ច្បាប់ និង ❌ ឥតច្បាប់ = ចំនួនម៉ោង · ចុចឈ្មោះសិស្ស ដើម្បីមើលតែសិស្សនោះ</p>";
  h+="<h3 class=att-lh>👥 សរុបតាមសិស្ស</h3>"+(bad.length?"<div class=wrap><table class=att-lt><thead><tr><th>ល.រ</th><th>ឈ្មោះសិស្ស</th><th>❌ ឥតច្បាប់<br><small>(ម៉ោង)</small></th><th>📝 ច្បាប់<br><small>(ម៉ោង)</small></th><th>⏰ យឺត<br><small>(ដង)</small></th></tr></thead><tbody>"+
    bad.map(function(r){return"<tr"+(A.logSt===r.k?" class=att-sel":"")+"><td>"+kn(r.i+1)+"</td><td class=nm><button type=button class=att-nm data-al=st data-k='"+esc(r.k)+"'>"+esc(r.n)+"</button></td><td class=att-une>"+(r.U?kn(r.U):"")+"</td><td class=att-exc>"+(r.E?kn(r.E):"")+"</td><td class=att-late>"+(r.L?kn(r.L):"")+"</td></tr>"}).join("")+
    "</tbody></table></div><p class=note>សិស្សផ្សេងទៀត ("+kn(rows.length-bad.length)+" នាក់) មកគ្រប់ម៉ោងដែលបានស្រង់។</p>":"<p class=note>"+(taken?"✅ សិស្សទាំងអស់មកគ្រប់ម៉ោងដែលបានស្រង់។":"មិនទាន់មានការស្រង់វត្តមានក្នុងខែនេះទេ។")+"</p>");
  h+="<h3 class=att-lh>📅 តាមថ្ងៃ និងម៉ោង"+(A.logSt?" · <span class=att-flt>"+esc(nm[A.logSt]||"")+" <button type=button data-al=st data-k='"+esc(A.logSt)+"'>✕</button></span>":"")+"</h3>";
  var any=false;
  days.slice().reverse().forEach(function(dy){
    var lines=dy.bl.map(function(b){var r=dy.R[b.p];
      if(!r)return A.logSt?"":"<tr class=att-miss><td>"+pName(b.p)+"</td><td>"+esc(b.s||"—")+"</td><td colspan=2>⏳ មិនទាន់ស្រង់</td></tr>";
      var ks=Object.keys(r.r||{}).filter(function(k){return!A.logSt||k===A.logSt}).sort(function(a,b){return(ix[a]||0)-(ix[b]||0)});
      if(A.logSt&&!ks.length)return"";
      var g={U:[],E:[],L:[]};ks.forEach(function(k){g[r.r[k]].push(esc(nm[k]||k.replace(/^[in]:/,"")))});
      var who2=esc(r.bn||r.by||"")+" · "+tm(r.at);
      return"<tr><td>"+pName(b.p)+"</td><td>"+esc(r.s||b.s||"—")+(r.t||b.t?"<small>"+esc(r.t||b.t)+"</small>":"")+"</td><td>"+
        (["U","E","L"].filter(function(c){return g[c].length}).map(function(c){return"<div class=att-"+CODE[c].c+">"+CODE[c].ic+" "+CODE[c].t+" ("+kn(g[c].length)+")៖ "+g[c].join(" · ")+"</div>"}).join("")||"<span class=att-ok>✅ មកគ្រប់</span>")+
        "</td><td class=att-by>"+who2+"</td></tr>"}).filter(Boolean);
    if(!lines.length)return;any=true;
    h+="<div class=att-ld><b>"+esc(dLabel(dy.ds))+"</b></div><div class=wrap><table class=att-lt><thead><tr><th style='width:150px'>ម៉ោង</th><th style='width:170px'>មុខវិជ្ជា</th><th>សិស្សមិនមក</th><th style='width:170px'>អ្នកស្រង់</th></tr></thead><tbody>"+lines.join("")+"</tbody></table></div>";
  });
  if(!any)h+="<p class=note>"+(A.logSt?"សិស្សនេះមកគ្រប់ម៉ោងក្នុងខែនេះ។":"មិនមានម៉ោងសិក្សាក្នុងខែនេះទេ។")+"</p>";
  return h+"</div>";
}
function printLog(){
  var el=$("attPrint");if(!el)return;
  var w=window.open("","_blank");if(!w){alert("សូមអនុញ្ញាត Pop-up ដើម្បីបោះពុម្ព");return}
  var c=el.cloneNode(true);[].forEach.call(c.querySelectorAll("button,input"),function(b){if(b.classList.contains("att-nm"))b.outerHTML=esc(b.textContent);else b.remove()});
  w.document.write("<!doctype html><html lang=km><head><meta charset=utf-8><title>កំណត់ហេតុវត្តមាន</title><link rel=stylesheet href='https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@400;700&display=swap'><style>body{font-family:'Kantumruy Pro',sans-serif;font-size:12px;margin:16px;color:#000}table{border-collapse:collapse;width:100%;margin:4px 0 10px}th,td{border:1px solid #999;padding:4px 6px;text-align:left;vertical-align:top}small{display:block;color:#555}h2{font-size:16px}h3{font-size:14px;margin:12px 0 4px}.att-ld{margin-top:8px}</style></head><body>"+c.innerHTML+"<p style='margin-top:14px;color:#555'>បោះពុម្ពថ្ងៃ "+esc(dLabel(today()))+"</p></body></html>");
  w.document.close();setTimeout(function(){w.focus();w.print()},600);
}

/* ---------- ព្រឹត្តិការណ៍ ---------- */
var css=document.createElement("style");
css.textContent=".att-box{border:1px dashed rgba(99,102,241,.45);border-radius:16px;padding:12px 14px;margin:10px 0}"+
".att-h{display:flex;flex-wrap:wrap;gap:8px;align-items:center}.att-h input{width:auto;margin:0}.att-h .primary{margin-left:auto}.att-prog{font-size:.9rem;opacity:.85}"+
".att-day{margin:10px 0 6px;font-weight:700}.att-hol{color:#dc2626}"+
".att-ps{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:8px}"+
".att-p{border:1.5px solid rgba(148,163,184,.45);border-radius:12px;padding:8px 10px;display:flex;flex-direction:column;gap:4px}.att-p.on{border-color:rgba(34,197,94,.6);background:rgba(34,197,94,.07)}.att-p.cur{outline:2px solid #6366f1}"+
".att-pt{font-weight:700}.att-pt small{font-weight:400;opacity:.75;margin-left:4px}.att-ps2{font-size:.85rem;opacity:.85}.att-pc{display:flex;flex-wrap:wrap;gap:6px;font-size:.85rem;align-items:center}.att-pc small{width:100%;opacity:.7}.att-p button{margin-top:auto}"+
".att-add{border-style:dashed!important;min-height:60px}"+
".att-ed{margin-top:12px;border-top:1px solid rgba(148,163,184,.35);padding-top:10px}.att-eh{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:8px}"+
".att-st{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:6px}"+
".att-s{display:flex;align-items:center;gap:6px;text-align:left;border:1.5px solid rgba(34,197,94,.45);border-radius:10px;padding:8px;background:rgba(34,197,94,.06);cursor:pointer;font:inherit;color:inherit}"+
".att-s span{opacity:.6;font-size:.8rem;min-width:18px}.att-s i{margin-left:auto;font-style:normal;font-size:.8rem;white-space:nowrap}"+
".att-s.late{border-color:#f59e0b;background:rgba(245,158,11,.12)}.att-s.exc{border-color:#3b82f6;background:rgba(59,130,246,.12)}.att-s.une{border-color:#ef4444;background:rgba(239,68,68,.12)}"+
".att-ef{position:sticky;bottom:0;display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:flex-end;padding:10px 0 2px;background:inherit}.att-ef span{margin-right:auto}"+
".att-late{color:#d97706}.att-exc{color:#2563eb}.att-une{color:#dc2626}.att-ok{color:#16a34a}"+
".att-lh{margin:14px 0 6px;font-size:1rem}.att-ld{margin:10px 0 4px}.att-lt td small{display:block;opacity:.7}.att-lt td>div{margin:2px 0}.att-by{font-size:.85rem;opacity:.8}.att-miss td{opacity:.6}"+
".att-nm{background:none;border:0;padding:0;font:inherit;color:inherit;text-decoration:underline dotted;cursor:pointer}.att-sel td{background:rgba(99,102,241,.12)}.att-flt{font-weight:400;font-size:.9rem}.att-flt button{padding:0 6px}";
document.head.appendChild(css);

var p8=$("p8");
p8.addEventListener("change",function(e){if(e.target.id==="attDay"&&e.target.value){A.day=e.target.value;A.ed=null;A.draft={};box()}});
p8.addEventListener("click",function(e){
  var s=e.target.closest("[data-atts]");
  if(s){var k=s.dataset.atts,v=A.draft[k]||"";A.draft[k]=CYC[(CYC.indexOf(v)+1)%CYC.length];if(!A.draft[k])delete A.draft[k];box();return}
  var b=e.target.closest("[data-att]");if(!b||A.busy)return;
  var x=ctx();if(!x)return;var q=b.dataset.att.split("|"),a=q[0];
  if(a==="today"){A.day=today();A.ed=null;A.draft={};box()}
  else if(a==="log")logDlg();
  else if(a==="ed"){if(!canDay(x,A.day))return;var R=recOf(x,A.day)||{},r=R[q[1]];A.ed=q[1];A.es=b.dataset.s||(r&&r.s)||"";A.et=b.dataset.t||(r&&r.t)||"";A.draft=r?JSON.parse(JSON.stringify(r.r||{})):{};box();
    var ed=$("attBox").querySelector(".att-ed");if(ed)ed.scrollIntoView({behavior:"smooth",block:"start"})}
  else if(a==="add"){if(!canDay(x,A.day))return;var n=prompt("ម៉ោងទីប៉ុន្មាន? (១–១១ · ឧ. 3 ឬ 3-4)","");if(n==null)return;
    n=String(n).replace(/[០-៩]/g,function(d){return"០១២៣៤៥៦៧៨៩".indexOf(d)}).replace(/\s+/g,"");
    var m=/^(\d{1,2})(?:-(\d{1,2}))?$/.exec(n);if(!m||+m[1]<1||+m[1]>11||(m[2]&&(+m[2]<=+m[1]||+m[2]>11))){alert("សូមវាយលេខម៉ោង ១–១១ (ឧ. 3 ឬ 3-4)");return}
    var sj=prompt("មុខវិជ្ជា (ជម្រើស)","")||"";A.ed=m[1]+(m[2]?"-"+m[2]:"");A.es=sj.slice(0,60);A.et="";A.draft={};var R2=recOf(x,A.day)||{};if(R2[A.ed])A.draft=JSON.parse(JSON.stringify(R2[A.ed].r||{}));box()}
  else if(a==="cancel"){A.ed=null;A.draft={};box()}
  else if(a==="save"){if(!canDay(x,A.day)||!A.ed)return;save(x)}
});
var _renderP=window.renderP;
window.renderP=function(){_renderP();var c=curCls(),k=c?rt+"|"+c.n:"";if(k!==A.cls){A.cls=k;A.ed=null;A.draft={}}box();
  /* គ្រូបើកផ្ទាំងម្ដងក្នុង Session → ផ្ញើម៉ោងសិក្សាថ្មី (sca) ទៅគណនីប្រធានថ្នាក់ */
  if(!isMon()&&who&&A.sy!==who.id&&window.MONUI&&MONUI.sync){A.sy=who.id;try{MONUI.sync()}catch(e){}}};
window.ATT={periodsAll:periodsAll,box:box};
})();
