import { ethers } from "ethers";
import { Config } from "../../core";
import { AbiWsProvider } from "../abi.ws-provider";
import { ContractProvider } from "../contract.provider";
import { AbiLocalProvider } from "../abi.local-provider";

jest.mock("../abi.ws-provider");
jest.mock("../abi.local-provider");
jest.mock("ethers");

describe("ContractProvider", () => {
  const mockConfig: Config = {
    web3: {
      network: "localhost",
      networkUrl: "http://localhost:8545",
      walletPrivateKey:
        "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
      abiPath: "path/to/abis",
      infuraProjectId: "mockInfuraProjectId",
      contractAddress: "mockContractAddress",
      contractName: "mockContractName",
      contractProvider: "local",
      chainId: 1337,
    },
    port: 3000,
    wsPort: 3001,
    wsHost: 'localhost',
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should fetch contract using WebSocket transport", async () => {
    const wsTestConfig = {
      port: mockConfig.port,
      wsPort: mockConfig.wsPort,
      wsHost: mockConfig.wsHost,
      web3: {
        ...mockConfig.web3,
        contractProvider: "ws",
      },
    };
    const mockAbi = { abi: "mockAbi", address: "mockContractAddress" };
    (AbiWsProvider.fetch as jest.Mock).mockResolvedValue(mockAbi);
    (ethers.Wallet as any).mockImplementation(() => ({
      address: "0xmock",
    }));
    (ethers.Contract as jest.Mock).mockImplementation(() => ({
      abi: mockAbi,
      address: "mockContractAddress",
      contractProvider: "ws",
    }));

    const provider = new ContractProvider(wsTestConfig);
    const contract = await provider.fetch();

    expect(AbiWsProvider.fetch).toHaveBeenCalledWith(wsTestConfig);
    expect(AbiLocalProvider.fetch).not.toHaveBeenCalled();
    expect(contract.abi).toBe(mockAbi);
    expect(contract.address).toBe("mockContractAddress");
  });

  it("should fetch contract using local transport", async () => {
    const mockAbi = { foo: "value" };
    (AbiLocalProvider.fetch as jest.Mock).mockResolvedValue(mockAbi);
    (ethers.Wallet as any).mockImplementation(() => ({
      address: "0xmock",
    }));
    (ethers.Contract as jest.Mock).mockImplementation(() => ({
      abi: mockAbi,
      address: "mockContractAddress",
      contractProvider: "local",
    }));

    const provider = new ContractProvider(mockConfig);
    const contract = await provider.fetch();

    expect(AbiLocalProvider.fetch).toHaveBeenCalledWith(
      mockConfig.web3.abiPath
    );
    expect(AbiWsProvider.fetch).not.toHaveBeenCalled();
    expect(contract.abi).toBe(mockAbi);
    expect(contract.address).toBe("mockContractAddress");
  });

  it("should throw an error for unsupported network", async () => {
    const unsupportedConfig = {
      ...mockConfig,
      web3: {
        ...mockConfig.web3,
        network: "unsupportedNetwork",
        contractProvider: "unknown",
      },
    } as Config;

    const provider = new ContractProvider(unsupportedConfig);

    await expect(provider.fetch()).rejects.toThrow("Unsupported network");
    expect(AbiLocalProvider.fetch).not.toHaveBeenCalled();
    expect(AbiWsProvider.fetch).not.toHaveBeenCalled();
  });

  it("should throw an error if ABI or contract address is missing", async () => {
    mockConfig.web3.contractProvider = "local";
    (AbiLocalProvider.fetch as jest.Mock).mockResolvedValue({
      abi: null,
      address: null,
    });
    try {
      const provider = new ContractProvider(mockConfig);
      await provider.fetch();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("Missing ABi or contract address");
    }
  });
});
