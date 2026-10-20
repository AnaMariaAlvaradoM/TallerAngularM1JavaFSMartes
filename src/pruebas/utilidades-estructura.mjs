// Ayudas para las pruebas de estructura. No es un archivo de pruebas.
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, relative } from 'node:path';

export const APP = fileURLToPath(new URL('../app', import.meta.url));

function sinComentarios(codigo) {
  return codigo
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^:])\/\/.*$/gm, '$1');
}

export function leer(rutaDentroDeApp) {
  const ruta = join(APP, rutaDentroDeApp);
  if (!existsSync(ruta)) return '';
  return sinComentarios(readFileSync(ruta, 'utf8'));
}

function recorrer(carpeta) {
  if (!existsSync(carpeta)) return [];
  return readdirSync(carpeta).flatMap((nombre) => {
    const ruta = join(carpeta, nombre);
    return statSync(ruta).isDirectory() ? recorrer(ruta) : [ruta];
  });
}

export function archivosCon(extension, patron) {
  return recorrer(APP)
    .filter((ruta) => ruta.endsWith(extension))
    .filter((ruta) => patron.test(sinComentarios(readFileSync(ruta, 'utf8'))))
    .map((ruta) => 'src/app/' + relative(APP, ruta).split('\\').join('/'));
}
