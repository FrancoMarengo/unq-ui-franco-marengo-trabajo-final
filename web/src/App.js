import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./components/pages/HomeScreen";
import PreGameScreen from './components/pages/PreGameScreen';
import GameScreen from './components/pages/GameScreen';
import GameEndScreen from './components/pages/GameEndScreen';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <HomeScreen/> } /> 
        <Route path="/PreGameScreen" element ={ <PreGameScreen />} />
        <Route path="/GameScreen" element ={ <GameScreen />} />
        <Route path="/GameEndScreen" element ={ <GameEndScreen />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
