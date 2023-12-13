import React from 'react';
import { useDrop } from 'react-dnd';
import './GridCell.css'

const GridCell = ({ onDrop, onDragOver, children, isOccupied, isHighlighted }) => {
  const [, drop] = useDrop({
    accept: 'ship',
    drop: (item) => onDrop(item),
  });

  const backgroundColor = isOccupied
    ? isHighlighted
      ? 'rgba(255, 0, 0, 0.7)'
      : 'rgba(197, 217, 240, 0.7)'
    : isHighlighted ? 'rgba(144, 238, 144, 0.7)' : 'rgba(202, 226, 255, 0.3)';

  return (
    <div
      className='gridCell'
      style={{
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

