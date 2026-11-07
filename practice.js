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
    if(c==="n")return{t:"x",n:"n"};   /* អថេរ n (ស្វ៊ីត) = x */
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
    case"n":return t.s;case"c":return t.s;case"x":return t.n||"x";case"i":return"i";
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
/* ---- ២. លីមីត៖ រាងកំណត់ · 0/0 · ∞/∞ · ∞−∞ · 1^∞ · ត្រីកោណមាត្រ · e^x · ln · តាងអញ្ញាត · កំណត់ប៉ារ៉ាម៉ែត្រ ----
   q.kd = ប្រភេទ (ដើម្បីកុំឱ្យប្រភេទដដែលច្រើនពេក) · ចម្លើយអនន្ត៖ សិស្សវាយ ∞ / inf / -inf */
var INF=["inf","+\\infty"],NINF=["-inf","-\\infty"];
function kx(m,v){v=v||"x";return(m===1?"":m===-1?"-":m)+v}
function ef(n){return n===0?["1","1"]:n===1?["e","e"]:["e^("+n+")","e^{"+n+"}"]}
function LQ(kd,to,e,an,sol){var q=Q("គណនា $\\displaystyle\\lim_{x\\to "+to+"}"+e+"$",[A(an[0],an[1],"num","លីមីត =")],sol);q.kd=kd;return q}
function FA(f){return[f.s,f.t]}
var TA=[["\\frac{\\pi}{6}",{sin:["1/2","\\frac12"],cos:["sqrt(3)/2","\\frac{\\sqrt3}{2}"],tan:["sqrt(3)/3","\\frac{\\sqrt3}{3}"]}],["\\frac{\\pi}{4}",{sin:["sqrt(2)/2","\\frac{\\sqrt2}{2}"],cos:["sqrt(2)/2","\\frac{\\sqrt2}{2}"],tan:["1","1"]}],
  ["\\frac{\\pi}{3}",{sin:["sqrt(3)/2","\\frac{\\sqrt3}{2}"],cos:["1/2","\\frac12"],tan:["sqrt(3)","\\sqrt3"]}],["\\pi",{sin:["0","0"],cos:["-1","-1"],tan:["0","0"]}],["0",{sin:["0","0"],cos:["1","1"],tan:["0","0"]}]];
/* កម្រិត ១ · រាងកំណត់ (ជំនួសផ្ទាល់) និងលីមីតមូលដ្ឋាន */
var LM1={
 p:function(){var a=nz(-3,3),c=[nz(-3,3),ri(-5,5),ri(-6,6)],v=c[0]*a*a+c[1]*a+c[2];return LQ("p",a,"\\left("+polyT(c)+"\\right)",[v,String(v)],"ពហុធាជាប់ ⇒ ជំនួស $x="+a+"$")},
 r:function(){var a=nz(-4,4),b=ri(-5,5),c=nz(-3,3),d=ri(-5,5),x0=ri(-3,3);while(c*x0+d===0)d++;var f=fr(a*x0+b,c*x0+d);
   return LQ("r",x0,"\\dfrac{"+polyT([a,b])+"}{"+polyT([c,d])+"}",FA(f),"ភាគបែង $\\ne0$ ត្រង់ $x="+x0+"$ ⇒ ជំនួសផ្ទាល់ $="+f.t+"$")},
 t:function(){var T=pick(TA),f=pick(["sin","cos","tan"]),v=T[1][f];return LQ("t",T[0],"\\"+f+" x",v,"$\\"+f+"$ ជាប់ ⇒ $\\"+f+" "+T[0]+"="+v[1]+"$")},
 e:function(){var a=nz(-3,3),b=ri(-3,3),x0=ri(-2,2),n=a*x0+b;return LQ("e",x0,"e^{"+polyT([a,b])+"}",ef(n),"$e^u$ ជាប់ ⇒ $e^{"+n+"}$")},
 l:function(){var k=ri(1,4),m=pick([1,2,3]);return LQ("l",k===1?"e":"e^{"+k+"}",(m===1?"":m)+"\\ln x",[String(m*k),String(m*k)],"$\\ln e^{"+k+"}="+k+"$")},
 i:function(){var a=nz(-4,4),n=pick([2,3,4]),k=ri(1,6),L=pick([
   ["+\\infty","e^{x}",INF,"$e^x\\to+\\infty$"],["-\\infty","e^{x}",["0","0"],"$e^x\\to0$"],["+\\infty","e^{-x}",["0","0"],"$e^{-x}=\\frac{1}{e^x}\\to0$"],
   ["0^{+}","\\ln x",NINF,"$\\ln x\\to-\\infty$"],["+\\infty","\\ln x",INF,"$\\ln x\\to+\\infty$"],["0^{+}","\\dfrac{"+k+"}{x}",INF,"$\\frac{"+k+"}{0^+}=+\\infty$"],["0^{-}","\\dfrac{"+k+"}{x}",NINF,"$\\frac{"+k+"}{0^-}=-\\infty$"],
   ["+\\infty","\\dfrac{"+k+"}{x^{"+n+"}}",["0","0"],"$\\frac{"+k+"}{+\\infty}=0$"],
   ["+\\infty","\\left("+polyT([a,0,ri(-5,5),1])+"\\right)",a>0?INF:NINF,"ពហុធា ⇒ តួដឺក្រេខ្ពស់បំផុត $"+kx(a,"x^3")+"$"],
   ["-\\infty","\\left("+polyT([a,0,ri(-5,5),1])+"\\right)",a>0?NINF:INF,"តួដឺក្រេខ្ពស់បំផុត $"+kx(a,"x^3")+"$ ពេល $x\\to-\\infty$"],
   ["-\\infty","\\left("+polyT([a,ri(-5,5),1])+"\\right)",a>0?INF:NINF,"តួដឺក្រេខ្ពស់បំផុត $"+kx(a,"x^2")+"$"]]);
   return LQ("i",L[0],L[1],L[2],L[3])}};
/* កម្រិត ២ · រាងមិនកំណត់ 0/0 · ∞/∞ · ∞−∞ និងលីមីតគោល */
var LM2={
 f2:function(){var a=nz(-5,5),b=nz(-4,4);return LQ("f2",a,"\\dfrac{"+polyT([1,b-a,-a*b])+"}{x"+sg(-a,0)+"}",[String(a+b),String(a+b)],"រាង $\\frac00$ ⇒ $(x"+sg(-a,0)+")(x"+sg(b,0)+")$ ⇒ $"+(a+b)+"$")},
 f3:function(){var a=nz(-3,3);return LQ("f3",a,"\\dfrac{x^3"+sg(-a*a*a,0)+"}{x"+sg(-a,0)+"}",[String(3*a*a),String(3*a*a)],"$x^3-a^3=(x-a)(x^2+ax+a^2)$ ⇒ $3a^2="+3*a*a+"$")},
 f22:function(){var a=nz(-3,3),b,c;do{b=ri(-4,4);c=ri(-4,4)}while(b===a||c===a||b===c);var f=fr(a-b,a-c);
   return LQ("f22",a,"\\dfrac{"+polyT([1,-(a+b),a*b])+"}{"+polyT([1,-(a+c),a*c])+"}",FA(f),"រាង $\\frac00$ ⇒ $\\dfrac{(x"+sg(-a,0)+")(x"+(b?sg(-b,0):"")+")}{(x"+sg(-a,0)+")(x"+(c?sg(-c,0):"")+")}$ ⇒ $"+f.t+"$")},
 cj:function(){var m=ri(1,4),k=ri(-3,5),x0=m*m-k,f=fr(1,2*m);
   return LQ("cj",x0,"\\dfrac{\\sqrt{x"+(k?sg(k,0):"")+"}-"+m+"}{x"+(x0?sg(-x0,0):"")+"}",FA(f),"គុណនឹងកន្សោមឆ្លាស់ $\\sqrt{x"+(k?sg(k,0):"")+"}+"+m+"$ ⇒ $\\frac{1}{"+(2*m)+"}$")},
 ii:function(){var p=nz(-6,6),q=nz(1,5),r=ri(-5,5),s=ri(-5,5),t=ri(0,2);
   if(t===0){var f=fr(p,q);return LQ("ii","+\\infty","\\dfrac{"+polyT([p,r,1])+"}{"+polyT([q,s,-2])+"}",FA(f),"រាង $\\frac\\infty\\infty$ · ដឺក្រេស្មើ ⇒ $\\frac{"+p+"}{"+q+"}$")}
   if(t===1)return LQ("ii","+\\infty","\\dfrac{"+polyT([p,r])+"}{"+polyT([q,s,3])+"}",["0","0"],"រាង $\\frac\\infty\\infty$ · ដឺក្រេភាគយក $<$ ភាគបែង ⇒ $0$");
   var to=pick(["+\\infty","-\\infty"]),sgn=(p/q)*(to==="+\\infty"?1:-1);
   return LQ("ii",to,"\\dfrac{"+polyT([p,0,r])+"}{"+polyT([q,s])+"}",sgn>0?INF:NINF,"ដឺក្រេភាគយក $>$ ភាគបែង ⇒ $\\frac{"+p+"x^2}{"+q+"x}=\\frac{"+p+"}{"+q+"}x$")},
 mm:function(){var a=nz(1,6),f=fr(a,2),t=ri(0,2);
   if(t===0)return LQ("mm","+\\infty","\\left(\\sqrt{x^2+"+kx(a)+"}-x\\right)",FA(f),"រាង $\\infty-\\infty$ ⇒ គុណកន្សោមឆ្លាស់ ⇒ $\\frac{"+a+"x}{\\sqrt{x^2+"+a+"x}+x}\\to"+f.t+"$");
   if(t===1)return LQ("mm","+\\infty","\\left(x-\\sqrt{x^2-"+kx(a)+"}\\right)",FA(f),"រាង $\\infty-\\infty$ ⇒ $\\frac{"+a+"x}{x+\\sqrt{x^2-"+a+"x}}\\to"+f.t+"$");
   return LQ("mm","+\\infty","\\left(\\sqrt{x+"+a+"}-\\sqrt{x}\\right)",["0","0"],"$\\frac{"+a+"}{\\sqrt{x+"+a+"}+\\sqrt x}\\to0$")},
 st:function(){var a=ri(1,6),b=ri(1,6),t=ri(0,3);
   if(t===0)return LQ("st",0,"\\dfrac{\\sin "+kx(a)+"}{"+kx(b)+"}",FA(fr(a,b)),"$\\lim_{u\\to0}\\frac{\\sin u}{u}=1$");
   if(t===1)return LQ("st",0,"\\dfrac{\\tan "+kx(a)+"}{"+kx(b)+"}",FA(fr(a,b)),"$\\lim_{u\\to0}\\frac{\\tan u}{u}=1$");
   if(t===2)return LQ("st",0,"\\dfrac{\\sin "+kx(a)+"}{\\sin "+kx(b)+"}",FA(fr(a,b)),"$\\frac{\\sin ax}{\\sin bx}=\\frac{\\sin ax}{ax}\\cdot\\frac{bx}{\\sin bx}\\cdot\\frac ab$");
   a=ri(2,6);return LQ("st",0,"\\dfrac{1-\\cos "+kx(a)+"}{x^2}",FA(fr(a*a,2)),"$1-\\cos u=2\\sin^2\\frac u2$ ⇒ $\\frac{a^2}{2}$")},
 se:function(){var a=nz(-4,5),b=nz(1,5);if(Math.random()<.6)return LQ("se",0,"\\dfrac{e^{"+kx(a)+"}-1}{"+kx(b)+"}",FA(fr(a,b)),"$\\lim_{u\\to0}\\frac{e^u-1}{u}=1$");
   var c=nz(-4,4);while(c===a)c=nz(-4,4);return LQ("se",0,"\\dfrac{e^{"+kx(a)+"}-e^{"+kx(c)+"}}{x}",[String(a-c),String(a-c)],"$\\frac{e^{ax}-1}{x}-\\frac{e^{cx}-1}{x}\\to a-c$")},
 sl:function(){var a=ri(1,5),b=ri(1,5);if(Math.random()<.65)return LQ("sl",0,"\\dfrac{\\ln(1+"+kx(a)+")}{"+kx(b)+"}",FA(fr(a,b)),"$\\lim_{u\\to0}\\frac{\\ln(1+u)}{u}=1$");
   return LQ("sl",1,"\\dfrac{\\ln x}{x-1}",["1","1"],"តាង $t=x-1$ ⇒ $\\frac{\\ln(1+t)}{t}\\to1$")}};
