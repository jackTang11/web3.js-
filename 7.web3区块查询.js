const Web3 = require('web3')
const web3 = new Web3('https://mainnet.infura.io/v3/c6a9afd1b613417e90ef9d8400cc072a') // YOUR_INFURA_API_KEY替换为你自己的key

//最新区块
web3.eth.getBlock('latest').then((e) => {
    console.log(e);
})

// 查询指定哈希值的区块
web3.eth.getBlock('0x7f56777d61beb16470df4a22446a439a9e75b01dda07e755bbcf77a7344c71a2').then((e) => {
    console.log('查询指定哈希值的区块', e);
})

// 查询指定序号区块
web3.eth.getBlock(0).then((e) => {
    console.log('查询指定序号区块', e);
})

// 根据最近几个区块，计算平均Gas价格
web3.eth.getGasPrice().then((result) => {
    console.log("wei: " + result)
    console.log("ether: " + web3.utils.fromWei(result, 'ether'))
})

// sha256哈希函数
console.log(web3.utils.sha3('qikegu.com'))

// keccak256哈希函数
console.log(web3.utils.keccak256('qikegu.com'))

// 生成十六进制随机数
console.log(web3.utils.randomHex(32))