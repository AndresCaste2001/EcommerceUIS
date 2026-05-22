import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/productsService';
import ProductCard from '../components/ProductCard';
import Sidebar from '../components/Sidebar';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState(''); // 'price-asc', 'price-desc', 'rating'
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchProducts()
      .then(data => { if (mounted) setProducts(data); })
      .catch(err => { if (mounted) setError(err.message || 'Error fetching products'); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  // Apply filters whenever products, category, sortBy, or search changes
  useEffect(() => {
    let result = [...products];

    // Filter by search term
    if (searchTerm) {
      result = result.filter(p => 
        p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      result = result.filter(p => p.categoria === selectedCategory);
    }

    // Sort
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.precio - b.precio);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.precio - a.precio);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.calificacion - a.calificacion);
    }

    setFilteredProducts(result);
  }, [products, selectedCategory, sortBy, searchTerm]);

  const handleClearFilters = () => {
    setSelectedCategory('');
    setSortBy('');
    setSearchTerm('');
  };

  if (loading) return <div className="p-4 text-white">Cargando productos…</div>;
  if (error) return <div className="p-4 text-danger">Error: {error}</div>;

  return (
    <div className="container py-4">
      <div className="row">
        <aside className="col-12 col-md-3 mb-4">
          <Sidebar 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onClearFilters={handleClearFilters}
          />
        </aside>

        <section className="col-12 col-md-9">
          {filteredProducts.length === 0 ? (
            <div>No hay productos con esos filtros.</div>
          ) : (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              {filteredProducts.map((p, idx) => (
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