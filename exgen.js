/* ========================================================================
   🇰🇭 គំរូលំហាត់ប្រឡងទម្រង់បើក (ទម្រង់កម្ពុជា) — ផ្នែកមួយ = ទិន្នន័យរួម + សំណួររង ក ខ គ … (ពិបាកកើនឡើង)
   យកលំនាំតាមសៀវភៅ «លំហាត់អនុវត្តន៍ · លំហាត់ស្រាវជ្រាវបន្ថែម» (គ្រូ ផៃ ចន) · លេខប្ដូរដោយស្វ័យប្រវត្តិ · ចម្លើយគណនាពិតប្រាកដ (ប្រភាគ · √ · មុំស្តង់ដារ)
   EXGEN.list("12|11") → [{id, t, lv}] · EXGEN.make("12|11", id) → {inst, it:[{q, ans, sol}]}
   ======================================================================== */
(function(){
"use strict";
/* --- Anti-Repetition History --- */
var history = {};
function sessionAvoid(id, q) {
    if (!history[id]) history[id] = [];
    if (history[id].includes(q)) return true;
    history[id].push(q);
    if (history[id].length > 50) history[id].shift();
    return false;
}
function randomizeEntropy(x) {
    // Increase variation by adding small random perturbations or template choices
    var variation = Math.random() > 0.5 ? 1 : -1;
    return x + variation;
}
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
/* ===================== ថ្នាក់ទី១២ · ចំនួនកុំផ្លិច (ដំណោះស្រាយពេញលេញ) ===================== */
function sci(k){return k?(k<0?"-":"+")+(Math.abs(k)===1?"":Math.abs(k))+"i":""}
function cmul(L,a,b,c,d){return[L+"&=("+cxi(a,b)+")("+cxi(c,d)+")","&="+(a*c)+sci(a*d)+sci(b*c)+(b*d?(b*d<0?"-":"+")+(Math.abs(b*d)===1?"":Math.abs(b*d))+"i^2":""),"&="+(a*c)+sci(a*d+b*c)+(b*d?sg(-b*d):"")+"\\quad(i^2=-1)","&="+cxi(a*c-b*d,a*d+b*c)]}
function cdiv(L,a,b,c,d){var den=c*c+d*d;return[L+"&=\\dfrac{("+cxi(a,b)+")("+cxi(c,-d)+")}{("+cxi(c,d)+")("+cxi(c,-d)+")}","&=\\dfrac{"+cxi(a*c+b*d,b*c-a*d)+"}{"+pn(c)+"^2+"+pn(d)+"^2}","&=\\dfrac{"+cxi(a*c+b*d,b*c-a*d)+"}{"+den+"}","&="+cxq(a*c+b*d,den,b*c-a*d,den)]}
/* ម៉ូឌុល + អាគុយម៉ង់ (z = {re, im, r, a}) */
function marg(z,n){n=n||"z";var re=z.re,im=z.im,c=Sdiv(re,z.r),s=Sdiv(im,z.r),sq=function(x){var t=St(x);return/^-|\\dfrac|\\sqrt/.test(t)?"\\left("+t+"\\right)^2":t+"^2"};
  return AL(["|"+n+"|&=\\sqrt{"+sq(re)+"+"+sq(im)+"}="+St(z.r),"\\cos\\theta&=\\dfrac{"+St(re)+"}{"+St(z.r)+"}="+St(c)+"\\ ,\\ \\sin\\theta=\\dfrac{"+St(im)+"}{"+St(z.r)+"}="+St(s)])+"\nនាំឱ្យ $\\theta="+angT(z.a)+"$"}
var C=[
 {id:"ops",t:"ប្រមាណវិធីលើចំនួនកុំផ្លិច (ទិន្នន័យរួម)",lv:1,f:function(){
   var a=nz(-5,5),b=nz(-5,5),c=nz(-4,4),d=nz(-4,4);while(a*d===b*c){d=nz(-4,4)}
   var z1=cxi(a,b),z2=cxi(c,d),den=c*c+d*d;
   return{inst:"គេឱ្យចំនួនកុំផ្លិច $z_1="+z1+"$ និង $z_2="+z2+"$ ។",it:[
     Q("គណនា $z_1+z_2$ , $z_1-z_2$ និង $z_1\\times z_2$ ។","$z_1+z_2="+cxi(a+c,b+d)+"$ , $z_1-z_2="+cxi(a-c,b-d)+"$ , $z_1z_2="+cxi(a*c-b*d,a*d+b*c)+"$",
       W(AL(["z_1+z_2&=("+z1+")+("+z2+")="+cxi(a+c,b+d),"z_1-z_2&=("+z1+")-("+z2+")="+cxi(a-c,b-d)]),AL(cmul("z_1z_2",a,b,c,d)))),
     Q("សរសេរ $\\dfrac{z_1}{z_2}$ ជាទម្រង់ពិជគណិត $a+bi$ ។","$\\dfrac{z_1}{z_2}="+cxq(a*c+b*d,den,b*c-a*d,den)+"$",
       W("គុណភាគយក និងភាគបែងនឹងចំនួនកុំផ្លិចឆ្លាស់ $\\overline{z_2}="+cxi(c,-d)+"$ ៖",AL(cdiv("\\dfrac{z_1}{z_2}",a,b,c,d)))),
     Q("រកចំនួនកុំផ្លិចឆ្លាស់ $\\overline{z_1}$ និងម៉ូឌុល $|z_2|$ ។","$\\overline{z_1}="+cxi(a,-b)+"$ , $|z_2|="+sqrtT(den)+"$",
       AL(["\\overline{z_1}&=\\overline{"+z1+"}="+cxi(a,-b),"|z_2|&=\\sqrt{"+pn(c)+"^2+"+pn(d)+"^2}=\\sqrt{"+den+"}="+sqrtT(den)]))]}}},
 {id:"alg",t:"សរសេរជាទម្រង់ពិជគណិត a+bi",lv:1,f:function(){
   var a=nz(-4,4),b=nz(-4,4),c=nz(-3,3),d=nz(-3,3),e=nz(-3,3),f=nz(-3,3),g=nz(-3,3),h=nz(-3,3),n=pick([4,6,8]),sgn=pick([1,-1]);
   var p=[1,0],base=[1,sgn];for(var i=0;i<n;i++)p=[p[0]*base[0]-p[1]*base[1],p[0]*base[1]+p[1]*base[0]];
   var den=g*g+h*h,s=sgn<0?"-":"+",t2=sgn<0?"-2i":"2i";
   return{inst:"សរសេរចំនួនកុំផ្លិចខាងក្រោមជាទម្រង់ពិជគណិត $a+bi$ (ដែល $a,b\\in\\mathbb R$)៖",it:[
     Q("$z=("+cxi(a,b)+")("+cxi(c,d)+")$","$z="+cxi(a*c-b*d,a*d+b*c)+"$",AL(cmul("z",a,b,c,d))),
     Q("$z=("+cxi(e,f)+")^2$","$z="+cxi(e*e-f*f,2*e*f)+"$",W("ប្រើ $(a+bi)^2=a^2+2abi+b^2i^2=a^2-b^2+2abi$ ៖",AL(["z&="+pn(e)+"^2+2\\times"+pn(e)+"\\times"+pn(f)+"i+"+pn(f)+"^2i^2","&="+e*e+sci(2*e*f)+"-"+f*f,"&="+cxi(e*e-f*f,2*e*f)]))),
     Q("$z=\\dfrac{"+cxi(e,f)+"}{"+cxi(g,h)+"}$","$z="+cxq(e*g+f*h,den,f*g-e*h,den)+"$",W("គុណភាគយក និងភាគបែងនឹង $"+cxi(g,-h)+"$ ៖",AL(cdiv("z",e,f,g,h)))),
     Q("$z=(1"+s+"i)^{"+n+"}$","$z="+cxi(p[0],p[1])+"$",AL(["(1"+s+"i)^2&=1"+s+"2i+i^2="+t2,"z&=\\left[(1"+s+"i)^2\\right]^{"+n/2+"}=("+t2+")^{"+n/2+"}","&="+(sgn<0&&(n/2)%2?"-":"")+Math.pow(2,n/2)+"\\,i^{"+n/2+"}="+cxi(p[0],p[1])]))]}}},
 {id:"xy",t:"រកចំនួនពិត x និង y",lv:2,f:function(){
   var x1=nz(-4,4),y1=nz(-4,4),p=nz(1,3),q=nz(-3,3),r=nz(1,3),s=nz(-3,3);
   var x2=nz(-4,4),y2=nz(-4,4),x3=nz(-3,3),y3=nz(-3,3),a1=nz(1,3),b1=nz(-2,2),a2=nz(-2,2),b2=nz(-3,3);while(a1*b2-a2*b1===0)b2=nz(-3,3);
   var R=a1*x3+a2*y3,I=b1*x3+b2*y3,D=a1*b2-a2*b1;
   return{inst:"រកចំនួនពិត $x$ និង $y$ ដែលផ្ទៀងផ្ទាត់សមភាពខាងក្រោម៖",it:[
     Q("$("+kx(p)+sg(q)+")+("+kx(r,"y")+sg(s)+")i="+cxi(p*x1+q,r*y1+s)+"$","$x="+x1+"$ , $y="+y1+"$",
       W("ចំនួនកុំផ្លិចពីរស្មើគ្នា លុះត្រាតែផ្នែកពិតស្មើគ្នា និងផ្នែកនិមិត្តស្មើគ្នា ៖",AL([kx(p)+sg(q)+"&="+(p*x1+q)+"\\Rightarrow x="+x1,kx(r,"y")+sg(s)+"&="+(r*y1+s)+"\\Rightarrow y="+y1]))),
     Q("$(x+y)+(x-y)i="+cxi(x2+y2,x2-y2)+"$","$x="+x2+"$ , $y="+y2+"$",
       W("ផ្ទឹមផ្នែកពិត និងផ្នែកនិមិត្ត ៖","$$\\begin{cases}x+y="+(x2+y2)+"\\\\x-y="+(x2-y2)+"\\end{cases}$$","បូកសមីការទាំងពីរ ៖",AL(["2x&="+2*x2+"\\Rightarrow x="+x2,"y&="+(x2+y2)+"-"+pn(x2)+"="+y2]))),
     Q("$x("+cxi(a1,b1)+")+y("+cxi(a2,b2)+")="+cxi(R,I)+"$","$x="+x3+"$ , $y="+y3+"$",
       W("អង្គខាងឆ្វេង $=("+kx(a1)+tm(a2,"y")+")+("+kx(b1)+tm(b2,"y")+")i$ ។ ផ្ទឹមផ្នែកពិត និងផ្នែកនិមិត្ត ៖","$$\\begin{cases}"+kx(a1)+tm(a2,"y")+"="+R+"\\\\"+kx(b1)+tm(b2,"y")+"="+I+"\\end{cases}$$",
         "ដោះស្រាយតាមដេទែមីណង់ ៖",AL(["D&="+pn(a1)+"\\times"+pn(b2)+"-"+pn(a2)+"\\times"+pn(b1)+"="+D,"x&=\\dfrac{"+pn(R)+"\\times"+pn(b2)+"-"+pn(a2)+"\\times"+pn(I)+"}{"+D+"}="+x3,"y&=\\dfrac{"+pn(a1)+"\\times"+pn(I)+"-"+pn(b1)+"\\times"+pn(R)+"}{"+D+"}="+y3])))]}}},
 {id:"eq2",t:"ដោះស្រាយសមីការក្នុង ℂ",lv:2,f:function(){
   var k=ri(2,6),p=nz(-3,3),q=ri(1,4),m=pick([1,3,-1,-3]),n=pick([1,3,5]);
   var c2=(m*m+n*n),qi=(q===1?"":q)+"i";
   return{inst:"ដោះស្រាយសមីការខាងក្រោមក្នុងសំណុំចំនួនកុំផ្លិច $\\mathbb C$៖",it:[
     Q("$z^2+"+k*k+"=0$","$z=\\pm"+k+"i$",AL(["z^2&=-"+k*k+"="+k*k+"i^2=("+k+"i)^2","z&=\\pm"+k+"i"])),
     Q("$z^2"+sg(-2*p)+"z+"+(p*p+q*q)+"=0$","$z="+cxi(p,q)+"$ ឬ $z="+cxi(p,-q)+"$",
       W("មាន $a=1$ , $b'="+(-p)+"$ , $c="+(p*p+q*q)+"$ ៖",AL(["\\Delta'&=b'^2-ac="+pn(-p)+"^2-"+(p*p+q*q)+"=-"+q*q+"=("+qi+")^2"]),"សមីការមានឫសកុំផ្លិចពីរ ៖",AL(["z_1&=\\dfrac{-b'+"+qi+"}{a}="+cxi(p,q),"z_2&=\\dfrac{-b'-"+qi+"}{a}="+cxi(p,-q)]))),
     Q("$4z^2"+sg(-4*m)+"z+"+c2+"=0$","$z="+cxq(m,2,n,2)+"$ ឬ $z="+cxq(m,2,-n,2)+"$",
       W("មាន $a=4$ , $b'="+(-2*m)+"$ , $c="+c2+"$ ៖",AL(["\\Delta'&="+pn(-2*m)+"^2-4\\times"+c2+"="+4*m*m+"-"+4*c2+"=-"+4*n*n+"=("+2*n+"i)^2"]),"សមីការមានឫសកុំផ្លិចពីរ ៖",
         AL(["z_1&=\\dfrac{"+2*m+"+"+2*n+"i}{4}="+cxq(m,2,n,2),"z_2&=\\dfrac{"+2*m+"-"+2*n+"i}{4}="+cxq(m,2,-n,2)])))]}}},
 {id:"modarg",t:"ម៉ូឌុល និងអាគុយម៉ង់",lv:1,f:function(){
   var L=[spt(),spt(),spt(),spt()];
   return{inst:"គណនាម៉ូឌុល $|z|$ និងអាគុយម៉ង់ចម្បង $\\arg z$ នៃចំនួនកុំផ្លិចខាងក្រោម៖",it:L.map(function(z){
     return Q("$z="+Ct(z.re,z.im)+"$","$|z|="+St(z.r)+"$ , $\\arg z="+angT(z.a)+"$",marg(z))})}}},
 {id:"trig",t:"ទម្រង់ត្រីកោណមាត្រ · ផលគុណ · ផលចែក · ដឺម័រ",lv:3,f:function(){
   var z1=spt(),z2=spt();while(z2.a===z1.a)z2=spt();var n=pick([3,4,6]);
   var rp=Sm(z1.r,z2.r),rq=Sdiv(z1.r,z2.r),rn=S(1);for(var i=0;i<n;i++)rn=Sm(rn,z1.r);
   var c=cs(n*z1.a),pw=c?Ct(Sm(rn,c[0]),Sm(rn,c[1])):"",ap=function(k){return angT(k)},A2=angN(z2.a)<0?"\\left("+angT(z2.a)+"\\right)":angT(z2.a),SP=angT(z1.a)+"+"+A2,SQ=angT(z1.a)+"-"+A2;
   return{inst:"គេឱ្យចំនួនកុំផ្លិច $z_1="+Ct(z1.re,z1.im)+"$ និង $z_2="+Ct(z2.re,z2.im)+"$ ។",it:[
     Q("សរសេរ $z_1$ និង $z_2$ ជាទម្រង់ត្រីកោណមាត្រ ។","$z_1="+trig(St(z1.r),z1.a)+"$ , $z_2="+trig(St(z2.r),z2.a)+"$",
       W("• ចំពោះ $z_1$ ៖",marg(z1,"z_1"),"ដូចនេះ $z_1="+trig(St(z1.r),z1.a)+"$","• ចំពោះ $z_2$ ៖",marg(z2,"z_2"),"ដូចនេះ $z_2="+trig(St(z2.r),z2.a)+"$")),
     Q("គណនា $z_1\\times z_2$ និង $\\dfrac{z_1}{z_2}$ ជាទម្រង់ត្រីកោណមាត្រ ។","$z_1z_2="+trig(St(rp),z1.a+z2.a)+"$ , $\\dfrac{z_1}{z_2}="+trig(St(rq),z1.a-z2.a)+"$",
       W("ផលគុណ ៖ គុណម៉ូឌុល និងបូកអាគុយម៉ង់ ។ ផលចែក ៖ ចែកម៉ូឌុល និងដកអាគុយម៉ង់ ។",AL(["z_1z_2&="+St(z1.r)+"\\times"+St(z2.r)+"\\left[\\cos\\left("+SP+"\\right)+i\\sin\\left("+SP+"\\right)\\right]","&="+trig(St(rp),z1.a+z2.a),
         "\\dfrac{z_1}{z_2}&=\\dfrac{"+St(z1.r)+"}{"+St(z2.r)+"}\\left[\\cos\\left("+SQ+"\\right)+i\\sin\\left("+SQ+"\\right)\\right]","&="+trig(St(rq),z1.a-z2.a)]))),
     Q("ដោយប្រើរូបមន្តដឺម័រ គណនា $z_1^{"+n+"}$ ជាទម្រង់ពិជគណិត ។","$z_1^{"+n+"}="+pw+"$",
       W("រូបមន្តដឺម័រ ៖ $\\left[r(\\cos\\theta+i\\sin\\theta)\\right]^n=r^n(\\cos n\\theta+i\\sin n\\theta)$",AL(["z_1^{"+n+"}&=\\left("+St(z1.r)+"\\right)^{"+n+"}\\left[\\cos\\left("+n+"\\times"+(angN(z1.a)<0?"\\left("+ap(z1.a)+"\\right)":ap(z1.a))+"\\right)+i\\sin\\left("+n+"\\times"+(angN(z1.a)<0?"\\left("+ap(z1.a)+"\\right)":ap(z1.a))+"\\right)\\right]","&="+trig(St(rn),n*z1.a),"&="+pw])))]}}},
 {id:"poly",t:"ពហុធាដឺក្រេទី៣ (ឫសពិត + ឫសកុំផ្លិច)",lv:3,f:function(){
   var r=nz(-3,3),p=nz(-3,3),q=ri(1,3),B=-2*p,Cc=p*p+q*q;
   var a2=B-r,a1=Cc-r*B,a0=-r*Cc,cf=[1,a2,a1,a0];
   var Pz="z^3"+(a2?(a2<0?"-":"+")+(Math.abs(a2)===1?"":Math.abs(a2))+"z^2":"")+(a1?(a1<0?"-":"+")+(Math.abs(a1)===1?"":Math.abs(a1))+"z":"")+(a0?(a0<0?"-":"+")+Math.abs(a0):"");
   var Qz="z^2"+(B?(B<0?"-":"+")+(Math.abs(B)===1?"":Math.abs(B))+"z":"")+"+"+Cc,zr="z"+sg(-r),qi=(q===1?"":q)+"i";
   return{inst:"គេឱ្យពហុធា $P(z)="+Pz+"$ ។",it:[
     Q("បង្ហាញថា $z_1="+r+"$ ជាឫសមួយនៃពហុធា $P(z)$ ។","$P("+r+")=0$ ⇒ $z_1="+r+"$ ជាឫស",
       AL(["P("+r+")&="+pn(r)+"^3"+sg(a2)+"\\times"+pn(r)+"^2"+sg(a1)+"\\times"+pn(r)+sg(a0),"&="+(r*r*r)+sg(a2*r*r)+sg(a1*r)+sg(a0)+"=0"])),
     Q("ដាក់ $P(z)$ ជាផលគុណកត្តា រួចដោះស្រាយសមីការ $P(z)=0$ ក្នុងសំណុំ $\\mathbb C$ ។","$P(z)=("+zr+")("+Qz+")$ , $z\\in\\{"+r+";\\ "+cxi(p,q)+";\\ "+cxi(p,-q)+"\\}$",
       W("ចែក $P(z)$ នឹង $"+zr+"$ តាមវិធីហូណ័រ ៖","$$\\begin{array}{c|cccc}&1&"+a2+"&"+a1+"&"+a0+"\\\\"+r+"&&"+r+"&"+r*B+"&"+r*Cc+"\\\\\\hline&1&"+B+"&"+Cc+"&0\\end{array}$$",
         "នាំឱ្យ $P(z)=("+zr+")("+Qz+")$ ។ ដោះស្រាយ $"+Qz+"=0$ ៖",AL(["\\Delta'&="+pn(p)+"^2-"+Cc+"=-"+q*q+"=("+qi+")^2","z&="+p+"\\pm"+qi]),"ដូចនេះ ឫសទាំងបីគឺ $"+r+"$ , $"+cxi(p,q)+"$ និង $"+cxi(p,-q)+"$"))]}}},
 {id:"geo",t:"ចំនួនកុំផ្លិចក្នុងធរណីមាត្រ (ត្រីកោណ)",lv:2,f:function(){
   var ax=nz(-3,3),ay=nz(-3,3),u=nz(-3,3),v=nz(-3,3);while(!u&&!v)v=nz(-3,3);
   var bx=ax+u,by=ay+v,cx_=bx-v,cy=by+u,L2=u*u+v*v;
   return{kfig:FG({A:[ax,ay],B:[bx,by],C:[cx_,cy]},["poly A B C blue","right A B C"],{axes:1}),inst:"នៅក្នុងប្លង់កុំផ្លិច គេមានចំណុច $A,B,C$ ដែលមានអាហ្វិករៀងគ្នា $z_A="+cxi(ax,ay)+"$ , $z_B="+cxi(bx,by)+"$ និង $z_C="+cxi(cx_,cy)+"$ ។",it:[
     Q("គណនាប្រវែងជ្រុង $AB$ , $BC$ និង $AC$ ។","$AB=BC="+sqrtT(L2)+"$ , $AC="+sqrtT(2*L2)+"$",
       AL(["AB&=|z_B-z_A|=|"+cxi(u,v)+"|=\\sqrt{"+pn(u)+"^2+"+pn(v)+"^2}="+sqrtT(L2),"BC&=|z_C-z_B|=|"+cxi(-v,u)+"|=\\sqrt{"+pn(-v)+"^2+"+pn(u)+"^2}="+sqrtT(L2),"AC&=|z_C-z_A|=|"+cxi(u-v,u+v)+"|=\\sqrt{"+(u-v)*(u-v)+"+"+(u+v)*(u+v)+"}="+sqrtT(2*L2)])),
     Q("បង្ហាញថា ត្រីកោណ $ABC$ ជាត្រីកោណកែងសមបាតត្រង់ $B$ ។","$AB=BC$ និង $AB^2+BC^2=AC^2$",
       W("ដោយ $AB=BC="+sqrtT(L2)+"$ នោះ $ABC$ ជាត្រីកោណសមបាតកំពូល $B$ ។",AL(["AB^2+BC^2&="+L2+"+"+L2+"="+2*L2+"=AC^2"]),"តាមទ្រឹស្ដីបទពីតាករច្រាស $ABC$ កែងត្រង់ $B$ ។ ដូចនេះ $ABC$ ជាត្រីកោណកែងសមបាតត្រង់ $B$ ។"))]}}},
 {id:"root",t:"ឫសទី n នៃចំនួនកុំផ្លិច",lv:3,f:function(){
   var n=pick([2,3,4]),w=spt(),r=S(1);for(var i=0;i<n;i++)r=Sm(r,w.r);var c=cs(n*w.a);
   if(!c){w.a=pick([2,4,6,3]);c=cs(n*w.a)}
   var zre=Sm(r,c[0]),zim=Sm(r,c[1]),z=Ct(zre,zim),th=angN(n*w.a),list=[];for(var k=0;k<n;k++)list.push("w_"+k+"="+trig(St(w.r),angN((th+24*k)/n)));
   return{inst:"គេឱ្យចំនួនកុំផ្លិច $z="+z+"$ ។",it:[
     Q("សរសេរ $z$ ជាទម្រង់ត្រីកោណមាត្រ ។","$z="+trig(St(r),th)+"$",W(marg({re:zre,im:zim,r:r,a:th}),"ដូចនេះ $z="+trig(St(r),th)+"$")),
     Q("រកគ្រប់ឫសទី $"+n+"$ នៃ $z$ ជាទម្រង់ត្រីកោណមាត្រ ។","$"+list.join("$ , $")+"$",
       W("ឫសទី $n$ នៃ $z=r(\\cos\\theta+i\\sin\\theta)$ គឺ ៖","$$w_k=\\sqrt["+n+"]{r}\\left[\\cos\\dfrac{\\theta+2k\\pi}{"+n+"}+i\\sin\\dfrac{\\theta+2k\\pi}{"+n+"}\\right],\\ k=0,\\dots,"+(n-1)+"$$","ដោយ $\\sqrt["+n+"]{"+St(r)+"}="+St(w.r)+"$ និង $\\theta="+angT(th)+"$ ៖",AL(list.map(function(x){return x.replace("=","&=")}))))]}}},
 {id:"x1x2",t:"សមីការដឺក្រេទី២ មានឫសកុំផ្លិចដែលគេស្គាល់",lv:2,f:function(){
   var p=nz(-3,3),q=ri(1,3),a=-2*p,b=p*p+q*q,den=b;
   return{inst:"គេមានសមីការ $x^2+ax+b=0$ ដែល $a$ និង $b$ ជាចំនួនពិត ។",it:[
     Q("កំណត់ចំនួនពិត $a$ និង $b$ ដើម្បីឱ្យ $x_1="+cxi(p,q)+"$ ជាឫសមួយនៃសមីការ ។","$a="+a+"$ , $b="+b+"$",
       W("ដោយមេគុណជាចំនួនពិត ឫសមួយទៀតគឺ $x_2=\\overline{x_1}="+cxi(p,-q)+"$ ។ តាមទំនាក់ទំនងវ្យែត ៖",AL(["x_1+x_2&="+2*p+"=-a\\Rightarrow a="+a,"x_1x_2&=("+cxi(p,q)+")("+cxi(p,-q)+")="+pn(p)+"^2+"+q*q+"="+b+"=b"]))),
     Q("រកឫស $x_2$ មួយទៀត រួចសរសេរ $\\dfrac{x_1}{x_2}$ ជាទម្រង់ពិជគណិត ។","$x_2="+cxi(p,-q)+"$ , $\\dfrac{x_1}{x_2}="+cxq(p*p-q*q,den,2*p*q,den)+"$",
       W("$x_2=\\overline{x_1}="+cxi(p,-q)+"$",AL(cdiv("\\dfrac{x_1}{x_2}",p,q,p,-q))))]}}}
];
/* ===================== ថ្នាក់ទី១២ · អនុគមន៍សនិទាន ===================== */
function lin(a,b,v){v=v||"x";return(a===1?"":a===-1?"-":a)+v+(b?(b<0?b:"+"+b):"")}
function pl(c){var o="",n=c.length-1;c.forEach(function(v,i){var p=n-i;if(!v)return;var a=Math.abs(v),t=p?(a===1?"":a)+(p>1?"x^{"+p+"}":"x"):String(a);o+=(v<0?"-":o?"+":"")+t});return o||"0"}
function itv(a,b,ca,cb){return(ca?"[":"(")+a+";"+b+(cb?"]":")")}
/* តារាងសញ្ញា៖ xs = ចំណុច (n) · rows = [[ឈ្មោះ, ក្រឡា 2n−1]] */
function STB(xs,rows){var xr=[];xs.forEach(function(x,i){xr.push(x);if(i<xs.length-1)xr.push("")});
  return"$$"+(xr.length>=7?"\\small":"")+"\\begin{array}{c|"+Array(xr.length+1).join("c")+"}x&"+xr.join("&")+rows.map(function(r){return"\\\\\\hline "+r[0]+"&"+r[1].join("&")}).join("")+"\\end{array}$$"}
function sgc(v){return v>0?"+":v<0?"-":"0"}
var R=[
 {id:"sign",t:"សិក្សាសញ្ញានៃអនុគមន៍",lv:1,f:function(){
   var a=nz(-4,4),b=nz(-6,6),x1=nz(-4,3),x2=x1+ri(1,4),k=pick([1,-1,2]),c1=nz(-3,3),c2=nz(-3,3);while(c1===c2)c2=nz(-3,3);var lo=Math.min(c1,c2),hi=Math.max(c1,c2),r0=F(-b,a),sa=a>0?1:-1,sk=k>0?1:-1;
   var tx=function(v){return"x"+(v<0?"+"+(-v):"-"+v)};
   return{inst:"សិក្សាសញ្ញានៃអនុគមន៍ខាងក្រោម៖",it:[
     Q("$f(x)="+lin(a,b)+"$","ឫស $x="+r0+"$ · ខាងឆ្វេងឫស $f(x)$ មានសញ្ញា"+(a>0?"អវិជ្ជមាន":"វិជ្ជមាន")+" · ខាងស្ដាំ"+(a>0?"វិជ្ជមាន":"អវិជ្ជមាន"),
       W("$f(x)=0\\iff x="+r0+"$ ។ មេគុណ $a="+a+(a>0?">0":"<0")+"$ ៖ ខាងស្ដាំឫសសញ្ញាដូច $a$ ខាងឆ្វេងសញ្ញាផ្ទុយពី $a$ ៖",STB(["-\\infty",r0,"+\\infty"],[["f(x)",["",sgc(-sa),"0",sgc(sa),""]]]))),
     Q("$g(x)="+pl([k,-k*(x1+x2),k*x1*x2])+"$","ឫស $x_1="+x1+"$ , $x_2="+x2+"$ · ក្នុងចន្លោះឫស $g(x)$ មានសញ្ញា"+(k>0?"អវិជ្ជមាន":"វិជ្ជមាន")+" · ក្រៅចន្លោះឫស"+(k>0?"វិជ្ជមាន":"អវិជ្ជមាន"),
       W("$g(x)="+(k===1?"":k===-1?"-":k)+"("+tx(x1)+")("+tx(x2)+")$ មានឫស $x_1="+x1+"$ និង $x_2="+x2+"$ ។ ក្រៅចន្លោះឫសសញ្ញាដូច $a="+k+"$ ក្នុងចន្លោះឫសសញ្ញាផ្ទុយ ៖",STB(["-\\infty",String(x1),String(x2),"+\\infty"],[["g(x)",["",sgc(sk),"0",sgc(-sk),"0",sgc(sk),""]]]))),
     Q("$h(x)=\\dfrac{"+tx(lo)+"}{"+tx(hi)+"}$","$h(x)>0$ ពេល $x<"+lo+"$ ឬ $x>"+hi+"$ · $h(x)<0$ ពេល $"+lo+"<x<"+hi+"$ · $h("+lo+")=0$ · មិនកំណត់ត្រង់ $x="+hi+"$",
       W("ភាគយកសូន្យត្រង់ $x="+lo+"$ ភាគបែងសូន្យត្រង់ $x="+hi+"$ ($h$ មិនកំណត់) ៖",STB(["-\\infty",String(lo),String(hi),"+\\infty"],[[tx(lo),["","-","0","+","+","+",""]],[tx(hi),["","-","-","-","0","+",""]],["h(x)",["","+","0","-","\\|","+",""]]])))]}}},
 {id:"oblique",t:"អាស៊ីមតូតទ្រេត (ចែកពហុធា)",lv:2,f:function(){
   var a=nz(-2,3),b=nz(-4,4),d=nz(-3,3),g=nz(-5,5),be=b,c=g-d*be,xd="x"+(d<0?"+"+(-d):"-"+d),dd=Math.abs(d)===1?"":Math.abs(d);
   var num=[a,be-a*d,c];
   return{inst:"គេឱ្យអនុគមន៍ $f(x)=\\dfrac{"+pl(num)+"}{"+xd+"}$ មានក្រាបតំណាង $(C)$ ។",it:[
     Q("កំណត់ចំនួនពិត $\\alpha,\\beta,\\gamma$ ដែល $f(x)=\\alpha x+\\beta+\\dfrac{\\gamma}{"+xd+"}$ ។","$\\alpha="+a+"$ , $\\beta="+be+"$ , $\\gamma="+g+"$",
       W(AL(["\\alpha x+\\beta+\\dfrac{\\gamma}{"+xd+"}&=\\dfrac{(\\alpha x+\\beta)("+xd+")+\\gamma}{"+xd+"}","&=\\dfrac{\\alpha x^2+(\\beta"+(d<0?"+":"-")+dd+"\\alpha)x"+(d<0?"+":"-")+dd+"\\beta+\\gamma}{"+xd+"}"]),"ផ្ទឹមមេគុណជាមួយ $"+pl(num)+"$ ៖",
         "$$\\begin{cases}\\alpha="+a+"\\\\\\beta"+(d<0?"+":"-")+dd+"\\alpha="+(be-a*d)+"\\\\"+(d<0?"":"-")+dd+"\\beta+\\gamma="+c+"\\end{cases}\\Rightarrow\\alpha="+a+",\\ \\beta="+be+",\\ \\gamma="+g+"$$")),
     Q("ទាញរកសមីការអាស៊ីមតូតឈរ និងអាស៊ីមតូតទ្រេតនៃក្រាប $(C)$ ។","អាស៊ីមតូតឈរ $x="+d+"$ · អាស៊ីមតូតទ្រេត $y="+lin(a,be)+"$",
       W("• $\\lim\\limits_{x\\to"+d+"}\\left|f(x)\\right|=+\\infty$ (ភាគបែង $\\to0$ ភាគយក $\\to"+g+"\\ne0$) ⇒ អាស៊ីមតូតឈរ $x="+d+"$",AL(["f(x)-("+lin(a,be)+")&=\\dfrac{"+g+"}{"+xd+"}\\xrightarrow[x\\to\\pm\\infty]{}0"]),"⇒ អាស៊ីមតូតទ្រេត $y="+lin(a,be)+"$")),
     Q("សិក្សាទីតាំងធៀបរវាងក្រាប $(C)$ និងអាស៊ីមតូតទ្រេត ។","$(C)$ នៅ"+(g>0?"លើ":"ក្រោម")+"អាស៊ីមតូតពេល $x>"+d+"$ និងនៅ"+(g>0?"ក្រោម":"លើ")+"ពេល $x<"+d+"$",
       W("សញ្ញានៃ $f(x)-("+lin(a,be)+")=\\dfrac{"+g+"}{"+xd+"}$ ៖",STB(["-\\infty",String(d),"+\\infty"],[["\\dfrac{"+g+"}{"+xd+"}",["",sgc(-g),"\\|",sgc(g),""]]]),"• $x>"+d+"$ ៖ $(C)$ នៅ"+(g>0?"លើ":"ក្រោម")+" · • $x<"+d+"$ ៖ $(C)$ នៅ"+(g>0?"ក្រោម":"លើ")))]}}},
 {id:"study",t:"សិក្សាអថេរភាព និងសង់ក្រាប",lv:3,f:function(){
   var d=nz(-2,2),m=ri(1,3),b=nz(-3,3),xd="x"+(d<0?"+"+(-d):"-"+d);
   var num=[1,b-d,m*m-d*b];
   var fm=d-m,fp=d+m,ym=fm+b-m,yp=fp+b+m,tx=function(v){return"x"+(v<0?"+"+(-v):v?"-"+v:"")};
   return{kfig:GRF(["y=x"+js(b)+"+"+m*m+"/(x"+js(-d)+") blue","dash x="+d,"dash y=x"+js(b)],[d-7,d+7,ym-6,yp+6]),inst:"គេឱ្យអនុគមន៍ $f(x)=\\dfrac{"+pl(num)+"}{"+xd+"}$ មានក្រាបតំណាង $(C)$ ។",it:[
     Q("រកដែនកំណត់ និងគណនាលីមីតត្រង់ចុងដែនកំណត់ ។","$D=\\mathbb R\\setminus\\{"+d+"\\}$ · $\\lim\\limits_{x\\to\\pm\\infty}f(x)=\\pm\\infty$ · $\\lim\\limits_{x\\to "+d+"^{\\pm}}f(x)=\\pm\\infty$",
       W("$f$ កំណត់កាលណា $"+xd+"\\ne0$ ⇒ $D=\\mathbb R\\setminus\\{"+d+"\\}$ ។ ចែកពហុធា ៖ $f(x)=x"+sg(b)+"+\\dfrac{"+m*m+"}{"+xd+"}$","• $x\\to\\pm\\infty$ ៖ $\\dfrac{"+m*m+"}{"+xd+"}\\to0$ ⇒ $f(x)\\to\\pm\\infty$","• $x\\to"+d+"^+$ ៖ $\\dfrac{"+m*m+"}{"+xd+"}\\to+\\infty$ · $x\\to"+d+"^-$ ៖ $\\to-\\infty$")),
     Q("គណនាដេរីវេ $f'(x)$ រួចសិក្សាអថេរភាពនៃ $f$ ។","អតិបរមា $f("+fm+")="+ym+"$ , អប្បបរមា $f("+fp+")="+yp+"$",
       W(AL(["f'(x)&=1-\\dfrac{"+m*m+"}{("+xd+")^2}=\\dfrac{("+xd+")^2-"+m*m+"}{("+xd+")^2}","&=\\dfrac{("+tx(fm)+")("+tx(fp)+")}{("+xd+")^2}"]),"$f'(x)=0\\iff x="+fm+"$ ឬ $x="+fp+"$ ៖",
         VT(["-\\infty",String(fm),String(d),String(fp),"+\\infty"],["","+","0","-","\\|","-","0","+",""],["-\\infty",UP,String(ym),DN,"\\|",DN,String(yp),UP,"+\\infty"]),
         AL(["f("+fm+")&="+fm+sg(b)+"+\\dfrac{"+m*m+"}{"+(-m)+"}="+ym,"f("+fp+")&="+fp+sg(b)+"+\\dfrac{"+m*m+"}{"+m+"}="+yp]))),
     Q("រកអាស៊ីមតូតទាំងអស់ រួចសង់ក្រាប $(C)$ ។","អាស៊ីមតូតឈរ $x="+d+"$ , អាស៊ីមតូតទ្រេត $y=x"+sg(b)+"$",
       W("អាស៊ីមតូតឈរ $x="+d+"$ (លីមីតអនន្តត្រង់ $"+d+"$) ។ ដោយ $f(x)-(x"+sg(b)+")=\\dfrac{"+m*m+"}{"+xd+"}\\to0$ ⇒ អាស៊ីមតូតទ្រេត $y=x"+sg(b)+"$ ។","សង់ក្រាប (មើលរូបខាងលើ) ។"))]}}},
 {id:"ineq",t:"ដោះស្រាយវិសមីការ (តារាងសញ្ញា)",lv:2,f:function(){
   var r=[nz(-5,5),nz(-5,5),nz(-5,5)];while(r[0]===r[1]||r[1]===r[2]||r[0]===r[2])r=[nz(-5,5),nz(-5,5),nz(-5,5)];
   var a=r[0],b=r[1],c=r[2],s=[a,b,c].sort(function(x,y){return x-y});
   var sign=function(x){return(x-a)*(x-b)/(x-c)};var parts=[],pts=[-1e9].concat(s,[1e9]);
   for(var i=0;i<4;i++){var mid=i===0?s[0]-1:i===3?s[2]+1:(pts[i]+pts[i+1])/2;if(sign(mid)>0){var L=i===0?"-\\infty":pts[i],U=i===3?"+\\infty":pts[i+1];parts.push((i===0?"(":(pts[i]===c?"(":"["))+L+";"+U+(i===3?")":(pts[i+1]===c?")":"]")))}}
   var tx=function(v){return"x"+(v<0?"+"+(-v):"-"+v)};
   var mids=[s[0]-1,(s[0]+s[1])/2,(s[1]+s[2])/2,s[2]+1],row=function(f,at){var o=[""];for(var i=0;i<4;i++){o.push(sgc(f(mids[i])));if(i<3)o.push(at(s[i]))}o.push("");return o.slice(1,-1).length?o:o};
   var fr=function(v){return row(function(x){return x-v},function(p){return p===v?"0":sgc(p-v)})};
   var qr=row(sign,function(p){return p===c?"\\|":"0"});
   return{inst:"ដោះស្រាយវិសមីការខាងក្រោម ដោយប្រើតារាងសញ្ញា៖",it:[
     Q("$\\dfrac{("+tx(a)+")("+tx(b)+")}{"+tx(c)+"}\\ge0$","$x\\in"+parts.join("\\cup")+"$",
       W("លក្ខខណ្ឌ ៖ $x\\ne"+c+"$ ។ ឫសភាគយក $x="+a+"$ , $x="+b+"$ ។ តារាងសញ្ញា ៖",STB(["-\\infty"].concat(s.map(String),["+\\infty"]),[[tx(a),fr(a)],[tx(b),fr(b)],[tx(c),fr(c)],["\\text{ផលធៀប}".replace("\\text{ផលធៀប}","Q(x)"),qr]]),
         "ដូចនេះ $x\\in"+parts.join("\\cup")+"$ (យកចំណុចដែល $Q(x)\\ge0$ · មិនយក $x="+c+"$)"))]}}}
];
/* ===================== ថ្នាក់ទី១២ · លំហាត់ទម្រង់បាក់ឌុប ===================== */
function nCr(n,r){if(r<0||r>n)return 0;var v=1;for(var i=1;i<=r;i++)v=v*(n-r+i)/i;return Math.round(v)}
var CTX=[["ក្នុងកន្ត្រកមួយមានស្វាយ","ស្វាយរសជាតិផ្អែម","ស្វាយរសជាតិជូរ","ផ្លែ","កន្ត្រក"],["ក្នុងប្រអប់មួយមានឃ្លី","ឃ្លីពណ៌ក្រហម","ឃ្លីពណ៌ខៀវ","គ្រាប់","ប្រអប់"],["ក្នុងថង់មួយមានប៊ិច","ប៊ិចខៀវ","ប៊ិចក្រហម","ដើម","ថង់"]];
var PROB=[{id:"draw",t:"ប្រូបាប · ចាប់យកព្រមគ្នា",lv:2,f:function(){
  var c=pick(CTX),a=ri(8,15),b=ri(3,6),N=a+b,k=ri(5,Math.min(10,a)),T=nCr(N,3),pA=nCr(a,1)*nCr(b,2),pB=nCr(b,2)*nCr(a,1)+nCr(b,3);
  var fr=function(n,d){return"\\dfrac{"+n+"}{"+d+"}"+(gcd(n,d)===1?"":"="+F(n,d))};
  return{inst:c[0]+"សរុប $"+N+"$ "+c[3]+" ក្នុងនោះមាន"+c[1]+" $"+a+"$ "+c[3]+" និង"+c[2]+" $"+b+"$ "+c[3]+"។ គេចាប់យក $3$ "+c[3]+"ព្រមគ្នាដោយចៃដន្យ។",it:[
    Q("រកប្រូបាបនៃព្រឹត្តិការណ៍ $A$៖ «មាន"+c[1]+"តែមួយគត់»","$P(A)="+F(pA,T)+"$",
      W("ចំនួនករណីអាច ៖ $n(S)=C_{"+N+"}^{3}=\\dfrac{"+N+"\\times"+(N-1)+"\\times"+(N-2)+"}{3\\times2\\times1}="+T+"$","ព្រឹត្តិការណ៍ $A$ ៖ យក"+c[1]+" $1$ និង"+c[2]+" $2$ ៖",
        AL(["n(A)&=C_{"+a+"}^{1}\\times C_{"+b+"}^{2}="+a+"\\times"+nCr(b,2)+"="+pA,"P(A)&=\\dfrac{n(A)}{n(S)}="+fr(pA,T)]))),
    Q("រកប្រូបាបនៃព្រឹត្តិការណ៍ $B$៖ «មាន"+c[2]+"យ៉ាងតិចពីរ»","$P(B)="+F(pB,T)+"$",
      W("«យ៉ាងតិចពីរ» = មាន"+c[2]+" $2$ (និង"+c[1]+" $1$) ឬ មាន"+c[2]+"ទាំង $3$ ៖",AL(["n(B)&=C_{"+b+"}^{2}\\times C_{"+a+"}^{1}+C_{"+b+"}^{3}","&="+nCr(b,2)+"\\times"+a+"+"+nCr(b,3)+"="+pB,"P(B)&=\\dfrac{"+pB+"}{"+T+"}"+(gcd(pB,T)===1?"":"="+F(pB,T))]))),
    Q("អ្នកលូកយកពី"+c[4]+"ចង់ប្រាកដថាបាន"+c[1]+"យ៉ាងតិច $"+k+"$ "+c[3]+"។ តើត្រូវលូកយកយ៉ាងតិចប៉ុន្មាន"+c[3]+"?","$"+(b+k)+"$ "+c[3],
      "ករណីអាក្រក់បំផុត ៖ លូកបាន"+c[2]+"ទាំង $"+b+"$ "+c[3]+"មុន ។ បន្ទាប់មកត្រូវលូកថែម $"+k+"$ "+c[3]+"ទៀត ទើបប្រាកដថាបាន"+c[1]+" $"+k+"$ "+c[3]+" ។\nដូចនេះ ត្រូវលូកយកយ៉ាងតិច $"+b+"+"+k+"="+(b+k)+"$ "+c[3]+" ។")]}}}];
var LIM=[{id:"lim",t:"លីមីត (ln · ត្រីកោណមាត្រ · កំណត់ a, b)",lv:2,f:function(){
  var c=nz(1,4),k=pick([1,2,3,1]),p=nz(-3,3),m=ri(2,5),n=ri(2,5),r=nz(-2,2),L=nz(-5,5),a=L-2*r,b=-r*r-a*r,mn=F(m,n),mh=F(m,2);
  var B=pick([
    ["\\lim\\limits_{x\\to0}\\dfrac{1-\\cos "+m+"x}{x^2}",F(m*m,2),AL(["B&=\\lim\\limits_{x\\to0}\\dfrac{2\\sin^2\\dfrac{"+m+"x}{2}}{x^2}","&=\\lim\\limits_{x\\to0}2\\left("+mh+"\\right)^2\\left(\\dfrac{\\sin\\frac{"+m+"x}{2}}{\\frac{"+m+"x}{2}}\\right)^2","&=2\\times"+F(m*m,4)+"\\times1^2="+F(m*m,2)])],
    ["\\lim\\limits_{x\\to0}\\dfrac{\\sin "+m+"x}{"+n+"x}",mn,AL(["B&=\\lim\\limits_{x\\to0}"+mn+"\\times\\dfrac{\\sin "+m+"x}{"+m+"x}="+mn+"\\times1="+mn])],
    ["\\lim\\limits_{x\\to0}\\dfrac{e^{"+m+"x}-1}{"+n+"x}",mn,AL(["B&=\\lim\\limits_{x\\to0}"+mn+"\\times\\dfrac{e^{"+m+"x}-1}{"+m+"x}="+mn+"\\times1="+mn])],
    ["\\lim\\limits_{x\\to0}\\dfrac{\\ln(1+"+m+"x)}{"+n+"x}",mn,AL(["B&=\\lim\\limits_{x\\to0}"+mn+"\\times\\dfrac{\\ln(1+"+m+"x)}{"+m+"x}="+mn+"\\times1="+mn])]]);
  var kx1=(k===1?"":k)+"x"+sg(p),Aq="\\lim\\limits_{x\\to+\\infty}\\left["+c+"-\\ln\\left(\\dfrac{"+kx1+"}{x}\\right)\\right]";
  return{inst:"",it:[
    Q("គណនាលីមីត $A="+Aq+"$ និង $B="+B[0]+"$ ។","$A="+(k===1?c:c+"-\\ln "+k)+"$ , $B="+B[1]+"$",
      W(AL(["\\lim\\limits_{x\\to+\\infty}\\dfrac{"+kx1+"}{x}&=\\lim\\limits_{x\\to+\\infty}\\left("+k+sg(p).replace(/(\d+)$/,"\\dfrac{$1}{x}")+"\\right)="+k,"A&="+c+"-\\ln "+k+(k===1?"="+c:"")]),"ប្រើលីមីតគោល ៖",B[2])),
    Q("រកចំនួនពិត $a$ និង $b$ ដែលផ្ទៀងផ្ទាត់ $\\lim\\limits_{x\\to"+r+"}\\dfrac{x^2+ax+b}{x"+sg(-r)+"}="+L+"$ ។","$a="+a+"$ , $b="+b+"$",
      W("ដោយភាគបែង $\\to0$ ពេល $x\\to"+r+"$ ហើយលីមីតជាចំនួនកំណត់ នោះភាគយកត្រូវស្មើ $0$ ត្រង់ $x="+r+"$ ៖",AL([pn(r)+"^2+"+pn(r)+"a+b&=0\\Rightarrow b=-"+r*r+tm(-r,"a")]),
        "ពេលនោះ $x^2+ax+b=(x"+sg(-r)+")(x"+sg(r)+"+a)$ ៖",AL(["\\lim\\limits_{x\\to"+r+"}(x"+sg(r)+"+a)&="+2*r+"+a="+L,"a&="+a,"b&=-"+r*r+sg(-r)+"\\times"+pn(a)+"="+b])))]}}}];
var INT=[{id:"int4",t:"គណនាអាំងតេក្រាល (៤ សំណួរ)",lv:2,f:function(){
  var a=ri(2,6),b=ri(1,3),sgn=pick([1,-1]),kk=pick([[1,"2(\\sqrt{2}-1)"],[3,"2(2-\\sqrt{3})"],[8,"2(3-2\\sqrt{2})"]]),pm=pick([1,-1]),bb=b===1?"":b,s=sgn<0?"-":"+",so=sgn<0?"+":"-";
  return{inst:"គណនាអាំងតេក្រាលខាងក្រោម៖",it:[
    Q("$\\displaystyle\\int_1^2\\left(\\dfrac{"+a+"}{x^2}-\\dfrac{"+2*b+"x}{x^2+1}\\right)dx$","$"+F(a,2)+"-"+bb+"\\ln\\dfrac{5}{2}$",
      W("ប្រើ $\\displaystyle\\int\\dfrac{dx}{x^2}=-\\dfrac1x$ និង $\\displaystyle\\int\\dfrac{2x}{x^2+1}dx=\\ln(x^2+1)$ ៖",AL(["I&=\\left[-\\dfrac{"+a+"}{x}-"+bb+"\\ln(x^2+1)\\right]_1^2","&=\\left(-"+F(a,2)+"-"+bb+"\\ln5\\right)-\\left(-"+a+"-"+bb+"\\ln2\\right)","&="+F(a,2)+"-"+bb+"\\ln\\dfrac52"]))),
    Q("$\\displaystyle\\int_0^{\\frac{\\pi}{4}}(\\sin x"+s+"\\cos x)^2dx$","$\\dfrac{\\pi}{4}"+s+"\\dfrac{1}{2}$",
      W("ដោយ $(\\sin x"+s+"\\cos x)^2=\\sin^2x+\\cos^2x"+s+"2\\sin x\\cos x=1"+s+"\\sin2x$ ៖",AL(["J&=\\int_0^{\\frac{\\pi}{4}}(1"+s+"\\sin2x)dx=\\left[x"+so+"\\dfrac{\\cos2x}{2}\\right]_0^{\\frac{\\pi}{4}}","&=\\left(\\dfrac{\\pi}{4}"+so+"0\\right)-\\left(0"+so+"\\dfrac12\\right)=\\dfrac{\\pi}{4}"+s+"\\dfrac12"]))),
    Q("$\\displaystyle\\int_1^e\\dfrac{1}{x\\sqrt{"+kk[0]+"+\\ln x}}dx$","$"+kk[1]+"$",
      W("តាង $u="+kk[0]+"+\\ln x$ នោះ $u'=\\dfrac1x$ ហើយ $\\displaystyle\\int\\dfrac{u'}{\\sqrt u}dx=2\\sqrt u$ ៖",AL(["K&=\\left[2\\sqrt{"+kk[0]+"+\\ln x}\\right]_1^e=2\\sqrt{"+(kk[0]+1)+"}-2\\sqrt{"+kk[0]+"}","&="+kk[1]]))),
    Q("$\\displaystyle\\int_0^1\\sqrt{e^{2x}"+(pm<0?"-":"+")+"2+e^{-2x}}\\,dx$",pm>0?"$e-\\dfrac{1}{e}$":"$e+\\dfrac{1}{e}-2$",
      pm>0?W("ដោយ $e^{2x}+2+e^{-2x}=(e^x+e^{-x})^2$ និង $e^x+e^{-x}>0$ ៖",AL(["L&=\\int_0^1(e^x+e^{-x})dx=\\left[e^x-e^{-x}\\right]_0^1","&=\\left(e-\\dfrac1e\\right)-(1-1)=e-\\dfrac1e"]))
        :W("ដោយ $e^{2x}-2+e^{-2x}=(e^x-e^{-x})^2$ និង $e^x-e^{-x}\\ge0$ លើ $[0,1]$ ៖",AL(["L&=\\int_0^1(e^x-e^{-x})dx=\\left[e^x+e^{-x}\\right]_0^1","&=\\left(e+\\dfrac1e\\right)-(1+1)=e+\\dfrac1e-2"])))]}}}];
var ODE=[{id:"ode2",t:"សមីការឌីផេរ៉ង់ស្យែលលំដាប់ទី២",lv:2,f:function(){
  var r1=ri(1,4),r2=-ri(1,4),s=r1+r2,p=r1*r2,M=ri(2,6);
  var al=F(-M*r2,r1-r2),be=F(M*r1,r1-r2),ex=function(r){return r===1?"x":r===-1?"-x":r+"x"};
  var cs=function(v){return v?(v>0?"-":"+")+(Math.abs(v)===1?"":Math.abs(v)):""},eq="y''"+(s?cs(s)+"y'":"")+(p<0?"-"+(-p):"+"+p)+"y=0",ch="r^2"+(s?cs(s)+"r":"")+(p<0?"-"+(-p):"+"+p)+"=0";
  return{inst:"គេមានសមីការឌីផេរ៉ង់ស្យែល $(E)\\colon "+eq+"$ ។",it:[
    Q("បង្ហាញថាចំពោះគ្រប់ចំនួនពិត $x$ អនុគមន៍ $f(x)=\\alpha e^{"+ex(r2)+"}+\\beta e^{"+ex(r1)+"}$ ($\\alpha,\\beta\\in\\mathbb R$) ជាចម្លើយមួយនៃ $(E)$ ។","សមីការសម្គាល់ $"+ch+"$ មានឫស $r_1="+r2+"$ , $r_2="+r1+"$",
      W("សមីការសម្គាល់នៃ $(E)$ ៖",AL([ch.replace("=0","&=0"),"(r"+sg(-r2)+")(r"+sg(-r1)+")&=0"]),"មានឫសពីរផ្សេងគ្នា $r_1="+r2+"$ និង $r_2="+r1+"$ ។ ចម្លើយទូទៅនៃ $(E)$ គឺ $y=\\alpha e^{"+ex(r2)+"}+\\beta e^{"+ex(r1)+"}$ ។","ដូចនេះ $f(x)=\\alpha e^{"+ex(r2)+"}+\\beta e^{"+ex(r1)+"}$ ជាចម្លើយនៃ $(E)$ គ្រប់ $\\alpha,\\beta\\in\\mathbb R$ ។")),
    Q("កំណត់ចម្លើយពិសេសមួយនៃ $(E)$ បើក្រាបតាងអនុគមន៍ចម្លើយនោះមានតម្លៃអប្បបរមាស្មើ $"+M+"$ ត្រង់ $x=0$ ។","$f(x)="+be+"e^{"+ex(r2)+"}+"+al+"e^{"+ex(r1)+"}$",
      W("$f$ មានអប្បបរមា $"+M+"$ ត្រង់ $x=0$ ⇒ $f(0)="+M+"$ និង $f'(0)=0$ ។ ដោយ $f'(x)="+r2+"\\alpha e^{"+ex(r2)+"}+"+(r1===1?"":r1)+"\\beta e^{"+ex(r1)+"}$ ៖",
        "$$\\begin{cases}\\alpha+\\beta="+M+"\\\\"+r2+"\\alpha+"+(r1===1?"":r1)+"\\beta=0\\end{cases}$$",AL(["\\alpha&="+(gcd(M*r1,r1-r2)===1?"":"\\dfrac{"+M*r1+"}{"+(r1-r2)+"}=")+be,"\\beta&="+M+"-\\alpha="+al])))]}}}];
var ELL=[{id:"ell",t:"អេលីប · ទម្រង់ស្តង់ដា",lv:2,f:function(){
  var h=nz(-3,3),k=nz(-3,3),A=pick([4,9,16,25]),Bq=pick([1,4,9].filter(function(v){return v!==A})),hor=A>Bq;
  var c2=Math.abs(A-Bq),a=Math.sqrt(Math.max(A,Bq)),b=Math.sqrt(Math.min(A,Bq)),cT=sqrtT(c2),ci=Math.sqrt(c2)%1===0?Math.sqrt(c2):0;
  var X2=Bq,Y2=A,X1=-2*h*Bq,Y1=-2*k*A,C0=Bq*h*h+A*k*k-A*Bq,g=gcd(gcd(gcd(X2,Y2),gcd(X1,Y1)),C0);
  var tm2=function(v,s){return v?(v<0?"-":"+")+(Math.abs(v)===1?"":Math.abs(v))+s:""};
  var E=(X2/g===1?"":X2/g)+"x^2"+tm2(Y2/g,"y^2")+tm2(X1/g,"x")+tm2(Y1/g,"y")+(C0/g?(C0/g<0?"":"+")+C0/g:"")+"=0";
  var sx=function(v){return v<0?"x+"+(-v):"x-"+v},sy=function(v){return v<0?"y+"+(-v):"y-"+v};
  var V=hor?"("+(h-a)+","+k+")$ , $("+(h+a)+","+k+")":"("+h+","+(k-a)+")$ , $("+h+","+(k+a)+")";
  var Fo=ci?(hor?"("+(h-ci)+","+k+")$ , $("+(h+ci)+","+k+")":"("+h+","+(k-ci)+")$ , $("+h+","+(k+ci)+")"):hor?"("+h+"-"+cT+","+k+")$ , $("+h+"+"+cT+","+k+")":"("+h+","+k+"-"+cT+")$ , $("+h+","+k+"+"+cT+")";
  var cn=Math.sqrt(c2),fp=hor?{F:[h-cn,k],G:[h+cn,k],V:[h-a,k],U:[h+a,k]}:{F:[h,k-cn],G:[h,k+cn],V:[h,k-a],U:[h,k+a]};
  return{kfig:FG({I:[h,k],F:fp.F,"F'":fp.G},["("+sx(h)+")^2/"+A+"+("+sy(k)+")^2/"+Bq+"=1 blue"],{axes:1,ext:[[h-Math.sqrt(A),k-Math.sqrt(Bq)],[h+Math.sqrt(A),k+Math.sqrt(Bq)]]}),
    inst:"គេមានសមីការអេលីប $(E)\\colon "+E+"$ ។",it:[
    Q("ចូរសរសេរសមីការ $(E)$ ទៅជាទម្រង់ស្តង់ដា ។","$\\dfrac{("+sx(h)+")^2}{"+A+"}+\\dfrac{("+sy(k)+")^2}{"+Bq+"}=1$",
      W(g>1?"គុណអង្គទាំងពីរនឹង $"+g+"$ រួចបំពេញការេ ៖":"បំពេញការេ ៖",AL([X2+"(x^2"+tm2(-2*h,"x")+")+"+Y2+"(y^2"+tm2(-2*k,"y")+")&="+(-C0),X2+"("+sx(h)+")^2-"+X2*h*h+"+"+Y2+"("+sy(k)+")^2-"+Y2*k*k+"&="+(-C0),X2+"("+sx(h)+")^2+"+Y2+"("+sy(k)+")^2&="+A*Bq]),
        "ចែកអង្គទាំងពីរនឹង $"+A*Bq+"$ ៖ $\\dfrac{("+sx(h)+")^2}{"+A+"}+\\dfrac{("+sy(k)+")^2}{"+Bq+"}=1$")),
    Q("កំណត់ផ្ចិត កំពូល កំណុំ ប្រវែងអ័ក្សតូច និងអ័ក្សធំ រួចសង់អេលីប ។","ផ្ចិត $("+h+","+k+")$ , កំពូល $"+V+"$ , កំណុំ $"+Fo+"$ , អ័ក្សធំ $"+2*a+"$ , អ័ក្សតូច $"+2*b+"$",
      W("ផ្ចិត $I("+h+","+k+")$ ។ ដោយ $"+Math.max(A,Bq)+">"+Math.min(A,Bq)+"$ អ័ក្សធំស្រប"+(hor?"អ័ក្សអាប់ស៊ីស":"អ័ក្សអ័រដោនេ")+" ៖",AL(["a^2&="+Math.max(A,Bq)+"\\Rightarrow a="+a+"\\ ,\\ b^2="+Math.min(A,Bq)+"\\Rightarrow b="+b,"c^2&=a^2-b^2="+Math.max(A,Bq)+"-"+Math.min(A,Bq)+"="+c2+"\\Rightarrow c="+cT]),
        "កំពូលលើអ័ក្សធំ ៖ $"+V+"$","កំណុំ ៖ $"+Fo+"$","ប្រវែងអ័ក្សធំ $2a="+2*a+"$ និងអ័ក្សតូច $2b="+2*b+"$"))]}}}];
var VEC=[{id:"vec3",t:"វ៉ិចទ័រក្នុងលំហ · ប្លង់ · ស្របគ្នា",lv:2,f:function(){
  var A,B,C,u,v,n;do{A=[ri(-2,3),ri(-2,3),ri(-2,3)];B=[ri(-2,3),ri(-2,3),ri(-2,3)];C=[ri(-2,3),ri(-2,3),ri(-2,3)];u=[B[0]-A[0],B[1]-A[1],B[2]-A[2]];v=[C[0]-A[0],C[1]-A[1],C[2]-A[2]];n=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]]}while(!n[0]&&!n[1]&&!n[2]);
  var nn=n[0]*n[0]+n[1]*n[1]+n[2]*n[2],g=gcd(gcd(n[0],n[1]),n[2]),m=n.map(function(x){return x/g}),d=-(m[0]*A[0]+m[1]*A[1]+m[2]*A[2]);
  var tm3=function(v,s,f){return v?(v<0?"-":f?"":"+")+(Math.abs(v)===1?"":Math.abs(v))+s:""},pt=function(P){return"("+P.join(",")+")"};
  var pl3=tm3(m[0],"x",1);pl3+=tm3(m[1],"y",!pl3);pl3+=tm3(m[2],"z",!pl3);pl3+=(d?(d<0?d:"+"+d):"")+"=0";
  var area=S(1,2,nn),par=["x","y","z"].map(function(w,i){var q=u[i]?(u[i]<0?"-":"+")+(Math.abs(u[i])===1?"":Math.abs(u[i]))+"t":"";return w+"="+(C[i]?C[i]+q:(q.replace(/^\+/,"")||"0"))}).join(" , ");
  var cr=function(a,b,c,d){return"("+pn(a)+"\\times"+pn(b)+"-"+pn(c)+"\\times"+pn(d)+")"};
  return{inst:"ក្នុងតម្រុយអរតូណរម៉ាល់មានទិសដៅវិជ្ជមាន $(O,\\vec i,\\vec j,\\vec k)$ គេមានចំណុច $A"+pt(A)+"$ ; $B"+pt(B)+"$ ; $C"+pt(C)+"$ និង $D(x,y,z)$ ។",it:[
    Q("គណនា $\\vec n=\\overrightarrow{AB}\\times\\overrightarrow{AC}$ រួចគណនាផ្ទៃក្រឡានៃត្រីកោណ $ABC$ ។","$\\vec n="+pt(n)+"$ , $S_{ABC}="+St(area)+"$",
      W("$\\overrightarrow{AB}="+pt(u)+"$ និង $\\overrightarrow{AC}="+pt(v)+"$ ៖",AL(["\\vec n&="+cr(u[1],v[2],u[2],v[1])+"\\vec i","&\\quad-"+cr(u[0],v[2],u[2],v[0])+"\\vec j","&\\quad+"+cr(u[0],v[1],u[1],v[0])+"\\vec k","&="+pt(n)]),
        AL(["S_{ABC}&=\\dfrac12\\left\\|\\vec n\\right\\|=\\dfrac12\\sqrt{"+pn(n[0])+"^2+"+pn(n[1])+"^2+"+pn(n[2])+"^2}","&=\\dfrac12\\sqrt{"+nn+"}="+St(area)]))),
    Q("សរសេរសមីការប្លង់ $(ABC)$ ។","$"+pl3+"$",
      W("ប្លង់ $(ABC)$ កាត់តាម $A"+pt(A)+"$ និងមានវ៉ិចទ័រណរម៉ាល់ $"+(g>1?"\\dfrac{1}{"+g+"}\\vec n=":"\\vec n=")+pt(m)+"$ ៖",AL([pn(m[0])+"(x-"+pn(A[0])+")+"+pn(m[1])+"(y-"+pn(A[1])+")+"+pn(m[2])+"(z-"+pn(A[2])+")&=0",pl3.replace("=0","&=0")]))),
    Q("រកទំនាក់ទំនងរវាង $x,y$ និង $z$ ដើម្បីឱ្យវ៉ិចទ័រ $\\overrightarrow{AB}$ និង $\\overrightarrow{CD}$ កូលីនេអ៊ែគ្នា។ តើសំណុំចំណុច $D$ ជាអ្វី?","$"+par+"$ ($t\\in\\mathbb R$) ជាបន្ទាត់កាត់តាម $C$ ស្របនឹង $(AB)$",
      W("$\\overrightarrow{CD}=(x-"+pn(C[0])+",y-"+pn(C[1])+",z-"+pn(C[2])+")$ ។ $\\overrightarrow{AB}$ និង $\\overrightarrow{CD}$ កូលីនេអ៊ែ លុះត្រាតែមាន $t\\in\\mathbb R$ ដែល $\\overrightarrow{CD}=t\\overrightarrow{AB}$ ៖",AL(par.split(" , ").map(function(x){return x.replace("=","&=")})),"ដូចនេះ សំណុំចំណុច $D$ ជាបន្ទាត់កាត់តាម $C$ ហើយស្របនឹង $(AB)$ ។"))]}}}];
