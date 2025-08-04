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

export default function AboutUs() {
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
              alt="Satgas PPKS STTNF Logo"
              width={100}
              height={100}
              className="rounded-full border"
              placeholder="blur"
            />
          </div>
          <div>
            <CardTitle className="text-2xl font-semibold md:text-xl">
              About Satgas PPKS STT Terpadu Nurul Fikri
            </CardTitle>
            <CardDescription className="mt-2 text-justify">
              The Sexual Violence Prevention and Handling Task Force (Satgas
              PPKS) was established as a form of institutional commitment to
              creating a safe, inclusive, and sexual violence-free campus
              environment. Based on the Ministry of Education Regulation No. 30
              of 2021, this task force serves as the front line in preventing
              and handling cases within STT Terpadu Nurul Fikri.
            </CardDescription>
            <CardDescription className="mt-2 text-justify">
              The main duties of Satgas PPKS include education and outreach,
              receiving and following up on reports, providing assistance, and
              formulating policy recommendations for the institution.
            </CardDescription>
          </div>
          <div>
            <CardTitle className="text-xl font-semibold">
              Vision & Mission of Satgas PPKS STT Terpadu Nurul Fikri
            </CardTitle>
            <CardDescription className="mt-2 text-justify">
              <strong>Vision:</strong> To create a safe, dignified, and
              violence-free campus environment.
            </CardDescription>
            <CardDescription className="text-justify">
              <strong>Mission:</strong>
              <ul className="list-disc pl-6">
                <li>
                  Raise awareness and understanding among the academic community
                  about sexual violence.
                </li>
                <li>
                  Provide prompt, appropriate, and victim-centered handling
                  services.
                </li>
                <li>Advocate for fair campus policies that protect victims.</li>
                <li>
                  Establish collaboration with internal and external parties for
                  sexual violence prevention.
                </li>
              </ul>
            </CardDescription>
          </div>
          <div>
            <CardTitle className="text-xl font-semibold">
              General Membership Structure
            </CardTitle>
            <CardDescription className="mt-2 text-justify">
              Satgas PPKS STTNF consists of representatives from lecturers,
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
                <a href="mailto:ppks@nurulfikri.ac.id" className="underline">
                  ppks@nurulfikri.ac.id
                </a>
              </p>
              <p>
                Instagram:{' '}
                <a
                  href="https://www.instagram.com/satgasppks.sttnf/"
                  className="underline"
                >
                  @satgasppks.sttnf
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
