// components/sidebar/Sidebar.jsx

import SidebarProfile from './SidebarProfile'
import SidebarLogout from './SidebarLogout'

export default function Sidebar() {
  return (
    <aside className="w-80 bg-zinc-900 border-r border-zinc-800 flex flex-col h-screen">
      {/* HEADER */}
      <div className="px-6 py-5 border-b border-zinc-800">
        <h1 className="text-2xl font-bold text-zinc-100">
          Chat de la  Empresa 
        </h1>

        <p className="text-sm text-zinc-500 mt-1">
          Panel principal
        </p>
      </div>

      {/* PROFILE */}
      <SidebarProfile />

      {/* LOGOUT */}
      <SidebarLogout />
    </aside>
  )
}