import Contract from '@/shared/lib/contract'
import { CONTRACTS } from '@/shared/const/contracts'
import { useUserStore } from '@/stores'

export async function wrapEth(ethAmount: string) {
  const contract = new Contract(CONTRACTS.gweth.address, CONTRACTS.gweth.abi)

  const userStore = useUserStore()

  return contract.send('mintTo', [userStore.address], ethAmount)
}

export async function unwrapEth(ethAmount: string) {
  const contract = new Contract(CONTRACTS.gweth.address, CONTRACTS.gweth.abi)

  return contract.send('unwrap', [ethAmount])
}