"use client";
import { useState } from "react";

const DropZone = ({ onItemAdded }) => {
  const [cartItems, setCartItems] = useState([]);

  const handleDrop = (e) => {
    e.preventDefault();

    const data = e.dataTransfer.getData("text/plain");
    const newItem = JSON.parse(data);

    // Add item to cart
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === newItem.id);

      if (existingItem) {
        // If item already exists in cart, increase its quantity
        return prevItems.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      // Add new item to cart
      return [...prevItems, newItem];
    });

    // Send information to parent component
    onItemAdded && onItemAdded(newItem);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDiscard = () => {
    setCartItems([]);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-white/90"
      style={{
        width: "300px",
        minHeight: "400px",
      }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-black">Shopping Cart</h2>
        <button
          onClick={handleDiscard}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
        >
          Discard
        </button>
      </div>
      {cartItems.length === 0 ? (
        <p className="text-gray-700">Drag items here</p>
      ) : (
        <div className="space-y-2">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-100 p-3 rounded shadow-sm"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                style={{ width: "50px" }}
              />
              <span className="text-black font-medium">{item.title}</span>
              <span className="text-gray-700">x{item.quantity}</span>
              <span className="text-black font-semibold">
                ${(item.price.replace("$", "") * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropZone;
