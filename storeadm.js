/* ========================================================================
   🗄️ ទំហំផ្ទុក និងការសម្អាត (ផ្ទាំង ⚙️ ការកំណត់)
   - គ្រប់គ្នា៖ ទំហំ localStorage/sessionStorage ក្នុងឧបករណ៍ · 🧹 សម្អាត cache (មិនលុប Login · ការកំណត់ · ចម្លើយមិនទាន់ផ្ញើ)
   - Admin៖ 📊 ចំនួនឯកសារ Firestore តាម collection (getCountFromServer · អានតិច) · 📏 រកឯកសារធំ (ជិត ១ MB)
             🗑️ លុបតេស្តទូទៅដែលបិទ និងចាស់ (+ ចម្លើយ · st · rcpt · រូប · ចម្លើយត្រឹមត្រូវ) · តេស្តភ្ជាប់ពិន្ទុប្រចាំខែ មិនលុប
             🗑️ លុបកំណត់ត្រាអ្នកមើលប្រឡងអនឡាញ (exv) នៃប្រឡងដែលបិទ និងចាស់
   សូម 💾 Backup ជាមុន · ការលុបធ្វើជា batch (≤ ៤៥០ ក្នុងមួយដង)
   ======================================================================== */
(function(){
"use strict";
var COLS=["app","cfg","users","tasks","rs","wr","ah","sched","ts","cx","att","mc","mcp","mclog","lsn","hub","sig","profiles","lib","exrows","obsrows",
  "qb","qbq","qimg","pcls","prt","mt","plc","tests","tkeys","subs","st","rcpt","timg","exams","exm","exq","exv","errs"];
var BIG=["exams","qimg","timg","lsn","mc","profiles","sig","lib","mt","plc","qb","tests","rs","tasks"];
var R={cnt:null,big:null,busy:""};
function F(){return window.FB}
function kb(n){return kn(n<10240?(n/1024).toFixed(1):Math.round(n/1024))+" KB"}
function html(){
  var u=window.LSG?LSG.usage():{local:0,session:0},adm=isAdm();
  var h="<section class=st-s id=stoSec><h3>🗄️ ទំហំផ្ទុក</h3>"+
    "<div class=st-row><b>ឧបករណ៍នេះ</b><span>localStorage <b>"+kb(u.local)+"</b> / ~៥ MB</span><span>sessionStorage <b>"+kb(u.session)+"</b></span>"+
    "<button type=button data-st=stoDev>🧹 សម្អាត cache ក្នុងឧបករណ៍</button></div>"+
    "<p class=note style='margin:4px 0'>Cache (មេរៀនសង្ខេប · វិញ្ញាសា · snapshot) ទាញពី Cloud មកវិញដោយស្វ័យប្រវត្តិ · មិនលុប Login · ការកំណត់ · ចម្លើយមិនទាន់ផ្ញើ</p>";
  if(adm){
    h+="<div class=st-row style='margin-top:8px'><b>Firestore</b><button type=button data-st=stoCnt>📊 រាប់ឯកសារ</button><button type=button data-st=stoBig>📏 រកឯកសារធំ</button></div>"+
      (R.busy?"<p class=note>⏳ "+esc(R.busy)+"</p>":"")+
      (R.cnt?"<div class=sto-grid>"+R.cnt.map(function(x){return"<span"+(x[1]<0?" class=sto-er":"")+"><b>"+esc(x[0])+"</b> "+(x[1]<0?"—":kn(x[1]))+"</span>"}).join("")+"</div>":"")+
      (R.big?"<table class=sto-big><tr><th>ឯកសារ</th><th>ទំហំ</th><th>% នៃ ១ MB</th></tr>"+R.big.map(function(x){var p=Math.round(x[1]/1048576*100);return"<tr"+(p>=70?" class=sto-er":"")+"><td>"+esc(x[0])+"</td><td>"+kb(x[1])+"</td><td>"+kn(p)+"%</td></tr>"}).join("")+"</table>":"")+
      "<div class=st-row style='margin-top:8px'><b>សម្អាត</b><label>តេស្តទូទៅដែលបិទ ចាស់ជាង <input type=number id=stoM min=3 max=60 value=12 style='width:64px'> ខែ</label>"+
      "<button type=button class=danger data-st=stoTests>🗑️ លុបតេស្តចាស់</button><button type=button class=danger data-st=stoExv>🗑️ លុបកំណត់ត្រាអ្នកមើលប្រឡង (> ៣០ ថ្ងៃ)</button></div>"+
      "<p class=note style='margin:4px 0'>⚠️ សូម 💾 Backup ជាមុន · តេស្តដែលភ្ជាប់ «តេស្ត ១/២» ពិន្ទុប្រចាំខែ មិនត្រូវលុបទេ · ប្រព័ន្ធបង្ហាញចំនួនដែលនឹងលុប ឱ្យបញ្ជាក់មុន</p>";
  }
  return h+"</section>";
}
function paint(){var s=document.getElementById("stoSec");if(s){var w=document.createElement("div");w.innerHTML=html();s.replaceWith(w.firstChild)}}
function count(){
  var f=F();if(!f||!f.getCountFromServer){alert("មិនមាន getCountFromServer");return}
  R.busy="កំពុងរាប់…";R.cnt=null;paint();
  Promise.all(COLS.map(function(c){return f.getCountFromServer(f.collection(window.db,c)).then(function(s){return[c,s.data().count]},function(){return[c,-1]})}))
    .then(function(a){a.sort(function(x,y){return y[1]-x[1]});R.cnt=a;R.busy="";paint()});
}
function big(){
  if(!confirm("វាស់ទំហំត្រូវអានឯកសារទាំងអស់ក្នុង "+BIG.length+" collection (ចំណាយកូតាអាន Firestore) ។ បន្ត?"))return;
  var f=F(),out=[];R.busy="កំពុងវាស់…";R.big=null;paint();
  BIG.reduce(function(p,c){return p.then(function(){return f.getDocs(f.collection(window.db,c)).then(function(sn){sn.forEach(function(d){var n=0;try{n=JSON.stringify(d.data()).length}catch(e){}out.push([c+"/"+d.id,n])})},function(e){console.warn("size:",c,e)})})},Promise.resolve())
    .then(function(){out.sort(function(x,y){return y[1]-x[1]});R.big=out.slice(0,12);R.busy="";paint()});
}
function chunks(refs){var f=F(),out=[];for(var i=0;i<refs.length;i+=450)out.push(refs.slice(i,i+450));
  return out.reduce(function(p,part){return p.then(function(){var b=f.writeBatch(window.db);part.forEach(function(r){b.delete(r)});return b.commit()})},Promise.resolve())}
function byT(col,ids){var f=F(),refs=[];return ids.reduce(function(p,id){return p.then(function(){
  return f.getDocs(f.query(f.collection(window.db,col),f.where("t","==",id))).then(function(sn){sn.forEach(function(d){refs.push(d.ref||f.doc(window.db,col,d.id))})},function(e){console.warn("cleanup list:",col,e)})})},Promise.resolve()).then(function(){return refs})}
function oldTests(){
  var f=F(),mo=Math.max(3,+((document.getElementById("stoM")||{}).value)||12),cut=new Date(Date.now()-mo*30.4*864e5).toISOString();
  R.busy="កំពុងស្វែងរកតេស្តចាស់…";paint();
  f.getDocs(f.collection(window.db,"tests")).then(function(sn){
    var ids=[];sn.forEach(function(d){var v=d.data();if(v.open!==true&&(v.kind||"g")==="g"&&(v.cr||"")&&v.cr<cut)ids.push(d.id)});
    if(!ids.length){R.busy="";paint();alert("គ្មានតេស្តទូទៅដែលបិទ និងចាស់ជាង "+mo+" ខែ ទេ");return}
    return Promise.all([byT("subs",ids),byT("st",ids),byT("rcpt",ids),byT("timg",ids)]).then(function(r){
      var n=r.reduce(function(a,x){return a+x.length},0);R.busy="";paint();
      if(!confirm("នឹងលុប៖\n• តេស្ត "+ids.length+" (និងចម្លើយត្រឹមត្រូវ)\n• ចម្លើយសិស្ស "+r[0].length+"\n• កំណត់ត្រាចាប់ផ្ដើម/បង្កាន់ដៃ/រូបភាព "+(r[1].length+r[2].length+r[3].length)+"\n\nការលុបនេះមិនអាចត្រឡប់វិញបានទេ។ បានធ្វើ Backup រួចហើយមែនទេ?"))return;
      R.busy="កំពុងលុប "+(n+ids.length*2)+" ឯកសារ…";paint();
      var refs=[].concat(r[0],r[1],r[2],r[3]);ids.forEach(function(id){refs.push(f.doc(window.db,"tests",id));refs.push(f.doc(window.db,"tkeys",id))});
      return chunks(refs).then(function(){R.busy="";R.cnt=null;paint();notify("បានលុបតេស្តចាស់ "+ids.length+" និងឯកសារពាក់ព័ន្ធ "+n)});
    });
  }).catch(function(e){console.error(e);R.busy="";paint();alert("មិនអាចសម្អាតបានទេ៖ "+(e&&e.code||e))});
}
function oldExv(){
  var f=F(),now=Date.now();R.busy="កំពុងស្វែងរក…";paint();
  f.getDocs(f.collection(window.db,"exm")).then(function(sn){
    var ids=[];sn.forEach(function(d){var v=d.data();if((+v.endMs||0)<now-30*864e5)ids.push(d.id)});   /* ប្រឡងបញ្ចប់ជាង ៣០ ថ្ងៃ */
    return byT("exv",ids).then(function(refs){R.busy="";paint();
      if(!refs.length){alert("គ្មានកំណត់ត្រាអ្នកមើលប្រឡងចាស់ទេ");return}
      if(!confirm("លុបកំណត់ត្រាអ្នកមើលប្រឡងអនឡាញ "+refs.length+" (ប្រឡងដែលបញ្ចប់ជាង ៣០ ថ្ងៃ)?\nវិញ្ញាសា និងលទ្ធផលមិនត្រូវបានប៉ះទេ។"))return;
      return chunks(refs).then(function(){notify("បានលុប "+refs.length+" កំណត់ត្រា")});
    });
  }).catch(function(e){console.error(e);R.busy="";paint();alert("មិនអាចសម្អាតបានទេ៖ "+(e&&e.code||e))});
}
function act(k){
  if(k==="stoDev"){if(!confirm("សម្អាត cache ក្នុងឧបករណ៍នេះ?\n(Login · ការកំណត់ · ចម្លើយមិនទាន់ផ្ញើ មិនត្រូវលុបទេ)"))return;
    var a=0;try{a+=LSG.free(localStorage,"",null)+LSG.free(sessionStorage,"",null)}catch(e){}paint();notify("បានសម្អាត "+kb(a));return}
  if(!isAdm())return;
  if(k==="stoCnt")return count();
  if(k==="stoBig")return big();
  if(k==="stoTests")return oldTests();
  if(k==="stoExv")return oldExv();
}
window.STOADM={html:html,act:act};
})();
