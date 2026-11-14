#!/bin/zsh
# 🧪 ដំណើរការតេស្តទាំងអស់ · ប្រើ៖ ./tests/run.sh   (exit 1 បើមានកំហុស)
cd "$(dirname "$0")/.." || exit 1
J=/System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc
fail=0
for t in "syntax.js -- $(ls *.js | tr '\n' ' ')" exgen.js practice.js hub.js storage.js; do
  out=$(eval "$J tests/$t" 2>&1); last=$(print -r -- "$out" | tail -1); print -r -- "$last"
  if ! print -r -- "$last" | grep -q ' bad 0$'; then print -r -- "$out" | tail -25; fail=1; fi
done
out=$(python3 tools/localize_mcq.py --selftest 2>&1); last=$(print -r -- "$out" | tail -1); print -r -- "$last"
if ! print -r -- "$last" | grep -q " bad 0$"; then print -r -- "$out" | tail -25; fail=1; fi
exit $fail
