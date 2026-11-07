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
/* ===================== ថ្នាក់ទី១២ · តាមសៀវភៅ «វិញ្ញាសាត្រៀមប្រឡងបាក់ឌុប ២០២៥» (២៣ វិញ្ញាសា) ===================== */
function co(v,s,first){if(!v)return"";var a=Math.abs(v);return(v<0?"-":first?"":"+")+(a===1&&s?"":a)+s}
function poly(t){var o="";t.forEach(function(x){o+=co(x[0],x[1],!o)});return o||"0"}
function sg(v){return v?(v<0?"-"+(-v):"+"+v):""}
function xm(v,x){x=x||"x";return v?"("+x+sg(-v)+")":x}
function cf(s){return s==="1"?"":s==="-1"?"-":s}
function at(s){return/^-/.test(s)?s:"+"+s}
function kx(m,v){return(m===1?"":m)+(v||"x")}
function ex(r){return r===1?"x":r===-1?"-x":r+"x"}
function lm(to,e){return"\\lim\\limits_{x\\to"+to+"}"+e}
var LA=[
 function(){var a=ri(1,4);return[lm(a,"\\dfrac{x^3-"+a*a*a+"}{x^2-"+a*a+"}"),F(3*a,2)]},
 function(){var a=nz(-3,4),b=nz(-3,4);while(b===a)b=nz(-3,4);return[lm(a,"\\dfrac{"+poly([[1,"x^2"],[-(a+b),"x"],[a*b,""]])+"}{x"+sg(-a)+"}"),String(a-b)]},
 function(){var d=pick([2,3]),c=ri(1,5),x0=d*d-c;return[lm(x0,"\\dfrac{\\sqrt{x"+sg(c)+"}-"+d+"}{x"+sg(-x0)+"}"),F(1,2*d)]},
 function(){var m=ri(1,4);return[lm("+\\infty","\\left(\\sqrt{x^2+"+2*m+"x}-x\\right)"),String(m)]},
 function(){var a=nz(-5,6),b=nz(-4,4),c=ri(1,5),d=ri(1,4),e=nz(-6,6);return[lm("+\\infty","\\dfrac{"+poly([[a,"x^2"],[b,"x"],[c,""]])+"}{"+poly([[d,"x^2"],[e,""]])+"}"),F(a,d)]}];
var LT=[
 function(){var m=ri(1,5),n=ri(1,5);return[lm(0,"\\dfrac{e^{"+kx(m)+"}-1}{\\sin "+kx(n)+"}"),F(m,n)]},
 function(){var m=ri(2,5);return[lm(0,"\\dfrac{1-\\cos "+kx(m)+"}{x^2}"),F(m*m,2)]},
 function(){var m=ri(1,5),n=ri(1,5);return[lm(0,"\\dfrac{\\sin "+kx(m)+"}{\\tan "+kx(n)+"}"),F(m,n)]},
 function(){var m=ri(1,5),n=ri(1,5);return[lm(0,"\\dfrac{\\ln(1+"+kx(m)+")}{"+kx(n)+"}"),F(m,n)]},
 function(){var m=ri(1,5);return[lm(0,"\\dfrac{\\sqrt{1+"+kx(m)+"}-1}{x}"),F(m,2)]},
 function(){var m=ri(1,3),n=ri(1,3);return[lm(0,"\\dfrac{\\sqrt{1+"+kx(m)+"}-\\sqrt{1-"+kx(m)+"}}{"+kx(n)+"}"),F(m,n)]},
 function(){var m=ri(1,4);return[lm(0,"\\dfrac{e^{x^2}-\\cos "+kx(m)+"}{x^2}"),F(2+m*m,2)]},
 function(){return[lm(0,"\\dfrac{\\tan x-\\sin x}{x^3}"),"\\dfrac{1}{2}"]},
 function(){var m=ri(1,4);return[lm("+\\infty","x\\ln\\left(1+\\dfrac{"+m+"}{x}\\right)"),String(m)]}];
function shuf(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=ri(0,i),t=a[i];a[i]=a[j];a[j]=t}return a}
function lim3(){var t=shuf(LT);return[pick(LA)(),t[0](),t[1]()]}
var IP=[
 function(){var a=nz(-3,4),b=nz(-4,4),c=nz(-5,5);return["\\int_0^1\\left("+poly([[a,"x^2"],[b,"x"],[c,""]])+"\\right)dx",F(2*a+3*b+6*c,6)]},
 function(){var m=ri(1,2),k=ri(1,4);return["\\int_0^"+m+"x\\left(x^2+"+k+"\\right)dx",F(m*m*m*m+2*k*m*m,4)]},
 function(){var k=ri(1,4);return["\\int_1^e\\dfrac{"+kx(k,"\\ln x")+"}{x}\\,dx",F(k,2)]},
 function(){var a=ri(2,5),c=ri(1,3);return["\\int_0^{\\ln "+a+"}\\dfrac{e^x}{e^x+"+c+"}\\,dx","\\ln "+F(a+c,1+c)]},
 function(){var a=nz(-3,4),b=nz(-3,4);return["\\int_0^{\\frac{\\pi}{2}}\\left("+poly([[a,"\\sin x"],[b,"\\cos x"]])+"\\right)dx",String(a+b)]},
 function(){return pick([["\\int_0^{\\pi}x\\sin x\\,dx","\\pi"],["\\int_0^{\\frac{\\pi}{2}}x\\cos x\\,dx","\\dfrac{\\pi}{2}-1"],["\\int_0^1xe^x\\,dx","1"],["\\int_1^e\\ln x\\,dx","1"]])},
 function(){var a=ri(1,6),b=nz(-3,3);return["\\int_1^2\\left(\\dfrac{"+a+"}{x^2}"+(b<0?"-":"+")+"\\dfrac{"+Math.abs(b)+"}{x}\\right)dx",F(a,2)+at(cf(String(b))+"\\ln 2")]},
 function(){var k=ri(1,5),n=ri(2,4);return["\\int_0^{\\frac{\\pi}{2}}"+(k===1?"":k)+"\\sin^"+n+"x\\cos x\\,dx",F(k,n+1)]},
 function(){var c=ri(2,4),b=pick([1,2,4]);return["\\int_0^"+b+"\\dfrac{"+c+"}{2x+1}\\,dx",cf(F(c,2))+"\\ln "+(2*b+1)]}];
function int3(){var t=shuf(IP);return[t[0](),t[1](),t[2]()]}
var AB="ABC",IJ="IJK";
LIM.push({id:"lim3",t:"លីមីត A, B, C (ពិជគណិត · ត្រីកោណមាត្រ · e · ln)",lv:2,f:function(){var L=lim3();
  return{inst:"គណនាលីមីតខាងក្រោម៖",it:L.map(function(x,i){return Q("$"+AB[i]+"="+x[0]+"$","$"+AB[i]+"="+x[1]+"$")})}}},
 {id:"limint",t:"ក. លីមីត A, B, C · ខ. អាំងតេក្រាល I, J, K (ទម្រង់សៀវភៅ)",lv:2,f:function(){var L=lim3(),I=int3();
  return{inst:"",it:[Q("គណនាលីមីតខាងក្រោម៖ "+L.map(function(x,i){return"$"+AB[i]+"="+x[0]+"$"}).join(" ; "),L.map(function(x,i){return"$"+AB[i]+"="+x[1]+"$"}).join(" · ")),
   Q("គណនាអាំងតេក្រាលខាងក្រោម៖ "+I.map(function(x,i){return"$"+IJ[i]+"=\\displaystyle"+x[0]+"$"}).join(" ; "),I.map(function(x,i){return"$"+IJ[i]+"="+x[1]+"$"}).join(" · "))]}}});
INT.push({id:"int3",t:"អាំងតេក្រាល I, J, K",lv:2,f:function(){var I=int3();
  return{inst:"គណនាអាំងតេក្រាលខាងក្រោម៖",it:I.map(function(x,i){return Q("$"+IJ[i]+"=\\displaystyle"+x[0]+"$","$"+IJ[i]+"="+x[1]+"$")})}}});
/* ---- ប្រូបាប ---- */
var COL=[["ក្រហម","ស","ខៀវ"],["ក្រហម","លឿង","បៃតង"],["ខៀវ","ស","ខ្មៅ"]],OBJ=[["ឃ្លី","គ្រាប់","ថង់"],["ប៊ូល","គ្រាប់","ប្រអប់"]];
function PQ(q,n,T,s){return Q(q,"$"+F(n,T)+"$",s)}
PROB.push(
 {id:"col3",t:"ប្រូបាប · ឃ្លី ៣ ពណ៌ (ចាប់ ៣ ព្រមគ្នា)",lv:2,f:function(){var c=pick(COL),o=pick(OBJ),r=ri(5,10),w=ri(3,6),b=ri(3,5),N=r+w+b,T=nCr(N,3),n=function(x){return o[0]+"ពណ៌"+x};
  return{inst:"ក្នុង"+o[2]+"មួយមាន"+n(c[0])+"ចំនួន $"+r+"$ "+o[1]+" "+n(c[1])+"ចំនួន $"+w+"$ "+o[1]+" និង"+n(c[2])+"ចំនួន $"+b+"$ "+o[1]+" ។ គេចាប់យក"+o[0]+" $3$ "+o[1]+"ដោយចៃដន្យ ។ រកប្រូបាបនៃព្រឹត្តិការណ៍ដែលគេចាប់បាន៖",it:[
   PQ(n(c[0])+"ទាំងបី"+o[1],nCr(r,3),T,"$\\dfrac{C_{"+r+"}^3}{C_{"+N+"}^3}$"),
   PQ(n(c[1])+" $2$ និង"+n(c[2])+" $1$",nCr(w,2)*b,T,"$\\dfrac{C_{"+w+"}^2C_{"+b+"}^1}{C_{"+N+"}^3}$"),
   PQ(n(c[1])+" $1$ និង"+n(c[0])+" $2$",w*nCr(r,2),T,"$\\dfrac{C_{"+w+"}^1C_{"+r+"}^2}{C_{"+N+"}^3}$"),
   PQ(o[0]+"គ្រប់ពណ៌",r*w*b,T,"$\\dfrac{"+r+"\\cdot"+w+"\\cdot"+b+"}{C_{"+N+"}^3}$")]}}},
 {id:"num",t:"ប្រូបាប · ប៊ូលមានលេខ (ចែកដាច់)",lv:2,f:function(){var P2=pick([[12,3],[12,4],[15,3],[15,5],[16,4],[16,3],[20,3],[20,4],[20,5]]),n=P2[0],k=P2[1],m=Math.floor(n/k),T=nCr(n,3),K="ចែកដាច់នឹង $"+k+"$";
  return{inst:"ក្នុងថង់មួយមានប៊ូល $"+n+"$ គ្រាប់ ដែលសរសេរលេខពី $1$ ដល់ $"+n+"$ ។ គេចាប់យកប៊ូល $3$ គ្រាប់ចេញពីថង់ដោយចៃដន្យ ។ រកប្រូបាបនៃព្រឹត្តិការណ៍ដែលគេចាប់បាន៖",it:[
   PQ("ប៊ូលទាំងបីសុទ្ធតែមានលេខ"+K,nCr(m,3),T,"មានលេខ"+K+" $"+m+"$ គ្រាប់ · $\\dfrac{C_{"+m+"}^3}{C_{"+n+"}^3}$"),
   PQ("ប៊ូលទាំងបីសុទ្ធតែមានលេខមិន"+K,nCr(n-m,3),T,"$\\dfrac{C_{"+(n-m)+"}^3}{C_{"+n+"}^3}$"),
   PQ("ប៊ូលតែមួយគត់ដែលមានលេខ"+K,m*nCr(n-m,2),T,"$\\dfrac{C_{"+m+"}^1C_{"+(n-m)+"}^2}{C_{"+n+"}^3}$")]}}},
 {id:"seq",t:"ប្រូបាប · ចាប់បន្តបន្ទាប់ មិនដាក់ចូលវិញ",lv:2,f:function(){var a=ri(8,20),b=ri(6,15),N=a+b,D=N*(N-1);
  return{inst:"ក្នុងប្រអប់មួយមានសៀវភៅគណិតវិទ្យាចំនួន $"+a+"$ ក្បាល និងសៀវភៅរូបវិទ្យាចំនួន $"+b+"$ ក្បាល ។ គេចាប់យកសៀវភៅ $2$ ក្បាល ដោយចាប់បន្តបន្ទាប់ ហើយមិនដាក់ចូលវិញ ។ រកប្រូបាបនៃព្រឹត្តិការណ៍៖",it:[
   PQ("ចាប់បានសៀវភៅគណិតវិទ្យាទាំង $2$ ក្បាល",a*(a-1),D,"$\\dfrac{"+a+"}{"+N+"}\\times\\dfrac{"+(a-1)+"}{"+(N-1)+"}$"),
   PQ("ចាប់បានសៀវភៅរូបវិទ្យាទាំង $2$ ក្បាល",b*(b-1),D,"$\\dfrac{"+b+"}{"+N+"}\\times\\dfrac{"+(b-1)+"}{"+(N-1)+"}$"),
   PQ("ចាប់បានសៀវភៅមួយក្បាលពីមុខវិជ្ជានីមួយៗ",2*a*b,D,"$2\\times\\dfrac{"+a+"}{"+N+"}\\times\\dfrac{"+b+"}{"+(N-1)+"}$")]}}},
 {id:"team",t:"ប្រូបាប · រៀបចំក្រុម ៤ នាក់",lv:2,f:function(){var g=ri(4,7),bo=ri(4,7),N=g+bo,T=nCr(N,4);
  return{inst:"ក្នុងថ្នាក់មួយមានសិស្សពូកែ $"+N+"$ នាក់ ក្នុងនោះ $"+g+"$ នាក់ជាសិស្សស្រី និង $"+bo+"$ នាក់ជាសិស្សប្រុស ។ គេរៀបចំក្រុមមួយមានសិស្ស $4$ នាក់ដោយចៃដន្យ ។ រកប្រូបាបនៃព្រឹត្តិការណ៍៖",it:[
   PQ("$A$ ៖ ក្រុមមានសុទ្ធតែសិស្សស្រី",nCr(g,4),T,"$\\dfrac{C_{"+g+"}^4}{C_{"+N+"}^4}$"),
   PQ("$B$ ៖ ក្រុមមានសុទ្ធតែសិស្សប្រុស",nCr(bo,4),T,"$\\dfrac{C_{"+bo+"}^4}{C_{"+N+"}^4}$"),
   PQ("$C$ ៖ ក្រុមមានសិស្សប្រុស $50\\%$",nCr(g,2)*nCr(bo,2),T,"$\\dfrac{C_{"+g+"}^2C_{"+bo+"}^2}{C_{"+N+"}^4}$")]}}});
/* ---- សមីការឌីផេរ៉ង់ស្យែល ---- */
ODE.push(
 {id:"full",t:"ED លំដាប់ទី២ · ចម្លើយពិសេស y(0), y'(0) · g = ax + b",lv:3,f:function(){
  var r1,r2;do{r1=nz(-5,4);r2=nz(-5,4)}while(r1===r2);var p=-(r1+r2),q=r1*r2,al=nz(-3,3),be=ri(-3,3),m=q*al,n=p*al+q*be,C1=nz(-3,3),C2=nz(-3,3),y0=C1+C2,y1=r1*C1+r2*C2;
  var L="y''"+co(p,"y'")+co(q,"y");
  return{inst:"គេឱ្យសមីការឌីផេរ៉ង់ស្យែល $(E)\\colon "+L+"="+poly([[m,"x"],[n,""]])+"$ និង $(F)\\colon "+L+"=0$ ។",it:[
   Q("ដោះស្រាយសមីការ $(F)$ ។","$y=C_1e^{"+ex(r1)+"}+C_2e^{"+ex(r2)+"}$","សមីការសម្គាល់ $"+poly([[1,"r^2"],[p,"r"],[q,""]])+"=0$ មានឫស $"+r1+"$ , $"+r2+"$"),
   Q("រកចម្លើយពិសេសមួយនៃ $(F)$ បើគេដឹងថា $y(0)="+y0+"$ និង $y'(0)="+y1+"$ ។","$y="+co(C1,"e^{"+ex(r1)+"}",true)+co(C2,"e^{"+ex(r2)+"}")+"$","$C_1+C_2="+y0+"$ , $"+r1+"C_1"+(r2<0?"":"+")+r2+"C_2="+y1+"$"),
   Q("កំណត់ចំនួនពិត $a, b$ ដើម្បីឱ្យអនុគមន៍ $g(x)=ax+b$ ជាចម្លើយមួយនៃ $(E)$ ។","$a="+al+"$ , $b="+be+"$ · $g(x)="+poly([[al,"x"],[be,""]])+"$","ជំនួស $g'=a$ , $g''=0$ ក្នុង $(E)$ រួចផ្ទឹមមេគុណ")]}}},
 {id:"rep",t:"ED លំដាប់ទី២ · ឫសឌុប (ay″+by′+cy=0)",lv:2,f:function(){
  var a=pick([1,2,2,3]),b;do{b=nz(-3,3)}while(gcd(a,b)!==1);var C1=nz(-4,4),C2=nz(-3,3),y1=F(a*C2-b*C1,a),r0=a===1?ex(-b):F(-b,a).replace("\\dfrac","\\frac")+"x";
  return{inst:"គេមានសមីការឌីផេរ៉ង់ស្យែល $(E)\\colon "+co(a*a,"y''",true)+co(2*a*b,"y'")+co(b*b,"y")+"=0$ ។",it:[
   Q("ដោះស្រាយសមីការឌីផេរ៉ង់ស្យែល $(E)$ ។","$y=(C_1+C_2x)e^{"+r0+"}$","សមីការសម្គាល់ $("+co(a,"r",true)+sg(b)+")^2=0$ មានឫសឌុប $r="+F(-b,a)+"$"),
   Q("រកចម្លើយតែមួយគត់នៃ $(E)$ បើគេដឹងថា $y(0)="+C1+"$ និង $y'(0)="+y1+"$ ។","$y=("+C1+co(C2,"x")+")e^{"+r0+"}$","$C_1=y(0)$ · $y'(0)=C_2+rC_1$")]}}});
