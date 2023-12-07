import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useLocation } from 'react-router-dom';
import PreGameBoard from '../organisms/PreGameBoard';
import './PreGameScreen.css'

const PreGameScreen = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const twoPlayers = queryParams.get('twoPlayers');

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='generalContainerPGScreen'>
        <h1>Preparate para la batalla, posiciona tus barcos</h1>
        <div className='boardContainerPGScreen'>
          <PreGameBoard secondPlayer={twoPlayers}/>
        </div>
      </div>
    </DndProvider>
  );
};

export default PreGameScreen;
