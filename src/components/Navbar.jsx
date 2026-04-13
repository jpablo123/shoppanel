import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useOrders } from '../context/OrdersContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { orders } = useOrders()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <nav className="bg-slate-900 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/products" className="font-semibold text-lg tracking-tight">
          ShopPanel
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/products"
            className="text-slate-300 hover:text-white text-sm transition-colors"
          >
            Productos
          </Link>
          <Link
            to="/orders"
            className="text-slate-300 hover:text-white text-sm transition-colors flex items-center gap-1"
          >
            Mis pedidos
            {orders.length > 0 && (
              <span className="bg-indigo-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                {orders.length}
              </span>
            )}
          </Link>

          <div className="flex items-center gap-3 pl-4 border-l border-slate-700">
            <span className="text-sm text-slate-300">
              {user?.firstName} {user?.lastName}
            </span>
            <button
              onClick={handleLogout}
              className="text-sm bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded transition-colors"
            >
              Salir
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
