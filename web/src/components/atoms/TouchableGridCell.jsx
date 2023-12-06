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
        backgroundColor:  isOccupied ? '#C5D9F0' : '#CAE2FF',
      }}
      onClick={onClick}
    >
        {children}
    </div>
  );
};

export default TouchableGridCell;

