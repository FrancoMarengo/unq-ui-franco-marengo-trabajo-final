import React from 'react';
import { useDrag } from 'react-dnd';
import './DraggableShip.css'

const DraggableShip = ({ type, img, cellsToBack, cellsToFront }) => {
  const [, drag] = useDrag({
    type: 'ship',
    item: { type, img, cellsToBack, cellsToFront },
  });

  return (
    <div className='generalContainerDragg'>
      <img src={img} alt={type} ref={drag} className='imageDragg' />
      <text className='textDragg'>{type}</text>
    </div>
  );
};

export default DraggableShip;
