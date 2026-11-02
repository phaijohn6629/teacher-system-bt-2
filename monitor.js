/* ========================================================================
   គណនីប្រធានថ្នាក់ (មួយគណនីក្នុងមួយថ្នាក់) — គ្រូបង្កើតពីផ្ទាំង «សិស្ស និងអវត្តមាន»
   ប្រធានថ្នាក់ចូលបានតែ៖ វត្តមាន · ប្លង់តុ · សម្រង់អត្ថបទ នៃថ្នាក់ខ្លួន (មិនអាចកែអ្វីផ្សេងទៀតទេ)
   Firestore mc/{ID គ្រូ}_{ថ្នាក់} = {o, id, uid, pw, en, j}
     j = {by:"t"|"m", at, ack, tn, cn, st:[សិស្ស+អវត្តមាន], org, seat, sch:[ម៉ោងនៃថ្នាក់], cxr:[ជួរសម្រង់], cx:{"ថ្ងៃ|ម៉ោង":{c,ls,a}}}
     by="m" និង at > ack → កម្មវិធីរបស់គ្រូបញ្ចូលទិន្នន័យប្រធានថ្នាក់ទៅក្នុងទិន្នន័យគ្រូ (អវត្តមាន · ប្លង់តុ · សម្រង់អត្ថបទ)
   ត្រូវផ្ទុកបន្ទាប់ពី script.js · sched.js · classorg.js · excerpt.js
   ======================================================================== */
