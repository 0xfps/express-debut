const { ethers } = require("hardhat")

// For new address development
var ethersAddress = require('ethers')
var crypto = require('crypto')

const id = crypto.randomBytes(32).toString('hex')
const privateKey = "0x"+id
console.log(`SAVE BUT DO NOT SHARE THIS: ${privateKey} \n`)

const wallet = new ethersAddress.Wallet(privateKey)
console.log(`API Address @ ${wallet.address} \n`)

// Deploy the contract
async function main() {
  // const [deployer] = await ethers.getSigners();
  // This will crash with require("ethers") so a new variable, ethersAddress was set so as to get a valid wallet address.
  const deployer = wallet.address;

  console.log("Deploying contracts with the account:", deployer);

  // console.log("Account balance:", (await deployer.getBalance()).toString());

  const odele = await ethers.getContractFactory("OdeleWallet");
  const _odele = await odele.deploy(wallet.address);

  console.log("Wallet address:", _odele.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });