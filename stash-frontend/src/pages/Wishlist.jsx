import React, { useContext, useState } from "react";
import { WishlistContext } from "../context/WishlistContext";
import WishlistCard from "../components/WishlistCard";

const Wishlist = () => {
  const {
    wishlistItems,
    addWishlistItem,
    loading,
    error,
  } = useContext(WishlistContext);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    targetAmount: "",
    flair: "",
  });

const handleAddItem = async (e) => {
  e.preventDefault();

  await addWishlistItem(
    formData.name,
    formData.flair,
    formData.targetAmount
  );

  setFormData({ name: "", targetAmount: "", flair: "" });
  setShowModal(false);
};


  return (
    <div
      style={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ marginBottom: "2rem", textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem" }}>My Wishlist</h2>

        <button
          onClick={() => setShowModal(true)}
          style={{
            marginTop: "1rem",
            padding: "0.75rem 1.5rem",
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "1rem",
          }}
        >
          + Add Wishlist Item
        </button>
      </div>

      {loading && <p>Loading wishlist...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1.5rem",
          justifyContent: "center",
        }}
      >
        {wishlistItems.length === 0 && !loading && (
          <p>No wishlist items yet</p>
        )}

        {wishlistItems.map((item, index) => (
          <WishlistCard key={index} item={item} />
        ))}
      </div>

      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <form
            onSubmit={handleAddItem}
            style={{
              background: "#fff",
              padding: "2rem",
              borderRadius: "10px",
              width: "300px",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <h3>Add New Item</h3>

            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />

            <input
              type="number"
              placeholder="Target Amount (ETH)"
              value={formData.targetAmount}
              onChange={(e) =>
                setFormData({ ...formData, targetAmount: e.target.value })
              }
              required
            />

            <input
              type="text"
              placeholder="Flair (electronics, travel...)"
              value={formData.flair}
              onChange={(e) =>
                setFormData({ ...formData, flair: e.target.value })
              }
            />

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                type="submit"
                style={{
                  background: "#28a745",
                  color: "#fff",
                  padding: "0.5rem 1rem",
                  borderRadius: "5px",
                }}
              >
                Add
              </button>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={{
                  background: "#dc3545",
                  color: "#fff",
                  padding: "0.5rem 1rem",
                  borderRadius: "5px",
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
