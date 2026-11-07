/* ========================================================================
   📝 ប្រឡងទម្រង់បើក — គូរក្រដាសវិញ្ញាសា (ប្រើរួមគ្នា៖ exam.js គ្រូ · exam.html សិស្ស)
   EXP.html(P, {v:"a"|"b", key:true, lbl:"ក"}) → HTML (មិនទាន់គូររូបមន្ត · អ្នកហៅត្រូវហៅ renderMathInElement)
   P = {school, title, mo:"YYYY-MM"|"", sub, cls, dur, date:"YYYY-MM-DD", place, au, ck,
        secs:[{pts, inst, it:[{q, fig, ans, sol}], itB:[…]}]}
   ======================================================================== */
(function(){
"use strict";
var KN=function(n){return String(n).replace(/\d/g,function(d){return"០១២៣៤៥៦៧៨៩"[d]})};
var ES=function(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})};
/* LaTeX ក្នុង $…$ · ចុះបន្ទាត់ក្នុងរូបមន្ត → \\ · ក្រៅរូបមន្ត → <br> */
function TX(s){return ES(String(s||"").replace(/\$\$[\s\S]*?\$\$|\$[^$]*\$/g,function(m){return m.replace(/\s*\\\\\s*\n\s*/g,"\\\\ ").replace(/\s*\n\s*/g,"\\\\ ")})).replace(/\n/g,"<br>")}
var MO=["មករា","កុម្ភៈ","មីនា","មេសា","ឧសភា","មិថុនា","កក្កដា","សីហា","កញ្ញា","តុលា","វិច្ឆិកា","ធ្នូ"];
var RN=["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII"],SUB="កខគឃងចឆជឈញ";
function head(P){var t=P.title||"ប្រឡងប្រចាំខែ";if(P.fmt==="bac"||P.fmt==="dip")return t;if(P.mo&&/^\d{4}-\d{2}$/.test(P.mo))t+=(/ខែ\s*$/.test(t)?" ":" ខែ ")+MO[+P.mo.slice(5)-1]+" ឆ្នាំ "+KN(P.mo.slice(0,4));return t}
function total(P){return(P.secs||[]).reduce(function(s,x){return s+(+x.pts||0)},0)}
function lunar(d){try{var a=d.split("-").map(Number);return window.KhCal?KhCal.fmt(a[0],a[1],a[2]).replace(" ព.ស. "," ព.ស ").replace(/([០-៩])(កើត|រោច)/,"$1 $2"):""}catch(e){return""}}
function solar(d){var a=String(d||"").split("-").map(Number);if(a.length<3||!a[0])return"";return"ថ្ងៃទី "+KN(a[2])+" ខែ"+MO[a[1]-1]+" ឆ្នាំ "+KN(a[0])}
function fig(f){return f&&window.FIG?"<div class=exp-fig>"+FIG.svg(f)+"</div>":""}
/* ក្បាលទម្រង់បាក់ឌុប៖ ឆ្វេង = ប្រឡង · សម័យ · វិញ្ញាសា · រយៈពេល · ស្ដាំ = ប្រអប់បេក្ខជន · កណ្ដាល = «ប្រធាន» */
function bacHead(P,o,T){var a=String(P.date||"").split("-").map(Number),ss=a.length===3&&a[0]?KN(a[2])+" "+MO[a[1]-1]+" "+KN(a[0]):"..................",D="<span class=exp-dot>....................</span>";
  return"<div class=\"exp exp-bac\" style=\""+fvars(P.font)+"\"><div class=exp-hd><div class=exp-hl>"+
    "<div class=exp-b>"+ES(P.title||"វិញ្ញាសាត្រៀមប្រឡងសញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ")+"</div>"+
    "<div class=exp-b>វិញ្ញាសា "+ES(P.sub||"គណិតវិទ្យា")+(P.trk?" <span class=exp-n>("+ES(P.trk)+")</span>":"")+"</div>"+
    "<div class=exp-b>រយៈពេល៖ "+KN(+P.dur||0)+"នាទី</div><div class=exp-b>ពិន្ទុសរុប៖ "+KN(T)+"</div></div>"+
    "<div class=exp-cd><div class=exp-f>សម័យប្រឡង៖ <span class=exp-n>"+ss+"</span></div>"+(o.key?"":"<div class=exp-f>មណ្ឌលប្រឡង៖ "+D+"</div><div class=exp-f>លេខបន្ទប់ <span class=exp-dot>.........</span> លេខតុ <span class=exp-dot>.........</span></div><div class=exp-f>ឈ្មោះបេក្ខជន "+D+"</div><div class=exp-f>ហត្ថលេខាបេក្ខជន <span class=exp-dot>..............</span></div>")+"</div>"+
    "</div><div class=exp-t>"+(o.key?"អត្រាកំណែ":"ប្រធាន")+(o.lbl?" "+ES(o.lbl):"")+"</div>"}
