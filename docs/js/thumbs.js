// Small made-up captures, drawn as SVG, for library thumbnails in the mockups and the site.
// Nothing here is a real screenshot: every scene is invented.
window.PrtScrThumbs = (function () {
  const W = 160;
  const H = 100;
  const wrap = (body, bg) =>
    `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">` +
    `<rect width="${W}" height="${H}" fill="${bg}"/>${body}</svg>`;
  const lines = (x, y, widths, gap, color, h = 3) =>
    widths.map((w, i) => `<rect x="${x}" y="${y + i * gap}" width="${w}" height="${h}" rx="1.5" fill="${color}"/>`).join("");

  const scenes = {
    traffic: () =>
      wrap(
        `<rect width="160" height="12" fill="#F1F2F6"/><circle cx="8" cy="6" r="2.4" fill="#5A62F2"/>` +
          lines(14, 4.5, [26], 0, "#C9CCD6") +
          `<rect x="8" y="18" width="44" height="18" rx="3" fill="#F4F5FA"/><rect x="58" y="18" width="44" height="18" rx="3" fill="#F4F5FA"/><rect x="108" y="18" width="44" height="18" rx="3" fill="#F4F5FA"/>` +
          lines(12, 22, [18], 0, "#B7BAC6", 2.5) + lines(62, 22, [22], 0, "#B7BAC6", 2.5) + lines(112, 22, [16], 0, "#B7BAC6", 2.5) +
          `<rect x="12" y="28" width="26" height="5" rx="1.5" fill="#1D1F2A"/><rect x="62" y="28" width="20" height="5" rx="1.5" fill="#1D1F2A"/><rect x="112" y="28" width="28" height="5" rx="1.5" fill="#1D1F2A"/>` +
          `<path d="M10 88 L30 80 L48 83 L66 72 L84 75 L102 58 L120 52 L138 44 L150 40" fill="none" stroke="#5A62F2" stroke-width="2.4" stroke-linejoin="round"/>` +
          `<path d="M10 88 L30 80 L48 83 L66 72 L84 75 L102 58 L120 52 L138 44 L150 40 L150 94 L10 94Z" fill="#5A62F2" opacity=".12"/>`,
        "#FFFFFF",
      ),
    notes: () =>
      wrap(
        `<rect x="22" y="8" width="116" height="92" rx="3" fill="#FFFFFF"/>` +
          `<rect x="32" y="18" width="64" height="7" rx="2" fill="#1D1F2A"/>` +
          lines(32, 33, [92, 84, 96, 60], 7, "#C9CCD6") +
          `<rect x="32" y="66" width="40" height="5" rx="2" fill="#5A62F2" opacity=".8"/>` +
          lines(32, 77, [88, 76, 90], 7, "#C9CCD6"),
        "#E9EAF0",
      ),
    chat: () =>
      wrap(
        `<rect width="40" height="100" fill="#20222B"/>` +
          [16, 30, 44, 58].map((y, i) => `<circle cx="10" cy="${y}" r="4" fill="${["#FF8A4C", "#5A62F2", "#3CCB8F", "#E5C454"][i]}"/><rect x="17" y="${y - 2}" width="16" height="3" rx="1.5" fill="#4A4D5A"/>`).join("") +
          `<rect x="48" y="12" width="70" height="16" rx="8" fill="#2C2F3A"/><rect x="74" y="34" width="78" height="16" rx="8" fill="#5A62F2"/>` +
          `<rect x="48" y="56" width="58" height="26" rx="7" fill="#2C2F3A"/><rect x="52" y="60" width="50" height="18" rx="4" fill="#7D6CF6"/><circle cx="77" cy="69" r="5" fill="#FF8A4C"/>` +
          `<rect x="46" y="88" width="108" height="9" rx="4.5" fill="#2A2C35"/>`,
        "#17181E",
      ),
    terminal: () =>
      wrap(
        `<rect width="160" height="10" fill="#1E2028"/><circle cx="7" cy="5" r="2" fill="#FF5F57"/><circle cx="13" cy="5" r="2" fill="#FEBC2E"/><circle cx="19" cy="5" r="2" fill="#28C840"/>` +
          `<text x="8" y="24" font-family="ui-monospace,Menlo,monospace" font-size="7" fill="#8B8F9A">$ <tspan fill="#ECEDF1">npm test</tspan></text>` +
          `<text x="8" y="36" font-family="ui-monospace,Menlo,monospace" font-size="7" fill="#3CCB8F">✓ 412 passed</text>` +
          `<text x="8" y="48" font-family="ui-monospace,Menlo,monospace" font-size="7" fill="#3CCB8F">✓ export matches preview</text>` +
          `<text x="8" y="60" font-family="ui-monospace,Menlo,monospace" font-size="7" fill="#A7AAB5">Done in 8.4s</text>` +
          `<text x="8" y="74" font-family="ui-monospace,Menlo,monospace" font-size="7" fill="#8B8F9A">$ <tspan fill="#ECEDF1">_</tspan></text>`,
        "#121318",
      ),
    pricing: () =>
      wrap(
        `<rect x="60" y="8" width="40" height="5" rx="2" fill="#1D1F2A"/>` +
          [12, 60, 108]
            .map((x, i) =>
              `<rect x="${x}" y="22" width="40" height="70" rx="4" fill="${i === 1 ? "#5A62F2" : "#FFFFFF"}" stroke="#E2E4EC"/>` +
              `<rect x="${x + 6}" y="30" width="18" height="3" rx="1.5" fill="${i === 1 ? "#C9CCFF" : "#B7BAC6"}"/>` +
              `<rect x="${x + 6}" y="38" width="24" height="7" rx="2" fill="${i === 1 ? "#FFFFFF" : "#1D1F2A"}"/>` +
              lines(x + 6, 52, [28, 22, 26], 6, i === 1 ? "#9DA3FF" : "#D5D8E0", 2.5) +
              `<rect x="${x + 6}" y="78" width="28" height="8" rx="4" fill="${i === 1 ? "#FFFFFF" : "#EEF0F6"}"/>`,
            )
            .join(""),
        "#F6F7FB",
      ),
    tour: () =>
      wrap(
        `<defs><radialGradient id="sunT" cx="50%" cy="40%" r="60%"><stop offset="0" stop-color="#FFB36B"/><stop offset="1" stop-color="#FF5A4F"/></radialGradient></defs>` +
          `<circle cx="112" cy="34" r="26" fill="url(#sunT)" opacity=".95"/><circle cx="40" cy="140" r="90" fill="#FFFFFF" opacity=".12"/>` +
          `<rect x="22" y="56" width="62" height="5" rx="2" fill="#FFFFFF"/><rect x="22" y="65" width="40" height="3" rx="1.5" fill="#FFFFFF" opacity=".7"/>`,
        "#6A63F0",
      ),
    bug: () =>
      wrap(
        `<rect x="30" y="10" width="100" height="80" rx="5" fill="#FFFFFF"/>` +
          lines(40, 20, [40], 0, "#1D1F2A", 5) +
          `<rect x="40" y="32" width="80" height="9" rx="2" fill="#F1F2F6"/><rect x="40" y="46" width="80" height="9" rx="2" fill="#F1F2F6"/>` +
          `<rect x="76" y="66" width="44" height="12" rx="6" fill="#5A62F2" opacity=".35"/>` +
          `<ellipse cx="98" cy="72" rx="30" ry="12" fill="none" stroke="#FF4A5B" stroke-width="2.4"/>` +
          `<path d="M24 92 L66 76" stroke="#FF4A5B" stroke-width="2.4" stroke-linecap="round"/><path d="M58 74 L68 75.5 L62 83" fill="none" stroke="#FF4A5B" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`,
        "#E4E6EE",
      ),
    sheet: () =>
      wrap(
        `<rect width="160" height="12" fill="#1F7A4D"/>` +
          Array.from({ length: 8 }, (_, r) =>
            Array.from({ length: 5 }, (_, c) =>
              `<rect x="${c * 32}" y="${12 + r * 11}" width="32" height="11" fill="${r === 0 ? "#EEF3EF" : "#FFFFFF"}" stroke="#D9DED9" stroke-width=".6"/>` +
              (r > 0 ? `<rect x="${c * 32 + 4}" y="${16 + r * 11}" width="${c === 0 ? 20 : 12 + ((r * 7 + c * 3) % 12)}" height="3" rx="1" fill="${c === 0 ? "#6B7280" : "#A3AAB5"}"/>` : ""),
            ).join(""),
          ).join(""),
        "#FFFFFF",
      ),
    desktop: () =>
      wrap(
        `<defs><linearGradient id="wpD" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2B2F7A"/><stop offset="1" stop-color="#7A5AF0"/></linearGradient></defs>` +
          `<rect width="160" height="100" fill="url(#wpD)"/><circle cx="128" cy="26" r="18" fill="#FF9A5A" opacity=".85"/>` +
          `<rect x="14" y="16" width="70" height="50" rx="4" fill="#F6F7FB"/><rect x="14" y="16" width="70" height="8" rx="4" fill="#E2E4EC"/>` +
          `<rect x="62" y="40" width="74" height="46" rx="4" fill="#1A1B20"/><rect x="62" y="40" width="74" height="8" rx="4" fill="#24252C"/>` +
          `<rect x="40" y="92" width="80" height="6" rx="3" fill="#FFFFFF" opacity=".25"/>`,
        "#2B2F7A",
      ),
    design: () =>
      wrap(
        `<rect x="10" y="10" width="140" height="80" rx="6" fill="#7B74F4"/>` +
          `<circle cx="104" cy="46" r="22" fill="#FF8A4C"/><circle cx="104" cy="46" r="22" fill="#FFB36B" opacity=".5"/>` +
          `<rect x="22" y="58" width="52" height="22" rx="5" fill="#FFFFFF" opacity=".35"/>` +
          `<rect x="22" y="22" width="40" height="6" rx="2" fill="#FFFFFF"/>`,
        "#2A2B33",
      ),
    map: () =>
      wrap(
        `<path d="M0 70 C 40 60, 60 80, 100 64 S 150 50, 160 56" stroke="#FFFFFF" stroke-width="6" fill="none"/>` +
          `<path d="M30 0 C 40 30, 70 40, 76 100" stroke="#FFFFFF" stroke-width="4" fill="none"/>` +
          `<rect x="100" y="12" width="40" height="26" rx="3" fill="#CDE8D2"/><rect x="10" y="78" width="30" height="16" rx="3" fill="#CDE8D2"/>` +
          `<circle cx="88" cy="58" r="7" fill="#FF4A5B"/><circle cx="88" cy="58" r="2.6" fill="#FFFFFF"/>`,
        "#E8EBE3",
      ),
  };

  return {
    names: Object.keys(scenes),
    svg: (name) => (scenes[name] || scenes.traffic)(),
  };
})();
