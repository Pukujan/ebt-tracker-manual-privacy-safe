import { Router } from "express";

export function register(app, context) {
  const router = Router();

  router.get("/health", (_req, res) => {
    res.json({
      module: "ebt-tracker",
      status: "ok",
      timestamp: new Date().toISOString()
    });
  });

  app.use("/api/ebt-tracker", router);
  context.eventBus.emit("module:registered", { module: "ebt-tracker" });
}
