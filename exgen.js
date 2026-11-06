/* ========================================================================
   🇰🇭 គំរូលំហាត់ប្រឡងទម្រង់បើក (ទម្រង់កម្ពុជា) — ផ្នែកមួយ = ទិន្នន័យរួម + សំណួររង ក ខ គ … (ពិបាកកើនឡើង)
   យកលំនាំតាមសៀវភៅ «លំហាត់អនុវត្តន៍ · លំហាត់ស្រាវជ្រាវបន្ថែម» (គ្រូ ផៃ ចន) · លេខប្ដូរដោយស្វ័យប្រវត្តិ · ចម្លើយគណនាពិតប្រាកដ (ប្រភាគ · √ · មុំស្តង់ដារ)
   EXGEN.list("12|11") → [{id, t, lv}] · EXGEN.make("12|11", id) → {inst, it:[{q, ans, sol}]}
   ======================================================================== */
(function(){
"use strict";
/* ---------- ជំនួយ ---------- */
function ri(a,b){return a+Math.floor(Math.random()*(b-a+1))}
function nz(a,b){var v;do{v=ri(a,b)}while(!v);return v}
function pick(a){return a[Math.floor(Math.random()*a.length)]}
function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=b;b=a%b;a=t}return a||1}
/* ប្រភាគ n/d → LaTeX */
function F(n,d){d=d||1;if(d<0){n=-n;d=-d}var g=gcd(n,d);n/=g;d/=g;return d===1?String(n):(n<0?"-":"")+"\\dfrac{"+Math.abs(n)+"}{"+d+"}"}
/* ចំនួន √ ៖ S = {n, d, r} = n/d·√r (r គ្មានការេ) */
function S(n,d,r){d=d||1;r=r||1;if(!n)return{n:0,d:1,r:1};var k=1;for(var f=2;f*f<=r;f++)while(r%(f*f)===0){r/=f*f;k*=f}n*=k;if(d<0){n=-n;d=-d}var g=gcd(n,d);return{n:n/g,d:d/g,r:r}}
function Sm(a,b){return S(a.n*b.n,a.d*b.d,a.r*b.r)}
function Sdiv(a,b){return S(a.n*b.d,a.d*b.n*b.r,a.r*b.r)}   /* a/b = (na·db)/(da·nb·rb)·√(ra·rb) */
function Sv(a){return a.n/a.d*Math.sqrt(a.r)}
function St(a,lead){   /* LaTeX · lead = តួដំបូង (មិនដាក់ +) */
  if(!a.n)return"0";var an=Math.abs(a.n),sq=a.r>1?"\\sqrt{"+a.r+"}":"",num;
  if(a.d===1)num=(an===1&&sq?"":an)+sq;else num="\\dfrac{"+(an===1&&sq?"":an)+sq+"}{"+a.d+"}";
  return(a.n<0?"-":lead===false?"+":"")+num;
}
/* ចំនួនកុំផ្លិច (ផ្នែកពិត/និមិត្ត ជា S) → a+bi */
function Ct(re,im){
  if(!im.n)return St(re);
  var ia=S(Math.abs(im.n),im.d,im.r),ip=(ia.n===1&&ia.d===1&&ia.r===1?"":ia.r>1&&ia.d===1?(ia.n===1?"":ia.n)+"\\sqrt{"+ia.r+"}\\,":St(ia))+"i";
  if(ia.r>1&&ia.d===1)ip=(ia.n===1?"":ia.n)+"i\\sqrt{"+ia.r+"}";
  return re.n?St(re)+(im.n<0?"-":"+")+ip:(im.n<0?"-":"")+ip;
}
function cxi(a,b){return Ct(S(a),S(b))}   /* ចំនួនគត់ */
function cxq(an,ad,bn,bd){return Ct(S(an,ad),S(bn,bd))}
function P(s){return/^-|[+-]/.test(s.replace(/^-/,""))||/^-/.test(s)?"("+s+")":s}
function sqrtT(n){var s=S(1,1,n);return St(s)}
/* មុំស្តង់ដារ៖ k·π/12 → LaTeX (ក្នុង (-π, π]) */
function angN(k){k=((k%24)+24)%24;if(k>12)k-=24;return k}
function angT(k){k=angN(k);if(!k)return"0";var g=gcd(k,12),n=k/g,d=12/g,a=Math.abs(n);return(k<0?"-":"")+(d===1?(a===1?"":a)+"\\pi":"\\dfrac{"+(a===1?"":a)+"\\pi}{"+d+"}")}
var COS={0:S(1),1:S(1,4,2),2:S(1,2,3),3:S(1,2,2),4:S(1,2),6:S(0)};   /* k·π/12 (រួមជាមួយ √6±√2 មិនប្រើ) */
function cs(k){   /* [cos, sin] ជា S សម្រាប់ k ពហុគុណនៃ 2 ឬ 3 */
  k=((k%24)+24)%24;var tbl={0:[1,0],2:["r3/2","1/2"],3:["r2/2","r2/2"],4:["1/2","r3/2"],6:[0,1]};
  var q=Math.floor(k/6),m=k%6,base;
  function v(x){if(x===0)return S(0);if(x===1)return S(1);var r=/r(\d)\/2/.exec(x);return r?S(1,2,+r[1]):S(1,2)}
  if(!(m in tbl))return null;base=tbl[m];var c=v(base[0]),s=v(base[1]),t;
  for(var i=0;i<q;i++){t=c;c=S(-s.n,s.d,s.r);s=t}   /* បង្វិល π/2 */
  return[c,s];
}
function trigT(r,k){return(r==="1"?"":r)+"\\left(\\cos"+angT(k).replace(/^-?/,function(m){return m?"\\left(-":""})+(angN(k)<0?"\\right)":"")+"+i\\sin"+(angN(k)<0?"\\left("+angT(k)+"\\right)":angT(k))+"\\right)"}
function trig(r,k){var a=angT(k),w=angN(k)<0?"\\left("+a+"\\right)":a;return(r==="1"?"":r)+"\\left(\\cos"+(angN(k)<0?w:" "+a)+"+i\\sin"+(angN(k)<0?w:" "+a)+"\\right)"}
/* ចំណុចស្តង់ដារ៖ z = k·(a+bi) ជាមួយ r និងមុំ (គិតជា π/12) */
var PTS=[[S(1),S(1),S(1,1,2),3],[S(-1),S(1),S(1,1,2),9],[S(-1),S(-1),S(1,1,2),-9],[S(1),S(-1),S(1,1,2),-3],
  [S(1,1,3),S(1),S(2),2],[S(-1,1,3),S(1),S(2),10],[S(-1,1,3),S(-1),S(2),-10],[S(1,1,3),S(-1),S(2),-2],
  [S(1),S(1,1,3),S(2),4],[S(-1),S(1,1,3),S(2),8],[S(-1),S(-1,1,3),S(2),-8],[S(1),S(-1,1,3),S(2),-4]];
