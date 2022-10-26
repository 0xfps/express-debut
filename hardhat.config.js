/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
module.exports = {
  solidity: "0.8.17",
  networks: {
    development: {
      url: "localhost",
      port: 8545,
      network_id: "*", // Match any network id
      gas: 5000000
	}
  }
};
