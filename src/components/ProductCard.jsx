import { Link } from 'react-router-dom'
import { useOrders } from '../context/OrdersContext'

export default function ProductCard({ product }) {
  const { orders, addOrder } = useOrders()
  const isOrdered = orders.some((o) => o.id === product.id)

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
      <Link to={`/products/${product.id}`}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-44 object-cover hover:opacity-90 transition-opacity"
        />
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <Link
          to={`/products/${product.id}`}
          className="font-medium text-slate-800 hover:text-indigo-600 transition-colors line-clamp-1 mb-1"
        >
          {product.title}
        </Link>

        <p className="text-slate-500 text-sm line-clamp-2 flex-1 mb-3">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-indigo-600 font-semibold text-base">
            ${product.price}
          </span>

          <button
            onClick={() => addOrder(product)}
            disabled={isOrdered}
            className={`text-sm px-3 py-1.5 rounded-lg font-medium transition-colors ${
              isOrdered
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            {isOrdered ? 'Agregado' : 'Agregar pedido'}
          </button>
        </div>
      </div>
    </div>
  )
}