function spt(){var p=pick(PTS),k=pick([1,1,2,2,3]),K=S(k);return{re:Sm(K,p[0]),im:Sm(K,p[1]),r:Sm(K,p[2]),a:p[3]}}
function Q(q,ans,sol){return{q:q,ans:ans,sol:sol||""}}
function item(arr){return arr}
/* ===================== ថ្នាក់ទី១២ · ចំនួនកុំផ្លិច ===================== */
var C=[
 {id:"ops",t:"ប្រមាណវិធីលើចំនួនកុំផ្លិច (ទិន្នន័យរួម)",lv:1,f:function(){
   var a=nz(-5,5),b=nz(-5,5),c=nz(-4,4),d=nz(-4,4);while(a*d===b*c){d=nz(-4,4)}
   var z1=cxi(a,b),z2=cxi(c,d),den=c*c+d*d;
   return{inst:"គេឱ្យចំនួនកុំផ្លិច $z_1="+z1+"$ និង $z_2="+z2+"$ ។",it:[
     Q("គណនា $z_1+z_2$ , $z_1-z_2$ និង $z_1\\times z_2$ ។","$z_1+z_2="+cxi(a+c,b+d)+"$ · $z_1-z_2="+cxi(a-c,b-d)+"$ · $z_1z_2="+cxi(a*c-b*d,a*d+b*c)+"$","$(a+bi)(c+di)=(ac-bd)+(ad+bc)i$"),
     Q("សរសេរ $\\dfrac{z_1}{z_2}$ ជាទម្រង់ពិជគណិត $a+bi$ ។","$\\dfrac{z_1}{z_2}="+cxq(a*c+b*d,den,b*c-a*d,den)+"$","គុណភាគយក និងភាគបែងនឹង $\\overline{z_2}="+cxi(c,-d)+"$ · ភាគបែង $="+den+"$"),
     Q("រកចំនួនកុំផ្លិចឆ្លាស់ $\\overline{z_1}$ និងម៉ូឌុល $|z_2|$ ។","$\\overline{z_1}="+cxi(a,-b)+"$ · $|z_2|="+sqrtT(den)+"$","$|z_2|=\\sqrt{"+c*c+"+"+d*d+"}$")]}}},
 {id:"alg",t:"សរសេរជាទម្រង់ពិជគណិត a+bi",lv:1,f:function(){
   var a=nz(-4,4),b=nz(-4,4),c=nz(-3,3),d=nz(-3,3),e=nz(-3,3),f=nz(-3,3),g=nz(-3,3),h=nz(-3,3),n=pick([4,6,8]),sgn=pick([1,-1]);
   var p=[1,0],base=[1,sgn];for(var i=0;i<n;i++)p=[p[0]*base[0]-p[1]*base[1],p[0]*base[1]+p[1]*base[0]];
   var den=g*g+h*h;
   return{inst:"សរសេរចំនួនកុំផ្លិចខាងក្រោមជាទម្រង់ពិជគណិត $a+bi$ (ដែល $a,b\\in\\mathbb R$)៖",it:[
     Q("$z=("+cxi(a,b)+")("+cxi(c,d)+")$","$z="+cxi(a*c-b*d,a*d+b*c)+"$"),
     Q("$z=("+cxi(e,f)+")^2$","$z="+cxi(e*e-f*f,2*e*f)+"$","$(a+bi)^2=a^2-b^2+2abi$"),
     Q("$z=\\dfrac{"+cxi(e,f)+"}{"+cxi(g,h)+"}$","$z="+cxq(e*g+f*h,den,f*g-e*h,den)+"$","គុណនឹងឆ្លាស់នៃភាគបែង"),
     Q("$z=(1"+(sgn<0?"-":"+")+"i)^{"+n+"}$","$z="+cxi(p[0],p[1])+"$","$(1\\pm i)^2=\\pm2i$")]}}},
 {id:"xy",t:"រកចំនួនពិត x និង y",lv:2,f:function(){
   var x1=nz(-4,4),y1=nz(-4,4),p=nz(1,3),q=nz(-3,3),r=nz(1,3),s=nz(-3,3);
   var x2=nz(-4,4),y2=nz(-4,4),x3=nz(-3,3),y3=nz(-3,3),a1=nz(1,3),b1=nz(-2,2),a2=nz(-2,2),b2=nz(-3,3);while(a1*b2-a2*b1===0)b2=nz(-3,3);
   return{inst:"រកចំនួនពិត $x$ និង $y$ ដែលផ្ទៀងផ្ទាត់សមភាពខាងក្រោម៖",it:[
     Q("$("+(p===1?"":p)+"x"+(q<0?q:"+"+q)+")+("+(r===1?"":r)+"y"+(s<0?s:"+"+s)+")i="+cxi(p*x1+q,r*y1+s)+"$","$x="+x1+"$ · $y="+y1+"$","ផ្នែកពិតស្មើគ្នា និងផ្នែកនិមិត្តស្មើគ្នា"),
     Q("$(x+y)+(x-y)i="+cxi(x2+y2,x2-y2)+"$","$x="+x2+"$ · $y="+y2+"$","$\\begin{cases}x+y="+(x2+y2)+"\\\\x-y="+(x2-y2)+"\\end{cases}$"),
     Q("$x("+cxi(a1,b1)+")+y("+cxi(a2,b2)+")="+cxi(a1*x3+a2*y3,b1*x3+b2*y3)+"$","$x="+x3+"$ · $y="+y3+"$")]}}},
 {id:"eq2",t:"ដោះស្រាយសមីការក្នុង ℂ",lv:2,f:function(){
   var k=ri(2,6),p=nz(-3,3),q=ri(1,4),m=pick([1,3,-1,-3]),n=pick([1,3,5]);
   var c2=(m*m+n*n);
   return{inst:"ដោះស្រាយសមីការខាងក្រោមក្នុងសំណុំចំនួនកុំផ្លិច $\\mathbb C$៖",it:[
     Q("$z^2+"+k*k+"=0$","$z=\\pm"+k+"i$","$z^2=-"+k*k+"="+k*k+"i^2$"),
     Q("$z^2"+(2*p<0?"+"+(-2*p):"-"+2*p)+"z+"+(p*p+q*q)+"=0$","$z="+cxi(p,q)+"$ ឬ $z="+cxi(p,-q)+"$","$\\Delta'=-"+q*q+"=("+(q===1?"":q)+"i)^2$"),
     Q("$4z^2"+(4*m<0?"+"+(-4*m):"-"+4*m)+"z+"+c2+"=0$","$z="+cxq(m,2,n,2)+"$ ឬ $z="+cxq(m,2,-n,2)+"$","$\\Delta'=-"+4*n*n+"=("+2*n+"i)^2$")]}}},
 {id:"modarg",t:"ម៉ូឌុល និងអាគុយម៉ង់",lv:1,f:function(){
   var L=[spt(),spt(),spt(),spt()],SB="កខគឃ";
   return{inst:"គណនាម៉ូឌុល $|z|$ និងអាគុយម៉ង់ចម្បង $\\arg z$ នៃចំនួនកុំផ្លិចខាងក្រោម៖",it:L.map(function(z){
     return Q("$z="+Ct(z.re,z.im)+"$","$|z|="+St(z.r)+"$ · $\\arg z="+angT(z.a)+"$","$\\cos\\theta=\\dfrac{a}{r}$ , $\\sin\\theta=\\dfrac{b}{r}$")})}}},
 {id:"trig",t:"ទម្រង់ត្រីកោណមាត្រ · ផលគុណ · ផលចែក · ដឺម័រ",lv:3,f:function(){
   var z1=spt(),z2=spt();while(z2.a===z1.a)z2=spt();var n=pick([3,4,6]);
   var rp=Sm(z1.r,z2.r),rq=Sdiv(z1.r,z2.r),rn=S(1);for(var i=0;i<n;i++)rn=Sm(rn,z1.r);
   var c=cs(n*z1.a),pw=c?Ct(Sm(rn,c[0]),Sm(rn,c[1])):"";
   return{inst:"គេឱ្យចំនួនកុំផ្លិច $z_1="+Ct(z1.re,z1.im)+"$ និង $z_2="+Ct(z2.re,z2.im)+"$ ។",it:[
     Q("សរសេរ $z_1$ និង $z_2$ ជាទម្រង់ត្រីកោណមាត្រ ។","$z_1="+trig(St(z1.r),z1.a)+"$ · $z_2="+trig(St(z2.r),z2.a)+"$"),
     Q("គណនា $z_1\\times z_2$ និង $\\dfrac{z_1}{z_2}$ ជាទម្រង់ត្រីកោណមាត្រ ។","$z_1z_2="+trig(St(rp),z1.a+z2.a)+"$ · $\\dfrac{z_1}{z_2}="+trig(St(rq),z1.a-z2.a)+"$","ម៉ូឌុលគុណ/ចែក · អាគុយម៉ង់បូក/ដក"),
     Q("ដោយប្រើរូបមន្តដឺម័រ គណនា $z_1^{"+n+"}$ ជាទម្រង់ពិជគណិត ។","$z_1^{"+n+"}="+pw+"$","$z_1^{"+n+"}="+trig(St(rn),n*z1.a)+"$")]}}},
 {id:"poly",t:"ពហុធាដឺក្រេទី៣ (ឫសពិត + ឫសកុំផ្លិច)",lv:3,f:function(){
   var r=nz(-3,3),p=nz(-3,3),q=ri(1,3),B=-2*p,Cc=p*p+q*q;   /* (z-r)(z²+Bz+Cc) */
   var a2=B-r,a1=Cc-r*B,a0=-r*Cc;
   var Pz="z^3"+(a2?(a2<0?"-":"+")+(Math.abs(a2)===1?"":Math.abs(a2))+"z^2":"")+(a1?(a1<0?"-":"+")+(Math.abs(a1)===1?"":Math.abs(a1))+"z":"")+(a0?(a0<0?"-":"+")+Math.abs(a0):"");
   return{inst:"គេឱ្យពហុធា $P(z)="+Pz+"$ ។",it:[
     Q("បង្ហាញថា $z_1="+r+"$ ជាឫសមួយនៃពហុធា $P(z)$ ។","$P("+r+")=0$","ជំនួស $z="+r+"$"),
     Q("ដាក់ $P(z)$ ជាផលគុណកត្តា រួចដោះស្រាយសមីការ $P(z)=0$ ក្នុងសំណុំ $\\mathbb C$ ។","$P(z)=(z"+(r<0?"+"+(-r):"-"+r)+")(z^2"+(B?(B<0?"-":"+")+Math.abs(B)+"z":"")+"+"+Cc+")$ · $z\\in\\{"+r+";\\ "+cxi(p,q)+";\\ "+cxi(p,-q)+"\\}$","ចែក $P(z)$ នឹង $z"+(r<0?"+"+(-r):"-"+r)+"$ (ហូណ័រ)")]}}},
 {id:"geo",t:"ចំនួនកុំផ្លិចក្នុងធរណីមាត្រ (ត្រីកោណ)",lv:2,f:function(){
   var ax=nz(-3,3),ay=nz(-3,3),u=nz(-3,3),v=nz(-3,3);while(!u&&!v)v=nz(-3,3);
   var bx=ax+u,by=ay+v,cx_=bx-v,cy=by+u,L2=u*u+v*v;   /* BC = i·AB → កែងត្រង់ B */
   return{inst:"នៅក្នុងប្លង់កុំផ្លិច គេមានចំណុច $A,B,C$ ដែលមានអាហ្វិករៀងគ្នា $z_A="+cxi(ax,ay)+"$ , $z_B="+cxi(bx,by)+"$ និង $z_C="+cxi(cx_,cy)+"$ ។",it:[
     Q("គណនាប្រវែងជ្រុង $AB$ , $BC$ និង $AC$ ។","$AB=BC="+sqrtT(L2)+"$ · $AC="+sqrtT(2*L2)+"$","$AB=|z_B-z_A|$"),
     Q("បង្ហាញថា ត្រីកោណ $ABC$ ជាត្រីកោណកែងសមបាតត្រង់ $B$ ។","$AB=BC$ និង $AB^2+BC^2="+(2*L2)+"=AC^2$","ពីតាគ័រច្រាស")]}}},
 {id:"root",t:"ឫសទី n នៃចំនួនកុំផ្លិច",lv:3,f:function(){
   var n=pick([2,3,4]),w=spt(),r=S(1);for(var i=0;i<n;i++)r=Sm(r,w.r);var c=cs(n*w.a);
   if(!c){w.a=pick([2,4,6,3]);c=cs(n*w.a)}
   var z=Ct(Sm(r,c[0]),Sm(r,c[1])),th=angN(n*w.a),list=[];for(var k=0;k<n;k++)list.push("w_"+k+"="+trig(St(w.r),angN((th+24*k)/n)));
   return{inst:"គេឱ្យចំនួនកុំផ្លិច $z="+z+"$ ។",it:[
     Q("សរសេរ $z$ ជាទម្រង់ត្រីកោណមាត្រ ។","$z="+trig(St(r),th)+"$"),
     Q("រកគ្រប់ឫសទី $"+n+"$ នៃ $z$ ជាទម្រង់ត្រីកោណមាត្រ ។","$"+list.join("$ · $")+"$","$w_k=\\sqrt["+n+"]{r}\\left[\\cos\\dfrac{\\theta+2k\\pi}{"+n+"}+i\\sin\\dfrac{\\theta+2k\\pi}{"+n+"}\\right]$")]}}},
 {id:"x1x2",t:"សមីការដឺក្រេទី២ មានឫសកុំផ្លិចដែលគេស្គាល់",lv:2,f:function(){
   var p=nz(-3,3),q=ri(1,3),a=-2*p,b=p*p+q*q,den=b;
   return{inst:"គេមានសមីការ $x^2+ax+b=0$ ដែល $a$ និង $b$ ជាចំនួនពិត ។",it:[
     Q("កំណត់ចំនួនពិត $a$ និង $b$ ដើម្បីឱ្យ $x_1="+cxi(p,q)+"$ ជាឫសមួយនៃសមីការ ។","$a="+a+"$ · $b="+b+"$","$x_1+x_2=-a$ , $x_1x_2=b$"),
     Q("រកឫស $x_2$ មួយទៀត រួចសរសេរ $\\dfrac{x_1}{x_2}$ ជាទម្រង់ពិជគណិត ។","$x_2="+cxi(p,-q)+"$ · $\\dfrac{x_1}{x_2}="+cxq(p*p-q*q,den,2*p*q,den)+"$","$x_2=\\overline{x_1}$")]}}}
];
/* ===================== ថ្នាក់ទី១២ · អនុគមន៍សនិទាន ===================== */
function lin(a,b,v){v=v||"x";return(a===1?"":a===-1?"-":a)+v+(b?(b<0?b:"+"+b):"")}
function pl(c){var o="",n=c.length-1;c.forEach(function(v,i){var p=n-i;if(!v)return;var a=Math.abs(v),t=p?(a===1?"":a)+(p>1?"x^{"+p+"}":"x"):String(a);o+=(v<0?"-":o?"+":"")+t});return o||"0"}
function itv(a,b,ca,cb){return(ca?"[":"(")+a+";"+b+(cb?"]":")")}
var R=[
 {id:"sign",t:"សិក្សាសញ្ញានៃអនុគមន៍",lv:1,f:function(){
   var a=nz(-4,4),b=nz(-6,6),x1=nz(-4,3),x2=x1+ri(1,4),k=pick([1,-1,2]),c1=nz(-3,3),c2=nz(-3,3);while(c1===c2)c2=nz(-3,3);var lo=Math.min(c1,c2),hi=Math.max(c1,c2);
   return{inst:"សិក្សាសញ្ញានៃអនុគមន៍ខាងក្រោម៖",it:[
     Q("$f(x)="+lin(a,b)+"$","ឫស $x="+F(-b,a)+"$ · ខាងឆ្វេងឫស $f(x)$ មានសញ្ញា"+(a>0?"អវិជ្ជមាន":"វិជ្ជមាន")+" · ខាងស្ដាំ"+(a>0?"វិជ្ជមាន":"អវិជ្ជមាន")),
     Q("$g(x)="+pl([k,-k*(x1+x2),k*x1*x2])+"$","ឫស $x_1="+x1+"$ , $x_2="+x2+"$ · ក្នុងចន្លោះឫស $g(x)$ មានសញ្ញា"+(k>0?"អវិជ្ជមាន":"វិជ្ជមាន")+" · ក្រៅចន្លោះឫស"+(k>0?"វិជ្ជមាន":"អវិជ្ជមាន"),"«ក្នុងចន្លោះឫស សញ្ញាផ្ទុយពី $a$ · ក្រៅចន្លោះឫស សញ្ញាដូច $a$»"),
     Q("$h(x)=\\dfrac{x"+(lo<0?"+"+(-lo):"-"+lo)+"}{x"+(hi<0?"+"+(-hi):"-"+hi)+"}$","$h(x)>0$ ពេល $x<"+lo+"$ ឬ $x>"+hi+"$ · $h(x)<0$ ពេល $"+lo+"<x<"+hi+"$ · $h("+lo+")=0$ · មិនកំណត់ត្រង់ $x="+hi+"$")]}}},
 {id:"oblique",t:"អាស៊ីមតូតទ្រេត (ចែកពហុធា)",lv:2,f:function(){
   var a=nz(-2,3),b=nz(-4,4),d=nz(-3,3),g=nz(-5,5),be=b,c=g-d*be;   /* f = a x + b + g/(x-d) → (x-d)(ax+b)+g */
   var num=[a,be-a*d,c];
   return{inst:"គេឱ្យអនុគមន៍ $f(x)=\\dfrac{"+pl(num)+"}{x"+(d<0?"+"+(-d):"-"+d)+"}$ មានក្រាបតំណាង $(C)$ ។",it:[
     Q("កំណត់ចំនួនពិត $\\alpha,\\beta,\\gamma$ ដែល $f(x)=\\alpha x+\\beta+\\dfrac{\\gamma}{x"+(d<0?"+"+(-d):"-"+d)+"}$ ។","$\\alpha="+a+"$ , $\\beta="+be+"$ , $\\gamma="+g+"$","ចែកពហុធា"),
     Q("ទាញរកសមីការអាស៊ីមតូតឈរ និងអាស៊ីមតូតទ្រេតនៃក្រាប $(C)$ ។","អាស៊ីមតូតឈរ $x="+d+"$ · អាស៊ីមតូតទ្រេត $y="+lin(a,be)+"$","$\\lim\\limits_{x\\to\\pm\\infty}[f(x)-("+lin(a,be)+")]=0$"),
     Q("សិក្សាទីតាំងធៀបរវាងក្រាប $(C)$ និងអាស៊ីមតូតទ្រេត ។","$f(x)-("+lin(a,be)+")=\\dfrac{"+g+"}{x"+(d<0?"+"+(-d):"-"+d)+"}$ · $(C)$ នៅ"+(g>0?"លើ":"ក្រោម")+"អាស៊ីមតូតពេល $x>"+d+"$ និងនៅ"+(g>0?"ក្រោម":"លើ")+"ពេល $x<"+d+"$")]}}},
 {id:"study",t:"សិក្សាអថេរភាព និងសង់ក្រាប",lv:3,f:function(){
   var d=nz(-2,2),m=ri(1,3),b=nz(-3,3),c=d*d+2*d*0;   /* f = x + b + m²/(x-d) ដែល extremum x=d±m */
   var num=[1,b-d,m*m-d*b];
   var fm=d-m,fp=d+m,ym=fm+b+m*m/(fm-d),yp=fp+b+m*m/(fp-d);
   return{inst:"គេឱ្យអនុគមន៍ $f(x)=\\dfrac{"+pl(num)+"}{x"+(d<0?"+"+(-d):"-"+d)+"}$ មានក្រាបតំណាង $(C)$ ។",it:[
     Q("រកដែនកំណត់ និងគណនាលីមីតត្រង់ចុងដែនកំណត់ ។","$D=\\mathbb R\\setminus\\{"+d+"\\}$ · $\\lim\\limits_{x\\to\\pm\\infty}f(x)=\\pm\\infty$ · $\\lim\\limits_{x\\to "+d+"^{\\pm}}f(x)=\\pm\\infty$"),
     Q("គណនាដេរីវេ $f'(x)$ រួចសិក្សាអថេរភាពនៃ $f$ ។","$f'(x)=\\dfrac{(x"+(fm<0?"+"+(-fm):"-"+fm)+")(x"+(fp<0?"+"+(-fp):"-"+fp)+")}{(x"+(d<0?"+"+(-d):"-"+d)+")^2}$ · អតិបរមា $f("+fm+")="+ym+"$ · អប្បបរមា $f("+fp+")="+yp+"$","$f(x)=x"+(b<0?b:"+"+b)+"+\\dfrac{"+m*m+"}{x"+(d<0?"+"+(-d):"-"+d)+"}$"),
     Q("រកអាស៊ីមតូតទាំងអស់ រួចសង់ក្រាប $(C)$ ។","អាស៊ីមតូតឈរ $x="+d+"$ · អាស៊ីមតូតទ្រេត $y=x"+(b<0?b:"+"+b)+"$")]}}},
 {id:"ineq",t:"ដោះស្រាយវិសមីការ (តារាងសញ្ញា)",lv:2,f:function(){
   var r=[nz(-5,5),nz(-5,5),nz(-5,5)];while(r[0]===r[1]||r[1]===r[2]||r[0]===r[2])r=[nz(-5,5),nz(-5,5),nz(-5,5)];
   var a=r[0],b=r[1],c=r[2],s=[a,b,c].sort(function(x,y){return x-y});
   /* (x-a)(x-b)/(x-c) ≥ 0 */
   var sign=function(x){return(x-a)*(x-b)/(x-c)};var parts=[],pts=[-1e9].concat(s,[1e9]);
   for(var i=0;i<4;i++){var mid=i===0?s[0]-1:i===3?s[2]+1:(pts[i]+pts[i+1])/2;if(sign(mid)>0){var L=i===0?"-\\infty":pts[i],U=i===3?"+\\infty":pts[i+1];parts.push((i===0?"(":(pts[i]===c?"(":"["))+L+";"+U+(i===3?")":(pts[i+1]===c?")":"]")))}}
   var tx=function(v){return"x"+(v<0?"+"+(-v):"-"+v)};
   return{inst:"ដោះស្រាយវិសមីការខាងក្រោម ដោយប្រើតារាងសញ្ញា៖",it:[
     Q("$\\dfrac{("+tx(a)+")("+tx(b)+")}{"+tx(c)+"}\\ge0$","$x\\in"+parts.join("\\cup")+"$","សិក្សាសញ្ញានៃកត្តានីមួយៗ · $x\\ne"+c+"$")]}}}
];
/* ===================== ថ្នាក់ទី១២ · លំហាត់ទម្រង់បាក់ឌុប ===================== */
function nCr(n,r){if(r<0||r>n)return 0;var v=1;for(var i=1;i<=r;i++)v=v*(n-r+i)/i;return Math.round(v)}
var CTX=[["ក្នុងកន្ត្រកមួយមានស្វាយ","ស្វាយរសជាតិផ្អែម","ស្វាយរសជាតិជូរ","ផ្លែ","កន្ត្រក"],["ក្នុងប្រអប់មួយមានឃ្លី","ឃ្លីពណ៌ក្រហម","ឃ្លីពណ៌ខៀវ","គ្រាប់","ប្រអប់"],["ក្នុងថង់មួយមានប៊ិច","ប៊ិចខៀវ","ប៊ិចក្រហម","ដើម","ថង់"]];
var PROB=[{id:"draw",t:"ប្រូបាប · ចាប់យកព្រមគ្នា",lv:2,f:function(){
  var c=pick(CTX),a=ri(8,15),b=ri(3,6),N=a+b,k=ri(5,Math.min(10,a)),T=nCr(N,3),pA=nCr(a,1)*nCr(b,2),pB=nCr(b,2)*nCr(a,1)+nCr(b,3);
  return{inst:c[0]+"សរុប $"+N+"$ "+c[3]+" ក្នុងនោះមាន"+c[1]+" $"+a+"$ "+c[3]+" និង"+c[2]+" $"+b+"$ "+c[3]+"។ គេចាប់យក $3$ "+c[3]+"ព្រមគ្នាដោយចៃដន្យ។",it:[
    Q("រកប្រូបាបនៃព្រឹត្តិការណ៍ $A$៖ «មាន"+c[1]+"តែមួយគត់»","$P(A)="+F(pA,T)+"$","$P(A)=\\dfrac{C_{"+a+"}^{1}\\cdot C_{"+b+"}^{2}}{C_{"+N+"}^{3}}=\\dfrac{"+pA+"}{"+T+"}$"),
    Q("រកប្រូបាបនៃព្រឹត្តិការណ៍ $B$៖ «មាន"+c[2]+"យ៉ាងតិចពីរ»","$P(B)="+F(pB,T)+"$","$P(B)=\\dfrac{C_{"+b+"}^{2}C_{"+a+"}^{1}+C_{"+b+"}^{3}}{C_{"+N+"}^{3}}$"),
    Q("អ្នកលូកយកពី"+c[4]+"ចង់ប្រាកដថាបាន"+c[1]+"យ៉ាងតិច $"+k+"$ "+c[3]+"។ តើត្រូវលូកយកយ៉ាងតិចប៉ុន្មាន"+c[3]+"?","$"+(b+k)+"$ "+c[3],"ករណីអាក្រក់បំផុត៖ យកបាន"+c[2]+"ទាំង $"+b+"$ មុន")]}}}];
