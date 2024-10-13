# BankOfTon Smart Contract Documentation

## Contract Details (Testnet)
- Testnet Address: `EQCMNmYtHrCBHNDIWF066SftMwavL6dHagTTyEipytmt7T6Q`
- Admin Address: `EQDA05Tm0K37K9KO5VFp3V7ZmVDIYBCi2_4A9OWr5SGtZdtn`
- Initial ROI Multiplier: 10000 (100%)
- Next Halving Time: 2025-01-13T03:46:35.000Z

## Setup for Frontend

First, install necessary dependencies:

```bash
npm install ton-connect @ton/core @ton/crypto
```

Set up TonConnect in your frontend:

```typescript
import TonConnect from '@tonconnect/sdk';

const tonConnect = new TonConnect({
  manifestUrl: 'https://your-app.com/tonconnect-manifest.json'
});

// Connect wallet
const connectWallet = async () => {
  await tonConnect.connect();
};

// Get provider and wallet
const getProvider = () => tonConnect.provider;
const getWallet = () => tonConnect.wallet;
```

## Contract Functions

### 1. Register User

Registers a new user with an upline.

```typescript
async function registerUser(uplineAddress: string) {
  const provider = getProvider();
  const wallet = getWallet();
  if (!provider || !wallet) return;

  const bankOfTon = BankOfTon.createFromAddress(Address.parse("EQCMNmYtHrCBHNDIWF066SftMwavL6dHagTTyEipytmt7T6Q"));
  await bankOfTon.sendRegisterUser(provider, wallet.account.address, Address.parse(uplineAddress));
}
```

### 2. Invest

Invests in a specific plan.

```typescript
async function invest(planId: number, amount: bigint) {
  const provider = getProvider();
  const wallet = getWallet();
  if (!provider || !wallet) return;

  const bankOfTon = BankOfTon.createFromAddress(Address.parse("EQCMNmYtHrCBHNDIWF066SftMwavL6dHagTTyEipytmt7T6Q"));
  await bankOfTon.sendInvest(provider, wallet.account.address, planId, amount);
}
```

### 3. Withdraw

Withdraws funds from the contract.

```typescript
async function withdraw(amount: bigint) {
  const provider = getProvider();
  const wallet = getWallet();
  if (!provider || !wallet) return;

  const bankOfTon = BankOfTon.createFromAddress(Address.parse("EQCMNmYtHrCBHNDIWF066SftMwavL6dHagTTyEipytmt7T6Q"));
  await bankOfTon.sendWithdraw(provider, wallet.account.address, amount);
}
```

### 4. Distribute ROI

Distributes ROI for the caller.

```typescript
async function distributeRoi() {
  const provider = getProvider();
  const wallet = getWallet();
  if (!provider || !wallet) return;

  const bankOfTon = BankOfTon.createFromAddress(Address.parse("EQCMNmYtHrCBHNDIWF066SftMwavL6dHagTTyEipytmt7T6Q"));
  await bankOfTon.sendDistributeRoi(provider, wallet.account.address);
}
```

### 5. Reinvest

Reinvests earnings.

```typescript
async function reinvest() {
  const provider = getProvider();
  const wallet = getWallet();
  if (!provider || !wallet) return;

  const bankOfTon = BankOfTon.createFromAddress(Address.parse("EQCMNmYtHrCBHNDIWF066SftMwavL6dHagTTyEipytmt7T6Q"));
  await bankOfTon.sendReinvest(provider, wallet.account.address);
}
```

## Admin Functions

### 1. Update Admin

Updates the admin address (only callable by current admin).

```typescript
async function updateAdmin(newAdminAddress: string) {
  const provider = getProvider();
  const wallet = getWallet();
  if (!provider || !wallet) return;

  const bankOfTon = BankOfTon.createFromAddress(Address.parse("EQCMNmYtHrCBHNDIWF066SftMwavL6dHagTTyEipytmt7T6Q"));
  await bankOfTon.sendUpdateAdmin(provider, wallet.account.address, Address.parse(newAdminAddress));
}
```

### 2. Distribute ROI for All Users

Distributes ROI for all users (only callable by admin).

```typescript
async function distributeRoiAll() {
  const provider = getProvider();
  const wallet = getWallet();
  if (!provider || !wallet) return;

  const bankOfTon = BankOfTon.createFromAddress(Address.parse("EQCMNmYtHrCBHNDIWF066SftMwavL6dHagTTyEipytmt7T6Q"));
  await bankOfTon.sendDistributeRoiAll(provider, wallet.account.address);
}
```

### 3. Halve ROI

Halves the ROI for all plans (only callable by admin).

```typescript
async function halveRoi() {
  const provider = getProvider();
  const wallet = getWallet();
  if (!provider || !wallet) return;

  const bankOfTon = BankOfTon.createFromAddress(Address.parse("EQCMNmYtHrCBHNDIWF066SftMwavL6dHagTTyEipytmt7T6Q"));
  await bankOfTon.sendHalveRoi(provider, wallet.account.address);
}
```

## Getter Functions

### 1. Get User Data

Retrieves user data.

