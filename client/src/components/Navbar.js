import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';

import SlideNavbar from './SlideNavbar';

import { logout } from '../actions/auth-actions';

import { ReactComponent as LogoIcon } from '../assets/svg/trees.svg';
import { ReactComponent as SearchIcon } from '../assets/svg/search.svg';

const NavbarWrapper = styled.div`
  background: #333;
  position: sticky;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em 2em;
  color: ${(props) => props.theme.colors.textPrimary};

  .nav-left {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .nav-left svg {
    height: 2em;
    fill: #fff;
    margin-right: 0.5em;
  }

  .nav-right {
    display: none;
  }
  .nav-right ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .nav-link {
    margin: 0 max(1em, 3vw);
  }

  .nav-link:hover {
    text-decoration: underline;
  }

  .link {
    font-size: 1em;
    color: #fff;
    background: transparent;
    border: none;
  }

  .link:hover {
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

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    .nav-right {
      display: block;
    }
  }
`;

const Navbar = ({ isAuth, logout }) => {
  const history = useHistory();
  return (
    <nav>
      <SlideNavbar className='mobile-nav' isAuth={isAuth} logout={logout} />
      <NavbarWrapper>
        <div className='nav-left'>
          <Link to='/'>
            <LogoIcon />
          </Link>
          <h1 className='logo'>
            <Link to='/'>Park Buddy</Link>
          </h1>
        </div>
        <div className='nav-right'>
          <ul>
            <li className='nav-link'>
              <Link to='/'>Home</Link>
            </li>
            <li className='nav-link'>
              {isAuth ? (
                <Link to='/my-places'>My Places</Link>
              ) : (
                <Link to='/login'>Login</Link>
              )}
            </li>
            {isAuth && (
              <li className='nav-link'>
                <button className='link' onClick={() => logout()}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
        <div className='nav-right'>
          <button className='btn' onClick={() => history.push('/explore')}>
            <SearchIcon />
          </button>
        </div>
      </NavbarWrapper>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(Navbar);
