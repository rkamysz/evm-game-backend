// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Leaderboard {
    struct Player {
        address playerAddress;
        uint score;
    }

    Player[] public players;

    function addPlayer(address _playerAddress, uint _score) public {
        players.push(Player(_playerAddress, _score));
    }

    function getPlayers() public view returns (Player[] memory) {
        return players;
    }

    function getPlayerCount() public view returns (uint) {
        return players.length;
    }

    function test() public pure returns (string memory) {
        return "Contract is working";
    }
}
