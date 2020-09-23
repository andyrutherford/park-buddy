import React from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';

import { ReactComponent as LogoIcon } from '../assets/svg/trees.svg';
import { ReactComponent as SearchIcon } from '../assets/svg/search.svg';

const NavbarWrapper = styled.div`
  background: transparent;
  position: sticky;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em 2em;
  color: ${(props) => props.theme.colors.textPrimary};

  .nav-left {
    display: flex;
    justify-content: center;
  }
  .nav-left svg {
    height: 2em;
    fill: #fff;
    margin-right: 0.5em;
  }
  .nav-right ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .nav-link {
    padding: 0 3em;
  }

  .nav-link:hover {
    text-decoration: underline;
  }

  .btn {
    background-color: rgba(255, 255, 255, 0.2);
    height: 3.5em;
    width: 3.5em;
    border-radius: 50vh;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 150ms ease-in-out;
  }

  .btn:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }

  .btn:hover svg {
    transform: scale(1.1);
  }

  .btn svg {
    width: 40%;
    height: 40%;
    fill: #fff;
    transition: transform 150ms ease-in-out;
  }
`;

const Navbar = () => {
  const history = useHistory();
  return (
    <NavbarWrapper>
      <div className='nav-left'>
        <LogoIcon />
        <h1 className='logo'>
          <Link to='/'>National Parks</Link>
        </h1>
      </div>
      <div className='nav-right'>
        <ul>
          <li className='nav-link'>
            <Link to='/'>Home</Link>
          </li>
          <li className='nav-link'>
            <Link to='#!'>About</Link>
          </li>
          <li className='nav-link'>
            <Link to='#!'>Explore</Link>
          </li>
        </ul>
      </div>
      <div>
        <button className='btn' onClick={() => history.push('/explore')}>
          <SearchIcon />
        </button>
      </div>
    </NavbarWrapper>
  );
};

export default Navbar;