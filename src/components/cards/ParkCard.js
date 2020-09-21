import React from 'react';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';

const ParkCardWrapper = styled.div`
    height: 250px;
    width: 250px;
    padding: 1em;
    border: 2px solid green;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;

    h2 {
        text-align: center;
        font-size: 1.75em;
        transition: transform 150ms ease-in-out;
    }

    p {
        font-size: 1em;
        opacity: 0;
        transition: opacity 150ms ease-in-out, transform 150ms ease-in-out;
        margin-top: 1em;
    }

    :hover h2 {
        transform: scale(1.05)
    }

    :hover p {
        opacity: 1;
        transform: translateY(-.5em)
    }
`;

const ParkCard = ({ name, url, img, location, parkCode}) => {

    const history = useHistory();

    return <ParkCardWrapper onClick={() => history.push(`/park/${parkCode}`)}>
        <div className="name">
            <h2>{name}</h2>  
        </div>
        <div className="location">
            <p>{location}</p>
        </div>
    </ParkCardWrapper>
}

export default ParkCard;