/* ---- កោនិក ---- */
function pmT(h,t){return h?h+"\\pm "+t:"\\pm "+t}
function eqN(c){var g=c.reduce(function(s,v){return gcd(s,v[0])},0)||1,sgn=c.filter(function(v){return v[0]})[0][0]<0?-1:1;return poly(c.map(function(v){return[v[0]/g*sgn,v[1]]}))+"=0"}
var HYP=[{id:"hyp",t:"អ៊ីពែបូល · ផ្ចិត កំពូល កំណុំ អាស៊ីមតូត",lv:2,f:function(){
  var h=ri(-3,3),k=ri(-3,3),a=ri(1,4),b=ri(1,4),hor=Math.random()<.5,c2=a*a+b*b,ci=Math.sqrt(c2)%1===0?Math.sqrt(c2):0,cT=sqrtT(c2),A2=a*a,B2=b*b,E,St2,V,Fo,As;
  if(hor){E=eqN([[B2,"x^2"],[-A2,"y^2"],[-2*h*B2,"x"],[2*k*A2,"y"],[B2*h*h-A2*k*k-A2*B2,""]]);St2="\\dfrac{"+xm(h)+"^2}{"+A2+"}-\\dfrac{"+xm(k,"y")+"^2}{"+B2+"}=1";
   V="("+(h-a)+","+k+")$ , $("+(h+a)+","+k+")";Fo=ci?"("+(h-ci)+","+k+")$ , $("+(h+ci)+","+k+")":"("+pmT(h,cT)+","+k+")";As="y"+sg(-k)+"=\\pm"+cf(F(b,a))+xm(h)}
  else{E=eqN([[-A2,"x^2"],[B2,"y^2"],[2*h*A2,"x"],[-2*k*B2,"y"],[B2*k*k-A2*h*h-A2*B2,""]]);St2="\\dfrac{"+xm(k,"y")+"^2}{"+A2+"}-\\dfrac{"+xm(h)+"^2}{"+B2+"}=1";
   V="("+h+","+(k-a)+")$ , $("+h+","+(k+a)+")";Fo=ci?"("+h+","+(k-ci)+")$ , $("+h+","+(k+ci)+")":"("+h+","+pmT(k,cT)+")";As="y"+sg(-k)+"=\\pm"+cf(F(a,b))+xm(h)}
  return{inst:"គេមានអ៊ីពែបូល $(H)\\colon "+E+"$ ។",it:[
   Q("សរសេរសមីការ $(H)$ ជាទម្រង់ស្តង់ដា ។","$"+St2+"$","បំពេញការេ"),
   Q("រកកូអរដោនេផ្ចិត កំពូល កំណុំ និងសមីការអាស៊ីមតូតនៃ $(H)$ ។","ផ្ចិត $("+h+","+k+")$ · កំពូល $"+V+"$ · កំណុំ $"+Fo+"$ · អាស៊ីមតូត $"+As+"$","$c^2=a^2+b^2="+c2+"$"),
   Q("សង់អ៊ីពែបូល $(H)$ ។","—")]}}}];
var PAR=[{id:"par",t:"ប៉ារ៉ាបូល · កំពូល កំណុំ បន្ទាត់ប្រាប់ទិស",lv:2,f:function(){
  var h=ri(-3,3),k=ri(-3,3),p=pick([-2,-1,1,2]),hor=Math.random()<.5,E,St2,Fo,D;
  if(hor){E=poly([[1,"y^2"],[-4*p,"x"],[-2*k,"y"],[k*k+4*p*h,""]])+"=0";St2=xm(k,"y")+"^2="+4*p+xm(h);Fo="("+(h+p)+","+k+")";D="x="+(h-p)}
  else{E=poly([[1,"x^2"],[-2*h,"x"],[-4*p,"y"],[h*h+4*p*k,""]])+"=0";St2=xm(h)+"^2="+4*p+xm(k,"y");Fo="("+h+","+(k+p)+")";D="y="+(k-p)}
  return{inst:"គេឱ្យប៉ារ៉ាបូល $(P)\\colon "+E+"$ ។",it:[
   Q("សរសេរ $(P)$ ជាទម្រង់ស្តង់ដា ។","$"+St2+"$","បំពេញការេ"),
   Q("រកកូអរដោនេកំពូល កំណុំ និងសមីការបន្ទាត់ប្រាប់ទិសនៃ $(P)$ រួចសង់ $(P)$ ។","កំពូល $("+h+","+k+")$ · កំណុំ $"+Fo+"$ · បន្ទាត់ប្រាប់ទិស $"+D+"$","$4p="+4*p+"$ ⇒ $p="+p+"$")]}}}];
/* ---- លំហ ---- */
function pt3(P){return"("+P.join(",")+")"}
function linT(c,k){return c?c+co(k,"t"):co(k,"t",true)||"0"}
var SPC=[
 {id:"pl3m",t:"ផ្ទៃត្រីកោណ · ប្លង់ (ABC) · ចម្ងាយពីចំណុចទៅប្លង់",lv:2,f:function(){
  var A,B,C,u,v,n;do{A=[ri(-2,3),ri(-2,3),ri(-2,3)];B=[ri(-2,3),ri(-2,3),ri(-2,3)];C=[ri(-2,3),ri(-2,3),ri(-2,3)];u=[0,1,2].map(function(i){return B[i]-A[i]});v=[0,1,2].map(function(i){return C[i]-A[i]});n=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]]}while(!n[0]&&!n[1]&&!n[2]);
  var g=gcd(gcd(n[0],n[1]),n[2]),m=n.map(function(x){return x/g});if(m.filter(function(x){return x})[0]<0)m=m.map(function(x){return-x});var d=-(m[0]*A[0]+m[1]*A[1]+m[2]*A[2]),M,num;
  do{M=[ri(-3,3),ri(-3,3),ri(-3,3)];num=m[0]*M[0]+m[1]*M[1]+m[2]*M[2]+d}while(!num);
  var nn=n[0]*n[0]+n[1]*n[1]+n[2]*n[2],mm=m[0]*m[0]+m[1]*m[1]+m[2]*m[2];
  return{inst:"នៅក្នុងតម្រុយអរតូណរម៉ាល់ $(O,\\vec i,\\vec j,\\vec k)$ គេឱ្យចំណុច $A"+pt3(A)+"$ , $B"+pt3(B)+"$ , $C"+pt3(C)+"$ និង $M"+pt3(M)+"$ ។",it:[
   Q("គណនាវ៉ិចទ័រ $\\vec n=\\overrightarrow{AB}\\times\\overrightarrow{AC}$ ទាញបង្ហាញថា $C\\notin(AB)$ ។","$\\vec n="+pt3(n)+"\\ne\\vec 0$"),
   Q("គណនាក្រឡាផ្ទៃត្រីកោណ $ABC$ ។","$S="+St(S(1,2,nn))+"$","$S=\\dfrac12\\|\\vec n\\|$"),
   Q("សរសេរសមីការប្លង់ $(P)$ កាត់តាមបីចំណុច $A, B, C$ ។","$"+poly([[m[0],"x"],[m[1],"y"],[m[2],"z"],[d,""]])+"=0$"),
   Q("រកចម្ងាយពីចំណុច $M$ ទៅប្លង់ $(P)$ ។","$d="+St(S(Math.abs(num),mm,mm))+"$","$d=\\dfrac{|ax_M+by_M+cz_M+d|}{\\sqrt{a^2+b^2+c^2}}$")]}}},
 {id:"parQ",t:"ប្លង់ស្រប · ចម្ងាយរវាងប្លង់ · ចំណោលកែង H",lv:2,f:function(){
  var N=pick([[2,-3,6,7],[1,2,2,3],[2,1,-2,3],[1,-2,2,3],[6,2,3,7],[2,3,6,7],[3,-6,2,7],[2,-1,2,3]]),n=N.slice(0,3),H=[ri(-3,3),ri(-3,3),ri(-3,3)],s=pick([-2,-1,1,2]);
  var A=[0,1,2].map(function(i){return H[i]+s*n[i]}),d=-(n[0]*H[0]+n[1]*H[1]+n[2]*H[2]),d2=-(n[0]*A[0]+n[1]*A[1]+n[2]*A[2]);
  return{inst:"នៅក្នុងលំហមានតម្រុយអរតូណរម៉ាល់ គេឱ្យចំណុច $A"+pt3(A)+"$ និងប្លង់ $(P)\\colon "+poly([[n[0],"x"],[n[1],"y"],[n[2],"z"],[d,""]])+"=0$ ។",it:[
   Q("សរសេរសមីការប្លង់ $(Q)$ កាត់តាមចំណុច $A$ ហើយស្របនឹងប្លង់ $(P)$ រួចគណនាចម្ងាយរវាងប្លង់ទាំងពីរ ។","$(Q)\\colon "+poly([[n[0],"x"],[n[1],"y"],[n[2],"z"],[d2,""]])+"=0$ · ចម្ងាយ $="+Math.abs(s)*N[3]+"$","$\\|\\vec n\\|="+N[3]+"$"),
   Q("សរសេរសមីការប៉ារ៉ាម៉ែត្រនៃបន្ទាត់ $(AH)$ ដែលកែងនឹងប្លង់ $(P)$ ត្រង់ $H$ ។ រកកូអរដោនេនៃចំណុច $H$ ។","$x="+linT(A[0],n[0])+"$ , $y="+linT(A[1],n[1])+"$ , $z="+linT(A[2],n[2])+"$ · $H"+pt3(H)+"$","ជំនួសក្នុង $(P)$ ⇒ $t="+(-s)+"$")]}}}];
/* ---- សិក្សាអនុគមន៍ (៣០ ពិន្ទុ) ---- */
function FN(id,t,inst,qs){return{id:id,t:t,lv:3,f:function(){return{inst:inst,it:qs.map(function(x){return Q(x[0],x[1],x[2])})}}}}
var FE=[
 FN("fe2","សិក្សាអនុគមន៍ x − 2 + 2/(eˣ+1)","គេមានអនុគមន៍ $f$ កំណត់លើ $\\mathbb R$ ដោយ $f(x)=x-2+\\dfrac{2}{e^x+1}$ ហើយមានក្រាប $(C)$ ។",[
  ["គណនាលីមីតនៃអនុគមន៍ $f$ ត្រង់ $+\\infty$ និងត្រង់ $-\\infty$ ។","$+\\infty$ · $-\\infty$"],
  ["បង្ហាញថាបន្ទាត់ $(d_1)\\colon y=x-2$ ជាអាស៊ីមតូតទ្រេតខាង $+\\infty$ រួចសិក្សាទីតាំងធៀបរវាង $(C)$ និង $(d_1)$ ។","$f(x)-(x-2)=\\dfrac{2}{e^x+1}>0$ · $(C)$ នៅលើ $(d_1)$"],
  ["បង្ហាញថា $f(x)=x-\\dfrac{2e^x}{e^x+1}$ ។ រួចបង្ហាញថា $(d_2)\\colon y=x$ ជាអាស៊ីមតូតទ្រេតខាង $-\\infty$ ។ សិក្សាទីតាំងធៀបរវាង $(C)$ និង $(d_2)$ ។","$f(x)-x=-\\dfrac{2e^x}{e^x+1}<0$ · $(C)$ នៅក្រោម $(d_2)$"],
  ["គណនា $f'(x)$ រួចសិក្សាសញ្ញា $f'(x)$ ។ សង់តារាងអថេរភាពនៃអនុគមន៍ ។","$f'(x)=\\dfrac{e^{2x}+1}{(e^x+1)^2}>0$ · $f$ កើនលើ $\\mathbb R$"],
  ["សរសេរសមីការបន្ទាត់ប៉ះ $(T)$ ប៉ះក្រាប $(C)$ ត្រង់ $x=0$ ។","$(T)\\colon y=\\dfrac12x-1$","$f(0)=-1$ , $f'(0)=\\dfrac12$"],
  ["សង់ក្រាប $(C)$ បន្ទាត់ $(d_1), (d_2)$ និង $(T)$ ក្នុងតម្រុយតែមួយ ។","—"]]),
 FN("fxe","សិក្សាអនុគមន៍ x + e⁻ˣ","អនុគមន៍ $f$ កំណត់ដោយ $y=f(x)=x+e^{-x}$ ហើយមានក្រាប $(C)$ ។",[
  ["រកដែនកំណត់នៃ $f$ និងរកលីមីត $f$ ត្រង់ចុងដែន ។ ទាញរកអាស៊ីមតូតនៃក្រាប $(C)$ ។","$D=\\mathbb R$ · $\\lim\\limits_{x\\to\\pm\\infty}f(x)=+\\infty$ · អាស៊ីមតូតទ្រេត $y=x$ ខាង $+\\infty$ ($(C)$ នៅលើ)"],
  ["បង្ហាញ $f$ មានចំណុចអប្បបរមាតែមួយ ដែលគេត្រូវកំណត់ ។","$f'(x)=1-e^{-x}$ · អប្បបរមា $f(0)=1$"],
  ["សង់តារាងអថេរភាពនៃអនុគមន៍ $f$ ព្រមទាំងសង់ក្រាប $(C)$ ។","$f$ ចុះលើ $(-\\infty,0]$ · កើនលើ $[0,+\\infty)$"],
  ["គណនាផ្ទៃក្រឡា $S$ ខណ្ឌដោយក្រាប $(C)$ អាស៊ីមតូតទ្រេត និងបន្ទាត់ $x=0$ , $x=1$ ។","$S=\\int_0^1e^{-x}dx=1-\\dfrac1e$ (ឯកតាផ្ទៃ)"]]),
 FN("fth","សិក្សាអនុគមន៍ (1 − eˣ)/(1 + eˣ)","អនុគមន៍ $f$ កំណត់លើ $\\mathbb R$ ដោយ $y=f(x)=\\dfrac{1-e^x}{1+e^x}$ ហើយមានក្រាប $(C)$ ។",[
  ["គណនា $\\lim\\limits_{x\\to+\\infty}f(x)$ និង $\\lim\\limits_{x\\to-\\infty}f(x)$ ។ ទាញរកអាស៊ីមតូតដេកនៃក្រាប $(C)$ ។","$-1$ · $1$ · អាស៊ីមតូតដេក $y=-1$ និង $y=1$"],
  ["បង្ហាញ $f$ ជាអនុគមន៍ចុះចំពោះគ្រប់ចំនួនពិត $x$ ។ គូសតារាងអថេរភាពនៃ $f$ ។","$f'(x)=\\dfrac{-2e^x}{(1+e^x)^2}<0$"],
  ["បង្ហាញថា $f$ មានចំណុចរបត់មួយ ។ រកកូអរដោនេចំណុចរបត់នោះ ។","$f''(x)=\\dfrac{-2e^x(1-e^x)}{(1+e^x)^3}$ ប្ដូរសញ្ញាត្រង់ $x=0$ · ចំណុចរបត់ $O(0,0)$"],
  ["បង្ហាញថា $f$ ជាអនុគមន៍សេស រួចបញ្ជាក់ផ្ចិតឆ្លុះនៃ $(C)$ ។","$f(-x)=-f(x)$ · ផ្ចិតឆ្លុះ $O(0,0)$"],
  ["សរសេរសមីការបន្ទាត់ $(T)$ ប៉ះក្រាប $(C)$ ត្រង់ចំណុចរបត់ ។ សង់ $(T)$ និងក្រាប $(C)$ ។","$(T)\\colon y=-\\dfrac12x$"]]),
 FN("f4x","សិក្សាអនុគមន៍ 4 − x − 2e⁻ˣ","គេមានអនុគមន៍ $f$ កំណត់លើ $\\mathbb R$ ដោយ $f(x)=4-x-2e^{-x}$ ។ គេតាង $(C)$ ជាក្រាបរបស់ $f$ ។",[
  ["ផ្ទៀងផ្ទាត់ថា $f(x)=\\dfrac{4e^x-xe^x-2}{e^x}$ ។ គណនា $\\lim\\limits_{x\\to+\\infty}f(x)$ និង $\\lim\\limits_{x\\to-\\infty}f(x)$ ។ (ប្រើ $\\lim\\limits_{x\\to-\\infty}xe^x=0$)","$-\\infty$ · $-\\infty$"],
  ["បង្ហាញថាបន្ទាត់ $(D)\\colon y=-x+4$ ជាអាស៊ីមតូតទ្រេតនៃ $(C)$ ។ សិក្សាទីតាំងនៃ $(C)$ ធៀបនឹង $(D)$ ។","$f(x)-(-x+4)=-2e^{-x}<0$ · $(C)$ នៅក្រោម $(D)$"],
  ["គណនា $f'(x)$ ។ សិក្សាអថេរភាពនៃ $f$ និងគណនាតម្លៃអតិបរមារបស់ $f$ ។","$f'(x)=-1+2e^{-x}$ · កើនលើ $(-\\infty,\\ln2]$ · ចុះលើ $[\\ln2,+\\infty)$ · អតិបរមា $f(\\ln2)=3-\\ln2$"],
  ["$A$ ជាចំណុចនៃ $(C)$ ដែលមានអាប់ស៊ីស $0$ ។ រកសមីការបន្ទាត់ប៉ះ $(T)$ ត្រង់ $A$ ។","$(T)\\colon y=x+2$"],
  ["បង្ហាញថាសមីការ $f(x)=0$ មានឫសតែមួយគត់ $\\beta$ នៅចន្លោះ $[-1,0]$ ។","$f(-1)=5-2e<0$ · $f(0)=2>0$ · $f$ កើនដាច់ខាតលើ $[-1,0]$"],
  ["សង់បន្ទាត់ប៉ះ $(T)$ អាស៊ីមតូត $(D)$ និងក្រាប $(C)$ ។","—"]]),
 FN("fe1","សិក្សាអនុគមន៍ x + (1 − 3eˣ)/(1 + eˣ)","គេមានអនុគមន៍ $f$ កំណត់លើ $\\mathbb R$ ដោយ $f(x)=x+\\dfrac{1-3e^x}{1+e^x}$ ។ គេតាងដោយ $(C)$ ក្រាបរបស់វា ។",[
  ["បង្ហាញថា $f(x)=x+1-\\dfrac{4e^x}{1+e^x}$ និងគណនាលីមីតនៃ $f$ ត្រង់ $-\\infty$ ។ បង្ហាញថាបន្ទាត់ $(d_1)\\colon y=x+1$ ជាអាស៊ីមតូតត្រង់ $-\\infty$ ។ សិក្សាទីតាំងនៃ $(C)$ ធៀបនឹង $(d_1)$ ។","$-\\infty$ · $f(x)-(x+1)=-\\dfrac{4e^x}{1+e^x}<0$ · $(C)$ នៅក្រោម $(d_1)$"],
  ["គណនាលីមីត $f$ ត្រង់ $+\\infty$ ។ បង្ហាញថា $(d_2)\\colon y=x-3$ ជាអាស៊ីមតូតត្រង់ $+\\infty$ ។ សិក្សាទីតាំង $(C)$ ធៀបនឹង $(d_2)$ ។","$+\\infty$ · $f(x)=x-3+\\dfrac{4}{1+e^x}$ · $(C)$ នៅលើ $(d_2)$"],
  ["គណនា $f'(x)$ និងបង្ហាញថា $f'(x)=\\left(\\dfrac{e^x-1}{e^x+1}\\right)^2$ ។ សិក្សាអថេរភាពនៃ $f$ ។","$f'(x)\\ge0$ · $f$ កើនលើ $\\mathbb R$ · $f'(0)=0$ , $f(0)=-1$"],
  ["សង់ក្រាប $(C)$ និងអាស៊ីមតូត $(d_1)$ និង $(d_2)$ ។","—"]])];
