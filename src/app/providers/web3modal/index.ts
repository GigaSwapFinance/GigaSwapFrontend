import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi1/vue'
import { mainnet, goerli, sepolia } from '@wagmi/core/chains'

const projectId = import.meta.env.VITE_WEB3_MODAL_PROJECT_ID

const chains = [mainnet, goerli, sepolia]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, appName: 'GigaSwap' })

export default createWeb3Modal({ wagmiConfig, projectId, chains })