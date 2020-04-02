import React from 'react';
import './Search.scss';

const Search = () => (
  <form class='input-group todo-form mb-3'>
    <input
      type='text'
      class='form-control'
      id='todo-input'
      autocomplete='off'
      placeholder='What Do You Need To Do?'
      aria-label='What Do You Need To Do?'
      aria-describedby='basic-addon2'
    />
    <div class='input-group-append'>
      <button class='btn todoButton' id='todo-button' type='button'>
        Add Todo
      </button>
    </div>
  </form>
);

export default Search;
