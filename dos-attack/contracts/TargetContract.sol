// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract TargetContract {

    address public winner;
    uint public currentPrice;

    function bidding() public payable {
        require(msg.value > currentPrice
        , 'your price is lower than the currentPrice');
        (bool sent, ) = winner.call{value:currentPrice}("");
        currentPrice = msg.value;
        winner = msg.sender;
        if(sent) {
            currentPrice = msg.value;
            winner = msg.sender;
        }
    }
}