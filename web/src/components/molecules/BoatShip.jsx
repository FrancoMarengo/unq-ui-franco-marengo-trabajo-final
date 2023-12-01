import React from 'react';
import DraggableShip from "../atoms/DraggableShip";
import boat from "../atoms/img/boat.png"

const BoatShip = () => {
  
    return (
        <DraggableShip img={boat} type={'boat'} cellsToBack={0} cellsToFront={1}/>
    );
  };
  
  export default BoatShip;