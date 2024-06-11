// export enum IDirectAssetType {
//   eth = 1,
//   erc20 = 2,
//   nft = 3,
// }

export interface IDirectAsset {
  type: 1 | 2 | 3 | 4
  fromAddress: string
  toAddress: string
  tokenAddress?: string
  amount?: string
  tokenId?: string
}

export interface IDirectCreateProps {
  assets: IDirectAsset[]
  partnerAddress?: string
}