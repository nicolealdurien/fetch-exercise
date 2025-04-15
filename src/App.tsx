import './App.css';
import { HomePage } from './components/HomePage';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthProvider } from './context/authContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SearchPage } from './components/SearchPage';

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
  palette: {
    text: {
      primary: '#300D38',
      secondary: '#725C78',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
