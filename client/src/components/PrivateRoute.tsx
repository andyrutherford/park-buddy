import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Spinner from './UI/Spinner';
import { RootState } from '../reducers';

type Props = {
  component: React.ElementType;
};

const PrivateRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
  const { isAuthenticated, loading } = useSelector(
    (state: RootState) => state.auth
  );
  return (
    <Route
      {...rest}
      render={(props) =>
        loading ? (
          <Spinner />
        ) : isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to='/login' />
        )
      }
    />
  );
};

export default PrivateRoute;
