import React from "react";
import styles from "./Wishlist.module.css";

const WishlistCard = ({ item, onDelete }) => {
  const {
    name,
    targetAmount = 0,
    savedAmount = 0,
    flair,
  } = item;

  // ✅ Safe progress calculation (never NaN)
  const progress =
    targetAmount > 0
      ? Math.min((savedAmount / targetAmount) * 100, 100)
      : 0;

  return (
    <div className={styles.card}>
      {/* Flair badge */}
      {flair && <span className={styles.flair}>{flair}</span>}

      <div className={styles.content}>
        <h3 className={styles.title}>{name}</h3>

        {/* ✅ USDC-based display */}
        <p className={styles.amount}>
          Saved: {savedAmount} USDC / {targetAmount} USDC
        </p>

        {/* Progress bar */}
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress text / unlock */}
        {progress >= 100 ? (
          <button className={styles.unlockBtn}>
            🎉 Ready to Unlock
          </button>
        ) : (
          <p className={styles.progressText}>
            {progress.toFixed(2)}% funded
          </p>
        )}

        {/* Delete */}
        <button onClick={onDelete} className={styles.deleteBtn}>
          🗑 Delete
        </button>
      </div>
    </div>
  );
};

export default WishlistCard;
