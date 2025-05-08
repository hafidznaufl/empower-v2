'use client'

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { ShieldCheck, MessageCircleHeart, Clock, EyeOff } from 'lucide-react'

export default function OurAdvantages() {
  const benefits = [
    {
      title: 'Perlindungan Korban',
      description:
        'Empower memastikan kerahasiaan dan keamanan data pelapor melalui sistem terenkripsi.',
      icon: <ShieldCheck className="text-green-600" size={20} />,
    },
    {
      title: 'Pelaporan Mudah & Cepat',
      description:
        'Laporkan kejadian kekerasan secara cepat melalui antarmuka yang ramah pengguna.',
      icon: <MessageCircleHeart className="text-blue-600" size={20} />,
    },
    {
      title: 'Pendampingan 24/7',
      description:
        'Tim pendamping tersedia sepanjang waktu untuk memberikan dukungan psikologis dan hukum.',
      icon: <Clock className="text-purple-600" size={20} />,
    },
    {
      title: 'Privasi Terjamin',
      description:
        'Identitas pelapor dijaga sepenuhnya. Empower berkomitmen melindungi hak privasi Anda.',
      icon: <EyeOff className="text-pink-600" size={20} />,
    },
  ]

  return (
    <div className="bg-transparent md:bg-accent">
      <div className="container mx-auto px-4 py-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="cursor-default border-none bg-card shadow-none transition-transform duration-300 ease-in-out hover:-translate-x-1 hover:-translate-y-1"
            >
              <CardHeader>
                <div className="flex items-center gap-2">
                  {benefit.icon}
                  <CardTitle className="space-y-0">{benefit.title}</CardTitle>
                </div>
                <CardDescription>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
