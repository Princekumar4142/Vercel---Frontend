import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://vercel-backend-production-327a.up.railway.app/api'
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('trackmap_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api
