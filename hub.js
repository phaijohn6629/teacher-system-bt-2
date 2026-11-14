/* ========================================================================
   📚 ផ្ទាំងសិក្សា (Flipped Classroom) — មេរៀនសង្ខេប · រូបមន្ត · គន្លឹះ · វីដេអូ តាមចំណុចរងនៃមេរៀនហ្វឹកហាត់
   - បង្ហាញលើ practice.html ពីលើលំហាត់ (បើក/បិទបាន) · ចំណុចរងបង្ហាញតាមកម្រិត (sub.lv) · 🌐 PISA = គ្រប់ចំណុច + គំរូជីវិតពិត
   - ទិន្នន័យ៖ (១) គ្រូកែ → Firestore hub/{ថ្នាក់}_{មេរៀន} = {o,g,l,j:JSON,r,u} (សិស្សអានតាម REST គ្មាន SDK · cache ក្នុង localStorage · ទាញថ្មីរាល់ពេលបើក/Refresh ទំព័រ និងរៀងរាល់ ១ នាទី)
              (២) មាតិកាគំរូក្នុងឯកសារនេះ (ថ្នាក់ទី៩ ពេញ) · (៣) ថ្នាក់ផ្សេង៖ គន្លឹះទូទៅ + ឈ្មោះមេរៀន
   - ចំណុចរង = {t:ចំណងជើង, lv:[គន្លឹះកម្រិត] (ទទេ = គ្រប់កម្រិត), s:មេរៀនសង្ខេប, f:[LaTeX], k:គន្លឹះ, ex:[[សំណួរ,ដំណោះស្រាយ]], v:URL វីដេអូ}
     អត្ថបទ៖ មួយបន្ទាត់មួយចំណុច · «- » = ចំណុចបញ្ជី · គណិតក្នុង $…$
   - វីដេអូ៖ YouTube · Google Drive · ឯកសារ MP4/WebM (https) → ផ្ទាំងចាក់ (modal)
   ប្រើទាំង practice.html (practice.js ហៅ HUB.html / HUB.after) និង lessonedit.js (កម្មវិធីកែរបស់គ្រូ)
   ======================================================================== */
