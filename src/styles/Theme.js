import React from 'react';
import { ThemeProvider } from 'styled-components';

import lightTheme from './LightTheme';

const Theme = ({ children, darkMode }) => (
  <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
);

export default Theme;
