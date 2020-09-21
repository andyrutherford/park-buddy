import React from 'react';
import styled from 'styled-components';

import {ReactComponent as SearchIcon} from '../assets/svg/search.svg'
import background from '../assets/img/landing-bg2.jpg';

const SearchWrapper = styled.div`
    color: #fff;
    height: 700px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h1 {
        font-size: 5em;
        text-align: center;
    }

    form {
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    form input[type=text] {
        width: 80%;
        height: 100%;
        border-top-left-radius: 5px;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
        border-bottom-left-radius: 5px;
        border: none;
        padding: 1em;
        font-size: 1.25em;
    }

    form .btn {
        cursor: pointer;
        height: 100%;
        border-top-left-radius: 0px;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        border-bottom-left-radius: 0px;
        border: none;
        background-color: rgba(255,255,255,0.3);
        transition: background-color 150ms ease-in-out;
    }

    form .btn:hover {
        background-color: rgba(255,255,255,0.35);
    }

    form .btn svg {
        height: 45%;
        width: 45%;
        margin: 0 1em;
        fill: #fff;
        transition: transform 150ms ease-in-out;
    }

    form .btn:hover svg{
        transform: scale(1.1)
    }

    .page-background {
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
`;

const Search = () => {
    return (
        <SearchWrapper>
            <div className="header">
                <h1>Search Parks</h1>
                <form>
                    <input 
                        type="text"
                        placeholder="search for a park" />
                    <button className="btn"><SearchIcon /></button>
                </form>
            </div>
       
            <div className="page-background"></div>
        </SearchWrapper>
    )
}

export default Search
