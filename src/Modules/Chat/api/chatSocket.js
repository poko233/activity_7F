const WS_URL = 'ws://localhost:3000/ws/chat'

export const connectChatSocket = ({ token }) => {
  const socketUrl = token
    ? `${WS_URL}?token=${encodeURIComponent(token)}`
    : WS_URL

  return new WebSocket(socketUrl)
}
