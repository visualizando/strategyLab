import { readFileSync, writeFileSync } from 'node:fs';
import { extname, resolve } from 'node:path';

const output = new URL('../dist/', import.meta.url);
const index = readFileSync(new URL('index.html', output), 'utf8');
const script = index.match(/<script type="module" crossorigin src="([^"]+)"><\/script>/);
const stylesheet = index.match(/<link rel="stylesheet" crossorigin href="([^"]+)">/);

if (!script || !stylesheet) {
  throw new Error('El build debe generar una entrada JavaScript y una hoja de estilos.');
}

const fromDist = (path) => new URL(path.replace(/^\//, ''), output);
const js = readFileSync(fromDist(script[1]), 'utf8');
const css = readFileSync(fromDist(stylesheet[1]), 'utf8').replace(
  /url\((\/assets\/[^)]+)\)/g,
  (_, path) => {
    const extension = extname(path).slice(1);
    const bytes = readFileSync(fromDist(path)).toString('base64');
    return `url(data:font/${extension};base64,${bytes})`;
  },
);
const html = index
  .replace(script[0], () => `<script type="module">${js.replace(/<\/script/gi, '<\\/script')}</script>`)
  .replace(stylesheet[0], () => `<style>${css}</style>`);

writeFileSync(new URL('rio-editorial.html', output), html);
console.log(`Demo autónoma: ${resolve('dist/rio-editorial.html')}`);
