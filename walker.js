/* ========================================================================
   តួអង្គ cartoon ដើរលើបដាស្វាគមន៍ (ទំព័រដើម)
   - ក្បាល៖ រូប cartoon ផ្ទាល់ខ្លួន (រក្សាក្នុង browser) ឬរូបថតប្រវត្តិរូប + តម្រង cartoon
   - ប្រតិកម្ម៖ ការជូនដំណឹង (🔔) និងសារ (toast) → ភ្ញាក់ផ្អើល / សប្បាយ តាមស្ថានភាព
   - បិទបានក្នុង ⚙️ ការកំណត់ · មិនដើរបើកុំព្យូទ័រកំណត់ «កាត់បន្ថយចលនា»
   ======================================================================== */
(function(){
"use strict";
var el=null,x=0,dir=1,raf=0,last=0,pause=0,face="",faceKey="",sayT=0,nag=0,REDUCE=matchMedia("(prefers-reduced-motion: reduce)").matches;
function on(){try{return localStorage.getItem("walker")!=="0"}catch(e){return true}}
function toonKey(){return"toon_"+(window.who?who.id:"")}
function ownToon(){try{return localStorage.getItem(toonKey())||""}catch(e){return""}}

/* តម្រង cartoon៖ ធ្វើឱ្យរលោង → បន្ថយពណ៌ (posterize) → គូសគែមខ្មៅ (Sobel) */
function cartoonize(src,cb){
  var im=new Image();
  im.onload=function(){
    var N=128,cv=document.createElement("canvas");cv.width=cv.height=N;
    var c=cv.getContext("2d");c.filter="blur(1px) saturate(1.35) contrast(1.1)";c.drawImage(im,0,0,N,N);c.filter="none";
    var id=c.getImageData(0,0,N,N),d=id.data,g=new Float32Array(N*N),i,y,xx;
    for(i=0;i<N*N;i++)g[i]=.299*d[i*4]+.587*d[i*4+1]+.114*d[i*4+2];
    var Q=48;
    for(y=0;y<N;y++)for(xx=0;xx<N;xx++){
      var k=y*N+xx,p=k*4;
      for(var ch=0;ch<3;ch++)d[p+ch]=Math.min(255,Math.round(d[p+ch]/Q)*Q+12);
      if(y>0&&y<N-1&&xx>0&&xx<N-1){
        var gx=-g[k-N-1]-2*g[k-1]-g[k+N-1]+g[k-N+1]+2*g[k+1]+g[k+N+1],
            gy=-g[k-N-1]-2*g[k-N]-g[k-N+1]+g[k+N-1]+2*g[k+N]+g[k+N+1];
        if(Math.sqrt(gx*gx+gy*gy)>95){d[p]=d[p+1]=d[p+2]=35}
      }
    }
    c.putImageData(id,0,0);cb(cv.toDataURL("image/png"));
  };
  im.onerror=function(){cb("")};
  im.src=src;
}
function headSrc(cb){
  var own=ownToon();if(own)return cb(own);
  var p=window.profs&&who&&profs[who.id],ph=p&&p.photo;
  if(!ph)return cb("");
  if(faceKey===ph&&face)return cb(face);
  cartoonize(ph,function(u){face=u;faceKey=ph;cb(u)});
}
function svg(img){
  var ini=esc(Array.from(String((window.who&&who.name)||"?").trim())[0]||"?");
  return"<svg viewBox='0 0 60 100' class=wk-svg><defs><clipPath id=wkClip><circle cx=30 cy=24 r=20 /></clipPath>"+
   "<linearGradient id=wkShirt x1=0 y1=0 x2=1 y2=1><stop offset=0 stop-color='#6366f1'/><stop offset=1 stop-color='#ec4899'/></linearGradient></defs>"+
   "<g class=wk-legL><path d='M26 70 L24 92' /><path d='M24 92 L19 94' /></g><g class=wk-legR><path d='M34 70 L36 92' /><path d='M36 92 L41 94' /></g>"+
   "<g class=wk-armL><path d='M18 50 L10 66' /></g><g class=wk-armR><path d='M42 50 L50 66' /></g>"+
   "<rect x=17 y=43 width=26 height=30 rx=9 fill='url(#wkShirt)' />"+
   "<circle cx=30 cy=24 r=21 fill='#fff' />"+
   (img?"<image href='"+img+"' x=10 y=4 width=40 height=40 clip-path='url(#wkClip)' preserveAspectRatio='xMidYMid slice' />":
        "<circle cx=30 cy=24 r=20 fill='#fde68a' /><text x=30 y=31 text-anchor=middle font-size=18 font-weight=700 fill='#7c3aed'>"+ini+"</text>")+
   "<circle cx=30 cy=24 r=20 fill=none stroke='#1f2937' stroke-width=1.5 /></svg>";
}
function mount(){
  var b=document.querySelector("#p0 .welcome-banner");if(!b)return null;
  if(el&&el.parentNode===b)return el;
  el=document.createElement("button");el.type="button";el.className="wk";el.title="ចុចដើម្បីមើលការជូនដំណឹង";el.setAttribute("aria-label","តួអង្គ · មើលការជូនដំណឹង");
  el.innerHTML="<span class=wk-bub hidden></span><span class=wk-body></span>";
  el.onclick=function(){var bell=document.getElementById("ntBell");if(bell)bell.click()};
  b.appendChild(el);b.classList.add("has-wk");return el;
}
function paint(){if(!el)return;headSrc(function(u){el.querySelector(".wk-body").innerHTML=svg(u)})}
function lane(){var b=el.parentNode;return Math.max(0,b.clientWidth-el.offsetWidth-8)}
function step(t){
  raf=requestAnimationFrame(step);
  if(!el||!el.isConnected||document.hidden){last=t;return}
  var dt=Math.min(64,t-(last||t));last=t;
  if(t<pause){el.classList.remove("walk");return}
  el.classList.add("walk");
  var w=lane();x+=dir*dt*0.045;
  if(x>w){x=w;dir=-1}else if(x<0){x=0;dir=1}
  el.style.transform="translateX("+x+"px)";el.classList.toggle("left",dir<0);
  el.classList.toggle("bl",x>w-270);   /* ជិតគែមស្ដាំ → ពពុះនិយាយនៅខាងឆ្វេង */
}
/* និយាយ + កាយវិការ៖ kind = "alert" (ភ្ញាក់ផ្អើល) · "event" (លោត) · "ok" (គ្រវីដៃ) · "err" (ភ្ញាក់ផ្អើលខ្លាំង) */
function say(text,kind,ms){
  if(!el||!el.isConnected)return;
  var bub=el.querySelector(".wk-bub");bub.textContent=text;bub.hidden=false;bub.className="wk-bub "+(kind||"ok");
  el.classList.remove("re-alert","re-event","re-ok","re-err");void el.offsetWidth;el.classList.add("re-"+(kind||"ok"));
  pause=performance.now()+(ms||2600);
  clearTimeout(sayT);sayT=setTimeout(function(){bub.hidden=true;el.classList.remove("re-alert","re-event","re-ok","re-err")},ms||2600);
}
/* ហៅពី renderDash៖ nt = [[icon, text, sub, go], ...] */
function react(nt){
  if(!on()){off();return}
  if(!mount())return;paint();
  if(REDUCE){el.style.transform="translateX(8px)"}else if(!raf)raf=requestAnimationFrame(step);
  clearInterval(nag);
  var warn=nt.filter(function(x){return x[0]!=="🗓️"}).length,ev=nt.length-warn;
  var go=function(){
    if(warn)say("😲 ❗ មាន "+kn(warn)+" ចំណុចត្រូវដោះស្រាយ!","alert",3200);
    else if(ev)say("📅 មានកាលវិភាគ "+kn(ev)+" ខាងមុខ","event",3000);
    else say("👋 សួស្ដី! គ្មានការជូនដំណឹងទេ","ok",2600);
  };
  setTimeout(go,900);
  if(warn||ev)nag=setInterval(function(){if(!document.hidden&&!document.getElementById("p0").hidden)go()},30000);
}
function off(){clearInterval(nag);if(raf)cancelAnimationFrame(raf);raf=0;if(el&&el.parentNode){el.parentNode.classList.remove("has-wk");el.remove()}el=null}
/* សារ toast → ប្រតិកម្មតាមស្ថានភាព */
var BAD=/មិនអាច|មិនបាន|បរាជ័យ|គ្មានសិទ្ធិ|កំហុស|ខុស|⚠️/;
function onToast(msg){if(!el||!on()||document.getElementById("p0").hidden)return;var bad=BAD.test(msg);say((bad?"😱 ":"😄 ")+msg,bad?"err":"ok",2400)}
function setOwn(file,cb){
  if(!/^image\//.test(file.type)){alert("សូមជ្រើសរើសឯកសាររូបភាព!");return}
  var r=new FileReader();r.onload=function(e){
    var im=new Image();im.onload=function(){
      var s=Math.min(im.width,im.height),cv=document.createElement("canvas");cv.width=cv.height=160;
      cv.getContext("2d").drawImage(im,(im.width-s)/2,(im.height-s)/2,s,s,0,0,160,160);
      try{localStorage.setItem(toonKey(),cv.toDataURL("image/png"))}catch(x){alert("មិនអាចរក្សាទុករូបបានទេ (browser ពេញ)");return}
      paint();cb&&cb();
    };im.src=e.target.result;
  };r.readAsDataURL(file);
}
function clearOwn(){try{localStorage.removeItem(toonKey())}catch(x){}paint()}
window.WALKER={react:react,toast:onToast,off:off,on:on,setOwn:setOwn,clearOwn:clearOwn,hasOwn:function(){return!!ownToon()},
  set:function(v){try{localStorage.setItem("walker",v?"1":"0")}catch(x){}if(!v)off()}};
})();
