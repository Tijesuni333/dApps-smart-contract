require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

const URL = process.env.URL;
const KEY = process.env.PRIVATE_KEY;



/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: "0.8.19",
  defaultNetwork: "sepolia",
  networks: {
     hardhat: {},
     sepolia: {
        url: URL,
        accounts: [`0x${KEY}`]
     }
  },
};