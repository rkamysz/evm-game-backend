import { Config, Web3Config } from "../config";
import * as Soap from "@soapjs/soap";

describe("Config", () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalEnv = process.env;
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe("create", () => {
    it("should create a Config instance with valid environment variables", () => {
      const config = Config.create(".env.test");

      expect(config).toBeInstanceOf(Config);
      expect(config.port).toBe(3000);
      expect(config.web3).toEqual<Web3Config>({
        hardhatContractsUrl: "localhost",
        hardhatAccountsUrl: "localhost",
        network: "localhost",
        networkUrl: "http://127.0.0.1:8545",
        chainId: 1337,
        walletPrivateKey: "your_private_key",
        contractAddress: "your_contract_address",
        contractName: "Leaderboard",
      });
    });

    it("should throw error when using local provider and missing contract address", () => {
      try {
        const config = Config.create(".env.test-fail");
      } catch (error) {
        expect(error.message).toBe(
          "The contract address is required when using a local provider"
        );
      }
    });
  });
});
