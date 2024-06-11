import Contract from '@/shared/lib/contract'
import { CONTRACTS } from '@/shared/const/contracts'
import type { IToken } from '@/shared/types/swapper'

interface ICreateProps {
  asset1: IToken
  asset2: IToken
  asset1Value: string
  asset2Value: string
  buyLimit?: number
  whitelistedAddresses?: string[]
  lockSettings?: number[]
}

async function createPosition({ asset1, asset2, asset1Value, asset2Value, whitelistedAddresses = [], buyLimit = 0, lockSettings }: ICreateProps) {
  const contract = new Contract(CONTRACTS.erc20Sale.address, CONTRACTS.erc20Sale.abi)

  const priceNom = asset2Value
  const priceDenom = asset1Value
  const count = asset1Value

  console.log({
    priceNom,
    priceDenom,
    count,
    buyLimit,
    whitelistedAddresses,
    lockSettings,
  })

  return contract.send(
  'createPosition',
    [
      asset1.address,
      asset2.address,
      priceNom.toString(),
      priceDenom.toString(),
      count.toString(),
      buyLimit,
      whitelistedAddresses,
      lockSettings,
    ],
  )
}

export default createPosition