var FL=[
 FN("fln2","សិក្សាអនុគមន៍ 2 + 2 ln x / x","អនុគមន៍ $f$ កំណត់ដោយ $y=f(x)=2+\\dfrac{2\\ln x}{x}$ ហើយមានក្រាប $(C)$ ។",[
  ["គណនាលីមីត $\\lim\\limits_{x\\to0^+}f(x)$ និង $\\lim\\limits_{x\\to+\\infty}f(x)$ ។ ទាញរកអាស៊ីមតូតនៃក្រាប $(C)$ ។","$-\\infty$ · $2$ · អាស៊ីមតូតឈរ $x=0$ · អាស៊ីមតូតដេក $y=2$"],
  ["គណនាដេរីវេ $f'(x)$ បញ្ជាក់ទិសដៅអថេរភាពនៃ $f$ ។ សង់តារាងអថេរភាពនៃ $f$ ។","$f'(x)=\\dfrac{2(1-\\ln x)}{x^2}$ · កើនលើ $(0,e]$ · ចុះលើ $[e,+\\infty)$ · អតិបរមា $f(e)=2+\\dfrac2e$"],
  ["សរសេរសមីការបន្ទាត់ប៉ះ $(T)$ ទៅនឹងក្រាប $(C)$ ត្រង់ $x_0=1$ ។ សង់បន្ទាត់ $(T)$ និងក្រាប $(C)$ ។","$(T)\\colon y=2x$"],
  ["រកព្រីមីទីវ $F(x)$ នៃអនុគមន៍ $f(x)$ ដោយស្គាល់ $F(1)=4$ ។","$F(x)=2x+\\ln^2x+2$","$\\int\\dfrac{2\\ln x}{x}dx=\\ln^2x$"]]),
 FN("f1x","សិក្សាអនុគមន៍ 1 − x − ln x / x (g(x) = x² + 1 − ln x)","I. គេមានអនុគមន៍ $g$ កំណត់លើ $(0,+\\infty)$ ដោយ $g(x)=x^2+1-\\ln x$ ។ II. គេមាន $f$ ជាអនុគមន៍កំណត់លើ $(0,+\\infty)$ ដោយ $f(x)=1-x-\\dfrac{\\ln x}{x}$ ហើយមានក្រាប $(C)$ ។",[
  ["គណនាដេរីវេ $g'(x)$ រួចគូសតារាងអថេរភាពនៃ $g$ ហើយទាញរកសញ្ញានៃ $g$ ។","$g'(x)=\\dfrac{2x^2-1}{x}$ · អប្បបរមា $g\\left(\\dfrac{1}{\\sqrt2}\\right)=\\dfrac32+\\dfrac{\\ln2}{2}>0$ ⇒ $g(x)>0$"],
  ["គណនា $f'(x)$ ហើយទាញ $f'(x)$ ជាអនុគមន៍នៃ $g(x)$ ព្រមទាំងបញ្ជាក់សញ្ញា $f'(x)$ ។","$f'(x)=-\\dfrac{g(x)}{x^2}<0$"],
  ["គណនាលីមីតនៃ $f$ ត្រង់ $0^+$ និង $+\\infty$ រួចគូសតារាងអថេរភាពនៃ $f$ ។","$+\\infty$ · $-\\infty$ · $f$ ចុះលើ $(0,+\\infty)$"],
  ["បង្ហាញថាបន្ទាត់ $d\\colon y=-x+1$ ជាអាស៊ីមតូតទ្រេតនៃក្រាប $(C)$ ខាង $+\\infty$ ។ សិក្សាទីតាំងរវាង $(C)$ និង $d$ ។","$f(x)-(1-x)=-\\dfrac{\\ln x}{x}\\to0$ · $(C)$ លើ $d$ ពេល $0<x<1$ · ក្រោមពេល $x>1$ · កាត់ត្រង់ $(1,0)$"],
  ["គូសខ្សែកោង $(C)$ និងបន្ទាត់ $d$ ក្នុងតម្រុយតែមួយ ។","—"]])];
var FEX=[FUN[0]].concat(FE),FLN=[FUN[1]].concat(FL);
/* ===== បន្ថែមពីសៀវភៅលំហាត់ថ្នាក់ទី១២ (មានតែទម្រង់ដែលមិនទាន់មាន) ===== */
function sqx(v,h){return h?"("+v+(h>0?"-"+h:"+"+(-h))+")^2":v+"^2"}
function lfx(v,h){return h?"("+v+(h>0?"-"+h:"+"+(-h))+")":v}
var PT3=[[3,4,5],[4,3,5],[6,8,10],[8,6,10],[5,12,13],[12,5,13]];
C.push({id:"conj",t:"សមីការមាន z̄ · iⁿ · ទម្រង់ត្រីកោណមាត្រនៃផលបូក",lv:2,f:function(){
  var p=nz(-4,4),q=nz(-4,4),a=pick([2,3,-2]),b,c;do{b=nz(-2,2);c=nz(-2,2)}while(a*a===b*b+c*c);
  var re=a*p+b*p+c*q,im=a*q+c*p-b*q,n=ri(2010,2030),r4=n%4,iv=["1","i","-1","-i"][r4];
  var SM=pick([[1,1,1,3],[-1,1,1,9],[2,-2,2,-3],[-3,3,3,9],[3,-3,3,-3],[-2,-2,2,-9]]),z1=-ri(1,5),rT=(SM[2]===1?"":SM[2])+"\\sqrt2";
  var bz=b<0?"-("+cxi(-b,-c)+")":"+("+cxi(b,c)+")";
  return{inst:"នៅក្នុងសំណុំចំនួនកុំផ្លិច $\\mathbb C$ ៖",it:[
    Q("ដោះស្រាយសមីការ $"+a+"z"+bz+"\\bar z="+cxi(re,im)+"$ ។","$z="+cxi(p,q)+"$","តាង $z=x+yi$ ⇒ $\\bar z=x-yi$ · ផ្ទឹមផ្នែកពិត និងផ្នែកនិម្មិត ⇒ ប្រព័ន្ធសមីការពីរ"),
    Q("គណនា $i^{"+n+"}$ ។","$i^{"+n+"}="+iv+"$","$i^4=1$ · $"+n+"=4\\times"+Math.floor(n/4)+"+"+r4+"$"),
    Q("គេមាន $z_1="+z1+"$ និង $z_2="+cxi(SM[0]-z1,SM[1])+"$ ។ គណនា $z_1+z_2$ រួចសរសេរ $z_1+z_2$ ជាទម្រង់ត្រីកោណមាត្រ ។","$z_1+z_2="+cxi(SM[0],SM[1])+"="+trig(rT,SM[3])+"$","$r=|z_1+z_2|="+rT+"$")]}}});
var ODE1=[{id:"ode1",t:"ED លំដាប់ទី១ · ចម្លើយ y₀ · ចម្លើយទូទៅ · y(0)",lv:2,f:function(){
  var a=pick([1,2,3,-1,-2]),b=nz(-3,3),c=ri(-3,4),E="e^{"+ex(-a)+"}",ay=a===1?"+y":a===-1?"-y":(a>0?"+":"")+a+"y";
  return{inst:"គេមានសមីការឌីផេរ៉ង់ស្យែល $(E)\\colon y'"+ay+"=("+pl([2,b])+")"+E+"$ ។",it:[
    Q("បង្ហាញថាអនុគមន៍ $y_0$ កំណត់លើ $\\mathbb R$ ដោយ $y_0(x)=("+pl([1,b,0])+")"+E+"$ ជាចម្លើយនៃ $(E)$ ។","$y_0'=("+pl([2,b])+")"+E+(a>0?"-":"+")+(Math.abs(a)===1?"":Math.abs(a))+"("+pl([1,b,0])+")"+E+"$ ⇒ $y_0'"+ay.replace("y","y_0")+"=("+pl([2,b])+")"+E+"$"),
    Q("ដោះស្រាយសមីការ $(E')\\colon y'"+ay+"=0$ ។","$y=Ce^{"+ex(-a)+"}$ , $C\\in\\mathbb R$"),
    Q("បង្ហាញថា $y$ ជាចម្លើយនៃ $(E)$ លុះត្រាតែ $y-y_0$ ជាចម្លើយនៃ $(E')$ ។ ទាញរកចម្លើយទូទៅនៃ $(E)$ ។","$y=("+pl([1,b,0])+"+C)"+E+"$","$(y-y_0)'"+ay.replace("y","(y-y_0)")+"=0$"),
    Q("រកចម្លើយពិសេសនៃ $(E)$ ដែលផ្ទៀងផ្ទាត់ $y(0)="+c+"$ ។","$y=("+pl([1,b,c])+")"+E+"$","$y(0)=C="+c+"$")]}}},
 {id:"ode1p",t:"ED លំដាប់ទី១ · y′ + ay = mx + n (ចម្លើយពហុធា)",lv:2,f:function(){
  var a=pick([1,2,3,-1,-2,-3]),p=nz(-3,3),q=ri(-3,3),m=a*p,n=p+a*q,y0=ri(-3,5),K=y0-q,E="e^{"+ex(-a)+"}",ay=a===1?"+y":a===-1?"-y":(a>0?"+":"")+a+"y";
  return{inst:"គេមានសមីការឌីផេរ៉ង់ស្យែល $(E)\\colon y'"+ay+"="+pl([m,n])+"$ ។",it:[
    Q("កំណត់ចំនួនពិត $p$ និង $q$ ដើម្បីឱ្យ $y_p=px+q$ ជាចម្លើយពិសេសនៃ $(E)$ ។","$p="+p+"$ , $q="+q+"$","$p"+(a>0?"+":"-")+(Math.abs(a)===1?"":Math.abs(a))+"(px+q)="+pl([m,n])+"$ ⇒ ផ្ទឹមមេគុណ"),
    Q("ទាញរកចម្លើយទូទៅនៃ $(E)$ ។","$y=C"+E+"+"+pl([p,q]).replace(/^\+/,"")+"$","ចម្លើយទូទៅ $=$ ចម្លើយនៃ $y'"+ay+"=0$ $+$ $y_p$"),
    Q("រកចម្លើយពិសេសនៃ $(E)$ ដែល $y(0)="+y0+"$ ។","$y="+(K===1?"":K===-1?"-":K)+(K?E:"")+(K?(p>0?"+":""):"")+pl([p,q])+"$","$C+"+(q<0?"("+q+")":q)+"="+y0+"$ ⇒ $C="+K+"$")]}}}];
SPC.push({id:"sph",t:"ស្វ៊ែ · អង្កត់ផ្ចិត [AB] · ប្លង់ប៉ះ",lv:2,f:function(){
  var A0,B0;do{A0=[ri(-2,4),ri(-2,4),ri(-2,4)];B0=A0.map(function(v){return v+2*ri(-2,2)})}while(A0.join()===B0.join());
  var I=A0.map(function(v,i){return(v+B0[i])/2}),u=A0.map(function(v,i){return v-I[i]}),R2=u[0]*u[0]+u[1]*u[1]+u[2]*u[2],d=-(u[0]*A0[0]+u[1]*A0[1]+u[2]*A0[2]);
  var V=function(v){return"("+v.join(",")+")"},eqS=sqx("x",I[0])+"+"+sqx("y",I[1])+"+"+sqx("z",I[2])+"="+R2;
  return{inst:"នៅក្នុងតម្រុយអរតូណរម៉ាល់ $(O,\\vec i,\\vec j,\\vec k)$ គេមានចំណុច $A"+V(A0)+"$ និង $B"+V(B0)+"$ ។",it:[
    Q("រកកូអរដោនេផ្ចិត $I$ និងកាំ $R$ នៃស្វ៊ែ $(S)$ ដែលមានអង្កត់ផ្ចិត $[AB]$ ។","$I"+V(I)+"$ · $R="+sqrtT(R2)+"$","$I$ ជាចំណុចកណ្ដាលនៃ $[AB]$ · $R=IA$"),
    Q("សរសេរសមីការស្វ៊ែ $(S)$ ។","$(S)\\colon "+eqS+"$"),
    Q("រកសមីការប្លង់ $(P)$ ដែលប៉ះនឹងស្វ៊ែ $(S)$ ត្រង់ចំណុច $A$ ។","$(P)\\colon "+eqN([[u[0],"x"],[u[1],"y"],[u[2],"z"],[d,""]])+"$","$(P)\\perp IA$ ⇒ វ៉ិចទ័រណរម៉ាល់ $\\overrightarrow{IA}"+V(u)+"$")]}}});
HYP.push({id:"hyp2",t:"អ៊ីពែបូល · កំណុំ + ផលដកចម្ងាយ",lv:2,f:function(){
  var T=pick(PT3),a=T[0],b=T[1],c=T[2],h=ri(-3,8),k=ri(-3,3);
  var ys=k?"y"+(k>0?"-"+k:"+"+(-k)):"y",xs=lfx("x",h);
  return{inst:"គ្រប់ចំណុច $M$ នៃអ៊ីពែបូល $(H)$ ផ្ទៀងផ្ទាត់ $|MF_1-MF_2|="+2*a+"$ ដែល $F_1("+(h-c)+","+k+")$ និង $F_2("+(h+c)+","+k+")$ ។",it:[
    Q("រកសមីការស្តង់ដានៃ $(H)$ ។","$\\dfrac{"+sqx("x",h)+"}{"+a*a+"}-\\dfrac{"+sqx("y",k)+"}{"+b*b+"}=1$","ផ្ចិត $("+h+","+k+")$ · $a="+a+"$ · $c="+c+"$ · $b^2=c^2-a^2="+b*b+"$"),
    Q("រកកូអរដោនេកំពូល និងសមីការអាស៊ីមតូតនៃ $(H)$ ។","កំពូល $("+(h-a)+","+k+")$ , $("+(h+a)+","+k+")$ · $"+ys+"=\\pm"+F(b,a)+xs+"$"),
    Q("គណនាចំណាកផ្ចិត $e$ ។","$e=\\dfrac ca="+F(c,a)+"$")]}}});
PAR.push({id:"par2",t:"ប៉ារ៉ាបូល · កំពូល + បន្ទាត់ប្រាប់ទិស",lv:2,f:function(){
  var h=ri(-3,3),k=ri(-3,3),p=nz(-3,3),ver=Math.random()<.5;
  var eq=ver?sqx("x",h)+"="+4*p+lfx("y",k):sqx("y",k)+"="+4*p+lfx("x",h);
  return{inst:"ប៉ារ៉ាបូល $(P)$ មានកំពូល $S("+h+","+k+")$ និងបន្ទាត់ប្រាប់ទិស $(d)\\colon "+(ver?"y="+(k-p):"x="+(h-p))+"$ ។",it:[
    Q("រកសមីការស្តង់ដានៃ $(P)$ ។","$"+eq+"$","$p="+p+"$ (ចម្ងាយពីកំពូលទៅ $(d)$ ដោយគិតសញ្ញា)"),
    Q("រកកូអរដោនេកំណុំ $F$ និងសមីការអ័ក្សឆ្លុះ ។",ver?"$F("+h+","+(k+p)+")$ · អ័ក្សឆ្លុះ $x="+h+"$":"$F("+(h+p)+","+k+")$ · អ័ក្សឆ្លុះ $y="+k+"$"),
    Q("គណនាប្រវែងអង្កត់ធ្នូកាត់តាមកំណុំ និងកែងនឹងអ័ក្សឆ្លុះ ។ សង់ $(P)$ ។","$|4p|="+Math.abs(4*p)+"$")]}}});
/* រចនាសម្ព័ន្ធ ក (តាមសៀវភៅ ២៣ វិញ្ញាសា)៖ I លីមីត+អាំងតេក្រាល ១៥ · II កុំផ្លិច ១៥ · III ប្រូបាប ១៥ · IV ED ១៥ · V កោនិក ១៥ · VI លំហ ២០ · VII អនុគមន៍ ៣០ */
var BAC7=[[[[22,"limint"]],15],[[[11,"trig"],[11,"eq2"],[11,"x1x2"]],15],[[[71,"col3"],[71,"num"],[71,"draw"],[71,"seq"],[71,"team"]],15],[[[62,"full"],[62,"rep"],[62,"ode2"],[61,"ode1"],[61,"ode1p"]],15],
  [[[82,"ell"],[83,"hyp"],[81,"par"]],15],[[[102,"pl3m"],[102,"parQ"],[101,"vec3"]],20],[FEX.map(function(x){return[42,x.id]}).concat(FLN.map(function(x){return[43,x.id]})),30]];
var REG={"12|11":C,"12|41":R,"12|71":PROB,"12|22":LIM,"12|51":INT,"12|61":ODE1,"12|62":ODE,"12|81":PAR,"12|82":ELL,"12|83":HYP,"12|101":VEC,"12|102":SPC,"12|42":FEX,"12|43":FLN};
/* រចនាសម្ព័ន្ធវិញ្ញាសាបាក់ឌុប (វិទ្យាសាស្ត្រ · ១៥០ នាទី · ១២៥ ពិន្ទុ) តាមវិញ្ញាសាសាកល្បង NGS */
var BAC=[[71,"draw",10],[22,"lim",15],[11,"trig",15],[51,"int4",15],[62,"ode2",10],[82,"ell",10],[101,"vec3",15],[42,null,35]];
/* ===================== ថ្នាក់ទី៩ · គំរូវិញ្ញាសាប្រឡងសញ្ញាបត្រមធ្យមសិក្សាបឋមភូមិ (ឌីប្លូម) =====================
   sol = ដំណោះស្រាយពេញលេញជាជំហាន (ភាសាខ្មែរ · ដូចសៀវភៅអត្រាកំណែ) · ans = ចម្លើយចុងក្រោយ (ព្រីនក្នុងប្រអប់ «ដូចនេះ») */
function n9(v){return String(Math.round(v*1000)/1000)}
function sgn9(c,first){return c<0?"-"+(c===-1?"":-c):(first?"":"+")+(c===1?"":c)}
function lineT(n,d,x0,y0){if(d<0){n=-n;d=-d}var g=gcd(n,d);n/=g;d/=g;var bn=y0*d-n*x0,s=n===0?"":(n===d?"":n===-d?"-":F(n,d))+"x",b=bn?F(Math.abs(bn),d):"";
  return"y="+(s?s+(bn?(bn<0?"-":"+")+b:""):(bn<0?"-":"")+(b||"0"))}
