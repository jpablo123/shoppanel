const BASE_URL = 'https://dummyjson.com'

export async function getProducts(limit = 20, skip = 0) {
  const res = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`)
  if (!res.ok) throw new Error('Error al obtener productos')
  return res.json()
}

export async function getProductById(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`)
  if (!res.ok) throw new Error('Producto no encontrado')
  return res.json()
}

export async function searchProducts(query) {
  const res = await fetch(`${BASE_URL}/products/search?q=${encodeURIComponent(query)}`)
  if (!res.ok) throw new Error('Error en la busqueda')
  return res.json()
}
