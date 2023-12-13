import React from 'react';
import DraggableShip from "../atoms/DraggableShip";
import carrier from "../atoms/img/carrier.png"

const CarrierShip = ({ onDrag, rotation, draggable }) => {

    return (
        <DraggableShip img={carrier} type={'carrier'} cellsToBack={2} cellsToFront={2} onDrag={onDrag} rotation={rotation} draggable={draggable} />
    );
};

export default CarrierShip;