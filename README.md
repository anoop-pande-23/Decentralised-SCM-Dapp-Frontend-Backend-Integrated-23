<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0FAAFF,100:6DB33F&height=180&section=header&text=ProductHub&fontSize=60&fontColor=ffffff&fontAlignY=38&desc=Decentralised%20Supply%20Chain%20Management%20DApp&descSize=18&descAlignY=58&animation=fadeIn" width="100%"/>

<br/>

![Solidity](https://img.shields.io/badge/Solidity-363636?style=for-the-badge&logo=solidity&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Hardhat](https://img.shields.io/badge/Hardhat-FFF100?style=for-the-badge&logo=hardhat&logoColor=black)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

*Transparent, immutable, and tamper-proof supply chain management on the blockchain.*

</div>

---

# ProductHub – Decentralized Supply Chain Management System (DApp)
## A Hybrid On-Chain + Off-Chain Anti-Counterfeit Verification Platform

ProductHub is a Blockchain-powered Supply Chain Management System designed to eliminate counterfeit products, ensure transparency, and create tamper-proof verification using a combination of:

✔ Ethereum Smart Contracts

✔ Node.js Backend (Workflow + Validation Logic)

✔ MongoDB (Off-chain metadata)

✔ React Frontend (Vendor + Customer UI)

✔ QR-based verification + SHA-256 Hashing

## 1. Introduction

Traditional supply chains suffer from:

* Counterfeit / fake products

* Tampered centralized databases

* No end-to-end auditability

* Manual + error-prone verification

* Zero trust between vendor ↔ customer

Blockchain solves this by offering:

✔ Immutability

✔ Transparency

✔ Decentralized trust

✔ End-to-end traceability

ProductHub brings all of this together using a hybrid architecture:
Smart Contracts secure critical data, while the backend + MongoDB handle efficient, gas-free business workflows.

## 2. System Architecture
Four-Layer Hybrid Architecture
Frontend (React + TypeScript)
            ↓
Backend API (Node.js + Express)
            ↓
Blockchain Layer (Solidity Smart Contract)
            ↓
MongoDB (Off-chain metadata + workflow)

### Why Hybrid?
Module	Storage	Reason
Product Master	Blockchain	Immutable & critical
Receipt Hash	Blockchain	Anti-counterfeit security
Supply Chain Status	MongoDB	Fast & frequent updates
Vendor Ownership	MongoDB	Avoids gas, keeps logic simple
## 3. Tech Stack
Blockchain

Solidity

Hardhat

Ethers.js

Backend

Node.js + Express

JWT Authentication

Multer (file upload)

PDFKit (receipt generation)

Crypto (SHA-256 hashing)

QRCode generator

MongoDB + Mongoose

Frontend

React.js

TypeScript

Axios

shadcn/ui

## 4. Smart Contract Overview (contractApi.sol)
On-chain Storage Includes

Product details

Receipt SHA-256 hash

Immutable audit logs

Key Smart Contract Functions
Function	Purpose
setProduct()	Add product
updateProduct()	Update product
deleteProduct()	Delete product
getProduct()	Fetch 1 product
getAllProducts()	Fetch all
storeDocumentHash()	Store receipt hash
verifyDocumentHash()	Validate hash
Smart Contract Events (Audit Logs)

ProductAdded

ProductUpdated

ProductDeleted

DocumentHashStored

Events create a blockchain-level security trail.

## 5. Backend Architecture

Backend acts as the brain of the system.

Responsibilities

Authenticate users with JWT

Vendor/Customer role-based access

Interact with Ethereum blockchain

Generate signed PDF receipts

SHA-256 hashing

QR Code creation

File verification (PDF/Image)

Off-chain supply chain tracking

Buy request workflow automation

## 6. Database Schema (MongoDB)
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

## 7.  Major Features
### Feature 1 — On-Chain Product Management

Add / Update / Delete product

All stored directly on blockchain

Immutable + trustless

### Feature 1.5 — Off-Chain Supply Chain Tracking

Product status journey:

Created → Packed → Shipped → Delivered

Stored off-chain → cheaper, faster, scalable.

### Feature 2 — Anti-Counterfeit Receipt Verification (Core Feature)
Workflow

Vendor approves buy request

Backend generates PDF receipt

PDF → SHA-256 hash

Hash stored on blockchain

QR generated for customer

Customer verifies using:

✔ File Upload OR

✔ QR Scan

Dual Verification

Blockchain hash check

Local computed hash check

Impossible to forge.

### Feature 3 — Buy Request Workflow

Customer applies

Vendor auto-mapped

Vendor approves/rejects

Receipt auto-generated on approval

### Feature 4 — Vendor Access Control

Vendor can only modify their own products, enforced using:

auth.js

authorizeRole.js

## 8.  End-to-End Workflow
Vendor

Login

Add product

Update status

Approve buy request

PDF generated → hash stored

Show customer QR

Customer

Login

View products

Apply to buy

Download receipt

Verify authenticity via:

File Upload

QR Scan (JSON payload)

## 9. Environment Setup (.env example)
MONGO_URI=<your-mongo-url>
API_URL=<your-api-url>
PRIVATE_KEY=<hardhat-private-key>
CONTRACT_ADDRESS=<after-deploy>
JWT_SECRET=yourSecret
JWT_EXPIRES_IN=1h

## 10. Running the Project
### Backend
cd backend
npm install
mongod
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
node index.js

### Frontend
cd frontend
npm install
npm run dev

## 11. API Endpoints Summary
Auth
Method	Endpoint
POST	/register
POST	/login
Products

GET /products
GET /products/:id
POST /products
PUT /products/:id
PUT /products/:id/status
DELETE /products/:id

Buy Requests

POST /buy-requests/apply
GET /buy-requests/vendor
GET /buy-requests/customer
PUT /buy-requests/:id/approve

Verification

POST /buy-requests/validate-file
POST /buy-requests/verify-qr
GET /buy-requests/:id/qr

## 12. Security Model

✔ JWT Authentication
✔ Role-Based Access Control
✔ Blockchain Immutability
✔ Hash-Based Verification
✔ QR Code Integrity
✔ Tamper-proof receipts

## 13. Key Advantages

* Zero counterfeit receipts

* Fully auditable supply chain

* Hybrid architecture = cost-efficient

* Transparent vendor-customer workflow

* Quick validation via QR or file upload

## 14. Future Enhancements

MetaMask login
Deploy on Testnet (Polygon / Sepolia)
IPFS storage for receipts
Real-time shipment tracking
AI anomaly detection

## 15. Conclusion

ProductHub delivers:

End-to-end product traceability

Strong anti-counterfeit mechanism

Hybrid blockchain-backed architecture

Tamper-proof receipts + QR verification

A production-ready, scalable SCM solution

---

<div align="center">

*Built by [Anoop Pande](https://linkedin.com/in/anoop-pande-001906236)*

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:6DB33F,100:0FAAFF&height=120&section=footer" width="100%"/>

</div>
