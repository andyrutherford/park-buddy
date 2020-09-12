import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import { fetchPark } from '../utils/fetch';

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
  return (
    <div>
      <h1>{parkId}</h1>
    </div>
  );
};

export default Park;
