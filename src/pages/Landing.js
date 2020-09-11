import React from 'react';
import styled from 'styled-components';

import LandingCard from '../components/cards/LandingCard';

const LandingWrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding: 0 2em;

  button {
    padding: 2em;
    width: 10em;
  }

  .landing-left {
    font-size: 1.5em;
    padding: 3em 0;
    text-align: center;
  }

  .landing-left p {
    margin: 0.5em 0;
  }

  .landing-right {
  }

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    display: flex;

    padding: 0 5em;
    .landing-left {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      text-align: left;
      width: 30%;
    }

    .landing-left h1 {
      font-size: 4em;
    }
    .landing-right {
      display: grid;
      grid-template-columns: repeat(auto-fill, 300px);
      gap: 5em;
      justify-content: center;
      width: 70%;
    }
  }
`;

const Landing = () => {
  return (
    <LandingWrapper>
      <div className='landing-left'>
        <h1>Explore</h1>
        <p>Explore some of America's most beautiful national parks</p>
        <button className='btn'>Explore now</button>
      </div>
      <div className='landing-right'>
        <LandingCard />
        <LandingCard />
        <LandingCard />
      </div>
    </LandingWrapper>
  );
};

export default Landing;
