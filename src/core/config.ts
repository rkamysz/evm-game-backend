import * as Soap from "@soapjs/soap";

export type Web3Config = {
  network: string;
  infuraProjectId: string;
  walletPrivateKey: string;
  contractAddress: string;
};

export class Config implements Soap.Config {
  static create(envPath?: string) {
    const vars = new Soap.ConfigVars(envPath);
    const port = vars.getNumberEnv("PORT");
    const walletPrivateKey = vars.getStringEnv("PRIVATE_KEY");
    const network = vars.getStringEnv("NETWORK");
    const infuraProjectId = vars.getStringEnv("INFURA_PROJECT_ID");
    const contractAddress = vars.getStringEnv("CONTRACT_ADDRESS");

    return new Config(port, {
      network,
      infuraProjectId,
      walletPrivateKey,
      contractAddress,
    });
  }

  constructor(public readonly port: number, public readonly web3: Web3Config) {}
}