/* eslint-disable */

export const formatCurrency = (
  value: number,
  currency: string = 'IDR',
  locale: string = 'id-ID',
) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(value)
}
