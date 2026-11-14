/* ========================================================================
   គ្រប់គ្រងថ្នាក់រៀន › រចនាសម្ព័ន្ធថ្នាក់ (គ្រូទីប្រឹក្សា · ប្រធានថ្នាក់ · អនុប្រធាន · ក្រុម)
   ប្រើបញ្ជីសិស្សពី «លទ្ធផលសិក្សា / សិស្ស» · រក្សាទុកក្នុងថ្នាក់ c.org = {n:ចំនួនក្រុម, r:{គន្លឹះសិស្ស:{g:ក្រុម, ro:តួនាទី}}}
   តួនាទី៖ h = ប្រធានថ្នាក់ · v1/v2 = អនុប្រធានទី១/ទី២ · gl = ប្រធានក្រុម
   ======================================================================== */
(function(){
"use strict";
var RO={h:"ប្រធានថ្នាក់",v1:"អនុប្រធានទី១",v2:"អនុប្រធានទី២",gl:"ប្រធានក្រុម"};
var ogT="",ogI=0,ogV="org",seatSel=null;
function cls(){var cl=rs.c[ogT]||[];if(ogI>=cl.length)ogI=0;return cl[ogI]}
function key(s){return s.id?"i:"+s.id:"n:"+s.n}
function org(c){c.org=c.org||{n:6,r:{}};c.org.r=c.org.r||{};return c.org}
function canE(){return !!(who&&(isAdm()||who.id===ogT))}
function rOf(c,s){return(c.org&&c.org.r&&c.org.r[key(s)])||{}}
function holder(c,ro){return c.st.filter(function(s){return rOf(c,s).ro===ro})[0]}
function groups(c){
  var n=(c.org&&c.org.n)||6,g=[];for(var i=0;i<n;i++)g.push([]);
  c.st.forEach(function(s){var r=rOf(c,s);if(r.g>=1&&r.g<=n)g[r.g-1].push(s)});
  g.forEach(function(a){a.sort(function(x,y){return(rOf(c,y).ro==="gl")-(rOf(c,x).ro==="gl")})});   /* ប្រធានក្រុមនៅលើគេ */
  return g;
}
function nm(s){return s?s.n:""}
function ini(t){return esc(Array.from(String(t||"?").trim())[0]||"?")}

/* ---------- គំនូសតាង ---------- */
var GH=[230,330,160,28,195,280,100,0];   /* ពណ៌ក្រុម (hue) */
function chart(c){
  var t=teacherOf(ogT),h=holder(c,"h"),v1=holder(c,"v1"),v2=holder(c,"v2"),G=groups(c),n=G.length,tot=c.st.length;
  function av(s,ro){var ph=s&&c.org&&c.org.ph&&c.org.ph[key(s)];
    return"<div class=og-av"+(s&&ro?" data-ogph='"+ro+"' title='ចុចដើម្បីដាក់រូប'":"")+">"+(ph?"<img src='"+safeSrc(ph)+"' alt=''>":"<span>"+(s?ini(s.n):"?")+"</span>")+"</div>"}
  function box(cls2,ico,title,inner,name,sub){
    return"<div class='og-box "+cls2+"'><div class=og-bar><span class=og-ic>"+ico+"</span>"+title+"</div><div class=og-in>"+inner+
      "<div class=og-n>"+(name?esc(name):"<span class=og-dot>……………………</span>")+"</div>"+(sub?"<div class=og-sub>"+sub+"</div>":"")+"</div></div>"}
  var adv="<div class='og-av adv' data-ogph=adv title='ចុចដើម្បីដាក់រូប'>"+avHtml(ogT,t.name,64)+"</div>";
  var gs=G.map(function(a,i){
    var hue=GH[i%GH.length];
    return"<div class=og-g style='--h:"+hue+"'><div class=og-gh><span class=og-gn>"+kn(i+1)+"</span>ក្រុមទី"+kn(i+1)+"<span class=og-gc>"+kn(a.length)+" នាក់</span></div><ol>"+
      (a.length?a.map(function(s){var gl=rOf(c,s).ro==="gl";return"<li"+(gl?" class=gl":"")+"><span class=og-nm>"+esc(s.n)+"</span>"+(gl?"<span class=og-star>★ ប្រធាន</span>":"")+"</li>"}).join(""):"<li class=e>……………………</li>")+"</ol></div>"}).join("");
  var m=c.st.filter(function(s){return s.g==="ប្រុស"}).length,f=c.st.filter(function(s){return s.g==="ស្រី"}).length;
  return"<div class=og>"+
   "<div class=og-r1>"+box("adv","🎓","គ្រូទីប្រឹក្សា",adv,t.name,esc(t.sub||"គណិតវិទ្យា"))+"<div class=og-link><i></i><i></i></div>"+box("head","👑","ប្រធានថ្នាក់",av(h,"h"),nm(h),"ថ្នាក់ "+esc(c.n))+
     "<div class=og-stat><div><b>"+kn(tot)+"</b>សិស្សសរុប</div><div><b>"+kn(f)+"</b>ស្រី</div><div><b>"+kn(m)+"</b>ប្រុស</div><div><b>"+kn(n)+"</b>ក្រុម</div></div></div>"+
   "<div class=og-r2>"+box("vice v1","⭐","អនុប្រធានទី១",av(v1,"v1"),nm(v1),"ទទួលបន្ទុកការសិក្សា")+box("vice v2","⭐","អនុប្រធានទី២",av(v2,"v2"),nm(v2),"ទទួលបន្ទុកវិន័យ និងអនាម័យ")+"</div>"+
   "<div class=og-r3 style='grid-template-columns:repeat("+n+",minmax(0,1fr))'>"+gs+"</div></div>";
}
function printHTML(c){
  var I=inf();
  return"<div class='pg land orgp'><span class='og-cn tl'></span><span class='og-cn tr'></span><span class='og-cn bl'></span><span class='og-cn br'></span>"+
   "<div class=og-hd><img src='"+LOGOBT()+"' class=og-logo alt=''><div class=og-sch><b>"+esc(I.school)+"</b><br>សាលារៀនជំនាន់ថ្មី (NGS)</div>"+
   "<div class=og-ttl><div class=moul>រចនាសម្ព័ន្ធថ្នាក់ "+esc(c.n)+"</div><div class=og-yr>ឆ្នាំសិក្សា "+esc(I.year)+"</div></div></div>"+chart(c)+"</div>";
}

/* ---------- ផ្ទាំងកែ ---------- */
function renderOrg(){
  if(!who)return;
  [].forEach.call($("ogSeg").children,function(b){b.setAttribute("aria-selected",b.dataset.ov===ogV)});
  $("ogOrgCtl").style.display=ogV==="org"?"contents":"none";
  if(!ogT||!data.some(function(t){return t.id===ogT}))ogT=data.some(function(t){return t.id===who.id})?who.id:(data[0]&&data[0].id)||"";
  $("ogT").innerHTML=data.map(function(t){return"<option value='"+esc(t.id)+"'"+(t.id===ogT?" selected":"")+">"+esc(t.name)+"</option>"}).join("");
  var cl=rs.c[ogT]||[],c=cls(),ed=canE();
  $("ogC").innerHTML=cl.length?cl.map(function(x,i){return"<option value="+i+(i===ogI?" selected":"")+">"+esc(x.n)+" ("+x.st.length+" នាក់)</option>"}).join(""):"<option>— មិនទាន់មានថ្នាក់ —</option>";
  var n=c?org(c).n:6;
  $("ogN").innerHTML=[2,3,4,5,6,7,8].map(function(k){return"<option value="+k+(k===n?" selected":"")+">"+kn(k)+" ក្រុម</option>"}).join("");
  ["ogN","ogAuto","ogAbc"].forEach(function(i){$(i).disabled=!ed||!c});
  if(!c){$("ogBody").innerHTML="<p class=note>គ្រូនេះមិនទាន់មានថ្នាក់ទេ។ សូមបង្កើតថ្នាក់ និងបញ្ចូលសិស្សនៅផ្ទាំង «លទ្ធផលសិក្សា» ឬ «សិស្ស និងអវត្តមាន» ជាមុន។</p>";return}
  if(!c.st.length){$("ogBody").innerHTML="<p class=note>ថ្នាក់ «"+esc(c.n)+"» មិនទាន់មានសិស្សទេ។ សូមបញ្ចូលសិស្សជាមុន (អាចនាំចូលពី Excel នៅផ្ទាំង «សិស្ស និងអវត្តមាន»)។</p>";return}
  if(ogV==="seat")return renderSeat(c,ed);
  var gOpt=function(v){var o="<option value=0>—</option>";for(var k=1;k<=n;k++)o+="<option value="+k+(k===v?" selected":"")+">ក្រុមទី"+kn(k)+"</option>";return o};
  var rOpt=function(v){return"<option value=''>—</option>"+Object.keys(RO).map(function(k){return"<option value="+k+(k===v?" selected":"")+">"+RO[k]+"</option>"}).join("")};
  var rows=c.st.map(function(s,i){var r=rOf(c,s);
    return"<tr><td>"+kn(i+1)+"</td><td class=nm>"+esc(s.n)+"</td><td>"+esc(s.g||"")+"</td>"+
      "<td><select data-og='"+i+"|ro' "+(ed?"":"disabled")+">"+rOpt(r.ro||"")+"</select></td>"+
      "<td><select data-og='"+i+"|g' "+(ed?"":"disabled")+">"+gOpt(r.g||0)+"</select></td>"+
      "<td>"+((r.ro==="h"||r.ro==="v1"||r.ro==="v2")&&ed?(c.org.ph&&c.org.ph[key(s)]?"<img class=og-mini src='"+safeSrc(c.org.ph[key(s)])+"' alt=''> <button type=button data-ogph="+r.ro+">ប្ដូរ</button> <button type=button class=danger data-ogdel='"+esc(key(s))+"'>✕</button>":"<button type=button data-ogph="+r.ro+">📷 ដាក់រូប</button>"):"")+"</td></tr>"}).join("");
  var none=c.st.filter(function(s){var r=rOf(c,s);return!(r.g>=1)&&r.ro!=="h"&&r.ro!=="v1"&&r.ro!=="v2"}).length;
  $("ogBody").innerHTML="<div class=og-wrap>"+
   "<div class=og-pv><h3>គំនូសតាង</h3><div class=og-card>"+chart(c)+"</div></div>"+
   "<div class=og-ed><h3>កំណត់តួនាទី និងក្រុម</h3>"+(none?"<p class=note style='margin:0 0 6px'>ℹ️ សិស្ស "+kn(none)+" នាក់មិនទាន់មានក្រុម។ ចុច «⚡ បែងចែកក្រុមស្វ័យប្រវត្តិ» ឬជ្រើសម្ដងម្នាក់ៗ។</p>":"")+
    "<div class=wrap><table class=og-tb><thead><tr><th>ល.រ</th><th>ឈ្មោះសិស្ស</th><th>ភេទ</th><th>តួនាទី</th><th>ក្រុម</th><th>រូប</th></tr></thead><tbody>"+rows+"</tbody></table></div></div>"+"</div>";
}
window.renderOrg=renderOrg;
$("ogT").onchange=function(){ogT=this.value;ogI=0;renderOrg()};
$("ogC").onchange=function(){ogI=+this.value||0;renderOrg()};
$("ogN").onchange=function(){
  var c=cls();if(!c||!canE())return;var o=org(c);o.n=+this.value||6;
  c.st.forEach(function(s){var r=o.r[key(s)];if(r&&r.g>o.n)r.g=0});savR();renderOrg();
};
$("ogBody").onchange=function(e){
  var p=e.target.dataset.og;if(!p)return;var c=cls();if(!c||!canE())return renderOrg();
  var a=p.split("|"),s=c.st[+a[0]];if(!s)return;var o=org(c),k=key(s),r=o.r[k]=o.r[k]||{};
  if(a[1]==="g")r.g=+e.target.value||0;
  else{
    var v=e.target.value;
    if(v==="h"||v==="v1"||v==="v2")c.st.forEach(function(x){var q=o.r[key(x)];if(q&&q!==r&&q.ro===v)q.ro=""});   /* តែម្នាក់គត់ */
    if(v==="gl"){
      if(!r.g){alert("សូមជ្រើសក្រុមឱ្យសិស្សនេះជាមុន");return renderOrg()}
      c.st.forEach(function(x){var q=o.r[key(x)];if(q&&q!==r&&q.ro==="gl"&&q.g===r.g)q.ro=""});   /* ប្រធានក្រុមម្នាក់ក្នុងមួយក្រុម */
    }
    var wasGl=r.ro==="gl"&&r.g,oldG=r.g;
    r.ro=v;
    if(v==="h"||v==="v1"||v==="v2"){   /* ប្រធាន/អនុប្រធានថ្នាក់មិននៅក្នុងក្រុម */
      r.g=0;
      if(wasGl){var nx=c.st.filter(function(x){var q=o.r[key(x)];return q&&q.g===oldG&&q!==r})[0];if(nx)o.r[key(nx)].ro="gl"}
    }
  }
  savR();renderOrg();
};
/* បែងចែកក្រុមស្វ័យប្រវត្តិ៖ សិស្សដែលមិនមែនប្រធាន/អនុប្រធាន ចែកឱ្យស្មើគ្នា (ឆ្លាស់ប្រុស-ស្រី) · ម្នាក់ដំបូងនៃក្រុមជាប្រធានក្រុម */
/* បែងចែកក្រុម៖ abc=false → ឆ្លាស់ស្រី/ប្រុស វិលជុំ · abc=true → តាមអក្ខរក្រម ជាក្រុមជាប់គ្នា (ទំហំស្មើៗ) · សមាជិកទីមួយ = ប្រធានក្រុម */
function autoGroups(abc){
  var c=cls();if(!c||!canE())return;var o=org(c),n=o.n;
  var has=c.st.some(function(s){return rOf(c,s).g>=1});
  if(has&&!confirm((abc?"ចាប់ក្រុមតាមអក្ខរក្រម":"បែងចែកក្រុមឡើងវិញ")+"? ក្រុម និងប្រធានក្រុមចាស់នឹងត្រូវជំនួស (ប្រធាន/អនុប្រធានថ្នាក់នៅដដែល)។"))return;
  var pool=c.st.filter(function(s){var ro=rOf(c,s).ro;return ro!=="h"&&ro!=="v1"&&ro!=="v2"}),order;
  if(abc)order=pool.slice().sort(function(a,b){return String(a.n||"").localeCompare(String(b.n||""),"km")});
  else{var m=pool.filter(function(s){return s.g==="ប្រុស"}),f=pool.filter(function(s){return s.g==="ស្រី"}),u=pool.filter(function(s){return s.g!=="ប្រុស"&&s.g!=="ស្រី"});
    order=[];while(m.length||f.length){if(f.length)order.push(f.shift());if(m.length)order.push(m.shift())}order=order.concat(u)}
  c.st.forEach(function(s){var r=o.r[key(s)];if(r){if(r.ro==="gl")r.ro="";if(r.ro!=="h"&&r.ro!=="v1"&&r.ro!=="v2")r.g=0}});
  var N=order.length,base=Math.floor(N/n),ext=N%n,start=0;
  for(var gi=0;gi<n;gi++){
    var sz=abc?base+(gi<ext?1:0):0;
    if(abc)order.slice(start,start+sz).forEach(function(s,j){var k=key(s),r=o.r[k]=o.r[k]||{};r.g=gi+1;if(!j)r.ro="gl"});
    start+=sz;
  }
  if(!abc)order.forEach(function(s,i){var k=key(s),r=o.r[k]=o.r[k]||{};r.g=i%n+1;if(i<n)r.ro="gl"});
  savR();renderOrg();notify((abc?"បានចាប់ក្រុមតាមអក្ខរក្រម៖ ":"បានបែងចែកសិស្ស ")+N+" នាក់ជា "+n+" ក្រុម");
}
$("ogAuto").onclick=function(){autoGroups(false)};
$("ogAbc").onclick=function(){autoGroups(true)};
/* ដាក់រូប៖ គ្រូទីប្រឹក្សា (= រូបប្រវត្តិរូប) · ប្រធាន/អនុប្រធានថ្នាក់ (រក្សាក្នុងថ្នាក់ c.org.ph · JPEG តូច) */
function pickImg(cb){var f=document.createElement("input");f.type="file";f.accept="image/*";f.onchange=function(){if(f.files[0])cb(f.files[0])};f.click()}
function smallPhoto(file,cb){
  if(!/^image\//.test(file.type)){alert("សូមជ្រើសរើសឯកសាររូបភាព!");return}
  var r=new FileReader();r.onload=function(e){var im=new Image();im.onload=function(){
    var W=im.width,H=im.height,s=Math.min(W,H),x0=(W-s)/2,y0=H>W*1.1?H*.05:(H-s)/2,cv=document.createElement("canvas");cv.width=cv.height=140;
    var g=cv.getContext("2d");g.fillStyle="#fff";g.fillRect(0,0,140,140);g.drawImage(im,x0,y0,s,s,0,0,140,140);cb(cv.toDataURL("image/jpeg",.78))};im.src=e.target.result};r.readAsDataURL(file);
}
function setPhoto(ro){
  var c=cls();if(!c)return;
  if(ro==="adv"){
    if(!(isAdm()||who.id===ogT)){alert("ដាក់រូបបានតែគ្រូខ្លួនឯង ឬ Admin");return}
    return pickImg(function(f){shrinkPhoto(f,function(d){
      var p=Object.assign({o:ogT},profs[ogT]||{},{photo:d,u:new Date().toISOString()});
      window.FB.setDoc(window.FB.doc(window.db,"profiles",ogT),p).then(function(){profs[ogT]=p;renderOrg();notify("បានដាក់រូបគ្រូទីប្រឹក្សា")})
        .catch(function(e){alert(e&&e.code==="permission-denied"?"គ្មានសិទ្ធិរក្សាទុករូបទេ":"មិនអាចរក្សាទុករូបបានទេ")});
    })});
  }
  if(!canE())return;var s=holder(c,ro);if(!s){alert("សូមកំណត់ "+RO[ro]+" ជាមុនសិន");return}
  pickImg(function(f){smallPhoto(f,function(d){var o=org(c);o.ph=o.ph||{};o.ph[key(s)]=d;savR();renderOrg();notify("បានដាក់រូប "+RO[ro])})});
}
$("ogBody").addEventListener("click",function(e){
  var x=e.target.closest("[data-ogdel]");
  if(x){var c=cls();if(!c||!canE())return;var o=org(c);if(o.ph)delete o.ph[x.dataset.ogdel];savR();renderOrg();return}
  var b=e.target.closest("[data-ogph]");if(b)setPhoto(b.dataset.ogph);
});
$("ogPr").onclick=function(){var c=cls();if(!c){alert("សូមជ្រើសថ្នាក់ជាមុន");return}window.SCHX.fontsOk().then(function(){doPrint(ogV==="seat"?seatFit(seatPrint(c)):printHTML(c))})};

/* 🎲 ចាប់ក្រុម 3D & 👆 ដៃរត់ */
function initPickerUI(){
  var m=document.createElement("div");m.className="pk-modal";m.id="pickerModal";m.onclick=function(e){if(e.target===m)closePicker()};
  m.innerHTML=`<div class=pk-box><h2 class=moul>ចាប់ក្រុម 3D</h2><div id=cardContainer></div><div style="margin-top:20px"><button class=primary onclick="startPicker()">ចាប់ផ្តើម</button> <button class=primary onclick="pickPresenter()">👆 រើសក្រុមឡើងបទបង្ហាញ</button> <button onclick="closePicker()">បិទ</button></div></div>`;
  document.body.appendChild(m);
}
function pickPresenter() {
  var cards = [].slice.call(document.querySelectorAll('#cardContainer .card-3d'));
  if (!cards.length) { startPicker(); cards = [].slice.call(document.querySelectorAll('#cardContainer .card-3d')); }
  if (!cards.length) return;
  cards.forEach(function(d){ d.classList.remove("flip"); d.style.outline = ""; });
  animatePointer(cards, function(target) {
    target.classList.add("flip"); target.style.outline = "4px solid var(--accent,#f59e0b)";
    notify("ក្រុមដែលត្រូវឡើងបទបង្ហាញ៖ " + target.querySelector('.card-back').innerText);
  });
}
window.pickPresenter = pickPresenter;
function startPicker(){
  var c=cls(),cc=$("cardContainer");cc.innerHTML="";
  if(!c){cc.innerHTML="<p class=note>សូមជ្រើសថ្នាក់ជាមុន</p>";return}
  var G=groups(c),ix=shuffle(G.map(function(_,i){return i}));
  ix.forEach(function(i){
    var d=document.createElement("div");d.className="card-3d";
    d.innerHTML="<div class=card-inner><div class=card-front>?</div><div class=card-back>ក្រុមទី"+kn(i+1)+"<br><small>"+kn(G[i].length)+" នាក់</small></div></div>";
    d.onclick=function(){d.classList.add("flip")};
    cc.appendChild(d);
  });
}
function closePicker(){$("pickerModal").classList.remove("show")}
function showPicker(){if(!cls()){alert("សូមជ្រើសថ្នាក់ជាមុន");return}startPicker();$("pickerModal").classList.add("show")}
window.startPicker=startPicker;window.closePicker=closePicker;window.showPicker=showPicker;initPickerUI();

/* ប្លង់តុ៖ ស៊ុមខ្លីតាមខ្លឹមសារ · បើវែងជាង ១៦៥ម.ម (ជួរច្រើន) → បង្រួមខ្លឹមសារឱ្យនៅក្នុងទំព័រតែមួយ (មិនកាត់ចោល) */
function seatFit(html){
  var p=$("prt");p.innerHTML=html;p.style.cssText="display:block;position:absolute;left:-10000px;top:0;width:281mm";
  var pg=p.querySelector(".seatp"),ruler=document.createElement("div");ruler.style.height="165mm";p.appendChild(ruler);
  var Hmax=ruler.offsetHeight;ruler.remove();
  if(pg&&pg.offsetHeight>Hmax){
    pg.classList.add("fixh");
    var inner=document.createElement("div");inner.className="fit";while(pg.firstChild)inner.appendChild(pg.firstChild);pg.appendChild(inner);
    var cs=getComputedStyle(pg),H=pg.clientHeight-parseFloat(cs.paddingTop)-parseFloat(cs.paddingBottom),z=1;
    inner.style.transformOrigin="0 0";
    for(var i=0;i<6;i++){inner.style.width=(100/z)+"%";inner.style.transform="scale("+z+")";var h=inner.offsetHeight;if(h*z<=H+0.5)break;var nz=Math.max(0.4,Math.min(1,H/h));if(Math.abs(nz-z)<0.003)break;z=nz}
    inner.style.transform="scale("+(z*0.99)+")";
  }
  var out=p.innerHTML;p.style.cssText="";p.innerHTML="";return out;
}
$("ogSeg").onclick=function(e){var b=e.target.closest("button[data-ov]");if(b){ogV=b.dataset.ov;seatSel=null;renderOrg()}};

/* ===================== 🪑 ប្លង់តុ =====================
   d2 = តុ ២ នាក់ · ៤ ជួរឈរ × ៦ ជួរដេក (៤៨ កៅអី) · d1 = តុ ១ នាក់ · ៦ × ៦ (៣៦ កៅអី)
   តុគ្រូនៅខាងលើឆ្វេងជានិច្ច · c.seat = {lay, s:[គន្លឹះសិស្សតាមលេខកៅអី]} */
var seatAnim=false;
var LAY={d2:{cols:4,rows:6,per:2,lbl:"តុ ២ នាក់ (៤ × ៦)"},d1:{cols:6,rows:6,per:1,lbl:"តុ ១ នាក់ (៦ × ៦)"}};
function seat(c){c.seat=c.seat||{lay:"d2",s:[]};if(!LAY[c.seat.lay])c.seat.lay="d2";if(!Array.isArray(c.seat.s))c.seat.s=[];if(!c.seat.abMap||typeof c.seat.abMap!=="object")c.seat.abMap={};return c.seat}
/* វិញ្ញាសា ក/ខ តាមកៅអី៖ ក្ដារអុក (អ្នកជិតគ្នា ទាំងឆ្វេង-ស្ដាំ និងមុខ-ក្រោយ ទទួលវិញ្ញាសាខុសគ្នា) */
function abOf(L,i){var w=L.cols*L.per;return(Math.floor(i/w)+i%w)%2?"ខ":"ក"}
function syncAB(S){var L=LAY[S.lay],m={};S.s.forEach(function(k,i){if(k)m[k]=abOf(L,i)});S.abMap=m;return S}
function nSeats(L){return L.cols*L.rows*L.per}
function byKey(c){var o={};c.st.forEach(function(s){o[key(s)]=s});return o}
function cleanSeat(c){   /* ដកសិស្សដែលលែងមាន ឬស្ទួន */
  var S=seat(c),m=byKey(c),seen={},N=nSeats(LAY[S.lay]);
  S.s=S.s.slice(0,N).map(function(k){if(!k||!m[k]||seen[k])return"";seen[k]=1;return k});
  while(S.s.length<N)S.s.push("");return syncAB(S);
}
function fillSeats(c,order){var S=seat(c),N=nSeats(LAY[S.lay]);S.s=[];for(var i=0;i<N;i++)S.s.push(order[i]?key(order[i]):"")}
function seatGrid(c,edit,anim){
  var S=cleanSeat(c),L=LAY[S.lay],m=byKey(c),h="",i=0,rn=0;
  /* លាក់តុទំនេរទាំងស្រុង · បង្ហាញវិញពេលកំពុងជ្រើសសិស្សដែលមិនទាន់មានកៅអី (ដើម្បីដាក់) ឬមិនទាន់រៀប */
  var showEmpty=(edit&&seatSel&&seatSel.t==="f")||!S.s.some(Boolean);
  for(var r=0;r<L.rows;r++){
    var row="",nd=0;
    for(var col=0;col<L.cols;col++){
      var d="",any=false;
      for(var k=0;k<L.per;k++,i++){
        var s=m[S.s[i]],sel=edit&&seatSel&&seatSel.t==="s"&&seatSel.i===i,ph=s&&c.org&&c.org.ph&&c.org.ph[key(s)],ro=s&&rOf(c,s).ro;if(s)any=true;
        var badge=ro==="h"?"<em class=sb-h title='ប្រធានថ្នាក់'>👑</em>":ro==="v1"||ro==="v2"?"<em class=sb-v title='អនុប្រធាន'>⭐</em>":ro==="gl"?"<em class=sb-g title='ប្រធានក្រុម'>★</em>":"";
        var pa=s&&S.abMap[key(s)],ab=pa?"<em class='sb-ab "+(pa==="ខ"?"b":"a")+"' title='វិញ្ញាសា "+pa+"'>"+pa+"</em>":"";
        d+="<div class='seat"+(s?(s.g==="ស្រី"?" f":s.g==="ប្រុស"?" m":" u"):" empty")+(sel?" sel":"")+"'"+(edit?" data-seat="+i:"")+(anim&&s?" style='animation-delay:"+(i*18)+"ms'":"")+">"+
          "<span class=sn>"+kn(i+1)+"</span>"+badge+ab+
          (s?"<span class=sav>"+(ph?"<img src='"+safeSrc(ph)+"' alt=''>":ini(s.n))+"</span><b>"+esc(s.n)+"</b>":"<span class='sav e'>＋</span><i>ទំនេរ</i>")+"</div>";
      }
      if(!any&&!showEmpty)continue;
      row+="<div class='desk p"+L.per+"'><div class=desk-top>"+d+"</div><div class=desk-legs></div></div>";nd++;
    }
    if(!nd)continue;
    rn++;h+="<div class=st-line><div class=st-rl>ជួរ<b>"+kn(rn)+"</b></div><div class=st-row2 style='--cols:"+L.cols+"'>"+row+"</div></div>";   /* ជួរខ្វះតុ → នៅកណ្ដាល */
  }
  var t=teacherOf(ogT);
  return"<div class='room"+(anim?" anim":"")+"'><div class=room-front>"+
    "<div class=tdesk><span class=t-av>"+avHtml(ogT,t.name,40)+"</span><span><b>តុគ្រូ</b><small>"+esc(t.name||"")+"</small></span></div>"+
    "<div class=board><span class=chalk>ក្ដារខៀន</span><span class=tray></span></div>"+
    "<div class=door><span>🚪</span>ទ្វារ</div></div>"+
    "<div class=room-seats>"+h+"</div><div class=room-back>ខាងក្រោយថ្នាក់</div></div>";
}
function renderSeat(c,ed){
  var S=cleanSeat(c),L=LAY[S.lay],N=nSeats(L),placed={};S.s.forEach(function(k){if(k)placed[k]=1});
  var free=c.st.filter(function(s){return!placed[key(s)]});
  var over=c.st.length>N;
  $("ogBody").innerHTML="<div class=bar style='margin-top:4px'>"+
    "<label>ប្លង់៖</label><select id=seLay "+(ed?"":"disabled")+">"+Object.keys(LAY).map(function(k){return"<option value="+k+(k===S.lay?" selected":"")+">"+LAY[k].lbl+"</option>"}).join("")+"</select>"+
    (ed?"<button type=button data-sa=rand>🎲 ចៃដន្យ</button><button type=button data-sa=mix>🎲 ចៃដន្យ (ឆ្លាស់ប្រុស-ស្រី)</button><button type=button data-sa=abc>🔤 តាមអក្ខរក្រម</button><button type=button class=danger data-sa=clr>សម្អាត</button>":"")+
    "<button type=button onclick='showPicker()'>🎲 ចាប់ក្រុម 3D</button><button type=button class=primary onclick='pickSeatPresenter()'>👆 ចាប់រើសតុ/សិស្ស</button>"+
    "</div>"+
    (over?"<p class=cxwarn>⚠️ សិស្ស "+kn(c.st.length)+" នាក់ ច្រើនជាងកៅអី "+kn(N)+"។ សូមជ្រើសប្លង់តុ ២ នាក់។</p>":"")+
    (ed?"<p class=note style='margin:0 0 8px'>✋ <b>រៀបដោយដៃ</b>៖ ចុចលើសិស្សក្នុងបញ្ជីខាងក្រោម (ឬលើកៅអី) រួចចុចកៅអីដែលចង់ដាក់ — បើកៅអីនោះមានសិស្ស នឹងប្ដូរកន្លែងគ្នា។ ចុចកៅអីដដែលពីរដង ដើម្បីដកសិស្សចេញ។</p>":"")+
    "<div class='og-card room-card'>"+seatGrid(c,ed,seatAnim)+"</div>"+
    "<div class=st-free><b>មិនទាន់មានកៅអី ("+kn(free.length)+")៖</b> "+(free.length?free.map(function(s){var sel=seatSel&&seatSel.t==="f"&&seatSel.k===key(s);return"<button type=button class='chip"+(sel?" sel":"")+(s.g==="ស្រី"?" f":"")+"'"+(ed?" data-free='"+esc(key(s))+"'":" disabled")+">"+esc(s.n)+"</button>"}).join(""):"<span class=note style='margin:0'>✅ គ្រប់គ្នាមានកៅអីហើយ</span>")+"</div>"+
    "<div class=st-legend><span class=lgi><b>"+kn(c.st.length)+"</b>សិស្ស</span><span class=lgi><b>"+kn(N)+"</b>កៅអី</span><span class=lgi><b>"+kn(Math.max(0,N-c.st.length))+"</b>ទំនេរ</span>"+
     "<span class='lgc f'>ស្រី</span><span class='lgc m'>ប្រុស</span><span class=lgc>👑 ប្រធាន</span><span class=lgc>⭐ អនុប្រធាន</span><span class=lgc>★ ប្រធានក្រុម</span></div>";
}
function kmSort(a,b){return String(a.n).localeCompare(String(b.n),"km")}
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t}return a}
$("ogBody").addEventListener("change",function(e){
  if(e.target.id!=="seLay")return;var c=cls();if(!c||!canE())return;
  var S=seat(c),order=S.s.map(function(k){return byKey(c)[k]}).filter(Boolean);
  S.lay=e.target.value;fillSeats(c,order);cleanSeat(c);savR();renderOrg();
});
$("ogBody").addEventListener("click",function(e){
  if(ogV!=="seat")return;var c=cls();if(!c||!canE())return;
  var a=e.target.closest("[data-sa]");
  if(a){
    var k=a.dataset.sa,S=seat(c),has=S.s.some(Boolean);
    if(k==="clr"){if(has&&confirm("សម្អាតកៅអីទាំងអស់?")){S.s=[];S.abMap={};savR();renderOrg()}return}
    if(has&&!confirm("រៀបកៅអីឡើងវិញ? ការរៀបចាស់នឹងត្រូវជំនួស។"))return;
    var st=c.st.slice();
    if(k==="abc")st.sort(kmSort);
    else if(k==="rand")st=shuffle(st);
    else{var f=shuffle(st.filter(function(s){return s.g==="ស្រី"})),m=shuffle(st.filter(function(s){return s.g!=="ស្រី"}));st=[];while(f.length||m.length){if(m.length)st.push(m.shift());if(f.length)st.push(f.shift())}}
    fillSeats(c,st);cleanSeat(c);seatSel=null;
    savR();seatAnim=true;renderOrg();seatAnim=false;notify(k==="abc"?"បានរៀបតាមអក្ខរក្រម":"បានរៀបដោយចៃដន្យ");return;
  }
  var fr=e.target.closest("[data-free]");
  if(fr){var fk=fr.getAttribute("data-free");seatSel=(seatSel&&seatSel.k===fk)?null:{t:"f",k:fk};renderOrg();return}
  var se=e.target.closest("[data-seat]");if(!se)return;
  var i=+se.dataset.seat,S2=cleanSeat(c);
  if(!seatSel){if(S2.s[i]){seatSel={t:"s",i:i};renderOrg()}return}
  if(seatSel.t==="s"){
    if(seatSel.i===i){S2.s[i]=""}else{var tmp=S2.s[i];S2.s[i]=S2.s[seatSel.i];S2.s[seatSel.i]=tmp}
  }else{
    var old=S2.s[i];S2.s[i]=seatSel.k;   /* សិស្សចាស់នៃកៅអីនោះ → ត្រឡប់ទៅបញ្ជីមិនទាន់មានកៅអី */
  }
  syncAB(S2);   /* អាប់ដេតវិញ្ញាសា ក/ខ ពេលផ្លាស់ប្តូរកៅអី */
  seatSel=null;savR();renderOrg();
});
function seatPrint(c){
  var I=inf(),S=cleanSeat(c);
  return"<div class='pg land orgp seatp'><span class='og-cn tl'></span><span class='og-cn tr'></span><span class='og-cn bl'></span><span class='og-cn br'></span>"+
   "<div class=og-hd><img src='"+LOGOBT()+"' class=og-logo alt=''><div class=og-sch><b>"+esc(I.school)+"</b><br>សាលារៀនជំនាន់ថ្មី (NGS)</div>"+
   "<div class=og-ttl><div class=moul>ប្លង់តុ ថ្នាក់ "+esc(c.n)+"</div><div class=og-yr>ឆ្នាំសិក្សា "+esc(I.year)+" · "+LAY[S.lay].lbl+"</div></div></div>"+seatGrid(c,false)+"</div>";
}
  /* 👆 ចាប់រើសតុ/សិស្ស · ម្នាក់ៗមិនត្រូវចាប់ម្ដងទៀត រហូតដល់គ្រប់គ្នាត្រូវបានចាប់ (ប្ដូរថ្នាក់ → ចាប់ផ្ដើមថ្មី) */
  var spotDone = {}, spotCls = "";
  function seatName(el) { var b = el.querySelector('b'); return b ? b.innerText.trim() : ""; }
  function pickSeatPresenter() {
    var all = [].slice.call(document.querySelectorAll('#ogBody .seat:not(.empty)'));
    if (!all.length) { notify("មិនទាន់មានសិស្សអង្គុយលើតុទេ"); return; }
    var c = cls(), ck = ogT + "|" + (c ? c.n : ""); if (ck !== spotCls) { spotCls = ck; spotDone = {}; }
    var left = all.filter(function(el){ return !spotDone[seatName(el)]; });
    if (!left.length) { spotDone = {}; left = all; notify("គ្រប់គ្នាត្រូវបានចាប់រួចហើយ · ចាប់ផ្ដើមជុំថ្មី"); }
    animatePointer(left, function(target) {
      spotDone[seatName(target)] = 1;
      showSpotlight(target, left.length - 1);
    });
  }
  window.pickSeatPresenter = pickSeatPresenter;

  /* 👆 ដៃរត់ & សំឡេង & Confetti */
	var audioCtx = null;
	function tone(f, dur, vol) {
		try {
		var AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
		if (!audioCtx) audioCtx = new AC();
		if (audioCtx.state === "suspended") audioCtx.resume();
		var osc = audioCtx.createOscillator(), gain = audioCtx.createGain(), t = audioCtx.currentTime;
		osc.connect(gain); gain.connect(audioCtx.destination);
		osc.frequency.value = f; gain.gain.setValueAtTime(vol, t); gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
		osc.start(t); osc.stop(t + dur);
		} catch (e) {}
	}
	function playTick() { tone(880, 0.05, 0.1); }
	function playWin() { tone(660, 0.12, 0.14); setTimeout(function(){ tone(990, 0.25, 0.14); }, 110); }
	function fireConfetti() {
		for (var i = 0; i < 50; i++) {
			(function (c) {
				c.className = "confetti";
				c.style.left = Math.random() * 100 + "%"; c.style.backgroundColor = 'hsl(' + Math.random() * 360 + ', 70%, 60%)';
				c.style.animationDelay = Math.random() * .3 + "s"; c.style.transform = "rotate(" + Math.random() * 360 + "deg)";
				document.body.appendChild(c);
				setTimeout(function() { c.remove() }, 1600);
			})(document.createElement("div"));
		}
	}
	/* 🌟 Spotlight ៖ កាតកណ្ដាលអេក្រង់ ឈ្មោះធំច្បាស់ (អានពី DOM នៃកៅអី → ប្រើបានទាំងអ្នកកែ និងអ្នកមើល) */
	function showSpotlight(seatEl, remaining) {
		closeSpotlight();
		var name = seatName(seatEl), img = seatEl.querySelector('.sav img'), sn = seatEl.querySelector('.sn'),
			ab = seatEl.querySelector('.sb-ab'), role = seatEl.querySelector('em.sb-h,em.sb-v,em.sb-g'),
			sex = seatEl.classList.contains('f') ? 'f' : seatEl.classList.contains('m') ? 'm' : '';
		var meta = [];
		if (sn) meta.push("<span class=spot-chip>🪑 កៅអីលេខ " + esc(sn.textContent) + "</span>");
		if (ab) meta.push("<span class='spot-chip sb-ab " + (ab.classList.contains('b') ? 'b' : 'a') + "'>វិញ្ញាសា " + esc(ab.textContent) + "</span>");
		if (role) meta.push("<span class=spot-chip>" + esc(role.textContent) + " " + esc(role.title || "") + "</span>");
		var o = document.createElement("div");
		o.className = "spot"; o.id = "spotlight"; o.setAttribute("role", "dialog"); o.setAttribute("aria-modal", "true"); o.setAttribute("aria-label", "សិស្សដែលត្រូវបានជ្រើស ៖ " + name);
		o.innerHTML = "<div class='spot-card " + sex + "'>" +
			"<div class=spot-k>🎉 សិស្សដែលត្រូវបានជ្រើស</div>" +
			"<div class=spot-av>" + (img ? "<img src='" + img.getAttribute("src") + "' alt=''>" : "<span>" + ini(name) + "</span>") + "</div>" +
			"<div class=spot-name>" + esc(name) + "</div>" +
			(meta.length ? "<div class=spot-meta>" + meta.join("") + "</div>" : "") +
			"<div class=spot-act><button type=button data-sp=again>🔄 ចាប់ម្ដងទៀត" + (remaining > 0 ? " <small>(នៅសល់ " + kn(remaining) + " នាក់)</small>" : "") + "</button>" +
			"<button type=button class=primary data-sp=close>✓ បិទ</button></div></div>";
		o.addEventListener("click", function(e) {
			var b = e.target.closest("[data-sp]");
			if (b && b.dataset.sp === "again") { closeSpotlight(); setTimeout(pickSeatPresenter, 150); return; }
			if (b || e.target === o) closeSpotlight();
		});
		spotPrevFocus = document.activeElement;
		document.body.appendChild(o);
		var cb = o.querySelector("[data-sp=close]"); if (cb) cb.focus({ preventScroll: true });
	}
	var spotPrevFocus = null;
	function closeSpotlight() {
		var o = document.getElementById("spotlight"); if (!o) return;
		o.remove();
		if (spotPrevFocus && spotPrevFocus.focus) try { spotPrevFocus.focus({ preventScroll: true }); } catch (e) {}
		spotPrevFocus = null;
	}
	document.addEventListener("keydown", function(e) { if (e.key === "Escape" && document.getElementById("spotlight")) closeSpotlight(); });
	/* ដៃលោត ~១២ ជំហាន (≈១.៦ វិនាទី · លឿនពីដំបូង ហើយយឺតបន្តិចពេលជិតឈប់) រួចឈប់ចំគោលដៅដែលបានរើសជាមុន */
	var pointerBusy = false;
	function animatePointer(targets, onFinish) {
		if (pointerBusy || !targets.length) return; pointerBusy = true;
		targets.forEach(function(el){ el.style.outline = ""; el.classList.remove("pick-hit"); });
		var win = targets[Math.floor(Math.random() * targets.length)];
		win.scrollIntoView({ block: "nearest", behavior: "smooth" });
		var STEPS = 12, path = [], prev = null;
		for (var k = 0; k < STEPS - 1; k++) {   /* លោតចៃដន្យ មិនជាន់កន្លែងដដែលពីរដងជាប់ */
			var t; do { t = targets[Math.floor(Math.random() * targets.length)]; } while (targets.length > 1 && (t === prev || (k === STEPS - 2 && t === win)));
			path.push(prev = t);
		}
		path.push(win);
		var hand = document.createElement("div"); hand.className = "hand-pointer"; hand.textContent = "👆";
		document.body.appendChild(hand);
		var i = 0;
		function tick() {
			var el = path[i], rect = el.getBoundingClientRect();
			hand.style.left = (rect.left + rect.width / 2) + "px";
			hand.style.top = (rect.top + rect.height * 0.55) + "px";
			if (prev && prev !== el) prev.classList.remove("pick-on"); el.classList.add("pick-on"); prev = el;
			var last = i === path.length - 1;
			if (!last) { playTick(); var p = i / (STEPS - 1); i++; setTimeout(tick, 100 + 365 * p * p); return; }   /* យឺតជាងមុន ~៤០% (សរុប ~២.២ វិនាទី) */
			/* ឈប់៖ សំឡេងឈ្នះ + confetti + បង្ហាញឈ្មោះភ្លាមៗ */
			el.classList.remove("pick-on"); el.classList.add("pick-hit"); el.style.outline = "4px solid var(--accent,#f59e0b)";
			playWin(); fireConfetti(); onFinish(el);
			pointerBusy = false; setTimeout(function() { hand.remove(); }, 900);   /* ដោះសោភ្លាម → «🔄 ចាប់ម្ដងទៀត» ដំណើរការបានភ្លាម */
		}
		prev = null; tick();
	}
	window.animatePointer = animatePointer;
})();

