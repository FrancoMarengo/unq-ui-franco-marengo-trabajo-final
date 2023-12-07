import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import GameBoard from '../organisms/GameBoard';
import './GameScreen.css'

const GameScreen = () => {
    const location = useLocation();
    const { state } = location;
    const { grid, gridWithInfo, grid2, gridWithInfo2 } = state || {};
    const deserializedGrid = JSON.parse(grid);
    const deserializedGridWithInfo = JSON.parse(gridWithInfo);
    const deserializedGrid2 = JSON.parse(grid2);
    const deserializedGridWithInfo2 = JSON.parse(gridWithInfo2);

    const queryParams = new URLSearchParams(location.search);
    const secondPlayer = queryParams.get('twoPlayers');
    const secondPlayerBoolean = JSON.parse(secondPlayer);

    return (
        <div className='generalContainerGameScreen'>
            <div className='boardsContainerGameScreen'>
                <GameBoard
                    grid1={deserializedGrid}
                    gridWithInfo1={deserializedGridWithInfo}
                    clickeable1={secondPlayerBoolean}
                    showShips1={!secondPlayerBoolean}
                    grid2={deserializedGrid2}
                    gridWithInfo2={deserializedGridWithInfo2}
                    clickeable2={true}
                    showShips2={false}
                    random={!secondPlayerBoolean}
                />
            </div>
        </div>
    );
};

export default GameScreen;