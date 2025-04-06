'use client'

import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { useEffect, useState } from 'react'

type PortData = {
  id: string
  countryId: string
  countryName: string
  name: string
}

const formatName = (name: string) => {
  return name
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const useFormattedPorts = (data: PortData[] | null) => {
  const [origin, setOrigin] = useState<
    Record<string, { id: string; ports: { id: string; name: string }[] }>
  >({})
  const [destination, setDestination] = useState<
    Record<string, { id: string; ports: { id: string; name: string }[] }>
  >({})

  useEffect(() => {
    if (!data) return

    const transformData = (data: PortData[]) => {
      return data.reduce(
        (
          acc: Record<
            string,
            { id: string; ports: { id: string; name: string }[] }
          >,
          { id, countryId, countryName, name },
        ) => {
          const formattedCountry = formatName(countryName)
          const formattedPort = formatName(name)

          if (!acc[formattedCountry]) {
            acc[formattedCountry] = { id: countryId, ports: [] }
          }
          acc[formattedCountry].ports.push({ id, name: formattedPort })
          return acc
        },
        {},
      )
    }

    const formattedData = transformData(data)
    setOrigin(formattedData)
    setDestination(formattedData)
  }, [data])

  return { origin, destination }
}

const formatReadableDate = (dateStr?: string): string => {
  if (!dateStr) return 'N/A'
  return format(new Date(dateStr), 'EEEE, dd MMMM yyyy', { locale: id })
}

const formatToYYYYMMDD = (date?: Date | string | null): string =>
  date ? format(new Date(date), 'yyyy-MM-dd') : ''

function formatTitleCase(input: string): string {
  return input
    .split(' ')
    .map((word) =>
      word === word.toUpperCase()
        ? word
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    )
    .join(' ')
}

export {
  useFormattedPorts,
  formatReadableDate,
  formatToYYYYMMDD,
  formatTitleCase,
  formatName,
}
