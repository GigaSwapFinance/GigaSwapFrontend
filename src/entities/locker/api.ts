import axios from '@/app/providers/axios'
import { useAppStore } from '@/stores'

async function request(url: string, withChainName = false) {
  if (withChainName) {
    const appStore = useAppStore()
    const currentChain = appStore.currentChain

    url = '/' + currentChain?.name + url
  }

  return axios.get(url)
}

export async function fetchLocksByAddress(address) {
  const { data: locks } = await request(`/locks/${address}`, true)
  return locks
}