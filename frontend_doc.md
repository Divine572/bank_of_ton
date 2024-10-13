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

This documentation provides a comprehensive guide for frontend developers to interact with `BankOfTon` smart contract. Handle errors and implement proper input validation on the frontend application.

