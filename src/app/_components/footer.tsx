import Link from 'next/link'

export default function FooterContent() {
  const currentYear = new Date().getFullYear()

  return (
    <div className="relative mt-8 flex w-full items-center justify-between overflow-hidden border-t text-sm text-muted-foreground">
      <div className="container z-10 mx-auto flex w-full items-center justify-between px-4 py-3">
        <div>
          © {currentYear} Empower Powered by{' '}
          <span className="animate-marquee font-semibold">
            Satgas PPKS STTNF
          </span>
          . All Rights Reserved.
        </div>
        <div className="flex gap-4">
          <span>
            Developed by{' '}
            <Link
              href="https://github.com/hafidznaufl"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white"
            >
              @hafidznaufl
            </Link>
          </span>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="animate-blob absolute -top-10 left-1/4 h-10 w-48 rounded-full bg-primary opacity-30 blur-2xl" />
        <div className="animate-blob animation-delay-2000 absolute right-1/4 top-0 h-10 w-36 rounded-full bg-primary opacity-30 blur-2xl" />
        <div className="animate-blob animation-delay-4000 absolute bottom-0 left-1/2 h-20 w-40 rounded-full bg-primary opacity-30 blur-2xl" />
      </div>
    </div>
  )
}
