/* 🧪 pexam.js — ម៉ូដប្រឡង ៦ កម្រិត (ស្នូលទិន្នន័យ)៖ ថ្នាក់ទី ៩ ទាំង ១៨ មេរៀន · ៦ វគ្គ × ៤ សំណួរ · JSON round-trip · check() · fig · ព្រំដែនជាប់ ២០/២៤
   ដំណើរការ៖ jsc tests/pexam.js */
var H=function(){return P};var P=new Proxy(H,{get:function(t,k){if(k===Symbol.toPrimitive)return function(){return""};if(k==="length")return 0;return P},apply:function(){return P},construct:function(){return P}});
var window=this;var document=P,localStorage={getItem:function(){return null},setItem:function(){}},location={hash:"",search:""},navigator={},setInterval=function(){},setTimeout=function(){},addEventListener=function(){},console={log:print,error:print,warn:print};
eval(read("practice.js").replace("window.PX={","window.PX={check:check,parse:parse,ev:ev,"));
["pisa12.js","practice11.js","practice10.js","practice9.js","practice8.js","practice7.js","practiceen.js","practiceen2.js","practiceen3.js","practiceen4.js","practiceen5.js","practiceen6.js"].forEach(function(f){eval(read(f))});
eval(read("fig.js"));eval(read("pexam.js"));
var X=window.PX,PX_=window.PRACT,bad=0,made=0,figs=0,maxB=0;
function B(m){bad++;if(bad<25)print(m)}
function bal(s){var d=(String(s).replace(/\\\$/g,"").match(/\$/g)||[]).length%2,b=0;s=String(s);for(var i=0;i<s.length;i++){if(s[i]=="{"&&s[i-1]!="\\")b++;if(s[i]=="}"&&s[i-1]!="\\")b--}return!d&&!b}
/* helper ដែលបើកសម្រាប់ UI */
["esc","mathSafe","kn","T","N","EN","lv","lvls","lname","LVO","math","kbFocus","pv"].forEach(function(k){if(PX_.X[k]==null)B("PRACT.X."+k+" missing")});
if(PX_.X.LVO.join()!=="1,5,2,6,3,4")B("LVO "+PX_.X.LVO);
/* ពិន្ទុ */
if(PEXAM.need(24)!==20)B("need(24)="+PEXAM.need(24));if(PEXAM.need(10)!==8)B("need(10)");if(PEXAM.need(5)!==4)B("need(5)");if(PEXAM.need(25)!==20)B("need(25)");
/* ១៨ មេរៀន × ៣០ ដង */
var G9=PX_.GR[9].G;
Object.keys(G9).forEach(function(l){for(var r=0;r<30;r++){
  var P;try{P=PEXAM.build(9,+l)}catch(e){B("BUILD l"+l+" "+e);break}made++;
  if(P.secs.length!==6||PEXAM.total(P)!==24){B("SHAPE l"+l);continue}
  if(P.secs.map(function(s){return s.v}).join()!=="1,5,2,6,3,4")B("ORDER l"+l);
  var seen={};
  var s0=PEXAM.pack(P);maxB=Math.max(maxB,s0.length);
  var R=PEXAM.unpack(s0);if(!R){B("UNPACK l"+l);continue}
  if(PEXAM.pack(R)!==s0)B("ROUNDTRIP l"+l);
  R.secs.forEach(function(S){if(S.qs.length!==4)B("NQ l"+l+" v"+S.v);S.qs.forEach(function(q){
    if(seen[q.q])B("DUPQ l"+l+" "+q.q.slice(0,60));seen[q.q]=1;
    var all=q.q+JSON.stringify(q.a)+q.s;if(/undefined|NaN|\[object/.test(all))B("BADVAL l"+l+" v"+S.v+" "+q.kd);
    if(typeof q.s!=="string"||typeof q.fig!=="string"||typeof q.kd!=="string")B("TYPES l"+l+" v"+S.v);
    [q.q,q.s].forEach(function(t){if(!bal(t))B("BAL l"+l+" v"+S.v+" "+q.kd)});
    q.a.forEach(function(a){if(typeof a.v!=="string"||typeof a.k!=="string")B("ATYPE l"+l);var c=PX_.check(a.v,a.v,a.k);if(!c.ok)B("CHK l"+l+" v"+S.v+" "+q.kd+" "+a.v)});
    if(q.fig&&window.FIG){figs++;var h=FIG.svg(q.fig);if(h.indexOf("<svg")<0||h.indexOf("fig-err")>=0||/NaN|undefined|Infinity/.test(h))B("FIG l"+l+" v"+S.v+" "+q.kd)}
  })})
}});
/* unpack ត្រូវបដិសេធទិន្នន័យខូច */
["","{","null","{\"v\":2,\"secs\":[]}","{\"v\":1,\"secs\":[]}","{\"v\":1,\"secs\":[1,2,3,4,5,6]}","{\"v\":1,\"secs\":[{\"qs\":[]},{},{},{},{},{}]}"].forEach(function(s){if(PEXAM.unpack(s))B("UNPACK accepted "+s.slice(0,30))});
/* មេរៀនគ្មាន/កម្រិតខ្វះ → throw */
try{PEXAM.build(9,9999);B("no throw for missing lesson")}catch(e){}
if(maxB>300000)B("PACK too big "+maxB);
/* ===== ជំហាន ២៖ State ក្នុង localStorage ===== */
function Store(quota){var d={},o={get length(){return Object.keys(d).length},key:function(i){return Object.keys(d)[i]||null},
  getItem:function(k){return k in d?d[k]:null},removeItem:function(k){delete d[k]},clear:function(){d={}},_d:d,
  setItem:function(k,v){v=String(v);var n=0;Object.keys(d).forEach(function(x){if(x!==k)n+=(x.length+d[x].length)*2});if(n+(k.length+v.length)*2>quota){var e=new Error("QuotaExceededError");e.name="QuotaExceededError";throw e}d[k]=v}};return o}
var DAY=864e5,H12=12*36e5,T0=1.8e12;
localStorage=Store(5e6);load("lsguard.js");
function ok(c,m){if(!c)B("S2 "+m)}
/* key */
ok(PEXAM.key(9,3)==="pex_9_3","key "+PEXAM.key(9,3));ok(PEXAM.key(9,3,"AB12-x y")==="pex_9_3_AB12-xy","key scope");
/* start → saved → refresh (load) ដូចដើម */
var r=PEXAM.start(9,8,{now:T0,who:{k:"S1",n:"សិស្ស ក"}});
ok(r.saved&&localStorage.getItem("pex_9_8"),"start saved");
var st=r.st;PEXAM.setAns(st,0,0,0,"x=៣/2",T0+1000);PEXAM.setAns(st,0,1,0," ",T0+1000);PEXAM.setAns(st,0,3,0,"√2",T0+1000);ok(PEXAM.save(st),"save");
var L1=PEXAM.load(9,8,"",T0+5*60e3);
ok(L1&&JSON.stringify(L1)===JSON.stringify(st),"refresh restores identical state (questions+answers+startAt)");
ok(PEXAM.getAns(L1,0,0,0)==="x=៣/2"&&PEXAM.getAns(L1,0,3,0)==="√2"&&PEXAM.getAns(L1,0,1,0)==="","answers incl. Khmer/blank");
ok(L1.startAt===T0&&L1.who.n==="សិស្ស ក","startAt+who kept");
/* ផុតកំណត់ ១២ ម៉ោង */
ok(PEXAM.load(9,8,"",T0+H12)!==null,"11:59 ok (boundary inclusive)");
ok(PEXAM.load(9,8,"",T0+H12+1)===null&&!localStorage.getItem("pex_9_8"),"expired >12h removed");
/* submitSec · សោ · idempotent · finish */
r=PEXAM.start(9,2,{now:T0});st=r.st;var nx;
ok(PEXAM.submitSec(st,1,T0+1)===0,"cannot submit a later section first");ok(st.sec===0&&!st.done[1],"state unchanged");
for(var i=0;i<6;i++){nx=PEXAM.submitSec(st,i,T0+(i+1)*1000);ok(nx===(i<5?i+1:-1),"submit "+i+" -> "+nx);}
ok(PEXAM.submitSec(st,0,T0+9e3)===-1&&st.at[0]===T0+1000,"re-submit locked section is a no-op");
ok(st.done.join()==="1,1,1,1,1,1"&&st.sec===6,"all sections done");
var L2=PEXAM.load(9,2,"",T0+7e3);ok(L2&&L2.sec===6&&L2.at[5]===T0+6000,"submitted progress survives refresh");
PEXAM.finish(st);ok(!localStorage.getItem("pex_9_2")&&PEXAM.load(9,2,"",T0)===null,"finish removes key");
/* cancel + scope แยกกัน */
PEXAM.start(9,5,{now:T0,sc:"A"});PEXAM.start(9,5,{now:T0,sc:"B"});
ok(localStorage.getItem("pex_9_5_A")&&localStorage.getItem("pex_9_5_B"),"scoped keys independent");
PEXAM.cancel(9,5,"A");ok(!localStorage.getItem("pex_9_5_A")&&localStorage.getItem("pex_9_5_B"),"cancel removes only that key");
PEXAM.cancel(9,5,"B");
/* corrupt */
localStorage.setItem("pex_9_1","{bad");ok(PEXAM.load(9,1,"",T0)===null&&!localStorage.getItem("pex_9_1"),"corrupt json removed");
localStorage.setItem("pex_9_1",JSON.stringify({v:1,P:{v:1,secs:[]},startAt:T0}));ok(PEXAM.load(9,1,"",T0)===null&&!localStorage.getItem("pex_9_1"),"invalid shape removed");
/* sweep: លុបតែ pex_ ផុតកំណត់/ខូច · មិនប៉ះ key ផ្សេង */
localStorage.clear();
var fresh=PEXAM.start(9,3,{now:T0}).st;var old=PEXAM.start(9,4,{now:T0-H12-1000}).st;
localStorage.setItem("pex_9_9","junk");
["firebase:authUser:x","theme","pend_t1_S1","hub9_1","pracQ_abc","prac9"].forEach(function(k){localStorage.setItem(k,"{\"t\":1}")});
ok(localStorage.getItem("pex_9_4"),"old exam present before sweep (start() sweeps with its own now)");
var swn=PEXAM.sweep(T0);
ok(swn===2,"sweep removed "+swn+" (expired+corrupt)");ok(localStorage.getItem("pex_9_3")&&!localStorage.getItem("pex_9_4")&&!localStorage.getItem("pex_9_9"),"sweep keeps fresh only");
["firebase:authUser:x","theme","pend_t1_S1","hub9_1","pracQ_abc","prac9"].forEach(function(k){ok(localStorage.getItem(k),"sweep keeps "+k)});
/* lsguard មិនសម្អាត pex_* (free + sweep) */
LSG.free(localStorage,"");LSG.sweep("");
ok(localStorage.getItem("pex_9_3"),"LSG.free/sweep never touch pex_*");ok(localStorage.getItem("pend_t1_S1")&&localStorage.getItem("firebase:authUser:x"),"free keeps pend_/login");
/* ពេញ quota → LSG.set សម្អាត cache (hub) រួចរក្សាបាន */
localStorage=Store(400000);load("lsguard.js");
localStorage.setItem("pend_t1_S1",new Array(2000).join("p"));
try{for(var h=1;;h++)localStorage.setItem("hub9_"+h,new Array(20000).join("x"))}catch(e){}   /* เติม cache จนเกือบเต็ม */
try{for(var h2=1;;h2++)localStorage.setItem("hub8_"+h2,new Array(20).join("y"))}catch(e){}
var probe=false;try{localStorage.setItem("probe",new Array(5000).join("z"));probe=true}catch(e){}
ok(!probe,"precondition: storage really full");
var big=PEXAM.start(9,9,{now:T0});
ok(big.saved&&localStorage.getItem("pex_9_9"),"quota full: cache freed, exam saved");
ok(localStorage.getItem("pend_t1_S1"),"quota full: pend_ never deleted");
ok(PEXAM.load(9,9,"",T0)&&PEXAM.load(9,9,"",T0).P.secs.length===6,"saved exam loads after free");
/* មិនអាចរក្សាបាន (quota តូចពេក) → saved=false មិន throw · ប្រឡងនៅដំណើរការ */
localStorage=Store(2000);load("lsguard.js");var tiny=null;try{tiny=PEXAM.start(9,3,{now:T0})}catch(e){B("S2 start threw "+e)}
ok(tiny&&tiny.saved===false&&tiny.st.P.secs.length===6,"unsavable: saved=false, state still returned");
/* គ្មាន localStorage */
var _ls=localStorage;localStorage=null;ok(PEXAM.load(9,3,"",T0)===null&&PEXAM.sweep(T0)===0&&PEXAM.save({g:9,l:3,sc:""})===false,"no storage: safe");localStorage=_ls;
/* ទំហំ + fig ធំ៖ ១៨ មេរៀន × ៣០ */
localStorage=Store(5e6);load("lsguard.js");
var worst=0,bigFig=0,nb=0,lessonMax={};
Object.keys(G9).forEach(function(l){for(var r2=0;r2<30;r2++){var x=PEXAM.start(9,+l,{now:T0,sc:"Z"});nb++;var n=localStorage.getItem("pex_9_"+l+"_Z").length;
  if(!x.saved)B("S2 not saved l"+l);worst=Math.max(worst,n);lessonMax[l]=Math.max(lessonMax[l]||0,n);
  x.st.P.secs.forEach(function(S){S.qs.forEach(function(q){if(q.fig.length>PEXAM.FIGMAX)bigFig++})})}
  PEXAM.cancel(9,+l,"Z")});
ok(worst<250000,"worst saved state "+worst);
print("pexam step2: builds "+nb+" worst "+worst+"B bigFig(fallback) "+bigFig+"/"+(nb*24)+" l8max "+lessonMax[8]+" l6max "+lessonMax[6]);

/* ===== ជំហាន ៣៖ ម៉ោងវគ្គ/សរុប (wall-clock · mock) ===== */
localStorage=Store(5e6);load("lsguard.js");
var MIN=60e3,SEC=1e3,LIM9=[360,540,720,900,1080,1080];   /* វិនាទី · ថ្នាក់ ៩ · តាម LVO 1,5,2,6,3,4 */
function mk(g,l,o){var st=PEXAM.start(g,l,o).st;return st}
/* តារាង PEX_T ដាច់ពី SOLT */
ok(PEXAM.PEX_T[1]===90&&PEXAM.PEX_T[4]===270&&Object.keys(PEXAM.PEX_T).length===6,"PEX_T table");
var s9=mk(9,2,{now:T0});
ok(LIM9.every(function(v,i){return PEXAM.limit(s9,i)===v}),"limits g9 "+[0,1,2,3,4,5].map(function(i){return PEXAM.limit(s9,i)}));
ok(PEXAM.totalLimit(s9)===78*60,"total 78 min");
var s12=mk(12,22,{now:T0});ok(PEXAM.limit(s12,0)===480&&PEXAM.limit(s12,5)===1440,"g12 x4/3");
/* ដើមប្រឡង */
var S0=PEXAM.status(s9,T0);ok(S0.sec===0&&S0.secLeft===360&&S0.totalLeft===4680&&S0.totalElapsed===0&&!S0.over&&!S0.dlHit,"status at start "+JSON.stringify(S0));
/* កណ្ដាលវគ្គ (wall-clock) */
var S1=PEXAM.status(s9,T0+100*SEC);ok(S1.secLeft===260&&S1.totalLeft===4580&&S1.totalElapsed===100,"mid-section "+JSON.stringify(S1));
ok(PEXAM.tick(s9,T0+100*SEC).length===0&&s9.sec===0,"no auto before deadline");
var s9b=mk(9,2,{now:T0});ok(PEXAM.tick(s9b,T0+359*SEC+999).length===0&&s9b.sec===0,"359.999 s: still section 0");
/* ចម្លើយក្នុងវគ្គ + submit ដោយដៃ → secStart ថ្មី · ម៉ោងវគ្គបន្ទាប់ពេញ */
ok(PEXAM.setAns(s9,0,0,0,"7",T0+100*SEC)===true,"answer in current section");
ok(PEXAM.setAns(s9,1,0,0,"9",T0+100*SEC)===false&&PEXAM.getAns(s9,1,0,0)==="","future section refused");
ok(PEXAM.submitSec(s9,0,T0+100*SEC)===1&&s9.secStart===T0+100*SEC&&s9.au[0]===0,"manual submit");
var S2=PEXAM.status(s9,T0+100*SEC);ok(S2.sec===1&&S2.secLeft===540&&S2.totalLeft===4320,"next section full time "+JSON.stringify(S2));
ok(PEXAM.setAns(s9,0,0,0,"8",T0+101*SEC)===false&&PEXAM.getAns(s9,0,0,0)==="7","locked section refused");
/* អស់ម៉ោងដល់វិនាទីពិតប្រាកដ → បញ្ជូនស្វ័យប្រវត្តិ · ចម្លើយទទេ = មិនបញ្ចូល */
var a=mk(9,3,{now:T0});PEXAM.setAns(a,0,0,0,"5",T0+10*SEC);
var au=PEXAM.tick(a,T0+360*SEC);
ok(au.join()==="0"&&a.sec===1&&a.done[0]===1&&a.au[0]===1&&a.at[0]===T0+360*SEC&&a.secStart===T0+360*SEC,"auto-submit at exactly 360 s");
ok(PEXAM.getAns(a,0,0,0)==="5"&&PEXAM.getAns(a,0,1,0)==="","answered kept, blank stays blank (wrong)");
ok(PEXAM.tick(a,T0+360*SEC).length===0&&a.sec===1,"tick idempotent");
ok(PEXAM.setAns(a,0,1,0,"late",T0+361*SEC)===false&&PEXAM.getAns(a,0,1,0)==="","typing after deadline refused");
/* ការវាយក្រោយអស់ម៉ោង (មិនទាន់ tick) → setAns ធ្វើ tick ជាមុន ហើយបដិសេធ */
var b=mk(9,3,{now:T0});
ok(PEXAM.setAns(b,0,0,0,"sneak",T0+400*SEC)===false&&b.sec===1&&b.au[0]===1&&PEXAM.getAns(b,0,0,0)==="","setAns after deadline auto-submits then refuses");
/* បិទ tab ១០ នាទី៖ ចាប់ផ្តើម T0 · ឆ្លើយនៅ 60 s · បិទ · refresh នៅ 660 s */
var c=mk(9,4,{now:T0});PEXAM.setAns(c,0,0,0,"x",T0+60*SEC);PEXAM.save(c);
var c2=PEXAM.load(9,4,"",T0+660*SEC);ok(!!c2&&c2.sec===0,"closed tab 10 min: state loads");
var cau=PEXAM.tick(c2,T0+660*SEC);
ok(cau.join()==="0"&&c2.sec===1&&c2.at[0]===T0+360*SEC&&c2.au[0]===1,"section 0 auto-submitted at its true deadline, not at reopen time");
var cs=PEXAM.status(c2,T0+660*SEC);ok(cs.sec===1&&cs.secLeft===240&&cs.totalLeft===240+LIM9.slice(2).reduce(function(p,q){return p+q},0),"next section keeps real remaining time (900-660=240) "+JSON.stringify(cs));
ok(PEXAM.getAns(c2,0,0,0)==="x","answers survive");
var c3=PEXAM.load(9,4,"",T0+660*SEC);ok(c3.sec===1&&c3.au[0]===1,"auto-submit persisted");
/* បិទយូរ ២ ម៉ោង → ទាំង ៦ វគ្គបញ្ជូនស្វ័យប្រវត្តិ · at ជាបន្តបន្ទាប់ */
var d=mk(9,5,{now:T0});var dau=PEXAM.tick(d,T0+120*MIN),cum=0,okc=true;
LIM9.forEach(function(v,i){cum+=v*SEC;if(d.at[i]!==T0+cum)okc=false});
ok(dau.join()==="0,1,2,3,4,5"&&d.sec===6&&okc&&d.au.join()==="1,1,1,1,1,1","2h absence: all 6 cascaded at cumulative deadlines");
var ds=PEXAM.status(d,T0+120*MIN);ok(ds.over&&ds.sec===-1&&ds.secLeft===0&&ds.totalLeft===0&&ds.totalElapsed===4680,"over status "+JSON.stringify(ds));
ok(PEXAM.submitSec(d,5,T0+121*MIN)===-1&&d.at[5]===T0+cum,"submit after over is a no-op");
/* ex.t (st.dl) */
var e=mk(9,6,{now:T0,dl:T0+200*SEC});
var es=PEXAM.status(e,T0+50*SEC);ok(es.secLeft===150&&es.totalLeft===150&&!es.dlHit,"dl caps section and total "+JSON.stringify(es));
var eau=PEXAM.tick(e,T0+250*SEC);
ok(eau.join()==="0,1,2,3,4,5"&&e.sec===6&&e.at.every(function(v){return v===T0+200*SEC}),"dl passed: all remaining submitted at dl");
ok(PEXAM.status(e,T0+250*SEC).dlHit&&PEXAM.status(e,T0+250*SEC).over,"dlHit+over");
var f=mk(9,6,{now:T0,dl:T0+30*MIN});PEXAM.tick(f,T0+6*MIN);   /* section 0 auto at 6 min; dl 30 min */
var fs=PEXAM.status(f,T0+6*MIN);ok(f.sec===1&&fs.secLeft===540&&fs.totalLeft===1440,"dl later than limits: total capped by dl (30-6=24 min) "+JSON.stringify(fs));
var g2=mk(9,6,{now:T0});ok(g2.dl===null&&PEXAM.status(g2,T0).totalLeft===4680,"no dl = no cap");
/* ម៉ោងមិនអាចថយក្រោយ */
var h=mk(9,7,{now:T0});PEXAM.tick(h,T0+300*SEC);var hs=PEXAM.status(h,T0);ok(hs.secLeft===60,"clock rewind ignored (st.seen) "+JSON.stringify(hs));
ok(PEXAM.tick(h,T0+10*SEC).length===0&&h.sec===0,"rewind never un-submits");
var hr=mk(9,7,{now:T0});PEXAM.tick(hr,T0+400*SEC);ok(hr.sec===1,"forward still works after rewind test");
/* watch(): setInterval + visibilitychange */
var realDate=Date.now,mockNow=T0,ivs=[],cleared=[],listeners={},docM={hidden:false,addEventListener:function(n,f){listeners[n]=f},removeEventListener:function(n){delete listeners[n]}};
var _doc=document,_si=setInterval;document=docM;setInterval=function(f,ms){ivs.push({f:f,ms:ms});return ivs.length};clearInterval=function(i){cleared.push(i)};
Date.now=function(){return mockNow};
var w=mk(9,8,{now:T0}),got=[];var stop=PEXAM.watch(w,function(s){got.push(s)});
ok(got.length===1&&got[0].secLeft===360&&ivs.length===1&&ivs[0].ms===1000&&typeof listeners.visibilitychange==="function","watch: immediate cb, 1 s interval, visibilitychange registered");
mockNow=T0+5*SEC;ivs[0].f();ok(got.length===2&&got[1].secLeft===355,"interval tick updates from wall-clock "+got[1].secLeft);
/* tab លាក់ ១០ នាទី (interval ត្រូវបានរារាំង) → ត្រឡប់មកវិញ */
docM.hidden=true;mockNow=T0+10*MIN;listeners.visibilitychange();ok(got.length===2,"hidden: visibilitychange does not run");
docM.hidden=false;listeners.visibilitychange();
var lg=got[got.length-1];ok(got.length===3&&lg.sec===1&&lg.auto.join()==="0"&&lg.secLeft===(360+540-600),"visible again: immediate catch-up "+JSON.stringify(lg));
mockNow=T0+10*MIN+SEC;ivs[0].f();ok(got[got.length-1].auto.length===0,"auto list only reported once");
stop();ok(cleared.length===1&&!listeners.visibilitychange,"stop(): interval cleared, listener removed");
Date.now=realDate;document=_doc;setInterval=_si;
/* ត្រឡប់ទៅ localStorage ពិត */
var pl=mk(9,9,{now:T0});PEXAM.tick(pl,T0+400*SEC);var rl=PEXAM.load(9,9,"",T0+400*SEC);ok(rl&&rl.sec===1&&rl.au[0]===1&&rl.seen===T0+400*SEC,"tick persisted incl. seen");

/* ===== ជំហាន ៥៖ grade() · result record ===== */
localStorage=Store(5e6);load("lsguard.js");
/* លេង៖ cnt[s] = ចំនួនសំណួរត្រូវក្នុងវគ្គ s · ខុស = "abc?" · ទទេ = ពេល blank[s] */
function play(st,cnt,blank){
  for(var s=0;s<6;s++){
    st.P.secs[s].qs.forEach(function(q,i){
      var right=i<cnt[s];
      q.a.forEach(function(a,j){
        if(right)PEXAM.setAns(st,s,i,j,a.v,T0+(s*10+1)*SEC);
        else if(!(blank&&blank[s])&&j===0)PEXAM.setAns(st,s,i,j,"abc?",T0+(s*10+1)*SEC)
      })});
    PEXAM.submitSec(st,s,T0+(s+1)*10*SEC)
  }
  return PEXAM.grade(st)
}
function gr9(cnt,blank){var st=PEXAM.start(9,2,{now:T0}).st;return play(st,cnt,blank)}
var nogr=PEXAM.start(9,2,{now:T0}).st;ok(PEXAM.grade(nogr)===null,"grade null before the last section");
/* ព្រំដែនជាប់ */
var g19=gr9([4,4,4,4,3,0]);ok(g19.c===19&&g19.n===24&&g19.need===20&&g19.pass===false&&g19.perfect===false&&g19.miss===1&&g19.pct===79.2,"19/24 fails "+JSON.stringify([g19.c,g19.pass,g19.pct,g19.miss]));
var g20=gr9([4,4,4,4,4,0]);ok(g20.c===20&&g20.pass===true&&g20.perfect===false&&g20.miss===0&&g20.pct===83.3,"20/24 passes "+JSON.stringify([g20.c,g20.pass,g20.pct]));
var g23=gr9([4,4,4,4,4,3]);ok(g23.c===23&&g23.pass&&!g23.perfect&&g23.pct===95.8,"23/24 pass, not perfect "+g23.pct);
var g24=gr9([4,4,4,4,4,4]);ok(g24.c===24&&g24.pass&&g24.perfect&&g24.pct===100&&g24.miss===0,"24/24 perfect");
var g0=gr9([0,0,0,0,0,0],[1,1,1,1,1,1]);ok(g0.c===0&&!g0.pass&&g0.pct===0&&g0.secs.every(function(s){return s.weak&&s.c===0}),"all blank = 0, all weak");
/* វគ្គខ្សោយ < ៦០% */
var gw=gr9([2,3,4,1,0,4]);ok(gw.secs.map(function(s){return s.weak?1:0}).join("")==="100110","weak flags 2/4=50 weak, 3/4=75 not "+gw.secs.map(function(s){return s.pct}));
ok(gw.secs.map(function(s){return s.v}).join()==="1,5,2,6,3,4"&&gw.secs.map(function(s){return s.c}).join()==="2,3,4,1,0,4","per-section counts in LVO order");
/* រយៈពេល + auto */
ok(g24.elapsed===60&&g24.secs[0].t===10&&g24.secs[5].t===10&&g24.auto===0,"elapsed 60 s, per-section 10 s, no auto");
var au=PEXAM.start(9,3,{now:T0}).st;PEXAM.tick(au,T0+2*36e5);var gau=PEXAM.grade(au);
ok(gau&&gau.auto===6&&gau.c===0&&gau.elapsed===4680&&!gau.pass,"all auto-submitted: 0 correct, 6 auto, elapsed 78 min");
/* សំណួរច្រើនចម្លើយ៖ ត្រូវតែពេលត្រូវទាំងអស់ */
var multi=null,ms=0,mi=0;
for(var tr=0;tr<400&&!multi;tr++){var cand=PEXAM.start(9,[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18][tr%18],{now:T0}).st;
  cand.P.secs.forEach(function(S,s){S.qs.forEach(function(q,i){if(!multi&&q.a.length>1){multi=cand;ms=s;mi=i}})})}
if(multi){
  /* ចូលដល់វគ្គ ms ដោយបញ្ជូនទទេ */
  for(var z=0;z<ms;z++)PEXAM.submitSec(multi,z,T0+(z+1)*SEC);
  var qq=multi.P.secs[ms].qs[mi];PEXAM.setAns(multi,ms,mi,0,qq.a[0].v,T0+20*SEC);PEXAM.setAns(multi,ms,mi,1,"abc?",T0+20*SEC);
  for(var z2=ms;z2<6;z2++)PEXAM.submitSec(multi,z2,T0+(z2+30)*SEC);
  ok(PEXAM.grade(multi).c===0,"partial multi-answer question counts as wrong");
  PEXAM.start(9,1,{now:T0});
}else print("note: no multi-answer question found (skipped)");
/* Result record */
var st5=PEXAM.start(9,4,{now:T0,sc:"CLS1",who:{k:"S1",n:"សិស្ស ក"}}).st;var gr5=play(st5,[4,4,4,4,4,0]);
ok(PEXAM.saveRes(st5,gr5,T0+70*SEC),"saveRes");
var lr=PEXAM.loadRes(9,4,"CLS1",T0+80*SEC);ok(lr&&lr.res.c===20&&lr.res.pass&&lr.who.n==="សិស្ស ក"&&lr.sc==="CLS1","loadRes round-trip");
var raw=localStorage.getItem("pexr_9_4_CLS1");
var leak=false;st5.P.secs.forEach(function(S){S.qs.forEach(function(q){if(raw.indexOf(q.q.slice(0,20))>=0)leak=true;q.a.forEach(function(a){if(a.v.length>6&&raw.indexOf(a.v)>=0)leak=true})})});
ok(!leak&&raw.length<2000,"result record has no questions/answers, tiny ("+raw.length+" B)");
ok(PEXAM.loadRes(9,4,"CLS2",T0)===null,"other scope has no result");
ok(PEXAM.loadRes(9,4,"CLS1",T0+70*SEC+H12)!==null,"result valid at 12 h");
ok(PEXAM.loadRes(9,4,"CLS1",T0+70*SEC+H12+1)===null&&!localStorage.getItem("pexr_9_4_CLS1"),"result expired >12 h removed");
PEXAM.saveRes(st5,gr5,T0);localStorage.setItem("pexr_9_5","{bad");localStorage.setItem("pexr_9_6",JSON.stringify({v:1,at:T0,res:{c:1,secs:[]}}));
ok(PEXAM.loadRes(9,5,"",T0)===null&&!localStorage.getItem("pexr_9_5"),"corrupt result removed");
var sw5=PEXAM.sweep(T0+H12+1);ok(sw5>=2&&!localStorage.getItem("pexr_9_4_CLS1")&&!localStorage.getItem("pexr_9_6"),"sweep removes expired/invalid pexr_ ("+sw5+")");
PEXAM.saveRes(st5,gr5,T0+H12+5);LSG.free(localStorage,"");LSG.sweep("");ok(localStorage.getItem("pexr_9_4_CLS1"),"LSG.free/sweep never touch pexr_*");
PEXAM.clearRes(9,4,"CLS1");ok(!localStorage.getItem("pexr_9_4_CLS1"),"clearRes");

/* ===== ជំហាន ៦៖ វិញ្ញាបនបត្រ (HTML) ===== */
var CE=PEXAM.cert;
function recOf(c,who,cls,nm){var st=PEXAM.start(9,2,{now:T0,who:who,cls:cls}).st;var gg=play(st,c);var r=PEXAM.mkRec(st,gg,T0+500*SEC);if(nm)r.nm=nm;return r}
var rc=recOf([4,4,4,4,4,0],{k:"S1",n:"សុខ វិចិត្រ"},"9NGS-A"),h1=CE.html(rc);
ok(CE.listed(rc)&&h1.indexOf("មិនបានផ្ទៀងផ្ទាត់")<0,"listed student + class: no unverified label");
ok(h1.indexOf("pex-cert perf")<0&&h1.indexOf("លើកទឹកចិត្ត")>0&&h1.indexOf("ពានរង្វាន់ទទួលស្គាល់")>0&&h1.indexOf("សុខ វិចិត្រ")>0&&h1.indexOf("9NGS-A")>0&&h1.indexOf("៨៣.៣%")>0,"normal certificate content");
var rp=recOf([4,4,4,4,4,4],{k:"S1",n:"ក"},"9NGS-A"),h2=CE.html(rp);
ok(h2.indexOf("pex-cert perf")>0&&h2.indexOf("ពិន្ទុពេញ ១០០%")>0&&h2.indexOf("២៤/២៤")>0&&h2.indexOf("១០០%")>0&&h2.indexOf("នាទី")>0,"perfect certificate: gold + 100% + duration");
ok(CE.html(recOf([4,4,4,4,4,2],{ext:true,n:"ឈ្មោះ"},"9NGS-A")).indexOf("មិនបានផ្ទៀងផ្ទាត់")>0,"outsider (ext) unverified");
ok(CE.html(recOf([4,4,4,4,4,2],null,"")).indexOf("មិនបានផ្ទៀងផ្ទាត់")>0,"no who/class unverified");
ok(CE.html(recOf([4,4,4,4,4,2],{k:"S1",n:"ក"},"")).indexOf("មិនបានផ្ទៀងផ្ទាត់")>0,"listed name but no class: unverified");
var hx=CE.html(recOf([4,4,4,4,4,2],null,"","<img src=x onerror=alert(1)>\"'&<b>x</b>"));
ok(hx.indexOf("<img")<0&&hx.indexOf("<b>x")<0&&hx.indexOf("&lt;b&gt;x")>0&&hx.indexOf("&lt;img")>0,"name is escaped (no raw <img>/<b>)");
var hc=CE.html(recOf([4,4,4,4,4,2],null,"9<s>NGS</s>"));ok(hc.indexOf("<s>")<0,"class name escaped");
ok(/pc-nm s1/.test(CE.html(recOf([4,4,4,4,4,0],null,"","ក".repeat(10))))&&/pc-nm s2/.test(CE.html(recOf([4,4,4,4,4,0],null,"","ក".repeat(30))))&&/pc-nm s3/.test(CE.html(recOf([4,4,4,4,4,0],null,"","ក".repeat(40))))&&/pc-nm s4/.test(CE.html(recOf([4,4,4,4,4,0],null,"","ក".repeat(60)))),"name size classes by length");
ok(/pc-dots/.test(CE.html(recOf([4,4,4,4,4,0],null,""))),"empty name = dotted line");
ok(CE.dur(0)==="០ នាទី ០ វិនាទី"&&CE.dur(4322)==="១ ម៉ោង ១២ នាទី ២ វិនាទី"&&CE.dur(59)==="០ នាទី ៥៩ វិនាទី","duration text");
ok(CE.date(new Date(2026,10,24,10).getTime())==="ថ្ងៃទី២៤ ខែវិច្ឆិកា ឆ្នាំ២០២៦"&&CE.date(new Date(2027,0,5).getTime())==="ថ្ងៃទី៥ ខែមករា ឆ្នាំ២០២៧","Khmer date");

/* ===== ជំហាន ៧៖ gate · ពិន្ទុជាប់ · scope ===== */
function ok7(c,m){if(!c)B("S7 "+m)}
var T7=1.8e12,E9={on:true,g:9,l:3,t:T7+1e6,p:75,ext:[{k:"X01",n:"ក",h:"ab"}]};
var g1=PEXAM.gate({ex:E9},T7);ok7(g1.ok&&g1.g===9&&g1.l===3&&g1.dl===T7+1e6&&Math.abs(g1.pp-.75)<1e-9&&g1.ext.length===1,"gate ok");
ok7(!PEXAM.gate(null,T7).ok&&PEXAM.gate({},T7).why==="off"&&PEXAM.gate({ex:{on:false,g:9,l:3}},T7).why==="off"&&PEXAM.gate({ex:{on:"true",g:9,l:3}},T7).why==="off","gate off");
ok7(PEXAM.gate({ex:{on:true,g:10,l:3}},T7).why==="cfg"&&PEXAM.gate({ex:{on:true,g:9}},T7).why==="cfg","gate cfg");
ok7(PEXAM.gate({ex:E9},T7+1e6).why==="expired"&&PEXAM.gate({ex:E9},T7+1e6-1).ok,"gate expiry boundary");
ok7(PEXAM.gate({ex:E9},T7+2e6,true).ok,"gate expired but saved state → resume allowed");
ok7(PEXAM.gate({ex:{on:true,g:9,l:3,t:null}},T7*2).ok&&PEXAM.gate({ex:{on:true,g:9,l:3}},T7).dl===null,"no deadline = open");
ok7(Math.abs(PEXAM.gate({ex:{on:true,g:9,l:3}},T7).pp-.8)<1e-9&&Math.abs(PEXAM.gate({ex:{on:true,g:9,l:3,p:10}},T7).pp-.8)<1e-9,"default pass 80% (bad p ignored)");
ok7(PEXAM.need(24,.8)===20&&PEXAM.need(24,.75)===18&&PEXAM.need(24,1)===24&&PEXAM.need(24)===20&&PEXAM.need(24,.2)===20,"need(n,p)");
var s7=PEXAM.start(9,3,{now:T7,pp:.75,sc:"C1-X01"}).st;ok7(s7.pp===.75&&s7.sc==="C1-X01","start keeps pp/sc");
for(var i7=0;i7<6;i7++){PEXAM.submitSec(s7,i7,T7+1000)}
var q7=PEXAM.grade(s7);ok7(q7&&q7.need===18,"grade uses st.pp need="+(q7&&q7.need));
ok7(PEXAM.start(9,3,{now:T7}).st.pp===.8,"default pp .8");
ok7(PEXAM.xk(" x01 ")==="X01"&&PEXAM.xk("a<b>/c")==="ABC"&&PEXAM.xk("")==="","xk");
ok7(PEXAM.scOf("Ab_12-","x01")==="Ab12--x01"&&PEXAM.key(9,3,PEXAM.scOf("c1","x01"))==="pex_9_3_c1-x01","scOf/key scope");
PEXAM.cancel(9,3,"C1-X01");PEXAM.cancel(9,3,"");

/* ===== ត្រួតពិនិត្យការចាកចេញ tab ===== */
var sA=PEXAM.start(9,3,{now:T7,sc:"AW"}).st;
ok7(PEXAM.AWAY_MS===150000,"AWAY_MS");
ok7(PEXAM.awayOut(sA,T7+1000)&&sA.hid===T7+1000&&!PEXAM.awayOut(sA,T7+5000)&&sA.hid===T7+1000,"awayOut sets once");
ok7(!PEXAM.awayIn(sA,T7+1000+149999)&&!sA.hid&&!sA.aw,"149.9s not counted, hid cleared");
PEXAM.awayOut(sA,T7+2e5);ok7(PEXAM.awayIn(sA,T7+2e5+150000)&&sA.aw===1&&sA.awS===150&&!sA.hid,"150s counted");
PEXAM.awayOut(sA,T7+5e5);PEXAM.awayIn(sA,T7+5e5+300000);ok7(sA.aw===2&&sA.awS===450,"second absence accumulates");
ok7(!PEXAM.awayIn(sA,T7+9e6)&&sA.aw===2,"awayIn without hid is a no-op");
for(var iA=0;iA<6;iA++)PEXAM.submitSec(sA,iA,T7+1e6);
ok7(!PEXAM.awayOut(sA,T7+2e6),"no away tracking after exam finished");
var gA=PEXAM.grade(sA);ok7(gA.aw===2&&gA.awS===450,"grade carries aw/awS");
ok7(PEXAM.grade(PEXAM.start(9,3,{now:T7}).st.sec===0?(function(){var z=PEXAM.start(9,3,{now:T7}).st;for(var k=0;k<6;k++)PEXAM.submitSec(z,k,T7+1);return z})():null).aw===0,"aw defaults 0");
PEXAM.cancel(9,3,"AW");PEXAM.cancel(9,3,"");

/* ===== ថ្នាក់ទី ១២ ===== */
localStorage=Store(5e6);load("lsguard.js");
var G12=PX_.GR[12].G,n12=0,w12=0,big12=0;
function ok12(c,m){if(!c)B("G12 "+m)}
Object.keys(G12).forEach(function(l){for(var r=0;r<20;r++){
  var P;try{P=PEXAM.build(12,+l)}catch(e){B("G12 BUILD l"+l+" "+e);break}n12++;
  if(P.secs.length!==6||PEXAM.total(P)!==24||P.g!==12){B("G12 SHAPE l"+l);continue}
  var s0=PEXAM.pack(P),R=PEXAM.unpack(s0);if(!R||PEXAM.pack(R)!==s0){B("G12 ROUNDTRIP l"+l);continue}
  var seen={};
  R.secs.forEach(function(S){if(S.qs.length!==4)B("G12 NQ l"+l+" v"+S.v);S.qs.forEach(function(q){
    if(seen[q.q])B("G12 DUPQ l"+l);seen[q.q]=1;
    if(/undefined|NaN|\[object/.test(q.q+JSON.stringify(q.a)+q.s))B("G12 BADVAL l"+l+" v"+S.v+" "+q.kd);
    if(!bal(q.q)||!bal(q.s))B("G12 BAL l"+l+" v"+S.v+" "+q.kd);
    q.a.forEach(function(a){var c=PX_.check(a.v,a.v,a.k);if(!c.ok)B("G12 CHK l"+l+" v"+S.v+" "+q.kd+" "+a.v)});
    if(q.fig&&window.FIG){var h=FIG.svg(q.fig);if(h.indexOf("<svg")<0||h.indexOf("fig-err")>=0||/NaN|undefined|Infinity/.test(h))B("G12 FIG l"+l+" "+q.kd)}
  })});
  var x=PEXAM.start(12,+l,{now:T0,sc:"Z"});if(!x.saved)B("G12 not saved l"+l);
  var len=(localStorage.getItem("pex_12_"+l+"_Z")||"").length;w12=Math.max(w12,len);
  x.st.P.secs.forEach(function(S){S.qs.forEach(function(q){if(q.fig.length>PEXAM.FIGMAX)big12++})});
  var L=PEXAM.load(12,+l,"Z",T0+1000);if(!L||JSON.stringify(L)!==JSON.stringify(x.st))B("G12 refresh l"+l);
  PEXAM.cancel(12,+l,"Z")}});
ok12(w12<250000,"worst saved "+w12);
var t12=mk(12,22,{now:T0});
ok12([480,720,960,1200,1440,1440].every(function(v,i){return PEXAM.limit(t12,i)===v}),"limits g12");
ok12(PEXAM.totalLimit(t12)===104*60,"total 104 min "+PEXAM.totalLimit(t12));
var E12={on:true,g:12,l:22,t:T7+1e6,p:75},g12=PEXAM.gate({ex:E12},T7);
ok12(g12.ok&&g12.g===12&&g12.l===22&&Math.abs(g12.pp-.75)<1e-9,"gate g12");
ok12(PEXAM.gate({ex:{on:true,g:12}},T7).why==="cfg"&&PEXAM.gate({ex:{on:true,g:11,l:3}},T7).why==="cfg"&&PEXAM.gate({ex:{on:true,g:9,l:3}},T7).g===9,"gate cfg g12");
ok12(PEXAM.gate({ex:E12},T7+1e6).why==="expired"&&PEXAM.gate({ex:E12},T7+2e6,true).ok,"gate g12 expiry/resume");
/* keys ដាច់ពីថ្នាក់ទី ៩ */
PEXAM.start(9,3,{now:T0,sc:"K"});PEXAM.start(12,22,{now:T0,sc:"K"});
ok12(localStorage.getItem("pex_9_3_K")&&localStorage.getItem("pex_12_22_K")&&PEXAM.key(12,22)==="pex_12_22","separate keys");
PEXAM.cancel(9,3,"K");PEXAM.cancel(12,22,"K");
/* លទ្ធផល/វិញ្ញាបនបត្រ បង្ហាញ «ថ្នាក់ទី១២» */
var z12=PEXAM.start(12,22,{now:T7,sc:"C",cls:"12NGS-B",who:{k:"S1",n:"សិស្ស ក"}}).st;for(var k12=0;k12<6;k12++)PEXAM.submitSec(z12,k12,T7+1);
var rec12=PEXAM.mkRec(z12,PEXAM.grade(z12),T7+2),h12="";try{h12=PEXAM.cert.html(rec12)}catch(e){B("G12 cert threw "+e)}
ok12(rec12.g===12&&h12.indexOf("ថ្នាក់ទី១២")>=0,"cert shows ថ្នាក់ទី១២");
PEXAM.cancel(12,22,"C");
print("pexam g12: builds "+n12+" worst "+w12+"B bigFig "+big12);

print("pexam: made "+made+" figs "+figs+" maxbytes "+maxB+" bad "+bad);
