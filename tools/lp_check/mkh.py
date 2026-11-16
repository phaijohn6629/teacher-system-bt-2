import re,sys,json
R='/Users/phaijohn/Desktop/MTS/Teacher_System/'
idx=open(R+'index.html',encoding='utf-8').read(); js=open(R+'script.js',encoding='utf-8').read().split('\n')
i0=idx.index('<section id="p21"'); import re as _r
_n=_r.search(r'<section id="p\d+"',idx[i0+10:]); i1=i0+10+_n.start(); sec=idx[i0:i1]
a=next(i for i,l in enumerate(js) if (l.startswith('var LPMAP=') or l.startswith('var LPM='))); b=next(i for i,l in enumerate(js) if l.startswith('var FN=['))
lp='\n'.join(js[a:b])
mode=sys.argv[1] if len(sys.argv)>1 else 'batch'
stub=r'''function $(i){return document.getElementById(i)}function esc(s){return String(s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}function kn(n){return String(n).replace(/\d/g,function(d){return"០១២៣៤៥៦៧៨៩"[d]})}
var M=["មករា","កុម្ភៈ","មីនា","មេសា","ឧសភា","មិថុនា","កក្កដា","សីហា","កញ្ញា","តុលា","វិច្ឆិកា","ធ្នូ"];var data=[{id:"T1",name:"ផៃ ចន",rl:"សមាជិក"},{id:"T2",name:"ម៉េត បញ្ញារិទ្ធ",rl:"ប្រធាន"}];var who={id:"T1",name:"ផៃ ចន"};
function realPrint(h){document.body.innerHTML+="<div id=prt>"+h+"</div>";document.body.classList.add("pm");return}
function safeSrc(u){u=String(u==null?"":u);return/^data:image\/(png|jpe?g|gif|webp);base64,[A-Za-z0-9+\/=\s]+$/.test(u)||/^https:\/\/[^\s]+$/.test(u)?u:""}function lsSet(k,v){try{localStorage.setItem(k,v)}catch(e){}}var errs=[];window.onerror=function(m){errs.push(m)};
var EXAM=undefined;function lazy(){return Promise.resolve()}
'''
files=['khcal.js','fig.js','curriculum7.js','curriculum8.js','curriculum9.js','curriculum10.js','curriculum11.js','curriculum12.js','curriculum.js','lp7.js','lp8.js','lp9.js','lp10.js','lp11.js','lp12.js','lessonplans.js']
tags=''.join(f'<script src="file://{R}{f}"></script>' for f in files)
H=f'''<!DOCTYPE html><html lang="km"><head><meta charset="utf-8"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css"><script src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js"></script><link rel="stylesheet" href="file://{R}style.css"><link rel="stylesheet" href="file://{R}modern.css"><style>.lp-ctl{{display:none!important}}.lp-wrap{{display:block!important}}#p21{{display:block!important}}body.pm main{{display:none!important}}</style></head><body><main>{sec.replace('hidden>','>',1)}</main>{tags}<script>{stub}
{lp}
</script><script>{open(sys.argv[2]).read() if len(sys.argv)>2 else ""}</script></body></html>'''
open(sys.argv[3] if len(sys.argv)>3 else 'harness.html','w',encoding='utf-8').write(H)
