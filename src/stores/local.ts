import { defineStore } from 'pinia'

const useLocalStore = defineStore('local', () => {
  return {
    transactions: localStorage.getItem('transactions')
      ? JSON.parse(localStorage.getItem('transactions') || '[]')
      : [],

    addTransaction({ title, description, url }) {
      this.transactions.unshift({
        title: title,
        description: description,
        link: url,
      })

      if (this.transactions.length > 4) {
        this.transactions = this.transactions.slice(0, this.transactions.length - 1)
      }

      localStorage.setItem('transactions', JSON.stringify(this.transactions))
    }
  }
})

export default useLocalStore