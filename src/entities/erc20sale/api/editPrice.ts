import Contract from '@/shared/lib/contract'
import { CONTRACTS } from '@/shared/const/contracts'

export async function editPrice(tradeId: string | number, priceNom: string, priceDenom: string) {
  const contract = new Contract(CONTRACTS.erc20Sale.address, CONTRACTS.erc20Sale.abi)

  // console.log({ tradeId, assetCode })

  return contract.send('setPrice', [tradeId, priceNom, priceDenom])
}