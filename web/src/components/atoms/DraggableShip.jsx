import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import './DraggableShip.css'

const DraggableShip = ({ type, img, cellsToBack, cellsToFront, onDrag, rotation }) => {
  const [, drag] = useDrag({
    type: 'ship',
    item: { type, img, cellsToBack, cellsToFront },
    collect: (monitor) => {
      const isDragging = !!monitor.isDragging();
      const draggedItem = monitor.getItem();

      if (isDragging) {
        onDrag(draggedItem);
      }

      return {
        isDragging,
        draggedItem,
      };
    },
  });

  return (
    <div className='generalContainerDragg'>
      <img src={img} alt={type} ref={drag} className='imageDragg' style={{ transform: `rotate(${rotation}deg)` }}/>
      <span className='textDragg'>{type}</span>
    </div>
  );
};

export default DraggableShip;
