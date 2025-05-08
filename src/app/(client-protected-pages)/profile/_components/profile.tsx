'use client'

import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { Separator } from '~/components/ui/separator'
import { Button } from '~/components/ui/button'
import Image from 'next/image'
import AvatarFallbackIcon from '~/../public/image/avatar.jpg'
import { SquarePen } from 'lucide-react'
import { useRouter } from 'next/navigation'
import UpdatePasswordForm from '~/app/auth/update-password/_components/update-password-form'
import UpdateEmailForm from './update-email-form'
import { useClientUserSession } from '~/utils/hooks/useUserSession'
import { useEffect } from 'react'
import { AuthorBlogList } from './author-blog-list'

export default function Profile() {
  const session = useClientUserSession()
  const router = useRouter()

  useEffect(() => {
    console.log(session)
  }, [session])

  return (
    <div className="container mx-auto mt-[4.5rem] space-y-6 px-4 md:my-8">
      <Card className="relative">
        <CardHeader className="flex-col items-center gap-4 text-center">
          <Avatar className="h-20 w-20">
            <AvatarImage src={session?.user_metadata?.avatar_url as string} />
            <AvatarFallback>
              <Image
                src={AvatarFallbackIcon}
                width={100}
                height={100}
                alt="Profile Picture"
              />
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{session?.user_metadata?.name ?? 'User'}</CardTitle>
            <CardDescription>
              {session?.email?.toLocaleLowerCase() ?? 'No email provided'}
            </CardDescription>
          </div>
        </CardHeader>
        <Button
          variant={'outline'}
          size={'icon'}
          onClick={() => router.push('/profile/update')}
          className="absolute right-4 top-4 rounded-lg p-6"
        >
          <SquarePen className="h-4 w-4" />
        </Button>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>
            Manage your account security settings.
          </CardDescription>
          <Separator />
        </CardHeader>
        <CardContent>
          <UpdatePasswordForm />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Change Email</CardTitle>
          <CardDescription>Manage your credential account.</CardDescription>
          <Separator />
        </CardHeader>
        <CardContent>
          <UpdateEmailForm />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Your Blog List</CardTitle>
          <CardDescription>
            All blogs you've created will appear here.
          </CardDescription>
          <Separator />
        </CardHeader>
        <CardContent>
          {session?.id ? (
            <AuthorBlogList authorId={session.id} />
          ) : (
            <div className="text-center text-muted-foreground">
              Unable to load blog list. Please re-login.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
