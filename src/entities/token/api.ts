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

export async function fetchTokenByAddress(address: string) {
  const { data: token } = await request(`/tokens/${address}`, true)
  return token
}

export async function fetchTokenPriceByAddress(address: string) {
  const { data: tokenPrice } = await request(`/tokens/${address}/price`, true)
  return tokenPrice
}

export async function fetchCurrencyPrice() {
  const { data: tokenPrice } = await request(`/tokens/price`, true)
  return tokenPrice
}