function fv(n,d){return(n*100)%d===0?n9(n/d):F(n,d)+"\\approx"+n9(Math.round(n/d*100)/100)}
function AL(r){return"$$\\begin{aligned}"+r.join("\\\\")+"\\end{aligned}$$"}
function W(){return[].slice.call(arguments).filter(function(x){return x!==""&&x!=null}).join("\n")}
function pn(v){return v<0?"("+v+")":String(v)}
function sg(v){return v<0?String(v):"+"+v}
function kx(c,v){v=v||"x";return c===1?v:c===-1?"-"+v:c+v}
function tm(c,v,first){return c<0?"-"+(c===-1?"":-c)+v:(first?"":"+")+(c===1?"":c)+v}
function fm(v){return String(v).replace(/\B(?=(\d{3})+(?!\d))/g,"\\,")}
var KL="កខគឃ";
function mcq(q,opt,ok,sol){return Q(q+"\n"+opt.map(function(o,i){return KL[i]+". $\\square$ "+o}).join("$\\qquad$"),"ជ្រើសរើស "+KL[ok]+". "+opt[ok],sol)}
function shuf9(a,ok){var o=a.map(function(v,i){return[v,i===ok]});for(var i=o.length-1;i>0;i--){var j=ri(0,i),t=o[i];o[i]=o[j];o[j]=t}return{o:o.map(function(x){return x[0]}),k:o.map(function(x){return x[1]}).indexOf(true)}}
/* ជម្រើស ៤ ខុសគ្នា (តម្លៃលេខ) → shuf9 */
function op4(c,cand,f){var o=[c];cand.concat([c+1,c-1,c+2,c-2,c+3,2*c]).forEach(function(v){if(o.length<4&&o.indexOf(v)<0)o.push(v)});return shuf9(o.map(f),0)}
var PN={3:"ត្រីកោណ",4:"ចតុកោណ",5:"បញ្ចកោណ",6:"ឆកោណ",7:"សត្តកោណ",8:"អដ្ឋកោណ",9:"នព្វកោណ",10:"ទសកោណ",12:"ទ្វាទសកោណ"};
var MC9=[
 function(){var n=pick([50,100,200,300]),v=n*1.609,s=shuf9(["$"+n9(v)+"$ km","$"+n9(v/10)+"$ km","$"+n9(v/100)+"$ km","$"+n9(v*10)+"$ km"],0);
   return mcq("តើចម្ងាយ $"+n+"$ mile ស្មើនឹងប៉ុន្មាន km ? ($1$ mile $\\approx1.609$ km)",s.o,s.k,W("ដោយ $1$ mile $\\approx1.609$ km",AL([n+"\\text{ mile}&="+n+"\\times1.609","&="+n9(v)+"\\text{ km}"])))},
 function(){var s=shuf9(["$180^\\circ$","$100^\\circ$","$150^\\circ$","$360^\\circ$"],0);return mcq("ចតុកោណចារឹកក្នុងរង្វង់ មានផលបូកមុំឈមពីរស្មើនឹង",s.o,s.k,"តាមលក្ខណៈចតុកោណចារឹកក្នុងរង្វង់ ផលបូកមុំឈមពីរស្មើនឹង $180^\\circ$ ។")},
 function(){var k=pick([2,3]),m=pick([-2,-1,1,2]),c=-k*m,s=shuf9(["$m="+m+"$","$m="+(-m)+"$","$m=0$","$m="+(m+(m>0?1:-1))+"$"],0);
   return mcq("បន្ទាត់ $D\\colon y=mx+"+k+"m"+sg(c)+"$ កាត់តាមគល់តម្រុយ $O$ កាលណា",s.o,s.k,W("$D$ កាត់តាមគល់ $O(0,0)$ នាំឱ្យ $x=0$ , $y=0$ ផ្ទៀងផ្ទាត់សមីការ $D$ ៖",AL(["0&=m(0)+"+k+"m"+sg(c),k+"m&="+(-c),"m&="+m])))},
 function(){var c=pick([4,6,8,10]),h=c/2,s=shuf9(["$"+(h===1?"":h)+"\\sqrt3$ cm","$"+h+"$ cm","$"+(h===1?"":h)+"\\sqrt2$ cm","$"+F(c,3)+"\\sqrt3$ cm"],0);
   return mcq("ត្រីកោណកែង $ABC$ មានអ៊ីប៉ូតេនុស $BC="+c+"$ cm និង $\\angle ACB=60^\\circ$ ។ ជ្រុង $AB$ មានប្រវែង",s.o,s.k,W("ក្នុងត្រីកោណកែង $ABC$ កែងត្រង់ $A$ ជ្រុង $AB$ ឈមនឹងមុំ $C$ ៖",AL(["AB&=BC\\times\\sin60^\\circ","&="+c+"\\times\\dfrac{\\sqrt3}{2}","&="+(h===1?"":h)+"\\sqrt3\\text{ cm}"])))},
 function(){var p,q;do{p=ri(3,9);q=ri(1,p-1)}while(Math.sqrt(p*q)%1===0);var v=p-q,s=shuf9(["$A="+v+"$","$A="+(v+1)+"$","$A="+(p+q)+"$","$A=0$"],0);
   return mcq("កន្សោម $A=\\sqrt{"+(p+q)+"-2\\sqrt{"+p*q+"}}\\times\\sqrt{"+(p+q)+"+2\\sqrt{"+p*q+"}}$ ស្មើនឹង",s.o,s.k,AL(["A&=\\sqrt{("+(p+q)+"-2\\sqrt{"+p*q+"})("+(p+q)+"+2\\sqrt{"+p*q+"})}","&=\\sqrt{"+(p+q)+"^2-(2\\sqrt{"+p*q+"})^2}","&=\\sqrt{"+(p+q)*(p+q)+"-"+4*p*q+"}","&=\\sqrt{"+v*v+"}="+v]))},
 function(){var k=pick([1,2,3]),s=shuf9(["$AC="+4*k+"$ cm","$AC=\\sqrt{"+34*k*k+"}$ cm","$AC=\\sqrt{"+15*k*k+"}$ cm","$AC="+8*k+"$ cm"],0);
   return mcq("ត្រីកោណកែង $ABC$ កែងត្រង់ $A$ មាន $AB="+3*k+"$ cm និង $BC="+5*k+"$ cm ។ ប្រវែង $AC$ គឺ",s.o,s.k,W("តាមទ្រឹស្ដីបទពីតាករ ក្នុងត្រីកោណកែង $ABC$ ៖",AL(["AC^2&=BC^2-AB^2","&="+5*k+"^2-"+3*k+"^2="+25*k*k+"-"+9*k*k+"="+16*k*k,"AC&=\\sqrt{"+16*k*k+"}="+4*k+"\\text{ cm}"])))},
 function(){var a=pick([[2,-3],[1,2],[-1,0]]),d=pick([3,4,5]),e=pick([4,6,7]),dd=d===e?d:e,s=shuf9(["កែង","សម័ង្ស","សមបាត","កែងសមបាត"],d===e?3:0);
   return mcq("គេឱ្យ $A("+a[0]+","+a[1]+")$ , $B("+(a[0]+d)+","+a[1]+")$ និង $C("+(a[0]+d)+","+(a[1]-dd)+")$ ។ ត្រីកោណ $ABC$ ជាត្រីកោណ",s.o,s.k,
     W(AL(["AB&=\\sqrt{"+d+"^2+0^2}="+d,"BC&=\\sqrt{0^2+("+(-dd)+")^2}="+dd,"AC&=\\sqrt{"+d+"^2+"+dd+"^2}="+sqrtT(d*d+dd*dd)]),"ដោយ $AB^2+BC^2="+(d*d+dd*dd)+"=AC^2$ នាំឱ្យត្រីកោណ $ABC$ កែងត្រង់ $B$"+(d===dd?" ហើយ $AB=BC$ ជាត្រីកោណកែងសមបាត":"")+" ។"))},
 function(){var a=pick([2,3,5,7]),t=pick([1,2,3,4,5]),v=a*t,q=sqrtT(v),s=shuf9(["$x=\\pm"+q+"$","$x="+q+"$","$x=-"+q+"$","$x="+v*v+"$"],0);
   return mcq("រកតម្លៃ $x$ ដែល $\\dfrac{x}{\\sqrt{"+a+"}}=\\dfrac{\\sqrt{"+a*t*t+"}}{x}$",s.o,s.k,AL(["\\dfrac{x}{\\sqrt{"+a+"}}&=\\dfrac{\\sqrt{"+a*t*t+"}}{x}","x^2&=\\sqrt{"+a+"}\\times\\sqrt{"+a*t*t+"}","x^2&=\\sqrt{"+a*a*t*t+"}="+v,"x&=\\pm"+q]))},
 function(){var h=pick([[2,8],[4,9],[3,12],[1,9],[3,6],[4,3],[2,6]]),p=h[0]*h[1],s=shuf9(["$AH="+sqrtT(p)+"$ cm","$AH="+(h[0]+h[1])+"$ cm","$AH="+sqrtT(2*p)+"$ cm","$AH="+p+"$ cm"],0);
   return mcq("ត្រីកោណ $ABC$ កែងត្រង់ $A$ មានកម្ពស់ $AH$ ។ បើ $BH="+h[0]+"$ cm និង $HC="+h[1]+"$ cm នោះ",s.o,s.k,W("តាមទំនាក់ទំនងមាត្រក្នុងត្រីកោណកែង $ABC$ ៖",AL(["AH^2&=BH\\times HC","&="+h[0]+"\\times"+h[1]+"="+p,"AH&="+sqrtT(p)+"\\text{ cm}"])))},
 function(){var n=pick([4,5,6,8]),S9=(n-2)*180,s=op4(S9,[S9-180,S9+180,n*180],function(v){return"$"+v+"^\\circ$"});
   return mcq("ផលបូករង្វាស់មុំក្នុងនៃ"+PN[n]+"ប៉ោងមួយស្មើនឹង",s.o,s.k,W("ផលបូកមុំក្នុងនៃពហុកោណ $n$ ជ្រុងគឺ $(n-2)\\times180^\\circ$ ។ "+PN[n]+"មាន $n="+n+"$ ៖",AL(["("+n+"-2)\\times180^\\circ&="+(n-2)+"\\times180^\\circ","&="+S9+"^\\circ"])))},
 function(){var a=pick([2,3,-2,-3,4]),b=nz(-5,5),s=shuf9(["$"+F(-1,a)+"$","$"+a+"$","$"+(-a)+"$","$"+F(1,a)+"$"],0);
   return mcq("បន្ទាត់ $d\\colon y="+kx(a)+sg(b)+"$ ។ មេគុណប្រាប់ទិសនៃបន្ទាត់ដែលកែងនឹង $d$ ស្មើនឹង",s.o,s.k,W("$d$ មានមេគុណប្រាប់ទិស $a="+a+"$ ។ បន្ទាត់កែងនឹង $d$ មានមេគុណ $a'$ ដែល ៖",AL(["a\\times a'&=-1",a+"\\,a'&=-1","a'&="+F(-1,a)])))},
 function(){var a=nz(-3,4),k=pick([1,2,3]),s=op4(a+k,[a-k,a,-(a+k)],function(v){return"$m="+v+"$"});
   return mcq("គេមានបន្ទាត់ $d_1\\colon y="+kx(a)+"+2$ និង $d_2\\colon y=(m-"+k+")x+5$ ។ $d_1\\parallel d_2$ កាលណា",s.o,s.k,W("$d_1\\parallel d_2$ លុះត្រាតែមេគុណប្រាប់ទិសស្មើគ្នា ៖",AL(["m-"+k+"&="+a,"m&="+(a+k)])))},
 function(){var t=pick([[3,4,5],[6,8,10],[5,12,13]]),sw=Math.random()<.5,dx=(sw?t[1]:t[0])*pick([1,-1]),dy=(sw?t[0]:t[1])*pick([1,-1]),xa=ri(-3,3),ya=ri(-3,3),xb=xa+dx,yb=ya+dy,c=t[2];
   var s=op4(c,[t[0]+t[1],c*c,Math.abs(t[1]-t[0])],function(v){return"$AB="+v+"$"});
   return mcq("ក្នុងតម្រុយអរតូណរមេ ចម្ងាយពីចំណុច $A("+xa+","+ya+")$ ទៅ $B("+xb+","+yb+")$ គឺ",s.o,s.k,AL(["AB&=\\sqrt{(x_B-x_A)^2+(y_B-y_A)^2}","&=\\sqrt{("+xb+"-"+pn(xa)+")^2+("+yb+"-"+pn(ya)+")^2}","&=\\sqrt{"+dx*dx+"+"+dy*dy+"}=\\sqrt{"+c*c+"}="+c]))},
 function(){var p=ri(1,5),q;do{q=ri(1,7)}while(q===p);var s=shuf9(["$x="+p+" , x="+q+"$","$x="+(-p)+" , x="+(-q)+"$","$x="+(p+q)+" , x="+p*q+"$","$x=0 , x="+(p+q)+"$"],0);
   return mcq("សមីការ $"+pl([1,-(p+q),p*q])+"=0$ មានឫស",s.o,s.k,W(AL([pl([1,-(p+q),p*q])+"&=0","(x-"+p+")(x-"+q+")&=0"]),"$x-"+p+"=0$ ឬ $x-"+q+"=0$ ⇒ $x="+p+"$ ឬ $x="+q+"$"))},
 function(){var r=pick([2,3,5]),k;do{k=[ri(2,6),ri(2,6),ri(1,5)]}while(k[0]===k[1]||k[0]-k[1]+k[2]===0);var v=k[0]-k[1]+k[2],R=function(c){return(c===1?"":c===-1?"-":c)+"\\sqrt{"+r+"}"};
   var s=op4(v,[k[0]+k[1]+k[2],-v,k[0]-k[1]],R);
   return mcq("តម្លៃនៃកន្សោម $\\sqrt{"+k[0]*k[0]*r+"}-\\sqrt{"+k[1]*k[1]*r+"}+\\sqrt{"+k[2]*k[2]*r+"}$ គឺ",s.o,s.k,AL(["&\\sqrt{"+k[0]*k[0]*r+"}-\\sqrt{"+k[1]*k[1]*r+"}+\\sqrt{"+k[2]*k[2]*r+"}","={}&\\sqrt{"+k[0]*k[0]+"\\times"+r+"}-\\sqrt{"+k[1]*k[1]+"\\times"+r+"}+\\sqrt{"+k[2]*k[2]+"\\times"+r+"}","={}&"+R(k[0])+"-"+R(k[1])+"+"+R(k[2]),"={}&"+R(v)]))}];
