import { ethers } from "ethers";
import { Config } from "../core";
import { AbiWsProvider } from "./abi.ws-provider";
import { AbiLocalProvider } from "./abi.local-provider";

/**
 * Class for providing a contract instance using different ABI transport methods.
 */
export class ContractProvider<T = ethers.Contract> {
  constructor(private config: Config) {}

  /**
   * Fetches the contract instance using the specified transport method for ABI.
   * @returns {Promise<T>} A promise that resolves to the contract instance.
   * @throws {Error} If the network is unsupported or ABI/contract address is missing.
   */
  async fetch(): Promise<T> {
    const { config } = this;
    let provider: ethers.JsonRpcProvider;
    let abi: any;
    let address: string;

    if (
      config.web3.network === "localhost" ||
      config.web3.network === "hardhat"
    ) {
      provider = new ethers.JsonRpcProvider(config.web3.networkUrl);
    } else if (config.web3.network === "rinkeby") {
      provider = new ethers.InfuraProvider(
        config.web3.network,
        config.web3.infuraProjectId
      );
    } else {
      throw new Error("Unsupported network");
    }

    const signer = new ethers.Wallet(config.web3.walletPrivateKey!, provider);

    if (config.web3.contractProvider === "ws") {
      const data = await AbiWsProvider.fetch(config);
      abi = data.abi;
      address = data.address;
    } else if (config.web3.contractProvider === "local") {
      abi = await AbiLocalProvider.fetch(config.web3.abiPath);
      address = config.web3.contractAddress;
    }

    if (!abi || !address) {
      throw new Error("Missing ABi or contract address");
    }

    return new ethers.Contract(address, abi, signer) as T;
  }
}
