import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import GameBoard from '../organisms/GameBoard';
import './PreGameScreen.css'

const PreGameScreen = () => {


    return (
        <DndProvider backend={HTML5Backend}>
          <div className='generalContainerPGScreen'>
          <h1>Preparate para la batalla, posiciona tus barcos</h1>
          <div className='boardContainerPGScreen'> 
            <GameBoard />
          </div>
          </div>
        </DndProvider>
      );
};

export default PreGameScreen;
