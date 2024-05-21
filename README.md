# On-Chain Multiplayer Game Backend

## Project

This project implements the backend for a multiplayer game on the blockchain. The backend uses the [@soapjs](http://docs.soapjs.com/) framework to maintain a clean architecture and [Hardhat](https://hardhat.org/) for deploying and interacting with the smart contract.

## Setup Instructions

### Environment Variables

Create a `.env` file in the root directory with the following content:

```plaintext
# Network
NETWORK=localhost

# Network URL to connect to. For local development, use http://127.0.0.1:8545.
# For Rinkeby, use the Infura URL: https://rinkeby.infura.io/v3/your_infura_project_id
NETWORK_URL=http://127.0.0.1:8545

# Infura project ID for connecting to the Ethereum Rinkeby testnet
# You can get this by creating a project on the Infura website
INFURA_PROJECT_ID=your_project_id

# Private key of your Ethereum wallet
# This key will be used to sign transactions. Keep it secret and secure.
PRIVATE_KEY=your_private_key

# Port number on which the Express server will run
# Default is 3000, but you can change it if needed
HTTP_PORT=3000

# Port number on which the WS server will run
# Default is 3001, but you can change it if needed
WS_PORT=3001

# Chain ID of the network to connect to.
# Use 1337 for local development with Hardhat or Ganache.
# Use 4 for Rinkeby.
CHAIN_ID=1337

# Optional!
# Address of the deployed smart contract on the network
# Ensure this contract is deployed and accessible
CONTRACT_ADDRESS=your_contract_address

# Contract provider transport "ws" or "local"
CONTRACT_PROVIDER=local

# ABI contract file path
ABI_PATH=hardhat/artifacts/contracts/leaderboard.sol/Leaderboard.json

```

### Install Dependencies
Run the following command to install the project dependencies:
```sh
npm install
```
### Running Hardhat and the Backend
This project uses Docker to run Hardhat and the backend services. Ensure Docker is installed on your machine. Then, use the following command to build and run the services:

```sh
docker-compose up --build
```
## Deployment Script (deploy.js)
The deploy.js script in the hardhat-project/scripts directory deploys the Leaderboard contract and sends the ABI and contract address to the backend via WebSocket.

## Initializing the Contract in the Backend
The backend initializes the contract by receiving the ABI and contract address via WebSocket. This is done in the initializeContract function.

## Available API Endpoints

Please use `postman-collection.json`

### POST /v1/players
Adds a new player to the leaderboard.
  - Request Body:
      ```json
      {
        "playerAddress": "0x1234...",
        "score": 100
      }
      ```
  - Response: `Result<boolean>`
### GET /v1/players
Retrieves the list of all players on the leaderboard.
  - Response: `Result<Player[]>`