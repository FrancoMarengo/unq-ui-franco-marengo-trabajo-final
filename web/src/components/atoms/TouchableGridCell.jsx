import React from 'react';

const TouchableGridCell = ({ children, isOccupied, onClick}) => {

  return (
    <div
      style={{
        width: '40px',
        height: '40px',
        border: '1px solid #F2E7FF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:  isOccupied ? 'rgba(197, 217, 240, 0.7)' : 'rgba(202, 226, 255, 0.3)',
      }}
      onClick={onClick}
    >
        {children}
    </div>
  );
};

export default TouchableGridCell;

