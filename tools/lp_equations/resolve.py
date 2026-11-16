import sys,re,json,os,zipfile,subprocess,base64,tempfile
# usage: resolve.py in.js out.js "sqA_auto.json,..." "sqA.json,..." docxdir [manual.json]
src=open(sys.argv[1],encoding='utf-8').read(); out=sys.argv[2]
A={}
for f in sys.argv[3].split(','): A.update(json.load(open(f)))
REG={}
for f in sys.argv[4].split(','): REG.update(json.load(open(f)))
D=sys.argv[5]
M=json.load(open(sys.argv[6])) if len(sys.argv)>6 else {}
stat={'tex':0,'sq':0,'img':0}; IMG={}; zc={}
def find(doc):
    for r,_,fs in os.walk(D):
        if doc in fs: return os.path.join(r,doc)
def imgdata(h):
    if h in IMG: return IMG[h]
    doc,p=REG[h]; fn=find(doc)
    if not fn: return None
    z=zc.setdefault(fn,zipfile.ZipFile(fn)); b=z.read(p)
    t=tempfile.mkdtemp(dir='/private/tmp/claude-501/-Users-phaijohn-Desktop-MTS-Teacher-System/3e4a8074-42ac-492e-a420-b365f0bd1ee7/scratchpad'); a=os.path.join(t,'a.png'); o=os.path.join(t,'o.png')
    open(a,'wb').write(b)
    subprocess.run(['sips','-Z','330',a,'--out',o],capture_output=True)
    d=open(o if os.path.exists(o) else a,'rb').read(); mt='png'
    j=os.path.join(t,'o.jpg')
    subprocess.run(['sips','-s','format','jpeg','-s','formatOptions','70',o if os.path.exists(o) else a,'--out',j],capture_output=True)
    if os.path.exists(j) and len(open(j,'rb').read())<len(d)*0.8: d=open(j,'rb').read(); mt='jpeg'
    IMG[h]='data:image/%s;base64,'%mt+base64.b64encode(d).decode(); return IMG[h]
def lat(h):
    if h in M: return M[h]
    v=A.get(h)
    if not v: return None
    if v['e']=='wmf' and v['t'] and not (set(v['f'])-{'rows','bigdelim'}): return v['t']
    return None
def js(s): return s.replace('\\','\\\\').replace('"','\\"')
def sub_math(m):
    body=m.group(1)
    only=re.fullmatch(r'\s*\\\\sq\{([0-9a-f]{10})\}\s*',body)
    def one(h):
        l=lat(h)
        if l is None: stat['sq']+=1; return '\\\\square'
        stat['tex']+=1; return ' '+js(l)+' '
    if only:
        h=only.group(1); v=A.get(h) or {}
        if v.get('e')=='png' and h not in M:
            if imgdata(h): stat['img']+=1; return '⟦img:%s⟧'%h
        l=lat(h)
        if l is None: stat['sq']+=1; return '$\\\\square$'
        stat['tex']+=1; return '$'+js(l)+'$'
    return '$'+re.sub(r'\\\\sq\{([0-9a-f]{10})\}',lambda mm:one(mm.group(1)),body)+'$'
res=re.sub(r'\$([^$]*\\\\sq\{[0-9a-f]{10}\}[^$]*)\$',sub_math,src)
res=re.sub(r'\\\\frac\{\\\\\$([0-9]+)\}\{\\\\\$([0-9]+)\}',r'\\\\frac{\1}{\2}',res)
res=re.sub(r'(\\\\(?:Rightarrow|Leftrightarrow|Longrightarrow))(?=[A-Za-z])',r'\1 ',res)
res=res.replace('\\\\text{ \\\\$}','\\\\text{ USD}')

KNOWN=set("times cdot div pm mp le leq ge geq ne neq approx equiv sim cong in notin subset subseteq supset cap cup angle perp parallel infty pi alpha beta gamma delta theta lambda mu sigma omega Delta Sigma Pi Omega Rightarrow Leftrightarrow rightarrow leftrightarrow Longrightarrow to sqrt frac dfrac text mathrm mathbf overline widehat hat vec ldots cdots circ sin cos tan cot sec csc log ln lim max min quad qquad left right begin end mid int sum prod partial nabla forall exists neg wedge vee emptyset varnothing triangle square boxed phantom cases array displaystyle operatorname bar prime ell varphi phi varepsilon epsilon rho tau chi psi eta zeta kappa nu xi iota upsilon bullet lfloor rfloor lceil rceil langle rangle binom tfrac stackrel overrightarrow underline not backslash lbrace rbrace Gamma Theta Lambda Phi Psi nmid ncong dots vdots ddots cdotp textbf textit mathbb Z N R Q C bigcirc setminus oplus otimes uparrow downarrow Leftarrow leftarrow mapsto iff implies land lor nless ngtr lt gt ll gg propto because therefore nearrow".split())
PRE=sorted("times cdot div pm mp leq geq neq le ge ne approx equiv sim cong notin in subseteq subset supset cap cup angle perp parallel infty pi alpha beta gamma delta theta lambda mu sigma omega Rightarrow Leftrightarrow rightarrow leftrightarrow to circ cdots ldots".split(),key=len,reverse=True)
def fixcmd(m):
    w=m.group(1)
    if w in KNOWN: return m.group(0)
    for p in PRE:
        if w.startswith(p) and len(w)>len(p): return '\\\\'+p+' '+w[len(p):]
    return m.group(0)
res=re.sub(r'\\\\([a-zA-Z]+)',fixcmd,res)
left=len(re.findall(r'\\\\sq\{',res))
if left: print('LEFTOVER tokens!',left)
if IMG:
    res+='\nwindow.LP_IMG = window.LP_IMG || {};\nObject.assign(window.LP_IMG, '+json.dumps(IMG)+');\n'
open(out,'w',encoding='utf-8').write(res); print(stat,len(IMG),'images')
