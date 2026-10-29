/* ប្រតិទិនខ្មែរ (ចន្ទគតិ) — គណនាតាមគំរូ "ព្រះច័ន្ទមធ្យម" + "ព្រះអាទិត្យមធ្យម"
   - ថ្ងៃចន្ទគតិ = ទិថីនៅម៉ោង ០៦:០០ ព្រឹក (ម៉ោងកម្ពុជា UTC+7)
   - ខែ ដាក់ឈ្មោះតាមសង្ក្រាន្តដែលធ្លាក់ក្នុងខែនោះ; ឆ្នាំអធិកមាស បន្ថែម «អាសាឍ ២»
   - ព.ស. ប្ដូរនៅថ្ងៃពិសាខបូជា (១៥កើត ខែពិសាខ); ឆ្នាំសត្វ/ស័ក ប្ដូរថ្ងៃ ១៤ មេសា
   ផ្ទៀងផ្ទាត់ជាមួយ៖ ភ្ជុំបិណ្ឌ ២០២៣–២០២៧, ពិសាខបូជា ២០២៤–២០២៦, អកអំបុក ២០២៣–២០២៦
   ចំណាំ៖ ជាការគណនាប្រហាក់ប្រហែល — អាចខុសមួយថ្ងៃ ពេលខ្លះ ដូចនេះ អ្នកប្រើអាចកែអត្ថបទដោយដៃបាន */
