import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/productsService';
import ProductCard from '../components/ProductCard';
import Sidebar from '../components/Sidebar';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchProducts()
      .then(data => { if (mounted) setProducts(data); })
      .catch(err => { if (mounted) setError(err.message || 'Error fetching products'); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  if (loading) return <div className="p-4 text-white">Cargando productos…</div>;
  if (error) return <div className="p-4 text-danger">Error: {error}</div>;

  return (
    <div className="container py-4">
      <div className="row">
        <aside className="col-12 col-md-3 mb-4">
          <Sidebar />
        </aside>

        <section className="col-12 col-md-9">
          {products.length === 0 ? (
            <div>No hay productos.</div>
          ) : (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              {products.map((p, idx) => (
                <div className="col" key={p.id ?? idx}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}