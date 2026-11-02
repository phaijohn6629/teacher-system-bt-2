/* ========================================================================
   គណនីប្រធាន/អនុប្រធានថ្នាក់ — គ្រូបង្កើតពីផ្ទាំង «សិស្ស និងអវត្តមាន»
   មួយថ្នាក់មានរហូតដល់ ៣ គណនី (ប្រធាន · អនុប្រធានទី១ · អនុប្រធានទី២) ភ្ជាប់ជាមួយសិស្សម្នាក់ៗ
   គណនីទាំងនេះចូលបានតែ៖ វត្តមាន · ប្លង់តុ · សម្រង់អត្ថបទ នៃថ្នាក់ខ្លួន (មិនអាចកែអ្វីផ្សេងទៀតទេ)
   Firestore mc/{ID គ្រូ}_{ថ្នាក់} = {o, acc:{h|v1|v2:{id,uid,pw,en,sk,sn}}, j}
     j = {by:"t"|"m", at, ack, tn, cn, st:[សិស្ស+អវត្តមាន], org, seat, sch:[ម៉ោងនៃថ្នាក់], cxr:[ជួរសម្រង់], cx:{"ថ្ងៃ|ម៉ោង":{c,ls,a}}}
     by="m" និង at > ack → កម្មវិធីរបស់គ្រូបញ្ចូលទិន្នន័យប្រធានថ្នាក់ទៅក្នុងទិន្នន័យគ្រូ
     ការសរសេរ mc ទាំងសងខាងប្រើ transaction (អានថ្មី → បញ្ចូលការកែ → សរសេរ) ដើម្បីកុំឱ្យជាន់គ្នា
   mclog/{auto} = {k, o, by, r, sn, at(ម៉ោង Server), a:[សកម្មភាព]} — ប្រវត្តិ (បន្ថែមបាន · កែ/លុបមិនបាន)
   ត្រូវផ្ទុកបន្ទាប់ពី script.js · sched.js · classorg.js · excerpt.js
   ======================================================================== */
