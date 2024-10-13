# bank-of-ton

## Project structure

-   `contracts` - source code of all the smart contracts of the project and their dependencies.
-   `wrappers` - wrapper classes (implementing `Contract` from ton-core) for the contracts, including any [de]serialization primitives and compilation functions.
-   `tests` - tests for the contracts.
-   `scripts` - scripts used by the project, mainly the deployment scripts.

## How to use

### Build

`npx blueprint build` or `yarn blueprint build`

### Test

`npx blueprint test` or `yarn blueprint test`

### Deploy or run another script

`npx blueprint run` or `yarn blueprint run`

### Add a new contract

`npx blueprint create ContractName` or `yarn blueprint create ContractName`


### Testnet Deployment

#### Sent transaction
- Contract deployed at address EQCMNmYtHrCBHNDIWF066SftMwavL6dHagTTyEipytmt7T6Q
- You can view it at https://testnet.tonscan.org/address/EQCMNmYtHrCBHNDIWF066SftMwavL6dHagTTyEipytmt7T6Q
- Admin address: EQDA05Tm0K37K9KO5VFp3V7ZmVDIYBCi2_4A9OWr5SGtZdtn
- Initial ROI multiplier: 10000
- Next halving time: 2025-01-13T03:46:35.000Z
