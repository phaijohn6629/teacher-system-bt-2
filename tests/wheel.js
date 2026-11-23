/* 🧪 wheel.js៖ គណិតកង (មុំ ↔ អ្នកឈ្នះ) · ចែកក្រុម · មិនសរសេរ rs/savR/push · ភ្ជាប់ tab — ដំណើរការ៖ jsc tests/wheel.js */
var bad=0,n=0;function ok(c,m){n++;if(!c){bad++;print("FAIL "+m)}}
var window=this,esc=function(s){return String(s)};
var S=read("wheel.js");eval(S);var W=window.WHEEL;
ok(!!W&&typeof W.render==="function","WHEEL.render exists");
for(var N=2;N<=40;N++){for(var w=0;w<N;w++){var r=W._targetRot(Math.random()*20,w,N);if(W._winnerAt(r,N)!==w){ok(false,"winner "+w+"/"+N);break}}}
ok(true,"targetRot ↔ winnerAt for N=2..40");
var names=[];for(var i=0;i<31;i++)names.push("s"+i);
for(var k=2;k<=10;k++){var t=W._splitTeams(names,k),sz=t.map(function(x){return x.length}),all=[].concat.apply([],t);
  ok(t.length===k&&all.length===31&&new Set(all).size===31&&Math.max.apply(0,sz)-Math.min.apply(0,sz)<=1,"split "+k+" equal+complete")}
var c={n:"9A",st:[{n:"ក",id:"1"},{n:"ខ"},{n:"គ",id:"3"}],org:{n:3,r:{"i:1":{g:1,ro:"gl"},"n:ខ":{g:1},"i:3":{g:3}}}};
var g=W._groups(c);ok(g.length===2&&g[0].m.length===2&&/3|៣/.test(g[1].label),"groups read from c.org (empty groups skipped)");
ok(JSON.stringify(c).indexOf("whCustom")<0,"c untouched");
/* មិនសរសេរទិន្នន័យថ្នាក់ */
ok(!/\bsavR\s*\(|(^|[^.\w])push\s*\(|window\.FB|firebase|Firestore|setDoc|updateDoc|\brs\s*\.|sessionStorage/.test(S.replace(/\/\*[\s\S]*?\*\//g,"")),"wheel.js never touches rs/savR/push/Firestore/sessionStorage");
ok(/localStorage/.test(S)&&!/localStorage\.(set|get)Item\([^)]*(rs|org|seat)/.test(S),"localStorage only for custom list");
/* ភ្ជាប់ក្នុងកម្មវិធី */
var C=read("classorg.js"),H=read("index.html");
ok(/ogV==="wheel"\)return window\.WHEEL/.test(C),"classorg renderOrg dispatches to WHEEL");
ok(/data-ov="wheel"/.test(H)&&/wheel\.js\?v=\d+/.test(H),"tab button + script tag in index.html");
ok(H.indexOf("wheel.js")>H.indexOf("classorg.js"),"wheel.js loaded after classorg.js");
print("wheel: checks "+n+" bad "+bad);
