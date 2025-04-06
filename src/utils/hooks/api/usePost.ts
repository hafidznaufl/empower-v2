/* eslint-disable */
'use client'

import { useState, useCallback } from 'react'
import axios, { AxiosRequestConfig, AxiosError } from 'axios'
import { useAuthStore } from '~/utils/store/useAuthStore'

interface PostOptions extends AxiosRequestConfig {
  body?: any
  headers?: Record<string, string>
}

export function usePost<T>() {
  const { token } = useAuthStore()
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const postData = useCallback(
    async (url: string, options?: PostOptions): Promise<T | null> => {
      setLoading(true)
      setError(null)

      try {
        const response = await axios({
          url,
          method: 'POST',
          data: options?.body,
          headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options?.headers,
          },
        })

        setData(response.data)
        return response.data
      } catch (err) {
        const axiosError = err as AxiosError<{ message?: string }>
        setError(axiosError.response?.data?.message || 'Failed to send data')
        return null
      } finally {
        setLoading(false)
      }
    },
    [token],
  )

  return { data, loading, error, postData }
}
