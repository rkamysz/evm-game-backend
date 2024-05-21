import * as Soap from "@soapjs/soap";

export type Web3Config = {
  network: string;
  networkUrl: string;
  chainId: number;
  walletPrivateKey: string;
  abiPath: string;
  contractProvider: string | "ws" | "local";
  infuraProjectId?: string;
  contractAddress?: string;
  contractName: string;
};

export class Config implements Soap.Config {
  static create(envPath?: string) {
    const vars = new Soap.ConfigVars(envPath);
    const port = vars.getNumberEnv("HTTP_PORT");
    const wsPort = vars.getNumberEnv("WS_PORT");
    const wsHost = vars.getStringEnv("WS_HOST");
    const walletPrivateKey = vars.getStringEnv("PRIVATE_KEY");
    const network = vars.getStringEnv("NETWORK");
    const networkUrl = vars.getStringEnv("NETWORK_URL");
    const chainId = vars.getNumberEnv("CHAIN_ID");
    const infuraProjectId = vars.getStringEnv("INFURA_PROJECT_ID");
    const contractAddress = vars.getStringEnv("CONTRACT_ADDRESS");
    const contractName = vars.getStringEnv("CONTRACT_NAME");
    const contractProvider = vars.getStringEnv("CONTRACT_PROVIDER");
    const abiPath = vars.getStringEnv("ABI_PATH");

    if (contractProvider === "local" && !contractAddress) {
      throw new Error(
        "The contract address is required when using a local provider"
      );
    }

    return new Config(port, wsPort, wsHost, {
      abiPath,
      network,
      networkUrl,
      infuraProjectId,
      chainId,
      walletPrivateKey,
      contractAddress,
      contractProvider,
      contractName,
    });
  }

  constructor(
    public readonly port: number,
    public readonly wsPort: number,
    public readonly wsHost: string,
    public readonly web3: Web3Config
  ) {}
}
