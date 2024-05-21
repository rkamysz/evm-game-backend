import { readFile } from "fs/promises";
import { join } from "path";

/**
 * Class for providing ABI from local file.
 */
export class AbiLocalProvider {
  /**
   * Fetches the ABI from a local JSON file.
   * @param {string} abiPath - The relative path to the ABI JSON file.
   * @returns {Promise<any>} A promise that resolves to the parsed ABI object.
   */
  static async fetch(abiPath: string): Promise<any> {
    try {
      const data = await readFile(join(process.cwd(), abiPath), "utf8");
      const json = JSON.parse(data);

      return json.abi;
    } catch (error) {
      console.error(`Error reading file from disk: ${error}`);
    }
  }
}
