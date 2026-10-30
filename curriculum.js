/* ========================================================================
   គ្រប់គ្រងថ្នាក់រៀន › កម្មវិធីសិក្សា (គោល + លម្អិត) — ថ្នាក់ទី៧
   ត្រូវផ្ទុកបន្ទាប់ពី sched.js, curriculum7.js, curriculum8.js, curriculum9.js
   ======================================================================== */
(function(){
"use strict";
var X=window.SCHX,C=window.CUR,kh=X.kh,doPrintNow=X.doPrintNow,fontsOk=X.fontsOk,LOGO2=X.LOGO2;
var cuV="d",cuM="",cuQ="",cuG=7;
var BR={"ព":"ពីជគណិត","ធ":"ធរណីមាត្រ"};

function esc2(s){return esc(String(s==null?"":s))}
function pad(n){return(n<10?"0":"")+n}
function wkLabel(i){
  var a=C.weekStart(i),b=new Date(a);b.setDate(b.getDate()+6);
  return a.getMonth()===b.getMonth()?kh(a.getDate())+"–"+kh(b.getDate())+" "+M[b.getMonth()]:kh(a.getDate())+" "+M[a.getMonth()]+" – "+kh(b.getDate())+" "+M[b.getMonth()];
}
function curWeek(){var i=C.weekIdx(new Date());return(i>=0&&i<C[cuG].W.length)?i:-1}
function endTxt(){var e=C.weekStart(C[cuG].W.length-1);e.setDate(e.getDate()+6);return"១៩ តុលា ២០២៦ – "+kh(e.getDate())+" "+M[e.getMonth()]+" "+kh(e.getFullYear())}
function months(){var a=[];C[cuG].W.forEach(function(w){if(a.indexOf(w.m)<0)a.push(w.m)});return a}
function hasQ(s,q){
  if(!q)return true;q=q.toLowerCase();
  var t=[C.sTitle(s)].concat(s.s||[],s.o||[],[s.ti||""]).join(" ").toLowerCase();return t.indexOf(q)>=0;
}
/* ---------- ក. កម្មវិធីគោល ---------- */
function baseHtml(){
  var LS=C[cuG].LS,tot=0,h="<h3 style='margin:0 0 8px'>ក. ចំណែងចែកមេរៀន៖ សិក្សា ៦ ម៉ោងក្នុង ១ សប្ដាហ៍ (ពីជគណិត និង ធរណីមាត្រ)</h3>";
  C[cuG].SEM.forEach(function(S){
    var sub=0;
    h+="<h4 style='margin:14px 0 6px'>• "+esc2(S.t)+"</h4><div class=wrap><table class='cut cub'><thead><tr><th>មេរៀនទី</th><th>ចំណងជើងមេរៀន</th><th>ម៉ោង</th><th>ផ្នែក</th></tr></thead><tbody>";
    S.rows.forEach(function(r){
      if(typeof r==="string"){h+="<tr class=cux><td colspan=4>"+esc2(r)+"</td></tr>";return}
      if(r&&r.h){h+="<tr class=cux><td colspan=4><b>"+esc2(r.h)+"</b></td></tr>";return}
      var ar=Array.isArray(r),n=ar?r[0]:r,l=LS[n],hh=ar?r[1]:l[1];sub+=hh;h+="<tr><td class=c>"+pad2(l[5]||n)+"</td><td>"+esc2(l[0]+(ar?r[2]:""))+"</td><td class=c>"+pad2(hh)+" ម៉ោង</td><td class=c>"+(BR[l[2]]||(l[3]?"ជំពូក "+pad2(l[3]):""))+"</td></tr>";
    });
    tot+=sub;
    h+="<tr class=cus><td colspan=2>សរុបមេរៀន</td><td class=c>"+kh(sub)+" ម៉ោង</td><td></td></tr></tbody></table></div>";
  });
  var ex=C[cuG].extra;if(ex)h+="<div class=wrap style='margin-top:12px'><table class='cut cub'><tbody><tr><td>"+esc2(ex[0])+"</td><td class=c>"+esc2(ex[1])+"</td><td class=c>ពីជគណិត+ធរណីមាត្រ</td></tr></tbody></table></div>";
  return h;
}
function pad2(n){return KhCal.kn(pad(n))}
/* ---------- ខ. តារាងម៉ោងប្រចាំសប្ដាហ៍ ---------- */
function groupWk(w){
  var g=[];w.x.forEach(function(s){
    if(s.t==="B")return;
    var k=s.t==="L"?"L"+s.n:s.t+s.ti,l=g[g.length-1];
    if(l&&l.k===k){l.h+=s.h;l.s=s}else g.push({k:k,h:s.h,s:s});
  });
  return g;
}
function sumHtml(weeks){
  var h="<div class=wrap><table class='cut cus2'><thead><tr><th>ខែ</th><th>សប្ដាហ៍</th><th>ចំណងជើងមេរៀន</th><th>ចំ.ម៉ោង</th><th>ផ្សេងៗ</th></tr></thead><tbody>",tot=0;
  var months=[];weeks.forEach(function(wi){var w=C[cuG].W[wi];if(!months.length||months[months.length-1].m!==w.m)months.push({m:w.m,l:[]});months[months.length-1].l.push(wi)});
  months.forEach(function(mo){
    var n=0;mo.l.forEach(function(wi){var w=C[cuG].W[wi];n+=Math.max(1,(w.pre?1:0)+(w.x[0]&&w.x[0].t==="B"?1:groupWk(w).length))});
    var first=true;
    mo.l.forEach(function(wi){
      var w=C[cuG].W[wi],g=groupWk(w),rows=[],cur=wi===curWeek();
      if(w.pre)rows.push("<td colspan=3 class=cuy>"+esc2(w.pre)+"</td><td></td>");
      if(w.x[0]&&w.x[0].t==="B")rows.push("<td colspan=3 class=cuy>"+esc2(w.x[0].ti)+"</td><td></td>");
      else g.forEach(function(q,k){
        tot+=q.h;
        var t=q.s.t==="L"?esc2(C.sTitle(q.s)):esc2(q.s.ti);
        rows.push("<td class='"+(q.s.t==="X"?"cuy":"")+"'>"+(q.s.t==="X"?"<b>"+t+"</b>":t)+"</td><td class=c>"+pad2(q.h)+"</td><td>"+(k===0?esc2(w.note):"")+"</td>");
      });
      rows.forEach(function(r,k){
        h+="<tr"+(cur?" class=cur":"")+" data-wk='"+wi+"'>"+(first?"<td class=c rowspan="+n+">"+esc2(mo.m)+"</td>":"")+(k===0?"<td class=c rowspan="+rows.length+">"+(wi+1)+"<small>"+esc2(wkLabel(wi))+"</small></td>":"")+r+"</tr>";
        first=false;
      });
    });
  });
  h+="<tr class=cus><td colspan=3>ចំនួនម៉ោងសរុប</td><td class=c>"+kh(tot)+" ម៉ោង</td><td></td></tr></tbody></table></div>";
  return h;
}
/* ---------- គ. កម្មវិធីលម្អិត ---------- */
function planHtml(weeks,q){
  var W=C[cuG].W,h="<div class=wrap><table class='cut cud'><thead><tr><th style='width:9%'>ខែ</th><th style='width:11%'>សប្ដាហ៍</th><th style='width:7%'>ចំ.ម៉ោង</th><th style='width:34%'>ចំណងជើងមេរៀន</th><th style='width:29%'>លទ្ធផលរំពឹងទុក</th><th>ផ្សេងៗ</th></tr></thead><tbody>",shown=0;
  var months=[];
  weeks.forEach(function(wi){
    var w=W[wi],rows=[];
    if(w.pre)rows.push({b:w.pre});
    w.x.forEach(function(s){
      if(s.t==="B"){rows.push({b:s.ti});return}
      if(!hasQ(s,q))return;rows.push({s:s});
    });
    if(!rows.length)return;
    if(!months.length||months[months.length-1].m!==w.m)months.push({m:w.m,w:[]});
    months[months.length-1].w.push({wi:wi,rows:rows,w:w});
  });
  months.forEach(function(mo){
    var first=true,n=0;mo.w.forEach(function(k){n+=k.rows.length});
    mo.w.forEach(function(k){
      k.rows.forEach(function(r,i){
        var tr="<tr"+(k.wi===curWeek()?" class=cur":"")+" data-wk='"+k.wi+"'>";
        if(first){tr+="<td class=c rowspan="+n+"><b>"+esc2(mo.m)+"</b></td>";first=false}
        if(i===0)tr+="<td class=c rowspan="+k.rows.length+">"+kh(k.w.w)+"<small>"+esc2(wkLabel(k.wi))+"</small></td>";
        if(r.b)tr+="<td colspan=4 class=cuy><b>"+esc2(r.b)+"</b></td>";
        else{
          var s=r.s;shown++;
          if(s.t==="X")tr+="<td class=c>"+pad2(s.h)+"</td><td colspan=2 class=cuy><b>"+esc2(s.ti)+"</b></td><td>"+(i===0?esc2(k.w.note):"")+"</td>";
          else{
            var tt=s.t==="L"?(C[cuG].lhtml?C[cuG].lhtml(s,esc2):"<b class=cut2>មេរៀនទី"+KhCal.kn(s.n)+"<br>"+esc2(C[cuG].LS[s.n][0]+(s.mk?" "+C[cuG].MK[s.mk]:""))+"</b>"):"<b class=cut2>"+esc2(s.ti)+"</b>";
            tr+="<td class=c>"+pad2(s.h)+"</td><td>"+tt+(s.s.length?"<div class=cus3>"+s.s.map(function(a){return"<div class='"+(/^\d+\.\d/.test(a)||/^[ក-ឣ]\.\s/.test(a)||/^\+/.test(a)?"sub":"")+"'>"+esc2(a)+"</div>"}).join("")+"</div>":"")+"</td><td>"+(s.o.length?s.o.map(function(a){return"<div>- "+esc2(a)+"</div>"}).join(""):"")+"</td><td>"+(i===0?esc2(k.w.note):"")+"</td>";
          }
        }
        h+=tr+"</tr>";
      });
    });
  });
  h+="</tbody></table></div>";
  return{html:h,n:shown};
}
function weeksFor(m){
  var W=C[cuG].W,a=[];W.forEach(function(w,i){if(!m||w.m===m)a.push(i)});return a;
}
function render(){
  if(!window.who)return;
  $("cuM").innerHTML="<option value=''>គ្រប់ខែ</option>"+months().map(function(m){return"<option"+(m===cuM?" selected":"")+">"+m+"</option>"}).join("");
  $("cuG").value=cuG;$("cuV").value=cuV;$("cuQ").value=cuQ;
  $("cuM").style.display=cuV==="b"?"none":"";
  $("cuQ").style.display=cuV==="d"?"":"none";
  var cw=curWeek(),info="កម្មវិធីសិក្សា "+C[cuG].name+" ឆ្នាំសិក្សា "+C[cuG].year+" · សប្ដាហ៍នេះ៖ "+(cw>=0?"សប្ដាហ៍ទី "+kh(cw+1)+" ("+wkLabel(cw)+")":"ក្រៅកាលវិភាគកម្មវិធី");
  $("cuInfo").textContent=info;renderFoot();
  var h="";
  if(cuV==="b")h=baseHtml();
  else if(cuV==="s")h="<h3 style='margin:0 0 8px'>ខ. តារាងនៃចំនួនម៉ោងនៃមេរៀននីមួយៗ</h3>"+sumHtml(weeksFor(cuM));
  else{var p=planHtml(weeksFor(cuM),cuQ);h=p.n||!cuQ?p.html:"<p class=empty>រកមិនឃើញ «"+esc2(cuQ)+"»</p>"}
  $("cuBody").innerHTML=h;
}
window.renderCur=render;
$("cuG").onchange=function(){cuG=parseInt(this.value)||7;cuM="";cuQ="";render()};
$("cuV").onchange=function(){cuV=this.value;render()};
$("cuM").onchange=function(){cuM=this.value;render()};
var qt=null;$("cuQ").oninput=function(){var v=this.value;clearTimeout(qt);qt=setTimeout(function(){cuQ=v.trim();render();var e=$("cuQ");e.focus();try{e.setSelectionRange(e.value.length,e.value.length)}catch(x){}},250)};
$("cuNow").onclick=function(){
  var w=curWeek();if(w<0){alert("ថ្ងៃនេះនៅក្រៅរយៈពេលនៃកម្មវិធីសិក្សា ("+endTxt()+")");return}
  cuV=cuV==="b"?"d":cuV;cuM="";cuQ="";render();
  var r=document.querySelector("#cuBody tr[data-wk='"+w+"']");if(r)r.scrollIntoView({behavior:"smooth",block:"center"});
};
/* ---------- ជើងក្រោម (រក្សាទុកក្នុងកម្មវិធីរុករក) ---------- */
var FK="cuFt-v1",FT={pl:"រាជធានីភ្នំពេញ",d:"",kt:"",pre:"",pc:"",hd:"ផៃ ចន",dr:"សម្ប កំសាន្ត"};
try{var sv=JSON.parse(localStorage.getItem(FK)||"null");if(sv)for(var k in sv)FT[k]=sv[k]}catch(x){}
function saveFT(){try{localStorage.setItem(FK,JSON.stringify(FT))}catch(x){}}
function ftDates(){
  var t=FT.d&&/^\d{4}-\d{2}-\d{2}$/.test(FT.d)?FT.d.split("-").map(Number):null,n=new Date(),ref=t||[n.getFullYear(),n.getMonth()+1,n.getDate()];
  var c=KhCal.convert(ref[0],ref[1],ref[2]);
  var lun=FT.kt?FT.kt:"ថ្ងៃ"+(t?KhCal.kn(c.day)+(c.half?"រោច":"កើត"):"……………………")+" ខែ"+(c.leap?"ទុតិយ":"")+KhCal.MONTHS[c.month]+" ឆ្នាំ"+c.animal+" "+c.sak+" ព.ស."+KhCal.kn(c.be);
  var gre=(FT.pl||"រាជធានីភ្នំពេញ")+" ថ្ងៃទី "+(t?KhCal.kn(ref[2]):"………………")+" ខែ "+M[ref[1]-1]+" ឆ្នាំ"+KhCal.kn(ref[0]);
  return{lun:lun,gre:gre};
}
function preName(){var p=FT.pre||teacherNameOf(window.who&&who.id);return p==="__x"?(FT.pc||""):(p||"")}
function footHtml(){
  var D=ftDates();
  return"<div class=cuf><div class=cuf1>"+esc2(D.lun)+"</div><div class=cuf1>"+esc2(D.gre)+"</div>"+
   "<div class=cuk>"+
   "<div class=cuk3><div class=cuh3>បានឃើញ និងឯកភាព<br><b>ព.នាយកវិទ្យាល័យ</b><br><b>នាយករងទទួលបន្ទុកសាលារៀនជំនាន់ថ្មី</b></div><div class=cugp style='height:22mm'></div><b class=cunm>"+esc2(FT.dr)+"</b></div>"+
   "<div class=cuk2><div class=cuh3>បានឃើញ និងពិនិត្យ<br><b>ប្រធានក្រុមបច្ចេកទេស</b></div><div class=cugp style='height:20mm'></div><b class=cunm>"+esc2(FT.hd)+"</b></div>"+
   "<div class=cuk1><div class=cuh3><b>អ្នករៀបចំកម្មវិធី</b></div><div class=cugp style='height:17mm'></div><b class=cunm>"+esc2(preName())+"</b></div>"+
   "</div></div>";
}
function renderFoot(){
  var ts=window.data||[],names=ts.map(function(t){return t.name});
  var cur=FT.pre||teacherNameOf(window.who&&who.id);
  $("cuFp").innerHTML="<option value=''>— ជ្រើសឈ្មោះសមាជិក —</option>"+names.map(function(n){return"<option"+(n===cur?" selected":"")+">"+esc2(n)+"</option>"}).join("")+"<option value='__x'"+(FT.pre==="__x"?" selected":"")+">ផ្សេងៗ (វាយដោយដៃ)…</option>";
  $("cuFpxw").hidden=FT.pre!=="__x";$("cuFpx").value=FT.pc||"";
  $("cuFh").value=FT.hd||"";$("cuFd").value=FT.dr||"";$("cuFpl").value=FT.pl||"";$("cuFdt").value=FT.d||"";$("cuFkt").value=FT.kt||"";
  var D=ftDates();$("cuFpv").textContent="បោះពុម្ពជាអត្ថបទ៖ "+D.lun+" · "+D.gre;
}
function teacherNameOf(id){var t=(window.data||[]).filter(function(x){return x.id===id})[0];return t?t.name:""}
function bindFoot(){
  var m={cuFp:["pre"],cuFpx:["pc"],cuFh:["hd"],cuFd:["dr"],cuFpl:["pl"],cuFdt:["d"],cuFkt:["kt"]};
  Object.keys(m).forEach(function(id){
    $(id).addEventListener(id==="cuFp"||id==="cuFdt"?"change":"input",function(){FT[m[id][0]]=this.value;saveFT();if(id==="cuFp")renderFoot();else{var D=ftDates();$("cuFpv").textContent="បោះពុម្ពជាអត្ថបទ៖ "+D.lun+" · "+D.gre}});
  });
  $("cuFtd").onclick=function(){var n=new Date();FT.d=n.getFullYear()+"-"+pad(n.getMonth()+1)+"-"+pad(n.getDate());saveFT();renderFoot()};
  $("cuFcl").onclick=function(){FT.d="";FT.kt="";saveFT();renderFoot()};
}
bindFoot();
function printHtml(){
  var body="";
  if(cuV==="b")body=baseHtml();else if(cuV==="s")body="<h3>ខ. តារាងនៃចំនួនម៉ោងនៃមេរៀននីមួយៗ</h3>"+sumHtml(weeksFor(cuM));else body=planHtml(weeksFor(cuM),cuQ).html;
  body=body.replace(/<div class=wrap[^>]*>/g,"<div>");
  var ftr=footHtml();
  if(cuV==="b")body+="<table class='cut cuft'><tbody><tr class=cuftr><td>"+ftr+"</td></tr></tbody></table>";
  else{var cs=cuV==="d"?6:5,e="</tbody></table></div>",ix=body.lastIndexOf(e);
    body=ix>=0?body.slice(0,ix)+"<tr class=cuftr><td colspan="+cs+">"+ftr+"</td></tr>"+body.slice(ix):body+ftr}
  var bt=(document.querySelector(".brand-logo")||{}).src||"";
  return"<div class='pg cup'><div class=cuh>"+(bt?"<img src='"+bt+"' class=cul alt=''>":"")+"<div class=cuc><div class=moul style='font-size:12pt'>សាលារៀនជំនាន់ថ្មី (NGS)</div><div class=moul style='font-size:12pt;margin-top:2mm'>ចំណែងចែកកម្មវិធីសិក្សាគោល"+(cuV==="d"?" និងលម្អិត":"")+"</div><div style='margin-top:1mm'>មុខវិជ្ជា "+C[cuG].name.replace("គណិតវិទ្យា ","គណិតវិទ្យា ")+" ឆ្នាំសិក្សា "+C[cuG].year+"</div></div>"+(LOGO2?"<img src='"+LOGO2+"' class=cur2 alt=''>":"")+"</div>"+body+"</div>";
}
$("cuPr").onclick=function(){fontsOk().then(function(){doPrintNow(printHtml())})};
/* ---------- API សម្រាប់ទំព័រសម្រង់អត្ថបទ ---------- */
window.CURX={
  level:function(cls){var n=parseInt(String(cls||""));return n},
  has:function(cls){return !!C[parseInt(String(cls||""))]},
  /* ផ្ដល់ម៉ោងបង្រៀនតាមកាលបរិច្ឆេទ (ISO) → អត្ថបទមេរៀនសម្រាប់សប្ដាហ៍នោះ */
  sessions:function(iso,cls){var a=iso.split("-").map(Number);return C.sessionsFor(new Date(a[0],a[1]-1,a[2]),parseInt(String(cls||""))||7)},
  text:function(s){return C.sText(s,true)}
};
})();
