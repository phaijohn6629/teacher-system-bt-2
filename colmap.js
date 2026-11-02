/* ========================================================================
   ផ្គូផ្គងជួរឈរ Excel (Column Mapping) — ប្រើសម្រាប់នាំចូលពិន្ទុ និងបញ្ជីសិស្ស
   COLMAP.open({title, wb, fields:[{k,l,req,re}], multi, note, onOk(res)})
     res = {map:{k:ci}, hr, sheets:[{sn, rows}]}   (hr = លិបិក្រមជួរក្បាលតារាង · ជួរទិន្នន័យចាប់ពី hr+1)
   COLMAP.report({title, html, errs:[...], ok, onOk})   — បង្ហាញសង្ខេប + បញ្ជីកំហុសតាមជួរ មុននាំចូល
   COLMAP.num(v) → លេខ | NaN (ទទួល ៨,៥ · ៨.៥ · 8,5)
   ត្រូវផ្ទុកបន្ទាប់ពី script.js
   ======================================================================== */
(function(){
"use strict";
function col(ci){var s="";ci++;while(ci>0){var m=(ci-1)%26;s=String.fromCharCode(65+m)+s;ci=Math.floor((ci-1)/26)}return s}
function hn(v){return String(v==null?"":v).toLowerCase().replace(/[\s.]/g,"")}
function txt(v){return String(v==null?"":v).trim()}
function num(v){
  if(typeof v==="number")return v;
  var s=txt(v).replace(/[០-៩]/g,function(c){return"០១២៣៤៥៦៧៨៩".indexOf(c)}).replace(/\s+/g,"");
  if(/^-?\d+,\d+$/.test(s))s=s.replace(",",".");
  return/^-?\d+(\.\d+)?$/.test(s)?+s:NaN;
}
function rowsOf(wb,sn){return XLSX.utils.sheet_to_json(wb.Sheets[sn],{header:1,defval:"",raw:true})}
function dlg(id){
  var d=document.getElementById(id);
  if(!d){d=document.createElement("dialog");d.id=id;d.className="wide";document.body.appendChild(d)}
  return d;
}
/* ជួរក្បាលតារាង = ជួរ (ក្នុង ១០ ជួរដំបូង) ដែលត្រូវឈ្មោះ field ច្រើនជាងគេ */
function guessHr(rows,fields){
  var best=0,bs=-1;
  for(var r=0;r<Math.min(10,rows.length);r++){
    var sc=0,ne=0;(rows[r]||[]).forEach(function(h){var x=hn(h);if(x)ne++;if(fields.some(function(f){return f.re&&f.re.test(x)}))sc+=10});
    sc+=Math.min(ne,5);if(sc>bs){bs=sc;best=r}
  }
  return best;
}
function guessMap(row,fields){
  var m={},used={};
  fields.forEach(function(f){
    if(!f.re)return;
    (row||[]).some(function(h,ci){if(!used[ci]&&f.re.test(hn(h))){m[f.k]=ci;used[ci]=1;return true}});
  });
  return m;
}
function open(o){
  var wb=o.wb,names=wb.SheetNames.filter(function(sn){return rowsOf(wb,sn).some(function(r){return r.some(function(v){return txt(v)})})});
  if(!names.length){alert("ឯកសារនេះគ្មានទិន្នន័យទេ។");return}
  var st={sn:names[0],hr:0,map:{},pick:{}};
  names.forEach(function(sn){st.pick[sn]=true});
  function rows(){return rowsOf(wb,st.sn)}
  function reguess(){var R=rows();st.hr=guessHr(R,o.fields);st.map=guessMap(R[st.hr],o.fields)}
  reguess();
  var d=dlg("dlgColMap");
  function draw(){
    var R=rows(),H=R[st.hr]||[],nc=0;R.slice(0,st.hr+30).forEach(function(r){nc=Math.max(nc,r.length)});
    var copt=function(k){var v=st.map[k];var s="<option value=''>— មិនប្រើ —</option>";for(var ci=0;ci<nc;ci++){var h=txt(H[ci]);s+="<option value="+ci+(v===ci?" selected":"")+">"+col(ci)+(h?" · "+esc(h.slice(0,30)):"")+"</option>"}return s};
    var mapped=o.fields.filter(function(f){return st.map[f.k]!=null});
    var data=R.slice(st.hr+1).filter(function(r){return r.some(function(v){return txt(v)})}).slice(0,6);
    var h="<form method=dialog class='dlgb cm-form'><h2 style='margin:0 0 6px'>"+esc(o.title)+"</h2>"+
      "<p class=note style='margin:0 0 10px'>ប្រាប់ប្រព័ន្ធថា ជួរឈរណាក្នុង Excel ជាទិន្នន័យអ្វី។ ប្រព័ន្ធបានទាយឱ្យរួចហើយ — សូមពិនិត្យ និងកែបើខុស។ "+(o.note||"")+"</p>"+
      "<div class=cm-top><label>សន្លឹក៖ <select data-cm=sheet>"+names.map(function(sn){return"<option"+(sn===st.sn?" selected":"")+">"+esc(sn)+"</option>"}).join("")+"</select></label>"+
      "<label>ជួរក្បាលតារាង៖ <select data-cm=hr>"+R.slice(0,10).map(function(r,i){return"<option value="+i+(i===st.hr?" selected":"")+">ជួរទី "+(i+1)+" — "+esc(r.map(txt).filter(Boolean).slice(0,4).join(" · ").slice(0,50))+"</option>"}).join("")+"</select></label></div>"+
      (o.multi&&names.length>1?"<div class=cm-sheets><b>នាំចូលសន្លឹក៖</b> "+names.map(function(sn){return"<label><input type=checkbox data-cmsh='"+esc(sn)+"'"+(st.pick[sn]?" checked":"")+"> "+esc(sn)+"</label>"}).join("")+
        "<p class=note style='margin:4px 0 0'>ការផ្គូផ្គងខាងក្រោមប្រើដូចគ្នាសម្រាប់គ្រប់សន្លឹកដែលបានជ្រើស (តាមឈ្មោះក្បាលតារាង បើមិនឃើញ → តាមទីតាំងជួរឈរ)។</p></div>":"")+
      "<div class=cm-grid>"+o.fields.map(function(f){return"<label class='cm-f"+(f.req?" req":"")+(st.map[f.k]!=null?" on":"")+"'><span>"+esc(f.l)+(f.req?" *":"")+"</span><select data-cmf='"+f.k+"'>"+copt(f.k)+"</select></label>"}).join("")+"</div>"+
      "<h4 style='margin:12px 0 6px'>មើលជាមុន (ជួរទិន្នន័យដំបូងៗ)</h4>"+
      (mapped.length?"<div class=wrap><table class=cm-pv><thead><tr><th>ជួរ</th>"+mapped.map(function(f){return"<th>"+esc(f.l)+"<small>"+col(st.map[f.k])+"</small></th>"}).join("")+"</tr></thead><tbody>"+
        data.map(function(r){var ri=R.indexOf(r);return"<tr><td>"+(ri+1)+"</td>"+mapped.map(function(f){return"<td>"+esc(txt(r[st.map[f.k]]).slice(0,40))+"</td>"}).join("")+"</tr>"}).join("")+"</tbody></table></div>"
        :"<p class=note>មិនទាន់ផ្គូផ្គងជួរឈរណាទេ។</p>")+
      "<div class=dlgf><button type=button data-cm=cancel>បោះបង់</button><button type=button class=primary data-cm=ok>បន្ត ›</button></div></form>";
    d.innerHTML=h;
  }
  d.onchange=function(e){
    var t=e.target,k=t.dataset.cm;
    if(k==="sheet"){st.sn=t.value;reguess();draw()}
    else if(k==="hr"){st.hr=+t.value;var g=guessMap(rows()[st.hr],o.fields);o.fields.forEach(function(f){if(g[f.k]!=null)st.map[f.k]=g[f.k]});draw()}
    else if(t.dataset.cmf){var f=t.dataset.cmf;if(t.value==="")delete st.map[f];else{var ci=+t.value;Object.keys(st.map).forEach(function(x){if(st.map[x]===ci)delete st.map[x]});st.map[f]=ci}draw()}
    else if(t.dataset.cmsh!=null)st.pick[t.dataset.cmsh]=t.checked;
  };
  d.onclick=function(e){
    var b=e.target.closest("[data-cm]");if(!b||b.tagName!=="BUTTON")return;
    if(b.dataset.cm==="cancel"){d.close();return}
    var miss=o.fields.filter(function(f){return f.req&&st.map[f.k]==null});
    if(miss.length){alert("សូមជ្រើសជួរឈរសម្រាប់៖ "+miss.map(function(f){return f.l}).join(", "));return}
    var R0=rows(),H0=R0[st.hr]||[],sheets=[];
    (o.multi?names.filter(function(sn){return st.pick[sn]}):[st.sn]).forEach(function(sn){
      var R=sn===st.sn?R0:rowsOf(wb,sn),hr=sn===st.sn?st.hr:guessHr(R,o.fields),H=R[hr]||[],m={};
      /* សន្លឹកផ្សេង៖ រកជួរឈរតាមឈ្មោះក្បាលតារាងដូចគ្នា · បើមិនឃើញ ប្រើទីតាំងដដែល */
      Object.keys(st.map).forEach(function(k){var name=hn(H0[st.map[k]]),ci=name?H.map(hn).indexOf(name):-1;m[k]=ci>=0?ci:st.map[k]});
      sheets.push({sn:sn,rows:R,hr:hr,map:m});
    });
    if(!sheets.length){alert("សូមជ្រើសយ៉ាងតិចមួយសន្លឹក");return}
    d.close();o.onOk({sheets:sheets});
  };
  draw();d.showModal();
}
function report(o){
  var d=dlg("dlgColRep"),e=o.errs||[];
  d.innerHTML="<form method=dialog class='dlgb cm-form'><h2 style='margin:0 0 8px'>"+esc(o.title)+"</h2>"+o.html+
    (e.length?"<details class=cm-err open><summary>⚠️ មាន "+kn(e.length)+" ចំណុចត្រូវពិនិត្យ (ទិន្នន័យទាំងនេះមិនត្រូវនាំចូលទេ)</summary><ol>"+e.slice(0,300).map(function(x){return"<li>"+esc(x)+"</li>"}).join("")+"</ol>"+(e.length>300?"<p class=note>… និង "+kn(e.length-300)+" ទៀត</p>":"")+"</details>":"<p class=cm-okm>✅ មិនមានកំហុសទេ</p>")+
    "<div class=dlgf><button type=button data-cr=cancel>បោះបង់</button>"+(o.ok!==false?"<button type=button class=primary data-cr=ok>"+esc(o.okText||"នាំចូល")+"</button>":"")+"</div></form>";
  d.onclick=function(ev){var b=ev.target.closest("[data-cr]");if(!b)return;d.close();if(b.dataset.cr==="ok"&&o.onOk)o.onOk()};
  d.showModal();
}
window.COLMAP={open:open,report:report,num:num,col:col,txt:txt};
})();
