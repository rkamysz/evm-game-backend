import { AbiLocalProvider } from "../abi.local-provider";
import { readFile } from "fs/promises";
import { join } from "path";

jest.mock("fs/promises", () => ({
  readFile: jest.fn(),
}));

describe("AbiLocalProvider", () => {
  const mockAbi = { abi: "mockAbi" };

  beforeEach(() => {
    (readFile as jest.Mock).mockReset();
  });

  it("should fetch ABI from a local file", async () => {
    (readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockAbi));
    const result = await AbiLocalProvider.fetch("path/to/abi.json");
    expect(readFile).toHaveBeenCalledWith(
      join(process.cwd(), "path/to/abi.json"),
      "utf8"
    );
    expect(result).toEqual("mockAbi");
  });

  it("should log an error if reading the file fails", async () => {
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const errorMessage = "Error reading file from disk: Error: mock error";
    (readFile as jest.Mock).mockRejectedValue(new Error("mock error"));

    const result = await AbiLocalProvider.fetch("path/to/abi.json");
    expect(readFile).toHaveBeenCalledWith(
      join(process.cwd(), "path/to/abi.json"),
      "utf8"
    );
    expect(result).toBeUndefined();
    expect(consoleErrorSpy).toHaveBeenCalledWith(errorMessage);

    consoleErrorSpy.mockRestore();
  });
});
