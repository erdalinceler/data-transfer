"use client";
import DragImage from "./components/DragImage";
import DropZone from "./components/DropZone";

interface DragItem {
  id: number;
  title: string;
  price: string;
}

export default function Home() {
  const handleItemAdded = (item: DragItem) => {
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
    </div>
  );
}
