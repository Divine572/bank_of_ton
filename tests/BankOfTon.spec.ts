import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { BankOfTon } from '../wrappers/BankOfTon';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';



describe('BankOfTon', () => {
    let code: Cell; // Holds the compiled contract code
    let bankOfTon: SandboxContract<BankOfTon>; // BankOfTon contract instance
    let deployer: SandboxContract<TreasuryContract>; // Thedeployer wallet contract
    let blockchain: Blockchain; // Reference to the blockchain instance


    beforeAll(async () => {
        // Compile the smart contract code before tests run
        code = await compile("BankOfTon");
    });

    beforeEach(async () => {
        // Create a new blockchain instance for each test
        blockchain = await Blockchain.create();

        // Open a new contract instance for testing
        bankOfTon = blockchain.openContract(BankOfTon.createFromConfig({}, code));

        // Create a treasury wallet for the deployer
        deployer = await blockchain.treasury("deployer");

        // Deploy the BankOfTon contract on the blockchain
        const deployResult = await bankOfTon.sendDeploy(deployer.getSender(), toNano("0.05"))


        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: bankOfTon.address,
            deploy: true,
            success: true,
        });
    });



});
