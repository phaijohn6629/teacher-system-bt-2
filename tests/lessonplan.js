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
/* 📋 ទិន្នន័យកិច្ចតែងការ (lp7–lp12 · lessonplans.js)៖ ជំហានទី៤ «ពង្រឹងពុទ្ធិ» ជួរ «ខ្លឹមសារមេរៀន» (ct) មិនត្រូវទទេ ឬមានតែស្លាកដំណាក់កាល (Evaluate…)
   — ចន្លោះដែលស្គាល់ពីការបំប្លែង .docx ស្ថិតក្នុង LP4_KNOWN (ត្រូវបំពេញបន្ថែម · ពេលបំពេញរួច ត្រូវដកចេញពីបញ្ជី) · ផែនការថ្មី/ផ្សេងត្រូវតែគ្រប់ */
var LP4_KNOWN=["7_13#3","7_13#4","7_14#1","7_14#3","7_15#2","7_16#1","7_17#1","7_17#2","7_19#3","7_1#5","7_4#4","7_5#3","7_6#1","7_8#1","7_8#5","7_9#3","9_15#2","11_22#4","11_61#1","11_61#2"];
var LP4_LAB=/^\s*(Engage|Explore|Explain|Elaborate|Evaluate)\s*$/i;
function lp4Bad(P){var st=P&&P.steps&&P.steps[3],ct=((st&&st.ct)||[]).filter(function(x){return String(x).trim()});return!ct.length||ct.every(function(x){return LP4_LAB.test(x)})}
window={};["lp7.js","lp8.js","lp9.js","lp10.js","lp11.js","lp12.js"].forEach(function(f){eval(read(f))});
var LPD4=window.LP_DB,lp4new=[],lp4fixed=[];
Object.keys(LPD4).forEach(function(k){var b=lp4Bad(LPD4[k]),kn=LP4_KNOWN.indexOf(k)>=0;if(b&&!kn)lp4new.push(k);if(!b&&kn)lp4fixed.push(k)});
ok(lp4new.length===0,"step 4 content empty/label-only in plans not in LP4_KNOWN: "+lp4new.join(", "));
ok(lp4fixed.length===0,"plans in LP4_KNOWN now fine → remove from list: "+lp4fixed.join(", "));
ok(LPD4["10_21#1"]===LPD4["10_21#2"]&&!lp4Bad(LPD4["10_21#1"])&&LPD4["10_21#1"].steps[3].ct.length>=5,"10_21 (logic) step 4 has a real exercise + answer");
var c4=LPD4["10_21#1"].steps[3].ct.join("|");ok(/ចម្លើយ/.test(c4)&&/wedge/.test(c4)&&/vee/.test(c4),"10_21 step 4 exercise covers ∧ ∨ and gives answers");
ok(LP4_KNOWN.every(function(k){return!!LPD4[k]}),"LP4_KNOWN keys exist");
print("lessonplan: checks "+n+" bad "+bad);
