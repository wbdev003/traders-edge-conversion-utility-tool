import React from "react";
import { useDrag } from "react-dnd";
import { ReactNode } from "react";

interface IDragCard {
  name: ReactNode;
}

const DragCard = ({ name }: IDragCard) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "language",
    item: { name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div>
      <div ref={dragRef}>
        {name}
        {isDragging && "📂"}
      </div>
    </div>
  );
};

export default DragCard;
