const BASE_URL = 'https://dummyjson.com'

export async function loginUser(username, password) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, expiresInMins: 60 }),
  })

  if (!res.ok) {
    throw new Error('Credenciales incorrectas')
  }

  return res.json()
}
