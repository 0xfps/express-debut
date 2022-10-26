// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
* @title Test Token.
* @author Daccred.
* @dev Test Token, for testing OdeleWallet.
*/
contract TestToken is ERC20 {
    constructor() ERC20("TestToken", "$TSTK") {
        _mint(msg.sender, (1000 * 10e18));
    }
}