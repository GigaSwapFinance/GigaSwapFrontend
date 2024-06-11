import { defineStore } from 'pinia'
import { CHAINS } from '@/shared/const/chains'
import { setContracts } from '@/shared/const/contracts'

const DEFAULT_CHAIN_ID = 1

const useAppStore = defineStore('app', () => {
  return {
    chainId: DEFAULT_CHAIN_ID,
    currentChain: null,

    setChain(chainId: number) {
      this.chainId = chainId
      this.setCurrentChain(chainId)
    },

    resetSettings() {
      this.chainId = DEFAULT_CHAIN_ID
      this.setCurrentChain(DEFAULT_CHAIN_ID)
    },

    setCurrentChain(chainId: number) {
      this.currentChain = CHAINS.find(chain => chain.id === chainId && !chain.isDisabled)
      setContracts(this.currentChain.name)
    }
  }
})

export default useAppStore