import styled, { css } from 'styled-components';

const LoginWithButton = styled.button`
  color: #ffffff;
  font-size: 1.5em;
  display: flex;
  align-items: center;
  border-radius: 10px;
  border: 1px solid white;
  padding: 0.5em;
  width: 12em;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 1px 2px;

  svg {
    transition: transform 150ms ease-in-out;
  }
  ${(props) =>
    props.type === 'github' &&
    css`
      background: #333;
    `};
  ${(props) =>
    props.type === 'facebook' &&
    css`
      background: #3b5998;
    `};

  :hover svg {
    transform: scale(1.2);
  }
`;

export default LoginWithButton;
