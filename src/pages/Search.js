import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import {ReactComponent as SearchIcon} from '../assets/svg/search.svg'
import background from '../assets/img/landing-bg2.jpg';

import ParkCard from '../components/cards/ParkCard'
import { fetchSearchParks } from '../utils/fetch'

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
        margin: 2em 0;
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
        /* cursor: pointer; */
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
        height: 40%;
        width: 40%;
        margin: 0 1.5em;
        fill: #fff;
        transition: transform 150ms ease-in-out;
    }

    form .btn:hover svg{
        transform: scale(1.1)
    }

    .results {
        width: 70%;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        justify-items: center;

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

    const [query, setQuery] = useState('yose');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');

    const onChange = (e) => {
        setQuery(e.target.value);
    }

    const onSubmit = async e => {
        e.preventDefault();
        setResults([]);
        if (query.length === 0) {
            return setError('Please enter a search term.')
        }
        try {
            const res = await fetchSearchParks(query);
            console.log(res);
            setResults(res);
            setError('');
        } catch (error) {
            setError(error);
        }
    }

    return (
        <SearchWrapper>
            <div className="header">
                <h1>Search Parks</h1>
                <form onSubmit={onSubmit} >
                    <input 
                        type="text"
                        onChange={onChange}
                        value={query}
                        />
                    <button className="btn" style={{cursor: query.length === 0 ? 'not-allowed' : 'pointer'}}><SearchIcon /></button>
                </form>
            </div>
            {results.length > 0 && <div className="results">
                {results.map((i, idx) => <ParkCard key={idx} name={i.name} url={i.url} img={i.img} location={i.location} parkCode={i.parkCode}/>)}
                </div>
            }
            {error && <h2>{error}</h2>}
       
            <div className="page-background"></div>
        </SearchWrapper>
    )
}

export default Search