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

export async function fetchTrades() {
  const { data: trades } = await request(`/trades`, true)
  return trades
}

export async function fetchTradeById(tradeId: number) {
  const { data: trade } = await request(`/trades/${tradeId}`)
  return trade
}

export async function fetchTradesByAddress(address: string) {
  const { data: trades } = await request(`/trades/${address}`, true)
  return trades
}

export async function updateTradeById(tradeId: number) {
  return request(`/trades/${tradeId}/update`)
}

export async function updateTradeByBlockchainId(tradeBlockchainId: number) {
  return request(`/trades/${tradeBlockchainId}/update`, true)
}

export async function updateLastTrade() {
  const { data: lastTrade } = await request(`/trades/update-last-trade`, true)
  return lastTrade
}

export async function updateLastDirect() {
  const { data: lastTrade } = await request(`/direct/update-last-trade`, true)
  return lastTrade
}