(function(){
"use strict";
var R=String.raw;
var PROJ="math-teacher-system-bt",TTL=60*1000;   /* ១ នាទី · បើក/Refresh ទំព័រ = ទាញថ្មីភ្លាម */
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function U(t,lv,s,f,k,ex){return{t:t,lv:lv,s:s,f:f,k:k,ex:ex||[]}}
var B=[1,5],M=[5,2,6],H=[6,3];   /* កម្រិត ១–២ · ២–៤ · ៤–៥ */

/* ======================= មាតិកាគំរូ ថ្នាក់ទី៩ ======================= */
var S9={
1:[U("១.១ ឫសការេ និងឫសគូប",B,R`$\sqrt a$ ($a\ge0$) ជាចំនួនមិនអវិជ្ជមាន ដែលការេរបស់វាស្មើ $a$
$\sqrt[3]a$ ជាចំនួនដែលគូបរបស់វាស្មើ $a$ (មាន $a<0$ ក៏បាន)
- $\sqrt{49}=7$ ព្រោះ $7^2=49$
- $\sqrt[3]{-8}=-2$ ព្រោះ $(-2)^3=-8$`,
 [R`(\sqrt a)^2=a\quad(a\ge0)`,R`\sqrt{a^2}=|a|`,R`\left(\sqrt[3]a\right)^3=a`],
 R`ទន្ទេញការេ $1^2$ ដល់ $20^2$ និងគូប $1^3$ ដល់ $10^3$
$\sqrt{x^2}=|x|$ ៖ ចម្លើយមិនអាចអវិជ្ជមាន`,
 [[R`គណនា $\sqrt{144}+\sqrt[3]{-27}$`,R`$12+(-3)=9$`]]),
 U("១.២ សម្រួលរ៉ាឌីកាល់",M,R`ដាក់កត្តាការេចេញក្រៅឫស ៖ $\sqrt{k^2m}=k\sqrt m$
រ៉ាឌីកាល់ដូចគ្នា (ក្រោមឫសដូចគ្នា) ទើបបូក/ដកបាន`,
 [R`\sqrt{ab}=\sqrt a\,\sqrt b`,R`\sqrt{\dfrac ab}=\dfrac{\sqrt a}{\sqrt b}`,R`m\sqrt k+n\sqrt k=(m+n)\sqrt k`],
 R`- បំបែកលេខក្រោមឫសជាផលគុណ «ការេធំបំផុត × លេខនៅសល់»
- $\sqrt{a+b}\ne\sqrt a+\sqrt b$ (កំហុសញឹកញាប់)`,
 [[R`សម្រួល $\sqrt{50}+\sqrt{18}$`,R`$5\sqrt2+3\sqrt2=8\sqrt2$`]]),
 U("១.៣ ភាគបែងគ្មានឫស",H,R`គុណភាគយក និងភាគបែងនឹង «កន្សោមឆ្លាស់» ដើម្បីលុបឫសចេញពីភាគបែង`,
 [R`\dfrac{1}{\sqrt a}=\dfrac{\sqrt a}{a}`,R`(\sqrt a+\sqrt b)(\sqrt a-\sqrt b)=a-b`],
 R`$\sqrt a+\sqrt b$ ឆ្លាស់នឹង $\sqrt a-\sqrt b$
ផ្ទៀងផ្ទាត់ចម្លើយ ៖ ភាគបែងចុងក្រោយត្រូវជាចំនួនគត់`,
 [[R`ធ្វើឱ្យភាគបែង $\dfrac{2}{\sqrt5-\sqrt3}$ គ្មានឫស`,R`$\dfrac{2(\sqrt5+\sqrt3)}{5-3}=\sqrt5+\sqrt3$`]])],
2:[U("២.១ ផលធៀប និងសមាមាត្រ",B,R`ផលធៀប $a:b$ ប្រៀបធៀបបរិមាណពីរ · សមាមាត្រ $\dfrac ab=\dfrac cd$
ចែក $N$ តាមផលធៀប $p:q$ ៖ មួយចំណែក $=\dfrac{N}{p+q}$`,
 [R`\dfrac ab=\dfrac cd\iff ad=bc`,R`x=\dfrac{p}{p+q}N`],
 R`- សមាមាត្រស្រប ៖ មួយកើន មួយទៀតកើនដូចគ្នា (ផលចែកថេរ)
- សមាមាត្រច្រាស ៖ ផលគុណថេរ (ឧ. កម្មករ × ថ្ងៃ)`,
 [[R`$x:y=2:3$ និង $x+y=40$ ។ រក $x$`,R`មួយចំណែក $=8$ ⇒ $x=16$`]]),
 U("២.២ ភាគរយ",M,R`$p\%$ នៃ $A$ គឺ $\dfrac{p}{100}A$
ឡើង $p\%$ ⇒ គុណនឹង $\left(1+\dfrac p{100}\right)$ · ចុះ $p\%$ ⇒ គុណនឹង $\left(1-\dfrac p{100}\right)$`,
 [R`A'=A\left(1\pm\dfrac{p}{100}\right)`,R`\Delta=\dfrac{A'-A}{A}\times100\%`],
 R`- ឡើង $20\%$ រួចចុះ $20\%$ មិនមែនត្រឡប់ដដែលទេ ($\times1.2\times0.8=0.96$)
- រកតម្លៃដើម ៖ ចែកនឹងមេគុណ មិនមែនដក $p\%$`,
 [[R`តម្លៃក្រោយបញ្ចុះ $25\%$ គឺ $60\,000$ រៀល ។ តម្លៃដើម?`,R`$\dfrac{60\,000}{0.75}=80\,000$ រៀល`]]),
 U("២.៣ ការប្រាក់ និងកំហាប់",H,R`ការប្រាក់សមាស ៖ ប្រាក់ការបូកចូលដើមរៀងរាល់ឆ្នាំ
កំហាប់ $c=\dfrac{m}{V}$ ($m$ សារធាតុ · $V$ ល្បាយសរុប)`,
 [R`A=P\left(1+\dfrac{r}{100}\right)^n`,R`c=\dfrac{m}{V}\times100\%`],
 R`ការប្រាក់ (មិនរាប់ដើម) $=A-P$
លាយទឹកសុទ្ធ ៖ បរិមាណសារធាតុ $m$ មិនប្ដូរ`,
 [[R`$P=1\,000\,000$ , $r=10\%$ , $n=2$ ។ ការប្រាក់?`,R`$1\,000\,000\times1.21-1\,000\,000=210\,000$`]])],
3:[U("៣.១ ពន្លាត និងសម្រួល",B,R`ពន្លាត = គុណចូលក្នុងវង់ក្រចក · តួដូចគ្នា (អថេរ និងនិទស្សន្តដូចគ្នា) ទើបបូកបាន`,
 [R`a(b+c)=ab+ac`,R`(a+b)(c+d)=ac+ad+bc+bd`],
 R`- សញ្ញាដកមុខវង់ក្រចក ប្ដូរសញ្ញាគ្រប់តួខាងក្នុង
- តម្រៀបចម្លើយពីដឺក្រេខ្ពស់ទៅទាប`,
 [[R`សម្រួល $2(x+3)-(x-4)$`,R`$2x+6-x+4=x+10$`]]),
 U("៣.២ សមភាពគួរចងចាំ",M,R`រូបមន្តទាំងនេះប្រើទាំងពន្លាត និងដាក់ជាកត្តា`,
 [R`(a+b)^2=a^2+2ab+b^2`,R`(a-b)^2=a^2-2ab+b^2`,R`(a+b)(a-b)=a^2-b^2`],
 R`- $(a+b)^2\ne a^2+b^2$ ៖ កុំភ្លេចតួ $2ab$
- ផ្ទៀងផ្ទាត់ ៖ ជំនួស $x=1$ ទាំងសងខាង`,
 [[R`ពន្លាត $(2x-3)^2$`,R`$4x^2-12x+9$`]]),
 U("៣.៣ ប្រភាគពីជគណិត",H,R`ដាក់ជាកត្តាមុន រួចសម្រួលកត្តារួម · បូកប្រភាគ ៖ រកភាគបែងរួម`,
 [R`\dfrac ab+\dfrac cd=\dfrac{ad+bc}{bd}`,R`\left(x+\dfrac1x\right)^2=x^2+2+\dfrac1{x^2}`],
 R`កំណត់លក្ខខណ្ឌ ភាគបែង $\ne0$ ជានិច្ច
សម្រួលបានតែ «កត្តា» មិនមែន «តួ»`,
 [[R`សម្រួល $\dfrac{x^2-9}{x+3}$`,R`$\dfrac{(x-3)(x+3)}{x+3}=x-3\ (x\ne-3)$`]])],
4:[U("៤.១ សមីការ $ax+b=0$",B,R`ដោះស្រាយ = រក $x$ ដែលធ្វើឱ្យសមភាពពិត
ធ្វើប្រមាណវិធីដូចគ្នាទាំងសងខាង`,
 [R`ax+b=0\ (a\ne0)\Rightarrow x=-\dfrac ba`],
 R`- ផ្ទេរតួ ៖ ប្ដូរសញ្ញា
- ផ្ទៀងផ្ទាត់ ៖ ជំនួស $x$ ចូលសមីការដើម`,
 [[R`ដោះស្រាយ $3x-7=8$`,R`$3x=15\Rightarrow x=5$`]]),
 U("៤.២ សមីការមានវង់ក្រចក និងប្រភាគ",M,R`ពន្លាតវង់ក្រចកជាមុន · មានប្រភាគ ៖ គុណទាំងសងខាងនឹងភាគបែងរួមតូចបំផុត`,
 [R`\dfrac{x+a}{m}=\dfrac{x+b}{n}\Rightarrow n(x+a)=m(x+b)`],
 R`គុណនឹងភាគបែងរួម ត្រូវគុណ «គ្រប់តួ» ទាំងតួដែលគ្មានប្រភាគ
ដាក់ភាគយកក្នុងវង់ក្រចកពេលគុណ`,
 [[R`$\dfrac{x}{2}+\dfrac{x}{3}=5$`,R`គុណ $6$ ៖ $3x+2x=30\Rightarrow x=6$`]]),
 U("៤.៣ ចោទជាសមីការ",H,R`ជំហាន ៖ តាងអញ្ញាត → សរសេរទំនាក់ទំនង → ដោះស្រាយ → ផ្ទៀងផ្ទាត់ និងឆ្លើយជាប្រយោគ`,
 [R`d=v\cdot t`,R`x,\ x+1,\ x+2`],
 R`ពិនិត្យថាចម្លើយសមហេតុផល (អាយុ ចំនួនមនុស្ស ត្រូវជាចំនួនគត់វិជ្ជមាន)`,
 [[R`ឪពុកចាស់ជាងកូន $25$ ឆ្នាំ ផលបូកអាយុ $45$ ។ អាយុកូន?`,R`$x+x+25=45\Rightarrow x=10$ ឆ្នាំ`]])],
5:[U("៥.១ វិសមីការ និងសញ្ញា",B,R`ដោះស្រាយដូចសមីការ ប៉ុន្តែ ៖ គុណ ឬចែកនឹងចំនួនអវិជ្ជមាន ត្រូវប្ដូរទិសសញ្ញា`,
 [R`-2x>6\Rightarrow x<-3`,R`a>0:\ ax>b\Rightarrow x>\dfrac ba`],
 R`- តំណាងលើបន្ទាត់ចំនួន ៖ $>$ $<$ រង្វង់ទទេ · $\ge$ $\le$ រង្វង់ពេញ
- សាកលេខមួយក្នុងចម្លើយ ដើម្បីផ្ទៀងផ្ទាត់ទិស`,
 [[R`ដោះស្រាយ $5-2x\ge11$`,R`$-2x\ge6\Rightarrow x\le-3$`]]),
 U("៥.២ ប្រព័ន្ធវិសមីការ និងចំនួនគត់",H.concat([2]),R`ប្រព័ន្ធ ៖ ចម្លើយជាផ្នែករួម (ប្រសព្វ) នៃចម្លើយនីមួយៗ`,
 [R`\begin{cases}x>a\\x\le b\end{cases}\Rightarrow a<x\le b`],
 R`រាប់ចំនួនគត់ក្នុង $a<x\le b$ ៖ $b-a$ ចំនួន (បើ $a,b$ គត់)
បញ្ហា «ច្រើនបំផុត/តិចបំផុត» ៖ ប្រើ $\le$ ឬ $\ge$ រួចយកចំនួនគត់`,
 [[R`មាន $20\,000$ រៀល ប៊ិច $3\,000$ រៀល/ដើម ។ ទិញបានច្រើនបំផុត?`,R`$3000x\le20000\Rightarrow x\le6.6\Rightarrow 6$ ដើម`]])],
6:[U("៦.១ តារាងប្រេកង់",B,R`ប្រេកង់ $f$ = ចំនួនដងដែលតម្លៃនីមួយៗលេចឡើង · $N=\sum f$`,
 [R`N=f_1+f_2+\dots+f_k`,R`f_r=\dfrac{f}{N}\times100\%`],
 R`ផលបូកប្រេកង់ធៀបទាំងអស់ $=100\%$ (ប្រើផ្ទៀងផ្ទាត់)`,
 [[R`$f=3,5,2$ ។ ប្រេកង់ធៀបនៃតម្លៃទី២?`,R`$\dfrac5{10}=50\%$`]]),
 U("៦.២ ថ្នាក់ ប្រេកង់កើន និងដ្យាក្រាម",M.concat([3]),R`ថ្នាក់ $[a;b)$ ៖ ទំហំ $b-a$ · ផ្ចិត $\dfrac{a+b}2$
ប្រេកង់កើន ៖ បូកប្រេកង់តាំងពីថ្នាក់ទី១ ដល់ថ្នាក់នោះ`,
 [R`c=\dfrac{a+b}{2}`,R`\theta=\dfrac{f}{N}\times360^\circ`],
 R`ដ្យាក្រាមរង្វង់ ៖ មុំផ្ចិតសរុប $360^\circ$
តម្លៃបាត់ ៖ $N-$ ផលបូកប្រេកង់ដែលស្គាល់`,
 [[R`$12$ ក្នុង $N=36$ ។ មុំផ្ចិត?`,R`$\dfrac{12}{36}\times360=120^\circ$`]])],
7:[U("៧.១ មធ្យម មេដ្យាន ម៉ូត",B.concat([2]),R`មធ្យម = ផលបូក ÷ ចំនួន · មេដ្យាន = តួកណ្ដាលក្រោយតម្រៀប · ម៉ូត = តម្លៃញឹកញាប់បំផុត`,
 [R`\bar x=\dfrac{x_1+\dots+x_n}{n}`,R`\bar x=\dfrac{\sum x_if_i}{N}`],
 R`- មេដ្យាន ៖ តម្រៀបជាមុនជានិច្ច · $n$ គូ ⇒ មធ្យមនៃតួកណ្ដាលពីរ
- វិសាលភាព = ធំបំផុត − តូចបំផុត`,
 [[R`មេដ្យាននៃ $7,2,9,4$`,R`តម្រៀប $2,4,7,9$ ⇒ $\dfrac{4+7}2=5.5$`]]),
 U("៧.២ បញ្ហាមធ្យម",[2,6,3],R`ផលបូក = មធ្យម × ចំនួន · គ្រប់បញ្ហាបន្ថែម/ដក/បញ្ចូលក្រុម ធ្វើលើ «ផលបូក»`,
 [R`\sum x=n\bar x`,R`\bar x=\dfrac{n_1\bar x_1+n_2\bar x_2}{n_1+n_2}`],
 R`បូក $k$ គ្រប់តម្លៃ ⇒ មធ្យមបូក $k$ · គុណ $k$ ⇒ មធ្យមគុណ $k$
តម្លៃខុសគេខ្លាំង ⇒ មេដ្យានតំណាងល្អជាងមធ្យម`,
 [[R`មធ្យម $5$ ចំនួន $=12$ ។ បន្ថែមមួយ មធ្យម $13$ ។ ចំនួនបន្ថែម?`,R`$6\times13-5\times12=18$`]])],
8:[U("៨.១ ប្រូបាបនៃព្រឹត្តិការណ៍",B,R`ករណីស្មើឱកាស ៖ $P(A)=\dfrac{n(A)}{n(\Omega)}$ (ករណីស្រប ÷ ករណីអាច)`,
 [R`P(A)=\dfrac{n(A)}{n(\Omega)}`,R`0\le P(A)\le1`,R`P(\bar A)=1-P(A)`],
 R`$P=0$ ព្រឹត្តិការណ៍មិនអាច · $P=1$ ព្រឹត្តិការណ៍ប្រាកដ
សួរ «យ៉ាងតិចម្ដង» ⇒ ប្រើ $1-P(\bar A)$`,
 [[R`គ្រាប់ឡុកឡាក់ ៖ ប្រូបាបបានលេខគូ?`,R`$\dfrac36=\dfrac12$`]]),
 U("៨.២ វិធានគុណ (ព្រឹត្តិការណ៍តៗគ្នា)",M.concat([3]),R`ព្រឹត្តិការណ៍ឯករាជ្យ ៖ គុណប្រូបាប · មិនដាក់ចូលវិញ ៖ ភាគបែង និងភាគយកថយ`,
 [R`P(A\cap B)=P(A)\cdot P(B)`,R`P=\dfrac{r}{N}\cdot\dfrac{r-1}{N-1}`],
 R`ពណ៌ខុសគ្នា ៖ បូកករណី $RB$ និង $BR$
គូរដើមឈើប្រូបាប ដើម្បីកុំភ្លេចករណី`,
 [[R`ក្រហម $3$ ខៀវ $2$ ចាប់ $2$ មិនដាក់វិញ ។ ប្រូបាបបានក្រហមទាំងពីរ?`,R`$\dfrac35\cdot\dfrac24=\dfrac3{10}$`]])],
9:[U("៩.១ ចម្ងាយរវាងពីរចំណុច",B.concat([2]),R`ចម្ងាយ = អ៊ីប៉ូតេនុសនៃត្រីកោណកែងដែលមានជ្រុង $|x_B-x_A|$ និង $|y_B-y_A|$`,
 [R`AB=\sqrt{(x_B-x_A)^2+(y_B-y_A)^2}`],
 R`ត្រីគុណពីតាករ $3,4,5$ · $5,12,13$ · $8,15,17$ ជួយគណនាលឿន
$y$ ដូចគ្នា ⇒ $AB=|x_B-x_A|$`,
 [[R`$A(1;2)$ , $B(4;6)$`,R`$\sqrt{9+16}=5$`]]),
 U("៩.២ ចំណុចកណ្ដាល និងរូបធរណីមាត្រ",[5,2,6,3],R`ចំណុចកណ្ដាល = មធ្យមនៃកូអរដោនេ · ប្រើចម្ងាយដើម្បីស្គាល់ត្រីកោណសមបាត កែង ការេ`,
 [R`M\left(\dfrac{x_A+x_B}2;\dfrac{y_A+y_B}2\right)`,R`AB^2+AC^2=BC^2\Rightarrow\widehat A=90^\circ`],
 R`រកចុង $B$ ពីកណ្ដាល ៖ $x_B=2x_M-x_A$
រង្វង់អង្កត់ផ្ចិត $[AB]$ ៖ ផ្ចិត $=M$ , $R=\dfrac{AB}2$`,
 [[R`$M(1;1)$ កណ្ដាល $[AB]$ , $A(-1;3)$ ។ $B$?`,R`$B(3;-1)$`]])],
10:[U("១០.១ ស្លូប និងអរដោនេគល់",B,R`$y=ax+b$ ៖ $a$ = ស្លូប (កើនប៉ុន្មានពេល $x$ កើន $1$) · $b$ = ចំណុចកាត់អ័ក្ស $y$`,
 [R`a=\dfrac{y_B-y_A}{x_B-x_A}`,R`b=y_A-ax_A`],
 R`$a>0$ ឡើង · $a<0$ ចុះ · $a=0$ ដេក
ចំណុចនៅលើបន្ទាត់ ⇔ ជំនួសហើយសមភាពពិត`,
 [[R`$A(1;3)$ , $B(3;7)$`,R`$a=\dfrac42=2$ , $b=3-2=1$ ⇒ $y=2x+1$`]]),
 U("១០.២ បន្ទាត់ស្រប កែង និងប្រសព្វ",[2,6,3],R`ស្រប ⇔ ស្លូបស្មើ · កែង ⇔ ផលគុណស្លូប $=-1$ · ប្រសព្វ ៖ ដោះស្រាយ $a_1x+b_1=a_2x+b_2$`,
 [R`a_1=a_2\ (\parallel)`,R`a_1a_2=-1\ (\perp)`],
 R`ចំណុចកាត់អ័ក្ស $x$ ៖ ដាក់ $y=0$ · អ័ក្ស $y$ ៖ ដាក់ $x=0$
ផ្ទៃត្រីកោណជាមួយអ័ក្ស ៖ $\dfrac12|x_0|\,|b|$`,
 [[R`កែងនឹង $y=2x$ កាត់តាម $(2;1)$`,R`$a=-\dfrac12$ ⇒ $y=-\dfrac12x+2$`]])],
11:[U("១១.១ វិធីជំនួស",B,R`ទាញអញ្ញាតមួយពីសមីការងាយ រួចជំនួសចូលសមីការមួយទៀត`,
 [R`\begin{cases}y=ax+b\\cx+dy=e\end{cases}`],
 R`ជ្រើសអញ្ញាតដែលមានមេគុណ $1$ ដើម្បីទាញ
ចម្លើយជាគូ $(x;y)$ · ផ្ទៀងផ្ទាត់ក្នុងសមីការទាំងពីរ`,
 [[R`$y=2x$ , $x+y=9$`,R`$3x=9\Rightarrow x=3,\ y=6$`]]),
 U("១១.២ វិធីបូកលុប និងបញ្ហាជីវិត",[5,2,6,3],R`គុណសមីការដើម្បីឱ្យមេគុណអញ្ញាតមួយផ្ទុយគ្នា រួចបូក`,
 [R`\begin{cases}x+y=S\\x-y=D\end{cases}\Rightarrow x=\dfrac{S+D}2`],
 R`- តាងអញ្ញាតពីរ ⇒ ត្រូវការប្រយោគ (ទំនាក់ទំនង) ពីរ
- ទូក ៖ ចុះទឹក $v+c$ · ឡើងទឹក $v-c$`,
 [[R`មាន់ និងទន្សាយ ក្បាល $10$ ជើង $28$`,R`$x+y=10$ , $2x+4y=28$ ⇒ $x=6$ , $y=4$`]])],
12:[U("១២.១ ទីតាំងបន្ទាត់ និងរង្វង់",B,R`ធៀបចម្ងាយ $d$ ពីផ្ចិតទៅបន្ទាត់ ជាមួយកាំ $R$`,
 [R`d<R\Rightarrow 2`,R`d=R\Rightarrow 1`,R`d>R\Rightarrow 0`],
 R`បន្ទាត់ប៉ះ កែងនឹងកាំត្រង់ចំណុចប៉ះ ($OT\perp(d)$)`,
 [[R`$R=5$ , $d=3$`,R`$d<R$ ⇒ កាត់ $2$ ចំណុច`]]),
 U("១២.២ បន្ទាត់ប៉ះ និងខ្សែធ្នូ",[5,2,6,3],R`ត្រីកោណកែងលាក់ខ្លួន ៖ $OTM$ (បន្ទាត់ប៉ះ) និង ផ្ចិត–កណ្ដាលខ្សែធ្នូ–ចុងខ្សែធ្នូ`,
 [R`MT^2=OM^2-R^2`,R`\left(\dfrac{AB}{2}\right)^2=R^2-d^2`],
 R`បន្ទាត់ប៉ះពីរចេញពីចំណុចតែមួយ មានប្រវែងស្មើគ្នា
គូសកាំទៅចំណុចប៉ះ ជាជំហានដំបូងជានិច្ច`,
 [[R`$R=6$ , $OM=10$ ។ $MT$?`,R`$\sqrt{100-36}=8$`]])],
13:[U("១៣.១ មុំផ្ចិត និងមុំចារឹក",B.concat([2]),R`មុំចារឹក = ពាក់កណ្ដាលមុំផ្ចិត ដែលស្កាត់ធ្នូតែមួយ`,
 [R`\widehat{ACB}=\dfrac12\widehat{AOB}`,R`AB=2R\Rightarrow\widehat{ACB}=90^\circ`],
 R`មុំចារឹកស្កាត់ធ្នូតែមួយ ស្មើគ្នា
ត្រីកោណ $OAB$ សមបាត ($OA=OB=R$)`,
 [[R`$\widehat{AOB}=110^\circ$`,R`$\widehat{ACB}=55^\circ$`]]),
 U("១៣.២ ចតុកោណចារឹក និងបន្ទាត់ប៉ះ",[5,2,6,3],R`ចតុកោណចារឹកក្នុងរង្វង់ ៖ មុំឈមបូកគ្នា $180^\circ$`,
 [R`\widehat A+\widehat C=180^\circ`,R`\widehat{TAB}=\widehat{ACB}`],
 R`មុំក្រៅនៃចតុកោណចារឹក = មុំក្នុងឈម
បន្ទាត់ប៉ះពីរពី $P$ ៖ $\widehat{AOB}=180^\circ-\widehat{APB}$`,
 [[R`$\widehat A=(2x)^\circ$ , $\widehat C=(x+60)^\circ$`,R`$3x+60=180\Rightarrow x=40$`]])],
14:[U("១៤.១ ទ្រឹស្ដីបទតាលែស",B.concat([2]),R`ក្នុង $\triangle ABC$ បើ $(DE)\parallel(BC)$ នោះជ្រុងត្រូវគ្នាសមាមាត្រ`,
 [R`\dfrac{AD}{AB}=\dfrac{AE}{AC}=\dfrac{DE}{BC}`,R`\dfrac{AD}{DB}=\dfrac{AE}{EC}`],
 R`សរសេរ «តូច/ធំ» ក្នុងលំដាប់ដូចគ្នាគ្រប់ប្រភាគ
$DE$ ធៀបជាមួយ $AB$ មិនមែន $DB$`,
 [[R`$AD=3$ , $AB=9$ , $BC=12$`,R`$DE=12\cdot\dfrac39=4$`]]),
 U("១៤.២ ទ្រឹស្ដីបទច្រាស និងមេអំបៅ",[5,6,3],R`ច្រាស ៖ បើ $\dfrac{AD}{AB}=\dfrac{AE}{AC}$ នោះ $(DE)\parallel(BC)$
រូបមេអំបៅ ៖ $(AB)\parallel(CD)$ កាត់គ្នាត្រង់ $O$`,
 [R`\dfrac{OA}{OD}=\dfrac{OB}{OC}=\dfrac{AB}{CD}`],
 R`ប្រើវាស់ចម្ងាយមិនអាចទៅដល់ (ទទឹងទន្លេ កម្ពស់ដើមឈើ)`,
 [[R`$OC=4$ , $OB=12$ , $CD=5$`,R`$AB=5\cdot3=15$`]])],
15:[U("១៥.១ ត្រីកោណដូចគ្នា",B.concat([2]),R`ត្រីកោណដូចគ្នា ៖ មុំស្មើគ្នា ជ្រុងសមាមាត្រ (ផលធៀប $k$)
លក្ខខណ្ឌ ៖ ម.ម · ជ.ម.ជ · ជ.ជ.ជ`,
 [R`\dfrac{A'B'}{AB}=\dfrac{B'C'}{BC}=\dfrac{A'C'}{AC}=k`,R`P'=kP`],
 R`ផ្គូផ្គងកំពូលតាមមុំស្មើ មុនសរសេរផលធៀប`,
 [[R`$k=3$ , $BC=4$`,R`$B'C'=12$`]]),
 U("១៥.២ ផ្ទៃ និងត្រីកោណកែង",[6,3,2],R`ផ្ទៃត្រីកោណដូចគ្នា ធៀបគ្នា $k^2$ · កម្ពស់លើអ៊ីប៉ូតេនុស បង្កើតត្រីកោណដូចគ្នាបី`,
 [R`\dfrac{S'}{S}=k^2`,R`AH^2=BH\cdot HC`,R`AB^2=BH\cdot BC`],
 R`$AH=\dfrac{AB\cdot AC}{BC}$ (ផ្ទៃគិតពីរបៀប)`,
 [[R`$BH=4$ , $HC=9$`,R`$AH=\sqrt{36}=6$`]])],
16:[U("១៦.១ ផលបូកមុំក្នុង",B.concat([2]),R`ពហុកោណ $n$ ជ្រុង ចែកបាន $n-2$ ត្រីកោណ ពីកំពូលមួយ`,
 [R`S=(n-2)\times180^\circ`,R`e_1+e_2+\dots+e_n=360^\circ`],
 R`ពហុកោណនិយ័ត ៖ មុំក្នុង $=\dfrac{(n-2)180}{n}$ · មុំក្រៅ $=\dfrac{360}{n}$`,
 [[R`ពហុកោណនិយ័ត $8$ ជ្រុង`,R`មុំក្រៅ $45^\circ$ · មុំក្នុង $135^\circ$`]]),
 U("១៦.២ អង្កត់ទ្រូង និងពហុកោណចារឹក",[5,6,3],R`កំពូលនីមួយៗ ភ្ជាប់ $n-3$ អង្កត់ទ្រូង`,
 [R`d=\dfrac{n(n-3)}{2}`,R`n=6:\ R=a`,R`n=4:\ R=\dfrac{a\sqrt2}{2}`],
 R`ស្គាល់មុំក្រៅ ⇒ $n=\dfrac{360}{e}$ ($e$ មុំក្រៅ · ងាយជាងប្រើមុំក្នុង)`,
 [[R`$d=20$`,R`$n(n-3)=40\Rightarrow n=8$`]])],
17:[U("១៧.១ ផលធៀបប្រវែង ផ្ទៃ មាឌ",null,R`រូបដូចគ្នាផលធៀបប្រវែង $k$ ៖ ផ្ទៃធៀប $k^2$ · មាឌធៀប $k^3$`,
 [R`\dfrac{L'}{L}=k`,R`\dfrac{S'}{S}=k^2`,R`\dfrac{V'}{V}=k^3`],
 R`ស្គាល់ផលធៀបផ្ទៃ ⇒ $k=\sqrt{\ }$ · ស្គាល់មាឌ ⇒ $k=\sqrt[3]{\ }$
ទម្ងន់ (សម្ភារៈដូចគ្នា) សមាមាត្រនឹងមាឌ · ថ្នាំលាប សមាមាត្រនឹងផ្ទៃ`,
 [[R`$k=2$ , $V=5$`,R`$V'=5\cdot8=40$`],[R`កាត់កោណត្រង់ $\dfrac12$ កម្ពស់ពីកំពូល · $V=64$`,R`កោណតូច $64\cdot\dfrac18=8$ ⇒ ផ្នែកក្រោម $56$`]])],
18:[U("១៨.១ sin cos tan",B.concat([2]),R`ក្នុងត្រីកោណកែង ធៀបនឹងមុំស្រួច $A$ ៖ ឈម · ជាប់ · អ៊ីប៉ូតេនុស`,
 [R`\sin A=\dfrac{BC}{AB}`,R`\cos A=\dfrac{AC}{AB}`,R`\tan A=\dfrac{BC}{AC}`],
 R`ចាំ «SOH-CAH-TOA» · $\sin A=\cos(90^\circ-A)$`,
 [[R`$BC=3$ , $AC=4$ , $AB=5$`,R`$\sin A=\dfrac35$ , $\tan A=\dfrac34$`]]),
 U("១៨.២ មុំពិសេស និងទំនាក់ទំនង",[5,6,3],R`មុំ $30^\circ,45^\circ,60^\circ$ មានតម្លៃពិតប្រាកដ`,
 [R`\sin30^\circ=\cos60^\circ=\tfrac12`,R`\sin45^\circ=\cos45^\circ=\tfrac{\sqrt2}2`,R`\sin60^\circ=\cos30^\circ=\tfrac{\sqrt3}2`,R`\sin^2A+\cos^2A=1`,R`\tan A=\dfrac{\sin A}{\cos A}`],
 R`$\tan30^\circ=\dfrac{\sqrt3}3$ , $\tan45^\circ=1$ , $\tan60^\circ=\sqrt3$
មុំងើប ៖ $h=d\tan\alpha$`,
 [[R`$\cos A=\dfrac45$`,R`$\sin A=\sqrt{1-\dfrac{16}{25}}=\dfrac35$`]])]
};
var STARTER={9:S9};

/* ---------- PISA (គ្រប់មេរៀន) ---------- */
function pisaSub(en){return en?U("🌐 From real life to mathematics",[4],"Read the situation twice and underline the numbers and the question.\n- Name the unknown (what is asked)\n- Write the relationship as an equation, ratio or formula\n- Solve, then check that the answer makes sense (units, whole numbers, realistic size)",
  [R`\text{situation}\to\text{model}\to\text{solve}\to\text{interpret}`],"Draw a quick sketch or table.\nEstimate first so you can spot impossible answers.",[]):
  U("🌐 ពីស្ថានភាពពិត ទៅជាគណិតវិទ្យា",[4],R`អានស្ថានភាព ២ ដង · គូសបន្ទាត់ក្រោមលេខ និងសំណួរ
- តាងអញ្ញាត (អ្វីដែលគេសួរ)
- សរសេរទំនាក់ទំនងជាសមីការ ផលធៀប ឬរូបមន្ត
- ដោះស្រាយ រួចពិនិត្យថាចម្លើយសមហេតុផល (ខ្នាត ចំនួនគត់ ទំហំពិត)`,
  [R`S\to M\to x\to\checkmark`],
  R`គូររូបសង្ខេប ឬតារាង
ប៉ាន់ស្មានចម្លើយជាមុន ដើម្បីដឹងពេលចម្លើយខុសពីការពិត
កុំភ្លេចខ្នាត (រៀល · km · m² · %)`,[])}
function generic(name,en){return[en?U("📖 "+name,null,"Your teacher has not added a summary for this topic yet.\nRead each question carefully, then look at the worked solution (💡) after you try.",[],"- Write every step on one line\n- Check your answer by substituting it back",[]):
  U("📖 "+name,null,R`គ្រូមិនទាន់បញ្ចូលមេរៀនសង្ខេបសម្រាប់មេរៀននេះនៅឡើយ
អានសំណួរឱ្យច្បាស់ ហើយមើលដំណោះស្រាយ (💡) ក្រោយពេលសាកធ្វើ`,[],R`- សរសេរជំហាននីមួយៗមួយបន្ទាត់
- ផ្ទៀងផ្ទាត់ចម្លើយ ដោយជំនួសចូលលក្ខខណ្ឌដើម`,[])]}

/* ---------- ទិន្នន័យ៖ គ្រូ (Firestore) > គំរូ > ទូទៅ ---------- */
function ck(g,l){return"hub"+g+"_"+l}
function cacheGet(g,l){try{return JSON.parse(localStorage.getItem(ck(g,l))||"null")}catch(e){return null}}
function cacheSet(g,l,o){try{localStorage.setItem(ck(g,l),JSON.stringify(o))}catch(e){}}
function starter(g,l){var s=STARTER[g]&&STARTER[g][l];return s?JSON.parse(JSON.stringify(s)):null}
function valid(d){return d&&Array.isArray(d.subs)&&d.subs.every(function(x){return x&&typeof x.t==="string"})}
function data(g,l,name,en){
  var c=cacheGet(g,l);if(c&&valid(c.d))return{subs:c.d.subs,src:"teacher"};
  var s=starter(g,l);if(s)return{subs:s,src:"starter"};
  return{subs:generic(name||"",en),src:"generic"};
}
/* 🔄 ទាញកំណែគ្រូ (REST · គ្មាន SDK) · មិនប៉ះពាល់លំហាត់ពេលបរាជ័យ */
var inflight={},backoff={},fresh={};   /* fresh = បានទាញក្នុងការបើកទំព័រលើកនេះហើយ */
function sync(g,l,cb){
  var k=g+"_"+l,c=cacheGet(g,l);
  if(inflight[k]||(fresh[k]&&c&&Date.now()-c.t<TTL)||(backoff[k]&&Date.now()-backoff[k]<TTL))return;   /* លើកដំបូងក្នុងទំព័រ → ទាញថ្មីជានិច្ច · បរាជ័យ → រង់ចាំ ១ នាទី */
  fresh[k]=1;   /* បរាជ័យ → កុំសាកម្ដងទៀតរាល់ពេលគូរ */
  if(typeof fetch!=="function")return;
  inflight[k]=1;
  var ac=window.AbortController?new AbortController():null,tm=setTimeout(function(){if(ac)ac.abort()},7000);
  fetch("https://firestore.googleapis.com/v1/projects/"+PROJ+"/databases/(default)/documents/hub/"+k,ac?{signal:ac.signal}:{}).then(function(r){
    if(r.status===404)return null;if(!r.ok)throw r.status;return r.json();   /* 403 (មិនទាន់ Publish rules) · 5xx → ទុកកំណែចាស់ */
  }).then(function(doc){
    var d=null;
    if(doc&&doc.fields&&doc.fields.j){try{d=JSON.parse(doc.fields.j.stringValue)}catch(e){d=null}if(!valid(d))d=null}
    var old=JSON.stringify(c&&c.d||null),nw=JSON.stringify(d);cacheSet(g,l,{t:Date.now(),d:d});
    if(old!==nw&&cb)cb();
  }).catch(function(){backoff[k]=Date.now()}).then(function(){clearTimeout(tm);delete inflight[k]});
}

/* ---------- វីដេអូ ---------- */
function vparse(u){
  u=String(u||"").trim();if(!/^https:\/\//i.test(u))return null;var m;
  if((m=/^https:\/\/(?:www\.|m\.)?(?:youtube\.com\/(?:watch\?(?:[^#]*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/i.exec(u)))return{k:"yt",src:"https://www.youtube-nocookie.com/embed/"+m[1]+"?rel=0&autoplay=1"};
  if((m=/^https:\/\/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:[^#]*&)?id=)([\w-]{20,})/i.exec(u)))return{k:"gd",src:"https://drive.google.com/file/d/"+m[1]+"/preview"};
  if(/^https:\/\/[^\s"'<>]+\.(mp4|webm|ogv|ogg|m4v)(\?[^\s"'<>]*)?$/i.test(u))return{k:"mp4",src:u};
  return null;
}
function vopen(u,title){
  var v=vparse(u);if(!v)return;
  var d=document.createElement("div");d.className="hub-vm";d.setAttribute("role","dialog");d.setAttribute("aria-modal","true");
  d.innerHTML="<div class=hub-vb><div class=hub-vh><b>🎬 "+esc(title||"")+"</b><button type=button class=hub-vx aria-label='បិទ'>✕</button></div><div class=hub-vf>"+
    (v.k==="mp4"?"<video controls autoplay playsinline src='"+esc(v.src)+"'></video>":"<iframe src='"+esc(v.src)+"' allow='autoplay; encrypted-media; picture-in-picture; fullscreen' allowfullscreen referrerpolicy=strict-origin-when-cross-origin></iframe>")+"</div></div>";
  var close=function(){document.removeEventListener("keydown",key);d.remove()},key=function(e){if(e.key==="Escape")close()};
  d.addEventListener("click",function(e){if(e.target===d||e.target.closest(".hub-vx"))close()});
  document.addEventListener("keydown",key);(document.querySelector("dialog[open]")||document.body).appendChild(d);   /* ក្នុង <dialog> (top layer) ពេលគ្រូសាក */
  try{d.querySelector(".hub-vx").focus()}catch(e){}
}

/* ---------- បង្ហាញ ---------- */
function body(t){
  var out="",ul=false;
  String(t||"").split("\n").forEach(function(l){
    if(/^- /.test(l)){if(!ul){out+="<ul>";ul=true}out+="<li>"+esc(l.slice(2))+"</li>"}
    else{if(ul){out+="</ul>";ul=false}if(l.trim())out+="<p>"+esc(l)+"</p>"}
  });
  return out+(ul?"</ul>":"");
}
var L={km:{hub:"មេរៀនសង្ខេប · រូបមន្ត · គន្លឹះ · វីដេអូ",pt:" ចំណុច",sum:"មេរៀនសង្ខេប",f:"រូបមន្តសំខាន់ៗ",k:"គន្លឹះដោះស្រាយ",ex:"ឧទាហរណ៍គំរូ",sol:"មើលដំណោះស្រាយ",v:"ចាក់វីដេអូពន្យល់",nov:"មិនទាន់មានវីដេអូ",tch:"✍️ គ្រូបានកែសម្រួល",read:"អានមុនធ្វើលំហាត់"},
       en:{hub:"Summary · formulas · tips · video",pt:" topics",sum:"Summary",f:"Key formulas",k:"Solving tips",ex:"Worked examples",sol:"Show solution",v:"Play video",nov:"No video yet",tch:"✍️ Edited by your teacher",read:"Read before practising"}};
var OPEN={},OPENALL={};
function pickSubs(subs,v){
  if(v===4){var a=subs.slice();if(!subs.some(function(x){return x.lv&&x.lv.indexOf(4)>=0}))a.push(pisaSub(false));return a}
  var r=subs.filter(function(x){return!x.lv||!x.lv.length||x.lv.indexOf(v)>=0});
  return r.length?r:subs;
}
function subHtml(x,key,tx,open){
  var vv=vparse(x.v),h="<details class=hub-s data-hk='"+esc(key)+"'"+(open?" open":"")+"><summary><span class=hub-st>"+esc(x.t)+"</span><span class=hub-ic>"+(x.s?"📖":"")+(x.f&&x.f.length?"📐":"")+(x.k||x.ex&&x.ex.length?"💡":"")+(vv?"🎬":"")+"</span></summary><div class=hub-sb>";
  if(x.s)h+="<section class=hub-sum><h4>📖 "+tx.sum+"</h4>"+body(x.s)+"</section>";
  var f=(x.f||[]).filter(function(s){return String(s).trim()});
  if(f.length)h+="<section class=hub-f><h4>📐 "+tx.f+"</h4><div class=hub-fl>"+f.map(function(s){return"<div class=hub-fx>$$"+esc(s)+"$$</div>"}).join("")+"</div></section>";
  var ex=(x.ex||[]).filter(function(e){return e&&(e[0]||e[1])});
  if(x.k||ex.length)h+="<section class=hub-k><h4>💡 "+tx.k+"</h4>"+body(x.k)+(ex.length?"<div class=hub-exs><b>✏️ "+tx.ex+"</b>"+ex.map(function(e,i){return"<div class=hub-ex><div class=hub-exq><span class=hub-n>"+(i+1)+"</span><div>"+esc(e[0])+"</div></div>"+(e[1]?"<details class=hub-exa><summary>👁 "+tx.sol+"</summary><div>"+body(e[1])+"</div></details>":"")+"</div>"}).join("")+"</div>":"")+"</section>";
  h+="<div class=hub-vrow>"+(vv?"<button type=button class=hub-vbtn data-hubv='"+esc(x.v)+"' data-hubt='"+esc(x.t)+"'>▶ 🎬 "+tx.v+"</button>":"<span class=hub-nov>🎬 "+tx.nov+"</span>")+"</div>";
  return h+"</div></details>";
}
function html(g,l,v,name,en){
  var tx=en?L.en:L.km,d=data(g,l,name,en),subs=pickSubs(d.subs,v);
  if(v===4&&!subs.some(function(x){return x.lv&&x.lv.indexOf(4)>=0}))subs[subs.length-1]=pisaSub(en);
  var gk=g+"_"+l,open=OPENALL[gk]!==false;
  return"<details class=hub id=hub data-hg='"+gk+"'"+(open?" open":"")+"><summary class=hub-h><span>📚 "+tx.hub+"</span><small>"+subs.length+tx.pt+(d.src==="teacher"?" · "+tx.tch:"")+" · "+tx.read+"</small></summary><div class=hub-in>"+
    subs.map(function(x,i){var key=gk+"_"+v+"_"+i;return subHtml(x,key,tx,!!OPEN[key])}).join("")+"</div></details>";
}
/* ព្រឹត្តិការណ៍ (ម្ដងគត់) · រក្សាស្ថានភាពបើក/បិទ ពេល draw() គូរឡើងវិញ */
var bound=false;
function bind(){
  if(bound)return;bound=true;
  document.addEventListener("toggle",function(e){var t=e.target;if(!t||!t.dataset)return;
    if(t.dataset.hk)OPEN[t.dataset.hk]=t.open;else if(t.dataset.hg)OPENALL[t.dataset.hg]=t.open},true);
  document.addEventListener("click",function(e){var b=e.target.closest&&e.target.closest("[data-hubv]");if(b){e.preventDefault();vopen(b.dataset.hubv,b.dataset.hubt)}});
}
/* ហៅក្រោយ draw() ៖ ចងព្រឹត្តិការណ៍ + ទាញកំណែគ្រូ · មានកំណែថ្មី → គូរតែ #hub ឡើងវិញ */
function after(g,l,v,name,en,math){
  bind();
  sync(g,l,function(){var el=document.getElementById("hub");if(!el||el.dataset.hg!==g+"_"+l)return;
    var w=document.createElement("div");w.innerHTML=html(g,l,v,name,en);el.replaceWith(w.firstChild);if(math)math(document.getElementById("hub"))});
}
window.HUB={html:html,after:after,subHtml:function(x,en){return subHtml(x,"pv",en?L.en:L.km,true)},starter:starter,generic:generic,vparse:vparse,vopen:vopen,
  clear:function(g,l){try{localStorage.removeItem(ck(g,l))}catch(e){}},put:function(g,l,d){cacheSet(g,l,{t:Date.now(),d:d})},LV:[1,5,2,6,3,4]};
})();
