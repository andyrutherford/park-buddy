import styled, { css } from 'styled-components';

export const LoginForm = styled.form`
  text-align: center;
  font-family: Volkorn;
  input {
    display: block;
    font-size: 1.5rem;
    color: #fff;
    cursor: auto;
    height: 2em;
    width: 12em;
    margin: 0.5em 0;
    padding: 0 0.5em;
    background-color: rgba(255, 255, 255, 0.5);
    border: 1px solid #fff;
  }

  .btn {
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid #fff;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.2em;
    margin: 0.5em auto;
    padding: 0.5em 1em;
  }
`;
