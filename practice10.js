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
