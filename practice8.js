/* ========================================================================
   🧮 ហ្វឹកហាត់បន្ថែម ថ្នាក់ទី៨ — ១៩ មេរៀន × ៣ កម្រិត + 🌍 PISA (បង្កើតដោយកូដ)
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

/* ===================== 🌍 កម្រិតទី ៤ · PISA ថ្នាក់ទី៨ (បញ្ហាជីវិតពិត) ===================== */
function money(v){return String(v).replace(/\B(?=(\d{3})+(?!\d))/g,"\\,")}
var P4={};
P4[1]=[function(){var d=[nz(-20,20),nz(-20,20),nz(-20,20)].map(function(x){return x*25}),t=sum(d);
    return Q("📈 តម្លៃភាគហ៊ុនមួយ ប្រែប្រួល ៣ ថ្ងៃជាប់គ្នា (រៀល)៖ $"+d.map(sgp).join(",\\ ")+"$ ។ ថ្ងៃដំបូងតម្លៃ $10\\,000$ រៀល។ តើក្រោយ ៣ ថ្ងៃ តម្លៃប៉ុន្មាន?",
      [A(10000+t,null,"num","រៀល =")],"$10000"+d.map(function(x){return sg(x,0)}).join("")+"="+money(10000+t)+"$")},
  function(){var q=pick([[2,3],[3,4],[1,3],[3,8],[5,6]]),n=ri(2,12),r=fr(q[0]*n,q[1]);
    return Q("🍳 រូបមន្តធ្វើម្ហូប៖ ម្នាក់ត្រូវការទឹកដោះគោ $\\dfrac{"+q[0]+"}{"+q[1]+"}$ កែវ។ សម្រាប់ $"+n+"$ នាក់ ត្រូវការប៉ុន្មានកែវ?",
      [A(r.s,r.t,"num","កែវ =")],"$"+n+"\\times\\dfrac{"+q[0]+"}{"+q[1]+"}="+r.t+"$")}];
P4[2]=[function(){var k=ri(5,20);
    return Q("♟️ រឿងព្រេង៖ ដាក់អង្ករលើក្ដារអុក ក្រឡាទី ១ មួយគ្រាប់ ក្រឡាទី ២ ពីរគ្រាប់ ក្រឡាទី ៣ បួនគ្រាប់ … កើនទ្វេដងរាល់ក្រឡា ⇒ ក្រឡាទី $n$ មាន $2^{n-1}$ គ្រាប់។ តើក្រឡាទី $"+k+"$ មានប៉ុន្មានគ្រាប់?",
      [A(Math.pow(2,k-1),null,"num","គ្រាប់ =")],"$2^{"+(k-1)+"}="+money(Math.pow(2,k-1))+"$")},
  function(){var C=pick([[1.5,8,3,5,500,"ផែនដី → ព្រះអាទិត្យ"],[3.84,8,3,5,1280,"ផែនដី → ព្រះចន្ទ"],[2.25,8,3,5,750,"ផែនដី → ភពព្រះអង្គារ (ប្រហែល)"]]);
    return Q("☀️ ចម្ងាយ"+C[5]+" ប្រហែល $"+C[0]+"\\times10^{"+C[1]+"}$ km ។ ពន្លឺធ្វើដំណើរ $"+C[2]+"\\times10^{"+C[3]+"}$ km/s ។ តើពន្លឺត្រូវការប៉ុន្មានវិនាទី?",
      [A(C[4],null,"num","s =")],"$t=\\dfrac{"+C[0]+"\\times10^{"+C[1]+"}}{"+C[2]+"\\times10^{"+C[3]+"}}="+(C[0]/C[2])+"\\times10^{"+(C[1]-C[3])+"}="+C[4]+"$ s")}];
P4[3]=[function(){var k=pick([30,35,40,45,50]),d=k*ri(2,12),L=d/k;
    return Q("🏍️ ម៉ូតូមួយ ធ្វើដំណើរបាន $"+k+"$ km ក្នុងសាំង ១ លីត្រ (សមាមាត្រស្រប)។ ធ្វើដំណើរ $"+d+"$ km ត្រូវការសាំងប៉ុន្មានលីត្រ? ហើយបើសាំង ១ លីត្រ $4\\,500$ រៀល ចំណាយប៉ុន្មាន?",
      [A(L,null,"num","លីត្រ ="),A(L*4500,null,"num","រៀល =")],"$"+d+"\\div"+k+"="+L+"$ លីត្រ · $"+L+"\\times4500="+money(L*4500)+"$")},
  function(){var S=ri(5,20)*100000,p=pick([10,20,25]),q=pick([10,20]),F=S*(100+p)/100*(100-q)/100;
    return Q("💼 ប្រាក់ខែបុគ្គលិកម្នាក់ $"+money(S)+"$ រៀល។ ឆ្នាំនេះកើន $"+p+"\\%$ ប៉ុន្តែឆ្នាំក្រោយថយ $"+q+"\\%$ ។ តើប្រាក់ខែចុងក្រោយប៉ុន្មាន? ហើយខុសពីដើមប៉ុន្មានរៀល (បូក = កើន · ដក = ថយ)?",
      [A(F,null,"num","រៀល ="),A(F-S,null,"num","ខុស =")],"$"+money(S)+"\\times"+(1+p/100)+"\\times"+(1-q/100)+"="+money(F)+"$ ⇒ $"+(F-S>=0?"+":"")+money(F-S)+"$")}];
P4[4]=[function(){var v=pick([4,5,6]),d=pick([1,1.5,2,2.5,3]),t=d/v*60;while(t!==Math.round(t)){d=pick([1,2,3]);v=pick([4,5,6]);t=d/v*60}
    return Q("🚶 ផ្ទះសុភាឆ្ងាយពីសាលា $"+d+"$ km ។ គាត់ដើរល្បឿន $"+v+"$ km/h ។ (ក) ត្រូវការប៉ុន្មាននាទី? (ខ) បើត្រូវដល់សាលាម៉ោង $7:00$ ត្រូវចេញពីផ្ទះយឺតបំផុតម៉ោង $6:m$ ។ រក $m$",
      [A(t,null,"num","(ក) នាទី ="),A(60-t,null,"num","(ខ) m =")],"$t=\\dfrac{"+d+"}{"+v+"}\\text{ h}="+t+"$ នាទី ⇒ ចេញ $6:"+(60-t)+"$")},
  function(){var V=ri(2,10)*5,rho=pick([2.5,3,7.8,11.3,19.3]),m=Math.round(V*rho*10)/10;
    return Q("🪨 សិស្សដាក់ដុំដែកមួយ (ម៉ាស $"+m+"$ g) ចូលកែវរង្វាស់។ ទឹកឡើងពី $50\\text{ cm}^3$ ទៅ $"+(50+V)+"\\text{ cm}^3$ ។ គណនាម៉ាសមាឌរបស់ដុំនោះ ($\\text{g/cm}^3$)",
      [A(Math.round(m/V*1000)/1000,null,"num","ρ =")],"$V="+(50+V)+"-50="+V+"\\text{ cm}^3$ · $\\rho=\\dfrac{"+m+"}{"+V+"}\\approx"+(Math.round(m/V*100)/100)+"$")}];
P4[5]=[function(){var x=ri(4,15),a=ri(1,4);
    return Q("🌱 សួនរាងការេជ្រុង $x$ m ត្រូវបានពង្រីកជ្រុងនីមួយៗ $"+a+"$ m ។ ផ្ទៃក្រឡាកើន $(x+"+a+")^2-x^2="+(2*a)+"x+"+(a*a)+"$ ។ បើ $x="+x+"$ តើផ្ទៃក្រឡាកើនប៉ុន្មាន $\\text{m}^2$?",
      [A(2*a*x+a*a,null,"num","m² =")],"$"+(2*a)+"\\times"+x+"+"+(a*a)+"="+(2*a*x+a*a)+"$","nogrid\nA(0,0)\nB("+(x+a)+",0)\nC("+(x+a)+","+(x+a)+")\nD(0,"+(x+a)+")\npoly A B C D\nE(0,"+x+")\nF("+x+","+x+")\nH("+x+",0)\npoly A H F E red")},
  function(){var a=ri(20,99),b=ri(1,a-5);
    return Q("🧮 សិស្សម្នាក់គណនាលឿន៖ $"+a+"^2-"+b+"^2$ ដោយប្រើ $a^2-b^2=(a-b)(a+b)$ ។ គណនាលទ្ធផល",
      [A(a*a-b*b,null,"num","=")],"$("+a+"-"+b+")("+a+"+"+b+")="+(a-b)+"\\times"+(a+b)+"="+(a*a-b*b)+"$")}];
P4[6]=[function(){var P=pick([[2,3],[3,6],[4,12],[6,12],[3,4],[2,6],[4,6]]),r=fr(P[0]*P[1],P[0]+P[1]);
    return Q("👷 កម្មករ A ធ្វើការងារមួយរួចក្នុង $"+P[0]+"$ ម៉ោង កម្មករ B ក្នុង $"+P[1]+"$ ម៉ោង។ បើធ្វើជាមួយគ្នា រួចក្នុង $t=\\dfrac{1}{\\frac1{"+P[0]+"}+\\frac1{"+P[1]+"}}$ ម៉ោង។ គណនា $t$",
      [A(r.s,r.t,"num","t =")],"$\\frac1{"+P[0]+"}+\\frac1{"+P[1]+"}="+fr(P[0]+P[1],P[0]*P[1]).t+"$ ⇒ $t="+r.t+"$ ម៉ោង")},
  function(){var P=pick([[40,60],[30,60],[60,90],[40,40],[20,30]]),r=fr(2*P[0]*P[1],P[0]+P[1]);
    return Q("🚙 ឡានទៅខេត្តមួយល្បឿន $"+P[0]+"$ km/h ហើយត្រឡប់មកវិញតាមផ្លូវដដែលល្បឿន $"+P[1]+"$ km/h ។ ល្បឿនមធ្យមទៅ-មក $\\bar v=\\dfrac{2v_1v_2}{v_1+v_2}$ ។ គណនា $\\bar v$",
      [A(r.s,r.t,"num","v̄ =")],"$\\dfrac{2\\times"+P[0]+"\\times"+P[1]+"}{"+(P[0]+P[1])+"}="+r.t+"$ km/h (មិនមែន $"+((P[0]+P[1])/2)+"$ ទេ!)")}];
P4[7]=[function(){var n=ri(10,200),S=3*n+3;
    return Q("🏘️ ផ្ទះ ៣ ខ្នងជាប់គ្នាលើផ្លូវ មានលេខផ្ទះតគ្នា ($n$, $n+1$, $n+2$)។ ផលបូកលេខផ្ទះទាំងបី $"+S+"$ ។ តើលេខផ្ទះតូចជាងគេប៉ុន្មាន?",
      [A(n,null,"num","n =")],"$3n+3="+S+"\\Rightarrow n="+n+"$")},
  function(){var w=ri(3,20),a=ri(2,10),P=2*(2*w+a);
    return Q("⚽ ទីលានបាល់រាងចតុកោណកែង បណ្ដោយវែងជាងទទឹង $"+a+"$ m ហើយបរិមាត្រ $"+P+"$ m ។ រកទទឹង និងបណ្ដោយ",
      [A(w,null,"num","ទទឹង ="),A(w+a,null,"num","បណ្ដោយ =")],"$2(x+x+"+a+")="+P+"\\Rightarrow4x="+(P-2*a)+"\\Rightarrow x="+w+"$")}];
P4[8]=[function(){var B=pick([3000,4000,5000]),r=pick([1500,2000,2500]),M=ri(10,40)*1000,n=Math.floor((M-B)/r);
    return Q("🚕 ថ្លៃតាក់ស៊ី៖ ថ្លៃចាប់ផ្ដើម $"+money(B)+"$ រៀល + $"+money(r)+"$ រៀល/km ។ អ្នកមានលុយ $"+money(M)+"$ រៀល។ អាចជិះបានឆ្ងាយបំផុតប៉ុន្មាន km (ចំនួនគត់)?",
      [A(n,null,"num","km =")],"$"+B+"+"+r+"x\\le"+M+"\\Rightarrow x\\le"+fr(M-B,r).t+"$ ⇒ $"+n+"$ km")},
  function(){var a=ri(30,70),b=ri(30,70),need=Math.max(0,150-a-b);while(need>100){a+=10;need=150-a-b}
    return Q("📊 ដើម្បីជាប់ មធ្យមពិន្ទុ ៣ តេស្ត ត្រូវ $\\ge50$ ។ ចាន់ថាបាន $"+a+"$ និង $"+b+"$ ។ តេស្តទី ៣ ត្រូវបានយ៉ាងតិចប៉ុន្មាន?",
      [A(need,null,"num","ពិន្ទុ =")],"$\\dfrac{"+a+"+"+b+"+x}{3}\\ge50\\Rightarrow x\\ge150-"+(a+b)+"="+need+"$")}];
P4[9]=[function(){var a=pick([0,2000,5000]),b=pick([100,150,200]),x=ri(2,12)*10;
    return Q("📞 ថ្លៃទូរស័ព្ទប្រចាំខែ $y="+a+"+"+b+"x$ (រៀល · $x$ = នាទី)។ ក្រាបជាបន្ទាត់។ (ក) ថ្លៃពេលនិយាយ $"+x+"$ នាទី? (ខ) ចំណុចប្រសព្វក្រាបជាមួយអ័ក្ស $Oy$ ($y$ ពេល $x=0$)?",
      [A(a+b*x,null,"num","(ក) រៀល ="),A(a,null,"num","(ខ) y =")],"$y="+a+"+"+b+"\\times"+x+"="+money(a+b*x)+"$ · $x=0\\Rightarrow y="+a+"$")},
  function(){var r=pick([2,3,4,5]),t=ri(3,10),y0=r*t;
    return Q("🧊 ទឹកកកមួយដុំ ក្នុងទូទឹកកក ត្រូវបានយកមកដាក់ខាងក្រៅ។ សីតុណ្ហភាពវា $y=-"+y0+"+"+r+"t$ ($^\\circ$C · $t$ នាទី)។ ក្រោយប៉ុន្មាននាទី ទើបដល់ $0^\\circ$C?",
      [A(t,null,"num","t =")],"$-"+y0+"+"+r+"t=0\\Rightarrow t="+t+"$ នាទី","y=-"+y0+"+"+r+"x [0,"+(t+3)+"]\nP("+t+",0)")}];
