#!/bin/zsh
# usage: run1.sh hash
CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CH" --headless=new --allow-file-access-from-files --virtual-time-budget=${2:-300000} --dump-dom "file://$PWD/harness.html#$1" 2>/dev/null | python3 -c "
import sys,re,html
s=sys.stdin.read();m=re.search(r'<pre id=\"out\">(.*?)</pre>',s,re.S)
t=re.search(r'<title>(.*?)</title>',s);print(t.group(1) if t else 'no title')
open('out.json','w').write(html.unescape(m.group(1)) if m else '')
"
