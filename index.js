// Normal
// const app = require("express")();
// const port = 8080;

// With middleware.
const express = require("express");
const app = express();
const port = 8080;

app.use(express.json())

let odeleAddress;
let APIAddress;
let TokenAddress;


/******************************************
 * D  E P L O Y   T E S T   T O K E N .
 * *************************************/

const { ethers } = require("hardhat")

async function main1() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Token = await ethers.getContractFactory("TestToken");
  const token = await Token.deploy();

  console.log("Token address:", token.address);
  TokenAddress = token.address
}

main1()
  .then(() => 
  	// process.exit(0)
  	{})
  .catch((error) => {
    console.error(error);
    // process.exit(1);
});


let deployedOdele;


/******************************************
 * D  E P L O Y   O D E L E   W A L L E T .
 * *************************************/



// Deploy the contract
async function main2() {
  // const [deployer] = await ethers.getSigners();
  // This will crash with require("ethers") so a new variable, ethersAddress was set so as to get a valid wallet address.
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // console.log("Account balance:", (await deployer.getBalance()).toString());

  const odele = await ethers.getContractFactory("OdeleWallet");
  const _odele = await odele.deploy(deployer.address);

  console.log("Wallet address:", _odele.address);
  console.log("API address:", deployer.address);
  odeleAddress = _odele.address
  deployedOdele = _odele
}

main2()
  .then(() => 
  	// process.exit(0)
  	{})
  .catch((error) => {
    console.error(error);
    // process.exit(1);
  });

// App variable.
// app.listen(port_variable, desired_function () => code)
app.listen(
	port,
	() => console.log(`It's alive on http://localhost:${port}`)
)

// `node .` to run index.js

// Endpoint 1.
// app_variable.endpoint(link, function (request_data, response))
app.get("/shirts", (req, res) => {
	res.status(200).send({
		address: odeleAddress,
	})
});



async function transact(_address, _owner, _receiver, _amount) {

	const signer = await ethers.getSigner();
	let b = 0
	// Now you can call functions of the contract
	try {
		 await deployedOdele.withdrawTokensForPromotion(
			_address, _owner, _receiver, _amount
		);
		 b = 1
	}
	catch(err) {
		b = 0
	}
	finally
	{
		return b
	}
}

async function addSupport(_address) {
	const signer = await ethers.getSigner();

	let b = 0
	try{
		// Now you can call functions of the contract
		await deployedOdele.addSupportForToken(
			_address
		);
		b = 1
	}
	catch(err) {
		b = 0
	}
	finally{
		return b
	}

}

/**
 * Requires: 
 * - Token address
 * - Owner
 * - Receiver
 * - Amount
 * */
app.post("/withdraw", (req, res) => {
	const address = req.body.tokenAddress;
	const owner = req.body.owner
	const receiver = req.body.receiver
	const amount = req.body.amount;

	// let value = transact(
	// 	address,
	// 	owner,
	// 	receiver,
	// 	amount
	// );

	let value = addSupport(
		address
	);

	if (value == "[object Promise]") {
		res.status(400).send({
			message: `Transaction reverted ${value}`
		})
	}
	else{
		res.status(200).send({
			message: `The value is${value}.`
		})
	}
})