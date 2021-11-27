const Web3 = require('web3')
const rpcURL = "https://eth.bitkeep.top/eth"
const web3 = new Web3(rpcURL)
for (var i = 0; i < 10; i++) {
    var account = web3.eth.accounts.create();
    console.log(account.address, account.privateKey);
}