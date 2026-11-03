/* ========================================================================
   🧮 ហាត់លំហាត់ (practice.html) — សិស្សហាត់តាមមេរៀន · ៣ កម្រិត · ពិនិត្យចម្លើយភ្លាម · ពានរង្វាន់
   លំហាត់បង្កើតដោយកូដ (លេខចៃដន្យ) · គ្មាន Login · មិនប្រើ Firebase · វឌ្ឍនភាពរក្សាក្នុងឧបករណ៍សិស្ស (localStorage)
   ចម្លើយ៖ លេខ · ប្រភាគ · √ · π · e · i · កន្សោមនៃ x → ពិនិត្យតាមតម្លៃគណិតវិទ្យា (មិនមែនប្រៀបធៀបអក្សរ)
   ត្រូវការ KaTeX និង fig.js
   ======================================================================== */
(function(){
"use strict";
var $=function(id){return document.getElementById(id)};
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function kn(n){return String(n).replace(/\d/g,function(d){return"០១២៣៤៥៦៧៨៩"[d]})}

/* =================== កន្សោមគណិត៖ AST · គណនាជាចំនួនកុំផ្លិច · LaTeX =================== */
var FN={sqrt:1,ln:1,log:1,exp:1,sin:1,cos:1,tan:1,abs:1,arg:1};
function norm(s){
  return String(s||"").replace(/[០-៩]/g,function(c){return"០១២៣៤៥៦៧៨៩".indexOf(c)})
    .replace(/[×·]/g,"*").replace(/÷/g,"/").replace(/[−–]/g,"-").replace(/√/g,"sqrt").replace(/π/g,"pi")
    .replace(/²/g,"^2").replace(/³/g,"^3").replace(/∞/g,"inf").replace(/,/g,".").replace(/\s+/g,"").toLowerCase();
}
function parse(src){
  var s=norm(src),i=0;if(!s)throw"ទទេ";
  function atom(){
    var c=s[i];if(c==null)throw"មិនពេញលេញ";
    if(c==="("){i++;var e=expr();if(s[i]!==")")throw"ខ្វះ )";i++;return{t:"p",a:e}}
    var m=/^(\d+\.?\d*|\.\d+)/.exec(s.slice(i));if(m){i+=m[0].length;return{t:"n",v:+m[0],s:m[0]}}
    m=/^[a-z]+/.exec(s.slice(i));if(!m)throw"មិនស្គាល់ «"+c+"»";
    var w=m[0];
    for(var L=w.length;L>1;L--){var f=w.slice(0,L);if(FN[f]){i+=L;var a=pow();return{t:"f",f:f,a:a}}}
    if(w.slice(0,2)==="pi"){i+=2;return{t:"c",v:Math.PI,s:"\\pi"}}
    if(w.slice(0,3)==="inf"){i+=3;return{t:"c",v:Infinity,s:"\\infty"}}
    i++;c=w[0];
    if(c==="x")return{t:"x"};
    if(c==="i")return{t:"i"};
    if(c==="e")return{t:"c",v:Math.E,s:"e"};
    throw"មិនស្គាល់ «"+c+"»";
  }
  function pow(){var b=atom();if(s[i]==="^"){i++;var e=unary();return{t:"^",l:b,r:e}}return b}
  function unary(){if(s[i]==="-"){i++;return{t:"neg",a:unary()}}if(s[i]==="+"){i++;return unary()}return pow()}
  function term(){
    var a=unary();
    for(;;){var c=s[i];
      if(c==="*"||c==="/"){i++;a={t:c,l:a,r:unary()};continue}
      if(c!=null&&/[0-9a-z(.]/.test(c)){a={t:"im",l:a,r:pow()};continue}
      return a}
  }
  function expr(){var a=term();while(s[i]==="+"||s[i]==="-"){var c=s[i++];a={t:c,l:a,r:term()}}return a}
  var t=expr();if(i<s.length)throw"មិនស្គាល់ «"+s[i]+"»";
  return t;
}
/* ចំនួនកុំផ្លិច [re, im] */
function C(a,b){return[a,b||0]}
function cadd(a,b){return[a[0]+b[0],a[1]+b[1]]}function csub(a,b){return[a[0]-b[0],a[1]-b[1]]}
function cmul(a,b){return[a[0]*b[0]-a[1]*b[1],a[0]*b[1]+a[1]*b[0]]}
function cdiv(a,b){var d=b[0]*b[0]+b[1]*b[1];return[(a[0]*b[0]+a[1]*b[1])/d,(a[1]*b[0]-a[0]*b[1])/d]}
function cabs(a){return Math.hypot(a[0],a[1])}
function cexp(a){var r=Math.exp(a[0]);return[r*Math.cos(a[1]),r*Math.sin(a[1])]}
function clog(a){return[Math.log(cabs(a)),Math.atan2(a[1],a[0])]}
function cpow(a,b){
  if(!b[1]&&Number.isInteger(b[0])&&Math.abs(b[0])<=64){var r=[1,0],n=Math.abs(b[0]);for(var k=0;k<n;k++)r=cmul(r,a);return b[0]<0?cdiv([1,0],r):r}
  if(!a[1]&&!b[1]&&a[0]>=0)return[Math.pow(a[0],b[0]),0];
  if(!a[0]&&!a[1])return[0,0];
  return cexp(cmul(b,clog(a)));
}
function real(a,f){if(Math.abs(a[1])>1e-12)return[NaN,NaN];return[f(a[0]),0]}
function ev(t,x){
  switch(t.t){
    case"n":return[t.v,0];case"c":return[t.v,0];case"x":if(x==null)throw"x";return[x,0];case"i":return[0,1];
    case"p":return ev(t.a,x);case"neg":var a=ev(t.a,x);return[-a[0],-a[1]];
    case"+":return cadd(ev(t.l,x),ev(t.r,x));case"-":return csub(ev(t.l,x),ev(t.r,x));
    case"*":case"im":return cmul(ev(t.l,x),ev(t.r,x));case"/":return cdiv(ev(t.l,x),ev(t.r,x));
    case"^":return cpow(ev(t.l,x),ev(t.r,x));
    case"f":var v=ev(t.a,x);
      switch(t.f){
        case"sqrt":return v[1]||v[0]<0?cpow(v,[.5,0]):[Math.sqrt(v[0]),0];
        case"ln":return v[1]||v[0]<=0?(v[0]<=0&&!v[1]?[NaN,NaN]:clog(v)):[Math.log(v[0]),0];
        case"log":return real(v,function(u){return Math.log(u)/Math.LN10});
        case"exp":return cexp(v);case"abs":return[cabs(v),0];case"arg":return[Math.atan2(v[1],v[0]),0];
        case"sin":return real(v,Math.sin);case"cos":return real(v,Math.cos);case"tan":return real(v,Math.tan);
      }
  }
  throw"?";
}
function hasX(t){if(!t||typeof t!=="object")return false;if(t.t==="x")return true;return hasX(t.a)||hasX(t.l)||hasX(t.r)}
/* LaTeX ពី AST (សម្រាប់មើលជាមុនពេលវាយ) */
function tex(t){
  switch(t.t){
    case"n":return t.s;case"c":return t.s;case"x":return"x";case"i":return"i";
    case"p":return"\\left("+tex(t.a)+"\\right)";case"neg":return"-"+tex(t.a);
    case"+":return tex(t.l)+"+"+tex(t.r);case"-":return tex(t.l)+"-"+tex(t.r);
    case"*":return tex(t.l)+(t.r.t==="n"||t.r.t==="neg"?"\\times ":"\\cdot ")+tex(t.r);
    case"im":return tex(t.l)+(t.l.t==="n"&&t.r.t==="n"?"\\times ":" ")+tex(t.r);
    case"/":return"\\frac{"+tex(t.l.t==="p"?t.l.a:t.l)+"}{"+tex(t.r.t==="p"?t.r.a:t.r)+"}";
    case"^":return(t.l.t==="n"||t.l.t==="x"||t.l.t==="c"||t.l.t==="i"||t.l.t==="p"?tex(t.l):"{"+tex(t.l)+"}")+"^{"+tex(t.r.t==="p"?t.r.a:t.r)+"}";
    case"f":var a=t.a.t==="p"?t.a.a:t.a;
      if(t.f==="sqrt")return"\\sqrt{"+tex(a)+"}";if(t.f==="abs")return"\\left|"+tex(a)+"\\right|";if(t.f==="exp")return"e^{"+tex(a)+"}";
      return"\\"+(t.f==="arg"?"arg":t.f)+(t.a.t==="p"?tex(t.a):"\\,"+tex(a));
  }
  return"?";
}
var XS=[0.31,0.77,1.43,2.19,-0.53,-1.27,3.1];
function close(a,b){if(!isFinite(a[0])||!isFinite(b[0]))return a[0]===b[0]&&isFinite(a[1])===isFinite(b[1]);var d=Math.hypot(a[0]-b[0],a[1]-b[1]),s=Math.max(1,cabs(b));return d<=1e-6*s}
/* ពិនិត្យចម្លើយ៖ k = num (ចំនួន) · expr (កន្សោម x) · anti (ព្រីមីទីវ · ខុសគ្នាដោយចំនួនថេរបាន) */
function check(user,ans,k){
  var u,a;try{u=parse(user)}catch(e){return{ok:false,err:typeof e==="string"?e:"មិនត្រឹមត្រូវ"}}
  a=parse(ans);
  try{
    if(k==="num"){
      if(hasX(u))return{ok:false,err:"ចម្លើយមិនត្រូវមាន x"};
      var eu=ev(u),ea=ev(a);if(close(eu,ea))return{ok:true};
      /* ទសភាគដែលបង្គត់ត្រឹមត្រូវ (យ៉ាងតិច ២ ខ្ទង់) ឧ. 0.33 សម្រាប់ 1/3 · 1.41 សម្រាប់ √2 */
      var m=/^-?\d+\.(\d{2,})$/.exec(norm(user));
      if(m&&Math.abs(ea[1])<1e-12&&Math.abs(eu[0]-ea[0])<=0.5*Math.pow(10,-m[1].length)+1e-12)return{ok:true,approx:true};
      return{ok:false};
    }
    var n=0,x0=0.5;
    for(var j=0;j<XS.length;j++){
      var x=XS[j],ea,eu;
      try{ea=ev(a,x);if(k==="anti")ea=csub(ea,ev(a,x0))}catch(e){continue}
      if(!isFinite(ea[0])||!isFinite(ea[1]))continue;
      eu=ev(u,x);if(k==="anti")eu=csub(eu,ev(u,x0));
      if(!close(eu,ea))return{ok:false};n++;
    }
    return{ok:n>=3};
  }catch(e){return{ok:false,err:"មិនត្រឹមត្រូវ"}}
}

/* =================== ជំនួយសម្រាប់បង្កើតលំហាត់ =================== */
function ri(a,b){return a+Math.floor(Math.random()*(b-a+1))}
function nz(a,b){var v;do{v=ri(a,b)}while(!v);return v}
function pick(a){return a[Math.floor(Math.random()*a.length)]}
function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=b;b=a%b;a=t}return a||1}
function fr(n,d){if(d<0){n=-n;d=-d}var g=gcd(n,d);n/=g;d/=g;return{n:n,d:d,s:d===1?String(n):n+"/"+d,t:d===1?String(n):(n<0?"-":"")+"\\frac{"+Math.abs(n)+"}{"+d+"}"}}
function sg(v,first){return v<0?"-"+Math.abs(v):first?String(v):"+"+v}           /* សញ្ញា */
function co(v,s,first){if(!v)return"";var a=Math.abs(v);return(v<0?"-":first?"":"+")+(a===1&&s?"":a)+s}   /* មេគុណ​ ax */
function poly(c){var o="",n=c.length-1;c.forEach(function(v,i){var p=n-i;if(!v)return;o+=co(v,p?(p>1?"x^"+p:"x"):"",!o)||(!p?sg(v,!o):"")});return o||"0"}
function polyT(c){return poly(c).replace(/\^(\d+)/g,"^{$1}")}
function cx(a,b){if(!b)return String(a);var im=(Math.abs(b)===1?"":Math.abs(b))+"i";return a?a+(b<0?"-":"+")+im:(b<0?"-":"")+im}
function cxf(re,im){   /* re, im ជាប្រភាគ {n,d} */
  var r=re.n?re.s:"",ia=Math.abs(im.n),ip=im.n?((ia===1&&im.d===1?"":(im.d===1?ia:"("+ia+"/"+im.d+")"))+"i"):"";
  if(!ip)return re.s;return r?r+(im.n<0?"-":"+")+ip:(im.n<0?"-":"")+ip;
}
function cxT(re,im){var r=re.n?re.t:"",ia=fr(Math.abs(im.n),im.d),ip=im.n?((ia.s==="1"?"":ia.t)+"i"):"";if(!ip)return re.t;return r?r+(im.n<0?"-":"+")+ip:(im.n<0?"-":"")+ip}
/* លំហាត់មួយ៖ {q:សំណួរ(LaTeX), fig, a:[{l:ស្លាក, k, v:ចម្លើយ, t:LaTeX ចម្លើយ}], s:ដំណោះស្រាយ, mc:[ជម្រើស]} */
function Q(q,a,s,fig){return{q:q,a:a,s:s||"",fig:fig||""}}
function A(v,t,k,l){return{v:String(v),t:t==null?String(v):t,k:k||"num",l:l||""}}

/* =================== លំហាត់តាមមេរៀន (ថ្នាក់ទី១២) =================== */
var ANG0=[["pi/6","\\frac{\\pi}{6}",Math.PI/6],["pi/4","\\frac{\\pi}{4}",Math.PI/4],["pi/3","\\frac{\\pi}{3}",Math.PI/3],["pi/2","\\frac{\\pi}{2}",Math.PI/2],["2pi/3","\\frac{2\\pi}{3}",2*Math.PI/3],["3pi/4","\\frac{3\\pi}{4}",3*Math.PI/4],["5pi/6","\\frac{5\\pi}{6}",5*Math.PI/6]];
var G={};
/* ---- ១. ចំនួនកុំផ្លិច ---- */
G[11]={1:function(){
    var a=nz(-6,6),b=nz(-6,6),c=nz(-6,6),d=nz(-6,6),t=pick(["+","-","*"]),r=t==="+"?[a+c,b+d]:t==="-"?[a-c,b-d]:[a*c-b*d,a*d+b*c];
    return Q("គណនា $("+cx(a,b)+")"+(t==="*"?"(":t+"(")+cx(c,d)+")$",[A(cx(r[0],r[1]),null,"num","z =")],
      t==="*"?"$("+cx(a,b)+")("+cx(c,d)+")="+(a*c)+sg(a*d,0)+"i"+sg(b*c,0)+"i"+sg(b*d,0)+"i^2$ ដោយ $i^2=-1$ ⇒ $"+cx(r[0],r[1])+"$":"បូក/ដក ផ្នែកពិតជាមួយផ្នែកពិត និងផ្នែកនិម្មិតជាមួយផ្នែកនិម្មិត ⇒ $"+cx(r[0],r[1])+"$");
  },2:function(){
    if(Math.random()<.5){var T=pick([[3,4,5],[6,8,10],[5,12,13],[8,6,10]]),sa=pick([1,-1]),sb=pick([1,-1]),a=sa*T[0],b=sb*T[1];
      return Q("ចំណុច $M$ ក្នុងប្លង់កុំផ្លិចតំណាងឱ្យ $z$ ។ រក $z$ និងម៉ូឌុល $|z|$",[A(cx(a,b),null,"num","z ="),A(T[2],null,"num","|z| =")],
        "$z="+cx(a,b)+"$ · $|z|=\\sqrt{"+(a*a)+"+"+(b*b)+"}="+T[2]+"$","complex M="+a+(b<0?"":"+")+b+"i\nwindow x="+(Math.min(0,a)-1)+".."+(Math.max(0,a)+1)+" y="+(Math.min(0,b)-1)+".."+(Math.max(0,b)+1))}
    var a=nz(-5,5),b=nz(-5,5),c=nz(-4,4),d=nz(-4,4),den=c*c+d*d,re=fr(a*c+b*d,den),im=fr(b*c-a*d,den);
    return Q("សរសេរ $\\dfrac{"+cx(a,b)+"}{"+cx(c,d)+"}$ ជាទម្រង់ $a+bi$",[A(cxf(re,im),cxT(re,im),"num","z =")],
      "គុណភាគយក និងភាគបែងនឹងកុំផ្លិចឆ្លាស់ $"+cx(c,-d)+"$ ⇒ $\\dfrac{("+cx(a,b)+")("+cx(c,-d)+")}{"+den+"}="+cxT(re,im)+"$");
  },3:function(){
    if(Math.random()<.5){var p=nz(-4,4),q=ri(1,5),A0=-2*p,B0=p*p+q*q;   /* z² + A0 z + B0 = 0 → z = p ± qi */
      return Q("ដោះស្រាយ $z^2"+co(A0,"z")+sg(B0,0)+"=0$ ក្នុង $\\mathbb{C}$ ។ សរសេរឫសដែលមានផ្នែកនិម្មិតវិជ្ជមាន",[A(cx(p,q),null,"num","z₁ =")],
        "$\\Delta="+(A0*A0)+"-"+(4*B0)+"="+(-4*q*q)+"=(2"+(q>1?q:"")+"i)^2$ ⇒ $z=\\dfrac{"+(-A0)+"\\pm "+(2*q)+"i}{2}="+cx(p,q)+"$ ឬ $"+cx(p,-q)+"$","complex z1="+p+"+"+q+"i z2="+p+"-"+q+"i")}
    var P=pick([["2","pi/6","\\frac{\\pi}{6}","\\sqrt3+i"],["2","pi/3","\\frac{\\pi}{3}","1+\\sqrt3\\,i"],["2","2pi/3","\\frac{2\\pi}{3}","-1+\\sqrt3\\,i"],["2","5pi/6","\\frac{5\\pi}{6}","-\\sqrt3+i"],
      ["sqrt(2)","pi/4","\\frac{\\pi}{4}","1+i"],["sqrt(2)","3pi/4","\\frac{3\\pi}{4}","-1+i"],["4","pi/3","\\frac{\\pi}{3}","2+2\\sqrt3\\,i"],["4","pi/6","\\frac{\\pi}{6}","2\\sqrt3+2i"],["3","pi/2","\\frac{\\pi}{2}","3i"],["2","pi/4","\\frac{\\pi}{4}","\\sqrt2+\\sqrt2\\,i"]]);
    var r=ev(parse(P[0]))[0],th=ev(parse(P[1]))[0],c=r*Math.cos(th),sn=r*Math.sin(th),rt=P[0]==="sqrt(2)"?"\\sqrt2":P[0];
    return Q("គេឱ្យ $z="+P[3]+"$ ។ រកម៉ូឌុល $r=|z|$ និងអាគុយម៉ង់ $\\theta$ (រ៉ាដ្យង់ ក្នុង $(0;\\pi]$)",[A(P[0],rt,"num","r ="),A(P[1],P[2],"num","θ =")],
      "$r=|z|="+rt+"$ · $\\cos\\theta=\\frac{"+(+c.toFixed(3))+"}{"+rt+"}$ និង $\\sin\\theta>0$ ⇒ $\\theta="+P[2]+"$","complex z="+c.toFixed(2)+(sn<0?"":"+")+sn.toFixed(2)+"i\ncircle O "+r.toFixed(3)+" gray\nA(1,0)\nangle A O z θ");
  }};
/* ---- ២. លីមីត ---- */
G[22]={1:function(){var a=nz(-3,3),c=[nz(-3,3),ri(-5,5),ri(-6,6)],v=c[0]*a*a+c[1]*a+c[2];
    return Q("គណនា $\\displaystyle\\lim_{x\\to "+a+"}\\left("+polyT(c)+"\\right)$",[A(v)],"អនុគមន៍ពហុធាជាប់ ⇒ ជំនួស $x="+a+"$ ⇒ $"+v+"$")},
  2:function(){if(Math.random()<.5){var a=nz(-5,5),b=nz(-4,4);
      return Q("គណនា $\\displaystyle\\lim_{x\\to "+a+"}\\frac{x^2"+co(b-a,"x")+sg(-a*b,0)+"}{x"+sg(-a,0)+"}$",[A(a+b)],"ទម្រង់ $\\frac00$ ⇒ $x^2"+co(b-a,"x")+sg(-a*b,0)+"=(x"+sg(-a,0)+")(x"+sg(b,0)+")$ ⇒ លីមីត $="+a+sg(b,0)+"="+(a+b)+"$")}
    var p=nz(-6,6),q=nz(1,6),r=ri(-5,5),s=ri(-5,5),f=fr(p,q);
    return Q("គណនា $\\displaystyle\\lim_{x\\to +\\infty}\\frac{"+polyT([p,r,1])+"}{"+polyT([q,s,-2])+"}$",[A(f.s,f.t)],"ដឺក្រេស្មើគ្នា ⇒ ផលធៀបមេគុណតួធំបំផុត $=\\frac{"+p+"}{"+q+"}="+f.t+"$")},
  3:function(){var t=ri(0,2);
    if(t===0){var k=nz(2,7);return Q("គណនា $\\displaystyle\\lim_{x\\to 0}\\frac{\\sin "+k+"x}{x}$",[A(k)],"$\\frac{\\sin "+k+"x}{x}="+k+"\\cdot\\frac{\\sin "+k+"x}{"+k+"x}\\to "+k+"$")}
    if(t===1){var c=ri(1,5),f=fr(1,2*c);return Q("គណនា $\\displaystyle\\lim_{x\\to 0}\\frac{\\sqrt{x+"+(c*c)+"}-"+c+"}{x}$",[A(f.s,f.t)],"គុណនឹងកន្សោមឆ្លាស់ $\\sqrt{x+"+(c*c)+"}+"+c+"$ ⇒ $\\frac{1}{\\sqrt{x+"+(c*c)+"}+"+c+"}\\to"+f.t+"$")}
    var k=nz(2,5);return Q("គណនា $\\displaystyle\\lim_{x\\to 0}\\frac{e^{"+k+"x}-1}{x}$",[A(k)],"$\\lim_{u\\to0}\\frac{e^u-1}{u}=1$ ⇒ លីមីត $="+k+"$")}};
/* ---- ៣. ភាពជាប់ ---- */
G[23]={1:function(){var x0=nz(-3,3),m=nz(-3,3),b=ri(-4,4),y0=m*x0+b,c=nz(-3,3),a=y0-c*x0;
    return Q("រកចំនួន $a$ ដើម្បីឱ្យ $f(x)=\\begin{cases}"+co(c,"x",true)+"+a & x<"+x0+"\\\\ "+poly([m,b])+" & x\\ge "+x0+"\\end{cases}$ ជាប់ត្រង់ $x="+x0+"$",[A(a,null,"num","a =")],
      "លីមីតឆ្វេង $="+(c*x0)+"+a$ · តម្លៃ $f("+x0+")="+y0+"$ ⇒ $a="+a+"$")},
  2:function(){var a=nz(-3,3),b=nz(-3,3),v=a+b;
    return Q("អានពីក្រាប៖ គណនា $\\displaystyle\\lim_{x\\to "+a+"}f(x)$ ដែល $f(x)=\\frac{(x"+sg(-a,0)+")(x"+sg(b,0)+")}{x"+sg(-a,0)+"}$",[A(v)],"ក្រាបជាបន្ទាត់ $y=x"+sg(b,0)+"$ មានរន្ធត្រង់ $x="+a+"$ ⇒ លីមីត $="+v+"$","y=x"+(b<0?b:"+"+b)+"\nhole ("+a+","+v+")")},
  3:function(){var a=nz(-4,4);
    return Q("រក $k$ ដើម្បីឱ្យ $f(x)=\\begin{cases}\\dfrac{x^2-"+(a*a)+"}{x"+sg(-a,0)+"} & x\\ne "+a+"\\\\ k & x="+a+"\\end{cases}$ ជាប់ត្រង់ $x="+a+"$",[A(2*a,null,"num","k =")],"$\\frac{x^2-"+(a*a)+"}{x"+sg(-a,0)+"}=x"+sg(a,0)+"\\to"+(2*a)+"$ ⇒ $k="+(2*a)+"$")}};
/* ---- ១០. វ៉ិចទ័រក្នុងលំហ ---- */
function v3(v){return"("+v.join(";")+")"}
G[101]={1:function(){var u=[ri(-4,4),ri(-4,4),ri(-4,4)],v=[ri(-4,4),ri(-4,4),ri(-4,4)],d=u[0]*v[0]+u[1]*v[1]+u[2]*v[2];
    return Q("គេឱ្យ $\\vec u"+v3(u)+"$ និង $\\vec v"+v3(v)+"$ ។ គណនា $\\vec u\\cdot\\vec v$",[A(d)],"$\\vec u\\cdot\\vec v="+u[0]+"\\cdot"+sgp(v[0])+"+"+u[1]+"\\cdot"+sgp(v[1])+"+"+u[2]+"\\cdot"+sgp(v[2])+"="+d+"$")},
  2:function(){var T=pick([[1,2,2,3],[2,3,6,7],[1,4,8,9],[2,6,9,11],[4,4,7,9]]),s=[pick([1,-1]),pick([1,-1]),pick([1,-1])],u=[T[0]*s[0],T[1]*s[1],T[2]*s[2]],v=[ri(-3,3),ri(-3,3),ri(-3,3)],w=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]];
    return Q("គេឱ្យ $\\vec u"+v3(u)+"$ និង $\\vec v"+v3(v)+"$ ។ គណនា $|\\vec u|$ និង $\\vec u\\times\\vec v$",[A(T[3],null,"num","|u| ="),A(w[0],null,"num","x ="),A(w[1],null,"num","y ="),A(w[2],null,"num","z =")],
      "$|\\vec u|=\\sqrt{"+u.map(function(x){return x*x}).join("+")+"}="+T[3]+"$ · $\\vec u\\times\\vec v="+v3(w)+"$")},
  3:function(){var u=[nz(-3,3),nz(-3,3),nz(-3,3)],a=nz(-3,3),c=nz(-3,3),num=-(u[0]*a+u[2]*c);if(num%u[1]){u[1]=u[1]>0?1:-1;num=-(u[0]*a+u[2]*c)}var m=fr(num,u[1]);
    return Q("រក $m$ ដើម្បីឱ្យ $\\vec u"+v3(u)+"$ កែងនឹង $\\vec v("+a+";m;"+c+")$",[A(m.s,m.t,"num","m =")],"$\\vec u\\perp\\vec v\\iff\\vec u\\cdot\\vec v=0\\iff "+(u[0]*a)+sg(u[1],0)+"m"+sg(u[2]*c,0)+"=0$ ⇒ $m="+m.t+"$")}};
