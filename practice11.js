/* ========================================================================
   🧮 ហាត់លំហាត់ ថ្នាក់ទី១១ — ២១ មេរៀន × ៣ កម្រិត (បង្កើតដោយកូដ)
   មិនមាន៖ វិចារអនុមានរួម (ការស្រាយបញ្ជាក់) · បន្ទាត់និងប្លង់ស្របក្នុងលំហ (ការវែកញែកលំហ) → ប្រើធនាគារលំហាត់របស់គ្រូ
   ត្រូវផ្ទុកបន្ទាប់ពី practice.js (ប្រើ window.PX)
   ======================================================================== */
(function(){
"use strict";
var X=window.PX,Q=X.Q,A=X.A,ri=X.ri,nz=X.nz,pick=X.pick,fr=X.fr,sg=X.sg,co=X.co,poly=X.poly,polyT=X.polyT,cnk=X.cnk,sgp=X.sgp,v3=X.v3;
function fact(n){var r=1;for(var i=2;i<=n;i++)r*=i;return r}
function seqFig(f,a,b){return"dots y="+f+" ["+a+","+b+"]"}
var G={};
/* ===== ជំពូកទី១ ស្វ៊ីត ===== */
G[11]={1:function(){var a=nz(-4,4),b=ri(-6,6),k=ri(3,9);
    return Q("ស្វ៊ីត $u_n="+co(a,"n",true)+(b?sg(b,0):"")+"$ ។ គណនា $u_{"+k+"}$",[A(a*k+b,null,"num","u"+k+" =")],"$u_{"+k+"}="+a+"\\cdot"+k+sg(b,0)+"="+(a*k+b)+"$",seqFig(poly([a,b]),1,8))},
  2:function(){var a=nz(-3,3),b=ri(-4,4),u1=ri(-3,5),u2=a*u1+b,u3=a*u2+b;
    return Q("ស្វ៊ីត $u_1="+u1+"$ និង $u_{n+1}="+co(a,"u_n",true)+(b?sg(b,0):"")+"$ ។ គណនា $u_3$",[A(u3,null,"num","u₃ =")],"$u_2="+u2+"$ · $u_3="+u3+"$")},
  3:function(){var a=nz(1,4),b=ri(-5,5),c=ri(1,4),n=ri(2,8),v=fr(a*n+b,n+c);
    return Q("ស្វ៊ីត $u_n=\\dfrac{"+co(a,"n",true)+(b?sg(b,0):"")+"}{n+"+c+"}$ ។ គណនា $u_{"+n+"}$ និង $\\lim u_n$",[A(v.s,v.t,"num","u"+n+" ="),A(a,null,"num","lim =")],"$u_{"+n+"}="+v.t+"$ · $\\lim\\limits_{n\\to+\\infty}u_n=\\frac{"+a+"}{1}="+a+"$",seqFig("("+poly([a,b])+")/(x+"+c+")",1,10))}};
G[12]={1:function(){var u1=ri(-5,8),d=nz(-4,5),n=ri(5,15),un=u1+(n-1)*d;
    return Q("ស្វ៊ីតនព្វន្ត $u_1="+u1+"$ និងផលសង $d="+d+"$ ។ គណនា $u_{"+n+"}$",[A(un,null,"num","u"+n+" =")],"$u_n=u_1+(n-1)d$ ⇒ $u_{"+n+"}="+u1+"+"+(n-1)+"\\cdot"+sgp(d)+"="+un+"$",seqFig(u1+"+(x-1)*"+sgp(d),1,8))},
  2:function(){var u1=ri(-5,8),d=nz(-4,5),m=ri(2,5),k=m+ri(2,6),um=u1+(m-1)*d,uk=u1+(k-1)*d;
    return Q("ស្វ៊ីតនព្វន្តមាន $u_{"+m+"}="+um+"$ និង $u_{"+k+"}="+uk+"$ ។ រក $d$ និង $u_1$",[A(d,null,"num","d ="),A(u1,null,"num","u₁ =")],"$u_{"+k+"}-u_{"+m+"}="+(k-m)+"d="+(uk-um)+"$ ⇒ $d="+d+"$ · $u_1=u_{"+m+"}-"+(m-1)+"d="+u1+"$")},
  3:function(){var u1=ri(-5,8),d=nz(-3,5),n=ri(8,20),S=n*(2*u1+(n-1)*d)/2;
    return Q("គណនាផលបូក $S_{"+n+"}$ នៃតួ $"+n+"$ ដំបូងនៃស្វ៊ីតនព្វន្ត $u_1="+u1+"$ , $d="+d+"$",[A(S,null,"num","S =")],"$S_n=\\frac{n}{2}[2u_1+(n-1)d]=\\frac{"+n+"}{2}["+(2*u1)+"+"+(n-1)+"\\cdot"+sgp(d)+"]="+S+"$")}};
G[13]={1:function(){var u1=nz(-3,4),q=pick([2,3,-2,-3]),n=ri(3,6),un=u1*Math.pow(q,n-1);
    return Q("ស្វ៊ីតធរណីមាត្រ $u_1="+u1+"$ និងផលធៀប $q="+q+"$ ។ គណនា $u_{"+n+"}$",[A(un,null,"num","u"+n+" =")],"$u_n=u_1q^{n-1}$ ⇒ $u_{"+n+"}="+u1+"\\cdot("+q+")^{"+(n-1)+"}="+un+"$",seqFig(u1+"*("+q+")^(x-1)",1,5))},
  2:function(){var u1=nz(-3,3),q=pick([2,3,-2,1/2]),u2=u1*q,u5=u1*Math.pow(q,4),qq=q===1/2?"1/2":String(q);
    return Q("ស្វ៊ីតធរណីមាត្រមាន $u_2="+fr(u2*2,2).t+"$ និង $u_5="+fr(Math.round(u5*16),16).t+"$ ។ រកផលធៀប $q$",[A(qq,q===1/2?"\\frac12":qq,"num","q =")],"$\\frac{u_5}{u_2}=q^3$ ⇒ $q="+(q===1/2?"\\frac12":q)+"$")},
  3:function(){var u1=nz(1,4),q=pick([2,3,-2]),n=ri(4,7),S=u1*(Math.pow(q,n)-1)/(q-1);
    return Q("គណនាផលបូក $S_{"+n+"}=u_1+u_2+\\dots+u_{"+n+"}$ នៃស្វ៊ីតធរណីមាត្រ $u_1="+u1+"$ , $q="+q+"$",[A(S,null,"num","S =")],"$S_n=u_1\\dfrac{q^n-1}{q-1}="+u1+"\\cdot\\dfrac{("+q+")^{"+n+"}-1}{"+(q-1)+"}="+S+"$")}};
G[14]={1:function(){var n=ri(10,60);return Q("គណនា $1+2+3+\\dots+"+n+"$",[A(n*(n+1)/2,null,"num","S =")],"$\\sum_{k=1}^{n}k=\\frac{n(n+1)}{2}=\\frac{"+n+"\\cdot"+(n+1)+"}{2}="+(n*(n+1)/2)+"$")},
  2:function(){var n=ri(5,15),a=nz(1,4),b=ri(-3,5),S=a*n*(n+1)/2+b*n;
    return Q("គណនា $\\displaystyle\\sum_{k=1}^{"+n+"}("+co(a,"k",true)+(b?sg(b,0):"")+")$",[A(S,null,"num","S =")],"$="+a+"\\sum k"+(b?sg(b,0)+"\\cdot"+n:"")+"="+a+"\\cdot\\frac{"+n+"\\cdot"+(n+1)+"}{2}"+(b?sg(b*n,0):"")+"="+S+"$")},
  3:function(){if(Math.random()<.5){var n=ri(4,12),S=n*(n+1)*(2*n+1)/6;return Q("គណនា $1^2+2^2+\\dots+"+n+"^2$",[A(S,null,"num","S =")],"$\\sum k^2=\\frac{n(n+1)(2n+1)}{6}="+S+"$")}
    var n=ri(5,30),f=fr(n,n+1);return Q("គណនា $\\displaystyle\\sum_{k=1}^{"+n+"}\\frac{1}{k(k+1)}$",[A(f.s,f.t,"num","S =")],"$\\frac{1}{k(k+1)}=\\frac1k-\\frac1{k+1}$ ⇒ ផលបូកតេឡេស្កុប $=1-\\frac{1}{"+(n+1)+"}="+f.t+"$")}};
G[15]={1:function(){var a=pick([2,3,-1,1/2]),b=nz(-6,6),l=fr(b*(a===1/2?2:1),a===1/2?1:1-a);
    return Q("ស្វ៊ីត $u_{n+1}="+(a===1/2?"\\frac12":a===-1?"-":a)+"u_n"+sg(b,0)+"$ ។ រកចំនួន $\\ell$ ដែល $\\ell="+(a===1/2?"\\frac12":a===-1?"-":a)+"\\ell"+sg(b,0)+"$",[A(l.s,l.t,"num","ℓ =")],"$\\ell(1-"+(a===1/2?"\\frac12":sgp(a))+")="+b+"$ ⇒ $\\ell="+l.t+"$")},
  2:function(){var a=pick([2,3,-2]),b=nz(-6,6),l=fr(b,1-a);
    return Q("$u_{n+1}="+a+"u_n"+sg(b,0)+"$ ។ តាង $v_n=u_n-\\ell$ ដែល $\\ell="+l.t+"$ ។ $(v_n)$ ជាស្វ៊ីតធរណីមាត្រ ផលធៀប $q=\\dots$",[A(a,null,"num","q =")],"$v_{n+1}=u_{n+1}-\\ell="+a+"u_n"+sg(b,0)+"-\\ell="+a+"(u_n-\\ell)$ ⇒ $q="+a+"$")},
  3:function(){var a=pick([2,3]),b=nz(-4,4),u1=ri(-3,5),l=fr(b,1-a),c=fr(u1*l.d-l.n,l.d);
    return Q("$u_1="+u1+"$ , $u_{n+1}="+a+"u_n"+sg(b,0)+"$ ។ សរសេរតួទូទៅ $u_n$ ជាអនុគមន៍នៃ $n$",[A("("+c.s+")*"+a+"^(n-1)+("+l.s+")","\\left("+c.t+"\\right)"+a+"^{n-1}"+(l.n<0?"":"+")+l.t,"expr","uₙ =")],
      "$\\ell="+l.t+"$ · $v_n=v_1q^{n-1}$ ដែល $v_1=u_1-\\ell="+c.t+"$ ⇒ $u_n="+c.t+"\\cdot"+a+"^{n-1}"+(l.n<0?"":"+")+l.t+"$")}};
/* ===== ជំពូកទី២ អិចស្ប៉ូណង់ស្យែល លោការីត ===== */
G[21]={1:function(){var b=pick([2,3,5]),n=ri(2,5),k=nz(-2,3);
    return Q("ដោះស្រាយ $"+b+"^{x"+sg(k,0)+"}="+Math.pow(b,n)+"$",[A(n-k,null,"num","x =")],"$x"+sg(k,0)+"="+n+"$ ⇒ $x="+(n-k)+"$")},
  2:function(){var b=pick([2,3]),p=ri(1,3),q=ri(0,p-1);if(p===q)p++;var P=Math.pow(b,p),Qn=Math.pow(b,q);
    return Q("ដោះស្រាយ $"+(b*b)+"^x-"+(P+Qn)+"\\cdot "+b+"^x+"+(P*Qn)+"=0$ (ឫសតូចជាមុន)",[A(q,null,"num","x₁ ="),A(p,null,"num","x₂ =")],"តាង $t="+b+"^x>0$ ៖ $t^2-"+(P+Qn)+"t+"+(P*Qn)+"=0\\iff t="+Qn+"$ ឬ $t="+P+"$ ⇒ $x="+q+"$ ឬ $x="+p+"$")},
  3:function(){var a=pick([2,3]),m=ri(1,3),n=ri(1,4);   /* a^(2x-1) = a^(n) ... */
    var r=fr(n+m,2);
    return Q("ដោះស្រាយ $"+a+"^{2x-"+m+"}="+Math.pow(a,n)+"$",[A(r.s,r.t,"num","x =")],"$2x-"+m+"="+n+"$ ⇒ $x="+r.t+"$","y="+a+"^(2x-"+m+")\nasym y="+Math.pow(a,n))}};
G[22]={1:function(){var b=pick([2,3,5,10]),m=ri(0,4),n=ri(0,3);
    return Q("គណនា $\\log_{"+b+"}"+Math.pow(b,m)+"+\\log_{"+b+"}"+Math.pow(b,n)+"$",[A(m+n)],"$\\log_b b^m=m$ ⇒ $"+m+"+"+n+"="+(m+n)+"$")},
  2:function(){var b=pick([2,3,5]),n=ri(1,3),k=ri(-3,4),x=Math.pow(b,n)+k;
    return Q("ដោះស្រាយ $\\log_{"+b+"}(x"+sg(-k,0)+")="+n+"$",[A(x,null,"num","x =")],"$x"+sg(-k,0)+"="+b+"^{"+n+"}="+Math.pow(b,n)+"$ ⇒ $x="+x+"$","y=ln(x"+sg(-k,0)+")/ln("+b+")\nasym y="+n)},
  3:function(){var T=pick([[2,4,2,3],[2,4,3,2],[2,8,4,5],[2,8,6,4],[3,9,6,3],[3,9,8,2]]),b=T[0],x=T[1],k=T[2],n=T[3];
    return Q("ដោះស្រាយ $\\log_{"+b+"} x+\\log_{"+b+"}(x-"+k+")="+n+"$",[A(x,null,"num","x =")],"លក្ខខណ្ឌ $x>"+k+"$ · $x(x-"+k+")="+b+"^{"+n+"}$ ⇒ $x="+x+"$")}};
/* ===== ជំពូកទី៣ ត្រីកោណមាត្រ ===== */
var TV=[["0","0","1"],["pi/6","1/2","sqrt(3)/2"],["pi/4","sqrt(2)/2","sqrt(2)/2"],["pi/3","sqrt(3)/2","1/2"],["pi/2","1","0"],["2pi/3","sqrt(3)/2","-1/2"],["3pi/4","sqrt(2)/2","-sqrt(2)/2"],["5pi/6","1/2","-sqrt(3)/2"],["pi","0","-1"]];
function AN(s){var m=/^(\d*)pi(?:\/(\d+))?$/.exec(s);return m?(+(m[1]||1))*Math.PI/(+(m[2]||1)):+s}   /* "2pi/3" → លេខ */
function TT(s){return s.replace(/sqrt\((\d)\)/g,"\\sqrt$1").replace(/(\d)pi\/(\d)/,"\\frac{$1\\pi}{$2}").replace(/^pi\/(\d)/,"\\frac{\\pi}{$1}").replace(/^pi$/,"\\pi").replace(/(-?)([^/]+)\/(\d)/,"$1\\frac{$2}{$3}")}
G[31]={1:function(){var t=pick(TV.slice(1)),f=pick(["sin","cos"]);
    return Q("គណនា $\\"+f+"\\left("+TT(t[0])+"\\right)$",[A(f==="sin"?t[1]:t[2],TT(f==="sin"?t[1]:t[2]))],"តម្លៃពិសេសលើរង្វង់ត្រីកោណមាត្រ","circle O 1 gray\nM("+Math.cos(AN(t[0])).toFixed(3)+","+Math.sin(AN(t[0])).toFixed(3)+")\nvec O M\nA(1,0)\nangle A O M\nwindow x=-1.5..1.5 y=-1.5..1.5")},
  2:function(){var k=ri(2,6),f=pick(["sin","cos"]),T=fr(2,k);
    return Q("រកខួប $T$ នៃអនុគមន៍ $y=\\"+f+" "+k+"x$",[A(T.s+"pi",(T.n===1?"":T.n)+(T.d===1?"\\pi":"\\frac{"+(T.n===1?"":T.n)+"\\pi}{"+T.d+"}").replace(/^(\d)\\frac/,"\\frac"),"num","T =")],"$T=\\frac{2\\pi}{"+k+"}$","y="+f+"("+k+"x)\nwindow x=-3.2..3.2 y=-1.5..1.5")},
  3:function(){var a=nz(-4,4),b=ri(-3,3),f=pick(["sin","cos"]),A0=Math.abs(a);
    return Q("រកតម្លៃអតិបរមា $M$ និងអប្បបរមា $m$ នៃ $y="+(a===1?"":a===-1?"-":a)+"\\"+f+" x"+(b?sg(b,0):"")+"$",[A(A0+b,null,"num","M ="),A(-A0+b,null,"num","m =")],"$-1\\le\\"+f+" x\\le1$ ⇒ $"+(-A0+b)+"\\le y\\le"+(A0+b)+"$","y="+a+f+"(x)"+(b?sg(b,0):"")+"\nwindow x=-6.3..6.3 y="+(-A0+b-1)+".."+(A0+b+1))}};
G[32]={1:function(){var T=pick([[3,4,5],[4,3,5],[5,12,13],[12,5,13],[8,15,17]]),s=fr(T[0],T[2]),c=fr(T[1],T[2]),r=fr(2*T[0]*T[1],T[2]*T[2]);
    return Q("$\\alpha$ ជាមុំស្រួច ហើយ $\\sin\\alpha="+s.t+"$ ។ គណនា $\\cos\\alpha$ និង $\\sin 2\\alpha$",[A(c.s,c.t,"num","cos α ="),A(r.s,r.t,"num","sin 2α =")],"$\\cos\\alpha=\\sqrt{1-\\sin^2\\alpha}="+c.t+"$ · $\\sin2\\alpha=2\\sin\\alpha\\cos\\alpha="+r.t+"$")},
  2:function(){var T=pick([[3,4,5],[4,3,5],[5,12,13],[8,15,17]]),c2=fr(T[1]*T[1]-T[0]*T[0],T[2]*T[2]),c=fr(T[1],T[2]);
    return Q("$\\cos\\alpha="+c.t+"$ ($\\alpha$ ស្រួច)។ គណនា $\\cos 2\\alpha$",[A(c2.s,c2.t,"num","cos 2α =")],"$\\cos2\\alpha=2\\cos^2\\alpha-1="+c2.t+"$")},
  3:function(){var a=nz(-3,4),b=nz(-3,4);while(a*b===1)b++;var r=fr(a+b,1-a*b);
    return Q("គេឱ្យ $\\tan a="+a+"$ និង $\\tan b="+b+"$ ។ គណនា $\\tan(a+b)$",[A(r.s,r.t,"num","tan(a+b) =")],"$\\tan(a+b)=\\dfrac{\\tan a+\\tan b}{1-\\tan a\\tan b}=\\dfrac{"+(a+b)+"}{"+(1-a*b)+"}="+r.t+"$")}};
G[33]={1:function(){var C=pick([["sin",.5,"pi/6","\\frac12"],["sin",Math.sqrt(3)/2,"pi/3","\\frac{\\sqrt3}{2}"],["sin",Math.SQRT1_2,"pi/4","\\frac{\\sqrt2}{2}"],["cos",.5,"pi/3","\\frac12"],["cos",-.5,"2pi/3","-\\frac12"],["cos",0,"pi/2","0"],["cos",-Math.SQRT1_2,"3pi/4","-\\frac{\\sqrt2}{2}"]]);
    return Q("រកឫសតូចបំផុតក្នុង $[0;\\pi]$ នៃសមីការ $\\"+C[0]+" x="+C[3]+"$",[A(C[2],TT(C[2]),"num","x =")],"$\\"+C[0]+"\\left("+TT(C[2])+"\\right)="+C[3]+"$","y="+C[0]+"(x)\nasym y="+C[1].toFixed(4)+"\nwindow x=-0.5..3.5 y=-1.4..1.4")},
  2:function(){var C=pick([["\\sqrt3","pi/3"],["1","pi/4"],["\\frac{1}{\\sqrt3}","pi/6"],["-1","3pi/4"],["-\\sqrt3","2pi/3"]]);
    return Q("ដោះស្រាយ $\\tan x="+C[0]+"$ ក្នុងចន្លោះ $(0;\\pi)$",[A(C[1],TT(C[1]),"num","x =")],"$\\tan"+TT(C[1])+"="+C[0]+"$")},
  3:function(){var p=pick([[1,"1/2","pi/6","5pi/6"],[2,"1/2","pi/6","5pi/6"]]);
    return Q("ដោះស្រាយ $2\\sin^2 x-3\\sin x+1=0$ ក្នុង $[0;\\pi]$ ៖ សរសេរឫស $x_1<x_2<x_3$",[A("pi/6","\\frac{\\pi}{6}","num","x₁ ="),A("pi/2","\\frac{\\pi}{2}","num","x₂ ="),A("5pi/6","\\frac{5\\pi}{6}","num","x₃ =")],"$(2\\sin x-1)(\\sin x-1)=0\\iff\\sin x=\\frac12$ ឬ $\\sin x=1$ ⇒ $x=\\frac\\pi6,\\frac\\pi2,\\frac{5\\pi}6$","y=2sin(x)^2-3sin(x)+1\nwindow x=-0.3..3.5 y=-0.5..2")}};
/* ===== ជំពូកទី៥ លីមីត និងដេរីវេ ===== */
G[51]={1:function(){var a=nz(-3,3),c=[nz(-3,3),ri(-5,5),ri(-6,6)],v=c[0]*a*a+c[1]*a+c[2];
    return Q("គណនា $\\displaystyle\\lim_{x\\to "+a+"}\\left("+polyT(c)+"\\right)$",[A(v)],"ជំនួស $x="+a+"$ ⇒ $"+v+"$")},
  2:function(){var a=nz(-5,5),b=nz(-4,4);
    return Q("គណនា $\\displaystyle\\lim_{x\\to "+a+"}\\frac{x^2"+co(b-a,"x")+sg(-a*b,0)+"}{x"+sg(-a,0)+"}$",[A(a+b)],"កត្តា $(x"+sg(-a,0)+")$ ⇒ $x"+sg(b,0)+"\\to"+(a+b)+"$")},
  3:function(){var n=ri(2,4),a=nz(-4,4),b=ri(-5,5),d=co(a*n,n-1>1?"x^"+(n-1):"x",true)+(b?sg(b,0):"");
    return Q("គណនាដេរីវេ $f'(x)$ នៃ $f(x)="+co(a,"x^{"+n+"}",true)+co(b,"x")+"$",[A(d,d.replace(/\^(\d)/g,"^{$1}"),"expr","f'(x) =")],"$(x^n)'=nx^{n-1}$")}};
G[52]={1:function(){var a=nz(-2,2),b=ri(-4,4),c=ri(-3,3),x0=ri(-2,2),m=2*a*x0+b,f=poly([a,b,c]);
    return Q("រកមេគុណប្រាប់ទិសនៃបន្ទាត់ប៉ះនឹងក្រាប $y="+polyT([a,b,c])+"$ ត្រង់ $x="+x0+"$",[A(m,null,"num","m =")],"$y'="+poly([2*a,b])+"$ ⇒ $m="+m+"$","y="+f+"\ntangent y="+f+" at "+x0+" red")},
  2:function(){var a=nz(-5,-1),b=ri(5,20),t=ri(1,3),v=2*a*t+b;
    return Q("ចលនាមួយមានចម្ងាយ $s(t)="+polyT([a,b,0])+"$ (ម៉ែត្រ)។ គណនាល្បឿន $v="+"s'(t)$ ត្រង់ $t="+t+"$",[A(v,null,"num","v =")],"$v(t)=s'(t)="+poly([2*a,b])+"$ ⇒ $v("+t+")="+v+"$")},
  3:function(){var h=ri(1,4),k=ri(-3,4),a=nz(-2,2),b=-2*a*h,c=a*h*h+k;
    return Q("រកតម្លៃ"+(a>0?"អប្បបរមា":"អតិបរមា")+"នៃ $f(x)="+polyT([a,b,c])+"$ និង $x$ ដែលធ្វើឱ្យកើតតម្លៃនោះ",[A(h,null,"num","x ="),A(k,null,"num","f(x) =")],"$f'(x)="+poly([2*a,b])+"=0\\iff x="+h+"$ ⇒ $f("+h+")="+k+"$","y="+poly([a,b,c])+"\nS("+h+","+k+")")}};
G[53]={1:function(){var a=ri(1,3),k=3*a*a;
    return Q("$f(x)=x^3-"+k+"x$ ។ រកចំណុចបរមាធៀប៖ $x_1<x_2$ ដែល $f'(x)=0$",[A(-a,null,"num","x₁ ="),A(a,null,"num","x₂ =")],"$f'(x)=3x^2-"+k+"=0\\iff x=\\pm"+a+"$","y=x^3-"+k+"x")},
  2:function(){var a=ri(1,3),k=3*a*a;
    return Q("$f(x)=-x^3+"+k+"x$ ។ រកតម្លៃអតិបរមាធៀប",[A(2*a*a*a,null,"num","max =")],"$f'(x)=-3x^2+"+k+"=0\\iff x=\\pm"+a+"$ · អតិបរមាត្រង់ $x="+a+"$ ⇒ $"+(2*a*a*a)+"$","y=-x^3+"+k+"x\nM("+a+","+(2*a*a*a)+")")},
  3:function(){var a=nz(-2,2),b=3*a*ri(-2,2),c=ri(-4,4),d=ri(-3,3),xi=fr(-b,3*a),fx=function(x){return a*x*x*x+b*x*x+c*x+d},yi=fx(-b/(3*a));
    return Q("រកអាប់ស៊ីសនៃចំណុចរបត់នៃ $f(x)="+polyT([a,b,c,d])+"$",[A(xi.s,xi.t,"num","x =")],"$f''(x)="+poly([6*a,2*b])+"=0\\iff x="+xi.t+"$","y="+poly([a,b,c,d])+"\nI("+(-b/(3*a))+","+(+yi.toFixed(2))+")")}};
/* ===== ជំពូកទី៦ វិភាគបន្សំ និងប្រូបាប ===== */
G[61]={1:function(){var n=ri(3,7);return Q("គណនា $"+n+"!$",[A(fact(n),null,"num",n+"! =")],"$"+n+"!="+Array.from({length:n},function(_,i){return n-i}).join("\\cdot")+"="+fact(n)+"$")},
  2:function(){var n=ri(5,10),k=ri(2,4),P=fact(n)/fact(n-k);
    return Q("មានសិស្ស $"+n+"$ នាក់។ ជ្រើសរើសប្រធាន អនុប្រធាន"+(k>2?" លេខាធិការ"+(k>3?" និងហិរញ្ញិក":""):"")+" ($"+k+"$ តួនាទីខុសគ្នា)។ មានប៉ុន្មានរបៀប?",[A(P,null,"num","ចំនួន =")],"ចម្លាស់ $A_{"+n+"}^{"+k+"}=\\frac{"+n+"!}{"+(n-k)+"!}="+P+"$")},
  3:function(){var n=ri(4,8);return Q("មនុស្ស $"+n+"$ នាក់អង្គុយជុំវិញតុមូលមួយ។ មានប៉ុន្មានរបៀប?",[A(fact(n-1),null,"num","ចំនួន =")],"ចម្លាស់រង្វង់៖ $("+n+"-1)!="+fact(n-1)+"$")}};
G[62]={1:function(){var n=ri(5,12),k=ri(2,4);return Q("គណនា $C_{"+n+"}^{"+k+"}$",[A(cnk(n,k),null,"num","C =")],"$C_n^k=\\frac{n!}{k!(n-k)!}="+cnk(n,k)+"$")},
  2:function(){var n=ri(6,12),k=ri(2,4);return Q("ជ្រើសសិស្ស $"+k+"$ នាក់ពី $"+n+"$ នាក់ទៅប្រកួត។ មានប៉ុន្មានរបៀប?",[A(cnk(n,k),null,"num","ចំនួន =")],"លំដាប់មិនសំខាន់ ⇒ $C_{"+n+"}^{"+k+"}="+cnk(n,k)+"$")},
  3:function(){var b=ri(4,7),g=ri(3,6),kb=ri(1,3),kg=ri(1,3);
    return Q("ថ្នាក់មានសិស្សប្រុស $"+b+"$ និងស្រី $"+g+"$ ។ ជ្រើសក្រុមមានប្រុស $"+kb+"$ និងស្រី $"+kg+"$ ។ មានប៉ុន្មានរបៀប?",[A(cnk(b,kb)*cnk(g,kg),null,"num","ចំនួន =")],"$C_{"+b+"}^{"+kb+"}\\cdot C_{"+g+"}^{"+kg+"}="+cnk(b,kb)+"\\cdot"+cnk(g,kg)+"="+(cnk(b,kb)*cnk(g,kg))+"$")}};
G[63]={1:function(){var t=ri(0,1);
    if(t){var k=ri(1,5),f=fr(6-k,6);return Q("បោះគ្រាប់ឡុកឡាក់មួយ។ គណនាប្រូបាបដែលចេញលេខធំជាង $"+k+"$",[A(f.s,f.t,"num","P =")],"ករណីស្រប $"+(6-k)+"$ ក្នុងចំណោម $6$ ⇒ $P="+f.t+"$")}
    var s=ri(2,12),n=0;for(var a=1;a<=6;a++)for(var b=1;b<=6;b++)if(a+b===s)n++;var f=fr(n,36);
    return Q("បោះគ្រាប់ឡុកឡាក់ពីរ។ គណនាប្រូបាបដែលផលបូកស្មើ $"+s+"$",[A(f.s,f.t,"num","P =")],"$P=\\frac{"+n+"}{36}="+f.t+"$")},
  2:function(){var c=pick([["ក្រហម",26],["ក្បាលស្ត (A)",4],["ចិត្ត ♥",13],["រូប (J,Q,K)",12]]),f=fr(c[1],52);
    return Q("ដកសន្លឹកបៀមួយពីបៀ $52$ សន្លឹក។ គណនាប្រូបាបដែលបាន "+c[0],[A(f.s,f.t,"num","P =")],"$P=\\frac{"+c[1]+"}{52}="+f.t+"$")},
  3:function(){var p=pick([[1,2],[1,3],[2,3],[1,4],[3,4]]),q=pick([[1,2],[1,3],[2,5],[1,5]]),f=fr(p[0]*q[0],p[1]*q[1]);
    return Q("$A$ និង $B$ ជាព្រឹត្តិការណ៍ឯករាជ្យ $P(A)=\\frac{"+p[0]+"}{"+p[1]+"}$ , $P(B)=\\frac{"+q[0]+"}{"+q[1]+"}$ ។ គណនា $P(A\\cap B)$",[A(f.s,f.t,"num","P =")],"ឯករាជ្យ ⇒ $P(A\\cap B)=P(A)P(B)="+f.t+"$")}};
/* ===== ជំពូកទី៧ ចំនួនកុំផ្លិច (ដូចថ្នាក់ទី១២) ===== */
G[71]=X.G12[11];
/* ===== ជំពូកទី៨ ធរណីមាត្រក្នុងលំហ ===== */
G[81]={1:function(){var a=ri(2,9),t=ri(0,1);
    return t?Q("គូបមួយមានជ្រុង $"+a+"$ ។ គណនាមាឌ $V$",[A(a*a*a,null,"num","V =")],"$V=a^3="+(a*a*a)+"$"):Q("គូបមួយមានជ្រុង $"+a+"$ ។ គណនាប្រវែងអង្កត់ទ្រូងលំហ",[A(a+"sqrt(3)",a+"\\sqrt3","num","d =")],"$d=a\\sqrt3="+a+"\\sqrt3$")},
  2:function(){var T=pick([[1,2,2,3],[2,3,6,7],[1,4,8,9],[2,6,9,11],[4,4,7,9],[3,4,12,13]]);
    return Q("ប្រអប់ចតុកោណកែងមានវិមាត្រ $"+T[0]+"$, $"+T[1]+"$, $"+T[2]+"$ ។ គណនាអង្កត់ទ្រូង $d$ និងមាឌ $V$",[A(T[3],null,"num","d ="),A(T[0]*T[1]*T[2],null,"num","V =")],"$d=\\sqrt{"+(T[0]*T[0])+"+"+(T[1]*T[1])+"+"+(T[2]*T[2])+"}="+T[3]+"$ · $V="+(T[0]*T[1]*T[2])+"$")},
  3:function(){var t=ri(0,2),r=ri(1,6),h=ri(2,9);
    if(t===0)return Q("ស៊ីឡាំងមានកាំ $"+r+"$ និងកម្ពស់ $"+h+"$ ។ គណនាមាឌ $V$",[A((r*r*h)+"pi",(r*r*h)+"\\pi","num","V =")],"$V=\\pi r^2h="+(r*r*h)+"\\pi$");
    if(t===1){var v=fr(4*r*r*r,3);return Q("ស្វ៊ែមានកាំ $"+r+"$ ។ គណនាមាឌ $V$",[A("("+v.s+")pi",v.t+"\\pi","num","V =")],"$V=\\frac43\\pi r^3="+v.t+"\\pi$")}
    var a=ri(2,8),b=ri(2,8),v2=fr(a*b*h,3);return Q("ពីរ៉ាមីតមានបាតជាចតុកោណកែង $"+a+"\\times"+b+"$ និងកម្ពស់ $"+h+"$ ។ គណនាមាឌ",[A(v2.s,v2.t,"num","V =")],"$V=\\frac13Bh=\\frac13\\cdot"+(a*b)+"\\cdot"+h+"="+v2.t+"$")}};
G[83]={1:function(){var a=ri(2,8),b=ri(2,8),h=ri(2,8),d2=a*a+b*b+h*h;
    return Q("ចំណុច $S$ នៅលើបន្ទាត់កែងនឹងប្លង់ $(ABC)$ ត្រង់ $A$ ដែល $SA="+h+"$ ។ ត្រីកោណ $ABC$ កែងត្រង់ $A$ មាន $AB="+a+"$ និង $AC="+b+"$ ។ គណនា $SB^2$",[A(h*h+a*a,null,"num","SB² =")],"$SA\\perp AB$ ⇒ $SB^2=SA^2+AB^2="+(h*h+a*a)+"$")},
  2:function(){var a=ri(2,8);return Q("គូប $ABCD.EFGH$ មានជ្រុង $"+a+"$ ។ គណនាប្រវែងអង្កត់ទ្រូងមុខ $AC$",[A(a+"sqrt(2)",a+"\\sqrt2","num","AC =")],"$AC=a\\sqrt2="+a+"\\sqrt2$")},
  3:function(){var T=pick([[1,2,2],[2,3,6],[2,2,1],[3,6,2]]),a=T[0],b=T[1],c=T[2],num=a*a*b*b*c*c,den=a*a*b*b+b*b*c*c+a*a*c*c;
    return Q("$OA$, $OB$, $OC$ កែងគ្នាពីរៗ $OA="+a+"$, $OB="+b+"$, $OC="+c+"$ ។ គណនា $d^2$ ដែល $d$ ជាចម្ងាយពី $O$ ទៅប្លង់ $(ABC)$",[A(fr(num,den).s,fr(num,den).t,"num","d² =")],"$\\frac{1}{d^2}=\\frac1{"+(a*a)+"}+\\frac1{"+(b*b)+"}+\\frac1{"+(c*c)+"}$ ⇒ $d^2="+fr(num,den).t+"$")}};
G[84]={1:function(){var u=[ri(-4,4),ri(-4,4),ri(-4,4)],v=[ri(-4,4),ri(-4,4),ri(-4,4)],s=[u[0]+v[0],u[1]+v[1],u[2]+v[2]];
    return Q("$\\vec u"+v3(u)+"$ , $\\vec v"+v3(v)+"$ ។ រក $\\vec u+\\vec v$",[A(s[0],null,"num","x ="),A(s[1],null,"num","y ="),A(s[2],null,"num","z =")],"$\\vec u+\\vec v="+v3(s)+"$")},
  2:function(){var u=[ri(-4,4),ri(-4,4),ri(-4,4)],v=[ri(-4,4),ri(-4,4),ri(-4,4)],d=u[0]*v[0]+u[1]*v[1]+u[2]*v[2];
    return Q("$\\vec u"+v3(u)+"$ , $\\vec v"+v3(v)+"$ ។ គណនា $\\vec u\\cdot\\vec v$",[A(d)],"$\\vec u\\cdot\\vec v="+d+"$")},
  3:function(){var u=[nz(-3,3),nz(-3,3),nz(-3,3)],k=nz(-3,3);
    return Q("រក $m$ និង $n$ ដើម្បីឱ្យ $\\vec u"+v3(u)+"$ និង $\\vec v("+(k*u[0])+";m;n)$ ស្របគ្នា (ជាប់គ្នាលីនេអ៊ែរ)",[A(k*u[1],null,"num","m ="),A(k*u[2],null,"num","n =")],"$\\vec v=k\\vec u$ ដែល $k="+k+"$ ⇒ $m="+(k*u[1])+"$ , $n="+(k*u[2])+"$")}};
G[85]={1:function(){var n=[nz(-3,3),nz(-3,3),nz(-3,3)],P=[ri(-3,3),ri(-3,3),ri(-3,3)],d=-(n[0]*P[0]+n[1]*P[1]+n[2]*P[2]);
    return Q("ប្លង់កាត់តាម $A"+v3(P)+"$ មានណរម៉ាល់ $\\vec n"+v3(n)+"$ ៖ $"+co(n[0],"x",true)+co(n[1],"y")+co(n[2],"z")+"+d=0$ ។ រក $d$",[A(d,null,"num","d =")],"ជំនួស $A$ ⇒ $d="+d+"$")},
  2:function(){var P=[ri(-3,3),ri(-3,3),ri(-3,3)],u=[nz(-3,3),nz(-3,3),nz(-3,3)],t=nz(-3,3);
    return Q("បន្ទាត់ $\\begin{cases}x="+P[0]+co(u[0],"t")+"\\\\y="+P[1]+co(u[1],"t")+"\\\\z="+P[2]+co(u[2],"t")+"\\end{cases}$ ។ រកចំណុចត្រង់ $t="+t+"$",[A(P[0]+u[0]*t,null,"num","x ="),A(P[1]+u[1]*t,null,"num","y ="),A(P[2]+u[2]*t,null,"num","z =")],"ជំនួស $t="+t+"$")},
  3:function(){var P=[ri(-3,3),ri(-3,3),ri(-3,3)],u=[nz(-2,2),nz(-2,2),nz(-2,2)],n=[nz(-2,2),nz(-2,2),nz(-2,2)],nu=n[0]*u[0]+n[1]*u[1]+n[2]*u[2];if(!nu){u[0]+=1;nu=n[0]*u[0]+n[1]*u[1]+n[2]*u[2];if(!nu)n[2]+=1;nu=n[0]*u[0]+n[1]*u[1]+n[2]*u[2]}
    var t0=nz(-2,2),Mq=[P[0]+u[0]*t0,P[1]+u[1]*t0,P[2]+u[2]*t0],d=-(n[0]*Mq[0]+n[1]*Mq[1]+n[2]*Mq[2]);
    return Q("រកប៉ារ៉ាម៉ែត្រ $t$ ត្រង់ចំណុចប្រសព្វនៃបន្ទាត់ $x="+P[0]+co(u[0],"t")+",\\ y="+P[1]+co(u[1],"t")+",\\ z="+P[2]+co(u[2],"t")+"$ និងប្លង់ $"+co(n[0],"x",true)+co(n[1],"y")+co(n[2],"z")+sg(d,0)+"=0$",[A(t0,null,"num","t =")],"ជំនួសក្នុងសមីការប្លង់ ⇒ $"+(nu)+"t"+sg(n[0]*P[0]+n[1]*P[1]+n[2]*P[2]+d,0)+"=0$ ⇒ $t="+t0+"$")}};

var LES=[
  ["ជំពូកទី១ ស្វ៊ីត",[[11,"ស្វ៊ីតចំនួនពិត"],[12,"ស្វ៊ីតនព្វន្ត"],[13,"ស្វ៊ីតធរណីមាត្រ"],[14,"ផលបូកតួនៃស្វ៊ីតផ្សេងៗ"],[15,"ទំនាក់ទំនងកំណើននៃស្វ៊ីត"]]],
  ["ជំពូកទី២ អិចស្ប៉ូណង់ស្យែល និងលោការីត",[[21,"អនុគមន៍អិចស្ប៉ូណង់ស្យែល"],[22,"អនុគមន៍លោការីត"]]],
  ["ជំពូកទី៣ ត្រីកោណមាត្រ",[[31,"អនុគមន៍ត្រីកោណមាត្រ"],[32,"រូបមន្តត្រីកោណមាត្រ"],[33,"សមីការត្រីកោណមាត្រ"]]],
  ["ជំពូកទី៥ លីមីត និងដេរីវេ",[[51,"លីមីត និងដេរីវេ"],[52,"អនុវត្តន៍ដេរីវេ"],[53,"អថេរភាព និងក្រាបនៃអនុគមន៍"]]],
  ["ជំពូកទី៦ វិភាគបន្សំ និងប្រូបាប",[[61,"ចម្លាស់"],[62,"បន្សំ"],[63,"ប្រូបាប"]]],
  ["ជំពូកទី៧ ចំនួនកុំផ្លិច",[[71,"ចំនួនកុំផ្លិច"]]],
  ["ជំពូកទី៨ ធរណីមាត្រក្នុងលំហ",[[81,"រូបធរណីមាត្រក្នុងលំហ"],[83,"ភាពអរតូកូណាល់ក្នុងលំហ"],[84,"វ៉ិចទ័រក្នុងលំហ"],[85,"សមីការបន្ទាត់ និងប្លង់ក្នុងលំហ"]]]
];
X.reg(11,{les:LES,G:G});
})();