var LIM=[{id:"lim",t:"លីមីត (ln · ត្រីកោណមាត្រ · កំណត់ a, b)",lv:2,f:function(){
  var c=nz(1,4),k=pick([1,2,3,1]),p=nz(-3,3),m=ri(2,5),n=ri(2,5),r=nz(-2,2),L=nz(-5,5),a=L-2*r,b=-r*r-a*r;
  var B=pick([
    ["\\lim\\limits_{x\\to0}\\dfrac{1-\\cos "+m+"x}{x^2}",F(m*m,2)],
    ["\\lim\\limits_{x\\to0}\\dfrac{\\sin "+m+"x}{"+n+"x}",F(m,n)],
    ["\\lim\\limits_{x\\to0}\\dfrac{e^{"+m+"x}-1}{"+n+"x}",F(m,n)],
    ["\\lim\\limits_{x\\to0}\\dfrac{\\ln(1+"+m+"x)}{"+n+"x}",F(m,n)]]);
  var Aq="\\lim\\limits_{x\\to+\\infty}\\left["+c+"-\\ln\\left(\\dfrac{"+(k===1?"":k)+"x"+(p<0?p:"+"+p)+"}{x}\\right)\\right]";
  return{inst:"",it:[
    Q("គណនាលីមីត $A="+Aq+"$ និង $B="+B[0]+"$ ។","$A="+(k===1?c:c+"-\\ln "+k)+"$ · $B="+B[1]+"$","$\\dfrac{"+(k===1?"":k)+"x"+(p<0?p:"+"+p)+"}{x}\\to "+k+"$ · លីមីតគោល"),
    Q("រកចំនួនពិត $a$ និង $b$ ដែលផ្ទៀងផ្ទាត់ $\\lim\\limits_{x\\to"+r+"}\\dfrac{x^2+ax+b}{x"+(r<0?"+"+(-r):"-"+r)+"}="+L+"$ ។","$a="+a+"$ · $b="+b+"$","ភាគយកត្រូវស្មើ $0$ ត្រង់ $x="+r+"$ ⇒ $"+(r*r)+(r<0?"":"+")+r+"a+b=0$ · លីមីត $=2("+r+")+a="+L+"$")]}}}];
