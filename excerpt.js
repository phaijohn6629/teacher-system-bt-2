/* ========================================================================
   គ្រប់គ្រងថ្នាក់រៀន › សម្រង់អត្ថបទប្រចាំខែ (ខែ-ខែ)
   ក្បាល៖ សម្រង់អត្ថបទប្រចាំខែ · ខ្លួន៖ តារាង ៣ ជួរ (កាលបរិច្ឆេទ · ខ្លឹមសារមេរៀន · អវត្តមានសិស្ស)
   ជើង៖ តាមគម្រូ Workplan · Firestore៖ cx/{ID គ្រូ}_{YYYY-MM}_{ថ្នាក់}
   ======================================================================== */
(function(){
"use strict";
var X=window.SCHX,schOf=X.schOf,canEd=X.canEd,getSig=X.getSig,fontsOk=X.fontsOk,doPrintNow=X.doPrintNow,LOGO2=X.LOGO2,iso=X.iso,dim=X.dim,kh=X.kh,p2=X.p2,FIXHOL=X.FIXHOL,tsMo=X.tsMo();
var cxd={r:{}},cxT="",cxC="",cxMo=tsMo,cxMo2="";
MAP.cx={
  docs:function(){var o={};Object.keys(cxd.r).forEach(function(k){o["cx/"+k]=encO(k.split("_")[0],cxd.r[k])});return o},
  load:function(c){var r={},m=pick(c,"cx/");Object.keys(m).forEach(function(k){var v=decO(m[k]);if(v)r[k]=v});cxd={r:r}}
};
function saveCx(){push("cx")}
function cxSlug(c){return String(c||"").replace(/[^A-Za-z0-9\-]+/g,"-").replace(/^-+|-+$/g,"")||"x"}
function cxKey(){return cxT+"_"+cxMo+"_"+cxSlug(cxC)}
function cxRec(create){
  var k=cxKey(),r=cxd.r[k];
  if(!r&&create){var t=teacherOf(cxT);r=cxd.r[k]={m:cxMo,m2:cxMo2||cxMo,cls:cxC,sb:t.sub||"គណិតវិទ្យា",rows:[],ft:{pl:"រាជធានីភ្នំពេញ",d:"",kt:"",klu:"0",sgo:"1"}}}
  return r||null;
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
function cxSort(rec){rec.rows.sort(function(a,b){return(a.d||"9999").localeCompare(b.d||"9999")})}
function cxFill(){
  /* បង្កើតជួរតាមកាលវិភាគ៖ ថ្ងៃដែលថ្នាក់នេះមានម៉ោងបង្រៀន (រំលងបុណ្យជាតិ និងថ្ងៃអាទិត្យ) */
  if(!canEd(cxT)){alert("គ្មានសិទ្ធិកែទិន្នន័យគ្រូនេះ");return}
  if(!cxC){alert("សូមជ្រើសថ្នាក់ជាមុន");return}
  var di={};schOf(cxT).forEach(function(s){if(s[2]===cxC)di[s[0]]=1});
  if(!Object.keys(di).length){alert("កាលវិភាគរបស់គ្រូនេះមិនមានថ្នាក់ «"+cxC+"» ទេ។ សូមបញ្ចូលក្នុងកាលវិភាគជាមុន ឬបន្ថែមជួរដោយដៃ។");return}
  var rec=cxRec(true),e=cxMonthEnd(),have={};rec.rows.forEach(function(r){have[r.d]=1});
  var y0=+cxMo.slice(0,4),m0=+cxMo.slice(5,7),y1=+e.slice(0,4),m1=+e.slice(5,7),add=0;
  for(var y=y0,m=m0;y<y1||(y===y1&&m<=m1);){
    for(var d=1;d<=dim(y,m);d++){
      var wd=new Date(y,m-1,d).getDay(),i=(wd+6)%7;
      if(wd===0||!di[i]||FIXHOL[p2(m)+"-"+p2(d)])continue;
      var k=iso(y,m,d);if(have[k])continue;rec.rows.push({d:k,c:"",a:""});add++;
    }
    m++;if(m>12){m=1;y++}
  }
  cxSort(rec);saveCx();renderCx();notify("បានបន្ថែម "+add+" ជួរតាមកាលវិភាគ");
}
/* ជ្រើសជំពូក/មេរៀនតាមជួរ៖ មេរៀនតាមកម្មវិធីសិក្សាសប្ដាហ៍នោះនៅខាងលើ បន្ទាប់មកមេរៀនទាំងអស់តាមជំពូក */
function cxG(){var g=parseInt(cxC);return window.CUR&&window.CUR[g]&&window.CUR[g].LS?g:0}
function cxLsName(g,n){var l=window.CUR[g].LS[n];return l?(l[3]?"ជំពូកទី"+kh(l[3])+" · មេរៀនទី"+kh(l[5])+" "+l[0]:"មេរៀនទី"+kh(+n)+" "+l[0]):""}
function cxLsOpts(g,r){
  var LS=window.CUR[g].LS,sel=r.ls||"",o="<option value=''>— ជ្រើសជំពូក/មេរៀន —</option>",wk={};
  if(/^\d{4}-\d{2}-\d{2}$/.test(r.d||""))CURX.sessions(r.d,cxC).forEach(function(x){if(x.t==="L")wk[x.n]=1});
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
function renderCx(){
  if(!who)return;
  var adm=isAdm();
  if(!cxT||(!adm&&cxT!==who.id)||!data.some(function(t){return t.id===cxT}))cxT=who.id;
  var cls=cxClasses(cxT);if(!cxC||(cls.mine.concat(cls.rest).indexOf(cxC)<0))cxC=cls.mine[0]||cls.rest[0]||"";
  $("cxT").innerHTML=data.filter(function(t){return adm||t.id===who.id}).map(function(t){return"<option value='"+esc(t.id)+"'"+(t.id===cxT?" selected":"")+">"+esc(t.name)+"</option>"}).join("");
  $("cxC").innerHTML=(cls.mine.length?"<optgroup label='ថ្នាក់តាមកាលវិភាគ'>"+cls.mine.map(function(c){return"<option"+(c===cxC?" selected":"")+">"+esc(c)+"</option>"}).join("")+"</optgroup>":"")+
    "<optgroup label='ថ្នាក់ផ្សេងៗ'>"+cls.rest.map(function(c){return"<option"+(c===cxC?" selected":"")+">"+esc(c)+"</option>"}).join("")+"</optgroup>";
  $("cxM").value=cxMo;
  var rec=cxRec(false),ro=!canEd(cxT),t=teacherOf(cxT),ft=(rec&&rec.ft)||{pl:"រាជធានីភ្នំពេញ"};
  $("cxM2").value=cxMonthEnd();
  ["cxFill","cxAdd","cxCur"].forEach(function(i){$(i).style.display=ro?"none":""});
  var rows=(rec&&rec.rows)||[],h="<div class=tsh><div><label>បុគ្គលិកឈ្មោះ</label><input value='"+esc(t.name||"")+"' readonly></div>"+
    "<div><label>មុខវិជ្ជា</label><input data-cf='sb' value='"+esc((rec&&rec.sb)||t.sub||"គណិតវិទ្យា")+"' "+(ro?"readonly":"")+"></div>"+
    "<div><label>ថ្នាក់</label><input value='"+esc(cxC)+"' readonly></div></div>";
  h+="<div class=wrap><table class=tsg id=cxG><thead><tr><th style='width:150px'>កាលបរិច្ឆេទ</th><th>ខ្លឹមសារមេរៀន</th><th style='width:32%'>អវត្តមានសិស្ស</th><th style='width:44px'></th></tr></thead><tbody>"+
    (rows.length?rows.map(function(r,i){
      return"<tr><td><input type=date data-ci="+i+" data-ck='d' value='"+esc(r.d||"")+"' "+(ro?"disabled":"")+"><small>"+esc(cxDateTxt(r.d))+"</small></td>"+
        "<td>"+(cxG()?"<select class=cxls data-ci="+i+" data-ck='ls' "+(ro?"disabled":"")+">"+cxLsOpts(cxG(),r)+"</select>":"")+"<textarea rows=2 data-ci="+i+" data-ck='c' "+(ro?"readonly":"")+">"+esc(r.c||"")+"</textarea></td>"+
        "<td><textarea rows=2 data-ci="+i+" data-ck='a' placeholder='ឈ្មោះ/ចំនួនសិស្សអវត្តមាន' "+(ro?"readonly":"")+">"+esc(r.a||"")+"</textarea></td>"+
        "<td>"+(ro?"":"<button type=button class=danger data-cdel="+i+" title='លុបជួរ'>✕</button>")+"</td></tr>";
    }).join(""):"<tr><td colspan=4 class=empty>មិនទាន់មានជួរទេ។ ចុច «⚡ បង្កើតជួរតាមកាលវិភាគ» ឬ «＋ បន្ថែមជួរ»។</td></tr>")+"</tbody></table></div>";
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
  var o={};
  Object.keys(cxd.r).forEach(function(k){
    if(k.split("_")[0]!==tid)return;var rec=cxd.r[k],g=parseInt(rec.cls);
    (rec.rows||[]).forEach(function(r){
      if((r.d||"").slice(0,7)!==ym)return;
      var t="";
      if(r.ls&&window.CUR[g]&&window.CUR[g].LS[r.ls]){var l=window.CUR[g].LS[r.ls];t="មេរៀនទី"+kh(l[5]||r.ls)+" "+l[0]}
      else t=((r.c||"").split("\n").filter(Boolean)[0]||"").replace(/\s+—.*$/,"").replace(/^ជំពូកទី\S+\s.*?·\s*/,"");
      if(!t)return;var d=+r.d.slice(8,10);(o[d]=o[d]||[]).push(rec.cls+"៖ "+t);
    });
  });
  return o;
};window.cxPrintHTML=function(){return cxPrintHTML()};
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
$("cxBody").oninput=function(e){if(e.target.type==="date")return;cxEdit(e)};
$("cxBody").onchange=function(e){
  var el=e.target;if(!canEd(cxT))return;
  if(el.hasAttribute("data-cklu")){var r=cxRec(true);r.ft=r.ft||{};r.ft.klu=el.checked?"1":"0";saveCx();return}
  if(el.hasAttribute("data-csgo")){var r2=cxRec(true);r2.ft=r2.ft||{};r2.ft.sgo=el.checked?"1":"0";saveCx();return}
  if(el.dataset.ck==="ls"){
    var rc=cxRec(true),row=rc.rows[+el.dataset.ci],g=cxG();if(!row||!g)return;
    row.ls=el.value?+el.value:"";
    if(row.ls){
      var hd=CURX.text({t:"L",n:row.ls,mk:0,g:g,s:[]}),c=row.c||"",ln=c.split("\n");
      if(!c.trim())row.c=hd;
      else if(/^(ជំពូកទី|មេរៀនទី)/.test(ln[0])){var dash=ln[0].indexOf(" — ");ln[0]=hd+(dash>=0?ln[0].slice(dash):"");row.c=ln.join("\n")}
      else row.c=hd+"\n"+c;
    }
    saveCx();renderCx();return;
  }
  if(el.type==="date"){
    cxEdit(e);var rec=cxRec(false);if(rec&&el.dataset.ck==="d")cxSort(rec);saveCx();renderCx();
  }else cxEdit(e);
};
$("cxBody").onclick=function(e){
  var b=e.target.closest("[data-cdel]");if(!b||!canEd(cxT))return;
  var rec=cxRec(false);if(!rec)return;
  if(confirm("តើលុបជួរនេះមែនទេ?")){rec.rows.splice(+b.dataset.cdel,1);saveCx();renderCx()}
};
$("cxT").onchange=function(){cxT=this.value;cxC="";renderCx()};
$("cxC").onchange=function(){cxC=this.value;renderCx()};
$("cxM").onchange=function(){cxMo=this.value||cxMo;if(cxMo2<cxMo)cxMo2=cxMo;renderCx()};
$("cxM2").onchange=function(){
  cxMo2=this.value||cxMo;if(cxMo2<cxMo)cxMo2=cxMo;
  var r=cxRec(false);if(r&&canEd(cxT)){r.m2=cxMo2;saveCx()}renderCx()};
$("cxFill").onclick=cxFill;
$("cxCur").onclick=function(){
  if(!canEd(cxT)){alert("គ្មានសិទ្ធិកែទិន្នន័យគ្រូនេះ");return}
  if(!window.CURX||!CURX.has(cxC)){alert("មិនទាន់មានកម្មវិធីសិក្សាសម្រាប់ថ្នាក់ «"+cxC+"» ទេ (បច្ចុប្បន្នមានថ្នាក់ទី៧ ដល់ទី១១)");return}
  var rec=cxRec(false);if(!rec||!rec.rows.length){alert("សូមបង្កើតជួរតាមកាលវិភាគជាមុន (⚡ បង្កើតជួរតាមកាលវិភាគ)");return}
  var grp={},keys=[];
  rec.rows.forEach(function(r,i){
    if(!/^\d{4}-\d{2}-\d{2}$/.test(r.d||""))return;
    var a=r.d.split("-").map(Number),dt=new Date(a[0],a[1]-1,a[2]);dt.setDate(dt.getDate()-((dt.getDay()+6)%7));
    var k=dt.getFullYear()+"-"+dt.getMonth()+"-"+dt.getDate();if(!grp[k]){grp[k]=[];keys.push(k)}grp[k].push(i);
  });
  var done=0,skip=0;
  keys.forEach(function(k){
    var idx=grp[k],S=CURX.sessions(rec.rows[idx[0]].d,cxC);if(!S.length)return;
    idx.forEach(function(ri,j){
      var r=rec.rows[ri];if(r.c){skip++;return}
      var part=j===idx.length-1?S.slice(j):S.slice(j,j+1);if(!part.length)return;
      r.c=part.map(function(s){return CURX.text(s)}).join("\n");done++;
      var L0=part.filter(function(s){return s.t==="L"})[0];if(L0)r.ls=L0.n;
    });
  });
  saveCx();renderCx();notify("បានបំពេញ "+done+" ជួរពីកម្មវិធីសិក្សា"+(skip?" (រំលង "+skip+" ជួរដែលមានអត្ថបទរួច)":""));
};

$("cxAdd").onclick=function(){
  if(!canEd(cxT)||!cxC)return;
  var rec=cxRec(true),last=rec.rows.length?rec.rows[rec.rows.length-1].d:iso(+cxMo.slice(0,4),+cxMo.slice(5,7),1);
  rec.rows.push({d:last,c:"",a:""});saveCx();renderCx();
};
function cxPrintHTML(){
  var rec=cxRec(false)||{rows:[],ft:{}},t=teacherOf(cxT),ft=rec.ft||{},y=+cxMo.slice(0,4),m=+cxMo.slice(5,7),e=cxMonthEnd(),y2=+e.slice(0,4),m2=+e.slice(5,7);
  var per=y===y2?(m===m2?"ខែ"+M[m-1]:"ខែ"+M[m-1]+" ដល់ ខែ"+M[m2-1])+" ឆ្នាំ"+kh(y):"ខែ"+M[m-1]+" ឆ្នាំ"+kh(y)+" ដល់ ខែ"+M[m2-1]+" ឆ្នាំ"+kh(y2);
  var tdy=new Date(),tdIso=iso(tdy.getFullYear(),tdy.getMonth()+1,tdy.getDate()),fd=ft.d||tdIso,wa=fd.split("-").map(Number);
  var plc=(ft.pl&&ft.pl!=="ភ្នំពេញ")?ft.pl:"រាជធានីភ្នំពេញ",wg="ថ្ងៃទី "+kh(wa[2])+" ខែ "+M[wa[1]-1]+" ឆ្នាំ"+kh(wa[0]);
  var wl=ft.klu==="1"?((ft.d&&ft.kt)?ft.kt:KhCal.fmt(wa[0],wa[1],wa[2])):"",sig=(ft.sgo==="0")?"":getSig(cxT);
  var rows=(rec.rows||[]).slice();
  return"<div class='pg cxp'>"+
   "<div class=cxh><img src='"+LOGO2+"' class=cxlogo alt=''><div class=cxt><div class=moul style='font-size:12pt'>សាលារៀនជំនាន់ថ្មី</div><div class=en style='font-size:10pt;margin:2px 0 4px'>New Generation School</div>"+
    "<div class=moul style='font-size:13pt'>សម្រង់អត្ថបទប្រចាំខែ</div><div class=cxper>"+esc(per)+"</div></div></div>"+
   "<div class=cxi><div><span>បុគ្គលិកឈ្មោះ៖</span> <b>"+esc(t.name||"")+"</b></div><div><span>មុខវិជ្ជា៖</span> <b>"+esc(rec.sb||t.sub||"គណិតវិទ្យា")+"</b></div><div><span>ថ្នាក់៖</span> <b>"+esc(cxC)+"</b></div></div>"+
   "<table class=cxg><thead><tr><th style='width:27%'>កាលបរិច្ឆេទ</th><th>ខ្លឹមសារមេរៀន</th><th style='width:24%'>អវត្តមានសិស្ស</th></tr></thead><tbody>"+
   (rows.length?rows.map(function(r){return"<tr><td class=cd>"+esc(cxDateTxt(r.d))+"</td><td class=cc>"+esc(r.c||"").replace(/\n/g,"<br>")+"</td><td class=ca>"+esc(r.a||"").replace(/\n/g,"<br>")+"</td></tr>"}).join(""):"<tr><td>&nbsp;</td><td></td><td></td></tr>")+
   "</tbody></table>"+
   "<div class=cxf><div class=moul style='font-size:10.5pt;line-height:1.7'>បានឃើញ និងត្រួតពិនិត្យ<br>ជ.គណៈគ្រប់គ្រងសាលារៀនជំនាន់ថ្មី</div>"+
   "<div class=cxr>"+(wl?"<div class=lu>"+esc(wl)+"</div>":"")+"<div class=gd>"+esc(plc)+" "+esc(wg)+"</div><div class=sn>ហត្ថលេខា និងឈ្មោះ</div>"+
   "<div class=sb>"+(sig?"<img src='"+sig+"' class=sgi alt=''>":"<span style='width:30mm;display:inline-block'></span>")+"<b>"+esc(t.name||"")+"</b></div></div></div></div>";
}
$("cxPr").onclick=function(){
  if(!cxC){alert("សូមជ្រើសថ្នាក់ជាមុន");return}
  fontsOk().then(function(){doPrintNow(cxPrintHTML())});
};
$("cxCsv").onclick=function(){
  var rec=cxRec(false),rows=(rec&&rec.rows)||[],q=function(s){return'"'+String(s||"").replace(/"/g,'""')+'"'};
  var csv="﻿"+["កាលបរិច្ឆេទ","ខ្លឹមសារមេរៀន","អវត្តមានសិស្ស"].map(q).join(",")+"\n"+rows.map(function(r){return[r.d,r.c,r.a].map(q).join(",")}).join("\n");
  var a=document.createElement("a");a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8"}));a.download="សម្រង់អត្ថបទ-"+cxC+"-"+cxMo+".csv";a.click();
};
})();
