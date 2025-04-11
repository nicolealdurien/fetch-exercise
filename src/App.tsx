import './App.css';
import { HomePage } from './components/HomePage';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthProvider } from './context/authContext';

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: '#FFA900',
          color: '#300D38',
          '&:hover': {
            backgroundColor: '#890a74',
            color: '#fff',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: '#300d38',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#300d38',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#300d38',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#300d38',
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <HomePage />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
