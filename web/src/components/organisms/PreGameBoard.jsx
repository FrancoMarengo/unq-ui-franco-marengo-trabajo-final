import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GridCell from '../atoms/GridCell';
import BoatShip from '../molecules/BoatShip';
import SubmarineShip from '../molecules/SubmarineShip';
import CarrierShip from '../molecules/CarrierShip';
import CruiseShip from '../molecules/CruiseShip';
import Button from '../atoms/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import './PreGameBoard.css'

const PreGameBoard = ({ secondPlayer }) => {
  const [grid, setGrid] = useState(Array(100).fill(null));
  const [gridWithInfo, setGridWithInfo] = useState(Array(100).fill({ isOccupied: false, thereIsAShip: false }));
  const [grid2, setGrid2] = useState(Array(100).fill(null));
  var gridWithInfo2 = Array(100).fill({ isOccupied: false, thereIsAShip: false });
  const [gridWithInfoP2, setGridWithInfoP2] = useState(Array(100).fill({ isOccupied: false, thereIsAShip: false }));
  const [draggedShip, setDraggedShip] = useState(null);
  const [highlightedCells, setHighlightedCells] = useState([]);
  const [highlightedCells2, setHighlightedCells2] = useState([]);
  const [shipsRotation, setShipsRotation] = useState(0);
  const [shipsRotation2, setShipsRotation2] = useState(0);
  const [turnOfPlayer2, setTurnOfPlayer2] = useState(false)
  const secondPlayerBoolean = JSON.parse(secondPlayer);
  const [placedShips, setPlacedShips] = useState([])
  const navigate = useNavigate();


  function randomizeShips() {
    const availableShips = [
      { length: 2, cellsToBack: 0, cellsToFront: 1, shipRotation: (Math.round(Math.random()) * 90) },
      { length: 3, cellsToBack: 1, cellsToFront: 1, shipRotation: (Math.round(Math.random()) * 90) },
      { length: 5, cellsToBack: 2, cellsToFront: 2, shipRotation: (Math.round(Math.random()) * 90) },
      { length: 4, cellsToBack: 1, cellsToFront: 2, shipRotation: (Math.round(Math.random()) * 90) }
    ]
    for (let i = 0; i < availableShips.length; i++) {
      const shipDetails = availableShips[i];
      var randomNumber = 0;
      var validPos = false;
      if (shipDetails.shipRotation === 0) {
        do {
          randomNumber = Math.floor(Math.random() * 100);
          validPos = checkValid(shipDetails, randomNumber);
        } while ((Math.floor((randomNumber - shipDetails.cellsToBack) / 10) !== Math.floor((randomNumber + shipDetails.cellsToFront) / 10)) || ((randomNumber - shipDetails.cellsToBack) < 0 || (randomNumber + shipDetails.cellsToFront) > 99) || !validPos);
      } else {
        do {
          randomNumber = Math.floor(Math.random() * 100);
          validPos = checkValid(shipDetails, randomNumber);
        } while ((randomNumber - (10 * shipDetails.cellsToBack) < 0 || randomNumber + (10 * shipDetails.cellsToFront) > 99) || !validPos);
      }
      setOccupiedRanges(randomNumber, shipDetails);
    }
  }

  function checkValid(ship, index) {
    var start = 0;
    var end = 0;
    var check = true;
    if (ship.shipRotation === 0) {
      if ((index - ship.cellsToBack) % 10 !== 0) {
        if ((index + (ship.cellsToFront + 1)) % 10 === 0) {
          start = index - (ship.cellsToBack + 1);
          end = index + ship.cellsToFront;
        } else {
          start = index - (ship.cellsToBack + 1);
          end = index + (ship.cellsToFront + 1);
        };
      } else {
        start = index - ship.cellsToBack;
        end = index + (ship.cellsToFront + 1);
      };
      for (let i = start; i <= Math.min(end, 99); i++) {
        check = check && i <= 99 && i >= 0 && !gridWithInfo2[i].isOccupied
      }
      return check;
    } else {
      if (Math.floor((index - 10 * ship.cellsToBack) / 10) > 0) { //No toca la parte de arriba
        if ((index + 10 * ship.cellsToFront) / 10 >= 9) { //Toca la parte de abajo
          start = index - 10 * (ship.cellsToBack + 1);
          end = index + 10 * ship.cellsToFront;
        } else {
          start = index - 10 * (ship.cellsToBack + 1);
          end = index + 10 * (ship.cellsToFront + 1);
        };
      } else {
        start = index - 10 * ship.cellsToBack;
        end = index + 10 * (ship.cellsToFront + 1);
      };
      for (let i = start; i <= end; i += 10) {
        check = check && i <= 99 && i >= 0 && !gridWithInfo2[i].isOccupied
      }
      return check;
    }
  }

  function setOccupiedRanges(index, ship) {
    var start = 0;
    var end = 0;
    var gridCellsWithShip = [];
    const newDeserializedGridWithInfo2 = { ...gridWithInfo2 };
    if (ship.shipRotation === 0) {
      if ((index - ship.cellsToBack) % 10 !== 0) {
        if ((index + (ship.cellsToFront + 1)) % 10 === 0) {
          start = index - (ship.cellsToBack + 1);
          end = index + ship.cellsToFront;
          gridCellsWithShip = Array.from({ length: end - start }, (_, index) => start + index + 1);
        } else {
          start = index - (ship.cellsToBack + 1);
          end = index + (ship.cellsToFront + 1);
          gridCellsWithShip = Array.from({ length: end - start - 1 }, (_, index) => start + index + 1);
        };
      } else {
        start = index - ship.cellsToBack;
        end = index + (ship.cellsToFront + 1);
        gridCellsWithShip = Array.from({ length: end - start }, (_, index) => start + index);
      };

      for (let i = start; i <= end; i++) {
        if (gridCellsWithShip.includes(i)) {
          newDeserializedGridWithInfo2[i] = { isOccupied: true, thereIsAShip: true }
          newDeserializedGridWithInfo2[i - 10] = { isOccupied: true, thereIsAShip: false }
          newDeserializedGridWithInfo2[i + 10] = { isOccupied: true, thereIsAShip: false }
        } else {
          newDeserializedGridWithInfo2[i] = { isOccupied: true, thereIsAShip: false }
          newDeserializedGridWithInfo2[i - 10] = { isOccupied: true, thereIsAShip: false }
          newDeserializedGridWithInfo2[i + 10] = { isOccupied: true, thereIsAShip: false }
        }
      };
    } else {
      if (Math.floor((index - 10 * ship.cellsToBack) / 10) > 0) { //No toca la parte de arriba
        if ((index + 10 * ship.cellsToFront) / 10 >= 9) { //Toca la parte de abajo
          start = index - 10 * (ship.cellsToBack + 1);
          end = index + 10 * ship.cellsToFront;
          gridCellsWithShip = Array.from({ length: (end - start - 10) / 10 + 1 }, (_, index) => start + 10 + index * 10);
        } else {
          start = index - 10 * (ship.cellsToBack + 1);
          end = index + 10 * (ship.cellsToFront + 1);
          gridCellsWithShip = Array.from({ length: (end - start - 10) / 10 }, (_, index) => start + 10 + index * 10);
        };
      } else {
        start = index - 10 * ship.cellsToBack;
        end = index + 10 * (ship.cellsToFront + 1);
        gridCellsWithShip = Array.from({ length: (end - start) / 10 }, (_, index) => start + index * 10);
      };

      for (let i = start; i <= end; i += 10) {
        if (i % 10 === 9) {
          if (gridCellsWithShip.includes(i)) {
            newDeserializedGridWithInfo2[i] = { isOccupied: true, thereIsAShip: true }
            newDeserializedGridWithInfo2[i - 1] = { isOccupied: true, thereIsAShip: false }
          } else {
            newDeserializedGridWithInfo2[i] = { isOccupied: true, thereIsAShip: false }
            newDeserializedGridWithInfo2[i - 1] = { isOccupied: true, thereIsAShip: false }
          }
        } else if (i % 10 === 0) {
          if (gridCellsWithShip.includes(i)) {
            newDeserializedGridWithInfo2[i] = { isOccupied: true, thereIsAShip: true }
            newDeserializedGridWithInfo2[i + 1] = { isOccupied: true, thereIsAShip: false }
          } else {
            newDeserializedGridWithInfo2[i] = { isOccupied: true, thereIsAShip: false }
            newDeserializedGridWithInfo2[i + 1] = { isOccupied: true, thereIsAShip: false }
          }
        } else {
          if (gridCellsWithShip.includes(i)) {
            newDeserializedGridWithInfo2[i] = { isOccupied: true, thereIsAShip: true }
            newDeserializedGridWithInfo2[i - 1] = { isOccupied: true, thereIsAShip: false }
            newDeserializedGridWithInfo2[i + 1] = { isOccupied: true, thereIsAShip: false }
          } else {
            newDeserializedGridWithInfo2[i] = { isOccupied: true, thereIsAShip: false }
            newDeserializedGridWithInfo2[i - 1] = { isOccupied: true, thereIsAShip: false }
            newDeserializedGridWithInfo2[i + 1] = { isOccupied: true, thereIsAShip: false }
          }
        }
      };
    }
    gridWithInfo2 = newDeserializedGridWithInfo2;
  };



  const handleDrop = (item, index) => {
    var newGrid = []
    var newgridWithInfo = []
    if (!turnOfPlayer2) {
      newGrid = [...grid];
      newgridWithInfo = { ...gridWithInfo };
    } else {
      newGrid = [...grid2];
      newgridWithInfo = { ...gridWithInfoP2 };
    }

    const setOccupiedRange = () => {
      var start = 0;
      var end = 0;
      var gridCellsWithShip = [];
      var shipsRotationNow = 0
      if (!turnOfPlayer2) {
        shipsRotationNow = shipsRotation
      } else {
        shipsRotationNow = shipsRotation2
      }
      if (shipsRotationNow === 0) {
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
            gridCellsWithShip = Array.from({ length: (end - start - 10) / 10 }, (_, index) => start + 10 + index * 10);
          };
        } else {
          start = index - 10 * item.cellsToBack;
          end = index + 10 * (item.cellsToFront + 1);
          gridCellsWithShip = Array.from({ length: (end - start) / 10 }, (_, index) => start + index * 10);
        };

        for (let i = start; i <= end; i += 10) {
          if (i % 10 === 9) {
            if (gridCellsWithShip.includes(i)) {
              newgridWithInfo[i] = { isOccupied: true, thereIsAShip: true }
              newgridWithInfo[i - 1] = { isOccupied: true, thereIsAShip: false }
            } else {
              newgridWithInfo[i] = { isOccupied: true, thereIsAShip: false }
              newgridWithInfo[i - 1] = { isOccupied: true, thereIsAShip: false }
            }
          } else if (i % 10 === 0) {
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
    var shipsRotationNow = 0
    if (!turnOfPlayer2) {
      shipsRotationNow = shipsRotation
    } else {
      shipsRotationNow = shipsRotation2
    }

    if (shipsRotationNow === 0) {
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
      newGrid[index] = <img src={item.img} alt={item.type} className={item.type} style={{ transform: `rotate(${shipsRotationNow}deg)` }} draggable={false} />;
      setOccupiedRange();
      const newPlacedShips = [...placedShips];
      newPlacedShips.push(item.type)
      setPlacedShips(newPlacedShips);
    }
    if (!turnOfPlayer2) {
      setGridWithInfo(newgridWithInfo);
      setGrid(newGrid);
      setHighlightedCells([])
    } else {
      setGridWithInfoP2(newgridWithInfo)
      setGrid2(newGrid);
      setHighlightedCells2([])
    }
    setDraggedShip(null)
  };

  const handleDragOverCell = (index) => {
    var notOutOfGrid = false;
    var isAllInGrid = false;
    var gridCellsWithShip = []
    var shipsRotationNow = 0
    if (!turnOfPlayer2) {
      shipsRotationNow = shipsRotation
    } else {
      shipsRotationNow = shipsRotation2
    }
    if (shipsRotationNow === 0) {
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
    if (!turnOfPlayer2) {
      setHighlightedCells((isAllInGrid && notOutOfGrid) ? gridCellsWithShip : []);
    } else {
      setHighlightedCells2((isAllInGrid && notOutOfGrid) ? gridCellsWithShip : []);
    }


  };

  const handleDrag = (item) => {
    setDraggedShip(item)
  };

  const handleRotateShips = () => {
    if (!turnOfPlayer2) {
      const newRotation = (shipsRotation + 90) % 180;
      setShipsRotation(newRotation);
    } else {
      const newRotation = (shipsRotation2 + 90) % 180;
      setShipsRotation2(newRotation);
    }
  };

  const handleClearBoard = () => {
    if (!turnOfPlayer2) {
      setGrid(Array(100).fill(null));
      setGridWithInfo(Array(100).fill({ isOccupied: false, thereIsAShip: false }));
      setHighlightedCells([])
    } else {
      setGrid2(Array(100).fill(null));
      gridWithInfo2 = Array(100).fill({ isOccupied: false, thereIsAShip: false });
      setHighlightedCells2([])
      setGridWithInfoP2(Array(100).fill({ isOccupied: false, thereIsAShip: false }))
    }
    setPlacedShips([]);
  };

  const navigateToNextScreen = () => {
    if (secondPlayerBoolean && !turnOfPlayer2 && placedShips.length === 4) {
      setPlacedShips([]);
      setTurnOfPlayer2(true);
    } else if (secondPlayerBoolean && turnOfPlayer2 && placedShips.length === 4) {
      const serializedGrid = JSON.stringify(grid);
      const serializedGridWithInfo = JSON.stringify(gridWithInfo);
      const serializedGrid2 = JSON.stringify(grid2);
      const serializedGridWithInfo2 = JSON.stringify(gridWithInfoP2);
      const queryParams = new URLSearchParams({
        twoPlayers: true,
      });
      navigate(`/GameScreen?${queryParams.toString()}`, {
        state: { grid: serializedGrid, gridWithInfo: serializedGridWithInfo, grid2: serializedGrid2, gridWithInfo2: serializedGridWithInfo2 }
      });
    } else if (!secondPlayerBoolean && placedShips.length === 4) {
      randomizeShips();
      const serializedGrid = JSON.stringify(grid);
      const serializedGridWithInfo = JSON.stringify(gridWithInfo);
      const serializedGrid2 = JSON.stringify(grid2);
      const serializedGridWithInfo2 = JSON.stringify(gridWithInfo2);
      const queryParams = new URLSearchParams({
        twoPlayers: false,
      });
      navigate(`/GameScreen?${queryParams.toString()}`, {
        state: { grid: serializedGrid, gridWithInfo: serializedGridWithInfo, grid2: serializedGrid2, gridWithInfo2: serializedGridWithInfo2 }
      });
    }
  };


  return (
    <div>
      {!turnOfPlayer2 ? (
        <h3 className='turnInfoPos'>TURN OF PLAYER 1</h3>
      ) : (
        <h3 className='turnInfoPos'>TURN OF PLAYER 2</h3>
      )}
      <div className='generalContainerGBoard'>
        {!turnOfPlayer2 &&
          <div className='gridStyPGB'>
            {grid.map((cell, index) => (
              <div key={index}>
                <GridCell
                  key={index}
                  onDrop={(item) => handleDrop(item, index)}
                  onDragOver={() => handleDragOverCell(index)}
                  isOccupied={!turnOfPlayer2 && (gridWithInfo[index].isOccupied || gridWithInfo[index].thereIsAShip)}
                  isHighlighted={highlightedCells.includes(index)}
                  disabled={turnOfPlayer2}
                >
                  {cell && !turnOfPlayer2 && <div key={index} className='imageContainerGameBoard'>{cell}</div>}
                </GridCell>
              </div>
            ))}
          </div>}
        {!turnOfPlayer2 && <div>
          <FontAwesomeIcon icon={faRotate} onClick={handleRotateShips} />
          <SubmarineShip onDrag={(item) => handleDrag(item)} rotation={shipsRotation} draggable={!placedShips.includes('submarine')} />
          <BoatShip onDrag={(item) => handleDrag(item)} rotation={shipsRotation} draggable={!placedShips.includes('boat')} />
          <CarrierShip onDrag={(item) => handleDrag(item)} rotation={shipsRotation} draggable={!placedShips.includes('carrier')} />
          <CruiseShip onDrag={(item) => handleDrag(item)} rotation={shipsRotation} draggable={!placedShips.includes('cruise')} />
        </div>}
        {secondPlayerBoolean && turnOfPlayer2 && <div className='gridStyPGB'>
          {grid2.map((cell, index) => (
            <div key={index}>
              <GridCell
                key={index}
                onDrop={(item) => handleDrop(item, index)}
                onDragOver={() => handleDragOverCell(index)}
                isOccupied={gridWithInfoP2[index].isOccupied || gridWithInfoP2[index].thereIsAShip}
                isHighlighted={highlightedCells2.includes(index)}>
                {cell && <div key={index} className='imageContainerGameBoard'>{cell}</div>}
              </GridCell>
            </div>
          ))}
        </div>}
        {secondPlayerBoolean && turnOfPlayer2 && <div>
          <FontAwesomeIcon icon={faRotate} onClick={handleRotateShips} />
          <SubmarineShip onDrag={(item) => handleDrag(item)} rotation={shipsRotation2} draggable={!placedShips.includes('submarine')} />
          <BoatShip onDrag={(item) => handleDrag(item)} rotation={shipsRotation2} draggable={!placedShips.includes('boat')} />
          <CarrierShip onDrag={(item) => handleDrag(item)} rotation={shipsRotation2} draggable={!placedShips.includes('carrier')} />
          <CruiseShip onDrag={(item) => handleDrag(item)} rotation={shipsRotation2} draggable={!placedShips.includes('cruise')} />
        </div>}
      </div>
      <div className='buttonsContainerPGB'>
        <Button onClick={handleClearBoard} text={"REMOVE SHIPS"} />
        {placedShips.length === 4 && <Button onClick={navigateToNextScreen} text={"READY!"} />}
      </div>
    </div>
  );
};

export default PreGameBoard;