/* កម្រិត ៣ · 1^∞ · តាងអញ្ញាត · កំណើនប្រៀបធៀប · បន្សំ · កំណត់ប៉ារ៉ាម៉ែត្រ */
var LM3={
 o:function(){var a=nz(-3,3),b=nz(-3,3),t=ri(0,2),p=function(v){return v<0?"-":"+"};
   if(t===0)return LQ("o","+\\infty","\\left(1"+p(a)+"\\dfrac{"+Math.abs(a)+"}{x}\\right)^{"+kx(b)+"}",ef(a*b),"រាង $1^\\infty$ ⇒ $\\lim\\left(1+\\frac ax\\right)^{bx}=e^{ab}$");
   if(t===1)return LQ("o",0,"\\left(1"+p(a)+kx(Math.abs(a))+"\\right)^{\\frac{"+b+"}{x}}",ef(a*b),"រាង $1^\\infty$ ⇒ $(1+ax)^{\\frac bx}\\to e^{ab}$");
   var c=nz(-3,3);while(c===a)c=nz(-3,3);return LQ("o","+\\infty","\\left(\\dfrac{x"+sg(a,0)+"}{x"+sg(c,0)+"}\\right)^{x}",ef(a-c),"$\\frac{x+a}{x+c}=1+\\frac{a-c}{x+c}$ ⇒ រាង $1^\\infty$ ⇒ $e^{a-c}$")},
 u:function(){var a=ri(1,5),L=pick([
   [function(){return LQ("u","\\pi","\\dfrac{\\sin x}{x-\\pi}",["-1","-1"],"តាង $t=x-\\pi\\to0$ ⇒ $\\sin x=-\\sin t$ ⇒ $-1$")}],
   [function(){return LQ("u","\\frac{\\pi}{2}","\\dfrac{\\cos x}{x-\\frac{\\pi}{2}}",["-1","-1"],"តាង $t=x-\\frac\\pi2$ ⇒ $\\cos x=-\\sin t$ ⇒ $-1$")}],
   [function(){return LQ("u","+\\infty","x\\sin\\dfrac{"+a+"}{x}",[String(a),String(a)],"តាង $t=\\frac1x\\to0^+$ ⇒ $\\frac{\\sin "+a+"t}{t}\\to"+a+"$")}],
   [function(){return LQ("u","+\\infty","x\\left(e^{\\frac{"+a+"}{x}}-1\\right)",[String(a),String(a)],"តាង $t=\\frac1x$ ⇒ $\\frac{e^{"+a+"t}-1}{t}\\to"+a+"$")}],
   [function(){return LQ("u","+\\infty","x\\ln\\left(1+\\dfrac{"+a+"}{x}\\right)",[String(a),String(a)],"តាង $t=\\frac1x$ ⇒ $\\frac{\\ln(1+"+a+"t)}{t}\\to"+a+"$")}],
   [function(){var f=fr(1,2*a);return LQ("u",a,"\\dfrac{\\sin(x-"+a+")}{x^2-"+a*a+"}",FA(f),"តាង $t=x-"+a+"$ ⇒ $\\frac{\\sin t}{t}\\cdot\\frac{1}{x+"+a+"}\\to"+f.t+"$")}],
   [function(){return LQ("u",0,"\\dfrac{\\sin "+kx(a)+"}{\\sqrt{1+x}-1}",[String(2*a),String(2*a)],"គុណកន្សោមឆ្លាស់ ⇒ $\\frac{\\sin "+a+"x}{x}(\\sqrt{1+x}+1)\\to"+2*a+"$")}]]);return L[0]()},
 c:function(){var n=ri(1,3),k=ri(2,4),L=pick([["+\\infty","\\dfrac{e^{x}}{x^{"+n+"}}",INF,"$e^x$ កើនលឿនជាង $x^n$"],["+\\infty","\\dfrac{\\ln x}{x^{"+n+"}}",["0","0"],"$x^n$ កើនលឿនជាង $\\ln x$"],
   ["+\\infty","x^{"+n+"}e^{-x}",["0","0"],"$\\frac{x^n}{e^x}\\to0$"],["0^{+}","x\\ln x",["0","0"],"លីមីតគោល $x\\ln x\\to0$"],["-\\infty","x e^{x}",["0","0"],"លីមីតគោល $xe^x\\to0$"],
   ["+\\infty","\\dfrac{(\\ln x)^2}{x}",["0","0"],"តាង $x=t^2$ ⇒ $\\frac{4(\\ln t)^2}{t^2}=4\\left(\\frac{\\ln t}{t}\\right)^2\\to0$"],["+\\infty","\\left(e^{x}-x^{"+k+"}\\right)",INF,"$x^"+k+"\\left(\\frac{e^x}{x^"+k+"}-1\\right)\\to+\\infty$"],
   ["+\\infty","\\left(x-\\ln x\\right)",INF,"$x\\left(1-\\frac{\\ln x}{x}\\right)\\to+\\infty$"]]);return LQ("c",L[0],L[1],L[2],L[3])},
 m:function(){var a=ri(1,5),b=ri(1,5),t=ri(0,4);
   if(t===0)return LQ("m",0,"\\dfrac{1-\\cos "+kx(a)+"}{x\\sin "+kx(b)+"}",FA(fr(a*a,2*b)),"$\\frac{1-\\cos ax}{x^2}\\cdot\\frac{x}{\\sin bx}\\to\\frac{a^2}{2}\\cdot\\frac1b$");
   if(t===1)return LQ("m",0,"\\dfrac{\\tan x-\\sin x}{x^3}",FA(fr(1,2)),"$\\tan x(1-\\cos x)$ ⇒ $1\\cdot\\frac12$");
   if(t===2){while(b===a)b=ri(1,5);return LQ("m",0,"\\dfrac{\\sin "+kx(a)+"-\\sin "+kx(b)+"}{x}",[String(a-b),String(a-b)],"$\\frac{\\sin ax}{x}-\\frac{\\sin bx}{x}\\to a-b$")}
   if(t===3)return LQ("m",0,"\\dfrac{e^{x^2}-\\cos "+kx(a)+"}{x^2}",FA(fr(2+a*a,2)),"$\\frac{e^{x^2}-1}{x^2}+\\frac{1-\\cos ax}{x^2}\\to1+\\frac{a^2}{2}$");
   return LQ("m",0,"\\dfrac{\\ln(1+"+kx(a)+")}{\\tan "+kx(b)+"}",FA(fr(a,b)),"$\\frac{\\ln(1+ax)}{ax}\\cdot\\frac{bx}{\\tan bx}\\cdot\\frac ab$")},
 ab:function(){var r=nz(-3,3),L=nz(-5,5),a=L-2*r,b=r*r-r*L;
   var q=Q("រកចំនួនពិត $a$ និង $b$ ដែល $\\displaystyle\\lim_{x\\to "+r+"}\\dfrac{x^2+ax+b}{x"+sg(-r,0)+"}="+L+"$",[A(a,null,"num","a ="),A(b,null,"num","b =")],
     "ភាគយកត្រូវស្មើ $0$ ត្រង់ $x="+r+"$ ⇒ $"+r*r+(r<0?"":"+")+r+"a+b=0$ · លីមីត $=2("+r+")+a="+L+"$ ⇒ $a="+a+"$ , $b="+b+"$");q.kd="ab";return q}};
function lpick(P,ks){var k=pick(ks||Object.keys(P));return P[k]()}
G[22]={1:function(){return lpick(LM1)},2:function(){return lpick(LM2)},3:function(){return lpick(LM3)}};
/* ថ្នាក់ទី១១ (មិនទាន់រៀន e^x · ln · 1^∞)៖ PX.LIM11[1|2]() */
var LIM11={1:function(){return lpick(LM1,["p","r","r","t","i"])},2:function(){return lpick(LM2,["f2","f3","f22","cj","ii","mm","st","st"])}};
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
    return Q("គេឱ្យ $\\vec u"+v3(u)+"$ និង $\\vec v"+v3(v)+"$ ។ គណនា $\\vec u\\cdot\\vec v$",[A(d)],"$\\vec u\\cdot\\vec v="+u[0]+"\\cdot"+sgp(v[0])+(u[1]<0?"":"+")+u[1]+"\\cdot"+sgp(v[1])+(u[2]<0?"":"+")+u[2]+"\\cdot"+sgp(v[2])+"="+d+"$")},
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
      return Q("គណនា $f'(x)$ នៃ $f(x)=("+poly([a,b])+")("+poly([c,d])+")$",[A(poly(e),polyT(e),"expr","f'(x) =")],"$(uv)'=u'v+uv'="+a+"("+poly([c,d])+")"+(c<0?"":"+")+c+"("+poly([a,b])+")="+polyT(e)+"$")}
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
/* ---- ៥. អាំងតេក្រាល៖ ព្រីមីទីវមូលដ្ឋាន · អាំងតេក្រាលកំណត់ · ប្ដូរអថេរ · ដោយផ្នែក · ផ្ទៃ ---- */
function IQ(kd,q,a,s,fig){var o=Q(q,a,s,fig);o.kd=kd;return o}
function cfT(f){return f.t==="1"?"":f.t==="-1"?"-":f.t}
var IN1={
 p:function(){var a=nz(-4,4),n=ri(1,4),b=ri(-5,5),F=fr(a,n+1),FT=cfT(F)+"x^{"+(n+1)+"}";
   return IQ("p","រកព្រីមីទីវមួយ $F(x)$ នៃ $f(x)="+co(a,n>1?"x^{"+n+"}":"x",true)+(b?sg(b,0):"")+"$",[A("("+F.s+")x^"+(n+1)+(b?sg(b,0)+"x":""),FT+(b?co(b,"x"):""),"anti","F(x) =")],"$\\int x^n dx=\\frac{x^{n+1}}{n+1}+C$")},
 inv:function(){var a=ri(1,6);return IQ("inv","រកព្រីមីទីវមួយ $F(x)$ នៃ $f(x)=\\dfrac{"+a+"}{x^2}$",[A("-"+a+"/x","-\\frac{"+a+"}{x}","anti","F(x) =")],"$\\frac{1}{x^2}=x^{-2}$ ⇒ $\\int x^{-2}dx=-\\frac1x$")},
 sq:function(){var a=ri(1,6),F=fr(2*a,3);return IQ("sq","រកព្រីមីទីវមួយ $F(x)$ នៃ $f(x)="+(a===1?"":a)+"\\sqrt{x}$",[A("("+F.s+")x^(3/2)",cfT(F)+"x\\sqrt{x}","anti","F(x) =")],"$\\sqrt x=x^{\\frac12}$ ⇒ $\\frac{x^{\\frac32}}{\\frac32}=\\frac23x\\sqrt x$")},
 tr:function(){var a=nz(-4,4),b=ri(1,5),c=Math.random()<.5,F=fr(c?a:-a,b);
   return IQ("tr","រកព្រីមីទីវមួយ $F(x)$ នៃ $f(x)="+co(a,"\\"+(c?"cos":"sin")+" "+kx(b),true)+"$",[A("("+F.s+")"+(c?"sin":"cos")+"("+b+"x)",cfT(F)+"\\"+(c?"sin":"cos")+" "+kx(b),"anti","F(x) =")],c?"$\\int\\cos bx\\,dx=\\frac1b\\sin bx$":"$\\int\\sin bx\\,dx=-\\frac1b\\cos bx$")},
 ex:function(){var a=nz(-4,4),b=nz(-3,4),F=fr(a,b);return IQ("ex","រកព្រីមីទីវមួយ $F(x)$ នៃ $f(x)="+(a===1?"":a===-1?"-":a)+"e^{"+kx(b)+"}$",[A("("+F.s+")e^("+b+"x)",cfT(F)+"e^{"+kx(b)+"}","anti","F(x) =")],"$\\int e^{bx}dx=\\frac1b e^{bx}$")},
 ln:function(){var a=nz(-5,6),b=ri(0,3);return IQ("ln","រកព្រីមីទីវមួយ $F(x)$ នៃ $f(x)=\\dfrac{"+a+"}{x"+(b?"+"+b:"")+"}$ (លើ $x>"+(-b)+"$)",[A(a+"ln(x"+(b?"+"+b:"")+")",(a===1?"":a===-1?"-":a)+"\\ln"+(b?"(x+"+b+")":" x"),"anti","F(x) =")],"$\\int\\frac{u'}{u}dx=\\ln|u|$")}};
var IN2={
 p:function(){var a=ri(0,1),b=ri(a+1,3),c=[nz(-3,3),ri(-4,4),ri(-3,3)],F=function(x){return c[0]*x*x*x/3+c[1]*x*x/2+c[2]*x},v=fr(Math.round((F(b)-F(a))*6),6);
   return IQ("p","គណនា $\\displaystyle\\int_{"+a+"}^{"+b+"}("+polyT(c)+")\\,dx$",[A(v.s,v.t)],"រកព្រីមីទីវ រួចយក $F("+b+")-F("+a+")="+v.t+"$")},
 tr:function(){var a=nz(-3,4),b=nz(-3,4),t=ri(0,1);
   if(t===0)return IQ("tr","គណនា $\\displaystyle\\int_0^{\\frac{\\pi}{2}}("+co(a,"\\cos x",true)+co(b,"\\sin x")+")\\,dx$",[A(a+b)],"$[\\,"+co(a,"\\sin x",true)+co(-b,"\\cos x")+"\\,]_0^{\\frac\\pi2}="+(a+b)+"$");
   return IQ("tr","គណនា $\\displaystyle\\int_0^{\\pi}"+(a===1?"":a===-1?"-":a)+"\\sin x\\,dx$",[A(2*a)],"$[-\\cos x]_0^\\pi=2$ ⇒ $"+2*a+"$")},
 ex:function(){var k=ri(2,6),a=ri(1,3),t=ri(0,1);
   if(t===0)return IQ("ex","គណនា $\\displaystyle\\int_0^{\\ln "+k+"}e^{x}\\,dx$",[A(k-1)],"$[e^x]_0^{\\ln "+k+"}="+k+"-1$");
   return IQ("ex","គណនា $\\displaystyle\\int_0^{1}e^{"+kx(a)+"}\\,dx$",[A("(e^"+a+"-1)/"+a,a===1?"e-1":"\\frac{e^{"+a+"}-1}{"+a+"}")],"$\\left[\\frac1{"+a+"}e^{"+a+"x}\\right]_0^1$")},
 lg:function(){var a=nz(-4,5),k=ri(1,3),t=ri(0,1);
   if(t===0)return IQ("lg","គណនា $\\displaystyle\\int_1^{"+(k===1?"e":"e^{"+k+"}")+"}\\dfrac{"+a+"}{x}\\,dx$",[A(a*k)],"$["+a+"\\ln x]_1^{e^{"+k+"}}="+a*k+"$");
   var b=ri(2,5),f=fr(b-1,b);return IQ("lg","គណនា $\\displaystyle\\int_1^{"+b+"}\\dfrac{1}{x^2}\\,dx$",[A(f.s,f.t)],"$\\left[-\\frac1x\\right]_1^{"+b+"}=1-\\frac1{"+b+"}$")},
 sq:function(){var m=ri(1,3),f=fr(2*m*m*m,3);return IQ("sq","គណនា $\\displaystyle\\int_0^{"+m*m+"}\\sqrt{x}\\,dx$",[A(f.s,f.t)],"$\\left[\\frac23x\\sqrt x\\right]_0^{"+m*m+"}="+f.t+"$")}};