var INT=[{id:"int4",t:"គណនាអាំងតេក្រាល (៤ សំណួរ)",lv:2,f:function(){
  var a=ri(2,6),b=ri(1,3),sg=pick([1,-1]),kk=pick([[1,"2(\\sqrt{2}-1)"],[3,"2(2-\\sqrt{3})"],[8,"2(3-2\\sqrt{2})"]]),pm=pick([1,-1]);
  return{inst:"គណនាអាំងតេក្រាលខាងក្រោម៖",it:[
    Q("$\\displaystyle\\int_1^2\\left(\\dfrac{"+a+"}{x^2}-\\dfrac{"+2*b+"x}{x^2+1}\\right)dx$","$"+F(a,2)+"-"+(b===1?"":b)+"\\ln\\dfrac{5}{2}$","$\\int\\dfrac{2x}{x^2+1}dx=\\ln(x^2+1)$"),
    Q("$\\displaystyle\\int_0^{\\frac{\\pi}{4}}(\\sin x"+(sg<0?"-":"+")+"\\cos x)^2dx$","$\\dfrac{\\pi}{4}"+(sg<0?"-":"+")+"\\dfrac{1}{2}$","$(\\sin x\\pm\\cos x)^2=1\\pm\\sin2x$"),
    Q("$\\displaystyle\\int_1^e\\dfrac{1}{x\\sqrt{"+kk[0]+"+\\ln x}}dx$","$"+kk[1]+"$","$\\int\\dfrac{u'}{\\sqrt u}=2\\sqrt u$ ដែល $u="+kk[0]+"+\\ln x$"),
    Q("$\\displaystyle\\int_0^1\\sqrt{e^{2x}"+(pm<0?"-":"+")+"2+e^{-2x}}\\,dx$",pm>0?"$e-\\dfrac{1}{e}$":"$e+\\dfrac{1}{e}-2$",pm>0?"$e^{2x}+2+e^{-2x}=(e^x+e^{-x})^2$":"$e^{2x}-2+e^{-2x}=(e^x-e^{-x})^2$ · $e^x-e^{-x}\\ge0$ លើ $[0,1]$")]}}}];
