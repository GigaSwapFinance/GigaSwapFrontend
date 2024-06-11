import { defineStore } from 'pinia'

const useUserStore = defineStore('user', () => {
  return {
    address: '',
    connector: {},
    provider: null,
  }
})

export default useUserStore