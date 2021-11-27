const rpcURL = "https://ropsten.infura.io/b654bcdd57234f919d7911fb8a5794bf"
var Tx = require('ethereumjs-tx').Transaction
const Web3 = require('web3')
const web3 = new Web3(rpcURL)

const account1 = '0xf4Ab5314ee8d7AA0eB00b366c52cEEccC62d6B4B' // Your account address 1
const account2 = '0xff96B8B43ECd6C49805747F94747bFfa3A960b69' // Your account address 2

const pk1 = 'b75e2bcaec74857cf9bb6636d66a04784d4c0fcfd908f4a2bc213428eba5af0d' // 实际项目中应该从process.env.PRIVATE_KEY_1中读取
const pk2 = 'ac0adfdbaeb0770a479e79aac78779d82fdc2f9262e0c8f751ae70fb63ef6196' // 实际项目中应该从process.env.PRIVATE_KEY_2中读取

const privateKey1 = Buffer.from(pk1, 'hex')
const privateKey2 = Buffer.from(pk2, 'hex')

web3.eth.getTransactionCount(account2, (err, txCount) => {
    console.log(txCount);
    // 创建交易对象
    const txObject = {
        nonce: web3.utils.toHex(txCount),
        to: account1,
        value: web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
        gasLimit: web3.utils.toHex(21000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
    }

    // 签署交易
    const tx = new Tx(txObject, { chain: 'ropsten', hardfork: 'petersburg' })
    tx.sign(privateKey2)

    const serializedTx = tx.serialize()
    const raw = '0x' + serializedTx.toString('hex')

    // 广播交易
    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        console.log('txHash:', txHash)
        // 可以去ropsten.etherscan.io查看交易详情
    })
})
