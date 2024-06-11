import type { ISwapperAssets } from '@/shared/types/swapper'
import { createErc20Sale } from '@/services/erc20sale'
import { createDirectTrade } from '@/services/direct'
import BigNumber from 'bignumber.js'
import { decimalsOff, decimalsOn } from '@/shared/lib/utils/token'
import Contract from '@/shared/lib/contract'
import { CONTRACTS } from '@/shared/const/contracts'

interface ICreateProps {
  type: 'fractional' | 'direct'
  assets: ISwapperAssets
  partnerAddress?: string
}

export async function createTrade({ type, assets, partnerAddress }: ICreateProps) {
  if (type === 'fractional') {
    return createErc20Sale({ assets })
  }

  return createDirectTrade({ assets, partnerAddress })
}

export async function getTokenSwapValues({ blockchainId, assets, isReceive, priceNom, priceDenom }) {
  let sendValue = null
  let receiveValue = null

  const sendAsset = assets.send[0]
  const receiveAsset = assets.receive[0]

  const sendCount = sendAsset.value
  const receiveCount = receiveAsset.value

  const contract = new Contract(CONTRACTS.erc20Sale.address, CONTRACTS.erc20Sale.abi)

  if (isReceive) {
    if (!Number(receiveCount)) {
      return { sendValue: null, receiveValue: null }
    }

    const amountToSend = new BigNumber(decimalsOn(receiveCount, receiveAsset.token.decimals))
      .multipliedBy(priceNom)
      .dividedBy(priceDenom)
      .toString()

    sendValue = decimalsOff(amountToSend, sendAsset.token.decimals)
    receiveValue = receiveCount
  } else {
    if (!Number(sendCount)) {
      return { sendValue: null, receiveValue: null }
    }

    const amountWithDecimals = decimalsOn(sendCount, sendAsset.token.decimals)

    const amountToReceive = new BigNumber(amountWithDecimals)
      .multipliedBy(priceDenom)
      .dividedBy(priceNom)
      .toString()

    sendValue = sendCount
    receiveValue = decimalsOff(amountToReceive, receiveAsset.token.decimals)
  }

  return {
    sendValue,
    receiveValue,
  }
}