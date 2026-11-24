/* ========================================================================
   🏁 ម៉ូដប្រឡង ៦ កម្រិត (កម្រិត ១–៥ + 🌐 PISA) — ស្នូលទិន្នន័យ (ជំហាន ១ · គ្មាន UI)
   ប្រើ PRACT.GR[g].G[l][v]() និង PRACT.check() ដែលមានស្រាប់ · client-only (ពានរង្វាន់ទទួលស្គាល់)
   - build(g,l)  → {v:1,g,l,secs:[{v,qs:[៤ សំណួរ]}×៦]} តាមលំដាប់ LVO (គ្មានការហៅ open()/location.hash)
   - pack/unpack → JSON សម្រាប់ localStorage (សំណួរចៃដន្យ មិនអាចបង្កើតឡើងវិញពី seed បាន ដូច្នេះរក្សាសំណួរទាំងមូល)
   - need(total) → ចំនួនត្រូវតិចបំផុតដើម្បីជាប់ (≥ ៨០%) · ២៤ សំណួរ → ២០
   ជំហាន ២ — State ក្នុង localStorage (key pex_{g}_{l}[_{scope}]) តាម LSG.set (ពេញ → សម្អាត cache ដែលទាញមកវិញបាន)
   - start/load/save/setAns/submitSec/finish/cancel/sweep · ផុតកំណត់ ១២ ម៉ោងពី startAt · ម៉ោងជា wall-clock (Date.now)
   - key pex_* មិនត្រូវនឹង FREE/IDK/STK របស់ lsguard.js ដូច្នេះមិនត្រូវសម្អាតដោយ LSG.free/sweep
   ជំហាន ៣ — ម៉ោង៖ PEX_T (ដាច់ពី SOLT ក្នុង practice.js) · ម៉ោងគណនាពី startAt/secStart ជា wall-clock (មិនពឹង setInterval)
   - tick(st,now)៖ វគ្គដែលអស់ម៉ោង → បញ្ជូនស្វ័យប្រវត្តិ (ចម្លើយទទេ = ខុស · ចាក់សោ · at = ម៉ោងកំណត់ពិត ដូច្នេះវគ្គបន្ទាប់រាប់ពីនោះ ទោះបិទ tab យូរ)
   - st.dl = ex.t (ម៉ោងបិទប្រឡងដោយគ្រូ · ms) បើមាន៖ ដល់ម៉ោងនេះ វគ្គដែលនៅសល់ទាំងអស់ត្រូវបានបញ្ជូន
   - watch(st,cb)៖ setInterval ១ វិនាទី + visibilitychange/pageshow → tick ភ្លាម · ម៉ោងមិនអាចថយក្រោយ (st.seen)
   ជំហាន ៤ — UI (PEXAM.ui.mount) ដាច់ដោយឡែកពី draw() របស់ practice.js · attribute data-px / data-px-q / data-px-p (មិនប្រើ data-q/data-v/data-a)
   ជំហាន ៥ — grade(st) · អេក្រង់លទ្ធផល · result record pexr_{g}_{l}[_{scope}] (តូច · គ្មានសំណួរ/ចម្លើយ · ១២ ម៉ោង) · 📚 ត្រឡប់ទៅរៀន (PRACT.X.open) · 🔁 សាកម្ដងទៀត
   ជំហាន ៦ — វិញ្ញាបនបត្រ (≥ ៨០%)៖ A4 ផ្តេក HTML/CSS · ១០០% = បែបបទមាស · ស្លាក «ពានរង្វាន់ទទួលស្គាល់ · លើកទឹកចិត្ត» + «(សិស្សក្រៅបញ្ជី · មិនបានផ្ទៀងផ្ទាត់)»
     បោះពុម្ពតាម window.print() + @page (បញ្ចូលតែពេលបើកវិញ្ញាបនបត្រ) · ឈ្មោះតាម esc() · គ្មាន CSP/rules ថ្មី
   - គ្មាន ✅/❌ · គ្មានដំណោះស្រាយ · គ្មាន «លំហាត់ថ្មី» · គ្មានប៊ូតុងកម្រិត · មិនគូរ HUB · beforeunload · ការពារ Back/hash
   ======================================================================== */
