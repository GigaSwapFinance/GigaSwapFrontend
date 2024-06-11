import { useAppStore } from '@/stores'
import TOKENS from '@/shared/assets/tokens'

export const NULL_ADDRESS = '0x0000000000000000000000000000000000000000'

export const GIGA_TOKEN_ADDRESS = '0x83249c6794bca5a77eb8c0af9f1a86e055459cea'

export const GIGA_TOKEN = TOKENS.ethereum.find(token => token.address === GIGA_TOKEN_ADDRESS)

export function getTokenExplorerUrl(tokenAddress: string | undefined) {
  const appStore = useAppStore()
  const chain = appStore.currentChain

  if (!tokenAddress) {
    return 'https://ethereum.org'
  }

  return `${chain?.explorerUrl}/token/${tokenAddress}`
}

export function getTxExplorerUrl(txHash: string) {
  const appStore = useAppStore()
  const chain = appStore.currentChain

  return `${chain?.explorerUrl}/tx/${txHash}`
}

export function getWalletExplorerUrl(address: string) {
  const appStore = useAppStore()
  const chain = appStore.currentChain

  return `${chain?.explorerUrl}/address/${address}`
}

export function getUniswapSwapUrl(tokenAddress: string, uniswapChainName?: string = 'mainnet') {
  return `https://app.uniswap.org/#/swap?inputCurrency=eth&outputCurrency=${tokenAddress}&chain=${uniswapChainName}`
}