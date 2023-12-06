import React from 'react';
import { useLocation } from 'react-router-dom';
import GameBoard from '../organisms/GameBoard';
import './GameScreen.css'

const GameScreen = () => {
    const location = useLocation();
    const { state } = location;
    const { grid, gridWithInfo, grid2, gridWithInfo2 } = state || {};
    const deserializedGrid = JSON.parse(grid);
    const deserializedGridWithInfo = JSON.parse(gridWithInfo);
    const player2 = grid2 && gridWithInfo2
    var deserializedGrid2 = []
    var deserializedGridWithInfo2 = []
    if (player2) {
        deserializedGrid2 = JSON.parse(grid2);
        deserializedGridWithInfo2 = JSON.parse(gridWithInfo2);
    } else {
        deserializedGrid2 = deserializedGrid;
        deserializedGridWithInfo2 = deserializedGridWithInfo;
    }

    return (
        <div className='generalContainerGameScreen'>
            <div className='boardsContainerGameScreen'>
                <GameBoard
                    grid1={deserializedGrid}
                    gridWithInfo1={deserializedGridWithInfo}
                    clickeable1={false}
                    showShips1={true}
                    grid2={deserializedGrid2}
                    gridWithInfo2={deserializedGridWithInfo2}
                    clickeable2={true}
                    showShips2={true}
                    random={true}
                />
            </div>
        </div>
    );
};

export default GameScreen;