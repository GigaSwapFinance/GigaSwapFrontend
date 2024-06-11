import { defineStore } from 'pinia'

const useTradeStore = defineStore('trade', () => {
  return {
    isWhitelistEnabled: false,
    whitelist: [],
    whitelistedAddress: null,

    isBuyLimitEnabled: false,
    buyLimit: null,

    isVestingEnabled: false,
    vestingReleasedOnBuy: null,
    vestingPeriodLengthInHours: null,
    vestingReleasedOnPeriod: null,

    tradeType: 'fractional',

    resetSettings() {
      this.isWhitelistEnabled = false
      this.whitelist = []
      this.whitelistedAddress = null

      this.isBuyLimitEnabled = false
      this.buyLimit = null

      this.isVestingEnabled = false
      this.vestingReleasedOnBuy = null
      this.vestingPeriodLengthInHours = null
      this.vestingReleasedOnPeriod = null

      this.tradeType = 'fractional'
    }
  }
})

export default useTradeStore