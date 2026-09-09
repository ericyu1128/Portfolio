'use client';

/**
 * Eric Yu — personal portfolio. Single-file React component.
 *
 * Drop-in for Next.js (App Router):  app/page.jsx  →  export default Portfolio
 * Drop-in for Vite/CRA:              import Portfolio from './Portfolio'
 *
 * Requires:  npm i lucide-react   +   Tailwind CSS configured in the project
 *            (works with Tailwind 3.x and 4.x — no custom tailwind.config needed)
 *
 * Resume button:  put your PDF at  public/Eric_Yu_Resume.pdf
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  GitBranch, Users, Download, Mail, ArrowUpRight, ExternalLink, Snowflake,
  MountainSnow, Wallet, ShieldCheck, KeyRound, TrendingUp, Cpu, Printer,
  GraduationCap, Terminal, Ruler, Layers, Repeat, Sigma, Target, Activity,
  Coins, MapPin, Code, Blocks, Scale, ThermometerSun
} from 'lucide-react';

/* ── Icon shim: keeps call sites as <Ic n="wallet" /> ─────────────────────── */
const ICON_MAP = {
  gitBranch: GitBranch, users: Users, download: Download, mail: Mail,
  arrowUpRight: ArrowUpRight, externalLink: ExternalLink, snowflake: Snowflake,
  mountainSnow: MountainSnow, wallet: Wallet, shieldCheck: ShieldCheck,
  keyRound: KeyRound, barChart: TrendingUp, cpu: Cpu, printer: Printer,
  graduationCap: GraduationCap, terminal: Terminal, ruler: Ruler, layers: Layers,
  repeat: Repeat, sigma: Sigma, target: Target, activity: Activity, coins: Coins,
  mapPin: MapPin, codeXml: Code, blocks: Blocks, scale: Scale, thermometer: ThermometerSun
};

function Ic({ n, size = 18, className = '', style }) {
  const C = ICON_MAP[n];
  if (!C) return null;
  return <C size={size} strokeWidth={1.7} className={className} style={style} aria-hidden="true" />;
}

