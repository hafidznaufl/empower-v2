import { DataTable } from '~/app/_components/table/data-table'
import { columns, type VoucherColumn } from './columns'

async function getData(): Promise<VoucherColumn[]> {
  const vouchers: VoucherColumn[] = Array.from({ length: 30 }, (_, i) => ({
    id: (i + 1).toString(),
    code: `VOUCHER${i + 1}`,
    discount: Math.floor(Math.random() * 50) + 10,
    expiryDate:
      new Date(
        2024,
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28) + 1,
      )
        .toISOString()
        .split('T')[0] ?? '2025-12-31',
    isActive: Math.random() > 0.5,
    minTransaction: Math.floor(Math.random() * 200) + 50,
  }))

  return vouchers
}

export default async function VoucherTable() {
  const data = await getData()
  return (
    <div className="mt-4 px-8">
      <DataTable
        columns={columns}
        data={data}
        placeholderFilter="Search by Code"
        columnFilterName="code"
        buttonContent="Create Voucher"
      />
    </div>
  )
}
