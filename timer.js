/* ========================================================================
   ⏱️ នាឡិការាប់ថយក្រោយសម្រាប់ថ្នាក់ (ប្រឡង · ពិភាក្សាក្រុម) — ផ្ទាំង «រចនាសម្ព័ន្ធថ្នាក់»
   លេខធំពេញអេក្រង់ · រង្វង់វឌ្ឍនភាព · ពណ៌ប្ដូរពេលជិតអស់ម៉ោង · សំឡេងរោទ៍ · បង្រួមជាប៊ូតុងតូចពេលបិទ (នៅរាប់បន្ត)
   គ្រាប់ចុច៖ Space = ចាប់ផ្ដើម/ផ្អាក · R = ចាប់ផ្ដើមឡើងវិញ · F = ពេញអេក្រង់ · Esc = បង្រួម
   ======================================================================== */
(function(){
"use strict";
var T={tot:300,left:300,run:false,end:0,title:"",tick:null,beeped:false,sound:true};
var PRE=[1,2,3,5,10,15,20,30,45,60];
function k2(n){return(n<10?"0":"")+n}
function fmt(s){s=Math.max(0,Math.ceil(s));var h=Math.floor(s/3600),m=Math.floor(s%3600/60),x=s%60;return kn((h?h+":"+k2(m):k2(m))+":"+k2(x))}
function el(){
  var o=$("tmView");
  if(!o){
    o=document.createElement("div");o.id="tmView";o.className="tm-view";o.hidden=true;o.tabIndex=-1;o.setAttribute("role","dialog");o.setAttribute("aria-label","នាឡិការាប់ថយក្រោយ");
    o.innerHTML="<div class=tm-top><input id=tmTitle class=tm-title placeholder='ចំណងជើង ឧ. ពិភាក្សាក្រុម · ប្រឡងខែ' maxlength=60>"+
      "<span class=tm-tools><button type=button data-tm=snd title='សំឡេង'>🔔</button><button type=button data-tm=full title='ពេញអេក្រង់ (F)'>⛶</button><button type=button data-tm=min title='បង្រួម (Esc) · នៅរាប់បន្ត'>▁</button></span></div>"+
      "<div class=tm-mid><svg class=tm-ring viewBox='0 0 200 200' aria-hidden=true><circle cx=100 cy=100 r=90 class=tm-bg /><circle cx=100 cy=100 r=90 class=tm-fg id=tmArc /></svg><div class=tm-txt><div id=tmT class=tm-time></div><div id=tmS class=tm-state></div></div></div>"+
      "<div class=tm-pre>"+PRE.map(function(m){return"<button type=button data-pre="+m+">"+kn(m)+" នាទី</button>"}).join("")+
      "<span class=tm-cus><input id=tmM type=number min=0 max=600 placeholder='នាទី'><input id=tmX type=number min=0 max=59 placeholder='វិនាទី'><button type=button data-tm=set>កំណត់</button></span></div>"+
      "<div class=tm-ctl><button type=button data-tm=minus>－១ នាទី</button><button type=button class=primary id=tmGo data-tm=go></button><button type=button data-tm=reset>⟲ ឡើងវិញ</button><button type=button data-tm=plus>＋១ នាទី</button></div>";
    document.body.appendChild(o);
    o.addEventListener("click",function(e){
      var b=e.target.closest("[data-tm],[data-pre]");if(!b)return;
      if(b.dataset.pre){set(+b.dataset.pre*60);return}
      var a=b.dataset.tm;
      if(a==="go")toggle();else if(a==="reset")reset();else if(a==="plus")add(60);else if(a==="minus")add(-60);
      else if(a==="set"){var s=(+$("tmM").value||0)*60+(+$("tmX").value||0);if(s>0)set(s)}
      else if(a==="full")full();else if(a==="min")close();
      else if(a==="snd"){T.sound=!T.sound;draw()}
    });
    o.addEventListener("keydown",function(e){
      if(e.target.tagName==="INPUT"){if(e.key==="Enter"&&e.target.type==="number")o.querySelector("[data-tm=set]").click();return}
      if(e.key===" "){e.preventDefault();toggle()}else if(/^r$/i.test(e.key))reset();else if(/^f$/i.test(e.key))full();else if(e.key==="Escape"&&!document.fullscreenElement)close();
    });
    $("tmTitle").oninput=function(){T.title=this.value;mini()};
  }
  return o;
}
function now(){return Date.now()}
function left(){return T.run?Math.max(0,(T.end-now())/1000):T.left}
function set(s){T.tot=T.left=s;T.run=false;T.beeped=false;clearInterval(T.tick);draw()}
function add(d){if(T.run){T.end=Math.max(now(),T.end+d*1000);T.tot=Math.max(T.tot+d,1)}else{T.left=Math.max(0,T.left+d);T.tot=Math.max(T.left,1)}T.beeped=false;draw()}
function toggle(){
  if(T.run){T.left=left();T.run=false;clearInterval(T.tick)}
  else{if(T.left<=0)T.left=T.tot;T.end=now()+T.left*1000;T.run=true;T.beeped=false;clearInterval(T.tick);T.tick=setInterval(step,200);audio()}
  draw();
}
function reset(){T.run=false;clearInterval(T.tick);T.left=T.tot;T.beeped=false;draw()}
function step(){var l=left();if(l<=0){T.run=false;T.left=0;clearInterval(T.tick);if(!T.beeped){T.beeped=true;ring()}}else if(l<=5.2&&T.sound&&Math.ceil(l)!==step.last){step.last=Math.ceil(l);beep(880,.08,.15)}draw()}
var AC=null;
function audio(){try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();if(AC.state==="suspended")AC.resume()}catch(e){}}
function beep(f,d,v){if(!AC)return;try{var o=AC.createOscillator(),g=AC.createGain();o.type="sine";o.frequency.value=f;g.gain.value=v||.25;o.connect(g);g.connect(AC.destination);var t=AC.currentTime;g.gain.setValueAtTime(v||.25,t);g.gain.exponentialRampToValueAtTime(.001,t+d);o.start(t);o.stop(t+d+.02)}catch(e){}}
function ring(){if(T.sound)[0,350,700,1400,1750,2100].forEach(function(ms,i){setTimeout(function(){beep(i%3===2?1320:988,.28,.35)},ms)});notify("⏰ អស់ម៉ោង"+(T.title?" · "+T.title:""))}
function draw(){
  var o=el(),l=left(),p=T.tot?l/T.tot:0,C=2*Math.PI*90;
  $("tmT").textContent=fmt(l);
  $("tmS").textContent=l<=0?"⏰ អស់ម៉ោង!":T.run?"កំពុងរាប់…":l<T.tot?"ផ្អាក":"រួចរាល់";
  $("tmArc").style.strokeDasharray=C;$("tmArc").style.strokeDashoffset=C*(1-p);
  o.dataset.st=l<=0?"end":l<=10?"red":l<=60?"warn":"ok";
  $("tmGo").textContent=T.run?"⏸ ផ្អាក":l<T.tot&&l>0?"▶ បន្ត":"▶ ចាប់ផ្ដើម";
  o.querySelector("[data-tm=snd]").textContent=T.sound?"🔔":"🔕";
  [].forEach.call(o.querySelectorAll("[data-pre]"),function(b){b.classList.toggle("on",+b.dataset.pre*60===T.tot)});
  mini();
}
/* ប៊ូតុងតូចអណ្ដែត ពេលបង្រួម (ចុចដើម្បីបើកវិញ) */
function mini(){
  var m=$("tmMini"),show=$("tmView")&&$("tmView").hidden&&(T.run||(T.left>0&&T.left<T.tot)||T.left===0&&T.beeped);
  if(!m){if(!show)return;m=document.createElement("button");m.type="button";m.id="tmMini";m.className="tm-mini";m.onclick=open;document.body.appendChild(m)}
  m.hidden=!show;if(!show)return;
  var l=left();m.textContent="⏱️ "+fmt(l)+(T.title?" · "+T.title:"");m.dataset.st=l<=0?"end":l<=10?"red":l<=60?"warn":"ok";
}
function open(){var o=el();o.hidden=false;$("tmTitle").value=T.title;draw();try{o.focus()}catch(e){}}
function close(){var o=el();if(document.fullscreenElement)document.exitFullscreen().catch(function(){});o.hidden=true;mini()}
function full(){var o=el();if(document.fullscreenElement)document.exitFullscreen().catch(function(){});else if(o.requestFullscreen)o.requestFullscreen().catch(function(){})}
setInterval(function(){if(T.run&&$("tmView")&&$("tmView").hidden)mini()},500);
var b=$("ogTimer");if(b)b.onclick=open;
window.TIMER={open:open};
})();
