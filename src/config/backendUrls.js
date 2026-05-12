const trimTrailingSlash = (value) =>
  value.replace(/\/+$/, '')

const getDefaultApiOrigin = () => {
  if (typeof window === 'undefined') {
    return ''
  }

  const { protocol, hostname } = window.location
  return `${protocol}//${hostname}:3000`
}

const rawApiUrl =
  import.meta.env.VITE_API_URL ||
  getDefaultApiOrigin()

const normalizedApiUrl = trimTrailingSlash(rawApiUrl)

const apiBasePath = normalizedApiUrl.endsWith('/api')
  ? normalizedApiUrl
  : `${normalizedApiUrl}/api`

const defaultWsUrl = `${normalizedApiUrl.replace(
  /^http/,
  'ws'
)}/ws/chat`

const rawWsUrl =
  import.meta.env.VITE_WS_URL || defaultWsUrl

export const API_BASE_URL = apiBasePath
export const WS_URL = trimTrailingSlash(rawWsUrl)
