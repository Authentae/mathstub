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
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-slate-900 shadow-lg dark:border-gray-800">
      <iframe
        src="/hero/"
        title="Mathstub RSU shortfall visualizer — your employer withheld 22%, you actually owe 37%, the gap is $30K"
        aria-label="Animated explainer: $200,000 RSU vest, 22% withheld, ~37% marginal, $30,000 shortfall"
        loading="lazy"
        className="aspect-video w-full border-0"
      />
    </div>
  );
}
