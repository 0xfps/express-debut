// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IOdeleWallet} from "./interfaces/IOdeleWallet.sol";

/**
* @title Odele Wallet.
* @author Daccred.
* @dev Odele Wallet, a pay-to-promote service.
*/
contract OdeleWallet is IOdeleWallet {
    /// @dev Address of calling API [contract owner].
    address internal API;
    /// @dev    Map of all supported tokens, which can be set
    ///         or unset by API.
    mapping(IERC20 => bool) private supportedTokens;

    /// @dev    Modifier to validate that all calls 
    ///         will be made from the API.
    modifier onlyOwner() {
        require(msg.sender == API, "ODELE_WALLET: Call not from API.");
        _;
    }

    /// @dev Set API address.
    constructor(address _API) {
        require(_API != address(0), "0x0 API.");
        API = _API;
    }

    /// @dev    Adds support for a token.
    ///         Emits the {AddSupportForToken} event.
    /// @param _token Desired token. 
    function addSupportForToken(IERC20 _token) public onlyOwner {
        supportedTokens[_token] = true;
        emit AddSupportForToken(_token);
    }

    /// @dev    Removes support for a token.
    ///         Emits the {RemoveSupportForToken} event.
    /// @param _token Desired token. 
    function removeSupportForToken(IERC20 _token) public onlyOwner {
        supportedTokens[_token] = false;
        emit RemoveSupportForToken(_token);
    }

    /// @inheritdoc IOdeleWallet
    /// @notice `msg.sender` must approve `OdeleWallet` contract.
    function withdrawTokensForPromotion(
        IERC20 _token,
        address _owner,
        address _receiver,
        uint256 _amount
    ) public override onlyOwner returns(bool)
    {
        /// @dev Run checks.
        _beforeWithdrawal(
            _token, 
            _owner, 
            _receiver, 
            _amount
        );

        /// @dev    Revert if the allowance of this contract is less
        ///         than the amount to be withdrawn.
        if (
            IERC20(_token).allowance(_owner, address(this)) < _amount
        ) revert InsufficientFundsError();

        /// @dev Send tokens to `_receiver`.
        bool sent = IERC20(_token).transferFrom(
            _owner,
            _receiver, // [or should it be `API`?],
            _amount
        );

        /// @dev Ensure funds were sent.
        require(sent, "Funds not collected.");

        return(true);
    }

    /**
    * @dev  Run basic checks.
    *
    * @param _token     ERC20 token.
    * @param _owner     Caller [Who must approve the contract to spend his tokens].
    * @param _amount    Amount to be withdrawn per call.
    */
    function _beforeWithdrawal(
        IERC20 _token,
        address _owner,
        address _receiver,
        uint256 _amount
    ) private view
    {
        if (!supportedTokens[_token]) revert UnsupportedToken();
        if (_owner == address(0)) revert OwnershipByZeroAddressError();
        if (_receiver == address(0)) revert WithdrawalToZeroAddressError();
        if (_amount == 0) revert ZeroWithdrawalError();
    }
}