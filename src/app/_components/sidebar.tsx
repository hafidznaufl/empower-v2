'use client'

import { useState } from 'react'
import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'
import Link from 'next/link'
import { DarkModeToggle } from '~/components/dark-toggle'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip'
import Image from 'next/image'
import AvatarFallbackIcon from '~/public/image/avatar.jpg'
import { useRouter } from 'next/navigation'
import { EllipsisVertical, House, Ticket, User } from 'lucide-react'
import SignOut from './logout-button'
import { useClientUserSession } from '~/utils/hooks/useUserSession'

import {
  DashboardIcon,
  DoubleArrowRightIcon,
  FileTextIcon,
} from '@radix-ui/react-icons'

type NavigationMenu = {
  path: string
  name: string
  icon: JSX.Element
}

const menus: NavigationMenu[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    path: '/dashboard/voucher',
    name: 'Voucher',
    icon: <Ticket />,
  },
  {
    path: '/dashboard/user',
    name: 'User',
    icon: <User />,
  },
]

export default function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(false)
  const [avatarMenuVisible, setAvatarMenuVisible] = useState(false)

  const router = useRouter()
  const session = useClientUserSession()

  return (
    <div className="z-10 h-screen md:relative md:h-full">
      <div
        className={`fixed flex h-full flex-col items-start border-r backdrop-blur-sm transition-all duration-300 ease-in-out md:relative ${showSidebar ? 'w-60' : 'w-20'}`}
      >
        <div className="flex h-screen w-full flex-col justify-between gap-4 p-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center">
              <Button
                className="w-full"
                onClick={() => setShowSidebar(!showSidebar)}
              >
                <span
                  className={`transition-transform duration-500 ease-in-out ${
                    showSidebar ? 'rotate-180' : 'rotate-0'
                  }`}
                >
                  <DoubleArrowRightIcon />
                </span>
              </Button>
            </div>
            <ul className="flex w-full flex-col gap-4">
              <Separator />
              {menus.map((item) => (
                <li key={item.name}>
                  <Link href={item.path}>
                    <TooltipProvider>
                      <Tooltip delayDuration={200}>
                        <TooltipTrigger asChild>
                          <Button
                            variant={'secondary'}
                            className="w-full justify-start gap-x-4"
                          >
                            {item.icon}
                            <p
                              className={`transition duration-150 ${
                                showSidebar
                                  ? 'w-auto opacity-100'
                                  : 'w-0 opacity-0'
                              }`}
                            >
                              {item.name}
                            </p>
                          </Button>
                        </TooltipTrigger>
                        {!showSidebar && (
                          <TooltipContent side="right">
                            {item.name}
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  </Link>
                </li>
              ))}
            </ul>

            <Separator />
          </div>
          <div
            onMouseEnter={() => setAvatarMenuVisible(true)}
            onMouseLeave={() => setAvatarMenuVisible(false)}
          >
            <div
              className={`mb-4 flex flex-col gap-4 overflow-hidden transition-all duration-500 ease-in-out ${
                avatarMenuVisible ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <Separator />
              <TooltipProvider>
                <Tooltip delayDuration={200}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={'outline'}
                      onClick={() => router.push('/')}
                    >
                      <House />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="ml-2">
                    Home
                  </TooltipContent>
                </Tooltip>
                <Tooltip delayDuration={200}>
                  <TooltipTrigger asChild>
                    <DarkModeToggle />
                  </TooltipTrigger>
                  <TooltipContent side="right" className="ml-2">
                    Toggle Theme
                  </TooltipContent>
                </Tooltip>
                <Tooltip delayDuration={200}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={'outline'}
                      onClick={() => router.push('/profile')}
                    >
                      <User />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="ml-2">
                    Profile
                  </TooltipContent>
                </Tooltip>
                <Tooltip delayDuration={200}>
                  <TooltipTrigger asChild>
                    <SignOut text={false} variant={'outline'} />
                  </TooltipTrigger>
                  <TooltipContent side="right" className="ml-2">
                    Sign Out
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <Separator />
            <div
              className={`mt-4 flex h-10 w-full cursor-pointer flex-row items-center justify-start rounded-sm transition-all ${showSidebar ? 'gap-2' : 'gap-0'} `}
            >
              <Avatar className="flex h-12 w-12 flex-shrink-0 items-center justify-center">
                <AvatarImage src={``} className="h-10 w-10 rounded-full" />
                <AvatarFallback>
                  <Image
                    src={AvatarFallbackIcon}
                    width={50}
                    height={50}
                    alt="Profile Picture"
                    className="h-10 w-10 rounded-full"
                  />
                </AvatarFallback>
              </Avatar>

              <div
                className={`overflow-hidden text-nowrap transition-all duration-300 ease-in-out ${
                  showSidebar ? 'max-w-full opacity-100' : 'max-w-0 opacity-0'
                }`}
              >
                <p className="text-sm">{`Admin ${session?.user_metadata?.name} `}</p>
                <p className="animate-marquee flex-row text-xs text-muted-foreground [--duration:40s] [--gap:1rem] [gap:var(--gap)]">
                  {session?.email?.toLocaleLowerCase()}
                </p>
              </div>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  showSidebar ? 'max-w-full opacity-100' : 'max-w-0 opacity-0'
                }`}
              >
                <EllipsisVertical className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
