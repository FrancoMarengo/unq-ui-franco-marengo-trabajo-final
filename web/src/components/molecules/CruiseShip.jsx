import React from 'react';
import DraggableShip from "../atoms/DraggableShip";
import cruise from "../atoms/img/cruise.png"

const CruiseShip = ({onDrag, rotation}) => {
  
    return (
        <DraggableShip img={cruise} type={'cruise'} cellsToBack={1} cellsToFront={2} onDrag={onDrag} rotation={rotation}/>
    );
  };
  
  export default CruiseShip;