P4[10]=[function(){var h=sample(ri(6,8),140,175),mn=Math.min.apply(null,h),mx=Math.max.apply(null,h),m=fr(sum(h),h.length);
    return Q("📏 កម្ពស់សិស្សមួយក្រុម (cm)៖ $"+h.join(",\\ ")+"$ ។ (ក) វិសាលភាព (ខ) កម្ពស់មធ្យម (បង្គត់ ១ ខ្ទង់ក្បៀសបាន)",
      [A(mx-mn,null,"num","(ក) ="),A(m.s,m.t,"num","(ខ) =")],"វិសាលភាព $="+mx+"-"+mn+"="+(mx-mn)+"$ · $\\bar x=\\dfrac{"+sum(h)+"}{"+h.length+"}$")},
  function(){var xs=[2,3,4,5,6],f=xs.map(function(){return ri(1,9)}),mx=Math.max.apply(null,f);while(f.filter(function(v){return v===mx}).length>1){f[f.indexOf(mx)]--;mx=Math.max.apply(null,f)}
    var all=[];xs.forEach(function(x,i){for(var j=0;j<f[i];j++)all.push(x)});var n=all.length,md=n%2?all[(n-1)/2]:fr(all[n/2-1]+all[n/2],2).s;
    return Q("👨‍👩‍👧 ក្រាបបង្ហាញចំនួនសមាជិកគ្រួសារ ($x$) របស់សិស្សក្នុងថ្នាក់។ (ក) ម៉ូដ (ខ) មេដ្យាន",
      [A(xs[f.indexOf(mx)],null,"num","(ក) Mo ="),A(md,null,"num","(ខ) Me =")],"ម៉ូដ = $"+xs[f.indexOf(mx)]+"$ · តម្រៀប $"+n+"$ តម្លៃ ⇒ មេដ្យាន $"+md+"$","bar "+xs.map(function(x,i){return x+":"+f[i]}).join(" "))}];
P4[11]=[function(){var r=ri(3,10),g=ri(3,10),y=ri(3,10),T=r+g+y,p=fr(T-r,T);
    return Q("🍬 ថង់ស្ករគ្រាប់មាន ពណ៌ក្រហម $"+r+"$ បៃតង $"+g+"$ លឿង $"+y+"$ ។ ក្មេងម្នាក់ចាប់មួយគ្រាប់ដោយបិទភ្នែក។ ប្រូបាបដែល<b>មិន</b>បានពណ៌ក្រហម?",
      [A(p.s,p.t,"num","P =")],"$1-\\dfrac{"+r+"}{"+T+"}="+p.t+"$")},
  function(){var n=pick([20,40,60,100]);
    return Q("🪙 ល្បែងមួយ៖ បោះកាក់ពីរ បើចេញ «មុខ» ទាំងពីរ ទើបឈ្នះ។ (ក) ប្រូបាបឈ្នះក្នុងមួយលើក? (ខ) បើលេង $"+n+"$ លើក រំពឹងថាឈ្នះប្រហែលប៉ុន្មានលើក?",
      [A("1/4","\\frac14","num","(ក) P ="),A(n/4,null,"num","(ខ) លើក =")],"$\\{MM,MK,KM,KK\\}\\Rightarrow P=\\frac14$ · $"+n+"\\times\\frac14="+(n/4)+"$")}];
P4[12]=[function(){var s=[ri(3,9),ri(4,10),ri(5,11)];
    return Q("🌉 ស្ពានដែកមានត្រីកោណពីរប៉ុនគ្នា $\\triangle ABC\\cong\\triangle DEF$ ។ វិស្វករវាស់បាន $AB="+s[0]+"$ m , $BC="+s[1]+"$ m , $CA="+s[2]+"$ m ។ តើត្រូវកាត់ដែកសរុបប៉ុន្មានម៉ែត្រ សម្រាប់ត្រីកោណ $DEF$?",
      [A(sum(s),null,"num","m =")],"ប៉ុនគ្នា ⇒ $DE+EF+FD=AB+BC+CA="+sum(s)+"$ m")},
  function(){var T=pick([[3,4,5],[6,8,10],[5,12,13]]),k=pick([10,20,50]);
    return Q("💧 ភូមិពីរ $A$ និង $B$ ស្ថិតឃ្លាតគ្នា $"+(2*T[0]*k)+"$ m ។ គេចង់ជីកអណ្ដូង $M$ ដែលឆ្ងាយពីភូមិទាំងពីរស្មើគ្នា ហើយឆ្ងាយពីផ្លូវ $[AB]$ $"+(T[1]*k)+"$ m (នៅលើមេដ្យាទ័រនៃ $[AB]$)។ តើ $MA$ ប៉ុន្មាន m?",
      [A(T[2]*k,null,"num","MA =")],"$H$ កណ្ដាល $[AB]$ ⇒ $AH="+(T[0]*k)+"$ · $MA=\\sqrt{"+(T[0]*k)+"^2+"+(T[1]*k)+"^2}="+(T[2]*k)+"$","nogrid\nnoaxes\nA(-3,0)\nB(3,0)\nH(0,0)\nM(0,"+r2(3*T[1]/T[0])+")\nseg A B\nseg M A red\nseg M B red\nseg M H gray")}];
P4[13]=[function(){var a=ri(50,130);while(a===90)a=ri(50,130);
    return Q("🏞️ ដីមួយកន្លែងរាងប្រលេឡូក្រាម $ABCD$ ។ មុំ $\\widehat A="+a+"^\\circ$ ។ ម្ចាស់ដីចង់ដឹងមុំ $\\widehat B$ , $\\widehat C$ , $\\widehat D$ ដើម្បីធ្វើរបង",
      [A(180-a,null,"num","∠B ="),A(a,null,"num","∠C ="),A(180-a,null,"num","∠D =")],"មុំជាប់បន្ថែមគ្នា · មុំឈមស្មើគ្នា")},
  function(){var T=pick(TR),k=pick([2,4,5]);
    return Q("📺 អេក្រង់ទូរទស្សន៍រាងចតុកោណកែង ទទឹង $"+(T[1]*k)+"$ cm កម្ពស់ $"+(T[0]*k)+"$ cm ។ ទំហំទូរទស្សន៍ = ប្រវែងអង្កត់ទ្រូង។ គណនា (cm)",
      [A(T[2]*k,null,"num","cm =")],"$\\sqrt{"+(T[1]*k)+"^2+"+(T[0]*k)+"^2}="+(T[2]*k)+"$ cm")}];
P4[14]=[function(){var T=pick(TR),k=pick([10,20,30]);
    return Q("🏞️ សួនច្បាររាងចតុកោណកែង $"+(T[1]*k)+"\\times"+(T[0]*k)+"$ m ។ ជំនួសឱ្យដើរតាមគែមសួន (ពីជ្រុងមួយទៅជ្រុងទល់មុខ) សិស្សដើរកាត់តាមអង្កត់ទ្រូង។ តើដើរខ្លីជាងប៉ុន្មានម៉ែត្រ?",
      [A((T[0]+T[1]-T[2])*k,null,"num","m =")],"គែម $="+((T[0]+T[1])*k)+"$ · អង្កត់ទ្រូង $="+(T[2]*k)+"$ ⇒ ខ្លីជាង $"+((T[0]+T[1]-T[2])*k)+"$ m",rt(T))},
  function(){var T=pick(TR);
    return Q("🪜 អ្នកពន្លត់អគ្គិភ័យ ត្រូវឈានដល់បង្អួចកម្ពស់ $"+T[1]+"$ m ។ ជើងជណ្ដើរ ត្រូវដាក់ឆ្ងាយពីជញ្ជាំង $"+T[0]+"$ m ។ ជណ្ដើរត្រូវវែងយ៉ាងតិចប៉ុន្មានម៉ែត្រ?",
      [A(T[2],null,"num","m =")],"$\\sqrt{"+T[0]+"^2+"+T[1]+"^2}="+T[2]+"$ m",rt([T[1],T[0],T[2]]))}];
P4[15]=[function(){var a=ri(10,30),b=ri(5,a-2),h=ri(5,20),p=ri(2,10)*10000,S=(a+b)*h/2;
    return Q("🏡 ដីមួយកន្លែងរាងចតុកោណព្នាយ មានបាតពីរ $"+a+"$ m និង $"+b+"$ m កម្ពស់ $"+h+"$ m ។ តម្លៃដី $"+money(p)+"$ រៀល/$\\text{m}^2$ ។ (ក) ផ្ទៃក្រឡា? (ខ) តម្លៃដីសរុប?",
      [A(S,null,"num","(ក) m² ="),A(S*p,null,"num","(ខ) រៀល =")],"$\\dfrac{("+a+"+"+b+")\\times"+h+"}{2}="+S+"$ · $"+S+"\\times"+money(p)+"="+money(S*p)+"$")},
  function(){var d1=ri(3,10)*10,d2=ri(3,10)*10;
    return Q("🪁 ក្រដាសហោះរាងចតុកោណស្មើ មានអង្កត់ទ្រូង $"+d1+"$ cm និង $"+d2+"$ cm ។ ត្រូវការក្រដាសប៉ុន្មាន $\\text{cm}^2$?",
      [A(d1*d2/2,null,"num","cm² =")],"$S=\\dfrac{d_1d_2}{2}=\\dfrac{"+d1+"\\times"+d2+"}{2}="+(d1*d2/2)+"$")}];
P4[16]=[function(){var L=pick([80,90,100]),d=pick([50,60,64,70]),P=Math.round((2*L+3.14*d)*100)/100;
    return Q("🏃 ទីលានរត់មាន ផ្លូវត្រង់ពីរ វែង $"+L+"$ m និងកន្លះរង្វង់ពីរនៅចុង (អង្កត់ផ្ចិត $"+d+"$ m)។ តើរត់មួយជុំ ប៉ុន្មានម៉ែត្រ? ($\\pi=3.14$)",
      [A(P,null,"num","m =")],"$2\\times"+L+"+\\pi\\times"+d+"="+(2*L)+"+"+(Math.round(314*d)/100)+"="+P+"$ m")},
  function(){var P=pick([[20,30],[20,40],[30,45],[24,36]]),r=fr(P[1]*P[1],P[0]*P[0]);
    return Q("🍕 ហាងភីហ្សាលក់ទំហំ $"+P[0]+"$ cm និង $"+P[1]+"$ cm (អង្កត់ផ្ចិត)។ តើភីហ្សាធំ មានផ្ទៃក្រឡាប៉ុន្មានដងនៃភីហ្សាតូច?",
      [A(r.s,r.t,"num","ដង =")],"$\\dfrac{\\pi("+(P[1]/2)+")^2}{\\pi("+(P[0]/2)+")^2}="+r.t+"$")}];
P4[17]=[function(){var m=ri(2,12)*3;
    return Q("📐 សិស្សកាត់ក្រដាសកាតុងរាងត្រីកោណ ហើយចង់ទ្រវាឱ្យលំនឹងនៅលើចុងខ្មៅដៃ ត្រង់ទីប្រជុំទម្ងន់ $G$ ។ មេដ្យាន $AM="+m+"$ cm ។ តើ $G$ ឆ្ងាយពីកំពូល $A$ ប៉ុន្មាន cm?",
      [A(2*m/3,null,"num","AG =")],"$AG=\\dfrac23AM="+(2*m/3)+"$ cm","nogrid\nnoaxes\nA(1,5)\nB(0,0)\nC(6,0)\nM(3,0)\nG(2.33,1.67)\npoly A B C\nseg A M red")},
  function(){var T=pick(TR),k=pick([2,4,10]);
    return Q("⛲ សួនរាងត្រីកោណកែង មានជ្រុងជាប់មុំកែង $"+(T[0]*k)+"$ m និង $"+(T[1]*k)+"$ m ។ គេចង់ដាក់ទឹកផុស ដែលឆ្ងាយពីជ្រុងទាំងបីស្មើគ្នា (កណ្ដាលអ៊ីប៉ូតេនុស)។ តើវាឆ្ងាយពីជ្រុងនីមួយៗប៉ុន្មាន m?",
      [A(T[2]*k/2,null,"num","m =")],"អ៊ីប៉ូតេនុស $="+(T[2]*k)+"$ ⇒ មេដ្យានពីកំពូលកែង $=\\dfrac{"+(T[2]*k)+"}{2}="+(T[2]*k/2)+"$ m")}];
P4[18]=[function(){var b=ri(2,4)*1,h=ri(1,3),L=ri(2,5);
    return Q("⛺ តង់បោះជំរុំរាងព្រីសត្រីកោណ៖ មុខតង់ជាត្រីកោណ បាត $"+b+"$ m កម្ពស់ $"+h+"$ m ហើយតង់វែង $"+L+"$ m ។ តើខ្យល់ក្នុងតង់មានមាឌប៉ុន្មាន $\\text{m}^3$?",
      [A(b*h*L/2,null,"num","m³ =")],"$V=\\dfrac{"+b+"\\times"+h+"}{2}\\times"+L+"="+(b*h*L/2)+"$")},
  function(){var r=pick([2,3,4]),h=ri(3,4)*3;
    return Q("🍦 កោនការ៉េមមួយ កាំមាត់ $"+r+"$ cm និងជម្រៅ $"+h+"$ cm ។ តើការ៉េមពេញកោន (មិនគិតផ្នែកលើស) មានមាឌប៉ុន្មាន $\\text{cm}^3$? (ទុក $\\pi$)",
      [A((r*r*h/3)+"*pi",(r*r*h/3)+"\\pi","num","V =")],"$V=\\frac13\\pi r^2h=\\frac13\\pi\\times"+(r*r)+"\\times"+h+"="+(r*r*h/3)+"\\pi$")}];
P4[19]=[function(){var n=pick([25000,50000,100000]),c=ri(2,20);
    return Q("🗺️ ផែនទីខេត្តមួយ មាត្រដ្ឋាន $1:"+money(n)+"$ ។ ពីសាលាទៅវត្ត លើផែនទី $"+c+"$ cm ។ តើចម្ងាយពិតប៉ុន្មាន km?",
      [A(c*n/100000,null,"num","km =")],"$"+c+"\\times"+n+"="+money(c*n)+"$ cm $="+(c*n/100000)+"$ km")},
  function(){var a=ri(3,6),b=ri(2,5);
    return Q("📐 ប្លង់ផ្ទះ មាត្រដ្ឋាន $1:100$ ។ បន្ទប់គេងលើប្លង់ $"+a+"\\times"+b+"$ cm ។ (ក) ទំហំពិត (បណ្ដោយ គិតជា m)? (ខ) ផ្ទៃក្រឡាពិតប៉ុន្មាន $\\text{m}^2$?",
      [A(a,null,"num","(ក) បណ្ដោយ m ="),A(a*b,null,"num","(ខ) m² =")],"$1$ cm លើប្លង់ $=100$ cm $=1$ m ⇒ $"+a+"\\times"+b+"$ m · $S="+(a*b)+"\\text{ m}^2$")}];
Object.keys(P4).forEach(function(l){var L=P4[l];G[l][4]=function(){return pick(L)()}});


