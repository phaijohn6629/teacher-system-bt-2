/* ========================================================================
   🧮 ហ្វឹកហាត់បន្ថែម ថ្នាក់ទី១០ — ២៥ មេរៀន × ៣ កម្រិត + 🌍 PISA (បង្កើតដោយកូដ)
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
    return Q("សំណើ $p$៖ «$"+a+">"+b+"$» · $q$៖ «$"+b+"$ ជាចំនួនគូ»។ តើ $p"+op+" q$ ពិតឬមិនពិត? (ឆ្លើយ $1$ = ពិត · $0$ = មិនពិត)",[A(v?1:0,null,"num","តម្លៃ =")],"$p$ "+(p?"ពិត":"មិនពិត")+" · $q$ "+(q?"ពិត":"មិនពិត")+" ⇒ $p"+op+" q$ "+(v?"ពិត":"មិនពិត"))},
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
    return Q("ដោះស្រាយ $"+co(a,"x",true)+sg(b,0)+"\\le "+c+"$ ៖ ចម្លើយជាទម្រង់ $x"+(a>0?"\\le ":"\\ge ")+"k$ ។ រក $k$",[A(v.s,v.t,"num","k =")],"$"+a+"x\\le"+(c-b)+"$ ⇒ $x"+(a>0?"\\le":"\\ge")+v.t+"$ "+(a<0?"(ចែកនឹងចំនួនអវិជ្ជមាន ⇒ ប្ដូរសញ្ញា)":""))},
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
    return Q("រកដែនកំណត់នៃ $f(x)=\\sqrt{"+co(a,"x",true)+sg(b,0)+"}$ ៖ $x"+(a>0?"\\ge ":"\\le ")+"k$ ។ រក $k$",[A(f.s,f.t,"num","k =")],"$"+a+"x"+sg(b,0)+"\\ge0$ ⇒ $x"+(a>0?"\\ge":"\\le")+f.t+"$","y=sqrt("+a+"x"+sg(b,0)+")")}};
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

/* ===================== 🌍 កម្រិតទី ៤ · PISA ថ្នាក់ទី១០ (បញ្ហាជីវិតពិត) ===================== */
function money(v){return String(v).replace(/\B(?=(\d{3})+(?!\d))/g,"\\,")}
function r2(v){return Math.round(v*100)/100}
function sum(a){return a.reduce(function(x,y){return x+y},0)}
var P4={};
P4[11]=[function(){var L=ri(20,40),W=ri(15,L-2),x=ri(2,Math.floor(W/2)-1),V=x*(L-2*x)*(W-2*x);
    return Q("📦 ក្រដាសកាតុង $"+L+"\\times"+W+"$ cm កាត់ការេជ្រុង $x$ ចេញពីជ្រុងទាំង ៤ ហើយបត់ជាប្រអប់។ មាឌ $V(x)=x("+L+"-2x)("+W+"-2x)$ ។ គណនា $V("+x+")$ ($\\text{cm}^3$)",
      [A(V,null,"num","V =")],"$"+x+"\\times"+(L-2*x)+"\\times"+(W-2*x)+"="+V+"$")},
  function(){var b=ri(10,30),c=ri(20,100),x=ri(2,b-2),P=-x*x+b*x-c;
    return Q("🥭 អ្នកលក់ស្វាយ គណនាប្រាក់ចំណេញ (ពាន់រៀល) $P(x)=-x^2+"+b+"x-"+c+"$ ពេលលក់ $x$ គីឡូ។ គណនា $P("+x+")$ ។ (បើអវិជ្ជមាន = ខាត)",
      [A(P,null,"num","P =")],"$-"+(x*x)+"+"+(b*x)+"-"+c+"="+P+"$")}];
P4[12]=[function(){var m=ri(1,6),n=ri(1,8);
    return Q("🟩 ដីរាងចតុកោណកែង មានផ្ទៃក្រឡា $x^2"+co(m+n,"x")+sg(m*n,0)+"$ ($\\text{m}^2$) និងទទឹង $x+"+m+"$ m ។ រកបណ្ដោយជាកន្សោមនៃ $x$ (ចែកពហុធា)",
      [A("x+"+n,null,"expr","បណ្ដោយ =")],"$(x^2"+co(m+n,"x")+sg(m*n,0)+")\\div(x+"+m+")=x+"+n+"$")},
  function(){var a=ri(2,6),c=[1,ri(-3,5),ri(0,8)],r=(c[0]*a+c[1])*a+c[2];
    return Q("🍬 ចំនួនស្ករគ្រាប់ $P(x)=x^2"+co(c[1],"x")+(c[2]?"+"+c[2]:"")+"$ ត្រូវចែកជាកញ្ចប់ៗ កញ្ចប់មួយមាន $x-"+a+"$ គ្រាប់។ រកចំនួនស្ករដែលនៅសល់ (សំណល់នៃ $P(x)\\div(x-"+a+")$)",
      [A(r,null,"num","សំណល់ =")],"ទ្រឹស្ដីបទសំណល់៖ $R=P("+a+")="+r+"$")}];
P4[21]=[function(){var a=ri(12,25),g=Math.random()<.5,v=a>=18||g;
    return Q("🎬 ច្បាប់រោងកុន៖ «ចូលមើលបាន <b>បើ</b> អាយុ $\\ge18$ ឆ្នាំ <b>ឬ</b> មានអាណាព្យាបាលមកជាមួយ»។ សុខាអាយុ $"+a+"$ ឆ្នាំ ហើយ"+(g?"មាន":"គ្មាន")+"អាណាព្យាបាល។ តើសុខាចូលបានទេ? ($1$ = បាន · $0$ = មិនបាន)",
      [A(v?1:0,null,"num","=")],"$p\\lor q$ ៖ $p$ "+(a>=18?"ពិត":"មិនពិត")+" · $q$ "+(g?"ពិត":"មិនពិត")+" ⇒ "+(v?"ពិត":"មិនពិត"))},
  function(){var s=ri(60,100),b=ri(0,8),v=s>=80&&b<=3;
    return Q("🎓 អាហារូបករណ៍៖ «ទទួលបាន <b>បើ</b> ពិន្ទុ $\\ge80$ <b>និង</b> អវត្តមាន $\\le3$ ដង»។ ដារ៉ាបានពិន្ទុ $"+s+"$ អវត្តមាន $"+b+"$ ដង។ តើដារ៉ាទទួលបានទេ? ($1$/$0$)",
      [A(v?1:0,null,"num","=")],"$p\\land q$ ៖ $p$ "+(s>=80?"ពិត":"មិនពិត")+" · $q$ "+(b<=3?"ពិត":"មិនពិត")+" ⇒ "+(v?"ពិត":"មិនពិត"))}];
P4[22]=[function(){var E=ri(15,30),F=ri(8,20),U=E+F-ri(2,Math.min(E,F)-1);
    return Q("🗣️ ក្នុងថ្នាក់មួយ សិស្សរៀនអង់គ្លេស $"+E+"$ នាក់ រៀនបារាំង $"+F+"$ នាក់ ហើយសិស្សដែលរៀនយ៉ាងហោចណាស់មួយភាសា មាន $"+U+"$ នាក់។ តើមានសិស្សប៉ុន្មាននាក់ រៀនទាំងពីរភាសា?",
      [A(E+F-U,null,"num","n(E∩F) =")],"$n(E\\cap F)=n(E)+n(F)-n(E\\cup F)="+E+"+"+F+"-"+U+"="+(E+F-U)+"$")},
  function(){var T=ri(35,50),A0=ri(15,30),B0=ri(10,25),I=ri(2,Math.min(A0,B0)-2),N=T-(A0+B0-I);while(N<0){T++;N=T-(A0+B0-I)}
    return Q("📱 ស្ទង់មតិសិស្ស $"+T+"$ នាក់៖ $"+A0+"$ នាក់ប្រើ Facebook · $"+B0+"$ នាក់ប្រើ Telegram · $"+I+"$ នាក់ប្រើទាំងពីរ។ (ក) ប្រើយ៉ាងហោចណាស់មួយ? (ខ) មិនប្រើទាំងពីរ?",
      [A(A0+B0-I,null,"num","(ក) ="),A(N,null,"num","(ខ) =")],"$n(A\\cup B)="+A0+"+"+B0+"-"+I+"="+(A0+B0-I)+"$ · $"+T+"-"+(A0+B0-I)+"="+N+"$")}];
P4[23]=[function(){var a=ri(20,60);
    return Q("🧱 ការ៉ូរាងការេជ្រុង $"+a+"$ cm ។ គេចង់កាត់តាមអង្កត់ទ្រូង។ តើអង្កត់ទ្រូងវែងប៉ុន្មាន cm? (សរសេរជា $a\\sqrt b$ ឬទសភាគ)",
      [A(a+"*sqrt(2)",a+"\\sqrt2","num","d =")],"$d=\\sqrt{"+a+"^2+"+a+"^2}="+a+"\\sqrt2\\approx"+r2(a*Math.SQRT2)+"$ cm")},
  function(){var s0=pick([21,14.8,29.7]);
    return Q("📄 ក្រដាស A4 មានរាងចតុកោណកែង ដែលបណ្ដោយ $=\\sqrt2\\times$ ទទឹង។ បើទទឹង $"+s0+"$ cm តើបណ្ដោយប៉ុន្មាន cm? (បង្គត់ ១ ខ្ទង់ក្បៀសបាន)",
      [A(s0+"*sqrt(2)",s0+"\\sqrt2","num","cm =")],"$"+s0+"\\sqrt2\\approx"+(Math.round(s0*Math.SQRT2*10)/10)+"$ cm")}];
P4[31]=[function(){var v=ri(2,6)*5;
    return Q("⚽ បាល់ត្រូវបានទាត់ឡើង កម្ពស់ $h(t)=-5t^2+"+v+"t$ (m)។ ក្រោយប៉ុន្មានវិនាទី បាល់ធ្លាក់ដល់ដីវិញ ($h=0$ · $t>0$)?",
      [A(v/5,null,"num","t =")],"$-5t^2+"+v+"t=0\\iff t(-5t+"+v+")=0\\Rightarrow t="+(v/5)+"$ s","y=-5x^2+"+v+"x [0,"+(v/5)+"]")},
  function(){var a=ri(3,15),b=ri(a+1,25),P=2*(a+b),S=a*b;
    return Q("🌾 ដីស្រែរាងចតុកោណកែង មានបរិមាត្រ $"+P+"$ m និងផ្ទៃក្រឡា $"+S+"\\text{ m}^2$ ។ ទទឹង និងបណ្ដោយជាឫសនៃ $x^2-"+(P/2)+"x+"+S+"=0$ ។ រកទទឹង (តូច) និងបណ្ដោយ (ធំ)",
      [A(a,null,"num","ទទឹង ="),A(b,null,"num","បណ្ដោយ =")],"$\\Delta="+((P/2)*(P/2)-4*S)+"$ ⇒ $x="+a+"$ ឬ $x="+b+"$")}];
P4[32]=[function(){var v=ri(2,8)*1;
    return Q("🌊 ល្បឿនរលកទឹកក្នុងទឹករាក់ $v=\\sqrt{10d}$ (m/s · $d$ = ជម្រៅ m)។ បើរលកមានល្បឿន $"+v+"$ m/s តើទឹកជម្រៅប៉ុន្មានម៉ែត្រ?",
      [A(v*v/10,null,"num","d =")],"$\\sqrt{10d}="+v+"\\Rightarrow10d="+(v*v)+"\\Rightarrow d="+(v*v/10)+"$ m")},
  function(){var t=ri(1,6),h=5*t*t;
    return Q("🪂 ថ្មមួយធ្លាក់ពីកំពូលអគារកម្ពស់ $"+h+"$ m ។ ចម្ងាយធ្លាក់ $h=5t^2$ ⇒ $t=\\sqrt{\\dfrac h5}$ ។ តើថ្មធ្លាក់ដល់ដីក្រោយប៉ុន្មានវិនាទី?",
      [A(t,null,"num","t =")],"$t=\\sqrt{\\dfrac{"+h+"}{5}}=\\sqrt{"+(t*t)+"}="+t+"$ s")}];
P4[33]=[function(){var x=ri(5,20),y=ri(5,20);
    return Q("🏨 សណ្ឋាគារមួយមានបន្ទប់ ២ គ្រែ និង ៣ គ្រែ សរុប $"+(x+y)+"$ បន្ទប់ និងគ្រែសរុប $"+(2*x+3*y)+"$ ។ តើមានបន្ទប់ ២ គ្រែ និង ៣ គ្រែ ប៉ុន្មាន?",
      [A(x,null,"num","២ គ្រែ ="),A(y,null,"num","៣ គ្រែ =")],"$\\begin{cases}x+y="+(x+y)+"\\\\2x+3y="+(2*x+3*y)+"\\end{cases}$ ⇒ $y="+y+"$ , $x="+x+"$")},
  function(){var x=ri(5,30),y=ri(5,30);
    return Q("💵 កាបូបមួយមានក្រដាសប្រាក់ $5\\,000$ រៀល និង $10\\,000$ រៀល សរុប $"+(x+y)+"$ សន្លឹក តម្លៃ $"+money(5000*x+10000*y)+"$ រៀល។ តើមានក្រដាសប្រាក់នីមួយៗប៉ុន្មានសន្លឹក?",
      [A(x,null,"num","៥០០០ ="),A(y,null,"num","១០០០០ =")],"$\\begin{cases}x+y="+(x+y)+"\\\\5000x+10000y="+(5000*x+10000*y)+"\\end{cases}$")}];
P4[34]=[function(){var r1=ri(2,8),r2v=r1+ri(3,10);
    return Q("💰 ប្រាក់ចំណេញ (លានរៀល) ពេលផលិត $x$ រយគ្រឿង៖ $P(x)=-x^2+"+(r1+r2v)+"x-"+(r1*r2v)+"$ ។ ចំណេញ ($P>0$) ពេល $a<x<b$ ។ រក $a$ និង $b$",
      [A(r1,null,"num","a ="),A(r2v,null,"num","b =")],"ឫស $x="+r1+"$ , $x="+r2v+"$ · $a<0$ ⇒ $P>0$ រវាងឫស","y=-x^2+"+(r1+r2v)+"x-"+(r1*r2v))},
  function(){
    return Q("💉 វ៉ាក់សាំងត្រូវរក្សាទុកក្នុងសីតុណ្ហភាព $2\\le C\\le8$ ($^\\circ$C)។ ទូទឹកកកបង្ហាញជា $^\\circ$F ដែល $C=\\dfrac{5}{9}(F-32)$ ។ រកចន្លោះ $a\\le F\\le b$",
      [A(35.6,null,"num","a ="),A(46.4,null,"num","b =")],"$2\\le\\frac59(F-32)\\le8\\iff3.6\\le F-32\\le14.4\\iff35.6\\le F\\le46.4$")}];
P4[41]=[function(){var A0=[ri(-6,6),ri(-6,6)],B=[ri(-6,6),ri(-6,6)];
    return Q("🤝 មិត្តពីរនាក់ ផ្ទះនៅ $A"+pt(A0)+"$ និង $B"+pt(B)+"$ លើផែនទី (km)។ ពួកគេចង់ជួបគ្នាត្រង់ចំណុចកណ្ដាល $M$ ។ រក $M$",
      [A(fr(A0[0]+B[0],2).s,fr(A0[0]+B[0],2).t,"num","x ="),A(fr(A0[1]+B[1],2).s,fr(A0[1]+B[1],2).t,"num","y =")],"$M\\left(\\frac{x_A+x_B}2;\\frac{y_A+y_B}2\\right)$","A("+A0[0]+","+A0[1]+")\nB("+B[0]+","+B[1]+")\nseg A B")},
  function(){var T=pick(TR),k=pick([1,2,5,10]),P=[ri(-3,3),ri(-3,3)];
    return Q("✈️ លើផែនទីក្រឡា (១ ឯកតា = $"+k+"$ km) ក្រុង $A"+pt(P)+"$ និងក្រុង $B"+pt([P[0]+T[0],P[1]+T[1]])+"$ ។ តើយន្តហោះហោះត្រង់ពី $A$ ទៅ $B$ ឆ្ងាយប៉ុន្មាន km?",
      [A(T[2]*k,null,"num","km =")],"$AB=\\sqrt{"+T[0]+"^2+"+T[1]+"^2}="+T[2]+"$ ឯកតា ⇒ $"+(T[2]*k)+"$ km")}];
P4[42]=[function(){var B=pick([4000,5000,6000]),r=pick([1500,2000,2500]),x1=ri(2,5),x2=x1+ri(2,6);
    return Q("🚕 ថ្លៃតាក់ស៊ីជាអនុគមន៍ដឺក្រេទី១ $y=ax+b$ ($x$ km)។ ជិះ $"+x1+"$ km ថ្លៃ $"+money(B+r*x1)+"$ រៀល · ជិះ $"+x2+"$ km ថ្លៃ $"+money(B+r*x2)+"$ រៀល។ រក $a$ (ថ្លៃ/km) និង $b$ (ថ្លៃចាប់ផ្ដើម)",
      [A(r,null,"num","a ="),A(B,null,"num","b =")],"$a=\\dfrac{"+(B+r*x2)+"-"+(B+r*x1)+"}{"+x2+"-"+x1+"}="+r+"$ · $b="+(B+r*x1)+"-"+r+"\\times"+x1+"="+B+"$")},
  function(){var V0=ri(5,20)*100000,d=ri(5,20)*10000,n=ri(2,6);
    return Q("📱 ទូរស័ព្ទថ្មីថ្លៃ $"+money(V0)+"$ រៀល ហើយតម្លៃថយស្មើៗគ្នា $"+money(d)+"$ រៀល/ខែ ⇒ $y="+V0+"-"+d+"x$ ។ (ក) តម្លៃក្រោយ $"+n+"$ ខែ? (ខ) មេគុណប្រាប់ទិស $a$?",
      [A(V0-d*n,null,"num","(ក) រៀល ="),A(-d,null,"num","(ខ) a =")],"$y="+money(V0)+"-"+money(d)+"\\times"+n+"="+money(V0-d*n)+"$ · $a=-"+money(d)+"$")}];
P4[43]=[function(){var a=ri(-4,4),b=ri(-4,4),r=ri(3,8),P=[a+ri(-6,6),b+ri(-6,6)],d2=(P[0]-a)*(P[0]-a)+(P[1]-b)*(P[1]-b);
    return Q("📶 រ៉ោតទ័រ Wi-Fi នៅ $R"+pt([a,b])+"$ មានរង្វង់សេវា កាំ $"+r+"$ m ៖ $(x"+sg(-a,0)+")^2+(y"+sg(-b,0)+")^2\\le"+(r*r)+"$ ។ កុំព្យូទ័រនៅ $P"+pt(P)+"$ ។ (ក) គណនា $RP^2$ (ខ) ទទួលបាន Wi-Fi ទេ? ($1$/$0$)",
      [A(d2,null,"num","(ក) RP² ="),A(d2<=r*r?1:0,null,"num","(ខ) =")],"$RP^2="+(P[0]-a)+"^2+"+(P[1]-b)+"^2="+d2+"$ "+(d2<=r*r?"\\le":">")+" "+(r*r)+" ⇒ "+(d2<=r*r?"បាន":"មិនបាន"),"circle ("+a+","+b+") "+r+"\nR("+a+","+b+")\nP("+P[0]+","+P[1]+")")},
  function(){var a=ri(-5,5),b=ri(-5,5),r=ri(5,30);
    return Q("💦 ម៉ាស៊ីនបាញ់ទឹកស្រោចស្រែ នៅ $("+a+";"+b+")$ បាញ់បានឆ្ងាយ $"+r+"$ m ជុំវិញ។ សរសេរសមីការព្រំដែនជា $(x-a)^2+(y-b)^2=R^2$ ។ រក $R^2$",
      [A(r*r,null,"num","R² =")],"$R^2="+r+"^2="+(r*r)+"$")}];
