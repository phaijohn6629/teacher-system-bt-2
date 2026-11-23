/* ========================================================================
   🎓 cert.js — វិញ្ញាបនបត្រសិស្ស (Certificate) · ផ្ទុកតាមតម្រូវការ (lazy) ដោយ quiz.js
   - CERT.html({name,cls,title,score,max,date,id,kind,rank,school,teacher,sig,motto}) → HTML A4 landscape មួយសន្លឹក
       kind = "pass" (ជាប់ពិន្ទុកំណត់) | "rank" (ចំណាត់ថ្នាក់ទី ១–៣ · rank = 1|2|3)
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
function num(x){x=+x;return isFinite(x)?(Math.round(x*100)/100):0}

/* លេខវិញ្ញាបនបត្រ៖ «CT-» + ៦ តួ (ពី t_sid) + «-» + ៣ តួ checksum (t · sid · ពិន្ទុ · សរុប) */
function certId(t,sid,sc,n){
  var a=fnv(String(t)+"_"+String(sid),0).toString(36).toUpperCase().padStart(7,"0").slice(-6);
  var b=fnv(String(t)+"|"+sid+"|"+num(sc)+"|"+num(n),7).toString(36).toUpperCase().padStart(3,"0").slice(-3);
  return"CT-"+a+"-"+b;
}
function dateKh(d){d=d||new Date();return"ថ្ងៃទី "+kn(d.getDate())+" ខែ "+MON[d.getMonth()]+" ឆ្នាំ"+kn(d.getFullYear())}