/* ===== ពិពិធកម្មទម្រង់លំហាត់ (២០២៦-១១) — មេរៀន×កម្រិតនីមួយៗ ≥ ៤ ទម្រង់ · គណនាផ្ទាល់ · រកអញ្ញាត · បញ្ហាជីវិតពិត · ត្រិះរិះ =====
   ជ្រើសចម្លើយមុន រួចបង្កើតទិន្នន័យ · kd = s8_… · vx(l,lv,[…]) → ទម្រង់ថ្មីនីមួយៗមានឱកាសស្មើទម្រង់ដើម */
function K(kd,q,a,s,f){var o=Q(q,a,s,f);o.kd=kd;return o}
function vx(l,lv,L){var o=G[l][lv];G[l][lv]=function(){var i=Math.floor(Math.random()*(L.length+1));return i<L.length?L[i]():o()}}
function ang(v){return v+"^\\circ"}
function mo(v){return String(v).replace(/\B(?=(\d{3})+(?!\d))/g,"\\,")}
function lcm(a,b){return a/gcd(a,b)*b}
function fsum(n,N){var f;do{f=[];var r=N;for(var i=0;i<n-1;i++){var v=ri(1,Math.max(1,Math.floor(r/(n-i))*2-1));f.push(v);r-=v}f.push(r)}while(f.some(function(v){return v<1}));return f}
function fx(f){return f.d===1?String(f.n):(f.n<0?"-":"")+"\\dfrac{"+Math.abs(f.n)+"}{"+f.d+"}"}   /* ប្រភាគ → TeX (ក្នុងសំណួរ) */
function pr(n,d){var f=fr(n,d);return f.n<0?"\\left("+fx(f)+"\\right)":fx(f)}
function tb2(xs,fs){return"\\begin{array}{|c|"+xs.map(function(){return"c|"}).join("")+"}\\hline x&"+xs.join("&")+"\\\\\\hline f&"+fs.join("&")+"\\\\\\hline\\end{array}"}
/* ១ ចំនួនសនិទាន */
vx(1,1,[
 function(){var a=nz(-9,9),b=ri(2,9),c=nz(-9,9),d=ri(2,9),r=fr(a*c,b*d);return K("s8_mul1","គណនា $"+pr(a,b)+"\\times"+pr(c,d)+"$",[A(r.s,r.t,"num","=")],"គុណភាគយក និងភាគបែង ⇒ $"+r.t+"$")},
 function(){var a=nz(-9,9),b=ri(2,9);while(gcd(a,b)!==1)b++;var o=fr(-a,b),iv=fr(b,a);return K("s8_opp","រកចំនួនផ្ទុយ និងចំនួនច្រាសនៃ $"+fx(fr(a,b))+"$",[A(o.s,o.t,"num","ផ្ទុយ ="),A(iv.s,iv.t,"num","ច្រាស =")],"ផ្ទុយ $="+o.t+"$ (ផលបូក $0$) · ច្រាស $="+iv.t+"$ (ផលគុណ $1$)")},
 function(){var L=[],v={};while(L.length<3){var f=fr(nz(-9,9),ri(2,9));if(!v[f.s]){v[f.s]=1;L.push(f)}}var m=L.slice().sort(function(x,y){return y.n/y.d-x.n/x.d})[0];return K("s8_ord","រកចំនួនធំបំផុតក្នុងចំណោម $"+L.map(fx).join(",\\ ")+"$",[A(m.s,m.t,"num","=")],"ប្រៀបធៀបតម្លៃ ⇒ $"+m.t+"$")}]);
vx(1,2,[
 function(){var b=pick([2,4,5,8,10,20,25]),a=nz(-30,30);while(gcd(a,b)!==1)a++;return K("s8_dec","សរសេរ $"+fx(fr(a,b))+"$ ជាចំនួនទសភាគ",[A(String(a/b),null,"num","=")],"$"+a+"\\div"+b+"="+(a/b)+"$")},
 function(){var a=nz(-6,6),b=ri(2,6),c=nz(-6,6),d=ri(2,6),e=nz(-4,4),r=fr((a*d+c*b)*e,b*d);return K("s8_mix","គណនា $\\left("+fx(fr(a,b))+(c<0?"-":"+")+fx(fr(Math.abs(c),d))+"\\right)\\times"+sgp(e)+"$",[A(r.s,r.t,"num","=")],"$"+fx(fr(a*d+c*b,b*d))+"\\times"+sgp(e)+"="+r.t+"$")},
 function(){var a=nz(-9,9),b=ri(2,9),c=nz(-9,9),d=ri(2,9);while(a*d===c*b)c++;var m=fr(a*d+c*b,2*b*d);return K("s8_avg1","រកចំនួនសនិទាន ដែលនៅចំកណ្ដាល $"+fx(fr(a,b))+"$ និង $"+fx(fr(c,d))+"$",[A(m.s,m.t,"num","=")],"មធ្យម ៖ $\\dfrac12\\left("+fx(fr(a,b))+"+"+pr(c,d)+"\\right)="+m.t+"$")}]);
vx(1,3,[
 function(){var a=nz(-6,6),b=ri(2,6),c=ri(1,6),d=ri(2,6),e=ri(1,6),f=ri(2,6);while(c*f===e*d)e++;var q=fr(c*f-e*d,d*f),r=fr(a*q.d,b*q.n);return K("s8_nest","គណនា $"+pr(a,b)+"\\div\\left("+fx(fr(c,d))+"-"+fx(fr(e,f))+"\\right)$",[A(r.s,r.t,"num","=")],"វង់ក្រចក ៖ $"+q.t+"$ ⇒ $"+fx(fr(a,b))+"\\div"+pr(q.n,q.d)+"="+r.t+"$")},
 function(){var p=ri(2,6),q=ri(2,6),r=fr((p-1)*(q-1),p*q);return K("s8_wd","ធុងទឹកពេញ ។ ថ្ងៃទី១ ប្រើអស់ $\\dfrac1{"+p+"}$ នៃធុង ។ ថ្ងៃទី២ ប្រើអស់ $\\dfrac1{"+q+"}$ នៃទឹកដែលនៅសល់ ។ តើទឹកនៅសល់ប៉ុន្មានភាគនៃធុង?",[A(r.s,r.t,"num","=")],"សល់ក្រោយថ្ងៃទី១ $\\dfrac{"+(p-1)+"}{"+p+"}$ ⇒ $\\dfrac{"+(p-1)+"}{"+p+"}\\times\\dfrac{"+(q-1)+"}{"+q+"}="+r.t+"$")},
 function(){var a=nz(-6,6),b=ri(2,6),c=nz(-6,6),d=ri(2,6),e=nz(-6,6),f=ri(2,6),r=fr(a*c*f,b*d*e);return K("s8_cmp","គណនា $"+pr(a,b)+"\\times"+pr(c,d)+"\\div"+pr(e,f)+"$",[A(r.s,r.t,"num","=")],"$"+fx(fr(a,b))+"\\times"+pr(c,d)+"\\times"+pr(f,e)+"="+r.t+"$")}]);
/* ២ ស្វ័យគុណ */
vx(2,1,[
 function(){var m=ri(2,9),n=ri(2,9);return K("s8_mulp","សរសេរ $a^{"+m+"}\\times a^{"+n+"}$ ជាទម្រង់ $a^k$ ។ រក $k$",[A(m+n,null,"num","k =")],"$a^m\\times a^n=a^{m+n}=a^{"+(m+n)+"}$")},
 function(){var m=ri(2,6),n=ri(2,5);return K("s8_pp","សរសេរ $(a^{"+m+"})^{"+n+"}$ ជាទម្រង់ $a^k$ ។ រក $k$",[A(m*n,null,"num","k =")],"$(a^m)^n=a^{mn}=a^{"+(m*n)+"}$")},
 function(){var a=ri(2,9);return K("s8_neg","គណនា $-"+a+"^2$ និង $(-"+a+")^2$",[A(-a*a,null,"num","−a² ="),A(a*a,null,"num","(−a)² =")],"$-"+a+"^2=-("+a+"^2)="+(-a*a)+"$ · $(-"+a+")^2=(-"+a+")(-"+a+")="+(a*a)+"$")}]);
vx(2,2,[
 function(){var d=ri(11,99);while(d%10===0)d++;var n=ri(3,8),N=d*Math.pow(10,n-1);return K("s8_sci","សរសេរ $"+mo(N)+"$ ជាទម្រង់វិទ្យាសាស្ត្រ $a\\times10^n$ ($1\\le a<10$) ។ រក $a$ និង $n$",[A(d/10,null,"num","a ="),A(n,null,"num","n =")],"$"+mo(N)+"="+(d/10)+"\\times10^{"+n+"}$")},
 function(){var m=ri(2,9),n=ri(2,12);while(n===m)n++;return K("s8_div","សរសេរ $\\dfrac{a^{"+m+"}}{a^{"+n+"}}$ ($a\\ne0$) ជាទម្រង់ $a^k$ ។ រក $k$",[A(m-n,null,"num","k =")],"$a^{"+m+"-"+n+"}=a^{"+(m-n)+"}$")},
 function(){var a=ri(2,8),b=ri(1,6),c=ri(1,a+b-1),k=a+b-c;return K("s8_pw0","គណនា $\\dfrac{2^{"+a+"}\\times2^{"+b+"}}{2^{"+c+"}}$",[A(Math.pow(2,k),null,"num","=")],"$2^{"+a+"+"+b+"-"+c+"}=2^{"+k+"}="+Math.pow(2,k)+"$")}]);
vx(2,3,[
 function(){var a=ri(1,3),b=ri(1,3),m=ri(2,6),n=ri(2,6);return K("s8_scim","គណនា $("+a+"\\times10^{"+m+"})\\times("+b+"\\times10^{"+n+"})$ ជាទម្រង់វិទ្យាសាស្ត្រ $c\\times10^k$ ។ រក $c$ និង $k$",[A(a*b,null,"num","c ="),A(m+n,null,"num","k =")],"$("+a+"\\times"+b+")\\times10^{"+m+"+"+n+"}="+(a*b)+"\\times10^{"+(m+n)+"}$")},
 function(){var b=pick([2,3,5]),n=b===2?ri(3,10):ri(2,5),N=Math.pow(b,n);return K("s8_eq","រក $n$ ដែល $"+b+"^n="+N+"$",[A(n,null,"num","n =")],"$"+N+"="+b+"^{"+n+"}$ ⇒ $n="+n+"$")},
 function(){var a=nz(-5,5),b=ri(2,6);while(gcd(a,b)!==1||Math.abs(a)===b)b++;var r=fr(b*b,a*a);return K("s8_negx","គណនា $\\left("+fx(fr(a,b))+"\\right)^{-2}$",[A(r.s,r.t,"num","=")],"$\\left(\\dfrac ab\\right)^{-2}=\\left(\\dfrac ba\\right)^2$ ⇒ $"+r.t+"$")}]);
/* ៣ ទំហំសមាមាត្រ និងភាគរយ */
vx(3,1,[
 function(){var m=pick([2,3,4,6]),d=pick([6,8,12]),W=m*d,L=[2,3,4,6,8,12].filter(function(x){return x!==m&&W%x===0}),m2=pick(L);return K("s8_inv","កម្មករ $"+m+"$ នាក់ សង់ផ្ទះចប់ក្នុង $"+d+"$ ថ្ងៃ ។ កម្មករ $"+m2+"$ នាក់ សង់ចប់ក្នុងប៉ុន្មានថ្ងៃ? (សមាមាត្រច្រាស)",[A(W/m2,null,"num","ថ្ងៃ =")],"$"+m+"\\times"+d+"="+m2+"\\times x$ ⇒ $x="+(W/m2)+"$")},
 function(){var p=pick([5,10,15,20,25,40,60]),N=20*ri(1,30);return K("s8_pct3","គណនា $"+p+"\\%$ នៃ $"+N+"$",[A(N*p/100,null,"num","=")],"$"+N+"\\times\\dfrac{"+p+"}{100}="+(N*p/100)+"$")},
 function(){var P=ri(2,40)*1000,p=pick([10,20,25,30,50]);return K("s8_dis","អាវតម្លៃ $"+mo(P)+"$ រៀល បញ្ចុះតម្លៃ $"+p+"\\%$ ។ តម្លៃថ្មីប៉ុន្មានរៀល?",[A(P*(100-p)/100,null,"num","រៀល =")],"$"+mo(P)+"\\times\\dfrac{"+(100-p)+"}{100}="+mo(P*(100-p)/100)+"$")}]);
vx(3,2,[
 function(){var P=ri(2,40)*1000,p=pick([10,20,25,40,50]),F=P*(100-p)/100;return K("s8_orig","ក្រោយបញ្ចុះ $"+p+"\\%$ កង់មួយតម្លៃ $"+mo(F)+"$ រៀល ។ តម្លៃដើមប៉ុន្មានរៀល?",[A(P,null,"num","រៀល =")],"$\\dfrac{"+mo(F)+"\\times100}{"+(100-p)+"}="+mo(P)+"$")},
 function(){var a=ri(1,5),b=ri(1,5);while(b===a)b++;var k=ri(2,20)*1000;return K("s8_ratio","ចែកប្រាក់ចំណេញ $"+mo((a+b)*k)+"$ រៀល រវាងអ្នករួមហ៊ុនពីរនាក់ តាមផលធៀប $"+a+":"+b+"$ ។ ម្នាក់ៗបានប៉ុន្មាន?",[A(a*k,null,"num","ទី១ ="),A(b*k,null,"num","ទី២ =")],"មួយចំណែក $="+mo(k)+"$")},
 function(){var v1=pick([30,40,60]),t1=pick([2,3,4]),D=v1*t1,L=[20,24,30,40,45,48,60,80,90,120].filter(function(v){return v!==v1&&D%v===0}),v2=pick(L);return K("s8_speed","ធ្វើដំណើរល្បឿន $"+v1+"$ km/h ចំណាយ $"+t1+"$ ម៉ោង ។ បើល្បឿន $"+v2+"$ km/h តើចំណាយប៉ុន្មានម៉ោង?",[A(D/v2,null,"num","ម៉ោង =")],"ល្បឿន × ពេល ថេរ $="+D+"$ ⇒ $\\dfrac{"+D+"}{"+v2+"}="+(D/v2)+"$")}]);