var KhCal=(function(){
  var SYN=29.530588861, EPOCH=2451550.09766, YR=365.2587565, TZ=7;
  var MESHA0=jdLocal(2026,4,14,6,0);   /* សង្ក្រាន្តចូលមេស (មធ្យម) ឆ្នាំ ២០២៦ */
  var MONTHS=["ចេត្រ","ពិសាខ","ជេស្ឋ","អាសាឍ","ស្រាពណ៍","ភទ្របទ","អស្សុជ","កត្តិក","មិគសិរ","បុស្ស","មាឃ","ផល្គុន"];
  var ANIMAL=["ជូត","ឆ្លូវ","ខាល","ថោះ","រោង","ម្សាញ់","មមី","មមែ","វក","រកា","ច","កុរ"];
  var SAK=["ឯកស័ក","ទោស័ក","ត្រីស័ក","ចត្វាស័ក","បញ្ចស័ក","ឆស័ក","សប្តស័ក","អដ្ឋស័ក","នព្វស័ក","សំរឹទ្ធិស័ក"];
  var WD=["អាទិត្យ","ច័ន្ទ","អង្គារ","ពុធ","ព្រហស្បតិ៍","សុក្រ","សៅរ៍"];
  function jdLocal(y,m,d,h,mi){return Date.UTC(y,m-1,d,h-TZ,mi||0)/86400000+2440587.5}
  function meanNew(k){var T=k/1236.85;return EPOCH+SYN*k+0.00015437*T*T}
  function kn(n){return String(n).replace(/\d/g,function(c){return"០១២៣៤៥៦៧៨៩"[c]})}
  function mod(a,b){return((a%b)+b)%b}
  /* ការចូលរាសីនីមួយៗ (r=0 មេស) ជា JD */
  function sank(n,r){return MESHA0+(n-2026)*YR+r*YR/12}
  /* បញ្ជីខែចន្ទគតិ (k) ជាមួយឈ្មោះ សម្រាប់ឆ្នាំសុរិយគតិ (បើកពីសង្ក្រាន្តមេស y ដល់ y+1) */
  var cache={};
  function yearMonths(y){
    if(cache[y])return cache[y];
    var s0=sank(y,0),s1=sank(y+1,0);
    var k0=Math.floor((s0-EPOCH)/SYN)-1,ms=[];
    for(var k=k0;meanNew(k)<s1+40;k++)ms.push({k:k,a:meanNew(k),b:meanNew(k+1)});
    /* ខែដែលមានសង្ក្រាន្តមេស = ចេត្រ */
    var ci=-1;ms.forEach(function(m,i){if(ci<0&&s0>=m.a&&s0<m.b)ci=i});
    var ni=-1;ms.forEach(function(m,i){if(ni<0&&s1>=m.a&&s1<m.b)ni=i});
    var list=ms.slice(ci,ni),n=list.length,res=[];
    for(var i=0;i<n;i++){
      var idx=i;
      if(n===13){ /* អធិកមាស៖ អាសាឍ ២ នៅលំដាប់ទី ៥ (index 4) */
        if(i===4)idx=3;else if(i>4)idx=i-1;
      }
      res.push({k:list[i].k,a:list[i].a,b:list[i].b,m:idx,leap:n===13&&i===4,la:n===13});
    }
    return cache[y]=res;
  }
  function beOf(g,y,lunarMonthIdx,half,day){ /* ព.ស. ប្ដូរនៅ ១៥កើត ពិសាខ */
    return y+543+((lunarMonthIdx>1||(lunarMonthIdx===1&&half===0&&day>=15)||g)?1:0);
  }
  function convert(y,mo,d){
    var jd=jdLocal(y,mo,d,6,0),sy=y;
    /* រកឆ្នាំសុរិយគតិ (ចាប់ពីសង្ក្រាន្តមេស) ដែលមានថ្ងៃនេះ */
    if(jd<sank(y,0))sy=y-1;
    var months=yearMonths(sy),m=null;
    for(var i=0;i<months.length;i++){if(jd>=months[i].a&&jd<months[i].b){m=months[i];break}}
    if(!m){ /* ក្នុងខែដែលលើសសង្ក្រាន្តមេស (ខែចេត្រ ដែលមិនទាន់បញ្ចប់) → ជំនួសដោយឆ្នាំបន្ទាប់ */
      var nm=yearMonths(sy+1);
      for(var j=0;j<nm.length;j++){if(jd>=nm[j].a&&jd<nm[j].b){m=nm[j];months=nm;sy=sy+1;break}}
      if(!m){
        var pm=yearMonths(sy-1);
        for(var q=0;q<pm.length;q++){if(jd>=pm[q].a&&jd<pm[q].b){m=pm[q];months=pm;sy=sy-1;break}}
      }
    }
    var ph=mod((jd-meanNew(m.k))/SYN,1),t=Math.floor(ph*30)+1;
    var half=t<=15?0:1,day=t<=15?t:t-15;
    /* ព.ស. */
    var visakLater=(m.m>1)||(m.m===1&&half===1)||(m.m===1&&half===0&&day>=15);
    var be=sy+543+(visakLater?1:0);
    /* ខែ ផល្គុន..មាឃ.. ក្រោយឆ្នាំសុរិយគតិ ប្ដូរ ក៏ដោយ ព.ស. គិតតាមខែ៖ ខែ ចេត្រ-ពិសាខ(មុន១៥កើត) ជាឆ្នាំមុន */
    if(m.m===0||(m.m===1&&half===0&&day<15))be=sy+543;
    /* ខែ ចេត្រ នៃ sy ស្ថិតក្នុងគ្រិស្តសករាជ sy (មេស) */
    var greg=new Date(Date.UTC(y,mo-1,d)),wd=greg.getUTCDay();
    /* ឆ្នាំសត្វ ប្ដូរថ្ងៃ ១៤ មេសា */
    var ay=(mo>4||(mo===4&&d>=14))?y:y-1;
    return{wd:wd,half:half,day:day,month:m.m,leap:m.leap,be:be,animal:mod(ay-2020,12)===0?"ជូត":ANIMAL[mod(ay-2020,12)],sak:SAK[mod(ay-2024+5,10)],ay:ay};
  }
  /* ឆ្នាំសត្វ៖ 2020 = ជូត; ស័ក៖ 2024 = ឆស័ក (index 5) */
  function fmt(y,mo,d,opt){
    var c=convert(y,mo,d),mn=MONTHS[c.month];
    var s=(opt&&opt.noWd?"":"ថ្ងៃ"+WD[c.wd]+" ")+kn(c.day)+(c.half?"រោច":"កើត")+" ខែ"+(c.leap?"ទុតិយ":"")+mn+" ឆ្នាំ"+c.animal+" "+c.sak+" ព.ស. "+kn(c.be);
    return s;
  }
  function gfmt(y,mo,d){
    var M=["មករា","កុម្ភៈ","មីនា","មេសា","ឧសភា","មិថុនា","កក្កដា","សីហា","កញ្ញា","តុលា","វិច្ឆិកា","ធ្នូ"];
    return"ត្រូវនឹងថ្ងៃទី "+kn(d)+" ខែ"+M[mo-1]+" ឆ្នាំ"+kn(y);
  }
  return{convert:convert,fmt:fmt,gfmt:gfmt,kn:kn,MONTHS:MONTHS,WD:WD};
})();
if(typeof module!=="undefined")module.exports=KhCal;
