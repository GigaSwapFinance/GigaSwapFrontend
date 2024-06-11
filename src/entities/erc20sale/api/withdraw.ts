import Contract from '@/shared/lib/contract'
import { CONTRACTS } from '@/shared/const/contracts'

export async function withdraw(tradeId: string | number, assetCode: number) {
  const contract = new Contract(CONTRACTS.erc20Sale.address, CONTRACTS.erc20Sale.abi)

  // console.log({ tradeId, assetCode })

  return contract.send('withdrawAll', [tradeId, assetCode])
}