/* ── Design tokens + component styles (kept in-file so this stays drop-in) ── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@75..125,400..800&family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600&display=swap');

:root{
  --void:#070A0F;
  --surface:#0C1119;
  --raised:#111925;
  --raised-2:#16202D;
  --line:#1B2634;
  --line-soft:#141C27;
  --snow:#EDF3F8;
  --mute:#8296AB;
  --dim:#5A6B7E;
  --ice:#5DE7F0;
  --ice-deep:#1E93A3;
  --glow:rgba(93,231,240,.10);
  --alpenglow:#FF9366;
}

html{scroll-behavior:smooth;}
body{
  background:var(--void);
  color:var(--snow);
  font-family:'IBM Plex Sans',ui-sans-serif,system-ui,-apple-system,'Segoe UI',sans-serif;
  -webkit-font-smoothing:antialiased;
  overflow-x:hidden;
}
::selection{background:rgba(93,231,240,.25);color:#fff;}

.display{
  font-family:'Archivo','Archivo Expanded',ui-sans-serif,system-ui,sans-serif;
  font-variation-settings:'wdth' 116;
  font-weight:800;
  letter-spacing:-.005em;
  text-wrap:balance;
}
.display-med{
  font-family:'Archivo',ui-sans-serif,system-ui,sans-serif;
  font-variation-settings:'wdth' 108;
  font-weight:700;
  text-wrap:balance;
}
.mono{font-family:'IBM Plex Mono',ui-monospace,SFMono-Regular,Menlo,monospace;font-variant-numeric:tabular-nums;}

.ice{color:var(--ice);}
.mute{color:var(--mute);}
.dim{color:var(--dim);}
.hair{border-color:var(--line);}

.eyebrow{
  font-family:'IBM Plex Mono',ui-monospace,monospace;
  font-size:.68rem;
  letter-spacing:.2em;
  text-transform:uppercase;
  color:var(--ice);
  display:flex;
  align-items:center;
  gap:.75rem;
}
.eyebrow::after{
  content:"";
  flex:1;
  height:1px;
  background:linear-gradient(90deg,var(--line) 0%,rgba(27,38,52,0) 100%);
}

.panel{
  background:var(--raised);
  border:1px solid var(--line);
  border-radius:2px;
}

.card{
  position:relative;
  background:linear-gradient(180deg,var(--raised) 0%,var(--surface) 100%);
  border:1px solid var(--line);
  border-radius:3px;
  transition:transform .45s cubic-bezier(.2,.7,.3,1),border-color .45s ease,box-shadow .45s ease;
}
.card:hover{
  transform:translateY(-5px);
  border-color:var(--ice-deep);
  box-shadow:0 24px 60px -30px rgba(93,231,240,.35),0 0 0 1px rgba(93,231,240,.06);
}
.card::before{
  content:"";
  position:absolute;
  inset:0;
  border-radius:3px;
  background:radial-gradient(120% 80% at 85% 0%,var(--glow) 0%,rgba(0,0,0,0) 60%);
  opacity:0;
  transition:opacity .45s ease;
  pointer-events:none;
}
.card:hover::before{opacity:1;}

.tag{
  font-family:'IBM Plex Mono',ui-monospace,monospace;
  font-size:.7rem;
  letter-spacing:.04em;
  color:var(--mute);
  border:1px solid var(--line);
  background:rgba(93,231,240,.03);
  padding:.28rem .5rem;
  border-radius:2px;
  transition:color .25s ease,border-color .25s ease,background .25s ease;
  white-space:nowrap;
}
.tag:hover{color:var(--ice);border-color:var(--ice-deep);background:rgba(93,231,240,.08);}

.btn{
  display:inline-flex;
  align-items:center;
  gap:.6rem;
  font-family:'IBM Plex Mono',ui-monospace,monospace;
  font-size:.8rem;
  letter-spacing:.06em;
  text-transform:uppercase;
  padding:.85rem 1.2rem;
  border-radius:2px;
  border:1px solid var(--line);
  color:var(--snow);
  background:var(--raised);
  transition:transform .3s cubic-bezier(.2,.7,.3,1),border-color .3s ease,color .3s ease,background .3s ease,box-shadow .3s ease;
}
.btn:hover{transform:translateY(-2px);border-color:var(--ice-deep);color:var(--ice);background:var(--raised-2);}
.btn-ice{
  background:var(--ice);
  color:#04252A;
  border-color:var(--ice);
  font-weight:600;
}
.btn-ice:hover{
  background:#7DF0F7;
  color:#04252A;
  border-color:#7DF0F7;
  box-shadow:0 14px 34px -14px rgba(93,231,240,.7);
}
.btn:focus-visible,a:focus-visible,button:focus-visible,input:focus-visible{
  outline:2px solid var(--ice);
  outline-offset:3px;
}

.link-inline{
  color:var(--mute);
  border-bottom:1px solid var(--line);
  transition:color .25s ease,border-color .25s ease;
}
.link-inline:hover{color:var(--ice);border-color:var(--ice-deep);}

.spec{
  display:grid;
  border-top:1px solid var(--line);
  border-left:1px solid var(--line);
}
.spec > div{
  border-right:1px solid var(--line);
  border-bottom:1px solid var(--line);
  padding:.7rem .8rem;
}
.spec-k{
  font-family:'IBM Plex Mono',ui-monospace,monospace;
  font-size:.6rem;
  letter-spacing:.16em;
  text-transform:uppercase;
  color:var(--dim);
}
.spec-v{
  font-family:'IBM Plex Mono',ui-monospace,monospace;
  font-size:.95rem;
  color:var(--snow);
  font-variant-numeric:tabular-nums;
  margin-top:.2rem;
}

.feat{
  display:flex;
  gap:.7rem;
  padding:.55rem 0;
  border-bottom:1px dashed var(--line-soft);
  color:var(--mute);
  font-size:.9rem;
  line-height:1.55;
}
.feat:last-child{border-bottom:0;}
.feat svg{color:var(--ice-deep);flex:none;margin-top:.22rem;}

input[type="range"]{
  -webkit-appearance:none;appearance:none;
  width:100%;height:2px;background:var(--line);border-radius:2px;outline:none;cursor:pointer;
}
input[type="range"]::-webkit-slider-thumb{
  -webkit-appearance:none;appearance:none;
  width:15px;height:15px;border-radius:50%;
  background:var(--ice);border:3px solid var(--surface);
  box-shadow:0 0 0 1px var(--ice-deep),0 0 14px rgba(93,231,240,.6);
  cursor:grab;
}
input[type="range"]::-moz-range-thumb{
  width:15px;height:15px;border-radius:50%;
  background:var(--ice);border:3px solid var(--surface);
  box-shadow:0 0 0 1px var(--ice-deep);cursor:grab;
}

.seg{
  font-family:'IBM Plex Mono',ui-monospace,monospace;
  font-size:.66rem;letter-spacing:.08em;text-transform:uppercase;white-space:nowrap;
  padding:.42rem .3rem;border:1px solid var(--line);border-radius:2px;
  color:var(--dim);background:transparent;
  transition:color .2s ease,border-color .2s ease,background .2s ease;
}
.seg:hover{color:var(--mute);border-color:var(--ice-deep);}
.seg[data-on="1"]{color:var(--ice);border-color:var(--ice-deep);background:rgba(93,231,240,.09);}

.skibar{
  height:6px;border-radius:3px;
  background:linear-gradient(90deg,var(--ice-deep) 0%,var(--ice) 100%);
  box-shadow:0 0 18px rgba(93,231,240,.35);
  transition:width .5s cubic-bezier(.2,.7,.3,1);
}

.reveal{opacity:1;transform:none;}
.js .reveal{opacity:0;transform:translateY(16px);transition:opacity .7s ease,transform .7s cubic-bezier(.2,.7,.3,1);}
.js .reveal.in{opacity:1;transform:none;}

@keyframes riseIn{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:none;}}
.rise{animation:riseIn .8s cubic-bezier(.2,.7,.3,1) both;}

@media (prefers-reduced-motion: reduce){
  html{scroll-behavior:auto;}
  *,*::before,*::after{animation-duration:.001ms !important;transition-duration:.001ms !important;}
  .js .reveal{opacity:1;transform:none;}
}

.tl-row{
  display:grid;
  gap:.35rem 1.5rem;
  padding:1.15rem 0;
  border-bottom:1px solid var(--line-soft);
  transition:background .3s ease,padding-left .3s ease;
}
.tl-row:hover{background:rgba(93,231,240,.025);padding-left:.6rem;}
@media (min-width:768px){
  .tl-row{grid-template-columns:210px 1fr;}
}
`;

/* ── Contour field: iso-lines of a mixture of bivariate Gaussians.
      Reads as a topographic map and as a density plot, which is the whole point. ── */