(function(){
"use strict";
var NQ=4,PASS=.8,FIGMAX=30000,EXPIRE=12*36e5,PFX="pex_";
/* ⏱ PEX_T៖ វិនាទី/សំណួរ តាមកម្រិត (ដាច់ពី SOLT = ទ្វារដំណោះស្រាយ) · ថ្នាក់ ≤ ៩ ×១ · ថ្នាក់ ១០–១២ ×៤/៣ · ១ វគ្គ = NQ សំណួរ
   ថ្នាក់ ៩៖ ៦ · ៩ · ១២ · ១៥ · ១៨ · ១៨ នាទី = ៧៨ នាទី */
var PEX_T={1:90,5:135,2:180,6:225,3:270,4:270};
function ord(){return window.PRACT&&PRACT.X?PRACT.X.LVO:[1,5,2,6,3,4]}
/* គន្លឹះទម្រង់ដូចគ្នា (kd) ឬអត្ថបទដោយគ្មានគណិត — ដូច open() ក្នុង practice.js */
function shape(q){return q.kd?"kd:"+q.kd:String(q.q).replace(/\$[^$]*\$/g,"").slice(0,24)}
/* បង្កើតវគ្គមួយ៖ ៤ សំណួរ · ជៀសអត្ថបទដដែល (ទូទាំងប្រឡង) និងទម្រង់ដដែល (ក្នុងវគ្គ · បន្ធូរបន្ទាប់ពី ៤០ ដង)
   ជុំទី ១ ចៀស fig ធំ (> FIGMAX) ដើម្បីកុំឱ្យ localStorage ធ្ងន់ · បើនៅខ្វះ ជុំទី ២ (កំណត់ ៦០ ដង) ទទួល fig ធំ · មិនប៉ះ generator */
function sec(gen,seenQ){
  var out=[],kind={};
  function pass(max,lim){
    for(var tries=0;out.length<NQ&&tries<max;tries++){
      var q=gen();
      if(!q||!q.q||!q.a||!q.a.length)continue;
      var t=shape(q);
      if(seenQ[q.q])continue;
      if(lim&&q.fig&&String(q.fig).length>FIGMAX)continue;
      if(kind[t]>=(tries<max/3?1:2)&&tries<max*.83)continue;
      seenQ[q.q]=1;kind[t]=(kind[t]||0)+1;out.push(q)
    }
  }
  pass(200,true);
  if(out.length<NQ)pass(60,false);
  return out;
}
/* ក្លូនសំណួរទៅជាទិន្នន័យសុទ្ធ (JSON) + វាលសម្រាប់ UI ក្រោយ (u = ចម្លើយសិស្ស) */
function clean(q){
  var c=JSON.parse(JSON.stringify({q:q.q,a:q.a.map(function(a){return{v:a.v,t:a.t,k:a.k,l:a.l}}),s:q.s==null?"":q.s,fig:q.fig==null?"":q.fig,kd:q.kd||""}));
  return c;
}
function build(g,l){
  var GR=PRACT.GR[g];if(!GR||!GR.G[l])throw new Error("pexam: no lesson "+g+"/"+l);
  var G=GR.G[l],seenQ={},secs=[];
  ord().forEach(function(v){
    if(!G[v])throw new Error("pexam: lesson "+g+"/"+l+" lacks level "+v);
    var qs=sec(G[v],seenQ);
    if(qs.length<NQ)throw new Error("pexam: level "+v+" gave "+qs.length+" questions");
    secs.push({v:v,qs:qs.map(clean)})
  });
  return{v:1,g:+g,l:+l,secs:secs};
}
function total(P){return P.secs.reduce(function(n,s){return n+s.qs.length},0)}
function ppOf(p){p=+p;return isFinite(p)&&p>=.5&&p<=1?p:PASS}                           /* ពិន្ទុគោលជាប់ (ប្រភាគ) · ក្រៅ ៥០–១០០% → ៨០% */
function need(n,p){return Math.ceil(ppOf(p)*n-1e-9)}
function pack(P){return JSON.stringify(P)}
function valid(P){
  if(!P||P.v!==1||!Array.isArray(P.secs)||P.secs.length!==ord().length)return false;
  for(var i=0;i<P.secs.length;i++){var S=P.secs[i];if(!S||!Array.isArray(S.qs)||!S.qs.length)return false;
    for(var j=0;j<S.qs.length;j++){var q=S.qs[j];if(!q||typeof q.q!=="string"||!Array.isArray(q.a)||!q.a.length)return false}}
  return true;
}
function unpack(s){try{var P=JSON.parse(s);return valid(P)?P:null}catch(e){return null}}

/* ================= State ក្នុង localStorage ================= */
function ls(){try{return localStorage}catch(e){return null}}
function key(g,l,sc){return PFX+g+"_"+l+(sc?"_"+String(sc).replace(/[^A-Za-z0-9-]/g,""):"")}
function del(k){var st=ls();if(st)try{st.removeItem(k)}catch(e){}}
function okState(st){
  return !!(st&&st.v===1&&valid(st.P)&&typeof st.startAt==="number"&&typeof st.secStart==="number"&&
    typeof st.sec==="number"&&st.sec>=0&&st.sec<=st.P.secs.length&&Array.isArray(st.done)&&st.done.length===st.P.secs.length&&
    st.ans&&typeof st.ans==="object"&&!Array.isArray(st.ans));
}
function expired(st,now){return now-st.startAt>EXPIRE}
/* លុប pex_* ដែលផុតកំណត់ ឬខូច (មិនប៉ះ key ផ្សេង) · ត្រឡប់ចំនួនដែលលុប */
function sweep(now){
  var st=ls(),n=0;if(!st)return 0;now=now==null?Date.now():now;
  var ks=window.LSG?LSG.keys(st):[];if(!ks.length)try{for(var i=0;i<st.length;i++)ks.push(st.key(i))}catch(e){}
  ks.forEach(function(k){
    if(k.indexOf(PFX)===0){var o=null;try{o=JSON.parse(st.getItem(k))}catch(e){}
      if(!okState(o)||expired(o,now)){del(k);n++}}
    else if(k.indexOf("pexr_")===0){var r=null;try{r=JSON.parse(st.getItem(k))}catch(e){}
      if(!okRes(r)||now-r.at>EXPIRE){del(k);n++}}});
  return n;
}
function save(st){
  var s=ls();if(!s)return false;
  var v;try{v=JSON.stringify(st)}catch(e){return false}
  var k=key(st.g,st.l,st.sc);
  return window.LSG?LSG.set(s,k,v):(function(){try{s.setItem(k,v);return true}catch(e){return false}})();
}
/* បន្តពី localStorage (refresh/បិទផ្ទាំង) · ផុតកំណត់ ឬខូច → លុប ហើយត្រឡប់ null */
function load(g,l,sc,now){
  var s=ls();if(!s)return null;now=now==null?Date.now():now;var k=key(g,l,sc),o=null;
  var raw=null;try{raw=s.getItem(k)}catch(e){}
  if(raw==null)return null;
  try{o=JSON.parse(raw)}catch(e){o=null}
  if(!okState(o)||expired(o,now)){del(k);return null}
  return o;
}
/* ចាប់ផ្តើមប្រឡងថ្មី (ជំនួស state ចាស់នៃ key ដូចគ្នា) · saved=false បើ storage ពេញ (ប្រឡងនៅតែដំណើរការក្នុងអង្គចងចាំ) */
function start(g,l,o){
  o=o||{};var now=o.now==null?Date.now():o.now;sweep(now);
  var st={v:1,g:+g,l:+l,sc:o.sc||"",who:o.who||null,cls:o.cls||"",P:build(g,l),ans:{},sec:0,done:[0,0,0,0,0,0],at:[0,0,0,0,0,0],au:[0,0,0,0,0,0],dl:typeof o.dl==="number"&&isFinite(o.dl)?o.dl:null,pp:ppOf(o.pp),seen:now,startAt:now,secStart:now};
  return{st:st,saved:save(st)};
}
/* ===== ម៉ោង ===== */
function limV(g,v){var t=(PEX_T[v]||180)*NQ;return g<=9?t:Math.round(t*4/3)}                          /* វិនាទី តាមថ្នាក់+កម្រិត */
function limit(st,s){return limV(st.g,st.P.secs[s].v)}
function ndl(st){return typeof st.dl==="number"&&isFinite(st.dl)?st.dl:Infinity}
function deadline(st,s){if(s==null)s=st.sec;return Math.min(st.secStart+limit(st,s)*1000,ndl(st))}                       /* ms · វគ្គបច្ចុប្បន្ន */
function doSubmit(st,s,at,auto){
  if(!st.au)st.au=[0,0,0,0,0,0];
  st.done[s]=1;st.at[s]=at;st.au[s]=auto?1:0;st.sec=s+1;st.secStart=at;
}
/* ដំណើរការម៉ោងតាម wall-clock៖ បញ្ជូនស្វ័យប្រវត្តិរាល់វគ្គដែលអស់ម៉ោង (រួមទាំងពេលបិទ tab យូរ) · ត្រឡប់បញ្ជីលេខវគ្គដែលបញ្ជូនស្វ័យប្រវត្តិ */
function tick(st,now){
  now=Math.max(now==null?Date.now():now,st.seen||0);st.seen=now;
  var auto=[],n=st.P.secs.length;
  while(st.sec<n){var d=deadline(st);if(now<d)break;auto.push(st.sec);doSubmit(st,st.sec,d,true)}
  if(auto.length)save(st);
  return auto;
}
function status(st,now,autoList){
  now=Math.max(now==null?Date.now():now,st.seen||0);
  var n=st.P.secs.length,over=st.sec>=n,secLeft=0,totalLeft=0;
  if(!over){
    secLeft=Math.max(0,Math.ceil((deadline(st,st.sec)-now)/1000));
    var rest=0;for(var i=st.sec+1;i<n;i++)rest+=limit(st,i);
    totalLeft=Math.min(secLeft+rest,Math.max(0,Math.ceil((ndl(st)-now)/1000)))
  }
  return{sec:over?-1:st.sec,secLimit:over?0:limit(st,st.sec),secLeft:secLeft,totalLeft:totalLeft,
    totalElapsed:Math.max(0,Math.round((Math.min(now,over?(st.at[n-1]||now):now)-st.startAt)/1000)),
    over:over,dlHit:isFinite(ndl(st))&&now>=ndl(st),auto:autoList||[]};
}
function totalLimit(st){var t=0;for(var i=0;i<st.P.secs.length;i++)t+=limit(st,i);return t}
/* បញ្ចូលចម្លើយ៖ តែក្នុងវគ្គបច្ចុប្បន្ន និងមុនអស់ម៉ោង (tick ជាមុន) · វគ្គចាក់សោ/អនាគត → false */
function setAns(st,s,q,a,val,now){
  tick(st,now);
  if(s!==st.sec||st.done[s])return false;
  var k=s+"."+q+"."+a;val=String(val==null?"":val);
  if(val.trim())st.ans[k]=val.slice(0,200);else delete st.ans[k];
  return true;
}
function getAns(st,s,q,a){var v=st.ans[s+"."+q+"."+a];return v==null?"":v}
/* បញ្ជូនវគ្គបច្ចុប្បន្នដោយដៃ (សោ · មិនអាចត្រឡប់កែ) · ត្រឡប់លេខវគ្គបន្ទាប់ ឬ -1 បើចប់ទាំង ៦ · idempotent
   បើអស់ម៉ោងរួច ត្រូវរាប់ជាបញ្ជូនស្វ័យប្រវត្តិ (tick ជាមុន) */
function submitSec(st,s,now){
  now=now==null?Date.now():now;
  tick(st,now);
  var n=st.P.secs.length;
  if(s===st.sec&&st.sec<n&&!st.done[s]){doSubmit(st,s,Math.max(now,st.seen||0),false);save(st)}
  return st.sec>=n?-1:st.sec;
}
/* កម្មវិធីតាមដាន៖ cb(status) រាល់វិនាទី និងភ្លាមៗពេល tab ត្រឡប់មកវិញ · stop() ដើម្បីបិទ */
function watch(st,cb,o){
  o=o||{};var iv=null,doc=typeof document!=="undefined"?document:null;
  function run(){var a=tick(st,o.now?o.now():undefined);cb(status(st,o.now?o.now():undefined,a))}
  function vis(){if(!doc||!doc.hidden)run()}
  if(doc&&doc.addEventListener){doc.addEventListener("visibilitychange",vis);if(typeof window!=="undefined"&&window.addEventListener)window.addEventListener("pageshow",run)}
  iv=setInterval(run,o.every||1000);
  run();
  return function stop(){
    if(iv!=null&&typeof clearInterval==="function")clearInterval(iv);iv=null;
    if(doc&&doc.removeEventListener){doc.removeEventListener("visibilitychange",vis);if(typeof window!=="undefined"&&window.removeEventListener)window.removeEventListener("pageshow",run)}
  };
}
/* 👁 ត្រួតពិនិត្យ៖ សិស្សប្តូរ/ចេញពី tab បាន (ម៉ោងនៅរាប់ជា wall-clock) · ចាកចេញ ≥ AWAY_MS (១៥០ វិនាទី) រាប់ ១ ដង (aw) + ផលបូកវិនាទី (awS)
   st.hid = ម៉ោងដែលបាត់ទៅ (រក្សាក្នុង state ដូច្នេះបិទ tab/Refresh រួចត្រឡប់មក ក៏រាប់ដែរ) · ត្រឡប់ true បើទើបរាប់ ១ ដង */
var AWAY_MS=150000;
function awayOut(st,now){if(!st||st.sec>=st.P.secs.length||st.hid)return false;st.hid=now==null?Date.now():now;return true}
function awayIn(st,now){
  if(!st||!st.hid)return false;now=now==null?Date.now():now;var d=now-st.hid;st.hid=0;
  if(!(d>=AWAY_MS))return false;
  st.aw=(st.aw|0)+1;st.awS=(st.awS|0)+Math.round(d/1000);return true;
}
function finish(st){del(key(st.g,st.l,st.sc))}
function cancel(g,l,sc){del(key(g,l,sc))}

/* ================= ពិន្ទុ + លទ្ធផល (ជំហាន ៥) ================= */
/* សំណួរត្រូវ = គ្រប់ចម្លើយក្នុងសំណួរនោះត្រូវ (គ្មានពិន្ទុផ្នែក) · ទទេ = ខុស */
function qOk(st,s,i){
  var q=st.P.secs[s].qs[i];
  for(var j=0;j<q.a.length;j++){
    var u=getAns(st,s,i,j);if(!u.trim())return false;
    var r;try{r=PRACT.check(u,q.a[j].v,q.a[j].k)}catch(e){return false}
    if(!r||!r.ok)return false;
  }
  return true;
}
var WEAK=.6;
function r1(x){return Math.round(x*10)/10}
/* ត្រឡប់ null បើមិនទាន់ចប់ទាំង ៦ វគ្គ · លទ្ធផលមិនមានអត្ថបទសំណួរ ឬចម្លើយ */
function grade(st){
  var n=st.P.secs.length;if(st.sec<n)return null;
  var secs=[],c=0,tot=0,prev=st.startAt,au=0;
  for(var s=0;s<n;s++){
    var cs=0,ns=st.P.secs[s].qs.length;
    for(var i=0;i<ns;i++)if(qOk(st,s,i))cs++;
    var at=st.at[s]||prev,pc=ns?cs/ns:0;
    secs.push({v:st.P.secs[s].v,c:cs,n:ns,pct:r1(pc*100),weak:pc<WEAK,t:Math.max(0,Math.round((at-prev)/1000)),au:st.au&&st.au[s]?1:0});
    if(st.au&&st.au[s])au++;
    prev=at;c+=cs;tot+=ns;
  }
  var ne=need(tot,st.pp);
  return{g:st.g,l:st.l,n:tot,c:c,need:ne,pct:r1(tot?c/tot*100:0),pass:c>=ne,perfect:c===tot&&tot>0,
    aw:st.aw|0,awS:st.awS|0,miss:Math.max(0,ne-c),elapsed:Math.max(0,Math.round(((st.at[n-1]||prev)-st.startAt)/1000)),auto:au,secs:secs};
}
var RPFX="pexr_";
function rkey(g,l,sc){return RPFX+g+"_"+l+(sc?"_"+String(sc).replace(/[^A-Za-z0-9-]/g,""):"")}
function okRes(o){return !!(o&&o.v===1&&typeof o.at==="number"&&o.res&&typeof o.res.c==="number"&&Array.isArray(o.res.secs)&&o.res.secs.length>0)}
function mkRec(st,res,now){return{v:1,g:st.g,l:st.l,sc:st.sc||"",who:st.who||null,cls:st.cls||"",nm:"",at:now==null?Date.now():now,res:res}}
function saveRec(rec){
  var s=ls();if(!s)return false;
  var v=JSON.stringify(rec),k=rkey(rec.g,rec.l,rec.sc);
  return window.LSG?LSG.set(s,k,v):(function(){try{s.setItem(k,v);return true}catch(e){return false}})();
}
function saveRes(st,res,now){return saveRec(mkRec(st,res,now))}
function loadRes(g,l,sc,now){
  var s=ls();if(!s)return null;now=now==null?Date.now():now;var k=rkey(g,l,sc),raw=null,o=null;
  try{raw=s.getItem(k)}catch(e){}
  if(raw==null)return null;
  try{o=JSON.parse(raw)}catch(e){o=null}
  if(!okRes(o)||now-o.at>EXPIRE){del(k);return null}
  return o;
}
function clearRes(g,l,sc){del(rkey(g,l,sc))}

/* ================= UI ប្រឡង (ជំហាន ៤) ================= */
var U=null;   /* ប្រឡងដែលកំពុងបង្ហាញ */
function X(){return PRACT.X}
function el(id){return document.getElementById(id)}
function mmss(sec){sec=Math.max(0,sec|0);return X().N(Math.floor(sec/60)+":"+("0"+sec%60).slice(-2))}
function minOf(g,v){return Math.round(limV(g,v)/60)}
function css(){
  if(el("pexCss"))return;
  var c=document.createElement("style");c.id="pexCss";
  c.textContent=".pex-top{position:sticky;top:0;z-index:20;background:#fff;border:1px solid var(--line);border-radius:14px;padding:8px 12px;margin-bottom:12px;box-shadow:0 2px 10px rgba(30,58,138,.1)}"+
  ".pex-row{display:flex;flex-wrap:wrap;gap:4px 14px;align-items:center;justify-content:space-between}.pex-row b{color:#1e3a8a}"+
  ".pex-prog{display:grid;grid-template-columns:repeat(6,1fr);gap:4px;margin:6px 0 2px}.pex-prog i{height:8px;border-radius:4px;background:#e2e8f0}.pex-prog i.d{background:var(--ok)}.pex-prog i.c{background:var(--brand)}"+
  ".pex-t{font-variant-numeric:tabular-nums;font-weight:700;white-space:nowrap}.pex-t.low{color:var(--bad)}"+
  ".pex-ban{margin:0 0 12px;padding:10px 12px;border-radius:12px;background:#fffbeb;border:1px solid #fcd34d;font-size:15px}.pex-ban.bad{background:#fef2f2;border-color:#fca5a5}"+
  ".pex-rules{background:#fff;border-radius:14px;padding:14px 16px 14px 34px;margin:0 0 14px;box-shadow:0 2px 8px rgba(30,58,138,.06)}.pex-rules li{margin:6px 0}"+
  ".pex-lv{width:100%;border-collapse:collapse;margin:8px 0}.pex-lv td{border-bottom:1px solid var(--line);padding:4px 6px}.pex-lv td:last-child{text-align:right;white-space:nowrap}"+
  "#app .qs{grid-template-columns:minmax(0,1fr)}.pex-q{min-width:0}.pex-q .qt{overflow-wrap:anywhere;overflow-x:auto;overflow-y:hidden;max-width:100%}.pex-q .ans{min-width:0}.pex-q .katex-display{overflow-x:auto;overflow-y:hidden;max-width:100%}.pex-q .fig svg{max-width:100%}"+
  ".pex-res .pex-big{font-size:clamp(34px,10vw,56px);font-weight:700;margin-top:6px;line-height:1.2}.pex-res.pass{background:linear-gradient(135deg,#15803d,#0d9488)}.pex-res.perf{background:linear-gradient(135deg,#b45309,#d97706,#eab308)}.pex-res.fail{background:linear-gradient(135deg,#475569,#64748b)}"+
  ".pex-rt{width:100%;border-collapse:collapse;background:#fff;border-radius:12px;overflow:hidden;margin:0 0 12px;box-shadow:0 2px 8px rgba(30,58,138,.06)}.pex-rt th,.pex-rt td{padding:6px 8px;border-bottom:1px solid var(--line);text-align:left}.pex-rt tr.pex-weak{background:#fef2f2}"+
  ".pex-bar{display:inline-block;vertical-align:middle;width:56px;height:8px;border-radius:4px;background:#e2e8f0;overflow:hidden}.pex-bar i{display:block;height:100%;background:var(--brand)}.pex-weak .pex-bar i{background:var(--bad)}"+
  ".pex-act{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}.pex-go{background:var(--brand);color:#fff;border-color:var(--brand);font-weight:700;font-size:17px;padding:10px 26px}.pex-q0{color:var(--mute);font-size:14px}"+
  ".pex-login{background:#fff;border-radius:14px;padding:14px 16px;margin:0 0 14px;box-shadow:0 2px 8px rgba(30,58,138,.06);display:grid;gap:10px}.pex-login label{display:grid;gap:4px;font-weight:600}.pex-login select,.pex-login input{font:inherit;padding:9px 10px;border:1px solid var(--line);border-radius:10px;width:100%;box-sizing:border-box}.pex-go:disabled{opacity:.5}"+
  ".pex-aw{margin:0 0 10px;font-size:14px;color:var(--mute)}.pex-aw.bad{color:var(--bad);font-weight:700}"+
  "#app.pex-lock,#app.pex-lock *{-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}#app.pex-lock input{-webkit-user-select:text;user-select:text}";
  document.head.appendChild(c);
}
function banner(msg,bad){return msg?"<div class='pex-ban"+(bad?" bad":"")+"' role=status>"+X().esc(msg)+"</div>":""}
function introHtml(g,l,msg){
  var x=X(),n=NQ*ord().length,pp=ppOf(U&&U.o&&U.o.pp),ne=need(n,pp);
  return "<div class=hero><h1>🏁 "+x.esc("ប្រឡង ៦ កម្រិត")+"</h1><p>"+x.esc(x.lname(l))+"</p></div>"+banner(msg,true)+
  "<ol class=pex-rules>"+
  "<li>"+x.esc("សំណួរសរុប "+x.kn(n)+" = "+x.kn(ord().length)+" វគ្គ × "+x.kn(NQ)+" សំណួរ (កម្រិត ១–៥ និង 🌐 PISA)")+"</li>"+
  "<li>"+x.esc("ម៉ោងកំណត់ក្នុងមួយវគ្គ៖")+"<table class=pex-lv>"+ord().map(function(v){return"<tr><td>"+x.esc(x.lv(v)[0])+" <small>"+x.esc(x.lv(v)[1])+"</small></td><td>"+x.kn(minOf(g,v))+" នាទី</td></tr>"}).join("")+
    "<tr><td><b>"+x.esc("សរុប")+"</b></td><td><b>"+x.kn(Math.round(ord().reduce(function(t,v){return t+limV(g,v)},0)/60))+" នាទី</b></td></tr></table></li>"+
  "<li>"+x.esc("ជាប់ពិន្ទុ ≥ "+x.kn(Math.round(pp*100))+"% (យ៉ាងតិច "+x.kn(ne)+"/"+x.kn(n)+") ទើបទទួលវិញ្ញាបនបត្រ (ពានរង្វាន់ទទួលស្គាល់)")+"</li>"+
  "<li>"+x.esc("មិនបង្ហាញត្រូវ/ខុស ឬដំណោះស្រាយ រហូតដល់បញ្ជូនវគ្គចុងក្រោយ (PISA)")+"</li>"+
  "<li>"+x.esc("បញ្ជូនវគ្គហើយ មិនអាចត្រឡប់កែបានទេ · អស់ម៉ោងវគ្គ = បញ្ជូនស្វ័យប្រវត្តិ (ចម្លើយទទេ រាប់ជាខុស)")+"</li>"+
  "<li>"+x.esc("ម៉ោងរាប់បន្តជានិច្ច ទោះ Refresh ឬបិទផ្ទាំង · បើក Refresh នឹងបន្តប្រឡងដដែល")+"</li>"+
  "</ol><div class=pex-act><button type=button class=pex-go data-px=start>▶ "+x.esc("ចាប់ផ្តើមប្រឡង")+"</button><button type=button data-px=leave>"+x.esc("ត្រឡប់ក្រោយ")+"</button></div>";
}
function qHtml(st,s,i){
  var x=X(),q=st.P.secs[s].qs[i];
  return "<li class='q pex-q' id=pxq"+i+"><div class=qt>"+x.mathSafe(q.q)+"</div>"+(q.fig&&window.FIG?FIG.svg(q.fig):"")+"<div class=ans>"+
    q.a.map(function(a,j){return"<label class=in>"+(a.l?"<span class=lb>"+x.esc(a.l)+"</span>":"")+
      "<input data-px-q="+i+" data-px-p="+j+" autocomplete=off autocapitalize=off spellcheck=false inputmode=text value='"+x.esc(getAns(st,s,i,j))+"'><span class=pv id=pxv"+i+"_"+j+"></span></label>"}).join("")+"</div></li>";
}
function secHtml(st,msg,bad){
  var x=X(),s=st.sec,n=st.P.secs.length,v=st.P.secs[s].v,S=status(st);
  return "<div class=pex-top id=pxTop><div class=pex-row><span><b>🏁 "+x.esc(x.lname(st.l))+"</b></span><button type=button data-px=quit title='"+x.esc("បោះបង់ប្រឡង")+"'>✕</button></div>"+
    "<div class=pex-row><span>"+x.esc("វគ្គ "+x.kn(s+1)+"/"+x.kn(n)+" · "+x.lv(v)[0])+" <small>"+x.esc(x.lv(v)[1])+"</small></span>"+
    "<span>⏱ <span class=pex-t id=pxTS>"+mmss(S.secLeft)+"</span> · "+x.esc("សរុប")+" <span class=pex-t id=pxTT>"+mmss(S.totalLeft)+"</span></span></div>"+
    "<div class=pex-prog>"+st.P.secs.map(function(_,k){return"<i class='"+(k<s?"d":k===s?"c":"")+"'></i>"}).join("")+"</div></div>"+
    banner(msg||(st.aw?"⚠️ អ្នកបានចាកចេញពីថេប "+x.kn(st.aw)+" ដង · ការចាកចេញត្រូវបានកត់ត្រាជូនគ្រូ":""),bad||!!st.aw)+
    "<ol class=qs>"+st.P.secs[s].qs.map(function(_,i){return qHtml(st,s,i)}).join("")+"</ol>"+
    "<div class=foot><button type=button class='check pex-go' data-px=submit>📤 "+x.esc("បញ្ជូនវគ្គនេះ")+"</button></div>";
}
function pf(p){return X().kn(String(p))+"%"}
/* អេក្រង់លទ្ធផល៖ គ្មានអត្ថបទសំណួរ ឬចម្លើយ · ត្រូវ/សរុប តាមវគ្គ + សម្គាល់វគ្គខ្សោយ (< ៦០%) */
function resultHtml(rec,msg){
  var x=X(),r=rec.res,e=x.esc;
  var head=r.perfect?"🏆 "+e("ពិន្ទុពេញ ១០០%"):r.pass?"🎉 "+e("ជាប់ប្រឡង"):"📘 "+e("មិនទាន់ជាប់");
  var sub=r.perfect?e("ឆ្លើយត្រូវទាំងអស់ "+x.kn(r.c)+"/"+x.kn(r.n)+" · រយៈពេល "+mmss(r.elapsed)):
    r.pass?e("ត្រូវ "+x.kn(r.c)+"/"+x.kn(r.n)+" · រយៈពេល "+mmss(r.elapsed)):
    e("ត្រូវ "+x.kn(r.c)+"/"+x.kn(r.n)+" · ត្រូវការយ៉ាងតិច "+x.kn(r.need)+"/"+x.kn(r.n)+" (ខ្វះ "+x.kn(r.miss)+" សំណួរ) · រយៈពេល "+mmss(r.elapsed));
  var rows=r.secs.map(function(s){
    return "<tr class='"+(s.weak?"pex-weak":"")+"'><td>"+e(x.lv(s.v)[0])+" <small>"+e(x.lv(s.v)[1])+"</small>"+(s.au?" <small title='"+e("បញ្ជូនស្វ័យប្រវត្តិ")+"'>⏰</small>":"")+"</td>"+
      "<td><b>"+x.kn(s.c)+"/"+x.kn(s.n)+"</b></td><td><span class=pex-bar><i style='width:"+Math.max(0,Math.min(100,s.pct))+"%'></i></span> "+pf(s.pct)+"</td>"+
      "<td>"+(s.weak?"⚠️ "+e("ខ្សោយ"):"")+"</td></tr>"}).join("");
  var weak=r.secs.filter(function(s){return s.weak});
  var awl="<p class='pex-aw"+(r.aw?" bad":"")+"'>👁 "+e("សម្រាប់គ្រូពិនិត្យ៖ ")+e(r.aw?"បានចាកចេញពីថេប "+x.kn(r.aw)+" ដង (សរុប "+mmss(r.awS)+")":"មិនបានចាកចេញពីថេបយូរ (≥ ២.៥ នាទី) ទេ")+"</p>";
  return "<div class='hero pex-res "+(r.perfect?"perf":r.pass?"pass":"fail")+"'><h1>"+head+"</h1><p>"+sub+"</p><div class=pex-big>"+pf(r.pct)+"</div></div>"+banner(msg)+
    awl+"<table class=pex-rt><thead><tr><th>"+e("វគ្គ")+"</th><th>"+e("ត្រូវ")+"</th><th>%</th><th></th></tr></thead><tbody>"+rows+"</tbody></table>"+
    (!r.pass&&weak.length?"<p class=pex-q0>"+e("វគ្គខ្សោយ (< ៦០%)៖ ")+weak.map(function(s){return e(x.lv(s.v)[0])}).join(" · ")+e(" — សូមហាត់បន្ថែមកម្រិតទាំងនេះ ហើយសាកម្ដងទៀត។")+"</p>":"")+
    (!r.pass&&!weak.length?"<p class=pex-q0>"+e("សូមត្រឡប់ទៅរៀន ហើយសាកម្ដងទៀត។")+"</p>":"")+
    "<div class=pex-act>"+
    (r.pass?"<button type=button class=pex-go data-px=cert>🎓 "+e("វិញ្ញាបនបត្រ")+"</button>":"<button type=button class=pex-go data-px=study>📚 "+e("ត្រឡប់ទៅរៀន")+"</button>")+
    "<button type=button data-px=retry>🔁 "+e("សាកម្ដងទៀត")+"</button>"+
    (r.pass?"":"")+"<button type=button data-px=leave>"+e("ចាកចេញ")+"</button></div>";
}
/* ================= វិញ្ញាបនបត្រ (ជំហាន ៦) ================= */
var KM_MON=["មករា","កុម្ភៈ","មីនា","មេសា","ឧសភា","មិថុនា","កក្កដា","សីហា","កញ្ញា","តុលា","វិច្ឆិកា","ធ្នូ"];
function dateKh(ts){var d=new Date(ts),x=X();return"ថ្ងៃទី"+x.kn(d.getDate())+" ខែ"+KM_MON[d.getMonth()]+" ឆ្នាំ"+x.kn(d.getFullYear())}
function durKh(sec){var x=X(),h=Math.floor(sec/3600),m=Math.floor(sec%3600/60),s2=sec%60;
  return(h?x.kn(h)+" ម៉ោង ":"")+x.kn(m)+" នាទី "+x.kn(s2)+" វិនាទី"}
/* ឈ្មោះក្នុងបញ្ជីថ្នាក់ (pcls) ជាស្ថានភាព «បានជ្រើសពីបញ្ជី» · សិស្សក្រៅ ឬគ្មានថ្នាក់ = មិនបានផ្ទៀងផ្ទាត់ */
function listed(rec){return !!(rec.who&&rec.who.k&&!rec.who.ext&&rec.cls)}
function nameOf(rec){return String(rec.nm||(rec.who&&rec.who.n)||"").trim().slice(0,60)}
function nmSize(n){return n<=20?"s1":n<=32?"s2":n<=48?"s3":"s4"}
function certHtml(rec){
  var x=X(),e=x.esc,r=rec.res,nm=nameOf(rec),perf=!!r.perfect;
  return "<div class='pex-cert"+(perf?" perf":"")+"' id=pxCert><div class=pc-b1><div class=pc-b2>"+
    "<div class=pc-tag>"+e(perf?"ពានរង្វាន់ទទួលស្គាល់ · ពិន្ទុពេញ ១០០%":"ពានរង្វាន់ទទួលស្គាល់ · លើកទឹកចិត្ត")+"</div>"+
    "<div class=pc-org>"+e("វិទ្យាល័យបឹងត្របែក · Rean Math Prime")+"</div>"+
    "<h1 class=pc-h>"+e("វិញ្ញាបនបត្រ")+"</h1>"+
    "<p class=pc-l>"+e("សូមប្រគល់ជូន")+"</p>"+
    "<div class='pc-nm "+nmSize(nm.length)+"' id=pxNm>"+(nm?e(nm):"<span class=pc-dots>&nbsp;</span>")+"</div>"+
    "<p class=pc-t>"+e("បានប្រឡង «ប្រឡង ៦ កម្រិត» (កម្រិត ១–៥ និង PISA) មេរៀន៖ ")+"<b>"+e(x.lname(rec.l))+"</b></p>"+
    "<p class=pc-t2>"+e("ថ្នាក់ទី"+x.kn(rec.g)+(rec.cls?" · ថ្នាក់ "+rec.cls:""))+"</p>"+
    "<div class=pc-st><div class=pc-pct>"+e(x.kn(String(r.pct))+"%")+"</div><div class=pc-sd>"+
      e("ត្រូវ "+x.kn(r.c)+"/"+x.kn(r.n)+" សំណួរ")+"<br>"+e("រយៈពេលសរុប "+durKh(r.elapsed))+"</div></div>"+
    (perf?"<div class=pc-rb>"+e("ពិន្ទុពេញ ១០០% · ឆ្លើយត្រូវទាំង "+x.kn(r.n)+"/"+x.kn(r.n)+" សំណួរ ក្នុងរយៈពេល "+durKh(r.elapsed))+"</div>":"")+
    "<div class=pc-ft><span>"+e(dateKh(rec.at))+"</span>"+(listed(rec)?"":"<span class=pc-un>"+e("(សិស្សក្រៅបញ្ជី · មិនបានផ្ទៀងផ្ទាត់)")+"</span>")+"</div>"+
    "<div class=pc-note>"+e("ពានរង្វាន់លើកទឹកចិត្តនេះបង្កើតនៅលើឧបករណ៍របស់សិស្ស មិនមែនឯកសារផ្លូវការរបស់សាលាទេ។")+"</div>"+
  "</div></div></div>";
}
function certPage(rec){
  var x=X(),e=x.esc,edit=!listed(rec);
  return "<div class=pex-tools><div class=pex-row>"+
    (edit?"<label class=pex-nl>"+e("ឈ្មោះសិស្ស ")+"<input data-px-nm maxlength=60 autocomplete=off value='"+e(nameOf(rec))+"' placeholder='"+e("វាយឈ្មោះរបស់អ្នក")+"'></label>":"<span>"+e("ឈ្មោះ៖ ")+"<b>"+e(nameOf(rec))+"</b></span>")+
    "<span class=pex-act><button type=button class=pex-go data-px=print>🖨️ "+e("បោះពុម្ព / PDF")+"</button><button type=button data-px=back>‹ "+e("ត្រឡប់ទៅលទ្ធផល")+"</button></span></div>"+
    "<p class=pex-q0>"+e("ជ្រើសក្រដាស A4 ផ្តេក · Scale 100% · បិទ Headers and footers ហើយជ្រើស «Save as PDF» ដើម្បីរក្សាទុក។")+"</p></div>"+
    "<div class=pex-cw id=pxCw>"+certHtml(rec)+"</div>";
}
var MM=96/25.4;
function fitCert(){
  var cw=el("pxCw"),c=el("pxCert");if(!cw||!c)return;
  var s=Math.min(1,(cw.clientWidth||1)/(297*MM));
  c.style.transform=s<1?"scale("+s+")":"none";cw.style.height=Math.round(210*MM*s)+"px";
}
function certCss(){
  if(!el("pexFont")){var l=document.createElement("link");l.id="pexFont";l.rel="stylesheet";l.href="https://fonts.googleapis.com/css2?family=Battambang:wght@400;700&display=swap";document.head.appendChild(l)}
  if(el("pexCertCss"))return;
  var c=document.createElement("style");c.id="pexCertCss";
  var FB='"Khmer OS Battambang","Battambang","Khmer OS Siemreap","Siemreap","Noto Sans Khmer",serif',FM='"Khmer OS Muol Light","Moul","Khmer OS Siemreap",serif';
  c.textContent=
  ".pex-tools{background:#fff;border:1px solid var(--line);border-radius:14px;padding:8px 12px;margin-bottom:12px}.pex-nl input{font:inherit;font-size:16px;padding:6px 10px;border:2px solid var(--line);border-radius:10px;width:min(320px,70vw)}"+
  ".pex-cw{width:100%;overflow:hidden;position:relative}"+
  ".pex-cert{width:297mm;height:210mm;box-sizing:border-box;background:#fff;color:#1c2541;font-family:"+FB+";transform-origin:0 0;padding:9mm;position:relative}"+
  ".pc-b1{height:100%;box-sizing:border-box;border:2.2mm solid #1d4ed8;padding:2.2mm}.pc-b2{height:100%;box-sizing:border-box;border:.6mm solid #1d4ed8;padding:6mm 14mm;display:flex;flex-direction:column;align-items:center;justify-content:space-between;text-align:center;background:linear-gradient(180deg,#f8fbff,#fff 40%)}"+
  ".pc-tag{font-size:5mm;font-weight:700;color:#1d4ed8;border:.4mm solid #1d4ed8;border-radius:5mm;padding:.8mm 6mm}.pc-org{font-size:4.6mm;color:#475569}"+
  ".pc-h{font-family:"+FM+";font-weight:400;font-size:14mm;line-height:1.5;margin:0;color:#1e3a8a}.pc-l{margin:0;font-size:5mm;color:#475569}"+
  ".pc-nm{font-family:"+FM+";color:#1c2541;max-width:240mm;overflow-wrap:anywhere;line-height:1.6;border-bottom:.5mm dotted #94a3b8;padding:0 6mm;min-width:120mm}.pc-nm.s1{font-size:12mm}.pc-nm.s2{font-size:9mm}.pc-nm.s3{font-size:7mm}.pc-nm.s4{font-size:5.6mm}.pc-dots{display:inline-block;min-width:120mm}"+
  ".pc-t{margin:0;font-size:5.4mm;line-height:1.8;max-width:230mm}.pc-t2{margin:0;font-size:5.2mm;color:#334155}"+
  ".pc-st{display:flex;align-items:center;gap:10mm;justify-content:center}.pc-pct{font-family:"+FM+";font-size:19mm;line-height:1.3;color:#15803d}.pc-sd{font-size:5.2mm;line-height:1.8;text-align:left}"+
  ".pc-rb{font-size:5.4mm;font-weight:700;color:#7c4a03;background:linear-gradient(90deg,#fde68a,#fbbf24,#fde68a);padding:1.2mm 10mm;border-radius:2mm;border:.4mm solid #b45309}"+
  ".pc-ft{width:100%;display:flex;justify-content:space-between;align-items:flex-end;font-size:4.8mm;padding:0 6mm}.pc-un{color:#b45309;font-weight:700;font-size:4.6mm}"+
  ".pc-note{font-size:3.6mm;color:#64748b}"+
  ".pex-cert.perf{background:#fffbeb}.pex-cert.perf .pc-b1{border:2.6mm double #b8860b;border-width:2.6mm;border-style:double;padding:2.2mm}.pex-cert.perf .pc-b2{border:.8mm solid #b8860b;background:radial-gradient(circle at 50% 0,#fff7d6,#fffbeb 55%,#fff)}"+
  ".pex-cert.perf .pc-tag{color:#7c4a03;border-color:#b8860b;background:#fef3c7}.pex-cert.perf .pc-h{color:#92400e}.pex-cert.perf .pc-pct{color:#b45309}.pex-cert.perf .pc-nm{border-bottom-color:#b8860b}";
  document.head.appendChild(c);
}
function printCss(on){
  var o=el("pexPrint");
  if(!on){if(o&&o.parentNode)o.parentNode.removeChild(o);return}
  if(o)return;
  o=document.createElement("style");o.id="pexPrint";
  o.textContent="@page{size:A4 landscape;margin:0}@media print{html,body{background:#fff!important;margin:0!important;padding:0!important;width:297mm!important}"+
    "#app{max-width:none!important;padding:0!important;margin:0!important}.pex-tools,.pex-ban,#kb{display:none!important}"+
    ".pex-cw{width:297mm!important;height:210mm!important;overflow:hidden!important}.pex-cert{transform:none!important;margin:0!important;break-inside:avoid;page-break-inside:avoid}"+
    "*{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important}}";
  document.head.appendChild(o);
}
function showCert(rec){
  U.view="cert";U.shown=-1;certCss();printCss(true);
  paint(certPage(rec),"cert");window.scrollTo(0,0);fitCert();
  if(!U.rz){U.rz=function(){fitCert()};window.addEventListener("resize",U.rz)}
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){fitCert()});
}
function leaveCert(){printCss(false);if(U.rz){window.removeEventListener("resize",U.rz);U.rz=null}}

