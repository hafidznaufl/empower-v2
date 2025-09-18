'use client'

import Image from 'next/image'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import sttnfImage from '~/public/image/sttnf.jpg'
import logoSatgasSTTNF from '~/public/image/logo-satgas-sttnf.jpg'
import { env } from '~/env'
import { EnvelopeClosedIcon, InstagramLogoIcon } from '@radix-ui/react-icons'

export default function AboutUs() {
  const instagramUsername = env.NEXT_PUBLIC_INSTAGRAM_USERNAME
  const instagramUrl = `https://www.instagram.com/${instagramUsername}/`

  return (
    <div className="container mx-auto space-y-8 px-4 pb-12 pt-8">
      <Card className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="group relative h-80 w-full overflow-hidden rounded-t-lg p-4 md:h-auto md:rounded-l-lg md:rounded-tr-none">
          <Image
            src={sttnfImage}
            alt="STT Terpadu Nurul Fikri"
            fill
            sizes="100%"
            className="object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-110"
            placeholder="blur"
          />
        </div>
        <CardHeader className="space-y-4 pt-0 md:pl-0 md:pt-6">
          <div className="flex items-center justify-center">
            <Image
              src={logoSatgasSTTNF}
              alt="Satgas PPKPT STTNF Logo"
              width={100}
              height={100}
              className="rounded-full border"
              placeholder="blur"
            />
          </div>
          <div>
            <CardTitle className="text-2xl font-semibold md:text-xl">
              About Satgas PPKPT STT Terpadu Nurul Fikri
            </CardTitle>
            <CardDescription className="mt-2 text-justify">
              The Violence Prevention and Handling Task Force (Satgas PPKPT) was
              established as a form of institutional commitment to creating a
              safe, inclusive, and violence-free campus environment. Based on
              the Ministry of Education Regulation No. 30 of 2021, this task
              force serves as the front line in preventing and handling cases of
              violence — including sexual violence, physical abuse, verbal
              harassment, bullying, and other forms of violence — within STT
              Terpadu Nurul Fikri.
            </CardDescription>
            <CardDescription className="mt-2 text-justify">
              The main duties of Satgas PPKPT include education and outreach,
              receiving and following up on reports, providing assistance, and
              formulating policy recommendations for the institution.
            </CardDescription>
          </div>
          <div>
            <CardTitle className="text-xl font-semibold">
              Vision & Mission of Satgas PPKPT STT Terpadu Nurul Fikri
            </CardTitle>
            <CardDescription className="mt-2 text-justify">
              <strong>Vision:</strong> To create a safe, dignified, and
              violence-free campus environment for everyone.
            </CardDescription>
            <CardDescription className="text-justify">
              <strong>Mission:</strong>
              <ul className="list-disc pl-6">
                <li>
                  Raise awareness and understanding among the academic community
                  about all forms of violence, including sexual violence,
                  physical abuse, bullying, and harassment.
                </li>
                <li>
                  Provide prompt, appropriate, and victim-centered handling
                  services for survivors.
                </li>
                <li>
                  Advocate for fair campus policies that protect victims and
                  prevent recurrence of violence.
                </li>
                <li>
                  Establish collaboration with internal and external parties for
                  comprehensive violence prevention and handling.
                </li>
              </ul>
            </CardDescription>
          </div>
          <div>
            <CardTitle className="text-xl font-semibold">
              General Membership Structure
            </CardTitle>
            <CardDescription className="mt-2 text-justify">
              Satgas PPKPT STTNF consists of representatives from lecturers,
              educational staff, and students. They are selected through a
              transparent process and are specially trained to handle cases of
              sexual violence professionally, confidentially, and
              empathetically.
            </CardDescription>
          </div>
          <div>
            <CardTitle className="text-xl font-semibold">
              Satgas Contact
            </CardTitle>
            <CardDescription className="mt-2">
              <p>
                Email:{' '}
                <a
                  href="mailto:satgas-ppkpt@nurulfikri.ac.id"
                  className="underline"
                >
                  <EnvelopeClosedIcon className="mr-1 inline h-4 w-4" />
                  satgas-ppkpt@nurulfikri.ac.id
                </a>
              </p>
              <p>
                Instagram:{' '}
                <a href={instagramUrl} className="underline">
                  <InstagramLogoIcon className="mr-1 inline h-4 w-4" />@
                  {instagramUsername}
                </a>
              </p>
              <p>
                Address: STT Terpadu Nurul Fikri Campus, Jl. Lenteng Agung,
                South Jakarta
              </p>
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  )
}
