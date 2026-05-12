import { WS_URL } from '../../../config/backendUrls'

export const connectChatSocket = ({ token }) => {
  const socketUrl = token
    ? `${WS_URL}?token=${encodeURIComponent(token)}`
    : WS_URL

  return new WebSocket(socketUrl)
}
