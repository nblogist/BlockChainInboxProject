pragma solidity ^0.4.17;

contract Inbox
{
    string public message;
    
    constructor (string FirstMessage) public 
    {
        message = FirstMessage;
    }
    
    function setMessage(string newMessage) public
    {
        message = newMessage;
    }
}