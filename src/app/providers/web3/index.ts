import Web3 from 'web3'

const web3 = new Web3()

web3.eth.transactionBlockTimeout = 250
web3.eth.transactionPollingTimeout = 2000

export default web3