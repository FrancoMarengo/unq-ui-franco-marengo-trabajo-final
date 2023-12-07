import React from 'react';
import { useDrop } from 'react-dnd';

const GridCell = ({ onDrop, onDragOver, children, isOccupied, isHighlighted }) => {
  const [, drop] = useDrop({
    accept: 'ship',
    drop: (item) => onDrop(item),
  });

  const backgroundColor = isOccupied
  ? isHighlighted
    ? 'rgba(255, 0, 0, 0.7)'
    : 'rgba(197, 217, 240, 0.7)'  // Color cuando está solo ocupado
  : isHighlighted ? 'rgba(144, 238, 144, 0.7)' : 'rgba(202, 226, 255, 0.3)'; // Color normal

  return (
    <div
      style={{
        width: '40px',
        height: '40px',
        border: '1px solid #F2E7FF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: backgroundColor,
      }}
      ref={drop}
      onDragOver={onDragOver}
    >
      {children}
    </div>
  );
};

export default GridCell;

