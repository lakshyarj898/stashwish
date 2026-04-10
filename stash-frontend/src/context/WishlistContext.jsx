import React, { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import contractConfig from "../config/contract";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getSignerAndContract = async () => {
    if (!window.ethereum) throw new Error("MetaMask not found");

    await window.ethereum.request({ method: "eth_requestAccounts" });

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    // FIXED: Added a check to ensure we get the actual array from the ABI object
    const abiData = contractConfig.abi.abi ? contractConfig.abi.abi : contractConfig.abi;

    const contract = new ethers.Contract(
      contractConfig.address,
      abiData,
      signer
    );

    return { signer, contract };
  };

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      setError("");

      const { signer, contract } = await getSignerAndContract();
      const userAddress = await signer.getAddress();

      console.log("Fetching wishlist for:", userAddress);

      // Call the smart contract function
      const items = await contract.getWishlist(userAddress);

      const formatted = items.map((item) => ({
        name: item.name,
        flair: item.flair,
        targetAmount: Number(ethers.formatEther(item.targetAmount)),
        savedAmount: Number(ethers.formatEther(item.savedAmount)),
        unlocked: item.unlocked,
      }));

      console.log("Formatted wishlist:", formatted);
      setWishlistItems(formatted);
    } catch (err) {
      console.error("FETCH ERROR:", err);
      setError("Failed to load wishlist. Check if your Local Node is running.");
    } finally {
      setLoading(false);
    }
  };

  const addWishlistItem = async (name, flair, targetAmount) => {
    try {
      setLoading(true);
      setError("");

      const { contract } = await getSignerAndContract();

      const tx = await contract.addWishlistItem(
        name,
        flair,
        ethers.parseEther(targetAmount.toString())
      );

      console.log("Add tx hash:", tx.hash);
      await tx.wait();
      await fetchWishlist();
    } catch (err) {
      console.error("ADD ERROR:", err);
      setError("Failed to add wishlist item");
    } finally {
      setLoading(false);
    }
  };

  const stakeToWishlistItem = async (index, amount) => {
    try {
      setLoading(true);
      setError("");

      const { contract } = await getSignerAndContract();
      const value = ethers.parseEther(amount.toString());

      console.log("Staking Index:", index, "Amount:", amount);

      const tx = await contract.stakeETH(index, {
        value: value,
      });

      await tx.wait();
      await fetchWishlist();
    } catch (err) {
      console.error("STAKE ERROR:", err);
      setError("Staking failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      fetchWishlist();
    }
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addWishlistItem,
        stakeToWishlistItem,
        loading,
        error,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};