import { toNano, Address } from '@ton/core';
import { BankOfTon, BankOfTonConfig } from '../wrappers/BankOfTon';
import { compile, NetworkProvider } from '@ton/blueprint';

const config: BankOfTonConfig = {
    adminAddress: Address.parse("0QDA05Tm0K37K9KO5VFp3V7ZmVDIYBCi2_4A9OWr5SGtZT0o"),
    initialTotalSupply: 0n,
    initialRoiMultiplier: 10000, // 100% in basis points
    initialNextHalvingTime: Math.floor(Date.now() / 1000) + 7889238, // 3 months from now
    initialHalvingCount: 0
};

export async function run(provider: NetworkProvider) {
    const bankOfTon = provider.open(BankOfTon.createFromConfig(config, await compile('BankOfTon')));

    await bankOfTon.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(bankOfTon.address);

    // Verify deployment
    console.log('Contract deployed at:', bankOfTon.address.toString());

    // Verify admin address
    const adminAddress = await bankOfTon.getAdminAddress();
    console.log('Admin address:', adminAddress.toString());
    console.assert(adminAddress.equals(config.adminAddress), 'Admin address mismatch');

    // Verify initial ROI multiplier
    const roiMultiplier = await bankOfTon.getRoiMultiplier();
    console.log('Initial ROI multiplier:', roiMultiplier);
    console.assert(roiMultiplier === config.initialRoiMultiplier, 'ROI multiplier mismatch');

    // Verify next halving time
    const { nextHalvingTime } = await bankOfTon.getNextRoiHalvingInfo();
    console.log('Next halving time:', new Date(nextHalvingTime * 1000).toISOString());
    console.assert(nextHalvingTime === config.initialNextHalvingTime, 'Next halving time mismatch');

    console.log('Deployment and initial setup completed successfully');
}