var IN3={
 bp:function(){var L=pick([["\\int_0^1xe^{x}\\,dx","1","1","$u=x$ , $dv=e^xdx$ ⇒ $[xe^x-e^x]_0^1=1$"],["\\int_1^e\\ln x\\,dx","1","1","$u=\\ln x$ , $dv=dx$ ⇒ $[x\\ln x-x]_1^e=1$"],
   ["\\int_0^{\\pi}x\\sin x\\,dx","pi","\\pi","$[-x\\cos x+\\sin x]_0^\\pi=\\pi$"],["\\int_0^{\\frac{\\pi}{2}}x\\cos x\\,dx","pi/2-1","\\frac{\\pi}{2}-1","$[x\\sin x+\\cos x]_0^{\\frac\\pi2}=\\frac\\pi2-1$"],
   ["\\int_1^e x\\ln x\\,dx","(e^2+1)/4","\\frac{e^2+1}{4}","$\\left[\\frac{x^2}{2}\\ln x-\\frac{x^2}{4}\\right]_1^e$"],["\\int_0^1xe^{-x}\\,dx","1-2/e","1-\\frac{2}{e}","$[-xe^{-x}-e^{-x}]_0^1=1-\\frac2e$"]]);
   return IQ("bp","គណនាដោយប្រើអាំងតេក្រាលដោយផ្នែក $\\displaystyle "+L[0]+"$",[A(L[1],L[2])],L[3])},
 uu:function(){var k=ri(1,4),f=fr(1+k,k);return IQ("uu","គណនា $\\displaystyle\\int_0^1\\dfrac{2x}{x^2+"+k+"}\\,dx$",[A("ln("+f.s+")","\\ln"+(f.d===1?" "+f.t:f.t))],"ទម្រង់ $\\frac{u'}{u}$ ⇒ $[\\ln(x^2+"+k+")]_0^1=\\ln\\frac{"+(1+k)+"}{"+k+"}$")},
 un:function(){var n=ri(2,4),f=fr(Math.pow(2,n+1)-1,n+1);return IQ("un","គណនា $\\displaystyle\\int_0^1 2x(x^2+1)^{"+n+"}\\,dx$",[A(f.s,f.t)],"តាង $u=x^2+1$ ⇒ $\\left[\\frac{(x^2+1)^{"+(n+1)+"}}{"+(n+1)+"}\\right]_0^1="+f.t+"$")},
 sp:function(){var n=ri(1,4),t=ri(0,1);if(t===0){var f=fr(1,n+1);return IQ("sp","គណនា $\\displaystyle\\int_0^{\\frac{\\pi}{2}}\\sin^{"+n+"}x\\cos x\\,dx$",[A(f.s,f.t)],"តាង $u=\\sin x$ ⇒ $\\left[\\frac{\\sin^{"+(n+1)+"}x}{"+(n+1)+"}\\right]_0^{\\frac\\pi2}$")}
   return IQ("sp","គណនា $\\displaystyle\\int_0^{\\pi}\\sin^2x\\,dx$",[A("pi/2","\\frac{\\pi}{2}")],"$\\sin^2x=\\frac{1-\\cos2x}{2}$")},
 pf:function(){var a=ri(2,3),b=ri(a+1,5),f=fr((b-1)*(a+1),(b+1)*(a-1));return IQ("pf","គណនា $\\displaystyle\\int_{"+a+"}^{"+b+"}\\dfrac{dx}{x^2-1}$",[A("ln("+f.s+")/2","\\frac12\\ln"+(f.d===1?" "+f.t:f.t))],"$\\frac{1}{x^2-1}=\\frac12\\left(\\frac{1}{x-1}-\\frac{1}{x+1}\\right)$ ⇒ $\\frac12\\left[\\ln\\frac{x-1}{x+1}\\right]_{"+a+"}^{"+b+"}$")},
 ar:function(){var k=ri(1,4),v=fr(k*k*k,6);return IQ("ar","គណនាផ្ទៃក្រឡាដែនខណ្ឌដោយ $y="+(k===1?"":k)+"x$ និង $y=x^2$",[A(v.s,v.t)],"ចំណុចប្រសព្វ $x=0$ និង $x="+k+"$ · $S=\\int_0^{"+k+"}("+(k===1?"":k)+"x-x^2)dx="+v.t+"$","y="+k+"x\ny=x^2 red\narea y="+k+"x | y=x^2 [0,"+k+"]")}};
G[51]={1:function(){return lpick(IN1)},2:function(){return lpick(IN2)},3:function(){return lpick(IN3)}};
/* ---- ដេរីវេ៖ ផលគុណ · ផលចែក · e^x · ln · tan (បន្ថែមលើកម្រិត ៣) ---- */
var D3=[function(){var a=nz(-3,3);return Q("គណនា $f'(x)$ នៃ $f(x)="+kx(a)+"e^{x}$",[A(a+"(x+1)e^x",(a===1?"":a===-1?"-":a)+"(x+1)e^{x}","expr","f'(x) =")],"$(uv)'=u'v+uv'$")},
 function(){return Q("គណនា $f'(x)$ នៃ $f(x)=x\\ln x$",[A("ln(x)+1","\\ln x+1","expr","f'(x) =")],"$(uv)'=1\\cdot\\ln x+x\\cdot\\frac1x$")},
 function(){return Q("គណនា $f'(x)$ នៃ $f(x)=e^{x}\\sin x$",[A("e^x(sin(x)+cos(x))","e^x(\\sin x+\\cos x)","expr","f'(x) =")],"$(uv)'=e^x\\sin x+e^x\\cos x$")},
 function(){return Q("គណនា $f'(x)$ នៃ $f(x)=\\dfrac{\\ln x}{x}$",[A("(1-ln(x))/x^2","\\frac{1-\\ln x}{x^2}","expr","f'(x) =")],"$\\left(\\frac uv\\right)'=\\frac{u'v-uv'}{v^2}$")},
 function(){var a=ri(2,5);return Q("គណនា $f'(x)$ នៃ $f(x)=\\tan "+a+"x$",[A(a+"/(cos("+a+"x))^2","\\frac{"+a+"}{\\cos^2"+a+"x}","expr","f'(x) =")],"$(\\tan u)'=\\frac{u'}{\\cos^2u}$")},
 function(){var a=ri(1,3);return Q("គណនា $f'(x)$ នៃ $f(x)=\\dfrac{e^{x}}{x+"+a+"}$",[A("(x+"+(a-1)+")e^x/(x+"+a+")^2","\\frac{(x"+(a-1?"+"+(a-1):"")+")e^{x}}{(x+"+a+")^2}","expr","f'(x) =")],"$\\left(\\frac uv\\right)'=\\frac{e^x(x+"+a+")-e^x}{(x+"+a+")^2}$")}];
(function(){var o=G[31][3];G[31][3]=function(){return Math.random()<.5?pick(D3)():o()}})();
/* ---- បន្ថែម៖ ភាពជាប់ · e^x · ln (លាយជាមួយទម្រង់ចាស់) ---- */
function KQ(kd,q,a,s,fig){var o=Q(q,a,s,fig);o.kd=kd;return o}
function mix(g,lv,L,p){var o=g[lv];g[lv]=function(){return Math.random()<(p||.6)?pick(L)():o()}}
function lnT(f){return"\\ln"+(f.d===1?" "+f.t:f.t)}
mix(G[23],1,[
 function(){var a=nz(-3,3),b,c;do{b=ri(-4,4);c=ri(-4,4)}while(b>=c);return KQ("cz","រកតម្លៃ $x$ ដែលអនុគមន៍ $f(x)=\\dfrac{"+polyT([a,ri(-5,5)])+"}{"+polyT([1,-(b+c),b*c])+"}$ មិនជាប់ (សរសេរតម្លៃតូចជាមុន)",[A(b,null,"num","x₁ ="),A(c,null,"num","x₂ =")],"មិនជាប់ត្រង់ភាគបែង $=0$ ៖ $"+polyT([1,-(b+c),b*c])+"=0\\iff x="+b+"$ ឬ $x="+c+"$")},
 function(){var x0=nz(-2,2),m=nz(-3,3),b=ri(-4,4),y0=m*x0+b,a=y0-x0*x0;return KQ("cq","រក $a$ ដើម្បីឱ្យ $f(x)=\\begin{cases}x^2"+"+a & x<"+x0+"\\\\ "+polyT([m,b])+" & x\\ge "+x0+"\\end{cases}$ ជាប់ត្រង់ $x="+x0+"$",[A(a,null,"num","a =")],"$\\lim\\limits_{x\\to"+x0+"^-}f(x)="+x0*x0+"+a$ · $f("+x0+")="+y0+"$ ⇒ $a="+a+"$")}]);
mix(G[23],2,[
 function(){var m=ri(1,4),k=ri(-3,5),x0=m*m-k,f=fr(1,2*m);return KQ("cs","រក $k$ ដើម្បីឱ្យ $f(x)=\\begin{cases}\\dfrac{\\sqrt{x"+(k?sg(k,0):"")+"}-"+m+"}{x"+(x0?sg(-x0,0):"")+"} & x\\ne "+x0+"\\\\ k & x="+x0+"\\end{cases}$ ជាប់ត្រង់ $x="+x0+"$",[A(f.s,f.t,"num","k =")],"គុណកន្សោមឆ្លាស់ ⇒ $\\lim f(x)="+f.t+"$ ⇒ $k="+f.t+"$")},
 function(){var a=ri(2,6),t=Math.random()<.5;return KQ("ct","រក $k$ ដើម្បីឱ្យ $f(x)=\\begin{cases}\\dfrac{"+(t?"\\sin "+a+"x":"e^{"+a+"x}-1")+"}{x} & x\\ne 0\\\\ k & x=0\\end{cases}$ ជាប់ត្រង់ $x=0$",[A(a,null,"num","k =")],t?"$\\frac{\\sin ax}{x}\\to a$":"$\\frac{e^{ax}-1}{x}\\to a$")}]);
mix(G[23],3,[
 function(){var p=pick([-2,-1,1,2]),q=p+ri(1,3),a=fr(p*p-1,p),b=q*q-q;return KQ("c2","រក $a$ និង $b$ ដើម្បីឱ្យ $f(x)=\\begin{cases}ax+1 & x<"+p+"\\\\ x^2 & "+p+"\\le x\\le "+q+"\\\\ x"+"+b & x>"+q+"\\end{cases}$ ជាប់លើ $\\mathbb R$",[A(a.s,a.t,"num","a ="),A(b,null,"num","b =")],
   "ត្រង់ $x="+p+"$ ៖ $"+p+"a+1="+p*p+"$ ⇒ $a="+a.t+"$ · ត្រង់ $x="+q+"$ ៖ $"+q*q+"="+q+"+b$ ⇒ $b="+b+"$")},
 function(){var k,n;do{k=ri(3,70);n=0;while((n+1)*(n+1)*(n+1)+(n+1)<k)n++}while(n*n*n+n===k||(n+1)*(n+1)*(n+1)+n+1===k);return KQ("ci","បង្ហាញថាសមីការ $x^3+x-"+k+"=0$ មានឫសតែមួយគត់ $\\alpha$ ។ រកចំនួនគត់ $n$ ដែល $n<\\alpha<n+1$",[A(n,null,"num","n =")],"$f(x)=x^3+x-"+k+"$ កើនដាច់ខាត · $f("+n+")="+(n*n*n+n-k)+"<0$ · $f("+(n+1)+")="+((n+1)*(n+1)*(n+1)+n+1-k)+">0$ ⇒ ទ្រឹស្តីបទតម្លៃកណ្ដាល")}]);
mix(G[42],1,[
 function(){var a=nz(-4,5),b=nz(-4,5),c=nz(-4,5),n=a+b-c;return KQ("es","សម្រួល $\\dfrac{e^{"+a+"}\\cdot e^{"+b+"}}{e^{"+c+"}}=e^{k}$ ។ រក $k$",[A(n,null,"num","k =")],"$e^ae^b=e^{a+b}$ · $\\frac{e^m}{e^c}=e^{m-c}$")},
 function(){var k=ri(2,9);return KQ("el","ដោះស្រាយ $e^{x}="+k+"$",[A("ln("+k+")","\\ln "+k,"num","x =")],"$e^x=k\\iff x=\\ln k$")},
 function(){var k=ri(2,9),m=ri(1,3);return KQ("ee","គណនា $e^{"+(m===1?"":m)+"\\ln "+k+"}$",[A(Math.pow(k,m))],"$e^{m\\ln k}=k^m="+Math.pow(k,m)+"$")}]);
mix(G[42],2,[
 function(){var a=ri(1,4),b=ri(-5,5),c=ri(-4,6),f=fr(c-b,a);return KQ("ei","ដោះស្រាយវិសមីការ $e^{"+polyT([a,b])+"}>e^{"+c+"}$ ។ ចម្លើយ $x>k$ រក $k$",[A(f.s,f.t,"num","k =")],"$e^u$ កើន ⇒ $"+polyT([a,b])+">"+c+"$ ⇒ $x>"+f.t+"$")},
 function(){var a=ri(2,5),k=ri(1,6),f=fr(a+k,a);return KQ("e2","ដោះស្រាយ $"+a+"e^{x}-"+k+"="+a+"$",[A("ln("+f.s+")",lnT(f),"num","x =")],"$e^x=\\frac{"+(a+k)+"}{"+a+"}$ ⇒ $x="+lnT(f)+"$")},
 function(){var k=nz(-4,4);return KQ("e3","ដោះស្រាយ $e^{2x}=e^{x"+sg(k,0)+"}$",[A(k,null,"num","x =")],"$2x=x"+sg(k,0)+"$ ⇒ $x="+k+"$")}]);
mix(G[42],3,[
 function(){var k=ri(2,6);return KQ("em","អនុគមន៍ $f(x)=e^{x}-"+k+"x$ ។ រកតម្លៃ $x$ ដែល $f$ មានអប្បបរមា និងតម្លៃអប្បបរមា",[A("ln("+k+")","\\ln "+k,"num","x ="),A(k+"-"+k+"ln("+k+")",k+"-"+k+"\\ln "+k,"num","f_min =")],"$f'(x)=e^x-"+k+"=0\\iff x=\\ln "+k+"$ · $f(\\ln "+k+")="+k+"-"+k+"\\ln "+k+"$","y=exp(x)-"+k+"x")},
 function(){var a=nz(-3,3),b=ri(-3,3);return KQ("et","សរសេរសមីការបន្ទាត់ប៉ះក្រាប $y=e^{"+kx(a)+"}"+(b?sg(b,0):"")+"$ ត្រង់ $x=0$ ជាទម្រង់ $y=mx+p$",[A(a,null,"num","m ="),A(1+b,null,"num","p =")],"$y'="+(a===1?"":a)+"e^{"+kx(a)+"}$ ⇒ $m="+a+"$ · $y(0)="+(1+b)+"$")}]);
