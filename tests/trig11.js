/* 🧪 ជំពូកទី៣ ថ្នាក់ទី១១ (មេរៀន ៣១–៣៥) ៖ ចម្លើយនីមួយៗ ផ្ទៀងផ្ទាត់ជាលេខដោយ chk (គណនាឡើងវិញដោយឯករាជ្យ) ·
   លំដាប់មេរៀន (ID 33 រក្សា · 34/35 ថ្មី) · ≥៤ ទម្រង់ (kd) ក្នុងមួយកម្រិត · ក្រុមពាក្យគន្លឹះ — ដំណើរការ៖ jsc tests/trig11.js */
var H=function(){return P};var P=new Proxy(H,{get:function(t,k){if(k===Symbol.toPrimitive)return function(){return""};if(k==="length")return 0;return P},apply:function(){return P},construct:function(){return P}});
var window=this;var document=P,localStorage={getItem:function(){return null},setItem:function(){}},location={hash:"",search:""},navigator={},setInterval=function(){},setTimeout=function(){},addEventListener=function(){},console={log:print,error:print,warn:print};
eval(read("practice.js").replace("window.PX={","window.PX={check:check,parse:parse,ev:ev,"));
["pisa12.js","practice11.js"].forEach(function(f){eval(read(f))});
var X=window.PX,R=window.PRACT.GR[11],bad=0,n=0;
function B(m){bad++;if(bad<25)print(m)}
function ok(c,m){n++;if(!c)B(m)}
var ids=R.les[2][1].map(function(x){return x[0]});
ok(ids.join()==="31,32,34,33,35","LES order of chapter 3: "+ids.join());
ok(R.les[2][0]==="ជំពូកទី៣ អនុគមន៍ត្រីកោណមាត្រ","chapter title");
var names={};R.les[2][1].forEach(function(x){names[x[0]]=x[1]});
ok(names[34]==="អនុគមន៍ច្រាសនៃអនុគមន៍ត្រីកោណមាត្រ"&&names[35]==="សមីការ និងវិសមីការត្រីកោណមាត្រផ្សេងទៀត"&&names[33]==="សមីការ និងវិសមីការត្រីកោណមាត្រ","lesson titles");
[31,32,33,34,35].forEach(function(l){var G=R.G[l];ok(!!G,"G["+l+"]");[1,5,2,6,3,4].forEach(function(v){ok(typeof G[v]==="function","G["+l+"]["+v+"]")})});
[34,35].forEach(function(l){[1,5,2,6,3,4].forEach(function(v){var k={};for(var i=0;i<600;i++){var q=R.G[l][v]();k[q.kd||"?"]=1}var m=Object.keys(k).length;ok(m>=4&&!k["?"],"FORMS l"+l+" v"+v+" = "+m)})});
var checked={},N=400;
[33,34,35].forEach(function(l){[1,2,3,5,6,4].forEach(function(v){for(var i=0;i<N;i++){var q=R.G[l][v]();if(!q.chk)continue;checked[q.kd]=(checked[q.kd]||0)+1;
  var vals=q.a.map(function(a){try{var e=X.ev(X.parse(a.v));return e[0]}catch(e){return NaN}});
  var r=false;try{r=q.chk(vals)}catch(e){B("THROW chk "+q.kd+" "+e)}
  if(!r)B("WRONG l"+l+" v"+v+" "+q.kd+" :: "+q.q.slice(0,120)+" :: "+q.a.map(function(a){return a.v}).join(" | "));
  n++;
  q.a.forEach(function(a){if(!X.check(a.v,a.v,a.k).ok)B("CHK "+q.kd+" "+a.v)});
  ok(!/undefined|NaN|\[object/.test(q.q+q.s),"BADVAL "+q.kd);
  ok(JSON.stringify(q).indexOf("chk")<0,"chk leaked into JSON "+q.kd)}})});
var NK=Object.keys(checked).length;ok(NK>=40,"verified forms "+NK);
print("trig11: checks "+n+" forms "+NK+" bad "+bad);