P4[44]=[function(){var m=ri(2,6)*1000,c=m*ri(3,12);
    return Q("🧃 ការលក់ទឹកក្រូច៖ ប្រាក់ចំណេញ $y="+m+"x-"+c+"$ (រៀល) ពេលលក់ $x$ កែវ។ ពីក្រាប ចំណេញ ($y>0$) ពេល $x>k$ ។ រក $k$",
      [A(c/m,null,"num","k =")],"$"+m+"x-"+c+">0\\iff x>"+(c/m)+"$","y="+(m/1000)+"x-"+(c/1000)+"\nhole ("+(c/m)+",0)")},
  function(){var r1=ri(0,3),r2v=r1+ri(2,5);
    return Q("🎯 កម្ពស់បាល់ $y=-(x-"+r1+")(x-"+r2v+")$ (m · $x$ = ចម្ងាយផ្ដេក m)។ ពីក្រាប បាល់នៅលើដី ($y\\ge0$) ពេល $a\\le x\\le b$ ។ រក $a$, $b$",
      [A(r1,null,"num","a ="),A(r2v,null,"num","b =")],"ឫស $"+r1+"$ និង $"+r2v+"$ ⇒ $"+r1+"\\le x\\le"+r2v+"$","y=-(x-"+r1+")(x-"+r2v+")")}];
P4[51]=[function(){var h=ri(1,5)*10,d=h*pick([8,10,12]),t=fr(h,d);
    return Q("♿ ផ្លូវជម្រាលឡើងខ្ពស់ $"+h+"$ cm លើចម្ងាយផ្ដេក $"+d+"$ cm ។ ស្តង់ដារតម្រូវ $\\tan\\alpha\\le\\frac1{12}$ ។ (ក) គណនា $\\tan\\alpha$ (ខ) ត្រូវស្តង់ដារទេ? ($1$/$0$)",
      [A(t.s,t.t,"num","(ក) tan ="),A(h/d<=1/12+1e-9?1:0,null,"num","(ខ) =")],"$\\tan\\alpha=\\dfrac{"+h+"}{"+d+"}="+t.t+"$ "+(h/d<=1/12+1e-9?"\\le":">")+"\\frac1{12}")},
  function(){var T=pick(TR),t=fr(T[1],T[0]);
    return Q("☀️ បង្គោលកម្ពស់ $"+T[1]+"$ m មានស្រមោលវែង $"+T[0]+"$ m ។ មុំ $\\alpha$ រវាងកាំរស្មីព្រះអាទិត្យ និងដី មាន $\\tan\\alpha$ ប៉ុន្មាន? ហើយ $\\sin\\alpha$?",
      [A(t.s,t.t,"num","tan ="),A(fr(T[1],T[2]).s,fr(T[1],T[2]).t,"num","sin =")],"$\\tan\\alpha=\\frac{"+T[1]+"}{"+T[0]+"}$ · កាំរស្មី $="+T[2]+"$ ⇒ $\\sin\\alpha=\\frac{"+T[1]+"}{"+T[2]+"}$")}];
P4[52]=[function(){var d=ri(2,10)*10,C=pick([["45°","1","1"],["60°","sqrt(3)","\\sqrt3"],["30°","sqrt(3)/3","\\frac{\\sqrt3}{3}"]]);
    return Q("🏞️ ដើម្បីវាស់ទទឹងទន្លេ សិស្សឈរត្រង់ $A$ ទល់មុខដើមឈើ $T$ ត្រើយម្ខាង រួចដើរតាមមាត់ទន្លេ $"+d+"$ m ដល់ $B$ ហើយវាស់បាន $\\widehat{ABT}="+C[0]+"$ ($TA\\perp AB$)។ ទទឹងទន្លេ $AT$ ប៉ុន្មាន m? (សរសេរ $\\sqrt{\\ }$ បាន)",
      [A(d+"*"+C[1],(C[1]==="1"?d:d+C[2]),"num","AT =")],"$AT="+d+"\\tan"+C[0]+"$","nogrid\nnoaxes\nA(0,0)\nB(5,0)\nT(0,"+r2(5*({"45°":1,"60°":1.732,"30°":0.577})[C[0]])+")\npoly A B T\nangle A B T")},
  function(){var a=ri(3,10),b=ri(3,10),c2=a*a+b*b-a*b,r=Math.round(Math.sqrt(c2));
    return Q("⛵ ទូកពីរចេញពីកំពង់ផែ ក្នុងទិសដៅបង្កើតមុំ $60^\\circ$ ។ ក្រោយមួយម៉ោង ទូកទី១ ឆ្ងាយ $"+a+"$ km ទូកទី២ ឆ្ងាយ $"+b+"$ km ។ ទូកទាំងពីរឃ្លាតគ្នាប៉ុន្មាន km? (សរសេរ $\\sqrt{\\ }$ បាន)",
      [A(r*r===c2?r:"sqrt("+c2+")",r*r===c2?String(r):"\\sqrt{"+c2+"}","num","km =")],"ច្បាប់កូស៊ីនុស៖ $d^2="+a+"^2+"+b+"^2-2\\cdot"+a+"\\cdot"+b+"\\cos60^\\circ="+c2+"$")}];
P4[61]=[function(){var C=ri(-5,40);
    return Q("🌡️ បំប្លែងសីតុណ្ហភាព៖ $F(C)=1.8C+32$ ។ (ក) ថ្ងៃនេះ $"+C+"^\\circ$C ស្មើប៉ុន្មាន $^\\circ$F? (ខ) $212^\\circ$F ស្មើប៉ុន្មាន $^\\circ$C?",
      [A(r2(1.8*C+32),null,"num","(ក) °F ="),A(100,null,"num","(ខ) °C =")],"$1.8\\times"+sgp(C)+"+32="+r2(1.8*C+32)+"$ · $1.8C+32=212\\Rightarrow C=100$")},
  function(){var x=ri(5,40)*10000,d=pick([5000,10000,20000]);
    return Q("🧾 ហាងមួយ៖ $f(x)=1.1x$ (បូកពន្ធ ១០%) និង $g(x)=x-"+d+"$ (បញ្ចុះ $"+money(d)+"$ រៀល)។ ទំនិញថ្លៃ $"+money(x)+"$ រៀល ត្រូវបូកពន្ធជាមុន រួចបញ្ចុះ។ គណនា $g(f("+x+"))$",
      [A(11*x/10-d,null,"num","រៀល =")],"$f("+x+")="+money(11*x/10)+"$ ⇒ $g="+money(11*x/10-d)+"$")}];
P4[62]=[function(){var a=pick([0.1,0.2,0.25,0.5]),h=ri(2,10)*2,k=ri(3,15);
    return Q("🌉 ធ្នូស្ពាន $y=-"+a+"(x-"+h+")^2+"+k+"$ (m)។ (ក) កម្ពស់ខ្ពស់បំផុត? (ខ) ត្រង់ $x$ ប៉ុន្មាន?",
      [A(k,null,"num","(ក) m ="),A(h,null,"num","(ខ) x =")],"កំពូលប៉ារ៉ាបូល $S("+h+";"+k+")$","y=-"+a+"(x-"+h+")^2+"+k)},
  function(){var A0=ri(10,30)*10,B=pick([2,4,5]),p=A0/(2*B);
    return Q("🍜 ហាងគុយទាវ៖ បើលក់ថ្លៃ $p$ ពាន់រៀល/ចាន លក់បាន $"+A0+"-"+B+"p$ ចាន/ថ្ងៃ ⇒ ចំណូល $R(p)=p("+A0+"-"+B+"p)$ ។ (ក) ថ្លៃប៉ុន្មាន ទើបចំណូលធំបំផុត? (ខ) ចំណូលធំបំផុត (ពាន់រៀល)?",
      [A(p,null,"num","(ក) p ="),A(p*(A0-B*p),null,"num","(ខ) R =")],"$R=-"+B+"p^2+"+A0+"p$ ⇒ $p=\\dfrac{"+A0+"}{2\\cdot"+B+"}="+p+"$ · $R="+(p*(A0-B*p))+"$")}];
P4[63]=[function(){var d=pick([60,120,180,240]),v=pick([30,40,60,80]);
    return Q("🛣️ រយៈពេលធ្វើដំណើរ $t(v)=\\dfrac{"+d+"}{v}$ (ម៉ោង) ពេលល្បឿន $v$ km/h ។ គណនា $t("+v+")$ ហើយបើចង់ទៅដល់ក្នុង $2$ ម៉ោង ត្រូវល្បឿនប៉ុន្មាន?",
      [A(fr(d,v).s,fr(d,v).t,"num","t ="),A(d/2,null,"num","v =")],"$t="+fr(d,v).t+"$ h · $\\frac{"+d+"}{v}=2\\Rightarrow v="+(d/2)+"$","y="+d+"/x [10,120]")},
  function(){var k=ri(1,5),L=k*k;
    return Q("🕰️ ខួបនៃប៉ោលនាឡិកា $T\\approx2\\sqrt{L}$ (វិនាទី · $L$ ម៉ែត្រ)។ (ក) ប៉ោលវែង $"+L+"$ m មានខួបប៉ុន្មាន? (ខ) ចង់បានខួប $2$ s ត្រូវប៉ោលវែងប៉ុន្មាន m?",
      [A(2*k,null,"num","(ក) T ="),A(1,null,"num","(ខ) L =")],"$T=2\\sqrt{"+L+"}="+(2*k)+"$ · $2\\sqrt L=2\\Rightarrow L=1$","y=2sqrt(x) [0,"+(L+2)+"]")}];
P4[71]=[function(){var xs=[150,155,160,165,170],f=xs.map(function(){return ri(2,12)}),N=sum(f),k=ri(0,4),r=fr(f[k]*100,N);
    return Q("📏 ក្រាបបង្ហាញកម្ពស់សិស្ស (cm) ក្នុងថ្នាក់។ គណនាប្រេកង់ធៀប (%) នៃកម្ពស់ $"+xs[k]+"$ cm (បង្គត់ ២ ខ្ទង់ក្បៀសបាន)",
      [A(r.s,r.t,"num","% =")],"$\\dfrac{"+f[k]+"}{"+N+"}\\times100$","bar "+xs.map(function(x,i){return x+":"+f[i]}).join(" "))},
  function(){var xs=[1,2,3,4,5],f=xs.map(function(){return ri(1,10)}),k=ri(1,3),c=sum(f.slice(0,k+1));
    return Q("⏰ ក្រាបបង្ហាញចំនួនដងដែលសិស្សមកយឺតក្នុងមួយខែ ($x$)។ តើមានសិស្សប៉ុន្មាននាក់ មកយឺតមិនលើស $"+xs[k]+"$ ដង (ប្រេកង់កើន)?",
      [A(c,null,"num","នាក់ =")],"$"+f.slice(0,k+1).join("+")+"="+c+"$","bar "+xs.map(function(x,i){return x+":"+f[i]}).join(" "))}];
P4[72]=[function(){var a=sample(5,8,15).map(function(x){return x*100000}),big=ri(5,9)*1000000,b=a.concat([big]).sort(function(x,y){return x-y}),m=sum(b)/6,md=(b[2]+b[3])/2;
    return Q("💼 ប្រាក់ខែបុគ្គលិក ៦ នាក់ (រៀល)៖ $"+b.map(money).join(",\\ ")+"$ ។ (ក) មធ្យម (ខ) មេដ្យាន · តម្លៃណាតំណាងប្រាក់ខែភាគច្រើនបានល្អជាង? (គិតមើល!)",
      [A(Math.round(m),null,"num","(ក) ="),A(md,null,"num","(ខ) =")],"មធ្យម $\\approx"+money(Math.round(m))+"$ (ត្រូវទាញដោយប្រាក់ខែធំ) · មេដ្យាន $="+money(md)+"$ ⇒ មេដ្យានតំណាងល្អជាង")},
  function(){var n=ri(4,6),a,m,x;do{a=sample(n,10,30);m=ri(15,25);x=m*(n+1)-sum(a)}while(x<0||x>60);
    return Q("🏃 ក្រុមកីឡាមួយ រត់បាន (គីឡូម៉ែត្រ/សប្ដាហ៍)៖ $"+a.join(",\\ ")+"$ និងសមាជិកថ្មីម្នាក់ $x$ ។ មធ្យមក្រុម $"+m+"$ km ។ រក $x$",
      [A(x,null,"num","x =")],"$x="+m+"\\times"+(n+1)+"-"+sum(a)+"="+x+"$")}];
P4[81]=[function(){var T=pick(TR),u=[T[0],0],v=[0,T[1]];
    return Q("🚤 ទូកមួយបើកកាត់ទន្លេ ល្បឿន $\\vec u("+T[0]+";0)$ km/h ហើយចរន្តទឹក $\\vec v(0;"+T[1]+")$ km/h ។ ល្បឿនពិត $\\vec w=\\vec u+\\vec v$ ។ (ក) រក $\\vec w$ (ខ) $|\\vec w|$",
      [A(T[0],null,"num","x ="),A(T[1],null,"num","y ="),A(T[2],null,"num","|w| =")],"$\\vec w=("+T[0]+";"+T[1]+")$ · $|\\vec w|=\\sqrt{"+T[0]+"^2+"+T[1]+"^2}="+T[2]+"$","U("+T[0]+",0)\nW("+T[0]+","+T[1]+")\nvec O U\nvec U W gray\nvec O W red")},
  function(){var a=[ri(1,5),ri(1,5)],b=[ri(1,5),ri(-5,-1)],R=[a[0]+b[0],a[1]+b[1]];
    return Q("🪢 មនុស្សពីរនាក់ទាញថ្មធំមួយ ដោយខ្សែ៖ កម្លាំង $\\vec F_1"+pt(a)+"$ និង $\\vec F_2"+pt(b)+"$ (រយ N)។ រកកម្លាំងផលបូក $\\vec F=\\vec F_1+\\vec F_2$",
      [A(R[0],null,"num","x ="),A(R[1],null,"num","y =")],"$\\vec F="+pt(R)+"$","A("+a[0]+","+a[1]+")\nB("+b[0]+","+b[1]+")\nR("+R[0]+","+R[1]+")\nvec O A\nvec O B\nvec O R red")}];
P4[82]=[function(){var F=[ri(1,8),ri(0,6)],d=[ri(2,10),ri(-3,3)],W=F[0]*d[0]+F[1]*d[1];
    return Q("🛒 រុញរទេះដោយកម្លាំង $\\vec F"+pt(F)+"$ (N) រទេះផ្លាស់ទី $\\vec d"+pt(d)+"$ (m)។ កម្មន្ត $W=\\vec F\\cdot\\vec d$ (J)។ គណនា $W$",
      [A(W,null,"num","W =")],"$W="+F[0]+"\\cdot"+d[0]+"+"+F[1]+"\\cdot"+sgp(d[1])+"="+W+"$ J")},
  function(){var u=[nz(-5,5),nz(-5,5)],a=nz(-5,5),m=fr(-u[0]*a,u[1]);
    return Q("🛤️ ផ្លូវពីរ មានទិសដៅ $\\vec u"+pt(u)+"$ និង $\\vec v("+a+";m)$ ។ ដើម្បីឱ្យផ្លូវទាំងពីរកែងគ្នា រក $m$",
      [A(m.s,m.t,"num","m =")],"$\\vec u\\cdot\\vec v=0\\Rightarrow"+(u[0]*a)+sg(u[1],0)+"m=0\\Rightarrow m="+m.t+"$")}];
P4[91]=[function(){var P=[ri(0,6),ri(0,6)],v=[nz(-3,3),nz(-3,3)];
    return Q("🛋️ លើប្លង់បន្ទប់ (ក្រឡា = ១ m) សាឡុងនៅត្រង់ $A"+pt(P)+"$ ។ គេរំកិលវាតាមវ៉ិចទ័រ $\\vec v"+pt(v)+"$ ។ ទីតាំងថ្មី $A'$?",
      [A(P[0]+v[0],null,"num","x ="),A(P[1]+v[1],null,"num","y =")],"$A'=A+\\vec v="+pt([P[0]+v[0],P[1]+v[1]])+"$","A("+P[0]+","+P[1]+")")},
  function(){var P=[ri(-5,5),ri(-5,5)],Q2=[ri(-5,5),ri(-5,5)];
    return Q("🎮 តួអង្គក្នុងហ្គេមមួយ ផ្លាស់ពី $("+P.join(";")+")$ ទៅ $("+Q2.join(";")+")$ ដោយការកិល។ រកវ៉ិចទ័រកិល $\\vec v$",
      [A(Q2[0]-P[0],null,"num","x ="),A(Q2[1]-P[1],null,"num","y =")],"$\\vec v=("+(Q2[0]-P[0])+";"+(Q2[1]-P[1])+")$")}];
P4[92]=[function(){var P=[nz(-6,6),nz(-6,6)];
    return Q("🦋 រូបមេអំបៅឆ្លុះគ្នាធៀបនឹងអ័ក្ស $Oy$ ។ ចុងស្លាបឆ្វេងនៅ $A"+pt(P)+"$ ។ រកចុងស្លាបម្ខាងទៀត $A'$",
      [A(-P[0],null,"num","x ="),A(P[1],null,"num","y =")],"$(x;y)\\mapsto(-x;y)$","A("+P[0]+","+P[1]+")\nx=0 gray")},
  function(){var T=pick([[3,4,5],[6,8,10],[5,12,13],[8,15,17]]),a=ri(1,T[1]-1),b=T[1]-a;
    return Q("🐮 ផ្ទះ $A(0;"+a+")$ និងរោងគោ $B("+T[0]+";"+b+")$ នៅម្ខាងទន្លេ ($Ox$ = មាត់ទន្លេ · km)។ កសិករត្រូវដើរពី $A$ ទៅដងទឹកនៅទន្លេ រួចទៅ $B$ ។ ផ្លូវខ្លីបំផុត $=A'B$ ដែល $A'(0;-"+a+")$ ជារូបឆ្លុះនៃ $A$ ។ គណនា",
      [A(T[2],null,"num","km =")],"$A'B=\\sqrt{"+T[0]+"^2+("+b+"+"+a+")^2}=\\sqrt{"+(T[0]*T[0]+T[1]*T[1])+"}="+T[2]+"$","A(0,"+a+")\nB("+T[0]+","+b+")\nA'(0,-"+a+")\nseg A' B gray\ny=0 gray")}];
P4[93]=[function(){var r=ri(2,6),k=pick([1,2,3]);
    return Q("🕒 ចុងទ្រនិចនាទីវែង $"+r+"$ cm នៅ $(0;"+r+")$ (ម៉ោង :00 · ផ្ចិតនាឡិកា $O$)។ ក្រោយ $"+(15*k)+"$ នាទី វាវិលតាមទ្រនិចនាឡិកា $"+(90*k)+"^\\circ$ ។ ចុងទ្រនិចនៅត្រង់ណា?",
      [A([r,0,-r][k-1],null,"num","x ="),A([0,-r,0][k-1],null,"num","y =")],"វិល $-"+(90*k)+"^\\circ$ ⇒ $"+pt([[r,0,-r][k-1],[0,-r,0][k-1]])+"$","circle O "+r+" gray\nA(0,"+r+")\nvec O A")},
  function(){var P=[nz(-5,5),nz(-5,5)];
    return Q("🎠 កៅអីនៅលើវង់ឈ្មោះរង្វិល មានទីតាំង $A"+pt(P)+"$ (ផ្ចិត $O$)។ ក្រោយវិលកន្លះជុំ ($180^\\circ$) វានៅត្រង់ណា?",
      [A(-P[0],null,"num","x ="),A(-P[1],null,"num","y =")],"$(x;y)\\mapsto(-x;-y)$","A("+P[0]+","+P[1]+")\nvec O A")}];
Object.keys(P4).forEach(function(l){var L=P4[l];if(G[l])G[l][4]=function(){return pick(L)()}});


