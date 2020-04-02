import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ContentContainer from './components/ContentContainer/ContentContainer';
import Header from './components/Header/Header';
import TabBar from './components/TabBar/TabBar';
import './global/main.scss';

const App = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Header />
        </Col>
      </Row>
      <Row>
        <Col>
          <TabBar />
        </Col>
      </Row>
      <Row>
        <Col>
          <ContentContainer />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
