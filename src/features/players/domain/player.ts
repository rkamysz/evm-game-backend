/**
 * @class Player
 * Represents a player entity.
 */
export class Player {
  /**
   * Creates an instance of Player.
   * @param {string} address - The address of the player.
   * @param {number} score - The score of the player.
   */
  constructor(public readonly address: string, public readonly score: number) {}
}
