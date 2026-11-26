/* ========================================================================
   🧮 ហ្វឹកហាត់បន្ថែម ថ្នាក់ទី១០ — ២៥ មេរៀន × ៣ កម្រិត + 🌍 PISA (បង្កើតដោយកូដ)
   ការបំប្លែងចាំង (94) មាន PISA ហើយ
   តក្កវិទ្យា៖ ឆ្លើយ 1 = ពិត · 0 = មិនពិត · ត្រូវផ្ទុកបន្ទាប់ពី practice.js (window.PX)
   ======================================================================== */
(function(){
"use strict";
var X=window.PX,Q=X.Q,A=X.A,ri=X.ri,nz=X.nz,pick=X.pick,fr=X.fr,sg=X.sg,co=X.co,poly=X.poly,polyT=X.polyT,sgp=X.sgp,gcd=X.gcd;
function pt(p){return"("+p[0]+";"+p[1]+")"}
function lcm(a,b){return a/gcd(a,b)*b}
var G={};
/* ទម្រង់ចម្លើយពហុធា៖ ប្រអប់មេគុណ a, b, c … (មិនប្រៀបធៀបអក្សរ ដូចជាដកឃ្លា/ស្វ័យគុណ) */
var CFN=["a","b","c","d","e"];
function cfTpl(n){var t=[];for(var i=0;i<=n;i++){var d=n-i;t.push(CFN[i]+(d>1?"x^{"+d+"}":d===1?"x":""))}return t.join("+")}
function cfAsk(e,nm){var n=e.length-1,l=[];for(var i=0;i<=n;i++)l.push("$"+CFN[i]+"$");return " ។ សរសេរជាទម្រង់ $"+(nm?nm+"=":"")+cfTpl(n)+"$ ហើយរក "+l.join(" , ")}
function cfAns(e,pre){return e.map(function(v,i){return A(v,null,"num",(pre||"")+CFN[i]+" =")})}
/* ===== ជំពូកទី១ ពហុធា ===== */
G[11]={1:function(){var c=[nz(-3,3),ri(-5,5),ri(-6,6)],a=ri(-3,3),v=c[0]*a*a+c[1]*a+c[2];
    return Q("គេឱ្យ $P(x)="+polyT(c)+"$ ។ គណនា $P("+a+")$",[A(v,null,"num","P("+a+") =")],"ជំនួស $x="+a+"$ ⇒ $"+v+"$")},
  2:function(){var a=nz(-5,5),b=nz(-5,5),e=[1,a+b,a*b];
    return Q("ពន្លាត $(x"+sg(a,0)+")(x"+sg(b,0)+")$"+cfAsk(e),cfAns(e),"$=x^2"+co(b,"x")+co(a,"x")+sg(a*b,0)+"="+polyT(e)+"$")},
  3:function(){var a=nz(-3,3),b=ri(-4,4),c=nz(-3,3),d=ri(-4,4),e=[a*c,a*d+b*c,b*d];
    return Q("ពន្លាត និងសម្រួល $("+poly([a,b])+")("+poly([c,d])+")$"+cfAsk(e),cfAns(e),"$="+polyT(e)+"$")}};
G[12]={1:function(){var c=[nz(-3,3),ri(-4,4),ri(-5,5),ri(-6,6)],a=ri(-2,3),r=((c[0]*a+c[1])*a+c[2])*a+c[3];
    return Q("រកសំណល់នៃការចែក $P(x)="+polyT(c)+"$ នឹង $x"+sg(-a,0)+"$",[A(r,null,"num","សំណល់ =")],"ទ្រឹស្ដីបទសំណល់ ⇒ $R=P("+a+")="+r+"$")},
  2:function(){var a=nz(-3,3),b=nz(-4,4),c=ri(-5,5);   /* (x-a)(x²+bx+c) ÷ (x-a) */
    var P=[1,b-a,c-a*b,-a*c];
    return Q("ចែក $P(x)="+polyT(P)+"$ នឹង $x"+sg(-a,0)+"$ ។ រកផលចែក $Q(x)$"+cfAsk([1,b,c],"Q(x)"),cfAns([1,b,c],"Q: "),"ប្រើវិធីហ៊័រណឺ (Horner) ⇒ $Q(x)="+polyT([1,b,c])+"$ សំណល់ $0$")},
  3:function(){var a=nz(-3,3),k=nz(-4,4),c=[1,k,0],m=-(a*a*a+k*a*a);   /* x³+kx²+m ចែកដាច់នឹង x-a */
    return Q("រក $m$ ដើម្បីឱ្យ $P(x)=x^3"+co(k,"x^2")+"+m$ ចែកដាច់នឹង $x"+sg(-a,0)+"$",[A(m,null,"num","m =")],"$P("+a+")=0\\iff "+(a*a*a)+sg(k*a*a,0)+"+m=0\\iff m="+m+"$")}};
/* ===== ជំពូកទី២ តក្កវិទ្យា សំណុំ ចំនួន ===== */
G[21]={1:function(){var a=ri(1,9),b=ri(1,9),op=pick(["\\land","\\lor"]),p=a>b,q=b%2===0,v=op==="\\land"?(p&&q):(p||q),nm=op==="\\land"?"និង":"ឬ";
    return Q("គេឱ្យសំណើ $p$៖ «$"+a+">"+b+"$» និងសំណើ $q$៖ «$"+b+"$ ជាចំនួនគូ»។ ចូរកំណត់តម្លៃនៃសំណើ $p"+op+" q$ (ឈ្នាប់តក្ក «"+nm+"») ។ (ឆ្លើយ $1$ = ពិត · $0$ = មិនពិត)",[A(v?1:0,null,"num","តម្លៃ =")],"$p$ "+(p?"ពិត":"មិនពិត")+" · $q$ "+(q?"ពិត":"មិនពិត")+" ⇒ $p"+op+" q$ "+(v?"ពិត":"មិនពិត"))},
  2:function(){var a=ri(1,9),p=a%3===0,b=ri(1,9),q=b>5,v=!p||q;
    return Q("គេឱ្យសំណើ $p$៖ «$"+a+"$ ចែកដាច់នឹង $3$» និងសំណើ $q$៖ «$"+b+">5$»។ ចូរកំណត់តម្លៃនៃសំណើ $p\\Rightarrow q$ (ឈ្នាប់តក្ក «នាំឱ្យ») ។ ($1$ = ពិត · $0$ = មិនពិត)",[A(v?1:0,null,"num","តម្លៃ =")],"$p\\Rightarrow q$ មិនពិតលុះត្រាតែ $p$ ពិត ហើយ $q$ មិនពិត ⇒ "+(v?"ពិត":"មិនពិត"))},
  3:function(){var a=ri(1,9),b=ri(1,9),p=a<b,q=a+b>10,v=!(p&&q);
    return Q("គេឱ្យសំណើ $p$៖ «$"+a+"<"+b+"$» និងសំណើ $q$៖ «$"+a+"+"+b+">10$»។ ចូរកំណត់តម្លៃនៃសំណើបដិសេធ $\\overline{p\\land q}$ ។ ($1$ = ពិត · $0$ = មិនពិត)",[A(v?1:0,null,"num","តម្លៃ =")],"$p\\land q$ "+(p&&q?"ពិត":"មិនពិត")+" ⇒ សំណើបដិសេធរបស់វា "+(v?"ពិត":"មិនពិត"))}};
G[22]={1:function(){var c=ri(1,4),a=ri(1,4),b=ri(1,4);
    return Q("គេឱ្យសំណុំ $A$ និង $B$ ដែល $n(A)="+(c+a)+"$ , $n(B)="+(c+b)+"$ និង $n(A\\cap B)="+c+"$ ។ គណនា $n(A\\cup B)$",[A(c+a+b,null,"num","n(A∪B) =")],"$n(A\\cup B)=n(A)+n(B)-n(A\\cap B)="+(c+a)+"+"+(c+b)+"-"+c+"="+(c+a+b)+"$",GFV({k:2,lab:{ab:String(c),a:"?",b:"?"},cap:["n(A) = "+(c+a)+" · n(B) = "+(c+b)],shade:["a","ab","b"]}))},
  2:function(){var N=ri(8,20),a=ri(2,N-2);
    return Q("គេឱ្យសំណុំសកល $U$ មាន $n(U)="+N+"$ ធាតុ ហើយ $n(A)="+a+"$ ។ គណនា $n(A^c)$ (សំណុំបំពេញនៃ $A$)",[A(N-a,null,"num","n(A^c) =")],"$n(A^c)=n(U)-n(A)="+N+"-"+a+"="+(N-a)+"$",GFV({k:1,lab:{a:String(a),out:"?"},cap:["n(U) = "+N]}))},
  3:function(){var c=ri(1,5),a=ri(1,5),b=ri(1,5);
    return Q("គេឱ្យ $n(A)="+(c+a)+"$ , $n(B)="+(c+b)+"$ និង $n(A\\cup B)="+(c+a+b)+"$ ។ គណនា $n(A\\cap B)$",[A(c,null,"num","n(A∩B) =")],"$n(A\\cap B)=n(A)+n(B)-n(A\\cup B)="+(c+a)+"+"+(c+b)+"-"+(c+a+b)+"="+c+"$",GFV({k:2,lab:{a:"?",ab:"?",b:"?"},cap:["n(A) = "+(c+a)+" · n(B) = "+(c+b),"n(A ∪ B) = "+(c+a+b)],shade:["ab"]}))}};
G[23]={};   /* ទម្រង់ទាំងអស់ត្រូវបានកំណត់ក្នុងប្លុក «២.៣ ចំនួន» ខាងក្រោម (vx 1·5·2·6·3) */
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
  return Q("ដោះស្រាយ $\\sqrt{x"+sg(k,0)+"}=x"+(c?sg(-c,0):"")+"$",[A(r,null,"num","x =")],"លើកការ៉េ៖ $x"+sg(k,0)+"=(x"+(c?sg(-c,0):"")+")^2$ · លក្ខខណ្ឌ $x\\ge"+c+"$ ⇒ $x="+r+"$")};
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
/* 🖼 រូបត្រីកោណពី practiceen.js (PXEN.GF.rightTri / tri) — ហៅពេលបង្កើតសំណួរ · បើគ្មាន → គ្មានរូប (មិនបាក់) */
function GFR(o){try{return window.PXEN.GF.rightTri(o)}catch(e){return ""}}
function GFT(o){try{return window.PXEN.GF.tri(o)}catch(e){return ""}}
/* 🖼 ដ្យាក្រាមវ៉ែន (PXEN.GF.venn) — "?" = តំបន់ដែលសំណួរសុំឱ្យរក (មិនបង្ហាញចម្លើយ) */
function GFV(o){try{return window.PXEN.GF.venn(o)}catch(e){return ""}}
var DG=Math.PI/180;
function cosAng(a,b,c){return Math.acos((b*b+c*c-a*a)/(2*b*c))/DG}   /* មុំឈមជ្រុង a ពីជ្រុងទាំងបី */
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
    return Q("រង្វង់ $x^2+y^2"+co(D,"x")+co(E,"y")+(F?sg(F,0):"")+"=0$ ។ រកផ្ចិត និងកាំ",[A(a,null,"num","x_I ="),A(b,null,"num","y_I ="),A(r,null,"num","R =")],"បំពេញការ៉េ៖ $(x"+sg(-a,0)+")^2+(y"+sg(-b,0)+")^2="+(r*r)+"$","x^2+y^2"+co(D,"x")+co(E,"y")+(F?sg(F,0):"")+"=0\nI("+a+","+b+")")},
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
    return Q("ត្រីកោណ $ABC$ កែងត្រង់ $C$ មាន $BC="+T[0]+"$ , $AC="+T[1]+"$ , $AB="+T[2]+"$ ។ គណនា $\\"+f+" A$",[A(v.s,v.t,"num",f+" A =")],"$\\sin A=\\frac{BC}{AB}$ · $\\cos A=\\frac{AC}{AB}$ · $\\tan A=\\frac{BC}{AC}$ ⇒ $"+v.t+"$",GFR({names:"ACB",w:T[0],h:T[1],base:String(T[0]),height:String(T[1]),hyp:String(T[2]),ang:{at:"top",lab:"A"}}))},
  2:function(){var T=pick(TR);
    return Q("ត្រីកោណកែងត្រង់ $C$ មាន $BC="+T[0]+"$ និង $AB="+T[2]+"$ ។ គណនា $AC$ និង $\\cos A$",[A(T[1],null,"num","AC ="),A(fr(T[1],T[2]).s,fr(T[1],T[2]).t,"num","cos A =")],"ពីតាគ័រ $AC=\\sqrt{"+(T[2]*T[2])+"-"+(T[0]*T[0])+"}="+T[1]+"$",GFR({names:"ACB",w:T[0],h:T[1],base:String(T[0]),height:"x",hyp:String(T[2]),ang:{at:"top",lab:"A"}}))},
  3:function(){var C=pick([["30°","sqrt(3)/2","\\frac{\\sqrt3}{2}","1/2","\\frac12"],["45°","sqrt(2)/2","\\frac{\\sqrt2}{2}","sqrt(2)/2","\\frac{\\sqrt2}{2}"],["60°","1/2","\\frac12","sqrt(3)/2","\\frac{\\sqrt3}{2}"]]);
    return Q("គណនា $\\cos "+C[0]+"$ និង $\\sin "+C[0]+"$",[A(C[1],C[2],"num","cos ="),A(C[3],C[4],"num","sin =")],"តម្លៃពិសេស")}};
G[52]={1:function(){var d=ri(5,30),C=pick([["30°","sqrt(3)/3","\\frac{\\sqrt3}{3}"],["45°","1","1"],["60°","sqrt(3)","\\sqrt3"]]);
    return Q("ពីចំណុចឆ្ងាយ $"+d+"$ ម៉ែត្រពីជើងបង្គោល គេមើលឃើញចុងបង្គោលក្រោមមុំ $"+C[0]+"$ ។ គណនាកម្ពស់បង្គោល",[A(d+"*"+C[1],d+(C[2]==="1"?"":C[2]),"num","h =")],"$h="+d+"\\tan "+C[0]+"$",GFR({names:"TBA",w:d,h:d*({"30°":0.5774,"45°":1,"60°":1.732})[C[0]],base:d+" m",height:"h",ang:{at:"base",lab:C[0]}}))},
  2:function(){var h=ri(3,12),C=pick([["30°",2,"2"],["45°","sqrt(2)","\\sqrt2"],["60°","2/sqrt(3)","\\frac{2}{\\sqrt3}"]]);
    return Q("ជណ្ដើរមួយផ្អែកលើជញ្ជាំង បង្កើតមុំ $"+C[0]+"$ ជាមួយដី ហើយចុងជណ្ដើរនៅកម្ពស់ $"+h+"$ ម៉ែត្រ។ គណនាប្រវែងជណ្ដើរ",[A(h+"*"+C[1],null,"num","L =")],"$L=\\frac{h}{\\sin "+C[0]+"}$",GFR({names:"",w:h/Math.tan(parseInt(C[0])*DG),h:h,height:h+" m",hyp:"L",ang:{at:"base",lab:C[0]}}))},
  3:function(){var a=ri(3,9),b=ri(3,9),C=pick([[60,"1/2",.5],[120,"-1/2",-.5],[90,"0",0]]),c2=a*a+b*b-2*a*b*C[2];
    return Q("ត្រីកោណ $ABC$ មាន $b="+a+"$ , $c="+b+"$ និងមុំ $A="+C[0]+"^\\circ$ ។ គណនា $a^2$ (ច្បាប់កូស៊ីនុស)",[A(Math.round(c2),null,"num","a² =")],"$a^2=b^2+c^2-2bc\\cos A="+(a*a)+"+"+(b*b)+"-2\\cdot"+a+"\\cdot"+b+"\\cdot("+C[1]+")="+Math.round(c2)+"$",(function(){var a2=Math.sqrt(c2),Bn=cosAng(a,b,a2);return GFT({ang:[C[0],Bn,180-C[0]-Bn],lab:{A:C[0]+"°",b:String(a),c:String(b),a:"a"}})})())}};
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
G[94]={1:function(){var P=[nz(-4,4),ri(-4,4)],r=ri(1,3),d=P[0]*P[0]+P[1]*P[1];
    return Q("ការបំប្លែងចាំងផ្ចិត $O$ កាំ $r="+r+"$ បំប្លែងចំណុច $A"+pt(P)+"$ ទៅ $A'$ ដែល $O,A,A'$ ត្រង់គ្នា និង $OA\\cdot OA'=r^2$ ។ គណនា $OA\\cdot OA'$",[A(r*r,null,"num","OA·OA' =")],"តាមនិយមន័យ $OA\\cdot OA'=r^2="+(r*r)+"$")},
  2:function(){var P=[nz(-4,4),ri(-4,4)],d=P[0]*P[0]+P[1]*P[1];
    return Q("ការបំប្លែងចាំងផ្ចិត $O$ កាំ $r=1$ បំប្លែង $A"+pt(P)+"$ ទៅ $A'(x';y')$ ដែល $\\overrightarrow{OA'}=\\dfrac{r^2}{OA^2}\\overrightarrow{OA}$ ។ រក $x'$ និង $y'$",[A(P[0]/d,null,"num","x' ="),A(P[1]/d,null,"num","y' =")],"$OA^2="+d+"$ ⇒ $A'\\left(\\dfrac{"+P[0]+"}{"+d+"};\\dfrac{"+P[1]+"}{"+d+"}\\right)$")},
  3:function(){var r=ri(1,4),k=pick([2,3,4]);
    return Q("ការបំប្លែងចាំងផ្ចិត $O$ កាំ $r="+r+"$ ។ បើ $OA="+k+"r$ តើ $OA'$ ស្មើប៉ុន្មាន? (សរសេរជាចំនួន)",[A(r/k,null,"num","OA' =")],"$OA'=\\dfrac{r^2}{OA}=\\dfrac{r^2}{"+k+"r}=\\dfrac{r}{"+k+"}="+(r/k)+"$")}};

/* ===================== 🌍 កម្រិតទី ៤ · PISA ថ្នាក់ទី១០ (បញ្ហាជីវិតពិត) ===================== */
function money(v){return String(v).replace(/\B(?=(\d{3})+(?!\d))/g,"\\,")}
function r2(v){return Math.round(v*100)/100}
function sum(a){return a.reduce(function(x,y){return x+y},0)}
var P4={};
P4[11]=[function(){var L=ri(20,40),W=ri(15,L-2),x=ri(2,Math.floor(W/2)-1),V=x*(L-2*x)*(W-2*x);
    return K("g10pp_box","📦 ក្រដាសកាតុង $"+L+"\\times"+W+"$ cm កាត់ការ៉េជ្រុង $x$ ចេញពីជ្រុងទាំង ៤ ហើយបត់ជាប្រអប់។ មាឌ $V(x)=x("+L+"-2x)("+W+"-2x)$ ។ គណនា $V("+x+")$ ($\\text{cm}^3$)",
      [A(V,null,"num","V =")],"$"+x+"\\times"+(L-2*x)+"\\times"+(W-2*x)+"="+V+"$")},
  function(){var b=ri(10,30),c=ri(20,100),x=ri(2,b-2),P=-x*x+b*x-c;
    return K("g10pp_profit","🥭 អ្នកលក់ស្វាយ គណនាប្រាក់ចំណេញ (ពាន់រៀល) $P(x)=-x^2+"+b+"x-"+c+"$ ពេលលក់ $x$ គីឡូ។ គណនា $P("+x+")$ ។ (បើអវិជ្ជមាន = ខាត)",
      [A(P,null,"num","P =")],"$-"+(x*x)+"+"+(b*x)+"-"+c+"="+P+"$")}];
P4[12]=[function(){var m=ri(1,6),n=ri(1,8),k=ri(2,9);
    return K("g10dp_land","🟩 ដីរាងចតុកោណកែង មានផ្ទៃក្រឡា $x^2"+co(m+n,"x")+sg(m*n,0)+"$ ($\\text{m}^2$) និងទទឹង $x+"+m+"$ m ។ ចែកពហុធា បានបណ្ដោយ $x+n$ m ។ រក $n$ ហើយគណនាបណ្ដោយពេល $x="+k+"$ (m)",
      [A(n,null,"num","n ="),A(k+n,null,"num","បណ្ដោយ =")],"$(x^2"+co(m+n,"x")+sg(m*n,0)+")\\div(x+"+m+")=x+"+n+"$ ⇒ $"+k+"+"+n+"="+(k+n)+"$")},
  function(){var a=ri(2,6),c=[1,ri(-3,5),ri(0,8)],r=(c[0]*a+c[1])*a+c[2];
    return K("g10dp_candy","🍬 ចំនួនស្ករគ្រាប់ $P(x)=x^2"+co(c[1],"x")+(c[2]?"+"+c[2]:"")+"$ ត្រូវចែកជាកញ្ចប់ៗ កញ្ចប់មួយមាន $x-"+a+"$ គ្រាប់។ រកចំនួនស្ករដែលនៅសល់ (សំណល់នៃ $P(x)\\div(x-"+a+")$)",
      [A(r,null,"num","សំណល់ =")],"ទ្រឹស្ដីបទសំណល់៖ $R=P("+a+")="+r+"$")},
  function(){var a=ri(1,6),b=ri(1,8),w=ri(2,9);
    return K("g10dp_box","📦 ប្រអប់មួយមានមាឌ $V=W^3+"+(a+b)+"W^2+"+(a*b)+"W$ (m$^3$) និងផ្ទៃបាត $W(W+"+a+")$ (m$^2$) ។ កម្ពស់ $h=V\\div\\big(W(W+"+a+")\\big)=W+b$ ។ រក $b$ ហើយគណនាកម្ពស់ពេល $W="+w+"$ (m)",
      [A(b,null,"num","b ="),A(w+b,null,"num","h =")],"$V=W(W+"+a+")(W+"+b+")$ ⇒ $h=W+"+b+"$ ⇒ $"+w+"+"+b+"="+(w+b)+"$")},
  function(){var t=shf([1,2,3,4,5,6,7,8,9]),p=t[0],q=t[1],r=t[2],w=ri(2,9);
    return K("g10dp_gcd","📏 ក្រុមការងារមានខ្សែពីរ ប្រវែង $"+polyT([1,p+q,p*q])+"$ m និង $"+polyT([1,p+r,p*r])+"$ m ។ ពួកគេកាត់ជាបំណែកប្រវែងស្មើគ្នាធំបំផុតជាកន្សោម $x+m$ ។ រក $m$ ហើយគណនាចំនួនបំណែកនៃខ្សែទី ១ ពេល $x="+w+"$",
      [A(p,null,"num","m ="),A(w+q,null,"num","ចំនួនបំណែក =")],"ដាក់កត្តា ⇒ $(x+"+p+")(x+"+q+")$ និង $(x+"+p+")(x+"+r+")$ ⇒ GCD $=x+"+p+"$ ⇒ ខ្សែទី ១ មាន $x+"+q+"="+(w+q)+"$ បំណែក")},
  function(){var a=ri(1,9);
    return K("g10dp_rate","🚰 ម៉ាស៊ីនបូម A បំពេញអាងមួយពេញក្នុង $x$ ម៉ោង ហើយម៉ាស៊ីនបូម B ក្នុង $(x+"+a+")$ ម៉ោង ។ អត្រាបំពេញរួមក្នុង ១ ម៉ោងគឺ $\\dfrac{1}{x}+\\dfrac{1}{x+"+a+"}=\\dfrac{mx+n}{x(x+"+a+")}$ ។ រក $m$ , $n$",
      [A(2,null,"num","m ="),A(a,null,"num","n =")],"$\\dfrac{(x+"+a+")+x}{x(x+"+a+")}=\\dfrac{2x+"+a+"}{x(x+"+a+")}$")}];
P4[21]=[function(){var a=ri(12,25),g=Math.random()<.5,v=a>=18||g;
    return K("g10lp_cinema","🎬 ច្បាប់រោងកុន៖ «ចូលមើលបាន <b>បើ</b> អាយុ $\\ge18$ ឆ្នាំ <b>ឬ</b> មានអាណាព្យាបាលមកជាមួយ»។ សុខាអាយុ $"+a+"$ ឆ្នាំ ហើយ"+(g?"មាន":"គ្មាន")+"អាណាព្យាបាល។ តើសុខាចូលបានទេ? ($1$ = បាន · $0$ = មិនបាន)",
      [A(v?1:0,null,"num","=")],"$p\\lor q$ ៖ $p$ "+(a>=18?"ពិត":"មិនពិត")+" · $q$ "+(g?"ពិត":"មិនពិត")+" ⇒ "+(v?"ពិត":"មិនពិត"))},
  function(){var s=ri(60,100),b=ri(0,8),v=s>=80&&b<=3;
    return K("g10lp_scholar","🎓 អាហារូបករណ៍៖ «ទទួលបាន <b>បើ</b> ពិន្ទុ $\\ge80$ <b>និង</b> អវត្តមាន $\\le3$ ដង»។ ដារ៉ាបានពិន្ទុ $"+s+"$ អវត្តមាន $"+b+"$ ដង។ តើដារ៉ាទទួលបានទេ? ($1$/$0$)",
      [A(v?1:0,null,"num","=")],"$p\\land q$ ៖ $p$ "+(s>=80?"ពិត":"មិនពិត")+" · $q$ "+(b<=3?"ពិត":"មិនពិត")+" ⇒ "+(v?"ពិត":"មិនពិត"))},
  function(){var p=Math.random()<.5,q=Math.random()<.5,v=!(p||q);
    return K("g10lp_dm","🏪 ហាងមួយ «<b>បិទ</b> បើជាថ្ងៃអាទិត្យ <b>ឬ</b> ថ្ងៃបុណ្យ» ហើយបើកក្នុងករណីផ្សេង (ដឺម៉ហ្គង់ ៖ $\\overline{p\\vee q}=\\overline{p}\\wedge\\overline{q}$) ។ ថ្ងៃនេះ ៖ ថ្ងៃអាទិត្យ "+(p?"ពិត":"មិនពិត")+" · ថ្ងៃបុណ្យ "+(q?"ពិត":"មិនពិត")+" ។ តើហាងបើកទេ? ($1$ = បើក · $0$ = បិទ)",
      [A(v?1:0,null,"num","=")],"$\\overline{p\\vee q}=\\overline{p}\\wedge\\overline{q}$ ⇒ "+(v?"ពិត (បើក)":"មិនពិត (បិទ)"))},
  function(){var cs=Math.random()<.5;
    return K("g10lp_rule","🔋 ច្បាប់ ៖ «បើទូរស័ព្ទសាកពេញ នោះភ្លើងពណ៌បៃតង» ($p\\Rightarrow q$) ។ ឃើញថា "+(cs?"ភ្លើង <b>មិន</b>ពណ៌បៃតង ($\\overline{q}$ ពិត)។ តើអាចសន្និដ្ឋានបានថា ទូរស័ព្ទ <b>មិន</b>ទាន់សាកពេញ ($\\overline{p}$ ពិត) ឬទេ?":"ភ្លើងពណ៌បៃតង ($q$ ពិត)។ តើអាចសន្និដ្ឋានបានថា ទូរស័ព្ទសាកពេញ ($p$ ពិត) ឬទេ?")+" ($1$ = អាច · $0$ = មិនអាច)",
      [A(cs?1:0,null,"num","=")],cs?"ផ្ទុយពីសម្មតិកម្ម $\\overline{q}\\Rightarrow\\overline{p}$ ពិត ⇒ អាចសន្និដ្ឋាន ($1$)":"សំណើច្រាស $q\\Rightarrow p$ មិនពិតជានិច្ច ⇒ មិនអាចសន្និដ្ឋាន ($0$)")},
  function(){var P=ri(40,60),L=ri(3,5),D=[],i,n=0,ex=[];for(i=0;i<6;i++){var pr=ri(20,100),lf=ri(1,8);D.push("("+pr+" , "+lf+")");if(pr>P&&lf<L){n++;ex.push("("+pr+" , "+lf+")")}}
    return K("g10lp_cex","🛒 ហាងអះអាងថា «ផលិតផលណាតម្លៃលើស $"+P+"$ ដុល្លារ នោះមានអាយុកាល $\\ge"+L+"$ ឆ្នាំ» ។ ទិន្នន័យ (តម្លៃ , អាយុកាល) ៖ "+D.join(" ")+" ។ រាប់ចំនួនឧទាហរណ៍ផ្ទុយ (តម្លៃ $>"+P+"$ ប៉ុន្តែអាយុកាល $<"+L+"$)",
      [A(n,null,"num","ចំនួន =")],n?"ឧទាហរណ៍ផ្ទុយ ៖ "+ex.join(" ")+" ⇒ $"+n+"$":"គ្មានឧទាហរណ៍ផ្ទុយ ⇒ $0$")}];
P4[22]=[function(){var E=ri(15,30),F=ri(8,20),U=E+F-ri(2,Math.min(E,F)-1);
    return K("g10sp_lang","🗣️ ក្នុងថ្នាក់មួយ សិស្សរៀនអង់គ្លេស $"+E+"$ នាក់ រៀនបារាំង $"+F+"$ នាក់ ហើយសិស្សដែលរៀនយ៉ាងហោចណាស់មួយភាសា មាន $"+U+"$ នាក់។ តើមានសិស្សប៉ុន្មាននាក់ រៀនទាំងពីរភាសា?",
      [A(E+F-U,null,"num","n(E∩F) =")],"$n(E\\cap F)=n(E)+n(F)-n(E\\cup F)="+E+"+"+F+"-"+U+"="+(E+F-U)+"$",GFV({k:2,names:["E","F"],lab:{a:"?",ab:"?",b:"?"},cap:["n(E) = "+E+" · n(F) = "+F,"n(E ∪ F) = "+U],shade:["ab"]}))},
  function(){var T=ri(35,50),A0=ri(15,30),B0=ri(10,25),I=ri(2,Math.min(A0,B0)-2),N=T-(A0+B0-I);while(N<0){T++;N=T-(A0+B0-I)}
    return K("g10sp_survey","📱 ស្ទង់មតិសិស្ស $"+T+"$ នាក់៖ $"+A0+"$ នាក់ប្រើ Facebook · $"+B0+"$ នាក់ប្រើ Telegram · $"+I+"$ នាក់ប្រើទាំងពីរ។ (ក) ប្រើយ៉ាងហោចណាស់មួយ? (ខ) មិនប្រើទាំងពីរ?",
      [A(A0+B0-I,null,"num","(ក) ="),A(N,null,"num","(ខ) =")],"$n(A\\cup B)="+A0+"+"+B0+"-"+I+"="+(A0+B0-I)+"$ · $"+T+"-"+(A0+B0-I)+"="+N+"$",GFV({k:2,names:["F","T"],lab:{a:"?",ab:String(I),b:"?",out:"?"},cap:["n(U) = "+T,"n(F) = "+A0+" · n(T) = "+B0]}))}];
