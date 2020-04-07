import React, { useState } from 'react';
import { Data } from './TabBar.data';
import './TabBar.scss';

const TabBar = () => {
  const [selected, setSelected] = useState('pills-todos');

  return (
    <div className='tab-bar'>
      <ul className='nav nav-pills tab-bar__nav' id='pills-tab' role='tablist'>
        {Data.map(({ controls, href, name }, index) => (
          <li className='tab-bar__item' key={index}>
            <a
              className={selected === controls ? 'nav-link active' : 'nav-link'}
              id='pills-stats-tab'
              data-toggle='pill'
              href={href}
              role='tab'
              aria-controls={controls}
              aria-selected={selected === controls}
              onClick={() => setSelected(controls)}
            >
              {name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TabBar;
