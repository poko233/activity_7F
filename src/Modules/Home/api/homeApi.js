import { API_BASE_URL } from '../../../config/backendUrls'

export const getHomeMessage = async () => {
  const response = await fetch(
    `${API_BASE_URL}/home`
  )

  if (!response.ok) {
    throw new Error('Error obteniendo datos')
  }

  return response.json()
}
