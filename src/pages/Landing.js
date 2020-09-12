import React from 'react';
import styled from 'styled-components';

import LandingCard from '../components/cards/LandingCard';

import { ReactComponent as Arrow } from '../assets/svg/right-arrow.svg';
import background from '../assets/img/landing-bg2.jpg';

const LandingWrapper = styled.div`
  height: 90vh;
  padding: 0 2em;
  color: #fff;

  .btn {
    padding: 1em 1.5em;
    width: 12em;
    background: #fff;
    border: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.2em;
    margin: 0 auto;
  }

  .btn svg {
    height: 2em;
    width: 2em;
    transition: transform 200ms ease-in-out;
  }

  .btn:hover svg {
    transform: translateX(30%);
  }

  .landing-left {
    font-size: 1em;
    font-weight: 500;
    text-align: center;
  }

  .landing-left h1 {
    font-size: 5em;
  }

  .landing-left p {
    font-size: 1.5em;
    margin: 1em 0 2em 0;
  }

  .landing-right {
    margin-top: 4em;
    display: grid;
    grid-auto-flow: row;
    gap: 4em;
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

    .landing-left .btn {
      margin: 0;
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
        <button className='btn'>
          Explore now <Arrow />
        </button>
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
