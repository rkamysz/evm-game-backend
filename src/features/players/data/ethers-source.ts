import { ethers } from "ethers";
import { Web3Config } from "../../../core";

export class EthersSource {
  private wallet: ethers.Wallet;
  private contract: ethers.Contract;

  constructor(
    private config: Web3Config,
    private provider: ethers.InfuraProvider,
    private abi: any[]
  ) {}
}
