/* ========================================================================
   📈 គូររូបលំហាត់ដោយស្វ័យប្រវត្តិ (SVG) — ប្រើក្នុងធនាគារលំហាត់ (quiz.js) និងទំព័រសិស្ស (test.html)
   FIG.svg(ការពិពណ៌នា) → HTML · មួយបន្ទាត់មួយពាក្យបញ្ជា (ឬបំបែកដោយ ;)
     y=x^2-2x-3            ក្រាបអនុគមន៍ (y=… [a,b] = តែលើចន្លោះ · ពណ៌នៅចុង៖ red/blue/green/orange/purple ឬ #hex)
     area y=x^2 [0,2]      ផ្ទៃក្រោមខ្សែកោង  ·  area y=x | y=x^2 [0,1]  ផ្ទៃរវាងខ្សែកោងពីរ
     tangent y=x^2 at 1    បន្ទាត់ប៉ះ  ·  normal y=x^2 at 1  បន្ទាត់កែង
     hole (1,2)            ចំណុចចំហ (រង្វង់ទទេ)  ·  dots y=1/x [1,8]  ចំណុចស្វ៊ីត (x ជាចំនួនគត់)
     angle A O B           មុំត្រង់ O (ធ្នូ)
     x=1 · asym y=2        បន្ទាត់ដាច់ៗ (អាស៊ីមតូត)
     x^2/9+y^2/4=1         ខ្សែកោងសមីការ (អេលីប អ៊ីពែបូល …)
     A(1,2)                ចំណុច · seg A B · line A B · vec A B · poly A B C · circle A 2 · circle A B
     complex z1=1+i z2=-2+3i   ចំណុច/វ៉ិចទ័រលើប្លង់កុំផ្លិច (អ័ក្ស Re · Im)
     text (1,2) ស្លាក  ·  window x=-4..6 y=-3..5  ·  nogrid  ·  noaxes
   ======================================================================== */