/* ===== ពិពិធកម្មទម្រង់លំហាត់ (២០២៦-១១) — មេរៀន×កម្រិតនីមួយៗ ≥ ៤ ទម្រង់ · គណនាផ្ទាល់ · រកអញ្ញាត · បញ្ហាជីវិតពិត · ត្រិះរិះ =====
   ជ្រើសចម្លើយមុន រួចបង្កើតទិន្នន័យ · kd = s10_… · vx(l,lv,[…]) → ទម្រង់ថ្មីនីមួយៗមានឱកាសស្មើទម្រង់ដើម · តក្កវិទ្យា ៖ 1 = ពិត · 0 = មិនពិត */
function K(kd,q,a,s,f){var o=Q(q,a,s,f);o.kd=kd;return o}
function vx(l,lv,L){var o=G[l][lv];G[l][lv]=function(){var i=Math.floor(Math.random()*(L.length+1));return i<L.length?L[i]():o()}}
function ang(v){return v+"^\\circ"}
function mo(v){return String(v).replace(/\B(?=(\d{3})+(?!\d))/g,"\\,")}
function fx(f){return f.d===1?String(f.n):(f.n<0?"-":"")+"\\dfrac{"+Math.abs(f.n)+"}{"+f.d+"}"}
function tv(b){return b?"ពិត":"មិនពិត"}
function isPr(n){if(n<2)return false;for(var d=2;d*d<=n;d++)if(n%d===0)return false;return true}
function tb2(xs,fs){return"\\begin{array}{|c|"+xs.map(function(){return"c|"}).join("")+"}\\hline x&"+xs.join("&")+"\\\\\\hline f&"+fs.join("&")+"\\\\\\hline\\end{array}"}
function fsum(n,N){var f;do{f=[];var r=N;for(var i=0;i<n-1;i++){var v=ri(1,Math.max(1,Math.floor(r/(n-i))*2-1));f.push(v);r-=v}f.push(r)}while(f.some(function(v){return v<1}));return f}
function rt(k,c){return c===0?["0","0"]:[c+"*sqrt("+k+")",(c===1?"":c===-1?"-":c)+"\\sqrt{"+k+"}"]}   /* c√k */
var NS=[2,3,5,6,7,10,11,13];   /* មិនមែនការេប្រាកដ */
/* ១.១ ពហុធា */
vx(11,1,[
 function(){var n=ri(2,4),c=[nz(-5,5)];for(var i=0;i<n;i++)c.push(ri(-6,6));return K("s10_deg","គេឱ្យ $P(x)="+polyT(c)+"$ ។ រកដឺក្រេ និងមេគុណនាំមុខនៃ $P(x)$",[A(n,null,"num","ដឺក្រេ ="),A(c[0],null,"num","មេគុណនាំមុខ =")],"តួដឺក្រេខ្ពស់បំផុត $"+co(c[0],n>1?"x^{"+n+"}":"x",true)+"$")},
 function(){var p=[nz(-4,4),ri(-6,6),ri(-6,6)],q=[ri(-4,4),ri(-6,6),ri(-6,6)];while(p[0]+q[0]===0)q[0]++;var e=[p[0]+q[0],p[1]+q[1],p[2]+q[2]];return K("s10_add","$P(x)="+polyT(p)+"$ , $Q(x)="+polyT(q)+"$ ។ គណនា $P(x)+Q(x)$",[A(poly(e),polyT(e),"expr","=")],"បូកតួដូចគ្នា ⇒ $"+polyT(e)+"$")},
 function(){var p=[nz(-4,4),ri(-6,6),ri(-6,6)],q=[ri(-4,4),ri(-6,6),ri(-6,6)];while(p[0]-q[0]===0)q[0]++;var e=[p[0]-q[0],p[1]-q[1],p[2]-q[2]];return K("s10_sub_11","$P(x)="+polyT(p)+"$ , $Q(x)="+polyT(q)+"$ ។ គណនា $P(x)-Q(x)$",[A(poly(e),polyT(e),"expr","=")],"ដក ⇒ ប្ដូរសញ្ញាតួនៃ $Q$ ⇒ $"+polyT(e)+"$")}]);
vx(11,2,[
 function(){var a=nz(1,4),b=nz(-6,6),e=[a*a,2*a*b,b*b];return K("s10_sq","ពន្លាត $("+poly([a,b])+")^2$",[A(poly(e),polyT(e),"expr","=")],"$(A+B)^2=A^2+2AB+B^2$ ⇒ $"+polyT(e)+"$")},
 function(){var a=nz(1,4),b=nz(1,9),e=[a*a,0,-b*b];return K("s10_diff_11","ពន្លាត $("+poly([a,b])+")("+poly([a,-b])+")$",[A(poly(e),polyT(e),"expr","=")],"$(A+B)(A-B)=A^2-B^2$ ⇒ $"+polyT(e)+"$")},
 function(){var a=nz(-6,6),b=nz(-6,6);if(a>b){var t=a;a=b;b=t}return K("s10_id","រក $a\\le b$ ដែល $(x+a)(x+b)=x^2"+co(a+b,"x")+sg(a*b,0)+"$ គ្រប់ $x$",[A(a,null,"num","a ="),A(b,null,"num","b =")],"$a+b="+(a+b)+"$ , $ab="+(a*b)+"$ ⇒ $a="+a+"$ , $b="+b+"$")}]);
vx(11,3,[
 function(){var a=nz(-3,3),e=[1,3*a,3*a*a,a*a*a];return K("s10_cube_11","ពន្លាត $(x"+sg(a,0)+")^3$",[A(poly(e),polyT(e),"expr","=")],"$(x+a)^3=x^3+3ax^2+3a^2x+a^3$ ⇒ $"+polyT(e)+"$")},
 function(){var a=nz(-6,6),b=nz(-9,9);return K("s10_ident","រក $m$ និង $n$ ដែល $x^2+mx+n=(x"+sg(a,0)+")^2"+sg(-b,0)+"$ គ្រប់ $x$",[A(2*a,null,"num","m ="),A(a*a-b,null,"num","n =")],"ពន្លាត ⇒ $x^2"+co(2*a,"x")+sg(a*a-b,0)+"$")},
 function(){var a=nz(-6,6),b=nz(-6,6),c=nz(-6,6),e=[a+b-2*c,a*b-c*c];if(!e[0]&&!e[1])e=[a+b-2*c,a*b-c*c];return K("s10_val3","សម្រួល $(x"+sg(a,0)+")(x"+sg(b,0)+")-(x"+sg(c,0)+")^2$",[A(poly(e),polyT(e),"expr","=")],"$x^2"+co(a+b,"x")+sg(a*b,0)+"-(x^2"+co(2*c,"x")+"+"+(c*c)+")="+polyT(e)+"$")}]);
/* ១.២ ចែកពហុធា */
vx(12,1,[
 function(){var a=nz(-4,4),b=ri(-6,6),c=ri(-9,9),q=[1,b+a],r=a*a+a*b+c;return K("s10_lin_12","ចែក $x^2"+co(b,"x")+sg(c,0)+"$ នឹង $x"+sg(-a,0)+"$ ។ រកផលចែក $Q(x)$ និងសំណល់ $R$",[A(poly(q),polyT(q),"expr","Q(x) ="),A(r,null,"num","R =")],"ហ៊័រណឺ ⇒ $Q(x)="+polyT(q)+"$ · $R=P("+a+")="+r+"$")},
 function(){var a=nz(-3,3),c=[nz(-3,3),ri(-4,4),ri(-5,5)],r=c[0]*a*a-c[1]*a+c[2];return K("s10_rem2","រកសំណល់នៃការចែក $P(x)="+polyT(c)+"$ នឹង $x"+sg(a,0)+"$",[A(r,null,"num","R =")],"$R=P("+(-a)+")="+r+"$")},
 function(){var a=nz(-5,5),b=ri(-6,6);return K("s10_mono","ចែក $"+co(a,"x^3",true)+co(b,"x^2")+"$ នឹង $x^2$ ($x\\ne0$)",[A(poly([a,b]),polyT([a,b]),"expr","=")],"ចែកតួនីមួយៗ ⇒ $"+polyT([a,b])+"$")}]);
vx(12,2,[
 function(){var a=nz(-4,4),b=ri(-6,6),m=-(a*a+a*b);return K("s10_find","រក $m$ ដើម្បីឱ្យ $x"+sg(-a,0)+"$ ជាកត្តានៃ $x^2"+co(b,"x")+"+m$",[A(m,null,"num","m =")],"$P("+a+")=0$ ⇒ $"+(a*a)+sg(a*b,0)+"+m=0$ ⇒ $m="+m+"$")},
 function(){var r=[nz(-4,4),nz(-4,4),nz(-4,4)];while(r[1]===r[0])r[1]++;while(r[2]===r[0]||r[2]===r[1])r[2]++;var c=[1,-(r[0]+r[1]+r[2]),r[0]*r[1]+r[1]*r[2]+r[0]*r[2],-r[0]*r[1]*r[2]],o=[r[1],r[2]].sort(function(x,y){return x-y});
   return K("s10_fac3","$x="+r[0]+"$ ជាឫសនៃ $"+polyT(c)+"=0$ ។ រកឫសពីរទៀត ($x_1<x_2$)",[A(o[0],null,"num","x₁ ="),A(o[1],null,"num","x₂ =")],"ចែកនឹង $x"+sg(-r[0],0)+"$ ⇒ $x^2"+co(-(r[1]+r[2]),"x")+sg(r[1]*r[2],0)+"=0$ ⇒ $"+o[0]+"$ , $"+o[1]+"$")},
 function(){var c=[ri(1,4)*2,ri(-6,6),ri(-6,6),ri(-6,6)],v=fr(c[0]+2*c[1]+4*c[2]+8*c[3],8);return K("s10_rem3","រកសំណល់នៃការចែក $P(x)="+polyT(c)+"$ នឹង $2x-1$",[A(v.s,v.t,"num","R =")],"$R=P\\left(\\tfrac12\\right)="+v.t+"$")}]);
vx(12,3,[
 function(){var m=2*ri(-4,4),n=ri(-6,6),r1=1+m+n,r2=1-m+n;return K("s10_two_12","$P(x)=x^2+mx+n$ ចែកនឹង $x-1$ សល់ $"+r1+"$ ហើយចែកនឹង $x+1$ សល់ $"+r2+"$ ។ រក $m$ និង $n$",[A(m,null,"num","m ="),A(n,null,"num","n =")],"$\\begin{cases}1+m+n="+r1+"\\\\1-m+n="+r2+"\\end{cases}$ ⇒ $m="+m+"$ , $n="+n+"$")},
 function(){var a=nz(-5,5),b=nz(-5,5);while(b===a)b++;return K("s10_mn","រក $m$ និង $n$ ដើម្បីឱ្យ $x^2+mx+n$ ចែកដាច់នឹង $x"+sg(-a,0)+"$ និង $x"+sg(-b,0)+"$",[A(-(a+b),null,"num","m ="),A(a*b,null,"num","n =")],"$x^2+mx+n=(x"+sg(-a,0)+")(x"+sg(-b,0)+")$ ⇒ $m="+(-(a+b))+"$ , $n="+(a*b)+"$")},
 function(){var a=nz(-3,3),k=nz(-4,4),b=ri(-6,6),c=-(k*a*a+b*a);return K("s10_kq","រក $k$ ដើម្បីឱ្យ $kx^2"+co(b,"x")+sg(c,0)+"$ ចែកដាច់នឹង $x"+sg(-a,0)+"$",[A(k,null,"num","k =")],"$P("+a+")=0$ ⇒ $"+(a*a)+"k"+sg(b*a,0)+sg(c,0)+"=0$ ⇒ $k="+k+"$")}]);
/* ២.១ តក្កវិទ្យា (1 = ពិត · 0 = មិនពិត) */
vx(21,1,[
 function(){var a=ri(1,9),b=ri(1,9),p=a>b;return K("s10_neg","សំណើ $p$ ៖ «$"+a+">"+b+"$» ។ តើ $\\overline{p}$ ពិតឬមិនពិត? ($1$/$0$)",[A(p?0:1,null,"num","តម្លៃ =")],"$p$ "+tv(p)+" ⇒ $\\overline p$ "+tv(!p))},
 function(){var a=ri(2,20),b=ri(1,20),p=isPr(a),q=b%2===0;return K("s10_or2","$p$ ៖ «$"+a+"$ ជាចំនួនបឋម» · $q$ ៖ «$"+b+"$ ជាចំនួនគូ» ។ តើ $p\\lor q$ ពិតឬមិនពិត? ($1$/$0$)",[A(p||q?1:0,null,"num","តម្លៃ =")],"$p$ "+tv(p)+" · $q$ "+tv(q)+" ⇒ $p\\lor q$ "+tv(p||q))},
 function(){var a=ri(1,9),b=ri(1,9),p=a%2===0,q=b%2===0;return K("s10_eqv","$p$ ៖ «$"+a+"$ ជាចំនួនគូ» · $q$ ៖ «$"+b+"$ ជាចំនួនគូ» ។ តើ $p\\Leftrightarrow q$ ពិតឬមិនពិត? ($1$/$0$)",[A(p===q?1:0,null,"num","តម្លៃ =")],"$p\\Leftrightarrow q$ ពិត ពេល $p,q$ មានតម្លៃដូចគ្នា ⇒ "+tv(p===q))}]);
var ST=[["$\\sqrt{16}=4$",1],["$-3^2=9$",0],["$0$ ជាចំនួនគូ",1],["$1$ ជាចំនួនបឋម",0],["$\\sqrt2$ ជាចំនួនសនិទាន",0],["$2^0=1$",1],["$\\dfrac{1}{3}=0.33$",0],["$|-5|=5$",1],["$(-2)^3=-8$",1],["$\\pi=3.14$",0]];
vx(21,2,[
 function(){var a=ri(1,20),b=ri(1,20),c=ri(1,20),p=a%2===0,q=b>10,r=c%3===0;return K("s10_and3","$p$ ៖ «$"+a+"$ ជាចំនួនគូ» · $q$ ៖ «$"+b+">10$» · $r$ ៖ «$"+c+"$ ចែកដាច់នឹង $3$» ។ តើ $p\\land(q\\lor r)$ ពិតឬមិនពិត? ($1$/$0$)",[A(p&&(q||r)?1:0,null,"num","តម្លៃ =")],"$p$ "+tv(p)+" · $q\\lor r$ "+tv(q||r)+" ⇒ "+tv(p&&(q||r)))},
 function(){var a=ri(1,9),b=ri(1,9),p=a>4,q=b<5,v=!p||q;return K("s10_contra","$p$ ៖ «$"+a+">4$» · $q$ ៖ «$"+b+"<5$» ។ តើ $\\overline q\\Rightarrow\\overline p$ ពិតឬមិនពិត? ($1$/$0$)",[A(v?1:0,null,"num","តម្លៃ =")],"$\\overline q\\Rightarrow\\overline p$ មានតម្លៃដូច $p\\Rightarrow q$ (បដិការ) ⇒ "+tv(v))},
 function(){var L=ST.slice().sort(function(){return Math.random()-.5}).slice(0,4),n=L.filter(function(x){return x[1]}).length;return K("s10_count","ក្នុងចំណោមសំណើ ៖ (១) "+L[0][0]+" (២) "+L[1][0]+" (៣) "+L[2][0]+" (៤) "+L[3][0]+" ។ តើមានប៉ុន្មានសំណើពិត?",[A(n,null,"num","ចំនួន =")],L.map(function(x,i){return"("+(i+1)+") "+tv(x[1])}).join(" · ")+" ⇒ $"+n+"$")}]);
vx(21,3,[
 function(){var a=ri(1,9),b=ri(1,9),p=a+b>9,q=a*b<20,v=!(p||q);return K("s10_dem","$p$ ៖ «$"+a+"+"+b+">9$» · $q$ ៖ «$"+a+"\\times"+b+"<20$» ។ តើ $\\overline{p\\lor q}$ ពិតឬមិនពិត? ($1$/$0$)",[A(v?1:0,null,"num","តម្លៃ =")],"ដឺម៉ក ៖ $\\overline{p\\lor q}=\\overline p\\land\\overline q$ ⇒ "+tv(v))},
 function(){var S=[ri(-3,0),ri(1,3),ri(4,6)],k=ri(0,20),v=S.every(function(x){return x*x>k});return K("s10_quant","តើសំណើ «$\\forall x\\in\\{"+S.join(",")+"\\},\\ x^2>"+k+"$» ពិតឬមិនពិត? ($1$/$0$)",[A(v?1:0,null,"num","តម្លៃ =")],"$x^2$ ៖ $"+S.map(function(x){return x*x}).join(",")+"$ ⇒ "+tv(v))},
 function(){var S=[ri(-5,-1),ri(0,2),ri(3,6)],a=nz(1,3),x0=pick(S.concat([7,-6])),b=-a*x0,v=S.indexOf(x0)>=0;return K("s10_exist","តើសំណើ «$\\exists x\\in\\{"+S.join(",")+"\\}:\\ "+co(a,"x",true)+sg(b,0)+"=0$» ពិតឬមិនពិត? ($1$/$0$)",[A(v?1:0,null,"num","តម្លៃ =")],"ឫស $x="+x0+"$ "+(v?"នៅក្នុង":"មិននៅក្នុង")+"សំណុំ ⇒ "+tv(v))}]);
/* ២.២ សំណុំ */
function rset(n,lo,hi){var s=[];while(s.length<n){var v=ri(lo,hi);if(s.indexOf(v)<0)s.push(v)}return s.sort(function(a,b){return a-b})}
vx(22,1,[
 function(){var A1=rset(ri(4,6),1,12),B=rset(ri(4,6),1,12),I=A1.filter(function(x){return B.indexOf(x)>=0});return K("s10_inter","$A=\\{"+A1.join(",")+"\\}$ , $B=\\{"+B.join(",")+"\\}$ ។ រក $n(A\\cap B)$",[A(I.length,null,"num","=")],"$A\\cap B=\\{"+(I.join(",")||"")+"\\}$ ⇒ $"+I.length+"$")},
 function(){var A1=rset(ri(3,5),1,10),B=rset(ri(3,5),1,10),U=A1.concat(B.filter(function(x){return A1.indexOf(x)<0}));return K("s10_union","$A=\\{"+A1.join(",")+"\\}$ , $B=\\{"+B.join(",")+"\\}$ ។ រក $n(A\\cup B)$",[A(U.length,null,"num","=")],"$A\\cup B$ មាន $"+U.length+"$ ធាតុ")},
 function(){var n=ri(1,6);return K("s10_subs","សំណុំមួយមាន $"+n+"$ ធាតុ ។ តើវាមានសំណុំរងប៉ុន្មាន (រួមទាំង $\\varnothing$ និងខ្លួនវា)?",[A(Math.pow(2,n),null,"num","=")],"$2^{"+n+"}="+Math.pow(2,n)+"$")}]);
vx(22,2,[
 function(){var a=ri(10,30),i=ri(1,a-1);return K("s10_diff_22","$n(A)="+a+"$ និង $n(A\\cap B)="+i+"$ ។ គណនា $n(A\\setminus B)$",[A(a-i,null,"num","=")],"$n(A\\setminus B)=n(A)-n(A\\cap B)="+(a-i)+"$")},
 function(){var u=ri(20,50),a=ri(5,u-1);return K("s10_comp_22","$n(U)="+u+"$ និង $n(A)="+a+"$ ($A\\subset U$) ។ គណនា $n(\\overline A)$",[A(u-a,null,"num","=")],"$"+u+"-"+a+"="+(u-a)+"$")},
 function(){var a=ri(10,30),b=ri(10,30),i=ri(1,Math.min(a,b)-1);return K("s10_inters","$n(A)="+a+"$ , $n(B)="+b+"$ , $n(A\\cup B)="+(a+b-i)+"$ ។ គណនា $n(A\\cap B)$",[A(i,null,"num","=")],"$n(A\\cap B)=n(A)+n(B)-n(A\\cup B)="+i+"$")}]);
