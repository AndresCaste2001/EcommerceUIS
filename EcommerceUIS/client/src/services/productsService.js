export async function fetchProducts() {
  const url = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/productos`;
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Fetch error ${res.status} ${res.statusText} ${text}`);
  }
  return res.json();
}