import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useNavigate } from 'react-router-dom';

const HomeScreen = () => {
  const navigate = useNavigate();

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
          <div>
            <h1>Juego de Batalla Naval</h1>
            <button onClick={handleClickOnePlayer}>One player</button>
            <button onClick={handleClickTwoPlayers}>Two players</button>
          </div>
        </DndProvider>
      );
};

export default HomeScreen;