mix(G[43],1,[
 function(){var k=nz(-3,5);return KQ("lk","គណនា $\\ln e^{"+k+"}$",[A(k)],"$\\ln e^k=k$")},
 function(){var a=ri(2,6),b=ri(2,6);return KQ("lp","សរសេរ $\\ln "+a+"+\\ln "+b+"$ ជាទម្រង់ $\\ln m$ ។ រក $m$",[A(a*b,null,"num","m =")],"$\\ln a+\\ln b=\\ln(ab)$")},
 function(){var a=ri(1,4),b=ri(-4,4),f=fr(1-b,a);return KQ("l0","ដោះស្រាយ $\\ln("+polyT([a,b])+")=0$",[A(f.s,f.t,"num","x =")],"$\\ln u=0\\iff u=1$ ⇒ $"+polyT([a,b])+"=1$")}]);
mix(G[43],2,[
 function(){var a=ri(-3,4),k=ri(1,3);return KQ("li","ដោះស្រាយវិសមីការ $\\ln(x"+(a?sg(-a,0):"")+")<"+k+"$ ។ ចម្លើយ $\\alpha<x<\\beta$ រក $\\alpha$ និង $\\beta$",[A(a,null,"num","α ="),A("e^"+k+(a?sg(a,0):""),(k===1?"e":"e^{"+k+"}")+(a?sg(a,0):""),"num","β =")],"លក្ខខណ្ឌ $x>"+a+"$ · $\\ln$ កើន ⇒ $x"+(a?sg(-a,0):"")+"<e^{"+k+"}$")},
 function(){var p=ri(1,4),q=ri(1,4),c=p*q;return KQ("lq","ដោះស្រាយ $\\ln x+\\ln(x"+(q-p?sg(q-p,0):"")+")=\\ln "+c+"$",[A(p,null,"num","x =")],"លក្ខខណ្ឌ $x>"+Math.max(0,p-q)+"$ · $x(x"+(q-p?sg(q-p,0):"")+")="+c+"$ ⇒ $x="+p+"$ (ឫសមួយទៀត $"+(-q)+"$ មិនយក)")},
 function(){var a=ri(2,5),m=ri(2,4);return KQ("lm","សម្រួល $\\ln "+Math.pow(a,m)+"-\\ln "+a+"=k\\ln "+a+"$ ។ រក $k$",[A(m-1)],"$\\ln a^m=m\\ln a$ ⇒ $"+m+"\\ln "+a+"-\\ln "+a+"$")}]);
mix(G[43],3,[
 function(){var p=nz(-2,2),q;do{q=nz(-2,3)}while(q<=p);return KQ("l2","ដោះស្រាយ $(\\ln x)^2"+co(-(p+q),"\\ln x")+sg(p*q,0)+"=0$ (ឫសតូចជាមុន)",[A("e^("+p+")",p===1?"e":"e^{"+p+"}","num","x₁ ="),A("e^("+q+")",q===1?"e":"e^{"+q+"}","num","x₂ =")],"តាង $t=\\ln x$ ៖ $t^2"+co(-(p+q),"t")+(p*q?sg(p*q,0):"")+"=0\\iff t="+p+"$ ឬ $t="+q+"$")},
 function(){var k=ri(2,6);return KQ("lf","អនុគមន៍ $f(x)=x-"+k+"\\ln x$ ($x>0$) ។ រកតម្លៃ $x$ ដែល $f$ មានអប្បបរមា និងតម្លៃអប្បបរមា",[A(k,null,"num","x ="),A(k+"-"+k+"ln("+k+")",k+"-"+k+"\\ln "+k,"num","f_min =")],"$f'(x)=1-\\frac{"+k+"}{x}=0\\iff x="+k+"$","y=x-"+k+"ln(x)\nwindow x=0..12 y=-6..8")}]);
/* ---- ៦. សមីការឌីផេរ៉ង់ស្យែល ---- */
G[61]={1:function(){var k=nz(-3,3),c=nz(-4,4);
    return Q("ដោះស្រាយ $y'="+(k===1?"":k===-1?"-":k)+"y$ ដែល $y(0)="+c+"$ ។ សរសេរ $y$",[A(c+"e^("+k+"x)",c+"e^{"+k+"x}","expr","y =")],"ចម្លើយទូទៅ $y=Ce^{"+k+"x}$ · $y(0)=C="+c+"$")},
  2:function(){var a=nz(-3,3),b=nz(-6,6),c=ri(-3,3),p=fr(-b,a);   /* y'=ay+b, y(0)=c */
    return Q("ដោះស្រាយ $y'="+(a===1?"":a===-1?"-":a)+"y"+sg(b,0)+"$ ដែល $y(0)="+c+"$",[A("("+c+"-("+p.s+"))e^("+a+"x)+("+p.s+")",(function(){var C=fr(c*p.d-p.n,p.d);return(C.n?cfT(C)+"e^{"+kx(a)+"}":"")+(p.n?(C.n&&p.n>0?"+":"")+p.t:(C.n?"":"0"))})(),"expr","y =")],"ចម្លើយពិសេស $y_p="+p.t+"$ ⇒ $y=Ce^{"+kx(a)+"}"+(p.n<0?"":"+")+p.t+"$ · $y(0)="+c+"$ ⇒ $C="+c+"-"+(p.n<0?"("+p.t+")":p.t)+"$")},
  3:function(){var k=ri(2,4),T=ri(2,5),y0=ri(2,8)*k;
    return Q("ចំនួនបាក់តេរីកើនតាម $y'=ky$ ។ ពេល $t=0$ មាន $"+y0+"$ ហើយពេល $t="+T+"$ មាន $"+(y0*k)+"$ ។ រក $k$",[A("ln("+k+")/"+T,"\\frac{\\ln "+k+"}{"+T+"}","num","k =")],"$y="+y0+"e^{kt}$ · $"+(y0*k)+"="+y0+"e^{"+T+"k}\\iff e^{"+T+"k}="+k+"\\iff k=\\frac{\\ln "+k+"}{"+T+"}$")}};
