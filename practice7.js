/* ========================================================================
   🧮 ហាត់លំហាត់ ថ្នាក់ទី៧ — ២២ មេរៀន × ៣ កម្រិត (បង្កើតដោយកូដ)
   លេខមេរៀនដូច curriculum7.js (1 … 22) · ត្រូវផ្ទុកបន្ទាប់ពី practice.js (window.PX)
   ======================================================================== */
(function(){
"use strict";
var X=window.PX,Q=X.Q,A=X.A,ri=X.ri,nz=X.nz,pick=X.pick,fr=X.fr,sg=X.sg,co=X.co,poly=X.poly,polyT=X.polyT,sgp=X.sgp,gcd=X.gcd;
function lcm(a,b){return a/gcd(a,b)*b}
function sum(a){return a.reduce(function(x,y){return x+y},0)}
function ft(n,d){return(n<0?"-":"")+"\\dfrac{"+Math.abs(n)+"}{"+d+"}"}
function dec(n,p){return String(n/Math.pow(10,p))}                /* ចំនួនគត់ → ទសភាគ (គ្មានកំហុសបង្គត់) */
function r2(v){return Math.round(v*100)/100}
var G={};
/* ===== ១ ចំនួនគត់ (លំដាប់ប្រមាណវិធី) ===== */
G[1]={1:function(){var a=ri(2,30),b=ri(2,9),c=ri(2,9);
    return Q("គណនា $"+a+"+"+b+"\\times"+c+"$",[A(a+b*c,null,"num","=")],"គុណមុន បូកក្រោយ៖ $"+a+"+"+(b*c)+"="+(a+b*c)+"$")},
  2:function(){var c=ri(2,6),e=ri(2,9),d=e*ri(2,9),b=ri(1,9),a=b+ri(1,9);
    return Q("គណនា $("+a+"-"+b+")\\times"+c+"+"+d+"\\div"+e+"$",[A((a-b)*c+d/e,null,"num","=")],"វង់ក្រចកមុន៖ $"+(a-b)+"\\times"+c+"+"+(d/e)+"="+((a-b)*c+d/e)+"$")},
  3:function(){var a=ri(2,9),n=pick([2,3]),b=ri(2,5),c=ri(1,6),d=ri(1,6),v=Math.pow(a,n)-b*(c+d);
    return Q("គណនា $"+a+"^"+n+"-"+b+"\\times("+c+"+"+d+")$",[A(v,null,"num","=")],"ស្វ័យគុណ → វង់ក្រចក → គុណ → ដក៖ $"+Math.pow(a,n)+"-"+(b*(c+d))+"="+v+"$")}};
/* ===== ២ គូចែក និងពហុគុណ ===== */
G[2]={1:function(){var g=ri(2,12),a=g*ri(2,9),b=g*ri(2,9);
    return Q("រកតួចែករួមធំបំផុត $\\text{PGCD}("+a+","+b+")$",[A(gcd(a,b),null,"num","PGCD =")],"បំបែកជាផលគុណកត្តាបឋម ⇒ $"+gcd(a,b)+"$")},
  2:function(){var a=ri(2,15),b=ri(2,15);while(b===a)b=ri(2,15);
    return Q("រកពហុគុណរួមតូចបំផុត $\\text{PPCM}("+a+","+b+")$",[A(lcm(a,b),null,"num","PPCM =")],"$\\text{PPCM}=\\dfrac{"+a+"\\times"+b+"}{\\text{PGCD}}="+lcm(a,b)+"$")},
  3:function(){var a=pick([10,12,15,20,30]),b=pick([12,15,18,20,25,40]);while(b===a)b=pick([12,15,18,20,25,40]);
    return Q("ឡានក្រុង A ចេញរៀងរាល់ $"+a+"$ នាទី ឡានក្រុង B ចេញរៀងរាល់ $"+b+"$ នាទី។ ម៉ោង ៧:០០ ចេញព្រមគ្នា។ ក្រោយប៉ុន្មាននាទីទៀត ទើបចេញព្រមគ្នាម្ដងទៀត?",[A(lcm(a,b),null,"num","នាទី =")],"$\\text{PPCM}("+a+","+b+")="+lcm(a,b)+"$ នាទី")}};
/* ===== ៣ ចំនួនគត់រ៉ឺឡាទីប ===== */
G[3]={1:function(){var a=nz(-20,20),b=nz(-20,20);
    return Q("គណនា $"+a+sg(b,0)+"$",[A(a+b,null,"num","=")],"$="+(a+b)+"$")},
  2:function(){var a=nz(-9,9),b=nz(-9,9),c=nz(-15,15);
    return Q("គណនា $"+sgp(a)+"\\times"+sgp(b)+"-"+sgp(c)+"$",[A(a*b-c,null,"num","=")],"$"+(a*b)+"-"+sgp(c)+"="+(a*b-c)+"$ (ដកចំនួនអវិជ្ជមាន = បូក)")},
  3:function(){var a=nz(-9,9),b=nz(-9,9),c=nz(-6,6),d=nz(-6,6),v=(a-b)*c+Math.abs(d);
    return Q("គណនា $("+a+"-"+sgp(b)+")\\times"+sgp(c)+"+|"+d+"|$",[A(v,null,"num","=")],"$"+sgp(a-b)+"\\times"+sgp(c)+"+"+Math.abs(d)+"="+v+"$")}};
/* ===== ៤ ប្រភាគ ===== */
G[4]={1:function(){var b=ri(2,9),d=ri(2,9),a=ri(1,b),c=ri(1,d),r=fr(a*d+c*b,b*d);
    return Q("គណនា $\\dfrac{"+a+"}{"+b+"}+\\dfrac{"+c+"}{"+d+"}$ (សម្រួលជាប្រភាគមិនអាចសម្រួលបាន)",[A(r.s,r.t,"num","=")],"ភាគបែងរួម $"+(b*d)+"$ ៖ $\\dfrac{"+(a*d+c*b)+"}{"+(b*d)+"}="+r.t+"$")},
  2:function(){var a=ri(1,9),b=ri(2,9),c=ri(1,9),d=ri(2,9),r=fr(a*c,b*d);
    return Q("គណនា $\\dfrac{"+a+"}{"+b+"}\\times\\dfrac{"+c+"}{"+d+"}$",[A(r.s,r.t,"num","=")],"$\\dfrac{"+a+"\\times"+c+"}{"+b+"\\times"+d+"}="+r.t+"$")},
  3:function(){var a=ri(1,9),b=ri(2,9),c=ri(1,9),d=ri(2,9),e=ri(1,5),f=ri(2,6),q=fr(a*d,b*c),r=fr(q.n*f-e*q.d,q.d*f);
    return Q("គណនា $\\dfrac{"+a+"}{"+b+"}\\div\\dfrac{"+c+"}{"+d+"}-\\dfrac{"+e+"}{"+f+"}$",[A(r.s,r.t,"num","=")],"ចែក = គុណនឹងប្រភាគច្រាស៖ $\\dfrac{"+a+"}{"+b+"}\\times\\dfrac{"+d+"}{"+c+"}="+q.t+"$ ⇒ $"+q.t+"-\\dfrac{"+e+"}{"+f+"}="+r.t+"$")}};
/* ===== ៥ ចំនួនទសភាគ ===== */
G[5]={1:function(){var a=ri(11,999),b=ri(11,999),s=pick([1,-1]);if(s<0&&b>a){var t=a;a=b;b=t}
    return Q("គណនា $"+dec(a,2)+(s>0?"+":"-")+dec(b,2)+"$",[A(dec(a+s*b,2),null,"num","=")],"តម្រង់ក្បៀសឱ្យត្រូវគ្នា ⇒ $"+dec(a+s*b,2)+"$")},
  2:function(){var a=ri(11,99),b=ri(2,99);
    return Q("គណនា $"+dec(a,1)+"\\times"+dec(b,1)+"$",[A(dec(a*b,2),null,"num","=")],"$"+a+"\\times"+b+"="+(a*b)+"$ ⇒ ខ្ទង់ក្រោយក្បៀស $1+1=2$ ⇒ $"+dec(a*b,2)+"$")},
  3:function(){var d=pick([4,5,8,20,25,40]),n=ri(1,d-1);while(gcd(n,d)!==1)n=ri(1,d-1);var v=n/d;
    return Q("សរសេរ $\\dfrac{"+n+"}{"+d+"}$ ជាចំនួនទសភាគ",[A(String(v),null,"num","=")],"$"+n+"\\div"+d+"="+v+"$")}};
/* ===== ៦ ភាគរយ ===== */
G[6]={1:function(){var p=pick([5,10,15,20,25,30,40,50,75]),N=ri(1,20)*20;
    return Q("គណនា $"+p+"\\%$ នៃ $"+N+"$",[A(N*p/100,null,"num","=")],"$"+N+"\\times\\dfrac{"+p+"}{100}="+(N*p/100)+"$")},
  2:function(){var b=pick([20,25,40,50,80,200]),p=ri(1,19)*5,a=b*p/100;while(a!==Math.round(a)){p=ri(1,19)*5;a=b*p/100}
    return Q("តើ $"+a+"$ ស្មើប៉ុន្មានភាគរយនៃ $"+b+"$?",[A(p,null,"num","% =")],"$\\dfrac{"+a+"}{"+b+"}\\times100="+p+"\\%$")},
  3:function(){var P=ri(2,30)*1000,p=pick([10,20,25,30,50]),up=Math.random()<.5,F=up?P*(100+p)/100:P*(100-p)/100;
    return Q("ទំនិញមួយតម្លៃ $"+P+"$ រៀល "+(up?"ឡើងថ្លៃ":"បញ្ចុះតម្លៃ")+" $"+p+"\\%$ ។ តើតម្លៃថ្មីប៉ុន្មានរៀល?",[A(F,null,"num","តម្លៃថ្មី =")],"$"+P+"\\times\\dfrac{100"+(up?"+":"-")+p+"}{100}="+F+"$ រៀល")}};
/* ===== ៧ ង្វាស់រង្វាល់ ===== */
G[7]={1:function(){var C=pick([["km","m",1000],["m","cm",100],["cm","mm",10],["m","mm",1000]]),v=ri(2,95);
    return Q("បំប្លែង $"+v+"\\text{ "+C[0]+"}$ ទៅជា $\\text{"+C[1]+"}$",[A(v*C[2],null,"num",C[1]+" =")],"$1\\text{ "+C[0]+"}="+C[2]+"\\text{ "+C[1]+"}$ ⇒ $"+(v*C[2])+"\\text{ "+C[1]+"}$")},
  2:function(){var C=pick([["kg","g",1000],["l","ml",1000],["t","kg",1000]]),v=ri(11,95);
    return Q("បំប្លែង $"+dec(v,1)+"\\text{ "+C[0]+"}$ ទៅជា $\\text{"+C[1]+"}$",[A(v*C[2]/10,null,"num",C[1]+" =")],"$"+dec(v,1)+"\\times"+C[2]+"="+(v*C[2]/10)+"$")},
  3:function(){var h1=ri(1,3),m1=ri(10,55),h2=ri(1,3),m2=ri(10,55),t=(h1+h2)*60+m1+m2;
    return Q("ធ្វើដំណើរ $"+h1+"$ ម៉ោង $"+m1+"$ នាទី ហើយបន្ត $"+h2+"$ ម៉ោង $"+m2+"$ នាទីទៀត។ សរុបប៉ុន្មាននាទី?",[A(t,null,"num","នាទី =")],"$("+(h1+h2)+"\\times60)+"+(m1+m2)+"="+t+"$ នាទី ($"+Math.floor(t/60)+"$ ម៉ោង $"+(t%60)+"$ នាទី)")}};
/* ===== ៨ កន្សោមពីជគណិត ===== */
G[8]={1:function(){var a=nz(-5,5),b=ri(-9,9),x=ri(-5,5);
    return Q("គណនាតម្លៃ $"+co(a,"x",true)+sg(b,0)+"$ ពេល $x="+x+"$",[A(a*x+b,null,"num","=")],"$"+a+"\\times"+sgp(x)+sg(b,0)+"="+(a*x+b)+"$")},
  2:function(){var a=nz(-6,6),b=nz(-6,6),c=ri(-9,9),d=nz(-6,6),e=[a+b-d,c];
    return Q("សម្រួល $"+co(a,"x",true)+co(b,"x")+sg(c,0)+co(-d,"x")+"$",[A(poly(e),polyT(e),"expr","=")],"បូកតួដូចគ្នា ⇒ $"+polyT(e)+"$")},
  3:function(){var a=nz(-4,4),b=nz(1,4),c=ri(-6,6),d=nz(-4,4),e=nz(1,4),f=ri(-6,6),r=[a*b-d*e,a*c-d*f];
    return Q("ពន្លាត និងសម្រួល $"+a+"("+poly([b,c])+")"+(d>0?"-":"+")+Math.abs(d)+"("+poly([e,f])+")$",[A(poly(r),polyT(r),"expr","=")],"$="+polyT([a*b,a*c])+(d>0?"-(":"+(")+polyT([Math.abs(d)*e,Math.abs(d)*f])+")="+polyT(r)+"$")}};
/* ===== ៩ សមីការដឺក្រេទីមួយ ===== */
G[9]={1:function(){var a=nz(-15,15),x=ri(-15,15);
    return Q("ដោះស្រាយ $x"+sg(a,0)+"="+(x+a)+"$",[A(x,null,"num","x =")],"$x="+(x+a)+sg(-a,0)+"="+x+"$")},
  2:function(){var a=nz(-6,6),b=ri(-12,12),x=ri(-8,8);
    return Q("ដោះស្រាយ $"+co(a,"x",true)+sg(b,0)+"="+(a*x+b)+"$",[A(x,null,"num","x =")],"$"+a+"x="+(a*x)+"$ ⇒ $x="+x+"$")},
  3:function(){var a=ri(2,6),b=ri(1,20),x=ri(2,20);
    return Q("ចំនួនមួយ គុណនឹង $"+a+"$ រួចបូក $"+b+"$ ស្មើ $"+(a*x+b)+"$ ។ រកចំនួននោះ",[A(x,null,"num","x =")],"$"+a+"x+"+b+"="+(a*x+b)+"$ ⇒ $x="+x+"$")}};
/* ===== ១០ វិសមភាព ===== */
G[10]={1:function(){var a=nz(-9,9),b=ri(-9,9);
    return Q("ដោះស្រាយ $x"+sg(a,0)+"<"+b+"$ ៖ ចម្លើយ $x<k$ ។ រក $k$",[A(b-a,null,"num","k =")],"$x<"+b+sg(-a,0)+"="+(b-a)+"$")},
  2:function(){var a=ri(2,6),b=ri(-20,20),k=fr(b,a);
    return Q("ដោះស្រាយ $"+a+"x\\ge"+b+"$ ៖ ចម្លើយ $x\\ge k$ ។ រក $k$",[A(k.s,k.t,"num","k =")],"ចែកនឹង $"+a+">0$ (សញ្ញាមិនប្ដូរ) ⇒ $x\\ge"+k.t+"$")},
  3:function(){var a=ri(2,6),b=ri(-9,9),c=ri(-9,20),q=Math.floor((c-b)/a),kk=fr(c-b,a);
    return Q("រកចំនួនគត់ធំបំផុត ដែលផ្ទៀងផ្ទាត់ $"+a+"x"+sg(b,0)+"\\le"+c+"$",[A(q,null,"num","x =")],"$x\\le"+kk.t+"$ ⇒ ចំនួនគត់ធំបំផុត $"+q+"$")}};
/* ===== ១១ ផលធៀប និងសមាមាត្រ ===== */
G[11]={1:function(){var p=ri(1,9),q=ri(1,9);while(gcd(p,q)!==1||p===q)q=ri(1,9);var k=ri(2,9);
    return Q("សម្រួលផលធៀប $"+(p*k)+":"+(q*k)+"$ ជា $a:b$ (មិនអាចសម្រួលទៀតបាន)",[A(p,null,"num","a ="),A(q,null,"num","b =")],"ចែកនឹង $"+k+"$ ⇒ $"+p+":"+q+"$")},
  2:function(){var b=ri(2,9),c=ri(2,12),k=ri(2,6);
    return Q("រក $x$ ៖ $"+(k*b)+":"+b+"=x:"+c+"$",[A(k*c,null,"num","x =")],"$x=\\dfrac{"+(k*b)+"\\times"+c+"}{"+b+"}="+(k*c)+"$")},
  3:function(){var a=ri(1,5),b=ri(1,5);while(b===a)b=ri(1,5);var m=ri(2,20)*1000,T=(a+b)*m;
    return Q("ចែកប្រាក់ $"+T+"$ រៀល ឱ្យបងប្អូនពីរនាក់ តាមផលធៀប $"+a+":"+b+"$ ។ តើម្នាក់ៗបានប៉ុន្មាន?",[A(a*m,null,"num","បង ="),A(b*m,null,"num","ប្អូន =")],"មួយចំណែក $="+T+"\\div"+(a+b)+"="+m+"$ ⇒ $"+(a*m)+"$ និង $"+(b*m)+"$")}};
/* ===== ១២ សញ្ញាណដំបូងនៃរូបធរណីមាត្រ ===== */
function segFig(a,b){var s=8/(a+b),B=r2(a*s);return"nogrid\nnoaxes\nwindow x=-1..9 y=-1..1\nA(0,0)\nB("+B+",0)\nC(8,0)\nseg A C"}
G[12]={1:function(){var a=ri(2,12),b=ri(2,12);
    return Q("ចំណុច $A, B, C$ នៅលើបន្ទាត់តែមួយតាមលំដាប់នេះ។ $AB="+a+"\\text{ cm}$ , $BC="+b+"\\text{ cm}$ ។ គណនា $AC$",[A(a+b,null,"num","AC =")],"$AC=AB+BC="+(a+b)+"\\text{ cm}$",segFig(a,b))},
  2:function(){var m=ri(2,15),a=2*m+ri(1,m-1);
    return Q("$M$ ជាចំណុចកណ្ដាលនៃអង្កត់ $[AB]$ ដែល $AB="+(2*m)+"\\text{ cm}$ ។ $C\\in[AB]$ ដែល $AC="+(a-m)+"\\text{ cm}$ ។ គណនា $AM$ និង $MC$",[A(m,null,"num","AM ="),A(a-2*m,null,"num","MC =")],"$AM=\\dfrac{AB}{2}="+m+"$ · $MC=AC-AM="+(a-2*m)+"$")},
  3:function(){var n=ri(3,10);
    return Q("មានចំណុច $"+n+"$ នៅលើបន្ទាត់តែមួយ។ តើអាចបង្កើតអង្កត់បានប៉ុន្មាន (ចុងទាំងពីរជាចំណុចទាំងនោះ)?",[A(n*(n-1)/2,null,"num","ចំនួន =")],"$\\dfrac{n(n-1)}{2}=\\dfrac{"+n+"\\times"+(n-1)+"}{2}="+(n*(n-1)/2)+"$")}};
/* ===== ១៣ មុំ ===== */
function lnFig(a){var t=a*Math.PI/180;return"nogrid\nnoaxes\nwindow x=-4..4 y=-3..3\nO(0,0)\nA(3,0)\nB("+r2(3*Math.cos(t))+","+r2(3*Math.sin(t))+")\nC(-3,0)\nD("+r2(-3*Math.cos(t))+","+r2(-3*Math.sin(t))+")\nseg C A\nseg D B\nangle A O B "+a+"°"}
G[13]={1:function(){var a=ri(10,80);
    return Q("មុំពីរបំពេញគ្នា ($90^\\circ$)។ មុំមួយស្មើ $"+a+"^\\circ$ ។ គណនាមុំមួយទៀត",[A(90-a,null,"num","=")],"$90^\\circ-"+a+"^\\circ="+(90-a)+"^\\circ$")},
  2:function(){var a=ri(15,165);
    return Q("មុំពីរបន្ថែមគ្នា ($180^\\circ$)។ មុំមួយស្មើ $"+a+"^\\circ$ ។ គណនាមុំមួយទៀត",[A(180-a,null,"num","=")],"$180^\\circ-"+a+"^\\circ="+(180-a)+"^\\circ$")},
  3:function(){var a=ri(25,80);
    return Q("បន្ទាត់ពីរ $(AC)$ និង $(BD)$ កាត់គ្នាត្រង់ $O$ ។ $\\widehat{AOB}="+a+"^\\circ$ ។ គណនា $\\widehat{BOC}$ និង $\\widehat{COD}$",[A(180-a,null,"num","∠BOC ="),A(a,null,"num","∠COD =")],"$\\widehat{BOC}=180^\\circ-"+a+"^\\circ$ (បន្ថែមគ្នា) · $\\widehat{COD}=\\widehat{AOB}$ (ទល់កំពូល)",lnFig(a))}};
/* ===== ១៤ បន្ទាត់ស្រប បន្ទាត់កែង ===== */
function trFig(a){var t=a*Math.PI/180,k=2/Math.tan(t);return"nogrid\nnoaxes\nwindow x=-5..5 y=-2.5..2.5\nP(-4,1)\nQ(4,1)\nR(-4,-1)\nS(4,-1)\nM("+r2(k/2)+",1)\nN("+r2(-k/2)+",-1)\nU("+r2(k/2+1.2/Math.tan(t))+",2.2)\nV("+r2(-k/2-1.2/Math.tan(t))+",-2.2)\nseg P Q\nseg R S\nseg V U\nangle Q M U "+a+"°"}
G[14]={1:function(){var a=ri(30,80);
    return Q("$(d_1)\\parallel(d_2)$ ហើយបន្ទាត់ $(t)$ កាត់វា។ មុំត្រូវគ្នាមួយស្មើ $"+a+"^\\circ$ ។ មុំត្រូវគ្នាមួយទៀតស្មើប៉ុន្មាន?",[A(a,null,"num","=")],"មុំត្រូវគ្នានៃបន្ទាត់ស្របស្មើគ្នា ⇒ $"+a+"^\\circ$",trFig(a))},
  2:function(){var a=ri(30,80);
    return Q("$(d_1)\\parallel(d_2)$ ។ មុំក្នុងមួយស្មើ $"+a+"^\\circ$ ។ គណនាមុំក្នុងនៅម្ខាងតែមួយនៃបន្ទាត់កាត់ (មុំក្នុងម្ខាង)",[A(180-a,null,"num","=")],"មុំក្នុងម្ខាងបន្ថែមគ្នា ⇒ $180^\\circ-"+a+"^\\circ="+(180-a)+"^\\circ$",trFig(a))},
  3:function(){var x=ri(10,30),p=ri(2,4),q=p+ri(1,2),b=ri(0,20),c=(q-p)*x+b;   /* px+c = qx+b */
    return Q("$(d_1)\\parallel(d_2)$ ។ មុំឆ្លាស់ក្នុងពីរមានរង្វាស់ $("+p+"x+"+c+")^\\circ$ និង $("+q+"x+"+b+")^\\circ$ ។ រក $x$",[A(x,null,"num","x =")],"មុំឆ្លាស់ក្នុងស្មើគ្នា៖ $"+p+"x+"+c+"="+q+"x+"+b+"$ ⇒ $x="+x+"$")}};
/* ===== ១៥ រូបធរណីមាត្រវិមាត្រពីរ (ត្រីកោណ) ===== */
G[15]={1:function(){var a=ri(20,90),b=ri(20,150-a);
    return Q("ត្រីកោណ $ABC$ មាន $\\widehat A="+a+"^\\circ$ , $\\widehat B="+b+"^\\circ$ ។ គណនា $\\widehat C$",[A(180-a-b,null,"num","∠C =")],"$180^\\circ-"+a+"^\\circ-"+b+"^\\circ="+(180-a-b)+"^\\circ$")},
  2:function(){var a=ri(30,80),b=ri(30,80);
    return Q("ត្រីកោណ $ABC$ មាន $\\widehat A="+a+"^\\circ$ , $\\widehat B="+b+"^\\circ$ ។ គណនាមុំក្រៅត្រង់កំពូល $C$",[A(a+b,null,"num","=")],"មុំក្រៅ = ផលបូកមុំក្នុងពីរមិនជាប់ ⇒ $"+(a+b)+"^\\circ$")},
  3:function(){var v=ri(10,80)*2,t=Math.random()<.5;
    return t?Q("ត្រីកោណ $ABC$ សមបាតត្រង់ $A$ មាន $\\widehat A="+v+"^\\circ$ ។ គណនា $\\widehat B$",[A((180-v)/2,null,"num","∠B =")],"$\\widehat B=\\widehat C=\\dfrac{180^\\circ-"+v+"^\\circ}{2}="+((180-v)/2)+"^\\circ$")
      :Q("ត្រីកោណ $ABC$ សមបាតត្រង់ $A$ មាន $\\widehat B="+(v/2)+"^\\circ$ ។ គណនា $\\widehat A$",[A(180-v,null,"num","∠A =")],"$\\widehat A=180^\\circ-2\\times"+(v/2)+"^\\circ="+(180-v)+"^\\circ$")}};
/* ===== ១៦ បរិមាត្រ និងផ្ទៃក្រឡាពហុកោណ ===== */
G[16]={1:function(){var a=ri(3,20),b=ri(2,15);
    return Q("ចតុកោណកែងមានបណ្ដោយ $"+a+"\\text{ cm}$ ទទឹង $"+b+"\\text{ cm}$ ។ គណនាបរិមាត្រ និងផ្ទៃក្រឡា",[A(2*(a+b),null,"num","P ="),A(a*b,null,"num","S =")],"$P=2("+a+"+"+b+")="+(2*(a+b))+"$ · $S="+a+"\\times"+b+"="+(a*b)+"$","nogrid\nA(0,0)\nB("+a+",0)\nC("+a+","+b+")\nD(0,"+b+")\npoly A B C D")},
  2:function(){var b=ri(2,20),h=ri(2,16);
    return Q("ត្រីកោណមានបាត $"+b+"\\text{ cm}$ និងកម្ពស់ $"+h+"\\text{ cm}$ ។ គណនាផ្ទៃក្រឡា",[A(b*h/2,null,"num","S =")],"$S=\\dfrac{"+b+"\\times"+h+"}{2}="+(b*h/2)+"$")},
  3:function(){var a=ri(4,20),b=ri(2,a-1),h=ri(2,12);
    return Q("ចតុកោណព្នាយមានបាតធំ $"+a+"$ បាតតូច $"+b+"$ និងកម្ពស់ $"+h+"$ ។ គណនាផ្ទៃក្រឡា",[A((a+b)*h/2,null,"num","S =")],"$S=\\dfrac{("+a+"+"+b+")\\times"+h+"}{2}="+((a+b)*h/2)+"$")}};
/* ===== ១៧ រង្វង់ (ចម្លើយទុក π) ===== */
G[17]={1:function(){var r=ri(2,15);
    return Q("គណនាបរិមាត្ររង្វង់កាំ $"+r+"\\text{ cm}$ (ទុក $\\pi$ ឧ. $10\\pi$ ឬវាយ $10pi$)",[A(2*r+"*pi",(2*r)+"\\pi","num","C =")],"$C=2\\pi r="+(2*r)+"\\pi$","nogrid\nnoaxes\ncircle O "+r+"\nO(0,0)\nM("+r+",0)\nseg O M red")},
  2:function(){var r=ri(2,12),d=Math.random()<.5;
    return Q("គណនាផ្ទៃក្រឡាថាសមាន"+(d?"អង្កត់ផ្ចិត $"+(2*r):"កាំ $"+r)+"\\text{ cm}$ (ទុក $\\pi$)",[A(r*r+"*pi",(r*r)+"\\pi","num","S =")],(d?"$r="+r+"$ ⇒ ":"")+"$S=\\pi r^2="+(r*r)+"\\pi$")},
  3:function(){var r=ri(2,20);
    return Q("រង្វង់មួយមានបរិមាត្រ $"+(2*r)+"\\pi\\text{ cm}$ ។ គណនាកាំ និងអង្កត់ផ្ចិត",[A(r,null,"num","r ="),A(2*r,null,"num","d =")],"$2\\pi r="+(2*r)+"\\pi$ ⇒ $r="+r+"$ · $d=2r="+(2*r)+"$")}};
/* ===== ១៨ មាឌ និងផ្ទៃក្រឡាខាងនៃសូលីត ===== */
G[18]={1:function(){var a=ri(2,12),b=ri(2,10),c=ri(2,10);
    return Q("ប្រអប់រាងប្រលេពីប៉ែតកែង មានវិមាត្រ $"+a+"\\times"+b+"\\times"+c+"\\text{ cm}$ ។ គណនាមាឌ",[A(a*b*c,null,"num","V =")],"$V=a\\times b\\times c="+(a*b*c)+"\\text{ cm}^3$")},
  2:function(){var a=ri(2,12),b=ri(2,10),c=ri(2,10);
    return Q("ប្រលេពីប៉ែតកែង $"+a+"\\times"+b+"$ (បាត) កម្ពស់ $"+c+"$ ។ គណនាផ្ទៃក្រឡាខាង និងផ្ទៃក្រឡាសរុប",[A(2*(a+b)*c,null,"num","ខាង ="),A(2*(a+b)*c+2*a*b,null,"num","សរុប =")],"ផ្ទៃខាង $=2("+a+"+"+b+")\\times"+c+"="+(2*(a+b)*c)+"$ · សរុប = ផ្ទៃខាង $+2\\times"+(a*b)+"="+(2*(a+b)*c+2*a*b)+"$")},
  3:function(){var a=ri(2,10);
    return Q("គូបមួយមានមាឌ $"+(a*a*a)+"\\text{ cm}^3$ ។ គណនាប្រវែងគែម និងផ្ទៃក្រឡាសរុប",[A(a,null,"num","a ="),A(6*a*a,null,"num","S =")],"$a=\\sqrt[3]{"+(a*a*a)+"}="+a+"$ · $S=6a^2="+(6*a*a)+"$")}};
/* ===== ១៩ ភាពឆ្លុះ ===== */
var SY=[["ការេ",4],["ចតុកោណកែង (មិនមែនការេ)",2],["ត្រីកោណសម័ង្ស",3],["ត្រីកោណសមបាត (មិនសម័ង្ស)",1],["ចតុកោណស្មើ (មិនមែនការេ)",2],["ឆកោណនិយ័ត",6],["បញ្ចកោណនិយ័ត",5],["ប្រលេឡូក្រាម (ធម្មតា)",0]];
G[19]={1:function(){var a=ri(2,15);
    return Q("$A'$ ជាចំណុចឆ្លុះនៃ $A$ ធៀបនឹងចំណុច $O$ ។ បើ $OA="+a+"\\text{ cm}$ គណនា $AA'$",[A(2*a,null,"num","AA' =")],"$O$ ជាចំណុចកណ្ដាលនៃ $[AA']$ ⇒ $AA'=2\\times"+a+"="+(2*a)+"$","nogrid\nnoaxes\nwindow x=-5..5 y=-2..2\nA(-4,1)\nO(0,0)\nseg A O")},
  2:function(){var a=ri(2,15);
    return Q("$A'$ ជាចំណុចឆ្លុះនៃ $A$ ធៀបនឹងបន្ទាត់ $(d)$ ។ ចម្ងាយពី $A$ ទៅ $(d)$ ស្មើ $"+a+"\\text{ cm}$ ។ គណនា $AA'$",[A(2*a,null,"num","AA' =")],"$(d)$ ជាមេដ្យាទ័រនៃ $[AA']$ ⇒ $AA'="+(2*a)+"$","nogrid\nnoaxes\nwindow x=-4..4 y=-3..3\nP(0,-3)\nR(0,3)\nseg P R gray\nA(-2.5,1)")},
  3:function(){var s=pick(SY);
    return Q("តើ"+s[0]+"មានអ័ក្សឆ្លុះប៉ុន្មាន?",[A(s[1],null,"num","ចំនួន =")],s[0]+"មានអ័ក្សឆ្លុះ $"+s[1]+"$")}};
/* ===== ២០ ប្រូបាប ===== */
G[20]={1:function(){var C=pick([["ចំនួនគូ",3],["ចំនួនសេស",3],["លេខ ៦",1],["លេខធំជាង ៤",2],["លេខតូចជាង ៥",4]]),p=fr(C[1],6);
    return Q("បោះគ្រាប់ឡុកឡាក់មួយ។ តើប្រូបាបដែលចេញ"+C[0]+"ស្មើប៉ុន្មាន?",[A(p.s,p.t,"num","P =")],"$P=\\dfrac{"+C[1]+"}{6}="+p.t+"$")},
  2:function(){var r=ri(1,9),b=ri(1,9),p=fr(r,r+b);
    return Q("ប្រអប់មួយមានបាល់ក្រហម $"+r+"$ និងបាល់ស $"+b+"$ ។ ចាប់បាល់មួយដោយចៃដន្យ។ ប្រូបាបដែលបានបាល់ក្រហម?",[A(p.s,p.t,"num","P =")],"$P=\\dfrac{"+r+"}{"+(r+b)+"}="+p.t+"$")},
  3:function(){var n=ri(10,30),k=ri(2,5),c=Math.floor(n/k),p=fr(c,n);
    return Q("កាតលេខពី $1$ ដល់ $"+n+"$ ។ ចាប់កាតមួយ។ ប្រូបាបដែលលេខជាពហុគុណនៃ $"+k+"$?",[A(p.s,p.t,"num","P =")],"មានពហុគុណនៃ $"+k+"$ ចំនួន $"+c+"$ ⇒ $P=\\dfrac{"+c+"}{"+n+"}="+p.t+"$")}};
/* ===== ២១ ក្រាបសសរ ===== */
function bars(xs,f){return"bar "+xs.map(function(x,i){return x+":"+f[i]}).join(" ")}
G[21]={1:function(){var xs=[1,2,3,4,5],f=xs.map(function(){return ri(1,12)}),k=ri(0,4);
    return Q("ក្រាបសសរបង្ហាញចំនួនសៀវភៅដែលសិស្សខ្ចីក្នុងសប្ដាហ៍ទី $1$ ដល់ $5$ ។ តើសប្ដាហ៍ទី $"+xs[k]+"$ ខ្ចីប៉ុន្មានក្បាល?",[A(f[k],null,"num","=")],"អានកម្ពស់សសរ ⇒ $"+f[k]+"$",bars(xs,f))},
  2:function(){var xs=[1,2,3,4,5],f=xs.map(function(){return ri(1,12)}),i=f.indexOf(Math.max.apply(null,f)),j=f.indexOf(Math.min.apply(null,f));
    return Q("ពីក្រាបខាងក្រោម តើសប្ដាហ៍ខ្ចីច្រើនបំផុត ខ្ចីច្រើនជាងសប្ដាហ៍ខ្ចីតិចបំផុតប៉ុន្មានក្បាល?",[A(f[i]-f[j],null,"num","=")],"$"+f[i]+"-"+f[j]+"="+(f[i]-f[j])+"$",bars(xs,f))},
  3:function(){var xs=[1,2,3,4,5],f=xs.map(function(){return ri(1,12)}),m=fr(sum(f),5);
    return Q("ពីក្រាបខាងក្រោម គណនាចំនួនសរុប និងមធ្យមក្នុងមួយសប្ដាហ៍",[A(sum(f),null,"num","សរុប ="),A(m.s,m.t,"num","មធ្យម =")],"សរុប $="+f.join("+")+"="+sum(f)+"$ · មធ្យម $="+m.t+"$",bars(xs,f))}};
/* ===== ២២ ក្រាបចំណិត ===== */
var SP=[["បាល់ទាត់","បាល់ទះ","រត់","ហែលទឹក"],["គណិត","ខ្មែរ","វិទ្យា","អង់គ្លេស"],["ក្រហម","ខៀវ","បៃតង","លឿង"]];
function parts(){var u=[1,1,1,1];for(var i=0;i<8;i++)u[ri(0,3)]++;return u}   /* ៤ ចំណែក ផលបូក ១២ (មួយចំណែក = ៣០°) */
function pie(lb,u,ang){return"pie "+u.map(function(x,i){return x+":"+lb[i]+(ang?"_"+(x*30)+"°":"")}).join(" ")}
G[22]={1:function(){var lb=pick(SP),u=parts(),k=ri(0,3),p=fr(u[k]*30*100,360);
    return Q("ក្រាបចំណិតបង្ហាញមុខវិជ្ជា/ចំណង់ចំណូលចិត្តរបស់សិស្ស។ តើ «"+lb[k]+"» មានប៉ុន្មានភាគរយ?",[A(p.s,p.t,"num","% =")],"$\\dfrac{"+(u[k]*30)+"^\\circ}{360^\\circ}\\times100="+p.t+"\\%$",pie(lb,u,true))},
  2:function(){var lb=pick(SP),u=parts(),k=ri(0,3),m=ri(2,6),N=12*m;
    return Q("សិស្សសរុប $"+N+"$ នាក់។ ពីក្រាបចំណិត តើប៉ុន្មាននាក់ជ្រើស «"+lb[k]+"»?",[A(u[k]*m,null,"num","ចំនួន =")],"$"+N+"\\times\\dfrac{"+(u[k]*30)+"}{360}="+(u[k]*m)+"$ នាក់",pie(lb,u,true))},
  3:function(){var lb=pick(SP),u=parts(),k=ri(0,3),m=ri(2,5),c=u.map(function(x){return x*m}),N=12*m;
    return Q("ក្នុងចំណោមសិស្ស $"+N+"$ នាក់ ៖ "+lb.map(function(l,i){return l+" $"+c[i]+"$"}).join(" · ")+" ។ បើសង់ក្រាបចំណិត តើមុំផ្ចិតនៃ «"+lb[k]+"» ស្មើប៉ុន្មានដឺក្រេ?",[A(u[k]*30,null,"num","មុំ =")],"$\\dfrac{"+c[k]+"}{"+N+"}\\times360^\\circ="+(u[k]*30)+"^\\circ$",pie(lb,u,false))}};

var LES=[
  ["ចំនួន",[[1,"ចំនួនគត់"],[2,"គូចែក និងពហុគុណ"],[3,"ចំនួនគត់រ៉ឺឡាទីប"],[4,"ប្រភាគ"],[5,"ចំនួនទសភាគ"],[6,"ភាគរយ"],[7,"ង្វាស់រង្វាល់"]]],
  ["ពីជគណិត",[[8,"កន្សោមពីជគណិត"],[9,"សមីការដឺក្រេទីមួយមានមួយអញ្ញាត"],[10,"វិសមភាព"],[11,"ផលធៀប និងសមាមាត្រ"]]],
  ["ធរណីមាត្រ",[[12,"សញ្ញាណដំបូងនៃរូបធរណីមាត្រ"],[13,"មុំ"],[14,"បន្ទាត់ស្រប បន្ទាត់កែង"],[15,"រូបធរណីមាត្រវិមាត្រពីរ"],[16,"បរិមាត្រ និងផ្ទៃក្រឡាពហុកោណ"],[17,"រង្វង់"],[18,"មាឌ និងផ្ទៃក្រឡាខាងនៃសូលីត"],[19,"ភាពឆ្លុះ"]]],
  ["ប្រូបាប និងស្ថិតិ",[[20,"ប្រូបាប"],[21,"ក្រាបសសរ"],[22,"ក្រាបចំណិត"]]]
];
X.reg(7,{les:LES,G:G});
})();
