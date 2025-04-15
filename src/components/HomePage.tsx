import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import fetchLogo from '../assets/fetchLogo.svg';
import { useAuth } from '../utilities/useAuth';
import { BASE_URL } from '../constants/BASE_URL';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { name, email, setName, setEmail } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = `${BASE_URL}/auth/login`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ name, email }),
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      } else {
        navigate('/search');
      }
    } catch (error) {
      console.error((error as Error).message);
    }
  };

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
      <form
        onSubmit={e => handleLogin(e)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Button variant="contained" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};

export { HomePage };
