/* Tiny controller: responsive scale of the design-unit stage + rAF
   counter ticker. Stripped of the format-toggle + replay button bindings
   from the Claude Design Layout Lab — production embed has no controls.
*/
(function () {
  const frame = document.getElementById('frame');
  let stage = document.getElementById('stage');
  if (!frame || !stage) return;

  // ----- Shortfall counter: rAF-synced to the 12s CSS loop -----
  // Scene 4 window: 7.5s -> 10s of the 12s loop. We count $0 -> $30,000
  // during 8.16s -> 9.60s (matches the CSS keyframe timings), then hold
  // at $30,000 until the scene-out fade.
  const LOOP_MS = 12000;
  const COUNT_START = 0.68 * LOOP_MS;   // 8160ms
  const COUNT_END   = 0.80 * LOOP_MS;   // 9600ms
  const TARGET      = 30000;
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  let loopStart = performance.now();

  function tickCounter(now) {
    const t = (now - loopStart) % LOOP_MS;
    let val;
    if (t < COUNT_START)       val = 0;
    else if (t >= COUNT_END)   val = TARGET;
    else {
      const p = (t - COUNT_START) / (COUNT_END - COUNT_START);
      val = Math.round(TARGET * easeOut(p));
    }
    document.querySelectorAll('.shortfall__counter').forEach(el => {
      const formatted = val.toLocaleString('en-US');
      if (el.dataset.v !== formatted) {
        el.dataset.v = formatted;
        el.textContent = formatted;
      }
    });
    requestAnimationFrame(tickCounter);
  }
  requestAnimationFrame(tickCounter);

  function fitStage() {
    const rect = frame.getBoundingClientRect();
    const designW = frame.dataset.format === 'portrait' ? 720 : 1280;
    const designH = frame.dataset.format === 'portrait' ? 1280 : 720;
    const scale = Math.min(rect.width / designW, rect.height / designH);
    stage.style.transform = `scale(${scale})`;
    stage.style.width = designW + 'px';
    stage.style.height = designH + 'px';
  }

  window.addEventListener('resize', fitStage);
  fitStage();
  // Run once after fonts load for accurate measurements
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(fitStage);
  }
})();
