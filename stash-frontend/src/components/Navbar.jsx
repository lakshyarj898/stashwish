import React, { useState, useContext } from "react"; // 1. Added useContext here
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { WishlistContext } from "../context/WishlistContext"; // 2. Added WishlistContext import

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [account, setAccount] = useState("");

  // 3. Initialize the fetchWishlist function from context
  const { fetchWishlist } = useContext(WishlistContext);

  // 🔥 Connect Wallet Function
  async function connectWallet() {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        
        const userAccount = accounts[0];
        setAccount(userAccount);

        // 4. Trigger the wishlist load immediately after successful connection
        if (userAccount) {
          fetchWishlist();
        }
        
      } else {
        alert("Please install MetaMask");
      }
    } catch (error) {
      console.error("Connection error:", error);
    }
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>StashWish</div>

      {/* 🔹 Menu Button (optional for mobile) */}
      <div>
        <button
          className={styles.menuToggle}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* 🔹 Navigation Links */}
      <ul className={`${styles.navLinks} ${menuOpen ? styles.active : ""}`}>
        <li>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/wishlist" onClick={() => setMenuOpen(false)}>
            Wishlist
          </Link>
        </li>
        <li>
          <Link to="/stake" onClick={() => setMenuOpen(false)}>
            Stake
          </Link>
        </li>
        <li>
          <Link to="/profile" onClick={() => setMenuOpen(false)}>
            Profile
          </Link>
        </li>
      </ul>

      {/* 🔥 CONNECT WALLET BUTTON */}
      <button
        onClick={connectWallet}
        style={{
          marginLeft: "20px",
          padding: "8px 12px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          backgroundColor: "#6c63ff",
          color: "white",
        }}
      >
        {account
          ? account.slice(0, 6) + "..." + account.slice(-4)
          : "Connect Wallet"}
      </button>
    </nav>
  );
};

export default Navbar;