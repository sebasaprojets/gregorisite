# Gregori Silva — site

Site pessoal de Gregori Silva (@gregoandres27): CEO da Vikings Tactical Group, instrutor Stop the Bleed, TECC/TCCC, NATI Tática Brasil e C3 Cursos, voluntário da SOBRASA.

**Stack:** React + Vite + TypeScript, Tailwind CSS v4, Framer Motion, componentes no estilo 21st.dev.

```bash
npm install
npm run dev      # desenvolvimento
npm run build    # gera a pasta dist/
```

- Textos, links e números: `src/data/profile.ts`
- Fotos: `public/images/` (as atuais foram recortadas do print do Instagram; troque por fotos em alta resolução com o mesmo nome)
- Design system: `design-system/gregori-silva/MASTER.md`
- Imagem de compartilhamento: `node scripts/gen-og.mjs` gera `public/images/og.jpg`
- Fundo (fumaça, luz no chão, silhuetas): gerado por `node scripts/gen-bg.mjs` em `public/images/bg-*.webp`
- Publicação: o workflow `.github/workflows/deploy.yml` publica no GitHub Pages a cada push (Settings → Pages → Source: GitHub Actions)
