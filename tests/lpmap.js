/* 🧪 LPMAP (script.js) ៖ វិធីសាស្ត្រ/យុទ្ធវិធី ត្រូវមាន គោលបំណង · លទ្ធផល · ជំហានលម្អិត · សកម្មភាពគ្រូ/សិស្សតាមជំហាន (at) · lpFlow មិនស្ទួនស្លាក
   ដំណើរការពីថតគម្រោង៖ jsc tests/lpmap.js */
var bad=0,n=0;function ok(c,m){n++;if(!c){bad++;print("FAIL "+m)}}
var S=read("script.js");
function blk(startRe,endRe){var i=S.search(startRe);var r=S.slice(i);var j=r.search(endRe);return r.slice(0,j)}
var mapSrc=blk(/var LPMAP=\{/,/\nLPM=Object\.keys/).replace(/,\s*$/,"")+";";
var lpdSrc=blk(/var LPD=\{/,/\nObject\.assign\(LPD,/),lpd2=blk(/Object\.assign\(LPD,\{/,/\nfunction lpDetail/);
var fmSrc=blk(/var LPFM=\{/,/\nObject\.assign\(LPFM,/),fm2=blk(/Object\.assign\(LPFM,\{/,/\nfunction lpFlowKey/);
eval(mapSrc+lpdSrc+lpd2+fmSrc+fm2);
var stg=S.match(/var LPSTG=(\/.*\/);/);ok(!!stg,"LPSTG found");var LPSTG=eval(stg[1]);
function kn(x){return x}
var flowSrc=blk(/function lpFlow\(S,i\)\{/,/\n\}\n/)+"\n}";
var lpFlowKey=function(id,M){return window.__k[id]};var window=this;window.__k={};
eval(flowSrc);
["m","s"].forEach(function(t){
  var M=LPMAP[t],F=t==="m"?LPFM:LPFT;
  Object.keys(M).forEach(function(k){var R=M[k];
    ok(R.b&&R.b.indexOf(k)===0,t+":"+k+" label starts with key");
    ok(R.why&&R.why.length>15&&R.out&&R.out.length>15,t+":"+k+" has purpose + outcome");
    ok(Array.isArray(LPD[k])&&LPD[k].length>=3,t+":"+k+" has detailed steps (LPD)");
    ok(F[k],t+":"+k+" has per-step activities");
    Object.keys(R.at).forEach(function(i){var a=F[k]&&F[k][i];ok(a&&a.tc&&a.tc.length&&a.st&&a.st.length&&a.tc.every(function(x){return typeof x==="string"&&x})&&a.st.every(function(x){return typeof x==="string"&&x}),t+":"+k+" step "+i+" has tc+st")});
    Object.keys(F[k]||{}).forEach(function(i){ok(R.at[i]!==undefined,t+":"+k+" activity step "+i+" is declared in at")});
  });
});
ok(Object.keys(LPMAP.m).length>=9&&Object.keys(LPMAP.s).length>=9,"methods and strategies lists extended");
["IBL","PBL","PrBL","Flipped Classroom","Discovery","Inductive","Deductive"].forEach(function(k){ok(LPMAP.m[k],"method "+k)});
["World Café","Jigsaw","Gallery Walk","KWL","Carousel","Reciprocal Teaching"].forEach(function(k){ok(LPMAP.s[k],"strategy "+k)});
/* lpFlow ៖ មិនស្ទួនស្លាកដំណាក់កាលដែលទិន្នន័យមានរួច */
var $=function(){return{}};
window.__k={lpM:"5Es",lpT:"Think-Pair-Share"};
var own={tc:["[២. Explore ស្វែងរក] ខ្លួនឯង"],st:["[២. Explore ស្វែងរក] ខ្លួនឯង"]},r=lpFlow(own,2);
ok(r.tc.filter(function(x){return/Explore/.test(x)}).length===1,"lpFlow does not repeat a stage tag already in the plan");
ok(r.tc.some(function(x){return/Explain/.test(x)}),"lpFlow still adds the missing Explain stage");
var r2=lpFlow({tc:["សួរសំណួរ"],st:["ឆ្លើយ"]},2);
ok(r2.tc.some(function(x){return/Explore/.test(x)})&&r2.tc.some(function(x){return/Explain/.test(x)}),"5Es step 3 gets Explore + Explain when plan has none");
var r3=lpFlow({tc:[],st:[]},3);
ok(r3.tc.some(function(x){return/Elaborate/.test(x)})&&r3.tc.some(function(x){return/TPS|Think/.test(x)}),"step 4 gets Elaborate + the strategy (TPS)");
print("lpmap: checks "+n+" bad "+bad);
