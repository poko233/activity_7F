import { useEffect, useState } from 'react'
import{ getHomeMessage} from '../api/homeApi'

export const useHome = () => {
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getHomeMessage()
        console.log(response)
        setMessage(response.content)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  return {
    message,
  }
}