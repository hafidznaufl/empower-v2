/* eslint-disable */
'use client'

import { useState, useEffect, useCallback } from 'react'
import axios, { AxiosRequestConfig } from 'axios'
import { useAuthStore } from '../../store/useAuthStore'

interface FetchOptions extends AxiosRequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: any
  headers?: Record<string, string>
}

export function useGet<T>(url: string, options?: FetchOptions) {
  const { token, fetchToken } = useAuthStore()
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      let authToken = token

      if (!authToken) {
        authToken = await fetchToken()
      }

      if (!authToken) {
        throw new Error('Token tidak tersedia')
      }

      const response = await axios({
        url,
        method: options?.method || 'GET',
        data: options?.body,
        headers: {
          ...options?.headers,
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      })

      setData(response.data)
    } catch (err) {
      setError('Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }, [url, options, token, fetchToken])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}