vx(3,3,[
 function(){var P=ri(2,30)*10000,p=pick([10,20,30,50]),q=pick([10,20,25,50]),F=P/10000*(100+p)*(100-q);return K("s8_succ","ទំនិញតម្លៃ $"+mo(P)+"$ រៀល ឡើងថ្លៃ $"+p+"\\%$ រួចបញ្ចុះ $"+q+"\\%$ ។ តម្លៃចុងក្រោយប៉ុន្មានរៀល?",[A(F,null,"num","រៀល =")],"$"+mo(P)+"\\times\\dfrac{"+(100+p)+"}{100}\\times\\dfrac{"+(100-q)+"}{100}="+mo(F)+"$")},
 function(){var P=ri(1,20)*100000,r=pick([4,5,6,8,10]),n=ri(2,5),T=P+P*r*n/100;return K("s8_si","ដាក់ប្រាក់ $"+mo(P)+"$ រៀល ការប្រាក់សាមញ្ញ $"+r+"\\%$/ឆ្នាំ ។ ក្រោយ $"+n+"$ ឆ្នាំ មានប្រាក់សរុបប៉ុន្មាន?",[A(T,null,"num","រៀល =")],"ការប្រាក់ $="+mo(P*r*n/100)+"$ ⇒ $"+mo(T)+"$")},
 function(){var P=ri(1,40)*1000,T=P*11/10;return K("s8_vat","តម្លៃទំនិញ (រួមអាករ $10\\%$) គឺ $"+mo(T)+"$ រៀល ។ តើតម្លៃមុនអាករប៉ុន្មានរៀល?",[A(P,null,"num","រៀល =")],"$1.1P="+mo(T)+"$ ⇒ $P="+mo(P)+"$")}]);
/* ៤ រង្វាស់រង្វាល់ */
vx(4,1,[
 function(){var V=ri(2,30),d=pick([2,3,5,8,10]);return K("s8_mass","វត្ថុមួយមានមាឌ $"+V+"\\text{ cm}^3$ និងម៉ាសមាឌ $"+d+"\\text{ g/cm}^3$ ។ គណនាម៉ាស (g)",[A(V*d,null,"num","m =")],"$m=\\rho V="+d+"\\times"+V+"="+(V*d)+"$ g")},
 function(){var v=pick([20,30,40,50,60]),t=ri(1,6);return K("s8_time","ឡានបើកល្បឿន $"+v+"$ km/h ធ្វើដំណើរ $"+(v*t)+"$ km ។ ចំណាយប៉ុន្មានម៉ោង?",[A(t,null,"num","ម៉ោង =")],"$t=\\dfrac dv=\\dfrac{"+(v*t)+"}{"+v+"}="+t+"$")},
 function(){var h=ri(2,25);return K("s8_ha","ដីស្រែមួយមានផ្ទៃ $"+h+"$ ហិកតា ។ តើស្មើប៉ុន្មាន $\\text{m}^2$?",[A(h*10000,null,"num","m² =")],"$1\\text{ ha}=10\\,000\\text{ m}^2$ ⇒ $"+mo(h*10000)+"$")}]);
vx(4,2,[
 function(){var V=ri(2,30),d=pick([2,4,5,8]);return K("s8_vol4","ដុំលោហៈមួយមានម៉ាស $"+(V*d)+"$ g និងម៉ាសមាឌ $"+d+"\\text{ g/cm}^3$ ។ គណនាមាឌ",[A(V,null,"num","V =")],"$V=\\dfrac m\\rho=\\dfrac{"+(V*d)+"}{"+d+"}="+V+"\\text{ cm}^3$")},
 function(){var k=ri(1,8);return K("s8_ms","បំប្លែងល្បឿន $"+(5*k)+"\\text{ m/s}$ ទៅជា $\\text{km/h}$",[A(18*k,null,"num","km/h =")],"$"+(5*k)+"\\times3.6="+(18*k)+"$ km/h")},
 function(){var l=ri(1,20);return K("s8_lit","ធុងមួយមានមាឌ $"+(l*1000)+"\\text{ cm}^3$ ។ តើវាផ្ទុកបានប៉ុន្មានលីត្រ?",[A(l,null,"num","l =")],"$1\\text{ l}=1000\\text{ cm}^3$ ⇒ $"+l+"$ l")}]);
vx(4,3,[
 function(){var t1=ri(1,3),t2=ri(1,3),v1=pick([40,50,60]),v2=pick([30,40,80]),r=fr(v1*t1+v2*t2,t1+t2);return K("s8_avg4","ឡានបើកល្បឿន $"+v1+"$ km/h អស់ $"+t1+"$ ម៉ោង រួចល្បឿន $"+v2+"$ km/h អស់ $"+t2+"$ ម៉ោង ។ គណនាល្បឿនមធ្យមនៃដំណើរទាំងមូល",[A(r.s,r.t,"num","km/h =")],"ចម្ងាយ $"+(v1*t1+v2*t2)+"$ km ក្នុង $"+(t1+t2)+"$ ម៉ោង ⇒ $"+r.t+"$ km/h")},
 function(){var v1=pick([30,40,50,60]),v2=pick([20,40,45,60,70]),t=pick([1,2,3]),D=(v1+v2)*t;return K("s8_meet","ទីក្រុងពីរនៅឆ្ងាយគ្នា $"+D+"$ km ។ ឡានពីរចេញព្រមគ្នា បើកមកជួបគ្នា ល្បឿន $"+v1+"$ និង $"+v2+"$ km/h ។ ក្រោយប៉ុន្មានម៉ោងទើបជួបគ្នា?",[A(t,null,"num","ម៉ោង =")],"ល្បឿនជិតគ្នា $"+(v1+v2)+"$ km/h ⇒ $\\dfrac{"+D+"}{"+(v1+v2)+"}="+t+"$")},
 function(){var a=ri(1,3),b=ri(1,3),c=ri(1,2),q=pick([50,100,200,250,500]);return K("s8_flow","អាងទឹក $"+a+"\\text{ m}\\times"+b+"\\text{ m}\\times"+c+"\\text{ m}$ ។ ម៉ាស៊ីនបូម $"+q+"$ l/នាទី ។ ប៉ុន្មាននាទីទើបពេញ?",[A(1000*a*b*c/q,null,"num","នាទី =")],"$V="+(a*b*c)+"\\text{ m}^3="+(1000*a*b*c)+"$ l ⇒ $\\dfrac{"+(1000*a*b*c)+"}{"+q+"}="+(1000*a*b*c/q)+"$")}]);
/* ៥ កន្សោមពីជគណិត */
vx(5,1,[
 function(){var a=nz(-9,9),e=[1,2*a,a*a];return K("s8_sq5","ពន្លាត $(x"+sg(a,0)+")^2$",[A(poly(e),polyT(e),"expr","=")],"$(a\\pm b)^2=a^2\\pm2ab+b^2$ ⇒ $"+polyT(e)+"$")},
 function(){var a=nz(-6,6),b=nz(-6,6);return K("s8_mon","សម្រួល $"+co(a,"x^2",true)+"\\cdot"+(b<0?"("+co(b,"x",true)+")":co(b,"x",true))+"$",[A(poly([a*b,0,0,0]),polyT([a*b,0,0,0]),"expr","=")],"គុណមេគុណ និងបូកនិទស្សន្ត ⇒ $"+polyT([a*b,0,0,0])+"$")},
 function(){var a=nz(-6,6),b=nz(-6,6),c=nz(-6,6),d=nz(-6,6);while(a+c===0)c++;var e=[a+c,b-d,0];return K("s8_coll","សម្រួល $"+co(a,"x^2",true)+co(b,"x")+co(c,"x^2")+co(-d,"x")+"$",[A(poly(e),polyT(e),"expr","=")],"បូកតួដូចគ្នា ⇒ $"+polyT(e)+"$")}]);
vx(5,2,[
 function(){var a=nz(1,4),b=nz(-6,6),c=nz(1,4),d=nz(-6,6),e=[a*c,a*d+b*c,b*d];return K("s8_prod2","ពន្លាត $("+poly([a,b])+")("+poly([c,d])+")$",[A(poly(e),polyT(e),"expr","=")],"$="+polyT(e)+"$")},
 function(){var a=ri(2,9),b=nz(-9,9);return K("s8_cf","ដាក់ជាផលគុណកត្តា $"+a+"x^2"+co(a*b,"x")+"=ax(x+b)$ (យក $a>0$ ធំបំផុត) ។ រក $a$ និង $b$",[A(a,null,"num","a ="),A(b,null,"num","b =")],"កត្តារួម $"+a+"x$ ⇒ $"+a+"x(x"+sg(b,0)+")$")},
 function(){var a=ri(1,9),k=nz(-9,9);return K("s8_val","គណនាតម្លៃ $(x+"+a+")^2-(x-"+a+")^2$ ពេល $x="+k+"$",[A(4*a*k,null,"num","=")],"សម្រួលជាមុន ៖ $="+(4*a)+"x$ ⇒ $"+(4*a)+"\\times"+sgp(k)+"="+(4*a*k)+"$")}]);
vx(5,3,[
 function(){var m=nz(-9,9);return K("s8_sqd5","ដាក់ជាផលគុណកត្តា $x^2"+co(2*m,"x")+"+"+(m*m)+"=(x+m)^2$ ។ រក $m$",[A(m,null,"num","m =")],"$2m="+(2*m)+"$ , $m^2="+(m*m)+"$ ⇒ $m="+m+"$")},
 function(){var a=nz(-9,9),b=nz(-9,9),s=a+b,d=a-b;return K("s8_id","គេដឹងថា $a+b="+s+"$ និង $a-b="+d+"$ ។ គណនា $a^2-b^2$",[A(s*d,null,"num","=")],"$a^2-b^2=(a+b)(a-b)="+s+"\\times"+sgp(d)+"="+(s*d)+"$")},
 function(){var m=pick([50,100,200,1000]),k=ri(1,9),A2=m+k,B=m-k;return K("s8_quick","គណនាឱ្យរហ័ស $"+A2+"^2-"+B+"^2$",[A(A2*A2-B*B,null,"num","=")],"$("+A2+"-"+B+")("+A2+"+"+B+")="+(2*k)+"\\times"+(2*m)+"="+(A2*A2-B*B)+"$")}]);
/* ៦ កន្សោមសនិទាន */
vx(6,1,[
 function(){var a=nz(-5,5),b=ri(-9,9),c=ri(2,6),x=ri(-5,5),v=fr(a*x+b,c);return K("s8_val2","គណនាតម្លៃ $\\dfrac{"+poly([a,b]).replace(/x/,"x")+"}{"+c+"}$ ពេល $x="+x+"$",[A(v.s,v.t,"num","=")],"$\\dfrac{"+(a*x+b)+"}{"+c+"}="+v.t+"$")},
 function(){var a=nz(1,9),b=nz(1,9),r=fr(a,b);return K("s8_simp","សម្រួល $\\dfrac{"+co(a,"x",true)+"}{"+co(b,"x",true)+"}$ ($x\\ne0$)",[A(r.s,r.t,"num","=")],"លុប $x$ ⇒ $"+r.t+"$")},
 function(){var a=nz(-9,9),b=nz(-9,9);while(a===-b)b++;return K("s8_zero","រក $x$ ដែល $\\dfrac{x"+sg(-a,0)+"}{x"+sg(b,0)+"}=0$",[A(a,null,"num","x =")],"ភាគយក $=0$ ⇒ $x="+a+"$ (ភាគបែង $\\ne0$)")}]);
vx(6,2,[
 function(){var a=nz(-9,9),b=nz(-9,9);return K("s8_add6","សរសេរ $\\dfrac{"+a+"}{x}"+(b<0?"-":"+")+"\\dfrac{"+Math.abs(b)+"}{x}$ ជា $\\dfrac{k}{x}$ ។ រក $k$",[A(a+b,null,"num","k =")],"ភាគបែងដូចគ្នា ⇒ $k="+a+sg(b,0)+"="+(a+b)+"$")},
 function(){var a=nz(-9,9),b=ri(2,9),c=nz(-9,9),r=fr(c,b);return K("s8_mul6","សម្រួល $\\dfrac{x"+sg(a,0)+"}{"+b+"}\\times\\dfrac{"+c+"}{x"+sg(a,0)+"}$ ($x\\ne"+(-a)+"$)",[A(r.s,r.t,"num","=")],"លុប $x"+sg(a,0)+"$ ⇒ $\\dfrac{"+c+"}{"+b+"}="+r.t+"$")},
 function(){var p=nz(-8,8),q=nz(-8,8);while(q===p)q++;var lo=Math.min(p,q),hi=Math.max(p,q);return K("s8_two","កន្សោម $\\dfrac{1}{(x"+sg(-p,0)+")(x"+sg(-q,0)+")}$ គ្មានន័យ ពេល $x=m$ ឬ $x=n$ ($m<n$) ។ រក $m$ និង $n$",[A(lo,null,"num","m ="),A(hi,null,"num","n =")],"ភាគបែង $=0$ ⇒ $x="+p+"$ ឬ $x="+q+"$")}]);
vx(6,3,[
 function(){var a=ri(1,9);return K("s8_cancel","សម្រួល $\\dfrac{x^2-"+(a*a)+"}{x-"+a+"}$ ($x\\ne"+a+"$)",[A("x+"+a,null,"expr","=")],"$\\dfrac{(x-"+a+")(x+"+a+")}{x-"+a+"}=x+"+a+"$")},
 function(){var a=nz(-9,9),b=nz(-9,9);return K("s8_divx","សម្រួល $\\dfrac{"+co(a,"x",true)+sg(a*b,0)+"}{x"+sg(b,0)+"}$ ($x\\ne"+(-b)+"$)",[A(a,null,"num","=")],"$\\dfrac{"+a+"(x"+sg(b,0)+")}{x"+sg(b,0)+"}="+a+"$")},
 function(){var k=nz(-9,9);return K("s8_lin","សម្រួល $\\dfrac{x^2"+co(k,"x")+"}{x}$ ($x\\ne0$)",[A("x"+sg(k,0),null,"expr","=")],"$\\dfrac{x(x"+sg(k,0)+")}{x}=x"+sg(k,0)+"$")}]);
/* ៧ សមីការ */
vx(7,1,[
 function(){var a=nz(-6,6),c=nz(-6,6);while(c===a)c++;var x=ri(-8,8),b=ri(-9,9),d=(a-c)*x+b;return K("s8_both7","ដោះស្រាយ $"+co(a,"x",true)+sg(b,0)+"="+co(c,"x",true)+sg(d,0)+"$",[A(x,null,"num","x =")],"$"+(a-c)+"x="+(d-b)+"$ ⇒ $x="+x+"$")},
 function(){var a=nz(-5,5),b=nz(-6,6),x=ri(-8,8);return K("s8_par7","ដោះស្រាយ $"+a+"(x"+sg(b,0)+")="+(a*(x+b))+"$",[A(x,null,"num","x =")],"$x"+sg(b,0)+"="+(x+b)+"$ ⇒ $x="+x+"$")},
 function(){var a=ri(2,7),b=ri(-9,9),k=ri(-6,6);return K("s8_frac","ដោះស្រាយ $\\dfrac{x}{"+a+"}"+sg(b,0)+"="+(k+b)+"$",[A(a*k,null,"num","x =")],"$\\dfrac{x}{"+a+"}="+k+"$ ⇒ $x="+(a*k)+"$")}]);