P4[23]=[function(){var a=ri(20,60);
    return Q("🧱 ការ៉ូរាងការ៉េជ្រុង $"+a+"$ cm ។ គេចង់កាត់តាមអង្កត់ទ្រូង។ តើអង្កត់ទ្រូងវែងប៉ុន្មាន cm? (សរសេរជា $a\\sqrt b$ ឬទសភាគ)",
      [A(a+"*sqrt(2)",a+"\\sqrt2","num","d =")],"$d=\\sqrt{"+a+"^2+"+a+"^2}="+a+"\\sqrt2\\approx"+r2(a*Math.SQRT2)+"$ cm")},
  function(){var s0=pick([21,14.8,29.7]);
    return Q("📄 ក្រដាស A4 មានរាងចតុកោណកែង ដែលបណ្ដោយ $=\\sqrt2\\times$ ទទឹង។ បើទទឹង $"+s0+"$ cm តើបណ្ដោយប៉ុន្មាន cm? (បង្គត់ ១ ខ្ទង់ក្បៀសបាន)",
      [A(s0+"*sqrt(2)",s0+"\\sqrt2","num","cm =")],"$"+s0+"\\sqrt2\\approx"+(Math.round(s0*Math.SQRT2*10)/10)+"$ cm")}];
P4[31]=[function(){var v=ri(2,6)*5;
    return K("g10qp_kick","⚽ បាល់ត្រូវបានទាត់ឡើង កម្ពស់ $h(t)=-5t^2+"+v+"t$ (m)។ ក្រោយប៉ុន្មានវិនាទី បាល់ធ្លាក់ដល់ដីវិញ ($h=0$ · $t>0$)?",
      [A(v/5,null,"num","t =")],"$-5t^2+"+v+"t=0\\iff t(-5t+"+v+")=0\\Rightarrow t="+(v/5)+"$ s","y=-5x^2+"+v+"x [0,"+(v/5)+"]")},
  function(){var a=ri(3,15),b=ri(a+1,25),P=2*(a+b),S=a*b;
    return K("g10qp_field","🌾 ដីស្រែរាងចតុកោណកែង មានបរិមាត្រ $"+P+"$ m និងផ្ទៃក្រឡា $"+S+"\\text{ m}^2$ ។ ទទឹង និងបណ្ដោយជាឫសនៃ $x^2-"+(P/2)+"x+"+S+"=0$ ។ រកទទឹង (តូច) និងបណ្ដោយ (ធំ)",
      [A(a,null,"num","ទទឹង ="),A(b,null,"num","បណ្ដោយ =")],"$\\Delta="+((P/2)*(P/2)-4*S)+"$ ⇒ $x="+a+"$ ឬ $x="+b+"$")}];
P4[32]=[function(){var v=ri(2,8)*1;
    return K("g10hp_wave","🌊 ល្បឿនរលកទឹកក្នុងទឹករាក់ $v=\\sqrt{10d}$ (m/s · $d$ = ជម្រៅ m)។ បើរលកមានល្បឿន $"+v+"$ m/s តើទឹកជម្រៅប៉ុន្មានម៉ែត្រ?",
      [A(v*v/10,null,"num","d =")],"$\\sqrt{10d}="+v+"\\Rightarrow10d="+(v*v)+"\\Rightarrow d="+(v*v/10)+"$ m")},
  function(){var t=ri(1,6),h=5*t*t;
    return K("g10hp_fall","🪂 ថ្មមួយធ្លាក់ពីកំពូលអគារកម្ពស់ $"+h+"$ m ។ ចម្ងាយធ្លាក់ $h=5t^2$ ⇒ $t=\\sqrt{\\dfrac h5}$ ។ តើថ្មធ្លាក់ដល់ដីក្រោយប៉ុន្មានវិនាទី?",
      [A(t,null,"num","t =")],"$t=\\sqrt{\\dfrac{"+h+"}{5}}=\\sqrt{"+(t*t)+"}="+t+"$ s")}];
P4[33]=[function(){var x=ri(5,20),y=ri(5,20);
    return K("g10sysp_hotel","🏨 សណ្ឋាគារមួយមានបន្ទប់ ២ គ្រែ និង ៣ គ្រែ សរុប $"+(x+y)+"$ បន្ទប់ និងគ្រែសរុប $"+(2*x+3*y)+"$ ។ តើមានបន្ទប់ ២ គ្រែ និង ៣ គ្រែ ប៉ុន្មាន?",
      [A(x,null,"num","២ គ្រែ ="),A(y,null,"num","៣ គ្រែ =")],"$\\begin{cases}x+y="+(x+y)+"\\\\2x+3y="+(2*x+3*y)+"\\end{cases}$ ⇒ $y="+y+"$ , $x="+x+"$")},
  function(){var x=ri(5,30),y=ri(5,30);
    return K("g10sysp_cash","💵 កាបូបមួយមានក្រដាសប្រាក់ $5\\,000$ រៀល និង $10\\,000$ រៀល សរុប $"+(x+y)+"$ សន្លឹក តម្លៃ $"+money(5000*x+10000*y)+"$ រៀល។ តើមានក្រដាសប្រាក់នីមួយៗប៉ុន្មានសន្លឹក?",
      [A(x,null,"num","៥០០០ ="),A(y,null,"num","១០០០០ =")],"$\\begin{cases}x+y="+(x+y)+"\\\\5000x+10000y="+(5000*x+10000*y)+"\\end{cases}$")}];
P4[34]=[function(){var r1=ri(2,8),r2v=r1+ri(3,10);
    return K("g10ip_profit","💰 ប្រាក់ចំណេញ (លានរៀល) ពេលផលិត $x$ រយគ្រឿង៖ $P(x)=-x^2+"+(r1+r2v)+"x-"+(r1*r2v)+"$ ។ ចំណេញ ($P>0$) ពេល $a<x<b$ ។ រក $a$ និង $b$",
      [A(r1,null,"num","a ="),A(r2v,null,"num","b =")],"ឫស $x="+r1+"$ , $x="+r2v+"$ · $a<0$ ⇒ $P>0$ រវាងឫស","y=-x^2+"+(r1+r2v)+"x-"+(r1*r2v))},
  function(){
    return K("g10ip_temp","💉 វ៉ាក់សាំងត្រូវរក្សាទុកក្នុងសីតុណ្ហភាព $2\\le C\\le8$ ($^\\circ$C)។ ទូទឹកកកបង្ហាញជា $^\\circ$F ដែល $C=\\dfrac{5}{9}(F-32)$ ។ រកចន្លោះ $a\\le F\\le b$",
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
      [A(t.s,t.t,"num","(ក) tan ="),A(h/d<=1/12+1e-9?1:0,null,"num","(ខ) =")],"$\\tan\\alpha=\\dfrac{"+h+"}{"+d+"}="+t.t+"$ "+(h/d<=1/12+1e-9?"\\le":">")+"\\frac1{12}",GFR({names:"",w:d,h:h,base:d+" cm",height:h+" cm",ang:{at:"base",lab:"α"}}))},
  function(){var T=pick(TR),t=fr(T[1],T[0]);
    return Q("☀️ បង្គោលកម្ពស់ $"+T[1]+"$ m មានស្រមោលវែង $"+T[0]+"$ m ។ មុំ $\\alpha$ រវាងកាំរស្មីព្រះអាទិត្យ និងដី មាន $\\tan\\alpha$ ប៉ុន្មាន? ហើយ $\\sin\\alpha$?",
      [A(t.s,t.t,"num","tan ="),A(fr(T[1],T[2]).s,fr(T[1],T[2]).t,"num","sin =")],"$\\tan\\alpha=\\frac{"+T[1]+"}{"+T[0]+"}$ · កាំរស្មី $="+T[2]+"$ ⇒ $\\sin\\alpha=\\frac{"+T[1]+"}{"+T[2]+"}$",GFR({names:"",w:T[0],h:T[1],base:T[0]+" m",height:T[1]+" m",ang:{at:"base",lab:"α"}}))}];
P4[52]=[function(){var d=ri(2,10)*10,C=pick([["45°","1","1"],["60°","sqrt(3)","\\sqrt3"],["30°","sqrt(3)/3","\\frac{\\sqrt3}{3}"]]);
    return Q("🏞️ ដើម្បីវាស់ទទឹងទន្លេ សិស្សឈរត្រង់ $A$ ទល់មុខដើមឈើ $T$ ត្រើយម្ខាង រួចដើរតាមមាត់ទន្លេ $"+d+"$ m ដល់ $B$ ហើយវាស់បាន $\\widehat{ABT}="+C[0]+"$ ($TA\\perp AB$)។ ទទឹងទន្លេ $AT$ ប៉ុន្មាន m? (សរសេរ $\\sqrt{\\ }$ បាន)",
      [A(d+"*"+C[1],(C[1]==="1"?d:d+C[2]),"num","AT =")],"$AT="+d+"\\tan"+C[0]+"$",GFR({names:"TAB",w:d,h:d*({"45°":1,"60°":1.732,"30°":0.577})[C[0]],base:d+" m",height:"AT",ang:{at:"base",lab:C[0]}}))},
  function(){var a=ri(3,10),b=ri(3,10),c2=a*a+b*b-a*b,r=Math.round(Math.sqrt(c2));
    return Q("⛵ ទូកពីរចេញពីកំពង់ផែ ក្នុងទិសដៅបង្កើតមុំ $60^\\circ$ ។ ក្រោយមួយម៉ោង ទូកទី១ ឆ្ងាយ $"+a+"$ km ទូកទី២ ឆ្ងាយ $"+b+"$ km ។ ទូកទាំងពីរឃ្លាតគ្នាប៉ុន្មាន km? (សរសេរ $\\sqrt{\\ }$ បាន)",
      [A(r*r===c2?r:"sqrt("+c2+")",r*r===c2?String(r):"\\sqrt{"+c2+"}","num","km =")],"ច្បាប់កូស៊ីនុស៖ $d^2="+a+"^2+"+b+"^2-2\\cdot"+a+"\\cdot"+b+"\\cos60^\\circ="+c2+"$",(function(){var a2=Math.sqrt(c2),Bn=cosAng(b,a,a2);return GFT({ang:[60,Bn,180-60-Bn],lab:{A:"60°",c:a+" km",b:b+" km",a:"?"}})})())}];
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
P4[94]=[function(){var r=ri(2,9),D=[],i;for(i=1;i<=r*r;i++)if(r*r%i===0)D.push(i);var a=pick(D),b=r*r/a;
    return K("p94_1","🔧 ស្ពាន់ភ្ជាប់ផ្លាស់ទីបន្ទាត់ត្រង់ (យន្តការ Peaucellier) ៖ ចំណុច $A$ ចម្ងាយ $OA="+a+"$ dm ពីអ័ក្ស $O$ ហើយចំណុចរូបភាព $A'$ នៅលើកន្លះបន្ទាត់ $OA$ ដែល $OA\\cdot OA'=r^2$ ។ បើ $r="+r+"$ dm រក $OA'$ (dm)",
      [A(b,null,"num","OA' =")],"$OA'=\\dfrac{r^2}{OA}=\\dfrac{"+(r*r)+"}{"+a+"}="+b+"$")},
  function(){var r=ri(2,9),D=[],i;for(i=1;i<=r*r;i++)if(r*r%i===0)D.push(i);var a=pick(D),b=r*r/a;
    return K("p94_2","🔦 ចង្កៀងនៅ $O$ ហើយកញ្ចក់ចាំងមានកាំ $r$ ៖ ចំណុច $A$ និងរូបភាព $A'$ នៅលើកន្លះបន្ទាត់ដូចគ្នា ដោយ $OA\\cdot OA'=r^2$ ។ គេដឹង $OA="+a+"$ cm និង $OA'="+b+"$ cm ។ រកកាំ $r$ (cm)",
      [A(r,null,"num","r =")],"$r^2=OA\\cdot OA'="+a+"\\cdot"+b+"="+(r*r)+"$ ⇒ $r="+r+"$")},
  function(){var s=ri(1,2),j=ri(2,3),P=[3*s,4*s],R=5*s*j,k=j*j;
    return K("p94_3","🗺️ ផែនទីប៉ម $O$ ជាផ្ចិត (km)៖ ភូមិ $A"+pt(P)+"$ ។ ការបំប្លែងចាំងកាំ $r="+R+"$ km ផ្ដល់ $A'$ ដែល $\\overrightarrow{OA'}=\\dfrac{r^2}{OA^2}\\overrightarrow{OA}$ ។ រកកូអរដោណេ $A'$",
      [A(P[0]*k,null,"num","x' ="),A(P[1]*k,null,"num","y' =")],"$OA^2="+(25*s*s)+"$ ⇒ $\\dfrac{r^2}{OA^2}="+k+"$ ⇒ $A'"+pt([P[0]*k,P[1]*k])+"$","A"+pt(P).replace(";",",")+"\nA'"+pt([P[0]*k,P[1]*k]).replace(";",",")+"\nvec O A gray")},
  function(){var r=ri(3,9),D=[],i;for(i=1;i<=r*r;i++)if(r*r%i===0)D.push(i);var a=pick(D),b=pick(D);while(b===a)b=pick(D);var v=Math.abs(r*r/a-r*r/b);
    return K("p94_4","📡 សញ្ញាវិទ្យុពីប៉ម $O$ ៖ ចំណុច $A$, $B$ នៅលើកន្លះបន្ទាត់ដូចគ្នា $OA="+a+"$, $OB="+b+"$ (km) ។ ការបំប្លែងចាំងកាំ $r="+r+"$ km ផ្ដល់ $A'$, $B'$ ដូចគ្នាលើកន្លះបន្ទាត់នោះ។ គណនា $A'B'$ (km)",
      [A(v,null,"num","A'B' =")],"$OA'="+(r*r/a)+"$ , $OB'="+(r*r/b)+"$ ⇒ $A'B'=|"+(r*r/a)+"-"+(r*r/b)+"|="+v+"$")},
  function(){var r=ri(2,9),D=[],i;for(i=1;i<=r*r;i++)if(r*r%i===0&&i!==r)D.push(i);var a=pick(D),b=r*r/a;
    return K("p94_5","🛰️ ផ្កាយរណបគោចរលើរង្វង់កាំ $r="+r+"$ (ផ្ចិត $O$ ជាផែនដី · ១០០ km)។ គេទស្សន៍ទាយទីតាំងតាមការបំប្លែងចាំងកាំ $r$ ។ ចំណុចពីរ $A$ (ក្នុងរង្វង់) និង $A'$ (ក្រៅរង្វង់) ត្រង់គ្នាជាមួយ $O$ ដោយ $OA="+Math.min(a,b)+"$ ។ រក $OA'$",
      [A(Math.max(a,b),null,"num","OA' =")],"$OA'=\\dfrac{"+(r*r)+"}{"+Math.min(a,b)+"}="+Math.max(a,b)+"$")}];
Object.keys(P4).forEach(function(l){var L=P4[l];if(G[l])G[l][4]=function(){return pick(L)()}});


/* ===== ពិពិធកម្មទម្រង់លំហាត់ (២០២៦-១១) — មេរៀន×កម្រិតនីមួយៗ ≥ ៤ ទម្រង់ · គណនាផ្ទាល់ · រកអញ្ញាត · បញ្ហាជីវិតពិត · ត្រិះរិះ =====
   ជ្រើសចម្លើយមុន រួចបង្កើតទិន្នន័យ · kd = s10_… · vx(l,lv,[…]) → ទម្រង់ថ្មីនីមួយៗមានឱកាសស្មើទម្រង់ដើម · តក្កវិទ្យា ៖ 1 = ពិត · 0 = មិនពិត */
function K(kd,q,a,s,f){var o=Q(q,a,s,f);o.kd=kd;return o}
var VXF={};   /* មេរៀន ២.៣ មានទម្រង់ច្រើន ⇒ បញ្ចូលក្នុងបញ្ជីតែមួយ (ឱកាសស្មើគ្នា) ជំនួសឱ្យការរុំជាន់ៗ ដែលធ្វើឱ្យទម្រង់ចាស់កម្រលេចមុខ */
function vx(l,lv,L){if(!G[l])G[l]={};
  if(l===23){var key=lv;if(!VXF[key]){VXF[key]={L:[]};G[l][lv]=function(){var S=VXF[key];return S.L[Math.floor(Math.random()*S.L.length)]()}}VXF[key].L=VXF[key].L.concat(L);return}
  if(!G[l][lv])G[l][lv]=function(){};var o=G[l][lv];G[l][lv]=function(){var i=Math.floor(Math.random()*(L.length+1));return i<L.length?L[i]():o()}}
function ang(v){return v+"^\\circ"}
function mo(v){return String(v).replace(/\B(?=(\d{3})+(?!\d))/g,"\\,")}
function fx(f){return f.d===1?String(f.n):(f.n<0?"-":"")+"\\dfrac{"+Math.abs(f.n)+"}{"+f.d+"}"}
function tv(b){return b?"ពិត":"មិនពិត"}
function isPr(n){if(n<2)return false;for(var d=2;d*d<=n;d++)if(n%d===0)return false;return true}
function tb2(xs,fs){return"\\begin{array}{|c|"+xs.map(function(){return"c|"}).join("")+"}\\hline x&"+xs.join("&")+"\\\\\\hline f&"+fs.join("&")+"\\\\\\hline\\end{array}"}
function fsum(n,N){var f;do{f=[];var r=N;for(var i=0;i<n-1;i++){var v=ri(1,Math.max(1,Math.floor(r/(n-i))*2-1));f.push(v);r-=v}f.push(r)}while(f.some(function(v){return v<1}));return f}
function rt(k,c){return c===0?["0","0"]:[c+"*sqrt("+k+")",(c===1?"":c===-1?"-":c)+"\\sqrt{"+k+"}"]}   /* c√k */
var NS=[2,3,5,6,7,10,11,13];   /* មិនមែនការ៉េប្រាកដ */
/* ១.១ ពហុធា */
vx(11,1,[
 function(){var n=ri(2,4),c=[nz(-5,5)];for(var i=0;i<n;i++)c.push(ri(-6,6));return K("s10_deg","គេឱ្យ $P(x)="+polyT(c)+"$ ។ រកដឺក្រេ និងមេគុណនាំមុខនៃ $P(x)$",[A(n,null,"num","ដឺក្រេ ="),A(c[0],null,"num","មេគុណនាំមុខ =")],"តួដឺក្រេខ្ពស់បំផុត $"+co(c[0],n>1?"x^{"+n+"}":"x",true)+"$")},
 function(){var p=[nz(-4,4),ri(-6,6),ri(-6,6)],q=[ri(-4,4),ri(-6,6),ri(-6,6)];while(p[0]+q[0]===0)q[0]++;var e=[p[0]+q[0],p[1]+q[1],p[2]+q[2]];return K("s10_add","$P(x)="+polyT(p)+"$ , $Q(x)="+polyT(q)+"$ ។ គណនា $P(x)+Q(x)$"+cfAsk(e),cfAns(e),"បូកតួដូចគ្នា ⇒ $"+polyT(e)+"$")},
 function(){var p=[nz(-4,4),ri(-6,6),ri(-6,6)],q=[ri(-4,4),ri(-6,6),ri(-6,6)];while(p[0]-q[0]===0)q[0]++;var e=[p[0]-q[0],p[1]-q[1],p[2]-q[2]];return K("s10_sub_11","$P(x)="+polyT(p)+"$ , $Q(x)="+polyT(q)+"$ ។ គណនា $P(x)-Q(x)$"+cfAsk(e),cfAns(e),"ដក ⇒ ប្ដូរសញ្ញាតួនៃ $Q$ ⇒ $"+polyT(e)+"$")}]);
vx(11,2,[
 function(){var a=nz(1,4),b=nz(-6,6),e=[a*a,2*a*b,b*b];return K("s10_sq","ពន្លាត $("+poly([a,b])+")^2$"+cfAsk(e),cfAns(e),"$(A+B)^2=A^2+2AB+B^2$ ⇒ $"+polyT(e)+"$")},
 function(){var a=nz(1,4),b=nz(1,9),e=[a*a,0,-b*b];return K("s10_diff_11","ពន្លាត $("+poly([a,b])+")("+poly([a,-b])+")$"+cfAsk(e),cfAns(e),"$(A+B)(A-B)=A^2-B^2$ ⇒ $"+polyT(e)+"$")},
 function(){var a=nz(-6,6),b=nz(-6,6);if(a>b){var t=a;a=b;b=t}return K("s10_id","រក $a\\le b$ ដែល $(x+a)(x+b)=x^2"+co(a+b,"x")+sg(a*b,0)+"$ គ្រប់ $x$",[A(a,null,"num","a ="),A(b,null,"num","b =")],"$a+b="+(a+b)+"$ , $ab="+(a*b)+"$ ⇒ $a="+a+"$ , $b="+b+"$")}]);
vx(11,3,[
 function(){var a=nz(-3,3),e=[1,3*a,3*a*a,a*a*a];return K("s10_cube_11","ពន្លាត $(x"+sg(a,0)+")^3$"+cfAsk(e),cfAns(e),"$(x+a)^3=x^3+3ax^2+3a^2x+a^3$ ⇒ $"+polyT(e)+"$")},
 function(){var a=nz(-6,6),b=nz(-9,9);return K("s10_ident","រក $m$ និង $n$ ដែល $x^2+mx+n=(x"+sg(a,0)+")^2"+sg(-b,0)+"$ គ្រប់ $x$",[A(2*a,null,"num","m ="),A(a*a-b,null,"num","n =")],"ពន្លាត ⇒ $x^2"+co(2*a,"x")+sg(a*a-b,0)+"$")},
 function(){var a=nz(-6,6),b=nz(-6,6),c=nz(-6,6),e=[a+b-2*c,a*b-c*c];if(!e[0]&&!e[1])e=[a+b-2*c,a*b-c*c];return K("s10_val3","សម្រួល $(x"+sg(a,0)+")(x"+sg(b,0)+")-(x"+sg(c,0)+")^2$"+cfAsk(e),cfAns(e),"$x^2"+co(a+b,"x")+sg(a*b,0)+"-(x^2"+co(2*c,"x")+"+"+(c*c)+")="+polyT(e)+"$")}]);
/* ១.១ ចំណុច ៣ ការដាក់ជាផលគុណកត្តា (ចម្លើយជាលេខ · រើសចម្លើយមុន) */
vx(11,1,[
 function(){var g=ri(2,6),a=ri(1,4),b=nz(-6,6);while(gcd(a,b)!==1)b=nz(-6,6);var e=[g*a,g*b,0];return K("s10_fgcd","ដាក់កត្តារួមធំបំផុតនៃ $"+polyT(e)+"$ ជាទម្រង់ $gx(ax+b)$ ដែល $g>1$ , $a>0$ ។ រក $g$ , $a$ , $b$",[A(g,null,"num","g ="),A(a,null,"num","a ="),A(b,null,"num","b =")],"កត្តារួមធំបំផុត $"+g+"x$ ⇒ $"+g+"x("+poly([a,b])+")$")}]);
vx(11,2,[
 function(){var p=nz(-9,9),q=nz(-9,9);if(p>q){var t=p;p=q;q=t}return K("s10_fq1","ដាក់ $x^2"+co(p+q,"x")+sg(p*q,0)+"$ ជាផលគុណកត្តា $(x+p)(x+q)$ ដែល $p\\le q$ ។ រក $p$ , $q$",[A(p,null,"num","p ="),A(q,null,"num","q =")],"រក $p+q="+(p+q)+"$ , $pq="+(p*q)+"$ ⇒ $p="+p+"$ , $q="+q+"$")},
 function(){var a=ri(1,5),b=ri(1,9);return K("s10_fsq","ដាក់ $"+(a*a)+"x^2-"+(b*b)+"$ ជាផលគុណកត្តា $(ax+b)(ax-b)$ ដែល $a>0$ , $b>0$ ។ រក $a$ , $b$",[A(a,null,"num","a ="),A(b,null,"num","b =")],"$A^2-B^2=(A+B)(A-B)$ ⇒ $a="+a+"$ , $b="+b+"$")}]);
vx(11,3,[
 function(){var m=ri(2,3),p=nz(-6,6),q=nz(-6,6),e=[m,m*q+p,p*q];return K("s10_fq2","ដាក់ $"+polyT(e)+"$ ជាផលគុណកត្តា $("+m+"x+p)(x+q)$ ។ រក $p$ , $q$",[A(p,null,"num","p ="),A(q,null,"num","q =")],"គុណខ្វែង ⇒ $pq="+(p*q)+"$ , $"+m+"q+p="+(m*q+p)+"$ ⇒ $p="+p+"$ , $q="+q+"$")},
 function(){var a=nz(-4,4),c=a*a*a;return K("s10_fcube","ដាក់ $x^3"+sg(c,0)+"$ ជាផលគុណកត្តា $(x+a)(x^2+mx+n)$ ។ រក $a$ , $m$ , $n$",[A(a,null,"num","a ="),A(-a,null,"num","m ="),A(a*a,null,"num","n =")],"$x^3+a^3=(x+a)(x^2-ax+a^2)$ ដែល $a^3="+c+"$ ⇒ $a="+a+"$")}]);
/* ១.១ ពហុធា (កែ ២០២៦-១១-២៦) — តាមសៀវភៅក្រសួង ៤ ចំណុច៖ ឯកធា · ពហុធា · រូបមន្តពន្លាត ៨ · ដាក់ជាផលគុណកត្តា
   kd = g10p_… (PISA = g10pp_…) · ចម្លើយ fill-in (num) ទាំងអស់ · កម្រិតបង្ហាញ ២ (គន្លឹះ 5) និង ៤ (គន្លឹះ 6) មានទម្រង់ផ្ទាល់ខ្លួន (មិនប្រើ fill56) */
