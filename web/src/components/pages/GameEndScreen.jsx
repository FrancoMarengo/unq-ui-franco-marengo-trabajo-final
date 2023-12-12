import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../atoms/Button'
import './GameEndScreen.css'

const GameEndScreen = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const p1Winner = queryParams.get('player1Winner');
    const twoPlayers = queryParams.get('twoPlayers')
    const twoPlayersBool = JSON.parse(twoPlayers);
    const p1WinnerBool = JSON.parse(p1Winner);

    const navigate = useNavigate();

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

    const handleGoToHomeScreenClick = () => {
        navigate(`/HomeScreen`);
    }

    const handlePlayAnotherMatchClick = () => {
        const queryParams = new URLSearchParams({
            twoPlayers: twoPlayersBool,
          });
          navigate(`/PreGameScreen?${queryParams.toString()}`);
    }

    return (
        <div className='generalContainerEnd' style={{ width: screenWidth, height: screenHeight }}>
            <div className='itemsContainerEnd'>
                {p1WinnerBool ? (
                    <h1>PLAYER 1 WINS, CONGRATULATIONS CAPTAIN</h1>
                ) : (
                    <h1>PLAYER 2 WINS, CONGRATULATIONS CAPTAIN</h1>
                )}
                <div className='buttonsContainerEnd'>
                    <Button text={"RETURN TO HOME SCREEN"} onClick={handleGoToHomeScreenClick}/>
                    <Button text={"PLAY ANOTHER MATCH"} onClick={handlePlayAnotherMatchClick}/>
                </div>
            </div>
        </div>
    );
};

export default GameEndScreen;