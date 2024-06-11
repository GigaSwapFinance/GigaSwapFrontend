export interface IToken {
  address?: string
  symbol: string
  name: string
  decimals?: number
  logoURI?: string
  type: 'currency' | 'ERC20' | 'ERC721'
}

export interface IAsset {
  token: IToken
  value?: string | null
  balance?: string | null
  amount?: string | null
}

export interface ISwapperAssets {
  send: IAsset[]
  receive: IAsset[]
}

// nft

export interface INft {
  owner: string
  metadata: object
  id: number
}