import React from 'react';
import Logo from '../Logo/Logo';
import Search from '../Search/Search';
import './Header.scss';

const Header = () => (
  <header className='header'>
    <Logo />
    <Search />
  </header>
);

export default Header;
