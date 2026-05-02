import { readdirSync, readFileSync, existsSync } from "fs";
import { join } from "path";

const root = new URL("../", import.meta.url).pathname;
const modulesDir = join(root, "src/modules");

if (!existsSync(modulesDir)) {
  console.log("No modules directory found. Skipping.");
  process.exit(0);
}

const moduleNames = readdirSync(modulesDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

const forbidden = [];

for (const moduleName of moduleNames) {
  const moduleRoot = join(modulesDir, moduleName);
  const files = walk(moduleRoot).filter((f) => f.endsWith(".js") || f.endsWith(".mjs"));

  for (const file of files) {
    const source = readFileSync(file, "utf8");

    for (const other of moduleNames) {
      if (other === moduleName) continue;
      const needle = `/modules/${other}/`;
      if (source.includes(needle)) {
        forbidden.push({ file, moduleName, other, needle });
      }
    }
  }
}

if (forbidden.length) {
  console.error("Module boundary violations found:\n");
  for (const hit of forbidden) {
    console.error(`- ${hit.file} imports cross-module path (${hit.needle})`);
  }
  process.exit(1);
}

console.log("Module boundaries OK.");

function walk(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else files.push(full);
  }
  return files;
}
