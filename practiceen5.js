/* ========================================================================
   🇬🇧 Checkpoint-style questions (Cambridge Lower Secondary · Stage 7–9)
   Paper 1 non-calculator · Paper 2 calculator — short structured questions with marks
   Original questions in Cambridge style (written from the general paper format, not copied)
   Adds chapter «Checkpoint-style questions» (lessons 31–34) to G7, G8, G9 (GR[107..109])
   Level 1–2 = Paper 1 style (non-calculator) · Level 3 = Paper 2 style (calculator)
   Load after practiceen4.js
   ======================================================================== */
(function(){
"use strict";
var X=window.PX,E=window.PXEN,A=X.A,ri=X.ri,nz=X.nz,pick=X.pick,fr=X.fr,sg=X.sg,co=X.co,poly=X.poly,polyT=X.polyT,sgp=X.sgp,gcd=X.gcd;
var K=E.K,r2=E.r2,nf=E.nf,sqT=E.sqT,pt=E.pt,D=E.D,sum=E.sum;
var DP="Give your answer correct to 2 decimal places.",DP1="Give your answer correct to 1 decimal place.";
function EX(kd,P,stem,parts,sol){var q=stem||"",a=[],mks=[],n=parts.length;
  parts.forEach(function(p,i){var lt=n>1?"("+"abcdefg"[i]+")":"";q+=(q?"\n":"")+(lt?lt+" ":"")+p.q;
    p.a.forEach(function(x,k){x.l=(lt&&k===0?lt+" ":"")+(x.l||"");a.push(x);mks.push(k===p.a.length-1?p.m:0)})});
  var o=K(kd,q,a,sol);o.mk=sum(parts.map(function(p){return p.m}));o.mks=mks;o.ex=true;o.pp=P;return o}
function lcm(a,b){return a/gcd(a,b)*b}
function hm(m){return("0"+Math.floor(m/60)%24).slice(-2)+":"+("0"+m%60).slice(-2)}
function tb(r){return"$\\begin{array}{|"+r[0].map(function(){return"c|"}).join("")+"}\\hline "+r.map(function(x){return x.join("&")}).join("\\\\\\hline ")+"\\\\\\hline\\end{array}$"}
/* ពាក្យតំណាង (s = stage 7/8/9) */
var T=[];function add(st,str,lv,f){T.push({st:st,str:str,lv:lv,f:f})}

/* =============================== NUMBER (31) =============================== */
add([7,8],31,1,function(){var a=[];while(a.length<5){var v=ri(100,999)/100*pick([1,1,10]);v=nf(+v.toFixed(v>=10?1:2));if(a.indexOf(v)<0)a.push(v)}var s=a.map(Number).sort(function(x,y){return x-y});
  return EX("cn1",1,"",[{q:"Here are five numbers: $"+a.join(",\\ \\ ")+"$\nWrite down the smallest number and the largest number.",a:[A(s[0],null,"num","smallest ="),A(s[4],null,"num","largest =")],m:2}],"Compare place value from the left: smallest $"+s[0]+"$, largest $"+s[4]+"$")});
add([7],31,1,function(){var C=["Moscow","Oslo","Cairo","Lima","Tokyo"],t=C.map(function(){return ri(-15,25)}),i=0,j=1;while(t[0]===t[1])t[1]++;var mx=Math.max.apply(null,t),mn=Math.min.apply(null,t),r=ri(3,12);
  return EX("cn2",1,"The table shows the temperature in five cities at midnight.\n"+tb([["\\text{City}"].concat(C.map(function(c){return"\\text{"+c+"}"})),["^\\circ\\text{C}"].concat(t)]),[
   {q:"Work out the difference between the highest and the lowest temperature.",a:[A(mx-mn,null,"num","°C")],m:1},
   {q:"By midday, the temperature in Moscow has risen by "+r+"°C. Work out the temperature in Moscow at midday.",a:[A(t[0]+r,null,"num","°C")],m:1}],
   "(a) $"+mx+"-("+mn+")="+(mx-mn)+"$ (b) $"+t[0]+"+"+r+"="+(t[0]+r)+"$")});
add([7,8],31,1,function(){var d=pick([3,4,5,6,8]),n;do{n=ri(1,d-1)}while(gcd(n,d)>1);var N=d*ri(4,15),b=pick([2,3,4,5,6]),c=pick([3,4,5,6,8].filter(function(x){return x!==b})),p=ri(1,b-1),q=ri(1,c-1),f=fr(p*c+q*b,b*c);
  return EX("cn3",1,"",[{q:"Work out $\\frac{"+n+"}{"+d+"}$ of "+N+".",a:[A(N/d*n,null,"num","=")],m:1},
   {q:"Work out $\\frac{"+p+"}{"+b+"}+\\frac{"+q+"}{"+c+"}$. Give your answer as a fraction in its simplest form.",a:[A(f.s,f.t,"num","=")],m:2}],
   "(a) $"+N+"\\div"+d+"\\times"+n+"="+N/d*n+"$ (b) $\\frac{"+(p*c)+"+"+(q*b)+"}{"+b*c+"}="+f.t+"$")});
add([8,9],31,2,function(){var P=ri(4,20)*10,a=pick([10,20,25]),b=pick([15,30,35,40]),m=ri(1,3),A1=P*(1-a/100),B1=(P+m*5)*(1-b/100);if(A1===B1)B1-=5;
  return EX("cn4",1,"Two shops sell the same jacket.\nShop A: price "+P+" dollars, "+a+"% off.\nShop B: price "+(P+m*5)+" dollars, "+b+"% off.",[
   {q:"Work out the sale price at Shop A.",a:[A(nf(A1),null,"num","dollars")],m:2},
   {q:"Which shop is cheaper, and by how much?",a:[A(nf(Math.abs(A1-B1)),null,"num","cheaper by")],m:2}],
   "(a) $"+P+"\\times"+nf(1-a/100)+"="+nf(A1)+"$ (b) Shop B: $"+nf(B1)+"$, so Shop "+(A1<B1?"A":"B")+" is cheaper by $"+nf(Math.abs(A1-B1))+"$")});
add([8,9],31,2,function(){var a=pick([6,8,10,12,15]),b=pick([9,10,12,15,20].filter(function(x){return x!==a})),s=ri(6*60,8*60),L=lcm(a,b);
  return EX("cn5",1,"",[{q:"Bus A leaves the bus station every "+a+" minutes. Bus B leaves every "+b+" minutes. Both buses leave together at "+hm(s)+".\nWhen do both buses next leave together? Write the time in hours and minutes.",a:[A(Math.floor((s+L)/60),null,"num","hours ="),A((s+L)%60,null,"num","minutes =")],m:3}],
   "LCM of $"+a+"$ and $"+b+"$ is $"+L+"$, so they next leave together at "+hm(s+L))});
add([9],31,2,function(){var a=ri(2,9),b=ri(2,6),m=ri(2,5),n=ri(2,5);
  return EX("cn6",1,"",[{q:"Write "+a*Math.pow(10,b)+" in standard form.",a:[A(a+"*10^"+b,a+"\\times10^{"+b+"}","num","=")],m:1},
   {q:"Simplify $"+m+"^{"+n+"}\\times"+m+"^{"+(n+1)+"}$. Give your answer as a power of "+m+".",a:[A(2*n+1,null,"num",m+"^")],m:1}],
   "(a) $"+a+"\\times10^{"+b+"}$ (b) add the indices: $"+m+"^{"+(2*n+1)+"}$")});
add([7,8],31,1,function(){var a=ri(1,5),b=ri(2,7),k=ri(2,6);if(a===b)b++;var T0=(a+b)*k;
  return EX("cn7",1,"",[{q:"Red paint and white paint are mixed in the ratio $"+a+":"+b+"$. Sami makes "+T0+" litres of the mixture.\nHow many litres of red paint does he use?",a:[A(a*k,null,"num","litres")],m:2}],
   "$"+T0+"\\div"+(a+b)+"="+k+"$ litres per part, red $="+a+"\\times"+k+"="+a*k+"$")});
add([9],31,3,function(){var p=pick([10,15,20,25,30]),O=ri(4,40)*20,N=O*(1+p/100),r=pick([2,3,4,5]),P=ri(5,30)*100,n=pick([2,3]);
  return EX("cn8",2,"",[{q:"After a "+p+"% increase, the price of a bike is "+nf(N)+" dollars. Work out the price before the increase.",a:[A(O,null,"num","dollars")],m:2},
   {q:P+" dollars is invested at "+r+"% per year compound interest. Calculate the value after "+n+" years. "+DP,a:[A(nf(P*Math.pow(1+r/100,n)),null,"num","dollars")],m:2}],
   "(a) $"+nf(N)+"\\div"+nf(1+p/100)+"="+O+"$ (b) $"+P+"\\times"+nf(1+r/100)+"^{"+n+"}="+r2(P*Math.pow(1+r/100,n))+"$")});
add([8,9],31,3,function(){var a=ri(1000,9999)/100,b=ri(100,999)/10,c=ri(11,99)/10,v=a*b/c;
  return EX("cn9",2,"",[{q:"Use your calculator to work out $\\frac{"+a+"\\times"+b+"}{"+c+"}$. "+DP,a:[A(nf(v),null,"num","=")],m:1},
   {q:"Round your answer to part (a) to 2 significant figures.",a:[A(nf(+v.toPrecision(2)),null,"num","=")],m:1}],"(a) $"+r2(v)+"$ (b) $"+(+v.toPrecision(2))+"$")});
add([7],31,1,function(){var a=ri(10,40),b=ri(2,9),c=ri(2,6),d=ri(2,9),e=ri(1,9);
  return EX("cn10",1,"",[{q:"Work out $"+a+"-"+b+"\\times"+c+"$.",a:[A(a-b*c,null,"num","=")],m:1},{q:"Work out $("+d+"+"+e+")\\times"+c+"$.",a:[A((d+e)*c,null,"num","=")],m:1}],
   "Multiply before subtracting; brackets first")});
add([7,8],31,3,function(){var p=ri(105,999)/100,k=ri(3,12),B=pick([20,50,100]);
  return EX("cn11",2,"",[{q:"A pen costs "+p+" dollars. Ana buys "+k+" pens and pays with a "+B+" dollar note. Calculate her change.",a:[A(nf(B-p*k),null,"num","dollars")],m:2}],"$"+B+"-"+k+"\\times"+p+"="+nf(B-p*k)+"$")});

/* =============================== ALGEBRA (32) =============================== */
add([7,8],32,1,function(){var a=nz(-6,6),b=nz(-6,6),p=ri(2,6),q=ri(2,6);
  return EX("ca1",1,"$a="+a+"$ and $b="+b+"$.",[{q:"Work out the value of $"+p+"a+b$.",a:[A(p*a+b,null,"num","=")],m:1},{q:"Work out the value of $a^2-"+q+"b$.",a:[A(a*a-q*b,null,"num","=")],m:1}],
   "(a) $"+p+"\\times"+sgp(a)+"+"+sgp(b)+"="+(p*a+b)+"$ (b) $"+a*a+"-"+q+"\\times"+sgp(b)+"="+(a*a-q*b)+"$")});
add([7,8],32,1,function(){var a=ri(2,6),b=nz(-7,7),c=ri(2,5),d=nz(-6,6);
  return EX("ca2",1,"",[{q:"Expand $"+a+"(x"+sg(b)+")$.",a:[A(poly([a,a*b]),polyT([a,a*b]),"expr","=")],m:1},
   {q:"Simplify $"+a+"(x"+sg(b)+")+"+c+"(x"+sg(d)+")$.",a:[A(poly([a+c,a*b+c*d]),polyT([a+c,a*b+c*d]),"expr","=")],m:2}],
   "(b) $"+polyT([a,a*b])+"+"+polyT([c,c*d])+"="+polyT([a+c,a*b+c*d])+"$")});
add([8,9],32,2,function(){var x=ri(2,12),k=ri(1,6),P=2*(x+(x+k))+2*x,s="";
  return EX("ca3",1,"A triangle has sides of length $x$ cm, $x$ cm and $(2x+"+2*k+")$ cm.\nThe perimeter of the triangle is "+(4*x+2*k)+" cm.",[
   {q:"Write an equation in $x$ and solve it to find the value of $x$.",a:[A(x,null,"num","x =")],m:3}],
   "$x+x+2x+"+2*k+"="+(4*x+2*k)+"\\Rightarrow4x="+4*x+"\\Rightarrow x="+x+"$")});
add([7,8,9],32,1,function(){var a=ri(2,9),d=ri(2,7),n=ri(10,30),N=a+(n-1)*d;
  return EX("ca4",1,"Here are the first four terms of a sequence: $"+[0,1,2,3].map(function(i){return a+i*d}).join(",\\ ")+",\\ \\dots$",[
   {q:"Write down the term-to-term rule.",a:[A(d,null,"num","add")],m:1},
   {q:"Find the "+n+"th term of the sequence.",a:[A(N,null,"num","=")],m:1},
   {q:"Find an expression for the $n$th term in the form $an+b$.",a:[A(d,null,"num","a ="),A(a-d,null,"num","b =")],m:2}],
   "(a) add $"+d+"$ (b) $"+a+"+"+(n-1)+"\\times"+d+"="+N+"$ (c) $"+d+"n"+co(a-d,"")+"$")});
add([9],32,2,function(){var m=nz(-4,5),c=ri(-6,8),x=ri(-3,5);
  return EX("ca5",1,"A straight line has equation $y="+co(m,"x",true)+co(c,"")+"$.",[
   {q:"Write down the gradient of the line.",a:[A(m,null,"num","gradient =")],m:1},
   {q:"Write down the coordinates of the point where the line crosses the $y$-axis.",a:[A(0,null,"num","x ="),A(c,null,"num","y =")],m:1},
   {q:"The point $("+x+",\\ k)$ lies on the line. Find the value of $k$.",a:[A(m*x+c,null,"num","k =")],m:1}],
   "(a) $"+m+"$ (b) $(0,"+c+")$ (c) $k="+m+"\\times"+sgp(x)+co(c,"")+"="+(m*x+c)+"$")});
add([9],32,2,function(){var a=ri(2,5),b=ri(-8,8),hi=ri(-2,6),c=a*hi+b;
  return EX("ca6",1,"",[{q:"Solve the inequality $"+a+"x"+co(b,"")+"\\le"+c+"$.",a:[A(hi,null,"num","x ≤")],m:2},
   {q:"Write down the largest integer that satisfies the inequality.",a:[A(hi,null,"num","=")],m:1}],"$"+a+"x\\le"+(c-b)+"\\Rightarrow x\\le"+hi+"$")});
add([7,8],32,1,function(){var m=ri(2,6),b=ri(1,12),x=ri(2,10),y=ri(2,10);
  return EX("ca7",1,"Here is a function machine: input $\\to\\times"+m+"\\to+"+b+"\\to$ output",[
   {q:"Find the output when the input is "+x+".",a:[A(m*x+b,null,"num","output =")],m:1},
   {q:"Find the input when the output is "+(m*y+b)+".",a:[A(y,null,"num","input =")],m:1}],"(a) $"+x+"\\times"+m+"+"+b+"="+(m*x+b)+"$ (b) inverse: $("+(m*y+b)+"-"+b+")\\div"+m+"="+y+"$")});
add([9],32,2,function(){var a=nz(-6,6),b=nz(-6,6),k=ri(2,6),m=nz(-7,7);
  return EX("ca8",1,"",[{q:"Expand and simplify $(x"+sg(a)+")(x"+sg(b)+")$.",a:[A(poly([1,a+b,a*b]),polyT([1,a+b,a*b]),"expr","=")],m:2},
   {q:"Factorise $"+k+"x^2"+co(k*m,"x")+"$.",a:[A(k+"*x*(x"+sg(m)+")",k+"x(x"+sg(m)+")","expr","=")],m:2}],"(a) $x^2"+co(b,"x")+co(a,"x")+sg(a*b)+"$ (b) common factor $"+k+"x$")});
add([8,9],32,3,function(){var w=ri(2,9),l=w+ri(2,8),A0=l*w,k=l-w;
  return EX("ca9",2,"The length of a rectangle is $"+k+"$ cm more than its width $x$ cm. The perimeter is "+2*(l+w)+" cm.",[
   {q:"Show that $4x+"+2*k+"="+2*(l+w)+"$ and find the width.",a:[A(w,null,"num","x =")],m:2},
   {q:"Work out the area of the rectangle.",a:[A(A0,null,"num","cm²")],m:2}],"(a) $2(x+x+"+k+")="+2*(l+w)+"\\Rightarrow x="+w+"$ (b) $"+l+"\\times"+w+"="+A0+"$")});

/* ======================= GEOMETRY AND MEASURES (33) ======================= */
add([7,8],33,1,function(){var a=ri(30,80),x=ri(10,40),k=pick([2,3]),c=180-a-k*x;if(c<=10){x=15;c=180-a-k*x}
  return EX("cg1",1,"The angles of a triangle are $"+a+"^\\circ$, $"+(k===1?"":k)+"x^\\circ$ and $"+c+"^\\circ$.",[{q:"Work out the value of $x$.",a:[A(x,null,"num","x =")],m:2}],
   "Angles in a triangle add up to $180^\\circ$: $"+k+"x=180-"+a+"-"+c+"="+k*x+"\\Rightarrow x="+x+"$")});
add([7],33,1,function(){var l=ri(4,15),w=ri(2,10),b=ri(2,10),h=ri(2,10);
  return EX("cg2",1,"",[{q:"A rectangle is "+l+" cm long and "+w+" cm wide. Work out its perimeter.",a:[A(2*(l+w),null,"num","cm")],m:1},
   {q:"A triangle has base "+b+" cm and perpendicular height "+h+" cm. Work out its area.",a:[A(nf(b*h/2),null,"num","cm²")],m:2}],"(a) $2("+l+"+"+w+")$ (b) $\\tfrac12\\times"+b+"\\times"+h+"="+nf(b*h/2)+"$")});
add([8,9],33,3,function(){var r=ri(3,20)/2*2;
  return EX("cg3",2,"A circular table has diameter "+2*r+" cm.",[{q:"Calculate the circumference of the table. "+DP1,a:[A(nf(2*Math.PI*r),null,"num","cm")],m:2},{q:"Calculate the area of the table top. "+DP1,a:[A(nf(Math.PI*r*r),null,"num","cm²")],m:2}],
   "(a) $\\pi d="+Math.round(2*Math.PI*r*10)/10+"$ (b) $\\pi r^2="+Math.round(Math.PI*r*r*10)/10+"$")});
add([7,8],33,2,function(){var a=ri(10,40),b=ri(10,30),c=ri(5,20);
  return EX("cg4",1,"A fish tank is a cuboid "+a+" cm long, "+b+" cm wide and "+c+" cm high.",[{q:"Work out the volume of the tank in cm³.",a:[A(a*b*c,null,"num","cm³")],m:1},{q:"Write the volume in litres. (1 litre = 1000 cm³)",a:[A(nf(a*b*c/1000),null,"num","litres")],m:1}],
   "(a) $"+a+"\\times"+b+"\\times"+c+"="+a*b*c+"$ (b) $\\div1000="+nf(a*b*c/1000)+"$")});
add([9],33,3,function(){var L=ri(5,12),d=ri(1,L-2),h=Math.sqrt(L*L-d*d);
  return EX("cg5",2,"A ladder "+L+" m long leans against a vertical wall. The foot of the ladder is "+d+" m from the wall.",[{q:"Calculate how far up the wall the ladder reaches. "+DP,a:[A(nf(h),null,"num","m")],m:3}],
   "Pythagoras: $\\sqrt{"+L+"^2-"+d+"^2}=\\sqrt{"+(L*L-d*d)+"}="+r2(h)+"$ m")});
add([8,9],33,2,function(){var n=pick([5,6,8,9,10,12]);
  return EX("cg6",1,"This is a regular polygon with "+n+" sides.",[{q:"Work out the size of one exterior angle.",a:[A(nf(360/n),null,"num","°")],m:1},{q:"Work out the size of one interior angle.",a:[A(nf(180-360/n),null,"num","°")],m:1}],
   "(a) $360\\div"+n+"="+nf(360/n)+"^\\circ$ (b) $180-"+nf(360/n)+"="+nf(180-360/n)+"^\\circ$")});
add([7,8],33,1,function(){var P=[nz(-5,5),nz(-5,5)],v=[nz(-4,4),nz(-4,4)];
  return EX("cg7",1,"Point $P$ has coordinates "+pt(P)+".",[{q:"$P$ is reflected in the $x$-axis. Write down the coordinates of the image.",a:[A(P[0],null,"num","x ="),A(-P[1],null,"num","y =")],m:1},
   {q:"$P$ is translated "+Math.abs(v[0])+" units "+(v[0]>0?"right":"left")+" and "+Math.abs(v[1])+" units "+(v[1]>0?"up":"down")+". Write down the coordinates of the image.",a:[A(P[0]+v[0],null,"num","x ="),A(P[1]+v[1],null,"num","y =")],m:1}],
   "(a) "+pt([P[0],-P[1]])+" (b) "+pt([P[0]+v[0],P[1]+v[1]]))});
add([9],33,2,function(){var b=ri(1,359),s=pick([25000,50000,100000]),c=ri(3,15),f=function(v){return("00"+v).slice(-3)};
  return EX("cg8",1,"",[{q:"The bearing of B from A is "+f(b)+"°. Work out the bearing of A from B.",a:[A((b+180)%360,null,"num","bearing =")],m:1},
   {q:"On a map with scale 1 : "+s+", the distance between A and B is "+c+" cm. Work out the real distance in kilometres.",a:[A(nf(c*s/100000),null,"num","km")],m:2}],
   "(a) $"+f(b)+(b<180?"+":"-")+"180="+f((b+180)%360)+"$ (b) $"+c+"\\times"+s+"$ cm $="+nf(c*s/100000)+"$ km")});
add([8,9],33,3,function(){var d=ri(60,300),t=pick([1.5,2,2.5,3,4]),s=d/t,m=ri(20,90);
  return EX("cg9",2,"",[{q:"A car travels "+d+" km in "+t+" hours. Work out its average speed.",a:[A(nf(s),null,"num","km/h")],m:1},
   {q:"A cyclist travels at 18 km/h for "+m+" minutes. How far does she travel?",a:[A(nf(18*m/60),null,"num","km")],m:2}],"(a) $"+d+"\\div"+t+"="+nf(s)+"$ (b) $18\\times\\frac{"+m+"}{60}="+nf(18*m/60)+"$")});

/* ===================== STATISTICS AND PROBABILITY (34) ===================== */
add([7,8],34,1,function(){var n=pick([6,7,8]),a=[];for(var i=0;i<n;i++)a.push(ri(1,20));var s=a.slice().sort(function(x,y){return x-y}),med=n%2?s[(n-1)/2]:(s[n/2-1]+s[n/2])/2,mean=fr(sum(a),n);
  return EX("cs1",1,"Here are the scores of "+n+" students in a quiz: $"+a.join(",\\ ")+"$",[{q:"Work out the range.",a:[A(s[n-1]-s[0],null,"num","=")],m:1},{q:"Work out the median.",a:[A(nf(med),null,"num","=")],m:1},{q:"Work out the mean.",a:[A(mean.s,mean.d===1?mean.t:nf(r2(sum(a)/n)),"num","=")],m:2}],
   "In order: $"+s.join(",")+"$; range $"+(s[n-1]-s[0])+"$; median $"+nf(med)+"$; mean $\\frac{"+sum(a)+"}{"+n+"}$")});
add([8,9],34,2,function(){var x=[0,1,2,3,4],f=x.map(function(){return ri(1,9)}),F=sum(f),S=0;x.forEach(function(v,i){S+=v*f[i]});var m=fr(S,F);
  return EX("cs2",1,"The table shows the number of pets owned by students in a class.\n"+tb([["\\text{Pets}"].concat(x),["\\text{Frequency}"].concat(f)]),[{q:"How many students are in the class?",a:[A(F,null,"num","=")],m:1},
   {q:"Work out the total number of pets.",a:[A(S,null,"num","=")],m:1},{q:"Work out the mean number of pets per student. Give your answer as a fraction or decimal.",a:[A(m.s,m.t,"num","=")],m:1}],
   "(a) $"+F+"$ (b) $\\sum fx="+S+"$ (c) $\\frac{"+S+"}{"+F+"}$")});
add([7,8],34,1,function(){var n=pick([8,10,12]),k=ri(1,n-1),p=fr(k,n),q=fr(n-k,n),c=pick(["red","blue","green"]);
  return EX("cs3",1,"A spinner has "+n+" equal sections. "+k+" of the sections are "+c+".",[{q:"Write down the probability that the spinner lands on "+c+".",a:[A(p.s,p.t,"num","P =")],m:1},{q:"Write down the probability that the spinner does not land on "+c+".",a:[A(q.s,q.t,"num","P =")],m:1}],
   "(a) $\\frac{"+k+"}{"+n+"}$ (b) $1-"+p.t+"="+q.t+"$")});
add([9],34,2,function(){var n=pick([50,80,100,200]),k=ri(5,n/2),N=pick([300,500,1000]);
  return EX("cs4",1,"Leo drops a drawing pin "+n+" times. It lands point up "+k+" times.",[{q:"Write down the relative frequency of the pin landing point up.",a:[A(fr(k,n).s,fr(k,n).t,"num","=")],m:1},
   {q:"Leo drops the pin "+N+" more times. Estimate how many times it lands point up.",a:[A(nf(N*k/n),null,"num","≈")],m:1}],"(a) $\\frac{"+k+"}{"+n+"}$ (b) $"+N+"\\times\\frac{"+k+"}{"+n+"}="+nf(N*k/n)+"$")});
add([8,9],34,2,function(){var a=ri(5,20),b=ri(5,20),c=ri(5,20),d=ri(5,20);
  return EX("cs5",1,"The two-way table shows how some students travel to school.\n"+tb([["","\\text{Walk}","\\text{Bus}","\\text{Total}"],["\\text{Boys}",a,"",a+b],["\\text{Girls}","",d,c+d],["\\text{Total}",a+c,"",""]]),[
   {q:"How many boys travel by bus?",a:[A(b,null,"num","=")],m:1},{q:"How many students are there altogether?",a:[A(a+b+c+d,null,"num","=")],m:1},{q:"A student is chosen at random. Find the probability that the student is a girl who walks.",a:[A(fr(c,a+b+c+d).s,fr(c,a+b+c+d).t,"num","P =")],m:1}],
   "(a) $"+(a+b)+"-"+a+"="+b+"$ (b) $"+(a+b)+"+"+(c+d)+"="+(a+b+c+d)+"$ (c) girls who walk $="+(c+d)+"-"+d+"="+c+"$")});
add([9],34,3,function(){var cl=[[0,10],[10,20],[20,30],[30,40]],f=cl.map(function(){return ri(2,14)}),F=sum(f),S=0;cl.forEach(function(c,i){S+=(c[0]+5)*f[i]});var mi=f.indexOf(Math.max.apply(null,f));if(f.filter(function(v){return v===f[mi]}).length>1){f[mi]++;F++;S+=cl[mi][0]+5}
  return EX("cs6",2,"The table shows the time, $t$ minutes, that "+F+" students spent on homework.\n"+tb([["t"].concat(cl.map(function(c){return c[0]+"\\lt t\\le"+c[1]})),["\\text{Frequency}"].concat(f)]),[
   {q:"Write down the modal class. Give the lower boundary of the class.",a:[A(cl[mi][0],null,"num","lower boundary =")],m:1},{q:"Calculate an estimate of the mean time. "+DP,a:[A(nf(S/F),null,"num","minutes")],m:3}],
   "(a) highest frequency: $"+cl[mi][0]+"\\lt t\\le"+cl[mi][1]+"$ (b) midpoints $5,15,25,35$: $\\frac{"+S+"}{"+F+"}="+r2(S/F)+"$")});

/* ===== បញ្ចូលក្នុង G7 · G8 · G9 ===== */
var XL=["📝 Checkpoint-style questions (Paper 1 · Paper 2)",[[31,"Checkpoint-style: Number"],[32,"Checkpoint-style: Algebra"],[33,"Checkpoint-style: Geometry and measures"],[34,"Checkpoint-style: Statistics and probability"]]];
function pickL(fs){return function(){return pick(fs)()}}
[107,108,109].forEach(function(g){var R=window.PRACT&&PRACT.GR[g];if(!R)return;var st=g-100;
  [31,32,33,34].forEach(function(s){var lv={};[1,2,3].forEach(function(v){
    var fs=T.filter(function(t){return t.str===s&&t.st.indexOf(st)>=0&&t.lv===v}).map(function(t){return t.f});
    if(!fs.length)fs=T.filter(function(t){return t.str===s&&t.st.indexOf(st)>=0&&(v===3?t.lv>=2:t.lv<=2)}).map(function(t){return t.f});
    if(!fs.length)fs=T.filter(function(t){return t.str===s&&t.lv===v}).map(function(t){return t.f});
    lv[v]=pickL(fs)});R.G[s]=lv});
  R.les.push(XL)});
/* ក្រដាសប្រឡង Checkpoint ពេញ (សម្រាប់ exam.js) */
var CP={p1:{label:"Paper 1 style · Non-calculator",calc:false,title:"Paper 1 (Non-calculator) · Practice",secs:[[31,1],[32,1],[33,1],[34,1],[31,1],[32,1],[31,2],[33,2],[32,2],[34,2],[31,2],[33,1],[32,2],[34,1]]},
        p2:{label:"Paper 2 style · Calculator",calc:true,title:"Paper 2 (Calculator) · Practice",secs:[[31,3],[32,1],[33,3],[34,2],[31,3],[32,3],[33,2],[34,3],[31,2],[33,3],[32,2],[34,1],[31,3]]}};
window.CAMPAPERS=window.CAMPAPERS||{};[107,108,109].forEach(function(g){window.CAMPAPERS[g]=CP});
})();
