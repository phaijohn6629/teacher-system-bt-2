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
function head(P){if(P.fmt==="cam")return P.title||"Topic Test";var t=P.title||"ប្រឡងប្រចាំខែ";if(P.fmt==="bac"||P.fmt==="dip")return t;if(P.mo&&/^\d{4}-\d{2}$/.test(P.mo))t+=(/ខែ\s*$/.test(t)?" ":" ខែ ")+MO[+P.mo.slice(5)-1]+" ឆ្នាំ "+KN(P.mo.slice(0,4));return t}
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
  o=o||{};if(P.fmt==="cam")return camHtml(P,o);var key=!!o.key,b=o.v==="b",T=total(P),bac=P.fmt==="bac"||P.fmt==="dip";
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
    if(one){h+=fig(it[0].fig);if(key)h+=keyBox(it[0],P.fmt==="dip"||P.fmt==="bac")}
    else h+="<div class='exp-it"+(sh?" two":"")+"'>"+it.map(function(x,j){return"<div class=exp-i><b class=exp-sl>"+SUB[j]+".</b> <span>"+TX(x.q)+"</span>"+fig(x.fig)+(key?keyBox(x,P.fmt==="dip"||P.fmt==="bac"):"")+"</div>"}).join("")+"</div>";
    h+="</div>";
  });
  if(cols)h+="</div>";
  if(bac)return h+"</div>";
  var ld=lunar(P.date);
  h+="<div class=exp-ft><div class=exp-fl><div>បានឃើញ និងពិនិត្យ</div><div class=exp-nm>"+ES(P.ck||"")+"</div></div>"+
    "<div class=exp-fr>"+(ld?"<div>"+ES(ld)+"</div>":"")+"<div>"+ES(P.place||"រាជធានីភ្នំពេញ")+" "+solar(P.date)+"</div><div class=exp-au>អ្នកចេញវិញ្ញាសា</div><div class=exp-nm>"+ES(P.au||"")+"</div></div></div></div>";
  return h;
}
/* ===== 🇬🇧 Cambridge style (fmt = "cam") · ក្រដាសសំណួរ + Mark scheme ជាភាសាអង់គ្លេស ===== */
var CMO=["January","February","March","April","May","June","July","August","September","October","November","December"],LT="abcdefghij";
function camDate(d){var a=String(d||"").split("-").map(Number);return a.length===3&&a[0]?a[2]+" "+CMO[a[1]-1]+" "+a[0]:""}
function camLines(al,m){al=al&&al.length?al:[""];return al.map(function(L,k){var pre="",suf="",mm=/^(\([iv]+\))\s*(.*)$/.exec(L=camRm(L));if(mm){pre=mm[1];L=mm[2]}
  if(/=\s*$/.test(L||""))pre+=(pre?" ":"")+L;else suf=L||"";
  return"<div class=cam-a>"+(pre?"<span>"+ES(pre)+"</span>":"")+"<span class=cam-ln></span>"+(suf?"<span>"+ES(suf)+"</span>":"")+"<b class=cam-mk>"+(k===al.length-1?"["+m+"]":"")+"</b></div>"}).join("")}
