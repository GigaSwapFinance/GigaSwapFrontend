import { useAppStore, useUserStore } from '@/stores'
import { switchNetwork } from '@wagmi/core'

export async function switchChain(chainId: number) {
  const appStore = useAppStore()
  const userStore = useUserStore()

  if (userStore.address) {
    await switchNetwork({ chainId: chainId })
  }

  appStore.setChain(chainId)
}