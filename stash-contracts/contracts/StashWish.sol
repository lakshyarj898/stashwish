// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract StashWish {

    struct WishlistItem {
        string name;
        string flair;
        uint256 targetAmount;
        uint256 savedAmount;
        bool unlocked;
    }

    mapping(address => WishlistItem[]) public userWishlists;

    function addWishlistItem(
        string memory name,
        string memory flair,
        uint256 targetAmount
    ) external {
        userWishlists[msg.sender].push(
            WishlistItem(name, flair, targetAmount, 0, false)
        );
    }

    function stakeETH(uint256 index) external payable {
        require(msg.value > 0, "Send ETH");

        userWishlists[msg.sender][index].savedAmount += msg.value;
    }

    function getWishlist(address user)
        external
        view
        returns (WishlistItem[] memory)
    {
        return userWishlists[user];
    }
}