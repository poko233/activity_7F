import { useEffect, useRef } from 'react'
import { useChat } from './hooks/useChat'

const formatTime = (value) => {
  if (!value) {
    return ''
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return ''
  }

  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function Chat() {
  const {
    messages,
    message,
    setMessage,
    isConnected,
    sendMessage,
    toasts,
  } = useChat()

  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }, [messages])

  const handleSubmit = (event) => {
    event.preventDefault()
    sendMessage()
  }

  return (
    <div className="h-screen bg-zinc-950 text-zinc-100 p-4 md:p-8">

      <div className="fixed top-4 right-4 space-y-2 z-50">
        {toasts?.map((t) => (
          <div
            key={t.id}
            className="bg-zinc-800 text-white px-4 py-2 rounded-lg shadow-lg"
          >
            {t.text}
          </div>
        ))}
      </div>

      <div className="w-full h-full bg-zinc-900 rounded-2xl border border-zinc-800 h-[85vh] flex flex-col">
        <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Chat grupal</h1>
          <span
            className={`text-sm ${isConnected ? 'text-emerald-400' : 'text-red-400'}`}
          >
            {isConnected ? 'Conectado' : 'Desconectado'}
          </span>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {messages.map((item, index) => (
            <div
              key={`${item.id ?? 'msg'}-${index}`}
              className={`rounded-lg px-3 py-2 ${item.system ? 'bg-zinc-800 text-zinc-300' : 'bg-zinc-950 border border-zinc-800'}`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-cyan-400">
                  {item.username || 'Usuario'}
                </span>
                <span className="text-xs text-zinc-500">
                  {formatTime(item.createdAt)}
                </span>
              </div>
              <p className="text-sm mt-1 break-words">
                {item.text}
              </p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-4 border-t border-zinc-800 flex gap-3"
        >
          <input
            type="text"
            className="flex-1 bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 outline-none focus:border-cyan-500"
            placeholder="Escribe un mensaje..."
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          <button
            type="submit"
            className="bg-cyan-600 hover:bg-cyan-500 px-4 py-2 rounded-lg font-medium disabled:opacity-50"
            disabled={!isConnected}
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  )
}