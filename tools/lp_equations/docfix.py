import sys,json,glob,os,re,hashlib
sys.path.insert(0,'.')
import docole,w2l
# usage: docfix.py blocks.json out_auto.json doc1.doc doc2.doc ...
bj,outA=sys.argv[1],sys.argv[2]; docs=sys.argv[3:]
B=json.load(open(bj)); A=json.load(open(outA)) if os.path.exists(outA) else {}
raws={}
for dp in docs:
    base=os.path.basename(dp)[:-4]
    idx=[i for i,d in enumerate(B) if os.path.basename(d['f'])[:-5]==base]
    if not idx: print('no blocks for',base); continue
    L=docole.wmflist(dp); toks=[]
    for r in L:
        if not r: toks.append(None); continue
        typ,raw=r; h=hashlib.sha1(raw).hexdigest()[:10]
        try: t,fl=w2l.convert(raw)
        except Exception: t,fl=None,{'err'}
        A[h]={'t':t,'f':sorted(fl),'e':'wmf'}; raws[h]=raw; toks.append(h)
    # substitute in order
    cnt=[0]
    def sub(m):
        i=cnt[0];cnt[0]+=1
        return '$\\sq{%s}$'%toks[i] if i<len(toks) and toks[i] else '$\\square$'
    def walk(x):
        if isinstance(x,str): return re.sub(r'EMBED Equation\.[A-Za-z0-9]+(?:\s*\\\*\s*MERGEFORMAT)?',sub,x)
        if isinstance(x,list): return [walk(y) for y in x]
        return x
    d=B[idx[0]]; d['b']=walk(d['b'])
    print(base[:30],'fields',len(L),'subst',cnt[0])
json.dump(B,open(bj,'w'),ensure_ascii=False); json.dump(A,open(outA,'w'),ensure_ascii=False)
import pickle;pickle.dump(raws,open(outA+'.raws','wb'))
