import React from 'react';
import { useDrop } from 'react-dnd';

const GridCell = ({ onDrop, children, isOccupied}) => {
  const [, drop] = useDrop({
    accept: 'ship',
    drop: (item) => onDrop(item),
  });

  return (
    <div
      style={{
        width: '40px',
        height: '40px',
        border: '1px solid #F2E7FF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: isOccupied ? '#C5D9F0' : '#CAE2FF',
      }}
      ref={drop}
    >
      {children}
    </div>
  );
};

export default GridCell;

