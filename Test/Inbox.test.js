const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);

//Requiring Interface and Bytecode from compile.js

const {interface, bytecode} = require('../compile.js');

let inbox;
let accounts;
const INITIAL_MESSAGE ='Hi! it\'s Furqan';

beforeEach ('Getting a List of all ACC.', async() => {

     accounts = await web3.eth.getAccounts();

     inbox= await new web3.eth.Contract(JSON.parse(interface))
     .deploy({data : bytecode, arguments : [INITIAL_MESSAGE]})
     .send ({from : accounts[0], gas: '1000000'})
});


describe('Inbox testing', () => {

    it('Deploys a contract', () => {
        assert.ok(inbox.options.address)//Checks if address field is null
        console.log(inbox.options.address)
    });

    it('Gets a Default Message', async () => {
        const message = await inbox.methods.message().call();
        //assert.ok(message);// To check that it shouldnt be blank
        assert.equal(message, INITIAL_MESSAGE);
    });

    it('Changes the message', async () => {
        //OPTIONAL HASH SAVING
        const hash = await inbox.methods.setMessage('new message').send ({from : accounts[0]});
        
        const message = await inbox.methods.message().call();
        assert.equal(message,'new message' );
        //Printing hash which is returned on every successful transaction
        console.log(hash);
    })


});







/*

let accounts;
beforeEach ('Getting a List of all ACC.', async() => {
    //
    web3.eth.getAccounts() //BECAUSE IT IS ASYNC THAT'S WHY .THEN
        .then(fetchedAccounts => {
            console.log(fetchedAccounts);
        })
    //
//CLEANING UP CODE
 //AFTERT PUTTING ASYNC IN THE BEFOREEACH AURGUMENT LIST
 
 accounts = await web3.eth.getAccounts();

})


describe('testing', () => {

    it('Deploys a contract', () => {
        console.log(accounts);
    });
});






class Human 
{
    breath ()
    {
        return 'Breaths';
    }

    choke ()
    {
        return 'chokes\nDead';
    }
}

let Furqan;

beforeEach (() => {
    Furqan = new Human();
})

describe ('Checking Human', () => {
    it ('Is Breathing?', () => {
        assert.equal(Furqan.breath(),'Breaths');
    });

    it ('Is Dead?', () =>{
        assert.equal(Furqan.choke(), 'chokes\nDead')
    });
});

*/