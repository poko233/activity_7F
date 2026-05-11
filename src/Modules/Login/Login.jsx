import { GoogleLogin } from '@react-oauth/google'

import { useNavigate } from 'react-router-dom'

import { useAuth } from '../../context/AuthContext'

export default function Login() {
  const navigate = useNavigate()

  const { login } = useAuth()

  const handleSuccess = async (
    credentialResponse
  ) => {
    try {
      const response = await fetch(
        'http://localhost:3000/api/auth/google',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify({
            credential:
              credentialResponse.credential,
          }),
        }
      )

      const data = await response.json()

      login(data)

      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() =>
          console.log('Login Failed')
        }
      />
    </div>
  )
}