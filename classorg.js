/* ========================================================================
   គ្រប់គ្រងថ្នាក់រៀន › រចនាសម្ព័ន្ធថ្នាក់ (គ្រូទីប្រឹក្សា · ប្រធានថ្នាក់ · អនុប្រធាន · ក្រុម)
   ប្រើបញ្ជីសិស្សពី «លទ្ធផលសិក្សា / សិស្ស» · រក្សាទុកក្នុងថ្នាក់ c.org = {n:ចំនួនក្រុម, r:{គន្លឹះសិស្ស:{g:ក្រុម, ro:តួនាទី}}}
   តួនាទី៖ h = ប្រធានថ្នាក់ · v1/v2 = អនុប្រធានទី១/ទី២ · gl = ប្រធានក្រុម
   ======================================================================== */
(function(){
"use strict";
var RO={h:"ប្រធានថ្នាក់",v1:"អនុប្រធានទី១",v2:"អនុប្រធានទី២",gl:"ប្រធានក្រុម"};
var ogT="",ogI=0;
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
    return"<div class=og-av"+(s&&ro?" data-ogph='"+ro+"' title='ចុចដើម្បីដាក់រូប'":"")+">"+(ph?"<img src='"+ph+"' alt=''>":"<span>"+(s?ini(s.n):"?")+"</span>")+"</div>"}
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
  if(!ogT||!data.some(function(t){return t.id===ogT}))ogT=data.some(function(t){return t.id===who.id})?who.id:(data[0]&&data[0].id)||"";
  $("ogT").innerHTML=data.map(function(t){return"<option value='"+esc(t.id)+"'"+(t.id===ogT?" selected":"")+">"+esc(t.name)+"</option>"}).join("");
  var cl=rs.c[ogT]||[],c=cls(),ed=canE();
  $("ogC").innerHTML=cl.length?cl.map(function(x,i){return"<option value="+i+(i===ogI?" selected":"")+">"+esc(x.n)+" ("+x.st.length+" នាក់)</option>"}).join(""):"<option>— មិនទាន់មានថ្នាក់ —</option>";
  var n=c?org(c).n:6;
  $("ogN").innerHTML=[2,3,4,5,6,7,8].map(function(k){return"<option value="+k+(k===n?" selected":"")+">"+kn(k)+" ក្រុម</option>"}).join("");
  ["ogN","ogAuto"].forEach(function(i){$(i).disabled=!ed||!c});
  if(!c){$("ogBody").innerHTML="<p class=note>គ្រូនេះមិនទាន់មានថ្នាក់ទេ។ សូមបង្កើតថ្នាក់ និងបញ្ចូលសិស្សនៅផ្ទាំង «លទ្ធផលសិក្សា» ឬ «សិស្ស និងអវត្តមាន» ជាមុន។</p>";return}
  if(!c.st.length){$("ogBody").innerHTML="<p class=note>ថ្នាក់ «"+esc(c.n)+"» មិនទាន់មានសិស្សទេ។ សូមបញ្ចូលសិស្សជាមុន (អាចនាំចូលពី Excel នៅផ្ទាំង «សិស្ស និងអវត្តមាន»)។</p>";return}
  var gOpt=function(v){var o="<option value=0>—</option>";for(var k=1;k<=n;k++)o+="<option value="+k+(k===v?" selected":"")+">ក្រុមទី"+kn(k)+"</option>";return o};
  var rOpt=function(v){return"<option value=''>—</option>"+Object.keys(RO).map(function(k){return"<option value="+k+(k===v?" selected":"")+">"+RO[k]+"</option>"}).join("")};
  var rows=c.st.map(function(s,i){var r=rOf(c,s);
    return"<tr><td>"+kn(i+1)+"</td><td class=nm>"+esc(s.n)+"</td><td>"+esc(s.g||"")+"</td>"+
      "<td><select data-og='"+i+"|ro' "+(ed?"":"disabled")+">"+rOpt(r.ro||"")+"</select></td>"+
      "<td><select data-og='"+i+"|g' "+(ed?"":"disabled")+">"+gOpt(r.g||0)+"</select></td>"+
      "<td>"+((r.ro==="h"||r.ro==="v1"||r.ro==="v2")&&ed?(c.org.ph&&c.org.ph[key(s)]?"<img class=og-mini src='"+c.org.ph[key(s)]+"' alt=''> <button type=button data-ogph="+r.ro+">ប្ដូរ</button> <button type=button class=danger data-ogdel='"+esc(key(s))+"'>✕</button>":"<button type=button data-ogph="+r.ro+">📷 ដាក់រូប</button>"):"")+"</td></tr>"}).join("");
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
$("ogAuto").onclick=function(){
  var c=cls();if(!c||!canE())return;var o=org(c),n=o.n;
  var has=c.st.some(function(s){return rOf(c,s).g>=1});
  if(has&&!confirm("បែងចែកក្រុមឡើងវិញ? ក្រុម និងប្រធានក្រុមចាស់នឹងត្រូវជំនួស (ប្រធាន/អនុប្រធានថ្នាក់នៅដដែល)។"))return;
  var pool=c.st.filter(function(s){var ro=rOf(c,s).ro;return ro!=="h"&&ro!=="v1"&&ro!=="v2"});
  var m=pool.filter(function(s){return s.g==="ប្រុស"}),f=pool.filter(function(s){return s.g==="ស្រី"}),u=pool.filter(function(s){return s.g!=="ប្រុស"&&s.g!=="ស្រី"});
  var order=[];while(m.length||f.length){if(f.length)order.push(f.shift());if(m.length)order.push(m.shift())}order=order.concat(u);
  c.st.forEach(function(s){var r=o.r[key(s)];if(r){if(r.ro==="gl")r.ro="";if(r.ro!=="h"&&r.ro!=="v1"&&r.ro!=="v2")r.g=0}});
  order.forEach(function(s,i){var k=key(s),r=o.r[k]=o.r[k]||{};r.g=i%n+1;if(i<n)r.ro="gl"});
  savR();renderOrg();notify("បានបែងចែកសិស្ស "+order.length+" នាក់ជា "+n+" ក្រុម");
};
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
$("ogPr").onclick=function(){var c=cls();if(!c){alert("សូមជ្រើសថ្នាក់ជាមុន");return}window.SCHX.fontsOk().then(function(){doPrint(printHTML(c))})};
})();