vx(22,3,[
 function(){var a=ri(10,25),b=ri(10,25),i=ri(2,Math.min(a,b)-2);return K("s10_only","ក្នុងក្រុមមួយ $"+a+"$ នាក់ចេះអង់គ្លេស $"+b+"$ នាក់ចេះបារាំង និង $"+i+"$ នាក់ចេះទាំងពីរ ។ តើប៉ុន្មាននាក់ចេះតែអង់គ្លេស?",[A(a-i,null,"num","=")],"$"+a+"-"+i+"="+(a-i)+"$")},
 function(){var ab=ri(2,5),bc=ri(2,5),ca=ri(2,5),abc=ri(1,Math.min(ab,bc,ca)-0),a=ab+ca+ri(2,8),b=ab+bc+ri(2,8),c=bc+ca+ri(2,8),U=a+b+c-ab-bc-ca+abc;return K("s10_three","$n(A)="+a+"$ , $n(B)="+b+"$ , $n(C)="+c+"$ , $n(A\\cap B)="+ab+"$ , $n(B\\cap C)="+bc+"$ , $n(C\\cap A)="+ca+"$ , $n(A\\cap B\\cap C)="+abc+"$ ។ គណនា $n(A\\cup B\\cup C)$",[A(U,null,"num","=")],"$"+(a+b+c)+"-"+(ab+bc+ca)+"+"+abc+"="+U+"$")},
 function(){var N=pick([30,50,60,100]),p=pick([2,3,4,5]),q=pick([3,5,6,7]);while(q===p)q++;var n=Math.floor(N/p)+Math.floor(N/q)-Math.floor(N/lcm(p,q));return K("s10_atl","តើមានចំនួនគត់ពី $1$ ដល់ $"+N+"$ ប៉ុន្មាន ដែលចែកដាច់នឹង $"+p+"$ ឬ $"+q+"$ ?",[A(n,null,"num","=")],"$"+Math.floor(N/p)+"+"+Math.floor(N/q)+"-"+Math.floor(N/lcm(p,q))+"="+n+"$ (ដក ពហុគុណនៃ $"+lcm(p,q)+"$)")}]);
/* ២.៣ ចំនួន */
vx(23,1,[
 function(){var k=pick(NS.slice(0,5)),a=ri(1,5),b=ri(1,5);return K("s10_rad1","សរសេរ $\\sqrt{"+(a*a*k)+"}+\\sqrt{"+(b*b*k)+"}$ ជា $c\\sqrt{"+k+"}$ ។ រក $c$",[A(a+b,null,"num","c =")],"$"+(a===1?"":a)+"\\sqrt{"+k+"}+"+(b===1?"":b)+"\\sqrt{"+k+"}="+(a+b)+"\\sqrt{"+k+"}$")},
 function(){var a=nz(-15,15),b=nz(-15,15);return K("s10_absv","គណនា $|"+a+"-("+b+")|$",[A(Math.abs(a-b),null,"num","=")],"$|"+(a-b)+"|="+Math.abs(a-b)+"$")},
 function(){var a=ri(-6,3),b=a+ri(2,9);return K("s10_cnt","តើមានចំនួនគត់ប៉ុន្មាន ក្នុងចន្លោះ $["+a+";"+b+")$ ?",[A(b-a,null,"num","=")],"$\\{"+a+",\\dots,"+(b-1)+"\\}$ ⇒ $"+(b-a)+"$")}]);
vx(23,2,[
 function(){var a=ri(2,6),k=pick(NS);return K("s10_rat","គណនា $("+a+"\\sqrt{"+k+"})^2$",[A(a*a*k,null,"num","=")],"$"+(a*a)+"\\times"+k+"="+(a*a*k)+"$")},
 function(){var a=ri(2,9),k=pick(NS);return K("s10_mulr","គណនា $("+a+"+\\sqrt{"+k+"})("+a+"-\\sqrt{"+k+"})$",[A(a*a-k,null,"num","=")],"$"+a+"^2-"+k+"="+(a*a-k)+"$")},
 function(){var a=ri(-6,6),b=ri(1,8);return K("s10_dist","ដោះស្រាយ $|x"+sg(-a,0)+"|="+b+"$ ($x_1<x_2$)",[A(a-b,null,"num","x₁ ="),A(a+b,null,"num","x₂ =")],"$x"+sg(-a,0)+"=\\pm"+b+"$ ⇒ $"+(a-b)+"$ ឬ $"+(a+b)+"$")}]);
vx(23,3,[
 function(){var b=ri(1,3),k=pick(NS.filter(function(v){return v!==b*b})),d=k-b*b,m=nz(1,4),a=d*m;return K("s10_conj","សម្រួលភាគបែង $\\dfrac{"+a+"}{\\sqrt{"+k+"}-"+b+"}$",[A(m+"*(sqrt("+k+")+"+b+")",(m===1?"":m===-1?"-":m)+"(\\sqrt{"+k+"}+"+b+")","num","=")],"គុណនឹងកន្សោមឆ្លាស់ ៖ $\\dfrac{"+a+"(\\sqrt{"+k+"}+"+b+")}{"+k+"-"+(b*b)+"}$")},
 function(){var P=pick([[3,2],[5,2],[5,3],[6,2],[7,2],[7,3],[6,5],[7,5]]),p=P[0],q=P[1];return K("s10_nest","សម្រួល $\\sqrt{"+(p+q)+"+2\\sqrt{"+(p*q)+"}}$",[A("sqrt("+p+")+sqrt("+q+")","\\sqrt{"+p+"}+\\sqrt{"+q+"}","num","=")],"$"+(p+q)+"+2\\sqrt{"+(p*q)+"}=(\\sqrt{"+p+"}+\\sqrt{"+q+"})^2$")},
 function(){var a=nz(1,4),b=ri(-9,9),c=ri(1,9),s=fr(-2*b,a);return K("s10_abse","រកផលបូកឫសនៃ $|"+co(a,"x",true)+sg(b,0)+"|="+c+"$",[A(s.s,s.t,"num","=")],"$"+a+"x"+sg(b,0)+"=\\pm"+c+"$ ⇒ ផលបូក $="+s.t+"$")}]);
/* ៣.១ សមីការដឺក្រេទី២ */
vx(31,1,[
 function(){var a=nz(-4,4),r=nz(-6,6),b=-a*r;return K("s10_fac","ដោះស្រាយ $"+co(a,"x^2",true)+co(b,"x")+"=0$ ។ រកឫសមិនសូន្យ",[A(r,null,"num","x =")],"$x("+co(a,"x",true)+sg(b,0)+")=0$ ⇒ $x=0$ ឬ $x="+r+"$")},
 function(){var r1=nz(-6,6),r2=nz(-6,6),b=-(r1+r2),c=r1*r2;return K("s10_root","$x="+r1+"$ ជាឫសនៃ $x^2"+co(b,"x")+sg(c,0)+"=0$ ។ រកឫសមួយទៀត",[A(r2,null,"num","x =")],"$x_1+x_2="+(-b)+"$ ⇒ $x_2="+(-b)+"-("+r1+")="+r2+"$")},
 function(){var a=nz(1,5),r=ri(1,7);return K("s10_pure","ដោះស្រាយ $"+co(a,"x^2",true)+"="+(a*r*r)+"$ ។ រកឫសវិជ្ជមាន",[A(r,null,"num","x =")],"$x^2="+(r*r)+"$ ⇒ $x=\\pm"+r+"$")}]);
vx(31,2,[
 function(){var t=ri(0,2),a=nz(1,3),h,b,c;if(t===2){var r1=nz(-4,4),r2=r1+nz(1,4);b=-a*(r1+r2);c=a*r1*r2}else if(t===1){h=nz(-4,4);b=-2*a*h;c=a*h*h}else{b=ri(-4,4);c=Math.floor(b*b/(4*a))+ri(1,5)}return K("s10_nroots","សមីការ $"+polyT([a,b,c])+"=0$ មានឫសពិតប៉ុន្មាន?",[A(t,null,"num","ចំនួន =")],"$\\Delta="+(b*b-4*a*c)+"$ ⇒ "+(t===2?"$\\Delta>0$ ⇒ $2$":t===1?"$\\Delta=0$ ⇒ $1$ (ឫសឌុប)":"$\\Delta<0$ ⇒ $0$"))},
 function(){var h=nz(-6,6),b=2*h;return K("s10_m","រក $m$ ដើម្បីឱ្យ $x^2"+co(b,"x")+"+m=0$ មានឫសឌុប",[A(h*h,null,"num","m =")],"$\\Delta="+(b*b)+"-4m=0$ ⇒ $m="+(h*h)+"$")},
 function(){var p=ri(-5,5),d=pick(NS),b=-2*p,c=p*p-d;return K("s10_formula","ដោះស្រាយ $x^2"+co(b,"x")+sg(c,0)+"=0$ ។ សរសេរឫសធំ",[A(p+"+sqrt("+d+")",(p?p+"+":"")+"\\sqrt{"+d+"}","num","x₂ =")],"$\\Delta'="+(p*p)+"-("+c+")="+d+"$ ⇒ $x="+p+"\\pm\\sqrt{"+d+"}$")}]);
vx(31,3,[
 function(){var r1=nz(-6,6),r2=nz(-6,6),S=r1+r2,P=r1*r2;return K("s10_sym","$x_1,x_2$ ជាឫសនៃ $x^2"+co(-S,"x")+sg(P,0)+"=0$ ។ គណនា $x_1^2+x_2^2$ (មិនចាំបាច់ដោះស្រាយ)",[A(S*S-2*P,null,"num","=")],"$(x_1+x_2)^2-2x_1x_2="+(S*S)+sg(-2*P,0)+"="+(S*S-2*P)+"$")},
 function(){var r1=nz(-6,6),r2=nz(-6,6);return K("s10_build","សរសេរសមីការ $x^2+bx+c=0$ ដែលមានឫស $"+r1+"$ និង $"+r2+"$ ។ រក $b$ និង $c$",[A(-(r1+r2),null,"num","b ="),A(r1*r2,null,"num","c =")],"$b=-(x_1+x_2)="+(-(r1+r2))+"$ · $c=x_1x_2="+(r1*r2)+"$")},
 function(){var w=ri(2,10),l=w+ri(1,8);return K("s10_word","ចតុកោណកែងមួយមានបរិមាត្រ $"+(2*(l+w))+"$ m និងផ្ទៃក្រឡា $"+(l*w)+"$ m² ។ គណនាបណ្ដោយ",[A(l,null,"num","=")],"$x$ , $y$ ជាឫសនៃ $t^2-"+(l+w)+"t+"+(l*w)+"=0$ ⇒ $"+l+"$ និង $"+w+"$")}]);
/* ៣.២ សមីការអសនិទាន និងដឺក្រេខ្ពស់ */
vx(32,1,[
 function(){var x=ri(1,9),a=ri(2,5),c=ri(1,a-1),b=ri(0,9),d=a*x+b-c*x;return K("s10_sq2","ដោះស្រាយ $\\sqrt{"+a+"x"+sg(b,0)+"}=\\sqrt{"+co(c,"x",true)+sg(d,0)+"}$",[A(x,null,"num","x =")],"$"+a+"x"+sg(b,0)+"="+c+"x"+sg(d,0)+"$ ⇒ $x="+x+"$ (ផ្ទៀងផ្ទាត់ ៖ ក្រោមឫស $="+(a*x+b)+"\\ge0$)")},
 function(){var r=nz(-5,5);return K("s10_cube_32","ដោះស្រាយ $x^3="+(r*r*r)+"$",[A(r,null,"num","x =")],"$x=\\sqrt[3]{"+(r*r*r)+"}="+r+"$")},
 function(){var r=ri(1,4);return K("s10_bq","ដោះស្រាយ $x^4="+Math.pow(r,4)+"$ ។ រកឫសវិជ្ជមាន",[A(r,null,"num","x =")],"$x^2="+(r*r)+"$ ⇒ $x=\\pm"+r+"$")}]);
vx(32,2,[
 function(){var k=ri(1,6);return K("s10_bi2","ដោះស្រាយ $x^4-"+(k*k)+"x^2=0$ ។ រកឫសវិជ្ជមាន",[A(k,null,"num","x =")],"$x^2(x^2-"+(k*k)+")=0$ ⇒ $x=0$ ឬ $x=\\pm"+k+"$")},
 function(){var T=pick([[3,4,5],[6,8,10],[5,12,13],[8,15,17]]),a=T[1]*T[1];return K("s10_sqa","ដោះស្រាយ $\\sqrt{x^2+"+a+"}="+T[2]+"$ ។ រកឫសវិជ្ជមាន",[A(T[0],null,"num","x =")],"$x^2+"+a+"="+(T[2]*T[2])+"$ ⇒ $x^2="+(T[0]*T[0])+"$ ⇒ $x="+T[0]+"$")},
 function(){var k=ri(1,7);return K("s10_xk","ដោះស្រាយ $x^3-"+co(k*k,"x",true)+"=0$ ។ រកឫសធំបំផុត",[A(k,null,"num","x =")],"$x(x-"+k+")(x+"+k+")=0$ ⇒ ធំបំផុត $"+k+"$")}]);
vx(32,3,[
 function(){var p=ri(1,4),q=ri(1,6),b=q-p*p,c=-p*p*q;return K("s10_trin","ដោះស្រាយ $x^4"+co(b,"x^2")+sg(c,0)+"=0$ ។ រកឫសវិជ្ជមាន",[A(p,null,"num","x =")],"តាង $t=x^2\\ge0$ ៖ $(t-"+(p*p)+")(t+"+q+")=0$ ⇒ $t="+(p*p)+"$ (យក) ⇒ $x="+p+"$")},
 function(){var a=ri(1,6),s=ri(1,6);return K("s10_ab_32","ដោះស្រាយ $x^3-"+a+"x^2-"+(s*s)+"x+"+(a*s*s)+"=0$ ។ រកឫសធំបំផុត",[A(Math.max(a,s),null,"num","x =")],"ដាក់ជាក្រុម ៖ $(x-"+a+")(x^2-"+(s*s)+")=0$ ⇒ $x="+a+"$ ឬ $\\pm"+s+"$")},
 function(){var m=ri(2,6),k=m*m-1,x=(1+m)*(1+m);return K("s10_sqx","ដោះស្រាយ $x-2\\sqrt x-"+k+"=0$",[A(x,null,"num","x =")],"តាង $t=\\sqrt x\\ge0$ ៖ $t^2-2t-"+k+"=0$ ⇒ $t="+(1+m)+"$ (យក) ⇒ $x="+x+"$")}]);
/* ៣.៣ ប្រព័ន្ធសមីការ */
vx(33,1,[
 function(){var x=ri(-5,6),y=ri(-5,6),a=nz(-3,3),b=y-a*x,c=nz(1,4),d=nz(-3,3);return K("s10_sub_33","ដោះស្រាយ $\\begin{cases}y="+co(a,"x",true)+sg(b,0)+"\\\\"+co(c,"x",true)+co(d,"y")+"="+(c*x+d*y)+"\\end{cases}$",[A(x,null,"num","x ="),A(y,null,"num","y =")],"ជំនួស $y$ ⇒ $x="+x+"$ , $y="+y+"$")},
 function(){var x=ri(-9,15),y=ri(-9,15);return K("s10_sd","ដោះស្រាយ $\\begin{cases}x+y="+(x+y)+"\\\\x-y="+(x-y)+"\\end{cases}$",[A(x,null,"num","x ="),A(y,null,"num","y =")],"បូក ⇒ $2x="+(2*x)+"$ ⇒ $x="+x+"$ , $y="+y+"$")},
 function(){var p=ri(1,5),q=ri(1,6),k=ri(2,8);return K("s10_ratio","ដោះស្រាយ $\\dfrac xy=\\dfrac{"+p+"}{"+q+"}$ និង $x+y="+((p+q)*k)+"$",[A(p*k,null,"num","x ="),A(q*k,null,"num","y =")],"$x="+p+"k$ , $y="+q+"k$ ⇒ $k="+k+"$")}]);
vx(33,2,[
 function(){var a=nz(-5,5),b=nz(-5,5),c=nz(-5,5),d=nz(-5,5);return K("s10_det","គណនាដេទែរមីណង់ $D$ នៃប្រព័ន្ធ $\\begin{cases}"+co(a,"x",true)+co(b,"y")+"=1\\\\"+co(c,"x",true)+co(d,"y")+"=2\\end{cases}$",[A(a*d-b*c,null,"num","D =")],"$D=ad-bc="+(a*d)+"-("+(b*c)+")="+(a*d-b*c)+"$")},
 function(){var x=ri(-5,5),y=ri(-5,5);while(y<=x)y=ri(-5,6);return K("s10_nl","ដោះស្រាយ $\\begin{cases}x+y="+(x+y)+"\\\\x^2+y^2="+(x*x+y*y)+"\\end{cases}$ ដែល $x<y$",[A(x,null,"num","x ="),A(y,null,"num","y =")],"$xy=\\dfrac{(x+y)^2-(x^2+y^2)}{2}="+(x*y)+"$ ⇒ ឫសនៃ $t^2"+co(-(x+y),"t")+sg(x*y,0)+"=0$")},
 function(){var c=ri(5,15),y=ri(3,10),k=ri(2,4),f=k*(c+y)-y;return K("s10_age","ឥឡូវ ឪពុកមានអាយុ $"+f+"$ ឆ្នាំ ។ ក្រោយ $"+y+"$ ឆ្នាំ អាយុឪពុកស្មើ $"+k+"$ ដងនៃអាយុកូន ។ រកអាយុកូនឥឡូវ",[A(c,null,"num","=")],"$"+f+"+"+y+"="+k+"(x+"+y+")$ ⇒ $x="+c+"$")}]);
vx(33,3,[
 function(){var x=ri(-4,6),y=ri(-4,6),z=ri(-4,6);return K("s10_3var","ដោះស្រាយ $\\begin{cases}x+y+z="+(x+y+z)+"\\\\x-y="+(x-y)+"\\\\y-z="+(y-z)+"\\end{cases}$",[A(x,null,"num","x ="),A(y,null,"num","y ="),A(z,null,"num","z =")],"$x=y"+sg(x-y,0)+"$ , $z=y"+sg(z-y,0)+"$ ⇒ $3y"+sg(x-y+z-y,0)+"="+(x+y+z)+"$ ⇒ $y="+y+"$")},
 function(){var a=nz(-3,3),b=nz(-3,3),k=pick([2,3,-2]),c=ri(-6,6),d=k*c+nz(-3,3);return K("s10_param","រក $m$ ដើម្បីឱ្យប្រព័ន្ធ $\\begin{cases}"+co(a,"x",true)+co(b,"y")+"="+c+"\\\\"+co(k*a,"x",true)+"+my="+d+"\\end{cases}$ គ្មានចម្លើយ",[A(k*b,null,"num","m =")],"$D=0$ ⇒ $"+a+"m="+(k*a*b)+"$ ⇒ $m="+(k*b)+"$ ហើយ $"+d+"\\ne"+(k*c)+"$")},
 function(){var A1=pick([10,20]),B1=pick([30,40,50]),x=ri(1,10),y=x*pick([1,2,3]),c=(A1*x+B1*y)/(x+y);while(c!==Math.round(c)){y++;c=(A1*x+B1*y)/(x+y)}return K("s10_mixs","លាយទឹកអំបិល $"+A1+"\\%$ ជាមួយ $"+B1+"\\%$ បានល្បាយ $"+(x+y)+"$ l កំហាប់ $"+c+"\\%$ ។ ប្រើប្រភេទនីមួយៗប៉ុន្មាន l?",[A(x,null,"num",A1+"% ="),A(y,null,"num",B1+"% =")],"$\\begin{cases}x+y="+(x+y)+"\\\\"+A1+"x+"+B1+"y="+(c*(x+y))+"\\end{cases}$")}]);