/* ក្បាលទម្រង់ឌីប្លូម (ថ្នាក់ទី៩)៖ ឆ្វេង = ប្រឡង · សម័យ · វិញ្ញាសា · រយៈពេល · ពិន្ទុ · ស្ដាំ = មណ្ឌល · បន្ទប់ · តុ · ហត្ថលេខា · ឈ្មោះ · ក្រោម = «ប្រធាន៖ ____» */
function dipHead(P,o,T){var a=String(P.date||"").split("-").map(Number),ss=a.length===3&&a[0]?KN(a[2])+" "+MO[a[1]-1]+" "+KN(a[0]):"",D="<span class=exp-dot>..............................</span>";
  var row=function(l,v){return"<tr><td class=exp-b>"+l+"</td><td class=exp-b>:</td><td>"+v+"</td></tr>"},n=function(v){return"<span class=exp-n>"+v+"</span>"};
  return"<div class=\"exp exp-bac exp-dip\" style=\""+fvars(P.font)+"\"><div class=exp-dh><table class=exp-dt>"+
    "<tr><td class=exp-b colspan=3>"+ES(P.title||"ប្រឡងសញ្ញាបត្រមធ្យមសិក្សាបឋមភូមិ")+"</td></tr>"+
    row("សម័យប្រឡង",ss?n(ss):D)+row("វិញ្ញាសា",n(ES(P.sub||"គណិតវិទ្យា")))+row("រយៈពេល",n(KN(+P.dur||0)+" នាទី"))+row("ពិន្ទុ",n(KN(T)))+"</table>"+
    (o.key?"":"<table class=exp-dt>"+row("មណ្ឌលប្រឡង",D)+row("លេខបន្ទប់",D)+row("លេខតុ",D)+row("ហត្ថលេខាបេក្ខជន",D)+row("ឈ្មោះបេក្ខជន",D)+"</table>")+"</div>"+
    (o.key?"<div class=exp-t>អត្រាកំណែ"+(o.lbl?" "+ES(o.lbl):"")+"</div>":"<div class=exp-pr><b>ប្រធាន៖</b><span></span>"+(o.lbl?"<b>"+ES(o.lbl)+"</b>":"")+"</div>")}
/* ប្រវែងមើលឃើញប្រហាក់ប្រហែល (រូបមន្ត → ដកពាក្យបញ្ជា LaTeX) */
function vlen(q){q=String(q||"");var m=0;var t=q.replace(/\$\$?([^$]*)\$\$?/g,function(_,f){m+=f.replace(/\\(dfrac|frac)/g,"").replace(/\\[a-zA-Z]+/g,"x").replace(/[{}^_\\ ]/g,"").length;return""});return t.replace(/[\u17b6-\u17d3]/g,"").length+m}
/* បន្ទាប់ពីគូររួច៖ ក ខ ណាមួយចុះបន្ទាត់ក្នុង ២ ជួរឈរ → ប្ដូរជា ១ ជួរឈរ */
function fit(root){[].forEach.call((root||document).querySelectorAll(".exp-it.two"),function(g){
  var w=[].some.call(g.querySelectorAll(".exp-i>span"),function(sp){var r=sp.getClientRects();if(r.length<2)return false;var y=r[0].top;return[].some.call(r,function(x){return Math.abs(x.top-y)>12})});
  if(w)g.classList.remove("two")})}
