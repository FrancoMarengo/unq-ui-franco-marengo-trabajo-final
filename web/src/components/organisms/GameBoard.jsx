import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [draggedShip, setDraggedShip] = useState(null);
  const [highlightedCells, setHighlightedCells] = useState([]);
  const [shipsRotation, setShipsRotation] = useState(0);
  const navigate = useNavigate();


  const handleDrop = (item, index) => {
    const newGrid = [...grid];
    const newgridWithInfo = { ...gridWithInfo };

    function setOccupiedRange() {
      var start = 0;
      var end = 0;
      var gridCellsWithShip = [];
      if (shipsRotation === 0) {
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
      } else {
        if (Math.floor((index - 10 * item.cellsToBack) / 10) > 0) { //No toca la parte de arriba
          if ((index + 10 * item.cellsToFront) / 10 >= 9) { //Toca la parte de abajo
            start = index - 10 * (item.cellsToBack + 1);
            end = index + 10 * item.cellsToFront;
            gridCellsWithShip = Array.from({ length: (end - start - 10) / 10 + 1 }, (_, index) => start + 10 + index * 10);
          } else {
            start = index - 10 * (item.cellsToBack + 1);
            end = index + 10 * (item.cellsToFront + 1);
            gridCellsWithShip = Array.from({ length: (end - start - 20) / 10 }, (_, index) => start + 10 + index * 10);
          };
        } else {
          start = index - 10 * item.cellsToBack;
          end = index + 10 * (item.cellsToFront + 1);
          gridCellsWithShip = Array.from({ length: (end - start) / 10 }, (_, index) => start + index * 10);
        };

        for (let i = start; i <= end; i += 10) {
          if (i % 10 == 9) {
            if (gridCellsWithShip.includes(i)) {
              newgridWithInfo[i] = { isOccupied: true, thereIsAShip: true }
              newgridWithInfo[i - 1] = { isOccupied: true, thereIsAShip: false }
            } else {
              newgridWithInfo[i] = { isOccupied: true, thereIsAShip: false }
              newgridWithInfo[i - 1] = { isOccupied: true, thereIsAShip: false }
            }
          } else if (i % 10 == 0) {
            if (gridCellsWithShip.includes(i)) {
              newgridWithInfo[i] = { isOccupied: true, thereIsAShip: true }
              newgridWithInfo[i + 1] = { isOccupied: true, thereIsAShip: false }
            } else {
              newgridWithInfo[i] = { isOccupied: true, thereIsAShip: false }
              newgridWithInfo[i + 1] = { isOccupied: true, thereIsAShip: false }
            }
          } else {
            if (gridCellsWithShip.includes(i)) {
              newgridWithInfo[i] = { isOccupied: true, thereIsAShip: true }
              newgridWithInfo[i - 1] = { isOccupied: true, thereIsAShip: false }
              newgridWithInfo[i + 1] = { isOccupied: true, thereIsAShip: false }
            } else {
              newgridWithInfo[i] = { isOccupied: true, thereIsAShip: false }
              newgridWithInfo[i - 1] = { isOccupied: true, thereIsAShip: false }
              newgridWithInfo[i + 1] = { isOccupied: true, thereIsAShip: false }
            }
          }
        };
      }
    };

    var notOccupiedrange = false
    var notOutOfGrid = false

    if (shipsRotation === 0) {
      const start = Math.max(0, index - item.cellsToBack);
      const end = Math.min(99, index + item.cellsToFront);
      const gridCellsWithShip = Array.from({ length: end - start + 1 }, (_, i) => start + i);

      notOccupiedrange = gridCellsWithShip.every((i) => !newgridWithInfo[i].isOccupied);
      notOutOfGrid = index % 10 <= 9 - item.cellsToFront && index % 10 >= item.cellsToBack
    } else {
      const start = Math.max(0, index - 10 * item.cellsToBack);
      const end = Math.min(99, index + 10 * item.cellsToFront);
      const gridCellsWithShip = Array.from({ length: Math.floor((end - start + 10) / 10) }, (_, i) => start + i * 10);

      notOccupiedrange = gridCellsWithShip.every((i) => !newgridWithInfo[i].isOccupied);
      notOutOfGrid = index / 10 <= 10 - item.cellsToFront && index / 10 >= item.cellsToBack
    }

    if (notOutOfGrid && notOccupiedrange) {

      newGrid[index] = <img src={item.img} className={item.type} style={{ transform: `rotate(${shipsRotation}deg)` }} draggable={false} />;
      setOccupiedRange();

    }
    setGridWithInfo(newgridWithInfo);
    setGrid(newGrid);
    setHighlightedCells([])
    setDraggedShip(null)

  };

  const handleDragOverCell = (index) => {
    var notOutOfGrid = false;
    var isAllInGrid = false;
    var gridCellsWithShip = []
    if (shipsRotation === 0) {
      const start = index - draggedShip.cellsToBack;
      const end = index + draggedShip.cellsToFront;
      gridCellsWithShip = Array.from({ length: end - start + 1 }, (_, i) => start + i);

      notOutOfGrid = index % 10 <= 9 - draggedShip.cellsToFront && index % 10 >= draggedShip.cellsToBack

      isAllInGrid = gridCellsWithShip.every((i) => i >= 0 && i <= 99);
    } else {
      const start = index - 10 * draggedShip.cellsToBack;
      const end = index + 10 * draggedShip.cellsToFront;
      gridCellsWithShip = Array.from({ length: Math.floor((end - start + 10) / 10) }, (_, i) => start + i * 10);

      notOutOfGrid = index / 10 <= 10 - draggedShip.cellsToFront && index / 10 >= draggedShip.cellsToBack

      isAllInGrid = gridCellsWithShip.every((i) => i >= 0 && i <= 99);
    }

    setHighlightedCells((isAllInGrid && notOutOfGrid) ? gridCellsWithShip : []);

  };

  const handleDrag = (item) => {
    setDraggedShip(item)
  };

  const handleRotateShips = () => {
    const newRotation = (shipsRotation + 90) % 180;
    setShipsRotation(newRotation);
  };

  const handleClearBoard = () => {
    setGrid(Array(100).fill(null));
    setGridWithInfo(Array(100).fill({ isOccupied: false, thereIsAShip: false }));
    setHighlightedCells([])
  };

  const navigateToNextScreen = () => {
    const serializedGrid = JSON.stringify(grid);
    const serializedGridWithInfo = JSON.stringify(gridWithInfo);
    navigate('/GameScreen', {
      state: { grid: serializedGrid, gridWithInfo: serializedGridWithInfo }
    });
  };

  return (
    <div className='generalContainerGBoard'>
      <div style={gridStyle}>
        {grid.map((cell, index) => (
          <div>
            <GridCell
              key={index}
              onDrop={(item) => handleDrop(item, index)}
              onDragOver={() => handleDragOverCell(index)}
              isOccupied={gridWithInfo[index].isOccupied || gridWithInfo[index].thereIsAShip}
              isHighlighted={highlightedCells.includes(index)}>
              {cell && <div className='imageContainerGameBoard'>{cell}</div>}
            </GridCell>
          </div>
        ))}
      </div>
      <div>
        <button onClick={handleRotateShips}>Rotate</button>
        <SubmarineShip onDrag={(item) => handleDrag(item)} rotation={shipsRotation} />
        <BoatShip onDrag={(item) => handleDrag(item)} rotation={shipsRotation} />
        <CarrierShip onDrag={(item) => handleDrag(item)} rotation={shipsRotation} />
        <CruiseShip onDrag={(item) => handleDrag(item)} rotation={shipsRotation} />
        <button onClick={handleClearBoard}>Delete</button>
        <button onClick={navigateToNextScreen}>Go to Next Screen</button>
      </div>
    </div>
  );
};

export default GameBoard;
