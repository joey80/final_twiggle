import React from 'react';
import ContentContainer from './components/ContentContainer/ContentContainer';
import Header from './components/Header/Header';
import TabBar from './components/TabBar/TabBar';
import './global/main.scss';

const App = () => {
  return (
    <div className='app__container'>
      <Header />
      <TabBar />
      <ContentContainer />
    </div>
  );
};

export default App;
