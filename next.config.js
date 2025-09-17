/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import './src/env.js'
import { env } from './src/env.js'

const supabaseUrl = new URL(env.NEXT_PUBLIC_SUPABASE_URL)
const supabaseHostname = supabaseUrl.hostname

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: supabaseHostname,
        pathname: '/**',
      },
    ],
  },
}

export default config