vx(7,2,[
 function(){var b=ri(2,5),d=ri(2,6);while(d===b)d++;var x=ri(-6,8),t=nz(-3,3),a=b*t-x,c=d*t-x;return K("s8_fr2","ដោះស្រាយ $\\dfrac{x"+sg(a,0)+"}{"+b+"}=\\dfrac{x"+sg(c,0)+"}{"+d+"}$",[A(x,null,"num","x =")],"$"+d+"(x"+sg(a,0)+")="+b+"(x"+sg(c,0)+")$ ⇒ $"+(d-b)+"x="+(b*c-d*a)+"$ ⇒ $x="+x+"$")},
 function(){var a=ri(2,6),c=ri(2,5);while(c===a)c++;var b=ri(-6,6),d=ri(-6,6),x=ri(-6,6),e=a*(x-b)-c*(x+d);return K("s8_dist7","ដោះស្រាយ $"+a+"(x"+sg(-b,0)+")-"+c+"(x"+sg(d,0)+")="+e+"$",[A(x,null,"num","x =")],"$"+(a-c)+"x="+(e+a*b+c*d)+"$ ⇒ $x="+x+"$")},
 function(){var p=pick([10,20,25,50]),x=ri(1,20)*(100/gcd(100,p)),N=x*(100+p)/100;return K("s8_pct7","ចំនួនមួយ បូកនឹង $"+p+"\\%$ នៃខ្លួនវា ស្មើ $"+N+"$ ។ រកចំនួននោះ",[A(x,null,"num","x =")],"$x+\\dfrac{"+p+"}{100}x="+N+"$ ⇒ $\\dfrac{"+(100+p)+"}{100}x="+N+"$ ⇒ $x="+x+"$")}]);
vx(7,3,[
 function(){var n=2*ri(-5,20);return K("s8_cons","ផលបូកនៃចំនួនគូតគ្នា $3$ ស្មើ $"+(3*n+6)+"$ ។ រកចំនួនធំបំផុត",[A(n+4,null,"num","=")],"$x+(x+2)+(x+4)="+(3*n+6)+"$ ⇒ $x="+n+"$ ⇒ ធំបំផុត $"+(n+4)+"$")},
 function(){var a=ri(2,15),b=ri(2,15);return K("s8_coin","ក្រដាសប្រាក់ $1000$ រៀល និង $5000$ រៀល សរុប $"+(a+b)+"$ សន្លឹក មានតម្លៃ $"+mo(1000*a+5000*b)+"$ រៀល ។ តើមានក្រដាស $5000$ រៀលប៉ុន្មានសន្លឹក?",[A(b,null,"num","សន្លឹក =")],"$1000("+(a+b)+"-x)+5000x="+(1000*a+5000*b)+"$ ⇒ $4000x="+(4000*b)+"$ ⇒ $x="+b+"$")},
 function(){var w=ri(3,20),d=ri(2,10),P=2*(2*w+d);return K("s8_rect7","ចតុកោណកែងមួយ បណ្ដោយវែងជាងទទឹង $"+d+"$ m និងបរិមាត្រ $"+P+"$ m ។ គណនាផ្ទៃក្រឡា",[A(w*(w+d),null,"num","S =")],"$2(x+x+"+d+")="+P+"$ ⇒ $x="+w+"$ ⇒ $S="+w+"\\times"+(w+d)+"="+(w*(w+d))+"$ m²")}]);
/* ៨ វិសមីការ */
vx(8,1,[
 function(){var a=ri(2,7),b=ri(-9,9),c=ri(-9,9),k=fr(c-b,a);return K("s8_le","ដោះស្រាយ $"+a+"x"+sg(b,0)+"\\le"+c+"$ ៖ ចម្លើយ $x\\le k$ ។ រក $k$",[A(k.s,k.t,"num","k =")],"$x\\le"+k.t+"$")},
 function(){var a=ri(2,7),c=ri(a+1,40),n=Math.floor((c-1)/a);return K("s8_cnt8","តើមានចំនួនគត់វិជ្ជមានប៉ុន្មាន ដែលផ្ទៀងផ្ទាត់ $"+a+"x<"+c+"$ ?",[A(n,null,"num","ចំនួន =")],"$x<"+fr(c,a).t+"$ ⇒ $"+n+"$ ចំនួន")},
 function(){var a=ri(2,7),b=ri(-8,8);return K("s8_fr","ដោះស្រាយ $\\dfrac{x}{"+a+"}>"+b+"$ ៖ ចម្លើយ $x>k$ ។ រក $k$",[A(a*b,null,"num","k =")],"$x>"+a+"\\times"+sgp(b)+"="+(a*b)+"$")}]);
vx(8,2,[
 function(){var c=ri(1,4),a=c+ri(1,4),b=nz(-9,9),d=nz(-9,9),k=fr(d-b,a-c);return K("s8_both8","ដោះស្រាយ $"+a+"x"+sg(b,0)+">"+co(c,"x",true)+sg(d,0)+"$ ៖ ចម្លើយ $x>k$ ។ រក $k$",[A(k.s,k.t,"num","k =")],"$"+(a-c)+"x>"+(d-b)+"$ ⇒ $x>"+k.t+"$")},
 function(){var p=ri(2,5),q=ri(-4,4),a=ri(-6,10);return K("s8_neg2","ដោះស្រាយ $\\dfrac{"+a+"-x}{"+p+"}\\ge"+q+"$ ៖ ចម្លើយ $x\\le k$ ។ រក $k$",[A(a-p*q,null,"num","k =")],"$"+a+"-x\\ge"+(p*q)+"$ ⇒ $x\\le"+(a-p*q)+"$")},
 function(){var p=pick([2000,2500,3000,4000]),n=ri(3,15),M=n*p+500*ri(0,p/500-1);return K("s8_buy","មានប្រាក់ $"+mo(M)+"$ រៀល ។ សំបុត្រមួយតម្លៃ $"+mo(p)+"$ រៀល ។ ទិញបានច្រើនបំផុតប៉ុន្មានសន្លឹក?",[A(n,null,"num","=")],"$"+mo(p)+"x\\le"+mo(M)+"$ ⇒ $x\\le"+fr(M,p).t+"$ ⇒ $"+n+"$")}]);
vx(8,3,[
 function(){var a=ri(2,6),b=ri(-9,9),c=ri(-9,20),q=Math.ceil((c-b)/a);return K("s8_int","រកចំនួនគត់តូចបំផុត ដែលផ្ទៀងផ្ទាត់ $"+a+"x"+sg(b,0)+"\\ge"+c+"$",[A(q,null,"num","x =")],"$x\\ge"+fr(c-b,a).t+"$ ⇒ $"+q+"$")},
 function(){var r=pick([100,150]),s=r+pick([50,100,150]),k=ri(5,30),F=(s-r)*k;return K("s8_plan8","គម្រោង A ៖ ថ្លៃថេរ $"+mo(F)+"$ រៀល + $"+r+"$ រៀល/នាទី ។ គម្រោង B ៖ $"+s+"$ រៀល/នាទី ។ យ៉ាងតិចប៉ុន្មាននាទី (ចំនួនគត់) ទើប A ថោកជាង B?",[A(k+1,null,"num","នាទី =")],"$"+mo(F)+"+"+r+"t<"+s+"t$ ⇒ $t>"+k+"$ ⇒ $"+(k+1)+"$")},
 function(){var p=ri(1,6),q=ri(2,9),S=(q+p)*(q-p-1)/2;return K("s8_sum","គណនាផលបូកនៃចំនួនគត់ទាំងអស់ ដែល $-"+p+"\\le x<"+q+"$",[A(S,null,"num","=")],"$\\{-"+p+",\\dots,"+(q-1)+"\\}$ ⇒ $"+S+"$")}]);
/* ៩ ប្លង់កូអរដោនេ និងក្រាប */
vx(9,1,[
 function(){var A0=[ri(-8,8),ri(-8,8)],B=[A0[0]+2*nz(-4,4),A0[1]+2*nz(-4,4)],M=[(A0[0]+B[0])/2,(A0[1]+B[1])/2];return K("s8_mid","រកកូអរដោនេចំណុចកណ្ដាល $M$ នៃ $[AB]$ ដែល $A"+pt(A0)+"$ , $B"+pt(B)+"$",[A(M[0],null,"num","x_M ="),A(M[1],null,"num","y_M =")],"$M\\left(\\dfrac{"+A0[0]+"+"+sgp(B[0])+"}{2};\\dfrac{"+A0[1]+"+"+sgp(B[1])+"}{2}\\right)="+pt(M)+"$")},
 function(){var y=ri(-6,6),a=ri(-8,0),b=a+ri(1,12);return K("s8_dx","គណនាចម្ងាយរវាង $A("+a+";"+y+")$ និង $B("+b+";"+y+")$",[A(b-a,null,"num","AB =")],"អរដោនេដូចគ្នា ⇒ $|"+b+"-("+a+")|="+(b-a)+"$")},
 function(){var a=nz(-4,4),p=ri(-4,4),q=ri(-8,8);return K("s8_onl","រក $b$ ដើម្បីឱ្យបន្ទាត់ $y="+co(a,"x",true)+"+b$ កាត់តាមចំណុច $("+p+";"+q+")$",[A(q-a*p,null,"num","b =")],"$"+q+"="+a+"\\times"+sgp(p)+"+b$ ⇒ $b="+(q-a*p)+"$")}]);
vx(9,2,[
 function(){var a=nz(-8,8),b=nz(-8,8),t=pick([["អ័ក្ស $Ox$",a,-b],["អ័ក្ស $Oy$",-a,b],["គល់ $O$",-a,-b]]);return K("s8_sym","រកកូអរដោនេ $A'$ ឆ្លុះនៃ $A("+a+";"+b+")$ ធៀបនឹង"+t[0],[A(t[1],null,"num","x' ="),A(t[2],null,"num","y' =")],"$A'("+t[1]+";"+t[2]+")$")},
 function(){var a=nz(-9,9),y=nz(-5,5);return K("s8_ax","ចំណុច $M(m"+sg(-a,0)+";"+y+")$ ស្ថិតនៅលើអ័ក្ស $Oy$ ។ រក $m$",[A(a,null,"num","m =")],"លើអ័ក្ស $Oy$ ⇔ អាប់ស៊ីស $=0$ ⇒ $m"+sg(-a,0)+"=0$ ⇒ $m="+a+"$")},
 function(){var a=nz(-4,4),c=ri(-6,6),p=ri(-4,4),q=ri(-8,8);return K("s8_par9","បន្ទាត់ $(d')\\colon y="+co(a,"x",true)+"+b$ ស្របនឹង $(d)\\colon y="+co(a,"x",true)+sg(c,0)+"$ ហើយកាត់តាម $("+p+";"+q+")$ ។ រក $b$",[A(q-a*p,null,"num","b =")],"ស្របគ្នា ⇒ មេគុណប្រាប់ទិសដូចគ្នា $"+a+"$ ⇒ $b="+q+"-("+(a*p)+")="+(q-a*p)+"$")}]);
vx(9,3,[
 function(){var x=ri(-4,4),y=ri(-6,6),a=nz(-4,4),c=nz(-4,4);while(c===a)c++;var b=y-a*x,d=y-c*x;return K("s8_inter","រកចំណុចប្រសព្វនៃ $y="+co(a,"x",true)+sg(b,0)+"$ និង $y="+co(c,"x",true)+sg(d,0)+"$",[A(x,null,"num","x ="),A(y,null,"num","y =")],"$"+(a-c)+"x="+(d-b)+"$ ⇒ $x="+x+"$ , $y="+y+"$")},
 function(){var a=nz(-3,3),k=nz(-4,4),b=-a*k;var S=fr(Math.abs(b*k),2);return K("s8_area9","បន្ទាត់ $y="+co(a,"x",true)+sg(b,0)+"$ កាត់អ័ក្សទាំងពីរត្រង់ $A$ និង $B$ ។ គណនាផ្ទៃក្រឡាត្រីកោណ $OAB$",[A(S.s,S.t,"num","S =")],"$A("+k+";0)$ , $B(0;"+b+")$ ⇒ $S=\\dfrac12\\times"+Math.abs(k)+"\\times"+Math.abs(b)+"="+S.t+"$")},
 function(){var P=[ri(-5,3),ri(-5,5)],dx=nz(-4,4),m=nz(-3,3),Q2=[P[0]+dx,P[1]+m*dx];return K("s8_slope","រកមេគុណប្រាប់ទិសនៃបន្ទាត់កាត់តាម $A"+pt(P)+"$ និង $B"+pt(Q2)+"$",[A(m,null,"num","a =")],"$a=\\dfrac{"+Q2[1]+"-("+P[1]+")}{"+Q2[0]+"-("+P[0]+")}=\\dfrac{"+(m*dx)+"}{"+dx+"}="+m+"$")}]);
/* ១០ ស្ថិតិ */
vx(10,1,[
 function(){var a,mx;do{a=sample(ri(6,9),1,15);var c={};a.forEach(function(v){c[v]=(c[v]||0)+1});var m=Math.max.apply(null,Object.keys(c).map(function(k){return c[k]})),ks=Object.keys(c).filter(function(k){return c[k]===m});mx=ks.length===1&&m>1?+ks[0]:null}while(mx===null);return K("s8_mode","រកម៉ូតនៃ $"+a.join(",\\ ")+"$",[A(mx,null,"num","Mo =")],"តម្លៃដែលលេចឡើងញឹកញាប់បំផុត ⇒ $"+mx+"$")},
 function(){var n=ri(4,7),m=ri(5,20),a=sample(n-1,1,30);a.push(m*n-sum(a));while(a[n-1]<1){a=sample(n-1,1,30);a.push(m*n-sum(a))}return K("s8_mean","គណនាមធ្យមនព្វន្តនៃ $"+a.join(",\\ ")+"$",[A(m,null,"num","x̄ =")],"$\\dfrac{"+sum(a)+"}{"+n+"}="+m+"$")},
 function(){var a=sample(ri(7,10),1,30),k=ri(8,22),n=a.filter(function(v){return v>k}).length;return K("s8_cnt10","ក្នុងទិន្នន័យ $"+a.join(",\\ ")+"$ តើមានប៉ុន្មានតម្លៃ ដែលធំជាង $"+k+"$ ?",[A(n,null,"num","=")],"រាប់ ⇒ $"+n+"$")}]);
