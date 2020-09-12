import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useParams } from 'react-router-dom';

import { fetchPark } from '../utils/fetch';

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

  ${(props) =>
    props.bg &&
    css`
      .header {
        background-image: url(${props.bg});
        background-size: cover;
      }
    `};

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
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
    </ParkWrapper>
  );
};

export default Park;
