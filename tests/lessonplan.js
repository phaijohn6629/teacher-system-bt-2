/* 🧪 script.js កិច្ចតែងការ ៖ lpMath មិនគាំង (KaTeX បោះកំហុស → អត្ថបទដើម) · < > & " ' ត្រូវ esc · lpEdit round-trip (Khmer · quotes) · ទិន្នន័យខូច — ដំណើរការ៖ jsc tests/lessonplan.js */
var bad=0,n=0;function ok(c,m){n++;if(!c){bad++;print("FAIL "+m)}}
var S=read("script.js"),window={},LPE=null,store={};
var localStorage={getItem:function(k){return k in store?store[k]:null},setItem:function(k,v){store[k]=String(v)},removeItem:function(k){delete store[k]}};
function alert(){}var console={warn:function(){}};
function cut(a,b){var i=S.indexOf(a),j=S.indexOf(b,i);if(i<0||j<0)throw new Error("marker "+a);return S.slice(i,j)}
eval(cut("function esc(s)","function safeSrc")+"function safeSrc(u){return\"\"}"+cut("function lpSplit(s){","/* 📈 រូបភាពគូរស្វ័យប្រវត្តិ")+cut("function lpSArr","function lpApplyEdit"));
/* KaTeX ក្លែង៖ បោះកំហុសពេល { } មិនគូ ឬ \foo */
function bal(s){var d=0;for(var i=0;i<s.length;i++){if(s[i]==="{")d++;if(s[i]==="}"&&--d<0)return false}return d===0}
window.katex={renderToString:function(s,o){if(!bal(s)||/\\foo/.test(s)){if(o.throwOnError)throw new Error("ParseError");return"<span class=katex-error>"+s+"</span>"}return"<span class=katex>"+s+"</span>"}};
var LT="<",GT=">";
var h=lpMath("តម្លៃ $x^{2$ ចប់");ok(h.indexOf("katex-error")<0&&h.indexOf("$x^{2$")>=0,"unmatched { → raw text: "+h);
h=lpMath("តម្លៃ $x^2}$ ចប់");ok(h.indexOf("katex-error")<0&&h.indexOf("$x^2}$")>=0,"unmatched } → raw text");
h=lpMath("$\\foo{1}$");ok(h==="$\\foo{1}$","unknown command → raw");
h=lpMath("គណនា $x ហើយ");ok(h.indexOf("គណនា")>=0&&h.indexOf("ហើយ")>=0&&h.indexOf("$")>=0,"lone $ → no crash, text kept: "+h);
h=lpMath("x "+LT+" 5 "+LT+"b"+GT+"B"+LT+"/b"+GT+" "+LT+"script"+GT);ok(h.indexOf(LT+"b"+GT)<0&&h.indexOf(LT+"script")<0&&h.indexOf("&lt;")>=0,"< > escaped in text: "+h);
h=lpMath("$x"+LT+"5$");ok(h.indexOf("katex")>=0&&h.indexOf(LT+"b")<0,"inequality in math renders");
h=lpMath("\"សួស្ដី\" 'ល្អ'");ok(h.indexOf("&quot;")>=0&&h.indexOf("&#39;")>=0&&h.indexOf("សួស្ដី")>=0,"quotes + Khmer escaped");
ok(lpMath(null)==="","null → empty");
window.katex={renderToString:function(){throw new Error("boom")}};
h=lpMath("$a$ x "+LT+" y");ok(h.indexOf("$a$")>=0&&h.indexOf("&lt;")>=0,"renderer always throws → still raw text");
window.katex=null;h=lpMath("$a$ "+LT+"i"+GT);ok(h.indexOf(LT+"i")<0,"no katex loaded → esc");
/* lpEdit */
var o={title:"ចំណងជើង \"q\" 'q' "+LT+"b"+GT,obj:{knowledge:["x "+LT+" 5","$a^{2$"],skills:[],attitude:[]},mat:{st:["ក"],tc:["ខ"]},steps:[{tc:["គ្រូ \"១\""],ct:["'២' ខ្មែរ\\n"],st:[]}],ws:["ល១ $x"+LT+"5$"]};
LPE={"12_11#1":o};ok(lpESave()===true,"save ok");LPE=null;
ok(JSON.stringify(lpELoad()["12_11#1"])===JSON.stringify(o),"round-trip equal (quotes · Khmer · < >)");
store.lpEdit="{bad json \"";LPE=null;ok(Object.keys(lpELoad()).length===0&&store.lpEdit_bad==="{bad json \"","corrupt JSON → empty + backup");
store.lpEdit=JSON.stringify({a:{steps:"x",obj:5,mat:{st:"s",tc:7},ws:{}},b:null,c:[1],d:{steps:[null,{tc:"t"}]},e:{title:7,steps:[{tc:[1,null,"z"]}]}});LPE=null;
var w=lpELoad();ok(!w.b&&!w.c,"null / array entries dropped");ok(Array.isArray(w.a.mat.st)&&Array.isArray(w.d.steps[1].tc),"fields coerced to arrays");
ok(w.e.title===undefined&&w.e.steps[0].tc.join("|")==="1||z","non-string values coerced");
print("lessonplan: checks "+n+" bad "+bad);