/* ===================== ថ្នាក់ទី១២ · តាមសៀវភៅ «វិញ្ញាសាត្រៀមប្រឡងបាក់ឌុប ២០២៥» (២៣ វិញ្ញាសា) ===================== */
function co(v,s,first){if(!v)return"";var a=Math.abs(v);return(v<0?"-":first?"":"+")+(a===1&&s?"":a)+s}
function poly(t){var o="";t.forEach(function(x){o+=co(x[0],x[1],!o)});return o||"0"}
function xm(v,x){x=x||"x";return v?"("+x+sg(-v)+")":x}
function cf(s){return s==="1"?"":s==="-1"?"-":s}
function at(s){return/^-/.test(s)?s:"+"+s}
function ex(r){return r===1?"x":r===-1?"-x":r+"x"}
function lm(to,e){return"\\lim\\limits_{x\\to"+to+"}"+e}
var LA=[
 function(){var a=ri(1,4),x3=a*a*a,x2=a*a;return[lm(a,"\\dfrac{x^3-"+x3+"}{x^2-"+x2+"}"),F(3*a,2),["\\lim\\limits_{x\\to"+a+"}\\dfrac{(x-"+a+")(x^2+"+kx(a)+"+"+x2+")}{(x-"+a+")(x+"+a+")}","=\\lim\\limits_{x\\to"+a+"}\\dfrac{x^2+"+kx(a)+"+"+x2+"}{x+"+a+"}=\\dfrac{"+3*x2+"}{"+2*a+"}="+F(3*a,2)]]},
 function(){var a=nz(-3,4),b=nz(-3,4);while(b===a)b=nz(-3,4);return[lm(a,"\\dfrac{"+poly([[1,"x^2"],[-(a+b),"x"],[a*b,""]])+"}{x"+sg(-a)+"}"),String(a-b),["\\lim\\limits_{x\\to"+a+"}\\dfrac{(x"+sg(-a)+")(x"+sg(-b)+")}{x"+sg(-a)+"}","=\\lim\\limits_{x\\to"+a+"}(x"+sg(-b)+")="+a+sg(-b)+"="+(a-b)]]},
 function(){var d=pick([2,3]),c=ri(1,5),x0=d*d-c;return[lm(x0,"\\dfrac{\\sqrt{x"+sg(c)+"}-"+d+"}{x"+sg(-x0)+"}"),F(1,2*d),["\\lim\\limits_{x\\to"+x0+"}\\dfrac{(x"+sg(c)+")-"+d*d+"}{(x"+sg(-x0)+")(\\sqrt{x"+sg(c)+"}+"+d+")}","=\\lim\\limits_{x\\to"+x0+"}\\dfrac{1}{\\sqrt{x"+sg(c)+"}+"+d+"}=\\dfrac{1}{"+d+"+"+d+"}="+F(1,2*d)]]},
 function(){var m=ri(1,4);return[lm("+\\infty","\\left(\\sqrt{x^2+"+2*m+"x}-x\\right)"),String(m),["\\lim\\limits_{x\\to+\\infty}\\dfrac{(x^2+"+2*m+"x)-x^2}{\\sqrt{x^2+"+2*m+"x}+x}=\\lim\\limits_{x\\to+\\infty}\\dfrac{"+2*m+"x}{x\\left(\\sqrt{1+\\frac{"+2*m+"}{x}}+1\\right)}","=\\dfrac{"+2*m+"}{1+1}="+m]]},
 function(){var a=nz(-5,6),b=nz(-4,4),c=ri(1,5),d=ri(1,4),e=nz(-6,6);return[lm("+\\infty","\\dfrac{"+poly([[a,"x^2"],[b,"x"],[c,""]])+"}{"+poly([[d,"x^2"],[e,""]])+"}"),F(a,d),["\\lim\\limits_{x\\to+\\infty}\\dfrac{x^2\\left("+a+"+\\frac{"+b+"}{x}+\\frac{"+c+"}{x^2}\\right)}{x^2\\left("+d+"+\\frac{"+e+"}{x^2}\\right)}","=\\dfrac{"+a+"}{"+d+"}"+(gcd(a,d)===1?"":"="+F(a,d))]]}];
var LT=[
 function(){var m=ri(1,5),n=ri(1,5),q=F(m,n);return[lm(0,"\\dfrac{e^{"+kx(m)+"}-1}{\\sin "+kx(n)+"}"),q,["\\lim\\limits_{x\\to0}\\dfrac{e^{"+kx(m)+"}-1}{"+kx(m)+"}\\times\\dfrac{"+kx(n)+"}{\\sin "+kx(n)+"}\\times\\dfrac{"+m+"}{"+n+"}","=1\\times1\\times\\dfrac{"+m+"}{"+n+"}="+q]]},
 function(){var m=ri(2,5);return[lm(0,"\\dfrac{1-\\cos "+kx(m)+"}{x^2}"),F(m*m,2),["\\lim\\limits_{x\\to0}\\dfrac{2\\sin^2\\frac{"+m+"x}{2}}{x^2}=\\lim\\limits_{x\\to0}2\\times"+F(m*m,4)+"\\left(\\dfrac{\\sin\\frac{"+m+"x}{2}}{\\frac{"+m+"x}{2}}\\right)^2","="+F(m*m,2)]]},
 function(){var m=ri(1,5),n=ri(1,5),q=F(m,n);return[lm(0,"\\dfrac{\\sin "+kx(m)+"}{\\tan "+kx(n)+"}"),q,["\\lim\\limits_{x\\to0}\\dfrac{\\sin "+kx(m)+"}{"+kx(m)+"}\\times\\dfrac{"+kx(n)+"}{\\tan "+kx(n)+"}\\times\\dfrac{"+m+"}{"+n+"}","="+q]]},
 function(){var m=ri(1,5),n=ri(1,5),q=F(m,n);return[lm(0,"\\dfrac{\\ln(1+"+kx(m)+")}{"+kx(n)+"}"),q,["\\lim\\limits_{x\\to0}\\dfrac{\\ln(1+"+kx(m)+")}{"+kx(m)+"}\\times\\dfrac{"+m+"}{"+n+"}","=1\\times\\dfrac{"+m+"}{"+n+"}="+q]]},
 function(){var m=ri(1,5);return[lm(0,"\\dfrac{\\sqrt{1+"+kx(m)+"}-1}{x}"),F(m,2),["\\lim\\limits_{x\\to0}\\dfrac{(1+"+kx(m)+")-1}{x\\left(\\sqrt{1+"+kx(m)+"}+1\\right)}=\\lim\\limits_{x\\to0}\\dfrac{"+m+"}{\\sqrt{1+"+kx(m)+"}+1}","="+F(m,2)]]},
 function(){var m=ri(1,3),n=ri(1,3);return[lm(0,"\\dfrac{\\sqrt{1+"+kx(m)+"}-\\sqrt{1-"+kx(m)+"}}{"+kx(n)+"}"),F(m,n),["\\lim\\limits_{x\\to0}\\dfrac{(1+"+kx(m)+")-(1-"+kx(m)+")}{"+kx(n)+"\\left(\\sqrt{1+"+kx(m)+"}+\\sqrt{1-"+kx(m)+"}\\right)}","=\\lim\\limits_{x\\to0}\\dfrac{"+2*m+"}{"+n+"\\left(\\sqrt{1+"+kx(m)+"}+\\sqrt{1-"+kx(m)+"}\\right)}=\\dfrac{"+2*m+"}{"+2*n+"}="+F(m,n)]]},
 function(){var m=ri(1,4);return[lm(0,"\\dfrac{e^{x^2}-\\cos "+kx(m)+"}{x^2}"),F(2+m*m,2),["\\lim\\limits_{x\\to0}\\left(\\dfrac{e^{x^2}-1}{x^2}+\\dfrac{1-\\cos "+kx(m)+"}{x^2}\\right)","=1+"+F(m*m,2)+"="+F(2+m*m,2)]]},
 function(){return[lm(0,"\\dfrac{\\tan x-\\sin x}{x^3}"),"\\dfrac{1}{2}",["\\lim\\limits_{x\\to0}\\dfrac{\\tan x(1-\\cos x)}{x^3}=\\lim\\limits_{x\\to0}\\dfrac{\\tan x}{x}\\times\\dfrac{1-\\cos x}{x^2}","=1\\times\\dfrac12=\\dfrac12"]]},
 function(){var m=ri(1,4);return[lm("+\\infty","x\\ln\\left(1+\\dfrac{"+m+"}{x}\\right)"),String(m),["#តាង $t=\\dfrac{"+m+"}{x}$ ពេល $x\\to+\\infty$ នោះ $t\\to0$ ៖","\\lim\\limits_{t\\to0}"+m+"\\times\\dfrac{\\ln(1+t)}{t}="+m+"\\times1="+m]]}];