function paint(html,view){var app=el("app");app.innerHTML=html;app.dataset.pexv=view;app.classList.toggle("pex-lock",view.indexOf("sec")===0);if(window.PRACT&&view.indexOf("sec")===0){X().math(app);prevAll()}}
function prevAll(){
  [].forEach.call(el("app").querySelectorAll("input[data-px-q]"),function(inp){if(inp.value)X().pv(inp.value,el("pxv"+inp.dataset.pxQ+"_"+inp.dataset.pxP))});
}
function flush2(){if(U&&U.rec&&U.recDirty){U.recDirty=false;saveRec(U.rec)}}
function flush(){if(U&&U.st&&U.dirty){U.dirty=false;clearTimeout(U.tm);save(U.st)}}
function showSec(msg,bad){
  var st=U.st;U.view="sec"+st.sec;U.shown=st.sec;
  paint(secHtml(st,msg,bad),"sec"+st.sec);window.scrollTo(0,0);
}
/* ចប់ទាំង ៦ វគ្គ → គណនាពិន្ទុ → រក្សា result តូច (pexr_) → លុប state ធ្ងន់ (pex_) → អេក្រង់លទ្ធផល */
function showEnd(){
  var st=U.st;if(U.over)return;                         /* ម្ដងគត់ · watch() ហៅ onStatus រាល់វិនាទី មិនត្រូវគូរលទ្ធផលឡើងវិញពេលកំពុងបង្ហាញវិញ្ញាបនបត្រ */
  var res=grade(st);if(!res)return;
  if(U.stop){try{U.stop()}catch(e){}U.stop=null}
  U.view="end";U.shown=-1;
  if(U.bu){window.removeEventListener("beforeunload",U.bu);U.bu=null}
  clearTimeout(U.tm);U.dirty=false;
  var rec=mkRec(st,res,Date.now());U.over=true;
  var saved=saveRec(rec);
  if(saved)finish(st);                                  /* រក្សា state ធ្ងន់ទុក បើ result រក្សាមិនបាន (ពេញ) */
  U.rec=rec;
  showResult(rec,saved?"":"⚠️ មិនអាចរក្សាលទ្ធផលក្នុងឧបករណ៍បានទេ · សូមកុំ Refresh");
  if(typeof U.o.onDone==="function"){try{U.o.onDone(res,rec,U)}catch(e){if(window.console)console.error(e)}}
}
function showResult(rec,msg){
  U.view="end";U.shown=-1;U.rec=rec;
  paint(resultHtml(rec,msg),"end");window.scrollTo(0,0);
}
function onStatus(S){
  if(!U||!U.st||U.over)return;
  if(S.over){showEnd();return}
  if(S.sec!==U.shown){
    var au=S.auto.length?S.auto.map(function(i){return i+1}).join(", "):"";
    showSec(au?"⏰ អស់ម៉ោងវគ្គ "+X().kn(au)+" · បានបញ្ជូនស្វ័យប្រវត្តិ":"",!!au);
    return;
  }
  var a=el("pxTS"),b=el("pxTT");
  if(a){var t=mmss(S.secLeft);if(a.textContent!==t)a.textContent=t;a.classList.toggle("low",S.secLeft<=60)}
  if(b){var u=mmss(S.totalLeft);if(b.textContent!==u)b.textContent=u}
}
function begin(){
  var st=U.st;awayIn(st);U.stop=watch(st,onStatus);
  U.bu=function(e){flush();e.preventDefault();e.returnValue="";return""};
  window.addEventListener("beforeunload",U.bu);
}
function teardown(){
  if(!U)return;var u=U;U=null;
  try{if(u.stop)u.stop()}catch(e){}
  if(u.st&&u.dirty)save(u.st);
  if(u.rec&&u.recDirty)saveRec(u.rec);
  var app=el("app");
  ["click","input","keydown","focusin","focusout"].forEach(function(n){app.removeEventListener(n,u.h[n])});["copy","cut","paste","contextmenu","dragstart","drop"].forEach(function(n){app.removeEventListener(n,u.h.clip)});
  window.removeEventListener("popstate",u.h.pop);window.removeEventListener("hashchange",u.h.hash);
  window.removeEventListener("pagehide",u.h.hide);document.removeEventListener("visibilitychange",u.h.vis);
  if(u.bu)window.removeEventListener("beforeunload",u.bu);
  if(u.kt)clearTimeout(u.kt);
  if(u.rz)window.removeEventListener("resize",u.rz);printCss(false);
  delete app.dataset.pexv;app.classList.remove("pex-lock");
}
function leave(){var cb=U&&U.o.onExit;if(U)leaveCert();teardown();if(typeof cb==="function")cb();else location.reload()}
function mount(o){
  o=o||{};
  if(U)teardown();
  css();var g=+o.g,l=+o.l,x=X();
  PRACT.S.g=g;                                   /* T/N/lv/lname ใช้ S.g */
  U={o:o,st:null,view:"",shown:-2,dirty:false,tm:0,kt:0,stop:null,bu:null,h:{},hash:location.hash};
  var app=el("app"),h=U.h;
  h.click=function(e){
    var b=e.target.closest&&e.target.closest("button[data-px]");if(!b||!U)return;var a=b.dataset.px;
    if(a==="start"){
      clearRes(g,l,o.sc);var r;try{r=start(g,l,{sc:o.sc,who:o.who,cls:o.cls,dl:o.dl,pp:o.pp})}catch(err){if(window.console)console.error(err);paint(introHtml(g,l,"មិនអាចបង្កើតប្រឡងបានទេ"),"intro");return}
      U.st=r.st;begin();showSec(r.saved?"":"⚠️ មិនអាចរក្សាក្នុងឧបករណ៍បានទេ (ទំហំពេញ) · សូមកុំ Refresh ក្នុងអំឡុងប្រឡង",!r.saved);return}
    if(a==="leave")return leave();
    if(a==="retry"){clearRes(g,l,o.sc);var oo=U.o;teardown();mount(oo);return}
    if(a==="study"&&U.rec){
      var r=U.rec.res,w=r.secs.reduce(function(m,s2){return s2.pct<m.pct?s2:m},r.secs[0]);   /* កម្រិតទាបជាងគេ (ស្មើគ្នា → មុន) */
      var cb=U.o.onStudy,lv=w.v;teardown();
      if(typeof cb==="function")return cb(g,l,lv);
      x.open(l,lv);var hb=document.getElementById("hub");if(hb)hb.open=true;return}
    if(a==="cert"&&U.rec){
      if(typeof U.o.onCert==="function")return U.o.onCert(U.rec,U);
      return showCert(U.rec)}
    if(a==="print"){try{flush2();window.print()}catch(err){if(window.console)console.error(err)}return}
    if(a==="back"&&U.rec){flush2();leaveCert();return showResult(U.rec,"")}
    if(a==="quit"){if(confirm("បោះបង់ប្រឡងនេះ? ចម្លើយ និងម៉ោងទាំងអស់នឹងបាត់ ហើយមិនអាចបន្តបានទេ។")){cancel(U.st.g,U.st.l,U.st.sc);leave()}return}
    if(a==="submit"&&U.st){
      var st=U.st,s=st.sec,qs=st.P.secs[s].qs,empty=0;
      qs.forEach(function(q,i){var any=false;q.a.forEach(function(_,j){if(getAns(st,s,i,j).trim())any=true});if(!any)empty++});
      if(!confirm("បញ្ជូនវគ្គ "+x.kn(s+1)+"? "+(empty?"នៅទទេ "+x.kn(empty)+" សំណួរ (រាប់ជាខុស) · ":"")+"បញ្ជូនហើយមិនអាចត្រឡប់កែបានទេ។"))return;
      flush();var nx=submitSec(st,s);
      if(nx<0)showEnd();else showSec("✔ បានបញ្ជូនវគ្គ "+x.kn(s+1)+" · ម៉ោងវគ្គថ្មីចាប់ផ្តើមហើយ")
    }
  };
  h.input=function(e){
    var t=e.target;
    if(U&&U.rec&&t.dataset&&t.dataset.pxNm!=null){                      /* ឈ្មោះលើវិញ្ញាបនបត្រ (សិស្សក្រៅបញ្ជី) */
      U.rec.nm=String(t.value).slice(0,60);var n=U.rec.nm.trim();var box=el("pxNm");
      if(box){box.className="pc-nm "+nmSize(n.length);box.textContent=n;if(!n)box.innerHTML="<span class=pc-dots>&nbsp;</span>"}
      U.recDirty=true;clearTimeout(U.tm);U.tm=setTimeout(flush2,600);fitCert();return}
    if(!U||!U.st||!t.dataset||t.dataset.pxQ==null)return;
    var i=+t.dataset.pxQ,j=+t.dataset.pxP;
    var ok=setAns(U.st,U.st.sec,i,j,t.value);
    if(!ok){onStatus(status(U.st,undefined,tick(U.st)));return}        /* វគ្គចាក់សោ (អស់ម៉ោង) */
    x.pv(t.value,el("pxv"+i+"_"+j));
    U.dirty=true;clearTimeout(U.tm);U.tm=setTimeout(function(){flush()},800);
  };
  h.keydown=function(e){if(e.key==="Enter"&&e.target.dataset&&e.target.dataset.pxQ!=null)e.preventDefault()};
  h.focusin=function(e){var t=e.target;if(t.dataset&&t.dataset.pxQ!=null)x.kbFocus(t)};
  h.focusout=function(e){            /* practice.js លាក់ក្តារចុចពេល focus ចេញពី data-q → បង្ហាញម្ដងទៀតបើនៅក្នុងប្រឡង */
    if(!U)return;clearTimeout(U.kt);U.kt=setTimeout(function(){var a=document.activeElement;if(U&&a&&a.dataset&&a.dataset.pxQ!=null)x.kbFocus(a)},220)};
  h.pop=function(){if(!U||!U.st||U.over)return;history.pushState({pex:1},"",location.href);
    var b=el("pxTop");if(b&&!el("pxBack")){var d=document.createElement("div");d.id="pxBack";d.className="pex-ban bad";d.textContent="⚠️ កំពុងប្រឡង · សូមប្រើប៊ូតុង ✕ ដើម្បីបោះបង់ ឬបន្តធ្វើ";b.insertAdjacentElement("afterend",d);setTimeout(function(){if(d.parentNode)d.parentNode.removeChild(d)},4000)}};
  h.hash=function(){if(U&&U.st&&!U.over&&location.hash!==U.hash)history.replaceState(history.state,"",location.pathname+location.search+U.hash)};
  h.hide=function(){if(U&&U.st&&awayOut(U.st))U.dirty=true;flush();flush2()};
  h.vis=function(){
    if(document.hidden){if(U&&U.st&&awayOut(U.st))U.dirty=true;flush();flush2();return}
    if(U&&U.st&&!U.over&&awayIn(U.st)){save(U.st);U.shown=-2;onStatus(status(U.st,undefined,tick(U.st)));return}   /* ត្រឡប់មកវិញ → ព្រមាន */
  };
  h.clip=function(e){if(U&&U.st&&!U.over&&app.dataset.pexv&&app.dataset.pexv.indexOf("sec")===0)e.preventDefault()};   /* ទប់ copy/cut/paste/ម៉ឺនុយចុចស្តាំ/អូស លើប្រអប់ប្រឡង */
  app.addEventListener("click",h.click);app.addEventListener("input",h.input);app.addEventListener("keydown",h.keydown);
  ["copy","cut","paste","contextmenu","dragstart","drop"].forEach(function(n){app.addEventListener(n,h.clip)});app.addEventListener("focusin",h.focusin);app.addEventListener("focusout",h.focusout);
  window.addEventListener("popstate",h.pop);window.addEventListener("hashchange",h.hash);
  window.addEventListener("pagehide",h.hide);document.addEventListener("visibilitychange",h.vis);
  try{history.pushState({pex:1},"",location.href)}catch(e){}
  var old=load(g,l,o.sc),rr=null;
  if(old){U.st=old;begin();U.view="";                       /* បន្តប្រឡង (Refresh/បិទផ្ទាំង) */}
  else if(!o.fresh&&(rr=loadRes(g,l,o.sc)))showResult(rr,"");   /* ទើបប្រឡងចប់ → បង្ហាញលទ្ធផលដដែល (Refresh) */
  else paint(introHtml(g,l,""),"intro");
  return{unmount:teardown,get st(){return U&&U.st}};
}


