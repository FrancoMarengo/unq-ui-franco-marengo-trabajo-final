import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useNavigate } from 'react-router-dom';
import Button from '../atoms/Button';
import './HomeScreen.css'

const HomeScreen = () => {
  const navigate = useNavigate();
  var screenWidth = window.innerWidth;
  var screenHeight = window.innerHeight;

  useEffect(() => {
    const handleResize = () => {
      screenWidth = window.innerWidth;
      screenHeight = window.innerHeight;
      console.log(`Ancho: ${screenWidth}, Alto: ${screenHeight}`);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [screenHeight, screenWidth]);

  const handleClickOnePlayer = () => {
    const queryParams = new URLSearchParams({
      twoPlayers: false,
    });
    navigate(`/PreGameScreen?${queryParams.toString()}`);
  };

  const handleClickTwoPlayers = () => {
    const queryParams = new URLSearchParams({
      twoPlayers: true,
    });
    navigate(`/PreGameScreen?${queryParams.toString()}`);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='homeScreenContainer' style={{ height: screenHeight, width: screenWidth }}>
        <div className='homeScreenMenuContainer'>
          <h1>SEA BATTLE</h1>
          <div className='buttonsContainerHS'>
            <Button onClick={handleClickOnePlayer} text={"ONE PLAYER"} />
            <Button onClick={handleClickTwoPlayers} text={"TWO PLAYERS"} />
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default HomeScreen;
