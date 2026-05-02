#!/usr/bin/env node
import { mkdirSync, existsSync, writeFileSync } from "fs";
import { join } from "path";

const [name, ...rest] = process.argv.slice(2);
if (!name) {
  console.error("Usage: node scripts/new-module.mjs <module-name> [--label \"Module Label\"]");
  process.exit(1);
}

if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) {
  console.error("Module name must be kebab-case (example: intake-triage)");
  process.exit(1);
}

const labelFlagIndex = rest.indexOf("--label");
const label = labelFlagIndex >= 0 && rest[labelFlagIndex + 1]
  ? rest[labelFlagIndex + 1]
  : toTitleCase(name);

const root = new URL("../", import.meta.url).pathname;
const backendDir = join(root, "backend/src/modules", name);
const frontendDir = join(root, "frontend/src/modules", name);

if (existsSync(backendDir) || existsSync(frontendDir)) {
  console.error(`Module already exists: ${name}`);
  process.exit(1);
}

mkdirSync(backendDir, { recursive: true });
mkdirSync(frontendDir, { recursive: true });

writeFileSync(
  join(backendDir, "index.js"),
  backendTemplate(name),
  "utf8"
);

writeFileSync(
  join(frontendDir, "index.jsx"),
  frontendTemplate(name, label),
  "utf8"
);

console.log(`Created module: ${name}`);
console.log(`- backend/src/modules/${name}/index.js`);
console.log(`- frontend/src/modules/${name}/index.jsx`);

function toTitleCase(value) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function backendTemplate(moduleName) {
  return `import { Router } from "express";

export function register(app, context) {
  const router = Router();

  router.get("/health", (_req, res) => {
    res.json({
      module: "${moduleName}",
      status: "ok",
      timestamp: new Date().toISOString()
    });
  });

  app.use("/api/${moduleName}", router);

  // Optional module event example:
  context.eventBus.emit("module:registered", { module: "${moduleName}" });
}
`;
}

function frontendTemplate(moduleName, moduleLabel) {
  return `import React from "react";

function ${safeComponentName(moduleName)}Page() {
  return (
    <section className="card">
      <h2>${moduleLabel}</h2>
      <p className="muted">Module is active. Start building from here.</p>
      <p>Backend health: <code>/api/${moduleName}/health</code></p>
    </section>
  );
}

export default {
  route: "/${moduleName}",
  label: "${moduleLabel}",
  Component: ${safeComponentName(moduleName)}Page
};
`;
}

function safeComponentName(moduleName) {
  return moduleName
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}
