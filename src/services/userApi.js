import axios from 'axios'
import api from '../api.js'

export async function listUsers(params = {}, signal) {
  const filtered = Object.fromEntries(Object.entries(params).filter(([, value]) => value !== '' && value !== undefined && value !== null))
  const { data } = await api.get('/users', { params: filtered, signal })
  return data
}
export async function createUser(body) { const { data } = await api.post('/users', body); return data }
export async function updateUser(id, body) { const { data } = await api.patch(`/users/${encodeURIComponent(id)}`, body); return data }
export async function setUserStatus(id, isActive) { const { data } = await api.patch(`/users/${encodeURIComponent(id)}/status`, { isActive }); return data }
export async function resetUserPassword(id) { const { data } = await api.post(`/users/${encodeURIComponent(id)}/reset-password`); return data }

export function userErrorKind(error) {
  if (axios.isCancel(error) || error?.code === 'ERR_CANCELED') return 'aborted'
  const status = error?.response?.status
  if (!error?.response) return 'network'
  if (status === 400) return 'validation'
  if (status === 403) return 'forbidden'
  if (status === 404) return 'notfound'
  if (status === 409) return 'conflict'
  if (status === 429) return 'rate_limited'
  if (status >= 500) return 'server'
  return 'server'
}
