/* ========================================================================
   🇬🇧 Mathematics Practice (English · Cambridge style) — Grades 6, 7, 8
   Grade 6 = Cambridge Primary Stage 6          → GR[106]
   Grade 7 = Cambridge Lower Secondary Stage 7  → GR[107]
   Grade 8 = Cambridge Lower Secondary Stage 8  → GR[108]
   Original questions in Cambridge style · load after practiceen.js (window.PXEN)
   ======================================================================== */
(function(){
"use strict";
var X=window.PX,E=window.PXEN,Q=X.Q,A=X.A,ri=X.ri,nz=X.nz,pick=X.pick,fr=X.fr,sg=X.sg,co=X.co,poly=X.poly,polyT=X.polyT,sgp=X.sgp,gcd=X.gcd;
var K=E.K,L=E.L,r2=E.r2,sum=E.sum,nf=E.nf,tbl=E.tbl,pt=E.pt,G9=E.G9,G10=E.G10;
function lcm(a,b){return a/gcd(a,b)*b}
function big(n){return String(n).replace(/\B(?=(\d{3})+(?!\d))/g,"\\,")}
function hm(m){return("0"+Math.floor(m/60)).slice(-2)+":"+("0"+m%60).slice(-2)}

/* ===================================================================
   GRADE 6 · Cambridge Primary Stage 6
   =================================================================== */
var G6={};
/* 1 Place value and rounding */
G6[1]={1:L(
 function(){var n=ri(1000,99999),t=pick([10,100,1000]),r=Math.round(n/t)*t;
   return K("rd","Round $"+big(n)+"$ to the nearest $"+big(t)+"$.",[A(r,null,"num","=")],"Look at the digit after the "+(t===10?"tens":t===100?"hundreds":"thousands")+" place: $"+big(n)+"\\approx"+big(r)+"$.")},
 function(){var n=ri(10000,999999),s=String(n),i=ri(0,s.length-1),d=+s[i],v=d*Math.pow(10,s.length-1-i);if(!d){i=0;d=+s[0];v=d*Math.pow(10,s.length-1)}
   return K("pv","What is the value of the digit $"+d+"$ in $"+big(n)+"$? (the digit in position "+(i+1)+" from the left)",[A(v,null,"num","value =")],"The digit $"+d+"$ is worth $"+big(v)+"$.")}),
 2:L(
 function(){var v=ri(100,9999)/100,w=Math.random()<.5,r=w?Math.round(v):Math.round(v*10)/10;
   return K("rdd","Round $"+v+"$ to "+(w?"the nearest whole number":"one decimal place")+".",[A(r,null,"num","=")],"$"+v+"\\approx"+r+"$")},
 function(){var v=ri(12,9999)/100,p=pick([10,100,1000]),m=Math.random()<.5,r=m?v*p:v/p;
   return K("x10",(m?"Multiply":"Divide")+" $"+v+"$ by $"+big(p)+"$.",[A(nf(r),null,"num","=")],"The digits move $"+(String(p).length-1)+"$ place"+(p>10?"s ":" ")+(m?"left":"right")+" relative to the decimal point: $"+nf(r)+"$.")}),
 3:L(
 function(){var a=[];for(var i=0;i<4;i++)a.push(ri(100,999)/100);var mx=Math.max.apply(null,a),mn=Math.min.apply(null,a);
   return K("ord","Here are four numbers: $"+a.join(",\\ ")+"$. Find the difference between the largest and the smallest.",[A(nf(mx-mn),null,"num","=")],"Largest $"+mx+"$, smallest $"+mn+"$, difference $"+nf(r2(mx-mn))+"$.")},
 function(){var v=ri(1000,99999)/1000,r=Math.round(v*100)/100;
   return K("rd2","Round $"+v+"$ to two decimal places.",[A(r,null,"num","=")],"$"+v+"\\approx"+r+"$")})};
/* 2 Factors, multiples and primes */
var PR=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113];
G6[2]={1:L(
 function(){var n=pick([12,18,20,24,28,30,36,40,42,45,48,50,60,72]),c=0;for(var i=1;i<=n;i++)if(n%i===0)c++;
   return K("nf","How many factors does $"+n+"$ have?",[A(c,null,"num","number =")],"Factor pairs of $"+n+"$ give $"+c+"$ factors.")},
 function(){var n=ri(20,100),p=PR.filter(function(x){return x>n})[0];
   return K("np","Write down the first prime number greater than $"+n+"$.",[A(p,null,"num","=")],"A prime has exactly two factors. The next prime after $"+n+"$ is $"+p+"$.")}),
 2:L(
 function(){var g=ri(2,12),a=g*ri(2,9),b=g*ri(2,9),h=gcd(a,b);if(a===b)b+=g;h=gcd(a,b);
   return K("hcf","Find the highest common factor (HCF) of $"+a+"$ and $"+b+"$.",[A(h,null,"num","HCF =")],"The largest number that divides both $"+a+"$ and $"+b+"$ is $"+h+"$.")},
 function(){var a=ri(3,15),b=ri(3,15);if(a===b)b++;
   return K("lcm","Find the lowest common multiple (LCM) of $"+a+"$ and $"+b+"$.",[A(lcm(a,b),null,"num","LCM =")],"The smallest number in both times tables is $"+lcm(a,b)+"$.")}),
 3:L(
 function(){var a=ri(2,12),b=ri(2,5);
   return K("sqc","Work out $"+a+"^2+"+b+"^3$.",[A(a*a+b*b*b,null,"num","=")],"$"+a*a+"+"+b*b*b+"="+(a*a+b*b*b)+"$")},
 function(){var p=ri(1,4),q=ri(0,2),r=ri(0,2),n=Math.pow(2,p)*Math.pow(3,q)*Math.pow(5,r);
   return K("ppf","Write $"+n+"$ as a product of prime factors in the form $2^a\\times3^b\\times5^c$. Find $a$, $b$ and $c$.",[A(p,null,"num","a ="),A(q,null,"num","b ="),A(r,null,"num","c =")],"$"+n+"=2^{"+p+"}\\times3^{"+q+"}\\times5^{"+r+"}$")})};
/* 3 Fractions */
G6[3]={1:L(
 function(){var d=pick([2,3,4,5,8,10]),n=ri(1,d-1),N=d*ri(2,12);
   return K("foa","Find $\\dfrac{"+n+"}{"+d+"}$ of $"+N+"$.",[A(N/d*n,null,"num","=")],"$"+N+"\\div"+d+"="+N/d+"$, then $\\times"+n+"="+N/d*n+"$.")},
 function(){var a=ri(1,5),b=a+ri(1,6),k=ri(2,6);
   return K("eqf","Find the missing number: $\\dfrac{"+a+"}{"+b+"}=\\dfrac{\\square}{"+b*k+"}$.",[A(a*k,null,"num","□ =")],"Multiply numerator and denominator by $"+k+"$: $\\dfrac{"+a*k+"}{"+b*k+"}$.")}),
 2:L(
 function(){var d=pick([4,6,8,10,12]),e=pick([2,3,4].filter(function(v){return d%v===0})),a=ri(1,d-1),c=ri(1,e-1),f=fr(a+c*d/e,d);
   return K("af","Work out $\\dfrac{"+a+"}{"+d+"}+\\dfrac{"+c+"}{"+e+"}$. Give your answer in its simplest form.",[A(f.s,f.t,"num","=")],"$\\dfrac{"+c+"}{"+e+"}=\\dfrac{"+c*d/e+"}{"+d+"}$, so the sum is $\\dfrac{"+(a+c*d/e)+"}{"+d+"}="+f.t+"$.")},
 function(){var w=ri(1,5),d=ri(2,9),n=ri(1,d-1);
   return K("imp","Write $"+w+"\\tfrac{"+n+"}{"+d+"}$ as an improper fraction.",[A((w*d+n)+"/"+d,"\\frac{"+(w*d+n)+"}{"+d+"}","num","=")],"$"+w+"\\times"+d+"+"+n+"="+(w*d+n)+"$, so $\\dfrac{"+(w*d+n)+"}{"+d+"}$.")}),
 3:L(
 function(){var d=pick([3,4,5,6,8]),n=ri(1,d-1),w=ri(2,9),f=fr(n*w,d);
   return K("fxw","Work out $\\dfrac{"+n+"}{"+d+"}\\times"+w+"$. Give your answer in its simplest form.",[A(f.s,f.t,"num","=")],"$\\dfrac{"+n+"\\times"+w+"}{"+d+"}="+f.t+"$")},
 function(){var b=ri(3,9),d=ri(3,9),a=ri(1,b-1),c=ri(1,d-1),f=fr(Math.abs(a*d-b*c),b*d);if(a*d===b*c){a=1;b=2;c=1;d=3;f=fr(1,6)}
   return K("fdf","Find the difference between $\\dfrac{"+a+"}{"+b+"}$ and $\\dfrac{"+c+"}{"+d+"}$.",[A(f.s,f.t,"num","=")],"Common denominator $"+b*d+"$: $\\left|\\dfrac{"+a*d+"}{"+b*d+"}-\\dfrac{"+b*c+"}{"+b*d+"}\\right|="+f.t+"$")})};
/* 4 Decimals and percentages */
G6[4]={1:L(
 function(){var p=ri(1,99);
   return K("pd","Write $"+p+"\\%$ as a decimal.",[A(nf(p/100),null,"num","=")],"Divide by $100$: $"+nf(p/100)+"$")},
 function(){var C=pick([[1,2],[1,4],[3,4],[1,5],[2,5],[3,5],[4,5],[1,10],[3,10],[7,10],[1,20],[9,20],[1,25],[3,25]]);
   return K("fp","Write $\\dfrac{"+C[0]+"}{"+C[1]+"}$ as a percentage.",[A(C[0]*100/C[1],null,"num","% =")],"$\\dfrac{"+C[0]+"}{"+C[1]+"}=\\dfrac{"+C[0]*100/C[1]+"}{100}="+C[0]*100/C[1]+"\\%$")}),
 2:L(
 function(){var p=pick([10,20,25,50,5,15,30,75]),N=ri(2,30)*20;
   return K("po","Find $"+p+"\\%$ of $"+N+"$.",[A(N*p/100,null,"num","=")],"$"+p+"\\%$ of $"+N+"=\\dfrac{"+p+"}{100}\\times"+N+"="+N*p/100+"$")},
 function(){var a=ri(100,999)/100,b=ri(10,99)/10,s=Math.random()<.5;if(!s&&b>a){var t=a;a=b;b=t}
   return K("ds","Work out $"+a+(s?"+":"-")+b+"$.",[A(nf(s?a+b:a-b),null,"num","=")],"Line up the decimal points: $"+nf(r2(s?a+b:a-b))+"$")}),
 3:L(
 function(){var a=ri(11,99)/10,b=ri(2,9);
   return K("dm","Work out $"+a+"\\times"+b+"$.",[A(nf(a*b),null,"num","=")],"$"+a*10+"\\times"+b+"="+a*10*b+"$, then divide by $10$: $"+nf(r2(a*b))+"$")},
 function(){var P=ri(2,40)*10,p=pick([10,20,25,50]);
   return K("disc","A T-shirt costs $"+P+"$ dollars. In a sale the price is reduced by $"+p+"\\%$. Find the sale price.",[A(P*(100-p)/100,null,"num","dollars")],"Reduction $="+P*p/100+"$, sale price $="+P+"-"+P*p/100+"="+P*(100-p)/100+"$ dollars")})};
/* 5 Calculation */
G6[5]={1:L(
 function(){var a=ri(2,20),b=ri(2,9),c=ri(2,9);
   return K("ooo","Work out $"+a+"+"+b+"\\times"+c+"$.",[A(a+b*c,null,"num","=")],"Multiply first: $"+b+"\\times"+c+"="+b*c+"$, then $"+a+"+"+b*c+"="+(a+b*c)+"$.")},
 function(){var a=ri(2,12),b=ri(2,12),c=ri(2,9),d=ri(1,20);
   return K("br","Work out $("+a+"+"+b+")\\times"+c+"-"+d+"$.",[A((a+b)*c-d,null,"num","=")],"Brackets first: $"+(a+b)+"\\times"+c+"="+(a+b)*c+"$, then $-"+d+"$ gives $"+((a+b)*c-d)+"$.")}),
 2:L(
 function(){var a=ri(12,99),b=ri(12,99);
   return K("lm","Work out $"+a+"\\times"+b+"$.",[A(a*b,null,"num","=")],"$"+a+"\\times"+b+"="+a+"\\times"+Math.floor(b/10)*10+"+"+a+"\\times"+b%10+"="+a*b+"$")},
 function(){var d=ri(3,9),q=ri(21,199);
   return K("ld","Work out $"+d*q+"\\div"+d+"$.",[A(q,null,"num","=")],"$"+d*q+"\\div"+d+"="+q+"$")}),
 3:L(
 function(){var n=ri(100,600),b=pick([6,8,12,15,24]),k=Math.ceil(n/b);
   return K("box","Eggs are packed in boxes of $"+b+"$. How many boxes are needed for $"+n+"$ eggs?",[A(k,null,"num","boxes =")],"$"+n+"\\div"+b+"="+nf(r2(n/b))+"$, so $"+k+"$ boxes are needed (round up).")},
 function(){var a=ri(2,9),x=ri(2,20),b=ri(1,30);
   return K("inv","Find the missing number: $\\square\\times"+a+"+"+b+"="+(a*x+b)+"$.",[A(x,null,"num","□ =")],"Work backwards: $("+(a*x+b)+"-"+b+")\\div"+a+"="+x+"$")})};
/* 6 Negative numbers */
G6[6]={1:L(
 function(){var t=ri(-10,10),c=ri(2,15),up=Math.random()<.5;
   return K("tmp","The temperature is $"+t+"^\\circ$C. It "+(up?"rises":"falls")+" by $"+c+"^\\circ$C. What is the new temperature?",[A(up?t+c:t-c,null,"num","°C")],"$"+t+(up?"+":"-")+c+"="+(up?t+c:t-c)+"^\\circ$C")},
 function(){var a=ri(-15,-1),b=ri(1,20);
   return K("dif","The temperature at night was $"+a+"^\\circ$C and during the day it was $"+b+"^\\circ$C. Find the difference.",[A(b-a,null,"num","°C")],"$"+b+"-("+a+")="+(b-a)+"^\\circ$C")}),
 2:L(
 function(){var a=ri(-10,10),b=ri(1,12),o=pick(["+","-"]),s=pick([1,-1]),v=o==="+"?a+s*b:a-s*b;
   return K("ng","Work out $"+a+o+(s<0?"(-"+b+")":b)+"$.",[A(v,null,"num","=")],(o==="-"&&s<0?"Subtracting a negative is the same as adding: ":"")+"$="+v+"$")},
 function(){var a=[];for(var i=0;i<4;i++)a.push(ri(-12,12));
   return K("ns","Find the sum of $"+a.join(",\\ ")+"$.",[A(sum(a),null,"num","sum =")],"$"+a.map(function(x){return sgp(x)}).join("+")+"="+sum(a)+"$")}),
 3:L(
 function(){var a=nz(-9,9),b=nz(-9,9),d=Math.random()<.5;if(d){var p=a*b;return K("nd","Work out $"+p+"\\div"+sgp(a)+"$.",[A(b,null,"num","=")],"Signs: "+(p<0===a<0?"same → positive":"different → negative")+"; $"+p+"\\div"+sgp(a)+"="+b+"$")}
   return K("nm","Work out $"+sgp(a)+"\\times"+sgp(b)+"$.",[A(a*b,null,"num","=")],"Signs: "+(a<0===b<0?"same → positive":"different → negative")+"; $="+a*b+"$")},
 function(){var s=ri(-50,50),w=ri(20,90),d=ri(10,80);
   return K("bank","Ali's bank balance is $"+s+"$ dollars. He takes out $"+w+"$ dollars and then pays in $"+d+"$ dollars. What is his new balance?",[A(s-w+d,null,"num","dollars")],"$"+s+"-"+w+"+"+d+"="+(s-w+d)+"$")})};
/* 7 Ratio and proportion */
G6[7]={1:L(
 function(){var p=pick([2,4,5]),q=pick([6,8,10,12,15,20].filter(function(v){return v!==p})),g=ri(2,12)*p*5;
   return K("rec","A recipe for $"+p+"$ people uses $"+g+"$ g of flour. How much flour is needed for $"+q+"$ people?",[A(g/p*q,null,"num","g")],"For $1$ person: $"+g+"\\div"+p+"="+g/p+"$ g; for $"+q+"$ people: $"+g/p*q+"$ g.")},
 function(){var a=ri(1,9),b=ri(1,9),k=ri(2,8),g;if(a===b)b++;g=gcd(a,b);a/=g;b/=g;
   return K("simp","Write the ratio $"+a*k+":"+b*k+"$ in its simplest form $p:q$.",[A(a,null,"num","p ="),A(b,null,"num","q =")],"Divide both parts by $"+k+"$: $"+a+":"+b+"$")}),
 2:L(G10[2][1],
 function(){var a=ri(1,5),b=ri(2,7),k=ri(2,9);if(a===b)b++;
   return K("fe","In a bag, for every $"+a+"$ red counters there are $"+b+"$ blue counters. There are $"+a*k+"$ red counters. How many blue counters are there?",[A(b*k,null,"num","blue =")],"$"+a*k+"\\div"+a+"="+k+"$, so blue $="+b+"\\times"+k+"="+b*k+"$")}),
 3:L(
 function(){var n1=pick([4,5,6,8]),n2=pick([10,12,15,20]),p1=n1*ri(30,90),p2=n2*ri(30,90);
   var u1=p1/n1,u2=p2/n2;if(u1===u2)p2+=n2;u2=p2/n2;
   return K("bv","Pack A has $"+n1+"$ pens for $"+p1+"$ cents. Pack B has $"+n2+"$ pens for $"+p2+"$ cents. Find the lower price per pen.",[A(Math.min(u1,u2),null,"num","cents")],"A: $"+p1+"\\div"+n1+"="+u1+"$, B: $"+p2+"\\div"+n2+"="+u2+"$. Pack "+(u1<u2?"A":"B")+" is better value.")},
 function(){var a=ri(2,5),b=a+ri(1,4),k=ri(3,12);
   return K("rdf","Boys and girls in a club are in the ratio $"+a+":"+b+"$. There are $"+(b-a)*k+"$ more girls than boys. How many children are in the club?",[A((a+b)*k,null,"num","total =")],"The difference is $"+(b-a)+"$ parts $="+(b-a)*k+"$, so $1$ part $="+k+"$ and total $="+(a+b)+"\\times"+k+"="+(a+b)*k+"$.")})};
/* 8 Formulae and sequences */
G6[8]={1:L(
 function(){var a=ri(1,20),d=nz(-5,9),t=[0,1,2,3].map(function(i){return a+i*d});
   return K("nx","Find the next term: $"+t.join(",\\ ")+",\\ \\dots$",[A(a+4*d,null,"num","next =")],"The rule is '"+(d>0?"add "+d:"subtract "+(-d))+"', so the next term is $"+(a+4*d)+"$.")},
 function(){var m=ri(2,9),b=ri(1,15),x=ri(2,12);
   return K("fm","A function machine multiplies by $"+m+"$ and then adds $"+b+"$. What is the output when the input is $"+x+"$?",[A(m*x+b,null,"num","output =")],"$"+x+"\\times"+m+"+"+b+"="+(m*x+b)+"$")}),
 2:L(
 function(){var m=ri(2,9),b=ri(1,15),x=ri(2,12);
   return K("fmr","A function machine multiplies by $"+m+"$ and then adds $"+b+"$. The output is $"+(m*x+b)+"$. What was the input?",[A(x,null,"num","input =")],"Inverse operations: $("+(m*x+b)+"-"+b+")\\div"+m+"="+x+"$")},
 function(){var p=ri(2,9),c=ri(1,20),n=ri(3,15);
   return K("fw","The cost, $C$ dollars, of hiring a bike for $n$ hours is $C="+p+"n+"+c+"$. Find the cost of hiring a bike for $"+n+"$ hours.",[A(p*n+c,null,"num","C =")],"$C="+p+"\\times"+n+"+"+c+"="+(p*n+c)+"$")}),
 3:L(
 function(){var m=ri(2,9),n=pick([10,20,25,50,100]);
   return K("ptt","The position-to-term rule of a sequence is 'multiply the position by $"+m+"$'. Find the $"+n+"$th term.",[A(m*n,null,"num","term =")],"$"+n+"\\times"+m+"="+m*n+"$")},
 G9[6][1])};
/* 9 Angles */
G6[9]={1:L(
 function(){var a=ri(20,160);
   return K("sl","Two angles lie on a straight line. One angle is $"+a+"^\\circ$. Find the other angle.",[A(180-a,null,"num","°")],"Angles on a straight line add up to $180^\\circ$: $180-"+a+"="+(180-a)+"^\\circ$")},
 function(){var a=ri(40,150),b=ri(40,150);
   return K("ap","Three angles meet at a point. Two of them are $"+a+"^\\circ$ and $"+b+"^\\circ$. Find the third angle.",[A(360-a-b,null,"num","°")],"Angles around a point add up to $360^\\circ$: $360-"+a+"-"+b+"="+(360-a-b)+"^\\circ$")}),
 2:L(G9[8][1],
 function(){var a=ri(10,80);
   return K("ra","A right angle is split into two angles. One of them is $"+a+"^\\circ$. Find the other.",[A(90-a,null,"num","°")],"$90-"+a+"="+(90-a)+"^\\circ$")}),
 3:L(
 function(){var t=ri(20,140),apex=Math.random()<.5;if(!apex&&t>=90)t=ri(20,85);
   return K("iso","An isosceles triangle has "+(apex?"an angle of $"+t+"^\\circ$ between its two equal sides":"two equal angles of $"+t+"^\\circ$")+". Find the size of "+(apex?"each of the other two angles":"the third angle")+".",[A(apex?(180-t)/2:180-2*t,null,"num","°")],apex?"$(180-"+t+")\\div2="+(180-t)/2+"^\\circ$":"$180-2\\times"+t+"="+(180-2*t)+"^\\circ$")},
 function(){var a=ri(60,120),b=ri(60,120),c=ri(50,110);
   return K("qd","Three angles of a quadrilateral are $"+a+"^\\circ$, $"+b+"^\\circ$ and $"+c+"^\\circ$. Find the fourth angle.",[A(360-a-b-c,null,"num","°")],"Angles in a quadrilateral add up to $360^\\circ$: $360-"+a+"-"+b+"-"+c+"="+(360-a-b-c)+"^\\circ$")})};
/* 10 Area and perimeter */
G6[10]={1:L(
 function(){var l=ri(3,20),w=ri(2,15);
   return K("rap","A rectangle is $"+l+"$ cm long and $"+w+"$ cm wide. Find (a) its area (b) its perimeter.",[A(l*w,null,"num","(a) cm²"),A(2*(l+w),null,"num","(b) cm")],"Area $="+l+"\\times"+w+"="+l*w+"$ cm², perimeter $=2("+l+"+"+w+")="+2*(l+w)+"$ cm")},
 function(){var s=ri(2,15);
   return K("sqa","A square has an area of $"+s*s+"$ cm². Find the length of one side.",[A(s,null,"num","cm")],"$\\sqrt{"+s*s+"}="+s+"$ cm")}),
 2:L(
 function(){var b=ri(2,20),h=ri(2,16),S=fr(b*h,2);
   return K("ta","A triangle has base $"+b+"$ cm and perpendicular height $"+h+"$ cm. Find its area.",[A(S.s,nf(b*h/2),"num","cm²")],"$\\tfrac12\\times"+b+"\\times"+h+"="+nf(b*h/2)+"$ cm²")},
 function(){var b=ri(3,20),h=ri(2,15);
   return K("pg","A parallelogram has base $"+b+"$ cm and perpendicular height $"+h+"$ cm. Find its area.",[A(b*h,null,"num","cm²")],"$\\text{base}\\times\\text{height}="+b*h+"$ cm²")}),
 3:L(
 function(){var W=ri(6,15),H=ri(6,15),w=ri(2,W-2),h=ri(2,H-2),S=W*H-w*h;
   return K("cmp","An L-shape is made by cutting a $"+w+"$ cm by $"+h+"$ cm rectangle from the corner of a $"+W+"$ cm by $"+H+"$ cm rectangle. Find the area of the L-shape.",[A(S,null,"num","cm²")],"$"+W+"\\times"+H+"-"+w+"\\times"+h+"="+W*H+"-"+w*h+"="+S+"$ cm²")},
 function(){var l=ri(5,25),w=ri(2,l-1),P=2*(l+w);
   return K("rpl","A rectangle has perimeter $"+P+"$ cm and width $"+w+"$ cm. Find its length.",[A(l,null,"num","cm")],"$"+P+"\\div2="+(l+w)+"$, length $="+(l+w)+"-"+w+"="+l+"$ cm")})};
/* 11 Volume, measures and time */
G6[11]={1:L(
 function(){var a=ri(2,12),b=ri(2,10),c=ri(2,10);
   return K("vc","Find the volume of a cuboid measuring $"+a+"$ cm by $"+b+"$ cm by $"+c+"$ cm.",[A(a*b*c,null,"num","cm³")],"$"+a+"\\times"+b+"\\times"+c+"="+a*b*c+"$ cm³")},
 function(){var C=pick([["cm","m",100],["m","km",1000],["g","kg",1000],["ml","litres",1000],["mm","cm",10]]),v=ri(1,90)*C[2]/pick([1,2,4,5]),big2=Math.random()<.5;
   return big2?K("cv","Convert $"+nf(v/C[2])+"$ "+C[1]+" to "+C[0]+".",[A(v,null,"num",C[0])],"$1$ "+C[1]+" $="+C[2]+"$ "+C[0]+", so $"+nf(v/C[2])+"\\times"+C[2]+"="+v+"$ "+C[0])
     :K("cv","Convert $"+v+"$ "+C[0]+" to "+C[1]+".",[A(nf(v/C[2]),null,"num",C[1])],"$"+v+"\\div"+C[2]+"="+nf(v/C[2])+"$ "+C[1])}),
 2:L(
 function(){var s=ri(6*60,15*60),d=ri(25,250),e=s+d;
   return K("ti","A film starts at "+hm(s)+" and finishes at "+hm(e)+". How long is the film in minutes?",[A(d,null,"num","minutes")],"From "+hm(s)+" to "+hm(e)+" is $"+Math.floor(d/60)+"$ h $"+d%60+"$ min $="+d+"$ minutes")},
 function(){var a=ri(2,10);
   return K("cub","A cube has edges of length $"+a+"$ cm. Find its volume.",[A(a*a*a,null,"num","cm³")],"$"+a+"^3="+a*a*a+"$ cm³")}),
 3:L(
 function(){var c=pick([1,2,5]),a=c*ri(2,6),b=c*ri(2,6),h=c*ri(2,6);
   return K("fit","How many cubes with edge $"+c+"$ cm fit exactly into a box measuring $"+a+"$ cm by $"+b+"$ cm by $"+h+"$ cm?",[A(a*b*h/(c*c*c),null,"num","cubes")],"$("+a+"\\div"+c+")\\times("+b+"\\div"+c+")\\times("+h+"\\div"+c+")="+a*b*h/(c*c*c)+"$")},
 function(){var s=ri(20,90),t=pick([2,3,4,5]);
   return K("sp","A car travels at $"+s+"$ km per hour for $"+t+"$ hours. How far does it travel?",[A(s*t,null,"num","km")],"$"+s+"\\times"+t+"="+s*t+"$ km")})};
/* 12 Statistics */
G6[12]={1:L(
 function(){var m=ri(1,20),a=[m,m,m],c={};c[m]=3;while(a.length<7){var v=ri(1,25);if(!c[v]){c[v]=1;a.push(v)}}a.sort(function(){return Math.random()-.5});
   return K("mo","Find the mode of $"+a.join(",\\ ")+"$.",[A(m,null,"num","mode =")],"$"+m+"$ appears most often.")},
 G9[12][1]),2:L(G9[12][2],G9[12][1]),3:L(G9[12][3],G9[12][2])};
/* 13 Probability */
G6[13]={1:L(G9[13][1],G9[13][2]),2:L(G9[13][1],
 function(){var n=pick([6,8,10]),k=ri(1,n-1),p=fr(k,n);
   return K("sp6","A fair spinner has $"+n+"$ equal sections numbered $1$ to $"+n+"$. Find the probability of getting a number greater than $"+(n-k)+"$.",[A(p.s,p.t,"num","P =")],"$"+k+"$ of the $"+n+"$ numbers are greater than $"+(n-k)+"$: $P="+p.t+"$")}),
 3:L(G9[13][2],G9[13][3])};
var LES6=[
 ["Number",[[1,"Place value and rounding"],[2,"Factors, multiples and primes"],[3,"Fractions"],[4,"Decimals and percentages"],[5,"Calculation"],[6,"Negative numbers"]]],
 ["Ratio and algebra",[[7,"Ratio and proportion"],[8,"Formulae and sequences"]]],
 ["Geometry and measure",[[9,"Angles"],[10,"Area and perimeter"],[11,"Volume, measures and time"]]],
 ["Statistics and probability",[[12,"Statistics"],[13,"Probability"]]]];

/* ===================================================================
   GRADE 7 · Cambridge Lower Secondary Stage 7
   =================================================================== */
var simp=function(){var a=nz(-6,6),b=nz(-6,6),c=nz(-9,9),d=nz(-9,9);
  return K("lt","Simplify $"+co(a,"x",true)+co(c,"")+co(b,"x")+co(d,"")+"$.",[A(poly([a+b,c+d]),polyT([a+b,c+d]),"expr","=")],"Collect like terms: $("+a+sg(b)+")x+("+c+sg(d)+")="+polyT([a+b,c+d])+"$")};
var subs=function(){var a=nz(-5,5),b=nz(-5,5),p=ri(2,5),q=ri(2,5);
  return K("se","Find the value of $"+p+"a-"+q+"b$ when $a="+a+"$ and $b="+b+"$.",[A(p*a-q*b,null,"num","=")],"$"+p+"\\times"+sgp(a)+"-"+q+"\\times"+sgp(b)+"="+(p*a-q*b)+"$")};
var one=function(){var t=ri(0,3),x=ri(-9,15),a=ri(2,9),b=ri(1,20);
  var e=t===0?"x+"+b+"="+(x+b):t===1?"x-"+b+"="+(x-b):t===2?a+"x="+a*x:"\\dfrac{x}{"+a+"}="+x,v=t===3?a*x:x;
  return K("os","Solve $"+e+"$.",[A(v,null,"num","x =")],t===0?"Subtract $"+b+"$ from both sides.":t===1?"Add $"+b+"$ to both sides.":t===2?"Divide both sides by $"+a+"$.":"Multiply both sides by $"+a+"$.")};
var G7={};
G7[1]={1:L(G6[6][2],
 function(){var a=ri(2,12),b=ri(1,5);return K("sq","Work out $"+a+"^2-"+b+"^3$.",[A(a*a-b*b*b,null,"num","=")],"$"+a*a+"-"+b*b*b+"="+(a*a-b*b*b)+"$")}),
 2:L(G6[6][3],
 function(){var a=ri(2,15),b=ri(1,6);return K("rt","Work out $\\sqrt{"+a*a+"}+\\sqrt[3]{"+b*b*b+"}$.",[A(a+b,null,"num","=")],"$"+a+"+"+b+"="+(a+b)+"$")}),
 3:L(
 function(){var a=nz(-6,6),b=ri(2,5),c=nz(-9,9);return K("oop","Work out $"+sgp(a)+"^2-"+b+"\\times"+sgp(c)+"$.",[A(a*a-b*c,null,"num","=")],"Powers first: $"+a*a+"$, then $"+b+"\\times"+sgp(c)+"="+b*c+"$, so $"+a*a+"-"+sgp(b*c)+"="+(a*a-b*c)+"$")},
 G6[6][3])};
G7[2]={1:L(G6[1][2],G6[1][1]),2:L(G6[1][3],G6[1][2]),3:L(G9[2][1],G6[1][3])};
G7[3]={1:L(G6[3][2],G6[3][1]),2:L(G9[2][1],G6[3][3]),3:L(G9[2][2],G9[2][1])};
G7[4]={1:L(G6[4][1],G6[4][2]),2:L(G9[3][1],G6[4][3]),3:L(G9[3][2])};
G7[5]={1:L(simp),2:L(subs,simp),3:L(G9[4][1],subs)};
G7[6]={1:L(one),2:L(G9[5][1],one),3:L(G9[5][1],G9[5][2])};
G7[7]={1:L(G6[8][1],G6[8][2]),2:L(G9[6][1],G6[8][3]),3:L(G9[6][1])};
G7[8]={1:L(G6[7][1]),2:L(G6[7][2]),3:L(G6[7][3],G10[2][1])};
G7[9]={1:L(G6[9][1],G6[9][2]),2:L(G6[9][3]),3:L(G9[8][3],G6[9][3])};
G7[10]={1:L(G6[10][1]),2:L(G6[10][2]),3:L(G6[10][3],G9[10][1])};
G7[11]={1:L(G9[11][1]),2:L(G9[11][1],G9[11][2]),3:L(G9[11][2])};
G7[12]={1:L(G9[12][1],G6[12][1]),2:L(G9[12][1]),3:L(G9[12][2])};
G7[13]={1:L(G9[13][1]),2:L(G9[13][1],G9[13][2]),3:L(G9[13][2])};
var LES7=[
 ["Number",[[1,"Integers, powers and roots"],[2,"Place value, decimals and rounding"],[3,"Fractions"],[4,"Percentages"]]],
 ["Algebra",[[5,"Expressions"],[6,"Equations"],[7,"Sequences and functions"]]],
 ["Ratio and geometry",[[8,"Ratio and proportion"],[9,"Angles and triangles"],[10,"Area and perimeter"],[11,"Coordinates and transformations"]]],
 ["Statistics and probability",[[12,"Statistics"],[13,"Probability"]]]];

/* ===================================================================
   GRADE 8 · Cambridge Lower Secondary Stage 8
   =================================================================== */
var G8={};
G8[1]={1:L(G9[1][1],function(){var b=ri(2,5),n=ri(2,5);return K("pw","Find the value of $"+b+"^{"+n+"}$.",[A(Math.pow(b,n),null,"num","=")],"$"+Array(n+1).join(b+"\\times").slice(0,-6)+"="+Math.pow(b,n)+"$")}),
 2:L(G9[1][1],G9[1][3]),3:L(G9[1][3],G9[1][2])};
G8[2]={1:L(G9[2][1]),2:L(G9[2][1],G9[2][2]),3:L(G9[2][2],G9[2][3])};
G8[3]={1:L(G9[3][1]),2:L(G9[3][1],G9[3][2]),3:L(G9[3][2])};
G8[4]={1:L(simp,G9[4][1]),2:L(G9[4][1],G9[4][2]),3:L(G9[4][2])};
G8[5]={1:L(G9[5][1]),2:L(G9[5][1],G9[5][2]),3:L(G9[5][2])};
G8[6]={1:L(G9[6][1]),2:L(G9[6][1],G9[6][2]),3:L(G9[6][2])};
G8[7]={1:L(G9[7][1]),2:L(G9[7][1],G9[7][2]),3:L(G9[7][2])};
G8[8]={1:L(G6[7][2],G10[2][1]),2:L(G10[2][1],G6[7][3]),3:L(G10[2][2],G6[7][3])};
G8[9]={1:L(G9[8][1]),2:L(G9[8][1],G9[8][2]),3:L(G9[8][2],G9[8][3])};
G8[10]={1:L(function(){var r=ri(2,15);return K("cc","A circle has radius $"+r+"$ cm. Find its circumference in terms of $\\pi$.",[A(2*r+"*pi",2*r+"\\pi","num","cm")],"$C=2\\pi r="+2*r+"\\pi$ cm")}),
 2:L(G9[10][1]),3:L(G9[10][3])};
G8[11]={1:L(G6[10][2],G6[11][1]),2:L(G9[10][1],G9[10][2]),3:L(G9[10][2])};
G8[12]={1:L(G9[11][1]),2:L(G9[11][2]),3:L(G9[11][2],G9[11][3])};
G8[13]={1:L(G9[12][1]),2:L(G9[12][1],G9[12][2]),3:L(G9[12][2])};
G8[14]={1:L(G9[13][1]),2:L(G9[13][1],G9[13][2]),3:L(G9[13][2],G9[13][3])};
var LES8=[
 ["Number",[[1,"Indices and powers"],[2,"Fractions and decimals"],[3,"Percentages"]]],
 ["Algebra",[[4,"Expressions"],[5,"Equations and inequalities"],[6,"Sequences"],[7,"Graphs"]]],
 ["Geometry and measure",[[8,"Ratio and proportion"],[9,"Angles and polygons"],[10,"Circles"],[11,"Area and volume"],[12,"Transformations"]]],
 ["Statistics and probability",[[13,"Statistics"],[14,"Probability"]]]];

X.reg(106,{en:true,tab:"🇬🇧 G6 · Stage 6",title:"Grade 6 · Cambridge Primary Stage 6",les:LES6,G:G6});
X.reg(107,{en:true,tab:"🇬🇧 G7 · Stage 7",title:"Grade 7 · Cambridge Lower Secondary Stage 7",les:LES7,G:G7});
X.reg(108,{en:true,tab:"🇬🇧 G8 · Stage 8",title:"Grade 8 · Cambridge Lower Secondary Stage 8",les:LES8,G:G8});
})();