function shuf(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=ri(0,i),t=a[i];a[i]=a[j];a[j]=t}return a}
function lim3(){var t=shuf(LT);return[pick(LA)(),t[0](),t[1]()]}
var IP=[
 function(){var a=nz(-3,4),b=nz(-4,4),c=nz(-5,5);return["\\int_0^1\\left("+poly([[a,"x^2"],[b,"x"],[c,""]])+"\\right)dx",F(2*a+3*b+6*c,6),["=\\left["+poly([[a,"\\dfrac{x^3}{3}"],[b,"\\dfrac{x^2}{2}"],[c,"x"]])+"\\right]_0^1","="+F(a,3)+"+\\left("+F(b,2)+"\\right)+("+c+")="+F(2*a+3*b+6*c,6)]]},
 function(){var m=ri(1,2),k=ri(1,4);return["\\int_0^"+m+"x\\left(x^2+"+k+"\\right)dx",F(m*m*m*m+2*k*m*m,4),["=\\int_0^"+m+"(x^3+"+kx(k)+")dx=\\left[\\dfrac{x^4}{4}+"+(k===1?"":k)+"\\dfrac{x^2}{2}\\right]_0^"+m,"="+F(m*m*m*m,4)+"+"+F(k*m*m,2)+"="+F(m*m*m*m+2*k*m*m,4)]]},
 function(){var k=ri(1,4);return["\\int_1^e\\dfrac{"+kx(k,"\\ln x")+"}{x}\\,dx",F(k,2),["=\\left["+(k===1?"":k)+"\\dfrac{\\ln^2x}{2}\\right]_1^e\\quad\\left(\\int\\dfrac{\\ln x}{x}dx=\\dfrac{\\ln^2x}{2}\\right)","="+(k===1?"":k+"\\times")+"\\dfrac{1-0}{2}="+F(k,2)]]},
 function(){var a=ri(2,5),c=ri(1,3);return["\\int_0^{\\ln "+a+"}\\dfrac{e^x}{e^x+"+c+"}\\,dx","\\ln "+F(a+c,1+c),["=\\left[\\ln(e^x+"+c+")\\right]_0^{\\ln "+a+"}\\quad\\left(\\int\\dfrac{u'}{u}=\\ln|u|\\right)","=\\ln"+(a+c)+"-\\ln"+(1+c)+"=\\ln "+F(a+c,1+c)]]},
 function(){var a=nz(-3,4),b=nz(-3,4);return["\\int_0^{\\frac{\\pi}{2}}\\left("+poly([[a,"\\sin x"],[b,"\\cos x"]])+"\\right)dx",String(a+b),["=\\left["+poly([[-a,"\\cos x"],[b,"\\sin x"]])+"\\right]_0^{\\frac{\\pi}{2}}","=("+(-a)+"\\times0+"+pn(b)+"\\times1)-("+(-a)+"\\times1+"+pn(b)+"\\times0)="+(a+b)]]},
 function(){return pick([["\\int_0^{\\pi}x\\sin x\\,dx","\\pi",["#ធ្វើអាំងតេក្រាលដោយផ្នែក ៖ $u=x$ , $v'=\\sin x$","=\\left[-x\\cos x\\right]_0^{\\pi}+\\int_0^{\\pi}\\cos x\\,dx=\\pi+\\left[\\sin x\\right]_0^{\\pi}=\\pi"]],
   ["\\int_0^{\\frac{\\pi}{2}}x\\cos x\\,dx","\\dfrac{\\pi}{2}-1",["#ធ្វើអាំងតេក្រាលដោយផ្នែក ៖ $u=x$ , $v'=\\cos x$","=\\left[x\\sin x\\right]_0^{\\frac{\\pi}{2}}-\\int_0^{\\frac{\\pi}{2}}\\sin x\\,dx=\\dfrac{\\pi}{2}+\\left[\\cos x\\right]_0^{\\frac{\\pi}{2}}=\\dfrac{\\pi}{2}-1"]],
   ["\\int_0^1xe^x\\,dx","1",["#ធ្វើអាំងតេក្រាលដោយផ្នែក ៖ $u=x$ , $v'=e^x$","=\\left[xe^x\\right]_0^1-\\int_0^1e^xdx=e-(e-1)=1"]],
   ["\\int_1^e\\ln x\\,dx","1",["#ធ្វើអាំងតេក្រាលដោយផ្នែក ៖ $u=\\ln x$ , $v'=1$","=\\left[x\\ln x\\right]_1^e-\\int_1^e1\\,dx=e-(e-1)=1"]]])},
 function(){var a=ri(1,6),b=nz(-3,3);return["\\int_1^2\\left(\\dfrac{"+a+"}{x^2}"+(b<0?"-":"+")+"\\dfrac{"+Math.abs(b)+"}{x}\\right)dx",F(a,2)+at(cf(String(b))+"\\ln 2"),["=\\left[-\\dfrac{"+a+"}{x}"+(b<0?"-":"+")+(Math.abs(b)===1?"":Math.abs(b))+"\\ln x\\right]_1^2","=\\left(-"+F(a,2)+at(cf(String(b))+"\\ln2")+"\\right)-(-"+a+")="+F(a,2)+at(cf(String(b))+"\\ln 2")]]},
 function(){var k=ri(1,5),n=ri(2,4);return["\\int_0^{\\frac{\\pi}{2}}"+(k===1?"":k)+"\\sin^"+n+"x\\cos x\\,dx",F(k,n+1),["#តាង $u=\\sin x$ ⇒ $u'=\\cos x$ ៖","=\\left["+(k===1?"":k)+"\\dfrac{\\sin^{"+(n+1)+"}x}{"+(n+1)+"}\\right]_0^{\\frac{\\pi}{2}}","="+(k===1?"":k+"\\times")+"\\dfrac{1}{"+(n+1)+"}"+(k===1?"":"="+F(k,n+1))]]},
 function(){var c=ri(2,4),b=pick([1,2,4]);return["\\int_0^"+b+"\\dfrac{"+c+"}{2x+1}\\,dx",cf(F(c,2))+"\\ln "+(2*b+1),["=\\left["+cf(F(c,2))+"\\ln(2x+1)\\right]_0^"+b,"="+cf(F(c,2))+"(\\ln"+(2*b+1)+"-\\ln1)="+cf(F(c,2))+"\\ln "+(2*b+1)]]}];
function int3(){var t=shuf(IP);return[t[0](),t[1](),t[2]()]}
var AB="ABC",IJ="IJK";
function SS(n,e,L){var out=[],cur=[n+"&="+e];L.forEach(function(l){if(l.charAt(0)==="#"){if(cur.length)out.push(AL(cur));out.push(l.slice(1));cur=[]}else cur.push((/^\\text/.test(l)?"&":"&")+l.replace(/^=?/,"="))});if(cur.length)out.push(AL(cur));return out.join("\n")}
function limS(n,x){return SS(n,x[0],x[2])}
function intS(n,x){return SS(n,"\\displaystyle"+x[0],x[2])}
LIM.push({id:"lim3",t:"លីមីត A, B, C (ពិជគណិត · ត្រីកោណមាត្រ · e · ln)",lv:2,f:function(){var L=lim3();
  return{inst:"គណនាលីមីតខាងក្រោម៖",it:L.map(function(x,i){return Q("$"+AB[i]+"="+x[0]+"$","$"+AB[i]+"="+x[1]+"$",limS(AB[i],x))})}}},
 {id:"limint",t:"ក. លីមីត A, B, C · ខ. អាំងតេក្រាល I, J, K (ទម្រង់សៀវភៅ)",lv:2,f:function(){var L=lim3(),I=int3();
  return{inst:"",it:[Q("គណនាលីមីតខាងក្រោម៖ "+L.map(function(x,i){return"$"+AB[i]+"="+x[0]+"$"}).join(" ; "),L.map(function(x,i){return"$"+AB[i]+"="+x[1]+"$"}).join(" , "),W.apply(null,L.map(function(x,i){return limS(AB[i],x)}))),
   Q("គណនាអាំងតេក្រាលខាងក្រោម៖ "+I.map(function(x,i){return"$"+IJ[i]+"=\\displaystyle"+x[0]+"$"}).join(" ; "),I.map(function(x,i){return"$"+IJ[i]+"="+x[1]+"$"}).join(" , "),W.apply(null,I.map(function(x,i){return intS(IJ[i],x)})))]}}});
INT.push({id:"int3",t:"អាំងតេក្រាល I, J, K",lv:2,f:function(){var I=int3();
  return{inst:"គណនាអាំងតេក្រាលខាងក្រោម៖",it:I.map(function(x,i){return Q("$"+IJ[i]+"=\\displaystyle"+x[0]+"$","$"+IJ[i]+"="+x[1]+"$",intS(IJ[i],x))})}}});
/* ---- ប្រូបាប ---- */
var COL=[["ក្រហម","ស","ខៀវ"],["ក្រហម","លឿង","បៃតង"],["ខៀវ","ស","ខ្មៅ"]],OBJ=[["ឃ្លី","គ្រាប់","ថង់"],["ប៊ូល","គ្រាប់","ប្រអប់"]];
/* PQ៖ q · n(E) · n(S) · កន្សោម n(E) · កន្សោម n(S) */
function PQ(q,n,T,fe,fs){return Q(q,"$"+F(n,T)+"$",W(fs?"ចំនួនករណីអាច ៖ $n(S)="+fs+"="+T+"$":"",AL(["n(E)&="+fe+"="+n,"P(E)&=\\dfrac{n(E)}{n(S)}=\\dfrac{"+n+"}{"+T+"}"+(gcd(n,T)===1||!n?"":"="+F(n,T))])))}
PROB.push(
 {id:"col3",t:"ប្រូបាប · ឃ្លី ៣ ពណ៌ (ចាប់ ៣ ព្រមគ្នា)",lv:2,f:function(){var c=pick(COL),o=pick(OBJ),r=ri(5,10),w=ri(3,6),b=ri(3,5),N=r+w+b,T=nCr(N,3),n=function(x){return o[0]+"ពណ៌"+x},SS="C_{"+N+"}^3=\\dfrac{"+N+"\\times"+(N-1)+"\\times"+(N-2)+"}{6}";
  return{inst:"ក្នុង"+o[2]+"មួយមាន"+n(c[0])+"ចំនួន $"+r+"$ "+o[1]+" "+n(c[1])+"ចំនួន $"+w+"$ "+o[1]+" និង"+n(c[2])+"ចំនួន $"+b+"$ "+o[1]+" ។ គេចាប់យក"+o[0]+" $3$ "+o[1]+"ដោយចៃដន្យ ។ រកប្រូបាបនៃព្រឹត្តិការណ៍ដែលគេចាប់បាន៖",it:[
   PQ(n(c[0])+"ទាំងបី"+o[1],nCr(r,3),T,"C_{"+r+"}^3",SS),
   PQ(n(c[1])+" $2$ និង"+n(c[2])+" $1$",nCr(w,2)*b,T,"C_{"+w+"}^2\\times C_{"+b+"}^1="+nCr(w,2)+"\\times"+b),
   PQ(n(c[1])+" $1$ និង"+n(c[0])+" $2$",w*nCr(r,2),T,"C_{"+w+"}^1\\times C_{"+r+"}^2="+w+"\\times"+nCr(r,2)),
   PQ(o[0]+"គ្រប់ពណ៌",r*w*b,T,"C_{"+r+"}^1C_{"+w+"}^1C_{"+b+"}^1="+r+"\\times"+w+"\\times"+b)]}}},
 {id:"num",t:"ប្រូបាប · ប៊ូលមានលេខ (ចែកដាច់)",lv:2,f:function(){var P2=pick([[12,3],[12,4],[15,3],[15,5],[16,4],[16,3],[20,3],[20,4],[20,5]]),n=P2[0],k=P2[1],m=Math.floor(n/k),T=nCr(n,3),K="ចែកដាច់នឹង $"+k+"$";
  var L=[];for(var i=1;i<=m;i++)L.push(i*k);
  return{inst:"ក្នុងថង់មួយមានប៊ូល $"+n+"$ គ្រាប់ ដែលសរសេរលេខពី $1$ ដល់ $"+n+"$ ។ គេចាប់យកប៊ូល $3$ គ្រាប់ចេញពីថង់ដោយចៃដន្យ ។ រកប្រូបាបនៃព្រឹត្តិការណ៍ដែលគេចាប់បាន៖",it:[
   (function(q){q.sol="លេខ"+K+" គឺ $"+L.join(", ")+"$ (មាន $"+m+"$ គ្រាប់) ។ មិន"+K+" មាន $"+(n-m)+"$ គ្រាប់ ។\n"+q.sol;return q})(PQ("ប៊ូលទាំងបីសុទ្ធតែមានលេខ"+K,nCr(m,3),T,"C_{"+m+"}^3","C_{"+n+"}^3")),
   PQ("ប៊ូលទាំងបីសុទ្ធតែមានលេខមិន"+K,nCr(n-m,3),T,"C_{"+(n-m)+"}^3"),
   PQ("ប៊ូលតែមួយគត់ដែលមានលេខ"+K,m*nCr(n-m,2),T,"C_{"+m+"}^1\\times C_{"+(n-m)+"}^2="+m+"\\times"+nCr(n-m,2))]}}},
 {id:"seq",t:"ប្រូបាប · ចាប់បន្តបន្ទាប់ មិនដាក់ចូលវិញ",lv:2,f:function(){var a=ri(8,20),b=ri(6,15),N=a+b,D=N*(N-1);
  var P3=function(q,L,n,ex){return Q(q,"$P("+L+")="+F(n,D)+"$",W("ចាប់បន្តបន្ទាប់ មិនដាក់ចូលវិញ (មានលំដាប់) ⇒ ចម្លាស់ $2$ ក្នុង $"+N+"$ ៖",AL(["n(S)&=A_{"+N+"}^{2}="+N+"\\times"+(N-1)+"="+D,"n("+L+")&="+ex+"="+n,"P("+L+")&=\\dfrac{n("+L+")}{n(S)}="+frq(n,D)])))};
  return{inst:"ក្នុងប្រអប់មួយមានសៀវភៅគណិតវិទ្យាចំនួន $"+a+"$ ក្បាល និងសៀវភៅរូបវិទ្យាចំនួន $"+b+"$ ក្បាល ។ គេចាប់យកសៀវភៅ $2$ ក្បាល ដោយចាប់បន្តបន្ទាប់ ហើយមិនដាក់ចូលវិញ ។ រកប្រូបាបនៃព្រឹត្តិការណ៍៖",it:[
   P3("$A$ ៖ ចាប់បានសៀវភៅគណិតវិទ្យាទាំង $2$ ក្បាល","A",a*(a-1),"A_{"+a+"}^{2}="+a+"\\times"+(a-1)),
   P3("$B$ ៖ ចាប់បានសៀវភៅរូបវិទ្យាទាំង $2$ ក្បាល","B",b*(b-1),"A_{"+b+"}^{2}="+b+"\\times"+(b-1)),
   P3("$C$ ៖ ចាប់បានសៀវភៅមួយក្បាលពីមុខវិជ្ជានីមួយៗ","C",2*a*b,"2\\times C_{"+a+"}^{1}\\times C_{"+b+"}^{1}=2\\times"+a+"\\times"+b)]}}},
 {id:"team",t:"ប្រូបាប · រៀបចំក្រុម ៤ នាក់",lv:2,f:function(){var g=ri(4,7),bo=ri(4,7),N=g+bo,T=nCr(N,4);
  return{inst:"ក្នុងថ្នាក់មួយមានសិស្សពូកែ $"+N+"$ នាក់ ក្នុងនោះ $"+g+"$ នាក់ជាសិស្សស្រី និង $"+bo+"$ នាក់ជាសិស្សប្រុស ។ គេរៀបចំក្រុមមួយមានសិស្ស $4$ នាក់ដោយចៃដន្យ ។ រកប្រូបាបនៃព្រឹត្តិការណ៍៖",it:[
   PQ("$A$ ៖ ក្រុមមានសុទ្ធតែសិស្សស្រី",nCr(g,4),T,"C_{"+g+"}^4","C_{"+N+"}^4"),
   PQ("$B$ ៖ ក្រុមមានសុទ្ធតែសិស្សប្រុស",nCr(bo,4),T,"C_{"+bo+"}^4"),
   PQ("$C$ ៖ ក្រុមមានសិស្សប្រុស $50\\%$ (ប្រុស $2$ ស្រី $2$)",nCr(g,2)*nCr(bo,2),T,"C_{"+g+"}^2\\times C_{"+bo+"}^2="+nCr(g,2)+"\\times"+nCr(bo,2))]}}});
/* ---- សមីការឌីផេរ៉ង់ស្យែល ---- */
ODE.push(
 {id:"full",t:"ED លំដាប់ទី២ · ចម្លើយពិសេស y(0), y'(0) · g = ax + b",lv:3,f:function(){
  var r1,r2;do{r1=nz(-5,4);r2=nz(-5,4)}while(r1===r2);var p=-(r1+r2),q=r1*r2,al=nz(-3,3),be=ri(-3,3),m=q*al,n=p*al+q*be,C1=nz(-3,3),C2=nz(-3,3),y0=C1+C2,y1=r1*C1+r2*C2;
  var L="y''"+co(p,"y'")+co(q,"y"),ch=poly([[1,"r^2"],[p,"r"],[q,""]]);
  return{inst:"គេឱ្យសមីការឌីផេរ៉ង់ស្យែល $(E)\\colon "+L+"="+poly([[m,"x"],[n,""]])+"$ និង $(F)\\colon "+L+"=0$ ។",it:[
   Q("ដោះស្រាយសមីការ $(F)$ ។","$y=C_1e^{"+ex(r1)+"}+C_2e^{"+ex(r2)+"}$",
     W("សមីការសម្គាល់ ៖",AL([ch+"&=0","(r"+sg(-r1)+")(r"+sg(-r2)+")&=0"]),"មានឫសពីរផ្សេងគ្នា $r_1="+r1+"$ , $r_2="+r2+"$ ។ ចម្លើយទូទៅនៃ $(F)$ ៖ $y=C_1e^{"+ex(r1)+"}+C_2e^{"+ex(r2)+"}$ ($C_1,C_2\\in\\mathbb R$)")),
   Q("រកចម្លើយពិសេសមួយនៃ $(F)$ បើគេដឹងថា $y(0)="+y0+"$ និង $y'(0)="+y1+"$ ។","$y="+co(C1,"e^{"+ex(r1)+"}",true)+co(C2,"e^{"+ex(r2)+"}")+"$",
     W("$y'="+co(r1,"C_1e^{"+ex(r1)+"}",true)+co(r2,"C_2e^{"+ex(r2)+"}")+"$ ។ តាមលក្ខខណ្ឌដើម ៖","$$\\begin{cases}C_1+C_2="+y0+"\\\\"+co(r1,"C_1",true)+co(r2,"C_2")+"="+y1+"\\end{cases}$$",
       AL(["C_1&=\\dfrac{"+pn(y1)+"-"+pn(r2)+"\\times"+pn(y0)+"}{"+pn(r1)+"-"+pn(r2)+"}="+C1,"C_2&="+y0+"-"+pn(C1)+"="+C2]))),
   Q("កំណត់ចំនួនពិត $a, b$ ដើម្បីឱ្យអនុគមន៍ $g(x)=ax+b$ ជាចម្លើយមួយនៃ $(E)$ ។","$a="+al+"$ , $b="+be+"$",
     W("$g'(x)=a$ , $g''(x)=0$ ។ ជំនួសក្នុង $(E)$ ៖",AL(["0"+co(p,"a")+co(q,"(ax+b)")+"&="+poly([[m,"x"],[n,""]]),co(q,"a",true)+"x+("+co(p,"a",true)+co(q,"b")+")&="+poly([[m,"x"],[n,""]])]),
       "ផ្ទឹមមេគុណ ៖",AL([co(q,"a",true)+"&="+m+"\\Rightarrow a="+al,pn(p)+"\\times"+pn(al)+"+"+pn(q)+"b&="+n+"\\Rightarrow b="+be])))]}}},
 {id:"rep",t:"ED លំដាប់ទី២ · ឫសឌុប (ay″+by′+cy=0)",lv:2,f:function(){
  var a=pick([1,2,2,3]),b;do{b=nz(-3,3)}while(gcd(a,b)!==1);var C1=nz(-4,4),C2=nz(-3,3),y1=F(a*C2-b*C1,a),r0=a===1?ex(-b):F(-b,a).replace("\\dfrac","\\frac")+"x",rr=F(-b,a);
  return{inst:"គេមានសមីការឌីផេរ៉ង់ស្យែល $(E)\\colon "+co(a*a,"y''",true)+co(2*a*b,"y'")+co(b*b,"y")+"=0$ ។",it:[
   Q("ដោះស្រាយសមីការឌីផេរ៉ង់ស្យែល $(E)$ ។","$y=(C_1+C_2x)e^{"+r0+"}$",
     W("សមីការសម្គាល់ ៖",AL([co(a*a,"r^2",true)+co(2*a*b,"r")+co(b*b,"")+"&=0","("+co(a,"r",true)+sg(b)+")^2&=0"]),"មានឫសឌុប $r="+rr+"$ ។ ចម្លើយទូទៅ ៖ $y=(C_1+C_2x)e^{"+r0+"}$")),
   Q("រកចម្លើយតែមួយគត់នៃ $(E)$ បើគេដឹងថា $y(0)="+C1+"$ និង $y'(0)="+y1+"$ ។","$y=("+C1+co(C2,"x")+")e^{"+r0+"}$",
     W("$y'=C_2e^{"+r0+"}+"+(/^-/.test(rr)?"\\left("+rr+"\\right)":rr)+"(C_1+C_2x)e^{"+r0+"}$ ៖",AL(["y(0)&=C_1="+C1,"y'(0)&=C_2"+(/^-/.test(rr)?"":"+")+rr+"\\times"+pn(C1)+"="+y1+"\\Rightarrow C_2="+C2])))]}}});
/* ---- កោនិក ---- */
function pmT(h,t){return h?h+"\\pm "+t:"\\pm "+t}
function eqN(c){var g=c.reduce(function(s,v){return gcd(s,v[0])},0)||1,sgn=c.filter(function(v){return v[0]})[0][0]<0?-1:1;return poly(c.map(function(v){return[v[0]/g*sgn,v[1]]}))+"=0"}
function eqK(c){var g=c.reduce(function(s,v){return gcd(s,v[0])},0)||1,sgn=c.filter(function(v){return v[0]})[0][0]<0?-1:1;return g*sgn}
var HYP=[{id:"hyp",t:"អ៊ីពែបូល · ផ្ចិត កំពូល កំណុំ អាស៊ីមតូត",lv:2,f:function(){
  var h=ri(-3,3),k=ri(-3,3),a=ri(1,4),b=ri(1,4),hor=Math.random()<.5,c2=a*a+b*b,ci=Math.sqrt(c2)%1===0?Math.sqrt(c2):0,cT=sqrtT(c2),A2=a*a,B2=b*b,E,St2,V,Fo,As,cf2,K,L1,L2,L3;
  if(hor){cf2=[[B2,"x^2"],[-A2,"y^2"],[-2*h*B2,"x"],[2*k*A2,"y"],[B2*h*h-A2*k*k-A2*B2,""]];St2="\\dfrac{"+xm(h)+"^2}{"+A2+"}-\\dfrac{"+xm(k,"y")+"^2}{"+B2+"}=1";
   V="("+(h-a)+","+k+")$ , $("+(h+a)+","+k+")";Fo=ci?"("+(h-ci)+","+k+")$ , $("+(h+ci)+","+k+")":"("+pmT(h,cT)+","+k+")";As="y"+sg(-k)+"=\\pm"+cf(F(b,a))+xm(h);
   L1=(B2===1?"":B2)+"("+poly([[1,"x^2"],[-2*h,"x"]])+")-"+(A2===1?"":A2)+"("+poly([[1,"y^2"],[-2*k,"y"]])+")&="+(A2*B2-B2*h*h+A2*k*k);L2=(B2===1?"":B2)+xm(h)+"^2-"+(A2===1?"":A2)+xm(k,"y")+"^2&="+A2*B2}
  else{cf2=[[-A2,"x^2"],[B2,"y^2"],[2*h*A2,"x"],[-2*k*B2,"y"],[B2*k*k-A2*h*h-A2*B2,""]];St2="\\dfrac{"+xm(k,"y")+"^2}{"+A2+"}-\\dfrac{"+xm(h)+"^2}{"+B2+"}=1";
   V="("+h+","+(k-a)+")$ , $("+h+","+(k+a)+")";Fo=ci?"("+h+","+(k-ci)+")$ , $("+h+","+(k+ci)+")":"("+h+","+pmT(k,cT)+")";As="y"+sg(-k)+"=\\pm"+cf(F(a,b))+xm(h);
   L1=(B2===1?"":B2)+"("+poly([[1,"y^2"],[-2*k,"y"]])+")-"+(A2===1?"":A2)+"("+poly([[1,"x^2"],[-2*h,"x"]])+")&="+(A2*B2-B2*k*k+A2*h*h);L2=(B2===1?"":B2)+xm(k,"y")+"^2-"+(A2===1?"":A2)+xm(h)+"^2&="+A2*B2}
  E=eqN(cf2);K=eqK(cf2);
  var fx=hor?"("+xm(h)+")^2/"+A2+"-("+xm(k,"y")+")^2/"+B2+"=1":"("+xm(k,"y")+")^2/"+A2+"-("+xm(h)+")^2/"+B2+"=1",sl=hor?b/a:a/b,R=Math.max(a,b)+3;
  return{kfig:FG({I:[h,k]},[fx.replace(/\(\(/g,"(").replace(/\)\)/g,")")+" blue","line ("+h+","+k+") ("+(h+1)+","+r3(k+sl)+") gray","line ("+h+","+k+") ("+(h+1)+","+r3(k-sl)+") gray"],{axes:1,ext:[[h-R,k-R],[h+R,k+R]]}),
   inst:"គេមានអ៊ីពែបូល $(H)\\colon "+E+"$ ។",it:[
   Q("សរសេរសមីការ $(H)$ ជាទម្រង់ស្តង់ដា ។","$"+St2+"$",
     W(K===1?"បំពេញការេ ៖":"គុណអង្គទាំងពីរនឹង $"+K+"$ រួចបំពេញការេ ៖",AL([L1,L2]),"ចែកអង្គទាំងពីរនឹង $"+A2*B2+"$ ៖ $"+St2+"$")),
   Q("រកកូអរដោនេផ្ចិត កំពូល កំណុំ និងសមីការអាស៊ីមតូតនៃ $(H)$ ។","ផ្ចិត $("+h+","+k+")$ , កំពូល $"+V+"$ , កំណុំ $"+Fo+"$ , អាស៊ីមតូត $"+As+"$",
     W("ផ្ចិត $I("+h+","+k+")$ ។ អ័ក្សទទឹងស្រប"+(hor?"អ័ក្សអាប់ស៊ីស":"អ័ក្សអ័រដោនេ")+" ៖",AL(["a&="+a+"\\ ,\\ b="+b,"c^2&=a^2+b^2="+A2+"+"+B2+"="+c2+"\\Rightarrow c="+cT]),"កំពូល ៖ $"+V+"$","កំណុំ ៖ $"+Fo+"$","អាស៊ីមតូត ៖ $"+As+"$")),
   Q("សង់អ៊ីពែបូល $(H)$ ។","មើលរូប","សង់ផ្ចិត កំពូល និងអាស៊ីមតូតពីរ រួចគូសមែកទាំងពីរនៃ $(H)$ (មើលរូបខាងលើ) ។")]}}}];
var PAR=[{id:"par",t:"ប៉ារ៉ាបូល · កំពូល កំណុំ បន្ទាត់ប្រាប់ទិស",lv:2,f:function(){
  var h=ri(-3,3),k=ri(-3,3),p=pick([-2,-1,1,2]),hor=Math.random()<.5,E,St2,Fo,D,L1,fx,fp,dl;
  if(hor){E=poly([[1,"y^2"],[-4*p,"x"],[-2*k,"y"],[k*k+4*p*h,""]])+"=0";St2=xm(k,"y")+"^2="+4*p+xm(h);Fo="("+(h+p)+","+k+")";D="x="+(h-p);L1=poly([[1,"y^2"],[-2*k,"y"]])+"&="+poly([[4*p,"x"],[-k*k-4*p*h,""]]);fx="(y"+sg(-k)+")^2="+4*p+"*(x"+sg(-h)+")";fp=[h+p,k];dl="x="+(h-p)}
  else{E=poly([[1,"x^2"],[-2*h,"x"],[-4*p,"y"],[h*h+4*p*k,""]])+"=0";St2=xm(h)+"^2="+4*p+xm(k,"y");Fo="("+h+","+(k+p)+")";D="y="+(k-p);L1=poly([[1,"x^2"],[-2*h,"x"]])+"&="+poly([[4*p,"y"],[-h*h-4*p*k,""]]);fx="(x"+sg(-h)+")^2="+4*p+"*(y"+sg(-k)+")";fp=[h,k+p];dl="y="+(k-p)}
  return{kfig:FG({S:[h,k],F:fp},[fx+" blue","dash "+dl],{axes:1,ext:[[h-4,k-4],[h+4,k+4]]}),inst:"គេឱ្យប៉ារ៉ាបូល $(P)\\colon "+E+"$ ។",it:[
   Q("សរសេរ $(P)$ ជាទម្រង់ស្តង់ដា ។","$"+St2+"$",W("បំពេញការេ ៖",AL([L1,St2.replace("=","&=")]))),
   Q("រកកូអរដោនេកំពូល កំណុំ និងសមីការបន្ទាត់ប្រាប់ទិសនៃ $(P)$ រួចសង់ $(P)$ ។","កំពូល $("+h+","+k+")$ , កំណុំ $"+Fo+"$ , បន្ទាត់ប្រាប់ទិស $"+D+"$",
     W("ប្រៀបធៀបនឹងទម្រង់ $"+(hor?"(y-k)^2=4p(x-h)":"(x-h)^2=4p(y-k)")+"$ ៖ $4p="+4*p+"\\Rightarrow p="+p+"$",AL(["\\text{S}&=("+h+","+k+")","\\text{F}&="+Fo,D.replace("=","&=")]),"អ័ក្សឆ្លុះ $"+(hor?"y="+k:"x="+h)+"$ ។ ប៉ារ៉ាបូលបើកទៅ"+(hor?(p>0?"ស្ដាំ":"ឆ្វេង"):(p>0?"លើ":"ក្រោម"))+" (មើលរូប) ។"))]}}}];
/* ---- លំហ ---- */
function pt3(P){return"("+P.join(",")+")"}
function linT(c,k){return c?c+co(k,"t"):co(k,"t",true)||"0"}
function crs(u,v){var c=function(a,b,d,e){return"("+pn(a)+"\\times"+pn(b)+"-"+pn(d)+"\\times"+pn(e)+")"};return c(u[1],v[2],u[2],v[1])+"\\vec i\\\\&\\quad-"+c(u[0],v[2],u[2],v[0])+"\\vec j\\\\&\\quad+"+c(u[0],v[1],u[1],v[0])+"\\vec k"}   /* ៣ ជួរ (មិនលើសទទឹងជួរឈរ) */
var SPC=[
 {id:"pl3m",t:"ផ្ទៃត្រីកោណ · ប្លង់ (ABC) · ចម្ងាយពីចំណុចទៅប្លង់",lv:2,f:function(){
  var A,B,C,u,v,n;do{A=[ri(-2,3),ri(-2,3),ri(-2,3)];B=[ri(-2,3),ri(-2,3),ri(-2,3)];C=[ri(-2,3),ri(-2,3),ri(-2,3)];u=[0,1,2].map(function(i){return B[i]-A[i]});v=[0,1,2].map(function(i){return C[i]-A[i]});n=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]]}while(!n[0]&&!n[1]&&!n[2]);
  var g=gcd(gcd(n[0],n[1]),n[2]),m=n.map(function(x){return x/g});if(m.filter(function(x){return x})[0]<0)m=m.map(function(x){return-x});var d=-(m[0]*A[0]+m[1]*A[1]+m[2]*A[2]),M,num;
  do{M=[ri(-3,3),ri(-3,3),ri(-3,3)];num=m[0]*M[0]+m[1]*M[1]+m[2]*M[2]+d}while(!num);
  var nn=n[0]*n[0]+n[1]*n[1]+n[2]*n[2],mm=m[0]*m[0]+m[1]*m[1]+m[2]*m[2],pE=poly([[m[0],"x"],[m[1],"y"],[m[2],"z"],[d,""]]);
  return{inst:"នៅក្នុងតម្រុយអរតូណរម៉ាល់ $(O,\\vec i,\\vec j,\\vec k)$ គេឱ្យចំណុច $A"+pt3(A)+"$ , $B"+pt3(B)+"$ , $C"+pt3(C)+"$ និង $M"+pt3(M)+"$ ។",it:[
   Q("គណនាវ៉ិចទ័រ $\\vec n=\\overrightarrow{AB}\\times\\overrightarrow{AC}$ ទាញបង្ហាញថា $C\\notin(AB)$ ។","$\\vec n="+pt3(n)+"\\ne\\vec 0$ ⇒ $C\\notin(AB)$",
     W("$\\overrightarrow{AB}="+pt3(u)+"$ , $\\overrightarrow{AC}="+pt3(v)+"$",AL(["\\vec n&="+crs(u,v),"&="+pt3(n)]),"ដោយ $\\vec n\\ne\\vec0$ នោះ $\\overrightarrow{AB}$ និង $\\overrightarrow{AC}$ មិនកូលីនេអ៊ែ ⇒ $C\\notin(AB)$ ។")),
   Q("គណនាក្រឡាផ្ទៃត្រីកោណ $ABC$ ។","$S="+St(S(1,2,nn))+"$",AL(["S&=\\dfrac12\\left\\|\\vec n\\right\\|=\\dfrac12\\sqrt{"+pn(n[0])+"^2+"+pn(n[1])+"^2+"+pn(n[2])+"^2}","&=\\dfrac12\\sqrt{"+nn+"}="+St(S(1,2,nn))])),
   Q("សរសេរសមីការប្លង់ $(P)$ កាត់តាមបីចំណុច $A, B, C$ ។","$"+pE+"=0$",
     W("$(P)$ កាត់តាម $A$ មានវ៉ិចទ័រណរម៉ាល់ $"+pt3(m)+"$ ៖",AL([pn(m[0])+"(x-"+pn(A[0])+")+"+pn(m[1])+"(y-"+pn(A[1])+")+"+pn(m[2])+"(z-"+pn(A[2])+")&=0",pE+"&=0"]))),
   Q("រកចម្ងាយពីចំណុច $M$ ទៅប្លង់ $(P)$ ។","$d="+St(S(Math.abs(num),mm,mm))+"$",
     AL(["d(M,(P))&=\\dfrac{|"+pn(m[0])+"\\times"+pn(M[0])+"+"+pn(m[1])+"\\times"+pn(M[1])+"+"+pn(m[2])+"\\times"+pn(M[2])+sg(d)+"|}{\\sqrt{"+pn(m[0])+"^2+"+pn(m[1])+"^2+"+pn(m[2])+"^2}}","&=\\dfrac{"+Math.abs(num)+"}{\\sqrt{"+mm+"}}="+St(S(Math.abs(num),mm,mm))]))]}}},
 {id:"parQ",t:"ប្លង់ស្រប · ចម្ងាយរវាងប្លង់ · ចំណោលកែង H",lv:2,f:function(){
  var N=pick([[2,-3,6,7],[1,2,2,3],[2,1,-2,3],[1,-2,2,3],[6,2,3,7],[2,3,6,7],[3,-6,2,7],[2,-1,2,3]]),n=N.slice(0,3),H=[ri(-3,3),ri(-3,3),ri(-3,3)],s=pick([-2,-1,1,2]);
  var A=[0,1,2].map(function(i){return H[i]+s*n[i]}),d=-(n[0]*H[0]+n[1]*H[1]+n[2]*H[2]),d2=-(n[0]*A[0]+n[1]*A[1]+n[2]*A[2]),PE=poly([[n[0],"x"],[n[1],"y"],[n[2],"z"],[d,""]]),QE=poly([[n[0],"x"],[n[1],"y"],[n[2],"z"],[d2,""]]),ta=-s;
  return{inst:"នៅក្នុងលំហមានតម្រុយអរតូណរម៉ាល់ គេឱ្យចំណុច $A"+pt3(A)+"$ និងប្លង់ $(P)\\colon "+PE+"=0$ ។",it:[
   Q("សរសេរសមីការប្លង់ $(Q)$ កាត់តាមចំណុច $A$ ហើយស្របនឹងប្លង់ $(P)$ រួចគណនាចម្ងាយរវាងប្លង់ទាំងពីរ ។","$(Q)\\colon "+QE+"=0$ , ចម្ងាយ $="+Math.abs(s)*N[3]+"$",
     W("$(Q)\\parallel(P)$ ⇒ $(Q)$ មានវ៉ិចទ័រណរម៉ាល់ $\\vec n"+pt3(n)+"$ ហើយកាត់តាម $A$ ៖",AL([pn(n[0])+"(x-"+pn(A[0])+")+"+pn(n[1])+"(y-"+pn(A[1])+")+"+pn(n[2])+"(z-"+pn(A[2])+")&=0",QE+"&=0"]),
       "ចម្ងាយរវាងប្លង់ស្របពីរ ៖",AL(["d&=\\dfrac{|"+d+"-("+d2+")|}{\\sqrt{"+pn(n[0])+"^2+"+pn(n[1])+"^2+"+pn(n[2])+"^2}}=\\dfrac{"+Math.abs(d-d2)+"}{"+N[3]+"}="+Math.abs(s)*N[3]]))),
   Q("សរសេរសមីការប៉ារ៉ាម៉ែត្រនៃបន្ទាត់ $(AH)$ ដែលកែងនឹងប្លង់ $(P)$ ត្រង់ $H$ ។ រកកូអរដោនេនៃចំណុច $H$ ។","$x="+linT(A[0],n[0])+"$ , $y="+linT(A[1],n[1])+"$ , $z="+linT(A[2],n[2])+"$ , $H"+pt3(H)+"$",
     W("$(AH)\\perp(P)$ ⇒ វ៉ិចទ័រប្រាប់ទិសនៃ $(AH)$ គឺ $\\vec n"+pt3(n)+"$ ៖",AL(["x&="+linT(A[0],n[0]),"y&="+linT(A[1],n[1]),"z&="+linT(A[2],n[2])]),"ជំនួសក្នុង $(P)$ ៖",
       AL([pn(n[0])+"("+linT(A[0],n[0])+")+"+pn(n[1])+"("+linT(A[1],n[1])+")+"+pn(n[2])+"("+linT(A[2],n[2])+")"+sg(d)+"&=0",(n[0]*n[0]+n[1]*n[1]+n[2]*n[2])+"t"+sg(n[0]*A[0]+n[1]*A[1]+n[2]*A[2]+d)+"&=0\\Rightarrow t="+ta]),"ជំនួស $t="+ta+"$ ៖ $H"+pt3(H)+"$"))]}}}];
