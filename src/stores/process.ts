import { defineStore } from 'pinia'

const useUserStore = defineStore('process', () => {
  return {
    title: '',
    steps: [],
    provider: null,
  }
})

export default useUserStore