/* ៣.៤ វិសមីការ */
vx(34,1,[
 function(){var c=ri(1,4),a=c+ri(1,4),b=ri(-9,9),d=ri(-9,9),k=fr(d-b,a-c);return K("s10_two_34","ដោះស្រាយ $"+a+"x"+sg(b,0)+">"+co(c,"x",true)+sg(d,0)+"$ ៖ ចម្លើយ $x>k$ ។ រក $k$",[A(k.s,k.t,"num","k =")],"$"+(a-c)+"x>"+(d-b)+"$ ⇒ $x>"+k.t+"$")},
 function(){var k=ri(1,9);return K("s10_sign","ដោះស្រាយ $x^2-"+(k*k)+">0$ ៖ ចម្លើយ $x<-k$ ឬ $x>k$ ។ រក $k$",[A(k,null,"num","k =")],"$(x-"+k+")(x+"+k+")>0$ ⇒ ក្រៅឫស")},
 function(){var a=ri(2,6),b=ri(-5,5),c=ri(b+a,40),n=Math.floor((c-b)/a);return K("s10_int_34","តើមានចំនួនគត់វិជ្ជមានប៉ុន្មាន ដែល $"+a+"x"+sg(b,0)+"\\le"+c+"$ ?",[A(n,null,"num","=")],"$x\\le"+fr(c-b,a).t+"$ ⇒ $\\{1,\\dots,"+n+"\\}$")}]);
vx(34,2,[
 function(){var r1=nz(-5,4),r2=r1+ri(1,6);return K("s10_q2","ដោះស្រាយ $x^2"+co(-(r1+r2),"x")+sg(r1*r2,0)+"\\ge0$ ៖ $x\\le a$ ឬ $x\\ge b$ ។ រក $a$ , $b$",[A(r1,null,"num","a ="),A(r2,null,"num","b =")],"ត្រីធាតុ $\\ge0$ ក្រៅឫស")},
 function(){var a=ri(-6,4),b=a+ri(1,6),s=pick([1,-1]),p=s>0?a:b,q=s>0?b:a;return K("s10_rq","ដោះស្រាយ $\\dfrac{x"+sg(-p,0)+"}{x"+sg(-q,0)+"}<0$ ៖ ចម្លើយ $\\alpha<x<\\beta$ ។ រក $\\alpha$ , $\\beta$",[A(a,null,"num","α ="),A(b,null,"num","β =")],"ភាគយក និងភាគបែងសញ្ញាផ្ទុយ ⇒ រវាងឫស $"+a+"$ និង $"+b+"$")},
 function(){var r1=ri(-6,3),r2=r1+ri(2,8);return K("s10_cntq","តើមានចំនួនគត់ប៉ុន្មាន ដែល $x^2"+co(-(r1+r2),"x")+sg(r1*r2,0)+"<0$ ?",[A(r2-r1-1,null,"num","=")],"$"+r1+"<x<"+r2+"$ ⇒ $"+(r2-r1-1)+"$ ចំនួន")}]);
vx(34,3,[
 function(){var a=ri(1,4),r1=ri(-5,2),b=-a*r1,c=ri(1,4),r2=r1+ri(1,6),d=-c*r2;return K("s10_sys2","ដោះស្រាយ $\\begin{cases}"+co(a,"x",true)+sg(b,0)+">0\\\\"+co(c,"x",true)+sg(d,0)+"<0\\end{cases}$ ៖ $\\alpha<x<\\beta$",[A(r1,null,"num","α ="),A(r2,null,"num","β =")],"$x>"+r1+"$ និង $x<"+r2+"$")},
 function(){var a=ri(-5,5),b=ri(1,6);return K("s10_abs","ដោះស្រាយ $|x"+sg(-a,0)+"|<"+b+"$ ៖ $\\alpha<x<\\beta$",[A(a-b,null,"num","α ="),A(a+b,null,"num","β =")],"$-"+b+"<x"+sg(-a,0)+"<"+b+"$ ⇒ $"+(a-b)+"<x<"+(a+b)+"$")},
 function(){var k=ri(2,6);return K("s10_mint","តើមានចំនួនគត់ $m$ ប៉ុន្មាន ដែល $x^2+2mx+"+(k*k)+">0$ ពិតគ្រប់ $x\\in\\mathbb R$ ?",[A(2*k-1,null,"num","=")],"$\\Delta'=m^2-"+(k*k)+"<0$ ⇒ $-"+k+"<m<"+k+"$ ⇒ $"+(2*k-1)+"$ ចំនួន")}]);
/* ៤.១ កូអរដោនេ */
vx(41,1,[
 function(){var T=pick(TR),a=T[0]*pick([1,-1]),b=T[1]*pick([1,-1]);return K("s10_d0","គណនាចម្ងាយ $OA$ ដែល $A("+a+";"+b+")$",[A(T[2],null,"num","=")],"$\\sqrt{"+(a*a)+"+"+(b*b)+"}="+T[2]+"$")},
 function(){var a=nz(-8,8),b=nz(-8,8);return K("s10_so","រកចំណុចឆ្លុះនៃ $A("+a+";"+b+")$ ធៀបនឹងគល់ $O$",[A(-a,null,"num","x ="),A(-b,null,"num","y =")],"$(x;y)\\mapsto(-x;-y)$")},
 function(){var y=ri(-6,6),a=ri(-8,0),b=a+ri(1,12);return K("s10_hor","គណនាចម្ងាយ $AB$ ដែល $A("+a+";"+y+")$ , $B("+b+";"+y+")$",[A(b-a,null,"num","=")],"$|"+b+"-("+a+")|="+(b-a)+"$")}]);
vx(41,2,[
 function(){var G0=[ri(-4,4),ri(-4,4)],A0=[ri(-5,5),ri(-5,5)],B=[ri(-5,5),ri(-5,5)],C=[3*G0[0]-A0[0]-B[0],3*G0[1]-A0[1]-B[1]];return K("s10_cen","រកទីប្រជុំទម្ងន់ $G$ នៃត្រីកោណ $A"+pt(A0)+"$ , $B"+pt(B)+"$ , $C"+pt(C)+"$",[A(G0[0],null,"num","x ="),A(G0[1],null,"num","y =")],"$G=\\left(\\dfrac{x_A+x_B+x_C}{3};\\dfrac{y_A+y_B+y_C}{3}\\right)="+pt(G0)+"$")},
 function(){var A0=[ri(-5,3),ri(-5,3)],B=[A0[0]+ri(2,5),A0[1]+ri(-2,2)],C=[B[0]+ri(-2,3),B[1]+ri(2,5)];return K("s10_par","$ABCD$ ជាប្រលេឡូក្រាម ៖ $A"+pt(A0)+"$ , $B"+pt(B)+"$ , $C"+pt(C)+"$ ។ រក $D$",[A(A0[0]+C[0]-B[0],null,"num","x ="),A(A0[1]+C[1]-B[1],null,"num","y =")],"$\\vec{AD}=\\vec{BC}$ ⇒ $D=A+C-B$")},
 function(){var T=pick(TR),P=[ri(-4,2),ri(-4,2)];return K("s10_peri","គណនាបរិមាត្រត្រីកោណ $A"+pt(P)+"$ , $B("+(P[0]+T[0])+";"+P[1]+")$ , $C("+(P[0]+T[0])+";"+(P[1]+T[1])+")$",[A(T[0]+T[1]+T[2],null,"num","=")],"$"+T[0]+"+"+T[1]+"+"+T[2]+"$")}]);
vx(41,3,[
 function(){var b=[ri(-5,5),ri(1,6)],c=[b[0]+nz(-6,6),ri(1,6)],x=fr(c[0]*c[0]+c[1]*c[1]-b[0]*b[0]-b[1]*b[1],2*(c[0]-b[0]));return K("s10_eqd","រក $x$ ដើម្បីឱ្យ $M(x;0)$ ស្មើចម្ងាយពី $B"+pt(b)+"$ និង $C"+pt(c)+"$",[A(x.s,x.t,"num","x =")],"$MB^2=MC^2$ ⇒ $x="+x.t+"$")},
 function(){var y0=ri(-4,2),x1=ri(-6,0),x2=x1+ri(2,8),x3=ri(-5,5),y3=y0+nz(-6,6),S=fr((x2-x1)*Math.abs(y3-y0),2);return K("s10_area_41","គណនាផ្ទៃក្រឡាត្រីកោណ $A("+x1+";"+y0+")$ , $B("+x2+";"+y0+")$ , $C("+x3+";"+y3+")$",[A(S.s,S.t,"num","S =")],"បាត $"+(x2-x1)+"$ · កម្ពស់ $"+Math.abs(y3-y0)+"$ ⇒ $"+S.t+"$")},
 function(){var a=nz(-3,3),b=ri(-5,5),x1=ri(-4,0),x2=x1+ri(1,3),m=x2+ri(1,4);return K("s10_col","រក $m$ ដើម្បីឱ្យ $A("+x1+";"+(a*x1+b)+")$ , $B("+x2+";"+(a*x2+b)+")$ , $C(m;"+(a*m+b)+")$ រត់ត្រង់គ្នា",[A(m,null,"num","m =")],"$(AB)\\colon y="+co(a,"x",true)+sg(b,0)+"$ ⇒ $m="+m+"$")}]);
/* ៤.២ សមីការបន្ទាត់ */
vx(42,1,[
 function(){var m=nz(-4,4),p=nz(-8,8),x0=fr(-p,m);return K("s10_int_42","បន្ទាត់ $y="+co(m,"x",true)+sg(p,0)+"$ កាត់ $Oy$ ត្រង់ $y=q$ និង $Ox$ ត្រង់ $x=r$ ។ រក $q$ និង $r$",[A(p,null,"num","q ="),A(x0.s,x0.t,"num","r =")],"$x=0$ ⇒ $"+p+"$ · $y=0$ ⇒ $"+x0.t+"$")},
 function(){var m=nz(-4,4),p=ri(-6,6),a=ri(-4,4);return K("s10_on","ចំណុច $A("+a+";y)$ នៅលើបន្ទាត់ $y="+co(m,"x",true)+sg(p,0)+"$ ។ រក $y$",[A(m*a+p,null,"num","y =")],"$"+m+"\\times"+sgp(a)+sg(p,0)+"="+(m*a+p)+"$")},
 function(){var a=nz(-6,6),b=nz(-6,6),c=ri(-9,9),m=fr(-a,b);return K("s10_slope","រកមេគុណប្រាប់ទិសនៃបន្ទាត់ $"+co(a,"x",true)+co(b,"y")+sg(c,0)+"=0$",[A(m.s,m.t,"num","m =")],"$y=-\\dfrac{"+a+"}{"+b+"}x+\\dots$ ⇒ $m="+m.t+"$")}]);
vx(42,2,[
 function(){var m=nz(-3,3),p=ri(-5,5),x1=ri(-4,2),x2=x1+ri(1,4);return K("s10_eq2","សរសេរសមីការបន្ទាត់កាត់តាម $A("+x1+";"+(m*x1+p)+")$ និង $B("+x2+";"+(m*x2+p)+")$ ជា $y=mx+p$",[A(m,null,"num","m ="),A(p,null,"num","p =")],"$m=\\dfrac{"+(m*(x2-x1))+"}{"+(x2-x1)+"}="+m+"$ ⇒ $p="+p+"$")},
 function(){var m=pick([1,-1,2,-2,3,-3]),P=[ri(-4,4),ri(-4,4)],mp=fr(-1,m),pp=fr(P[1]*m+P[0],m);return K("s10_perp","រកសមីការបន្ទាត់កែងនឹង $y="+co(m,"x",true)+"+1$ ហើយកាត់តាម $A"+pt(P)+"$ ជា $y=m'x+p$",[A(mp.s,mp.t,"num","m' ="),A(pp.s,pp.t,"num","p =")],"$m'=-\\dfrac1{"+m+"}="+mp.t+"$ ⇒ $p="+P[1]+"-("+mp.t+")("+P[0]+")="+pp.t+"$")},
 function(){var x=ri(-4,4),y=ri(-6,6),a=nz(-4,4),c=nz(-4,4);while(c===a)c++;return K("s10_ix","រកចំណុចប្រសព្វនៃ $y="+co(a,"x",true)+sg(y-a*x,0)+"$ និង $y="+co(c,"x",true)+sg(y-c*x,0)+"$",[A(x,null,"num","x ="),A(y,null,"num","y =")],"$"+(a-c)+"x="+((y-c*x)-(y-a*x))+"$ ⇒ $x="+x+"$ , $y="+y+"$")}]);
vx(42,3,[
 function(){var T=pick([[3,4,5],[6,8,10],[5,12,13],[8,6,10]]),a=T[0]*pick([1,-1]),b=T[1]*pick([1,-1]),c=nz(-20,20),d=fr(Math.abs(c),T[2]);return K("s10_dl","គណនាចម្ងាយពីគល់ $O$ ទៅបន្ទាត់ $"+co(a,"x",true)+co(b,"y")+sg(c,0)+"=0$",[A(d.s,d.t,"num","d =")],"$d=\\dfrac{|c|}{\\sqrt{a^2+b^2}}=\\dfrac{"+Math.abs(c)+"}{"+T[2]+"}="+d.t+"$")},
 function(){var M=[ri(-4,4),ri(-4,4)],s=pick([1,-1]),d=ri(1,3),A0=[M[0]-d,M[1]-s*d],B=[M[0]+d,M[1]+s*d],m=-s,p=M[1]-m*M[0];return K("s10_med","រកសមីការមេដ្យាទ័រនៃ $[AB]$ ដែល $A"+pt(A0)+"$ , $B"+pt(B)+"$ ជា $y=mx+p$",[A(m,null,"num","m ="),A(p,null,"num","p =")],"កណ្ដាល $"+pt(M)+"$ · ស្លូប $(AB)="+s+"$ ⇒ $m="+m+"$ ⇒ $p="+p+"$")},
 function(){var m=nz(-5,5);return K("s10_k","រក $k$ ដើម្បីឱ្យ $y=(k-1)x+2$ ស្របនឹង $y="+co(m,"x",true)+"-3$",[A(m+1,null,"num","k =")],"$k-1="+m+"$ ⇒ $k="+(m+1)+"$")}]);
/* ៤.៣ សមីការរង្វង់ */
vx(43,1,[
 function(){var a=ri(-5,5),b=ri(-5,5),r=ri(1,6);return K("s10_F","រង្វង់ផ្ចិត $I("+a+";"+b+")$ កាំ $"+r+"$ មានសមីការ $x^2+y^2+Dx+Ey+F=0$ ។ រក $F$",[A(a*a+b*b-r*r,null,"num","F =")],"$F=a^2+b^2-R^2="+(a*a+b*b-r*r)+"$")},
 function(){var a=nz(-6,6),b=nz(-6,6);return K("s10_r2","រង្វង់ $(x"+(a?sg(-a,0):"")+")^2+(y"+(b?sg(-b,0):"")+")^2=R^2$ កាត់តាមគល់ $O$ ។ រក $R^2$",[A(a*a+b*b,null,"num","R² =")],"$R^2="+(a*a)+"+"+(b*b)+"="+(a*a+b*b)+"$")},
 function(){var I=[ri(-4,4),ri(-4,4)],d=[nz(-4,4),nz(-4,4)];return K("s10_cd","រកផ្ចិតរង្វង់ដែលមានអង្កត់ផ្ចិត $[AB]$ ដែល $A"+pt([I[0]-d[0],I[1]-d[1]])+"$ , $B"+pt([I[0]+d[0],I[1]+d[1]])+"$",[A(I[0],null,"num","x ="),A(I[1],null,"num","y =")],"ផ្ចិត = ចំណុចកណ្ដាល $"+pt(I)+"$")}]);
vx(43,2,[
 function(){var T=pick(TR),I=[ri(-4,4),ri(-4,4)],s=[pick([1,-1]),pick([1,-1])],A0=[I[0]-s[0]*T[0],I[1]-s[1]*T[1]],B=[I[0]+s[0]*T[0],I[1]+s[1]*T[1]];return K("s10_diam","រង្វង់មានអង្កត់ផ្ចិត $[AB]$ ដែល $A"+pt(A0)+"$ , $B"+pt(B)+"$ ។ រកកាំ",[A(T[2],null,"num","R =")],"$AB="+(2*T[2])+"$ ⇒ $R="+T[2]+"$")},
 function(){var a=ri(-5,5),b=nz(-6,6);return K("s10_tan","រង្វង់ផ្ចិត $I("+a+";"+b+")$ ប៉ះអ័ក្ស $Ox$ ។ រកកាំ",[A(Math.abs(b),null,"num","R =")],"ចម្ងាយពី $I$ ទៅ $Ox$ $=|"+b+"|="+Math.abs(b)+"$")},
 function(){var a=ri(-4,4),b=ri(-4,4),r=ri(1,6),D=-2*a,E=-2*b;return K("s10_D","រង្វង់ $x^2+y^2"+co(D,"x")+co(E,"y")+"+F=0$ មានកាំ $"+r+"$ ។ រក $F$",[A(a*a+b*b-r*r,null,"num","F =")],"ផ្ចិត $("+a+";"+b+")$ ⇒ $F="+(a*a+b*b)+"-"+(r*r)+"="+(a*a+b*b-r*r)+"$")}]);
vx(43,3,[
 function(){var a=ri(-4,4),b=ri(-4,4),r=ri(1,6);return K("s10_tl_43","រក $k>"+b+"$ ដើម្បីឱ្យបន្ទាត់ $y=k$ ប៉ះរង្វង់ $(x"+(a?sg(-a,0):"")+")^2+(y"+(b?sg(-b,0):"")+")^2="+(r*r)+"$",[A(b+r,null,"num","k =")],"ចម្ងាយពីផ្ចិតទៅបន្ទាត់ $=R$ ⇒ $k-"+sgp(b)+"="+r+"$ ⇒ $k="+(b+r)+"$")},
 function(){var T=pick(TR),a=ri(-4,4),b=T[0]*pick([1,-1]);return K("s10_chord","រង្វង់ $(x"+(a?sg(-a,0):"")+")^2+(y"+(b?sg(-b,0):"")+")^2="+(T[2]*T[2])+"$ កាត់អ័ក្ស $Ox$ ត្រង់ពីរចំណុច ។ គណនាប្រវែងអង្កត់ធ្នូនោះ",[A(2*T[1],null,"num","=")],"$y=0$ ⇒ $(x"+(a?sg(-a,0):"")+")^2="+(T[2]*T[2]-b*b)+"$ ⇒ $x="+a+"\\pm"+T[1]+"$ ⇒ $"+(2*T[1])+"$")},
 function(){var T=pick(TR),I=[ri(-3,3),ri(-3,3)],P=[I[0]+T[2],I[1]];return K("s10_tlen","រង្វង់ផ្ចិត $I"+pt(I)+"$ កាំ $"+T[0]+"$ ។ គណនាប្រវែងបន្ទាត់ប៉ះពីចំណុច $P"+pt(P)+"$ ទៅរង្វង់",[A(T[1],null,"num","=")],"$IP="+T[2]+"$ ⇒ $\\sqrt{"+(T[2]*T[2])+"-"+(T[0]*T[0])+"}="+T[1]+"$")}]);
/* ៤.៤ ដោះស្រាយវិសមីការតាមក្រាប */
vx(44,1,[
 function(){var m=-ri(1,3),k=nz(-4,4),p=-m*k;return K("s10_g1","ពីក្រាប $y="+co(m,"x",true)+sg(p,0)+"$ ៖ $y\\le0$ ពេល $x\\ge k$ ។ រក $k$",[A(k,null,"num","k =")],"ក្រាបកាត់ $Ox$ ត្រង់ $x="+k+"$ ហើយចុះ","y="+m+"x"+sg(p,0))},
 function(){var a=ri(1,3),k=ri(-4,4),c=ri(-5,5),b=c-a*k;return K("s10_cmp","ក្រាប $f(x)="+co(a,"x",true)+sg(b,0)+"$ នៅខាងលើបន្ទាត់ $y="+c+"$ ពេល $x>k$ ។ រក $k$",[A(k,null,"num","k =")],"$"+a+"x"+sg(b,0)+">"+c+"$ ⇒ $x>"+k+"$","y="+a+"x"+sg(b,0)+"\ny="+c+" red")},
 function(){var k=ri(-4,4),a=nz(-3,3),c=nz(-3,3);while(c===a)c++;var y=ri(-4,4);return K("s10_cross","ក្រាប $y="+co(a,"x",true)+sg(y-a*k,0)+"$ និង $y="+co(c,"x",true)+sg(y-c*k,0)+"$ ប្រសព្វគ្នាត្រង់ $x=k$ ។ រក $k$",[A(k,null,"num","k =")],"$"+(a-c)+"x="+((y-c*k)-(y-a*k))+"$ ⇒ $k="+k+"$")}]);
