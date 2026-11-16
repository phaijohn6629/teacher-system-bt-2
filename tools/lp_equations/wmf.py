import struct,html
SYM={0x61:'α',0x62:'β',0x63:'χ',0x64:'δ',0x65:'ε',0x66:'φ',0x67:'γ',0x68:'η',0x69:'ι',0x6A:'ϕ',0x6B:'κ',0x6C:'λ',0x6D:'μ',0x6E:'ν',0x6F:'ο',0x70:'π',0x71:'θ',0x72:'ρ',0x73:'σ',0x74:'τ',0x75:'υ',0x76:'ϖ',0x77:'ω',0x78:'ξ',0x79:'ψ',0x7A:'ζ',
0x44:'Δ',0x46:'Φ',0x47:'Γ',0x51:'Θ',0x4C:'Λ',0x50:'Π',0x53:'Σ',0x57:'Ω',0x59:'Ψ',0xB1:'±',0xB4:'×',0xB8:'÷',0xB3:'≥',0xA3:'≤',0xB9:'≠',0xBB:'≈',0xA5:'∞',0xB6:'∂',0xD6:'√',0xD1:'∇',0xCE:'∈',0xCF:'∉',0xCC:'⊂',0xCD:'⊆',0xC9:'⊃',0xC7:'∩',0xC8:'∪',0xAE:'→',0xAC:'←',0xAB:'↔',0xDE:'⇒',0xDC:'⇐',0xDB:'⇔',0xB7:'•',0xB0:'°',0xE5:'Σ',0xF2:'∫',0xD7:'⋅',0xC6:'∅',0xBA:'≡',0x2D:'−',0xA2:'′',0xD9:'∧',0xDA:'∨',0xD8:'¬',0x22:'∀',0x24:'∃',0xD0:'∠',0x5E:'⊥',0x7E:'∼',0x40:'≅',0xE6:'⎛',0xE7:'⎜',0xE8:'⎝',0xF6:'⎞',0xF7:'⎟',0xF8:'⎠',0xEC:'⎧',0xED:'⎨',0xEE:'⎩',0xEF:'⎪',0xBD:'⏐',0xE1:'〈',0xF1:'〉',0xAD:'↑',0xAF:'↓',0xBC:'…',0xE9:'⎡',0xEA:'⎢',0xEB:'⎣',0xF9:'⎤',0xFA:'⎥',0xFB:'⎦',0xA1:'ℝ'}
def parse(b):
    off=0;bbox=None;unit=1440
    if struct.unpack('<I',b[:4])[0]==0x9AC6CDD7:
        l,t,r,bt,unit=struct.unpack('<hhhhH',b[6:16]);bbox=(l,t,r,bt);off=22
    off+=18  # standard header
    objs={};cur={'font':None,'pen':None,'brush':None};sel=[]
    org=[0,0];ext=[1,1];ta=0;col='#000'
    items=[];x0=y0=0;pos=[0,0];n=0
    def freeidx():
        i=0
        while i in objs:i+=1
        return i
    while off+6<=len(b):
        size,fn=struct.unpack('<IH',b[off:off+6]);p=b[off+6:off+size*2]
        if size==0:break
        if fn==0x020B: org=[struct.unpack('<hh',p[:4])[1],struct.unpack('<hh',p[:4])[0]]
        elif fn==0x020C: ext=[struct.unpack('<hh',p[:4])[1],struct.unpack('<hh',p[:4])[0]]
        elif fn==0x02FB:
            h,w,esc,ori,wt=struct.unpack('<hhhhh',p[:10]);it=p[10];name=p[18:].split(b'\0')[0].decode('latin1')
            objs[freeidx()]=('font',dict(h=abs(h) or 12,it=bool(it),wt=wt,name=name,esc=esc))
        elif fn==0x02FA:
            st,w,_,c=struct.unpack('<Hhh4s',p[:10]);objs[freeidx()]=('pen',dict(w=max(1,w),st=st))
        elif fn==0x02FC:
            objs[freeidx()]=('brush',{})
        elif fn==0x012D:
            i=struct.unpack('<H',p[:2])[0];o=objs.get(i)
            if o:cur[o[0]]=o[1]
        elif fn==0x01F0:
            i=struct.unpack('<H',p[:2])[0];objs.pop(i,None)
        elif fn==0x012E: ta=struct.unpack('<H',p[:2])[0]
        elif fn==0x0214: pos=[struct.unpack('<hh',p[:4])[1],struct.unpack('<hh',p[:4])[0]]
        elif fn==0x0213:
            y,x=struct.unpack('<hh',p[:4]);items.append(('l',pos[0],pos[1],x,y,(cur['pen'] or {}).get('w',1)));pos=[x,y]
        elif fn==0x0325:
            c=struct.unpack('<h',p[:2])[0];pts=struct.unpack('<%dh'%(2*c),p[2:2+4*c])
            items.append(('pl',[(pts[2*i],pts[2*i+1]) for i in range(c)],(cur['pen'] or {}).get('w',1)))
        elif fn in(0x0324,):
            c=struct.unpack('<h',p[:2])[0];pts=struct.unpack('<%dh'%(2*c),p[2:2+4*c])
            items.append(('pg',[(pts[2*i],pts[2*i+1]) for i in range(c)]))
        elif fn==0x0538:
            npoly=struct.unpack('<h',p[:2])[0];cnt=struct.unpack('<%dh'%npoly,p[2:2+2*npoly]);q=2+2*npoly
            for c in cnt:
                pts=struct.unpack('<%dh'%(2*c),p[q:q+4*c]);q+=4*c
                items.append(('pg',[(pts[2*i],pts[2*i+1]) for i in range(c)]))
        elif fn==0x041B:
            bt,r,t,l=struct.unpack('<hhhh',p[:8]);items.append(('r',l,t,r,bt))
        elif fn==0x0418:
            bt,r,t,l=struct.unpack('<hhhh',p[:8]);items.append(('e',l,t,r,bt))
        elif fn==0x0521:
            ln=struct.unpack('<h',p[:2])[0];s=p[2:2+ln];q=2+((ln+1)//2)*2;y,x=struct.unpack('<hh',p[q:q+4])
            if ta&1:x,y=pos
            items.append(('t',x,y,s,dict(cur['font'] or {}),ta,[]))
        elif fn==0x0A32:
            y,x,ln,opt=struct.unpack('<hhhh',p[:8]);q=8+(8 if opt&6 else 0);s=p[q:q+ln]
            dq=q+((ln+1)//2)*2;dx=[]
            if len(p)>=dq+2*ln:dx=list(struct.unpack('<%dh'%ln,p[dq:dq+2*ln]))
            if ta&1:x,y=pos
            items.append(('t',x,y,s,dict(cur['font'] or {}),ta,dx))
            if ta&1 and dx:pos=[x+sum(dx),y]
        off+=size*2
    return dict(items=items,org=org,ext=ext,bbox=bbox)
def dec(s,font):
    nm=(font.get('name') or '').lower()
    if 'symbol' in nm:
        return ''.join(SYM.get(c,chr(c)) for c in s)
    if 'extra' in nm:
        return ''.join({0xA1:'ℝ',0xA5:'ℕ',0x61:'↦'}.get(c,chr(c)) for c in s)
    return s.decode('latin1')
def svg(b,scale=1.0):
    d=parse(b);ox,oy=d['org'];w,h=d['ext']
    if not w or not h or w<=0 or h<=0:
        xs=[];ys=[]
        for it in d['items']:
            if it[0]=='t':xs.append(it[1]);ys.append(it[2])
        w=(max(xs)-min(xs)+200) if xs else 100;h=(max(ys)-min(ys)+200) if ys else 100
    o=[]
    for it in d['items']:
        k=it[0]
        if k=='t':
            _,x,y,s,f,ta,dx=it;sz=f.get('h',12);txt=html.escape(dec(s,f))
            xs_=None
            if dx and len(dx)==len(s):
                xs_=[x];[xs_.append(xs_[-1]+d_) for d_ in dx[:-1]]
            fam=f.get('name') or 'Times New Roman'
            fam2="'Times New Roman',serif" if 'symbol' in fam.lower() else "'%s',serif"%fam
            yy=y if ta&24==24 else y+sz*0.8
            o.append(f"<text x='{' '.join(map(str,xs_)) if xs_ else x}' y='{yy}' font-size='{sz}' font-family=\"{fam2}\" font-style='{'italic' if f.get('it') else 'normal'}' font-weight='{700 if f.get('wt',400)>=600 else 400}' xml:space='preserve'>{txt}</text>")
        elif k=='l':o.append(f"<line x1='{it[1]}' y1='{it[2]}' x2='{it[3]}' y2='{it[4]}' stroke='#000' stroke-width='{max(it[5],8)}'/>")
        elif k=='pl':o.append("<polyline fill='none' stroke='#000' stroke-width='%d' points='%s'/>"%(max(it[2],8),' '.join('%d,%d'%p for p in it[1])))
        elif k=='pg':o.append("<polygon fill='#000' points='%s'/>"%' '.join('%d,%d'%p for p in it[1]))
        elif k=='r':o.append(f"<rect x='{it[1]}' y='{it[2]}' width='{it[3]-it[1]}' height='{it[4]-it[2]}' fill='none' stroke='#000' stroke-width='8'/>")
        elif k=='e':o.append(f"<ellipse cx='{(it[1]+it[3])/2}' cy='{(it[2]+it[4])/2}' rx='{abs(it[3]-it[1])/2}' ry='{abs(it[4]-it[2])/2}' fill='none' stroke='#000' stroke-width='8'/>")
    return f"<svg xmlns='http://www.w3.org/2000/svg' viewBox='{ox} {oy} {w} {h}' width='{min(300,max(24,w*scale/8))}' height='{min(120,max(14,h*scale/8))}'>"+''.join(o)+"</svg>",d
