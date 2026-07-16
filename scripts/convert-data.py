from pathlib import Path

src = Path(r"C:\Users\Alex\Summit-Spine-Wellness\src\data.ts").read_text(encoding="utf-8")
js = src
js = js.replace(
    "/**\n * @license\n * SPDX-License-Identifier: Apache-2.0\n */\n\n",
    "",
)
js = js.replace(
    "import { Service, Condition, Testimonial, FAQItem } from './types';\n\n",
    "",
)
js = js.replace("export const ", "const ")
for name in [
    "servicesData",
    "allServicesData",
    "conditionsData",
    "testimonialsData",
    "faqsData",
]:
    js = js.replace(f"const {name} =", f"window.SSW_DATA.{name} =")

out = (
    "/** Auto-converted from AI Studio data.ts */\n"
    "window.SSW_DATA = window.SSW_DATA || {};\n"
    + js
    + "\n"
)
dest = Path(__file__).resolve().parents[1] / "js" / "data.js"
dest.write_text(out, encoding="utf-8")
print("wrote", dest, dest.stat().st_size)