var ODE=[{id:"ode2",t:"សមីការឌីផេរ៉ង់ស្យែលលំដាប់ទី២",lv:2,f:function(){
  var r1=ri(1,4),r2=-ri(1,4),s=r1+r2,p=r1*r2,M=ri(2,6);
  var al=F(-M*r2,r1-r2),be=F(M*r1,r1-r2),ex=function(r){return r===1?"x":r===-1?"-x":r+"x"};
  var eq="y''"+(s?(s>0?"-":"+")+(Math.abs(s)===1?"":Math.abs(s))+"y'":"")+(p<0?"-"+(-p):"+"+p)+"y=0";
  return{inst:"គេមានសមីការឌីផេរ៉ង់ស្យែល $(E)\\colon "+eq+"$ ។",it:[
    Q("បង្ហាញថាចំពោះគ្រប់ចំនួនពិត $x$ អនុគមន៍ $f(x)=\\alpha e^{"+ex(r2)+"}+\\beta e^{"+ex(r1)+"}$ ($\\alpha,\\beta\\in\\mathbb R$) ជាចម្លើយមួយនៃ $(E)$ ។","សមីការសម្គាល់ $r^2"+(s?(s>0?"-":"+")+(Math.abs(s)===1?"":Math.abs(s))+"r":"")+(p<0?"-"+(-p):"+"+p)+"=0$ មានឫស $r_1="+r2+"$ , $r_2="+r1+"$","ជំនួស $f$ , $f'$ , $f''$ ក្នុង $(E)$"),
    Q("កំណត់ចម្លើយពិសេសមួយនៃ $(E)$ បើក្រាបតាងអនុគមន៍ចម្លើយនោះមានតម្លៃអប្បបរមាស្មើ $"+M+"$ ត្រង់ $x=0$ ។","$f(x)="+be+"e^{"+ex(r2)+"}+"+al+"e^{"+ex(r1)+"}$","$f(0)="+M+"$ និង $f'(0)=0$")]}}}];
