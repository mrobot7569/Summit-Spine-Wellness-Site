"""Write AI-Studio-parity subpages with shared head/nav shell."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

HEAD = '''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
  <meta name="description" content="{description}">
  <link rel="canonical" href="https://summit-spine-static.vercel.app{path}">
  <meta name="theme-color" content="#030805">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,100..900;1,100..900&family=JetBrains+Mono:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="../js/tw-config.js"></script>
  <link rel="stylesheet" href="../css/styles.css">
  <link rel="icon" type="image/png" href="../images/logo/summit-spine-logo.png">
</head>
<body class="font-sans bg-brand-bg text-slate-800 antialiased overflow-x-hidden" data-nav-base="../" data-nav-mode="{mode}" data-nav-active="{active}">
  <div id="site-nav"></div>
'''

FOOT = '''
  <div id="site-footer"></div>
  <script src="../js/site-config.js"></script>
  <script src="../js/data.js"></script>
  <script src="../js/nav.js"></script>
  <script src="../js/footer.js"></script>
  <script src="../js/booking.js"></script>
  {extra_scripts}
</body>
</html>
'''

pages = {}

pages["about"] = HEAD.format(
    title="About Dr. Spencer Hiebert | Summit Spine & Wellness Colleyville",
    description="Meet Dr. Spencer Hiebert, D.C. — Texas A&M kinesiology, Parker University, Webster Certified. Root-cause chiropractic care in Colleyville, TX.",
    path="/about/",
    mode="solid",
    active="about",
) + '''
  <main class="page-pad-nav">
    <section class="page-hero-ai">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <span class="text-brand-yellow-400 text-xs font-mono font-bold uppercase tracking-widest">About</span>
        <h1 class="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-3 max-w-3xl text-white">Dr. Spencer Hiebert — Chiropractor in Colleyville, TX</h1>
        <p class="mt-4 text-white/75 max-w-2xl text-lg font-light">Evidence-based care from a doctor who lives the active lifestyle he helps patients reclaim.</p>
      </div>
    </section>
    <section class="py-16 lg:py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-12 gap-12 items-start">
          <div class="lg:col-span-5">
            <div class="rounded-3xl overflow-hidden shadow-2xl border-4 border-[#faf8f4] sticky top-28">
              <img src="../images/photos/dr-hiebert.png" alt="Dr. Spencer Hiebert" class="w-full aspect-[4/5] object-cover object-top" width="800" height="1000">
            </div>
          </div>
          <div class="lg:col-span-7 space-y-5">
            <span class="text-brand-green-500 text-xs font-mono font-extrabold uppercase tracking-widest">Our Story</span>
            <h2 class="font-display text-3xl sm:text-4xl font-extrabold text-brand-green-900">Move better. Feel better. Live without limits.</h2>
            <p class="text-slate-600 leading-relaxed">Dr. Spencer Hiebert grew up in Aledo, Texas with a deep love for the outdoors. Hiking, skiing, climbing, paddleboarding — staying active isn't just a hobby. It's a way of life — and what drives his passion for helping patients get back to the activities that matter most.</p>
            <p class="text-slate-600 leading-relaxed">After earning his B.S. in Kinesiology from Texas A&M University, Dr. Hiebert completed his Doctor of Chiropractic degree at Parker University in Dallas. Over five and a half years, he has treated athletes, working parents, seniors, and desk workers across DFW and Colorado.</p>
            <p class="text-slate-600 leading-relaxed">His approach is evidence-based, thorough, and deeply personal. Healthcare should be welcoming and accessible — every patient deserves to understand their body, condition, and path forward.</p>
            <p class="font-display italic text-xl text-brand-green-800 font-semibold">"At Summit, my mission is simple: help you move better, feel better, and get back to living life at full elevation."</p>
            <div class="grid sm:grid-cols-2 gap-3 pt-2">
              <div class="bg-[#faf8f4] p-4 rounded-xl border border-slate-100"><strong class="block text-sm text-brand-green-900">B.S. Kinesiology</strong><span class="text-[10px] font-mono uppercase text-slate-400 font-bold">Texas A&M University</span></div>
              <div class="bg-[#faf8f4] p-4 rounded-xl border border-slate-100"><strong class="block text-sm text-brand-green-900">Doctor of Chiropractic</strong><span class="text-[10px] font-mono uppercase text-slate-400 font-bold">Parker University</span></div>
              <div class="bg-[#faf8f4] p-4 rounded-xl border border-slate-100"><strong class="block text-sm text-brand-green-900">Webster Certified</strong><span class="text-[10px] font-mono uppercase text-slate-400 font-bold">Prenatal chiropractic</span></div>
              <div class="bg-[#faf8f4] p-4 rounded-xl border border-slate-100"><strong class="block text-sm text-brand-green-900">DFW & Colorado</strong><span class="text-[10px] font-mono uppercase text-slate-400 font-bold">5+ years clinical care</span></div>
            </div>
            <button type="button" data-open-booking class="mt-4 px-6 py-4 bg-brand-green-500 hover:bg-brand-green-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl">Book With Dr. Hiebert</button>
          </div>
        </div>
      </div>
    </section>
  </main>
''' + FOOT.format(extra_scripts="")

pages["services"] = HEAD.format(
    title="Chiropractic Services Colleyville | Summit Spine & Wellness",
    description="Chiropractic adjustments, spinal decompression, dry needling, massage, rehab, prenatal care, red light, infrared sauna, and more in Colleyville, TX.",
    path="/services/",
    mode="solid",
    active="services",
) + '''
  <main class="page-pad-nav">
    <section class="page-hero-ai">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <span class="text-brand-yellow-400 text-xs font-mono font-bold uppercase tracking-widest">Services</span>
        <h1 class="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-3 max-w-3xl text-white">Chiropractic, Decompression & Recovery — Under One Roof</h1>
        <p class="mt-4 text-white/75 max-w-2xl text-lg font-light">Comprehensive care built around your goals — not a one-size template.</p>
      </div>
    </section>
    <section class="py-16 bg-brand-green-900 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-wrap gap-2 mb-10">
          <button type="button" class="filter-tab-ai is-active" data-all-filter="all">All</button>
          <button type="button" class="filter-tab-ai" data-all-filter="chiropractic">Chiropractic</button>
          <button type="button" class="filter-tab-ai" data-all-filter="specialized">Advanced</button>
          <button type="button" class="filter-tab-ai" data-all-filter="recovery">Recovery</button>
        </div>
        <div id="all-services-grid" class="grid md:grid-cols-2 gap-5"></div>
      </div>
    </section>
  </main>
  <script>
  (function(){
    const all = (window.SSW_DATA && window.SSW_DATA.allServicesData) || [];
    let filter = 'all';
    const catLabel = (c) => c==='chiropractic'?'Joint Alignment':c==='specialized'?'Computerized Structural':'Athletic Recovery Soft-Tissue';
    function render(){
      const grid = document.getElementById('all-services-grid');
      if(!grid) return;
      const list = all.filter(s => filter==='all' || s.category===filter);
      grid.innerHTML = list.map(s => `
        <article id="${s.id}" class="service-card-ai scroll-mt-28" data-cat="${s.category}">
          <div>
            <span class="service-card__cat">${catLabel(s.category)}</span>
            <h2 class="font-display font-extrabold text-2xl text-white mt-3">${s.name}</h2>
            <p class="text-sm text-neutral-300 mt-3 leading-relaxed">${s.description}</p>
            <p class="text-xs text-neutral-400 mt-3 leading-relaxed">${s.details}</p>
            <ul class="mt-4 space-y-1.5 text-xs text-neutral-200">${(s.benefits||[]).map(b=>`<li>✓ ${b}</li>`).join('')}</ul>
          </div>
          <button type="button" data-open-booking data-service="${s.id}" class="mt-6 py-2.5 px-4 bg-brand-green-500 hover:bg-brand-green-600 text-white rounded-xl text-xs font-bold self-start">Book Session</button>
        </article>`).join('');
    }
    document.querySelectorAll('[data-all-filter]').forEach(btn=>{
      btn.addEventListener('click',()=>{
        filter = btn.getAttribute('data-all-filter');
        document.querySelectorAll('[data-all-filter]').forEach(b=>b.classList.toggle('is-active', b===btn));
        render();
      });
    });
    document.addEventListener('DOMContentLoaded', render);
    if(document.readyState!=='loading') render();
  })();
  </script>
''' + FOOT.format(extra_scripts="")

pages["conditions"] = HEAD.format(
    title="Conditions Treated | Chiropractor Colleyville TX | Summit Spine",
    description="Summit Spine treats back pain, neck pain, sciatica, herniated discs, headaches, whiplash, posture issues, and more in Colleyville, TX.",
    path="/conditions/",
    mode="solid",
    active="conditions",
) + '''
  <main class="page-pad-nav">
    <section class="page-hero-ai">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <span class="text-brand-yellow-400 text-xs font-mono font-bold uppercase tracking-widest">Conditions</span>
        <h1 class="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-3 max-w-3xl text-white">Conditions We Treat in Colleyville</h1>
        <p class="mt-4 text-white/75 max-w-2xl text-lg font-light">From acute injury to chronic pain — root-cause care tailored to your symptoms and goals.</p>
      </div>
    </section>
    <section class="py-16 bg-brand-cream topographic-bg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div id="conditions-full-grid" class="grid md:grid-cols-2 gap-5"></div>
      </div>
    </section>
  </main>
  <script>
  (function(){
    const conditions = (window.SSW_DATA && window.SSW_DATA.conditionsData) || [];
    function render(){
      const g = document.getElementById('conditions-full-grid');
      if(!g) return;
      g.innerHTML = conditions.map(c => `
        <article id="${c.id}" class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm scroll-mt-28">
          <h2 class="font-display font-bold text-xl text-brand-green-900">${c.name}</h2>
          <p class="text-sm text-slate-500 mt-2 leading-relaxed">${c.description}</p>
          <p class="text-xs font-semibold text-brand-green-600 mt-3">Symptoms: ${(c.symptoms||[]).join(' · ')}</p>
          <button type="button" data-open-booking class="mt-4 px-4 py-2.5 border border-brand-green-500 text-brand-green-600 font-bold text-xs uppercase tracking-wider rounded-xl">Request Care</button>
        </article>`).join('');
    }
    document.addEventListener('DOMContentLoaded', render);
    if(document.readyState!=='loading') render();
  })();
  </script>
''' + FOOT.format(extra_scripts="")

pages["contact"] = HEAD.format(
    title="Contact & Hours | Summit Spine & Wellness Colleyville TX",
    description="Visit Summit Spine at 6416 Colleyville Blvd, Suite 108. Hours, phone, map, and appointment requests.",
    path="/contact/",
    mode="solid",
    active="contact",
) + '''
  <main class="page-pad-nav">
    <section class="page-hero-ai">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <span class="text-brand-yellow-400 text-xs font-mono font-bold uppercase tracking-widest">Contact</span>
        <h1 class="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-3 text-white">Visit Us in Colleyville</h1>
        <p class="mt-4 text-white/75 max-w-2xl text-lg font-light">Walk-ins welcome. Prefer to plan ahead? Request an appointment online.</p>
      </div>
    </section>
    <section class="py-16 bg-[#faf9f4]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-12 gap-8">
          <div class="lg:col-span-5 space-y-6">
            <div class="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <h2 class="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest">Address</h2>
              <p class="font-display font-bold text-xl text-brand-green-900 mt-2">6416 Colleyville Blvd, Suite 108<br>Colleyville, TX 76034</p>
              <a href="https://maps.google.com/?q=6416+Colleyville+Blvd,+Suite+108,+Colleyville,+TX+76034" target="_blank" rel="noopener" class="inline-block mt-4 text-xs font-extrabold uppercase tracking-wider text-brand-green-600">Open in Google Maps →</a>
            </div>
            <div class="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <h2 class="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest">Hours</h2>
              <div class="mt-3 space-y-2 text-sm font-semibold text-slate-700">
                <div class="flex justify-between"><span>Mon – Thu</span><span class="text-right">9:00 AM – 1:00 PM<br>2:30 PM – 6:00 PM</span></div>
                <div class="flex justify-between"><span>Friday</span><span>9:00 AM – 1:00 PM</span></div>
                <div class="flex justify-between text-slate-400"><span>Sat & Sun</span><span class="font-mono text-xs">CLOSED</span></div>
              </div>
            </div>
            <button type="button" data-open-booking class="w-full py-4 bg-brand-green-500 hover:bg-brand-green-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl">Request Appointment</button>
          </div>
          <div class="lg:col-span-7 map-embed min-h-[420px]">
            <iframe title="Map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3351.4886675231737!2d-97.15949572458824!3d32.85901177362843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e7fe3fdbdf93d%3A0x67db238ff7bfb80b!2s6416%20Colleyville%20Blvd%2C%20Colleyville%2C%20TX%2076034!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" loading="lazy" allowfullscreen></iframe>
          </div>
        </div>
      </div>
    </section>
  </main>
''' + FOOT.format(extra_scripts="")

pages["appointment"] = HEAD.format(
    title="Book Appointment | Summit Spine & Wellness Colleyville",
    description="Request an appointment with Dr. Spencer Hiebert at Summit Spine & Wellness in Colleyville, TX.",
    path="/appointment/",
    mode="solid",
    active="appointment",
) + '''
  <main class="page-pad-nav">
    <section class="page-hero-ai">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <span class="text-brand-yellow-400 text-xs font-mono font-bold uppercase tracking-widest">Appointments</span>
        <h1 class="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-3 text-white">Request Your Visit With Dr. Hiebert</h1>
        <p class="mt-4 text-white/75 max-w-2xl text-lg font-light">Prefer to call? <a href="tel:+18175550199" class="text-brand-yellow-400 font-semibold underline">(817) 555-0199</a></p>
      </div>
    </section>
    <section class="py-16 bg-[#faf9f4]">
      <div class="max-w-xl mx-auto px-4 text-center">
        <div class="bg-white p-10 rounded-3xl border border-slate-100 shadow-xl">
          <h2 class="font-display text-2xl font-extrabold text-brand-green-900">Start your request</h2>
          <p class="text-sm text-slate-500 mt-2 mb-8">Multi-step booking with service selection, preferred date/time, and contact details — same flow as the clinic site.</p>
          <button type="button" data-open-booking class="w-full py-4 bg-brand-green-600 hover:bg-brand-green-500 text-white font-extrabold text-sm uppercase tracking-wider rounded-2xl shadow-lg">Open Appointment Request →</button>
          <a href="/new-patient-special/" class="block mt-4 text-xs font-bold uppercase tracking-widest text-brand-green-600">Or claim $99 New Patient Special →</a>
        </div>
      </div>
    </section>
  </main>
  <script>
  document.addEventListener('DOMContentLoaded', function(){
    const p = new URLSearchParams(location.search);
    if(window.SSW_BOOKING){
      window.SSW_BOOKING.open({ serviceId: p.get('service')||'', isPromo: p.get('promo')==='1' });
    }
  });
  </script>
''' + FOOT.format(extra_scripts="")

pages["new-patient-special"] = HEAD.format(
    title="$99 New Patient Special | Summit Spine & Wellness Colleyville",
    description="Claim the $99 New Patient Clinical Starter Package — consult, exam, imaging as needed, personalized care blueprint.",
    path="/new-patient-special/",
    mode="special",
    active="special",
) + '''
  <main class="page-pad-nav">
    <div class="sticky top-16 md:top-20 z-40 bg-brand-green-950 border-b border-brand-green-900 text-white py-5 px-4 shadow-md">
      <div class="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-center">
        <div class="flex items-center gap-2.5 text-xs">
          <span class="relative flex h-2.5 w-2.5"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-yellow-400 opacity-75"></span><span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-yellow-400"></span></span>
          <span class="font-mono uppercase tracking-wider font-extrabold text-[#faf7f2]">Limited-Time Web Exclusive · $99 Clinical Starter</span>
        </div>
        <button type="button" data-open-booking data-promo class="text-[10px] font-extrabold uppercase tracking-widest bg-brand-yellow-400 hover:bg-brand-yellow-500 text-brand-green-950 px-2.5 py-1 rounded-md">Claim Special</button>
      </div>
    </div>
    <header class="relative bg-[#020d09] pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
      <div class="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80" alt="" class="w-full h-full object-cover opacity-60" loading="lazy">
        <div class="absolute inset-0 bg-gradient-to-t from-[#020d09] via-[#020d09]/60 to-transparent"></div>
      </div>
      <div class="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-6">
        <div class="inline-flex items-center gap-2 bg-brand-yellow-400/10 border border-brand-yellow-400/20 px-3.5 py-1.5 rounded-full">
          <span class="font-mono text-[10px] font-bold text-brand-yellow-400 tracking-widest uppercase">Limited-Time Web Exclusive Promotional Package</span>
        </div>
        <h1 class="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
          The $99 New Patient<br>
          <span class="hero-glow">Clinical Starter Package</span>
        </h1>
        <p class="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed">Stop letting persistent stiffness, old sports injuries, and constant back tension dictate your days. Lock in our comprehensive doctor-led examination, diagnostic digital x-rays, and custom relief strategy.</p>
        <div class="max-w-md mx-auto pt-4">
          <div class="bg-white/[0.03] border border-white/10 p-5 rounded-2xl backdrop-blur-md text-left space-y-4">
            <div class="flex justify-between items-baseline border-b border-white/15 pb-2">
              <span class="text-white text-xs font-semibold uppercase tracking-wider">Clinical Value</span>
              <span class="text-slate-400 text-xs line-through">$350 Value</span>
            </div>
            <div class="flex justify-between items-center text-white">
              <span class="text-sm font-bold text-slate-200">New Patient Price</span>
              <span class="text-3xl font-mono font-black text-brand-yellow-400">$99</span>
            </div>
          </div>
        </div>
        <button type="button" data-open-booking data-promo class="px-8 py-4 bg-brand-yellow-400 hover:bg-brand-yellow-500 text-brand-green-950 font-extrabold text-sm uppercase tracking-wider rounded-xl shadow-lg">Claim Your $99 Package →</button>
      </div>
    </header>
    <section class="py-16 bg-white">
      <div class="max-w-4xl mx-auto px-4 grid md:grid-cols-2 gap-6">
        <div class="p-6 rounded-2xl border border-slate-100 bg-[#faf8f4]"><h3 class="font-display font-bold text-lg text-brand-green-900">What's included</h3><ul class="mt-4 space-y-2 text-sm text-slate-600"><li>✓ Comprehensive consultation with Dr. Hiebert</li><li>✓ Postural balance analysis</li><li>✓ Orthopedic & neurological exams</li><li>✓ Digital x-rays when medically indicated</li><li>✓ Personalized care blueprint on follow-up</li></ul></div>
        <div class="p-6 rounded-2xl border border-slate-100 bg-white shadow-sm flex gap-4">
          <img src="../images/photos/dr-hiebert.png" alt="Dr. Hiebert" class="w-20 h-20 rounded-full object-cover object-top border-2 border-brand-cream-dark" width="80" height="80">
          <div>
            <h3 class="font-display font-bold text-lg text-brand-green-900">A letter from Dr. Hiebert</h3>
            <p class="text-sm text-slate-500 mt-2 leading-relaxed">We want high-end clinical care accessible to Colleyville, Grapevine, and Keller neighbors. This is a professional evaluation designed to give you clarity — not a bait-and-switch promo.</p>
            <p class="text-xs font-bold text-brand-green-700 mt-2">Dr. Spencer Hiebert, D.C.</p>
          </div>
        </div>
      </div>
      <div class="max-w-3xl mx-auto px-4 mt-12 text-center">
        <button type="button" data-open-booking data-promo class="px-10 py-5 bg-brand-green-600 hover:bg-brand-green-500 text-white font-extrabold text-sm uppercase tracking-wider rounded-xl">Secure Your Voucher & Book →</button>
        <p class="text-[10px] text-slate-400 leading-relaxed mt-8 text-left">THE PATIENT AND ANY OTHER PERSON RESPONSIBLE FOR PAYMENT HAS A RIGHT TO REFUSE TO PAY, CANCEL PAYMENT, OR BE REIMBURSED FOR PAYMENT FOR ANY OTHER SERVICE, EXAMINATION, OR TREATMENT THAT IS PERFORMED AS A RESULT OF AND WITHIN 72 HOURS OF RESPONDING TO THE ADVERTISEMENT FOR THE FREE, DISCOUNTED FEE, OR REDUCED FEE SERVICE, EXAMINATION, OR TREATMENT.</p>
      </div>
    </section>
  </main>
''' + FOOT.format(extra_scripts="")

# simple legal pages keep solid nav
for slug, title in [("privacy-policy", "Privacy Policy"), ("terms-of-service", "Terms of Service")]:
    pages[slug] = HEAD.format(
        title=f"{title} | Summit Spine & Wellness",
        description=f"{title} for Summit Spine & Wellness.",
        path=f"/{slug}/",
        mode="solid",
        active="",
    ) + f'''
  <main class="page-pad-nav">
    <section class="page-hero-ai"><div class="max-w-7xl mx-auto px-4"><h1 class="font-display text-3xl sm:text-4xl font-extrabold text-white">{title}</h1><p class="mt-3 text-white/70 text-sm">Last updated: July 16, 2026</p></div></section>
    <section class="py-14"><div class="max-w-3xl mx-auto px-4 prose prose-slate text-slate-600 text-sm leading-relaxed space-y-4">
      <p>This {title.lower()} applies to the Summit Spine & Wellness website and online inquiry forms. For clinical care policies, contact the clinic directly.</p>
      <p>Questions: see our <a href="/contact/" class="text-brand-green-600 font-semibold underline">Contact</a> page.</p>
    </div></section>
  </main>
''' + FOOT.format(extra_scripts="")

for folder, html in pages.items():
    dest = ROOT / folder / "index.html"
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(html, encoding="utf-8", newline="\n")
    print("wrote", dest.relative_to(ROOT))
print("done")
