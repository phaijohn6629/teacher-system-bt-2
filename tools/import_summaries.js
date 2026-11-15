#!/usr/bin/env node
/* 📥 នាំចូលមេរៀនសង្ខេប (ផ្ទាំងសិក្សាហ្វឹកហាត់) ពី data/summaries_data.json → hubdata.js (window.HUBDATA)
   hub.js បញ្ចូល HUBDATA ទៅ STARTER (ថ្នាក់ដែលមិនទាន់មាន៖ 7 · 8 · 10 · 11 …) · ថ្នាក់ 9 និង 12 មានស្រាប់ក្នុង hub.js → មិនជាន់ (លុះត្រា --force)

   ប្រើ (ពីថតគម្រោង)៖
     node tools/import_summaries.js --check     # ពិនិត្យតែប៉ុណ្ណោះ (មិនសរសេរ)
     node tools/import_summaries.js             # ពិនិត្យ → បើគ្មានកំហុស សរសេរ hubdata.js
     node tools/import_summaries.js --file data/x.json
   បន្ទាប់៖ python3 tools/bump.py && ./tests/run.sh · ដំឡើង sw.js · commit/push

   ទម្រង់ JSON (មើល data/summaries_data.example.json)៖
     { "11": { "22": [ { "t":"២២.១ ចំណងជើង", "lv":[1,2], "s":"សង្ខេប $…$", "f":["\\frac{a}{b}", …], "k":"- គន្លឹះ", "ex":[["សំណួរ $…$","ចម្លើយ $…$"]] } ] } }
     lv = កម្រិតដែលបង្ហាញ ៖ 1 2 3 4 5 និង "pisa" (ទុកទទេ [] = គ្រប់កម្រិត) · f = LaTeX សុទ្ធ (គ្មាន $ គ្មានអក្សរខ្មែរ)
     ⚠️ ក្នុង JSON ត្រូវសរសេរ \\ ពីរ ៖ "\\frac" "\\sqrt" (បើ "\frac" → JSON ប្ដូរ \f ជាតួអក្សរបញ្ជា) */
"use strict";
const fs=require("fs"),path=require("path"),vm=require("vm");
const ROOT=path.join(__dirname,".."),A=process.argv.slice(2),arg=k=>{const i=A.indexOf(k);return i>=0?A[i+1]:null};
const SRC=path.resolve(ROOT,arg("--file")||"data/summaries_data.json"),OUT=path.join(ROOT,"hubdata.js"),CHECK=A.includes("--check"),FORCE=A.includes("--force");
const LVK={1:1,2:5,3:2,4:6,5:3,pisa:4};                 /* កម្រិតបង្ហាញ → គន្លឹះខាងក្នុង (LVO=[1,5,2,6,3,4]) */
const LVN={1:"L1",5:"L2",2:"L3",6:"L4",3:"L5",4:"PISA"};
const BUILTIN={9:1,12:1};                               /* មានក្នុង hub.js រួចហើយ */
const KH=/[\u1780-\u17FF]/,CTRL=/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/;
const errs=[],warns=[];const E=(w,m)=>errs.push(w+" ៖ "+m),W=(w,m)=>warns.push(w+" ៖ "+m);

