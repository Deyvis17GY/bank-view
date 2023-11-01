export const priceFormatter = (
  price: string | number,
  currency: string = 'COP'
) => {
  const priceNumber = Number(price)
  if (Number.isNaN(priceNumber)) return price
  const formatter = Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0
  })
  return formatter.format(Number(price))
}