function sgp(v){return v<0?"("+v+")":String(v)}
/* ---- ១០.២ អនុវត្តវ៉ិចទ័រ ---- */
G[102]={1:function(){var n=[nz(-3,3),nz(-3,3),nz(-3,3)],P=[ri(-3,3),ri(-3,3),ri(-3,3)],d=-(n[0]*P[0]+n[1]*P[1]+n[2]*P[2]);
    return Q("សមីការប្លង់ $(P)$ កាត់តាម $A"+v3(P)+"$ មានវ៉ិចទ័រណរម៉ាល់ $\\vec n"+v3(n)+"$ សរសេរជា $"+co(n[0],"x",true)+co(n[1],"y")+co(n[2],"z")+"+d=0$ ។ រក $d$",[A(d,null,"num","d =")],"ជំនួស $A$ ៖ $"+(n[0]*P[0])+sg(n[1]*P[1],0)+sg(n[2]*P[2],0)+"+d=0$ ⇒ $d="+d+"$")},
  2:function(){var T=pick([[1,2,2,3],[2,3,6,7],[2,1,2,3],[1,4,8,9]]),M=[ri(-3,3),ri(-3,3),ri(-3,3)],d=ri(-6,6),num=Math.abs(T[0]*M[0]+T[1]*M[1]+T[2]*M[2]+d),f=fr(num,T[3]);
    return Q("គណនាចម្ងាយពី $M"+v3(M)+"$ ទៅប្លង់ $(P):\\ "+co(T[0],"x",true)+co(T[1],"y")+co(T[2],"z")+sg(d,0)+"=0$",[A(f.s,f.t)],"$d=\\dfrac{|"+(T[0]*M[0])+sg(T[1]*M[1],0)+sg(T[2]*M[2],0)+sg(d,0)+"|}{\\sqrt{"+(T[0]*T[0])+"+"+(T[1]*T[1])+"+"+(T[2]*T[2])+"}}="+f.t+"$")},
  3:function(){var a=ri(1,4),b=ri(1,4),c=ri(1,4),S2=a*a*b*b+b*b*c*c+a*a*c*c;
    return Q("គេឱ្យ $A("+a+";0;0)$, $B(0;"+b+";0)$, $C(0;0;"+c+")$ ។ គណនាផ្ទៃក្រឡាត្រីកោណ $ABC$",[A("sqrt("+S2+")/2","\\frac{\\sqrt{"+S2+"}}{2}")],
      "$\\vec{AB}\\times\\vec{AC}=("+(b*c)+";"+(a*c)+";"+(a*b)+")$ ⇒ $S=\\frac12|\\vec{AB}\\times\\vec{AC}|=\\frac{\\sqrt{"+S2+"}}{2}$")}};