vx(10,2,[
 function(){var n=ri(4,6),m=ri(5,15),a=sample(n-1,1,25),x=m*n-sum(a);while(x<0){a=sample(n-1,1,20);x=m*n-sum(a)}return K("s8_meanx","ទិន្នន័យ $"+a.join(",\\ ")+",\\ x$ មានមធ្យមនព្វន្ត $"+m+"$ ។ រក $x$",[A(x,null,"num","x =")],"ផលបូក $="+n+"\\times"+m+"="+(n*m)+"$ ⇒ $x="+(n*m)+"-"+sum(a)+"="+x+"$")},
 function(){var N=pick([20,25,50]),xs=[5,6,7,8,9],f=fsum(5,N),j=ri(0,4);return K("s8_rel","តារាង $"+tb2(xs,f)+"$ ($N="+N+"$) ។ គណនាប្រេកង់ធៀប (%) នៃ $x="+xs[j]+"$",[A(f[j]*100/N,null,"num","% =")],"$\\dfrac{"+f[j]+"}{"+N+"}\\times100="+(f[j]*100/N)+"\\%$")},
 function(){var xs=[4,5,6,7,8],f,N;do{f=xs.map(function(){return ri(1,7)});N=sum(f)}while(N%2===0);var k=(N+1)/2,c=0,me=0;for(var i=0;i<5;i++){c+=f[i];if(c>=k){me=xs[i];break}}return K("s8_medt","រកមេដ្យាននៃ $"+tb2(xs,f)+"$",[A(me,null,"num","Me =")],"$N="+N+"$ ⇒ តួទី $"+k+"$ ⇒ $"+me+"$")}]);
vx(10,3,[
 function(){var n1=ri(10,30),n2=ri(10,30),m1=ri(5,9),m2=ri(5,9),r=fr(n1*m1+n2*m2,n1+n2);return K("s8_comb","ក្រុម A មាន $"+n1+"$ នាក់ មធ្យម $"+m1+"$ ។ ក្រុម B មាន $"+n2+"$ នាក់ មធ្យម $"+m2+"$ ។ គណនាមធ្យមរួម",[A(r.s,r.t,"num","x̄ =")],"$\\dfrac{"+(n1*m1)+"+"+(n2*m2)+"}{"+(n1+n2)+"}="+r.t+"$")},
 function(){var n=ri(5,12),m=ri(10,30),a=ri(10,40),b=a+nz(-15,15),r=fr(n*m-b+a,n);return K("s8_fix","មធ្យមនៃ $"+n+"$ ចំនួនត្រូវបានគណនាបាន $"+m+"$ ប៉ុន្តែកត់ខុស $"+a+"$ ទៅជា $"+b+"$ ។ គណនាមធ្យមត្រឹមត្រូវ",[A(r.s,r.t,"num","x̄ =")],"$\\dfrac{"+(n*m)+"-"+b+"+"+a+"}{"+n+"}="+r.t+"$")},
 function(){var n=ri(4,9),m=ri(5,15),s=ri(0,20),r=fr(n*m+s,n+1);return K("s8_add10","មធ្យមនៃ $"+n+"$ ចំនួនគឺ $"+m+"$ ។ ថែមចំនួន $"+s+"$ ។ គណនាមធ្យមថ្មី",[A(r.s,r.t,"num","x̄ =")],"$\\dfrac{"+(n*m)+"+"+s+"}{"+(n+1)+"}="+r.t+"$")}]);
/* ១១ ប្រូបាប */
vx(11,1,[
 function(){var C=pick([["ចំនួនគូ",3],["ចំនួនបឋម",3],["លេខធំជាង $4$",2],["ពហុគុណនៃ $3$",2],["លេខ $1$",1]]),p=fr(C[1],6);return K("s8_die","បោះគ្រាប់ឡុកឡាក់មួយ ។ ប្រូបាបដែលចេញ"+C[0]+"?",[A(p.s,p.t,"num","P =")],"$\\dfrac{"+C[1]+"}{6}="+p.t+"$")},
 function(){var n=pick([4,5,6,8,10,12]),r=ri(1,n-1),p=fr(r,n);return K("s8_spin","កង់វិលចែកជា $"+n+"$ ផ្នែកស្មើគ្នា ក្នុងនោះ $"+r+"$ ផ្នែកពណ៌លឿង ។ ប្រូបាបព្រួញឈប់លើពណ៌លឿង?",[A(p.s,p.t,"num","P =")],"$\\dfrac{"+r+"}{"+n+"}="+p.t+"$")},
 function(){var C=pick([["ចេញលេខ $7$",0],["ចេញលេខ $\\le6$",1],["ចេញលេខ $0$",0],["ចេញលេខវិជ្ជមាន",1]]);return K("s8_imp","បោះគ្រាប់ឡុកឡាក់មួយ ។ ប្រូបាបដែល"+C[0]+" ស្មើប៉ុន្មាន?",[A(C[1],null,"num","P =")],C[1]?"ព្រឹត្តិការណ៍ប្រាកដ ⇒ $1$":"ព្រឹត្តិការណ៍មិនអាច ⇒ $0$")}]);
vx(11,2,[
 function(){var r=ri(1,8),b=ri(1,8),g=ri(1,8),p=fr(r+g,r+b+g);return K("s8_bag","ថង់មួយមានឃ្លីក្រហម $"+r+"$ ខៀវ $"+b+"$ បៃតង $"+g+"$ ។ ចាប់មួយ ។ ប្រូបាបមិនមែនពណ៌ខៀវ?",[A(p.s,p.t,"num","P =")],"$\\dfrac{"+(r+g)+"}{"+(r+b+g)+"}="+p.t+"$")},
 function(){var d=pick([3,4,5,6,8,10]),n=ri(1,d-1),N=d*ri(2,6),p=fr(n,d);return K("s8_find","ប្រអប់មួយមានប៊ិច $"+N+"$ ដើម ។ ប្រូបាបចាប់បានប៊ិចក្រហម $"+p.t+"$ ។ មានប៊ិចក្រហមប៉ុន្មាន?",[A(N*p.n/p.d,null,"num","=")],"$"+N+"\\times"+p.t+"="+(N*p.n/p.d)+"$")},
 function(){var r=ri(1,6),b=ri(1,8),k=ri(1,5),p=fr(r+k,r+b+k);return K("s8_addb","ថង់មានឃ្លីក្រហម $"+r+"$ និងខៀវ $"+b+"$ ។ ដាក់ក្រហមថែម $"+k+"$ ។ ប្រូបាបចាប់បានក្រហម?",[A(p.s,p.t,"num","P =")],"$\\dfrac{"+(r+k)+"}{"+(r+b+k)+"}="+p.t+"$")}]);
vx(11,3,[
 function(){var s=ri(2,12),n=6-Math.abs(s-7),p=fr(n,36);return K("s8_twod","បោះគ្រាប់ឡុកឡាក់ពីរ ។ ប្រូបាបដែលផលបូកស្មើ $"+s+"$ ?",[A(p.s,p.t,"num","P =")],"ករណីអាចមាន $36$ · ករណីស្រប $"+n+"$ ⇒ $"+p.t+"$")},
 function(){var N=pick([20,40,50,100]),k=ri(1,N-1),p=fr(k,N);return K("s8_exp","បោះកាក់មួយ $"+N+"$ ដង ចេញក្បាល $"+k+"$ ដង ។ គណនាប្រេកង់ធៀបនៃការចេញក្បាល",[A(p.s,p.t,"num","=")],"$\\dfrac{"+k+"}{"+N+"}="+p.t+"$")},
 function(){var t=pick([["ក្បាលទាំងបី",fr(1,8)],["យ៉ាងហោចណាស់ក្បាលម្ដង",fr(7,8)],["គ្មានក្បាលសោះ",fr(1,8)]]);return K("s8_coin3","បោះកាក់មួយ $3$ ដង ។ ប្រូបាបដែលចេញ"+t[0]+"?",[A(t[1].s,t[1].t,"num","P =")],"លទ្ធផលអាចមាន $2^3=8$ ⇒ $"+t[1].t+"$")}]);
/* ១២ ការប្រៀបធៀបត្រីកោណ */
vx(12,1,[
 function(){var P=ri(12,40);return K("s8_per","$\\triangle ABC\\cong\\triangle DEF$ ហើយបរិមាត្រ $\\triangle ABC="+P+"$ cm ។ គណនាបរិមាត្រ $\\triangle DEF$",[A(P,null,"num","=")],"ត្រីកោណប៉ុនគ្នា មានជ្រុងស្មើគ្នាទាំងបី ⇒ $"+P+"$ cm")},
 function(){var a=ri(25,110);return K("s8_ang","$\\triangle ABC\\cong\\triangle DEF$ ($A\\leftrightarrow D$) មាន $\\widehat A="+ang(a)+"$ ។ គណនា $\\widehat D$",[A(a,null,"num","=")],"មុំត្រូវគ្នាស្មើគ្នា ⇒ $"+ang(a)+"$")},
 function(){var x=ri(2,12),a=ri(1,9);return K("s8_iso","$\\triangle ABC\\cong\\triangle DEF$ ដែល $AB=x+"+a+"$ និង $DE="+(x+a)+"$ ។ រក $x$",[A(x,null,"num","x =")],"$AB=DE$ ⇒ $x+"+a+"="+(x+a)+"$ ⇒ $x="+x+"$")}]);
vx(12,2,[
 function(){var a=ri(3,12),b=ri(3,12),c=ri(Math.abs(a-b)+1,a+b-1);return K("s8_side","$\\triangle ABC\\cong\\triangle DEF$ ៖ $AB="+a+"$ , $BC="+b+"$ ហើយបរិមាត្រ $\\triangle DEF="+(a+b+c)+"$ ។ គណនា $DF$",[A(c,null,"num","DF =")],"$DF=CA="+(a+b+c)+"-"+a+"-"+b+"="+c+"$")},
 function(){var k=ri(2,12);return K("s8_isoh","ត្រីកោណ $ABC$ សមបាតត្រង់ $A$ មានកម្ពស់ $[AH]$ ($H\\in[BC]$) ។ $BH="+k+"$ cm ។ គណនា $BC$",[A(2*k,null,"num","BC =")],"$\\triangle ABH\\cong\\triangle ACH$ ⇒ $BH=HC$ ⇒ $BC="+(2*k)+"$ cm")},
 function(){var a=ri(30,80),b=ri(30,80);return K("s8_ext","$\\triangle ABC\\cong\\triangle DEF$ មាន $\\widehat D="+ang(a)+"$ និង $\\widehat E="+ang(b)+"$ ។ គណនាមុំក្រៅត្រង់កំពូល $C$",[A(a+b,null,"num","=")],"$\\widehat A=\\widehat D$ , $\\widehat B=\\widehat E$ ⇒ មុំក្រៅ $="+(a+b)+"^\\circ$")}]);
vx(12,3,[
 function(){var x=ri(2,10),y=ri(2,10),a=ri(1,6),c=ri(1,6);return K("s8_xy","$\\triangle ABC\\cong\\triangle DEF$ ដែល $AB=2x+"+a+"$ , $DE="+(2*x+a)+"$ , $BC=y+"+c+"$ , $EF="+(y+c)+"$ ។ រក $x$ និង $y$",[A(x,null,"num","x ="),A(y,null,"num","y =")],"$2x+"+a+"="+(2*x+a)+"$ ⇒ $x="+x+"$ · $y+"+c+"="+(y+c)+"$ ⇒ $y="+y+"$")},
 function(){var a=ri(4,15),b=ri(2,2*a-1);return K("s8_bis12","$M$ ស្ថិតលើមេដ្យាទ័រនៃ $[AB]$ ។ $MA="+a+"$ cm និង $AB="+b+"$ cm ។ គណនាបរិមាត្រត្រីកោណ $MAB$",[A(2*a+b,null,"num","=")],"$MB=MA="+a+"$ ⇒ $"+a+"+"+a+"+"+b+"="+(2*a+b)+"$ cm")},
 function(){var x=ri(10,30),a=ri(1,x-1),b=x-a;return K("s8_angx","$\\triangle ABC\\cong\\triangle DEF$ ($A\\leftrightarrow D$) ដែល $\\widehat A=(2x+"+a+")^\\circ$ និង $\\widehat D=(3x-"+b+")^\\circ$ ។ រក $x$",[A(x,null,"num","x =")],"$2x+"+a+"=3x-"+b+"$ ⇒ $x="+x+"$")}]);
/* ១៣ ចតុកោណ */
vx(13,1,[
 function(){var d=2*ri(3,15);return K("s8_rect13","ចតុកោណកែង $ABCD$ មានអង្កត់ទ្រូង $AC="+d+"$ cm ។ $O$ ជាចំណុចប្រសព្វអង្កត់ទ្រូង ។ គណនា $BD$ និង $OB$",[A(d,null,"num","BD ="),A(d/2,null,"num","OB =")],"អង្កត់ទ្រូងចតុកោណកែងស្មើគ្នា និងកាត់គ្នាពាក់កណ្ដាល")},
 function(){var a=ri(2,15);return K("s8_sq13","ការេមួយមានជ្រុង $"+a+"$ cm ។ គណនាអង្កត់ទ្រូង (ទុក $\\sqrt{\\ }$)",[A(a+"*sqrt(2)",a+"\\sqrt2","num","d =")],"$d=\\sqrt{"+a+"^2+"+a+"^2}="+a+"\\sqrt2$ cm")},
 function(){var a=ri(40,140);return K("s8_trap","ចតុកោណព្នាយ $ABCD$ ($AB\\parallel CD$) មាន $\\widehat A="+ang(a)+"$ ។ គណនា $\\widehat D$",[A(180-a,null,"num","=")],"$\\widehat A$ និង $\\widehat D$ ជាមុំក្នុងម្ខាង ⇒ $180-"+a+"="+ang(180-a)+"$")}]);
vx(13,2,[
 function(){var a=ri(2,20);return K("s8_rh13","ចតុកោណស្មើមួយមានបរិមាត្រ $"+(4*a)+"$ cm ។ គណនាប្រវែងជ្រុង",[A(a,null,"num","=")],"ជ្រុងទាំងបួនស្មើគ្នា ⇒ $\\dfrac{"+(4*a)+"}{4}="+a+"$")},
 function(){var a=ri(3,15),b=ri(2,12);return K("s8_para","ប្រលេឡូក្រាម $ABCD$ មាន $AB="+a+"$ cm និង $BC="+b+"$ cm ។ គណនាបរិមាត្រ",[A(2*(a+b),null,"num","P =")],"ជ្រុងឈមស្មើគ្នា ⇒ $2("+a+"+"+b+")="+(2*(a+b))+"$")},
 function(){var x=ri(20,50),a=ri(1,20),b=180-3*x-a;return K("s8_ang2","ប្រលេឡូក្រាម $ABCD$ មាន $\\widehat A=(2x+"+a+")^\\circ$ និង $\\widehat B=(x"+sg(b,0)+")^\\circ$ ។ រក $x$",[A(x,null,"num","x =")],"មុំជាប់បន្ថែមគ្នា ⇒ $3x+"+(a+b)+"=180$ ⇒ $x="+x+"$")}]);
