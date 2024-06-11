interface IChainNativeCurrency {
  title: string
  ticker: string
  decimals: number
  icon: string
}

interface IChain {
  title: string
  icon: string
  id: number
  name: string
  hint?: string
  explorerUrl: string
  nativeCurrency: IChainNativeCurrency
  wrappedCurrency?: IChainNativeCurrency
  isDisabled?: boolean
  isTestnet?: boolean
  isTradesEnabled?: boolean
  isFarmingEnabled?: boolean
}``

export const CHAINS: IChain[] = [
  {
    title: 'Ethereum',
    icon: '/images/chains/ethereum.svg',
    id: 1,
    name: 'ethereum',
    explorerUrl: 'https://etherscan.io',
    nativeCurrency: {
      title: 'Ethereum',
      ticker: 'ETH',
      decimals: 18,
      icon: '/images/currencies/eth.svg',
    },
    wrappedCurrency: {
      title: 'GigaSwap Wrapped Ether',
      ticker: 'gWETH',
      decimals: 18,
      icon: '/images/currencies/gweth.svg',
    },
    // isDisabled: true,
    // hint: 'Testing',
    isFarmingEnabled: true,
    isTradesEnabled: true,
  },

  {
    title: 'Arbitrum',
    icon: '/images/chains/arbitrum.svg',
    id: 42161,
    name: 'arbitrum',
    explorerUrl: 'https://arbiscan.io',
    nativeCurrency: {
      title: 'Ethereum',
      ticker: 'ETH',
      decimals: 18,
      icon: '/images/currencies/eth.svg',
    },
    wrappedCurrency: {
      title: 'GigaSwap Wrapped Ether',
      ticker: 'gWETH',
      decimals: 18,
      icon: '/images/currencies/gweth.svg',
    },
    isTradesEnabled: true,
    isFarmingEnabled: true,
  },

  {
    title: 'Polygon zkEVM',
    icon: '/images/chains/polygon.svg',
    id: 1101,
    name: 'polygon',
    explorerUrl: 'https://zkevm.polygonscan.com',
    nativeCurrency: {
      title: 'Ethereum',
      ticker: 'ETH',
      decimals: 18,
      icon: '/images/currencies/eth.svg',
    },
    wrappedCurrency: {
      title: 'GigaSwap Wrapped Ether',
      ticker: 'gWETH',
      decimals: 18,
      icon: '/images/currencies/gweth.svg',
    },
    isTradesEnabled: true,
    isFarmingEnabled: false,
  },

  {
    title: 'Sepolia',
    icon: '/images/chains/ethereum.svg',
    id: 11155111,
    name: 'sepolia',
    explorerUrl: 'https://sepolia.etherscan.io',
    nativeCurrency: {
      title: 'Sepolia Ethereum',
      ticker: 'ETH',
      decimals: 18,
      icon: '/images/currencies/eth.svg',
    },
    wrappedCurrency: {
      title: 'GigaSwap Wrapped Ether',
      ticker: 'gWETH',
      decimals: 18,
      icon: '/images/currencies/gweth.svg',
    },
    isDisabled: false,
    isTestnet: true,
    isTradesEnabled: true,
    hint: 'Testnet',
  },

  // {
  //   title: 'BNB Smart Chain',
  //   icon: '/images/chains/bnb.svg',
  //   id: 0,
  //   explorerUrl: 'https://bscscan.com',
  //   nativeCurrency: {
  //     title: 'Binance Coin',
  //     ticker: 'BNB',
  //     decimals: 18,
  //     icon: '/images/currencies/bnb.svg',
  //   },
  //   wrappedCurrency: {
  //     title: 'GigaSwap Wrapped BNB',
  //     ticker: 'gWBNB',
  //     decimals: 18,
  //     icon: '/images/currencies/gwbnb.svg',
  //   },
  //   isDisabled: true,
  // },

  // {
  //   title: 'Base',
  //   icon: '/images/chains/base.svg',
  //   id: 0,
  //   name: 'base',
  //   explorerUrl: 'https://basescan.org',
  //   nativeCurrency: {
  //     title: 'ETH',
  //     ticker: 'ETH',
  //     decimals: 18,
  //     icon: '/images/currencies/eth.svg',
  //   },
  //   isDisabled: true,
  //   hint: 'Very soon'
  // },

  // {
  //   title: 'Optimism',
  //   icon: '/images/chains/optimism.svg',
  //   id: 0,
  //   name: 'optimism',
  //   explorerUrl: 'https://optimistic.etherscan.io',
  //   nativeCurrency: {
  //     title: 'Ethereum',
  //     ticker: 'ETH',
  //     decimals: 18,
  //     icon: '/images/currencies/eth.svg',
  //   },
  //   wrappedCurrency: {
  //     title: 'GigaSwap Wrapped Ether',
  //     ticker: 'gWETH',
  //     decimals: 18,
  //     icon: '/images/currencies/gweth.svg',
  //   },
  //   isDisabled: true,
  // },
  //
  // {
  //   title: 'ICP',
  //   icon: '/images/chains/icp.svg',
  //   id: 0,
  //   name: 'icp',
  //   explorerUrl: 'https://icp.com',
  //   nativeCurrency: {
  //     title: 'ICP',
  //     ticker: 'ICP',
  //     decimals: 9,
  //     icon: '/images/currencies/icp.svg',
  //   },
  //   isDisabled: true,
  //   isTestnet: true,
  //   // hint: 'Coming in V3',
  // },
]