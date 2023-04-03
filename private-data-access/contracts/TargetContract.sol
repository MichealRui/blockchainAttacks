// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
contract TargetContract {

    bytes32 private a;
    bytes32 private b;

    constructor (bytes32 _a, bytes32 _b) {
        a = _a;
        b = _b;
    }
}