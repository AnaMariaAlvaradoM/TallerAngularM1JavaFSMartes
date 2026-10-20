// Adaptador Angular (Vitest + node:test): corre las pruebas de cada parte del taller y calcula la nota (0.0 a 5.0).
// La lista de partes sale de .github/calificacion.json
// Uso local:   npm run calificar          → todo lo publicado
//              npm run calificar -- 1     → solo la Fase 1
//              npm run calificar -- 1.5   → solo la parte 1.5
// En GitHub Actions además genera resultado.json y el resumen del run.

const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const RAIZ = path.join(__dirname, "..");
const CONFIG = JSON.parse(fs.readFileSync(path.join(RAIZ, ".github", "calificacion.json"), "utf8"));
function buscarAngularCli() {
  try {
    return require.resolve("@angular/cli/bin/ng.js", { paths: [RAIZ] });
  } catch {
    return "";
  }
}
const NG = buscarAngularCli();
const TEMPORAL = path.join(RAIZ, ".calificacion-tmp");
const TIEMPO_MAXIMO_MS = 180000;
const MAX_FALLOS_EN_CONSOLA = 2;
const EN_GITHUB = process.env.GITHUB_ACTIONS === "true";

function sinColores(texto) {
  return texto.replace(/\x1b\[[0-9;]*m/g, "");
}

function contarTests(rutaTest) {
  const patron = new RegExp(CONFIG.patronTest, "gm");
  return (fs.readFileSync(path.join(RAIZ, rutaTest), "utf8").match(patron) || []).length;
}

function rutaLegible(importacion) {
  const limpia = importacion.replace(/^(\.\.\/)+/, "");
  return limpia.startsWith("app/") ? `src/${limpia}.ts` : importacion;
}

function traducirError(mensaje) {
  let m;
  if ((m = mensaje.match(/Cannot find module '([^']+)'/)) || (m = mensaje.match(/Could not resolve "([^"]+)"/))) {
    return `No encuentro el archivo ${rutaLegible(m[1])}: ¿lo creaste con ese nombre exacto y en esa carpeta?`;
  }
  if ((m = mensaje.match(/Module '"([^"]+)"' has no exported member '([^']+)'/))) {
    return `El archivo ${rutaLegible(m[1])} existe, pero no exporta "${m[2]}": revisa el nombre exacto y que tenga export.`;
  }
  if ((m = mensaje.match(/No matching export in "([^"]+)" for import "([^"]+)"/))) {
    return `El archivo ${m[1]} existe, pero no exporta "${m[2]}": revisa el nombre exacto de la clase (sin el sufijo Component).`;
  }
  if ((m = mensaje.match(/NG8001: '([^']+)' is not a known element/))) {
    return `Angular no conoce <${m[1]}>: agrega su clase al imports del componente que lo usa.`;
  }
  if ((m = mensaje.match(/NG8002: Can't bind to '([^']+)'/))) {
    return `Le pasas [${m[1]}] a un componente que no tiene ese input (o que no está en imports).`;
  }
  if ((m = mensaje.match(/NG8008: Required input '([^']+)' from component (\w+)/))) {
    return `Usas <${m[2]}> sin pasarle su input obligatorio "${m[1]}".`;
  }
  if ((m = mensaje.match(/TS2339: Property '([^']+)' does not exist on type 'InputSignal/))) {
    return `Lees un input sin paréntesis: escribe, por ejemplo, mascota().${m[1]} en lugar de mascota.${m[1]}.`;
  }
  if ((m = mensaje.match(/TS2339: Property '([^']+)' does not exist on type '([^']+)'/))) {
    return `"${m[1]}" no existe en ${m[2]}: revisa el nombre exacto.`;
  }
  if ((m = mensaje.match(/TS2741: Property '([^']+)' is missing/))) {
    return `Falta el campo "${m[1]}" (en tu interfaz o en uno de tus objetos de prueba).`;
  }
  if ((m = mensaje.match(/TS2353: .*'([^']+)' does not exist in type '([^']+)'/))) {
    return `El campo "${m[1]}" no existe en ${m[2]}: revisa el nombre exacto de los campos de tu interfaz.`;
  }
  if (/TS2578: Unused '@ts-expect-error'/.test(mensaje)) {
    return "especie acepta valores que no debería: decláralo como 'perro' | 'gato', no como string.";
  }
  if (/NG5002: @for loop must have a "track"/.test(mensaje)) {
    return 'A tu @for le falta track (por ejemplo: track mascota.id).';
  }
  if ((m = mensaje.match(/NG8004: No pipe found with name '([^']+)'/))) {
    return `Usas el pipe "${m[1]}" sin agregarlo al imports del componente.`;
  }
  if ((m = mensaje.match(/NG0303: Can't set value of the '([^']+)' input/))) {
    return `El componente no tiene un input llamado "${m[1]}": revisa el nombre exacto.`;
  }
  return mensaje.length > 220 ? mensaje.slice(0, 220) + "…" : mensaje;
}

function desescapar(texto) {
  return texto
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'").replace(/&#39;/g, "'").replace(/&amp;/g, "&");
}

function mensajeDeFallo(atributo) {
  const mensaje = desescapar(atributo);
  const propio = mensaje.match(/^(.*?): expected /s);
  const base = propio ? propio[1] : mensaje.split("\n")[0];
  return traducirError(base.trim());
}

function erroresDeCompilacion(salida) {
  const lineas = sinColores(salida).split(/\r?\n/);
  const errores = [];
  lineas.forEach((linea, i) => {
    const m = linea.match(/\[ERROR\]\s*(.+?)(\s*\[plugin [^\]]+\])?$/);
    if (!m) return;
    const donde = lineas.slice(i + 1, i + 5).map((l) => l.match(/(src\/app\/[\w./-]+:\d+)/)).find(Boolean);
    const texto = traducirError(m[1].trim()) + (donde ? ` (en ${donde[1]})` : "");
    if (!errores.includes(texto)) errores.push(texto);
  });
  return errores;
}

function correrAngular(ejercicio, total) {
  fs.mkdirSync(TEMPORAL, { recursive: true });
  const reporte = path.join(TEMPORAL, `junit-${ejercicio.id}.xml`);
  fs.rmSync(reporte, { force: true });
  const incluir = path.relative(path.join(RAIZ, "src"), path.join(RAIZ, ejercicio.test)).split(path.sep).join("/");
  const proceso = spawnSync(
    process.execPath,
    [NG, "test", "--watch=false", `--include=${incluir}`, "--reporters=junit", `--output-file=${reporte}`],
    { cwd: RAIZ, encoding: "utf8", timeout: TIEMPO_MAXIMO_MS, env: { ...process.env, NG_CLI_ANALYTICS: "false", FORCE_COLOR: "0" } },
  );

  if (proceso.error && proceso.error.code === "ETIMEDOUT") {
    return { pasados: 0, fallidos: [], aviso: "Tiempo agotado: revisa si tienes un ciclo infinito." };
  }
  if (!fs.existsSync(reporte)) {
    const errores = erroresDeCompilacion((proceso.stdout || "") + "\n" + (proceso.stderr || ""));
    const aviso = errores.length
      ? `No compiló: ${errores[0]}`
      : "No se pudieron correr las pruebas: ejecuta ng build para ver el error.";
    return { pasados: 0, fallidos: [], aviso };
  }

  const xml = fs.readFileSync(reporte, "utf8");
  const fallidos = [];
  let pasados = 0;
  for (const caso of xml.matchAll(/<testcase\b[^>]*\bname="([^"]*)"[^>]*?(?:\/>|>([\s\S]*?)<\/testcase>)/g)) {
    const nombre = desescapar(caso[1]).split(" > ").pop();
    const cuerpo = caso[2] || "";
    const fallo = cuerpo.match(/<(?:failure|error)\b[^>]*\bmessage="([^"]*)"/);
    if (fallo) fallidos.push({ nombre, mensaje: mensajeDeFallo(fallo[1]) });
    else if (!/<skipped/.test(cuerpo)) pasados++;
  }
  return { pasados: Math.min(pasados, total), fallidos, aviso: "" };
}