/* ---- សិក្សាអនុគមន៍ (៣០ ពិន្ទុ) ---- */
function FN(id,t,inst,qs){return{id:id,t:t,lv:3,f:function(){return{inst:inst,it:qs.map(function(x){return Q(x[0],x[1],x[2])})}}}}
/* ===== សិក្សាអនុគមន៍ (៣០–៣៥ ពិន្ទុ) · មេគុណប្ដូរដោយចៃដន្យ · ដំណោះស្រាយពេញលេញ + តារាងអថេរភាព + ក្រាប ===== */
/* តារាងអថេរភាព៖ xs = តម្លៃ x (n) · dr = ជួរ f′ (2n−1) · fr = ជួរ f (2n−1) */
function VT(xs,dr,fr,fn){fn=fn||"f";var xr=[];xs.forEach(function(x,i){xr.push(x);if(i<xs.length-1)xr.push("")});
  return"$$\\def\\arraystretch{1.45}"+(xr.length>=7?"\\small":"")+"\\begin{array}{c|"+Array(xr.length+1).join("c")+"}x&"+xr.join("&")+"\\\\\\hline "+fn+"'(x)&"+dr.join("&")+"\\\\\\hline "+fn+"(x)&"+fr.join("&")+"\\end{array}$$"}
var UP="\\nearrow",DN="\\searrow";
function GRF(lines,w){return["window x="+w[0]+".."+w[1]+" y="+w[2]+".."+w[3],"labels"].concat(lines).join("\n")}
function cxS(c,s){return c===1?s:c===-1?"-"+s:c+s}   /* មេគុណ × កន្សោម */
function js(v){return v<0?String(v):"+"+v}
function lnT(c){return c===1?"0":"\\ln "+c}
var FEX=[
 /* f(x) = e^x(x−1) − x²/2 (ទម្រង់សៀវភៅ) */
 {id:"fexp",t:"សិក្សាអនុគមន៍ e^x (x−1) − x²/2 (ទម្រង់បាក់ឌុប)",lv:3,f:function(){
  return{kfig:GRF(["y=exp(x)*(x-1)-x^2/2 blue","y=-x^2/2 red","A(1,-0.5)"],[-4,2.5,-5,3]),inst:"គេមានអនុគមន៍ $f$ កំណត់លើ $\\mathbb R$ ដោយ $f(x)=e^x(x-1)-\\dfrac12x^2$ និងមានក្រាបតំណាង $(C)$ ។",it:[
   Q("គណនា $\\lim\\limits_{x\\to-\\infty}f(x)$ និង $\\lim\\limits_{x\\to+\\infty}f(x)$ ។","$\\lim\\limits_{x\\to-\\infty}f(x)=-\\infty$ , $\\lim\\limits_{x\\to+\\infty}f(x)=+\\infty$",
     W("ពេល $x\\to-\\infty$ ៖ $xe^x\\to0$ , $e^x\\to0$ និង $-\\dfrac12x^2\\to-\\infty$ ⇒ $\\lim\\limits_{x\\to-\\infty}f(x)=-\\infty$","ពេល $x\\to+\\infty$ ៖ សរសេរ $f(x)=x^2\\left[\\dfrac{e^x(x-1)}{x^2}-\\dfrac12\\right]$ ដោយ $\\dfrac{e^x}{x}\\to+\\infty$ ⇒ $\\lim\\limits_{x\\to+\\infty}f(x)=+\\infty$")),
   Q("គណនា $f'(x)$ រួចសិក្សាសញ្ញានៃ $f'(x)$ ។ សង់តារាងអថេរភាពនៃ $f$ ។","$f'(x)=x(e^x-1)\\ge0$ , $f$ កើនលើ $\\mathbb R$ , $f(0)=-1$",
     W(AL(["f'(x)&=e^x(x-1)+e^x-x=xe^x-x=x(e^x-1)"]),"• បើ $x<0$ ៖ $x<0$ និង $e^x-1<0$ ⇒ $f'(x)>0$","• បើ $x>0$ ៖ $x>0$ និង $e^x-1>0$ ⇒ $f'(x)>0$","• $f'(0)=0$ ។ ដូចនេះ $f'(x)\\ge0$ ⇒ $f$ កើនលើ $\\mathbb R$ ។ $f(0)=-1$",
       VT(["-\\infty","0","+\\infty"],["","+","0","+",""],["-\\infty",UP,"-1",UP,"+\\infty"]))),
   Q("បង្ហាញថាសមីការ $f(x)=0$ មានឫស $\\alpha$ តែមួយគត់ដែល $\\alpha\\in[1;1.5]$ ។","$f(1)<0<f(1.5)$ និង $f$ កើនដាច់ខាត ⇒ ឫសតែមួយ",
     W(AL(["f(1)&=0-\\dfrac12=-\\dfrac12<0","f(1.5)&=0.5e^{1.5}-1.125","&\\approx0.5\\times4.5-1.125=1.125>0"]),"$f$ ជាប់ និងកើនដាច់ខាតលើ $[1;1.5]$ ហើយ $f(1)\\times f(1.5)<0$ ⇒ សមីការ $f(x)=0$ មានឫសតែមួយគត់ $\\alpha\\in[1;1.5]$ ។")),
   Q("គេតាងប៉ារ៉ាបូល $(P)\\colon y=-\\dfrac12x^2$ ។ សិក្សាទីតាំងធៀបរវាងក្រាប $(C)$ និងប៉ារ៉ាបូល $(P)$ ។","$(C)$ នៅក្រោម $(P)$ ពេល $x<1$ , លើពេល $x>1$ , កាត់គ្នាត្រង់ $A\\left(1,-\\dfrac12\\right)$",
     W(AL(["f(x)-\\left(-\\dfrac12x^2\\right)&=e^x(x-1)"]),"ដោយ $e^x>0$ សញ្ញាគឺជាសញ្ញានៃ $x-1$ ៖","• $x<1$ ៖ $(C)$ នៅក្រោម $(P)$ · $x>1$ ៖ $(C)$ នៅលើ $(P)$ · $x=1$ ៖ កាត់គ្នាត្រង់ $A\\left(1,-\\dfrac12\\right)$")),
   Q("សង់ក្រាប $(C)$ និងប៉ារ៉ាបូល $(P)$ ក្នុងតម្រុយ $(O,\\vec i,\\vec j)$ ។ (យក $e^{1.5}\\approx4.5$)","មើលរូប","សង់តាមតារាងអថេរភាព ចំណុច $(0,-1)$ , $A\\left(1,-\\dfrac12\\right)$ និងឫស $\\alpha\\in[1;1.5]$ (មើលរូបខាងលើ) ។"),
   Q("គណនាផ្ទៃក្រឡាខណ្ឌរវាងក្រាប $(C)$ ធៀបនឹងប៉ារ៉ាបូល $(P)$ លើចន្លោះ $[0,1]$ ។","$S=e-2$ (ឯកតាផ្ទៃ)",
     W("លើ $[0,1]$ ៖ $(C)$ នៅក្រោម $(P)$ ៖",AL(["S&=\\int_0^1\\left[-\\dfrac12x^2-f(x)\\right]dx=\\int_0^1(1-x)e^xdx","&=\\left[(1-x)e^x\\right]_0^1+\\int_0^1e^xdx\\quad(\\text{ដោយផ្នែក})".replace("\\quad(\\text{ដោយផ្នែក})",""),"&=(0-1)+(e-1)=e-2"]),"(អាំងតេក្រាលដោយផ្នែក $u=1-x$ , $v'=e^x$)"))]}}},
 /* f(x) = x + a + b/(eˣ+1) · b = 2 */
 {id:"fe2",t:"សិក្សាអនុគមន៍ x + a + b/(eˣ+1)",lv:3,f:function(){return fEB(ri(-3,2),2,false)}},
 /* f(x) = x + b + c e⁻ˣ */
 {id:"fxe",t:"សិក្សាអនុគមន៍ x + b + c e⁻ˣ",lv:3,f:function(){
  var b=ri(-2,2),c=pick([1,2,3]),L=lnT(c),mn=c===1?String(1+b):(1+b?(1+b)+"+":"")+"\\ln "+c,fx="x"+sg(b)+"+"+(c===1?"":c)+"e^{-x}";
  return{kfig:GRF(["y=x"+js(b)+"+"+c+"*exp(-x) blue","dash y=x"+js(b)],[-2.5,4.5,-2,6]),inst:"អនុគមន៍ $f$ កំណត់លើ $\\mathbb R$ ដោយ $f(x)="+fx+"$ ហើយមានក្រាប $(C)$ ។",it:[
   Q("គណនាលីមីត $f$ ត្រង់ $\\pm\\infty$ ។ បង្ហាញថាបន្ទាត់ $(D)\\colon y=x"+sg(b)+"$ ជាអាស៊ីមតូតទ្រេតខាង $+\\infty$ រួចសិក្សាទីតាំង $(C)$ ធៀបនឹង $(D)$ ។","$\\lim\\limits_{x\\to\\pm\\infty}f(x)=+\\infty$ , $(C)$ នៅលើ $(D)$",
     W("• $x\\to+\\infty$ ៖ $e^{-x}\\to0$ ⇒ $\\lim\\limits_{x\\to+\\infty}f(x)=+\\infty$","• $x\\to-\\infty$ ៖ $f(x)=e^{-x}\\left(xe^x"+sg(b)+"e^x+"+c+"\\right)$ ដោយ $e^{-x}\\to+\\infty$ និង $xe^x\\to0$ ⇒ $\\lim\\limits_{x\\to-\\infty}f(x)=+\\infty$",
       AL(["f(x)-(x"+sg(b)+")&="+(c===1?"":c)+"e^{-x}\\xrightarrow[x\\to+\\infty]{}0"]),"⇒ $(D)$ ជាអាស៊ីមតូតទ្រេតខាង $+\\infty$ ។ ដោយ $"+(c===1?"":c)+"e^{-x}>0$ នោះ $(C)$ នៅលើ $(D)$ ។")),
   Q("គណនា $f'(x)$ ។ បង្ហាញថា $f$ មានតម្លៃអប្បបរមាតែមួយ ដែលគេត្រូវកំណត់ ។","$f'(x)=1-"+(c===1?"":c)+"e^{-x}$ , អប្បបរមា $f("+L+")="+mn+"$",
     W(AL(["f'(x)&=1-"+(c===1?"":c)+"e^{-x}=\\dfrac{e^x-"+c+"}{e^x}","f'(x)=0&\\iff e^x="+c+"\\iff x="+L]),"$f'(x)<0$ ពេល $x<"+L+"$ និង $f'(x)>0$ ពេល $x>"+L+"$ ⇒ $f$ មានអប្បបរមាត្រង់ $x="+L+"$ ៖",
       AL(["f("+L+")&="+L+sg(b)+"+"+(c===1?"":c)+"e^{-"+L+"}="+L+sg(b)+"+1="+mn]))),
   Q("សង់តារាងអថេរភាពនៃអនុគមន៍ $f$ ព្រមទាំងសង់ក្រាប $(C)$ ។","$f$ ចុះលើ $(-\\infty,"+L+"]$ , កើនលើ $["+L+",+\\infty)$",
     W(VT(["-\\infty",L,"+\\infty"],["","-","0","+",""],["+\\infty",DN,mn,UP,"+\\infty"]),"សង់ $(D)$ និងក្រាប $(C)$ (មើលរូបខាងលើ) ។")),
   Q("គណនាផ្ទៃក្រឡា $S$ ខណ្ឌដោយក្រាប $(C)$ អាស៊ីមតូត $(D)$ និងបន្ទាត់ $x=0$ , $x=1$ ។","$S="+(c===1?"":c)+"\\left(1-\\dfrac1e\\right)$ (ឯកតាផ្ទៃ)",
     W("លើ $[0,1]$ ៖ $(C)$ នៅលើ $(D)$ ៖",AL(["S&=\\int_0^1\\left[f(x)-(x"+sg(b)+")\\right]dx=\\int_0^1"+(c===1?"":c)+"e^{-x}dx","&=\\left[-"+(c===1?"":c)+"e^{-x}\\right]_0^1="+(c===1?"":c)+"\\left(1-\\dfrac1e\\right)"])))]}}},
 /* f(x) = (k − eˣ)/(k + eˣ) */
 {id:"fth",t:"សិក្សាអនុគមន៍ (k − eˣ)/(k + eˣ)",lv:3,f:function(){
  var k=pick([1,1,2,3]),L=lnT(k),fx="\\dfrac{"+k+"-e^x}{"+k+"+e^x}",I=k===1?"O(0,0)":"I(\\ln "+k+",0)";
  return{kfig:GRF(["y=("+k+"-exp(x))/("+k+"+exp(x)) blue","dash y=1","dash y=-1","y=-(x-"+r3(Math.log(k))+")/2 gray"],[-5,6,-2,2]),inst:"អនុគមន៍ $f$ កំណត់លើ $\\mathbb R$ ដោយ $f(x)="+fx+"$ ហើយមានក្រាប $(C)$ ។",it:[
   Q("គណនា $\\lim\\limits_{x\\to+\\infty}f(x)$ និង $\\lim\\limits_{x\\to-\\infty}f(x)$ ។ ទាញរកអាស៊ីមតូតដេកនៃក្រាប $(C)$ ។","$-1$ , $1$ , អាស៊ីមតូតដេក $y=-1$ និង $y=1$",
     W(AL(["\\lim\\limits_{x\\to+\\infty}f(x)&=\\lim\\limits_{x\\to+\\infty}\\dfrac{"+k+"e^{-x}-1}{"+k+"e^{-x}+1}=-1","\\lim\\limits_{x\\to-\\infty}f(x)&=\\dfrac{"+k+"-0}{"+k+"+0}=1"]),"⇒ បន្ទាត់ $y=-1$ (ខាង $+\\infty$) និង $y=1$ (ខាង $-\\infty$) ជាអាស៊ីមតូតដេក ។")),
   Q("បង្ហាញ $f$ ជាអនុគមន៍ចុះចំពោះគ្រប់ចំនួនពិត $x$ ។ គូសតារាងអថេរភាពនៃ $f$ ។","$f'(x)=\\dfrac{-"+2*k+"e^x}{("+k+"+e^x)^2}<0$",
     W(AL(["f'(x)&=\\dfrac{-e^x("+k+"+e^x)-("+k+"-e^x)e^x}{("+k+"+e^x)^2}=\\dfrac{-"+2*k+"e^x}{("+k+"+e^x)^2}<0"]),"⇒ $f$ ចុះដាច់ខាតលើ $\\mathbb R$ ៖",VT(["-\\infty","+\\infty"],["","-",""],["1",DN,"-1"]))),
   Q("បង្ហាញថា $f$ មានចំណុចរបត់មួយ ។ រកកូអរដោនេចំណុចរបត់នោះ ។","ចំណុចរបត់ $"+I+"$",
     W(AL(["f''(x)&=\\dfrac{-"+2*k+"e^x("+k+"-e^x)}{("+k+"+e^x)^3}"]),"$f''(x)$ មានសញ្ញាផ្ទុយពីសញ្ញានៃ $"+k+"-e^x$ ៖ ប្ដូរសញ្ញាត្រង់ $x="+L+"$ ។ $f("+L+")=\\dfrac{"+k+"-"+k+"}{"+k+"+"+k+"}=0$ ⇒ ចំណុចរបត់ $"+I+"$")),
   Q(k===1?"បង្ហាញថា $f$ ជាអនុគមន៍សេស រួចបញ្ជាក់ផ្ចិតឆ្លុះនៃ $(C)$ ។":"បង្ហាញថា $f(2\\ln "+k+"-x)=-f(x)$ រួចទាញថា $"+I+"$ ជាផ្ចិតឆ្លុះនៃ $(C)$ ។","ផ្ចិតឆ្លុះ $"+I+"$",
     k===1?AL(["f(-x)&=\\dfrac{1-e^{-x}}{1+e^{-x}}=\\dfrac{e^x-1}{e^x+1}=-f(x)"])+"\n$f$ ជាអនុគមន៍សេស ⇒ $(C)$ មានផ្ចិតឆ្លុះ $O(0,0)$ ។"
      :AL(["f(2\\ln "+k+"-x)&=\\dfrac{"+k+"-"+k*k+"e^{-x}}{"+k+"+"+k*k+"e^{-x}}=\\dfrac{1-"+k+"e^{-x}}{1+"+k+"e^{-x}}=\\dfrac{e^x-"+k+"}{e^x+"+k+"}=-f(x)"])+"\nដូចនេះ $"+I+"$ ជាផ្ចិតឆ្លុះនៃ $(C)$ ។"),
   Q("សរសេរសមីការបន្ទាត់ $(T)$ ប៉ះក្រាប $(C)$ ត្រង់ចំណុចរបត់ ។ សង់ $(T)$ និងក្រាប $(C)$ ។","$(T)\\colon y=-\\dfrac12"+(k===1?"x":"(x-\\ln "+k+")")+"$",
     W(AL(["f'("+L+")&=\\dfrac{-"+2*k+"\\times"+k+"}{("+2*k+")^2}=-\\dfrac12","(T)\\colon y&=-\\dfrac12"+(k===1?"x":"(x-\\ln "+k+")")]),"សង់ $(T)$ អាស៊ីមតូត $y=\\pm1$ និង $(C)$ (មើលរូបខាងលើ) ។"))]}}},
 /* f(x) = m − x − c e⁻ˣ */
 {id:"f4x",t:"សិក្សាអនុគមន៍ m − x − c e⁻ˣ",lv:3,f:function(){
  var c=pick([2,3]),m=c===2?pick([3,4]):ri(4,7),L="\\ln "+c,mx=(m-1)+"-\\ln "+c,fm1=m+1,fx=m+"-x-"+c+"e^{-x}";
  return{kfig:GRF(["y="+m+"-x-"+c+"*exp(-x) blue","dash y="+m+"-x","y="+(c-1)+"*x+"+(m-c)+" gray","A(0,"+(m-c)+")"],[-2.5,m+2,-4,m+0.5]),
   inst:"គេមានអនុគមន៍ $f$ កំណត់លើ $\\mathbb R$ ដោយ $f(x)="+fx+"$ ។ គេតាង $(C)$ ជាក្រាបរបស់ $f$ ។",it:[
   Q("ផ្ទៀងផ្ទាត់ថា $f(x)=\\dfrac{"+m+"e^x-xe^x-"+c+"}{e^x}$ ។ គណនា $\\lim\\limits_{x\\to+\\infty}f(x)$ និង $\\lim\\limits_{x\\to-\\infty}f(x)$ ។ (ប្រើ $\\lim\\limits_{x\\to-\\infty}xe^x=0$)","$-\\infty$ , $-\\infty$",
     W(AL(["f(x)&=\\dfrac{("+m+"-x)e^x-"+c+"}{e^x}=\\dfrac{"+m+"e^x-xe^x-"+c+"}{e^x}"]),"• $x\\to+\\infty$ ៖ $-x\\to-\\infty$ , $e^{-x}\\to0$ ⇒ $\\lim\\limits_{x\\to+\\infty}f(x)=-\\infty$","• $x\\to-\\infty$ ៖ ភាគយក $\\to0-0-"+c+"=-"+c+"$ និងភាគបែង $e^x\\to0^+$ ⇒ $\\lim\\limits_{x\\to-\\infty}f(x)=-\\infty$")),
   Q("បង្ហាញថាបន្ទាត់ $(D)\\colon y=-x+"+m+"$ ជាអាស៊ីមតូតទ្រេតនៃ $(C)$ ។ សិក្សាទីតាំងនៃ $(C)$ ធៀបនឹង $(D)$ ។","$f(x)-(-x+"+m+")=-"+c+"e^{-x}<0$ , $(C)$ នៅក្រោម $(D)$",
     W(AL(["f(x)-(-x+"+m+")&=-"+c+"e^{-x}\\xrightarrow[x\\to+\\infty]{}0"]),"⇒ $(D)$ ជាអាស៊ីមតូតទ្រេតខាង $+\\infty$ ។ ដោយ $-"+c+"e^{-x}<0$ គ្រប់ $x$ នោះ $(C)$ នៅក្រោម $(D)$ ។")),
   Q("គណនា $f'(x)$ ។ សិក្សាអថេរភាពនៃ $f$ និងគណនាតម្លៃអតិបរមារបស់ $f$ ។","កើនលើ $(-\\infty,"+L+"]$ , ចុះលើ $["+L+",+\\infty)$ , អតិបរមា $f("+L+")="+mx+"$",
     W(AL(["f'(x)&=-1+"+c+"e^{-x}=\\dfrac{"+c+"-e^x}{e^x}","f'(x)=0&\\iff e^x="+c+"\\iff x="+L]),VT(["-\\infty",L,"+\\infty"],["","+","0","-",""],["-\\infty",UP,mx,DN,"-\\infty"]),
       AL(["f("+L+")&="+m+"-"+L+"-"+c+"e^{-"+L+"}="+m+"-"+L+"-1="+mx]))),
   Q("$A$ ជាចំណុចនៃ $(C)$ ដែលមានអាប់ស៊ីស $0$ ។ រកសមីការបន្ទាត់ប៉ះ $(T)$ ត្រង់ $A$ ។","$(T)\\colon y="+kx(c-1)+"+"+(m-c)+"$",
     AL(["f(0)&="+m+"-0-"+c+"="+(m-c)+"\\ ,\\ f'(0)=-1+"+c+"="+(c-1),"(T)\\colon y&=f'(0)(x-0)+f(0)="+kx(c-1)+"+"+(m-c)])),
   Q("បង្ហាញថាសមីការ $f(x)=0$ មានឫសតែមួយគត់ $\\beta$ នៅចន្លោះ $[-1,0]$ ។","$f(-1)<0<f(0)$ និង $f$ កើនដាច់ខាតលើ $[-1,0]$",
     W(AL(["f(-1)&="+fm1+"-"+c+"e\\approx"+fm1+"-"+n9(c*2.718)+"<0","f(0)&="+(m-c)+">0"]),"ដោយ $[-1,0]\\subset(-\\infty,"+L+"]$ $f$ ជាប់ និងកើនដាច់ខាតលើ $[-1,0]$ ហើយ $f(-1)f(0)<0$ ⇒ មានឫសតែមួយគត់ $\\beta\\in[-1,0]$ ។")),
   Q("សង់បន្ទាត់ប៉ះ $(T)$ អាស៊ីមតូត $(D)$ និងក្រាប $(C)$ ។","មើលរូប","សង់តាមតារាងអថេរភាព អាស៊ីមតូត $(D)$ បន្ទាត់ប៉ះ $(T)$ និងចំណុច $A(0,"+(m-c)+")$ (មើលរូបខាងលើ) ។")]}}},
 /* f(x) = x + a + 4/(1+eˣ) (ទម្រង់ x + (… )/(1+eˣ)) */
 {id:"fe1",t:"សិក្សាអនុគមន៍ x + (p + q eˣ)/(1 + eˣ)",lv:3,f:function(){return fEB(ri(-4,1),4,true)}}];
/* x + a + b/(eˣ+1) · b ∈ {2,4} */
function fEB(a,b,alt){
  var hi=a+b,num=(a+b?String(a+b):"")+(a?(a<0?"-":(a+b?"+":""))+(Math.abs(a)===1?"":Math.abs(a))+"e^x":""),fx=alt?"x+\\dfrac{"+num+"}{1+e^x}":"x"+sg(a)+"+\\dfrac{"+b+"}{e^x+1}",f0=F(2*a+b,2),d0=F(4-b,4);
  var fdn=b===2?"\\dfrac{e^{2x}+1}{(e^x+1)^2}":"\\left(\\dfrac{e^x-1}{e^x+1}\\right)^2";
  return{kfig:GRF(["y=x"+js(a)+"+"+b+"/(exp(x)+1) blue","dash y=x"+js(a),"dash y=x"+js(hi)].concat(b===2?["y="+r3(1-b/4)+"*x"+js(+r3(a+b/2))+" gray"]:[]),[-5,5,a-5,hi+5]),
   inst:"គេមានអនុគមន៍ $f$ កំណត់លើ $\\mathbb R$ ដោយ $f(x)="+fx+"$ ហើយមានក្រាប $(C)$ ។",it:[
   Q((alt?"បង្ហាញថា $f(x)=x"+sg(a)+"+\\dfrac{"+b+"}{1+e^x}$ ។ ":"")+"គណនាលីមីតនៃអនុគមន៍ $f$ ត្រង់ $+\\infty$ និងត្រង់ $-\\infty$ ។","$\\lim\\limits_{x\\to+\\infty}f(x)=+\\infty$ , $\\lim\\limits_{x\\to-\\infty}f(x)=-\\infty$",
     W(alt?AL(["\\dfrac{"+num+"}{1+e^x}&=\\dfrac{"+a+"(1+e^x)+"+b+"}{1+e^x}="+a+"+\\dfrac{"+b+"}{1+e^x}"]):"","ដោយ $0<\\dfrac{"+b+"}{e^x+1}<"+b+"$ ៖ ពេល $x\\to+\\infty$ ⇒ $f(x)\\to+\\infty$ ; ពេល $x\\to-\\infty$ ⇒ $f(x)\\to-\\infty$ ។")),
   Q("បង្ហាញថាបន្ទាត់ $(d_1)\\colon y=x"+sg(a)+"$ ជាអាស៊ីមតូតទ្រេតខាង $+\\infty$ រួចសិក្សាទីតាំងធៀបរវាង $(C)$ និង $(d_1)$ ។","$f(x)-(x"+sg(a)+")=\\dfrac{"+b+"}{e^x+1}>0$ , $(C)$ នៅលើ $(d_1)$",
     W(AL(["f(x)-(x"+sg(a)+")&=\\dfrac{"+b+"}{e^x+1}\\xrightarrow[x\\to+\\infty]{}0"]),"⇒ $(d_1)$ ជាអាស៊ីមតូតទ្រេតខាង $+\\infty$ ។ ដោយ $\\dfrac{"+b+"}{e^x+1}>0$ នោះ $(C)$ នៅលើ $(d_1)$ ។")),
   Q("បង្ហាញថា $f(x)=x"+sg(hi)+"-\\dfrac{"+b+"e^x}{e^x+1}$ ។ រួចបង្ហាញថា $(d_2)\\colon y=x"+sg(hi)+"$ ជាអាស៊ីមតូតទ្រេតខាង $-\\infty$ ។ សិក្សាទីតាំងធៀបរវាង $(C)$ និង $(d_2)$ ។","$f(x)-(x"+sg(hi)+")=-\\dfrac{"+b+"e^x}{e^x+1}<0$ , $(C)$ នៅក្រោម $(d_2)$",
     W(AL(["\\dfrac{"+b+"}{e^x+1}&=\\dfrac{"+b+"(e^x+1)-"+b+"e^x}{e^x+1}="+b+"-\\dfrac{"+b+"e^x}{e^x+1}","f(x)&=x"+sg(hi)+"-\\dfrac{"+b+"e^x}{e^x+1}","f(x)-(x"+sg(hi)+")&=-\\dfrac{"+b+"e^x}{e^x+1}\\xrightarrow[x\\to-\\infty]{}0"]),"⇒ $(d_2)$ ជាអាស៊ីមតូតទ្រេតខាង $-\\infty$ ហើយ $(C)$ នៅក្រោម $(d_2)$ ។")),
   Q("គណនា $f'(x)$ រួចសិក្សាសញ្ញា $f'(x)$ ។ សង់តារាងអថេរភាពនៃអនុគមន៍ ។","$f'(x)="+fdn+"\\ge0$ , $f$ កើនលើ $\\mathbb R$",
     W(AL(["f'(x)&=1-\\dfrac{"+b+"e^x}{(e^x+1)^2}=\\dfrac{e^{2x}+2e^x+1-"+b+"e^x}{(e^x+1)^2}","&="+fdn+"\\ge0"]),"⇒ $f$ កើនលើ $\\mathbb R$ ។ $f(0)="+f0+"$",VT(["-\\infty","0","+\\infty"],["","+",b===4?"0":"","+",""],["-\\infty",UP,f0,UP,"+\\infty"]))),
   Q("សរសេរសមីការបន្ទាត់ប៉ះ $(T)$ ប៉ះក្រាប $(C)$ ត្រង់ $x=0$ ។","$(T)\\colon y="+(b===4?f0:(d0==="1"?"":d0)+"x"+(f0.charAt(0)==="-"?"":"+")+f0)+"$",
     AL(["f(0)&="+a+"+\\dfrac{"+b+"}{2}="+f0+"\\ ,\\ f'(0)=1-\\dfrac{"+b+"}{4}="+d0,"(T)\\colon y&="+(b===4?f0:(d0==="1"?"":d0)+"x"+(f0.charAt(0)==="-"?"":"+")+f0)])),
   Q("សង់ក្រាប $(C)$ បន្ទាត់ $(d_1), (d_2)$"+(b===2?" និង $(T)$":"")+" ក្នុងតម្រុយតែមួយ ។","មើលរូប","សង់អាស៊ីមតូតទាំងពីរ ចំណុច $(0,"+f0+")$ និងក្រាប $(C)$ (មើលរូបខាងលើ) ។")]}}
var FLN=[
 /* f(x) = x + b − ln x / x */
 {id:"fln",t:"សិក្សាអនុគមន៍ x + b − ln x / x (ទម្រង់បាក់ឌុប)",lv:3,f:function(){
  var b=ri(0,2),fx="x"+sg(b)+"-\\dfrac{\\ln x}{x}",mn=1+b;
  return{kfig:GRF(["y=x+"+b+"-ln(x)/x blue","dash y=x+"+b,"A(1,"+mn+")"],[-0.5,4.5,-1,7]),inst:"គេមានអនុគមន៍ $f$ កំណត់លើ $(0;+\\infty)$ ដោយ $f(x)="+fx+"$ និងមានក្រាបតំណាង $(C)$ ។",it:[
   Q("គណនា $\\lim\\limits_{x\\to0^+}f(x)$ និង $\\lim\\limits_{x\\to+\\infty}f(x)$ ។","$+\\infty$ , $+\\infty$",
     W("• $x\\to0^+$ ៖ $\\ln x\\to-\\infty$ និង $\\dfrac1x\\to+\\infty$ ⇒ $-\\dfrac{\\ln x}{x}\\to+\\infty$ ⇒ $\\lim\\limits_{x\\to0^+}f(x)=+\\infty$","• $x\\to+\\infty$ ៖ $\\dfrac{\\ln x}{x}\\to0$ ⇒ $\\lim\\limits_{x\\to+\\infty}f(x)=+\\infty$")),
   Q("គេឱ្យ $g(x)=x^2-1+\\ln x$ ។ សិក្សាសញ្ញានៃ $g(x)$ រួចបង្ហាញថា $f'(x)=\\dfrac{g(x)}{x^2}$ ។","$g<0$ លើ $(0,1)$ , $g(1)=0$ , $g>0$ លើ $(1,+\\infty)$",
     W("$g'(x)=2x+\\dfrac1x>0$ ⇒ $g$ កើនដាច់ខាតលើ $(0,+\\infty)$ និង $g(1)=0$ ។ ដូចនេះ $g(x)<0$ ពេល $0<x<1$ និង $g(x)>0$ ពេល $x>1$ ។",AL(["f'(x)&=1-\\dfrac{\\frac1x\\cdot x-\\ln x}{x^2}=1-\\dfrac{1-\\ln x}{x^2}","&=\\dfrac{x^2-1+\\ln x}{x^2}=\\dfrac{g(x)}{x^2}"]))),
   Q("សង់តារាងអថេរភាពនៃ $f$ ។","$f$ ចុះលើ $(0,1]$ , កើនលើ $[1,+\\infty)$ , អប្បបរមា $f(1)="+mn+"$",
     W("សញ្ញា $f'(x)$ ជាសញ្ញានៃ $g(x)$ ។ $f(1)=1"+sg(b)+"-0="+mn+"$",VT(["0","1","+\\infty"],["","-","0","+",""],["+\\infty",DN,String(mn),UP,"+\\infty"]))),
   Q("បង្ហាញថាបន្ទាត់ $(D)\\colon y=x"+sg(b)+"$ ជាអាស៊ីមតូតទ្រេតនៃ $(C)$ រួចសិក្សាទីតាំងធៀបរវាង $(C)$ និង $(D)$ ។","$(C)$ លើ $(D)$ ពេល $0<x<1$ , ក្រោមពេល $x>1$ , កាត់ត្រង់ $(1,"+mn+")$",
     W(AL(["f(x)-(x"+sg(b)+")&=-\\dfrac{\\ln x}{x}\\xrightarrow[x\\to+\\infty]{}0"]),"⇒ $(D)$ ជាអាស៊ីមតូតទ្រេត ។ សញ្ញានៃ $-\\dfrac{\\ln x}{x}$ ផ្ទុយពីសញ្ញា $\\ln x$ ៖","• $0<x<1$ ៖ $(C)$ នៅលើ $(D)$ · $x>1$ ៖ $(C)$ នៅក្រោម $(D)$ · $x=1$ ៖ កាត់គ្នាត្រង់ $(1,"+mn+")$")),
   Q("សង់ $(D)$ និង $(C)$ ក្នុងតម្រុយតែមួយ ។","មើលរូប","សង់តាមតារាងអថេរភាព និងអាស៊ីមតូត $(D)$ (មើលរូបខាងលើ) ។"),
   Q("គណនាផ្ទៃក្រឡាខណ្ឌដោយ $(C)$ , $(D)$ និងបន្ទាត់ $x=1$ , $x=e$ ។","$S=\\dfrac12$ (ឯកតាផ្ទៃ)",
     W("លើ $[1,e]$ ៖ $(D)$ នៅលើ $(C)$ ៖",AL(["S&=\\int_1^e\\dfrac{\\ln x}{x}dx=\\left[\\dfrac{\\ln^2x}{2}\\right]_1^e=\\dfrac12"])))]}}},
 /* f(x) = a + b ln x / x */
 {id:"fln2",t:"សិក្សាអនុគមន៍ a + b ln x / x",lv:3,f:function(){
  var a=ri(1,3),b=ri(1,3),bb=b===1?"":b,fx=a+"+\\dfrac{"+bb+"\\ln x}{x}",mxv=a+"+\\dfrac{"+b+"}{e}",F1=a+2+ri(0,2),K=F1-a;
  return{kfig:GRF(["y="+a+"+"+b+"*ln(x)/x blue","dash y="+a,"y="+b+"*x"+js(a-b)+" gray"],[-0.5,9,a-4,a+2]),inst:"អនុគមន៍ $f$ កំណត់ដោយ $y=f(x)="+fx+"$ ហើយមានក្រាប $(C)$ ។",it:[
   Q("គណនាលីមីត $\\lim\\limits_{x\\to0^+}f(x)$ និង $\\lim\\limits_{x\\to+\\infty}f(x)$ ។ ទាញរកអាស៊ីមតូតនៃក្រាប $(C)$ ។","$-\\infty$ , $"+a+"$ , អាស៊ីមតូតឈរ $x=0$ , អាស៊ីមតូតដេក $y="+a+"$",
     W("ដែនកំណត់ $(0,+\\infty)$ ។ • $x\\to0^+$ ៖ $\\ln x\\to-\\infty$ , $\\dfrac1x\\to+\\infty$ ⇒ $f(x)\\to-\\infty$ ⇒ អាស៊ីមតូតឈរ $x=0$","• $x\\to+\\infty$ ៖ $\\dfrac{\\ln x}{x}\\to0$ ⇒ $f(x)\\to"+a+"$ ⇒ អាស៊ីមតូតដេក $y="+a+"$")),
   Q("គណនាដេរីវេ $f'(x)$ បញ្ជាក់ទិសដៅអថេរភាពនៃ $f$ ។ សង់តារាងអថេរភាពនៃ $f$ ។","$f'(x)=\\dfrac{"+bb+"(1-\\ln x)}{x^2}$ , កើនលើ $(0,e]$ , ចុះលើ $[e,+\\infty)$ , អតិបរមា $f(e)="+mxv+"$",
     W(AL(["f'(x)&="+bb+"\\cdot\\dfrac{\\frac1x\\cdot x-\\ln x}{x^2}=\\dfrac{"+bb+"(1-\\ln x)}{x^2}"]),"សញ្ញា $f'$ ជាសញ្ញានៃ $1-\\ln x$ ៖ $f'>0$ ពេល $0<x<e$ · $f'<0$ ពេល $x>e$ ។ $f(e)="+mxv+"$",
       VT(["0","e","+\\infty"],["","+","0","-",""],["-\\infty",UP,mxv,DN,String(a)]))),
   Q("សរសេរសមីការបន្ទាត់ប៉ះ $(T)$ ទៅនឹងក្រាប $(C)$ ត្រង់ $x_0=1$ ។ សង់បន្ទាត់ $(T)$ និងក្រាប $(C)$ ។","$(T)\\colon y="+kx(b)+sg(a-b)+"$",
     W(AL(["f(1)&="+a+"\\ ,\\ f'(1)="+b,"(T)\\colon y&="+b+"(x-1)+"+a+"="+kx(b)+sg(a-b)]),"សង់ $(T)$ អាស៊ីមតូត និង $(C)$ (មើលរូបខាងលើ) ។")),
   Q("រកព្រីមីទីវ $F(x)$ នៃអនុគមន៍ $f(x)$ ដោយស្គាល់ $F(1)="+F1+"$ ។","$F(x)="+kx(a)+"+"+(b===2?"":F(b,2))+"\\ln^2x"+sg(K)+"$",
     W("ដោយ $\\displaystyle\\int\\dfrac{\\ln x}{x}dx=\\dfrac{\\ln^2x}{2}$ ៖",AL(["F(x)&="+kx(a)+"+"+(b===2?"":F(b,2))+"\\ln^2x+C","F(1)&="+a+"+0+C="+F1+"\\Rightarrow C="+K])))]}}},
 /* g(x) = x² + 1 − ln x · f(x) = m − x − ln x / x */
 {id:"f1x",t:"សិក្សាអនុគមន៍ m − x − ln x / x (g(x) = x² + 1 − ln x)",lv:3,f:function(){
  var m=ri(0,3),fx=(m?m+"-x":"-x")+"-\\dfrac{\\ln x}{x}",dl="y=-x"+sg(m),gm="\\dfrac32+\\dfrac{\\ln2}{2}";
  return{kfig:GRF(["y="+m+"-x-ln(x)/x blue","dash y="+m+"-x","A(1,"+(m-1)+")"],[-0.5,4.5,m-5,m+3]),
   inst:"I. គេមានអនុគមន៍ $g$ កំណត់លើ $(0,+\\infty)$ ដោយ $g(x)=x^2+1-\\ln x$ ។ II. គេមាន $f$ ជាអនុគមន៍កំណត់លើ $(0,+\\infty)$ ដោយ $f(x)="+fx+"$ ហើយមានក្រាប $(C)$ ។",it:[
   Q("គណនាដេរីវេ $g'(x)$ រួចគូសតារាងអថេរភាពនៃ $g$ ហើយទាញរកសញ្ញានៃ $g$ ។","អប្បបរមា $g\\left(\\dfrac{\\sqrt2}{2}\\right)="+gm+">0$ ⇒ $g(x)>0$",
     W(AL(["g'(x)&=2x-\\dfrac1x=\\dfrac{2x^2-1}{x}","g'(x)=0&\\iff x=\\dfrac{\\sqrt2}{2}","g\\left(\\dfrac{\\sqrt2}{2}\\right)&=\\dfrac12+1-\\ln\\dfrac{\\sqrt2}{2}="+gm]),
       VT(["0","\\frac{\\sqrt2}{2}","+\\infty"],["","-","0","+",""],["+\\infty",DN,gm,UP,"+\\infty"],"g"),"តម្លៃអប្បបរមា $"+gm+">0$ ⇒ $g(x)>0$ គ្រប់ $x>0$ ។")),
   Q("គណនា $f'(x)$ ហើយទាញ $f'(x)$ ជាអនុគមន៍នៃ $g(x)$ ព្រមទាំងបញ្ជាក់សញ្ញា $f'(x)$ ។","$f'(x)=-\\dfrac{g(x)}{x^2}<0$",
     W(AL(["f'(x)&=-1-\\dfrac{1-\\ln x}{x^2}","&=\\dfrac{-x^2-1+\\ln x}{x^2}=-\\dfrac{g(x)}{x^2}"]),"ដោយ $g(x)>0$ នោះ $f'(x)<0$ គ្រប់ $x>0$ ។")),
   Q("គណនាលីមីតនៃ $f$ ត្រង់ $0^+$ និង $+\\infty$ រួចគូសតារាងអថេរភាពនៃ $f$ ។","$+\\infty$ , $-\\infty$ , $f$ ចុះលើ $(0,+\\infty)$",
     W("• $x\\to0^+$ ៖ $-\\dfrac{\\ln x}{x}\\to+\\infty$ ⇒ $f(x)\\to+\\infty$ · • $x\\to+\\infty$ ៖ $\\dfrac{\\ln x}{x}\\to0$ , $-x\\to-\\infty$ ⇒ $f(x)\\to-\\infty$",VT(["0","+\\infty"],["","-",""],["+\\infty",DN,"-\\infty"]))),
   Q("បង្ហាញថាបន្ទាត់ $d\\colon "+dl+"$ ជាអាស៊ីមតូតទ្រេតនៃក្រាប $(C)$ ខាង $+\\infty$ ។ សិក្សាទីតាំងរវាង $(C)$ និង $d$ ។","$(C)$ លើ $d$ ពេល $0<x<1$ , ក្រោមពេល $x>1$ , កាត់ត្រង់ $(1,"+(m-1)+")$",
     W(AL(["f(x)-("+(m?m+"-x":"-x")+")&=-\\dfrac{\\ln x}{x}\\xrightarrow[x\\to+\\infty]{}0"]),"⇒ $d$ ជាអាស៊ីមតូតទ្រេត ។ • $0<x<1$ ៖ $\\ln x<0$ ⇒ $(C)$ នៅលើ $d$ · • $x>1$ ៖ $(C)$ នៅក្រោម $d$ · • កាត់គ្នាត្រង់ $(1,"+(m-1)+")$")),
   Q("គូសខ្សែកោង $(C)$ និងបន្ទាត់ $d$ ក្នុងតម្រុយតែមួយ ។","មើលរូប","សង់តាមតារាងអថេរភាព និងអាស៊ីមតូត $d$ (មើលរូបខាងលើ) ។")]}}}];

