import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { getProductById } from '../services/productService'
import { useOrders } from '../context/OrdersContext'

export default function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeImage, setActiveImage] = useState(0)

  const { orders, addOrder } = useOrders()
  const isOrdered = product ? orders.some((o) => o.id === product.id) : false

  useEffect(() => {
    setLoading(true)
    setError('')
    getProductById(id)
      .then((data) => {
        setProduct(data)
        setActiveImage(0)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <main className="max-w-5xl mx-auto px-4 py-10">
          <div className="grid md:grid-cols-2 gap-10 animate-pulse">
            <div className="h-80 bg-slate-200 rounded-xl" />
            <div className="space-y-4">
              <div className="h-6 bg-slate-200 rounded w-2/3" />
              <div className="h-4 bg-slate-200 rounded w-full" />
              <div className="h-4 bg-slate-200 rounded w-5/6" />
              <div className="h-10 bg-slate-200 rounded w-1/3 mt-6" />
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <main className="max-w-5xl mx-auto px-4 py-10 text-center text-red-600">
          {error}
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-8">
        <Link
          to="/products"
          className="text-sm text-slate-500 hover:text-indigo-600 transition-colors mb-6 inline-block"
        >
          &larr; Volver a productos
        </Link>

        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm grid md:grid-cols-2 gap-10">
          {/* Galeria */}
          <div>
            <img
              src={product.images?.[activeImage] ?? product.thumbnail}
              alt={product.title}
              className="w-full h-72 object-cover rounded-xl mb-3"
            />
            {product.images?.length > 1 && (
              <div className="flex gap-2 flex-wrap">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-colors ${
                      activeImage === i ? 'border-indigo-500' : 'border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <span className="text-xs font-medium text-indigo-600 uppercase tracking-wider mb-2">
              {product.category}
            </span>
            <h1 className="text-2xl font-semibold text-slate-900 mb-3">{product.title}</h1>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">{product.description}</p>

            <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-slate-400 text-xs mb-0.5">Marca</p>
                <p className="font-medium text-slate-700">{product.brand || '-'}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-slate-400 text-xs mb-0.5">Stock</p>
                <p className="font-medium text-slate-700">{product.stock} unidades</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-slate-400 text-xs mb-0.5">Rating</p>
                <p className="font-medium text-slate-700">{product.rating} / 5</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-slate-400 text-xs mb-0.5">Descuento</p>
                <p className="font-medium text-slate-700">{product.discountPercentage}%</p>
              </div>
            </div>

            <div className="mt-auto flex items-center justify-between">
              <span className="text-3xl font-semibold text-indigo-600">${product.price}</span>

              <button
                onClick={() => addOrder(product)}
                disabled={isOrdered}
                className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-colors ${
                  isOrdered
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                {isOrdered ? 'Ya en pedidos' : 'Agregar pedido'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
