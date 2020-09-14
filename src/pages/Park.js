import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useParams } from 'react-router-dom';

import { fetchPark } from '../utils/fetch';

import { ReactComponent as Arrow } from '../assets/svg/right-arrow.svg';

const ParkWrapper = styled.div`
  section {
    margin: 2em 3em;
  }

  h2 {
    font-size: clamp(2em, 5vw, 4em);
  }

  p {
    font-size: clamp(1em, 3vw, 1.25em);
  }
  li {
    color: #fff;
    padding: 0.5em 0;
  }
  .img {
    height: 600px;
  }
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 500px;
    width: 100%;
    text-align: center;
    color: #fff;
  }

  .header h1 {
    font-size: clamp(3em, 6vw, 6em);
  }
  .header p {
    font-size: clamp(1em, 2vw, 3em);
  }

  .park-info {
    background-color: #333;
    max-width: 1500px;
    width: 80%;
    margin: -2em auto;
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
    display: inline-block;
    padding: 0.5em 1em;
    background: #fff;
    color: #000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.2em;
  }

  .btn svg {
    height: 2em;
    width: 2em;
    transition: transform 200ms ease-in-out;
  }

  .btn:hover svg {
    transform: translateX(30%);
  }

  .section-2 .img {
    display: block;
    margin: auto;
    width: 100%;
    max-width: 500px;
    height: 500px;
    object-fit: cover;
  }

  .secondary-info {
    background: #333;
    padding: 2em;
  }

  .secondary-info .card-body {
    display: flex;
    justify-content: center;
  }

  .secondary-info .card-body .days {
    text-align: right;
    margin-right: 1em;
  }

  ${(props) =>
    props &&
    css`
      .header {
        background-image: url(${props.bg1});
        background-size: cover;
        height: 600px;
        background-attachment: fixed;
        background-position: center;
        background-repeat: no-repeat;
      }
    `};

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    section {
      margin: 4em 15%;
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
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .overview p,
    .weather p {
      max-width: 800px;
      width: 75%;
    }

    .section-2 {
      display: flex;
      align-items: center;
      justify-content: space-between;
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
          images: res.images,
          activities: res.activities,
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
        });
        setLoading(false);
      })
      .catch((e) => console.log('An error occurred: ', e.message));
  }, [parkId]);

  if (loading) return <h1>Loading</h1>;

  return (
    <ParkWrapper bg1={parkInfo.images[0].url} bg2={parkInfo.images[1].url}>
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
        <img className='img' src={parkInfo.images[1].url} alt={parkInfo.name} />
        <div className='secondary-info'>
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
        </div>
      </section>
    </ParkWrapper>
  );
};

export default Park;
