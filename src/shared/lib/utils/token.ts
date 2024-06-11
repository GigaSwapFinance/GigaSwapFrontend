import BigNumber from 'bignumber.js'

BigNumber.config({ POW_PRECISION: 18 })

export function decimalsOn(value: string | number | null, decimalCount: number = 0) {
  return new BigNumber(value || 0).multipliedBy(Math.pow(10, decimalCount)).toString()
}

export function decimalsOff(value: string | number | null, decimalCount: number = 0) {
  return new BigNumber(value || 0).dividedBy(Math.pow(10, decimalCount)).toString()
}

export function tokenFilter(token: any, text: string) {
  const address = token.address?.toLowerCase()
  const symbol = token.symbol?.toLowerCase()
  const name = token.name?.toLowerCase()

  text = text.toLowerCase()

  return address?.includes(text) || symbol?.includes(text) || name?.includes(text)
}