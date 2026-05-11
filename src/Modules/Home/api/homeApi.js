const API_URL = 'http://localhost:3000/api'

export const getHomeMessage = async () => {
  const response = await fetch(`${API_URL}/home`)

  if (!response.ok) {
    throw new Error('Error obteniendo datos')
  }

  return response.json()
}