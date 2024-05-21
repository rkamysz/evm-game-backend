const express = require('express');
const fs = require('fs');
const path = require('path');
const hre = require("hardhat");

const app = express();
const port = 3003;

const dataPath = path.join(__dirname, '..', 'deployed_contracts.json');

app.get('/contracts', (req, res) => {
  if (fs.existsSync(dataPath)) {
    const data = fs.readFileSync(dataPath, 'utf-8');
    res.json(JSON.parse(data));
  } else {
    res.status(404).send('Contracts data not found');
  }
});

app.get('/accounts', async (req, res) => {
  try {
    const accounts = await hre.network.provider.send("eth_accounts");
    const privateKeys = [];

    for (let account of accounts) {
      const privateKey = await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [account]
      });
      privateKeys.push({
        account,
        privateKey
      });
    }

    res.json({ accounts, privateKeys });
  } catch (error) {
    res.status(500).send('Error getting accounts and private keys: ' + error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
