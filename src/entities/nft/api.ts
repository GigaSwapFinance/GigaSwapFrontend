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

export async function fetchNftCollectionByAddress(tokenAddress: string) {
  const { data: token } = await request(`/nfts/${tokenAddress}`, true)
  return token
}

export async function fetchNftBalanceByAddress(tokenAddress: string, address: string) {
  const { data: balance } = await request(`/nfts/${tokenAddress}/balance/${address}`, true)
  return balance
}

export async function fetchNftByTokenId(tokenAddress: string, tokenId: number) {
  const { data: token } = await request(`/nfts/${tokenAddress}/${tokenId}`, true)
  return token
}