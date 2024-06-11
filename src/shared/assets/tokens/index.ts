import ethereum from '@/shared/assets/tokens/ethereum.json'
import goerli from '@/shared/assets/tokens/goerli.json'
import sepolia from '@/shared/assets/tokens/sepolia.json'
import farming from '@/shared/assets/tokens/farming.json'
import arbitrum from '@/shared/assets/tokens/arbitrum.json'

const TOKENS = {
  ethereum,
  goerli,
  farming,
  sepolia,
  arbitrum,
}

export function getTokens(chainName: string) {
  return TOKENS[chainName] || []
}

export default TOKENS