import React from 'react';
import DraggableShip from "../atoms/DraggableShip";
import submarine from "../atoms/img/submarine.png"

const SubmarineShip = () => {
  
    return (
        <DraggableShip img={submarine} type={'submarine'} cellsToBack={1} cellsToFront={1}/>
    );
  };
  
  export default SubmarineShip;