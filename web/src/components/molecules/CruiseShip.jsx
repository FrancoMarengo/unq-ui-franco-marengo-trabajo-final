import React from 'react';
import DraggableShip from "../atoms/DraggableShip";
import cruise from "../atoms/img/cruise.png"

const CruiseShip = ({ onDrag, rotation, draggable }) => {

    return (
        <DraggableShip img={cruise} type={'cruise'} cellsToBack={1} cellsToFront={2} onDrag={onDrag} rotation={rotation} draggable={draggable} />
    );
};

export default CruiseShip;