/* ---- ៣. ដេរីវេ ---- */
G[31]={1:function(){var n=ri(2,5),a=nz(-5,5),b=ri(-6,6),c=ri(-6,6),f=co(a,"x^"+n,true)+co(b,"x")+(c?sg(c,0):""),d=co(a*n,n-1>1?"x^"+(n-1):"x",true)+(b?sg(b,0):"");
    return Q("គណនាដេរីវេ $f'(x)$ នៃ $f(x)="+f.replace(/\^(\d)/g,"^{$1}")+"$",[A(d,d.replace(/\^(\d)/g,"^{$1}"),"expr","f'(x) =")],"$(x^n)'=nx^{n-1}$ ⇒ $f'(x)="+d.replace(/\^(\d)/g,"^{$1}")+"$")},
  2:function(){var t=ri(0,2);
    if(t===0){var a=nz(-4,4),b=ri(-5,5),c=nz(-4,4),d=ri(-5,5);var e=[2*a*c,a*d+b*c];
      return Q("គណនា $f'(x)$ នៃ $f(x)=("+poly([a,b])+")("+poly([c,d])+")$",[A(poly(e),polyT(e),"expr","f'(x) =")],"$(uv)'=u'v+uv'="+a+"("+poly([c,d])+")+"+c+"("+poly([a,b])+")="+polyT(e)+"$")}
    if(t===1){var k=nz(2,6),f=pick(["sin","cos"]);
      return Q("គណនា $f'(x)$ នៃ $f(x)=\\"+f+" "+k+"x$",[A((f==="sin"?"":"-")+k+(f==="sin"?"cos":"sin")+"("+k+"x)",(f==="sin"?"":"-")+k+"\\"+(f==="sin"?"cos":"sin")+" "+k+"x","expr","f'(x) =")],"$(\\sin u)'=u'\\cos u$ · $(\\cos u)'=-u'\\sin u$")}
    var a=nz(-3,3),b=ri(-4,4),c=nz(-3,3),d=ri(-4,4);if(a*d-b*c===0)d+=1;var x0=ri(-2,2);while(c*x0+d===0)x0++;var v=fr(a*d-b*c,(c*x0+d)*(c*x0+d));
    return Q("គណនា $f'("+x0+")$ នៃ $f(x)=\\dfrac{"+poly([a,b])+"}{"+poly([c,d])+"}$",[A(v.s,v.t)],"$f'(x)=\\dfrac{"+(a*d-b*c)+"}{("+poly([c,d])+")^2}$ ⇒ $f'("+x0+")="+v.t+"$")},
  3:function(){var t=ri(0,3),a=nz(-4,4),b=nz(-5,5),n=ri(2,5);
    if(t===0)return Q("គណនា $f'(x)$ នៃ $f(x)=("+poly([a,b])+")^{"+n+"}$",[A((n*a)+"("+poly([a,b])+")^"+(n-1),(n*a)+"("+poly([a,b])+")^{"+(n-1)+"}","expr","f'(x) =")],"$(u^n)'=nu'u^{n-1}$");
    if(t===1)return Q("គណនា $f'(x)$ នៃ $f(x)=e^{"+co(a,"x",true)+sg(b,0)+"}$",[A(a+"e^("+poly([a,b])+")",a+"e^{"+polyT([a,b])+"}","expr","f'(x) =")],"$(e^u)'=u'e^u$");
    if(t===2){a=Math.abs(a);return Q("គណនា $f'(x)$ នៃ $f(x)=\\ln("+poly([a,b])+")$",[A(a+"/("+poly([a,b])+")","\\frac{"+a+"}{"+poly([a,b])+"}","expr","f'(x) =")],"$(\\ln u)'=\\frac{u'}{u}$")}
    a=Math.abs(a);return Q("គណនា $f'(x)$ នៃ $f(x)=\\sqrt{"+poly([a,Math.abs(b)])+"}$",[A(a+"/(2sqrt("+poly([a,Math.abs(b)])+"))","\\frac{"+a+"}{2\\sqrt{"+poly([a,Math.abs(b)])+"}}","expr","f'(x) =")],"$(\\sqrt u)'=\\frac{u'}{2\\sqrt u}$")}};
