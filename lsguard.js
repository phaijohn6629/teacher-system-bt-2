/* ========================================================================
   🧹 LSG — ការពារ Browser Storage ពេញ (QuotaExceededError ~5 MB) · ប្រើគ្រប់ទំព័រ
   - LSG.set(st,k,v)៖ សរសេរ · ពេញ → សម្អាត cache ដែលអាចទាញមកវិញបាន (free) រួចសាកម្ដងទៀត
   - LSG.sweep(cur)៖ ទំព័រសិស្ស (test.html · exam.html)៖ លុប key របស់តេស្ត/ប្រឡងដែលមិនបានបើក > ២១ ថ្ងៃ
       (ចម្លើយមិនទាន់ផ្ញើ pend_… មិនលុបជាដាច់ខាត) · សន្ទស្សន៍ lsT = {id: ពេលបើកចុងក្រោយ}
   - LSG.ttl(prefix,days)៖ លុប cache ចាស់ (hub…) តាមពេលវេលាក្នុង JSON {t}
   - LSG.usage()៖ ទំហំប្រើ (bytes · UTF-16) សម្រាប់ផ្ទាំងការកំណត់ Admin
   មិនដែលលុប៖ ចម្លើយមិនទាន់ផ្ញើ · ព័ត៌មាន Login (firebase:*) · ការកំណត់អ្នកប្រើ
   ======================================================================== */
(function(){
"use strict";
var DAY=864e5,KEEP_DAYS=21;
function S(st){try{return st||localStorage}catch(e){return null}}
function keys(st){var a=[];try{for(var i=0;i<st.length;i++)a.push(st.key(i))}catch(e){}return a}
function bytes(st){var n=0;keys(st).forEach(function(k){try{n+=(k.length+(st.getItem(k)||"").length)*2}catch(e){}});return n}
function del(st,k){try{st.removeItem(k)}catch(e){}}
/* key ក្នុងមួយតេស្ត/ប្រឡង (id = មុន "_" ដំបូង) */
var IDK=/^(T_|cur_|exk_|exm_|exp_)([A-Za-z0-9-]+)$/,
    STK=/^(ans_|t0_|st_|stok_|sent_|pc_|dv_|ac_|rl_|sq_|pend_)([A-Za-z0-9-]+)_/;
function idOf(k){var m=IDK.exec(k);if(m)return m[2];m=STK.exec(k);return m?m[2]:null}
/* cache ដែលអាចទាញពី Cloud មកវិញ · តាមលំដាប់លុបមុន */
var FREE=[/^hub\d+_\d+$/,/^exC_/,/^exCi$/,/^syS_/,/^exList_/,/^(T_|exp_|exm_|exk_)/];
function free(st,keep,cur){
  st=S(st);if(!st)return 0;var got=0;
  for(var i=0;i<FREE.length;i++){
    keys(st).forEach(function(k){if(k===keep||!FREE[i].test(k))return;if(cur&&idOf(k)===cur)return;try{got+=(k.length+(st.getItem(k)||"").length)*2}catch(e){}del(st,k)});
    if(got>200000)break;
  }
  if(window.console)console.warn("LSG free:",got,"bytes");
  return got;
}
function set(st,k,v,cur){
  st=S(st);if(!st)return false;
  try{st.setItem(k,v);return true}catch(e){}
  free(st,k,cur);
  try{st.setItem(k,v);return true}catch(e){if(window.console)console.error("LSG: storage full",k);return false}
}
function sweep(cur){
  var st=S();if(!st)return;var idx={};try{idx=JSON.parse(st.getItem("lsT")||"{}")||{}}catch(e){idx={}}
  var now=Date.now(),ks=keys(st),pend={},seen={};
  ks.forEach(function(k){var id=idOf(k);if(!id)return;seen[id]=1;if(/^pend_/.test(k))pend[id]=1});
  if(cur)idx[cur]=now;
  Object.keys(seen).forEach(function(id){if(!idx[id])idx[id]=now});   /* ឃើញលើកដំបូង (ឧបករណ៍ចាស់) → រាប់ពីថ្ងៃនេះ */
  var drop={};Object.keys(idx).forEach(function(id){if(id!==cur&&now-idx[id]>KEEP_DAYS*DAY&&!pend[id])drop[id]=1});
  ks.forEach(function(k){var id=idOf(k);if(id&&drop[id])del(st,k)});
  Object.keys(drop).forEach(function(id){delete idx[id]});
  Object.keys(idx).forEach(function(id){if(!seen[id]&&id!==cur)delete idx[id]});
  try{st.setItem("lsT",JSON.stringify(idx))}catch(e){}
}
function ttl(re,days,st){
  st=S(st);if(!st)return;var lim=Date.now()-days*DAY;
  keys(st).forEach(function(k){if(!re.test(k))return;var t=0;try{t=(JSON.parse(st.getItem(k))||{}).t||0}catch(e){}if(t&&t<lim)del(st,k)});
}
window.LSG={set:set,free:free,sweep:sweep,ttl:ttl,keys:keys,usage:function(){var a=0,b=0;try{a=bytes(localStorage)}catch(e){}try{b=bytes(sessionStorage)}catch(e){}return{local:a,session:b}}};
})();