var D9={
 mcq:{id:"mcq",t:"ពហុជម្រើស (គូសសញ្ញា ✓)",lv:1,f:function(){var a=ri(0,MC9.length-1),b;do{b=ri(0,MC9.length-1)}while(b===a);
   return{inst:"ចូរគូសសញ្ញា ✓ ក្នុងប្រអប់ខាងមុខចម្លើយដែលត្រឹមត្រូវតែមួយគត់",it:[MC9[a](),MC9[b]()]}}},
 rad:{id:"rad",t:"គណនាកន្សោមរ៉ាឌីកាល់ (√ · ∛ · ពន្លាតឫស)",lv:2,f:function(){
   var a=ri(2,9)*101,b=ri(2,9)*101,p=ri(2,9),q=ri(2,5),c=ri(1,5),A=a*p+b*q+c,m=pick([5,3,2]),k=[ri(1,4),ri(1,4),ri(2,4)],w=[nz(1,3),nz(1,3),-nz(1,3)],N=w[0]*k[0]+w[1]*k[1]+w[2]*k[2];
   var P,Qq;do{P=pick([4,9,16,2,3,5,6,7]);Qq=ri(1,6)}while(Qq>=P||Math.sqrt(P*Qq)%1===0);var T=function(v){return Math.sqrt(v)%1===0?String(Math.sqrt(v)):"\\sqrt{"+v+"}"},q2=function(t){return/sqrt/.test(t)?"("+t+")^2":t+"^2"};
   var cb=function(v){return(v===1?"":v===-1?"-":v)+"\\sqrt[3]{"+m+"}"},Nt=N===0?"0":cb(N);
   var B1=k.map(function(v,i){return sgn9(w[i],!i)+"\\sqrt[3]{"+v*v*v*m+"}"}).join(""),B2=k.map(function(v,i){return sgn9(w[i],!i)+"\\sqrt[3]{"+(v===1?"":v*v*v+"\\times")+m+"}"}).join(""),
     B3=k.map(function(v,i){var t=w[i]*v;return(i&&t>0?"+":"")+cb(t)}).join("");
   return{inst:"",it:[
     Q("គណនាកន្សោម $A="+a+"\\sqrt{"+p*p+"}+"+b+"\\sqrt{"+q*q+"}+\\sqrt{(-"+c+")^2}$ និង $B="+B1+"$ ។","$A="+A+"$ , $B="+Nt+"$",
       W(AL(["A&="+a+"\\sqrt{"+p*p+"}+"+b+"\\sqrt{"+q*q+"}+\\sqrt{(-"+c+")^2}","&="+a+"\\times"+p+"+"+b+"\\times"+q+"+|-"+c+"|","&="+a*p+"+"+b*q+"+"+c,"&="+A]),AL(["B&="+B1,"&="+B2,"&="+B3,"&="+Nt]))),
     Q("សម្រួលកន្សោម $E=\\sqrt{"+(P+Qq)+"-"+sqrtT(4*P*Qq)+"}$ ។","$E="+T(P)+"-"+T(Qq)+"$",
       W(AL(["E&=\\sqrt{"+(P+Qq)+"-"+sqrtT(4*P*Qq)+"}","&=\\sqrt{"+q2(T(P))+"-2\\times"+T(P)+"\\times"+T(Qq)+"+"+q2(T(Qq))+"}","&=\\sqrt{("+T(P)+"-"+T(Qq)+")^2}","&=\\left|"+T(P)+"-"+T(Qq)+"\\right|"]),"ដោយ $"+T(P)+">"+T(Qq)+"$ នោះ $\\left|"+T(P)+"-"+T(Qq)+"\\right|="+T(P)+"-"+T(Qq)+"$"))]}}},
 expr:{id:"expr",t:"កន្សោមពីជគណិត · ពន្លាត · ផលគុណកត្តា · រក x",lv:2,f:function(){
   var r,s,m,n,L,Kk;do{r=ri(1,3);s=nz(-3,4);m=pick([2,3]);n=ri(2,5);L=1-m+n;Kk=-r-m*s+n*r}while(!L||!Kk||r*L===Kk||Kk%L===0&&-Kk/L===r);
   var C="x^2-"+2*r+"x+"+r*r+"+(x"+sg(s)+")("+m*r+"-"+m+"x)+"+n+"(x^2-"+r*r+")",v=-r*Kk,x2=F(r*L-Kk,L),R=pl([L,Kk-r*L,-r*Kk]);
   return{inst:"គេឱ្យកន្សោម $C="+C+"$ ។",it:[
     Q("ពន្លាតកន្សោម $C$ រួចរៀបតាមលំដាប់ដឺក្រេចុះនៃ $x$ ។","$C="+R+"$",
       AL(["C&="+pl([1,-2*r,r*r])+"+("+pl([-m,m*r-m*s,s*m*r])+")+("+pl([n,0,-n*r*r])+")","&=(1-"+m+"+"+n+")x^2+("+(-2*r)+sg(m*r-m*s)+")x+("+r*r+sg(s*m*r)+sg(-n*r*r)+")","&="+R])),
     Q("ដាក់កន្សោម $C$ ជាផលគុណកត្តាដឺក្រេទី $1$ ។","$C=(x-"+r+")("+lin(L,Kk)+")$",
       W("ដោយ $x^2-"+2*r+"x+"+r*r+"=(x-"+r+")^2$ , $"+m*r+"-"+m+"x=-"+m+"(x-"+r+")$ និង $x^2-"+r*r+"=(x-"+r+")(x+"+r+")$",
         AL(["C&=(x-"+r+")^2-"+m+"(x-"+r+")(x"+sg(s)+")+"+n+"(x-"+r+")(x+"+r+")","&=(x-"+r+")\\left[(x-"+r+")-"+m+"(x"+sg(s)+")+"+n+"(x+"+r+")\\right]","&=(x-"+r+")("+lin(L,Kk)+")"]))),
     Q("រកតម្លៃ $x$ ប្រសិនបើ $C="+v+"$ ។","$x=0$ ឬ $x="+x2+"$",
       W(AL([R+"&="+v,pl([L,Kk-r*L,0])+"&=0","x("+lin(L,Kk-r*L)+")&=0"]),"$x=0$ ឬ $"+lin(L,Kk-r*L)+"=0$ ⇒ $x="+x2+"$"))]}}},
 eq:{id:"eq",t:"សមីការ · វិសមីការ · សមីការប្រភាគ",lv:2,f:function(){
   var a=nz(-3,3),b=nz(-3,3),c=nz(-3,3),d,x=ri(-9,9),Ld;do{d=nz(-3,3);Ld=2*a+3*c-3*b-4*d}while(!Ld);var Cc=Ld*x+a*a-3*b*c,Rr=Cc-a*a+3*b*c;
   var p=ri(1,9),q=ri(1,9),cc=pick([1,2]),dd=ri(1,5),R=p+3*q-4*dd,r=pick([1,2,3]),y;do{y=nz(-5,5)}while(y===r||y===-r);var aa=3*r*y+r*r,K=-2-4*cc;
   return{inst:"",it:[
     Q("ដោះស្រាយសមីការ $(x"+sg(a)+")^2+3(x"+sg(-b)+")(x"+sg(c)+")=4x(x"+sg(d)+")"+sg(Cc)+"$ ។","$x="+x+"$",
       AL(["(x"+sg(a)+")^2+3(x"+sg(-b)+")(x"+sg(c)+")&=4x(x"+sg(d)+")"+sg(Cc),pl([1,2*a,a*a])+"+3("+pl([1,c-b,-b*c])+")&="+pl([4,4*d,Cc]),pl([4,2*a+3*c-3*b,a*a-3*b*c])+"&="+pl([4,4*d,Cc]),kx(Ld)+"&="+Rr,"x&="+x])),
     Q("ដោះស្រាយវិសមីការ $\\dfrac{"+lin(1,-p)+"}{12}-\\dfrac{"+lin(1,q)+"}{4}<\\dfrac{"+lin(cc,-dd)+"}{3}$ ។","$x>"+F(-R,-K)+"$",
       W("គុណអង្គទាំងពីរនឹង $12$ ៖",AL(["("+lin(1,-p)+")-3("+lin(1,q)+")&<4("+lin(cc,-dd)+")",pl([-2,-p-3*q])+"&<"+pl([4*cc,-4*dd]),kx(K)+"&<"+R]),"ចែកអង្គទាំងពីរនឹង $"+K+"<0$ ត្រូវប្ដូរទិសសញ្ញា ៖ $x>"+F(R,K)+"$")),
     Q("ដោះស្រាយសមីការ $\\dfrac{"+aa+"}{x^2-"+r*r+"}+\\dfrac{x}{x+"+r+"}=\\dfrac{x+"+r+"}{x-"+r+"}$ ។","$x="+y+"$",
       W("លក្ខខណ្ឌ ៖ $x\\ne"+r+"$ និង $x\\ne-"+r+"$ ។ គុណអង្គទាំងពីរនឹង $(x-"+r+")(x+"+r+")$ ៖",
         AL([aa+"+x(x-"+r+")&=(x+"+r+")^2",aa+"+x^2-"+kx(r)+"&=x^2+"+kx(2*r)+"+"+r*r,(aa-r*r)+"&="+kx(3*r),"x&="+y]),"$x="+y+"$ ផ្ទៀងផ្ទាត់លក្ខខណ្ឌ"))]}}},
 sys:{id:"sys",t:"ប្រព័ន្ធសមីការ · មានចម្លើយតែមួយ · គ្មានចម្លើយ · ចម្លើយច្រើនរាប់មិនអស់",lv:2,f:function(){
   var x0=ri(-4,5),y0=ri(-4,5),a1,b1,a2,b2;do{a1=ri(1,4);a2=ri(1,5);b1=nz(-4,4);b2=nz(-4,4)}while(a1*b2===a2*b1||a1===a2&&b1===b2);
   var c1=a1*x0+b1*y0,c2=a2*x0+b2*y0,E=function(a,b,c){return tm(a,"x",true)+tm(b,"y")+"="+c},Dy=a2*b1-a1*b2,Dc=a2*c1-a1*c2;
   var s=ri(3,9),k=pick([2,3,4]),t=k*s+pick([-3,-2,2,3]),p=ri(1,4),q=nz(-3,3),u=ri(1,9),k2=pick([2,3]);
   return{inst:"ដោះស្រាយប្រព័ន្ធសមីការខាងក្រោម ៖",it:[
     Q("$\\begin{cases}"+E(a1,b1,c1)+"\\quad(1)\\\\"+E(a2,b2,c2)+"\\quad(2)\\end{cases}$","$(x,y)=("+x0+","+y0+")$",
       W(a1===a2?"":"គុណ $(1)$ នឹង $"+a2+"$ និង $(2)$ នឹង $"+a1+"$ ៖",a1===a2?"":"$$\\begin{cases}"+E(a1*a2,b1*a2,c1*a2)+"\\\\"+E(a1*a2,b2*a1,c2*a1)+"\\end{cases}$$",
         "ដកសមីការទាំងពីរ អង្គនិងអង្គ ៖",AL([kx(Dy,"y")+"&="+Dc,"y&="+y0]),"ជំនួស $y="+y0+"$ ក្នុង $(1)$ ៖",
         AL([kx(a1)+(b1*y0?sg(b1*y0):"")+"&="+c1,kx(a1)+"&="+(c1-b1*y0),"x&="+x0]))),
     Q("$\\begin{cases}x+y="+s+"\\\\"+k+"x+"+k+"y="+t+"\\end{cases}$","ប្រព័ន្ធគ្មានចម្លើយ",
       "គុណសមីការទី១ នឹង $"+k+"$ បាន $"+k+"x+"+k+"y="+k*s+"$ ផ្ទុយនឹងសមីការទី២ $"+k+"x+"+k+"y="+t+"$ (ព្រោះ $"+k*s+"\\ne"+t+"$) ។"),
     Q("$\\begin{cases}"+E(p,q,u)+"\\\\"+E(k2*p,k2*q,k2*u)+"\\end{cases}$","ប្រព័ន្ធមានចម្លើយច្រើនរាប់មិនអស់ ផ្ទៀងផ្ទាត់ $"+E(p,q,u)+"$",
       "ចែកសមីការទី២ នឹង $"+k2+"$ បាន $"+E(p,q,u)+"$ ដូចគ្នានឹងសមីការទី១ ។ គ្រប់គូ $(x,y)$ ដែលផ្ទៀងផ្ទាត់ $"+E(p,q,u)+"$ ជាចម្លើយ ។")]}}},
 frac:{id:"frac",t:"កន្សោមសនិទាន · ដាក់ជាផលគុណកត្តា · សម្រួល · គណនាតម្លៃ",lv:2,f:function(){
   var p,q,r,k=pick([1,2,3]),v;do{p=ri(1,5);q=ri(1,5);r=ri(1,6)}while(r===p||q===p||r===-q);do{v=nz(-5,6)}while(v===p||v===r||v===-q);
   var Aq=pl([1,q-p,-p*q]),Bq=pl([k,-k*(p+r),k*p*r]),Bi=pl([1,-(p+r),p*r]),kk=k===1?"":k,den=k===1?"x-"+r:k+"(x-"+r+")";
   return{inst:"គេឱ្យកន្សោម $A="+Aq+"$ និង $B="+Bq+"$ ។",it:[
     Q("ដាក់កន្សោម $A$ និង $B$ ជាផលគុណកត្តា ។","$A=(x-"+p+")(x+"+q+")$ , $B="+kk+"(x-"+p+")(x-"+r+")$",
       W("$A$ ៖ រកចំនួនពីរដែលមានផលគុណ $"+(-p*q)+"$ និងផលបូក $"+(q-p)+"$ គឺ $"+(-p)+"$ និង $"+q+"$",AL(["A&="+Aq,"&=(x-"+p+")(x+"+q+")"]),
         AL(["B&="+Bq].concat(k===1?[]:["&="+k+"("+Bi+")"]).concat(["&="+kk+"(x-"+p+")(x-"+r+")"])))),
     Q("សម្រួលប្រភាគ $E=\\dfrac{A}{B}$ ។","$E=\\dfrac{x+"+q+"}{"+den+"}$",
       W("លក្ខខណ្ឌ ៖ $x\\ne"+p+"$ និង $x\\ne"+r+"$",AL(["E&=\\dfrac{(x-"+p+")(x+"+q+")}{"+kk+"(x-"+p+")(x-"+r+")}","&=\\dfrac{x+"+q+"}{"+den+"}"]))),
     Q("គណនាតម្លៃលេខនៃ $E$ ចំពោះ $x="+v+"$ ។","$E="+F(v+q,k*(v-r))+"$",
       AL(["E&=\\dfrac{"+pn(v)+"+"+q+"}{"+(k===1?pn(v)+"-"+r:k+"\\times("+pn(v)+"-"+r+")")+"}","&=\\dfrac{"+(v+q)+"}{"+k*(v-r)+"}="+F(v+q,k*(v-r))]))]}}},
 word:{id:"word",t:"ចំណោទ (ការប្រាក់ · សិស្ស · បន្ទប់ · សត្វ · សៀវភៅ)",lv:2,f:function(){var t=ri(0,4),q;
   if(t===0){var m1=ri(1,5)*1000000,m2=ri(1,5)*1000000,r1=ri(3,6),r2=ri(4,8),i1=m1*r1/100,i2=m2*r2/100,I=i1+i2;
     q=Q("ពូសុខផ្ញើលុយ $"+fm(m1)+"$ រៀល នៅធនាគារ A បានអត្រាការប្រាក់ $"+r1+"\\%$ ក្នុងមួយឆ្នាំ និងផ្ញើលុយ $"+fm(m2)+"$ រៀល នៅធនាគារ B បានអត្រាការប្រាក់ $"+r2+"\\%$ ក្នុងមួយឆ្នាំ ។ តើពូសុខទទួលបានការប្រាក់សរុបប៉ុន្មានក្នុងមួយឆ្នាំ?","ការប្រាក់សរុប $"+fm(I)+"$ រៀល",
       W("តាង $I_A$ និង $I_B$ ជាការប្រាក់ពីធនាគារ A និង B ក្នុងមួយឆ្នាំ ៖",AL(["I_A&="+fm(m1)+"\\times"+r1+"\\%="+fm(i1),"I_B&="+fm(m2)+"\\times"+r2+"\\%="+fm(i2)]),"ការប្រាក់សរុប ៖",AL(["I&=I_A+I_B="+fm(i1)+"+"+fm(i2)+"="+fm(I)])))}
   else if(t===1){var B=ri(15,35),G=ri(10,30),a=pick([3,4,5]),b=pick([2,3]),N=B+G,D=a*B-b*G;
     q=Q("ក្នុងថ្នាក់រៀនមួយមានសិស្សសរុប $"+N+"$ នាក់ ។ បើគេគុណចំនួនសិស្សប្រុសនឹង $"+a+"$ ហើយដកចំនួនសិស្សស្រីគុណនឹង $"+b+"$ គេទទួលបាន $"+D+"$ ។ រកចំនួនសិស្សប្រុស និងស្រី ។","សិស្សប្រុស $"+B+"$ នាក់ , សិស្សស្រី $"+G+"$ នាក់",
       W("តាង $x$ ជាចំនួនសិស្សប្រុស និង $y$ ជាចំនួនសិស្សស្រី $(x,y\\in\\mathbb N^*)$ ។ តាមបម្រាប់ប្រធាន ៖","$$\\begin{cases}x+y="+N+"\\quad(1)\\\\"+a+"x-"+b+"y="+D+"\\quad(2)\\end{cases}$$",
         "គុណ $(1)$ នឹង $"+b+"$ រួចបូកនឹង $(2)$ ៖",AL([b+"x+"+b+"y&="+b*N,(a+b)+"x&="+(D+b*N),"x&="+B]),"ជំនួសក្នុង $(1)$ ៖ $y="+N+"-"+B+"="+G+"$"))}
   else if(t===2){var k=ri(20,30),r=ri(5,15);
     q=Q("ក្នុងសាលារៀនមួយគេរៀបចំការប្រឡង ។ បើគេដាក់សិស្ស $"+k+"$ នាក់ក្នុងមួយបន្ទប់ នោះនៅសល់សិស្ស $"+r+"$ នាក់ ។ បើដាក់សិស្ស $"+(k+1)+"$ នាក់ក្នុងមួយបន្ទប់វិញ ពេលនោះអស់សិស្សល្មម ។ តើមានសិស្សប៉ុន្មាននាក់ និងបន្ទប់ប៉ុន្មាន?","បន្ទប់ $"+r+"$ , សិស្ស $"+(k+1)*r+"$ នាក់",
       W("តាង $n$ ជាចំនួនបន្ទប់ ។ ចំនួនសិស្សគឺ $"+k+"n+"+r+"$ ឬ $"+(k+1)+"n$ ៖",AL([k+"n+"+r+"&="+(k+1)+"n","n&="+r]),"ចំនួនសិស្ស $="+(k+1)+"\\times"+r+"="+(k+1)*r+"$ នាក់"))}
   else if(t===3){var c=ri(5,20),pg=ri(5,20),H=c+pg,L2=2*c+4*pg;
     q=Q("ក្នុងទ្រុងមួយមានសត្វពីរប្រភេទ គឺសត្វមាន់ និងសត្វជ្រូក ។ បើគេរាប់ក្បាលមានចំនួន $"+H+"$ ប៉ុន្តែបើគេរាប់ជើងមានចំនួន $"+L2+"$ ។ រកចំនួនសត្វនីមួយៗ ។","មាន់ $"+c+"$ ក្បាល , ជ្រូក $"+pg+"$ ក្បាល",
       W("តាង $x$ ជាចំនួនមាន់ និង $y$ ជាចំនួនជ្រូក (មាន់មាន $2$ ជើង ជ្រូកមាន $4$ ជើង) ៖","$$\\begin{cases}x+y="+H+"\\quad(1)\\\\2x+4y="+L2+"\\quad(2)\\end{cases}$$",
         "ចែក $(2)$ នឹង $2$ ៖ $x+2y="+L2/2+"$ រួចដកនឹង $(1)$ ៖",AL(["y&="+L2/2+"-"+H+"="+pg,"x&="+H+"-"+pg+"="+c])))}
   else{var Gs=ri(10,25),Bs=ri(5,2*Gs-2),n=Bs+Gs,rr=2*Gs-Bs,T=4*n-rr;
     q=Q("គេយកសៀវភៅ $"+4*n+"$ ក្បាលចែកឱ្យសិស្សក្នុងថ្នាក់មួយ ។ បើគេចែកម្នាក់ $4$ ក្បាល នោះអស់សៀវភៅគ្មានសល់ ។ បើគេចែកសិស្សប្រុសម្នាក់ $5$ ក្បាល និងសិស្សស្រីម្នាក់ $2$ ក្បាល នោះនៅសល់សៀវភៅ $"+rr+"$ ក្បាល ។ រកចំនួនសិស្សប្រុស និងសិស្សស្រី ។","សិស្សប្រុស $"+Bs+"$ នាក់ , សិស្សស្រី $"+Gs+"$ នាក់",
       W("ចំនួនសិស្សសរុប $="+4*n+":4="+n+"$ នាក់ ។ តាង $x$ ជាចំនួនសិស្សប្រុស និង $y$ ជាចំនួនសិស្សស្រី ៖","$$\\begin{cases}x+y="+n+"\\quad(1)\\\\5x+2y="+4*n+"-"+rr+"="+T+"\\quad(2)\\end{cases}$$",
         "យក $(2)-2\\times(1)$ ៖",AL(["3x&="+T+"-"+2*n+"="+3*Bs,"x&="+Bs]),"$y="+n+"-"+Bs+"="+Gs+"$"))}
   return{inst:"",it:[q]}}},
 rect:{id:"rect",t:"ចតុកោណកែង · ផ្ទៃក្រឡា · បរិមាត្រ (សមីការ/ប្រព័ន្ធ)",lv:2,f:function(){
   if(Math.random()<.5){var w=ri(3,8),k=ri(1,5),L=w+k,Sa=w*L;
     return{inst:"សួនច្បារមួយរាងចតុកោណកែងមានផ្ទៃក្រឡាស្មើនឹង $"+Sa+"\\text{ m}^2$ ។ គេដឹងថាប្រវែងទទឹងខ្លីជាងប្រវែងបណ្ដោយ $"+k+"$ m ។",it:[
       Q("រកប្រវែងបណ្ដោយ និងប្រវែងទទឹងនៃសួនច្បារ ។","បណ្ដោយ $"+L+"$ m , ទទឹង $"+w+"$ m",
         W("តាង $x$ ជាប្រវែងបណ្ដោយ $(x>"+k+")$ នោះប្រវែងទទឹងគឺ $x-"+k+"$ ។ ដោយផ្ទៃក្រឡា $"+Sa+"\\text{ m}^2$ ៖",AL(["x(x-"+k+")&="+Sa,"x^2-"+kx(k)+"-"+Sa+"&=0","(x-"+L+")(x+"+w+")&=0"]),
           "$x="+L+"$ ឬ $x=-"+w+"$ (មិនយក ព្រោះ $x>0$) ។ ទទឹង $="+L+"-"+k+"="+w+"$ m","ផ្ទៀងផ្ទាត់ ៖ $"+L+"\\times"+w+"="+Sa+"$ ពិត")),
       Q("គណនាបរិមាត្រនៃសួនច្បារ ។","$P="+2*(L+w)+"$ m",AL(["P&=2("+L+"+"+w+")","&="+2*(L+w)+"\\text{ m}"]))]}}
   var W0=ri(4,12),L0=Math.ceil(1.5*W0)+ri(1,6),c=2*L0-3*W0,H=L0+W0,P=2*H,t=pick([2,3,4]);
   return{inst:"ដីឡូតិ៍មួយរាងចតុកោណកែង មានបរិមាត្រស្មើនឹង $"+P+"$ m ។ គេដឹងថាពីរដងនៃបណ្ដោយ ស្មើនឹងបីដងនៃទទឹងបូកនឹង $"+c+"$ ។",it:[
     Q("រកប្រវែងបណ្ដោយ និងទទឹងនៃដីឡូតិ៍នេះ ។","បណ្ដោយ $"+L0+"$ m , ទទឹង $"+W0+"$ m",
       W("តាង $x$ ជាបណ្ដោយ និង $y$ ជាទទឹង $(x>y>0)$ ៖","$$\\begin{cases}2(x+y)="+P+"\\Rightarrow x+y="+H+"\\quad(1)\\\\2x=3y+"+c+"\\quad(2)\\end{cases}$$","ពី $(1)$ ៖ $x="+H+"-y$ ជំនួសក្នុង $(2)$ ៖",
         AL(["2("+H+"-y)&=3y+"+c,2*H+"-2y&=3y+"+c,"5y&="+5*W0,"y&="+W0]),"នាំឱ្យ $x="+H+"-"+W0+"="+L0+"$")),
     Q("គេដាំផ្កា $"+t+"$ ដើមក្នុងផ្ទៃដី $1\\text{ m}^2$ ។ តើគេដាំផ្កាបានប៉ុន្មានដើម?","$"+L0*W0*t+"$ ដើម",
       W("ផ្ទៃក្រឡាដី ៖ $S="+L0+"\\times"+W0+"="+L0*W0+"\\text{ m}^2$","ចំនួនដើមផ្កា ៖ $"+L0*W0+"\\times"+t+"="+L0*W0*t+"$ ដើម"))]}}},
 pct:{id:"pct",t:"ភាគរយ · ការប្រាក់ (សន្សំ · ឡើងថ្លៃ · ផ្ញើធនាគារពីរ)",lv:2,f:function(){
   var Pr=ri(4,16)*50000,p=pick([20,25,30,40,60]),miss=Pr*(100-p)/100,o=pick([2000,4000,6000,8000]),pc=pick([5,10,12.5,20,25]),nw=o+o*pc/100;
   var M=ri(3,9),x=ri(1,M-1),r1,r2;do{r1=pick([4,5,6,8,10]);r2=pick([4,5,6,8,10])}while(r1===r2);var Mm=M*1e6,xm=x*1e6,ym=Mm-xm,I=(r1*xm+r2*ym)/100;
   return{inst:"",it:[
     Q("កុសុម៉ាចង់ទិញកង់មួយតម្លៃ $"+fm(Pr)+"$ រៀល ។ ឥឡូវនេះគាត់សន្សំបាន $"+p+"\\%$ នៃថ្លៃកង់ ។ តើគាត់នៅខ្វះប្រាក់ប៉ុន្មានរៀលទៀត?","នៅខ្វះ $"+fm(miss)+"$ រៀល",
       W("គាត់នៅខ្វះ $100\\%-"+p+"\\%="+(100-p)+"\\%$ នៃថ្លៃកង់ ។ ប្រាក់ដែលនៅខ្វះ (គិតជារៀល) ៖",AL([fm(Pr)+"\\times\\dfrac{"+(100-p)+"}{100}&="+fm(miss)]))),
     Q("ប្រេងសាំង $1$ លីត្រ ធ្លាប់លក់ថ្លៃ $"+fm(o)+"$ រៀល ឥឡូវលក់ថ្លៃ $"+fm(nw)+"$ រៀល ។ តើប្រេងសាំងឡើងថ្លៃប៉ុន្មានភាគរយ?","ឡើងថ្លៃ $"+pc+"\\%$",
       W("ប្រាក់ឡើងថ្លៃ ៖ $"+fm(nw)+"-"+fm(o)+"="+fm(nw-o)+"$ រៀល","ភាគរយឡើងថ្លៃ ៖",AL(["&\\dfrac{"+fm(nw-o)+"}{"+fm(o)+"}\\times100\\%="+pc+"\\%"]))),
     Q("ពូសុខវិនិយោគប្រាក់ $"+fm(Mm)+"$ រៀល ក្នុងធនាគារពីរ ដែលមានអត្រាការប្រាក់ $"+r1+"\\%$ និង $"+r2+"\\%$ ក្នុងមួយឆ្នាំ ។ គាត់ទទួលបានការប្រាក់សរុប $"+fm(I)+"$ រៀលក្នុងមួយឆ្នាំ ។ រកប្រាក់ដើមដែលគាត់ដាក់ក្នុងធនាគារនីមួយៗ ។","ធនាគារទី១ $"+fm(xm)+"$ រៀល , ធនាគារទី២ $"+fm(ym)+"$ រៀល",
       W("តាង $x$ និង $y$ ជាប្រាក់ដាក់ក្នុងធនាគារទី១ ($"+r1+"\\%$) និងទី២ ($"+r2+"\\%$) ៖","$$\\begin{cases}x+y="+fm(Mm)+"\\quad(1)\\\\"+r1+"x+"+r2+"y="+fm(100*I)+"\\quad(2)\\end{cases}$$","(សមីការ $(2)$ បានពីការគុណ $\\dfrac{"+r1+"}{100}x+\\dfrac{"+r2+"}{100}y="+fm(I)+"$ នឹង $100$) ។ ពី $(1)$ ៖ $y="+fm(Mm)+"-x$",
         AL([r1+"x+"+r2+"("+fm(Mm)+"-x)&="+fm(100*I),kx(r1-r2)+"&="+fm(100*I-r2*Mm),"x&="+fm(xm)]),"$y="+fm(Mm)+"-"+fm(xm)+"="+fm(ym)+"$"))]}}},
 pisa:{id:"pisa",t:"PISA · ប្រៀបធៀបតម្លៃសេវាពីរ (ចំណុចស្មើគ្នា)",lv:2,f:function(){
   var cx=pick([{n:"សេវាកម្មកក់តាក់ស៊ី",u:"km",A:"ក្រុមហ៊ុន A",B:"ក្រុមហ៊ុន B",f:"ថ្លៃសេវាហៅដំបូង",per:"ក្នុងមួយ km",act:"ធ្វើដំណើរចម្ងាយ",a:[1000,1500],d:[500,1000],x0:[3,4,5,6,8]},
     {n:"សេវាកម្មបោះពុម្ពឯកសារ",u:"សន្លឹក",A:"ហាងកសាង",B:"ហាងបញ្ញា",f:"ថ្លៃរៀបចំចងក្រង",per:"ក្នុងមួយសន្លឹក",act:"បោះពុម្ពសៀវភៅក្រាស់",a:[100,150],d:[50,100],x0:[60,80,100,120]},
     {n:"គម្រោងទូរស័ព្ទ",u:"នាទី",A:"គម្រោង A",B:"គម្រោង B",f:"ថ្លៃប្រចាំខែ",per:"ក្នុងមួយនាទី",act:"និយាយទូរស័ព្ទ",a:[50,100],d:[50,100],x0:[100,150,200,300]}]);
   var a=pick(cx.a),b=a+pick(cx.d),x0=pick(cx.x0),f=x0*(b-a),x1=Math.round(x0/2),x2=x0*2,cA=function(x){return f+a*x},cB=function(x){return b*x};
   return{inst:cx.n+" ៖ "+cx.A+" យក"+cx.f+" $"+fm(f)+"$ រៀល និង $"+fm(a)+"$ រៀល"+cx.per+" ។ "+cx.B+" មិនយក"+cx.f+"ទេ ប៉ុន្តែយក $"+fm(b)+"$ រៀល"+cx.per+" ។",it:[
     Q("បើ"+cx.act+" $"+x1+"$ "+cx.u+" តើគួរជ្រើសរើស"+cx.A+" ឬ"+cx.B+"?",cx.B+" ($"+fm(cB(x1))+"$ រៀល)",
       W(AL(["\\text{A}&="+fm(f)+"+"+fm(a)+"\\times"+x1+"="+fm(cA(x1))+"","\\text{B}&="+fm(b)+"\\times"+x1+"="+fm(cB(x1))+""]),"ដោយ $"+fm(cB(x1))+"<"+fm(cA(x1))+"$ គួរជ្រើសរើស"+cx.B)),
     Q("បើ"+cx.act+" $"+x2+"$ "+cx.u+" តើមួយណាចំណេញជាង?",cx.A+" ($"+fm(cA(x2))+"$ រៀល)",
       W(AL(["\\text{A}&="+fm(f)+"+"+fm(a)+"\\times"+x2+"="+fm(cA(x2))+"","\\text{B}&="+fm(b)+"\\times"+x2+"="+fm(cB(x2))+""]),"ដោយ $"+fm(cA(x2))+"<"+fm(cB(x2))+"$ "+cx.A+" ចំណេញជាង")),
     Q("តើត្រូវ"+cx.act+"ប៉ុន្មាន "+cx.u+" ទើបការចំណាយលើទាំងពីរស្មើគ្នា?","$"+x0+"$ "+cx.u,
       W("តាង $x$ ជាចំនួន "+cx.u+" ។ ការចំណាយស្មើគ្នា ៖",AL([fm(b)+"x&="+fm(f)+"+"+fm(a)+"x",fm(b-a)+"x&="+fm(f),"x&="+x0])))]}}},
 stat:{id:"stat",t:"ស្ថិតិ · មធ្យម · ម៉ូត · មេដ្យាន (ទិន្នន័យ · តារាងប្រេកង់)",lv:2,f:function(){
   if(Math.random()<.5){var v,x,M,all,cnt,mo,sum,tries=0;
     do{v=[];for(var i=0;i<6;i++)v.push(ri(2,15));v[5]=v[0];sum=v.reduce(function(s,y){return s+y},0);M=ri(Math.ceil((sum+1)/7),Math.floor((sum+20)/7));x=7*M-sum;all=v.concat([x]).sort(function(p,q){return p-q});
       cnt={};all.forEach(function(y){cnt[y]=(cnt[y]||0)+1});var mx=Math.max.apply(null,Object.keys(cnt).map(function(k){return cnt[k]}));mo=Object.keys(cnt).filter(function(k){return cnt[k]===mx});tries++}
     while((x<1||x>20||mo.length!==1)&&tries<200);
     return{inst:"ទិន្នន័យមួយឈុតមាន $"+v.join(", ")+", x$ ។",it:[
       Q("បើមធ្យមនៃទិន្នន័យស្មើនឹង $"+M+"$ ចូររកតម្លៃ $x$ ។","$x="+x+"$",AL(["\\dfrac{"+v.join("+")+"+x}{7}&="+M,sum+"+x&="+7*M,"x&="+7*M+"-"+sum+"="+x])),
       Q("កំណត់ម៉ូត និងមេដ្យាននៃទិន្នន័យនេះ ។","ម៉ូត $="+mo[0]+"$ , មេដ្យាន $="+all[3]+"$",
         W("រៀបតាមលំដាប់កើន ៖ $"+all.join(", ")+"$","ម៉ូតគឺតម្លៃដែលកើតឡើងច្រើនជាងគេ ៖ $Mo="+mo[0]+"$ (ចំនួន $"+cnt[mo[0]]+"$ ដង)","ទិន្នន័យមាន $7$ តួ មេដ្យានជាតួទី $\\dfrac{7+1}{2}=4$ ៖ $Me="+all[3]+"$"))]}}
   var b0=ri(10,15),f,N,tr=0,mi;do{f=[ri(1,8),ri(2,9),ri(2,9),ri(1,6)];var mx2=Math.max.apply(null,f);mi=f.filter(function(y){return y===mx2}).length;tr++}while(mi!==1&&tr<100);
   N=f.reduce(function(s,y){return s+y},0);var xs=[b0,b0+1,b0+2,b0+3],fx=xs.map(function(y,i){return y*f[i]}),Sx=fx.reduce(function(s,y){return s+y},0),cum=[],c=0;f.forEach(function(y){c+=y;cum.push(c)});
   var at=function(k){for(var i=0;i<4;i++)if(k<=cum[i])return xs[i]},Me=N%2?at((N+1)/2):(at(N/2)+at(N/2+1))/2,mean=Math.round(Sx/N*100)/100,ex=Sx*100%N===0,Mo=xs[f.indexOf(Math.max.apply(null,f))];
   return{inst:"គេមានទិន្នន័យពិន្ទុប្រឡងរបស់សិស្សមួយក្រុម ($x$ ៖ ពិន្ទុ · $f$ ៖ ចំនួនសិស្ស) ៖ $$\\begin{array}{c|cccc}x&"+xs.join("&")+"\\\\\\hline f&"+f.join("&")+"\\end{array}$$",it:[
     Q("គណនាមធ្យមនៃពិន្ទុសិស្ស ។","$\\bar x"+(ex?"=":"\\approx")+mean+"$",
       W("ចំនួនសិស្សសរុប $N="+f.join("+")+"="+N+"$",AL(["\\bar x&=\\dfrac{\\sum fx}{N}","&=\\dfrac{"+xs.map(function(y,i){return y+"\\times"+f[i]}).join("+")+"}{"+N+"}","&=\\dfrac{"+Sx+"}{"+N+"}"+(ex?"=":"\\approx")+mean]))),
     Q("រកម៉ូត និងមេដ្យាន ដោយសង់តារាងប្រេកង់កើន ។","ម៉ូត $="+Mo+"$ , មេដ្យាន $="+Me+"$",
       W("$$\\begin{array}{c|cccc}x&"+xs.join("&")+"\\\\\\hline f&"+f.join("&")+"\\\\\\hline f^{\\uparrow}&"+cum.join("&")+"\\end{array}$$","ម៉ូតគឺពិន្ទុដែលមានប្រេកង់ធំជាងគេ ($"+Math.max.apply(null,f)+"$) ៖ $Mo="+Mo+"$",
         N%2?"ទីតាំងមេដ្យាន $=\\dfrac{N+1}{2}=\\dfrac{"+(N+1)+"}{2}="+(N+1)/2+"$ ⇒ តាមប្រេកង់កើន តួទី $"+(N+1)/2+"$ គឺ $"+Me+"$"
           :"ទីតាំងមេដ្យាន $=\\dfrac{N+1}{2}="+n9((N+1)/2)+"$ ស្ថិតនៅចន្លោះតួទី $"+N/2+"$ ($"+at(N/2)+"$) និងតួទី $"+(N/2+1)+"$ ($"+at(N/2+1)+"$) ៖ $Me=\\dfrac{"+at(N/2)+"+"+at(N/2+1)+"}{2}="+Me+"$"))]}}},
 poly:{id:"poly",t:"ពហុកោណ · អង្កត់ទ្រូង · ផលបូកមុំក្នុង/ក្រៅ",lv:2,f:function(){
   var n=pick([5,6,8,9,10,12]),d=n*(n-3)/2,k=pick([1,2,3,4]),m=2*k+2,ang=(m-2)*180/m;
   return{inst:"",it:[
     Q("ចូរប្រាប់ឈ្មោះពហុកោណមួយ ដែលមានអង្កត់ទ្រូងចំនួន $"+d+"$ ។",PN[n]+" ($n="+n+"$)",
       W("ចំនួនអង្កត់ទ្រូងនៃពហុកោណ $n$ ជ្រុងគឺ $\\dfrac{n(n-3)}{2}$ ៖",AL(["\\dfrac{n(n-3)}{2}&="+d,"n^2-3n-"+2*d+"&=0","(n-"+n+")(n+"+(n-3)+")&=0"]),"ដោយ $n>0$ នោះ $n="+n+"$ ជា"+PN[n])),
     Q("បើផលបូកមុំក្នុងនៃពហុកោណមួយ ស្មើនឹង "+(k===1?"":["","","ពីរ","បី","បួន"][k]+"ដងនៃ")+"ផលបូកមុំក្រៅរបស់វា ។ ប្រាប់ឈ្មោះពហុកោណនោះ រួចគណនារង្វាស់មុំក្នុងនីមួយៗ បើវាជាពហុកោណនិយ័ត ។",PN[m]+" , មុំក្នុងនីមួយៗ $="+ang+"^\\circ$",
       W("ផលបូកមុំក្រៅនៃពហុកោណគ្រប់ប្រភេទស្មើនឹង $360^\\circ$ ៖",AL(["(n-2)\\times180^\\circ&="+(k===1?"":k+"\\times")+"360^\\circ","n-2&="+2*k,"n&="+m]),"ជា"+PN[m]+" ។ មុំក្នុងនីមួយៗនៃ"+PN[m]+"និយ័ត ៖",AL(["\\dfrac{(n-2)\\times180^\\circ}{n}&=\\dfrac{"+(m-2)+"\\times180^\\circ}{"+m+"}="+ang+"^\\circ"])))]}}},
 prob:{id:"prob",t:"ប្រូបាប · រកចំនួនឃ្លី + ចាប់ ២ ពណ៌ដូចគ្នា",lv:2,f:function(){var r=ri(2,6),b=ri(2,8),w=ri(2,7),T=r+b+w,S2=nCr(r,2)+nCr(b,2)+nCr(w,2),C2=nCr(T,2);
   return{inst:"ក្នុងថង់មួយមានឃ្លីសរុបចំនួន $"+T+"$ គ្រាប់ ដែលមានពណ៌ខៀវ ពណ៌ក្រហម និងពណ៌ស ។ សុភាពចាប់យកឃ្លី $1$ គ្រាប់ចេញពីក្នុងថង់ដោយចៃដន្យ ។ គេដឹងថាប្រូបាបដែលចាប់បានឃ្លីពណ៌ក្រហមស្មើនឹង $"+F(r,T)+"$ និងប្រូបាបដែលចាប់បានឃ្លីពណ៌ខៀវស្មើនឹង $"+F(b,T)+"$ ។",it:[
     Q("រកចំនួនឃ្លីនៃពណ៌នីមួយៗ ។","ក្រហម $"+r+"$ គ្រាប់ , ខៀវ $"+b+"$ គ្រាប់ , ស $"+w+"$ គ្រាប់",
       W("ចំនួនឃ្លីក្រហម ៖ $"+T+"\\times"+F(r,T)+"="+r+"$ គ្រាប់","ចំនួនឃ្លីខៀវ ៖ $"+T+"\\times"+F(b,T)+"="+b+"$ គ្រាប់","ចំនួនឃ្លីស ៖ $"+T+"-"+r+"-"+b+"="+w+"$ គ្រាប់")),
     Q("បើសុភាពចាប់យកឃ្លី $2$ គ្រាប់ព្រមគ្នា ។ រកប្រូបាបដែលគាត់ចាប់បានឃ្លីទាំងពីរគ្រាប់មានពណ៌ដូចគ្នា ។","$P="+F(S2,C2)+"$",
       W("ចំនួនករណីអាច ៖ $n(S)=C_{"+T+"}^2=\\dfrac{"+T+"\\times"+(T-1)+"}{2}="+C2+"$","ចំនួនករណីស្រប (ក្រហមទាំងពីរ ឬ ខៀវទាំងពីរ ឬ សទាំងពីរ) ៖",AL(["n(E)&=C_{"+r+"}^2+C_{"+b+"}^2+C_{"+w+"}^2","&="+nCr(r,2)+"+"+nCr(b,2)+"+"+nCr(w,2)+"="+S2]),
         AL(["P(E)&=\\dfrac{n(E)}{n(S)}=\\dfrac{"+S2+"}{"+C2+"}"+(gcd(S2,C2)===1?"":"="+F(S2,C2))])))]}}},
 prob2:{id:"prob2",t:"ប្រូបាប · សំណួរប្រឡង (ធ្វើបាន ២ គត់ · យ៉ាងតិច ២)",lv:2,f:function(){var n=6,k=pick([3,4]),e=nCr(k,2)*nCr(n-k,1),k3=nCr(k,3),l=e+k3,D=nCr(n,3);
   return{inst:"គ្រូដាក់សំណួរមេរៀន $"+n+"$ តាងដោយអក្សរ $A, B, C, D, E$ និង $F$ ហើយគ្រូនឹងដកស្រង់យកបីសំណួរឱ្យសិស្សប្រឡងយកពិន្ទុ ។ បើសិស្សម្នាក់ធ្វើបានតែ $"+k+"$ សំណួរ ៖",it:[
     Q("រកប្រូបាបដែលសិស្សនោះធ្វើបានពីរសំណួរគត់ ។","$P="+F(e,D)+"$",
       W("ចំនួនករណីអាច ៖ $n(S)=C_6^3=\\dfrac{6\\times5\\times4}{3\\times2\\times1}="+D+"$","ធ្វើបានពីរគត់ = យកពីរក្នុង $"+k+"$ សំណួរដែលចេះ និងមួយក្នុង $"+(n-k)+"$ សំណួរដែលមិនចេះ ៖",
         AL(["n(E)&=C_{"+k+"}^2\\times C_{"+(n-k)+"}^1="+nCr(k,2)+"\\times"+(n-k)+"="+e,"P(E)&=\\dfrac{"+e+"}{"+D+"}="+F(e,D)]))),
     Q("រកប្រូបាបដែលសិស្សនោះធ្វើបានពីរសំណួរយ៉ាងតិច ។","$P="+F(l,D)+"$",
       W("ធ្វើបានយ៉ាងតិចពីរ = ធ្វើបានពីរគត់ ឬ ធ្វើបានទាំងបី ៖",AL(["n(F)&=C_{"+k+"}^2C_{"+(n-k)+"}^1+C_{"+k+"}^3="+e+"+"+k3+"="+l,"P(F)&=\\dfrac{"+l+"}{"+D+"}="+F(l,D)])))]}}},
 prob3:{id:"prob3",t:"ប្រូបាប · ចាប់ ៣ គ្រាប់ព្រមគ្នា (ពីរពណ៌)",lv:2,f:function(){var y=ri(4,7),b=ri(3,6),T=y+b,D=nCr(T,3),Y3=nCr(y,3),Y2=nCr(y,2)*b;
   return{inst:"ក្នុងថង់មួយមានឃ្លីលឿង $"+y+"$ គ្រាប់ និងឃ្លីខៀវ $"+b+"$ គ្រាប់ ។ គេចាប់យកឃ្លី $3$ គ្រាប់តែម្ដង ។",it:[
     Q("រកប្រូបាបនៃព្រឹត្តិការណ៍ដែលចាប់បានឃ្លីលឿងទាំងបីគ្រាប់ ។","$P(A)="+F(Y3,D)+"$",
       W("ចំនួនករណីអាច ៖ $n(S)=C_{"+T+"}^3="+D+"$",AL(["n(A)&=C_{"+y+"}^3="+Y3,"P(A)&=\\dfrac{"+Y3+"}{"+D+"}="+F(Y3,D)]))),
     Q("រកប្រូបាបនៃព្រឹត្តិការណ៍ដែលចាប់បានឃ្លីខៀវមួយយ៉ាងតិច ។","$P(B)="+F(D-Y3,D)+"$",
       W("ព្រឹត្តិការណ៍ $B$ ជាព្រឹត្តិការណ៍ផ្ទុយនៃ $A$ (លឿងទាំងបី) ៖",AL(["P(B)&=1-P(A)=1-"+F(Y3,D)+"="+F(D-Y3,D)]))),
     Q("រកប្រូបាបនៃព្រឹត្តិការណ៍ដែលចាប់បានឃ្លីលឿង $2$ គ្រាប់ និងឃ្លីខៀវ $1$ គ្រាប់ ។","$P(C)="+F(Y2,D)+"$",
       AL(["n(C)&=C_{"+y+"}^2\\times C_{"+b+"}^1="+nCr(y,2)+"\\times"+b+"="+Y2,"P(C)&=\\dfrac{"+Y2+"}{"+D+"}="+F(Y2,D)]))]}}},
 coord:{id:"coord",t:"តម្រុយ · បន្ទាត់ · ចំណុចកណ្ដាល · ត្រីកោណសមបាត",lv:2,f:function(){
   var dx=nz(1,2),dy=nz(-3,3),A0=[ri(-2,2),ri(-2,2)],I=[A0[0]+dx,A0[1]+dy],B0=[A0[0]+2*dx,A0[1]+2*dy],t=pick([1,-1]),C0=[I[0]-t*dy,I[1]+t*dx],E0=[A0[0]-dx,A0[1]-dy],P=function(p){return"("+p.join(",")+")"},sl=F(dy,dx),sl2=F(-dx,dy),L2=2*(dx*dx+dy*dy);
   return{inst:"ក្នុងតម្រុយអរតូណរមេ $(xOy)$ គេមានចំណុច $A"+P(A0)+"$ ; $B"+P(B0)+"$ និង $C"+P(C0)+"$ ។",it:[
     Q("សរសេរសមីការបន្ទាត់ $(AB)$ ។ បង្ហាញថាចំណុច $E"+P(E0)+"$ នៅលើបន្ទាត់ $(AB)$ ។","$(AB)\\colon "+lineT(dy,dx,A0[0],A0[1])+"$ និង $E\\in(AB)$",
       W(AL(["a_{AB}&=\\dfrac{y_B-y_A}{x_B-x_A}=\\dfrac{"+B0[1]+"-"+pn(A0[1])+"}{"+B0[0]+"-"+pn(A0[0])+"}="+sl,"(AB)\\colon y-y_A&=a_{AB}(x-x_A)","y-"+pn(A0[1])+"&="+sl+"(x-"+pn(A0[0])+")","y&="+lineT(dy,dx,A0[0],A0[1]).slice(2)]),
         "មេគុណប្រាប់ទិសនៃ $(AE)$ ៖ $a_{AE}=\\dfrac{"+E0[1]+"-"+pn(A0[1])+"}{"+E0[0]+"-"+pn(A0[0])+"}="+sl+"=a_{AB}$ នាំឱ្យ $A, B, E$ រត់ត្រង់ជួរ ⇒ $E\\in(AB)$")),
     Q("រកកូអរដោនេចំណុច $I$ កណ្ដាលអង្កត់ $AB$ រួចសរសេរសមីការបន្ទាត់ $(CI)$ ។","$I"+P(I)+"$ , $(CI)\\colon "+lineT(-dx,dy,I[0],I[1])+"$",
       AL(["I&=\\left(\\dfrac{x_A+x_B}{2},\\dfrac{y_A+y_B}{2}\\right)=\\left(\\dfrac{"+A0[0]+sg(B0[0])+"}{2},\\dfrac{"+A0[1]+sg(B0[1])+"}{2}\\right)="+P(I),"a_{CI}&=\\dfrac{"+I[1]+"-"+pn(C0[1])+"}{"+I[0]+"-"+pn(C0[0])+"}="+sl2,"(CI)\\colon y-"+pn(I[1])+"&="+sl2+"(x-"+pn(I[0])+")","y&="+lineT(-dx,dy,I[0],I[1]).slice(2)])),
     Q("បង្ហាញថាបន្ទាត់ $(CI)$ និង $(AB)$ កែងគ្នា រួចទាញបញ្ជាក់ថា $ABC$ ជាត្រីកោណសមបាត ។","$(CI)\\perp(AB)$ និង $CA=CB="+sqrtT(L2)+"$",
       W(AL(["a_{AB}\\times a_{CI}&="+sl+"\\times\\left("+sl2+"\\right)=-1"]),"នាំឱ្យ $(CI)\\perp(AB)$ ។ ដោយ $I$ ជាចំណុចកណ្ដាល $[AB]$ នោះ $(CI)$ ជាមេដ្យាទ័រនៃ $[AB]$ ⇒ $CA=CB$ ។",
         AL(["CA&=\\sqrt{("+A0[0]+"-"+pn(C0[0])+")^2+("+A0[1]+"-"+pn(C0[1])+")^2}="+sqrtT(L2),"CB&=\\sqrt{("+B0[0]+"-"+pn(C0[0])+")^2+("+B0[1]+"-"+pn(C0[1])+")^2}="+sqrtT(L2)]),"ដូចនេះ $ABC$ ជាត្រីកោណសមបាតកំពូល $C$"))]}}},
 coord2:{id:"coord2",t:"បន្ទាត់កែង · ចំណុចប្រសព្វ · មេដ្យាន · កម្ពស់ក្នុងតម្រុយ",lv:2,f:function(){var P=function(a,b){return"("+a+","+b+")"};
   if(Math.random()<.5){var m=pick([1,-1,2,-2,3]),c=nz(-4,4),xA,yA,N;do{xA=ri(-3,3);yA=ri(-3,4);N=m*xA+c-yA}while(!N);
     var K=m*m+1,X=xA+m*yA-m*c,xM=F(X,K),yM=F(m*X+c*K,K);
     return{inst:"ក្នុងតម្រុយអរតូណរមេ $(xOy)$ គេមានបន្ទាត់ $d\\colon y="+kx(m)+sg(c)+"$ និងចំណុច $A"+P(xA,yA)+"$ ។",it:[
       Q("រកសមីការនៃបន្ទាត់ $d'$ ដែលកាត់តាមចំណុច $A$ ហើយកែងនឹងបន្ទាត់ $d$ ។","$d'\\colon "+lineT(-1,m,xA,yA)+"$",
         W("$d$ មានមេគុណប្រាប់ទិស $a="+m+"$ ។ ដោយ $d'\\perp d$ នោះ $a'="+F(-1,m)+"$ ៖",AL(["y-y_A&=a'(x-x_A)","y-"+pn(yA)+"&="+F(-1,m)+"(x-"+pn(xA)+")","y&="+lineT(-1,m,xA,yA).slice(2)]))),
       Q("គណនាកូអរដោនេចំណុច $M$ ជាចំណុចប្រសព្វរវាងបន្ទាត់ $d$ និង $d'$ ។","$M\\left("+xM+","+yM+"\\right)$",
         W("ផ្ទឹមសមីការទាំងពីរ ៖",AL([kx(m)+sg(c)+"&="+lineT(-1,m,xA,yA).slice(2)]),"គុណអង្គទាំងពីរនឹង $"+m+"$ ៖",AL([kx(m*m)+sg(m*c)+"&=-x"+(xA+m*yA?sg(xA+m*yA):""),kx(K)+"&="+X,"x&="+xM]),"ជំនួសក្នុងសមីការ $d$ ៖ $y="+m+"\\times"+(X%K?"\\left("+xM+"\\right)":pn(X/K))+sg(c)+"="+yM+"$")),
       Q("គណនាចម្ងាយ $AM$ ។","$AM="+St(S(Math.abs(N),K,K))+"$",
         AL(["AM&=\\sqrt{\\left("+xA+"-"+(X%K?"\\left("+xM+"\\right)":pn(X/K))+"\\right)^2+\\left("+yA+"-"+((m*X+c*K)%K?"\\left("+yM+"\\right)":pn((m*X+c*K)/K))+"\\right)^2}","&=\\sqrt{\\left("+F(m*N,K)+"\\right)^2+\\left("+F(-N,K)+"\\right)^2}","&=\\sqrt{"+F(N*N,K)+"}="+St(S(Math.abs(N),K,K))]))]}}
   var A0,B0,C0,dx,dy,xM,yM;do{A0=[ri(-3,1),ri(-2,3)];dx=2*ri(1,3);dy=2*nz(-2,2);B0=[A0[0]+dx,A0[1]+dy];xM=A0[0]+dx/2;yM=A0[1]+dy/2;C0=[ri(-2,3),ri(2,6)]}
   while(C0[0]===xM||C0[1]===A0[1]+dy*(C0[0]-A0[0])/dx);
   var n=dy,d=dx,g=gcd(n,d);n/=g;d/=g;var Kh=n*n+d*d,X=n*n*A0[0]-n*d*A0[1]+d*d*C0[0]+n*d*C0[1],xH=F(X,Kh),yH=F(n*(X-A0[0]*Kh)+A0[1]*d*Kh,d*Kh);
   return{inst:"ចូរដៅចំណុច $A"+P(A0[0],A0[1])+"$ , $B"+P(B0[0],B0[1])+"$ និង $C"+P(C0[0],C0[1])+"$ ក្នុងតម្រុយអរតូណរមេ $(xOy)$ ។",it:[
     Q("រកសមីការនៃបន្ទាត់ $(AB)$ ។","$(AB)\\colon "+lineT(n,d,A0[0],A0[1])+"$",AL(["a_{AB}&=\\dfrac{"+B0[1]+"-"+pn(A0[1])+"}{"+B0[0]+"-"+pn(A0[0])+"}="+F(n,d),"y-"+pn(A0[1])+"&="+F(n,d)+"(x-"+pn(A0[0])+")","y&="+lineT(n,d,A0[0],A0[1]).slice(2)])),
     Q("គេគូសមេដ្យាន $(CM)$ នៃត្រីកោណ $ABC$ ។ រកកូអរដោនេចំណុច $M$ និងសមីការ $(CM)$ ។","$M"+P(xM,yM)+"$ , $(CM)\\colon "+lineT(yM-C0[1],xM-C0[0],C0[0],C0[1])+"$",
       W("$M$ ជាចំណុចកណ្ដាលនៃ $[AB]$ ៖",AL(["M&=\\left(\\dfrac{"+A0[0]+sg(B0[0])+"}{2},\\dfrac{"+A0[1]+sg(B0[1])+"}{2}\\right)="+P(xM,yM),"a_{CM}&=\\dfrac{"+yM+"-"+pn(C0[1])+"}{"+xM+"-"+pn(C0[0])+"}="+F(yM-C0[1],xM-C0[0]),"(CM)\\colon y&="+lineT(yM-C0[1],xM-C0[0],C0[0],C0[1]).slice(2)]))),
     Q("គេគូសកម្ពស់ $(CH)$ នៃត្រីកោណ $ABC$ ។ រកសមីការនៃបន្ទាត់ $(CH)$ ។","$(CH)\\colon "+lineT(-d,n,C0[0],C0[1])+"$",
       W("$(CH)\\perp(AB)$ ⇒ $a_{CH}\\times"+(F(n,d).indexOf("-")===0?"\\left("+F(n,d)+"\\right)":F(n,d))+"=-1$ ⇒ $a_{CH}="+F(-d,n)+"$",AL(["y-"+pn(C0[1])+"&="+F(-d,n)+"(x-"+pn(C0[0])+")","y&="+lineT(-d,n,C0[0],C0[1]).slice(2)]))),
     Q("រកកូអរដោនេនៃចំណុច $H$ ។","$H\\left("+xH+","+yH+"\\right)$",
       W("$H$ ជាចំណុចប្រសព្វរវាង $(AB)$ និង $(CH)$ ៖",AL([lineT(n,d,A0[0],A0[1]).slice(2)+"&="+lineT(-d,n,C0[0],C0[1]).slice(2),"x&="+xH,"y&="+yH])))]}}},
 geo1:{id:"geo1",t:"រង្វង់ · អង្កត់ផ្ចិត · ត្រីកោណដូចគ្នា (MD² = AD × ND)",lv:3,f:function(){var R=ri(3,8),BM=sqrtT(3*R*R),MD=St(S(R,2,3)),AD=St(S(R,2,7)),ND=St(S(3*R,14,7));
   return{inst:"គេឱ្យរង្វង់ផ្ចិត $O$ មានអង្កត់ផ្ចិត $AB="+2*R+"$ cm ហើយ $M$ ជាចំណុចមួយនៅលើរង្វង់នេះ ដែល $AM="+R+"$ cm ។",it:[
     Q("បញ្ជាក់ប្រភេទត្រីកោណ $AMB$ រួចគណនាប្រវែង $BM$ ។","$\\triangle AMB$ កែងត្រង់ $M$ , $BM="+BM+"$ cm",
       W("ដោយ $AB$ ជាអង្កត់ផ្ចិត ហើយ $M$ នៅលើរង្វង់ នោះ $\\angle AMB=90^\\circ$ (មុំចារឹកកន្លះរង្វង់) ⇒ $\\triangle AMB$ កែងត្រង់ $M$ ។","តាមទ្រឹស្ដីបទពីតាករ ៖",AL(["BM^2&=AB^2-AM^2","&="+2*R+"^2-"+R+"^2="+4*R*R+"-"+R*R+"="+3*R*R,"BM&=\\sqrt{"+3*R*R+"}="+BM+"\\text{ cm}"]))),
     Q("$D$ ជាចំណុចកណ្ដាលនៃអង្កត់ $BM$ ។ គេបន្លាយបន្ទាត់ $AD$ ឱ្យកាត់រង្វង់ត្រង់ចំណុច $N$ ។ ប្រៀបធៀបត្រីកោណ $AMD$ និង $BND$ រួចទាញបញ្ជាក់ថា $MD^2=AD\\times ND$ ។","$\\triangle AMD\\sim\\triangle BND$ និង $MD^2=AD\\times ND$",
       W("គេមាន ៖ $\\angle AMD=\\angle BND=90^\\circ$ (មុំចារឹកកន្លះរង្វង់) និង $\\angle ADM=\\angle BDN$ (មុំទល់កំពូល)","⇒ $\\triangle AMD\\sim\\triangle BND$ (ករណីទី១ ម.ម) ។ តាមផលធៀបដំណូច ៖",
         AL(["\\dfrac{AD}{BD}&=\\dfrac{MD}{ND}","AD\\times ND&=BD\\times MD"]),"ដោយ $D$ ជាចំណុចកណ្ដាលនៃ $BM$ នោះ $BD=MD$ ⇒ $MD^2=AD\\times ND$")),
     Q("គណនាប្រវែង $AD$ និង $ND$ ។","$AD="+AD+"$ cm , $ND="+ND+"$ cm",
       W("$MD=\\dfrac{BM}{2}="+MD+"$ cm ។ ក្នុងត្រីកោណកែង $AMD$ ៖",AL(["AD^2&=AM^2+MD^2="+R*R+"+"+F(3*R*R,4)+"="+F(7*R*R,4),"AD&="+AD+"\\text{ cm}","ND&=\\dfrac{MD^2}{AD}="+F(3*R*R,4)+"\\times\\dfrac{2}{"+(R===1?"":R)+"\\sqrt7}="+ND+"\\text{ cm}"])))]}}},
 geo2:{id:"geo2",t:"ត្រីកោណកែង · កម្ពស់ AH · ចតុកោណចារឹក",lv:3,f:function(){
   return{inst:"ក្នុងត្រីកោណ $ABC$ កែងត្រង់ $A$ គេគូសកម្ពស់ $[AH]$ ។ រង្វង់មានអង្កត់ផ្ចិត $[AH]$ កាត់ $AB$ ត្រង់ $D$ និងកាត់ $(AC)$ ត្រង់ $E$ ។",it:[
     Q("ប្រាប់ឈ្មោះចតុកោណ $ADHE$ ។","$ADHE$ ជាចតុកោណកែង",
       W("ដោយ $AH$ ជាអង្កត់ផ្ចិត នោះ $\\angle ADH=90^\\circ$ និង $\\angle AEH=90^\\circ$ (មុំចារឹកកន្លះរង្វង់) ។","ម្យ៉ាងទៀត $\\angle DAE=\\angle BAC=90^\\circ$ ។ ចតុកោណ $ADHE$ មានមុំកែងបី ⇒ ជាចតុកោណកែង ។")),
     Q("ប្រៀបធៀបត្រីកោណ $ABC$ និង $AED$ រួចទាញបង្ហាញថា $AB\\cdot AD=AC\\cdot AE$ ។","$\\triangle ABC\\sim\\triangle AED$ និង $AB\\cdot AD=AC\\cdot AE$",
       W("គេមាន $\\angle AED=\\angle AHD$ (មុំចារឹកស្កាត់ធ្នូ $AD$) និង $\\angle AHD=\\angle ABC$ (មុំមានជ្រុងកែងរៀងគ្នា) ⇒ $\\angle AED=\\angle ABC$ ។","ហើយ $\\angle A$ ជាមុំរួម ⇒ $\\triangle ABC\\sim\\triangle AED$ (ករណីទី១ ម.ម) ។ តាមផលធៀបដំណូច ៖",AL(["\\dfrac{AB}{AE}&=\\dfrac{AC}{AD}","AB\\cdot AD&=AC\\cdot AE"]))),
     Q("បង្ហាញថាចតុកោណ $BDEC$ ចារឹកក្នុងរង្វង់មួយ ។","$BDEC$ ចារឹកក្នុងរង្វង់",
       W("តាមសំណួរទី២ $\\angle ADE=\\angle ACB$ ។ ដោយ $\\angle ADE+\\angle BDE=180^\\circ$ (មុំបន្ទាប់បន្សំ) ⇒ $\\angle BDE+\\angle BCE=180^\\circ$ ។","ចតុកោណ $BDEC$ មានផលបូកមុំឈមពីរស្មើ $180^\\circ$ ⇒ ចារឹកក្នុងរង្វង់ ។"))]}}},
 geo3:{id:"geo3",t:"រង្វង់ · មុំផ្ចិត · មុំចារឹក · ត្រីកោណដូចគ្នា",lv:2,f:function(){var al=pick([25,30,35,40]);
   return{inst:"គេមានរង្វង់ផ្ចិត $O$ និងអង្កត់ផ្ចិត $MN$ ។ $Q$ ជាចំណុចមួយនៅលើរង្វង់ដែល $\\angle NMQ="+al+"^\\circ$ ។",it:[
     Q("គណនារង្វាស់ $\\angle NOQ$ ។","$\\angle NOQ="+2*al+"^\\circ$",
       W("$\\angle NMQ$ ជាមុំចារឹក និង $\\angle NOQ$ ជាមុំផ្ចិត ដែលស្កាត់ធ្នូ $NQ$ ដូចគ្នា ៖",AL(["\\angle NOQ&=2\\angle NMQ=2\\times"+al+"^\\circ="+2*al+"^\\circ"]))),
     Q("ប្រាប់ប្រភេទត្រីកោណ $MNQ$ ។","$\\triangle MNQ$ ជាត្រីកោណកែងត្រង់ $Q$",
       W("ដោយ $MN$ ជាអង្កត់ផ្ចិត នោះ $\\angle MQN=90^\\circ$ (មុំចារឹកកន្លះរង្វង់) ។",AL(["\\angle MNQ&=180^\\circ-90^\\circ-"+al+"^\\circ="+(90-al)+"^\\circ"]),al===30?"$\\triangle MNQ$ មានមុំ $30^\\circ, 60^\\circ, 90^\\circ$ ជាត្រីកោណកន្លះសម័ង្ស ។":"")),
     Q("ដៅចំណុច $P$ នៅលើធ្នូតូច $MQ$ រួចគូសបន្ទាត់ $NP$ កាត់អង្កត់ $MQ$ ត្រង់ចំណុច $H$ ។ ប្រដូច $\\triangle MHP$ និង $\\triangle NHQ$ រួចទាញវិបាក ។","$\\triangle MHP\\sim\\triangle NHQ$ ⇒ $HM\\cdot HQ=HP\\cdot HN$",
       W("គេមាន $\\angle MHP=\\angle NHQ$ (មុំទល់កំពូល) និង $\\angle MPH=\\angle NQH=90^\\circ$ (មុំចារឹកកន្លះរង្វង់)","⇒ $\\triangle MHP\\sim\\triangle NHQ$ (ករណីទី១ ម.ម) ។ តាមផលធៀបដំណូច ៖",AL(["\\dfrac{MH}{NH}&=\\dfrac{HP}{HQ}=\\dfrac{MP}{NQ}","HM\\cdot HQ&=HP\\cdot HN"])))]}}},
 geo4:{id:"geo4",t:"បន្ទាត់ប៉ះត្រង់ B · BD² = AD × DN",lv:3,f:function(){var t=pick([[8,6,10],[6,8,10],[15,20,25],[12,5,13],[5,12,13],[12,9,15]]),AB=t[0],BD=t[1],AD=t[2];
   return{inst:"គូសរង្វង់ផ្ចិត $O$ អង្កត់ផ្ចិត $AB="+AB+"$ cm ។ គូសបន្ទាត់ $d$ ប៉ះរង្វង់ត្រង់ $B$ ។ ដៅចំណុច $D$ នៅលើបន្ទាត់ $d$ ដែល $BD="+BD+"$ cm ។ បន្ទាត់ $AD$ កាត់រង្វង់ត្រង់ចំណុច $N$ ។",it:[
     Q("ប្រាប់ឈ្មោះត្រីកោណ $ABD$ និងត្រីកោណ $ANB$ ។","$\\triangle ABD$ កែងត្រង់ $B$ , $\\triangle ANB$ កែងត្រង់ $N$",
       W("$\\angle ABD=90^\\circ$ (ព្រោះ $d$ ប៉ះរង្វង់ត្រង់ $B$ ⇒ $d\\perp AB$) ⇒ $\\triangle ABD$ កែងត្រង់ $B$ ។","$\\angle ANB=90^\\circ$ (មុំចារឹកកន្លះរង្វង់) ⇒ $\\triangle ANB$ កែងត្រង់ $N$ ។")),
     Q("គណនាប្រវែង $AD$ និង $BN$ ។","$AD="+AD+"$ cm , $BN="+fv(AB*BD,AD)+"$ cm",
       W("ក្នុងត្រីកោណកែង $ABD$ (ទ្រឹស្ដីបទពីតាករ) ៖",AL(["AD^2&=AB^2+BD^2="+AB*AB+"+"+BD*BD+"="+AD*AD,"AD&="+AD+"\\text{ cm}"]),"$BN$ ជាកម្ពស់នៃត្រីកោណកែង $ABD$ ៖",AL(["BN\\times AD&=AB\\times BD","BN&=\\dfrac{"+AB+"\\times"+BD+"}{"+AD+"}="+fv(AB*BD,AD)+"\\text{ cm}"]))),
     Q("ប្រៀបធៀប $\\triangle ABD$ និង $\\triangle BND$ រួចបញ្ជាក់ថា $BD^2=AD\\times DN$ ។ គណនា $DN$ ។","$BD^2=AD\\times DN$ , $DN="+fv(BD*BD,AD)+"$ cm",
       W("គេមាន $\\angle ABD=\\angle BND=90^\\circ$ និង $\\angle D$ ជាមុំរួម ⇒ $\\triangle ABD\\sim\\triangle BND$ (ករណីទី១ ម.ម) ។",AL(["\\dfrac{BD}{ND}&=\\dfrac{AD}{BD}\\Rightarrow BD^2=AD\\times DN","DN&=\\dfrac{BD^2}{AD}=\\dfrac{"+BD*BD+"}{"+AD+"}="+fv(BD*BD,AD)+"\\text{ cm}"])))]}}},
 geo5:{id:"geo5",t:"រង្វង់ចារឹកក្រៅ · កម្ពស់ AH · AB×AC = AD×AH",lv:3,f:function(){
   return{inst:"គេមានរង្វង់ផ្ចិត $O$ ចារឹកក្រៅត្រីកោណ $ABC$ មួយ ដែលមានកម្ពស់ $AH$ និងមុំទាំងបីជាមុំស្រួច ។ $D$ ជាចំណុចឆ្លុះនៃ $A$ ធៀបនឹងផ្ចិត $O$ ។",it:[
     Q("បង្ហាញថា $\\angle ABC=\\angle ADC$ និង $\\angle ACB=\\angle ADB$ ។","$\\angle ABC=\\angle ADC$ , $\\angle ACB=\\angle ADB$",
       W("$A, B, C, D$ ស្ថិតនៅលើរង្វង់តែមួយ ។","$\\angle ABC$ និង $\\angle ADC$ ជាមុំចារឹកស្កាត់ធ្នូ $AC$ រួម ⇒ $\\angle ABC=\\angle ADC$ ។","$\\angle ACB$ និង $\\angle ADB$ ជាមុំចារឹកស្កាត់ធ្នូ $AB$ រួម ⇒ $\\angle ACB=\\angle ADB$ ។")),
     Q("ប្រៀបធៀប $\\triangle HAB$ និង $\\triangle CAD$ រួចប្រៀបធៀប $\\triangle HAC$ និង $\\triangle BAD$ ។","$\\triangle HAB\\sim\\triangle CAD$ , $\\triangle HAC\\sim\\triangle BAD$",
       W("$AD$ ជាអង្កត់ផ្ចិត ⇒ $\\angle ACD=\\angle ABD=90^\\circ$ (មុំចារឹកកន្លះរង្វង់) ហើយ $\\angle AHB=\\angle AHC=90^\\circ$ (ព្រោះ $AH\\perp BC$) ។",
         "• $\\angle AHB=\\angle ACD$ និង $\\angle ABH=\\angle ADC$ ⇒ $\\triangle HAB\\sim\\triangle CAD$ (ម.ម)","• $\\angle AHC=\\angle ABD$ និង $\\angle ACH=\\angle ADB$ ⇒ $\\triangle HAC\\sim\\triangle BAD$ (ម.ម)")),
     Q("បង្ហាញថា $AB\\times AC=AD\\times AH$ ហើយ $\\angle BAD=\\angle HAC$ ។","$AB\\times AC=AD\\times AH$ , $\\angle BAD=\\angle HAC$",
       W("ពី $\\triangle HAB\\sim\\triangle CAD$ ៖",AL(["\\dfrac{AH}{AC}&=\\dfrac{AB}{AD}\\Rightarrow AB\\times AC=AD\\times AH"]),"ពី $\\triangle HAC\\sim\\triangle BAD$ មុំទី៣ ប៉ុនគ្នា ⇒ $\\angle HAC=\\angle BAD$ ។"))]}}},
 geo6:{id:"geo6",t:"អង្កត់ធ្នូកែងត្រង់កណ្ដាល OB · ធ្នូ CD = 120° · EC·EA = ED·EB",lv:3,f:function(){var R=ri(2,6);
   return{inst:"គេមានរង្វង់ផ្ចិត $O$ អង្កត់ផ្ចិត $AB="+2*R+"$ cm ។ $H$ ជាចំណុចកណ្ដាលនៃកាំ $OB$ ។ បន្ទាត់កែងនឹង $AB$ ត្រង់ $H$ កាត់រង្វង់ត្រង់ $C$ និង $D$ ។ បន្ទាត់ $AC$ និង $BD$ បន្លាយជួបគ្នាត្រង់ $E$ ។",it:[
     Q("ប្រាប់ប្រភេទត្រីកោណ $ACB$ រួចគណនា $BC$ និង $AC$ ។","$\\triangle ACB$ កែងត្រង់ $C$ , $BC="+R+"$ cm , $AC="+R+"\\sqrt3$ cm",
       W("$\\angle ACB=90^\\circ$ (មុំចារឹកកន្លះរង្វង់) ⇒ $\\triangle ACB$ កែងត្រង់ $C$ ។ $HB=\\dfrac{OB}{2}="+n9(R/2)+"$ cm , $AH="+n9(1.5*R)+"$ cm ។","តាមទំនាក់ទំនងមាត្រក្នុងត្រីកោណកែង ($CH$ ជាកម្ពស់) ៖",
         AL(["BC^2&=BH\\times AB="+n9(R/2)+"\\times"+2*R+"="+R*R+"\\Rightarrow BC="+R+"\\text{ cm}","AC^2&=AH\\times AB="+n9(1.5*R)+"\\times"+2*R+"="+3*R*R+"\\Rightarrow AC="+R+"\\sqrt3\\text{ cm}"]))),
     Q("គណនារង្វាស់ធ្នូ $CD$ ជាដឺក្រេ ។","ធ្នូ $CD=120^\\circ$",
       W("ក្នុងត្រីកោណកែង $OHC$ ៖ $OC=R="+R+"$ និង $OH=\\dfrac R2$",AL(["\\cos\\angle COH&=\\dfrac{OH}{OC}=\\dfrac12\\Rightarrow\\angle COH=60^\\circ"]),"$AB$ ជាមេដ្យាទ័រនៃ $CD$ ⇒ ធ្នូ $CB$ = ធ្នូ $BD=60^\\circ$ ⇒ ធ្នូ $CD=120^\\circ$")),
     Q("ប្រៀបធៀបត្រីកោណ $EAB$ និង $ECD$ រួចទាញបង្ហាញថា $EC\\cdot EA=ED\\cdot EB$ ។","$\\triangle EAB\\sim\\triangle ECD$ ⇒ $EC\\cdot EA=ED\\cdot EB$",
       W("$\\angle EAB=\\angle EDC$ (មុំចារឹកស្កាត់ធ្នូ $CB$) និង $\\angle E$ ជាមុំរួម ⇒ $\\triangle EAB\\sim\\triangle ECD$ (ករណីទី១ ម.ម) ។",AL(["\\dfrac{EA}{ED}&=\\dfrac{EB}{EC}\\Rightarrow EC\\cdot EA=ED\\cdot EB"])))]}}},
 geo7:{id:"geo7",t:"បន្លាយ AB ឱ្យ BD = BM · ត្រីកោណដូចគ្នា · BMND ចារឹក",lv:3,f:function(){var t=pick([[10,6,8],[10,8,6],[5,3,4],[5,4,3],[15,9,12],[15,12,9],[20,12,16],[13,5,12]]),AB=t[0],BM=t[1],AM=t[2],AD=AB+BM,k=F(AD,AM);
   return{inst:"គេមានរង្វង់ផ្ចិត $O$ អង្កត់ផ្ចិត $AB="+AB+"$ cm និងចំណុច $M$ មួយនៅលើរង្វង់ដែល $BM="+BM+"$ cm ។ គេបន្លាយអង្កត់ $AB$ ខាង $B$ ឱ្យបាន $BD=BM$ រួចគូសបន្ទាត់ $d$ កែងនឹង $BD$ ត្រង់ $D$ ហើយកាត់បន្ទាត់ $AM$ ត្រង់ចំណុច $N$ ។",it:[
     Q("គណនារង្វាស់អង្កត់ $AM$ និង $AD$ ។","$AM="+AM+"$ cm , $AD="+AD+"$ cm",
       W("$\\angle AMB=90^\\circ$ (មុំចារឹកកន្លះរង្វង់) ។ ក្នុងត្រីកោណកែង $MAB$ ៖",AL(["AM^2&=AB^2-BM^2="+AB*AB+"-"+BM*BM+"="+AM*AM,"AM&="+AM+"\\text{ cm}","AD&=AB+BD="+AB+"+"+BM+"="+AD+"\\text{ cm}"]))),
     Q("ប្រៀបធៀប $\\triangle MAB$ និង $\\triangle DAN$ រួចគណនារង្វាស់ $AN$ និង $DN$ ។","$AN="+n9(AD*AB/AM)+"$ cm , $DN="+n9(AD*BM/AM)+"$ cm",
       W("$\\angle AMB=\\angle ADN=90^\\circ$ និង $\\angle A$ ជាមុំរួម ⇒ $\\triangle MAB\\sim\\triangle DAN$ (ករណីទី១ ម.ម) ។",AL(["\\dfrac{AD}{AM}&=\\dfrac{AN}{AB}=\\dfrac{DN}{MB}=\\dfrac{"+AD+"}{"+AM+"}"+(gcd(AD,AM)===1?"":"="+k),"AN&="+k+"\\times"+AB+"="+n9(AD*AB/AM)+"\\text{ cm}","DN&="+k+"\\times"+BM+"="+n9(AD*BM/AM)+"\\text{ cm}"]))),
     Q("បង្ហាញថាចតុកោណ $BMND$ ចារឹកក្នុងរង្វង់ ហើយប្រាប់ទីតាំងផ្ចិត $I$ របស់រង្វង់នោះ ។","$BMND$ ចារឹកក្នុងរង្វង់ផ្ចិត $I$ ជាចំណុចកណ្ដាលនៃ $BN$",
       W("ដោយ $A, M, N$ រត់ត្រង់ជួរ និង $\\angle AMB=90^\\circ$ ⇒ $\\angle BMN=90^\\circ$ ។ ហើយ $\\angle BDN=90^\\circ$ ($d\\perp BD$) ។","⇒ $\\angle BMN+\\angle BDN=180^\\circ$ ⇒ $BMND$ ចារឹកក្នុងរង្វង់ ។ $M$ និង $D$ មើល $BN$ ក្រោមមុំកែង ⇒ $BN$ ជាអង្កត់ផ្ចិត ⇒ ផ្ចិត $I$ ជាចំណុចកណ្ដាលនៃ $BN$ ។"))]}}},
 geo8:{id:"geo8",t:"បន្ទាត់ប៉ះពីរ PA = PB · បរិមាត្រ · ផ្ទៃក្រឡា PAOB",lv:2,f:function(){var t=pick([[4,3,5],[12,5,13],[8,6,10],[15,8,17],[12,9,15]]),PA=t[0],r=t[1],OP=t[2],a=pick([2,3]),x=ri(Math.floor(PA/a)+1,PA-1),b=a*x-PA,c=PA-x;
   return{inst:"គេមាន $PA$ និង $PB$ ជាបន្ទាត់ប៉ះទៅនឹងរង្វង់ផ្ចិត $O$ កាំ $"+r+"$ cm ត្រង់ $A$ និង $B$ ។ គេដឹងថា $PA="+a+"x-"+b+"$ និង $PB=x+"+c+"$ ។",it:[
     Q("កំណត់តម្លៃ $x$ និងប្រវែង $PA$ ។","$x="+x+"$ , $PA="+PA+"$ cm",
       W("បន្ទាត់ប៉ះរង្វង់ចេញពីចំណុចមួយនៅក្រៅរង្វង់មានប្រវែងស្មើគ្នា ៖ $PA=PB$",AL([a+"x-"+b+"&=x+"+c,kx(a-1)+"&="+(b+c),"x&="+x,"PA&="+a+"\\times"+x+"-"+b+"="+PA+"\\text{ cm}"]))),
     Q("បង្ហាញថា $OA\\perp PA$ ហើយគណនាប្រវែង $OP$ ។","$OP="+OP+"$ cm",
       W("បន្ទាត់ប៉ះរង្វង់កែងនឹងកាំត្រង់ចំណុចប៉ះ ⇒ $OA\\perp PA$ (ដូចគ្នា $OB\\perp PB$) ។ ក្នុងត្រីកោណកែង $OAP$ ៖",AL(["OP^2&=OA^2+PA^2="+r*r+"+"+PA*PA+"="+OP*OP,"OP&="+OP+"\\text{ cm}"]))),
     Q("គណនាបរិមាត្រ និងផ្ទៃក្រឡានៃចតុកោណ $PAOB$ ។","បរិមាត្រ $="+2*(PA+r)+"$ cm , ផ្ទៃក្រឡា $="+PA*r+"\\text{ cm}^2$",
       AL(["P&=PA+PB+OA+OB="+PA+"+"+PA+"+"+r+"+"+r+"="+2*(PA+r)+"\\text{ cm}","S&=S_{PAO}+S_{PBO}=2\\times\\dfrac12\\times"+PA+"\\times"+r+"="+PA*r+"\\text{ cm}^2"]))]}}}};
