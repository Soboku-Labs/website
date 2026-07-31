/* Falling cherry blossom petals.
   Canvas 2D, no dependencies. Honours prefers-reduced-motion, pauses when the
   tab is hidden, and scales its petal count to the size of the viewport. */

(function () {
  "use strict";

  var canvas = document.getElementById("sakura");
  if (!canvas || !canvas.getContext) return;

  var ctx = canvas.getContext("2d");
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

  var PALETTE = ["#f3c3c8", "#e8a8b0", "#dd909b", "#f6d8da"];

  var petals = [];
  var width = 0;
  var height = 0;
  var sizeScale = 1;
  var lastTime = 0;
  var frame = null;

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  function resize() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Keep petals proportional: full size on a desktop, smaller on a phone.
    sizeScale = Math.max(0.65, Math.min(1, width / 1100));
    for (var i = 0; i < petals.length; i++) petals[i].size = petals[i].base * sizeScale;

    // Roughly one petal per 26k css pixels, clamped to something tasteful.
    var target = Math.max(14, Math.min(46, Math.round((width * height) / 26000)));

    while (petals.length < target) petals.push(spawn(true));
    if (petals.length > target) petals.length = target;
  }

  function spawn(anywhere) {
    var base = rand(6, 13);
    return {
      x: rand(-0.05, 1.05) * width,
      y: anywhere ? rand(0, height) : rand(-0.25, -0.02) * height,
      base: base,
      size: base * sizeScale,
      fall: rand(16, 42),          // px per second
      swayAmp: rand(8, 26),        // px
      swayFreq: rand(0.15, 0.45),  // cycles per second
      phase: rand(0, Math.PI * 2),
      spin: rand(0.4, 1.5) * (Math.random() < 0.5 ? -1 : 1),
      angle: rand(0, Math.PI * 2),
      tilt: rand(0, Math.PI * 2),
      alpha: rand(0.35, 0.85),
      color: PALETTE[(Math.random() * PALETTE.length) | 0]
    };
  }

  /* A petal: rounded, with a small notch at the tip. Drawn around the origin,
     so the caller controls position, rotation and flutter. */
  function tracePetal(s) {
    ctx.beginPath();
    ctx.moveTo(0, -s * 0.72);
    ctx.bezierCurveTo(s * 0.28, -s * 1.02, s * 0.86, -s * 0.35, s * 0.55, s * 0.62);
    ctx.bezierCurveTo(s * 0.34, s * 1.0, -s * 0.34, s * 1.0, -s * 0.55, s * 0.62);
    ctx.bezierCurveTo(-s * 0.86, -s * 0.35, -s * 0.28, -s * 1.02, 0, -s * 0.72);
    ctx.closePath();
  }

  function draw(p) {
    // Flutter: squashing the petal horizontally reads as a turn through 3D.
    var flutter = Math.cos(p.tilt);

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);
    ctx.scale(flutter, 1);
    ctx.globalAlpha = p.alpha * (0.45 + 0.55 * Math.abs(flutter));
    ctx.fillStyle = p.color;
    tracePetal(p.size);
    ctx.fill();
    ctx.restore();
  }

  function step(now) {
    frame = window.requestAnimationFrame(step);

    // Clamp dt so a backgrounded tab does not teleport every petal downward.
    var dt = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;

    // Two slow sine waves make the drift feel like weather rather than a loop.
    var t = now / 1000;
    var wind = Math.sin(t * 0.11) * 12 + Math.sin(t * 0.37) * 5;

    ctx.clearRect(0, 0, width, height);

    for (var i = 0; i < petals.length; i++) {
      var p = petals[i];

      p.phase += p.swayFreq * dt * Math.PI * 2;
      p.tilt += p.spin * dt;
      p.angle += p.spin * 0.35 * dt;

      p.y += p.fall * dt;
      p.x += (Math.sin(p.phase) * p.swayAmp + wind) * dt;

      if (p.y - p.size > height) {
        petals[i] = spawn(false);
        continue;
      }
      if (p.x < -0.1 * width) p.x += 1.2 * width;
      else if (p.x > 1.1 * width) p.x -= 1.2 * width;

      draw(p);
    }
  }

  function start() {
    if (frame !== null) return;
    lastTime = window.performance.now();
    frame = window.requestAnimationFrame(step);
  }

  function stop() {
    if (frame === null) return;
    window.cancelAnimationFrame(frame);
    frame = null;
  }

  /* Reduced motion: a still scatter of petals, no loop at all. */
  function renderStill() {
    ctx.clearRect(0, 0, width, height);
    for (var i = 0; i < petals.length; i++) {
      petals[i].tilt = 0;
      draw(petals[i]);
    }
  }

  function apply() {
    if (reduced.matches) {
      stop();
      renderStill();
    } else {
      start();
    }
  }

  var resizeTimer;
  window.addEventListener("resize", function () {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(function () {
      resize();
      if (reduced.matches) renderStill();
    }, 150);
  });

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stop();
    else if (!reduced.matches) start();
  });

  if (reduced.addEventListener) reduced.addEventListener("change", apply);
  else if (reduced.addListener) reduced.addListener(apply);

  resize();
  apply();
})();
