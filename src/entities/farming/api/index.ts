import Contract from '@/shared/lib/contract'
import { CONTRACTS } from '@/shared/const/contracts'
import type { IToken } from '@/shared/types/swapper'

export async function getNextIntervalDate() {
  const contract = new Contract(CONTRACTS.farming.address, CONTRACTS.farming.abi)
  const timestamp = await contract.call('nextIntervalTime')

  return timestamp * 1000
}

export async function getLockedTokensAmount(address: string) {
  const contract = new Contract(CONTRACTS.farming.address, CONTRACTS.farming.abi)
  const lockedData = await contract.call('getStack', [address])

  return lockedData.count
}

export async function getTotalLockedTokensAmount() {
  const contract = new Contract(CONTRACTS.farming.address, CONTRACTS.farming.abi)
  return contract.call('totalStacks')
}

export async function getErc20ClaimAmount(tokenAddress: string, address: string) {
  const contract = new Contract(CONTRACTS.farming.address, CONTRACTS.farming.abi)
  return contract.call('erc20ClaimCountForAccount', [address, tokenAddress])
}

export async function getEthInFarming() {
  const contract = new Contract(CONTRACTS.farming.address, CONTRACTS.farming.abi)
  return contract.call('ethTotalForRewards')
}

export async function getClaimAmounts(assets: IToken[], address: string) {
  const contract = new Contract(CONTRACTS.farming.address, CONTRACTS.farming.abi)

  const balances = []
  const promises = []

  for (let asset of assets) {
    if (asset.type === 'currency') {
      promises.push(contract.call('ethClaimCountForAccount', [address]))
      continue
    }

    promises.push(getErc20ClaimAmount(asset.address, address))
  }

  const amounts = await Promise.all(promises)

  amounts.forEach((amount, index) => {
    const asset = assets[index]
    balances.push({ ...asset, amount })
  })

  return balances
}

export async function getTokensBalances(assets: IToken[]) {
  const contract = new Contract(CONTRACTS.farming.address, CONTRACTS.farming.abi)

  const balances = []
  const promises = []

  for (let asset of assets) {
    promises.push(contract.call('erc20TotalForRewards', [asset.address]))
  }

  const amounts = await Promise.all(promises)

  amounts.forEach((amount, index) => {
    const asset = assets[index]
    balances.push({ ...asset, amount })
  })

  return balances
}

export async function lockTokens(amount: string) {
  const contract = new Contract(CONTRACTS.farming.address, CONTRACTS.farming.abi)
  return contract.send('addStack', [amount])
}

export async function unlockTokens(amount: string) {
  const contract = new Contract(CONTRACTS.farming.address, CONTRACTS.farming.abi)
  return contract.send('removeStack', [amount])
}

export async function claimRewards(tokenAddresses: string[], withEth: boolean = false) {
  const contract = new Contract(CONTRACTS.farming.address, CONTRACTS.farming.abi)
  await contract.send('batchClaim', [withEth, tokenAddresses])
}