const Web3 = require('web3')
const rpcURL = "https://kovan.infura.io/v3/c6a9afd1b613417e90ef9d8400cc072a"

const web3 = new Web3(rpcURL)
const address = "0x03118E2c88676d31ee397E1eEf7789fECfbC40b9"

web3.eth.getBalance(address, (err, wei) => {
    // 余额单位从wei转换为ether
    console.log("wei: " + wei)
    balance = web3.utils.fromWei(wei, 'ether')
    console.log("balance: " + balance)
})