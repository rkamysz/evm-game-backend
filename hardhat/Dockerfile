FROM node:16

# Set the working directory
WORKDIR /app

# Install Hardhat globally
RUN npm install -g hardhat

# Copy only the necessary files
COPY contracts ./contracts
COPY scripts ./scripts
COPY hardhat.config.js ./
COPY ../.env .env

# Install Hardhat dependencies
RUN npm install @nomiclabs/hardhat-waffle @nomiclabs/hardhat-ethers ethers dotenv

# Command to run Hardhat
CMD ["npx", "hardhat", "run", "scripts/deploy.js", "--network", "rinkeby"]
