import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { ReactComponent as SearchIcon } from '../assets/svg/search.svg';
import background from '../assets/img/landing-bg2.jpg';
import parkPlaceholder from '../assets/img/park-placeholder.jpg';

import Spinner from '../components/UI/Spinner';
import ParkCard from '../components/cards/ParkCard';
import { fetchSearchParks, fetchRandomPark } from '../utils/fetch';

const SearchWrapper = styled.div`
  color: #fff;
  margin-top: 250px;
  display: flex;
  align-items: center;
  flex-direction: column;

  h1 {
    font-size: 5em;
    text-align: center;
  }

  .header {
    display: flex;
    flex-direction: column;
  }

  form {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2em 0 3em;
  }

  form input[type='text'] {
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

  .btn {
    height: 60px;
    width: 6em;
    border-top-left-radius: 0px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 0px;
    border: none;
    background-color: rgba(255, 255, 255, 0.3);
    transition: background-color 150ms ease-in-out;
  }

  .btn:hover {
    background-color: rgba(255, 255, 255, 0.35);
  }

  .btn svg {
    height: 40%;
    width: 40%;
    margin: 0 1.5em;
    fill: #fff;
    transition: transform 150ms ease-in-out;
  }

  .btn:hover svg {
    transform: scale(1.1);
  }

  .explore-btn {
    margin: auto;
    color: #fff;
    border-radius: 5px;
    width: 120px;
    font-size: 1.125rem;
  }

  .results {
    width: 70%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    justify-items: center;
    gap: 2em;
  }

  .show-more {
    border: 0.5px solid white;
    background-color: rgba(255, 255, 255, 0.35);
    font-size: 1.25em;
    margin: 3em 0 7em;
    color: #fff;
    padding: 0.5em 1em;
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
  const history = useHistory();
  const resultsToShow = 8;
  const [limit, setLimit] = useState(resultsToShow);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setQuery(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLimit(resultsToShow);
    setResults([]);
    if (query.length === 0) {
      return setError('Please enter a search term.');
    }
    try {
      setLoading(true);
      const res = await fetchSearchParks(query);
      setResults(res);
      setError('');
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const surpriseMeHandler = () => {
    fetchRandomPark().then((res) => history.push(`/park/${res.parkCode}`));
  };

  return (
    <SearchWrapper>
      <div className='header'>
        <h1>Explore</h1>
        <form onSubmit={onSubmit}>
          <input type='text' onChange={onChange} value={query} />
          <button
            className='btn'
            style={{ cursor: query.length === 0 ? 'not-allowed' : 'pointer' }}
          >
            <SearchIcon />
          </button>
        </form>
        {query.length === 0 && (
          <button onClick={surpriseMeHandler} className='btn explore-btn'>
            Surprise me
          </button>
        )}
      </div>
      {loading ? (
        <Spinner />
      ) : (
        results.length > 0 && (
          <div className='results'>
            {results
              .map((i, idx) => (
                <ParkCard
                  key={idx}
                  name={i.name}
                  url={i.url}
                  img={i.img || parkPlaceholder}
                  location={i.location}
                  parkCode={i.parkCode}
                />
              ))
              .slice(0, limit)}
          </div>
        )
      )}
      {error && <h2>{error}</h2>}
      {results.length > 0 && results.length > limit && (
        <button
          className='show-more'
          onClick={() => setLimit(limit + resultsToShow)}
        >
          Show more
        </button>
      )}
      <div className='page-background'></div>
    </SearchWrapper>
  );
};

export default Search;
