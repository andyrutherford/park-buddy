import { createGlobalStyle } from 'styled-components';

const Global = createGlobalStyle`

:root {
  }
	html, body {
		box-sizing: border-box;
		height: 100%;
	}
	*, *:before, *:after {
		padding: 0;
		margin: 0;
		box-sizing: inherit;
    }
    *:focus {
	  outline: none;
	}
	body {
		background-color: lightgrey;
		font-family: sans-serif;
		margin: 0;
	}
	h1, h2, h3, h4, h5, h6 {
        font-family: 'Vollkorn', sans-serif;
        font-weight: normal;
    }
    p {
        font-family: 'Vollkorn', sans-serif;
    }
	a, a:visited {
		text-decoration: none;color: #fff;
	}
	a,
	button,
	input {
		cursor: pointer;
		font-family: 'Vollkorn', sans-serif;
	}
	ul {
		list-style-type: none;
	}

`;

export default Global;
