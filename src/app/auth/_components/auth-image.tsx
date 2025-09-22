'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import LoginBackground from '~/public/image/authbackground.jpg'

export default function AuthImage() {
  const [showImage, setShowImage] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setShowImage(true)
    }
  }, [])

  if (!showImage) return null

  return (
    <Image
      src={LoginBackground}
      alt="Login background"
      width={1920}
      height={1080}
      priority
      placeholder="blur"
      onLoad={() => setIsLoaded(true)}
      className={`h-screen object-cover transition-all duration-700 ease-in-out ${isLoaded ? 'blur-0' : 'blur-md'}`}
    />
  )
}
