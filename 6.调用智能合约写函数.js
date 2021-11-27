var Tx = require('ethereumjs-tx').Transaction
const Web3 = require('web3')
const web3 = new Web3('https://ropsten.infura.io/v3/c6a9afd1b613417e90ef9d8400cc072a')

const account1 = '0xb2ea04bE6fE903712B72a9F5A2AaE07984C8C226'
const account2 = '0x41D4c87c3C9E1D3776062447710e6d9B996CDD94'

const pk1 = 'dc08fc6e97e7df531f6ffafb1595a26c416218dcecdd94e8994eb2f8ae5bf574'
const pk2 = '2bfb20d6fc7438d91f3c60560febffbafc04e0273bc3cde8266751fb5059da0c'

const privateKey1 = Buffer.from(pk1, 'hex')
const privateKey2 = Buffer.from(pk2, 'hex')


const contractAddress = '0xf774422731f04cdcc803638250c694cd27154b08'
const contractABI = [
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "get",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "string",
                "name": "_value",
                "type": "string"
            }
        ],
        "name": "set",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

const contract = new web3.eth.Contract(contractABI, contractAddress)
const data = contract.methods.set('qikegu').encodeABI() //可以使用web3.js函数encodeABI()，把contract对象中的智能合约函数转换为十六进制表示

//调用已部署的智能合约方法  调用set 方法
function seContract() {
    web3.eth.getTransactionCount(account1, (err, txCount) => {
        // 创建交易对象
        const txObject = {
            nonce: web3.utils.toHex(txCount),
            gasLimit: web3.utils.toHex(800000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
            to: contractAddress,
            data: data
        }

        // 签署交易
        const tx = new Tx(txObject, { chain: 'ropsten', hardfork: 'petersburg' })
        tx.sign(privateKey1)

        const serializedTx = tx.serialize()
        const raw = '0x' + serializedTx.toString('hex')

        // 广播交易
        web3.eth.sendSignedTransaction(raw, (err, txHash) => {
            console.log('txHash:', txHash)
            // 可以去ropsten.etherscan.io查看交易详情
        })
    })
}


//调用已部署的智能合约方法  调用get 方法
async function getcontract() {
    const result = await contract.methods.get().call()
    console.log(result);
}

getcontract();







