/* eslint-disable */
'use client'

import React from 'react'
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LabelList,
} from 'recharts'

const statusLabels: Record<string, string> = {
  PENDING: 'Menunggu',
  IN_PROCESS: 'Diproses',
  PROVEN_LIGHTLY_SANCTIONED: 'Terbukti - Sanksi Ringan',
  PROVEN_MODERATElYY_SANCTIONED: 'Terbukti - Sanksi Sedang',
  PROVEN_SEVERELY_SANCTIONED: 'Terbukti - Sanksi Berat',
  SOLVED: 'Selesai',
  NOT_PROVEN: 'Tidak Terbukti',
  NOT_SANCTIONED: 'Tidak Disanksi',
}

type OverviewProps = {
  data: { name: string; total: number }[]
}

type CustomTooltipProps = {
  active?: boolean
  payload?: { value: number; name: string }[]
  label?: string
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload?.length && label) {
    return (
      <div className="rounded-md border border-gray-300 bg-white p-3 text-sm text-black shadow-md">
        <p className="mb-1 font-semibold">{statusLabels[label] ?? label}</p>
        <p>
          Jumlah:{' '}
          <span className="font-medium">
            {payload[0]?.value?.toLocaleString('id-ID') ?? 0}
          </span>
        </p>
      </div>
    )
  }
  return null
}

export default function Overview({ data }: OverviewProps) {
  const formattedData = data.map((item) => ({
    ...item,
    label: statusLabels[item.name] ?? item.name,
  }))

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        data={formattedData}
        margin={{ top: 0, right: 16, bottom: 0, left: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis
          dataKey="label"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          allowDecimals={false}
          tickFormatter={(value) => value.toLocaleString('id-ID')}
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ fill: 'rgba(0,0,0,0.04)' }}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        >
          <LabelList
            dataKey="total"
            position="top"
            fontSize={12}
            fill="#333"
            formatter={(value: number) => value.toLocaleString('id-ID')}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
