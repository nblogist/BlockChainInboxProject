const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile.js');

const provider = new HDWalletProvider(
    'issue planet wonder jealous emerge fabric purse rely tonight unhappy fold elevator',
    'https://rinkeby.infura.io/v3/18c25be0ecce41fd81fcb320101aaca9'
);

const web3 = new Web3(provider);
// THIS INSTANCE IF WEB3 IS SET FOR RINKEBY AND CAN BE USED TO DO ANYTHING ON THE RINKEBY NETWORK

const deploy = async () => {

    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account ', accounts[0]);
    const data = await new web3.eth.Contract(JSON.parse(interface))
        .deploy ({data :'0x' + bytecode , arguments : ['New Contract']}) //ADDED '0x' AS there's a bug in hd wallet v0.0.5
        .send ({gas : 1000000 , from : accounts[0]});

    console.log('Contract Deployed to ',data.options.address);
};

deploy();