/* ---- ៣.២ អនុវត្តដេរីវេ ---- */
G[32]={1:function(){var a=nz(-2,2),b=ri(-4,4),c=ri(-3,3),x0=ri(-2,2),y0=a*x0*x0+b*x0+c,m=2*a*x0+b,p=y0-m*x0,f=poly([a,b,c]);
    return Q("សរសេរសមីការបន្ទាត់ប៉ះនឹងក្រាប $y="+polyT([a,b,c])+"$ ត្រង់ $x="+x0+"$ ជាទម្រង់ $y=mx+p$",[A(m,null,"num","m ="),A(p,null,"num","p =")],
      "$y'="+poly([2*a,b])+"$ ⇒ $m=y'("+x0+")="+m+"$ · $y_0="+y0+"$ ⇒ $y="+poly([m,p])+"$","y="+f+"\ntangent y="+f+" at "+x0+" red")},
  2:function(){var a=ri(1,3),k=3*a*a;
    return Q("អនុគមន៍ $f(x)=x^3-"+k+"x$ ។ រកអាប់ស៊ីសនៃចំណុចអតិបរមាធៀប និងតម្លៃអតិបរមា",[A(-a,null,"num","x ="),A(2*a*a*a,null,"num","f(x) =")],
      "$f'(x)=3x^2-"+k+"=0\\iff x=\\pm"+a+"$ · $f'$ ប្ដូរសញ្ញាពី $+$ ទៅ $-$ ត្រង់ $x=-"+a+"$ ⇒ អតិបរមា $f(-"+a+")="+(2*a*a*a)+"$","y=x^3-"+k+"x\nM(-"+a+","+(2*a*a*a)+")\nm("+a+",-"+(2*a*a*a)+")")},
  3:function(){var P=ri(3,10)*2,h=P/2;   /* ចតុកោណកែង បរិមាត្រ P → ផ្ទៃធំបំផុតពេលជាការេ */
    return Q("ចតុកោណកែងមួយមានបរិមាត្រ $"+P+"$ ។ រកផ្ទៃក្រឡាធំបំផុត",[A((h/2)*(h/2))],"បណ្ដោយ $x$ ទទឹង $"+h+"-x$ ⇒ $S=x("+h+"-x)$ · $S'="+h+"-2x=0\\iff x="+(h/2)+"$ ⇒ $S_{max}="+((h/2)*(h/2))+"$","y=x*("+h+"-x) [0,"+h+"]\nM("+(h/2)+","+((h/2)*(h/2))+")")}};
