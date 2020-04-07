import React, { useState } from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import './Search.scss';

const Search = () => {
  const [inputVal, setInputVal] = useState('');

  const onClick = e => {
    e.preventDefault();
    console.log('you clicked me!', inputVal);
  };

  return (
    <form className='search' onSubmit={onClick}>
      <div className='input-group mb-3'>
        <Input onChange={e => setInputVal(e.target.value)} />
        <div className='input-group-append'>
          <Button onClick={onClick}>Add Todo</Button>
        </div>
      </div>
    </form>
  );
};

export default Search;
