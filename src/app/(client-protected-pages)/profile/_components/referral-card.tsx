/* eslint-disable */
'use client'

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Share, Copy, Check, Gift } from 'lucide-react'
import { toast } from 'sonner'

interface ReferralCardProps {
  referralCode: string
  onShare?: () => void
}

export default function ReferralCard({
  referralCode,
  onShare,
}: ReferralCardProps) {
  const [copied, setCopied] = useState(false)

  //   const referralCode = referralLink.includes('/')
  //     ? referralLink.split('/').pop()
  //     : referralLink

  const handleCopyReferralLink = async () => {
    await navigator.clipboard.writeText(referralCode)
    setCopied(true)
    toast.success('Referral link copied to clipboard!')

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  const handleShareReferralLink = async () => {
    if (onShare) {
      onShare()
    } else if (navigator.share) {
      navigator
        .share({
          title: 'Join me with my referral code!',
          text: 'Use my referral code to get a special bonus!',
          url: referralCode,
        })
        .catch((err) => {
          toast.error('Failed to share referral link.')
          console.error('Error sharing:', err)
        })
    } else {
      await handleCopyReferralLink()
    }
  }

  return (
    <Card className="overflow-hidden border-0 shadow-md">
      <CardHeader className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 pb-8 pt-6 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
          <Gift className="h-6 w-6 text-amber-900" />
        </div>
        <CardTitle className="mt-3 text-2xl font-bold text-amber-900">
          Referral Program
        </CardTitle>
        <CardDescription className="text-amber-800">
          Invite friends and earn rewards!
        </CardDescription>
      </CardHeader>

      {/* Centered referral code */}
      <div className="relative -mt-5 flex justify-center">
        <div className="rounded-xl border-4 border-white bg-background px-6 py-3 shadow-lg">
          <div className="text-center font-mono text-lg font-bold tracking-wider text-amber-900">
            {referralCode}
          </div>
        </div>
      </div>

      <CardContent className="pt-8 text-center">
        <p className="mb-4 text-sm text-muted-foreground">
          Share this code with friends and you&aposll both receive rewards when
          they sign up!
        </p>

        <div className="flex justify-center gap-3">
          <Button
            onClick={handleCopyReferralLink}
            variant="outline"
            className="border-amber-200 bg-amber-50 hover:bg-amber-100 hover:text-amber-900"
          >
            {copied ? (
              <>
                <Check className="mr-2 h-4 w-4 text-green-500" /> Copied
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" /> Copy Code
              </>
            )}
          </Button>

          <Button
            onClick={handleShareReferralLink}
            className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600"
          >
            <Share className="mr-2 h-4 w-4" /> Share
          </Button>
        </div>
      </CardContent>

      <CardFooter className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 text-center text-xs text-amber-800">
        Terms and conditions apply. Rewards are credited after your friend's
        first purchase.
      </CardFooter>
    </Card>
  )
}
