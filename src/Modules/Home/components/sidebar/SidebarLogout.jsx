// components/sidebar/SidebarLogout.jsx

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../../context/AuthContext";

export default function SidebarLogout() {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  return (
    <div className="p-4 border-t border-zinc-800">
      <button
        onClick={handleLogout}
        className="
          w-full
          bg-zinc-950
          hover:bg-red-500/10
          border
          border-zinc-800
          hover:border-red-500/30
          transition
          px-4
          py-3
          rounded-2xl
          font-medium
          flex
          items-center
          justify-center
          gap-2
          text-zinc-300
          hover:text-red-400
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>

        <span>Cerrar sesión</span>
      </button>
    </div>
  );
}
