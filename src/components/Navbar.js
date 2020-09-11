import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavbarWrapper = styled.div`
  border: 1px solid red;
  position: sticky;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em 2em;

  .nav-right ul {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  .nav-link {
    padding: 0 1em;
  }
`;

const Navbar = () => {
  return (
    <NavbarWrapper>
      <div className='nav-left'>
        <h1 className='logo'>National Parks</h1>
      </div>
      <div className='nav-right'>
        <ul>
          <li className='nav-link'>
            <Link to='#!'>Home</Link>
          </li>
          <li className='nav-link'>
            <Link to='#!'>About</Link>
          </li>
          <li className='nav-link'>
            <Link to='#!'>Explore</Link>
          </li>
        </ul>
      </div>
    </NavbarWrapper>
  );
};

export default Navbar;
