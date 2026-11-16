import sys,json,pickle,re,os,html,subprocess
sys.path.insert(0,'.')
import wmf
A=json.load(open(sys.argv[1])); R=pickle.load(open(sys.argv[1]+'.raws','rb')); TOK=open(sys.argv[2],encoding='utf-8').read(); SEL=sys.argv[3]; N=int(sys.argv[4])
hs=[h for h in A if h in TOK]
def susp(v): return (not v['t']) or bool(set(v['f'])-{'rows'}) or re.search(r'_\{[A-Za-z]{3,}\}|\\frac|\\sqrt|begin|overline|\\overbrace|\\vec|\\left',v['t'] or '')
if SEL=='cx': hs=[h for h in hs if susp(A[h])]
if SEL.startswith('#'): hs=[h for h in hs if h in SEL[1:].split(',')]
print(len(hs),'items')
pre="<!doctype html><meta charset=utf-8><link rel=stylesheet href='file://%s/katex/katex.min.css'><script src='file://%s/katex/katex.min.js'></script><style>body{margin:4px;font:11px sans-serif}.t{display:inline-block;vertical-align:top;border:1px solid #888;margin:2px;padding:3px;width:360px;height:170px;overflow:hidden;background:#fff}.t.f{background:#ffe9c7}b{color:#c00;font-size:12px}.k{margin-top:2px;border-top:1px dashed #aaa;padding-top:2px}</style>"%(os.getcwd(),os.getcwd())
os.makedirs('rv',exist_ok=True);pages=[]
for pi in range(0,len(hs),N):
    T=[]
    for n,h in enumerate(hs[pi:pi+N]):
        v=A[h]
        try: s,_=wmf.svg(R[h],scale=0.7)
        except Exception: s='ERR'
        T.append(f"<div class='t{' f' if susp(v) else ''}'><b>{pi+n}</b> {html.escape(','.join(v['f']))} <small>{h}</small>{s}<div class=k data-t=\"{html.escape(v['t'] or '',quote=True)}\"></div></div>")
    page=pre+''.join(T)+"<script>window.onload=function(){document.querySelectorAll('.k').forEach(function(e){var t=e.getAttribute('data-t');if(t)try{katex.render(t,e,{throwOnError:true,strict:'ignore'})}catch(x){e.textContent='KATEX ERR'}})}</script>"
    fn=f'rv/doc_{re.sub(r"[^A-Za-z0-9_]","",SEL)}_{pi//N}';open(fn+'.html','w').write(page);pages.append(fn)
for fn in pages:
    subprocess.run(['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome','--headless=new','--allow-file-access-from-files','--virtual-time-budget=4000','--window-size=1500,%d'%(185*((N+3)//4)+20),'--screenshot='+os.path.abspath(fn+'.png'),'file://'+os.path.abspath(fn+'.html')],capture_output=True)
print(pages)
