/* 🧪 monthly.js ៖ បំប្លែងសមាមាត្រ «ប្រឡងបិទ» (scaleC) · ពិន្ទុអតិបរមាតាមថ្នាក់ · ការពារ ÷0 · បង្គត់ ២ ខ្ទង់ · ដំណើរការ៖ jsc tests/monthly.js */
var bad=0,n=0;function ok(c,m){n++;if(!c){bad++;print("FAIL "+m)}}
var S=read("monthly.js");
function blk(a,b){var i=S.indexOf(a),r=S.slice(i);return r.slice(0,r.indexOf(b))}
eval(blk("function num(v)","/* អតិបរមានៃ")+blk("/* 📐 បំប្លែង","function factor"));
function eq(a,b,m){ok(a===b,m+" got "+a+" want "+b)}
/* ថ្នាក់ទី១២ (អតិបរមា ២៥) */
eq(scaleC(40,40,25),25,"full 40/40");eq(scaleC(20,40,25),12.5,"20/40");eq(scaleC(45,50,25),22.5,"45/50");
eq(scaleC(30,45,25),16.67,"30/45 rounds 2dp");eq(scaleC(0,40,25),0,"zero score");
/* ថ្នាក់ទី៧–៩ (២០) */
eq(scaleC(37,50,20),14.8,"37/50→20");eq(scaleC(50,50,20),20,"50/50→20");
/* ការពារ */
eq(scaleC(5,0,25),null,"full=0");eq(scaleC(5,-3,25),null,"full<0");eq(scaleC(5,"",25),null,"full empty");
eq(scaleC(null,40,25),null,"no score");eq(scaleC("x",40,25),null,"NaN score");eq(scaleC(5,40,null),null,"no max");
eq(scaleC(60,40,25),25,"over full → clamped to max");eq(scaleC(-2,40,25),0,"negative → 0");
/* ពិន្ទុអតិបរមាតាមថ្នាក់ = rs.mx × W.c(០.២) ពី «12NGS-B» */
var mx={7:100,8:100,9:100,10:150,11:125,12:125};
function maxC(cn){return Math.round((mx[parseInt(cn)]||100)*0.2*100)/100}
eq(maxC("12NGS-B"),25,"grade 12");eq(maxC("7A"),20,"grade 7");eq(maxC("9NGS-A"),20,"grade 9");eq(maxC("10B"),30,"grade 10");eq(maxC("11C"),25,"grade 11");
ok(/scaleC\(v,xc\.n,Mc\)/.test(S),"syncTests uses scaleC");
ok(/W\.c/.test(S)&&/rs\.mx\[parseInt\(c\.n\)\]/.test(S),"max from rs.mx[grade] × W.c");
/* និទ្ទេស ៖ A≥90 B≥80 C≥70 D≥60 E≥50 (ស្តង់ដារតែមួយ ៧–១២ · ការពារ floating-point) */
var rs={ms:{}};
eval(blk("var DEF=","var mT=")+blk("function cfg()","function cls()")+blk("function grade(p)","function gbadge"));
function gr(t,f){return grade(t/f)}
eq(gr(135,150),"A","135/150");eq(gr(135.4,150),"A","135.4/150");eq(gr(120,150),"B","120/150");
eq(gr(119.99,150),"C","119.99/150");eq(gr(134.99,150),"B","134.99/150");eq(gr(105,150),"C","105/150");
eq(gr(90,150),"D","90/150");eq(gr(75,150),"E","75/150");eq(gr(74.9,150),"F","74.9/150");
eq(gr(0.1+0.2+89.7,100),"A","float 90.0000000001");eq(gr(89.99999999999999,100),"A","float 89.99999999999999");eq(gr(89.9,100),"B","89.9/100");eq(gr(90,100),"A","90/100");
eq(gr(25*0.9,25),"A","25 scale");eq(gr(20*0.8,20),"B","20 scale");
rs.ms.gr=[.904,.804,.704,.604,.504];eq(gr(135.4,150),"A","old saved thresholds replaced");
rs.ms.gr=[.95,.8,.7,.6,.5];eq(gr(135.4,150),"B","custom thresholds kept");
print("monthly: checks "+n+" bad "+bad);
