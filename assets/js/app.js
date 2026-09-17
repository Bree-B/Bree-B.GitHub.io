/* ===========================================================================
   Site interactions
   No dependencies, no build step. Everything degrades to a static page when
   JavaScript is off, and every animation is skipped when the visitor has
   asked for reduced motion.
   =========================================================================== */
(function () {
  'use strict';

  var motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  var reduced = motionQuery.matches;
  motionQuery.addEventListener('change', function (e) { reduced = e.matches; });

  var root = document.documentElement;
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* ---------------------------------------------------------------------
     Header: frost once scrolled, retreat on the way down, return on the
     way up.
     --------------------------------------------------------------------- */
  function initHeader() {
    var header = $('[data-header]');
    if (!header) return;

    var last = window.scrollY;
    var ticking = false;

    function update() {
      var y = window.scrollY;
      header.classList.toggle('is-stuck', y > 8);

      var goingDown = y > last && y > 260;
      if (!document.body.classList.contains('nav-open')) {
        header.classList.toggle('is-hidden', goingDown);
      }
      last = y;
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }, { passive: true });

    update();
  }

  /* ---------------------------------------------------------------------
     Reading progress
     --------------------------------------------------------------------- */
  function initProgress() {
    var bar = $('[data-progress]');
    if (!bar) return;

    var ticking = false;
    function update() {
      var doc = document.documentElement;
      var max = doc.scrollHeight - doc.clientHeight;
      var pct = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      bar.style.transform = 'scaleX(' + pct.toFixed(4) + ')';
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* ---------------------------------------------------------------------
     Mobile navigation
     --------------------------------------------------------------------- */
  function initNav() {
    var toggle = $('[data-nav-toggle]');
    var nav = $('#site-nav');
    if (!toggle || !nav) return;

    function setOpen(open) {
      document.body.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    toggle.addEventListener('click', function () {
      setOpen(!document.body.classList.contains('nav-open'));
    });

    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 860) setOpen(false);
    });
  }

  /* ---------------------------------------------------------------------
     Theme toggle, cross-faded with the View Transitions API where it exists
     --------------------------------------------------------------------- */
  function initTheme() {
    var btn = $('[data-theme-toggle]');
    if (!btn) return;

    function apply(theme) {
      root.setAttribute('data-theme', theme);
      try { localStorage.setItem('theme', theme); } catch (e) { /* private mode */ }
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }

    apply(root.getAttribute('data-theme') || 'dark');

    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      if (!reduced && document.startViewTransition) {
        document.startViewTransition(function () { apply(next); });
      } else {
        apply(next);
      }
    });
  }

  /* ---------------------------------------------------------------------
     Scroll reveal
     --------------------------------------------------------------------- */
  function initReveal() {
    var targets = $$('[data-reveal], [data-stagger]');
    if (!targets.length) return;

    if (reduced || !('IntersectionObserver' in window)) {
      targets.forEach(function (el) { el.classList.add('is-revealed'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    targets.forEach(function (el) { io.observe(el); });
  }

  /* ---------------------------------------------------------------------
     Hero heading: words rise in one after another
     --------------------------------------------------------------------- */
  function initWordReveal() {
    var title = $('[data-words]');
    if (!title) return;

    var words = title.textContent.trim().split(/\s+/);
    title.textContent = '';
    title.classList.add('hero__title');

    words.forEach(function (word, i) {
      var span = document.createElement('span');
      span.className = 'word';
      span.textContent = word;
      span.style.animationDelay = (0.06 * i + 0.1).toFixed(2) + 's';
      title.appendChild(span);
      if (i < words.length - 1) title.appendChild(document.createTextNode(' '));
    });
  }

  /* ---------------------------------------------------------------------
     Spotlight that tracks the pointer across a card
     --------------------------------------------------------------------- */
  function initSpotlight() {
    var cards = $$('.spot');
    if (!cards.length || reduced) return;

    cards.forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
        card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
      });
    });
  }

  /* ---------------------------------------------------------------------
     Gentle 3D tilt on artwork cards
     --------------------------------------------------------------------- */
  function initTilt() {
    var cards = $$('[data-tilt]');
    if (!cards.length || reduced) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    var MAX = 5;

    cards.forEach(function (card) {
      var frame = null;

      card.addEventListener('pointermove', function (e) {
        if (frame) return;
        frame = window.requestAnimationFrame(function () {
          frame = null;
          var r = card.getBoundingClientRect();
          var px = (e.clientX - r.left) / r.width - 0.5;
          var py = (e.clientY - r.top) / r.height - 0.5;
          card.style.transform =
            'perspective(900px) rotateX(' + (-py * MAX).toFixed(2) + 'deg) rotateY(' +
            (px * MAX).toFixed(2) + 'deg) translateY(-4px)';
        });
      });

      card.addEventListener('pointerleave', function () {
        card.style.transform = '';
      });
    });
  }

  /* ---------------------------------------------------------------------
     Magnetic primary buttons
     --------------------------------------------------------------------- */
  function initMagnetic() {
    if (reduced) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    $$('.btn-primary').forEach(function (btn) {
      btn.addEventListener('pointermove', function (e) {
        var r = btn.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) * 0.18;
        var y = (e.clientY - r.top - r.height / 2) * 0.28;
        btn.style.transform = 'translate(' + x.toFixed(1) + 'px,' + (y - 2).toFixed(1) + 'px)';
      });
      btn.addEventListener('pointerleave', function () { btn.style.transform = ''; });
    });
  }

  /* ---------------------------------------------------------------------
     Counters that tick up when they scroll into view
     --------------------------------------------------------------------- */
  function initCounters() {
    var nums = $$('[data-count]');
    if (!nums.length) return;

    if (reduced || !('IntersectionObserver' in window)) {
      nums.forEach(function (el) { el.textContent = el.getAttribute('data-count'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        io.unobserve(el);

        var target = parseFloat(el.getAttribute('data-count')) || 0;
        var suffix = el.getAttribute('data-suffix') || '';
        var start = performance.now();
        var dur = 1100;

        (function step(now) {
          var t = Math.min(1, (now - start) / dur);
          var eased = 1 - Math.pow(1 - t, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (t < 1) window.requestAnimationFrame(step);
        })(start);
      });
    }, { threshold: 0.4 });

    nums.forEach(function (el) { io.observe(el); });
  }

  /* ---------------------------------------------------------------------
     Animated contour map
     A scalar field is sampled on a grid and its isolines are traced with
     marching squares — the same idea behind a topographic map, which felt
     like the right signature for a geospatial portfolio.
     --------------------------------------------------------------------- */
  function initTopo() {
    var canvas = $('[data-topo]');
    if (!canvas) return;

    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    var LEVELS = 16;
    var w = 0, h = 0, cols = 0, rows = 0, step = 20, grid = null;
    var t = 0;
    var running = false;
    var visible = true;
    var rafId = null;
    var lastFrame = 0;
    var stroke = 'rgba(255,255,255,0.4)';
    var strokeHot = 'rgba(255,255,255,0.4)';

    function readColours() {
      var cs = getComputedStyle(root);
      stroke = (cs.getPropertyValue('--accent-2') || '#9b6bff').trim();
      strokeHot = (cs.getPropertyValue('--accent') || '#ff4d8d').trim();
    }

    function resize() {
      var rect = canvas.getBoundingClientRect();
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(1, Math.round(rect.width));
      h = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      step = Math.max(10, Math.round(Math.min(w, h) / 30));
      cols = Math.ceil(w / step) + 1;
      rows = Math.ceil(h / step) + 1;
      grid = new Float32Array(cols * rows);
      draw();
    }

    function field(x, y, time) {
      var r1 = Math.sqrt((x - 1.4) * (x - 1.4) + (y - 1.0) * (y - 1.0));
      var r2 = Math.sqrt((x - 2.9) * (x - 2.9) + (y - 2.7) * (y - 2.7));
      return Math.sin(x * 1.05 + time) * Math.cos(y * 0.82 - time * 0.6) +
             0.62 * Math.sin((x + y) * 0.6 + time * 1.25) +
             0.5 * Math.cos(r1 * 1.9 - time * 0.85) +
             0.42 * Math.cos(r2 * 2.4 + time * 0.7) +
             0.28 * Math.sin(x * 2.3 - y * 1.7 + time * 0.5);
    }

    function sample(time) {
      var sx = 3.8 / Math.max(1, cols - 1);
      var sy = 3.8 / Math.max(1, rows - 1);
      for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols; i++) {
          grid[j * cols + i] = field(i * sx, j * sy, time);
        }
      }
    }

    /* Linear interpolation along a cell edge, clamped so a flat edge still
       produces a usable point instead of dividing by zero. */
    function lerp(a, b, level) {
      var d = b - a;
      if (Math.abs(d) < 1e-6) return 0.5;
      var v = (level - a) / d;
      return v < 0 ? 0 : (v > 1 ? 1 : v);
    }

    function traceLevel(level) {
      ctx.beginPath();

      for (var j = 0; j < rows - 1; j++) {
        for (var i = 0; i < cols - 1; i++) {
          var a = grid[j * cols + i];
          var b = grid[j * cols + i + 1];
          var c = grid[(j + 1) * cols + i + 1];
          var d = grid[(j + 1) * cols + i];

          var code = (a > level ? 1 : 0) | (b > level ? 2 : 0) | (c > level ? 4 : 0) | (d > level ? 8 : 0);
          if (code === 0 || code === 15) continue;

          var x0 = i * step, y0 = j * step;
          var top    = [x0 + step * lerp(a, b, level), y0];
          var right  = [x0 + step, y0 + step * lerp(b, c, level)];
          var bottom = [x0 + step * lerp(d, c, level), y0 + step];
          var left   = [x0, y0 + step * lerp(a, d, level)];

          switch (code) {
            case 1: case 14: seg(left, top); break;
            case 2: case 13: seg(top, right); break;
            case 3: case 12: seg(left, right); break;
            case 4: case 11: seg(right, bottom); break;
            case 6: case 9:  seg(top, bottom); break;
            case 7: case 8:  seg(left, bottom); break;
            case 5: seg(left, top); seg(right, bottom); break;
            case 10: seg(top, right); seg(left, bottom); break;
          }
        }
      }

      ctx.stroke();
    }

    function seg(p, q) {
      ctx.moveTo(p[0], p[1]);
      ctx.lineTo(q[0], q[1]);
    }

    function draw() {
      if (!grid) return;
      sample(t);

      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;
      ctx.lineCap = 'round';

      for (var k = 0; k < LEVELS; k++) {
        var f = k / (LEVELS - 1);
        var level = -2.1 + f * 4.2;
        /* Middle contours are the brightest, so the shape reads as a peak. */
        var weight = 1 - Math.abs(f - 0.5) * 1.6;
        ctx.globalAlpha = 0.14 + Math.max(0, weight) * 0.5;
        ctx.strokeStyle = f > 0.42 && f < 0.62 ? strokeHot : stroke;
        ctx.lineWidth = f > 0.42 && f < 0.62 ? 1.6 : 1;
        traceLevel(level);
      }

      ctx.globalAlpha = 1;
    }

    function frame(now) {
      rafId = null;
      if (!running) return;

      /* ~30fps is plenty for slow contours and halves the battery cost. */
      if (now - lastFrame > 32) {
        lastFrame = now;
        t += 0.006;
        draw();
      }
      rafId = window.requestAnimationFrame(frame);
    }

    function start() {
      if (running || reduced) return;
      running = true;
      rafId = window.requestAnimationFrame(frame);
    }

    function stop() {
      running = false;
      if (rafId) { window.cancelAnimationFrame(rafId); rafId = null; }
    }

    readColours();
    resize();

    var resizeTimer = null;
    window.addEventListener('resize', function () {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 150);
    });

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop();
      else if (visible) start();
    });

    /* Repaint with the new palette when the theme flips. */
    new MutationObserver(function () {
      readColours();
      draw();
    }).observe(root, { attributes: true, attributeFilter: ['data-theme'] });

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        if (visible && !document.hidden) start(); else stop();
      }, { threshold: 0.05 }).observe(canvas);
    } else {
      start();
    }
  }

  /* ---------------------------------------------------------------------
     Lightbox for artwork and figures
     --------------------------------------------------------------------- */
  function initLightbox() {
    var box = $('[data-lightbox]');
    if (!box) return;

    var img = $('[data-lightbox-img]', box);
    var caption = $('[data-lightbox-caption]', box);
    var closeBtn = $('[data-lightbox-close]', box);
    var prevBtn = $('[data-lightbox-prev]', box);
    var nextBtn = $('[data-lightbox-next]', box);

    var items = [];
    var index = 0;
    var lastFocused = null;

    function show(i) {
      index = (i + items.length) % items.length;
      var el = items[index];
      img.src = el.currentSrc || el.src;
      img.alt = el.alt || '';
      caption.textContent = el.getAttribute('data-caption') || el.alt || '';
      var many = items.length > 1;
      prevBtn.hidden = !many;
      nextBtn.hidden = !many;
    }

    function open(el) {
      items = $$('[data-zoom]');
      var start = items.indexOf(el);
      if (start < 0) { items = [el]; start = 0; }

      lastFocused = document.activeElement;
      show(start);
      box.classList.add('is-open');
      document.body.classList.add('lightbox-open');
      closeBtn.focus();
    }

    function close() {
      box.classList.remove('is-open');
      document.body.classList.remove('lightbox-open');
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    }

    document.addEventListener('click', function (e) {
      var zoomable = e.target.closest ? e.target.closest('[data-zoom]') : null;
      if (zoomable) {
        e.preventDefault();
        open(zoomable);
      }
    });

    closeBtn.addEventListener('click', close);
    prevBtn.addEventListener('click', function () { show(index - 1); });
    nextBtn.addEventListener('click', function () { show(index + 1); });

    box.addEventListener('click', function (e) {
      if (e.target === box || e.target.tagName === 'FIGURE') close();
    });

    document.addEventListener('keydown', function (e) {
      if (!box.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(index - 1);
      if (e.key === 'ArrowRight') show(index + 1);
    });
  }

  /* ---------------------------------------------------------------------
     Art store filters
     --------------------------------------------------------------------- */
  function initFilters() {
    var bar = $('[data-filters]');
    var grid = $('[data-art-grid]');
    if (!bar || !grid) return;

    var buttons = $$('.filter', bar);
    var cards = $$('.art-card', grid);
    var count = $('[data-art-count]');

    function apply(value) {
      var shown = 0;

      cards.forEach(function (card) {
        var status = card.getAttribute('data-status');
        var category = card.getAttribute('data-category');
        var match = value === 'all' || value === status || value === category;
        card.classList.toggle('is-hidden', !match);
        if (match) shown++;
      });

      buttons.forEach(function (b) {
        b.setAttribute('aria-pressed', b.getAttribute('data-filter') === value ? 'true' : 'false');
      });

      if (count) {
        count.textContent = shown + (shown === 1 ? ' piece' : ' pieces');
      }
    }

    bar.addEventListener('click', function (e) {
      var btn = e.target.closest ? e.target.closest('.filter') : null;
      if (btn) apply(btn.getAttribute('data-filter'));
    });

    apply('all');
  }

  /* ---------------------------------------------------------------------
     Artwork thumbnails swap the main image
     --------------------------------------------------------------------- */
  function initArtGallery() {
    var thumbs = $('[data-art-thumbs]');
    var stage = $('[data-art-stage]');
    if (!thumbs || !stage) return;

    var main = $('img', stage);
    if (!main) return;

    thumbs.addEventListener('click', function (e) {
      var btn = e.target.closest ? e.target.closest('button') : null;
      if (!btn) return;

      var src = btn.getAttribute('data-src');
      if (!src) return;

      main.style.opacity = '0';
      window.setTimeout(function () {
        main.src = src;
        main.style.opacity = '1';
      }, reduced ? 0 : 160);

      $$('button', thumbs).forEach(function (b) {
        b.setAttribute('aria-current', b === btn ? 'true' : 'false');
      });
    });

    main.style.transition = 'opacity .16s linear';
  }

  /* ------------------------------------------------------------------- */
  function boot() {
    initHeader();
    initProgress();
    initNav();
    initTheme();
    initWordReveal();
    initReveal();
    initSpotlight();
    initTilt();
    initMagnetic();
    initCounters();
    initTopo();
    initLightbox();
    initFilters();
    initArtGallery();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
