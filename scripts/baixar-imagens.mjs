/* Baixa as imagens do site atual (purilub.com.br) para /public/img/wp, converte para WebP
   (máx. 900 px, qualidade 80) e troca as referências em lib/data.js e components/*.jsx.
   Uso: npm run imagens   (idempotente: pode rodar de novo) */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ORIGEM = "https://www.purilub.com.br/wordpress/wp-content/uploads/";
const DEST = "public/img/wp/";
const LARGOS = { "bg_solucoes": 1920 }; // fundo de seção em tela cheia: 900 px ficaria borrado
const arquivos = ["lib/data.js", ...(await fs.readdir("components")).map(f => "components/" + f)];
const re = /\b([RT]) \+ "([^"]+)"/g;
let ok = 0, falhas = [];

for (const arq of arquivos) {
  let txt = await fs.readFile(arq, "utf8"), novo = txt;
  for (const m of txt.matchAll(re)) {
    const [inteiro, base, rel] = m;
    if (rel === "elementor/thumbs/") continue;
    const relFull = (base === "T" ? "elementor/thumbs/" : "") + rel;
    const relWebp = rel.replace(/\.(jpe?g|png|webp)$/i, ".webp");
    const saida = DEST + (base === "T" ? "elementor/thumbs/" : "") + relWebp;
    try {
      let existe = true; try { await fs.access(saida); } catch { existe = false; }
      if (!existe) {
        const r = await fetch(ORIGEM + relFull);
        if (!r.ok) throw new Error("HTTP " + r.status);
        const buf = Buffer.from(await r.arrayBuffer());
        const max = Object.entries(LARGOS).find(([k]) => rel.includes(k))?.[1] ?? 900;
        await fs.mkdir(path.dirname(saida), { recursive: true });
        await sharp(buf).resize({ width: max, height: max, fit: "inside", withoutEnlargement: true }).webp({ quality: 80 }).toFile(saida);
      }
      novo = novo.replace(inteiro, `${base} + "${relWebp}"`);
      ok++;
    } catch (e) { falhas.push(`${relFull} (${e.message})`); }
  }
  novo = novo.replace(`export const R = "${ORIGEM}";`, `export const R = "/img/wp/";`);
  if (novo !== txt) await fs.writeFile(arq, novo);
}
console.log(`${ok} referências convertidas.`);
if (falhas.length) console.log("FALHAS (mantidas como estavam):\n- " + falhas.join("\n- "));
