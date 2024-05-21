# On-Chain Multiplayer Game Backend

## Project

This project implements the backend for a multiplayer game on the blockchain. The backend uses the [@soapjs](http://docs.soapjs.com/) framework to maintain a clean architecture and [Hardhat](https://hardhat.org/) for deploying and interacting with the smart contract.

## Getting Started

### Environment Variables

Create a `.env` file in the root directory of the project and populate it with the following environment variables:

```plaintext
# Network localhost
NETWORK=localhost

# Network URL to connect to. For local development, use http://127.0.0.1:8545 or http://hardhat:8545.
NETWORK_URL=http://127.0.0.1:8545

# Private key of your Ethereum wallet
# This key will be used to sign transactions. Keep it secret and secure.
PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

# Port number on which the Express server will run
# Default is 3000, but you can change it if needed
HTTP_PORT=3000

# Port number on which the Hardhat Express server will run
# Default is 3003, but you can change it if needed
HARDHAT_HTTP_PORT=3003

# Hardhat http server /contracts url
HARDHAT_CONTRACTS_URL=http://localhost:3003/contracts

# Hardhat http server /accounts url
HARDHAT_ACCOUNTS_URL=http://localhost:3003/accounts

# Chain ID of the network to connect to.
# Use 1337 for local development with Hardhat or Ganache.
CHAIN_ID=1337

# Name of the deployed smart contract on the network
CONTRACT_NAME=Leaderboard

```

### Install Dependencies
Run the following command to install the project dependencies:
```sh
# in ./backend
npm install

# in ./hardhat
npm install
```
### Running the Project
<!-- ## Start the Docker containers:

```sh
docker-compose up --build
``` -->

Docker version doesnt work now due to other (new) issues - but you can run hardhat locally using script `./hardhat/start.sh`. This will run hardhat node, deploy contracts and start http (earlier it was WS) server to retrieve ABIs.

To run API go to the `/backend` dir and use `npm run build && npm run start`

This will start the Hardhat server and deploy the contract. Once the contract is deployed, its ABI and address will be sent to the backend via WebSocket.

## Accessing the Backend:

The backend server will be running on http://localhost:3000.
The Hardhat htpp server will be running on http://localhost:3003.


### Interacting with the API
You can use the provided Postman collection to interact with the API. The collection includes the following endpoints:

- POST /players: Add a new player to the leaderboard.
- GET /players: Get the list of players on the leaderboard.

#### Hardhat Http Server

- GET /contracts: Get the list of constracts/ABIs.
- GET /accounts: Get the list of accounts.

<!-- ### Docker Compose Configuration
The docker-compose.yml is configured to first start the Hardhat server and then the backend service. The backend waits for the Hardhat server to be up and running before it starts.\ -->

### Development and Testing
## Adding a Player
To add a new player to the leaderboard, send a POST request to /players with the following JSON body:

```json
{
  "playerAddress": "0xYourPlayerAddress",
  "score": 100
}
```

## Listing Players
To get the list of players on the leaderboard, send a GET request to /players.

### Hardhat Server
The Hardhat server deploys the smart contract and sets up a WebSocket server to send the ABI and contract address to the backend. The backend initializes the contract using these details and interacts with the blockchain.

### Testing Networks
This project is configured to support multiple networks, but it has been primarily tested with the Hardhat network. Ensure you use the appropriate network settings in the .env file.

### Notes
- Use the provided private key and account details from the Hardhat node for testing purposes.
- The backend waits for the contract deployment to complete before initializing the contract for interactions.
- Local contract provider is only for dev local tests you should use `ws`

### Issues
- Docker version doesnt work since I updated hardhat and use other tools to deploy contracts (its to late to check it but we can talk about it)
  `Error: Cannot find module '@nomicfoundation/solidity-analyzer-linux-x64-gnu'`

### Conclusion
This setup allows you to deploy and interact with a blockchain-based leaderboard smart contract using a Node.js backend and Hardhat. The backend receives the smart contract details via WebSocket and provides API endpoints to interact with the contract.