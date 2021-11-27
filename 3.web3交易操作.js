var Tx = require('ethereumjs-tx').Transaction

const Web3 = require('web3')
const web3 = new Web3('https://ropsten.infura.io/v3/c6a9afd1b613417e90ef9d8400cc072a')


const account1 = '0xb2ea04bE6fE903712B72a9F5A2AaE07984C8C226'
const account2 = '0x41D4c87c3C9E1D3776062447710e6d9B996CDD94'

const pk1 = 'dc08fc6e97e7df531f6ffafb1595a26c416218dcecdd94e8994eb2f8ae5bf574'
const pk2 = '2bfb20d6fc7438d91f3c60560febffbafc04e0273bc3cde8266751fb5059da0c'

const privateKey1 = Buffer.from(pk1, 'hex')
const privateKey2 = Buffer.from(pk2, 'hex')

console.log(pk1.substring(2, pk1.length));

//或者nonce,也就是交易次数
web3.eth.getTransactionCount(account1, (err, txCount) => {
    console.log(txCount);
    //构建交易对象
    const txObject = {
        //这是账号的前一个交易计数。这个值必须是十六进制，可以使用Web3.js的web3.utils.toHex()转换
        nonce: web3.utils.toHex(txCount),
        //目标账户。
        to: account2,
        //要发送的以太币金额。这个值必须以十六进制表示，单位必须是wei。我们可以使用Web3.js工具web3.utils.toWei()转换单位。
        value: web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
        //交易能消耗Gas的上限。像这样的基本交易总是要花费21000单位的Gas
        gasLimit: web3.utils.toHex(21000),
        // Gas价格，这里是 10 Gwei。
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
    }

    // 签署交易
    const tx = new Tx(txObject, { chain: 'ropsten', hardfork: 'petersburg' })
    console.log(privateKey1);
    tx.sign(privateKey1)

    const serializedTx = tx.serialize()
    const raw = '0x' + serializedTx.toString('hex')

    // 广播交易
    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        console.log('txHash:', txHash)
        // 可以去ropsten.etherscan.io查看交易详情
    })
})






