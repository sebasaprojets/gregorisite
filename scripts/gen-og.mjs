// Gera a imagem de compartilhamento (WhatsApp, Instagram, Facebook): public/images/og.jpg
// Rodar: node scripts/gen-og.mjs
import sharp from "sharp";

const W = 1200, H = 630;
const bg = await sharp("public/images/bg-desktop.webp").resize(W, H, { fit: "cover" }).toBuffer();
const photo = await sharp("public/images/retrato.webp").resize(330, 470, { fit: "cover", position: "top" }).toBuffer();
const text = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect x="0" y="0" width="${W}" height="${H}" fill="#07080a" opacity="0.35"/>
  <g font-family="DejaVu Sans, Arial, sans-serif" font-weight="700">
    <text x="80" y="170" font-family="DejaVu Sans Mono, monospace" font-size="22" font-weight="400" fill="#8b97a3" letter-spacing="4">CEO · VIKINGS TACTICAL GROUP</text>
    <text x="76" y="290" font-size="108" fill="#e8ecef">GREGORI</text>
    <text x="76" y="400" font-size="108" fill="#e5243b">SILVA</text>
    <text x="80" y="465" font-size="26" font-weight="400" fill="#c4ccd4">Instrutor tático e de atendimento pré-hospitalar</text>
    <text x="80" y="505" font-size="22" font-weight="400" fill="#8b97a3">Stop the Bleed · TECC/TCCC · NATI Tática Brasil · C3 Cursos</text>
  </g>
  <g stroke="#e5243b" stroke-width="3" fill="none">
    <path d="M770 60 h-30 v30"/><path d="M1130 60 h30 v30"/><path d="M770 570 h-30 v-30"/><path d="M1130 570 h30 v-30"/>
  </g>
</svg>`);
await sharp(bg)
  .composite([
    { input: text, top: 0, left: 0 },
    { input: photo, top: 80, left: 785 },
  ])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile("public/images/og.jpg");
console.log("og ok");
