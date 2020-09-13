import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useParams } from 'react-router-dom';

import { fetchPark } from '../utils/fetch';

import { ReactComponent as Arrow } from '../assets/svg/right-arrow.svg';

const ParkWrapper = styled.div`
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
    align-items: center;
    /* display: grid; */
    /* grid-template-columns: repeat(auto-fill, 200px);
    gap: 2em;
    justify-content: space-between; */
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

  ${(props) =>
    props.bg &&
    css`
      .header {
        background-image: url(${props.bg});
        background-size: cover;
      }
    `};

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    .park-info {
      margin: 0;
      margin-top: -2em;
      margin-left: auto;
      flex-direction: row;
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
          name: res.fullName,
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
        });
        setLoading(false);
      })
      .catch((e) => console.log('An error occurred: ', e.message));
  }, [parkId]);

  if (loading) return <h1>Loading</h1>;

  return (
    <ParkWrapper bg={parkInfo.images[1].url}>
      <div className='header'>
        <h1 className='name'>{parkInfo.name}</h1>
        <p className='state'>{parkInfo.state}</p>
      </div>
      <div className='park-info'>
        <div>
          <p>Location</p>
          <p>{parkInfo.address}</p>
        </div>
        <div>
          <p>Entrance Fee</p>
          <p>{parkInfo.entranceFee.cost}</p>
        </div>
        <div>
          <p>Contact</p>
          <p>{parkInfo.contact}</p>
        </div>
        <div>
          <a href={parkInfo.url} target='_blank' className='btn'>
            Visit <Arrow />
          </a>
        </div>
      </div>
    </ParkWrapper>
  );
};

export default Park;