vx(13,3,[
 function(){var T=pick(TR);return K("s8_rhd","ចតុកោណស្មើមួយមានជ្រុង $"+T[2]+"$ និងអង្កត់ទ្រូងមួយ $"+(2*T[0])+"$ ។ គណនាអង្កត់ទ្រូងមួយទៀត និងផ្ទៃក្រឡា",[A(2*T[1],null,"num","d₂ ="),A(2*T[0]*T[1],null,"num","S =")],"ពាក់កណ្ដាល $=\\sqrt{"+T[2]+"^2-"+T[0]+"^2}="+T[1]+"$ ⇒ $d_2="+(2*T[1])+"$ · $S=\\dfrac{"+(2*T[0])+"\\times"+(2*T[1])+"}{2}="+(2*T[0]*T[1])+"$")},
 function(){var a=ri(60,100),b=ri(60,100),c=ri(60,100);return K("s8_sum4","ចតុកោណប៉ោងមួយមានមុំបី $"+ang(a)+"$ , $"+ang(b)+"$ , $"+ang(c)+"$ ។ គណនាមុំទីបួន",[A(360-a-b-c,null,"num","=")],"ផលបូកមុំក្នុងចតុកោណ $=360^\\circ$ ⇒ $"+ang(360-a-b-c)+"$")},
 function(){var a=ri(6,20),b=ri(2,a-2);if((a+b)%2)b++;return K("s8_mid4","ចតុកោណព្នាយមានបាត $"+a+"$ cm និង $"+b+"$ cm ។ គណនាប្រវែងអង្កត់មេដ្យាន (ភ្ជាប់ចំណុចកណ្ដាលជ្រុងទ្រេតទាំងពីរ)",[A((a+b)/2,null,"num","=")],"$\\dfrac{"+a+"+"+b+"}{2}="+((a+b)/2)+"$ cm")}]);
/* ១៤ ទ្រឹស្ដីបទពីតាគ័រ */
var QD=[[1,2,2,3],[2,3,6,7],[1,4,8,9],[4,4,7,9],[2,6,9,11],[6,6,7,11]];
vx(14,1,[
 function(){var T=pick(TR);return K("s8_rect14","ចតុកោណកែងមួយមានវិមាត្រ $"+T[0]+"\\times"+T[1]+"$ cm ។ គណនាអង្កត់ទ្រូង",[A(T[2],null,"num","d =")],"$\\sqrt{"+(T[0]*T[0])+"+"+(T[1]*T[1])+"}="+T[2]+"$")},
 function(){var T=pick(TR),P=[ri(-4,3),ri(-4,3)],B=[P[0]+T[0],P[1]+T[1]];return K("s8_dist14","គណនាចម្ងាយ $AB$ ដែល $A"+pt(P)+"$ , $B"+pt(B)+"$",[A(T[2],null,"num","AB =")],"$\\sqrt{"+T[0]+"^2+"+T[1]+"^2}="+T[2]+"$")},
 function(){var a=ri(1,6),b=ri(1,6),N=a*a+b*b;while(Math.pow(Math.round(Math.sqrt(N)),2)===N){b++;N=a*a+b*b}return K("s8_sqrt","ត្រីកោណកែងមួយមានជ្រុងជាប់មុំកែង $"+a+"$ និង $"+b+"$ ។ គណនាអ៊ីប៉ូតេនុស (ទុក $\\sqrt{\\ }$)",[A("sqrt("+N+")","\\sqrt{"+N+"}","num","=")],"$\\sqrt{"+(a*a)+"+"+(b*b)+"}=\\sqrt{"+N+"}$")}]);
vx(14,2,[
 function(){var T=pick(TR),k=pick([1,2,4]);return K("s8_tv","អេក្រង់ទូរទស្សន៍រាងចតុកោណកែង ទទឹង $"+(T[0]*k)+"$ និងបណ្ដោយ $"+(T[1]*k)+"$ (អ៊ីញ) ។ គណនាអង្កត់ទ្រូង",[A(T[2]*k,null,"num","=")],"$\\sqrt{"+(T[0]*k)+"^2+"+(T[1]*k)+"^2}="+(T[2]*k)+"$")},
 function(){var T=pick(TR);return K("s8_isoh2","ត្រីកោណសមបាតមួយ មានជ្រុងអង្គ $"+T[2]+"$ និងបាត $"+(2*T[0])+"$ ។ គណនាកម្ពស់ទៅលើបាត",[A(T[1],null,"num","h =")],"កម្ពស់ចែកបាតជាពីរ ⇒ $h=\\sqrt{"+T[2]+"^2-"+T[0]+"^2}="+T[1]+"$")},
 function(){var a=ri(1,9);return K("s8_eqt","ត្រីកោណសម័ង្សមួយមានជ្រុង $"+(2*a)+"$ cm ។ គណនាកម្ពស់ (ទុក $\\sqrt{\\ }$)",[A(a+"*sqrt(3)",(a===1?"":a)+"\\sqrt3","num","h =")],"$h=\\sqrt{"+(2*a)+"^2-"+a+"^2}=\\sqrt{"+(3*a*a)+"}="+(a===1?"":a)+"\\sqrt3$")}]);
vx(14,3,[
 function(){var q=pick(QD);return K("s8_box","ប្រអប់រាងប្រលេពីប៉ែតកែង វិមាត្រ $"+q[0]+"\\times"+q[1]+"\\times"+q[2]+"$ ។ គណនាអង្កត់ទ្រូងលំហ (ពីជ្រុងមួយទៅជ្រុងឈមឆ្ងាយបំផុត)",[A(q[3],null,"num","=")],"$\\sqrt{"+(q[0]*q[0])+"+"+(q[1]*q[1])+"+"+(q[2]*q[2])+"}=\\sqrt{"+(q[3]*q[3])+"}="+q[3]+"$")},
 function(){var T=pick(TR),k=ri(1,5);return K("s8_ship","កប៉ាល់មួយធ្វើដំណើរទៅទិសខាងជើង $"+(T[0]*k)+"$ km រួចទៅទិសខាងកើត $"+(T[1]*k)+"$ km ។ តើវានៅឆ្ងាយពីចំណុចចាប់ផ្ដើមប៉ុន្មាន km?",[A(T[2]*k,null,"num","=")],"ទិសកែងគ្នា ⇒ $\\sqrt{"+(T[0]*k)+"^2+"+(T[1]*k)+"^2}="+(T[2]*k)+"$")},
 function(){var T=pick(TR),S=fr(T[0]*T[1],2);return K("s8_rarea","ត្រីកោណកែងមួយមានអ៊ីប៉ូតេនុស $"+T[2]+"$ និងជ្រុងមួយ $"+T[0]+"$ ។ គណនាផ្ទៃក្រឡា",[A(S.s,S.t,"num","S =")],"ជ្រុងមួយទៀត $="+T[1]+"$ ⇒ $S=\\dfrac{"+T[0]+"\\times"+T[1]+"}{2}="+S.t+"$")}]);
/* ១៥ ផ្ទៃក្រឡាពហុកោណ */
vx(15,1,[
 function(){var b=ri(2,20),h=ri(2,15);if(b*h%2)h++;return K("s8_tri","ត្រីកោណមានបាត $"+b+"$ និងកម្ពស់ $"+h+"$ ។ គណនាផ្ទៃក្រឡា",[A(b*h/2,null,"num","S =")],"$\\dfrac{"+b+"\\times"+h+"}{2}="+(b*h/2)+"$")},
 function(){var p=ri(2,15),q=ri(2,15);return K("s8_rh15","ចតុកោណស្មើមានអង្កត់ទ្រូង $"+(2*p)+"$ និង $"+q+"$ ។ គណនាផ្ទៃក្រឡា",[A(p*q,null,"num","S =")],"$\\dfrac{"+(2*p)+"\\times"+q+"}{2}="+(p*q)+"$")},
 function(){var d=2*ri(1,10);return K("s8_sqd15","ការេមួយមានអង្កត់ទ្រូង $"+d+"$ cm ។ គណនាផ្ទៃក្រឡា",[A(d*d/2,null,"num","S =")],"$S=\\dfrac{d^2}{2}=\\dfrac{"+(d*d)+"}{2}="+(d*d/2)+"$")}]);
vx(15,2,[
 function(){var b=ri(2,15),h=ri(2,12);return K("s8_rev15","ប្រលេឡូក្រាមមានផ្ទៃក្រឡា $"+(b*h)+"$ និងបាត $"+b+"$ ។ គណនាកម្ពស់",[A(h,null,"num","h =")],"$h=\\dfrac{"+(b*h)+"}{"+b+"}="+h+"$")},
 function(){var a=ri(4,15),b=ri(2,a-1),h=ri(2,12);if((a+b)*h%2)h++;return K("s8_trh","ចតុកោណព្នាយមានបាត $"+a+"$ និង $"+b+"$ ផ្ទៃក្រឡា $"+((a+b)*h/2)+"$ ។ គណនាកម្ពស់",[A(h,null,"num","h =")],"$h=\\dfrac{2S}{a+b}=\\dfrac{"+((a+b)*h)+"}{"+(a+b)+"}="+h+"$")},
 function(){var w=ri(4,12),l=ri(4,12),h=ri(2,8);if(w*h%2)h++;return K("s8_comp","រូបផ្ទះ ៖ ចតុកោណកែង $"+w+"\\times"+l+"$ និងដំបូលត្រីកោណ បាត $"+w+"$ កម្ពស់ $"+h+"$ ។ គណនាផ្ទៃក្រឡាសរុប",[A(w*l+w*h/2,null,"num","S =")],"$"+(w*l)+"+\\dfrac{"+w+"\\times"+h+"}{2}="+(w*l+w*h/2)+"$")}]);
vx(15,3,[
 function(){var w=ri(1,3),a=2*w+ri(3,10),b=2*w+ri(3,10);return K("s8_frame","ស៊ុមរូបថតរាងចតុកោណកែងខាងក្រៅ $"+a+"\\times"+b+"$ cm ទទឹងស៊ុម $"+w+"$ cm ។ គណនាផ្ទៃក្រឡាស៊ុម",[A(a*b-(a-2*w)*(b-2*w),null,"num","S =")],"$"+a+"\\times"+b+"-"+(a-2*w)+"\\times"+(b-2*w)+"="+(a*b-(a-2*w)*(b-2*w))+"$")},
 function(){var a=ri(5,20),b=ri(4,15),w=ri(1,3);return K("s8_path","សួនច្បារ $"+a+"\\times"+b+"$ m មានផ្លូវដើរព័ទ្ធជុំវិញ ខាងក្រៅ ទទឹង $"+w+"$ m ។ គណនាផ្ទៃក្រឡាផ្លូវ",[A((a+2*w)*(b+2*w)-a*b,null,"num","S =")],"$"+(a+2*w)+"\\times"+(b+2*w)+"-"+a+"\\times"+b+"="+((a+2*w)*(b+2*w)-a*b)+"$ m²")},
 function(){var a=ri(3,12),b=ri(3,10),p=ri(2,9)*5000;return K("s8_cost","បន្ទប់ $"+a+"\\times"+b+"$ m ក្រាលការ៉ូ តម្លៃ $"+mo(p)+"$ រៀល/m² ។ ចំណាយសរុបប៉ុន្មានរៀល?",[A(a*b*p,null,"num","រៀល =")],"$"+(a*b)+"\\times"+mo(p)+"="+mo(a*b*p)+"$")}]);
/* ១៦ រង្វង់ */
vx(16,1,[
 function(){var r=ri(2,15);return K("s8_area16","គណនាផ្ទៃក្រឡាថាសកាំ $"+r+"$ (ទុក $\\pi$)",[A((r*r)+"*pi",(r*r)+"\\pi","num","S =")],"$\\pi r^2="+(r*r)+"\\pi$")},
 function(){var r=ri(2,15);return K("s8_circ","គណនាបរិមាត្ររង្វង់កាំ $"+r+"$ (ទុក $\\pi$)",[A((2*r)+"*pi",(2*r)+"\\pi","num","C =")],"$2\\pi r="+(2*r)+"\\pi$")},
 function(){var d=ri(2,30);return K("s8_dia","រង្វង់មួយមានបរិមាត្រ $"+d+"\\pi$ ។ គណនាអង្កត់ផ្ចិត",[A(d,null,"num","d =")],"$\\pi d="+d+"\\pi$ ⇒ $d="+d+"$")}]);
vx(16,2,[
 function(){var th=pick([30,45,60,90,120,150,180]),r=ri(2,12),S=fr(r*r*th,360);return K("s8_sector","គណនាផ្ទៃក្រឡាចំណិតថាសកាំ $"+r+"$ មុំផ្ចិត $"+ang(th)+"$ (ទុក $\\pi$)",[A("("+S.s+")*pi",(S.d===1?(S.n===1?"":S.n):"\\dfrac{"+S.n+"}{"+S.d+"}")+"\\pi","num","S =")],"$\\pi r^2\\times\\dfrac{"+th+"}{360}$")},
 function(){var r=ri(2,12);return K("s8_semi","គណនាបរិមាត្ររូបកន្លះថាសកាំ $"+r+"$ (ធ្នូ + អង្កត់ផ្ចិត · ទុក $\\pi$)",[A(r+"*pi+"+(2*r),r+"\\pi+"+(2*r),"num","P =")],"$\\pi r+2r="+r+"\\pi+"+(2*r)+"$")},
 function(){var r=ri(2,15);return K("s8_rev16","ថាសមួយមានផ្ទៃក្រឡា $"+(r*r)+"\\pi$ ។ គណនាកាំ",[A(r,null,"num","r =")],"$r^2="+(r*r)+"$ ⇒ $r="+r+"$")}]);
vx(16,3,[
 function(){var d=ri(20,70),n=ri(2,20);return K("s8_wheel","កង់កាំអង្កត់ផ្ចិត $"+d+"$ cm វិល $"+n+"$ ជុំ ។ ចម្ងាយធ្វើដំណើរ (cm · ទុក $\\pi$)?",[A((d*n)+"*pi",(d*n)+"\\pi","num","=")],"មួយជុំ $="+d+"\\pi$ ⇒ $"+(d*n)+"\\pi$ cm")},
 function(){var r=ri(1,8);return K("s8_sqc","ការេជ្រុង $"+(2*r)+"$ មានថាសចារឹកក្នុង ។ គណនាផ្ទៃក្រឡាផ្នែកការេនៅក្រៅថាស (ទុក $\\pi$)",[A((4*r*r)+"-"+(r*r)+"*pi",(4*r*r)+"-"+(r*r)+"\\pi","num","S =")],"$"+(4*r*r)+"-"+(r*r)+"\\pi$")},
 function(){var r=ri(2,12),th=pick([30,45,60,90,120,150]),L=fr(r*th,180);return K("s8_arcrev","ធ្នូមួយនៃរង្វង់កាំ $"+r+"$ មានប្រវែង $"+(L.d===1?(L.n===1?"":L.n):"\\dfrac{"+L.n+"}{"+L.d+"}")+"\\pi$ ។ គណនាមុំផ្ចិត (ដឺក្រេ)",[A(th,null,"num","=")],"$l=\\dfrac{\\pi r\\theta}{180}$ ⇒ $\\theta="+ang(th)+"$")}]);
