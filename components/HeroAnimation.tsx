/**
 * HeroAnimation — 12-second autoplay loop dramatizing the RSU shortfall.
 *
 * Source: Claude Design P2 (Mathstub Hero Animation). The full
 * pure-CSS animation lives at /public/hero/ as a standalone HTML page
 * (index.html + hero.css + hero.js). We embed it via <iframe> rather
 * than inlining the JSX so the animation lifecycle is fully isolated
 * (its own loopStart clock, its own font-loading) and so the same asset
 * can be linked directly in social posts ("here's the animated demo
 * → mathstub.com/hero/").
 *
 * The iframe is sized at a 16:9 aspect ratio with `aspect-video` and
 * loaded with loading="lazy" so it doesn't block above-fold paint on
 * the homepage.
 */
export function HeroAnimation() {
  return (
    /*
      No outer chrome (no rounded/border/shadow) — the inner .frame from
      hero.css already provides screen-mockup framing (rounded-14px,
      layered box-shadow). Stacking chrome here too creates a double-ring
      and dead space inside the iframe edge.
    */
    <iframe
      // ?v=2 cache-bust — earlier deploys had a transparent body bg that
      // some browsers cached. Force a fresh /hero/ fetch so the
      // restored #050810 dark background ships to existing visitors.
      src="/hero/?v=2"
      title="Mathstub RSU shortfall visualizer — your employer withheld 22%, you actually owe 37%, the gap is $30K"
      aria-label="Animated explainer: $200,000 RSU vest, 22% withheld, ~37% marginal, $30,000 shortfall"
      loading="lazy"
      className="aspect-video w-full border-0 bg-slate-950"
    />
  );
}
