/* eslint-disable */

import 'dotenv/config'
import cron from 'node-cron'
import { createClient } from '@supabase/supabase-js'
import { format } from 'date-fns'
import { env } from '~/env'

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY,
)

const getTimestamp = () => format(new Date(), "EEE, dd MMM yyyy HH:mm:ss 'GMT'")

cron.schedule('0 4 * * 1,4', async () => {
  try {
    const { data, error } = await supabase.rpc('ping')
    console.log({ data, error })

    if (error) {
      console.error(`Error pinging Supabase (RPC) at 04:00:`, error)
    } else {
      console.log(`Supabase ping (RPC) successful at 04:00 - ${getTimestamp()}`)
    }
  } catch (err) {
    console.error(`Failed to ping Supabase (RPC) at 04:00:`, err)
  }
})

console.log('Scheduled Supabase ping every Monday and Thursday at 04:00')
