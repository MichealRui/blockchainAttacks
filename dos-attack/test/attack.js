const {expect} = require("chai");
const {ethers} = require("hardhat");

describe("DOS attack", function() {
    it("after being attacked, the TargetContract will deny anyone to bid", async function() {
        //create instance of TargetContract
        const targetContractFactory = await ethers.getContractFactory("TargetContract");
        const targetContract = await targetContractFactory.deploy();
        await targetContract.deployed();

        //create instance of Attack
        const attackContractFactory = await ethers.getContractFactory("Attack");
        const attackContract = await attackContractFactory.deploy(targetContract.address);
        await attackContract.deployed();


        //get 2 addresses 
        const [_, caller1, caller2] = await ethers.getSigners();
        
        let tx1 = await targetContract.connect(caller1).bidding({
            value: ethers.utils.parseEther("1"),
        });
        await tx1.wait();
        let  balance = await ethers.provider.getBalance(targetContract.address);



        let tx2 = await attackContract.attack({
            value:ethers.utils.parseEther("5"),
        });

        new Promise ( async () => 
            await tx2.wait()
        ).catch(e => console.log(e));


        let tx3 = await targetContract.connect(caller2).bidding({
            value: ethers.utils.parseEther("10"),
        });
        await tx3.wait();

        expect(await targetContract.winner()).to.equal(attackContract.address);
    })
})