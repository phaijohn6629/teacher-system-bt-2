/* ========================================================================
   លទ្ធផលសិក្សា › 📝 តេស្ត
   - ធនាគារលំហាត់៖ qb/{ID គ្រូ} = {o, j:JSON[{id,g,ls,lv,t:"mc"|"num",q,ch,a}]} · គ្រូទាំងអស់អាន · ម្ចាស់សរសេរ
   - តេស្ត៖ tests/{id} (គ្មានចម្លើយ · សិស្សអានបានពេលបើក) + tkeys/{id} (ចម្លើយ · តែម្ចាស់)
   - សិស្សផ្ញើ៖ subs/{id}_{សិស្ស} (ម្ដងគត់ · មិនកែបាន) · គ្រូកែពិន្ទុក្នុង browser
   - Google Drive៖ cfg/drive.cid (Client ID ដែល Admin កំណត់) · scope drive.file
   - រូបមន្ត៖ LaTeX ក្នុង $...$ ឬ $$...$$ (KaTeX)
   ======================================================================== */
(function(){
"use strict";
var LV={1:"ងាយ",2:"មធ្យម",3:"ពិបាក"},QV="bank",qb={},qbLoaded=false,fG=0,fL="",fV=0,mine=false;
var mk={tid:"",ci:0,ls:{},n:{1:5,2:3,3:2},dur:30,title:"",items:null,kind:"g",mo:""},tests=[],curTest=null,subUn=null,subs=[],keyOf={};
/* ប្រភេទតេស្ត៖ g = ទូទៅ (មិនរាប់ពិន្ទុ) · t1/t2 = តេស្តលើកទី១/ទី២ (ចូល «ពិន្ទុប្រចាំខែ» ១៥% ដោយស្វ័យប្រវត្តិ) */
var KIND={g:"តេស្តទូទៅ",t1:"តេស្តលើកទី១",t2:"តេស្តលើកទី២"};
function curMo(){var d=new Date();return d.getFullYear()+"-"+("0"+(d.getMonth()+1)).slice(-2)}
function kindBadge(t){var k=t.kind||"g";return"<span class='qz-kind k-"+k+"'>"+KIND[k]+(k!=="g"&&t.mo?" · "+moName(t.mo):"")+"</span>"}
function moName(m){var p=String(m||"").split("-");return p.length===2?"ខែ"+M[+p[1]-1]+" "+kn(p[0]):""}
var KX="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/";
var KXM={"\\R":"\\mathbb{R}","\\C":"\\mathbb{C}","\\N":"\\mathbb{N}","\\Z":"\\mathbb{Z}","\\Q":"\\mathbb{Q}"};   /* ម៉ាក្រូដែលគ្រូប្រើញឹកញាប់ */
/* កម្រិត Bloom (មតិយោបល់ % ចងចាំ …) → កម្រិតលំបាក */
var BLOOM={"ចងចាំ":1,"យល់":1,"អនុវត្ត":2,"វិភាគ":2,"វាយតម្លៃ":3,"បង្កើត":3};

/* ---------- ជំនួយ ---------- */
function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2,7)}
function loadJs(src){return new Promise(function(ok,no){var s=document.createElement("script");s.src=src;s.onload=ok;s.onerror=no;document.head.appendChild(s)})}
var kxP=null;
function katexReady(){
  if(kxP)return kxP;
  var l=document.createElement("link");l.rel="stylesheet";l.href=KX+"katex.min.css";document.head.appendChild(l);
  kxP=loadJs(KX+"katex.min.js").then(function(){return loadJs(KX+"contrib/auto-render.min.js")});
  return kxP;
}
function math(el){if(!el)return;katexReady().then(function(){try{renderMathInElement(el,{delimiters:[{left:"$$",right:"$$",display:true},{left:"$",right:"$",display:false},{left:"\\(",right:"\\)",display:false}],throwOnError:false,macros:KXM})}catch(x){}})}
function tx(s){return esc(String(s||"")).replace(/\n/g,"<br>")}
function grades(){return[7,8,9,10,11,12]}
function lsName(g,n){var C=window.CUR&&window.CUR[g],l=C&&C.LS[n];if(!l)return"";return l[3]?"ជំពូកទី"+kn(l[3])+" · មេរៀនទី"+kn(l[5])+" "+l[0]:"មេរៀនទី"+kn(+n)+" "+l[0]}
function lsOpts(g,sel,all){
  var C=window.CUR&&window.CUR[g];if(!C)return"<option value=''>—</option>";
  return(all?"<option value=''>— មេរៀនទាំងអស់ —</option>":"")+Object.keys(C.LS).sort(function(a,b){return a-b}).map(function(n){return"<option value='"+n+"'"+(String(n)===String(sel)?" selected":"")+">"+esc(lsName(g,n))+"</option>"}).join("");
}
function allQ(){var a=[];Object.keys(qb).forEach(function(t){(qb[t]||[]).forEach(function(q){a.push(Object.assign({by:t},q))})});return a}
function normNum(v){return String(v==null?"":v).trim().replace(/[០-៩]/g,function(c){return"០១២៣៤៥៦៧៨៩".indexOf(c)}).replace(/\s+/g,"").replace(",",".")}
function correct(q,ans){
  if(ans==null||ans==="")return false;
  if(q.t==="mc")return+ans===+q.a;
  var x=normNum(ans),y=normNum(q.a);if(x===y)return true;
  var fx=parseFloat(x),fy=parseFloat(y);return isFinite(fx)&&isFinite(fy)&&Math.abs(fx-fy)<1e-6&&/^[-+]?[\d.]+(e[-+]?\d+)?$/i.test(x);
}
function testLink(id){return location.origin+location.pathname.replace(/[^\/]*$/,"")+"test.html?t="+encodeURIComponent(id)}

/* ---------- ផ្ទុក/រក្សាទុកធនាគារលំហាត់ ---------- */
/* ធនាគារលំហាត់របស់គ្រូទាំងអស់ · តាមដានផ្ទាល់ (onSnapshot) ដើម្បីឱ្យលំហាត់ដែលគ្រូផ្សេងទើបបន្ថែម បង្ហាញភ្លាម */
var qbUn=null,qbErr="";
function qbApply(sn){var o={};sn.forEach(function(d){var v=d.data();try{o[v.o||d.id]=JSON.parse(v.j)||[]}catch(x){}});qb=o;qbLoaded=true;qbErr=""}
function loadQB(){
  if(!window.FB||!window.db||!who)return new Promise(function(r){setTimeout(r,500)});
  if(qbUn)return Promise.resolve();
  return new Promise(function(res){
    var first=true;
    qbUn=window.FB.onSnapshot(window.FB.collection(window.db,"qb"),function(sn){
      qbApply(sn);if(first){first=false;res();return}
      if(!$("p17").hidden&&QV==="bank"&&!document.querySelector("#qzBody dialog[open]"))keepFocus(renderBank);
    },function(e){
      console.error("qb:",e);qbUn=null;qbLoaded=true;qbErr=e&&e.code==="permission-denied"?"គ្មានសិទ្ធិអានធនាគារលំហាត់ (សូម Admin Publish firestore.rules កំណែថ្មី)":"មិនអាចផ្ទុកធនាគារលំហាត់បានទេ · សូមពិនិត្យអ៊ីនធឺណិត";
      if(first){first=false;res()}
    });
    var un=qbUn;if(window.unsubs)unsubs.push(function(){un();if(qbUn===un){qbUn=null;qbLoaded=false}});
  });
}
function saveQB(tid){
  return window.FB.setDoc(window.FB.doc(window.db,"qb",tid),{o:tid,j:JSON.stringify(qb[tid]||[]),u:new Date().toISOString()})
    .catch(function(e){alert(e&&e.code==="permission-denied"?"គ្មានសិទ្ធិរក្សាទុក។ សូមប្រាប់ Admin ឱ្យ Publish firestore.rules កំណែថ្មី (មាន qb/tests/subs)។":"មិនអាចរក្សាទុកបានទេ");throw e});
}

