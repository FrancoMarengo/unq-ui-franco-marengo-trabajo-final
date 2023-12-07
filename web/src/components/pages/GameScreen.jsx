import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import GameBoard from '../organisms/GameBoard';
import game2 from '../atoms/img/game2.jpg'
import game3 from '../atoms/img/game3.jpg'
import game4 from '../atoms/img/game4.jpg'
import game5 from '../atoms/img/game5.jpg'
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

    const [currentBackground, setCurrentBackground] = useState(0);
    const backgroundsUrls = [`url(${game4})`,`url(${game5})`, `url(${game2})`, `url(${game3})`];

    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;

  useEffect(() => {
    const handleResize = () => {
      screenWidth = window.innerWidth;
      screenHeight = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [screenHeight, screenWidth]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackground((prevBackground) => (prevBackground + 1) % backgroundsUrls.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

    return (
        <div className='generalContainerGameScreen' style={{ backgroundImage: backgroundsUrls[currentBackground], height: screenHeight, width: screenWidth, backgroundSize: 'cover', transition: 'background-image 1s ease-out 0.1s'}}>
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