var ELL=[{id:"ell",t:"អេលីប · ទម្រង់ស្តង់ដា",lv:2,f:function(){
  var h=nz(-3,3),k=nz(-3,3),A=pick([4,9,16,25]),Bq=pick([1,4,9].filter(function(v){return v!==A})),hor=A>Bq;
  var c2=Math.abs(A-Bq),a=Math.sqrt(Math.max(A,Bq)),b=Math.sqrt(Math.min(A,Bq)),cT=sqrtT(c2),ci=Math.sqrt(c2)%1===0?Math.sqrt(c2):0;
  var X2=Bq,Y2=A,X1=-2*h*Bq,Y1=-2*k*A,C0=Bq*h*h+A*k*k-A*Bq,g=gcd(gcd(gcd(X2,Y2),gcd(X1,Y1)),C0);
  var tm=function(v,s){return v?(v<0?"-":"+")+(Math.abs(v)===1?"":Math.abs(v))+s:""};
  var E=(X2/g===1?"":X2/g)+"x^2"+tm(Y2/g,"y^2")+tm(X1/g,"x")+tm(Y1/g,"y")+(C0/g?(C0/g<0?"":"+")+C0/g:"")+"=0";
  var sx=function(v){return v<0?"x+"+(-v):"x-"+v},sy=function(v){return v<0?"y+"+(-v):"y-"+v};
  var V=hor?"("+(h-a)+","+k+")$ , $("+(h+a)+","+k+")":"("+h+","+(k-a)+")$ , $("+h+","+(k+a)+")";
  var Fo=ci?(hor?"("+(h-ci)+","+k+")$ , $("+(h+ci)+","+k+")":"("+h+","+(k-ci)+")$ , $("+h+","+(k+ci)+")"):hor?"("+h+"-"+cT+","+k+")$ , $("+h+"+"+cT+","+k+")":"("+h+","+k+"-"+cT+")$ , $("+h+","+k+"+"+cT+")";
  return{inst:"គេមានសមីការអេលីប $(E)\\colon "+E+"$ ។",it:[
    Q("ចូរសរសេរសមីការ $(E)$ ទៅជាទម្រង់ស្តង់ដា ។","$\\dfrac{("+sx(h)+")^2}{"+A+"}+\\dfrac{("+sy(k)+")^2}{"+Bq+"}=1$","បំពេញការេ"),
    Q("កំណត់ផ្ចិត កំពូល កំណុំ ប្រវែងអ័ក្សតូច និងអ័ក្សធំ រួចសង់អេលីប ។","ផ្ចិត $("+h+","+k+")$ · កំពូល $"+V+"$ · កំណុំ $"+Fo+"$ · អ័ក្សធំ $"+2*a+"$ · អ័ក្សតូច $"+2*b+"$","$c^2=a^2-b^2="+c2+"$")]}}}];
