// components/sidebar/SidebarProfile.jsx

import { useAuth } from "../../../../context/AuthContext";

export default function SidebarProfile() {
  const { user } = useAuth();

  const handleEdit = () => {
    alert("Editar perfil próximamente");
  };

  return (
    <div className="p-6 border-b border-zinc-800">
      <div className="flex flex-col items-center text-center">
        <div className="relative">
          <img
            src={user.photo}
            alt={user.name}
            className="w-24 h-24 rounded-2xl object-cover border border-zinc-700 shadow-lg"
          />

          <div className="absolute -bottom-2 -right-2 w-5 h-5 rounded-full bg-emerald-500 border-4 border-zinc-900" />
        </div>

        <h2 className="mt-5 text-xl font-bold text-zinc-100">{user.name}</h2>

        <div className="flex items-center gap-2 mt-2">
          <p className="text-zinc-400 text-sm">@{user.username}</p>

          <button
            onClick={handleEdit}
            className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition border border-zinc-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
            </svg>
          </button>
        </div>

        <p className="text-sm text-zinc-500 mt-4 break-all">{user.email}</p>
      </div>
    </div>
  );
}
