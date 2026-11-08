/* ========================================================================
   🇬🇧 Mathematics Practice (English · Cambridge style) — generated questions
   Grade 9  = Cambridge Lower Secondary Stage 9  → GR[109]
   Grade 10 = Cambridge IGCSE Mathematics (0580) → GR[110]
   Original questions written in Cambridge style (not copied from past papers)
   Load after practice.js (window.PX)
   ======================================================================== */
(function(){
"use strict";
var X=window.PX,Q=X.Q,A=X.A,ri=X.ri,nz=X.nz,pick=X.pick,fr=X.fr,sg=X.sg,co=X.co,poly=X.poly,polyT=X.polyT,sgp=X.sgp,gcd=X.gcd,cnk=X.cnk;
function K(kd,q,a,s,f){var o=Q(q,a,s,f);o.kd=kd;o.a.forEach(function(x){if(x.t===x.v&&/\.\d{3,}/.test(x.v))x.t=String(Math.round(+x.v*100)/100)});return o}   /* ចម្លើយ 2 d.p. បង្ហាញជា 2 ខ្ទង់ */
function L(){var a=[].slice.call(arguments);return function(){return pick(a)()}}
function r2(v){return Math.round(v*100)/100}
function rn(v,n){var p=Math.pow(10,n);return Math.round(v*p)/p}
function sum(a){return a.reduce(function(x,y){return x+y},0)}
function sqT(n){var k=1,m=n;for(var f=2;f*f<=m;f++)while(m%(f*f)===0){m/=f*f;k*=f}return m===1?String(k):(k===1?"":k)+"\\sqrt{"+m+"}"}
function piT(f){return f.d===1?(f.n===1?"":f.n)+"\\pi":"\\dfrac{"+(f.n===1?"":f.n)+"\\pi}{"+f.d+"}"}
function sfr(n,d){var f=fr(n,d);return f}
function stdT(m,k){return m+"\\times10^{"+k+"}"}
function tbl(L0,R){return"\\begin{array}{|c|"+R[0].map(function(){return"c|"}).join("")+"}\\hline "+L0.map(function(l,i){return l+"&"+R[i].join("&")}).join("\\\\\\hline ")+"\\\\\\hline\\end{array}"}
function pt(p){return"("+p[0]+", "+p[1]+")"}
function cv(v){return"\\begin{pmatrix}"+v[0]+"\\\\"+v[1]+"\\end{pmatrix}"}
var D=Math.PI/180,TR=[[3,4,5],[5,12,13],[6,8,10],[8,15,17],[7,24,25],[9,12,15]];
function sig(v,n){if(!v)return 0;var k=Math.floor(Math.log10(Math.abs(v)))+1-n,p=Math.pow(10,k);return Math.round(v/p)*p}
function nf(v){return String(+v.toPrecision(12))}
function std(v){var k=Math.floor(Math.log10(Math.abs(v))),m=+(v/Math.pow(10,k)).toPrecision(6);if(Math.abs(m)>=10){m/=10;k++}return[m,k]}
var DP="Give your answer correct to 2 decimal places.";

/* ===================================================================
   GRADE 9 · Cambridge Lower Secondary Stage 9
   =================================================================== */
var G9={};
/* 1 Indices and standard form */
G9[1]={1:L(
 function(){var m=ri(2,9),n=ri(2,9),t=ri(0,2),v=t===0?m+n:t===1?m-n:m*n;
   var e=t===0?"x^{"+m+"}\\times x^{"+n+"}":t===1?"x^{"+m+"}\\div x^{"+n+"}":"(x^{"+m+"})^{"+n+"}";
   return K("ix","Simplify $"+e+"$. Write your answer in the form $x^k$ and state the value of $k$.",[A(v,null,"num","k =")],
     t===0?"Add the indices: $x^a\\times x^b=x^{a+b}$, so $k="+m+"+"+n+"="+v+"$.":t===1?"Subtract the indices: $x^a\\div x^b=x^{a-b}$, so $k="+m+"-"+n+"="+v+"$.":"Multiply the indices: $(x^a)^b=x^{ab}$, so $k="+m+"\\times"+n+"="+v+"$.")},
 function(){var m=ri(11,99)/10,k=ri(3,7),N=Math.round(m*Math.pow(10,k));
   return K("sf","Write $"+N.toLocaleString("en").replace(/,/g,"\\,")+"$ in standard form.",[A(m+"*10^"+k,stdT(m,k),"num","=")],"Move the decimal point $"+k+"$ places: $"+stdT(m,k)+"$ (with $1\\le "+m+"<10$).")}),
 2:L(
 function(){var m=ri(11,99)/10,k=ri(2,5),N=nf(m/Math.pow(10,k));
   return K("sfs","Write $"+N+"$ in standard form.",[A(m+"*10^(-"+k+")",stdT(m,"-"+k),"num","=")],"The decimal point moves $"+k+"$ places to the right, so the power of $10$ is negative: $"+stdT(m,"-"+k)+"$.")},
 function(){var a=ri(2,9),b=ri(2,9),p=ri(2,6),q=ri(2,6),s=std(a*b*Math.pow(10,p+q));
   return K("sfm","Work out $("+a+"\\times10^{"+p+"})\\times("+b+"\\times10^{"+q+"})$. Give your answer in standard form.",[A(a*b+"*10^"+(p+q),stdT(s[0],s[1]),"num","=")],
     "Multiply the numbers and add the powers: $"+a+"\\times"+b+"="+a*b+"$ and $10^{"+p+"}\\times10^{"+q+"}=10^{"+(p+q)+"}$, so the answer is $"+a*b+"\\times10^{"+(p+q)+"}="+stdT(s[0],s[1])+"$.")}),
 3:L(
 function(){var b=pick([2,3,4,5,10]),n=ri(1,3),neg=Math.random()<.7,v=neg?fr(1,Math.pow(b,n)):fr(1,1);
   return K("ni","Find the value of $"+b+"^{"+(neg?"-"+n:0)+"}$.",[A(v.s,v.t,"num","=")],neg?"$a^{-n}=\\dfrac{1}{a^n}$, so $"+b+"^{-"+n+"}=\\dfrac{1}{"+Math.pow(b,n)+"}$.":"Any non-zero number to the power $0$ equals $1$.")},
 function(){var a=ri(2,9)*2,b=pick([2,4]),p=ri(5,9),q=ri(1,3),s=std(a/b*Math.pow(10,p-q));
   return K("sfd","Work out $("+a+"\\times10^{"+p+"})\\div("+b+"\\times10^{"+q+"})$. Give your answer in standard form.",[A(a/b+"*10^"+(p-q),stdT(s[0],s[1]),"num","=")],
     "Divide the numbers and subtract the powers: $"+a+"\\div"+b+"="+a/b+"$, $10^{"+p+"}\\div10^{"+q+"}=10^{"+(p-q)+"}$, so the answer is $"+stdT(s[0],s[1])+"$.")})};
/* 2 Fractions, decimals and rounding */
G9[2]={1:L(
 function(){var v=ri(10000,99999)/ri(10,1000),n=pick([2,3]),r=sig(v,n);
   return K("sig","Round $"+nf(rn(v,4))+"$ to "+n+" significant figures.",[A(nf(sig(rn(v,4),n)),null,"num","=")],"Count "+n+" significant figures from the first non-zero digit, then look at the next digit to decide whether to round up.")},
 function(){var b=ri(2,9),d=ri(2,9),a=ri(1,b-1),c=ri(1,d-1),f=fr(a*d+b*c,b*d);
   return K("fa","Work out $\\dfrac{"+a+"}{"+b+"}+\\dfrac{"+c+"}{"+d+"}$. Give your answer as a fraction in its simplest form.",[A(f.s,f.t,"num","=")],"Use a common denominator: $\\dfrac{"+a*d+"}{"+b*d+"}+\\dfrac{"+b*c+"}{"+b*d+"}=\\dfrac{"+(a*d+b*c)+"}{"+b*d+"}="+f.t+"$.")}),
 2:L(
 function(){var w1=ri(1,3),n1=ri(1,3),d1=n1+ri(1,3),w2=ri(1,3),n2=ri(1,3),d2=n2+ri(1,3),p=w1*d1+n1,q=w2*d2+n2,f=fr(p*q,d1*d2);
   return K("fm","Work out $"+w1+"\\tfrac{"+n1+"}{"+d1+"}\\times"+w2+"\\tfrac{"+n2+"}{"+d2+"}$. Give your answer as an improper fraction in its simplest form.",[A(f.s,f.t,"num","=")],
     "Change to improper fractions: $\\dfrac{"+p+"}{"+d1+"}\\times\\dfrac{"+q+"}{"+d2+"}=\\dfrac{"+p*q+"}{"+d1*d2+"}="+f.t+"$.")},
 function(){var two=Math.random()<.5,a=two?ri(10,98):ri(1,8),f=two?fr(a,99):fr(a,9),dec=two?"0.\\dot{"+String(a).padStart(2,"0")[0]+"}\\dot{"+String(a).padStart(2,"0")[1]+"}":"0.\\dot{"+a+"}";
   return K("rec","Write the recurring decimal $"+dec+"$ as a fraction in its simplest form.",[A(f.s,f.t,"num","=")],two?"Let $x="+dec+"$. Then $100x-x="+a+"$, so $99x="+a+"$ and $x=\\dfrac{"+a+"}{99}="+f.t+"$.":"Let $x="+dec+"$. Then $10x-x="+a+"$, so $9x="+a+"$ and $x="+f.t+"$.")}),
 3:L(
 function(){var a=ri(1,9),b;do{b=ri(0,9)}while(b===a);var f=fr(9*a+b,90);
   return K("rec2","Write $0."+a+"\\dot{"+b+"}$ as a fraction in its simplest form.",[A(f.s,f.t,"num","=")],"Let $x=0."+a+"\\dot{"+b+"}$. Then $100x-10x="+(10*a+b)+"-"+a+"="+(9*a+b)+"$, so $x=\\dfrac{"+(9*a+b)+"}{90}="+f.t+"$.")},
 function(){var b=ri(2,6),d=ri(2,6),a=ri(1,b),c=ri(1,d),e=ri(1,4),g=ri(2,5),n=a*d-b*c,f=fr(n*g,b*d*e);
   return K("fo","Work out $\\left(\\dfrac{"+a+"}{"+b+"}-\\dfrac{"+c+"}{"+d+"}\\right)\\div\\dfrac{"+e+"}{"+g+"}$.",[A(f.s,f.t,"num","=")],"Brackets first: $\\dfrac{"+n+"}{"+b*d+"}$. Dividing by a fraction is the same as multiplying by its reciprocal: $\\dfrac{"+n+"}{"+b*d+"}\\times\\dfrac{"+g+"}{"+e+"}="+f.t+"$.")})};
/* 3 Percentages */
G9[3]={1:L(
 function(){var p=pick([5,10,12,15,20,25,30,35,40,45,60,75]),N=ri(2,40)*20,v=N*p/100;
   return K("pof","Find $"+p+"\\%$ of $"+N+"$.",[A(nf(v),null,"num","=")],"$\\dfrac{"+p+"}{100}\\times"+N+"="+nf(v)+"$")},
 function(){var p=pick([5,10,15,20,25,30,40]),N=ri(4,40)*10,up=Math.random()<.5,m=up?1+p/100:1-p/100,v=N*m;
   return K("pid",(up?"Increase":"Decrease")+" $"+N+"$ by $"+p+"\\%$.",[A(nf(v),null,"num","=")],"Multiplier $="+(up?"1+":"1-")+nf(p/100)+"="+nf(m)+"$, so $"+N+"\\times"+nf(m)+"="+nf(v)+"$.")}),
 2:L(
 function(){var a=ri(4,40)*5,p=pick([10,20,25,40,50,60,-10,-20,-25,-40]),b=a*(100+p)/100;
   return K("pch","The price of a bag changes from USD "+a+" to USD "+nf(b)+". Find the percentage "+(p>0?"increase":"decrease")+".",[A(Math.abs(p),null,"num","% =")],"$\\dfrac{\\text{change}}{\\text{original}}\\times100=\\dfrac{"+Math.abs(b-a)+"}{"+a+"}\\times100="+Math.abs(p)+"\\%$")},
 function(){var P=ri(2,20)*100,r=pick([2,3,4,5,10]),n=pick([2,3]),v=P*Math.pow(1+r/100,n);
   return K("ci","USD "+P+" is invested at "+r+"% per year compound interest. Find the value of the investment after "+n+" years. "+DP,[A(nf(v),null,"num","USD")],"$"+P+"\\times"+nf(1+r/100)+"^{"+n+"}="+nf(r2(v))+"$ (2 d.p.)")}),
 3:L(
 function(){var p=pick([10,15,20,25,40]),O=ri(4,60)*20,N=O*(100+p)/100;
   return K("rp","After a $"+p+"\\%$ increase, the price of a phone is USD "+nf(N)+". Find the original price.",[A(O,null,"num","USD")],"New price $=1."+(p<10?"0"+p:p)+"\\times$ original, so original $=\\dfrac{"+nf(N)+"}{"+nf(1+p/100)+"}="+O+"$.")},
 function(){var P=ri(5,30)*1000,r=pick([10,15,20]),n=pick([2,3]),v=P*Math.pow(1-r/100,n);
   return K("dep","A car costs USD "+P+". It loses "+r+"% of its value each year. Find its value after "+n+" years. "+DP,[A(nf(v),null,"num","USD")],"Multiplier $="+nf(1-r/100)+"$, so $"+P+"\\times"+nf(1-r/100)+"^{"+n+"}="+nf(r2(v))+"$.")})};
/* 4 Expressions and formulae */
G9[4]={1:L(
 function(){var u=ri(0,20),a=ri(2,10),t=ri(2,9);
   return K("sub","Use the formula $v=u+at$ to find $v$ when $u="+u+"$, $a="+a+"$ and $t="+t+"$.",[A(u+a*t,null,"num","v =")],"$v="+u+"+"+a+"\\times"+t+"="+(u+a*t)+"$")},
 function(){var a=nz(-5,5),b=ri(1,6),c=nz(-6,6),d=nz(-4,4),e=ri(1,5),f=nz(-6,6),p=a*b+d*e,q=a*c+d*f;
   return K("exs","Expand and simplify $"+a+"("+b+"x"+sg(c)+")"+(d<0?"":"+")+d+"("+e+"x"+sg(f)+")$.",[A(poly([p,q]),polyT([p,q]),"expr","=")],"$"+co(a*b,"x",true)+sg(a*c)+co(d*e,"x")+sg(d*f)+"="+polyT([p,q])+"$")}),
 2:L(
 function(){var a=nz(-7,7),b=nz(-7,7);
   return K("exd","Expand and simplify $(x"+sg(a)+")(x"+sg(b)+")$.",[A(poly([1,a+b,a*b]),polyT([1,a+b,a*b]),"expr","=")],"$x^2"+co(b,"x")+co(a,"x")+sg(a*b)+"="+polyT([1,a+b,a*b])+"$")},
 function(){var k=ri(2,9),a=ri(1,6),b=nz(-9,9),g=gcd(gcd(k*a,Math.abs(k*b)),k);
   return K("fac","Factorise completely $"+k*a+"x"+sg(k*b)+"$.",[A(k+"*("+a+"*x"+sg(b)+")",k+"("+co(a,"x",true)+sg(b)+")","expr","=")],"The highest common factor is $"+k+"$: $"+k*a+"x"+sg(k*b)+"="+k+"("+co(a,"x",true)+sg(b)+")$.")}),
 3:L(
 function(){var u=ri(1,20),a=ri(2,6),t=ri(2,9),v=u+a*t;
   return K("subj","Make $t$ the subject of $v=u+at$. Hence find $t$ when $v="+v+"$, $u="+u+"$ and $a="+a+"$.",[A(t,null,"num","t =")],"$at=v-u\\Rightarrow t=\\dfrac{v-u}{a}=\\dfrac{"+v+"-"+u+"}{"+a+"}="+t+"$")},
 function(){var a=nz(-7,7),b;do{b=nz(-7,7)}while(a+b===0);
   return K("fq","Factorise $"+polyT([1,a+b,a*b])+"$.",[A("(x"+sg(a)+")*(x"+sg(b)+")","(x"+sg(a)+")(x"+sg(b)+")","expr","=")],"Find two numbers with product $"+a*b+"$ and sum $"+(a+b)+"$: $"+a+"$ and $"+b+"$.")})};
/* 5 Equations and inequalities */
G9[5]={1:L(
 function(){var a=nz(2,9),x=ri(-9,12),b=ri(-15,15),c=a*x+b;
   return K("e1","Solve $"+a+"x"+co(b,"")+"="+c+"$.",[A(x,null,"num","x =")],"$"+a+"x="+(c-b)+"\\Rightarrow x="+x+"$")},
 function(){var a,c,x=ri(-8,10),b=ri(-12,12),d;do{a=ri(2,9);c=ri(1,8)}while(a===c);d=a*x+b-c*x;
   return K("e2","Solve $"+a+"x"+co(b,"")+"="+co(c,"x",true)+co(d,"")+"$.",[A(x,null,"num","x =")],"$"+(a-c)+"x="+(d-b)+"\\Rightarrow x="+x+"$")}),
 2:L(
 function(){var a,c,x,b,d;do{a=ri(2,6);c=ri(2,6);x=ri(-6,8);b=ri(-5,5);d=(a*(x+b))/c-x}while(a===c||d%1||!b||!d||Math.abs(d)>9);
   return K("eb","Solve $"+a+"(x"+sg(b)+")="+c+"(x"+sg(d)+")$.",[A(x,null,"num","x =")],"$"+a+"x"+sg(a*b)+"="+c+"x"+sg(c*d)+"\\Rightarrow "+(a-c)+"x="+(c*d-a*b)+"\\Rightarrow x="+x+"$")},
 function(){var a=ri(2,7),b=ri(-10,10),bd=ri(-5,15),c=a*bd+b,lt=Math.random()<.5;
   return K("in","Solve the inequality $"+a+"x"+co(b,"")+(lt?"\\lt ":"\\ge ")+c+"$. Your answer is $x"+(lt?"\\lt ":"\\ge ")+"k$. Find $k$.",[A(bd,null,"num","k =")],"$"+a+"x"+(lt?"\\lt ":"\\ge ")+(c-b)+"\\Rightarrow x"+(lt?"\\lt ":"\\ge ")+bd+"$")}),
 3:L(
 function(){var a=pick([2,3,4,5]),b=pick([3,4,6,10]),x;if(a===b)b=a+1;var l=a*b/gcd(a,b);x=l*ri(1,4);var c=fr(x*(a+b),a*b);
   return K("ef","Solve $\\dfrac{x}{"+a+"}+\\dfrac{x}{"+b+"}="+c.t+"$.",[A(x,null,"num","x =")],"Multiply both sides by $"+a*b+"$: $"+b+"x+"+a+"x="+nf(c.n/c.d*a*b)+"\\Rightarrow "+(a+b)+"x="+nf(c.n/c.d*a*b)+"\\Rightarrow x="+x+"$")},
 function(){var a=ri(2,5),lo=ri(-4,2),hi=lo+ri(2,6),c=ri(-6,6);
   return K("din","Find the smallest and the largest integers $n$ such that $"+(a*lo+c)+"\\lt "+a+"n"+co(c,"")+"\\le"+(a*hi+c)+"$.",[A(lo+1,null,"num","smallest ="),A(hi,null,"num","largest =")],"Subtract $"+c+"$ and divide by $"+a+"$: $"+lo+"\\lt n\\le"+hi+"$, so $n="+(lo+1)+",\\dots,"+hi+"$.")})};
/* 6 Sequences */
G9[6]={1:L(
 function(){var a=ri(-5,10),d=nz(-4,6),n=pick([10,12,15,20]);
   return K("ap","The sequence $"+[0,1,2,3].map(function(i){return a+i*d}).join(", ")+", \\dots$ continues in the same way. Find the "+n+"th term.",[A(a+(n-1)*d,null,"num","term =")],"Common difference $d="+d+"$. The "+n+"th term $="+a+"+"+(n-1)+"\\times"+sgp(d)+"="+(a+(n-1)*d)+"$.")},
 function(){var d=nz(-5,7),b=ri(-6,8);
   return K("nt","Find the $n$th term of the sequence $"+[1,2,3,4].map(function(n){return d*n+b}).join(", ")+", \\dots$ in the form $an+b$.",[A(d,null,"num","a ="),A(b,null,"num","b =")],"Difference $="+d+"$, so the $n$th term is $"+d+"n+b$. With $n=1$: $"+d+"+b="+(d+b)+"\\Rightarrow b="+b+"$.")}),
 2:L(
 function(){var d=ri(2,7),b=ri(-5,8),n=ri(12,60),v=d*n+b;
   return K("pos","The $n$th term of a sequence is $"+d+"n"+co(b,"")+"$. Which term is equal to $"+v+"$?",[A(n,null,"num","n =")],"$"+d+"n"+co(b,"")+"="+v+"\\Rightarrow n="+n+"$")},
 function(){var a=ri(1,5),r=pick([2,3,-2]),n=ri(5,7);
   return K("gp","The sequence $"+[0,1,2,3].map(function(i){return a*Math.pow(r,i)}).join(", ")+", \\dots$ is geometric. Find the "+n+"th term.",[A(a*Math.pow(r,n-1),null,"num","term =")],"Multiply by $"+r+"$ each time: the "+n+"th term $="+a+"\\times"+sgp(r)+"^{"+(n-1)+"}="+a*Math.pow(r,n-1)+"$.")}),
 3:L(
 function(){var a=pick([1,2,-1]),b=ri(-4,4),c=ri(-5,5),t=[1,2,3,4,5].map(function(n){return a*n*n+b*n+c});
   return K("qn","Find the $n$th term of the quadratic sequence $"+t.join(", ")+", \\dots$ in the form $an^2+bn+c$.",[A(a,null,"num","a ="),A(b,null,"num","b ="),A(c,null,"num","c =")],
     "Second difference $="+2*a+"$, so $a="+a+"$. Subtract $"+a+"n^2$ to leave a linear sequence $"+[1,2,3].map(function(n){return b*n+c}).join(", ")+"$, giving $b="+b+"$, $c="+c+"$.")},
 function(){var m=pick([2,3]),k=nz(-4,4),u=ri(1,5),t=[u];for(var i=0;i<3;i++)t.push(t[i]*m+k);
   return K("tt","The first term of a sequence is $"+u+"$. The term-to-term rule is 'multiply by $"+m+"$ then "+(k>0?"add $"+k:"subtract $"+(-k))+"$'. Find the 4th term.",[A(t[3],null,"num","4th term =")],"$"+t.join("\\to")+"$")})};
/* 7 Straight-line graphs */
G9[7]={1:L(
 function(){var P=[ri(-5,5),ri(-5,5)],dx=nz(-5,5),dy=ri(-8,8),B=[P[0]+dx,P[1]+dy],m=fr(dy,dx);
   return K("gr","Find the gradient of the line through $A"+pt(P)+"$ and $B"+pt(B)+"$.",[A(m.s,m.t,"num","gradient =")],"$m=\\dfrac{y_2-y_1}{x_2-x_1}=\\dfrac{"+dy+"}{"+dx+"}="+m.t+"$")},
 function(){var a=nz(-6,6),b=pick([1,2,3,-1,-2]),c=nz(-12,12),m=fr(-a,b),k=fr(c,b);
   return K("gi","The line $L$ has equation $"+co(a,"x",true)+co(b,"y")+"="+c+"$. Find the gradient and the $y$-intercept of $L$.",[A(m.s,m.t,"num","gradient ="),A(k.s,k.t,"num","y-intercept =")],"Rearrange to $y=mx+c$: $y="+m.t+"x"+(k.n<0?"":"+")+k.t+"$.")}),
 2:L(
 function(){var m=nz(-3,4),c=ri(-6,6),x1=ri(-4,1),x2=x1+ri(1,4);
   return K("lt","Find the equation of the line through $"+pt([x1,m*x1+c])+"$ and $"+pt([x2,m*x2+c])+"$ in the form $y=mx+c$.",[A(m,null,"num","m ="),A(c,null,"num","c =")],"$m=\\dfrac{"+m*(x2-x1)+"}{"+(x2-x1)+"}="+m+"$, then $c="+(m*x1+c)+"-"+sgp(m)+"\\times"+sgp(x1)+"="+c+"$.")},
 function(){var P=[ri(-6,6),ri(-6,6)],B=[ri(-6,6),ri(-6,6)],x=fr(P[0]+B[0],2),y=fr(P[1]+B[1],2);
   return K("mp","Find the midpoint of $AB$ where $A"+pt(P)+"$ and $B"+pt(B)+"$.",[A(x.s,x.t,"num","x ="),A(y.s,y.t,"num","y =")],"Midpoint $=\\left(\\dfrac{x_1+x_2}{2},\\dfrac{y_1+y_2}{2}\\right)=\\left("+x.t+", "+y.t+"\\right)$")}),
 3:L(
 function(){var m=nz(-4,4),c0=ri(-5,5),P=[ri(-4,4),ri(-4,4)],c=P[1]-m*P[0];
   return K("par","Find the equation of the line parallel to $y="+polyT([m,c0])+"$ that passes through $"+pt(P)+"$.",[A(m,null,"num","m ="),A(c,null,"num","c =")],"Parallel lines have equal gradients, so $m="+m+"$. Then $c="+P[1]+"-"+sgp(m)+"\\times"+sgp(P[0])+"="+c+"$.")},
 function(){var x=ri(-5,6),y=ri(-5,6),a=ri(1,5),b=nz(-4,4),c=ri(1,5),d;do{d=nz(-4,4)}while(a*d===b*c);
   return K("sim","Solve the simultaneous equations $"+co(a,"x",true)+co(b,"y")+"="+(a*x+b*y)+"$ and $"+co(c,"x",true)+co(d,"y")+"="+(c*x+d*y)+"$.",[A(x,null,"num","x ="),A(y,null,"num","y =")],"Eliminate one variable (multiply and subtract), then substitute back: $x="+x+"$, $y="+y+"$.")})};
/* 8 Angles and polygons */
G9[8]={1:L(
 function(){var a=ri(25,80),b=ri(20,70);
   return K("tri","Two angles of a triangle are $"+a+"^\\circ$ and $"+b+"^\\circ$. Find the third angle.",[A(180-a-b,null,"num","angle =")],"Angles in a triangle add up to $180^\\circ$: $180-"+a+"-"+b+"="+(180-a-b)+"^\\circ$.")},
 function(){var n=ri(5,12);
   return K("isum","Find the sum of the interior angles of a polygon with $"+n+"$ sides.",[A((n-2)*180,null,"num","sum =")],"$(n-2)\\times180^\\circ="+(n-2)+"\\times180^\\circ="+(n-2)*180+"^\\circ$")}),
 2:L(
 function(){var n=pick([5,6,8,9,10,12,15,18,20,24,30,36]);
   return K("ext","Each exterior angle of a regular polygon is $"+360/n+"^\\circ$. How many sides does the polygon have?",[A(n,null,"num","n =")],"Exterior angles add up to $360^\\circ$: $n=\\dfrac{360}{"+360/n+"}="+n+"$.")},
 function(){var n=pick([5,6,8,9,10,12,15,18,20]);
   return K("int","Find the size of one interior angle of a regular polygon with $"+n+"$ sides.",[A(180-360/n,null,"num","angle =")],"Exterior angle $=\\dfrac{360}{"+n+"}="+360/n+"^\\circ$, interior angle $=180-"+360/n+"="+(180-360/n)+"^\\circ$.")}),
 3:L(
 function(){var x=ri(10,40),a=pick([2,3]),b=ri(-10,20),alt=Math.random()<.5,ang=a*x+b,oth=alt?ang:180-ang;
   if(oth<=0||ang<=0||ang>=180){x=25;a=2;b=10;ang=60;oth=alt?60:120}
   return K("pl","Two parallel lines are crossed by a transversal. Two "+(alt?"alternate":"co-interior")+" angles are $("+a+"x"+sg(b)+")^\\circ$ and $"+oth+"^\\circ$. Find $x$.",[A(x,null,"num","x =")],
     alt?"Alternate angles are equal: $"+a+"x"+sg(b)+"="+oth+"\\Rightarrow x="+x+"$.":"Co-interior angles add up to $180^\\circ$: $"+a+"x"+sg(b)+"+"+oth+"=180\\Rightarrow x="+x+"$.")},
 function(){var k=[1,2,3,4],n=pick([4,5]),c=k.slice(0,n-1);var tot=(n-2)*180,x;do{c=[];for(var i=0;i<n;i++)c.push(ri(1,4));x=tot/sum(c)}while(x%1);
   return K("pal","The angles of a "+(n===4?"quadrilateral":"pentagon")+" are $"+c.map(function(v){return(v===1?"":v)+"x"}).join(", ")+"$ (in degrees). Find $x$.",[A(x,null,"num","x =")],"Interior angle sum $="+tot+"^\\circ$, so $"+sum(c)+"x="+tot+"\\Rightarrow x="+x+"$.")})};
/* 9 Pythagoras' theorem */
G9[9]={1:L(
 function(){var T=pick(TR),k=ri(1,3);
   return K("hyp","A right-angled triangle has shorter sides $"+T[0]*k+"$ cm and $"+T[1]*k+"$ cm. Find the length of the hypotenuse.",[A(T[2]*k,null,"num","cm")],"$c^2="+T[0]*k+"^2+"+T[1]*k+"^2="+T[2]*T[2]*k*k+"\\Rightarrow c="+T[2]*k+"$ cm")},
 function(){var T=pick(TR),k=ri(1,3);
   return K("sh","The hypotenuse of a right-angled triangle is $"+T[2]*k+"$ cm and one side is $"+T[1]*k+"$ cm. Find the length of the third side.",[A(T[0]*k,null,"num","cm")],"$a^2="+T[2]*k+"^2-"+T[1]*k+"^2="+T[0]*T[0]*k*k+"\\Rightarrow a="+T[0]*k+"$ cm")}),
 2:L(
 function(){var a=ri(2,12),b=ri(2,12),c=Math.sqrt(a*a+b*b);if(c%1===0)b++;c=Math.sqrt(a*a+b*b);
   return K("h2","A right-angled triangle has shorter sides $"+a+"$ cm and $"+b+"$ cm. Calculate the length of the hypotenuse. "+DP,[A(nf(c),null,"num","cm")],"$c=\\sqrt{"+a*a+"+"+b*b+"}=\\sqrt{"+(a*a+b*b)+"}="+r2(c)+"$ cm")},
 function(){var L0=ri(5,12),d=ri(1,L0-2),h=Math.sqrt(L0*L0-d*d);
   return K("lad","A ladder of length $"+L0+"$ m leans against a vertical wall. The foot of the ladder is $"+d+"$ m from the wall. How high up the wall does the ladder reach? "+DP,[A(nf(h),null,"num","m")],"$h=\\sqrt{"+L0+"^2-"+d+"^2}=\\sqrt{"+(L0*L0-d*d)+"}="+r2(h)+"$ m")}),
 3:L(
 function(){var P=[ri(-6,5),ri(-6,5)],B=[ri(-6,5),ri(-6,5)];if(P[0]===B[0]&&P[1]===B[1])B[0]++;var d2=(B[0]-P[0])*(B[0]-P[0])+(B[1]-P[1])*(B[1]-P[1]);
   return K("dist","Find the exact length of the line segment joining $"+pt(P)+"$ and $"+pt(B)+"$.",[A("sqrt("+d2+")",sqT(d2),"num","length =")],"$d=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}=\\sqrt{"+d2+"}="+sqT(d2)+"$")},
 function(){var a=ri(2,10),b=ri(2,10),c=ri(2,10),d=Math.sqrt(a*a+b*b+c*c);
   return K("cub","A cuboid measures $"+a+"$ cm by $"+b+"$ cm by $"+c+"$ cm. Calculate the length of its longest diagonal. "+DP,[A(nf(d),null,"num","cm")],"$d=\\sqrt{"+a+"^2+"+b+"^2+"+c+"^2}=\\sqrt{"+(a*a+b*b+c*c)+"}="+r2(d)+"$ cm")})};
/* 10 Circles, area and volume */
G9[10]={1:L(
 function(){var r=ri(2,15),dia=Math.random()<.4;
   return K("cir","A circle has "+(dia?"diameter $"+2*r:"radius $"+r)+"$ cm. Find, in terms of $\\pi$, (a) the circumference (b) the area.",[A(2*r+"*pi",2*r+"\\pi","num","(a)"),A(r*r+"*pi",r*r+"\\pi","num","(b)")],"$C=2\\pi r="+2*r+"\\pi$ cm, $A=\\pi r^2="+r*r+"\\pi$ cm²")},
 function(){var a=ri(3,12),b=a+ri(1,8),h=ri(2,10),S=fr((a+b)*h,2);
   return K("trap","A trapezium has parallel sides $"+a+"$ cm and $"+b+"$ cm and height $"+h+"$ cm. Find its area.",[A(S.s,S.t,"num","cm²")],"$A=\\dfrac{(a+b)h}{2}=\\dfrac{("+a+"+"+b+")\\times"+h+"}{2}="+S.t+"$ cm²")}),
 2:L(
 function(){var r=ri(2,9),h=ri(3,15);
   return K("cyl","A cylinder has radius $"+r+"$ cm and height $"+h+"$ cm. Find its volume in terms of $\\pi$.",[A(r*r*h+"*pi",r*r*h+"\\pi","num","cm³")],"$V=\\pi r^2h=\\pi\\times"+r*r+"\\times"+h+"="+r*r*h+"\\pi$ cm³")},
 function(){var r=ri(2,9),h=ri(3,15);
   return K("csa","A closed cylinder has radius $"+r+"$ cm and height $"+h+"$ cm. Find its total surface area in terms of $\\pi$.",[A((2*r*r+2*r*h)+"*pi",(2*r*r+2*r*h)+"\\pi","num","cm²")],"$2\\pi r^2+2\\pi rh="+2*r*r+"\\pi+"+2*r*h+"\\pi="+(2*r*r+2*r*h)+"\\pi$ cm²")}),
 3:L(
 function(){var r=ri(3,12),t=pick([30,40,45,60,72,90,120,135,150]),Ar=fr(r*r*t,360),Le=fr(2*r*t,360);
   return K("sec","A sector of a circle has radius $"+r+"$ cm and angle $"+t+"^\\circ$. Find, in terms of $\\pi$, (a) the arc length (b) the area of the sector.",[A(Le.s+"*pi",piT(Le),"num","(a)"),A(Ar.s+"*pi",piT(Ar),"num","(b)")],"Arc $=\\dfrac{"+t+"}{360}\\times2\\pi\\times"+r+"="+piT(Le)+"$ cm, area $=\\dfrac{"+t+"}{360}\\times\\pi\\times"+r+"^2="+piT(Ar)+"$ cm²")},
 function(){var r=ri(2,15);
   return K("rad","The area of a circle is $"+r*r+"\\pi$ cm². Find its radius.",[A(r,null,"num","r =")],"$\\pi r^2="+r*r+"\\pi\\Rightarrow r^2="+r*r+"\\Rightarrow r="+r+"$ cm")})};
/* 11 Transformations and bearings */
G9[11]={1:L(
 function(){var P=[nz(-6,6),nz(-6,6)],t=pick(["the $x$-axis","the $y$-axis","the line $y=x$"]),R=t==="the $x$-axis"?[P[0],-P[1]]:t==="the $y$-axis"?[-P[0],P[1]]:[P[1],P[0]];
   return K("ref","The point $P"+pt(P)+"$ is reflected in "+t+". Find the coordinates of the image.",[A(R[0],null,"num","x ="),A(R[1],null,"num","y =")],"Image $"+pt(R)+"$")},
 function(){var P=[ri(-6,6),ri(-6,6)],v=[nz(-5,5),nz(-5,5)];
   return K("tr","The point $A"+pt(P)+"$ is translated by the vector $"+cv(v)+"$. Find the coordinates of the image.",[A(P[0]+v[0],null,"num","x ="),A(P[1]+v[1],null,"num","y =")],"$("+P[0]+sg(v[0])+", "+P[1]+sg(v[1])+")="+pt([P[0]+v[0],P[1]+v[1]])+"$")}),
 2:L(
 function(){var P=[nz(-6,6),nz(-6,6)],t=pick([90,180,-90]),R=t===180?[-P[0],-P[1]]:t===90?[-P[1],P[0]]:[P[1],-P[0]];
   return K("rot","The point $"+pt(P)+"$ is rotated "+(t===180?"$180^\\circ$":"$90^\\circ$ "+(t===90?"anticlockwise":"clockwise"))+" about the origin. Find the coordinates of the image.",[A(R[0],null,"num","x ="),A(R[1],null,"num","y =")],
     (t===180?"$(x,y)\\to(-x,-y)$":t===90?"$(x,y)\\to(-y,x)$":"$(x,y)\\to(y,-x)$")+": image $"+pt(R)+"$")},
 function(){var k=pick([2,3,4,0.5]),A0=ri(3,20);
   return K("enl","A shape with area $"+A0+"$ cm² is enlarged by scale factor $"+k+"$. Find the area of the image.",[A(nf(A0*k*k),null,"num","cm²")],"Area scale factor $=k^2="+nf(k*k)+"$, so area $="+A0+"\\times"+nf(k*k)+"="+nf(A0*k*k)+"$ cm²")}),
 3:L(
 function(){var b=ri(1,359),r=(b+180)%360,f=function(v){return("00"+v).slice(-3)};
   return K("bear","The bearing of $B$ from $A$ is $"+f(b)+"^\\circ$. Find the bearing of $A$ from $B$.",[A(r,f(r),"num","bearing =")],"Back bearing $="+f(b)+(b<180?"+":"-")+"180="+f(r)+"^\\circ$")},
 function(){var n=pick([25000,50000,100000,200000]),c=ri(2,20)+pick([0,0.5]),km=c*n/100000;
   return K("scl","A map has scale $1:"+n+"$. Two towns are $"+c+"$ cm apart on the map. Find the real distance in km.",[A(nf(km),null,"num","km")],"$"+c+"\\times"+n+"="+nf(c*n)+"$ cm $="+nf(km)+"$ km")})};
/* 12 Averages and spread */
G9[12]={1:L(
 function(){var a=[];for(var i=0;i<ri(5,8);i++)a.push(ri(1,20));var m=fr(sum(a),a.length);
   return K("mean","Find the mean of $"+a.join(", ")+"$.",[A(m.s,m.t,"num","mean =")],"$\\dfrac{"+sum(a)+"}{"+a.length+"}="+m.t+"$")},
 function(){var a=[];var n=pick([7,9]);for(var i=0;i<n;i++)a.push(ri(1,30));var s=a.slice().sort(function(x,y){return x-y});
   return K("med","For the data $"+a.join(", ")+"$ find the median and the range.",[A(s[(n-1)/2],null,"num","median ="),A(s[n-1]-s[0],null,"num","range =")],"In order: $"+s.join(", ")+"$. Median $="+s[(n-1)/2]+"$, range $="+s[n-1]+"-"+s[0]+"="+(s[n-1]-s[0])+"$.")}),
 2:L(
 function(){var x=[0,1,2,3,4],f=x.map(function(){return ri(1,9)}),S=0;x.forEach(function(v,i){S+=v*f[i]});var m=fr(S,sum(f));
   return K("mft","The table shows the number of goals scored in some matches. Calculate the mean. $"+tbl(["\\text{Goals}","\\text{Frequency}"],[x,f])+"$",[A(m.s,m.t,"num","mean =")],"$\\bar x=\\dfrac{\\sum fx}{\\sum f}=\\dfrac{"+S+"}{"+sum(f)+"}="+m.t+"$")},
 function(){var n=ri(4,7),m=ri(8,20),a=[];for(var i=0;i<n-1;i++)a.push(ri(m-6,m+6));var last=m*n-sum(a);if(last<0){a[0]+=last;last=0}
   return K("miss","The mean of $"+n+"$ numbers is $"+m+"$. $"+(n-1)+"$ of them are $"+a.join(", ")+"$. Find the missing number.",[A(last,null,"num","=")],"Total $="+n+"\\times"+m+"="+m*n+"$, so missing number $="+m*n+"-"+sum(a)+"="+last+"$.")}),
 3:L(
 function(){var w=pick([5,10]),s0=pick([0,10,20]),cl=[0,1,2,3].map(function(i){return[s0+w*i,s0+w*i+w]}),f=cl.map(function(){return ri(2,12)}),mid=cl.map(function(c){return(c[0]+c[1])/2}),S=0;mid.forEach(function(v,i){S+=v*f[i]});var m=fr(S,sum(f));
   return K("gme","The table shows the times, $t$ minutes, taken by some students. Calculate an estimate of the mean. $"+tbl(["t","\\text{Freq}"],[cl.map(function(c){return c[0]+"\\lt t\\le"+c[1]}),f])+"$",[A(m.s,m.t,"num","mean ≈")],
     "Use the midpoints $"+mid.join(", ")+"$: $\\dfrac{"+mid.map(function(v,i){return v+"\\times"+f[i]}).join("+")+"}{"+sum(f)+"}="+m.t+"$")},
 function(){var a=[];for(var i=0;i<11;i++)a.push(ri(1,40));a.sort(function(x,y){return x-y});var sh=a.slice().sort(function(){return Math.random()-.5});
   return K("iqr","Find the lower quartile, the upper quartile and the interquartile range of $"+sh.join(", ")+"$.",[A(a[2],null,"num","LQ ="),A(a[8],null,"num","UQ ="),A(a[8]-a[2],null,"num","IQR =")],"In order: $"+a.join(", ")+"$. LQ is the 3rd value $="+a[2]+"$, UQ is the 9th value $="+a[8]+"$, IQR $="+(a[8]-a[2])+"$.")})};
/* 13 Probability */
G9[13]={1:L(
 function(){var r=ri(2,9),b=ri(2,9),g=ri(1,6),T=r+b+g,c=pick([["red",r],["blue",b],["green",g]]),p=fr(c[1],T);
   return K("p1","A bag contains $"+r+"$ red, $"+b+"$ blue and $"+g+"$ green counters. One counter is taken at random. Find the probability that it is "+c[0]+".",[A(p.s,p.t,"num","P =")],"$P=\\dfrac{"+c[1]+"}{"+T+"}="+p.t+"$")},
 function(){var d=pick([10,20,25,50,100]),n=ri(1,d-1),q=fr(d-n,d),p=fr(n,d);
   return K("pnot","The probability that it rains tomorrow is $"+nf(n/d)+"$. Find the probability that it does not rain tomorrow.",[A(q.s,nf((d-n)/d),"num","P =")],"$1-"+nf(n/d)+"="+nf((d-n)/d)+"$")}),
 2:L(
 function(){var s=pick([4,5,8]),k=ri(1,s-1),p=fr(k,2*s);
   return K("ind","A fair spinner has $"+s+"$ equal sections numbered $1$ to $"+s+"$. A fair coin is also thrown. Find the probability of getting a number less than or equal to $"+k+"$ and a head.",[A(p.s,p.t,"num","P =")],"Independent events: $\\dfrac{"+k+"}{"+s+"}\\times\\dfrac12="+p.t+"$")},
 function(){var p=pick([[1,4],[1,5],[2,5],[3,10],[1,6],[3,8]]),n=p[1]*ri(5,30);
   return K("exp","The probability that a biased dice lands on six is $\\dfrac{"+p[0]+"}{"+p[1]+"}$. The dice is rolled $"+n+"$ times. How many sixes would you expect?",[A(n*p[0]/p[1],null,"num","expected =")],"$"+n+"\\times\\dfrac{"+p[0]+"}{"+p[1]+"}="+n*p[0]/p[1]+"$")}),
 3:L(
 function(){var r=ri(3,8),b=ri(2,7),T=r+b,p=fr(r*(r-1),T*(T-1));
   return K("wr","A box contains $"+r+"$ red and $"+b+"$ blue pens. Two pens are taken at random without replacement. Find the probability that both pens are red.",[A(p.s,p.t,"num","P =")],"$\\dfrac{"+r+"}{"+T+"}\\times\\dfrac{"+(r-1)+"}{"+(T-1)+"}="+p.t+"$")},
 function(){var n=pick([50,80,100,200]),k=ri(5,n/2),N=pick([500,1000,2000]),p=fr(k,n);
   return K("rf","A drawing pin is dropped $"+n+"$ times and lands point up $"+k+"$ times. (a) Find the relative frequency of landing point up. (b) Estimate how many times it lands point up in $"+N+"$ drops.",[A(p.s,p.t,"num","(a)"),A(nf(N*k/n),null,"num","(b)")],"(a) $\\dfrac{"+k+"}{"+n+"}="+p.t+"$ (b) $"+N+"\\times"+p.t+"="+nf(N*k/n)+"$")})};

var LES9=[
 ["Number",[[1,"Indices and standard form"],[2,"Fractions, decimals and rounding"],[3,"Percentages"]]],
 ["Algebra",[[4,"Expressions and formulae"],[5,"Equations and inequalities"],[6,"Sequences"],[7,"Straight-line graphs"]]],
 ["Geometry and measure",[[8,"Angles and polygons"],[9,"Pythagoras' theorem"],[10,"Circles, area and volume"],[11,"Transformations, bearings and scale"]]],
 ["Statistics and probability",[[12,"Averages and spread"],[13,"Probability"]]]];

/* ===================================================================
   GRADE 10 · Cambridge IGCSE Mathematics (0580) · Core and Extended
   =================================================================== */
var G10={};
/* 1 Standard form and bounds */
G10[1]={1:L(G9[1][2],
 function(){var v=ri(101,999)*Math.pow(10,ri(2,6)),s=std(v);
   return K("sfw","Write $"+v.toLocaleString("en").replace(/,/g,"\\,")+"$ in standard form.",[A(s[0]+"*10^"+s[1],stdT(s[0],s[1]),"num","=")],"$"+stdT(s[0],s[1])+"$")}),
 2:L(
 function(){var v=ri(20,200),u=pick([1,10,0.1]),h=u/2;
   return K("bd","A length is $"+(u<1?nf(v/10):v*(u>1?10:1))+"$ cm, correct to the nearest "+(u===1?"centimetre":u===10?"10 cm":"millimetre ($0.1$ cm)")+". Write down the lower bound and the upper bound.",[A(nf((u<1?v/10:v*(u>1?10:1))-h),null,"num","lower ="),A(nf((u<1?v/10:v*(u>1?10:1))+h),null,"num","upper =")],"Half of the unit is $"+nf(h)+"$, so the bounds are $\\pm"+nf(h)+"$.")},
 function(){var a=ri(5,30),b=ri(5,30);
   return K("bp","A rectangle measures $"+a+"$ cm by $"+b+"$ cm, both correct to the nearest centimetre. Find the upper bound of the perimeter.",[A(2*(a+b)+2,null,"num","cm")],"$2("+(a+0.5)+"+"+(b+0.5)+")="+(2*(a+b)+2)+"$ cm")}),
 3:L(
 function(){var a=ri(5,20),b=ri(5,20);
   return K("ba","The sides of a rectangle are $"+a+"$ m and $"+b+"$ m, correct to the nearest metre. Calculate the upper bound of the area.",[A(nf((a+0.5)*(b+0.5)),null,"num","m²")],"$"+(a+0.5)+"\\times"+(b+0.5)+"="+nf((a+0.5)*(b+0.5))+"$ m²")},
 function(){var d=ri(10,90)*10,t=ri(2,9);
   return K("bs","A car travels $"+d+"$ km, correct to the nearest $10$ km, in $"+t+"$ hours, correct to the nearest hour. Calculate the lower bound of the average speed. "+DP,[A(nf((d-5)/(t+0.5)),null,"num","km/h")],"Lower bound of speed $=\\dfrac{\\text{lower distance}}{\\text{upper time}}=\\dfrac{"+(d-5)+"}{"+(t+0.5)+"}="+r2((d-5)/(t+0.5))+"$ km/h")})};
/* 2 Ratio, proportion and rates */
G10[2]={1:L(
 function(){var a=ri(1,7),b=ri(1,7),k=ri(5,60);if(a===b)b++;var T=(a+b)*k;
   return K("sh","Share USD "+T+" in the ratio $"+a+":"+b+"$.",[A(a*k,null,"num","first share ="),A(b*k,null,"num","second share =")],"One part $=\\dfrac{"+T+"}{"+(a+b)+"}="+k+"$, so the shares are $"+a*k+"$ and $"+b*k+"$.")},
 function(){var s=ri(30,120),t=pick([1.5,2,2.5,3,4]),d=s*t;
   return K("spd","A train travels $"+d+"$ km in $"+t+"$ hours. Find its average speed.",[A(s,null,"num","km/h")],"$\\text{speed}=\\dfrac{\\text{distance}}{\\text{time}}=\\dfrac{"+d+"}{"+t+"}="+s+"$ km/h")}),
 2:L(
 function(){var k=ri(2,6),x1=ri(2,5),x2=ri(6,10);
   return K("dp","$y$ is directly proportional to $x^2$. When $x="+x1+"$, $y="+k*x1*x1+"$. Find $y$ when $x="+x2+"$.",[A(k*x2*x2,null,"num","y =")],"$y=kx^2$: $k=\\dfrac{"+k*x1*x1+"}{"+x1*x1+"}="+k+"$, so $y="+k+"\\times"+x2*x2+"="+k*x2*x2+"$.")},
 function(){var k=ri(2,12)*12,x1=pick([2,3,4,6]),x2=pick([8,12,24]);
   return K("ip","$y$ is inversely proportional to $x$. When $x="+x1+"$, $y="+nf(k/x1)+"$. Find $y$ when $x="+x2+"$.",[A(nf(k/x2),null,"num","y =")],"$y=\\dfrac kx$: $k="+x1+"\\times"+nf(k/x1)+"="+k+"$, so $y=\\dfrac{"+k+"}{"+x2+"}="+nf(k/x2)+"$.")}),
 3:L(
 function(){var k=ri(1,9)*36,x1=pick([2,3,6]),x2=pick([1,2,3,6].filter(function(v){return v!==x1}));
   return K("ip2","$y$ is inversely proportional to the square of $x$. When $x="+x1+"$, $y="+nf(k/(x1*x1))+"$. Find $y$ when $x="+x2+"$.",[A(nf(k/(x2*x2)),null,"num","y =")],"$y=\\dfrac{k}{x^2}$: $k="+nf(k/(x1*x1))+"\\times"+x1*x1+"="+k+"$, so $y=\\dfrac{"+k+"}{"+x2*x2+"}="+nf(k/(x2*x2))+"$.")},
 function(){var m=ri(20,500),V=pick([2,4,5,8,10,20,25]),d=fr(m,V);
   return K("den","A block of metal has mass $"+m+"$ g and volume $"+V+"$ cm³. Find its density.",[A(d.s,nf(m/V),"num","g/cm³")],"$\\text{density}=\\dfrac{\\text{mass}}{\\text{volume}}=\\dfrac{"+m+"}{"+V+"}="+nf(m/V)+"$ g/cm³")})};
/* 3 Percentages and interest */
G10[3]={1:L(G9[3][1],
 function(){var P=ri(2,50)*100,r=pick([2,3,4,5,6]),n=ri(2,8);
   return K("si","Find the simple interest on USD "+P+" invested for "+n+" years at "+r+"% per year.",[A(P*r*n/100,null,"num","USD")],"$I=\\dfrac{PRT}{100}=\\dfrac{"+P+"\\times"+r+"\\times"+n+"}{100}="+P*r*n/100+"$")}),
 2:L(G9[3][2],G9[3][3]),
 3:L(
 function(){var r=pick([5,8,10,12,15,20]),n=0,v=1;while(v<2){v*=1+r/100;n++}
   return K("dbl","An investment grows by "+r+"% each year (compound interest). After how many complete years will it first be worth more than double its original value?",[A(n,null,"num","years =")],"Find the smallest $n$ with $"+nf(1+r/100)+"^n\\gt 2$: $"+nf(1+r/100)+"^{"+(n-1)+"}="+r2(Math.pow(1+r/100,n-1))+"$, $"+nf(1+r/100)+"^{"+n+"}="+r2(Math.pow(1+r/100,n))+"$, so $n="+n+"$.")},
 function(){var c=ri(4,50)*10,p=pick([10,15,20,25,30,40]),s=c*(100+p)/100;
   return K("prof","A shopkeeper buys a jacket for USD "+c+" and sells it for USD "+nf(s)+". Calculate the percentage profit.",[A(p,null,"num","% =")],"$\\dfrac{"+nf(s)+"-"+c+"}{"+c+"}\\times100="+p+"\\%$")})};
/* 4 Indices and surds */
G10[4]={1:L(
 function(){var C=pick([[8,3],[27,3],[64,3],[16,4],[81,4],[32,5],[125,3],[4,2],[9,2],[25,2]]),r=Math.round(Math.pow(C[0],1/C[1])),m=pick([1,2]),neg=Math.random()<.3,v=Math.pow(r,m);
   return K("fi","Find the value of $"+C[0]+"^{"+(neg?"-":"")+(m===1?"\\frac{1}{"+C[1]+"}":"\\frac{"+m+"}{"+C[1]+"}")+"}$.",[A(neg?"1/"+v:v,neg?"\\frac{1}{"+v+"}":v,"num","=")],"$\\sqrt["+C[1]+"]{"+C[0]+"}="+r+"$, then $"+r+"^{"+m+"}="+v+"$"+(neg?", and a negative index gives the reciprocal.":"."))},
 function(){var p=pick([2,3,5,6,7]),a=ri(1,4),b=ri(1,4);
   return K("sm","Simplify $\\sqrt{"+p*a*a+"}\\times\\sqrt{"+p*b*b+"}$.",[A(p*a*b,null,"num","=")],"$\\sqrt{"+p*a*a*p*b*b+"}="+p*a*b+"$")}),
 2:L(
 function(){var p=pick([2,3,5,6,7]),k=ri(2,7);
   return K("ss","Write $\\sqrt{"+p*k*k+"}$ in the form $k\\sqrt{"+p+"}$. Find $k$.",[A(k,null,"num","k =")],"$\\sqrt{"+p*k*k+"}=\\sqrt{"+k*k+"}\\times\\sqrt{"+p+"}="+k+"\\sqrt{"+p+"}$")},
 function(){var a=pick([2,3,5,6,7,10]),c=pick([1,2,3,a,2*a]),f=fr(c,a),t=f.d===1?(f.n===1?"":f.n)+"\\sqrt{"+a+"}":"\\dfrac{"+(f.n===1?"":f.n)+"\\sqrt{"+a+"}}{"+f.d+"}";
   return K("rat","Rationalise the denominator of $\\dfrac{"+c+"}{\\sqrt{"+a+"}}$.",[A(c+"/sqrt("+a+")",t,"num","=")],"Multiply top and bottom by $\\sqrt{"+a+"}$: $\\dfrac{"+c+"\\sqrt{"+a+"}}{"+a+"}="+t+"$")}),
 3:L(
 function(){var b=pick([2,3,5]),n=ri(2,5),k=ri(0,2),m=ri(1,2),x=fr(n-k,m);
   return K("exe","Solve $"+b+"^{"+(m===1?"":m)+"x"+(k?"+"+k:"")+"}="+Math.pow(b,n)+"$.",[A(x.s,x.t,"num","x =")],"$"+Math.pow(b,n)+"="+b+"^{"+n+"}$, so $"+(m===1?"":m)+"x"+(k?"+"+k:"")+"="+n+"\\Rightarrow x="+x.t+"$")},
 function(){var b=ri(2,5),c;do{c=pick([2,3,5,6,7])}while(b*b===c);var a=(b*b-c)*ri(1,2),k=a/(b*b-c);
   return K("rat2","Rationalise the denominator of $\\dfrac{"+a+"}{"+b+"+\\sqrt{"+c+"}}$.",[A(a+"/("+b+"+sqrt("+c+"))",(k===1?"":k)+(k===1?"":"(")+b+"-\\sqrt{"+c+"}"+(k===1?"":")"),"num","=")],
     "Multiply by $"+b+"-\\sqrt{"+c+"}$: denominator $="+b*b+"-"+c+"="+(b*b-c)+"$.")})};
/* 5 Algebraic manipulation */
G10[5]={1:L(G9[4][2],G9[4][1]),
 2:L(G9[4][3],
 function(){var a=ri(1,5),b=ri(1,9);
   return K("dts","Factorise $"+(a===1?"":a*a)+"x^2-"+b*b+"$.",[A("("+a+"*x-"+b+")*("+a+"*x+"+b+")","("+(a===1?"":a)+"x-"+b+")("+(a===1?"":a)+"x+"+b+")","expr","=")],"Difference of two squares: $a^2-b^2=(a-b)(a+b)$.")}),
 3:L(
 function(){var a=pick([2,3]),p=nz(-5,5),q=nz(-5,5),B=a*q+p,C=p*q;
   return K("fq2","Factorise $"+polyT([a,B,C])+"$.",[A("("+a+"*x"+sg(p)+")*(x"+sg(q)+")","("+a+"x"+sg(p)+")(x"+sg(q)+")","expr","=")],"$("+a+"x"+sg(p)+")(x"+sg(q)+")="+polyT([a,B,C])+"$")},
 function(){var a=ri(1,6),b;do{b=nz(-6,6)}while(b===a||b===-a);
   return K("af","Simplify $\\dfrac{x^2-"+a*a+"}{x^2"+co(b-a,"x")+sg(-a*b)+"}$.",[A("(x+"+a+")/(x"+sg(b)+")","\\dfrac{x+"+a+"}{x"+sg(b)+"}","expr","=")],"$\\dfrac{(x-"+a+")(x+"+a+")}{(x-"+a+")(x"+sg(b)+")}=\\dfrac{x+"+a+"}{x"+sg(b)+"}$")})};
/* 6 Equations and quadratics */
G10[6]={1:L(G9[5][2],
 function(){var r=nz(-7,7),s;do{s=nz(-7,7)}while(s===r);var lo=Math.min(r,s),hi=Math.max(r,s);
   return K("qf","Solve $"+polyT([1,-(r+s),r*s])+"=0$.",[A(lo,null,"num","x₁ ="),A(hi,null,"num","x₂ =")],"$(x"+sg(-r)+")(x"+sg(-s)+")=0\\Rightarrow x="+lo+"$ or $x="+hi+"$")}),
 2:L(
 function(){var a=pick([1,2,3]),b=nz(-9,9),c=nz(-9,9),D=b*b-4*a*c;if(D<=0||Math.sqrt(D)%1===0){c=-Math.abs(c)-1;D=b*b-4*a*c;if(Math.sqrt(D)%1===0){c--;D=b*b-4*a*c}}var x1=(-b-Math.sqrt(D))/(2*a),x2=(-b+Math.sqrt(D))/(2*a);
   return K("qfm","Solve $"+polyT([a,b,c])+"=0$. "+DP,[A(nf(x1),null,"num","x₁ ="),A(nf(x2),null,"num","x₂ =")],"$x=\\dfrac{"+(-b)+"\\pm\\sqrt{"+D+"}}{"+2*a+"}$, so $x="+r2(x1)+"$ or $x="+r2(x2)+"$.")},
 function(){var p=nz(-6,6),q=ri(-10,10);
   return K("cts","Write $"+polyT([1,2*p,p*p+q])+"$ in the form $(x+a)^2+b$.",[A(p,null,"num","a ="),A(q,null,"num","b =")],"$(x"+sg(p)+")^2-"+p*p+sg(p*p+q)+"=(x"+sg(p)+")^2"+co(q,"")+"$")}),
 3:L(
 function(){var r=ri(1,6),s;do{s=ri(-6,6)}while(s===0||s===r||s===-r);
   /* x + k/x = m  ⇒ x² − mx + k = 0 */var m=r+s,k=r*s,lo=Math.min(r,s),hi=Math.max(r,s);
   return K("eqq","Solve $x"+(k<0?"-":"+")+"\\dfrac{"+Math.abs(k)+"}{x}="+m+"$.",[A(lo,null,"num","x₁ ="),A(hi,null,"num","x₂ =")],"Multiply by $x$: $x^2"+co(-m,"x")+sg(k)+"=0\\Rightarrow (x"+sg(-r)+")(x"+sg(-s)+")=0$, so $x="+lo+"$ or $x="+hi+"$.")},
 function(){var g=pick([9.8,10]),t=ri(2,6),h=g*t*t/2;
   return K("rs","The formula $h=\\tfrac12gt^2$ gives the distance fallen. Make $t$ the subject, then find $t$ when $h="+nf(h)+"$ and $g="+g+"$.",[A(t,null,"num","t =")],"$t=\\sqrt{\\dfrac{2h}{g}}=\\sqrt{\\dfrac{"+nf(2*h)+"}{"+g+"}}="+t+"$")})};
/* 7 Simultaneous equations and inequalities */
G10[7]={1:L(G9[7][3],G9[5][2]),
 2:L(
 function(){var a=ri(3,12),c=ri(2,a-1),x=ri(10,60),y=ri(10,60),n=x+y;
   return K("tick","At a concert, adult tickets cost USD "+a+" and child tickets cost USD "+c+". $"+n+"$ tickets were sold for a total of USD "+(a*x+c*y)+". How many adult tickets and child tickets were sold?",[A(x,null,"num","adults ="),A(y,null,"num","children =")],"$x+y="+n+"$ and $"+a+"x+"+c+"y="+(a*x+c*y)+"$. Then $"+(a-c)+"x="+(a*x+c*y-c*n)+"\\Rightarrow x="+x+"$, $y="+y+"$.")},
 G9[5][3]),
 3:L(
 function(){var r=ri(-4,2),s=r+ri(1,5),k=ri(-3,3),b=-(r+s)-1,c=r*s+k;
   /* y = x + k  and y = x² + bx + c ⇒ x² + (b−1)x + (c−k) = 0 with roots r,s */
   return K("slq","Solve the simultaneous equations $y=x"+co(k,"")+"$ and $y="+polyT([1,b,c])+"$. Give the $x$-coordinates of the points of intersection.",[A(r,null,"num","x₁ ="),A(s,null,"num","x₂ =")],
     "$x^2"+co(b,"x")+sg(c)+"=x"+co(k,"")+"\\Rightarrow "+polyT([1,b-1,c-k])+"=0\\Rightarrow (x"+sg(-r)+")(x"+sg(-s)+")=0$")},
 function(){var k=ri(2,10);
   return K("qin","Solve the inequality $x^2\\lt "+k*k+"$. The solution is $a\\lt x\\lt b$. Find $a$ and $b$.",[A(-k,null,"num","a ="),A(k,null,"num","b =")],"$x^2-"+k*k+"\\lt 0\\Rightarrow(x-"+k+")(x+"+k+")\\lt 0\\Rightarrow -"+k+"\\lt x\\lt "+k+"$")})};
/* 8 Sequences */
G10[8]={1:L(G9[6][1],G9[6][2]),2:L(G9[6][3],G9[6][2]),
 3:L(G9[6][3],
 function(){var a=ri(1,3),c=ri(-10,10),n=ri(5,15),v=a*n*n+c;
   return K("qpos","The $n$th term of a sequence is $"+(a===1?"":a)+"n^2"+co(c,"")+"$. Which term is equal to $"+v+"$?",[A(n,null,"num","n =")],"$"+(a===1?"":a)+"n^2="+(v-c)+"\\Rightarrow n^2="+n*n+"\\Rightarrow n="+n+"$")})};
/* 9 Functions */
G10[9]={1:L(
 function(){var a=nz(-5,5),b=ri(-9,9),x=ri(-6,6);
   return K("fv","$f(x)="+co(a,"x",true)+co(b,"")+"$. Find $f("+x+")$.",[A(a*x+b,null,"num","=")],"$f("+x+")="+a+"\\times"+sgp(x)+co(b,"")+"="+(a*x+b)+"$")},
 function(){var a=pick([2,3,4,5]),b=ri(-9,9),x=ri(-6,8);
   return K("fs","$g(x)="+a+"x"+co(b,"")+"$. Solve $g(x)="+(a*x+b)+"$.",[A(x,null,"num","x =")],"$"+a+"x"+co(b,"")+"="+(a*x+b)+"\\Rightarrow x="+x+"$")}),
 2:L(
 function(){var a=nz(-4,4),b=ri(-6,6),c=nz(-3,3),d=ri(-6,6),x=ri(-4,4),g=c*x+d;
   return K("fg","$f(x)="+co(a,"x",true)+co(b,"")+"$ and $g(x)="+co(c,"x",true)+co(d,"")+"$. Find $fg("+x+")$.",[A(a*g+b,null,"num","=")],"$g("+x+")="+g+"$, then $f("+g+")="+(a*g+b)+"$.")},
 function(){var a=pick([2,3,4,5,-2]),b=nz(-9,9);
   return K("finv","$f(x)="+a+"x"+co(b,"")+"$. Find $f^{-1}(x)$.",[A("(x"+sg(-b)+")/"+a,"\\dfrac{x"+sg(-b)+"}{"+a+"}","expr","f⁻¹(x) =")],"Let $y="+a+"x"+co(b,"")+"$, then $x=\\dfrac{y"+sg(-b)+"}{"+a+"}$, so $f^{-1}(x)=\\dfrac{x"+sg(-b)+"}{"+a+"}$.")}),
 3:L(
 function(){var a=nz(-3,3),b=ri(-5,5),c=nz(-3,3),d=ri(-5,5);
   return K("fgx","$f(x)="+co(a,"x",true)+co(b,"")+"$ and $g(x)="+co(c,"x",true)+co(d,"")+"$. Find $fg(x)$ in its simplest form.",[A(poly([a*c,a*d+b]),polyT([a*c,a*d+b]),"expr","fg(x) =")],"$fg(x)=f(g(x))="+a+"("+co(c,"x",true)+co(d,"")+")"+co(b,"")+"="+polyT([a*c,a*d+b])+"$")},
 function(){var a=nz(-4,5),b=nz(-9,9),c=ri(2,5);
   return K("finv2","$f(x)=\\dfrac{"+co(a,"x",true)+co(b,"")+"}{"+c+"}$. Find $f^{-1}(x)$.",[A("("+c+"*x"+sg(-b)+")/("+a+")","\\dfrac{"+c+"x"+sg(-b)+"}{"+a+"}","expr","f⁻¹(x) =")],"$y=\\dfrac{"+co(a,"x",true)+co(b,"")+"}{"+c+"}\\Rightarrow "+c+"y="+co(a,"x",true)+co(b,"")+"\\Rightarrow x=\\dfrac{"+c+"y"+sg(-b)+"}{"+a+"}$")})};
/* 10 Coordinate geometry */
G10[10]={1:L(G9[7][1],G9[7][2]),2:L(G9[7][2],
 function(){var m=pick([1,2,3,-1,-2,-3,0.5,-0.5]),P=[ri(-4,4),ri(-4,4)],p=fr(-1,1),mm=fr(m*2,2);var pm=fr(-2,m*2);var c=fr(P[1]*m*2+2*P[0],m*2);
   return K("perp","Line $L_1$ has gradient $"+mm.t+"$. Line $L_2$ is perpendicular to $L_1$ and passes through $"+pt(P)+"$. Find the equation of $L_2$ in the form $y=mx+c$.",[A(pm.s,pm.t,"num","m ="),A(c.s,c.t,"num","c =")],"Perpendicular gradient $=-\\dfrac{1}{m}="+pm.t+"$, then $c="+P[1]+"-("+pm.t+")("+P[0]+")="+c.t+"$.")}),
 3:L(
 function(){var A0=[ri(-4,4),ri(-4,4)],dx=2*nz(-3,3),dy=2*nz(-3,3),B0=[A0[0]+dx,A0[1]+dy],M=[A0[0]+dx/2,A0[1]+dy/2],m=fr(-dx,dy),c=fr(M[1]*dy+dx*M[0],dy);
   return K("pb","Find the equation of the perpendicular bisector of $AB$, where $A"+pt(A0)+"$ and $B"+pt(B0)+"$. Give your answer in the form $y=mx+c$.",[A(m.s,m.t,"num","m ="),A(c.s,c.t,"num","c =")],"Midpoint $"+pt(M)+"$, gradient of $AB=\\dfrac{"+dy+"}{"+dx+"}$, perpendicular gradient $="+m.t+"$, so $c="+c.t+"$.")},
 function(){var x=ri(-5,5),y=ri(-5,5),m1=nz(-3,3),m2;do{m2=nz(-3,3)}while(m2===m1);
   return K("int2","Find the coordinates of the point where $y="+polyT([m1,y-m1*x])+"$ meets $y="+polyT([m2,y-m2*x])+"$.",[A(x,null,"num","x ="),A(y,null,"num","y =")],"$"+polyT([m1,y-m1*x])+"="+polyT([m2,y-m2*x])+"\\Rightarrow "+(m1-m2)+"x="+((m1-m2)*x)+"\\Rightarrow x="+x+"$, $y="+y+"$.")})};
/* 11 Mensuration */
G10[11]={1:L(
 function(){var r=ri(2,20)/2;
   return K("ca","A circle has radius $"+r+"$ cm. Calculate its area. "+DP,[A(nf(Math.PI*r*r),null,"num","cm²")],"$A=\\pi r^2=\\pi\\times"+r+"^2="+r2(Math.PI*r*r)+"$ cm²")},
 G9[10][1]),
 2:L(
 function(){var r=ri(3,15),t=ri(20,160);
   return K("sec2","A sector has radius $"+r+"$ cm and angle $"+t+"^\\circ$. Calculate (a) the arc length (b) the area. "+DP,[A(nf(2*Math.PI*r*t/360),null,"num","(a)"),A(nf(Math.PI*r*r*t/360),null,"num","(b)")],"Arc $=\\dfrac{"+t+"}{360}\\times2\\pi\\times"+r+"="+r2(2*Math.PI*r*t/360)+"$ cm, area $=\\dfrac{"+t+"}{360}\\times\\pi\\times"+r+"^2="+r2(Math.PI*r*r*t/360)+"$ cm²")},
 function(){var r=ri(2,12),h=ri(3,20);
   return K("cylv","A cylinder has radius $"+r+"$ cm and height $"+h+"$ cm. Calculate its volume. "+DP,[A(nf(Math.PI*r*r*h),null,"num","cm³")],"$V=\\pi r^2h="+r2(Math.PI*r*r*h)+"$ cm³")}),
 3:L(
 function(){var T=pick(TR),r=T[0],h=T[1],l=T[2];
   return K("cone","A cone has base radius $"+r+"$ cm and perpendicular height $"+h+"$ cm. (a) Find the slant height. (b) Find the volume in terms of $\\pi$.",[A(l,null,"num","(a)"),A(r*r*h/3+"*pi",fr(r*r*h,3).d===1?r*r*h/3+"\\pi":"\\dfrac{"+r*r*h+"\\pi}{3}","num","(b)")],"$l=\\sqrt{"+r+"^2+"+h+"^2}="+l+"$ cm, $V=\\dfrac13\\pi r^2h=\\dfrac{"+r*r*h+"}{3}\\pi$ cm³")},
 function(){var r=ri(2,9),V=fr(4*r*r*r,3);
   return K("sph","The volume of a sphere is $"+(V.d===1?V.n:"\\dfrac{"+V.n+"}{"+V.d+"}")+"\\pi$ cm³. Find its radius. [$V=\\tfrac43\\pi r^3$]",[A(r,null,"num","r =")],"$\\dfrac43\\pi r^3="+V.t+"\\pi\\Rightarrow r^3="+r*r*r+"\\Rightarrow r="+r+"$ cm")})};
/* 12 Trigonometry */
G10[12]={1:L(
 function(){var t=ri(20,70),h=ri(5,20),f=pick(["sin","cos","tan"]),v=f==="sin"?h*Math.sin(t*D):f==="cos"?h*Math.cos(t*D):h*Math.tan(t*D);
   var q=f==="tan"?"In triangle $ABC$, angle $B=90^\\circ$, angle $A="+t+"^\\circ$ and $AB="+h+"$ cm. Calculate $BC$.":"In triangle $ABC$, angle $B=90^\\circ$, angle $A="+t+"^\\circ$ and the hypotenuse $AC="+h+"$ cm. Calculate "+(f==="sin"?"$BC$":"$AB$")+".";
   return K("tr1",q+" "+DP,[A(nf(v),null,"num","cm")],(f==="sin"?"$BC=AC\\sin A":f==="cos"?"$AB=AC\\cos A":"$BC=AB\\tan A")+"="+h+"\\"+f+t+"^\\circ="+r2(v)+"$ cm")},
 function(){var a=ri(3,15),b=ri(3,15),t=Math.atan(a/b)/D;
   return K("tr2","In a right-angled triangle, the side opposite angle $x$ is $"+a+"$ cm and the side adjacent to angle $x$ is $"+b+"$ cm. Calculate $x$. "+DP,[A(nf(t),null,"num","x =")],"$\\tan x=\\dfrac{"+a+"}{"+b+"}\\Rightarrow x=\\tan^{-1}\\left(\\dfrac{"+a+"}{"+b+"}\\right)="+r2(t)+"^\\circ$")}),
 2:L(
 function(){var A1=ri(30,80),B1=ri(30,80),a=ri(5,20),b=a*Math.sin(B1*D)/Math.sin(A1*D);
   return K("sr","In triangle $ABC$, $a="+a+"$ cm, angle $A="+A1+"^\\circ$ and angle $B="+B1+"^\\circ$. Use the sine rule to calculate $b$. "+DP,[A(nf(b),null,"num","b =")],"$\\dfrac{b}{\\sin B}=\\dfrac{a}{\\sin A}\\Rightarrow b=\\dfrac{"+a+"\\sin"+B1+"^\\circ}{\\sin"+A1+"^\\circ}="+r2(b)+"$ cm")},
 function(){var b=ri(4,15),c=ri(4,15),A1=ri(30,120),a=Math.sqrt(b*b+c*c-2*b*c*Math.cos(A1*D));
   return K("cr","In triangle $ABC$, $b="+b+"$ cm, $c="+c+"$ cm and angle $A="+A1+"^\\circ$. Calculate $a$. "+DP,[A(nf(a),null,"num","a =")],"$a^2=b^2+c^2-2bc\\cos A="+b*b+"+"+c*c+"-2\\times"+b+"\\times"+c+"\\cos"+A1+"^\\circ\\Rightarrow a="+r2(a)+"$ cm")}),
 3:L(
 function(){var a,b,c;do{a=ri(4,15);b=ri(4,15);c=ri(4,15)}while(a+b<=c||a+c<=b||b+c<=a);var A1=Math.acos((b*b+c*c-a*a)/(2*b*c))/D;
   return K("ca2","A triangle has sides $a="+a+"$ cm, $b="+b+"$ cm and $c="+c+"$ cm. Calculate angle $A$. "+DP,[A(nf(A1),null,"num","A =")],"$\\cos A=\\dfrac{b^2+c^2-a^2}{2bc}=\\dfrac{"+(b*b+c*c-a*a)+"}{"+2*b*c+"}\\Rightarrow A="+r2(A1)+"^\\circ$")},
 function(){var a=ri(4,15),b=ri(4,15),C=ri(25,150),S=0.5*a*b*Math.sin(C*D);
   return K("tar","Two sides of a triangle are $"+a+"$ cm and $"+b+"$ cm and the angle between them is $"+C+"^\\circ$. Calculate the area of the triangle. "+DP,[A(nf(S),null,"num","cm²")],"$\\text{Area}=\\tfrac12ab\\sin C=\\tfrac12\\times"+a+"\\times"+b+"\\times\\sin"+C+"^\\circ="+r2(S)+"$ cm²")})};
/* 13 Circle theorems */
G10[13]={1:L(
 function(){var x=ri(20,85);
   return K("cen","$O$ is the centre of a circle. $A$, $B$ and $C$ are points on the circle. Angle $ACB="+x+"^\\circ$. Find angle $AOB$.",[A(2*x,null,"num","AOB =")],"The angle at the centre is twice the angle at the circumference: $2\\times"+x+"="+2*x+"^\\circ$.")},
 function(){var x=ri(15,75);
   return K("semi","$AB$ is a diameter of a circle and $C$ is a point on the circle. Angle $CAB="+x+"^\\circ$. Find angle $ABC$.",[A(90-x,null,"num","ABC =")],"The angle in a semicircle is $90^\\circ$, so $ABC=180-90-"+x+"="+(90-x)+"^\\circ$.")}),
 2:L(
 function(){var x=ri(50,130);
   return K("cyc","$ABCD$ is a cyclic quadrilateral. Angle $DAB="+x+"^\\circ$. Find angle $BCD$.",[A(180-x,null,"num","BCD =")],"Opposite angles of a cyclic quadrilateral add up to $180^\\circ$: $180-"+x+"="+(180-x)+"^\\circ$.")},
 function(){var x=ri(20,80);
   return K("tan","$PA$ and $PB$ are tangents to a circle with centre $O$. Angle $APB="+x+"^\\circ$. Find angle $AOB$.",[A(180-x,null,"num","AOB =")],"A tangent is perpendicular to the radius, so $OAP=OBP=90^\\circ$. In quadrilateral $OAPB$: $AOB=360-90-90-"+x+"="+(180-x)+"^\\circ$.")}),
 3:L(
 function(){var x=ri(30,80);
   return K("alt","$TA$ is a tangent to a circle at $A$. $AB$ is a chord and $C$ is a point on the major arc. Angle $TAB="+x+"^\\circ$. Find angle $ACB$.",[A(x,null,"num","ACB =")],"Alternate segment theorem: the angle between the tangent and the chord equals the angle in the alternate segment, so $ACB="+x+"^\\circ$.")},
 function(){var x=ri(25,70),y=ri(25,70);
   return K("seg","$A$, $B$, $C$ and $D$ lie on a circle. Angle $ADB="+x+"^\\circ$ and angle $DBC="+y+"^\\circ$. Find angle $ACB$ and angle $DAC$.",[A(x,null,"num","ACB ="),A(y,null,"num","DAC =")],"Angles in the same segment are equal: $ACB=ADB="+x+"^\\circ$ and $DAC=DBC="+y+"^\\circ$.")})};
/* 14 Vectors */
G10[14]={1:L(
 function(){var a=[nz(-6,6),nz(-6,6)],b=[nz(-6,6),nz(-6,6)];
   return K("va","$\\mathbf a="+cv(a)+"$ and $\\mathbf b="+cv(b)+"$. Find $\\mathbf a+\\mathbf b$.",[A(a[0]+b[0],null,"num","x ="),A(a[1]+b[1],null,"num","y =")],"$"+cv([a[0]+b[0],a[1]+b[1]])+"$")},
 function(){var a=[nz(-5,5),nz(-5,5)],b=[nz(-5,5),nz(-5,5)],p=ri(2,4),q=ri(1,3);
   return K("vc","$\\mathbf a="+cv(a)+"$ and $\\mathbf b="+cv(b)+"$. Find $"+p+"\\mathbf a-"+(q===1?"":q)+"\\mathbf b$.",[A(p*a[0]-q*b[0],null,"num","x ="),A(p*a[1]-q*b[1],null,"num","y =")],"$"+cv([p*a[0]-q*b[0],p*a[1]-q*b[1]])+"$")}),
 2:L(
 function(){var v=[nz(-9,9),nz(-9,9)],m=v[0]*v[0]+v[1]*v[1];
   return K("vm","Find the exact magnitude of $"+cv(v)+"$.",[A("sqrt("+m+")",sqT(m),"num","|v| =")],"$\\sqrt{"+sgp(v[0])+"^2+"+sgp(v[1])+"^2}=\\sqrt{"+m+"}="+sqT(m)+"$")},
 function(){var P=[ri(-6,6),ri(-6,6)],B=[ri(-6,6),ri(-6,6)];
   return K("vab","$A$ is the point $"+pt(P)+"$ and $B$ is the point $"+pt(B)+"$. Find $\\overrightarrow{AB}$ as a column vector.",[A(B[0]-P[0],null,"num","x ="),A(B[1]-P[1],null,"num","y =")],"$\\overrightarrow{AB}=\\mathbf b-\\mathbf a="+cv([B[0]-P[0],B[1]-P[1]])+"$")}),
 3:L(
 function(){var u=[nz(-4,4),nz(-4,4)],k=pick([2,3,-2,-1]),y=u[1]*k;
   return K("vpar","$\\begin{pmatrix}"+k*u[0]+"\\\\ t\\end{pmatrix}$ is parallel to $"+cv(u)+"$. Find $t$.",[A(y,null,"num","t =")],"Parallel vectors are multiples: $"+k*u[0]+"="+k+"\\times"+sgp(u[0])+"$, so $t="+k+"\\times"+sgp(u[1])+"="+y+"$.")},
 function(){var a=[nz(-5,5),nz(-5,5)],b=[nz(-5,5),nz(-5,5)],v=[2*a[0]+b[0],2*a[1]+b[1]],m=Math.sqrt(v[0]*v[0]+v[1]*v[1]);if(!m){v=[3,4];m=5}
   return K("vm2","$\\mathbf a="+cv(a)+"$ and $\\mathbf b="+cv(b)+"$. Calculate $|2\\mathbf a+\\mathbf b|$. "+DP,[A(nf(m),null,"num","=")],"$2\\mathbf a+\\mathbf b="+cv(v)+"$, magnitude $=\\sqrt{"+(v[0]*v[0]+v[1]*v[1])+"}="+r2(m)+"$")})};
/* 15 Statistics */
G10[15]={1:L(G9[12][1],G9[12][2]),2:L(G9[12][3],G9[12][2]),
 3:L(G9[12][3],
 function(){var w=pick([5,10,20]),f=ri(4,40)*(w/5),cl=ri(0,6)*10;
   return K("fd","In a histogram, the class $"+cl+"\\lt x\\le"+(cl+w)+"$ has frequency $"+f+"$. Calculate the frequency density.",[A(nf(f/w),null,"num","f.d. =")],"$\\text{frequency density}=\\dfrac{\\text{frequency}}{\\text{class width}}=\\dfrac{"+f+"}{"+w+"}="+nf(f/w)+"$")})};
/* 16 Probability */
G10[16]={1:L(G9[13][1],G9[13][2]),
 2:L(
 function(){var a=pick([[1,4],[2,5],[3,10],[1,3],[3,5]]),b=pick([[1,2],[2,3],[3,4],[1,5]]),p=fr(a[0]*b[0],a[1]*b[1]),q=fr((a[1]-a[0])*(b[1]-b[0]),a[1]*b[1]);
   return K("tree","The probability that Ana is late is $\\dfrac{"+a[0]+"}{"+a[1]+"}$ and, independently, the probability that Ben is late is $\\dfrac{"+b[0]+"}{"+b[1]+"}$. Find the probability that (a) both are late (b) neither is late.",[A(p.s,p.t,"num","(a)"),A(q.s,q.t,"num","(b)")],"(a) $\\dfrac{"+a[0]+"}{"+a[1]+"}\\times\\dfrac{"+b[0]+"}{"+b[1]+"}="+p.t+"$ (b) $\\dfrac{"+(a[1]-a[0])+"}{"+a[1]+"}\\times\\dfrac{"+(b[1]-b[0])+"}{"+b[1]+"}="+q.t+"$")},
 G9[13][2]),
 3:L(
 function(){var r=ri(3,8),b=ri(2,7),T=r+b,p=fr(T*(T-1)-b*(b-1),T*(T-1));
   return K("al1","A bag contains $"+r+"$ red and $"+b+"$ blue balls. Two balls are taken at random without replacement. Find the probability that at least one ball is red.",[A(p.s,p.t,"num","P =")],"$1-P(\\text{both blue})=1-\\dfrac{"+b+"}{"+T+"}\\times\\dfrac{"+(b-1)+"}{"+(T-1)+"}="+p.t+"$")},
 function(){var U=ri(30,60),a=ri(10,25),b=ri(10,25),n=ri(2,Math.min(a,b)-1);if(a+b-n>U)U=a+b-n+ri(0,10);
   return K("venn","In a class of $"+U+"$ students, $"+a+"$ study French, $"+b+"$ study Spanish and $"+n+"$ study both. A student is chosen at random. Find the probability that the student studies French or Spanish (or both).",[A(fr(a+b-n,U).s,fr(a+b-n,U).t,"num","P =")],"$n(F\\cup S)="+a+"+"+b+"-"+n+"="+(a+b-n)+"$, so $P=\\dfrac{"+(a+b-n)+"}{"+U+"}"+(gcd(a+b-n,U)>1?"="+fr(a+b-n,U).t:"")+"$")})};

var LES10=[
 ["Number",[[1,"Standard form and bounds"],[2,"Ratio, proportion and rates"],[3,"Percentages and interest"],[4,"Indices and surds"]]],
 ["Algebra",[[5,"Algebraic manipulation"],[6,"Equations and quadratics"],[7,"Simultaneous equations and inequalities"],[8,"Sequences"],[9,"Functions"]]],
 ["Coordinate geometry",[[10,"Straight lines"]]],
 ["Geometry and mensuration",[[11,"Mensuration"],[12,"Trigonometry"],[13,"Circle theorems"],[14,"Vectors"]]],
 ["Statistics and probability",[[15,"Statistics"],[16,"Probability"]]]];

/* 🖼 រូបសំណួរ (fig.js)៖ pts={A:[x,y,"ne"]} · cmds=["seg A B",…] · o.axes (អ័ក្ស) · o.nts=false (មិនសរសេរ NOT TO SCALE) · o.ext=[[x,y]] */
function FB(pts,cmds,o){o=o||{};var xs=[],ys=[],k,L=[],r=function(v){return Math.round(v*1000)/1000};
  for(k in pts){xs.push(pts[k][0]);ys.push(pts[k][1])}(o.ext||[]).forEach(function(p){xs.push(p[0]);ys.push(p[1])});
  var x0=Math.min.apply(null,xs),x1=Math.max.apply(null,xs),y0=Math.min.apply(null,ys),y1=Math.max.apply(null,ys),m=Math.max(x1-x0,y1-y0)*.14+.5;
  x0-=m;x1+=m;y0-=m;y1+=m+(o.nts===false?0:m*.6);
  if(o.axes){x0=Math.floor(Math.min(x0,-1));x1=Math.ceil(Math.max(x1,1));y0=Math.floor(Math.min(y0,-1));y1=Math.ceil(Math.max(y1,1))}
  var w=x1-x0,h=y1-y0;if(h/w<.55){var e=(.55*w-h)/2;y0-=e;y1+=e}else if(h/w>1.1){var e2=(h/1.1-w)/2;x0-=e2;x1+=e2}
  if(!o.axes)L.push("nogrid","noaxes");L.push("window x="+r(x0)+".."+r(x1)+" y="+r(y0)+".."+r(y1));
  for(k in pts)L.push(k+"("+r(pts[k][0])+","+r(pts[k][1])+")"+(pts[k][2]?" "+pts[k][2]:""));
  L=L.concat(cmds);if(o.nts!==false)L.push("text ("+r(x1-(x1-x0)*.3)+","+r(y1-(y1-y0)*.06)+") NOT TO SCALE gray");
  return L.join("\n")}
function mid(P,Q,dx,dy){return"("+(Math.round(((P[0]+Q[0])/2+(dx||0))*1000)/1000)+","+(Math.round(((P[1]+Q[1])/2+(dy||0))*1000)/1000)+")"}
window.PXEN={K:K,FB:FB,mid:mid,L:L,r2:r2,rn:rn,sum:sum,sqT:sqT,piT:piT,stdT:stdT,tbl:tbl,pt:pt,cv:cv,nf:nf,std:std,sig:sig,DP:DP,TR:TR,D:D,G9:G9,G10:G10};   /* ជំនួយសម្រាប់ practiceen2.js */
X.reg(109,{en:true,tab:"🇬🇧 G9 · Stage 9",title:"Grade 9 · Cambridge Lower Secondary Stage 9",les:LES9,G:G9});
X.reg(110,{en:true,tab:"🇬🇧 G10 · IGCSE",title:"Grade 10 · Cambridge IGCSE (0580)",les:LES10,G:G10});
})();
