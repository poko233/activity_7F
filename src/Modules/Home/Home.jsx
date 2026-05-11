import Chat from '../Chat/Chat'

import Sidebar from './components/sidebar/Sidebar'

export default function Home() {
  return (
    <div className="bg-zinc-950 min-h-screen text-zinc-100 flex">
      <Sidebar />

      <main className="flex-1">
        <Chat />
      </main>
    </div>
  )
}