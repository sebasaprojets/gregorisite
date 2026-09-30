# Instruções do projeto

## Fluxo de trabalho pedido pelo dono do site

A cada alteração aprovada:

1. Rodar `npm run build` e conferir que passa sem erros.
2. Fazer commit e `git push` para o GitHub.
3. Responder com o link do site no ar: <https://sebasaprojets.github.io/gregorisite/>

O push dispara o workflow `.github/workflows/deploy.yml`, que publica no GitHub
Pages em 1 a 2 minutos. Sempre avisar que a atualização pode levar esse tempo e
que pode ser preciso recarregar a página.

## Notas

- Textos, links e números do site: `src/data/profile.ts`.
- O site é pré-renderizado no build; o HTML já sai preenchido.
- Antes de subir mudanças visuais, conferir no computador e no celular (390px).