/* ===================== 📚 ធនាគារលំហាត់ ===================== */
function renderBank(){
  var list=allQ().filter(function(q){return(!fG||q.g===fG)&&(!fL||String(q.ls)===String(fL))&&(!fV||q.lv===fV)&&(!mine||q.by===who.id)});
  var h="<div class=bar>"+
    "<label>ថ្នាក់៖</label><select id=qfG><option value=0>ទាំងអស់</option>"+grades().map(function(g){return"<option value="+g+(g===fG?" selected":"")+">ថ្នាក់ទី"+kn(g)+"</option>"}).join("")+"</select>"+
    (fG?"<label>មេរៀន៖</label><select id=qfL style='max-width:320px'>"+lsOpts(fG,fL,true)+"</select>":"")+
    "<label>កម្រិត៖</label><select id=qfV><option value=0>ទាំងអស់</option>"+[1,2,3].map(function(v){return"<option value="+v+(v===fV?" selected":"")+">"+LV[v]+"</option>"}).join("")+"</select>"+
    "<label style='display:flex;gap:6px;align-items:center'><input type=checkbox id=qfM "+(mine?"checked":"")+" style='width:auto;margin:0'> តែរបស់ខ្ញុំ</label>"+
    "<button type=button class=primary data-qa=new>＋ បន្ថែមលំហាត់</button><button type=button data-qa=tex>📥 នាំចូលពី LaTeX (.tex)</button></div>"+
    (qbErr?"<p class=cxwarn>⚠️ "+esc(qbErr)+" <button type=button data-qa=reload>🔄 ផ្ទុកម្ដងទៀត</button></p>":"")+
    "<p class=note style='margin:0 0 10px'>សរុប <b>"+kn(list.length)+"</b> លំហាត់"+(list.length<allQ().length?" (ក្នុងធនាគារទាំងមូល "+kn(allQ().length)+" លំហាត់ ពីគ្រូ "+kn(Object.keys(qb).filter(function(t){return qb[t].length}).length)+" នាក់ · ប្ដូរតម្រងដើម្បីមើលបន្ថែម)":"")+" · សរសេររូបមន្តជា LaTeX ក្នុង <code>$…$</code> ឧ. <code>$\\frac{a}{b}$</code>, <code>$x^2+\\sqrt{3}$</code></p>";
  h+=list.length?"<div class=qz-list>"+list.map(function(q){
    var own=q.by===who.id||isAdm();
    return"<div class=qz-q><div class=qz-qh><span class='qz-lv l"+q.lv+"'>"+LV[q.lv]+"</span>"+(q.bl?"<span class=qz-bl>"+esc(q.bl)+"</span>":"")+"<span class=qz-ls>ថ្នាក់ទី"+kn(q.g)+" · "+esc(lsName(q.g,q.ls))+"</span><span class=qz-by>"+esc(tn(q.by)||q.by)+"</span>"+
      (own?"<button type=button data-qe='"+q.by+"|"+q.id+"'>✏️</button><button type=button class=danger data-qd='"+q.by+"|"+q.id+"'>🗑️</button>":"")+"</div>"+
      "<div class=qz-qt>"+tx(q.q)+"</div>"+
      (q.t==="mc"?"<ol class=qz-ch type=A>"+q.ch.map(function(c,i){return"<li"+(i===+q.a?" class=ok":"")+">"+tx(c)+"</li>"}).join("")+"</ol>":"<div class=qz-num>ចម្លើយ៖ <b>"+tx(q.a)+"</b></div>")+"</div>"}).join("")+"</div>"
    :"<p class=note>មិនទាន់មានលំហាត់ទេ។ ចុច «＋ បន្ថែមលំហាត់» ដើម្បីចាប់ផ្ដើម។</p>";
  $("qzBody").innerHTML=h;math($("qzBody"));
}
function qDialog(q){
  var d=$("qzDlg");
  if(!d){d=document.createElement("dialog");d.id="qzDlg";d.className="wide";document.body.appendChild(d)}
  q=q||{id:"",g:fG||10,ls:fL||"",lv:1,t:"mc",q:"",ch:["","","",""],a:0};
  var g=q.g;
  d.innerHTML="<form method=dialog class=dlgb><h2 style='margin:0 0 10px'>"+(q.id?"✏️ កែលំហាត់":"＋ បន្ថែមលំហាត់")+"</h2><div class=fg>"+
    "<div><label>ថ្នាក់</label><select id=qdG>"+grades().map(function(x){return"<option value="+x+(x===g?" selected":"")+">ថ្នាក់ទី"+kn(x)+"</option>"}).join("")+"</select></div>"+
    "<div><label>មេរៀន</label><select id=qdL>"+lsOpts(g,q.ls,false)+"</select></div>"+
    "<div><label>កម្រិត</label><select id=qdV>"+[1,2,3].map(function(v){return"<option value="+v+(v===q.lv?" selected":"")+">"+LV[v]+"</option>"}).join("")+"</select></div>"+
    "<div><label>ប្រភេទ</label><select id=qdT><option value=mc"+(q.t==="mc"?" selected":"")+">ជ្រើសរើសចម្លើយ (ក ខ គ ឃ)</option><option value=num"+(q.t==="num"?" selected":"")+">ចម្លើយជាលេខ</option></select></div>"+
    "<div class=full><label>សំណួរ (LaTeX ក្នុង $…$)</label><textarea id=qdQ rows=3 placeholder='ឧ. គណនា $\\int_0^1 x^2\\,dx$'>"+esc(q.q)+"</textarea></div>"+
    "<div class=full id=qdMC"+(q.t==="mc"?"":" hidden")+"><label>ជម្រើស (ចុចរង្វង់ = ចម្លើយត្រូវ)</label>"+[0,1,2,3].map(function(i){return"<div class=qd-ch><input type=radio name=qdA value="+i+(q.t==="mc"&&+q.a===i?" checked":"")+"><b>"+"ABCD"[i]+".</b><input id=qdC"+i+" value='"+esc((q.ch||[])[i]||"")+"'></div>"}).join("")+"</div>"+
    "<div class=full id=qdNUM"+(q.t==="num"?"":" hidden")+"><label>ចម្លើយត្រឹមត្រូវ (លេខ ឧ. 2.5 ឬ 1/3)</label><input id=qdN value='"+esc(q.t==="num"?q.a:"")+"'></div>"+
    "<div class=full><label>មើលជាមុន</label><div id=qdP class=qz-prev></div></div></div>"+
    "<div class=dlgf><button type=button id=qdX>បោះបង់</button><button type=button class=primary id=qdS>រក្សាទុក</button></div></form>";
  function prev(){
    var t=$("qdT").value,h="<div class=qz-qt>"+tx($("qdQ").value)+"</div>";
    if(t==="mc")h+="<ol class=qz-ch type=A>"+[0,1,2,3].map(function(i){var ck=d.querySelector("input[name=qdA]:checked");return"<li"+(ck&&+ck.value===i?" class=ok":"")+">"+tx($("qdC"+i).value)+"</li>"}).join("")+"</ol>";
    else h+="<div class=qz-num>ចម្លើយ៖ <b>"+tx($("qdN").value)+"</b></div>";
    $("qdP").innerHTML=h;math($("qdP"));
  }
  var pt=0;d.oninput=function(){clearTimeout(pt);pt=setTimeout(prev,250)};
  d.onchange=function(e){
    if(e.target.id==="qdG")$("qdL").innerHTML=lsOpts(+e.target.value,"",false);
    if(e.target.id==="qdT"){$("qdMC").hidden=e.target.value!=="mc";$("qdNUM").hidden=e.target.value!=="num"}
    prev();
  };
  $("qdX").onclick=function(){d.close()};
  $("qdS").onclick=function(){
    var t=$("qdT").value,o={id:q.id||uid(),g:+$("qdG").value,ls:+$("qdL").value||"",lv:+$("qdV").value,t:t,q:$("qdQ").value.trim()};
    if(!o.q){alert("សូមសរសេរសំណួរ");return}
    if(!o.ls){alert("សូមជ្រើសមេរៀន");return}
    if(t==="mc"){o.ch=[0,1,2,3].map(function(i){return $("qdC"+i).value.trim()});var ck=d.querySelector("input[name=qdA]:checked");
      if(o.ch.filter(Boolean).length<2){alert("សូមបញ្ចូលជម្រើសយ៉ាងតិច ២");return}if(!ck||!o.ch[+ck.value]){alert("សូមចុចរង្វង់ចម្លើយត្រូវ");return}o.a=+ck.value}
    else{o.a=$("qdN").value.trim();if(!o.a){alert("សូមបញ្ចូលចម្លើយត្រឹមត្រូវ");return}}
    var owner=q.by||who.id,arr=qb[owner]=qb[owner]||[],i=arr.map(function(x){return x.id}).indexOf(o.id);
    if(i>=0)arr[i]=o;else arr.push(o);
    saveQB(owner).then(function(){d.close();fG=o.g;fL=o.ls;renderQuiz();notify("បានរក្សាទុកលំហាត់")});
  };
  d.showModal();prev();
}

