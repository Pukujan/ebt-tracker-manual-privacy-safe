const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

export async function apiGet(path) {
  const response = await fetch(`${BASE_URL}${path}`);
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Request failed: ${response.status}`);
  }
  return response.json();
}
