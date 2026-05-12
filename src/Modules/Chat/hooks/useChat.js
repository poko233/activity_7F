import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { connectChatSocket } from '../api/chatSocket'

const normalizeText = (value) =>
  typeof value === 'string' ? value.trim() : ''

const resolveInitialAlias = (user) =>
  normalizeText(user?.username) ||
  normalizeText(user?.name) ||
  'Usuario'

export const useChat = () => {
  const { user, updateUser } = useAuth()
  const socketRef = useRef(null)
  const updateUserRef = useRef(updateUser)

  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const [aliasInput, setAliasInput] = useState(
    resolveInitialAlias(user)
  )

  const [toasts, setToasts] = useState([])

  useEffect(() => {
    updateUserRef.current = updateUser
  }, [updateUser])

  const pushToast = (text) => {
    const id = Date.now()

    setToasts((prev) => [...prev, { id, text }])

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }

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
          return
        }

        if (data.type === 'message') {
          setMessages((prev) => [...prev, data.message])
          return
        }

        if (data.type === 'alias:updated') {
          const updatedUserId = Number(data.userId)
          const updatedUsername = normalizeText(data.username)

          if (!Number.isFinite(updatedUserId) || !updatedUsername) {
            return
          }

          setMessages((prev) =>
            prev.map((item) =>
              // Refresca alias en mensajes ya cargados sin alterar el contenido original.
              Number(item.userId) === updatedUserId
                ? { ...item, username: updatedUsername }
                : item
            )
          )

          if (Number(user?.id) === updatedUserId) {
            setAliasInput(updatedUsername)
            updateUserRef.current({ username: updatedUsername })
          }

          return
        }

        if (data.type === 'system') {
          pushToast(data.message.text)
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

  const updateAlias = () => {
    const username = aliasInput.trim()
    const socket = socketRef.current

    if (
      !username ||
      !socket ||
      socket.readyState !== WebSocket.OPEN ||
      username === normalizeText(user?.username)
    ) {
      return
    }

    socket.send(
      JSON.stringify({
        type: 'alias:update',
        username,
      })
    )
  }

  return {
    messages,
    message,
    setMessage,
    isConnected,
    sendMessage,
    toasts,
    aliasInput,
    setAliasInput,
    updateAlias,
  }
}
