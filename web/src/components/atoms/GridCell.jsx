import React from 'react';
import { useDrop } from 'react-dnd';

const GridCell = ({ onDrop, onDragOver, children, isOccupied, isHighlighted }) => {
  const [, drop] = useDrop({
    accept: 'ship',
    drop: (item) => onDrop(item),
  });

  const backgroundColor = isOccupied
  ? isHighlighted
    ? 'red'
    : '#C5D9F0'   // Color cuando está solo ocupado
  : isHighlighted ? 'lightgreen' : '#CAE2FF'; // Color normal

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

