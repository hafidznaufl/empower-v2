import { LinkedInLogoIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

export default function FooterContent() {
  const currentYear = new Date().getFullYear()

  return (
    <div className="relative mt-8 flex w-full items-center justify-between overflow-hidden border-t text-sm text-muted-foreground">
      <div className="container z-10 mx-auto flex w-full items-center justify-between px-4 py-3">
        <div>
          © {currentYear} Empower Powered by{' '}
          <span className="animate-marquee font-semibold">
            Satgas PPKPT STTNF
          </span>
          . All Rights Reserved.
        </div>
        <div className="flex gap-4">
          <span>
            Developed by{' '}
            <Link
              href="https://www.linkedin.com/in/hafidznaufl/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white"
            >
              <LinkedInLogoIcon className="mr-1 inline h-4 w-4" />
              @hafidznaufl
            </Link>
          </span>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="animate-blob absolute -top-10 left-1/4 h-10 w-48 rounded-full bg-primary opacity-20 blur-2xl" />
        <div className="animate-blob animation-delay-2000 absolute right-1/4 top-0 h-10 w-36 rounded-full bg-primary opacity-20 blur-2xl" />
        <div className="animate-blob animation-delay-4000 left-1/6 absolute bottom-0 h-20 w-40 rounded-full bg-primary opacity-10 blur-2xl" />
      </div>
    </div>
  )
}