var VEC=[{id:"vec3",t:"វ៉ិចទ័រក្នុងលំហ · ប្លង់ · ស្របគ្នា",lv:2,f:function(){
  var A,B,C,u,v,n;do{A=[ri(-2,3),ri(-2,3),ri(-2,3)];B=[ri(-2,3),ri(-2,3),ri(-2,3)];C=[ri(-2,3),ri(-2,3),ri(-2,3)];u=[B[0]-A[0],B[1]-A[1],B[2]-A[2]];v=[C[0]-A[0],C[1]-A[1],C[2]-A[2]];n=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]]}while(!n[0]&&!n[1]&&!n[2]);
  var nn=n[0]*n[0]+n[1]*n[1]+n[2]*n[2],g=gcd(gcd(n[0],n[1]),n[2]),m=n.map(function(x){return x/g}),d=-(m[0]*A[0]+m[1]*A[1]+m[2]*A[2]);
  var tm=function(v,s,f){return v?(v<0?"-":f?"":"+")+(Math.abs(v)===1?"":Math.abs(v))+s:""},pt=function(P){return"("+P.join(",")+")"};
  var pl3=tm(m[0],"x",1);pl3+=tm(m[1],"y",!pl3);pl3+=tm(m[2],"z",!pl3);pl3+=(d?(d<0?d:"+"+d):"")+"=0";
  var area=S(1,2,nn),par=["x","y","z"].map(function(w,i){var q=u[i]?(u[i]<0?"-":"+")+(Math.abs(u[i])===1?"":Math.abs(u[i]))+"t":"";return w+"="+(C[i]?C[i]+q:(q.replace(/^\+/,"")||"0"))}).join(" , ");
  return{inst:"ក្នុងតម្រុយអរតូណរម៉ាល់មានទិសដៅវិជ្ជមាន $(O,\\vec i,\\vec j,\\vec k)$ គេមានចំណុច $A"+pt(A)+"$ ; $B"+pt(B)+"$ ; $C"+pt(C)+"$ និង $D(x,y,z)$ ។",it:[
    Q("គណនា $\\vec n=\\overrightarrow{AB}\\times\\overrightarrow{AC}$ រួចគណនាផ្ទៃក្រឡានៃត្រីកោណ $ABC$ ។","$\\vec n="+pt(n)+"$ · $S_{ABC}="+St(area)+"$","$S=\\dfrac12\\left\\|\\overrightarrow{AB}\\times\\overrightarrow{AC}\\right\\|$"),
    Q("សរសេរសមីការប្លង់ $(ABC)$ ។","$"+pl3+"$","$\\vec n$ ជាវ៉ិចទ័រណរម៉ាល់ · ប្លង់កាត់តាម $A$"),
    Q("រកទំនាក់ទំនងរវាង $x,y$ និង $z$ ដើម្បីឱ្យវ៉ិចទ័រ $\\overrightarrow{AB}$ និង $\\overrightarrow{CD}$ កូលីនេអ៊ែគ្នា។ តើសំណុំចំណុច $D$ ជាអ្វី?","$"+par+"$ ($t\\in\\mathbb R$) · ជាបន្ទាត់កាត់តាម $C$ ស្របនឹង $(AB)$","$\\overrightarrow{CD}=t\\overrightarrow{AB}$")]}}}];
