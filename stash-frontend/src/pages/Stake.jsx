import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { FaRocket, FaCoins, FaChartLine } from "react-icons/fa";
import { WishlistContext } from "../context/WishlistContext";
import styles from "./Stake.module.css";

const Stake = () => {
  const {
    wishlistItems,
    stakeToWishlistItem,
    loading,
    error,
  } = useContext(WishlistContext);

  const [selectedIndex, setSelectedIndex] = useState("");
  const [stakeAmount, setStakeAmount] = useState("");

  const handleStake = async () => {
    if (selectedIndex === "" || Number(stakeAmount) <= 0) return;

    try {
      await stakeToWishlistItem(
        Number(selectedIndex),
        Number(stakeAmount)
      );

      setStakeAmount("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.div
      className={styles.stakePage}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className={styles.title}>🚀 Stake ETH for Your Wishlist</h2>
      <p className={styles.subtitle}>
        Save ETH towards your wishlist goals.
      </p>

      <motion.div
        className={styles.stakeCard}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className={styles.iconArea}>
          <FaRocket className={styles.icon} />
        </div>

        <div className={styles.formArea}>

          {/* SELECT WISHLIST ITEM */}
          <label>Select Wishlist Item</label>
          <select
            value={selectedIndex}
            onChange={(e) => setSelectedIndex(e.target.value)}
          >
            <option value="">-- Select --</option>
            {wishlistItems.map((item, index) => (
              <option key={index} value={index}>
                {item.name}
              </option>
            ))}
          </select>

          {/* STAKE AMOUNT */}
          <label>Stake Amount (ETH)</label>
          <input
            type="number"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
            placeholder="e.g. 0.01"
          />

          <button
            className={styles.stakeButton}
            onClick={handleStake}
            disabled={loading || !stakeAmount || selectedIndex === ""}
          >
            {loading ? "Staking..." : "Stake ETH"}
          </button>

          {/* STATS */}
          {selectedIndex !== "" && wishlistItems[selectedIndex] && (
            <div className={styles.stats}>
              <div>
                <FaCoins /> Saved:{" "}
                {wishlistItems[selectedIndex].savedAmount} ETH
              </div>
              <div>
                <FaChartLine /> Target:{" "}
                {wishlistItems[selectedIndex].targetAmount} ETH
              </div>
            </div>
          )}

          {error && <p style={{ color: "red" }}>{error}</p>}

        </div>
      </motion.div>
    </motion.div>
  );
};

export default Stake;
