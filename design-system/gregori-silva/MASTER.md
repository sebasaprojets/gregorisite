# Design System — Gregori Silva

Regras seguidas no site, no formato do UI UX Pro Max (mesma estrutura usada no `rgrelogios`).

**Categoria:** Marca pessoal / instrutor tático e APH
**Estilo:** Dark mode, HUD futurista (grade, cantoneiras de mira, linha de varredura, textos em mono)
**Dials:** Variação 6/10 (bento e assimetria) · Movimento 7/10 (interativo) · Densidade 4/10

## Cores (`src/index.css`, bloco `@theme`)

| Papel | Hex | Uso |
|------|-----|-----|
| Fundo | `#07080A` | página |
| Superfície | `#0E1114` / `#141920` | cards |
| Linha | `#1F262E` | bordas |
| Texto | `#E8ECEF` | títulos e texto principal |
| Texto suave | `#8B97A3` | parágrafos (contraste 6.4:1 no fundo) |
| Acento | `#E5243B` | CTA, destaques (vermelho Stop the Bleed / cruz de APH) |
| Acento claro | `#FF5A6B` | texto pequeno em vermelho (contraste 5.9:1) |
| HUD | `#22D3EE` | detalhes futuristas, foco do teclado |

## Tipografia

- **Títulos:** Chakra Petch (600/700, caixa alta)
- **Texto:** Inter (400/500/600)
- **Rótulos/HUD:** JetBrains Mono

## Movimento (Framer Motion)

- Curva padrão `[0.16, 1, 0.3, 1]`, entradas de 0.4 a 0.8 s.
- `MotionConfig reducedMotion="user"` + CSS `prefers-reduced-motion`: sem animações para quem desativou.
- Efeitos só com mouse (`pointerType === "mouse"`): tilt 3D, botão magnético.

## Componentes (estilo 21st.dev, em `src/components/ui`)

Spotlight card, magnetic button, tilt card, scramble text, animated counter, marquee, reveal, HUD corners.

## Checklist de UX

- Alvos de toque ≥ 44px; foco visível; `cursor: pointer` em links e botões.
- Imagens com `alt`, lightbox fecha com Esc e navega com as setas.
- Sem rolagem horizontal em 390px; menu mobile em tela cheia.
- Ícones SVG (lucide), nunca emojis.
