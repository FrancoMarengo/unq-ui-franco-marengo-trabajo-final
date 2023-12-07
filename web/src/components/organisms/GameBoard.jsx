import React, { useState } from "react";
import TouchableGridCell from "../atoms/TouchableGridCell";
import explosion from '../atoms/img/explosion.png';
import water from '../atoms/img/water.png'
import './GameBoard.css';

const GameBoard = ({ grid1, gridWithInfo1, clickeable1, showShips1, grid2, gridWithInfo2, clickeable2, showShips2, random }) => {
    const [newGrid1, setNewGrid] = useState([...grid1]);
    const [newGridWithClicksInfo1, setNewGridWithClicksInfo] = useState(Array(100).fill({ alreadyClicked: false}));
    const [newGrid2, setNewGrid2] = useState([...grid2]);
    const [newGridWithClicksInfo2, setNewGridWithClicksInfo2] = useState(Array(100).fill({ alreadyClicked: false}));


    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(10, 40px)',
        gridTemplateRows: 'repeat(10, 40px)',
        gap: '0px',
    };

    const generalStyle = {
        display: 'flex',
    };

    function handleCellClick1(index) {
        if (clickeable1) {
            const updatedGrid = [...newGrid1];
            const updatedGridWithClicksInfo = {...newGridWithClicksInfo1}
            if (gridWithInfo1[index].thereIsAShip && !newGridWithClicksInfo1[index].alreadyClicked) {
                if (grid1[index]) {
                    updatedGrid[index] = (
                        <div>
                            <img src={grid1[index].props.src} className={grid1[index].props.className + "GameBoard"} style={grid1[index].props.style} draggable={false} />
                            <img src={explosion} className="explosion-iconGameBoard" />
                        </div>
                    );
                    updatedGridWithClicksInfo[index] = {alreadyClicked: true};
                } else {
                    updatedGrid[index] = <img key={"exp"} src={explosion} className="explosion-icon" />
                    updatedGridWithClicksInfo[index] = {alreadyClicked: true};
                }
                setNewGrid(updatedGrid);
                setNewGridWithClicksInfo(updatedGridWithClicksInfo);
            } else if (!gridWithInfo1[index].thereIsAShip && !newGridWithClicksInfo1[index].alreadyClicked) {
                updatedGrid[index] = <img key={"exp"} src={water} className="explosion-icon"/>
                updatedGridWithClicksInfo[index] = {alreadyClicked: true};
                setNewGrid(updatedGrid);
                setNewGridWithClicksInfo(updatedGridWithClicksInfo);
            }
        }
    };

    function handleCellClick2(index) {
        if (clickeable2) {
            const updatedGrid = [...newGrid2];
            const updatedGridWithClicksInfo = {...newGridWithClicksInfo2}
            if (gridWithInfo2[index].thereIsAShip && !newGridWithClicksInfo2[index].alreadyClicked) {
                if (grid2[index]) {
                    updatedGrid[index] = (
                        <div>
                            <img src={grid2[index].props.src} className={grid2[index].props.className + "GameBoard"} style={grid2[index].props.style} draggable={false} />
                            <img src={explosion} className="explosion-iconGameBoard" />
                        </div>
                    );
                    updatedGridWithClicksInfo[index] = {alreadyClicked: true};
                } else {
                    updatedGrid[index] = <img key={"exp"} src={explosion} className="explosion-icon" />
                    updatedGridWithClicksInfo[index] = {alreadyClicked: true};
                }
                setNewGrid2(updatedGrid);
                setNewGridWithClicksInfo2(updatedGridWithClicksInfo);
            } else if (!gridWithInfo2[index].thereIsAShip && !newGridWithClicksInfo2[index].alreadyClicked) {
                updatedGrid[index] = <img key={"exp"} src={water} className="explosion-icon"/>
                updatedGridWithClicksInfo[index] = {alreadyClicked: true};
                setNewGrid2(updatedGrid);
                setNewGridWithClicksInfo2(updatedGridWithClicksInfo);
            }
            randomClick()
        }
    };

    function randomClick() {
        if (random) {
            var randomIndex = Math.floor(Math.random() * 100);
            while (newGridWithClicksInfo1[randomIndex].alreadyClicked) {
                randomIndex = Math.floor(Math.random() * 100);
            }
            const updatedGrid = [...newGrid1];
            const updatedGridWithClicksInfo = {...newGridWithClicksInfo1}
            if (gridWithInfo1[randomIndex].thereIsAShip && !newGridWithClicksInfo1[randomIndex].alreadyClicked) {
                if (grid1[randomIndex]) {
                    updatedGrid[randomIndex] = (
                        <div>
                            <img src={grid1[randomIndex].props.src} className={grid1[randomIndex].props.className + "GameBoard"} style={grid1[randomIndex].props.style} draggable={false} />
                            <img src={explosion} className="explosion-iconGameBoard" />
                        </div>
                    );
                    updatedGridWithClicksInfo[randomIndex] = {alreadyClicked: true};
                } else {
                    updatedGrid[randomIndex] = <img key={"exp"} src={explosion} className="explosion-icon" />
                    updatedGridWithClicksInfo[randomIndex] = {alreadyClicked: true};
                }
                setNewGrid(updatedGrid);
                setNewGridWithClicksInfo(updatedGridWithClicksInfo);
            } else if (!gridWithInfo1[randomIndex].thereIsAShip && !newGridWithClicksInfo1[randomIndex].alreadyClicked) {
                updatedGrid[randomIndex] = <img key={"exp"} src={water} className="explosion-icon"/>
                updatedGridWithClicksInfo[randomIndex] = {alreadyClicked: true};
                setNewGrid(updatedGrid);
                setNewGridWithClicksInfo(updatedGridWithClicksInfo);
            }
        }
    }

    return (
        <div style={generalStyle}>
            <div style={gridStyle}>
                {newGrid1.map((cell, index) => (
                    <div key={index}>
                        <TouchableGridCell
                            isOccupied={showShips1 && (gridWithInfo1[index].isOccupied || gridWithInfo1[index].thereIsAShip)}
                            onClick={() => handleCellClick1(index)}
                        >
                            <>
                                {cell ? (cell && cell.type == "div" && showShips1 ? (
                                    <>
                                        <img src={cell.props.children[0].props.src} className={cell.props.children[0].props.className} style={cell.props.children[0].props.style} />
                                        <img src={cell.props.children[1].props.src} className={cell.props.children[1].props.className} style={cell.props.children[1].props.style} />
                                    </>
                                ) : (cell && cell.type == "div" && !showShips1 ? (
                                    <img src={cell.props.children[1].props.src} className={cell.props.children[1].props.className} style={cell.props.children[1].props.style} />
                                    
                                ) : (cell.key && cell.key == "exp" ? ( 
                                    <img src={cell.props.src} className={cell.props.className + "GameBoard"} style={cell.props.style} />
                                ) : (!cell.key && showShips1 ? (
                                        <img src={cell.props.src} className={cell.props.className + "GameBoard"} style={cell.props.style} />
                                    ): (""))
                                ))) : ""}
                            </>
                        </TouchableGridCell>
                    </div>
                ))}
            </div>
            <div style={gridStyle}>
                {newGrid2.map((cell, index) => (
                    <div key={index}>
                        <TouchableGridCell
                            isOccupied={showShips2 && (gridWithInfo2[index].isOccupied || gridWithInfo2[index].thereIsAShip)}
                            onClick={() => handleCellClick2(index)}
                        >
                            <>
                                {cell ? (cell && cell.type == "div" && showShips2 ? (
                                    <>
                                        <img src={cell.props.children[0].props.src} className={cell.props.children[0].props.className} style={cell.props.children[0].props.style} />
                                        <img src={cell.props.children[1].props.src} className={cell.props.children[1].props.className} style={cell.props.children[1].props.style} />
                                    </>
                                ) : (cell && cell.type == "div" && !showShips2 ? (
                                    <img src={cell.props.children[1].props.src} className={cell.props.children[1].props.className} style={cell.props.children[1].props.style} />
                                    
                                ) : (cell.key && cell.key == "exp" ? ( 
                                    <img src={cell.props.src} className={cell.props.className + "GameBoard"} style={cell.props.style} />
                                ) : (!cell.key && showShips2 ? (
                                        <img src={cell.props.src} className={cell.props.className + "GameBoard"} style={cell.props.style} />
                                    ): (""))
                                ))) : ""}
                            </>
                        </TouchableGridCell>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GameBoard;
