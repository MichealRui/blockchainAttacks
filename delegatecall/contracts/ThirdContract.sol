// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

//this is a helper for TargeContract to invoke
contract ThirdContract {
    uint public num;
    
    function setNum(uint _num) public {
        num = _num;
    }
}