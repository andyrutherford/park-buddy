import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { default as GlobalStyle } from './styles/Global';
import Theme from './styles/Theme';

import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Park from './pages/Park';

const App = () => {
  return (
    <Theme>
      <Router>
        <GlobalStyle />
        <Navbar />
        <div className='container'>
          <Switch>
            <Route path='/' exact component={Landing} />
            <Route path='/park/:parkId' exact component={Park} />
          </Switch>
        </div>
      </Router>
    </Theme>
  );
};

export default App;
