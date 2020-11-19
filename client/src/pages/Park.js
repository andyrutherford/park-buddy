import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchPark } from '../utils/fetch';
import SaveButton from '../components/UI/SaveButton';
import { RoundButtonWrapper } from '../components/UI/RoundButton';
import ImageCard from '../components/cards/ImageCard';
import Spinner from '../components/UI/Spinner';

import { getSavedParks, savePark } from '../actions/user-actions';

import { ReactComponent as Arrow } from '../assets/svg/right-arrow.svg';
import { ReactComponent as NotFound } from '../assets/svg/notfound.svg';
import { ReactComponent as Pin } from '../assets/svg/pin.svg';
import { ReactComponent as Info } from '../assets/svg/info.svg';

import Map from '../components/Map';

const ParkWrapper = styled.div`
  h2 {
    font-size: clamp(2em, 5vw, 3.5em);
  }

  p {
    font-size: clamp(1em, 3vw, 1.25em);
  }
  li {
    color: #fff;
    padding: 0.5em 0;
  }

  .header {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 800px;
    width: 100%;
    text-align: center;
    color: #fff;
  }

  .header button {
    position: absolute;
    top: 2em;
    right: 2em;
  }

  .header h1 {
    font-size: clamp(4.5em, 8vw, 7em);
  }
  .header p {
    font-size: clamp(1em, 2vw, 3em);
  }

  .park-info {
    background-color: #333;
    color: #fff;
    max-width: 1500px;
    width: 80%;
    margin: -10em auto 2em auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1em 3em;
    flex-wrap: wrap;
    position: relative;
    z-index: 1;
  }

  .park-info div {
    padding: 1em;
  }

  .park-info div p {
    display: flex;
    align-items: center;
  }

  .park-info .btn-round {
    cursor: pointer;
    transition: background-color 150ms ease-in-out;
  }

  .park-info svg {
    height: 70%;
  }

  .park-info .btn-round:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }

  .btn {
    padding: 0.5em 1em;
    background: #fff;
    color: #000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.2em;
    max-width: 165px;
  }

  a svg,
  .btn svg {
    height: 1.5em;
    width: 1.5em;
    transition: transform 200ms ease-in-out;
  }

  .btn:hover svg {
    transform: translateX(30%);
  }

  .overview,
  .weather,
  .activities,
  .topics {
    padding: 0 10%;
    margin-top: 1em;
    margin-bottom: 2em;
    color: #000;
  }

  .secondary-info {
    background: #333;
    max-width: 400px;
    padding: 2em;
    margin: auto;
  }

  .secondary-info .card-body {
    display: flex;
    justify-content: center;
  }

  .secondary-info .card-body .days {
    text-align: right;
    margin-right: 1em;
  }

  .section-3 {
    margin: 0;
  }

  .directions {
    background-color: #333;
    color: #fff;
    max-width: 1500px;
    width: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1em 3em;
    flex-wrap: wrap;
    z-index: 1;
    position: relative;
  }

  .directions div {
    padding-top: 1em;
  }

  .map {
    position: relative;
    width: 100%;
    background: transparent;
    height: 600px;
    padding: 0;
  }

  ${(props) =>
    props.bg1 === '404'
      ? css`
          .header {
            background-color: #000;
            background-size: cover;
            height: 600px;
            background-attachment: fixed;
            background-position: center;
            background-repeat: no-repeat;
          }
        `
      : css`
          .header {
            background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
              url(${props.bg1});
            background-size: cover;
            height: 600px;
            background-attachment: fixed;
            background-position: center;
            background-repeat: no-repeat;
          }
        `};

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    section {
      margin: 4em 10%;
    }

    .section-1 > div {
      margin-bottom: 2em;
    }
    .park-info {
      margin: 0;
      margin-top: -4em;
      margin-left: auto;
      flex-direction: row;
    }

    .overview,
    .weather {
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .overview p,
    .weather p {
      max-width: 800px;
      width: 75%;
    }

    .section-2 .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 3em;
    }

    .section-2 .row div {
      width: max(45%, 375px);
    }

    .activities,
    .topics {
      padding: 0;
    }

    .directions {
      margin: 0;
      margin-right: auto;
      margin-bottom: -5em;
      padding-left: 10%;
    }

    .map {
      padding: 0;
    }
  }
`;

