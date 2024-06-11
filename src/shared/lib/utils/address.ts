import web3 from '@/app/providers/web3'

export function shortAddress(address: string): string {
  if (!address) {
    return ''
  }

  return `${address.substring(0, 4)}...${address.substring(address.length - 4)}`
}

export function checkIfAddressValid(address: string) {
  return web3.utils.isAddress(address)
}