G[62]={1:function(){var r1=nz(-4,4),r2=nz(-4,4);while(r1===r2)r2=nz(-4,4);var lo=Math.min(r1,r2),hi=Math.max(r1,r2),p=-(r1+r2),q=r1*r2;
    return Q("សមីការសម្គាល់នៃ $y''"+co(p,"y'")+co(q,"y")+"=0$ មានឫស $r_1<r_2$ ។ រក $r_1$ និង $r_2$",[A(lo,null,"num","r₁ ="),A(hi,null,"num","r₂ =")],"$r^2"+co(p,"r")+sg(q,0)+"=0\\iff r="+lo+"$ ឬ $r="+hi+"$ ⇒ $y=C_1e^{"+lo+"x}+C_2e^{"+hi+"x}$")},
  2:function(){var w=ri(1,4),A0=nz(-3,3),B=nz(-3,3)*w;
    return Q("ដោះស្រាយ $y''+"+(w*w)+"y=0$ ដែល $y(0)="+A0+"$ និង $y'(0)="+B+"$",[A(A0+"cos("+w+"x)+("+(B/w)+")sin("+w+"x)",co(A0,"\\cos "+w+"x",true)+co(B/w,"\\sin "+w+"x",!A0)||"0","expr","y =")],"$y=C_1\\cos "+w+"x+C_2\\sin "+w+"x$ · $C_1="+A0+"$ · $"+w+"C_2="+B+"$ ⇒ $C_2="+(B/w)+"$")},
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

/* ---- បន្ថែម៖ កុំផ្លិច · ED · ប្រូបាប · កោនិក · វ៉ិចទ័រ (លាយជាមួយទម្រង់ចាស់) ---- */
var TRI=[[3,4,5],[6,8,10],[5,12,13],[8,15,17],[9,12,15]],TRI3=[[1,2,2,3],[2,3,6,7],[1,4,8,9],[2,6,9,11],[4,4,7,9],[2,1,2,3]];
function sc(v){return v?sg(v,0):""}
function lnr(c,k){return c?c+co(k,"t"):co(k,"t",true)}
function sqS(n){var k=1,r=n;for(var f=2;f*f<=r;f++)while(r%(f*f)===0){r/=f*f;k*=f}return r===1?[String(k),String(k)]:[(k>1?k:"")+"sqrt("+r+")",(k>1?k:"")+"\\sqrt{"+r+"}"]}
function sgn3(t){return t.map(function(v){return Math.random()<.5?-v:v})}
function cxs(re,im){return cx(re,im)}   /* ចម្លើយកុំផ្លិច (ចំនួនគត់) ជាអត្ថបទ "a+bi" អានបាន */
mix(G[11],1,[
 function(){var T=pick(TRI),a=T[0]*(Math.random()<.5?-1:1),b=T[1]*(Math.random()<.5?-1:1);if(Math.random()<.5){var t=a;a=b;b=t}return KQ("zm","គណនាម៉ូឌុល $|z|$ នៃ $z="+cx(a,b)+"$",[A(T[2],null,"num","|z| =")],"$|z|=\\sqrt{"+a*a+"+"+b*b+"}="+T[2]+"$")},
 function(){var n=ri(5,2025),r=n%4,V=[["1","1"],["i","i"],["-1","-1"],["-i","-i"]][r];return KQ("zi","គណនា $i^{"+n+"}$",[A(V[0],V[1])],"$i^4=1$ · $"+n+"=4\\cdot"+Math.floor(n/4)+"+"+r+"$ ⇒ $i^{"+r+"}="+V[1]+"$")},
 function(){var a=ri(-5,5),b=ri(-5,5),p=nz(-4,4),q=nz(-4,4);return KQ("zx","រកចំនួនពិត $x$ និង $y$ ដែល $(x"+sg(p,0)+")+(y"+sg(q,0)+")i="+cx(a,b)+"$",[A(a-p,null,"num","x ="),A(b-q,null,"num","y =")],"ផ្ទឹមផ្នែកពិត និងផ្នែកនិមិត្ត")}]);
mix(G[11],2,[
 function(){var p=ri(-4,4),q=nz(-4,4),a=nz(-3,3),b=nz(-3,3),c=a*p-b*q,d=a*q+b*p;return KQ("ze","ដោះស្រាយក្នុង $\\mathbb C$ ៖ $("+cx(a,b)+")z="+cx(c,d)+"$",[A(cx(p,q),cx(p,q),"num","z =")],"$z=\\dfrac{"+cx(c,d)+"}{"+cx(a,b)+"}$ គុណនឹងកុំផ្លិចឆ្លាស់")},
 function(){var p=nz(-3,3),q=ri(1,4),b=-2*p,c=p*p+q*q;return KQ("zq","ដោះស្រាយក្នុង $\\mathbb C$ ៖ $z^2"+co(b,"z")+"+"+c+"=0$ (សរសេរឫសដែលមានផ្នែកនិមិត្តអវិជ្ជមានជាមុន)",[A(cx(p,-q),null,"num","z₁ ="),A(cx(p,q),null,"num","z₂ =")],"$\\Delta="+(b*b-4*c)+"=("+2*q+"i)^2$ ⇒ $z="+p+"\\pm "+(q===1?"":q)+"i$")},
 function(){var T=pick(TRI),U=pick(TRI);return KQ("zp","គេឱ្យ $z_1="+cx(T[0],T[1])+"$ និង $z_2="+cx(U[1],-U[0])+"$ ។ គណនា $|z_1z_2|$",[A(T[2]*U[2])],"$|z_1z_2|=|z_1||z_2|="+T[2]+"\\times"+U[2]+"$")}]);
mix(G[11],3,[
 function(){var L=pick([["\\frac{\\pi}{3}","1+sqrt(3)i","1+i\\sqrt3"],["\\frac{\\pi}{6}","sqrt(3)+i","\\sqrt3+i"],["\\frac{2\\pi}{3}","-1+sqrt(3)i","-1+i\\sqrt3"],["-\\frac{\\pi}{3}","1-sqrt(3)i","1-i\\sqrt3"],["\\frac{5\\pi}{6}","-sqrt(3)+i","-\\sqrt3+i"],["\\frac{\\pi}{2}","2i","2i"]]);
   return KQ("zt","សរសេរ $z=2\\left(\\cos"+L[0]+"+i\\sin"+L[0]+"\\right)$ ជាទម្រង់ពិជគណិត",[A(L[1],L[2],"num","z =")],"គណនា $\\cos$ និង $\\sin$ នៃមុំពិសេស រួចគុណនឹង $2$")},
 function(){var L=pick([["1+i",2,"2i","2i"],["1+i",4,"-4","-4"],["1+i",6,"-8i","-8i"],["1+i",8,"16","16"],["1-i",4,"-4","-4"],["1+\\sqrt3 i",3,"-8","-8"],["1+\\sqrt3 i",6,"64","64"],["\\sqrt3+i",6,"-64","-64"],["\\sqrt3+i",3,"8i","8i"]]);
   return KQ("zd","ប្រើរូបមន្តដឺម័រ គណនា $("+L[0]+")^{"+L[1]+"}$",[A(L[2],L[3])],"សរសេរជាទម្រង់ត្រីកោណមាត្រ រួច $[r(\\cos\\theta+i\\sin\\theta)]^n=r^n(\\cos n\\theta+i\\sin n\\theta)$")},
 function(){var p=ri(1,4),q=nz(-4,4),a=p*p-q*q,b=2*p*q;return KQ("zr","រកចំនួនកុំផ្លិច $z$ ដែលមានផ្នែកពិតវិជ្ជមាន ហើយ $z^2="+cx(a,b)+"$",[A(cx(p,q),null,"num","z =")],"តាង $z=x+yi$ ៖ $x^2-y^2="+a+"$ , $2xy="+b+"$ , $x^2+y^2="+(p*p+q*q)+"$")}]);
mix(G[61],1,[function(){var a=nz(-3,3),b=ri(-4,4),c=ri(-3,3),F=fr(a,2);return KQ("d1","រកចម្លើយនៃ $y'="+polyT([a,b])+"$ ដែល $y(0)="+c+"$",[A("("+F.s+")x^2"+(b?sg(b,0)+"x":"")+sg(c,0),cfT(F)+"x^2"+(b?co(b,"x"):"")+(c?sg(c,0):""),"expr","y =")],"$y=\\int("+polyT([a,b])+")dx+C$ · $C=y(0)="+c+"$")}]);
mix(G[61],2,[function(){var a=-ri(1,4),b=nz(-8,8),f=fr(-b,a);return KQ("d2","អនុគមន៍ $y$ ផ្ទៀងផ្ទាត់ $y'="+a+"y"+sg(b,0)+"$ ។ គណនា $\\displaystyle\\lim_{x\\to+\\infty}y(x)$",[A(f.s,f.t,"num","lim =")],"$y=Ce^{"+a+"x}"+(f.n<0?"":"+")+f.t+"$ · $e^{"+a+"x}\\to0$ ⇒ $"+f.t+"$")}]);
mix(G[61],3,[function(){var T=ri(2,10),k=pick([2,3,4]);return KQ("d3","ចំនួនមួយកើនតាម $y'=ky$ ហើយកើនដល់ $"+k+"$ ដងក្នុងរយៈពេល $"+T+"$ ម៉ោង ។ រក $k$",[A("ln("+k+")/"+T,"\\frac{\\ln "+k+"}{"+T+"}","num","k =")],"$y=y_0e^{kt}$ · $e^{"+T+"k}="+k+"$ ⇒ $k=\\frac{\\ln "+k+"}{"+T+"}$")}]);
mix(G[62],1,[function(){var r=nz(-4,4);return KQ("e1","សមីការ $y''"+co(-2*r,"y'")+"+"+r*r+"y=0$ មានសមីការសម្គាល់ដែលមានឫសឌុប ។ រកឫសនោះ",[A(r,null,"num","r =")],"$r^2"+co(-2*r,"r")+"+"+r*r+"=(r"+sg(-r,0)+")^2$")}]);
mix(G[62],2,[function(){var al=ri(-3,3),be=ri(1,4);return KQ("e2","ចម្លើយទូទៅនៃ $y''"+co(-2*al,"y'")+"+"+(al*al+be*be)+"y=0$ មានរាង $y=e^{\\alpha x}(A\\cos\\beta x+B\\sin\\beta x)$ ($\\beta>0$) ។ រក $\\alpha$ និង $\\beta$",[A(al,null,"num","α ="),A(be,null,"num","β =")],"$\\Delta="+(4*al*al-4*(al*al+be*be))+"<0$ ⇒ $r="+al+"\\pm "+(be===1?"":be)+"i$")}]);
mix(G[62],3,[function(){var r1,r2;do{r1=nz(-4,3);r2=nz(-4,3)}while(r1===r2);var C1=nz(-3,3),C2=nz(-3,3),y0=C1+C2,y1=r1*C1+r2*C2,p=-(r1+r2),q=r1*r2,s=Math.max(r1,r2),t=Math.min(r1,r2),Cs=s===r1?C1:C2,Ct=s===r1?C2:C1;
   return KQ("e3","រកចម្លើយនៃ $y''"+co(p,"y'")+co(q,"y")+"=0$ ដែល $y(0)="+y0+"$ , $y'(0)="+y1+"$ ។ សរសេរ $y=C_1e^{"+kx(s)+"}+C_2e^{"+kx(t)+"}$ រក $C_1, C_2$",[A(Cs,null,"num","C₁ ="),A(Ct,null,"num","C₂ =")],"$C_1+C_2="+y0+"$ , $"+s+"C_1"+(t<0?"":"+")+t+"C_2="+y1+"$")}]);
mix(G[71],1,[
 function(){var n=ri(5,10),k=ri(2,4);return KQ("pc","គណនា $C_{"+n+"}^{"+k+"}$",[A(cnk(n,k))],"$C_n^k=\\frac{n!}{k!(n-k)!}$")},
 function(){var n=ri(5,9),k=ri(2,3),v=1;for(var i=0;i<k;i++)v*=n-i;return KQ("pa","គណនា $A_{"+n+"}^{"+k+"}$ (ចម្លាស់)",[A(v)],"$A_n^k=\\frac{n!}{(n-k)!}$")},
 function(){var n=pick([3,4]),k=ri(0,n),f=fr(cnk(n,k),Math.pow(2,n));return KQ("pk","បោះកាក់ $"+n+"$ ដង ។ គណនាប្រូបាបដែលចេញមុខ $"+k+"$ ដងគត់",[A(f.s,f.t)],"$\\frac{C_{"+n+"}^{"+k+"}}{2^{"+n+"}}$")}]);
mix(G[71],2,[
 function(){var r=ri(3,7),b=ri(3,7),N=r+b,f=fr(cnk(r,2)+cnk(b,2),cnk(N,2));return KQ("ps","ប្រអប់មានឃ្លីក្រហម $"+r+"$ និងខៀវ $"+b+"$ ។ ចាប់ $2$ គ្រាប់ព្រមគ្នា ។ គណនាប្រូបាបដែលបានពណ៌ដូចគ្នា",[A(f.s,f.t)],"$\\frac{C_{"+r+"}^2+C_{"+b+"}^2}{C_{"+N+"}^2}$")},
 function(){var r=ri(3,7),b=ri(3,7),N=r+b,f=fr(cnk(N,3)-cnk(b,3),cnk(N,3));return KQ("pl","ប្រអប់មានឃ្លីក្រហម $"+r+"$ និងខៀវ $"+b+"$ ។ ចាប់ $3$ គ្រាប់ព្រមគ្នា ។ គណនាប្រូបាបដែលបានឃ្លីក្រហមយ៉ាងតិច $1$",[A(f.s,f.t)],"ព្រឹត្តិការណ៍ផ្ទុយ៖ គ្មានក្រហម ⇒ $1-\\frac{C_{"+b+"}^3}{C_{"+N+"}^3}$")}]);
mix(G[71],3,[
 function(){var n=ri(2,5),p=pick([[1,2],[1,3],[1,4],[2,5]]),f=fr(Math.pow(p[1],n)-Math.pow(p[1]-p[0],n),Math.pow(p[1],n));return KQ("pb","$X\\sim B("+n+";\\frac{"+p[0]+"}{"+p[1]+"})$ ។ គណនា $P(X\\ge1)$",[A(f.s,f.t)],"$P(X\\ge1)=1-P(X=0)=1-\\left(\\frac{"+(p[1]-p[0])+"}{"+p[1]+"}\\right)^{"+n+"}$")},
 function(){var x=[ri(-2,0),ri(1,2),ri(3,5)],w=[ri(1,4),ri(1,4),ri(1,4)],D=w[0]+w[1]+w[2],f=fr(x[0]*w[0]+x[1]*w[1]+x[2]*w[2],D);
   return KQ("pe","អថេរចៃដន្យ $X$ យកតម្លៃ $"+x.join(" , ")+"$ ដោយប្រូបាប $"+w.map(function(v){return fr(v,D).t}).join(" , ")+"$ ។ គណនាសង្ឃឹមគណិត $E(X)$",[A(f.s,f.t,"num","E(X) =")],"$E(X)=\\sum x_ip_i="+f.t+"$")},
 function(){var n=ri(10,60),p=pick([[1,2],[1,4],[1,5],[2,5],[3,10]]),f=fr(n*p[0],p[1]);return KQ("pn","$X\\sim B("+n+";\\frac{"+p[0]+"}{"+p[1]+"})$ ។ គណនា $E(X)$",[A(f.s,f.t,"num","E(X) =")],"$E(X)=np$")}]);
mix(G[81],2,[function(){var p=nz(-3,3);return KQ("pf","រកសមីការប៉ារ៉ាបូលដែលមានកំពូល $O$ កំណុំ $F("+p+";0)$ ។ សរសេរជា $y^2=kx$ រក $k$",[A(4*p,null,"num","k =")],"$y^2=4px$ , $p="+p+"$")}]);
mix(G[81],3,[function(){var h=ri(-3,3),k=ri(-3,3),p=nz(-2,2);return KQ("pv","ប៉ារ៉ាបូល $"+poly([1,-2*h,0]).replace("x^2","x^2")+co(-4*p,"y")+sc(h*h+4*p*k)+"=0$ ។ រកកំពូល $S(h;k)$ និងកំណុំ $F$",[A(h,null,"num","h ="),A(k,null,"num","k ="),A(k+p,null,"num","y_F =")],"$(x"+sg(-h,0)+")^2="+4*p+"(y"+sg(-k,0)+")$ ⇒ $F("+h+";"+(k+p)+")$")}]);
mix(G[82],2,[function(){var T=pick(TRI);return KQ("ef","អេលីបផ្ចិត $O$ មានកំពូល $(\\pm"+T[2]+";0)$ និងកំណុំ $(\\pm"+T[0]+";0)$ ។ រក $b^2$",[A(T[1]*T[1],null,"num","b² =")],"$b^2=a^2-c^2="+T[2]*T[2]+"-"+T[0]*T[0]+"$")}]);
mix(G[82],3,[function(){var h=nz(-3,3),k=nz(-3,3),a=pick([3,4,5]),b=pick([1,2]),X2=b*b,Y2=a*a;return KQ("ec","អេលីប $"+poly([X2,-2*h*X2,0]).replace(/\+?0$/,"")+"+"+Y2+"y^2"+co(-2*k*Y2,"y")+sc(X2*h*h+Y2*k*k-X2*Y2)+"=0$ ។ រកផ្ចិត $I(h;k)$",[A(h,null,"num","h ="),A(k,null,"num","k =")],"បំពេញការេ ⇒ $\\frac{(x"+sg(-h,0)+")^2}{"+Y2+"}+\\frac{(y"+sg(-k,0)+")^2}{"+X2+"}=1$")}]);
mix(G[83],2,[function(){var T=pick(TRI);return KQ("hf","អ៊ីពែបូល $\\dfrac{x^2}{a^2}-\\dfrac{y^2}{b^2}=1$ មាន $a="+T[0]+"$ និងកំណុំ $(\\pm"+T[2]+";0)$ ។ រក $b$",[A(T[1],null,"num","b =")],"$b^2=c^2-a^2$")}]);
mix(G[83],3,[function(){var T=pick(TRI),f=fr(T[2],T[0]);return KQ("he","អ៊ីពែបូល $\\dfrac{x^2}{"+T[0]*T[0]+"}-\\dfrac{y^2}{"+T[1]*T[1]+"}=1$ ។ រកចំណាកផ្ចិត $e$ និងចម្ងាយរវាងកំណុំទាំងពីរ",[A(f.s,f.t,"num","e ="),A(2*T[2],null,"num","F₁F₂ =")],"$c=\\sqrt{a^2+b^2}="+T[2]+"$ · $e=\\frac ca$")}]);
mix(G[101],1,[
 function(){var T=pick(TRI3),u=sgn3(T.slice(0,3));return KQ("vn","គណនាប្រវែង $\\|\\vec u\\|$ នៃ $\\vec u"+v3(u)+"$",[A(T[3],null,"num","‖u‖ =")],"$\\sqrt{"+u.map(function(v){return v*v}).join("+")+"}="+T[3]+"$")},
 function(){var A0=[ri(-3,3),ri(-3,3),ri(-3,3)],B0=[ri(-3,3),ri(-3,3),ri(-3,3)];return KQ("vm","រកកូអរដោនេចំណុចកណ្ដាល $I$ នៃ $[AB]$ ដែល $A"+v3(A0)+"$ , $B"+v3(B0)+"$",[0,1,2].map(function(i){var f=fr(A0[i]+B0[i],2);return A(f.s,f.t,"num",["x","y","z"][i]+" =")}),"$I=\\frac{A+B}{2}$")}]);
mix(G[101],2,[
 function(){var T=pick(TRI3),U=pick(TRI3),u=sgn3(T.slice(0,3)),v=sgn3(U.slice(0,3)),d=u[0]*v[0]+u[1]*v[1]+u[2]*v[2],f=fr(d,T[3]*U[3]);return KQ("va","គេឱ្យ $\\vec u"+v3(u)+"$ និង $\\vec v"+v3(v)+"$ ។ គណនា $\\cos(\\vec u,\\vec v)$",[A(f.s,f.t,"num","cos θ =")],"$\\cos\\theta=\\frac{\\vec u\\cdot\\vec v}{\\|\\vec u\\|\\|\\vec v\\|}=\\frac{"+d+"}{"+T[3]+"\\cdot"+U[3]+"}$")},
 function(){var u,v,n;do{u=[ri(-3,3),ri(-3,3),ri(-3,3)];v=[ri(-3,3),ri(-3,3),ri(-3,3)];n=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]]}while(!n[0]&&!n[1]&&!n[2]);var nn=n[0]*n[0]+n[1]*n[1]+n[2]*n[2],r=Math.round(Math.sqrt(nn));
   return KQ("vs","គណនាក្រឡាផ្ទៃប្រលេឡូក្រាមសង់លើ $\\vec u"+v3(u)+"$ និង $\\vec v"+v3(v)+"$",[A(sqS(nn)[0],sqS(nn)[1],"num","S =")],"$S=\\|\\vec u\\times\\vec v\\|$ · $\\vec u\\times\\vec v="+v3(n)+"$")}]);
mix(G[101],3,[function(){var u,v,w,m,t;do{u=[ri(-3,3),ri(-3,3),ri(-3,3)];v=[ri(-3,3),ri(-3,3),ri(-3,3)];w=[ri(-3,3),ri(-3,3),ri(-3,3)];t=(u[0]*(v[1]*w[2]-v[2]*w[1])-u[1]*(v[0]*w[2]-v[2]*w[0])+u[2]*(v[0]*w[1]-v[1]*w[0]))}while(!t||Math.abs(t)%6);
   return KQ("vv","គណនាមាឌចតុមុខ $ABCD$ ដែល $\\overrightarrow{AB}"+v3(u)+"$ , $\\overrightarrow{AC}"+v3(v)+"$ , $\\overrightarrow{AD}"+v3(w)+"$",[A(Math.abs(t)/6,null,"num","V =")],"$V=\\frac16|(\\overrightarrow{AB}\\times\\overrightarrow{AC})\\cdot\\overrightarrow{AD}|=\\frac{"+Math.abs(t)+"}{6}$")}]);