function html(P,o){
  o=o||{};var key=!!o.key,b=o.v==="b",T=total(P),bac=P.fmt==="bac"||P.fmt==="dip";
  var h=P.fmt==="dip"?dipHead(P,o,T):bac?bacHead(P,o,T):"<div class=exp style=\""+fvars(P.font)+"\"><div class=exp-hd><div class=exp-hl>"+
    "<div class=exp-b>"+ES(P.school||"វិទ្យាល័យ")+"</div>"+
    "<div class=exp-b>មុខវិជ្ជា "+ES(P.sub||"គណិតវិទ្យា")+" ថ្នាក់ទី <span class=exp-n>"+ES(P.cls||"")+"</span></div>"+
    (key?"":"<div class=exp-f>សិស្សឈ្មោះ <span class=exp-dot>.................................</span></div><div class=exp-f>ថ្នាក់ទី <span class=exp-dot>...................</span> លេខID<span class=exp-dot>...................</span></div>")+
    "</div><div class=exp-hr><div class=exp-b>"+ES(head(P))+"</div><div class=exp-b>រយៈពេល "+KN(+P.dur||0)+" នាទី ពិន្ទុ "+KN(T)+"</div>"+
    (key?"":"<div class=exp-sc><span></span><b>"+KN(T)+"</b></div>")+"</div></div>"+
    "<div class=exp-t>"+(key?"អត្រាកំណែ":"វិញ្ញាសា")+(o.lbl?" "+ES(o.lbl):"")+"</div>";
  var cols=key&&bac;if(cols)h+="<div class=exp-cols>";
  (P.secs||[]).forEach(function(s,i){
    var it=(b&&s.itB&&s.itB.length?s.itB:s.it)||[],inst=b&&s.instB!=null?s.instB:s.inst,one=it.length===1&&!(inst||"").trim();
    var sh=!key&&it.length>1&&it.every(function(x){return vlen(x.q)<=40&&!/\n/.test(x.q||"")&&!x.fig});
    h+="<div class=exp-s><div class=exp-sh><b class=exp-rn>"+RN[i]+".</b> <b class=exp-pt>("+KN(+s.pts||0)+" ពិន្ទុ)</b> "+(one?TX(it[0].q):TX(inst||""))+"</div>";
    if(one){h+=fig(it[0].fig);if(key)h+=keyBox(it[0],P.fmt==="dip")}
    else h+="<div class='exp-it"+(sh?" two":"")+"'>"+it.map(function(x,j){return"<div class=exp-i><b class=exp-sl>"+SUB[j]+".</b> <span>"+TX(x.q)+"</span>"+fig(x.fig)+(key?keyBox(x,P.fmt==="dip"):"")+"</div>"}).join("")+"</div>";
    h+="</div>";
  });
  if(cols)h+="</div>";
  if(bac)return h+"</div>";
  var ld=lunar(P.date);
  h+="<div class=exp-ft><div class=exp-fl><div>បានឃើញ និងពិនិត្យ</div><div class=exp-nm>"+ES(P.ck||"")+"</div></div>"+
    "<div class=exp-fr>"+(ld?"<div>"+ES(ld)+"</div>":"")+"<div>"+ES(P.place||"រាជធានីភ្នំពេញ")+" "+solar(P.date)+"</div><div class=exp-au>អ្នកចេញវិញ្ញាសា</div><div class=exp-nm>"+ES(P.au||"")+"</div></div></div></div>";
  return h;
}
function keyBox(x,full){if(x.sol&&(full||/\n|\$\$/.test(x.sol)))return"<div class='exp-k exp-kf'>"+fig(x.kfig)+"<div class=exp-ks>"+TX(x.sol)+"</div><div class=exp-ka><b>ដូចនេះ</b> <span class=exp-bx>"+TX(x.ans||"—")+"</span></div></div>";
  return"<div class=exp-k><div><b>ចម្លើយ៖</b> "+TX(x.ans||"—")+"</div>"+(x.sol?"<div class=exp-ks>"+TX(x.sol)+"</div>":"")+"</div>"}

