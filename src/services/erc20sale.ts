import { decimalsOn } from '@/shared/lib/utils/token'
import { useTradeStore } from '@/stores'
import createPosition from '@/entities/erc20sale/api/createPosition'
import { updateLastTrade } from '@/entities/trade/api'

export async function createErc20Sale({ assets }) {
  const tradeStore = useTradeStore()

  const whitelistedAddresses = []
  let buyLimit = 0
  let lockSettings = [0, 0, 0]

  if (tradeStore.isWhitelistEnabled && tradeStore.whitelistedAddress) {
    whitelistedAddresses.push(tradeStore.whitelistedAddress)
  }

  if (tradeStore.isBuyLimitEnabled) {
    buyLimit = tradeStore.buyLimit || 0
  }

  if (tradeStore.isVestingEnabled) {
    lockSettings = [
      Number(tradeStore.vestingReleasedOnBuy) * 100,
      Number(tradeStore.vestingPeriodLengthInHours) * 60 * 60,
      Number(tradeStore.vestingReleasedOnPeriod) * 100,
    ]
  }

  const { transactionHash } = await createPosition({
    asset1: assets.send[0].token,
    asset2: assets.receive[0].token,
    asset1Value: decimalsOn(assets.send[0].value, assets.send[0].token.decimals),
    asset2Value: decimalsOn(assets.receive[0].value, assets.receive[0].token.decimals),
    whitelistedAddresses,
    buyLimit,
    lockSettings,
  })

  const newTrade = await new Promise(res => {
    setTimeout(async () => res(await updateLastTrade()), 6000)
  })

  console.log({ new: newTrade })

  return {
    newTrade,
    transactionHash,
  }
}