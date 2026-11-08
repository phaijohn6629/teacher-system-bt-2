/* ========================================================================
   🇬🇧 Mathematics Practice (English · Cambridge style) — Grades 11, 12
   Grade 11 = Cambridge IGCSE Mathematics (0580) Extended, second year → GR[111]
   Grade 12 = Cambridge International AS Level Pure Mathematics 1 (9709) → GR[112]
   Original questions in Cambridge style · load after practiceen.js (window.PXEN)
   ======================================================================== */
(function(){
"use strict";
var X=window.PX,E=window.PXEN,Q=X.Q,A=X.A,ri=X.ri,nz=X.nz,pick=X.pick,fr=X.fr,sg=X.sg,co=X.co,poly=X.poly,polyT=X.polyT,sgp=X.sgp,gcd=X.gcd,cnk=X.cnk;
var K=E.K,L=E.L,r2=E.r2,sum=E.sum,nf=E.nf,sqT=E.sqT,piT=E.piT,pt=E.pt,cv=E.cv,DP=E.DP,TR=E.TR,D=E.D,G9=E.G9,G10=E.G10;
function fT(f){return f.t}
function pw(c,n){/* c·xⁿ ជា LaTeX (ដំបូង) */if(!c)return"";var a=Math.abs(c),s=c<0?"-":"";return s+(a===1&&n?"":a)+(n===0?"":n===1?"x":"x^{"+n+"}")}
function pwS(c,n){return c?(c<0?"-":"+")+pw(Math.abs(c),n):""}
function pwV(c,n){return"("+c+")*x^("+n+")"}
function frT(n,d){var f=fr(n,d);return f}
function dg(v){return Math.round(v*100)/100}
var SP=[[30,"\\dfrac12","1/2"],[45,"\\dfrac{\\sqrt2}{2}","sqrt(2)/2"],[60,"\\dfrac{\\sqrt3}{2}","sqrt(3)/2"]];

/* ===================================================================
   GRADE 11 · Cambridge IGCSE (0580) Extended — second year
   =================================================================== */
var G11={};
/* 1 Algebraic fractions and formulae */
G11[1]={1:L(
 function(){var a=ri(1,6),b=ri(1,6),c=nz(-5,5);
   return K("afs","Write $\\dfrac{"+a+"}{x}+\\dfrac{"+b+"}{x"+sg(c)+"}$ as a single fraction.",[A("("+poly([a+b,a*c])+")/(x*(x"+sg(c)+"))","\\dfrac{"+polyT([a+b,a*c])+"}{x(x"+sg(c)+")}","expr","=")],
     "Common denominator $x(x"+sg(c)+")$: $\\dfrac{"+a+"(x"+sg(c)+")+"+b+"x}{x(x"+sg(c)+")}=\\dfrac{"+polyT([a+b,a*c])+"}{x(x"+sg(c)+")}$")},
 function(){var r=ri(2,12);
   return K("subr","Make $r$ the subject of $A=\\pi r^2$. Hence find $r$ when $A="+r*r+"\\pi$.",[A(r,null,"num","r =")],"$r=\\sqrt{\\dfrac{A}{\\pi}}=\\sqrt{"+r*r+"}="+r+"$")}),
 2:L(
 function(){var b=ri(2,5),d=ri(2,5),a=nz(-6,6),c=nz(-6,6);if(b===d)d++;var n1=d-b,n0=a*d-c*b;
   return K("afd","Write $\\dfrac{x"+sg(a)+"}{"+b+"}-\\dfrac{x"+sg(c)+"}{"+d+"}$ as a single fraction in its simplest form.",[A("("+poly([n1,n0])+")/"+b*d,"\\dfrac{"+polyT([n1,n0])+"}{"+b*d+"}","expr","=")],
     "$\\dfrac{"+d+"(x"+sg(a)+")-"+b+"(x"+sg(c)+")}{"+b*d+"}=\\dfrac{"+polyT([n1,n0])+"}{"+b*d+"}$")},
 function(){var b,d,x,a,c,e;do{b=ri(2,5);d=ri(2,6);a=nz(-5,5);c=nz(-5,5);x=ri(-8,12);e=fr(d*(x+a)-b*(x+c),b*d)}while(b===d||e.d!==1);
   return K("afe","Solve $\\dfrac{x"+sg(a)+"}{"+b+"}-\\dfrac{x"+sg(c)+"}{"+d+"}="+e.t+"$.",[A(x,null,"num","x =")],"Multiply by $"+b*d+"$: $"+d+"(x"+sg(a)+")-"+b+"(x"+sg(c)+")="+e.n*b*d+"\\Rightarrow "+(d-b)+"x="+(e.n*b*d-d*a+b*c)+"\\Rightarrow x="+x+"$")}),
 3:L(G10[5][3],
 function(){var a=ri(1,9),b=ri(1,6),y=pick([2,3,4,5,-1,-2]),x=fr(b*y+a,y-1);
   return K("sub2","$y=\\dfrac{x+"+a+"}{x-"+b+"}$. Make $x$ the subject, then find $x$ when $y="+y+"$.",[A(x.s,x.t,"num","x =")],"$y(x-"+b+")=x+"+a+"\\Rightarrow xy-x="+b+"y+"+a+"\\Rightarrow x=\\dfrac{"+b+"y+"+a+"}{y-1}$. When $y="+y+"$: $x="+x.t+"$")})};
/* 2 Quadratics */
G11[2]={1:L(G10[6][1]),2:L(G10[6][2],
 function(){var p=nz(-6,6),q=ri(-9,9);
   return K("tp","Find the coordinates of the turning point of $y="+polyT([1,-2*p,p*p+q])+"$.",[A(p,null,"num","x ="),A(q,null,"num","y =")],"$y=(x"+sg(-p)+")^2"+co(q,"")+"$, so the minimum point is $"+pt([p,q])+"$.")}),
 3:L(
 function(){var x=ri(3,15),k=ri(1,8);
   return K("qw","A rectangle has length $(x+"+k+")$ cm and width $x$ cm. Its area is $"+x*(x+k)+"$ cm². Find $x$.",[A(x,null,"num","x =")],"$x(x+"+k+")="+x*(x+k)+"\\Rightarrow x^2+"+k+"x-"+x*(x+k)+"=0\\Rightarrow(x-"+x+")(x+"+(x+k)+")=0$, $x\\gt 0$ so $x="+x+"$")},
 function(){var r=ri(-6,3),s=r+ri(1,7);
   return K("qi","Solve $"+polyT([1,-(r+s),r*s])+"\\lt 0$. The answer is $a\\lt x\\lt b$.",[A(r,null,"num","a ="),A(s,null,"num","b =")],"$(x"+sg(-r)+")(x"+sg(-s)+")\\lt 0$: the curve is below the $x$-axis between the roots, so $"+r+"\\lt x\\lt "+s+"$.")})};
/* 3 Indices and exponential growth */
G11[3]={1:L(G10[4][1],
 function(){var a=ri(2,5),m=ri(2,6),n=ri(2,4);
   return K("ip","Simplify $("+a+"x^{"+m+"})^{"+n+"}$ to the form $kx^p$.",[A(Math.pow(a,n),null,"num","k ="),A(m*n,null,"num","p =")],"$"+a+"^{"+n+"}x^{"+m+"\\times"+n+"}="+Math.pow(a,n)+"x^{"+m*n+"}$")}),
 2:L(G10[4][3],
 function(){var P=ri(2,9)*1000,r=pick([2,3,4,5,8]),n=ri(3,10),v=Math.round(P*Math.pow(1+r/100,n));
   return K("eg","A town has a population of $"+P+"$. The population grows by $"+r+"\\%$ each year. Find the population after $"+n+"$ years, correct to the nearest whole number.",[A(v,null,"num","=")],"$"+P+"\\times"+nf(1+r/100)+"^{"+n+"}="+v+"$")}),
 3:L(
 function(){var C=pick([[2,3,2],[3,2,3],[2,3,3],[3,2,2],[3,4,2],[4,3,2]]),p=C[0],q=C[1],b=C[2],x=Math.pow(b,q),k=Math.pow(b,p);
   return K("fe","Solve $x^{\\frac{"+p+"}{"+q+"}}="+k+"$.",[A(x,null,"num","x =")],"Raise both sides to the power $\\dfrac{"+q+"}{"+p+"}$: $x="+k+"^{\\frac{"+q+"}{"+p+"}}=("+b+"^{"+p+"})^{\\frac{"+q+"}{"+p+"}}="+b+"^{"+q+"}="+x+"$")},
 G10[3][3])};
/* 4 Functions */
G11[4]={1:L(G10[9][2]),2:L(G10[9][3]),
 3:L(function(){var a=nz(-3,3),b=ri(-6,6),r=ri(1,6),c=r*r;
   /* f(x)=x² , g(x)=ax+b , fg(x)=c ⇒ ax+b=±r */var x1=fr(r-b,a),x2=fr(-r-b,a),lo=x1.n/x1.d<x2.n/x2.d?x1:x2,hi=lo===x1?x2:x1;
   return K("fgs","$f(x)=x^2$ and $g(x)="+co(a,"x",true)+co(b,"")+"$. Solve $fg(x)="+c+"$.",[A(lo.s,lo.t,"num","x₁ ="),A(hi.s,hi.t,"num","x₂ =")],"$("+co(a,"x",true)+co(b,"")+")^2="+c+"\\Rightarrow "+co(a,"x",true)+co(b,"")+"=\\pm"+r+"\\Rightarrow x="+lo.t+"$ or $x="+hi.t+"$")})};
/* 5 Differentiation */
function dpoly(){var n=[ri(2,4),ri(1,2),0],c=[nz(-5,5),nz(-6,6),ri(-9,9)];n[1]=n[0]===2?1:ri(1,2);var f=pw(c[0],n[0])+pwS(c[1],n[1])+(c[2]?sg(c[2]):""),d=[c[0]*n[0],n[0]-1,c[1]*n[1],n[1]-1];
  return{f:f,dT:pw(d[0],d[1])+pwS(d[2],d[3]),dV:pwV(d[0],d[1])+"+"+pwV(d[2],d[3]),dv:function(x){return d[0]*Math.pow(x,d[1])+d[2]*Math.pow(x,d[3])},c:c,n:n}}
G11[5]={1:L(
 function(){var p=dpoly();return K("dd","Find $\\dfrac{dy}{dx}$ when $y="+p.f+"$.",[A(p.dV,p.dT,"expr","dy/dx =")],"Multiply by the power and reduce the power by $1$: $\\dfrac{dy}{dx}="+p.dT+"$")},
 function(){var p=dpoly(),x=ri(-3,3);return K("gc","Find the gradient of the curve $y="+p.f+"$ at the point where $x="+x+"$.",[A(p.dv(x),null,"num","gradient =")],"$\\dfrac{dy}{dx}="+p.dT+"$, at $x="+x+"$: $"+p.dv(x)+"$")}),
 2:L(
 function(){var p=nz(-5,5),q=ri(-9,9);
   return K("sp","Find the coordinates of the stationary point of $y="+polyT([1,-2*p,p*p+q])+"$.",[A(p,null,"num","x ="),A(q,null,"num","y =")],"$\\dfrac{dy}{dx}=2x"+sg(-2*p)+"=0\\Rightarrow x="+p+"$, $y="+q+"$")},
 function(){var a=nz(-3,3),b=nz(-5,5),c=ri(-6,6),x0=ri(-3,3),y0=a*x0*x0+b*x0+c,m=2*a*x0+b,k=y0-m*x0;
   return K("tg","Find the equation of the tangent to $y="+polyT([a,b,c])+"$ at the point where $x="+x0+"$. Give it in the form $y=mx+c$.",[A(m,null,"num","m ="),A(k,null,"num","c =")],"$\\dfrac{dy}{dx}="+polyT([2*a,b])+"$, so $m="+m+"$. Point $"+pt([x0,y0])+"$: $c="+y0+"-"+sgp(m)+"\\times"+sgp(x0)+"="+k+"$")}),
 3:L(
 function(){var p=ri(-3,1),q=p+ri(1,4),b=-3*(p+q)/2,c=3*p*q;if(b%1){q++;b=-3*(p+q)/2;c=3*p*q}var d=ri(-5,5),f=function(x){return x*x*x+b*x*x+c*x+d};
   return K("sn","The curve $y=x^3"+co(b,"x^2")+co(c,"x")+co(d,"")+"$ has two stationary points. Find the $x$-coordinate of the maximum point and of the minimum point.",[A(p,null,"num","max x ="),A(q,null,"num","min x =")],
     "$\\dfrac{dy}{dx}=3x^2"+co(2*b,"x")+co(c,"")+"=3(x"+sg(-p)+")(x"+sg(-q)+")=0$. $\\dfrac{d^2y}{dx^2}=6x"+co(2*b,"")+"$ is negative at $x="+p+"$ (maximum) and positive at $x="+q+"$ (minimum).")},
 function(){var a=ri(1,9),b=ri(1,8);
   return K("dn","Find $\\dfrac{dy}{dx}$ when $y=\\dfrac{"+a+"}{x}+"+b+"\\sqrt{x}$.",[A("-"+a+"/x^2+"+b+"/(2*sqrt(x))","-\\dfrac{"+a+"}{x^2}+\\dfrac{"+b+"}{2\\sqrt x}","expr","dy/dx =")],"$y="+a+"x^{-1}+"+b+"x^{\\frac12}\\Rightarrow\\dfrac{dy}{dx}=-"+a+"x^{-2}+"+fr(b,2).t+"x^{-\\frac12}$")})};
/* 6 Similarity */
G11[6]={1:L(
 function(){var a=ri(2,9),k=pick([2,3,1.5,2.5]),b=ri(2,9);
   return K("sl","Two triangles are similar. A side of length $"+a+"$ cm in the smaller triangle corresponds to a side of length $"+nf(a*k)+"$ cm in the larger. Another side of the smaller triangle is $"+b+"$ cm. Find the corresponding side in the larger triangle.",[A(nf(b*k),null,"num","cm")],"Scale factor $="+nf(k)+"$, so $"+b+"\\times"+nf(k)+"="+nf(b*k)+"$ cm")},
 function(){var k=pick([2,3,4,1.5]),A0=ri(3,30);
   return K("sa","Two similar shapes have lengths in the ratio $1:"+k+"$. The smaller has area $"+A0+"$ cm². Find the area of the larger.",[A(nf(A0*k*k),null,"num","cm²")],"Area scale factor $="+k+"^2="+nf(k*k)+"$, area $="+nf(A0*k*k)+"$ cm²")}),
 2:L(
 function(){var k=pick([2,3,1.5]),V=ri(5,60);
   return K("sv","Two similar solids have lengths in the ratio $1:"+k+"$. The smaller has volume $"+V+"$ cm³. Find the volume of the larger.",[A(nf(V*k*k*k),null,"num","cm³")],"Volume scale factor $="+k+"^3="+nf(k*k*k)+"$, volume $="+nf(V*k*k*k)+"$ cm³")},
 function(){var k=ri(2,5),L0=ri(3,15);
   return K("sla","The areas of two similar shapes are in the ratio $1:"+k*k+"$. The smaller shape has a length of $"+L0+"$ cm. Find the corresponding length on the larger shape.",[A(L0*k,null,"num","cm")],"Length scale factor $=\\sqrt{"+k*k+"}="+k+"$, length $="+L0*k+"$ cm")}),
 3:L(
 function(){var k=pick([2,3]),S=ri(10,60),V=ri(20,200);
   return K("savf","Two similar bottles have surface areas $"+S+"$ cm² and $"+S*k*k+"$ cm². The smaller bottle has a volume of $"+V+"$ cm³. Find the volume of the larger bottle.",[A(V*k*k*k,null,"num","cm³")],"Area factor $"+k*k+"$ ⇒ length factor $"+k+"$ ⇒ volume factor $"+k*k*k+"$: $"+V+"\\times"+k*k*k+"="+V*k*k*k+"$ cm³")},
 function(){var k=pick([2,3,4]),m=ri(20,300);
   return K("sm","Two similar statues are made of the same material. The larger statue is $"+k+"$ times as tall as the smaller one. The smaller has mass $"+m+"$ g. Find the mass of the larger.",[A(m*k*k*k,null,"num","g")],"Mass is proportional to volume: $"+m+"\\times"+k+"^3="+m*k*k*k+"$ g")})};
/* 7 Trigonometry: graphs and 3D */
function trigEq(f){var C=pick(SP),v=C[0],neg=Math.random()<.4,a,b;
  if(f==="sin"){a=neg?180+v:v;b=neg?360-v:180-v}else{a=neg?180-v:v;b=neg?180+v:360-v}
  if(f==="cos"&&!neg&&v===60){}return{q:"\\"+f+" x="+(neg?"-":"")+C[1],a:Math.min(a,b),b:Math.max(a,b),v:v,neg:neg}}
G11[7]={1:L(
 function(){var t=trigEq("sin");return K("ts","Solve $"+t.q+"$ for $0^\\circ\\le x\\le360^\\circ$.",[A(t.a,null,"num","x₁ ="),A(t.b,null,"num","x₂ =")],"Principal value $"+t.v+"^\\circ$; $\\sin$ is "+(t.neg?"negative in the 3rd and 4th quadrants":"positive in the 1st and 2nd quadrants")+": $x="+t.a+"^\\circ,"+t.b+"^\\circ$")},
 function(){var t=trigEq("cos");return K("tc","Solve $"+t.q+"$ for $0^\\circ\\le x\\le360^\\circ$.",[A(t.a,null,"num","x₁ ="),A(t.b,null,"num","x₂ =")],"Principal value $"+t.v+"^\\circ$; $\\cos$ is "+(t.neg?"negative in the 2nd and 3rd quadrants":"positive in the 1st and 4th quadrants")+": $x="+t.a+"^\\circ,"+t.b+"^\\circ$")}),
 2:L(
 function(){var k=ri(2,30)/10*pick([1,-1]),x1=Math.atan(k)/D;if(x1<0)x1+=180;var x2=x1+180;
   return K("tt","Solve $\\tan x="+k+"$ for $0^\\circ\\le x\\le360^\\circ$. "+DP,[A(nf(x1),null,"num","x₁ ="),A(nf(x2),null,"num","x₂ =")],"$\\tan^{-1}("+k+")$ gives $"+dg(Math.atan(k)/D)+"^\\circ$; $\\tan$ repeats every $180^\\circ$: $x="+dg(x1)+"^\\circ,"+dg(x2)+"^\\circ$")},
 function(){var a=ri(3,12),b=ri(3,12),c=ri(2,10),t=Math.atan(c/Math.sqrt(a*a+b*b))/D;
   return K("t3","A cuboid measures $"+a+"$ cm by $"+b+"$ cm by $"+c+"$ cm (height). Calculate the angle between a space diagonal and the base. "+DP,[A(nf(t),null,"num","angle =")],"Base diagonal $=\\sqrt{"+a*a+"+"+b*b+"}$, $\\tan\\theta=\\dfrac{"+c+"}{\\sqrt{"+(a*a+b*b)+"}}\\Rightarrow\\theta="+dg(t)+"^\\circ$")}),
 3:L(
 function(){var s=2*ri(2,8),h=ri(4,15),t=Math.atan(h/(s/Math.SQRT2))/D;
   return K("pyr","A pyramid has a square base of side $"+s+"$ cm. Its vertex is $"+h+"$ cm vertically above the centre of the base. Calculate the angle between a sloping edge and the base. "+DP,[A(nf(t),null,"num","angle =")],"Half-diagonal $=\\dfrac{"+s+"\\sqrt2}{2}="+dg(s/Math.SQRT2)+"$, $\\tan\\theta=\\dfrac{"+h+"}{"+dg(s/Math.SQRT2)+"}\\Rightarrow\\theta="+dg(t)+"^\\circ$")},
 function(){var a=ri(5,20),b=ri(5,20),t1=ri(20,80),t2=t1+ri(60,120),ang=t2-t1,d=Math.sqrt(a*a+b*b-2*a*b*Math.cos((180-ang)*D));
   return K("bc","A ship sails $"+a+"$ km on a bearing of $0"+("0"+t1).slice(-2)+"^\\circ$, then $"+b+"$ km on a bearing of $"+("00"+t2).slice(-3)+"^\\circ$. Calculate its distance from the starting point. "+DP,[A(nf(d),null,"num","km")],
     "The angle between the two legs is $180^\\circ-"+ang+"^\\circ="+(180-ang)+"^\\circ$. Cosine rule: $d^2="+a+"^2+"+b+"^2-2\\times"+a+"\\times"+b+"\\cos"+(180-ang)+"^\\circ\\Rightarrow d="+dg(d)+"$ km")})};
/* 8 Vectors and geometry */
G11[8]={1:L(G10[14][2],
 function(){return K("vm","$O$ is the origin, $\\overrightarrow{OA}=\\mathbf a$ and $\\overrightarrow{OB}=\\mathbf b$. $M$ is the midpoint of $AB$. Write $\\overrightarrow{OM}=p\\mathbf a+q\\mathbf b$. Find $p$ and $q$.",[A("1/2","\\frac12","num","p ="),A("1/2","\\frac12","num","q =")],"$\\overrightarrow{OM}=\\mathbf a+\\tfrac12(\\mathbf b-\\mathbf a)=\\tfrac12\\mathbf a+\\tfrac12\\mathbf b$")}),
 2:L(
 function(){var m=ri(1,4),n=ri(1,4);if(m===n)n++;var p=fr(n,m+n),q=fr(m,m+n);
   return K("vr","$\\overrightarrow{OA}=\\mathbf a$, $\\overrightarrow{OB}=\\mathbf b$. $P$ lies on $AB$ with $AP:PB="+m+":"+n+"$. Write $\\overrightarrow{OP}=p\\mathbf a+q\\mathbf b$. Find $p$ and $q$.",[A(p.s,p.t,"num","p ="),A(q.s,q.t,"num","q =")],
     "$\\overrightarrow{OP}=\\mathbf a+\\dfrac{"+m+"}{"+(m+n)+"}(\\mathbf b-\\mathbf a)="+p.t+"\\mathbf a+"+q.t+"\\mathbf b$")},
 G10[14][3]),
 3:L(
 function(){var a=[nz(-4,4),nz(-4,4)],k=pick([2,3,-2]),t=ri(1,4);var B=[a[0]*k,a[1]*k];
   return K("col","The points $O$, $A$ and $B$ are collinear, where $O$ is the origin, $\\overrightarrow{OA}="+cv(a)+"$ and $\\overrightarrow{OB}=\\begin{pmatrix}"+B[0]+"\\\\ t\\end{pmatrix}$. Find $t$.",[A(B[1],null,"num","t =")],"$\\overrightarrow{OB}="+k+"\\overrightarrow{OA}$, so $t="+k+"\\times"+sgp(a[1])+"="+B[1]+"$")},
 G10[14][3])};
/* 9 Sequences */
G11[9]={1:L(G9[6][2],G9[6][1]),2:L(G9[6][3]),
 3:L(
 function(){var a=nz(-4,5),r=pick([2,3,-2]);
   return K("gn","Find the $n$th term of the geometric sequence $"+[0,1,2,3].map(function(i){return a*Math.pow(r,i)}).join(", ")+", \\dots$ in the form $a\\times r^{n-1}$.",[A(a,null,"num","a ="),A(r,null,"num","r =")],"First term $"+a+"$, common ratio $"+r+"$: $"+a+"\\times"+sgp(r)+"^{n-1}$")},
 function(){var k=ri(-9,9);
   return K("cu","Find the $n$th term of $"+[1,2,3,4].map(function(n){return n*n*n+k}).join(", ")+", \\dots$ in the form $n^3+c$.",[A(k,null,"num","c =")],"Compare with the cube numbers $1, 8, 27, 64$: each term is $"+(k<0?k:"+"+k)+"$ from them.")})};
/* 10 Statistics */
G11[10]={1:L(G10[15][2]),2:L(G10[15][3]),
 3:L(
 function(){var w=pick([5,10,20]),fd=ri(1,12)/2;
   return K("hf","In a histogram, the bar for the class $"+20+"\\lt t\\le"+(20+w)+"$ has frequency density $"+fd+"$. Find the frequency.",[A(nf(fd*w),null,"num","frequency =")],"$\\text{frequency}=\\text{f.d.}\\times\\text{width}="+fd+"\\times"+w+"="+nf(fd*w)+"$")},
 function(){var n=pick([40,60,80,100,120,200]);
   return K("cfm","A cumulative frequency diagram shows the data for $"+n+"$ students. Which cumulative frequency would you read across from to estimate (a) the median (b) the upper quartile?",[A(n/2,null,"num","(a)"),A(3*n/4,null,"num","(b)")],"Median at $\\tfrac12\\times"+n+"="+n/2+"$, upper quartile at $\\tfrac34\\times"+n+"="+3*n/4+"$")})};
/* 11 Probability */
G11[11]={1:L(G10[16][2]),2:L(G10[16][3]),
 3:L(function(){var a=ri(5,20),b=ri(5,20),c=ri(5,20),d=ri(5,20),p=fr(a,a+c);
   return K("cp","The two-way table shows $"+(a+b+c+d)+"$ students. $\\begin{array}{|c|c|c|}\\hline &\\text{Cycles}&\\text{Walks}\\\\\\hline\\text{Boys}&"+a+"&"+b+"\\\\\\hline\\text{Girls}&"+c+"&"+d+"\\\\\\hline\\end{array}$ A student who cycles is chosen at random. Find the probability that this student is a boy.",[A(p.s,p.t,"num","P =")],"Only students who cycle: $"+(a+c)+"$, of whom $"+a+"$ are boys: $P="+p.t+"$")})};
/* 12 Sets and Venn diagrams */
G11[12]={1:L(function(){var a=ri(8,25),b=ri(8,25),n=ri(1,Math.min(a,b)-1);
   return K("su","$n(A)="+a+"$, $n(B)="+b+"$ and $n(A\\cap B)="+n+"$. Find $n(A\\cup B)$.",[A(a+b-n,null,"num","n(A∪B) =")],"$n(A\\cup B)=n(A)+n(B)-n(A\\cap B)="+(a+b-n)+"$")}),
 2:L(function(){var a=ri(8,25),b=ri(8,25),n=ri(1,Math.min(a,b)-1),U=a+b-n+ri(2,10);
   return K("si","In a group of $"+U+"$ people, $"+a+"$ like tea, $"+b+"$ like coffee and $"+(U-(a+b-n))+"$ like neither. How many like both?",[A(n,null,"num","both =")],"$n(T\\cup C)="+U+"-"+(U-(a+b-n))+"="+(a+b-n)+"$, so both $="+a+"+"+b+"-"+(a+b-n)+"="+n+"$")}),
 3:L(G10[16][3],function(){var a=ri(8,25),b=ri(8,25),n=ri(1,Math.min(a,b)-1),U=a+b-n+ri(2,12);
   return K("sc","$n(\\mathscr E)="+U+"$, $n(A)="+a+"$, $n(B)="+b+"$ and $n(A\\cap B)="+n+"$. Find $n(A'\\cap B)$ and $n((A\\cup B)')$.",[A(b-n,null,"num","n(A'∩B) ="),A(U-(a+b-n),null,"num","n((A∪B)') =")],"$n(A'\\cap B)="+b+"-"+n+"="+(b-n)+"$, $n((A\\cup B)')="+U+"-"+(a+b-n)+"="+(U-(a+b-n))+"$")})};
/* 13 Mensuration */
G11[13]={1:L(G10[11][3]),
 2:L(function(){var r=ri(2,12);return K("ssa","Find the surface area of a sphere of radius $"+r+"$ cm, in terms of $\\pi$. [$A=4\\pi r^2$]",[A(4*r*r+"*pi",4*r*r+"\\pi","num","cm²")],"$4\\pi\\times"+r*r+"="+4*r*r+"\\pi$ cm²")},G10[11][3]),
 3:L(function(){var r=3*ri(1,4),h=ri(2,15),V=fr(2*r*r*r+3*r*r*h,3);
   return K("hc","A solid is made from a cylinder of radius $"+r+"$ cm and height $"+h+"$ cm with a hemisphere of the same radius on top. Find its total volume in terms of $\\pi$.",[A(V.s+"*pi",piT(V),"num","cm³")],"Cylinder $\\pi r^2h="+r*r*h+"\\pi$, hemisphere $\\tfrac23\\pi r^3="+2*r*r*r/3+"\\pi$; total $="+piT(V)+"$ cm³")})};
var LES11=[
 ["Algebra",[[1,"Algebraic fractions and formulae"],[2,"Quadratics"],[3,"Indices and exponential growth"],[4,"Functions"],[5,"Differentiation"],[9,"Sequences"]]],
 ["Geometry",[[6,"Similarity"],[7,"Trigonometry: graphs, 3D and bearings"],[8,"Vectors in geometry"],[13,"Mensuration"]]],
 ["Statistics and probability",[[10,"Statistics: histograms and cumulative frequency"],[11,"Conditional probability"],[12,"Sets and Venn diagrams"]]]];

/* ===================================================================
   GRADE 12 · Cambridge International AS Level · Pure Mathematics 1 (9709)
   =================================================================== */
var G12={};
/* 1 Quadratics */
G12[1]={1:L(
 function(){var a=pick([1,2,3]),p=nz(-5,5),q=ri(-9,9);
   return K("cs","Express $"+polyT([a,2*a*p,a*p*p+q])+"$ in the form $"+(a===1?"":a)+"(x+p)^2+q$.",[A(p,null,"num","p ="),A(q,null,"num","q =")],"$"+(a===1?"":a+"\\left(x^2"+co(2*p,"x")+"\\right)"+sg(a*p*p+q)+"=")+(a===1?"":a)+"(x"+sg(p)+")^2"+co(q,"")+"$")},
 function(){var a=pick([1,2,-1]),p=nz(-5,5),q=ri(-9,9);
   return K("mv","Find the "+(a>0?"minimum":"maximum")+" value of $"+polyT([a,-2*a*p,a*p*p+q])+"$ and the value of $x$ at which it occurs.",[A(q,null,"num","value ="),A(p,null,"num","x =")],"$"+(a===1?"":a===-1?"-":a)+"(x"+sg(-p)+")^2"+co(q,"")+"$, so the "+(a>0?"minimum":"maximum")+" is $"+q+"$ when $x="+p+"$")}),
 2:L(
 function(){var c=ri(1,9)*ri(1,1),k=2*Math.sqrt(c*c);
   return K("er","The equation $x^2+kx+"+c*c+"=0$ has equal roots. Find the positive value of $k$.",[A(2*c,null,"num","k =")],"Equal roots: $b^2-4ac=0\\Rightarrow k^2-4\\times"+c*c+"=0\\Rightarrow k=\\pm"+2*c+"$")},
 function(){var a=nz(-3,4),b=nz(-9,9),c=nz(-9,9),D0=b*b-4*a*c;
   return K("dc","Find the value of the discriminant of $"+polyT([a,b,c])+"=0$ and state the number of real roots.",[A(D0,null,"num","b²−4ac ="),A(D0>0?2:D0===0?1:0,null,"num","roots =")],"$b^2-4ac="+sgp(b)+"^2-4\\times"+sgp(a)+"\\times"+sgp(c)+"="+D0+"$, "+(D0>0?"positive ⇒ 2 real roots":D0===0?"zero ⇒ 1 repeated root":"negative ⇒ no real roots"))}),
 3:L(
 function(){var c=ri(1,8);
   return K("kr","Find the set of values of $k$ for which $x^2+kx+"+c*c+"=0$ has two distinct real roots. The answer is $k\\lt a$ or $k\\gt b$.",[A(-2*c,null,"num","a ="),A(2*c,null,"num","b =")],"$k^2-4\\times"+c*c+"\\gt 0\\Rightarrow k^2\\gt "+4*c*c+"\\Rightarrow k\\lt -"+2*c+"$ or $k\\gt "+2*c+"$")},
 function(){var m=nz(-4,4),b=ri(-5,5),c=ri(-5,5),k=c-(m-b)*(m-b)/4;var K0=fr(4*c-(m-b)*(m-b),4);
   return K("tl","The line $y="+co(m,"x",true)+"+k$ is a tangent to the curve $y="+polyT([1,b,c])+"$. Find $k$.",[A(K0.s,K0.t,"num","k =")],"$x^2"+co(b-m,"x")+sg(c)+"-k=0$ has equal roots: $("+(b-m)+")^2-4("+c+"-k)=0\\Rightarrow k="+K0.t+"$")})};
/* 2 Functions */
G12[2]={1:L(
 function(){var a=nz(-5,5),b=ri(-9,9);
   return K("rg","$f(x)=(x"+sg(a)+")^2"+sg(b)+"$ for $x\\in\\mathbb R$. Find the least value of $f(x)$ (so the range is $f(x)\\ge c$).",[A(b,null,"num","c =")],"$(x"+sg(a)+")^2\\ge0$, so $f(x)\\ge"+b+"$")},
 G10[9][2]),
 2:L(G10[9][3],
 function(){var a=nz(-5,5),b=ri(-9,9);
   return K("iq","$f(x)=(x"+sg(a)+")^2"+sg(b)+"$ for $x\\ge"+(-a)+"$. Find $f^{-1}(x)$.",[A("sqrt(x"+sg(-b)+")"+sg(-a),"\\sqrt{x"+sg(-b)+"}"+sg(-a),"expr","f⁻¹(x) =")],"$y=(x"+sg(a)+")^2"+sg(b)+"\\Rightarrow x"+sg(a)+"=\\sqrt{y"+sg(-b)+"}$ (positive root since $x\\ge"+(-a)+"$)")}),
 3:L(
 function(){var a=nz(-3,3),b=nz(-5,5),x=ri(-5,5),k=a*a*x+a*b+b;
   return K("ff","$f(x)="+co(a,"x",true)+co(b,"")+"$. Solve $ff(x)="+k+"$.",[A(x,null,"num","x =")],"$ff(x)="+a+"("+co(a,"x",true)+co(b,"")+")"+co(b,"")+"="+co(a*a,"x",true)+co(a*b+b,"")+"="+k+"\\Rightarrow x="+x+"$")},
 function(){var a=ri(1,6),b=ri(1,5);
   return K("ir","$f(x)=\\dfrac{x+"+a+"}{x-"+b+"}$ for $x\\ne"+b+"$. Find $f^{-1}(x)$.",[A("("+b+"*x+"+a+")/(x-1)","\\dfrac{"+b+"x+"+a+"}{x-1}","expr","f⁻¹(x) =")],"$y(x-"+b+")=x+"+a+"\\Rightarrow x(y-1)="+b+"y+"+a+"\\Rightarrow f^{-1}(x)=\\dfrac{"+b+"x+"+a+"}{x-1}$")})};
/* 3 Coordinate geometry */
G12[3]={1:L(
 function(){var a=ri(-6,6),b=ri(-6,6),r=ri(1,9);
   return K("ce","A circle has equation $(x"+sg(-a)+")^2+(y"+sg(-b)+")^2="+r*r+"$. Find the centre and the radius.",[A(a,null,"num","centre x ="),A(b,null,"num","centre y ="),A(r,null,"num","radius =")],"Centre $"+pt([a,b])+"$, radius $\\sqrt{"+r*r+"}="+r+"$")},
 function(){var a=nz(-5,5),b=nz(-5,5),r=ri(1,8),F=a*a+b*b-r*r;
   return K("cx","A circle has equation $x^2+y^2"+co(-2*a,"x")+co(-2*b,"y")+co(F,"")+"=0$. Find the centre and the radius.",[A(a,null,"num","centre x ="),A(b,null,"num","centre y ="),A(r,null,"num","radius =")],"Complete the square: $(x"+sg(-a)+")^2+(y"+sg(-b)+")^2="+r*r+"$, centre $"+pt([a,b])+"$, radius $"+r+"$")}),
 2:L(G10[10][3],
 function(){var a=ri(-4,4),b=ri(-4,4),dx=nz(-4,4),dy=nz(-4,4),P=[a+dx,b+dy],m=fr(-dx,dy),c=fr(P[1]*dy+dx*P[0],dy);
   return K("ct","The point $P"+pt(P)+"$ lies on the circle with centre $C"+pt([a,b])+"$. Find the equation of the tangent at $P$ in the form $y=mx+c$.",[A(m.s,m.t,"num","m ="),A(c.s,c.t,"num","c =")],"Gradient of $CP=\\dfrac{"+dy+"}{"+dx+"}$; the tangent is perpendicular: $m="+m.t+"$, $c="+c.t+"$")}),
 3:L(
 function(){var r=5,P=pick([[3,4],[4,3],[0,5],[5,0],[-3,4],[4,-3]]),Qp=pick([[-4,3],[-3,-4],[3,-4],[-5,0],[0,-5]].filter(function(q){return q[0]!==P[0]}));
   var m=fr(Qp[1]-P[1],Qp[0]-P[0]),c=fr(P[1]*(Qp[0]-P[0])-P[0]*(Qp[1]-P[1]),Qp[0]-P[0]),lo=Math.min(P[0],Qp[0]),hi=Math.max(P[0],Qp[0]);
   return K("lc","The line $y="+(!m.n?c.t:(m.d===1?co(m.n,"x",true):m.t+"x")+(c.n?(c.n>0?"+":"")+c.t:""))+"$ meets the circle $x^2+y^2=25$ at two points. Find their $x$-coordinates.",[A(lo,null,"num","x₁ ="),A(hi,null,"num","x₂ =")],"Substitute into $x^2+y^2=25$ and solve the quadratic: $x="+lo+"$ or $x="+hi+"$")},
 function(){var r=ri(1,6);
   return K("tk","The line $y=x+k$, where $k\\gt 0$, is a tangent to the circle $x^2+y^2="+2*r*r+"$. Find $k$.",[A(2*r,null,"num","k =")],"$x^2+(x+k)^2="+2*r*r+"\\Rightarrow2x^2+2kx+k^2-"+2*r*r+"=0$; equal roots: $4k^2-8(k^2-"+2*r*r+")=0\\Rightarrow k^2="+4*r*r+"\\Rightarrow k="+2*r+"$")})};
/* 4 Circular measure */
G12[4]={1:L(
 function(){var d=pick([30,45,60,90,120,135,150,180,210,240,270,300,315]),f=fr(d,180);
   return K("dr","Convert $"+d+"^\\circ$ to radians, in terms of $\\pi$.",[A(f.s+"*pi",piT(f),"num","=")],"$"+d+"\\times\\dfrac{\\pi}{180}="+piT(f)+"$")},
 function(){var f=pick([[1,6],[1,4],[1,3],[1,2],[2,3],[3,4],[5,6],[5,4],[3,2],[7,6]]);
   return K("rd","Convert $"+piT(fr(f[0],f[1]))+"$ radians to degrees.",[A(180*f[0]/f[1],null,"num","°")],"$\\times\\dfrac{180}{\\pi}$: $"+180*f[0]/f[1]+"^\\circ$")}),
 2:L(
 function(){var r=ri(2,15),t=ri(2,25)/10;
   return K("al","A sector has radius $"+r+"$ cm and angle $"+t+"$ radians. Find the arc length.",[A(nf(r*t),null,"num","cm")],"$s=r\\theta="+r+"\\times"+t+"="+nf(r*t)+"$ cm")},
 function(){var r=ri(2,15),t=ri(2,25)/10;
   return K("sa","A sector has radius $"+r+"$ cm and angle $"+t+"$ radians. Find its area.",[A(nf(r*r*t/2),null,"num","cm²")],"$A=\\tfrac12r^2\\theta=\\tfrac12\\times"+r*r+"\\times"+t+"="+nf(r*r*t/2)+"$ cm²")}),
 3:L(
 function(){var r=ri(4,15),t=ri(5,25)/10,S=r*r/2*(t-Math.sin(t));
   return K("seg","A chord subtends an angle of $"+t+"$ radians at the centre of a circle of radius $"+r+"$ cm. Find the area of the minor segment. "+DP,[A(nf(S),null,"num","cm²")],"$\\tfrac12r^2(\\theta-\\sin\\theta)=\\tfrac12\\times"+r*r+"("+t+"-\\sin"+t+")="+dg(S)+"$ cm²")},
 function(){var r=ri(3,12),t=ri(5,25)/10,A0=r*r*t/2;
   return K("sp2","A sector of a circle of radius $"+r+"$ cm has area $"+nf(A0)+"$ cm². Find the angle of the sector (radians) and its perimeter.",[A(t,null,"num","θ ="),A(nf(2*r+r*t),null,"num","perimeter =")],"$\\theta=\\dfrac{2A}{r^2}="+t+"$, perimeter $=2r+r\\theta="+nf(2*r+r*t)+"$ cm")})};
/* 5 Trigonometry */
G12[5]={1:L(
 function(){var C=pick([["\\sin\\dfrac{\\pi}{6}","1/2","\\frac12"],["\\cos\\dfrac{\\pi}{3}","1/2","\\frac12"],["\\tan\\dfrac{\\pi}{4}","1","1"],["\\sin\\dfrac{\\pi}{3}","sqrt(3)/2","\\frac{\\sqrt3}{2}"],["\\cos\\dfrac{\\pi}{6}","sqrt(3)/2","\\frac{\\sqrt3}{2}"],["\\tan\\dfrac{\\pi}{3}","sqrt(3)","\\sqrt3"],["\\cos\\dfrac{2\\pi}{3}","-1/2","-\\frac12"],["\\sin\\dfrac{3\\pi}{4}","sqrt(2)/2","\\frac{\\sqrt2}{2}"]]);
   return K("ev","Find the exact value of $"+C[0]+"$.",[A(C[1],C[2],"num","=")],"Use the special triangles: $"+C[0]+"="+C[2]+"$")},
 G11[7][1]),
 2:L(G11[7][2],
 function(){var T=pick(TR),s=fr(T[0],T[2]),c=fr(T[1],T[2]),t=fr(T[0],T[1]);
   return K("id","Given that $\\sin\\theta="+s.t+"$ and $\\theta$ is acute, find the exact values of $\\cos\\theta$ and $\\tan\\theta$.",[A(c.s,c.t,"num","cos θ ="),A(t.s,t.t,"num","tan θ =")],"$\\cos\\theta=\\sqrt{1-\\sin^2\\theta}="+c.t+"$, $\\tan\\theta=\\dfrac{\\sin\\theta}{\\cos\\theta}="+t.t+"$")}),
 3:L(
 function(){var C=pick([["2\\sin^2x-3\\sin x+1=0",[30,90,150],"(2\\sin x-1)(\\sin x-1)=0\\Rightarrow\\sin x=\\tfrac12$ or $\\sin x=1"],
   ["2\\cos^2x-\\cos x-1=0",[0,120,240,360],"(2\\cos x+1)(\\cos x-1)=0\\Rightarrow\\cos x=-\\tfrac12$ or $\\cos x=1"],
   ["2\\sin^2x+\\sin x-1=0",[30,150,270],"(2\\sin x-1)(\\sin x+1)=0\\Rightarrow\\sin x=\\tfrac12$ or $\\sin x=-1"],
   ["\\tan^2x=3",[60,120,240,300],"\\tan x=\\pm\\sqrt3"],["4\\sin^2x=3",[60,120,240,300],"\\sin x=\\pm\\dfrac{\\sqrt3}{2}"]]);
   return K("tq","Solve $"+C[0]+"$ for $0^\\circ\\le x\\le360^\\circ$. Write the solutions in increasing order.",C[1].map(function(v,i){return A(v,null,"num","x"+(i+1)+" =")}),"$"+C[2]+"$ ⇒ $x="+C[1].join("^\\circ,")+"^\\circ$")},
 function(){var C=pick([[30,"\\dfrac12"],[45,"\\dfrac{\\sqrt2}{2}"],[60,"\\dfrac{\\sqrt3}{2}"]]),a=C[0];var s=[a/2,(180-a)/2,(360+a)/2,(540-a)/2];
   return K("t2x","Solve $\\sin2x="+C[1]+"$ for $0^\\circ\\le x\\le360^\\circ$. Write the solutions in increasing order.",s.map(function(v,i){return A(v,null,"num","x"+(i+1)+" =")}),"$2x="+a+"^\\circ,"+(180-a)+"^\\circ,"+(360+a)+"^\\circ,"+(540-a)+"^\\circ$ (for $0\\le2x\\le720^\\circ$) ⇒ $x="+s.join("^\\circ,")+"^\\circ$")})};
/* 6 Series */
G12[6]={1:L(
 function(){var n=ri(4,8),k=ri(2,n-1),a=nz(-3,3),c=cnk(n,k)*Math.pow(a,k);
   return K("bc","Find the coefficient of $x^{"+k+"}$ in the expansion of $(1"+co(a,"x")+")^{"+n+"}$.",[A(c,null,"num","coefficient =")],"$\\binom{"+n+"}{"+k+"}("+a+")^{"+k+"}="+cnk(n,k)+"\\times"+Math.pow(a,k)+"="+c+"$")},
 function(){var a=ri(-10,20),d=nz(-4,6),n=ri(10,30);
   return K("as","An arithmetic progression has first term $"+a+"$ and common difference $"+d+"$. Find the sum of the first $"+n+"$ terms.",[A(n/2*(2*a+(n-1)*d),null,"num","S =")],"$S_n=\\tfrac n2[2a+(n-1)d]=\\tfrac{"+n+"}{2}[2\\times"+sgp(a)+"+"+(n-1)+"\\times"+sgp(d)+"]="+n/2*(2*a+(n-1)*d)+"$")}),
 2:L(
 function(){var a=ri(1,6),r=pick([2,3,-2]),n=ri(4,8),S=a*(Math.pow(r,n)-1)/(r-1);
   return K("gs","A geometric progression has first term $"+a+"$ and common ratio $"+r+"$. Find the sum of the first $"+n+"$ terms.",[A(S,null,"num","S =")],"$S_n=\\dfrac{a(r^n-1)}{r-1}=\\dfrac{"+a+"("+sgp(r)+"^{"+n+"}-1)}{"+(r-1)+"}="+S+"$")},
 function(){var a=ri(2,30),r=pick([[1,2],[1,3],[2,3],[1,4],[3,4],[-1,2],[-1,3]]),S=fr(a*r[1],r[1]-r[0]);
   return K("si","Find the sum to infinity of the geometric progression with first term $"+a+"$ and common ratio $"+fr(r[0],r[1]).t+"$.",[A(S.s,S.t,"num","S∞ =")],"$S_\\infty=\\dfrac{a}{1-r}=\\dfrac{"+a+"}{1-("+fr(r[0],r[1]).t+")}="+S.t+"$")}),
 3:L(
 function(){var n=ri(4,7),k=ri(1,n-1),a=ri(1,3),b=nz(-3,3),c=cnk(n,k)*Math.pow(a,n-k)*Math.pow(b,k);
   return K("bc2","Find the coefficient of $x^{"+k+"}$ in the expansion of $("+a+co(b,"x")+")^{"+n+"}$.",[A(c,null,"num","coefficient =")],"$\\binom{"+n+"}{"+k+"}\\times"+a+"^{"+(n-k)+"}\\times("+b+")^{"+k+"}="+c+"$")},
 function(){var a=ri(-5,15),d=nz(-3,5),p=ri(3,6),q=p+ri(3,8),n=ri(15,40);
   return K("ap2","In an arithmetic progression the "+p+"th term is $"+(a+(p-1)*d)+"$ and the "+q+"th term is $"+(a+(q-1)*d)+"$. Find the first term, the common difference and the sum of the first $"+n+"$ terms.",[A(a,null,"num","a ="),A(d,null,"num","d ="),A(n/2*(2*a+(n-1)*d),null,"num","S =")],
     "$"+(q-p)+"d="+((q-p)*d)+"\\Rightarrow d="+d+"$, $a="+(a+(p-1)*d)+"-"+(p-1)+"\\times"+sgp(d)+"="+a+"$, $S_{"+n+"}="+n/2*(2*a+(n-1)*d)+"$")})};
/* 7 Differentiation */
G12[7]={1:L(G11[5][1],
 function(){var a=nz(-4,5),b=nz(-6,6),n=ri(3,6);
   return K("ch","Find $\\dfrac{dy}{dx}$ when $y=("+co(a,"x",true)+co(b,"")+")^{"+n+"}$.",[A(n*a+"*("+poly([a,b])+")^"+(n-1),n*a+"("+polyT([a,b])+")^{"+(n-1)+"}","expr","dy/dx =")],"Chain rule: $"+n+"("+polyT([a,b])+")^{"+(n-1)+"}\\times"+sgp(a)+"="+n*a+"("+polyT([a,b])+")^{"+(n-1)+"}$")}),
 2:L(G11[5][2],
 function(){var a=nz(-3,3),b=nz(-5,5),c=ri(-6,6),x0=ri(-3,3),m=2*a*x0+b;if(!m){b++;m=2*a*x0+b}var g=fr(-1,m);
   return K("nm","Find the gradient of the normal to $y="+polyT([a,b,c])+"$ at the point where $x="+x0+"$.",[A(g.s,g.t,"num","gradient =")],"Gradient of tangent $="+m+"$, so the normal gradient is $-\\dfrac{1}{"+m+"}="+g.t+"$")}),
 3:L(
 function(){var k=pick([1,4,9,16,25]),r=Math.sqrt(k);
   return K("sx","Find the coordinates of the stationary point of $y=x+\\dfrac{"+k+"}{x}$ for $x\\gt 0$.",[A(r,null,"num","x ="),A(2*r,null,"num","y =")],"$\\dfrac{dy}{dx}=1-\\dfrac{"+k+"}{x^2}=0\\Rightarrow x="+r+"$, $y="+r+"+\\dfrac{"+k+"}{"+r+"}="+2*r+"$")},
 function(){var r=ri(2,10),dr=pick([0.1,0.2,0.5,2,3]);
   return K("rc","The radius of a sphere increases at $"+dr+"$ cm s$^{-1}$. Find the rate of increase of the volume when the radius is $"+r+"$ cm, in terms of $\\pi$. [$V=\\tfrac43\\pi r^3$]",[A(nf(4*r*r*dr)+"*pi",nf(4*r*r*dr)+"\\pi","num","dV/dt =")],"$\\dfrac{dV}{dt}=\\dfrac{dV}{dr}\\times\\dfrac{dr}{dt}=4\\pi r^2\\times"+dr+"=4\\pi\\times"+r*r+"\\times"+dr+"="+nf(4*r*r*dr)+"\\pi$")})};
/* 8 Integration */
G12[8]={1:L(
 function(){var c=[nz(-4,4)*3,nz(-4,4)*2,nz(-6,6)];
   return K("ip","Find $\\displaystyle\\int("+pw(c[0],2)+pwS(c[1],1)+sg(c[2])+")\\,dx$.",[A(poly([c[0]/3,c[1]/2,c[2],0]),polyT([c[0]/3,c[1]/2,c[2],0])+"+C","anti","∫ =")],"Increase the power by $1$ and divide by the new power: $"+polyT([c[0]/3,c[1]/2,c[2],0])+"+C$")},
 function(){var a=ri(-2,1),b=a+ri(1,3),c=[nz(-3,3)*3,nz(-4,4)*2,ri(-5,5)],F=function(x){return c[0]/3*x*x*x+c[1]/2*x*x+c[2]*x};
   return K("di","Evaluate $\\displaystyle\\int_{"+a+"}^{"+b+"}("+pw(c[0],2)+pwS(c[1],1)+(c[2]?sg(c[2]):"")+")\\,dx$.",[A(F(b)-F(a),null,"num","=")],"$\\left["+polyT([c[0]/3,c[1]/2,c[2],0])+"\\right]_{"+a+"}^{"+b+"}="+F(b)+"-("+F(a)+")="+(F(b)-F(a))+"$")}),
 2:L(
 function(){var a=nz(-3,4),b=nz(-5,5),n=ri(2,5);
   return K("il","Find $\\displaystyle\\int("+co(a,"x",true)+co(b,"")+")^{"+n+"}\\,dx$.",[A("("+poly([a,b])+")^"+(n+1)+"/"+(a*(n+1)),"\\dfrac{("+polyT([a,b])+")^{"+(n+1)+"}}{"+a*(n+1)+"}+C","anti","∫ =")],"$\\dfrac{("+polyT([a,b])+")^{"+(n+1)+"}}{"+(n+1)+"\\times"+sgp(a)+"}+C$")},
 function(){var a=nz(-3,3)*3,b=nz(-4,4)*2,x0=ri(-2,2),y0=ri(-8,8),c=y0-(a/3*x0*x0*x0+b/2*x0*x0);
   return K("cv","A curve has $\\dfrac{dy}{dx}="+pw(a,2)+pwS(b,1)+"$ and passes through $"+pt([x0,y0])+"$. Find the equation of the curve.",[A(poly([a/3,b/2,0,c]),polyT([a/3,b/2,0,c]),"expr","y =")],"$y="+polyT([a/3,b/2,0,0])+"+c$; substitute $"+pt([x0,y0])+"$: $c="+c+"$")}),
 3:L(
 function(){var p=ri(1,4),q=ri(1,4),A0=fr(Math.pow(p+q,3),6);
   return K("ar","Find the area enclosed between the curve $y="+polyT([-1,q-p,p*q])+"$ and the $x$-axis.",[A(A0.s,A0.t,"num","area =")],"The roots are $x=-"+p+"$ and $x="+q+"$. Area $=\\displaystyle\\int_{-"+p+"}^{"+q+"}("+polyT([-1,q-p,p*q])+")\\,dx="+A0.t+"$")},
 function(){var k=ri(1,6),A0=fr(k*k*k,6);
   return K("ab","Find the area of the region enclosed by the curve $y=x^2$ and the line $y="+(k===1?"":k)+"x$.",[A(A0.s,A0.t,"num","area =")],"They meet at $x=0$ and $x="+k+"$. Area $=\\displaystyle\\int_0^{"+k+"}("+(k===1?"":k)+"x-x^2)\\,dx=\\left[\\tfrac{"+k+"}{2}x^2-\\tfrac13x^3\\right]_0^{"+k+"}="+A0.t+"$")})};
var LES12=[
 ["Pure Mathematics 1",[[1,"Quadratics"],[2,"Functions"],[3,"Coordinate geometry"],[4,"Circular measure"],[5,"Trigonometry"],[6,"Series"],[7,"Differentiation"],[8,"Integration"]]]];

X.reg(111,{en:true,tab:"🇬🇧 G11 · IGCSE Ext.",title:"Grade 11 · Cambridge IGCSE (0580) Extended",les:LES11,G:G11});
X.reg(112,{en:true,tab:"🇬🇧 G12 · AS Pure 1",title:"Grade 12 · Cambridge AS Level Pure Mathematics 1 (9709)",les:LES12,G:G12});
})();
