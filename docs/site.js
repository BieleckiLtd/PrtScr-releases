// PrtScr's website: the hero story, the hands-on demos, and download links for your system.
(function () {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

  // Runs `tick` on every frame while `el` is on screen and the tab is visible.
  function whileVisible(el, tick) {
    let visible = false;
    let raf = 0;
    let last = 0;
    const loop = (now) => {
      const dt = last ? Math.min(100, now - last) : 16;
      last = now;
      tick(dt, now);
      raf = requestAnimationFrame(loop);
    };
    const update = () => {
      const run = visible && !document.hidden;
      if (run && !raf) { last = 0; raf = requestAnimationFrame(loop); }
      if (!run && raf) { cancelAnimationFrame(raf); raf = 0; }
    };
    new IntersectionObserver((entries) => { visible = entries[0].isIntersecting; update(); }, { threshold: 0.05 }).observe(el);
    document.addEventListener("visibilitychange", update);
  }

  // ---------------------------------------------------------------------------------------
  // Thumbnails drawn by thumbs.js
  $$("[data-thumb]").forEach((el) => el.insertAdjacentHTML("afterbegin", window.PrtScrThumbs.svg(el.dataset.thumb)));

  // Pixelate text: draw it tiny, let CSS scale it up in blocks.
  function pixelate(canvas, text, block, ink = "#3c4050") {
    const w = canvas.parentElement.clientWidth;
    const h = canvas.parentElement.clientHeight;
    canvas.width = Math.max(1, Math.round(w / block));
    canvas.height = Math.max(1, Math.round(h / block));
    canvas.style.width = `${canvas.width * block}px`;
    canvas.style.height = `${h}px`;
    const g = canvas.getContext("2d");
    g.fillStyle = "#fff";
    g.fillRect(0, 0, canvas.width, canvas.height);
    g.fillStyle = ink;
    g.font = `${canvas.height * 1.05}px sans-serif`;
    g.textBaseline = "middle";
    g.fillText(text, 0, canvas.height / 2 + 0.2);
  }

  // ---------------------------------------------------------------------------------------
  // Your system: which download to lead with, and which keys to show.
  const ua = navigator.userAgent;
  const platform = (navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || "";
  const touchMac = /Mac/i.test(platform) && navigator.maxTouchPoints > 1;
  const os = /Win/i.test(platform)
    ? "windows"
    : /Mac/i.test(platform) && !touchMac && !/iPhone|iPad/.test(ua)
      ? "mac"
      : /Linux/i.test(platform) && !/Android|CrOS/i.test(ua)
        ? "linux"
        : "other";
  const DL = {
    windows: "https://github.com/BieleckiLtd/PrtScr-releases/releases/latest/download/PrtScr-setup.exe",
    mac: "https://github.com/BieleckiLtd/PrtScr-releases/releases/latest/download/PrtScr-macos.dmg",
    linux: "https://github.com/BieleckiLtd/PrtScr-releases/releases/latest/download/PrtScr-linux-x64.run",
  };
  const NAMES = { windows: "Windows", mac: "Mac", linux: "Linux" };
  const KEYS = { windows: ["PrtScr"], mac: ["⇧", "⌘", "2"], linux: ["PrtSc"], other: ["PrtScr"] };

  if (os !== "other") {
    const nav = $("[data-dl]");
    nav.href = DL[os];
    $("[data-dl-label]", nav).textContent = `Download for ${NAMES[os]}`;
    $$(`.os[data-os="${os}"]`).forEach((el) => el.classList.add("mine"));
    // Your system's download first and filled in, its install steps first.
    $$(".ctas").forEach((row) => {
      $$("[data-os-link]", row).forEach((a) => {
        const yours = a.dataset.osLink === os;
        a.classList.toggle("primary", yours);
        a.classList.toggle("ghost", !yours);
      });
      row.prepend($(`[data-os-link="${os}"]`, row));
    });
    const cards = $(".os-cards");
    cards.prepend($(`.os[data-os="${os}"]`, cards));
  }
  const COPY = os === "mac" ? ["⌘", "C"] : ["Ctrl", "C"];
  const kbds = (keys) => keys.map((k) => `<kbd>${k}</kbd>`).join("");
  $$('[data-keys-step="capture"]').forEach((el) => (el.innerHTML = kbds(KEYS[os])));
  $$('[data-keys-step="copy"]').forEach((el) => (el.innerHTML = kbds(COPY)));
  $$('[data-keys-text="capture"]').forEach((el) => (el.textContent = { mac: "⇧ ⌘ 2 on a Mac", linux: "PrtSc on Linux" }[os] ?? "PrtScr on Windows, ⇧ ⌘ 2 on a Mac"));

  // Close the mobile section menu after navigating to an anchor.
  $$(".mobile-menu nav a").forEach((link) =>
    link.addEventListener("click", () => { $(".mobile-menu").open = false; }),
  );

  // The newest release, for the version line.
  fetch("https://api.github.com/repos/BieleckiLtd/PrtScr-releases/releases/latest", { headers: { Accept: "application/vnd.github+json" } })
    .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
    .then((rel) => {
      const v = String(rel.tag_name || "").replace(/^v/, "");
      if (!v) return;
      const date = rel.published_at ? new Date(rel.published_at).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" }) : "";
      const hero = $("[data-version]");
      hero.textContent = `Version ${v}${date ? `, ${date}` : ""}`;
      hero.hidden = false;
      $("[data-version-foot]").textContent = ` ${v}`;
      $$("[data-version-term]").forEach((el) => (el.textContent = v));
      // Default to an upcoming label if the release lookup fails; hide it only once released.
      const [a, b, c] = v.split(".").map(Number);
      const aiAvailable = a > 0 || b > 1 || (b === 1 && c >= 30);
      $$("[data-ai-soon]").forEach((el) => (el.hidden = aiAvailable));
    })
    .catch(() => {});

  // ---------------------------------------------------------------------------------------
  // The hero story: press, drag, mark up, share.
  (function hero() {
    const wrap = $(".scene-wrap");
    const scene = $("#scene");
    if (!scene) return;

    const fit = () => (scene.style.transform = `scale(${wrap.clientWidth / 1080})`);
    new ResizeObserver(fit).observe(wrap);
    fit();

    // Times, in ms from the start of a loop, at which each step begins.
    const AT = [0, 500, 1500, 3300, 4100, 7000, 8600];
    const PHASES = [0, 1500, 3300, 7000];
    const LOOP = 12800;
    const keys = $('[data-keys-step="capture"]', scene);
    const copyKeys = $('[data-keys-step="copy"]', scene);
    const stepItems = $$("#steps li");
    let elapsed = 0;
    let step = -1;
    let playing = !reduceMotion;

    const stepAt = (t) => AT.reduce((s, at, i) => (t >= at ? i : s), 0);
    function apply(next) {
      if (next === step) return;
      if (next < step) {
        scene.classList.add("reset");
        for (let i = 1; i <= 6; i++) scene.classList.toggle(`s${i}`, i <= next);
        void scene.offsetWidth;
        requestAnimationFrame(() => scene.classList.remove("reset"));
      } else {
        for (let i = 1; i <= next; i++) scene.classList.add(`s${i}`);
      }
      step = next;
    }
    function render() {
      apply(stepAt(elapsed));
      keys.classList.toggle("press", elapsed >= 1000 && elapsed < 1250);
      copyKeys.classList.toggle("press", elapsed >= AT[5] + 600 && elapsed < AT[5] + 850);
      const phase = PHASES.reduce((p, at, i) => (elapsed >= at ? i : p), 0);
      stepItems.forEach((li, i) => {
        li.classList.toggle("on", i === phase);
        li.classList.toggle("done", i < phase);
        const end = PHASES[i + 1] ?? LOOP;
        const fill = i === phase ? clamp((elapsed - PHASES[i]) / (end - PHASES[i]), 0, 1) : i < phase ? 1 : 0;
        $(".bar i", li).style.width = `${fill * 100}%`;
      });
    }
    if (reduceMotion) {
      elapsed = AT[5] - 1;
      render();
    } else {
      whileVisible(wrap, (dt) => {
        if (!playing) return;
        elapsed += dt;
        if (elapsed >= LOOP) elapsed = 0;
        render();
      });
    }
    // In reduced motion a step shows its finished picture; otherwise the story plays on from it.
    const STILL = [AT[1], AT[2] + 1400, AT[5] - 1, LOOP - 1];
    stepItems.forEach((li, i) =>
      $("button", li).addEventListener("click", () => {
        elapsed = reduceMotion || !playing ? STILL[i] : PHASES[i];
        step = 99; // re-apply from scratch, without transitions
        render();
      }),
    );
    const btn = $("#scenePlay");
    const setBtn = () => {
      btn.setAttribute("aria-pressed", String(!playing));
      $("span", btn).textContent = playing ? "Pause" : "Play";
      $("use", btn).setAttribute("href", playing ? "#i-pause" : "#i-play");
    };
    if (reduceMotion) btn.hidden = true;
    btn.addEventListener("click", () => { playing = !playing; setBtn(); });
    setBtn();
  })();

  // ---------------------------------------------------------------------------------------
  // Arrows that stick: drag the target, the arrow follows.
  (function arrows() {
    const demo = $("#demoArrow");
    if (!demo) return;
    const paper = $(".paper", demo);
    const tgt = $("#arrowTarget");
    const note = $("#arrowNote");
    const path = $("#arrowPath");
    const head = $("#arrowHead");
    let pos = null;
    let dragging = false;
    let lastTouch = -1e9;
    let t = 0;

    // Where the ray from (cx, cy) towards (tx, ty) leaves the box, pushed out by `pad`.
    function edge(r, tx, ty, pad) {
      const cx = r.x + r.w / 2;
      const cy = r.y + r.h / 2;
      const dx = tx - cx;
      const dy = ty - cy;
      const k = 1 / Math.max(Math.abs(dx) / (r.w / 2 + pad), Math.abs(dy) / (r.h / 2 + pad), 1e-6);
      return [cx + dx * k, cy + dy * k];
    }
    function rectOf(el) {
      const p = paper.getBoundingClientRect();
      const b = el.getBoundingClientRect();
      return { x: b.left - p.left, y: b.top - p.top, w: b.width, h: b.height };
    }
    function draw() {
      const a = rectOf(note);
      const b = rectOf(tgt);
      const [sx, sy] = edge(a, b.x + b.w / 2, b.y + b.h / 2, 6);
      const [ex, ey] = edge(b, a.x + a.w / 2, a.y + a.h / 2, 9);
      const mx = (sx + ex) / 2;
      const my = (sy + ey) / 2;
      const len = Math.hypot(ex - sx, ey - sy) || 1;
      const bend = Math.min(60, len * 0.22);
      const cx = mx + (-(ey - sy) / len) * bend;
      const cy = my + ((ex - sx) / len) * bend;
      path.setAttribute("d", `M${sx} ${sy} Q${cx} ${cy} ${ex} ${ey}`);
      const ang = Math.atan2(ey - cy, ex - cx);
      const hl = 14;
      const p1 = [ex - hl * Math.cos(ang - 0.5), ey - hl * Math.sin(ang - 0.5)];
      const p2 = [ex - hl * Math.cos(ang + 0.5), ey - hl * Math.sin(ang + 0.5)];
      head.setAttribute("d", `M${p1[0]} ${p1[1]} L${ex} ${ey} L${p2[0]} ${p2[1]}`);
    }
    function place(x, y) {
      const w = paper.clientWidth - tgt.offsetWidth - 8;
      const h = paper.clientHeight - tgt.offsetHeight - 8;
      pos = [clamp(x, 8, w), clamp(y, 56, h)];
      tgt.style.left = `${pos[0]}px`;
      tgt.style.top = `${pos[1]}px`;
      draw();
    }
    let grab = [0, 0];
    tgt.addEventListener("pointerdown", (e) => {
      dragging = true;
      tgt.classList.add("drag");
      tgt.setPointerCapture(e.pointerId);
      const r = rectOf(tgt);
      const p = paper.getBoundingClientRect();
      grab = [e.clientX - p.left - r.x, e.clientY - p.top - r.y];
      $(".hint", demo).style.opacity = "0";
    });
    tgt.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      const p = paper.getBoundingClientRect();
      place(e.clientX - p.left - grab[0], e.clientY - p.top - grab[1]);
      lastTouch = performance.now();
    });
    const drop = () => { dragging = false; tgt.classList.remove("drag"); lastTouch = performance.now(); };
    tgt.addEventListener("pointerup", drop);
    tgt.addEventListener("pointercancel", drop);
    tgt.addEventListener("keydown", (e) => {
      const step = e.shiftKey ? 30 : 10;
      const d = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[e.key];
      if (!d) return;
      e.preventDefault();
      const r = rectOf(tgt);
      place(r.x + d[0], r.y + d[1]);
      lastTouch = performance.now();
    });
    new ResizeObserver(() => { const r = rectOf(tgt); place(r.x, r.y); }).observe(paper);
    requestAnimationFrame(() => { const r = rectOf(tgt); place(r.x, r.y); });

    // Until someone drags it, the button wanders so the arrow can be seen following.
    if (!reduceMotion)
      whileVisible(demo, (dt, now) => {
        if (dragging || now - lastTouch < 5000) return;
        t += dt / 1000;
        const W = paper.clientWidth;
        const H = paper.clientHeight;
        place(W * (0.58 + 0.2 * Math.cos(t * 0.7)) - tgt.offsetWidth / 2, H * (0.5 + 0.2 * Math.sin(t * 1.1)) - tgt.offsetHeight / 2);
      });
  })();

  // ---------------------------------------------------------------------------------------
  // Hide anything private: a before and after you can slide.
  (function privacy() {
    const demo = $("#demoPix");
    if (!demo) return;
    const paper = $(".paper", demo);
    const rows = [
      ["Amara Okafor", "amara.okafor@example.com", "Team"],
      ["Jonas Weber", "jonas.weber@example.org", "Pro"],
      ["Priya Shah", "priya.shah@example.net", "Pro"],
      ["API key", "demo_8f3a2c7e91b04d6f5e", "Live"],
      ["Mateo Rossi", "mateo.rossi@example.com", "Team"],
    ];
    const html = rows
      .map(([n, v, p]) => `<div class="pr"><b>${n}</b><span class="pv"><span>${v}</span><canvas data-text="${v}"></canvas></span><span class="plan">${p}</span></div>`)
      .join("");
    $$(".plist", demo).forEach((l) => (l.innerHTML = html));
    const cover = $(".plist.cover", demo);
    const redraw = () => $$("canvas", cover).forEach((c) => pixelate(c, c.dataset.text, 4.5));
    new ResizeObserver(redraw).observe(paper);
    redraw();

    const split = $("#pixSplit");
    let at = 45;
    let touched = -1e9;
    let dragging = false;
    let t = 0;
    const set = (v) => {
      at = clamp(v, 0, 100);
      paper.style.setProperty("--split", `${at}%`);
      split.setAttribute("aria-valuenow", String(Math.round(at)));
    };
    const fromEvent = (e) => {
      const r = paper.getBoundingClientRect();
      set(((e.clientX - r.left) / r.width) * 100);
      touched = performance.now();
    };
    paper.addEventListener("pointerdown", (e) => { dragging = true; paper.setPointerCapture(e.pointerId); fromEvent(e); });
    paper.addEventListener("pointermove", (e) => dragging && fromEvent(e));
    paper.addEventListener("pointerup", () => (dragging = false));
    paper.addEventListener("pointercancel", () => (dragging = false));
    paper.style.touchAction = "pan-y";
    split.addEventListener("keydown", (e) => {
      const d = { ArrowLeft: -5, ArrowRight: 5 }[e.key];
      if (!d) return;
      e.preventDefault();
      set(at + d);
      touched = performance.now();
    });
    $$(".seg button", demo).forEach((b) =>
      b.addEventListener("click", () => {
        $$(".seg button", demo).forEach((o) => o.classList.toggle("on", o === b));
        cover.classList.toggle("blur", b.dataset.mode === "blur");
      }),
    );
    set(at);
    if (!reduceMotion)
      whileVisible(demo, (dt, now) => {
        if (dragging || now - touched < 5000) return;
        t += dt / 1000;
        set(50 + 30 * Math.sin(t * 0.9));
      });
  })();

  // ---------------------------------------------------------------------------------------
  // The timeline: a 12-second edit that plays, with a playhead you can move.
  (function timeline() {
    const demo = $("#demoTl");
    if (!demo) return;
    const D = 12;
    const titles = [
      { s: 0, d: 2.7, l: "CAPTURE", sub: "Drag out a region" },
      { s: 3, d: 2.7, l: "RECORD", sub: "Your screen, straight to MP4" },
      { s: 6, d: 2.7, l: "MARK UP", sub: "Point at what matters" },
      { s: 9, d: 3, l: "SHARE", sub: "Drag it into a chat" },
    ];
    const track = (name) => $(`[data-track="${name}"]`, demo);
    const pc = (v) => `${(v / D) * 100}%`;
    const clip = (cls, s, d, inner = "") => `<div class="clip ${cls}" style="left:${pc(s)};width:${pc(d)}">${inner}</div>`;
    track("titles").innerHTML = titles.map((c) => clip("t", c.s, c.d, `<i class="fi"></i><i class="fo"></i>${c.l}`)).join("");
    track("pointer").innerHTML = clip("p", 1.2, 1.6, "Pointer") + clip("p", 6.6, 1.2, "Click");
    const thumbs = (name, n) => `<div class="thumbs">${Array.from({ length: n }, () => `<div>${window.PrtScrThumbs.svg(name)}</div>`).join("")}</div>`;
    track("video").innerHTML = clip("v", 0, 6.4, thumbs("traffic", 8)) + clip("v", 5.6, 6.4, thumbs("chat", 8)) + `<span class="xf" style="left:${pc(5.6)};width:${pc(0.8)}"></span>`;
    let wave = "";
    let seed = 11;
    for (let i = 0; i < 150; i++) {
      seed = (seed * 16807) % 2147483647;
      const h = 20 + 70 * Math.abs(Math.sin(i / 7)) * (0.5 + 0.5 * (seed / 2147483647));
      wave += `<i style="height:${h.toFixed(0)}%"></i>`;
    }
    track("sound").innerHTML = clip("s", 0, 12, `<i class="fi"></i><i class="fo" style="width:40px"></i>${wave}`);

    const head = $("#tlHead");
    const lanes = $("#tlLanes");
    const title = $("#tlTitle");
    const sub = $("#tlSub");
    const tTitle = $(".tl-title", demo);
    const time = $("#tlTime");
    const shotA = $(".tl-shot", demo);
    const shotB = $(".tl-shot.b", demo);
    const ripple = $(".tl-click", demo);
    const play = $("#tlPlay");
    $("#tlTotal").textContent = "/ 0:12.0";
    let t = 0;
    let playing = !reduceMotion;

    function render() {
      const area = track("titles").getBoundingClientRect();
      const box = lanes.getBoundingClientRect();
      head.style.left = `${area.left - box.left + (t / D) * area.width}px`;
      time.textContent = `0:${t.toFixed(1).padStart(4, "0")}`;
      const c = titles.find((x) => t >= x.s && t < x.s + x.d);
      if (c) {
        if (title.textContent !== c.l) { title.textContent = c.l; sub.textContent = c.sub; }
        const f = Math.min(1, (t - c.s) / 0.4, (c.s + c.d - t) / 0.4);
        tTitle.style.opacity = String(clamp(f, 0, 1));
        tTitle.style.transform = `translateY(${(1 - clamp(f, 0, 1)) * 10}px)`;
      } else tTitle.style.opacity = "0";
      const x = clamp((t - 5.6) / 0.8, 0, 1);
      shotA.style.opacity = String(1 - x);
      shotB.style.opacity = String(x);
      const r = t >= 6.8 && t < 7.6 ? (t - 6.8) / 0.8 : -1;
      ripple.style.opacity = r < 0 ? "0" : String(1 - r);
      ripple.style.transform = `scale(${0.6 + Math.max(0, r) * 1.2})`;
      $$(".clip", demo).forEach((el) => {
        const l = parseFloat(el.style.left) / 100 * D;
        const w = parseFloat(el.style.width) / 100 * D;
        el.classList.toggle("on", t >= l && t < l + w && !el.classList.contains("s"));
      });
    }
    function seek(e) {
      const area = track("titles").getBoundingClientRect();
      t = clamp(((e.clientX - area.left) / area.width) * D, 0, D - 0.01);
      render();
    }
    let scrubbing = false;
    lanes.addEventListener("pointerdown", (e) => { scrubbing = true; lanes.setPointerCapture(e.pointerId); seek(e); });
    lanes.addEventListener("pointermove", (e) => scrubbing && seek(e));
    lanes.addEventListener("pointerup", () => (scrubbing = false));
    const setPlay = () => {
      play.setAttribute("aria-label", playing ? "Pause" : "Play");
      $("use", play).setAttribute("href", playing ? "#i-pause" : "#i-play");
    };
    play.addEventListener("click", () => { playing = !playing; setPlay(); });
    setPlay();
    if (reduceMotion) t = 6.9;
    render();
    new ResizeObserver(render).observe(lanes);
    whileVisible(demo, (dt) => {
      if (!playing || scrubbing) return;
      t = (t + dt / 1000) % D;
      render();
    });
  })();

  // ---------------------------------------------------------------------------------------
  // Nothing is ever lost: the crop moves, the original stays.
  (function crop() {
    const demo = $("#demoCrop");
    if (!demo) return;
    const box = $("#cropBox");
    const dim = $("#cropDim");
    const range = $("#cropRange");
    const W = 1920;
    const H = 1200;
    const set = () => {
      const v = Number(range.value) / 100;
      const ix = 0.04 + v * 0.26;
      const iy = 0.04 + v * 0.22;
      const top = iy * 0.7;
      box.style.left = `${ix * 100}%`;
      box.style.right = `${(ix - 0.02) * 100}%`;
      box.style.top = `${top * 100}%`;
      box.style.bottom = `${(iy * 1.3 + 0.08) * 100}%`;
      const w = Math.round(W * (1 - ix - (ix - 0.02)));
      const h = Math.round(H * (1 - top - (iy * 1.3 + 0.08)));
      dim.textContent = `${w} × ${h}`;
    };
    range.addEventListener("input", set);
    set();
  })();

  // ---------------------------------------------------------------------------------------
  // Your library stays on your disk, unless you choose a place for it.
  (function sync() {
    const demo = $("#demoSync");
    if (!demo) return;
    const places = [
      ["Local folder", "folder"],
      ["Network share", "server"],
      ["SFTP / SSH", "terminal"],
      ["WebDAV", "cloud"],
      ["FTP / FTPS", "drive"],
      ["S3 storage", "drive"],
      ["OneDrive", "cloud"],
      ["Google Drive", "cloud"],
      ["Dropbox", "cloud"],
    ];
    const dests = $("#syncDests");
    dests.innerHTML = places
      .map(([n, i]) => `<button type="button" class="dest" aria-pressed="false"><svg class="ico s"><use href="#i-${i}"/></svg>${n}</button>`)
      .join("");
    const svg = $("#syncLines");
    const home = $("#syncHome");
    const other = $("#syncOther");
    const text = $("#syncText");
    const idle = text.textContent;

    function layout() {
      const box = demo.getBoundingClientRect();
      svg.setAttribute("viewBox", `0 0 ${box.width} ${box.height}`);
      const h = home.getBoundingClientRect();
      const o = other.getBoundingClientRect();
      const hx = h.right - box.left;
      const hy = h.top + h.height / 2 - box.top;
      const ox = o.left - box.left;
      const oy = o.top + o.height / 2 - box.top;
      // Side by side on a wide screen, one above the other on a narrow one.
      const stacked = h.bottom <= dests.getBoundingClientRect().top;
      const hb = h.bottom - box.top;
      const hcx = h.left + h.width / 2 - box.left;
      const ot = o.top - box.top;
      const ocx = o.left + o.width / 2 - box.left;
      svg.innerHTML = $$(".dest", dests)
        .map((d) => {
          const r = d.getBoundingClientRect();
          const on = d.getAttribute("aria-pressed") === "true" ? "on" : "";
          if (stacked && !on) return "";
          let a;
          let b;
          if (stacked) {
            const cx = r.left + r.width / 2 - box.left;
            const top = r.top - box.top;
            const bottom = r.bottom - box.top;
            a = `M${hcx} ${hb} C ${hcx} ${hb + 40}, ${cx} ${top - 40}, ${cx} ${top}`;
            b = `M${cx} ${bottom} C ${cx} ${bottom + 40}, ${ocx} ${ot - 40}, ${ocx} ${ot}`;
          } else {
            const lx = r.left - box.left;
            const rx = r.right - box.left;
            const y = r.top + r.height / 2 - box.top;
            a = `M${hx} ${hy} C ${hx + 60} ${hy}, ${lx - 60} ${y}, ${lx} ${y}`;
            b = `M${rx} ${y} C ${rx + 60} ${y}, ${ox - 60} ${oy}, ${ox} ${oy}`;
          }
          return `<path class="${on}" d="${a}"/><path class="${on} back" d="${b}"/>`;
        })
        .join("");
      // Draw lit lines last so they sit on top.
      $$("path.on", svg).forEach((p) => svg.append(p));
    }
    function describe() {
      const on = $$(".dest", dests).filter((d) => d.getAttribute("aria-pressed") === "true").map((d) => d.textContent.trim());
      demo.classList.toggle("live", on.length > 0);
      if (!on.length) { text.textContent = idle; return; }
      const list = on.length === 1 ? on[0] : `${on.slice(0, -1).join(", ")} and ${on.at(-1)}`;
      text.textContent = `In PrtScr, you can back up to ${list}. Connect another computer to the same place to sync captures, edits and deletions. Conflicting edits are kept as separate copies. This example does not transfer files.`;
    }
    dests.addEventListener("click", (e) => {
      const b = e.target.closest(".dest");
      if (!b) return;
      b.setAttribute("aria-pressed", String(b.getAttribute("aria-pressed") !== "true"));
      layout();
      describe();
    });
    new ResizeObserver(layout).observe(demo);
    layout();
  })();

  // ---------------------------------------------------------------------------------------
  // Find it again: a made-up library, searched by the words in each capture and, as local AI
  // search would, by what each one is about or shows.
  (function find() {
    const demo = $("#demoFind");
    if (!demo) return;
    const lib = $("#findLib");
    const grid = $("#findGrid");
    const input = $("#findInput");
    const count = $("#findCount");
    const caret = $(".caret", demo);
    const chips = $$("[data-q]", demo);
    // As the library folds text: lower case, no accents, ł as l and ß as ss.
    const fold = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ł/g, "l").replace(/ß/g, "ss");
    const words = (s) => fold(s).split(/[^a-z0-9]+/).filter(Boolean);
    const STOP = new Set(["a", "an", "the", "of", "on", "in", "at", "with", "and", "to", "by", "for", "w", "na", "z", "i", "der", "die", "das", "el", "la", "le", "un", "une", "de"]);
    const ico = (name) => `<svg class="ico"><use href="#i-${name}"/></svg>`;
    // What each capture is about, in a few languages: the demo's stand-in for the model.
    const CAPTURES = [
      ["boarding", "07:52", "A boarding pass from Warsaw to Lisbon", "travel trip journey flight fly plane airplane airport holiday vacation podroz lot samolot lotnisko wakacje reise flug urlaub viaje vuelo vacaciones voyage vol vacances"],
      ["train", "08:05", "A Polish train ticket from Kraków to Gdańsk", "travel trip journey train rail railway commute podroz pociag kolej reise zug bahn viaje tren voyage"],
      ["hotel", "09:31", "A hotel booking confirmation", "travel trip holiday vacation hotel booking reservation stay accommodation podroz wakacje nocleg rezerwacja reise urlaub viaje vacaciones voyage vacances"],
      ["airport", "10:12", "A photo of a plane at an airport at sunset, with no words in it", "travel trip airport plane airplane aircraft flight sunset dusk evening sky window podroz lotnisko samolot zachod reise flughafen flugzeug viaje aeropuerto avion voyage aeroport"],
      ["beach", "12:40", "A photo of a dog with a ball on a beach, with no words in it", "dog puppy pet animal beach sea ocean sand coast holiday vacation summer ball pies plaza morze wakacje lato hund strand meer perro playa chien plage"],
      ["invoice", "14:18", "An invoice for 1,280 euros", "invoice bill payment money finance receipt accounting cost faktura rachunek platnosc rechnung factura facture"],
      ["shop", "16:02", "A Polish shop's page for wireless headphones", "headphones headset earphones audio music sound shopping shop store buy price sluchawki muzyka zakupy sklep kopfhorer auriculares casque"],
      ["tests", "17:45", "A terminal where 412 tests passed", "code programming software developer terminal console tests build kod programowanie"],
    ];
    grid.innerHTML = CAPTURES.map(([thumb, time, alt]) =>
      `<div class="tile" role="listitem" aria-label="${alt}"><div class="th">${window.PrtScrThumbs.svg(thumb)}</div><span class="why"></span>` +
      `<footer><span class="mono">${time}</span><span class="marks"></span></footer></div>`,
    ).join("");
    const tiles = $$(".tile", grid).map((el, i) => {
      const marks = $$(".hl", el).map((r) => [r, r.dataset.words.split(" ")]);
      const tokens = marks.flatMap(([, w]) => w);
      // The tile's own marks, as the library shows them: text read, and ready for local AI search.
      $(".marks", el).innerHTML =
        (tokens.length ? `<span title="Text found">${ico("textScan")}</span>` : "") + `<span title="Ready for local AI search">${ico("sparkles")}</span>`;
      return { el, why: $(".why", el), marks, tokens, about: CAPTURES[i][3].split(" ") };
    });

    function show(q) {
      const qs = words(q);
      const meant = qs.filter((w) => !STOP.has(w));
      let found = 0;
      let byAi = 0;
      for (const t of tiles) {
        const byText = qs.length > 0 && qs.every((w) => t.tokens.some((k) => k.startsWith(w)));
        const byMeaning = !byText && meant.length > 0 && meant.every((w) => t.about.some((k) => k === w || (w.length >= 4 && k.startsWith(w))));
        t.el.classList.toggle("hit", byText || byMeaning);
        t.el.classList.toggle("by-text", byText);
        t.el.classList.toggle("by-ai", byMeaning);
        if (byText) t.why.innerHTML = `${ico("textScan")}Found in its text`;
        if (byMeaning) t.why.innerHTML = `${ico("sparkles")}Found by local AI`;
        for (const [r, w] of t.marks) r.classList.toggle("lit", byText && qs.some((x) => w.some((k) => k.startsWith(x))));
        if (byText || byMeaning) found++;
        if (byMeaning) byAi++;
      }
      lib.classList.toggle("searching", qs.length > 0);
      count.textContent = !qs.length ? `${tiles.length} captures` : !found ? "No captures match." : `${found} found${byAi ? `, ${byAi} by local AI` : ""}`;
      chips.forEach((b) => b.setAttribute("aria-pressed", String(fold(b.dataset.q) === fold(q.trim()))));
    }

    // The search waits for typing to rest, as the library's does.
    const measure = document.createElement("canvas").getContext("2d");
    let timer = 0;
    function set(v, now = false) {
      input.value = v;
      const cs = getComputedStyle(input);
      measure.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      caret.style.left = `${input.offsetLeft + measure.measureText(v).width + 1}px`;
      clearTimeout(timer);
      if (now || !v) show(v);
      else timer = setTimeout(() => show(input.value), 260);
    }

    // Until someone searches, it types a few searches of its own.
    const PLAN = ["krakow", "travel", "podróż", "dog on a beach", "headphones", "invoice"];
    let touched = -1e9;
    let next = 0;
    let phase = "type";
    let wait = 700;
    const touch = () => {
      touched = performance.now();
      phase = "erase";
      lib.classList.remove("auto");
    };
    input.addEventListener("input", () => { touch(); set(input.value); });
    input.addEventListener("focus", touch);
    chips.forEach((b) =>
      b.addEventListener("click", () => {
        touch();
        set(b.dataset.q, true);
      }),
    );
    if (reduceMotion) {
      set("travel", true);
      return;
    }
    set("");
    lib.classList.add("auto");
    whileVisible(demo, (dt, now) => {
      if (document.activeElement === input || now - touched < 9000) return;
      lib.classList.add("auto");
      wait -= dt;
      if (wait > 0) return;
      const target = PLAN[next];
      if (phase === "type") {
        if (input.value.length < target.length) {
          set(target.slice(0, input.value.length + 1));
          wait = 70 + Math.random() * 70;
        } else {
          phase = "hold";
          wait = 3000;
        }
      } else if (phase === "hold") {
        phase = "erase";
        next = (next + 1) % PLAN.length;
      } else if (input.value) {
        set(input.value.slice(0, -1));
        wait = 30;
      } else {
        phase = "type";
        wait = 450;
      }
    });
  })();

  // ---------------------------------------------------------------------------------------
  // Screens
  (function screens() {
    const img = $("#shotImg");
    const cap = $("#shotCap");
    if (!img) return;
    const SHOTS = {
      editor: ["img/editor.png", "Mark up a capture with boxes, arrows, text, highlights and pixelation, then copy it in one click.", "The PrtScr editor: a capture of a traffic dashboard marked up with a box, a curved arrow, a handwritten note, a highlight and pixelated e-mail addresses"],
      video: ["img/video.png", "Cut recordings together with titles, pointer effects, fades and music, on as many tracks as you need.", "PrtScr's video editor: a preview above a timeline of titles, pointer effects and details, with a title clip selected"],
      library: ["img/library.png", "Every capture, grouped by day, with categories, favourites and keywords, found again by the words in it or, with local AI search, by what it shows.", "PrtScr's library: captures grouped by day beside a preview of the selected one"],
    };
    const tabs = $$('.tabs [role="tab"]');
    tabs.forEach((tab) =>
      tab.addEventListener("click", () => {
        tabs.forEach((t) => t.setAttribute("aria-selected", String(t === tab)));
        const [src, text, alt] = SHOTS[tab.dataset.shot];
        img.style.opacity = "0.2";
        const next = new Image();
        next.onload = () => { img.src = src; img.alt = alt; cap.textContent = text; img.style.opacity = "1"; };
        next.src = src;
      }),
    );
    // Arrow keys move between tabs.
    $(".tabs").addEventListener("keydown", (e) => {
      const i = tabs.indexOf(document.activeElement);
      if (i < 0 || !["ArrowLeft", "ArrowRight"].includes(e.key)) return;
      const n = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
      n.focus();
      n.click();
    });
  })();
})();
