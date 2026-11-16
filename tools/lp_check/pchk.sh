#!/bin/zsh
CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
f="pdf/${1//[#]/_}_$2.pdf"; mkdir -p pdf
"$CH" --headless=new --allow-file-access-from-files --no-pdf-header-footer --user-data-dir="/tmp/chp_$$" --virtual-time-budget=20000 --print-to-pdf="$PWD/$f" "file://$PWD/pharn.html#$1@$2" >/dev/null 2>&1
rm -rf "/tmp/chp_$$"