function mnS(c,m,n,first){var a=Math.abs(c),s=c<0?"-":first?"":"+";return s+(a===1?"":a)+(m?"x"+(m>1?"^{"+m+"}":""):"")+(n?"y"+(n>1?"^{"+n+"}":""):"")}
function cop(a,b){return gcd(a,Math.abs(b))===1}
function pickC(a,lo,hi){var L=[];for(var v=lo;v<=hi;v++)if(v&&cop(a,v))L.push(v);return pick(L)}
function tmS(T){var s="";T.forEach(function(z,i){s+=co(z[0],z[1]>1?"x^{"+z[1]+"}":z[1]===1?"x":"",i===0)||(z[1]===0?sg(z[0],i===0):"")});return s}
var G11={
 mono1:function(){var m=ri(1,4),n=ri(1,4),c=nz(-9,9);return K("g10p_mono1","គេឱ្យឯកធា $M="+mnS(c,m,n,true)+"$ ។ រកមេគុណ និងដឺក្រេនៃ $M$ (ដឺក្រេ = ផលបូកនិទស្សន្តនៃអថេរទាំងអស់)",[A(c,null,"num","មេគុណ ="),A(m+n,null,"num","ដឺក្រេ =")],"មេគុណ $="+c+"$ · ដឺក្រេ $="+m+"+"+n+"="+(m+n)+"$")},
 msim:function(){var m=ri(1,4),n=ri(1,3);
   if(Math.random()<.5){var a=nz(-9,9),b=nz(-9,9);while(a+b===0)b=nz(-9,9);return K("g10p_msim","គណនា $"+mnS(a,m,n,true)+mnS(b,m,n,false)+"$ ហើយសរសេរជា $k"+mnS(1,m,n,true)+"$ ។ រក $k$",[A(a+b,null,"num","k =")],"ឯកធាដូចគ្នា ⇒ បូកមេគុណ $"+a+"+"+sgp(b)+"="+(a+b)+"$")}
   var k=ri(0,5),a2=nz(-5,5),b2=nz(-5,5);return K("g10p_msim","ឯកធា $"+a2+"x^{k+"+(m+1)+"}y^{"+n+"}$ និង $"+b2+"x^{"+(k+m+1)+"}y^{"+n+"}$ ជាឯកធាដូចគ្នា ។ រក $k$",[A(k,null,"num","k =")],"និទស្សន្ត $x$ ត្រូវស្មើគ្នា ⇒ $k+"+(m+1)+"="+(k+m+1)+"$ ⇒ $k="+k+"$")},
 mmul:function(){var a=nz(-5,5),b=nz(-5,5),p=ri(1,3),q=ri(1,3),r=ri(1,3),s=ri(1,3);
   return K("g10p_mmul","គណនា $("+mnS(a,p,q,true)+")("+mnS(b,r,s,true)+")$ ហើយសរសេរជា $cx^uy^v$ ។ រក $c$ , $u$ , $v$",[A(a*b,null,"num","c ="),A(p+r,null,"num","u ="),A(q+s,null,"num","v =")],"គុណមេគុណ $"+a+"\\times("+b+")="+(a*b)+"$ · បូកនិទស្សន្ត $u="+p+"+"+r+"$ , $v="+q+"+"+s+"$")},
 mdiv:function(){var c=nz(-6,6),d=nz(-4,4),u=ri(0,3),v=ri(0,3),r=ri(1,2),s=ri(1,2);
   return K("g10p_mdiv","គណនា $\\dfrac{"+mnS(c*d,u+r,v+s,true)+"}{"+mnS(d,r,s,true)+"}$ ហើយសរសេរជា $cx^uy^v$ ។ រក $c$ , $u$ , $v$",[A(c,null,"num","c ="),A(u,null,"num","u ="),A(v,null,"num","v =")],"ចែកមេគុណ $"+(c*d)+"\\div("+d+")="+c+"$ · ដកនិទស្សន្ត $u="+(u+r)+"-"+r+"="+u+"$ , $v="+(v+s)+"-"+s+"="+v+"$")},
 pterm:function(){var t=ri(3,5),a=nz(-6,6),b=nz(-6,6),e=nz(-6,6),c=nz(-6,6),d=nz(-6,6),can=Math.random()<.5,f=can?-d:nz(-6,6);
   while(b+e===0)e=nz(-6,6);var s=tmS(shf([[a,t],[b,t-1],[c,1],[d,0],[-a,t],[e,t-1],[f,0]])),nt=can?2:3;
   return K("g10p_pterm","សម្រួល $P(x)="+s+"$ រួចរកដឺក្រេ និងចំនួនតួ (មិនសូន្យ) នៃពហុធាដែលបានសម្រួល",[A(t-1,null,"num","ដឺក្រេ ="),A(nt,null,"num","ចំនួនតួ =")],"តួដឺក្រេ $"+t+"$ លុបគ្នា ⇒ ដឺក្រេ $"+(t-1)+"$ · ចំនួនតួ $="+nt+"$")},
 pord:function(){var c=[nz(-5,5),nz(-6,6),nz(-6,6),nz(-9,9)],s=tmS(shf([[c[0],3],[c[1],2],[c[2],1],[c[3],0]]));
   return K("g10p_pord","រៀបពហុធា $P(x)="+s+"$ តាមលំដាប់ស្វ័យគុណចុះ ជាទម្រង់ $ax^3+bx^2+cx+d$ ហើយរក $a$ , $b$ , $c$ , $d$",cfAns(c),"លំដាប់ចុះ ⇒ $"+polyT(c)+"$")},
 pmul:function(){var a=nz(-3,3),b=nz(-5,5),c=nz(-3,3),d=ri(-4,4),e=nz(-5,5),r=[a*c,a*d+b*c,a*e+b*d,b*e];
   return K("g10p_pmul","គណនា $("+poly([a,b])+")("+poly([c,d,e])+")$"+cfAsk(r),cfAns(r),"គុណតួនីមួយៗ រួចបូកតួដូចគ្នា ⇒ $"+polyT(r)+"$")},
 cube2:function(){var a=ri(2,3),b=ri(1,4),r=[a*a*a,-3*a*a*b,3*a*b*b,-b*b*b];
   return K("g10p_cube2","ពន្លាត $("+poly([a,-b])+")^3$"+cfAsk(r),cfAns(r),"$(A-B)^3=A^3-3A^2B+3AB^2-B^3$ ដែល $A="+a+"x$ , $B="+b+"$ ⇒ $"+polyT(r)+"$")},
 abc2:function(){var a=nz(-6,6),b=nz(-6,6),c=nz(-6,6),S=a+b+c,T=a*b+b*c+c*a,v=a*a+b*b+c*c;
   return K("g10p_abc2","ដោយ $a+b+c="+S+"$ និង $ab+bc+ca="+T+"$ ។ គណនា $a^2+b^2+c^2$",[A(v,null,"num","=")],"$(a+b+c)^2=a^2+b^2+c^2+2(ab+bc+ca)$ ⇒ $a^2+b^2+c^2="+(S*S)+"-2("+T+")="+v+"$")},
 calc:function(){var m=ri(20,90),n=ri(5,m-3);return K("g10p_calc","គណនាដោយប្រើរូបមន្ត $(a+b)(a-b)=a^2-b^2$ ៖ $"+m+"^2-"+n+"^2$",[A(m*m-n*n,null,"num","=")],"$("+m+"+"+n+")("+m+"-"+n+")="+(m+n)+"\\times"+(m-n)+"="+(m*m-n*n)+"$")},
 cubval:function(){var a=nz(-5,5),b=nz(-5,5);while(a===b)b=nz(-5,5);
   if(Math.random()<.5){var d=a-b,p=a*b;return K("g10p_cubval","ដោយ $a-b="+d+"$ និង $ab="+p+"$ ។ គណនា $a^3-b^3$",[A(a*a*a-b*b*b,null,"num","=")],"$a^3-b^3=(a-b)^3+3ab(a-b)="+(d*d*d)+"+3\\cdot"+sgp(p)+"\\cdot"+sgp(d)+"="+(a*a*a-b*b*b)+"$")}
   var s=a+b,q=a*b;return K("g10p_cubval","ដោយ $a+b="+s+"$ និង $ab="+q+"$ ។ គណនា $a^3+b^3$",[A(a*a*a+b*b*b,null,"num","=")],"$a^3+b^3=(a+b)^3-3ab(a+b)="+(s*s*s)+"-3\\cdot"+sgp(q)+"\\cdot"+sgp(s)+"="+(a*a*a+b*b*b)+"$")},
 tri2:function(){var a=nz(-4,4),b=nz(-4,4),r=[1,2*a,a*a+2*b,2*a*b,b*b];
   return K("g10p_tri2","ពន្លាត $(x^2"+co(a,"x")+sg(b,0)+")^2$"+cfAsk(r),cfAns(r),"$(A+B+C)^2=A^2+B^2+C^2+2AB+2BC+2AC$ ⇒ $"+polyT(r)+"$")},
 fgrp:function(){var a=ri(1,3),p=nz(-6,6);
   return K("g10p_fgrp","ដាក់ $"+co(a,"x^2",true)+co(p,"x")+co(a,"xy")+co(p,"y")+"$ ជាផលគុណកត្តាតាមការផ្តុំតួ ជាទម្រង់ $(ax+p)(x+y)$ ។ រក $a$ , $p$",[A(a,null,"num","a ="),A(p,null,"num","p =")],"ផ្តុំ ⇒ $"+co(a,"x",true)+"(x+y)"+co(p,"")+"(x+y)=("+poly([a,p])+")(x+y)$")},
 faux:function(){var m=ri(1,16),n=ri(1,16);if(m>n){var t=m;m=n;n=t}
   return K("g10p_faux","ដាក់ $x^4"+co(-(m+n),"x^2")+"+"+(m*n)+"$ ជាផលគុណកត្តា $(x^2-m)(x^2-n)$ ដែល $m\\le n$ ។ រក $m$ , $n$ (តាង $t=x^2$)",[A(m,null,"num","m ="),A(n,null,"num","n =")],"តាង $t=x^2$ ⇒ $t^2-"+(m+n)+"t+"+(m*n)+"=(t-"+m+")(t-"+n+")$")},
 faux2:function(){var p=nz(-6,6),q=nz(-6,6),a,b,c;if(p>q){var t=p;p=q;q=t}
   a=p+ri(1,3);if(a===q)a++;b=p+q-a;c=a*b-p*q;
   return K("g10p_faux2","ដាក់ $(x^2+x"+sg(a,0)+")(x^2+x"+sg(b,0)+")"+sg(-c,0)+"$ ជាទម្រង់ $(x^2+x+p)(x^2+x+q)$ ដែល $p\\le q$ ។ រក $p$ , $q$ (តាង $t=x^2+x$)",[A(p,null,"num","p ="),A(q,null,"num","q =")],"តាង $t=x^2+x$ ⇒ $(t"+sg(a,0)+")(t"+sg(b,0)+")"+sg(-c,0)+"=t^2"+co(p+q,"t")+sg(p*q,0)+"=(t"+sg(p,0)+")(t"+sg(q,0)+")$")},
 f2v2:function(){var p=ri(2,3),a=nz(-4,4),b=nz(-4,4),c=nz(-4,4),d=nz(-4,4);
   return K("g10p_f2v2","ដាក់ $"+co(p,"x^2",true)+co(p*c+a,"xy")+co(a*c,"y^2")+co(p*d+b,"x")+co(a*d+b*c,"y")+sg(b*d,0)+"$ ជាទម្រង់ $("+p+"x+ay+b)(x+cy+d)$ ។ រក $a$ , $b$ , $c$ , $d$",[A(a,null,"num","a ="),A(b,null,"num","b ="),A(c,null,"num","c ="),A(d,null,"num","d =")],"ប្រៀបធៀបមេគុណ ⇒ $("+p+"x"+co(a,"y")+sg(b,0)+")(x"+co(c,"y")+sg(d,0)+")$")},
 fdc:function(){var a=ri(1,4),b=ri(1,5),m=Math.random()<.5?b:-b;
   return K("g10p_fdc","ដាក់ $"+co(a*a*a,"x^3",true)+sg(m*m*m,0)+"$ ជាផលគុណកត្តា $(ax+m)(a^2x^2+nx+m^2)$ ដែល $a>0$ ។ រក $a$ , $m$ , $n$",[A(a,null,"num","a ="),A(m,null,"num","m ="),A(-a*m,null,"num","n =")],"$A^3"+(m<0?"-":"+")+b+"^3=(A"+(m<0?"-":"+")+b+")(A^2"+(m<0?"+":"-")+b+"A+"+(b*b)+")$ ដែល $A="+co(a,"x",true)+"$ ⇒ $n="+(-a*m)+"$")},
 fq3:function(){var a=ri(1,4),c=ri(a+1,5),b=pickC(a,-6,6),d=pickC(c,-6,6),e=[a*c,a*d+b*c,b*d];
   return K("g10p_fq3","ដាក់ $"+polyT(e)+"$ ជាផលគុណកត្តា $(ax+b)(cx+d)$ ដែល $0<a<c$ ។ រក $a$ , $b$ , $c$ , $d$",[A(a,null,"num","a ="),A(b,null,"num","b ="),A(c,null,"num","c ="),A(d,null,"num","d =")],"$ac="+(a*c)+"$ , $bd="+(b*d)+"$ , $ad+bc="+(a*d+b*c)+"$ ⇒ $("+poly([a,b])+")("+poly([c,d])+")$")},
 fgcd2:function(){var m=ri(1,3),n=ri(1,3),g=ri(2,6),a=ri(1,4),b=pickC(a,-4,4);
   return K("g10p_fgcd2","រកកត្តារួមធំបំផុតនៃ $"+mnS(g*a,m+1,n,true)+mnS(g*b,m,n+1,false)+"$ ជាទម្រង់ $gx^my^n$ ដែល $g>0$ ។ រក $g$ , $m$ , $n$",[A(g,null,"num","g ="),A(m,null,"num","m ="),A(n,null,"num","n =")],"ជ.ជ.ម.នៃមេគុណ $="+g+"$ · និទស្សន្តតូចបំផុត $m="+m+"$ , $n="+n+"$")}
};
vx(11,1,[G11.mono1,G11.msim,G11.pord]);
vx(11,2,[G11.cube2,G11.abc2,G11.calc,G11.pmul]);
vx(11,3,[G11.faux,G11.faux2,G11.f2v2,G11.fdc,G11.tri2,G11.cubval,G11.fgrp,G11.fq3]);
(function(){var g1=G[11][1],g2=G[11][2];
  function lvs(lv,L){G[11][lv]=function(){return pick(L)()}}
  lvs(5,[G11.mmul,G11.mdiv,G11.pterm,G11.pmul,G11.fgcd2,g1]);
  lvs(6,[G11.cube2,G11.calc,G11.fgrp,G11.fq3,G11.cubval,G11.abc2,g2]);
})();
P4[11].push(
 function(){var a=ri(2,9),b=a+ri(1,4),x=ri(5,20);return K("g10pp_land","🌳 សួនរាងការ៉េជ្រុង $x$ ម ត្រូវពង្រីកទៅជាចតុកោណកែងប្រវែង $(x+"+a+")$ ម ទទឹង $(x+"+b+")$ ម ។ ផ្ទៃបន្ថែម $S=(x+"+a+")(x+"+b+")-x^2=mx+n$ ។ រក $m$ , $n$ ហើយគណនា $S$ ពេល $x="+x+"$ (ម$^2$)",[A(a+b,null,"num","m ="),A(a*b,null,"num","n ="),A((a+b)*x+a*b,null,"num","S =")],"$S=x^2+"+(a+b)+"x+"+(a*b)+"-x^2="+(a+b)+"x+"+(a*b)+"$ ⇒ $S="+((a+b)*x+a*b)+"$")},
 function(){var L=ri(6,15),W=ri(4,L-1),x=ri(1,3);return K("g10pp_path","🏊 អាងចតុកោណកែង $"+L+"\\times"+W+"$ ម មានផ្លូវដើរទទឹង $x$ ម ជុំវិញ ។ ផ្ទៃផ្លូវ $S=("+L+"+2x)("+W+"+2x)-"+(L*W)+"=ax^2+bx$ ។ រក $a$ , $b$ ហើយគណនា $S$ ពេល $x="+x+"$ (ម$^2$)",[A(4,null,"num","a ="),A(2*(L+W),null,"num","b ="),A(4*x*x+2*(L+W)*x,null,"num","S =")],"ពន្លាត ⇒ $S=4x^2+"+(2*(L+W))+"x$ ⇒ $S="+(4*x*x+2*(L+W)*x)+"$")},
 function(){var p=ri(1,9),q=ri(p,12);return K("g10pp_fac","📐 ដីចតុកោណកែងមួយមានផ្ទៃ $A=x^2+"+(p+q)+"x+"+(p*q)+"$ ម$^2$ ។ ដាក់ $A$ ជាផលគុណកត្តា $(x+p)(x+q)$ ដែល $p\\le q$ ដើម្បីរកប្រវែង និងទទឹង ។ រក $p$ , $q$",[A(p,null,"num","p ="),A(q,null,"num","q =")],"$p+q="+(p+q)+"$ , $pq="+(p*q)+"$ ⇒ $A=(x+"+p+")(x+"+q+")$")});
/* ១.២ ចែកពហុធា */
/* ១.២ ចំណុច ២ ប្រមាណវិធីលើប្រភាគសនិទាន (ចម្លើយជាលេខ · រើសចម្លើយមុន) */
vx(12,1,[
 function(){var a=nz(-9,9);return K("s10_rdom","រកតម្លៃ $x$ ដែលកន្សោម $\\dfrac{"+pick([1,2,3,5])+"}{x"+sg(-a,0)+"}$ គ្មានន័យ",[A(a,null,"num","x =")],"ភាគបែង $=0$ ⇒ $x"+sg(-a,0)+"=0$ ⇒ $x="+a+"$")}]);
vx(12,2,[
 function(){var p=nz(-8,8),q=nz(-8,8),e=[1,p+q,p*q];return K("s10_rsimp","សម្រួល $\\dfrac{"+polyT(e)+"}{x"+sg(p,0)+"}$ ($x\\ne"+(-p)+"$) ជាទម្រង់ $x+m$ ។ រក $m$",[A(q,null,"num","m =")],"ភាគយក $=(x"+sg(p,0)+")(x"+sg(q,0)+")$ ⇒ $x"+sg(q,0)+"$")},
 function(){var a=nz(-7,7);return K("s10_rdiv","គណនា $\\dfrac{x^2-"+(a*a)+"}{x}:\\dfrac{x"+sg(-a,0)+"}{x}$ ($x\\ne0$ , $x\\ne"+a+"$) ជាទម្រង់ $x+m$ ។ រក $m$",[A(a,null,"num","m =")],"$\\dfrac{(x-"+a+")(x+"+a+")}{x}\\cdot\\dfrac{x}{x"+sg(-a,0)+"}=x+"+a+"$")}]);
vx(12,3,[
 function(){var m=ri(2,3),p=nz(-6,6),q=nz(-6,6),e=[m,m*q+p,p*q];return K("s10_rsimp2","សម្រួល $\\dfrac{"+polyT(e)+"}{x"+sg(q,0)+"}$ ($x\\ne"+(-q)+"$) ជាទម្រង់ $"+m+"x+p$ ។ រក $p$",[A(p,null,"num","p =")],"ភាគយក $=("+m+"x+"+p+")(x"+sg(q,0)+")$ ⇒ $"+m+"x"+sg(p,0)+"$")},
 function(){var p=nz(-6,6),q=nz(-6,6);while(q===p)q=nz(-6,6);var a=nz(-4,4),b=nz(-4,4),n=[a+b,a*q+b*p];return K("s10_radd","គណនា $\\dfrac{"+a+"}{x"+sg(p,0)+"}+\\dfrac{"+b+"}{x"+sg(q,0)+"}=\\dfrac{mx+n}{(x"+sg(p,0)+")(x"+sg(q,0)+")}$ ។ រក $m$ , $n$",[A(n[0],null,"num","m ="),A(n[1],null,"num","n =")],"រួមភាគបែង ⇒ $"+a+"(x"+sg(q,0)+")+"+sgp(b)+"(x"+sg(p,0)+")="+co(n[0],"x",true)+sg(n[1],0)+"$")}]);
vx(12,1,[
 function(){var a=nz(-4,4),b=ri(-6,6),c=ri(-9,9),q=[1,b+a],r=a*a+a*b+c;return K("s10_lin_12","ចែក $x^2"+co(b,"x")+sg(c,0)+"$ នឹង $x"+sg(-a,0)+"$ ។ រកផលចែក $Q(x)$ និងសំណល់ $R$"+cfAsk(q,"Q(x)"),cfAns(q,"Q: ").concat([A(r,null,"num","R =")]),"ហ៊័រណឺ ⇒ $Q(x)="+polyT(q)+"$ · $R=P("+a+")="+r+"$")},
 function(){var a=nz(-3,3),c=[nz(-3,3),ri(-4,4),ri(-5,5)],r=c[0]*a*a-c[1]*a+c[2];return K("s10_rem2","រកសំណល់នៃការចែក $P(x)="+polyT(c)+"$ នឹង $x"+sg(a,0)+"$",[A(r,null,"num","R =")],"$R=P("+(-a)+")="+r+"$")},
 function(){var a=nz(-5,5),b=ri(-6,6);return K("s10_mono","ចែក $"+co(a,"x^3",true)+co(b,"x^2")+"$ នឹង $x^2$ ($x\\ne0$)"+cfAsk([a,b]),cfAns([a,b]),"ចែកតួនីមួយៗ ⇒ $"+polyT([a,b])+"$")}]);
vx(12,2,[
 function(){var a=nz(-4,4),b=ri(-6,6),m=-(a*a+a*b);return K("s10_find","រក $m$ ដើម្បីឱ្យ $x"+sg(-a,0)+"$ ជាកត្តានៃ $x^2"+co(b,"x")+"+m$",[A(m,null,"num","m =")],"$P("+a+")=0$ ⇒ $"+(a*a)+sg(a*b,0)+"+m=0$ ⇒ $m="+m+"$")},
 function(){var r=[nz(-4,4),nz(-4,4),nz(-4,4)];while(r[1]===r[0])r[1]++;while(r[2]===r[0]||r[2]===r[1])r[2]++;var c=[1,-(r[0]+r[1]+r[2]),r[0]*r[1]+r[1]*r[2]+r[0]*r[2],-r[0]*r[1]*r[2]],o=[r[1],r[2]].sort(function(x,y){return x-y});
   return K("s10_fac3","$x="+r[0]+"$ ជាឫសនៃ $"+polyT(c)+"=0$ ។ រកឫសពីរទៀត ($x_1<x_2$)",[A(o[0],null,"num","x₁ ="),A(o[1],null,"num","x₂ =")],"ចែកនឹង $x"+sg(-r[0],0)+"$ ⇒ $x^2"+co(-(r[1]+r[2]),"x")+sg(r[1]*r[2],0)+"=0$ ⇒ $"+o[0]+"$ , $"+o[1]+"$")},
 function(){var c=[ri(1,4)*2,ri(-6,6),ri(-6,6),ri(-6,6)],v=fr(c[0]+2*c[1]+4*c[2]+8*c[3],8);return K("s10_rem3","រកសំណល់នៃការចែក $P(x)="+polyT(c)+"$ នឹង $2x-1$",[A(v.s,v.t,"num","R =")],"$R=P\\left(\\tfrac12\\right)="+v.t+"$")}]);
vx(12,3,[
 function(){var m=2*ri(-4,4),n=ri(-6,6),r1=1+m+n,r2=1-m+n;return K("s10_two_12","$P(x)=x^2+mx+n$ ចែកនឹង $x-1$ សល់ $"+r1+"$ ហើយចែកនឹង $x+1$ សល់ $"+r2+"$ ។ រក $m$ និង $n$",[A(m,null,"num","m ="),A(n,null,"num","n =")],"$\\begin{cases}1+m+n="+r1+"\\\\1-m+n="+r2+"\\end{cases}$ ⇒ $m="+m+"$ , $n="+n+"$")},
 function(){var a=nz(-5,5),b=nz(-5,5);while(b===a)b++;return K("s10_mn","រក $m$ និង $n$ ដើម្បីឱ្យ $x^2+mx+n$ ចែកដាច់នឹង $x"+sg(-a,0)+"$ និង $x"+sg(-b,0)+"$",[A(-(a+b),null,"num","m ="),A(a*b,null,"num","n =")],"$x^2+mx+n=(x"+sg(-a,0)+")(x"+sg(-b,0)+")$ ⇒ $m="+(-(a+b))+"$ , $n="+(a*b)+"$")},
 function(){var a=nz(-3,3),k=nz(-4,4),b=ri(-6,6),c=-(k*a*a+b*a);return K("s10_kq","រក $k$ ដើម្បីឱ្យ $kx^2"+co(b,"x")+sg(c,0)+"$ ចែកដាច់នឹង $x"+sg(-a,0)+"$",[A(k,null,"num","k =")],"$P("+a+")=0$ ⇒ $"+(a*a)+"k"+sg(b*a,0)+sg(c,0)+"=0$ ⇒ $k="+k+"$")}]);
/* ១.២ ចែកពហុធា · GCD/LCM · ប្រភាគសនិទាន (កែ ២០២៦-១១-២៦) — kd = g10d_… (PISA = g10dp_…) · ចម្លើយ fill-in (num) ទាំងអស់
   កម្រិតបង្ហាញ ២ (គន្លឹះ 5) និង ៤ (គន្លឹះ 6) មានបញ្ជីផ្ទាល់ខ្លួន (មិនប្រើ fill56) */
function dfx(e,v){return e===1?v:v+"^{"+e+"}"}
function trio(){var L=shf([-6,-5,-4,-3,-2,-1,1,2,3,4,5,6]);return L.slice(0,3)}
var G12={
 deg:function(){var m=ri(3,7),n=ri(1,m-1);return K("g10d_deg","$A$ ជាពហុធាដឺក្រេ $"+m+"$ ហើយ $B$ ជាពហុធាដឺក្រេ $"+n+"$ ។ ពេលចែក $A=B\\times Q+R$ រកដឺក្រេនៃ $Q$ និងដឺក្រេធំបំផុតដែលអាចមាននៃ $R$",[A(m-n,null,"num","ដឺក្រេ Q ="),A(n-1,null,"num","ដឺក្រេ R ធំបំផុត =")],"$\\deg Q="+m+"-"+n+"="+(m-n)+"$ · $\\deg R<"+n+"$ ⇒ ធំបំផុត $"+(n-1)+"$")},
 q1:function(){var b=nz(-3,3),c=nz(-3,3),u=ri(1,3),v=ri(-4,4),r=ri(-4,4),s=ri(-6,6),P=[u,v+b*u,b*v+c*u+r,c*v+s];
   return K("g10d_q1","ចែក $"+polyT(P)+"$ នឹង $"+polyT([1,b,c])+"$ ។ រកផលចែក $Q(x)=ux+v$ និងសំណល់ $R(x)=rx+s$",[A(u,null,"num","u ="),A(v,null,"num","v ="),A(r,null,"num","r ="),A(s,null,"num","s =")],"$A=BQ+R$ ⇒ $Q(x)="+polyT([u,v])+"$ , $R(x)="+polyT([r,s])+"$ (ដឺក្រេ $R<2$)")},
 q2:function(){var b=nz(-3,3),c=nz(-3,3),u=ri(-3,3),v=ri(-4,4),r=ri(-4,4),s=ri(-6,6),P=[1,u+b,v+b*u+c,b*v+c*u+r,c*v+s];
   return K("g10d_q2","ចែក $"+polyT(P)+"$ នឹង $"+polyT([1,b,c])+"$ ។ រកផលចែក $Q(x)=x^2+ux+v$ និងសំណល់ $R(x)=rx+s$",[A(u,null,"num","u ="),A(v,null,"num","v ="),A(r,null,"num","r ="),A(s,null,"num","s =")],"$A=BQ+R$ ⇒ $Q(x)="+polyT([1,u,v])+"$ , $R(x)="+polyT([r,s])+"$ (ដឺក្រេ $R<2$)")},
 findp:function(){var a=nz(-4,4),u=nz(-3,3),v=ri(-4,4),w=ri(-5,5),r=ri(-6,6),P=[u,v+a*u,w+a*v,a*w+r];
   return K("g10d_findp","ចែក $P(x)$ នឹង $x"+sg(a,0)+"$ បានផលចែក $Q(x)="+polyT([u,v,w])+"$ និងសំណល់ $"+r+"$ ។ រក $P(x)$"+cfAsk(P),cfAns(P),"$P=BQ+R=(x"+sg(a,0)+")("+polyT([u,v,w])+")"+sg(r,0)+"="+polyT(P)+"$")},
 findp2:function(){var b=nz(-3,3),c=nz(-3,3),u=nz(-3,3),v=ri(-4,4),r=ri(-4,4),s=ri(-6,6),P=[u,v+b*u,b*v+c*u+r,c*v+s];
   return K("g10d_findp2","ចែក $P(x)$ នឹង $"+polyT([1,b,c])+"$ បានផលចែក $Q(x)="+polyT([u,v])+"$ និងសំណល់ $R(x)="+polyT([r,s])+"$ ។ រក $P(x)$"+cfAsk(P),cfAns(P),"$P=BQ+R=("+polyT([1,b,c])+")("+polyT([u,v])+")+("+polyT([r,s])+")="+polyT(P)+"$")},
 gcdm:function(){var C=[6,8,9,10,12,15,18,20,24,30],c1=pick(C),c2=pick(C),p=ri(1,4),q=ri(1,4),r=ri(1,4),s=ri(1,4),g=gcd(c1,c2),l=lcm(c1,c2);
   return K("g10d_gcdm","រកតួចែករួមធំបំផុត (GCD) និងពហុគុណរួមតូចបំផុត (LCM) នៃ $"+mnS(c1,p,q,true)+"$ និង $"+mnS(c2,r,s,true)+"$ ។ សរសេរ $\\text{GCD}=gx^my^n$ និង $\\text{LCM}=Lx^uy^v$ ។ រក $g$ , $m$ , $n$ , $L$ , $u$ , $v$",[A(g,null,"num","g ="),A(Math.min(p,r),null,"num","m ="),A(Math.min(q,s),null,"num","n ="),A(l,null,"num","L ="),A(Math.max(p,r),null,"num","u ="),A(Math.max(q,s),null,"num","v =")],"GCD ៖ ជ.ជ.ម.នៃមេគុណ $"+g+"$ · និទស្សន្តតូចបំផុត · LCM ៖ ម.រ.ត.នៃមេគុណ $"+l+"$ · និទស្សន្តធំបំផុត")},
 gcdf:function(){var a=ri(1,3),b=ri(1,3),c=ri(1,3),d=ri(1,3),t=trio(),p=t[0],q=t[1],r=t[2];
   return K("g10d_gcdf","គេឱ្យ $A="+dfx(a,"x")+"(x"+sg(p,0)+")"+(b>1?"^{"+b+"}":"")+"(x"+sg(q,0)+")$ និង $B="+dfx(c,"x")+"(x"+sg(p,0)+")"+(d>1?"^{"+d+"}":"")+"(x"+sg(r,0)+")$ ។ GCD $=x^i(x"+sg(p,0)+")^j$ និង LCM $=x^k(x"+sg(p,0)+")^l(x"+sg(q,0)+")(x"+sg(r,0)+")$ ។ រក $i$ , $j$ , $k$ , $l$",[A(Math.min(a,c),null,"num","i ="),A(Math.min(b,d),null,"num","j ="),A(Math.max(a,c),null,"num","k ="),A(Math.max(b,d),null,"num","l =")],"GCD ៖ និទស្សន្តតូចបំផុតនៃកត្តារួម · LCM ៖ និទស្សន្តធំបំផុតនៃកត្តារួម និងកត្តាមិនរួមទាំងអស់")},
 gcdex:function(){var t=trio(),p=t[0],q=t[1],r=t[2];
   return K("g10d_gcdex","គេឱ្យ $A="+polyT([1,p+q,p*q])+"$ និង $B="+polyT([1,p+r,p*r])+"$ ។ ដាក់ជាកត្តា ហើយរក GCD $=x+m$ និង LCM ដែលមានតួថេរ $n$ ($\\text{LCM}$ ជាពហុធាដឺក្រេ $3$ មានមេគុណនាំមុខ $1$) ។ រក $m$ , $n$",[A(p,null,"num","m ="),A(p*q*r,null,"num","n =")],"$A=(x"+sg(p,0)+")(x"+sg(q,0)+")$ , $B=(x"+sg(p,0)+")(x"+sg(r,0)+")$ ⇒ GCD $=x"+sg(p,0)+"$ · LCM $=(x"+sg(p,0)+")(x"+sg(q,0)+")(x"+sg(r,0)+")$ ⇒ $n="+p+"\\cdot"+sgp(q)+"\\cdot"+sgp(r)+"="+(p*q*r)+"$")},
 rcd:function(){var a=nz(-5,5),t=trio(),p=t[0],q=t[1];
   return K("g10d_rcd","តម្រូវភាគបែងរួម ៖ $\\dfrac{"+a+"}{x"+sg(p,0)+"}=\\dfrac{mx+n}{(x"+sg(p,0)+")(x"+sg(q,0)+")}$ ។ រក $m$ , $n$",[A(a,null,"num","m ="),A(a*q,null,"num","n =")],"គុណភាគយកនឹង $(x"+sg(q,0)+")$ ⇒ $"+a+"(x"+sg(q,0)+")="+poly([a,a*q])+"$")},
 rsame:function(){var a=nz(-5,5),b=nz(-6,6),c=nz(-5,5),d=nz(-6,6),p=nz(-6,6),mn=Math.random()<.5,m=mn?a-c:a+c,n=mn?b-d:b+d;
   return K("g10d_rsame","គណនា $\\dfrac{"+poly([a,b])+"}{x"+sg(p,0)+"}"+(mn?"-":"+")+"\\dfrac{"+poly([c,d])+"}{x"+sg(p,0)+"}=\\dfrac{mx+n}{x"+sg(p,0)+"}$ ។ រក $m$ , $n$",[A(m,null,"num","m ="),A(n,null,"num","n =")],"ភាគបែងដូចគ្នា ⇒ "+(mn?"$("+poly([a,b])+")-("+poly([c,d])+")$ (ប្ដូរសញ្ញាគ្រប់តួនៃភាគយកទីពីរ)":"$("+poly([a,b])+")+("+poly([c,d])+")$")+" $="+poly([m,n])+"$")},
 rsub:function(){var a=nz(-5,5),b=nz(-5,5),t=trio(),p=t[0],q=t[1];
   return K("g10d_rsub","គណនា $\\dfrac{"+a+"}{x"+sg(p,0)+"}-\\dfrac{"+b+"}{x"+sg(q,0)+"}=\\dfrac{mx+n}{(x"+sg(p,0)+")(x"+sg(q,0)+")}$ ។ រក $m$ , $n$",[A(a-b,null,"num","m ="),A(a*q-b*p,null,"num","n =")],"ភាគយក $="+a+"(x"+sg(q,0)+")-("+b+")(x"+sg(p,0)+")="+poly([a-b,a*q-b*p])+"$")},
 rmul:function(){var a=ri(1,7),L=[],i;for(i=-7;i<=7;i++)if(i&&i!==-a)L.push(i);var b=pick(L);
   return K("g10d_rmul","គណនា $\\dfrac{x^2-"+(a*a)+"}{"+polyT([1,b,0])+"}\\cdot\\dfrac{x}{x+"+a+"}$ ជាទម្រង់ $\\dfrac{x+m}{x+n}$ ។ រក $m$ , $n$",[A(-a,null,"num","m ="),A(b,null,"num","n =")],"$\\dfrac{(x-"+a+")(x+"+a+")}{x(x"+sg(b,0)+")}\\cdot\\dfrac{x}{x+"+a+"}=\\dfrac{x-"+a+"}{x"+sg(b,0)+"}$")},
 rdiv2:function(){var a=nz(-6,6),b=ri(1,6);
   return K("g10d_rdiv2","គណនា $\\dfrac{x"+sg(a,0)+"}{x^2-"+(b*b)+"}:\\dfrac{x"+sg(a,0)+"}{x+"+b+"}$ ជាទម្រង់ $\\dfrac{1}{x+m}$ ។ រក $m$",[A(-b,null,"num","m =")],"$\\dfrac{x"+sg(a,0)+"}{(x-"+b+")(x+"+b+")}\\cdot\\dfrac{x+"+b+"}{x"+sg(a,0)+"}=\\dfrac{1}{x-"+b+"}$")},
 rcomp:function(){var a=nz(-6,6);
   return K("g10d_rcomp","សម្រួលប្រភាគច្រើនជាន់ $\\dfrac{x-\\dfrac{"+(a*a)+"}{x}}{1"+(a<0?"+":"-")+"\\dfrac{"+Math.abs(a)+"}{x}}$ ជាទម្រង់ $x+m$ ។ រក $m$",[A(a,null,"num","m =")],"ភាគយក $=\\dfrac{x^2-"+(a*a)+"}{x}$ · ភាគបែង $=\\dfrac{x"+sg(-a,0)+"}{x}$ ⇒ $\\dfrac{(x"+sg(-a,0)+")(x"+sg(a,0)+")}{x"+sg(-a,0)+"}=x"+sg(a,0)+"$")},
 rcomp2:function(){var a=ri(2,9);
   return K("g10d_rcomp2","សម្រួល $\\dfrac{\\dfrac{1}{x}-\\dfrac{1}{"+a+"}}{x-"+a+"}$ ជាទម្រង់ $\\dfrac{-1}{mx}$ ។ រក $m$",[A(a,null,"num","m =")],"ភាគយក $=\\dfrac{"+a+"-x}{"+a+"x}=\\dfrac{-(x-"+a+")}{"+a+"x}$ ⇒ $\\dfrac{-1}{"+a+"x}$")}
};
vx(12,1,[G12.deg,G12.rcd,G12.rsame,G12.gcdm,G12.findp]);
vx(12,2,[G12.q1,G12.gcdf,G12.rsub,G12.rmul,G12.gcdex]);
vx(12,3,[G12.q2,G12.findp2,G12.rcomp,G12.rcomp2,G12.rdiv2]);
(function(){var g1=G[12][1],g2=G[12][2];
  function lvs(lv,L){G[12][lv]=function(){return pick(L)()}}
  lvs(5,[G12.deg,G12.findp,G12.gcdm,G12.rsame,G12.rcd,g1]);
  lvs(6,[G12.q1,G12.gcdf,G12.gcdex,G12.rsub,G12.rmul,G12.rdiv2,g2]);
})();
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
 function(){var a=ri(1,9),b=ri(1,9),p=a+b>9,q=a*b<20,v=!(p||q);return K("s10_dem","$p$ ៖ «$"+a+"+"+b+">9$» · $q$ ៖ «$"+a+"\\times"+b+"<20$» ។ តើ $\\overline{p\\lor q}$ ពិតឬមិនពិត? ($1$/$0$)",[A(v?1:0,null,"num","តម្លៃ =")],"ច្បាប់ដឺម៉័រហ្គង់ ៖ $\\overline{p\\lor q}=\\overline p\\land\\overline q$ ⇒ "+tv(v))},
 function(){var S=[ri(-3,0),ri(1,3),ri(4,6)],k=ri(0,20),v=S.every(function(x){return x*x>k});return K("s10_quant","តើសំណើ «$\\forall x\\in\\{"+S.join(",")+"\\},\\ x^2>"+k+"$» ពិតឬមិនពិត? ($1$/$0$)",[A(v?1:0,null,"num","តម្លៃ =")],"$x^2$ ៖ $"+S.map(function(x){return x*x}).join(",")+"$ ⇒ "+tv(v))},
 function(){var S=[ri(-5,-1),ri(0,2),ri(3,6)],a=nz(1,3),x0=pick(S.concat([7,-6])),b=-a*x0,v=S.indexOf(x0)>=0;return K("s10_exist","តើសំណើ «$\\exists x\\in\\{"+S.join(",")+"\\}:\\ "+co(a,"x",true)+sg(b,0)+"=0$» ពិតឬមិនពិត? ($1$/$0$)",[A(v?1:0,null,"num","តម្លៃ =")],"ឫស $x="+x0+"$ "+(v?"នៅក្នុង":"មិននៅក្នុង")+"សំណុំ ⇒ "+tv(v))}]);
