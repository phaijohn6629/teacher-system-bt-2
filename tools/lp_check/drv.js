window.addEventListener("load",function(){
 var only=(location.hash||"").slice(1); /* e.g. 11_53#1 */
 renderLp();
 var keys=Object.keys(lessonPlanDB),seen=[],jobs=[];
 window.LP_DB&&Object.keys(LP_DB).forEach(function(k){lessonPlanDB[k]=LP_DB[k]});
 Object.keys(lessonPlanDB).forEach(function(k){var P=lessonPlanDB[k];if(seen.indexOf(P)<0){seen.push(P);jobs.push(k)}});
 if(only)jobs=jobs.filter(function(k){return k===only});
 var out=[],ji=0,durs=[45,90];
 var PX=SHB+0;
 function one(k,d){
  var m=/^(\d+)_(\d+)#(\d+)$/.exec(k);if(!m)return null;
  $("lpG").value=m[1];lpLessons();$("lpL").value=m[2];lpSubs();
  var ok=false;for(var i=0;i<$("lpS").options.length;i++)if($("lpS").options[i].value===m[3]){$("lpS").value=m[3];ok=true}
  if(!ok)return{k:k,d:d,err:"nosub"};
  $("lpS2").value="";$("lpS3").value="";$("lpDu").value=String(d);lpDur();
  lpGenDo();lpPaginate();
  var sh=[].slice.call(document.querySelectorAll(".lp-sheet")),r={k:k,d:d,sheets:sh.length,td:0,mp:0,cut:0,kerr:0,sq:0,fill:[]};
  var lim=(296-18)*96/25.4+2;
  sh.forEach(function(s,i){var bd=s.querySelector(".lp-shb"),t=bd.getBoundingClientRect(),mx=0;
    if(bd.scrollHeight>bd.clientHeight+1){r.cut++;(r.cd=r.cd||[]).push([i,bd.scrollHeight,bd.clientHeight].concat([].slice.call(bd.children).filter(function(e){return e.getBoundingClientRect().bottom>t.bottom+1}).slice(0,3).map(function(e){var f=e.querySelector('li,td,p');return e.tagName+'.'+e.className+' h='+Math.round(e.getBoundingClientRect().height)+' '+(f?f.className+':':'')+e.textContent.slice(0,50)})))}
    [].forEach.call(bd.children,function(e){var b=e.getBoundingClientRect();if(b.bottom-t.top>mx)mx=b.bottom-t.top});
    r.fill.push(Math.round(mx/t.height*100));});
  [].forEach.call(document.querySelectorAll(".lp-sheet .lp-tb td"),function(td){var R=td.getBoundingClientRect(),w=0,tx="";[].forEach.call(td.querySelectorAll("*"),function(e){if(e.closest(".katex-mathml,svg")||e.children.length||!e.textContent.replace(/[\u200b\s]/g,"").length)return;var b=e.getBoundingClientRect();if(b.width&&b.right-R.right>w){w=b.right-R.right;tx=e.textContent.slice(0,40)}});if(w>2){r.td++;(r.td_d=r.td_d||[]).push(Math.round(w)+" "+tx)}});
  [].forEach.call(document.querySelectorAll(".lp-sheet .lp-mp"),function(m){var t=m.closest("td");if(t&&m.getBoundingClientRect().right>t.getBoundingClientRect().right+1)r.mp++});
  r.kerr=document.querySelectorAll(".lp-sheet .katex-error").length;
  r.sq=(JSON.stringify(lessonPlanDB[k]).match(/\\\\square/g)||[]).length;
  r.txt=($("lpSt").textContent||"").slice(0,40);
  return r}
 function step(){
  var t0=Date.now();
  while(ji<jobs.length*durs.length&&Date.now()-t0<2000){var k=jobs[Math.floor(ji/2)],d=durs[ji%2];try{var r=one(k,d);if(r)out.push(r)}catch(e){out.push({k:k,d:d,err:String(e).slice(0,80)})}ji++}
  if(ji<jobs.length*durs.length){document.title="RUN "+ji;setTimeout(step,0)}
  else{var pre=document.createElement("pre");pre.id="out";pre.textContent=JSON.stringify({errs:errs,out:out});document.body.appendChild(pre);document.title="DONE "+out.length}
 }
 setTimeout(step,1500);
});
