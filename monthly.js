/* ========================================================================
   លទ្ធផលសិក្សា › 🗓️ ពិន្ទុប្រចាំខែ (តាមគំរូ «ប្រព័ន្ធដាក់ពិន្ទុប្រចាំខែ.xlsx»)
   - ពិន្ទុអតិបរមាសរុបតាមថ្នាក់ = rs.mx (ដូចផ្ទាំងលទ្ធផលសិក្សា)
   - ភាគរយ និងកម្រិតនិទ្ទេស = rs.ms (Admin កែ · cfg/rs)
   - ពិន្ទុរបស់ថ្នាក់ = c.ms["YYYY-MM"] = {f:{ពិន្ទុពេញ}, r:{គន្លឹះសិស្ស:{a,t1,t2,h,b,c,o}}} (rs/{ID គ្រូ})
   - តេស្តលើកទី១/ទី២ យកពីផ្នែក «📝 តេស្ត» (ប្រភេទ លើកទី១/ទី២ និងខែ) ដោយស្វ័យប្រវត្តិ · តេស្តទូទៅមិនរាប់
   ពិន្ទុដើម × មេគុណ (អតិបរមា ÷ ពិន្ទុពេញ) → ពិន្ទុសកម្មភាព · តេស្ត = មធ្យមនៃតេស្តដែលបានបញ្ចូល
   ======================================================================== */
