import sys,os,json,zipfile,base64,html,subprocess
sys.path.insert(0,'.')
import wmf,w2l
GR=sys.argv[1]; D=sys.argv[2]   # registry json, base dir of docx
reg=json.load(open(GR)); out={}
if os.environ.get('TOK'):
    _t=open(os.environ['TOK'],encoding='utf-8').read(); reg={h:v for h,v in reg.items() if h in _t}
items=[]
zc={}
for h,(doc,p) in reg.items():
    fn=None
    for r,_,fs in os.walk(D):
        if doc in fs: fn=os.path.join(r,doc);break
    if fn is None: items.append((h,None,None,None,{'nofile'}));continue
    z=zc.setdefault(fn,zipfile.ZipFile(fn)); b=z.read(p); ext=p.split('.')[-1].lower()
    if ext in('wmf',):
        try: t,fl=w2l.convert(b)
        except Exception as e: t,fl=None,{'err'}
        items.append((h,b,ext,t,fl))
    else: items.append((h,b,ext,None,{'png'}))
json.dump({h:{'t':t,'f':sorted(fl),'e':ext} for h,b,ext,t,fl in items},open(GR.replace('.json','_auto.json'),'w'),ensure_ascii=False)
print(len(items),'images;',sum(1 for i in items if i[3] and not i[4]),'clean auto;',sum(1 for i in items if i[4]),'flagged')
import re as _re
SEL=sys.argv[4] if len(sys.argv)>4 else ''
if SEL=='cx':
    items=[i for i in items if i[2]=='wmf' and (i[4] or (i[3] and _re.search(r'\\frac|\^|_|\\sqrt|begin',i[3])))]
    json.dump([i[0] for i in items],open(GR.replace('.json','_cx.json'),'w'))
if SEL=='chg':
    _c=set(json.load(open(os.environ['CHG'])));items=[i for i in items if i[0] in _c]
if SEL=='rows':
    items=[i for i in items if i[2]=='wmf' and i[3] and 'begin{array}' in i[3]]
if SEL=='cx2':
    items=[i for i in items if i[2]=='wmf' and ((set(i[4])-{'rows'}) or (i[3] and _re.search(r'sqrt|frac\{\\frac|begin.*frac|bigdelim|\\left|\\right|\\int|\\sum|\\lim|\\overline|\\vec|\\hat',i[3])))]
    json.dump([i[0] for i in items],open(GR.replace('.json','_cx2.json'),'w'))
# montage pages
N=int(sys.argv[3]) if len(sys.argv)>3 else 36
os.makedirs('rv',exist_ok=True)
pre="<!doctype html><meta charset=utf-8><link rel=stylesheet href='file:///private/tmp/claude-501/-Users-phaijohn-Desktop-MTS-Teacher-System/3e4a8074-42ac-492e-a420-b365f0bd1ee7/scratchpad/katex/katex.min.css'><script src='file:///private/tmp/claude-501/-Users-phaijohn-Desktop-MTS-Teacher-System/3e4a8074-42ac-492e-a420-b365f0bd1ee7/scratchpad/katex/katex.min.js'></script><style>body{margin:4px;font:11px sans-serif}.t{display:inline-block;vertical-align:top;border:1px solid #888;margin:2px;padding:3px;width:360px;height:170px;overflow:hidden;background:#fff}.t.f{background:#ffe9c7}b{color:#c00;font-size:12px}.k{margin-top:2px;border-top:1px dashed #aaa;padding-top:2px}</style>"
pages=[]
for pi in range(0,len(items),N):
    T=[]
    for n,(h,b,ext,t,fl) in enumerate(items[pi:pi+N]):
        if ext=='wmf':
            try: s,_=wmf.svg(b,scale=0.7)
            except Exception: s='ERR'
        elif b: s="<img src='data:image/%s;base64,%s' style='max-width:340px;max-height:50px'>"%(ext,base64.b64encode(b).decode())
        else: s=''
        s=s.replace("height='","height='",1)
        T.append(f"<div class='t{' f' if fl else ''}'><b>{pi+n}</b> {html.escape(','.join(sorted(fl)))}{s}<div class=k data-t=\"{html.escape(t or '',quote=True)}\"></div></div>")
    page=pre+''.join(T)+"<script>window.onload=function(){document.querySelectorAll('.k').forEach(function(e){var t=e.getAttribute('data-t');if(t)try{katex.render(t,e,{throwOnError:true,strict:'ignore'})}catch(x){e.textContent='KATEX ERR '+x.message.slice(0,60)}})}</script>"
    fn=f'rv/{os.path.basename(GR)[:-5]}{SEL}_{pi//N}'; open(fn+'.html','w').write(page); pages.append(fn)
for fn in pages:
    subprocess.run(['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome','--headless=new','--allow-file-access-from-files','--virtual-time-budget=4000','--window-size=1500,%d'%(185*((N+3)//4)+20),'--screenshot='+os.path.abspath(fn+'.png'),'file://'+os.path.abspath(fn+'.html')],capture_output=True)
print(pages)
