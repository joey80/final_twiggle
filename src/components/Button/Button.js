import React from 'react';
import './Button.scss';

const Button = ({ children, onClick }) => (
  <button className='btn btn-primary button' type='button' onClick={onClick}>
    {children}
  </button>
);

export default Button;
