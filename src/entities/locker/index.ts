import Contract from '@/shared/lib/contract'
import { CONTRACTS } from '@/shared/const/contracts'

export async function lockTokens(tokenAddress: string, amount: string, unlockDate: number) {
  const contract = new Contract(CONTRACTS.locker.address, CONTRACTS.locker.abi)

  return contract.send('lockTime', [tokenAddress, amount, unlockDate])
}

export async function unlockPosition(lockPositionId: string) {
  const contract = new Contract(CONTRACTS.locker.address, CONTRACTS.locker.abi)
  return contract.send('withdraw', [lockPositionId])
}

