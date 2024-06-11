import { createDirect, executeDirect } from '@/entities/direct/api'
import type { IAsset, ISwapperAssets } from '@/shared/types/swapper'
import type { IDirectAsset } from '@/shared/types/direct'
import { useUserStore } from '@/stores'
import { NULL_ADDRESS } from '@/shared/const/tokens'
import { decimalsOn } from '@/shared/lib/utils/token'
import { updateLastDirect } from '@/entities/trade/api'

interface ICreateProps {
  assets: ISwapperAssets
  partnerAddress?: string
}

export async function createDirectTrade({ assets, partnerAddress }: ICreateProps) {
  if (!partnerAddress) {
    partnerAddress = NULL_ADDRESS
  }

  const newAssets = mapToDirectAssets(assets, partnerAddress)

  const { transactionHash } = await createDirect({ assets: newAssets, partnerAddress })

  const newTrade = await new Promise(res => {
    setTimeout(async () => res(await updateLastDirect()), 6000)
  })

  return {
    newTrade,
    transactionHash,
  }
}

function mapToDirectAssets(assets: ISwapperAssets, partnerAddress?: string) {
  const directAssets = []

  for (let asset of assets.send) {
    const directAsset = mapAsset('send', asset, partnerAddress)
    directAssets.push(directAsset)
  }

  for (let asset of assets.receive) {
    const directAsset = mapAsset('receive', asset, partnerAddress)
    directAssets.push(directAsset)
  }

  return directAssets
}

function mapAsset(assetType: 'send' | 'receive', asset: IAsset, partnerAddress: string): IDirectAsset {
  const userStore = useUserStore()

  const directType = {
    currency: 1,
    ERC20: 2,
    ERC721: 3,
    // ERC721: 4 // erc721count
  }

  const newAssetType: number = directType[asset.token.type]
  const isNft = asset.token.type === 'ERC721'

  const newAsset: IDirectAsset = {
    type: newAssetType,
    fromAddress: assetType === 'send' ? userStore.address : partnerAddress,
    toAddress: assetType === 'send' ? partnerAddress : userStore.address,
  }

  if (asset.token.address) {
    newAsset.tokenAddress = asset.token.address
  }

  if (isNft) {
    newAsset.tokenId = String(asset.value)
  } else {
    newAsset.amount = decimalsOn(asset.value, asset.token.decimals)
  }

  // const l = [
  //   {
  //     type: 3,
  //     fromAddress: userStore.address,
  //     toAddress: NULL_ADDRESS,
  //     tokenAddress: '0x30a1949cd32fbd44d258299d53f4449c92fbee0c',
  //     tokenId: '102',
  //   },
  //
  //   {
  //     type: 2,
  //     fromAddress: NULL_ADDRESS,
  //     toAddress: userStore.address,
  //     tokenAddress: '0x21f8E86082503e05320B1Aeb5DE9F248FED64b3b',
  //     amount: '10000000000000000',
  //   },
  // ]

  return newAsset
}