import React, { Fragment } from 'react';
import './Logo.scss';

const Logo = () => (
  <Fragment>
    <span className='logo'>Twiggle</span>
    <span className='logo logo__tagline'> - A Todo App for *name*</span>
  </Fragment>
);

export default Logo;
