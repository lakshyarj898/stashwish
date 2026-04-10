import React, { useContext } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { FaPiggyBank, FaGift, FaStar } from "react-icons/fa";
import { WishlistContext } from "../context/WishlistContext";
import styles from "./Dashboard.module.css";

const AnimatedNumber = ({ value }) => {
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 100, damping: 15 });
  const rounded = useTransform(spring, (latest) =>
    Math.floor(latest).toLocaleString()
  );

  React.useEffect(() => {
    motionValue.set(value);
  }, [value]);

  return <motion.span>{rounded}</motion.span>;
};

const Dashboard = () => {
  const { wishlistItems, loading } = useContext(WishlistContext);

  const totalSaved = wishlistItems.reduce(
    (sum, item) => sum + (item.savedAmount || 0),
    0
  );
  const goalsReached = wishlistItems.filter(
    (item) => item.savedAmount >= item.targetAmount
  ).length;
  const totalItems = wishlistItems.length;

  const stats = [
    {
      title: "Total Saved",
      value: totalSaved,
      prefix: "",
      icon: <FaPiggyBank />,
      color: "#4caf50",
    },
    {
      title: "Goals Reached",
      value: goalsReached,
      icon: <FaGift />,
      color: "#2196f3",
    },
    {
      title: "Wishlist Items",
      value: totalItems,
      icon: <FaStar />,
      color: "#ff9800",
    },
  ];

  return (
    <motion.div
      className={styles.dashboard}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className={styles.title}>Welcome to StashWish! 🎉</h2>
      <p className={styles.subtitle}>
        Track your savings goals and unlock your wishes.
      </p>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className={styles.cards}>
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className={styles.card}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{ borderColor: stat.color }}
              >
                <div className={styles.icon} style={{ color: stat.color }}>
                  {stat.icon}
                </div>
                <div className={styles.cardContent}>
                  <h3>{stat.title}</h3>
                  <p>
                    <AnimatedNumber value={stat.value} />
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Progress Bars */}
          <div style={{ marginTop: "2rem", width: "100%", maxWidth: "700px" }}>
            <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>
              Goal Progress
            </h3>
            {wishlistItems.map((item, idx) => {
              const percent =
                item.targetAmount > 0
                  ? Math.min(
                      100,
                      Math.round((item.savedAmount / item.targetAmount) * 100)
                    )
                  : 0;
              return (
                <div key={idx} style={{ marginBottom: "1rem" }}>
                  <strong>{item.name}</strong>
                  <div
                    style={{
                      height: "12px",
                      width: "100%",
                      background: "rgba(255,255,255,0.15)",
                      borderRadius: "6px",
                      overflow: "hidden",
                      marginTop: "0.3rem",
                    }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percent}%` }}
                      transition={{ duration: 0.7 }}
                      style={{
                        height: "100%",
                        backgroundColor: "#00e0ff",
                        borderRadius: "6px",
                      }}
                    />
                  </div>
                  <span style={{ fontSize: "0.8rem" }}>
                    USDC {item.savedAmount.toLocaleString()} / 
                    USDC {item.targetAmount.toLocaleString()}
                  </span>
                </div>
              );
            })}
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Dashboard;
