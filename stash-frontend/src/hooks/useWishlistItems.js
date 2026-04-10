import { useEffect, useState } from "react";
import { ethers } from "ethers";
import StashWishABI from "../config/StashWishABI.json";

const CONTRACT_ADDRESS = "0xcFe2DB3414149b3C856Cb59FC3bB8FBF622600F6";

const useWishlistItems = () => {

const [items, setItems] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

const fetchWishlist = async () => {


try {

  if (!window.ethereum) {
    throw new Error("MetaMask not found");
  }

  await window.ethereum.request({ method: "eth_requestAccounts" });

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const userAddress = await signer.getAddress();

  console.log("Fetching wishlist for:", userAddress);

  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    StashWishABI,
    provider
  );

  const rawItems = await contract.getWishlist(userAddress);

  console.log("Raw wishlist:", rawItems);

  const formatted = rawItems.map((item) => ({
    name: item.name,
    flair: item.flair,

    // convert wei → ETH
    targetAmount: Number(
      ethers.formatEther(item.targetAmount)
    ),

    savedAmount: Number(
      ethers.formatEther(item.savedAmount)
    ),

    unlocked: item.unlocked,
  }));

  console.log("Formatted wishlist:", formatted);

  setItems(formatted);

} catch (err) {

  console.error("Wishlist fetch error:", err);
  setError("Failed to load wishlist from blockchain");

} finally {

  setLoading(false);

}


};

useEffect(() => {
fetchWishlist();
}, []);

return { items, loading, error, refresh: fetchWishlist };
};

export default useWishlistItems;
