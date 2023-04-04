// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract TargetContract {

    address public thirdContract;
    address public owner;

    constructor(address _thirdContract) {
        thirdContract = _thirdContract;
        owner = msg.sender;    
    }

    function invokeThirdContract(uint _num) public {
        thirdContract.delegatecall(abi.encodeWithSignature("setNum(uint256)", _num));
    }
}