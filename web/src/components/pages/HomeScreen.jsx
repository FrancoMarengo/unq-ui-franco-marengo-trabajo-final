import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PreGameBoard from '../organisms/PreGameBoard';

const HomeScreen = () => {


    return (
        <DndProvider backend={HTML5Backend}>
          <div>
            <h1>Juego de Batalla Naval</h1>
            <PreGameBoard />
          </div>
        </DndProvider>
      );
};

export default HomeScreen;