/* ---- ៤. អនុគមន៍សនិទាន ---- */
G[41]={1:function(){var a=nz(-4,4),b=ri(-5,5),c=nz(1,3),d=nz(-5,5);if(a*d===b*c)b++;var va=fr(-d,c),ha=fr(a,c);
    return Q("រកសមីការអាស៊ីមតូតឈរ $x=\\dots$ និងអាស៊ីមតូតដេក $y=\\dots$ នៃ $y=\\dfrac{"+poly([a,b])+"}{"+poly([c,d])+"}$",[A(va.s,va.t,"num","x ="),A(ha.s,ha.t,"num","y =")],
      "ភាគបែង $=0\\iff x="+va.t+"$ · $\\lim_{x\\to\\infty}y=\\frac{"+a+"}{"+c+"}="+ha.t+"$","y=("+poly([a,b])+")/("+poly([c,d])+")\nx="+(-d/c)+"\nasym y="+(a/c))},
  2:function(){var b=ri(-4,4),c=ri(-4,4),d=nz(-3,3);   /* (x²+bx+c)/(x+d) = x+(b-d) + … */
    return Q("រកអាស៊ីមតូតទ្រេត $y=mx+p$ នៃ $y=\\dfrac{"+polyT([1,b,c])+"}{x"+sg(d,0)+"}$",[A(1,null,"num","m ="),A(b-d,null,"num","p =")],"ចែកពហុធា៖ $\\dfrac{"+polyT([1,b,c])+"}{x"+sg(d,0)+"}=x"+sg(b-d,0)+"+\\dfrac{"+(c-d*(b-d))+"}{x"+sg(d,0)+"}$","y=("+poly([1,b,c])+")/(x"+sg(d,0)+")\nx="+(-d)+"\ndash y=x"+sg(b-d,0))},
  3:function(){var a=nz(-3,3),b=nz(-6,6),c=1,d=nz(-4,4);if(a*d===b*c)b++;var x0=fr(-b,a),y0=fr(b,d);
    return Q("ក្រាប $y=\\dfrac{"+poly([a,b])+"}{x"+sg(d,0)+"}$ កាត់អ័ក្ស $Ox$ ត្រង់ $x=\\dots$ និងកាត់ $Oy$ ត្រង់ $y=\\dots$",[A(x0.s,x0.t,"num","x ="),A(y0.s,y0.t,"num","y =")],"$y=0\\iff "+poly([a,b])+"=0\\iff x="+x0.t+"$ · $x=0\\Rightarrow y="+y0.t+"$","y=("+poly([a,b])+")/(x"+sg(d,0)+")\nx="+(-d)+"\nasym y="+a)}};
/* ---- ៤.២ អិចស្ប៉ូណង់ស្យែល ---- */
G[42]={1:function(){var b=pick([2,3,5]),n=ri(2,5),v=Math.pow(b,n);
    return Q("ដោះស្រាយសមីការ $"+b+"^x="+v+"$",[A(n,null,"num","x =")],"$"+v+"="+b+"^{"+n+"}$ ⇒ $x="+n+"$")},
  2:function(){var a=nz(2,4),b=nz(-6,6),c=ri(1,5);
    return Q("ដោះស្រាយ $e^{"+a+"x"+sg(b,0)+"}=e^{"+c+"}$",[A(fr(c-b,a).s,fr(c-b,a).t,"num","x =")],"$"+a+"x"+sg(b,0)+"="+c+"$ ⇒ $x="+fr(c-b,a).t+"$")},
  3:function(){var p=ri(2,5),q=ri(1,p-1);   /* (eˣ-p)(eˣ-q)=0 */
    return Q("ដោះស្រាយ $e^{2x}-"+(p+q)+"e^x+"+(p*q)+"=0$ (សរសេរឫសតូចជាមុន)",[A("ln("+q+")","\\ln "+q,"num","x₁ ="),A("ln("+p+")","\\ln "+p,"num","x₂ =")],
      "តាង $t=e^x>0$ ៖ $t^2-"+(p+q)+"t+"+(p*q)+"=0\\iff t="+q+"$ ឬ $t="+p+"$ ⇒ $x=\\ln "+q+"$ ឬ $x=\\ln "+p+"$","y=exp(2x)-"+(p+q)+"exp(x)+"+(p*q)+"\nwindow x=-2..2.5 y=-3..6")}};
/* ---- ៤.៣ លោការីត ---- */
G[43]={1:function(){var b=pick([2,3,5,10]),n=ri(-2,4);
    return Q("គណនា $\\log_{"+b+"}"+(n>=0?Math.pow(b,n):"\\frac{1}{"+Math.pow(b,-n)+"}")+"$",[A(n)],"$"+(n>=0?Math.pow(b,n):"\\frac{1}{"+Math.pow(b,-n)+"}")+"="+b+"^{"+n+"}$ ⇒ $"+n+"$")},
  2:function(){var a=ri(1,4);return Q("ដោះស្រាយ $\\ln x="+a+"$",[A("e^"+a,"e^{"+a+"}","num","x =")],"$\\ln x="+a+"\\iff x=e^{"+a+"}$","y=ln(x)\nasym y="+a)},
  3:function(){var T=pick([[2,4,2,3],[2,4,3,2],[2,8,4,5],[2,8,6,4],[2,16,8,7],[3,9,6,3],[3,3,2,1],[3,9,8,2]]),b=T[0],x=T[1],k=T[2],n=T[3];   /* x(x-k)=bⁿ */
    return Q("ដោះស្រាយ $\\log_{"+b+"} x+\\log_{"+b+"}(x-"+k+")="+n+"$",[A(x,null,"num","x =")],"លក្ខខណ្ឌ $x>"+k+"$ · $\\log_{"+b+"}[x(x-"+k+")]="+n+"\\iff x^2-"+k+"x-"+Math.pow(b,n)+"=0\\iff x="+x+"$ (ឬ $x="+(k-x)+"$ មិនយក)")}};
/* ---- ៥. អាំងតេក្រាល ---- */
G[51]={1:function(){var a=nz(-4,4),n=ri(1,4),b=ri(-5,5),F=fr(a,n+1),FT=(F.d===1?(F.n===1?"":F.n===-1?"-":F.n):F.t)+"x^{"+(n+1)+"}";
    return Q("រកព្រីមីទីវមួយ $F(x)$ នៃ $f(x)="+co(a,n>1?"x^{"+n+"}":"x",true)+(b?sg(b,0):"")+"$",[A("("+F.s+")x^"+(n+1)+(b?sg(b,0)+"x":""),FT+(b?co(b,"x"):""),"anti","F(x) =")],"$\\int x^n dx=\\frac{x^{n+1}}{n+1}+C$ (បន្ថែមចំនួនថេរណាក៏បាន)")},
  2:function(){var a=ri(0,1),b=ri(a+1,3),c=[nz(-3,3),ri(-4,4),ri(-3,3)],F=function(x){return c[0]*x*x*x/3+c[1]*x*x/2+c[2]*x},v=fr(Math.round((F(b)-F(a))*6),6);
    return Q("គណនា $\\displaystyle\\int_{"+a+"}^{"+b+"}("+polyT(c)+")\\,dx$",[A(v.s,v.t)],"$\\left["+fr(c[0],3).t+"x^3"+(c[1]?(c[1]<0?"-":"+")+fr(Math.abs(c[1]),2).t+"x^2":"")+co(c[2],"x")+"\\right]_{"+a+"}^{"+b+"}="+v.t+"$")},
  3:function(){var k=ri(1,4),v=fr(k*k*k,6);   /* ផ្ទៃរវាង y=kx និង y=x² លើ [0,k] = k³/6 */
    return Q("គណនាផ្ទៃក្រឡាដែនខណ្ឌដោយ $y="+(k===1?"":k)+"x$ និង $y=x^2$",[A(v.s,v.t)],"ចំណុចប្រសព្វ $x=0$ និង $x="+k+"$ · $S=\\int_0^{"+k+"}("+(k===1?"":k)+"x-x^2)dx="+v.t+"$","y="+k+"x\ny=x^2 red\narea y="+k+"x | y=x^2 [0,"+k+"]")}};
