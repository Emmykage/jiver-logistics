import { useState } from "react";

/* ---------- Editable content ---------- */
const NAV = ["Jiver", "Company", "Services", "Help and Support", "Safety"];

const SERVICES = [
  {
    id: "ride",
    title: "Pickup and Drop-off",
    short: "Ride",
    text: "Reliable rides from your door to your destination, with a driver confirmed before you leave.",
    points: ["Door-to-door trips", "Driver details shared upfront", "Fixed, visible fares"],
    cta: "Book a ride",
    art: "car",
  },
  {
    id: "delivery",
    title: "Delivery",
    short: "Delivery",
    text: "Send parcels across the city. We collect, carry and hand over, and you follow it the whole way.",
    points: ["Pickup to drop-off tracking", "Handled by dispatch riders", "Business and personal parcels"],
    cta: "Send a parcel",
    art: "parcel",
  },
  {
    id: "bike",
    title: "Bike Hire",
    short: "Bike Hire",
    text: "Flexible bike hire for the days you want to move on your own schedule.",
    points: ["Hourly and daily hire", "Quick handover", "Support if you need it"],
    cta: "Hire a bike",
    art: "bike",
  },
];

const WHY = [
  { t: "On-time delivery", d: "Every journey and delivery is planned to be smooth and timely.", i: "clock" },
  { t: "Wide coverage", d: "Transport solutions across all the areas we serve.", i: "pin" },
  { t: "Personal support", d: "A real team ready to help with any service enquiry.", i: "headset" },
];

const STEPS = [
  { t: "Choose a service", d: "Pick a ride, a delivery or a bike." },
  { t: "Tell us where", d: "Add your pickup and drop-off points." },
  { t: "We handle the rest", d: "A driver or rider is assigned and you follow along." },
];

const FOOTER = {
  Services: ["Ride", "Delivery", "Bike Hire"],
  "Quick Links": ["Home", "Company", "Help and Support", "Safety"],
};

/* ---------- Tokens ---------- */
const C = {
  ink: "#0B2A3A",
  cyan: "#1BB5D1",
  cyanDeep: "#0E8CA6",
  sky: "#E4F4FC",
  mist: "#F4FAFE",
};

/* ---------- Icons and art ---------- */
const Icon = ({ name, className = "w-6 h-6" }) => {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };
  const paths = {
    clock: <><circle cx="12" cy="12" r="9" {...p} /><path d="M12 7v5l3 2" {...p} /></>,
    pin: <><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" {...p} /><circle cx="12" cy="10" r="2.5" {...p} /></>,
    headset: <><path d="M4 14v-2a8 8 0 0 1 16 0v2" {...p} /><rect x="3" y="14" width="4" height="6" rx="1.5" {...p} /><rect x="17" y="14" width="4" height="6" rx="1.5" {...p} /></>,
    check: <path d="M5 12.5l4.5 4.5L19 7.5" {...p} />,
    arrow: <path d="M5 12h14M13 6l6 6-6 6" {...p} />,
    dot: <circle cx="12" cy="12" r="4" {...p} />,
  };
  return <svg viewBox="0 0 24 24" className={className} aria-hidden="true">{paths[name]}</svg>;
};

