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
      const config = Config.create('.env.test');

      expect(config).toBeInstanceOf(Config);
      expect(config.port).toBe(3000);
      expect(config.web3).toEqual<Web3Config>({
        network: "rinkeby",
        infuraProjectId: "your_infura_project_id",
        walletPrivateKey: "your_private_key",
      });
    });
  });
});
