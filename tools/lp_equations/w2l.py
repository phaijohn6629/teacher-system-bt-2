import sys,re
sys.path.insert(0,'.')
import wmf
LX={'α':'\\alpha ','β':'\\beta ','χ':'\\chi ','δ':'\\delta ','ε':'\\varepsilon ','φ':'\\varphi ','γ':'\\gamma ','η':'\\eta ','ι':'\\iota ','ϕ':'\\phi ','κ':'\\kappa ','λ':'\\lambda ','μ':'\\mu ','ν':'\\nu ','ο':'o','π':'\\pi ','θ':'\\theta ','ρ':'\\rho ','σ':'\\sigma ','τ':'\\tau ','υ':'\\upsilon ','ϖ':'\\varpi ','ω':'\\omega ','ξ':'\\xi ','ψ':'\\psi ','ζ':'\\zeta ',
'Δ':'\\Delta ','Φ':'\\Phi ','Γ':'\\Gamma ','Θ':'\\Theta ','Λ':'\\Lambda ','Π':'\\Pi ','Σ':'\\Sigma ','Ω':'\\Omega ','Ψ':'\\Psi ','±':'\\pm ','×':'\\times ','÷':'\\div ','≥':'\\ge ','≤':'\\le ','≠':'\\ne ','≈':'\\approx ','∞':'\\infty ','∂':'\\partial ','√':'\\surd ','∈':'\\in ','∉':'\\notin ','⊂':'\\subset ','⊆':'\\subseteq ','⊃':'\\supset ','∩':'\\cap ','∪':'\\cup ','→':'\\to ','←':'\\leftarrow ','↔':'\\leftrightarrow ','⇒':'\\Rightarrow ','⇐':'\\Leftarrow ','⇔':'\\Leftrightarrow ','•':'\\bullet ','°':'^\\circ ','∫':'\\int ','⋅':'\\cdot ','∅':'\\varnothing ','≡':'\\equiv ','−':'-','′':"'",'∧':'\\wedge ','∨':'\\vee ','¬':'\\neg ','∀':'\\forall ','∃':'\\exists ','∠':'\\angle ','⊥':'\\perp ','∼':'\\sim ','≅':'\\cong ','…':'\\ldots ','∇':'\\nabla ','↑':'\\uparrow ','↓':'\\downarrow ','‖':'\\|','|':'|','{':'\\{ ','}':'\\} ','%':'\\%','#':'\\#','&':'\\&','_':'\\_','$':'\\$','~':'\\sim ','^':'\\wedge ','<':'<','>':'>','\\':'\\backslash ','"':"''"}
BIG=set('⎛⎜⎝⎞⎟⎠⎧⎨⎩⎪〈〉⏐')
RAD=[]
def glyphs(d):
    del RAD[:]
    G=[];L=[];flags=set()
    for it in d['items']:
        if it[0]=='t':
            _,x,y,s,f,ta,dx=it;sz=f.get('h',12);txt=wmf.dec(s,f);nm=(f.get('name') or '').lower()
            base=y if ta&24==24 else y+sz*0.8
            xs=[x]
            for i in range(len(s)-1): xs.append(xs[-1]+(dx[i] if dx and len(dx)==len(s) else sz*0.5))
            for i,ch in enumerate(txt):
                if ch==' ':continue
                if ord(ch)>127 and ch not in LX and ch not in '⎡⎛⎤⎞⎢⎣⎜⎝⎥⎦⎟⎠ℝℕ↦': flags.add('uni:'+ch)
                sym='symbol' in nm or 'extra' in nm
                G.append(dict(c=ch,x=xs[i],w=sz*0.5,b=base,s=sz,it=f.get('it',False),sym=sym,nm=nm,acc=('extra' in nm and ch in 'rR'),wd=(dx[i] if dx and len(dx)==len(s) else sz*0.5)))
        elif it[0]=='l' and it[2]==it[4]: L.append((min(it[1],it[3]),max(it[1],it[3]),it[2]))
        elif it[0]=='pl':
            p=it[1]
            for a,b_ in zip(p,p[1:]):
                if a[1]==b_[1]:L.append((min(a[0],b_[0]),max(a[0],b_[0]),a[1]))
        elif it[0]=='r':
            if abs(it[4]-it[2])<=70: L.append((min(it[1],it[3]),max(it[1],it[3]),(it[2]+it[4])/2))
            else: flags.add('shape')
        elif it[0]=='pg' and 7<=len(it[1])<=24 and len({p[1] for p in it[1]})>=3:
            pts=it[1];top=min(p[1] for p in pts);bot=max(p[1] for p in pts);xl=min(p[0] for p in pts);xr=max(p[0] for p in pts)
            if xr-xl>(bot-top)*0.5 and sum(1 for p in pts if abs(p[1]-top)<=25)>=2: RAD.append((xl,xr,top,bot))
            else: flags.add('shape')
        elif it[0] in('pg','e'):flags.add('shape')
    for a in [g for g in G if g.get('acc')]:
        cx=a['x']+a['wd']/2
        cand=[g for g in G if not g.get('acc') and g['c'].isalpha() and g['b']>a['b'] and g['b']-a['b']<g['s']*1.8]
        if cand:
            m=min(cand,key=lambda g:abs(g['x']+g['w']/2-cx))
            m['vec']=m.get('vec',0)+1
        G.remove(a)
    GR={'(':'⎛⎜⎝',')':'⎞⎟⎠','[':'⎡⎢⎣',']':'⎤⎥⎦'}
    for tgt,chs in GR.items():
        pcs=[g for g in G if g['c'] in chs]
        if pcs:
            for g in pcs: G.remove(g)
            others=[g['s'] for g in G if g['c'] not in '⎛⎜⎝⎞⎟⎠⎡⎢⎣⎤⎥⎦']
            sz=max(set(others),key=others.count) if others else pcs[0]['s']
            xs=sorted(set(round(g['x']/60) for g in pcs))
            # one glyph per distinct x column
            cols={}
            for g in pcs: cols.setdefault(round(g['x']/60),[]).append(g)
            for k,v in cols.items(): G.append(dict(c=tgt,x=min(g['x'] for g in v),w=sz*0.4,b=sum(g['b'] for g in v)/len(v)+ (sz*0.0),s=sz,it=False,sym=False,nm=''))
    L=[l for l in L if not any(xl-5<=l[0] and l[1]<=xr+5 and abs(l[2]-top)<=30 for (xl,xr,top,bot) in RAD)]
    return G,L,flags
