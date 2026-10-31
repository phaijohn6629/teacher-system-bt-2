/* ========================================================================
   គ្រប់គ្រងថ្នាក់រៀន › សម្រង់អត្ថបទប្រចាំខែ (ខែ-ខែ)
   មួយសន្លឹកក្នុងមួយគ្រូ (គ្រប់ថ្នាក់)៖ ថ្ងៃនីមួយៗមានជួរច្រើន (ថ្នាក់ · ម៉ោង · ខ្លឹមសារមេរៀន · អវត្តមានសិស្ស)
   ជើង៖ តាមគម្រូ Workplan · Firestore៖ cx/{ID គ្រូ}_{YYYY-MM}
   (ទម្រង់ចាស់ cx/{ID}_{YYYY-MM}_{ថ្នាក់} ត្រូវបានបញ្ចូលស្វ័យប្រវត្តិ ហើយរក្សាទុកដដែល)
   ======================================================================== */
(function(){
"use strict";
var X=window.SCHX,PT=X.PT,BRK=X.BRK,schOf=X.schOf,canEd=X.canEd,getSig=X.getSig,fontsOk=X.fontsOk,doPrintNow=X.doPrintNow,LOGO2=X.LOGO2,iso=X.iso,dim=X.dim,kh=X.kh,p2=X.p2,FIXHOL=X.FIXHOL,tsMo=X.tsMo();
var cxd={r:{}},cxT="",cxMo=tsMo,cxMo2="";
MAP.cx={
  docs:function(){var o={};Object.keys(cxd.r).forEach(function(k){o["cx/"+k]=encO(k.split("_")[0],cxd.r[k])});return o},
  load:function(c){var r={},m=pick(c,"cx/");Object.keys(m).forEach(function(k){var v=decO(m[k]);if(v)r[k]=v});cxd={r:r}}
};
function saveCx(){push("cx")}
function cxKey(){return cxT+"_"+cxMo}
function isNew(k){return k.split("_").length===2}
function cxRec(create){
  var k=cxKey(),r=cxd.r[k];
  if(!r&&create){var t=teacherOf(cxT);r=cxd.r[k]={m:cxMo,m2:cxMo2||cxMo,sb:t.sub||"គណិតវិទ្យា",rows:[],ft:{pl:"រាជធានីភ្នំពេញ",d:"",kt:"",klu:"0",sgo:"1"},mig:[]}}
  return r||null;
}
/* បញ្ចូលសម្រង់អត្ថបទចាស់ (មួយថ្នាក់មួយសន្លឹក) នៃខែនេះទៅក្នុងសន្លឹកថ្មី — ម្ដងគត់ក្នុងមួយថ្នាក់ */
function cxMigrate(){
  if(!canEd(cxT))return;
  var pre=cxT+"_"+cxMo+"_",old=Object.keys(cxd.r).filter(function(k){return k.indexOf(pre)===0});
  var rec=cxd.r[cxKey()],todo=old.filter(function(k){return!rec||(rec.mig||[]).indexOf(k)<0});
  if(!todo.length)return;
  rec=cxRec(true);rec.mig=rec.mig||[];
  todo.forEach(function(k){
    var o=cxd.r[k];
    (o.rows||[]).forEach(function(r){var n=Object.assign({},r);n.cls=r.cls||o.cls||"";rec.rows.push(n)});
    if(o.m2&&o.m2>rec.m2)rec.m2=o.m2;
    if(!rec.rows.length&&o.ft)rec.ft=o.ft;
    rec.mig.push(k);
  });
  cxSort(rec);saveCx();
}
function cxClasses(id){
  var seen={},a=[];schOf(id).forEach(function(s){if(s[2]&&!seen[s[2]]){seen[s[2]]=1;a.push(s[2])}});
  var rest=CL.map(function(c){return c.slice(2)}).filter(function(c){return!seen[c]});
  return{mine:a,rest:rest};
}
function cxMonthEnd(){var e=(cxRec(false)&&cxRec(false).m2)||cxMo2||cxMo;return e<cxMo?cxMo:e}
function cxDateTxt(s){
  if(!/^\d{4}-\d{2}-\d{2}$/.test(s||""))return"";
  var a=s.split("-").map(Number),wd=new Date(a[0],a[1]-1,a[2]).getDay();
  return KhCal.WD[wd]+" "+kh(a[2])+"/"+kh(a[1])+"/"+kh(a[0]);
}
function di0(s){var a=s.split("-").map(Number);return(new Date(a[0],a[1]-1,a[2]).getDay()+6)%7}   /* ច័ន្ទ = 0 */
/* ម៉ោង៖ r.p = "1-2" (ម៉ោងទី១ ដល់ទី២ ក្នុងកាលវិភាគ) */
function cxP(p){var m=/^(\d+)(?:\s*-\s*(\d+))?$/.exec(String(p||"").trim());if(!m)return null;var a=+m[1],b=+(m[2]||m[1]);return a>=1&&b<=11&&a<=b?[a,b]:null}
function cxPLabel(p){var q=cxP(p);if(!q)return esc(p||"");return"ម៉ោងទី"+kh(q[0])+(q[1]>q[0]?"–"+kh(q[1]):"")}
function cxPTime(p){var q=cxP(p);if(!q)return"";return kh(PT[q[0]].split(" - ")[0]+"–"+PT[q[1]].split(" - ")[1])}
/* ម៉ោងជាប់គ្នានៃថ្នាក់ cls ក្នុងថ្ងៃ di តាមកាលវិភាគ (បំបែកនៅម៉ោងសម្រាក) */
function cxBlocks(di,cls,tid){
  var ps=schOf(tid||cxT).filter(function(s){return s[0]===di&&s[2]===cls}).map(function(s){return s[1]}).sort(function(a,b){return a-b}),out=[];
  ps.forEach(function(p){var l=out[out.length-1];if(l&&l[1]===p-1&&!BRK[p-1])l[1]=p;else out.push([p,p])});
  return out.map(function(b){return b[0]+(b[1]>b[0]?"-"+b[1]:"")});
}
/* ជួរត្រឹមត្រូវ = ត្រូវតាមកាលវិភាគ (ថ្នាក់ និងម៉ោងនៃថ្ងៃនោះ) ឬគ្រូបន្ថែមខ្លួនឯង (r.x = បង្រៀនបន្ថែម) */
function onSched(r,tid){
  if(!r.cls||!/^\d{4}-\d{2}-\d{2}$/.test(r.d||""))return false;
  var di=di0(r.d),ps={};schOf(tid||cxT).forEach(function(s){if(s[0]===di&&s[2]===r.cls)ps[s[1]]=1});
  if(!Object.keys(ps).length)return false;
  var q=cxP(r.p);if(!q)return!r.p;
  for(var p=q[0];p<=q[1];p++)if(!ps[p])return false;
  return true;
}
/* r.s = បង្កើតពីកាលវិភាគនៅពេលនោះ (ត្រឹមត្រូវជានិច្ច ទោះកាលវិភាគប្ដូរក្រោយ) · r.x = គ្រូបន្ថែមខ្លួនឯង */
function cxOk(r,tid){return!!(r.x||r.s)||onSched(r,tid)}
function cxToday(){var t=new Date();return iso(t.getFullYear(),t.getMonth()+1,t.getDate())}
function cxEmpty(r){return!(r.c||"").trim()&&!r.ls&&!(r.a||"").trim()}
function cxSkipKey(r){return r.d+"|"+r.cls+"|"+r.p}
function cxSort(rec){rec.rows.sort(function(a,b){var q=cxP(a.p),r=cxP(b.p);return(a.d||"9999").localeCompare(b.d||"9999")||((q?q[0]:99)-(r?r[0]:99))||String(a.cls||"").localeCompare(String(b.cls||""))})}
function cxFill(silent,from){   /* from = "YYYY-MM-DD" → បំពេញតែថ្ងៃចាប់ពីនេះទៅ */
  /* បង្កើតជួរតាមកាលវិភាគ៖ គ្រប់ថ្នាក់ គ្រប់ម៉ោងបង្រៀន (រំលងថ្ងៃអាទិត្យ និងបុណ្យជាតិ) */
  if(!canEd(cxT)){if(!silent)alert("គ្មានសិទ្ធិកែទិន្នន័យគ្រូនេះ");return}
  var cls=cxClasses(cxT).mine;
  if(!cls.length){if(silent)return;alert("កាលវិភាគរបស់គ្រូនេះមិនទាន់មានម៉ោងបង្រៀនទេ។ សូមបញ្ចូលក្នុង «កាលវិភាគបង្រៀន» ជាមុន ឬបន្ថែមជួរដោយដៃ។");return}
  var rec=cxRec(true),e=cxMonthEnd(),byD={};rec.rows.forEach(function(r){(byD[r.d]=byD[r.d]||[]).push(r)});
  var y0=+cxMo.slice(0,4),m0=+cxMo.slice(5,7),y1=+e.slice(0,4),m1=+e.slice(5,7),add=0;
  for(var y=y0,m=m0;y<y1||(y===y1&&m<=m1);){
    for(var d=1;d<=dim(y,m);d++){
      var wd=new Date(y,m-1,d).getDay(),i=(wd+6)%7;
      if(wd===0||FIXHOL[p2(m)+"-"+p2(d)])continue;
      var k=iso(y,m,d),ex=byD[k]||[],skip=rec.skip||[];if(from&&k<from)continue;
      cls.forEach(function(c){
        var bl=cxBlocks(i,c);if(!bl.length)return;
        var mine=ex.filter(function(r){return r.cls===c}),used={};
        mine.forEach(function(r){if(r.p)used[r.p]=1});
        mine.forEach(function(r){if(!r.p){var f=bl.filter(function(b){return!used[b]})[0];if(f){r.p=f;used[f]=1}}});   /* ជួរចាស់គ្មានម៉ោង */
        bl.forEach(function(b){if(!used[b]&&skip.indexOf(k+"|"+c+"|"+b)<0){rec.rows.push({d:k,cls:c,p:b,c:"",a:"",s:1});add++}});
      });
    }
    m++;if(m>12){m=1;y++}
  }
  cxSort(rec);saveCx();if(silent)return;renderCx();notify("បានបន្ថែម "+add+" ជួរតាមកាលវិភាគ");
}
/* ជ្រើសជំពូក/មេរៀនតាមជួរ៖ មេរៀនតាមកម្មវិធីសិក្សាសប្ដាហ៍នោះនៅខាងលើ បន្ទាប់មកមេរៀនទាំងអស់តាមជំពូក */
function cxG(cls){var g=parseInt(cls);return window.CUR&&window.CUR[g]&&window.CUR[g].LS?g:0}
function cxLsName(g,n){var l=window.CUR[g].LS[n];return l?(l[3]?"ជំពូកទី"+kh(l[3])+" · មេរៀនទី"+kh(l[5])+" "+l[0]:"មេរៀនទី"+kh(+n)+" "+l[0]):""}
function cxLsOpts(g,r){
  var LS=window.CUR[g].LS,sel=r.ls||"",o="<option value=''>— ជ្រើសជំពូក/មេរៀន —</option>",wk={};
  if(/^\d{4}-\d{2}-\d{2}$/.test(r.d||""))CURX.sessions(r.d,r.cls).forEach(function(x){if(x.t==="L")wk[x.n]=1});
  var ks=Object.keys(wk);
  if(ks.length)o+="<optgroup label='📅 តាមកម្មវិធីសិក្សាសប្ដាហ៍នេះ'>"+ks.map(function(n){return"<option value='"+n+"'"+(+n===+sel?" selected":"")+">"+esc(cxLsName(g,n))+"</option>"}).join("")+"</optgroup>";
  var grp={},order=[];
  Object.keys(LS).sort(function(a,b){return a-b}).forEach(function(n){
    var l=LS[n],k=l[3]?"ជំពូកទី"+kh(l[3])+" "+l[4]:(l[2]==="ធ"?"ធរណីមាត្រ":"ពីជគណិត");
    if(!grp[k]){grp[k]=[];order.push(k)}grp[k].push(n);
  });
  order.forEach(function(k){o+="<optgroup label='"+esc(k)+"'>"+grp[k].map(function(n){return"<option value='"+n+"'"+(!ks.length||!wk[n]?(+n===+sel?" selected":""):"")+">"+esc(cxLsName(g,n))+"</option>"}).join("")+"</optgroup>"});
  return o;
}
function cxClsOpts(r){
  var c=cxClasses(cxT),v=r.cls||"",o="<option value=''>— ថ្នាក់ —</option>";
  if(c.mine.length)o+="<optgroup label='ថ្នាក់តាមកាលវិភាគ'>"+c.mine.map(function(x){return"<option"+(x===v?" selected":"")+">"+esc(x)+"</option>"}).join("")+"</optgroup>";
  o+="<optgroup label='ថ្នាក់ផ្សេងៗ'>"+c.rest.map(function(x){return"<option"+(x===v?" selected":"")+">"+esc(x)+"</option>"}).join("")+"</optgroup>";
  if(v&&c.mine.concat(c.rest).indexOf(v)<0)o+="<option selected>"+esc(v)+"</option>";
  return o;
}
function cxPOpts(r){
  var v=r.p||"",bl=(r.cls&&/^\d{4}-\d{2}-\d{2}$/.test(r.d||""))?cxBlocks(di0(r.d),r.cls):[],o="<option value=''>— ម៉ោង —</option>",all=[];
  if(bl.length)o+="<optgroup label='📅 តាមកាលវិភាគ'>"+bl.map(function(b){all.push(b);return"<option value='"+b+"'"+(b===v?" selected":"")+">"+cxPLabel(b)+" ("+cxPTime(b)+")</option>"}).join("")+"</optgroup>";
  o+="<optgroup label='ម៉ោងទាំងអស់'>";for(var p=1;p<=11;p++){var s=String(p);if(all.indexOf(s)<0){all.push(s);o+="<option value='"+s+"'"+(s===v?" selected":"")+">"+cxPLabel(s)+" ("+cxPTime(s)+")</option>"}}o+="</optgroup>";
  if(v&&all.indexOf(v)<0)o+="<option value='"+esc(v)+"' selected>"+cxPLabel(v)+"</option>";
  return o;
}
/* ថ្ងៃនេះ និងថ្ងៃខាងមុខ ធ្វើតាមកាលវិភាគបច្ចុប្បន្ន (កាលវិភាគប្រែប្រួលតាមសិស្ស/គ្រូ)៖
   ដកជួរពីកាលវិភាគដែលលែងត្រូវ (តែជួរទទេ) ហើយបន្ថែមម៉ោង/ថ្នាក់ថ្មី · ថ្ងៃកន្លងហើយមិនប៉ះ */
function cxSyncFuture(){
  var rec=cxRec(false);if(!rec||!rec.auto||!canEd(cxT))return;
  var td=cxToday(),n0=rec.rows.length,up=0;
  rec.rows.forEach(function(r){if(!r.s&&!r.x&&onSched(r)){r.s=1;up++}});   /* ជួរចាស់ដែលត្រូវកាលវិភាគ → ចងចាំថាត្រឹមត្រូវ */
  rec.rows=rec.rows.filter(function(r){return!(r.s&&r.d>=td&&cxEmpty(r)&&!onSched(r))});
  var removed=n0-rec.rows.length,n1=rec.rows.length;
  cxFill(true,td);
  if((removed||up)&&rec.rows.length===n1)saveCx();
}
function renderCx(){
  if(!who)return;
  var adm=isAdm();
  if(!cxT||(!adm&&cxT!==who.id)||!data.some(function(t){return t.id===cxT}))cxT=who.id;
  cxMigrate();
  var r0=cxRec(false);   /* បង្កើតជួរតាមកាលវិភាគដោយស្វ័យប្រវត្តិ ម្ដងគត់ក្នុងមួយខែ (ជួរដែលគ្រូលុបចោល មិនត្រឡប់មកវិញទេ) */
  if((!r0||!r0.auto)&&canEd(cxT)&&cxClasses(cxT).mine.length){cxFill(true);var r1=cxRec(false);if(r1){r1.auto=1;saveCx()}}
  cxSyncFuture();
  $("cxT").innerHTML=data.filter(function(t){return adm||t.id===who.id}).map(function(t){return"<option value='"+esc(t.id)+"'"+(t.id===cxT?" selected":"")+">"+esc(t.name)+"</option>"}).join("");
  $("cxM").value=cxMo;
  var rec=cxRec(false),ro=!canEd(cxT),t=teacherOf(cxT),ft=(rec&&rec.ft)||{pl:"រាជធានីភ្នំពេញ"};
  $("cxM2").value=cxMonthEnd();
  ["cxFill","cxAdd","cxCur"].forEach(function(i){$(i).style.display=ro?"none":""});
  var rows=(rec&&rec.rows)||[],h="<div class=tsh><div><label>បុគ្គលិកឈ្មោះ</label><input value='"+esc(t.name||"")+"' readonly></div>"+
    "<div><label>មុខវិជ្ជា</label><input data-cf='sb' value='"+esc((rec&&rec.sb)||t.sub||"គណិតវិទ្យា")+"' "+(ro?"readonly":"")+"></div></div>";
  var b="",bad=0;
  rows.forEach(function(r,i){
    if(!i||rows[i-1].d!==r.d)b+="<tr class=cxday><td colspan=5><div class=cxdh><input type=date data-cday='"+esc(r.d||"")+"' value='"+esc(r.d||"")+"' "+(ro?"disabled":"")+"><b>"+esc(cxDateTxt(r.d))+"</b>"+
      (ro?"":"<button type=button data-cadd='"+esc(r.d||"")+"'>＋ បន្ថែមថ្នាក់/ម៉ោង</button>")+"</div></td></tr>";
    var g=cxG(r.cls),ok=cxOk(r);if(!ok)bad++;
    b+="<tr"+(ok?"":" class=cxbad")+"><td><select data-ci="+i+" data-ck='cls' "+(ro?"disabled":"")+">"+cxClsOpts(r)+"</select>"+
      (!ok?"<small class=cxw>⚠️ មិនត្រូវកាលវិភាគ</small>":r.x&&!onSched(r)?"<small class=cxx>➕ បង្រៀនបន្ថែម</small>":"")+"</td>"+
      "<td><select data-ci="+i+" data-ck='p' "+(ro?"disabled":"")+">"+cxPOpts(r)+"</select></td>"+
      "<td>"+(g?"<select class=cxls data-ci="+i+" data-ck='ls' "+(ro?"disabled":"")+">"+cxLsOpts(g,r)+"</select>":"")+"<textarea rows=2 data-ci="+i+" data-ck='c' "+(ro?"readonly":"")+">"+esc(r.c||"")+"</textarea></td>"+
      "<td><textarea rows=2 data-ci="+i+" data-ck='a' placeholder='ឈ្មោះ/ចំនួនសិស្សអវត្តមាន' "+(ro?"readonly":"")+">"+esc(r.a||"")+"</textarea></td>"+
      "<td>"+(ro?"":"<button type=button class=danger data-cdel="+i+" title='លុបជួរ'>✕</button>")+"</td></tr>";
  });
  if(bad)h+="<div class=cxwarn>⚠️ មាន <b>"+kh(bad)+"</b> ជួរដែលថ្នាក់/ម៉ោងមិនត្រូវតាមកាលវិភាគរបស់គ្រូ។ ជួរទាំងនេះមិនត្រូវបោះពុម្ព ហើយមិនចូល Workplan ទេ។ សូមកែថ្នាក់/ម៉ោងឱ្យត្រូវ ឬលុបចោល។"+(ro?"":" <button type=button data-cclean>🧹 លុបជួរមិនត្រូវកាលវិភាគ</button>")+"</div>";
  h+="<div class=wrap><table class=tsg id=cxG><thead><tr><th style='width:130px'>ថ្នាក់</th><th style='width:190px'>ម៉ោង</th><th>ខ្លឹមសារមេរៀន</th><th style='width:24%'>អវត្តមានសិស្ស</th><th style='width:44px'></th></tr></thead><tbody>"+
    (b||"<tr><td colspan=5 class=empty>មិនទាន់មានជួរទេ។ ចុច «⚡ បង្កើតជួរតាមកាលវិភាគ» ឬ «＋ ថ្ងៃថ្មី»។</td></tr>")+"</tbody></table></div>";
  h+="<div class=tsf><fieldset><legend>ជើងក្រោម (តាមគម្រូ Workplan)</legend>"+
    "<div><label>ធ្វើនៅ</label><input data-cf='ft.pl' value='"+esc(ft.pl||"")+"' "+(ro?"readonly":"")+"></div>"+
    "<div><label>កាលបរិច្ឆេទ (ទុកទទេ = ថ្ងៃនេះ)</label><input type=date data-cf='ft.d' value='"+esc(ft.d||"")+"' "+(ro?"readonly":"")+"></div>"+
    "<label style='display:flex;gap:6px;align-items:center'><input type=checkbox data-cklu "+(ft.klu==="1"?"checked":"")+" "+(ro?"disabled":"")+" style='width:auto;margin:0'> បង្ហាញថ្ងៃតាមចន្ទគតិខ្មែរ</label>"+
    "<label style='display:flex;gap:6px;align-items:center'><input type=checkbox data-csgo "+(ft.sgo==="0"?"":"checked")+" "+(ro?"disabled":"")+" style='width:auto;margin:0'> បោះពុម្ពជាមួយហត្ថលេខា "+(getSig(cxT)?"":"(មិនទាន់មានហត្ថលេខា៖ ផ្ទុកក្នុងទំព័រ Timesheet)")+"</label></fieldset></div>";
  $("cxBody").innerHTML=h;
}
window.renderCx=renderCx;
/* សម្រាប់ Workplan (sched.js)៖ ថ្ងៃ → ["10NGS-C៖ មេរៀនទី២ ...", ...] នៃគ្រូ tid ក្នុងខែ ym */
window.CXDAYS=function(tid,ym){
  var o={},done={};
  Object.keys(cxd.r).forEach(function(k){if(isNew(k))(cxd.r[k].mig||[]).forEach(function(x){done[x]=1})});
  Object.keys(cxd.r).forEach(function(k){
    if(k.split("_")[0]!==tid||done[k])return;var rec=cxd.r[k];
    (rec.rows||[]).forEach(function(r){
      if((r.d||"").slice(0,7)!==ym)return;
      if(isNew(k)&&!cxOk(r,tid))return;
      var cls=r.cls||rec.cls||"",g=parseInt(cls),t="";
      if(r.ls&&window.CUR[g]&&window.CUR[g].LS[r.ls]){var l=window.CUR[g].LS[r.ls];t="មេរៀនទី"+kh(l[5]||r.ls)+" "+l[0]}
      else t=((r.c||"").split("\n").filter(Boolean)[0]||"").replace(/\s+—.*$/,"").replace(/^ជំពូកទី\S+\s.*?·\s*/,"");
      if(!t)return;var d=+r.d.slice(8,10),v=(cls?cls+"៖ ":"")+t,q=cxP(r.p);o[d]=o[d]||[];
      if(!o[d].some(function(x){return x.v===v}))o[d].push({v:v,p:q?q[0]:99});
    });
  });
  Object.keys(o).forEach(function(d){o[d]=o[d].sort(function(a,b){return a.p-b.p}).map(function(x){return x.v})});   /* តាមលំដាប់ម៉ោង */
  return o;
};
window.cxPrintHTML=function(){return cxPrintHTML()};
function cxEdit(e){
  var el=e.target,f=el.dataset.cf,i=el.dataset.ci;
  if(!canEd(cxT))return;
  var rec=cxRec(true);
  if(f){
    var p=f.split(".");if(p[0]==="ft"){rec.ft=rec.ft||{};rec.ft[p[1]]=el.value}else rec[f]=el.value;
    saveCx();return;
  }
  if(i!=null&&i!==""){rec.rows[+i][el.dataset.ck]=el.value;saveCx()}
}
$("cxBody").oninput=function(e){if(e.target.type==="date"||e.target.tagName==="SELECT")return;cxEdit(e)};
$("cxBody").onchange=function(e){
  var el=e.target;if(!canEd(cxT))return;
  if(el.hasAttribute("data-cklu")){var r=cxRec(true);r.ft=r.ft||{};r.ft.klu=el.checked?"1":"0";saveCx();return}
  if(el.hasAttribute("data-csgo")){var r2=cxRec(true);r2.ft=r2.ft||{};r2.ft.sgo=el.checked?"1":"0";saveCx();return}
  var rec=cxRec(true);
  if(el.hasAttribute("data-cday")){   /* ប្ដូរថ្ងៃ → ប្ដូរគ្រប់ជួរនៃថ្ងៃនោះ */
    var od=el.getAttribute("data-cday");if(!el.value)return renderCx();
    rec.rows.forEach(function(r){if(r.d===od)r.d=el.value});cxSort(rec);saveCx();renderCx();return;
  }
  var row=rec.rows[+el.dataset.ci];if(!row)return;
  if(el.dataset.ck==="ls"){
    var g=cxG(row.cls);if(!g)return;
    row.ls=el.value?+el.value:"";
    if(row.ls){
      var hd=CURX.text({t:"L",n:row.ls,mk:0,g:g,s:[]}),c=row.c||"",ln=c.split("\n");
      if(!c.trim())row.c=hd;
      else if(/^(ជំពូកទី|មេរៀនទី)/.test(ln[0])){var dash=ln[0].indexOf(" — ");ln[0]=hd+(dash>=0?ln[0].slice(dash):"");row.c=ln.join("\n")}
      else row.c=hd+"\n"+c;
    }
    saveCx();renderCx();return;
  }
  if(el.dataset.ck==="cls"){
    if(row.cls!==el.value)row.ls="";
    row.cls=el.value;
    if(row.cls&&!row.p){   /* ដាក់ម៉ោងដំបូងតាមកាលវិភាគដែលមិនទាន់ប្រើក្នុងថ្ងៃនោះ */
      var used={};rec.rows.forEach(function(r){if(r!==row&&r.d===row.d&&r.cls===row.cls&&r.p)used[r.p]=1});
      row.p=cxBlocks(di0(row.d),row.cls).filter(function(b){return!used[b]})[0]||"";
    }
    cxSort(rec);saveCx();renderCx();return;
  }
  if(el.dataset.ck==="p"){row.p=el.value;cxSort(rec);saveCx();renderCx();return}
  cxEdit(e);
};
$("cxBody").onclick=function(e){
  if(!canEd(cxT))return;
  var a=e.target.closest("[data-cadd]");
  if(a){var rec=cxRec(true);rec.rows.push({d:a.getAttribute("data-cadd"),cls:"",p:"",c:"",a:"",x:1});cxSort(rec);saveCx();renderCx();return}
  if(e.target.closest("[data-cclean]")){
    var rx=cxRec(false);if(!rx)return;var n=rx.rows.filter(function(r){return!cxOk(r)}).length;
    if(n&&confirm("លុប "+n+" ជួរដែលមិនត្រូវតាមកាលវិភាគ?")){rx.rows=rx.rows.filter(function(r){return cxOk(r)});saveCx();renderCx();notify("បានលុប "+n+" ជួរ")}
    return;
  }
  var b=e.target.closest("[data-cdel]");if(!b)return;
  var rc=cxRec(false);if(!rc)return;
  if(confirm("តើលុបជួរនេះមែនទេ?")){
    var dr=rc.rows.splice(+b.dataset.cdel,1)[0];
    if(dr&&dr.s){rc.skip=rc.skip||[];rc.skip.push(cxSkipKey(dr))}   /* កុំបន្ថែមវិញដោយស្វ័យប្រវត្តិ */
    saveCx();renderCx();
  }
};
$("cxT").onchange=function(){cxT=this.value;renderCx()};
$("cxM").onchange=function(){cxMo=this.value||cxMo;if(cxMo2<cxMo)cxMo2=cxMo;renderCx()};
$("cxM2").onchange=function(){
  cxMo2=this.value||cxMo;if(cxMo2<cxMo)cxMo2=cxMo;
  var r=cxRec(false);if(r&&canEd(cxT)){r.m2=cxMo2;saveCx()}renderCx()};
$("cxFill").onclick=cxFill;
$("cxCur").onclick=function(){
  if(!canEd(cxT)){alert("គ្មានសិទ្ធិកែទិន្នន័យគ្រូនេះ");return}
  var rec=cxRec(false);if(!rec||!rec.rows.length){alert("សូមបង្កើតជួរតាមកាលវិភាគជាមុន (⚡ បង្កើតជួរតាមកាលវិភាគ)");return}
  /* ក្រុមតាម (សប្ដាហ៍ · ថ្នាក់)៖ ម៉ោងនីមួយៗទទួលមេរៀនបន្ទាប់ក្នុងសប្ដាហ៍នោះ */
  var grp={},keys=[],none=0;
  rec.rows.forEach(function(r,i){
    if(!/^\d{4}-\d{2}-\d{2}$/.test(r.d||"")||!r.cls)return;
    if(!CURX.has(r.cls)){none++;return}
    var a=r.d.split("-").map(Number),dt=new Date(a[0],a[1]-1,a[2]);dt.setDate(dt.getDate()-((dt.getDay()+6)%7));
    var k=dt.getFullYear()+"-"+dt.getMonth()+"-"+dt.getDate()+"|"+r.cls;if(!grp[k]){grp[k]=[];keys.push(k)}grp[k].push(i);
  });
  var done=0,skip=0;
  keys.forEach(function(k){
    var idx=grp[k],cls=k.split("|")[1],S=CURX.sessions(rec.rows[idx[0]].d,cls);if(!S.length)return;
    idx.forEach(function(ri,j){
      var r=rec.rows[ri];if(r.c){skip++;return}
      var part=j===idx.length-1?S.slice(j):S.slice(j,j+1);if(!part.length)return;
      r.c=part.map(function(s){return CURX.text(s)}).join("\n");done++;
      var L0=part.filter(function(s){return s.t==="L"})[0];if(L0)r.ls=L0.n;
    });
  });
  saveCx();renderCx();notify("បានបំពេញ "+done+" ជួរពីកម្មវិធីសិក្សា"+(skip?" (រំលង "+skip+" ជួរដែលមានអត្ថបទរួច)":"")+(none?" · "+none+" ជួរជាថ្នាក់ដែលមិនទាន់មានកម្មវិធីសិក្សា":""));
};
$("cxAdd").onclick=function(){   /* ＋ ថ្ងៃថ្មី៖ ថ្ងៃបន្ទាប់ពីថ្ងៃចុងក្រោយ (រំលងថ្ងៃអាទិត្យ) */
  if(!canEd(cxT))return;
  var rec=cxRec(true),last=rec.rows.length?rec.rows[rec.rows.length-1].d:"",d;
  if(/^\d{4}-\d{2}-\d{2}$/.test(last)){var a=last.split("-").map(Number);d=new Date(a[0],a[1]-1,a[2]+1);if(!d.getDay())d.setDate(d.getDate()+1)}
  else d=new Date(+cxMo.slice(0,4),+cxMo.slice(5,7)-1,1);
  rec.rows.push({d:iso(d.getFullYear(),d.getMonth()+1,d.getDate()),cls:"",p:"",c:"",a:"",x:1});cxSort(rec);saveCx();renderCx();
};
function cxPrintHTML(){
  var rec=cxRec(false)||{rows:[],ft:{}},t=teacherOf(cxT),ft=rec.ft||{},y=+cxMo.slice(0,4),m=+cxMo.slice(5,7),e=cxMonthEnd(),y2=+e.slice(0,4),m2=+e.slice(5,7);
  var per=y===y2?(m===m2?"ខែ"+M[m-1]:"ខែ"+M[m-1]+" ដល់ ខែ"+M[m2-1])+" ឆ្នាំ"+kh(y):"ខែ"+M[m-1]+" ឆ្នាំ"+kh(y)+" ដល់ ខែ"+M[m2-1]+" ឆ្នាំ"+kh(y2);
  var tdy=new Date(),tdIso=iso(tdy.getFullYear(),tdy.getMonth()+1,tdy.getDate()),fd=ft.d||tdIso,wa=fd.split("-").map(Number);
  var plc=(ft.pl&&ft.pl!=="ភ្នំពេញ")?ft.pl:"រាជធានីភ្នំពេញ",wg="ថ្ងៃទី "+kh(wa[2])+" ខែ "+M[wa[1]-1]+" ឆ្នាំ"+kh(wa[0]);
  var wl=ft.klu==="1"?((ft.d&&ft.kt)?ft.kt:KhCal.fmt(wa[0],wa[1],wa[2])):"",sig=(ft.sgo==="0")?"":getSig(cxT);
  var rows=(rec.rows||[]).filter(function(r){return cxOk(r)}),cl=[];rows.forEach(function(r){if(r.cls&&cl.indexOf(r.cls)<0)cl.push(r.cls)});cl.sort();
  return"<div class='pg cxp'>"+
   "<div class=cxh><img src='"+LOGOBT()+"' class=cxlogo style='border-radius:50%' alt=''><div class=cxt><div class=moul style='font-size:12pt'>សាលារៀនជំនាន់ថ្មី</div><div class=en style='font-size:10pt;margin:2px 0 4px'>New Generation School</div>"+
    "<div class=moul style='font-size:13pt'>សម្រង់អត្ថបទប្រចាំខែ</div><div class=cxper>"+esc(per)+"</div></div></div>"+
   "<div class=cxi><div><span>បុគ្គលិកឈ្មោះ៖</span> <b>"+esc(t.name||"")+"</b></div><div><span>មុខវិជ្ជា៖</span> <b>"+esc(rec.sb||t.sub||"គណិតវិទ្យា")+"</b></div><div><span>ថ្នាក់៖</span> <b>"+esc(cl.join(", "))+"</b></div></div>"+
   "<table class=cxg><thead><tr><th style='width:18%'>កាលបរិច្ឆេទ</th><th style='width:13%'>ថ្នាក់</th><th style='width:13%'>ម៉ោង</th><th>ខ្លឹមសារមេរៀន</th><th style='width:17%'>អវត្តមានសិស្ស</th></tr></thead>"+
   (rows.length?rows.map(function(r,i){
     var n=0;if(i&&rows[i-1].d===r.d)n=-1;else while(i+n<rows.length&&rows[i+n].d===r.d)n++;   /* ថ្ងៃដូចគ្នា → បញ្ចូលក្រឡាកាលបរិច្ឆេទ */
     return(n<0?"":"<tbody>")+"<tr>"+(n<0?"":"<td class=cd"+(n>1?" rowspan="+n:"")+">"+esc(cxDateTxt(r.d))+"</td>")+"<td class='cp ccl'><b>"+esc(r.cls||"")+"</b></td><td class=cp>"+cxPLabel(r.p)+(cxPTime(r.p)?"<br><small>"+cxPTime(r.p)+"</small>":"")+"</td><td class=cc>"+esc(r.c||"").replace(/\n/g,"<br>")+"</td><td class=ca>"+esc(r.a||"").replace(/\n/g,"<br>")+"</td></tr>"+(i+1<rows.length&&rows[i+1].d===r.d?"":"</tbody>")}).join(""):"<tbody><tr><td>&nbsp;</td><td></td><td></td><td></td><td></td></tr></tbody>")+
   "</table>"+
   "<div class=cxf><div class=moul style='font-size:10.5pt;line-height:1.7'>បានឃើញ និងត្រួតពិនិត្យ<br>ជ.គណៈគ្រប់គ្រងសាលារៀនជំនាន់ថ្មី</div>"+
   "<div class=cxr>"+(wl?"<div class=lu>"+esc(wl)+"</div>":"")+"<div class=gd>"+esc(plc)+" "+esc(wg)+"</div><div class=sn>ហត្ថលេខា និងឈ្មោះ</div>"+
   "<div class=sb>"+(sig?"<img src='"+sig+"' class=sgi alt=''>":"<span style='width:30mm;display:inline-block'></span>")+"<b>"+esc(t.name||"")+"</b></div></div></div></div>";
}
$("cxPr").onclick=function(){
  var rec=cxRec(false);if(!rec||!rec.rows.length){alert("មិនទាន់មានជួរក្នុងខែនេះទេ");return}
  fontsOk().then(function(){doPrintNow(cxPrintHTML())});
};
$("cxCsv").onclick=function(){
  var rec=cxRec(false),rows=(rec&&rec.rows)||[],q=function(s){return'"'+String(s||"").replace(/"/g,'""')+'"'};
  var csv="﻿"+["កាលបរិច្ឆេទ","ថ្នាក់","ម៉ោង","ខ្លឹមសារមេរៀន","អវត្តមានសិស្ស"].map(q).join(",")+"\n"+rows.map(function(r){return[r.d,r.cls,r.p,r.c,r.a].map(q).join(",")}).join("\n");
  var a=document.createElement("a");a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8"}));a.download="សម្រង់អត្ថបទ-"+cxT+"-"+cxMo+".csv";a.click();
};
})();
