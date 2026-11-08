/* ========================================================================
   🇬🇧 Exam-style questions (IGCSE 0580 Extended · Paper 2 non-calculator / Paper 4 calculator)
   Modelled on the structure of the 2025 papers (multi-part questions, real contexts, «Show that», marks per part)
   · questions are original and regenerate with new numbers each time (no past-paper text is copied)
   Adds chapter «Exam-style questions» (lessons 31–35) to G10 (GR[110]) and G11 (GR[111])
   Level 1 = Paper 2 style (non-calculator) · Levels 2–3 = Paper 4 style (calculator)
   Load after practiceen.js / practiceen3.js
   ======================================================================== */
(function(){
"use strict";
var X=window.PX,E=window.PXEN,A=X.A,ri=X.ri,nz=X.nz,pick=X.pick,fr=X.fr,sg=X.sg,co=X.co,poly=X.poly,polyT=X.polyT,sgp=X.sgp,gcd=X.gcd;
var K=E.K,r2=E.r2,nf=E.nf,sqT=E.sqT,piT=E.piT,pt=E.pt,cv=E.cv,D=E.D,sum=E.sum;
var DP="Give your answer correct to 2 decimal places.";
/* សំណួរច្រើនផ្នែក៖ parts=[{q, a:[A…], m:ពិន្ទុ}] → (a)(b)(c) · o.mk ពិន្ទុសរុប · o.mks ពិន្ទុតាមបន្ទាត់ចម្លើយ */
function EX(kd,P,stem,parts,sol){var q=stem||"",a=[],mks=[],n=parts.length;
  parts.forEach(function(p,i){var lt=n>1?"("+"abcdefg"[i]+")":"";q+=(q?"\n":"")+(lt?lt+" ":"")+p.q;
    p.a.forEach(function(x,k){x.l=(lt&&k===0?lt+" ":"")+(x.l||"");a.push(x);mks.push(k===p.a.length-1?p.m:0)})});
  var o=K(kd,q,a,sol);o.mk=sum(parts.map(function(p){return p.m}));o.mks=mks;o.ex=true;o.pp=P;return o}
function EXF(f){var o=EX.apply(null,[].slice.call(arguments,1));try{o.fig=f}catch(e){}return o}
var FB=E.FB,mid=E.mid;function fx(v){return v<0?"+"+(-v):"-"+v}
function L(){var a=[].slice.call(arguments);return function(){return pick(a)()}}
function hm(m){return Math.floor(m/60)+" "+("0"+m%60).slice(-2)}
function ang(v){return Math.round(v*100)/100}
function brg(v){v=((v%360)+360)%360;return v}

/* =============================== NUMBER =============================== */
var N1=function(){var p=pick([1.2,1.5,2.4,3.5,4.8,0.85,2.25]),k=ri(3,12),s=ri(9*60,13*60),d=ri(95,250);
  return EX("xn1",2,"Aryan goes to the market.",[
   {q:"Oranges cost USD "+p+" per kg. Work out the cost of "+k+" kg of oranges.",a:[A(nf(p*k),null,"num","USD")],m:1},
   {q:"He leaves home at "+hm(s)+" and arrives home at "+hm(s+d)+". Find how many hours and minutes he was away.",a:[A(Math.floor(d/60),null,"num","h"),A(d%60,null,"num","min")],m:1}],
   "(a) $"+p+"\\times"+k+"="+nf(p*k)+"$ (b) "+hm(s)+" → "+hm(s+d)+" is $"+Math.floor(d/60)+"$ h $"+d%60+"$ min")};
var N3=function(){var C=pick([[20,10,8,25],[40,3,6,20],[30,4,8,15],[50,6,4,75],[60,0.5,3,10],[90,2,30,6],[80,0.3,6,4]]),jit=function(v){var d=v>=10?ri(-4,4)/10*(v/10):ri(-4,4)/100;return nf(+(v+d).toFixed(v>=10?2:3))};
  var a=jit(C[0]),b=jit(C[1]),c=jit(C[2]);
  return EX("xn3",2,"",[{q:"$D=\\dfrac{"+a+"\\times"+b+"}{"+c+"}$\nBy writing each number correct to 1 significant figure, work out an estimate for $D$.",a:[A(C[3],null,"num","D ≈")],m:3}],
   "$D\\approx\\dfrac{"+C[0]+"\\times"+C[1]+"}{"+C[2]+"}="+C[3]+"$")};
var N4=function(){var S=pick([2.5,3.5,4,6,8]),w=pick([20,30,35,40,45,60]),s1=pick([4,5,6,8]),inc=pick([10,20,25,50]),s2=s1*(1+inc/100),r=pick([20,25,30,60]),base=pick([20,30,40,50]),T=nf(base*(1+r/100)),prev=base;
  return EX("xn4",2,"A company sells items on a website and in shops.",[
   {q:"In February the company had sales of USD "+S+" million. "+w+"% of these sales were on the website.\nWork out the value of sales in shops in February.",a:[A(nf(S*(100-w)/100),null,"num","USD million")],m:3},
   {q:"In May the sales were USD "+s1+" million and in June they were USD "+nf(s2)+" million. Find the percentage increase in sales from May to June.",a:[A(inc,null,"num","%")],m:3},
   {q:"In 2024 the total sales were USD "+T+" million. This was an increase of "+r+"% on the total sales for 2023. Work out the total sales in 2023.",a:[A(prev,null,"num","USD million")],m:2}],
   "(a) $"+S+"\\times"+(100-w)/100+"="+nf(S*(100-w)/100)+"$ (b) $\\dfrac{"+nf(s2-s1)+"}{"+s1+"}\\times100="+inc+"\\%$ (c) $"+T+"\\div"+nf(1+r/100)+"="+prev+"$")};
var N5=function(){var r=pick([10,12,14,15,16,18,20]),p=pick([20,25,30,40,50]),H=40+ri(1,12)+pick([0,0.5]),pay=40*r+(H-40)*r*(1+p/100);
  return EX("xn5",4,"",[{q:"Each week Nisha is paid USD "+r+" per hour for the first 40 hours that she works. She is paid "+p+"% more per hour for any extra hours.\nOne week she works for "+H+" hours. Calculate how much she is paid that week.",a:[A(nf(pay),null,"num","USD")],m:3}],
   "Overtime rate $="+r+"\\times"+nf(1+p/100)+"="+nf(r*(1+p/100))+"$. Pay $=40\\times"+r+"+"+nf(H-40)+"\\times"+nf(r*(1+p/100))+"="+nf(pay)+"$")};
var N6=function(){var P=ri(10,40)*100,r=pick([2.5,3.2,4.2,5.5,6]),n=ri(3,8),v=P*Math.pow(1+r/100,n),n2=ri(8,15),x=(Math.pow(2,1/n2)-1)*100;
  return EX("xn6",4,"",[
   {q:"Midhil invests USD "+P+" at a rate of "+r+"% per year compound interest. Calculate the value of the investment at the end of "+n+" years. "+DP,a:[A(nf(v),null,"num","USD")],m:2},
   {q:"Hitanshi invests some money at a rate of $x$% per year compound interest. At the end of "+n2+" years the value of the investment has doubled. Calculate the value of $x$. "+DP,a:[A(nf(x),null,"num","x =")],m:3}],
   "(a) $"+P+"\\times"+nf(1+r/100)+"^{"+n+"}="+r2(v)+"$ (b) $\\left(1+\\dfrac{x}{100}\\right)^{"+n2+"}=2\\Rightarrow x=100(\\sqrt["+n2+"]{2}-1)="+r2(x)+"$")};
var N7=function(){var V=ri(30,90)*20,M=ri(30,99)*100,lb=(M-50)/(V+10);
  return EX("xn7",4,"[Density = mass ÷ volume]",[{q:"A piece of metal has volume "+V+" cm³, correct to the nearest 20 cm³. Its mass is "+M+" g, correct to the nearest 100 g.\nCalculate the lower bound of the density of the metal. "+DP,a:[A(nf(lb),null,"num","g/cm³")],m:3}],
   "Lower bound of density $=\\dfrac{\\text{lower mass}}{\\text{upper volume}}=\\dfrac{"+(M-50)+"}{"+(V+10)+"}="+r2(lb)+"$")};
var N8=function(){var a=ri(3,10),b=ri(1,a-1),k=pick([2,3,5]),c=pick([2,3,4,6,10]),d=pick([2,3,5,7].filter(function(x){return x!==k})),p=ri(2,6),q=pick([2,3,5,7]);var f=fr(c,d);
  return EX("xn8",2,"",[
   {q:"Simplify $\\sqrt{"+a*a*k+"}-\\sqrt{"+b*b*k+"}$.",a:[A((a-b)+"*sqrt("+k+")",(a-b===1?"":a-b)+"\\sqrt{"+k+"}","num","=")],m:2},
   {q:"Rationalise the denominator and simplify $\\dfrac{"+c+"}{\\sqrt{"+d+"}}$.",a:[A(c+"/sqrt("+d+")",f.d===1?(f.n===1?"":f.n)+"\\sqrt{"+d+"}":"\\dfrac{"+(f.n===1?"":f.n)+"\\sqrt{"+d+"}}{"+f.d+"}","num","=")],m:2},
   {q:"Expand and simplify $("+p+"+\\sqrt{"+q+"})("+p+"-\\sqrt{"+q+"})$.",a:[A(p*p-q,null,"num","=")],m:2}],
   "(a) $"+a+"\\sqrt{"+k+"}-"+b+"\\sqrt{"+k+"}$ (b) multiply by $\\dfrac{\\sqrt{"+d+"}}{\\sqrt{"+d+"}}$ (c) $"+p*p+"-"+q+"="+(p*p-q)+"$")};
var N9=function(){var w1=ri(1,4),n1=ri(1,3),d1=n1+ri(1,4),w2=ri(1,3),n2=ri(1,4),d2=n2+ri(1,4),p=w1*d1+n1,q=w2*d2+n2,f=fr(p*d2,d1*q);
  return EX("xn9",2,"",[{q:"Work out $"+w1+"\\tfrac{"+n1+"}{"+d1+"}\\div"+w2+"\\tfrac{"+n2+"}{"+d2+"}$.\nGive your answer as a fraction in its simplest form.",a:[A(f.s,f.t,"num","=")],m:3}],
   "$\\dfrac{"+p+"}{"+d1+"}\\times\\dfrac{"+d2+"}{"+q+"}="+f.t+"$")};
var N10=function(){var m=ri(101,999)/100,k=ri(2,5),N=nf(m/Math.pow(10,k)),a=ri(2,9),b=ri(3,6),s=E.std(a*a*Math.pow(10,2*b));
  return EX("xn10",4,"",[
   {q:"Write $"+N+"$ in standard form.",a:[A(m+"*10^(-"+k+")",m+"\\times10^{-"+k+"}","num","=")],m:1},
   {q:"Work out $("+a+"\\times10^{"+b+"})^2$. Give your answer in standard form.",a:[A(a*a+"*10^"+2*b,s[0]+"\\times10^{"+s[1]+"}","num","=")],m:2}],
   "(a) $"+m+"\\times10^{-"+k+"}$ (b) $"+a*a+"\\times10^{"+2*b+"}="+s[0]+"\\times10^{"+s[1]+"}$")};

/* =============================== ALGEBRA =============================== */
var A1=function(){var k=pick([2,3,4,5]),m=ri(2,12),p=ri(2,6),m2=ri(2,6),p2=ri(3,12),V2=k*m2*p2*p2;
  return EX("xa1",2,"$V="+k+"mp^2$",[
   {q:"Find $V$ when $m="+m+"$ and $p="+p+"$.",a:[A(k*m*p*p,null,"num","V =")],m:2},
   {q:"Find the positive value of $p$ when $V="+V2+"$ and $m="+m2+"$.",a:[A(p2,null,"num","p =")],m:2}],
   "(a) $V="+k+"\\times"+m+"\\times"+p*p+"="+k*m*p*p+"$ (b) $p^2=\\dfrac{"+V2+"}{"+k*m2+"}="+p2*p2+"\\Rightarrow p="+p2+"$")};
var A2=function(){var b=ri(2,5),d=ri(2,6),a=nz(-6,6),c=nz(-6,6),k=ri(2,9);if(b===d)d++;var n1=d+b,n0=a*d-c*b;
  return EX("xa2",2,"",[
   {q:"Write $\\dfrac{x"+sg(a)+"}{"+b+"}+\\dfrac{x"+sg(-c)+"}{"+d+"}$ as a single fraction in its simplest form.",a:[A("("+poly([n1,n0])+")/"+b*d,"\\dfrac{"+polyT([n1,n0])+"}{"+b*d+"}","expr","=")],m:3},
   {q:"Factorise $x^2-"+k*k+"$.",a:[A("(x-"+k+")*(x+"+k+")","(x-"+k+")(x+"+k+")","expr","=")],m:1}],
   "(a) $\\dfrac{"+d+"(x"+sg(a)+")+"+b+"(x"+sg(-c)+")}{"+b*d+"}$ (b) difference of two squares")};
var A3=function(){var A0=[ri(-3,5),ri(-3,9)],dx=2*nz(-3,3),dy=2*nz(-4,4),B0=[A0[0]+dx,A0[1]+dy],M=[A0[0]+dx/2,A0[1]+dy/2],m=fr(-dx,dy),c=fr(M[1]*dy+dx*M[0],dy);
  return EX("xa3",2,"",[{q:"$A$ is the point "+pt(A0)+" and $B$ is the point "+pt(B0)+".\nFind the equation of the perpendicular bisector of the line $AB$. Give your answer in the form $y=mx+c$.",a:[A(m.s,m.t,"num","m ="),A(c.s,c.t,"num","c =")],m:5}],
   "Midpoint "+pt(M)+", gradient $AB=\\dfrac{"+dy+"}{"+dx+"}$, perpendicular gradient $="+m.t+"$, $c="+c.t+"$")};
var A4=function(){var a=ri(1,3),d=ri(-6,6),ymx=2*a*a*a+d,ymn=-2*a*a*a+d;
  return EX("xa4",2,"A curve has equation $y=x^3-"+3*a*a+"x"+co(d,"")+"$.",[
   {q:"Find $\\dfrac{dy}{dx}$.",a:[A("3x^2-"+3*a*a,"3x^2-"+3*a*a,"expr","dy/dx =")],m:2},
   {q:"Find the coordinates of the maximum point and of the minimum point.",a:[A(-a,null,"num","max x ="),A(ymx,null,"num","max y ="),A(a,null,"num","min x ="),A(ymn,null,"num","min y =")],m:4},
   {q:"The equation $x^3-"+3*a*a+"x"+co(d,"")+"=k$ has three solutions. Find the range of possible values of $k$. Write it as $p\\lt k\\lt q$.",a:[A(ymn,null,"num","p ="),A(ymx,null,"num","q =")],m:2}],
   "$3x^2-"+3*a*a+"=0\\Rightarrow x=\\pm"+a+"$. Maximum "+pt([-a,ymx])+", minimum "+pt([a,ymn])+". Three solutions when $"+ymn+"\\lt k\\lt "+ymx+"$")};
var A5=function(){var m=ri(2,5),n=ri(2,4),p=ri(1,m*n-1),N=ri(3,15),x=fr(N-1,4);
  return EX("xa5",2,"",[
   {q:"Simplify $\\dfrac{(x^{"+m+"})^{"+n+"}}{x^{"+p+"}}$. Write your answer as $x^k$.",a:[A(m*n-p,null,"num","k =")],m:2},
   {q:"$16^x\\times2=2^{"+N+"}$. Find the value of $x$.",a:[A(x.s,x.t,"num","x =")],m:3}],
   "(a) $x^{"+m*n+"-"+p+"}$ (b) $2^{4x+1}=2^{"+N+"}\\Rightarrow4x+1="+N+"\\Rightarrow x="+x.t+"$")};
var A6=function(){var a=pick([2,3,4,5]),b=nz(-9,9);
  return EX("xa6",4,"$f(x)="+a+"x"+co(-b,"")+"$",[
   {q:"Find $f(-3)$.",a:[A(-3*a-b,null,"num","=")],m:1},
   {q:"Find $f(3x-2)$ in its simplest form.",a:[A(poly([3*a,-2*a-b]),polyT([3*a,-2*a-b]),"expr","=")],m:2},
   {q:"Find $f^{-1}(x)$.",a:[A("(x"+sg(b)+")/"+a,"\\dfrac{x"+sg(b)+"}{"+a+"}","expr","f⁻¹(x) =")],m:2}],
   "(b) $"+a+"(3x-2)"+co(-b,"")+"="+polyT([3*a,-2*a-b])+"$ (c) $y="+a+"x"+co(-b,"")+"\\Rightarrow x=\\dfrac{y"+sg(b)+"}{"+a+"}$")};
var A7=function(){var m=nz(-2,3),c=ri(-2,4),B=-(2+m),C=-3-c,Dd=B*B-4*C,x1=(-B-Math.sqrt(Dd))/2,x2=(-B+Math.sqrt(Dd))/2;
  return EX("xa7",4,"",[{q:"The line $y="+co(m,"x",true)+co(c,"")+"$ intersects the curve $y=x^2-2x-3$ at the points $P$ and $Q$.\nFind the coordinates of $P$ and $Q$. You must show all your working. "+DP,
   a:[A(nf(x1),null,"num","P: x ="),A(nf(m*x1+c),null,"num","y ="),A(nf(x2),null,"num","Q: x ="),A(nf(m*x2+c),null,"num","y =")],m:6}],
   "$x^2-2x-3="+co(m,"x",true)+co(c,"")+"\\Rightarrow "+polyT([1,B,C])+"=0\\Rightarrow x=\\dfrac{"+(-B)+"\\pm\\sqrt{"+Dd+"}}{2}="+r2(x1)+",\\ "+r2(x2)+"$")};
var A8=function(){var a=nz(2,7),b=ri(-5,6),c=ri(-6,8),k=pick([2,3,5]);
  return EX("xa8",4,"The table shows the first 4 terms of sequences A, B and C.\n$\\begin{array}{|c|c|c|c|c|}\\hline &\\text{1st}&\\text{2nd}&\\text{3rd}&\\text{4th}\\\\\\hline A&"+[1,2,3,4].map(function(n){return a*n+b}).join("&")+"\\\\\\hline B&"+[1,2,3,4].map(function(n){return n*n+c}).join("&")+"\\\\\\hline C&"+[1,2,3,4].map(function(n){return k*Math.pow(2,n)}).join("&")+"\\\\\\hline\\end{array}$",[
   {q:"Find the $n$th term of sequence A in the form $an+b$.",a:[A(a,null,"num","a ="),A(b,null,"num","b =")],m:2},
   {q:"Find the $n$th term of sequence B in the form $n^2+c$.",a:[A(c,null,"num","c =")],m:2},
   {q:"Find the $n$th term of sequence C in the form $k\\times2^n$.",a:[A(k,null,"num","k =")],m:2}],
   "A: difference $"+a+"$; B: compare with $1,4,9,16$; C: compare with $2,4,8,16$")};
var A10=function(){var a=ri(1,5),b=ri(1,3),Ar=ri(20,90),cA=2,cB=4*a-b,cC=-(a*b)-Ar;/* (x+a)(2x−b)… use (x+a)(2x+... ) */var p=2,q=2*a-b,r=-a*b-Ar,Dd=q*q-4*p*r,x=(-q+Math.sqrt(Dd))/(2*p);
  return EX("xa10",4,"A rectangle has length $(x+"+a+")$ cm and width $(2x-"+b+")$ cm. The area of the rectangle is "+Ar+" cm².",[
   {q:"Show that $2x^2"+co(q,"x")+"+c=0$ and find the value of $c$.",a:[A(r,null,"num","c =")],m:2},
   {q:"Solve the equation to find the value of $x$. "+DP,a:[A(nf(x),null,"num","x =")],m:3},
   {q:"Calculate the perimeter of the rectangle. "+DP,a:[A(nf(2*(x+a+2*x-b)),null,"num","cm")],m:1}],
   "(a) $(x+"+a+")(2x-"+b+")="+Ar+"\\Rightarrow2x^2"+co(q,"x")+co(-a*b,"")+"-"+Ar+"=0$ (b) $x=\\dfrac{"+(-q)+"+\\sqrt{"+Dd+"}}{4}="+r2(x)+"$ (c) $2(3x"+co(a-b,"")+")="+r2(2*(3*x+a-b))+"$")};

/* ========================= GEOMETRY & MENSURATION ========================= */
var G1=function(){var C=pick([[3,1.5,16],[3,3,4],[3,2,9],[3,1,36],[6,6,8],[6,12,2],[6,4,18],[6,3,32]]);
  return EX("xg1",2,"",[{q:"A sphere has radius "+C[0]+" cm. A cylinder has radius $r$ cm and height "+C[2]+" cm.\nThe volume of the cylinder is equal to the volume of the sphere. Find the value of $r$.\n[Volume of sphere $=\\tfrac43\\pi r^3$]",a:[A(C[1],null,"num","r =")],m:4}],
   "$\\tfrac43\\pi\\times"+C[0]+"^3=\\pi r^2\\times"+C[2]+"\\Rightarrow r^2="+nf(C[1]*C[1])+"\\Rightarrow r="+C[1]+"$")};
var G2=function(){var C=pick([[[4,6,12],"3 : 4 : 5"],[[3,8,24],"4 : 9 : 11"],[[3,9,18],"3 : 7 : 8"],[[3,10,15],"5 : 12 : 13"],[[4,5,20],"5 : 6 : 9"]]);
  return EX("xg2",2,"Three regular polygons A, B and C meet at a point, with no gaps.\nThe interior angles of the polygons are in the ratio $a:b:c="+C[1]+"$.",[{q:"Find the number of sides of each polygon.",a:[A(C[0][0],null,"num","A:"),A(C[0][1],null,"num","B:"),A(C[0][2],null,"num","C:")],m:5}],
   "Angles at a point add to $360^\\circ$, so the angles are $"+C[0].map(function(n){return 180-360/n}).join("^\\circ,")+"^\\circ$. Exterior angles $"+C[0].map(function(n){return 360/n}).join(",")+"$ give $"+C[0].join(", ")+"$ sides")};
var G3=function(){var l=ri(8,20),r=ri(3,l-2),h=Math.sqrt(l*l-r*r);
  var sc=3.2/l,R=r*sc,Hh=h*sc,FIGv=FB({S:[0,Hh,"n"],A:[-R,0,"w"],B:[R,0,"e"],O:[0,0,"s"]},["seg S A black","seg S B black","x^2/"+(R*R).toFixed(3)+"+y^2/"+(.09*R*R).toFixed(3)+"=1 black","seg S O gray","seg O B gray","text "+mid([0,Hh],[R,0],.45,.15)+" "+l+" cm","text "+mid([0,0],[R,0],0,-.45)+" "+r+" cm"]);return EXF(FIGv,"xg3",4,"A cone has sloping edge "+l+" cm and base radius "+r+" cm.",[
   {q:"Calculate the total surface area of the cone. "+DP,a:[A(nf(Math.PI*r*l+Math.PI*r*r),null,"num","cm²")],m:3},
   {q:"Calculate the volume of the cone. "+DP,a:[A(nf(Math.PI*r*r*h/3),null,"num","cm³")],m:3}],
   "(a) $\\pi rl+\\pi r^2="+r2(Math.PI*r*l+Math.PI*r*r)+"$ (b) $h=\\sqrt{"+l*l+"-"+r*r+"}$, $V=\\tfrac13\\pi r^2h="+r2(Math.PI*r*r*h/3)+"$")};
var G4=function(){var R=pick([2,2.5,3,3.5,4]),H=+(R+pick([0.4,0.5,0.6,0.8,1])).toFixed(1),Lg=ri(2,9)*100,t=2*Math.acos((H-R)/R),seg=R*R/2*(t-Math.sin(t)),maj=Math.PI*R*R-seg,V=maj*Lg;
  var dd=H-R,cc=Math.sqrt(R*R-dd*dd),FIGv=FB({O:[0,0,"w"],P:[-cc,-dd,"sw"],Q:[cc,-dd,"se"],M:[0,-dd,"s"],T:[0,R,"n"]},["circle O "+R+" black","seg P Q black","seg M T gray","seg O Q gray","text "+mid([0,-dd],[0,R],.55,0)+" "+H+" m","text "+mid([0,0],[cc,-dd],.25,.3)+" "+R+" m"]);return EXF(FIGv,"xg4",4,"The cross-section of a tunnel is the major segment of a circle, centre $O$, radius "+R+" m. The height of the tunnel is "+H+" m.",[
   {q:"Calculate the area of the cross-section. "+DP,a:[A(nf(maj),null,"num","m²")],m:5},
   {q:"The tunnel is "+Lg+" m long. Calculate the volume of the tunnel. "+DP,a:[A(nf(V),null,"num","m³")],m:1}],
   "The floor is a chord "+nf(H-R)+" m below $O$. Angle subtended $=2\\cos^{-1}\\left(\\dfrac{"+nf(H-R)+"}{"+R+"}\\right)="+r2(t)+"$ rad; minor segment $=\\tfrac12r^2(\\theta-\\sin\\theta)="+r2(seg)+"$; major segment $=\\pi r^2-"+r2(seg)+"="+r2(maj)+"$")};
var G5=function(){var p=ri(95,130),r=ri(25,p-60);
  var pc=function(a){return[3*Math.cos(a*D),3*Math.sin(a*D)]},CC=pc(30),tv=[-Math.sin(30*D)*2.2,Math.cos(30*D)*2.2],FIGv=FB({O:[0,0,"s"],A:pc(210).concat("sw"),B:pc(130).concat("nw"),C:CC.concat("e"),D:pc(305).concat("se"),E:pc(255).concat("s"),F:[CC[0]+tv[0],CC[1]+tv[1],"n"],G:[CC[0]-tv[0],CC[1]-tv[1],"e"]},["circle O 3 black","poly A B C D black","seg B D black","seg E B black","seg E C black","seg F G black","angle B A D "+p+"°","angle B E C "+r+"°"]);return EXF(FIGv,"xg5",2,"$A$, $B$, $C$, $D$ and $E$ lie on a circle. $FG$ is a tangent to the circle at $C$.\nAngle $BAD="+p+"^\\circ$ and angle $BEC="+r+"^\\circ$.",[
   {q:"Find angle $BCD$. Give a geometrical reason for your answer.",a:[A(180-p,null,"num","BCD =")],m:2},
   {q:"Find angle $DBC$.",a:[A(p-r,null,"num","DBC =")],m:2},
   {q:"Find angle $DCG$, where $G$ is on the same side of $C$ as $D$.",a:[A(p-r,null,"num","DCG =")],m:1}],
   "(a) opposite angles of a cyclic quadrilateral add up to $180^\\circ$ (b) $BDC=BEC="+r+"^\\circ$ (same segment), so $DBC=180-"+(180-p)+"-"+r+"="+(p-r)+"^\\circ$ (c) alternate segment theorem: $DCG=DBC="+(p-r)+"^\\circ$")};
var G6=function(){var r=ri(5,15),t=ri(30,160),arc=2*Math.PI*r*t/360;
  var tt=t*D,FIGv=FB({O:[0,0,"sw"],A:[3,0,"e"],B:[3*Math.cos(tt),3*Math.sin(tt),"n"]},["circle O 3 gray","seg O A black","seg O B black","angle A O B "+t+"°","text (1.5,-0.4) "+r+" cm"],{ext:[[-3,-3],[3,3]]});return EXF(FIGv,"xg6",4,"The diagram shows a sector of a circle with radius "+r+" cm and angle "+t+"°.",[
   {q:"Calculate the perimeter of the sector. "+DP,a:[A(nf(arc+2*r),null,"num","cm")],m:3},
   {q:"Calculate the area of the sector. "+DP,a:[A(nf(Math.PI*r*r*t/360),null,"num","cm²")],m:2}],
   "(a) arc $="+r2(arc)+"$, perimeter $=arc+2r="+r2(arc+2*r)+"$ (b) $\\dfrac{"+t+"}{360}\\pi r^2="+r2(Math.PI*r*r*t/360)+"$")};

/* ========================= TRIGONOMETRY & VECTORS ========================= */
var T1=function(){var th=ri(100,170),p=ri(40,90),q=ri(40,110),g=ri(30,70);
  var C0=[p*Math.sin(th*D),p*Math.cos(th*D)],bc=brg(th+180-g),B0=[C0[0]+q*Math.sin(bc*D),C0[1]+q*Math.cos(bc*D)],AB=Math.hypot(B0[0],B0[1]),bab=brg(Math.atan2(B0[0],B0[1])/D);
  var sc=3.2/Math.max(Math.hypot(C0[0],C0[1]),Math.hypot(B0[0],B0[1]),1),cP=[C0[0]*sc,C0[1]*sc],bP=[B0[0]*sc,B0[1]*sc],FIGv=FB({A:[0,0,"w"],C:cP.concat("s"),B:bP.concat("e"),N:[0,1.3,"n"]},["vec A N black","seg A C black","seg C B black","seg A B gray","angle A C B "+g+"°","text "+mid([0,0],cP,-.45,0)+" "+p+" m","text "+mid(cP,bP,.45,0)+" "+q+" m"]);return EXF(FIGv,"xt1",4,"$A$, $B$ and $C$ are three points on horizontal ground. $AC="+p+"$ m and $BC="+q+"$ m.\nThe bearing of $C$ from $A$ is "+("00"+th).slice(-3)+"° and angle $ACB="+g+"$°.",[
   {q:"The bearing of $B$ from $C$ is less than the bearing of $A$ from $C$. Find the bearing of $B$ from $C$.",a:[A(bc,null,"num","bearing =")],m:2},
   {q:"Calculate $AB$. "+DP,a:[A(nf(AB),null,"num","m")],m:3},
   {q:"Calculate the bearing of $B$ from $A$. "+DP,a:[A(nf(bab),null,"num","bearing =")],m:2}],
   "(a) bearing of $A$ from $C="+brg(th+180)+"^\\circ$, so $B$ from $C="+brg(th+180)+"-"+g+"="+bc+"^\\circ$ (b) $AB^2="+p+"^2+"+q+"^2-2\\times"+p+"\\times"+q+"\\cos"+g+"^\\circ\\Rightarrow AB="+r2(AB)+"$ (c) use the sine rule for angle $BAC$, then bearing $="+r2(bab)+"^\\circ$")};
var T2=function(){var k=pick([1,1.2,0.6,0.8,1.4,-0.6,-1,-1.4]),c=-k/2,x1=Math.acos(c)/D,x2=360-x1;
  return EX("xt2",4,"",[{q:"Solve the equation $2\\cos x"+(k<0?"-":"+")+Math.abs(k)+"=0$ for $0^\\circ\\le x\\le360^\\circ$. "+DP,a:[A(nf(x1),null,"num","x₁ ="),A(nf(x2),null,"num","x₂ =")],m:3}],
   "$\\cos x="+nf(c)+"\\Rightarrow x="+r2(x1)+"^\\circ$ or $360-"+r2(x1)+"="+r2(x2)+"^\\circ$")};
var T3=function(){var p=ri(1,5),q=ri(1,5);if(p===q)q++;var e1=fr(q,p+q),e2=fr(p,p+q),c1=fr(q,p+q),cm=fr(2*q-(p+q),2*(p+q));
  var Oo=[0,0],Aa=[1,3.4],Bb=[5,.6],Ee=[Aa[0]+(Bb[0]-Aa[0])*p/(p+q),Aa[1]+(Bb[1]-Aa[1])*p/(p+q)],FIGv=FB({O:[0,0,"sw"],A:Aa.concat("n"),B:Bb.concat("e"),C:[.5,1.7,"w"],E:Ee.concat("ne")},["poly O A B black","seg C E gray","text "+mid(Oo,Aa,-.9,.3)+" a","text "+mid(Oo,Bb,0,-.4)+" b"]);return EXF(FIGv,"xt3",4,"$OAB$ is a triangle. $\\overrightarrow{OA}=\\mathbf a$ and $\\overrightarrow{OB}=\\mathbf b$. $C$ is the midpoint of $OA$. $E$ lies on $AB$ with $AE:EB="+p+":"+q+"$.",[
   {q:"Find the position vector of $E$ in the form $s\\mathbf a+t\\mathbf b$.",a:[A(e1.s,e1.t,"num","s ="),A(e2.s,e2.t,"num","t =")],m:2},
   {q:"Find $\\overrightarrow{CE}$ in the form $u\\mathbf a+v\\mathbf b$.",a:[A(cm.s,cm.t,"num","u ="),A(e2.s,e2.t,"num","v =")],m:2}],
   "(a) $\\mathbf a+\\dfrac{"+p+"}{"+(p+q)+"}(\\mathbf b-\\mathbf a)="+e1.t+"\\mathbf a+"+e2.t+"\\mathbf b$ (b) $\\overrightarrow{CE}=\\overrightarrow{OE}-\\tfrac12\\mathbf a="+cm.t+"\\mathbf a+"+e2.t+"\\mathbf b$")};
var T4=function(){var A0=[ri(-6,4),ri(-4,6)],v=[nz(-6,6),nz(-5,5)],B0=[A0[0]-v[0],A0[1]-v[1]],C0=[ri(-6,6),ri(-6,6)],m=9*(v[0]*v[0]+v[1]*v[1]);
  return EX("xt4",2,"Point $A$ has coordinates "+pt(A0)+" and $\\overrightarrow{BA}="+cv(v)+"$.",[
   {q:"Find the coordinates of point $B$.",a:[A(B0[0],null,"num","x ="),A(B0[1],null,"num","y =")],m:2},
   {q:"Point $C$ has coordinates "+pt(C0)+". Find the vector $\\overrightarrow{AC}$.",a:[A(C0[0]-A0[0],null,"num","x ="),A(C0[1]-A0[1],null,"num","y =")],m:1},
   {q:"$\\overrightarrow{EF}=3\\overrightarrow{BA}$. Find $|\\overrightarrow{EF}|$, giving your answer as an exact value.",a:[A("sqrt("+m+")",sqT(m),"num","|EF| =")],m:3}],
   "(a) $B=A-\\overrightarrow{BA}$ (b) $\\overrightarrow{AC}=\\mathbf c-\\mathbf a$ (c) $3"+cv(v)+"$, magnitude $\\sqrt{"+m+"}="+sqT(m)+"$")};
var T5=function(){var a=ri(5,15),b=ri(5,15),Cc=ri(30,150),S=0.5*a*b*Math.sin(Cc*D),c=Math.sqrt(a*a+b*b-2*a*b*Math.cos(Cc*D));
  var sc=4/Math.max(a,b),FIGv=FB({C:[0,0,"sw"],B:[a*sc,0,"se"],A:[b*sc*Math.cos(Cc*D),b*sc*Math.sin(Cc*D),"n"]},["poly A B C black","angle B C A "+Cc+"°","text "+mid([0,0],[a*sc,0],0,-.4)+" "+a+" cm","text "+mid([0,0],[b*sc*Math.cos(Cc*D),b*sc*Math.sin(Cc*D)],-.5,.1)+" "+b+" cm"]);return EXF(FIGv,"xt5",4,"In triangle $ABC$, $BC="+a+"$ cm, $AC="+b+"$ cm and angle $ACB="+Cc+"$°.",[
   {q:"Calculate the area of triangle $ABC$. "+DP,a:[A(nf(S),null,"num","cm²")],m:2},
   {q:"Calculate $AB$. "+DP,a:[A(nf(c),null,"num","cm")],m:3}],
   "(a) $\\tfrac12ab\\sin C="+r2(S)+"$ (b) cosine rule: $AB="+r2(c)+"$")};

/* ========================= STATISTICS & PROBABILITY ========================= */
var S1=function(){var w=pick([0.3,0.35,0.4,0.25,0.45]),l=pick([0.25,0.2,0.3,0.15]),d=nf(1-w-l),N=pick([80,120,200,60,40]);
  return EX("xs1",2,"Pryanka plays a game in which she can win, lose or draw.\n$\\begin{array}{|c|c|c|c|}\\hline \\text{Result}&\\text{win}&\\text{lose}&\\text{draw}\\\\\\hline \\text{Probability}&"+w+"&"+l+"&\\\\\\hline\\end{array}$",[
   {q:"Find the probability that she draws a game.",a:[A(d,null,"num","P(draw) =")],m:2},
   {q:"She plays the game "+N+" times. Work out the expected number of games she wins.",a:[A(nf(N*w),null,"num","=")],m:1}],
   "(a) $1-"+w+"-"+l+"="+d+"$ (b) $"+N+"\\times"+w+"="+nf(N*w)+"$")};
var S2=function(){var v=[];while(v.length<13){var x=ri(31,58);if(x!==50&&v.indexOf(x)<0)v.push(x)}v.sort(function(a,b){return a-b});
  var lq=(v[2]+v[3])/2,uq=(v[9]+v[10])/2,lo=v.filter(function(x){return x<50}).length,hi=13-lo,p=fr(2*lo*hi,13*12);
  var st=[3,4,5].map(function(s){return s+"\\ |\\ "+v.filter(function(x){return Math.floor(x/10)===s}).map(function(x){return x%10}).join("\\ ")}).join("\\\\");
  return EX("xs2",2,"The stem-and-leaf diagram shows the mass, in grams, of each of 13 packets.\n$\\begin{array}{l}"+st+"\\end{array}$ Key: $3\\,|\\,1$ represents 31 g",[
   {q:"Work out the interquartile range.",a:[A(uq-lq,null,"num","g")],m:3},
   {q:"Two of these packets are chosen at random. Find the probability that one packet has a mass of more than 50 g and the other has a mass of less than 50 g.",a:[A(p.s,p.t,"num","P =")],m:3}],
   "(a) $LQ="+lq+"$, $UQ="+uq+"$, $IQR="+(uq-lq)+"$ (b) $2\\times\\dfrac{"+lo+"}{13}\\times\\dfrac{"+hi+"}{12}="+p.t+"$")};
var S3=function(){var b=[1.2,1.5,1.6,1.7,1.9],f=[ri(8,16),ri(15,25),ri(25,40),ri(10,18)],N=sum(f),mid=[1.35,1.55,1.65,1.8],S=0;mid.forEach(function(m,i){S+=m*f[i]});var mean=S/N,fd=f[2]/0.1;
  return EX("xs3",4,"Virat records the height, $h$ metres, of each of "+N+" sunflowers.\n$\\begin{array}{|c|c|c|c|c|}\\hline h&1.2\\lt h\\le1.5&1.5\\lt h\\le1.6&1.6\\lt h\\le1.7&1.7\\lt h\\le1.9\\\\\\hline \\text{Frequency}&"+f.join("&")+"\\\\\\hline\\end{array}$",[
   {q:"Calculate an estimate of the mean height. "+DP,a:[A(nf(mean),null,"num","m")],m:4},
   {q:"In a histogram of this data, find the frequency density for the class $1.6\\lt h\\le1.7$.",a:[A(nf(fd),null,"num","f.d. =")],m:2}],
   "(a) midpoints $1.35, 1.55, 1.65, 1.8$: $\\dfrac{"+nf(r2(S))+"}{"+N+"}="+r2(mean)+"$ (b) $\\dfrac{"+f[2]+"}{0.1}="+nf(fd)+"$")};
var S4=function(){var r=ri(3,8),b=ri(3,8),T=r+b,same=fr(r*(r-1)+b*(b-1),T*(T-1)),one=fr(T*(T-1)-r*(r-1),T*(T-1));
  return EX("xs4",4,"A bag contains "+r+" red sweets and "+b+" blue sweets. Sam takes two sweets at random, without replacement.",[
   {q:"Find the probability that both sweets are the same colour.",a:[A(same.s,same.t,"num","P =")],m:3},
   {q:"Find the probability that at least one sweet is blue.",a:[A(one.s,one.t,"num","P =")],m:3}],
   "(a) $\\dfrac{"+r+"}{"+T+"}\\times\\dfrac{"+(r-1)+"}{"+(T-1)+"}+\\dfrac{"+b+"}{"+T+"}\\times\\dfrac{"+(b-1)+"}{"+(T-1)+"}="+same.t+"$ (b) $1-P(\\text{both red})="+one.t+"$")};
var S5=function(){var a=ri(10,25),b=ri(10,25),n=ri(2,Math.min(a,b)-2),U=a+b-n+ri(3,12),o=fr(a-n,U);
  return EX("xs5",2,"In a group of "+U+" students, "+a+" study French ($F$), "+b+" study Spanish ($S$) and "+n+" study both.",[
   {q:"Find $n((F\\cup S)')$.",a:[A(U-(a+b-n),null,"num","=")],m:2},
   {q:"A student is chosen at random. Find the probability that this student studies French but not Spanish.",a:[A(o.s,o.t,"num","P =")],m:2}],
   "(a) $"+U+"-("+a+"+"+b+"-"+n+")="+(U-(a+b-n))+"$ (b) $\\dfrac{"+(a-n)+"}{"+U+"}"+(gcd(a-n,U)>1?"="+o.t:"")+"$")};

/* ===== បញ្ចូលក្នុង G10 · G11 (មេរៀន ៣១–៣៥) ===== */
var XG={31:{1:L(N1,N3,N4,N8,N9),2:L(N10,N5),3:L(N6,N7)},
        32:{1:L(A1,A2,A5,A3),2:L(A6,A8),3:L(A4,A7,A10)},
        33:{1:L(G1,G2,G5),2:L(G3,G6),3:L(G4,G3)},
        34:{1:L(T4),2:L(T3,T5,T2),3:L(T1)},
        35:{1:L(S1,S5,S2),2:L(S4,S2),3:L(S3)}};
var XL=["📝 Exam-style questions (Paper 2 · Paper 4)",[[31,"Exam-style: Number"],[32,"Exam-style: Algebra"],[33,"Exam-style: Geometry and mensuration"],[34,"Exam-style: Trigonometry and vectors"],[35,"Exam-style: Statistics and probability"]]];
[110,111].forEach(function(g){var R=window.PRACT&&PRACT.GR[g];if(!R)return;Object.keys(XG).forEach(function(k){R.G[k]=XG[k]});R.les.push(XL)});
/* ក្រដាសប្រឡងពេញ (សម្រាប់ exam.js)៖ [មេរៀន, កម្រិត] តាមលំដាប់ Paper 2 / Paper 4 */
var CAMPAPER={
  p2:[[31,1],[31,1],[32,1],[31,1],[33,1],[35,1],[32,1],[33,1],[34,1],[31,1],[35,1],[32,1],[33,1],[32,1]],
  p4:[[31,2],[31,2],[32,2],[35,3],[33,2],[31,3],[32,2],[34,2],[33,3],[32,3],[35,2],[34,3],[31,3],[32,3],[34,2]]};
var IG={p2:{label:"Paper 2 style · Non-calculator",calc:false,title:"Paper 2 (Non-calculator) · Practice",secs:CAMPAPER.p2},p4:{label:"Paper 4 style · Calculator",calc:true,title:"Paper 4 (Calculator) · Practice",secs:CAMPAPER.p4}};
window.CAMPAPERS=window.CAMPAPERS||{};window.CAMPAPERS[110]=IG;window.CAMPAPERS[111]=IG;
})();
