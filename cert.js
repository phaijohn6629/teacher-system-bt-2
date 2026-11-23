/* ========================================================================
   🎓 cert.js — វិញ្ញាបនបត្រសិស្ស (Certificate) · ផ្ទុកតាមតម្រូវការ (lazy) ដោយ quiz.js
   - CERT.html({name,cls,title,score,max,date,id,kind,rank,school,teacher,sig,motto}) → HTML A4 landscape មួយសន្លឹក
       kind = "pass" (ជាប់ពិន្ទុកំណត់ · pass = ខ្សែ % ស្រេចចិត្ត) | "rank" (ចំណាត់ថ្នាក់ទី ១–៣ · rank = 1|2|3 · tie = ស្មើគ្នា)
   - CERT.print([ព័ត៌មានសិស្ស…]) → បោះពុម្ព/PDF តាម outChoose (script.js) · ១ សិស្ស = ១ សន្លឹក
   - CERT.id(t,sid,score,max) → លេខវិញ្ញាបនបត្រ (ប្រើ id ដែលមានស្រាប់ + checksum)
   ❗ មិនប៉ះ .pg / prime.css / expaper.js · ស្ទីលទាំងអស់ស្ថិតក្នុង .cert-print (ពណ៌ផ្ទាល់ខ្លួន · មិនពឹងលើ theme)
   ❗ ទំហំអក្សរ/គម្លាតទាំងអស់ជា calc(N * var(--u)) · --u = 1mm ពេលបោះពុម្ព (297 × 209 mm)
      ពេលទាញយក PDF (html2pdf ទទឹង 281 mm) → --u = .946mm (មើល .pdfw ខាងក្រោម)
   ======================================================================== */