/* ១៧ បន្ទាត់ពិសេសក្នុងត្រីកោណ */
vx(17,1,[
 function(){var m=ri(1,12);return K("s8_gm","$G$ ជាទីប្រជុំទម្ងន់នៃ $\\triangle ABC$ ហើយ $GM="+m+"$ ($M$ កណ្ដាល $[BC]$) ។ គណនា $AM$",[A(3*m,null,"num","AM =")],"$GM=\\dfrac13AM$ ⇒ $AM="+(3*m)+"$")},
 function(){var a=ri(2,15);return K("s8_midl","ក្នុង $\\triangle ABC$ ៖ $M,N$ ជាចំណុចកណ្ដាល $[AB]$ , $[AC]$ ។ $BC="+(2*a)+"$ ។ គណនា $MN$",[A(a,null,"num","MN =")],"$MN=\\dfrac{BC}{2}="+a+"$")},
 function(){var m=ri(2,15);return K("s8_hyp","ត្រីកោណ $ABC$ កែងត្រង់ $A$ ។ មេដ្យាន $AM="+m+"$ ។ គណនា $BC$",[A(2*m,null,"num","BC =")],"$AM=\\dfrac{BC}{2}$ ⇒ $BC="+(2*m)+"$")}]);
vx(17,2,[
 function(){var a=2*ri(15,75);return K("s8_bis17","$[AD)$ ជាកន្លះបន្ទាត់ពុះមុំ $\\widehat{BAC}="+ang(a)+"$ ។ គណនា $\\widehat{BAD}$",[A(a/2,null,"num","=")],"$\\dfrac{"+a+"}{2}="+ang(a/2)+"$")},
 function(){var k=ri(1,12);return K("s8_ag","$G$ ជាទីប្រជុំទម្ងន់នៃ $\\triangle ABC$ ។ $AG="+(2*k)+"$ ។ គណនា $GM$ និង $AM$",[A(k,null,"num","GM ="),A(3*k,null,"num","AM =")],"$AG=2GM$ ⇒ $GM="+k+"$ · $AM="+(3*k)+"$")},
 function(){var a=ri(3,12),b=ri(3,12),c=ri(Math.abs(a-b)+1,a+b-1);if((a+b+c)%2)c=c<a+b-1?c+1:c-1;return K("s8_perim","ត្រីកោណ $ABC$ មានជ្រុង $"+a+"$ , $"+b+"$ , $"+c+"$ ។ $M,N,P$ ជាចំណុចកណ្ដាលជ្រុងទាំងបី ។ គណនាបរិមាត្រ $\\triangle MNP$",[A((a+b+c)/2,null,"num","=")],"ជ្រុងនីមួយៗ $=\\dfrac12$ ជ្រុងឈម ⇒ $\\dfrac{"+(a+b+c)+"}{2}="+((a+b+c)/2)+"$")}]);
vx(17,3,[
 function(){var a=2*ri(10,80);return K("s8_bic","$I$ ជាចំណុចប្រសព្វកន្លះបន្ទាត់ពុះមុំ $B$ និង $C$ នៃ $\\triangle ABC$ ហើយ $\\widehat{BIC}="+ang(90+a/2)+"$ ។ គណនា $\\widehat A$",[A(a,null,"num","=")],"$\\widehat{BIC}=90^\\circ+\\dfrac{\\widehat A}{2}$ ⇒ $\\widehat A=2("+(90+a/2)+"-90)="+ang(a)+"$")},
 function(){var a=ri(1,6),b=ri(1,6),x=2*a+b;return K("s8_mx","$M,N$ ជាចំណុចកណ្ដាល $[AB]$ , $[AC]$ ។ $MN=x+"+a+"$ និង $BC=3x-"+b+"$ ។ រក $x$",[A(x,null,"num","x =")],"$BC=2MN$ ⇒ $3x-"+b+"=2x+"+(2*a)+"$ ⇒ $x="+x+"$")},
 function(){var a=ri(2,12);return K("s8_gx","$G$ ជាទីប្រជុំទម្ងន់ ។ មេដ្យាន $AM=3x$ និង $AG=x+"+a+"$ ។ រក $x$",[A(a,null,"num","x =")],"$AG=\\dfrac23AM=2x$ ⇒ $x+"+a+"=2x$ ⇒ $x="+a+"$")}]);
/* ១៨ រូបធរណីមាត្រមានវិមាត្របី */
vx(18,1,[
 function(){var a=ri(2,12);return K("s8_cube","គូបគែម $"+a+"$ ។ គណនាមាឌ និងផ្ទៃក្រឡាសរុប",[A(a*a*a,null,"num","V ="),A(6*a*a,null,"num","S =")],"$V="+(a*a*a)+"$ · $S=6\\times"+(a*a)+"="+(6*a*a)+"$")},
 function(){var a=ri(2,12),b=ri(2,10),c=ri(2,10);return K("s8_cuboid","ប្រលេពីប៉ែតកែង $"+a+"\\times"+b+"\\times"+c+"$ ។ គណនាមាឌ",[A(a*b*c,null,"num","V =")],"$"+(a*b*c)+"$")},
 function(){var r=ri(1,8),h=ri(2,12);return K("s8_cyl","ស៊ីឡាំងកាំបាត $"+r+"$ កម្ពស់ $"+h+"$ ។ គណនាមាឌ (ទុក $\\pi$)",[A((r*r*h)+"*pi",(r*r*h)+"\\pi","num","V =")],"$\\pi r^2h="+(r*r*h)+"\\pi$")}]);
vx(18,2,[
 function(){var a=ri(2,10),h=3*ri(1,6);return K("s8_pyrh","ពីរ៉ាមីតបាតការេជ្រុង $"+a+"$ មានមាឌ $"+(a*a*h/3)+"$ ។ គណនាកម្ពស់",[A(h,null,"num","h =")],"$h=\\dfrac{3V}{a^2}=\\dfrac{"+(a*a*h)+"}{"+(a*a)+"}="+h+"$")},
 function(){var r=ri(1,8),h=ri(2,12);return K("s8_cyls","ស៊ីឡាំងកាំបាត $"+r+"$ កម្ពស់ $"+h+"$ ។ គណនាផ្ទៃក្រឡាខាង (ទុក $\\pi$)",[A((2*r*h)+"*pi",(2*r*h)+"\\pi","num","S =")],"$2\\pi rh="+(2*r*h)+"\\pi$")},
 function(){var T=pick(TR);return K("s8_cone","កោនមានកាំបាត $"+T[0]+"$ និងកម្ពស់ $"+T[1]+"$ ។ គណនាជនេត្រ (ប្រវែងបន្ទាត់ទ្រេត)",[A(T[2],null,"num","l =")],"$l=\\sqrt{"+T[0]+"^2+"+T[1]+"^2}="+T[2]+"$")}]);
vx(18,3,[
 function(){var T=pick(TR);return K("s8_conel","កោនកាំបាត $"+T[0]+"$ កម្ពស់ $"+T[1]+"$ ។ គណនាផ្ទៃក្រឡាខាង (ទុក $\\pi$)",[A((T[0]*T[2])+"*pi",(T[0]*T[2])+"\\pi","num","S =")],"$l="+T[2]+"$ ⇒ $\\pi rl="+(T[0]*T[2])+"\\pi$")},
 function(){var b=ri(1,3),k=ri(2,5);return K("s8_melt","រំលាយគូបគែម $"+(b*k)+"$ cm ធ្វើគូបតូចៗគែម $"+b+"$ cm ។ បានប៉ុន្មានគូប?",[A(k*k*k,null,"num","=")],"$\\left(\\dfrac{"+(b*k)+"}{"+b+"}\\right)^3="+(k*k*k)+"$")},
 function(){var a=ri(10,30),b=ri(10,30),h=ri(1,5);return K("s8_disp","ធុងទឹករាងប្រលេពីប៉ែតកែង បាត $"+a+"\\times"+b+"$ cm ។ ដាក់ដុំថ្មចូល ទឹកឡើង $"+h+"$ cm (មិនហៀរ) ។ គណនាមាឌដុំថ្ម",[A(a*b*h,null,"num","V =")],"មាឌទឹកឡើង $="+a+"\\times"+b+"\\times"+h+"="+(a*b*h)+"$ cm³")}]);
/* ១៩ មាត្រដ្ឋាន */
vx(19,1,[
 function(){var n=pick([50,100,200]),c=ri(2,12);return K("s8_plan19","ប្លង់ផ្ទះមាត្រដ្ឋាន $1:"+n+"$ ។ បន្ទប់វែង $"+c+"$ cm លើប្លង់ ។ ប្រវែងពិតប៉ុន្មាន m?",[A(c*n/100,null,"num","m =")],"$"+c+"\\times"+n+"="+(c*n)+"$ cm $="+(c*n/100)+"$ m")},
 function(){var n=pick([100,500,1000,5000,10000]);return K("s8_unit","មាត្រដ្ឋាន $1:"+n+"$ មានន័យថា $1$ cm លើប្លង់ ស្មើប៉ុន្មាន m ពិត?",[A(n/100,null,"num","m =")],"$"+n+"$ cm $="+(n/100)+"$ m")},
 function(){var k=ri(2,5),a=ri(2,9);return K("s8_enl","ពង្រីករូបមួយដោយកត្តា $"+k+"$ ។ ជ្រុងដើម $"+a+"$ cm ។ ជ្រុងថ្មីប៉ុន្មាន?",[A(k*a,null,"num","=")],"$"+k+"\\times"+a+"="+(k*a)+"$ cm")}]);
vx(19,2,[
 function(){var n=pick([10,20,25]),c=ri(12,24),L=c*n/100;return K("s8_model","ឡានពិតវែង $"+L+"$ m ។ គំរូតូចមាត្រដ្ឋាន $1:"+n+"$ វែងប៉ុន្មាន cm?",[A(c,null,"num","cm =")],"$"+L+"$ m $="+(L*100)+"$ cm ⇒ $\\dfrac{"+(L*100)+"}{"+n+"}="+c+"$")},
 function(){var k=ri(2,5),S=ri(2,12);return K("s8_area2","រូបពីរដូចគ្នា ផលធៀបប្រវែង $1:"+k+"$ ។ ផ្ទៃរូបតូច $"+S+"$ cm² ។ ផ្ទៃរូបធំ?",[A(S*k*k,null,"num","=")],"ផលធៀបផ្ទៃ $=1:"+(k*k)+"$ ⇒ $"+(S*k*k)+"$")},
 function(){var a=ri(2,6),b=ri(2,6),k=ri(2,4);return K("s8_findk","ចតុកោណកែងពីរដូចគ្នា ៖ $"+a+"\\times"+b+"$ និង $"+(k*a)+"\\times x$ ។ រក $x$",[A(k*b,null,"num","x =")],"កត្តា $k=\\dfrac{"+(k*a)+"}{"+a+"}="+k+"$ ⇒ $x="+k+"\\times"+b+"="+(k*b)+"$")}]);
vx(19,3,[
 function(){var n=pick([10,20,50]),v=ri(2,20),V=v*n*n*n/1e6;return K("s8_vol19","គំរូអគារមាត្រដ្ឋាន $1:"+n+"$ មានមាឌ $"+v+"$ cm³ ។ មាឌពិតប៉ុន្មាន m³?",[A(V,null,"num","m³ =")],"ផលធៀបមាឌ $="+n+"^3$ ⇒ $"+v+"\\times"+(n*n*n)+"="+(v*n*n*n)+"$ cm³ $="+V+"$ m³")},
 function(){var a=pick([10000,20000,50000]),b=pick([100000,200000,250000]),c=ri(1,10)*b/a;return K("s8_combo","ចម្ងាយមួយ លើផែនទីមាត្រដ្ឋាន $1:"+mo(a)+"$ វាស់បាន $"+c+"$ cm ។ លើផែនទីមាត្រដ្ឋាន $1:"+mo(b)+"$ វាស់បានប៉ុន្មាន cm?",[A(c*a/b,null,"num","cm =")],"ចម្ងាយពិត $="+mo(c*a)+"$ cm ⇒ $\\dfrac{"+mo(c*a)+"}{"+mo(b)+"}="+(c*a/b)+"$")},
 function(){var k=ri(2,5),V=ri(2,10);return K("s8_vk","រូបរឹងពីរដូចគ្នា ផលធៀបប្រវែង $1:"+k+"$ ។ មាឌរូបតូច $"+V+"$ ។ មាឌរូបធំ?",[A(V*k*k*k,null,"num","=")],"ផលធៀបមាឌ $=1:"+(k*k*k)+"$ ⇒ $"+(V*k*k*k)+"$")}]);
/* គំរូដើម (គ្មាន kd) → kd = b{មេរៀន}_{កម្រិត} */
Object.keys(G).forEach(function(l){[1,2,3].forEach(function(v){var o=G[l][v];if(o)G[l][v]=function(){var x=o();if(x&&!x.kd)x.kd="b"+l+"_"+v;return x}})});

var LES=[
  ["ចំនួន",[[1,"ចំនួនសនិទាន"],[2,"ស្វ័យគុណ"],[3,"ទំហំសមាមាត្រ និងភាគរយ"],[4,"រង្វាស់រង្វាល់"]]],
  ["ពីជគណិត",[[5,"កន្សោមពីជគណិត"],[6,"កន្សោមសនិទាន"],[7,"សមីការដឺក្រេទី១មានមួយអញ្ញាត"],[8,"វិសមីការដឺក្រេទី១មានមួយអញ្ញាត"],[9,"ប្លង់កូអរដោនេ និងក្រាប"]]],
  ["ស្ថិតិ និងប្រូបាប",[[10,"ស្ថិតិ"],[11,"ប្រូបាប"]]],
  ["ធរណីមាត្រ",[[12,"ការប្រៀបធៀបត្រីកោណ"],[13,"ចតុកោណ"],[14,"ទ្រឹស្ដីបទពីតាគ័រ"],[15,"ផ្ទៃក្រឡាពហុកោណ"],[16,"រង្វង់"],[17,"បន្ទាត់ និងអង្កត់ពិសេសក្នុងត្រីកោណ"],[18,"រូបធរណីមាត្រមានវិមាត្របី"],[19,"មាត្រដ្ឋាន"]]]
];
X.reg(8,{les:LES,G:G});
})();
