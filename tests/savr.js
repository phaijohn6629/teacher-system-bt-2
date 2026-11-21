/* 🧪 savR (បញ្ជីសិស្ស)៖ sessionStorage ពេញ/បោះកំហុស → push("rs") នៅតែរត់ · ប៊ូតុងរក្សាទុក p8 ក្នុង SVK — ដំណើរការ៖ jsc tests/savr.js */
var bad=0,n=0;function ok(c,m){n++;if(!c){bad++;print("FAIL "+m)}}
var S=read("script.js"),pushed=[],RK="k-r",rs={c:{}},window=this,LSG=null,store;
function push(k){pushed.push(k)}
var a=S.indexOf("function savR()"),b=S.indexOf("\n",a);eval(S.slice(a,b));
store={setItem:function(){throw new Error("QuotaExceededError")}};var sessionStorage=store;
savR();ok(pushed.join()==="rs","push runs even when sessionStorage throws");
sessionStorage={setItem:function(k,v){this[k]=v}};pushed=[];savR();ok(pushed.join()==="rs"&&sessionStorage[RK]==='{"c":{}}',"normal path stores + pushes");
LSG={set:function(){throw new Error("x")}};pushed=[];savR();ok(pushed.join()==="rs","push runs when LSG.set throws");
ok(/var SVK=\{[^}]*p8:"rs"/.test(S),"save button registered for students panel (p8 → rs)");
ok(/visibilitychange[^\n]*sy\.dirty[^\n]*flush\(k\)/.test(S),"dirty keys flushed when page hidden");
print("savr: checks "+n+" bad "+bad);
