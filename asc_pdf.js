/* ========================================================================
   asc_pdf.js — អានកាលវិភាគគ្រូពី PDF ដែលបង្កើតដោយ aSc Timetables (មួយទំព័រ = គ្រូម្នាក់)
   - អក្សរខ្មែរក្នុង PDF របស់ aSc ចេញមិនត្រឹមត្រូវ (បាត់ស្រៈ) → ផ្គូផ្គងគ្រូដោយ លេខទូរស័ព្ទ ឬ «ព្យញ្ជនៈ» នៃឈ្មោះ
   - អានតែអក្សរឡាតាំង៖ ថ្នាក់ (11NGS-C) · បន្ទប់ (F-P1) · ប្រភេទ (O/OE) · ទីតាំងប្រអប់ → ថ្ងៃ និងម៉ោង
   លទ្ធផល៖ [{page, ph, nm, sk, s:[[ថ្ងៃ0..5, ម៉ោង1..11, ថ្នាក់, បន្ទប់, ""/O/OE], ...]}]
   ======================================================================== */
var ASCPDF=(function(){
"use strict";
var LIB="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/";
var DAYS=["Mo","Tu","We","Th","Fr","Sa"];
var ready=null;
function load(){
  if(window.pdfjsLib)return Promise.resolve(window.pdfjsLib);
  if(ready)return ready;
  ready=new Promise(function(ok,no){var s=document.createElement("script");s.src=LIB+"pdf.min.js";
    s.onload=function(){window.pdfjsLib.GlobalWorkerOptions.workerSrc=LIB+"pdf.worker.min.js";ok(window.pdfjsLib)};
    s.onerror=function(){ready=null;no(new Error("មិនអាចផ្ទុកកម្មវិធីអាន PDF (pdf.js) — សូមពិនិត្យអ៊ីនធឺណិត"))};document.head.appendChild(s)});
  return ready;
}
/* ព្យញ្ជនៈខ្មែរ (ក..អ) តាមលំដាប់ — ប្រើផ្គូផ្គងឈ្មោះដែលបាត់ស្រៈ */
function skel(s){return(String(s||"").replace(/\u17d2[\u1780-\u17a2]/g,"").match(/[\u1780-\u17a2]/g)||[]).join("")}   /* ជើងអក្សរ (្ល ្រ) បាត់ក្នុង PDF → មិនរាប់ */
function digits(s){return String(s||"").replace(/\D/g,"")}
var RE_CLS=/^\d{1,2}[A-Z][A-Za-z0-9\/\-]*$/,RE_ROOM=/^[A-Z]{1,3}-[A-Z0-9]{1,6}$/;

function parsePage(items,H){
  var T=items.map(function(it){return{s:it.str,x:it.transform[4],y:H-it.transform[5],w:it.width}}).filter(function(t){return t.s.trim()});
  /* ជួរឈរ (ថ្ងៃ)៖ ពីក្បាល Mo Tu We ... */
  var hd=DAYS.map(function(d){return T.filter(function(t){return t.s.trim().indexOf(d)===0&&t.y<130})[0]});
  if(hd.some(function(h){return!h}))return null;
  var cx=hd.map(function(h){return h.x+h.w/2}),sp=(cx[5]-cx[0])/5;
  var bd=[cx[0]-sp/2-12];for(var i=0;i<5;i++)bd.push((cx[i]+cx[i+1])/2);bd.push(cx[5]+sp/2+20);
  function col(x){for(var i=0;i<6;i++)if(x+2>=bd[i]&&x+2<bd[i+1])return i;return-1}
  /* ជួរដេក (ម៉ោង)៖ លេខ «1.» «2.» ... «11» និងម៉ោងសម្រាក «2./3.» នៅខាងឆ្វេង */
  var rows=T.filter(function(t){return t.x<bd[0]&&t.y>hd[0].y&&/^\s*\d{1,2}\.?(\/\d{1,2}\.?)?\s*$/.test(t.s)}).map(function(t){var m=t.s.trim();return{y:t.y,p:/\//.test(m)?0:parseInt(m,10)}}).sort(function(a,b){return a.y-b.y});
  if(rows.filter(function(r){return r.p}).length<6)return null;
  function row(y){var b=null,d=1e9;rows.forEach(function(r){var e=Math.abs(r.y-y);if(e<d){d=e;b=r}});return b}
  var out=[];
  for(var c=0;c<6;c++){
    var it=T.filter(function(t){return t.y>hd[0].y+8&&t.x>=bd[0]-2&&col(t.x)===c&&row(t.y).p})   /* កុំយកអក្សរ «សម្រាក» ក្នុងជួរម៉ោងសម្រាក */.sort(function(a,b){return a.y-b.y||a.x-b.x});
    /* បន្ទាត់ចាប់ផ្ដើមប្រអប់ = បន្ទាត់ទីមួយនៅផ្នែកខាងលើនៃក្រឡាម៉ោង (ខ្ពស់ជាងលេខម៉ោងប្រហែល ៤–១០pt) */
    var st=[];it.forEach(function(t){var r=row(t.y),d=r.y-t.y;if(r.p&&d>=3&&d<=11&&!st.some(function(v){return Math.abs(v-t.y)<2}))st.push(t.y)});
    st.forEach(function(y0,k){
      var y1=k+1<st.length?st[k+1]-2:1e9,bl=it.filter(function(t){return t.y>=y0-2&&t.y<y1});
      var cls=[],room="",ty="";
      bl.forEach(function(t){t.s.split(/[\s,]+/).forEach(function(w){if(!w)return;
        if(w==="O"||w==="OE")ty=w;else if(RE_CLS.test(w)){if(cls.indexOf(w)<0)cls.push(w)}else if(RE_ROOM.test(w))room=w})});
      if(!cls.length)return;   /* មិនមែនម៉ោងបង្រៀន (ប្រចាំការ ...) */
      var last=row(Math.max.apply(null,bl.map(function(t){return t.y}))),ri=rows.indexOf(row(y0)),re=rows.indexOf(last);
      for(var j=ri;j<=Math.max(ri,re);j++)if(rows[j].p)out.push([c,rows[j].p,cls.join(", "),room,ty]);
    });
  }
  out.sort(function(a,b){return a[0]-b[0]||a[1]-b[1]});
  return out;
}
function header(items,H){
  var h=items.filter(function(it){var y=H-it.transform[5];return y>40&&y<72}).map(function(it){return it.str}).join("");
  var m=/^(.*?)((?:\+?\d[\d\s\/]{6,}\d))/.exec(h.replace(/NGS.*$/,""));
  return{raw:h,nm:(m?m[1]:h.replace(/NGS.*$/,"")).replace(/\s+/g," ").trim(),ph:m?m[2].split("/").map(digits).filter(Boolean):[]};
}
function parse(file,onProg){
  return load().then(function(lib){return file.arrayBuffer().then(function(buf){return lib.getDocument({data:new Uint8Array(buf)}).promise})}).then(async function(doc){
    var res=[];
    for(var i=1;i<=doc.numPages;i++){
      var pg=await doc.getPage(i),H=pg.getViewport({scale:1}).height,tc=await pg.getTextContent();
      var hd=header(tc.items,H),s=parsePage(tc.items,H);
      if(s&&hd.ph.length)res.push({page:i,nm:hd.nm,sk:skel(hd.nm),ph:hd.ph,s:s});
      if(onProg)onProg(i,doc.numPages);
    }
    return res;
  });
}
/* ផ្គូផ្គងគ្រូ៖ ១) លេខទូរស័ព្ទ (៨ ខ្ទង់ចុងក្រោយ) ២) ព្យញ្ជនៈនៃឈ្មោះដូចគ្នា */
function match(t,pages){
  var ph=String(t.ph||"").split(/[\/,;]/).map(digits).filter(function(x){return x.length>=8}).map(function(x){return x.slice(-8)});
  var a=pages.filter(function(p){return p.ph.some(function(x){return ph.indexOf(x.slice(-8))>=0})});
  if(a.length===1)return a[0];
  var k=skel(t.name);if(!k)return null;
  var b=pages.filter(function(p){return p.sk===k});
  if(b.length===1)return b[0];
  /* PDF ច្រើនតែបាត់ព្យញ្ជនៈខ្លះ → ព្យញ្ជនៈក្នុង PDF ជាលំដាប់រង (subsequence) នៃឈ្មោះ ហើយមានតែមួយទំព័រ */
  function sub(a,b){var i=0;for(var j=0;j<b.length&&i<a.length;j++)if(a[i]===b[j])i++;return i===a.length}
  var c=pages.filter(function(p){return p.sk.length>=3&&p.sk.length>=k.length*.4&&p.sk[0]===k[0]&&sub(p.sk,k)});
  return c.length===1?c[0]:null;
}
return{load:load,parse:parse,match:match,skel:skel,_page:parsePage};
})();
