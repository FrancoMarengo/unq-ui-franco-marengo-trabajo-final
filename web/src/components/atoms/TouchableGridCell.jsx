import React from 'react';

const TouchableGridCell = ({ children, isOccupied, onClick, cursor}) => {

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
        cursor: cursor ? 'pointer' : 'default'
      }}
      onClick={onClick}
    >
        {children}
    </div>
  );
};

export default TouchableGridCell;