function primeraLineaDeError(lineas, desde) {
  for (let i = desde + 1; i < lineas.length && !/^(ok|not ok) \d+/.test(lineas[i]); i++) {
    const enLinea = lineas[i].match(/^\s+error: (['"])(.*)\1$/);
    if (enLinea) return enLinea[2];
    if (/^\s+error: \|-?$/.test(lineas[i])) return (lineas[i + 1] || "").trim();
  }
  return "";
}

function correrNode(ejercicio, total) {
  const proceso = spawnSync(process.execPath, ["--test-reporter=tap", path.join(RAIZ, ejercicio.test)], {
    cwd: RAIZ,
    encoding: "utf8",
    timeout: 30000,
  });
  const lineas = (proceso.stdout || "").split(/\r?\n/);
  const fallidos = [];
  let pasados = 0;
  lineas.forEach((linea, i) => {
    if (/^ok \d+ - /.test(linea)) pasados++;
    const fallo = linea.match(/^not ok \d+ - (.*)$/);
    if (fallo) fallidos.push({ nombre: fallo[1], mensaje: primeraLineaDeError(lineas, i) });
  });
  const aviso = proceso.error && proceso.error.code === "ETIMEDOUT" ? "Tiempo agotado." : "";
  return { pasados: Math.min(pasados, total), fallidos, aviso };
}

function correrEjercicio(ejercicio) {
  const total = contarTests(ejercicio.test);
  if (!EN_GITHUB) process.stdout.write(`   ⏳ ${ejercicio.id} ${ejercicio.titulo}…\r`);
  const r = ejercicio.test.endsWith(".mjs") ? correrNode(ejercicio, total) : correrAngular(ejercicio, total);
  if (!EN_GITHUB) process.stdout.write(" ".repeat(60) + "\r");
  return { id: ejercicio.id, titulo: ejercicio.titulo, total, ...r };
}

function calcularNota(resultados) {
  const pasados = resultados.reduce((suma, r) => suma + r.pasados, 0);
  const total = resultados.reduce((suma, r) => suma + r.total, 0);
  const nota = total === 0 ? 0 : Math.round((pasados / total) * 50) / 10;
  return { pasados, total, nota };
}

function icono(r) {
  if (r.pasados === r.total) return "✅";
  return r.pasados > 0 ? "🟡" : "❌";
}

function imprimirEnConsola(resultados, resumen) {
  console.log(`\n${CONFIG.curso} · Resultados\n`);
  for (const r of resultados) {
    console.log(`${icono(r)} ${r.id} ${r.titulo.padEnd(24)} ${r.pasados}/${r.total} pruebas`);
    if (r.aviso) console.log(`     ⚠️  ${r.aviso}`);
    for (const f of r.fallidos.slice(0, MAX_FALLOS_EN_CONSOLA)) {
      console.log(`     ✗ ${f.nombre}`);
      if (f.mensaje) console.log(`       → ${f.mensaje}`);
    }
    const ocultos = r.fallidos.length - MAX_FALLOS_EN_CONSOLA;
    if (ocultos > 0) console.log(`     … y ${ocultos} prueba(s) más por corregir`);
  }
  console.log(`\n📊 Pruebas aprobadas: ${resumen.pasados}/${resumen.total}`);
  console.log(`🎯 Nota: ${resumen.nota.toFixed(1)} / 5.0\n`);
}

function escribirResumenGithub(resultados, resumen) {
  const filas = resultados.map((r) => `| ${icono(r)} | ${r.id} · ${r.titulo} | ${r.pasados}/${r.total} |`);
  const detalles = resultados
    .filter((r) => r.fallidos.length || r.aviso)
    .map((r) => {
      const items = r.fallidos.map((f) => `- ✗ ${f.nombre}${f.mensaje ? ` → ${f.mensaje}` : ""}`);
      if (r.aviso) items.unshift(`- ⚠️ ${r.aviso}`);
      return `**${r.id} · ${r.titulo}**\n${items.join("\n")}`;
    });
  const markdown = [
    `## 🎯 Nota: ${resumen.nota.toFixed(1)} / 5.0`,
    `Pruebas aprobadas: **${resumen.pasados}/${resumen.total}**`,
    "",
    "| Estado | Parte | Pruebas |",
    "|---|---|---|",
    ...filas,
    "",
    detalles.length ? "### Qué falta por corregir\n\n" + detalles.join("\n\n") : "### ¡Todo perfecto! 🎉",
  ].join("\n");
  if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, markdown + "\n");
  const paraArtefacto = resultados.map(({ id, pasados, total }) => ({ id, pasados, total }));
  fs.writeFileSync(path.join(RAIZ, "resultado.json"), JSON.stringify({ ejercicios: paraArtefacto }));
}

if (!NG) {
  console.log("❌ No encuentro Angular en node_modules: ejecuta primero npm install");
  process.exit(1);
}

const filtro = process.argv[2];
const ejercicios = CONFIG.ejercicios.filter((e) => !filtro || e.id === filtro || e.id.startsWith(`${filtro}.`));
if (ejercicios.length === 0) {
  console.log(`No encontré "${filtro}". Las partes disponibles son: ${CONFIG.ejercicios.map((e) => e.id).join(", ")}`);
  process.exit(1);
}

console.log(`\nCalificando ${ejercicios.length} parte(s). Cada una compila tu proyecto: puede tardar un poco.`);
const resultados = ejercicios.map(correrEjercicio);
const resumen = calcularNota(resultados);
imprimirEnConsola(resultados, resumen);
if (EN_GITHUB) escribirResumenGithub(resultados, resumen);
fs.rmSync(TEMPORAL, { recursive: true, force: true });
process.exitCode = resumen.pasados === resumen.total ? 0 : 1;
