import React from 'react';
import styled from 'styled-components';

import github from '../assets/svg/github.svg';

const FooterWrapper = styled.div`
  background: #333;
  color: #fff;
  padding: 1em 0;
  width: 100%;
  margin: auto;
  position: absolute;
  bottom: 0;
  z-index: 2;

  .footer-container {
    margin: auto;
    max-width: 2000px;
    align-items: center;
    text-align: center;
  }

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
    .footer-container {
      display: flex;
      justify-content: space-around;
      text-align: left;
    }
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <div className='footer-container'>
        <div>
          <p>Park Buddy © 2020</p>
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
              href='https://github.com/andyrutherford/park-buddy'
              target='_blank'
              rel='noopener noreferrer'
            >
              Github
            </a>
          </p>
        </div>
      </div>
    </FooterWrapper>
  );
};

export default Footer;
