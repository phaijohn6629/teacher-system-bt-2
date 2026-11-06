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
function head(P){var t=P.title||"ប្រឡងប្រចាំខែ";if(P.mo&&/^\d{4}-\d{2}$/.test(P.mo))t+=(/ខែ\s*$/.test(t)?" ":" ខែ ")+MO[+P.mo.slice(5)-1]+" ឆ្នាំ "+KN(P.mo.slice(0,4));return t}
function total(P){return(P.secs||[]).reduce(function(s,x){return s+(+x.pts||0)},0)}
function lunar(d){try{var a=d.split("-").map(Number);return window.KhCal?KhCal.fmt(a[0],a[1],a[2]).replace(" ព.ស. "," ព.ស ").replace(/([០-៩])(កើត|រោច)/,"$1 $2"):""}catch(e){return""}}
function solar(d){var a=String(d||"").split("-").map(Number);if(a.length<3||!a[0])return"";return"ថ្ងៃទី "+KN(a[2])+" ខែ"+MO[a[1]-1]+" ឆ្នាំ "+KN(a[0])}
function fig(f){return f&&window.FIG?"<div class=exp-fig>"+FIG.svg(f)+"</div>":""}
function html(P,o){
  o=o||{};var key=!!o.key,b=o.v==="b",T=total(P);
  var h="<div class=exp><div class=exp-hd><div class=exp-hl>"+
    "<div class=exp-b>"+ES(P.school||"វិទ្យាល័យ")+"</div>"+
    "<div class=exp-b>មុខវិជ្ជា "+ES(P.sub||"គណិតវិទ្យា")+" ថ្នាក់ទី <span class=exp-n>"+ES(P.cls||"")+"</span></div>"+
    (key?"":"<div class=exp-f>សិស្សឈ្មោះ <span class=exp-dot>.................................</span></div><div class=exp-f>ថ្នាក់ទី <span class=exp-dot>...................</span> លេខID<span class=exp-dot>...................</span></div>")+
    "</div><div class=exp-hr><div class=exp-b>"+ES(head(P))+"</div><div class=exp-b>រយៈពេល "+KN(+P.dur||0)+" នាទី ពិន្ទុ "+KN(T)+"</div>"+
    (key?"":"<div class=exp-sc><span></span><b>"+KN(T)+"</b></div>")+"</div></div>"+
    "<div class=exp-t>"+(key?"ចម្លើយ និងដំណោះស្រាយ":"វិញ្ញាសា")+(o.lbl?" "+ES(o.lbl):"")+"</div>";
  (P.secs||[]).forEach(function(s,i){
    var it=(b&&s.itB&&s.itB.length?s.itB:s.it)||[],inst=b&&s.instB!=null?s.instB:s.inst,one=it.length===1&&!(inst||"").trim();
    var sh=!key&&it.length>1&&it.every(function(x){return String(x.q||"").replace(/\$[^$]*\$/g,"xxxxxx").length<=70&&!x.fig});
    h+="<div class=exp-s><div class=exp-sh><b class=exp-rn>"+RN[i]+".</b> <b class=exp-pt>("+KN(+s.pts||0)+" ពិន្ទុ)</b> "+(one?TX(it[0].q):TX(inst||""))+"</div>";
    if(one){h+=fig(it[0].fig);if(key)h+=keyBox(it[0])}
    else h+="<div class='exp-it"+(sh?" two":"")+"'>"+it.map(function(x,j){return"<div class=exp-i><b class=exp-sl>"+SUB[j]+".</b> <span>"+TX(x.q)+"</span>"+fig(x.fig)+(key?keyBox(x):"")+"</div>"}).join("")+"</div>";
    h+="</div>";
  });
  var ld=lunar(P.date);
  h+="<div class=exp-ft><div class=exp-fl><div>បានឃើញ និងពិនិត្យ</div><div class=exp-nm>"+ES(P.ck||"")+"</div></div>"+
    "<div class=exp-fr>"+(ld?"<div>"+ES(ld)+"</div>":"")+"<div>"+ES(P.place||"រាជធានីភ្នំពេញ")+" "+solar(P.date)+"</div><div class=exp-au>អ្នកចេញវិញ្ញាសា</div><div class=exp-nm>"+ES(P.au||"")+"</div></div></div></div>";
  return h;
}
function keyBox(x){return"<div class=exp-k><div><b>ចម្លើយ៖</b> "+TX(x.ans||"—")+"</div>"+(x.sol?"<div class=exp-ks>"+TX(x.sol)+"</div>":"")+"</div>"}
/* ពុម្ពអក្សរដូចវិញ្ញាសាសាលា (LaTeX)៖ ចំណងជើង = Khmer M1 (GPL · ផ្ទុកពី fonts/) · អត្ថបទ = Khmer Kep (មានក្នុងកុំព្យូទ័រគ្រូ · មិនផ្សព្វផ្សាយ ព្រោះរក្សាសិទ្ធិ) → មិនមាន = Battambang */
var BASE=(function(){try{var s=document.currentScript&&document.currentScript.src;return s?s.replace(/[^\/]*$/,""):""}catch(e){return""}})();
var FF="@font-face{font-family:'ExM1';src:local('Khmer M1'),url('"+BASE+"fonts/khmer-m1.ttf') format('truetype');font-display:swap}"+
"@font-face{font-family:'ExKep';src:local('Khmer Kep'),local('KhmerKep'),local('KHMERKEP');font-display:swap}";
var CSS=FF+".exp{font-family:'ExKep','Battambang','Kantumruy Pro',system-ui,sans-serif;color:#111;line-height:1.75;font-size:14px;max-width:800px;margin:0 auto}"+
".exp-hd{display:flex;justify-content:space-between;gap:16px}.exp-hl,.exp-hr{display:flex;flex-direction:column}.exp-hr{align-items:flex-start;position:relative;min-width:42%}"+
".exp-b{font-family:'ExM1','Moul','Kantumruy Pro',serif;color:#1e3a8a;font-size:13.5px;line-height:2}.exp-n{font-family:'ExKep','Battambang',sans-serif;font-weight:700}"+
".exp-f{font-family:'ExM1','Moul','Kantumruy Pro',serif;color:#1e3a8a;font-size:13px;line-height:2.1}.exp-dot{font-family:'ExKep','Battambang',sans-serif;color:#444;letter-spacing:1px}"+
".exp-sc{width:96px;height:96px;border:2px solid #be123c;border-radius:50%;position:relative;margin:4px 0 0 60px}.exp-sc span{position:absolute;left:12px;right:12px;top:48%;border-top:2px solid #be123c}.exp-sc b{position:absolute;left:0;right:0;top:54%;text-align:center;color:#be123c;font-size:15px}"+
".exp-t{text-align:center;font-family:'ExM1','Moul','Kantumruy Pro',serif;color:#1e3a8a;font-size:15px;margin:6px 0 10px}"+
".exp-s{margin:6px 0 10px;break-inside:avoid}.exp-rn{color:#1e3a8a}.exp-pt{color:#be123c}.exp-it{margin:2px 0 0 34px}.exp-it.two{display:grid;grid-template-columns:1fr 1fr;column-gap:24px}.exp-i{margin:3px 0}.exp-sl{color:#1e3a8a;margin-right:4px}"+
".exp-fig{margin:6px 0;text-align:center}.exp-fig svg{max-width:300px;max-height:250px;width:auto;height:auto}"+
".exp-k{margin:2px 0 6px 18px;padding:4px 10px;border-left:3px solid #16a34a;background:#f0fdf4;font-size:13px}.exp-ks{color:#334155}"+
".exp-ft{display:flex;justify-content:space-between;align-items:flex-start;margin-top:26px;text-align:center;break-inside:avoid}.exp-fl{margin-top:70px;min-width:40%}.exp-fr{min-width:52%}"+
".exp-au{font-family:'ExM1','Moul','Kantumruy Pro',serif;color:#1e3a8a;margin-top:2px}.exp-nm{font-family:'ExM1','Moul','Kantumruy Pro',serif;margin-top:56px}.exp-fl .exp-nm{margin-top:60px}"+
"@media (max-width:600px){.exp-hd{flex-direction:column}.exp-sc{display:none}.exp-it.two{grid-template-columns:1fr}.exp-it{margin-left:14px}.exp-ft{flex-direction:column-reverse;gap:10px}.exp-fl{margin-top:0}}";
window.EXP={html:html,css:CSS,total:total,head:head,RN:RN,SUB:SUB};
})();