var CSS=
".cert-print{--u:1mm;--cn:#1E3A8A;--cg:#D97706;position:relative;box-sizing:border-box;width:calc(297*var(--u));height:calc(209*var(--u));margin:0 auto;padding:calc(9*var(--u));background:#fff;color:#0F172A;overflow:hidden;font-family:'Khmer OS Battambang','Battambang',serif;line-height:1.5;-webkit-print-color-adjust:exact;print-color-adjust:exact}"+
".cert-print *{box-sizing:border-box}"+
".cert-print .ct-b1{position:absolute;inset:calc(5*var(--u));border:calc(1.6*var(--u)) solid var(--cn)}"+
".cert-print .ct-b2{position:absolute;inset:calc(8*var(--u));border:calc(.5*var(--u)) solid var(--cg)}"+
".cert-print .ct-c{position:absolute;width:calc(14*var(--u));height:calc(14*var(--u));border:calc(1.6*var(--u)) solid var(--cg)}"+
".cert-print .ct-c.a{top:calc(11*var(--u));left:calc(11*var(--u));border-right:0;border-bottom:0}"+
".cert-print .ct-c.b{top:calc(11*var(--u));right:calc(11*var(--u));border-left:0;border-bottom:0}"+
".cert-print .ct-c.c{bottom:calc(11*var(--u));left:calc(11*var(--u));border-right:0;border-top:0}"+
".cert-print .ct-c.d{bottom:calc(11*var(--u));right:calc(11*var(--u));border-left:0;border-top:0}"+
".cert-print .ct-in{position:relative;height:100%;display:flex;flex-direction:column;align-items:center;text-align:center;padding:calc(7*var(--u)) calc(16*var(--u)) calc(6*var(--u))}"+
".cert-print .ct-mo{font-family:'Khmer OS Muol Light','Moul',serif;font-weight:400;color:var(--cn)}"+
".cert-print .ct-top{display:flex;align-items:center;justify-content:center;gap:calc(4*var(--u))}"+
".cert-print .ct-top img{height:calc(15*var(--u));width:auto;object-fit:contain}"+
".cert-print .ct-sc{font-size:calc(4.6*var(--u));line-height:1.6}"+
".cert-print .ct-mt{font-size:calc(3.4*var(--u));color:#475569;margin-top:calc(.5*var(--u))}"+
".cert-print .ct-ti{font-size:calc(9.5*var(--u));line-height:1.5;margin-top:calc(4*var(--u));color:var(--cn)}"+
".cert-print .ct-bd{width:calc(36*var(--u));height:calc(.8*var(--u));background:var(--cg);margin:calc(1.6*var(--u)) auto calc(2.6*var(--u))}"+
".cert-print .ct-sub{font-size:calc(4.2*var(--u))}"+
".cert-print .ct-nm{font-family:'Khmer OS Muol Light','Moul',serif;font-weight:400;color:var(--cn);margin:calc(2.4*var(--u)) 0 calc(1*var(--u));line-height:1.7;max-width:100%;border-bottom:calc(.4*var(--u)) dotted var(--cg);padding:0 calc(10*var(--u)) calc(.6*var(--u));overflow-wrap:anywhere}"+
".cert-print .ct-tx{font-size:calc(4.4*var(--u));line-height:1.8;max-width:calc(230*var(--u));margin-top:calc(1.5*var(--u))}"+
".cert-print .ct-tx b{color:var(--cn)}"+
".cert-print .ct-md{display:inline-flex;align-items:center;justify-content:center;width:calc(17*var(--u));height:calc(17*var(--u));border-radius:50%;font-family:'Khmer OS Muol Light','Moul',serif;font-size:calc(8*var(--u));color:#fff;margin-top:calc(2*var(--u));border:calc(.9*var(--u)) double #fff;box-shadow:0 0 0 calc(.8*var(--u)) var(--cg)}"+
".cert-print .ct-md.r1{background:#D97706}.cert-print .ct-md.r2{background:#64748B}.cert-print .ct-md.r3{background:#9A5B25}"+
".cert-print .ct-ft{margin-top:auto;width:100%;display:flex;justify-content:space-between;align-items:flex-end;gap:calc(8*var(--u));font-size:calc(3.5*var(--u))}"+
".cert-print .ct-ft>div{min-width:0}"+
".cert-print .ct-id{text-align:left;color:#475569;line-height:1.7}"+
".cert-print .ct-id b{color:var(--cn);letter-spacing:.04em}"+
".cert-print .ct-sg{text-align:center;min-width:calc(70*var(--u))}"+
".cert-print .ct-sg .sp{height:calc(14*var(--u));display:flex;align-items:center;justify-content:center}"+
".cert-print .ct-sg .sp img{max-height:calc(13*var(--u));max-width:calc(45*var(--u))}"+
".cert-print .ct-sg .ct-mo{font-size:calc(3.6*var(--u))}"+
"@page cert{size:A4 landscape;margin:0}"+
"body.pm #prt .cert-print.pg{page:cert;padding:calc(9*var(--u));border:0;line-height:1.5;font-size:inherit;break-inside:avoid;page-break-inside:avoid}"+
"body.pm #prt>.cert-print.pg.land{break-after:page;page-break-after:always}"+
"body.pm #prt>.cert-print.pg.land:last-child{break-after:avoid!important;page-break-after:avoid!important}"+
".pdfw .cert-print{--u:.946mm}";
function css(){if(document.getElementById("certCss"))return;var s=document.createElement("style");s.id="certCss";s.textContent=CSS;document.head.appendChild(s)}

function nameSize(n){var l=String(n||"").length;return l>34?5.2:l>26?6.2:l>18?7.4:8.6}