REG["9|1"]=[D9.mcq,D9.rad];REG["9|2"]=[D9.pct];REG["9|3"]=[D9.expr,D9.frac];REG["9|4"]=[D9.eq,D9.rect,D9.pisa];REG["9|11"]=[D9.word,D9.sys];REG["9|7"]=[D9.stat];REG["9|8"]=[D9.prob,D9.prob2,D9.prob3];
REG["9|10"]=[D9.coord,D9.coord2];REG["9|12"]=[D9.geo4,D9.geo8];REG["9|13"]=[D9.geo3,D9.geo5,D9.geo6];REG["9|15"]=[D9.geo1,D9.geo2,D9.geo7];REG["9|16"]=[D9.poly];
/* រចនាសម្ព័ន្ធវិញ្ញាសាឌីប្លូម (១២០ នាទី · ១០០ ពិន្ទុ) តាមគំរូវិញ្ញាសាជាតិ ២០២១–២០២៥ */
var DIP=[[[[1,"mcq"]],10],[[[1,"rad"],[3,"frac"]],10],[[[3,"expr"],[4,"eq"],[11,"sys"]],10],[[[11,"word"],[4,"rect"],[2,"pct"],[4,"pisa"],[7,"stat"],[16,"poly"]],15],[[[8,"prob"],[8,"prob2"],[8,"prob3"]],10],[[[10,"coord"],[10,"coord2"]],15],
  [[[15,"geo1"],[15,"geo2"],[13,"geo3"],[12,"geo4"],[13,"geo5"],[13,"geo6"],[15,"geo7"],[12,"geo8"]],30]];
window.EXGEN={
  has:function(k){return!!REG[k]},
  dip:function(){return DIP.map(function(x){var c=pick(x[0]);return{ls:c[0],lv:"t:"+c[1],pts:x[1]}})},
  bac:function(k){if(k==="b")return BAC.map(function(x){var f=x[1]?null:pick([[42,"fexp"],[43,"fln"]]);return{ls:f?f[0]:x[0],lv:"t:"+(f?f[1]:x[1]),pts:x[2]}});
    return BAC7.map(function(x){var c=pick(x[0]);return{ls:c[0],lv:"t:"+c[1],pts:x[1]}})},
  list:function(k){return(REG[k]||[]).map(function(x){return{id:x.id,t:x.t,lv:x.lv}})},
  make:function(k,id){var L=REG[k]||[],t=L.filter(function(x){return x.id===id})[0]||L[0];if(!t)return null;var o=t.f();o.it=o.it.map(function(x){return{q:x.q,fig:"",ans:x.ans,sol:x.sol}});return o}
};
})();
