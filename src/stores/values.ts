import { defineStore } from 'pinia'

const useValuesStore = defineStore('values', () => {
  return {
    values: {},

    setValue(id: string, value: any) {
      this.values[id] = value
    },

    removeValue(id: string) {
      delete this.values[id]
    }
  }
})

export default useValuesStore