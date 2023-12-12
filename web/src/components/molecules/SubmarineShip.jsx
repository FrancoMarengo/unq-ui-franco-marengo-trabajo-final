import React from 'react';
import DraggableShip from "../atoms/DraggableShip";
import submarine from "../atoms/img/submarine.png"

const SubmarineShip = ({onDrag, rotation, draggable}) => {
  
    return (
        <DraggableShip img={submarine} type={'submarine'} cellsToBack={1} cellsToFront={1} onDrag={onDrag} rotation={rotation} style={{ transform: `rotate(${rotation}deg)` }} draggable={draggable}/>
    );
  };
  
  export default SubmarineShip;