import { type ReportIncident } from '@prisma/client'
import { Badge } from '~/app/_components/ui/badge'

export function RecentReports({ reports }: { reports: ReportIncident[] }) {
  return (
    <div className="space-y-8">
      {reports.slice(0, 5).map((report) => (
        <div key={report.id} className="flex items-center">
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{report.name}</p>
            <p className="text-sm text-muted-foreground">
              {report.email} • {new Date(report.createdAt).toLocaleDateString()}
            </p>
          </div>
          <Badge className="ml-auto font-medium">{report.reportStatus}</Badge>
        </div>
      ))}
    </div>
  )
}