const Art = ({ kind }) => {
  const base = (
    <>
      <rect width="400" height="220" fill="#D3EDFA" />
      <circle cx="320" cy="60" r="34" fill="#fff" opacity=".7" />
      <path d="M0 170 Q100 130 200 165 T400 150 V220 H0Z" fill="#B9E1F5" />
      <rect x="0" y="180" width="400" height="40" fill="#9FD3EC" />
    </>
  );
  const scenes = {
    car: (
      <>
        <path d="M70 160 l22 -42 q6 -10 18 -10 h120 q14 0 24 10 l30 30 h20 q10 0 10 10 v12 H70z" fill={C.cyan} />
        <path d="M112 118 h58 v30 h-80z M178 118 h56 l22 30 h-78z" fill="#fff" opacity=".85" />
        <circle cx="125" cy="170" r="18" fill={C.ink} /><circle cx="125" cy="170" r="7" fill="#fff" />
        <circle cx="265" cy="170" r="18" fill={C.ink} /><circle cx="265" cy="170" r="7" fill="#fff" />
      </>
    ),
    parcel: (
      <>
        <rect x="120" y="96" width="120" height="84" rx="6" fill={C.cyan} />
        <rect x="120" y="96" width="120" height="22" rx="6" fill={C.cyanDeep} />
        <rect x="170" y="96" width="20" height="84" fill="#fff" opacity=".7" />
        <rect x="250" y="130" width="70" height="50" rx="5" fill={C.ink} />
        <path d="M276 130 v50" stroke="#fff" strokeWidth="5" opacity=".6" />
        <path d="M60 140 h40 M50 156 h50 M66 172 h34" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
      </>
    ),
    bike: (
      <>
        <circle cx="140" cy="158" r="32" fill="none" stroke={C.ink} strokeWidth="7" />
        <circle cx="270" cy="158" r="32" fill="none" stroke={C.ink} strokeWidth="7" />
        <path d="M140 158 L185 112 H238 L270 158 M185 112 L205 158 H140 M238 112 l-8 -22 h22" fill="none" stroke={C.cyan} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="170" y="100" width="34" height="8" rx="4" fill={C.ink} />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 400 220" className="w-full h-full" role="img" aria-label={`${kind} illustration`} preserveAspectRatio="xMidYMid slice">
      {base}{scenes[kind]}
    </svg>
  );
};

/* ---------- Page ---------- */
export default function JiverTransportServices() {
  const [active, setActive] = useState("ride");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [sent, setSent] = useState(false);
  const current = SERVICES.find((s) => s.id === active);

  return (
    <div className="min-h-screen antialiased" style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: C.ink, background: C.mist }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Sora:wght@600;700;800&display=swap');
        .jv-display{font-family:'Sora',system-ui,sans-serif;letter-spacing:-0.02em}
        .jv-focus:focus-visible{outline:3px solid ${C.cyan};outline-offset:3px}
        @keyframes jv-route{to{stroke-dashoffset:-60}}
        .jv-route{stroke-dasharray:8 10;animation:jv-route 3s linear infinite}
        @media (prefers-reduced-motion: reduce){.jv-route{animation:none}}
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur bg-white/85 border-b border-sky-100">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between gap-6">
          <a href="#" className="jv-display text-2xl font-extrabold jv-focus rounded" style={{ color: C.ink }}>
            JI<span style={{ color: C.cyan }}>V</span>ER
          </a>
          <nav aria-label="Main" className="hidden lg:flex items-center gap-8 text-sm font-medium">
            {NAV.map((n, i) => (
              <a key={n} href="#" className="jv-focus rounded hover:opacity-70 transition-opacity" style={{ color: n === "Safety" ? C.cyanDeep : C.ink }}>
                {n}{i > 0 && <span className="ml-1 opacity-50">▾</span>}
              </a>
            ))}
          </nav>
          <a href="#book" className="jv-focus rounded-full px-5 py-2.5 text-sm font-bold text-white shadow-md hover:shadow-lg transition-shadow" style={{ background: C.cyan }}>
            Sign up
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: `linear-gradient(180deg, ${C.sky} 0%, ${C.mist} 100%)` }}>
        <svg className="absolute inset-0 w-full h-full opacity-60 pointer-events-none" viewBox="0 0 1200 600" preserveAspectRatio="none" aria-hidden="true">
          <path className="jv-route" d="M-20 520 C 250 380, 420 560, 640 360 S 1000 200, 1240 120" fill="none" stroke={C.cyan} strokeWidth="3" strokeLinecap="round" />
          <circle cx="1000" cy="215" r="10" fill={C.cyan} />
          <circle cx="1000" cy="215" r="22" fill={C.cyan} opacity=".2" />
        </svg>

        <div className="relative max-w-6xl mx-auto px-5 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="jv-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05]" style={{ color: C.ink }}>
              Rides, parcels and bikes, handled.
            </h1>
            <p className="mt-6 text-lg leading-relaxed max-w-lg" style={{ color: "#33566B" }}>
              Move around the city with JIVER Logistics and Technology. Book a pickup, send a delivery or hire a bike in a few taps.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#services" className="jv-focus rounded-full px-6 py-3 font-bold text-white shadow-lg" style={{ background: C.ink }}>
                Explore services
              </a>
              <a href="#how" className="jv-focus rounded-full px-6 py-3 font-bold border-2" style={{ borderColor: C.cyan, color: C.cyanDeep }}>
                See how it works
              </a>
            </div>
          </div>

          {/* Booking card */}
          <div id="book" className="rounded-3xl bg-white p-6 sm:p-8 shadow-[0_30px_80px_-30px_rgba(14,140,166,0.45)]">
            <div role="tablist" aria-label="Choose a service" className="grid grid-cols-3 gap-1 p-1 rounded-full" style={{ background: C.sky }}>
              {SERVICES.map((s) => (
                <button
                  key={s.id}
                  role="tab"
                  aria-selected={active === s.id}
                  onClick={() => { setActive(s.id); setSent(false); }}
                  className="jv-focus rounded-full py-2.5 text-sm font-bold transition-colors"
                  style={active === s.id ? { background: C.cyan, color: "#fff" } : { color: C.ink }}
                >
                  {s.short}
                </button>
              ))}
            </div>

            <h2 className="jv-display text-xl font-bold mt-6">{current.title}</h2>
            <p className="text-sm mt-1" style={{ color: "#4A6B7E" }}>{current.text}</p>

            <div className="mt-5 space-y-3">
              <label className="flex items-center gap-3 rounded-xl border border-sky-200 px-4 py-3 focus-within:border-cyan-500">
                <span style={{ color: C.cyan }}><Icon name="dot" className="w-5 h-5" /></span>
                <input value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Pickup location" aria-label="Pickup location" className="w-full outline-none bg-transparent" />
              </label>
              <label className="flex items-center gap-3 rounded-xl border border-sky-200 px-4 py-3 focus-within:border-cyan-500">
                <span style={{ color: C.ink }}><Icon name="pin" className="w-5 h-5" /></span>
                <input value={to} onChange={(e) => setTo(e.target.value)} placeholder="Drop-off location" aria-label="Drop-off location" className="w-full outline-none bg-transparent" />
              </label>
            </div>

            <button onClick={() => setSent(true)} className="jv-focus mt-5 w-full rounded-xl py-3.5 font-bold text-white flex items-center justify-center gap-2" style={{ background: C.cyan }}>
              {current.cta} <Icon name="arrow" className="w-5 h-5" />
            </button>
            <p className="mt-3 text-sm min-h-[1.25rem]" role="status" style={{ color: C.cyanDeep }}>
              {sent ? `Request saved${from && to ? `: ${from} to ${to}` : ""}. Sign up to confirm.` : ""}
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="max-w-6xl mx-auto px-5 py-20">
        <div className="max-w-2xl">
          <h2 className="jv-display text-3xl sm:text-4xl font-extrabold">Choose a service that fits your needs</h2>
          <p className="mt-4 text-lg" style={{ color: "#4A6B7E" }}>
            Tell us what you need and JIVER handles the rest.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {SERVICES.map((s) => (
            <article key={s.id} className="group flex flex-col rounded-3xl bg-white overflow-hidden border border-sky-100 shadow-sm hover:shadow-xl transition-shadow">
              <div className="h-48 overflow-hidden"><Art kind={s.art} /></div>
              <div className="flex-1 p-6 flex flex-col">
                <h3 className="jv-display text-xl font-bold" style={{ color: C.cyanDeep }}>{s.title}</h3>
                <p className="mt-2" style={{ color: "#4A6B7E" }}>{s.text}</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-2">
                      <span className="shrink-0 rounded-full p-0.5 text-white" style={{ background: C.cyan }}><Icon name="check" className="w-4 h-4" /></span>
                      {p}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => { setActive(s.id); setSent(false); document.getElementById("book")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="jv-focus mt-6 self-start rounded-full px-5 py-2.5 text-sm font-bold border-2 transition-colors hover:text-white"
                  style={{ borderColor: C.cyan, color: C.cyanDeep }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = C.cyan)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  {s.cta}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Why */}
      <section className="py-20" style={{ background: C.ink }}>
        <div className="max-w-6xl mx-auto px-5 grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <h2 className="jv-display text-3xl sm:text-4xl font-extrabold text-white">Why choose JIVER</h2>
            <p className="mt-4 text-lg" style={{ color: "#A9CBDA" }}>
              Reliable, affordable and convenient transport for individuals and businesses.
            </p>
          </div>
          <div className="lg:col-span-3 grid sm:grid-cols-3 gap-4">
            {WHY.map((w) => (
              <div key={w.t} className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.06)" }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white" style={{ background: C.cyan }}>
                  <Icon name={w.i} />
                </div>
                <h3 className="jv-display mt-4 font-bold text-white">{w.t}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "#A9CBDA" }}>{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="max-w-6xl mx-auto px-5 py-20">
        <h2 className="jv-display text-3xl sm:text-4xl font-extrabold">How it works</h2>
        <ol className="mt-10 grid md:grid-cols-3 gap-6">
          {STEPS.map((s, i) => (
            <li key={s.t} className="relative rounded-3xl bg-white border border-sky-100 p-6">
              <span className="jv-display text-4xl font-extrabold" style={{ color: C.cyan }}>{i + 1}</span>
              <h3 className="jv-display mt-3 text-lg font-bold">{s.t}</h3>
              <p className="mt-1" style={{ color: "#4A6B7E" }}>{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA band */}
      <section className="max-w-6xl mx-auto px-5 pb-20">
        <div className="rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row md:items-center justify-between gap-6 text-white" style={{ background: `linear-gradient(120deg, ${C.cyanDeep}, ${C.cyan})` }}>
          <div>
            <h2 className="jv-display text-2xl sm:text-3xl font-extrabold">Ready to move with JIVER?</h2>
            <p className="mt-2 opacity-90">Create an account and book your first trip, delivery or bike hire.</p>
          </div>
          <a href="#book" className="jv-focus rounded-full px-7 py-3.5 font-bold text-center" style={{ background: "#fff", color: C.cyanDeep }}>
            Sign up
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-sm" style={{ background: "#08202D", color: "#A9CBDA" }}>
        <div className="max-w-6xl mx-auto px-5 py-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="jv-display text-white font-bold text-lg">About Jiver</h3>
            <p className="mt-3 leading-relaxed">Your ultimate ride and delivery solution.</p>
          </div>
          {Object.entries(FOOTER).map(([h, links]) => (
            <div key={h}>
              <h3 className="jv-display text-white font-bold text-lg">{h}</h3>
              <ul className="mt-3 space-y-2">
                {links.map((l) => <li key={l}><a href="#" className="jv-focus rounded hover:text-white">{l}</a></li>)}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="jv-display text-white font-bold text-lg">Newsletter</h3>
            <p className="mt-3">Subscribe for quick updates.</p>
            <div className="mt-3 flex gap-2">
              <input aria-label="Email address" placeholder="Email address" className="min-w-0 flex-1 rounded-lg px-3 py-2 bg-white/10 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-cyan-400" />
              <button className="jv-focus rounded-lg px-4 py-2 font-bold text-white" style={{ background: C.cyan }}>Join</button>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 py-5 text-center text-xs">© {new Date().getFullYear()} JIVER Logistics and Technology</div>
      </footer>
    </div>
  );
}
