export async function fetchProducts() {
  const url = 'https://68f5c2e66b852b1d6f14fc3a.mockapi.io/productos/articulos';
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Fetch error ${res.status} ${res.statusText} ${text}`);
  }
  return res.json();
}