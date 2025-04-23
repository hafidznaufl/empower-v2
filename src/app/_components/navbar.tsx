'use client'

import { usePathname, useRouter } from 'next/navigation'
import { DarkModeToggle } from './dark-toggle'
import { Button } from './ui/button'
import { useEffect, useRef, useState } from 'react'
import {
  Cross1Icon,
  DashboardIcon,
  HamburgerMenuIcon,
} from '@radix-ui/react-icons'
import { AnimatePresence, motion } from 'motion/react'
import { Separator } from './ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import AvatarFallbackIcon from '~/../public/image/avatar.jpg'
import Image from 'next/image'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { LayoutDashboard, LogIn, UserPen, UserRound } from 'lucide-react'
import SignOut from './logout-button'
import { useClientSession } from '~/utils/hooks/useSession'
import Link from 'next/link'
import { navbarMenu } from '~/utils/constant/menu'

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenu, setMobileMenu] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const menuRef = useRef(null)

  const session = useClientSession()

  useEffect(() => {
    if (session?.user.user_metadata.role === 'ADMIN') {
      setIsAdmin(true)
    }
  }, [session])

  return (
    <div className="bg-clip fixed top-0 z-[99] w-full overflow-hidden border-b bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="animate-blob absolute -top-10 left-1/4 h-10 w-48 rounded-full bg-primary opacity-30 blur-2xl" />
        <div className="animate-blob animation-delay-2000 absolute right-1/4 top-0 h-10 w-36 rounded-full bg-primary opacity-30 blur-2xl" />
        <div className="animate-blob animation-delay-4000 absolute bottom-0 left-1/2 h-20 w-40 rounded-full bg-primary opacity-30 blur-2xl" />
      </div>
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <div
          className="flex cursor-pointer flex-col justify-center"
          onClick={() => router.push('/')}
        >
          <p className="bg-gradient-to-tr from-primary bg-clip-text text-base font-extrabold tracking-wide text-transparent">
            Empower
          </p>
          <p className="text-xs text-muted-foreground">
            Powered by Satgas PPKS STTNF
          </p>
        </div>
        <div className="absolute left-1/2 hidden w-[21rem] -translate-x-1/2 transform items-center justify-between gap-1 rounded-full border border-border/80 bg-foreground/5 p-1 font-medium md:flex">
          {navbarMenu.map((item) => (
            <Link href={item.path} key={item.path}>
              <div
                key={item.path}
                className={`relative flex h-8 items-center rounded-full px-4 text-sm transition-colors duration-200 ${
                  pathname === item.path
                    ? 'border border-foreground/15 bg-foreground/5 font-semibold'
                    : 'border border-transparent'
                } hover:bg-foreground/10`}
              >
                {item.name}
              </div>
            </Link>
          ))}
        </div>
        <div className="hidden items-center space-x-2 md:flex">
          {session ? (
            <>
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={''} />
                    <AvatarFallback>
                      <Image
                        src={AvatarFallbackIcon}
                        width={40}
                        height={40}
                        alt="Profile Picture"
                      />
                    </AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="mt-4 w-40" align="end">
                  <div className="flex flex-col gap-4">
                    <Button
                      variant={'secondary'}
                      size={'sm'}
                      className="gap-4"
                      onClick={() => router.push('/profile')}
                    >
                      <UserRound className="h-4 w-4" />
                      Profile
                    </Button>
                    {isAdmin ? (
                      <Button
                        variant={'secondary'}
                        size={'sm'}
                        className="gap-2"
                        onClick={() => router.push('/dashboard')}
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                      </Button>
                    ) : null}
                    <DarkModeToggle
                      variants={'secondary'}
                      size="icon"
                      className="w-full"
                    />
                    <Separator />
                    <SignOut />
                  </div>
                </PopoverContent>
              </Popover>
            </>
          ) : (
            <>
              <Button
                variant={'default'}
                size={'sm'}
                onClick={() => router.push('/auth/login')}
              >
                Login
              </Button>
              <Button
                variant={'ghost'}
                size={'sm'}
                onClick={() => router.push('/auth/register')}
              >
                Register
              </Button>
              <DarkModeToggle size="icon" className="rounded-full" />
            </>
          )}
        </div>
        <div className="md:hidden">
          <Button
            size={'sm'}
            variant={'outline'}
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <Cross1Icon /> : <HamburgerMenuIcon />}
          </Button>
        </div>
      </div>

      {/* Mobile Navbar */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ ease: 'backOut' }}
            className="border-b-1 container flex flex-col gap-4 p-4 md:hidden"
          >
            {/* {MenuItem.map((item) => (
              <Button
                key={item.name}
                variant={'ghost'}
                onClick={() => {
                  setMobileMenu(false)
                  router.push(item.path)
                }}
                className="text-foreground"
              >
                {item.name}
              </Button>
            ))} */}
            <Separator />
            {session ? (
              <>
                <Button
                  variant={'secondary'}
                  size={'sm'}
                  className="gap-2"
                  onClick={() => router.push('/profile')}
                >
                  <UserRound className="h-4 w-4" />
                  Profile
                </Button>
                {isAdmin ? (
                  <Button
                    variant={'secondary'}
                    size={'sm'}
                    className="gap-2"
                    onClick={() => router.push('/dashboard')}
                  >
                    <DashboardIcon className="h-4 w-4" />
                    Dashboard
                  </Button>
                ) : null}
                <DarkModeToggle size="icon" className="w-full" />
                <Separator />
                <SignOut />
              </>
            ) : (
              <>
                <DarkModeToggle />
                <Separator />
                <Button
                  variant={'default'}
                  size={'sm'}
                  onClick={() => router.push('/auth/login')}
                  className="gap-2"
                >
                  <LogIn className="h-4 w-4" />
                  Login
                </Button>
                <Button
                  variant={'secondary'}
                  size={'sm'}
                  onClick={() => router.push('/auth/register')}
                  className="gap-2"
                >
                  <UserPen className="h-4 w-4" />
                  Register
                </Button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