function html(o){
  o=o||{};
  var rank=+o.rank,isRank=o.kind==="rank"&&rank>=1&&rank<=3,sc=num(o.score),mx=num(o.max),pct=mx>0?Math.round(sc/mx*100):0;
  var title=isRank?"វិញ្ញាបនបត្រ ជ័យលាភីចំណាត់ថ្នាក់ទី "+kn(rank):"វិញ្ញាបនបត្រ ជាប់លក្ខខណ្ឌពិន្ទុ";
  var logo=src(o.logo||"");   /* ត្រូវជា data URL / https (បញ្ជូនដោយ print()) */
  var sg=src(o.sig||"");
  var body="ដែលបានបំពេញតេស្ត <b>«"+esc(o.title)+"»</b> ដោយទទួលបានពិន្ទុ <b>"+kn(sc)+" / "+kn(mx)+"</b> ("+kn(pct)+"%)"+
    (isRank?" ហើយឈរ <b>ចំណាត់ថ្នាក់ទី "+kn(rank)+"</b> ក្នុងចំណោមសិស្សទាំងអស់"
            :" ដែលបានដល់លក្ខខណ្ឌពិន្ទុដែលបានកំណត់")+
    "។ សូមអបអរសាទរ និងជូនពរឱ្យបន្តខិតខំរៀនសូត្របន្ថែមទៀត។";
  return"<div class='pg land cert-print'>"+
    "<div class=ct-b1></div><div class=ct-b2></div><i class='ct-c a'></i><i class='ct-c b'></i><i class='ct-c c'></i><i class='ct-c d'></i>"+
    "<div class=ct-in>"+
      "<div class=ct-top>"+(logo?"<img src='"+logo+"' alt=''>":"")+"<div><div class='ct-mo ct-sc'>"+esc(o.school||"វិទ្យាល័យបឹងត្របែក")+"</div>"+
        "<div class=ct-mt>"+esc(o.motto||"សាលារៀនជំនាន់ថ្មី (NGS)")+"</div></div></div>"+
      "<div class='ct-mo ct-ti'>"+esc(title)+"</div><div class=ct-bd></div>"+
      "<div class=ct-sub>សូមប្រគល់វិញ្ញាបនបត្រនេះជូន</div>"+
      "<div class=ct-nm style='font-size:calc("+nameSize(o.name)+"*var(--u))'>"+esc(o.name)+"</div>"+
      "<div class=ct-sub>"+(o.cls?"សិស្សថ្នាក់ "+esc(o.cls):"")+"</div>"+
      "<div class=ct-tx>"+body+"</div>"+
      (isRank?"<div class='ct-md r"+rank+"'>"+kn(rank)+"</div>":"")+
      "<div class=ct-ft>"+
        "<div class=ct-id>លេខវិញ្ញាបនបត្រ៖ <b>"+esc(o.id||"")+"</b><br>កាលបរិច្ឆេទ៖ "+esc(o.date||dateKh())+"</div>"+
        "<div class=ct-sg><div>រាជធានីភ្នំពេញ "+esc(o.date||dateKh())+"</div><div class='ct-mo'>គ្រូបង្រៀន</div>"+
        "<div class=sp>"+(sg?"<img src='"+sg+"' alt=''>":"")+"</div><div class='ct-mo'>"+esc(o.teacher||"")+"</div></div>"+
      "</div>"+
    "</div></div>";
}

/* រូបសាលា → data URL (safeSrc ទទួលតែ data:image/…;base64 ឬ https:// · មិនទទួល path ទាក់ទង) · ទាញម្ដង រក្សាក្នុង memory
   data URL ក៏ជួយឱ្យ window.print() មិនត្រូវរង់ចាំរូប · បរាជ័យ → គ្មាន logo (មិនបិទ Certificate) */
var logoP=null;
function logoData(){
  if(logoP)return logoP;
  logoP=new Promise(function(ok){
    var t=setTimeout(function(){ok("")},4000);
    try{fetch("logo-bt.jpg").then(function(r){if(!r.ok)throw 0;return r.blob()}).then(function(bl){
      var fr=new FileReader();fr.onload=function(){clearTimeout(t);ok(String(fr.result||""))};fr.onerror=function(){clearTimeout(t);ok("")};fr.readAsDataURL(bl)
    }).catch(function(){clearTimeout(t);ok("")})}catch(e){clearTimeout(t);ok("")}
  }).then(function(u){if(!u)logoP=null;return u});
  return logoP;
}
function print(list){
  list=(list||[]).filter(Boolean);if(!list.length)return Promise.resolve(false);
  css();
  var w=window.who||{},X=window.SCHX,sig="";try{sig=X&&X.getSig&&w.id?X.getSig(w.id):""}catch(e){}
  var inf=typeof window.inf==="function"?window.inf():{};
  var fonts=X&&X.fontsOk?X.fontsOk():Promise.resolve();
  return Promise.all([logoData(),fonts]).then(function(r){
    var lg=src(r[0]),h=list.map(function(o){return html(Object.assign({school:inf.school,teacher:w.name,sig:sig,logo:lg||""},o))}).join("");
    if(typeof window.outChoose!=="function")throw new Error("outChoose");
    window.outChoose(h);return true;
  });
}
window.CERT={html:html,print:print,id:certId,dateKh:dateKh,css:CSS};
css();
})();
