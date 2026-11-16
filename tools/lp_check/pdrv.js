window.addEventListener("load",function(){renderLp();setTimeout(function(){
 var k=location.hash.slice(1).split("@")[0],d=location.hash.split("@")[1]||"45",m=/^(\d+)_(\d+)#(\d+)$/.exec(k);Object.keys(LP_DB).forEach(function(x){lessonPlanDB[x]=LP_DB[x]});
 $("lpG").value=m[1];lpLessons();$("lpL").value=m[2];lpSubs();$("lpS").value=m[3];$("lpDu").value=d;lpDur();lpGenDo();lpPaginate();
 document.title="SHEETS="+document.querySelectorAll(".lp-sheet").length;
 lpPrint();
},1200)});