(function(){
"use strict";
var mcd={r:{}},M=null,mxMo="";
function isMon(){return !!(who&&who.role==="monitor")}
function ck(n){return String(n||"").replace(/[^A-Za-z0-9-]/g,"")}
function mkey(tid,cn){return tid+"_"+ck(cn)}
function skey(s){return s.id?"i:"+s.id:"n:"+s.n}
function jcopy(x){return x==null?x:JSON.parse(JSON.stringify(x))}
function clsOf(tid,cn){return(rs.c[tid]||[]).filter(function(c){return c.n===cn})[0]}
function p2(n){return(n<10?"0":"")+n}

/* ---------- ទិន្នន័យ j ពីខាងគ្រូ ---------- */
function buildT(k){
  var d=mcd.r[k],c=clsOf(d.o,d.cn);if(!c)return null;
  return{by:"t",at:0,ack:d.ack||0,tn:teacherOf(d.o).name||d.o,cn:c.n,
    st:c.st.map(function(s){var o={n:s.n};if(s.id)o.id=s.id;if(s.g)o.g=s.g;if(s.ab&&Object.keys(s.ab).length)o.ab=jcopy(s.ab);return o}),
    org:jcopy(c.org||null),seat:jcopy(c.seat||null),
    sch:window.SCHX?SCHX.schOf(d.o).filter(function(x){return x[2]===c.n}):[],
    cxr:window.CXAPI?CXAPI.rows(d.o,c.n):[],cx:{}};
}
function docOf(d,j){return{o:d.o,id:d.id,uid:d.uid,pw:d.pw,en:d.en!==false,j:JSON.stringify(j)}}
MAP.mc={
  docs:function(){
    var o={};
    if(isMon()){
      if(!M)return o;var c=(rs.c[who.id]||[])[0],j=jcopy(M.j);
      if(c){j.st=c.st;j.seat=c.seat||null}
      j.by="m";j.at=M.at||j.at||0;
      o["mc/"+who.mk]=docOf(M.d,j);return o;
    }
    Object.keys(mcd.r).forEach(function(k){var d=mcd.r[k],j=buildT(k)||d.j;if(j)o["mc/"+k]=docOf(d,j)});
    return o;
  },
  load:function(c){
    var m=pick(c,"mc/"),r={};
    Object.keys(m).forEach(function(k){
      var x=m[k],j=null;try{j=JSON.parse(x.j)}catch(e){}
      r[k]={o:x.o,id:x.id,uid:x.uid,pw:x.pw,en:x.en!==false,cn:j&&j.cn||"",j:j,ack:j&&j.ack||0};
    });
    mcd={r:r};
    if(isMon())monLoad();else setTimeout(teachApply,0);
  }
};

/* ---------- ខាងគ្រូ៖ បញ្ចូលទិន្នន័យដែលប្រធានថ្នាក់បានកែ ---------- */
function teachApply(){
  if(isMon()||!who||!sy.first.mc||!sy.first.rs||!sy.first.cx)return;
  var chR=false,chC=false;
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
    if(window.CXAPI&&CXAPI.apply(d.o,j.cn,j.cx))chC=true;
    d.ack=j.at;
  });
  if(chR||chC){if(chR)savR();_push("mc");if(typeof refreshView==="function")refreshView()}
}
/* រាល់ពេលគ្រូកែ សិស្ស/អវត្តមាន/ប្លង់តុ ឬ សម្រង់អត្ថបទ → ធ្វើបច្ចុប្បន្នភាពឯកសារប្រធានថ្នាក់ផង */
var _push=window.push;
window.push=function(k){
  if(isMon()){
    if(k==="rs"||k==="cx"){if(M)M.at=Date.now();return _push("mc")}
    return k==="mc"?_push(k):undefined;
  }
  _push(k);
  if((k==="rs"||k==="cx")&&Object.keys(mcd.r).length)_push("mc");
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
var busy=false,showPw={};
function box(){
  var el=$("monBox");if(!el)return;
  var c=curCls();
  if(isMon()||!c||!canM()||!window.db){el.innerHTML="";return}
  var k=mkey(rt,c.n),d=mcd.r[k],h="<div class=mon-box><div class=mon-h>👤 គណនីប្រធានថ្នាក់ <b>"+esc(c.n)+"</b></div>";
  if(!d){
    h+="<p>ប្រធានថ្នាក់អាចចូលស្រង់អត្ថបទ បញ្ចូលវត្តមាន និងរៀបប្លង់តុ នៃថ្នាក់នេះ (មិនអាចមើល ឬកែពិន្ទុ និងទិន្នន័យផ្សេងទៀតទេ)។ មួយថ្នាក់មានបានតែ ១ គណនី។</p>"+
      "<button type=button class=primary data-mon=new"+(busy?" disabled":"")+">＋ បង្កើតគណនីប្រធានថ្នាក់</button>";
  }else{
    var sp=showPw[k];
    h+="<div class=mon-cred><span>លេខសម្គាល់៖ <b class=mon-id>"+esc(d.id)+"</b></span><span>លេខសម្ងាត់៖ <b class=mon-id>"+(sp?esc(d.pw||"—"):"••••••••")+"</b> <button type=button data-mon=eye>"+(sp?"🙈 លាក់":"👁️ បង្ហាញ")+"</button></span>"+
      "<span class='mon-st"+(d.en?" on":"")+"'>"+(d.en?"✅ កំពុងបើក":"⏸️ បានបិទ")+"</span></div>"+
      "<div class=mon-acts><button type=button data-mon=copy>📋 ចម្លងព័ត៌មានចូល</button><button type=button data-mon=pw"+(busy?" disabled":"")+">🔄 ប្ដូរលេខសម្ងាត់ថ្មី</button>"+
      "<button type=button data-mon=tog"+(busy?" disabled":"")+">"+(d.en?"⏸️ បិទជាបណ្ដោះអាសន្ន":"▶️ បើកវិញ")+"</button><button type=button class=danger data-mon=del"+(busy?" disabled":"")+">🗑️ លុបគណនី</button></div>"+
      "<p class=note style='margin:6px 0 0'>ទិន្នន័យដែលប្រធានថ្នាក់បញ្ចូល ចូលមកក្នុង «វត្តមាន» «ប្លង់តុ» និង «សម្រង់អត្ថបទ» របស់គ្រូដោយស្វ័យប្រវត្តិ ពេលគ្រូបើកប្រព័ន្ធ។</p>";
  }
  el.innerHTML=h+"</div>";
}
function setBusy(b){busy=b;box()}
function fail(e){setBusy(false);console.error(e);alert("មិនបានសម្រេច៖ "+(typeof authErr==="function"?authErr(e):e&&e.message||e))}
function freshDoc(k,d){sy.synced.mc=sy.synced.mc||{};mcd.r[k]=d;var x=docOf(d,buildT(k)||{});sy.synced.mc["mc/"+k]=sj(x);return x}
function creds(d){return"លេខសម្គាល់៖ "+d.id+"\nលេខសម្ងាត់៖ "+d.pw+"\nគេហទំព័រ៖ "+location.origin+location.pathname}
function mkUser(id,pw,n){
  return FB.createUserWithEmailAndPassword(FB.sauth,idEmail(id),pw).catch(function(e){
    if(e&&e.code==="auth/email-already-in-use"&&n<5)return mkUser(id.replace(/-\d$/,"")+"-"+(n+2),pw,n+1);
    throw e;
  }).then(function(cr){return cr.user?{cr:cr,id:id}:cr});
}
function signMon(d){return FB.signInWithEmailAndPassword(FB.sauth,idEmail(d.id),d.pw)}
$("p8").addEventListener("click",function(e){
  var b=e.target.closest("[data-mon]");if(!b||busy)return;
  var c=curCls();if(!c||!canM())return;
  var a=b.dataset.mon,tid=rt,k=mkey(tid,c.n),d=mcd.r[k];
  if(a==="eye"){showPw[k]=!showPw[k];box();return}
  if(a==="copy"&&d){
    var t=creds(d);
    if(navigator.clipboard)navigator.clipboard.writeText(t).then(function(){notify("បានចម្លងព័ត៌មានចូល")},function(){window.prompt("ចម្លងអត្ថបទនេះ៖",t)});
    else window.prompt("ចម្លងអត្ថបទនេះ៖",t);
    return;
  }
  if(a==="new"&&!d){
    if(!ck(c.n)){alert("ឈ្មោះថ្នាក់មិនត្រឹមត្រូវ");return}
    var pw=genPw(),id=(tid+"-"+ck(c.n)).toUpperCase();setBusy(true);
    mkUser(id,pw,0).then(function(r){
      var uid=r.cr.user.uid;id=r.id;
      return FB.signOut(FB.sauth).catch(function(){}).then(function(){
        return FB.setDoc(FB.doc(db,"users",uid),{id:id,name:"ប្រធានថ្នាក់ "+c.n,role:"monitor",enabled:true,mustChange:false,t:tid,k:k,c:c.n});
      }).then(function(){
        var nd={o:tid,id:id,uid:uid,pw:pw,en:true,cn:c.n,ack:0};
        return FB.setDoc(FB.doc(db,"mc",k),freshDoc(k,nd));
      });
    }).then(function(){showPw[k]=true;setBusy(false);notify("បានបង្កើតគណនីប្រធានថ្នាក់ "+c.n)},fail);
    return;
  }
  if(!d)return;
  if(a==="pw"){
    if(!confirm("ប្ដូរលេខសម្ងាត់ថ្មីសម្រាប់ "+d.id+"?\nលេខសម្ងាត់ចាស់នឹងប្រើលែងបាន។"))return;
    var np=genPw();setBusy(true);
    signMon(d).then(function(cr){return FB.updatePassword(cr.user,np)}).then(function(){return FB.signOut(FB.sauth).catch(function(){})})
      .then(function(){d.pw=np;return FB.updateDoc(FB.doc(db,"mc",k),{pw:np})})
      .then(function(){freshDoc(k,d);showPw[k]=true;setBusy(false);notify("បានប្ដូរលេខសម្ងាត់ថ្មី")},fail);
    return;
  }
  if(a==="tog"){
    var en=!d.en;setBusy(true);
    FB.updateDoc(FB.doc(db,"users",d.uid),{enabled:en}).then(function(){return FB.updateDoc(FB.doc(db,"mc",k),{en:en})})
      .then(function(){d.en=en;freshDoc(k,d);setBusy(false);notify(en?"បានបើកគណនីវិញ":"បានបិទគណនី")},fail);
    return;
  }
  if(a==="del"){
    if(!confirm("លុបគណនីប្រធានថ្នាក់ "+d.id+"?\n\nទិន្នន័យដែលប្រធានថ្នាក់បានបញ្ចូលរួច (វត្តមាន · ប្លង់តុ · សម្រង់អត្ថបទ) នៅក្នុងទិន្នន័យគ្រូដដែល។"))return;
    setBusy(true);
    signMon(d).then(function(cr){return FB.deleteUser(cr.user)}).catch(function(e){console.warn("monitor auth delete:",e)})
      .then(function(){return FB.signOut(FB.sauth).catch(function(){})})
      .then(function(){delete mcd.r[k];if(sy.synced.mc)delete sy.synced.mc["mc/"+k];return FB.deleteDoc(FB.doc(db,"users",d.uid)).catch(function(e){console.warn(e)})})
      .then(function(){return FB.deleteDoc(FB.doc(db,"mc",k))})
      .then(function(){setBusy(false);notify("បានលុបគណនីប្រធានថ្នាក់")},fail);
  }
});

/* ========== ខាងប្រធានថ្នាក់ ========== */
function monLoad(){
  var d=mcd.r[who.mk];
  if(!d||!d.j){M=null;data=[];rs={c:{}};return}
  var keepAt=M&&M.at>(d.j.at||0)?M.at:0;
  M={d:d,j:d.j,at:keepAt||d.j.at||0};
  data=[{id:who.id,name:d.j.tn||who.id,en:true}];
  rs={c:{}};rs.c[who.id]=[{n:d.j.cn,st:jcopy(d.j.st||[]),org:jcopy(d.j.org||{n:6,r:{}}),seat:jcopy(d.j.seat||undefined)}];
  rt=who.id;rc=0;
  monTitle();
}
function monTitle(){var h=$("monTitle");if(h&&M)h.innerHTML="👤 ប្រធានថ្នាក់ <b>"+esc(M.j.cn)+"</b> · គ្រូ "+esc(M.j.tn||"")}
var PG=[["p8","🧑‍🎓 វត្តមាន"],["p16","🪑 ប្លង់តុ"],["p14","📖 សម្រង់អត្ថបទ"]];
function go(p){
  show(p);
  [].forEach.call($("monNav").querySelectorAll("button"),function(b){b.setAttribute("aria-selected",String(b.dataset.mp===p))});
  if(p==="p16"){var s=$("ogSeg").querySelector("[data-ov=seat]");if(s&&s.getAttribute("aria-selected")!=="true")s.click()}
}
window.MONUI={enter:function(){
  document.body.classList.add("mon");
  var n=$("monNav");n.hidden=false;
  n.innerHTML="<div id=monTitle class=mon-title>👤 ប្រធានថ្នាក់ "+esc(who.mc||"")+"</div><div class=seg>"+PG.map(function(x){return"<button type=button data-mp="+x[0]+">"+x[1]+"</button>"}).join("")+"</div>";
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
function pLabel(p){var m=/^(\d+)(?:-(\d+))?$/.exec(p||"");if(!m)return esc(p||"—");var a=+m[1],b=+(m[2]||a),PT=SCHX.PT;
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
  h+=(keys.length?"":"<tr><td colspan=3 class=empty>ខែនេះមិនមានម៉ោងរៀនតាមកាលវិភាគទេ។</td></tr>")+"</tbody></table></div><p class=note>💡 សរសេរខ្លឹមសារមេរៀន និងអវត្តមានសិស្សរៀងរាល់ម៉ោង។ ទិន្នន័យរក្សាទុកដោយស្វ័យប្រវត្តិ ហើយចូលទៅក្នុងសម្រង់អត្ថបទរបស់គ្រូ។</p>";
  el.innerHTML=h;
}
var mcx=$("monCx");
if(mcx){
  mcx.addEventListener("input",function(e){
    var t=e.target;
    if(t.id==="mxMo"){if(/^\d{4}-\d{2}$/.test(t.value)){mxMo=t.value;monCx()}return}
    var q=(t.dataset.mx||"").split("|");if(q.length!==3||!M)return;
    var k=q[0]+"|"+q[1],j=M.j;j.cx=j.cx||{};
    var cur=j.cx[k]||(j.cxr||[]).filter(function(r){return r.d===q[0]&&r.p===q[1]})[0]||{},v={c:cur.c||"",a:cur.a||"",ls:cur.ls||""};
    v[q[2]]=t.value;j.cx[k]=v;M.at=Date.now();_push("mc");
  });
}
})();
