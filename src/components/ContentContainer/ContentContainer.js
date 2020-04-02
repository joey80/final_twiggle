import React from 'react';
import './ContentContainer.scss';

const ContentContainer = () => (
  <div class='tab-content text-center' id='pills-tabContent'>
    <div
      class='tab-pane fade show active'
      id='pillTodos'
      role='tabpanel'
      aria-labelledby='pills-todos-tab'
    >
      TODOS
    </div>
    <div class='tab-pane fade' id='pillStats' role='tabpanel' aria-labelledby='pills-stats-tab'>
      STATS
    </div>
    <div class='tab-pane fade' id='pillProfile' role='tabpanel' aria-labelledby='pills-profile-tab'>
      PROFILE
    </div>
  </div>
);

export default ContentContainer;
