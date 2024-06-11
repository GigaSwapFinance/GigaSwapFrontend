import type { IAsset } from '@/shared/types/swapper'
import { approveErc721Token, approveToken, isErc721Allowed, isTokenAllowed } from '@/shared/lib/token'
import { CONTRACTS } from '@/shared/const/contracts'
import { decimalsOn } from '@/shared/lib/utils/token'

export async function approveAsset(asset: IAsset, addressToApprove: string) {
  const isErc721 = asset.token.type === 'ERC721'

  if (isErc721) {
    return approveErc721Token(asset.token.address, addressToApprove, asset.value)
  } else {
    return approveToken(asset.token.address, addressToApprove)
  }
}

export async function isAssetApproved(asset: IAsset, addressToApprove: string) {
  const address = asset?.token?.address
  const amountWithoutDecimals = asset?.value

  if (!asset.token || !amountWithoutDecimals || !address) {
    return
  }

  if (asset.token.type === 'ERC721') {
    return isErc721Allowed(address, addressToApprove, amountWithoutDecimals)
  } else {
    const amount = decimalsOn(amountWithoutDecimals, asset.token?.decimals)
    return await isTokenAllowed(address, amount, addressToApprove)
  }
}