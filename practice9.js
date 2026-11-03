/* ========================================================================
   🧮 ហាត់លំហាត់ ថ្នាក់ទី៩ — ១៨ មេរៀន × ៣ កម្រិត (បង្កើតដោយកូដ)
   លេខមេរៀនដូច curriculum9.js (1 … 18) · ត្រូវផ្ទុកបន្ទាប់ពី practice.js (window.PX)
   ======================================================================== */
(function(){
"use strict";
var X=window.PX,Q=X.Q,A=X.A,ri=X.ri,nz=X.nz,pick=X.pick,fr=X.fr,sg=X.sg,co=X.co,poly=X.poly,polyT=X.polyT,sgp=X.sgp,gcd=X.gcd;
function pt(p){return"("+p[0]+";"+p[1]+")"}
function lcm(a,b){return a/gcd(a,b)*b}
function sum(a){return a.reduce(function(x,y){return x+y},0)}
function r2(v){return Math.round(v*100)/100}
function onC(deg,R){var t=deg*Math.PI/180;return r2(R*Math.cos(t))+","+r2(R*Math.sin(t))}   /* ចំណុចលើរង្វង់ផ្ចិត O */
function money(v){return String(v).replace(/\B(?=(\d{3})+(?!\d))/g,"\\,")}
var TR=[[3,4,5],[6,8,10],[5,12,13],[8,15,17],[9,12,15]];
var G={};
/* ===== ១ រ៉ាឌីកាល់ ===== */
G[1]={1:function(){var a=ri(2,15),b=nz(-5,5);
    return Q("គណនា $\\sqrt{"+(a*a)+"}$ និង $\\sqrt[3]{"+(b*b*b)+"}$",[A(a,null,"num","√ ="),A(b,null,"num","∛ =")],"$\\sqrt{"+(a*a)+"}="+a+"$ ព្រោះ $"+a+"^2="+(a*a)+"$ · $\\sqrt[3]{"+(b*b*b)+"}="+b+"$ ព្រោះ $"+sgp(b)+"^3="+(b*b*b)+"$")},
  2:function(){var k=pick([2,3,5,6,7]),m=ri(1,5),n=ri(1,5),s=pick([1,-1]),c=m+s*n;if(!c){s=1;c=m+n}
    return Q("សម្រួល $\\sqrt{"+(m*m*k)+"}"+(s>0?"+":"-")+"\\sqrt{"+(n*n*k)+"}$ ជាទម្រង់ $c\\sqrt{"+k+"}$ ។ រក $c$",[A(c,null,"num","c =")],"$="+(m===1?"":m)+"\\sqrt{"+k+"}"+(s>0?"+":"-")+(n===1?"":n)+"\\sqrt{"+k+"}="+c+"\\sqrt{"+k+"}$")},
  3:function(){var k,m,d;do{k=pick([2,3,5,6,7,10,11]);m=ri(1,3);d=k-m*m}while(!d);var t=d*ri(1,3),q=t/d;
    var ans=q+"*(sqrt("+k+")+"+m+")",tex=(q===1?"":q===-1?"-":q)+(q===1||q===-1?"":"(")+"\\sqrt{"+k+"}+"+m+(q===1||q===-1?"":")");
    if(q===-1)tex="-\\sqrt{"+k+"}-"+m;
    return Q("បំបាត់រ៉ាឌីកាល់ពីភាគបែង៖ $\\dfrac{"+t+"}{\\sqrt{"+k+"}-"+m+"}$",[A(ans,tex,"num","=")],"គុណភាគយក និងភាគបែងនឹង $\\sqrt{"+k+"}+"+m+"$ ៖ $\\dfrac{"+t+"(\\sqrt{"+k+"}+"+m+")}{"+k+"-"+(m*m)+"}="+tex+"$")}};
/* ===== ២ សមាមាត្រ ===== */
G[2]={1:function(){var b=ri(2,9),c=ri(2,12),k=ri(2,6),a=k*b,x=k*c;
    return Q("រក $x$ ៖ $\\dfrac{"+a+"}{"+b+"}=\\dfrac{x}{"+c+"}$",[A(x,null,"num","x =")],"ផលគុណឆ្កាង៖ $x=\\dfrac{"+a+"\\cdot"+c+"}{"+b+"}="+x+"$")},
  2:function(){var P=ri(4,40)*1000,p=pick([10,15,20,25,30,40,50]),F=P*(100-p)/100;
    return Q("អាវមួយតម្លៃ $"+money(P)+"$ រៀល បញ្ចុះតម្លៃ $"+p+"\\%$ ។ តើត្រូវបង់ប៉ុន្មានរៀល?",[A(F,null,"num","តម្លៃ =")],"$"+money(P)+"\\times\\dfrac{100-"+p+"}{100}="+money(F)+"$ រៀល")},
  3:function(){var C=ri(2,20)*100000,r=pick([4,5,6,8,10,12]),n=ri(1,5),T=C+C*r*n/100;
    return Q("ដាក់ប្រាក់ $"+money(C)+"$ រៀល ក្នុងធនាគារ ការប្រាក់សាមញ្ញ $"+r+"\\%$ ក្នុងមួយឆ្នាំ។ ក្រោយ $"+n+"$ ឆ្នាំ តើមានប្រាក់សរុបប៉ុន្មាន?",[A(T,null,"num","សរុប =")],"ការប្រាក់ $="+money(C)+"\\times\\dfrac{"+r+"}{100}\\times"+n+"="+money(C*r*n/100)+"$ ⇒ សរុប $"+money(T)+"$ រៀល")}};
/* ===== ៣ កន្សោមពីជគណិត ===== */
G[3]={1:function(){var a=nz(1,3),b=nz(-6,6),e=[a*a,2*a*b,b*b];
    return Q("ពន្លាត $("+poly([a,b])+")^2$",[A(poly(e),polyT(e),"expr","=")],"$(a+b)^2=a^2+2ab+b^2$ ⇒ $"+polyT(e)+"$")},
  2:function(){var m=nz(-7,7),n=nz(-7,7);if(m>n){var t=m;m=n;n=t}
    return Q("ដាក់ជាផលគុណកត្តា $x^2"+co(m+n,"x")+sg(m*n,0)+"=(x+m)(x+n)$ ដែល $m\\le n$ ។ រក $m$, $n$",[A(m,null,"num","m ="),A(n,null,"num","n =")],"រកចំនួនពីរ ផលបូក $"+(m+n)+"$ ផលគុណ $"+(m*n)+"$ ⇒ $(x"+sg(m,0)+")(x"+sg(n,0)+")$")},
  3:function(){var p=nz(-6,6),q=nz(-6,6);while(q===p)q=nz(-6,6);
    return Q("សម្រួលកន្សោម $\\dfrac{x^2"+co(p+q,"x")+sg(p*q,0)+"}{x"+sg(p,0)+"}$ (ដែល $x\\ne"+(-p)+"$)",[A("x"+sg(q,0),null,"expr","=")],"$\\dfrac{(x"+sg(p,0)+")(x"+sg(q,0)+")}{x"+sg(p,0)+"}=x"+sg(q,0)+"$")}};
/* ===== ៤ សមីការដឺក្រេទី១ ===== */
G[4]={1:function(){var a=nz(-6,6),x=ri(-8,8),b=ri(-10,10);
    return Q("ដោះស្រាយ $"+co(a,"x",true)+sg(b,0)+"="+(a*x+b)+"$",[A(x,null,"num","x =")],"$"+a+"x="+(a*x)+"$ ⇒ $x="+x+"$")},
  2:function(){var a=nz(-6,6),c=nz(-6,6);while(c===a)c=nz(-6,6);var x=ri(-6,6),b=ri(-9,9),d=(a-c)*x+b;
    return Q("ដោះស្រាយ $"+co(a,"x",true)+sg(b,0)+"="+co(c,"x",true)+sg(d,0)+"$",[A(x,null,"num","x =")],"$"+(a-c)+"x="+(d-b)+"$ ⇒ $x="+x+"$")},
  3:function(){var a=pick([2,3,4,5,6]),b=pick([2,3,4,5,6]);while(b===a)b=pick([2,3,4,5,6]);var x=lcm(a,b)*ri(1,4),c=x/a+x/b;
    return Q("ដោះស្រាយ $\\dfrac{x}{"+a+"}+\\dfrac{x}{"+b+"}="+c+"$",[A(x,null,"num","x =")],"គុណអង្គទាំងពីរនឹង $"+lcm(a,b)+"$ ៖ $"+(lcm(a,b)/a+lcm(a,b)/b)+"x="+(c*lcm(a,b))+"$ ⇒ $x="+x+"$")}};
/* ===== ៥ វិសមីការដឺក្រេទី១ ===== */
G[5]={1:function(){var a=ri(2,6),b=ri(-9,9),c=ri(-9,9),k=fr(c-b,a);
    return Q("ដោះស្រាយ $"+a+"x"+sg(b,0)+"<"+c+"$ ៖ ចម្លើយ $x<k$ ។ រក $k$",[A(k.s,k.t,"num","k =")],"$"+a+"x<"+(c-b)+"$ ⇒ $x<"+k.t+"$","y="+a+"x"+sg(b,0)+"\ny="+c+" red")},
  2:function(){var a=-ri(2,6),b=ri(-9,9),c=ri(-9,9),k=fr(c-b,a);
    return Q("ដោះស្រាយ $"+a+"x"+sg(b,0)+"\\le "+c+"$ ៖ ចម្លើយ $x\\ge k$ ។ រក $k$",[A(k.s,k.t,"num","k =")],"$"+a+"x\\le"+(c-b)+"$ ⇒ ចែកនឹង $"+a+"<0$ ត្រូវប្ដូរសញ្ញា ⇒ $x\\ge"+k.t+"$")},
  3:function(){var c=ri(1,4),a=c+ri(1,4),b=ri(-9,9),d=ri(-9,9),q=(d-b)/(a-c),big=Math.ceil(q)-1,kk=fr(d-b,a-c);
    return Q("រកចំនួនគត់ធំបំផុត ដែលផ្ទៀងផ្ទាត់ $"+co(a,"x",true)+sg(b,0)+"<"+co(c,"x",true)+sg(d,0)+"$",[A(big,null,"num","x =")],"$"+(a-c)+"x<"+(d-b)+"$ ⇒ $x<"+kk.t+"$ ⇒ ចំនួនគត់ធំបំផុត $"+big+"$")}};
/* ===== ៦ បំណែងចែកប្រេកង់ ===== */
function bars(xs,f){return"bar "+xs.map(function(x,i){return x+":"+f[i]}).join(" ")}
G[6]={1:function(){var xs=[5,6,7,8,9,10],f=xs.map(function(){return ri(1,9)});
    return Q("ក្រាបខាងក្រោមបង្ហាញពិន្ទុ ($x$) និងចំនួនសិស្ស (ប្រេកង់)។ តើមានសិស្សសរុបប៉ុន្មាននាក់?",[A(sum(f),null,"num","N =")],"$N="+f.join("+")+"="+sum(f)+"$",bars(xs,f))},
  2:function(){var xs=[5,6,7,8,9,10],f=xs.map(function(){return ri(1,9)}),k=ri(0,5),r=fr(f[k]*100,sum(f));
    return Q("ពីក្រាប គណនាប្រេកង់ធៀប (%) នៃពិន្ទុ $"+xs[k]+"$ (អាចបង្គត់ ២ ខ្ទង់ក្បៀស)",[A(r.s,r.t,"num","% =")],"$\\dfrac{"+f[k]+"}{"+sum(f)+"}\\times100\\approx"+(Math.round(r.n/r.d*100)/100)+"\\%$",bars(xs,f))},
  3:function(){var xs=[5,6,7,8,9,10],f=xs.map(function(){return ri(1,9)}),k=ri(1,4),c=sum(f.slice(0,k+1));
    return Q("ពីក្រាប តើមានសិស្សប៉ុន្មាននាក់ ដែលបានពិន្ទុ $\\le "+xs[k]+"$ (ប្រេកង់កើន)?",[A(c,null,"num","ចំនួន =")],"$"+f.slice(0,k+1).join("+")+"="+c+"$",bars(xs,f))}};
/* ===== ៧ មធ្យមស្ថិតិ ===== */
function sample(n,lo,hi){var a=[];for(var i=0;i<n;i++)a.push(ri(lo,hi));return a}
G[7]={1:function(){var a=sample(ri(5,7),2,20),m=fr(sum(a),a.length);
    return Q("គណនាមធ្យមនព្វន្តនៃ $"+a.join(",\\ ")+"$",[A(m.s,m.t,"num","x̄ =")],"$\\bar x=\\dfrac{"+sum(a)+"}{"+a.length+"}="+m.t+"$")},
  2:function(){var n=pick([5,6,7,8]),a=sample(n,1,30),s=a.slice().sort(function(x,y){return x-y}),md=n%2?s[(n-1)/2]:fr(s[n/2-1]+s[n/2],2).s;
    return Q("រកមេដ្យាននៃ $"+a.join(",\\ ")+"$",[A(md,null,"num","Me =")],"តម្រៀប៖ $"+s.join(",")+"$ ⇒ $Me="+md+"$")},
  3:function(){var n=ri(4,6),a=sample(n,4,18),m=ri(8,14),x=m*(n+1)-sum(a);while(x<0||x>30){a=sample(n,4,18);x=m*(n+1)-sum(a)}
    return Q("ទិន្នន័យ $"+a.join(",\\ ")+",\\ x$ មានមធ្យមនព្វន្ត $"+m+"$ ។ រក $x$",[A(x,null,"num","x =")],"$\\dfrac{"+sum(a)+"+x}{"+(n+1)+"}="+m+"$ ⇒ $x="+(m*(n+1))+"-"+sum(a)+"="+x+"$")}};
/* ===== ៨ ប្រូបាប ===== */
G[8]={1:function(){var C=pick([["ចំនួនគូ",[2,4,6]],["ចំនួនសេស",[1,3,5]],["ពហុគុណនៃ ៣",[3,6]],["ធំជាង ៤",[5,6]],["តូចជាង ៣",[1,2]],["ចំនួនបឋម",[2,3,5]]]),p=fr(C[1].length,6);
    return Q("បោះគ្រាប់ឡុកឡាក់មួយ។ គណនាប្រូបាបដែលចេញ "+C[0],[A(p.s,p.t,"num","P =")],"ករណីស្រប $\\{"+C[1].join(",")+"\\}$ ⇒ $P=\\dfrac{"+C[1].length+"}{6}="+p.t+"$")},
  2:function(){var r=ri(1,8),b=ri(1,8),g=ri(1,8),T=r+b+g,p=fr(r+g,T);
    return Q("ថង់មួយមានឃ្លីក្រហម $"+r+"$ ខៀវ $"+b+"$ បៃតង $"+g+"$ ។ ចាប់ឃ្លីមួយដោយចៃដន្យ។ គណនាប្រូបាបដែលមិនមែនពណ៌ខៀវ",[A(p.s,p.t,"num","P =")],"$P=\\dfrac{"+(r+g)+"}{"+T+"}="+p.t+"$")},
  3:function(){var s=ri(2,12),n=6-Math.abs(s-7),p=fr(n,36);
    return Q("បោះគ្រាប់ឡុកឡាក់ពីរ។ គណនាប្រូបាបដែលផលបូកលេខស្មើ $"+s+"$",[A(p.s,p.t,"num","P =")],"ករណីអាចមាន $36$ · ករណីស្រប $"+n+"$ ⇒ $P="+p.t+"$")}};
/* ===== ៩ ចម្ងាយរវាងពីរចំណុច ===== */
G[9]={1:function(){var T=pick(TR.slice(0,3)),P=[ri(-4,3),ri(-4,3)],s=[pick([1,-1]),pick([1,-1])],B=[P[0]+s[0]*T[0],P[1]+s[1]*T[1]];
    return Q("គណនាចម្ងាយ $AB$ ដែល $A"+pt(P)+"$ , $B"+pt(B)+"$",[A(T[2],null,"num","AB =")],"$AB=\\sqrt{("+B[0]+sg(-P[0],0)+")^2+("+B[1]+sg(-P[1],0)+")^2}="+T[2]+"$","A("+P[0]+","+P[1]+")\nB("+B[0]+","+B[1]+")\nseg A B")},
  2:function(){var P=[ri(-4,4),ri(-4,4)],dx=nz(-4,4),dy=nz(-4,4),B=[P[0]+dx,P[1]+dy],d2=dx*dx+dy*dy,r=Math.round(Math.sqrt(d2));
    return Q("គណនាចម្ងាយ $AB$ ដែល $A"+pt(P)+"$ , $B"+pt(B)+"$ (សរសេរជា $\\sqrt{\\ }$ បាន)",[A(r*r===d2?r:"sqrt("+d2+")",r*r===d2?String(r):"\\sqrt{"+d2+"}","num","AB =")],"$AB=\\sqrt{"+(dx*dx)+"+"+(dy*dy)+"}="+(r*r===d2?r:"\\sqrt{"+d2+"}")+"$","A("+P[0]+","+P[1]+")\nB("+B[0]+","+B[1]+")\nseg A B")},
  3:function(){var T=pick(TR.slice(0,3)),P=[ri(-3,3),ri(-4,0)],x=P[0]+pick([1,-1])*T[0],y=P[1]+T[1];
    return Q("$A"+pt(P)+"$ និង $B("+x+";m)$ ដែល $m>"+P[1]+"$ ។ រក $m$ ដើម្បីឱ្យ $AB="+T[2]+"$",[A(y,null,"num","m =")],"$("+(x-P[0])+")^2+(m"+sg(-P[1],0)+")^2="+(T[2]*T[2])+"$ ⇒ $m"+sg(-P[1],0)+"="+T[1]+"$ ⇒ $m="+y+"$")}};
/* ===== ១០ សមីការបន្ទាត់ ===== */
G[10]={1:function(){var P=[ri(-4,4),ri(-4,4)],dx=nz(-4,4),dy=ri(-6,6),B=[P[0]+dx,P[1]+dy],m=fr(dy,dx);
    return Q("រកមេគុណប្រាប់ទិស (ស្លូប) $a$ នៃបន្ទាត់កាត់តាម $A"+pt(P)+"$ និង $B"+pt(B)+"$",[A(m.s,m.t,"num","a =")],"$a=\\dfrac{y_B-y_A}{x_B-x_A}=\\dfrac{"+dy+"}{"+dx+"}="+m.t+"$","A("+P[0]+","+P[1]+")\nB("+B[0]+","+B[1]+")\nline A B")},
  2:function(){var a=nz(-3,3),P=[ri(-4,4),ri(-4,4)],b=P[1]-a*P[0];
    return Q("បន្ទាត់ $y="+co(a,"x",true)+"+b$ កាត់តាម $A"+pt(P)+"$ ។ រក $b$",[A(b,null,"num","b =")],"$"+P[1]+"="+a+"\\cdot"+sgp(P[0])+"+b$ ⇒ $b="+b+"$","y="+a+"x"+sg(b,0)+"\nA("+P[0]+","+P[1]+")")},
  3:function(){var a=nz(-3,3),b=ri(-4,4),x1=ri(-3,1),x2=x1+ri(1,3),P=[x1,a*x1+b],B=[x2,a*x2+b];
    return Q("សរសេរសមីការបន្ទាត់ $y=ax+b$ កាត់តាម $A"+pt(P)+"$ និង $B"+pt(B)+"$",[A(a,null,"num","a ="),A(b,null,"num","b =")],"$a=\\dfrac{"+(B[1]-P[1])+"}{"+(x2-x1)+"}="+a+"$ · $b=y_A-ax_A="+b+"$","A("+P[0]+","+P[1]+")\nB("+B[0]+","+B[1]+")")}};
/* ===== ១១ ប្រព័ន្ធសមីការ ===== */
G[11]={1:function(){var x=ri(-6,9),y=ri(-6,9);
    return Q("ដោះស្រាយ $\\begin{cases}x+y="+(x+y)+"\\\\x-y="+(x-y)+"\\end{cases}$",[A(x,null,"num","x ="),A(y,null,"num","y =")],"បូកសមីការ៖ $2x="+(2*x)+"$ ⇒ $x="+x+"$ ⇒ $y="+y+"$")},
  2:function(){var x=ri(-5,5),y=ri(-5,5),a=nz(-4,4),b=nz(-4,4),c=nz(-4,4),d=nz(-4,4);while(a*d-b*c===0)d=nz(-4,4);
    return Q("ដោះស្រាយ $\\begin{cases}"+co(a,"x",true)+co(b,"y")+"="+(a*x+b*y)+"\\\\"+co(c,"x",true)+co(d,"y")+"="+(c*x+d*y)+"\\end{cases}$",[A(x,null,"num","x ="),A(y,null,"num","y =")],"ដោយការជំនួស ឬបូកលុប ⇒ $(x;y)=("+x+";"+y+")$","y=("+(a*x+b*y)+"-("+a+")x)/("+b+")\ny=("+(c*x+d*y)+"-("+c+")x)/("+d+") red")},
  3:function(){var c=ri(5,20),r=ri(3,15);
    return Q("ក្នុងទ្រុងមួយមានមាន់ និងទន្សាយ។ រាប់ក្បាលបាន $"+(c+r)+"$ និងជើងបាន $"+(2*c+4*r)+"$ ។ តើមានមាន់ និងទន្សាយប៉ុន្មាន?",[A(c,null,"num","មាន់ ="),A(r,null,"num","ទន្សាយ =")],"$\\begin{cases}x+y="+(c+r)+"\\\\2x+4y="+(2*c+4*r)+"\\end{cases}$ ⇒ $x="+c+"$ , $y="+r+"$")}};
/* ===== ១២ រង្វង់ និងបន្ទាត់ ===== */
G[12]={1:function(){var T=pick(TR),k=T[2]/5,R=r2(T[0]/k),D=r2(T[2]/k),ang=Math.acos(T[0]/T[2])*180/Math.PI;
    return Q("បន្ទាត់ $(AT)$ ប៉ះរង្វង់ផ្ចិត $O$ កាំ $"+T[0]+"$ ត្រង់ $T$ ។ បើ $OA="+T[2]+"$ គណនា $AT$",[A(T[1],null,"num","AT =")],"$OT\\perp AT$ ⇒ $AT=\\sqrt{"+(T[2]*T[2])+"-"+(T[0]*T[0])+"}="+T[1]+"$","nogrid\nnoaxes\ncircle O "+R+"\nO(0,0)\nA("+D+",0)\nT("+onC(ang,R)+")\nseg O T\nseg O A gray\nseg A T red")},
  2:function(){var T=pick(TR),k=T[2]/4,R=r2(T[2]/k),d=r2(T[0]/k),h=r2(T[1]/k);
    return Q("រង្វង់ផ្ចិត $O$ កាំ $"+T[2]+"$ ។ អង្កត់ធ្នូ $[AB]$ ឋិតនៅចម្ងាយ $"+T[0]+"$ ពីផ្ចិត $O$ ។ គណនាប្រវែង $AB$",[A(2*T[1],null,"num","AB =")],"$OH\\perp AB$ ហើយ $H$ ជាចំណុចកណ្ដាល ⇒ $AH=\\sqrt{"+(T[2]*T[2])+"-"+(T[0]*T[0])+"}="+T[1]+"$ ⇒ $AB="+(2*T[1])+"$","nogrid\nnoaxes\ncircle O "+R+"\nO(0,0)\nA("+(-h)+","+d+")\nB("+h+","+d+")\nH(0,"+d+")\nseg A B\nseg O H red\nseg O A gray")},
  3:function(){var a=ri(4,12),b=ri(4,12),c=ri(4,12),d=a+c-b;while(d<3){c++;d=a+c-b}
    return Q("ចតុកោណ $ABCD$ ចារឹកក្រៅរង្វង់ (ជ្រុងទាំង ៤ ប៉ះរង្វង់)។ $AB="+a+"$ , $BC="+b+"$ , $CD="+c+"$ ។ គណនា $AD$",[A(d,null,"num","AD =")],"ចតុកោណចារឹកក្រៅរង្វង់៖ $AB+CD=BC+AD$ ⇒ $AD="+a+"+"+c+"-"+b+"="+d+"$")}};
/* ===== ១៣ លក្ខណៈមុំនៃរង្វង់ ===== */
G[13]={1:function(){var al=ri(15,80),rev=Math.random()<.5,R=3,fig="nogrid\nnoaxes\ncircle O "+R+" gray\nO(0,0)\nA("+onC(270-al,R)+")\nB("+onC(270+al,R)+")\nC("+onC(90+ri(-30,30),R)+")\nseg C A\nseg C B\nseg O A\nseg O B\nangle A C B\nangle A O B";
    return rev?Q("មុំផ្ចិត $\\widehat{AOB}="+(2*al)+"^\\circ$ ។ គណនាមុំចារឹក $\\widehat{ACB}$ (ដឺក្រេ)",[A(al,null,"num","∠ACB =")],"មុំចារឹក $=\\dfrac12$ មុំផ្ចិតដែលស្កាត់ធ្នូតែមួយ ⇒ $"+al+"^\\circ$",fig)
      :Q("មុំចារឹក $\\widehat{ACB}="+al+"^\\circ$ ។ គណនាមុំផ្ចិត $\\widehat{AOB}$ (ដឺក្រេ)",[A(2*al,null,"num","∠AOB =")],"មុំផ្ចិត $=2\\times$ មុំចារឹក ⇒ $"+(2*al)+"^\\circ$",fig)},
  2:function(){var a=ri(50,130),b=ri(50,130);
    return Q("ចតុកោណ $ABCD$ ចារឹកក្នុងរង្វង់ មាន $\\widehat{A}="+a+"^\\circ$ និង $\\widehat{B}="+b+"^\\circ$ ។ គណនា $\\widehat{C}$ និង $\\widehat{D}$",[A(180-a,null,"num","∠C ="),A(180-b,null,"num","∠D =")],"មុំឈមនៃចតុកោណចារឹកក្នុងរង្វង់បំពេញគ្នា ⇒ $\\widehat C=180^\\circ-"+a+"^\\circ="+(180-a)+"^\\circ$ · $\\widehat D="+(180-b)+"^\\circ$","nogrid\nnoaxes\ncircle O 3 gray\nA("+onC(200,3)+")\nB("+onC(290,3)+")\nC("+onC(10,3)+")\nD("+onC(110,3)+")\npoly A B C D")},
  3:function(){var x=ri(20,80)*2,y=ri(20,80)*2,ins=Math.random()<.5;if(!ins&&x===y)y+=10;var big=Math.max(x,y),sm=Math.min(x,y);
    return ins?Q("អង្កត់ធ្នូ $[AC]$ និង $[BD]$ កាត់គ្នាត្រង់ $M$ ក្នុងរង្វង់។ ធ្នូ $\\overset{\\frown}{AB}="+x+"^\\circ$ និង $\\overset{\\frown}{CD}="+y+"^\\circ$ ។ គណនា $\\widehat{AMB}$",[A((x+y)/2,null,"num","∠AMB =")],"មុំមានកំពូលក្នុងរង្វង់ $=\\dfrac{"+x+"^\\circ+"+y+"^\\circ}{2}="+((x+y)/2)+"^\\circ$")
      :Q("ពីចំណុច $M$ ក្រៅរង្វង់ គូសបន្ទាត់កាត់ពីរ ស្កាត់ធ្នូ $"+big+"^\\circ$ (ឆ្ងាយ) និង $"+sm+"^\\circ$ (ជិត)។ គណនាមុំត្រង់ $M$",[A((big-sm)/2,null,"num","∠M =")],"មុំមានកំពូលក្រៅរង្វង់ $=\\dfrac{"+big+"^\\circ-"+sm+"^\\circ}{2}="+((big-sm)/2)+"^\\circ$")}};
/* ===== ១៤ ទ្រឹស្ដីបទតាលែស ===== */
function thFig(t){var Ax=2,Ay=5,D=[r2(Ax*(1-t)),r2(Ay*(1-t))],E=[r2(Ax+(6-Ax)*t),r2(Ay*(1-t))];return"nogrid\nnoaxes\nA("+Ax+","+Ay+")\nB(0,0)\nC(6,0)\nD("+D[0]+","+D[1]+")\nE("+E[0]+","+E[1]+")\npoly A B C\nseg D E red"}
G[14]={1:function(){var a=ri(1,4),b=a+ri(1,4),n=ri(1,4),m=ri(1,5);
    return Q("ក្នុងត្រីកោណ $ABC$ ៖ $D\\in[AB]$ , $E\\in[AC]$ ហើយ $(DE)\\parallel(BC)$ ។ $AD="+(a*n)+"$ , $AB="+(b*n)+"$ , $AE="+(a*m)+"$ ។ គណនា $AC$",[A(b*m,null,"num","AC =")],"តាលែស៖ $\\dfrac{AD}{AB}=\\dfrac{AE}{AC}$ ⇒ $AC=\\dfrac{"+(b*n)+"\\cdot"+(a*m)+"}{"+(a*n)+"}="+(b*m)+"$",thFig(a/b))},
  2:function(){var a=ri(1,4),b=a+ri(1,4),n=ri(1,4),m=ri(1,5);
    return Q("$(DE)\\parallel(BC)$ ៖ $AD="+(a*n)+"$ , $AB="+(b*n)+"$ , $BC="+(b*m)+"$ ។ គណនា $DE$",[A(a*m,null,"num","DE =")],"$\\dfrac{DE}{BC}=\\dfrac{AD}{AB}$ ⇒ $DE="+(b*m)+"\\cdot\\dfrac{"+(a*n)+"}{"+(b*n)+"}="+(a*m)+"$",thFig(a/b))},
  3:function(){var a=ri(1,5),c=ri(1,5),k=ri(1,3),l=ri(1,3);   /* AD/DB = AE/EC */
    return Q("$(DE)\\parallel(BC)$ ៖ $AD=x$ , $DB="+(c*k)+"$ , $AE="+(a*l)+"$ , $EC="+(c*l)+"$ ។ រក $x$",[A(a*k,null,"num","x =")],"$\\dfrac{AD}{DB}=\\dfrac{AE}{EC}$ ⇒ $x=\\dfrac{"+(a*l)+"\\cdot"+(c*k)+"}{"+(c*l)+"}="+(a*k)+"$",thFig(a/(a+c)))}};
/* ===== ១៥ ត្រីកោណដូចគ្នា ===== */
G[15]={1:function(){var s=[ri(2,6),ri(3,7),ri(4,8)],k=pick([2,3,fr(3,2),fr(5,2)]),kv=typeof k==="number"?k:k.n/k.d;s=s.map(function(v){return typeof k==="number"?v:v*2});
    var i=ri(1,2),out=s[i]*kv;
    return Q("$\\triangle ABC\\sim\\triangle A'B'C'$ ៖ $AB="+s[0]+"$ , $BC="+s[1]+"$ , $CA="+s[2]+"$ ហើយ $A'B'="+(s[0]*kv)+"$ ។ គណនា $"+(i===1?"B'C'":"C'A'")+"$",[A(out,null,"num","=")],"ផលធៀបដូច $k=\\dfrac{A'B'}{AB}="+(typeof k==="number"?k:k.t)+"$ ⇒ $"+s[i]+"\\times k="+out+"$")},
  2:function(){var a=ri(1,4),b=a+ri(1,3),m=ri(1,6),S=a*a*m;
    return Q("ត្រីកោណពីរដូចគ្នា មានផលធៀបជ្រុង $\\dfrac{"+a+"}{"+b+"}$ ។ ក្រឡាផ្ទៃត្រីកោណតូចស្មើ $"+S+"$ ។ គណនាក្រឡាផ្ទៃត្រីកោណធំ",[A(b*b*m,null,"num","S' =")],"ផលធៀបក្រឡាផ្ទៃ $=k^2=\\dfrac{"+(a*a)+"}{"+(b*b)+"}$ ⇒ $S'="+(b*b*m)+"$")},
  3:function(){var mn=pick([[1,2],[2,3],[3,4],[2,1],[3,2],[4,3]]),m=mn[0],n=mn[1],k=ri(1,3),BH=k*m*m,HC=k*n*n,AH=k*m*n,W=BH+HC,s=6/W;
    return Q("ត្រីកោណ $ABC$ កែងត្រង់ $A$ មានកម្ពស់ $[AH]$ ។ $BH="+BH+"$ , $HC="+HC+"$ ។ គណនា $AH$",[A(AH,null,"num","AH =")],"$\\triangle HBA\\sim\\triangle HAC$ ⇒ $AH^2=BH\\cdot HC="+(BH*HC)+"$ ⇒ $AH="+AH+"$","nogrid\nnoaxes\nB(0,0)\nC(6,0)\nH("+r2(BH*s)+",0)\nA("+r2(BH*s)+","+r2(AH*s)+")\npoly A B C\nseg A H red\nangle B A C")}};
/* ===== ១៦ ពហុកោណ ===== */
var NG=[5,6,8,9,10,12,15,18,20];
G[16]={1:function(){var n=ri(4,12);
    return Q("គណនាផលបូកមុំក្នុងនៃពហុកោណ $"+n+"$ ជ្រុង (ដឺក្រេ)",[A((n-2)*180,null,"num","S =")],"$S=(n-2)\\times180^\\circ=("+n+"-2)\\times180^\\circ="+((n-2)*180)+"^\\circ$")},
  2:function(){var n=pick(NG);
    return Q("គណនារង្វាស់មុំក្នុងនីមួយៗ និងមុំក្រៅនីមួយៗ នៃពហុកោណនិយ័ត $"+n+"$ ជ្រុង",[A((n-2)*180/n,null,"num","មុំក្នុង ="),A(360/n,null,"num","មុំក្រៅ =")],"មុំក្នុង $=\\dfrac{(n-2)180^\\circ}{n}="+((n-2)*180/n)+"^\\circ$ · មុំក្រៅ $=\\dfrac{360^\\circ}{n}="+(360/n)+"^\\circ$")},
  3:function(){var n=pick(NG),t=Math.random()<.5;
    return t?Q("មុំក្នុងនីមួយៗនៃពហុកោណនិយ័តមួយស្មើ $"+((n-2)*180/n)+"^\\circ$ ។ តើពហុកោណនោះមានប៉ុន្មានជ្រុង?",[A(n,null,"num","n =")],"មុំក្រៅ $=180^\\circ-"+((n-2)*180/n)+"^\\circ="+(360/n)+"^\\circ$ ⇒ $n=\\dfrac{360}{"+(360/n)+"}="+n+"$")
      :Q("គណនាចំនួនអង្កត់ទ្រូងនៃពហុកោណ $"+n+"$ ជ្រុង",[A(n*(n-3)/2,null,"num","ចំនួន =")],"$\\dfrac{n(n-3)}{2}=\\dfrac{"+n+"\\cdot"+(n-3)+"}{2}="+(n*(n-3)/2)+"$")}};
/* ===== ១៧ ផ្ទៃក្រឡា និងមាឌនៃរូបដូចគ្នា ===== */
G[17]={1:function(){var a=ri(1,4),b=a+ri(1,3),m=ri(1,8);
    return Q("ចតុកោណកែងពីរដូចគ្នា មានផលធៀបប្រវែង $"+a+":"+b+"$ ។ ក្រឡាផ្ទៃរូបតូច $"+(a*a*m)+"\\text{ cm}^2$ ។ គណនាក្រឡាផ្ទៃរូបធំ",[A(b*b*m,null,"num","S =")],"ផលធៀបក្រឡាផ្ទៃ $="+(a*a)+":"+(b*b)+"$ ⇒ $"+(b*b*m)+"\\text{ cm}^2$")},
  2:function(){var a=ri(1,3),b=a+ri(1,2),m=ri(1,5);
    return Q("គូបពីរដូចគ្នា មានផលធៀបប្រវែងគែម $"+a+":"+b+"$ ។ មាឌគូបតូច $"+(a*a*a*m)+"\\text{ cm}^3$ ។ គណនាមាឌគូបធំ",[A(b*b*b*m,null,"num","V =")],"ផលធៀបមាឌ $=k^3="+(a*a*a)+":"+(b*b*b)+"$ ⇒ $"+(b*b*b*m)+"\\text{ cm}^3$")},
  3:function(){var a=ri(1,3),b=a+ri(1,3),m=ri(1,4);
    return Q("រូបរឹងពីរដូចគ្នា មានផលធៀបក្រឡាផ្ទៃ $"+(a*a)+":"+(b*b)+"$ ។ មាឌរូបតូច $"+(a*a*a*m)+"$ ។ គណនាមាឌរូបធំ",[A(b*b*b*m,null,"num","V =")],"$k^2=\\dfrac{"+(a*a)+"}{"+(b*b)+"}$ ⇒ $k=\\dfrac{"+a+"}{"+b+"}$ ⇒ ផលធៀបមាឌ $"+(a*a*a)+":"+(b*b*b)+"$ ⇒ $V="+(b*b*b*m)+"$")}};
/* ===== ១៨ ផលធៀបត្រីកោណមាត្រ ===== */
function rtFig(T){var s=6/Math.max(T[0],T[1]);return"nogrid\nnoaxes\nA(0,0)\nC("+r2(T[1]*s)+",0)\nB("+r2(T[1]*s)+","+r2(T[0]*s)+")\npoly A C B\nangle C A B"}
G[18]={1:function(){var T=pick(TR),f=pick(["sin","cos","tan"]),v=f==="sin"?fr(T[0],T[2]):f==="cos"?fr(T[1],T[2]):fr(T[0],T[1]);
    return Q("ត្រីកោណ $ABC$ កែងត្រង់ $C$ ៖ $BC="+T[0]+"$ , $AC="+T[1]+"$ , $AB="+T[2]+"$ ។ គណនា $\\"+f+"\\widehat{A}$",[A(v.s,v.t,"num",f+" A =")],"$\\sin=\\dfrac{\\text{ឈម}}{\\text{អ៊ីប៉ូតេនុស}}$ · $\\cos=\\dfrac{\\text{ជាប់}}{\\text{អ៊ីប៉ូតេនុស}}$ · $\\tan=\\dfrac{\\text{ឈម}}{\\text{ជាប់}}$ ⇒ $"+v.t+"$",rtFig(T))},
  2:function(){var h=ri(2,12)*2,C=pick([["30°","sin",h/2,String(h/2)],["60°","cos",h/2,String(h/2)],["45°","sin",h+"*sqrt(2)/2",(h/2)+"\\sqrt2"]]);
    return Q("ត្រីកោណ $ABC$ កែងត្រង់ $C$ មានអ៊ីប៉ូតេនុស $AB="+h+"$ និង $\\widehat{A}="+C[0]+"$ ។ គណនា "+(C[1]==="sin"?"$BC$ (ជ្រុងឈម)":"$AC$ (ជ្រុងជាប់)"),[A(C[2],C[3],"num","=")],"$"+(C[1]==="sin"?"BC":"AC")+"="+h+"\\"+C[1]+" "+C[0]+"="+C[3]+"$")},
  3:function(){var T=pick(TR),v=fr(T[1],T[2]),w=fr(T[0],T[1]);
    return Q("$\\widehat{A}$ ជាមុំស្រួចដែល $\\sin A=\\dfrac{"+T[0]+"}{"+T[2]+"}$ ។ គណនា $\\cos A$ និង $\\tan A$",[A(v.s,v.t,"num","cos A ="),A(w.s,w.t,"num","tan A =")],"$\\cos A=\\sqrt{1-\\sin^2A}="+v.t+"$ · $\\tan A=\\dfrac{\\sin A}{\\cos A}="+w.t+"$",rtFig(T))}};

var LES=[
  ["ចំនួន និងកន្សោម",[[1,"ប្រមាណវិធីលើរ៉ាឌីកាល់"],[2,"សមាមាត្រ"],[3,"កន្សោមពីជគណិត"]]],
  ["សមីការ និងវិសមីការ",[[4,"សមីការដឺក្រេទី១មានមួយអញ្ញាត"],[5,"វិសមីការដឺក្រេទី១មានមួយអញ្ញាត"],[11,"ប្រព័ន្ធសមីការដឺក្រេទី១មានពីរអញ្ញាត"]]],
  ["ស្ថិតិ និងប្រូបាប",[[6,"បំណែងចែកប្រេកង់"],[7,"មធ្យមស្ថិតិ"],[8,"ប្រូបាប"]]],
  ["ធរណីមាត្រក្នុងប្លង់កូអរដោនេ",[[9,"ចម្ងាយរវាងពីរចំណុច"],[10,"សមីការនៃបន្ទាត់"]]],
  ["រង្វង់",[[12,"រង្វង់ និងបន្ទាត់"],[13,"លក្ខណៈមុំនៃរង្វង់"]]],
  ["ត្រីកោណ និងពហុកោណ",[[14,"ទ្រឹស្ដីបទតាលែស"],[15,"ត្រីកោណដូចគ្នា"],[16,"ពហុកោណ"],[17,"ផ្ទៃក្រឡា និងមាឌនៃរូបដូចគ្នា"],[18,"ផលធៀបត្រីកោណមាត្រ"]]]
];
X.reg(9,{les:LES,G:G});
})();