mix(G[102],1,[function(){var n=[nz(-3,3),nz(-3,3),nz(-3,3)],P=[ri(-3,3),ri(-3,3),ri(-3,3)],d=-(n[0]*P[0]+n[1]*P[1]+n[2]*P[2]);return KQ("qd","ប្លង់ $(P)\\colon "+poly([n[0],0]).replace(/0$/,"")+co(n[1],"y")+co(n[2],"z")+"+d=0$ កាត់តាម $A"+v3(P)+"$ ។ រក $d$",[A(d,null,"num","d =")],"ជំនួស $A$ ក្នុងសមីការ")}]);
mix(G[102],2,[function(){var A0=[ri(-3,3),ri(-3,3),ri(-3,3)],u=[nz(-3,3),nz(-3,3),nz(-3,3)],n=[nz(-2,2),nz(-2,2),nz(-2,2)],t=nz(-3,3),H=[0,1,2].map(function(i){return A0[i]+t*u[i]}),nu=n[0]*u[0]+n[1]*u[1]+n[2]*u[2];if(!nu)return G[102][2]();var d=-(n[0]*H[0]+n[1]*H[1]+n[2]*H[2]);
   return KQ("ql","បន្ទាត់ $x="+lnr(A0[0],u[0])+"$ , $y="+lnr(A0[1],u[1])+"$ , $z="+lnr(A0[2],u[2])+"$ កាត់ប្លង់ $"+poly([n[0],0]).replace(/0$/,"")+co(n[1],"y")+co(n[2],"z")+sc(d)+"=0$ ត្រង់ $M$ ។ រក $M$",[0,1,2].map(function(i){return A(H[i],null,"num",["x","y","z"][i]+" =")}),"ជំនួស $x,y,z$ ក្នុងប្លង់ ⇒ $t="+t+"$")}]);
mix(G[102],3,[function(){var N=pick([[2,-3,6,7],[1,2,2,3],[2,1,-2,3],[1,-2,2,3],[6,2,3,7]]),H=[ri(-3,3),ri(-3,3),ri(-3,3)],s=nz(-2,2),A0=[0,1,2].map(function(i){return H[i]+s*N[i]}),d=-(N[0]*H[0]+N[1]*H[1]+N[2]*H[2]);
   return KQ("qh","រកកូអរដោនេចំណោលកែង $H$ នៃ $A"+v3(A0)+"$ លើប្លង់ $"+poly([N[0],0]).replace(/0$/,"")+co(N[1],"y")+co(N[2],"z")+sc(d)+"=0$",[0,1,2].map(function(i){return A(H[i],null,"num",["x","y","z"][i]+" =")}),"បន្ទាត់ $AH$ មានវ៉ិចទ័រប្រាប់ទិស $\\vec n"+v3(N.slice(0,3))+"$ ⇒ $t="+(-s)+"$ · ចម្ងាយ $="+Math.abs(s)*N[3]+"$")}]);
/* ===== បន្ថែមពីសៀវភៅលំហាត់ថ្នាក់ទី១២ (គ្រប់មេរៀន) — តែទម្រង់ដែលប្រព័ន្ធមិនទាន់មាន ===== */
function piT(k,d){if(!k)return["0","0"];var g=gcd(k,d);k/=g;d/=g;var a=Math.abs(k),s=k<0?"-":"",c=a===1?"":String(a);
  return[s+c+"pi"+(d===1?"":"/"+d),d===1?s+c+"\\pi":s+"\\frac{"+c+"\\pi}{"+d+"}"]}
function v6(R,x){if(Math.abs(x)<1e-9)return null;var s=x<0?"-":"",a=Math.abs(x);if(Math.abs(a-1)<1e-9)return s+R;var f=fr(R,2);
  if(Math.abs(a-.5)<1e-9)return s+f.t;return s+(f.s==="1"?"":f.t)+"\\sqrt3"}
function w6(R,j){var th=j*Math.PI/6,re=v6(R,Math.cos(th)),im=v6(R,Math.sin(th)),t=re||"";
  if(im){var neg=im[0]==="-",it=im.replace(/^-/,"");t+=(neg?"-":(t?"+":""))+(it==="1"?"":it)+"i"}return t||"0"}
function sqx(v,h){return h?"("+v+sg(-h,0)+")^2":v+"^2"}
function lfx(v,h){return h?"("+v+sg(-h,0)+")":v}
/* ---- ចំនួនកុំផ្លិច ---- */
mix(G[11],2,[
 function(){var p=nz(-4,4),q=nz(-4,4),a=nz(-3,3),b,c;do{b=ri(-3,3);c=nz(-3,3)}while(a*a===b*b+c*c);
   var re=a*p+b*p+c*q,im=a*q+c*p-b*q;
   return KQ("zc","ដោះស្រាយក្នុង $\\mathbb C$ ៖ $"+kx(a,"z")+"+("+cx(b,c)+")\\bar z="+cx(re,im)+"$",[A(cx(p,q),null,"num","z =")],
     "តាង $z=x+yi$ ⇒ $\\bar z=x-yi$ ។ ពន្លាត រួចផ្ទឹមផ្នែកពិត និងផ្នែកនិម្មិត ⇒ ប្រព័ន្ធសមីការពីរនៃ $x, y$ ⇒ $z="+cx(p,q)+"$")},
 function(){var k=pick([2,3,4]),F=pick([["-\\cos A+i\\sin A",12-k],["\\cos A-i\\sin A",-k],["-\\cos A-i\\sin A",k-12],["-\\sin A-i\\cos A",-6-k],["-\\sin A+i\\cos A",6+k],["\\sin A-i\\cos A",k-6],["\\sin A+i\\cos A",6-k]]),
     r=ri(1,3),an=piT(F[1],12),e=F[0].replace(/A/g,"\\frac{\\pi}{"+(12/k)+"}");
   return KQ("zg","សរសេរ $z="+(r>1?r+"\\left("+e+"\\right)":e)+"$ ជាទម្រង់ត្រីកោណមាត្រ $z=r(\\cos\\theta+i\\sin\\theta)$ ដែល $-\\pi<\\theta\\le\\pi$",[A(r,null,"num","r ="),A(an[0],an[1],"num","θ =")],
     "ប្រើ $-\\cos\\alpha=\\cos(\\pi-\\alpha)$ , $\\sin\\alpha=\\cos(\\frac{\\pi}{2}-\\alpha)$ , $\\sin(-\\alpha)=-\\sin\\alpha$ … ⇒ $r="+r+"$ , $\\theta="+an[1]+"$")}],.4);
mix(G[11],3,[
 function(){var a,b,c,d;do{a=ri(-3,3);b=ri(-3,3);c=ri(-3,3);d=ri(-3,3)}while(a===c||b+d===0);
   if(a>c){var t=a;a=c;c=t;t=b;b=d;d=t}
   var S=[a+c,b+d],P=[a*c-b*d,a*d+b*c],D=[(c-a)*(c-a)-(d-b)*(d-b),2*(c-a)*(d-b)];
   return KQ("zk","ដោះស្រាយក្នុង $\\mathbb C$ ៖ $z^2-("+cx(S[0],S[1])+")z+("+cx(P[0],P[1])+")=0$ ។ (យក $z_1$ ជាឫសដែលមានផ្នែកពិតតូចជាង)",[A(cx(a,b),null,"num","z₁ ="),A(cx(c,d),null,"num","z₂ =")],
     "$\\Delta=("+cx(S[0],S[1])+")^2-4("+cx(P[0],P[1])+")="+cx(D[0],D[1])+"=("+cx(c-a,d-b)+")^2$ ⇒ $z=\\dfrac{"+cx(S[0],S[1])+"\\pm("+cx(c-a,d-b)+")}{2}$")},
 function(){var n=pick([2,3,4]),r=pick([1,1,2]),R=Math.pow(r,n),j=pick([1,2,3,4,5,6,7,8,9,10,11]),th=piT(j,6*n),w=piT(j,6)[1];
   return KQ("zn","គេឱ្យ $w="+w6(R,j)+"$ ។ ឫសទី $"+n+"$ នៃ $w$ មានរាង $z_k=r(\\cos\\theta_k+i\\sin\\theta_k)$ ។ រក $r$ និងអាគុយម៉ង់ $\\theta_0$ តូចបំផុតដែល $\\theta_0\\ge0$",[A(r,null,"num","r ="),A(th[0],th[1],"num","θ₀ =")],
     "$w="+R+"\\left(\\cos"+w+"+i\\sin"+w+"\\right)$ ⇒ $r=\\sqrt["+n+"]{"+R+"}="+r+"$ · $\\theta_k=\\dfrac{"+w+"+2k\\pi}{"+n+"}$ ⇒ $\\theta_0="+th[1]+"$")}],.4);
/* ---- លីមីត ---- */
LM2.cr=function(){var m=pick([1,2]),k=ri(-3,6),x0=m*m*m-k,f=fr(1,3*m*m),r="\\sqrt[3]{x"+(k?sg(k,0):"")+"}";
  return LQ("cr",x0,"\\dfrac{"+r+"-"+m+"}{x"+(x0?sg(-x0,0):"")+"}",FA(f),"តាង $t="+r+"\\to"+m+"$ ⇒ $x"+(x0?sg(-x0,0):"")+"=t^3-"+m*m*m+"=(t-"+m+")(t^2+"+(m===1?"":m)+"t+"+m*m+")$ ⇒ $\\frac{1}{"+3*m*m+"}$")};
LM2.ax=function(){var P=[2,3,5,7],a=pick(P),b=pick(P.filter(function(v){return v!==a}));
  return LQ("ax",0,"\\dfrac{"+a+"^x-"+b+"^x}{x}",["ln("+a+")-ln("+b+")","\\ln\\frac{"+a+"}{"+b+"}"],"$\\lim_{x\\to0}\\frac{a^x-1}{x}=\\ln a$ ⇒ $\\ln "+a+"-\\ln "+b+"=\\ln\\frac{"+a+"}{"+b+"}$")};
LM3.pn=function(){var a=pick([1,-1,2]),n=ri(2,5),m;do{m=ri(2,5)}while(m===n||(a===2&&n+m>7));var An=Math.pow(a,n),Am=Math.pow(a,m),f=n>=m?fr(n*Math.pow(a,n-m),m):fr(n,m*Math.pow(a,m-n));
  return LQ("pn",a,"\\dfrac{x^{"+n+"}"+sg(-An,0)+"}{x^{"+m+"}"+sg(-Am,0)+"}",FA(f),"រាង $\\frac00$ · $x^n-a^n=(x-a)(x^{n-1}+ax^{n-2}+\\dots+a^{n-1})$ ⇒ $\\dfrac{n\\,a^{n-1}}{m\\,a^{m-1}}="+f.t+"$")};
LM3.cc=function(){var q=ri(1,4),s;do{s=ri(1,4)}while(s===q);var x0=ri(-2,4),p=q*q-x0,r=s*s-x0,f=fr(s,q),rt=function(c){return"\\sqrt{x"+(c?sg(c,0):"")+"}"};
  return LQ("cc",x0,"\\dfrac{"+rt(p)+"-"+q+"}{"+rt(r)+"-"+s+"}",FA(f),"គុណកន្សោមឆ្លាស់ទាំងភាគយក និងភាគបែង ⇒ $\\dfrac{"+rt(r)+"+"+s+"}{"+rt(p)+"+"+q+"}\\to\\frac{"+2*s+"}{"+2*q+"}="+f.t+"$")};
/* ---- សមីការឌីផេរ៉ង់ស្យែលលំដាប់ទី១ ---- */
mix(G[61],2,[
 function(){var a=nz(-3,3),p=nz(-3,3),q=ri(-3,3),m=a*p,n=p+a*q;
   return KQ("dp","រកចម្លើយពិសេសរាង $y_p=px+q$ នៃសមីការ $y'"+co(a,"y")+"="+polyT([m,n])+"$",[A(p,null,"num","p ="),A(q,null,"num","q =")],
     "$y_p'=p$ ⇒ $p+"+sgp(a)+"(px+q)="+polyT([m,n])+"$ ⇒ $"+a+"p="+m+"$ និង $p+"+sgp(a)+"q="+n+"$ ⇒ $p="+p+"$ , $q="+q+"$")},
 function(){var a=nz(-3,3),b;do{b=nz(-3,3)}while(a+b===0);var C=nz(-3,3),k=C*(a+b),E="e^{"+kx(b)+"}";
   return KQ("dx","រកចម្លើយពិសេសរាង $y_p=C"+E+"$ នៃសមីការ $y'"+co(a,"y")+"="+(k===1?"":k===-1?"-":k)+E+"$",[A(C,null,"num","C =")],
     "$y_p'="+b+"C"+E+"$ ⇒ $("+b+sg(a,0)+")C="+k+"$ ⇒ $C="+C+"$")}],.35);
mix(G[61],3,[
 function(){var a=nz(-3,3),p=nz(-2,2),q=ri(-3,3),m=a*p,n=p+a*q,y0=ri(-3,4),K=y0-q,E="e^{"+kx(-a)+"}";
   return KQ("dg","ដោះស្រាយ $y'"+co(a,"y")+"="+polyT([m,n])+"$ ដែល $y(0)="+y0+"$",[A("("+K+")e^("+(-a)+"x)+("+p+")x+("+q+")",(K?cfT(fr(K,1))+E:"")+co(p,"x",!K)+sc(q),"expr","y =")],
     "ចម្លើយពិសេស $y_p="+polyT([p,q])+"$ · ចម្លើយទូទៅ $y=K"+E+"+"+polyT([p,q])+"$ · $y(0)=K"+sc(q)+"="+y0+"$ ⇒ $K="+K+"$")}],.35);
/* ---- សមីការឌីផេរ៉ង់ស្យែលលំដាប់ទី២ មិនអូម៉ូសែន ---- */
mix(G[62],2,[
 function(){var p=ri(-3,3),q=nz(-4,4),al=nz(-3,3),be=ri(-3,3),m=q*al,n=p*al+q*be;
   return KQ("yn","រកចម្លើយពិសេសរាង $y_p=\\alpha x+\\beta$ នៃ $y''"+co(p,"y'")+co(q,"y")+"="+polyT([m,n])+"$",[A(al,null,"num","α ="),A(be,null,"num","β =")],
     "$y_p'=\\alpha$ , $y_p''=0$ ⇒ $"+q+"\\alpha="+m+"$ និង $"+(p?p+"\\alpha+":"")+q+"\\beta="+n+"$")},
 function(){var p=ri(-3,3),q=ri(-4,4),b,D;do{b=nz(-3,3);D=b*b+p*b+q}while(!D);var C=nz(-3,3),k=C*D,E="e^{"+kx(b)+"}";
   return KQ("ye","រកចម្លើយពិសេសរាង $y_p=C"+E+"$ នៃ $y''"+co(p,"y'")+co(q,"y")+"="+(k===1?"":k===-1?"-":k)+E+"$",[A(C,null,"num","C =")],
     "ជំនួស $y_p$ , $y_p'="+b+"C"+E+"$ , $y_p''="+b*b+"C"+E+"$ ⇒ $C("+b*b+sg(p*b,0)+sg(q,0)+")="+k+"$ ⇒ $C="+C+"$")}],.35);
