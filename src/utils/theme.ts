import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    primary: {
      light: '#ff4828',
      main: '#e93525', // AdSensor brand color from homepage https://adsensor.ru/
      dark: '#b5291c',
      contrastText: '#fff',
    },
    background: {
      default: '#2d2d2d',
    },
    mode: 'dark',
  },
});
