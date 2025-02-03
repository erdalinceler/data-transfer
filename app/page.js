"use client";
import { useState } from "react";
import DragImage from "./components/DragImage";
import DropZone from "./components/DropZone";

export default function Home() {
  const [totalItems, setTotalItems] = useState(0);

  const handleItemAdded = (item) => {
    setTotalItems((prev) => prev + 1);
    console.log(`Added to cart: ${item.title}`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center gap-8 p-8">
      <div className="flex flex-col gap-4">
        <DragImage item={{ id: 1, title: "Fresh Corn", price: "$1.50" }} />
        <DragImage item={{ id: 2, title: "Sweet Corn", price: "$1.75" }} />
      </div>
      <DropZone onItemAdded={handleItemAdded} />
      <div className="fixed top-4 right-4">Total Items: {totalItems}</div>
    </div>
  );
}
