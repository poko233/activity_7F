import { useHome } from './hooks/useHome'

export default function Home() {
  const { message } = useHome()

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="bg-zinc-900 p-10 rounded-2xl">
        <h1 className="text-4xl text-cyan-400 font-bold">
          {message}
        </h1>
      </div>
    </div>
  )
}