/* ===== បន្ថែមពីសៀវភៅលំហាត់ថ្នាក់ទី១២ (មានតែទម្រង់ដែលមិនទាន់មាន) ===== */
function sqx(v,h){return h?"("+v+(h>0?"-"+h:"+"+(-h))+")^2":v+"^2"}
function lfx(v,h){return h?"("+v+(h>0?"-"+h:"+"+(-h))+")":v}
var PT3=[[3,4,5],[4,3,5],[6,8,10],[8,6,10],[5,12,13],[12,5,13]];
C.push({id:"conj",t:"សមីការមាន z̄ · iⁿ · ទម្រង់ត្រីកោណមាត្រនៃផលបូក",lv:2,f:function(){
  var p=nz(-4,4),q=nz(-4,4),a=pick([2,3,-2]),b,c;do{b=nz(-2,2);c=nz(-2,2)}while(a*a===b*b+c*c);
  var re=a*p+b*p+c*q,im=a*q+c*p-b*q,n=ri(2010,2030),r4=n%4,iv=["1","i","-1","-i"][r4];
  var SM=pick([[1,1,1,3],[-1,1,1,9],[2,-2,2,-3],[-3,3,3,9],[3,-3,3,-3],[-2,-2,2,-9]]),z1=-ri(1,5),rT=(SM[2]===1?"":SM[2])+"\\sqrt2";
  var bz=b<0?"-("+cxi(-b,-c)+")":"+("+cxi(b,c)+")",D=(a+b)*(a-b)-c*c,zs={re:S(SM[0]),im:S(SM[1]),r:S(SM[2],1,2),a:SM[3]};
  return{inst:"នៅក្នុងសំណុំចំនួនកុំផ្លិច $\\mathbb C$ ៖",it:[
    Q("ដោះស្រាយសមីការ $"+a+"z"+bz+"\\bar z="+cxi(re,im)+"$ ។","$z="+cxi(p,q)+"$",
      W("តាង $z=x+yi$ ($x,y\\in\\mathbb R$) នោះ $\\bar z=x-yi$ ៖",AL([a+"(x+yi)+("+cxi(b,c)+")(x-yi)&="+cxi(re,im),"("+kx(a+b)+tm(c,"y")+")+("+kx(c)+tm(a-b,"y")+")i&="+cxi(re,im)]),
        "ផ្ទឹមផ្នែកពិត និងផ្នែកនិមិត្ត ៖","$$\\begin{cases}"+kx(a+b)+tm(c,"y")+"="+re+"\\\\"+kx(c)+tm(a-b,"y")+"="+im+"\\end{cases}$$",
        AL(["D&="+pn(a+b)+"\\times"+pn(a-b)+"-"+pn(c)+"\\times"+pn(c)+"="+D,"x&=\\dfrac{"+pn(re)+"\\times"+pn(a-b)+"-"+pn(c)+"\\times"+pn(im)+"}{"+D+"}="+p,"y&=\\dfrac{"+pn(a+b)+"\\times"+pn(im)+"-"+pn(c)+"\\times"+pn(re)+"}{"+D+"}="+q]))),
    Q("គណនា $i^{"+n+"}$ ។","$i^{"+n+"}="+iv+"$",AL(["i^4&=1\\ ,\\ "+n+"=4\\times"+Math.floor(n/4)+"+"+r4,"i^{"+n+"}&=\\left(i^4\\right)^{"+Math.floor(n/4)+"}\\times i^{"+r4+"}=i^{"+r4+"}="+iv])),
    Q("គេមាន $z_1="+z1+"$ និង $z_2="+cxi(SM[0]-z1,SM[1])+"$ ។ គណនា $z_1+z_2$ រួចសរសេរ $z_1+z_2$ ជាទម្រង់ត្រីកោណមាត្រ ។","$z_1+z_2="+cxi(SM[0],SM[1])+"="+trig(rT,SM[3])+"$",
      W(AL(["z_1+z_2&="+pn(z1)+"+("+cxi(SM[0]-z1,SM[1])+")="+cxi(SM[0],SM[1])]),marg(zs,"z_1+z_2"),"ដូចនេះ $z_1+z_2="+trig(rT,SM[3])+"$"))]}}});
var ODE1=[{id:"ode1",t:"ED លំដាប់ទី១ · ចម្លើយ y₀ · ចម្លើយទូទៅ · y(0)",lv:2,f:function(){
  var a=pick([1,2,3,-1,-2]),b=nz(-3,3),c=ri(-3,4),E="e^{"+ex(-a)+"}",ay=a===1?"+y":a===-1?"-y":(a>0?"+":"")+a+"y",A=Math.abs(a)===1?"":Math.abs(a);
  return{inst:"គេមានសមីការឌីផេរ៉ង់ស្យែល $(E)\\colon y'"+ay+"=("+pl([2,b])+")"+E+"$ ។",it:[
    Q("បង្ហាញថាអនុគមន៍ $y_0$ កំណត់លើ $\\mathbb R$ ដោយ $y_0(x)=("+pl([1,b,0])+")"+E+"$ ជាចម្លើយនៃ $(E)$ ។","$y_0'"+ay.replace("y","y_0")+"=("+pl([2,b])+")"+E+"$ ពិត",
      W("គណនាដេរីវេ (រូបមន្ត $(uv)'=u'v+uv'$) ៖",AL(["y_0'&=("+pl([2,b])+")"+E+(a>0?"-":"+")+A+"("+pl([1,b,0])+")"+E,"y_0'"+ay.replace("y","y_0")+"&=("+pl([2,b])+")"+E+(a>0?"-":"+")+A+"("+pl([1,b,0])+")"+E+(a>0?"+":"-")+A+"("+pl([1,b,0])+")"+E,"&=("+pl([2,b])+")"+E]),"ដូចនេះ $y_0$ ជាចម្លើយនៃ $(E)$ ។")),
    Q("ដោះស្រាយសមីការ $(E')\\colon y'"+ay+"=0$ ។","$y=Ce^{"+ex(-a)+"}$ , $C\\in\\mathbb R$","សមីការ $y'+ay=0$ មានចម្លើយទូទៅ $y=Ce^{-ax}$ ។ នៅទីនេះ $a="+a+"$ ៖\n$y=Ce^{"+ex(-a)+"}$ ($C\\in\\mathbb R$)"),
    Q("បង្ហាញថា $y$ ជាចម្លើយនៃ $(E)$ លុះត្រាតែ $y-y_0$ ជាចម្លើយនៃ $(E')$ ។ ទាញរកចម្លើយទូទៅនៃ $(E)$ ។","$y=("+pl([1,b,0])+"+C)"+E+"$",
      W("ដោយ $y_0'"+ay.replace("y","y_0")+"=("+pl([2,b])+")"+E+"$ ៖",AL(["y'"+ay+"=("+pl([2,b])+")"+E+"&\\iff y'"+ay+"=y_0'"+ay.replace("y","y_0"),"&\\iff(y-y_0)'"+ay.replace("y","(y-y_0)")+"=0"]),
        "ដូចនេះ $y-y_0=Ce^{"+ex(-a)+"}$ នាំឱ្យ $y=("+pl([1,b,0])+"+C)"+E+"$ ($C\\in\\mathbb R$)")),
    Q("រកចម្លើយពិសេសនៃ $(E)$ ដែលផ្ទៀងផ្ទាត់ $y(0)="+c+"$ ។","$y=("+pl([1,b,c])+")"+E+"$",AL(["y(0)&=(0+0+C)e^0=C="+c,"y&=("+pl([1,b,c])+")"+E]))]}}},
 {id:"ode1p",t:"ED លំដាប់ទី១ · y′ + ay = mx + n (ចម្លើយពហុធា)",lv:2,f:function(){
  var a=pick([1,2,3,-1,-2,-3]),p=nz(-3,3),q=ri(-3,3),m=a*p,n=p+a*q,y0=ri(-3,5),K=y0-q,E="e^{"+ex(-a)+"}",ay=a===1?"+y":a===-1?"-y":(a>0?"+":"")+a+"y";
  return{inst:"គេមានសមីការឌីផេរ៉ង់ស្យែល $(E)\\colon y'"+ay+"="+pl([m,n])+"$ ។",it:[
    Q("កំណត់ចំនួនពិត $p$ និង $q$ ដើម្បីឱ្យ $y_p=px+q$ ជាចម្លើយពិសេសនៃ $(E)$ ។","$p="+p+"$ , $q="+q+"$",
      W("$y_p'=p$ ។ ជំនួសក្នុង $(E)$ ៖",AL(["p"+(a>0?"+":"-")+(Math.abs(a)===1?"":Math.abs(a))+"(px+q)&="+pl([m,n]),kx(a,"p")+"x+(p"+tm(a,"q")+")&="+pl([m,n])]),"ផ្ទឹមមេគុណ ៖",
        AL([kx(a,"p")+"&="+m+"\\Rightarrow p="+p,pn(p)+tm(a,"q")+"&="+n+"\\Rightarrow q="+q]))),
    Q("ទាញរកចម្លើយទូទៅនៃ $(E)$ ។","$y=C"+E+(pl([p,q]).charAt(0)==="-"?"":"+")+pl([p,q])+"$",
      "ចម្លើយទូទៅ = ចម្លើយទូទៅនៃ $y'"+ay+"=0$ + ចម្លើយពិសេស $y_p$ ៖\n$y=C"+E+(pl([p,q]).charAt(0)==="-"?"":"+")+pl([p,q])+"$ ($C\\in\\mathbb R$)"),
    Q("រកចម្លើយពិសេសនៃ $(E)$ ដែល $y(0)="+y0+"$ ។","$y="+(K===1?"":K===-1?"-":K)+(K?E:"")+(K?(p>0?"+":""):"")+pl([p,q])+"$",
      AL(["y(0)&=C+"+pn(q)+"="+y0+"\\Rightarrow C="+K,"y&="+(K===1?"":K===-1?"-":K)+(K?E:"")+(K?(p>0?"+":""):"")+pl([p,q])]))]}}}];
SPC.push({id:"sph",t:"ស្វ៊ែ · អង្កត់ផ្ចិត [AB] · ប្លង់ប៉ះ",lv:2,f:function(){
  var A0,B0;do{A0=[ri(-2,4),ri(-2,4),ri(-2,4)];B0=A0.map(function(v){return v+2*ri(-2,2)})}while(A0.join()===B0.join());
  var I=A0.map(function(v,i){return(v+B0[i])/2}),u=A0.map(function(v,i){return v-I[i]}),R2=u[0]*u[0]+u[1]*u[1]+u[2]*u[2],d=-(u[0]*A0[0]+u[1]*A0[1]+u[2]*A0[2]);
  var V=function(v){return"("+v.join(",")+")"},eqS=sqx("x",I[0])+"+"+sqx("y",I[1])+"+"+sqx("z",I[2])+"="+R2;
  return{inst:"នៅក្នុងតម្រុយអរតូណរម៉ាល់ $(O,\\vec i,\\vec j,\\vec k)$ គេមានចំណុច $A"+V(A0)+"$ និង $B"+V(B0)+"$ ។",it:[
    Q("រកកូអរដោនេផ្ចិត $I$ និងកាំ $R$ នៃស្វ៊ែ $(S)$ ដែលមានអង្កត់ផ្ចិត $[AB]$ ។","$I"+V(I)+"$ , $R="+sqrtT(R2)+"$",
      W("$I$ ជាចំណុចកណ្ដាលនៃ $[AB]$ ៖",AL(["I&=\\left(\\dfrac{"+A0[0]+sg(B0[0])+"}{2},\\dfrac{"+A0[1]+sg(B0[1])+"}{2},\\dfrac{"+A0[2]+sg(B0[2])+"}{2}\\right)="+V(I),"R&=IA=\\sqrt{"+pn(u[0])+"^2+"+pn(u[1])+"^2+"+pn(u[2])+"^2}=\\sqrt{"+R2+"}"+(sqrtT(R2)==="\\sqrt{"+R2+"}"?"":"="+sqrtT(R2))]))),
    Q("សរសេរសមីការស្វ៊ែ $(S)$ ។","$(S)\\colon "+eqS+"$","ស្វ៊ែផ្ចិត $I(a,b,c)$ កាំ $R$ ៖ $(x-a)^2+(y-b)^2+(z-c)^2=R^2$\n$(S)\\colon "+eqS+"$"),
    Q("រកសមីការប្លង់ $(P)$ ដែលប៉ះនឹងស្វ៊ែ $(S)$ ត្រង់ចំណុច $A$ ។","$(P)\\colon "+eqN([[u[0],"x"],[u[1],"y"],[u[2],"z"],[d,""]])+"$",
      W("ប្លង់ប៉ះត្រង់ $A$ កែងនឹងកាំ $IA$ ⇒ វ៉ិចទ័រណរម៉ាល់ $\\overrightarrow{IA}"+V(u)+"$ ៖",AL([pn(u[0])+"(x-"+pn(A0[0])+")+"+pn(u[1])+"(y-"+pn(A0[1])+")+"+pn(u[2])+"(z-"+pn(A0[2])+")&=0",eqN([[u[0],"x"],[u[1],"y"],[u[2],"z"],[d,""]]).replace("=0","&=0")])))]}}});
HYP.push({id:"hyp2",t:"អ៊ីពែបូល · កំណុំ + ផលដកចម្ងាយ",lv:2,f:function(){
  var T=pick(PT3),a=T[0],b=T[1],c=T[2],h=ri(-3,8),k=ri(-3,3);
  var ys=k?"y"+(k>0?"-"+k:"+"+(-k)):"y",xs=lfx("x",h);
  return{inst:"គ្រប់ចំណុច $M$ នៃអ៊ីពែបូល $(H)$ ផ្ទៀងផ្ទាត់ $|MF_1-MF_2|="+2*a+"$ ដែល $F_1("+(h-c)+","+k+")$ និង $F_2("+(h+c)+","+k+")$ ។",it:[
    Q("រកសមីការស្តង់ដានៃ $(H)$ ។","$\\dfrac{"+sqx("x",h)+"}{"+a*a+"}-\\dfrac{"+sqx("y",k)+"}{"+b*b+"}=1$",
      W("ផ្ចិត $I$ ជាចំណុចកណ្ដាលនៃ $[F_1F_2]$ ៖ $I("+h+","+k+")$ ។ អ័ក្សទទឹងស្របអ័ក្សអាប់ស៊ីស ៖",AL(["2a&="+2*a+"\\Rightarrow a="+a,"2c&=F_1F_2="+2*c+"\\Rightarrow c="+c,"b^2&=c^2-a^2="+c*c+"-"+a*a+"="+b*b]),"$(H)\\colon\\dfrac{"+sqx("x",h)+"}{"+a*a+"}-\\dfrac{"+sqx("y",k)+"}{"+b*b+"}=1$")),
    Q("រកកូអរដោនេកំពូល និងសមីការអាស៊ីមតូតនៃ $(H)$ ។","កំពូល $("+(h-a)+","+k+")$ , $("+(h+a)+","+k+")$ , អាស៊ីមតូត $"+ys+"=\\pm"+F(b,a)+xs+"$",
      W("កំពូល ៖ $(h\\pm a,k)$ ⇒ $("+(h-a)+","+k+")$ និង $("+(h+a)+","+k+")$","អាស៊ីមតូត ៖ $y-k=\\pm\\dfrac ba(x-h)$ ⇒ $"+ys+"=\\pm"+F(b,a)+xs+"$")),
    Q("គណនាចំណាកផ្ចិត $e$ ។","$e=\\dfrac ca="+F(c,a)+"$",AL(["e&=\\dfrac ca=\\dfrac{"+c+"}{"+a+"}"+(gcd(c,a)===1?"":"="+F(c,a))]))]}}});
PAR.push({id:"par2",t:"ប៉ារ៉ាបូល · កំពូល + បន្ទាត់ប្រាប់ទិស",lv:2,f:function(){
  var h=ri(-3,3),k=ri(-3,3),p=nz(-3,3),ver=Math.random()<.5;
  var eq=ver?sqx("x",h)+"="+4*p+lfx("y",k):sqx("y",k)+"="+4*p+lfx("x",h);
  return{inst:"ប៉ារ៉ាបូល $(P)$ មានកំពូល $S("+h+","+k+")$ និងបន្ទាត់ប្រាប់ទិស $(d)\\colon "+(ver?"y="+(k-p):"x="+(h-p))+"$ ។",it:[
    Q("រកសមីការស្តង់ដានៃ $(P)$ ។","$"+eq+"$",
      W("បន្ទាត់ប្រាប់ទិស "+(ver?"ដេក":"ឈរ")+" ⇒ អ័ក្សឆ្លុះ"+(ver?"ឈរ":"ដេក")+" ទម្រង់ $"+(ver?"(x-h)^2=4p(y-k)":"(y-k)^2=4p(x-h)")+"$ ។ ចម្ងាយពីកំពូលទៅ $(d)$ (គិតសញ្ញា) ៖",
        AL([(ver?"k-p&="+(k-p):"h-p&="+(h-p))+"\\Rightarrow p="+p]),"$(P)\\colon "+eq+"$")),
    Q("រកកូអរដោនេកំណុំ $F$ និងសមីការអ័ក្សឆ្លុះ ។",ver?"$F("+h+","+(k+p)+")$ , អ័ក្សឆ្លុះ $x="+h+"$":"$F("+(h+p)+","+k+")$ , អ័ក្សឆ្លុះ $y="+k+"$",
      ver?"កំណុំ $F(h,k+p)=("+h+","+(k+p)+")$ ។ អ័ក្សឆ្លុះកាត់តាម $S$ និង $F$ ៖ $x="+h+"$":"កំណុំ $F(h+p,k)=("+(h+p)+","+k+")$ ។ អ័ក្សឆ្លុះកាត់តាម $S$ និង $F$ ៖ $y="+k+"$"),
    Q("គណនាប្រវែងអង្កត់ធ្នូកាត់តាមកំណុំ និងកែងនឹងអ័ក្សឆ្លុះ ។ សង់ $(P)$ ។","$|4p|="+Math.abs(4*p)+"$","អង្កត់ធ្នូកាត់តាមកំណុំ និងកែងនឹងអ័ក្សឆ្លុះ មានប្រវែង $|4p|=|"+4*p+"|="+Math.abs(4*p)+"$ ។")]}}});
/* ===== ប្រភេទថ្មីពីសៀវភៅ «វិញ្ញាសាត្រៀមប្រឡងបាក់ឌុប (TexBook-School)» ===== */
C.push({id:"cpi",t:"គណនា cos(π/12) ឬ cos(5π/12) តាមចំនួនកុំផ្លិច",lv:3,f:function(){
  var q=Math.random()<.5,s=pick([1,-1]),z1="1"+(s<0?"-":"+")+"i",an=q?"\\dfrac{\\pi}{12}":"\\dfrac{5\\pi}{12}";
  var cv=q?"\\dfrac{\\sqrt6+\\sqrt2}{4}":"\\dfrac{\\sqrt6-\\sqrt2}{4}",sv=q?"\\dfrac{\\sqrt6-\\sqrt2}{4}":"\\dfrac{\\sqrt6+\\sqrt2}{4}";
  var a1=s<0?"-\\dfrac{\\pi}{4}":"\\dfrac{\\pi}{4}",z2=s<0?"\\sqrt3-i":"\\sqrt3+i",a2=s<0?"-\\dfrac{\\pi}{6}":"\\dfrac{\\pi}{6}",w=q?"\\dfrac{z_1}{z_2}":"z_1z_2";
  var alg=q?"\\dfrac{\\sqrt3+1}{4}"+(s<0?"-":"+")+"\\dfrac{\\sqrt3-1}{4}i":"(\\sqrt3-1)"+(s<0?"-":"+")+"(\\sqrt3+1)i",md=q?"\\dfrac{\\sqrt2}{2}":"2\\sqrt2",ang=(s<0?"-":"")+an;
  return{inst:"គេឱ្យចំនួនកុំផ្លិច $z_1="+z1+"$ និង $z_2="+z2+"$ ។",it:[
   Q("សរសេរ $z_1$ និង $z_2$ ជាទម្រង់ត្រីកោណមាត្រ ។","$z_1=\\sqrt2\\left(\\cos"+(s<0?"\\left("+a1+"\\right)":a1)+"+i\\sin"+(s<0?"\\left("+a1+"\\right)":a1)+"\\right)$ , $z_2=2\\left(\\cos"+(s<0?"\\left("+a2+"\\right)":a2)+"+i\\sin"+(s<0?"\\left("+a2+"\\right)":a2)+"\\right)$",
     W(AL(["|z_1|&=\\sqrt{1+1}=\\sqrt2\\ ,\\ \\cos\\theta_1=\\dfrac{\\sqrt2}{2},\\ \\sin\\theta_1="+(s<0?"-":"")+"\\dfrac{\\sqrt2}{2}\\Rightarrow\\theta_1="+a1,"|z_2|&=\\sqrt{3+1}=2\\ ,\\ \\cos\\theta_2=\\dfrac{\\sqrt3}{2},\\ \\sin\\theta_2="+(s<0?"-":"")+"\\dfrac12\\Rightarrow\\theta_2="+a2]))),
   Q("សរសេរ $"+w+"$ ជាទម្រង់ពិជគណិត និងទម្រង់ត្រីកោណមាត្រ ។","$"+w+"="+alg+"="+md+"\\left(\\cos"+(s<0?"\\left("+ang+"\\right)":ang)+"+i\\sin"+(s<0?"\\left("+ang+"\\right)":ang)+"\\right)$",
     W(q?AL(["\\dfrac{z_1}{z_2}&=\\dfrac{("+z1+")("+(s<0?"\\sqrt3+i":"\\sqrt3-i")+")}{(\\sqrt3)^2+1^2}=\\dfrac{(\\sqrt3+1)"+(s<0?"-":"+")+"(\\sqrt3-1)i}{4}="+alg,"\\dfrac{z_1}{z_2}&=\\dfrac{\\sqrt2}{2}\\left[\\cos\\left("+a1+"-"+(s<0?"\\left("+a2+"\\right)":a2)+"\\right)+i\\sin\\left(\\cdots\\right)\\right]"])
       :AL(["z_1z_2&=("+z1+")("+z2+")=\\sqrt3"+(s<0?"-":"+")+"i"+(s<0?"-":"+")+"\\sqrt3i+i^2="+alg,"z_1z_2&=\\sqrt2\\times2\\left[\\cos\\left("+a1+"+"+(s<0?"\\left("+a2+"\\right)":a2)+"\\right)+i\\sin\\left(\\cdots\\right)\\right]"]),
       "$$"+w+"="+md+"\\left(\\cos"+(s<0?"\\left("+ang+"\\right)":ang)+"+i\\sin"+(s<0?"\\left("+ang+"\\right)":ang)+"\\right)$$")),
   Q("ទាញរកតម្លៃពិតប្រាកដនៃ $\\cos"+an+"$ និង $\\sin"+an+"$ ។","$\\cos"+an+"="+cv+"$ , $\\sin"+an+"="+sv+"$",
     W("ផ្ទឹមទម្រង់ទាំងពីរ (ផ្នែកពិត និងផ្នែកនិមិត្ត) ៖",AL([md+"\\cos"+an+"&="+(q?"\\dfrac{\\sqrt3+1}{4}":"\\sqrt3-1")+"\\Rightarrow\\cos"+an+"="+cv,md+"\\sin"+an+"&="+(q?"\\dfrac{\\sqrt3-1}{4}":"\\sqrt3+1")+"\\Rightarrow\\sin"+an+"="+sv])))]}}});
INT.push({id:"pfrac",t:"បំបែកប្រភាគ a/(x−r₁) + b/(x−r₂) រួចគណនាអាំងតេក្រាល",lv:2,f:function(){
  var r1=ri(-2,1),r2=r1+ri(1,3),a=nz(-3,3),b=nz(-3,3);while(a+b===0)b=nz(-3,3);var p=a+b,q=-(a*r2+b*r1),u=r2+1,v=r2+ri(2,4);
  var den=poly([[1,"x^2"],[-(r1+r2),"x"],[r1*r2,""]]),xr=function(r){return"x"+sg(-r)},px=function(r){return r?"("+xr(r)+")":"x"},L=function(r){return"\\ln"+(v-r)+(u-r===1?"":"-\\ln"+(u-r))},lq=function(r){var n=v-r,d=u-r,g=gcd(n,d);n/=g;d/=g;return d===1?"\\ln"+n:"\\ln\\dfrac{"+n+"}{"+d+"}"};
  var res=cf(String(a))+lq(r1)+(b<0?"-":"+")+(Math.abs(b)===1?"":Math.abs(b))+lq(r2);
  return{inst:"គេឱ្យអនុគមន៍ $f(x)=\\dfrac{"+poly([[p,"x"],[q,""]])+"}{"+den+"}$ ; $x\\ne"+r1+"$ , $x\\ne"+r2+"$ ។",it:[
   Q("សរសេរ $f$ ជាទម្រង់ $f(x)=\\dfrac{a}{"+xr(r1)+"}+\\dfrac{b}{"+xr(r2)+"}$ ដែល $a,b$ ជាចំនួនពិតត្រូវកំណត់ ។","$a="+a+"$ , $b="+b+"$",
     W(AL(["\\dfrac{a}{"+xr(r1)+"}+\\dfrac{b}{"+xr(r2)+"}&=\\dfrac{a"+px(r2)+"+b"+px(r1)+"}{"+px(r1)+px(r2)+"}=\\dfrac{(a+b)x"+(r2?(r2>0?"-":"+")+(Math.abs(r2)===1?"":Math.abs(r2))+"a":"")+(r1?(r1>0?"-":"+")+(Math.abs(r1)===1?"":Math.abs(r1))+"b":"")+"}{"+den+"}"]),
       "ផ្ទឹមមេគុណជាមួយ $"+poly([[p,"x"],[q,""]])+"$ ៖","$$\\begin{cases}a+b="+p+"\\\\"+poly([[-r2,"a"],[-r1,"b"]])+"="+q+"\\end{cases}\\Rightarrow a="+a+",\\ b="+b+"$$")),
   Q("គណនា $\\displaystyle\\int_{"+u+"}^{"+v+"}f(x)\\,dx$ ។","$"+res+"$",
     AL(["\\int_{"+u+"}^{"+v+"}f(x)dx&=\\left["+cf(String(a))+"\\ln|"+xr(r1)+"|"+(b<0?"-":"+")+(Math.abs(b)===1?"":Math.abs(b))+"\\ln|"+xr(r2)+"|\\right]_{"+u+"}^{"+v+"}","&="+cf(String(a))+"("+L(r1)+")"+(b<0?"-":"+")+(Math.abs(b)===1?"":Math.abs(b))+"("+L(r2)+")","&="+res]))]}}});
SPC.push({id:"tetra",t:"មាឌតេត្រាអែត ABCD · ផលគុណចម្រុះ",lv:2,f:function(){
  var A,B,C0,D,u,v,w,n,t;do{A=[ri(-2,2),ri(-2,2),ri(-2,2)];B=A.map(function(x){return x+ri(-2,3)});C0=A.map(function(x){return x+ri(-2,3)});D=A.map(function(x){return x+ri(-2,3)});
    u=[0,1,2].map(function(i){return B[i]-A[i]});v=[0,1,2].map(function(i){return C0[i]-A[i]});w=[0,1,2].map(function(i){return D[i]-A[i]});
    n=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]];t=n[0]*w[0]+n[1]*w[1]+n[2]*w[2]}while(!t||Math.abs(t)>40);
  var nn=n[0]*n[0]+n[1]*n[1]+n[2]*n[2],V=F(Math.abs(t),6),h=St(S(Math.abs(t),nn,nn));
  return{inst:"នៅក្នុងតម្រុយអរតូណរម៉ាល់ $(O,\\vec i,\\vec j,\\vec k)$ គេមានចំណុច $A"+pt3(A)+"$ , $B"+pt3(B)+"$ , $C"+pt3(C0)+"$ និង $D"+pt3(D)+"$ ។",it:[
   Q("គណនា $\\vec n=\\overrightarrow{AB}\\times\\overrightarrow{AC}$ រួចគណនាផ្ទៃក្រឡាត្រីកោណ $ABC$ ។","$\\vec n="+pt3(n)+"$ , $S_{ABC}="+St(S(1,2,nn))+"$",
     W("$\\overrightarrow{AB}="+pt3(u)+"$ , $\\overrightarrow{AC}="+pt3(v)+"$",AL(["\\vec n&="+crs(u,v),"&="+pt3(n),"S_{ABC}&=\\dfrac12\\|\\vec n\\|=\\dfrac12\\sqrt{"+nn+"}="+St(S(1,2,nn))]))),
   Q("គណនា $(\\overrightarrow{AB}\\times\\overrightarrow{AC})\\cdot\\overrightarrow{AD}$ ។ ទាញបង្ហាញថា $A,B,C,D$ មិននៅលើប្លង់តែមួយ ។","$(\\overrightarrow{AB}\\times\\overrightarrow{AC})\\cdot\\overrightarrow{AD}="+t+"\\ne0$",
     W("$\\overrightarrow{AD}="+pt3(w)+"$",AL(["\\vec n\\cdot\\overrightarrow{AD}&="+pn(n[0])+"\\times"+pn(w[0])+"+"+pn(n[1])+"\\times"+pn(w[1])+"+"+pn(n[2])+"\\times"+pn(w[2])+"="+t]),"ដោយ $"+t+"\\ne0$ នោះវ៉ិចទ័រទាំងបីមិនស្ថិតក្នុងប្លង់តែមួយ ⇒ $A,B,C,D$ មិនកូប្លង់ ។")),
   Q("គណនាមាឌតេត្រាអែត $ABCD$ និងចម្ងាយពីចំណុច $D$ ទៅប្លង់ $(ABC)$ ។","$V="+V+"$ , $d="+h+"$",
     AL(["V&=\\dfrac16\\left|(\\overrightarrow{AB}\\times\\overrightarrow{AC})\\cdot\\overrightarrow{AD}\\right|=\\dfrac{"+Math.abs(t)+"}{6}"+(gcd(Math.abs(t),6)===1?"":"="+V),"d(D,(ABC))&=\\dfrac{3V}{S_{ABC}}=\\dfrac{|\\vec n\\cdot\\overrightarrow{AD}|}{\\|\\vec n\\|}=\\dfrac{"+Math.abs(t)+"}{\\sqrt{"+nn+"}}="+h]))]}}});
