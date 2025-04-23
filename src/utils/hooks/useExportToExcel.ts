import * as XLSX from 'xlsx'

export const useExportToExcel = () => {
  const exportToExcel = <T extends object>(
    data: T[],
    fileName = 'data.xlsx',
    sheetName = 'Sheet1',
  ) => {
    if (data.length === 0) return
    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)

    XLSX.writeFile(workbook, fileName)
  }

  const exportToCSV = <T extends object>(data: T[], fileName = 'data.csv') => {
    if (data.length === 0) return
    const worksheet = XLSX.utils.json_to_sheet(data)
    const csv = XLSX.utils.sheet_to_csv(worksheet)

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return { exportToExcel, exportToCSV }
}
