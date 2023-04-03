const {ethers} = require("hardhat");
const {expect} = require("chai");

describe("atack", function() {
    it("private variables can be read", async function () {
        const targetContractFactory = await ethers.getContractFactory("TargetContract");
        
        const a = ethers.utils.formatBytes32String("a");
        const b = ethers.utils.formatBytes32String("b");

        const targetContract = await targetContractFactory.deploy(a, b);
        await targetContract.deployed();
        
        const getA = await ethers.provider.getStorageAt(targetContract.address, 0);
        const getB = await ethers.provider.getStorageAt(targetContract.address, 1);

        expect(ethers.utils.parseBytes32String(getA)).to.equal("a");
        expect(ethers.utils.parseBytes32String(getB)).to.equal("b");

    })
})