```typescript
async function getUserData(userAddress: string) {
  const provider = getProvider();
  if (!provider) return;

  const bankOfTon = BankOfTon.createFromAddress(Address.parse("EQCMNmYtHrCBHNDIWF066SftMwavL6dHagTTyEipytmt7T6Q"));
  const userData = await bankOfTon.getUserData(provider, Address.parse(userAddress));
  console.log(userData);
}
```

### 2. Get Effective Plan Details

Retrieves details for a specific investment plan.

```typescript
async function getEffectivePlanDetails(planId: number) {
  const provider = getProvider();
  if (!provider) return;

  const bankOfTon = BankOfTon.createFromAddress(Address.parse("EQCMNmYtHrCBHNDIWF066SftMwavL6dHagTTyEipytmt7T6Q"));
  const planDetails = await bankOfTon.getEffectivePlanDetails(provider, planId);
  console.log(planDetails);
}
```

### 3. Get Current ROI

Gets the current ROI for a user.

```typescript
async function getCurrentRoi(userAddress: string) {
  const provider = getProvider();
  if (!provider) return;

  const bankOfTon = BankOfTon.createFromAddress(Address.parse("EQCMNmYtHrCBHNDIWF066SftMwavL6dHagTTyEipytmt7T6Q"));
  const currentRoi = await bankOfTon.getCurrentRoi(provider, Address.parse(userAddress));
  console.log(currentRoi);
}
```

### 4. Get ROI Multiplier

Retrieves the current ROI multiplier.

```typescript
async function getRoiMultiplier() {
  const provider = getProvider();
  if (!provider) return;

  const bankOfTon = BankOfTon.createFromAddress(Address.parse("EQCMNmYtHrCBHNDIWF066SftMwavL6dHagTTyEipytmt7T6Q"));
  const roiMultiplier = await bankOfTon.getRoiMultiplier(provider);
  console.log(roiMultiplier);
}
```

### 5. Get Daily Withdrawal Status

Retrieves the daily withdrawal status.

```typescript
async function getDailyWithdrawalStatus() {
  const provider = getProvider();
  if (!provider) return;

  const bankOfTon = BankOfTon.createFromAddress(Address.parse("EQCMNmYtHrCBHNDIWF066SftMwavL6dHagTTyEipytmt7T6Q"));
  const withdrawalStatus = await bankOfTon.getDailyWithdrawalStatus(provider);
  console.log(withdrawalStatus);
}
```

### 6. Get Reinvestment Status

Checks if reinvestment is required for a user.

```typescript
async function getReinvestmentStatus(userAddress: string) {
  const provider = getProvider();
  if (!provider) return;

  const bankOfTon = BankOfTon.createFromAddress(Address.parse("EQCMNmYtHrCBHNDIWF066SftMwavL6dHagTTyEipytmt7T6Q"));
  const reinvestmentStatus = await bankOfTon.getReinvestmentStatus(provider, Address.parse(userAddress));
  console.log(reinvestmentStatus);
}
```

### 7. Get Next ROI Halving Info

Retrieves information about the next ROI halving.

```typescript
async function getNextRoiHalvingInfo() {
  const provider = getProvider();
  if (!provider) return;

  const bankOfTon = BankOfTon.createFromAddress(Address.parse("EQCMNmYtHrCBHNDIWF066SftMwavL6dHagTTyEipytmt7T6Q"));
  const halvingInfo = await bankOfTon.getNextRoiHalvingInfo(provider);
  console.log(halvingInfo);
}
```

### 8. Get Contract Balance

Retrieves the current balance of the contract.

```typescript
async function getContractBalance() {
  const provider = getProvider();
  if (!provider) return;

  const bankOfTon = BankOfTon.createFromAddress(Address.parse("EQCMNmYtHrCBHNDIWF066SftMwavL6dHagTTyEipytmt7T6Q"));
  const balance = await bankOfTon.getContractBalance(provider);
  console.log(balance);
}
```





# Data Models Explanations


1. Register User
```typescript
async function registerUser(uplineAddress: string)
```
Explanation: This function registers a new user in the system with a specified upline (referrer).
Input:
- uplineAddress: string - The TON address of the referrer in base64 format.
Expected Output: None (transaction confirmation)
Notes: This function will throw an error if the user is already registered or if the upline address is invalid.

2. Invest
```typescript
async function invest(planId: number, amount: bigint)
```
Explanation: Allows a user to invest in a specific investment plan.
Input:
- planId: number - The ID of the investment plan (0: Basic, 1: Intermediate, 2: Advanced)
- amount: bigint - The amount to invest in nanoTONs (1 TON = 1,000,000,000 nanoTONs)
Expected Output: None (transaction confirmation)
Notes: Will throw an error if the plan doesn't exist or if the amount is below the minimum investment for the chosen plan.

3. Withdraw
```typescript
async function withdraw(amount: bigint)
```
Explanation: Withdraws funds from the user's account in the contract.
Input:
- amount: bigint - The amount to withdraw in nanoTONs
Expected Output: None (transaction confirmation)
Notes: Will throw an error if the user has insufficient funds or if it exceeds daily withdrawal limits.

