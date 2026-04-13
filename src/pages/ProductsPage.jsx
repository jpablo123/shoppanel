import { useState, useEffect, useCallback } from 'react'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'
import { getProducts, searchProducts } from '../services/productService'

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchProducts = useCallback(async (searchQuery) => {
    setLoading(true)
    setError('')
    try {
      const data = searchQuery
        ? await searchProducts(searchQuery)
        : await getProducts(30)
      setProducts(data.products)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  // Carga inicial
  useEffect(() => {
    fetchProducts('')
  }, [fetchProducts])

  // Debounce del buscador
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts(query)
    }, 350)
    return () => clearTimeout(timer)
  }, [query, fetchProducts])

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Productos</h2>
            <p className="text-slate-500 text-sm mt-0.5">
              {products.length} productos disponibles
            </p>
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar productos..."
            className="border border-slate-300 rounded-lg px-3 py-2 text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          />
        </div>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl overflow-hidden animate-pulse">
                <div className="h-44 bg-slate-200" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-slate-200 rounded w-3/4" />
                  <div className="h-3 bg-slate-200 rounded w-full" />
                  <div className="h-3 bg-slate-200 rounded w-5/6" />
                  <div className="h-8 bg-slate-200 rounded mt-4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && !loading && (
          <p className="text-center text-red-600 py-12">{error}</p>
        )}

        {!loading && !error && products.length === 0 && (
          <p className="text-center text-slate-500 py-12">
            No se encontraron productos para &ldquo;{query}&rdquo;
          </p>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
