import React from 'react';

const GridCellWithout = ({ children, isOccupied, isHighlighted}) => {

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
        border: '1px solid red',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: backgroundColor,
      }}
    >
        {children}
    </div>
  );
};

export default GridCellWithout;