/* ===================== 📥 នាំចូលពីឯកសារ LaTeX =====================
   គាំទ្រ៖ exam class (\question · \choice · \CorrectChoice) · ex_test (\begin{ex} · \choice{\True A}{B}{C}{D})
          enumerate (\item … ជម្រើស A. B. C. D. ឬ \begin{enumerate} ខាងក្នុង) · ចម្លើយសម្គាល់ដោយ \True \CorrectChoice \correct ឬ * */
function grp(str,i){   /* អាន {…} ដែលមានតុល្យភាព ចាប់ពី i (str[i]==="{") → [ខ្លឹមសារ, ទីតាំងបន្ទាប់] */
  var d=0,j=i;for(;j<str.length;j++){var c=str[j];if(c==="\\"){j++;continue}if(c==="{")d++;else if(c==="}"){d--;if(!d)return[str.slice(i+1,j),j+1]}}
  return[str.slice(i+1),str.length];
}
function texClean(t){
  t=String(t||"");
  t=t.replace(/(^|[^\\])%.*$/gm,"$1");                          /* មតិយោបល់ */
  t=t.replace(/\\\[([\s\S]*?)\\\]/g,"$$$$$1$$$$").replace(/\\begin\{(equation|align|gather)\*?\}([\s\S]*?)\\end\{\1\*?\}/g,"$$$$$2$$$$");
  t=t.replace(/\\(textbf|textit|emph|underline|text|mbox|textrm)\{([^{}]*)\}/g,function(m,c,x,o,all){return inMath(all,o)?m:x});
  t=t.replace(/\\includegraphics(\[[^\]]*\])?\{[^}]*\}/g,"[រូបភាព]").replace(/\\begin\{(tikzpicture|center|figure)\}[\s\S]*?\\end\{\1\}/g,function(m,k){return k==="center"?m.replace(/\\(begin|end)\{center\}/g,""):"[រូបភាព]"});
  t=t.replace(/\\(vspace|hspace)\*?\{[^}]*\}|\\(noindent|hfill|medskip|bigskip|smallskip|centering|par|newline)\b/g," ");
  t=t.replace(/\\\\(\[[^\]]*\])?/g,"\n").replace(/~/g," ");
  return t.replace(/[ \t]+/g," ").replace(/\n\s*\n+/g,"\n").trim();
}
function inMath(all,o){var n=0;for(var i=0;i<o;i++){if(all[i]==="\\"){i++;continue}if(all[i]==="$")n++}return n%2===1}
function isTrue(c){return/\\(True|CorrectChoice|correct)\b|^\s*\*/.test(c)}
function stripTrue(c){return c.replace(/\\(True|CorrectChoice|correct)\b\s*/g,"").replace(/^\s*\*\s*/,"")}
function mkQ(text,ch,ans,num){
  var q={q:texClean(text),t:ch.length>=2?"mc":"num",ch:[],a:""};
  if(q.t==="mc"){q.ch=ch.slice(0,4).map(function(c){return texClean(stripTrue(c))});while(q.ch.length<4)q.ch.push("");q.a=ans>=0&&ans<4?ans:-1}
  else q.a=num!=null?String(num).trim():"";
  return q;
}
function parseTex(src){
  src=String(src).replace(/\r/g,"");
  var b=src.indexOf("\\begin{document}");if(b>=0)src=src.slice(b+16);var e=src.indexOf("\\end{document}");if(e>=0)src=src.slice(0,e);
  var out=[],m;
  /* ០. \mcq{សំណួរ}{ក}{ខ}{គ}{ឃ}{ចម្លើយ ក/ខ/គ/ឃ} · មតិយោបល់ % ចងចាំ/យល់/អនុវត្ត/វិភាគ/វាយតម្លៃ/បង្កើត ពីលើ = កម្រិត */
  if(/\\mcq\s*\{/.test(src)){
    var reM=/\\mcq\s*(?=\{)/g,bl="";
    while((m=reM.exec(src))){
      var before=src.slice(0,m.index),cm=/%\s*([^\n%]+?)\s*\n[\s]*$/.exec(before);if(cm)bl=cm[1].trim();
      var i=reM.lastIndex,gs=[];
      while(gs.length<6){while(/\s/.test(src[i]||""))i++;if(src[i]!=="{")break;var g=grp(src,i);gs.push(g[0]);i=g[1]}
      reM.lastIndex=i;if(gs.length<5)continue;
      var key=String(gs[5]||"").trim(),ai="កខគឃ".indexOf(key);if(ai<0)ai="ABCD".indexOf(key.toUpperCase());if(ai<0&&/^[1-4]$/.test(key))ai=+key-1;
      var q=mkQ(gs[0],gs.slice(1,5),ai,null);q.bl=bl;q.lv=BLOOM[bl]||1;out.push(q);
    }
    return out;
  }
  /* ១. ex_test៖ \begin{ex} … \end{ex} */
  var reEx=/\\begin\{(ex|bt|vd)\}([\s\S]*?)\\end\{\1\}/g;
  while((m=reEx.exec(src))){
    var body=m[2].replace(/\\loigiai\s*\{[\s\S]*$/,""),k=body.search(/\\choice(TF)?\b/),ch=[],ans=-1,num=null;
    if(k>=0){var i=k+body.slice(k).indexOf("{");
      while(i<body.length&&body[i]==="{"&&ch.length<6){var g=grp(body,i);if(isTrue(g[0]))ans=ch.length;ch.push(g[0]);i=g[1];while(/\s/.test(body[i]||""))i++}
      body=body.slice(0,k)}
    var sh=/\\shortans(\[[^\]]*\])?\{([^}]*)\}/.exec(body);if(sh){num=sh[2];body=body.replace(sh[0],"")}
    out.push(mkQ(body,ch,ans,num));
  }
  if(out.length)return out;
  /* ២. exam class៖ \question … */
  if(/\\question\b/.test(src)){
    src.split(/\\question\b(?:\[[^\]]*\])?/).slice(1).forEach(function(part){
      part=part.replace(/\\end\{questions\}[\s\S]*$/,"").replace(/\\begin\{solution\}[\s\S]*?\\end\{solution\}/g,"");
      var c0=part.search(/\\begin\{(choices|oneparchoices|checkboxes)\}/),ch=[],ans=-1;
      var text=c0>=0?part.slice(0,c0):part;
      if(c0>=0){part.slice(c0).replace(/\\end\{(choices|oneparchoices|checkboxes)\}[\s\S]*$/,"").split(/\\(?=choice\b|CorrectChoice\b)/).slice(1).forEach(function(x){
        var cor=/^CorrectChoice/.test(x);x=x.replace(/^(choice|CorrectChoice)\b/,"");if(cor)ans=ch.length;ch.push(x)})}
      out.push(mkQ(text,ch,ans,null));
    });
    return out;
  }
  /* ៣. enumerate៖ \item នៅកម្រិតខាងក្រៅ */
  var en=/\\begin\{enumerate\}(\[[^\]]*\])?/.exec(src);
  if(en){
    var s2=src.slice(en.index+en[0].length),depth=0,items=[],cur="",re=/\\begin\{(enumerate|itemize)\}|\\end\{(enumerate|itemize)\}|\\item\b(\[[^\]]*\])?/g,last=0;
    while((m=re.exec(s2))){
      cur+=s2.slice(last,m.index);last=re.lastIndex;
      if(m[1]){depth++;cur+=m[0]}else if(m[2]){if(!depth){break}depth--;cur+=m[0]}
      else if(!depth){if(cur.trim())items.push(cur);cur=""}else cur+=m[0];
    }
    if(cur.trim())items.push(cur);
    items.forEach(function(it){
      var ch=[],ans=-1,text=it,inner=/\\begin\{(enumerate|itemize|tasks)\}[\s\S]*?\\end\{\1\}/.exec(it);
      if(inner){text=it.slice(0,inner.index);inner[0].replace(/^\\begin\{\w+\}(\[[^\]]*\]|\(\d\))?|\\end\{\w+\}$/g,"").split(/\\item\b|\\task\b/).slice(1).forEach(function(x){if(isTrue(x))ans=ch.length;ch.push(x)})}
      else{var mm=it.split(/\s(?=\(?[A-Dក-ឃ][\.\)]\s)/);if(mm.length>=3){text=mm[0];mm.slice(1).forEach(function(x){x=x.replace(/^\(?[A-Dក-ឃ][\.\)]\s*/,"");if(isTrue(x))ans=ch.length;ch.push(x)})}}
      out.push(mkQ(text,ch,ans,null));
    });
  }
  return out;
}
function texImport(){
  var f=document.createElement("input");f.type="file";f.accept=".tex,.txt,text/plain";f.multiple=true;
  f.onchange=function(){
    var files=[].slice.call(f.files||[]);if(!files.length)return;
    Promise.all(files.map(function(file){return new Promise(function(ok){var r=new FileReader();r.onload=function(){ok(parseTex(r.result).map(function(q){q.src=file.name;return q}))};r.onerror=function(){ok([])};r.readAsText(file,"utf-8")})})).then(function(all){
    var Q=[].concat.apply([],all).filter(function(q){return q.q});
    var file={name:files.length>1?files.length+" ឯកសារ":files[0].name};
    if(!Q.length){alert("រកមិនឃើញលំហាត់ក្នុងឯកសារនេះទេ។\n\nទម្រង់ដែលគាំទ្រ៖\n• \\question … \\choice … \\CorrectChoice … (exam class)\n• \\begin{ex} … \\choice{\\True A}{B}{C}{D} \\end{ex}\n• \\begin{enumerate} \\item … \\end{enumerate}");return}
    texPreview(Q,file.name);
  })};
  f.click();
}
function texPreview(Q,fname){
  var d=$("qzTex");if(!d){d=document.createElement("dialog");d.id="qzTex";d.className="wide";document.body.appendChild(d)}
  var g=fG||10;
  function body(){
    var miss=Q.filter(function(q){return q.t==="mc"?q.a<0:!q.a}).length;
    return Q.map(function(q,i){
      return"<div class='qz-q"+((q.t==="mc"?q.a<0:!q.a)?" qz-miss":"")+"'><div class=qz-qh><label style='display:flex;gap:6px;align-items:center;margin:0'><input type=checkbox data-ti="+i+(q.skip?"":" checked")+" style='width:auto;margin:0'> <b>លំហាត់ទី"+kn(i+1)+"</b></label>"+
        (q.bl?"<span class=qz-bl>"+esc(q.bl)+"</span>":"")+(q.src?"<span class=qz-ls>"+esc(q.src)+"</span>":"")+"<select data-tv="+i+" style='width:auto;margin:0'>"+[1,2,3].map(function(v){return"<option value="+v+((q.lv||1)===v?" selected":"")+">"+LV[v]+"</option>"}).join("")+"</select>"+
        (q.t==="mc"?(q.a<0?"<span class=qz-warn>⚠️ ចុចជម្រើសត្រូវ</span>":""):"<span>ចម្លើយ៖ <input data-tn="+i+" value='"+esc(q.a)+"' style='width:110px;margin:0'></span>"+(q.a?"":"<span class=qz-warn>⚠️ បញ្ចូលចម្លើយ</span>"))+"</div>"+
        "<div class=qz-qt>"+tx(q.q)+"</div>"+
        (q.t==="mc"?"<ol class=qz-ch type=A>"+q.ch.map(function(c,j){return c?"<li class='pick"+(j===q.a?" ok":"")+"' data-tc='"+i+"|"+j+"'>"+tx(c)+"</li>":""}).join("")+"</ol>":"")+"</div>"}).join("")+
      (miss?"<p class=qz-warn style='margin-top:8px'>មាន "+kn(miss)+" លំហាត់មិនទាន់មានចម្លើយត្រូវ — លំហាត់ទាំងនោះនឹងមិនត្រូវនាំចូលទេ</p>":"");
  }
  d.innerHTML="<div class=dlgb><h2 style='margin:0 0 6px'>📥 នាំចូលពី «"+esc(fname)+"»</h2><p class=note style='margin:0 0 8px'>រកឃើញ <b>"+kn(Q.length)+"</b> លំហាត់។ ពិនិត្យ ជ្រើសចម្លើយត្រូវ (ចុចលើជម្រើស) និងកម្រិត មុននាំចូល។</p>"+
    "<div class=fg><div><label>ថ្នាក់</label><select id=txG>"+grades().map(function(x){return"<option value="+x+(x===g?" selected":"")+">ថ្នាក់ទី"+kn(x)+"</option>"}).join("")+"</select></div>"+
    "<div><label>មេរៀន (សម្រាប់លំហាត់ទាំងអស់)</label><select id=txL>"+lsOpts(g,fL,false)+"</select></div></div>"+
    "<div id=txB class=qz-list style='margin-top:10px'>"+body()+"</div></div>"+
    "<div class=dlgf><button type=button id=txX>បោះបង់</button><button type=button class=primary id=txOK>📥 នាំចូល</button></div>";
  function re(){$("txB").innerHTML=body();math($("txB"))}
  d.onchange=function(e){var el=e.target;
    if(el.id==="txG")$("txL").innerHTML=lsOpts(+el.value,"",false);
    else if(el.dataset.ti)Q[+el.dataset.ti].skip=!el.checked;
    else if(el.dataset.tv)Q[+el.dataset.tv].lv=+el.value;
    else if(el.dataset.tn){Q[+el.dataset.tn].a=el.value.trim();re()}};
  d.onclick=function(e){var li=e.target.closest("[data-tc]");if(!li)return;var p=li.dataset.tc.split("|");Q[+p[0]].a=+p[1];re()};
  $("txX").onclick=function(){d.close()};
  $("txOK").onclick=function(){
    var G=+$("txG").value,L=+$("txL").value;if(!L){alert("សូមជ្រើសមេរៀន");return}
    var ok=Q.filter(function(q){return!q.skip&&(q.t==="mc"?q.a>=0:q.a)});if(!ok.length){alert("គ្មានលំហាត់ដែលរួចរាល់សម្រាប់នាំចូលទេ");return}
    var arr=qb[who.id]=qb[who.id]||[];
    ok.forEach(function(q){var o={id:uid(),g:G,ls:L,lv:q.lv||1,t:q.t,q:q.q};if(q.bl)o.bl=q.bl;if(q.t==="mc"){o.ch=q.ch;o.a=q.a}else o.a=q.a;arr.push(o)});
    saveQB(who.id).then(function(){d.close();fG=G;fL=L;renderQuiz();notify("បាននាំចូល "+ok.length+" លំហាត់")});
  };
  d.showModal();math($("txB"));
}

