import web3modal from '@/app/providers/web3modal'
import web3 from '@/app/providers/web3'
import { getAccount, watchAccount, disconnect as wagmiDisconnect, watchNetwork } from '@wagmi/core'
import { useAppStore, useUserStore } from '@/stores'

export async function checkForConnection() {
  const account = await getAccount()
  const { isConnected, isReconnecting } = account

  if (isReconnecting) {
    watchForConnection(onConnected)
  } else if (isConnected) {
    onConnected(account)
  }
}

export async function connect() {
  await web3modal.open()
  await checkForConnection()
  watchForConnection(onConnected)
}

export async function disconnect() {
  await wagmiDisconnect()
  onDisconnected()
}

async function onConnected({ address, connector }) {
  const userStore = useUserStore()
  const provider = await connector.getProvider()

  userStore.address = address // '0x0b4ea183ec5dc35b0494928f8a716b2ebfe5bd6b' - for farming
  userStore.connector = connector
  userStore.provider = provider

  web3.setProvider(provider)

  const chainId = await connector.getChainId()

  if (chainId) {
    await changeChain(chainId)
  }

  // Handling chain switching
  const unwatchNetwork = watchNetwork(async ({ chain }) => {
    if (chain) {
      await changeChain(chain.id)
    }
  })

  // Handling disconnecting
  const unwatchAccount = watchAccount((account) => {
    const isDisconnected = account.isDisconnected

    if (isDisconnected) {
      onDisconnected()
      unwatchAccount()
      unwatchNetwork()
    } else {
      onConnected(account)
    }
  })
}

function onDisconnected() {
  const userStore = useUserStore()
  const appStore = useAppStore()

  userStore.address = ''
  userStore.provider = null
  userStore.connector = {}
  appStore.resetSettings()
}

async function changeChain(chainId: number) {
  const appStore = useAppStore()
  appStore.setChain(chainId)

  // change provider
  const account = await getAccount()

  if (account) {
    const provider = await account.connector?.getProvider()
    web3.setProvider(provider)
  }
}

function watchForConnection(callback: Function) {
  const unwatchAccount = watchAccount(async (account) => {
    const { isConnected } = account

    if (isConnected) {
      callback(account)
      unwatchAccount()
    }
  })
}

export function openAccount() {
  web3modal.open({ view: 'Account' })
}