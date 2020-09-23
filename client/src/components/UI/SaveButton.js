import React from 'react';
import styled, { css } from 'styled-components';

// import {ReactComponent as AddIcon} from '../../assets/svg/add.svg'
import check from '../../assets/svg/check.svg';
import add from '../../assets/svg/add.svg';

const SaveButtonWrapper = styled.button`
    width: 50px; 
    height: 50px; 
    border-radius: 25px; 
    background: rgba(255,255,255,0.5); 
    transition: width .5s ease; 
    color:#fff; 
    border: none;
    position: relative; 
    padding-left: 30px; 
    overflow: hidden; 
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;

    :hover { 
        width: 115px;
    }
    :hover span { 
        opacity: 1; 
        transition-delay:.3s;  
        transition: all ease .3s; 
    }

    span { 
        white-space: nowrap; 
        transition: all ease .3s; 
        opacity: 0; 
        font-size: 2em; 
        line-height: 20px; 
        transition: all ease .3s;
        padding-left: .5em;
    }
    :after { 
        font-size: 2.6em;
        height: 50px;
        left: 15px;
        position: absolute;
        top: 2px;
        bottom: 0; 
        opacity: 0;
    }

    ${(props) =>
    props.saved === true ? 
    css`
      :after {
        content: url(${check});
        transform: scale(0.7);
        left: 0;
        top: 1px;
        bottom: 0;
        opacity: 1;
      }
    ` : 
      css`
      :after {
        content: url(${add});
        transform: scale(0.7);
        left: 1px;
        top: 1px;
        bottom: 0;
        opacity: 1;
      }`
    };

`

const SaveButton = ({ saved, onSave }) => {
    return <SaveButtonWrapper onClick={() => onSave()} saved={saved}><span>{saved ? 'Saved' : 'Save'}</span></SaveButtonWrapper>
};

export default SaveButton;