/* ===================== 🧪 បង្កើតតេស្ត ===================== */
function myClasses(tid){return(rs.c&&rs.c[tid])||[]}
function renderMake(){
  var adm=isAdm();if(!mk.tid)mk.tid=who.id;
  var cl=myClasses(mk.tid);if(mk.ci>=cl.length)mk.ci=0;var c=cl[mk.ci],g=c?parseInt(c.n):0,C=window.CUR&&window.CUR[g];
  var pool=allQ().filter(function(q){return q.g===g});
  var h="<div class=bar>"+(adm?"<label>គ្រូ៖</label><select id=qmT>"+data.map(function(t){return"<option value='"+esc(t.id)+"'"+(t.id===mk.tid?" selected":"")+">"+esc(t.name)+"</option>"}).join("")+"</select>":"")+
    "<label>ថ្នាក់៖</label><select id=qmC>"+(cl.length?cl.map(function(x,i){return"<option value="+i+(i===mk.ci?" selected":"")+">"+esc(x.n)+" ("+kn(x.st.length)+" នាក់)</option>"}).join(""):"<option>— មិនទាន់មានថ្នាក់ —</option>")+"</select>"+
    "<label>ចំណងជើង៖</label><input id=qmTi value='"+esc(mk.title||("តេស្ត "+(c?c.n:"")))+"' style='flex:1 1 220px'>"+
    "<label>រយៈពេល (នាទី)៖</label><input id=qmD type=number min=0 value="+mk.dur+" style='width:80px;flex:0 0 80px'></div>"+
    "<div class=bar><label>ប្រភេទតេស្ត៖</label><select id=qmK>"+Object.keys(KIND).map(function(k){return"<option value="+k+(k===mk.kind?" selected":"")+">"+KIND[k]+"</option>"}).join("")+"</select>"+
    (mk.kind!=="g"?"<label>ខែ៖</label><input id=qmM type=month value='"+(mk.mo||curMo())+"' style='width:160px;flex:0 0 160px'><span class=note style='margin:0'>📌 ពិន្ទុនឹងចូល «🗓️ ពិន្ទុប្រចាំខែ › "+KIND[mk.kind]+"» ដោយស្វ័យប្រវត្តិ</span>":"<span class=note style='margin:0'>តេស្តទូទៅ មិនរាប់ចូលពិន្ទុសកម្មភាពប្រចាំខែទេ</span>")+"</div>";
  if(!c){$("qzBody").innerHTML=h+"<p class=note>សូមបង្កើតថ្នាក់ និងបញ្ចូលសិស្សជាមុន។</p>";return}
  if(!C){$("qzBody").innerHTML=h+"<p class=note>ថ្នាក់ «"+esc(c.n)+"» មិនទាន់មានកម្មវិធីសិក្សា។</p>";return}
  var cnt={};pool.forEach(function(q){var k=q.ls+"_"+q.lv;cnt[k]=(cnt[k]||0)+1});
  var grp={},order=[];Object.keys(C.LS).sort(function(a,b){return a-b}).forEach(function(n){var l=C.LS[n],k=l[3]?"ជំពូកទី"+kn(l[3])+" "+l[4]:(l[2]==="ធ"?"ធរណីមាត្រ":"ពីជគណិត");if(!grp[k]){grp[k]=[];order.push(k)}grp[k].push(n)});
  h+="<div class=qm-grid><div class=card><h3>១. ជ្រើសមេរៀន</h3><div class=qm-ls>"+order.map(function(k){return"<div class=qm-ch><b>"+esc(k)+"</b>"+grp[k].map(function(n){
      var tot=(cnt[n+"_1"]||0)+(cnt[n+"_2"]||0)+(cnt[n+"_3"]||0);
      return"<label class=qm-l><input type=checkbox data-ml="+n+(mk.ls[n]?" checked":"")+(tot?"":" disabled")+"> "+esc(lsName(g,n).replace(/^ជំពូកទី\S+ · /,""))+" <small>("+kn(cnt[n+"_1"]||0)+"·"+kn(cnt[n+"_2"]||0)+"·"+kn(cnt[n+"_3"]||0)+")</small></label>"}).join("")+"</div>"}).join("")+"</div>"+
    "<p class=note style='margin:6px 0 0'>(ងាយ·មធ្យម·ពិបាក) = ចំនួនលំហាត់ដែលមានក្នុងធនាគារ</p></div>"+
   "<div class=card><h3>២. ចំនួនលំហាត់</h3>"+[1,2,3].map(function(v){
      var av=pool.filter(function(q){return mk.ls[q.ls]&&q.lv===v}).length;
      return"<div class=qm-n><span class='qz-lv l"+v+"'>"+LV[v]+"</span><input type=number min=0 data-mn="+v+" value="+mk.n[v]+"><small>មាន "+kn(av)+"</small></div>"}).join("")+
    "<button type=button class=primary data-qa=shuffle style='width:100%;margin-top:10px'>🎲 ក្រឡុកលំហាត់</button></div></div>";
  if(mk.items){
    h+="<div class=card><h3>៣. វិញ្ញាសា ("+kn(mk.items.length)+" លំហាត់)</h3><div class=qz-list>"+mk.items.map(function(q,i){
      return"<div class=qz-q><div class=qz-qh><b>លំហាត់ទី"+kn(i+1)+"</b><span class='qz-lv l"+q.lv+"'>"+LV[q.lv]+"</span><span class=qz-ls>"+esc(lsName(q.g,q.ls))+"</span></div><div class=qz-qt>"+tx(q.q)+"</div>"+
        (q.t==="mc"?"<ol class=qz-ch type=A>"+q.ch.map(function(c2,j){return"<li"+(j===+q.a?" class=ok":"")+">"+tx(c2)+"</li>"}).join("")+"</ol>":"<div class=qz-num>ចម្លើយ៖ <b>"+tx(q.a)+"</b></div>")+"</div>"}).join("")+"</div>"+
      "<div class=bar style='margin-top:10px'><button type=button data-qa=shuffle>🎲 ក្រឡុកម្ដងទៀត</button><button type=button class=primary data-qa=open>🚀 បើកតេស្តឱ្យសិស្សធ្វើ</button></div>"+
      "<p class=note>សិស្សម្នាក់ៗទទួលបានលំដាប់លំហាត់ និងលំដាប់ជម្រើស ក ខ គ ឃ ខុសៗគ្នា ដើម្បីកុំឱ្យចម្លងគ្នា។</p></div>";
  }
  $("qzBody").innerHTML=h;math($("qzBody"));
}
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t}return a}
function doShuffle(){
  var cl=myClasses(mk.tid),c=cl[mk.ci],g=c&&parseInt(c.n);if(!c)return;
  if(!Object.keys(mk.ls).some(function(k){return mk.ls[k]})){alert("សូមជ្រើសមេរៀនយ៉ាងតិចមួយ");return}
  var pool=allQ().filter(function(q){return q.g===g&&mk.ls[q.ls]}),out=[],short=[];
  [1,2,3].forEach(function(v){var a=shuffle(pool.filter(function(q){return q.lv===v})),n=+mk.n[v]||0;if(a.length<n)short.push(LV[v]+" ខ្វះ "+kn(n-a.length));out=out.concat(a.slice(0,n))});
  if(!out.length){alert("គ្មានលំហាត់ត្រូវនឹងការជ្រើសទេ");return}
  if(short.length)notify("⚠️ "+short.join(" · "));
  mk.items=out;renderMake();
}
function openTest(){loadTests().then(openTest2)}
function openTest2(){
  var cl=myClasses(mk.tid),c=cl[mk.ci];if(!c||!mk.items)return;
  var id=uid().slice(-8),items=mk.items.map(function(q){var o={id:q.id,t:q.t,q:q.q};if(q.t==="mc")o.ch=q.ch;return o}),keys={};
  mk.items.forEach(function(q){keys[q.id]=q.t==="mc"?{t:"mc",a:+q.a}:{t:"num",a:String(q.a)}});
  var names=c.st.map(function(s,i){return{k:String(s.id||("n"+(i+1))).replace(/[^A-Za-z0-9_-]/g,"_"),n:s.n}});
  var kind=mk.kind||"g",mo=kind==="g"?"":(($("qmM")||{}).value||curMo());
  var dup=kind==="g"?null:tests.filter(function(t){return t.o===mk.tid&&t.cls===c.n&&t.kind===kind&&t.mo===mo})[0];
  if(dup&&!confirm("ថ្នាក់ "+c.n+" មាន «"+KIND[kind]+"» "+moName(mo)+" រួចហើយ («"+dup.title+"»)។\n\nបើបង្កើតថ្មី ពិន្ទុប្រចាំខែនឹងប្រើតេស្តថ្មីនេះជំនួស ហើយតេស្តចាស់ក្លាយជា «តេស្តទូទៅ»។ បន្តទេ?"))return;
  var T={o:mk.tid,title:$("qmTi").value.trim()||("តេស្ត "+c.n),cls:c.n,g:parseInt(c.n),dur:+$("qmD").value||0,open:true,names:names,items:items,cr:new Date().toISOString(),kind:kind,mo:mo};
  if(dup)window.FB.updateDoc(window.FB.doc(window.db,"tests",dup.id),{kind:"g",mo:""}).catch(function(){});
  var FB=window.FB;
  Promise.all([FB.setDoc(FB.doc(window.db,"tests",id),T),FB.setDoc(FB.doc(window.db,"tkeys",id),{o:mk.tid,a:JSON.stringify(keys)})]).then(function(){
    mk.items=null;QV="res";curTest=Object.assign({id:id},T);loadTests().then(function(){renderQuiz();showLink(id)});notify("បានបើកតេស្ត");
  }).catch(function(e){console.error(e);alert(e&&e.code==="permission-denied"?"គ្មានសិទ្ធិ។ សូមប្រាប់ Admin ឱ្យ Publish firestore.rules កំណែថ្មី។":"មិនអាចបើកតេស្តបានទេ")});
}
function showLink(id){
  var d=$("qzLink");if(!d){d=document.createElement("dialog");d.id="qzLink";document.body.appendChild(d)}
  var u=testLink(id);
  d.innerHTML="<div class=dlgb style='text-align:center;min-width:320px'><h2 style='margin:0 0 8px'>🔗 តំណតេស្តសម្រាប់សិស្ស</h2><div id=qzQR class=qz-qr></div>"+
    "<input id=qzU value='"+esc(u)+"' readonly style='text-align:center;margin:10px 0'><div class=bar style='justify-content:center'><button type=button class=primary id=qzCp>📋 ចម្លងតំណ</button><button type=button id=qzX>បិទ</button></div>"+
    "<p class=note>ឱ្យសិស្សស្កេន QR ឬបើកតំណ ហើយជ្រើសឈ្មោះខ្លួន។</p></div>";
  $("qzX").onclick=function(){d.close()};
  $("qzCp").onclick=function(){var i=$("qzU");i.select();try{navigator.clipboard.writeText(u)}catch(x){document.execCommand("copy")}notify("បានចម្លងតំណ")};
  d.showModal();
  (window.QRCode?Promise.resolve():loadJs("https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js")).then(function(){new QRCode($("qzQR"),{text:u,width:200,height:200})}).catch(function(){});
}

