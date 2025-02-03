"use client";
import { useState } from "react";
import DragImage from "./components/DragImage";
import DropZone from "./components/DropZone";

interface DragItem {
  id: number;
  title: string;
  price: string;
}

export default function Home() {
  const [totalItems, setTotalItems] = useState(0);

  const handleItemAdded = (item: DragItem) => {
    setTotalItems((prev) => prev + 1);
    console.log("Item added:", item);
  };

  return (
    <div className="flex min-h-screen items-center justify-center gap-16 p-8">
      <div>
        <DragImage />
      </div>
      <div>
        <DropZone onItemAdded={handleItemAdded} />
      </div>
      <div className="fixed top-4 right-4">Total Items: {totalItems}</div>
    </div>
  );
}