/* បញ្ជីមេរៀនពិតពី practice*.js (វ៉ិចទ័រ stub ដូច tests/) */
function lessons(){
  const P=new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>"":k==="length"?0:P,apply:()=>P,construct:()=>P});
  const ctx={document:P,localStorage:{getItem:()=>null,setItem(){},removeItem(){}},location:{hash:"",search:""},navigator:{},setInterval(){},setTimeout(){},addEventListener(){},console:{log(){},warn(){},error(){}}};
  ctx.window=ctx;vm.createContext(ctx);
  for(const f of ["practice.js","practice7.js","practice8.js","practice10.js","practice11.js"])vm.runInContext(fs.readFileSync(path.join(ROOT,f),"utf8"),ctx,{filename:f});
  const out={};for(const g of Object.keys(ctx.PRACT.GR)){const L={};(ctx.PRACT.GR[g].les||[]).forEach(c=>c[1].forEach(x=>L[x[0]]=x[1]));out[g]=L}
  return out;
}
/* $ គូ · {} គូក្នុង $…$ · គ្មានខ្មែរ/ចុះបន្ទាត់ក្នុង $…$ · ពាក្យ LaTeX ខ្វះ \ */
function mathCheck(w,t){
  if(typeof t!=="string"){E(w,"ត្រូវតែជាអក្សរ (string)");return}
  if(CTRL.test(t))E(w,"មានតួអក្សរបញ្ជា — ប្រហែលសរសេរ \"\\frac\" ក្នុង JSON ត្រូវជា \"\\\\frac\"");
  const body=t.replace(/\\\$/g,"");
  if(((body.match(/\$/g)||[]).length)%2)E(w,"សញ្ញា $ មិនគូ ៖ "+t.slice(0,70));
  (body.match(/\$\$[\s\S]*?\$\$|\$[^$]*\$/g)||[]).forEach(m=>{
    if(KH.test(m))E(w,"អក្សរខ្មែរនៅក្នុង "+m.slice(0,50));
    if(!/^\$\$/.test(m)&&/\n/.test(m))E(w,"ចុះបន្ទាត់ក្នុង $…$ (ប្រហែល \"\\n…\" ត្រូវជា \"\\\\n…\") ៖ "+m.slice(0,50));
    braces(w,m);latexWords(w,m)});
}
function braces(w,m){let b=0;for(let i=0;i<m.length;i++){if(m[i]==="\\"){i++;continue}if(m[i]==="{")b++;if(m[i]==="}"&&--b<0)break}if(b)E(w,"វង់ក្រចក {} មិនគូ ៖ "+m.slice(0,60))}
function latexWords(w,m){const r=/(^|[^\\a-zA-Z])(frac|dfrac|sqrt|times|cdot|infty|lim|left|right|overrightarrow|vec|alpha|beta|theta|pi|le|ge|ne)(?![a-zA-Z])/;const x=r.exec(m.replace(/\\[a-zA-Z]+/g," "));if(x&&!/^(le|ge|ne|pi|lim)$/.test(x[2]))W(w,"«"+x[2]+"» ខ្វះ \\ ? ៖ "+m.slice(0,60))}

