from pathlib import Path
import re

root = Path(__file__).resolve().parents[1]
t = (root / "index.html").read_text(encoding="utf-8")
print("arrow", "\u2192" in t)
print("phone_emoji", "\U0001f4de" in t)
print("check", "\u2713" in t)
print("has_/services/", "/services/" in t)
print("has_/appointment/", "/appointment/" in t)
bad = re.findall(r'href="[^"]*index\.html[^"]*"', t)
print("remaining_index_html_hrefs", len(bad), bad[:5])

for path in root.rglob("*.html"):
    text = path.read_text(encoding="utf-8")
    leftover = re.findall(r'href="(?:\.\./)?(?:[a-z0-9\-]+/)?index\.html[^"]*"', text)
    if leftover:
        print(path.relative_to(root), leftover)
print("ok")