mix(G[62],3,[
 function(){var p,q;do{p=ri(-3,3);q=ri(-3,5)}while(q===1&&!p);var a=nz(-3,3),b=ri(-3,3),M=(q-1)*a+p*b,N=(q-1)*b-p*a;
   return KQ("ys","រកចម្លើយពិសេសរាង $y_p=a\\cos x+b\\sin x$ នៃ $y''"+co(p,"y'")+co(q,"y")+"="+co(M,"\\cos x",true)+co(N,"\\sin x",!M)+"$",[A(a,null,"num","a ="),A(b,null,"num","b =")],
     "$y_p''=-a\\cos x-b\\sin x$ ⇒ ផ្ទឹមមេគុណ $\\cos x$ ៖ $"+(q-1)+"a"+(p?sg(p,0)+"b":"")+"="+M+"$ · $\\sin x$ ៖ $"+(q-1)+"b"+(p?sg(-p,0)+"a":"")+"="+N+"$")}],.35);
/* ---- កោនិក ---- */
mix(G[81],2,[function(){var h=ri(-3,3),k=ri(-3,3),p=nz(-3,3);
   if(Math.random()<.5)return KQ("pd","ប៉ារ៉ាបូលមានកំពូល $S("+h+";"+k+")$ និងបន្ទាត់ប្រាប់ទិស $y="+(k-p)+"$ ។ សរសេរជា $"+sqx("x",h)+"=K"+lfx("y",k)+"$ រក $K$ និងកំណុំ $F$",[A(4*p,null,"num","K ="),A(h,null,"num","F: x ="),A(k+p,null,"num","F: y =")],
     "$p=y_S-y_d="+p+"$ ⇒ $K=4p="+4*p+"$ · $F(h;k+p)=("+h+";"+(k+p)+")$");
   return KQ("pd","ប៉ារ៉ាបូលមានកំពូល $S("+h+";"+k+")$ និងបន្ទាត់ប្រាប់ទិស $x="+(h-p)+"$ ។ សរសេរជា $"+sqx("y",k)+"=K"+lfx("x",h)+"$ រក $K$ និងកំណុំ $F$",[A(4*p,null,"num","K ="),A(h+p,null,"num","F: x ="),A(k,null,"num","F: y =")],
     "$p=x_S-x_d="+p+"$ ⇒ $K=4p="+4*p+"$ · $F(h+p;k)=("+(h+p)+";"+k+")$")}],.35);
mix(G[82],2,[function(){var T=pick(TRI),a=T[2],c=T[0],e=fr(c,a);
   return KQ("en","អេលីបផ្ចិត $O$ មានកំពូល $(\\pm"+a+";0)$ និងចំណាកផ្ចិត $e="+e.t+"$ ។ រក $b^2$",[A(a*a-c*c,null,"num","b² =")],"$c=ea="+c+"$ · $b^2=a^2-c^2="+a*a+"-"+c*c+"="+(a*a-c*c)+"$")}],.35);
mix(G[83],2,[function(){var T=pick(TRI),c=T[2],a=T[0],h=ri(-3,6),k=ri(-3,3);
   return KQ("hd","ចំណុច $M$ គ្រប់ចំណុចនៃអ៊ីពែបូលផ្ទៀងផ្ទាត់ $|MF_1-MF_2|="+2*a+"$ ដែល $F_1("+(h-c)+";"+k+")$ , $F_2("+(h+c)+";"+k+")$ ។ សរសេរជា $\\dfrac{(x-h)^2}{a^2}-\\dfrac{(y-k)^2}{b^2}=1$",[A(h,null,"num","h ="),A(k,null,"num","k ="),A(a*a,null,"num","a² ="),A(c*c-a*a,null,"num","b² =")],
     "ផ្ចិតជាចំណុចកណ្ដាលនៃ $[F_1F_2]$ ⇒ $("+h+";"+k+")$ · $2a="+2*a+"$ · $c="+c+"$ · $b^2=c^2-a^2="+(c*c-a*a)+"$")}],.35);
mix(G[83],3,[function(){var T=pick([[3,4,5],[4,3,5]]),a=T[0],b=T[1],c=T[2],h=nz(-3,3),k=nz(-3,3),A2=a*a,B2=b*b,e=fr(c,a);
   return KQ("hc","អ៊ីពែបូល $"+B2+"x^2"+co(-2*B2*h,"x")+"-"+A2+"y^2"+co(2*A2*k,"y")+sc(B2*h*h-A2*k*k-A2*B2)+"=0$ ។ រកផ្ចិត $I(h;k)$ និងចំណាកផ្ចិត $e$",[A(h,null,"num","h ="),A(k,null,"num","k ="),A(e.s,e.t,"num","e =")],
     "បំពេញការេ ⇒ $\\dfrac{"+sqx("x",h)+"}{"+A2+"}-\\dfrac{"+sqx("y",k)+"}{"+B2+"}=1$ · $c=\\sqrt{"+A2+"+"+B2+"}="+c+"$ · $e=\\frac ca="+e.t+"$")}],.35);
/* ---- វ៉ិចទ័រក្នុងលំហ · ស្វ៊ែ · ចម្ងាយពីចំណុចទៅបន្ទាត់ ---- */
mix(G[102],1,[function(){var I=[ri(-3,3),ri(-3,3),ri(-3,3)],R=ri(1,5),d=I[0]*I[0]+I[1]*I[1]+I[2]*I[2]-R*R;
   return KQ("sr","ស្វ៊ែ $(S)\\colon x^2+y^2+z^2"+co(-2*I[0],"x")+co(-2*I[1],"y")+co(-2*I[2],"z")+sc(d)+"=0$ ។ រកផ្ចិត $I$ និងកាំ $R$",[A(I[0],null,"num","x =")].concat([A(I[1],null,"num","y ="),A(I[2],null,"num","z ="),A(R,null,"num","R =")]),
     "បំពេញការេ ⇒ $"+sqx("x",I[0])+"+"+sqx("y",I[1])+"+"+sqx("z",I[2])+"="+R*R+"$")}],.35);
mix(G[102],2,[function(){var A0,B0;do{A0=[ri(-3,4),ri(-3,4),ri(-3,4)];B0=A0.map(function(v){return v+2*ri(-3,3)})}while(A0.join()===B0.join());
   var I=A0.map(function(v,i){return(v+B0[i])/2}),R2=I.reduce(function(s,v,i){return s+(A0[i]-v)*(A0[i]-v)},0);
   return KQ("sd","ស្វ៊ែ $(S)$ មានអង្កត់ផ្ចិត $[AB]$ ដែល $A"+v3(A0)+"$ , $B"+v3(B0)+"$ ។ រកផ្ចិត $I$ និង $R^2$",[A(I[0],null,"num","x ="),A(I[1],null,"num","y ="),A(I[2],null,"num","z ="),A(R2,null,"num","R² =")],
     "$I$ ជាចំណុចកណ្ដាលនៃ $[AB]$ ⇒ $I"+v3(I)+"$ · $R^2=IA^2="+R2+"$ ⇒ $(S)\\colon "+sqx("x",I[0])+"+"+sqx("y",I[1])+"+"+sqx("z",I[2])+"="+R2+"$")}],.35);
mix(G[102],3,[function(){var A0=[ri(-3,3),ri(-3,3),ri(-3,3)],u,M,w,c,n2,u2;
   do{u=[ri(-2,2),ri(-2,2),ri(-2,2)];M=[ri(-3,3),ri(-3,3),ri(-3,3)];w=[0,1,2].map(function(i){return M[i]-A0[i]});c=[w[1]*u[2]-w[2]*u[1],w[2]*u[0]-w[0]*u[2],w[0]*u[1]-w[1]*u[0]];n2=c[0]*c[0]+c[1]*c[1]+c[2]*c[2];u2=u[0]*u[0]+u[1]*u[1]+u[2]*u[2]}while(!u2||!n2);
   var f=fr(n2,u2),t=f.d===1?sqS(f.n)[1]:"\\sqrt{"+f.t+"}",L=function(i){return lnr(A0[i],u[i])||"0"};
   return KQ("dl","គណនាចម្ងាយពីចំណុច $M"+v3(M)+"$ ទៅបន្ទាត់ $(L)\\colon x="+L(0)+"$ , $y="+L(1)+"$ , $z="+L(2)+"$",[A("sqrt("+n2+"/"+u2+")",t,"num","d =")],
     "$A"+v3(A0)+"\\in(L)$ , $\\vec u"+v3(u)+"$ · $\\overrightarrow{AM}\\times\\vec u="+v3(c)+"$ ⇒ $d=\\dfrac{\\|\\overrightarrow{AM}\\times\\vec u\\|}{\\|\\vec u\\|}=\\sqrt{\\frac{"+n2+"}{"+u2+"}}="+t+"$")}],.35);
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
var LV={1:["កម្រិត ១","មូលដ្ឋាន"],2:["កម្រិត ២","មធ្យម"],3:["កម្រិត ៣","ពិបាក"],4:["🌍 PISA","បញ្ហាជីវិតពិត"]},NQ=6,NQ4=4;
/* កម្រិតទី ៤ (PISA) មានតែមេរៀនណាដែលកំណត់ G[l][4] */
function lvls(l){var g=GR[S.g]&&GR[S.g].G[l];return g&&g[4]?[1,2,3,4]:[1,2,3]}
/* ថ្នាក់នីមួយៗ៖ GR[ថ្នាក់] = {les:[ជំពូក], G:{មេរៀន:{1,2,3}}} · ថ្នាក់ផ្សេងបន្ថែមដោយ PX.reg() (practice11.js …) */
var GR={12:{les:LES,G:G}};

/* =================== វឌ្ឍនភាព (ក្នុងឧបករណ៍) =================== */
function PK(){return"prac"+S.g}
function prog(){try{return JSON.parse(localStorage.getItem(PK())||"{}")}catch(e){return{}}}
function setProg(l,v){var p=prog();p[l]=p[l]||{};p[l][v]=1;try{localStorage.setItem(PK(),JSON.stringify(p))}catch(e){}if(CL.me)clSend(l,v)}
function HS(x){return(CL.code?"c="+CL.code+"&":"")+x}   /* hash (រក្សាកូដថ្នាក់) */

/* =================== តារាងហាត់របស់ថ្នាក់ (បើកតាមតំណ #c=កូដ) ===================
   pcls/{កូដ} = {o, cls, g, names:[{k,n}], open} (គ្រូបង្កើត) · prt/{កូដ}_{k} = {c,k,n,g,t:{"មេរៀន-កម្រិត":ms},u} (សិស្សសរសេរ · បន្ថែមបានតែប៉ុណ្ណោះ)
   ទាញ Firebase តែក្នុងរបៀបនេះ */
var CL={code:"",cls:null,me:null,db:null,F:null,q:[]};
var FBC={apiKey:"AIzaSyAtfudfLGNHCFYUwGxLM8_lfSZ-jYWQ6J8",authDomain:"math-teacher-system-bt.firebaseapp.com",projectId:"math-teacher-system-bt",storageBucket:"math-teacher-system-bt.firebasestorage.app",messagingSenderId:"134725787928",appId:"1:134725787928:web:50343e4b7c7247833c3e6d"};
function clInit(code){
  CL.code=code;$("app").innerHTML="<p style='text-align:center;margin-top:40px'>កំពុងភ្ជាប់ថ្នាក់…</p>";
  var B="https://www.gstatic.com/firebasejs/10.8.0/";
  return Promise.all([import(B+"firebase-app.js"),import(B+"firebase-firestore.js")]).then(function(m){
    var app=m[0].initializeApp(FBC,"prac");CL.F=m[1];CL.db=m[1].getFirestore(app);
    return CL.F.getDoc(CL.F.doc(CL.db,"pcls",code));
  }).then(function(d){
    if(!d.exists())throw"nf";var c=d.data();if(!c.open)throw"closed";
    CL.cls=c;if(GR[+c.g])S.g=+c.g;
    try{var me=JSON.parse(localStorage.getItem("pracMe_"+code)||"null");if(me&&c.names.some(function(x){return x.k===me.k}))CL.me=me}catch(e){}
    try{CL.q=JSON.parse(localStorage.getItem("pracQ_"+code)||"[]")}catch(e){CL.q=[]}
    if(!CL.me)return pickMe();
    clFlush();route2();
  }).catch(function(e){
    console.error(e);CL.code="";
    $("app").innerHTML="<div class=hero><h1>⚠️ "+(e==="closed"?"តំណហ្វឹកហាត់របស់ថ្នាក់នេះត្រូវបានបិទ":e==="nf"?"រកមិនឃើញតំណហ្វឹកហាត់នេះ":"មិនអាចភ្ជាប់បានទេ")+"</h1><p>"+(e==="closed"||e==="nf"?"សូមសួរគ្រូរបស់អ្នក។":"សូមពិនិត្យអ៊ីនធឺណិត ហើយបើកម្ដងទៀត។")+" អ្នកនៅតែអាចហាត់បាន (ពានរង្វាន់មិនផ្ញើទៅគ្រូទេ)។</p><div class=gtabs><button type=button data-a=solo>ហាត់ដោយមិនភ្ជាប់ថ្នាក់ ›</button></div></div>";
  });
}
function pickMe(){
  var c=CL.cls;
  $("app").innerHTML="<div class=hero><h1>👋 ថ្នាក់ "+esc(c.cls)+"</h1><p>ជ្រើសឈ្មោះរបស់អ្នក (ម្ដងគត់) · ពានរង្វាន់ដែលអ្នកទទួលបាន នឹងផ្ញើទៅគ្រូ</p></div>"+
    "<input id=meQ class=meq placeholder='🔍 ស្វែងរកឈ្មោះ…' autocomplete=off><div class=mel>"+c.names.map(function(x){return"<button type=button data-me='"+esc(x.k)+"'>"+esc(x.n)+"</button>"}).join("")+"</div>";
  $("meQ").oninput=function(){var q=this.value.trim().toLowerCase();[].forEach.call($("app").querySelectorAll("[data-me]"),function(b){b.hidden=q&&b.textContent.toLowerCase().indexOf(q)<0})};
}
function clSend(l,v){
  CL.q.push([l,v,Date.now()]);try{localStorage.setItem("pracQ_"+CL.code,JSON.stringify(CL.q))}catch(e){}
  clFlush();
}
/* ផ្ញើពានរង្វាន់ដែលនៅសល់ (បើអ៊ីនធឺណិតដាច់ នឹងផ្ញើលើកក្រោយ) · ១ ការសរសេរ ក្នុងមួយដង */
function clFlush(){
  if(!CL.db||!CL.me||!CL.q.length)return;
  var t={},q=CL.q.slice();q.forEach(function(x){t[x[0]+"-"+x[1]]=x[2]});
  CL.F.setDoc(CL.F.doc(CL.db,"prt",CL.code+"_"+CL.me.k),{c:CL.code,k:CL.me.k,n:CL.me.n,g:+CL.cls.g,t:t,u:CL.F.serverTimestamp()},{merge:true}).then(function(){
    CL.q=CL.q.slice(q.length);try{localStorage.setItem("pracQ_"+CL.code,JSON.stringify(CL.q))}catch(e){}
  },function(e){console.warn("prt:",e)});
}
window.addEventListener("online",function(){clFlush()});
function cupHtml(l){var p=prog()[l]||{};return lvls(l).map(function(v){return"<i class='cup"+(p[v]?" on":"")+" l"+v+"' title='"+LV[v][0]+"'>🏆</i>"}).join("")}

