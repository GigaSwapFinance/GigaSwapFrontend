import CONTRACT_ADDRESSES from '@/shared/assets/contract-addresses'
import ABIS from '@/shared/assets/abis'
import { useAppStore } from '@/stores'

export let CONTRACTS = initContracts('sepolia')

export function initContracts(chainName: string) {
  return {
    token: {
      abi: ABIS.erc20Abi,
      address: CONTRACT_ADDRESSES[chainName].GigaSwapToken
    },

    erc20: {
      abi: ABIS.erc20Abi,
    },

    erc721: {
      abi: ABIS.erc721Abi,
    },

    erc20Sale: {
      address: CONTRACT_ADDRESSES[chainName].Erc20Sale,
      abi: ABIS.erc20SaleAbi,
    },

    farming: {
      address: CONTRACT_ADDRESSES[chainName].Farming,
      abi: ABIS.farmingAbi,
    },

    direct: {
      address: CONTRACT_ADDRESSES[chainName].DealsFactory,
      abi: ABIS.directAbi
    },

    directController: {
      address: CONTRACT_ADDRESSES[chainName].GigaSwap,
      abi: ABIS.directControllerAbi,
    },

    directErc20Controller: {
      address: CONTRACT_ADDRESSES[chainName].Erc20DealPointsController,
    },

    directErc721Controller: {
      address: CONTRACT_ADDRESSES[chainName].Erc721ItemDealPointsController,
    },

    gweth: {
      address: CONTRACT_ADDRESSES[chainName].gWETH,
      abi: ABIS.gwethAbi,
    },

    locker: {
      address: CONTRACT_ADDRESSES[chainName].Erc20Locker,
      abi: ABIS.lockerAbi,
    },
  }
}

export async function setContracts() {
  const appStore = useAppStore()
  CONTRACTS = initContracts(appStore.currentChain.name)

  // console.log(`New contracts on ${appStore.currentChain.name}`, CONTRACTS)
}