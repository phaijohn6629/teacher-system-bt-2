import fitz,json,glob,os,re
o={r['k']:r for r in json.load(open('out.json'))['out'] if r['d']==90}
bad=[];n=0
for f in sorted(glob.glob('pdf/*.pdf')):
    k=os.path.basename(f)[:-7]; m=re.match(r'(\d+)_(\d+)_(\d+)$',k); key=f'{m[1]}_{m[2]}#{m[3]}'
    d=fitz.open(f); n+=1; r=o.get(key); iss=[]
    if r and len(d)!=r['sheets']: iss.append(f'pages {len(d)} != sheets {r["sheets"]}')
    for i,p in enumerate(d):
        W,H=p.rect.width,p.rect.height
        bl=[b for b in p.get_text('blocks') if b[4].strip()]
        if not bl: iss.append(f'p{i+1} empty'); continue
        ymax=max(b[3] for b in bl); xmax=max(b[2] for b in bl); xmin=min(b[0] for b in bl)
        if ymax>H-8: iss.append(f'p{i+1} text to bottom edge y={ymax:.0f}/{H:.0f}')
    if iss: bad.append((key,iss))
print(n,'pdfs checked;',len(bad),'with issues')
for k,i in bad[:60]: print(k,i[:4])
