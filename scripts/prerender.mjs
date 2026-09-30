// Injeta o HTML renderizado pelo React em dist/index.html.
// O site aparece antes do JavaScript carregar e o Google lê todo o conteúdo.
import { readFile, writeFile, rm } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import path from "node:path";

const { render } = await import(pathToFileURL(path.resolve("dist-ssr/entry-server.js")).href);
const file = "dist/index.html";
const html = await readFile(file, "utf8");
if (!html.includes('<div id="root"></div>')) throw new Error("root vazio não encontrado em dist/index.html");
await writeFile(file, html.replace('<div id="root"></div>', `<div id="root">${render()}</div>`));
await rm("dist-ssr", { recursive: true, force: true });
console.log("prerender ok");
