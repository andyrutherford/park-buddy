import React from 'react';
import styled from 'styled-components';

import LandingCard from '../components/cards/LandingCard';

import background from '../assets/img/landing-bg2.jpg';

const LandingWrapper = styled.div`
  height: 90vh;
  padding: 0 2em;
  color: #fff;

  button {
    padding: 2em 4em 2em 1em;
    width: 15em;
    background: #fff;
    border: 1px solid black;
  }

  .landing-left {
    font-size: 1.5em;
    text-align: center;
  }

  .landing-left p {
    margin: 1em 0 2em 0;
  }

  .landing-right {
  }

  .landing-background {
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
    display: flex;

    padding: 0 5em;
    .landing-left {
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: left;
      width: 30%;
    }

    .landing-left h1 {
      line-height: 1em;
      font-size: 6em;
      font-weight: 500;
    }
    .landing-right {
      display: grid;
      grid-template-columns: repeat(auto-fill, 300px);
      gap: 3em;
      justify-content: flex-end;
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
        <button className='btn'>Explore now -></button>
      </div>
      <div className='landing-right'>
        <LandingCard />
        <LandingCard />
        <LandingCard />
      </div>
      <div className='landing-background'></div>
    </LandingWrapper>
  );
};

export default Landing;