R.push({id:"optim",t:"បញ្ហាអតិបរមា (ផ្ទៃក្រឡាចតុកោណកែង)",lv:2,f:function(){
  var riv=Math.random()<.5,P=pick([200,240,300,400,600,800]);
  if(!riv){var hP=P/2,x0=P/4;
   return{inst:"កសិករម្នាក់ចង់ធ្វើរបងព័ទ្ធដីរាងចតុកោណកែងមួយ ដោយមានរបងប្រវែងសរុប $"+P+"$ m ។",it:[
    Q("តាង $x$ (m) ជាប្រវែងទទឹង ។ បង្ហាញថាផ្ទៃក្រឡាដីគឺ $S(x)=x("+hP+"-x)$ និងកំណត់ដែនរបស់ $x$ ។","$S(x)="+hP+"x-x^2$ , $0<x<"+hP+"$",
      "បរិមាត្រ $2(x+y)="+P+"\\Rightarrow y="+hP+"-x$ ។ ផ្ទៃក្រឡា $S(x)=xy=x("+hP+"-x)$ ដែល $0<x<"+hP+"$ ។"),
    Q("រកវិមាត្រដែលធ្វើឱ្យផ្ទៃក្រឡាដីធំបំផុត ហើយគណនាផ្ទៃក្រឡាអតិបរមា ។","$x=y="+x0+"$ m (ការេ) , $S_{max}="+x0*x0+"\\text{ m}^2$",
      W(AL(["S'(x)&="+hP+"-2x","S'(x)=0&\\iff x="+x0]),VT(["0",String(x0),String(hP)],["","+","0","-",""],["0",UP,String(x0*x0),DN,"0"],"S"),"ដូចនេះ ទទឹង $x="+x0+"$ m បណ្ដោយ $y="+hP+"-"+x0+"="+x0+"$ m (ជាការេ) និង $S_{max}="+x0*x0+"\\text{ m}^2$ ។"))]}}
  var L=P,x0=L/4,y0=L/2;
  return{inst:"គេចង់ធ្វើរបងព័ទ្ធដីរាងចតុកោណកែងមួយជាប់មាត់ទន្លេ (ផ្នែកជាប់ទន្លេមិនធ្វើរបង) ដោយមានរបងប្រវែងសរុប $"+L+"$ m ។",it:[
   Q("តាង $x$ (m) ជាប្រវែងជ្រុងកែងនឹងទន្លេ ។ បង្ហាញថាផ្ទៃក្រឡា $S(x)=x("+L+"-2x)$ ។","$S(x)="+L+"x-2x^2$ , $0<x<"+L/2+"$",
     "ជ្រុងស្របនឹងទន្លេ $y="+L+"-2x$ ។ ផ្ទៃក្រឡា $S(x)=xy=x("+L+"-2x)$ ដែល $0<x<"+L/2+"$ ។"),
   Q("រកវិមាត្រដែលធ្វើឱ្យផ្ទៃក្រឡាធំបំផុត និងគណនាផ្ទៃក្រឡាអតិបរមា ។","$x="+x0+"$ m , $y="+y0+"$ m , $S_{max}="+x0*y0+"\\text{ m}^2$",
     W(AL(["S'(x)&="+L+"-4x","S'(x)=0&\\iff x="+x0]),VT(["0",String(x0),String(L/2)],["","+","0","-",""],["0",UP,String(x0*y0),DN,"0"],"S"),"ដូចនេះ $x="+x0+"$ m , $y="+L+"-2\\times"+x0+"="+y0+"$ m និង $S_{max}="+x0*y0+"\\text{ m}^2$ ។"))]}}});
/* ===== ប្រភេទថ្មីពី «វិញ្ញាសាត្រៀមប្រឡងបាក់ឌុប ២០២៤» (៣០ វិញ្ញាសា LaTeX) ===== */
function m3(f){return[0,1,2].map(f)}
function ce3(a,n){var s=a?a+co(n,"t"):co(n,"t",true);return s||"0"}
function frq(n,d){return"\\dfrac{"+n+"}{"+d+"}"+(gcd(n,d)===1?"":"="+F(n,d))}
function DF(c,N,d,np){var a=Math.abs(c),p=!np&&/[+-]/.test(N)?"("+N+")":N;return(c<0?"-":"")+"\\dfrac{"+(a===1?N:a+p)+"}{"+d+"}"}
function fac(k){var v=1;for(var i=2;i<=k;i++)v*=i;return v}
INT.push({id:"pfrac3",t:"បំបែកប្រភាគ A/(x−r) + B/(x−r)² + C/(x−s) រួចគណនាអាំងតេក្រាល",lv:3,f:function(){
  var r,s;do{r=ri(-2,2);s=ri(-2,2)}while(r===s);var A=nz(-3,3),B=nz(-3,3),C=nz(-3,3);while(A+C===0)C=nz(-3,3);
  var p2=A+C,p1=-A*(r+s)+B-2*C*r,p0=A*r*s-B*s+C*r*r,Nv=function(x){return p2*x*x+p1*x+p0};
  var xr=function(t){return t?"x"+sg(-t):"x"},px=function(t){return t?"("+xr(t)+")":"x"},N=poly([[p2,"x^2"],[p1,"x"],[p0,""]]),D=s?sqx("x",r)+px(s):"x"+sqx("x",r);
  var u=Math.max(r,s)+1,v=u+ri(1,3),lq=function(t){var n=v-t,d=u-t,g=gcd(n,d);n/=g;d/=g;return d===1?"\\ln"+n:"\\ln\\dfrac{"+n+"}{"+d+"}"},L=function(t){return"\\ln"+(v-t)+(u-t===1?"":"-\\ln"+(u-t))};
  var bn=B*(v-u),bd=(u-r)*(v-r),res=co(A,lq(r),true)+co(C,lq(s))+(bn>0?"+":"")+F(bn,bd);
  var dec="\\dfrac{A}{"+xr(r)+"}+\\dfrac{B}{"+sqx("x",r)+"}+\\dfrac{C}{"+xr(s)+"}";
  return{inst:"គេឱ្យអនុគមន៍ $f(x)=\\dfrac{"+N+"}{"+D+"}$ ចំពោះ $x\\ne"+r+"$ , $x\\ne"+s+"$ ។",it:[
   Q("កំណត់ចំនួនពិត $A,B,C$ ដើម្បីឱ្យ $f(x)="+dec+"$ ។","$A="+A+"$ , $B="+B+"$ , $C="+C+"$",
     W("$$"+dec+"=\\dfrac{A"+px(r)+px(s)+"+B"+px(s)+"+C"+sqx("x",r)+"}{"+D+"}$$","ផ្ទឹមភាគយក ៖ $A"+px(r)+px(s)+"+B"+px(s)+"+C"+sqx("x",r)+"="+N+"$ គ្រប់ $x$ ។ ជំនួស $x="+r+"$ , $x="+s+"$ និងផ្ទឹមមេគុណ $x^2$ ៖",
       AL(["x="+r+"&\\Rightarrow "+co(r-s,"B",true)+"="+Nv(r)+(r-s===1?"":"\\Rightarrow B="+B),"x="+s+"&\\Rightarrow "+co((s-r)*(s-r),"C",true)+"="+Nv(s)+((s-r)*(s-r)===1?"":"\\Rightarrow C="+C),"x^2&\\colon A+C="+p2+"\\Rightarrow A="+A]))),
   Q("គណនាអាំងតេក្រាល $I=\\displaystyle\\int_{"+u+"}^{"+v+"}f(x)\\,dx$ ។","$I="+res+"$",
     AL(["I&=\\left["+co(A,"\\ln|"+xr(r)+"|",true)+(B>0?"-":"+")+"\\dfrac{"+Math.abs(B)+"}{"+xr(r)+"}"+co(C,"\\ln|"+xr(s)+"|")+"\\right]_{"+u+"}^{"+v+"}",
       "&="+co(A,"("+L(r)+")",true)+"+"+pn(B)+"\\left(\\dfrac{1}{"+(u-r)+"}-\\dfrac{1}{"+(v-r)+"}\\right)"+co(C,"("+L(s)+")"),"&="+res]))]}}});
ODE.push({id:"ode2e",t:"ED លំដាប់ទី២ · អង្គទីពីរ k·e^{px} · ចម្លើយពិសេស γe^{px}",lv:3,f:function(){
  var harm=Math.random()<.4,p=nz(-2,3),g=nz(-3,3),a,b,r1,r2,w=1;
  if(harm){w=pick([1,2,3]);a=0;b=w*w}else{do{r1=nz(-4,3);r2=nz(-4,3)}while(r1===r2||r1===p||r2===p);a=-(r1+r2);b=r1*r2}
  var P=p*p+a*p+b,k=g*P,Ls="y''"+co(a,"y'")+co(b,"y"),E="e^{"+ex(p)+"}",wx=w===1?"x":w+"x",C1=nz(-3,3),C2=nz(-3,3),y0,y1,hom,ans,sol4;
  if(harm){y0=C1+g;y1=w*C2+p*g;hom=W("សមីការសម្គាល់ ៖ $r^2+"+b+"=0\\iff r=\\pm"+(w===1?"":w)+"i$ (ឫសកុំផ្លិច $\\alpha=0$ , $\\beta="+w+"$) ។","ចម្លើយទូទៅនៃ $(F)$ ៖ $y=C_1\\cos "+wx+"+C_2\\sin "+wx+"$ ($C_1,C_2\\in\\mathbb R$)");
    ans=co(C1,"\\cos "+wx,true)+co(C2,"\\sin "+wx)+co(g,E);
    sol4=W("$y=C_1\\cos "+wx+"+C_2\\sin "+wx+co(g,E)+"$ ⇒ $y'="+co(-w,"C_1\\sin "+wx,true)+co(w,"C_2\\cos "+wx)+co(p*g,E)+"$ ។",AL(["y(0)&=C_1"+co(g,"")+"="+y0+"\\Rightarrow C_1="+C1,"y'(0)&="+co(w,"C_2",true)+co(p*g,"")+"="+y1+"\\Rightarrow C_2="+C2]))}
  else{y0=C1+C2+g;y1=r1*C1+r2*C2+p*g;hom=W("សមីការសម្គាល់ ៖",AL([poly([[1,"r^2"],[a,"r"],[b,""]])+"&=0","(r"+sg(-r1)+")(r"+sg(-r2)+")&=0"]),"មានឫសពីរផ្សេងគ្នា $r_1="+r1+"$ , $r_2="+r2+"$ ។ ចម្លើយទូទៅនៃ $(F)$ ៖ $y=C_1e^{"+ex(r1)+"}+C_2e^{"+ex(r2)+"}$");
    ans=co(C1,"e^{"+ex(r1)+"}",true)+co(C2,"e^{"+ex(r2)+"}")+co(g,E);
    sol4=W("$y'="+co(r1,"C_1e^{"+ex(r1)+"}",true)+co(r2,"C_2e^{"+ex(r2)+"}")+co(p*g,E)+"$ ។ តាមលក្ខខណ្ឌ $y(0)="+y0+"$ , $y'(0)="+y1+"$ ៖","$$\\begin{cases}C_1+C_2="+(y0-g)+"\\\\"+co(r1,"C_1",true)+co(r2,"C_2")+"="+(y1-p*g)+"\\end{cases}$$",
      AL(["C_1&=\\dfrac{"+pn(y1-p*g)+"-"+pn(r2)+"\\times"+pn(y0-g)+"}{"+pn(r1)+"-"+pn(r2)+"}="+C1,"C_2&="+(y0-g)+"-"+pn(C1)+"="+C2]))}
  var gen=(harm?"C_1\\cos "+wx+"+C_2\\sin "+wx:"C_1e^{"+ex(r1)+"}+C_2e^{"+ex(r2)+"}")+co(g,E);
  return{inst:"គេឱ្យសមីការឌីផេរ៉ង់ស្យែល $(E)\\colon "+Ls+"="+co(k,E,true)+"$ និង $(F)\\colon "+Ls+"=0$ ។",it:[
   Q("កំណត់ចំនួនពិត $\\gamma$ ដើម្បីឱ្យ $\\varphi(x)=\\gamma "+E+"$ ជាចម្លើយមួយនៃ $(E)$ ។","$\\gamma="+g+"$",
     W("$\\varphi'(x)="+co(p,"\\gamma "+E,true)+"$ , $\\varphi''(x)="+co(p*p,"\\gamma "+E,true)+"$ ។ ជំនួសក្នុង $(E)$ ៖",AL(["("+p*p+co(a*p,"")+co(b,"")+")\\gamma "+E+"&="+co(k,E,true),co(P,"\\gamma",true)+"&="+k+"\\Rightarrow\\gamma="+g]))),
   Q("ដោះស្រាយសមីការ $(F)$ ។","$y="+(harm?"C_1\\cos "+wx+"+C_2\\sin "+wx:"C_1e^{"+ex(r1)+"}+C_2e^{"+ex(r2)+"}")+"$",hom),
   Q("ទាញរកចម្លើយទូទៅនៃ $(E)$ ។","$y="+gen+"$","ចម្លើយទូទៅនៃ $(E)$ = ចម្លើយទូទៅនៃ $(F)$ + ចម្លើយពិសេស $\\varphi$ ៖ $y="+gen+"$"),
   Q("រកចម្លើយពិសេសនៃ $(E)$ ដែល $y(0)="+y0+"$ និង $y'(0)="+y1+"$ ។","$y="+ans+"$",W(sol4,"ដូចនេះ $y="+ans+"$"))]}}});
PROB.push({id:"perm",t:"ប្រូបាប · ឈរតម្រៀបជាជួរ (ចំណាត់លំដាប់)",lv:2,f:function(){
  var m=ri(2,3),w=ri(3,5),n=m+w,T=fac(n),nA=fac(w+1)*fac(m),nB=w*(w-1)*fac(n-2),nC=m*fac(n-1);
  var c=pick([["ទេសចរមួយក្រុម","ទិញសំបុត្រចូលទស្សនាប្រាសាទអង្គរវត្ត"],["សិស្សមួយក្រុម","ថតរូបអនុស្សាវរីយ៍"],["គ្រូមួយក្រុម","ចុះហត្ថលេខាចូលប្រជុំ"]]);
  return{inst:c[0]+"មានបុរស $"+m+"$ នាក់ និងស្ត្រី $"+w+"$ នាក់ ឈរតម្រៀបគ្នាជាជួរដោយចៃដន្យ ដើម្បី"+c[1]+" ។",it:[
   Q("រកចំនួនរបៀបឈរតម្រៀបទាំងអស់ ។","$n(S)="+n+"!="+T+"$","មនុស្ស $"+n+"$ នាក់ ឈរតម្រៀបជាជួរ ជាចម្លាស់នៃ $"+n+"$ ធាតុ ៖ $n(S)="+n+"!="+T+"$"),
   Q("រកប្រូបាបនៃព្រឹត្តិការណ៍ $A$ ៖ «បុរសទាំង $"+m+"$ នាក់ឈរជាប់គ្នា» ។","$P(A)="+F(nA,T)+"$",
     W("ចាត់ទុកបុរសទាំង $"+m+"$ នាក់ជាក្រុមតែមួយ ⇒ មាន $"+(w+1)+"$ ធាតុ តម្រៀបបាន $"+(w+1)+"!$ របៀប ហើយបុរសក្នុងក្រុមប្ដូរកន្លែងគ្នាបាន $"+m+"!$ របៀប ៖",AL(["n(A)&="+(w+1)+"!\\times"+m+"!="+fac(w+1)+"\\times"+fac(m)+"="+nA,"P(A)&="+frq(nA,T)]))),
   Q("រកប្រូបាបនៃព្រឹត្តិការណ៍ $B$ ៖ «អ្នកឈរនៅចុងទាំងពីរជាស្ត្រី» ។","$P(B)="+F(nB,T)+"$",
     W("ជ្រើសស្ត្រីឈរចុងទាំងពីរ (មានលំដាប់) ៖ $A_{"+w+"}^{2}="+w+"\\times"+(w-1)+"$ របៀប ។ មនុស្ស $"+(n-2)+"$ នាក់ទៀតឈរកណ្ដាល ៖ $"+(n-2)+"!$ របៀប ៖",AL(["n(B)&="+w+"\\times"+(w-1)+"\\times"+(n-2)+"!="+nB,"P(B)&="+frq(nB,T)]))),
   Q("រកប្រូបាបនៃព្រឹត្តិការណ៍ $C$ ៖ «អ្នកឈរមុនគេជាបុរស» ។","$P(C)="+F(m,n)+"$",
     W("ជ្រើសបុរសម្នាក់ឈរមុនគេ ៖ $"+m+"$ របៀប ។ អ្នកដែលនៅសល់ $"+(n-1)+"$ នាក់ ៖ $"+(n-1)+"!$ របៀប ៖",AL(["n(C)&="+m+"\\times"+(n-1)+"!="+nC,"P(C)&="+frq(nC,T)])))]}}});
/* បាក់ឌុប (ថ្នាក់ទី១២)៖ ប្រូបាបប្រើវិភាគបន្សំ — n(S) · n(E) · ចម្លាស់/បន្សំ (មិនមែនគោលការណ៍ផលគុណសុទ្ធ) */
PROB.push({id:"repl",t:"ប្រូបាប · ចាប់ម្ដងមួយ (ដាក់ចូលវិញ / មិនដាក់ចូលវិញ)",lv:2,f:function(){
  var b=ri(3,6),y=ri(2,5),N=b+y,c=pick([["ប្រអប់","ឃ្លី","ខៀវ","លឿង"],["ថង់","ប៊ូល","ក្រហម","ស"],["ធុង","ប៊ិក","ខៀវ","ខ្មៅ"]]),SC=N*(N-1)/2,BC=b*(b-1)/2;
  return{inst:c[0]+"មួយមាន"+c[1]+"ពណ៌"+c[2]+" $"+b+"$ និង"+c[1]+"ពណ៌"+c[3]+" $"+y+"$ ។ គេចាប់"+c[1]+" $2$ ចេញពី"+c[0]+" ដោយចាប់ម្ដងមួយ ។",it:[
   Q("រកប្រូបាបដែល"+c[1]+"ទាំងពីរសុទ្ធតែពណ៌"+c[2]+" ក្នុងករណីចាប់ហើយ «ដាក់ចូលវិញ» ។","$P(A)="+F(b*b,N*N)+"$",
     W("ដាក់ចូលវិញ ⇒ លើកនីមួយៗមានជម្រើស $"+N+"$ ដដែល (ចម្លាស់មានធាតុដដែល) ៖",AL(["n(S)&="+N+"^2="+(N*N),"n(A)&="+b+"^2="+(b*b),"P(A)&=\\dfrac{n(A)}{n(S)}="+frq(b*b,N*N)]))),
   Q("រកប្រូបាបដែល"+c[1]+"ទាំងពីរសុទ្ធតែពណ៌"+c[2]+" ក្នុងករណីចាប់ហើយ «មិនដាក់ចូលវិញ» ។","$P(B)="+F(BC,SC)+"$",
     W("មិនដាក់ចូលវិញ ⇒ ជាការជ្រើស $2$ ក្នុង $"+N+"$ (បន្សំ) ៖",AL(["n(S)&=C_{"+N+"}^{2}=\\dfrac{"+N+"\\times"+(N-1)+"}{2}="+SC,"n(B)&=C_{"+b+"}^{2}="+BC,"P(B)&=\\dfrac{n(B)}{n(S)}="+frq(BC,SC)]))),
   Q("ក្នុងករណី «មិនដាក់ចូលវិញ» រកប្រូបាបដែលបាន"+c[1]+"ពីរមានពណ៌ខុសគ្នា ។","$P(C)="+F(b*y,SC)+"$",
     W("ពណ៌ខុសគ្នា = ពណ៌"+c[2]+" $1$ និងពណ៌"+c[3]+" $1$ ៖",AL(["n(S)&=C_{"+N+"}^{2}="+SC,"n(C)&=C_{"+b+"}^{1}\\times C_{"+y+"}^{1}="+b+"\\times"+y+"="+(b*y),"P(C)&=\\dfrac{n(C)}{n(S)}="+frq(b*y,SC)])))]}}});
ELL.push({id:"ellf",t:"អេលីប · រកសមីការពីកំណុំ និងប្រវែងអ័ក្សធំ",lv:2,f:function(){
  var pr=pick([[5,3],[5,4],[3,1],[4,1],[4,2],[4,3],[5,2],[6,2],[3,2],[6,4]]),a=pr[0],c=pr[1],b2=a*a-c*c,A2=a*a,h=ri(-3,3),k=ri(-3,3),hor=Math.random()<.5,bT=sqrtT(b2),bv=Math.sqrt(b2);
  var F1=hor?[h-c,k]:[h,k-c],F2=hor?[h+c,k]:[h,k+c],V1=hor?[h-a,k]:[h,k-a],V2=hor?[h+a,k]:[h,k+a],P=function(p){return"("+p[0]+","+p[1]+")"};
  var eq="\\dfrac{"+sqx("x",h)+"}{"+(hor?A2:b2)+"}+\\dfrac{"+sqx("y",k)+"}{"+(hor?b2:A2)+"}=1",sx=function(v){return v<0?"x+"+(-v):"x-"+v},sy=function(v){return v<0?"y+"+(-v):"y-"+v};
  var rx=hor?a:bv,ry=hor?bv:a;
  return{kfig:FG({I:[h,k],F:F1,"F'":F2},["("+sx(h)+")^2/"+(hor?A2:b2)+"+("+sy(k)+")^2/"+(hor?b2:A2)+"=1 blue"],{axes:1,ext:[[h-rx,k-ry],[h+rx,k+ry]]}),
   inst:"អេលីប $(E)$ មានកំណុំ $F"+P(F1)+"$ និង $F'"+P(F2)+"$ ហើយអ័ក្សធំមានប្រវែងស្មើ $"+2*a+"$ ។",it:[
   Q("រកកូអរដោនេផ្ចិត $I$ និងតម្លៃ $a$ , $b$ , $c$ នៃអេលីប ។","$I("+h+","+k+")$ , $a="+a+"$ , $b="+bT+"$ , $c="+c+"$",
     W("ផ្ចិត $I$ ជាចំណុចកណ្ដាលនៃ $[FF']$ ៖ $I\\left(\\dfrac{"+F1[0]+"+"+pn(F2[0])+"}{2},\\dfrac{"+F1[1]+"+"+pn(F2[1])+"}{2}\\right)=("+h+","+k+")$",
       AL(["2c&=FF'="+2*c+"\\Rightarrow c="+c,"2a&="+2*a+"\\Rightarrow a="+a,"b^2&=a^2-c^2="+A2+"-"+c*c+"="+b2+"\\Rightarrow b="+bT]))),
   Q("សរសេរសមីការស្តង់ដានៃ $(E)$ ។","$"+eq+"$",
     "កំណុំទាំងពីរនៅលើបន្ទាត់"+(hor?"ដេក $y="+k+"$":"ឈរ $x="+h+"$")+" ⇒ អ័ក្សធំ"+(hor?"ដេក":"ឈរ")+" ៖ $"+(hor?"\\dfrac{(x-h)^2}{a^2}+\\dfrac{(y-k)^2}{b^2}=1":"\\dfrac{(x-h)^2}{b^2}+\\dfrac{(y-k)^2}{a^2}=1")+"$\nដូចនេះ $(E)\\colon "+eq+"$"),
   Q("រកកូអរដោនេកំពូលទាំងពីរលើអ័ក្សធំ និងអ៊ិចសង់ទ្រីស៊ីតេ $e$ ។ សង់ $(E)$ ។","$V"+P(V1)+"$ , $V'"+P(V2)+"$ , $e="+F(c,a)+"$",
     W("កំពូលលើអ័ក្សធំ ៖ $"+(hor?"(h\\pm a,k)":"(h,k\\pm a)")+"$ ⇒ $V"+P(V1)+"$ , $V'"+P(V2)+"$","អ៊ិចសង់ទ្រីស៊ីតេ ៖ $e=\\dfrac{c}{a}="+frq(c,a)+"$"))]}}});
PAR.push({id:"par3",t:"ប៉ារ៉ាបូល · អ័ក្សឆ្លុះស្របនឹង (y'y) កាត់តាមបីចំណុច",lv:3,f:function(){
  var an=pick([1,-1]),ad=pick([1,1,2]),h=ri(-2,2),k=ri(-3,3),ds=[-2,-1,0,1,2,3].sort(function(){return Math.random()-.5}).slice(0,3).sort(function(x,y){return x-y});
  var X=ds.map(function(d){return h+d*ad}),Y=X.map(function(x){return k+an*(x-h)*(x-h)/ad});
  var aT=ad===1?(an<0?"-":""):(an<0?"-":"")+"\\dfrac12",aV=F(an,ad),bV=-2*an*h/ad,cN=an*h*h+k*ad,abc=aT+"x^2"+co(bV,"x")+(cN?(cN>0?"+":"")+F(cN,ad):"");
  var s12=F(an*(X[0]+X[1]-2*h),ad),s23=F(an*(X[1]+X[2]-2*h),ad),p4=ad*an,pN=4*an,fy=F(4*an*k+ad,pN),dy=F(4*an*k-ad,pN),Pn=["A","B","C"];
  var eq=sqx("x",h)+"="+co(p4,lfx("y",k),true);
  return{kfig:FG({A:[X[0],Y[0]],B:[X[1],Y[1]],C:[X[2],Y[2]],S:[h,k]},["y="+(an/ad)+"*(x"+js(-h)+")^2"+js(k)+" blue","dash y="+(k-ad/(4*an))],{axes:1,ext:[[h-3*ad,k],[h+3*ad,k]]}),
   inst:"ប៉ារ៉ាបូល $(P)$ មានអ័ក្សឆ្លុះស្របនឹងអ័ក្ស $(y'y)$ ហើយកាត់តាមចំណុច "+Pn.map(function(n,i){return"$"+n+"("+X[i]+","+Y[i]+")$"}).join(" , ")+" ។",it:[
   Q("តាងសមីការ $(P)\\colon y=ax^2+bx+c$ ។ កំណត់ $a$ , $b$ , $c$ ។","$a="+aV+"$ , $b="+bV+"$ , $c="+F(cN,ad)+"$",
     W("ជំនួសកូអរដោនេចំណុចទាំងបីក្នុង $y=ax^2+bx+c$ ៖","$$\\begin{cases}"+X.map(function(x,i){return poly([[x*x,"a"],[x,"b"],[1,"c"]])+"="+Y[i]}).join("\\\\")+"\\end{cases}$$",
       "ដកសមីការពីរៗ រួចចែកនឹង $x_B-x_A$ និង $x_C-x_B$ ៖",AL([poly([[X[0]+X[1],"a"],[1,"b"]])+"&="+s12,poly([[X[1]+X[2],"a"],[1,"b"]])+"&="+s23,co(X[2]-X[0],"a",true)+"&="+F(an*(X[2]-X[0]),ad)+"\\Rightarrow a="+aV,"b&="+bV+"\\ ,\\ c="+F(cN,ad)]),"ដូចនេះ $(P)\\colon y="+abc+"$")),
   Q("សរសេរសមីការ $(P)$ ជាទម្រង់ស្តង់ដា ។","$"+eq+"$",
     W(AL(["y&="+abc,"y&="+aT+sqx("x",h)+co(k,""),(k?lfx("y",k):"y")+"&="+aT+sqx("x",h)]),"ដូចនេះ $(P)\\colon "+eq+"$ (ទម្រង់ $(x-h)^2=4p(y-k)$ ដែល $4p="+p4+"$)")),
   Q("រកកូអរដោនេកំពូល $S$ កំណុំ $F$ និងសមីការបន្ទាត់ប្រាប់ទិស ។ សង់ $(P)$ ។","$S("+h+","+k+")$ , $F\\left("+h+","+fy+"\\right)$ , $y="+dy+"$",
     W("$4p="+p4+"\\Rightarrow p="+F(ad,pN)+"$ ។",AL(["S&=(h,k)=("+h+","+k+")","F&=(h,k+p)=\\left("+h+","+fy+"\\right)","(d)&\\colon y=k-p="+dy])))]}}});
SPC.push({id:"refl",t:"បន្ទាត់កែងនឹងប្លង់ · ចំណោលកែង H · ចំណុចឆ្លុះ A′",lv:2,f:function(){
  var n=pick([[1,2,2],[2,-2,1],[2,1,-2],[1,-2,2],[2,2,-1],[-2,1,2],[1,2,-2],[2,-1,2]]),H=m3(function(){return ri(-2,2)}),tt=nz(-2,2),d=-(n[0]*H[0]+n[1]*H[1]+n[2]*H[2]);
  var A=m3(function(i){return H[i]-tt*n[i]}),A2=m3(function(i){return H[i]+tt*n[i]}),nA=n[0]*A[0]+n[1]*A[1]+n[2]*A[2]+d,v=["x","y","z"];
  var pl=poly([[n[0],"x"],[n[1],"y"],[n[2],"z"],[d,""]])+"=0",ln="\\begin{cases}"+m3(function(i){return v[i]+"="+ce3(A[i],n[i])}).join("\\\\")+"\\end{cases}";
  return{inst:"នៅក្នុងតម្រុយអរតូណរម៉ាល់ $(O,\\vec i,\\vec j,\\vec k)$ គេឱ្យប្លង់ $(P)\\colon "+pl+"$ និងចំណុច $A"+pt3(A)+"$ ។",it:[
   Q("សរសេរសមីការប៉ារ៉ាម៉ែត្រនៃបន្ទាត់ $(L)$ កាត់តាម $A$ ហើយកែងនឹងប្លង់ $(P)$ ។","$(L)\\colon"+ln+"\\ (t\\in\\mathbb R)$",
     "$(L)\\perp(P)$ ⇒ វ៉ិចទ័រណរម៉ាល់ $\\vec n="+pt3(n)+"$ ជាវ៉ិចទ័រប្រាប់ទិសនៃ $(L)$ ។ ដូចនេះ $$(L)\\colon"+ln+"\\quad(t\\in\\mathbb R)$$"),
   Q("រកកូអរដោនេចំណុច $H$ ជាចំណុចប្រសព្វរវាង $(L)$ និង $(P)$ ។","$H"+pt3(H)+"$",
     W("ជំនួសសមីការ $(L)$ ក្នុង $(P)$ ៖",AL([m3(function(i){return co(n[i],"("+ce3(A[i],n[i])+")",!i)}).join("")+co(d,"")+"&=0","9t"+co(nA,"")+"&=0","t&="+tt]),"ជំនួស $t="+tt+"$ ក្នុង $(L)$ ៖ $H"+pt3(H)+"$")),
   Q("រកកូអរដោនេចំណុច $A'$ ឆ្លុះនឹង $A$ ធៀបនឹងប្លង់ $(P)$ ។","$A'"+pt3(A2)+"$",
     W("$H$ ជាចំណុចកណ្ដាលនៃ $[AA']$ ⇒ $A'=2H-A$ ៖",AL(m3(function(i){return v[i]+"_{A'}&=2\\times"+pn(H[i])+"-"+pn(A[i])+"="+A2[i]})))),
   Q("គណនាចម្ងាយពីចំណុច $A$ ទៅប្លង់ $(P)$ ។","$d(A,(P))="+3*Math.abs(tt)+"$",
     AL(["d(A,(P))&=\\dfrac{|"+m3(function(i){return pn(n[i])+"\\times"+pn(A[i])}).join("+")+co(d,"")+"|}{\\sqrt{"+n.map(function(x){return pn(x)+"^2"}).join("+")+"}}","&=\\dfrac{"+Math.abs(nA)+"}{3}="+3*Math.abs(tt)]))]}}});
SPC.push({id:"lnpl",t:"បន្ទាត់ប្រសព្វប្លង់ · ចំណុចប្រសព្វ · ប្លង់កែងនឹងបន្ទាត់",lv:2,f:function(){
  var u,n,dot;do{u=[nz(-2,2),ri(-2,2),nz(-2,2)];n=[nz(-3,3),ri(-2,2),nz(-2,2)];dot=u[0]*n[0]+u[1]*n[1]+u[2]*n[2]}while(!dot);
  var I=m3(function(){return ri(-3,3)}),s0=nz(-2,2),M=m3(function(i){return I[i]-s0*u[i]}),d=-(n[0]*I[0]+n[1]*I[1]+n[2]*I[2]),nM=n[0]*M[0]+n[1]*M[1]+n[2]*M[2]+d,v=["x","y","z"];
  var pl=poly([[n[0],"x"],[n[1],"y"],[n[2],"z"],[d,""]])+"=0",ln="\\begin{cases}"+m3(function(i){return v[i]+"="+ce3(M[i],u[i])}).join("\\\\")+"\\end{cases}",uI=u[0]*I[0]+u[1]*I[1]+u[2]*I[2];
  var qp=poly([[u[0],"x"],[u[1],"y"],[u[2],"z"],[-uI,""]])+"=0";
  return{inst:"នៅក្នុងតម្រុយអរតូណរម៉ាល់ $(O,\\vec i,\\vec j,\\vec k)$ គេឱ្យប្លង់ $(P)\\colon "+pl+"$ និងបន្ទាត់ $(L)\\colon"+ln+"$ ($t\\in\\mathbb R$) ។",it:[
   Q("បង្ហាញថាបន្ទាត់ $(L)$ កាត់ប្លង់ $(P)$ (មិនស្របនឹង $(P)$) ។","$\\vec u\\cdot\\vec n="+dot+"\\ne0$",
     W("$(L)$ មានវ៉ិចទ័រប្រាប់ទិស $\\vec u="+pt3(u)+"$ ហើយ $(P)$ មានវ៉ិចទ័រណរម៉ាល់ $\\vec n="+pt3(n)+"$ ។",AL(["\\vec u\\cdot\\vec n&="+m3(function(i){return pn(u[i])+"\\times"+pn(n[i])}).join("+"),"&="+dot+"\\ne0"]),"ដូចនេះ $\\vec u$ មិនកែងនឹង $\\vec n$ ⇒ $(L)$ មិនស្របនឹង $(P)$ គឺ $(L)$ កាត់ $(P)$ ។")),
   Q("រកកូអរដោនេចំណុចប្រសព្វ $I$ រវាង $(L)$ និង $(P)$ ។","$I"+pt3(I)+"$",
     W("ជំនួសសមីការ $(L)$ ក្នុង $(P)$ ៖",AL([m3(function(i){return co(n[i],"("+ce3(M[i],u[i])+")",!i)}).join("")+co(d,"")+"&=0",co(dot,"t",true)+co(nM,"")+"&=0","t&="+s0]),"ជំនួស $t="+s0+"$ ក្នុង $(L)$ ៖ $I"+pt3(I)+"$")),
   Q("សរសេរសមីការប្លង់ $(Q)$ កាត់តាម $I$ ហើយកែងនឹងបន្ទាត់ $(L)$ ។","$(Q)\\colon "+qp+"$",
     W("$(Q)\\perp(L)$ ⇒ $\\vec u="+pt3(u)+"$ ជាវ៉ិចទ័រណរម៉ាល់នៃ $(Q)$ ៖",AL([m3(function(i){return co(u[i],I[i]?lfx(v[i],I[i]):v[i],!i)}).join("")+"&=0",qp.replace("=0","")+"&=0"])))]}}});
var CONT=[{id:"piece",t:"អនុគមន៍កំណត់ជាផ្នែកៗ · កំណត់ a, b ឱ្យជាប់ · ដេរីវេឆ្វេង/ស្ដាំ",lv:2,f:function(){
  var x0,a,b,p,q,r,s,v,D,ok;do{x0=nz(-2,2);a=nz(-3,3);b=nz(-3,3);p=nz(-2,2);q=nz(-2,2);r=nz(-3,3);v=p*a*x0+q*b;s=(v-r*a*x0)/b;D=p*x0*s-q*r*x0;ok=s===Math.round(s)&&s!==0&&Math.abs(s)<=5&&D!==0}while(!ok);
  var Lf=co(p,"ax",true)+co(q,"b"),Rf=co(r,"ax",true)+co(s,"b"),e1=co(p*x0,"a",true)+co(q,"b"),e2=co(r*x0,"a",true)+co(s,"b");
  var x1=ri(1,3),m1=nz(-3,3),m2;do{m2=nz(-3,3)}while(m2===m1);var c1=ri(-4,4),c2=m1*x1+c1-m2*x1,g1=m1*x1+c1,gl=poly([[m1,"x"],[c1,""]]),gr=poly([[m2,"x"],[c2,""]]);
  return{inst:"គេឱ្យអនុគមន៍ $f(x)=\\begin{cases}"+Lf+" & ,\\ x<"+x0+"\\\\ "+v+" & ,\\ x="+x0+"\\\\ "+Rf+" & ,\\ x>"+x0+"\\end{cases}$ ដែល $a,b$ ជាចំនួនពិត ។",it:[
   Q("គណនា $\\lim\\limits_{x\\to"+x0+"^-}f(x)$ និង $\\lim\\limits_{x\\to"+x0+"^+}f(x)$ ជាអនុគមន៍នៃ $a$ , $b$ ។","$"+e1+"$ , $"+e2+"$",
     AL(["\\lim_{x\\to"+x0+"^-}f(x)&=\\lim_{x\\to"+x0+"^-}("+Lf+")="+e1,"\\lim_{x\\to"+x0+"^+}f(x)&=\\lim_{x\\to"+x0+"^+}("+Rf+")="+e2])),
   Q("កំណត់ $a$ និង $b$ ដើម្បីឱ្យ $f$ ជាប់ត្រង់ $x="+x0+"$ ។","$a="+a+"$ , $b="+b+"$",
     W("$f$ ជាប់ត្រង់ $x="+x0+"$ ⇔ $\\lim\\limits_{x\\to"+x0+"^-}f(x)=\\lim\\limits_{x\\to"+x0+"^+}f(x)=f("+x0+")="+v+"$ ៖","$$\\begin{cases}"+e1+"="+v+"\\\\"+e2+"="+v+"\\end{cases}$$",
       AL(["D&="+pn(p*x0)+"\\times"+pn(s)+"-"+pn(q)+"\\times"+pn(r*x0)+"="+D,"a&=\\dfrac{"+v+"\\times"+pn(s)+"-"+pn(q)+"\\times"+v+"}{"+D+"}="+a,"b&=\\dfrac{"+pn(p*x0)+"\\times"+v+"-"+pn(r*x0)+"\\times"+v+"}{"+D+"}="+b]))),
   Q("គេឱ្យ $g(x)=\\begin{cases}"+gl+" & ,\\ x\\le"+x1+"\\\\ "+gr+" & ,\\ x>"+x1+"\\end{cases}$ ។ បង្ហាញថា $g$ ជាប់ត្រង់ $x="+x1+"$ តែគ្មានដេរីវេត្រង់ $x="+x1+"$ ។","$g'("+x1+"^-)="+m1+"\\ne g'("+x1+"^+)="+m2+"$",
     W(AL(["\\lim_{x\\to"+x1+"^-}g(x)&="+pn(m1)+"\\times"+x1+co(c1,"")+"="+g1+"=g("+x1+")","\\lim_{x\\to"+x1+"^+}g(x)&="+pn(m2)+"\\times"+x1+co(c2,"")+"="+g1]),"ដូចនេះ $g$ ជាប់ត្រង់ $x="+x1+"$ ។ ដេរីវេឆ្វេង និងស្ដាំ ៖",
       AL(["\\lim_{x\\to"+x1+"^-}\\dfrac{g(x)-g("+x1+")}{x-"+x1+"}&=\\lim_{x\\to"+x1+"^-}\\dfrac{"+co(m1,"(x-"+x1+")",true)+"}{x-"+x1+"}="+m1,"\\lim_{x\\to"+x1+"^+}\\dfrac{g(x)-g("+x1+")}{x-"+x1+"}&=\\lim_{x\\to"+x1+"^+}\\dfrac{"+co(m2,"(x-"+x1+")",true)+"}{x-"+x1+"}="+m2]),
       "ដោយ $"+m1+"\\ne"+m2+"$ នោះ $g$ គ្មានដេរីវេត្រង់ $x="+x1+"$ ។"))]}}}];
