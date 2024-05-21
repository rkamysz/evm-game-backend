import { ethers } from "ethers";
import { Config } from "../core";
import axios from "axios";

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
    const { contractName, walletPrivateKey, networkUrl, hardhatContractsUrl } =
      config.web3;
    let abi: any;
    let address: string;

    const provider = new ethers.providers.JsonRpcProvider(networkUrl);
    const signer = new ethers.Wallet(walletPrivateKey, provider);

    // Fetch ABI and address from the local server
    const response = await axios.get(hardhatContractsUrl);
    const data = response.data;
    if (data[contractName]) {
      abi = data[contractName].abi;
      address = data[contractName].address;
    }

    if (!abi || !address) {
      throw new Error("Missing ABI or contract address");
    }

    return new ethers.Contract(address, abi, signer) as T;
  }
}
