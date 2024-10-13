import { Address, beginCell, Dictionary, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode, toNano } from '@ton/core';




export type BankOfTonConfig = {
    adminAddress: Address;
    initialTotalSupply: bigint;
    initialRoiMultiplier: number;
    initialNextHalvingTime: number;
    initialHalvingCount: number;
};


export type LogEntry = {
    timestamp: number;
    eventType: number;
    userAddress: Address;
    amount: bigint;
};




export function bankOfTonConfigToCell(config: BankOfTonConfig): Cell {
    return beginCell()
        .storeUint(config.initialTotalSupply, 64)
        .storeDict() // Empty users dict
        .storeDict() // Empty config dict
        .storeAddress(config.adminAddress)
        .storeUint(config.initialRoiMultiplier, 16)
        .storeCoins(0) // Initial daily withdrawn
        .storeUint(0, 32) // Initial last withdrawal reset
        .storeUint(config.initialNextHalvingTime, 32)
        .storeUint(config.initialHalvingCount, 8)
        .storeCoins(0) // Initial sustainability pool
        .storeRef(beginCell().endCell()) // Empty initial code cell
        .storeDict() // Empty logs dict
        .storeUint(0, 32) // Initial log count
        .endCell();
}




export class BankOfTon implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new BankOfTon(address);
    }

    static createFromConfig(config: BankOfTonConfig, code: Cell, workchain = 0) {
        const data = bankOfTonConfigToCell(config);
        const init = { code, data };
        return new BankOfTon(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }

    async sendRegisterUser(provider: ContractProvider, via: Sender, uplineAddress: Address) {
        await provider.internal(via, {
            value: toNano('0.1'),
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(1, 32) // op code for register_user
                .storeUint(0, 64) // query id
                .storeAddress(uplineAddress)
            .endCell(),
        });
    }

    async sendInvest(provider: ContractProvider, via: Sender, planId: number, amount: bigint) {
        await provider.internal(via, {
            value: amount,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(2, 32) // op code for invest
                .storeUint(0, 64) // query id
                .storeUint(planId, 2)
            .endCell(),
        });
    }

    async sendWithdraw(provider: ContractProvider, via: Sender, amount: bigint) {
        await provider.internal(via, {
            value: toNano('0.1'),
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(3, 32) // op code for withdraw
                .storeUint(0, 64) // query id
                .storeCoins(amount)
            .endCell(),
        });
    }

    async sendDistributeRoi(provider: ContractProvider, via: Sender) {
        await provider.internal(via, {
            value: toNano('0.1'),
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(4, 32) // op code for distribute_roi
                .storeUint(0, 64) // query id
            .endCell(),
        });
    }

    async sendReinvest(provider: ContractProvider, via: Sender) {
        await provider.internal(via, {
            value: toNano('0.1'),
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(5, 32) // op code for reinvest
                .storeUint(0, 64) // query id
            .endCell(),
        });
    }

    // Admin functions
    async sendUpdateAdmin(provider: ContractProvider, via: Sender, newAdminAddress: Address) {
        await provider.internal(via, {
            value: toNano('0.1'),
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(6, 32) // op code for update_admin
                .storeUint(0, 64) // query id
                .storeAddress(newAdminAddress)
            .endCell(),
        });
    }

    async sendDistributeRoiAll(provider: ContractProvider, via: Sender) {
        await provider.internal(via, {
            value: toNano('0.1'),
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(7, 32) // op code for distribute_roi_all
                .storeUint(0, 64) // query id
            .endCell(),
        });
    }

    async sendHalveRoi(provider: ContractProvider, via: Sender) {
        await provider.internal(via, {
            value: toNano('0.1'),
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(8, 32) // op code for halve_roi
                .storeUint(0, 64) // query id
            .endCell(),
        });
    }

    async sendUpgradeContract(provider: ContractProvider, via: Sender, newCode: Cell) {
        await provider.internal(via, {
            value: toNano('0.1'),
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(9, 32) // op code for upgrade_contract
                .storeUint(0, 64) // query id
                .storeRef(newCode)
            .endCell(),
        });
    }

    // Getter methods
    async getAdminAddress(provider: ContractProvider) {
        const result = await provider.get('get_admin_address', []);
        return result.stack.readAddress();
    }

    async getUserData(provider: ContractProvider, userAddress: Address) {
        const result = await provider.get('get_user_data', [
            { type: 'slice', cell: beginCell().storeAddress(userAddress).endCell() }
        ]);
        return {
            found: result.stack.readBoolean(),
            storedAddress: result.stack.readAddress(),
            upline: result.stack.readAddress(),
            investmentPlan: result.stack.readNumber(),
            totalInvested: result.stack.readBigNumber(),
            totalWithdrawn: result.stack.readBigNumber(),
            lastInvestmentTime: result.stack.readNumber(),
            referralEarnings: result.stack.readBigNumber(),
            totalEarnings: result.stack.readBigNumber()
        };
    }

    async getEffectivePlanDetails(provider: ContractProvider, planId: number) {
        const result = await provider.get('get_effective_plan_details', [
            { type: 'int', value: BigInt(planId) }
        ]);
        return {
            effectiveDailyRoi: result.stack.readNumber(),
            minInvestment: result.stack.readBigNumber(),
            duration: result.stack.readNumber(),
            withdrawalFee: result.stack.readNumber()
        };
    }

    async getCurrentRoi(provider: ContractProvider, userAddress: Address) {
        const result = await provider.get('get_current_roi', [
            { type: 'slice', cell: beginCell().storeAddress(userAddress).endCell() }
        ]);
        return result.stack.readBigNumber();
    }

    async getRoiMultiplier(provider: ContractProvider) {
        const result = await provider.get('get_roi_multiplier', []);
        return result.stack.readNumber();
    }

    async getDailyWithdrawalStatus(provider: ContractProvider) {
        const result = await provider.get('get_daily_withdrawal_status', []);
        return {
            dailyWithdrawn: result.stack.readBigNumber(),
            remainingLimit: result.stack.readBigNumber()
        };
    }

    async getReinvestmentStatus(provider: ContractProvider, userAddress: Address) {
        const result = await provider.get('get_reinvestment_status', [
            { type: 'slice', cell: beginCell().storeAddress(userAddress).endCell() }
        ]);
        return {
            reinvestmentRequired: result.stack.readBoolean(),
            earningsPercentage: result.stack.readNumber()
        };
    }

    async getNextRoiHalvingInfo(provider: ContractProvider) {
        const result = await provider.get('get_next_roi_halving_info', []);
        return {
            nextHalvingTime: result.stack.readNumber(),
            currentRoiMultiplier: result.stack.readNumber()
        };
    }

    async getSustainabilityPoolBalance(provider: ContractProvider) {
        const result = await provider.get('get_sustainability_pool_balance', []);
        return result.stack.readBigNumber();
    }

    async getContractBalance(provider: ContractProvider) {
        const result = await provider.get('get_contract_balance', []);
        return result.stack.readBigNumber();
    }


    private parseLogs(logsCell: Cell): LogEntry[] {
        const logs: LogEntry[] = [];
        const dict = Dictionary.loadDirect(Dictionary.Keys.Uint(32), Dictionary.Values.Cell(), logsCell);
        
        for (const [key, value] of dict) {
            const slice = value.beginParse();
            const eventType = slice.loadUint(8);
            const userAddress = slice.loadAddress();
            const amount = slice.loadCoins();
            
            logs.push({
                timestamp: key,
                eventType,
                userAddress,
                amount
            });
        }

        // Sort logs by timestamp (newest first)
        logs.sort((a, b) => b.timestamp - a.timestamp);

        return logs;
    }

    async getLogs(provider: ContractProvider): Promise<{ logs: LogEntry[], logCount: number }> {
        const result = await provider.get('get_logs', []);
        const logsCell = result.stack.readCell();
        const logCount = result.stack.readNumber();
        const parsedLogs = this.parseLogs(logsCell);
        return { logs: parsedLogs, logCount };
    }

    // Helper method to get event type name
    getEventTypeName(eventType: number): string {
        switch (eventType) {
            case 1: return 'Invest';
            case 2: return 'Withdraw';
            case 3: return 'Reinvest';
            default: return 'Unknown';
        }
    }
}