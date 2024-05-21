import { WebSocket } from "ws";
import { Config } from "../core";

/**
 * Class for providing ABI via WebSocket.
 */
export class AbiWsProvider {
  /**
   * Fetches the ABI and contract address via WebSocket.
   * @param {Config} config - The configuration object containing WebSocket port.
   * @returns {Promise<{ abi: any; address: string }>} A promise that resolves to an object containing the ABI and contract address.
   */
  static async fetch(config: Config): Promise<{ abi: any; address: string }> {
    return new Promise((resolve, reject) => {
      let abi: any;
      let address: string;
      const wsPort = process.env.WS_PORT || 3001;
      const wsHost = process.env.WS_HOST || "localhost";

      const ws = new WebSocket(`ws://${wsHost}:${wsPort}`);

      ws.on("open", function open() {
        console.log("WebSocket client connected to Server");
      });

      ws.on("message", function message(data) {
        try {
          const contractData = JSON.parse(data);
          abi = contractData.abi;
          address = contractData.address;
          
          if (abi && address) {
            console.log("Received ABI and Address:", abi, address);
            resolve({ abi, address });
          }
        } catch (error) {
          console.error("Error processing message:", error);
          reject(error);
        }
      });

      ws.on("close", function close() {
        console.log("WebSocket connection closed");
      });

      ws.on("error", function error(err) {
        console.error("WebSocket error:", err);
        reject(error);
      });
    });
  }
}
