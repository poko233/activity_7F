import Chat from '../Chat/Chat'
import { useChat } from '../Chat/hooks/useChat'

import Sidebar from './components/sidebar/Sidebar'

export default function Home() {
  const chat = useChat()

  return (
    <div className="bg-zinc-950 min-h-screen text-zinc-100 flex">
      <Sidebar
        aliasInput={chat.aliasInput}
        setAliasInput={chat.setAliasInput}
        updateAlias={chat.updateAlias}
      />

      <main className="flex-1">
        <Chat chat={chat} />
      </main>
    </div>
  )
}
