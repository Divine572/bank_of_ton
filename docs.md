# Bank of TON Smart Contract Implementation TODOs

## 1. Contract Setup and Administration
- [ ] Define contract owner/admin role
- [ ] Implement functions for contract upgrades and parameter changes
- [ ] Create a sustainability pool to store a portion of fees

## 2. User Management
- [ ] Implement user registration system
- [ ] Store user data (address, upline, investment plan, etc.)
- [ ] Create upline verification mechanism

## 3. Investment Plans
- [ ] Implement the three investment plans (Basic, Intermediate, Advanced)
- [ ] Store plan details (daily ROI, minimum investment, duration, withdrawal fee)
- [ ] Create function to allow users to invest in a plan

## 4. ROI Calculation and Distribution
- [ ] Implement daily ROI calculation for each plan
- [ ] Create a function to distribute daily ROI to users
- [ ] Implement ROI halving mechanism for sustainability

## 5. Referral System
- [ ] Implement multi-tier referral system (3 levels)
- [ ] Calculate and distribute referral commissions
- [ ] Implement upline incentive (2% bonus on downline earnings)

## 6. Withdrawal System
- [ ] Implement withdrawal function with minimum amount check (1 TON)
- [ ] Apply withdrawal fees based on the user's plan
- [ ] Implement anti-whale mechanism (100 TON daily withdrawal limit)

## 7. Reinvestment Mechanism
- [ ] Implement 300% ROI cap and forced reinvestment
- [ ] Create function to reinvest earnings

## 8. Security and Transparency
- [ ] Implement access control for admin functions
- [ ] Create events for all major actions (investments, withdrawals, referrals)
- [ ] Implement function to view contract balance and user statistics

## 9. Time-based Functions
- [ ] Implement time-based checks for withdrawal waiting periods
- [ ] Create mechanism for ROI halving at predetermined intervals

## 10. Testing and Deployment
- [ ] Write comprehensive unit tests for all contract functions
- [ ] Perform security audits and penetration testing
- [ ] Deploy contract to TON testnet for thorough testing
- [ ] Prepare deployment script for mainnet launch

## 11. External Integrations (for future phases)
- [ ] Prepare hooks for NFT integration
- [ ] Design system for quest rewards and social engagement features




1. Registration & Upline Structure
1.1 Upline Registration Process
Compulsory Upline: Every user must sign up through an upline's referral link, either from:
- Admin/Official Link ( found on the website).
- Another User’s Upline Link 


1.2 Dashboard Access
Once verified by the upline or via auto-verification, the user gains access to the dashboard.
Dashboard Features include:
- Investment options.
- Daily ROI tracking.
- Referral statistics.
- Withdrawals and earnings.





2. Investment Plans

Plan 1: Basic
- Daily Return: 1% ROI per day.
- Minimum Investment starts from: 2 TON- 19.99 TON.
- Duration: 200 days (User must wait at least 7 days to withdraw).
- Withdrawal Fee: 5% of the total amount.


Plan 2: Intermediate
- Daily Return: 1.5% ROI per day.
- Minimum Investment starts from: 20 TON - 199.99 TON.
- Duration: 250 days (User must wait at least 15 days to withdraw).
- Withdrawal Fee: 3% of the total amount.

Plan 3: Advanced
- Daily Return: 2% ROI per day.
- Minimum Investment starts from: 200 TON - 2000 TON.
- Duration: 300 days (User must wait at least 30 days to withdraw).
- Withdrawal Fee: 2% of the total amount.



3. Referral Program Structure

3.1 Multi-Tier Referral System
- Level 1 (Direct Referral): 10% commission on the first deposit made by your referral.
- Level 2 (Indirect Referral): 5% commission on the first deposit made by your referral's referral.
- Level 3: 2% commission on the first deposit made by users at this level.


3.2 Upline Incentive
Verification Bonus: Uplines receive a 2% bonus on all earnings from their downline once verified.
This encourages active verification of referrals.


3.3 Leaderboard & Gamification
Top uplines and referrers will be featured on a leaderboard to boost competition and engagement. Potential rewards like extra bonuses, NFTs, or special badges could be given to top-performing users.


3.4 Referral commissions are capped once a user's current investment cycle has ended. To earn more referral bonuses, the user must reinvest and activate their next cycle.

This system motivates continuous engagement and new investments, creating an ongoing growth loop.

You will understand this more on 6.2




4. Withdrawals & Fees4.1 Withdrawal Conditions
Minimum Withdrawal Amount: 1 TON.
Withdrawals will be subject to the withdrawal fees based on the chosen plan:
- Plan 1: 5%
- Plan 2: 3%
- Plan 3: 2%

4.2 Auto Withdrawal
Withdrawals can be manually withdrawn by user depending on user investment plan.



5. Sustainability & Anti-Whale Protection5.1 Anti-Whale Mechanism
A daily withdrawal limit of 100 TON will be imposed to prevent larger investors from draining the contract too quickly.  No more than 100 ton can leave the contract in a day, we can change this anytime too, if we see group in number of investment.

5.2 Sustainability
A portion of the withdrawal fees (e.g., 50%) will go back into the sustainability pool to ensure longevity.
The contract will hold a reserve of TON tokens to handle sudden withdrawals or drops in new deposits. This pool is different from the initial contract.





6. ROI Halving

6.1 ROI Halving
- The platform will implement periodic ROI slashing (akin to Bitcoin's halving model) to ensure long-term sustainability. The slashing dates will be planned in intervals, where daily ROI percentages will be adjusted down by a fixed percentage after certain growth milestones are met (e.g., every 6 months or after a certain number of users).

- First ROI Slashing Event (End of Q1 2025)
The first ROI slashing event reduces daily ROI from the initial rates to lower levels (e.g., from 2.5% to 2.0% daily).

- Second ROI Slashing Event (End of Q2 2025)
Daily ROI slashed again from e.g 2.0% to 1.75% for newly invested users.

Existing users are incentivized to reinvest quickly to avoid lower returns in future cycles.

- Third ROI Slashing Event (End of Q3 2025)
ROI slashed from e.g 1.7% - 1.5%. Users reinvesting before this event can lock in higher returns.


- Fourth ROI Slashing Event (Q1 2026)
Daily ROI reduced from e.g 1.5% to 1.25%.


- Ongoing ROI Management
Additional ROI slashing events will continue, ensuring the platform’s long-term sustainability and avoiding unsustainable payout levels.



6.2 Reinvestment Requirements:
- Users must reinvest once they hit 300% of their deposited amount. Once their total withdrawal reaches this cap, the user is required to reinvest to continue participating in the platform.

A user can continue to earn profits and referral bonuses up to a maximum of 300% ROI based on their initial deposit.

For example, if a user deposits 10 TON, once their total withdrawal reaches 30 TON (including daily ROI, bonuses, and referral commissions), their investment cycle is considered complete.