function camRm(L){return String(L||"").replace(/^\(([a-d])\)/,function(_,c){return"("+["i","ii","iii","iv"]["abcd".indexOf(c)]+")"})}
function camQ(x){var q=x.q||"";return x.al&&x.al.some(function(l){return/^\([a-d]\)/.test(l)})?q.replace(/\(([a-d])\)/g,function(_,c){return"("+["i","ii","iii","iv"]["abcd".indexOf(c)]+")"}):q}
function camAns(x){if(!x.at||!x.at.length)return x.ans||"";return x.at.map(function(t,k){var L=camRm(x.al&&x.al[k]),m=/^(\([iv]+\))\s*(.*)$/.exec(L),p=m?m[1]+" ":"";if(m)L=m[2];return p+(/=\s*$/.test(L)?L+" $"+t+"$":"$"+t+"$"+(L?" "+L:""))}).join(" · ")}
function camHtml(P,o){
  var key=!!o.key,b=o.v==="b",T=total(P),lb={"ក":"A","ខ":"B"}[o.lbl]||"";
  var h="<div class='exp cam'><div class='cam-cv"+(key?" cam-ck":"")+"'><div class=cam-top><span>"+ES(P.school||"")+"</span><span>"+ES(P.gt||"")+"</span></div>";
  if(!key)h+="<table class=cam-cd><tr><td>CANDIDATE<br>NAME</td><td colspan=3 class=cam-bx></td></tr><tr><td>CLASS</td><td class=cam-bx style='width:28%'></td><td>CANDIDATE<br>NUMBER</td><td class=cam-bx></td></tr></table>";
  h+="<div class=cam-sub>"+ES(String(P.sub||"Mathematics").toUpperCase())+"</div><div class=cam-tt>"+ES(P.title||"Topic Test")+(lb?" — Version "+lb:"")+(key?"<br>MARK SCHEME":"")+"</div>"+
    "<div class=cam-mt><span>"+ES(camDate(P.date))+"</span><span>"+(key?"Maximum mark: "+T:(+P.dur||45)+" minutes")+"</span></div>";
  if(!key)h+="<p class=cam-yn>You must answer on the question paper.</p><p class=cam-yn>You will need: "+(P.calc?"Calculator, ":"")+"Geometrical instruments</p>"+
    "<div class=cam-in><h4>INSTRUCTIONS</h4><ul><li>Answer <b>all</b> questions.</li><li>Use a black or dark blue pen. You may use an HB pencil for any diagrams or graphs.</li>"+
    "<li>Write your name, class and candidate number in the boxes at the top of the page.</li><li>Write your answer to each question in the space provided.</li>"+
    "<li>Do <b>not</b> use an erasable pen or correction fluid.</li><li>You should show all your working.</li>"+
    (P.calc?"<li>You may use a calculator. Give non-exact answers to the accuracy stated in the question.</li><li>For &pi;, use either your calculator value or 3.142.</li>":"<li>Calculators must <b>not</b> be used in this paper.</li>")+
    "</ul><h4>INFORMATION</h4><ul><li>The total mark for this paper is <b>"+T+"</b>.</li><li>The number of marks for each question or part question is shown in brackets [ ].</li></ul></div>";
  else h+="<div class=cam-in><ul><li>Award full marks for a correct final answer unless the question asks for working to be shown.</li><li>Accept equivalent forms (fractions, decimals, surds) and answers correct to the accuracy stated.</li><li>Award method marks for correct working even when the final answer is wrong.</li></ul></div>";
  h+="</div>";
  if(key)h+="<table class=cam-ms><thead><tr><th>Question</th><th>Answer</th><th>Marks</th><th>Partial marks / working</th></tr></thead><tbody>";
  (P.secs||[]).forEach(function(s,i){
    var it=(b&&s.itB&&s.itB.length?s.itB:s.it)||[],inst=b&&s.instB!=null?s.instB:s.inst,n=it.length||1,pts=+s.pts||0,bs=Math.floor(pts/n),ms=[];
    for(var j=0;j<n;j++)ms.push(bs);ms[n-1]=Math.round((ms[n-1]+pts-bs*n)*10)/10;
    var stem=inst&&!/[ក-៿]/.test(inst)?inst:"",wh=({1:60,2:100,3:140,4:140})[s.lv]||100;
    if(key){it.forEach(function(x,j){h+="<tr><td>"+(i+1)+(n>1?"("+LT[j]+")":"")+"</td><td>"+TX(camAns(x))+"</td><td>"+ms[j]+"</td><td class=cam-gd>"+TX(x.sol||"")+"</td></tr>"});return}
    h+="<div class=cam-q><div class=cam-qh><b>"+(i+1)+"</b><div>";
    if(it.length===1){h+=(stem?TX(stem)+"<br>":"")+TX(camQ(it[0]))+fig(it[0].fig)+"</div></div><div class=cam-w style='height:"+wh+"px'></div>"+camLines(it[0].al,ms[0])+"</div>";return}
    h+=(stem?"<div class=cam-st>"+TX(stem)+"</div>":"");
    it.forEach(function(x,j){h+="<div class=cam-p><div class=cam-pq><b>("+LT[j]+")</b><div>"+TX(camQ(x))+fig(x.fig)+"</div></div><div class=cam-w style='height:"+wh+"px'></div>"+camLines(x.al,ms[j])+"</div>"});
    h+="</div></div></div>";
  });
  if(key)h+="</tbody></table>";
  return h+"<div class=cam-ft>"+ES(P.school||"")+" · Cambridge-style practice paper · "+(key?"Mark scheme":"Total "+T+" marks")+"</div></div>";
}
var CAMCSS=".cam{font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#000;max-width:760px}.cam b{font-weight:700}"+
".cam-cv{break-after:page;page-break-after:always;padding-bottom:10px;border-bottom:1px dashed #cbd5e1;margin-bottom:16px}"+
".cam-top{display:flex;justify-content:space-between;gap:10px;font-size:12px;border-bottom:2px solid #000;padding-bottom:4px}"+
".cam-cd{width:100%;border-collapse:separate;border-spacing:6px;margin:12px 0;font-size:11px;font-weight:700}.cam-cd td{vertical-align:middle;white-space:nowrap}.cam-bx{border:1.5px solid #000;height:32px;width:100%}"+
".cam-sub{font-size:22px;font-weight:700;margin-top:18px;letter-spacing:.5px}.cam-tt{font-size:17px;font-weight:700;margin-top:2px}"+
".cam-mt{display:flex;justify-content:space-between;font-weight:700;border-bottom:1.5px solid #000;padding:8px 0 6px;margin-bottom:10px}"+
".cam-yn{margin:4px 0}.cam-in h4{margin:14px 0 4px;font-size:14px}.cam-in ul{margin:0;padding-left:22px}.cam-in li{margin:2px 0}"+
".cam-q{margin:16px 0 8px;break-inside:avoid;page-break-inside:avoid}.cam-qh{display:flex;gap:12px}.cam-qh>b{min-width:20px}.cam-qh>div{flex:1}"+
".cam-p{margin:0 0 12px;break-inside:avoid;page-break-inside:avoid}.cam-st{margin-bottom:8px}.cam-ck{break-after:auto;page-break-after:auto;border-bottom:none}.cam-pq{display:flex;gap:10px}.cam-pq>b{font-weight:400;min-width:24px}.cam-pq>div{flex:1}"+
".cam-a{display:flex;justify-content:flex-end;align-items:flex-end;gap:6px;margin-top:8px}.cam-ln{display:inline-block;width:200px;border-bottom:1.5px dotted #000;height:20px}.cam-mk{min-width:34px;text-align:right}"+
".cam-ms{width:100%;border-collapse:collapse;font-size:12.5px}.cam-ms th,.cam-ms td{border:1px solid #000;padding:4px 6px;vertical-align:top;text-align:left}.cam-ms th{background:#e5e7eb}.cam-ms tr{break-inside:avoid;page-break-inside:avoid}.cam-gd{color:#334155}.cam-ms td:nth-child(3){text-align:center;width:50px}.cam-ms td:first-child{width:62px;white-space:nowrap}"+
".cam-ft{margin-top:22px;font-size:11px;color:#555;text-align:center;border-top:1px solid #000;padding-top:4px}"+
"@media print{.cam-cv{border-bottom:none;margin-bottom:0}}";
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
CSS+=CAMCSS;
window.EXP={FONTS:FONTS,paginate:paginate,fit:fit,html:html,css:CSS,total:total,head:head,RN:RN,SUB:SUB};
})();
