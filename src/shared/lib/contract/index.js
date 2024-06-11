import web3 from '@/app/providers/web3'
import { useUserStore } from '@/stores'

class Contract {
  constructor(contractAddress, contractAbi) {
    const contract = new web3.eth.Contract(contractAbi, contractAddress)
    contract.options.address = contractAddress

    this.contract = contract

    return this
  }

  async send(methodName, args = [], sendValue = null) {
    const userStore = useUserStore()

    let sendData = {
      from: userStore.address
    }

    if (sendValue) {
      sendData.value = sendValue
    }

    console.log('Contract send method', {
      methodName,
      args,
      sendData,
      contract: this.contract,
    })

    // try {
    //   await this.contract.methods[methodName](...args).call(sendData)
    // } catch (error) {
    //   throw new Error(error)
    //   console.error(error)
    // }

    return this.contract.methods[methodName](...args).send(sendData)
  }

  async call(methodName, args = []) {
    return this.contract.methods[methodName](...args).call()
  }

  async getPastEvents(eventName, args = {}) {
    const result = await this.contract.getPastEvents(eventName, args)

    return result
  }
}

export default Contract