var DER=[{id:"fab",t:"កំណត់ a, b ឱ្យអនុគមន៍មានបរមាត្រង់ x = 1 និង x = x₂",lv:2,f:function(){
  var x2=pick([2,3]),B2=pick([1,-1,2,-2]),c=-B2*(1+x2),a=B2*x2,d=ri(-3,3),bV=F(B2,2),g1=F(B2-2*B2*(1+x2)+2*d,2),k2=B2*x2*x2-2*B2*(1+x2)*x2+2*d;
  var g2=co(a,"\\ln"+x2,true)+(k2?(k2>0?"+":"")+F(k2,2):""),bT=B2===2?"":B2===-2?"-":(B2<0?"-":"")+"\\dfrac12",gx=co(a,"\\ln x",true)+bT+"x^2"+co(c,"x")+co(d,"");
  var up=B2>0,s1=up?"+":"-",s2=up?"-":"+";
  return{inst:"គេឱ្យអនុគមន៍ $g(x)=a\\ln x+bx^2"+co(c,"x")+co(d,"")+"$ កំណត់លើ $(0,+\\infty)$ ដែល $a,b$ ជាចំនួនពិត ។",it:[
   Q("កំណត់ $a$ និង $b$ ដើម្បីឱ្យ $g$ មានបរមាត្រង់ $x=1$ និង $x="+x2+"$ ។","$a="+a+"$ , $b="+bV+"$",
     W("$g'(x)=\\dfrac{a}{x}+2bx"+co(c,"")+"$ ។ $g$ មានបរមាត្រង់ $x=1$ និង $x="+x2+"$ ⇒ $g'(1)=0$ និង $g'("+x2+")=0$ ៖",
       "$$\\begin{cases}a+2b"+co(c,"")+"=0\\\\\\dfrac{a}{"+x2+"}+"+2*x2+"b"+co(c,"")+"=0\\end{cases}\\iff\\begin{cases}a+2b="+(-c)+"\\\\a+"+2*x2*x2+"b="+(-c*x2)+"\\end{cases}$$",
       AL([2*x2*x2-2+"b&="+(-c*x2+c)+"\\Rightarrow b="+bV,"a&="+(-c)+"-2b="+a]))),
   Q("ចំពោះ $a$ , $b$ ខាងលើ សិក្សាអថេរភាពនៃ $g$ រួចរកតម្លៃអតិបរមាធៀប និងអប្បបរមាធៀប ។",up?"អតិបរមាធៀប $g(1)="+g1+"$ , អប្បបរមាធៀប $g("+x2+")="+g2+"$":"អប្បបរមាធៀប $g(1)="+g1+"$ , អតិបរមាធៀប $g("+x2+")="+g2+"$",
     W("$g(x)="+gx+"$",AL(["g'(x)&=\\dfrac{"+a+"}{x}"+co(B2,"x")+co(c,""),"&=\\dfrac{"+poly([[B2,"x^2"],[c,"x"],[a,""]])+"}{x}","&="+DF(B2,"(x-1)(x-"+x2+")","x",1)]),
       VT(["0","1",String(x2),"+\\infty"],["",s1,"0",s2,"0",s1,""],[up?"-\\infty":"+\\infty",up?UP:DN,g1,up?DN:UP,g2,up?UP:DN,up?"+\\infty":"-\\infty"],"g"),
       "ដូចនេះ $g$ មាន"+(up?"អតិបរមាធៀប":"អប្បបរមាធៀប")+" $g(1)="+g1+"$ និង"+(up?"អប្បបរមាធៀប":"អតិបរមាធៀប")+" $g("+x2+")="+g2+"$ ។"))]}}},
 {id:"infl",t:"កំណត់ a, b ឱ្យក្រាបមានចំណុចរបត់ I · បន្ទាត់ប៉ះត្រង់ I",lv:2,f:function(){
  var k=pick([1,2,3,6,-1,-2,-3,-6]),y0=nz(-3,3),aV=F(k,6),bN=6*y0-k,bV=F(bN,6),aT=k===6?"":k===-6?"-":aV,cN=2*y0-3*k;
  var fx=aT+"x^3"+(bN>0?"+":"")+F(bN,6)+co(k,"\\ln x"),mT=F(3*k,2),tg="y="+mT+"x"+(cN?(cN>0?"+":"")+F(cN,2):"");
  return{inst:"គេឱ្យអនុគមន៍ $f(x)=ax^3+b"+co(k,"\\ln x")+"$ កំណត់លើ $(0,+\\infty)$ មានក្រាប $(C)$ ដែល $a,b$ ជាចំនួនពិត ។",it:[
   Q("កំណត់ $a$ និង $b$ ដើម្បីឱ្យចំណុច $I(1,"+y0+")$ ជាចំណុចរបត់នៃក្រាប $(C)$ ។","$a="+aV+"$ , $b="+bV+"$",
     W("$f'(x)=3ax^2"+co(k,"\\dfrac{1}{x}").replace(/(\d)\\dfrac\{1\}/,"\\dfrac{$1}")+"$ , $f''(x)=6ax"+(k>0?"-":"+")+"\\dfrac{"+Math.abs(k)+"}{x^2}$ ។ $I(1,"+y0+")$ ជាចំណុចរបត់ ⇒ $f''(1)=0$ និង $f(1)="+y0+"$ ៖",
       AL(["f''(1)&=6a"+(k>0?"-":"+")+Math.abs(k)+"=0\\Rightarrow a="+aV,"f(1)&=a+b="+y0+"\\Rightarrow b="+y0+(k>0?"-":"+")+F(Math.abs(k),6)+"="+bV]))),
   Q("ផ្ទៀងផ្ទាត់ថា $f''(x)$ ប្ដូរសញ្ញាត្រង់ $x=1$ ។","$f''(x)="+DF(k,"x^3-1","x^2")+"$ ប្ដូរសញ្ញាត្រង់ $x=1$",
     W(AL(["f''(x)&="+(k===1?"":k===-1?"-":k)+"x"+(k>0?"-":"+")+"\\dfrac{"+Math.abs(k)+"}{x^2}="+DF(k,"x^3-1","x^2")+""]),STB(["0","1","+\\infty"],[["f''(x)",["",k>0?"-":"+","0",k>0?"+":"-",""]]]),"ដូចនេះ $f''$ ប្ដូរសញ្ញាត្រង់ $x=1$ ⇒ $I(1,"+y0+")$ ជាចំណុចរបត់ ។")),
   Q("សរសេរសមីការបន្ទាត់ប៉ះ $(T)$ នឹងក្រាប $(C)$ ត្រង់ចំណុច $I$ ។","$(T)\\colon "+tg+"$",
     W("$f(x)="+fx+"$",AL(["f'(1)&=3a"+co(k,"")+"="+F(k,2)+co(k,"")+"="+mT,"(T)&\\colon y=f'(1)(x-1)+f(1)="+mT+"(x-1)"+co(y0,""),"&\\ \\ "+tg])))]}}}];
FLN.push({id:"fln3",t:"សិក្សាអនុគមន៍ 2kx + b + k(1 − ln x)/x (g(x) = 2x² − 2 + ln x)",lv:3,f:function(){
  var k=pick([1,-1,1,-1,2,-2]),b=ri(-3,3),m=2*k,fm=3*k+b,pos=k>0,kt=k===1?"+":k===-1?"-":(k>0?"+":"-")+Math.abs(k),ka=Math.abs(k);
  var fx=co(m,"x",true)+co(b,"")+(k>0?"+":"-")+DF(ka,"1-\\ln x","x"),asy="y="+co(m,"x",true)+co(b,""),ye=co(m,"e",true)+co(b,"");
  var w=pos?[-0.5,5.5,fm-3,fm+4+4*ka]:[-0.5,5.5,fm-4-4*ka,fm+3];
  return{kfig:GRF(["y="+m+"*x"+js(b)+js(k)+"*(1-ln(x))/x blue","dash y="+m+"*x"+js(b),"A(1,"+fm+")"],w),
   inst:"ផ្នែក A ៖ គេឱ្យ $g(x)=2x^2-2+\\ln x$ កំណត់លើ $(0,+\\infty)$ ។ ផ្នែក B ៖ គេឱ្យ $f(x)="+fx+"$ កំណត់លើ $(0,+\\infty)$ មានក្រាប $(C)$ ។",it:[
   Q("(ផ្នែក A) សិក្សាអថេរភាពនៃ $g$ គណនា $g(1)$ រួចទាញរកសញ្ញានៃ $g(x)$ ។","$g(x)<0$ លើ $(0,1)$ , $g(x)>0$ លើ $(1,+\\infty)$",
     W("$g'(x)=4x+\\dfrac1x>0$ គ្រប់ $x>0$ ⇒ $g$ កើនជានិច្ចលើ $(0,+\\infty)$ ។ $g(1)=2-2+\\ln1=0$ ៖",STB(["0","1","+\\infty"],[["g(x)",["","-","0","+",""]]]))),
   Q("គណនា $\\lim\\limits_{x\\to0^+}f(x)$ និង $\\lim\\limits_{x\\to+\\infty}f(x)$ ។ ទាញរកអាស៊ីមតូតឈរ ។",(pos?"$+\\infty$ , $+\\infty$":"$-\\infty$ , $-\\infty$")+" ; $x=0$",
     W(AL(["\\lim_{x\\to0^+}\\dfrac{1-\\ln x}{x}&=\\lim_{x\\to0^+}(1-\\ln x)\\cdot\\dfrac1x=+\\infty","\\Rightarrow\\lim_{x\\to0^+}f(x)&="+(pos?"+":"-")+"\\infty",
       "\\lim_{x\\to+\\infty}\\dfrac{1-\\ln x}{x}&=\\lim_{x\\to+\\infty}\\left(\\dfrac1x-\\dfrac{\\ln x}{x}\\right)=0","\\Rightarrow\\lim_{x\\to+\\infty}f(x)&="+(pos?"+":"-")+"\\infty"]),"ដូចនេះ បន្ទាត់ $x=0$ ជាអាស៊ីមតូតឈរ ។")),
   Q("បង្ហាញថាបន្ទាត់ $(d)\\colon "+asy+"$ ជាអាស៊ីមតូតទ្រេតនៃ $(C)$ ។ សិក្សាទីតាំងរវាង $(C)$ និង $(d)$ ។","$(C)$ "+(pos?"នៅលើ":"នៅក្រោម")+" $(d)$ លើ $(0,e)$ · "+(pos?"នៅក្រោម":"នៅលើ")+" លើ $(e,+\\infty)$",
     W(AL(["f(x)-("+co(m,"x",true)+co(b,"")+")&="+DF(k,"1-\\ln x","x")+"\\xrightarrow[x\\to+\\infty]{}0"]),"ដូចនេះ $(d)$ ជាអាស៊ីមតូតទ្រេត ។ សញ្ញានៃ $f(x)-y$ ដូចសញ្ញា $"+(pos?"":"-")+"(1-\\ln x)$ ៖",
       STB(["0","e","+\\infty"],[["f(x)-y",["",pos?"+":"-","0",pos?"-":"+",""]]]),"$(C)$ "+(pos?"នៅលើ":"នៅក្រោម")+" $(d)$ លើ $(0,e)$ , "+(pos?"នៅក្រោម":"នៅលើ")+" $(d)$ លើ $(e,+\\infty)$ ហើយកាត់គ្នាត្រង់ $E\\left(e,"+ye+"\\right)$ ។")),
   Q("បង្ហាញថា $f'(x)="+DF(k,"g(x)","x^2")+"$ ។ សង់តារាងអថេរភាពនៃ $f$ ។","$f(1)="+fm+"$ ជា"+(pos?"អប្បបរមា":"អតិបរមា"),
     W(AL(["\\left(\\dfrac{1-\\ln x}{x}\\right)'&=\\dfrac{-\\frac1x\\cdot x-(1-\\ln x)}{x^2}=\\dfrac{\\ln x-2}{x^2}","f'(x)&="+m+co(k,"\\cdot\\dfrac{\\ln x-2}{x^2}"),"&="+DF(k,"2x^2-2+\\ln x","x^2")+"="+DF(k,"g(x)","x^2")]),
       "សញ្ញានៃ $f'(x)$ ដូចសញ្ញា $"+(pos?"":"-")+"g(x)$ ។ $f(1)="+m+co(b,"")+co(k,"")+"="+fm+"$",
       VT(["0","1","+\\infty"],["",pos?"-":"+","0",pos?"+":"-",""],[pos?"+\\infty":"-\\infty",pos?DN:UP,String(fm),pos?UP:DN,pos?"+\\infty":"-\\infty"]))),
   Q("គណនាផ្ទៃក្រឡា $S$ ខណ្ឌដោយ $(C)$ បន្ទាត់ $(d)$ និងបន្ទាត់ $x=1$ , $x=e$ ។","$S="+F(ka,2)+"$ ឯកតាផ្ទៃ",
     W("លើ $[1,e]$ ៖ $1-\\ln x\\ge0$ ⇒ $|f(x)-y|="+DF(ka,"1-\\ln x","x")+"$ ។ តាង $u=\\ln x\\Rightarrow du=\\dfrac{dx}{x}$ ៖",
       AL(["S&="+(ka===1?"":ka)+"\\int_1^e\\dfrac{1-\\ln x}{x}dx="+(ka===1?"":ka)+"\\left[\\ln x-\\dfrac{\\ln^2x}{2}\\right]_1^e","&="+(ka===1?"":ka)+"\\left(1-\\dfrac12\\right)-0="+F(ka,2)])))]}}});
FEX.push({id:"fexm",t:"សិក្សាអនុគមន៍ x + a − c/(eˣ − 1) (អាស៊ីមតូតទ្រេតពីរ · ផ្ចិតឆ្លុះ)",lv:3,f:function(){
  var c=pick([2,4,2,4,6]),a=ri(-2,2),yI=a+c/2,fx="x"+co(a,"")+"-\\dfrac{"+c+"}{e^x-1}",d1="y=x"+co(a,""),d2="y=x"+co(a+c,"");
  return{kfig:GRF(["y=x"+js(a)+"-"+c+"/(exp(x)-1) blue","dash y=x"+js(a),"dash y=x"+js(a+c),"dash x=0","I(0,"+yI+")"],[-5,5,yI-7,yI+7]),
   inst:"គេឱ្យអនុគមន៍ $f(x)="+fx+"$ មានក្រាបតំណាង $(C)$ ក្នុងតម្រុយអរតូណរម៉ាល់ $(O,\\vec i,\\vec j)$ ។",it:[
   Q("រកដែនកំណត់នៃ $f$ ។ គណនា $\\lim\\limits_{x\\to0^-}f(x)$ និង $\\lim\\limits_{x\\to0^+}f(x)$ រួចទាញរកអាស៊ីមតូតឈរ ។","$D_f=\\mathbb R\\setminus\\{0\\}$ ; $+\\infty$ , $-\\infty$ ; $x=0$",
     W("$f$ មានន័យ ⇔ $e^x-1\\ne0\\iff x\\ne0$ ⇒ $D_f=(-\\infty,0)\\cup(0,+\\infty)$ ។",AL(["x\\to0^-\\colon e^x-1\\to0^-&\\Rightarrow\\lim_{x\\to0^-}f(x)=+\\infty","x\\to0^+\\colon e^x-1\\to0^+&\\Rightarrow\\lim_{x\\to0^+}f(x)=-\\infty"]),"ដូចនេះ បន្ទាត់ $x=0$ ជាអាស៊ីមតូតឈរ ។")),
   Q("គណនាលីមីតនៃ $f$ ត្រង់ $\\pm\\infty$ ។ បង្ហាញថា $(d_1)\\colon "+d1+"$ និង $(d_2)\\colon "+d2+"$ ជាអាស៊ីមតូតទ្រេតនៃ $(C)$ ។","$\\lim\\limits_{x\\to-\\infty}f=-\\infty$ , $\\lim\\limits_{x\\to+\\infty}f=+\\infty$",
     W(AL(["\\lim_{x\\to+\\infty}f(x)&=+\\infty\\quad(e^x\\to+\\infty)","f(x)-(x"+co(a,"")+")&=-\\dfrac{"+c+"}{e^x-1}\\xrightarrow[x\\to+\\infty]{}0"]),"ដូចនេះ $(d_1)$ ជាអាស៊ីមតូតទ្រេតខាង $+\\infty$ ។",AL(["\\lim_{x\\to-\\infty}f(x)&=-\\infty\\quad(e^x\\to0)","f(x)-(x"+co(a+c,"")+")&=-\\dfrac{"+c+"}{e^x-1}-"+c,"&=-\\dfrac{"+c+"e^x}{e^x-1}\\xrightarrow[x\\to-\\infty]{}0"]),"ដូចនេះ $(d_2)$ ជាអាស៊ីមតូតទ្រេតខាង $-\\infty$ ។")),
   Q("បង្ហាញថាចំណុច $I(0,"+yI+")$ ជាផ្ចិតឆ្លុះនៃ $(C)$ ។","$f(-x)+f(x)="+2*yI+"$",
     W("គ្រប់ $x\\in D_f$ នោះ $-x\\in D_f$ ហើយ ៖",AL(["f(-x)&=-x"+co(a,"")+"-\\dfrac{"+c+"}{e^{-x}-1}","&=-x"+co(a,"")+"+\\dfrac{"+c+"e^x}{e^x-1}","f(-x)+f(x)&="+2*a+"+\\dfrac{"+c+"e^x-"+c+"}{e^x-1}","&="+2*a+"+"+c+"="+2*yI+"=2\\times"+pn(yI)]),"ដូចនេះ $I(0,"+yI+")$ ជាផ្ចិតឆ្លុះនៃ $(C)$ ។")),
   Q("គណនា $f'(x)$ រួចសង់តារាងអថេរភាពនៃ $f$ ។","$f'(x)=1+\\dfrac{"+c+"e^x}{(e^x-1)^2}>0$",
     W(AL(["f'(x)&=1-\\dfrac{-"+c+"e^x}{(e^x-1)^2}=1+\\dfrac{"+c+"e^x}{(e^x-1)^2}>0"]),"ដូចនេះ $f$ កើនដាច់ខាតលើ $(-\\infty,0)$ និងលើ $(0,+\\infty)$ ៖",
       VT(["-\\infty","0","+\\infty"],["","+","\\|","+",""],["-\\infty",UP,"+\\infty\\|-\\infty",UP,"+\\infty"]))),
   Q("សិក្សាទីតាំងរវាង $(C)$ និង $(d_1)$ ។ សង់ $(C)$ ។","$(C)$ នៅលើ $(d_1)$ ពេល $x<0$ · នៅក្រោមពេល $x>0$",
     W("$f(x)-(x"+co(a,"")+")=-\\dfrac{"+c+"}{e^x-1}$ ៖",STB(["-\\infty","0","+\\infty"],[["e^x-1",["","-","0","+",""]],["f(x)-y",["","+","\\|","-",""]]]),"ដូចនេះ $(C)$ នៅលើ $(d_1)$ លើ $(-\\infty,0)$ និងនៅក្រោម $(d_1)$ លើ $(0,+\\infty)$ ។"))]}}});
/* រចនាសម្ព័ន្ធ ក (តាមសៀវភៅ ២៣ វិញ្ញាសា)៖ I លីមីត+អាំងតេក្រាល ១៥ · II កុំផ្លិច ១៥ · III ប្រូបាប ១៥ · IV ED ១៥ · V កោនិក ១៥ · VI លំហ ២០ · VII អនុគមន៍ ៣០ */
var BAC7=[[[[22,"limint"],[51,"pfrac"],[51,"pfrac3"]],15],[[[11,"trig"],[11,"eq2"],[11,"x1x2"],[11,"cpi"]],15],[[[71,"col3"],[71,"num"],[71,"draw"],[71,"seq"],[71,"team"],[71,"perm"],[71,"repl"]],15],[[[62,"full"],[62,"rep"],[62,"ode2"],[61,"ode1"],[61,"ode1p"],[62,"ode2e"]],15],
  [[[82,"ell"],[83,"hyp"],[81,"par"],[82,"ellf"],[81,"par3"]],15],[[[102,"pl3m"],[102,"parQ"],[101,"vec3"],[102,"tetra"],[102,"refl"],[102,"lnpl"]],20],[FEX.map(function(x){return[42,x.id]}).concat(FLN.map(function(x){return[43,x.id]})),30]];
var REG={"12|11":C,"12|41":R,"12|71":PROB,"12|22":LIM,"12|51":INT,"12|61":ODE1,"12|62":ODE,"12|81":PAR,"12|82":ELL,"12|83":HYP,"12|101":VEC,"12|102":SPC,"12|42":FEX,"12|43":FLN,"12|23":CONT,"12|32":DER};
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
function sg(v){return v?(v<0?String(v):"+"+v):""}
function kx(c,v){v=v||"x";return c===1?v:c===-1?"-"+v:c+v}
function tm(c,v,first){if(!c)return"";return c<0?"-"+(c===-1?"":-c)+v:(first?"":"+")+(c===1?"":c)+v}
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
   var s=op4(v,[k[0]+k[1]+k[2],-v,k[0]-k[1]],function(c){return"$"+R(c)+"$"});
   return mcq("តម្លៃនៃកន្សោម $\\sqrt{"+k[0]*k[0]*r+"}-\\sqrt{"+k[1]*k[1]*r+"}+\\sqrt{"+k[2]*k[2]*r+"}$ គឺ",s.o,s.k,AL(["&\\sqrt{"+k[0]*k[0]*r+"}-\\sqrt{"+k[1]*k[1]*r+"}+\\sqrt{"+k[2]*k[2]*r+"}","={}&\\sqrt{"+k[0]*k[0]+"\\times"+r+"}-\\sqrt{"+k[1]*k[1]+"\\times"+r+"}+\\sqrt{"+k[2]*k[2]+"\\times"+r+"}","={}&"+R(k[0])+"-"+R(k[1])+"+"+R(k[2]),"={}&"+R(v)]))}];
/* ===== រូបធរណីមាត្រក្នុងចម្លើយ (kfig · FIG) — គូរតាមលេខពិតនៃលំហាត់ ===== */
function r3(v){return String(Math.round(v*1000)/1000)}
function isect(P1,P2,P3,P4){var d=(P1[0]-P2[0])*(P3[1]-P4[1])-(P1[1]-P2[1])*(P3[0]-P4[0]),a=P1[0]*P2[1]-P1[1]*P2[0],b=P3[0]*P4[1]-P3[1]*P4[0];return[(a*(P3[0]-P4[0])-(P1[0]-P2[0])*b)/d,(a*(P3[1]-P4[1])-(P1[1]-P2[1])*b)/d]}
function cint(A,D){var u=[D[0]-A[0],D[1]-A[1]],t=-2*(A[0]*u[0]+A[1]*u[1])/(u[0]*u[0]+u[1]*u[1]);return[A[0]+t*u[0],A[1]+t*u[1]]}
function proj(P,A,B){var u=[B[0]-A[0],B[1]-A[1]],t=((P[0]-A[0])*u[0]+(P[1]-A[1])*u[1])/(u[0]*u[0]+u[1]*u[1]);return[A[0]+t*u[0],A[1]+t*u[1]]}
function pd(p,d){return[p[0],p[1],d]}
function FG(pts,cmds,o){o=o||{};var xs=[],ys=[],L=[],k;for(k in pts){xs.push(pts[k][0]);ys.push(pts[k][1])}(o.ext||[]).forEach(function(p){xs.push(p[0]);ys.push(p[1])});
  var x0=Math.min.apply(null,xs),x1=Math.max.apply(null,xs),y0=Math.min.apply(null,ys),y1=Math.max.apply(null,ys),w,h,m=Math.max(x1-x0,y1-y0)*.1+(o.axes?1:.5);
  x0-=m;x1+=m;y0-=m;y1+=m;if(o.axes){x0=Math.floor(Math.min(x0,-1));x1=Math.ceil(Math.max(x1,1));y0=Math.floor(Math.min(y0,-1));y1=Math.ceil(Math.max(y1,1))}
  w=x1-x0;h=y1-y0;if(h/w<.6){var e=(.6*w-h)/2;y0-=e;y1+=e}else if(h/w>1.2){var e2=(h/1.2-w)/2;x0-=e2;x1+=e2}
  if(!o.axes)L.push("nogrid","noaxes");L.push("window x="+r3(x0)+".."+r3(x1)+" y="+r3(y0)+".."+r3(y1));
  for(k in pts)L.push(k+"("+r3(pts[k][0])+","+r3(pts[k][1])+")"+(pts[k][2]?" "+pts[k][2]:""));
  return L.concat(cmds).join("\n")}