4. Distribute ROI
```typescript
async function distributeRoi()
```
Explanation: Calculates and distributes the Return on Investment (ROI) for the calling user.
Input: None
Expected Output: None (transaction confirmation)
Notes: This function updates the user's earnings based on their investment and time passed.

5. Reinvest
```typescript
async function reinvest()
```
Explanation: Reinvests the user's current earnings back into their investment plan.
Input: None
Expected Output: None (transaction confirmation)
Notes: This function is typically called when a user reaches their ROI cap.

6. Update Admin (Admin Function)
```typescript
async function updateAdmin(newAdminAddress: string)
```
Explanation: Updates the contract's admin address. Only callable by the current admin.
Input:
- newAdminAddress: string - The new admin's TON address in base64 format
Expected Output: None (transaction confirmation)
Notes: This is a critical function that changes who has admin control over the contract.

7. Distribute ROI for All Users (Admin Function)
```typescript
async function distributeRoiAll()
```
Explanation: Distributes ROI for all users in the system. Only callable by the admin.
Input: None
Expected Output: None (transaction confirmation)
Notes: This function can be gas-intensive if there are many users.

8. Halve ROI (Admin Function)
```typescript
async function halveRoi()
```
Explanation: Halves the ROI rates for all investment plans. Only callable by the admin.
Input: None
Expected Output: None (transaction confirmation)
Notes: This is used to adjust ROI rates over time for sustainability.

9. Get User Data
```typescript
async function getUserData(userAddress: string): Promise<UserData>
```
Explanation: Retrieves detailed data for a specific user.
Input:
- userAddress: string - The user's TON address in base64 format
Expected Output: UserData object
```typescript
type UserData = {
  found: boolean,
  storedAddress: Address,
  upline: Address,
  investmentPlan: number,
  totalInvested: bigint,
  totalWithdrawn: bigint,
  lastInvestmentTime: number,
  referralEarnings: bigint,
  totalEarnings: bigint
}
```
Notes: Returns comprehensive information about a user's investments and earnings.

10. Get Effective Plan Details
```typescript
async function getEffectivePlanDetails(planId: number): Promise<PlanDetails>
```
Explanation: Retrieves details for a specific investment plan.
Input:
- planId: number - The ID of the investment plan (0: Basic, 1: Intermediate, 2: Advanced)
Expected Output: PlanDetails object
```typescript
type PlanDetails = {
  effectiveDailyRoi: number,
  minInvestment: bigint,
  duration: number,
  withdrawalFee: number
}
```
Notes: The effectiveDailyRoi is adjusted based on the current ROI multiplier.

11. Get Current ROI
```typescript
async function getCurrentRoi(userAddress: string): Promise<bigint>
```
Explanation: Calculates the current ROI for a specific user.
Input:
- userAddress: string - The user's TON address in base64 format
Expected Output: bigint - The current ROI in nanoTONs
Notes: This represents the user's current earnings based on their investment and time passed.

12. Get ROI Multiplier
```typescript
async function getRoiMultiplier(): Promise<number>
```
Explanation: Retrieves the current ROI multiplier used to adjust ROI rates.
Input: None
Expected Output: number - The current ROI multiplier (e.g., 10000 for 100%)
Notes: This multiplier affects all ROI calculations in the system.

13. Get Daily Withdrawal Status
```typescript
async function getDailyWithdrawalStatus(): Promise<WithdrawalStatus>
```
Explanation: Retrieves the current daily withdrawal status.
Input: None
Expected Output: WithdrawalStatus object
```typescript
type WithdrawalStatus = {
  dailyWithdrawn: bigint,
  remainingLimit: bigint
}
```
Notes: Used to check how much has been withdrawn today and how much can still be withdrawn.

14. Get Reinvestment Status
```typescript
async function getReinvestmentStatus(userAddress: string): Promise<ReinvestmentStatus>
```
Explanation: Checks if a user needs to reinvest based on their earnings.
Input:
- userAddress: string - The user's TON address in base64 format
Expected Output: ReinvestmentStatus object
```typescript
type ReinvestmentStatus = {
  reinvestmentRequired: boolean,
  earningsPercentage: number
}
```
Notes: Used to determine if a user has reached their ROI cap and needs to reinvest.

15. Get Next ROI Halving Info
```typescript
async function getNextRoiHalvingInfo(): Promise<HalvingInfo>
```
Explanation: Retrieves information about the next scheduled ROI halving event.
Input: None
Expected Output: HalvingInfo object
```typescript
type HalvingInfo = {
  nextHalvingTime: number,
  currentRoiMultiplier: number
}
```
Notes: Provides insight into when ROI rates will next be adjusted.

16. Get Contract Balance
```typescript
async function getContractBalance(): Promise<bigint>
```
Explanation: Retrieves the current balance of the contract.
Input: None
Expected Output: bigint - The contract balance in nanoTONs
Notes: This represents the total funds held by the contract.



This documentation provides a comprehensive guide for frontend developers to interact with `BankOfTon` smart contract. Handle errors and implement proper input validation on the frontend application.


