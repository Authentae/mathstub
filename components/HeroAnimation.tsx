'use client';

import { useEffect, useRef } from 'react';

/**
 * HeroAnimation — inlined 12-second autoplay loop.
 *
 * Source: Claude Design P2 (Mathstub Hero Animation). Originally
 * embedded as an <iframe> pointing at /public/hero/, but the iframe
 * approach kept hitting browser/CDN cache issues (visitors saw a stale
 * transparent-bg version, or a blank rectangle after the cache-bust
 * version-flag change). Inlining the markup + CSS + JS into the
 * component eliminates the cross-origin iframe sandbox entirely:
 * everything ships with the homepage HTML, animations start
 * immediately, no separate URL to cache.
 *
 * The CSS is embedded as a static string and scoped under
 * `.mathstub-hero` so its CSS-variable definitions and animation
 * keyframes don't leak into the rest of the site. The original
 * `:root { --bg, --brand, --warn, ... }` is rewritten to
 * `.mathstub-hero { ... }` and global `html, body { ... }` rules are
 * dropped — they're not needed inside the component's own surface.
 *
 * The tiny rAF counter that ticks $0 → $30,000 during scene 4 lives in
 * the useEffect below — same logic as the original public/hero/hero.js,
 * just keyed to this component's lifecycle instead of a global window
 * load handler.
 */
