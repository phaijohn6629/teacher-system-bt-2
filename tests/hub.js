/* 🧪 hub.js — ផ្ទាំងសិក្សា (មេរៀនសង្ខេប · រូបមន្ត · គន្លឹះ · វីដេអូ)
   ពិនិត្យ៖ មាតិកាគំរូថ្នាក់ទី៩ គ្រប់មេរៀន · គ្រប់កម្រិតមានយ៉ាងតិច ១ ចំណុចរង · $ និង {} គ្រប់គូ · គ្មានអក្សរខ្មែរក្នុង $…$ / រូបមន្ត
         · តំណវីដេអូ (YouTube · Drive · MP4) ត្រឹមត្រូវ និងបដិសេធតំណមិនសុវត្ថិភាព · អត្ថបទគ្រូត្រូវបាន escape
   ដំណើរការពីថតគម្រោង៖ jsc tests/hub.js */
var H=function(){return P};var P=new Proxy(H,{get:function(t,k){if(k===Symbol.toPrimitive)return function(){return""};if(k==="length")return 0;return P},apply:function(){return P},construct:function(){return P}});
var window=this;var document=P,localStorage={_:{},getItem:function(k){return this._[k]||null},setItem:function(k,v){this._[k]=String(v)},removeItem:function(k){delete this._[k]}},location={hash:"",search:""},navigator={},setInterval=function(){},setTimeout=function(){},addEventListener=function(){},console={log:print,error:print,warn:print};
eval(read("practice.js"));eval(read("practice9.js"));eval(read("hub.js"));
var bad=0,n=0,KH=/[ក-៿]/;
function B(m){bad++;if(bad<25)print(m)}
function bal(t){var d=(String(t).match(/\$/g)||[]).length;if(d%2)return false;var c=0;for(var i=0;i<t.length;i++){if(t[i]==="{")c++;else if(t[i]==="}"){c--;if(c<0)return false}}return c===0}
function mathKh(t){var m=String(t).replace(/\$\$[\s\S]*?\$\$|\$[^$]*\$/g,function(x){return KH.test(x)?"\u0000":""});return m.indexOf("\u0000")>=0}
var LES=PRACT.GR[9].les,ids=[];LES.forEach(function(c){c[1].forEach(function(x){ids.push(x[0])})});
ids.forEach(function(l){
  var s=HUB.starter(9,l);if(!s||!s.length){B("NO STARTER l"+l);return}
  s.forEach(function(x){n++;if(/^🎬/.test(x.t)){if(!HUB.vparse(x.v))B("BAD VIDEO l"+l+" "+x.v);return}
    if(!x.t||!x.s||!x.f||!x.f.length||!x.k)B("INCOMPLETE l"+l+" "+x.t);
    [x.s,x.k].concat((x.ex||[]).reduce(function(a,e){return a.concat(e)},[])).forEach(function(t){if(!bal(t))B("BAL l"+l+" "+String(t).slice(0,60));if(mathKh(t))B("KH-IN-MATH l"+l+" "+String(t).slice(0,80))});
    x.f.forEach(function(f){if(KH.test(f))B("KH-IN-FORMULA l"+l+" "+f);if(!bal(f)||/\$/.test(f))B("FBAL l"+l+" "+f)});
    (x.lv||[]).forEach(function(v){if(HUB.LV.indexOf(v)<0)B("LV l"+l+" "+v)});
  });
  HUB.LV.forEach(function(v){var h=HUB.html(9,l,v,"x",false);var k=(h.match(/class=hub-s /g)||[]).length;if(!k)B("EMPTY l"+l+" v"+v);if(!bal(h.replace(/<[^>]*>/g,"")))B("HTMLBAL l"+l+" v"+v)});
  if(HUB.html(9,l,4,"x",false).indexOf("🌐")<0)B("NO PISA SUB l"+l);
});
/* ថ្នាក់គ្មានមាតិកាគំរូ → ទូទៅ (មិនទទេ) · Cambridge ជាភាសាអង់គ្លេស */
[7,8,10,11,12].forEach(function(g){var h=HUB.html(g,1,1,"ឈ្មោះមេរៀន",false);if(h.indexOf("ឈ្មោះមេរៀន")<0)B("GENERIC g"+g)});
if(KH.test(HUB.html(110,1,1,"Number",true).replace(/data-[a-z]+='[^']*'/g,"")))B("KH-IN-EN generic");
/* គ្រូកែ (cache) មានអាទិភាព · escape */
HUB.put(9,1,{subs:[{t:"<script>x</script>",s:"<img src=x onerror=alert(1)>",f:["x^2"],k:"",ex:[],v:"javascript:alert(1)"}]});
var h=HUB.html(9,1,1,"x",false);if(/<script>|<img/.test(h))B("XSS not escaped");if(/data-hubv/.test(h))B("unsafe video accepted");if(h.indexOf("✍️")<0)B("teacher badge missing");HUB.clear(9,1);
if(HUB.html(9,1,1,"x",false).indexOf("១.១")<0)B("clear → starter failed");
/* វីដេអូ */
[["https://www.youtube.com/watch?v=dQw4w9WgXcQ","yt"],["https://youtu.be/dQw4w9WgXcQ?t=3","yt"],["https://youtube.com/shorts/dQw4w9WgXcQ","yt"],["https://m.youtube.com/watch?feature=x&v=dQw4w9WgXcQ","yt"],
 ["https://drive.google.com/file/d/1AbCdEfGhIjKlMnOpQrStUvWxYz012345/view?usp=sharing","gd"],["https://drive.google.com/open?id=1AbCdEfGhIjKlMnOpQrStUvWxYz012345","gd"],
 ["https://example.org/manim/scene.mp4","mp4"],["https://example.org/v.webm?x=1","mp4"]].forEach(function(t){var v=HUB.vparse(t[0]);if(!v||v.k!==t[1])B("VIDEO "+t[0])});
["http://youtu.be/dQw4w9WgXcQ","javascript:alert(1)","https://evil.example/x","https://example.org/a.mp4\"><script>","data:video/mp4;base64,AAA",""].forEach(function(u){if(HUB.vparse(u))B("VIDEO accepted "+u)});
/* 🎬 VIDEOS (tools/upload_youtube.py)៖ គន្លឹះ g_l_i · តំណវីដេអូត្រឹមត្រូវ */
Object.keys(HUB.VIDEOS).forEach(function(k){var v=HUB.VIDEOS[k];n++;if(!/^\d+_\d+_\d+$/.test(k)||!v||!HUB.vparse(v.u))B("VIDEOS "+k)});
print("hub: subtopics "+n+" bad "+bad);
