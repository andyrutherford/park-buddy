import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useParams } from 'react-router-dom';

import { fetchPark } from '../utils/fetch';

import { ReactComponent as Arrow } from '../assets/svg/right-arrow.svg';
import {ReactComponent as NotFound} from '../assets/svg/notfound.svg';

import Map from '../components/Map';

const ParkWrapper = styled.div`
  section {
    /* margin: 2em 3em; */
  }

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
  .img-1,
  .img-2 {
    height: 600px;
  }
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 800px;
    width: 100%;
    text-align: center;
    color: #fff;
  }

  .header h1 {
    font-size: clamp(4.5em, 8vw, 7em);
  }
  .header p {
    font-size: clamp(1em, 2vw, 3em);
  }

  .park-info {
    background-color: #333;
    max-width: 1500px;
    width: 80%;
    margin: -10em auto 2em auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1em 3em;
    flex-wrap: wrap;
  }

  .park-info div {
    padding: 1em;
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

  .btn svg {
    height: 2em;
    width: 2em;
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
  }

  .section-2 .row .img-1,
  .section-2 .row .img-2 {
    display: block;
    height: 400px;
    width: 100%;
    max-width: ${(props) => props.theme.breakpoints.lg};
    object-fit: cover;
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

  .map {
    width: 100%;
    background: transparent;
    height: 600px;
    padding: 0;
  }

  ${(props) =>
    props.bg1 ==='404' ? 
    css`
      .header {
       background-color: #000;
        background-size: cover;
        height: 600px;
        background-attachment: fixed;
        background-position: center;
        background-repeat: no-repeat;
      }
    ` : 
      css`
      .header {
        background-image: url(${props.bg1});
        background-size: cover; 
        height: 600px;
        background-attachment: fixed;
        background-position: center;
        background-repeat: no-repeat;
      }`
    };

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
    }

    .section-2 .row .img-1,
    .section-2 .row .img-2 {
      margin: 0;
      max-width: 50%;
    }

    .section-2 .row .img-1 {
      margin-right: 2em;
    }
    .section-2 .row .img-2 {
      margin-left: 2em;
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

  useEffect(() => {
    fetchPark(parkId)
      .then((res) => {
        setParkInfo({
          ...parkInfo,
          name: res.name,
          designation: res.designation,
          description: res.description,
          location: {
            lng: res.longitude,
            lat: res.latitude,
          },
          images: res.images,
          activities: res.activities.map((a) => a.name).slice(0, 20),
          topics: res.topics.map((t) => t.name).slice(0, 20),
          code: res.parkCode,
          state: res.states,
          url: res.url,
          contact: res.contacts.emailAddresses[0].emailAddress,
          entranceFee: {
            cost: '$' + parseInt(res.entranceFees[0].cost).toFixed(2),
            description: res.entranceFees[0].description,
          },
          address: res.addresses[0].city + ', ' + res.addresses[0].stateCode,
          weather: res.weatherInfo,
          operatingHours: {
            description: res.operatingHours[0].description,
            days: res.operatingHours[0].standardHours,
          },
          directions: {
            info: res.directionsInfo,
            url: res.directionsUrl,
          },
        });
        setLoading(false);
      })
      .catch((e) => console.log('An error occurred: ', e.message));
  }, [parkId]);

  if (loading) return <h1>Loading</h1>;

  return (
    <ParkWrapper bg1={parkInfo.images[0]? parkInfo.images[0].url : '404'}>
      <div className='header'>
        <h1 className='name'>{parkInfo.name}</h1>
        <p className='state'>{parkInfo.designation}</p>
      </div>
      <div className='park-info'>
        <div>
          <p>Location</p>
          <p>{parkInfo.address}</p>
        </div>
        <div>
          <p>Entrance Fee</p>
          <p>
            {parkInfo.entranceFee.cost}
            <button onClick={() => alert(parkInfo.entranceFee.description)}>
              ?
            </button>
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
        <div className='row'>
          {parkInfo.images[1] ? <img
            className='img-1'
            src={parkInfo.images[1].url}
            alt={parkInfo.name}
          /> : <NotFound />}
          <div className='activities'>
            <h2>Activities</h2>
            <p>{parkInfo.activities.length === 0 ? 'No activities found.' : parkInfo.activities.join(', ')}</p>
          </div>
        </div>
        <div className='row'>
          <div className='topics'>
            <h2>Topics</h2>
            <p>{parkInfo.topics.length === 0 ? 'No topics found.' : parkInfo.topics.join(', ')}</p>
          </div>
          {parkInfo.images[2] ? <img
            className='img-2'
            src={parkInfo.images[2].url}
            alt={parkInfo.name}
          /> : <NotFound />}
        </div>
      </section>
      <section className='section-3'>
        <div className='directions'>
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
          <Map coordinates={parkInfo.location} />
        </div>
      </section>
    </ParkWrapper>
  );
};

export default Park;

{
  /* <div className='secondary-info'>
          <p>
            Operating Hours{' '}
            <button onClick={() => alert(parkInfo.operatingHours.description)}>
              ?
            </button>
          </p>
          <div className='card-body'>
            <div className='days'>
              <ul>
                <li>Monday</li>
                <li>Tuesday</li>
                <li>Wednesday</li>
                <li>Thursday</li>
                <li>Friday</li>
                <li>Saturday</li>
                <li>Sunday</li>
              </ul>
            </div>
            <div className='hours'>
              <ul>
                <li>{parkInfo.operatingHours.days.Monday}</li>
                <li>{parkInfo.operatingHours.days.Tuesday}</li>
                <li>{parkInfo.operatingHours.days.Wednesday}</li>
                <li>{parkInfo.operatingHours.days.Thursday}</li>
                <li>{parkInfo.operatingHours.days.Friday}</li>
                <li>{parkInfo.operatingHours.days.Saturday}</li>
                <li>{parkInfo.operatingHours.days.Sunday}</li>
              </ul>
            </div>
          </div>
        </div> */
}
