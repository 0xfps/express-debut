// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
* @title Odele Wallet Interface.
* @author Daccred.
* @dev Interface for Odele wallet.
*/
interface IOdeleWallet {
    /// @dev Emitted if 0 is to be withdrawn.
    error ZeroWithdrawalError();
    /// @dev Emitted if the address owning tokens is a zero address.
    error OwnershipByZeroAddressError();
    /// @dev Emitted if passed receiver address is a zero address.
    error WithdrawalToZeroAddressError();
    /// @dev Emitted if the token to be withdrawn is not supported.
    error UnsupportedToken();
    /// @dev Emitted if the contract allowance is GT `_amount`.
    error InsufficientFundsError();

    /// @dev Emitted whenever support for a token is added.
    event AddSupportForToken(IERC20 _token);
    /// @dev Emitted whenever support for a token is removed.
    event RemoveSupportForToken(IERC20 _token);
    /// @dev    Emitted whenever a `withdrawTokensForPromotion()` 
    ///         call is successful.
    event WithdrawnForPromotion(
        IERC20 _token,
        address _owner,
        uint256 _amount
    );

    /**
    * @dev  Withdraws `_amount` amount of `_token` on behalf of the caller
    *       for promotions.
    *       Calls are made with the API as the msg.sender.
    *       If this contract's allowance is lower than the amount to be 
    *       withdrawn, it halts.
    *
    * @notice   `msg.sender` will approve this contract on the token contract.
    *           There's no way to approve tokens in another contract from another
    *           contract. [This @notice block will be removed on code approval.]
    *
    * @param _token     ERC20 token.
    * @param _owner     Caller [Who must approve the contract to spend his tokens].
    * @param _receiver  Address receiving tokens.
    * @param _amount    Amount to be withdrawn per call.
    */
    function withdrawTokensForPromotion(
        IERC20 _token,
        address _owner,
        address _receiver,
        uint256 _amount
    ) external returns(bool);
}