/* ២.១ តក្កវិទ្យា (កែ ២០២៦-១១-២៦) — kd = g10l_… (PISA = g10lp_…) · ចម្លើយ 1 = ពិត · 0 = មិនពិត ឬចំនួន · fill-in (num) ទាំងអស់
   កម្រិតបង្ហាញ ២ (គន្លឹះ 5) និង ៤ (គន្លឹះ 6) មានបញ្ជីផ្ទាល់ខ្លួន (មិនប្រើ fill56) */
var PL=[function(a){return["$"+a+"$ ជាចំនួនគូ",a%2===0]},function(a){return["$"+a+">5$",a>5]},function(a){return["$"+a+"$ ចែកដាច់នឹង $3$",a%3===0]},function(a){return["$"+a+"<8$",a<8]},function(a){return["$"+a+"$ ជាចំនួនបឋម",isPr(a)]}];
function pq(){var i=ri(0,PL.length-1),j=(i+1+ri(0,PL.length-2))%PL.length;return{p:PL[i](ri(1,12)),q:PL[j](ri(1,12))}}
function bn(v){return v?1:0}
function imp(p,q){return!p||q}
function pqS(o){return"$p$ ៖ «"+o.p[0]+"» · $q$ ៖ «"+o.q[0]+"» ។ "}
var TTF=[{t:"(p\\Rightarrow q)\\wedge(q\\Rightarrow p)",n:2,f:function(p,q){return imp(p,q)&&imp(q,p)}},{t:"\\overline{p\\wedge q}",n:2,f:function(p,q){return!(p&&q)}},{t:"p\\wedge\\overline{q}",n:2,f:function(p,q){return p&&!q}},{t:"\\overline{p}\\vee\\overline{q}",n:2,f:function(p,q){return!p||!q}},{t:"(p\\vee q)\\wedge\\overline{p\\wedge q}",n:2,f:function(p,q){return(p||q)&&!(p&&q)}},{t:"(p\\wedge q)\\Rightarrow r",n:3,f:function(p,q,r){return imp(p&&q,r)}},{t:"(p\\vee q)\\wedge r",n:3,f:function(p,q,r){return(p||q)&&r}},{t:"p\\Rightarrow(q\\Rightarrow r)",n:3,f:function(p,q,r){return imp(p,imp(q,r))}}];
var G21={
 dneg:function(){var o=pq();return K("g10l_dneg",pqS(o)+"គណនាតម្លៃភាពពិតនៃ $\\overline{\\overline{p}}$ ។ ($1$ = ពិត · $0$ = មិនពិត)",[A(bn(o.p[1]),null,"num","តម្លៃ =")],"$\\overline{\\overline{p}}=p$ ⇒ $p$ "+tv(o.p[1]))},
 dmand:function(){var o=pq(),v=!(o.p[1]&&o.q[1]);return K("g10l_dmand",pqS(o)+"គណនា $\\overline{p\\wedge q}$ និង $\\overline{p}\\vee\\overline{q}$ ។ ($1$/$0$)",[A(bn(v),null,"num","$\\overline{p\\wedge q}$ ="),A(bn(!o.p[1]||!o.q[1]),null,"num","$\\overline{p}\\vee\\overline{q}$ =")],"ដឺម៉ហ្គង់ ៖ $\\overline{p\\wedge q}=\\overline{p}\\vee\\overline{q}$ ⇒ ទាំងពីរ "+tv(v))},
 conv:function(){var o=pq(),v=imp(o.q[1],o.p[1]);return K("g10l_conv",pqS(o)+"សំណើច្រាសនៃ $p\\Rightarrow q$ គឺ $q\\Rightarrow p$ ។ គណនាតម្លៃភាពពិតរបស់វា ($1$/$0$)",[A(bn(v),null,"num","តម្លៃ =")],"$q\\Rightarrow p$ មិនពិតលុះត្រាតែ $q$ ពិត និង $p$ មិនពិត ⇒ "+tv(v))},
 imp3:function(){var p=ri(0,1),q=ri(0,1);return K("g10l_imp3","ដោយ ត.$(p)="+p+"$ និង ត.$(q)="+q+"$ ។ គណនាតម្លៃភាពពិតនៃ $p\\Rightarrow q$ , សំណើច្រាស $q\\Rightarrow p$ និងសំណើផ្ទុយពីសម្មតិកម្ម $\\overline{q}\\Rightarrow\\overline{p}$ ($1$/$0$)",[A(bn(imp(p,q)),null,"num","$p\\Rightarrow q$ ="),A(bn(imp(q,p)),null,"num","$q\\Rightarrow p$ ="),A(bn(imp(!q,!p)),null,"num","$\\overline{q}\\Rightarrow\\overline{p}$ =")],"ផ្ទុយពីសម្មតិកម្ម មានតម្លៃដូច $p\\Rightarrow q$ ជានិច្ច ⇒ "+bn(imp(p,q)))},
 iff:function(){var o=pq(),p=o.p[1],q=o.q[1];return K("g10l_iff",pqS(o)+"គណនា $p\\Rightarrow q$ , $q\\Rightarrow p$ និង $p\\Leftrightarrow q=(p\\Rightarrow q)\\wedge(q\\Rightarrow p)$ ($1$/$0$)",[A(bn(imp(p,q)),null,"num","$p\\Rightarrow q$ ="),A(bn(imp(q,p)),null,"num","$q\\Rightarrow p$ ="),A(bn(p===q),null,"num","$p\\Leftrightarrow q$ =")],"$p\\Leftrightarrow q$ ពិតលុះត្រាតែ $p$ និង $q$ មានតម្លៃភាពពិតដូចគ្នា ⇒ "+tv(p===q))},
 nsc:function(){var k=ri(1,6),m=ri(1,6),c=ri(1,4),p,q,s;
   if(c===1){p="$x>"+(k+2)+"$";q="$x>"+k+"$";s="$p\\Rightarrow q$ ពិត ប៉ុន្តែ $q\\Rightarrow p$ មិនពិត (ឧ. $x="+(k+1)+"$) ⇒ $p$ គ្រប់គ្រាន់ តែមិនចាំបាច់"}
   else if(c===2){p="$x>"+k+"$";q="$x>"+(k+2)+"$";s="$q\\Rightarrow p$ ពិត ប៉ុន្តែ $p\\Rightarrow q$ មិនពិត (ឧ. $x="+(k+1)+"$) ⇒ $p$ ចាំបាច់ តែមិនគ្រប់គ្រាន់"}
   else if(c===3){p="$x+"+k+"="+(k+m)+"$";q="$x="+m+"$";s="$p\\Leftrightarrow q$ ⇒ ចាំបាច់ និងគ្រប់គ្រាន់"}
   else{p="$x^2>"+(k*k)+"$";q="$x>0$";s="$x=-"+(k+1)+"$ ធ្វើឱ្យ $p$ ពិត $q$ មិនពិត · $x=\\tfrac12$ ធ្វើឱ្យ $q$ ពិត $p$ មិនពិត ⇒ មិនចាំបាច់ មិនគ្រប់គ្រាន់"}
   return K("g10l_nsc","សម្រាប់ចំនួនពិត $x$ ៖ $p$ ៖ «"+p+"» · $q$ ៖ «"+q+"» ។ កំណត់ទំនាក់ទំនង ៖ $1$ = $p$ គ្រប់គ្រាន់ តែមិនចាំបាច់ដើម្បី $q$ · $2$ = $p$ ចាំបាច់ តែមិនគ្រប់គ្រាន់ · $3$ = $p$ ចាំបាច់ និងគ្រប់គ្រាន់ · $4$ = មិនចាំបាច់ ក៏មិនគ្រប់គ្រាន់",[A(c,null,"num","កូដ =")],s)},
 tt:function(){var F=pick(TTF),n=F.n,rows=1<<n,cnt=0;for(var i=0;i<rows;i++){var v=[];for(var j=n-1;j>=0;j--)v.push(!!((i>>j)&1));if(F.f.apply(null,v))cnt++}
   return K("g10l_tt","សង់តារាងភាពពិតនៃ $"+F.t+"$ ("+(n===2?"$p,q$ ":"$p,q,r$ ")+"មាន $"+rows+"$ ជួរ) ។ រកចំនួនជួរដែលមានតម្លៃភាពពិត $1$",[A(cnt,null,"num","ចំនួនជួរពិត =")],"រាប់ជួរដែលតម្លៃចុងក្រោយ $=1$ ⇒ $"+cnt+"$ ក្នុងចំណោម $"+rows+"$")},
 pdir:function(){var m=ri(1,9),n=ri(1,9);return K("g10l_pdir","សម្រាយដោយផ្ទាល់ ៖ បើ $x=2m+1$ និង $y=2n+1$ ជាចំនួនសេស នោះ $x+y=2k$ ជាចំនួនគូ ។ ចំពោះ $m="+m+"$ , $n="+n+"$ រក $x$ , $y$ និង $k$",[A(2*m+1,null,"num","x ="),A(2*n+1,null,"num","y ="),A(m+n+1,null,"num","k =")],"$x+y=(2m+1)+(2n+1)=2(m+n+1)$ ⇒ $k="+(m+n+1)+"$")},
 pcp:function(){var n=ri(1,12),p=(n*n)%2===0,q=n%2===0;return K("g10l_pcp","បញ្ជាក់ «បើ $n^2$ គូ នោះ $n$ គូ» តាមសំណើផ្ទុយពីសម្មតិកម្ម ។ ចំពោះ $n="+n+"$ ៖ $p$ ៖ «$n^2$ គូ» · $q$ ៖ «$n$ គូ» ។ គណនា $\\overline{q}$ , $\\overline{p}$ និង $\\overline{q}\\Rightarrow\\overline{p}$ ($1$/$0$)",[A(bn(!q),null,"num","$\\overline{q}$ ="),A(bn(!p),null,"num","$\\overline{p}$ ="),A(bn(imp(!q,!p)),null,"num","$\\overline{q}\\Rightarrow\\overline{p}$ =")],"$n"+(q?"":"")+"="+n+"$ ⇒ $\\overline{q}\\Rightarrow\\overline{p}$ មានតម្លៃដូច $p\\Rightarrow q$ ដែលពិតជានិច្ច ⇒ $1$")},
 pcon:function(){var k=pick([2,3,5,7]),c=ri(1,9);return K("g10l_pcon","សម្រាយតាមសំណើផ្ទុយពីការពិត ៖ ឧបមា $\\sqrt{"+k+"}=\\dfrac{a}{b}$ (ប្រភាគសម្រួលអស់) ⇒ $a^2="+k+"b^2$ ⇒ $a$ ចែកដាច់នឹង $"+k+"$ ។ ឧបមា $a="+k+"c$ ដែល $c="+c+"$ ។ គណនា $a^2$ និង $b^2$",[A(k*k*c*c,null,"num","a² ="),A(k*c*c,null,"num","b² =")],"$a="+(k*c)+"$ ⇒ $a^2="+(k*k*c*c)+"$ ⇒ $b^2=a^2\\div"+k+"="+(k*c*c)+"$ ⇒ $b$ ក៏ចែកដាច់នឹង $"+k+"$ ផ្ទុយនឹងប្រភាគសម្រួលអស់")},
 pbic:function(){var a=ri(2,5),m=ri(-6,6),b=ri(-8,8),c=a*m+b;return K("g10l_pbic","សម្រាយតាមទ្វេលក្ខខណ្ឌ ៖ $"+poly([a,b])+"="+c+"\\iff x=m$ ។ រក $m$",[A(m,null,"num","m =")],"$"+poly([a,b])+"="+c+"\\iff "+a+"x="+(c-b)+"\\iff x="+m+"$")},
 pcex:function(){var a=ri(1,3),b=ri(2,12),n=1;while(n<60&&n*n<a*n+b)n++;return K("g10l_pcex","សំណើ «គ្រប់ចំនួនគត់វិជ្ជមាន $n$ គេមាន $n^2<"+a+"n+"+b+"$» មិនពិត ។ រកឧទាហរណ៍ផ្ទុយតូចបំផុត $n$ (ចំនួនគត់វិជ្ជមានតូចបំផុតដែល $n^2\\ge"+a+"n+"+b+"$)",[A(n,null,"num","n =")],"សាក $n=1,2,\\dots$ ⇒ $n="+n+"$ ៖ $"+(n*n)+"\\ge"+(a*n+b)+"$")}
};
vx(21,1,[G21.dneg,G21.conv,G21.pdir]);
vx(21,2,[G21.dmand,G21.imp3,G21.pcp,G21.pcex]);
vx(21,3,[G21.iff,G21.nsc,G21.tt,G21.pcon,G21.pbic]);
(function(){var g1=G[21][1],g2=G[21][2];
  function lvs(lv,L){G[21][lv]=function(){return pick(L)()}}
  lvs(5,[G21.dneg,G21.conv,G21.imp3,G21.pdir,G21.dmand,g1]);
  lvs(6,[G21.iff,G21.nsc,G21.tt,G21.pcp,G21.pcex,G21.pbic,g2]);
})();
/* ២.២ សំណុំ */
function rset(n,lo,hi){var s=[];while(s.length<n){var v=ri(lo,hi);if(s.indexOf(v)<0)s.push(v)}return s.sort(function(a,b){return a-b})}
vx(22,1,[
 function(){var A1=rset(ri(4,6),1,12),B=rset(ri(4,6),1,12),I=A1.filter(function(x){return B.indexOf(x)>=0});return K("s10_inter","$A=\\{"+A1.join(",")+"\\}$ , $B=\\{"+B.join(",")+"\\}$ ។ រក $n(A\\cap B)$",[A(I.length,null,"num","=")],"$A\\cap B=\\{"+(I.join(",")||"")+"\\}$ ⇒ $"+I.length+"$")},
 function(){var A1=rset(ri(3,5),1,10),B=rset(ri(3,5),1,10),U=A1.concat(B.filter(function(x){return A1.indexOf(x)<0}));return K("s10_union","$A=\\{"+A1.join(",")+"\\}$ , $B=\\{"+B.join(",")+"\\}$ ។ រក $n(A\\cup B)$",[A(U.length,null,"num","=")],"$A\\cup B$ មាន $"+U.length+"$ ធាតុ")},
 function(){var n=ri(1,6);return K("s10_subs","សំណុំមួយមាន $"+n+"$ ធាតុ ។ តើវាមានសំណុំរងប៉ុន្មាន (រួមទាំង $\\varnothing$ និងខ្លួនវា)?",[A(Math.pow(2,n),null,"num","=")],"$2^{"+n+"}="+Math.pow(2,n)+"$")}]);
vx(22,2,[
 function(){var a=ri(10,30),i=ri(1,a-1);return K("s10_diff_22","$n(A)="+a+"$ និង $n(A\\cap B)="+i+"$ ។ គណនា $n(A\\setminus B)$",[A(a-i,null,"num","=")],"$n(A\\setminus B)=n(A)-n(A\\cap B)="+(a-i)+"$",GFV({k:2,lab:{ab:String(i),a:"?"},cap:["n(A) = "+a],shade:["a"]}))},
 function(){var u=ri(20,50),a=ri(5,u-1);return K("s10_comp_22","$n(U)="+u+"$ និង $n(A)="+a+"$ ($A\\subset U$) ។ គណនា $n(\\overline A)$",[A(u-a,null,"num","=")],"$"+u+"-"+a+"="+(u-a)+"$",GFV({k:1,lab:{a:String(a),out:"?"},cap:["n(U) = "+u]}))},
 function(){var a=ri(10,30),b=ri(10,30),i=ri(1,Math.min(a,b)-1);return K("s10_inters","$n(A)="+a+"$ , $n(B)="+b+"$ , $n(A\\cup B)="+(a+b-i)+"$ ។ គណនា $n(A\\cap B)$",[A(i,null,"num","=")],"$n(A\\cap B)=n(A)+n(B)-n(A\\cup B)="+i+"$",GFV({k:2,lab:{a:"?",ab:"?",b:"?"},cap:["n(A) = "+a+" · n(B) = "+b,"n(A ∪ B) = "+(a+b-i)],shade:["ab"]}))}]);
vx(22,3,[
 function(){var a=ri(10,25),b=ri(10,25),i=ri(2,Math.min(a,b)-2);return K("s10_only","ក្នុងក្រុមមួយ $"+a+"$ នាក់ចេះអង់គ្លេស $"+b+"$ នាក់ចេះបារាំង និង $"+i+"$ នាក់ចេះទាំងពីរ ។ តើប៉ុន្មាននាក់ចេះតែអង់គ្លេស?",[A(a-i,null,"num","=")],"$"+a+"-"+i+"="+(a-i)+"$",GFV({k:2,names:["E","F"],lab:{ab:String(i),a:"?"},cap:["n(E) = "+a+" · n(F) = "+b],shade:["a"]}))},
 function(){var ab=ri(2,5),bc=ri(2,5),ca=ri(2,5),abc=ri(1,Math.min(ab,bc,ca)-0),a=ab+ca+ri(2,8),b=ab+bc+ri(2,8),c=bc+ca+ri(2,8),U=a+b+c-ab-bc-ca+abc;return K("s10_three","$n(A)="+a+"$ , $n(B)="+b+"$ , $n(C)="+c+"$ , $n(A\\cap B)="+ab+"$ , $n(B\\cap C)="+bc+"$ , $n(C\\cap A)="+ca+"$ , $n(A\\cap B\\cap C)="+abc+"$ ។ គណនា $n(A\\cup B\\cup C)$",[A(U,null,"num","=")],"$"+(a+b+c)+"-"+(ab+bc+ca)+"+"+abc+"="+U+"$",GFV({k:3,lab:{abc:String(abc),a:"?",b:"?",c:"?",ab:"?",bc:"?",ca:"?",out:"?"},cap:["n(A) = "+a+" · n(B) = "+b+" · n(C) = "+c,"n(A∩B) = "+ab+" · n(B∩C) = "+bc+" · n(C∩A) = "+ca]}))},
 function(){var N=pick([30,50,60,100]),p=pick([2,3,4,5]),q=pick([3,5,6,7]);while(q===p)q++;var n=Math.floor(N/p)+Math.floor(N/q)-Math.floor(N/lcm(p,q));return K("s10_atl","តើមានចំនួនគត់ពី $1$ ដល់ $"+N+"$ ប៉ុន្មាន ដែលចែកដាច់នឹង $"+p+"$ ឬ $"+q+"$ ?",[A(n,null,"num","=")],"$"+Math.floor(N/p)+"+"+Math.floor(N/q)+"-"+Math.floor(N/lcm(p,q))+"="+n+"$ (ដក ពហុគុណនៃ $"+lcm(p,q)+"$)")}]);
/* ២.២ សំណុំ (set10_)៖ បង្កើតចំនួនតំបន់មុន រួចសរសេរសំណុំ/រឿងពិត */
function set10Pool(n){var s=[];while(s.length<n){var v=ri(1,30);if(s.indexOf(v)<0)s.push(v)}return s}
function set10Srt(a){return a.slice().sort(function(x,y){return x-y})}
function set10Three(){var o=ri(2,9),p=ri(2,9),c=ri(2,9),x=ri(1,6),y=ri(1,6),z=ri(1,6),w=ri(1,5),d=ri(2,10),
   nA=o+x+y+w,nB=p+x+z+w,nC=c+y+z+w,N=o+p+c+x+y+z+w+d,pick3=pick([0,1,2]);
  var T=["គណិតវិទ្យា","រូបវិទ្យា","គីមីវិទ្យា"],L=["M","P","C"];
  return {txt:"📊 ស្ទង់មតិសិស្សសរុប $"+N+"$ នាក់ អំពីមុខវិជ្ជាដែលពួកគេរៀនបន្ថែម (គណិតវិទ្យា $M$ · រូបវិទ្យា $P$ · គីមីវិទ្យា $C$) ៖ $n(M)="+nA+"$ , $n(P)="+nB+"$ , $n(C)="+nC+"$ , $n(M\\cap P)="+(x+w)+"$ , $n(M\\cap C)="+(y+w)+"$ , $n(P\\cap C)="+(z+w)+"$ , $n(M\\cap P\\cap C)="+w+"$ ។ ",
    a:[A(o,null,"num","តែ M ="),A(x,null,"num","M∩P មិនC ="),A(d,null,"num","គ្មានមុខវិជ្ជាណា ="),A(o+p+c,null,"num","តែមួយមុខ =")],
    f:GFV({k:3,names:["M","P","C"],lab:{abc:String(w),a:"?",b:"?",c:"?",ab:"?",bc:"?",ca:"?",out:"?"},cap:["n(U) = "+N+" · n(M) = "+nA+" · n(P) = "+nB,"n(C) = "+nC+" · n(M∩P) = "+(x+w),"n(M∩C) = "+(y+w)+" · n(P∩C) = "+(z+w)]}),
    s:"តែ $M$ $="+nA+"-"+(x+w)+"-"+(y+w)+"+"+w+"="+o+"$ · $M\\cap P$ មិន $C$ $="+(x+w)+"-"+w+"="+x+"$ · $n(M\\cup P\\cup C)="+(N-d)+"$ ⇒ គ្មាន $="+N+"-"+(N-d)+"="+d+"$ · តែមួយមុខ $="+o+"+"+p+"+"+c+"="+(o+p+c)+"$"}}
vx(22,1,[
 function(){var c=ri(1,4),a=ri(1,4),b=ri(1,4),pl=set10Pool(c+a+b),A1=set10Srt(pl.slice(0,c+a)),B1=set10Srt(pl.slice(0,c).concat(pl.slice(c+a)));
   return K("set10_ops","$A=\\{"+A1.join(",")+"\\}$ , $B=\\{"+B1.join(",")+"\\}$ ។ រក $n(A\\cup B)$ , $n(A\\cap B)$ និង $n(A\\setminus B)$",[A(c+a+b,null,"num","n(A∪B) ="),A(c,null,"num","n(A∩B) ="),A(a,null,"num","n(A∖B) =")],"ធាតុរួម $"+c+"$ · $n(A\\setminus B)=n(A)-n(A\\cap B)="+(c+a)+"-"+c+"="+a+"$ · $n(A\\cup B)="+(c+a)+"+"+(c+b)+"-"+c+"="+(c+a+b)+"$")},
 function(){var n=ri(2,8);
   return K("set10_pw","សំណុំ $A$ មាន $"+n+"$ ធាតុ ។ រកចំនួនសំណុំរងទាំងអស់ និងចំនួនសំណុំរងពិតប្រាកដ (សំណុំរងដែលមិនស្មើ $A$)",[A(Math.pow(2,n),null,"num","សំណុំរង ="),A(Math.pow(2,n)-1,null,"num","សំណុំរងពិត =")],"$2^{"+n+"}="+Math.pow(2,n)+"$ · ដកខ្លួនវា ⇒ $"+(Math.pow(2,n)-1)+"$")},
 function(){var n=ri(3,7);
   return K("set10_pwr","សំណុំ $A$ មានសំណុំរងទាំងអស់ $"+Math.pow(2,n)+"$ ។ រក $n(A)$ និងចំនួនសំណុំរងដែលមិនទទេ",[A(n,null,"num","n(A) ="),A(Math.pow(2,n)-1,null,"num","មិនទទេ =")],"$2^n="+Math.pow(2,n)+"$ ⇒ $n="+n+"$ · ដក $\\varnothing$ ⇒ $"+(Math.pow(2,n)-1)+"$")}]);
vx(22,2,[
 function(){var o1=ri(3,12),o2=ri(3,12),b=ri(2,10),nn=ri(1,8),T=o1+o2+b+nn,m=o1+b,p=o2+b;
   return K("set10_ie","ក្នុងថ្នាក់មួយមានសិស្ស $"+T+"$ នាក់ ។ $"+m+"$ នាក់លេងបាល់ទាត់ · $"+p+"$ នាក់លេងបាល់ទះ · $"+nn+"$ នាក់មិនលេងទាំងពីរ ។ រកចំនួនសិស្សលេងទាំងពីរ និងចំនួនសិស្សលេងតែបាល់ទាត់",[A(b,null,"num","ទាំងពីរ ="),A(o1,null,"num","តែបាល់ទាត់ =")],"លេងយ៉ាងតិចមួយ $="+T+"-"+nn+"="+(T-nn)+"$ · $n(F\\cap V)="+m+"+"+p+"-"+(T-nn)+"="+b+"$ · តែបាល់ទាត់ $="+m+"-"+b+"="+o1+"$",GFV({k:2,names:["F","V"],lab:{a:"?",ab:"?",b:"?",out:String(nn)},cap:["n(U) = "+T+" · n(F) = "+m+" · n(V) = "+p],shade:["ab"]}))},
 function(){var N=ri(30,60),pq=pick([[2,3],[2,5],[3,5],[3,4]]),a=Math.floor(N/pq[0]),b2=Math.floor(N/pq[1]),i=Math.floor(N/lcm(pq[0],pq[1])),u=a+b2-i;
   return K("set10_cm","សំណុំសកល $U=\\{1,2,\\dots,"+N+"\\}$ ។ $A$ ជាសំណុំពហុគុណនៃ $"+pq[0]+"$ និង $B$ ជាសំណុំពហុគុណនៃ $"+pq[1]+"$ ក្នុង $U$ ។ រក $n(A\\cup B)$ និង $n(\\overline{A\\cup B})$",[A(u,null,"num","n(A∪B) ="),A(N-u,null,"num","n(complement) =")],"$n(A)="+a+"$ , $n(B)="+b2+"$ , $n(A\\cap B)="+i+"$ ⇒ $n(A\\cup B)="+u+"$ · $n(\\overline{A\\cup B})="+N+"-"+u+"="+(N-u)+"$")},
 function(){var U=ri(30,80),a=ri(10,25),b=ri(10,25),i=ri(2,Math.min(a,b)-2);
   if(a+b-i>U)U=a+b-i+ri(1,10);
   return K("set10_dm","$n(U)="+U+"$ , $n(A)="+a+"$ , $n(B)="+b+"$ , $n(A\\cap B)="+i+"$ ។ រក $n(\\overline A\\cap\\overline B)$ និង $n(\\overline A\\cup\\overline B)$ (ច្បាប់ដឺម៉័រហ្គង់)",[A(U-(a+b-i),null,"num","n(Ā∩B̄) ="),A(U-i,null,"num","n(Ā∪B̄) =")],"$\\overline A\\cap\\overline B=\\overline{A\\cup B}$ ⇒ $"+U+"-"+(a+b-i)+"="+(U-(a+b-i))+"$ · $\\overline A\\cup\\overline B=\\overline{A\\cap B}$ ⇒ $"+U+"-"+i+"="+(U-i)+"$",GFV({k:2,lab:{a:"?",ab:String(i),b:"?",out:"?"},cap:["n(U) = "+U,"n(A) = "+a+" · n(B) = "+b]}))}]);
vx(22,3,[
 function(){var t=set10Three();return K("set10_3v",t.txt+"រកចំនួនសិស្ស ៖ រៀនតែ $M$ · រៀន $M$ និង $P$ ប៉ុន្តែមិនរៀន $C$ · មិនរៀនមុខវិជ្ជាណាមួយ · រៀនតែមួយមុខ",t.a,t.s,t.f)}]);
P4[22].push(function(){var t=set10Three();return K("g10sp_three",t.txt+"រកចំនួនសិស្ស ៖ រៀនតែ $M$ · រៀន $M$ និង $P$ ប៉ុន្តែមិនរៀន $C$ · មិនរៀនមុខវិជ្ជាណាមួយ · រៀនតែមួយមុខ",t.a,t.s,t.f)});
/* ២.២ សំណុំ (កែ ២០២៦-១១-២៦) — kd = g10s_… (PISA = g10sp_…) · ចម្លើយ fill-in (num) ទាំងអស់ (១ = ពិត/អនន្ត · ០ = មិនពិត)
   កម្រិតបង្ហាញ ២ (គន្លឹះ 5) និង ៤ (គន្លឹះ 6) មានបញ្ជីផ្ទាល់ខ្លួន (មិនប្រើ fill56) */
