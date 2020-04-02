import React from 'react';
import './TabBar.scss';

const TabBar = () => (
  <div className='tab-bar'>
    <ul class='nav justify-content-center nav-pills mb-3 todo-nav' id='pills-tab' role='tablist'>
      <li class='nav-item'>
        <a
          class='nav-link active'
          id='pills-todos-tab'
          data-toggle='pill'
          href='#pillTodos'
          role='tab'
          aria-controls='pills-home'
          aria-selected='true'
        >
          Todos
        </a>
      </li>
      <li class='nav-item'>
        <a
          class='nav-link'
          id='pills-stats-tab'
          data-toggle='pill'
          href='#pillStats'
          role='tab'
          aria-controls='pills-profile'
          aria-selected='false'
        >
          Stats
        </a>
      </li>
      <li class='nav-item'>
        <a
          class='nav-link'
          id='pills-profile-tab'
          data-toggle='pill'
          href='#pillProfile'
          role='tab'
          aria-controls='pills-contact'
          aria-selected='false'
        >
          Profile
        </a>
      </li>
    </ul>
  </div>
);

export default TabBar;
