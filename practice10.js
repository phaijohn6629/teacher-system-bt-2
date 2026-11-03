/* ========================================================================
   🧮 ហាត់លំហាត់ ថ្នាក់ទី១០ — ២៥ មេរៀន × ៣ កម្រិត (បង្កើតដោយកូដ)
   មិនទាន់មាន៖ ការបំប្លែងចាំង (រង់ចាំបញ្ជាក់អត្ថន័យតាមកម្មវិធីសិក្សា)
   តក្កវិទ្យា៖ ឆ្លើយ 1 = ពិត · 0 = មិនពិត · ត្រូវផ្ទុកបន្ទាប់ពី practice.js (window.PX)
   ======================================================================== */
(function(){
"use strict";
var X=window.PX,Q=X.Q,A=X.A,ri=X.ri,nz=X.nz,pick=X.pick,fr=X.fr,sg=X.sg,co=X.co,poly=X.poly,polyT=X.polyT,sgp=X.sgp,gcd=X.gcd;
function pt(p){return"("+p[0]+";"+p[1]+")"}
function lcm(a,b){return a/gcd(a,b)*b}
var G={};
/* ===== ជំពូកទី១ ពហុធា ===== */
G[11]={1:function(){var c=[nz(-3,3),ri(-5,5),ri(-6,6)],a=ri(-3,3),v=c[0]*a*a+c[1]*a+c[2];
    return Q("គេឱ្យ $P(x)="+polyT(c)+"$ ។ គណនា $P("+a+")$",[A(v,null,"num","P("+a+") =")],"ជំនួស $x="+a+"$ ⇒ $"+v+"$")},
  2:function(){var a=nz(-5,5),b=nz(-5,5),e=[1,a+b,a*b];
    return Q("ពន្លាត $(x"+sg(a,0)+")(x"+sg(b,0)+")$",[A(poly(e),polyT(e),"expr","=")],"$=x^2"+co(b,"x")+co(a,"x")+sg(a*b,0)+"="+polyT(e)+"$")},
  3:function(){var a=nz(-3,3),b=ri(-4,4),c=nz(-3,3),d=ri(-4,4),e=[a*c,a*d+b*c,b*d];
    return Q("ពន្លាត និងសម្រួល $("+poly([a,b])+")("+poly([c,d])+")$",[A(poly(e),polyT(e),"expr","=")],"$="+polyT(e)+"$")}};
G[12]={1:function(){var c=[nz(-3,3),ri(-4,4),ri(-5,5),ri(-6,6)],a=ri(-2,3),r=((c[0]*a+c[1])*a+c[2])*a+c[3];
    return Q("រកសំណល់នៃការចែក $P(x)="+polyT(c)+"$ នឹង $x"+sg(-a,0)+"$",[A(r,null,"num","សំណល់ =")],"ទ្រឹស្ដីបទសំណល់ ⇒ $R=P("+a+")="+r+"$")},
  2:function(){var a=nz(-3,3),b=nz(-4,4),c=ri(-5,5);   /* (x-a)(x²+bx+c) ÷ (x-a) */
    var P=[1,b-a,c-a*b,-a*c];
    return Q("ចែក $P(x)="+polyT(P)+"$ នឹង $x"+sg(-a,0)+"$ ។ រកផលចែក $Q(x)$",[A(poly([1,b,c]),polyT([1,b,c]),"expr","Q(x) =")],"ប្រើវិធីហ៊័រណឺ (Horner) ⇒ $Q(x)="+polyT([1,b,c])+"$ សំណល់ $0$")},
  3:function(){var a=nz(-3,3),k=nz(-4,4),c=[1,k,0],m=-(a*a*a+k*a*a);   /* x³+kx²+m ចែកដាច់នឹង x-a */
    return Q("រក $m$ ដើម្បីឱ្យ $P(x)=x^3"+co(k,"x^2")+"+m$ ចែកដាច់នឹង $x"+sg(-a,0)+"$",[A(m,null,"num","m =")],"$P("+a+")=0\\iff "+(a*a*a)+sg(k*a*a,0)+"+m=0\\iff m="+m+"$")}};
/* ===== ជំពូកទី២ តក្កវិទ្យា សំណុំ ចំនួន ===== */
G[21]={1:function(){var a=ri(1,9),b=ri(1,9),op=pick(["\\land","\\lor"]),p=a>b,q=b%2===0,v=op==="\\land"?(p&&q):(p||q);
    return Q("សំណើ $p$៖ «$"+a+">"+b+"$» · $q$៖ «$"+b+"$ ជាចំនួនគូ»។ តើ $p"+op+"q$ ពិតឬមិនពិត? (ឆ្លើយ $1$ = ពិត · $0$ = មិនពិត)",[A(v?1:0,null,"num","តម្លៃ =")],"$p$ "+(p?"ពិត":"មិនពិត")+" · $q$ "+(q?"ពិត":"មិនពិត")+" ⇒ $p"+op+"q$ "+(v?"ពិត":"មិនពិត"))},
  2:function(){var a=ri(1,9),p=a%3===0,b=ri(1,9),q=b>5,v=!p||q;
    return Q("$p$៖ «$"+a+"$ ចែកដាច់នឹង $3$» · $q$៖ «$"+b+">5$»។ តើ $p\\Rightarrow q$ ពិតឬមិនពិត? ($1$/$0$)",[A(v?1:0,null,"num","តម្លៃ =")],"$p\\Rightarrow q$ មិនពិតតែពេល $p$ ពិត និង $q$ មិនពិត ⇒ "+(v?"ពិត":"មិនពិត"))},
  3:function(){var a=ri(1,9),b=ri(1,9),p=a<b,q=a+b>10,v=!(p&&q);
    return Q("$p$៖ «$"+a+"<"+b+"$» · $q$៖ «$"+a+"+"+b+">10$»។ តើ $\\overline{p\\land q}$ ពិតឬមិនពិត? ($1$/$0$)",[A(v?1:0,null,"num","តម្លៃ =")],"$p\\land q$ "+(p&&q?"ពិត":"មិនពិត")+" ⇒ អវិជ្ជមានរបស់វា "+(v?"ពិត":"មិនពិត"))}};
G[22]={1:function(){var n=ri(8,20),a=ri(2,n-2),f=[];for(var i=1;i<=n;i++)if(i%a===0)f.push(i);
    return Q("$A=\\{x\\in\\mathbb N^*\\mid x\\le "+n+",\\ x$ ជាពហុគុណនៃ $"+a+"\\}$ ។ រកចំនួនធាតុ $n(A)$",[A(f.length,null,"num","n(A) =")],"$A=\\{"+f.join(",")+"\\}$ ⇒ $n(A)="+f.length+"$")},
  2:function(){var nA=ri(10,30),nB=ri(10,30),nI=ri(1,Math.min(nA,nB)-1);
    return Q("$n(A)="+nA+"$ , $n(B)="+nB+"$ , $n(A\\cap B)="+nI+"$ ។ គណនា $n(A\\cup B)$",[A(nA+nB-nI,null,"num","n(A∪B) =")],"$n(A\\cup B)=n(A)+n(B)-n(A\\cap B)="+(nA+nB-nI)+"$")},
  3:function(){var T=ri(30,45),m=ri(15,25),p=ri(12,22),b=ri(4,Math.min(m,p)-2),none=T-(m+p-b);if(none<0){T=m+p-b+ri(0,5);none=T-(m+p-b)}
    return Q("ថ្នាក់មានសិស្ស $"+T+"$ នាក់ ៖ $"+m+"$ នាក់ចូលចិត្តគណិត · $"+p+"$ នាក់ចូលចិត្តរូបវិទ្យា · $"+b+"$ នាក់ចូលចិត្តទាំងពីរ។ តើប៉ុន្មាននាក់មិនចូលចិត្តទាំងពីរ?",[A(none,null,"num","ចំនួន =")],"$"+T+"-("+m+"+"+p+"-"+b+")="+none+"$")}};
G[23]={1:function(){var a=ri(2,9)*ri(1,6),b=ri(2,9)*ri(1,6);
    return Q("រក $\\gcd("+a+","+b+")$ និង $\\operatorname{lcm}("+a+","+b+")$",[A(gcd(a,b),null,"num","gcd ="),A(lcm(a,b),null,"num","lcm =")],"$\\gcd\\cdot\\operatorname{lcm}=a\\cdot b$ ⇒ $\\gcd="+gcd(a,b)+"$ , $\\operatorname{lcm}="+lcm(a,b)+"$")},
  2:function(){var k=pick([2,3,5,6,7]),a=ri(2,6);
    return Q("សរសេរ $\\sqrt{"+(a*a*k)+"}$ ជាទម្រង់ $a\\sqrt{b}$ ($b$ តូចបំផុត)",[A(a,null,"num","a ="),A(k,null,"num","b =")],"$\\sqrt{"+(a*a*k)+"}=\\sqrt{"+(a*a)+"\\cdot"+k+"}="+a+"\\sqrt{"+k+"}$")},
  3:function(){var k=pick([2,3,5,7]),a=ri(1,6);
    return Q("សម្រួលភាគបែង៖ $\\dfrac{"+(a*k)+"}{\\sqrt{"+k+"}}$",[A(a+"sqrt("+k+")",a+"\\sqrt{"+k+"}","num","=")],"$\\dfrac{"+(a*k)+"}{\\sqrt{"+k+"}}\\cdot\\dfrac{\\sqrt{"+k+"}}{\\sqrt{"+k+"}}="+a+"\\sqrt{"+k+"}$")}};
/* ===== ជំពូកទី៣ សមីការ និងវិសមីការ ===== */
G[31]={1:function(){var r1=nz(-6,6),r2=nz(-6,6);while(r1===r2)r2=nz(-6,6);var lo=Math.min(r1,r2),hi=Math.max(r1,r2);
    return Q("ដោះស្រាយ $x^2"+co(-(r1+r2),"x")+sg(r1*r2,0)+"=0$ (ឫសតូចជាមុន)",[A(lo,null,"num","x₁ ="),A(hi,null,"num","x₂ =")],"$(x"+sg(-lo,0)+")(x"+sg(-hi,0)+")=0$","y=x^2"+co(-(r1+r2),"x")+sg(r1*r2,0))},
  2:function(){var a=nz(-3,3),b=ri(-8,8),c=ri(-8,8),D=b*b-4*a*c;
    return Q("គណនាឌីសគ្រីមីណង់ $\\Delta$ នៃ $"+polyT([a,b,c])+"=0$",[A(D,null,"num","Δ =")],"$\\Delta=b^2-4ac="+(b*b)+"-4\\cdot"+sgp(a)+"\\cdot"+sgp(c)+"="+D+"$")},
  3:function(){var a=nz(1,3),r1=nz(-5,5),r2=nz(-5,5),b=-a*(r1+r2),c=a*r1*r2,S=fr(-b,a),P=fr(c,a);
    return Q("សមីការ $"+polyT([a,b,c])+"=0$ មានឫស $x_1,x_2$ ។ គណនា $x_1+x_2$ និង $x_1x_2$ (ទ្រឹស្ដីបទវីយែត)",[A(S.s,S.t,"num","S ="),A(P.s,P.t,"num","P =")],"$S=-\\frac ba="+S.t+"$ · $P=\\frac ca="+P.t+"$")}};
G[32]={1:function(){var b=ri(1,6),a=ri(-5,5);
    return Q("ដោះស្រាយ $\\sqrt{x"+sg(a,0)+"}="+b+"$",[A(b*b-a,null,"num","x =")],"$x"+sg(a,0)+"="+(b*b)+"$ ⇒ $x="+(b*b-a)+"$ (ផ្ទៀងផ្ទាត់ $x"+sg(a,0)+"\\ge0$)")},
  2:function(){var p=ri(1,3),q=ri(p+1,4);   /* x⁴ - (p²+q²)x² + p²q² = 0 */
    return Q("ដោះស្រាយ $x^4-"+(p*p+q*q)+"x^2+"+(p*p*q*q)+"=0$ ៖ សរសេរឫសវិជ្ជមាន $x_1<x_2$",[A(p,null,"num","x₁ ="),A(q,null,"num","x₂ =")],"តាង $t=x^2$ ៖ $t="+(p*p)+"$ ឬ $t="+(q*q)+"$ ⇒ $x=\\pm"+p+"$ ឬ $x=\\pm"+q+"$")}};
/* ៣.២ កម្រិត ៣ (សមីការអសនិទាន ដែលមានឫសចំនួនគត់) */
G[32][3]=function(){var r=ri(2,7),c=ri(0,r-2),k=(r-c)*(r-c)-r;   /* √(x+k)=x-c មានឫស x=r */
  return Q("ដោះស្រាយ $\\sqrt{x"+sg(k,0)+"}=x"+(c?sg(-c,0):"")+"$",[A(r,null,"num","x =")],"លើកការេ៖ $x"+sg(k,0)+"=(x"+(c?sg(-c,0):"")+")^2$ · លក្ខខណ្ឌ $x\\ge"+c+"$ ⇒ $x="+r+"$")};
G[33]={1:function(){var x=ri(-5,5),y=ri(-5,5),a=nz(-3,3),b=nz(-3,3),c=nz(-3,3),d=nz(-3,3);while(a*d-b*c===0)d=nz(-3,3);
    return Q("ដោះស្រាយ $\\begin{cases}"+co(a,"x",true)+co(b,"y")+"="+(a*x+b*y)+"\\\\"+co(c,"x",true)+co(d,"y")+"="+(c*x+d*y)+"\\end{cases}$",[A(x,null,"num","x ="),A(y,null,"num","y =")],"ដោយការជំនួស ឬបូកលុប ⇒ $(x;y)=("+x+";"+y+")$","y=("+(a*x+b*y)+"-("+a+")x)/("+b+")\ny=("+(c*x+d*y)+"-("+c+")x)/("+d+") red")},
  2:function(){var x=ri(1,6),y=ri(1,6),S=x+y,P=x*y;
    return Q("ចំនួនពីរមានផលបូក $"+S+"$ និងផលគុណ $"+P+"$ ។ រកចំនួនទាំងពីរ (តូចជាមុន)",[A(Math.min(x,y),null,"num","x ="),A(Math.max(x,y),null,"num","y =")],"ឫសនៃ $t^2-"+S+"t+"+P+"=0$")},
  3:function(){var p=ri(5,15)*1000,q=ri(5,15)*1000,a=ri(2,6),b=ri(2,6),c=ri(1,5),d=ri(1,6);while(a*d-b*c===0)d++;
    return Q("ទិញសៀវភៅ $"+a+"$ និងប៊ិច $"+b+"$ អស់ $"+(a*p+b*q)+"$ រៀល · សៀវភៅ $"+c+"$ និងប៊ិច $"+d+"$ អស់ $"+(c*p+d*q)+"$ រៀល។ រកតម្លៃសៀវភៅមួយ និងប៊ិចមួយ",[A(p,null,"num","សៀវភៅ ="),A(q,null,"num","ប៊ិច =")],"ប្រព័ន្ធ $\\begin{cases}"+a+"x+"+b+"y="+(a*p+b*q)+"\\\\"+c+"x+"+d+"y="+(c*p+d*q)+"\\end{cases}$ ⇒ $x="+p+"$ , $y="+q+"$")}};
G[34]={1:function(){var a=nz(-4,4),b=ri(-8,8),c=ri(-8,8),v=fr(c-b,a);
    return Q("ដោះស្រាយ $"+co(a,"x",true)+sg(b,0)+"\\le "+c+"$ ៖ ចម្លើយជាទម្រង់ $x"+(a>0?"\\le":"\\ge")+"k$ ។ រក $k$",[A(v.s,v.t,"num","k =")],"$"+a+"x\\le"+(c-b)+"$ ⇒ $x"+(a>0?"\\le":"\\ge")+v.t+"$ "+(a<0?"(ចែកនឹងចំនួនអវិជ្ជមាន ⇒ ប្ដូរសញ្ញា)":""))},
  2:function(){var r1=nz(-5,4),r2=r1+ri(1,6);
    return Q("ដោះស្រាយ $x^2"+co(-(r1+r2),"x")+sg(r1*r2,0)+"<0$ ៖ ចម្លើយ $a<x<b$ ។ រក $a$ និង $b$",[A(r1,null,"num","a ="),A(r2,null,"num","b =")],"ត្រីធាតុអវិជ្ជមានរវាងឫស ⇒ $"+r1+"<x<"+r2+"$","y=x^2"+co(-(r1+r2),"x")+sg(r1*r2,0))},
  3:function(){var a=nz(-3,3),b=a+ri(1,4),c=nz(-3,3),d=c+ri(1,4),lo=Math.max(a,c),hi=Math.min(b,d);if(lo>=hi){d=b+1;c=a;lo=a;hi=b}
    return Q("ដោះស្រាយប្រព័ន្ធ $\\begin{cases}"+a+"<x<"+b+"\\\\"+c+"<x<"+d+"\\end{cases}$ ៖ ចម្លើយ $\\alpha<x<\\beta$",[A(lo,null,"num","α ="),A(hi,null,"num","β =")],"ប្រសព្វនៃចន្លោះ ⇒ $"+lo+"<x<"+hi+"$")}};
/* ===== ជំពូកទី៤ ធរណីមាត្រក្នុងប្លង់ ===== */
var TR=[[3,4,5],[6,8,10],[5,12,13],[8,6,10],[4,3,5]];
G[41]={1:function(){var P=[ri(-5,5),ri(-5,5)],Q2=[ri(-5,5),ri(-5,5)];
    return Q("រកកូអរដោនេចំណុចកណ្ដាល $M$ នៃ $[AB]$ ដែល $A"+pt(P)+"$ , $B"+pt(Q2)+"$",[A(fr(P[0]+Q2[0],2).s,fr(P[0]+Q2[0],2).t,"num","x ="),A(fr(P[1]+Q2[1],2).s,fr(P[1]+Q2[1],2).t,"num","y =")],"$M\\left(\\frac{x_A+x_B}2;\\frac{y_A+y_B}2\\right)$","A("+P[0]+","+P[1]+")\nB("+Q2[0]+","+Q2[1]+")\nseg A B")},
  2:function(){var T=pick(TR),P=[ri(-4,3),ri(-4,3)],s=[pick([1,-1]),pick([1,-1])],B=[P[0]+s[0]*T[0],P[1]+s[1]*T[1]];
    return Q("គណនាចម្ងាយ $AB$ ដែល $A"+pt(P)+"$ , $B"+pt(B)+"$",[A(T[2],null,"num","AB =")],"$AB=\\sqrt{"+(T[0]*T[0])+"+"+(T[1]*T[1])+"}="+T[2]+"$","A("+P[0]+","+P[1]+")\nB("+B[0]+","+B[1]+")\nseg A B")},
  3:function(){var A0=[ri(-4,4),ri(-4,4)],M=[ri(-4,4),ri(-4,4)],B=[2*M[0]-A0[0],2*M[1]-A0[1]];
    return Q("$M"+pt(M)+"$ ជាចំណុចកណ្ដាលនៃ $[AB]$ ដែល $A"+pt(A0)+"$ ។ រកកូអរដោនេ $B$",[A(B[0],null,"num","x ="),A(B[1],null,"num","y =")],"$x_B=2x_M-x_A="+B[0]+"$ · $y_B=2y_M-y_A="+B[1]+"$","A("+A0[0]+","+A0[1]+")\nM("+M[0]+","+M[1]+")")}};
G[42]={1:function(){var P=[ri(-4,4),ri(-4,4)],dx=nz(-4,4),dy=ri(-6,6),B=[P[0]+dx,P[1]+dy],m=fr(dy,dx);
    return Q("រកមេគុណប្រាប់ទិស $m$ នៃបន្ទាត់ $(AB)$ ដែល $A"+pt(P)+"$ , $B"+pt(B)+"$",[A(m.s,m.t,"num","m =")],"$m=\\frac{y_B-y_A}{x_B-x_A}=\\frac{"+dy+"}{"+dx+"}="+m.t+"$","A("+P[0]+","+P[1]+")\nB("+B[0]+","+B[1]+")\nline A B")},
  2:function(){var m=nz(-3,3),P=[ri(-4,4),ri(-4,4)],p=P[1]-m*P[0];
    return Q("សរសេរសមីការបន្ទាត់កាត់តាម $A"+pt(P)+"$ មានមេគុណប្រាប់ទិស $"+m+"$ ជាទម្រង់ $y=mx+p$ ។ រក $p$",[A(p,null,"num","p =")],"$"+P[1]+"="+m+"\\cdot"+sgp(P[0])+"+p$ ⇒ $p="+p+"$","y="+m+"x"+sg(p,0)+"\nA("+P[0]+","+P[1]+")")},
  3:function(){var m=nz(-4,4),pm=fr(-1,m);
    return Q("បន្ទាត់ $(d): y="+co(m,"x",true)+"+1$ ។ រកមេគុណប្រាប់ទិសនៃបន្ទាត់ស្រប និងបន្ទាត់កែងនឹង $(d)$",[A(m,null,"num","ស្រប m ="),A(pm.s,pm.t,"num","កែង m' =")],"ស្រប ⇒ $m'=m="+m+"$ · កែង ⇒ $mm'=-1\\Rightarrow m'="+pm.t+"$","y="+m+"x+1\ny=("+pm.s+")x red")}};
G[43]={1:function(){var a=ri(-5,5),b=ri(-5,5),r=ri(1,6);
    return Q("រង្វង់ $(x"+sg(-a,0)+")^2+(y"+sg(-b,0)+")^2="+(r*r)+"$ ។ រកផ្ចិត $I$ និងកាំ $R$",[A(a,null,"num","x_I ="),A(b,null,"num","y_I ="),A(r,null,"num","R =")],"$I("+a+";"+b+")$ · $R=\\sqrt{"+(r*r)+"}="+r+"$","(x"+sg(-a,0)+")^2+(y"+sg(-b,0)+")^2="+(r*r)+"\nI("+a+","+b+")")},
  2:function(){var a=ri(-4,4),b=ri(-4,4),r=ri(2,6),D=-2*a,E=-2*b,F=a*a+b*b-r*r;
    return Q("រង្វង់ $x^2+y^2"+co(D,"x")+co(E,"y")+(F?sg(F,0):"")+"=0$ ។ រកផ្ចិត និងកាំ",[A(a,null,"num","x_I ="),A(b,null,"num","y_I ="),A(r,null,"num","R =")],"បំពេញការេ៖ $(x"+sg(-a,0)+")^2+(y"+sg(-b,0)+")^2="+(r*r)+"$","x^2+y^2"+co(D,"x")+co(E,"y")+(F?sg(F,0):"")+"=0\nI("+a+","+b+")")},
  3:function(){var a=ri(-3,3),b=ri(-3,3),T=pick(TR),s=[pick([1,-1]),pick([1,-1])],M=[a+s[0]*T[0],b+s[1]*T[1]];
    return Q("សរសេរសមីការរង្វង់ផ្ចិត $I"+pt([a,b])+"$ កាត់តាម $M"+pt(M)+"$ ជាទម្រង់ $(x-a)^2+(y-b)^2=R^2$ ។ រក $R^2$",[A(T[2]*T[2],null,"num","R² =")],"$R^2=IM^2="+(T[0]*T[0])+"+"+(T[1]*T[1])+"="+(T[2]*T[2])+"$","circle ("+a+","+b+") "+T[2]+"\nI("+a+","+b+")\nM("+M[0]+","+M[1]+")")}};
G[44]={1:function(){var m=nz(-3,3),p=ri(-4,4),r=fr(-p,m);
    return Q("អានពីក្រាប៖ $y="+co(m,"x",true)+sg(p,0)+">0$ ពេល $x"+(m>0?">":"<")+"k$ ។ រក $k$",[A(r.s,r.t,"num","k =")],"ក្រាបកាត់ $Ox$ ត្រង់ $x="+r.t+"$","y="+m+"x"+sg(p,0)+"\nhole ("+(-p/m)+",0)")},
  2:function(){var r1=nz(-4,3),r2=r1+ri(1,5);
    return Q("អានពីក្រាប៖ $x^2"+co(-(r1+r2),"x")+sg(r1*r2,0)+"\\le 0$ ពេល $a\\le x\\le b$ ។ រក $a$, $b$",[A(r1,null,"num","a ="),A(r2,null,"num","b =")],"ផ្នែកក្រាបនៅក្រោមអ័ក្ស $Ox$ ៖ $"+r1+"\\le x\\le"+r2+"$","y=x^2"+co(-(r1+r2),"x")+sg(r1*r2,0)+"\nA("+r1+",0)\nB("+r2+",0)")},
  3:function(){var m=nz(1,2),p=ri(-2,2),r1=ri(-3,0),r2=r1+ri(2,4);   /* x² - (r1+r2)x + r1r2 ≤ ... ប្រសព្វបន្ទាត់ */
    return Q("អានពីក្រាប៖ $x^2"+co(-(r1+r2),"x")+sg(r1*r2,0)+"\\ge 0$ ពេល $x\\le a$ ឬ $x\\ge b$ ។ រក $a$, $b$",[A(r1,null,"num","a ="),A(r2,null,"num","b =")],"ផ្នែកក្រាបនៅលើអ័ក្ស $Ox$ ៖ $x\\le"+r1+"$ ឬ $x\\ge"+r2+"$","y=x^2"+co(-(r1+r2),"x")+sg(r1*r2,0)+"\nA("+r1+",0)\nB("+r2+",0)")}};
/* ===== ជំពូកទី៥ ផលធៀបត្រីកោណមាត្រ ===== */
G[51]={1:function(){var T=pick(TR),f=pick(["sin","cos","tan"]),v=f==="sin"?fr(T[0],T[2]):f==="cos"?fr(T[1],T[2]):fr(T[0],T[1]);
    return Q("ត្រីកោណ $ABC$ កែងត្រង់ $C$ មាន $BC="+T[0]+"$ , $AC="+T[1]+"$ , $AB="+T[2]+"$ ។ គណនា $\\"+f+" A$",[A(v.s,v.t,"num",f+" A =")],"$\\sin A=\\frac{BC}{AB}$ · $\\cos A=\\frac{AC}{AB}$ · $\\tan A=\\frac{BC}{AC}$ ⇒ $"+v.t+"$","A(0,0)\nC("+T[1]+",0)\nB("+T[1]+","+T[0]+")\npoly A C B\nangle B A C")},
  2:function(){var T=pick(TR);
    return Q("ត្រីកោណកែងត្រង់ $C$ មាន $BC="+T[0]+"$ និង $AB="+T[2]+"$ ។ គណនា $AC$ និង $\\cos A$",[A(T[1],null,"num","AC ="),A(fr(T[1],T[2]).s,fr(T[1],T[2]).t,"num","cos A =")],"ពីតាគ័រ $AC=\\sqrt{"+(T[2]*T[2])+"-"+(T[0]*T[0])+"}="+T[1]+"$","A(0,0)\nC("+T[1]+",0)\nB("+T[1]+","+T[0]+")\npoly A C B")},
  3:function(){var C=pick([["30°","sqrt(3)/2","\\frac{\\sqrt3}{2}","1/2","\\frac12"],["45°","sqrt(2)/2","\\frac{\\sqrt2}{2}","sqrt(2)/2","\\frac{\\sqrt2}{2}"],["60°","1/2","\\frac12","sqrt(3)/2","\\frac{\\sqrt3}{2}"]]);
    return Q("គណនា $\\cos "+C[0]+"$ និង $\\sin "+C[0]+"$",[A(C[1],C[2],"num","cos ="),A(C[3],C[4],"num","sin =")],"តម្លៃពិសេស")}};
G[52]={1:function(){var d=ri(5,30),C=pick([["30°","sqrt(3)/3","\\frac{\\sqrt3}{3}"],["45°","1","1"],["60°","sqrt(3)","\\sqrt3"]]);
    return Q("ពីចំណុចឆ្ងាយ $"+d+"$ ម៉ែត្រពីជើងបង្គោល គេមើលឃើញចុងបង្គោលក្រោមមុំ $"+C[0]+"$ ។ គណនាកម្ពស់បង្គោល",[A(d+"*"+C[1],d+(C[2]==="1"?"":C[2]),"num","h =")],"$h="+d+"\\tan "+C[0]+"$","A(0,0)\nB("+d+",0)\nT("+d+","+(d*({"30°":0.5774,"45°":1,"60°":1.732})[C[0]]).toFixed(2)+")\npoly A B T\nangle B A T")},
  2:function(){var h=ri(3,12),C=pick([["30°",2,"2"],["45°","sqrt(2)","\\sqrt2"],["60°","2/sqrt(3)","\\frac{2}{\\sqrt3}"]]);
    return Q("ជណ្ដើរមួយផ្អែកលើជញ្ជាំង បង្កើតមុំ $"+C[0]+"$ ជាមួយដី ហើយចុងជណ្ដើរនៅកម្ពស់ $"+h+"$ ម៉ែត្រ។ គណនាប្រវែងជណ្ដើរ",[A(h+"*"+C[1],null,"num","L =")],"$L=\\frac{h}{\\sin "+C[0]+"}$")},
  3:function(){var a=ri(3,9),b=ri(3,9),C=pick([[60,"1/2",.5],[120,"-1/2",-.5],[90,"0",0]]),c2=a*a+b*b-2*a*b*C[2];
    return Q("ត្រីកោណ $ABC$ មាន $b="+a+"$ , $c="+b+"$ និងមុំ $A="+C[0]+"^\\circ$ ។ គណនា $a^2$ (ច្បាប់កូស៊ីនុស)",[A(Math.round(c2),null,"num","a² =")],"$a^2=b^2+c^2-2bc\\cos A="+(a*a)+"+"+(b*b)+"-2\\cdot"+a+"\\cdot"+b+"\\cdot("+C[1]+")="+Math.round(c2)+"$")}};
/* ===== ជំពូកទី៦ អនុគមន៍ ===== */
G[61]={1:function(){var a=nz(-3,3),b=ri(-5,5),x=ri(-4,4);
    return Q("$f(x)="+co(a,"x",true)+sg(b,0)+"$ ។ គណនា $f("+x+")$",[A(a*x+b,null,"num","f("+x+") =")],"$f("+x+")="+(a*x+b)+"$","y="+a+"x"+sg(b,0))},
  2:function(){var a=nz(-3,3),b=ri(-3,3),c=nz(-2,2),d=ri(-3,3),x=ri(-3,3),g=c*x+d;
    return Q("$f(x)="+co(a,"x",true)+sg(b,0)+"$ , $g(x)="+co(c,"x",true)+sg(d,0)+"$ ។ គណនា $f(g("+x+"))$",[A(a*g+b,null,"num","=")],"$g("+x+")="+g+"$ ⇒ $f("+g+")="+(a*g+b)+"$")},
  3:function(){var a=nz(-3,3),b=ri(-5,5),f=fr(-b,a);
    return Q("រកដែនកំណត់នៃ $f(x)=\\sqrt{"+co(a,"x",true)+sg(b,0)+"}$ ៖ $x"+(a>0?"\\ge":"\\le")+"k$ ។ រក $k$",[A(f.s,f.t,"num","k =")],"$"+a+"x"+sg(b,0)+"\\ge0$ ⇒ $x"+(a>0?"\\ge":"\\le")+f.t+"$","y=sqrt("+a+"x"+sg(b,0)+")")}};
G[62]={1:function(){var a=nz(-2,2),h=ri(-3,3),k=ri(-4,4),b=-2*a*h,c=a*h*h+k;
    return Q("រកកំពូល $S$ នៃប៉ារ៉ាបូល $y="+polyT([a,b,c])+"$",[A(h,null,"num","x_S ="),A(k,null,"num","y_S =")],"$x_S=-\\frac{b}{2a}="+h+"$ · $y_S="+k+"$","y="+poly([a,b,c]))},
  2:function(){var a=nz(-2,2),h=ri(-3,3),k=ri(-4,4),b=-2*a*h,c=a*h*h+k;
    return Q("រកអ័ក្សឆ្លុះ $x=\\dots$ និងតម្លៃ"+(a>0?"អប្បបរមា":"អតិបរមា")+"នៃ $y="+polyT([a,b,c])+"$",[A(h,null,"num","x ="),A(k,null,"num",a>0?"min =":"max =")],"អ័ក្សឆ្លុះ $x="+h+"$ · តម្លៃ"+(a>0?"អប្បបរមា":"អតិបរមា")+" $"+k+"$","y="+poly([a,b,c]))},
  3:function(){var r1=nz(-4,4),r2=nz(-4,4),a=nz(-2,2),b=-a*(r1+r2),c=a*r1*r2,lo=Math.min(r1,r2),hi=Math.max(r1,r2);
    return Q("ប៉ារ៉ាបូល $y="+polyT([a,b,c])+"$ កាត់អ័ក្ស $Ox$ ត្រង់ $x_1<x_2$ និងកាត់ $Oy$ ត្រង់ $y_0$",[A(lo,null,"num","x₁ ="),A(hi,null,"num","x₂ ="),A(c,null,"num","y₀ =")],"$y=0$ ⇒ $x="+lo+"$ ឬ $x="+hi+"$ · $x=0$ ⇒ $y="+c+"$","y="+poly([a,b,c]))}};
G[63]={1:function(){var a=nz(-3,3),b=ri(-4,4),c=nz(-4,4),x=ri(-3,3);while(x+c===0)x++;var v=fr(a*x+b,x+c);
    return Q("$f(x)=\\dfrac{"+poly([a,b])+"}{x"+sg(c,0)+"}$ ។ គណនា $f("+x+")$",[A(v.s,v.t,"num","f("+x+") =")],"$f("+x+")=\\dfrac{"+(a*x+b)+"}{"+(x+c)+"}="+v.t+"$")},
  2:function(){var a=nz(-3,3),b=ri(-4,4),c=nz(-4,4);
    return Q("រកអាស៊ីមតូតឈរ $x=\\dots$ និងដេក $y=\\dots$ នៃ $f(x)=\\dfrac{"+poly([a,b])+"}{x"+sg(c,0)+"}$",[A(-c,null,"num","x ="),A(a,null,"num","y =")],"$x"+sg(c,0)+"=0\\iff x="+(-c)+"$ · $y="+a+"$","y=("+poly([a,b])+")/(x"+sg(c,0)+")")},
  3:function(){var a=ri(1,9),x=a*a,b=ri(-3,3);
    return Q("$f(x)=\\sqrt{x}"+sg(b,0)+"$ ។ រក $x$ ដែល $f(x)="+(a+b)+"$",[A(x,null,"num","x =")],"$\\sqrt x="+a+"\\iff x="+x+"$","y=sqrt(x)"+sg(b,0)+" [0,"+(x+2)+"]")}};
/* ===== ជំពូកទី៧ ស្ថិតិ ===== */
function sample(n,lo,hi){var a=[];for(var i=0;i<n;i++)a.push(ri(lo,hi));return a}
G[71]={1:function(){var xs=[1,2,3,4,5],f=xs.map(function(){return ri(1,8)}),N=f.reduce(function(a,b){return a+b},0);
    return Q("តារាងប្រេកង់ (ពិន្ទុ $x$ · ប្រេកង់ $f$) ដូចក្រាបខាងក្រោម។ គណនាចំនួនសិស្សសរុប $N$",[A(N,null,"num","N =")],"$N=\\sum f="+f.join("+")+"="+N+"$","bar "+xs.map(function(x,i){return x+":"+f[i]}).join(" "))},
  2:function(){var xs=[1,2,3,4,5],f=xs.map(function(){return ri(1,8)}),N=f.reduce(function(a,b){return a+b},0),k=ri(0,4),r=fr(f[k]*100,N);
    return Q("ពីក្រាបខាងក្រោម គណនាប្រេកង់ធៀប (ជា %) នៃ $x="+xs[k]+"$",[A(r.s,r.t,"num","% =")],"$\\frac{"+f[k]+"}{"+N+"}\\times100="+r.t+"\\%$","bar "+xs.map(function(x,i){return x+":"+f[i]}).join(" "))},
  3:function(){var xs=[1,2,3,4,5],f=xs.map(function(){return ri(1,6)}),N=f.reduce(function(a,b){return a+b},0),S=xs.reduce(function(a,x,i){return a+x*f[i]},0),m=fr(S,N);
    return Q("ពីក្រាបខាងក្រោម គណនាមធ្យមភាគ $\\bar x$",[A(m.s,m.t,"num","x̄ =")],"$\\bar x=\\frac{\\sum x_if_i}{N}=\\frac{"+S+"}{"+N+"}="+m.t+"$","bar "+xs.map(function(x,i){return x+":"+f[i]}).join(" "))}};
G[72]={1:function(){var a=sample(ri(5,7),2,15),S=a.reduce(function(x,y){return x+y},0),m=fr(S,a.length);
    return Q("គណនាមធ្យមភាគនៃទិន្នន័យ៖ $"+a.join(",\\ ")+"$",[A(m.s,m.t,"num","x̄ =")],"$\\bar x=\\frac{"+S+"}{"+a.length+"}="+m.t+"$")},
  2:function(){var n=pick([5,7,6,8]),a=sample(n,1,20),s=a.slice().sort(function(x,y){return x-y}),md=n%2?s[(n-1)/2]:fr(s[n/2-1]+s[n/2],2).s;
    return Q("រកមេដ្យាននៃទិន្នន័យ៖ $"+a.join(",\\ ")+"$",[A(md,null,"num","Me =")],"តម្រៀប៖ $"+s.join(",")+"$ ⇒ មេដ្យាន $="+md+"$")},
  3:function(){var v=ri(3,9),a=[];while(a.length<5){var z=ri(1,12);if(z!==v&&a.indexOf(z)<0)a.push(z)}a=a.concat([v,v]);a.sort(function(){return Math.random()-.5});
    return Q("រកម៉ូដនៃទិន្នន័យ៖ $"+a.join(",\\ ")+"$",[A(v,null,"num","Mo =")],"តម្លៃដែលកើតច្រើនបំផុត ⇒ $"+v+"$")}};
/* ===== ជំពូកទី៨ វ៉ិចទ័រក្នុងប្លង់ ===== */
G[81]={1:function(){var u=[ri(-5,5),ri(-5,5)],v=[ri(-5,5),ri(-5,5)];
    return Q("$\\vec u"+pt(u)+"$ , $\\vec v"+pt(v)+"$ ។ រក $\\vec u+\\vec v$",[A(u[0]+v[0],null,"num","x ="),A(u[1]+v[1],null,"num","y =")],"$\\vec u+\\vec v=("+(u[0]+v[0])+";"+(u[1]+v[1])+")$","U("+u[0]+","+u[1]+")\nV("+v[0]+","+v[1]+")\nvec O U\nvec O V red")},
  2:function(){var T=pick(TR),u=[pick([1,-1])*T[0],pick([1,-1])*T[1]];
    return Q("គណនាប្រវែង $|\\vec u|$ ដែល $\\vec u"+pt(u)+"$",[A(T[2],null,"num","|u| =")],"$|\\vec u|=\\sqrt{"+(u[0]*u[0])+"+"+(u[1]*u[1])+"}="+T[2]+"$","U("+u[0]+","+u[1]+")\nvec O U")},
  3:function(){var A0=[ri(-4,4),ri(-4,4)],B=[ri(-4,4),ri(-4,4)],k=nz(-3,3);
    return Q("$A"+pt(A0)+"$ , $B"+pt(B)+"$ ។ រក $"+(k===1?"":k===-1?"-":k)+"\\vec{AB}$",[A(k*(B[0]-A0[0]),null,"num","x ="),A(k*(B[1]-A0[1]),null,"num","y =")],"$\\vec{AB}=("+(B[0]-A0[0])+";"+(B[1]-A0[1])+")$ ⇒ គុណនឹង $"+k+"$","A("+A0[0]+","+A0[1]+")\nB("+B[0]+","+B[1]+")\nvec A B")}};
G[82]={1:function(){var u=[ri(-5,5),ri(-5,5)],v=[ri(-5,5),ri(-5,5)];
    return Q("គណនាផលគុណស្កាលែ $\\vec u\\cdot\\vec v$ ដែល $\\vec u"+pt(u)+"$ , $\\vec v"+pt(v)+"$",[A(u[0]*v[0]+u[1]*v[1])],"$x_1x_2+y_1y_2="+(u[0]*v[0]+u[1]*v[1])+"$")},
  2:function(){var u=[nz(-4,4),nz(-4,4)],a=nz(-4,4),num=-u[0]*a,m=fr(num,u[1]);
    return Q("រក $m$ ដើម្បីឱ្យ $\\vec u"+pt(u)+"\\perp\\vec v("+a+";m)$",[A(m.s,m.t,"num","m =")],"$"+(u[0]*a)+sg(u[1],0)+"m=0$ ⇒ $m="+m.t+"$")},
  3:function(){var u=[nz(-4,4),nz(-4,4)],k=nz(-3,3);
    return Q("រក $m$ ដើម្បីឱ្យ $\\vec u"+pt(u)+"$ និង $\\vec v("+(k*u[0])+";m)$ ស្របគ្នា",[A(k*u[1],null,"num","m =")],"$\\vec v="+k+"\\vec u$ ⇒ $m="+(k*u[1])+"$")}};
/* ===== ជំពូកទី៩ ការបំប្លែងរូប ===== */
G[91]={1:function(){var P=[ri(-4,4),ri(-4,4)],v=[nz(-4,4),nz(-4,4)];
    return Q("រករូបភាព $A'$ នៃ $A"+pt(P)+"$ តាមការកិលវ៉ិចទ័រ $\\vec v"+pt(v)+"$",[A(P[0]+v[0],null,"num","x ="),A(P[1]+v[1],null,"num","y =")],"$A'=A+\\vec v$","A("+P[0]+","+P[1]+")")},
  2:function(){var P=[ri(-4,4),ri(-4,4)],Q2=[ri(-4,4),ri(-4,4)];
    return Q("ការកិលមួយបំប្លែង $A"+pt(P)+"$ ទៅ $A'"+pt(Q2)+"$ ។ រកវ៉ិចទ័រកិល $\\vec v$",[A(Q2[0]-P[0],null,"num","x ="),A(Q2[1]-P[1],null,"num","y =")],"$\\vec v=\\vec{AA'}$","A("+P[0]+","+P[1]+")\nA'("+Q2[0]+","+Q2[1]+")\nvec A A' red")},
  3:function(){var v=[nz(-3,3),nz(-3,3)],P=[ri(-3,3),ri(-3,3)],B=[ri(-3,3),ri(-3,3)];
    return Q("ការកិលវ៉ិចទ័រ $\\vec v"+pt(v)+"$ បំប្លែង $B$ ទៅ $B'"+pt([B[0]+v[0],B[1]+v[1]])+"$ ។ រក $B$",[A(B[0],null,"num","x ="),A(B[1],null,"num","y =")],"$B=B'-\\vec v$")}};
G[92]={1:function(){var P=[nz(-5,5),nz(-5,5)],ax=pick(["Ox","Oy"]),R=ax==="Ox"?[P[0],-P[1]]:[-P[0],P[1]];
    return Q("រករូបភាពឆ្លុះនៃ $A"+pt(P)+"$ ធៀបនឹងអ័ក្ស $"+ax+"$",[A(R[0],null,"num","x ="),A(R[1],null,"num","y =")],ax==="Ox"?"$(x;y)\\mapsto(x;-y)$":"$(x;y)\\mapsto(-x;y)$","A("+P[0]+","+P[1]+")")},
  2:function(){var P=[nz(-5,5),nz(-5,5)];
    return Q("រករូបភាពឆ្លុះនៃ $A"+pt(P)+"$ ធៀបនឹងបន្ទាត់ $y=x$",[A(P[1],null,"num","x ="),A(P[0],null,"num","y =")],"$(x;y)\\mapsto(y;x)$","y=x gray\nA("+P[0]+","+P[1]+")")},
  3:function(){var P=[nz(-4,4),nz(-4,4)],I=[ri(-3,3),ri(-3,3)],R=[2*I[0]-P[0],2*I[1]-P[1]];
    return Q("រករូបភាពឆ្លុះនៃ $A"+pt(P)+"$ ធៀបនឹងចំណុច $I"+pt(I)+"$",[A(R[0],null,"num","x ="),A(R[1],null,"num","y =")],"$I$ ជាចំណុចកណ្ដាល $[AA']$ ⇒ $A'=2I-A$","A("+P[0]+","+P[1]+")\nI("+I[0]+","+I[1]+")")}};
G[93]={1:function(){var P=[nz(-5,5),nz(-5,5)];
    return Q("រករូបភាពនៃ $A"+pt(P)+"$ តាមការវិលផ្ចិត $O$ មុំ $180^\\circ$",[A(-P[0],null,"num","x ="),A(-P[1],null,"num","y =")],"$(x;y)\\mapsto(-x;-y)$","A("+P[0]+","+P[1]+")")},
  2:function(){var P=[nz(-5,5),nz(-5,5)];
    return Q("រករូបភាពនៃ $A"+pt(P)+"$ តាមការវិលផ្ចិត $O$ មុំ $90^\\circ$ (ច្រាសទ្រនិចនាឡិកា)",[A(-P[1],null,"num","x ="),A(P[0],null,"num","y =")],"$(x;y)\\mapsto(-y;x)$","A("+P[0]+","+P[1]+")\nvec O A gray")},
  3:function(){var P=[nz(-5,5),nz(-5,5)];
    return Q("រករូបភាពនៃ $A"+pt(P)+"$ តាមការវិលផ្ចិត $O$ មុំ $-90^\\circ$ (តាមទ្រនិចនាឡិកា)",[A(P[1],null,"num","x ="),A(-P[0],null,"num","y =")],"$(x;y)\\mapsto(y;-x)$","A("+P[0]+","+P[1]+")\nvec O A gray")}};

var LES=[
  ["ជំពូកទី១ ពហុធា",[[11,"ពហុធា"],[12,"ប្រមាណវិធីចែកពហុធា"]]],
  ["ជំពូកទី២ តក្កវិទ្យា សំណុំ និងចំនួន",[[21,"តក្កវិទ្យា"],[22,"សំណុំ"],[23,"ចំនួន"]]],
  ["ជំពូកទី៣ សមីការ និងវិសមីការ",[[31,"សមីការដឺក្រេទី២"],[32,"សមីការអសនិទាន និងដឺក្រេខ្ពស់"],[33,"ប្រព័ន្ធសមីការ"],[34,"វិសមីការ និងប្រព័ន្ធវិសមីការ"]]],
  ["ជំពូកទី៤ ធរណីមាត្រក្នុងប្លង់",[[41,"កូអរដោនេចំណុច"],[42,"សមីការបន្ទាត់"],[43,"សមីការរង្វង់"],[44,"ការដោះស្រាយវិសមីការតាមក្រាប"]]],
  ["ជំពូកទី៥ ផលធៀបត្រីកោណមាត្រ",[[51,"ផលធៀបត្រីកោណមាត្រ"],[52,"ការអនុវត្តផលធៀបត្រីកោណមាត្រ"]]],
  ["ជំពូកទី៦ អនុគមន៍",[[61,"អនុគមន៍ និងក្រាបអនុគមន៍"],[62,"អនុគមន៍ដឺក្រេទី២"],[63,"អនុគមន៍សនិទាន និងអសនិទាន"]]],
  ["ជំពូកទី៧ ស្ថិតិ",[[71,"បំណែងចែកប្រេកង់ និងការតាងក្រាប"],[72,"រង្វាស់ទីតាំង"]]],
  ["ជំពូកទី៨ វ៉ិចទ័រក្នុងប្លង់",[[81,"វ៉ិចទ័រ និងប្រមាណវិធីលើវ៉ិចទ័រ"],[82,"ការអនុវត្តវ៉ិចទ័រ"]]],
  ["ជំពូកទី៩ ការបំប្លែងរូបក្នុងប្លង់",[[91,"ការបំប្លែងកិល"],[92,"ការបំប្លែងឆ្លុះ"],[93,"ការបំប្លែងវិល"]]]
];
X.reg(10,{les:LES,G:G});
})();
