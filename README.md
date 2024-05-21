# On-Chain Multiplayer Game Backend

## Project

This project implements the backend for a multiplayer game on the blockchain. The backend uses the [@soapjs](http://docs.soapjs.com/) framework to maintain a clean architecture and [Hardhat](https://hardhat.org/) for deploying and interacting with the smart contract.

## Getting Started

### Environment Variables

Create a `.env` file in the root directory of the project and populate it with the following environment variables:

```plaintext
NETWORK=hardhat
NETWORK_URL=http://hardhat:8545
# Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
# Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
HTTP_PORT=3000
WS_PORT=3001
WS_HOST=hardhat
CHAIN_ID=1337
CONTRACT_PROVIDER=ws
CONTRACT_NAME=Leaderboard
# Both required with local contract provider
CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3
ABI_PATH=hardhat/artifacts/contracts/leaderboard.sol/Leaderboard.json

```

### Install Dependencies
Run the following command to install the project dependencies:
```sh
npm install
```
### Running the Project
## Start the Docker containers:

```sh
docker-compose up --build
```

This will start the Hardhat server and deploy the contract. Once the contract is deployed, its ABI and address will be sent to the backend via WebSocket.

## Accessing the Backend:

The backend server will be running on http://localhost:3000.


### Interacting with the API
You can use the provided Postman collection to interact with the API. The collection includes the following endpoints:

- POST /players: Add a new player to the leaderboard.
- GET /players: Get the list of players on the leaderboard.

### Docker Compose Configuration
The docker-compose.yml is configured to first start the Hardhat server and then the backend service. The backend waits for the Hardhat server to be up and running before it starts.\

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
- There is still some issue with getting players list:
  ```sh
  evm-game-backend-hardhat-1  |   WARNING: Calling an account which is not a contract
  evm-game-backend-hardhat-1  |   From: 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
  evm-game-backend-hardhat-1  |   To:   0x5fbdb2315678afecb367f032d93f642f64180aa3
  evm-game-backend-hardhat-1  |
  evm-game-backend-backend-1  | Error: could not decode result data (value="0x", info={ "method": "getPlayers", "signature": "getPlayers()" }, code=BAD_DATA, version=6.12.1)
  ```

### Conclusion
This setup allows you to deploy and interact with a blockchain-based leaderboard smart contract using a Node.js backend and Hardhat. The backend receives the smart contract details via WebSocket and provides API endpoints to interact with the contract.