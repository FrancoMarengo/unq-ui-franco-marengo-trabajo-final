import React from 'react';
import './TouchableGridCell.css'

const TouchableGridCell = ({ children, isOccupied, onClick, cursor }) => {

  return (
    <div
      className='touchableGridCell'
      style={{
        backgroundColor: isOccupied ? 'rgba(197, 217, 240, 0.7)' : 'rgba(202, 226, 255, 0.3)',
        cursor: cursor ? 'pointer' : 'default'
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default TouchableGridCell;

