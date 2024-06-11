import BigNumber from 'bignumber.js'
import { replaceBetween } from '@/shared/lib/utils/string'

export function scientificToDecimal(value: string | number) {
  const num = new BigNumber(value)
  BigNumber.config({ EXPONENTIAL_AT: 100 })

  return num.toString()
}

export function correctNumber(number: string | number, decCount = 2) {
  const num = scientificToDecimal(number)

  const int = num.split('.')[0]
  const decimals = num.split('.')[1]

  if (!decimals) {
    return num
  }

  const firstDigitIndex = decimals.split('').findIndex((digit) => digit !== '0') || 0

  if (!firstDigitIndex && firstDigitIndex !== 0) {
    return num
  }

  return int + '.' + decimals.slice(0, firstDigitIndex + decCount)
}

export function initCorrectNumber(number: string | number, preventLongZero = false, dec = 2) {
  const value = correctNumber(number, dec)

  const numArray = value.toString().split('.')
  let num = ''
  let integer = numArray[0]
  let decimals = numArray?.[1]

  if (decimals && preventLongZero) {
    const de = decimals?.split('')
    const firstZeroIndex = de.findIndex((d) => +d === 0)
    let zeroCount = 0

    if (firstZeroIndex >= 0) {
      for (let n of de) {
        if (+n === 0) {
          zeroCount += 1
        }
      }
    }

    if (zeroCount > 3) {
      decimals = replaceBetween(
        decimals,
        firstZeroIndex + 1,
        firstZeroIndex + zeroCount,
        `<small>${zeroCount}</small>`,
      )
    }
  }

  const correctInteger = integer
    .toString()
    .replace(/\D/g, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  num += correctInteger

  if (decimals) {
    num += `.${decimals}`
  }

  return num
}

export function isDecimalsCorrect(value: string, decimals: number) {
  let isCorrect = true

  const numArray = value?.split('.')
  const decimalCount = numArray?.[1]?.length

  if (decimalCount && decimalCount > decimals) {
    isCorrect = false
  }

  return isCorrect
}