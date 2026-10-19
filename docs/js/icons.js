// Line icons (Lucide-style, 24 × 24, stroked) used across the site.
// Injected once as a sprite; use them with <svg class="ico"><use href="#i-name"/></svg>.
(function () {
  const ICONS = {
    camera:
      '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>',
    copy: '<rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
    download:
      '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5M12 15V3"/>',
    pointer:
      '<path d="M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z"/>',
    hand: '<path d="M18 11V6a2 2 0 0 0-4 0M14 10V4a2 2 0 0 0-4 0v2M10 10.5V6a2 2 0 0 0-4 0v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>',
    square: '<rect width="18" height="18" x="3" y="3" rx="2"/>',
    type: '<path d="M4 7V4h16v3M9 20h6M12 4v16"/>',
    pixelate: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 7v10M15 7v10M7 9h10M7 15h10"/>',
    select: '<rect x="3" y="3" width="18" height="18" rx="2" stroke-dasharray="3.2 3"/>',
    crop: '<path d="M6 2v14a2 2 0 0 0 2 2h14"/><path d="M18 22V8a2 2 0 0 0-2-2H2"/>',
    chevronLeft: '<path d="m15 18-6-6 6-6"/>',
    monitor: '<rect width="20" height="14" x="2" y="3" rx="2"/><path d="M8 21h8M12 17v4"/>',
    window: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 9h20"/>',
    play: '<path d="M6 3l14 9-14 9z"/>',
    pause: '<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>',
    music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
    film: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 3v18M3 7.5h4M3 12h18M3 16.5h4M17 3v18M17 7.5h4M17 16.5h4"/>',
    cloud: '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>',
    folder:
      '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>',
    server:
      '<rect width="20" height="8" x="2" y="2" rx="2"/><rect width="20" height="8" x="2" y="14" rx="2"/><path d="M6 6h.01M6 18h.01"/>',
    drive:
      '<path d="M22 12H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/><path d="M6 16h.01M10 16h.01"/>',
    terminal: '<path d="m4 17 6-6-6-6M12 19h8"/>',
    lock: '<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    arrow: '<path d="M5 19 19 5M10 5h9v9"/>',
    windows: '<path fill="currentColor" stroke="none" d="M3 5.5 10.5 4.5v7H3zM11.5 4.35 21 3v8.5h-9.5zM3 12.5h7.5v7L3 18.5zM11.5 12.5H21V21l-9.5-1.35z"/>',
    // A penguin for Linux: body with the belly, eyes and beak cut out, then the feet.
    linux:
      '<path fill="currentColor" stroke="none" fill-rule="evenodd" d="M12 1.6c-2.9 0-4.2 2.3-4.2 4.8 0 1.6-.6 2.7-1.6 4.2-1.3 2-1.9 4-1.5 6 .3 1.5 1.2 2.7 2.5 3.4h9.6c1.3-.7 2.2-1.9 2.5-3.4.4-2-.2-4-1.5-6-1-1.5-1.6-2.6-1.6-4.2 0-2.5-1.3-4.8-4.2-4.8ZM12 10.6c2 0 3.7 2.2 3.7 4.9S14 20.4 12 20.4s-3.7-2.2-3.7-4.9 1.7-4.9 3.7-4.9ZM10.5 5.3a.95.95 0 1 0 0 1.9.95.95 0 0 0 0-1.9Zm3 0a.95.95 0 1 0 0 1.9.95.95 0 0 0 0-1.9ZM10.7 8.1 12 7.4l1.3.7L12 9.1Z"/><path fill="currentColor" stroke="none" d="M5.6 20.4c.6-.9 2.5-.9 3.6-.4.7.3.9 1 .6 1.6-.2.4-.7.6-1.2.6H6.4c-.9 0-1.3-1-.8-1.8Zm12.8 0c-.6-.9-2.5-.9-3.6-.4-.7.3-.9 1-.6 1.6.2.4.7.6 1.2.6h2.2c.9 0 1.3-1 .8-1.8Z"/>',
    apple:
      '<path fill="currentColor" stroke="none" d="M16.37 1.43c0 1.14-.49 2.27-1.18 3.08-.74.9-1.99 1.57-2.99 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.57-2.27 1.21-2.98.8-.94 2.14-1.64 3.25-1.68.03.13.05.28.05.43zm4.56 15.71c-.03.07-.46 1.58-1.52 3.12-.94 1.34-1.94 2.71-3.43 2.71-1.52 0-1.9-.88-3.63-.88-1.7 0-2.3.91-3.67.91-1.38 0-2.33-1.26-3.43-2.8C3.96 18.38 2.92 15.57 2.92 12.92c0-4.28 2.8-6.55 5.55-6.55 1.45 0 2.68.95 3.6.95.87 0 2.22-1.01 3.9-1.01.61 0 2.89.06 4.37 2.19-.13.09-2.38 1.37-2.38 4.19 0 3.26 2.85 4.42 2.96 4.45z"/>',
  };
  const ns = "http://www.w3.org/2000/svg";
  const sprite = document.createElementNS(ns, "svg");
  sprite.setAttribute("aria-hidden", "true");
  sprite.style.cssText = "position:absolute;width:0;height:0;overflow:hidden";
  sprite.innerHTML = Object.entries(ICONS)
    .map(([name, body]) => `<symbol id="i-${name}" viewBox="0 0 24 24">${body}</symbol>`)
    .join("");
  const attach = () => document.body.prepend(sprite);
  if (document.body) attach();
  else document.addEventListener("DOMContentLoaded", attach);
})();
