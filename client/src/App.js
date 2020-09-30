import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from './store';

import { default as GlobalStyle } from './styles/Global';
import Theme from './styles/Theme';

import Navbar from './components/Navbar';
import Container from './components/Container';
import Landing from './pages/Landing';
import Park from './pages/Park';
import Auth from './pages/Auth';
import MyPlaces from './pages/MyPlaces';
import Search from './pages/Search';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

import { getAuth } from './actions/auth-actions';

const App = () => {
  useEffect(() => {
    console.log('useffect');
    store.dispatch(getAuth());
  }, []);
  return (
    <Provider store={store}>
      <Theme>
        <Router>
          <GlobalStyle />
          <ToastContainer position='bottom-right' autoClose={3000} />
          <Navbar />
          <Container className='container'>
            <Switch>
              <Route path='/' exact component={Landing} />
              <Route path='/explore' exact component={Search} />
              <Route path='/park/:parkId' exact component={Park} />
              <Route path='/login' exact component={Auth} />
              <PrivateRoute path='/my-places' exact component={MyPlaces} />
            </Switch>
          </Container>{' '}
          <Footer />
        </Router>
      </Theme>
    </Provider>
  );
};

export default App;
