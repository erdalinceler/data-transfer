"use client";
import { useState } from "react";

const DropZone = ({ onItemAdded }) => {
  const [inventorySlots, setInventorySlots] = useState(
    Array(4).fill({ item: null, quantity: 0 })
  );

  const handleDrop = (e, slotIndex) => {
    e.preventDefault();

    const data = e.dataTransfer.getData("text/plain");
    const newItem = JSON.parse(data);

    console.log("Dragged data:", newItem);

    const itemToAdd = {
      id: newItem.type || newItem.id,
      title: newItem.label || newItem.title,
      imageUrl: newItem.imageUrl || "",
      price: newItem.price || "0",
      className: newItem.className || "",
    };

    console.log("Processed data:", itemToAdd);
    console.log("Target slot:", slotIndex);

    setInventorySlots((prevSlots) => {
      const newSlots = [...prevSlots];

      if (!newSlots[slotIndex].item) {
        newSlots[slotIndex] = {
          item: itemToAdd,
          quantity: 1,
        };
        console.log("New item added");
      } else if (newSlots[slotIndex].item.id === itemToAdd.id) {
        newSlots[slotIndex] = {
          item: itemToAdd,
          quantity: newSlots[slotIndex].quantity + 1,
        };
        console.log("Existing item quantity increased");
      }

      return newSlots;
    });

    onItemAdded && onItemAdded(itemToAdd);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDiscard = () => {
    setInventorySlots(Array(4).fill({ item: null, quantity: 0 }));
  };

  return (
    <div
      className="bg-white/90 rounded-lg shadow-lg p-4"
      style={{ width: "300px" }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-black">Inventory</h2>
        <button
          onClick={handleDiscard}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
        >
          Discard All
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {inventorySlots.map((slot, index) => (
          <div
            key={index}
            onDrop={(e) => handleDrop(e, index)}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-gray-300 rounded-lg p-3 h-32 flex flex-col items-center justify-center bg-gray-50 relative"
          >
            {slot.item ? (
              <>
                <img
                  src={slot.item.imageUrl}
                  alt={slot.item.title}
                  className="w-16 h-16 object-contain mb-2"
                />
                <span className="text-sm font-medium text-black">
                  {slot.item.title}
                </span>
                <span className="text-xs text-gray-600">
                  $
                  {(slot.item.price.replace("$", "") * slot.quantity).toFixed(
                    2
                  )}
                </span>
                <span className="absolute top-1 right-1 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  x{slot.quantity}
                </span>
              </>
            ) : (
              <p className="text-gray-400 text-sm">Empty Slot</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropZone;