/* ================= 🔐 ទ្វារចូលប្រឡង (ជំហាន ៧) =================
   pcls/{code}.ex = {on, g:9, l:មេរៀន, t:ម៉ោងបិទ(ms)|null, p:ពិន្ទុជាប់ %, ext:[{k,n,h}]} · គ្រូកំណត់ក្នុង quiz.js
   ទ្វារទន់ (client-only)៖ h = SHA-256(code|k|ពាក្យសម្ងាត់) · ខុស ៥ ដង → ចាក់សោ ៣០ វិនាទី (រក្សាក្នុង localStorage) · មិនសរសេរចូល prt */
var LOCK_N=5,LOCK_MS=30000;
function gate(cls,now,saved){
  now=now==null?Date.now():now;var e=cls&&cls.ex;
  if(!e||e.on!==true)return{ok:false,why:"off",msg:"ប្រឡង ៦ កម្រិតមិនទាន់បើកទេ · សូមសួរគ្រូរបស់អ្នក"};
  if(+e.g!==9||!(+e.l>0))return{ok:false,why:"cfg",msg:"ការកំណត់ប្រឡងមិនត្រឹមត្រូវ · សូមសួរគ្រូរបស់អ្នក"};
  var dl=typeof e.t==="number"&&isFinite(e.t)?e.t:null;
  if(dl!=null&&now>=dl&&!saved)return{ok:false,why:"expired",msg:"ប្រឡងនេះបានបិទហើយ (ផុតម៉ោងកំណត់)"};
  return{ok:true,g:9,l:+e.l,dl:dl,pp:ppOf((+e.p||80)/100),ext:Array.isArray(e.ext)?e.ext:[]};
}
function hex(buf){var a=new Uint8Array(buf),s2="";for(var i=0;i<a.length;i++)s2+=("0"+a[i].toString(16)).slice(-2);return s2}
function sha(code,k,pw){
  var sub=window.crypto&&crypto.subtle;if(!sub||!window.TextEncoder)return Promise.reject("nosubtle");
  return sub.digest("SHA-256",new TextEncoder().encode(String(code)+"|"+String(k)+"|"+String(pw))).then(hex);
}
function xk(id){return String(id||"").trim().toUpperCase().replace(/[^A-Z0-9_-]/g,"").slice(0,30)}
function scOf(code,k){return String(code).replace(/[^A-Za-z0-9-]/g,"")+"-"+String(k).replace(/[^A-Za-z0-9-]/g,"")}
function lkGet(code){var s=ls(),o=null;try{o=JSON.parse(s.getItem("pexLk_"+code)||"null")}catch(e){}return o&&typeof o.n==="number"?o:{n:0,until:0}}
function lkSet(code,o){var s=ls();if(s)try{s.setItem("pexLk_"+code,JSON.stringify(o))}catch(e){}}
function meGet(code){var s=ls(),o=null;try{o=JSON.parse(s.getItem("pexMe_"+code)||"null")}catch(e){}return o&&o.k&&o.n?o:null}
function meSet(code,w){var s=ls();if(s)try{s.setItem("pexMe_"+code,JSON.stringify(w))}catch(e){}}
function meDel(code){del("pexMe_"+code)}
/* ចូលប្រឡង៖ cb = {cls (pcls doc ក្នុង CL.cls), code, me ({k,n} បើបានជ្រើសក្នុងបញ្ជី), onExit}
   - មាន state/លទ្ធផលរក្សាទុក និងអត្ថសញ្ញាណចងចាំ → បន្តភ្លាម (Refresh កណ្តាលវគ្គ)
   - បើមិនទេ → អេក្រង់ជ្រើសឈ្មោះ/សិស្សក្រៅ */
