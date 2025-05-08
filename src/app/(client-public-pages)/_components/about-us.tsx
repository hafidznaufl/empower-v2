'use client'

import { useTheme } from 'next-themes'
import Image from 'next/image'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import sttnfImage from '~/public/image/sttnf.jpg'

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
          />
        </div>
        <CardHeader className="space-y-5 pt-0 md:pl-0 md:pt-6">
          <div>
            <CardTitle className="text-2xl font-bold md:text-xl">
              Tentang Satgas PPKS STT Terpadu Nurul Fikri
            </CardTitle>
            <CardDescription className="mt-2 text-justify">
              Satuan Tugas Pencegahan dan Penanganan Kekerasan Seksual (Satgas
              PPKS) dibentuk sebagai bentuk komitmen institusi dalam menciptakan
              lingkungan kampus yang aman, inklusif, dan bebas dari kekerasan
              seksual. Berdasarkan Permendikbudristek No. 30 Tahun 2021, Satgas
              ini menjadi garda terdepan dalam pencegahan dan penanganan kasus
              di lingkungan STT Terpadu Nurul Fikri.
            </CardDescription>
            <CardDescription className="mt-2 text-justify">
              Tugas utama Satgas PPKS meliputi edukasi dan sosialisasi, menerima
              dan menindaklanjuti laporan, memberikan pendampingan, serta
              menyusun rekomendasi kebijakan kepada institusi.
            </CardDescription>
          </div>
          <div>
            <CardTitle className="text-xl font-semibold">
              Visi & Misi Satgas PPKS STTNF
            </CardTitle>
            <CardDescription className="mt-2 text-justify">
              <strong>Visi:</strong> Mewujudkan lingkungan kampus yang aman,
              bermartabat, dan bebas dari segala bentuk kekerasan seksual.
            </CardDescription>
            <CardDescription className="mtext-justify">
              <strong>Misi:</strong>
              <ul className="list-disc pl-6">
                <li>
                  Meningkatkan kesadaran dan pemahaman civitas akademika tentang
                  kekerasan seksual.
                </li>
                <li>
                  Memberikan layanan penanganan yang cepat, tepat, dan berpihak
                  pada korban.
                </li>
                <li>
                  Mendorong kebijakan kampus yang adil dan melindungi korban.
                </li>
                <li>
                  Menjalin kerja sama dengan pihak internal dan eksternal untuk
                  pencegahan kekerasan seksual.
                </li>
              </ul>
            </CardDescription>
          </div>
          <div>
            <CardTitle className="text-xl font-semibold">
              Struktur Umum Keanggotaan Satgas
            </CardTitle>
            <CardDescription className="mt-2 text-justify">
              Satgas PPKS STTNF terdiri dari perwakilan dosen, tenaga
              kependidikan, dan mahasiswa. Mereka dipilih melalui seleksi yang
              transparan dan dilatih secara khusus untuk menangani kasus
              kekerasan seksual secara profesional, rahasia, dan empatik.
            </CardDescription>
          </div>
          <div>
            <CardTitle className="text-xl font-semibold">
              Kontak Satgas
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
                Alamat: Kampus STT Terpadu Nurul Fikri, Jl. Lenteng Agung,
                Jakarta Selatan
              </p>
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  )
}
