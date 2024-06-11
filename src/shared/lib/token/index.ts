import Contract from '@/shared/lib/contract'
import { useUserStore } from '@/stores'
import { CONTRACTS } from '@/shared/const/contracts'

export async function isTokenAllowed(tokenAddress: string, amountWithDecimals: string, spenderAddress: string) {
  const userStore = useUserStore()
  const contract = new Contract(tokenAddress, CONTRACTS.erc20.abi)

  const allowance = await contract.call('allowance', [userStore.address, spenderAddress])

  return Number(allowance) >= Number(amountWithDecimals)
}

export async function approveToken(tokenAddress: string, spenderAddress: string) {
  const contract = new Contract(tokenAddress, CONTRACTS.erc20.abi)

  const MAX_NUMBER = '115792089237316195423570985008687907853269984665640564039457584007913129639935'

  return contract.send('approve', [spenderAddress, MAX_NUMBER])
}

export async function isErc721Allowed(tokenAddress: string, addressToApprove: string, tokenId: number) {
  const contract = new Contract(tokenAddress, CONTRACTS.erc721.abi)
  const approvedAddress = await contract.call('getApproved', [tokenId])

  return approvedAddress.toLowerCase() === addressToApprove.toLowerCase()
}

export async function approveErc721Token(tokenAddress: string, addressToApprove: string, tokenId: number) {
  const contract = new Contract(tokenAddress, CONTRACTS.erc721.abi)

  return contract.send('approve', [addressToApprove, tokenId])
}

export async function getOwnerOfErc721Token(tokenAddress: string, tokenId: number) {
  const contract = new Contract(tokenAddress, CONTRACTS.erc721.abi)

  return contract.call('ownerOf', [tokenId])
}