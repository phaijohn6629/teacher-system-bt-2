/* 🧪 ការសរសេរ Firestore ដែលប្រថុយបាត់ទិន្នន័យ (ជុំ audit ទី ២) + abMap/seat
   - exam.js save()  → writeBatch (__c + summary ជាមួយគ្នា · មិនមាន setDoc ដាច់ពីគ្នា)
   - script.js / classorg.js profiles → updateDoc តែ field ជាក់លាក់ · setDoc តែពេល not-found · field ត្រូវក្នុង rules hasOnly
   - monitor.js accTx → tx.update ពេល mc មាន · tx.set ពេលមិនមាន · មិនឱ្យ pw ចូល mc
   - classorg.js seat()/syncAB → abMap
   ដំណើរការពីថតគម្រោង៖ jsc tests/writes.js   (គ្មាន dependency · ស្រង់កូដពីប្រភពពិត) */
var bad=0,n=0;function ok(c,m){n++;if(!c){bad++;print("FAIL "+m)}}
function grab(s,a,b){var i=typeof a==="string"?s.indexOf(a):s.search(a);if(i<0)return"";var r=s.slice(i),j=typeof b==="string"?r.indexOf(b):r.search(b);return j<0?r:r.slice(0,j)}
if(typeof console==="undefined")console={error:function(){},warn:function(){},log:function(){}};
var cp=function(x){return x===undefined?x:JSON.parse(JSON.stringify(x))};
var EX=read("exam.js"),SC=read("script.js"),CO=read("classorg.js"),MO=read("monitor.js"),RU=read("firestore.rules");

/* ---------- Firestore ក្លែងក្លាយ (store + log + rules ខ្លះ) ---------- */
function mkFB(init){
  var S={},log=[];Object.keys(init||{}).forEach(function(k){S[k]=cp(init[k])});
  var snap=function(p){var v=S[p];return{exists:function(){return v!==undefined},data:function(){return cp(v)}}};
  function apply(kind,p,x){
    if(kind==="set")S[p]=cp(x);
    else if(kind==="update"){if(S[p]===undefined)throw {code:"not-found"};var d=S[p];Object.keys(x).forEach(function(k){d[k]=cp(x[k])})}
    else if(kind==="delete")delete S[p];
    log.push([kind,p,cp(x)])}
  var FB={S:S,log:log,
    doc:function(db,c,id){return{p:c+"/"+id}},
    setDoc:function(r,x){try{apply("set",r.p,x);return Promise.resolve()}catch(e){return Promise.reject(e)}},
    updateDoc:function(r,x){try{apply("update",r.p,x);return Promise.resolve()}catch(e){return Promise.reject(e)}},
    writeBatch:function(){var ops=[];return{set:function(r,x){ops.push(["set",r.p,x])},commit:function(){FB.commits=(FB.commits||0)+1;ops.forEach(function(o){apply(o[0],o[1],o[2])});return Promise.resolve()}}},
    runTransaction:function(db,fn){var ops=[],tx={get:function(r){return Promise.resolve(snap(r.p))},
      set:function(r,x){ops.push(["set",r.p,x])},update:function(r,x){ops.push(["update",r.p,x])},delete:function(r){ops.push(["delete",r.p])}};
      return fn(tx).then(function(res){ops.forEach(function(o){apply(o[0],o[1],o[2])});return res})}};
  return FB}
function flush(){drainMicrotasks();drainMicrotasks();drainMicrotasks()}