/* =================== បង្ហាញ =================== */
var S={g:12,l:0,v:1,qs:[],done:false};
function grades(){return Object.keys(GR).map(Number).sort(function(a,b){return a-b})}
function math(el){if(window.renderMathInElement)try{renderMathInElement(el,{delimiters:[{left:"$$",right:"$$",display:true},{left:"$",right:"$",display:false}],throwOnError:false})}catch(e){}}
function home(){
  S.l=0;location.hash=HS("g="+S.g);
  var tot=0,got=0,p=prog();
  var h="<div class=hero><h1>🧮 ហ្វឹកហាត់បន្ថែម គណិតវិទ្យា ថ្នាក់ទី"+kn(S.g)+"</h1><p>ជ្រើសមេរៀន · ជ្រើសកម្រិត · ដោះស្រាយ · ចុច «ពិនិត្យ» · ឆ្លើយត្រូវទាំងអស់ ទទួលបានពានរង្វាន់ 🏆</p>"+
    (CL.me?"<div class=gtabs><span class=me>👤 "+esc(CL.me.n)+" · ថ្នាក់ "+esc(CL.cls.cls)+"</span><button type=button data-a=chme>ប្ដូរឈ្មោះ</button></div>":
    "<div class=gtabs>"+grades().map(function(g){return"<button type=button data-g="+g+(g===S.g?" class=on":"")+">ថ្នាក់ទី"+kn(g)+"</button>"}).join("")+"</div>")+"</div>";
  GR[S.g].les.forEach(function(ch){
    h+="<section class=ch><h2>"+esc(ch[0])+"</h2><div class=cards>"+ch[1].map(function(l){var L=lvls(l[0]),q=p[l[0]]||{};tot+=L.length;L.forEach(function(v){if(q[v])got++});
      return"<button type=button class=card data-l="+l[0]+"><b>"+esc(l[1])+"</b><span class=cups>"+cupHtml(l[0])+"</span></button>"}).join("")+"</div></section>";
  });
  h+="<p class=tot>🏆 ពានរង្វាន់សរុប៖ <b>"+kn(got)+"</b> / "+kn(tot)+(got?" · <button type=button class=link data-a=reset>លុបវឌ្ឍនភាព</button>":"")+"</p>";
  $("app").innerHTML=h;
}
function lname(l){var n="";GR[S.g].les.forEach(function(c){c[1].forEach(function(x){if(x[0]===l)n=x[1]})});return n}
function open(l,v){
  S.l=l;S.v=v||1;S.done=false;S.qs=[];
  var seen={};
  var kind={};   /* ប្រភេទដូចគ្នា (ពាក្យដើមនៃសំណួរ) មិនលើស ២ */
  if(!GR[S.g].G[l][S.v])S.v=1;var nq=S.v===4?NQ4:NQ;
  for(var i=0,tries=0;i<nq&&tries<80;tries++){var q=GR[S.g].G[l][S.v]();var k=q.q,t=q.kd?"kd:"+q.kd:k.replace(/\$[^$]*\$/g,"").slice(0,24)+(q.q.match(/\\(ln|sin|cos|sqrt|log)|e\^/)||[""])[0];
    if(seen[k]||(kind[t]>=2&&tries<50))continue;seen[k]=1;kind[t]=(kind[t]||0)+1;q.tries=0;S.qs.push(q);i++}
  location.hash=HS("g="+S.g+"&l="+l+"&v="+S.v);
  draw();window.scrollTo(0,0);
}
/* ⏱ ដំណោះស្រាយបើកតែក្រោយ៖ (១) ព្យាយាមឆ្លើយយ៉ាងតិច ១ ដង និង (២) គិតលើលំហាត់នោះគ្រប់រយៈពេលតាមកម្រិត
   គិតម៉ោងពីពេលសិស្សចាប់ផ្ដើមវាយចម្លើយលំហាត់នោះ (q.t0) · ឆ្លើយត្រូវ → មើលបានភ្លាម */
var SOLT={1:120,2:240,3:360,4:360};
function solT(){var t=SOLT[S.v]||180;return S.g<=9?Math.round(t*.75):t}
function solLeft(q){return q.t0?Math.max(0,Math.ceil(solT()-(Date.now()-q.t0)/1000)):solT()}
function mmss(s){return kn(Math.floor(s/60)+":"+("0"+s%60).slice(-2))}
function solBtn(q,i){
  if(q.show||q.st==="ok"||(q.tries>=1&&solLeft(q)<=0))return"<button type=button class=sol-b data-sol="+i+">💡 "+(q.show?"លាក់ដំណោះស្រាយ":"មើលដំណោះស្រាយ")+"</button>";
  if(q.tries>=1)return"<button type=button class='sol-b lk' disabled data-lk="+i+">🔒 ដំណោះស្រាយបើកក្នុង <b>"+mmss(solLeft(q))+"</b> · សាកគិតម្ដងទៀត 💪</button>";
  return"";
}
function draw(){
  var l=S.l,v=S.v;
  var h="<div class=bar><button type=button data-a=home>‹ មេរៀនទាំងអស់</button><h1>"+esc(lname(l))+"</h1><span class=cups>"+cupHtml(l)+"</span><button type=button data-a=qr title='តំណ/QR សម្រាប់ចែករំលែក'>📱</button></div>"+
    "<div class=lv style='grid-template-columns:repeat("+lvls(l).length+",1fr)'>"+lvls(l).map(function(k){return"<button type=button class='l"+k+(k===v?" on":"")+"' data-v="+k+">"+LV[k][0]+"<small>"+LV[k][1]+"</small></button>"}).join("")+"</div><ol class=qs>";
  S.qs.forEach(function(q,i){
    h+="<li class='q"+(q.st?" "+q.st:"")+"' id=q"+i+"><div class=qt>"+q.q+"</div>"+(q.fig&&window.FIG?FIG.svg(q.fig):"")+"<div class=ans>"+
      q.a.map(function(a,j){return"<label class=in>"+(a.l?"<span class=lb>"+esc(a.l)+"</span>":"")+"<input data-q="+i+" data-p="+j+" autocomplete=off autocapitalize=off spellcheck=false inputmode=text value='"+esc(a.u||"")+"'"+(q.st==="ok"?" readonly":"")+"><span class=mk>"+(a.r==null?"":a.r?"✅":"❌")+"</span><span class=pv id=pv"+i+"_"+j+"></span></label>"}).join("")+
      "</div>"+solBtn(q,i)+
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
    any=true;if(!q.t0)q.t0=Date.now();
    q.a.forEach(function(a){var r=a.u&&a.u.trim()?check(a.u,a.v,a.k):{ok:false};a.r=r.ok;if(!r.ok)ok=false});
    q.st=ok?"ok":"bad";if(!ok){q.tries++;all=false}
  });
  if(!any&&!S.qs.every(function(q){return q.st==="ok"})){alert("សូមសរសេរចម្លើយយ៉ាងតិចមួយ");return}
  draw();
  var n=S.qs.filter(function(q){return q.st==="ok"}).length;
  if(n===S.qs.length&&!S.done){S.done=true;setProg(S.l,S.v);trophy()}
}
function trophy(){
  var d=document.createElement("div");d.className="tro";d.innerHTML="<div class=tro-in><div class=big>🏆</div><h2>អស្ចារ្យណាស់!</h2><p>អ្នកឆ្លើយត្រូវទាំងអស់ "+esc(LV[S.v][0])+"<br>"+esc(lname(S.l))+"</p>"+(S.v<lvls(S.l).length?"<button type=button data-next>បន្តទៅ "+LV[S.v+1][0]+" ›</button>":"<button type=button data-home>ជ្រើសមេរៀនផ្សេង</button>")+"</div>";
  document.body.appendChild(d);
  d.onclick=function(e){if(e.target.closest("[data-next]"))open(S.l,S.v+1);else if(e.target.closest("[data-home]"))home();d.remove();if(!e.target.closest("button"))draw()};
  draw();
}
function qr(){
  var u=location.origin+location.pathname+"#"+HS("g="+S.g+"&l="+S.l+"&v="+S.v),d=document.createElement("div");d.className="tro";
  d.innerHTML="<div class=tro-in><h2>📱 ចែករំលែកលំហាត់នេះ</h2><div id=qrb class=qrb></div><input value='"+esc(u)+"' readonly onclick='this.select()'><button type=button data-x>បិទ</button></div>";
  document.body.appendChild(d);d.onclick=function(e){if(e.target===d||e.target.closest("[data-x]"))d.remove()};
  var go=function(){try{new QRCode($("qrb"),{text:u,width:220,height:220})}catch(e){}};
  if(window.QRCode)go();else{var s=document.createElement("script");s.src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js";s.onload=go;document.head.appendChild(s)}
}
/* ---------- ក្ដារចុចនិមិត្តសញ្ញាគណិត ---------- */
var KEYS=[["√","√("],["π","π"],["i","i"],["x","x"],["^","^"],["²","^2"],["⁄","/"],["(","("],[")",")"],["e","e"],["ln","ln("],["∞","∞"],["sin","sin("],["cos","cos("],["−","-"],["⌫","BS"]];
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
    if(b.dataset.me!=null){var x=CL.cls.names.filter(function(n){return n.k===b.dataset.me})[0];if(!x)return;CL.me=x;try{localStorage.setItem("pracMe_"+CL.code,JSON.stringify(x))}catch(e){}clFlush();return home()}
    if(b.dataset.g){S.g=+b.dataset.g;try{localStorage.setItem("pracG",S.g)}catch(x){}return home()}
    if(b.dataset.l)return open(+b.dataset.l,1);
    if(b.dataset.v)return open(S.l,+b.dataset.v);
    if(b.dataset.sol!=null){var q=S.qs[+b.dataset.sol];q.show=!q.show;return draw()}
    var a=b.dataset.a;
    if(a==="chme"){if(confirm("ប្ដូរឈ្មោះ? (សូមជ្រើសតែឈ្មោះរបស់ខ្លួនឯងប៉ុណ្ណោះ)")){CL.me=null;try{localStorage.removeItem("pracMe_"+CL.code)}catch(e){}pickMe()}return}
    if(a==="solo"){location.hash="";return route()}
    if(a==="home")home();else if(a==="check")doCheck();else if(a==="new")open(S.l,S.v);else if(a==="qr")qr();
    else if(a==="reset"){if(confirm("លុបពានរង្វាន់ថ្នាក់ទី"+kn(S.g)+" ទាំងអស់នៅលើឧបករណ៍នេះ?")){try{localStorage.removeItem(PK())}catch(x){}home()}}
  });
  app.addEventListener("input",function(e){
    var t=e.target;if(t.dataset.q==null)return;var qq=S.qs[+t.dataset.q];if(!qq.t0)qq.t0=Date.now();var a=qq.a[+t.dataset.p];a.u=t.value;a.r=null;
    var mk=t.parentNode.querySelector(".mk");if(mk)mk.textContent="";preview(t);
  });
  setInterval(function(){[].forEach.call(document.querySelectorAll("[data-lk]"),function(b){var i=+b.dataset.lk,q=S.qs[i];if(!q)return;var l=solLeft(q);
    if(l<=0)b.outerHTML="<button type=button class=sol-b data-sol="+i+">💡 មើលដំណោះស្រាយ</button>";else{var x=b.querySelector("b");if(x)x.textContent=mmss(l)}})},1000);
  app.addEventListener("keydown",function(e){if(e.key==="Enter"&&e.target.dataset.q!=null){e.preventDefault();doCheck()}});
  document.addEventListener("focusin",function(e){var t=e.target;if(t.dataset&&t.dataset.q!=null){lastInp=t;$("kb").hidden=false}});
  document.addEventListener("focusout",function(e){setTimeout(function(){var a=document.activeElement;if(!a||a.dataset.q==null)$("kb").hidden=true},150)});
}
function route(){
  var c=/c=([A-Za-z0-9_-]{4,40})/.exec(location.hash);
  if(c&&c[1]!==CL.code)return clInit(c[1]);
  route2();
}
function route2(){
  var g=/g=(\d+)/.exec(location.hash),m=/l=(\d+)(?:&v=(\d))?/.exec(location.hash),lg=0;try{lg=+localStorage.getItem("pracG")||0}catch(x){}
  S.g=CL.cls&&GR[+CL.cls.g]?+CL.cls.g:g&&GR[+g[1]]?+g[1]:GR[lg]?lg:12;
  if(m&&GR[S.g].G[+m[1]])open(+m[1],+m[2]||1);else home();
}
window.PRACT={parse:parse,check:check,tex:tex,G:G,S:S,GR:GR};
/* ជំនួយសម្រាប់ឯកសារថ្នាក់ផ្សេង (practice11.js …) */
window.PX={LIM11:LIM11,Q:Q,A:A,ri:ri,nz:nz,pick:pick,fr:fr,sg:sg,co:co,poly:poly,polyT:polyT,cx:cx,cxf:cxf,cxT:cxT,cnk:cnk,sgp:sgp,v3:v3,gcd:gcd,G12:G,
  reg:function(g,o){GR[g]=o},start:function(){kb();bind();route()}};
})();
