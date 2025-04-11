import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import fetchLogo from '../assets/fetchLogo.svg';

const HomePage = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1>Welcome to Fetch Dog Rescue!</h1>
      <div
        style={{
          backgroundColor: '#300d38',
          borderRadius: '15px',
          justifyContent: 'center',
          width: '150px',
          padding: '15px',
        }}
      >
        <img src={fetchLogo} alt="Fetch logo" />
      </div>
      <h2>Please log in to get started</h2>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <TextField id="outlined-basic" label="Name" variant="outlined" />
        <TextField id="outlined-basic" label="Email" variant="outlined" />
        <Button variant="contained">Login</Button>
      </div>
      <a href="https://react.dev" target="_blank"></a>
    </div>
  );
};

export { HomePage };