function sst(a){return"$\\{"+a.join(" , ")+"\\}$"}
function inter(a,b){return a.filter(function(x){return b.indexOf(x)>=0})}
function uni(a,b){return a.concat(b.filter(function(x){return a.indexOf(x)<0}))}
var INF=[["$\\{x\\in\\mathbb N\\mid x<9\\}$",0],["$\\{x\\in\\mathbb Z\\mid |x|\\le4\\}$",0],["សំណុំចែកនៃ $12$",0],["សំណុំចំនួនបឋមតូចជាង $20$",0],["$\\{x\\in\\mathbb N\\mid x>5\\}$",1],["សំណុំពហុគុណនៃ $3$ ក្នុង $\\mathbb N$",1],["$\\{x\\in\\mathbb R\\mid0<x<1\\}$",1],["សំណុំចំនួនគូវិជ្ជមាន",1],["$\\{x\\in\\mathbb Z\\mid x<0\\}$",1],["សំណុំអក្សរក្នុងពាក្យ «គណិត»",0]];
var G22={
 emp:function(){var m=ri(1,9),sq=Math.random()<.5,k=sq?m*m:m*m+ri(1,2*m),n=sq?1:0;
   return K("g10s_emp","គេឱ្យសំណុំ $A=\\{x\\in\\mathbb N\\mid x^2="+k+"\\}$ ។ រកចំនួនធាតុ $n(A)$ (បើ $A=\\emptyset$ នោះ $n(A)=0$)",[A(n,null,"num","n(A) =")],sq?"$x="+m+"$ ជាចំនួនគត់ធម្មជាតិ ⇒ $A=\\{"+m+"\\}$ ⇒ $n(A)=1$":"គ្មានចំនួនគត់ណាដែល $x^2="+k+"$ ⇒ $A=\\emptyset$ ⇒ $n(A)=0$")},
 inf:function(){var L=shf(INF).slice(0,5),n=L.filter(function(e){return e[1]}).length;
   return K("g10s_inf","ក្នុងចំណោមសំណុំ ៖ (១) "+L[0][0]+" (២) "+L[1][0]+" (៣) "+L[2][0]+" (៤) "+L[3][0]+" (៥) "+L[4][0]+" ។ តើមានប៉ុន្មានជាសំណុំអនន្ត? (សំណុំរាប់អស់ មានចំនួនធាតុកំណត់)",[A(n,null,"num","ចំនួនសំណុំអនន្ត =")],L.map(function(e,i){return"("+(i+1)+") "+(e[1]?"អនន្ត":"រាប់អស់")}).join(" · ")+" ⇒ $"+n+"$")},
 eq:function(){var m=ri(2,4),n=ri(0,5),x0=ri(1,8),v=m*x0+n,p=v+ri(1,3),q=v+ri(4,7);
   return K("g10s_eq","គេឱ្យ $A=\\{"+poly([m,n])+" , "+p+" , "+q+"\\}$ និង $B=\\{"+v+" , "+p+" , "+q+"\\}$ ។ រក $x$ ដើម្បីឱ្យ $A=B$",[A(x0,null,"num","x =")],"$A=B$ ⇒ $"+poly([m,n])+"="+v+"$ ⇒ $x="+x0+"$")},
 psub:function(){var n=ri(2,6);return K("g10s_psub","សំណុំ $A$ មាន $"+n+"$ ធាតុ ។ រកចំនួនសំណុំរងផ្ទាល់នៃ $A$ ($B\\subset A$ ដែល $B\\ne A$) និងចំនួនសំណុំរងផ្ទាល់មិនទទេ",[A(Math.pow(2,n)-1,null,"num","សំណុំរងផ្ទាល់ ="),A(Math.pow(2,n)-2,null,"num","មិនទទេ =")],"សំណុំរងទាំងអស់ $2^{"+n+"}="+Math.pow(2,n)+"$ ⇒ ដក $A$ ⇒ $"+(Math.pow(2,n)-1)+"$ ⇒ ដក $\\emptyset$ ទៀត ⇒ $"+(Math.pow(2,n)-2)+"$")},
 comp:function(){var U=ri(20,60),a=ri(3,U-3);return K("g10s_comp","ដោយ $n(U)="+U+"$ និង $n(A)="+a+"$ ។ រក $n(\\overline{A})$ , $n(A\\cap\\overline{A})$ និង $n(A\\cup\\overline{A})$",[A(U-a,null,"num","n(Ā) ="),A(0,null,"num","n(A∩Ā) ="),A(U,null,"num","n(A∪Ā) =")],"$n(\\overline A)=n(U)-n(A)="+(U-a)+"$ · $A\\cap\\overline A=\\emptyset$ ⇒ $0$ · $A\\cup\\overline A=U$ ⇒ $"+U+"$")},
 disj:function(){var a=ri(3,20),b=ri(3,20);return K("g10s_disj","សំណុំ $A$ និង $B$ ដាច់គ្នា ($A\\cap B=\\emptyset$) ដែល $n(A)="+a+"$ និង $n(B)="+b+"$ ។ រក $n(A\\cap B)$ និង $n(A\\cup B)$",[A(0,null,"num","n(A∩B) ="),A(a+b,null,"num","n(A∪B) =")],"ដាច់គ្នា ⇒ $n(A\\cap B)=0$ ⇒ $n(A\\cup B)="+a+"+"+b+"="+(a+b)+"$")},
 dm2:function(){var U=ri(30,80),a=ri(10,25),b=ri(10,25),c=ri(2,Math.min(a,b)-2);if(a+b-c>U)U=a+b-c+ri(1,10);
   return K("g10s_dm2","$n(U)="+U+"$ , $n(A)="+a+"$ , $n(B)="+b+"$ , $n(A\\cap B)="+c+"$ ។ រក $n(\\overline{A\\cup B})$ និង $n(\\overline{A\\cap B})$",[A(U-(a+b-c),null,"num","មិនក្នុង A∪B ="),A(U-c,null,"num","មិនក្នុង A∩B =")],"$n(A\\cup B)="+(a+b-c)+"$ ⇒ $n(\\overline{A\\cup B})="+(U-(a+b-c))+"$ · $n(\\overline{A\\cap B})="+U+"-"+c+"="+(U-c)+"$ (ដឺម៉ហ្គង់)")},
 dist:function(){var A1=rset(ri(4,6),1,12),B1=rset(ri(4,6),1,12),C1=rset(ri(4,6),1,12),t=Math.random()<.5,l,r;
   if(t){l=inter(A1,uni(B1,C1));r=uni(inter(A1,B1),inter(A1,C1))}else{l=uni(A1,inter(B1,C1));r=inter(uni(A1,B1),uni(A1,C1))}
   return K("g10s_dist","គេឱ្យ $A="+sst(A1).slice(1,-1)+"$ , $B="+sst(B1).slice(1,-1)+"$ , $C="+sst(C1).slice(1,-1)+"$ ។ រក $n\\big("+(t?"A\\cap(B\\cup C)":"A\\cup(B\\cap C)")+"\\big)$ និង $n\\big("+(t?"(A\\cap B)\\cup(A\\cap C)":"(A\\cup B)\\cap(A\\cup C)")+"\\big)$",[A(l.length,null,"num","ខាងឆ្វេង ="),A(r.length,null,"num","ខាងស្ដាំ =")],"លក្ខណៈបំបែក ⇒ ពីរមានចំនួនធាតុស្មើគ្នា $="+l.length+"$")},
 assoc:function(){var A1=rset(ri(4,6),1,12),B1=rset(ri(4,6),1,12),C1=rset(ri(4,6),1,12),n1=uni(A1,uni(B1,C1)).length,n2=inter(A1,inter(B1,C1)).length;
   return K("g10s_assoc","គេឱ្យ $A="+sst(A1).slice(1,-1)+"$ , $B="+sst(B1).slice(1,-1)+"$ , $C="+sst(C1).slice(1,-1)+"$ ។ ដោយប្រើលក្ខណៈផ្តុំ រក $n\\big(A\\cup(B\\cup C)\\big)$ និង $n\\big((A\\cap B)\\cap C\\big)$",[A(n1,null,"num","n(A∪B∪C) ="),A(n2,null,"num","n(A∩B∩C) =")],"លក្ខណៈផ្តុំ ⇒ $A\\cup(B\\cup C)=(A\\cup B)\\cup C$ មាន $"+n1+"$ ធាតុ · ប្រសព្វទាំងបី មាន $"+n2+"$ ធាតុ")}
};
vx(22,1,[G22.emp,G22.inf,G22.psub]);
vx(22,2,[G22.comp,G22.dm2,G22.eq,G22.disj]);
vx(22,3,[G22.dist,G22.assoc,G22.dm2,G22.eq]);
(function(){var g1=G[22][1],g2=G[22][2];
  function lvs(lv,L){G[22][lv]=function(){return pick(L)()}}
  lvs(5,[G22.emp,G22.inf,G22.disj,G22.comp,G22.psub,g1]);
  lvs(6,[G22.eq,G22.dm2,G22.dist,G22.assoc,G22.comp,g2]);
})();
P4[22].push(
 function(){var N=ri(40,120),a=ri(10,N-20),c=ri(5,Math.min(a,N-a-5)),b=ri(c+2,N-a+c-2),u=a+b-c;
   return K("g10sp_cust","🛍️ ស្ទង់មតិអតិថិជន $"+N+"$ នាក់៖ $"+a+"$ នាក់ទិញនំ · $"+b+"$ នាក់ទិញភេសជ្ជៈ · $"+c+"$ នាក់ទិញទាំងពីរ។ (ក) ទិញតែនំ? (ខ) មិនទិញអ្វីសោះ?",[A(a-c,null,"num","(ក) ="),A(N-u,null,"num","(ខ) =")],"តែនំ $="+a+"-"+c+"="+(a-c)+"$ · ទិញយ៉ាងតិចមួយ $="+u+"$ ⇒ មិនទិញ $="+N+"-"+u+"="+(N-u)+"$")},
 function(){var N=ri(300,900),a=ri(50,150),b=ri(50,150);
   return K("g10sp_comp","🚌 សាលាមានសិស្ស $"+N+"$ នាក់ ។ $"+a+"$ នាក់ជិះម៉ូតូ និង $"+b+"$ នាក់ជិះកង់ (គ្មានអ្នកណាជិះទាំងពីរ ដូច្នេះដាច់គ្នា) ។ (ក) មិនជិះម៉ូតូ? (ខ) ដើរជើង (មិនជិះទាំងពីរ)?",[A(N-a,null,"num","(ក) ="),A(N-a-b,null,"num","(ខ) =")],"$n(\\overline A)="+N+"-"+a+"="+(N-a)+"$ · $n(A\\cup B)="+a+"+"+b+"="+(a+b)+"$ ⇒ $"+N+"-"+(a+b)+"="+(N-a-b)+"$")});
/* ២.៣ ចំនួន (កែ ២០២៦-១១-២៥) — ៦ កម្រិត តាមសៀវភៅក្រសួង · ប្រអប់បំពេញចម្លើយ (គ្មាន MCQ) · kd = g10n_… ឬ s10_/abs10_
   ចំណុច ១ ចំនួនពិត · តម្លៃដាច់ខាត · ចំណែកថ្នាក់ | ចំណុច ២ រ៉ាឌីកាល់ | ចំណុច ៣ ប្រព័ន្ធរបាប់គោល ១០ · ២
   កម្រិតបង្ហាញ ១–៥ = គន្លឹះ 1·5·2·6·3 (មិនប្តូរលេខគន្លឹះ) · PISA = P4[23] */
function cf(n){return n===1?"":String(n)}
function shf(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t}return a}
function b2(n){return n.toString(2)}
function bt(s){return"("+s+")_2"}
var NSET=[["5","n"],["12","n"],["0","w"],["-3","z"],["-8","z"],["\\dfrac{3}{4}","q"],["0{,}25","q"],["-1{,}5","q"],["0{,}\\overline{3}","q"],["\\sqrt{2}","i"],["\\pi","i"],["\\sqrt{7}","i"],["\\sqrt{16}","n"]];
var CLS=[["0",1],["3",1],["\\pi",0],["\\sqrt{8}",0],["\\sqrt{0{,}16}",1],["\\sqrt{25}",1],["\\sqrt{0{,}09}",1],["\\dfrac{2}{3}",1],["-\\dfrac{7}{5}",1],["\\sqrt{12}",0],["\\sqrt{3}",0],["0{,}\\overline{7}",1],["\\sqrt{\\dfrac{9}{4}}",1],["\\sqrt{\\dfrac{2}{9}}",0],["-\\sqrt{5}",0]];
var CMP2=[];[2,3,5,6,7].forEach(function(p){for(var q=5;q<=30;q++)if(Math.sqrt(q)%1!==0&&Math.abs(1+Math.sqrt(p)-Math.sqrt(q))>.1)CMP2.push([p,q])});
var CMP1=[];[[2,7,3,3],[3,5,2,7],[2,5,3,2],[4,3,3,5],[5,2,2,6],[3,6,4,2],[2,11,5,2],[6,3,3,7]].forEach(function(e){CMP1.push(e)});
vx(23,1,[
 function(){var t=ri(0,1),a=ri(2,20),b=ri(2,20);
   if(t===0)return K("g10n_abs1","គណនាតម្លៃដាច់ខាត $|-"+a+"|$ ហើយ $|"+a+"-(-"+a+")|$ ",[A(a,null,"num","|-"+a+"| ="),A(2*a,null,"num","|"+a+"-(-"+a+")| =")],"$|-a|=a$ ⇒ $|-"+a+"|="+a+"$ · $|"+a+"-(-"+a+")|=|"+(2*a)+"|="+(2*a)+"$");
   return K("g10n_abs1","គណនា $|"+(a+b)+"-"+(a+b+1)+"|+|-"+b+"|$",[A(1+b,null,"num","=")],"$|-1|+|-"+b+"|=1+"+b+"="+(1+b)+"$")},
 function(){var a=nz(-9,9),b=nz(-9,9),c=nz(-9,9),t=ri(0,1),v;
   if(t===0){v=Math.abs(a-b)+Math.abs(c);return K("abs10_val","គណនា $|"+a+"-"+sgp(b)+"|+|"+c+"|$",[A(v,null,"num","=")],"$|"+(a-b)+"|+|"+c+"|="+Math.abs(a-b)+"+"+Math.abs(c)+"="+v+"$")}
   var d=nz(-9,9);v=Math.abs(a)*Math.abs(b)-Math.abs(c-d);return K("abs10_val","គណនា $|"+a+"|\\cdot|"+b+"|-|"+c+"-"+sgp(d)+"|$",[A(v,null,"num","=")],"$"+Math.abs(a)+"\\cdot"+Math.abs(b)+"-|"+(c-d)+"|="+v+"$")},
 function(){var k=ri(2,12),s=pick([1,-1]);return K("g10n_sq","ដោយដឹងថា $|a|="+k+"$ ។ គណនា $a^2$ (ប្រើ $|a|^2=a^2$)",[A(k*k,null,"num","a² =")],"$a^2=|a|^2="+k+"^2="+(k*k)+"$")},
 function(){var it=shf(CLS).slice(0,6),r=it.filter(function(e){return e[1]}).length;
   return K("g10n_cls","ក្នុងចំនួន $"+it.map(function(e){return e[0]}).join(" ;\\ ")+"$ តើមានប៉ុន្មានជាចំនួនសនិទាន ($\\mathbb Q$) ហើយប៉ុន្មានជាចំនួនអសនិទាន ($\\mathbb I$) ?",[A(r,null,"num","សនិទាន ="),A(6-r,null,"num","អសនិទាន =")],"សនិទាន ៖ ចំនួនគត់ ប្រភាគ ទសភាគកំណត់ ឬខួប និងឫសនៃការ៉េប្រាកដ · អសនិទាន ៖ ទសភាគអនន្តគ្មានខួប ($\\pi$ ឬ $\\sqrt{\\text{មិនមែនការ៉េប្រាកដ}}$) ⇒ សនិទាន $"+r+"$ · អសនិទាន $"+(6-r)+"$")},
 function(){var cnt=0,it=shf(NSET).slice(0,6);it.forEach(function(e){if(e[1]==="n"||e[1]==="w"||e[1]==="z")cnt++});
   return K("g10n_zc","ក្នុងចំនួន $"+it.map(function(e){return e[0]}).join(" ;\\ ")+"$ តើមានប៉ុន្មានជាចំនួនគត់ ($\\mathbb Z$) ?",[A(cnt,null,"num","ចំនួន =")],"ចំនួនគត់គឺ $\\dots,-2,-1,0,1,2,\\dots$ (រួមទាំង $0$ និងអវិជ្ជមាន) ⇒ មាន $"+cnt+"$ ចំនួន")},
 function(){var kk=nz(-6,6),e=pick([1,-1]);
   return K("g10n_cond","ដោយដឹងថា $"+(e===1?"x>"+kk:"x<"+kk)+"$ ។ សរសេរ $|x"+sg(-kk,0)+"|$ ជាទម្រង់ $ax+b$ ។ រក $a$ និង $b$",[A(e,null,"num","a ="),A(-e*kk,null,"num","b =")],"$x"+sg(-kk,0)+(e===1?">0":"<0")+"$ ⇒ $|x"+sg(-kk,0)+"|="+(e===1?"":"-")+"(x"+sg(-kk,0)+")="+(e===1?"":"-")+"x"+sg(-e*kk,0)+"$")}]);
vx(23,5,[
 function(){var t=ri(0,1),k=ri(2,12),a=ri(-6,6),b=ri(1,8);
   if(t===0)return K("g10n_abeq","ដោះស្រាយសមីការ $|x|="+k+"$ ($x_1<x_2$)",[A(-k,null,"num","x₁ ="),A(k,null,"num","x₂ =")],"$|x|="+k+"$ ⇒ $x="+k+"$ ឬ $x="+(-k)+"$");
   return K("g10n_abeq","ដោះស្រាយ $|x"+sg(-a,0)+"|="+b+"$ ($x_1<x_2$)",[A(a-b,null,"num","x₁ ="),A(a+b,null,"num","x₂ =")],"$x"+sg(-a,0)+"=\\pm"+b+"$ ⇒ $x="+(a-b)+"$ ឬ $x="+(a+b)+"$")},
 function(){var a=ri(1,4),m=ri(-5,5),r=ri(1,5),b=-a*m,c=a*r,x1=m-r,x2=m+r,t=ri(0,1);
   return K("abs10_eq","ដោះស្រាយ $|"+polyT([a,b])+"|="+c+"$ ។ "+(t?"រក $x_1<x_2$":"រកផលបូក $S=x_1+x_2$ និងផលគុណ $P=x_1x_2$ នៃឫស"),t?[A(x1,null,"num","x₁ ="),A(x2,null,"num","x₂ =")]:[A(x1+x2,null,"num","S ="),A(x1*x2,null,"num","P =")],"$"+polyT([a,b])+"=\\pm"+c+"$ ⇒ $x="+x1+"$ ឬ $x="+x2+"$"+(t?"":" ⇒ $S="+(x1+x2)+"$ , $P="+x1*x2+"$"))},
 function(){var p=ri(2,6),k=pick([2,3,5,6,7]);return K("g10n_sx","សរសេរ $\\sqrt{"+(p*p*k)+"}$ ជាទម្រង់ $a\\sqrt b$ ($b$ តូចបំផុត)",[A(p,null,"num","a ="),A(k,null,"num","b =")],"$\\sqrt{"+(p*p*k)+"}=\\sqrt{"+(p*p)+"\\times"+k+"}="+p+"\\sqrt{"+k+"}$")},
 function(){var p=ri(2,4),q=ri(1,5),k=pick([2,3,5,6,7]),c=fr(2*p-2*q+1,2);
   return K("g10n_sx2","គណនា $\\sqrt{"+(p*p*k)+"}-\\sqrt{"+(q*q*k)+"}+\\sqrt{\\dfrac{"+k+"}{4}}=c\\sqrt{"+k+"}$ ។ រក $c$",[A(c.s,c.t,"num","c =")],"$"+p+"\\sqrt{"+k+"}-"+cf(q)+"\\sqrt{"+k+"}+\\dfrac{1}{2}\\sqrt{"+k+"}=("+p+"-"+q+"+\\dfrac12)\\sqrt{"+k+"}$ ⇒ $c="+c.t+"$")},
 function(){var t=ri(0,1),v,q,s;
   if(t===0){var e=pick(CMP1),L=e[0]*e[0]*e[1],R=e[2]*e[2]*e[3];if(L===R)e=[2,7,3,3],L=28,R=27;v=L>R?1:0;
     return K("g10n_cmpr","ប្រៀបធៀប $"+cf(e[0])+"\\sqrt{"+e[1]+"}$ និង $"+cf(e[2])+"\\sqrt{"+e[3]+"}$ ។ ឆ្លើយ $1$ បើ ចំនួនទី១ ធំជាង · $0$ បើ តូចជាង",[A(v,null,"num","ចម្លើយ =")],"យកទៅការ៉េ ៖ $"+L+"$ និង $"+R+"$ ⇒ "+(v?"ចំនួនទី១ ធំជាង ⇒ ១":"ចំនួនទី១ តូចជាង ⇒ ០"))}
   var c=pick(CMP2);v=1+Math.sqrt(c[0])>Math.sqrt(c[1])?1:0;
   return K("g10n_cmpr","ប្រៀបធៀប $1+\\sqrt{"+c[0]+"}$ និង $\\sqrt{"+c[1]+"}$ ។ ឆ្លើយ $1$ បើ ចំនួនទី១ ធំជាង · $0$ បើ តូចជាង",[A(v,null,"num","ចម្លើយ =")],"ចំនួនទាំងពីរវិជ្ជមាន ⇒ យកទៅការ៉េ ៖ $(1+\\sqrt{"+c[0]+"})^2="+(1+c[0])+"+2\\sqrt{"+c[0]+"}\\approx"+r2(1+c[0]+2*Math.sqrt(c[0]))+"$ និង $"+c[1]+"$ ⇒ "+(v?"១":"០"))},
 function(){var a=ri(2,12);return K("g10n_rt1","គណនា $\\sqrt{(-"+a+")^2}$",[A(a,null,"num","=")],"$\\sqrt{a^2}=|a|$ ⇒ $\\sqrt{"+(a*a)+"}=|-"+a+"|="+a+"$")},
 function(){var P=pick([[2,8],[3,12],[5,20],[2,18],[3,27],[7,28],[2,32]]),m=Math.round(Math.sqrt(P[0]*P[1]));return K("g10n_rt2","គណនា $\\sqrt{"+P[0]+"}\\times\\sqrt{"+P[1]+"}$ (ប្រើ $\\sqrt a\\sqrt b=\\sqrt{ab}$)",[A(m,null,"num","=")],"$\\sqrt{"+P[0]+"\\times"+P[1]+"}=\\sqrt{"+(m*m)+"}="+m+"$")}]);
vx(23,2,[
 function(){var a=ri(1,5),b=ri(1,5),c=ri(1,5),d=ri(1,5),A1=2*a*c-3*b*d,B1=b*c-a*d;
   return K("g10n_exp1","ពន្លាត និងសម្រួល $("+cf(a)+"\\sqrt2+"+cf(b)+"\\sqrt3)("+cf(c)+"\\sqrt2-"+cf(d)+"\\sqrt3)$ ជាទម្រង់ $A+B\\sqrt6$ ។ រក $A$ និង $B$",[A(A1,null,"num","A ="),A(B1,null,"num","B =")],"$"+(2*a*c)+"-"+(a*d)+"\\sqrt6+"+(b*c)+"\\sqrt6-"+(3*b*d)+"$ ⇒ $A="+A1+"$ , $B="+B1+"$")},
 function(){var P=pick([[2,3],[2,5],[3,5],[2,7],[3,7],[5,7]]),p=P[0],q=P[1],m=pick([1,-1]);
   return K("g10n_sqb","ពន្លាត $(\\sqrt{"+p+"}"+(m===1?"+":"-")+"\\sqrt{"+q+"})^2$ ជាទម្រង់ $A+B\\sqrt{"+(p*q)+"}$ ។ រក $A$ និង $B$",[A(p+q,null,"num","A ="),A(2*m,null,"num","B =")],"$(\\sqrt a"+(m===1?"+":"-")+"\\sqrt b)^2=a+b"+(m===1?"+":"-")+"2\\sqrt{ab}$ ⇒ $A="+(p+q)+"$ , $B="+(2*m)+"$")},
 function(){var a=ri(2,4),k=pick([2,3,5,7]),N=a*k;return K("g10n_rat1","បំបាត់រ៉ាឌីកាល់ពីភាគបែង $\\dfrac{1}{\\sqrt{"+(a*a*k)+"}}$ ។ សរសេរជា $\\dfrac{\\sqrt{"+k+"}}{N}$ ហើយរក $N$",[A(N,null,"num","N =")],"$\\sqrt{"+(a*a*k)+"}="+a+"\\sqrt{"+k+"}$ ⇒ $\\dfrac{1}{"+a+"\\sqrt{"+k+"}}=\\dfrac{\\sqrt{"+k+"}}{"+N+"}$")},
 function(){var P=pick([[5,2],[3,2],[7,3],[5,3],[7,2]]),p=P[0],q=P[1],d=p-q;
   return K("g10n_rat2","បំបាត់រ៉ាឌីកាល់ពីភាគបែង $\\dfrac{\\sqrt{"+p+"}}{\\sqrt{"+p+"}-\\sqrt{"+q+"}}=\\dfrac{A+\\sqrt{B}}{C}$ ។ រក $A$ , $B$ , $C$",[A(p,null,"num","A ="),A(p*q,null,"num","B ="),A(d,null,"num","C =")],"គុណនឹងកន្សោមឆ្លាស់ $\\sqrt{"+p+"}+\\sqrt{"+q+"}$ ⇒ $\\dfrac{"+p+"+\\sqrt{"+(p*q)+"}}{"+p+"-"+q+"}$ ⇒ $C="+d+"$")},
 function(){var a=ri(2,9),k=pick(NS);return K("s10_mulr","គណនា $("+a+"+\\sqrt{"+k+"})("+a+"-\\sqrt{"+k+"})$",[A(a*a-k,null,"num","=")],"$"+a+"^2-"+k+"="+(a*a-k)+"$")},
 function(){var b=ri(1,3),k=pick(NS.filter(function(v){return v!==b*b})),d=k-b*b,m=nz(1,4),a=d*m;return K("s10_conj","សម្រួលភាគបែង $\\dfrac{"+a+"}{\\sqrt{"+k+"}-"+b+"}$",[A(m+"*(sqrt("+k+")+"+b+")",(m===1?"":m===-1?"-":m)+"(\\sqrt{"+k+"}+"+b+")","num","=")],"គុណនឹងកន្សោមឆ្លាស់ ៖ $\\dfrac{"+a+"(\\sqrt{"+k+"}+"+b+")}{"+k+"-"+(b*b)+"}$")}]);
vx(23,6,[
 function(){var P=pick([[3,2],[5,2],[5,3],[6,2],[7,2],[7,3],[6,5],[7,5]]),p=P[0],q=P[1];return K("s10_nest","សម្រួល $\\sqrt{"+(p+q)+"+2\\sqrt{"+(p*q)+"}}$",[A("sqrt("+p+")+sqrt("+q+")","\\sqrt{"+p+"}+\\sqrt{"+q+"}","num","=")],"$"+(p+q)+"+2\\sqrt{"+(p*q)+"}=(\\sqrt{"+p+"}+\\sqrt{"+q+"})^2$")},
 function(){var P=pick([[3,2],[5,2],[5,3],[7,2],[7,3],[8,3],[6,5],[7,5]]),p=P[0],q=P[1];return K("g10n_nm","សម្រួល $\\sqrt{"+(p+q)+"-2\\sqrt{"+(p*q)+"}}$ (ប្រើ $\\sqrt{(a+b)-2\\sqrt{ab}}=|\\sqrt a-\\sqrt b|$)",[A("sqrt("+p+")-sqrt("+q+")","\\sqrt{"+p+"}-\\sqrt{"+q+"}","num","=")],"$"+(p+q)+"-2\\sqrt{"+(p*q)+"}=(\\sqrt{"+p+"}-\\sqrt{"+q+"})^2$ ហើយ $\\sqrt{"+p+"}>\\sqrt{"+q+"}$ ⇒ $\\sqrt{"+p+"}-\\sqrt{"+q+"}$")},
 function(){var P=pick([[6,1],[5,2],[10,1],[3,2],[7,2],[5,1],[3,1],[7,1]]),p=P[0],q=P[1],qs=q===1?"1":"\\sqrt{"+q+"}";
   return K("g10n_nest3","សម្រួល $\\sqrt{"+(p+q)+"+\\sqrt{"+(4*p*q)+"}}$",[A(q===1?"sqrt("+p+")+1":"sqrt("+p+")+sqrt("+q+")","\\sqrt{"+p+"}+"+qs,"num","=")],"$\\sqrt{"+(4*p*q)+"}=2\\sqrt{"+(p*q)+"}$ ⇒ $"+(p+q)+"+2\\sqrt{"+(p*q)+"}=(\\sqrt{"+p+"}+"+qs+")^2$")},
 function(){var n=[],i;n.push(ri(1,9));for(i=1;i<9;i++)n.push(ri(0,9));var N=n.join(""),nm=pick([[4,"ម៉ឺន"],[5,"សែន"],[6,"លាន"],[7,"កោដិ"],[8,"ដប់កោដិ"]]),d=n[8-nm[0]];
   return K("g10n_nm10","ក្នុងចំនួន $"+mo(N)+"$ តើខ្ទង់ «"+nm[1]+"» (តម្លៃទីតាំង $10^{"+nm[0]+"}$) ជាលេខប៉ុន្មាន ?",[A(d,null,"num","ខ្ទង់ "+nm[1]+" =")],"ខ្ទង់ឯកតា $=10^0$ ពីស្តាំ · ខ្ទង់ "+nm[1]+" $=10^{"+nm[0]+"}$ ⇒ លេខ $"+d+"$")},
 function(){var a=ri(1,9),b=ri(0,9),c=ri(0,9),d=ri(0,9),N=a*1000+b*100+c*10+d;return K("g10n_ex10","សរសេរចំនួនតាមទម្រង់ពន្លាត $"+a+"\\times10^3+"+b+"\\times10^2+"+c+"\\times10+"+d+"$ ជាចំនួនធម្មតា",[A(N,null,"num","N =")],"$"+(a*1000)+"+"+(b*100)+"+"+(c*10)+"+"+d+"="+N+"$")},
 function(){var a=ri(1,9),b=ri(0,9),c=ri(0,9),d=ri(0,9);return K("g10n_exp4","សរសេរ $\\overline{"+a+b+c+d+"}_{10}$ ជាទម្រង់ពន្លាត $a\\times10^3+b\\times10^2+c\\times10+d$ ។ រក $a,b,c,d$",[A(a,null,"num","a ="),A(b,null,"num","b ="),A(c,null,"num","c ="),A(d,null,"num","d =")],"$"+a+b+c+d+"="+a+"\\times10^3+"+b+"\\times10^2+"+c+"\\times10+"+d+"$")}]);
