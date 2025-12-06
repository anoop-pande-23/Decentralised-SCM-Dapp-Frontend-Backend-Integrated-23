PrdoctHun- A Decentralized Supply Chain Management System Dapp.
A Hybrid On-Chain + Off-Chain Anti-Counterfeit Verification Platform

This project implements a Blockchain-powered Supply Chain Management System with features like:

✅ On-chain Product Registry
✅ Anti-Counterfeit PDF Receipt Verification
✅ QR-based Authenticity Check
✅ Vendor-Customer Workflow
✅ Off-chain Supply Chain Tracking
✅ Dual Validation System (File Hash + QR Hash)

1. 📝 Introduction

Traditional supply chains face several issues:

Counterfeit / fake products

Lack of transparency

Tampering in centralized databases

Manual verification

No audit trail

Blockchain provides:

✔ Immutability
✔ Transparency
✔ Decentralized trust
✔ Full traceability

This project solves these challenges using:

Smart Contracts for integrity

Backend logic for workflows & validation

MongoDB for fast off-chain metadata

QR codes + SHA-256 for counterfeit protection

React UI for vendor & customer dashboards

2. 🏗 System Architecture
Four-Layer Hybrid Architecture
Frontend (React + TS)
        ↓
Backend API (Node.js + Express)
        ↓
Blockchain Layer (Solidity Smart Contract)
        ↓
MongoDB (Off-chain metadata)

Why Hybrid?

Blockchain → Immutability for critical data

MongoDB → Fast, gas-free updates for product status & ownership

3. 🛠 Tech Stack
Blockchain

Solidity

Hardhat

Ethers.js

Backend

Node.js

Express

JWT Authentication

Multer (file upload)

PDFKit (receipt creation)

Crypto (SHA-256 hashing)

QRCode Generator

MongoDB + Mongoose

Frontend

React.js

TypeScript

Axios

shadcn/ui

4. 🔐 Smart Contract Overview (contractApi.sol)
Stores on-chain:

Product details

Receipt SHA-256 hash

Immutable audit logs

Key On-Chain Functions
Function	Purpose
setProduct()	Add product
updateProduct()	Modify product
deleteProduct()	Delete product
getProduct()	Read product
getAllProducts()	List all products
storeDocumentHash()	Save receipt hash
verifyDocumentHash()	Compare receipt hash
Smart Contract Events (Blockchain Audit Logs):

ProductAdded

ProductUpdated

ProductDeleted

DocumentHashStored

Events help maintain an immutable audit trail for faculty or auditors.

5. 🖥 Backend Architecture
Responsibilities:

Vendor/Customer Authentication (JWT)

Role-based middleware

Interacts with Ethereum blockchain

Generates signed PDF receipts

Computes SHA-256 hash

Stores PDF path & hash

Generates QR Code

Validates QR or receipt file

Off-chain supply chain status update

Buy request workflow

6. 🗄 Database Schema (MongoDB)
Product Schema
{
  blockchainId: Number,
  name: String,
  price: Number,
  quantity: Number,
  vendorId: ObjectId,
  status: "Created" | "Packed" | "Shipped" | "Delivered"
}

BuyRequest Schema
{
  productId: Number,
  customerId: ObjectId,
  vendorId: ObjectId,
  status: "Pending" | "Approved" | "Rejected",
  receiptHash: String,
  receiptUrl: String
}

7. ⭐ Major Features
Feature 1 — On-chain Product Management

Add / Update / Delete product on blockchain

Data is immutable and verified

Feature 1.5 — Off-chain Supply Chain Tracking

Statuses:

Created → Packed → Shipped → Delivered


Stored off-chain to reduce gas cost.

Feature 2 — Anti-Counterfeit Receipt Verification

Workflow:

Vendor approves request

Backend generates PDF receipt

PDF → SHA-256 hash

Hash stored on blockchain

Customer verifies by:

Uploading receipt file

Scanning/pasting QR

Dual Verification:
🔒 On-chain Hash Check
🔍 Off-chain File Hash Check

Feature 3 — Buy Request Workflow

Customer applies → Auto-detect vendor

Vendor approves/rejects

Approved = receipt auto-generated

Hash stored on blockchain

Feature 4 — Vendor Access Control

Vendor can ONLY update his products using:

auth.js

authorizeRole.js

8. 🔄 Project Workflow (End-to-End)
Vendor Flow

Login

Add product

Update supply chain status

View customer requests

Approve → Receipt generated

Hash stored on smart contract

Generate QR for customer

Customer Flow

Login

View products

Apply to buy

Receive approval + receipt

Verify product authenticity using:

✔ Receipt Upload
✔ QR Scan

9. ⚙ Environment Setup

Create .env file:

MONGO_URI=mongodb://127.0.0.1:27017/supplychain
API_URL=http://127.0.0.1:8545
PRIVATE_KEY=<hardhat-account-private-key>
CONTRACT_ADDRESS=<after-deploy>
JWT_SECRET=anysecret
JWT_EXPIRES_IN=1h

10. ▶ How to Run the Project
1. Clone Repo
git clone <repo-url>

2. Install Backend Dependencies
cd backend
npm install

3. Start MongoDB
mongod

4. Start Hardhat Local Blockchain
npx hardhat node

5. Deploy Contract
npx hardhat run scripts/deploy.js --network localhost


Copy the contract address → add to .env.

6. Run Backend
node index.js


Backend → http://localhost:5000

7. Run Frontend
cd frontend
npm install
npm run dev


Frontend → http://localhost:8081

11. 📡 API Endpoints Summary
🔐 Auth
Method	Endpoint	Role
POST	/register	All
POST	/login	All
📦 Products
Method	Endpoint
GET	/products
GET	/products/:id
POST	/products
PUT	/products/:id
DELETE	/products/:id
PUT	/products/:id/status
🛒 Buy Requests
Method	Endpoint
POST	/buy-requests/apply
GET	/buy-requests/vendor
GET	/buy-requests/customer
PUT	/buy-requests/:id/approve
🔐 Verification
Method	Endpoint
POST	/buy-requests/validate-file
POST	/buy-requests/verify-qr
GET	/buy-requests/:id/qr
12. 🔒 Security Model
✔ JWT Authentication
✔ Role-based Access Control
✔ Hash-based Verification
✔ Blockchain Immutability
✔ QR Code Integrity
✔ No tampering possible once hash is stored
