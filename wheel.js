/* ========================================================================
   🎡 កងបង្វិល (Spin Wheel) — ផ្ទាំង «រចនាសម្ព័ន្ធថ្នាក់» › tab «🎡 កងបង្វិល»
   ចាប់សិស្ស · ចាប់ក្រុម · បញ្ជីបញ្ចូលដោយដៃ · ចែកក្រុមចៃដន្យ (មើលជាមុន)
   ⚠️ អានតែ c.st និង c.org ប៉ុណ្ណោះ — មិនសរសេរ rs / savR / push / Firestore ទេ
   ប្រវត្តិ និងបញ្ជីអ្នកដែលចាប់រួច នៅក្នុង memory ប៉ុណ្ណោះ · មានតែ «បញ្ជីដោយដៃ» ក្នុង localStorage តាមឧបករណ៍
   ឈ្មោះគូសលើ canvas (fillText) ហើយអត្ថបទក្នុង HTML ឆ្លងកាត់ esc() ទាំងអស់
   ======================================================================== */
(function(){
"use strict";
var W={ck:"",src:"st",rem:true,gone:{},hist:[],rot:0,busy:false,res:null,split:null,nt:3,cust:null,mute:false,idle:0,ov:null,dbg:{n:0,bad:0}};
var HUE=[230,330,160,28,195,280,100,0,50,300];
var LSK="whCustom";

function E(s){return typeof esc==="function"?esc(s):String(s==null?"":s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function N(n){return typeof kn==="function"?kn(n):String(n)}
function key(s){return s.id?"i:"+s.id:"n:"+s.n}
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t}return a}

/* ---------- ទិន្នន័យ (អានតែប៉ុណ្ណោះ) ---------- */
function groupsOf(c){
  var n=(c.org&&c.org.n)||6,r=(c.org&&c.org.r)||{},g=[],i;
  for(i=0;i<n;i++)g.push({k:"g"+(i+1),label:"ក្រុមទី"+N(i+1),m:[]});
  (c.st||[]).forEach(function(s){var q=r[key(s)];if(q&&q.g>=1&&q.g<=n)g[q.g-1].m.push(s.n)});
  return g.filter(function(x){return x.m.length});
}
function customLines(){
  return String(W.cust||"").split(/\r?\n/).map(function(x){return x.trim()}).filter(Boolean).slice(0,60)
    .map(function(t,i){return{k:"c"+i+"|"+t,label:t.slice(0,40)}});
}
function items(c){
  if(W.src==="gr")return groupsOf(c).map(function(g){return{k:g.k,label:g.label}});
  if(W.src==="cu")return customLines();
  return(c.st||[]).map(function(s){return{k:key(s),label:s.n}});
}
function live(c){return items(c).filter(function(x){return!W.gone[x.k]})}
/* ចែកក្រុមចៃដន្យស្មើៗ គ្នា (ជុំវិល) → [[ឈ្មោះ…],…] */
function splitTeams(names,n){
  var o=shuffle(names),t=[],i;n=Math.max(1,Math.min(n,o.length||1));
  for(i=0;i<n;i++)t.push([]);
  o.forEach(function(x,j){t[j%n].push(x)});
  return t;
}
/* មុំចុងក្រោយ៖ កណ្ដាលចំណែក w ត្រូវនៅត្រង់ព្រួញ (ខាងលើ) */
function targetRot(cur,w,n){
  var a=Math.PI*2/n,tg=-((w+.5)*a),d=(((tg-cur)%(Math.PI*2))+Math.PI*2)%(Math.PI*2);
  return cur+d+Math.PI*2*(5+Math.floor(Math.random()*3));
}
function winnerAt(rot,n){
  var a=Math.PI*2/n,x=((-rot%(Math.PI*2))+Math.PI*2)%(Math.PI*2);
  return Math.floor(x/a)%n;
}

/* ---------- សំឡេង (Web Audio សុទ្ធ · មានប៊ូតុងបិទ/បើក) ---------- */
var AC=null;
function loadMute(){try{W.mute=localStorage.getItem("whMute")==="1"}catch(e){W.mute=false}}
function tone(f,d,v,type,delay){if(W.mute)return;try{var C=window.AudioContext||window.webkitAudioContext;if(!C)return;AC=AC||new C();if(AC.state==="suspended")AC.resume();
  var o=AC.createOscillator(),g=AC.createGain(),t=AC.currentTime+(delay||0);
  o.type=type||"sine";o.frequency.value=f;g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(AC.destination);o.start(t);o.stop(t+d+.02)}catch(e){}}
/* តឹក៖ ខ្ពស់បន្តិចតាមលំដាប់ចំណែក · fanfare៖ C–E–G–C ផ្លែក្រោយ */
function tick(k){tone(520+(k%6)*55,.035,.07,"square")}
function fanfare(){[523,659,784,1047].forEach(function(f,i){tone(f,.22,.12,"triangle",i*.11)});tone(1047,.6,.1,"sine",.46);tone(1319,.6,.08,"sine",.46)}
function still(){return window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches}

/* ---------- គូរកង (3D game-show) ---------- */
var NB=28;
function rimDraw(g,S,R,ph){
  var r0=S/2-4,i,rg=g.createRadialGradient(0,0,R,0,0,r0);
  rg.addColorStop(0,"#5a3a00");rg.addColorStop(.35,"#f6c545");rg.addColorStop(.7,"#b8860b");rg.addColorStop(1,"#4a2f00");
  g.beginPath();g.arc(0,0,r0,0,7);g.fillStyle=rg;g.fill();
  g.beginPath();g.arc(0,0,r0-1,0,7);g.strokeStyle="rgba(255,255,255,.45)";g.lineWidth=2;g.stroke();
  var br=(R+r0)/2;
  for(i=0;i<NB;i++){
    var an=i/NB*Math.PI*2-Math.PI/2,x=Math.cos(an)*br,y=Math.sin(an)*br,on=still()?(i%2===0):((i+Math.floor(ph))%3===0);
    g.save();g.beginPath();g.arc(x,y,7.5,0,7);
    if(on){g.shadowColor="#ffe066";g.shadowBlur=16;var bg=g.createRadialGradient(x-2,y-2,1,x,y,8);bg.addColorStop(0,"#fff");bg.addColorStop(.5,"#ffe066");bg.addColorStop(1,"#ff9f1a");g.fillStyle=bg}
    else g.fillStyle="#7a5a12";
    g.fill();g.restore();
  }
}
function draw(root,c){
  var cv=root.querySelector("canvas"),L=live(c),n=L.length,S=cv.width,R=S/2-36,g=cv.getContext("2d"),i;
  var ph=W.busy?W.rot/(Math.PI*2)*6:W.idle;
  g.clearRect(0,0,S,S);g.save();g.translate(S/2,S/2);
  rimDraw(g,S,R,ph);
  if(!n){g.fillStyle="#8886";g.beginPath();g.arc(0,0,R,0,7);g.fill();g.fillStyle="#fff";g.font="600 26px system-ui,sans-serif";g.textAlign="center";g.fillText("គ្មានឈ្មោះ",0,8);g.restore();return}
  var a=Math.PI*2/n;
  for(i=0;i<n;i++){
    var s=W.rot+i*a-Math.PI/2;
    g.beginPath();g.moveTo(0,0);g.arc(0,0,R,s,s+a);g.closePath();
    g.fillStyle="hsl("+HUE[i%HUE.length]+","+(i%2?62:70)+"%,"+(i%2?42:48)+"%)";g.fill();
    g.strokeStyle="rgba(255,255,255,.85)";g.lineWidth=2;g.stroke();
    g.save();g.rotate(s+a/2);g.textAlign="right";g.textBaseline="middle";g.fillStyle="#fff";
    var fs=Math.max(9,Math.min(24,Math.floor(R*a*.42))),F=function(){g.font="600 "+fs+"px 'Khmer OS Siemreap','Siemreap','Kantumruy Pro',system-ui,sans-serif"};
    /* អក្សរត្រូវនៅក្នុងចំណែក៖ ត្រង់កាំ r ទទឹងចំណែក = a·r ≥ កម្ពស់អក្សរ → កាត់ឈ្មោះមិនឲ្យលើសកាំអប្បបរមា */
    var out=R-16,t=L[i].label,minR,maxW;F();
    for(;;){minR=Math.min(R*.8,Math.max(46,fs*1.05/a));maxW=out-minR;if(maxW>=R*.3||fs<=9)break;fs-=1}
    F();while(t.length>2&&g.measureText(t).width>maxW)t=t.slice(0,-2)+"…";
    W.dbg.n++;if(out-g.measureText(t).width<minR-1)W.dbg.bad++;
    g.shadowColor="rgba(0,0,0,.45)";g.shadowBlur=3;g.fillText(t,R-16,0);g.restore();
  }
  /* 3D៖ ពន្លឺកណ្ដាល → ស្រមោលគែម · ពន្លឺចាំងថេរខាងលើឆ្វេង · ស្រមោលក្នុងគែម */
  var sh=g.createRadialGradient(0,0,R*.12,0,0,R);sh.addColorStop(0,"rgba(255,255,255,.22)");sh.addColorStop(.6,"rgba(255,255,255,0)");sh.addColorStop(1,"rgba(0,0,0,.34)");
  g.beginPath();g.arc(0,0,R,0,7);g.fillStyle=sh;g.fill();
  g.save();g.beginPath();g.arc(0,0,R-2,0,7);g.clip();
  var gl=g.createLinearGradient(-R*.7,-R*.9,R*.2,R*.1);gl.addColorStop(0,"rgba(255,255,255,.34)");gl.addColorStop(.5,"rgba(255,255,255,.06)");gl.addColorStop(1,"rgba(255,255,255,0)");
  g.beginPath();g.ellipse(-R*.22,-R*.5,R*.62,R*.32,-.55,0,7);g.fillStyle=gl;g.fill();g.restore();
  g.beginPath();g.arc(0,0,R,0,7);g.strokeStyle="rgba(0,0,0,.45)";g.lineWidth=5;g.stroke();
  /* ប៊ូតុងកណ្ដាល RM */
  var hb=g.createRadialGradient(-8,-10,3,0,0,44);hb.addColorStop(0,"#fff");hb.addColorStop(.55,"#ffe39a");hb.addColorStop(1,"#d49a1a");
  g.save();g.shadowColor="rgba(0,0,0,.5)";g.shadowBlur=12;g.shadowOffsetY=4;g.beginPath();g.arc(0,0,42,0,7);g.fillStyle=hb;g.fill();g.restore();
  g.beginPath();g.arc(0,0,42,0,7);g.strokeStyle="#8a5a00";g.lineWidth=4;g.stroke();
  g.fillStyle="#7a1f1f";g.font="800 28px system-ui,sans-serif";g.textAlign="center";g.textBaseline="middle";g.fillText("RM",0,2);
  g.restore();
}
/* ព្រួញងក់៖ ម្ជុលចំណែកចូលមកច្រានចុងព្រួញ រួចលែង (sawtooth) */
function bounce(root,rot,n){
  var p=root.querySelector(".wh-ptr");if(!p)return;
  if(!W.busy||!n||still()){p.style.transform="";return}
  var a=Math.PI*2/n,x=(((-rot%(Math.PI*2))+Math.PI*2)%(Math.PI*2))/a,f=x-Math.floor(x),d=f>.78?(f-.78)/.22:0;
  p.style.transform="translateX(-50%) rotate("+(-d*30).toFixed(1)+"deg)";
}
/* ក្រដាសអបអរ (canvas ផ្ទាល់ខ្លួន · ~៣ វិនាទី · មិនប៉ះ DOM ផ្សេង) */
function confetti(){
  if(still()||!document.body)return;
  var cv=document.createElement("canvas"),w=cv.width=innerWidth,h=cv.height=innerHeight,g=cv.getContext("2d"),P=[],i,t0=null;
  cv.className="wh-cf";document.body.appendChild(cv);
  for(i=0;i<150;i++)P.push({x:Math.random()*w,y:-20-Math.random()*h*.4,vx:(Math.random()-.5)*4,vy:2+Math.random()*4,s:6+Math.random()*7,r:Math.random()*6,vr:(Math.random()-.5)*.35,c:"hsl("+Math.floor(Math.random()*360)+",85%,58%)"});
  (function f(ts){
    if(t0===null)t0=ts;var el=ts-t0;g.clearRect(0,0,w,h);
    P.forEach(function(q){q.x+=q.vx+Math.sin(q.r)*1.2;q.y+=q.vy;q.vy+=.04;q.r+=q.vr;
      g.save();g.translate(q.x,q.y);g.rotate(q.r);g.globalAlpha=Math.max(0,1-Math.max(0,el-2200)/800);g.fillStyle=q.c;g.fillRect(-q.s/2,-q.s/3,q.s,q.s*.6);g.restore()});
    if(el<3000&&cv.isConnected)requestAnimationFrame(f);else cv.remove();
  })(performance.now());
}

/* ---------- ផ្ទៃ ---------- */
function ctl(c){
  var L=live(c),tot=items(c).length,hasGr=groupsOf(c).length>0;
  return"<div class=wh-bar>"+
   "<label>ប្រភព៖ <select data-wh=src>"+
     "<option value=st"+(W.src==="st"?" selected":"")+">👥 សិស្សក្នុងថ្នាក់ ("+N((c.st||[]).length)+")</option>"+
     "<option value=gr"+(W.src==="gr"?" selected":"")+">🏛️ ក្រុមប្រចាំថ្នាក់"+(hasGr?"":" (មិនទាន់មាន)")+"</option>"+
     "<option value=cu"+(W.src==="cu"?" selected":"")+">✍️ បញ្ជីដោយដៃ</option></select></label>"+
   "<label class=wh-ck><input type=checkbox data-wh=rem"+(W.rem?" checked":"")+"> ដកអ្នកដែលចាប់បានចេញ</label>"+
   "<button type=button data-wh=snd title='បិទ/បើកសំឡេង'>"+(W.mute?"🔇 បិទសំឡេង":"🔊 សំឡេង")+"</button>"+
   "<button type=button data-wh=reset title='ដាក់ឈ្មោះដែលចាប់រួចត្រឡប់មកវិញ'>↩︎ ដាក់ត្រឡប់ ("+N(tot-L.length)+")</button>"+
  "</div>"+(W.src==="cu"?"<textarea data-wh=cust class=wh-ta rows=4 maxlength=3000 placeholder='មួយបន្ទាត់ ១ ឈ្មោះ (ឧ. ប្រធានបទស្រាវជ្រាវ ១, ប្រធានបទ ២ …)'>"+E(W.cust||"")+"</textarea>":"");
}
function histHtml(){
  return W.hist.length?W.hist.slice(-12).reverse().map(function(h,i){return"<li>"+E(h)+"</li>"}).join(""):"<li class=e>មិនទាន់មានលទ្ធផល</li>";
}
function splitHtml(){
  if(!W.split)return"";
  return W.split.map(function(t,i){return"<div class=wh-tm style='--h:"+HUE[i%HUE.length]+"'><b>ក្រុមទី"+N(i+1)+"</b> · "+N(t.length)+" នាក់<ol>"+t.map(function(x){return"<li>"+E(x)+"</li>"}).join("")+"</ol></div>"}).join("");
}
function liveHtml(){return"<div class='wh-win live'><small>🎡 កំពុងវិល…</small><b data-whlive>…</b></div>"}
function resHtml(){
  return W.res?"<div class='wh-win done'><small>🎉 លទ្ធផល</small><b>"+E(W.res)+"</b></div>":"<div class=wh-win><small>ចុច «🎡 បង្វិល» ដើម្បីចាប់</small></div>";
}
function mount(c,body){
  body.innerHTML="<div data-whroot class=wh>"+
   "<div data-whctl>"+ctl(c)+"</div>"+
   "<div class=wh-main><div class=wh-cv><div class=wh-ptr></div><canvas width=600 height=600 aria-label='កងបង្វិល' title='ចុចដើម្បីបង្វិល'></canvas></div>"+
   "<div class=wh-side><button type=button class=primary data-wh=spin>🎡 បង្វិល</button><div data-whres>"+resHtml()+"</div>"+
   "<h4>ប្រវត្តិ (វគ្គនេះ)</h4><ol class=wh-hist data-whhist>"+histHtml()+"</ol>"+
   "<h4>🧩 ចែកក្រុមចៃដន្យ</h4><div class=wh-bar><label>ចំនួនក្រុម <input type=number min=2 max=10 value="+W.nt+" data-wh=nt style='width:60px'></label><button type=button data-wh=split>ចែក</button></div>"+
   "<p class=note style='margin:4px 0'>មើលជាមុនតែប៉ុណ្ណោះ — មិនប៉ះ «រចនាសម្ព័ន្ធ» ទេ។</p></div></div>"+
   "<div class=wh-teams data-whteams>"+splitHtml()+"</div></div>";
  var root=body.firstChild;root._c=c;
  root.addEventListener("click",function(e){var b=e.target.closest("button[data-wh]");if(b)return act(b.dataset.wh,root,root._c);if(e.target.tagName==="CANVAS")act("spin",root,root._c)});
  root.addEventListener("change",function(e){var t=e.target,k=t.dataset.wh;if(!k)return;
    if(k==="src"){if(W.busy)return;W.src=t.value;W.res=null;W.gone={};refresh(root,root._c,true)}
    else if(k==="rem")W.rem=t.checked;
    else if(k==="nt")W.nt=Math.max(2,Math.min(10,+t.value||3))});
  root.addEventListener("input",function(e){var t=e.target;if(t.dataset.wh!=="cust")return;W.cust=t.value;W.gone={};
    try{if(window.LSG&&LSG.set)LSG.set(localStorage,LSK,t.value);else localStorage.setItem(LSK,t.value)}catch(x){}
    draw(root,root._c);root.querySelector("[data-whctl] button[data-wh=reset]").textContent="↩︎ ដាក់ត្រឡប់ (០)"});
  draw(root,c);
  if(!still()){var tm=setInterval(function(){if(!root.isConnected){clearInterval(tm);return}if(!W.busy&&!document.hidden){W.idle++;draw(root,root._c)}},600)}
}
function refresh(root,c,full){
  if(full){var h=root.querySelector("[data-whctl]");h.innerHTML=ctl(c)}
  else{var b=root.querySelector("button[data-wh=reset]");if(b)b.textContent="↩︎ ដាក់ត្រឡប់ ("+N(items(c).length-live(c).length)+")"}
  root.querySelector("[data-whres]").innerHTML=resHtml();
  root.querySelector("[data-whhist]").innerHTML=histHtml();
  draw(root,c);
}
function act(a,root,c){
  if(a==="snd"){W.mute=!W.mute;try{localStorage.setItem("whMute",W.mute?"1":"0")}catch(e){}refresh(root,c,true);if(!W.mute)tick(2);return}
  if(a==="reset"){if(W.busy)return;W.gone={};W.res=null;refresh(root,c,true);return}
  if(a==="split"){
    var names=(c.st||[]).map(function(s){return s.n});
    if(names.length<2){if(typeof notify==="function")notify("ត្រូវការសិស្សយ៉ាងតិច ២ នាក់");return}
    W.split=splitTeams(names,W.nt);root.querySelector("[data-whteams]").innerHTML=splitHtml();return;
  }
  if(a!=="spin"||W.busy)return;
  var L=live(c),n=L.length;
  if(!n){if(typeof notify==="function")notify(W.src==="cu"?"សូមបញ្ចូលឈ្មោះក្នុងបញ្ជី":W.gone&&items(c).length?"ចាប់អស់ហើយ — ចុច «ដាក់ត្រឡប់»":"គ្មានឈ្មោះសម្រាប់បង្វិល");return}
  var w=Math.floor(Math.random()*n),from=W.rot,to=targetRot(from,w,n),dur=(window.WHEEL&&WHEEL._dur)||4200,t0=null,last=-1;
  closeOv();W.busy=true;W.res=null;
  root.querySelector("[data-whres]").innerHTML=liveHtml();var lv=root.querySelector("[data-whlive]");
  var btn=root.querySelector("button[data-wh=spin]");btn.disabled=true;
  function step(ts){
    if(!root.isConnected){W.busy=false;closeOv();return}      /* ចាកចេញពី tab ពេលកំពុងបង្វិល */
    if(t0===null)t0=ts;var p=Math.min(1,(ts-t0)/dur),e=1-Math.pow(1-p,3.4);
    W.rot=from+(to-from)*e;draw(root,root._c);bounce(root,W.rot,n);
    var cur=winnerAt(W.rot,n);if(cur!==last){last=cur;tick(cur);if(lv&&L[cur])lv.textContent=L[cur].label}
    if(p<1)return requestAnimationFrame(step);
    W.rot=to%(Math.PI*2);W.busy=false;btn.disabled=false;bounce(root,W.rot,n);
    var pick=L[winnerAt(W.rot,n)]||L[w];W.res=pick.label;W.hist.push(pick.label);
    if(W.rem)W.gone[pick.k]=1;
    refresh(root,root._c,false);fanfare();confetti();showOv(root,pick);
  }
  requestAnimationFrame(step);
}
/* 🏆 កាតអ្នកឈ្នះ */
function closeOv(){if(W.ov){document.removeEventListener("keydown",W.ov._k);W.ov.remove();W.ov=null}}
function showOv(root,pick){
  closeOv();
  var gone=!!W.gone[pick.k],o=document.createElement("div");
  o.className="wh-ov";o.setAttribute("role","dialog");o.setAttribute("aria-modal","true");
  o.innerHTML="<div class=wh-card><div class=wh-tr>🏆</div><small>🎉 សូមអបអរសាទរ 🎉</small><b>"+E(pick.label)+"</b>"+
    "<div class=wh-ca><button type=button class=primary data-ov=go>🎡 បន្តវិល</button>"+
    "<button type=button data-ov=rm>"+(gone?"↩︎ ទុកឈ្មោះវិញ":"🗑️ ដកឈ្មោះចេញ")+"</button>"+
    "<button type=button data-ov=x>✕ បិទ</button></div></div>";
  o.addEventListener("click",function(e){
    var b=e.target.closest("button[data-ov]"),k=b?b.dataset.ov:(e.target===o?"x":"");if(!k)return;
    var c=root._c;
    if(k==="rm"){if(W.gone[pick.k])delete W.gone[pick.k];else W.gone[pick.k]=1;closeOv();refresh(root,c,true);return}
    closeOv();if(k==="go")act("spin",root,c);
  });
  o._k=function(e){if(e.key==="Escape")closeOv()};document.addEventListener("keydown",o._k);
  document.body.appendChild(o);W.ov=o;var f=o.querySelector("[data-ov=go]");if(f)f.focus();
}

/* ហៅពី classorg.js renderOrg() — idempotent៖ បើបានបង្កើតរួចសម្រាប់ថ្នាក់ដដែល មិនសាងសង់ឡើងវិញ */
function loadMute0(){if(!W.mlo){W.mlo=1;loadMute()}}
function render(c,body){
  var ck=(c.n||"")+"|"+(c.st||[]).length+"|"+(window.who&&window.who.id||"");
  loadMute0();
  if(W.cust===null){try{W.cust=localStorage.getItem(LSK)||""}catch(e){W.cust=""}}
  if(ck!==W.ck){W.ck=ck;W.gone={};W.hist=[];W.res=null;W.split=null}
  var root=body.querySelector("[data-whroot]");
  if(root&&root.isConnected){root._c=c;draw(root,c);return}
  mount(c,body);
}
window.WHEEL={_dur:0,_W:W,render:render,_splitTeams:splitTeams,_winnerAt:winnerAt,_targetRot:targetRot,_groups:groupsOf};
})();