/* ===================== 📊 លទ្ធផលតេស្ត ===================== */
function loadTests(){
  var FB=window.FB,q=isAdm()?FB.collection(window.db,"tests"):FB.query(FB.collection(window.db,"tests"),FB.where("o","==",who.id));
  return FB.getDocs(q).then(function(sn){var a=[];sn.forEach(function(d){a.push(Object.assign({id:d.id},d.data()))});a.sort(function(x,y){return(y.cr||"").localeCompare(x.cr||"")});tests=a})
    .catch(function(e){console.error(e);tests=[]});
}
function grade(t){
  var K=keyOf[t.id]||{};
  return subs.map(function(s){
    var sc=0;t.items.forEach(function(q){var k=K[q.id];if(k&&correct({t:k.t,a:k.a},s.a&&s.a[q.id]))sc++});
    return{s:s,sc:sc,n:t.items.length,p:t.items.length?sc/t.items.length*100:0};
  }).sort(function(a,b){return b.sc-a.sc||String(a.s.sn).localeCompare(String(b.s.sn),"km")});
}
function watchSubs(t){
  if(subUn){subUn();subUn=null}subs=[];if(!t)return;
  var FB=window.FB;
  FB.getDoc(FB.doc(window.db,"tkeys",t.id)).then(function(d){try{keyOf[t.id]=JSON.parse(d.data().a)}catch(x){keyOf[t.id]={}}renderRes()}).catch(function(){});
  subUn=FB.onSnapshot(FB.query(FB.collection(window.db,"subs"),FB.where("t","==",t.id)),function(sn){
    var a=[];sn.forEach(function(d){a.push(d.data())});subs=a;if(QV==="res")renderRes();autoDrive(t);
  },function(e){console.error("subs:",e)});
}
function renderRes(){
  var h="";
  if(!curTest){
    h=tests.length?"<div class=qr-list>"+tests.map(function(t){return"<div class=qr-card><div><b>"+esc(t.title)+"</b><small>"+kindBadge(t)+" "+esc(t.cls)+" · "+kn(t.items.length)+" លំហាត់ · "+esc((t.cr||"").slice(0,10))+(isAdm()?" · "+esc(tn(t.o)):"")+"</small></div>"+
      "<span class='qr-st "+(t.open?"on":"")+"'>"+(t.open?"🟢 កំពុងបើក":"⚪ បានបិទ")+"</span><button type=button class=primary data-qo="+t.id+">មើលលទ្ធផល</button></div>"}).join("")+"</div>"
      :"<p class=note>មិនទាន់មានតេស្តទេ។ ចូល «🧪 បង្កើតតេស្ត» ដើម្បីបង្កើត។</p>";
    $("qzBody").innerHTML=h;return;
  }
  var t=curTest,R=grade(t),n=t.items.length,avg=R.length?R.reduce(function(s,r){return s+r.sc},0)/R.length:0,K=keyOf[t.id]||{};
  var done={};R.forEach(function(r){done[r.s.sid]=1});var miss=(t.names||[]).filter(function(x){return!done[x.k]});
  h="<div class=bar><button type=button data-qa=back>‹ តេស្តទាំងអស់</button><b style='font-size:1.05rem'>"+esc(t.title)+"</b><span class=note style='margin:0'>"+esc(t.cls)+"</span>"+
    "<select id=qrK title='ប្រភេទតេស្ត' style='width:auto;margin:0'>"+Object.keys(KIND).map(function(k){return"<option value="+k+((t.kind||"g")===k?" selected":"")+">"+KIND[k]+"</option>"}).join("")+"</select>"+
    ((t.kind||"g")!=="g"?"<input id=qrM type=month value='"+(t.mo||curMo())+"' style='width:150px;margin:0'>":"")+
    "<button type=button data-qa=link>🔗 តំណ/QR</button><button type=button data-qa=toggle>"+(t.open?"🔒 បិទតេស្ត":"🔓 បើកតេស្តវិញ")+"</button>"+
    "<button type=button data-qa=csv>⬇️ Excel</button><button type=button class=primary data-qa=drive>💾 រក្សាទុកក្នុង Drive</button><button type=button class=danger data-qa=del>🗑️</button></div>"+
    "<div class=qr-kpi><div><b>"+kn(R.length)+"/"+kn((t.names||[]).length)+"</b>បានធ្វើ</div><div><b>"+(n?kn((avg).toFixed(1)):"—")+"/"+kn(n)+"</b>មធ្យម</div><div><b>"+kn(R.filter(function(r){return r.p>=50}).length)+"</b>ជាប់ (≥៥០%)</div><div id=qrDrv><b>"+(driveTok()?"✅":"—")+"</b>Drive ស្វ័យប្រវត្តិ</div></div>"+
    "<div class=wrap><table><thead><tr><th>ចំណាត់ថ្នាក់</th><th>ឈ្មោះសិស្ស</th><th>ពិន្ទុ</th><th>ភាគរយ</th><th>ពេលផ្ញើ</th><th>រយៈពេល</th></tr></thead><tbody>"+
    (R.length?R.map(function(r,i){return"<tr><td>"+kn(i+1)+"</td><td class=nm>"+esc(r.s.sn)+"</td><td><b>"+kn(r.sc)+"/"+kn(r.n)+"</b></td><td><span class=pb><i style='width:"+r.p+"%'></i></span> "+r.p.toFixed(0)+"%</td><td>"+esc((r.s.at||"").replace("T"," ").slice(5,16))+"</td><td>"+(r.s.dur?kn(Math.round(r.s.dur/60))+" នាទី":"")+"</td></tr>"}).join(""):"<tr><td colspan=6 class=empty>មិនទាន់មានសិស្សផ្ញើចម្លើយទេ។</td></tr>")+"</tbody></table></div>"+
    (miss.length?"<p class=note>មិនទាន់ធ្វើ ("+kn(miss.length)+")៖ "+miss.map(function(x){return esc(x.n)}).join(" · ")+"</p>":"")+
    "<h3 style='margin:16px 0 8px'>អត្រាឆ្លើយត្រូវតាមលំហាត់</h3><div class=qz-list>"+t.items.map(function(q,i){
      var k=K[q.id],ok=R.filter(function(r){return k&&correct({t:k.t,a:k.a},r.s.a&&r.s.a[q.id])}).length,p=R.length?ok/R.length*100:0;
      return"<div class=qz-q><div class=qz-qh><b>លំហាត់ទី"+kn(i+1)+"</b><span class=qr-rate style='--p:"+p+"%'>"+p.toFixed(0)+"% ត្រូវ</span></div><div class=qz-qt>"+tx(q.q)+"</div></div>"}).join("")+"</div>";
  $("qzBody").innerHTML=h;math($("qzBody"));
}
function resRows(t){var R=grade(t);return[["ល.រ","ឈ្មោះសិស្ស","លេខសម្គាល់","ពិន្ទុ","សរុប","ភាគរយ","ពេលផ្ញើ"]].concat(R.map(function(r,i){return[i+1,r.s.sn,r.s.sid,r.sc,r.n,r.p.toFixed(1)+"%",r.s.at||""]}))}

