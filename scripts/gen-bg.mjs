// Gera as imagens de fundo (fumaça vermelha, luz no chão, silhuetas) em public/images.
// Rodar: node scripts/gen-bg.mjs
import sharp from "sharp";

function svg(w, h, mobile) {
  const s = w / 1920;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <filter id="smoke" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="${0.0035 / s} ${0.006 / s}" numOctaves="5" seed="7"/>
      <feColorMatrix values="0 0 0 0 0.85  0 0 0 0 0.05  0 0 0 0 0.08  0 0 0 1.6 -0.55"/>
    </filter>
    <filter id="floor" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="${0.0015 / s} ${0.06 / s}" numOctaves="3" seed="3"/>
      <feColorMatrix values="0 0 0 0 0.9  0 0 0 0 0.2  0 0 0 0 0.22  0 0 0 1.4 -0.6"/>
    </filter>
    <filter id="glow"><feGaussianBlur stdDeviation="${14 * s}"/></filter>
    <filter id="glowS"><feGaussianBlur stdDeviation="${3 * s}"/></filter>
    <radialGradient id="mL" cx="${mobile ? 0 : 0.05}" cy="${mobile ? 0.3 : 0.55}" r="${mobile ? 0.42 : 0.45}">
      <stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#000"/>
    </radialGradient>
    <radialGradient id="mR" cx="${mobile ? 1 : 0.95}" cy="${mobile ? 0.62 : 0.4}" r="${mobile ? 0.35 : 0.4}">
      <stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#000"/>
    </radialGradient>
    <mask id="smokeMask">
      <rect width="100%" height="100%" fill="url(#mL)"/>
      <rect width="100%" height="100%" fill="url(#mR)" style="mix-blend-mode:screen"/>
    </mask>
    <linearGradient id="floorFade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#000"/><stop offset="0.45" stop-color="#fff"/><stop offset="1" stop-color="#666"/>
    </linearGradient>
    <mask id="floorMask"><rect y="${h * 0.72}" width="${w}" height="${h * 0.28}" fill="url(#floorFade)"/></mask>
    <linearGradient id="slash" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#e5243b" stop-opacity="0.55"/><stop offset="1" stop-color="#e5243b" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="vig" cx="0.5" cy="0.45" r="0.75">
      <stop offset="0.55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.75"/>
    </radialGradient>
    <radialGradient id="warm" cx="${mobile ? 0.2 : 0.12}" cy="${mobile ? 0.3 : 0.5}" r="0.5">
      <stop offset="0" stop-color="#6b0a14" stop-opacity="0.55"/><stop offset="1" stop-color="#6b0a14" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="100%" height="100%" fill="#050607"/>
  <rect width="100%" height="100%" fill="url(#warm)"/>
  <rect width="100%" height="100%" filter="url(#smoke)" mask="url(#smokeMask)"/>
  <rect width="100%" height="100%" filter="url(#floor)" mask="url(#floorMask)" opacity="0.8"/>

  <!-- faixa de luz vermelha no chão -->
  <ellipse cx="${w * 0.12}" cy="${h * 0.79}" rx="${w * 0.35}" ry="${16 * s}" fill="#ff2a3d" opacity="0.55" filter="url(#glow)"/>
  <ellipse cx="${w * 0.1}" cy="${h * 0.79}" rx="${w * 0.22}" ry="${3 * s}" fill="#ff6b78" opacity="0.9" filter="url(#glowS)"/>
  <ellipse cx="${w * 0.72}" cy="${h * 0.86}" rx="${w * 0.08}" ry="${4 * s}" fill="#ff2a3d" opacity="0.5" filter="url(#glowS)"/>

  <!-- cortes diagonais -->
  <polygon points="${w * 0.9},0 ${w},0 ${w},${h * 0.18} ${w * 0.83},${h * 0.35}" fill="url(#slash)" opacity="0.35"/>
  <polygon points="${w * 0.96},${h * 0.55} ${w},${h * 0.5} ${w},${h * 0.7} ${w * 0.9},${h * 0.8}" fill="url(#slash)" opacity="0.45"/>

  <rect width="100%" height="100%" fill="url(#vig)"/>
</svg>`;
}

async function silhouettes(w, h, mobile) {
  // Foto de operadores em vermelho escuro, sumindo para a esquerda e nas bordas
  const tw = Math.round(mobile ? w : w * 0.42);
  const th = Math.round(mobile ? h * 0.55 : h);
  const gray = await sharp("public/images/equipe.webp")
    .resize(tw, th, { fit: "cover", position: "top" })
    .blur(mobile ? 4 : 3)
    .grayscale()
    .linear(1.5, -40)
    .toColourspace("srgb")
    .toBuffer();
  const red = await sharp(gray)
    .recomb([
      [0.95, 0, 0],
      [0.1, 0, 0],
      [0.14, 0, 0],
    ])
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Máscara: some à esquerda (e no topo/base), mais forte à direita
  const alpha = Buffer.alloc(tw * th);
  const ease = (t) => t * t * (3 - 2 * t);
  for (let y = 0; y < th; y++) {
    const vy = Math.min(1, y / (th * 0.2), (th - y) / (th * 0.3));
    for (let x = 0; x < tw; x++) {
      const hx = mobile ? Math.min(1, x / (tw * 0.35), (tw - x) / (tw * 0.35)) : Math.min(1, x / (tw * 0.6));
      alpha[y * tw + x] = Math.round(255 * (mobile ? 0.4 : 0.6) * ease(Math.max(0, hx)) * ease(Math.max(0, vy)));
    }
  }
  const img = await sharp(red.data, { raw: { width: tw, height: th, channels: 3 } })
    .joinChannel(alpha, { raw: { width: tw, height: th, channels: 1 } })
    .png()
    .toBuffer();
  return { input: img, left: w - tw, top: mobile ? Math.round(h * 0.4) : 0 };
}

for (const [name, w, h, mobile] of [
  ["bg-desktop", 1920, 1080, false],
  ["bg-mobile", 900, 1800, true],
]) {
  const base = await sharp(Buffer.from(svg(w, h, mobile))).png().toBuffer();
  const sil = await silhouettes(w, h, mobile);
  await sharp(base)
    .composite([sil])
    .webp({ quality: 72 })
    .toFile(`public/images/${name}.webp`);
  console.log(name, "ok");
}