function ContourField() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cell = 15;
    const peaks = [
      { x: .58, y: .30, s: .095, a: 1.05 },
      { x: .70, y: .58, s: .130, a: 1.18 },
      { x: .86, y: .34, s: .085, a: 0.92 },
      { x: .93, y: .70, s: .110, a: 0.80 },
      { x: .46, y: .78, s: .105, a: 0.86 },
      { x: .22, y: .52, s: .120, a: 0.70 },
      { x: .05, y: .88, s: .140, a: 0.62 }
    ];
    let w = 0, h = 0, cols = 0, rows = 0, field = null, raf = 0, last = 0;

    function resize() {
      const r = canvas.getBoundingClientRect();
      w = Math.max(1, Math.round(r.width));
      h = Math.max(1, Math.round(r.height));
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / cell);
      rows = Math.ceil(h / cell);
      field = new Float32Array((cols + 1) * (rows + 1));
    }

    function compute(t) {
      const s = cols + 1;
      for (let j = 0; j <= rows; j++) {
        const py = (j * cell) / h;
        for (let i = 0; i <= cols; i++) {
          const px = (i * cell) / w;
          let v = 0;
          for (let k = 0; k < peaks.length; k++) {
            const p = peaks[k];
            const cx = p.x + Math.sin(t * 0.00007 * (k + 1) + k * 1.7) * 0.035;
            const cy = p.y + Math.cos(t * 0.00005 * (k + 1.6) + k * 2.1) * 0.028;
            const dx = px - cx, dy = (py - cy) * 0.62;
            v += p.a * Math.exp(-(dx * dx + dy * dy) / (2 * p.s * p.s));
          }
          field[j * s + i] = v;
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      const s = cols + 1;
      const levels = 13;
      for (let L = 1; L <= levels; L++) {
        const lv = (L / (levels + 1)) * 1.22;
        ctx.beginPath();
        for (let j = 0; j < rows; j++) {
          for (let i = 0; i < cols; i++) {
            const v0 = field[j * s + i], v1 = field[j * s + i + 1];
            const v2 = field[(j + 1) * s + i + 1], v3 = field[(j + 1) * s + i];
            let id = 0;
            if (v0 > lv) id |= 8;
            if (v1 > lv) id |= 4;
            if (v2 > lv) id |= 2;
            if (v3 > lv) id |= 1;
            if (id === 0 || id === 15) continue;
            const x = i * cell, y = j * cell;
            const tx = x + cell * (lv - v0) / (v1 - v0);
            const ry = y + cell * (lv - v1) / (v2 - v1);
            const bx = x + cell * (lv - v3) / (v2 - v3);
            const ly = y + cell * (lv - v0) / (v3 - v0);
            switch (id) {
              case 1: case 14: ctx.moveTo(x, ly); ctx.lineTo(bx, y + cell); break;
              case 2: case 13: ctx.moveTo(bx, y + cell); ctx.lineTo(x + cell, ry); break;
              case 3: case 12: ctx.moveTo(x, ly); ctx.lineTo(x + cell, ry); break;
              case 4: case 11: ctx.moveTo(tx, y); ctx.lineTo(x + cell, ry); break;
              case 6: case 9: ctx.moveTo(tx, y); ctx.lineTo(bx, y + cell); break;
              case 7: case 8: ctx.moveTo(x, ly); ctx.lineTo(tx, y); break;
              case 5: ctx.moveTo(tx, y); ctx.lineTo(x, ly); ctx.moveTo(bx, y + cell); ctx.lineTo(x + cell, ry); break;
              case 10: ctx.moveTo(tx, y); ctx.lineTo(x + cell, ry); ctx.moveTo(x, ly); ctx.lineTo(bx, y + cell); break;
              default: break;
            }
          }
        }
        const f = L / levels;
        ctx.strokeStyle = 'rgba(93,231,240,' + (0.07 + f * 0.42).toFixed(3) + ')';
        ctx.lineWidth = f > 0.84 ? 1.15 : 0.7;
        ctx.stroke();
      }
    }

    function frame(now) {
      if (now - last > 34) {
        last = now;
        compute(now);
        draw();
      }
      raf = requestAnimationFrame(frame);
    }

    resize();
    compute(0);
    draw();
    if (!reduce) raf = requestAnimationFrame(frame);

    const onResize = () => { resize(); compute(performance.now()); draw(); };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" />;
}

/* ── Reveal on scroll, with a guaranteed unlock so nothing can stay hidden ── */
function useReveal() {
  useEffect(() => {
    document.documentElement.classList.add('js');
    const els = Array.from(document.querySelectorAll('.reveal'));
    const show = (el) => el.classList.add('in');
    if (!('IntersectionObserver' in window)) { els.forEach(show); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    els.forEach((el) => io.observe(el));
    const failsafe = setTimeout(() => {
      if (!document.querySelector('.reveal.in')) els.forEach(show);
    }, 1800);
    return () => { io.disconnect(); clearTimeout(failsafe); };
  }, []);
}

/* ── The length model: a simplified read of the sizing logic behind Freezed ── */
const STYLES = [
  { id: 'park', label: 'Park', short: 'Park', shift: -6, waist: 88 },
  { id: 'all', label: 'All-mountain', short: 'All', shift: 0, waist: 98 },
  { id: 'pow', label: 'Powder', short: 'Pow', shift: 8, waist: 112 }
];
const ABILITY = [
  { id: 'beg', label: 'Beginner', shift: -8 },
  { id: 'int', label: 'Intermediate', shift: 0 },
  { id: 'adv', label: 'Advanced', shift: 6 }
];

function LengthModel() {
  const [height, setHeight] = useState(178);
  const [weight, setWeight] = useState(72);
  const [style, setStyle] = useState('all');
  const [abil, setAbil] = useState('int');

  const st = STYLES.find((s) => s.id === style);
  const ab = ABILITY.find((a) => a.id === abil);

  const base = height - 12;
  const mass = Math.max(-6, Math.min(6, Math.round((weight - (height - 110)) / 4)));
  const raw = base + st.shift + ab.shift + mass;
  const length = Math.max(140, Math.min(195, Math.round(raw)));
  const fill = 26 + ((length - 140) / 55) * 74;

  const terms = [
    { k: 'Base — height', v: base, unit: 'cm' },
    { k: 'Style — ' + st.label.toLowerCase(), v: st.shift, unit: 'cm' },
    { k: 'Ability — ' + ab.label.toLowerCase(), v: ab.shift, unit: 'cm' },
    { k: 'Body mass', v: mass, unit: 'cm' }
  ];
  const sign = (n) => (n > 0 ? '+' + n : String(n));

  return (
    <div className="panel p-5">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="mono text-[.62rem] tracking-[.18em] uppercase dim">Length model</div>
        <Ic n="ruler" size={15} className="ice" />
      </div>

      <div className="grid grid-cols-2 gap-x-5 gap-y-4 mb-5">
        <label className="block">
          <span className="mono text-[.62rem] tracking-[.14em] uppercase dim">Height</span>
          <span className="mono block text-sm mb-2" style={{ color: 'var(--snow)' }}>{height} cm</span>
          <input type="range" min="150" max="200" value={height} aria-label="Height in centimetres"
            onChange={(e) => setHeight(+e.target.value)} />
        </label>
        <label className="block">
          <span className="mono text-[.62rem] tracking-[.14em] uppercase dim">Weight</span>
          <span className="mono block text-sm mb-2" style={{ color: 'var(--snow)' }}>{weight} kg</span>
          <input type="range" min="40" max="115" value={weight} aria-label="Weight in kilograms"
            onChange={(e) => setWeight(+e.target.value)} />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-x-5 gap-y-3 mb-5">
        <div>
          <div className="mono text-[.62rem] tracking-[.14em] uppercase dim mb-2">Riding style</div>
          <div className="grid grid-cols-3 gap-1">
            {STYLES.map((s) => (
              <button key={s.id} className="seg" data-on={style === s.id ? '1' : '0'}
                onClick={() => setStyle(s.id)}>{s.short}</button>
            ))}
          </div>
        </div>
        <div>
          <div className="mono text-[.62rem] tracking-[.14em] uppercase dim mb-2">Ability</div>
          <div className="grid grid-cols-3 gap-1">
            {ABILITY.map((a) => (
              <button key={a.id} className="seg" data-on={abil === a.id ? '1' : '0'}
                onClick={() => setAbil(a.id)}>{a.label.slice(0, 3)}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-4" style={{ borderTop: '1px solid var(--line)' }}>
        {terms.map((t) => (
          <div key={t.k} className="flex items-baseline justify-between py-[.3rem]">
            <span className="mono text-[.7rem] mute">{t.k}</span>
            <span className="mono text-[.78rem]" style={{ color: t.v === 0 ? 'var(--dim)' : 'var(--snow)' }}>
              {t.k.startsWith('Base') ? t.v : sign(t.v)} {t.unit}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="flex items-end justify-between mb-3">
          <div>
            <div className="mono text-[.62rem] tracking-[.16em] uppercase dim">Recommended</div>
            <div className="display text-4xl mt-1" style={{ color: 'var(--ice)' }}>
              {length}<span className="text-lg mute ml-1">cm</span>
            </div>
          </div>
          <div className="text-right">
            <div className="mono text-[.62rem] tracking-[.16em] uppercase dim">Waist</div>
            <div className="mono text-xl mt-1" style={{ color: 'var(--snow)' }}>{st.waist}<span className="text-xs mute ml-1">mm</span></div>
          </div>
        </div>
        <div style={{ background: 'var(--line-soft)', height: 6, borderRadius: 3 }}>
          <div className="skibar" style={{ width: fill + '%' }} />
        </div>
        <p className="mono text-[.63rem] dim mt-3 leading-relaxed">
          Simplified illustration of the sizing logic. The live matcher scores a full catalogue on top of this.
        </p>
      </div>
    </div>
  );
}

/* ── Sections ───────────────────────────────────────────────────────────── */
function Nav() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const links = [['Projects', '#projects'], ['About', '#about'], ['Toolkit', '#toolkit'], ['Contact', '#contact']];
  return (
    <nav className="sticky top-0 z-50 w-full" style={{
      background: solid ? 'rgba(7,10,15,.86)' : 'transparent',
      backdropFilter: solid ? 'blur(12px)' : 'none',
      borderBottom: solid ? '1px solid var(--line)' : '1px solid transparent',
      transition: 'background .35s ease, border-color .35s ease'
    }}>
      <div className="mx-auto flex max-w-[1120px] items-center justify-between px-6 py-4">
        <a href="#top" className="mono text-[.75rem] tracking-[.22em] uppercase" style={{ color: 'var(--snow)' }}>
          E.YU<span className="ice"> /</span> STAT
        </a>
        <div className="hidden items-center gap-7 md:flex">
          {links.map(([l, h]) => (
            <a key={h} href={h} className="mono text-[.72rem] tracking-[.14em] uppercase mute hover:text-white transition-colors">{l}</a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span style={{ width: 6, height: 6, borderRadius: 99, background: 'var(--ice)', boxShadow: '0 0 10px var(--ice)' }} />
          <span className="mono text-[.65rem] tracking-[.14em] uppercase dim">Toronto</span>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <header id="top" className="relative overflow-hidden" style={{ borderBottom: '1px solid var(--line)' }}>
      <div className="absolute inset-0" aria-hidden="true">
        <ContourField />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(90deg, rgba(7,10,15,.94) 0%, rgba(7,10,15,.90) 38%, rgba(7,10,15,.42) 66%, rgba(7,10,15,.20) 100%)'
        }} />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, rgba(7,10,15,.55) 0%, rgba(7,10,15,0) 26%, rgba(7,10,15,0) 62%, var(--void) 100%)'
        }} />
      </div>

      <div className="relative mx-auto max-w-[1120px] px-6 pt-16 pb-16 md:pt-24 md:pb-20">
        <div className="rise mono text-[.68rem] tracking-[.22em] uppercase ice flex items-center gap-2" style={{ animationDelay: '.05s' }}>
          <Ic n="mapPin" size={13} /> Toronto, ON · York University
        </div>

        <h1 className="rise display mt-5 leading-[.88] text-[clamp(3.2rem,12vw,8.5rem)]" style={{ animationDelay: '.12s' }}>
          ERIC YU
        </h1>

        <div className="rise mt-6 flex flex-col gap-2 md:flex-row md:items-center md:gap-4" style={{ animationDelay: '.2s' }}>
          <p className="display-med text-[clamp(1.1rem,2.4vw,1.6rem)]" style={{ color: 'var(--snow)' }}>
            Statistics Undergraduate <span className="ice">&</span> Data Analyst
          </p>
        </div>

        <p className="rise mt-5 max-w-[54ch] text-[1.05rem] leading-relaxed mute" style={{ animationDelay: '.26s' }}>
          Building statistical models, interactive web tools, and data-driven applications —
          the kind that turn a messy set of inputs into one number you can act on.
        </p>

        <div className="rise mt-9 flex flex-wrap gap-3" style={{ animationDelay: '.34s' }}>
          <a className="btn btn-ice" href="/Eric_Yu_Resume.pdf" download>
            <Ic n="download" size={16} /> Download Resume
          </a>
          <a className="btn" href="https://github.com/ericyu1128" target="_blank" rel="noopener noreferrer">
            <Ic n="gitBranch" size={16} /> GitHub <Ic n="arrowUpRight" size={13} className="dim" />
          </a>
          <a className="btn" href="https://www.linkedin.com/in/ericyu1128" target="_blank" rel="noopener noreferrer">
            <Ic n="users" size={16} /> LinkedIn <Ic n="arrowUpRight" size={13} className="dim" />
          </a>
        </div>

        <div className="rise mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 mono text-[.68rem] tracking-[.13em] uppercase"
          style={{ animationDelay: '.42s', color: 'var(--dim)', paddingTop: '1.25rem', borderTop: '1px solid var(--line)' }}>
          <span>Sep 2025 → Apr 2029 · B.A. Statistics</span>
          <span className="hidden sm:inline" style={{ color: 'var(--line)' }}>│</span>
          <span>Now · Faculty of Science Student Ambassador</span>
          <span className="hidden sm:inline" style={{ color: 'var(--line)' }}>│</span>
          <span className="ice">2 projects shipped &amp; live</span>
        </div>
      </div>
    </header>
  );
}

function Feature({ icon, children }) {
  return (
    <li className="feat">
      <Ic n={icon} size={15} />
      <span>{children}</span>
    </li>
  );
}

function SpecStrip({ items }) {
  return (
    <div className="spec" style={{ gridTemplateColumns: 'repeat(2, minmax(0,1fr))' }}>
      {items.map((it) => (
        <div key={it.k}>
          <div className="spec-k">{it.k}</div>
          <div className="spec-v">{it.v}</div>
        </div>
      ))}
    </div>
  );
}

function ProjectCard({ p }) {
  return (
    <article className="card reveal p-6 md:p-9">
      <div className="grid gap-9 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="flex flex-wrap items-center gap-3">
            <Ic n={p.icon} size={20} className="ice" />
            <h3 className="display text-3xl md:text-[2.6rem] leading-none">{p.name}</h3>
            <a href={p.site} target="_blank" rel="noopener noreferrer"
              className="mono text-[.72rem] tracking-[.1em] link-inline">{p.domain}</a>
          </div>

          <p className="mt-5 text-[1.02rem] leading-relaxed" style={{ color: 'var(--snow)' }}>{p.lede}</p>
          <p className="mt-4 leading-relaxed mute">{p.body}</p>

          <div className="mt-7">
            <div className="mono text-[.62rem] tracking-[.18em] uppercase dim mb-1">Key features</div>
            <ul>{p.features.map((f, i) => <Feature key={i} icon={f[0]}>{f[1]}</Feature>)}</ul>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-6">
          <div>
            <div className="mono text-[.62rem] tracking-[.18em] uppercase dim mb-3">At a glance</div>
            <SpecStrip items={p.spec} />
          </div>

          {p.extra}

          <div>
            <div className="mono text-[.62rem] tracking-[.18em] uppercase dim mb-3">Stack</div>
            <div className="flex flex-wrap gap-1.5">
              {p.stack.map((t) => <span key={t} className="tag">{t}</span>)}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-auto">
            <a className="btn" href={p.site} target="_blank" rel="noopener noreferrer">
              <Ic n="externalLink" size={15} /> Live site
            </a>
            <a className="btn" href={p.repo} target="_blank" rel="noopener noreferrer">
              <Ic n="gitBranch" size={15} /> Source
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

const PROJECTS = [
  {
    name: 'Freezed',
    domain: 'freezed.xyz',
    site: 'https://freezed.xyz',
    repo: 'https://github.com/ericyu1128/Freezed',
    icon: 'mountainSnow',
    lede: 'A ski and snowboard gear matcher that turns body metrics, ability and conditions into a real spec sheet — then scores a catalogue against it.',
    body: 'You give it height, weight, ability, riding style, expected temperature and budget. It computes target ski or board length, waist width, boot flex, goggle lens VLT and jacket insulation, then ranks every item in the catalogue against that profile. Height sets the base length, riding style shifts it 3–10 cm, ability adds or removes up to 8 cm, and body mass fine-tunes by ±6 cm. Budget acts as a hard filter with exact-tier matches weighted heavily; conditions drive optics and insulation on their own axis. The point was to kill the zero-result search — you always leave with a ranked setup and the reasoning behind it.',
    features: [
      ['sigma', 'Weighted probabilistic scoring over 50+ user and equipment parameters, normalised to a 0–100 confidence score with ranked runners-up.'],
      ['target', 'A deterministic matcher — the same profile always returns the same spec sheet, which makes the model testable rather than magic.'],
      ['activity', 'An interactive SVG loadout visualiser: five body zones light up as helmet, goggles, jacket, boots and skis lock in.'],
      ['ruler', 'Products are drawn, not photographed. Specs drive the render, so a 72 mm carver is visibly narrower than a 118 mm powder ski.'],
      ['repeat', 'Retailer links are generated at request time across Evo, REI, Sport Chek, Backcountry and The House — nothing stored, nothing to rot.'],
      ['thermometer', 'Bilingual EN / ZH interface, built on 2025/26 season data.']
    ],
    spec: [
      { k: 'Catalogue', v: '58 items' },
      { k: 'Brands', v: '11' },
      { k: 'Categories', v: '6' },
      { k: 'Budget tiers', v: '3' }
    ],
    stack: ['Next.js 14', 'App Router', 'TypeScript (strict)', 'Tailwind CSS 3.4', 'SVG', 'Vercel'],
    extra: <LengthModel />
  },
  {
    name: 'CryptoVault',
    domain: 'cryptovault.site',
    site: 'https://cryptovault.site',
    repo: 'https://github.com/ericyu1128/cryptovault',
    icon: 'wallet',
    lede: 'A client-side-only multi-chain wallet: one recovery phrase, five independent key trees, and no backend to trust.',
    body: 'A self-custodial browser wallet spanning Bitcoin, Ethereum, BNB Smart Chain, Solana, XRP Ledger and TON. A single BIP-39 phrase derives five independent key trees, and every signature happens in the tab — there is no server, and no telemetry. Each chain implements one common adapter interface for balance queries, transaction building and signing, and the adapters are code-split so the initial bundle stays small no matter how many chains are supported.',
    features: [
      ['shieldCheck', 'Keys never leave the device. The vault is encrypted with AES-256-GCM and the password stretched with PBKDF2-SHA256.'],
      ['keyRound', 'Private keys are derived fresh for each operation and discarded the moment signing finishes.'],
      ['coins', 'Native sends including Bitcoin UTXO selection, plus ERC-20 tokens on EVM chains and SPL tokens on Solana.'],
      ['blocks', 'One-click ERC-20 deployment on top of OpenZeppelin’s standard implementation.'],
      ['repeat', 'Swaps routed through 0x on Ethereum and BSC, Jupiter on Solana, with a transparent 0.5% fee.'],
      ['scale', 'Every amount is held as a bigint in native units — sats, wei, lamports — so floating-point drift is impossible.'],
      ['terminal', 'Tested against published derivation vectors, local EVM nodes, swap fee maths and Playwright end-to-end runs — none of which need a private key.']
    ],
    spec: [
      { k: 'Chains', v: '6' },
      { k: 'Seed → key trees', v: '1 → 5' },
      { k: 'Vault crypto', v: 'AES-256-GCM' },
      { k: 'Backend calls', v: '0' }
    ],
    stack: ['Next.js', 'React', 'Tailwind CSS v4', 'Zustand', '@scure/bip39', '@scure/bip32', '@noble/curves', '@scure/btc-signer', 'ethers', '@solana/web3.js', 'xrpl', '@ton/ton', 'Playwright'],
    extra: null
  }
];

function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-[1120px] px-6 py-20 md:py-28">
      <div className="eyebrow reveal">Projects</div>
      <h2 className="display-med reveal mt-5 text-[clamp(1.8rem,4vw,2.8rem)] leading-tight max-w-[22ch]">
        Two things I built end to end, both live.
      </h2>
      <div className="mt-12 flex flex-col gap-8">
        {PROJECTS.map((p) => <ProjectCard key={p.name} p={p} />)}
      </div>
    </section>
  );
}

function About() {
  const facts = [
    ['graduationCap', 'B.A. Statistics, York University — second year'],
    ['users', 'Faculty of Science Student Ambassador'],
    ['cpu', 'AI co-pilots as a standing part of the workflow'],
    ['snowflake', 'Freestyle skier'],
    ['printer', '3D printing']
  ];
  return (
    <section id="about" className="mx-auto max-w-[1120px] px-6 py-20 md:py-28" style={{ borderTop: '1px solid var(--line)' }}>
      <div className="eyebrow reveal">About</div>
      <div className="mt-8 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7 reveal">
          <p className="text-[1.15rem] leading-[1.75]" style={{ color: 'var(--snow)' }}>
            I&rsquo;m a second-year Statistics major at York University, where I also serve as a
            Faculty of Science Student Ambassador — which mostly means answering the questions I was
            asking a year ago.
          </p>
          <p className="mt-5 leading-[1.8] mute">
            Most of what I build starts as a statistics problem and ends as something you can click.
            Freezed began as a sizing formula and grew into a full matching engine; CryptoVault started
            as a question about key derivation and turned into a wallet that never phones home. I lean
            on AI co-pilots as a standing part of my workflow — for web development, architecture and
            scaffolding — which keeps my own hours on the parts that actually decide whether a project
            is any good: the model, the data, and the edge cases.
          </p>
          <p className="mt-5 leading-[1.8] mute">
            Off the clock I&rsquo;m a freestyle skier — the reason Freezed exists at all — and I
            3D print. Both are the same loop as the work: build to a spec, take it out, find where it
            fails, adjust the spec.
          </p>
        </div>
        <div className="lg:col-span-5 reveal">
          <div className="panel p-6">
            <div className="mono text-[.62rem] tracking-[.18em] uppercase dim mb-4">In short</div>
            <ul className="flex flex-col">
              {facts.map(([ic, t]) => (
                <li key={t} className="feat" style={{ color: 'var(--snow)' }}>
                  <Ic n={ic} size={15} />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

const SKILLS = [
  { icon: 'barChart', head: 'Data & Analytics', items: ['Data Modeling', 'Probabilistic Scoring', 'Algorithmic Logic', 'Statistical Analysis', 'Data Visualization'] },
  { icon: 'codeXml', head: 'Languages & Databases', items: ['SQL', 'Python', 'R (ggplot2, dplyr)', 'TypeScript', 'Git'] },
  { icon: 'layers', head: 'Frameworks & Tools', items: ['Next.js', 'Tailwind CSS', 'Vercel', 'Excel'] },
  { icon: 'sigma', head: 'Coursework', items: ['Statistical Modeling', 'Probability Distributions', 'Data Processing & Hygiene', 'Applied Mathematical Computing'] }
];

function Toolkit() {
  return (
    <section id="toolkit" className="mx-auto max-w-[1120px] px-6 py-20 md:py-28" style={{ borderTop: '1px solid var(--line)' }}>
      <div className="eyebrow reveal">Toolkit</div>
      <div className="mt-10 grid gap-px sm:grid-cols-2" style={{ background: 'var(--line)', border: '1px solid var(--line)' }}>
        {SKILLS.map((g) => (
          <div key={g.head} className="reveal p-7" style={{ background: 'var(--surface)' }}>
            <div className="flex items-center gap-2.5">
              <Ic n={g.icon} size={16} className="ice" />
              <h3 className="display-med text-lg">{g.head}</h3>
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {g.items.map((i) => <span key={i} className="tag">{i}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const TIMELINE = [
  {
    when: 'Jul 2026 → Sep 2026', where: 'Camp STEAM · Vancouver, BC', role: 'Technical Specialist', icon: 'cpu',
    note: 'Ran daily technical operations and led technology programming for groups of 20+ youth, translating technical logic and data structures into something a twelve-year-old will actually sit through. Evaluated and troubleshot hardware and software to keep sessions running.'
  },
  {
    when: 'Sep 2026 → Apr 2027', where: 'York University, Faculty of Science', role: 'Student Ambassador', icon: 'users',
    note: 'Selected as a departmental representative for campus showcase events — walking prospective students through program pathways, running Q&A sessions and tours.'
  },
  {
    when: 'Oct 2025 → Apr 2026', where: 'York University Ski & Snowboard Club', role: 'First-Year Representative', icon: 'snowflake',
    note: 'Organised trips and club events end to end, and read engagement and feedback data to schedule the next ones better.'
  },
  {
    when: 'Sep 2025 → Apr 2029', where: 'York University · Toronto, ON', role: 'B.A. Statistics', icon: 'graduationCap',
    note: 'Statistical modeling, probability distributions, data processing and hygiene, applied mathematical computing.'
  }
];

function Timeline() {
  return (
    <section className="mx-auto max-w-[1120px] px-6 py-20 md:py-28" style={{ borderTop: '1px solid var(--line)' }}>
      <div className="eyebrow reveal">Experience &amp; Leadership</div>
      <div className="mt-8">
        {TIMELINE.map((t) => (
          <div key={t.where} className="tl-row reveal">
            <div className="mono text-[.7rem] tracking-[.1em] uppercase" style={{ color: 'var(--ice)' }}>
              {t.when}
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <Ic n={t.icon} size={15} className="dim" />
                <h3 className="display-med text-[1.05rem]">{t.role}</h3>
              </div>
              <div className="mono text-[.72rem] mute mt-1">{t.where}</div>
              <p className="mt-2 max-w-[62ch] text-[.93rem] leading-relaxed mute">{t.note}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden" style={{ borderTop: '1px solid var(--line)' }}>
      <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28">
        <div className="eyebrow reveal">Contact</div>
        <h2 className="display reveal mt-6 text-[clamp(2rem,6vw,4rem)] leading-[.95] max-w-[16ch]">
          LET&rsquo;S BUILD SOMETHING<span className="ice">.</span>
        </h2>
        <p className="reveal mt-6 max-w-[52ch] leading-relaxed mute">
          Email is the fastest way to reach me — for data work, a project, or a question about
          anything on this page.
        </p>
        <div className="reveal mt-9 flex flex-wrap gap-3">
          <a className="btn btn-ice" href="mailto:ericyu112807@gmail.com">
            <Ic n="mail" size={16} /> ericyu112807@gmail.com
          </a>
          <a className="btn" href="https://www.linkedin.com/in/ericyu1128" target="_blank" rel="noopener noreferrer">
            <Ic n="users" size={16} /> LinkedIn
          </a>
          <a className="btn" href="https://github.com/ericyu1128" target="_blank" rel="noopener noreferrer">
            <Ic n="gitBranch" size={16} /> GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--line)' }}>
      <div className="mx-auto flex max-w-[1120px] flex-col gap-3 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="mono text-[.68rem] tracking-[.14em] uppercase dim">
          Eric Yu · Toronto, ON · {new Date().getFullYear()}
        </div>
        <div className="mono text-[.68rem] tracking-[.14em] uppercase dim flex items-center gap-2">
          <Ic n="snowflake" size={12} className="ice" /> Built with Next.js &amp; Tailwind
        </div>
      </div>
    </footer>
  );
}

export default function Portfolio() {
  useReveal();
  return (
    <div style={{ background: 'var(--void)' }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <Nav />
      <Hero />
      <main>
        <Projects />
        <About />
        <Toolkit />
        <Timeline />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