/* ---- ៦. សមីការឌីផេរ៉ង់ស្យែល ---- */
G[61]={1:function(){var k=nz(-3,3),c=nz(-4,4);
    return Q("ដោះស្រាយ $y'="+(k===1?"":k===-1?"-":k)+"y$ ដែល $y(0)="+c+"$ ។ សរសេរ $y$",[A(c+"e^("+k+"x)",c+"e^{"+k+"x}","expr","y =")],"ចម្លើយទូទៅ $y=Ce^{"+k+"x}$ · $y(0)=C="+c+"$")},
  2:function(){var a=nz(-3,3),b=nz(-6,6),c=ri(-3,3),p=fr(-b,a);   /* y'=ay+b, y(0)=c */
    return Q("ដោះស្រាយ $y'="+(a===1?"":a===-1?"-":a)+"y"+sg(b,0)+"$ ដែល $y(0)="+c+"$",[A("("+c+"-("+p.s+"))e^("+a+"x)+("+p.s+")",null,"expr","y =")],"ចម្លើយពិសេស $y_p="+p.t+"$ ⇒ $y=Ce^{"+a+"x}+"+p.t+"$ · $y(0)="+c+"$ ⇒ $C="+c+"-("+p.t+")$")},
  3:function(){var k=ri(2,4),T=ri(2,5),y0=ri(2,8)*k;
    return Q("ចំនួនបាក់តេរីកើនតាម $y'=ky$ ។ ពេល $t=0$ មាន $"+y0+"$ ហើយពេល $t="+T+"$ មាន $"+(y0*k)+"$ ។ រក $k$",[A("ln("+k+")/"+T,"\\frac{\\ln "+k+"}{"+T+"}","num","k =")],"$y="+y0+"e^{kt}$ · $"+(y0*k)+"="+y0+"e^{"+T+"k}\\iff e^{"+T+"k}="+k+"\\iff k=\\frac{\\ln "+k+"}{"+T+"}$")}};
G[62]={1:function(){var r1=nz(-4,4),r2=nz(-4,4);while(r1===r2)r2=nz(-4,4);var lo=Math.min(r1,r2),hi=Math.max(r1,r2),p=-(r1+r2),q=r1*r2;
    return Q("សមីការសម្គាល់នៃ $y''"+co(p,"y'")+co(q,"y")+"=0$ មានឫស $r_1<r_2$ ។ រក $r_1$ និង $r_2$",[A(lo,null,"num","r₁ ="),A(hi,null,"num","r₂ =")],"$r^2"+co(p,"r")+sg(q,0)+"=0\\iff r="+lo+"$ ឬ $r="+hi+"$ ⇒ $y=C_1e^{"+lo+"x}+C_2e^{"+hi+"x}$")},
  2:function(){var w=ri(1,4),A0=nz(-3,3),B=nz(-3,3)*w;
    return Q("ដោះស្រាយ $y''+"+(w*w)+"y=0$ ដែល $y(0)="+A0+"$ និង $y'(0)="+B+"$",[A(A0+"cos("+w+"x)+"+(B/w)+"sin("+w+"x)",null,"expr","y =")],"$y=C_1\\cos "+w+"x+C_2\\sin "+w+"x$ · $C_1="+A0+"$ · $"+w+"C_2="+B+"$ ⇒ $C_2="+(B/w)+"$")},
  3:function(){var r=nz(-3,3),A0=ri(1,3),B=ri(-3,3);   /* ឫសឌុប y''-2ry'+r²y=0 → (C1 + C2 x)e^{rx} */
    return Q("ដោះស្រាយ $y''"+co(-2*r,"y'")+"+"+(r*r)+"y=0$ ដែល $y(0)="+A0+"$ និង $y'(0)="+B+"$",[A("("+A0+"+("+(B-r*A0)+")x)e^("+r+"x)",null,"expr","y =")],"ឫសឌុប $r="+r+"$ ⇒ $y=(C_1+C_2x)e^{"+r+"x}$ · $C_1="+A0+"$ · $C_2+"+sgp(r)+"C_1="+B+"$ ⇒ $C_2="+(B-r*A0)+"$")}};
/* ---- ៧. ប្រូបាប ---- */
function cnk(n,k){var r=1;for(var i=1;i<=k;i++)r=r*(n-k+i)/i;return Math.round(r)}
G[71]={1:function(){var s=ri(2,12),n=0;for(var a=1;a<=6;a++)for(var b=1;b<=6;b++)if(a+b===s)n++;var f=fr(n,36);
    return Q("បោះគ្រាប់ឡុកឡាក់ពីរ។ គណនាប្រូបាបដែលផលបូកស្មើ $"+s+"$",[A(f.s,f.t,"num","P =")],"ករណីអាច $36$ · ករណីស្រប $"+n+"$ ⇒ $P=\\frac{"+n+"}{36}="+f.t+"$")},
  2:function(){var r=ri(3,7),b=ri(2,6),t=r+b,f=fr(cnk(r,2),cnk(t,2));
    return Q("ប្រអប់មានឃ្លីក្រហម $"+r+"$ និងខៀវ $"+b+"$ ។ ចាប់យកព្រមគ្នា $2$ ។ គណនាប្រូបាបដែលបានក្រហមទាំងពីរ",[A(f.s,f.t,"num","P =")],"$P=\\dfrac{C_{"+r+"}^2}{C_{"+t+"}^2}=\\dfrac{"+cnk(r,2)+"}{"+cnk(t,2)+"}="+f.t+"$")},
  3:function(){var n=ri(3,6),k=ri(1,n-1),pr=pick([[1,2],[1,3],[1,4],[2,3]]),num=cnk(n,k)*Math.pow(pr[0],k)*Math.pow(pr[1]-pr[0],n-k),den=Math.pow(pr[1],n),f=fr(num,den);
    return Q("$X\\sim B("+n+";\\frac{"+pr[0]+"}{"+pr[1]+"})$ ។ គណនា $P(X="+k+")$",[A(f.s,f.t,"num","P =")],"$P(X="+k+")=C_{"+n+"}^{"+k+"}\\left(\\frac{"+pr[0]+"}{"+pr[1]+"}\\right)^{"+k+"}\\left(\\frac{"+(pr[1]-pr[0])+"}{"+pr[1]+"}\\right)^{"+(n-k)+"}="+f.t+"$")}};
/* ---- ៨. កោនិក ---- */
G[81]={1:function(){var p=ri(1,4);
    return Q("ប៉ារ៉ាបូល $y^2="+(4*p)+"x$ ។ រកកំណុំ $F(\\dots;0)$ និងបន្ទាត់ប្រាប់ទិស $x=\\dots$",[A(p,null,"num","F: x ="),A(-p,null,"num","x =")],"$y^2=4px$ ⇒ $4p="+(4*p)+"\\Rightarrow p="+p+"$ ⇒ $F("+p+";0)$ · $x=-"+p+"$","y^2="+(4*p)+"x\nF("+p+",0)\nx=-"+p)},
  2:function(){var p=ri(1,3);
    return Q("ប៉ារ៉ាបូល $x^2="+(4*p)+"y$ ។ រកកំណុំ $F(0;\\dots)$ និងបន្ទាត់ប្រាប់ទិស $y=\\dots$",[A(p,null,"num","F: y ="),A(-p,null,"num","y =")],"$x^2=4py$ ⇒ $p="+p+"$ ⇒ $F(0;"+p+")$ · $y=-"+p+"$","x^2="+(4*p)+"y\nF(0,"+p+")\nasym y=-"+p)},
  3:function(){var h=nz(-3,3),k=nz(-3,3),p=ri(1,2);
    return Q("ប៉ារ៉ាបូល $(y"+sg(-k,0)+")^2="+(4*p)+"(x"+sg(-h,0)+")$ ។ រកកំពូល $S$ និងកំណុំ $F$",[A(h,null,"num","S: x ="),A(k,null,"num","S: y ="),A(h+p,null,"num","F: x ="),A(k,null,"num","F: y =")],"កំពូល $S("+h+";"+k+")$ · $p="+p+"$ ⇒ $F("+(h+p)+";"+k+")$","(y"+sg(-k,0)+")^2="+(4*p)+"(x"+sg(-h,0)+")\nS("+h+","+k+")\nF("+(h+p)+","+k+")")}};
