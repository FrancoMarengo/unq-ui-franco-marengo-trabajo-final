import React, { useEffect } from 'react';
import GridCellWithout from '../atoms/GridCellWithout';
import { useLocation } from 'react-router-dom';

const GameScreen = () => {
    const location = useLocation();
    const { state } = location;
    const { grid, gridWithInfo } = state || {};
    const deserializedGrid = JSON.parse(grid);
    const deserializedGridWithInfo = JSON.parse(gridWithInfo);
    console.log(deserializedGrid)

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(10, 40px)',
        gridTemplateRows: 'repeat(10, 40px)',
        gap: '0px',
        backgroundColor: 'white',
    };

    const generalStyle = {
        display: 'flex',
    }



    return (
        <div style={generalStyle}>
            <div style={gridStyle}>
                {deserializedGrid.map((cell, index) => (
                    <div>
                        <GridCellWithout
                            key={index}
                            isOccupied={deserializedGridWithInfo[index].isOccupied || deserializedGridWithInfo[index].thereIsAShip}
                            isHighlighted={false}>
                            {cell ? <img src={cell.props.src} /> : <div>{cell}</div>}
                        </GridCellWithout>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GameScreen;