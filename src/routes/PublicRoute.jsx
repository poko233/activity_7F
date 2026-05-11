import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'

export default function PublicRoute() {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <h1>Cargando...</h1>
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}