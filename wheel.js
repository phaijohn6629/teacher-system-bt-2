/* ========================================================================
   🎡 កងបង្វិល (Spin Wheel) — ផ្ទាំង «រចនាសម្ព័ន្ធថ្នាក់» › tab «🎡 កងបង្វិល»
   ចាប់សិស្ស · ចាប់ក្រុម · បញ្ជីបញ្ចូលដោយដៃ · ចែកក្រុមចៃដន្យ (មើលជាមុន)
   ⚠️ អានតែ c.st និង c.org ប៉ុណ្ណោះ — មិនសរសេរ rs / savR / push / Firestore ទេ
   ប្រវត្តិ និងបញ្ជីអ្នកដែលចាប់រួច នៅក្នុង memory ប៉ុណ្ណោះ · មានតែ «បញ្ជីដោយដៃ» ក្នុង localStorage តាមឧបករណ៍
   ឈ្មោះគូសលើ canvas (fillText) ហើយអត្ថបទក្នុង HTML ឆ្លងកាត់ esc() ទាំងអស់
   ======================================================================== */
(function(){
"use strict";
var W={ck:"",src:"st",rem:true,gone:{},hist:[],rot:0,busy:false,res:null,split:null,nt:3,cust:null,dbg:{n:0,bad:0}};
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

/* ---------- សំឡេង ---------- */
var AC=null;
function tone(f,d,v){try{var C=window.AudioContext||window.webkitAudioContext;if(!C)return;AC=AC||new C();var o=AC.createOscillator(),g=AC.createGain(),t=AC.currentTime;
  o.frequency.value=f;g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(AC.destination);o.start(t);o.stop(t+d)}catch(e){}}

/* ---------- គូរកង ---------- */
function draw(root,c){
  var cv=root.querySelector("canvas"),L=live(c),n=L.length,S=cv.width,R=S/2-8,g=cv.getContext("2d"),i;
  g.clearRect(0,0,S,S);g.save();g.translate(S/2,S/2);
  if(!n){g.fillStyle="#8884";g.beginPath();g.arc(0,0,R,0,7);g.fill();g.fillStyle="#888";g.font="600 26px system-ui,sans-serif";g.textAlign="center";g.fillText("គ្មានឈ្មោះ",0,8);g.restore();return}
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
  g.beginPath();g.arc(0,0,30,0,7);g.fillStyle="#fff";g.fill();g.strokeStyle="rgba(0,0,0,.2)";g.lineWidth=3;g.stroke();
  g.restore();
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
function resHtml(){
  return W.res?"<div class=wh-win><small>🎉 លទ្ធផល</small><b>"+E(W.res)+"</b></div>":"<div class=wh-win><small>ចុច «🎡 បង្វិល» ដើម្បីចាប់</small></div>";
}
function mount(c,body){
  body.innerHTML="<div data-whroot class=wh>"+
   "<div data-whctl>"+ctl(c)+"</div>"+
   "<div class=wh-main><div class=wh-cv><div class=wh-ptr></div><canvas width=600 height=600 aria-label='កងបង្វិល'></canvas></div>"+
   "<div class=wh-side><button type=button class=primary data-wh=spin>🎡 បង្វិល</button><div data-whres>"+resHtml()+"</div>"+
   "<h4>ប្រវត្តិ (វគ្គនេះ)</h4><ol class=wh-hist data-whhist>"+histHtml()+"</ol>"+
   "<h4>🧩 ចែកក្រុមចៃដន្យ</h4><div class=wh-bar><label>ចំនួនក្រុម <input type=number min=2 max=10 value="+W.nt+" data-wh=nt style='width:60px'></label><button type=button data-wh=split>ចែក</button></div>"+
   "<p class=note style='margin:4px 0'>មើលជាមុនតែប៉ុណ្ណោះ — មិនប៉ះ «រចនាសម្ព័ន្ធ» ទេ។</p></div></div>"+
   "<div class=wh-teams data-whteams>"+splitHtml()+"</div></div>";
  var root=body.firstChild;root._c=c;
  root.addEventListener("click",function(e){var b=e.target.closest("button[data-wh]");if(b)act(b.dataset.wh,root,root._c)});
  root.addEventListener("change",function(e){var t=e.target,k=t.dataset.wh;if(!k)return;
    if(k==="src"){if(W.busy)return;W.src=t.value;W.res=null;W.gone={};refresh(root,root._c,true)}
    else if(k==="rem")W.rem=t.checked;
    else if(k==="nt")W.nt=Math.max(2,Math.min(10,+t.value||3))});
  root.addEventListener("input",function(e){var t=e.target;if(t.dataset.wh!=="cust")return;W.cust=t.value;W.gone={};
    try{if(window.LSG&&LSG.set)LSG.set(localStorage,LSK,t.value);else localStorage.setItem(LSK,t.value)}catch(x){}
    draw(root,root._c);root.querySelector("[data-whctl] button[data-wh=reset]").textContent="↩︎ ដាក់ត្រឡប់ (០)"});
  draw(root,c);
}
function refresh(root,c,full){
  if(full){var h=root.querySelector("[data-whctl]");h.innerHTML=ctl(c)}
  else{var b=root.querySelector("button[data-wh=reset]");if(b)b.textContent="↩︎ ដាក់ត្រឡប់ ("+N(items(c).length-live(c).length)+")"}
  root.querySelector("[data-whres]").innerHTML=resHtml();
  root.querySelector("[data-whhist]").innerHTML=histHtml();
  draw(root,c);
}
function act(a,root,c){
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
  W.busy=true;W.res=null;
  var btn=root.querySelector("button[data-wh=spin]");btn.disabled=true;
  function step(ts){
    if(!root.isConnected){W.busy=false;return}      /* ចាកចេញពី tab ពេលកំពុងបង្វិល */
    if(t0===null)t0=ts;var p=Math.min(1,(ts-t0)/dur),e=1-Math.pow(1-p,3.4);
    W.rot=from+(to-from)*e;draw(root,root._c);
    var cur=winnerAt(W.rot,n);if(cur!==last){last=cur;tone(700+(cur%5)*40,.04,.06)}
    if(p<1)return requestAnimationFrame(step);
    W.rot=to%(Math.PI*2);W.busy=false;btn.disabled=false;
    var pick=L[winnerAt(W.rot,n)]||L[w];W.res=pick.label;W.hist.push(pick.label);
    if(W.rem)W.gone[pick.k]=1;
    tone(660,.12,.14);setTimeout(function(){tone(990,.25,.14)},110);
    refresh(root,root._c,false);
  }
  requestAnimationFrame(step);
}

/* ហៅពី classorg.js renderOrg() — idempotent៖ បើបានបង្កើតរួចសម្រាប់ថ្នាក់ដដែល មិនសាងសង់ឡើងវិញ */
function render(c,body){
  var ck=(c.n||"")+"|"+(c.st||[]).length+"|"+(window.who&&window.who.id||"");
  if(W.cust===null){try{W.cust=localStorage.getItem(LSK)||""}catch(e){W.cust=""}}
  if(ck!==W.ck){W.ck=ck;W.gone={};W.hist=[];W.res=null;W.split=null}
  var root=body.querySelector("[data-whroot]");
  if(root&&root.isConnected){root._c=c;draw(root,c);return}
  mount(c,body);
}
window.WHEEL={_dur:0,_W:W,render:render,_splitTeams:splitTeams,_winnerAt:winnerAt,_targetRot:targetRot,_groups:groupsOf};
})();
