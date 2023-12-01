import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import GameBoard from '../organisms/GameBoard';

const HomeScreen = () => {


    return (
        <DndProvider backend={HTML5Backend}>
          <div>
            <h1>Juego de Batalla Naval</h1>
            <GameBoard />
          </div>
        </DndProvider>
      );
};

export default HomeScreen;