vx(44,2,[
 function(){var k=ri(1,6);return K("s10_q0","ពីក្រាប $y=x^2-"+(k*k)+"$ ៖ $y<0$ ពេល $-k<x<k$ ។ រក $k$",[A(k,null,"num","k =")],"ឫស $\\pm"+k+"$","y=x^2-"+(k*k))},
 function(){var c=ri(1,3),a=c+ri(1,3),k=ri(-4,4),d=ri(-5,5),b=d+(c-a)*k;if(!b){d++;b=d+(c-a)*k}return K("s10_lin2","ក្រាប $f(x)="+co(a,"x",true)+sg(b,0)+"$ នៅខាងលើក្រាប $g(x)="+co(c,"x",true)+sg(d,0)+"$ ពេល $x>k$ ។ រក $k$",[A(k,null,"num","k =")],"$"+(a-c)+"x>"+(d-b)+"$ ⇒ $x>"+k+"$")},
 function(){var r1=ri(-5,2),r2=r1+ri(2,7);return K("s10_gint","តើមានចំនួនគត់ $x$ ប៉ុន្មាន ដែលក្រាប $y=(x"+sg(-r1,0)+")(x"+sg(-r2,0)+")$ នៅខាងក្រោមអ័ក្ស $Ox$ ?",[A(r2-r1-1,null,"num","=")],"$"+r1+"<x<"+r2+"$ ⇒ $"+(r2-r1-1)+"$","y=(x"+sg(-r1,0)+")*(x"+sg(-r2,0)+")")}]);
vx(44,3,[
 function(){var k=ri(1,5),p=ri(-5,5),q=p+k*k;return K("s10_pl","ប៉ារ៉ាបូល $y=x^2"+sg(p,0)+"$ នៅខាងក្រោមបន្ទាត់ $y="+q+"$ ពេល $-k<x<k$ ។ រក $k$",[A(k,null,"num","k =")],"$x^2<"+(k*k)+"$ ⇒ $k="+k+"$","y=x^2"+sg(p,0)+"\ny="+q+" red")},
 function(){var r1=ri(-5,1),r2=r1+ri(1,6),m=r1+r2,n=-r1*r2;return K("s10_pl2","ពីក្រាប ៖ $x^2\\le"+co(m,"x",true).replace(/^$/,"0")+sg(n,0)+"$ ពេល $a\\le x\\le b$ ។ រក $a$ , $b$",[A(r1,null,"num","a ="),A(r2,null,"num","b =")],"$x^2"+co(-m,"x")+sg(-n,0)+"\\le0$ ⇒ $"+r1+"\\le x\\le"+r2+"$","y=x^2\ny="+m+"x"+sg(n,0)+" red")},
 function(){var r1=ri(-5,0),r2=r1+ri(3,7),c=ri(r1+1,r2-1);return K("s10_sysg","ដោះស្រាយ $\\begin{cases}x^2"+co(-(r1+r2),"x")+sg(r1*r2,0)+"\\le0\\\\x\\ge"+c+"\\end{cases}$ ៖ $a\\le x\\le b$",[A(c,null,"num","a ="),A(r2,null,"num","b =")],"$["+r1+";"+r2+"]\\cap["+c+";+\\infty)=["+c+";"+r2+"]$")}]);
/* ៥.១ ផលធៀបត្រីកោណមាត្រ */
var SPC=[["\\sin30^\\circ",fr(1,2)],["\\cos60^\\circ",fr(1,2)],["\\tan45^\\circ",fr(1,1)],["\\sin90^\\circ",fr(1,1)],["\\cos0^\\circ",fr(1,1)],["\\cos90^\\circ",fr(0,1)]];
vx(51,1,[
 function(){var T=pick(TR),v=fr(T[1],T[2]);return K("s10_sinB","ត្រីកោណ $ABC$ កែងត្រង់ $C$ មាន $BC="+T[0]+"$ , $AC="+T[1]+"$ , $AB="+T[2]+"$ ។ គណនា $\\sin B$",[A(v.s,v.t,"num","sin B =")],"$\\sin B=\\dfrac{AC}{AB}="+v.t+"$")},
 function(){var T=pick(TR),v=fr(T[1],T[0]);return K("s10_cot","ត្រីកោណ $ABC$ កែងត្រង់ $C$ មាន $BC="+T[0]+"$ , $AC="+T[1]+"$ ។ គណនា $\\cot A$",[A(v.s,v.t,"num","cot A =")],"$\\cot A=\\dfrac{AC}{BC}="+v.t+"$")},
 function(){var a=pick(SPC),b=pick(SPC),m=ri(1,4),n=ri(1,4),v=fr(m*a[1].n*b[1].d+n*b[1].n*a[1].d,a[1].d*b[1].d);return K("s10_spv","គណនា $"+m+a[0]+"+"+n+b[0]+"$",[A(v.s,v.t,"num","=")],"$"+a[0]+"="+a[1].t+"$ · $"+b[0]+"="+b[1].t+"$ ⇒ $"+v.t+"$")}]);
vx(51,2,[
 function(){var T=pick(TR),s=fr(T[0],T[2]),c=fr(T[1],T[2]);return K("s10_sc","$A$ ជាមុំស្រួចដែល $\\sin A="+s.t+"$ ។ គណនា $\\cos A$",[A(c.s,c.t,"num","cos A =")],"$\\cos A=\\sqrt{1-\\sin^2A}="+c.t+"$")},
 function(){var T=pick(TR),t=fr(T[0],T[1]),s=fr(T[0],T[2]);return K("s10_ts","$A$ ជាមុំស្រួចដែល $\\tan A="+t.t+"$ ។ គណនា $\\sin A$",[A(s.s,s.t,"num","sin A =")],"ឈម $"+T[0]+"k$ ជាប់ $"+T[1]+"k$ អ៊ីប៉ូតេនុស $"+T[2]+"k$ ⇒ $"+s.t+"$")},
 function(){var T=pick(TR),c=fr(T[1],T[2]),t=fr(T[0],T[1]);return K("s10_ct","$A$ ជាមុំស្រួចដែល $\\cos A="+c.t+"$ ។ គណនា $\\tan A$",[A(t.s,t.t,"num","tan A =")],"$\\sin A="+fr(T[0],T[2]).t+"$ ⇒ $\\tan A="+t.t+"$")}]);
vx(51,3,[
 function(){var t=pick([2,3,4,5,fr(1,2),fr(1,3),fr(3,2)]),n=typeof t==="number"?t:t.n,d=typeof t==="number"?1:t.d,r=fr(n+d,n-d),tt=typeof t==="number"?String(t):t.t;return K("s10_ex","$\\tan A="+tt+"$ ។ គណនា $E=\\dfrac{\\sin A+\\cos A}{\\sin A-\\cos A}$",[A(r.s,r.t,"num","E =")],"ចែកនឹង $\\cos A$ ⇒ $E=\\dfrac{\\tan A+1}{\\tan A-1}="+r.t+"$")},
 function(){var b=ri(10,80);return K("s10_co","រកមុំស្រួច $\\alpha$ ដែល $\\sin\\alpha=\\cos"+ang(b)+"$",[A(90-b,null,"num","α =")],"$\\sin\\alpha=\\cos(90^\\circ-\\alpha)$ ⇒ $"+ang(90-b)+"$")},
 function(){var h=2*ri(1,8),C=pick([[30,"opp"],[60,"opp"],[45,"opp"]]),ans=C[0]===30?[String(h/2),String(h/2)]:C[0]===60?[(h/2)+"*sqrt(3)",(h/2===1?"":h/2)+"\\sqrt3"]:[(h/2)+"*sqrt(2)",(h/2===1?"":h/2)+"\\sqrt2"];return K("s10_side","ត្រីកោណ $ABC$ កែងត្រង់ $C$ មានអ៊ីប៉ូតេនុស $AB="+h+"$ និង $\\widehat A="+ang(C[0])+"$ ។ គណនា $BC$",[A(ans[0],ans[1],"num","BC =")],"$BC=AB\\sin"+ang(C[0])+"="+ans[1]+"$")}]);
/* ៥.២ ការអនុវត្ត */
vx(52,1,[
 function(){var L=2*ri(2,12);return K("s10_ramp","ផ្លូវឡើងទ្រេតវែង $"+L+"$ m បង្កើតមុំ $30^\\circ$ ជាមួយដី ។ តើចុងផ្លូវខ្ពស់ពីដីប៉ុន្មាន m?",[A(L/2,null,"num","h =")],"$h="+L+"\\sin30^\\circ="+(L/2)+"$")},
 function(){var h=ri(3,20);return K("s10_shadow","ដើមឈើកម្ពស់ $"+h+"$ m ។ ពេលកាំរស្មីព្រះអាទិត្យធ្វើមុំ $45^\\circ$ ជាមួយដី តើស្រមោលវែងប៉ុន្មាន m?",[A(h,null,"num","=")],"$\\tan45^\\circ=1$ ⇒ ស្រមោល $="+h+"$ m")},
 function(){var h=ri(5,40);return K("s10_dep","ពីកំពូលប៉មកម្ពស់ $"+h+"$ m គេមើលឃើញទូកមួយក្រោមមុំចុះ $30^\\circ$ ។ តើទូកនៅឆ្ងាយពីជើងប៉មប៉ុន្មាន m? (ទុក $\\sqrt{\\ }$)",[A(h+"*sqrt(3)",h+"\\sqrt3","num","=")],"$d=\\dfrac{h}{\\tan30^\\circ}="+h+"\\sqrt3$")}]);
vx(52,2,[
 function(){var b=ri(2,10),c=ri(2,10),C=pick([[30,fr(1,2)],[150,fr(1,2)],[90,fr(1,1)]]),S=fr(b*c*C[1].n,2*C[1].d);return K("s10_area_52","ត្រីកោណ $ABC$ មាន $AB="+c+"$ , $AC="+b+"$ និង $\\widehat A="+ang(C[0])+"$ ។ គណនាផ្ទៃក្រឡា",[A(S.s,S.t,"num","S =")],"$S=\\dfrac12bc\\sin A="+S.t+"$")},
 function(){var a=ri(2,10);return K("s10_iso","ត្រីកោណសមបាតមានជ្រុងអង្គ $"+a+"$ និងមុំកំពូល $120^\\circ$ ។ គណនាបាត (ទុក $\\sqrt{\\ }$)",[A(a+"*sqrt(3)",a+"\\sqrt3","num","=")],"$b^2="+(a*a)+"+"+(a*a)+"-2\\cdot"+(a*a)+"\\cos120^\\circ="+(3*a*a)+"$ ⇒ $"+a+"\\sqrt3$")},
 function(){var a=ri(1,9);return K("s10_hyp","ត្រីកោណកែងមានជ្រុងជាប់មុំកែង $"+a+"$ និង $"+a+"\\sqrt3$ ។ តើមុំឈមនឹងជ្រុង $"+a+"\\sqrt3$ ស្មើប៉ុន្មានដឺក្រេ?",[A(60,null,"num","=")],"$\\tan\\theta=\\sqrt3$ ⇒ $60^\\circ$")}]);
vx(52,3,[
 function(){var a=ri(2,15);return K("s10_sinr","ត្រីកោណ $ABC$ មាន $a=BC="+a+"$ និង $\\widehat A=30^\\circ$ ។ គណនាកាំ $R$ នៃរង្វង់ចារឹកក្រៅ",[A(a,null,"num","R =")],"$\\dfrac{a}{\\sin A}=2R$ ⇒ $2R=\\dfrac{"+a+"}{1/2}$ ⇒ $R="+a+"$")},
 function(){var a=ri(1,8),b=ri(1,8),S=fr(a*b,4);return K("s10_ar60","ត្រីកោណមានជ្រុងពីរ $"+a+"$ និង $"+b+"$ ហើយមុំរវាងវា $60^\\circ$ ។ គណនាផ្ទៃក្រឡា (ទុក $\\sqrt{\\ }$)",[A(S.s+"*sqrt(3)",(S.d===1?(S.n===1?"":S.n):"\\dfrac{"+S.n+"}{"+S.d+"}")+"\\sqrt3","num","S =")],"$\\dfrac12\\cdot"+a+"\\cdot"+b+"\\cdot\\dfrac{\\sqrt3}{2}$")},
 function(){var b=ri(2,9),c=ri(2,9),a=ri(Math.abs(b-c)+1,b+c-1),cs=fr(b*b+c*c-a*a,2*b*c);return K("s10_cosA","ត្រីកោណមានជ្រុង $a="+a+"$ , $b="+b+"$ , $c="+c+"$ ។ គណនា $\\cos A$",[A(cs.s,cs.t,"num","cos A =")],"$\\cos A=\\dfrac{b^2+c^2-a^2}{2bc}=\\dfrac{"+(b*b+c*c-a*a)+"}{"+(2*b*c)+"}="+cs.t+"$")}]);
/* ៦.១ អនុគមន៍ */
vx(61,1,[
 function(){var a=nz(-4,4),b=ri(-6,6),x=ri(-5,5),k=a*x+b;return K("s10_inv","$f(x)="+co(a,"x",true)+sg(b,0)+"$ ។ រក $x$ ដែល $f(x)="+k+"$",[A(x,null,"num","x =")],"$"+a+"x="+(k-b)+"$ ⇒ $x="+x+"$")},
 function(){var a=nz(-6,6);return K("s10_dom","រកតម្លៃ $x$ ដែលមិនស្ថិតក្នុងដែនកំណត់នៃ $f(x)=\\dfrac{1}{x"+sg(-a,0)+"}$",[A(a,null,"num","x =")],"ភាគបែង $\\ne0$ ⇒ $x\\ne"+a+"$")},
 function(){var a=nz(-5,5),b=ri(-9,9),z=fr(-b,a);return K("s10_zero","រកឫស (សូន្យ) នៃ $f(x)="+co(a,"x",true)+sg(b,0)+"$",[A(z.s,z.t,"num","x =")],"$f(x)=0$ ⇒ $x="+z.t+"$")}]);
vx(61,2,[
 function(){var a=nz(-3,3),b=ri(-3,3),c=nz(-3,3),d=ri(-3,3),x=ri(-3,3),f=a*x+b;return K("s10_gf","$f(x)="+co(a,"x",true)+sg(b,0)+"$ , $g(x)="+co(c,"x",true)+sg(d,0)+"$ ។ គណនា $g(f("+x+"))$",[A(c*f+d,null,"num","=")],"$f("+x+")="+f+"$ ⇒ $g("+f+")="+(c*f+d)+"$")},
 function(){var a=nz(-5,5),b=ri(-6,6);return K("s10_lin_61","អនុគមន៍លីនេអ៊ែរ $f(x)=ax+b$ មាន $f(0)="+b+"$ និង $f(1)="+(a+b)+"$ ។ រក $a$ និង $b$",[A(a,null,"num","a ="),A(b,null,"num","b =")],"$b=f(0)="+b+"$ · $a=f(1)-f(0)="+a+"$")},
 function(){var c=ri(-6,6),a=nz(-5,5);return K("s10_even","$f(x)=x^2"+sg(c,0)+"$ ។ គណនា $f("+a+")$ និង $f("+(-a)+")$",[A(a*a+c,null,"num","f(a) ="),A(a*a+c,null,"num","f(−a) =")],"$f$ ជាអនុគមន៍គូ ⇒ ស្មើគ្នា $="+(a*a+c)+"$")}]);
vx(61,3,[
 function(){var a=nz(-4,4),b=ri(-6,6),k=ri(-9,9),v=fr(k-b,a);return K("s10_inv2","$f(x)="+co(a,"x",true)+sg(b,0)+"$ ។ គណនា $f^{-1}("+k+")$",[A(v.s,v.t,"num","=")],"$f^{-1}(x)=\\dfrac{x"+sg(-b,0)+"}{"+a+"}$ ⇒ $"+v.t+"$")},
 function(){var a=ri(-6,8);return K("s10_domf","ដែនកំណត់នៃ $f(x)=\\sqrt{"+a+"-x}$ គឺ $x\\le k$ ។ រក $k$",[A(a,null,"num","k =")],"$"+a+"-x\\ge0$ ⇒ $x\\le"+a+"$")},
 function(){var a=nz(-3,3),b=ri(-4,4),c=nz(-3,3),d=ri(-4,4),e=[a*c,a*d+b];return K("s10_comp_61","$f(x)="+co(a,"x",true)+sg(b,0)+"$ , $g(x)="+co(c,"x",true)+sg(d,0)+"$ ។ សរសេរ $f(g(x))$",[A(poly(e),polyT(e),"expr","=")],"$"+a+"("+poly([c,d])+")"+sg(b,0)+"="+polyT(e)+"$")}]);
/* ៦.២ អនុគមន៍ដឺក្រេទី២ */
vx(62,1,[
 function(){var c=[nz(-3,3),ri(-6,6),ri(-9,9)];return K("s10_y0","ប៉ារ៉ាបូល $y="+polyT(c)+"$ កាត់អ័ក្ស $Oy$ ត្រង់ $y=\\dots$ ?",[A(c[2],null,"num","y =")],"$x=0$ ⇒ $y="+c[2]+"$")},
 function(){var c=[nz(-3,3),ri(-6,6),ri(-6,6)],k=ri(-3,3),v=c[0]*k*k+c[1]*k+c[2];return K("s10_val","$f(x)="+polyT(c)+"$ ។ គណនា $f("+k+")$",[A(v,null,"num","=")],"$"+v+"$")},
 function(){var a=nz(-4,4),b=nz(-8,8),h=fr(-b,2*a);return K("s10_axis","រកអ័ក្សឆ្លុះ $x=h$ នៃ $y="+polyT([a,b,ri(-5,5)])+"$",[A(h.s,h.t,"num","h =")],"$h=-\\dfrac{b}{2a}="+h.t+"$")}]);
vx(62,2,[
 function(){var a=nz(-3,3),h=ri(-3,3),k=ri(-4,4),x=h+nz(-2,2),y=a*(x-h)*(x-h)+k;return K("s10_from","ប៉ារ៉ាបូល $y=a(x"+(h?sg(-h,0):"")+")^2"+sg(k,0)+"$ កាត់តាម $("+x+";"+y+")$ ។ រក $a$",[A(a,null,"num","a =")],"$"+y+"=a\\cdot"+((x-h)*(x-h))+sg(k,0)+"$ ⇒ $a="+a+"$")},
 function(){var h=nz(-4,4),k=ri(-5,5);return K("s10_shift","រំកិល $y=x^2$ តាមវ៉ិចទ័រ $("+h+";"+k+")$ បាន $y=x^2+bx+c$ ។ រក $b$ និង $c$",[A(-2*h,null,"num","b ="),A(h*h+k,null,"num","c =")],"$y=(x"+(h?sg(-h,0):"")+")^2"+sg(k,0)+"=x^2"+co(-2*h,"x")+sg(h*h+k,0)+"$")},
 function(){var r1=nz(-4,4),r2=nz(-4,4);while(r2===r1)r2++;var lo=Math.min(r1,r2),hi=Math.max(r1,r2);return K("s10_pli","ប៉ារ៉ាបូល $y=x^2$ និងបន្ទាត់ $y="+co(r1+r2,"x",true).replace(/^$/,"0")+sg(-r1*r2,0)+"$ ប្រសព្វត្រង់ $x_1<x_2$ ។ រក $x_1$ , $x_2$",[A(lo,null,"num","x₁ ="),A(hi,null,"num","x₂ =")],"$x^2"+co(-(r1+r2),"x")+sg(r1*r2,0)+"=0$")}]);
