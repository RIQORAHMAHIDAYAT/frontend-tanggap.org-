/**
 * Base API Client untuk Frontend Tanggap.org
 * Menangani Base URL, header otomatis (Authorization token), dan penanganan respons.
 */

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>
  timeout?: number
}

export class ApiError extends Error {
  status: number
  data: unknown

  constructor(message: string, status: number, data?: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

/**
 * Cek apakah mode mock sedang diaktifkan lewat .env
 * @returns boolean
 */
export const isMockMode = (): boolean => {
  return import.meta.env.VITE_USE_MOCK === 'true'
}

/**
 * Ambil base URL API yang aktif
 * @returns string
 */
export const getBaseUrl = (): string => {
  let url = import.meta.env.VITE_API_BASE_URL || '/api'
  // Jika masih menunjuk ke port 8001 lama atau bernilai /api, selalu gunakan proxy relatif /api
  if (url.includes(':8001') || url === '/api') {
    return '/api'
  }
  return url.replace(/\/$/, '')
}

export async function apiClient<T = unknown>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { params, headers, timeout = 10000, ...customConfig } = options

  // Bersihkan endpoint dari slash ganda di awal
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint
  let url = `${getBaseUrl()}/${cleanEndpoint}`

  // Query parameters jika ada
  if (params) {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value))
      }
    })
    const queryString = searchParams.toString()
    if (queryString) {
      url += (url.includes('?') ? '&' : '?') + queryString
    }
  }

  // Ambil token JWT jika user sudah login
  const token = localStorage.getItem('tanggap_token')

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...headers,
  }

  // AbortController untuk timeout pencegahan hanging
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      ...customConfig,
      headers: defaultHeaders,
      signal: controller.signal,
    })

    // Parse respons JSON atau teks
    let data: unknown
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      data = await response.json()
    } else {
      data = await response.text()
    }

    if (!response.ok) {
      const errorMsg =
        data && typeof data === 'object' && 'message' in data && typeof (data as { message?: string }).message === 'string'
          ? (data as { message: string }).message
          : `Request gagal dengan status ${response.status}`
      throw new ApiError(errorMsg, response.status, data)
    }

    return data as T
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    const isAbort = error instanceof Error && error.name === 'AbortError'
    throw new ApiError(
      isAbort ? 'Koneksi ke server timeout (melebihi 10 detik)' : (error instanceof Error ? error.message : 'Koneksi ke backend gagal'),
      0,
      error
    )
  } finally {
    clearTimeout(timeoutId)
  }
}

export const api = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    apiClient<T>(endpoint, { method: 'GET', ...options }),

  post: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    apiClient<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    }),

  put: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    apiClient<T>(endpoint, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    }),

  patch: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    apiClient<T>(endpoint, {
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    }),

  delete: <T>(endpoint: string, options?: RequestOptions) =>
    apiClient<T>(endpoint, { method: 'DELETE', ...options }),
}
