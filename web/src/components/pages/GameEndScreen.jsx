import React from 'react';
import { useLocation } from 'react-router-dom';

const GameEndScreen = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const p1Winner = queryParams.get('player1Winner');
    const p1WinnerBool = JSON.parse(p1Winner);

    return (
        <div>
            {p1WinnerBool ? (
                <h1>ganadorp1</h1>
            ) : (
                <h1>ganadorp2</h1>
            )}
        </div>
    );
};

export default GameEndScreen;