var ELT=[[5,4,3],[5,3,4],[10,8,6],[13,12,5],[10,6,8]];
G[82]={1:function(){var T=pick(ELT);
    return Q("អេលីប $\\dfrac{x^2}{"+(T[0]*T[0])+"}+\\dfrac{y^2}{"+(T[1]*T[1])+"}=1$ ។ រក $a$, $b$ និង $c$",[A(T[0],null,"num","a ="),A(T[1],null,"num","b ="),A(T[2],null,"num","c =")],"$c^2=a^2-b^2="+(T[0]*T[0])+"-"+(T[1]*T[1])+"="+(T[2]*T[2])+"$ ⇒ $c="+T[2]+"$","x^2/"+(T[0]*T[0])+"+y^2/"+(T[1]*T[1])+"=1\nF1(-"+T[2]+",0)\nF2("+T[2]+",0)")},
  2:function(){var T=pick(ELT),e=fr(T[2],T[0]);
    return Q("អេលីប $\\dfrac{x^2}{"+(T[0]*T[0])+"}+\\dfrac{y^2}{"+(T[1]*T[1])+"}=1$ ។ គណនាចំណាកផ្ចិត $e$",[A(e.s,e.t,"num","e =")],"$c="+T[2]+"$ ⇒ $e=\\frac{c}{a}="+e.t+"$","x^2/"+(T[0]*T[0])+"+y^2/"+(T[1]*T[1])+"=1\nF1(-"+T[2]+",0)\nF2("+T[2]+",0)")},
  3:function(){var T=pick(ELT),fig="x^2/"+(T[1]*T[1])+"+y^2/"+(T[0]*T[0])+"=1\nF1(0,-"+T[2]+")\nF2(0,"+T[2]+")";
    return Q("អេលីបមានអ័ក្សធំលើ $Oy$ ផ្ចិត $O$ កំណុំ $F(0;\\pm"+T[2]+")$ និង $a="+T[0]+"$ ។ សរសេរ $\\dfrac{x^2}{b^2}+\\dfrac{y^2}{a^2}=1$ ៖ រក $b^2$ និង $a^2$",[A(T[1]*T[1],null,"num","b² ="),A(T[0]*T[0],null,"num","a² =")],"$b^2=a^2-c^2="+(T[0]*T[0])+"-"+(T[2]*T[2])+"="+(T[1]*T[1])+"$",fig)}};
var HYT=[[3,4,5],[4,3,5],[6,8,10],[5,12,13],[8,6,10]];
G[83]={1:function(){var T=pick(HYT);
    return Q("អ៊ីពែបូល $\\dfrac{x^2}{"+(T[0]*T[0])+"}-\\dfrac{y^2}{"+(T[1]*T[1])+"}=1$ ។ រក $c$",[A(T[2],null,"num","c =")],"$c^2=a^2+b^2="+(T[0]*T[0])+"+"+(T[1]*T[1])+"="+(T[2]*T[2])+"$ ⇒ $c="+T[2]+"$","x^2/"+(T[0]*T[0])+"-y^2/"+(T[1]*T[1])+"=1\nF1(-"+T[2]+",0)\nF2("+T[2]+",0)")},
  2:function(){var T=pick(HYT),m=fr(T[1],T[0]);
    return Q("រកមេគុណប្រាប់ទិសវិជ្ជមាន $m$ នៃអាស៊ីមតូត $y=\\pm mx$ នៃ $\\dfrac{x^2}{"+(T[0]*T[0])+"}-\\dfrac{y^2}{"+(T[1]*T[1])+"}=1$",[A(m.s,m.t,"num","m =")],"$y=\\pm\\frac{b}{a}x$ ⇒ $m="+m.t+"$","x^2/"+(T[0]*T[0])+"-y^2/"+(T[1]*T[1])+"=1\ndash y="+(T[1]/T[0])+"x\ndash y=-"+(T[1]/T[0])+"x")},
  3:function(){var T=pick(HYT),e=fr(T[2],T[0]);
    return Q("គណនាចំណាកផ្ចិត $e$ នៃ $\\dfrac{x^2}{"+(T[0]*T[0])+"}-\\dfrac{y^2}{"+(T[1]*T[1])+"}=1$",[A(e.s,e.t,"num","e =")],"$c="+T[2]+"$ ⇒ $e=\\frac ca="+e.t+"$","x^2/"+(T[0]*T[0])+"-y^2/"+(T[1]*T[1])+"=1\nF1(-"+T[2]+",0)\nF2("+T[2]+",0)")}};

/* មេរៀន (ថ្នាក់ទី១២ · តាមកម្មវិធីសិក្សា) */
var LES=[
  ["ជំពូកទី១ ចំនួនកុំផ្លិច",[[11,"ចំនួនកុំផ្លិច"]]],
  ["ជំពូកទី២ លីមីត",[[22,"លីមីតនៃអនុគមន៍"],[23,"ភាពជាប់នៃអនុគមន៍"]]],
  ["ជំពូកទី៣ ដេរីវេ",[[31,"ដេរីវេ"],[32,"អនុវត្តដេរីវេ"]]],
  ["ជំពូកទី៤ អនុគមន៍",[[41,"អនុគមន៍សនិទាន"],[42,"អនុគមន៍អិចស្ប៉ូណង់ស្យែល"],[43,"អនុគមន៍លោការីត"]]],
  ["ជំពូកទី៥ អាំងតេក្រាល",[[51,"ព្រីមីទីវ និងអាំងតេក្រាល"]]],
  ["ជំពូកទី៦ សមីការឌីផេរ៉ង់ស្យែល",[[61,"សមីការឌីផេរ៉ង់ស្យែលលំដាប់ទី១"],[62,"សមីការឌីផេរ៉ង់ស្យែលលំដាប់ទី២"]]],
  ["ជំពូកទី៧ ប្រូបាប",[[71,"ប្រូបាប"]]],
  ["ជំពូកទី៨ កោនិក",[[81,"ប៉ារ៉ាបូល"],[82,"អេលីប"],[83,"អ៊ីពែបូល"]]],
  ["ជំពូកទី១០ វ៉ិចទ័រក្នុងលំហ",[[101,"ផលគុណនៃពីរវ៉ិចទ័រក្នុងលំហ"],[102,"អនុវត្តនៃផលគុណវ៉ិចទ័រ"]]]
];
var LV={1:["កម្រិត ១","មូលដ្ឋាន"],2:["កម្រិត ២","មធ្យម"],3:["កម្រិត ៣","ពិបាក"]},NQ=6;

/* =================== វឌ្ឍនភាព (ក្នុងឧបករណ៍) =================== */
var PK="prac12";
function prog(){try{return JSON.parse(localStorage.getItem(PK)||"{}")}catch(e){return{}}}
function setProg(l,v){var p=prog();p[l]=p[l]||{};p[l][v]=1;try{localStorage.setItem(PK,JSON.stringify(p))}catch(e){}}
function cupHtml(l){var p=prog()[l]||{};return[1,2,3].map(function(v){return"<i class='cup"+(p[v]?" on":"")+" l"+v+"' title='"+LV[v][0]+"'>🏆</i>"}).join("")}

