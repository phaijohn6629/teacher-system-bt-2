DEBUG=0
import olefile,struct,re,sys
sys.path.insert(0,'.')
import m2l
def eqlist(path):
    o=olefile.OleFileIO(path); wd=o.openstream('WordDocument').read()
    flags=struct.unpack('<H',wd[10:12])[0]; tbl=o.openstream('1Table' if flags&0x200 else '0Table').read()
    p=32; csw=struct.unpack('<H',wd[p:p+2])[0]; p+=2+csw*2
    cslw=struct.unpack('<H',wd[p:p+2])[0]; p+=2+cslw*4
    cb=struct.unpack('<H',wd[p:p+2])[0]; p+=2
    pairs=[struct.unpack('<II',wd[p+8*i:p+8*i+8]) for i in range(cb)]
    fcClx,lcbClx=pairs[33]; fcBte,lcbBte=pairs[12]
    clx=tbl[fcClx:fcClx+lcbClx]; i=0
    while clx[i]==1: i+=3+struct.unpack('<H',clx[i+1:i+3])[0]
    assert clx[i]==2; ln=struct.unpack('<I',clx[i+1:i+5])[0]; pl=clx[i+5:i+5+ln]
    n=(ln-4)//12; cps=struct.unpack('<%dI'%(n+1),pl[:4*(n+1)]); pcds=[]
    for k in range(n):
        fcv=struct.unpack('<I',pl[4*(n+1)+8*k+2:4*(n+1)+8*k+6])[0]
        comp=bool(fcv&0x40000000); fc=fcv&0x3FFFFFFF
        pcds.append((cps[k],cps[k+1],fc,comp))
    # text with fc map
    chars=[];fcs=[]
    for (c0,c1,fc,comp) in pcds:
        for k in range(c1-c0):
            if comp: ch=wd[fc//2+k]; chars.append(chr(ch)); fcs.append(fc+2*k)
            else:
                ch=struct.unpack('<H',wd[fc+2*k:fc+2*k+2])[0]; chars.append(chr(ch)); fcs.append(fc+2*k)
    # CHPX bte
    bte=tbl[fcBte:fcBte+lcbBte]; m=(lcbBte-4)//8
    fcsB=struct.unpack('<%dI'%(m+1),bte[:4*(m+1)]); pns=struct.unpack('<%dI'%m,bte[4*(m+1):4*(m+1)+4*m])
    def picloc(fc):
        for k in range(m):
            if fcsB[k]<=fc<fcsB[k+1]:
                pg=wd[pns[k]*512:pns[k]*512+512]; cr=pg[511]
                rf=struct.unpack('<%dI'%(cr+1),pg[:4*(cr+1)])
                for r in range(cr):
                    if rf[r]<=fc<rf[r+1]:
                        off=pg[4*(cr+1)+r]*2
                        if not off: return None
                        cbx=pg[off]; g=pg[off+1:off+1+cbx]; q=0; res=None
                        while q+2<=len(g):
                            op=struct.unpack('<H',g[q:q+2])[0]; spra=op>>13; q+=2
                            sz={0:1,1:1,2:2,3:4,4:2,5:2,7:3}.get(spra)
                            if spra==6: sz=1+g[q]
                            if DEBUG: print(hex(op),g[q:q+(sz or 0)].hex())
                            if op==0x680E: res=struct.unpack('<i',g[q:q+4])[0]
                            q+=sz
                        return res
        return None
    txt=''.join(chars); out=[]
    for mt in re.finditer(r'\x13([^\x14\x15]*)\x14\x01\x15',txt):
        if 'EMBED' not in mt.group(1) or 'Equation' not in mt.group(1): continue
        cp=mt.end()-2; pl_=picloc(fcs[cp])
        if pl_ is None:
            for c2 in range(mt.start(),mt.end()):
                pl_=picloc(fcs[c2])
                if pl_ is not None: break
        name='_%d'%pl_ if pl_ is not None else None
        if DEBUG and len(out)<2: print('cp',cp,'fc',fcs[cp],'pic',pl_,'bte',fcsB[0],fcsB[-1],m)
        tex=None
        if name and o.exists(f'ObjectPool/{name}/Equation Native'):
            try: tex=m2l.to_tex(o.openstream(f'ObjectPool/{name}/Equation Native').read())[0]
            except Exception as e: tex=None
        out.append((name,tex))
    return out
if __name__=='__main__':
    import glob
    for f in sorted(glob.glob(sys.argv[1])):
        L=eqlist(f);print(f[-40:],len(L),sum(1 for n,t in L if t),[t for n,t in L][:6])
