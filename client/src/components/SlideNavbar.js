import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';

const MenuWrapper = styled.div`
  button {
    display: block;
    background: transparent;
    border: none;
    padding: 1.5em 0;
    font-size: 1em;
    color: #fff;
  }

  /* Position and sizing of burger button */
  .bm-burger-button {
    position: fixed;
    width: 36px;
    height: 30px;
    right: 23px;
    top: 23px;
  }

  /* Color/shape of burger icon bars */
  .bm-burger-bars {
    background: rgba(255, 255, 255, 0.7);
  }

  /* Color/shape of burger icon bars on hover*/
  .bm-burger-bars-hover {
    background: #fff;
  }

  /* Position and sizing of clickable cross button */
  .bm-cross-button {
    height: 24px;
    width: 24px;
  }

  /* Color/shape of close button cross */
  .bm-cross {
    background: #bdc3c7;
  }

  /*
Sidebar wrapper styles
Note: Beware of modifying this element as it can break the animations - you should not need to touch it in most cases
*/
  .bm-menu-wrap {
    position: fixed;
    height: 100%;
  }

  /* General sidebar styles */
  .bm-menu {
    background: #373a47;
    padding: 2.5em 1.5em 0;
    font-size: 1.15em;
  }

  /* Morph shape necessary with bubble or elastic */
  .bm-morph-shape {
    fill: #373a47;
  }

  /* Wrapper for item list */
  .bm-item-list {
    color: #b8b7ad;
    padding: 0.8em;
  }

  /* Individual item */
  .bm-item {
    display: inline-block;
    padding: 1.5em 0;
  }

  /* Styling of overlay */
  .bm-overlay {
    background: rgba(0, 0, 0, 0.3);
  }

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    display: none;
  }
`;

const SlideNavbar = ({ isAuth, logout }) => {
  return (
    <MenuWrapper>
      <Menu right width={250}>
        <Link to='/' className='menu-item'>
          Home
        </Link>
        <Link to='/explore' className='menu-item'>
          Explore
        </Link>
        {isAuth ? (
          <>
            <Link to='/my-places' className='bm-item menu-item'>
              My Places
            </Link>
            <button className='menu-item' onClick={() => logout()}>
              Log out
            </button>
          </>
        ) : (
          <Link to='/login' className='menu-item'>
            Signup / Log in
          </Link>
        )}
      </Menu>
    </MenuWrapper>
  );
};

export default SlideNavbar;