(function(){
"use strict";
var KM="០១២៣៤៥៦៧៨៩",MON=["មករា","កុម្ភៈ","មីនា","មេសា","ឧសភា","មិថុនា","កក្កដា","សីហា","កញ្ញា","តុលា","វិច្ឆិកា","ធ្នូ"];
function kn(v){return String(v).replace(/\d/g,function(d){return KM[+d]})}
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function src(u){return typeof window.safeSrc==="function"?window.safeSrc(u):""}
function fnv(s,seed){var h=(2166136261^(seed|0))>>>0;for(var i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)>>>0}return h>>>0}
/* ឈ្មោះ៖ NFC · ដកចន្លោះដើម/ចុង · ចន្លោះច្រើន/ចន្លោះពិសេស → ១ ចន្លោះ (ឧ. «ផៃ  ចន» = «ផៃ ចន») */
function cleanName(n){return String(n==null?"":n).normalize("NFC").replace(/[\s\u00A0]+/g," ").trim()}
function num(x){x=+x;return isFinite(x)?(Math.round(x*100)/100):0}

/* លេខវិញ្ញាបនបត្រ៖ «CT-» + ៦ តួ (ពី t_sid) + «-» + ៣ តួ checksum (t · sid · ពិន្ទុ · សរុប) */
function certId(t,sid,sc,n){
  var a=fnv(String(t)+"_"+String(sid),0).toString(36).toUpperCase().padStart(7,"0").slice(-6);
  var b=fnv(String(t)+"|"+sid+"|"+num(sc)+"|"+num(n),7).toString(36).toUpperCase().padStart(3,"0").slice(-3);
  return"CT-"+a+"-"+b;
}
function dateKh(d){d=d||new Date();return"ថ្ងៃទី "+kn(d.getDate())+" ខែ "+MON[d.getMonth()]+" ឆ្នាំ"+kn(d.getFullYear())}

var CSS=
".cert-print{--u:1mm;--cn:#1E3A8A;--cg:#D97706;position:relative;box-sizing:border-box;width:calc(297*var(--u));height:calc(209*var(--u));margin:0 auto;padding:0;background:#fff;color:#0F172A;overflow:hidden;font-family:'Khmer OS Battambang','Battambang',serif;line-height:1.5;-webkit-print-color-adjust:exact;print-color-adjust:exact}"+
".cert-print *{box-sizing:border-box}"+
".cert-print .ct-f1{position:absolute;inset:calc(6*var(--u));border:calc(1.3*var(--u)) solid var(--cn)}"+
".cert-print .ct-f2{position:absolute;inset:calc(9*var(--u));border:calc(.35*var(--u)) solid var(--cg)}"+
".cert-print .ct-dm{position:absolute;width:calc(3.6*var(--u));height:calc(3.6*var(--u));background:var(--cg);transform:rotate(45deg)}"+
".cert-print .ct-dm.a{top:calc(7.2*var(--u));left:calc(7.2*var(--u))}.cert-print .ct-dm.b{top:calc(7.2*var(--u));right:calc(7.2*var(--u))}"+
".cert-print .ct-dm.c{bottom:calc(7.2*var(--u));left:calc(7.2*var(--u))}.cert-print .ct-dm.d{bottom:calc(7.2*var(--u));right:calc(7.2*var(--u))}"+
".cert-print .ct-dc{position:absolute;top:calc(10*var(--u));width:calc(34*var(--u));height:calc(189*var(--u))}"+
".cert-print .ct-dc.l{left:calc(10*var(--u))}.cert-print .ct-dc.r{right:calc(10*var(--u));transform:scaleX(-1)}"+
".cert-print .ct-in{position:absolute;inset:calc(14*var(--u)) calc(40*var(--u)) calc(14*var(--u));display:flex;flex-direction:column;align-items:center;text-align:center}"+
".cert-print .ct-mo{font-family:'Khmer OS Muol Light','Moul',serif;font-weight:400;color:var(--cn)}"+
".cert-print .ct-lg{width:calc(31*var(--u));height:calc(26*var(--u));display:block}"+
".cert-print .ct-ti{font-size:calc(13*var(--u));line-height:1.55;margin-top:calc(1*var(--u))}"+
".cert-print .ct-ln{display:flex;align-items:center;justify-content:center;gap:0;margin:calc(2*var(--u)) 0 calc(3*var(--u))}"+
".cert-print .ct-ln i{display:block;height:calc(.7*var(--u));width:calc(34*var(--u));background:var(--cn)}.cert-print .ct-ln i.g{width:calc(16*var(--u));background:var(--cg)}"+
".cert-print .ct-st{font-size:calc(5.4*var(--u));color:var(--cg);font-family:'Khmer OS Muol Light','Moul',serif;line-height:1.6;white-space:nowrap}"+
".cert-print .ct-sc{font-size:calc(3.8*var(--u));color:#475569;margin-top:calc(.3*var(--u))}"+
".cert-print .ct-sub{font-size:calc(4.8*var(--u));margin-top:calc(11*var(--u));color:#334155}"+
".cert-print .ct-nm{font-family:'Khmer OS Muol Light','Moul',serif;font-weight:400;color:var(--cn);margin:calc(3*var(--u)) 0 calc(1.2*var(--u));line-height:1.7;max-width:100%;padding:0 calc(6*var(--u)) calc(.8*var(--u));border-bottom:calc(.45*var(--u)) solid var(--cg);overflow-wrap:anywhere}"+
".cert-print .ct-cl{font-size:calc(5*var(--u));color:#334155;white-space:nowrap}"+
".cert-print .ct-tx{font-size:calc(4.8*var(--u));line-height:1.9;max-width:calc(212*var(--u));margin-top:calc(6*var(--u));color:#1e293b}"+
".cert-print .ct-tx b{color:var(--cn)}.cert-print .nw{white-space:nowrap}"+
".cert-print .ct-ft{margin-top:auto;width:calc(100% + 16*var(--u));display:grid;grid-template-columns:1fr 1fr 1fr;gap:calc(10*var(--u));align-items:start;padding-bottom:calc(3*var(--u))}"+
".cert-print .ct-fc{display:flex;flex-direction:column;align-items:center;min-width:0}"+
".cert-print .ct-fv{height:calc(15*var(--u));width:100%;display:flex;align-items:flex-end;justify-content:center;font-size:calc(3.9*var(--u));padding-bottom:calc(.8*var(--u));white-space:nowrap}"+
".cert-print .ct-fv img{max-height:calc(14*var(--u));max-width:calc(46*var(--u))}"+
".cert-print .ct-fl{width:100%;border-top:calc(.45*var(--u)) solid var(--cn);padding-top:calc(1*var(--u));font-size:calc(3.3*var(--u));color:#475569}"+
".cert-print .ct-fl .ct-mo{display:block;white-space:nowrap;font-size:calc(3.5*var(--u));margin-bottom:calc(.4*var(--u))}"+
".cert-print .ct-fv b{color:var(--cn);letter-spacing:.05em}"+
"@page cert{size:A4 landscape;margin:0}"+
".cert-print.pg.land{height:calc(209*var(--u))!important;overflow:hidden}"+   /* style.css មាន .pg.land{height:170mm!important} សម្រាប់ប្លង់តុ → ត្រូវជំនួស */

"body.pm #prt .cert-print.pg{page:cert;padding:0;border:0;line-height:1.5;font-size:inherit;break-inside:avoid;page-break-inside:avoid}"+
"body.pm #prt>.cert-print.pg.land{break-after:page;page-break-after:always}"+
"body.pm #prt>.cert-print.pg.land:last-child{break-after:avoid!important;page-break-after:avoid!important}"+
".pdfw .cert-print{--u:.946mm}";
function css(){if(document.getElementById("certCss"))return;var s=document.createElement("style");s.id="certCss";s.textContent=CSS;document.head.appendChild(s)}

function nameSize(n){var l=String(n||"").length;return l>34?5.8:l>26?6.9:l>18?8.2:9.6}

/* ឡូហ្គោ Rean Math Prime (RM + π) · SVG ស្ថិតនៅក្នុងកូដ (មិនទាញឯកសារ · គ្មានផ្ទៃ/ចលនា/ស្រមោល) ·
   ពណ៌ដូច logo-prime.svg ប៉ុន្តែ stroke សជាប់ផ្ទៃខៀវ → ប្ដូរជា Navy ដើម្បីឱ្យមើលឃើញលើផ្ទៃស */
var LOGO="<svg class=ct-lg viewBox='212 66 256 214' xmlns='http://www.w3.org/2000/svg' aria-hidden='true'><g transform='translate(18,-1)' fill='none' stroke-linecap='round' stroke-linejoin='round'>"+
  "<path d='M252 170 C282 225 300 262 345 262 H434' stroke='#D97706' stroke-width='12'/>"+
  "<g stroke='#1E3A8A' stroke-width='12'><path d='M205 262 V80 H262 A45 45 0 0 1 262 170 H205'/><path d='M350 170 V80 L395 140 L440 80 V262'/></g>"+
  "<g stroke='#D97706' stroke-width='9'><path d='M356 198 Q388 190 422 198'/><path d='M375 198 Q373 225 366 244'/><path d='M406 198 V228 Q406 246 424 244'/></g></g></svg>";
/* តុបតែងគណិតវិទ្យាស្រាល (opacity ទាប · គែមឆ្វេង/ស្ដាំ) · ទំហំ 34 × 189 (ឯកតា --u) */
var DEC="<svg class='ct-dc %S' viewBox='0 0 34 189' xmlns='http://www.w3.org/2000/svg' aria-hidden='true'><g fill='none'>"+
  "<g stroke='#1E3A8A' stroke-opacity='.10' stroke-width='.35'><circle cx='0' cy='38' r='12'/><circle cx='0' cy='38' r='20'/><circle cx='0' cy='38' r='28'/></g>"+
  "<path d='M2 189 Q17 96 32 189' stroke='#D97706' stroke-opacity='.28' stroke-width='.5'/>"+
  "<path d='M0 118 C6 104 10 104 16 118 S27 132 34 118' stroke='#1E3A8A' stroke-opacity='.14' stroke-width='.5'/>"+
  "<path d='M6 80 L16 64 L26 80 Z' stroke='#D97706' stroke-opacity='.30' stroke-width='.45'/>"+
  "<g fill='#D97706' fill-opacity='.30' stroke='none'>"+(function(){var o="";for(var y=0;y<5;y++)for(var x=0;x<4;x++)o+="<circle cx='"+(6+x*6)+"' cy='"+(146+y*6)+"' r='.55'/>";return o})()+"</g>"+
  "</g></svg>";

function html(o){
  o=o||{};
  var rank=+o.rank,isRank=o.kind==="rank"&&rank>=1&&rank<=3,sc=num(o.score),mx=num(o.max),pct=mx>0?Math.round(sc/mx*100):0;
  var sub=isRank?"ជ័យលាភីចំណាត់ថ្នាក់ទី "+kn(rank)+(o.tie?" (ស្មើគ្នា)":""):"ជាប់លក្ខខណ្ឌពិន្ទុ";
  var sg=src(o.sig||"");
  var score="<span class=nw>"+kn(sc)+" / "+kn(mx)+"</span> (<span class=nw>"+kn(pct)+"%</span>)";
  var body="ដែលបានបំពេញតេស្ត <b>«"+esc(o.title)+"»</b> ដោយទទួលបានពិន្ទុ <b>"+score+"</b>"+
    (isRank?" ហើយឈរ <b class=nw>ចំណាត់ថ្នាក់ទី "+kn(rank)+(o.tie?" (ស្មើគ្នា)":"")+"</b>"
            :(+o.pass>0?" ដែលស្មើ ឬលើសខ្សែពិន្ទុជាប់ <b class=nw>"+kn(num(o.pass))+"%</b>":" ដែលបានដល់លក្ខខណ្ឌពិន្ទុកំណត់"))+
    "។ សូមអបអរសាទរ និងជូនពរឱ្យបន្តខិតខំរៀនសូត្របន្ថែមទៀត។";
  return"<div class='pg land cert-print'>"+
    "<div class=ct-f1></div><div class=ct-f2></div><i class='ct-dm a'></i><i class='ct-dm b'></i><i class='ct-dm c'></i><i class='ct-dm d'></i>"+
    DEC.replace("%S","l")+DEC.replace("%S","r")+
    "<div class=ct-in>"+
      LOGO+
      "<div class='ct-mo ct-ti'>វិញ្ញាបនបត្រ</div>"+
      "<div class=ct-ln><i></i><i class=g></i><i></i></div>"+
      "<div class=ct-st>"+esc(sub)+"</div>"+
      "<div class=ct-sc>Rean Math Prime · "+esc(o.school||"វិទ្យាល័យបឹងត្របែក")+"</div>"+
      "<div class=ct-sub>សូមប្រគល់វិញ្ញាបនបត្រនេះជូន</div>"+
      "<div class=ct-nm style='font-size:calc("+nameSize(o.name)+"*var(--u))'>"+esc(o.name)+"</div>"+
      (o.cls?"<div class=ct-cl>សិស្សថ្នាក់ "+esc(o.cls)+"</div>":"")+
      "<div class=ct-tx>"+body+"</div>"+
      "<div class=ct-ft>"+
        "<div class=ct-fc><div class=ct-fv>"+esc(o.date||dateKh())+"</div><div class=ct-fl>កាលបរិច្ឆេទ</div></div>"+
        "<div class=ct-fc><div class=ct-fv><b>"+esc(o.id||"")+"</b></div><div class=ct-fl>លេខវិញ្ញាបនបត្រ</div></div>"+
        "<div class=ct-fc><div class=ct-fv>"+(sg?"<img src='"+sg+"' alt=''>":"")+"</div><div class=ct-fl><span class=ct-mo>"+esc(cleanName(o.teacher))+"</span>ហត្ថលេខាគ្រូបង្រៀន</div></div>"+
      "</div>"+
    "</div></div>";
}

function print(list){
  list=(list||[]).filter(Boolean);if(!list.length)return Promise.resolve(false);
  css();
  var w=window.who||{},X=window.SCHX,sig="";try{sig=X&&X.getSig&&w.id?X.getSig(w.id):""}catch(e){}
  var inf=typeof window.inf==="function"?window.inf():{};
  var tn=cleanName(w.name);   /* ឈ្មោះអ្នកចុះហត្ថលេខា គណនាម្ដង → ដូចគ្នាគ្រប់សន្លឹក */
  var h=list.map(function(o){return html(Object.assign({school:inf.school,sig:sig},o,{teacher:tn}))}).join("");
  return(X&&X.fontsOk?X.fontsOk():Promise.resolve()).then(function(){
    if(typeof window.outChoose!=="function")throw new Error("outChoose");
    window.outChoose(h);return true;
  });
}
window.CERT={clean:cleanName,html:html,print:print,id:certId,dateKh:dateKh,css:CSS};
css();
})();
