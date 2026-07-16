#!/usr/bin/env python3
"""Rewrite internal links to Vercel clean root-relative URLs (UTF-8 safe)."""
from pathlib import Path
import re

root = Path(__file__).resolve().parents[1]

pages = {
    "services": "/services/",
    "conditions": "/conditions/",
    "about": "/about/",
    "appointment": "/appointment/",
    "contact": "/contact/",
    "new-patient-special": "/new-patient-special/",
    "privacy-policy": "/privacy-policy/",
    "terms-of-service": "/terms-of-service/",
}


def rewrite(text: str) -> str:
    text = re.sub(r'href="(?:\.\./)?index\.html"', 'href="/"', text)
    for slug, url in pages.items():
        text = re.sub(
            rf'href="(?:\.\./)?{re.escape(slug)}/index\.html\?',
            f'href="{url}?',
            text,
        )
        text = re.sub(
            rf'href="(?:\.\./)?{re.escape(slug)}/index\.html#',
            f'href="{url}#',
            text,
        )
        text = re.sub(
            rf'href="(?:\.\./)?{re.escape(slug)}/index\.html"',
            f'href="{url}"',
            text,
        )
    return text


def main() -> None:
    for path in root.rglob("*.html"):
        original = path.read_text(encoding="utf-8")
        updated = rewrite(original)
        if updated != original:
            path.write_text(updated, encoding="utf-8", newline="\n")
            print(f"updated {path.relative_to(root)}")
    print("DONE")


if __name__ == "__main__":
    main()