var FUN=[
 {id:"fexp",t:"សិក្សាអនុគមន៍ e^x (x−1) − x²/2 (ទម្រង់បាក់ឌុប)",lv:3,f:function(){
  return{inst:"គេមានអនុគមន៍ $f$ កំណត់លើ $\\mathbb R$ ដោយ $f(x)=e^x(x-1)-\\dfrac12x^2$ និងមានក្រាបតំណាង $(C)$ ។",it:[
   Q("គណនា $\\lim\\limits_{x\\to-\\infty}f(x)$ និង $\\lim\\limits_{x\\to+\\infty}f(x)$ ។","$-\\infty$ · $+\\infty$"),
   Q("គណនា $f'(x)$ រួចសិក្សាសញ្ញានៃ $f'(x)$ ។ សង់តារាងអថេរភាពនៃ $f$ ។","$f'(x)=x(e^x-1)\\ge0$ · $f$ កើនលើ $\\mathbb R$ · $f(0)=-1$"),
   Q("បង្ហាញថាសមីការ $f(x)=0$ មានឫស $\\alpha$ តែមួយគត់ដែល $\\alpha\\in[1;1.5]$ ។","$f(1)=-\\dfrac12<0$ · $f(1.5)\\approx1.12>0$ · $f$ កើនដាច់ខាត ⇒ ឫសតែមួយ"),
   Q("គេតាងប៉ារ៉ាបូល $(P)\\colon y=-\\dfrac12x^2$ ។ សិក្សាទីតាំងធៀបរវាងក្រាប $(C)$ និងប៉ារ៉ាបូល $(P)$ ។","$f(x)-y=e^x(x-1)$ · $(C)$ នៅក្រោម $(P)$ ពេល $x<1$ · លើពេល $x>1$ · កាត់គ្នាត្រង់ $x=1$"),
   Q("សង់ក្រាប $(C)$ និងប៉ារ៉ាបូល $(P)$ ក្នុងតម្រុយ $(O,\\vec i,\\vec j)$ ។ (យក $e^{1.5}\\approx4.5$)","—"),
   Q("គណនាផ្ទៃក្រឡាខណ្ឌរវាងក្រាប $(C)$ ធៀបនឹងប៉ារ៉ាបូល $(P)$ លើចន្លោះ $[0,1]$ ។","$S=\\int_0^1(1-x)e^xdx=e-2$ (ឯកតាផ្ទៃ)","$\\int(1-x)e^xdx=(2-x)e^x$")]}}},
 {id:"fln",t:"សិក្សាអនុគមន៍ x + 1 − ln x / x (ទម្រង់បាក់ឌុប)",lv:3,f:function(){
  return{inst:"គេមានអនុគមន៍ $f$ កំណត់លើ $(0;+\\infty)$ ដោយ $f(x)=x+1-\\dfrac{\\ln x}{x}$ និងមានក្រាបតំណាង $(C)$ ។",it:[
   Q("គណនា $\\lim\\limits_{x\\to0^+}f(x)$ និង $\\lim\\limits_{x\\to+\\infty}f(x)$ ។","$+\\infty$ · $+\\infty$"),
   Q("គេឱ្យ $g(x)=x^2-1+\\ln x$ ។ សិក្សាសញ្ញានៃ $g(x)$ រួចបង្ហាញថា $f'(x)=\\dfrac{g(x)}{x^2}$ ។","$g$ កើន · $g(1)=0$ · $g<0$ លើ $(0,1)$ · $g>0$ លើ $(1,+\\infty)$"),
   Q("សង់តារាងអថេរភាពនៃ $f$ ។","$f$ ចុះលើ $(0,1]$ · កើនលើ $[1,+\\infty)$ · អប្បបរមា $f(1)=2$"),
   Q("បង្ហាញថាបន្ទាត់ $(D)\\colon y=x+1$ ជាអាស៊ីមតូតទ្រេតនៃ $(C)$ រួចសិក្សាទីតាំងធៀបរវាង $(C)$ និង $(D)$ ។","$f(x)-(x+1)=-\\dfrac{\\ln x}{x}\\to0$ · $(C)$ លើ $(D)$ ពេល $0<x<1$ · ក្រោមពេល $x>1$"),
   Q("សង់ $(D)$ និង $(C)$ ក្នុងតម្រុយតែមួយ ។","—"),
   Q("គណនាផ្ទៃក្រឡាខណ្ឌដោយ $(C)$ , $(D)$ និងបន្ទាត់ $x=1$ , $x=e$ ។","$S=\\int_1^e\\dfrac{\\ln x}{x}dx=\\dfrac12$ (ឯកតាផ្ទៃ)")]}}}];
var REG={"12|11":C,"12|41":R,"12|71":PROB,"12|22":LIM,"12|51":INT,"12|62":ODE,"12|82":ELL,"12|101":VEC,"12|42":[FUN[0]],"12|43":[FUN[1]]};
/* រចនាសម្ព័ន្ធវិញ្ញាសាបាក់ឌុប (វិទ្យាសាស្ត្រ · ១៥០ នាទី · ១២៥ ពិន្ទុ) តាមវិញ្ញាសាសាកល្បង NGS */
var BAC=[[71,"draw",10],[22,"lim",15],[11,"trig",15],[51,"int4",15],[62,"ode2",10],[82,"ell",10],[101,"vec3",15],[42,null,35]];
window.EXGEN={
  has:function(k){return!!REG[k]},
  bac:function(){return BAC.map(function(x){var f=x[1]?null:pick([[42,"fexp"],[43,"fln"]]);return{ls:f?f[0]:x[0],lv:"t:"+(f?f[1]:x[1]),pts:x[2]}})},
  list:function(k){return(REG[k]||[]).map(function(x){return{id:x.id,t:x.t,lv:x.lv}})},
  make:function(k,id){var L=REG[k]||[],t=L.filter(function(x){return x.id===id})[0]||L[0];if(!t)return null;var o=t.f();o.it=o.it.map(function(x){return{q:x.q,fig:"",ans:x.ans,sol:x.sol}});return o}
};
})();
