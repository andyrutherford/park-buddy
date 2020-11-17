import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import Spinner from '../components/UI/Spinner';
import ParkCard from '../components/cards/ParkCard';

import { getUser } from '../actions/user-actions';
import { fetchParks } from '../utils/fetch';

import background from '../assets/img/landing-bg2.jpg';

const MyPlacesWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  color: #fff;

  h1 {
    font-size: clamp(2em, 5vw, 4em);
    text-align: center;
    margin-left: 0.5em;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 3em 0;
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

const MyPlaces = ({ loading }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [places, setPlaces] = useState([]);
  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    setLocalLoading(false);

    let places = '';
    if (user.savedParks && user.savedParks.length >= 1) {
      places = user.savedParks.join(',');
      fetchParks(places).then((response) => {
        setPlaces(response);
        setLocalLoading(false);
      });
    } else {
      setLocalLoading(false);
    }
  }, [user.savedParks]);

  return (
    <MyPlacesWrapper>
      <div className='header'>
        {/* <img src={user.image} alt='avatar' /> */}
        <h1>My Places</h1>
      </div>
      <div className='results'>
        {loading || localLoading ? (
          <Spinner />
        ) : places.length === 0 ? (
          <h2 style={{ textAlign: 'center' }}>You have no saved places yet.</h2>
        ) : (
          places.map((p, idx) => (
            <ParkCard
              key={idx}
              name={p.name}
              img={p.img}
              location={p.location}
              parkCode={p.parkCode}
            />
          ))
        )}
      </div>
      <div className='page-background'></div>
    </MyPlacesWrapper>
  );
};

// const mapStateToProps = (state) => ({
//   userID: state.auth.user._id,
//   user: state.user,
//   loading: state.user.loading,
// });

export default MyPlaces;
