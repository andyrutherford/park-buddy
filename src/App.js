import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { default as GlobalStyle } from './styles/Global';
import Theme from './styles/Theme';

import Navbar from './components/Navbar';
import Container from './components/Container';
import Landing from './pages/Landing';
import Park from './pages/Park';
import Footer from './components/Footer';

const App = () => {
  return (
    <Theme>
      <Router>
        <GlobalStyle />
        <Navbar />
        <Container>
          <Switch>
            <Route path='/' exact component={Landing} />
            <Route path='/park/:parkId' exact component={Park} />
          </Switch>
        </Container>
        <Footer />
      </Router>
    </Theme>
  );
};

export default App;
