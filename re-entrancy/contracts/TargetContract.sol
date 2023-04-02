// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
contract TargetContract {
    //maintain the balances of each address
    mapping (address => uint256) balances;

    function deposite() public payable {
        balances[msg.sender] += msg.value;
    }

    // the error is updating the balance state after msg.sender.call
    function withdraw() public {
        require(balances[msg.sender] > 0);
        (bool sent, ) = msg.sender.call{value: balances[msg.sender]}("");
        require(sent, "fail to withdraw");
        balances[msg.sender] = 0;
    }
}