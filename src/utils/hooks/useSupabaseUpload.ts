/* eslint-disable */
'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { createClient } from '../supabase/client'
import { v4 as uuidv4 } from 'uuid'
import { env } from '~/env'

const supabase = createClient()

export function useSupabaseUpload() {
  const [uploading, setUploading] = useState(false)

  const uploadFile = async (file: File, bucket: string, folder: string) => {
    setUploading(true)

    try {
      const fileExt = file.name.split('.').pop() ?? 'bin'
      const fileName = `${uuidv4()}.${fileExt}`
      const filePath = `${folder}/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (uploadError) {
        toast.error('File upload failed.', {
          description: uploadError.message,
        })
        return null
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from(bucket).getPublicUrl(filePath)

      if (
        !publicUrl ||
        !publicUrl.startsWith(env.NEXT_PUBLIC_SUPABASE_STORAGE_BASE_URL)
      ) {
        toast.error('Invalid public URL returned from Supabase.')
        return null
      }

      const baseUrl = env.NEXT_PUBLIC_SUPABASE_STORAGE_BASE_URL.replace(
        /\/+$/,
        '',
      )
      const relativePath = publicUrl.replace(baseUrl, '')

      toast.success('🎉 File uploaded!', {
        description: 'Your file has been successfully uploaded.',
        duration: 5000,
      })

      return relativePath
    } catch (error: any) {
      toast.error('Unexpected error while uploading file.', {
        description: error.message ?? 'Please try again later.',
      })
      return null
    } finally {
      setUploading(false)
    }
  }

  return {
    uploadFile,
    uploading,
  }
}
