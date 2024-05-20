import { WebSocketServer } from "ws";
import { ethers } from "ethers";
import { Config } from "../core";

/**
 * Initializes a contract by establishing a WebSocket server to receive the ABI and contract address.
 * @template T - The type of the contract, defaults to ethers.Contract.
 * @param {Config} config - The configuration required to initialize the contract.
 * @returns {Promise<T>} A promise that resolves to the initialized contract.
 */
export const initializeContract = <T = ethers.Contract>(
  config: Config
): Promise<T> => {
  return new Promise((resolve, reject) => {
    const wss = new WebSocketServer({ port: config.port });

    wss.on("connection", function connection(ws) {
      ws.on("message", function message(data) {
        try {
          const contractData = JSON.parse(data.toString());
          const contractABI = contractData.abi;
          const contractAddress = contractData.address;
          console.log(
            "Received ABI and Address:",
            contractABI,
            contractAddress
          );

          const provider = new ethers.InfuraProvider(
            config.web3.network,
            config.web3.infuraProjectId
          );
          const signer = new ethers.Wallet(
            config.web3.walletPrivateKey!,
            provider
          );
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          ) as T;

          resolve(contract);
          wss.close();
        } catch (error) {
          reject(error);
        }
      });

      ws.on("close", function close() {
        console.log("WebSocket connection closed");
      });

      ws.on("error", function error(err) {
        reject(err);
      });
    });
  });
};
