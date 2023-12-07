import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useLocation } from 'react-router-dom';
import PreGameBoard from '../organisms/PreGameBoard';
import './PreGameScreen.css'

const PreGameScreen = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const twoPlayers = queryParams.get('twoPlayers');

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

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='generalContainerPGScreen' style={{ height: screenHeight, width: screenWidth }}>
        <h1>GET READY FOR NAVAL BATTLE, POSITION YOUR SHIPS</h1>
        <div className='boardContainerPGScreen'>
          <PreGameBoard secondPlayer={twoPlayers}/>
        </div>
      </div>
    </DndProvider>
  );
};

export default PreGameScreen;