function main(){
  if(!fs.existsSync(SRC)){console.error("❌ រកមិនឃើញ "+path.relative(ROOT,SRC)+" (មើលគំរូ data/summaries_data.example.json)");process.exit(1)}
  let D;try{D=JSON.parse(fs.readFileSync(SRC,"utf8"))}catch(e){console.error("❌ JSON មិនត្រឹមត្រូវ ៖ "+e.message);process.exit(1)}
  const LS=lessons(),out={};let nl=0,ns=0;
  for(const g of Object.keys(D)){
    if(BUILTIN[g]&&!FORCE){E("ថ្នាក់ "+g,"មានមេរៀនសង្ខេបក្នុង hub.js រួចហើយ (ប្រើ --force ដើម្បីបន្ថែមតែមេរៀនដែលមិនទាន់មាន)");continue}
    if(!LS[g]){E("ថ្នាក់ "+g,"មិនមានក្នុង practice*.js (ថ្នាក់ 7 8 10 11 …)");continue}
    out[g]={};
    for(const l of Object.keys(D[g])){
      const w0="ថ្នាក់ "+g+" មេរៀន "+l,subs=D[g][l];
      if(!LS[g][l]){E(w0,"លេខមេរៀនមិនមាន (មាន ៖ "+Object.keys(LS[g]).join(",")+")");continue}
      if(!Array.isArray(subs)||!subs.length){E(w0,"ត្រូវជាបញ្ជីចំណុចរង [ … ]");continue}
      const cov={};
      out[g][l]=subs.map((x,i)=>{
        const w=w0+" · ចំណុចរង "+(i+1);x=x||{};
        if(!x.t||typeof x.t!=="string")E(w,"ខ្វះចំណងជើង t");else if(/\\|\$/.test(x.t)||CTRL.test(x.t))E(w,"ចំណងជើង t មិនត្រូវមាន \\ ឬ $ ៖ "+x.t);
        if(!x.s)E(w,"ខ្វះសង្ខេប s");if(!x.k)E(w,"ខ្វះគន្លឹះ k");
        if(!Array.isArray(x.f)||!x.f.length)E(w,"f ត្រូវជាបញ្ជីរូបមន្ត LaTeX យ៉ាងតិច ១");
        const lv=Array.isArray(x.lv)?x.lv:[];const keys=lv.map(v=>LVK[String(v).toLowerCase()]);
        if(keys.some(k=>!k))E(w,"lv មិនត្រឹមត្រូវ ៖ "+JSON.stringify(x.lv)+" (ប្រើ 1–5 និង \"pisa\")");
        (keys.length?keys:[1,5,2,6,3,4]).forEach(k=>cov[k]=1);
        mathCheck(w+" s",x.s);mathCheck(w+" k",x.k);
        (x.f||[]).forEach((f,j)=>{const wf=w+" f["+j+"]";if(typeof f!=="string")return E(wf,"ត្រូវជាអក្សរ");if(/\$/.test(f))E(wf,"កុំដាក់ $ ក្នុងរូបមន្ត f");if(KH.test(f))E(wf,"គ្មានអក្សរខ្មែរក្នុង f");if(CTRL.test(f))E(wf,"មានតួអក្សរបញ្ជា (\\\\ ពីរ)");braces(wf,f);latexWords(wf,"$"+f+"$")});
        if(x.ex!=null&&!Array.isArray(x.ex))E(w,"ex ត្រូវជា [[សំណួរ, ចម្លើយ], …]");
        (x.ex||[]).forEach((e,j)=>{if(!Array.isArray(e)||e.length!==2)return E(w+" ex["+j+"]","ត្រូវជា [សំណួរ, ចម្លើយ]");mathCheck(w+" ex["+j+"]",e[0]);mathCheck(w+" ex["+j+"]",e[1])});
        ns++;return{t:x.t,lv:keys.filter(Boolean),s:x.s,f:x.f,k:x.k,ex:x.ex||[]};
      });
      const miss=[1,5,2,6,3,4].filter(k=>!cov[k]);if(miss.length)W(w0,"គ្មានចំណុចរងសម្រាប់ "+miss.map(k=>LVN[k]).join(" "));
      nl++;
    }
  }
  warns.forEach(m=>console.log("⚠️  "+m));errs.forEach(m=>console.log("❌ "+m));
  console.log(`\nសរុប ៖ ${nl} មេរៀន · ${ns} ចំណុចរង · ❌ ${errs.length} កំហុស · ⚠️ ${warns.length} ការព្រមាន`);
  if(errs.length){console.log("👉 កែកំហុសក្នុង JSON រួចរត់ម្ដងទៀត (hubdata.js មិនត្រូវបានប្ដូរ)");process.exit(1)}
  if(CHECK){console.log("✅ ត្រឹមត្រូវ (--check ៖ មិនបានសរសេរ)");return}
  /* បញ្ចូលជាមួយ hubdata.js ដែលមានស្រាប់ (ថ្នាក់/មេរៀនដដែល → ជំនួស) */
  let old={};if(fs.existsSync(OUT)){const m=/window\.HUBDATA=(\{[\s\S]*\});/.exec(fs.readFileSync(OUT,"utf8"));if(m)old=JSON.parse(m[1])}
  for(const g of Object.keys(out))old[g]=Object.assign(old[g]||{},out[g]);
  fs.writeFileSync(OUT,"/* ⚙️ បង្កើតដោយ tools/import_summaries.js — កុំកែដោយដៃ · កែក្នុង data/summaries_data.json រួចរត់ម្ដងទៀត */\nwindow.HUBDATA="+JSON.stringify(old)+";\n");
  console.log("✅ បានសរសេរ hubdata.js ("+Object.keys(old).map(g=>"ថ្នាក់ "+g+" ៖ "+Object.keys(old[g]).length+" មេរៀន").join(" · ")+")\n👉 python3 tools/bump.py && ./tests/run.sh រួចដំឡើង sw.js ហើយ commit/push");
}
main();
