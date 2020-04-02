import React from 'react';
import './Input.scss';

const Input = ({ onChange }) => (
  <input
    onChange={onChange}
    type='text'
    className='form-control input'
    placeholder='What Do You Need To Do?'
    aria-label='What Do You Need To Do?'
    aria-describedby='basic-addon2'
  />
);

export default Input;
