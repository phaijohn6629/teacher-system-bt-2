/* ========================================================================
   🇬🇧 Exam-style questions for G6 (Primary Checkpoint style) and G12 (AS Level 9709 Pure 1 style)
   Original questions written from the general format of the papers (not copied) · regenerate with new numbers
   G6  → chapter «Checkpoint-style questions» (lessons 31–34) · Paper 1 / Paper 2
   G12 → chapter «Exam-style questions (Pure Mathematics 1)» (lessons 31–34) · Paper 1
   Load after practiceen5.js
   ======================================================================== */
(function(){
"use strict";
var X=window.PX,E=window.PXEN,A=X.A,ri=X.ri,nz=X.nz,pick=X.pick,fr=X.fr,sg=X.sg,co=X.co,poly=X.poly,polyT=X.polyT,sgp=X.sgp,gcd=X.gcd,cnk=X.cnk;
var K=E.K,r2=E.r2,nf=E.nf,sqT=E.sqT,piT=E.piT,pt=E.pt,D=E.D,sum=E.sum;
var DP="Give your answer correct to 2 decimal places.";
function EX(kd,P,stem,parts,sol){var q=stem||"",a=[],mks=[],n=parts.length;
  parts.forEach(function(p,i){var lt=n>1?"("+"abcdefg"[i]+")":"";q+=(q?"\n":"")+(lt?lt+" ":"")+p.q;
    p.a.forEach(function(x,k){x.l=(lt&&k===0?lt+" ":"")+(x.l||"");a.push(x);mks.push(k===p.a.length-1?p.m:0)})});
  var o=K(kd,q,a,sol);o.mk=sum(parts.map(function(p){return p.m}));o.mks=mks;o.ex=true;o.pp=P;return o}
function L(){var a=[].slice.call(arguments);return function(){return pick(a)()}}
function hm(m){return("0"+Math.floor(m/60)%24).slice(-2)+":"+("0"+m%60).slice(-2)}
function big(n){return String(n).replace(/\B(?=(\d{3})+(?!\d))/g,",")}
function frT(f){return f.t}

/* =================================================================
   G6 · Primary Checkpoint style
   ================================================================= */
var g1=function(){var n=ri(10000,99999);
  return EX("p6a",1,"",[{q:"Round "+big(n)+" to the nearest 10, the nearest 100 and the nearest 1000.",a:[A(Math.round(n/10)*10,null,"num","nearest 10:"),A(Math.round(n/100)*100,null,"num","nearest 100:"),A(Math.round(n/1000)*1000,null,"num","nearest 1000:")],m:2}],"Look at the digit to the right of the place you are rounding to.")};
var g2=function(){var k=pick([6,7,8,9]),lo=k*ri(4,9)-ri(1,k-1),M=Math.ceil(lo/k)*k,hi=M+k-1;var P=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97],s=pick([[20,28],[30,36],[50,58],[60,66],[70,72],[80,88]]),pr=P.filter(function(p){return p>s[0]&&p<s[1]});if(pr.length!==1)s=[24,30],pr=[29];
  return EX("p6b",1,"",[{q:"Write down the multiple of "+k+" that is between "+lo+" and "+hi+".",a:[A(M,null,"num","=")],m:1},{q:"Write down the prime number that is between "+s[0]+" and "+s[1]+".",a:[A(pr[0],null,"num","=")],m:1}],
   "("+lo+" to "+hi+") contains "+M+" = "+k+" × "+M/k+"; "+pr[0]+" has exactly two factors.")};
var g3=function(){var C=pick([[3,4],[1,5],[2,5],[7,10],[1,4],[9,20],[3,25]]),p=C[0]*100/C[1],d=pick([[35,20],[45,20],[60,5],[75,4],[24,25],[85,20]]);
  return EX("p6c",1,"",[{q:"Write $\\frac{"+C[0]+"}{"+C[1]+"}$ as a percentage.",a:[A(p,null,"num","%")],m:1},{q:"$0."+d[0]+"=\\frac{\\square}{"+d[1]+"}$. Find the missing number.",a:[A(d[0]*d[1]/100,null,"num","□ =")],m:1}],
   "(a) $\\frac{"+C[0]+"}{"+C[1]+"}=\\frac{"+p+"}{100}$ (b) $0."+d[0]+"=\\frac{"+d[0]+"}{100}=\\frac{"+d[0]*d[1]/100+"}{"+d[1]+"}$")};
var g4=function(){var t1=ri(-12,-1),t2=ri(2,25),f=ri(3,15);
  return EX("p6d",1,"",[{q:"At 6 am the temperature was "+t1+"°C. At 2 pm it was "+t2+"°C. Find the difference between the two temperatures.",a:[A(t2-t1,null,"num","°C")],m:1},{q:"At midnight the temperature was "+f+" degrees lower than at 6 am. What was the temperature at midnight?",a:[A(t1-f,null,"num","°C")],m:1}],
   "(a) $"+t2+"-("+t1+")="+(t2-t1)+"$ (b) $"+t1+"-"+f+"="+(t1-f)+"$")};
var g5=function(){var p=ri(105,450)/100,k=ri(2,6),q=ri(150,900)/100,j=ri(1,3),B=pick([10,20,50]),T=p*k+q*j;if(T>=B)B=Math.ceil(T/10)*10+10;
  return EX("p6e",2,"Pens cost "+p+" dollars each. Notebooks cost "+q+" dollars each.",[{q:"Rosa buys "+k+" pens and "+j+" notebook"+(j>1?"s":"")+". Work out the total cost.",a:[A(nf(T),null,"num","dollars")],m:2},{q:"She pays with a "+B+" dollar note. How much change does she get?",a:[A(nf(B-T),null,"num","dollars")],m:1}],
   "(a) $"+k+"\\times"+p+"+"+j+"\\times"+q+"="+nf(T)+"$ (b) $"+B+"-"+nf(T)+"="+nf(B-T)+"$")};
var g6=function(){var k=pick([4,5,6,7,8]),N=k*ri(6,20)+ri(1,k-1);
  return EX("p6f",1,"",[{q:N+" children are put into teams of "+k+". How many full teams are there and how many children are left over?",a:[A(Math.floor(N/k),null,"num","teams ="),A(N%k,null,"num","left over =")],m:2}],"$"+N+"\\div"+k+"="+Math.floor(N/k)+"$ remainder $"+N%k+"$")};
var g7=function(){var a=ri(112,899),b=ri(3,9),x=ri(12,60),c=ri(3,9);
  return EX("p6g",1,"",[{q:"Work out $"+a+"\\times"+b+"$.",a:[A(a*b,null,"num","=")],m:1},{q:"Find the missing number: $\\square\\times"+c+"="+x*c+"$.",a:[A(x,null,"num","□ =")],m:1}],"(a) $"+a*b+"$ (b) $"+x*c+"\\div"+c+"="+x+"$")};
var g8=function(){var p=pick([2,4,5]),q=pick([6,8,10,12].filter(function(v){return v%p===0&&v!==p})),g=ri(2,9)*50,a=ri(1,6),b=ri(1,6),k=ri(2,5),h;if(a===b)b++;h=gcd(a*k,b*k);
  return EX("p6h",1,"",[{q:"A recipe for "+p+" people uses "+g+" g of rice. How much rice is needed for "+q+" people?",a:[A(g/p*q,null,"num","g")],m:1},{q:"Write the ratio "+a*k+" : "+b*k+" in its simplest form.",a:[A(a*k/h,null,"num","first ="),A(b*k/h,null,"num","second =")],m:1}],
   "(a) $"+g+"\\div"+p+"\\times"+q+"="+g/p*q+"$ (b) divide both by $"+h+"$")};
var g9=function(){var a=ri(25,150),b=ri(30,80),c=ri(30,80);
  return EX("p6i",1,"",[{q:"Two angles on a straight line are "+a+"° and $x$°. Find $x$.",a:[A(180-a,null,"num","x =")],m:1},{q:"Two angles in a triangle are "+b+"° and "+c+"°. Find the third angle.",a:[A(180-b-c,null,"num","°")],m:1}],"(a) $180-"+a+"$ (b) $180-"+b+"-"+c+"$")};
var g10=function(){var l=ri(4,15),w=ri(2,10),s=ri(3,12);
  return EX("p6j",1,"",[{q:"A rectangle is "+l+" cm long and "+w+" cm wide. Find its area and its perimeter.",a:[A(l*w,null,"num","area cm²"),A(2*(l+w),null,"num","perimeter cm")],m:2},{q:"A square has a perimeter of "+4*s+" cm. Find the length of one side.",a:[A(s,null,"num","cm")],m:1}],"(a) $"+l+"\\times"+w+"$, $2("+l+"+"+w+")$ (b) $"+4*s+"\\div4$")};
var g11=function(){var s=ri(7*60,10*60),d=ri(40,150),kg=ri(11,95)/10;
  return EX("p6k",1,"",[{q:"A bus leaves at "+hm(s)+". The journey takes "+Math.floor(d/60)+" h "+d%60+" min. At what time does the bus arrive?",a:[A(Math.floor((s+d)/60),null,"num","hours ="),A((s+d)%60,null,"num","minutes =")],m:1},{q:"Change "+kg+" kg into grams.",a:[A(Math.round(kg*1000),null,"num","g")],m:1}],"(a) "+hm(s+d)+" (b) $\\times1000$")};
var g12=function(){var a=ri(2,6),b=ri(2,6),c=ri(2,5),ml=ri(12,95)*50;
  return EX("p6l",2,"",[{q:"A cuboid is made from 1 cm cubes. It is "+a+" cubes long, "+b+" cubes wide and "+c+" cubes high. What is its volume?",a:[A(a*b*c,null,"num","cm³")],m:1},{q:"Change "+ml+" ml into litres.",a:[A(nf(ml/1000),null,"num","litres")],m:1}],"(a) $"+a+"\\times"+b+"\\times"+c+"$ (b) $\\div1000$")};
var g13=function(){var P=[ri(1,8),ri(1,8)],v=[nz(-3,4),nz(-3,4)];
  return EX("p6m",1,"Point $A$ is at "+pt(P)+".",[{q:"$A$ moves "+Math.abs(v[0])+" squares "+(v[0]>0?"right":"left")+" and "+Math.abs(v[1])+" squares "+(v[1]>0?"up":"down")+". Write down its new coordinates.",a:[A(P[0]+v[0],null,"num","x ="),A(P[1]+v[1],null,"num","y =")],m:1}],pt([P[0]+v[0],P[1]+v[1]]))};
var g14=function(){var m=ri(2,15),a=[m,m],c={};c[m]=2;while(a.length<7){var v=ri(1,20);if(!c[v]){c[v]=1;a.push(v)}}a.sort(function(){return Math.random()-.5});var s=a.slice().sort(function(x,y){return x-y});
  return EX("p6n",1,"Here are the numbers of goals scored in 7 matches: $"+a.join(",\\ ")+"$",[{q:"Write down the mode.",a:[A(m,null,"num","=")],m:1},{q:"Find the median.",a:[A(s[3],null,"num","=")],m:1},{q:"Find the range.",a:[A(s[6]-s[0],null,"num","=")],m:1}],"In order: "+s.join(", "))};
var g15=function(){var n=pick([6,8,10]),k=ri(1,n-1),c=pick(["red","blue","yellow"]),p=fr(k,n);
  return EX("p6o",1,"A spinner has "+n+" equal sections. "+k+" of them are "+c+" and the rest are white.",[{q:"What is the probability of landing on "+c+"?",a:[A(p.s,p.t,"num","P =")],m:1},{q:"What is the probability of landing on white?",a:[A(fr(n-k,n).s,fr(n-k,n).t,"num","P =")],m:1}],"(a) $"+p.t+"$ (b) $"+fr(n-k,n).t+"$")};
var g16=function(){var a=ri(5,15),b=ri(5,15),n=ri(1,4),N=a+b-n+ri(2,8);
  return EX("p6p",1,"In a class of "+N+" children, "+a+" have a cat, "+b+" have a dog and "+n+" have both.",[{q:"How many children have a cat but not a dog?",a:[A(a-n,null,"num","=")],m:1},{q:"How many children have neither a cat nor a dog?",a:[A(N-(a+b-n),null,"num","=")],m:1}],"(a) $"+a+"-"+n+"$ (b) $"+N+"-("+a+"+"+b+"-"+n+")$")};
var G6X={31:{1:L(g1,g2),2:L(g3,g4),3:L(g1,g3)},32:{1:L(g6,g7),2:L(g8,g6),3:L(g5,g8)},33:{1:L(g9,g13),2:L(g10,g11),3:L(g12,g10)},34:{1:L(g14,g15),2:L(g16,g15),3:L(g14,g16)}};

/* =================================================================
   G12 · AS Level 9709 Pure Mathematics 1 style
   ================================================================= */
var P1=function(){var a=pick([1,2,3]),b=nz(-5,5),c=ri(-8,8);
  return EX("q1",1,"$f(x)="+polyT([a,2*a*b,a*b*b+c])+"$",[
   {q:"Express $f(x)$ in the form $a(x+b)^2+c$, where $a$, $b$ and $c$ are constants.",a:[A(a,null,"num","a ="),A(b,null,"num","b ="),A(c,null,"num","c =")],m:3},
   {q:"State the coordinates of the vertex of the graph of $y=f(x)$.",a:[A(-b,null,"num","x ="),A(c,null,"num","y =")],m:1},
   {q:"The function $f$ is now defined for $x\\ge"+(-b)+"$. Find an expression for $f^{-1}(x)$.",a:[A((-b)+"+sqrt((x"+sg(-c)+")/"+a+")",(-b===0?"":(-b)+"+")+"\\sqrt{\\dfrac{x"+sg(-c)+"}{"+a+"}}","expr","f⁻¹(x) =")],m:3}],
   "(a) $"+(a===1?"":a)+"(x"+sg(b)+")^2"+co(c,"")+"$ (b) "+pt([-b,c])+" (c) $y-"+sgp(c)+"="+a+"(x"+sg(b)+")^2\\Rightarrow x="+(-b)+"+\\sqrt{\\dfrac{y"+sg(-c)+"}{"+a+"}}$ (positive root because $x\\ge"+(-b)+"$)")};
var P2=function(){var p=nz(-4,4),s=ri(1,4),k=ri(-6,6),q=k+s*s,m1=p-2*s,m2=p+2*s;
  return EX("q2",1,"The line $y=mx"+co(k,"")+"$ is a tangent to the curve $y=x^2"+co(p,"x")+co(q,"")+"$.",[
   {q:"Find the possible values of the constant $m$.",a:[A(m1,null,"num","m₁ ="),A(m2,null,"num","m₂ =")],m:4},
   {q:"For the larger value of $m$, find the $x$-coordinate of the point of contact.",a:[A(s,null,"num","x =")],m:2}],
   "(a) $x^2+("+p+"-m)x+"+(q-k)+"=0$ has equal roots: $("+p+"-m)^2=4\\times"+(q-k)+"\\Rightarrow m="+m1+"$ or $"+m2+"$ (b) $x=\\dfrac{m-"+sgp(p)+"}{2}="+s+"$")};
var P3=function(){var a=ri(2,4),b=nz(-5,5),r=ri(2,7),c=ri(1,9),k=r*r-c,x1=fr(r-b,a),x2=fr(-r-b,a),lo=x1.n/x1.d<x2.n/x2.d?x1:x2,hi=lo===x1?x2:x1;
  return EX("q3",1,"The functions $f$ and $g$ are defined by $f(x)="+a+"x"+co(b,"")+"$ and $g(x)=x^2-"+c+"$ for $x\\in\\mathbb R$.",[
   {q:"Find an expression for $gf(x)$.",a:[A("("+a+"x"+sg(b)+")^2-"+c,"("+a+"x"+sg(b)+")^2-"+c,"expr","gf(x) =")],m:2},
   {q:"Solve the equation $gf(x)="+k+"$.",a:[A(lo.s,lo.t,"num","x₁ ="),A(hi.s,hi.t,"num","x₂ =")],m:3},
   {q:"Find an expression for $f^{-1}(x)$.",a:[A("(x"+sg(-b)+")/"+a,"\\dfrac{x"+sg(-b)+"}{"+a+"}","expr","f⁻¹(x) =")],m:2}],
   "(b) $("+a+"x"+sg(b)+")^2="+r*r+"\\Rightarrow "+a+"x"+sg(b)+"=\\pm"+r+"$")};
var P4=function(){var T=pick([[3,4,5],[4,3,5],[6,8,10],[5,12,13],[12,5,13]]),h=ri(-4,4),k=ri(-4,4),r=T[2],P=[h+T[0]*pick([1,-1]),k+T[1]*pick([1,-1])],F=h*h+k*k-r*r,dx=P[0]-h,dy=P[1]-k,m=fr(-dx,dy),c=fr(P[1]*dy+dx*P[0],dy);
  return EX("q4",1,"A circle has equation $x^2+y^2"+co(-2*h,"x")+co(-2*k,"y")+co(F,"")+"=0$.",[
   {q:"Find the coordinates of the centre and the radius of the circle.",a:[A(h,null,"num","centre x ="),A(k,null,"num","centre y ="),A(r,null,"num","radius =")],m:3},
   {q:"The point $P"+pt(P)+"$ lies on the circle. Find the equation of the tangent to the circle at $P$, in the form $y=mx+c$.",a:[A(m.s,m.t,"num","m ="),A(c.s,c.t,"num","c =")],m:4}],
   "(a) $(x"+sg(-h)+")^2+(y"+sg(-k)+")^2="+r*r+"$ (b) gradient of radius $=\\dfrac{"+dy+"}{"+dx+"}$, tangent gradient $="+m.t+"$")};
var P5=function(){var r=ri(5,15),t=ri(6,24)/10,seg=r*r/2*(t-Math.sin(t)),per=r*t+2*r*Math.sin(t/2);
  return EX("q5",1,"The diagram shows a sector $OAB$ of a circle with centre $O$ and radius "+r+" cm. Angle $AOB="+t+"$ radians. The shaded region is bounded by the arc $AB$ and the chord $AB$.",[
   {q:"Find the area of the shaded region. "+DP,a:[A(nf(seg),null,"num","cm²")],m:3},
   {q:"Find the perimeter of the shaded region. "+DP,a:[A(nf(per),null,"num","cm")],m:3}],
   "(a) $\\tfrac12r^2(\\theta-\\sin\\theta)="+r2(seg)+"$ (b) arc $r\\theta="+r2(r*t)+"$, chord $2r\\sin\\tfrac\\theta2="+r2(2*r*Math.sin(t/2))+"$")};
var P6=function(){var a=ri(2,7),b=ri(1,7),x1=Math.atan(b/a)/D;
  var C=pick([["2\\cos^2x+3\\sin x-3=0","(2\\sin x-1)(\\sin x-1)=0",[30,90,150]],["2\\sin^2x-\\cos x-1=0","(2\\cos x-1)(\\cos x+1)=0",[60,180,300]],["2\\cos^2x-\\sin x-1=0","(2\\sin x-1)(\\sin x+1)=0",[30,150,270]]]);
  return EX("q6",1,"",[{q:"Solve the equation $"+a+"\\sin x="+b+"\\cos x$ for $0^\\circ\\le x\\le360^\\circ$. "+DP,a:[A(nf(x1),null,"num","x₁ ="),A(nf(x1+180),null,"num","x₂ =")],m:3},
   {q:"Solve the equation $"+C[0]+"$ for $0^\\circ\\le x\\le360^\\circ$. Write the solutions in increasing order.",a:C[2].map(function(v,i){return A(v,null,"num","x"+(i+1)+" =")}),m:4}],
   "(a) $\\tan x=\\dfrac{"+b+"}{"+a+"}\\Rightarrow x="+r2(x1)+"^\\circ,"+r2(x1+180)+"^\\circ$ (b) use $\\sin^2x+\\cos^2x=1$: $"+C[1]+"$")};
var P7=function(){var a=pick([1,2,3]),b=nz(-3,3),n=ri(4,6),k=nz(-3,3),c0=Math.pow(a,n),c1=n*Math.pow(a,n-1)*b,c2=cnk(n,2)*Math.pow(a,n-2)*b*b;
  return EX("q7",1,"",[{q:"Find the first three terms in the expansion of $("+a+co(b,"x")+")^{"+n+"}$ in ascending powers of $x$. Give the coefficients.",a:[A(c0,null,"num","constant ="),A(c1,null,"num","x coefficient ="),A(c2,null,"num","x² coefficient =")],m:3},
   {q:"Hence find the coefficient of $x^2$ in the expansion of $(1"+co(k,"x")+")("+a+co(b,"x")+")^{"+n+"}$.",a:[A(c2+k*c1,null,"num","=")],m:2}],
   "(a) $"+c0+co(c1,"x")+co(c2,"x^2")+"+\\dots$ (b) $"+c2+"+("+k+")("+c1+")="+(c2+k*c1)+"$")};
var P7b=function(){var a=ri(2,9)*8,r=pick([[1,2],[1,4],[3,4],[2,3]]),u2=a*r[0]/r[1],u4=a*Math.pow(r[0]/r[1],3),S=fr(a*r[1],r[1]-r[0]);
  return EX("q7b",1,"A geometric progression has second term "+nf(u2)+" and fourth term "+nf(u4)+". All terms are positive.",[
   {q:"Find the common ratio and the first term.",a:[A(fr(r[0],r[1]).s,fr(r[0],r[1]).t,"num","r ="),A(a,null,"num","a =")],m:3},{q:"Find the sum to infinity.",a:[A(S.s,S.t,"num","S∞ =")],m:2}],
   "(a) $r^2=\\dfrac{"+nf(u4)+"}{"+nf(u2)+"}$, $r="+fr(r[0],r[1]).t+"$, $a="+a+"$ (b) $\\dfrac{a}{1-r}="+S.t+"$")};
var P8=function(){var p=ri(-2,1),q=p+ri(1,3),d=ri(-5,5),f=function(x){return 2*x*x*x-3*(p+q)*x*x+6*p*q*x+d};
  return EX("q8",1,"A curve has equation $y=2x^3"+co(-3*(p+q),"x^2")+co(6*p*q,"x")+co(d,"")+"$.",[
   {q:"Find $\\dfrac{dy}{dx}$.",a:[A(poly([6,-6*(p+q),6*p*q]),polyT([6,-6*(p+q),6*p*q]),"expr","dy/dx =")],m:2},
   {q:"Find the coordinates of the stationary points and determine their nature.",a:[A(p,null,"num","max x ="),A(f(p),null,"num","max y ="),A(q,null,"num","min x ="),A(f(q),null,"num","min y =")],m:5}],
   "$\\dfrac{dy}{dx}=6(x"+sg(-p)+")(x"+sg(-q)+")=0$. $\\dfrac{d^2y}{dx^2}=12x"+co(-6*(p+q),"")+"$: negative at $x="+p+"$ (maximum), positive at $x="+q+"$ (minimum)")};
var P8b=function(){var b=nz(-4,4),c=ri(-5,5),x0=ri(-2,3),y0=x0*x0+b*x0+c,g=2*x0+b;if(!g){b++;y0=x0*x0+b*x0+c;g=2*x0+b}var m=fr(-1,g),cc=fr(y0*g+x0,g),xi=fr(y0*g+x0,1);
  return EX("q8b",1,"The point $P$ on the curve $y=x^2"+co(b,"x")+co(c,"")+"$ has $x$-coordinate "+x0+".",[
   {q:"Find the equation of the normal to the curve at $P$, in the form $y=mx+c$.",a:[A(m.s,m.t,"num","m ="),A(cc.s,cc.t,"num","c =")],m:4},
   {q:"The normal meets the $x$-axis at $Q$. Find the $x$-coordinate of $Q$.",a:[A(xi.s,xi.t,"num","x =")],m:1}],
   "Gradient of tangent $="+g+"$, normal gradient $="+m.t+"$, through "+pt([x0,y0]))};
var P9=function(){var p=ri(0,2),q=p+ri(2,4),Ar=fr(Math.pow(q-p,3),6),a=ri(1,4),b=ri(1,5),h=ri(1,4),V=fr(a*h*h+2*b*h,2);
  return EX("q9",1,"",[{q:"Find the area of the region enclosed by the curve $y="+polyT([-1,p+q,-p*q])+"$ and the $x$-axis.",a:[A(Ar.s,Ar.t,"num","area =")],m:4},
   {q:"The region between $y=\\sqrt{"+(a===1?"":a)+"x+"+b+"}$, the $x$-axis and the lines $x=0$ and $x="+h+"$ is rotated through $360^\\circ$ about the $x$-axis. Find the volume obtained, in terms of $\\pi$.",a:[A(V.s+"*pi",piT(V),"num","V =")],m:3}],
   "(a) roots $"+p+"$ and $"+q+"$: $\\int_{"+p+"}^{"+q+"}y\\,dx="+Ar.t+"$ (b) $\\pi\\int_0^{"+h+"}("+(a===1?"":a)+"x+"+b+")dx=\\pi\\left["+fr(a,2).t+"x^2+"+b+"x\\right]_0^{"+h+"}="+piT(V)+"$")};
var P9b=function(){var k=pick([3,6,9]),m=ri(1,6),x0=pick([1,4,9]),c=ri(-6,6),y0=2*k/3*Math.pow(x0,1.5)-m*x0+c;
  return EX("q9b",1,"A curve is such that $\\dfrac{dy}{dx}="+k+"x^{\\frac12}-"+m+"$ and the curve passes through the point "+pt([x0,y0])+".",[
   {q:"Find the equation of the curve. Give the constant term $c$ in $y="+2*k/3+"x^{\\frac32}-"+(m===1?"":m)+"x+c$.",a:[A(c,null,"num","c =")],m:4}],
   "Integrate: $y="+2*k/3+"x^{\\frac32}-"+(m===1?"":m)+"x+c$; substitute "+pt([x0,y0])+": $c="+c+"$")};
var G12X={31:{1:L(P1),2:L(P3,P2),3:L(P2,P3)},32:{1:L(P4),2:L(P5),3:L(P4,P5)},33:{1:L(P7,P7b),2:L(P6,P7),3:L(P6,P7b)},34:{1:L(P8b,P9b),2:L(P8,P9),3:L(P9,P8)}};

/* ===== បញ្ចូល ===== */
function reg(g,X0,title,names){var R=window.PRACT&&PRACT.GR[g];if(!R)return;Object.keys(X0).forEach(function(k){R.G[k]=X0[k]});R.les.push([title,names])}
reg(106,G6X,"📝 Checkpoint-style questions (Paper 1 · Paper 2)",[[31,"Checkpoint-style: Number"],[32,"Checkpoint-style: Calculation and ratio"],[33,"Checkpoint-style: Geometry and measures"],[34,"Checkpoint-style: Statistics and probability"]]);
reg(112,G12X,"📝 Exam-style questions (Pure Mathematics 1)",[[31,"Exam-style: Quadratics and functions"],[32,"Exam-style: Coordinate geometry and circular measure"],[33,"Exam-style: Series and trigonometry"],[34,"Exam-style: Differentiation and integration"]]);
window.CAMPAPERS=window.CAMPAPERS||{};
CAMPAPERS[106]={p1:{label:"Paper 1 style · Non-calculator",calc:false,title:"Paper 1 (Non-calculator) · Practice",secs:[[31,1],[32,1],[33,1],[34,1],[31,2],[32,1],[33,2],[34,2],[31,1],[33,1],[32,2],[34,1]]},
                p2:{label:"Paper 2 style · Calculator",calc:true,title:"Paper 2 (Calculator) · Practice",secs:[[32,3],[31,3],[33,3],[34,3],[32,2],[33,2],[31,2],[34,2],[32,3],[33,1],[31,1],[34,1]]}};
CAMPAPERS[112]={p1:{label:"Paper 1 style · Pure Mathematics 1",calc:true,title:"Pure Mathematics 1 · Practice paper",secs:[[31,1],[33,1],[32,1],[34,1],[31,2],[33,2],[32,2],[34,2],[31,3],[34,3]]}};
})();