function sgs(a,c){return a.map(function(p){return"seg "+p+" "+(c||"black")})}
function rts(a){return a.map(function(p){return"right "+p})}
var GF={
 geo1:function(){var r=3,A=[-r,0],B=[r,0],M=[-r/2,r*Math.sqrt(3)/2],D=[(M[0]+B[0])/2,(M[1]+B[1])/2],N=cint(A,D);
   return FG({O:[0,0,"s"],A:pd(A,"w"),B:pd(B,"e"),M:pd(M,"n"),D:pd(D,"s"),N:pd(N,"ne")},["circle O "+r+" black"].concat(sgs(["A B","A M","M B","A N","N B"]),rts(["A M B","A N B"])),{ext:[[-r,-r],[r,r]]})},
 geo2:function(){var H=[0,0],B=[-1.6,0],C=[3.6,0],A=[0,2.4],D=proj(H,A,B),E=proj(H,A,C);
   return FG({A:pd(A,"n"),B:pd(B,"w"),C:pd(C,"e"),H:pd(H,"s"),D:pd(D,"nw"),E:pd(E,"ne")},["circle (0,1.2) 1.2 gray"].concat(sgs(["A B","A C","B C","A H","H D","H E"]),sgs(["D E"],"gray"),rts(["B A C","A H C","A D H","A E H"])))},
 geo3:function(al){var r=3,M=[-r,0],N=[r,0],a=2*al*Math.PI/180,b=(90+al)*Math.PI/180,Qp=[r*Math.cos(a),r*Math.sin(a)],P=[r*Math.cos(b),r*Math.sin(b)],H=isect(N,P,M,Qp);
   return FG({O:[0,0,"s"],M:pd(M,"w"),N:pd(N,"e"),Q:pd(Qp,"ne"),P:pd(P,"nw"),H:pd(H,"s")},["circle O "+r+" black"].concat(sgs(["M N","M Q","Q N","N P","M P"]),sgs(["O Q"],"gray"),rts(["M Q N","M P N"]),["angle N M Q "+al+"°"]),{ext:[[-r,-r],[r,r]]})},
 geo4:function(AB,BD){var r=3,k=2*r/AB,A=[-r,0],B=[r,0],D=[r,BD*k],N=cint(A,D);
   return FG({O:[0,0,"s"],A:pd(A,"w"),B:pd(B,"se"),D:pd(D,"ne"),N:pd(N,"nw")},["circle O "+r+" black","text ("+r3(r+.25)+","+r3(D[1]*.55)+") d"].concat(sgs(["A B","B D","A D","B N"]),rts(["A B D","A N B"])),{ext:[[-r,-r],[r,r]]})},
 geo5:function(){var r=3,f=function(t){t*=Math.PI/180;return[r*Math.cos(t),r*Math.sin(t)]},A=f(100),B=f(215),C=f(330),D=[-A[0],-A[1]],H=proj(A,B,C);
   return FG({O:[0,0,"e"],A:pd(A,"n"),B:pd(B,"w"),C:pd(C,"e"),D:pd(D,"s"),H:pd(H,"ne")},["circle O "+r+" black"].concat(sgs(["A B","B C","C A","A H","B D","C D"]),sgs(["A D"],"gray"),rts(["A H C","A C D","A B D"])),{ext:[[-r,-r],[r,r]]})},
 geo6:function(){var r=3,s=r*Math.sqrt(3)/2;
   return FG({O:[0,0,"s"],A:[-r,0,"w"],B:[r,0,"se"],H:[r/2,0,"sw"],C:[r/2,s,"n"],D:[r/2,-s,"s"],E:[2*r,2*s,"ne"]},["circle O "+r+" black"].concat(sgs(["A B","C D","A E","D E","B C"]),rts(["O H C","A C B"])),{ext:[[-r,-r],[r,r]]})},
 geo7:function(AB,BM,AM){var r=3,k=2*r/AB,A=[-r,0],B=[r,0],c=AM/AB,s=BM/AB,M=[A[0]+AM*k*c,AM*k*s],D=[r+BM*k,0],N=[D[0],(D[0]-A[0])*s/c],I=[(B[0]+N[0])/2,N[1]/2];
   return FG({O:[0,0,"s"],A:pd(A,"w"),B:pd(B,"s"),M:pd(M,"nw"),D:pd(D,"se"),N:pd(N,"ne"),I:pd(I,"e")},["circle O "+r+" black","circle I B gray"].concat(sgs(["A D","A N","D N","B M","B N"]),rts(["A M B","B D N"])),{ext:[[-r,-r],[r,r],[I[0]-Math.hypot(I[0]-B[0],I[1]),I[1]-Math.hypot(I[0]-B[0],I[1])],[I[0]+Math.hypot(I[0]-B[0],I[1]),I[1]+Math.hypot(I[0]-B[0],I[1])]]})},
 geo8:function(PA,r0,OP){var r=2.5,k=r/r0,P=[OP*k,0],t=Math.acos(r0/OP),A=[r*Math.cos(t),r*Math.sin(t)],B=[A[0],-A[1]];
   return FG({O:[0,0,"w"],A:pd(A,"n"),B:pd(B,"s"),P:pd(P,"e")},["circle O "+r+" black"].concat(sgs(["P A","P B","O A","O B"]),sgs(["O P"],"gray"),rts(["O A P","O B P"])),{ext:[[-r,-r],[r,r]]})},
 coord:function(A,B,C,E,I){return FG({A:A,B:B,C:C,E:E,I:I},["line A B blue","line C I red","seg C A gray","seg C B gray","right B I C"],{axes:1})},
 c2a:function(m,c,xA,yA,xM,yM){var d1=[xM-2,yM-2*m],d2=[xM+2,yM+2*m];return FG({A:[xA,yA],M:[xM,yM]},["line ("+r3(d1[0])+","+r3(d1[1])+") ("+r3(d2[0])+","+r3(d2[1])+") blue","line A M red","right A M ("+r3(d2[0])+","+r3(d2[1])+")"],{axes:1})},
 c2b:function(A,B,C,M,H){return FG({A:A,B:B,C:C,M:M,H:H},["poly A B C gray","line A B blue","seg C M green","seg C H red","right C H B"],{axes:1})}};
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
       W(a1===a2?"":[a2===1?"":"គុណ $(1)$ នឹង $"+a2+"$",a1===1?"":"គុណ $(2)$ នឹង $"+a1+"$"].filter(Boolean).join(" និង ")+" ៖",a1===a2?"":"$$\\begin{cases}"+E(a1*a2,b1*a2,c1*a2)+"\\\\"+E(a1*a2,b2*a1,c2*a1)+"\\end{cases}$$",
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
 /* ប្រូបាបថ្នាក់ទី៩៖ មិនទាន់រៀនចម្លាស់/បន្សំ → ប្រើគោលការណ៍ផលគុណ (ប្រូបាបមានលក្ខខណ្ឌ) «តាម … គេបាន … ដូចនេះ» */
 prob:{id:"prob",t:"ប្រូបាប · រកចំនួនឃ្លី + ចាប់ ២ ពណ៌ដូចគ្នា",lv:2,f:function(){var r=ri(2,6),b=ri(2,8),w=ri(2,7),T=r+b+w,S2=r*(r-1)+b*(b-1)+w*(w-1),C2=T*(T-1);
    var fr2=function(n){return"\\dfrac{"+n+"}{"+T+"}\\times\\dfrac{"+(n-1)+"}{"+(T-1)+"}"};
    return{inst:"ក្នុងថង់មួយមានឃ្លីសរុបចំនួន $"+T+"$ គ្រាប់ ដែលមានពណ៌ខៀវ ពណ៌ក្រហម និងពណ៌ស ។ សុភាពចាប់យកឃ្លី $1$ គ្រាប់ចេញពីក្នុងថង់ដោយចៃដន្យ ។ គេដឹងថាប្រូបាបដែលចាប់បានឃ្លីពណ៌ក្រហមស្មើនឹង $"+F(r,T)+"$ និងប្រូបាបដែលចាប់បានឃ្លីពណ៌ខៀវស្មើនឹង $"+F(b,T)+"$ ។",it:[
      Q("រកចំនួនឃ្លីនៃពណ៌នីមួយៗ ។","ក្រហម $"+r+"$ គ្រាប់ , ខៀវ $"+b+"$ គ្រាប់ , ស $"+w+"$ គ្រាប់",
        W("ចំនួនឃ្លីក្រហម ៖ $"+T+"\\times"+F(r,T)+"="+r+"$ គ្រាប់","ចំនួនឃ្លីខៀវ ៖ $"+T+"\\times"+F(b,T)+"="+b+"$ គ្រាប់","ចំនួនឃ្លីស ៖ $"+T+"-"+r+"-"+b+"="+w+"$ គ្រាប់")),
      Q("បើសុភាពចាប់យកឃ្លី $2$ គ្រាប់ព្រមគ្នា ។ រកប្រូបាបដែលគាត់ចាប់បានឃ្លីទាំងពីរគ្រាប់មានពណ៌ដូចគ្នា ។","$P(E)="+F(S2,C2)+"$",
        W("$E$ ៖ «ចាប់បានឃ្លីពណ៌ដូចគ្នា» = ក្រហមទាំងពីរ ឬ ខៀវទាំងពីរ ឬ សទាំងពីរ",
          AL(["\\text{តាម }P(E)&=P(ក)\\times P(ក/ក)","&\\quad+P(ខ)\\times P(ខ/ខ)","&\\quad+P(ស)\\times P(ស/ស)","\\text{គេបាន }P(E)&="+fr2(r)+"+"+fr2(b),"&\\quad+"+fr2(w),"&=\\dfrac{"+(r*(r-1))+"+"+(b*(b-1))+"+"+(w*(w-1))+"}{"+C2+"}=\\dfrac{"+S2+"}{"+C2+"}"+(gcd(S2,C2)===1?"":"="+F(S2,C2))])))]}}},
 prob2:{id:"prob2",t:"ប្រូបាប · សំណួរប្រឡង (ធ្វើបាន ២ គត់ · យ៉ាងតិច ២)",lv:2,f:function(){var n=6,k=pick([3,4]),m=n-k,e=3*k*(k-1)*m,k3=k*(k-1)*(k-2),l=e+k3,D=120;
    var t1="\\dfrac{"+k+"}{6}\\times\\dfrac{"+(k-1)+"}{5}\\times\\dfrac{"+m+"}{4}";
    return{inst:"គ្រូដាក់សំណួរមេរៀន $"+n+"$ តាងដោយអក្សរ $A, B, C, D, E$ និង $F$ ហើយគ្រូនឹងដកស្រង់យកបីសំណួរឱ្យសិស្សប្រឡងយកពិន្ទុ ។ បើសិស្សម្នាក់ធ្វើបានតែ $"+k+"$ សំណួរ ៖",it:[
      Q("រកប្រូបាបដែលសិស្សនោះធ្វើបានពីរសំណួរគត់ ។","$P(E)="+F(e,D)+"$",
        W("តាង ច = សំណួរធ្វើបាន ($"+k+"$) និង ម = សំណួរធ្វើមិនបាន ($"+m+"$) ។ ធ្វើបានពីរគត់ = ចចម ឬ ចមច ឬ មចច (មានប្រូបាបស្មើគ្នា)",
          AL(["\\text{តាម }P(E)&=P(ចចម)+P(ចមច)+P(មចច)","&=3\\times P(ច)\\times P(ច/ច)\\times P(ម/ចច)","\\text{គេបាន }P(E)&=3\\times"+t1,"&=\\dfrac{"+e+"}{"+D+"}="+F(e,D)]))),
      Q("រកប្រូបាបដែលសិស្សនោះធ្វើបានពីរសំណួរយ៉ាងតិច ។","$P(F)="+F(l,D)+"$",
        W("ធ្វើបានយ៉ាងតិចពីរ = ធ្វើបានពីរគត់ ឬ ធ្វើបានទាំងបី (ចចច)",
          AL(["\\text{តាម }P(F)&=P(E)+P(ចចច)","P(ចចច)&=\\dfrac{"+k+"}{6}\\times\\dfrac{"+(k-1)+"}{5}\\times\\dfrac{"+(k-2)+"}{4}=\\dfrac{"+k3+"}{"+D+"}","\\text{គេបាន }P(F)&=\\dfrac{"+e+"}{"+D+"}+\\dfrac{"+k3+"}{"+D+"}=\\dfrac{"+l+"}{"+D+"}"+(gcd(l,D)===1?"":"="+F(l,D))])))]}}},
 prob3:{id:"prob3",t:"ប្រូបាប · ចាប់ ៣ គ្រាប់ព្រមគ្នា (ពីរពណ៌)",lv:2,f:function(){var y=ri(4,7),b=ri(3,6),T=y+b,D=T*(T-1)*(T-2),Y3=y*(y-1)*(y-2),Y2=3*y*(y-1)*b;
    return{inst:"ក្នុងថង់មួយមានឃ្លីលឿង $"+y+"$ គ្រាប់ និងឃ្លីខៀវ $"+b+"$ គ្រាប់ ។ គេចាប់យកឃ្លី $3$ គ្រាប់តែម្ដង ។",it:[
      Q("រកប្រូបាបនៃព្រឹត្តិការណ៍ដែលចាប់បានឃ្លីលឿងទាំងបីគ្រាប់ ។","$P(A)="+F(Y3,D)+"$",
        AL(["\\text{តាម }P(A)&=P(ល)\\times P(ល/ល)\\times P(ល/លល)","\\text{គេបាន }P(A)&=\\dfrac{"+y+"}{"+T+"}\\times\\dfrac{"+(y-1)+"}{"+(T-1)+"}\\times\\dfrac{"+(y-2)+"}{"+(T-2)+"}","&=\\dfrac{"+Y3+"}{"+D+"}"+(gcd(Y3,D)===1?"":"="+F(Y3,D))])),
      Q("រកប្រូបាបនៃព្រឹត្តិការណ៍ដែលចាប់បានឃ្លីខៀវមួយយ៉ាងតិច ។","$P(B)="+F(D-Y3,D)+"$",
        W("ព្រឹត្តិការណ៍ $B$ ជាព្រឹត្តិការណ៍ផ្ទុយនៃ $A$ (លឿងទាំងបី)",AL(["\\text{តាម }P(B)&=1-P(A)","\\text{គេបាន }P(B)&=1-"+F(Y3,D)+"="+F(D-Y3,D)]))),
      Q("រកប្រូបាបនៃព្រឹត្តិការណ៍ដែលចាប់បានឃ្លីលឿង $2$ គ្រាប់ និងឃ្លីខៀវ $1$ គ្រាប់ ។","$P(C)="+F(Y2,D)+"$",
        W("លឿង $2$ និងខៀវ $1$ = លលខ ឬ លខល ឬ ខលល (មានប្រូបាបស្មើគ្នា)",
          AL(["\\text{តាម }P(C)&=3\\times P(ល)\\times P(ល/ល)\\times P(ខ/លល)","\\text{គេបាន }P(C)&=3\\times\\dfrac{"+y+"}{"+T+"}\\times\\dfrac{"+(y-1)+"}{"+(T-1)+"}\\times\\dfrac{"+b+"}{"+(T-2)+"}","&=\\dfrac{"+Y2+"}{"+D+"}"+(gcd(Y2,D)===1?"":"="+F(Y2,D))])))]}}},
 coord:{id:"coord",t:"តម្រុយ · បន្ទាត់ · ចំណុចកណ្ដាល · ត្រីកោណសមបាត",lv:2,f:function(){
   var dx=nz(1,2),dy=nz(-3,3),A0=[ri(-2,2),ri(-2,2)],I=[A0[0]+dx,A0[1]+dy],B0=[A0[0]+2*dx,A0[1]+2*dy],t=pick([1,-1]),C0=[I[0]-t*dy,I[1]+t*dx],E0=[A0[0]-dx,A0[1]-dy],P=function(p){return"("+p.join(",")+")"},sl=F(dy,dx),sl2=F(-dx,dy),L2=2*(dx*dx+dy*dy);
   return{kfig:GF.coord(A0,B0,C0,E0,I),inst:"ក្នុងតម្រុយអរតូណរមេ $(xOy)$ គេមានចំណុច $A"+P(A0)+"$ ; $B"+P(B0)+"$ និង $C"+P(C0)+"$ ។",it:[
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
     return{kfig:GF.c2a(m,c,xA,yA,X/K,(m*X+c*K)/K),inst:"ក្នុងតម្រុយអរតូណរមេ $(xOy)$ គេមានបន្ទាត់ $d\\colon y="+kx(m)+sg(c)+"$ និងចំណុច $A"+P(xA,yA)+"$ ។",it:[
       Q("រកសមីការនៃបន្ទាត់ $d'$ ដែលកាត់តាមចំណុច $A$ ហើយកែងនឹងបន្ទាត់ $d$ ។","$d'\\colon "+lineT(-1,m,xA,yA)+"$",
         W("$d$ មានមេគុណប្រាប់ទិស $a="+m+"$ ។ ដោយ $d'\\perp d$ នោះ $a'="+F(-1,m)+"$ ៖",AL(["y-y_A&=a'(x-x_A)","y-"+pn(yA)+"&="+F(-1,m)+"(x-"+pn(xA)+")","y&="+lineT(-1,m,xA,yA).slice(2)]))),
       Q("គណនាកូអរដោនេចំណុច $M$ ជាចំណុចប្រសព្វរវាងបន្ទាត់ $d$ និង $d'$ ។","$M\\left("+xM+","+yM+"\\right)$",
         W("ផ្ទឹមសមីការទាំងពីរ ៖",AL([kx(m)+sg(c)+"&="+lineT(-1,m,xA,yA).slice(2)]),m===1?"":"គុណអង្គទាំងពីរនឹង $"+m+"$ ៖",AL((m===1?[]:[kx(m*m)+sg(m*c)+"&=-x"+(xA+m*yA?sg(xA+m*yA):"")]).concat([kx(K)+"&="+X,"x&="+xM])),"ជំនួសក្នុងសមីការ $d$ ៖ $y="+m+"\\times"+(X%K?"\\left("+xM+"\\right)":pn(X/K))+sg(c)+"="+yM+"$")),
       Q("គណនាចម្ងាយ $AM$ ។","$AM="+St(S(Math.abs(N),K,K))+"$",
         AL(["AM&=\\sqrt{\\left("+xA+"-"+(X%K?"\\left("+xM+"\\right)":pn(X/K))+"\\right)^2+\\left("+yA+"-"+((m*X+c*K)%K?"\\left("+yM+"\\right)":pn((m*X+c*K)/K))+"\\right)^2}","&=\\sqrt{\\left("+F(m*N,K)+"\\right)^2+\\left("+F(-N,K)+"\\right)^2}","&=\\sqrt{"+F(N*N,K)+"}="+St(S(Math.abs(N),K,K))]))]}}
   var A0,B0,C0,dx,dy,xM,yM;do{A0=[ri(-3,1),ri(-2,3)];dx=2*ri(1,3);dy=2*nz(-2,2);B0=[A0[0]+dx,A0[1]+dy];xM=A0[0]+dx/2;yM=A0[1]+dy/2;C0=[ri(-2,3),ri(2,6)]}
   while(C0[0]===xM||C0[1]===A0[1]+dy*(C0[0]-A0[0])/dx);
   var n=dy,d=dx,g=gcd(n,d);n/=g;d/=g;var Kh=n*n+d*d,X=n*n*A0[0]-n*d*A0[1]+d*d*C0[0]+n*d*C0[1],xH=F(X,Kh),yH=F(n*(X-A0[0]*Kh)+A0[1]*d*Kh,d*Kh);
   return{kfig:GF.c2b(A0,B0,C0,[xM,yM],[X/Kh,(n*(X-A0[0]*Kh)+A0[1]*d*Kh)/(d*Kh)]),inst:"ចូរដៅចំណុច $A"+P(A0[0],A0[1])+"$ , $B"+P(B0[0],B0[1])+"$ និង $C"+P(C0[0],C0[1])+"$ ក្នុងតម្រុយអរតូណរមេ $(xOy)$ ។",it:[
     Q("រកសមីការនៃបន្ទាត់ $(AB)$ ។","$(AB)\\colon "+lineT(n,d,A0[0],A0[1])+"$",AL(["a_{AB}&=\\dfrac{"+B0[1]+"-"+pn(A0[1])+"}{"+B0[0]+"-"+pn(A0[0])+"}="+F(n,d),"y-"+pn(A0[1])+"&="+F(n,d)+"(x-"+pn(A0[0])+")","y&="+lineT(n,d,A0[0],A0[1]).slice(2)])),
     Q("គេគូសមេដ្យាន $(CM)$ នៃត្រីកោណ $ABC$ ។ រកកូអរដោនេចំណុច $M$ និងសមីការ $(CM)$ ។","$M"+P(xM,yM)+"$ , $(CM)\\colon "+lineT(yM-C0[1],xM-C0[0],C0[0],C0[1])+"$",
       W("$M$ ជាចំណុចកណ្ដាលនៃ $[AB]$ ៖",AL(["M&=\\left(\\dfrac{"+A0[0]+sg(B0[0])+"}{2},\\dfrac{"+A0[1]+sg(B0[1])+"}{2}\\right)="+P(xM,yM),"a_{CM}&=\\dfrac{"+yM+"-"+pn(C0[1])+"}{"+xM+"-"+pn(C0[0])+"}="+F(yM-C0[1],xM-C0[0]),"(CM)\\colon y&="+lineT(yM-C0[1],xM-C0[0],C0[0],C0[1]).slice(2)]))),
     Q("គេគូសកម្ពស់ $(CH)$ នៃត្រីកោណ $ABC$ ។ រកសមីការនៃបន្ទាត់ $(CH)$ ។","$(CH)\\colon "+lineT(-d,n,C0[0],C0[1])+"$",
       W("$(CH)\\perp(AB)$ ⇒ $a_{CH}\\times"+(F(n,d).indexOf("-")===0?"\\left("+F(n,d)+"\\right)":F(n,d))+"=-1$ ⇒ $a_{CH}="+F(-d,n)+"$",AL(["y-"+pn(C0[1])+"&="+F(-d,n)+"(x-"+pn(C0[0])+")","y&="+lineT(-d,n,C0[0],C0[1]).slice(2)]))),
     Q("រកកូអរដោនេនៃចំណុច $H$ ។","$H\\left("+xH+","+yH+"\\right)$",
       W("$H$ ជាចំណុចប្រសព្វរវាង $(AB)$ និង $(CH)$ ៖",AL([lineT(n,d,A0[0],A0[1]).slice(2)+"&="+lineT(-d,n,C0[0],C0[1]).slice(2),"x&="+xH,"y&="+yH])))]}}},
 geo1:{id:"geo1",t:"រង្វង់ · អង្កត់ផ្ចិត · ត្រីកោណដូចគ្នា (MD² = AD × ND)",lv:3,f:function(){var R=ri(3,8),BM=sqrtT(3*R*R),MD=St(S(R,2,3)),AD=St(S(R,2,7)),ND=St(S(3*R,14,7));
   return{kfig:GF.geo1(),inst:"គេឱ្យរង្វង់ផ្ចិត $O$ មានអង្កត់ផ្ចិត $AB="+2*R+"$ cm ហើយ $M$ ជាចំណុចមួយនៅលើរង្វង់នេះ ដែល $AM="+R+"$ cm ។",it:[
     Q("បញ្ជាក់ប្រភេទត្រីកោណ $AMB$ រួចគណនាប្រវែង $BM$ ។","$\\triangle AMB$ កែងត្រង់ $M$ , $BM="+BM+"$ cm",
       W("ដោយ $AB$ ជាអង្កត់ផ្ចិត ហើយ $M$ នៅលើរង្វង់ នោះ $\\angle AMB=90^\\circ$ (មុំចារឹកកន្លះរង្វង់) ⇒ $\\triangle AMB$ កែងត្រង់ $M$ ។","តាមទ្រឹស្ដីបទពីតាករ ៖",AL(["BM^2&=AB^2-AM^2","&="+2*R+"^2-"+R+"^2="+4*R*R+"-"+R*R+"="+3*R*R,"BM&=\\sqrt{"+3*R*R+"}="+BM+"\\text{ cm}"]))),
     Q("$D$ ជាចំណុចកណ្ដាលនៃអង្កត់ $BM$ ។ គេបន្លាយបន្ទាត់ $AD$ ឱ្យកាត់រង្វង់ត្រង់ចំណុច $N$ ។ ប្រៀបធៀបត្រីកោណ $AMD$ និង $BND$ រួចទាញបញ្ជាក់ថា $MD^2=AD\\times ND$ ។","$\\triangle AMD\\sim\\triangle BND$ និង $MD^2=AD\\times ND$",
       W("គេមាន ៖ $\\angle AMD=\\angle BND=90^\\circ$ (មុំចារឹកកន្លះរង្វង់) និង $\\angle ADM=\\angle BDN$ (មុំទល់កំពូល)","⇒ $\\triangle AMD\\sim\\triangle BND$ (ករណីទី១ ម.ម) ។ តាមផលធៀបដំណូច ៖",
         AL(["\\dfrac{AD}{BD}&=\\dfrac{MD}{ND}","AD\\times ND&=BD\\times MD"]),"ដោយ $D$ ជាចំណុចកណ្ដាលនៃ $BM$ នោះ $BD=MD$ ⇒ $MD^2=AD\\times ND$")),
     Q("គណនាប្រវែង $AD$ និង $ND$ ។","$AD="+AD+"$ cm , $ND="+ND+"$ cm",
       W("$MD=\\dfrac{BM}{2}="+MD+"$ cm ។ ក្នុងត្រីកោណកែង $AMD$ ៖",AL(["AD^2&=AM^2+MD^2="+R*R+"+"+F(3*R*R,4)+"="+F(7*R*R,4),"AD&="+AD+"\\text{ cm}","ND&=\\dfrac{MD^2}{AD}="+F(3*R*R,4)+"\\times\\dfrac{2}{"+(R===1?"":R)+"\\sqrt7}="+ND+"\\text{ cm}"])))]}}},
 geo2:{id:"geo2",t:"ត្រីកោណកែង · កម្ពស់ AH · ចតុកោណចារឹក",lv:3,f:function(){
   var T2=pick([[3,4,5],[6,8,10],[5,12,13],[9,12,15],[8,6,10],[12,5,13]]),pAB=T2[0],pAC=T2[1],pBC=T2[2];
   return{kfig:GF.geo2(),inst:"ក្នុងត្រីកោណ $ABC$ កែងត្រង់ $A$ គេគូសកម្ពស់ $[AH]$ ។ រង្វង់មានអង្កត់ផ្ចិត $[AH]$ កាត់ $AB$ ត្រង់ $D$ និងកាត់ $(AC)$ ត្រង់ $E$ ។",it:[
     Q("ប្រាប់ឈ្មោះចតុកោណ $ADHE$ ។","$ADHE$ ជាចតុកោណកែង",
       W("ដោយ $AH$ ជាអង្កត់ផ្ចិត នោះ $\\angle ADH=90^\\circ$ និង $\\angle AEH=90^\\circ$ (មុំចារឹកកន្លះរង្វង់) ។","ម្យ៉ាងទៀត $\\angle DAE=\\angle BAC=90^\\circ$ ។ ចតុកោណ $ADHE$ មានមុំកែងបី ⇒ ជាចតុកោណកែង ។")),
     Q("ប្រៀបធៀបត្រីកោណ $ABC$ និង $AED$ រួចទាញបង្ហាញថា $AB\\cdot AD=AC\\cdot AE$ ។","$\\triangle ABC\\sim\\triangle AED$ និង $AB\\cdot AD=AC\\cdot AE$",
       W("គេមាន $\\angle AED=\\angle AHD$ (មុំចារឹកស្កាត់ធ្នូ $AD$) និង $\\angle AHD=\\angle ABC$ (មុំមានជ្រុងកែងរៀងគ្នា) ⇒ $\\angle AED=\\angle ABC$ ។","ហើយ $\\angle A$ ជាមុំរួម ⇒ $\\triangle ABC\\sim\\triangle AED$ (ករណីទី១ ម.ម) ។ តាមផលធៀបដំណូច ៖",AL(["\\dfrac{AB}{AE}&=\\dfrac{AC}{AD}","AB\\cdot AD&=AC\\cdot AE"]))),
     Q("បង្ហាញថាចតុកោណ $BDEC$ ចារឹកក្នុងរង្វង់មួយ ។","$BDEC$ ចារឹកក្នុងរង្វង់",
       W("តាមសំណួរទី២ $\\angle ADE=\\angle ACB$ ។ ដោយ $\\angle ADE+\\angle BDE=180^\\circ$ (មុំបន្ទាប់បន្សំ) ⇒ $\\angle BDE+\\angle BCE=180^\\circ$ ។","ចតុកោណ $BDEC$ មានផលបូកមុំឈមពីរស្មើ $180^\\circ$ ⇒ ចារឹកក្នុងរង្វង់ ។")),
     Q("គេឱ្យ $AB="+pAB+"$ cm និង $AC="+pAC+"$ cm ។ គណនា $BC$ , $AH$ និង $AD$ ។","$BC="+pBC+"$ cm , $AH="+fv(pAB*pAC,pBC)+"$ cm , $AD="+fv(pAB*pAC*pAC,pBC*pBC)+"$ cm",
       W("ក្នុងត្រីកោណកែង $ABC$ ៖",AL(["BC&=\\sqrt{AB^2+AC^2}=\\sqrt{"+pAB*pAB+"+"+pAC*pAC+"}="+pBC+"\\text{ cm}","AH&=\\dfrac{AB\\times AC}{BC}=\\dfrac{"+pAB+"\\times"+pAC+"}{"+pBC+"}="+fv(pAB*pAC,pBC)+"\\text{ cm}"]),"ក្នុងត្រីកោណកែង $AHB$ (កែងត្រង់ $H$) មាន $HD$ ជាកម្ពស់ ៖",AL(["AH^2&=AD\\times AB\\Rightarrow AD=\\dfrac{AH^2}{AB}="+fv(pAB*pAC*pAC,pBC*pBC)+"\\text{ cm}"])))]}}},
 geo3:{id:"geo3",t:"រង្វង់ · មុំផ្ចិត · មុំចារឹក · ត្រីកោណដូចគ្នា",lv:2,f:function(){var al=pick([25,30,35,40]);
   return{kfig:GF.geo3(al),inst:"គេមានរង្វង់ផ្ចិត $O$ និងអង្កត់ផ្ចិត $MN$ ។ $Q$ ជាចំណុចមួយនៅលើរង្វង់ដែល $\\angle NMQ="+al+"^\\circ$ ។",it:[
     Q("គណនារង្វាស់ $\\angle NOQ$ ។","$\\angle NOQ="+2*al+"^\\circ$",
       W("$\\angle NMQ$ ជាមុំចារឹក និង $\\angle NOQ$ ជាមុំផ្ចិត ដែលស្កាត់ធ្នូ $NQ$ ដូចគ្នា ៖",AL(["\\angle NOQ&=2\\angle NMQ=2\\times"+al+"^\\circ="+2*al+"^\\circ"]))),
     Q("ប្រាប់ប្រភេទត្រីកោណ $MNQ$ ។","$\\triangle MNQ$ ជាត្រីកោណកែងត្រង់ $Q$",
       W("ដោយ $MN$ ជាអង្កត់ផ្ចិត នោះ $\\angle MQN=90^\\circ$ (មុំចារឹកកន្លះរង្វង់) ។",AL(["\\angle MNQ&=180^\\circ-90^\\circ-"+al+"^\\circ="+(90-al)+"^\\circ"]),al===30?"$\\triangle MNQ$ មានមុំ $30^\\circ, 60^\\circ, 90^\\circ$ ជាត្រីកោណកន្លះសម័ង្ស ។":"")),
     Q("ដៅចំណុច $P$ នៅលើធ្នូតូច $MQ$ រួចគូសបន្ទាត់ $NP$ កាត់អង្កត់ $MQ$ ត្រង់ចំណុច $H$ ។ ប្រដូច $\\triangle MHP$ និង $\\triangle NHQ$ រួចទាញវិបាក ។","$\\triangle MHP\\sim\\triangle NHQ$ ⇒ $HM\\cdot HQ=HP\\cdot HN$",
       W("គេមាន $\\angle MHP=\\angle NHQ$ (មុំទល់កំពូល) និង $\\angle MPH=\\angle NQH=90^\\circ$ (មុំចារឹកកន្លះរង្វង់)","⇒ $\\triangle MHP\\sim\\triangle NHQ$ (ករណីទី១ ម.ម) ។ តាមផលធៀបដំណូច ៖",AL(["\\dfrac{MH}{NH}&=\\dfrac{HP}{HQ}=\\dfrac{MP}{NQ}","HM\\cdot HQ&=HP\\cdot HN"])))]}}},
 geo4:{id:"geo4",t:"បន្ទាត់ប៉ះត្រង់ B · BD² = AD × DN",lv:3,f:function(){var t=pick([[8,6,10],[6,8,10],[15,20,25],[12,5,13],[5,12,13],[12,9,15]]),AB=t[0],BD=t[1],AD=t[2];
   return{kfig:GF.geo4(AB,BD),inst:"គូសរង្វង់ផ្ចិត $O$ អង្កត់ផ្ចិត $AB="+AB+"$ cm ។ គូសបន្ទាត់ $d$ ប៉ះរង្វង់ត្រង់ $B$ ។ ដៅចំណុច $D$ នៅលើបន្ទាត់ $d$ ដែល $BD="+BD+"$ cm ។ បន្ទាត់ $AD$ កាត់រង្វង់ត្រង់ចំណុច $N$ ។",it:[
     Q("ប្រាប់ឈ្មោះត្រីកោណ $ABD$ និងត្រីកោណ $ANB$ ។","$\\triangle ABD$ កែងត្រង់ $B$ , $\\triangle ANB$ កែងត្រង់ $N$",
       W("$\\angle ABD=90^\\circ$ (ព្រោះ $d$ ប៉ះរង្វង់ត្រង់ $B$ ⇒ $d\\perp AB$) ⇒ $\\triangle ABD$ កែងត្រង់ $B$ ។","$\\angle ANB=90^\\circ$ (មុំចារឹកកន្លះរង្វង់) ⇒ $\\triangle ANB$ កែងត្រង់ $N$ ។")),
     Q("គណនាប្រវែង $AD$ និង $BN$ ។","$AD="+AD+"$ cm , $BN="+fv(AB*BD,AD)+"$ cm",
       W("ក្នុងត្រីកោណកែង $ABD$ (ទ្រឹស្ដីបទពីតាករ) ៖",AL(["AD^2&=AB^2+BD^2="+AB*AB+"+"+BD*BD+"="+AD*AD,"AD&="+AD+"\\text{ cm}"]),"$BN$ ជាកម្ពស់នៃត្រីកោណកែង $ABD$ ៖",AL(["BN\\times AD&=AB\\times BD","BN&=\\dfrac{"+AB+"\\times"+BD+"}{"+AD+"}="+fv(AB*BD,AD)+"\\text{ cm}"]))),
     Q("ប្រៀបធៀប $\\triangle ABD$ និង $\\triangle BND$ រួចបញ្ជាក់ថា $BD^2=AD\\times DN$ ។ គណនា $DN$ ។","$BD^2=AD\\times DN$ , $DN="+fv(BD*BD,AD)+"$ cm",
       W("គេមាន $\\angle ABD=\\angle BND=90^\\circ$ និង $\\angle D$ ជាមុំរួម ⇒ $\\triangle ABD\\sim\\triangle BND$ (ករណីទី១ ម.ម) ។",AL(["\\dfrac{BD}{ND}&=\\dfrac{AD}{BD}\\Rightarrow BD^2=AD\\times DN","DN&=\\dfrac{BD^2}{AD}=\\dfrac{"+BD*BD+"}{"+AD+"}="+fv(BD*BD,AD)+"\\text{ cm}"])))]}}},
 geo5:{id:"geo5",t:"រង្វង់ចារឹកក្រៅ · កម្ពស់ AH · AB×AC = AD×AH",lv:3,f:function(){
   return{kfig:GF.geo5(),inst:"គេមានរង្វង់ផ្ចិត $O$ ចារឹកក្រៅត្រីកោណ $ABC$ មួយ ដែលមានកម្ពស់ $AH$ និងមុំទាំងបីជាមុំស្រួច ។ $D$ ជាចំណុចឆ្លុះនៃ $A$ ធៀបនឹងផ្ចិត $O$ ។",it:[
     Q("បង្ហាញថា $\\angle ABC=\\angle ADC$ និង $\\angle ACB=\\angle ADB$ ។","$\\angle ABC=\\angle ADC$ , $\\angle ACB=\\angle ADB$",
       W("$A, B, C, D$ ស្ថិតនៅលើរង្វង់តែមួយ ។","$\\angle ABC$ និង $\\angle ADC$ ជាមុំចារឹកស្កាត់ធ្នូ $AC$ រួម ⇒ $\\angle ABC=\\angle ADC$ ។","$\\angle ACB$ និង $\\angle ADB$ ជាមុំចារឹកស្កាត់ធ្នូ $AB$ រួម ⇒ $\\angle ACB=\\angle ADB$ ។")),
     Q("ប្រៀបធៀប $\\triangle HAB$ និង $\\triangle CAD$ រួចប្រៀបធៀប $\\triangle HAC$ និង $\\triangle BAD$ ។","$\\triangle HAB\\sim\\triangle CAD$ , $\\triangle HAC\\sim\\triangle BAD$",
       W("$AD$ ជាអង្កត់ផ្ចិត ⇒ $\\angle ACD=\\angle ABD=90^\\circ$ (មុំចារឹកកន្លះរង្វង់) ហើយ $\\angle AHB=\\angle AHC=90^\\circ$ (ព្រោះ $AH\\perp BC$) ។",
         "• $\\angle AHB=\\angle ACD$ និង $\\angle ABH=\\angle ADC$ ⇒ $\\triangle HAB\\sim\\triangle CAD$ (ម.ម)","• $\\angle AHC=\\angle ABD$ និង $\\angle ACH=\\angle ADB$ ⇒ $\\triangle HAC\\sim\\triangle BAD$ (ម.ម)")),
     Q("បង្ហាញថា $AB\\times AC=AD\\times AH$ ហើយ $\\angle BAD=\\angle HAC$ ។","$AB\\times AC=AD\\times AH$ , $\\angle BAD=\\angle HAC$",
       W("ពី $\\triangle HAB\\sim\\triangle CAD$ ៖",AL(["\\dfrac{AH}{AC}&=\\dfrac{AB}{AD}\\Rightarrow AB\\times AC=AD\\times AH"]),"ពី $\\triangle HAC\\sim\\triangle BAD$ មុំទី៣ ប៉ុនគ្នា ⇒ $\\angle HAC=\\angle BAD$ ។"))]}}},
 geo6:{id:"geo6",t:"អង្កត់ធ្នូកែងត្រង់កណ្ដាល OB · ធ្នូ CD = 120° · EC·EA = ED·EB",lv:3,f:function(){var R=ri(2,6);
   return{kfig:GF.geo6(),inst:"គេមានរង្វង់ផ្ចិត $O$ អង្កត់ផ្ចិត $AB="+2*R+"$ cm ។ $H$ ជាចំណុចកណ្ដាលនៃកាំ $OB$ ។ បន្ទាត់កែងនឹង $AB$ ត្រង់ $H$ កាត់រង្វង់ត្រង់ $C$ និង $D$ ។ បន្ទាត់ $AC$ និង $BD$ បន្លាយជួបគ្នាត្រង់ $E$ ។",it:[
     Q("ប្រាប់ប្រភេទត្រីកោណ $ACB$ រួចគណនា $BC$ និង $AC$ ។","$\\triangle ACB$ កែងត្រង់ $C$ , $BC="+R+"$ cm , $AC="+R+"\\sqrt3$ cm",
       W("$\\angle ACB=90^\\circ$ (មុំចារឹកកន្លះរង្វង់) ⇒ $\\triangle ACB$ កែងត្រង់ $C$ ។ $HB=\\dfrac{OB}{2}="+n9(R/2)+"$ cm , $AH="+n9(1.5*R)+"$ cm ។","តាមទំនាក់ទំនងមាត្រក្នុងត្រីកោណកែង ($CH$ ជាកម្ពស់) ៖",
         AL(["BC^2&=BH\\times AB="+n9(R/2)+"\\times"+2*R+"="+R*R+"\\Rightarrow BC="+R+"\\text{ cm}","AC^2&=AH\\times AB="+n9(1.5*R)+"\\times"+2*R+"="+3*R*R+"\\Rightarrow AC="+R+"\\sqrt3\\text{ cm}"]))),
     Q("គណនារង្វាស់ធ្នូ $CD$ ជាដឺក្រេ ។","ធ្នូ $CD=120^\\circ$",
       W("ក្នុងត្រីកោណកែង $OHC$ ៖ $OC=R="+R+"$ និង $OH=\\dfrac R2$",AL(["\\cos\\angle COH&=\\dfrac{OH}{OC}=\\dfrac12\\Rightarrow\\angle COH=60^\\circ"]),"$AB$ ជាមេដ្យាទ័រនៃ $CD$ ⇒ ធ្នូ $CB$ = ធ្នូ $BD=60^\\circ$ ⇒ ធ្នូ $CD=120^\\circ$")),
     Q("ប្រៀបធៀបត្រីកោណ $EAB$ និង $ECD$ រួចទាញបង្ហាញថា $EC\\cdot EA=ED\\cdot EB$ ។","$\\triangle EAB\\sim\\triangle ECD$ ⇒ $EC\\cdot EA=ED\\cdot EB$",
       W("$\\angle EAB=\\angle EDC$ (មុំចារឹកស្កាត់ធ្នូ $CB$) និង $\\angle E$ ជាមុំរួម ⇒ $\\triangle EAB\\sim\\triangle ECD$ (ករណីទី១ ម.ម) ។",AL(["\\dfrac{EA}{ED}&=\\dfrac{EB}{EC}\\Rightarrow EC\\cdot EA=ED\\cdot EB"])))]}}},
 geo7:{id:"geo7",t:"បន្លាយ AB ឱ្យ BD = BM · ត្រីកោណដូចគ្នា · BMND ចារឹក",lv:3,f:function(){var t=pick([[10,6,8],[10,8,6],[5,3,4],[5,4,3],[15,9,12],[15,12,9],[20,12,16],[13,5,12]]),AB=t[0],BM=t[1],AM=t[2],AD=AB+BM,k=F(AD,AM);
   return{kfig:GF.geo7(AB,BM,AM),inst:"គេមានរង្វង់ផ្ចិត $O$ អង្កត់ផ្ចិត $AB="+AB+"$ cm និងចំណុច $M$ មួយនៅលើរង្វង់ដែល $BM="+BM+"$ cm ។ គេបន្លាយអង្កត់ $AB$ ខាង $B$ ឱ្យបាន $BD=BM$ រួចគូសបន្ទាត់ $d$ កែងនឹង $BD$ ត្រង់ $D$ ហើយកាត់បន្ទាត់ $AM$ ត្រង់ចំណុច $N$ ។",it:[
     Q("គណនារង្វាស់អង្កត់ $AM$ និង $AD$ ។","$AM="+AM+"$ cm , $AD="+AD+"$ cm",
       W("$\\angle AMB=90^\\circ$ (មុំចារឹកកន្លះរង្វង់) ។ ក្នុងត្រីកោណកែង $MAB$ ៖",AL(["AM^2&=AB^2-BM^2="+AB*AB+"-"+BM*BM+"="+AM*AM,"AM&="+AM+"\\text{ cm}","AD&=AB+BD="+AB+"+"+BM+"="+AD+"\\text{ cm}"]))),
     Q("ប្រៀបធៀប $\\triangle MAB$ និង $\\triangle DAN$ រួចគណនារង្វាស់ $AN$ និង $DN$ ។","$AN="+n9(AD*AB/AM)+"$ cm , $DN="+n9(AD*BM/AM)+"$ cm",
       W("$\\angle AMB=\\angle ADN=90^\\circ$ និង $\\angle A$ ជាមុំរួម ⇒ $\\triangle MAB\\sim\\triangle DAN$ (ករណីទី១ ម.ម) ។",AL(["\\dfrac{AD}{AM}&=\\dfrac{AN}{AB}=\\dfrac{DN}{MB}=\\dfrac{"+AD+"}{"+AM+"}"+(gcd(AD,AM)===1?"":"="+k),"AN&="+k+"\\times"+AB+"="+n9(AD*AB/AM)+"\\text{ cm}","DN&="+k+"\\times"+BM+"="+n9(AD*BM/AM)+"\\text{ cm}"]))),
     Q("បង្ហាញថាចតុកោណ $BMND$ ចារឹកក្នុងរង្វង់ ហើយប្រាប់ទីតាំងផ្ចិត $I$ របស់រង្វង់នោះ ។","$BMND$ ចារឹកក្នុងរង្វង់ផ្ចិត $I$ ជាចំណុចកណ្ដាលនៃ $BN$",
       W("ដោយ $A, M, N$ រត់ត្រង់ជួរ និង $\\angle AMB=90^\\circ$ ⇒ $\\angle BMN=90^\\circ$ ។ ហើយ $\\angle BDN=90^\\circ$ ($d\\perp BD$) ។","⇒ $\\angle BMN+\\angle BDN=180^\\circ$ ⇒ $BMND$ ចារឹកក្នុងរង្វង់ ។ $M$ និង $D$ មើល $BN$ ក្រោមមុំកែង ⇒ $BN$ ជាអង្កត់ផ្ចិត ⇒ ផ្ចិត $I$ ជាចំណុចកណ្ដាលនៃ $BN$ ។"))]}}},
 geo8:{id:"geo8",t:"បន្ទាត់ប៉ះពីរ PA = PB · បរិមាត្រ · ផ្ទៃក្រឡា PAOB",lv:2,f:function(){var t=pick([[4,3,5],[12,5,13],[8,6,10],[15,8,17],[12,9,15]]),PA=t[0],r=t[1],OP=t[2],a=pick([2,3]),x=ri(Math.floor(PA/a)+1,PA-1),b=a*x-PA,c=PA-x;
   return{kfig:GF.geo8(PA,r,OP),inst:"គេមាន $PA$ និង $PB$ ជាបន្ទាត់ប៉ះទៅនឹងរង្វង់ផ្ចិត $O$ កាំ $"+r+"$ cm ត្រង់ $A$ និង $B$ ។ គេដឹងថា $PA="+a+"x-"+b+"$ និង $PB=x+"+c+"$ ។",it:[
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
/* 🔁 ជៀសវាងលំហាត់ដដែលៗ៖ (១) ចងចាំគំរូដែលទើបប្រើ (localStorage) → ជ្រើសគំរូដែលយូរមិនបានប្រើ
   (២) ធរណីមាត្រ៖ ប្ដូរឈ្មោះចំណុច (A, B, M …) ដោយចៃដន្យ ឱ្យរូប · សំណួរ · ចម្លើយ ត្រូវគ្នា */
var LRUK="exgen-lru";
function lruGet(){try{return JSON.parse(localStorage.getItem(LRUK)||"{}")}catch(e){return{}}}
function fresh(list,tag){var M=lruGet(),key=function(c){return tag+"|"+c[0]+"|"+c[1]},mn=Infinity;
  list.forEach(function(c){var v=M[key(c)]||0;if(v<mn)mn=v});var cand=list.filter(function(c){return(M[key(c)]||0)===mn}),c=pick(cand);
  M[key(c)]=Date.now();try{localStorage.setItem(LRUK,JSON.stringify(M))}catch(e){}return c}
var RL=/(^|[^\\A-Za-z])([A-Z]+)(?![a-z])/g;
function relabel(o){var f=o.kfig||"";if(!/noaxes/.test(f))return o;
  var src=[];f.replace(/(^|\n)([A-Z])'?\(/g,function(_,p,c){if(c!=="O"&&src.indexOf(c)<0)src.push(c)});if(!src.length)return o;
  var used={},all=[o.inst].concat(o.it.map(function(x){return x.q+" "+x.ans+" "+x.sol})).join(" ")+f;
  all.split("\\\\").join(" ").replace(RL,function(_,p,w){w.split("").forEach(function(c){used[c]=1})});
  var pool="ABCDEFGHIKLMNPQ".split("").filter(function(c){return src.indexOf(c)>=0||!used[c]});if(pool.length<src.length)return o;
  for(var i=pool.length-1;i>0;i--){var j=ri(0,i),t=pool[i];pool[i]=pool[j];pool[j]=t}
  var M={};src.forEach(function(c,i){M[c]=pool[i]});
  var tr=function(s){return String(s==null?"":s).split("\\\\").join("\u0001").replace(RL,function(_,p,w){return p+w.split("").map(function(c){return M[c]||c}).join("")}).split("\u0001").join("\\\\")};
  o.inst=tr(o.inst);o.kfig=tr(f);o.it.forEach(function(x){x.q=tr(x.q);x.ans=tr(x.ans);x.sol=tr(x.sol)});return o}
window.EXGEN={
  has:function(k){return!!REG[k]},
  dip:function(){return DIP.map(function(x,i){var c=fresh(x[0],"dip"+i);return{ls:c[0],lv:"t:"+c[1],pts:x[1]}})},
  bac:function(k){if(k==="b")return BAC.map(function(x){var f=x[1]?null:pick([[42,"fexp"],[43,"fln"]]);return{ls:f?f[0]:x[0],lv:"t:"+(f?f[1]:x[1]),pts:x[2]}});
    return BAC7.map(function(x,i){var c=fresh(x[0],"bac"+i);return{ls:c[0],lv:"t:"+c[1],pts:x[1]}})},
  list:function(k){return(REG[k]||[]).map(function(x){return{id:x.id,t:x.t,lv:x.lv}})},
  make:function(k,id){var L=REG[k]||[],t=L.filter(function(x){return x.id===id})[0]||L[0];if(!t)return null;var o=relabel(t.f());o.it=o.it.map(function(x,i){return{q:x.q,fig:"",ans:x.ans,sol:x.sol,kfig:!i&&o.kfig||""}});return o}
};
})();