(function(){
"use strict";
var COL={red:"#c9372c",blue:"#2f6fd0",green:"#1f8a5b",orange:"#d9731a",purple:"#7c3aed",black:"#222",gray:"#777"},PAL=["#2f6fd0","#c9372c","#1f8a5b","#d9731a","#7c3aed"];
function E(s){return String(s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
/* ---------- កន្សោមគណិត → អនុគមន៍ (គ្មាន eval) ---------- */
var FN={sin:Math.sin,cos:Math.cos,tan:Math.tan,asin:Math.asin,acos:Math.acos,atan:Math.atan,sqrt:Math.sqrt,abs:Math.abs,ln:Math.log,log:function(v){return Math.log(v)/Math.LN10},exp:Math.exp,sinh:Math.sinh,cosh:Math.cosh,tanh:Math.tanh,cot:function(v){return 1/Math.tan(v)}};
function parse(src){
  var s=String(src).replace(/\s+/g,"").replace(/·|×/g,"*").replace(/−/g,"-").replace(/π/g,"pi").replace(/√/g,"sqrt").replace(/\*\*/g,"^"),i=0;
  function peek(){return s[i]}
  function num(){var m=/^(\d+\.?\d*|\.\d+)/.exec(s.slice(i));if(!m)return null;i+=m[0].length;var v=+m[0];return function(){return v}}
  function atom(){
    var c=peek();if(c==null)throw"end";
    if(c==="("){i++;var e=expr();if(s[i]!==")")throw")";i++;return e}
    var n=num();if(n)return n;
    var m=/^[a-z]+/i.exec(s.slice(i));if(!m)throw"?"+c;
    var w=m[0];
    /* ឈ្មោះអនុគមន៍វែងបំផុតដែលត្រូវ (ឧ. sinx → sin x) */
    for(var L=w.length;L>0;L--){var p=w.slice(0,L);if(FN[p]){i+=L;var a=unary();var f=FN[p];return function(x,y){return f(a(x,y))}}}
    i++;c=w[0];
    if(c==="x")return function(x){return x};
    if(c==="y")return function(x,y){return y};
    if(c==="e")return function(){return Math.E};
    if(c==="p"&&s[i]==="i"){i++;return function(){return Math.PI}}
    throw"?"+c;
  }
  function pow(){var b=atom();if(s[i]==="^"){i++;var e=unary();return function(x,y){return Math.pow(b(x,y),e(x,y))}}return b}   /* x^2^3 = x^(2^3) */
  function unary(){if(s[i]==="-"){i++;var a=unary();return function(x,y){return-a(x,y)}}if(s[i]==="+"){i++;return unary()}return pow()}
  /* បិទ A,B ក្នុងអនុគមន៍ដាច់ដោយឡែក (កុំឱ្យ var ក្នុងរង្វិលជុំចែករំលែកគ្នា) */
  function op(c,A,B){return c==="*"?function(x,y){return A(x,y)*B(x,y)}:c==="/"?function(x,y){return A(x,y)/B(x,y)}:c==="+"?function(x,y){return A(x,y)+B(x,y)}:function(x,y){return A(x,y)-B(x,y)}}
  function term(){
    var a=unary();
    for(;;){
      var c=s[i];
      if(c==="*"||c==="/"){i++;a=op(c,a,unary());continue}
      if(c!=null&&/[0-9a-z(.]/i.test(c)){a=op("*",a,pow());continue}   /* គុណដោយមិនសរសេរ * (2x · x(x-1)) */
      return a;
    }
  }
  function expr(){var a=term();while(s[i]==="+"||s[i]==="-"){var c=s[i++];a=op(c,a,term())}return a}
  var f=expr();if(i<s.length)throw"?"+s[i];
  return f;
}
function cnum(t){   /* a+bi → [a,b] */
  t=String(t).replace(/\s+/g,"").replace(/−/g,"-");
  var m=/^([+-]?[\d.]+)?(?:([+-])([\d.]*)\*?i)?$/.exec(t);
  if(m&&(m[1]!=null||m[2])){var re=m[1]!=null?+m[1]:0,im=m[2]?(m[2]==="-"?-1:1)*(m[3]===""?1:+m[3]):0;return[re,im]}
  m=/^([+-]?[\d.]*)\*?i$/.exec(t);if(m)return[0,m[1]===""||m[1]==="+"?1:m[1]==="-"?-1:+m[1]];
  return null;
}
function color(t){var m=/\s+(red|blue|green|orange|purple|black|gray|#[0-9a-f]{3,6})\s*$/i.exec(t);return m?[t.slice(0,m.index),COL[m[1].toLowerCase()]||m[1]]:[t,null]}
function niceStep(r){var raw=r/8,p=Math.pow(10,Math.floor(Math.log10(raw))),n=raw/p;return(n<1.5?1:n<3.5?2:n<7.5?5:10)*p}
function sub(t){   /* z1 → z₁ (tspan) */
  var m=/^([A-Za-zα-ω'′]+)_?(\d+)?('*)$/.exec(t);if(!m)return E(t);
  return"<tspan font-style=italic>"+E(m[1])+"</tspan>"+(m[2]?"<tspan baseline-shift=sub font-size=75%>"+m[2]+"</tspan>":"")+E(m[3]||"");
}
function svg(spec){
  var lines=String(spec||"").split(/\n|;/).map(function(l){return l.trim()}).filter(Boolean);
  if(!lines.length)return"";
  var P={},items=[],errs=[],win=null,grid=true,axes=true,cx=false,ci=0;
  function nextC(){return PAL[(ci++)%PAL.length]}
  lines.forEach(function(L){
    try{
      var c=color(L),t=c[0].trim(),col=c[1],m;
      if(/^nogrid$/i.test(t)){grid=false;return}
      if(/^noaxes$/i.test(t)){axes=false;return}
      if((m=/^window\s+(.*)$/i.exec(t))){win=win||{};var mx=/x\s*=\s*(-?[\d.]+)\s*\.\.\s*(-?[\d.]+)/i.exec(m[1]),my=/y\s*=\s*(-?[\d.]+)\s*\.\.\s*(-?[\d.]+)/i.exec(m[1]);if(mx){win.x0=+mx[1];win.x1=+mx[2]}if(my){win.y0=+my[1];win.y1=+my[2]}return}
      if((m=/^complex\s+(.*)$/i.exec(t))){cx=true;m[1].split(/\s+|,/).filter(Boolean).forEach(function(z){var q=/^([A-Za-z]\w*)\s*=\s*(.+)$/.exec(z),v=cnum(q?q[2]:z);if(!v)throw"ចំនួនកុំផ្លិច «"+z+"»";var n=q?q[1]:"";if(n)P[n]=v;items.push({k:"cpt",p:v,n:n,c:col||nextC()})});return}
      if((m=/^normal\s+y\s*=\s*(.+?)\s+at\s+(-?[\d.]+)$/i.exec(t))){var f1=parse(m[1]),x1=+m[2],h1=1e-5,k1=(f1(x1+h1)-f1(x1-h1))/(2*h1);items.push({k:"tan",x0:x1,y0:f1(x1),m:k1?-1/k1:1e6,vert:!k1,c:col||nextC()});return}
      if((m=/^hole\s+([A-Za-z]\w*)?\s*\(\s*([^,]+),([^)]+)\)$/i.exec(t))){var hp=[parse(m[2])(),parse(m[3])()];if(m[1])P[m[1]]=hp;items.push({k:"hole",p:hp,n:m[1]||"",c:col||"#222"});return}
      if((m=/^dots\s+y\s*=\s*(.+?)\s*\[\s*([^,\]]+)\s*,\s*([^\]]+)\]$/i.exec(t))){var fd=parse(m[1]),da=Math.ceil(parse(m[2])()),db=Math.floor(parse(m[3])()),dc=col||nextC();for(var n=da;n<=db&&n-da<200;n++){var dv=fd(n,0);if(isFinite(dv))items.push({k:"pt",p:[n,dv],n:"",c:dc})}return}
      if((m=/^angle\s+(\S+)\s+(\S+)\s+(\S+)(?:\s+(.+))?$/i.exec(t))){items.push({k:"ang",ns:[m[1],m[2],m[3]],lb:m[4]||"",c:col||"#d9731a"});return}
      if((m=/^text\s*\(\s*(-?[\d.]+)\s*,\s*(-?[\d.]+)\s*\)\s*(.+)$/i.exec(t))){items.push({k:"text",p:[+m[1],+m[2]],n:m[3],c:col||"#222"});return}
      if((m=/^([A-Za-z]\w*)?\s*\(\s*(-?[\d.]+(?:\/[\d.]+)?)\s*,\s*(-?[\d.]+(?:\/[\d.]+)?)\s*\)$/.exec(t))&&!/^(x|y)$/i.test(m[1]||"")){
        var px=parse(m[2])(),py=parse(m[3])();if(m[1])P[m[1]]=[px,py];items.push({k:"pt",p:[px,py],n:m[1]||"",c:col||"#222"});return}
      if((m=/^point\s+(.*)$/i.exec(t))){var q2=/^([A-Za-z]\w*)?\s*\(\s*([^,]+),([^)]+)\)$/.exec(m[1]);if(!q2)throw"ចំណុច";var v2=[parse(q2[2])(),parse(q2[3])()];if(q2[1])P[q2[1]]=v2;items.push({k:"pt",p:v2,n:q2[1]||"",c:col||"#222"});return}
      if((m=/^(seg|line|vec|poly)\s+(.+)$/i.exec(t))){var ns=m[2].split(/\s+/);items.push({k:m[1].toLowerCase(),ns:ns,c:col||nextC()});return}
      if((m=/^circle\s+(.+)$/i.exec(t))){var a=m[1].trim(),cc=/^\(\s*([^,]+),([^)]+)\)\s*(?:r\s*=\s*)?(.+)$/.exec(a),it={k:"circle",c:col||nextC()};
        if(cc){it.o=[parse(cc[1])(),parse(cc[2])()];it.r=parse(cc[3])()}else{var w=a.split(/\s+/);it.on=w[0];if(/^(r\s*=\s*)?[\d.]+$/.test(w.slice(1).join("")))it.r=+w.slice(1).join("").replace(/r\s*=/,"");else it.thru=w[1]}
        items.push(it);return}
      if((m=/^tangent\s+y\s*=\s*(.+?)\s+at\s+(-?[\d.]+)$/i.exec(t))){var f0=parse(m[1]),x0=+m[2],h=1e-5,k=(f0(x0+h)-f0(x0-h))/(2*h);items.push({k:"tan",x0:x0,y0:f0(x0),m:k,c:col||nextC()});return}
      if((m=/^area\s+y\s*=\s*(.+?)(?:\s*\|\s*y\s*=\s*(.+?))?\s*\[\s*([^,\]]+)\s*,\s*([^\]]+)\]$/i.exec(t))){items.push({k:"area",f:parse(m[1]),g:m[2]?parse(m[2]):null,a:parse(m[3])(),b:parse(m[4])(),c:col||"#2f6fd0"});return}
      if((m=/^(asym\s+|dash\s+)?x\s*=\s*(-?[\d.\/]+)$/i.exec(t))){items.push({k:"vline",x:parse(m[2])(),c:col||"#888"});return}
      if((m=/^(asym\s+|dash\s+)?y\s*=\s*(.+?)(?:\s*\[\s*([^,\]]+)\s*,\s*([^\]]+)\])?$/i.exec(t))&&!/[^<>]=/.test(m[2])){
        items.push({k:"fn",f:parse(m[2]),d:m[3]!=null?[parse(m[3])(),parse(m[4])()]:null,dash:!!m[1],c:col||(m[1]?"#888":nextC())});return}
      if((m=/^(.+?)=(.+)$/.exec(t))){var l=parse(m[1]),r=parse(m[2]);items.push({k:"impl",F:function(x,y){return l(x,y)-r(x,y)},c:col||nextC()});return}
      throw"មិនស្គាល់";
    }catch(e){errs.push("«"+L+"» "+(typeof e==="string"?e:"កន្សោមមិនត្រឹមត្រូវ"))}
  });
  function pt(n){if(P[n])return P[n];if(/^O$/i.test(n))return[0,0];var m=/^\(\s*([^,]+),([^)]+)\)$/.exec(n);if(m)return[parse(m[1])(),parse(m[2])()];throw"រកមិនឃើញចំណុច «"+n+"»"}
  /* ---------- ទំហំបង្អួច ---------- */
  var xs=[0],ys=[0];
  items.forEach(function(it){
    if(it.p){xs.push(it.p[0]);ys.push(it.p[1])}
    if(it.k==="circle"){try{var o=it.o||pt(it.on),r=it.r!=null?it.r:Math.hypot(pt(it.thru)[0]-o[0],pt(it.thru)[1]-o[1]);xs.push(o[0]-r,o[0]+r);ys.push(o[1]-r,o[1]+r)}catch(e){}}
    if(it.k==="area"){xs.push(it.a,it.b)}
    if(it.k==="vline")xs.push(it.x);
    if(it.k==="tan"){xs.push(it.x0);ys.push(it.y0)}
    if(it.k==="impl"){   /* រកដែនខ្សែកោងសមីការ (ចំណុចប្ដូរសញ្ញាក្នុង [-10,10]²) */
      var N=80,bx=[],by=[];for(var i=0;i<N;i++)for(var j=0;j<N;j++){var x=-10+20*i/N,y=-10+20*j/N,a0=it.F(x,y),a1=it.F(x+20/N,y),a2=it.F(x,y+20/N);if(isFinite(a0)&&((a0>0)!==(a1>0)||(a0>0)!==(a2>0))){bx.push(x);by.push(y)}}
      if(bx.length){it.bb=[Math.min.apply(null,bx),Math.max.apply(null,bx),Math.min.apply(null,by),Math.max.apply(null,by)];xs.push(Math.max(-8,it.bb[0]),Math.min(8,it.bb[1]))}
    }
  });
  /* ផ្តោតលើផ្នែកសំខាន់ (ផ្ទៃ · ចំណុច · បន្ទាត់ប៉ះ) បើមាន · បើគ្មាន ប្រើ [-5,5] */
  var X0,X1,Y0,Y1,hasF=items.some(function(it){return it.k==="fn"||it.k==="impl"||it.k==="area"}),fy=[];
  X0=Math.min.apply(null,xs);X1=Math.max.apply(null,xs);
  if(win&&win.x0!=null){X0=win.x0;X1=win.x1}
  else{X0=Math.floor(X0-1.5);X1=Math.ceil(X1+1.5);if(hasF&&X1-X0<6){var mid=Math.round((X0+X1)/2);X0=Math.min(X0,mid-3);X1=Math.max(X1,mid+3)}}
  items.forEach(function(it){
    if(it.p)fy.push(it.p[1]);
    if(it.k==="tan")fy.push(it.y0);
    if(it.k==="area")for(var j=0;j<=40;j++){var x=it.a+(it.b-it.a)*j/40,v=it.f(x,0);if(isFinite(v))fy.push(v);if(it.g){v=it.g(x,0);if(isFinite(v))fy.push(v)}}
    if(it.k==="circle"){try{var o=it.o||pt(it.on),r=it.r!=null?it.r:Math.hypot(pt(it.thru)[0]-o[0],pt(it.thru)[1]-o[1]);fy.push(o[1]-r,o[1]+r)}catch(e){}}
  });
  /* ក្រាប៖ មានផ្ទៃ → យកតម្លៃតែលើចន្លោះផ្ទៃ · គ្មាន → លើបង្អួចទាំងមូល (|y|<8) */
  var ar=items.filter(function(it){return it.k==="area"}),fa=ar.length?Math.min.apply(null,ar.map(function(it){return it.a})):X0,fb=ar.length?Math.max.apply(null,ar.map(function(it){return it.b})):X1;
  items.forEach(function(it){if(it.k==="fn"&&!it.dash){for(var j=0;j<=80;j++){var x=fa+(fb-fa)*j/80;if(it.d&&(x<it.d[0]||x>it.d[1]))continue;var v=it.f(x,0);if(isFinite(v)&&Math.abs(v)<8)fy.push(v)}}});
  items.forEach(function(it){if(it.k==="impl"&&it.bb)fy.push(Math.max(-8,it.bb[2]),Math.min(8,it.bb[3]))});
  ys=ys.concat(fy);
  Y0=Math.min.apply(null,ys);Y1=Math.max.apply(null,ys);
  if(win&&win.y0!=null){Y0=win.y0;Y1=win.y1}else{Y0=Math.floor(Math.max(Y0,-10)-1);Y1=Math.ceil(Math.min(Y1,10)+1)}
  if(!(X1>X0))X1=X0+1;if(!(Y1>Y0))Y1=Y0+1;
  var W=380,H=Math.max(200,Math.min(460,W*(Y1-Y0)/(X1-X0))),pad=14;
  function sx(x){return pad+(x-X0)/(X1-X0)*(W-2*pad)}
  function sy(y){return H-pad-(y-Y0)/(Y1-Y0)*(H-2*pad)}
  var g="<svg viewBox='0 0 "+W+" "+H+"' class=fig-svg role=img xmlns='http://www.w3.org/2000/svg' font-family='system-ui,sans-serif' font-size=11><defs><marker id=figA markerUnits=userSpaceOnUse markerWidth=9 markerHeight=9 refX=8 refY=4.5 orient=auto><path d='M0,0 L9,4.5 L0,9z' fill='context-stroke'/></marker></defs><rect width=100% height=100% fill=#fff />";
  var sxs=niceStep(X1-X0),sys=niceStep(Y1-Y0);
  if(grid){for(var a=Math.ceil(X0/sxs)*sxs;a<=X1;a+=sxs)g+="<line x1="+sx(a)+" y1="+pad+" x2="+sx(a)+" y2="+(H-pad)+" stroke=#e6e9ef />";for(var b=Math.ceil(Y0/sys)*sys;b<=Y1;b+=sys)g+="<line x1="+pad+" y1="+sy(b)+" x2="+(W-pad)+" y2="+sy(b)+" stroke=#e6e9ef />"}
  if(axes){
    var ax=Math.min(Math.max(0,Y0),Y1),ay=Math.min(Math.max(0,X0),X1);
    g+="<line x1="+pad+" y1="+sy(ax)+" x2="+(W-4)+" y2="+sy(ax)+" stroke=#333 stroke-width=1.2 marker-end='url(#figA)'/><line x1="+sx(ay)+" y1="+(H-pad)+" x2="+sx(ay)+" y2=4 stroke=#333 stroke-width=1.2 marker-end='url(#figA)'/>";
    g+="<text x="+(W-6)+" y="+(sy(ax)-6)+" text-anchor=end font-style=italic>"+(cx?"Re":"x")+"</text><text x="+(sx(ay)+6)+" y=13 font-style=italic>"+(cx?"Im":"y")+"</text>";
    for(var u=Math.ceil(X0/sxs)*sxs;u<=X1-sxs/2;u+=sxs){var uu=+u.toFixed(6);if(Math.abs(uu)<1e-9)continue;g+="<line x1="+sx(uu)+" y1="+(sy(ax)-3)+" x2="+sx(uu)+" y2="+(sy(ax)+3)+" stroke=#333 /><text x="+sx(uu)+" y="+(sy(ax)+14)+" text-anchor=middle fill=#555>"+uu+"</text>"}
    for(var v=Math.ceil(Y0/sys)*sys;v<=Y1-sys/2;v+=sys){var vv=+v.toFixed(6);if(Math.abs(vv)<1e-9)continue;g+="<line x1="+(sx(ay)-3)+" y1="+sy(vv)+" x2="+(sx(ay)+3)+" y2="+sy(vv)+" stroke=#333 /><text x="+(sx(ay)-5)+" y="+(sy(vv)+4)+" text-anchor=end fill=#555>"+vv+"</text>"}
    g+="<text x="+(sx(ay)-5)+" y="+(sy(ax)+14)+" text-anchor=end fill=#555 font-style=italic>O</text>";
  }
  var lab="";
  function label(p,n,c){if(!n)return;var dx=p[0]<0?-7:7,dy=p[1]<0?15:-7;lab+="<text x="+(sx(p[0])+dx)+" y="+(sy(p[1])+dy)+" text-anchor="+(p[0]<0?"end":"start")+" fill='"+c+"' font-size=13 font-weight=600>"+sub(n)+"</text>"}
  function path(f,d,c,dash){
    var o="",pen=false,N=500,lx=null,ly=null;
    for(var j=0;j<=N;j++){var x=X0+(X1-X0)*j/N;if(d&&(x<d[0]-1e-9||x>d[1]+1e-9)){pen=false;continue}var y=f(x,0);
      if(!isFinite(y)||y<Y0-(Y1-Y0)*2||y>Y1+(Y1-Y0)*2||(pen&&Math.abs(y-ly)>(Y1-Y0)*1.5)){pen=false;continue}
      o+=(pen?"L":"M")+sx(x).toFixed(1)+","+sy(y).toFixed(1);pen=true;lx=x;ly=y}
    return"<path d='"+o+"' fill=none stroke='"+c+"' stroke-width=2.2"+(dash?" stroke-dasharray='6 4'":"")+" />";
  }
  items.forEach(function(it){try{
    if(it.k==="area"){var o="",N=200,a=Math.max(it.a,X0),b=Math.min(it.b,X1);for(var j=0;j<=N;j++){var x=a+(b-a)*j/N;o+=(j?"L":"M")+sx(x).toFixed(1)+","+sy(Math.max(Y0,Math.min(Y1,it.f(x,0)))).toFixed(1)}
      for(j=N;j>=0;j--){var x2=a+(b-a)*j/N,y2=it.g?it.g(x2,0):0;o+="L"+sx(x2).toFixed(1)+","+sy(Math.max(Y0,Math.min(Y1,y2))).toFixed(1)}
      g+="<path d='"+o+"Z' fill='"+it.c+"' fill-opacity=.22 stroke=none />"+path(it.f,[a,b],it.c)+(it.g?path(it.g,[a,b],it.c):"")+"<line x1="+sx(a)+" y1="+sy(0)+" x2="+sx(a)+" y2="+sy(it.f(a,0))+" stroke='"+it.c+"' stroke-dasharray='3 3'/><line x1="+sx(b)+" y1="+sy(0)+" x2="+sx(b)+" y2="+sy(it.f(b,0))+" stroke='"+it.c+"' stroke-dasharray='3 3'/>"}
    else if(it.k==="fn")g+=path(it.f,it.d,it.c,it.dash);
    else if(it.k==="vline")g+="<line x1="+sx(it.x)+" y1="+pad+" x2="+sx(it.x)+" y2="+(H-pad)+" stroke='"+it.c+"' stroke-width=1.6 stroke-dasharray='6 4'/>";
    else if(it.k==="tan"){g+=(it.vert?"<line x1="+sx(it.x0)+" y1="+pad+" x2="+sx(it.x0)+" y2="+(H-pad)+" stroke='"+it.c+"' stroke-width=2 />":path(function(x){return it.y0+it.m*(x-it.x0)},null,it.c,false))+"<circle cx="+sx(it.x0)+" cy="+sy(it.y0)+" r=3.5 fill='"+it.c+"'/>"}
    else if(it.k==="ang"){var Pa=pt(it.ns[0]),Po=pt(it.ns[1]),Pb=pt(it.ns[2]),ux=(sx(Pa[0])-sx(Po[0])),uy=(sy(Pa[1])-sy(Po[1])),vx=(sx(Pb[0])-sx(Po[0])),vy=(sy(Pb[1])-sy(Po[1])),R=22,
        a1=Math.atan2(uy,ux),a2=Math.atan2(vy,vx),dA=a2-a1;while(dA<=-Math.PI)dA+=2*Math.PI;while(dA>Math.PI)dA-=2*Math.PI;
        var X=sx(Po[0]),Y=sy(Po[1]);g+="<path d='M"+(X+R*Math.cos(a1))+","+(Y+R*Math.sin(a1))+" A"+R+","+R+" 0 0 "+(dA>0?1:0)+" "+(X+R*Math.cos(a2))+","+(Y+R*Math.sin(a2))+"' fill=none stroke='"+it.c+"' stroke-width=2 />";
        if(it.lb){var am=a1+dA/2;lab+="<text x="+(X+(R+12)*Math.cos(am))+" y="+(Y+(R+12)*Math.sin(am)+4)+" text-anchor=middle fill='"+it.c+"' font-size=12>"+E(it.lb)+"</text>"}}
    else if(it.k==="impl"){   /* marching squares */
      var NX=140,NY=Math.round(140*H/W),o2="",F=it.F,v=[];
      for(var i2=0;i2<=NX;i2++){v[i2]=[];for(var k=0;k<=NY;k++)v[i2][k]=F(X0+(X1-X0)*i2/NX,Y0+(Y1-Y0)*k/NY)}
      function ip(x1,y1,a1,x2,y2,a2){var t=a1/(a1-a2);return[x1+(x2-x1)*t,y1+(y2-y1)*t]}
      for(i2=0;i2<NX;i2++)for(k=0;k<NY;k++){
        var xa=X0+(X1-X0)*i2/NX,xb=X0+(X1-X0)*(i2+1)/NX,ya=Y0+(Y1-Y0)*k/NY,yb=Y0+(Y1-Y0)*(k+1)/NY,a0=v[i2][k],a1=v[i2+1][k],a2=v[i2+1][k+1],a3=v[i2][k+1],e=[];
        if(!isFinite(a0+a1+a2+a3))continue;
        if((a0>0)!==(a1>0))e.push(ip(xa,ya,a0,xb,ya,a1));if((a1>0)!==(a2>0))e.push(ip(xb,ya,a1,xb,yb,a2));
        if((a2>0)!==(a3>0))e.push(ip(xb,yb,a2,xa,yb,a3));if((a3>0)!==(a0>0))e.push(ip(xa,yb,a3,xa,ya,a0));
        for(var q=0;q+1<e.length;q+=2)o2+="M"+sx(e[q][0]).toFixed(1)+","+sy(e[q][1]).toFixed(1)+"L"+sx(e[q+1][0]).toFixed(1)+","+sy(e[q+1][1]).toFixed(1);
      }
      g+="<path d='"+o2+"' fill=none stroke='"+it.c+"' stroke-width=2.2 stroke-linecap=round />";
    }
    else if(it.k==="circle"){var c0=it.o||pt(it.on),r=it.r!=null?it.r:Math.hypot(pt(it.thru)[0]-c0[0],pt(it.thru)[1]-c0[1]);g+="<ellipse cx="+sx(c0[0])+" cy="+sy(c0[1])+" rx="+(r/(X1-X0)*(W-2*pad))+" ry="+(r/(Y1-Y0)*(H-2*pad))+" fill=none stroke='"+it.c+"' stroke-width=2 />"}
    else if(it.k==="seg"||it.k==="vec"){var A=pt(it.ns[0]),B=pt(it.ns[1]);g+="<line x1="+sx(A[0])+" y1="+sy(A[1])+" x2="+sx(B[0])+" y2="+sy(B[1])+" stroke='"+it.c+"' stroke-width=2.2"+(it.k==="vec"?" marker-end='url(#figA)'":"")+" />"}
    else if(it.k==="line"){var A2=pt(it.ns[0]),B2=pt(it.ns[1]),dx=B2[0]-A2[0],dy=B2[1]-A2[1],T=(X1-X0+Y1-Y0)*2;g+="<line x1="+sx(A2[0]-dx*T)+" y1="+sy(A2[1]-dy*T)+" x2="+sx(A2[0]+dx*T)+" y2="+sy(A2[1]+dy*T)+" stroke='"+it.c+"' stroke-width=2 />"}
    else if(it.k==="poly"){g+="<polygon points='"+it.ns.map(function(n){var p=pt(n);return sx(p[0])+","+sy(p[1])}).join(" ")+"' fill='"+it.c+"' fill-opacity=.08 stroke='"+it.c+"' stroke-width=2 />"}
    else if(it.k==="cpt"){g+="<line x1="+sx(0)+" y1="+sy(0)+" x2="+sx(it.p[0])+" y2="+sy(it.p[1])+" stroke='"+it.c+"' stroke-width=2.2 marker-end='url(#figA)'/><line x1="+sx(it.p[0])+" y1="+sy(it.p[1])+" x2="+sx(it.p[0])+" y2="+sy(0)+" stroke='"+it.c+"' stroke-dasharray='3 3'/><line x1="+sx(it.p[0])+" y1="+sy(it.p[1])+" x2="+sx(0)+" y2="+sy(it.p[1])+" stroke='"+it.c+"' stroke-dasharray='3 3'/>";label(it.p,it.n,it.c)}
    else if(it.k==="text")lab+="<text x="+sx(it.p[0])+" y="+sy(it.p[1])+" fill='"+it.c+"' font-size=12>"+E(it.n)+"</text>";
  }catch(e){errs.push(typeof e==="string"?e:"គូរមិនបាន")}});
  items.forEach(function(it){if(it.k==="pt"){g+="<circle cx="+sx(it.p[0])+" cy="+sy(it.p[1])+" r=3.6 fill='"+it.c+"'/>";label(it.p,it.n,it.c)}
    if(it.k==="hole"){g+="<circle cx="+sx(it.p[0])+" cy="+sy(it.p[1])+" r=4 fill=#fff stroke='"+it.c+"' stroke-width=2 />";label(it.p,it.n,it.c)}});
  return"<div class=fig>"+g+lab+"</svg>"+(errs.length?"<div class=fig-err>⚠️ "+errs.map(E).join(" · ")+"</div>":"")+"</div>";
}
var TPL=[
  ["បន្ទាត់ y=ax+b","y=2x-1\nA(0,-1)\nB(0.5,0)","អនុគមន៍"],
  ["ប៉ារ៉ាបូល (កំពូល · ឫស)","y=x^2-2x-3\nS(1,-4)\nA(-1,0)\nB(3,0)\ndash x=1","អនុគមន៍"],
  ["ពហុធាដឺក្រេ ៣","y=x^3-3x+1","អនុគមន៍"],
  ["អនុគមន៍សនិទាន + អាស៊ីមតូត","y=(2x+1)/(x-1)\nx=1\nasym y=2","អនុគមន៍"],
  ["អាស៊ីមតូតទ្រេត","y=(x^2+1)/x\nx=0\ndash y=x","អនុគមន៍"],
  ["តម្លៃដាច់ខាត","y=abs(x-1)-2","អនុគមន៍"],
  ["ឫសការេ","y=sqrt(x+2) [-2,8]\nA(-2,0)","អនុគមន៍"],
  ["អនុគមន៍ជាដុំៗ","y=x+1 [-4,1]\ny=-x+5 [1,5] red\nA(1,2)\nhole (1,4) red","អនុគមន៍"],
  ["ក្រាបពីរ + ចំណុចប្រសព្វ","y=x^2\ny=x+2 red\nA(-1,1)\nB(2,4)","អនុគមន៍"],
  ["e^x និង ln x (ឆ្លុះនឹង y=x)","y=exp(x)\ny=ln(x) red\ny=x gray","អិចស្ប៉ូណង់ស្យែល · លោការីត"],
  ["ការលូតលាស់/ការថយ","y=2^x\ny=(1/2)^x red\nA(0,1)","អិចស្ប៉ូណង់ស្យែល · លោការីត"],
  ["ln x និងអាស៊ីមតូត","y=ln(x)\nx=0\nA(1,0)\nB(2.718,1)","អិចស្ប៉ូណង់ស្យែល · លោការីត"],
  ["sin និង cos","y=sin(x)\ny=cos(x) red\nwindow x=-6.3..6.3 y=-1.6..1.6","ត្រីកោណមាត្រ"],
  ["tan និងអាស៊ីមតូត","y=tan(x)\nx=1.571\nx=-1.571\nwindow x=-4.7..4.7 y=-4..4","ត្រីកោណមាត្រ"],
  ["រង្វង់ត្រីកោណមាត្រ","circle O 1 gray\nM(0.71,0.71)\nvec O M\nA(1,0)\nangle A O M α\ndash x=0.71\nwindow x=-1.5..1.5 y=-1.5..1.5","ត្រីកោណមាត្រ"],
  ["ចំណុចចំហ (រន្ធ)","y=x+1\nhole (1,2)","លីមីត · ភាពជាប់"],
  ["លោតដាច់ (ឆ្វេង/ស្ដាំ)","y=x [-3,1]\ny=x+2 [1,4] red\nhole (1,1)\nA(1,3)","លីមីត · ភាពជាប់"],
  ["លីមីតនៅអនន្ត","y=1/x+1\nasym y=1\nx=0","លីមីត · ភាពជាប់"],
  ["បន្ទាត់ប៉ះ","y=x^3-3x\ntangent y=x^3-3x at 2 red","ដេរីវេ"],
  ["បន្ទាត់ប៉ះ + កែង","y=x^2\ntangent y=x^2 at 1 red\nnormal y=x^2 at 1 green\nwindow x=-3..4 y=-1..5","ដេរីវេ"],
  ["អតិបរមា · អប្បបរមា","y=x^3-3x\nM(-1,2)\nm(1,-2)\ndash y=2\ndash y=-2","ដេរីវេ"],
  ["ចំណុចរបត់","y=x^3-3x^2+2\nI(1,0)\ntangent y=x^3-3x^2+2 at 1 red","ដេរីវេ"],
  ["ផ្ទៃក្រោមខ្សែកោង","y=x^2\narea y=x^2 [0,2]","អាំងតេក្រាល"],
  ["ផ្ទៃរវាងខ្សែកោងពីរ","y=x\ny=x^2\narea y=x | y=x^2 [0,1]","អាំងតេក្រាល"],
  ["ផ្ទៃក្រោមអ័ក្ស (សញ្ញា −)","y=x^2-4\narea y=x^2-4 [-2,2] red","អាំងតេក្រាល"],
  ["ផ្ទៃ e^x","y=exp(x)\narea y=exp(x) [0,1]","អាំងតេក្រាល"],
  ["ស្វ៊ីត uₙ=1/n","dots y=1/x [1,10]\nasym y=0\nwindow x=0..11 y=-0.2..1.2","ស្វ៊ីត"],
  ["ស្វ៊ីតនព្វន្ត/ធរណីមាត្រ","dots y=2x+1 [0,6]\ndots y=2^x [0,4] red","ស្វ៊ីត"],
  ["រង្វង់ (x−a)²+(y−b)²=r²","(x-1)^2+(y-2)^2=4\nI(1,2)","កោនិក"],
  ["អេលីប (អ័ក្សធំ Ox)","x^2/9+y^2/4=1\nF1(-2.24,0)\nF2(2.24,0)","កោនិក"],
  ["អេលីប (អ័ក្សធំ Oy)","x^2/4+y^2/9=1\nF1(0,-2.24)\nF2(0,2.24)","កោនិក"],
  ["អ៊ីពែបូល + អាស៊ីមតូត","x^2/4-y^2=1\ndash y=x/2\ndash y=-x/2","កោនិក"],
  ["ប៉ារ៉ាបូល y²=4px","y^2=4x\nF(1,0)\nx=-1","កោនិក"],
  ["ប៉ារ៉ាបូល x²=4py","x^2=4y\nF(0,1)\nasym y=-1","កោនិក"],
  ["ចំណុចលើប្លង់","complex z1=2+i z2=-1+3i","ចំនួនកុំផ្លិច"],
  ["ផលបូក (ប្រលេឡូក្រាម)","complex z1=3+i z2=1+2i S=4+3i\nseg z1 S gray\nseg z2 S gray","ចំនួនកុំផ្លិច"],
  ["កុំផ្លិចឆ្លាស់","complex z=2+1.5i w=2-1.5i","ចំនួនកុំផ្លិច"],
  ["ម៉ូឌុល និងអាគុយម៉ង់","complex z=2+2i\nA(1,0)\nangle A O z θ\ncircle O 2.83 gray","ចំនួនកុំផ្លិច"],
  ["ឫសទី ៣ (ត្រីកោណសម័ង្ស)","complex w0=2 w1=-1+1.73i w2=-1-1.73i\ncircle O 2 gray\npoly w0 w1 w2","ចំនួនកុំផ្លិច"],
  ["ឫសទី ៤ (ការេ)","complex w0=1.41+1.41i w1=-1.41+1.41i w2=-1.41-1.41i w3=1.41-1.41i\ncircle O 2 gray\npoly w0 w1 w2 w3","ចំនួនកុំផ្លិច"],
  ["ត្រីកោណ + រង្វង់ចារឹកក្រៅ","A(0,0)\nB(4,0)\nC(1,3)\npoly A B C\ncircle (2,1) 2.24 gray","ធរណីមាត្រ"],
  ["ត្រីកោណកែង","A(0,0)\nB(4,0)\nC(0,3)\npoly A B C\nangle B A C 90°","ធរណីមាត្រ"],
  ["ប្រលេឡូក្រាម","A(0,0)\nB(4,0)\nC(5,2)\nD(1,2)\npoly A B C D\nseg A C gray\nseg B D gray","ធរណីមាត្រ"],
  ["រង្វង់ + បន្ទាត់ប៉ះ","circle O 2\nT(1.41,1.41)\nseg O T gray\nline T (2.83,0) red","ធរណីមាត្រ"],
  ["ចម្ងាយពីចំណុចទៅបន្ទាត់","y=x/2+1\nM(3,0)\nH(1.4,1.7)\nseg M H red\nangle M H (3,2.5)","ធរណីមាត្រ"],
  ["វ៉ិចទ័រ AB","A(1,1)\nB(4,3)\nvec A B red\nvec O A","វ៉ិចទ័រ"],
  ["ផលបូកវ៉ិចទ័រ","A(3,1)\nB(1,2)\nC(4,3)\nvec O A\nvec O B red\nvec O C green\nseg A C gray\nseg B C gray","វ៉ិចទ័រ"],
  ["វ៉ិចទ័រកែងគ្នា","A(2,1)\nB(-1,2)\nvec O A\nvec O B red\nangle A O B 90°","វ៉ិចទ័រ"]
];
window.FIG={svg:svg,parse:parse,TPL:TPL};
})();
