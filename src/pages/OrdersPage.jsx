import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useOrders, STATUS } from '../context/OrdersContext'

const STATUS_LABELS = {
  [STATUS.PENDING]: { label: 'Pendiente', color: 'bg-yellow-100 text-yellow-700' },
  [STATUS.RESERVED]: { label: 'Reservado', color: 'bg-blue-100 text-blue-700' },
  [STATUS.CANCELLED]: { label: 'Cancelado', color: 'bg-red-100 text-red-700' },
  [STATUS.RESCHEDULED]: { label: 'Reagendado', color: 'bg-purple-100 text-purple-700' },
}

export default function OrdersPage() {
  const { orders, changeStatus, removeOrder } = useOrders()

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 py-16 text-center">
          <p className="text-slate-400 text-lg mb-4">No tienes pedidos aun</p>
          <Link
            to="/products"
            className="text-sm text-indigo-600 hover:underline"
          >
            Ir a explorar productos
          </Link>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Mis pedidos</h2>
            <p className="text-slate-500 text-sm mt-0.5">{orders.length} pedido(s)</p>
          </div>
          <Link
            to="/products"
            className="text-sm text-indigo-600 hover:underline"
          >
            + Agregar mas productos
          </Link>
        </div>

        <div className="space-y-3">
          {orders.map((order) => {
            const statusInfo = STATUS_LABELS[order.status]

            return (
              <div
                key={order.id}
                className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <img
                  src={order.thumbnail}
                  alt={order.title}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-800 truncate">{order.title}</p>
                  <p className="text-indigo-600 font-semibold text-sm mt-0.5">${order.price}</p>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusInfo.color}`}
                  >
                    {statusInfo.label}
                  </span>

                  <select
                    value={order.status}
                    onChange={(e) => changeStatus(order.id, e.target.value)}
                    className="text-sm border border-slate-200 rounded-lg px-2 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {Object.entries(STATUS).map(([key, val]) => (
                      <option key={key} value={val}>
                        {STATUS_LABELS[val].label}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => removeOrder(order.id)}
                    className="text-sm text-slate-400 hover:text-red-500 transition-colors px-2 py-1.5"
                    title="Eliminar pedido"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
