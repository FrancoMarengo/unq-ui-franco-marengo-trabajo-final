import React, { useState } from 'react';

import GridCell from '../atoms/GridCell';
import BoatShip from '../molecules/BoatShip';
import SubmarineShip from '../molecules/SubmarineShip';
import CarrierShip from '../molecules/CarrierShip';
import CruiseShip from '../molecules/CruiseShip';
import './GameBoard.css'

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(10, 40px)',
  gridTemplateRows: 'repeat(10, 40px)',
  gap: '1px',
};

const GameBoard = () => {
  const [grid, setGrid] = useState(Array(100).fill(null));
  const [gridWithInfo, setGridWithInfo] = useState(Array(100).fill({ isOccupied: false, thereIsAShip: false }));

  const handleDrop = (item, index) => {
    const newGrid = [...grid];
    const newgridWithInfo = { ...gridWithInfo };

    function setOccupiedRange() {
      var start = 0;
      var end = 0;
      var gridCellsWithShip = [];
      if ((index - item.cellsToBack) % 10 !== 0) {
        if ((index + (item.cellsToFront + 1)) % 10 === 0) {
          start = index - (item.cellsToBack + 1);
          end = index + item.cellsToFront;
          gridCellsWithShip = Array.from({ length: end - start }, (_, index) => start + index + 1);
        } else {
          start = index - (item.cellsToBack + 1);
          end = index + (item.cellsToFront + 1);
          gridCellsWithShip = Array.from({ length: end - start - 1 }, (_, index) => start + index + 1);
        };
      } else {
        start = index - item.cellsToBack;
        end = index + (item.cellsToFront + 1);
        gridCellsWithShip = Array.from({ length: end - start }, (_, index) => start + index);
      };

      for (let i = start; i <= end; i++) {
        if (gridCellsWithShip.includes(i)) {
          newgridWithInfo[i] = { isOccupied: true, thereIsAShip: true }
          newgridWithInfo[i - 10] = { isOccupied: true, thereIsAShip: false }
          newgridWithInfo[i + 10] = { isOccupied: true, thereIsAShip: false }
        } else {
          newgridWithInfo[i] = { isOccupied: true, thereIsAShip: false }
          newgridWithInfo[i - 10] = { isOccupied: true, thereIsAShip: false }
          newgridWithInfo[i + 10] = { isOccupied: true, thereIsAShip: false }
        }
      };
    };

    const start = Math.max(0, index - item.cellsToBack);
    const end = Math.min(99, index + item.cellsToFront);
    const gridCellsWithShip = Array.from({ length: end - start + 1 }, (_, i) => start + i);

    const notOccupiedrange = gridCellsWithShip.every((i) => !newgridWithInfo[i].isOccupied);
    const notOutOfGrid = index % 10 <= 9 - item.cellsToFront && index % 10 >= item.cellsToBack


    if (notOutOfGrid && notOccupiedrange) {

      newGrid[index] = <img src={item.img} className={item.type} />;
      setOccupiedRange();

    }
    setGridWithInfo(newgridWithInfo);
    setGrid(newGrid);
  };

  return (
    <div className='generalContainerGBoard'>
      <div style={gridStyle}>
        {grid.map((cell, index) => (
          <div>
          <GridCell key={index} onDrop={(item) => handleDrop(item, index)} isOccupied={gridWithInfo[index].isOccupied || gridWithInfo[index].thereIsAShip}>
            {cell && <div>{cell}</div>}
          </GridCell>
          </div>
        ))}
      </div>
      <div>
      <SubmarineShip />
      <BoatShip />
      <CarrierShip />
      <CruiseShip />
      </div>
    </div>
  );
};

export default GameBoard;
