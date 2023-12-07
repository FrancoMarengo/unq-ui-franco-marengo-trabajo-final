import React from 'react';
import './Button.css'

const Button = ({ onClick, text }) => {

  return (
    <button onClick={onClick} className='buttonAtomContainer'>{text}</button>
  );
};

export default Button;