vx(62,3,[
 function(){var s=ri(2,15),P=4*s;return K("s10_fence","មានរបងវែង $"+P+"$ m ព័ទ្ធដីរាងចតុកោណកែង ។ តើផ្ទៃក្រឡាធំបំផុតប៉ុន្មាន m²?",[A(s*s,null,"num","=")],"$S=x("+(P/2)+"-x)$ អតិបរមាត្រង់ $x="+s+"$ ⇒ $"+(s*s)+"$ m²")},
 function(){var v=10*ri(1,6),H=v*v/20;return K("s10_proj_62","បាល់មួយបោះឡើង មានកម្ពស់ $h(t)=-5t^2+"+v+"t$ (m) ។ គណនាកម្ពស់អតិបរមា",[A(H,null,"num","h =")],"$t=\\dfrac{"+v+"}{10}="+(v/10)+"$ ⇒ $h="+H+"$ m")},
 function(){var h=nz(-6,6);return K("s10_tg_62","រក $m$ ដើម្បីឱ្យប៉ារ៉ាបូល $y=x^2"+co(2*h,"x")+"+m$ ប៉ះអ័ក្ស $Ox$",[A(h*h,null,"num","m =")],"$\\Delta=0$ ⇒ $m="+(h*h)+"$")}]);
/* ៦.៣ អនុគមន៍សនិទាន និងអសនិទាន */
vx(63,1,[
 function(){var a=nz(-4,4),b=ri(-8,8),c=nz(-5,5);while(a*(-c)+b===0)b++;var z=fr(-b,a);return K("s10_rz","រកឫសនៃ $f(x)=\\dfrac{"+poly([a,b])+"}{x"+sg(c,0)+"}$",[A(z.s,z.t,"num","x =")],"ភាគយក $=0$ ⇒ $"+z.t+"$")},
 function(){var a=ri(-6,6);return K("s10_dsq","ដែនកំណត់នៃ $f(x)=\\sqrt{x"+sg(-a,0)+"}$ គឺ $x\\ge k$ ។ រក $k$",[A(a,null,"num","k =")],"$x"+sg(-a,0)+"\\ge0$")},
 function(){var r=ri(1,8),a=ri(1,4),x=ri(-3,8),b=r*r-a*x;return K("s10_sqv","$f(x)=\\sqrt{"+co(a,"x",true)+sg(b,0)+"}$ ។ គណនា $f("+x+")$",[A(r,null,"num","=")],"$\\sqrt{"+(r*r)+"}="+r+"$")}]);
vx(63,2,[
 function(){var a=nz(-3,3),c=nz(-4,4),k=a+nz(-3,3),x=ri(-4,4);while(x===-c)x++;var b=k*(x+c)-a*x;return K("s10_rk","$f(x)=\\dfrac{"+poly([a,b])+"}{x"+sg(c,0)+"}$ ។ រក $x$ ដែល $f(x)="+k+"$",[A(x,null,"num","x =")],"$"+poly([a,b]).replace(/\*/g,"")+"="+k+"(x"+sg(c,0)+")$ ⇒ $x="+x+"$")},
 function(){var p=nz(-5,5),q=nz(-5,5);return K("s10_hk","ក្រាប $y=\\dfrac kx$ កាត់តាម $("+p+";"+q+")$ ។ រក $k$",[A(p*q,null,"num","k =")],"$k=xy="+(p*q)+"$")},
 function(){var k=nz(-12,12),x=nz(-6,6),v=fr(k,x);return K("s10_hv","$f(x)=\\dfrac{"+k+"}{x}$ ។ គណនា $f("+x+")$",[A(v.s,v.t,"num","=")],"$"+v.t+"$")}]);
vx(63,3,[
 function(){var k=ri(2,6);return K("s10_sqi","ក្រាប $y=\\sqrt x$ និង $y=\\dfrac{x}{"+k+"}$ ប្រសព្វគ្នាត្រង់ $O$ និងត្រង់ $x=m>0$ ។ រក $m$",[A(k*k,null,"num","m =")],"$\\sqrt x=\\dfrac x{"+k+"}$ ⇒ $\\sqrt x="+k+"$ ⇒ $x="+(k*k)+"$")},
 function(){var a=nz(-4,4),k=nz(-6,6),h=nz(-4,4);return K("s10_hpar","$f(x)="+a+"+\\dfrac{"+k+"}{x"+sg(-h,0)+"}$ ។ រកអាស៊ីមតូតឈរ $x=p$ ដេក $y=q$ និងតម្លៃ $f("+(h+1)+")$",[A(h,null,"num","p ="),A(a,null,"num","q ="),A(a+k,null,"num","f =")],"$x="+h+"$ · $y="+a+"$ · $f("+(h+1)+")="+a+sg(k,0)+"="+(a+k)+"$")},
 function(){var a=nz(-3,3),c=nz(-4,4),b=ri(-6,6);while(b===a*c)b++;return K("s10_cs","រកផ្ចិតឆ្លុះ $I(p;q)$ នៃក្រាប $y=\\dfrac{"+poly([a,b])+"}{x"+sg(c,0)+"}$",[A(-c,null,"num","p ="),A(a,null,"num","q =")],"ប្រសព្វអាស៊ីមតូត ៖ $x="+(-c)+"$ , $y="+a+"$")}]);
/* ៧.១ បំណែងចែកប្រេកង់ */
vx(71,1,[
 function(){var xs=[1,2,3,4,5],f;do{f=xs.map(function(){return ri(1,9)})}while(f.filter(function(v){return v===Math.max.apply(null,f)}).length>1);return K("s10_max","តារាង $"+tb2(xs,f)+"$ ។ តម្លៃ $x$ ណាមានប្រេកង់ធំបំផុត?",[A(xs[f.indexOf(Math.max.apply(null,f))],null,"num","x =")],"ប្រេកង់ $"+Math.max.apply(null,f)+"$")},
 function(){var xs=[1,2,3,4,5],f=xs.map(function(){return ri(1,8)}),j=ri(1,4),c=f.slice(0,j+1).reduce(function(a,b){return a+b},0);return K("s10_cum","តារាង $"+tb2(xs,f)+"$ ។ គណនាប្រេកង់កើននៃ $x="+xs[j]+"$",[A(c,null,"num","=")],"$"+f.slice(0,j+1).join("+")+"="+c+"$")},
 function(){var xs=[1,2,3,4,5],f=xs.map(function(){return ri(1,8)}),k=ri(2,4),c=f.filter(function(v,i){return xs[i]<=k}).reduce(function(a,b){return a+b},0);return K("s10_less","តារាង $"+tb2(xs,f)+"$ ។ ចំនួនទិន្នន័យដែល $x\\le"+k+"$ ?",[A(c,null,"num","=")],"$"+c+"$")}]);
vx(71,2,[
 function(){var N=pick([12,18,20,24,30,36]),f=fsum(4,N),j=ri(0,3);return K("s10_ang","ទិន្នន័យ $"+N+"$ ចែកជា $4$ ក្រុម ប្រេកង់ $"+f.join(",\\ ")+"$ ។ មុំផ្ចិតនៃក្រុមទី $"+(j+1)+"$ ក្នុងដ្យាក្រាមរង្វង់?",[A(360*f[j]/N,null,"num","=")],"$\\dfrac{"+f[j]+"}{"+N+"}\\times360="+(360*f[j]/N)+"^\\circ$")},
 function(){var N=pick([20,25,50]),xs=[1,2,3,4,5],f=fsum(5,N),k=ri(2,4),c=f.filter(function(v,i){return xs[i]>=k}).reduce(function(a,b){return a+b},0);return K("s10_pg","តារាង $"+tb2(xs,f)+"$ ($N="+N+"$) ។ ភាគរយនៃទិន្នន័យដែល $x\\ge"+k+"$ ?",[A(c*100/N,null,"num","% =")],"$\\dfrac{"+c+"}{"+N+"}\\times100="+(c*100/N)+"\\%$")},
 function(){var a=ri(0,8)*10,w=pick([5,10,20]);return K("s10_cls","ថ្នាក់ $["+a+";"+(a+w)+")$ ។ រកទំហំថ្នាក់ និងផ្ចិតថ្នាក់",[A(w,null,"num","ទំហំ ="),A(a+w/2,null,"num","ផ្ចិត =")],"ទំហំ $="+w+"$ · ផ្ចិត $=\\dfrac{"+a+"+"+(a+w)+"}{2}="+(a+w/2)+"$")}]);
vx(71,3,[
 function(){var xs=[1,2,3,4],f,j,S,N;do{f=xs.map(function(){return ri(1,6)});j=ri(0,3);S=0;N=0;xs.forEach(function(x,i){S+=x*f[i];N+=f[i]})}while(S===xs[j]*N);var m=fr(S,N),g=f.slice();g[j]="k";return K("s10_miss","តារាង $"+tb2(xs,g)+"$ មានមធ្យម $"+m.t+"$ ។ រក $k$",[A(f[j],null,"num","k =")],"$\\dfrac{"+(S-xs[j]*f[j])+"+"+xs[j]+"k}{"+(N-f[j])+"+k}="+m.t+"$ ⇒ $k="+f[j]+"$")},
 function(){var f=[ri(1,6),ri(1,6),ri(1,6),ri(1,6),ri(1,6)],c=[],s=0;f.forEach(function(v){s+=v;c.push(s)});var j=ri(1,4);return K("s10_decum","ប្រេកង់កើននៃ $x=1,\\dots,5$ គឺ $"+c.join(",\\ ")+"$ ។ រកប្រេកង់នៃ $x="+(j+1)+"$",[A(f[j],null,"num","=")],"$"+c[j]+"-"+c[j-1]+"="+f[j]+"$")},
 function(){var N=pick([20,40,50,80]),p=pick([10,15,20,25,30,40]);while(N*p%100)p=pick([10,20,25]);return K("s10_relN","ទិន្នន័យ $"+N+"$ ។ តម្លៃ $x=3$ មានប្រេកង់ធៀប $"+p+"\\%$ ។ រកប្រេកង់របស់វា",[A(N*p/100,null,"num","=")],"$"+N+"\\times\\dfrac{"+p+"}{100}="+(N*p/100)+"$")}]);
/* ៧.២ រង្វាស់ទីតាំង */
vx(72,1,[
 function(){var a=sample(ri(6,9),1,40),s=a.slice().sort(function(x,y){return x-y});return K("s10_rng","រកវិសាលភាពនៃ $"+a.join(",\\ ")+"$",[A(s[s.length-1]-s[0],null,"num","=")],"$"+s[s.length-1]+"-"+s[0]+"$")},
 function(){var n=ri(4,6),m=ri(5,15),a=sample(n-1,1,20),x=m*n-a.reduce(function(p,q){return p+q},0);while(x<0){a=sample(n-1,1,12);x=m*n-a.reduce(function(p,q){return p+q},0)}return K("s10_meanx","ទិន្នន័យ $"+a.join(",\\ ")+",\\ x$ មានមធ្យម $"+m+"$ ។ រក $x$",[A(x,null,"num","x =")],"$"+(m*n)+"-"+(m*n-x)+"="+x+"$")},
 function(){var n=ri(4,12),m=ri(5,20);return K("s10_tot","មធ្យមនៃទិន្នន័យ $"+n+"$ តម្លៃ គឺ $"+m+"$ ។ ផលបូក?",[A(n*m,null,"num","=")],"$"+n+"\\times"+m+"$")}]);
vx(72,2,[
 function(){var xs=[1,2,3,4,5],f,N;do{f=xs.map(function(){return ri(1,7)});N=f.reduce(function(a,b){return a+b},0)}while(N%2===0);var k=(N+1)/2,c=0,me=0;for(var i=0;i<5;i++){c+=f[i];if(c>=k){me=xs[i];break}}return K("s10_medt","រកមេដ្យាននៃ $"+tb2(xs,f)+"$",[A(me,null,"num","Me =")],"$N="+N+"$ ⇒ តួទី $"+k+"$")},
 function(){var n1=ri(10,30),n2=ri(10,30),m1=ri(5,15),m2=ri(5,15),r=fr(n1*m1+n2*m2,n1+n2);return K("s10_comb","ក្រុម A ($"+n1+"$ នាក់) មធ្យម $"+m1+"$ · ក្រុម B ($"+n2+"$ នាក់) មធ្យម $"+m2+"$ ។ មធ្យមរួម?",[A(r.s,r.t,"num","=")],"$\\dfrac{"+(n1*m1)+"+"+(n2*m2)+"}{"+(n1+n2)+"}="+r.t+"$")},
 function(){var n=ri(4,9),m=ri(5,15),s=ri(0,25),r=fr(n*m+s,n+1);return K("s10_new","មធ្យមនៃ $"+n+"$ តម្លៃ គឺ $"+m+"$ ។ ថែមតម្លៃ $"+s+"$ ។ មធ្យមថ្មី?",[A(r.s,r.t,"num","=")],"$\\dfrac{"+(n*m)+"+"+s+"}{"+(n+1)+"}="+r.t+"$")}]);
vx(72,3,[
 function(){var n=ri(5,12),m=ri(10,30),a=ri(10,40),b=a+nz(-15,15),r=fr(n*m-b+a,n);return K("s10_fix","មធ្យមនៃ $"+n+"$ តម្លៃ ត្រូវបានគណនាបាន $"+m+"$ ប៉ុន្តែកត់ខុស $"+a+"$ ទៅជា $"+b+"$ ។ មធ្យមត្រឹមត្រូវ?",[A(r.s,r.t,"num","=")],"$\\dfrac{"+(n*m)+"-"+b+"+"+a+"}{"+n+"}="+r.t+"$")},
 function(){var xs=[2,4,6,8,10],f;do{f=xs.map(function(){return ri(1,9)})}while(f.filter(function(v){return v===Math.max.apply(null,f)}).length>1);return K("s10_modt","រកម៉ូដនៃ $"+tb2(xs,f)+"$",[A(xs[f.indexOf(Math.max.apply(null,f))],null,"num","Mo =")],"ប្រេកង់ធំបំផុត")},
 function(){var a=ri(1,6),b=a+ri(1,4),x=b+ri(1,5),c=x+ri(1,5),d=c+ri(1,5),M=(x+c)/2;return K("s10_medx","ទិន្នន័យតម្រៀប ៖ $"+a+",\\ "+b+",\\ x,\\ "+c+",\\ "+d+",\\ "+(d+ri(1,5))+"$ មានមេដ្យាន $"+M+"$ ។ រក $x$",[A(x,null,"num","x =")],"$\\dfrac{x+"+c+"}{2}="+M+"$ ⇒ $x="+x+"$")}]);
/* ៨.១ វ៉ិចទ័រ */
vx(81,1,[
 function(){var u=[ri(-5,5),ri(-5,5)],v=[ri(-5,5),ri(-5,5)];return K("s10_vsub","$\\vec u"+pt(u)+"$ , $\\vec v"+pt(v)+"$ ។ រក $\\vec u-\\vec v$",[A(u[0]-v[0],null,"num","x ="),A(u[1]-v[1],null,"num","y =")],"$("+(u[0]-v[0])+";"+(u[1]-v[1])+")$")},
 function(){var A0=[ri(-5,5),ri(-5,5)],B=[ri(-5,5),ri(-5,5)];return K("s10_ab_81","$A"+pt(A0)+"$ , $B"+pt(B)+"$ ។ រកកូអរដោនេ $\\vec{AB}$",[A(B[0]-A0[0],null,"num","x ="),A(B[1]-A0[1],null,"num","y =")],"$\\vec{AB}=(x_B-x_A;y_B-y_A)$")},
 function(){var u=[ri(-5,5),ri(-5,5)],k=nz(-4,4);return K("s10_vk","$\\vec u"+pt(u)+"$ ។ រក $"+(k===1?"":k===-1?"-":k)+"\\vec u$",[A(k*u[0],null,"num","x ="),A(k*u[1],null,"num","y =")],"$("+(k*u[0])+";"+(k*u[1])+")$")}]);
vx(81,2,[
 function(){var u=[ri(-4,4),ri(-4,4)],v=[ri(-4,4),ri(-4,4)],a=nz(-3,3),b=nz(-3,3);return K("s10_lin_81","$\\vec u"+pt(u)+"$ , $\\vec v"+pt(v)+"$ ។ រក $"+a+"\\vec u"+(b<0?"-":"+")+Math.abs(b)+"\\vec v$",[A(a*u[0]+b*v[0],null,"num","x ="),A(a*u[1]+b*v[1],null,"num","y =")],"$("+(a*u[0]+b*v[0])+";"+(a*u[1]+b*v[1])+")$")},
 function(){var T=pick(TR),A0=[ri(-4,3),ri(-4,3)],B=[A0[0]+T[0]*pick([1,-1]),A0[1]+T[1]*pick([1,-1])];return K("s10_len","$A"+pt(A0)+"$ , $B"+pt(B)+"$ ។ គណនា $|\\vec{AB}|$",[A(T[2],null,"num","=")],"$\\sqrt{"+(T[0]*T[0])+"+"+(T[1]*T[1])+"}="+T[2]+"$")},
 function(){var a=nz(-5,5),m=ri(-5,5),n=ri(-5,5);return K("s10_veq","រក $m,n$ ដែល $\\vec u(m"+sg(a,0)+";2n)$ ស្មើ $\\vec v("+(m+a)+";"+(2*n)+")$",[A(m,null,"num","m ="),A(n,null,"num","n =")],"វ៉ិចទ័រស្មើ ⇔ កូអរដោនេស្មើ ⇒ $m"+sg(a,0)+"="+(m+a)+"$ , $2n="+(2*n)+"$ ⇒ $m="+m+"$ , $n="+n+"$")}]);
vx(81,3,[
 function(){var u=[1,ri(-2,2)],v=[ri(-2,2),1];while(u[0]*v[1]-u[1]*v[0]===0)v[0]++;var a=nz(-3,3),b=nz(-3,3),w=[a*u[0]+b*v[0],a*u[1]+b*v[1]];return K("s10_combv","$\\vec u"+pt(u)+"$ , $\\vec v"+pt(v)+"$ , $\\vec w"+pt(w)+"$ ។ រក $a,b$ ដែល $\\vec w=a\\vec u+b\\vec v$",[A(a,null,"num","a ="),A(b,null,"num","b =")],"ដោះស្រាយប្រព័ន្ធ ⇒ $a="+a+"$ , $b="+b+"$")},
 function(){var A0=[ri(-5,3),ri(-5,3)],B=[A0[0]+ri(2,5),A0[1]+ri(-2,2)],C=[B[0]+ri(-2,3),B[1]+ri(2,5)];return K("s10_pgm","រក $D$ ដើម្បីឱ្យ $\\vec{AB}=\\vec{DC}$ ដែល $A"+pt(A0)+"$ , $B"+pt(B)+"$ , $C"+pt(C)+"$",[A(C[0]-B[0]+A0[0],null,"num","x ="),A(C[1]-B[1]+A0[1],null,"num","y =")],"$D=C-\\vec{AB}$")},
 function(){var G0=[ri(-3,3),ri(-3,3)],A0=[ri(-5,5),ri(-5,5)],B=[ri(-5,5),ri(-5,5)],C=[3*G0[0]-A0[0]-B[0],3*G0[1]-A0[1]-B[1]];return K("s10_gv","រកចំណុច $G$ ដែល $\\vec{GA}+\\vec{GB}+\\vec{GC}=\\vec0$ ដោយ $A"+pt(A0)+"$ , $B"+pt(B)+"$ , $C"+pt(C)+"$",[A(G0[0],null,"num","x ="),A(G0[1],null,"num","y =")],"$G$ ទីប្រជុំទម្ងន់ $"+pt(G0)+"$")}]);
