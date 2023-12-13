import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import TouchableGridCell from "../atoms/TouchableGridCell";
import explosion from '../atoms/img/explosion.png';
import water from '../atoms/img/water.png'
import './GameBoard.css';

const GameBoard = ({ grid1, gridWithInfo1, clickeable1, showShips1, grid2, gridWithInfo2, clickeable2, showShips2, random }) => {
    const [newGrid1, setNewGrid] = useState([...grid1]);
    const [newGridWithClicksInfo1, setNewGridWithClicksInfo] = useState(Array(100).fill({ alreadyClicked: false }));
    const [newGrid2, setNewGrid2] = useState([...grid2]);
    const [newGridWithClicksInfo2, setNewGridWithClicksInfo2] = useState(Array(100).fill({ alreadyClicked: false }));
    const [turnOfPlayer1, setTurnOfPlayer1] = useState(true);
    const [timeoutActive, setTimeoutActive] = useState(false);
    const [player1ShipsLeft, setplayer1ShipsLeft] = useState(14);
    const [player2ShipsLeft, setplayer2ShipsLeft] = useState(14);
    const navigate = useNavigate();


    function handleCellClick1(index) {
        if (clickeable1 && !turnOfPlayer1 && !newGridWithClicksInfo1[index].alreadyClicked && !timeoutActive) {
            const updatedGrid = [...newGrid1];
            const updatedGridWithClicksInfo = { ...newGridWithClicksInfo1 }
            if (gridWithInfo1[index].thereIsAShip && !newGridWithClicksInfo1[index].alreadyClicked) {
                if (grid1[index]) {
                    updatedGrid[index] = (
                        <div>
                            <img src={grid1[index].props.src} alt={grid1[index].props.className} className={grid1[index].props.className + "GameBoard"} style={grid1[index].props.style} draggable={false} />
                            <img src={explosion} alt={"itemInGrid"} className="explosion-iconGameBoard" />
                        </div>
                    );
                    updatedGridWithClicksInfo[index] = { alreadyClicked: true };
                } else {
                    updatedGrid[index] = <img key={"exp"} alt="exp" src={explosion} className="explosion-icon" />
                    updatedGridWithClicksInfo[index] = { alreadyClicked: true };
                }
                setNewGrid(updatedGrid);
                setNewGridWithClicksInfo(updatedGridWithClicksInfo);
                if ((player1ShipsLeft - 1) === 0) {
                    const queryParams = new URLSearchParams({
                        player1Winner: false,
                        twoPlayers: !random,
                    });
                    const preValue = player2ShipsLeft;
                    setplayer1ShipsLeft(preValue - 1)
                    setTimeout(() => {
                        navigate(`/GameEndScreen?${queryParams.toString()}`);
                    }, 1000);
                } else {
                    const preValue = player1ShipsLeft;
                    setplayer1ShipsLeft(preValue - 1)
                }
            } else if (!gridWithInfo1[index].thereIsAShip && !newGridWithClicksInfo1[index].alreadyClicked) {
                updatedGrid[index] = <img key={"exp"} alt="exp" src={water} className="explosion-icon" />
                updatedGridWithClicksInfo[index] = { alreadyClicked: true };
                setNewGrid(updatedGrid);
                setNewGridWithClicksInfo(updatedGridWithClicksInfo);
            }
            console.log(player1ShipsLeft)
            setTurnOfPlayer1(true)
            setTimeoutActive(true)
            setTimeout(() => {
                setTimeoutActive(false);
            }, 1500);
        }
    };

    function handleCellClick2(index) {
        if (clickeable2 && turnOfPlayer1 && !newGridWithClicksInfo2[index].alreadyClicked && !timeoutActive) {
            const updatedGrid = [...newGrid2];
            const updatedGridWithClicksInfo = { ...newGridWithClicksInfo2 }
            if (gridWithInfo2[index].thereIsAShip && !newGridWithClicksInfo2[index].alreadyClicked) {
                if (grid2[index]) {
                    updatedGrid[index] = (
                        <div>
                            <img src={grid2[index].props.src} alt={grid2[index].props.className} className={grid2[index].props.className + "GameBoard"} style={grid2[index].props.style} draggable={false} />
                            <img src={explosion} alt="exp" className="explosion-iconGameBoard" />
                        </div>
                    );
                    updatedGridWithClicksInfo[index] = { alreadyClicked: true };
                } else {
                    updatedGrid[index] = <img key={"exp"} alt="exp" src={explosion} className="explosion-icon" />
                    updatedGridWithClicksInfo[index] = { alreadyClicked: true };
                }
                if ((player2ShipsLeft - 1) === 0) {
                    const queryParams = new URLSearchParams({
                        player1Winner: true,
                        twoPlayers: !random,
                    });
                    const preValue = player2ShipsLeft;
                    setplayer2ShipsLeft(preValue - 1)
                    setTimeout(() => {
                        navigate(`/GameEndScreen?${queryParams.toString()}`);
                    }, 1000);
                } else {
                    const preValue = player2ShipsLeft;
                    setplayer2ShipsLeft(preValue - 1)
                }
                setNewGrid2(updatedGrid);
                setNewGridWithClicksInfo2(updatedGridWithClicksInfo);
            } else if (!gridWithInfo2[index].thereIsAShip && !newGridWithClicksInfo2[index].alreadyClicked) {
                updatedGrid[index] = <img key={"exp"} alt="expl" src={water} className="explosion-icon" />
                updatedGridWithClicksInfo[index] = { alreadyClicked: true };
                setNewGrid2(updatedGrid);
                setNewGridWithClicksInfo2(updatedGridWithClicksInfo);
            }
            console.log(player2ShipsLeft)
            setTurnOfPlayer1(false)
            setTimeoutActive(true)
            setTimeout(() => {
                setTimeoutActive(false);
                randomClick()
            }, 1500);
        }
    };

    function randomClick() {
        if (random && !timeoutActive) {
            var randomIndex = Math.floor(Math.random() * 100);
            while (newGridWithClicksInfo1[randomIndex].alreadyClicked) {
                randomIndex = Math.floor(Math.random() * 100);
            }
            const updatedGrid = [...newGrid1];
            const updatedGridWithClicksInfo = { ...newGridWithClicksInfo1 }
            if (gridWithInfo1[randomIndex].thereIsAShip && !newGridWithClicksInfo1[randomIndex].alreadyClicked) {
                if (grid1[randomIndex]) {
                    updatedGrid[randomIndex] = (
                        <div>
                            <img src={grid1[randomIndex].props.src} alt={grid1[randomIndex].props.className} className={grid1[randomIndex].props.className + "GameBoard"} style={grid1[randomIndex].props.style} draggable={false} />
                            <img src={explosion} alt="explosion" className="explosion-iconGameBoard" />
                        </div>
                    );
                    updatedGridWithClicksInfo[randomIndex] = { alreadyClicked: true };
                } else {
                    updatedGrid[randomIndex] = <img key={"exp"} alt="explo" src={explosion} className="explosion-icon" />
                    updatedGridWithClicksInfo[randomIndex] = { alreadyClicked: true };
                }
                if ((player1ShipsLeft - 1) === 0) {
                    const queryParams = new URLSearchParams({
                        player1Winner: false,
                        twoPlayers: !random,
                    });
                    const preValue = player1ShipsLeft;
                    setplayer1ShipsLeft(preValue - 1)
                    setTimeout(() => {
                        navigate(`/GameEndScreen?${queryParams.toString()}`);
                    }, 1000);
                } else {
                    const preValue = player1ShipsLeft;
                    setplayer1ShipsLeft(preValue - 1)
                }
                setNewGrid(updatedGrid);
                setNewGridWithClicksInfo(updatedGridWithClicksInfo);
            } else if (!gridWithInfo1[randomIndex].thereIsAShip && !newGridWithClicksInfo1[randomIndex].alreadyClicked) {
                updatedGrid[randomIndex] = <img key={"exp"} alt="exp" src={water} className="explosion-icon" />
                updatedGridWithClicksInfo[randomIndex] = { alreadyClicked: true };
                setNewGrid(updatedGrid);
                setNewGridWithClicksInfo(updatedGridWithClicksInfo);
            }
            setTurnOfPlayer1(true)
        }
    }

    return (
        <div className="generalContainerGB">
            <h1>BATTLE BEGINS, FIRE</h1>
            {turnOfPlayer1 ? (
                <p>Turn of player 1</p>
            ) : (
                <p>Turn of player 2</p>
            )}
            <div className="genStyleGB">
                <div className="gridStyGB">
                    {newGrid1.map((cell, index) => (
                        <div key={index}>
                            <TouchableGridCell
                                isOccupied={showShips1 && (gridWithInfo1[index].isOccupied || gridWithInfo1[index].thereIsAShip)}
                                onClick={() => handleCellClick1(index)}
                                cursor={!turnOfPlayer1}
                            >
                                <>
                                    {cell ? (cell && cell.type === "div" && showShips1 ? (
                                        <>
                                            <img src={cell.props.children[0].props.src} alt={cell.props.children[0].props.className} className={cell.props.children[0].props.className} style={cell.props.children[0].props.style} />
                                            <img src={cell.props.children[1].props.src} alt={cell.props.children[1].props.className} className={cell.props.children[1].props.className} style={cell.props.children[1].props.style} />
                                        </>
                                    ) : (cell && cell.type === "div" && !showShips1 ? (
                                        <img src={cell.props.children[1].props.src} alt={cell.props.children[1].props.className} className={cell.props.children[1].props.className} style={cell.props.children[1].props.style} />

                                    ) : (cell.key && cell.key === "exp" ? (
                                        <img src={cell.props.src} alt={cell.props.className} className={cell.props.className + "GameBoard"} style={cell.props.style} />
                                    ) : (!cell.key && showShips1 ? (
                                        <img src={cell.props.src} alt={cell.props.className} className={cell.props.className + "GameBoard"} style={cell.props.style} />
                                    ) : (""))
                                    ))) : ""}
                                </>
                            </TouchableGridCell>
                        </div>
                    ))}
                </div>
                <div className="gridStyGB">
                    {newGrid2.map((cell, index) => (
                        <div key={index}>
                            <TouchableGridCell
                                isOccupied={showShips2 && (gridWithInfo2[index].isOccupied || gridWithInfo2[index].thereIsAShip)}
                                onClick={() => handleCellClick2(index)}
                                cursor={turnOfPlayer1}
                            >
                                <>
                                    {cell ? (cell && cell.type === "div" && showShips2 ? (
                                        <>
                                            <img src={cell.props.children[0].props.src} alt={cell.props.children[0].props.className} className={cell.props.children[0].props.className} style={cell.props.children[0].props.style} />
                                            <img src={cell.props.children[1].props.src} alt={cell.props.children[1].props.className} className={cell.props.children[1].props.className} style={cell.props.children[1].props.style} />
                                        </>
                                    ) : (cell && cell.type === "div" && !showShips2 ? (
                                        <img src={cell.props.children[1].props.src} alt={cell.props.children[1].props.className} className={cell.props.children[1].props.className} style={cell.props.children[1].props.style} />

                                    ) : (cell.key && cell.key === "exp" ? (
                                        <img src={cell.props.src} alt={cell.props.className} className={cell.props.className + "GameBoard"} style={cell.props.style} />
                                    ) : (!cell.key && showShips2 ? (
                                        <img src={cell.props.src} alt={cell.props.className} className={cell.props.className + "GameBoard"} style={cell.props.style} />
                                    ) : (""))
                                    ))) : ""}
                                </>
                            </TouchableGridCell>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GameBoard;