vx(23,3,[
 function(){var n=ri(20,255),s=b2(n),e=s.split("").map(function(c,i){return c==="1"?"2^{"+(s.length-1-i)+"}":null}).filter(Boolean).join("+");return K("g10n_b2d","បំប្លែង $"+bt(s)+"$ ទៅគោល ១០ (ទម្រង់ពន្លាតគោល ២)",[A(n,null,"num","=")],"$"+bt(s)+"="+e+"="+n+"$")},
 function(){var n=ri(9,70),s=b2(n);return K("g10n_d2b","បំប្លែង $"+n+"$ (គោល ១០) ទៅគោល ២ (ចែកនឹង $2$ ជាបន្តបន្ទាប់) ។ សរសេរតែលេខគោល ២",[A(s,bt(s),"num","(…)₂ =")],"ចែក $"+n+"$ នឹង $2$ ជាបន្តបន្ទាប់ ហើយយកសំណល់ពីក្រោមឡើងលើ ⇒ $"+bt(s)+"$")},
 function(){var a=ri(5,30),b=ri(5,30),s=b2(a+b);return K("g10n_add2","គណនាក្នុងគោល ២ ៖ $"+bt(b2(a))+"+"+bt(b2(b))+"$ ។ សរសេរតែលេខគោល ២",[A(s,bt(s),"num","(…)₂ =")],"$"+bt(b2(a))+"="+a+"$ , $"+bt(b2(b))+"="+b+"$ ⇒ $"+(a+b)+"="+bt(s)+"$ (ឬបូកតាមខ្ទង់ ដោយ $1+1=10_2$)")},
 function(){var a=ri(15,60),b=ri(3,a-3),s=b2(a-b);return K("g10n_sub2","គណនាក្នុងគោល ២ ៖ $"+bt(b2(a))+"-"+bt(b2(b))+"$ ។ សរសេរតែលេខគោល ២",[A(s,bt(s),"num","(…)₂ =")],"$"+bt(b2(a))+"="+a+"$ , $"+bt(b2(b))+"="+b+"$ ⇒ $"+(a-b)+"="+bt(s)+"$")}]);
/* 🌍 PISA ២.៣ — ជីវិតពិត */
P4[23].push(function(){var a=ri(1,9),b=ri(0,9),c=ri(0,9),d=ri(0,9),N=a*1000+b*100+c*10+d;
    return Q("🖊️ រោងចក្រវេចខ្ចប់ប៊ិក $"+mo(N)+"$ ដើម ៖ ប្រអប់ធំដាក់ $1\\,000$ ដើម · ប្រអប់មធ្យម $100$ ដើម · កញ្ចប់តូច $10$ ដើម · ដែលសល់ជាប៊ិកមួយៗ (ប្រើចំនួនប្រអប់ឱ្យតិចបំផុត) ។ រកចំនួនប្រអប់ធំ មធ្យម កញ្ចប់តូច និងប៊ិកដែលសល់",[A(a,null,"num","ប្រអប់ធំ ="),A(b,null,"num","ប្រអប់មធ្យម ="),A(c,null,"num","កញ្ចប់តូច ="),A(d,null,"num","សល់ =")],"ទម្រង់ពន្លាតគោល ១០ ៖ $"+N+"="+a+"\\times10^3+"+b+"\\times10^2+"+c+"\\times10+"+d+"$")},
 function(){var n=ri(20,100),s=b2(n),k=s.split("").filter(function(c){return c==="1"}).length;
    return Q("🍬 ស្ករគ្រាប់ $"+n+"$ គ្រាប់ ត្រូវដាក់ក្នុងប្រអប់ដែលមានទំហំ $1,2,4,8,16,32,64$ គ្រាប់ ដោយប្រើប្រអប់ម្យ៉ាងមិនលើសមួយ ។ រកចំនួនប្រអប់ដែលត្រូវប្រើ និងសរសេរ $"+n+"$ ជាគោល ២",[A(k,null,"num","ចំនួនប្រអប់ ="),A(s,bt(s),"num","(…)₂ =")],"$"+n+"="+bt(s)+"$ ⇒ ខ្ទង់ $1$ មាន $"+k+"$ ⇒ ប្រើ $"+k+"$ ប្រអប់")},
 function(){var a=ri(1,9),b=ri(0,9),c=ri(0,9),N=a*100000000+b*10000000+c*1000000;
    return Q("🏛️ ថវិកាមួយមាន $"+a+"$ ដប់កោដិ $+\\ "+b+"$ កោដិ $+\\ "+c+"$ លាន រៀល (១ កោដិ $=10^7$ · ១ ដប់កោដិ $=10^8$ · ១ លាន $=10^6$) ។ រកថវិកាសរុបជារៀល",[A(N,null,"num","រៀល =")],"$"+a+"\\times10^8+"+b+"\\times10^7+"+c+"\\times10^6="+mo(N)+"$")},
 function(){var c=ri(2,6),k=pick([2,5,10]),m=k===2?1:k===5?2:3;
    return Q("🌳 ចំណតរថយន្តជាបន្ទាត់ត្រង់មួយ ត្រូវកាត់ចំណតរាងត្រីកោណកែងដែលជ្រុងកែងវែង $"+c+"$ m និង $"+(c*m)+"$ m ។ រកប្រវែងផ្លូវកាត់ (អ៊ីប៉ូតេនុស) ជា $a\\sqrt b$ m",[A(c,null,"num","a ="),A(k,null,"num","b =")],"$\\sqrt{"+c+"^2+"+(c*m)+"^2}=\\sqrt{"+(c*c*k)+"}="+c+"\\sqrt{"+k+"}$ m")});
P4[23].push(function(){var L=ri(10,80),e=ri(1,6);return Q("📏 ផ្នែកម៉ាស៊ីនមួយមានប្រវែងកំណត់ $L="+L+"$ mm ដោយអាចមានកំហុស $\\varepsilon="+e+"$ mm ពោលគឺ $|x-"+L+"|\\le"+e+"$ ។ រកចន្លោះប្រវែងដែលទទួលយក $\\alpha\\le x\\le\\beta$",[A(L-e,null,"num","α ="),A(L+e,null,"num","β =")],"$"+(L-e)+"\\le x\\le"+(L+e)+"$")},
 function(){var a=ri(1,4),m=ri(10,30),r=ri(1,5),b=-a*m,c=a*r;return Q("🌡️ ឧបករណ៍ត្រួតសីតុណ្ហភាពរក្សា $T$ ឱ្យមាន $|"+polyT([a,b])+"|\\le"+c+"$ ។ រកសីតុណ្ហភាពទាបបំផុត $\\alpha$ និងខ្ពស់បំផុត $\\beta$ (°C)",[A(m-r,null,"num","α ="),A(m+r,null,"num","β =")],"$-"+c+"\\le"+polyT([a,b])+"\\le"+c+"$ ⇒ $"+(m-r)+"\\le T\\le"+(m+r)+"$")});
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
/* ៣.១ សមីការដឺក្រេទី២ + ចំនួនកុំផ្លិច (កែ ២០២៦-១១-២៦) — kd = g10q_… (PISA = g10qp_…) · ចម្លើយ fill-in (num) ទាំងអស់ · ចម្លើយកុំផ្លិច = ប្រអប់ផ្នែកពិត + ផ្នែកនិមិត្ត
   កម្រិតបង្ហាញ ២ (គន្លឹះ 5) និង ៤ (គន្លឹះ 6) មានបញ្ជីផ្ទាល់ខ្លួន (មិនប្រើ fill56) */
function cxS(a,b){var s="";if(a!==0)s+=a;if(b!==0)s+=(b<0?"-":(s?"+":""))+(Math.abs(b)===1?"":Math.abs(b))+"i";return s||"0"}
function cxA(re,im){return[A(re,null,"num","ផ្នែកពិត ="),A(im,null,"num","ផ្នែកនិមិត្ត =")]}
var CIS=[[1,0],[0,1],[-1,0],[0,-1]];
var G31={
 ipow:function(){var n=ri(4,30),r=CIS[n%4];return K("g10q_i","គណនា $i^{"+n+"}$ ដោយ $i^2=-1$ ($i^4=1$) ហើយសរសេរជា $a+bi$",cxA(r[0],r[1]),"$"+n+"=4\\cdot"+Math.floor(n/4)+"+"+(n%4)+"$ ⇒ $i^{"+n+"}=i^{"+(n%4)+"}="+cxS(r[0],r[1])+"$")},
 sqrtneg:function(){var s=pick([2,3,5,7]),k=ri(2,6),n=k*k*s;return K("g10q_sq","សរសេរ $\\sqrt{-"+n+"}=k\\sqrt{s}\\,i$ ដែល $k>0$ ហើយ $s$ មិនមានកត្តាការ៉េ ។ រក $k$ និង $s$",[A(k,null,"num","k ="),A(s,null,"num","s =")],"$\\sqrt{-"+n+"}=\\sqrt{"+n+"}\\,i=\\sqrt{"+(k*k)+"\\cdot"+s+"}\\,i="+k+"\\sqrt{"+s+"}\\,i$")},
 eqc:function(){var x=ri(-6,6),y=ri(-6,6),a=nz(-6,6),b=nz(-6,6);return K("g10q_eqc","ចំនួនកុំផ្លិចស្មើគ្នា $a+bi=c+di\\iff a=c,\\ b=d$ ។ រក $x$ និង $y$ ដើម្បីឱ្យ $(x"+sg(a,0)+")+(y"+sg(b,0)+")i="+cxS(x+a,y+b)+"$",[A(x,null,"num","x ="),A(y,null,"num","y =")],"$x"+sg(a,0)+"="+(x+a)+"$ ⇒ $x="+x+"$ · $y"+sg(b,0)+"="+(y+b)+"$ ⇒ $y="+y+"$")},
 cadd:function(){var a=nz(-8,8),b=nz(-8,8),c=nz(-8,8),d=nz(-8,8),m=Math.random()<.5,re=m?a-c:a+c,im=m?b-d:b+d;
   return K("g10q_cadd","គណនា $("+cxS(a,b)+")"+(m?"-":"+")+"("+cxS(c,d)+")$ ហើយសរសេរជា $a+bi$",cxA(re,im),"បូក/ដកផ្នែកពិត និងផ្នែកនិមិត្ត ⇒ $"+cxS(re,im)+"$")},
 cmul:function(){var a=nz(-5,5),b=nz(-5,5),c=nz(-5,5),d=nz(-5,5);
   return K("g10q_cmul","គណនា $("+cxS(a,b)+")("+cxS(c,d)+")$ ហើយសរសេរជា $a+bi$ (ប្រើ $i^2=-1$)",cxA(a*c-b*d,a*d+b*c),"$(ac-bd)+(ad+bc)i="+cxS(a*c-b*d,a*d+b*c)+"$")},
 conj:function(){var a=nz(-7,7),b=nz(-7,7);return K("g10q_conj","ចំនួនកុំផ្លិច $z="+cxS(a,b)+"$ ។ ចំនួនឆ្លាស់ $\\overline{z}=a-bi$ ។ រកផ្នែកនិមិត្តនៃ $\\overline{z}$ និងគណនា $z\\cdot\\overline{z}$",[A(-b,null,"num","ផ្នែកនិមិត្តនៃ z̄ ="),A(a*a+b*b,null,"num","z·z̄ =")],"$\\overline z="+cxS(a,-b)+"$ · $z\\overline z=a^2+b^2="+(a*a)+"+"+(b*b)+"="+(a*a+b*b)+"$")},
 cdiv:function(){var u=ri(-4,4),v=ri(-4,4),c=nz(-3,3),d=nz(-3,3),nr=u*c-v*d,ni=u*d+v*c;
   return K("g10q_cdiv","គណនា $\\dfrac{"+cxS(nr,ni)+"}{"+cxS(c,d)+"}$ (គុណភាគយក និងភាគបែងនឹងចំនួនឆ្លាស់ $"+cxS(c,-d)+"$) ហើយសរសេរជា $a+bi$",cxA(u,v),"$\\dfrac{ac+bd}{c^2+d^2}+\\dfrac{bc-ad}{c^2+d^2}i="+cxS(u,v)+"$")},
 cr:function(){var p=ri(-4,4),q=ri(1,5);return K("g10q_cr","ដោះស្រាយ $"+polyT([1,-2*p,p*p+q*q])+"=0$ ក្នុងសំណុំចំនួនកុំផ្លិច ($\\Delta<0$) ។ សរសេរឫស $x=p\\pm qi$ ដែល $q>0$ ។ រក $p$ និង $q$",[A(p,null,"num","p ="),A(q,null,"num","q =")],"$\\Delta="+(4*p*p-4*(p*p+q*q))+"<0$ ⇒ $x=\\dfrac{"+(2*p)+"\\pm\\sqrt{"+(-4*q*q)+"}}{2}="+p+"\\pm "+q+"i$")},
 pure2:function(){var k=ri(2,9);return K("g10q_pure2","ដោះស្រាយ $x^2+"+(k*k)+"=0$ ក្នុងចំនួនកុំផ្លិច ។ ឫសជា $x=\\pm ki$ ដែល $k>0$ ។ រក $k$",[A(k,null,"num","k =")],"$x^2=-"+(k*k)+"$ ⇒ $x=\\pm\\sqrt{"+(k*k)+"}\\,i=\\pm"+k+"i$")},
 sqc:function(){var h=nz(-6,6),c=ri(-9,9),n=h*h-c;return K("g10q_sqc","បំពេញជាការ៉េ ៖ $"+polyT([1,2*h,c])+"=0\\iff(x+h)^2=n$ ។ រក $h$ និង $n$",[A(h,null,"num","h ="),A(n,null,"num","n =")],"$"+polyT([1,2*h,h*h])+"=(x"+sg(h,0)+")^2$ ⇒ $n="+(h*h)+"-"+sgp(c)+"="+n+"$")},
 dp:function(){var a=ri(2,4),bp=nz(-5,5),c=ri(-6,6);return K("g10q_dp","សមីការ $"+polyT([a,2*bp,c])+"=0$ មាន $b=2b'$ ។ រក $b'$ ហើយគណនា $\\Delta'=b'^2-ac$",[A(bp,null,"num","b' ="),A(bp*bp-a*c,null,"num","Δ' =")],"$b'="+bp+"$ ⇒ $\\Delta'="+(bp*bp)+"-"+sgp(a)+"\\cdot"+sgp(c)+"="+(bp*bp-a*c)+"$")},
 abc0:function(){var a=ri(1,3),r2=nz(-6,6),t=Math.random()<.5,b,c,q;
   if(t){b=-a*(1+r2);c=a*r2;q="$a+b+c=0$ ⇒ $x_1=1$ , $x_2=\\dfrac ca="+r2+"$"}else{b=a*(1-r2);c=-a*r2;q="$a-b+c=0$ ⇒ $x_1=-1$ , $x_2=-\\dfrac ca="+r2+"$"}
   return K("g10q_abc0","សមីការ $"+polyT([a,b,c])+"=0$ មានឫសមួយស្មើ $"+(t?1:-1)+"$ (ដោយ $a"+(t?"+":"-")+"b+c=0$) ។ រកឫសមួយទៀត",[A(r2,null,"num","x₂ =")],q)},
 fact:function(){var a=ri(2,3),al=nz(-5,5),be=nz(-5,5);if(al>be){var t=al;al=be;be=t}
   return K("g10q_fact","ដាក់ $"+polyT([a,-a*(al+be),a*al*be])+"$ ជាទម្រង់ $a(x-\\alpha)(x-\\beta)$ ដែល $\\alpha\\le\\beta$ ។ រក $a$ , $\\alpha$ , $\\beta$",[A(a,null,"num","a ="),A(al,null,"num","α ="),A(be,null,"num","β =")],"ឫសគឺ $"+al+"$ និង $"+be+"$ ⇒ $"+a+"(x"+sg(-al,0)+")(x"+sg(-be,0)+")$")},
 sp:function(){var x1=nz(-9,9),x2=nz(-9,9);while(x2===x1)x2=nz(-9,9);if(x1>x2){var t=x1;x1=x2;x2=t}
   return K("g10q_sp","រកពីរចំនួន $u\\le v$ ដែលមានផលបូក $"+(x1+x2)+"$ និងផលគុណ $"+(x1*x2)+"$ (ជាឫសនៃ $x^2-Sx+P=0$)",[A(x1,null,"num","u ="),A(x2,null,"num","v =")],"$x^2"+co(-(x1+x2),"x")+sg(x1*x2,0)+"=0$ ⇒ $"+x1+"$ , $"+x2+"$")},
 ss:function(){var al=nz(-6,6),be=nz(-6,6),f=fr(al+be,al*be);
   return K("g10q_ss","$\\alpha$ , $\\beta$ ជាឫសនៃ $x^2"+co(-(al+be),"x")+sg(al*be,0)+"=0$ ។ គណនា $\\dfrac1\\alpha+\\dfrac1\\beta$ (មិនចាំបាច់ដោះស្រាយ)",[A(f.s,f.t,"num","=")],"$\\dfrac{\\alpha+\\beta}{\\alpha\\beta}=\\dfrac{S}{P}=\\dfrac{"+(al+be)+"}{"+(al*be)+"}="+f.t+"$")},
 cons:function(){var n=ri(2,15);return K("g10q_cons","ពីរចំនួនគត់វិជ្ជមានជាប់គ្នា មានផលគុណ $"+(n*(n+1))+"$ ។ តាងចំនួនតូចជា $x$ ($x(x+1)="+(n*(n+1))+"$) ។ រក $x$",[A(n,null,"num","x =")],"$x^2+x-"+(n*(n+1))+"=0$ ⇒ $x="+n+"$ ($x>0$)")},
 garden:function(){var w=ri(3,20),d=ri(2,12);return K("g10q_garden","ចម្ការចតុកោណកែងមួយ បណ្ដោយវែងជាងទទឹង $"+d+"$ m ហើយមានផ្ទៃ $"+(w*(w+d))+"$ m$^2$ ។ តាងទទឹង $x$ ($x(x+"+d+")="+(w*(w+d))+"$) ។ រកទទឹង $x$ (m)",[A(w,null,"num","x =")],"$x^2+"+d+"x-"+(w*(w+d))+"=0$ ⇒ $x="+w+"$ ($x>0$)")},
 ball:function(){var t1=ri(4,10),t2=ri(1,3),v=5*(t1-t2),h0=5*t1*t2;return K("g10q_ball","បាល់ត្រូវបានបោះឡើងពីកម្ពស់ $"+h0+"$ m ។ កម្ពស់ $h(t)=-5t^2+"+v+"t+"+h0+"$ (m) ។ រកពេលវេលា $t>0$ ដែលបាល់ធ្លាក់ដល់ដី ($h=0$) (វិនាទី)",[A(t1,null,"num","t =")],"$-5t^2+"+v+"t+"+h0+"=0$ ⇒ $t^2-"+(t1-t2)+"t-"+(t1*t2)+"=0$ ⇒ $(t-"+t1+")(t+"+t2+")=0$ ⇒ $t="+t1+"$")}
};
vx(31,1,[G31.ipow,G31.sqrtneg,G31.eqc,G31.cadd,G31.pure2]);
vx(31,2,[G31.conj,G31.cmul,G31.cr,G31.sqc,G31.dp]);
vx(31,3,[G31.cdiv,G31.abc0,G31.fact,G31.sp,G31.ss,G31.ball]);
(function(){var g1=G[31][1],g2=G[31][2];
  function lvs(lv,L){G[31][lv]=function(){return pick(L)()}}
  lvs(5,[G31.ipow,G31.sqrtneg,G31.eqc,G31.cadd,G31.pure2,G31.cons,g1]);
  lvs(6,[G31.conj,G31.cmul,G31.cr,G31.sqc,G31.dp,G31.garden,g2]);
})();
P4[31].push(
 function(){var L=ri(10,25),W=ri(6,L-1),x=ri(1,4);return K("g10qp_path","🌳 ចម្ការចតុកោណកែង $"+L+"\\times"+W+"$ ម មានផ្លូវដើរទទឹង $x$ ម ជុំវិញ ។ ផ្ទៃសរុបរួមទាំងផ្លូវ $("+L+"+2x)("+W+"+2x)="+((L+2*x)*(W+2*x))+"$ m$^2$ ។ រក $x$ (m)",[A(x,null,"num","x =")],"$4x^2+"+(2*(L+W))+"x-"+((L+2*x)*(W+2*x)-L*W)+"=0$ ⇒ $x="+x+"$ ($x>0$)")},
 function(){var W=ri(3,15),L=W+ri(1,10);return K("g10qp_rect","📐 ចតុកោណកែងមួយមានបរិមាត្រ $"+(2*(L+W))+"$ m និងផ្ទៃ $"+(L*W)+"$ m$^2$ ។ ផលបូកនៃបណ្ដោយ និងទទឹង $="+(L+W)+"$ ។ រកទទឹង $w$ និងបណ្ដោយ $\\ell$ ដែល $w<\\ell$",[A(W,null,"num","w ="),A(L,null,"num","ℓ =")],"$x^2-"+(L+W)+"x+"+(L*W)+"=0$ ⇒ $"+W+"$ , $"+L+"$")},
 function(){var t1=ri(3,8),t2=ri(1,2),v=5*(t1-t2),h0=5*t1*t2;return K("g10qp_ground","🎾 ប្រដាប់ក្មេងលេងត្រូវបាញ់ឡើងពីដំបូលកម្ពស់ $"+h0+"$ m ដោយកម្ពស់ $h(t)=-5t^2+"+v+"t+"+h0+"$ (m) ។ តើប៉ុន្មានវិនាទីក្រោយមក វាធ្លាក់ដល់ដី?",[A(t1,null,"num","t =")],"$h=0$ ⇒ $(t-"+t1+")(t+"+t2+")=0$ ⇒ $t="+t1+"$")});
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
/* ៣.២ សមីការអសនិទាន និងដឺក្រេលំដាប់ខ្ពស់ (កែ ២០២៦-១១-២៦) — kd = g10h_… (PISA = g10hp_…) · ចម្លើយ fill-in (num) ទាំងអស់
   កម្រិតបង្ហាញ ២ (គន្លឹះ 5) និង ៤ (គន្លឹះ 6) មានបញ្ជីផ្ទាល់ខ្លួន (មិនប្រើ fill56) */
function pm(r){var c=[1];r.forEach(function(x){var d=c.concat([0]);for(var i=0;i<c.length;i++)d[i+1]-=x*c[i];c=d});return c}
function shr(n){return[-4,-3,-2,-1,1,2,3,4].sort(function(){return Math.random()-.5}).slice(0,n)}
function boxQ(kd,pre){var L=2*ri(4,9),W=L+2*ri(1,4),x0=ri(1,L/2-1),V=x0*(L-2*x0)*(W-2*x0),m=x0;
  for(var x=1;x<L/2;x++)if(x*(L-2*x)*(W-2*x)===V){m=x;break}
  return K(kd,pre+"កាត់ជ្រុងការ៉េ $x$ cm ពីជ្រុងទាំងបួននៃក្រដាសកាតុងចតុកោណកែង $"+L+"\\times"+W+"$ cm រួចបត់ធ្វើជាប្រអប់គ្មានគម្រប ដែលមានមាឌ $"+V+"$ cm$^3$ ($x(" +L+"-2x)("+W+"-2x)="+V+"$ , $0<x<"+(L/2)+"$) ។ រក $x$ ជាចំនួនគត់តូចបំផុត",
    [A(m,null,"num","x =")],"ពន្លាត ⇒ $4x^3-"+(2*(L+W))+"x^2+"+(L*W)+"x-"+V+"=0$ · ជំនួស $x=1,2,\\dots$ ក្នុង $0<x<"+(L/2)+"$ ⇒ $x="+m+"$")}
function cubQ(kd,pre){var a=ri(1,4),b=a+ri(1,4),x0=ri(1,6),V=x0*(x0+a)*(x0+b);
  return K(kd,pre+"មានបណ្ដោយ $(x+"+b+")$ ទទឹង $(x+"+a+")$ និងកម្ពស់ $x$ (cm) មានមាឌ $"+V+"$ cm$^3$ ។ រក $x>0$",
    [A(x0,null,"num","x =")],"$x(x+"+a+")(x+"+b+")="+V+"$ ⇒ $x^3+"+(a+b)+"x^2+"+(a*b)+"x-"+V+"=0$ ⇒ $x="+x0+"$ (ផលគុណកើនតាម $x$ ⇒ ឫសវិជ្ជមានតែមួយ)")}
function diagQ(kd,pre,sub){var T=pick([[3,4,5],[6,8,10],[5,12,13],[8,15,17],[9,12,15],[20,21,29]]),d=T[1]-T[0];
  return K(kd,pre+sub.replace("#d",d).replace("#D",T[2])+" ។ តាង $x$ ($x>0$) ⇒ $\\sqrt{x^2+(x+"+d+")^2}="+T[2]+"$ ។ រក $x$",
    [A(T[0],null,"num","x =")],"លើកការ៉េ ⇒ $2x^2+"+(2*d)+"x"+sg(d*d-T[2]*T[2],0)+"=0$ ⇒ $x="+T[0]+"$ ឬ $x=-"+T[1]+"$ ⇒ បដិសេធ $x<0$")}
