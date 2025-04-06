/* eslint-disable */
'use client'

import { create } from 'zustand'
import axios from 'axios'

const TOKEN_EXPIRATION_TIME = 30 * 60 * 60 * 1000 // 30 jam dalam milidetik

interface AuthState {
  token: string | null
  tokenTimestamp: number | null
  fetchToken: () => Promise<string | null>
  removeToken: () => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  tokenTimestamp: null,

  fetchToken: async () => {
    const { token, tokenTimestamp } = get()

    if (
      token &&
      tokenTimestamp &&
      Date.now() - tokenTimestamp < TOKEN_EXPIRATION_TIME
    ) {
      return token
    }

    try {
      const params = new URLSearchParams()
      params.append('username', process.env.NEXT_PUBLIC_VENDOR_USERNAME ?? '')
      params.append('password', process.env.NEXT_PUBLIC_VENDOR_PASSWORD ?? '')
      params.append('grant_type', 'password')

      const response = await axios.post('/vendorApi/oauth2/token', params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })

      const newToken: string = response.data.access_token
      set({ token: newToken, tokenTimestamp: Date.now() })

      return newToken
    } catch (error) {
      console.error('Failed to fetch token:', error)
      return null
    }
  },

  removeToken: () => {
    set({ token: null, tokenTimestamp: null })
  },
}))