def tex(g):
    r=tex0(g)
    return '\\vec{'+r.strip()+'} ' if g.get('vec') else r
def tex0(g):
    c=g['c']
    if c in '⎡⎛': return '('  if c=='⎛' else '['
    if c in '⎤⎞': return ')' if c=='⎞' else ']'
    if c in '⎢⎣⎜⎝⎥⎦⎟⎠⏐': return ''
    if c=='ℝ': return '\\mathbb{R} '
    if c=='ℕ': return '\\mathbb{N} '
    if c=='↦': return '\\mapsto '
    if c in LX and (g['sym'] or ord(c)>127 or c in '%#&_${}~^\\"|<>'): return LX[c]
    if c.isalpha() and ord(c)<128: return c if g['it'] or True else c
    return c if c not in LX else LX[c]
def seq(G,L,flags,depth=0,gmx=None):
    if not G:return ''
    if depth>6: flags.add('deep');return ''.join(tex(g) for g in sorted(G,key=lambda g:g['x']))
    # radical
    from collections import Counter as _C
    _c=_C(g['s'] for g in G); _al=[g['s'] for g in G if g['c'].isalnum()]; mx=gmx or (max(_al) if _al else max(sz for sz,n in _c.items() if n==max(_c.values())))
    # rows (interval clustering: glyph + bar extents) before fractions
    if depth==0 or depth>=0:
        iv=[(g['b']-g['s']*0.75,g['b']+g['s']*0.25) for g in G]+[(y-20,y+20) for (x0,x1,y) in L]
        for (x0,x1,y) in L:
            up_=[g for g in G if g['b']<y and y-g['b']<g['s']*1.7 and x0-2<=g['x']+g['w']/2<=x1+2]
            dn_=[g for g in G if g['b']-g['s']*0.6>y and g['b']-y<g['s']*1.9 and x0-2<=g['x']+g['w']/2<=x1+2]
            if up_ and dn_: iv.append((min(g['b']-g['s']*0.75 for g in up_),max(g['b']+g['s']*0.25 for g in dn_)))
        iv.sort();cl=[[iv[0][0],iv[0][1]]]
        for a,b_ in iv[1:]:
            if a-cl[-1][1]<mx*0.3: cl[-1][1]=max(cl[-1][1],b_)
            else: cl.append([a,b_])
        if len(cl)>1:
            rows=[[g for g in G if cl[k][0]-1<=g['b']-g['s']*0.2<=cl[k][1]+1] for k in range(len(cl))]
            rows=[r for r in rows if r]
            big_r=[r for r in rows if max(g['s'] for g in r)>=mx*0.85]
            if big_r and len(big_r)<len(rows):
                for r in [r for r in rows if r not in big_r]:
                    mb_=sum(g['b'] for g in r)/len(r);tgt=min(big_r,key=lambda q:abs(sum(g['b'] for g in q)/len(q)-mb_));tgt.extend(r)
                rows=big_r
            if len(rows)>1 and sum(len(r) for r in rows)==len(G):
                flags.add('rows')
                return '\\begin{array}{l}'+'\\\\ '.join(seq(r,[l for l in L if any(cl[k][0]-30<=l[2]<=cl[k][1]+30 for k in [rows.index(r)])],flags,depth+1,mx) for r in rows)+'\\end{array}'
    # fraction: a horizontal bar with glyphs above and below
    cand=[]
    for (x0,x1,y) in L:
        up=[g for g in G if g['b']<y and x0-2<=g['x']+g['w']/2<=x1+2 and y-g['b']<g['s']*3.6]
        dn=[g for g in G if g['b']-g['s']*0.6>y and g['b']-y<g['s']*3.6 and x0-2<=g['x']+g['w']/2<=x1+2]
        if up and dn:cand.append((x1-x0,x0,x1,y,up,dn))
    if cand:
        cand.sort(key=lambda t:-t[0]);w,x0,x1,y,up,dn=cand[0]
        used=set(map(id,up+dn))
        left=[g for g in G if id(g) not in used and g['x']+g['w']/2<x0-2]
        right=[g for g in G if id(g) not in used and g['x']+g['w']/2>x1+2]
        rest=[g for g in G if id(g) not in used and g not in left and g not in right]
        if rest:flags.add('midglyph')
        Lr=[l for l in L if l!=(x0,x1,y)]
        return seq(left,Lr,flags,depth+1,mx)+'\\frac{'+seq(up,Lr,flags,depth+1,mx)+'}{'+seq(dn,Lr,flags,depth+1,mx)+'}'+seq(right,Lr,flags,depth+1,mx)
    # overline: a bar with glyphs directly below it and none above
    for (x0,x1,y) in sorted(L,key=lambda l:l[0]):
        ins=[g for g in G if x0-3<=g['x']+g['w']/2<=x1+3 and y<g['b']-g['s']*0.45 and g['b']-y<g['s']*1.5]
        above=[g for g in G if x0-3<=g['x']+g['w']/2<=x1+3 and g['b']<y]
        if ins and not above:
            ins.sort(key=lambda g:g['x'])
            if ins[0]['c'] in '([' and sum(1 for g in ins if g['c'] in ')]')<sum(1 for g in ins if g['c'] in '(['): ins=ins[1:]
            if ins and ins[-1]['c'] in ')]' and sum(1 for g in ins if g['c'] in '([')<sum(1 for g in ins if g['c'] in ')]'): ins=ins[:-1]
            if not ins: continue
            left=[g for g in G if g not in ins and g['x']+g['w']/2<x0-3]
            right=[g for g in G if g not in ins and g not in left]
            Lr=[l for l in L if l!=(x0,x1,y)]
            return seq(left,Lr,flags,depth+1,mx)+'\\overline{'+seq(ins,Lr,flags,depth+1,mx)+'}'+seq(right,Lr,flags,depth+1,mx)
    # radical (polygon-drawn √)
    for (xl,xr,top,bot) in sorted(RAD):
        hh=bot-top
        ins=[g for g in G if g['x']>=xl+hh*0.30 and g['x']+g['w']/2<=xr+2 and top-g['s']*0.3<=g['b']<=bot+g['s']*0.4]
        if not ins: continue
        left=[g for g in G if g['x']+g['w']/2<xl+hh*0.30 and g not in ins]
        right=[g for g in G if g not in ins and g not in left]
        RAD.remove((xl,xr,top,bot))
        Lr=[l for l in L if not (abs(l[2]-top)<30 and l[0]>=xl-5 and l[1]<=xr+5)]
        return seq(left,Lr,flags,depth+1,mx)+'\\sqrt{'+seq(ins,Lr,flags,depth+1,mx)+'}'+seq(right,Lr,flags,depth+1,mx)
    # radical sign √ followed by overline
    for g in sorted(G,key=lambda g:g['x']):
        if g['c']=='√':
            ov=[(x0,x1,y) for (x0,x1,y) in L if y<g['b']-g['s']*0.5 and x0<=g['x']+g['w']+g['s']*0.6 and x1>g['x']+g['w']]
            if ov:
                x0,x1,y=ov[0];ins=[h for h in G if h is not g and h['x']>=g['x']+g['w']*0.5 and h['x']+h['w']/2<=x1+2 and h['b']<=g['b']+g['s']*0.3 and h['b']>y]
                left=[h for h in G if h['x']<g['x'] and h not in ins]
                right=[h for h in G if h not in ins and h is not g and h not in left]
                Lr=[l for l in L if l!=(x0,x1,y)]
                return seq(left,Lr,flags,depth+1,mx)+'\\sqrt{'+seq(ins,Lr,flags,depth+1,mx)+'}'+seq(right,Lr,flags,depth+1,mx)
    # rows (multi-line)
    big0=sorted([g for g in G if g['s']>=mx*0.85] or G,key=lambda g:g['b'])
    rb=[big0[0]['b']]
    for g in big0[1:]:
        if g['b']-rb[-1]>mx*0.9: rb.append(g['b'])
    if len(rb)>1 and depth<4:
        rows=[[] for _ in rb]
        for g in G:
            j=min(range(len(rb)),key=lambda k:abs(rb[k]-g['b']));rows[j].append(g)
        flags.add('rows')
        return '\\begin{array}{l}'+'\\\\ '.join(seq(r,L,flags,depth+1,mx) for r in rows)+'\\end{array}'
    # sequence with sup/sub
    big=[g for g in G if g['s']>=mx*0.85] or G
    from collections import Counter
    mb=Counter(round(g['b']/ (mx*0.15)) for g in big).most_common(1)[0][0]*(mx*0.15)
    out='';state=0;srt=sorted(G,key=lambda g:g['x'])
    for g in srt:
        small=g['s']<mx*0.85
        up=small and g['b']<mb-g['s']*0.25
        dn=small and g['b']>mb+g['s']*0.1
        st=1 if up else (-1 if dn else 0)
        if g['c'] in BIG and g['c'] not in '⎡⎛⎤⎞⎢⎣⎜⎝⎥⎦⎟⎠':flags.add('bigdelim')
        if st!=state:
            if state!=0:out+='}'
            if st==1:out+='^{'
            elif st==-1:out+='_{'
            state=st
        t=tex(g)
        out+=t
    if state!=0:out+='}'
    return out
def convert(b):
    d=wmf.parse(b);G,L,flags=glyphs(d)
    if not G:return None,{'empty'}
    t=seq(G,L,flags)
    t=re.sub(r'\[cite_\{?s\}?tart\]','',t); t=re.sub(r'\s+',' ',t).strip()
    t=re.sub(r'\.{3,}',r'\\ldots ',t)
    return t,flags
if __name__=='__main__':
    import os
    d='wx/word/media'
    for f in sorted(os.listdir(d),key=lambda x:int(''.join(c for c in x if c.isdigit())))[:30]:
        if f.endswith('wmf'):print(f,convert(open(f'{d}/{f}','rb').read()))