/* ===================== Google Drive ===================== */
var drv={tok:null,exp:0,cid:"",client:null};
function driveTok(){return drv.tok&&Date.now()<drv.exp?drv.tok:null}
function driveConnect(silent){
  return new Promise(function(ok,no){
    function go(){
      if(!drv.client)drv.client=google.accounts.oauth2.initTokenClient({client_id:drv.cid,scope:"https://www.googleapis.com/auth/drive.file",callback:function(r){
        if(r&&r.access_token){drv.tok=r.access_token;drv.exp=Date.now()+(+r.expires_in-60)*1000;drvBtn();drv.ok&&drv.ok(r.access_token)}else drv.no&&drv.no(r)}});
      drv.ok=ok;drv.no=no;drv.client.requestAccessToken({prompt:silent?"":"consent"});
    }
    var cfgP=drv.cid?Promise.resolve():window.FB.getDoc(window.FB.doc(window.db,"cfg","drive")).then(function(d){drv.cid=(d.exists()&&d.data().cid)||""});
    cfgP.then(function(){
      if(!drv.cid){no("nocid");return}
      (window.google&&google.accounts&&google.accounts.oauth2?Promise.resolve():loadJs("https://accounts.google.com/gsi/client")).then(go,no);
    },no);
  });
}
function drvBtn(){var b=$("qzDrive");if(b){b.textContent=driveTok()?"✅ Google Drive បានភ្ជាប់":"🔗 ភ្ជាប់ Google Drive";b.classList.toggle("on",!!driveTok())}}
function gapi(url,opt){opt=opt||{};opt.headers=Object.assign({Authorization:"Bearer "+drv.tok},opt.headers||{});return fetch(url,opt).then(function(r){if(!r.ok)throw new Error("Drive "+r.status);return r.json()})}
function driveFolder(){
  var k="drvF_"+who.id,f=null;try{f=localStorage.getItem(k)}catch(x){}
  if(f)return Promise.resolve(f);
  var q="name='លទ្ធផលតេស្ត' and mimeType='application/vnd.google-apps.folder' and trashed=false";
  return gapi("https://www.googleapis.com/drive/v3/files?q="+encodeURIComponent(q)+"&fields=files(id)").then(function(r){
    if(r.files&&r.files.length)return r.files[0].id;
    return gapi("https://www.googleapis.com/drive/v3/files",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:"លទ្ធផលតេស្ត",mimeType:"application/vnd.google-apps.folder"})}).then(function(x){return x.id});
  }).then(function(id){try{localStorage.setItem(k,id)}catch(x){}return id});
}
function driveSave(t,quiet){
  if(!driveTok())return Promise.reject("notok");
  var csv=resRows(t).map(function(r){return r.map(function(v){return'"'+String(v).replace(/"/g,'""')+'"'}).join(",")}).join("\r\n");
  var fk="drv_"+t.id,fid=null;try{fid=localStorage.getItem(fk)}catch(x){}
  var name=t.title+" · "+t.cls+" ("+(t.cr||"").slice(0,10)+")";
  function upload(folder){
    var meta=fid?{name:name}:{name:name,mimeType:"application/vnd.google-apps.spreadsheet",parents:[folder]},b="qz"+uid();
    var body="--"+b+"\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n"+JSON.stringify(meta)+"\r\n--"+b+"\r\nContent-Type: text/csv; charset=UTF-8\r\n\r\n﻿"+csv+"\r\n--"+b+"--";
    return gapi("https://www.googleapis.com/upload/drive/v3/files"+(fid?"/"+fid:"")+"?uploadType=multipart",{method:fid?"PATCH":"POST",headers:{"Content-Type":"multipart/related; boundary="+b},body:body});
  }
  return driveFolder().then(upload).then(function(r){try{localStorage.setItem(fk,r.id);localStorage.setItem(fk+"_n",String(subs.length))}catch(x){}if(!quiet)notify("បានរក្សាទុកក្នុង Google Drive › លទ្ធផលតេស្ត");return r})
    .catch(function(e){if(String(e).indexOf("404")>=0){try{localStorage.removeItem(fk)}catch(x){}}if(!quiet)alert("មិនអាចរក្សាទុកក្នុង Drive បានទេ ("+e+")");throw e});
}
var adT=0;
function autoDrive(t){   /* ពេលមានសិស្សផ្ញើថ្មី និង Drive បានភ្ជាប់ → រក្សាទុកស្វ័យប្រវត្តិ */
  if(!driveTok()||!subs.length)return;var n="";try{n=localStorage.getItem("drv_"+t.id+"_n")}catch(x){}
  if(n===String(subs.length))return;
  clearTimeout(adT);adT=setTimeout(function(){driveSave(t,true).then(function(){var d=$("qrDrv");if(d)d.innerHTML="<b>✅</b>បានរក្សាទុក "+new Date().toTimeString().slice(0,5)}).catch(function(){})},1500);
}
function driveClick(){
  driveConnect(false).then(function(){notify("បានភ្ជាប់ Google Drive");if(curTest)autoDrive(curTest)}).catch(function(e){
    if(e==="nocid")alert("Admin មិនទាន់កំណត់ Google Client ID ទេ។\n\nAdmin៖ ⚙️ ការកំណត់ → 🏫 សាលា → «Google Drive Client ID»");
    else alert("មិនអាចភ្ជាប់ Google Drive បានទេ។");
  });
}

/* ===================== គោល ===================== */
function renderQuiz(){
  if(!who)return;
  [].forEach.call($("qzSeg").querySelectorAll("[data-qv]"),function(b){b.setAttribute("aria-selected",b.dataset.qv===QV)});drvBtn();
  if(!qbLoaded){$("qzBody").innerHTML="<p class=note>កំពុងផ្ទុក…</p>";loadQB().then(renderQuiz);return}
  if(QV==="bank")renderBank();else if(QV==="make")renderMake();
  else{if(!tests.length&&!renderQuiz.tl){renderQuiz.tl=1;loadTests().then(renderQuiz);return}renderRes()}
}
window.renderQuiz=renderQuiz;
/* សម្រាប់ «ពិន្ទុប្រចាំខែ» (monthly.js)៖ បញ្ជីតេស្តរបស់គ្រូ និងពិន្ទុតាមសិស្ស */
window.QUIZ={
  KIND:KIND,
  forMonth:function(tid,cls,mo){   /* {t1:{t,n,by}, t2:{…}} · ប្រសិនបើមានច្រើន យកតេស្តថ្មីបំផុត */
    var self=this;return self.list(tid).then(function(L){
      var out={},pick={};L.forEach(function(t){if(t.cls===cls&&t.mo===mo&&(t.kind==="t1"||t.kind==="t2")&&!pick[t.kind])pick[t.kind]=t});
      return Promise.all(Object.keys(pick).map(function(k){return self.scores(pick[k]).then(function(S){out[k]={t:pick[k],n:S.n,by:S.by}})})).then(function(){return out});
    });
  },
  list:function(tid){var FB=window.FB;return FB.getDocs(FB.query(FB.collection(window.db,"tests"),FB.where("o","==",tid))).then(function(sn){var a=[];sn.forEach(function(d){a.push(Object.assign({id:d.id},d.data()))});return a.sort(function(x,y){return(y.cr||"").localeCompare(x.cr||"")})})},
  scores:function(t){var FB=window.FB;
    return Promise.all([FB.getDoc(FB.doc(window.db,"tkeys",t.id)),FB.getDocs(FB.query(FB.collection(window.db,"subs"),FB.where("t","==",t.id)))]).then(function(r){
      var K={};try{K=JSON.parse(r[0].data().a)}catch(x){}var by={};
      r[1].forEach(function(d){var s=d.data(),sc=0;t.items.forEach(function(q){var k=K[q.id];if(k&&correct({t:k.t,a:k.a},s.a&&s.a[q.id]))sc++});by[s.sid]=sc});
      return{n:t.items.length,by:by};
    })}
};
$("qzSeg").onclick=function(e){
  if(e.target.closest("#qzDrive"))return driveClick();
  var b=e.target.closest("[data-qv]");if(!b)return;QV=b.dataset.qv;
  if(QV==="res"){curTest=null;watchSubs(null);loadTests().then(renderQuiz);return}
  renderQuiz();
};
$("qzBody").addEventListener("change",function(e){
  var el=e.target,id=el.id;
  if(id==="qfG"){fG=+el.value;fL="";renderBank()}else if(id==="qfL"){fL=el.value;renderBank()}else if(id==="qfV"){fV=+el.value;renderBank()}else if(id==="qfM"){mine=el.checked;renderBank()}
  else if(id==="qmT"){mk.tid=el.value;mk.ci=0;mk.ls={};mk.items=null;renderMake()}else if(id==="qmC"){mk.ci=+el.value;mk.ls={};mk.items=null;renderMake()}
  else if(id==="qmTi")mk.title=el.value;else if(id==="qmD")mk.dur=+el.value||0;
  else if(id==="qmK"){mk.kind=el.value;mk.title=($("qmTi")||{}).value||mk.title;renderMake()}else if(id==="qmM")mk.mo=el.value;
  else if((id==="qrK"||id==="qrM")&&curTest){
    var t=curTest,k=$("qrK").value,mo=k==="g"?"":(($("qrM")||{}).value||t.mo||curMo()),FB=window.FB,ops=[FB.updateDoc(FB.doc(window.db,"tests",t.id),{kind:k,mo:mo})];
    var dup=k==="g"?null:tests.filter(function(x){return x.id!==t.id&&x.o===t.o&&x.cls===t.cls&&x.kind===k&&x.mo===mo})[0];
    if(dup){if(!confirm("មាន «"+KIND[k]+"» "+moName(mo)+" រួចហើយ («"+dup.title+"»)។ ប្ដូរតេស្តនោះទៅ «តេស្តទូទៅ» ហើយប្រើតេស្តនេះជំនួស?")){renderRes();return}ops.push(FB.updateDoc(FB.doc(window.db,"tests",dup.id),{kind:"g",mo:""}));dup.kind="g";dup.mo=""}
    Promise.all(ops).then(function(){t.kind=k;t.mo=mo;renderRes();notify(k==="g"?"ប្ដូរទៅ «តេស្តទូទៅ»":"ពិន្ទុនឹងចូល «"+KIND[k]+"» "+moName(mo))}).catch(function(){alert("មិនអាចប្ដូរបានទេ")});
  }
  else if(el.dataset.ml){mk.ls[el.dataset.ml]=el.checked;mk.items=null;renderMake()}
  else if(el.dataset.mn){mk.n[el.dataset.mn]=Math.max(0,+el.value||0)}
});
$("qzBody").addEventListener("click",function(e){
  var b=e.target.closest("[data-qa],[data-qe],[data-qd],[data-qo]");if(!b)return;
  if(b.dataset.qe){var p=b.dataset.qe.split("|"),q=(qb[p[0]]||[]).filter(function(x){return x.id===p[1]})[0];if(q)qDialog(Object.assign({by:p[0]},q));return}
  if(b.dataset.qd){var p2=b.dataset.qd.split("|");if(!confirm("លុបលំហាត់នេះ?"))return;qb[p2[0]]=(qb[p2[0]]||[]).filter(function(x){return x.id!==p2[1]});saveQB(p2[0]).then(function(){renderBank();notify("បានលុបលំហាត់")});return}
  if(b.dataset.qo){curTest=tests.filter(function(t){return t.id===b.dataset.qo})[0];watchSubs(curTest);renderRes();return}
  var a=b.dataset.qa,t=curTest;
  if(a==="reload"){qbLoaded=false;qbErr="";renderQuiz();return}
  if(a==="new")qDialog();
  else if(a==="tex")texImport();
  else if(a==="shuffle"){mk.title=($("qmTi")||{}).value||mk.title;mk.dur=+(($("qmD")||{}).value)||mk.dur;doShuffle()}
  else if(a==="open")openTest();
  else if(a==="back"){curTest=null;watchSubs(null);loadTests().then(renderRes)}
  else if(a==="link")showLink(t.id);
  else if(a==="toggle"){window.FB.updateDoc(window.FB.doc(window.db,"tests",t.id),{open:!t.open}).then(function(){t.open=!t.open;renderRes();notify(t.open?"បានបើកតេស្ត":"បានបិទតេស្ត — សិស្សមិនអាចផ្ញើបានទៀត")})}
  else if(a==="csv")dlCSV(resRows(t),"តេស្ត-"+t.cls+"-"+(t.cr||"").slice(0,10)+".csv");
  else if(a==="drive"){(driveTok()?Promise.resolve():driveConnect(false)).then(function(){return driveSave(t,false)}).catch(function(e){if(e==="nocid")driveClick()})}
  else if(a==="del"){if(!confirm("លុបតេស្ត «"+t.title+"» និងលទ្ធផលទាំងអស់?"))return;
    var FB=window.FB;Promise.all(subs.map(function(s){return FB.deleteDoc(FB.doc(window.db,"subs",t.id+"_"+s.sid))}).concat([FB.deleteDoc(FB.doc(window.db,"tests",t.id)),FB.deleteDoc(FB.doc(window.db,"tkeys",t.id))]))
      .then(function(){curTest=null;watchSubs(null);loadTests().then(renderRes);notify("បានលុបតេស្ត")}).catch(function(){alert("មិនអាចលុបបានទេ")})}
});
})();
