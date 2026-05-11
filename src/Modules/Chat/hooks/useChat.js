import { useEffect, useRef, useState } from 'react'

import { useAuth } from '../../../context/AuthContext'
import { connectChatSocket } from '../api/chatSocket'

export const useChat = () => {
  const { user } = useAuth()
  const socketRef = useRef(null)

  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const socket = connectChatSocket({ token })

    socketRef.current = socket

    socket.onopen = () => {
      setIsConnected(true)
    }

    socket.onclose = () => {
      setIsConnected(false)
    }

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)

        if (data.type === 'history') {
          setMessages(data.messages ?? [])
        }

        if (
          data.type === 'message' ||
          data.type === 'system'
        ) {
          setMessages((prev) => [
            ...prev,
            data.message,
          ])
        }
      } catch (error) {
        console.error(error)
      }
    }

    return () => {
      socket.close()
    }
  }, [user?.id])

  const sendMessage = () => {
    const text = message.trim()
    const socket = socketRef.current

    if (!text || !socket || socket.readyState !== WebSocket.OPEN) {
      return
    }

    socket.send(
      JSON.stringify({
        type: 'message',
        text,
      })
    )

    setMessage('')
  }

  return {
    messages,
    message,
    setMessage,
    isConnected,
    sendMessage,
    currentUser: user,
  }
}
