import { createContext, useContext, useState } from 'react'

const OrdersContext = createContext(null)

const STATUS = {
  PENDING: 'pendiente',
  RESERVED: 'reservado',
  CANCELLED: 'cancelado',
  RESCHEDULED: 'reagendado',
}

export { STATUS }

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([])

  const addOrder = (product) => {
    const alreadyExists = orders.some((o) => o.id === product.id)
    if (alreadyExists) return

    setOrders((prev) => [
      ...prev,
      {
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        status: STATUS.PENDING,
      },
    ])
  }

  const changeStatus = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    )
  }

  const removeOrder = (id) => {
    setOrders((prev) => prev.filter((o) => o.id !== id))
  }

  return (
    <OrdersContext.Provider value={{ orders, addOrder, changeStatus, removeOrder }}>
      {children}
    </OrdersContext.Provider>
  )
}

export const useOrders = () => useContext(OrdersContext)
