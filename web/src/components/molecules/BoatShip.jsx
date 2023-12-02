import React from 'react';
import DraggableShip from "../atoms/DraggableShip";
import boat from "../atoms/img/boat.png"

const BoatShip = ({onDrag, rotation}) => {
  
    return (
        <DraggableShip img={boat} type={'boat'} cellsToBack={0} cellsToFront={1} onDrag={onDrag} rotation={rotation} />
    );
  };
  
  export default BoatShip;