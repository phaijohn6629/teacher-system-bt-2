/* ========================================================================
   ផ្នែកទី ៣ · កាលវិភាគបង្រៀន (ផ្ទាំង ១១) + Timesheet & Workplan ប្រចាំខែ (ផ្ទាំង ១២)
   - sched/{ID}  : កាលវិភាគរបស់គ្រូម្នាក់ៗ (គ្រូគ្រប់គ្នាអាន · ម្ចាស់ ឬ Admin សរសេរ)
   - ts/{ID_YYYY-MM} : Timesheet + Workplan (ម្ចាស់ ឬ Admin អាន/សរសេរ)
   ត្រូវផ្ទុកបន្ទាប់ពី script.js (ប្រើអថេរ/អនុគមន៍ទូទៅរបស់វា)
   ======================================================================== */
(function(){
"use strict";
var DK=["ច័ន្ទ","អង្គារ","ពុធ","ព្រហស្បតិ៍","សុក្រ","សៅរ៍"];             /* 0..5 */
var PT=[null,"7:30 - 8:15","8:20 - 9:05","9:25 - 10:10","10:15 - 11:00","12:30 - 13:15","13:20 - 14:05","14:25 - 15:10","15:15 - 16:00","16:10 - 16:55","17:10 - 17:55","18:10 - 18:55"];
var BRK={2:"សម្រាក 9:05 - 9:25",4:"សម្រាក 11:00 - 12:30",6:"សម្រាក 14:05 - 14:25",8:"សម្រាក 16:00 - 16:10"};
var HC=[["b","ម៉ោងបង្រៀនមូលដ្ឋាន","មូលដ្ឋាន"],["i","បង្រៀនម៉ោងលើស (ក្នុងរដ្ឋបាល)","លើស ក្នុង"],["o","បង្រៀនម៉ោងលើស (ក្រៅរដ្ឋបាល)","លើស ក្រៅ"],["l","ប្រធានក្រុមបច្ចេកទេស","ប្រធានក្រុម"],["v","អនុប្រធានក្រុមបច្ចេកទេស","អនុប្រធាន"],["c","បន្ទុកថ្នាក់","បន្ទុកថ្នាក់"],["u","បច្ចេកទេស/ប្រចាំការ","ប្រចាំការ"],["x","ផ្សេងៗ","ផ្សេងៗ"]];
var ST=["បង្រៀន","ឈប់សម្រាក","បុណ្យជាតិ","សកម្មភាពផ្សេងៗ"],STS={"បង្រៀន":"ប","ឈប់សម្រាក":"ឈ","បុណ្យជាតិ":"បុ","សកម្មភាពផ្សេងៗ":"សក"};
var FIXHOL={"01-01":1,"01-07":1,"03-08":1,"04-14":1,"04-15":1,"04-16":1,"05-01":1,"05-14":1,"06-18":1,"09-24":1,"10-15":1,"10-29":1,"11-09":1,"12-29":1};
var NORM=18;
function p2(n){return(n<10?"0":"")+n}
function iso(y,m,d){return y+"-"+p2(m)+"-"+p2(d)}
function dim(y,m){return new Date(y,m,0).getDate()}
function nn(s){return String(s||"").replace(/[\s​‌‍]/g,"")}
function kh(n){return KhCal.kn(n)}
function num(v){v=parseFloat(v);return isFinite(v)?v:0}
function fmtN(v){return v?kh(Math.round(v*100)/100):""}

/* ---------- ស្ថានភាព + សមកាលកម្ម (Firestore) ---------- */
var sch={r:{}},tsd={r:{}},stT="",tsT="",tsMo=(function(){var d=new Date();return d.getFullYear()+"-"+p2(d.getMonth()+1)})();
MAP.sched={
  docs:function(){var o={};Object.keys(sch.r).forEach(function(id){o["sched/"+id]=encO(id,sch.r[id])});return o},
  load:function(c){var r={},m=pick(c,"sched/");Object.keys(m).forEach(function(id){var v=decO(m[id]);if(v)r[id]=v});sch={r:r}}
};
MAP.ts={
  docs:function(){var o={};Object.keys(tsd.r).forEach(function(k){o["ts/"+k]=encO(k.split("_")[0],tsd.r[k])});return o},
  load:function(c){var r={},m=pick(c,"ts/");Object.keys(m).forEach(function(k){var v=decO(m[k]);if(v)r[k]=v});tsd={r:r}}
};
function saveS(){push("sched")}
function saveT(){push("ts")}
function canEd(id){return isAdm()||(who&&who.id===id)}
function tname(id){var t=teacherOf(id);return t.name||id}
function schOf(id){return(sch.r[id]&&sch.r[id].s)||[]}
function teachersOpt(sel){
  return data.map(function(t){return"<option value='"+esc(t.id)+"'"+(t.id===sel?" selected":"")+">"+esc(t.name)+"</option>"}).join("");
}

/* ========================= កាលវិភាគ ========================= */
function slotAt(id,d,p){var a=schOf(id);for(var i=0;i<a.length;i++)if(a[i][0]===d&&a[i][1]===p)return a[i];return null}
function sameSlot(a,b){return a&&b&&a[2]===b[2]&&a[3]===b[3]&&a[4]===b[4]}
function sumSched(id){
  var a=schOf(id),b=0,o=0,per=[0,0,0,0,0,0];
  a.forEach(function(s){if(s[4])o++;else{b++;per[s[0]]++}});
  return{b:b,o:o,per:per};
}
function renderSched(){
  if(!who)return;
  if(!stT||!data.some(function(t){return t.id===stT}))stT=data.some(function(t){return t.id===who.id})?who.id:(data[0]&&data[0].id)||"";
  $("stT").innerHTML=teachersOpt(stT);
  var ed=canEd(stT);
  $("stImp").style.display=ed?"":"none";$("stClr").style.display=ed?"":"none";$("stAll").style.display=isAdm()?"":"none";
  var S=sumSched(stT);
  $("stSum").innerHTML="<b>"+esc(tname(stT))+"</b> · ម៉ោងបង្រៀនមូលដ្ឋាន <b>"+kh(S.b)+"</b> ម៉ោង/សប្ដាហ៍ (ស្តង់ដារ "+kh(NORM)+")"+(S.o?" · ម៉ោងលើស (O/OE) <b>"+kh(S.o)+"</b>":"")+" · តាមថ្ងៃ៖ "+DK.map(function(d,i){return d+" "+kh(S.per[i])}).join(" · ");
  var h="<thead><tr><th style='width:120px'>ម៉ោង</th>"+DK.map(function(d){return"<th>"+d+"</th>"}).join("")+"</tr></thead><tbody>",skip={};
  for(var p=1;p<=11;p++){
    h+="<tr><td class=tm><b>"+kh(p)+"</b><br>"+kh(PT[p]).replace(/ - /g," – ")+"</td>";
    for(var d=0;d<6;d++){
      if(skip[d+"_"+p])continue;
      var s=slotAt(stT,d,p),span=1;
      if(s){
        while(p+span<=11&&!BRK[p+span-1]&&sameSlot(s,slotAt(stT,d,p+span))){skip[d+"_"+(p+span)]=1;span++}
        h+="<td class='cell"+(s[4]==="OE"?" oe":s[4]?" ob":"")+"' rowspan="+span+" data-d="+d+" data-p="+p+"><b>"+esc(s[2])+"</b><small>"+esc(s[3]||"")+(s[4]?" · "+s[4]:"")+"</small></td>";
      }else h+="<td class=cell data-d="+d+" data-p="+p+"></td>";
    }
    h+="</tr>";
    if(BRK[p])h+="<tr class=brk><td colspan=7>"+kh(BRK[p])+"</td></tr>";
  }
  $("stTb").innerHTML=h+"</tbody>";
  $("stTb").classList.toggle("ro",!ed);
}
window.renderSched=renderSched;
$("stT").onchange=function(){stT=this.value;renderSched()};
var cellDP=null;
$("stTb").onclick=function(e){
  var td=e.target.closest("td.cell");if(!td)return;
  if(!canEd(stT)){notify("អ្នកមើលបានតែកាលវិភាគរបស់គ្រូនេះ (កែបានតែគ្រូខ្លួនឯង ឬ Admin)");return}
  var d=+td.dataset.d,p=+td.dataset.p,s=slotAt(stT,d,p);cellDP=[d,p];
  $("dStH").textContent=DK[d]+" · ម៉ោង "+kh(p)+" ("+kh(PT[p])+")";
  var cl=[];try{cl=(window.CL||[]).map(function(c){return c.replace(/^M-/,"")})}catch(x){}
  $("dStCl").innerHTML=cl.map(function(c){return"<option value='"+esc(c)+"'>"}).join("");
  $("dStC").value=s?s[2]:"";$("dStR").value=s?s[3]:"";$("dStT").value=s?s[4]:"";$("dStN").value="1";
  $("dlgSt").showModal();
};
$("cxSt").onclick=function(){$("dlgSt").close()};
$("okSt").onclick=function(){
  if(!cellDP)return;
  var d=cellDP[0],p=cellDP[1],c=$("dStC").value.trim(),r=$("dStR").value.trim(),t=$("dStT").value,n=+$("dStN").value||1;
  var o=sch.r[stT]||(sch.r[stT]={s:[]});
  for(var i=0;i<n&&p+i<=11;i++){
    o.s=o.s.filter(function(x){return!(x[0]===d&&x[1]===p+i)});
    if(c)o.s.push([d,p+i,c,r,t]);
    if(BRK[p+i]&&i<n-1){}   /* ឆ្លងកាត់ម៉ោងសម្រាកបាន (ម៉ោងជាប់គ្នាក្នុងន័យលេខ) */
  }
  o.s.sort(function(a,b){return a[0]-b[0]||a[1]-b[1]});o.u=Date.now();
  saveS();$("dlgSt").close();renderSched();
};
function ascImport(id,name){
  var L=ASC[name];if(!L)return false;
  sch.r[id]={s:L.map(function(x){return x.slice()}),u:Date.now(),src:"aSc 20/10/2026"};return true;
}
function matchAsc(t){
  var k=nn(t.name),best="";
  Object.keys(ASC).forEach(function(n){if(nn(n)===k)best=n});
  if(!best)Object.keys(ASC).forEach(function(n){if(!best&&(k.indexOf(nn(n))>=0||nn(n).indexOf(k)>=0))best=n});
  return best;
}
$("stImp").onclick=function(){
  var t=teacherOf(stT),m=matchAsc(t);
  $("ascN").innerHTML=Object.keys(ASC).map(function(n){return"<option"+(n===m?" selected":"")+">"+esc(n)+"</option>"}).join("");
  $("dlgAsc").showModal();
};
$("cxAsc").onclick=function(){$("dlgAsc").close()};
$("okAsc").onclick=function(){
  var n=$("ascN").value;
  if(slotAt(stT,0,1)||schOf(stT).length){if(!confirm("កាលវិភាគចាស់របស់ "+tname(stT)+" នឹងត្រូវជំនួសដោយទិន្នន័យ aSc របស់ «"+n+"»។ បន្តឬទេ?"))return}
  if(ascImport(stT,n)){saveS();notify("បាននាំចូលកាលវិភាគ «"+n+"»")}
  $("dlgAsc").close();renderSched();
};
$("stAll").onclick=function(){
  if(!isAdm())return;
  var ok=[],no=[];
  Object.keys(ASC).forEach(function(n){
    var t=data.filter(function(x){return nn(x.name)===nn(n)})[0];
    if(t)ok.push([t,n]);else no.push(n);
  });
  var msg="នឹងនាំចូលកាលវិភាគ "+ok.length+" នាក់ (ជំនួសកាលវិភាគចាស់)៖\n"+ok.map(function(x){return"• "+x[0].name}).join("\n");
  if(no.length)msg+="\n\nរកមិនឃើញក្នុងបញ្ជីគ្រូ (ត្រូវនាំចូលដោយដៃ ក្រោយបន្ថែមគ្រូ)៖\n"+no.join(", ");
  if(!ok.length){alert(msg);return}
  if(!confirm(msg+"\n\nបន្តឬទេ?"))return;
  ok.forEach(function(x){ascImport(x[0].id,x[1])});saveS();renderSched();notify("បាននាំចូលកាលវិភាគ "+ok.length+" នាក់");
};
$("stClr").onclick=function(){
  if(!canEd(stT)||!confirm("សម្អាតកាលវិភាគទាំងអស់របស់ "+tname(stT)+" ?"))return;
  sch.r[stT]={s:[],u:Date.now()};saveS();renderSched();
};
function schedPrint(){
  var s=sumSched(stT),h="<div class='pg land'><div class=hd><div class=moul>ព្រះរាជាណាចក្រកម្ពុជា</div><div class=moul style='font-size:11pt'>ជាតិ សាសនា ព្រះមហាក្សត្រ</div></div>"+
  "<h2 class=moul style='font-size:13pt;margin:6px 0'>កាលវិភាគបង្រៀនរបស់ "+esc(tname(stT))+" · "+esc(inf().school)+"</h2>"+
  "<table class='ct tp' style='width:100%'><thead><tr><th>ម៉ោង</th>"+DK.map(function(d){return"<th>"+d+"</th>"}).join("")+"</tr></thead><tbody>",skip={};
  for(var p=1;p<=11;p++){
    h+="<tr><td><b>"+kh(p)+"</b> "+kh(PT[p])+"</td>";
    for(var d=0;d<6;d++){
      if(skip[d+"_"+p])continue;var c=slotAt(stT,d,p),span=1;
      if(c){while(p+span<=11&&!BRK[p+span-1]&&sameSlot(c,slotAt(stT,d,p+span))){skip[d+"_"+(p+span)]=1;span++}
        h+="<td rowspan="+span+"><b>"+esc(c[2])+"</b><br>"+esc(c[3]||"")+(c[4]?" ("+c[4]+")":"")+"</td>"}else h+="<td></td>";
    }
    h+="</tr>";if(BRK[p])h+="<tr><td colspan=7 style='background:#eee;font-size:7pt'>"+kh(BRK[p])+"</td></tr>";
  }
  h+="</tbody></table><p style='font-size:9pt'>ម៉ោងបង្រៀនមូលដ្ឋាន "+kh(s.b)+" ម៉ោង/សប្ដាហ៍"+(s.o?" · ម៉ោងលើស (O/OE) "+kh(s.o)+" ម៉ោង/សប្ដាហ៍":"")+"</p></div>";
  doPrint(h);
}
$("stPr").onclick=schedPrint;

/* ========================= Timesheet & Workplan ========================= */
function recKey(){return tsT+"_"+tsMo}
function getRec(create){
  var k=recKey(),r=tsd.r[k];
  if(!r&&create){
    var y=+tsMo.slice(0,4),m=+tsMo.slice(5,7),t=teacherOf(tsT);
    r=tsd.r[k]={m:tsMo,fr:iso(y,m,1),to:iso(y,m,dim(y,m)),rl:"",sb:t.sub||"គណិតវិទ្យា",ex:"",days:{},rc:"",wn:"",ft:{pl:"ភ្នំពេញ",d:"",kt:"",mn:"",md:"",mk:""}};
  }
  return r||null;
}
function defDay(id,y,m,n){
  var wd=new Date(y,m-1,n).getDay(),di=(wd+6)%7,s=wd===0?null:schedPer(id,di),st;
  if(FIXHOL[p2(m)+"-"+p2(n)])st="បុណ្យជាតិ";
  else if(wd===0)st="ឈប់សម្រាក";
  else if(wd===6&&!(s.b+s.o))st="ឈប់សម្រាក";
  else st="បង្រៀន";
  var h={b:0,i:0,o:0,l:0,v:0,c:0,u:0,x:0};
  if(st==="បង្រៀន"&&s){h.b=s.b;h.i=s.o}
  return{st:st,h:h,w:""};
}
function schedPer(id,di){var b=0,o=0;schOf(id).forEach(function(s){if(s[0]===di){if(s[4])o++;else b++}});return{b:b,o:o}}
function curDay(rec,y,m,n){
  var s=rec&&rec.days&&rec.days[n];if(s)return s;return defDay(tsT,y,m,n);
}
function inRange(rec,y,m,n){
  var d=iso(y,m,n),fr=rec?rec.fr:iso(y,m,1),to=rec?rec.to:iso(y,m,dim(y,m));
  return d>=fr&&d<=to;
}
function khShort(y,m,n){var c=KhCal.convert(y,m,n);return kh(c.day)+(c.half?"រោច":"កើត")}
function khDateText(isoD,override){
  if(override)return override;
  if(!/^\d{4}-\d{2}-\d{2}$/.test(isoD||""))return"";
  var a=isoD.split("-").map(Number);return KhCal.fmt(a[0],a[1],a[2])+" "+KhCal.gfmt(a[0],a[1],a[2]);
}
function khDateHtml(prefix,dv,ov,ro){
  /* ជ្រើសថ្ងៃតាមប្រតិទិនខ្មែរ */
  var c=null;if(/^\d{4}-\d{2}-\d{2}$/.test(dv||"")){var a=dv.split("-").map(Number);c=KhCal.convert(a[0],a[1],a[2])}
  var hs="<select data-kh='"+prefix+"|h' "+(ro?"disabled":"")+"><option value=0"+(c&&!c.half?" selected":"")+">កើត</option><option value=1"+(c&&c.half?" selected":"")+">រោច</option></select>";
  var ds="<select data-kh='"+prefix+"|d' "+(ro?"disabled":"")+">";for(var i=1;i<=15;i++)ds+="<option value="+i+(c&&c.day===i?" selected":"")+">"+kh(i)+"</option>";ds+="</select>";
  var ms="<select data-kh='"+prefix+"|m' "+(ro?"disabled":"")+">"+KhCal.MONTHS.map(function(n,i){return"<option value="+i+(c&&c.month===i?" selected":"")+">ខែ"+n+"</option>"}).join("")+"</select>";
  return"<div class=kh-row><span class=note style='margin:0'>កំណត់តាមប្រតិទិនខ្មែរ៖</span>"+hs+ds+ms+"<button type=button data-khgo='"+prefix+"' "+(ro?"disabled":"")+">រកថ្ងៃ</button></div>"+
    "<div class=kh-txt id='kht-"+prefix+"'>"+esc(khDateText(dv,""))+"</div>"+
    "<label>កែអត្ថបទកាលបរិច្ឆេទខ្មែរដោយដៃ (ទុកទទេ = ស្វ័យប្រវត្តិ)</label><input data-f='ft."+prefix+"k' value='"+esc(ov||"")+"' "+(ro?"readonly":"")+">";
}
function renderTS(){
  if(!who)return;
  var adm=isAdm();
  if(!tsT||(!adm&&tsT!==who.id)||!data.some(function(t){return t.id===tsT}))tsT=who.id;
  $("tsT").innerHTML=data.filter(function(t){return adm||t.id===who.id}).map(function(t){return"<option value='"+esc(t.id)+"'"+(t.id===tsT?" selected":"")+">"+esc(t.name)+"</option>"}).join("");
  $("tsM").value=tsMo;
  var ro=!canEd(tsT),y=+tsMo.slice(0,4),m=+tsMo.slice(5,7),n=dim(y,m),rec=getRec(false),t=teacherOf(tsT),ft=(rec&&rec.ft)||{pl:"ភ្នំពេញ"};
  $("tsFill").style.display=ro?"none":"";
  var h="<div class=tsh>"+
   "<div><label>ឈ្មោះអង្គភាព</label><input value='"+esc(inf().school)+"' readonly></div>"+
   "<div><label>បុគ្គលិកឈ្មោះ</label><input value='"+esc(t.name||"")+"' readonly></div>"+
   "<div><label>មុខវិជ្ជា</label><input data-f='sb' value='"+esc((rec&&rec.sb)||t.sub||"គណិតវិទ្យា")+"' "+(ro?"readonly":"")+"></div>"+
   "<div><label>តួនាទី/ភារៈកិច្ច</label><input data-f='rl' value='"+esc((rec&&rec.rl)||((t.rl||"សមាជិក")+"ក្រុមបច្ចេកទេស"))+"' "+(ro?"readonly":"")+"></div>"+
   "<div><label>ចាប់ពី</label><input type=date data-f='fr' value='"+esc(rec?rec.fr:iso(y,m,1))+"' "+(ro?"readonly":"")+"></div>"+
   "<div><label>រហូតដល់</label><input type=date data-f='to' value='"+esc(rec?rec.to:iso(y,m,n))+"' "+(ro?"readonly":"")+"></div>"+
   "<div><label>ផ្សេងៗ (បើមានសូមបញ្ជាក់)</label><input data-f='ex' value='"+esc((rec&&rec.ex)||"")+"' "+(ro?"readonly":"")+"></div>"+
   "</div>";
  h+="<div class=wrap><table class=tsg id=tsG><thead><tr><th>ថ្ងៃទី</th><th>បរិយាយ</th>"+HC.map(function(c){return"<th title='"+esc(c[1])+"'>"+c[2]+"</th>"}).join("")+"<th style='min-width:240px'>ផែនការសកម្មភាព (Workplan)</th></tr></thead><tbody>";
  for(var d=1;d<=n;d++){
    var cd=curDay(rec,y,m,d),on=inRange(rec,y,m,d),wd=new Date(y,m-1,d).getDay(),rest=cd.st==="ឈប់សម្រាក"||cd.st==="បុណ្យជាតិ";
    h+="<tr class='"+(rest?"rest ":"")+(on?"":"off")+"' data-n="+d+"><td class=dn><b>"+kh(d)+"</b> "+KhCal.WD[wd]+"<small>"+khShort(y,m,d)+"</small></td>"+
      "<td><select data-n="+d+" data-f='st' "+(ro||!on?"disabled":"")+">"+ST.map(function(s){return"<option"+(s===cd.st?" selected":"")+">"+s+"</option>"}).join("")+"</select></td>"+
      HC.map(function(c){return"<td><input type=number min=0 step=0.5 data-n="+d+" data-f='h."+c[0]+"' value='"+(cd.h[c[0]]||"")+"' "+(ro||!on?"disabled":"")+"></td>"}).join("")+
      "<td><textarea rows=1 data-n="+d+" data-f='w' "+(ro||!on?"disabled":"")+">"+esc(cd.w||"")+"</textarea></td></tr>";
  }
  h+="</tbody><tfoot><tr><td colspan=2>សរុប</td>"+HC.map(function(c){return"<td id='tt-"+c[0]+"'></td>"}).join("")+"<td id=tt-all></td></tr></tfoot></table></div>";
  h+="<div class=tsh style='margin-top:10px'><div style='grid-column:1/-1'><label>អនុសាសន៍</label><textarea rows=2 data-f='rc' style='width:100%;margin:0' "+(ro?"readonly":"")+">"+esc((rec&&rec.rc)||"")+"</textarea></div>"+
    "<div style='grid-column:1/-1'><label>កំណត់ចំណាំ (Notes) ក្នុង Workplan</label><textarea rows=2 data-f='wn' style='width:100%;margin:0' "+(ro?"readonly":"")+">"+esc((rec&&rec.wn)||"")+"</textarea></div></div>";
  h+="<div class=tsf><fieldset><legend>ហត្ថលេខារបស់បុគ្គលិក</legend>"+
    "<div><label>ឈ្មោះបុគ្គលិក</label><input value='"+esc(t.name||"")+"' readonly></div>"+
    "<div><label>ធ្វើនៅ</label><input data-f='ft.pl' value='"+esc(ft.pl||"")+"' "+(ro?"readonly":"")+"></div>"+
    "<div><label>កាលបរិច្ឆេទ (គ្រិស្តសករាជ)</label><input type=date data-f='ft.d' value='"+esc(ft.d||"")+"' "+(ro?"readonly":"")+"></div>"+
    khDateHtml("d",ft.d,ft.kt,ro)+"</fieldset>"+
    "<fieldset><legend>ហត្ថលេខាគណៈគ្រប់គ្រង</legend>"+
    "<div><label>ឈ្មោះគណៈគ្រប់គ្រង</label><input data-f='ft.mn' value='"+esc(ft.mn||"")+"' "+(ro?"readonly":"")+"></div>"+
    "<div><label>កាលបរិច្ឆេទ (គ្រិស្តសករាជ)</label><input type=date data-f='ft.md' value='"+esc(ft.md||"")+"' "+(ro?"readonly":"")+"></div>"+
    khDateHtml("m",ft.md,ft.mk,ro)+"</fieldset></div>";
  $("tsBody").innerHTML=h;updTot();
}
window.renderTS=renderTS;
function updTot(){
  var rec=getRec(false),y=+tsMo.slice(0,4),m=+tsMo.slice(5,7),n=dim(y,m),T={},all=0;
  HC.forEach(function(c){T[c[0]]=0});
  for(var d=1;d<=n;d++){if(!inRange(rec,y,m,d))continue;var cd=curDay(rec,y,m,d);HC.forEach(function(c){T[c[0]]+=num(cd.h[c[0]])})}
  HC.forEach(function(c){all+=T[c[0]];var e=$("tt-"+c[0]);if(e)e.textContent=fmtN(T[c[0]])||"០"});
  if($("tt-all"))$("tt-all").textContent="សរុបម៉ោង "+kh(Math.round(all*100)/100);
  return T;
}
function setPath(rec,f,v,n){
  var p=f.split(".");
  if(p[0]==="ft"){rec.ft=rec.ft||{};rec.ft[p[1]]=v;return}
  if(p[0]==="h"||f==="st"||f==="w"){
    var y=+tsMo.slice(0,4),m=+tsMo.slice(5,7),cur=rec.days[n]||JSON.parse(JSON.stringify(defDay(tsT,y,m,n)));
    if(p[0]==="h")cur.h[p[1]]=num(v);
    else if(f==="st"){
      cur.st=v;
      if(v==="ឈប់សម្រាក"||v==="បុណ្យជាតិ"){HC.forEach(function(c){cur.h[c[0]]=0})}
      else if(v==="បង្រៀន"){var dd=defDay(tsT,y,m,n);cur.h.b=dd.h.b;cur.h.i=dd.h.i}
    }else cur.w=v;
    rec.days[n]=cur;return;
  }
  rec[f]=v;
}
$("tsT").onchange=function(){tsT=this.value;renderTS()};
$("tsM").onchange=function(){tsMo=this.value||tsMo;renderTS()};
function onEdit(e,full){
  var f=e.target.dataset.f;if(!f||!canEd(tsT))return;
  if(f==="ft.dk")f="ft.kt";
  var rec=getRec(true),n=+e.target.dataset.n||0,v=e.target.value;
  setPath(rec,f,v,n);saveT();
  if(f==="ft.d"||f==="ft.md"){renderTS();return}
  if(full||f==="fr"||f==="to"||f==="st")renderTS();else updTot();
}
$("tsBody").oninput=function(e){if(e.target.type==="date")return;onEdit(e,false)};
$("tsBody").onchange=function(e){
  if(e.target.dataset.kh)return;
  onEdit(e,e.target.type==="date"||e.target.dataset.f==="st"||e.target.dataset.f==="fr"||e.target.dataset.f==="to");
};
/* ហៅ «រកថ្ងៃ» តាមប្រតិទិនខ្មែរ */
$("tsBody").onclick=function(e){
  var b=e.target.closest("button[data-khgo]");if(!b||!canEd(tsT))return;
  var p=b.dataset.khgo,box=b.parentNode,h=+box.querySelector("[data-kh='"+p+"|h']").value,d=+box.querySelector("[data-kh='"+p+"|d']").value,mo=+box.querySelector("[data-kh='"+p+"|m']").value;
  var rec=getRec(true),y=+tsMo.slice(0,4),m=+tsMo.slice(5,7),near=new Date(y,m-1,dim(y,m)),best=null,bd=1e9;
  for(var i=-75;i<=75;i++){
    var dt=new Date(near.getFullYear(),near.getMonth(),near.getDate()+i),c=KhCal.convert(dt.getFullYear(),dt.getMonth()+1,dt.getDate());
    if(c.half===h&&c.day===d&&c.month===mo&&!c.leap&&Math.abs(i)<bd){bd=Math.abs(i);best=dt}
  }
  if(!best){notify("រកមិនឃើញថ្ងៃនេះជិតខែនេះទេ (ក្នុង ៧៥ ថ្ងៃ)។ សូមជ្រើសថ្ងៃផ្សេង ឬកែអត្ថបទដោយដៃ។");return}
  rec.ft=rec.ft||{};rec.ft[p==="d"?"d":"md"]=iso(best.getFullYear(),best.getMonth()+1,best.getDate());
  rec.ft[p==="d"?"kt":"mk"]="";saveT();renderTS();
  notify("បានកំណត់ថ្ងៃទី "+kh(best.getDate())+" ខែ"+M[best.getMonth()]+" "+kh(best.getFullYear()));
};
$("tsFill").onclick=function(){
  if(!canEd(tsT))return;
  var rec=getRec(true);
  if(!schOf(tsT).length){alert("មិនទាន់មានកាលវិភាគរបស់គ្រូនេះទេ — សូមនាំចូល ឬបញ្ចូលក្នុងផ្ទាំង «កាលវិភាគបង្រៀន» មុន។");return}
  if(!confirm("ជំនួសស្ថានភាព និងម៉ោង ទាំងអស់ក្នុងខែនេះដោយតម្លៃតាមកាលវិភាគ? (ផែនការសកម្មភាព Workplan នឹងនៅដដែល)"))return;
  var y=+tsMo.slice(0,4),m=+tsMo.slice(5,7),n=dim(y,m),nw={};
  for(var d=1;d<=n;d++){var old=rec.days[d];if(old&&old.w){var nd=defDay(tsT,y,m,d);nd.w=old.w;nw[d]=nd}}
  rec.days=nw;   /* ថ្ងៃគ្មាន Workplan → ប្រើតម្លៃពីកាលវិភាគផ្ទាល់ */
  saveT();renderTS();notify("បានបំពេញម៉ោងតាមកាលវិភាគ");
};

/* ---------- បោះពុម្ព TS (ផ្ដេក) + WP (ប្រតិទិនខែ) ---------- */
function tsPrintHTML(){
  var y=+tsMo.slice(0,4),m=+tsMo.slice(5,7),n=dim(y,m),rec=getRec(false),t=teacherOf(tsT),ft=(rec&&rec.ft)||{},I=inf();
  var head="<div class=hd><div class=moul>ព្រះរាជាណាចក្រកម្ពុជា</div><div class=moul style='font-size:10pt'>ជាតិ សាសនា ព្រះមហាក្សត្រ</div></div>";
  var T={};HC.forEach(function(c){T[c[0]]=0});
  var days="<tr><td class=l><b>កាលបរិច្ឆេទ</b></td><td class=l>សរុប</td>",wdr="<tr><td class=l></td><td></td>",st="<tr><td class=l><b>បរិយាយ</b></td><td></td>";
  var rows=HC.map(function(){return""});
  for(var d=1;d<=n;d++){
    var cd=curDay(rec,y,m,d),on=inRange(rec,y,m,d),wd=new Date(y,m-1,d).getDay(),rest=on&&(cd.st==="ឈប់សម្រាក"||cd.st==="បុណ្យជាតិ"),cls=on?(rest?" class=x":""):" class=x";
    days+="<td"+cls+">"+kh(d)+"</td>";wdr+="<td"+cls+">"+KhCal.WD[wd].slice(0,2)+"</td>";
    st+="<td"+cls+">"+(on?STS[cd.st]:"")+"</td>";
    HC.forEach(function(c,i){var v=on?num(cd.h[c[0]]):0;T[c[0]]+=v;rows[i]+="<td"+cls+">"+(v?fmtN(v):"")+"</td>"});
  }
  days+="</tr>";wdr+="</tr>";st+="</tr>";
  var body=days+wdr+st+HC.map(function(c,i){return"<tr><td class=l>"+esc(c[1])+"</td><td><b>"+(fmtN(T[c[0]])||"០")+"</b></td>"+rows[i]+"</tr>"}).join("");
  var all=0;HC.forEach(function(c){all+=T[c[0]]});
  var dOf=function(iso1,ov){var tx=khDateText(iso1,ov);return tx||"ថ្ងៃទី......ខែ......ឆ្នាំ......"};
  var ts="<div class='pg land'>"+head+
   "<div style='display:flex;justify-content:space-between;align-items:center;margin:4px 0'><div class=moul style='text-align:left'>"+esc(I.school)+"<br><span style='font-size:9pt'>សាលារៀនជំនាន់ថ្មី · New Generation School</span></div><h2 class=moul style='font-size:13pt;margin:0'>តារាងពេលវេលា (Timesheet)<br><span style='font-size:10pt'>ខែ"+M[m-1]+" ឆ្នាំ"+kh(y)+"</span></h2><div style='width:30mm'></div></div>"+
   "<table style='width:100%;font-size:9pt;margin-bottom:4px'><tr><td>បុគ្គលិកឈ្មោះ៖ <b>"+esc(t.name||"")+"</b></td><td>មុខវិជ្ជា៖ "+esc((rec&&rec.sb)||t.sub||"គណិតវិទ្យា")+"</td><td>តួនាទី/ភារៈកិច្ច៖ "+esc((rec&&rec.rl)||((t.rl||"សមាជិក")+"ក្រុមបច្ចេកទេស"))+"</td><td>ចាប់ពី "+esc(fdd(rec?rec.fr:iso(y,m,1)))+" រហូតដល់ "+esc(fdd(rec?rec.to:iso(y,m,n)))+"</td></tr></table>"+
   "<table class='tp'>"+body+"<tr><td class=l colspan="+(n+2)+" style='text-align:left'><b>អនុសាសន៍៖</b> "+esc((rec&&rec.rc)||"")+(rec&&rec.ex?" · ផ្សេងៗ៖ "+esc(rec.ex):"")+"</td></tr></table>"+
   "<p style='font-size:7.5pt;margin:2px 0'>បរិយាយ៖ ប = បង្រៀន · ឈ = ឈប់សម្រាក · បុ = បុណ្យជាតិ · សក = សកម្មភាពផ្សេងៗ · ម៉ោងសរុបក្នុងខែ <b>"+kh(Math.round(all*100)/100)+"</b> ម៉ោង</p>"+
   "<p style='font-size:9pt;margin:2px 0'>សូមបញ្ជាក់ថា ព័ត៌មានខាងលើនេះ ពិតជាត្រឹមត្រូវប្រាកដមែន</p>"+
   "<div class=sig style='font-size:9pt;margin-top:6px'><div>ហត្ថលេខារបស់បុគ្គលិក<br><br><br>ឈ្មោះបុគ្គលិក៖ <b>"+esc(t.name||"")+"</b><br>ធ្វើនៅ"+esc(ft.pl||"ភ្នំពេញ")+" "+esc(dOf(ft.d,ft.kt))+"</div>"+
   "<div>ហត្ថលេខាគណៈគ្រប់គ្រង<br><br><br>ឈ្មោះគណៈគ្រប់គ្រង៖ <b>"+esc(ft.mn||"")+"</b><br>"+esc(dOf(ft.md,ft.mk))+"</div></div></div>";
  /* Workplan */
  var first=new Date(y,m-1,1),start=new Date(y,m-1,1-first.getDay()),last=new Date(y,m-1,n),weeks=[];
  for(var c=new Date(start);c<=last;c.setDate(c.getDate()+7))weeks.push(new Date(c));
  var wp="<div class='pg land'>"+head+"<h2 class=moul style='font-size:13pt;margin:4px 0'>ផែនការសកម្មភាពការងារជាក់ស្តែង · ខែ"+M[m-1]+" ឆ្នាំ"+kh(y)+" · "+esc(t.name||"")+"</h2>"+
   "<table class='tp wp'><thead><tr>"+["អាទិត្យ","ច័ន្ទ","អង្គារ","ពុធ","ព្រហស្បតិ៍","សុក្រ","សៅរ៍"].map(function(x){return"<th>"+x+"</th>"}).join("")+"</tr></thead><tbody>";
  weeks.forEach(function(w0){
    wp+="<tr>";
    for(var k=0;k<7;k++){
      var dt=new Date(w0.getFullYear(),w0.getMonth(),w0.getDate()+k),inM=dt.getMonth()===m-1,dd=dt.getDate(),cdy=inM?curDay(rec,y,m,dd):null;
      var txt=inM&&cdy?(cdy.w||""):"",holi=inM&&cdy&&(cdy.st==="បុណ្យជាតិ")?"បុណ្យជាតិ":"";
      wp+="<td"+(inM?"":" class=x")+"><span class=dd>"+kh(dd)+"</span><span class=lk>"+khShort(dt.getFullYear(),dt.getMonth()+1,dd)+"</span>"+(holi?"<div><b>"+holi+"</b></div>":"")+(txt?"<div>"+esc(txt)+"</div>":"")+"</td>";
    }
    wp+="</tr>";
  });
  wp+="</tbody></table>"+(rec&&rec.wn?"<p style='font-size:8.5pt;white-space:pre-wrap'><b>Notes:</b> "+esc(rec.wn)+"</p>":"")+"</div>";
  return ts+wp;
}
$("tsPr").onclick=function(){doPrint(tsPrintHTML())};
$("tsCsv").onclick=function(){
  var y=+tsMo.slice(0,4),m=+tsMo.slice(5,7),n=dim(y,m),rec=getRec(false);
  var rows=[["ថ្ងៃទី","ថ្ងៃ","ថ្ងៃខ្មែរ","បរិយាយ"].concat(HC.map(function(c){return c[1]})).concat(["Workplan"])];
  for(var d=1;d<=n;d++){if(!inRange(rec,y,m,d))continue;var cd=curDay(rec,y,m,d);rows.push([iso(y,m,d),KhCal.WD[new Date(y,m-1,d).getDay()],khShort(y,m,d),cd.st].concat(HC.map(function(c){return cd.h[c[0]]||0})).concat([(cd.w||"").replace(/\r?\n/g," | ")]))}
  dlCSV(rows,"timesheet-"+tsT+"-"+tsMo+".csv");
};
})();