var G32={
 neg:function(){var k=ri(-4,9),a=ri(1,6);return K("g10h_neg","ដោះស្រាយ $\\sqrt{x"+sg(k,0)+"}=-"+a+"$ ។ តើសមីការនេះមានឫសពិតប៉ុន្មាន?",[A(0,null,"num","ចំនួនឫស =")],"$\\sqrt{x"+sg(k,0)+"}\\ge0$ ចំណែកអង្គខាងស្តាំ $=-"+a+"<0$ ⇒ គ្មានឫសពិត ($0$)")},
 fake:function(){var m=ri(0,4),r=m+ri(1,5),s=2*m-1-r,Z=(r-m)*(r-m)+r;
   return K("g10h_fake","ដោះស្រាយ $\\sqrt{"+Z+"-x}=x"+sg(-m,0)+"$ ។ លក្ខខណ្ឌ $x"+sg(-m,0)+"\\ge0$ ត្រូវផ្ទៀងផ្ទាត់ ។ រកឫសពិត",[A(r,null,"num","x =")],
     "លើកការ៉េ ⇒ $"+Z+"-x=(x"+sg(-m,0)+")^2$ ⇒ $x="+r+"$ ឬ $x="+s+"$ · លក្ខខណ្ឌ $x\\ge"+m+"$ ⇒ បដិសេធ $x="+s+"$ ⇒ $x="+r+"$")},
 sum2:function(){var p=ri(1,5),q=ri(1,5),x=ri(1,9),a=p*p-x,b=q*q-x;
   return K("g10h_sum2","ដោះស្រាយ $\\sqrt{x"+sg(a,0)+"}+\\sqrt{x"+sg(b,0)+"}="+(p+q)+"$",[A(x,null,"num","x =")],
     "ដាក់ $\\sqrt{x"+sg(a,0)+"}="+(p+q)+"-\\sqrt{x"+sg(b,0)+"}$ ហើយលើកការ៉េ ⇒ $\\sqrt{x"+sg(b,0)+"}="+q+"$ ⇒ $x"+sg(b,0)+"="+(q*q)+"$ ⇒ $x="+x+"$")},
 diff2:function(){var p=ri(2,6),q=ri(1,p-1),x=ri(1,9),a=p*p-x,b=q*q-x;
   return K("g10h_diff2","ដោះស្រាយ $\\sqrt{x"+sg(a,0)+"}-\\sqrt{x"+sg(b,0)+"}="+(p-q)+"$",[A(x,null,"num","x =")],
     "ដាក់ $\\sqrt{x"+sg(a,0)+"}="+(p-q)+"+\\sqrt{x"+sg(b,0)+"}$ ហើយលើកការ៉េ ⇒ $\\sqrt{x"+sg(b,0)+"}="+q+"$ ⇒ $x="+x+"$")},
 diag:function(){return diagQ("g10h_diag","","ចតុកោណកែងមួយមានបណ្ដោយវែងជាងទទឹង $#d$ cm និងអង្កត់ទ្រូង $#D$ cm")},
 cx3:function(){var a=ri(1,4),f=fr(-a,2);
   return K("g10h_cx3","ដោះស្រាយ $x^3="+(a*a*a)+"$ ក្នុងសំណុំចំនួនកុំផ្លិច ($x^3-"+(a*a*a)+"=(x-"+a+")(x^2"+(a===1?"+":"+"+a)+"x+"+(a*a)+")$) ។ រកឫសពិត និងផ្នែកពិតនៃឫសកុំផ្លិច",[A(a,null,"num","ឫសពិត ="),A(f.s,f.t,"num","ផ្នែកពិត =")],
     "$x="+a+"$ ឬ $x^2"+(a===1?"+":"+"+a)+"x+"+(a*a)+"=0$ ⇒ $x=\\dfrac{-"+a+"\\pm"+(a===1?"":a)+"\\sqrt3\\,i}{2}$ ⇒ ផ្នែកពិត $="+f.t+"$")},
 cnt4:function(){var t1=nz(-6,6),t2=nz(-6,6);while(t1===t2)t2=nz(-6,6);var n=2*((t1>0?1:0)+(t2>0?1:0));
   return K("g10h_cnt4","តើសមីការ $x^4"+co(-(t1+t2),"x^2")+sg(t1*t2,0)+"=0$ មានឫសពិតប៉ុន្មាន? (តាង $t=x^2\\ge0$)",[A(n,null,"num","ចំនួនឫស =")],
     "$(t"+sg(-t1,0)+")(t"+sg(-t2,0)+")=0$ ⇒ $t="+t1+"$ ឬ $t="+t2+"$ · $t>0$ ឱ្យឫសពិត $2$ · $t<0$ គ្មានឫសពិត ⇒ សរុប $"+n+"$")},
 zero:function(){var r1=nz(-5,5),r2=nz(-5,5);while(r2===r1)r2=nz(-5,5);var lo=Math.min(0,r1,r2),hi=Math.max(0,r1,r2);
   return K("g10h_zero","ដោះស្រាយ $"+polyT([1,-(r1+r2),r1*r2,0])+"=0$ ។ រកឫសតូចបំផុត និងឫសធំបំផុត",[A(lo,null,"num","តូចបំផុត ="),A(hi,null,"num","ធំបំផុត =")],
     "ដាក់កត្តារួម $x$ ⇒ $x(x"+sg(-r1,0)+")(x"+sg(-r2,0)+")=0$ ⇒ $x=0,"+r1+","+r2+"$")},
 x4:function(){var a=ri(1,4);return K("g10h_x4","ដោះស្រាយ $x^4="+Math.pow(a,4)+"$ ក្នុងសំណុំចំនួនកុំផ្លិច ($x^4-"+Math.pow(a,4)+"=(x^2-"+(a*a)+")(x^2+"+(a*a)+")$) ។ រកឫសពិតវិជ្ជមាន និងផ្នែកនិមិត្តវិជ្ជមាននៃឫសកុំផ្លិច",[A(a,null,"num","ឫសពិត ="),A(a,null,"num","ផ្នែកនិមិត្ត =")],
   "$x^2="+(a*a)+"$ ⇒ $x=\\pm"+a+"$ · $x^2=-"+(a*a)+"$ ⇒ $x=\\pm"+a+"i$")},
 rem:function(){var c=[nz(-3,3),ri(-4,4),ri(-5,5),ri(-6,6)],a=nz(-3,3),r=((c[0]*a+c[1])*a+c[2])*a+c[3];
   return K("g10h_rem","រកសំណល់នៃការចែក $f(x)="+polyT(c)+"$ នឹង $x"+sg(-a,0)+"$ (ទ្រឹស្តីបទសំណល់ $R=f(\\alpha)$)",[A(r,null,"num","R =")],"$R=f("+a+")="+r+"$")},
 remlin:function(){var m=pick([1,3,5,-1,-3]),c=[nz(-3,3),ri(-4,4),ri(-5,5),ri(-6,6)],n=c[0]*m*m*m+2*c[1]*m*m+4*c[2]*m+8*c[3],f=fr(n,8);
   return K("g10h_remlin","រកសំណល់នៃការចែក $f(x)="+polyT(c)+"$ នឹង $2x"+sg(-m,0)+"$ (ប្រើ $R=f\\left(\\tfrac{"+m+"}{2}\\right)$)",[A(f.s,f.t,"num","R =")],"$R=f\\left(\\tfrac{"+m+"}{2}\\right)="+f.t+"$")},
 fk:function(){var al=nz(-3,3),p=ri(-4,4),q=ri(-5,5),k=-(al*al*al+p*al*al+q*al);
   return K("g10h_fk","រក $k$ ដើម្បីឱ្យ $x"+sg(-al,0)+"$ ជាកត្តានៃ $f(x)=x^3"+co(p,"x^2")+co(q,"x")+sg(k,0)+"$ (ទ្រឹស្តីបទកត្តា $f("+al+")=0$)",[A(k,null,"num","k =")],"$f("+al+")="+(al*al*al+p*al*al+q*al)+"+k=0$ ⇒ $k="+k+"$")},
 fk2:function(){var al=nz(-3,3),be=nz(-3,3);while(be===al)be=nz(-3,3);var ga=nz(-3,3),p=-(al+be+ga),q=al*be+al*ga+be*ga,c=-al*be*ga;
   return K("g10h_fk2","រក $p$ និង $q$ ដើម្បីឱ្យ $f(x)=x^3+px^2+qx"+sg(c,0)+"$ ចែកដាច់នឹង $(x"+sg(-al,0)+")(x"+sg(-be,0)+")$ (មាន $f("+al+")=0$ និង $f("+be+")=0$)",[A(p,null,"num","p ="),A(q,null,"num","q =")],
     "ឫសទីបី $\\gamma$ ៖ $\\alpha\\beta\\gamma=-("+c+")$ ⇒ $\\gamma="+ga+"$ ⇒ $p=-("+al+sg(be,0)+sg(ga,0)+")="+p+"$ , $q="+q+"$")},
 rem2:function(){var al=nz(-3,3),be=nz(-3,3);while(be===al)be=nz(-3,3);var a=nz(-4,4),b=ri(-6,6),fa=a*al+b,fb=a*be+b;
   return K("g10h_rem2","$f(x)$ ចែកនឹង $x"+sg(-al,0)+"$ មានសំណល់ $"+fa+"$ ហើយចែកនឹង $x"+sg(-be,0)+"$ មានសំណល់ $"+fb+"$ ។ សំណល់នៃការចែក $f(x)$ នឹង $(x"+sg(-al,0)+")(x"+sg(-be,0)+")$ មានទម្រង់ $R(x)=ax+b$ ។ រក $a$ និង $b$",[A(a,null,"num","a ="),A(b,null,"num","b =")],
     "$f("+al+")="+al+"a+b="+fa+"$ · $f("+be+")="+be+"a+b="+fb+"$ ⇒ $a="+a+"$ , $b="+b+"$ ⇒ $R(x)="+co(a,"x",true)+sg(b,0)+"$")},
 remv:function(){var al=nz(-3,3),be=nz(-3,3);while(be===al)be=nz(-3,3);var a=nz(-4,4),b=ri(-6,6),x0=ri(-5,5),fa=a*al+b,fb=a*be+b;
   return K("g10h_remv","$f(x)$ ចែកនឹង $x"+sg(-al,0)+"$ មានសំណល់ $"+fa+"$ ហើយចែកនឹង $x"+sg(-be,0)+"$ មានសំណល់ $"+fb+"$ ។ សំណល់នៃការចែក $f(x)$ នឹង $(x"+sg(-al,0)+")(x"+sg(-be,0)+")$ គឺ $R(x)=ax+b$ ។ គណនា $R("+x0+")$",[A(a*x0+b,null,"num","R("+x0+") =")],
     "$a="+a+"$ , $b="+b+"$ (ពី $R("+al+")="+fa+"$ និង $R("+be+")="+fb+"$) ⇒ $R("+x0+")="+(a*x0+b)+"$")},
 deg3:function(){var r=shr(3),al=r[0],be=Math.min(r[1],r[2]),ga=Math.max(r[1],r[2]);
   return K("g10h_deg3","ដោះស្រាយ $"+polyT(pm(r))+"=0$ ដោយដឹងថា $x="+al+"$ ជាឫសមួយ ។ រកឫសពីរទៀត (តូចមុន)",[A(be,null,"num","x₂ ="),A(ga,null,"num","x₃ =")],
     "ចែកនឹង $x"+sg(-al,0)+"$ ⇒ $x^2"+co(-(be+ga),"x")+sg(be*ga,0)+"=0$ ⇒ $x="+be+"$ ឬ $x="+ga+"$")},
 dbl:function(){var a=nz(-4,4),b=nz(-4,4);while(b===a)b=nz(-4,4);
   return K("g10h_dbl","ដោះស្រាយ $"+polyT([1,-(2*a+b),a*a+2*a*b,-a*a*b])+"=0$ ដោយដឹងថា $x="+b+"$ ជាឫសមួយ ហើយមានឫសឌុបមួយទៀត ។ រកឫសឌុប",[A(a,null,"num","ឫសឌុប =")],
     "ចែកនឹង $x"+sg(-b,0)+"$ ⇒ $"+polyT([1,-2*a,a*a])+"=(x"+sg(-a,0)+")^2=0$ ⇒ ឫសឌុប $x="+a+"$")},
 deg4:function(){var r=shr(4).sort(function(x,y){return x-y}),o=[r[1],r[2]],g=[r[0],r[3]];
   return K("g10h_deg4","ដោះស្រាយ $"+polyT(pm(r))+"=0$ ដោយដឹងថា $x="+g[0]+"$ និង $x="+g[1]+"$ ជាឫស ។ រកឫសពីរទៀត (តូចមុន)",[A(o[0],null,"num","x₁ ="),A(o[1],null,"num","x₂ =")],
     "ចែកនឹង $(x"+sg(-g[0],0)+")(x"+sg(-g[1],0)+")$ ⇒ $"+polyT(pm(o))+"=0$ ⇒ $x="+o[0]+"$ ឬ $x="+o[1]+"$")},
 cpx:function(){var p=ri(1,3),q=ri(1,3),a=q*q-3*p*p,b=-(p*p*p-3*p*q*q)-a*p;
   return K("g10h_cpx","សមីការ $x^3+ax+b=0$ មានឫសកុំផ្លិច $x="+p+"+"+(q===1?"":q)+"i$ ។ រក $a$ និង $b$ (ជំនួសឫសចូល ផ្នែកពិត $=0$ និងផ្នែកនិមិត្ត $=0$)",[A(a,null,"num","a ="),A(b,null,"num","b =")],
     "$z^3=("+(p*p*p-3*p*q*q)+")+("+(3*p*p*q-q*q*q)+")i$ ⇒ ផ្នែកនិមិត្ត៖ $"+(3*p*p*q-q*q*q)+"+"+q+"a=0$ ⇒ $a="+a+"$ · ផ្នែកពិត៖ $"+(p*p*p-3*p*q*q)+"+"+p+"a+b=0$ ⇒ $b="+b+"$")},
 box:function(){return boxQ("g10h_box","")},
 cub:function(){return cubQ("g10h_cub","ប្រអប់ចតុកោណបួនជ្រុង")}
};
vx(32,1,[G32.neg,G32.cx3,G32.rem,G32.fk,G32.zero]);
vx(32,2,[G32.fake,G32.sum2,G32.cnt4,G32.remlin,G32.deg3,G32.dbl,G32.x4]);
vx(32,3,[G32.diff2,G32.diag,G32.fk2,G32.rem2,G32.remv,G32.deg4,G32.cpx,G32.box,G32.cub]);
(function(){var g1=G[32][1],g2=G[32][2];
  function lvs(lv,L){G[32][lv]=function(){return pick(L)()}}
  lvs(5,[G32.neg,G32.cx3,G32.rem,G32.fk,G32.zero,G32.x4,g1]);
  lvs(6,[G32.fake,G32.sum2,G32.cnt4,G32.remlin,G32.deg3,G32.dbl,G32.diag,G32.cub,g2]);
})();
P4[32].push(
 function(){return boxQ("g10hp_box","📦 ")},
 function(){var v=ri(1,6)*10,d=v*v/20;return K("g10hp_brake","🚗 ល្បឿនរថយន្តពីស្នាមហ្វ្រាំង $v=\\sqrt{20d}$ (km/h · $d$ = ប្រវែងស្នាមហ្វ្រាំងគិតជា m) ។ បើល្បឿន $"+v+"$ km/h តើស្នាមហ្វ្រាំងវែងប៉ុន្មានម៉ែត្រ?",[A(d,null,"num","d =")],"$\\sqrt{20d}="+v+"\\Rightarrow20d="+(v*v)+"\\Rightarrow d="+d+"$ m")},
 function(){return diagQ("g10hp_ladder","🪜 ","ជណ្ដើរមួយប្រវែង $#D$ m ផ្អៀងនឹងជញ្ជាំង ចម្ងាយពីជើងជណ្ដើរដល់ជញ្ជាំងខ្លីជាងកម្ពស់ដែលជណ្ដើរឡើងដល់ $#d$ m")},
 function(){return cubQ("g10hp_tank","💧 អាងទឹករាងប្រអប់ចតុកោណបួនជ្រុង")});
/* ៣.៣ ប្រព័ន្ធសមីការ */
vx(33,1,[
 function(){var x=ri(-5,6),y=ri(-5,6),a=nz(-3,3),b=y-a*x,c=nz(1,4),d=nz(-3,3);return K("s10_sub_33","ដោះស្រាយ $\\begin{cases}y="+co(a,"x",true)+sg(b,0)+"\\\\"+co(c,"x",true)+co(d,"y")+"="+(c*x+d*y)+"\\end{cases}$",[A(x,null,"num","x ="),A(y,null,"num","y =")],"ជំនួស $y$ ⇒ $x="+x+"$ , $y="+y+"$")},
 function(){var x=ri(-9,15),y=ri(-9,15);return K("s10_sd","ដោះស្រាយ $\\begin{cases}x+y="+(x+y)+"\\\\x-y="+(x-y)+"\\end{cases}$",[A(x,null,"num","x ="),A(y,null,"num","y =")],"បូក ⇒ $2x="+(2*x)+"$ ⇒ $x="+x+"$ , $y="+y+"$")},
 function(){var p=ri(1,5),q=ri(1,6),k=ri(2,8);return K("s10_ratio","ដោះស្រាយ $\\dfrac xy=\\dfrac{"+p+"}{"+q+"}$ និង $x+y="+((p+q)*k)+"$",[A(p*k,null,"num","x ="),A(q*k,null,"num","y =")],"$x="+p+"k$ , $y="+q+"k$ ⇒ $k="+k+"$")}]);
vx(33,2,[
 function(){var a=nz(-5,5),b=nz(-5,5),c=nz(-5,5),d=nz(-5,5);return K("s10_det","គណនាដេទែរមីណង់ $D$ នៃប្រព័ន្ធ $\\begin{cases}"+co(a,"x",true)+co(b,"y")+"=1\\\\"+co(c,"x",true)+co(d,"y")+"=2\\end{cases}$",[A(a*d-b*c,null,"num","D =")],"$D=ad-bc="+(a*d)+"-("+(b*c)+")="+(a*d-b*c)+"$")},
 function(){var x=ri(-5,5),y=x+ri(1,6);return K("s10_nl","ដោះស្រាយ $\\begin{cases}x+y="+(x+y)+"\\\\x^2+y^2="+(x*x+y*y)+"\\end{cases}$ ដែល $x<y$",[A(x,null,"num","x ="),A(y,null,"num","y =")],"$xy=\\dfrac{(x+y)^2-(x^2+y^2)}{2}="+(x*y)+"$ ⇒ ឫសនៃ $t^2"+co(-(x+y),"t")+sg(x*y,0)+"=0$")},
 function(){var c=ri(5,15),y=ri(3,10),k=ri(2,4),f=k*(c+y)-y;return K("s10_age","ឥឡូវ ឪពុកមានអាយុ $"+f+"$ ឆ្នាំ ។ ក្រោយ $"+y+"$ ឆ្នាំ អាយុឪពុកស្មើ $"+k+"$ ដងនៃអាយុកូន ។ រកអាយុកូនឥឡូវ",[A(c,null,"num","=")],"$"+f+"+"+y+"="+k+"(x+"+y+")$ ⇒ $x="+c+"$")}]);
vx(33,3,[
 function(){var x=ri(-4,6),y=ri(-4,6),z=ri(-4,6);return K("s10_3var","ដោះស្រាយ $\\begin{cases}x+y+z="+(x+y+z)+"\\\\x-y="+(x-y)+"\\\\y-z="+(y-z)+"\\end{cases}$",[A(x,null,"num","x ="),A(y,null,"num","y ="),A(z,null,"num","z =")],"$x=y"+sg(x-y,0)+"$ , $z=y"+sg(z-y,0)+"$ ⇒ $3y"+sg(x-y+z-y,0)+"="+(x+y+z)+"$ ⇒ $y="+y+"$")},
 function(){var a=nz(-3,3),b=nz(-3,3),k=pick([2,3,-2]),c=ri(-6,6),d=k*c+nz(-3,3);return K("s10_param","រក $m$ ដើម្បីឱ្យប្រព័ន្ធ $\\begin{cases}"+co(a,"x",true)+co(b,"y")+"="+c+"\\\\"+co(k*a,"x",true)+"+my="+d+"\\end{cases}$ គ្មានចម្លើយ",[A(k*b,null,"num","m =")],"$D=0$ ⇒ $"+a+"m="+(k*a*b)+"$ ⇒ $m="+(k*b)+"$ ហើយ $"+d+"\\ne"+(k*c)+"$")},
 function(){var A1=pick([10,20]),B1=pick([30,40,50]),x=ri(1,10),y=x*pick([1,2,3]),c=(A1*x+B1*y)/(x+y);while(c!==Math.round(c)){y++;c=(A1*x+B1*y)/(x+y)}return K("s10_mixs","លាយទឹកអំបិល $"+A1+"\\%$ ជាមួយ $"+B1+"\\%$ បានល្បាយ $"+(x+y)+"$ l កំហាប់ $"+c+"\\%$ ។ ប្រើប្រភេទនីមួយៗប៉ុន្មាន l?",[A(x,null,"num",A1+"% ="),A(y,null,"num",B1+"% =")],"$\\begin{cases}x+y="+(x+y)+"\\\\"+A1+"x+"+B1+"y="+(c*(x+y))+"\\end{cases}$")}]);
/* ៣.៣ ប្រព័ន្ធសមីការ (កែ ២០២៦-១១-២៦) — kd = g10sys_… (PISA = g10sysp_…) · ចម្លើយ fill-in (num) ទាំងអស់ · ចម្លើយជាគូ ២ ឬ ៣ → កំណត់ «តូចមុន» ក្នុងសំណួរ
   កម្រិតបង្ហាញ ២ (គន្លឹះ 5) និង ៤ (គន្លឹះ 6) មានបញ្ជីផ្ទាល់ខ្លួន (មិនប្រើ fill56) */
var TRI=[[3,4,5],[6,8,10],[5,12,13],[8,15,17],[9,12,15],[20,21,29],[7,24,25],[12,16,20],[9,40,41]];
function fieldQ(kd,pre){var a=ri(20,120),b=a+ri(1,60),S=a+b,P=a*b;
  return K(kd,pre+"ដីចម្ការរាងចតុកោណកែងមួយមានបរិមាត្រ $"+(2*S)+"$ m និងផ្ទៃក្រឡា $"+mo(P)+"\\text{ m}^2$ ។ រកទទឹង (តូច) និងបណ្ដោយ (ធំ)",[A(a,null,"num","ទទឹង ="),A(b,null,"num","បណ្ដោយ =")],
    "$x+y="+S+"$ , $xy="+P+"$ ⇒ $t^2-"+S+"t+"+P+"=0$ ⇒ $t="+a+"$ ឬ $t="+b+"$")}
function triQ(kd,pre,area){var T=pick(TRI),a=T[0],b=T[1],c=T[2],s=a+b;
  var q=area?"ត្រីកោណកែងមួយមានអ៊ីប៉ូតេនុស $"+c+"$ និងផ្ទៃក្រឡា $"+(a*b/2)+"$ ($a^2+b^2="+(c*c)+"$ , $ab="+(a*b)+"$) ។ រកជ្រុងកែងទាំងពីរ (តូចមុន)":"ត្រីកោណកែងមួយមានអ៊ីប៉ូតេនុស $"+c+"$ និងផលបូកជ្រុងកែងទាំងពីរ $"+s+"$ ($a+b="+s+"$ , $a^2+b^2="+(c*c)+"$) ។ រកជ្រុងកែងទាំងពីរ (តូចមុន)";
  var sol=area?"$(a+b)^2="+(c*c)+"+4\\cdot"+(a*b/2)+"="+(s*s)+"$ ⇒ $a+b="+s+"$":"$ab=\\dfrac{"+s+"^2-"+c+"^2}{2}="+(a*b)+"$";
  return K(kd,pre+q,[A(a,null,"num","a ="),A(b,null,"num","b =")],sol+" ⇒ $t^2-"+s+"t+"+(a*b)+"=0$ ⇒ $t="+a+"$ ឬ $t="+b+"$")}
var G33={
 pair:function(){var x=ri(-6,9),y=ri(-6,9),z=ri(-6,9),a=x+y,b=y+z,c=x+z;
   return K("g10sys_pair","ដោះស្រាយ $\\begin{cases}x+y="+a+"\\\\y+z="+b+"\\\\x+z="+c+"\\end{cases}$ ។ គណនា $x+y+z$ និង $z$",[A(x+y+z,null,"num","x+y+z ="),A(z,null,"num","z =")],
     "បូកទាំងបី ⇒ $2(x+y+z)="+(a+b+c)+"$ ⇒ $x+y+z="+(x+y+z)+"$ ⇒ $z=(x+y+z)-(x+y)="+z+"$")},
 inf:function(){var a=nz(-4,4),b=nz(-4,4),c=ri(-8,8),k=pick([2,3,-2,-3]);
   return K("g10sys_inf","រក $m$ និង $n$ ដើម្បីឱ្យប្រព័ន្ធ $\\begin{cases}"+co(a,"x",true)+co(b,"y")+"="+c+"\\\\"+co(k*a,"x",true)+"+my=n\\end{cases}$ មានឫសរាប់មិនអស់",[A(k*b,null,"num","m ="),A(k*c,null,"num","n =")],
     "សមីការទី ២ ត្រូវតែជា $"+k+"\\times$ សមីការទី ១ ⇒ $m="+(k*b)+"$ , $n="+(k*c)+"$")},
 sq:function(){var x=nz(-7,7),y=nz(-7,7);return K("g10sys_sq","គេដឹងថា $x+y="+(x+y)+"$ និង $xy="+(x*y)+"$ ។ គណនា $x^2+y^2$ (មិនចាំបាច់ដោះស្រាយ)",[A((x+y)*(x+y)-2*x*y,null,"num","=")],"$x^2+y^2=(x+y)^2-2xy="+((x+y)*(x+y))+"-("+(2*x*y)+")="+((x+y)*(x+y)-2*x*y)+"$")},
 elim3:function(){var x=ri(-4,8),y=ri(-4,8),z=ri(-4,8),b=ri(2,4),c=ri(1,4);if(b-3-c-b*c===0){b=2;c=3}
   var S=x+y+z,T=x+b*y-z,U=c*x-y+z;
   return K("g10sys_elim","ដោះស្រាយ $\\begin{cases}x+y+z="+S+"\\\\x"+co(b,"y")+"-z="+T+"\\\\"+co(c,"x",true)+"-y+z="+U+"\\end{cases}$ (បូកសមីការ (១)+(២) និង (២)+(៣) ដើម្បីបំបាត់ $z$)",[A(x,null,"num","x ="),A(y,null,"num","y ="),A(z,null,"num","z =")],
     "(១)+(២) ⇒ $2x"+co(1+b,"y")+"="+(S+T)+"$ · (២)+(៣) ⇒ "+co(1+c,"x",true)+co(b-1,"y")+"="+(T+U)+" ⇒ $x="+x+"$ , $y="+y+"$ , $z="+z+"$")},
 lin2:function(){var r1=ri(-5,3),r2=r1+ri(1,6),d=r1+r2,N=r1*r1+r2*r2;
   return K("g10sys_lin2","ដោះស្រាយ $\\begin{cases}y=x"+sg(-d,0)+"\\\\x^2+y^2="+N+"\\end{cases}$ ។ ចម្លើយ $(x_1;y_1)$ , $(x_2;y_2)$ ដែល $x_1<x_2$",[A(r1,null,"num","x₁ ="),A(-r2,null,"num","y₁ ="),A(r2,null,"num","x₂ ="),A(-r1,null,"num","y₂ =")],
     "ជំនួស $y$ ⇒ $x^2+(x"+sg(-d,0)+")^2="+N+"$ ⇒ $x^2"+co(-d,"x")+sg((d*d-N)/2,0)+"=0$ ⇒ $x="+r1+"$ ឬ $x="+r2+"$ ⇒ $y="+(-r2)+"$ ឬ $y="+(-r1)+"$")},
 diff:function(){var y=ri(1,8),d=ri(1,6),x=y+d,P=x*y;
   return K("g10sys_diff","ដោះស្រាយ $\\begin{cases}x-y="+d+"\\\\xy="+P+"\\end{cases}$ ។ រកចម្លើយដែល $x>0$ និង $y>0$",[A(x,null,"num","x ="),A(y,null,"num","y =")],
     "$x=y+"+d+"$ ⇒ $y^2+"+d+"y-"+P+"=0$ ⇒ $y="+y+"$ ឬ $y=-"+x+"$ ⇒ យក $y="+y+"$ , $x="+x+"$")},
 prodsq:function(){var x=ri(1,9),y=x+ri(1,8);
   return K("g10sys_prodsq","ពីរចំនួនវិជ្ជមានមានផលគុណ $"+(x*y)+"$ និងផលបូកការ៉េ $"+(x*x+y*y)+"$ ។ រកចំនួនទាំងពីរ (តូចមុន)",[A(x,null,"num","x ="),A(y,null,"num","y =")],
     "$(x+y)^2=x^2+y^2+2xy="+(x*x+y*y)+"+"+(2*x*y)+"="+((x+y)*(x+y))+"$ ⇒ $x+y="+(x+y)+"$ ⇒ $t^2-"+(x+y)+"t+"+(x*y)+"=0$ ⇒ $"+x+"$ , $"+y+"$")},
 none:function(){var S1=ri(2,15),S2=ri(2,15),k=nz(-9,9),R=S1+S2+k;
   return K("g10sys_none","ប្រព័ន្ធ $\\begin{cases}x+y+z="+S1+"\\\\x-y+z="+S2+"\\\\2x+2z="+R+"\\end{cases}$ គ្មានចម្លើយ ($\\emptyset$) ។ បូក (១)+(២) បានសមីការមួយ យកសមីការ (៣) ដកនឹងវា ទទួលបាន $0=c$ ។ រក $c$",[A(k,null,"num","c =")],
     "(១)+(២) ⇒ $2x+2z="+(S1+S2)+"$ · (៣)−នោះ ⇒ $0="+R+"-"+(S1+S2)+"="+k+"$ មិនពិត ⇒ $\\emptyset$")},
 apos:function(){var s=ri(3,9);
   return K("g10sys_apos","ប្រព័ន្ធ $\\begin{cases}x+y="+s+"\\\\x-y=a\\end{cases}$ ។ តើមានចំនួនគត់ $a$ ប៉ុន្មាន ដែលឱ្យ $x>0$ និង $y>0$ ?",[A(2*s-1,null,"num","ចំនួន =")],
     "$x=\\dfrac{"+s+"+a}{2}>0$ , $y=\\dfrac{"+s+"-a}{2}>0$ ⇒ $-"+s+"<a<"+s+"$ ⇒ $"+(2*s-1)+"$ តម្លៃ")},
 field:function(){return fieldQ("g10sys_field","")},
 tri:function(){return triQ("g10sys_tri","",false)},
 tria:function(){return triQ("g10sys_tria","",true)}
};
vx(33,1,[G33.pair,G33.inf,G33.sq]);
vx(33,2,[G33.lin2,G33.diff,G33.prodsq,G33.elim3]);
vx(33,3,[G33.none,G33.apos,G33.field,G33.tri,G33.tria]);
(function(){var g1=G[33][1],g2=G[33][2];
  function lvs(lv,L){G[33][lv]=function(){return pick(L)()}}
  lvs(5,[G33.pair,G33.inf,G33.sq,G33.elim3,G33.field,g1]);
  lvs(6,[G33.lin2,G33.diff,G33.prodsq,G33.none,G33.apos,G33.tri,g2]);
})();
P4[33].push(
 function(){return fieldQ("g10sysp_field","🌾 ")},
 function(){var T=pick(TRI),a=T[0],b=T[1],c=T[2];return K("g10sysp_tv","📺 អេក្រង់ទូរទស្សន៍មួយមានអង្កត់ទ្រូង $"+c+"$ អ៊ីញ ហើយផលបូកទទឹង និងកម្ពស់ $="+(a+b)+"$ អ៊ីញ ($a^2+b^2="+(c*c)+"$) ។ រកទទឹង និងកម្ពស់ (តូចមុន)",[A(a,null,"num","ទទឹង ="),A(b,null,"num","កម្ពស់ =")],"$ab=\\dfrac{"+(a+b)+"^2-"+c+"^2}{2}="+(a*b)+"$ ⇒ $t^2-"+(a+b)+"t+"+(a*b)+"=0$ ⇒ $"+a+"$ , $"+b+"$")},
 function(){return triQ("g10sysp_plot","🏞️ ដីរាងត្រីកោណកែងមួយ ៖ ",true)},
 function(){var y=ri(2,9),d=ri(1,5),x=y+d;return K("g10sysp_floor","🧱 បន្ទប់រាងចតុកោណកែងមួយ បណ្ដោយវែងជាងទទឹង $"+d+"$ m ហើយមានផ្ទៃក្រឡា $"+(x*y)+"$ m$^2$ (ប៉ះឥដ្ឋ) ។ រកទទឹង និងបណ្ដោយ",[A(y,null,"num","ទទឹង ="),A(x,null,"num","បណ្ដោយ =")],"$x-y="+d+"$ , $xy="+(x*y)+"$ ⇒ $y^2+"+d+"y-"+(x*y)+"=0$ ⇒ $y="+y+"$ , $x="+x+"$")});
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
/* ៣.៤ វិសមីការ (កែ ២០២៦-១១-២៦) — kd = g10i_… (PISA = g10ip_…) · ចម្លើយ fill-in (num) ទាំងអស់ · ចម្លើយជាគូ → «តូចមុន/α<β» ក្នុងសំណួរ
   កម្រិតបង្ហាញ ២ (គន្លឹះ 5) និង ៤ (គន្លឹះ 6) មានបញ្ជីផ្ទាល់ខ្លួន (មិនប្រើ fill56) · AM-GM = ចំណុចទី ៦ */
function fenceQ(kd,pre){var s=ri(3,15);
  return K(kd,pre+"របងប្រវែង $"+(4*s)+"$ m ត្រូវព័ទ្ធជុំវិញដីរាងចតុកោណកែង (ប្រើអស់ប្រវែងរបង) ។ តាមវិសមភាព AM-GM ($ab\\le\\left(\\dfrac{a+b}{2}\\right)^2$) រកផ្ទៃក្រឡាធំបំផុត (m$^2$)",[A(s*s,null,"num","S អតិបរមា =")],
    "$a+b="+(2*s)+"$ ⇒ $ab\\le\\left(\\dfrac{"+(2*s)+"}{2}\\right)^2="+(s*s)+"$ (សមភាពពេល $a=b="+s+"$)")}
