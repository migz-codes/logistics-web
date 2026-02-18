export const onNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value.replace(/\D/g, '')
  const formatted = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return formatted
}

export const onCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value
  const numeric = value.replace(/\D/g, '')

  if (!numeric) return ''

  const cents = numeric.padStart(3, '0')

  const integerPart = cents.slice(0, -2)
  const decimalPart = cents.slice(-2)

  const formattedInteger = integerPart
    .replace(/^0+(\d)/, '$1')
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')

  return `${formattedInteger},${decimalPart}`
}
