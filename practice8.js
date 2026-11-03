/* ========================================================================
   🧮 ហាត់លំហាត់ ថ្នាក់ទី៨ — ១៩ មេរៀន × ៣ កម្រិត (បង្កើតដោយកូដ)
   លេខមេរៀនដូច curriculum8.js (1 … 19) · ត្រូវផ្ទុកបន្ទាប់ពី practice.js (window.PX)
   ======================================================================== */
(function(){
"use strict";
var X=window.PX,Q=X.Q,A=X.A,ri=X.ri,nz=X.nz,pick=X.pick,fr=X.fr,sg=X.sg,co=X.co,poly=X.poly,polyT=X.polyT,sgp=X.sgp,gcd=X.gcd;
function sum(a){return a.reduce(function(x,y){return x+y},0)}
function ft(n,d){return(n<0?"-":"")+"\\dfrac{"+Math.abs(n)+"}{"+d+"}"}
function pt(p){return"("+p[0]+";"+p[1]+")"}
function r2(v){return Math.round(v*100)/100}
var TR=[[3,4,5],[6,8,10],[5,12,13],[8,15,17],[9,12,15],[12,16,20],[7,24,25]];
var G={};
/* ===== ១ ចំនួនសនិទាន ===== */
G[1]={1:function(){var b=ri(2,9),d=ri(2,9),a=nz(-9,9),c=nz(-9,9),r=fr(a*d+c*b,b*d);
    return Q("គណនា $"+ft(a,b)+(c<0?"-":"+")+"\\dfrac{"+Math.abs(c)+"}{"+d+"}$",[A(r.s,r.t,"num","=")],"ភាគបែងរួម $"+(b*d)+"$ ⇒ $"+ft(a*d+c*b,b*d)+"="+r.t+"$")},
  2:function(){var a=nz(-9,9),b=ri(2,9),c=nz(-9,9),d=ri(2,9),r=fr(a*d,b*c);
    return Q("គណនា $"+ft(a,b)+"\\div\\left("+ft(c,d)+"\\right)$",[A(r.s,r.t,"num","=")],"$"+ft(a,b)+"\\times"+(c<0?"\\left(-\\dfrac{"+d+"}{"+(-c)+"}\\right)":"\\dfrac{"+d+"}{"+c+"}")+"="+r.t+"$")},
  3:function(){var a=nz(-6,6),b=ri(2,6),c=nz(-6,6),d=ri(2,6),e=nz(-6,6),f=ri(2,6),p=fr(c*e,d*f),r=fr(a*p.d-p.n*b,b*p.d);
    return Q("គណនា $"+ft(a,b)+"-"+ft(c,d).replace(/^-(.*)$/,"\\left(-$1\\right)")+"\\times"+ft(e,f).replace(/^-(.*)$/,"\\left(-$1\\right)")+"$",[A(r.s,r.t,"num","=")],"គុណមុន៖ $"+p.t+"$ ⇒ $"+ft(a,b)+"-\\left("+p.t+"\\right)="+r.t+"$")}};
/* ===== ២ ស្វ័យគុណ ===== */
G[2]={1:function(){var a=nz(-5,5),n=ri(2,4);if(Math.abs(a)>3)n=2;
    return Q("គណនា $"+sgp(a)+"^"+n+"$",[A(Math.pow(a,n),null,"num","=")],"$"+Array(n+1).join(sgp(a)+"\\times").slice(0,-6)+"="+Math.pow(a,n)+"$")},
  2:function(){var m=ri(2,9),n=ri(2,9),p=ri(1,m+n-1),k=m+n-p;
    return Q("សរសេរ $\\dfrac{a^{"+m+"}\\times a^{"+n+"}}{a^{"+p+"}}$ ជាទម្រង់ $a^k$ ។ រក $k$",[A(k,null,"num","k =")],"$a^{"+m+"+"+n+"-"+p+"}=a^{"+k+"}$")},
  3:function(){var a=pick([2,3,4,5,10]),n=ri(1,3),c=ri(2,9),r=fr(1,Math.pow(a,n)),v=fr(r.n+c*r.d,r.d);
    return Q("គណនា $"+a+"^{-"+n+"}+"+c+"^0\\times"+c+"$",[A(v.s,v.t,"num","=")],"$"+a+"^{-"+n+"}=\\dfrac1{"+Math.pow(a,n)+"}$ · $"+c+"^0=1$ ⇒ $\\dfrac1{"+Math.pow(a,n)+"}+"+c+"="+v.t+"$")}};
/* ===== ៣ ទំហំសមាមាត្រ និងភាគរយ ===== */
G[3]={1:function(){var k=ri(2,12)*500,x1=ri(2,6),x2=ri(3,12);while(x2===x1)x2++;
    return Q("ទិញសៀវភៅ $"+x1+"$ ក្បាល អស់ $"+(k*x1)+"$ រៀល។ បើទិញ $"+x2+"$ ក្បាល តើអស់ប៉ុន្មាន? (សមាមាត្រស្រប)",[A(k*x2,null,"num","=")],"មួយក្បាល $="+k+"$ រៀល ⇒ $"+(k*x2)+"$ រៀល")},
  2:function(){var C=ri(2,40)*1000,p=pick([10,20,25,30,40,50]),loss=Math.random()<.3,S=loss?C*(100-p)/100:C*(100+p)/100;
    return Q("ទិញទំនិញថ្លៃ $"+C+"$ រៀល លក់វិញថ្លៃ $"+S+"$ រៀល។ គណនាភាគរយ"+(loss?"ខាត":"ចំណេញ"),[A(p,null,"num","% =")],"$\\dfrac{"+Math.abs(S-C)+"}{"+C+"}\\times100="+p+"\\%$")},
  3:function(){var n=pick([2,2,3]),C=ri(1,20)*(n===2?100000:1000000),T=n===2?C*121/100:C*1331/1000;
    return Q("ដាក់ប្រាក់ $"+C+"$ រៀល ការប្រាក់សមាស $10\\%$ ក្នុងមួយឆ្នាំ។ ក្រោយ $"+n+"$ ឆ្នាំ តើមានប្រាក់សរុបប៉ុន្មាន?",[A(T,null,"num","សរុប =")],"$"+C+"\\times1.1^"+n+"="+T+"$")}};
/* ===== ៤ រង្វាស់រង្វាល់ ===== */
G[4]={1:function(){var V=ri(2,20),d=pick([2,3,5,8,10]);
    return Q("វត្ថុមួយមានម៉ាស $"+(V*d)+"\\text{ g}$ និងមាឌ $"+V+"\\text{ cm}^3$ ។ គណនាម៉ាសមាឌ ($\\text{g/cm}^3$)",[A(d,null,"num","ρ =")],"$\\rho=\\dfrac{m}{V}=\\dfrac{"+(V*d)+"}{"+V+"}="+d+"$")},
  2:function(){var v=ri(3,12)*10,t=pick([0.5,1.5,2,2.5,3,4]);
    return Q("ឡានធ្វើដំណើរបាន $"+(v*t)+"\\text{ km}$ ក្នុងរយៈពេល $"+t+"$ ម៉ោង។ គណនាល្បឿនមធ្យម ($\\text{km/h}$)",[A(v,null,"num","v =")],"$v=\\dfrac{d}{t}=\\dfrac{"+(v*t)+"}{"+t+"}="+v+"$")},
  3:function(){var k=ri(1,8),kmh=18*k;
    return Q("បំប្លែងល្បឿន $"+kmh+"\\text{ km/h}$ ទៅជា $\\text{m/s}$",[A(5*k,null,"num","m/s =")],"$"+kmh+"\\times\\dfrac{1000}{3600}="+(5*k)+"\\text{ m/s}$")}};
/* ===== ៥ កន្សោមពីជគណិត ===== */
G[5]={1:function(){var a=nz(-7,7),b=nz(-7,7),e=[1,a+b,a*b];
    return Q("ពន្លាត $(x"+sg(a,0)+")(x"+sg(b,0)+")$",[A(poly(e),polyT(e),"expr","=")],"$="+polyT(e)+"$")},
  2:function(){var a=nz(1,4),b=nz(1,9),t=Math.random()<.5,e=t?[a*a,0,-b*b]:[a*a,-2*a*b,b*b];
    return Q("ពន្លាត "+(t?"$("+poly([a,b])+")("+poly([a,-b])+")$":"$("+poly([a,-b])+")^2$"),[A(poly(e),polyT(e),"expr","=")],(t?"$(a+b)(a-b)=a^2-b^2$":"$(a-b)^2=a^2-2ab+b^2$")+" ⇒ $"+polyT(e)+"$")},
  3:function(){var p=ri(1,12),k=nz(1,3);
    return Q("ដាក់ជាផលគុណកត្តា $"+(k*k===1?"":k*k)+"x^2-"+(p*p)+"=("+(k===1?"":k)+"x-m)("+(k===1?"":k)+"x+m)$ ។ រក $m$ ($m>0$)",[A(p,null,"num","m =")],"$a^2-b^2=(a-b)(a+b)$ ⇒ $m="+p+"$")}};
/* ===== ៦ កន្សោមសនិទាន ===== */
G[6]={1:function(){var a=ri(-6,6),b=nz(-6,6),x=ri(-5,5);while(x===b)x++;var v=fr(x+a,x-b);
    return Q("គណនាតម្លៃ $\\dfrac{x"+sg(a,0)+"}{x"+sg(-b,0)+"}$ ពេល $x="+x+"$",[A(v.s,v.t,"num","=")],"$\\dfrac{"+(x+a)+"}{"+(x-b)+"}="+v.t+"$")},
  2:function(){var a=nz(-5,5),c=nz(1,4),b=nz(-9,9),r=fr(-b,c);
    return Q("កន្សោម $\\dfrac{x"+sg(a,0)+"}{"+co(c,"x",true)+sg(b,0)+"}$ គ្មានន័យ ពេល $x=k$ ។ រក $k$",[A(r.s,r.t,"num","k =")],"ភាគបែង $="+"0$ ⇔ $"+c+"x"+sg(b,0)+"=0$ ⇔ $x="+r.t+"$")},
  3:function(){var p=nz(-6,6),q=nz(-6,6);while(q===p)q=nz(-6,6);
    return Q("សម្រួល $\\dfrac{x^2"+co(p+q,"x")+sg(p*q,0)+"}{x"+sg(q,0)+"}$",[A("x"+sg(p,0),null,"expr","=")],"$\\dfrac{(x"+sg(p,0)+")(x"+sg(q,0)+")}{x"+sg(q,0)+"}=x"+sg(p,0)+"$")}};
/* ===== ៧ សមីការដឺក្រេទី១ ===== */
G[7]={1:function(){var a=nz(-7,7),b=ri(-12,12),x=ri(-9,9);
    return Q("ដោះស្រាយ $"+co(a,"x",true)+sg(b,0)+"="+(a*x+b)+"$",[A(x,null,"num","x =")],"$x=\\dfrac{"+(a*x)+"}{"+a+"}="+x+"$")},
  2:function(){var b=ri(2,7),a=ri(-9,9),c=ri(-6,6),x=b*c-a;
    return Q("ដោះស្រាយ $\\dfrac{x"+sg(a,0)+"}{"+b+"}="+c+"$",[A(x,null,"num","x =")],"$x"+sg(a,0)+"="+(b*c)+"$ ⇒ $x="+x+"$")},
  3:function(){var c=ri(6,14),k=ri(2,4),y=ri(3,15),f=k*c;   /* ឪពុក = k × កូន, ក្រោយ y ឆ្នាំ ផលបូក = S */
    var S=c+f+2*y;
    return Q("ឪពុកមានអាយុ $"+k+"$ ដងនៃអាយុកូន។ ក្រោយ $"+y+"$ ឆ្នាំទៀត ផលបូកអាយុអ្នកទាំងពីរស្មើ $"+S+"$ ។ រកអាយុកូនបច្ចុប្បន្ន",[A(c,null,"num","អាយុកូន =")],"$x+"+k+"x+2\\times"+y+"="+S+"$ ⇒ $"+(k+1)+"x="+(S-2*y)+"$ ⇒ $x="+c+"$")}};
/* ===== ៨ វិសមីការដឺក្រេទី១ ===== */
G[8]={1:function(){var a=ri(2,7),b=ri(-9,9),c=ri(-9,9),k=fr(c-b,a);
    return Q("ដោះស្រាយ $"+a+"x"+sg(b,0)+">"+c+"$ ៖ ចម្លើយ $x>k$ ។ រក $k$",[A(k.s,k.t,"num","k =")],"$"+a+"x>"+(c-b)+"$ ⇒ $x>"+k.t+"$")},
  2:function(){var a=-ri(2,7),b=ri(-9,9),c=ri(-9,9),k=fr(c-b,a);
    return Q("ដោះស្រាយ $"+a+"x"+sg(b,0)+"<"+c+"$ ៖ ចម្លើយ $x>k$ ។ រក $k$",[A(k.s,k.t,"num","k =")],"ចែកនឹង $"+a+"<0$ ⇒ ប្ដូរទិសសញ្ញា ⇒ $x>"+k.t+"$")},
  3:function(){var a=ri(2,5),b=ri(-6,6),c=ri(2,5),d=ri(-6,6);
    var L=ri(-4,2),H=L+ri(2,6);   /* L < x ≤ H */
    return Q("រកចំនួនគត់ទាំងអស់ដែលផ្ទៀងផ្ទាត់ $\\begin{cases}x"+sg(-L,0)+">0\\\\x"+sg(-H,0)+"\\le0\\end{cases}$ ។ តើមានប៉ុន្មានចំនួន?",[A(H-L,null,"num","ចំនួន =")],"$"+L+"<x\\le"+H+"$ ⇒ $x\\in\\{"+Array.apply(null,{length:H-L}).map(function(_,i){return L+1+i}).join(",")+"\\}$")}};
/* ===== ៩ ប្លង់កូអរដោនេ និងក្រាប ===== */
G[9]={1:function(){var a=nz(-3,3),b=ri(-4,4),x=ri(-3,3);
    return Q("ចំណុច $M("+x+";y)$ ស្ថិតនៅលើបន្ទាត់ $y="+co(a,"x",true)+sg(b,0)+"$ ។ រក $y$",[A(a*x+b,null,"num","y =")],"$y="+a+"\\times"+sgp(x)+sg(b,0)+"="+(a*x+b)+"$","y="+a+"x"+sg(b,0))},
  2:function(){var P=[nz(-6,6),nz(-6,6)],q=P[0]>0?(P[1]>0?1:4):(P[1]>0?2:3);
    return Q("តើចំណុច $A"+pt(P)+"$ ស្ថិតនៅក្នុងកាដ្រង់ទីប៉ុន្មាន? (ឆ្លើយ $1$, $2$, $3$ ឬ $4$)",[A(q,null,"num","កាដ្រង់ =")],"$x"+(P[0]>0?">":"<")+"0$ , $y"+(P[1]>0?">":"<")+"0$ ⇒ កាដ្រង់ទី $"+q+"$")},
  3:function(){var a=nz(-3,3),x0=ri(-4,4),b=-a*x0;
    return Q("បន្ទាត់ $y="+co(a,"x",true)+(b?sg(b,0):"")+"$ កាត់អ័ក្ស $Ox$ ត្រង់ $x=p$ និងកាត់អ័ក្ស $Oy$ ត្រង់ $y=q$ ។ រក $p$ និង $q$",[A(x0,null,"num","p ="),A(b,null,"num","q =")],"$y=0$ ⇒ $x="+x0+"$ · $x=0$ ⇒ $y="+b+"$")}};
/* ===== ១០ ស្ថិតិ ===== */
function sample(n,lo,hi){var a=[];for(var i=0;i<n;i++)a.push(ri(lo,hi));return a}
G[10]={1:function(){var a=sample(ri(6,8),1,40);
    return Q("រកវិសាលភាព (តម្លៃធំបំផុត − តូចបំផុត) នៃ $"+a.join(",\\ ")+"$",[A(Math.max.apply(null,a)-Math.min.apply(null,a),null,"num","=")],"$"+Math.max.apply(null,a)+"-"+Math.min.apply(null,a)+"="+(Math.max.apply(null,a)-Math.min.apply(null,a))+"$")},
  2:function(){var n=pick([6,7,8,9]),a=sample(n,1,30),s=a.slice().sort(function(x,y){return x-y}),md=n%2?s[(n-1)/2]:fr(s[n/2-1]+s[n/2],2).s;
    return Q("រកមេដ្យាននៃ $"+a.join(",\\ ")+"$",[A(md,null,"num","Me =")],"តម្រៀប៖ $"+s.join(",")+"$ ⇒ $"+md+"$")},
  3:function(){var xs=[1,2,3,4,5],f=xs.map(function(){return ri(1,8)}),S=sum(xs.map(function(x,i){return x*f[i]})),m=fr(S,sum(f));
    return Q("ក្រាបបង្ហាញចំនួនកូនក្នុងគ្រួសារ ($x$) និងចំនួនគ្រួសារ (ប្រេកង់)។ គណនាមធ្យមនព្វន្ត",[A(m.s,m.t,"num","x̄ =")],"$\\bar x=\\dfrac{"+S+"}{"+sum(f)+"}="+m.t+"$","bar "+xs.map(function(x,i){return x+":"+f[i]}).join(" "))}};
/* ===== ១១ ប្រូបាប ===== */
G[11]={1:function(){var C=pick([["មុខទាំងពីរ",1],["ខ្នងទាំងពីរ",1],["មុខមួយ ខ្នងមួយ",2],["យ៉ាងហោចណាស់មុខមួយ",3]]),p=fr(C[1],4);
    return Q("បោះកាក់ពីរដង។ ប្រូបាបដែលចេញ"+C[0]+"?",[A(p.s,p.t,"num","P =")],"លទ្ធផល $\\{MM,MK,KM,KK\\}$ ⇒ $P=\\dfrac{"+C[1]+"}{4}="+p.t+"$")},
  2:function(){var n=pick([10,12,15,20]),C=pick([["ចំនួនគូ",function(i){return i%2===0}],["ចំនួនបឋម",function(i){if(i<2)return false;for(var d=2;d*d<=i;d++)if(i%d===0)return false;return true}],["ពហុគុណនៃ ៣",function(i){return i%3===0}]]),c=0;for(var i=1;i<=n;i++)if(C[1](i))c++;var p=fr(c,n);
    return Q("កាតលេខ $1$ ដល់ $"+n+"$ ។ ចាប់កាតមួយ។ ប្រូបាបដែលបាន"+C[0]+"?",[A(p.s,p.t,"num","P =")],"ករណីស្រប $"+c+"$ ⇒ $P=\\dfrac{"+c+"}{"+n+"}="+p.t+"$")},
  3:function(){var d=pick([5,8,10,20,25]),n=ri(1,d-1),p=fr(n,d),q=fr(d-n,d);
    return Q("ប្រូបាបដែលភ្លៀងថ្ងៃស្អែកស្មើ $"+p.t+"$ ។ តើប្រូបាបដែលមិនភ្លៀងស្មើប៉ុន្មាន?",[A(q.s,q.t,"num","P =")],"$P(\\overline{A})=1-P(A)=1-"+p.t+"="+q.t+"$")}};
/* ===== ១២ ការប្រៀបធៀបត្រីកោណ ===== */
G[12]={1:function(){var s=[ri(3,9),ri(4,10),ri(5,11)];
    return Q("$\\triangle ABC\\cong\\triangle DEF$ ដែល $AB="+s[0]+"$ , $BC="+s[1]+"$ , $CA="+s[2]+"$ ។ គណនា $EF$ និង $FD$",[A(s[1],null,"num","EF ="),A(s[2],null,"num","FD =")],"ជ្រុងត្រូវគ្នានៃត្រីកោណប៉ុនគ្នាស្មើគ្នា៖ $EF=BC$ , $FD=CA$")},
  2:function(){var a=ri(30,80),b=ri(30,90);
    return Q("$\\triangle ABC\\cong\\triangle DEF$ ដែល $\\widehat A="+a+"^\\circ$ , $\\widehat B="+b+"^\\circ$ ។ គណនា $\\widehat F$",[A(180-a-b,null,"num","∠F =")],"$\\widehat F=\\widehat C=180^\\circ-"+a+"^\\circ-"+b+"^\\circ="+(180-a-b)+"^\\circ$")},
  3:function(){var x=ri(2,12),p=ri(2,4),q=ri(1,p-1),c=ri(1,9),d=(p-q)*x+c;   /* MA = px + c' , MB = qx + d */
    return Q("$M$ ស្ថិតលើមេដ្យាទ័រនៃអង្កត់ $[AB]$ ។ $MA="+p+"x+"+c+"$ និង $MB="+q+"x+"+d+"$ ។ រក $x$",[A(x,null,"num","x =")],"ចំណុចលើមេដ្យាទ័រ ⇒ $MA=MB$ ⇒ $"+p+"x+"+c+"="+q+"x+"+d+"$ ⇒ $x="+x+"$")}};
/* ===== ១៣ ចតុកោណ ===== */
G[13]={1:function(){var a=ri(40,140);while(a===90)a=ri(40,140);
    return Q("ប្រលេឡូក្រាម $ABCD$ មាន $\\widehat A="+a+"^\\circ$ ។ គណនា $\\widehat B$ និង $\\widehat C$",[A(180-a,null,"num","∠B ="),A(a,null,"num","∠C =")],"មុំជាប់បន្ថែមគ្នា ⇒ $\\widehat B="+(180-a)+"^\\circ$ · មុំឈមស្មើ ⇒ $\\widehat C="+a+"^\\circ$")},
  2:function(){var T=pick(TR);
    return Q("ចតុកោណកែង $ABCD$ មាន $AB="+T[1]+"$ និង $BC="+T[0]+"$ ។ គណនាអង្កត់ទ្រូង $AC$ និង $OA$ ($O$ ចំណុចប្រសព្វអង្កត់ទ្រូង)",[A(T[2],null,"num","AC ="),A(T[2]/2,null,"num","OA =")],"$AC=\\sqrt{"+(T[1]*T[1])+"+"+(T[0]*T[0])+"}="+T[2]+"$ · អង្កត់ទ្រូងកាត់គ្នាត្រង់ចំណុចកណ្ដាល ⇒ $OA="+(T[2]/2)+"$","nogrid\nnoaxes\nA(0,0)\nB("+T[1]+",0)\nC("+T[1]+","+T[0]+")\nD(0,"+T[0]+")\npoly A B C D\nseg A C red\nseg B D gray")},
  3:function(){var T=pick(TR);
    return Q("ចតុកោណស្មើ $ABCD$ មានអង្កត់ទ្រូង $AC="+(2*T[0])+"$ និង $BD="+(2*T[1])+"$ ។ គណនាប្រវែងជ្រុង និងផ្ទៃក្រឡា",[A(T[2],null,"num","ជ្រុង ="),A(2*T[0]*T[1],null,"num","S =")],"អង្កត់ទ្រូងកែង និងកាត់គ្នាពាក់កណ្ដាល ⇒ ជ្រុង $=\\sqrt{"+(T[0]*T[0])+"+"+(T[1]*T[1])+"}="+T[2]+"$ · $S=\\dfrac{"+(2*T[0])+"\\times"+(2*T[1])+"}{2}="+(2*T[0]*T[1])+"$","nogrid\nnoaxes\nA(-"+T[1]+",0)\nB(0,-"+T[0]+")\nC("+T[1]+",0)\nD(0,"+T[0]+")\npoly A B C D\nseg A C gray\nseg B D gray")}};
/* ===== ១៤ ទ្រឹស្ដីបទពីតាគ័រ ===== */
function rt(T){var s=6/Math.max(T[0],T[1]);return"nogrid\nnoaxes\nC(0,0)\nA("+r2(T[1]*s)+",0)\nB(0,"+r2(T[0]*s)+")\npoly A B C"}
G[14]={1:function(){var T=pick(TR);
    return Q("ត្រីកោណ $ABC$ កែងត្រង់ $C$ មាន $BC="+T[0]+"$ , $AC="+T[1]+"$ ។ គណនា $AB$",[A(T[2],null,"num","AB =")],"$AB^2=BC^2+AC^2="+(T[0]*T[0])+"+"+(T[1]*T[1])+"="+(T[2]*T[2])+"$ ⇒ $AB="+T[2]+"$",rt(T))},
  2:function(){var T=pick(TR);
    return Q("ត្រីកោណ $ABC$ កែងត្រង់ $C$ មានអ៊ីប៉ូតេនុស $AB="+T[2]+"$ និង $BC="+T[0]+"$ ។ គណនា $AC$",[A(T[1],null,"num","AC =")],"$AC=\\sqrt{"+(T[2]*T[2])+"-"+(T[0]*T[0])+"}="+T[1]+"$",rt(T))},
  3:function(){var T=pick(TR);
    return Q("ជណ្ដើរវែង $"+T[2]+"\\text{ m}$ ផ្អែកលើជញ្ជាំង ជើងជណ្ដើរនៅឆ្ងាយពីជញ្ជាំង $"+T[0]+"\\text{ m}$ ។ តើចុងជណ្ដើរនៅកម្ពស់ប៉ុន្មានម៉ែត្រ?",[A(T[1],null,"num","h =")],"$h=\\sqrt{"+(T[2]*T[2])+"-"+(T[0]*T[0])+"}="+T[1]+"\\text{ m}$",rt([T[1],T[0],T[2]]))}};
/* ===== ១៥ ផ្ទៃក្រឡាពហុកោណ ===== */
G[15]={1:function(){var b=ri(3,15),h=ri(2,12);
    return Q("ប្រលេឡូក្រាមមានបាត $"+b+"$ និងកម្ពស់ $"+h+"$ ។ គណនាផ្ទៃក្រឡា",[A(b*h,null,"num","S =")],"$S=b\\times h="+(b*h)+"$")},
  2:function(){var a=ri(5,20),b=ri(2,a-1),h=ri(2,12);
    return Q("ចតុកោណព្នាយមានបាត $"+a+"$ និង $"+b+"$ កម្ពស់ $"+h+"$ ។ គណនាផ្ទៃក្រឡា",[A((a+b)*h/2,null,"num","S =")],"$S=\\dfrac{(a+b)h}{2}="+((a+b)*h/2)+"$")},
  3:function(){var a=ri(6,14),b=ri(5,12),c=ri(2,a-2),d=ri(2,b-2);   /* រាង L = ចតុកោណកែង a×b ដកជ្រុង c×d */
    return Q("រូបរាង L គឺជាចតុកោណកែង $"+a+"\\times"+b+"$ ដែលកាត់ចេញចតុកោណកែង $"+c+"\\times"+d+"$ ត្រង់ជ្រុងមួយ។ គណនាផ្ទៃក្រឡា",[A(a*b-c*d,null,"num","S =")],"$S="+a+"\\times"+b+"-"+c+"\\times"+d+"="+(a*b-c*d)+"$","nogrid\nA(0,0)\nB("+a+",0)\nC("+a+","+(b-d)+")\nD("+(a-c)+","+(b-d)+")\nE("+(a-c)+","+b+")\nF(0,"+b+")\npoly A B C D E F")}};
/* ===== ១៦ រង្វង់ (ចម្លើយទុក π) ===== */
G[16]={1:function(){var d=ri(2,20);
    return Q("គណនាបរិមាត្ររង្វង់អង្កត់ផ្ចិត $"+d+"$ (ទុក $\\pi$ ឧ. $8\\pi$ ឬ $8pi$)",[A(d+"*pi",d+"\\pi","num","C =")],"$C=\\pi d="+d+"\\pi$")},
  2:function(){var R=ri(3,12),r=ri(1,R-1);
    return Q("គណនាផ្ទៃក្រឡាចិញ្ចៀន (រវាងរង្វង់ផ្ចិតរួមកាំ $"+R+"$ និង $"+r+"$) ទុក $\\pi$",[A((R*R-r*r)+"*pi",(R*R-r*r)+"\\pi","num","S =")],"$S=\\pi(R^2-r^2)=\\pi("+(R*R)+"-"+(r*r)+")="+(R*R-r*r)+"\\pi$","nogrid\nnoaxes\ncircle O "+R+"\ncircle O "+r+"\nO(0,0)")},
  3:function(){var th=pick([30,45,60,90,120,135,150]),r=ri(2,12),L=fr(r*th,180);
    return Q("គណនាប្រវែងធ្នូនៃចំណិតរង្វង់កាំ $"+r+"$ មុំផ្ចិត $"+th+"^\\circ$ (ទុក $\\pi$)",[A("("+L.s+")*pi",(L.d===1?(L.n===1?"":L.n):L.t)+"\\pi","num","l =")],"$l=2\\pi r\\times\\dfrac{"+th+"}{360}="+(L.d===1?(L.n===1?"":L.n):L.t)+"\\pi$","nogrid\nnoaxes\ncircle O 3 gray\nO(0,0)\nA(3,0)\nB("+r2(3*Math.cos(th*Math.PI/180))+","+r2(3*Math.sin(th*Math.PI/180))+")\nseg O A\nseg O B\nangle A O B "+th+"°")}};
/* ===== ១៧ បន្ទាត់ពិសេសក្នុងត្រីកោណ ===== */
G[17]={1:function(){var m=ri(2,12)*3;
    return Q("$G$ ជាទីប្រជុំទម្ងន់នៃត្រីកោណ $ABC$ ។ មេដ្យាន $AM="+m+"$ ។ គណនា $AG$ និង $GM$",[A(2*m/3,null,"num","AG ="),A(m/3,null,"num","GM =")],"$AG=\\dfrac23AM="+(2*m/3)+"$ · $GM=\\dfrac13AM="+(m/3)+"$","nogrid\nnoaxes\nA(1,5)\nB(0,0)\nC(6,0)\nM(3,0)\nG(2.33,1.67)\npoly A B C\nseg A M red")},
  2:function(){var h=ri(2,15)*2;
    return Q("ត្រីកោណ $ABC$ កែងត្រង់ $A$ មានអ៊ីប៉ូតេនុស $BC="+h+"$ ។ $M$ ជាចំណុចកណ្ដាលនៃ $[BC]$ ។ គណនា $AM$",[A(h/2,null,"num","AM =")],"មេដ្យានគូសពីកំពូលមុំកែង $=\\dfrac{BC}{2}="+(h/2)+"$")},
  3:function(){var a=ri(10,80)*2;
    return Q("ក្នុងត្រីកោណ $ABC$ ៖ $I$ ជាចំណុចប្រសព្វកន្លះបន្ទាត់ពុះមុំ $B$ និង $C$ ។ $\\widehat A="+a+"^\\circ$ ។ គណនា $\\widehat{BIC}$",[A(90+a/2,null,"num","∠BIC =")],"$\\widehat{BIC}=180^\\circ-\\dfrac{\\widehat B+\\widehat C}{2}=90^\\circ+\\dfrac{\\widehat A}{2}="+(90+a/2)+"^\\circ$")}};
/* ===== ១៨ រូបធរណីមាត្រមានវិមាត្របី ===== */
G[18]={1:function(){var b=ri(2,12),h=ri(2,10),L=ri(3,15);
    return Q("ព្រីសត្រីកោណមួយ មានបាតជាត្រីកោណ (បាត $"+b+"$ កម្ពស់ $"+h+"$) និងប្រវែងព្រីស $"+L+"$ ។ គណនាមាឌ",[A(b*h*L/2,null,"num","V =")],"បាត $S=\\dfrac{bh}{2}$ ⇒ $V=S\\times L=\\dfrac{"+b+"\\times"+h+"}{2}\\times"+L+"="+(b*h*L/2)+"$")},
  2:function(){var a=ri(2,12),h=ri(1,8)*3;
    return Q("ពីរ៉ាមីតបាតការេជ្រុង $"+a+"$ កម្ពស់ $"+h+"$ ។ គណនាមាឌ",[A(a*a*h/3,null,"num","V =")],"$V=\\dfrac13 a^2h=\\dfrac13\\times"+(a*a)+"\\times"+h+"="+(a*a*h/3)+"$")},
  3:function(){var r=ri(1,9),h=ri(1,6)*3;
    return Q("កោនមួយមានកាំបាត $"+r+"$ និងកម្ពស់ $"+h+"$ ។ គណនាមាឌ (ទុក $\\pi$)",[A((r*r*h/3)+"*pi",(r*r*h/3)+"\\pi","num","V =")],"$V=\\dfrac13\\pi r^2h=\\dfrac13\\pi\\times"+(r*r)+"\\times"+h+"="+(r*r*h/3)+"\\pi$")}};
/* ===== ១៩ មាត្រដ្ឋាន ===== */
G[19]={1:function(){var n=pick([10000,25000,50000,100000,200000]),c=ri(2,20),km=c*n/100000;
    return Q("ផែនទីមាត្រដ្ឋាន $1:"+n+"$ ។ ចម្ងាយលើផែនទី $"+c+"\\text{ cm}$ ។ តើចម្ងាយពិតប៉ុន្មានគីឡូម៉ែត្រ?",[A(km,null,"num","km =")],"$"+c+"\\times"+n+"="+(c*n)+"\\text{ cm}="+km+"\\text{ km}$")},
  2:function(){var n=pick([50000,100000,200000,500000]),km=ri(1,20)*n/100000,c=km*100000/n;
    return Q("ផែនទីមាត្រដ្ឋាន $1:"+n+"$ ។ ចម្ងាយពិត $"+km+"\\text{ km}$ ។ តើនៅលើផែនទីប៉ុន្មានសង់ទីម៉ែត្រ?",[A(c,null,"num","cm =")],"$"+km+"\\text{ km}="+(km*100000)+"\\text{ cm}$ ⇒ $\\dfrac{"+(km*100000)+"}{"+n+"}="+c+"\\text{ cm}$")},
  3:function(){var n=pick([500,1000,2000,5000,10000,50000]),c=ri(2,15),m=c*n/100;
    return Q("ចម្ងាយ $"+m+"\\text{ m}$ គូរលើប្លង់ $"+c+"\\text{ cm}$ ។ រកមាត្រដ្ឋាន $1:n$ ។ រក $n$",[A(n,null,"num","n =")],"$"+m+"\\text{ m}="+(m*100)+"\\text{ cm}$ ⇒ $n=\\dfrac{"+(m*100)+"}{"+c+"}="+n+"$")}};

var LES=[
  ["ចំនួន",[[1,"ចំនួនសនិទាន"],[2,"ស្វ័យគុណ"],[3,"ទំហំសមាមាត្រ និងភាគរយ"],[4,"រង្វាស់រង្វាល់"]]],
  ["ពីជគណិត",[[5,"កន្សោមពីជគណិត"],[6,"កន្សោមសនិទាន"],[7,"សមីការដឺក្រេទី១មានមួយអញ្ញាត"],[8,"វិសមីការដឺក្រេទី១មានមួយអញ្ញាត"],[9,"ប្លង់កូអរដោនេ និងក្រាប"]]],
  ["ស្ថិតិ និងប្រូបាប",[[10,"ស្ថិតិ"],[11,"ប្រូបាប"]]],
  ["ធរណីមាត្រ",[[12,"ការប្រៀបធៀបត្រីកោណ"],[13,"ចតុកោណ"],[14,"ទ្រឹស្ដីបទពីតាគ័រ"],[15,"ផ្ទៃក្រឡាពហុកោណ"],[16,"រង្វង់"],[17,"បន្ទាត់ និងអង្កត់ពិសេសក្នុងត្រីកោណ"],[18,"រូបធរណីមាត្រមានវិមាត្របី"],[19,"មាត្រដ្ឋាន"]]]
];
X.reg(8,{les:LES,G:G});
})();