var G34={
 bound:function(){var p=ri(-5,3),q=p+ri(2,6),m=nz(-4,4),n=ri(-6,6),u=m*p+n,v=m*q+n,lo=Math.min(u,v),hi=Math.max(u,v),e=co(m,"x",true)+sg(n,0);
   return K("g10i_bound","គេដឹងថា $"+p+"<x<"+q+"$ ។ ដូច្នេះ $\\alpha<"+e+"<\\beta$ ។ រក $\\alpha$ និង $\\beta$ (គុណនឹងចំនួនអវិជ្ជមានត្រូវប្ដូរទិសដៅវិសមភាព)",[A(lo,null,"num","α ="),A(hi,null,"num","β =")],
     "គុណនឹង $"+m+"$"+(m<0?" (ប្ដូរទិសដៅ)":"")+" រួចបូក $"+n+"$ ⇒ $"+lo+"<"+e+"<"+hi+"$")},
 cnt:function(){var c=ri(-5,5),ms=[nz(-4,4),nz(-4,4),nz(-4,4),nz(-4,4)],n=0,L=[];
   ms.forEach(function(m){if(m>0)n++;L.push("$"+co(m,"x",true)+sg(c,0)+"<"+co(m,"y",true)+sg(c,0)+"$")});
   return K("g10i_cnt","គេដឹងថា $x<y$ ។ តើមានប៉ុន្មានក្នុងបួនវិសមភាពខាងក្រោម ដែលពិតជានិច្ច ៖ "+L.join(" , "),[A(n,null,"num","ចំនួន =")],
     "គុណនឹងចំនួនវិជ្ជមានរក្សាទិសដៅ · គុណនឹងចំនួនអវិជ្ជមានប្ដូរទិសដៅ ⇒ ពិត $"+n+"$ ក្នុង ៤")},
 sgn:function(){var a=nz(-5,5),b=ri(-12,12),r=fr(-b,a),k=a>0?Math.floor(-b/a)+1:Math.ceil(-b/a)-1;
   return K("g10i_sgn","ដោះស្រាយ $"+co(a,"x",true)+sg(b,0)+">0$ (ឫស $x=-\\dfrac ba$) ។ រក"+(a>0?"ចំនួនគត់តូចបំផុត":"ចំនួនគត់ធំបំផុត")+"នៃ $x$ ដែលជាចម្លើយ",[A(k,null,"num","x =")],
     "ឫស $x="+r.t+"$ ⇒ $x"+(a>0?">":"<")+r.t+"$ "+(a<0?"(ចែកនឹងចំនួនអវិជ្ជមាន ប្ដូរទិសដៅ) ":"")+"⇒ "+k)},
 cnt1:function(){var a=nz(-4,4),b=ri(-8,8),N=ri(4,9),n=0,r=fr(-b,a);for(var x=-N;x<=N;x++)if(a*x+b>=0)n++;
   return K("g10i_cnt1","តើមានចំនួនគត់ $x$ ប៉ុន្មាន ក្នុងចន្លោះ $["+(-N)+";"+N+"]$ ដែលផ្ទៀងផ្ទាត់ $"+co(a,"x",true)+sg(b,0)+"\\ge0$ ?",[A(n,null,"num","ចំនួន =")],
     "ឫស $x="+r.t+"$ ⇒ $x"+(a>0?"\\ge":"\\le")+r.t+"$ ⇒ $"+n+"$ តម្លៃគត់")},
 sysint:function(){var a=ri(-5,5),b=a+ri(-3,7),n=Math.max(0,b-a-1);
   return K("g10i_sysint","ដោះស្រាយប្រព័ន្ធ $\\begin{cases}x"+sg(-a,0)+">0\\\\"+b+"-x>0\\end{cases}$ ។ តើមានចំនួនគត់ $x$ ប៉ុន្មានជាចម្លើយ? (បើគ្មានចម្លើយ $\\emptyset$ សរសេរ $0$)",[A(n,null,"num","ចំនួន =")],
     "$x>"+a+"$ និង $x<"+b+"$ ⇒ "+(b>a?"$"+a+"<x<"+b+"$":"$\\emptyset$")+" ⇒ $"+n+"$")},
 abseq:function(){var a=ri(1,3),h=ri(-5,5),w=ri(1,5),B=-a*h,C=a*w;
   return K("g10i_abseq","ដោះស្រាយ $|"+co(a,"x",true)+sg(B,0)+"|="+C+"$ ។ រកឫសតូច និងឫសធំ",[A(h-w,null,"num","x₁ ="),A(h+w,null,"num","x₂ =")],
     "$"+co(a,"x",true)+sg(B,0)+"=\\pm"+C+"$ ⇒ $x="+(h-w)+"$ ឬ $x="+(h+w)+"$")},
 abslt:function(){var a=ri(1,3),h=ri(-5,5),w=ri(1,5),B=-a*h,C=a*w;
   return K("g10i_abslt","ដោះស្រាយ $|"+co(a,"x",true)+sg(B,0)+"|\\le"+C+"$ ៖ ចម្លើយ $\\alpha\\le x\\le\\beta$ ។ រក $\\alpha$ និង $\\beta$",[A(h-w,null,"num","α ="),A(h+w,null,"num","β =")],
     "$-"+C+"\\le"+co(a,"x",true)+sg(B,0)+"\\le"+C+"$ ⇒ $"+(h-w)+"\\le x\\le"+(h+w)+"$")},
 absgt:function(){var a=ri(1,3),h=ri(-5,5),w=ri(1,5),B=-a*h,C=a*w;
   return K("g10i_absgt","ដោះស្រាយ $|"+co(a,"x",true)+sg(B,0)+"|>"+C+"$ ៖ ចម្លើយ $x<\\alpha$ ឬ $x>\\beta$ ។ រក $\\alpha$ និង $\\beta$",[A(h-w,null,"num","α ="),A(h+w,null,"num","β =")],
     "$"+co(a,"x",true)+sg(B,0)+"<-"+C+"$ ឬ $"+co(a,"x",true)+sg(B,0)+">"+C+"$ ⇒ $x<"+(h-w)+"$ ឬ $x>"+(h+w)+"$")},
 abscnt:function(){var a=ri(1,3),h=ri(-5,5),w=ri(2,6),B=-a*h,C=a*w;
   return K("g10i_abscnt","តើមានចំនួនគត់ $x$ ប៉ុន្មានដែលផ្ទៀងផ្ទាត់ $|"+co(a,"x",true)+sg(B,0)+"|<"+C+"$ ?",[A(2*w-1,null,"num","ចំនួន =")],
     "$-"+C+"<"+co(a,"x",true)+sg(B,0)+"<"+C+"$ ⇒ $"+(h-w)+"<x<"+(h+w)+"$ ⇒ $"+(2*w-1)+"$ តម្លៃគត់")},
 d0:function(){var a=ri(1,3),h=nz(-6,6),f=polyT([a,-2*a*h,a*h*h]),one=Math.random()<.5;
   return K("g10i_d0",one?"វិសមីការ $"+f+"\\le0$ ($\\Delta=0$) មានចម្លើយតែមួយ $x=h$ ។ រក $h$":"វិសមីការ $"+f+">0$ ($\\Delta=0$) ពិតគ្រប់ $x$ លើកលែង $x=h$ ។ រក $h$",[A(h,null,"num","h =")],
     "$"+f+"="+a+"(x"+sg(-h,0)+")^2$ ⇒ "+(one?"$\\le0$ លុះត្រា $x="+h+"$":"$>0$ លើកលែង $x="+h+"$"))},
 dneg:function(){var h=nz(-5,5),k=ri(1,9),gt=Math.random()<.5,f=polyT([1,-2*h,h*h+k]);
   return K("g10i_dneg","តើមានចំនួនគត់ $x$ ប៉ុន្មានក្នុង $[-5;5]$ ដែលផ្ទៀងផ្ទាត់ $"+f+(gt?">0":"<0")+"$ ?",[A(gt?11:0,null,"num","ចំនួន =")],
     "$\\Delta="+(-4*k)+"<0$ និង $a>0$ ⇒ $f(x)>0$ ជានិច្ច ⇒ "+(gt?"ពិតគ្រប់ $11$ តម្លៃ":"គ្មានចម្លើយ ($0$)"))},
 frac:function(){var p=ri(-6,3),q=p+ri(1,6);
   return K("g10i_frac","ដោះស្រាយ $\\dfrac{x"+sg(-p,0)+"}{x"+sg(-q,0)+"}\\ge0$ ($x\\ne"+q+"$) ៖ ចម្លើយ $x\\le\\alpha$ ឬ $x>\\beta$ ។ រក $\\alpha$ និង $\\beta$",[A(p,null,"num","α ="),A(q,null,"num","β =")],
     "តារាងសញ្ញា ⇒ $x\\le"+p+"$ ឬ $x>"+q+"$ (មិនយក $x="+q+"$)")},
 cub:function(){var r=shr(3).sort(function(x,y){return x-y});
   return K("g10i_cub","ដោះស្រាយ $"+polyT(pm(r))+"<0$ ($f(x)=(x-r_1)(x-r_2)(x-r_3)$) ៖ ចម្លើយ $x<\\alpha$ ឬ $\\beta<x<\\gamma$ ។ រក $\\alpha,\\beta,\\gamma$",[A(r[0],null,"num","α ="),A(r[1],null,"num","β ="),A(r[2],null,"num","γ =")],
     "ដាក់កត្តា $(x"+sg(-r[0],0)+")(x"+sg(-r[1],0)+")(x"+sg(-r[2],0)+")<0$ ⇒ $x<"+r[0]+"$ ឬ $"+r[1]+"<x<"+r[2]+"$")},
 mall:function(){var h=ri(2,7);
   return K("g10i_mall","រក $m$ ជាចំនួនគត់តូចបំផុត ដើម្បីឱ្យ $x^2-"+(2*h)+"x+m>0$ ពិតគ្រប់ $x\\in\\mathbb R$ (ត្រូវ $\\Delta'<0$)",[A(h*h+1,null,"num","m =")],
     "$\\Delta'="+(h*h)+"-m<0$ ⇒ $m>"+(h*h)+"$ ⇒ $m="+(h*h+1)+"$")},
 mpos:function(){var k=ri(2,7);
   return K("g10i_mpos","រក $m$ ជាចំនួនគត់តូចបំផុត ដើម្បីឱ្យ $x^2-2mx+"+(k*k)+"=0$ មានឫសវិជ្ជមានទាំងពីរ (ត្រូវ $\\Delta'\\ge0$ , $S>0$ , $P>0$)",[A(k,null,"num","m =")],
     "$\\Delta'=m^2-"+(k*k)+"\\ge0$ , $S=2m>0$ , $P="+(k*k)+">0$ ⇒ $m\\ge"+k+"$")},
 min:function(){var h=nz(-6,6),c=ri(-5,9);
   return K("g10i_min","បំពេញជាការ៉េ រកតម្លៃអប្បបរមានៃ $"+polyT([1,-2*h,c])+"$ និងតម្លៃ $x$ ដែលបានអប្បបរមា",[A(c-h*h,null,"num","អប្បបរមា ="),A(h,null,"num","x =")],
     "$"+polyT([1,-2*h,h*h])+"+("+(c-h*h)+")=(x"+sg(-h,0)+")^2"+sg(c-h*h,0)+"\\ge"+(c-h*h)+"$ ⇒ អប្បបរមា "+(c-h*h)+" ពេល $x="+h+"$")},
 cs:function(){var a=nz(-4,4),b=nz(-4,4),x=nz(-4,4),y=nz(-4,4);
   return K("g10i_cs","គណនា $(a^2+b^2)(x^2+y^2)-(ax+by)^2$ ដែល $a="+a+"$ , $b="+b+"$ , $x="+x+"$ , $y="+y+"$ (ដឹងថាវាស្មើ $(ay-bx)^2\\ge0$)",[A((a*y-b*x)*(a*y-b*x),null,"num","=")],
     "$(ay-bx)^2=("+(a*y)+"-("+(b*x)+"))^2="+((a*y-b*x)*(a*y-b*x))+"$")},
 amgm:function(){var m=ri(1,7);
   return K("g10i_amgm","ចំពោះ $x>0$ រកតម្លៃអប្បបរមានៃ $x+\\dfrac{"+(m*m)+"}{x}$ និងតម្លៃ $x$ ដែលសមភាពពិត (AM-GM)",[A(2*m,null,"num","អប្បបរមា ="),A(m,null,"num","x =")],
     "$\\dfrac{x+\\frac{"+(m*m)+"}{x}}{2}\\ge\\sqrt{"+(m*m)+"}="+m+"$ ⇒ $\\ge"+(2*m)+"$ ពេល $x=\\dfrac{"+(m*m)+"}{x}$ ⇒ $x="+m+"$")},
 amgm2:function(){var a=ri(1,4),m=ri(1,5),b=a*m*m;
   return K("g10i_amgm2","ចំពោះ $x>0$ រកតម្លៃអប្បបរមានៃ $"+co(a,"x",true)+"+\\dfrac{"+b+"}{x}$ និងតម្លៃ $x$ ដែលសមភាពពិត",[A(2*a*m,null,"num","អប្បបរមា ="),A(m,null,"num","x =")],
     "$\\ge2\\sqrt{"+a+"x\\cdot\\frac{"+b+"}{x}}=2\\sqrt{"+(a*b)+"}="+(2*a*m)+"$ ពេល $"+a+"x=\\dfrac{"+b+"}{x}$ ⇒ $x="+m+"$")},
 prodmax:function(){var k=ri(2,12);
   return K("g10i_pmax","ចំពោះ $a>0$ , $b>0$ ដែល $a+b="+(2*k)+"$ ។ តាម AM-GM រកតម្លៃធំបំផុតនៃ $ab$ និងតម្លៃ $a$ ពេលនោះ",[A(k*k,null,"num","ab អតិបរមា ="),A(k,null,"num","a =")],
     "$\\sqrt{ab}\\le\\dfrac{a+b}{2}="+k+"$ ⇒ $ab\\le"+(k*k)+"$ ពេល $a=b="+k+"$")},
 rect:function(){return fenceQ("g10i_rect","")}
};
vx(34,1,[G34.bound,G34.cnt,G34.sgn,G34.cnt1,G34.sysint,G34.abseq]);
vx(34,2,[G34.absgt,G34.abslt,G34.abscnt,G34.d0,G34.dneg,G34.frac,G34.prodmax]);
vx(34,3,[G34.cub,G34.mall,G34.mpos,G34.min,G34.cs,G34.amgm,G34.amgm2,G34.rect]);
(function(){var g1=G[34][1],g2=G[34][2];
  function lvs(lv,L){G[34][lv]=function(){return pick(L)()}}
  lvs(5,[G34.bound,G34.cnt,G34.sgn,G34.cnt1,G34.sysint,G34.abseq,G34.d0,g1]);
  lvs(6,[G34.absgt,G34.abslt,G34.abscnt,G34.dneg,G34.frac,G34.min,G34.amgm,G34.prodmax,g2]);
})();
P4[34].push(
 function(){return fenceQ("g10ip_fence","🌾 ")},
 function(){var s=[ri(55,95),ri(55,95),ri(55,95)],T=ri(70,85),need=4*T-s[0]-s[1]-s[2];if(need>100){s=[T,T,T];need=T}
   return K("g10ip_avg","📚 សិស្សមួយបានពិន្ទុតេស្ត $"+s[0]+"$ , $"+s[1]+"$ , $"+s[2]+"$ ក្នុង ៣ មុខវិជ្ជា ។ ដើម្បីឱ្យមធ្យមភាគ ៤ មុខវិជ្ជា $\\ge"+T+"$ តើមុខវិជ្ជាទី ៤ ត្រូវបានពិន្ទុយ៉ាងតិចប៉ុន្មាន? ($\\dfrac{"+s.join("+")+"+x}{4}\\ge"+T+"$)",[A(need,null,"num","x ≥")],
     "$"+(s[0]+s[1]+s[2])+"+x\\ge"+(4*T)+"$ ⇒ $x\\ge"+need+"$")},
 function(){var L=ri(20,80),t=ri(1,5);return K("g10ip_tol","🔩 ដំបងដែកមួយត្រូវមានប្រវែង $"+L+"$ mm ដោយអនុញ្ញាតកំហុស $|x-"+L+"|\\le"+t+"$ ។ រកប្រវែងអប្បបរមា និងអតិបរមា (mm)",[A(L-t,null,"num","អប្បបរមា ="),A(L+t,null,"num","អតិបរមា =")],
     "$-"+t+"\\le x-"+L+"\\le"+t+"$ ⇒ $"+(L-t)+"\\le x\\le"+(L+t)+"$")},
 function(){var m=ri(2,8);return K("g10ip_cost","🏭 តម្លៃមធ្យមក្នុងមួយឯកតា (រយរៀល) នៅពេលផលិត $x$ ឯកតា គឺ $C(x)=x+\\dfrac{"+(m*m)+"}{x}$ ($x>0$) ។ រកចំនួន $x$ ដែលតម្លៃមធ្យមតូចបំផុត និងតម្លៃតូចបំផុតនោះ",[A(m,null,"num","x ="),A(2*m,null,"num","C អប្បបរមា =")],
     "AM-GM ⇒ $C(x)\\ge2\\sqrt{"+(m*m)+"}="+(2*m)+"$ ពេល $x="+m+"$")});
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
 function(){var T=pick(TR),v=fr(T[1],T[2]);return K("s10_sinB","ត្រីកោណ $ABC$ កែងត្រង់ $C$ មាន $BC="+T[0]+"$ , $AC="+T[1]+"$ , $AB="+T[2]+"$ ។ គណនា $\\sin B$",[A(v.s,v.t,"num","sin B =")],"$\\sin B=\\dfrac{AC}{AB}="+v.t+"$",GFR({names:"ACB",w:T[0],h:T[1],base:String(T[0]),height:String(T[1]),hyp:String(T[2]),ang:{at:"base",lab:"B"}}))},
 function(){var T=pick(TR),v=fr(T[1],T[0]);return K("s10_cot","ត្រីកោណ $ABC$ កែងត្រង់ $C$ មាន $BC="+T[0]+"$ , $AC="+T[1]+"$ ។ គណនា $\\cot A$",[A(v.s,v.t,"num","cot A =")],"$\\cot A=\\dfrac{AC}{BC}="+v.t+"$",GFR({names:"ACB",w:T[0],h:T[1],base:String(T[0]),height:String(T[1]),ang:{at:"top",lab:"A"}}))},
 function(){var a=pick(SPC),b=pick(SPC),m=ri(1,4),n=ri(1,4),v=fr(m*a[1].n*b[1].d+n*b[1].n*a[1].d,a[1].d*b[1].d);return K("s10_spv","គណនា $"+m+a[0]+"+"+n+b[0]+"$",[A(v.s,v.t,"num","=")],"$"+a[0]+"="+a[1].t+"$ · $"+b[0]+"="+b[1].t+"$ ⇒ $"+v.t+"$")}]);
vx(51,2,[
 function(){var T=pick(TR),s=fr(T[0],T[2]),c=fr(T[1],T[2]);return K("s10_sc","$A$ ជាមុំស្រួចដែល $\\sin A="+s.t+"$ ។ គណនា $\\cos A$",[A(c.s,c.t,"num","cos A =")],"$\\cos A=\\sqrt{1-\\sin^2A}="+c.t+"$")},
 function(){var T=pick(TR),t=fr(T[0],T[1]),s=fr(T[0],T[2]);return K("s10_ts","$A$ ជាមុំស្រួចដែល $\\tan A="+t.t+"$ ។ គណនា $\\sin A$",[A(s.s,s.t,"num","sin A =")],"ឈម $"+T[0]+"k$ ជាប់ $"+T[1]+"k$ អ៊ីប៉ូតេនុស $"+T[2]+"k$ ⇒ $"+s.t+"$")},
 function(){var T=pick(TR),c=fr(T[1],T[2]),t=fr(T[0],T[1]);return K("s10_ct","$A$ ជាមុំស្រួចដែល $\\cos A="+c.t+"$ ។ គណនា $\\tan A$",[A(t.s,t.t,"num","tan A =")],"$\\sin A="+fr(T[0],T[2]).t+"$ ⇒ $\\tan A="+t.t+"$")}]);
vx(51,3,[
 function(){var t=pick([2,3,4,5,fr(1,2),fr(1,3),fr(3,2)]),n=typeof t==="number"?t:t.n,d=typeof t==="number"?1:t.d,r=fr(n+d,n-d),tt=typeof t==="number"?String(t):t.t;return K("s10_ex","$\\tan A="+tt+"$ ។ គណនា $E=\\dfrac{\\sin A+\\cos A}{\\sin A-\\cos A}$",[A(r.s,r.t,"num","E =")],"ចែកនឹង $\\cos A$ ⇒ $E=\\dfrac{\\tan A+1}{\\tan A-1}="+r.t+"$")},
 function(){var b=ri(10,80);return K("s10_co","រកមុំស្រួច $\\alpha$ ដែល $\\sin\\alpha=\\cos"+ang(b)+"$",[A(90-b,null,"num","α =")],"$\\sin\\alpha=\\cos(90^\\circ-\\alpha)$ ⇒ $"+ang(90-b)+"$")},
 function(){var h=2*ri(1,8),C=pick([[30,"opp"],[60,"opp"],[45,"opp"]]),ans=C[0]===30?[String(h/2),String(h/2)]:C[0]===60?[(h/2)+"*sqrt(3)",(h/2===1?"":h/2)+"\\sqrt3"]:[(h/2)+"*sqrt(2)",(h/2===1?"":h/2)+"\\sqrt2"];return K("s10_side","ត្រីកោណ $ABC$ កែងត្រង់ $C$ មានអ៊ីប៉ូតេនុស $AB="+h+"$ និង $\\widehat A="+ang(C[0])+"$ ។ គណនា $BC$",[A(ans[0],ans[1],"num","BC =")],"$BC=AB\\sin"+ang(C[0])+"="+ans[1]+"$",GFR({names:"ACB",w:Math.tan(C[0]*DG),h:1,base:"x",hyp:String(h),ang:{at:"top",lab:C[0]+"°"}}))}]);
/* ៥.២ ការអនុវត្ត */
vx(52,1,[
 function(){var L=2*ri(2,12);return K("s10_ramp","ផ្លូវឡើងទ្រេតវែង $"+L+"$ m បង្កើតមុំ $30^\\circ$ ជាមួយដី ។ តើចុងផ្លូវខ្ពស់ពីដីប៉ុន្មាន m?",[A(L/2,null,"num","h =")],"$h="+L+"\\sin30^\\circ="+(L/2)+"$",GFR({names:"",w:Math.cos(30*DG),h:.5,height:"h",hyp:L+" m",ang:{at:"base",lab:"30°"}}))},
 function(){var h=ri(3,20);return K("s10_shadow","ដើមឈើកម្ពស់ $"+h+"$ m ។ ពេលកាំរស្មីព្រះអាទិត្យធ្វើមុំ $45^\\circ$ ជាមួយដី តើស្រមោលវែងប៉ុន្មាន m?",[A(h,null,"num","=")],"$\\tan45^\\circ=1$ ⇒ ស្រមោល $="+h+"$ m",GFR({names:"",w:1,h:1,height:h+" m",base:"x",ang:{at:"base",lab:"45°"}}))},
 function(){var h=ri(5,40);return K("s10_dep","ពីកំពូលប៉មកម្ពស់ $"+h+"$ m គេមើលឃើញទូកមួយក្រោមមុំចុះ $30^\\circ$ ។ តើទូកនៅឆ្ងាយពីជើងប៉មប៉ុន្មាន m? (ទុក $\\sqrt{\\ }$)",[A(h+"*sqrt(3)",h+"\\sqrt3","num","=")],"$d=\\dfrac{h}{\\tan30^\\circ}="+h+"\\sqrt3$",GFR({names:"",w:h*1.732,h:h,height:h+" m",base:"x",ang:{at:"base",lab:"30°"}}))}]);
vx(52,2,[
 function(){var b=ri(2,10),c=ri(2,10),C=pick([[30,fr(1,2)],[150,fr(1,2)],[90,fr(1,1)]]),S=fr(b*c*C[1].n,2*C[1].d);return K("s10_area_52","ត្រីកោណ $ABC$ មាន $AB="+c+"$ , $AC="+b+"$ និង $\\widehat A="+ang(C[0])+"$ ។ គណនាផ្ទៃក្រឡា",[A(S.s,S.t,"num","S =")],"$S=\\dfrac12bc\\sin A="+S.t+"$",(function(){var a2=Math.sqrt(b*b+c*c-2*b*c*Math.cos(C[0]*DG)),Bn=cosAng(b,c,a2);return GFT({ang:[C[0],Bn,180-C[0]-Bn],lab:{A:C[0]+"°",b:String(b),c:String(c)}})})())},
 function(){var a=ri(2,10);return K("s10_iso","ត្រីកោណសមបាតមានជ្រុងអង្គ $"+a+"$ និងមុំកំពូល $120^\\circ$ ។ គណនាបាត (ទុក $\\sqrt{\\ }$)",[A(a+"*sqrt(3)",a+"\\sqrt3","num","=")],"$b^2="+(a*a)+"+"+(a*a)+"-2\\cdot"+(a*a)+"\\cos120^\\circ="+(3*a*a)+"$ ⇒ $"+a+"\\sqrt3$",GFT({ang:[120,30,30],lab:{A:"120°",b:String(a),c:String(a),a:"?"}}))},
 function(){var a=ri(1,9);return K("s10_hyp","ត្រីកោណកែងមានជ្រុងជាប់មុំកែង $"+a+"$ និង $"+a+"\\sqrt3$ ។ តើមុំឈមនឹងជ្រុង $"+a+"\\sqrt3$ ស្មើប៉ុន្មានដឺក្រេ?",[A(60,null,"num","=")],"$\\tan\\theta=\\sqrt3$ ⇒ $60^\\circ$",GFR({names:"",w:a,h:a*Math.sqrt(3),base:String(a),height:a+"√3",ang:{at:"base",lab:"θ"}}))}]);
vx(52,3,[
 function(){var a=ri(2,15);return K("s10_sinr","ត្រីកោណ $ABC$ មាន $a=BC="+a+"$ និង $\\widehat A=30^\\circ$ ។ គណនាកាំ $R$ នៃរង្វង់ចារឹកក្រៅ",[A(a,null,"num","R =")],"$\\dfrac{a}{\\sin A}=2R$ ⇒ $2R=\\dfrac{"+a+"}{1/2}$ ⇒ $R="+a+"$",GFT({ang:[30,75,75],lab:{A:"30°",a:String(a)}}))},
 function(){var a=ri(1,8),b=ri(1,8),S=fr(a*b,4);return K("s10_ar60","ត្រីកោណមានជ្រុងពីរ $"+a+"$ និង $"+b+"$ ហើយមុំរវាងវា $60^\\circ$ ។ គណនាផ្ទៃក្រឡា (ទុក $\\sqrt{\\ }$)",[A(S.s+"*sqrt(3)",(S.d===1?(S.n===1?"":S.n):"\\dfrac{"+S.n+"}{"+S.d+"}")+"\\sqrt3","num","S =")],"$\\dfrac12\\cdot"+a+"\\cdot"+b+"\\cdot\\dfrac{\\sqrt3}{2}$",(function(){var c3=Math.sqrt(a*a+b*b-a*b),An=cosAng(a,b,c3);return GFT({ang:[An,120-An,60],lab:{C:"60°",a:String(a),b:String(b)}})})())},
 function(){var b=ri(2,9),c=ri(2,9),a=ri(Math.abs(b-c)+1,b+c-1),cs=fr(b*b+c*c-a*a,2*b*c);return K("s10_cosA","ត្រីកោណមានជ្រុង $a="+a+"$ , $b="+b+"$ , $c="+c+"$ ។ គណនា $\\cos A$",[A(cs.s,cs.t,"num","cos A =")],"$\\cos A=\\dfrac{b^2+c^2-a^2}{2bc}=\\dfrac{"+(b*b+c*c-a*a)+"}{"+(2*b*c)+"}="+cs.t+"$",(function(){var A1=cosAng(a,b,c),B1=cosAng(b,a,c);return GFT({ang:[A1,B1,180-A1-B1],lab:{A:"A",a:String(a),b:String(b),c:String(c)}})})())}]);
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
 function(){var a=nz(-3,3),b=ri(-4,4),c=nz(-3,3),d=ri(-4,4),e=[a*c,a*d+b];return K("s10_comp_61","$f(x)="+co(a,"x",true)+sg(b,0)+"$ , $g(x)="+co(c,"x",true)+sg(d,0)+"$ ។ សរសេរ $f(g(x))$"+cfAsk(e),cfAns(e),"$"+a+"("+poly([c,d])+")"+sg(b,0)+"="+polyT(e)+"$")}]);
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
/* ៩.៤ ការបំប្លែងចាំង */
vx(94,1,[
 function(){var P=[nz(-4,4),ri(-4,4)],r=ri(1,3);return K("s10_inv1","រករូបភាពនៃ $A"+pt(P)+"$ តាមការបំប្លែងចាំងផ្ចិត $O$ កាំ $r="+r+"$ ($OA'=r^2/OA$)",[A(r*r*P[0]/(P[0]*P[0]+P[1]*P[1]),null,"num","x ="),A(r*r*P[1]/(P[0]*P[0]+P[1]*P[1]),null,"num","y =")],"$OA \\cdot OA' = r^2$")},
 function(){var P=[nz(-4,4),nz(-4,4)];return K("s10_inv2","ការបំប្លែងចាំងផ្ចិត $O$ បំប្លែង $A"+pt(P)+"$ ទៅ $A'$ ។ រករូបភាពនៃ $A$ បើ $r=1$",[A(P[0]/(P[0]*P[0]+P[1]*P[1]),null,"num","x ="),A(P[1]/(P[0]*P[0]+P[1]*P[1]),null,"num","y =")],"$OA' = 1/OA$")},
 function(){var r=ri(1,3);return K("s10_inv3","ចំណុច $A$ នៅចម្ងាយ $r="+r+"$ ពីផ្ចិត $O$ ។ រករូបភាពឆ្លុះតាមការបំប្លែងចាំងផ្ចិត $O$ កាំ $r$",[A(r,null,"num","OA' =")],"$OA'=r^2/OA=r^2/r=r$")}]);
vx(94,2,[
 function(){var P=[nz(-4,4),ri(-4,4)];return K("s10_inv4","ចំណុច $A(x;y)$ ឆ្លុះតាមការបំប្លែងចាំងផ្ចិត $O$ ($r=1$) ទៅ $A'(x';y')$ ។ រក $x'$",[A(P[0]/(P[0]*P[0]+P[1]*P[1]),null,"num","x' =")],"$x'=x/(x^2+y^2)$")},
 function(){var P=[nz(-4,4),ri(-4,4)];return K("s10_inv5","ចំណុច $A(x;y)$ ឆ្លុះតាមការបំប្លែងចាំងផ្ចិត $O$ ($r=1$) ទៅ $A'(x';y')$ ។ រក $y'$",[A(P[1]/(P[0]*P[0]+P[1]*P[1]),null,"num","y' =")],"$y'=y/(x^2+y^2)$")},
 function(){var r=ri(2,4);return K("s10_inv6","ផ្ចិតនៃការបំប្លែងចាំងគឺ $O$ កាំ $r="+r+"$ ។ បើ $OA=r$ តើ $OA'$ ស្មើប៉ុន្មាន?",[A(r,null,"num","OA' =")],"$OA'=r^2/OA=r^2/r=r$")}]);
vx(94,3,[
 function(){var r=ri(1,3);return K("s10_inv7","ផ្ចិតនៃការបំប្លែងចាំងគឺ $O$ កាំ $r="+r+"$ ។ បើ $OA=r/2$ តើ $OA'$ ស្មើប៉ុន្មាន?",[A(2*r,null,"num","OA' =")],"$OA'=r^2/(r/2)=2r$")},
 function(){var r=ri(1,3);return K("s10_inv8","ផ្ចិតនៃការបំប្លែងចាំងគឺ $O$ កាំ $r="+r+"$ ។ បើ $OA=2r$ តើ $OA'$ ស្មើប៉ុន្មាន?",[A(r/2,null,"num","OA' =")],"$OA'=r^2/(2r)=r/2$")},
 function(){var P=[nz(-4,4),ri(-4,4)];return K("s10_inv9","ការបំប្លែងចាំងផ្ចិត $O$ កាំ $r=2$ បំប្លែង $A"+pt(P)+"$ ទៅ $A'(x';y')$ ។ រក $x'^2+y'^2$",
    [A(16/(P[0]*P[0]+P[1]*P[1]),null,"num","x'^2+y'^2 =")],"$OA'=4/OA \\Rightarrow OA'^2=16/OA^2$")}]);

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
  ["ជំពូកទី៩ ការបំប្លែងរូបក្នុងប្លង់",[[91,"ការបំប្លែងកិល"],[92,"ការបំប្លែងឆ្លុះ"],[93,"ការបំប្លែងវិល"],[94,"ការបំប្លែងចាំង"]]]
];
X.reg(10,{les:LES,G:G});
})();