/* 🖨️ បែងទំព័រដោយខ្លួនឯង (ចម្លើយពីរជួរឈរ)៖ Safari បោះពុម្ព column-count កាត់បន្ទាត់អក្សរ/រូបពាក់កណ្ដាលទំព័រ
   → បំបែកជាប្លុកតូចៗ (ចំណងជើង · សំណួរ · បន្ទាត់ដំណោះស្រាយ · រូបមន្ត · រូប · «ដូចនេះ») រួចបំពេញជួរឆ្វេង → ស្ដាំ → ទំព័រថ្មី */
function paginate(doc){
  var cols=doc.querySelector(".exp-cols");if(!cols)return;
  var root=cols.parentNode,W=688,PH=1000,units=[];
  root.style.width=W+"px";root.style.maxWidth=W+"px";
  function A(a){return[].slice.call(a)}
  function U(nodes,cls,keep,ind){var d=doc.createElement("div");if(cls)d.className=cls;if(ind)d.style.paddingLeft="8px";nodes.forEach(function(n){d.appendChild(n)});units.push({el:d,keep:keep})}
  function sol(k,ind){
    if(!/exp-kf/.test(k.className)){U([k],"",false,ind);return}
    A(k.childNodes).forEach(function(n){
      if(n.nodeType!==1)return;
      if(/exp-fig/.test(n.className))U([n],"",false,ind);
      else if(/exp-ks/.test(n.className)){var g=[],fl=function(){if(g.length&&g.some(function(x){return x.nodeType===1||/\S/.test(x.textContent)}))U(g,"pg-l",false,ind);g=[]};
        A(n.childNodes).forEach(function(c){if(c.nodeName==="BR")fl();else if(c.nodeType===1&&/katex-display/.test(c.className)){fl();U([c],"pg-l",false,ind)}else g.push(c)});fl()}
      else if(/exp-ka/.test(n.className))U([n],"pg-e",false,ind)})}
  A(cols.children).forEach(function(sec){A(sec.children).forEach(function(c){
    if(/exp-sh/.test(c.className))U([c],"pg-h",true);
    else if(/exp-it/.test(c.className))A(c.children).forEach(function(it){var q=[],ks=[];
      A(it.childNodes).forEach(function(n){if(n.nodeType===1&&/(^|\s)exp-k(\s|$)/.test(n.className))ks.push(n);else q.push(n)});
      U(q,"exp-i",true,1);ks.forEach(function(k){sol(k,1)})});
    else if(/exp-fig/.test(c.className))U([c],"",false);
    else if(/(^|\s)exp-k(\s|$)/.test(c.className))sol(c,0)})});
  var first=true,colEls,ci;
  function page(){var pg=doc.createElement("div"),h=first?PH-(cols.getBoundingClientRect().top-root.getBoundingClientRect().top):PH;
    pg.className="pg";pg.style.cssText="display:flex;height:"+h+"px;"+(first?"":"break-before:page;page-break-before:always;");
    colEls=[0,1].map(function(i){var c=doc.createElement("div");c.style.cssText="flex:1 1 0;min-width:0;height:100%;overflow:hidden;"+(i?"padding-left:13px":"padding-right:13px;border-right:1px solid #94a3b8");pg.appendChild(c);return c});
    ci=0;root.insertBefore(pg,cols);first=false}
  page();
  units.forEach(function(u){var c=colEls[ci];u.el._keep=u.keep;c.appendChild(u.el);
    if(c.scrollHeight>c.clientHeight+1&&c.children.length>1){c.removeChild(u.el);var carry=[],l=c.lastElementChild;
      while(l&&l._keep&&c.children.length>1){carry.unshift(l);c.removeChild(l);l=c.lastElementChild}
      if(ci===0)ci=1;else page();carry.concat([u.el]).forEach(function(e){colEls[ci].appendChild(e)})}});
  cols.parentNode.removeChild(cols);
}
/* ពុម្ពអក្សរដូចវិញ្ញាសាសាលា (LaTeX)៖ ចំណងជើង = Khmer M1 (GPL · ផ្ទុកពី fonts/) · អត្ថបទ = Khmer Kep (មានក្នុងកុំព្យូទ័រគ្រូ · មិនផ្សព្វផ្សាយ ព្រោះរក្សាសិទ្ធិ) → មិនមាន = Battambang */
var BASE=(function(){try{var s=document.currentScript&&document.currentScript.src;return s?s.replace(/[^\/]*$/,""):""}catch(e){return""}})();
var FF="@font-face{font-family:'ExM1';src:local('Khmer M1'),url('"+BASE+"fonts/khmer-m1.ttf') format('truetype');font-display:swap}"+
"@font-face{font-family:'ExKep';src:local('Khmer Kep'),local('KhmerKep'),local('KHMERKEP');font-display:swap}"+
"@font-face{font-family:'ExMuolL';src:local('Khmer OS Muol Light'),local('KhmerOSmuollight'),url('"+BASE+"fonts/khmer-os-muol-light.ttf') format('truetype');font-display:swap}";
/* ពុម្ពអក្សរ (P.font)៖ ចំណងជើង (--fh) · អត្ថបទ (--fb) · Khmer OS (រដ្ឋបាល) ឬ Khmer M1/Kep (LaTeX) · មិនមានក្នុងកុំព្យូទ័រ → Google Fonts */
var MUOL="'ExMuolL','Khmer OS Muol Light','Khmer OS Muol','Moul',serif";
var FONTS={
  os:{n:"Khmer OS Siemreap + Muol Light (រដ្ឋបាល)",h:MUOL,b:"'Khmer OS Siemreap','Siemreap','Khmer OS Battambang','Battambang',sans-serif"},
  bt:{n:"Khmer OS Battambang + Muol Light",h:MUOL,b:"'Khmer OS Battambang','Battambang',sans-serif"},
  ct:{n:"Khmer OS Content + Muol Light (សៀវភៅ)",h:MUOL,b:"'Khmer OS Content','Kh Content','Content','Battambang',serif"},
  m1:{n:"Khmer M1 + Khmer Kep (ដូច LaTeX)",h:"'ExM1','Moul','Kantumruy Pro',serif",b:"'ExKep','Battambang','Kantumruy Pro',system-ui,sans-serif"}};