(function(){
"use strict";
var DEF={w:{a:.15,t:.15,h:.15,b:.15,c:.2,o:.2},gr:[.904,.804,.704,.604,.504]};
var COL=[["a","សកម្មភាព\nក្នុងថ្នាក់"],["t1","តេស្ត\nលើកទី១"],["t2","តេស្ត\nលើកទី២"],["h","ស្រាវជ្រាវ"],["b","សៀវភៅ\nកត់ត្រា"]];
var mT="",mI=0,mM=(function(){var d=new Date();return d.getFullYear()+"-"+("0"+(d.getMonth()+1)).slice(-2)})();
function cfg(){var m=rs.ms||{};return{w:Object.assign({},DEF.w,m.w||{}),gr:(m.gr&&m.gr.length===5)?m.gr:DEF.gr}}
function cls(){var cl=rs.c[mT]||[];if(mI>=cl.length)mI=0;return cl[mI]}
function canE(){return !!(who&&(isAdm()||who.id===mT))}
function key(s){return s.id?"i:"+s.id:"n:"+s.n}
function rec(c,create){c.ms=c.ms||{};var r=c.ms[mM];if(!r&&create)r=c.ms[mM]={f:{},r:{}};return r||{f:{},r:{}}}
function num(v){return v===""||v==null||isNaN(+v)?null:+v}
function r2(x){return Math.round(x*100)/100}
function fmt(x){return x==null?"":String(r2(x))}
/* អតិបរមានៃផ្នែកនីមួយៗ */
function maxes(c){
  var W=cfg().w,T=rs.mx[parseInt(c.n)]||100;
  return{T:T,a:T*W.a,t:T*W.t,h:T*W.h,b:T*W.b,c:T*W.c,o:T*W.o,act:T*(W.a+W.t+W.h+W.b)};
}
function factor(M,full){var f=num(full);return f?M/f:1}
function calc(c,R,F){
  var X=maxes(c),o={};
  o.a=num(R.a)==null?null:Math.min(X.a,R.a*factor(X.a,F.a));
  var ts=["t1","t2"].filter(function(k){return num(R[k])!=null}).map(function(k){return Math.min(X.t,R[k]*factor(X.t,F[k]))});
  o.t=ts.length?Math.min(X.t,ts.reduce(function(s,x){return s+x},0)/ts.length):null;
  o.h=num(R.h)==null?null:Math.min(X.h,R.h*factor(X.h,F.h));
  o.b=num(R.b)==null?null:Math.min(X.b,R.b*factor(X.b,F.b));
  var parts=[o.a,o.t,o.h,o.b].filter(function(x){return x!=null});
  o.act=parts.length?parts.reduce(function(s,x){return s+x},0):null;
  o.c=num(R.c)==null?null:Math.min(X.c,+R.c);o.o=num(R.o)==null?null:Math.min(X.o,+R.o);
  var all=[o.act,o.c,o.o].filter(function(x){return x!=null});
  o.tot=all.length?all.reduce(function(s,x){return s+x},0):null;
  o.g=o.tot==null?"":grade(o.tot/X.T);
  return o;
}
function grade(p){var G=cfg().gr;return p>=G[0]-1e-9?"A":p>=G[1]-1e-9?"B":p>=G[2]-1e-9?"C":p>=G[3]-1e-9?"D":p>=G[4]-1e-9?"E":"F"}
function gbadge(g){return g?"<span class='gr-badge gr-"+g+"'>"+g+"</span>":""}

/* ---------- ផ្ទាំង ---------- */
function renderMs(){
  if(!who)return;
  if(!mT||!data.some(function(t){return t.id===mT}))mT=data.some(function(t){return t.id===who.id})?who.id:(data[0]&&data[0].id)||"";
  $("msT").innerHTML=data.map(function(t){return"<option value='"+esc(t.id)+"'"+(t.id===mT?" selected":"")+">"+esc(t.name)+"</option>"}).join("");
  var cl=rs.c[mT]||[],c=cls(),ed=canE();
  $("msC").innerHTML=cl.length?cl.map(function(x,i){return"<option value="+i+(i===mI?" selected":"")+">"+esc(x.n)+" ("+x.st.length+" នាក់)</option>"}).join(""):"<option>— មិនទាន់មានថ្នាក់ —</option>";
  $("msM").value=mM;
  $("msImp").style.display=ed?"":"none";
  if(!c){$("msBody").innerHTML="<p class=note>គ្រូនេះមិនទាន់មានថ្នាក់ទេ។ សូមបង្កើតថ្នាក់ និងបញ្ចូលសិស្សនៅផ្ទាំង «លទ្ធផលសិក្សា» ជាមុន។</p>";return}
  var X=maxes(c),R=rec(c,false),F=R.f||{},W=cfg().w,pc=function(x){return Math.round(x*100)+"%"};
  var h="<div class='wrap ms-wrap'><table class=ms-tb><thead>"+
    "<tr><th rowspan=2>ល.រ</th><th rowspan=2>ឈ្មោះសិស្ស</th><th rowspan=2>ភេទ</th><th colspan=5 class=ms-in>ពិន្ទុដើមដែលបញ្ចូល</th><th colspan=5 class=ms-auto>ពិន្ទុសកម្មភាព "+pc(W.a+W.t+W.h+W.b)+" (ស្វ័យប្រវត្តិ)</th><th colspan=2 class=ms-in>ប្រឡង "+pc(W.c+W.o)+"</th><th rowspan=2>សរុប<br><small>/"+fmt(X.T)+"</small></th><th rowspan=2>និទ្ទេស</th></tr>"+
    "<tr>"+COL.map(function(x){var q=x[0]==="t1"||x[0]==="t2";return"<th class="+(q?"ms-tqh":"ms-in")+">"+x[1].replace("\n","<br>")+(q?"<br><small>📝 ពីតេស្ត</small>":"")+"</th>"}).join("")+
      "<th class=ms-auto>សកម្មភាព<br><small>/"+fmt(X.a)+"</small></th><th class=ms-auto>តេស្ត (មធ្យម)<br><small>/"+fmt(X.t)+"</small></th><th class=ms-auto>ស្រាវជ្រាវ<br><small>/"+fmt(X.h)+"</small></th><th class=ms-auto>សៀវភៅ<br><small>/"+fmt(X.b)+"</small></th><th class=ms-auto>សរុបសកម្មភាព<br><small>/"+fmt(X.act)+"</small></th>"+
      "<th class=ms-in>បិទ<br><small>/"+fmt(X.c)+"</small></th><th class=ms-in>បើក<br><small>/"+fmt(X.o)+"</small></th></tr>"+
    "<tr class=ms-full><td colspan=3>ពិន្ទុពេញ <small>(ទុកទទេ = អតិបរមា)</small></td>"+COL.map(function(x){var M=x[0][0]==="t"?X.t:X[x[0]];
      if(x[0]==="t1"||x[0]==="t2")return"<td class=ms-tq>"+(F[x[0]]?"<b>"+fmt(F[x[0]])+"</b>":"")+"</td>";return"<td><input data-mf="+x[0]+" value='"+esc(F[x[0]]==null?"":F[x[0]])+"' placeholder='"+fmt(M)+"' inputmode=decimal "+(ed?"":"readonly")+"></td>"}).join("")+"<td colspan=9></td></tr>"+
    "</thead><tbody>"+c.st.map(function(s,i){
      var r=(R.r||{})[key(s)]||{},o=calc(c,r,F);
      return"<tr data-mi="+i+"><td>"+kn(i+1)+"</td><td class=nm>"+esc(s.n)+"</td><td>"+esc((s.g||"").slice(0,1))+"</td>"+
        COL.map(function(x){if(x[0]==="t1"||x[0]==="t2")return"<td class=ms-tq>"+(r[x[0]]==null?(R.src&&R.src[x[0]]?"<span class=note style='margin:0'>—</span>":""):"<b>"+fmt(r[x[0]])+"</b>")+"</td>";
          return"<td class=ms-in><input data-mk="+x[0]+" value='"+esc(r[x[0]]==null?"":r[x[0]])+"' inputmode=decimal "+(ed?"":"readonly")+"></td>"}).join("")+
        "<td class=ms-auto data-o=a>"+fmt(o.a)+"</td><td class=ms-auto data-o=t>"+fmt(o.t)+"</td><td class=ms-auto data-o=h>"+fmt(o.h)+"</td><td class=ms-auto data-o=b>"+fmt(o.b)+"</td><td class='ms-auto ms-b' data-o=act>"+fmt(o.act)+"</td>"+
        "<td class=ms-in><input data-mk=c value='"+esc(r.c==null?"":r.c)+"' inputmode=decimal "+(ed?"":"readonly")+"></td><td class=ms-in><input data-mk=o value='"+esc(r.o==null?"":r.o)+"' inputmode=decimal "+(ed?"":"readonly")+"></td>"+
        "<td class=ms-b data-o=tot>"+fmt(o.tot)+"</td><td data-o=g>"+gbadge(o.g)+"</td></tr>"}).join("")+"</tbody></table></div>";
  h=testInfo(R)+h+summary(c)+settingsHtml();
  $("msBody").innerHTML=h;
  if(ed&&!syncing)syncTests(c);
}
/* តេស្តលើកទី១/ទី២ ពីផ្នែកតេស្ត */
function testInfo(R){
  var S=R.src||{};
  return"<div class=ms-tests>"+["t1","t2"].map(function(k){var x=S[k],L=k==="t1"?"តេស្តលើកទី១":"តេស្តលើកទី២";
    return"<div class='ms-tc"+(x?" on":"")+"'><b>📝 "+L+"</b>"+(x?"<span>«"+esc(x.title)+"» · "+kn(x.n)+" លំហាត់ · ធ្វើរួច "+kn(x.cnt)+" នាក់</span>":"<span class=note style='margin:0'>មិនទាន់មានតេស្ត «"+L+"» សម្រាប់ខែនេះ — បង្កើតនៅ «📝 តេស្ត → 🧪 បង្កើតតេស្ត» ដោយជ្រើសប្រភេទ «"+L+"»</span>")+"</div>"}).join("")+
    "<button type=button data-msync>🔄 ធ្វើបច្ចុប្បន្នភាព</button></div>";
}
var syncing=false,lastSync="";
function syncTests(c,manual){
  if(!window.QUIZ||!window.FB)return;
  var sk=mT+"|"+mI+"|"+mM;if(!manual&&lastSync===sk)return;lastSync=sk;syncing=true;
  var cmo=mM,ct=mT;
  QUIZ.forMonth(mT,c.n,mM).then(function(O){
    if(cmo!==mM||ct!==mT)return;
    var R=rec(c,true),before=JSON.stringify([R.f,R.r,R.src||{}]);R.src=R.src||{};
    ["t1","t2"].forEach(function(k){
      var x=O[k];
      c.st.forEach(function(s,i){var kk=key(s),r=R.r[kk];var v=x?x.by[sidOf(s,i)]:null;
        if(v!=null){r=R.r[kk]=r||{};r[k]=v}else if(r){delete r[k];if(!Object.keys(r).length)delete R.r[kk]}});
      if(x){R.f[k]=x.n;R.src[k]={id:x.t.id,title:x.t.title,n:x.n,cnt:Object.keys(x.by).length}}else{delete R.f[k];delete R.src[k]}
    });
    if(JSON.stringify([R.f,R.r,R.src])!==before){savR();renderMs()}else if(manual)notify("ពិន្ទុតេស្តត្រឹមត្រូវហើយ");
  }).catch(function(e){console.error("ms sync:",e);if(manual)alert("មិនអាចយកពិន្ទុតេស្តបានទេ")}).then(function(){syncing=false});
}
window.renderMs=renderMs;
function summary(c){
  var R=rec(c,false),F=R.f||{},cnt={A:0,B:0,C:0,D:0,E:0,F:0},n=0;
  c.st.forEach(function(s){var o=calc(c,(R.r||{})[key(s)]||{},F);if(o.g){cnt[o.g]++;n++}});
  return"<div class=ms-sum><b>និទ្ទេស៖</b> "+"ABCDEF".split("").map(function(g){return gbadge(g)+" "+kn(cnt[g])}).join(" · ")+" · <span class=note style='margin:0'>មានពិន្ទុ "+kn(n)+"/"+kn(c.st.length)+" នាក់ · អត្រាជាប់ (A–E) "+(n?((n-cnt.F)/n*100).toFixed(1)+"%":"—")+"</span></div>";
}
function settingsHtml(){
  var C=cfg(),adm=isAdm(),W=C.w,L=[["a","សកម្មភាពក្នុងថ្នាក់"],["t","ពិន្ទុតេស្ត (២ដង/ខែ)"],["h","កិច្ចការស្រាវជ្រាវ"],["b","ពិនិត្យសៀវភៅកត់ត្រា"],["c","ប្រឡងបិទ"],["o","ប្រឡងបើក"]];
  var sum=Object.keys(W).reduce(function(s,k){return s+(+W[k]||0)},0);
  return"<details class=ms-set><summary>⚙️ ការកំណត់ភាគរយ និងនិទ្ទេស"+(adm?"":" (កែបានតែ Admin)")+"</summary><div class=ms-sg>"+
    "<div><b>ភាគរយនៃពិន្ទុអតិបរមា</b>"+L.map(function(x){return"<label class=ms-l><span>"+x[1]+"</span><input type=number step=1 min=0 max=100 data-mw="+x[0]+" value="+Math.round(W[x[0]]*1000)/10+" "+(adm?"":"disabled")+"> %</label>"}).join("")+
      "<p class="+(Math.abs(sum-1)<1e-6?"ms-ok":"qz-warn")+">ផលបូក "+Math.round(sum*1000)/10+"% "+(Math.abs(sum-1)<1e-6?"✔ ត្រឹមត្រូវ":"✘ ត្រូវស្មើ ១០០%")+"</p></div>"+
    "<div><b>កម្រិតនិទ្ទេស (% នៃពិន្ទុអតិបរមាសរុប)</b>"+"ABCDE".split("").map(function(g,i){return"<label class=ms-l><span>"+gbadge(g)+" ចាប់ពី</span><input type=number step=0.1 min=0 max=100 data-mg="+i+" value="+Math.round(C.gr[i]*1000)/10+" "+(adm?"":"disabled")+"> %</label>"}).join("")+
      "<p class=note>F = ក្រោម E · ពិន្ទុអតិបរមាសរុបតាមថ្នាក់ កំណត់នៅផ្ទាំង «លទ្ធផលសិក្សា» → ⚙️ (ថ្នាក់ទី"+[7,8,9,10,11,12].map(function(g){return kn(g)+"="+kn(rs.mx[g]||100)}).join(" · ")+")</p></div></div></details>";
}
/* បញ្ចូលពិន្ទុ៖ គណនាជួរនោះភ្លាម (មិន render ឡើងវិញ ដើម្បីកុំបាត់ cursor) */
$("msBody").addEventListener("input",function(e){
  var el=e.target,c=cls();if(!c||!canE())return;
  if(el.dataset.mk||el.dataset.mf){
    var v=el.value.trim().replace(/[០-៩]/g,function(d){return"០១២៣៤៥៦៧៨៩".indexOf(d)}).replace(",",".");
    if(v!==""&&(isNaN(+v)||+v<0)){el.classList.add("bad");return}el.classList.remove("bad");
    var R=rec(c,true);
    if(el.dataset.mf){if(v==="")delete R.f[el.dataset.mf];else R.f[el.dataset.mf]=+v;savR();refreshAll(c);return}
    var tr=el.closest("tr"),s=c.st[+tr.dataset.mi],k=key(s),r=R.r[k]=R.r[k]||{};
    if(v==="")delete r[el.dataset.mk];else r[el.dataset.mk]=+v;
    if(!Object.keys(r).length)delete R.r[k];
    savR();refreshRow(c,tr,r,R.f);
    var sm=$("msBody").querySelector(".ms-sum");if(sm)sm.outerHTML=summary(c);
  }
});
function refreshRow(c,tr,r,F){var o=calc(c,r,F);["a","t","h","b","act","tot"].forEach(function(k){var td=tr.querySelector("[data-o="+k+"]");if(td)td.textContent=fmt(o[k])});tr.querySelector("[data-o=g]").innerHTML=gbadge(o.g)}
function refreshAll(c){var R=rec(c,false);[].forEach.call($("msBody").querySelectorAll("tr[data-mi]"),function(tr){refreshRow(c,tr,(R.r||{})[key(c.st[+tr.dataset.mi])]||{},R.f||{})});var sm=$("msBody").querySelector(".ms-sum");if(sm)sm.outerHTML=summary(c)}
$("msBody").addEventListener("change",function(e){
  var el=e.target;if(!isAdm()||!(el.dataset.mw||el.dataset.mg))return;
  rs.ms=rs.ms||{};var C=cfg();
  if(el.dataset.mw){C.w[el.dataset.mw]=Math.max(0,+el.value||0)/100;rs.ms.w=C.w}
  else{var g=C.gr.slice();g[+el.dataset.mg]=Math.max(0,+el.value||0)/100;rs.ms.gr=g}
  savR();renderMs();notify("បានរក្សាទុកការកំណត់");
});
$("msBody").addEventListener("click",function(e){if(e.target.closest("[data-msync]")){var c=cls();if(c&&canE())syncTests(c,true)}});
/* ចុច Enter → ចុះក្រោម */
$("msBody").addEventListener("keydown",function(e){
  if(e.key!=="Enter"||!e.target.dataset.mk)return;e.preventDefault();
  var tr=e.target.closest("tr").nextElementSibling,k=e.target.dataset.mk;if(tr){var n=tr.querySelector("[data-mk="+k+"]");if(n){n.focus();n.select()}}
});
$("msT").onchange=function(){mT=this.value;mI=0;renderMs()};
$("msC").onchange=function(){mI=+this.value||0;renderMs()};
$("msM").onchange=function(){mM=this.value||mM;renderMs()};

/* លេខសម្គាល់សិស្សក្នុងតេស្ត (ដូច quiz.js) */
function sidOf(s,i){return String(s.id||("n"+(i+1))).replace(/[^A-Za-z0-9_-]/g,"_")}

/* ---------- 📥 នាំចូលពីឯកសារ Excel គំរូ (ជួរ ៨ ឡើង · B គោត្តនាម · C នាម · E–I ពិន្ទុដើម · O–P ប្រឡង · ជួរ ៤ ពិន្ទុពេញ) ---------- */
function nk(s){return String(s||"").replace(/\s+/g,"").replace(/[\u200b-\u200d]/g,"")}
$("msImp").onclick=function(){
  var c=cls();if(!c||!canE())return;
  var f=document.createElement("input");f.type="file";f.accept=".xlsx,.xls";
  f.onchange=function(){var file=f.files[0];if(!file)return;loadXL(function(){var r=new FileReader();r.onload=function(ev){
    var wb;try{wb=XLSX.read(ev.target.result,{type:"array"})}catch(x){alert("មិនអាចអានឯកសារនេះបានទេ");return}
    var g=parseInt(c.n),pick=wb.SheetNames.filter(function(n){var ws=wb.Sheets[n],v=ws&&ws.C2&&ws.C2.v;return String(v)===String(g)||n.indexOf("ទី"+kn(g))>=0})[0]||wb.SheetNames.filter(function(n){return!/កំណត់/.test(n)})[0];
    var ws=wb.Sheets[pick],A=XLSX.utils.sheet_to_json(ws,{header:1,defval:"",raw:true});
    var COLS={a:4,h:7,b:8,c:14,o:15}   /* តេស្តលើកទី១/ទី២ យកពីផ្នែកតេស្តតែប៉ុណ្ណោះ */,map={};c.st.forEach(function(s){map[nk(s.n)]=s});
    var rows=A.slice(7).filter(function(r){return nk(r[1]+r[2])}),hit=0,miss=[],R=rec(c,true);
    var full=A[3]||[];Object.keys(COLS).forEach(function(k){if(k==="c"||k==="o")return;var v=num(full[COLS[k]]);if(v!=null)R.f[k]=v});
    rows.forEach(function(r){
      var s=map[nk(String(r[1])+String(r[2]))];if(!s){miss.push(String(r[1]).trim()+" "+String(r[2]).trim());return}
      var o=R.r[key(s)]=R.r[key(s)]||{},any=false;
      Object.keys(COLS).forEach(function(k){var v=num(r[COLS[k]]);if(v!=null){o[k]=v;any=true}});
      if(any)hit++;else if(!Object.keys(o).length)delete R.r[key(s)];
    });
    if(miss.length&&confirm("រកមិនឃើញ "+miss.length+" នាក់ក្នុងបញ្ជីថ្នាក់ "+c.n+"៖\n"+miss.slice(0,8).join(" · ")+(miss.length>8?" …":"")+"\n\nបន្ថែមពួកគេជាសិស្សថ្មី?")){
      rows.forEach(function(r){var nm=String(r[1]).trim()+" "+String(r[2]).trim();if(miss.indexOf(nm)<0)return;
        var s={id:"",n:nm,g:/^ស/.test(String(r[3]))?"ស្រី":/^ប/.test(String(r[3]))?"ប្រុស":"",a:["","","","","",""],b:["","","","",""]};c.st.push(s);
        var o=R.r[key(s)]={};Object.keys(COLS).forEach(function(k){var v=num(r[COLS[k]]);if(v!=null)o[k]=v});hit++});
    }
    savR();renderMs();notify("បាននាំចូលពិន្ទុ "+hit+" នាក់ ពីសន្លឹក «"+pick+"»");
  };r.readAsArrayBuffer(file)})};
  f.click();
};

/* ---------- ⬇️ នាំចេញ Excel · 🖨️ បោះពុម្ព ---------- */
function rowsOut(c){
  var R=rec(c,false),F=R.f||{},X=maxes(c),out=[["ល.រ","ឈ្មោះសិស្ស","ភេទ","សកម្មភាព(ដើម)","តេស្ត១(ដើម)","តេស្ត២(ដើម)","ស្រាវជ្រាវ(ដើម)","សៀវភៅ(ដើម)",
    "សកម្មភាព/"+fmt(X.a),"តេស្ត/"+fmt(X.t),"ស្រាវជ្រាវ/"+fmt(X.h),"សៀវភៅ/"+fmt(X.b),"សរុបសកម្មភាព/"+fmt(X.act),"ប្រឡងបិទ/"+fmt(X.c),"ប្រឡងបើក/"+fmt(X.o),"សរុប/"+fmt(X.T),"និទ្ទេស"]];
  c.st.forEach(function(s,i){var r=(R.r||{})[key(s)]||{},o=calc(c,r,F),v=function(x){return x==null?"":r2(x)};
    out.push([i+1,s.n,s.g||"",v(r.a),v(r.t1),v(r.t2),v(r.h),v(r.b),v(o.a),v(o.t),v(o.h),v(o.b),v(o.act),v(o.c),v(o.o),v(o.tot),o.g])});
  return out;
}
function moTxt(){var p=mM.split("-");return"ខែ"+M[+p[1]-1]+" ឆ្នាំ"+kn(p[0])}
$("msXl").onclick=function(){
  var c=cls();if(!c)return;var A=rowsOut(c);
  loadXL(function(){
    var ws=XLSX.utils.aoa_to_sheet([["ពិន្ទុប្រចាំខែ · ថ្នាក់ "+c.n+" · "+moTxt()+" · "+tn(mT)],[]].concat(A));ws["!cols"]=[{wch:5},{wch:22}].concat(A[0].slice(2).map(function(){return{wch:12}}));
    var wb=XLSX.utils.book_new();XLSX.utils.book_append_sheet(wb,ws,c.n.slice(0,30));XLSX.writeFile(wb,"ពិន្ទុប្រចាំខែ-"+c.n+"-"+mM+".xlsx");
  });
};
$("msPr").onclick=function(){
  var c=cls();if(!c)return;var A=rowsOut(c),I=inf();
  var h="<div class='pg osum msp'><div class=hd><div class=moul>ព្រះរាជាណាចក្រកម្ពុជា</div><div class=moul style='font-size:11pt'>ជាតិ សាសនា ព្រះមហាក្សត្រ</div></div>"+
   "<div class=hl><div style='display:flex;align-items:center;gap:10px'><img src='"+LOGOBT()+"' class=logo style='border-radius:50%' alt=''><div><b>"+esc(I.school)+"</b><br>កម្មវិធីសាលារៀនជំនាន់ថ្មី</div></div><div style='text-align:right'>ឆ្នាំសិក្សា៖ <b>"+esc(I.year)+"</b></div></div>"+
   "<h2 class=moul style='text-align:center;font-size:13pt;margin:4px 0 2px'>តារាងពិន្ទុប្រចាំខែ</h2><p style='text-align:center;margin:0 0 6px'>ថ្នាក់ <b>"+esc(c.n)+"</b> · "+moTxt()+" · គ្រូ៖ <b>"+esc(tn(mT))+"</b></p>"+
   "<table class=ct><thead><tr>"+A[0].map(function(x){return"<th>"+esc(x)+"</th>"}).join("")+"</tr></thead><tbody>"+A.slice(1).map(function(r){return"<tr>"+r.map(function(x,j){return"<td"+(j===1?" style='text-align:left'":"")+">"+esc(x)+"</td>"}).join("")+"</tr>"}).join("")+"</tbody></table>"+
   wpFoot(mT,tn(mT),"គ្រូបង្រៀន")+"</div>";
  window.SCHX.fontsOk().then(function(){doPrint(h)});
};
})();
