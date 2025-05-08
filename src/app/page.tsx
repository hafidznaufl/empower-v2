import { HydrateClient } from '~/trpc/server'
import ClientRootLayout from './(client-public-pages)/layout'
import Hero from './(client-public-pages)/_components/hero'
import EventCard from './(client-public-pages)/_components/event-card'
import FooterContent from './_components/footer'
import OurAdvantages from './(client-public-pages)/_components/our-advantages'
import CompanyProfile from './(client-public-pages)/_components/about-us'

export default async function page() {
  return (
    <HydrateClient>
      <ClientRootLayout>
        <Hero />
        <OurAdvantages />
        <CompanyProfile />
      </ClientRootLayout>
    </HydrateClient>
  )
}
