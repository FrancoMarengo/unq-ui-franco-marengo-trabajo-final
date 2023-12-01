import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./components/pages/HomeScreen";
import PreGameScreen from './components/pages/PreGameScreen';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <PreGameScreen/> } /> 
      </Routes>
    </BrowserRouter>
  );
}


export default App;
