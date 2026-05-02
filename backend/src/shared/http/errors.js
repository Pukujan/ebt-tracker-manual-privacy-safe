export function errorHandler(error, _req, res, _next) {
  const status = Number.isInteger(error?.status) ? error.status : 500;
  const message = error?.message || "Internal Server Error";

  if (status >= 500) {
    console.error("Unhandled error:", error);
  }

  res.status(status).json({ error: message });
}
