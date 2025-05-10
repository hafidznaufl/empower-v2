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
      title: 'Victim Protection',
      description:
        'Empower ensures confidentiality and data security through an encrypted system.',
      icon: <ShieldCheck className="text-green-600" size={20} />,
    },
    {
      title: 'Easy & Fast Reporting',
      description:
        'Report incidents of violence quickly through a user-friendly interface.',
      icon: <MessageCircleHeart className="text-blue-600" size={20} />,
    },
    {
      title: '24/7 Support',
      description:
        'Our support team is available around the clock to provide psychological and legal assistance.',
      icon: <Clock className="text-purple-600" size={20} />,
    },
    {
      title: 'Guaranteed Privacy',
      description:
        'Reporter identity is fully protected. Empower is committed to safeguarding your privacy rights.',
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