function fvars(k){var f=FONTS[k]||FONTS.os;return"--fh:"+f.h+";--fb:"+f.b}
var CSS=FF+".exp{"+fvars("os")+";font-family:var(--fb);color:#111;line-height:1.75;font-size:14px;max-width:800px;margin:0 auto}"+
".exp-hd{display:flex;justify-content:space-between;gap:16px}.exp-hl,.exp-hr{display:flex;flex-direction:column}.exp-hr{align-items:flex-start;position:relative;min-width:42%}"+
".exp-b{font-family:var(--fh);color:#1e3a8a;font-size:13.5px;line-height:2}.exp-n{font-family:var(--fb);font-weight:700}"+
".exp-f{font-family:var(--fh);color:#1e3a8a;font-size:13px;line-height:2.1}.exp-dot{font-family:var(--fb);color:#444;letter-spacing:1px}"+
".exp-sc{width:96px;height:96px;border:2px solid #be123c;border-radius:50%;position:relative;margin:4px 0 0 60px}.exp-sc span{position:absolute;left:12px;right:12px;top:48%;border-top:2px solid #be123c}.exp-sc b{position:absolute;left:0;right:0;top:54%;text-align:center;color:#be123c;font-size:15px}"+
".exp-t{text-align:center;font-family:var(--fh);color:#1e3a8a;font-size:15px;margin:6px 0 10px}"+
".exp-s{margin:6px 0 10px;break-inside:avoid}.exp-rn{color:#1e3a8a}.exp-pt{color:#be123c}.exp-it{margin:2px 0 0 34px}.exp-it.two{display:grid;grid-template-columns:1fr 1fr;column-gap:24px}.exp-i{margin:3px 0}.exp-sl{color:#1e3a8a;margin-right:4px}"+
".exp-fig{margin:6px 0;text-align:center;break-inside:avoid;page-break-inside:avoid;display:flow-root}.exp-fig svg{display:block;margin:0 auto;break-inside:avoid;max-width:300px;max-height:250px;width:auto;height:auto}"+
".exp-cols{column-count:2;column-gap:26px;column-rule:1px solid #94a3b8}.exp-cols .exp-s{break-inside:auto}.exp-cols .exp-it{margin-left:8px}.exp-cols .exp-sh{break-after:avoid}"+
".exp-kf{border-left:none!important;background:none!important;padding:0 0 4px!important;margin:2px 0 10px!important;font-size:13.5px}.exp-kf .exp-ks{color:#111}.exp-kf .katex-display{margin:.3em 0;font-size:.96em;overflow-x:auto;overflow-y:hidden;break-inside:avoid}"+
".pg-h{margin:8px 0 2px}.pg-l{font-size:13.5px;color:#111}.pg-l .katex-display{margin:.3em 0;font-size:.96em}.pg-e{margin:3px 0 10px;font-size:13.5px}.pg .exp-fig{margin:4px 0}"+
".exp-ka{margin-top:3px;display:flex;flex-wrap:wrap;align-items:center;gap:4px;break-inside:avoid;page-break-inside:avoid}.exp-bx{display:inline-block;break-inside:avoid;page-break-inside:avoid;border:1.5px solid #111;padding:1px 10px;margin-left:4px}"+
".exp-k{margin:2px 0 6px 18px;padding:4px 10px;border-left:3px solid #16a34a;background:#f0fdf4;font-size:13px}.exp-ks{color:#334155}"+
".exp-ft{display:flex;justify-content:space-between;align-items:flex-start;margin-top:26px;text-align:center;break-inside:avoid}.exp-fl{margin-top:70px;min-width:40%}.exp-fr{min-width:52%}"+
".exp-au{font-family:var(--fh);color:#1e3a8a;margin-top:2px}.exp-nm{font-family:var(--fh);margin-top:56px}.exp-fl .exp-nm{margin-top:60px}"+
".exp-cd{border:1.5px solid #1e3a8a;border-radius:4px;padding:2px 12px;align-self:flex-start}.exp-bac .exp-t{font-size:17px;margin:10px 0 12px}"+
".exp-dh{display:flex;justify-content:space-between;gap:14px;align-items:flex-start}.exp-dt{border-collapse:collapse}.exp-dt td{padding:0 4px;vertical-align:baseline;line-height:2;font-size:13.5px}.exp-dt td.exp-b{white-space:nowrap}"+
".exp-pr{display:flex;align-items:baseline;gap:8px;margin:10px 0 14px;font-family:var(--fh);color:#1e3a8a}.exp-pr span{flex:1;border-bottom:1.5px solid #1e3a8a}"+
"@media (max-width:600px){.exp-hd,.exp-dh{flex-direction:column}.exp-sc{display:none}.exp-it.two{grid-template-columns:1fr}.exp-it{margin-left:14px}.exp-ft{flex-direction:column-reverse;gap:10px}.exp-fl{margin-top:0}}";
window.EXP={FONTS:FONTS,paginate:paginate,fit:fit,html:html,css:CSS,total:total,head:head,RN:RN,SUB:SUB};
})();