/* =================== បង្ហាញ =================== */
var S={l:0,v:1,qs:[],done:false};
function math(el){if(window.renderMathInElement)try{renderMathInElement(el,{delimiters:[{left:"$$",right:"$$",display:true},{left:"$",right:"$",display:false}],throwOnError:false})}catch(e){}}
function home(){
  S.l=0;location.hash="";
  var tot=0,got=0,p=prog();
  var h="<div class=hero><h1>🧮 ហាត់លំហាត់ គណិតវិទ្យា ថ្នាក់ទី១២</h1><p>ជ្រើសមេរៀន · ជ្រើសកម្រិត · ដោះស្រាយ · ចុច «ពិនិត្យ» · ឆ្លើយត្រូវទាំងអស់ ទទួលបានពានរង្វាន់ 🏆</p></div>";
  LES.forEach(function(ch){
    h+="<section class=ch><h2>"+esc(ch[0])+"</h2><div class=cards>"+ch[1].map(function(l){tot+=3;var q=p[l[0]]||{};got+=(q[1]?1:0)+(q[2]?1:0)+(q[3]?1:0);
      return"<button type=button class=card data-l="+l[0]+"><b>"+esc(l[1])+"</b><span class=cups>"+cupHtml(l[0])+"</span></button>"}).join("")+"</div></section>";
  });
  h+="<p class=tot>🏆 ពានរង្វាន់សរុប៖ <b>"+kn(got)+"</b> / "+kn(tot)+(got?" · <button type=button class=link data-a=reset>លុបវឌ្ឍនភាព</button>":"")+"</p>";
  $("app").innerHTML=h;
}
function lname(l){var n="";LES.forEach(function(c){c[1].forEach(function(x){if(x[0]===l)n=x[1]})});return n}
function open(l,v){
  S.l=l;S.v=v||1;S.done=false;S.qs=[];
  var seen={};
  var kind={};   /* ប្រភេទដូចគ្នា (ពាក្យដើមនៃសំណួរ) មិនលើស ២ */
  for(var i=0,tries=0;i<NQ&&tries<80;tries++){var q=G[l][S.v]();var k=q.q,t=k.replace(/\$[^$]*\$/g,"").slice(0,24)+(q.q.match(/\\(ln|sin|cos|sqrt|log)|e\^/)||[""])[0];
    if(seen[k]||(kind[t]>=2&&tries<50))continue;seen[k]=1;kind[t]=(kind[t]||0)+1;q.tries=0;S.qs.push(q);i++}
  location.hash="l="+l+"&v="+S.v;
  draw();window.scrollTo(0,0);
}
function draw(){
  var l=S.l,v=S.v;
  var h="<div class=bar><button type=button data-a=home>‹ មេរៀនទាំងអស់</button><h1>"+esc(lname(l))+"</h1><span class=cups>"+cupHtml(l)+"</span><button type=button data-a=qr title='តំណ/QR សម្រាប់ចែករំលែក'>📱</button></div>"+
    "<div class=lv>"+[1,2,3].map(function(k){return"<button type=button class='l"+k+(k===v?" on":"")+"' data-v="+k+">"+LV[k][0]+"<small>"+LV[k][1]+"</small></button>"}).join("")+"</div><ol class=qs>";
  S.qs.forEach(function(q,i){
    h+="<li class='q"+(q.st?" "+q.st:"")+"' id=q"+i+"><div class=qt>"+q.q+"</div>"+(q.fig&&window.FIG?FIG.svg(q.fig):"")+"<div class=ans>"+
      q.a.map(function(a,j){return"<label class=in>"+(a.l?"<span class=lb>"+esc(a.l)+"</span>":"")+"<input data-q="+i+" data-p="+j+" autocomplete=off autocapitalize=off spellcheck=false inputmode=text value='"+esc(a.u||"")+"'"+(q.st==="ok"?" readonly":"")+"><span class=mk>"+(a.r==null?"":a.r?"✅":"❌")+"</span><span class=pv id=pv"+i+"_"+j+"></span></label>"}).join("")+
      "</div>"+(q.st==="bad"&&q.tries>=1||q.show?"<button type=button class=sol-b data-sol="+i+">💡 "+(q.show?"លាក់ដំណោះស្រាយ":"មើលដំណោះស្រាយ")+"</button>":"")+
      (q.show?"<div class=sol><b>ចម្លើយ៖</b> "+q.a.map(function(a){return(a.l?esc(a.l)+" ":"")+"$"+a.t+"$"}).join(" · ")+(q.s?"<br>"+q.s:"")+"</div>":"")+"</li>";
  });
  var ok=S.qs.filter(function(q){return q.st==="ok"}).length;
  h+="</ol><div class=foot><button type=button class=check data-a=check>✔ ពិនិត្យចម្លើយ</button><span class=score>"+kn(ok)+" / "+kn(S.qs.length)+" ត្រូវ</span><button type=button data-a=new>🔄 លំហាត់ថ្មី</button></div>";
  $("app").innerHTML=h;math($("app"));
  [].forEach.call($("app").querySelectorAll("input[data-q]"),function(inp){preview(inp)});
}
function preview(inp){
  var pv=$("pv"+inp.dataset.q+"_"+inp.dataset.p);if(!pv)return;
  var v=inp.value.trim();if(!v){pv.innerHTML="";return}
  try{var t=parse(v);if(window.katex)katex.render(tex(t),pv,{throwOnError:false});else pv.textContent=v;pv.classList.remove("err")}
  catch(e){pv.textContent="⚠️ "+(typeof e==="string"?e:"");pv.classList.add("err")}
}
function doCheck(){
  var all=true,any=false;
  S.qs.forEach(function(q){
    if(q.st==="ok")return;
    var ok=true,blank=true;
    q.a.forEach(function(a){if(a.u&&a.u.trim())blank=false});
    if(blank){q.st="";ok=false;all=false;return}
    any=true;
    q.a.forEach(function(a){var r=a.u&&a.u.trim()?check(a.u,a.v,a.k):{ok:false};a.r=r.ok;if(!r.ok)ok=false});
    q.st=ok?"ok":"bad";if(!ok){q.tries++;all=false}
  });
  if(!any&&!S.qs.every(function(q){return q.st==="ok"})){alert("សូមសរសេរចម្លើយយ៉ាងតិចមួយ");return}
  draw();
  var n=S.qs.filter(function(q){return q.st==="ok"}).length;
  if(n===S.qs.length&&!S.done){S.done=true;setProg(S.l,S.v);trophy()}
}
function trophy(){
  var d=document.createElement("div");d.className="tro";d.innerHTML="<div class=tro-in><div class=big>🏆</div><h2>អស្ចារ្យណាស់!</h2><p>អ្នកឆ្លើយត្រូវទាំងអស់ "+esc(LV[S.v][0])+"<br>"+esc(lname(S.l))+"</p>"+(S.v<3?"<button type=button data-next>បន្តទៅ "+LV[S.v+1][0]+" ›</button>":"<button type=button data-home>ជ្រើសមេរៀនផ្សេង</button>")+"</div>";
  document.body.appendChild(d);
  d.onclick=function(e){if(e.target.closest("[data-next]"))open(S.l,S.v+1);else if(e.target.closest("[data-home]"))home();d.remove();if(!e.target.closest("button"))draw()};
  draw();
}
function qr(){
  var u=location.origin+location.pathname+"#l="+S.l+"&v="+S.v,d=document.createElement("div");d.className="tro";
  d.innerHTML="<div class=tro-in><h2>📱 ចែករំលែកលំហាត់នេះ</h2><div id=qrb class=qrb></div><input value='"+esc(u)+"' readonly onclick='this.select()'><button type=button data-x>បិទ</button></div>";
  document.body.appendChild(d);d.onclick=function(e){if(e.target===d||e.target.closest("[data-x]"))d.remove()};
  var go=function(){try{new QRCode($("qrb"),{text:u,width:220,height:220})}catch(e){}};
  if(window.QRCode)go();else{var s=document.createElement("script");s.src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js";s.onload=go;document.head.appendChild(s)}
}
/* ---------- ក្ដារចុចនិមិត្តសញ្ញាគណិត ---------- */
var KEYS=[["√","√("],["π","π"],["i","i"],["x","x"],["^","^"],["²","^2"],["⁄","/"],["(","("],[")",")"],["e","e"],["ln","ln("],["sin","sin("],["cos","cos("],["−","-"],["⌫","BS"]];
var lastInp=null;
function kb(){
  var k=document.createElement("div");k.id="kb";k.className="kb";k.hidden=true;
  k.innerHTML=KEYS.map(function(x){return"<button type=button data-k='"+esc(x[1])+"'>"+x[0]+"</button>"}).join("");
  document.body.appendChild(k);
  k.addEventListener("mousedown",function(e){e.preventDefault()});   /* កុំឱ្យបាត់ focus ពីប្រអប់ចម្លើយ */
  k.addEventListener("click",function(e){
    var b=e.target.closest("[data-k]");if(!b||!lastInp||lastInp.readOnly)return;var t=b.dataset.k,i=lastInp;
    var s=i.selectionStart==null?i.value.length:i.selectionStart,en=i.selectionEnd==null?s:i.selectionEnd;
    if(t==="BS"){if(s===en&&s>0)s--;i.value=i.value.slice(0,s)+i.value.slice(en);i.setSelectionRange(s,s)}
    else{i.value=i.value.slice(0,s)+t+i.value.slice(en);i.setSelectionRange(s+t.length,s+t.length)}
    i.dispatchEvent(new Event("input",{bubbles:true}));i.focus();
  });
}
/* ---------- ព្រឹត្តិការណ៍ ---------- */
function bind(){
  var app=$("app");
  app.addEventListener("click",function(e){
    var b=e.target.closest("button");if(!b)return;
    if(b.dataset.l)return open(+b.dataset.l,1);
    if(b.dataset.v)return open(S.l,+b.dataset.v);
    if(b.dataset.sol!=null){var q=S.qs[+b.dataset.sol];q.show=!q.show;return draw()}
    var a=b.dataset.a;
    if(a==="home")home();else if(a==="check")doCheck();else if(a==="new")open(S.l,S.v);else if(a==="qr")qr();
    else if(a==="reset"){if(confirm("លុបពានរង្វាន់ទាំងអស់នៅលើឧបករណ៍នេះ?")){try{localStorage.removeItem(PK)}catch(x){}home()}}
  });
  app.addEventListener("input",function(e){
    var t=e.target;if(t.dataset.q==null)return;var a=S.qs[+t.dataset.q].a[+t.dataset.p];a.u=t.value;a.r=null;
    var mk=t.parentNode.querySelector(".mk");if(mk)mk.textContent="";preview(t);
  });
  app.addEventListener("keydown",function(e){if(e.key==="Enter"&&e.target.dataset.q!=null){e.preventDefault();doCheck()}});
  document.addEventListener("focusin",function(e){var t=e.target;if(t.dataset&&t.dataset.q!=null){lastInp=t;$("kb").hidden=false}});
  document.addEventListener("focusout",function(e){setTimeout(function(){var a=document.activeElement;if(!a||a.dataset.q==null)$("kb").hidden=true},150)});
}
function route(){var m=/l=(\d+)(?:&v=(\d))?/.exec(location.hash);if(m&&G[+m[1]])open(+m[1],+m[2]||1);else home()}
kb();bind();route();
window.PRACT={parse:parse,check:check,tex:tex,G:G,S:S};
})();
