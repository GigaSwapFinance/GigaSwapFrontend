import Contract from '@/shared/lib/contract'
import { useUserStore } from '@/stores'
import { CONTRACTS } from '@/shared/const/contracts'
import web3 from '@/app/providers/web3'

export async function getBalance(tokenAddress: string, address?: string) {
  const contract = new Contract(tokenAddress, CONTRACTS.erc20.abi)

  if (!address) {
    const userStore = useUserStore()
    address = userStore.address
  }

  return contract.call('balanceOf', [address])
}

export async function getEthBalance(address?: string) {
  if (!address) {
    const userStore = useUserStore()
    address = userStore.address
  }

  return web3.eth.getBalance(address)
}