/* ៨.២ ការអនុវត្តវ៉ិចទ័រ */
var AV=[[[1,0],[0,1],90],[[1,1],[1,-1],90],[[1,0],[1,1],45],[[2,0],[-1,0],180],[[0,3],[0,1],0],[[1,1],[0,2],45],[[3,0],[-2,2],135]];
vx(82,1,[
 function(){var A0=[ri(-3,3),ri(-3,3)],B=[ri(-3,3),ri(-3,3)],C=[ri(-3,3),ri(-3,3)],u=[B[0]-A0[0],B[1]-A0[1]],v=[C[0]-A0[0],C[1]-A0[1]];return K("s10_dotab","$A"+pt(A0)+"$ , $B"+pt(B)+"$ , $C"+pt(C)+"$ ។ គណនា $\\vec{AB}\\cdot\\vec{AC}$",[A(u[0]*v[0]+u[1]*v[1],null,"num","=")],"$\\vec{AB}"+pt(u)+"$ , $\\vec{AC}"+pt(v)+"$ ⇒ $"+(u[0]*v[0]+u[1]*v[1])+"$")},
 function(){var T=pick(TR),k=nz(-3,3),u=[T[0],T[1]];return K("s10_lenk","$\\vec u"+pt(u)+"$ ។ គណនា $|"+k+"\\vec u|$",[A(Math.abs(k)*T[2],null,"num","=")],"$|"+k+"|\\cdot"+T[2]+"="+(Math.abs(k)*T[2])+"$")},
 function(){var c=pick(AV);return K("s10_angv","រកមុំ $\\theta$ (ដឺក្រេ) រវាង $\\vec u"+pt(c[0])+"$ និង $\\vec v"+pt(c[1])+"$",[A(c[2],null,"num","θ =")],"$\\cos\\theta=\\dfrac{\\vec u\\cdot\\vec v}{|\\vec u||\\vec v|}$ ⇒ $"+ang(c[2])+"$")}]);
vx(82,2,[
 function(){var A0=[ri(-3,3),ri(-3,3)],u=[nz(-3,3),nz(-3,3)],a=nz(-4,4),m=fr(-u[0]*a,u[1]);return K("s10_perpk","$A"+pt(A0)+"$ , $\\vec{AB}"+pt(u)+"$ , $\\vec{AC}=("+a+";m)$ ។ រក $m$ ដើម្បីឱ្យ $AB\\perp AC$",[A(m.s,m.t,"num","m =")],"$"+(u[0]*a)+sg(u[1],0)+"m=0$ ⇒ $m="+m.t+"$")},
 function(){var A0=[ri(-3,3),ri(-3,3)],d=[nz(-3,3),nz(-3,3)],k=nz(-3,3);while(k===1)k++;return K("s10_colv","$A"+pt(A0)+"$ , $B"+pt([A0[0]+d[0],A0[1]+d[1]])+"$ , $C("+(A0[0]+k*d[0])+";m)$ ។ រក $m$ ដើម្បីឱ្យ $A,B,C$ រត់ត្រង់គ្នា",[A(A0[1]+k*d[1],null,"num","m =")],"$\\vec{AC}="+k+"\\vec{AB}$ ⇒ $m="+(A0[1]+k*d[1])+"$")},
 function(){var T1=pick(TR),T2=pick(TR),u=[T1[0],T1[1]],v=[T2[1],T2[0]*pick([1,-1])],c=fr(u[0]*v[0]+u[1]*v[1],T1[2]*T2[2]);return K("s10_cosv","គណនា $\\cos\\theta$ រវាង $\\vec u"+pt(u)+"$ និង $\\vec v"+pt(v)+"$",[A(c.s,c.t,"num","=")],"$\\dfrac{"+(u[0]*v[0]+u[1]*v[1])+"}{"+T1[2]+"\\times"+T2[2]+"}="+c.t+"$")}]);
vx(82,3,[
 function(){var A0=[ri(-3,3),ri(-3,3)],u=[nz(-4,4),ri(-4,4)],v=[ri(-4,4),nz(-4,4)],S=fr(Math.abs(u[0]*v[1]-u[1]*v[0]),2);if(S.n===0){v[0]++;S=fr(Math.abs(u[0]*v[1]-u[1]*v[0]),2)}return K("s10_tria","$A"+pt(A0)+"$ , $B"+pt([A0[0]+u[0],A0[1]+u[1]])+"$ , $C"+pt([A0[0]+v[0],A0[1]+v[1]])+"$ ។ គណនាផ្ទៃក្រឡាត្រីកោណ $ABC$",[A(S.s,S.t,"num","S =")],"$S=\\dfrac12|x_1y_2-x_2y_1|="+S.t+"$")},
 function(){var T=pick(TR),u=[ri(-5,5),ri(-5,5)],v=[T[0],T[1]],p=fr(u[0]*v[0]+u[1]*v[1],T[2]);return K("s10_proj_82","គណនាចំណោល (ប្រវែងមានសញ្ញា) នៃ $\\vec u"+pt(u)+"$ លើ $\\vec v"+pt(v)+"$",[A(p.s,p.t,"num","=")],"$\\dfrac{\\vec u\\cdot\\vec v}{|\\vec v|}=\\dfrac{"+(u[0]*v[0]+u[1]*v[1])+"}{"+T[2]+"}="+p.t+"$")},
 function(){var F=[ri(1,8),ri(-4,8)],d=[ri(1,10),ri(-5,5)];return K("s10_work","កម្លាំង $\\vec F"+pt(F)+"$ (N) រុញវត្ថុមួយផ្លាស់ទី $\\vec d"+pt(d)+"$ (m) ។ គណនាការងារ $W=\\vec F\\cdot\\vec d$ (J)",[A(F[0]*d[0]+F[1]*d[1],null,"num","W =")],"$"+(F[0]*d[0])+sg(F[1]*d[1],0)+"="+(F[0]*d[0]+F[1]*d[1])+"$")}]);
/* ៩.១ ការកិល */
vx(91,1,[
 function(){var T=pick(TR);return K("s10_tseg","ការកិលមួយបំប្លែង $[AB]$ ទៅ $[A'B']$ ។ $AB="+T[2]+"$ ។ គណនា $A'B'$",[A(T[2],null,"num","=")],"ការកិលរក្សាប្រវែង")},
 function(){var m=nz(-4,4),p=ri(-5,5),k=nz(-5,5);return K("s10_tl_91","រូបភាពនៃ $y="+co(m,"x",true)+sg(p,0)+"$ តាមការកិល $\\vec v(0;"+k+")$ គឺ $y="+co(m,"x",true)+"+q$ ។ រក $q$",[A(p+k,null,"num","q =")],"$q="+p+sg(k,0)+"="+(p+k)+"$")},
 function(){var v1=[ri(-4,4),ri(-4,4)],v2=[ri(-4,4),ri(-4,4)];return K("s10_t2","ការកិល $\\vec v_1"+pt(v1)+"$ បន្តដោយ $\\vec v_2"+pt(v2)+"$ ស្មើការកិលតែមួយ $\\vec v$ ។ រក $\\vec v$",[A(v1[0]+v2[0],null,"num","x ="),A(v1[1]+v2[1],null,"num","y =")],"$\\vec v=\\vec v_1+\\vec v_2$")}]);
vx(91,2,[
 function(){var m=nz(-3,3),p=ri(-5,5),a=nz(-3,3),b=ri(-4,4);return K("s10_tl2","រូបភាពនៃ $y="+co(m,"x",true)+sg(p,0)+"$ តាមការកិល $\\vec v("+a+";"+b+")$ គឺ $y="+co(m,"x",true)+"+q$ ។ រក $q$",[A(p+b-m*a,null,"num","q =")],"$y-"+sgp(b)+"="+m+"(x-"+sgp(a)+")"+sg(p,0)+"$ ⇒ $q="+(p+b-m*a)+"$")},
 function(){var I=[ri(-4,4),ri(-4,4)],v=[nz(-4,4),nz(-4,4)],r=ri(1,5);return K("s10_tc","រង្វង់ $(x"+(I[0]?sg(-I[0],0):"")+")^2+(y"+(I[1]?sg(-I[1],0):"")+")^2="+(r*r)+"$ ត្រូវកិលតាម $\\vec v"+pt(v)+"$ ។ រកផ្ចិតរូបភាព",[A(I[0]+v[0],null,"num","x ="),A(I[1]+v[1],null,"num","y =")],"$I'=I+\\vec v$")},
 function(){var A0=[ri(-4,4),ri(-4,4)],A1=[ri(-4,4),ri(-4,4)],B=[ri(-4,4),ri(-4,4)];return K("s10_tinv","ការកិលមួយបំប្លែង $A"+pt(A0)+"$ ទៅ $A'"+pt(A1)+"$ ។ រករូបភាពនៃ $B"+pt(B)+"$",[A(B[0]+A1[0]-A0[0],null,"num","x ="),A(B[1]+A1[1]-A0[1],null,"num","y =")],"$\\vec v=\\vec{AA'}"+pt([A1[0]-A0[0],A1[1]-A0[1]])+"$")}]);
vx(91,3,[
 function(){var m=nz(-4,4),p=ri(-6,6),h=nz(-3,3),q=p-m*h;return K("s10_tp","ការកិល $\\vec v(h;0)$ បំប្លែង $y="+co(m,"x",true)+sg(p,0)+"$ ទៅ $y="+co(m,"x",true)+sg(q,0)+"$ ។ រក $h$",[A(h,null,"num","h =")],"$q=p-mh$ ⇒ $"+q+"="+p+"-"+sgp(m)+"h$ ⇒ $h="+h+"$")},
 function(){var I=[ri(-4,4),ri(-4,4)],v=[nz(-4,4),nz(-4,4)],r=ri(1,5),J=[I[0]+v[0],I[1]+v[1]];return K("s10_tc2","ការកិល $\\vec v$ បំប្លែងរង្វង់ផ្ចិត $I"+pt(I)+"$ ទៅរង្វង់ $(x"+(J[0]?sg(-J[0],0):"")+")^2+(y"+(J[1]?sg(-J[1],0):"")+")^2="+(r*r)+"$ ។ រក $\\vec v$",[A(v[0],null,"num","x ="),A(v[1],null,"num","y =")],"$\\vec v=\\vec{II'}$")},
 function(){var A0=[ri(-4,4),ri(-4,4)],B=[ri(-4,4),ri(-4,4)],v=[nz(-3,3),nz(-3,3)],G0=[ri(-2,2),ri(-2,2)],C=[3*G0[0]-A0[0]-B[0],3*G0[1]-A0[1]-B[1]];return K("s10_tg_91","ត្រីកោណ $A"+pt(A0)+"$ $B"+pt(B)+"$ $C"+pt(C)+"$ ត្រូវកិលតាម $\\vec v"+pt(v)+"$ ។ រកទីប្រជុំទម្ងន់នៃរូបភាព",[A(G0[0]+v[0],null,"num","x ="),A(G0[1]+v[1],null,"num","y =")],"$G"+pt(G0)+"$ ⇒ $G'=G+\\vec v$")}]);
/* ៩.២ ការឆ្លុះ */
vx(92,1,[
 function(){var P=[nz(-5,5),nz(-5,5)];return K("s10_ry","រករូបភាពឆ្លុះនៃ $A"+pt(P)+"$ ធៀបនឹង $y=-x$",[A(-P[1],null,"num","x ="),A(-P[0],null,"num","y =")],"$(x;y)\\mapsto(-y;-x)$")},
 function(){var P=[ri(-5,5),nz(-5,5)],k=nz(-3,3);while(P[0]===k)P[0]++;return K("s10_rxk","រករូបភាពឆ្លុះនៃ $A"+pt(P)+"$ ធៀបនឹងបន្ទាត់ $x="+k+"$",[A(2*k-P[0],null,"num","x ="),A(P[1],null,"num","y =")],"$(x;y)\\mapsto("+(2*k)+"-x;y)$")},
 function(){var P=[nz(-5,5),ri(-5,5)],k=nz(-3,3);while(P[1]===k)P[1]++;return K("s10_ryk","រករូបភាពឆ្លុះនៃ $A"+pt(P)+"$ ធៀបនឹងបន្ទាត់ $y="+k+"$",[A(P[0],null,"num","x ="),A(2*k-P[1],null,"num","y =")],"$(x;y)\\mapsto(x;"+(2*k)+"-y)$")}]);
vx(92,2,[
 function(){var m=nz(-4,4),p=ri(-6,6);return K("s10_lox","រូបភាពនៃបន្ទាត់ $y="+co(m,"x",true)+sg(p,0)+"$ ឆ្លុះធៀបនឹង $Ox$ គឺ $y=m'x+p'$ ។ រក $m'$ , $p'$",[A(-m,null,"num","m' ="),A(-p,null,"num","p' =")],"$-y="+m+"x"+sg(p,0)+"$")},
 function(){var P=[ri(-6,6),nz(-6,6)];return K("s10_dd","$A'$ ជាចំណុចឆ្លុះនៃ $A"+pt(P)+"$ ធៀបនឹង $Ox$ ។ គណនា $AA'$",[A(2*Math.abs(P[1]),null,"num","=")],"$A'("+P[0]+";"+(-P[1])+")$ ⇒ $AA'="+(2*Math.abs(P[1]))+"$")},
 function(){var k=ri(-4,4),d=nz(-5,5),y=ri(-5,5);return K("s10_fk","$A("+(k-d)+";"+y+")$ និង $A'("+(k+d)+";"+y+")$ ឆ្លុះគ្នាធៀបនឹងបន្ទាត់ $x=k$ ។ រក $k$",[A(k,null,"num","k =")],"$k=\\dfrac{"+(k-d)+"+"+sgp(k+d)+"}{2}="+k+"$")}]);
vx(92,3,[
 function(){var m=nz(-4,4),p=ri(-6,6);return K("s10_loy","រូបភាពនៃបន្ទាត់ $y="+co(m,"x",true)+sg(p,0)+"$ ឆ្លុះធៀបនឹង $Oy$ គឺ $y=m'x+p'$ ។ រក $m'$ , $p'$",[A(-m,null,"num","m' ="),A(p,null,"num","p' =")],"$x\\to-x$ ⇒ $y="+co(-m,"x",true)+sg(p,0)+"$")},
 function(){var I=[nz(-5,5),nz(-5,5)],r=ri(1,5);return K("s10_rc","រង្វង់ផ្ចិត $I"+pt(I)+"$ កាំ $"+r+"$ ឆ្លុះធៀបនឹង $y=x$ ។ រកផ្ចិត និងកាំរូបភាព",[A(I[1],null,"num","x ="),A(I[0],null,"num","y ="),A(r,null,"num","R =")],"$(x;y)\\mapsto(y;x)$ · កាំដដែល")},
 function(){var A0=[ri(-5,5),ri(-5,5)],I=[ri(-3,3),ri(-3,3)],B=[2*I[0]-A0[0],2*I[1]-A0[1]];return K("s10_fi","$A'"+pt(B)+"$ ជារូបភាពឆ្លុះនៃ $A"+pt(A0)+"$ ធៀបនឹងចំណុច $I$ ។ រក $I$",[A(I[0],null,"num","x ="),A(I[1],null,"num","y =")],"$I$ ចំណុចកណ្ដាល $[AA']$")}]);
/* ៩.៣ ការវិល */
vx(93,1,[
 function(){var P=[nz(-5,5),nz(-5,5)];return K("s10_r270","រករូបភាពនៃ $A"+pt(P)+"$ តាមការវិលផ្ចិត $O$ មុំ $270^\\circ$ (ច្រាសទ្រនិចនាឡិកា)",[A(P[1],null,"num","x ="),A(-P[0],null,"num","y =")],"$270^\\circ$ ច្រាស $=90^\\circ$ តាមទ្រនិច ⇒ $(x;y)\\mapsto(y;-x)$")},
 function(){var T=pick(TR),P=[T[0],T[1]];return K("s10_rlen","$A'$ ជារូបភាពនៃ $A"+pt(P)+"$ តាមការវិលផ្ចិត $O$ ។ គណនា $OA'$",[A(T[2],null,"num","=")],"ការវិលរក្សាចម្ងាយ ⇒ $OA'=OA="+T[2]+"$")},
 function(){var a=ri(1,6),C=pick([["("+a+";0)","(0;"+a+")",90],["("+a+";0)","(-"+a+";0)",180],["(0;"+a+")","("+a+";0)",270]]);return K("s10_rang","ការវិលផ្ចិត $O$ (ច្រាសទ្រនិចនាឡិកា មុំក្នុង $(0^\\circ;360^\\circ)$) បំប្លែង $A"+C[0]+"$ ទៅ $A'"+C[1]+"$ ។ រកមុំវិល",[A(C[2],null,"num","=")],"$"+ang(C[2])+"$")}]);
vx(93,2,[
 function(){var P=[ri(-5,5),ri(-5,5)],I=[ri(-3,3),ri(-3,3)];return K("s10_rc180","រករូបភាពនៃ $A"+pt(P)+"$ តាមការវិលផ្ចិត $I"+pt(I)+"$ មុំ $180^\\circ$",[A(2*I[0]-P[0],null,"num","x ="),A(2*I[1]-P[1],null,"num","y =")],"$A'=2I-A$")},
 function(){var P=[nz(-5,5),nz(-5,5)];return K("s10_rinv","ការវិលផ្ចិត $O$ មុំ $90^\\circ$ (ច្រាសទ្រនិច) បំប្លែង $A$ ទៅ $A'"+pt([-P[1],P[0]])+"$ ។ រក $A$",[A(P[0],null,"num","x ="),A(P[1],null,"num","y =")],"វិលត្រឡប់ $-90^\\circ$ ⇒ $(x;y)\\mapsto(y;-x)$")},
 function(){var P=[nz(-5,5),nz(-5,5)];return K("s10_rseq","វិល $A"+pt(P)+"$ ផ្ចិត $O$ មុំ $90^\\circ$ ពីរដងជាប់គ្នា ។ រករូបភាពចុងក្រោយ",[A(-P[0],null,"num","x ="),A(-P[1],null,"num","y =")],"$90^\\circ+90^\\circ=180^\\circ$ ⇒ $(-x;-y)$")}]);
vx(93,3,[
 function(){var P=[ri(-4,4),ri(-4,4)],I=[ri(-3,3),ri(-3,3)],R=[I[0]-(P[1]-I[1]),I[1]+(P[0]-I[0])];return K("s10_rc90","រករូបភាពនៃ $A"+pt(P)+"$ តាមការវិលផ្ចិត $I"+pt(I)+"$ មុំ $90^\\circ$ (ច្រាសទ្រនិច)",[A(R[0],null,"num","x ="),A(R[1],null,"num","y =")],"$\\vec{IA}"+pt([P[0]-I[0],P[1]-I[1]])+"\\mapsto"+pt([-(P[1]-I[1]),P[0]-I[0]])+"$ ⇒ $A'=I+\\dots="+pt(R)+"$")},
 function(){var m=pick([1,-1,2,-2,3,-3,fr(1,2),fr(-1,3)]),mt=typeof m==="number"?String(m):m.t,r=typeof m==="number"?fr(-1,m):fr(-m.d,m.n);return K("s10_rl","បន្ទាត់ $y="+(mt==="1"?"":mt==="-1"?"-":mt)+"x$ វិលផ្ចិត $O$ មុំ $90^\\circ$ ។ រកមេគុណប្រាប់ទិសនៃរូបភាព",[A(r.s,r.t,"num","m' =")],"ការវិល $90^\\circ$ ⇒ បន្ទាត់កែង ⇒ $m'=-\\dfrac1m="+r.t+"$")},
 function(){var a=ri(1,8),b=ri(1,8),S=fr(a*b,2);return K("s10_rar","ត្រីកោណ $O(0;0)$ , $A("+a+";0)$ , $B(0;"+b+")$ វិលផ្ចិត $O$ មុំ $90^\\circ$ ។ គណនាផ្ទៃក្រឡារូបភាព",[A(S.s,S.t,"num","S =")],"ការវិលរក្សាផ្ទៃក្រឡា ⇒ $\\dfrac{"+a+"\\times"+b+"}{2}="+S.t+"$")}]);
/* គំរូដើម (គ្មាន kd) → kd = b{មេរៀន}_{កម្រិត} */
Object.keys(G).forEach(function(l){[1,2,3].forEach(function(v){var o=G[l][v];if(o)G[l][v]=function(){var x=o();if(x&&!x.kd)x.kd="b"+l+"_"+v;return x}})});

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
