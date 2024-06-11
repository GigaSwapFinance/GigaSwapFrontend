import Contract from '@/shared/lib/contract'
import { CONTRACTS } from '@/shared/const/contracts'
import { useUserStore } from '@/stores'

export async function swap(blockchainTradeId: string, count: string) {
  const contract = new Contract(CONTRACTS.erc20Sale.address, CONTRACTS.erc20Sale.abi)
  const userStore = useUserStore()

  const trade = await contract.call('getPosition', [blockchainTradeId])

  console.log({
    blockchainTradeId,
    userAddress: userStore.address,
    count,
    priceNom: trade.priceNom,
    priceDenom: trade.priceDenom,
    trade
  })

  return contract.send('buy', [
    blockchainTradeId,
    userStore.address,
    count,
    trade.priceNom,
    trade.priceDenom,
    userStore.address,
  ])
}