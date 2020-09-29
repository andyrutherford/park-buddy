import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Spinner from '../components/UI/Spinner';
import ParkCard from '../components/cards/ParkCard';

import { getUser } from '../actions/user-actions';

import background from '../assets/img/landing-bg2.jpg';

const MyPlacesWrapper = styled.div`
  h1 {
    font-size: clamp(2em, 5vw, 4em);
    text-align: center;
    margin-left: 0.5em;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .header img {
    border-radius: 50vh;
    height: clamp(3em, 5vw, 5em);
  }

  .results {
    width: 70%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    justify-items: center;
    gap: 2em;
  }

  .page-background {
    background-image: url(${background});
    position: fixed;
    top: 50%;
    left: 50%;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    z-index: -100;
    -webkit-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
    background-size: cover;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    h1 {
      text-align: left;
    }

    .header {
      justify-content: flex-start;
    }
  }
`;

const MyPlaces = ({ isAuthenticated, getUser, userID, loading, user }) => {
  const history = useHistory();
  if (!isAuthenticated) history.push('/login');

  useEffect(() => {
    getUser(userID);
  }, []);

  if (loading) return <Spinner />;

  return (
    <MyPlacesWrapper>
      <div className='header'>
        <img src={user.image} />
        <h1>My Places</h1>
      </div>
      <div className='results'>
        {user.savedPlaces.length === 0 ? (
          <h1>You have no saved places yet.</h1>
        ) : (
          user.savedPlaces.map((p) => <p>{p}</p>)
        )}
      </div>
      <div className='page-background'></div>
    </MyPlacesWrapper>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  userID: state.auth.user._id,
  loading: state.user.loading,
  user: state.user,
});

export default connect(mapStateToProps, { getUser })(MyPlaces);
