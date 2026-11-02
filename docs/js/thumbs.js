// Small made-up captures, drawn as SVG, for library thumbnails in the mockups and the site.
// Nothing here is a real screenshot: every scene is invented.
window.PrtScrThumbs = (function () {
  const W = 160;
  const H = 100;
  const SANS = "-apple-system,'Segoe UI',Inter,system-ui,sans-serif";
  const MONO = "ui-monospace,Menlo,Consolas,monospace";
  const wrap = (body, bg) =>
    `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" font-family="${SANS}">` +
    `<rect width="${W}" height="${H}" fill="${bg}"/>${body}</svg>`;
  const lines = (x, y, widths, gap, color, h = 3) =>
    widths.map((w, i) => `<rect x="${x}" y="${y + i * gap}" width="${w}" height="${h}" rx="1.5" fill="${color}"/>`).join("");
  // Text on a capture, as the library's search reads it: a mark behind it (class "hl") that the
  // site lights when a search finds the word, carrying its words folded as the search folds them.
  const fold = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ł/g, "l").replace(/ß/g, "ss");
  const word = (x, y, size, text, fill, { weight = 700, mono = false } = {}) => {
    const caps = /[A-Z]/.test(text) && text === text.toUpperCase();
    const len = text.length * size * (mono ? 0.6 : (weight >= 650 ? 0.58 : 0.5) + (caps ? 0.08 : 0));
    const keys = fold(text).split(/[^a-z0-9]+/).filter(Boolean).join(" ");
    return (
      `<rect class="hl" data-words="${keys}" x="${x - 1.5}" y="${y - size * 0.88}" width="${(len + 3).toFixed(1)}" height="${(size * 1.14).toFixed(1)}" rx="1.5" fill="#FFD23F" opacity="0"/>` +
      `<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" textLength="${len.toFixed(1)}" lengthAdjust="spacingAndGlyphs" fill="${fill}"${mono ? ` font-family="${MONO}"` : ""}>${text}</text>`
    );
  };
  const MUTED = "#8A8FA0";

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
    // For the search demo: a trip, a bill, a shop, a test run, and two photos with no words in them.
    boarding: () =>
      wrap(
        `<rect x="8" y="10" width="144" height="80" rx="6" fill="#FFFFFF"/><path d="M8 16a6 6 0 0 1 6-6h132a6 6 0 0 1 6 6v10H8z" fill="#5A62F2"/>` +
          word(14, 20.5, 6, "BOARDING", "#FFFFFF") + word(50, 20.5, 6, "PASS", "#FFFFFF") +
          word(14, 47, 15, "WAW", "#1D1F2A") +
          `<path d="M50 42h10m-3-3 3 3-3 3" stroke="#9AA0B4" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` +
          word(66, 47, 15, "LIS", "#1D1F2A") +
          word(14, 55, 5, "Warsaw", MUTED, { weight: 500 }) + word(66, 55, 5, "Lisbon", MUTED, { weight: 500 }) +
          word(14, 69, 4.5, "GATE", MUTED, { weight: 600 }) + word(14, 79, 8, "B12", "#1D1F2A") +
          word(40, 69, 4.5, "SEAT", MUTED, { weight: 600 }) + word(40, 79, 8, "14C", "#1D1F2A") +
          word(66, 69, 4.5, "FLIGHT", MUTED, { weight: 600 }) + word(66, 79, 8, "LO431", "#1D1F2A") +
          `<path d="M108 34v48" stroke="#E2E4EC" stroke-dasharray="2 2"/>` +
          Array.from({ length: 15 }, (_, i) => `<rect x="${115 + i * 2}" y="38" width="${0.7 + ((i * 7) % 3) * 0.5}" height="38" fill="#1D1F2A"/>`).join(""),
        "#DCE2F0",
      ),
    train: () =>
      wrap(
        `<rect x="10" y="12" width="140" height="76" rx="4" fill="#FFFDF8" stroke="#E3DCCB"/><path d="M10 16a4 4 0 0 1 4-4h132a4 4 0 0 1 4 4v8H10z" fill="#2F7D62"/>` +
          word(16, 21, 6, "BILET", "#FFFFFF") + word(40, 21, 5.5, "TICKET", "#CFE8DD", { weight: 600 }) +
          word(16, 41, 9, "Kraków", "#1D1F2A") + word(50, 41, 9, "Gł.", "#1D1F2A") +
          `<path d="M68 37.5h8m-2.5-2.5 2.5 2.5-2.5 2.5" stroke="#9AA0B4" stroke-width="1.3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` +
          word(82, 41, 9, "Gdańsk", "#1D1F2A") +
          word(16, 52, 5, "Wagon 7", MUTED, { weight: 500 }) + word(48, 52, 5, "Miejsce 42", MUTED, { weight: 500 }) +
          word(16, 70, 11, "08:15", "#1D1F2A") + word(82, 70, 11, "12:47", "#1D1F2A") +
          word(104, 82, 7, "89,00 zł", "#2F7D62"),
        "#EDE6D8",
      ),
    hotel: () =>
      wrap(
        `<defs><linearGradient id="poolH" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8FDCF5"/><stop offset="1" stop-color="#2E8FD0"/></linearGradient></defs>` +
          `<rect width="160" height="12" fill="#F1F2F6"/><circle cx="8" cy="6" r="2.4" fill="#FF6A5B"/>` + lines(14, 4.5, [30], 0, "#C9CCD6") +
          `<circle cx="20" cy="28" r="6" fill="#3CCB8F"/><path d="M17.2 28.2l2 2 3.8-4" stroke="#FFFFFF" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` +
          word(30, 31, 8, "Booking", "#1D1F2A") + word(65, 31, 8, "confirmed", "#1D1F2A") +
          word(30, 41, 5.5, "Hotel Miramar, Lisbon", "#6B7080", { weight: 500 }) +
          `<rect x="14" y="50" width="58" height="40" rx="3" fill="url(#poolH)"/><rect x="14" y="50" width="58" height="17" rx="3" fill="#F3E4CC"/>` +
          [20, 30, 40, 50, 60].map((x) => `<rect x="${x}" y="54" width="5" height="7" rx="1" fill="#7FA9C9"/>`).join("") +
          `<path d="M20 78h46M26 84h34" stroke="#FFFFFF" stroke-width="1.2" opacity=".6" stroke-linecap="round"/>` +
          word(80, 58, 5.5, "2 nights, 14–16 Nov", "#6B7080", { weight: 500 }) +
          word(80, 68, 5.5, "Check-in 15:00", "#6B7080", { weight: 500 }) +
          word(80, 85, 10, "€248", "#1D1F2A"),
        "#FFFFFF",
      ),
    airport: () =>
      wrap(
        `<defs><linearGradient id="skyA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3A2F8F"/><stop offset=".55" stop-color="#C65D9B"/><stop offset="1" stop-color="#FFB36B"/></linearGradient></defs>` +
          `<rect width="160" height="100" fill="url(#skyA)"/><circle cx="112" cy="62" r="15" fill="#FFD08A" opacity=".95"/>` +
          `<rect y="68" width="160" height="32" fill="#2A2342"/>` +
          [10, 30, 50, 70, 90, 110, 130, 150].map((x) => `<circle cx="${x}" cy="84" r="1" fill="#FFD08A"/>`).join("") +
          `<g fill="#17132B"><ellipse cx="70" cy="64" rx="30" ry="4.2"/><path d="M42 63 35 50h6l9 12z"/><path d="M64 65l18 9h6L76 64z"/><path d="M100 62c3 0 5 1 5 2s-2 2-5 2z"/></g>` +
          `<g fill="#100D1E"><rect width="160" height="6"/><rect x="52" width="4" height="100"/><rect x="106" width="4" height="100"/><rect y="92" width="160" height="8"/></g>`,
        "#3A2F8F",
      ),
    beach: () =>
      wrap(
        `<defs><linearGradient id="skyB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7CC8F5"/><stop offset="1" stop-color="#D8F1FF"/></linearGradient></defs>` +
          `<rect width="160" height="100" fill="url(#skyB)"/><circle cx="130" cy="20" r="9" fill="#FFE38A"/>` +
          `<rect y="44" width="160" height="20" fill="#2F9BD3"/><path d="M0 50c12-3 22 3 34 0s22-3 34 0 22 3 34 0 22-3 34 0 18 3 24 0" stroke="#FFFFFF" stroke-width="1" fill="none" opacity=".5"/>` +
          `<path d="M0 62c30-6 70-4 100-1s45 3 60 0v39H0z" fill="#F2D59B"/>` +
          `<ellipse cx="72" cy="87" rx="22" ry="3" fill="#000" opacity=".1"/>` +
          `<g fill="#8A5A3B"><ellipse cx="70" cy="73" rx="16" ry="7"/><rect x="57" y="75" width="3.4" height="12" rx="1.5"/><rect x="63" y="76" width="3.4" height="11" rx="1.5"/><rect x="75" y="76" width="3.4" height="11" rx="1.5"/><rect x="81" y="75" width="3.4" height="12" rx="1.5"/><circle cx="88" cy="63" r="6.5"/><ellipse cx="94.5" cy="65.5" rx="4.5" ry="3"/></g>` +
          `<path d="M55 71c-6-3-7-8-5-12" stroke="#8A5A3B" stroke-width="3" fill="none" stroke-linecap="round"/>` +
          `<path d="M84 58c-3 1-4 6-2 9 2-1 3-5 2-9z" fill="#5E3B26"/><circle cx="90" cy="61.5" r="1" fill="#1D1F2A"/><circle cx="98.6" cy="64.6" r="1.2" fill="#1D1F2A"/>` +
          `<circle cx="110" cy="83" r="4" fill="#FF4A5B"/><path d="M106.4 81.5c2.4 1 4.8 1 7.2 0" stroke="#FFFFFF" stroke-width=".8" fill="none"/>`,
        "#7CC8F5",
      ),
    invoice: () =>
      wrap(
        `<rect x="26" y="6" width="108" height="94" fill="#FFFFFF"/>` +
          word(34, 22, 9, "INVOICE", "#1D1F2A") + word(108, 22, 5.5, "#2041", MUTED, { weight: 500 }) +
          word(34, 31, 5, "Northwind Studio", MUTED, { weight: 500 }) +
          [42, 50, 58].map((y, i) => `<rect x="34" y="${y}" width="${[58, 46, 52][i]}" height="3" rx="1.5" fill="#C9CCD6"/><rect x="108" y="${y}" width="18" height="3" rx="1.5" fill="#B7BAC6"/>`).join("") +
          `<path d="M34 66h92" stroke="#E2E4EC"/>` +
          word(34, 77, 6.5, "Total", "#1D1F2A") + word(94, 77, 7, "€1,280.00", "#1D1F2A") +
          word(34, 89, 5, "Due 14 Nov", "#FF4A5B", { weight: 600 }),
        "#E4E6EE",
      ),
    shop: () =>
      wrap(
        `<rect width="160" height="13" fill="#FF6A3D"/>` + word(8, 9, 6, "sklep", "#FFFFFF") + `<rect x="96" y="3.5" width="56" height="6" rx="3" fill="#FFFFFF" opacity=".9"/>` +
          `<rect x="10" y="19" width="60" height="74" rx="4" fill="#F4F5FA"/>` +
          `<path d="M24 60a16 18 0 0 1 32 0" stroke="#1D1F2A" stroke-width="4" fill="none" stroke-linecap="round"/>` +
          `<rect x="19" y="55" width="10" height="17" rx="4" fill="#1D1F2A"/><rect x="51" y="55" width="10" height="17" rx="4" fill="#1D1F2A"/><rect x="21.5" y="58.5" width="5" height="10" rx="2" fill="#FF6A3D"/><rect x="53.5" y="58.5" width="5" height="10" rx="2" fill="#FF6A3D"/>` +
          word(78, 32, 8.5, "Słuchawki", "#1D1F2A") + word(78, 41, 5.5, "bezprzewodowe", "#6B7080", { weight: 500 }) +
          [0, 1, 2, 3, 4].map((i) => `<circle cx="${80.5 + i * 6}" cy="48.5" r="2.1" fill="${i < 4 ? "#FFB020" : "#E2E4EC"}"/>`).join("") +
          word(78, 66, 11, "349 zł", "#FF6A3D") +
          `<rect x="78" y="73" width="58" height="13" rx="6.5" fill="#1D1F2A"/>` + word(88, 81.5, 5.5, "Do koszyka", "#FFFFFF", { weight: 600 }),
        "#FFFFFF",
      ),
    tests: () =>
      wrap(
        `<rect width="160" height="10" fill="#1E2028"/><circle cx="7" cy="5" r="2" fill="#FF5F57"/><circle cx="13" cy="5" r="2" fill="#FEBC2E"/><circle cx="19" cy="5" r="2" fill="#28C840"/>` +
          word(8, 25, 7, "$ pnpm test", "#ECEDF1", { mono: true }) +
          word(8, 38, 7, "✓ 412 passed", "#3CCB8F", { mono: true }) +
          word(8, 50, 7, "✓ export matches preview", "#3CCB8F", { mono: true }) +
          word(8, 62, 7, "Done in 8.4s", "#A7AAB5", { mono: true }),
        "#121318",
      ),
  };

  return {
    names: Object.keys(scenes),
    svg: (name) => (scenes[name] || scenes.traffic)(),
  };
})();
