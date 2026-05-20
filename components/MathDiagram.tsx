/**
 * MathDiagram — renders the formula-chain SVG for a given calculator.
 *
 * Source: Claude Design P6 (Mathstub Math Diagrams). Each calculator has
 * a left-to-right boxes-with-arrows diagram showing the formula chain
 * with the controlling IRC § cited in each step. The SVG is hand-tuned
 * for legibility at the embed size (~720px wide) and degrades gracefully
 * to a static image on social-share previews.
 *
 * The diagrams live in /public/diagrams/<calc-slug>.svg so they can also
 * be linked directly as shareable images in Reddit/Twitter posts
 * ("here's the formula my RSU shortfall calc uses").
 */
export function MathDiagram({
  slug,
  alt,
  className,
}: {
  slug: string;
  alt: string;
  className?: string;
}) {
  return (
    <figure className={`my-4 ${className ?? ''}`}>
      <div className="overflow-x-auto rounded-md border border-slate-800 bg-slate-900 p-4">
        {/*
          Using <img> instead of inline SVG keeps the SVG cacheable as a
          static asset and lets us reuse the same file as an OG-style
          share image on social. Trade-off: we can't theme the SVG via
          CSS variables, but every diagram was generated with the same
          Mathstub token set so the look is consistent across calcs.

          No max-width cap so the diagram fills whatever container it
          sits in — earlier `max-w-3xl` rendered the 1100x520 SVG at
          ~720px wide on a 1100px page, which read as "too small."
          Intrinsic viewBox keeps boxes legible up to 1100px and scales
          down cleanly on narrower screens (the overflow-x-auto wrapper
          handles the mobile-narrow case).
        */}
        {/*
          v=3 cache-bust. The SVGs got several content + viewBox edits
          (plain-English formulas, color theme, height crop) but
          Cloudflare's edge cache kept serving the original light-themed
          SVGs to visitors. Bumping the query param forces a fresh fetch
          for every existing visitor on the next page load.
        */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/diagrams/${slug}.svg?v=3`}
          alt={alt}
          width={1100}
          height={340}
          loading="lazy"
          className="mx-auto block h-auto w-full"
        />
      </div>
      <figcaption className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">
        How the math flows — every step cites the IRC section that controls it.
      </figcaption>
    </figure>
  );
}
