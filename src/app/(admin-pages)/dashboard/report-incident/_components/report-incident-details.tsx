import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import {
  Calendar,
  FileText,
  User,
  Mail,
  Phone,
  BookOpen,
  GraduationCap,
  Clock,
  CheckCircle,
  XCircle,
  FileImage,
  MessageSquare,
  UserCircle,
  AlertCircle,
  ChevronsLeft,
} from 'lucide-react'
import Link from 'next/link'
import { Badge } from '~/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Separator } from '~/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip'
import type { z } from 'zod'
import type { reportIncidentSchemaColumn } from './schema'
import { Button } from '~/app/_components/ui/button'
import { useRouter } from 'next/navigation'

type ReportIncident = z.infer<typeof reportIncidentSchemaColumn>

interface ReportIncidentDetailProps {
  incident: ReportIncident
}

export function ReportIncidentDetail({ incident }: ReportIncidentDetailProps) {
  const router = useRouter()
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'secondary'
      case 'IN_PROCESS':
        return 'default'
      case 'PROVEN_LIGHTLY_SACTIONED':
        return 'secondary'
      case 'PROVEN_MODERATElYY_SACTIONED':
        return 'secondary'
      case 'PROVEN_SEVERELY_SACTIONED':
        return 'destructive'
      default:
        return 'outline'
    }
  }

  const formatStudyProgram = (program: string) => {
    switch (program) {
      case 'INFORMATION_SYSTEMS':
        return 'Sistem Informasi'
      case 'COMPUTER_ENGINEERING':
        return 'Teknik Komputer'
      case 'DIGITAL_BUSINESS':
        return 'Bisnis Digital'
      default:
        return program.replace(/_/g, ' ')
    }
  }

  const formatReportStatus = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'Menunggu'
      case 'IN_PROCESS':
        return 'Dalam Proses'
      case 'PROVEN_LIGHTLY_SACTIONED':
        return 'Terbukti - Sanksi Ringan'
      case 'PROVEN_MODERATElYY_SACTIONED':
        return 'Terbukti - Sanksi Sedang'
      case 'PROVEN_SEVERELY_SACTIONED':
        return 'Terbukti - Sanksi Berat'
      default:
        return status.replace(/_/g, ' ')
    }
  }

  return (
    <div className="space-y-4">
      <Card className="shadow-none">
        <CardHeader className="border-b pb-4 pt-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="flex items-center gap-2 text-xl font-bold">
              <FileText className="h-5 w-5" />
              Detail Laporan Insiden
            </CardTitle>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <div className="flex items-center gap-1.5 rounded-full bg-accent px-3 py-1">
                <Clock className="h-4 w-4 opacity-80" />
                <span className="font-medium">
                  {format(incident.createdAt, 'eeee, dd MMMM yyyy', {
                    locale: id,
                  })}
                </span>
              </div>
              <Badge
                variant={getBadgeVariant(incident.reportStatus)}
                className="px-3 py-1 font-medium"
              >
                {formatReportStatus(incident.reportStatus)}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-l-4 border-primary pl-2">
                <User className="h-5 w-5" />
                <h3 className="text-lg font-semibold tracking-tight">
                  Informasi Pelapor
                </h3>
              </div>

              <div className="rounded-lg bg-accent p-5 shadow-sm">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-start gap-3 rounded-md p-2 transition-colors hover:bg-accent/80">
                    <User className="mt-0.5 h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">
                        Nama
                      </p>
                      <p className="font-medium">{incident.name}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-md p-2 transition-colors hover:bg-accent/80">
                    <Mail className="mt-0.5 h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">
                        Email
                      </p>
                      <p className="font-medium">{incident.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-md p-2 transition-colors hover:bg-accent/80">
                    <Calendar className="mt-0.5 h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">
                        Tanggal Lahir
                      </p>
                      <p className="font-medium">
                        {format(incident.dayOfBirth, 'dd MMMM yyyy', {
                          locale: id,
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-md p-2 transition-colors hover:bg-accent/80">
                    <UserCircle className="mt-0.5 h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">
                        Jenis Kelamin
                      </p>
                      <p className="font-medium capitalize">
                        {incident.gender === 'MALE' ? 'Male' : 'Female'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-md p-2 transition-colors hover:bg-accent/80">
                    <GraduationCap className="mt-0.5 h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">
                        Program Studi
                      </p>
                      <p className="font-medium">
                        {formatStudyProgram(incident.studyProgram)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-md p-2 transition-colors hover:bg-accent/80">
                    <BookOpen className="mt-0.5 h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">
                        Semester
                      </p>
                      <p className="font-medium">{incident.semester}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-md p-2 transition-colors hover:bg-accent/80">
                    <Phone className="mt-0.5 h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">
                        Kontak
                      </p>
                      <p className="font-medium">{incident.contact}</p>
                    </div>
                  </div>
                </div>

                <Separator className="my-4 bg-black/20 dark:bg-white/20" />

                <div className="flex items-center gap-3 rounded-md bg-accent/80 p-3">
                  {incident.willingToBeContacted ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                  <span className="text-sm font-medium">
                    {incident.willingToBeContacted
                      ? 'Bersedia dihubungi untuk informasi lebih lanjut'
                      : 'Tidak bersedia dihubungi'}
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-l-4 border-primary pl-2">
                <MessageSquare className="h-5 w-5" />
                <h3 className="text-lg font-semibold tracking-tight">
                  Kronologi Kejadian
                </h3>
              </div>

              <div className="rounded-lg bg-accent p-5 shadow-sm">
                <p className="whitespace-pre-wrap leading-relaxed">
                  {incident.incidentDescription}
                </p>
              </div>
            </div>
          </div>

          {incident.fileURL.length > 0 && (
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-2 border-l-4 border-primary pl-2">
                <FileImage className="h-5 w-5" />
                <h3 className="text-lg font-semibold tracking-tight">
                  Bukti Lampiran
                </h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {incident.fileURL.map((url, i) => (
                  <TooltipProvider key={i}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={
                            process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BASE_URL +
                            url
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative flex items-center gap-3 overflow-hidden rounded-lg border p-3 shadow-sm transition-all hover:shadow-md"
                        >
                          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-accent">
                            <FileText className="h-6 w-6" />
                          </div>
                          <div>
                            <p className="font-medium">Lampiran {i + 1}</p>
                            <p className="text-xs text-muted-foreground">
                              Klik untuk melihat
                            </p>
                          </div>
                          <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 transition-opacity group-hover:opacity-100"></div>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Buka lampiran di tab baru</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 rounded-lg border bg-accent p-5 shadow-sm">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
                <span className="mr-1 font-medium">ID Laporan:</span>
                <Badge>{incident.id}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">
                  Dilaporkan pada:{' '}
                  {format(incident.createdAt, 'dd MMMM yyyy, HH:mm', {
                    locale: id,
                  })}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Button
          onClick={() => router.push('/dashboard/report-incident')}
          className="rounded-2xl"
        >
          <ChevronsLeft className="mr-2 h-4 w-4" />
          Back to Report Incident Dashboard
        </Button>
      </div>
    </div>
  )
}
