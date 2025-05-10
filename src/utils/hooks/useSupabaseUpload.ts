'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { createClient } from '../supabase/client'
import { v4 as uuidv4 } from 'uuid'

const supabase = createClient()

export function useSupabaseUpload() {
  const [uploading, setUploading] = useState(false)

  const uploadFile = async (file: File, bucket: string, folder: string) => {
    setUploading(true)

    try {
      const fileExt = file.name.split('.').pop() || 'bin'
      const fileName = `${uuidv4()}.${fileExt}`
      const filePath = `${folder}/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (uploadError) {
        console.log('Upload error:', uploadError)
        toast.error('File upload failed.', {
          description: uploadError.message,
        })
        return null
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from(bucket).getPublicUrl(filePath)

      if (!publicUrl) return null

      const relativePath = publicUrl.replace(
        'https://ppljqjgqakumvwpujdxg.supabase.co/storage/v1/object/public/',
        '/',
      )

      return relativePath
    } catch (error: any) {
      toast.error('Unexpected error while uploading file.', {
        description: error.message || 'Please try again later.',
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