const Park = () => {
  const dispatch = useDispatch();
  const { parkId } = useParams();
  const [loading, setLoading] = useState(true);
  const [parkInfo, setParkInfo] = useState({
    name: '',
    description: '',
    images: [],
    activities: [],
    code: '',
    state: '',
  });
  const [saved, setSaved] = useState(false);
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const { isAuthenticated } = auth;

  useEffect(() => {
    fetchPark(parkId)
      .then((res) => {
        setParkInfo({
          ...parkInfo,
          name: res.name,
          designation: res.designation,
          description: res.description
            ? res.description
            : 'No description available.',
          location: {
            lng: res.longitude,
            lat: res.latitude,
          },
          images: res.images,
          activities: res.activities
            ? res.activities.map((a) => a.name).slice(0, 20)
            : 'No activities available.',
          topics: res.topics.map((t) => t.name).slice(0, 20),
          code: res.parkCode,
          state: res.states,
          url: res.url,
          contact: res.contacts.emailAddresses[0].emailAddress,
          entranceFee: {
            cost: res.entranceFees[0]
              ? res.entranceFees[0].cost === '0.0000'
                ? 'Free'
                : '$' + parseInt(res.entranceFees[0].cost).toFixed(2)
              : 'Price unknown',
            description: res.entranceFees[0]
              ? res.entranceFees[0].description
              : 'No information about entrance fees is available.',
          },
          address: res.addresses[0]
            ? res.addresses[0].city + ', ' + res.addresses[0].stateCode
            : 'Location is unavailable',
          weather: res.weatherInfo
            ? res.weatherInfo
            : 'No weather information available.',
          operatingHours: {
            description: res.operatingHours[0].description,
            days: res.operatingHours[0].standardHours,
          },
          directions: {
            info: res.directionsInfo
              ? res.directionsInfo
              : 'Directions for this park are not available.',
            url: res.directionsUrl
              ? res.directionsUrl
              : 'https://www.nps.gov/index.htm',
          },
        });
        setLoading(false);
      })
      .catch((e) => console.log('An error occurred: ', e.message));
    //eslint-disable-next-line
  }, [parkId]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getSavedParks());
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      if (user.savedParks.includes(parkId)) {
        setSaved(true);
      } else setSaved(false);
    } else setSaved(false);
  }, [user.savedParks, loading, parkId, isAuthenticated]);

  const onSaveHandler = () => {
    if (!isAuthenticated) return toast.error('Please log in to save this park');
    dispatch(savePark(parkInfo.code));
    setSaved(!saved);
  };

  if (loading) return <Spinner />;

  return (
    <ParkWrapper bg1={parkInfo.images[0] ? parkInfo.images[0].url : '404'}>
      <div className='header'>
        <SaveButton saved={saved} onSave={onSaveHandler} />
        <h1 className='name'>{parkInfo.name}</h1>
        <p className='state'>{parkInfo.designation}</p>
      </div>
      <div className='park-info'>
        <div>
          <p>Location</p>
          <p>
            {parkInfo.address}
            <RoundButtonWrapper className='btn-round'>
              <a href='#directions' style={{ display: 'inherit' }}>
                <Pin className='park-icon' />
              </a>
            </RoundButtonWrapper>
          </p>
        </div>
        <div>
          <p>Entrance Fee</p>
          <p>
            {parkInfo.entranceFee.cost}
            <RoundButtonWrapper className='btn-round'>
              <Info
                className='park-icon'
                onClick={() => alert(parkInfo.entranceFee.description)}
              >
                ?
              </Info>
            </RoundButtonWrapper>
          </p>
        </div>
        <div>
          <p>Contact</p>
          <p>{parkInfo.contact}</p>
        </div>
        <div>
          <a
            href={parkInfo.url}
            target='_blank'
            rel='noopener noreferrer'
            className='btn'
          >
            Visit <Arrow />
          </a>
        </div>
      </div>
      <section className='section-1'>
        <div className='overview'>
          <h2>About</h2>
          <p>{parkInfo.description}</p>
        </div>
        <div className='weather'>
          <h2>Weather</h2>
          <p>{parkInfo.weather}</p>
        </div>
      </section>
      <section className='section-2'>
        <div className='row row-1'>
          {parkInfo.images[1] ? (
            <ImageCard
              className='park-img'
              img={parkInfo.images[1].url}
              desc={parkInfo.images[1].title}
            />
          ) : (
            <NotFound />
          )}
          <div className='activities'>
            <h2>Activities</h2>
            <p>
              {parkInfo.activities.length === 0
                ? 'No activities found.'
                : parkInfo.activities.join(', ')}
            </p>
          </div>
        </div>
        <div className='row row-2'>
          <div className='topics'>
            <h2>Topics</h2>
            <p>
              {parkInfo.topics.length === 0
                ? 'No topics found.'
                : parkInfo.topics.join(', ')}
            </p>
          </div>
          {parkInfo.images[2] ? (
            <ImageCard
              className='park-img'
              img={parkInfo.images[2].url}
              desc={parkInfo.images[2].title}
            />
          ) : (
            <NotFound />
          )}
        </div>
      </section>
      <section className='section-3'>
        <div className='directions' id='directions'>
          <h2>Directions</h2>
          <p>{parkInfo.directions.info}</p>
          <div>
            <a
              href={parkInfo.directions.url}
              target='_blank'
              rel='noopener noreferrer'
              className='btn'
            >
              More Info <Arrow />
            </a>
          </div>
        </div>
        <div className='map'>
          {parkInfo.location.lat !== '' && parkInfo.location.lng !== '' ? (
            <Map coordinates={parkInfo.location} />
          ) : (
            <h3
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              No location data available.
            </h3>
          )}
        </div>
      </section>
    </ParkWrapper>
  );
};

export default Park;
