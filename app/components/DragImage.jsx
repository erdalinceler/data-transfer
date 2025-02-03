"use client";

const DragImage = () => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({
        id: 1,
        imageUrl: "/corn.webp",
        title: "Fresh Corn",
        price: "$1.50",
        quantity: 1,
        inStock: true,
      })
    );
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="bg-white/90 p-4 rounded-lg shadow-md"
      style={{ width: "200px", cursor: "move" }}
    >
      <img src="/corn.webp" alt="Draggable corn" style={{ width: "100%" }} />
      <div className="mt-2 text-center">
        <h3 className="text-black font-semibold text-lg">Fresh Corn</h3>
        <p className="text-black font-medium">$1.50</p>
        <p className="text-gray-700 text-sm mt-1">Drag to cart</p>
      </div>
    </div>
  );
};

export default DragImage;
