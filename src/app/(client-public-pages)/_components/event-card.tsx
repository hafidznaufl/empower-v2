'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'

type EventResponse = {
  id: string
  title: string
  description: string
  date: string
  location: string
  capacity: number
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export default function EventCard() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      EventCard
    </div>
  )
}
