/* ========================================================================
   📖 មេរៀនសង្ខេប (គ្រប់កម្រិត ថ្នាក់ទី៧–១២) · បង្ហាញជាស្លាយមានចលនា
   - ទិន្នន័យភ្ជាប់មកស្រាប់ក្នុងឯកសារនេះ (LSUM[ថ្នាក់] = [{ch, t:ជំពូក, ls:[មេរៀន]}])
   - មេរៀន = {t, m:វិធីសាស្ត្រ, s:[ស្លាយ]} · ស្លាយ = {h, b:[ប្លុក]}
   - ប្លុក = {k:def|ex|sol|tip|warn|sum|plot, h, b} · b ជាអត្ថបទ (មួយបន្ទាត់មួយចំណុច ; «- » = ចំណុច) មាន LaTeX $…$
   - plot: b = {p:[[x,y,ស្លាក,ពណ៌]], v:true(គូសវ៉ិចទ័រពី O), l:[[x1,y1,x2,y2,ពណ៌,ដាច់ៗ]], c:កាំរង្វង់}
   ======================================================================== */
(function(){
"use strict";
var R=String.raw;
function B(k,h,b){return{k:k,h:h,b:b}}
function S(h){return{h:h,b:[].slice.call(arguments,1)}}
function L(t,m,s){return{t:t,m:m,s:s}}
var BL="#1f5fae",OR="#d9731a",GR="#0f6b55",RD="#b83a2e";

/* ---------------- ថ្នាក់ទី១២ · ជំពូកទី១ ចំនួនកុំផ្លិច ---------------- */
var C12=[
L("ចំនួនកុំផ្លិចទម្រង់ពីជគណិត","អនុមានរួម · Think-Pair-Share",[
 S("ហេតុអ្វីត្រូវការចំនួនថ្មី?",
  B("ex","សង្កេត",R`$x^2+2x+2=0$ មាន $\Delta'=1-2=-1<0$ ⇒ គ្មានឫសក្នុង $\R$
ក្នុង $\R$ ការេនៃគ្រប់ចំនួនតែងតែ $\ge 0$
ដូច្នេះ គ្មានចំនួនពិត $x$ ណាដែល $x^2=-1$ ទេ`),
  B("def","ឯកតានិមិត្ត",R`បង្កើតចំនួនថ្មី $i$ ដែល $$i^2=-1$$
ឧ. $x^2+1=0 \Rightarrow x=\pm i$`)),
 S("និយមន័យ",
  B("def","ចំនួនកុំផ្លិច",R`$$z=a+bi\quad(a,b\in\R)$$
- $a=\operatorname{Re}(z)$ ផ្នែកពិត
- $b=\operatorname{Im}(z)$ ផ្នែកនិមិត្ត
- $\R\subset\C$`),
  B("tip","ករណីពិសេស",R`- $b=0$ ⇒ $z=a$ ជាចំនួនពិត
- $a=0$ ⇒ $z=bi$ ជាចំនួននិមិត្តសុទ្ធ`)),
 S("ចម្លាស់ និងចំនួនផ្ទុយ",
  B("def","និយមន័យ",R`ចម្លាស់ ៖ $\bar z=a-bi$ (ប្ដូរសញ្ញាផ្នែកនិមិត្ត)
ផ្ទុយ ៖ $-z=-a-bi$ (ប្ដូរសញ្ញាទាំងពីរ)`),
  B("ex","ឧទាហរណ៍",R`$z=1-3i$ ⇒ $\bar z=1+3i$ , $-z=-1+3i$
$z=24$ ⇒ $\bar z=24$ , $-z=-24$`),
  B("plot",R`$\bar z$ ឆ្លុះតាមអ័ក្សពិត · $-z$ ឆ្លុះតាម $O$`,{p:[[3,2,"z",BL],[3,-2,"\\bar z",RD],[-3,-2,"-z",OR]],v:true})),
 S("ស្វ័យគុណនៃ $i$ (ខួប ៤)",
  B("sum","វដ្ត",R`$i^1=i,\; i^2=-1,\; i^3=-i,\; i^4=1$
$i^n=i^{r}$ ដែល $r$ ជាសំណល់នៃ $n\div4$`),
  B("ex","ឧទាហរណ៍",R`$2026=4\cdot506+2 \Rightarrow i^{2026}=i^2=-1$
$\sqrt{-16}=4i$ , $\sqrt{-2}\cdot\sqrt{-8}=\sqrt2 i\cdot2\sqrt2 i=-4$`),
  B("warn","ប្រយ័ត្ន",R`$\sqrt a\cdot\sqrt b=\sqrt{ab}$ ពិតតែ $a,b\ge0$ ។ ត្រូវប្ដូរជា $bi$ មុនគុណ ៖ $\sqrt{-4}\sqrt{-9}=(2i)(3i)=-6$`))
]),
L("ប្រមាណវិធីបូក ដក គុណ","Practice-Based Learning",[
 S("បូក និងដក",
  B("def","រូបមន្ត",R`$(a+bi)+(c+di)=(a+c)+(b+d)i$
$(a+bi)-(c+di)=(a-c)+(b-d)i$
បូក/ដក ពិតជាមួយពិត · និមិត្តជាមួយនិមិត្ត`),
  B("ex","ឧទាហរណ៍",R`$(5+3i)+(-1+2i)=4+5i$
$(9-2i)-(4-4i)=5+2i$`)),
 S("គុណ",
  B("def","រូបមន្ត",R`$(a+bi)(c+di)=(ac-bd)+(ad+bc)i$`),
  B("tip","ជំហាន",R`- ពន្លាតដូចពហុធា
- ជំនួស $i^2=-1$
- ដាក់ជាទម្រង់ $A+Bi$`),
  B("ex","ឧទាហរណ៍",R`$(2+3i)(4+2i)=8+4i+12i+6i^2=2+16i$`)),
 S("អនុវត្ត",
  B("ex",R`$z_1=2+5i,\ z_2=1-7i$`,R`$z_1+z_2=3-2i$
$z_1-z_2=1+12i$
$z_1z_2=2-14i+5i-35i^2=37-9i$`),
  B("warn","កំហុសញឹកញាប់",R`ភ្លេចប្ដូរសញ្ញាពេលដក ឬមិនជំនួស $i^2$ ទៅ $-1$`))
]),
L("វិធីចែក និងលក្ខណៈចម្លាស់","Explicit Instruction · I Do–We Do–You Do",[
 S("គន្លឹះ ៖ គុណនឹងចម្លាស់",
  B("def","ផលគុណចម្លាស់",R`$$z\bar z=(a+bi)(a-bi)=a^2+b^2$$ ជាចំនួនពិតវិជ្ជមានជានិច្ច`),
  B("ex","ឧទាហរណ៍",R`$\dfrac{3}{2+i}=\dfrac{3(2-i)}{(2+i)(2-i)}=\dfrac{6-3i}{5}=\dfrac65-\dfrac35 i$`)),
 S("រូបមន្តចែក",
  B("def",R`ចំពោះ $c+di\ne0$`,R`$$\frac{a+bi}{c+di}=\frac{ac+bd}{c^2+d^2}+\frac{bc-ad}{c^2+d^2}\,i$$`),
  B("tip","ជំហាន",R`- គុណភាគយក និងភាគបែងនឹងចម្លាស់នៃភាគបែង
- ភាគបែងក្លាយជា $c^2+d^2$
- ពន្លាតភាគយក ដាក់ជា $A+Bi$`)),
 S("លក្ខណៈនៃចម្លាស់",
  B("sum","ចម្លាស់នៃផល = ផលនៃចម្លាស់",R`- $\overline{z_1\pm z_2}=\bar z_1\pm\bar z_2$
- $\overline{z_1z_2}=\bar z_1\,\bar z_2$
- $\overline{\left(z_1/z_2\right)}=\bar z_1/\bar z_2$
- $\bar{\bar z}=z$ · $z=\bar z \iff z\in\R$`),
  B("ex","ផ្ទៀងផ្ទាត់",R`$z_1=2+2i,\ z_2=2i$ ⇒ $z_1z_2=-4+4i$ , $\bar z_1\bar z_2=(2-2i)(-2i)=-4-4i=\overline{z_1z_2}$ ✓`))
]),
L("ចំនួនកុំផ្លិចក្នុងប្លង់កុំផ្លិច","Visual Learning · GeoGebra",[
 S("រូបភាព និងវ៉ិចទ័ររូបភាព",
  B("def","និយមន័យ",R`$z=a+bi$ ត្រូវតាងដោយចំណុច $M(a,b)$ ឬវ៉ិចទ័រ $\overrightarrow{OM}=(a,b)$
- $(Ox)$ អ័ក្សពិត · $(Oy)$ អ័ក្សនិមិត្ត
- $M$ ជារូបភាពនៃ $z$ · $z$ ជាអាហ្វិកនៃ $M$`),
  B("plot",R`$z_1=2+4i,\ z_2=3-i,\ z_3=3i,\ z_4=2$`,{p:[[2,4,"z_1",BL],[3,-1,"z_2",RD],[0,3,"z_3",GR],[2,0,"z_4",OR]],v:true})),
 S("ស៊ីមេទ្រី និងចំណុចកណ្ដាល",
  B("sum","ចងចាំ",R`- $z$ និង $\bar z$ ឆ្លុះគ្នាធៀបនឹងអ័ក្សពិត
- $z$ និង $-z$ ឆ្លុះគ្នាធៀបនឹងគល់ $O$
- ចំណុចកណ្ដាល $P$ នៃ $[AB]$ ៖ $z_P=\dfrac{z_A+z_B}{2}$`),
  B("ex","ឧទាហរណ៍",R`$z_A=2+6i,\ z_B=4-2i \Rightarrow z_P=3+2i$`))
]),
L("វ៉ិចទ័ររូបភាពនៃផលបូក និងផលដក","Discovery Learning",[
 S("ផលបូក ៖ ក្បួនប្រលេឡូក្រាម",
  B("def","ជាទូទៅ",R`$\overrightarrow{OM_1}(z_1)+\overrightarrow{OM_2}(z_2)=\overrightarrow{OM}(z_1+z_2)$
$OM_1MM_2$ ជាប្រលេឡូក្រាម`),
  B("plot","$(2+i)+(1+2i)=3+3i$",{p:[[2,1,"z_1",BL],[1,2,"z_2",OR],[3,3,"z_1+z_2",GR]],v:true,l:[[2,1,3,3,"#888",1],[1,2,3,3,"#888",1]]})),
 S("ផលដក ៖ ក្បួនចុងត្រឡប់ដើម",
  B("def","ជាទូទៅ",R`$z_1-z_2=z_1+(-z_2)$
$\overrightarrow{M_2M_1}$ មានអាហ្វិក $z_1-z_2$`),
  B("sum","ចម្ងាយ",R`$$AB=|z_B-z_A|$$`),
  B("ex","ឧទាហរណ៍",R`$z_A=2+i,\ z_B=5+5i$ ⇒ $z_B-z_A=3+4i$ , $AB=\sqrt{9+16}=5$`))
]),
L("ម៉ូឌុលនៃចំនួនកុំផ្លិច","Problem-Solving · ពិភាក្សាក្រុម",[
 S("និយមន័យ",
  B("def","ម៉ូឌុល = ប្រវែង $OM$",R`$$r=|z|=\sqrt{a^2+b^2}$$ (តាមទ្រឹស្ដីបទពីតាគ័រ)`),
  B("plot","",{p:[[4,3,"M(a,b)",RD]],v:true,l:[[4,0,4,3,OR,0]]}),
  B("ex","ឧទាហរណ៍",R`$|-1-2i|=\sqrt5$ , $|-4i|=4$ , $|6+8i|=10$`)),
 S("លក្ខណៈម៉ូឌុល",
  B("sum","ចងចាំ",R`- $|z|=|\bar z|=|-z|$
- $|z|^2=z\bar z$
- $|z_1z_2|=|z_1|\,|z_2|$
- $\left|\dfrac{z_1}{z_2}\right|=\dfrac{|z_1|}{|z_2|}$
- $|z_1+z_2|\le|z_1|+|z_2|$`),
  B("ex","អនុវត្តលក្ខណៈ",R`$|(1+i)(2-2i)|=\sqrt2\cdot2\sqrt2=4$
$\left|\dfrac{1+i\sqrt3}{1-i}\right|=\dfrac{2}{\sqrt2}=\sqrt2$`))
]),
L("អាគុយម៉ង់នៃចំនួនកុំផ្លិច","5Es · ពិភាក្សាក្រុម",[
 S("និយមន័យ",
  B("def","អាគុយម៉ង់",R`មុំ $\varphi=(\overrightarrow{Ox},\overrightarrow{OM})$ ៖ $$\arg z=\varphi+2k\pi,\ k\in\Z$$
$\cos\varphi=\dfrac ar,\quad \sin\varphi=\dfrac br$`),
  B("warn","ចំណាំ",R`$z=0$ គ្មានអាគុយម៉ង់ · ពិនិត្យសញ្ញា $a,b$ ដើម្បីដឹងចតុកោណ`)),
 S("តារាងមុំពិសេស",
  B("sum","",R`$\varphi$ : $0,\ \frac\pi6,\ \frac\pi4,\ \frac\pi3,\ \frac\pi2,\ \pi$
$\cos$ : $1,\ \frac{\sqrt3}2,\ \frac{\sqrt2}2,\ \frac12,\ 0,\ -1$
$\sin$ : $0,\ \frac12,\ \frac{\sqrt2}2,\ \frac{\sqrt3}2,\ 1,\ 0$`),
  B("ex","ឧទាហរណ៍",R`$1+i\sqrt3$ ៖ $r=2$ , $\arg=\frac\pi3$
$-1+i\sqrt3$ ៖ $r=2$ , $\arg=\frac{2\pi}3$
$-1+i$ ៖ $r=\sqrt2$ , $\arg=\frac{3\pi}4$`)),
 S("ករណីលើអ័ក្ស",
  B("ex","",R`$\arg 5=0$ , $\arg(-3)=\pi$
$\arg(2i)=\frac\pi2$ , $\arg(-4i)=-\frac\pi2$`),
  B("tip","លក្ខណៈ",R`$\arg\dfrac zw=\arg z-\arg w$ ⇒ $\arg\dfrac{1+i\sqrt3}{1+i}=\frac\pi3-\frac\pi4=\frac\pi{12}$`))
]),
L("ទម្រង់ត្រីកោណមាត្រ","Blended · អនុមានរួម",[
 S("ពីពីជគណិត ទៅត្រីកោណមាត្រ",
  B("def","ទម្រង់ត្រីកោណមាត្រ",R`$a=r\cos\theta,\ b=r\sin\theta$ ⇒ $$z=r(\cos\theta+i\sin\theta)$$`),
  B("tip","ជំហាន",R`- គណនា $r=\sqrt{a^2+b^2}$
- រក $\theta$ ពី $\cos\theta=\frac ar,\ \sin\theta=\frac br$
- សរសេរ $z=r(\cos\theta+i\sin\theta)$`)),
 S("ឧទាហរណ៍",
  B("ex","$z=-4+4i$",R`$r=4\sqrt2$ , $\cos\theta=-\frac{\sqrt2}2,\ \sin\theta=\frac{\sqrt2}2\Rightarrow\theta=\frac{3\pi}4$
$z=4\sqrt2\left(\cos\frac{3\pi}4+i\sin\frac{3\pi}4\right)$`),
  B("ex","ច្រាសមកវិញ",R`$4\left(\cos\frac\pi6+i\sin\frac\pi6\right)=2\sqrt3+2i$
$-2=2(\cos\pi+i\sin\pi)$ , $-i=\cos(-\frac\pi2)+i\sin(-\frac\pi2)$`),
  B("warn","ប្រយ័ត្ន",R`ទម្រង់ត្រូវមាន $r>0$ និង «$\cos+i\sin$» នៃមុំតែមួយ ៖ $2\cos\frac{7\pi}4-2i\sin\frac\pi4=2[\cos(-\frac\pi4)+i\sin(-\frac\pi4)]$`))
]),
L("ផលគុណតាមទម្រង់ត្រីកោណមាត្រ","Blended",[
 S("រូបមន្ត",
  B("def","គុណម៉ូឌុល · បូកអាគុយម៉ង់",R`$$z_1z_2=r_1r_2[\cos(\theta_1+\theta_2)+i\sin(\theta_1+\theta_2)]$$`),
  B("tip","មកពី",R`$\cos\theta_1\cos\theta_2-\sin\theta_1\sin\theta_2=\cos(\theta_1+\theta_2)$
$\sin\theta_1\cos\theta_2+\cos\theta_1\sin\theta_2=\sin(\theta_1+\theta_2)$`)),
 S("ឧទាហរណ៍",
  B("ex","",R`$\sqrt2\left(\cos\frac{3\pi}4+i\sin\frac{3\pi}4\right)\cdot2\left(\cos\frac{4\pi}3+i\sin\frac{4\pi}3\right)=2\sqrt2\left(\cos\frac{25\pi}{12}+i\sin\frac{25\pi}{12}\right)$
$\qquad=2\sqrt2\left(\cos\frac{\pi}{12}+i\sin\frac{\pi}{12}\right)$
$(1+i)(-1+i\sqrt3)=2\sqrt2\left(\cos\frac{11\pi}{12}+i\sin\frac{11\pi}{12}\right)$`),
  B("sum","អត្ថប្រយោជន៍",R`$(1+i)(1+i\sqrt3)=(1-\sqrt3)+(1+\sqrt3)i=2\sqrt2\left(\cos\frac{7\pi}{12}+i\sin\frac{7\pi}{12}\right)$
⇒ $\cos\frac{7\pi}{12}=\frac{\sqrt2-\sqrt6}4,\ \sin\frac{7\pi}{12}=\frac{\sqrt2+\sqrt6}4$`))
]),
L("ផលចែកតាមទម្រង់ត្រីកោណមាត្រ","Blended",[
 S("រូបមន្ត",
  B("def","ចែកម៉ូឌុល · ដកអាគុយម៉ង់",R`$$\frac{z_1}{z_2}=\frac{r_1}{r_2}[\cos(\theta_1-\theta_2)+i\sin(\theta_1-\theta_2)]$$`),
  B("plot",R`$\dfrac{z_1}{z_2}$ ៖ ម៉ូឌុល $\dfrac{2}{\sqrt2}=\sqrt2$ · មុំ $120^\circ-45^\circ=75^\circ$`,{p:[[-1,1.73,"z_1",BL],[1,1,"z_2",OR],[0.37,1.37,"z_1/z_2",RD]],v:true})),
 S("ឧទាហរណ៍",
  B("ex","",R`$\dfrac{6\left(\cos\frac{5\pi}{12}+i\sin\frac{5\pi}{12}\right)}{2\left(\cos\frac{\pi}{12}+i\sin\frac{\pi}{12}\right)}=3\left(\cos\frac\pi3+i\sin\frac\pi3\right)$
$\dfrac{-1+i\sqrt3}{1+i}=\dfrac{2\left(\cos\frac{2\pi}3+i\sin\frac{2\pi}3\right)}{\sqrt2\left(\cos\frac\pi4+i\sin\frac\pi4\right)}$
$\qquad=\sqrt2\left(\cos\frac{5\pi}{12}+i\sin\frac{5\pi}{12}\right)$
$\dfrac{2\left(\cos\frac\pi2+i\sin\frac\pi2\right)}{\left(\cos\frac\pi6+i\sin\frac\pi6\right)}=2\left(\cos\frac\pi3+i\sin\frac\pi3\right)$
$\qquad=1+\sqrt3 i$`))
]),
L("បំប្លែងវិលជុំវិញគល់តម្រុយ","Blended · ពិភាក្សាក្រុម",[
 S("និយមន័យ",
  B("def",R`វិលផ្ចិត $O$ មុំ $\alpha$`,R`$$z'=(\cos\alpha+i\sin\alpha)\,z$$
- $|z'|=|z|$ (ម៉ូឌុលមិនប្រែ)
- $\arg z'=\arg z+\alpha$`),
  B("plot","",{p:[[3,1.5,"M",BL],[1.4,3.05,"M'",RD]],v:true,c:3.35})),
 S("ទិសដៅ និងករណីពិសេស",
  B("sum","",R`- $\alpha>0$ ផ្ទុយទ្រនិចនាឡិកា · $\alpha<0$ តាមទ្រនិចនាឡិកា
- $\alpha=\frac\pi2$ ⇒ $z'=iz$ · $\alpha=\pi$ ⇒ $z'=-z$ · $\alpha=-\frac\pi2$ ⇒ $z'=-iz$
- រកមុំ ៖ $\dfrac{z'}{z}=\cos\alpha+i\sin\alpha$
- បញ្ច្រាស ៖ $z=[\cos(-\alpha)+i\sin(-\alpha)]\,z'$`)),
 S("ឧទាហរណ៍",
  B("ex",R`$z=1+i$ វិល $\frac\pi3$`,R`$z'=\sqrt2\left(\cos\left(\frac\pi4+\frac\pi3\right)+i\sin\left(\frac\pi4+\frac\pi3\right)\right)$
$\qquad=\sqrt2\left(\cos\frac{7\pi}{12}+i\sin\frac{7\pi}{12}\right)$
$\qquad=\frac{1-\sqrt3}2+\frac{1+\sqrt3}2 i$`),
  B("ex","រកមុំ",R`$z=1+i\to z'=-1+i$ ៖ $\dfrac{z'}z=i$ ⇒ $\alpha=\frac\pi2$`))
]),
L("ស្វ័យគុណទី $n$ និងរូបមន្តដឺម័រ","Think-Pair-Share · GeoGebra",[
 S("រូបមន្តដឺម័រ",
  B("def","De Moivre",R`$$(\cos\theta+i\sin\theta)^n=\cos n\theta+i\sin n\theta$$
$$z^n=r^n(\cos n\theta+i\sin n\theta)$$
ម៉ូឌុលលើកស្វ័យគុណ $n$ · អាគុយម៉ង់គុណនឹង $n$`),
  B("tip","",R`ពិតដែរចំពោះ $n\in\Z$ ៖ $(\cos\theta+i\sin\theta)^{-n}=\cos n\theta-i\sin n\theta$`)),
 S("ឧទាហរណ៍",
  B("ex","",R`$(1+i)^6=(\sqrt2)^6\left(\cos\frac{6\pi}4+i\sin\frac{6\pi}4\right)$
$\qquad=8\left(\cos\frac{3\pi}2+i\sin\frac{3\pi}2\right)$
$\qquad=-8i$
$(\sqrt3+i)^{10}=2^{10}\left(\cos\frac{5\pi}3+i\sin\frac{5\pi}3\right)=512-512\sqrt3 i$
$(1+i)^{10}=32i$ , $(\sqrt3+i)^6=-64$`),
  B("plot",R`គុណនឹង $z=\cos\frac\pi6+i\sin\frac\pi6$ ម្ដង = វិល $30^\circ$`,{p:[[2.6,1.5,"z",BL],[1.5,2.6,"z^2",BL],[0,3,"z^3",BL],[-1.5,2.6,"z^4",BL],[-2.6,1.5,"z^5",BL],[-3,0,"z^6",RD]],v:true,c:3}))
]),
L("ឫសទី $n$ នៃចំនួនកុំផ្លិច","Student-Centered · GeoGebra",[
 S("រូបមន្ត",
  B("def",R`ឫសទី $n$ នៃ $z=r(\cos\theta+i\sin\theta)$`,R`$$w_k=\sqrt[n]r\left[\cos\frac{\theta+2k\pi}n+i\sin\frac{\theta+2k\pi}n\right]$$
$k=0,1,\dots,n-1$ (មាន $n$ ឫសខុសគ្នា)`),
  B("sum","ធរណីមាត្រ",R`ឫសទាំង $n$ នៅលើរង្វង់ផ្ចិត $O$ កាំ $\sqrt[n]r$ ឃ្លាតគ្នា $\frac{2\pi}n$ → ពហុកោណនិយ័ត $n$ ជ្រុង`)),
 S("ឧទាហរណ៍",
  B("ex","ឫសទី៣ នៃ $8$",R`$w_0=2,\ w_1=-1+i\sqrt3,\ w_2=-1-i\sqrt3$`),
  B("plot","ត្រីកោណសម័ង្ស",{p:[[2,0,"w_0",RD],[-1,1.73,"w_1",RD],[-1,-1.73,"w_2",RD]],l:[[2,0,-1,1.73,OR,0],[-1,1.73,-1,-1.73,OR,0],[-1,-1.73,2,0,OR,0]],c:2}),
  B("ex","ផ្សេងទៀត",R`$\sqrt i$ ៖ $\pm\frac{\sqrt2}2(1+i)$
$z^3=1$ ៖ $1,\ -\frac12\pm\frac{\sqrt3}2 i$
$\sqrt[4]{-16}$ ៖ $\pm\sqrt2\pm\sqrt2 i$`))
])
];

var LSUM={7:[],8:[],9:[],10:[],11:[],12:[{ch:1,t:"ចំនួនកុំផ្លិច",ls:C12}]};
window.LSUM=LSUM;

/* ---------------- KaTeX ---------------- */
var KX="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/",kxP=null;
var KXM={"\\R":"\\mathbb{R}","\\C":"\\mathbb{C}","\\N":"\\mathbb{N}","\\Z":"\\mathbb{Z}","\\Q":"\\mathbb{Q}"};
function loadJs(src){return new Promise(function(ok,no){var s=document.createElement("script");s.src=src;s.onload=ok;s.onerror=no;document.head.appendChild(s)})}
function kx(){
  if(window.renderMathInElement)return Promise.resolve();
  if(kxP)return kxP;
  if(!document.querySelector("link[href*='katex.min.css']")){var l=document.createElement("link");l.rel="stylesheet";l.href=KX+"katex.min.css";document.head.appendChild(l)}
  kxP=(window.katex?Promise.resolve():loadJs(KX+"katex.min.js")).then(function(){return loadJs(KX+"contrib/auto-render.min.js")});
  return kxP;
}
function math(el){kx().then(function(){try{renderMathInElement(el,{delimiters:[{left:"$$",right:"$$",display:true},{left:"$",right:"$",display:false}],throwOnError:false,macros:KXM})}catch(x){}}).catch(function(){})}

/* ---------------- គូរប្លង់កុំផ្លិច (SVG) ---------------- */
function plot(d){
  var pts=d.p||[],ls=d.l||[],m=1;
  pts.forEach(function(p){m=Math.max(m,Math.abs(p[0]),Math.abs(p[1]))});if(d.c)m=Math.max(m,d.c);
  m=Math.ceil(m+.6);var W=220,s=(W/2-16)/m,c=W/2,X=function(x){return c+x*s},Y=function(y){return c-y*s};
  var g="<svg viewBox='0 0 "+W+" "+W+"' class=ls-svg role=img aria-label='ប្លង់កុំផ្លិច'><defs><marker id=lsAr markerUnits=userSpaceOnUse markerWidth=8 markerHeight=8 refX=7 refY=4 orient=auto><path d='M0,0 L8,4 L0,8z' fill='context-stroke'/></marker></defs>";
  for(var k=-m;k<=m;k++)if(k)g+="<line x1="+X(k)+" y1=8 x2="+X(k)+" y2="+(W-8)+" class=ls-grid /><line x1=8 y1="+Y(k)+" x2="+(W-8)+" y2="+Y(k)+" class=ls-grid />";
  g+="<line x1=6 y1="+c+" x2="+(W-6)+" y2="+c+" class=ls-ax marker-end='url(#lsAr)'/><line x1="+c+" y1="+(W-6)+" x2="+c+" y2=6 class=ls-ax marker-end='url(#lsAr)'/>";
  g+="<text x="+(W-10)+" y="+(c-6)+" class=ls-lb text-anchor=end>Re</text><text x="+(c+6)+" y=14 class=ls-lb>Im</text>";
  if(d.c)g+="<circle cx="+c+" cy="+c+" r="+(d.c*s)+" class=ls-cir />";
  ls.forEach(function(l,i){g+="<line x1="+X(l[0])+" y1="+Y(l[1])+" x2="+X(l[2])+" y2="+Y(l[3])+" stroke='"+l[4]+"' stroke-width=2 "+(l[5]?"stroke-dasharray='4 3'":"")+" class=ls-draw style='--i:"+i+"'/>"});
  pts.forEach(function(p,i){
    if(d.v)g+="<line x1="+c+" y1="+c+" x2="+X(p[0])+" y2="+Y(p[1])+" stroke='"+p[3]+"' stroke-width=2.4 marker-end='url(#lsAr)' class=ls-draw style='--i:"+i+"'/>";
    g+="<circle cx="+X(p[0])+" cy="+Y(p[1])+" r=4 fill='"+p[3]+"' class=ls-pt style='--i:"+i+"'/>";
  });
  g+="</svg>";
  /* ស្លាកជា KaTeX (HTML ពីលើ SVG) */
  var lab=pts.map(function(p,i){var lx=(X(p[0])+(p[0]<0?-6:6))/W*100,ly=(Y(p[1])+(p[1]<0?14:-8))/W*100;
    return"<span class=ls-pl style='left:"+lx+"%;top:"+ly+"%;color:"+p[3]+";--i:"+i+";transform:translate("+(p[0]<0?"-100%":"0")+",-50%)'>$"+p[2]+"$</span>"}).join("");
  return"<div class=ls-plot>"+g+lab+"</div>";
}

/* ---------------- បង្ហាញ ---------------- */
var gSel=12,cur=null,idx=0,timer=null;
/* ប្រភាគ និងរូបមន្តក្នុងបន្ទាត់ ឲ្យធំស្មើរូបមន្តឯករាជ្យ */
function ds(t){return String(t||"").replace(/\$\$[\s\S]*?\$\$|\$([^$]+)\$/g,function(m,a){return a==null?m:"$\\displaystyle "+a+"$"})}
function body(t){
  var out="",ul=false;
  ds(t).split("\n").forEach(function(l){
    if(/^- /.test(l)){if(!ul){out+="<ul>";ul=true}out+="<li>"+esc(l.slice(2))+"</li>"}
    else{if(ul){out+="</ul>";ul=false}out+=l.trim()?"<p>"+esc(l)+"</p>":""}
  });
  return out+(ul?"</ul>":"");
}
var KI={def:["📘","និយមន័យ"],ex:["✏️","ឧទាហរណ៍"],sol:["✅","ចម្លើយ"],tip:["💡","គន្លឹះ"],warn:["⚠️","ប្រយ័ត្ន"],sum:["📌","សង្ខេប"],plot:["📈",""]};
function blk(b,i){
  var ki=KI[b.k]||KI.def,h=b.h!=null?b.h:ki[1];
  if(b.k==="plot")return"<div class='ls-blk ls-plotb' style='--d:"+i+"'>"+plot(b.b)+(h?"<div class=ls-cap>"+esc(ds(h))+"</div>":"")+"</div>";
  return"<div class='ls-blk ls-"+b.k+"' style='--d:"+i+"'><div class=ls-bh><span aria-hidden=true>"+ki[0]+"</span> "+esc(ds(h||ki[1]))+"</div><div class=ls-bb>"+body(b.b)+"</div></div>";
}
function slides(ls,ch){
  var t=[{title:1}].concat(ls.s,[{end:1}]);return t;
}
function slideHtml(ls,ch,s,n,tot){
  if(s.title)return"<div class='ls-sl ls-title'><div class=ls-chip>ជំពូកទី"+kn(ch.ch)+" · "+esc(ch.t)+"</div><h2 class=ls-blk style='--d:0'>"+esc(ls.t)+"</h2>"+
    "<div class='ls-blk ls-meta' style='--d:1'>🎯 វិធីសាស្ត្រ ៖ "+esc(ls.m)+"</div><div class='ls-blk ls-meta' style='--d:2'>📑 "+kn(ls.s.length)+" ចំណុចសំខាន់ · ចុច ➜ ដើម្បីបន្ត</div></div>";
  if(s.end)return"<div class='ls-sl ls-title ls-end'><h2 class=ls-blk style='--d:0'>✅ ចប់មេរៀន</h2><div class='ls-blk ls-meta' style='--d:1'>"+esc(ls.t)+"</div>"+
    "<div class='ls-blk ls-recap' style='--d:2'>"+ls.s.map(function(x,i){return"<button type=button data-go-sl="+(i+1)+">"+kn(i+1)+". "+esc(x.h)+"</button>"}).join("")+"</div></div>";
  var cols=s.b.length>1&&s.b.some(function(b){return b.k==="plot"})?" ls-2c":"";
  return"<div class='ls-sl"+cols+"'><h3 class=ls-sh>"+esc(s.h)+"</h3><div class=ls-grid2>"+s.b.map(blk).join("")+"</div></div>";
}
function render(){
  var host=$("lsBody");if(!host)return;
  $("lsG").innerHTML=[7,8,9,10,11,12].map(function(g){var n=LSUM[g].reduce(function(a,c){return a+c.ls.length},0);
    return"<button type=button data-g="+g+" aria-selected="+(g===gSel)+">ថ្នាក់ទី"+kn(g)+(n?" <small>("+kn(n)+")</small>":"")+"</button>"}).join("");
  var chs=LSUM[gSel];
  if(!chs.length){host.innerHTML="<div class=ls-empty>📭 ថ្នាក់ទី"+kn(gSel)+" មិនទាន់មានមេរៀនសង្ខេបនៅឡើយ ។<br><small>ផ្ញើស្លាយ ឬឯកសារមេរៀនមក ដើម្បីបន្ថែម ។</small></div>";return}
  host.innerHTML=chs.map(function(ch,ci){
    return"<section class=ls-ch><h3>📚 ជំពូកទី"+kn(ch.ch)+" · "+esc(ch.t)+" <small>("+kn(ch.ls.length)+" មេរៀន)</small></h3><div class=ls-cards>"+
      ch.ls.map(function(l,li){return"<button type=button class=ls-card data-ls='"+ci+"|"+li+"' style='--h:"+(150+li*17)%360+"'><b>"+kn(li+1)+"</b><span>"+esc(l.t)+"</span><em>"+kn(l.s.length+2)+" ស្លាយ · "+esc(l.m.split("·")[0])+"</em></button>"}).join("")+"</div></section>"}).join("");
  math(host);
}
function open(ci,li){
  var ch=LSUM[gSel][ci];cur={ch:ch,ls:ch.ls[li],li:li,ci:ci,list:slides(ch.ls[li])};idx=0;
  $("lsView").hidden=false;document.body.classList.add("ls-open");show1(0);
  try{$("lsView").focus()}catch(x){}
}
function close(){stopAuto();$("lsView").hidden=true;document.body.classList.remove("ls-open");if(document.fullscreenElement)document.exitFullscreen().catch(function(){})}
function show1(dir){
  var n=cur.list.length,st=$("lsStage");
  st.innerHTML=slideHtml(cur.ls,cur.ch,cur.list[idx],idx,n);
  var sl=st.firstChild;sl.classList.add(dir<0?"ls-inL":"ls-inR");
  math(st);
  $("lsCnt").textContent=kn(idx+1)+" / "+kn(n);
  $("lsTt").textContent="ជំពូកទី"+kn(cur.ch.ch)+" · មេរៀនទី"+kn(cur.li+1)+" ៖ "+cur.ls.t.replace(/\$/g,"");
  $("lsBar").style.width=((idx+1)/n*100)+"%";
  $("lsDots").innerHTML=cur.list.map(function(_,i){return"<button type=button data-dot="+i+(i===idx?" class=on":"")+" aria-label='ស្លាយ "+(i+1)+"'></button>"}).join("");
  $("lsPrev").disabled=idx===0;$("lsNext").disabled=idx===n-1;
}
function go(d){if(!cur)return;var j=idx+d;if(j<0||j>=cur.list.length){if(d>0)stopAuto();return}idx=j;show1(d)}
function goTo(j){if(!cur||j===idx)return;var d=j>idx?1:-1;idx=j;show1(d)}
function stopAuto(){clearInterval(timer);timer=null;var b=$("lsAuto");if(b)b.textContent="▶ ចាក់ស្វ័យប្រវត្តិ"}
function bind(){
  $("lsG").onclick=function(e){var b=e.target.closest("[data-g]");if(b){gSel=+b.dataset.g;render()}};
  $("lsBody").onclick=function(e){var b=e.target.closest("[data-ls]");if(!b)return;var a=b.dataset.ls.split("|");open(+a[0],+a[1])};
  $("lsPrev").onclick=function(){go(-1)};$("lsNext").onclick=function(){go(1)};
  $("lsClose").onclick=close;
  $("lsDots").onclick=function(e){var b=e.target.closest("[data-dot]");if(b)goTo(+b.dataset.dot)};
  $("lsStage").onclick=function(e){var b=e.target.closest("[data-go-sl]");if(b)goTo(+b.dataset.goSl)};
  $("lsAuto").onclick=function(){if(timer)return stopAuto();this.textContent="⏸ ផ្អាក";timer=setInterval(function(){go(1)},7000)};
  $("lsFull").onclick=function(){var v=$("lsView");if(document.fullscreenElement)document.exitFullscreen().catch(function(){});else if(v.requestFullscreen)v.requestFullscreen().catch(function(){})};
  document.addEventListener("keydown",function(e){
    if($("lsView").hidden)return;
    if(e.key==="ArrowRight"||e.key==="PageDown"||e.key===" "){e.preventDefault();go(1)}
    else if(e.key==="ArrowLeft"||e.key==="PageUp"){e.preventDefault();go(-1)}
    else if(e.key==="Escape"&&!document.fullscreenElement)close();
  });
  var x0=null;
  $("lsStage").addEventListener("touchstart",function(e){x0=e.touches[0].clientX},{passive:true});
  $("lsStage").addEventListener("touchend",function(e){if(x0==null)return;var dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>50)go(dx<0?1:-1);x0=null},{passive:true});
}
if($("lsBody"))bind();
window.renderLs=render;
})();
