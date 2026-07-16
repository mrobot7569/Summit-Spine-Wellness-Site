from pathlib import Path
import re

root = Path(__file__).resolve().parents[1]
pat = re.compile(
    r'<nav id="desktop-nav" class="[^"]*" aria-label="Main navigation"></nav>'
)
repl = '<nav id="desktop-nav" class="desktop-nav" aria-label="Main navigation"></nav>'

for path in root.rglob("*.html"):
    text = path.read_text(encoding="utf-8")
    updated, n = pat.subn(repl, text)
    if n:
        path.write_text(updated, encoding="utf-8", newline="\n")
        print(f"{path.relative_to(root)}: {n}")
print("done")
