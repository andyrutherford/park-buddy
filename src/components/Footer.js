import React from 'react';
import styled from 'styled-components';

import github from '../assets/svg/github.svg';

const FooterWrapper = styled.div`
  background: grey;
  padding: 1em;
  max-width: 2000px;
  margin: auto;

  /* .github {
    display: flex;
    align-items: center;
  } */
  .github:after {
    display: inline-block;
    content: ' ';
    background-image: url(${github});
    background-size: 20px 20px;
    height: 20px;
    width: 20px;
    vertical-align: sub;
    margin-left: 0.5em;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    display: flex;
    justify-content: space-around;
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <div>
        <p>National Parks</p>
        <p>
          Made with{' '}
          <span role='img' aria-label='heart'>
            💚 and ☕ 
          </span>{' '}
          by{' '}
          <a
            href='https://github.com/andyrutherford'
            target='_blank'
            rel='noopener noreferrer'
          >
            Andy
          </a>
        </p>
      </div>
      <div>
        <p>
          Data sourced from{' '}
          <a
            href='https://www.nps.gov'
            target='_blank'
            rel='noopener noreferrer'
          >
            NPS.gov
          </a>
        </p>
        <p>
          View me on{' '}
          <a
            className='github'
            href='https://github.com/andyrutherford/national-parks'
            target='_blank'
            rel='noopener noreferrer'
          >
            Github
          </a>
        </p>
      </div>
    </FooterWrapper>
  );
};

export default Footer;