export function HeroAnimation() {
  const counterRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    // 12-second loop. The shortfall counter ticks from 0 to $30,000
    // during scene 4 (7.5s → 10s), then holds at $30,000 until the
    // scene fades out. Easing matches the CSS keyframe ease-io curve.
    const LOOP_MS = 12000;
    const COUNT_START = 0.68 * LOOP_MS; // 8160ms — scene 4 in
    const COUNT_END = 0.8 * LOOP_MS; //   9600ms — scene 4 peak
    const TARGET = 30000;
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const loopStart = performance.now();
    let raf = 0;
    let cancelled = false;

    const tick = (now: number) => {
      if (cancelled) return;
      const t = (now - loopStart) % LOOP_MS;
      let val = 0;
      if (t < COUNT_START) val = 0;
      else if (t >= COUNT_END) val = TARGET;
      else {
        const p = (t - COUNT_START) / (COUNT_END - COUNT_START);
        val = Math.round(TARGET * easeOut(p));
      }
      const el = counterRef.current;
      if (el) {
        const formatted = val.toLocaleString('en-US');
        if (el.dataset.v !== formatted) {
          el.dataset.v = formatted;
          el.textContent = formatted;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="mathstub-hero">
      <style dangerouslySetInnerHTML={{ __html: HERO_CSS }} />
      <div className="frame" data-format="landscape">
        <div className="stage">
          {/* Scene 1: big $200,000 fades in */}
          <div className="scene scene-1">
            <div className="hero-num">
              <span className="hero-num__sign">$</span>
              <span className="hero-num__val">200,000</span>
            </div>
            <p className="sub sub-1">Your RSUs just vested.</p>
          </div>

          {/* Scenes 2–4: bars + shortfall counter */}
          <div className="scene scene-bars">
            <div className="num-static">
              <span className="num-static__sign">$</span>200,000
            </div>

            <div className="bars">
              <div className="bar-row bar-row--withheld">
                <div className="bar-track">
                  <div className="bar-fill bar-fill--withheld" />
                </div>
                <div className="bar-meta">
                  <span className="bar-label">Withheld</span>
                  <span className="bar-pct">22%</span>
                </div>
              </div>

              <div className="bar-row bar-row--owed">
                <div className="bar-track">
                  <div className="bar-fill bar-fill--owed" />
                  <div className="bar-fill bar-fill--gap" />
                </div>
                <div className="bar-meta">
                  <span className="bar-label">Actually owed</span>
                  <span className="bar-pct">
                    ~37%
                    <span className="bar-pct__sub"> marginal</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="shortfall">
              <span className="shortfall__label">Shortfall owed at filing</span>
              <div className="shortfall__num">
                <span className="shortfall__sign">$</span>
                <span
                  className="shortfall__counter"
                  ref={counterRef}
                  aria-label="$30,000"
                />
              </div>
            </div>

            <p className="sub sub-2">But 22% is not your real tax rate.</p>
            <p className="sub sub-3">For high earners, the gap is wide.</p>
            <p className="sub sub-4">Owed at filing.</p>
          </div>

          {/* Scene 5: wordmark + CTA */}
          <div className="scene scene-5">
            <div className="logo">
              <span className="logo__mark">
                <svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M6 16 L10 10 L14 14 L18 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" />
                </svg>
              </span>
              <span className="logo__word">mathstub</span>
            </div>
            <a className="cta" href="/rsu-tax-shortfall">
              <span>Run your numbers in 30 seconds</span>
              <span className="cta__arrow" aria-hidden="true">→</span>
            </a>
            <p className="footnote">Free · No signup · Math runs in your browser</p>
          </div>

          {/* Persistent footer chrome */}
          <div className="chrome">
            <div className="chrome__left">
              <span className="dot" />
              <span>mathstub.com</span>
            </div>
            <div className="chrome__right">
              <span className="chrome__cite">Source: IRS §3402 supplemental withholding · 2025 brackets</span>
            </div>
          </div>

          {/* Scene counter (CSS-driven) */}
          <div className="ticker" aria-hidden="true">
            <span className="ticker__n" />
            <span className="ticker__sep">/</span>
            <span className="ticker__t">05</span>
          </div>

          {/* Top progress bar */}
          <div className="progress" aria-hidden="true">
            <div className="progress__fill" />
          </div>
        </div>
      </div>
    </div>
  );
}

/*
  CSS lifted from public/hero/hero.css and scoped to .mathstub-hero so
  variable definitions and base styles don't leak globally. The
  `:root` and `html, body` rules from the original are dropped — the
  homepage already provides the slate-950 surface this sits on, and
  the CSS variables are defined on .mathstub-hero instead.
*/
const HERO_CSS = `
.mathstub-hero {
  --bg:       #0f172a;
  --bg-2:     #1e293b;
  --line:     #334155;
  --line-2:   #475569;
  --muted:    #94a3b8;
  --text:     #f8fafc;
  --brand:    #2563eb;
  --brand-2:  #3b82f6;
  --warn:     #dc2626;
  --warn-2:   #ef4444;
  --dur: 12s;
  --ease-out:  cubic-bezier(.22,.61,.36,1);
  --ease-in:   cubic-bezier(.55,.05,.68,.19);
  --ease-io:   cubic-bezier(.65,.05,.36,1);
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  color: var(--text);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-feature-settings: 'ss01', 'cv11', 'tnum';
  width: 100%;
}
.mathstub-hero *, .mathstub-hero *::before, .mathstub-hero *::after { box-sizing: border-box; }

.mathstub-hero .frame {
  --w: 1280;
  --h: 720;
  position: relative;
  width: 100%;
  aspect-ratio: var(--w) / var(--h);
  background: var(--bg);
  border-radius: 14px;
  overflow: hidden;
  box-shadow:
    0 1px 0 rgba(255,255,255,.04) inset,
    0 24px 80px rgba(0,0,0,.5),
    0 8px 24px rgba(0,0,0,.35);
  isolation: isolate;
}

.mathstub-hero .stage {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 1200px 600px at 50% -10%, rgba(37,99,235,.10), transparent 60%),
    radial-gradient(ellipse 800px 500px at 50% 110%, rgba(220,38,38,.06), transparent 60%),
    var(--bg);
}
.mathstub-hero .stage::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(to right, rgba(148,163,184,.045) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(148,163,184,.045) 1px, transparent 1px);
  background-size: 80px 80px;
  pointer-events: none;
}

.mathstub-hero .scene { position: absolute; inset: 0; }

.mathstub-hero .scene-1 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 28px;
  animation: msh-scene1 var(--dur) linear infinite;
}
@keyframes msh-scene1 {
  0%, 18%   { opacity: 1; transform: translateY(0); }
  22%       { opacity: 0; transform: translateY(-12px); }
  100%      { opacity: 0; transform: translateY(-12px); }
}

.mathstub-hero .hero-num {
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-size: clamp(96px, 14vw, 196px);
  line-height: .95;
  letter-spacing: -.04em;
  font-feature-settings: 'tnum', 'ss01';
  display: inline-flex;
  align-items: baseline;
  animation: msh-heroNum var(--dur) var(--ease-out) infinite;
}
.mathstub-hero .hero-num__sign {
  font-size: .55em;
  color: var(--muted);
  font-weight: 600;
  margin-right: .08em;
  transform: translateY(-.05em);
}
.mathstub-hero .hero-num__val { color: var(--text); }
@keyframes msh-heroNum {
  0%   { opacity: 0; transform: translateY(20px) scale(.96); filter: blur(8px); }
  6%   { opacity: 1; transform: translateY(0)    scale(1);   filter: blur(0); }
  18%  { opacity: 1; transform: translateY(0)    scale(1);   filter: blur(0); }
  22%  { opacity: 0; transform: translateY(-10px) scale(1);  filter: blur(0); }
  100% { opacity: 0; }
}

.mathstub-hero .sub-1 { animation: msh-sub1 var(--dur) var(--ease-out) infinite; }
@keyframes msh-sub1 {
  0%, 4%   { opacity: 0; transform: translateY(12px); }
  8%       { opacity: 1; transform: translateY(0);   }
  18%      { opacity: 1; transform: translateY(0);   }
  21%      { opacity: 0; transform: translateY(-4px);   }
  100%     { opacity: 0; }
}

.mathstub-hero .sub {
  font-size: clamp(16px, 2.2vw, 28px);
  color: var(--muted);
  font-weight: 400;
  letter-spacing: -.005em;
  margin: 0;
}

.mathstub-hero .scene-bars {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 clamp(24px, 8vw, 120px);
  gap: clamp(16px, 3vw, 36px);
  animation: msh-sceneBars var(--dur) linear infinite;
}
@keyframes msh-sceneBars {
  0%, 18%      { opacity: 0; transform: translateY(20px); pointer-events: none; }
  22%          { opacity: 1; transform: translateY(0); }
  82%          { opacity: 1; transform: translateY(0); }
  86%          { opacity: 0; transform: translateY(-20px); }
  100%         { opacity: 0; }
}

.mathstub-hero .num-static {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: clamp(32px, 4.5vw, 56px);
  letter-spacing: -.025em;
  color: var(--text);
  font-feature-settings: 'tnum';
  display: flex;
  align-items: baseline;
  gap: .04em;
}
.mathstub-hero .num-static__sign { color: var(--muted); font-weight: 600; font-size: .68em; }

.mathstub-hero .bars { display: flex; flex-direction: column; gap: clamp(14px, 2.4vw, 28px); }
.mathstub-hero .bar-row {
  display: grid;
  grid-template-columns: 1fr clamp(160px, 22vw, 280px);
  gap: clamp(14px, 2.4vw, 28px);
  align-items: center;
}
.mathstub-hero .bar-track {
  position: relative;
  height: clamp(32px, 4.6vw, 56px);
  background: transparent;
  border: 1.5px solid var(--line);
  border-radius: 6px;
  overflow: hidden;
}
.mathstub-hero .bar-fill { position: absolute; top: 0; bottom: 0; left: 0; width: 0%; }
.mathstub-hero .bar-meta {
  display: flex; flex-direction: column; gap: 4px;
  font-feature-settings: 'tnum';
}
.mathstub-hero .bar-label {
  font-size: clamp(11px, 1.3vw, 16px);
  color: var(--muted);
  letter-spacing: .02em;
  text-transform: uppercase;
  font-weight: 500;
}
.mathstub-hero .bar-pct {
  font-size: clamp(20px, 3vw, 36px);
  font-weight: 700;
  letter-spacing: -.02em;
  color: var(--text);
}
.mathstub-hero .bar-pct__sub {
  font-size: .5em;
  color: var(--muted);
  font-weight: 500;
  letter-spacing: 0;
  text-transform: none;
  margin-left: .2em;
}

.mathstub-hero .bar-row--withheld { animation: msh-rowWithheld var(--dur) var(--ease-out) infinite; }
@keyframes msh-rowWithheld {
  0%, 18%   { opacity: 0; transform: translateX(-12px); }
  22%       { opacity: 1; transform: translateX(0); }
  100%      { opacity: 1; transform: translateX(0); }
}
.mathstub-hero .bar-fill--withheld { background: var(--brand); animation: msh-fillWithheld var(--dur) var(--ease-io) infinite; }
@keyframes msh-fillWithheld {
  0%, 22%      { width: 0%; }
  32%          { width: 22%; }
  100%         { width: 22%; }
}
.mathstub-hero .bar-row--withheld .bar-pct,
.mathstub-hero .bar-row--withheld .bar-label { animation: msh-metaWithheld var(--dur) linear infinite; }
@keyframes msh-metaWithheld { 0%, 26% { opacity: 0; } 32% { opacity: 1; } 100% { opacity: 1; } }

.mathstub-hero .bar-row--owed { animation: msh-rowOwed var(--dur) var(--ease-out) infinite; }
@keyframes msh-rowOwed {
  0%, 38%   { opacity: 0; transform: translateX(-12px); }
  43%       { opacity: 1; transform: translateX(0); }
  100%      { opacity: 1; transform: translateX(0); }
}
.mathstub-hero .bar-fill--owed { background: var(--warn); animation: msh-fillOwed var(--dur) var(--ease-io) infinite; }
@keyframes msh-fillOwed {
  0%, 43%      { width: 0%; }
  55%          { width: 37%; }
  100%         { width: 37%; }
}

.mathstub-hero .bar-fill--gap {
  background: transparent;
  border: 1.5px dashed var(--warn);
  border-left: 0;
  border-right: 0;
  left: 22%;
  width: 0%;
  animation: msh-gapFill var(--dur) var(--ease-io) infinite;
}
@keyframes msh-gapFill {
  0%, 63%      { width: 0%; background: transparent; opacity: 0; }
  66%          { opacity: 1; }
  70%          { width: 15%; background: rgba(220,38,38,.18); }
  82%          { width: 15%; background: rgba(220,38,38,.18); opacity: 1; }
  86%          { opacity: 0; }
  100%         { width: 15%; opacity: 0; }
}

.mathstub-hero .bar-row--owed .bar-pct,
.mathstub-hero .bar-row--owed .bar-label { animation: msh-metaOwed var(--dur) linear infinite; }
@keyframes msh-metaOwed { 0%, 47% { opacity: 0; } 55% { opacity: 1; } 100% { opacity: 1; } }

.mathstub-hero .shortfall {
  margin-top: 8px;
  padding: clamp(14px, 2.2vw, 24px) clamp(16px, 2.6vw, 28px);
  border: 1.5px solid var(--warn);
  background: rgba(220,38,38,.08);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  animation: msh-shortfallBox var(--dur) var(--ease-out) infinite;
}
@keyframes msh-shortfallBox {
  0%, 66%   { opacity: 0; transform: translateY(8px); }
  72%       { opacity: 1; transform: translateY(0); }
  82%       { opacity: 1; transform: translateY(0); }
  86%       { opacity: 0; transform: translateY(-8px); }
  100%      { opacity: 0; }
}
.mathstub-hero .shortfall__label {
  font-size: clamp(10px, 1.2vw, 14px);
  color: var(--warn-2);
  letter-spacing: .14em;
  text-transform: uppercase;
  font-weight: 600;
}
.mathstub-hero .shortfall__num {
  font-family: 'Inter', sans-serif;
  font-feature-settings: 'tnum';
  font-weight: 700;
  font-size: clamp(36px, 5.5vw, 64px);
  line-height: 1;
  letter-spacing: -.02em;
  color: var(--warn-2);
  display: inline-flex;
  align-items: baseline;
}
.mathstub-hero .shortfall__sign { font-size: .65em; color: var(--warn); margin-right: .04em; font-weight: 600; }
.mathstub-hero .shortfall__counter { font-variant-numeric: tabular-nums; }
.mathstub-hero .shortfall__counter::before {
  content: "30,000";
  visibility: hidden;
  display: inline-block;
  width: 0;
  overflow: hidden;
}

.mathstub-hero .sub-2,
.mathstub-hero .sub-3,
.mathstub-hero .sub-4 {
  position: absolute;
  left: 0; right: 0;
  bottom: clamp(72px, 11vw, 108px);
  text-align: center;
  padding: 0 clamp(24px, 8vw, 120px);
}
.mathstub-hero .sub-2 { animation: msh-sub2 var(--dur) linear infinite; }
.mathstub-hero .sub-3 { animation: msh-sub3 var(--dur) linear infinite; }
.mathstub-hero .sub-4 { animation: msh-sub4 var(--dur) linear infinite; }
@keyframes msh-sub2 { 0%, 22% { opacity: 0; transform: translateY(8px); } 26% { opacity: 1; transform: translateY(0); } 39% { opacity: 1; transform: translateY(0); } 42% { opacity: 0; transform: translateY(-8px); } 100% { opacity: 0; } }
@keyframes msh-sub3 { 0%, 43% { opacity: 0; transform: translateY(8px); } 47% { opacity: 1; transform: translateY(0); } 60% { opacity: 1; transform: translateY(0); } 63% { opacity: 0; transform: translateY(-8px); } 100% { opacity: 0; } }
@keyframes msh-sub4 { 0%, 64% { opacity: 0; transform: translateY(8px); } 68% { opacity: 1; transform: translateY(0); } 82% { opacity: 1; transform: translateY(0); } 85% { opacity: 0; transform: translateY(-8px); } 100% { opacity: 0; } }

.mathstub-hero .scene-5 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(16px, 3vw, 36px);
  text-align: center;
  animation: msh-scene5 var(--dur) var(--ease-out) infinite;
}
@keyframes msh-scene5 {
  0%, 84%   { opacity: 0; transform: translateY(12px); pointer-events: none; }
  88%       { opacity: 1; transform: translateY(0); }
  100%      { opacity: 1; transform: translateY(0); }
}

.mathstub-hero .logo { display: inline-flex; align-items: center; gap: clamp(8px, 1.6vw, 18px); color: var(--text); }
.mathstub-hero .logo__mark { width: clamp(32px, 4.5vw, 56px); height: clamp(32px, 4.5vw, 56px); display: inline-flex; color: var(--brand-2); }
.mathstub-hero .logo__word { font-family: 'Inter', sans-serif; font-weight: 700; font-size: clamp(36px, 5.2vw, 64px); letter-spacing: -.035em; color: var(--text); }

.mathstub-hero .cta {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: clamp(12px, 1.6vw, 18px) clamp(18px, 2.4vw, 28px);
  border-radius: 999px;
  background: var(--brand);
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: clamp(14px, 1.8vw, 22px);
  letter-spacing: -.01em;
  box-shadow: 0 8px 24px rgba(37,99,235,.35), 0 1px 0 rgba(255,255,255,.15) inset;
  animation: msh-ctaPulse var(--dur) var(--ease-out) infinite;
}
.mathstub-hero .cta__arrow { display: inline-block; transform: translateY(-1px); font-weight: 500; }
@keyframes msh-ctaPulse {
  0%, 86%   { opacity: 0; transform: translateY(6px) scale(.98); }
  91%       { opacity: 1; transform: translateY(0) scale(1); }
  100%      { opacity: 1; transform: translateY(0) scale(1); }
}

.mathstub-hero .footnote {
  font-size: clamp(11px, 1.3vw, 16px);
  color: var(--muted);
  letter-spacing: .02em;
  margin: 0;
  animation: msh-footFade var(--dur) var(--ease-out) infinite;
}
@keyframes msh-footFade { 0%, 89% { opacity: 0; } 94% { opacity: 1; } 100% { opacity: 1; } }

.mathstub-hero .chrome {
  position: absolute;
  left: 0; right: 0;
  bottom: 0;
  padding: clamp(12px, 2vw, 22px) clamp(20px, 3.4vw, 40px) clamp(14px, 2.4vw, 26px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: clamp(10px, 1.1vw, 13px);
  color: var(--muted);
  letter-spacing: .04em;
  pointer-events: none;
  font-feature-settings: 'tnum';
}
.mathstub-hero .chrome__left { display: inline-flex; align-items: center; gap: 10px; font-weight: 500; }
.mathstub-hero .chrome__left .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--brand-2); box-shadow: 0 0 12px var(--brand-2); }
.mathstub-hero .chrome__cite { opacity: .8; }

.mathstub-hero .ticker {
  position: absolute;
  top: clamp(14px, 2.4vw, 28px);
  right: clamp(20px, 3.4vw, 40px);
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: clamp(10px, 1.1vw, 13px);
  color: var(--muted);
  font-weight: 500;
  letter-spacing: .08em;
  display: inline-flex;
  gap: 6px;
}
.mathstub-hero .ticker__n { color: var(--text); position: relative; min-width: 1.5em; }
.mathstub-hero .ticker__n::before {
  content: "01";
  animation: msh-tickN var(--dur) steps(1, end) infinite;
}
@keyframes msh-tickN {
  0%     { content: "01"; }
  20.8%  { content: "02"; }
  41.6%  { content: "03"; }
  62.5%  { content: "04"; }
  83.3%  { content: "05"; }
}
.mathstub-hero .ticker__sep { opacity: .5; }

.mathstub-hero .progress {
  position: absolute;
  left: 0; right: 0;
  top: 0;
  height: 2px;
  background: rgba(255,255,255,.06);
  pointer-events: none;
}
.mathstub-hero .progress__fill {
  height: 100%;
  width: 0%;
  background: var(--brand-2);
  animation: msh-progress var(--dur) linear infinite;
}
@keyframes msh-progress { 0% { width: 0%; } 100% { width: 100%; } }

@media (prefers-reduced-motion: reduce) {
  .mathstub-hero *, .mathstub-hero *::before, .mathstub-hero *::after {
    animation-duration: .001s !important;
    animation-iteration-count: 1 !important;
  }
  /* Park on scene 4 (the shortfall reveal) — the most informative frame
     for reduced-motion users. */
  .mathstub-hero .scene-1,
  .mathstub-hero .scene-5 { opacity: 0; }
  .mathstub-hero .scene-bars { opacity: 1; transform: none; }
  .mathstub-hero .bar-fill--withheld { width: 22% !important; }
  .mathstub-hero .bar-fill--owed { width: 37% !important; }
  .mathstub-hero .bar-fill--gap { width: 15% !important; opacity: 1 !important; background: rgba(220,38,38,.18) !important; }
  .mathstub-hero .shortfall { opacity: 1 !important; transform: none !important; }
}
`;
