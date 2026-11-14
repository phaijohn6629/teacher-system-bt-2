/* 🧪 lsguard.js — ការពារ Browser Storage ពេញ
   ពិនិត្យ៖ sweep លុបតេស្តចាស់ (> ២១ ថ្ងៃ) តែមិនលុបចម្លើយមិនទាន់ផ្ញើ (pend_) និងតេស្តបច្ចុប្បន្ន · set ពេលពេញ → លុប cache រួចសរសេរបាន
         · មិនដែលលុប Login (firebase:*) / ការកំណត់ · ttl លុប cache hub ចាស់ · safeSrc (script.js) បដិសេធ src គ្រោះថ្នាក់
   ដំណើរការពីថតគម្រោង៖ jsc tests/storage.js */
function Store(quota){var d={},o={get length(){return Object.keys(d).length},key:function(i){return Object.keys(d)[i]||null},
  getItem:function(k){return k in d?d[k]:null},removeItem:function(k){delete d[k]},clear:function(){d={}},_d:d,
  setItem:function(k,v){v=String(v);var n=0;Object.keys(d).forEach(function(x){if(x!==k)n+=(x.length+d[x].length)*2});if(n+(k.length+v.length)*2>quota){var e=new Error("QuotaExceededError");e.name="QuotaExceededError";throw e}d[k]=v}};return o}
var window=this,console={log:print,warn:function(){},error:function(){}};
var localStorage=Store(5e6),sessionStorage=Store(5e6);
load("lsguard.js");
var bad=0,n=0;function ok(c,m){n++;if(!c){bad++;print("FAIL "+m)}}
var DAY=864e5,now=Date.now(),realNow=Date.now;
/* ---- sweep ---- */
localStorage.setItem("firebase:authUser:x","{}");localStorage.setItem("theme","dark");
["old1","old2","cur9","new3"].forEach(function(id){localStorage.setItem("T_"+id,"{}");localStorage.setItem("ans_"+id+"_S01","{}");localStorage.setItem("t0_"+id+"_S01","1")});
localStorage.setItem("pend_old2_S01","{\"a\":1}");
localStorage.setItem("lsT",JSON.stringify({old1:now-30*DAY,old2:now-30*DAY,cur9:now-40*DAY,new3:now-2*DAY}));
LSG.sweep("cur9");
ok(!localStorage.getItem("T_old1")&&!localStorage.getItem("ans_old1_S01"),"old test removed");
ok(localStorage.getItem("pend_old2_S01")&&localStorage.getItem("ans_old2_S01"),"pending answers kept");
ok(localStorage.getItem("T_cur9")&&localStorage.getItem("ans_cur9_S01"),"current test kept");
ok(localStorage.getItem("T_new3"),"recent test kept");
ok(localStorage.getItem("firebase:authUser:x")&&localStorage.getItem("theme"),"login/settings never touched");
/* ឧបករណ៍ចាស់ (គ្មាន lsT)៖ មិនលុបភ្លាម */
localStorage.removeItem("lsT");localStorage.setItem("T_legacy","{}");LSG.sweep("");ok(localStorage.getItem("T_legacy"),"legacy key not removed on first sight");
/* ---- set ពេលពេញ ---- */
var big=new Array(400001).join("x");   /* 800 KB */
for(var i=0;i<5;i++)localStorage.setItem("hub9_"+i,JSON.stringify({t:now,d:big.slice(0,350000)}));
localStorage.setItem("exC_a",big);
var r=LSG.set(localStorage,"ans_cur9_S02",big.slice(0,300000),"cur9");
ok(r===true&&localStorage.getItem("ans_cur9_S02"),"write succeeds after freeing caches");
ok(localStorage.getItem("firebase:authUser:x")&&localStorage.getItem("pend_old2_S01")&&localStorage.getItem("T_cur9"),"free keeps login, pending, current test");
/* ---- ttl ---- */
localStorage.setItem("hub9_99",JSON.stringify({t:now-40*DAY,d:null}));localStorage.setItem("hub9_98",JSON.stringify({t:now,d:null}));
LSG.ttl(/^hub\d+_\d+$/,30);ok(!localStorage.getItem("hub9_99")&&localStorage.getItem("hub9_98"),"ttl removes only old hub cache");
var u=LSG.usage();ok(u.local>0&&typeof u.session==="number","usage reported");
/* ---- safeSrc (script.js) ---- */
var src=read("script.js"),m=/function safeSrc\(u\)\{[^\n]*\}/.exec(src);ok(!!m,"safeSrc exists");eval(m[0]);
["data:image/jpeg;base64,/9j/4AAQ","https://lh3.googleusercontent.com/a=s96"].forEach(function(x){ok(safeSrc(x)===x,"safeSrc accepts "+x)});
["x' onerror='alert(1)","data:image/png;base64,AA' onerror=alert(1) x='","javascript:alert(1)","http://e.com/a.png","data:text/html;base64,PHNjcmlwdD4=","https://e.com/a\"onload=1"].forEach(function(x){ok(safeSrc(x)==="","safeSrc rejects "+x)});
print("storage: checks "+n+" bad "+bad);
