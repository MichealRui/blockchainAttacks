const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { parseEther } = require("ethers/lib/utils");
const { ethers } = require("hardhat");

describe("Attack", function () {
  it("Should empty the balance of the targetContract", async function () {
    // Deploy the targetContract
    const targetContractFactory = await ethers.getContractFactory("TargetContract");
    const targetContract = await targetContractFactory.deploy();
    await targetContract.deployed();

    //Deploy the AttackerContract
    const AttackerFactory = await ethers.getContractFactory("Attacker");
    const AttackerContract = await AttackerFactory.deploy(targetContract.address);
    await AttackerContract.deployed();

    // Get two addresses, treat one as innocent user and one as attacker
    const [_, innocentAddress, attackerAddress] = await ethers.getSigners();

    // Innocent User deposits 10 ETH into targetContract
    let tx = await targetContract.connect(innocentAddress).deposite({
      value: parseEther("20"),
    });
    await tx.wait();

    // Check that at this point the targetContract's balance is 10 ETH
    let balanceETH = await ethers.provider.getBalance(targetContract.address);
    expect(balanceETH).to.equal(parseEther("20"));

    // Attacker calls the `attack` function on AttackerContract
    // and sends 1 ETH
    tx = await AttackerContract.connect(attackerAddress).attack({
      value: parseEther("1"),
    });
    await tx.wait();

    // Balance of the targetContract's address is now zero
    balanceETH = await ethers.provider.getBalance(targetContract.address);
    expect(balanceETH).to.equal(BigNumber.from("0"));

    // Balance of AttackerContract is now 11 ETH (10 ETH stolen + 1 ETH from attacker)
    balanceETH = await ethers.provider.getBalance(AttackerContract.address);
    expect(balanceETH).to.equal(parseEther("21"));
  });
});