import type { IAsset } from '@/shared/types/swapper'

export interface ILockerValue {
  assets: IAsset[]
  unlockDate: Date | null
}