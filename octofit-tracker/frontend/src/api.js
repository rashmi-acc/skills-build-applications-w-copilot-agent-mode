const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const isValidCodespaceName = /^[a-z0-9-]+$/i.test(codespaceName ?? '');

export const API_BASE_URL = isValidCodespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

function findCollection(payload) {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== 'object') return null;

  for (const key of ['results', 'items', 'data', 'records']) {
    const value = payload[key];
    if (Array.isArray(value)) return value;

    const nested = findCollection(value);
    if (nested !== null) return nested;
  }

  return null;
}

export function normalizeCollection(payload) {
  return findCollection(payload) ?? [];
}

export async function fetchCollection(endpoint, fetcher, signal) {
  const response = await fetcher(`${API_BASE_URL}${endpoint}`, { signal });
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return normalizeCollection(await response.json());
}