/* ១) exam.js save() → writeBatch */
(function(){
  var seg=grab(EX,"(function(){var b=F.writeBatch(","})().then(");
  ok(seg&&/b\.set\([^;]*"__c"/.test(seg)&&/b\.set\(F\.doc\(window\.db,"exams",E\.id\),sumOf\(E\)\)/.test(seg)&&/b\.commit\(\)/.test(seg),"exam save: batch holds __c + summary + commit");
  var line=grab(EX,"(function(){var b=F.writeBatch(","\n");
  ok(!/F\.setDoc\(/.test(line),"exam save: no separate setDoc in the save line");
  ok(/F\.setDoc\(F\.doc\(window\.db,"exams",x\[0\]\+"__c"\)/.test(EX),"exam migrate keeps setDoc (creates new __c docs)");
  var F=mkFB({"exams/e1":{u:"old",k:"s"},"exams/e1__c":{u:"old",j:"{}"}}),E={id:"e1",o:"t1",u:"NEW"},o={a:1},window={db:{}};
  function sumOf(E){return{o:E.o,u:E.u,k:"s"}}
  var run=eval("(function(F,E,o,window,sumOf){return "+seg+"})()})");
  var p=run(F,E,o,window,sumOf);flush();
  ok(F.commits===1&&F.log.length===2,"exam save: one commit, two writes");
  ok(F.S["exams/e1"].u==="NEW"&&F.S["exams/e1__c"].u==="NEW"&&F.S["exams/e1__c"].j==='{"a":1}',"exam save: summary u and content u written together");
  ok(F.S["exams/e1__c"].k==="c"&&F.S["exams/e1"].k==="s","exam save: k flags (c/s)");
})();

/* ២) script.js:431 — Admin កែព័ត៌មានគ្រូ → updateDoc តែ field ដែលកែ */
var allowed=(grab(grab(RU,"match /profiles/{tid}","allow delete"),"hasOnly([","])").match(/'(\w+)'/g)||[]).map(function(x){return x.replace(/'/g,"")});
ok(allowed.length>=10&&allowed.indexOf("photo")>=0,"rules profiles hasOnly list parsed ("+allowed.length+")");
function rulesOk(d){return Object.keys(d).every(function(k){return allowed.indexOf(k)>=0})}
(function(){
  var seg=grab(SC,"var upd={nm:np.nm","console.error(e)})}\n");seg+="console.error(e)})";   /* grab() stops before the marker; the trailing } of the if-block is not part of it */
  ok(/updateDoc\(/.test(seg)&&/not-found/.test(seg)&&/setDoc\(/.test(seg),"admin profile: updateDoc + not-found fallback present");
  var run=eval("(function(np,o,profs,window){"+seg+"})");
  function go(init){var F=mkFB(init),profs={t1:init&&init["profiles/t1"]},window={FB:F,db:{}};
    var np=Object.assign({},profs.t1||{},{nm:"ថ្មី",g:"ប",dob:"1990-01-01",ph:"012",ad:"ភ្នំពេញ",sub:"គណិត",deg:"បរិញ្ញា",sd:"2010-01-01",u:"U2"});
    run(np,{id:"t1"},profs,window);flush();return{F:F,profs:profs,np:np}}
  var r=go({"profiles/t1":{o:"t1",bio:"BIO",photo:"data:image/png;base64,AA",nm:"ចាស់",u:"U1"}});
  ok(r.F.log.length===1&&r.F.log[0][0]==="update","admin profile: existing doc → one update");
  ok(r.F.S["profiles/t1"].bio==="BIO"&&r.F.S["profiles/t1"].photo==="data:image/png;base64,AA","admin profile: bio/photo preserved");
  ok(r.F.S["profiles/t1"].nm==="ថ្មី"&&r.F.S["profiles/t1"].ph==="012","admin profile: edited fields written");
  ok(rulesOk(r.F.S["profiles/t1"])&&r.F.S["profiles/t1"].o==="t1","admin profile: merged doc passes hasOnly and keeps o");
  ok(Object.keys(r.F.log[0][2]).sort().join()==="ad,deg,dob,g,nm,ph,sd,sub,u","admin profile: update payload limited to Admin-edited fields");
  ok(r.profs.t1.nm==="ថ្មី","admin profile: local cache updated after success");
  var r2=go({"profiles/t1":undefined});delete r2.F.S["profiles/t1"];
  var F2=mkFB({}),w2={FB:F2,db:{}},np2={o:"t1",nm:"x",u:"U"},p2={};run(np2,{id:"t1"},p2,w2);flush();
  ok(F2.log.length===1&&F2.log[0][0]==="set"&&F2.S["profiles/t1"].nm==="x"&&p2.t1===np2,"admin profile: missing doc → setDoc fallback");
  var F3=mkFB({"profiles/t1":{o:"t1"}});F3.updateDoc=function(){return Promise.reject({code:"permission-denied"})};
  var errs=0,ce=console.error;console.error=function(){errs++};
  var np3={o:"t1",nm:"x"},p3={};run(np3,{id:"t1"},p3,{FB:F3,db:{}});flush();console.error=ce;
  ok(F3.log.length===0&&errs===1&&!p3.t1,"admin profile: other errors are logged, no setDoc, cache untouched");
})();

/* ៣) classorg.js:144 — រូបគ្រូទីប្រឹក្សា → update({photo,u}) + fallback setDoc */
(function(){
  var seg=grab(CO,"var ok=function(){profs[ogT]=p;",/\n    \}\)\}\);/);
  ok(/updateDoc\(/.test(seg)&&/not-found/.test(seg)&&/setDoc\(/.test(seg)&&/permission-denied/.test(seg),"adviser photo: update + fallback + error alert present");
  var run=eval("(function(ogT,d,p,profs,window,renderOrg,notify,alert){"+seg+"})");
  function go(init){var F=mkFB(init),profs={ogT:undefined};profs.t9=init["profiles/t9"];
    var p=Object.assign({o:"t9"},profs.t9||{},{photo:"PH",u:"U2"}),res={r:0,n:0,a:[]};
    run("t9","PH",p,profs,{FB:F,db:{}},function(){res.r++},function(){res.n++},function(m){res.a.push(m)});flush();return{F:F,p:p,profs:profs,res:res}}
  var r=go({"profiles/t9":{o:"t9",bio:"BIO",ph:"099",photo:"OLD"}});
  ok(r.F.log.length===1&&r.F.log[0][0]==="update"&&Object.keys(r.F.log[0][2]).sort().join()==="photo,u","adviser photo: update payload = {photo,u}");
  ok(r.F.S["profiles/t9"].bio==="BIO"&&r.F.S["profiles/t9"].ph==="099"&&r.F.S["profiles/t9"].photo==="PH","adviser photo: other fields preserved");
  ok(rulesOk(r.F.S["profiles/t9"]),"adviser photo: merged doc passes hasOnly");
  ok(r.res.r===1&&r.res.n===1&&r.profs.t9===r.p&&r.res.a.length===0,"adviser photo: UI refresh + notice on success");
  var r2=go({});
  ok(r2.F.log.length===1&&r2.F.log[0][0]==="set"&&r2.F.S["profiles/t9"].photo==="PH"&&r2.F.S["profiles/t9"].o==="t9"&&rulesOk(r2.F.S["profiles/t9"]),"adviser photo: missing doc → setDoc fallback (valid keys)");
  var F=mkFB({"profiles/t9":{o:"t9"}});F.updateDoc=function(){return Promise.reject({code:"permission-denied"})};
  var res={n:0,a:[]};run("t9","PH",{o:"t9"},{},{FB:F,db:{}},function(){},function(){res.n++},function(m){res.a.push(m)});flush();
  ok(res.n===0&&res.a.length===1&&F.log.length===0,"adviser photo: permission-denied → alert only, no setDoc");
})();

/* ៤) monitor.js accTx — tx.update / tx.set / មិនឱ្យ pw ចូល mc */
(function(){
  var seg=grab(MO,"function accTx(","\n$(\"p8\")");
  ok(seg&&/tx\.update\(mref\(k\)/.test(seg)&&/else tx\.set\(mref\(k\)/.test(seg),"accTx: update when cur exists, set when cur missing");
  var hdr=grab(MO,"function jcopy(","\n")+";"+grab(MO,"function accOf(","\n")+";"+grab(MO,"function mref(","\n")+";"+grab(MO,"function pref(","\n");
  function mk(init){var F=mkFB(init),mcd={r:{}},pwm={};
    var f=eval("(function(FB,db,mcd,pwm,buildT){"+hdr+";"+seg+";return accTx})")(F,{},mcd,pwm,function(){return{a:1}});
    return{F:F,mcd:mcd,pwm:pwm,accTx:f}}
  function noPw(F){var d=F.S["mc/t1_12A"];return !d||JSON.stringify(d).indexOf("pw")<0}
  /* mc មិនទាន់មាន */
  var m=mk({});m.accTx("t1_12A","t1","12A",function(a){a.h={id:"h1",uid:"u1",pw:"SECRET"}});flush();
  var d=m.F.S["mc/t1_12A"];
  ok(d&&d.o==="t1"&&typeof d.j==="string"&&d.acc.h.id==="h1","accTx new: mc created via set with o, j, acc");
  ok(m.F.log.filter(function(x){return x[1]==="mc/t1_12A"})[0][0]==="set","accTx new: op is set");
  ok(noPw(m.F)&&m.F.S["mcp/t1_12A"].p.h==="SECRET"&&m.F.S["mcp/t1_12A"].o==="t1","accTx new: password only in mcp, never in mc");
  ok(m.pwm["t1_12A"].h==="SECRET","accTx new: pwm cache holds the password");
  /* mc មានរួច + field ផ្សេង (r00, ack) */
  var m2=mk({"mc/t1_12A":{o:"t1",j:'{"x":1}',acc:{h:{id:"h1",uid:"u1"}},ack:5,r00:{z:1}},"mcp/t1_12A":{o:"t1",p:{h:"SECRET"}}});
  m2.accTx("t1_12A","t1","12A",function(a){a.v1={id:"v1",uid:"u2",pw:"P2"}});flush();
  var d2=m2.F.S["mc/t1_12A"],lg=m2.F.log.filter(function(x){return x[1]==="mc/t1_12A"});
  ok(lg.length===1&&lg[0][0]==="update","accTx existing: op is update");
  ok(Object.keys(lg[0][2]).join()==="acc","accTx existing: payload is acc only (j untouched)");
  ok(d2.j==='{"x":1}'&&d2.ack===5&&d2.r00.z===1,"accTx existing: j, ack, r00 preserved");
  ok(d2.acc.v1&&d2.acc.h&&noPw(m2.F),"accTx existing: new account added, no pw in mc");
  ok(m2.F.S["mcp/t1_12A"].p.h==="SECRET"&&m2.F.S["mcp/t1_12A"].p.v1==="P2","accTx existing: mcp merged with old + new passwords");
  /* mc ចាស់គ្មាន j → ត្រូវដាក់ j (rules ទាមទារ j.size()) */
  var m3=mk({"mc/t1_12A":{o:"t1",acc:{}}});m3.accTx("t1_12A","t1","12A",function(a){a.h={id:"h",uid:"u"}});flush();
  ok(typeof m3.F.S["mc/t1_12A"].j==="string"&&m3.F.log.filter(function(x){return x[1]==="mc/t1_12A"})[0][0]==="update","accTx legacy without j: update adds j");
  /* ទម្រង់ចាស់ {id,uid,pw} → acc.h ហើយ pw ចេញពី mc */
  var m4=mk({"mc/t1_12A":{o:"t1",id:"h1",uid:"u1",pw:"OLD",j:"{}"}});m4.accTx("t1_12A","t1","12A",function(a){});flush();
  ok(m4.F.S["mcp/t1_12A"]&&m4.F.S["mcp/t1_12A"].p.h==="OLD","accTx legacy: old pw moved to mcp");
  /* លុបគណនីអស់ → លុប mc (និង mcp) */
  var m5=mk({"mc/t1_12A":{o:"t1",j:"{}",acc:{h:{id:"h"}}},"mcp/t1_12A":{o:"t1",p:{h:"x"}}});
  m5.accTx("t1_12A","t1","12A",function(a){delete a.h});flush();
  ok(!m5.F.S["mc/t1_12A"]&&!m5.F.S["mcp/t1_12A"],"accTx: deleting every account removes mc and mcp");
  /* លុបតែលេខសម្ងាត់ចុងក្រោយ → លុប mcp តែរក្សា mc */
  var m6=mk({"mc/t1_12A":{o:"t1",j:"{}",acc:{h:{id:"h"},v1:{id:"v"}}},"mcp/t1_12A":{o:"t1",p:{v1:"x"}}});
  m6.accTx("t1_12A","t1","12A",function(a){delete a.v1});flush();
  ok(m6.F.S["mc/t1_12A"]&&!m6.F.S["mcp/t1_12A"],"accTx: no passwords left → mcp deleted, mc kept");
  /* rules ត្រូវគ្នានឹងកូដ */
  var mcr=grab(RU,"match /mc/{k}","match /mcp/");
  ok(/noPw\(\)/.test(mcr)&&/request\.resource\.data\.o == resource\.data\.o/.test(mcr),"rules mc: noPw + o unchanged on owner update");
})();

/* ៥) classorg.js seat()/syncAB/abOf → abMap */
(function(){
  var LAYsrc=grab(CO,/var LAY=\{/,/\n/),code=LAYsrc+";"+grab(CO,/function abOf\(/,/\n/)+";"+grab(CO,/function seat\(/,/\n/)+";"+grab(CO,/function syncAB\(/,/\n/);
  var seat,syncAB,abOf,LAY;eval(code+";seat=seat;syncAB=syncAB;abOf=abOf;LAY=LAY;");
  var c={};var S=seat(c);
  ok(S.lay==="d2"&&Array.isArray(S.s)&&S.abMap&&typeof S.abMap==="object","seat(): empty class gets lay, s, abMap");
  var c2={seat:{lay:"d1",s:["i:a","i:b"]}};seat(c2);
  ok(typeof c2.seat.abMap==="object"&&c2.seat.lay==="d1"&&c2.seat.s.length===2,"seat(): legacy plan without abMap is repaired, data kept");
  var c3={seat:{lay:"zzz",s:"bad",abMap:5}};seat(c3);
  ok(c3.seat.lay==="d2"&&Array.isArray(c3.seat.s)&&typeof c3.seat.abMap==="object","seat(): corrupt lay/s/abMap are normalised");
  var S4={lay:"d2",s:["i:a","","i:b","i:c"]};syncAB(S4);
  ok(Object.keys(S4.abMap).join()==="i:a,i:b,i:c"&&S4.abMap["i:a"]===abOf(LAY.d2,0)&&S4.abMap["i:b"]===abOf(LAY.d2,2),"syncAB: only seated students, paper from seat index");
  S4.s=[];syncAB(S4);ok(Object.keys(S4.abMap).length===0,"syncAB: cleared seats → empty abMap");
  var S5={lay:"d2",s:["i:a","i:b"]};syncAB(S5);var before=JSON.stringify(S5.abMap);S5.s=["i:b","i:a"];syncAB(S5);
  ok(S5.abMap["i:a"]===abOf(LAY.d2,1)&&JSON.stringify(S5.abMap)!==before,"syncAB: swapping two seats re-derives papers");
})();

print("writes: checks "+n+" bad "+bad);