function enter(o){
  css();o=o||{};var cls=o.cls,code=String(o.code||""),x=X(),app=el("app"),now=Date.now();
  var gs0=gate(cls,now,true);
  if(!gs0.ok)return blocked(gs0,o);
  var who=meGet(code),saved=false,prog=false;
  if(who){var sc0=scOf(code,who.k);prog=!!load(gs0.g,gs0.l,sc0,now);saved=prog||!!loadRes(gs0.g,gs0.l,sc0,now)}
  var gs=gate(cls,now,saved);if(!gs.ok)return blocked(gs,o);
  if(who&&(prog||(o.auto&&saved)))return go(who);   /* កំពុងប្រឡង → បន្ត · ចុចប៊ូតុងថ្មី → ជ្រើសឈ្មោះម្តងទៀត (ឧបករណ៍ចែករំលែក) */
  return login();
  function go(w){
    meSet(code,w);var sc=scOf(code,w.k);
    return mount({g:gs.g,l:gs.l,sc:sc,who:w.ext?{k:w.k,n:w.n,ext:true}:{k:w.k,n:w.n},cls:cls.cls||"",dl:gs.dl,pp:gs.pp,onExit:o.onExit,onStudy:o.onStudy});
  }
  function login(msg,bad){
    var names=Array.isArray(cls.names)?cls.names:[],lk=lkGet(code),cur=o.me&&o.me.k?o.me.k:"";
    app.innerHTML="<div class=hero><h1>🏁 "+x.esc("ប្រឡង ៦ កម្រិត")+"</h1><p>"+x.esc("ថ្នាក់ "+(cls.cls||"")+" · "+x.lname(gs.l))+"</p></div>"+banner(msg,bad)+
    "<div class=pex-login><label>"+x.esc("ឈ្មោះក្នុងបញ្ជីថ្នាក់")+"<select id=pxWho><option value=''>"+x.esc("— ជ្រើសឈ្មោះ —")+"</option>"+
      names.map(function(n){return"<option value='"+x.esc(n.k)+"'"+(n.k===cur?" selected":"")+">"+x.esc(n.n)+"</option>"}).join("")+
      "<option value='@ext'>"+x.esc("👤 សិស្សក្រៅបញ្ជី (ប្រើលេខសម្គាល់ + លេខសម្ងាត់)")+"</option></select></label>"+
    "<div id=pxExt hidden><label>"+x.esc("លេខសម្គាល់")+"<input id=pxId autocomplete=off autocapitalize=characters maxlength=30></label>"+
      "<label>"+x.esc("លេខសម្ងាត់")+"<input id=pxPw type=password autocomplete=off maxlength=40></label></div>"+
    "<p id=pxLk class=pex-q0></p></div>"+
    "<div class=pex-act><button type=button class=pex-go id=pxOk>▶ "+x.esc("បន្ត")+"</button><button type=button id=pxBk>"+x.esc("ត្រឡប់ក្រោយ")+"</button></div>";
    var sel=el("pxWho"),ext=el("pxExt"),ok=el("pxOk"),lt=el("pxLk"),tm=0;
    function lock(){var l2=lkGet(code),left=Math.ceil((l2.until-Date.now())/1000);
      if(left>0){lt.textContent="⏳ ខុសច្រើនដង · សូមរង់ចាំ "+x.kn(left)+" វិនាទី";ok.disabled=true;tm=setTimeout(lock,500)}
      else{lt.textContent="";ok.disabled=false}}
    if(lk.until>Date.now())lock();
    sel.onchange=function(){ext.hidden=sel.value!=="@ext"};ext.hidden=sel.value!=="@ext";
    el("pxBk").onclick=function(){clearTimeout(tm);var cb=o.onExit;if(typeof cb==="function")cb();else location.reload()};
    ok.onclick=function(){
      if(lkGet(code).until>Date.now())return lock();
      var v=sel.value;if(!v){login("សូមជ្រើសឈ្មោះរបស់អ្នក",true);return}
      if(v!=="@ext"){var n=names.filter(function(q){return q.k===v})[0];if(!n)return;clearTimeout(tm);return go({k:n.k,n:n.n})}
      var id=xk(el("pxId").value),pw=el("pxPw").value,rec=gs.ext.filter(function(q){return q.k===id})[0];
      ok.disabled=true;
      (id&&pw&&rec&&typeof rec.h==="string"?sha(code,id,pw):Promise.resolve(null)).then(function(h){
        if(h&&h===rec.h){lkSet(code,{n:0,until:0});clearTimeout(tm);return go({k:"x"+id,n:String(rec.n||id).slice(0,60),ext:true})}
        var l3=lkGet(code);l3.n++;if(l3.n>=LOCK_N){l3={n:0,until:Date.now()+LOCK_MS}}lkSet(code,l3);
        login(l3.until>Date.now()?"លេខសម្គាល់ ឬលេខសម្ងាត់មិនត្រឹមត្រូវ ៥ ដង · រង់ចាំ ៣០ វិនាទី":"លេខសម្គាល់ ឬលេខសម្ងាត់មិនត្រឹមត្រូវ",true);
      },function(e){login(e==="nosubtle"?"កម្មវិធីរុករកនេះមិនគាំទ្រការផ្ទៀងផ្ទាត់ទេ · សូមប្រើ Chrome/Safari (https)":"មិនអាចផ្ទៀងផ្ទាត់បានទេ",true)});
    };
  }
}
function blocked(g,o){
  css();var x=X(),app=el("app");
  app.innerHTML="<div class=hero><h1>🔒 "+x.esc("ប្រឡង ៦ កម្រិត")+"</h1><p>"+x.esc(g.msg)+"</p></div><div class=pex-act><button type=button class=pex-go id=pxBk2>"+x.esc("ត្រឡប់ទៅហាត់")+"</button></div>";
  el("pxBk2").onclick=function(){var cb=o&&o.onExit;if(typeof cb==="function")cb();else location.reload()};
}

window.PEXAM={awayOut:awayOut,awayIn:awayIn,AWAY_MS:AWAY_MS,gate:gate,enter:enter,sha:sha,xk:xk,scOf:scOf,ppOf:ppOf,NQ:NQ,PASS:PASS,FIGMAX:FIGMAX,EXPIRE:EXPIRE,build:build,total:total,need:need,pack:pack,unpack:unpack,
  PEX_T:PEX_T,limit:limit,totalLimit:totalLimit,tick:tick,status:status,watch:watch,deadline:deadline,
  ui:{mount:mount,unmount:teardown,active:function(){return !!U}},limV:limV,
  grade:grade,cert:{html:certHtml,dur:durKh,date:dateKh,listed:listed},saveRec:saveRec,mkRec:mkRec,rkey:rkey,loadRes:loadRes,saveRes:saveRes,clearRes:clearRes,WEAK:WEAK,
  key:key,start:start,load:load,save:save,setAns:setAns,getAns:getAns,submitSec:submitSec,finish:finish,cancel:cancel,sweep:sweep};
})();