(function(){
"use strict";
var RO=[["h","ប្រធានថ្នាក់","H"],["v1","អនុប្រធានទី១","V1"],["v2","អនុប្រធានទី២","V2"]],RN={h:"ប្រធានថ្នាក់",v1:"អនុប្រធានទី១",v2:"អនុប្រធានទី២"};
var AB=["ច្បាប់","ឥតច្បាប់","មកយឺត"];
var mcd={r:{}},M=null,mxMo="";
function isMon(){return !!(who&&who.role==="monitor")}
function ck(n){return String(n||"").replace(/[^A-Za-z0-9-]/g,"")}
function mkey(tid,cn){return tid+"_"+ck(cn)}
function skey(s){return s.id?"i:"+s.id:"n:"+s.n}
function jcopy(x){return x==null?x:JSON.parse(JSON.stringify(x))}
function clsOf(tid,cn){return(rs.c[tid]||[]).filter(function(c){return c.n===cn})[0]}
function p2(n){return(n<10?"0":"")+n}
function pj(s){try{return JSON.parse(s)}catch(e){return null}}
/* គណនីក្នុងឯកសារ (ទម្រង់ចាស់ {id,uid,pw,en} = ប្រធានថ្នាក់) */
function accOf(x){if(!x)return{};if(x.acc)return jcopy(x.acc);return x.id?{h:{id:x.id,uid:x.uid,pw:x.pw,en:x.en!==false}}:{}}

/* ---------- ទិន្នន័យ j ពីខាងគ្រូ ---------- */
function buildT(k){
  var d=mcd.r[k],c=d&&clsOf(d.o,d.cn);if(!c)return null;
  return{by:"t",at:0,ack:d.ack||0,tn:teacherOf(d.o).name||d.o,cn:c.n,
    st:c.st.map(function(s){var o={n:s.n};if(s.id)o.id=s.id;if(s.g)o.g=s.g;if(s.ab&&Object.keys(s.ab).length)o.ab=jcopy(s.ab);return o}),
    org:jcopy(c.org||null),seat:jcopy(c.seat||null),
    sch:window.SCHX?SCHX.schOf(d.o).filter(function(x){return x[2]===c.n&&x[4]!=="D"}):[],
    cxr:window.CXAPI?CXAPI.rows(d.o,c.n):[],cx:{}};
}
/* សមកាលកម្មទូទៅ (script.js) គ្រាន់តែអាន mc · ការសរសេរធ្វើដោយ transaction ខាងក្រោម (docs = ដូច Cloud → មិនសរសេរ/មិនលុប) */
MAP.mc={
  docs:function(){var o={};Object.keys(mcd.r).forEach(function(k){if(mcd.r[k].raw)o["mc/"+k]=mcd.r[k].raw});return o},
  load:function(c){
    var m=pick(c,"mc/"),r={};
    Object.keys(m).forEach(function(k){
      var x=m[k],j=pj(x.j),old=mcd.r[k];
      r[k]={o:x.o,cn:j&&j.cn||"",j:j,acc:accOf(x),ack:Math.max(j&&j.ack||0,old&&old.ack||0),raw:x};
    });
    mcd={r:r};
    if(isMon())monLoad();else setTimeout(teachApply,0);
  }
};
function mref(k){return FB.doc(db,"mc",k)}

/* ---------- ខាងគ្រូ៖ បញ្ចូលទិន្នន័យដែលប្រធានថ្នាក់បានកែ ---------- */
function teachApply(){
  if(isMon()||!who||!sy.first.mc||!sy.first.rs||!sy.first.cx)return;
  var chR=false,any=false;
  Object.keys(mcd.r).forEach(function(k){
    var d=mcd.r[k],j=d.j;
    if(!j||j.by!=="m"||!(j.at>(d.ack||0))||!(isAdm()||who.id===d.o))return;
    var c=clsOf(d.o,j.cn);
    if(c){
      var by={};(j.st||[]).forEach(function(s){by[skey(s)]=s});
      c.st.forEach(function(s){var x=by[skey(s)];if(!x)return;if(x.ab&&Object.keys(x.ab).length)s.ab=jcopy(x.ab);else delete s.ab});
      if(j.seat)c.seat=jcopy(j.seat);
      chR=true;
    }
    if(window.CXAPI)CXAPI.apply(d.o,j.cn,j.cx);
    d.ack=j.at;any=true;
  });
  if(chR)savR();
  if(any){tSched(0);if(typeof refreshView==="function")refreshView()}
}
/* សរសេរ mc ពីខាងគ្រូ៖ រំលងបើប្រធានថ្នាក់មានការកែដែលគ្រូមិនទាន់បញ្ចូល (នឹងបញ្ចូលពេលទទួលបាន) */
var tTm=null;
function tSched(ms){clearTimeout(tTm);tTm=setTimeout(tWrite,ms==null?1500:ms)}
function tWrite(){
  if(isMon()||!who||!window.FB||!FB.runTransaction)return;
  Object.keys(mcd.r).forEach(function(k){
    var d=mcd.r[k];if(!(isAdm()||who.id===d.o))return;
    var j=buildT(k);if(!j)return;var js=JSON.stringify(j);
    FB.runTransaction(db,function(tx){
      return tx.get(mref(k)).then(function(sn){
        if(!sn.exists())return;
        var cur=sn.data(),cj=pj(cur.j);
        if(cj&&cj.by==="m"&&cj.at>(cj.ack||0)&&cj.at>(d.ack||0))return;
        if(cur.j===js&&cur.acc)return;
        tx.set(mref(k),{o:d.o,acc:accOf(cur),j:js});
      });
    }).catch(function(e){console.warn("mc write:",k,e)});
  });
}
var _push=window.push;
window.push=function(k){
  if(isMon()){if(k==="rs"||k==="cx")monDiff();return}
  _push(k);
  if((k==="rs"||k==="cx")&&Object.keys(mcd.r).length)tSched();
};
["rs","cx"].forEach(function(k){
  var f=MAP[k]&&MAP[k].load;if(!f)return;
  MAP[k].load=function(c){f(c);if(!isMon())setTimeout(teachApply,0)};
});
var _start=window.startSync;
window.startSync=function(){
  if(!isMon())return _start();
  stopSync();sy.cache={};sy.got={};sy.first={};sy.synced={};sy.seeded={};
  subscribe("mc");
};

/* ---------- ខាងគ្រូ៖ ប្រអប់គ្រប់គ្រងគណនី (ផ្ទាំង «សិស្ស និងអវត្តមាន») ---------- */
var _renderP=window.renderP;
window.renderP=function(){if(isMon())pv=2;_renderP();box()};
var busy=false,showPw={},logOpen={},logs={},logBy={},pick0={};
function holder(c,r){var o=c.org&&c.org.r||{};return c.st.filter(function(s){return(o[skey(s)]||{}).ro===r})[0]}
function box(){
  var el=$("monBox");if(!el)return;
  var c=curCls();
  if(isMon()||pv===3||!c||!canM()||!window.db){el.innerHTML="";return}
  var k=mkey(rt,c.n),d=mcd.r[k],acc=d?d.acc:{},n=Object.keys(acc).length;
  var h="<div class=mon-box><div class=mon-h>👤 គណនីប្រធាន/អនុប្រធានថ្នាក់ <b>"+esc(c.n)+"</b>"+(n?"<button type=button data-mon='log' class=mon-logb>📜 ប្រវត្តិសកម្មភាព</button>":"")+"</div>"+
    "<p>គណនីនីមួយៗភ្ជាប់ជាមួយសិស្សម្នាក់ · ចូលបានតែ វត្តមាន · ប្លង់តុ · សម្រង់អត្ថបទ នៃថ្នាក់នេះ (មិនអាចមើល ឬកែពិន្ទុទេ)។ រាល់ការកែត្រូវកត់ក្នុង «ប្រវត្តិសកម្មភាព»។</p><div class=mon-rows>";
  RO.forEach(function(R){
    var r=R[0],a=acc[r],sp=showPw[k+r];
    h+="<div class=mon-row><div class=mon-rl>"+R[1]+"</div>";
    if(!a){
      var def=pick0[k+r]||(holder(c,r)?skey(holder(c,r)):"");
      h+="<select data-monst='"+r+"'><option value=''>— ជ្រើសសិស្ស —</option>"+c.st.map(function(s){var v=skey(s);return"<option value='"+esc(v)+"'"+(v===def?" selected":"")+">"+esc(s.n)+(s.id?" ("+esc(s.id)+")":"")+"</option>"}).join("")+"</select>"+
        "<button type=button class=primary data-mon='new|"+r+"'"+(busy?" disabled":"")+">＋ បង្កើតគណនី</button>";
    }else{
      h+="<div class=mon-cred><span class=mon-sn>🧑‍🎓 "+esc(a.sn||"—")+"</span><span>ID៖ <b class=mon-id>"+esc(a.id)+"</b></span><span>លេខសម្ងាត់៖ <b class=mon-id>"+(sp?esc(a.pw||"—"):"••••••••")+"</b> <button type=button data-mon='eye|"+r+"'>"+(sp?"🙈":"👁️")+"</button></span>"+
        "<span class='mon-st"+(a.en!==false?" on":"")+"'>"+(a.en!==false?"✅ បើក":"⏸️ បិទ")+"</span></div>"+
        "<div class=mon-acts><button type=button data-mon='copy|"+r+"'>📋 ចម្លង</button><button type=button data-mon='pw|"+r+"'"+(busy?" disabled":"")+">🔄 លេខសម្ងាត់ថ្មី</button>"+
        "<button type=button data-mon='tog|"+r+"'"+(busy?" disabled":"")+">"+(a.en!==false?"⏸️ បិទ":"▶️ បើក")+"</button><button type=button class=danger data-mon='del|"+r+"'"+(busy?" disabled":"")+">🗑️</button></div>";
    }
    h+="</div>";
  });
  h+="</div>";
  if(logOpen[k])h+=logHtml(k,acc);
  el.innerHTML=h+"</div>";
}
/* ---------- ប្រវត្តិសកម្មភាព ---------- */
function tfmt(t){var d=t&&t.toDate?t.toDate():t&&t.seconds?new Date(t.seconds*1000):null;if(!d)return"…";return kn(p2(d.getDate())+"/"+p2(d.getMonth()+1)+"/"+d.getFullYear()+" "+p2(d.getHours())+":"+p2(d.getMinutes()))}
function tval(t){return t&&t.toMillis?t.toMillis():t&&t.seconds?t.seconds*1000:0}
function logHtml(k,acc){
  var L=logs[k];
  if(L==="err")return"<div class=mon-log><p class=cxwarn>⚠️ មិនអាចផ្ទុកប្រវត្តិបានទេ (សូម Admin Publish firestore.rules កំណែថ្មី)</p></div>";
  if(!L)return"<div class=mon-log><p class=note>កំពុងផ្ទុកប្រវត្តិ…</p></div>";
  var f=logBy[k]||"",ids={};L.forEach(function(x){ids[x.by]=(RN[x.r]||x.r)+" · "+(x.sn||x.by)});
  var list=L.filter(function(x){return!f||x.by===f});
  return"<div class=mon-log><div class=bar><b>📜 ប្រវត្តិសកម្មភាព</b><select data-monlog><option value=''>គណនីទាំងអស់ ("+kn(L.length)+")</option>"+Object.keys(ids).map(function(i){return"<option value='"+esc(i)+"'"+(i===f?" selected":"")+">"+esc(ids[i])+"</option>"}).join("")+"</select><button type=button data-mon=logr>🔄</button></div>"+
    (list.length?"<div class=wrap><table class=mon-lt><thead><tr><th style='width:150px'>ម៉ោង</th><th style='width:200px'>គណនី</th><th>អ្វីដែលបានកែ</th></tr></thead><tbody>"+list.slice(0,300).map(function(x){
      return"<tr><td>"+tfmt(x.at)+"</td><td><b>"+esc(x.sn||"—")+"</b><small>"+esc((RN[x.r]||x.r||"")+" · "+x.by)+"</small></td><td><ul>"+(x.a||[]).map(function(t){return"<li>"+esc(t)+"</li>"}).join("")+"</ul></td></tr>"}).join("")+"</tbody></table></div>"
      :"<p class=note>មិនទាន់មានសកម្មភាពទេ។</p>")+"</div>";
}
function loadLog(k,tid){
  logs[k]=null;box();
  FB.getDocs(FB.query(FB.collection(db,"mclog"),FB.where("o","==",tid),FB.where("k","==",k))).then(function(sn){
    var a=[];sn.forEach(function(d){a.push(d.data())});a.sort(function(x,y){return tval(y.at)-tval(x.at)});logs[k]=a;box();
  },function(e){console.error("mclog:",e);logs[k]="err";box()});
}
function setBusy(b){busy=b;box()}
function fail(e){setBusy(false);console.error(e);alert("មិនបានសម្រេច៖ "+(typeof authErr==="function"?authErr(e):e&&e.message||e))}
function creds(a){return"លេខសម្គាល់៖ "+a.id+"\nលេខសម្ងាត់៖ "+a.pw+"\nគេហទំព័រ៖ "+location.origin+location.pathname}
function mkUser(id,pw,n){
  var tid=n?id+"-"+(n+1):id;
  return FB.createUserWithEmailAndPassword(FB.sauth,idEmail(tid),pw).then(function(cr){return{cr:cr,id:tid}},function(e){
    if(e&&e.code==="auth/email-already-in-use"&&n<5)return mkUser(id,pw,n+1);
    throw e;
  });
}
function signMon(a){return FB.signInWithEmailAndPassword(FB.sauth,idEmail(a.id),a.pw)}
/* កែបញ្ជីគណនីក្នុង mc/{k} (transaction · បង្កើតឯកសារបើមិនទាន់មាន) */
function accTx(k,tid,cn,fn){
  if(!mcd.r[k])mcd.r[k]={o:tid,cn:cn,j:null,acc:{},ack:0,raw:null};
  var j0=JSON.stringify(buildT(k)||{});
  return FB.runTransaction(db,function(tx){
    return tx.get(mref(k)).then(function(sn){
      var cur=sn.exists()?sn.data():null,acc=accOf(cur);fn(acc);
      if(!Object.keys(acc).length&&cur){tx.delete(mref(k));return acc}
      tx.set(mref(k),{o:tid,acc:acc,j:cur&&cur.j||j0});return acc;
    });
  }).then(function(acc){mcd.r[k].acc=acc;if(!Object.keys(acc).length)delete mcd.r[k];return acc});
}
$("p8").addEventListener("change",function(e){
  var s=e.target.closest("[data-monst]");if(s){var c=curCls();if(c)pick0[mkey(rt,c.n)+s.dataset.monst]=s.value;return}
  var l=e.target.closest("[data-monlog]");if(l){var c2=curCls();if(c2){logBy[mkey(rt,c2.n)]=l.value;box()}}
});
$("p8").addEventListener("click",function(e){
  var b=e.target.closest("[data-mon]");if(!b||busy)return;
  var c=curCls();if(!c||!canM())return;
  var q=b.dataset.mon.split("|"),a=q[0],r=q[1],tid=rt,k=mkey(tid,c.n),d=mcd.r[k],ac=d&&r?d.acc[r]:null,R=RO.filter(function(x){return x[0]===r})[0];
  if(a==="log"){logOpen[k]=!logOpen[k];if(logOpen[k])loadLog(k,tid);else box();return}
  if(a==="logr"){loadLog(k,tid);return}
  if(a==="eye"){showPw[k+r]=!showPw[k+r];box();return}
  if(a==="copy"&&ac){
    var t=creds(ac);
    if(navigator.clipboard)navigator.clipboard.writeText(t).then(function(){notify("បានចម្លងព័ត៌មានចូល")},function(){window.prompt("ចម្លងអត្ថបទនេះ៖",t)});
    else window.prompt("ចម្លងអត្ថបទនេះ៖",t);
    return;
  }
  if(a==="new"&&R&&!ac){
    var sel=$("monBox").querySelector("[data-monst='"+r+"']"),sk=sel&&sel.value,st=c.st.filter(function(s){return skey(s)===sk})[0];
    if(!st){alert("សូមជ្រើសសិស្សសម្រាប់គណនី «"+R[1]+"» ជាមុន");return}
    var used=Object.keys(d?d.acc:{}).filter(function(x){return d.acc[x].sk===sk})[0];
    if(used){alert("សិស្ស «"+st.n+"» មានគណនី «"+RN[used]+"» រួចហើយ");return}
    if(!ck(c.n)){alert("ឈ្មោះថ្នាក់មិនត្រឹមត្រូវ");return}
    var pw=genPw(),base=(tid+"-"+ck(c.n)+"-"+R[2]).toUpperCase();setBusy(true);
    mkUser(base,pw,0).then(function(x){
      var uid=x.cr.user.uid,id=x.id;
      return FB.signOut(FB.sauth).catch(function(){}).then(function(){
        return FB.setDoc(FB.doc(db,"users",uid),{id:id,name:R[1]+" "+c.n+" · "+st.n,role:"monitor",enabled:true,mustChange:false,t:tid,k:k,c:c.n,r:r,sk:sk,sn:st.n});
      }).then(function(){
        return accTx(k,tid,c.n,function(acc){acc[r]={id:id,uid:uid,pw:pw,en:true,sk:sk,sn:st.n}});
      });
    }).then(function(){showPw[k+r]=true;setBusy(false);notify("បានបង្កើតគណនី "+R[1]+" ("+st.n+")")},fail);
    return;
  }
  if(!ac)return;
  if(a==="pw"){
    if(!confirm("ប្ដូរលេខសម្ងាត់ថ្មីសម្រាប់ "+ac.id+" ("+(ac.sn||"")+")?\nលេខសម្ងាត់ចាស់នឹងប្រើលែងបាន។"))return;
    var np=genPw();setBusy(true);
    signMon(ac).then(function(cr){return FB.updatePassword(cr.user,np)}).then(function(){return FB.signOut(FB.sauth).catch(function(){})})
      .then(function(){return accTx(k,tid,c.n,function(acc){if(acc[r])acc[r].pw=np})})
      .then(function(){showPw[k+r]=true;setBusy(false);notify("បានប្ដូរលេខសម្ងាត់ថ្មី")},fail);
    return;
  }
  if(a==="tog"){
    var en=ac.en===false;setBusy(true);
    FB.updateDoc(FB.doc(db,"users",ac.uid),{enabled:en}).then(function(){return accTx(k,tid,c.n,function(acc){if(acc[r])acc[r].en=en})})
      .then(function(){setBusy(false);notify(en?"បានបើកគណនីវិញ":"បានបិទគណនី")},fail);
    return;
  }
  if(a==="del"){
    if(!confirm("លុបគណនី "+RN[r]+" "+ac.id+" ("+(ac.sn||"")+")?\n\nទិន្នន័យដែលគណនីនេះបានបញ្ចូលរួច និងប្រវត្តិសកម្មភាព នៅដដែល។"))return;
    setBusy(true);
    signMon(ac).then(function(cr){return FB.deleteUser(cr.user)}).catch(function(e){console.warn("monitor auth delete:",e)})
      .then(function(){return FB.signOut(FB.sauth).catch(function(){})})
      .then(function(){return FB.deleteDoc(FB.doc(db,"users",ac.uid)).catch(function(e){console.warn(e)})})
      .then(function(){return accTx(k,tid,c.n,function(acc){delete acc[r]})})
      .then(function(){setBusy(false);notify("បានលុបគណនី")},fail);
  }
});

/* ========== ខាងប្រធាន/អនុប្រធានថ្នាក់ ========== */
/* ការកែនីមួយៗ៖ D = តម្លៃថ្មីតាមគោលដៅ (សរសេរដោយ transaction) · L = សម្រាប់ប្រវត្តិ {l, f(ចាស់), t(ថ្មី)} */
function snap(c){var ab={};c.st.forEach(function(s){ab[skey(s)]=jcopy(s.ab||{})});return{ab:ab,seat:JSON.stringify(c.seat||null)}}
function abv(ab,m,i){return+((ab&&ab[m]||[])[i])||0}
function note(key,l,f,t){var x=M.L[key];if(!x)x=M.L[key]={l:l,f:f};x.t=t;if(x.f===x.t&&key!=="seat")delete M.L[key]}
function monDiff(){
  if(!M)return;var c=(rs.c[who.id]||[])[0];if(!c)return;
  var b=M.base||snap(c);
  c.st.forEach(function(s){
    var k=skey(s),o=b.ab[k]||{},n=s.ab||{},ms={};
    Object.keys(o).concat(Object.keys(n)).forEach(function(m){ms[m]=1});
    Object.keys(ms).forEach(function(m){for(var i=0;i<3;i++){var x=abv(o,m,i),y=abv(n,m,i);if(x!==y){var key="ab|"+k+"|"+m+"|"+i;M.D[key]=y;note(key,s.n+" · ខែ"+(MK[m]||m)+" · "+AB[i],kn(x),kn(y))}}});
  });
  var ns=JSON.stringify(c.seat||null);
  if(ns!==b.seat){M.D.seat=jcopy(c.seat||null);note("seat","ប្លង់តុ","","បានរៀបកៅអីឡើងវិញ")}
  M.base=snap(c);mSched();
}
function applyD(j,D){
  var by={};(j.st||[]).forEach(function(s){by[skey(s)]=s});
  Object.keys(D).forEach(function(key){
    var v=D[key],q=key.split("|");
    if(q[0]==="ab"){
      var i=+q.pop(),m=q.pop(),s=by[q.slice(1).join("|")];if(!s)return;
      s.ab=s.ab||{};var x=s.ab[m]=s.ab[m]||[0,0,0];while(x.length<3)x.push(0);x[i]=v;
      if(!x[0]&&!x[1]&&!x[2])delete s.ab[m];if(!Object.keys(s.ab).length)delete s.ab;
    }else if(key==="seat")j.seat=jcopy(v);
    else if(q[0]==="cx"){
      var dp=q[1]+"|"+q[2];j.cx=j.cx||{};
      var cur=j.cx[dp]||(j.cxr||[]).filter(function(r){return r.d===q[1]&&r.p===q[2]})[0]||{};
      var o={c:cur.c||"",a:cur.a||"",ls:cur.ls||""};o[q[3]]=v;j.cx[dp]=o;
    }
  });
}
var mTm=null,mBusy=false;
function mSched(){clearTimeout(mTm);mTm=setTimeout(mWrite,1200)}
function mWrite(){
  if(!M||mBusy||!Object.keys(M.D).length)return;
  var D=M.D,L=M.L,k=who.mk;M.D={};M.L={};mBusy=true;
  FB.runTransaction(db,function(tx){
    return tx.get(mref(k)).then(function(sn){
      if(!sn.exists())throw new Error("គណនីនេះលែងមានសិទ្ធិ");
      var cur=sn.data(),j=pj(cur.j)||{};applyD(j,D);
      j.by="m";j.at=Math.max(Date.now(),(j.at||0)+1,(j.ack||0)+1);
      tx.update(mref(k),{j:JSON.stringify(j)});
    });
  }).then(function(){mBusy=false;mLog(L);if(Object.keys(M.D).length)mSched()},function(e){
    mBusy=false;console.error("mc:",e);
    Object.keys(D).forEach(function(x){if(!(x in M.D))M.D[x]=D[x]});
    Object.keys(L).forEach(function(x){if(!M.L[x])M.L[x]=L[x];else M.L[x].f=L[x].f});
    notify("⚠️ មិនទាន់រក្សាទុកបាន · នឹងព្យាយាមម្ដងទៀត");clearTimeout(mTm);mTm=setTimeout(mWrite,5000);
  });
}
function mLog(L){
  var a=Object.keys(L).map(function(x){var o=L[x];return o.l+(o.f!==""?"៖ "+o.f+" → "+o.t:"៖ "+o.t)});
  for(var i=0;i<a.length;i+=50){
    FB.addDoc(FB.collection(db,"mclog"),{k:who.mk,o:who.id,by:prof.id,r:who.mr||"h",sn:who.msn||"",at:FB.serverTimestamp(),a:a.slice(i,i+50)})
      .catch(function(e){console.error("mclog:",e)});
  }
}
window.addEventListener("beforeunload",function(e){if(isMon()&&M&&(Object.keys(M.D).length||mBusy)){mWrite();e.preventDefault();e.returnValue=""}});
document.addEventListener("visibilitychange",function(){if(document.hidden&&isMon()&&M)mWrite()});
function monLoad(){
  var d=mcd.r[who.mk];
  if(!d||!d.j){M=null;data=[];rs={c:{}};return}
  var D=M?M.D:{},L=M?M.L:{},j=jcopy(d.j);applyD(j,D);   /* ការកែដែលមិនទាន់សរសេរ → ដាក់ពីលើទិន្នន័យថ្មីពី Cloud */
  M={d:d,j:j,D:D,L:L};
  data=[{id:who.id,name:j.tn||who.id,en:true}];
  rs={c:{}};rs.c[who.id]=[{n:j.cn,st:jcopy(j.st||[]),org:jcopy(j.org||{n:6,r:{}}),seat:jcopy(j.seat||undefined)}];
  rt=who.id;rc=0;M.base=snap(rs.c[who.id][0]);
  monTitle();
}
function monTitle(){var h=$("monTitle");if(h&&M)h.innerHTML="👤 "+esc(who.rl||"ប្រធានថ្នាក់")+(who.msn?" <b>"+esc(who.msn)+"</b>":"")+" · ថ្នាក់ <b>"+esc(M.j.cn)+"</b> · គ្រូ "+esc(M.j.tn||"")}
var PG=[["p8","🧑‍🎓 វត្តមាន"],["p16","🪑 ប្លង់តុ"],["p14","📖 សម្រង់អត្ថបទ"]];
function go(p){
  show(p);
  [].forEach.call($("monNav").querySelectorAll("button"),function(b){b.setAttribute("aria-selected",String(b.dataset.mp===p))});
  if(p==="p16"){var s=$("ogSeg").querySelector("[data-ov=seat]");if(s&&s.getAttribute("aria-selected")!=="true")s.click()}
}
window.MONUI={enter:function(){
  document.body.classList.add("mon");
  var n=$("monNav");n.hidden=false;
  n.innerHTML="<div id=monTitle class=mon-title>👤 "+esc(who.rl||"ប្រធានថ្នាក់")+" "+esc(who.mc||"")+"</div><div class=seg>"+PG.map(function(x){return"<button type=button data-mp="+x[0]+">"+x[1]+"</button>"}).join("")+"</div>";
  n.onclick=function(e){var b=e.target.closest("[data-mp]");if(b)go(b.dataset.mp)};
  monTitle();
  go("p8");
}};
/* សម្រង់អត្ថបទ (ប្រធានថ្នាក់)៖ ជួរតាមកាលវិភាគនៃថ្នាក់ខ្លួន · សរសេរខ្លឹមសារមេរៀន និងអវត្តមាន */
var _renderCx=window.renderCx;
window.renderCx=function(){if(isMon())return monCx();if(_renderCx)_renderCx()};
function blocks(sch,di){
  var BRK=SCHX.BRK,ps=sch.filter(function(s){return s[0]===di}).map(function(s){return s[1]}).sort(function(a,b){return a-b}),out=[];
  ps.forEach(function(p){var l=out[out.length-1];if(l&&l[1]===p-1&&!BRK[p-1])l[1]=p;else out.push([p,p])});
  return out.map(function(b){return b[0]+(b[1]>b[0]?"-"+b[1]:"")});
}
function pLabel(p,plain){var m=/^(\d+)(?:-(\d+))?$/.exec(p||"");if(!m)return esc(p||"—");var a=+m[1],b=+(m[2]||a),PT=SCHX.PT;
  if(plain)return"ម៉ោងទី"+kn(a)+(b>a?"–"+kn(b):"");
  return"ម៉ោងទី"+kn(a)+(b>a?"–"+kn(b):"")+(PT[a]&&PT[b]?"<small>"+kn(PT[a].split(" - ")[0]+"–"+PT[b].split(" - ")[1])+"</small>":"")}
function monCx(){
  var el=$("monCx");if(!el)return;
  if(!M){el.innerHTML="<p class=note>កំពុងផ្ទុកទិន្នន័យ…</p>";return}
  if(!mxMo){var t=new Date();mxMo=t.getFullYear()+"-"+p2(t.getMonth()+1)}
  var y=+mxMo.slice(0,4),m=+mxMo.slice(5,7),nd=new Date(y,m,0).getDate(),j=M.j,rows={},keys=[];
  function add(d,p){var k=d+"|"+p;if(!rows[k]){rows[k]={d:d,p:p,c:"",a:"",ls:""};keys.push(k)}return rows[k]}
  for(var d=1;d<=nd;d++){
    var dt=new Date(y,m-1,d),wd=dt.getDay(),ds=y+"-"+p2(m)+"-"+p2(d);
    if(!wd||SCHX.FIXHOL[p2(m)+"-"+p2(d)])continue;
    blocks(j.sch||[],(wd+6)%7).forEach(function(p){add(ds,p)});
  }
  (j.cxr||[]).forEach(function(r){if(r.d.slice(0,7)===mxMo){var o=add(r.d,r.p);o.c=r.c;o.a=r.a;o.ls=r.ls}});
  Object.keys(j.cx||{}).forEach(function(k){var q=k.split("|");if(q[0].slice(0,7)!==mxMo)return;var o=add(q[0],q[1]),v=j.cx[k];o.c=v.c||"";o.a=v.a||"";o.ls=v.ls||""});
  keys.sort();
  var h="<div class=bar><label for=mxMo>ខែ៖</label><input type=month id=mxMo value='"+mxMo+"' style='flex:0 0 170px;width:170px'></div>",last="",td=new Date(),tds=td.getFullYear()+"-"+p2(td.getMonth()+1)+"-"+p2(td.getDate());
  h+="<div class=wrap><table class='tsg mon-cx'><thead><tr><th style='width:150px'>ម៉ោង</th><th>ខ្លឹមសារមេរៀន</th><th style='width:32%'>អវត្តមានសិស្ស</th></tr></thead><tbody>";
  keys.forEach(function(k){
    var r=rows[k];
    if(r.d!==last){last=r.d;var a=r.d.split("-").map(Number);h+="<tr class=cxday"+(r.d===tds?" id=mxToday":"")+"><td colspan=3><b>"+esc(KhCal.WD[new Date(a[0],a[1]-1,a[2]).getDay()]+" "+kn(a[2])+"/"+kn(a[1])+"/"+kn(a[0]))+"</b>"+(r.d===tds?" <span class=mon-td>ថ្ងៃនេះ</span>":"")+"</td></tr>"}
    h+="<tr><td>"+pLabel(r.p)+"</td><td><textarea rows=2 data-mx='"+esc(k)+"|c' placeholder='ជំពូក · មេរៀន · ខ្លឹមសារ'>"+esc(r.c)+"</textarea></td><td><textarea rows=2 data-mx='"+esc(k)+"|a' placeholder='ឈ្មោះ/ចំនួនសិស្សអវត្តមាន'>"+esc(r.a)+"</textarea></td></tr>";
  });
  h+=(keys.length?"":"<tr><td colspan=3 class=empty>ខែនេះមិនមានម៉ោងរៀនតាមកាលវិភាគទេ។</td></tr>")+"</tbody></table></div><p class=note>💡 សរសេរខ្លឹមសារមេរៀន និងអវត្តមានសិស្សរៀងរាល់ម៉ោង។ ទិន្នន័យរក្សាទុកដោយស្វ័យប្រវត្តិ ចូលទៅក្នុងសម្រង់អត្ថបទរបស់គ្រូ ហើយត្រូវកត់ក្នុងប្រវត្តិសកម្មភាព។</p>";
  el.innerHTML=h;
}
function cut(s){s=String(s||"").replace(/\s+/g," ").trim();return s.length>80?s.slice(0,80)+"…":s||"(ទទេ)"}
var mcx=$("monCx");
if(mcx){
  mcx.addEventListener("input",function(e){
    var t=e.target;
    if(t.id==="mxMo"){if(/^\d{4}-\d{2}$/.test(t.value)){mxMo=t.value;monCx()}return}
    var q=(t.dataset.mx||"").split("|");if(q.length!==3||!M)return;
    var dp=q[0]+"|"+q[1],j=M.j;j.cx=j.cx||{};
    var cur=j.cx[dp]||(j.cxr||[]).filter(function(r){return r.d===q[0]&&r.p===q[1]})[0]||{},v={c:cur.c||"",a:cur.a||"",ls:cur.ls||""},old=v[q[2]];
    v[q[2]]=t.value;j.cx[dp]=v;
    var key="cx|"+dp+"|"+q[2],a=q[0].split("-");
    M.D[key]=t.value;
    if(!M.L[key])M.L[key]={l:"សម្រង់ "+kn(a[2]+"/"+a[1])+" "+pLabel(q[1],true)+" · "+(q[2]==="c"?"ខ្លឹមសារ":"អវត្តមាន"),f:cut(old)};
    M.L[key].t=cut(t.value);
    mSched();
  });
}
})();
