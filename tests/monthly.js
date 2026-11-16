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
print("monthly: checks "+n+" bad "+bad);
