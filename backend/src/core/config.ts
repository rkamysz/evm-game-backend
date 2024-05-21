import * as Soap from "@soapjs/soap";

export type Web3Config = {
  network: string;
  networkUrl: string;
  chainId: number;
  walletPrivateKey: string;
  contractAddress: string;
  contractName: string;
  hardhatContractsUrl: string;
  hardhatAccountsUrl: string;
};

export class Config implements Soap.Config {
  static create(envPath?: string) {
    const vars = new Soap.ConfigVars(envPath);
    const port = vars.getNumberEnv("HTTP_PORT");
    const hardhatContractsUrl = vars.getStringEnv("HARDHAT_CONTRACTS_URL");
    const hardhatAccountsUrl = vars.getStringEnv("HARDHAT_ACCOUNTS_URL");
    const walletPrivateKey = vars.getStringEnv("PRIVATE_KEY");
    const network = vars.getStringEnv("NETWORK");
    const networkUrl = vars.getStringEnv("NETWORK_URL");
    const chainId = vars.getNumberEnv("CHAIN_ID");
    const contractAddress = vars.getStringEnv("CONTRACT_ADDRESS");
    const contractName = vars.getStringEnv("CONTRACT_NAME");

    return new Config(port, {
      network,
      networkUrl,
      chainId,
      walletPrivateKey,
      contractAddress,
      contractName,
      hardhatContractsUrl,
      hardhatAccountsUrl,
    });
  }

  constructor(public readonly port: number, public readonly web3: Web3Config) {}
}
