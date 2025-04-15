import Button from '@mui/material/Button';
import fetchLogo from '../assets/fetchLogo.svg';
import { useAuth } from '../utilities/useAuth';
import { BASE_URL } from '../constants/BASE_URL';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect, useState } from 'react';

interface IDogDataTypes {
  age: number;
  breed: string;
  id: string;
  img: string;
  name: string;
  zip_code: string;
}

const fake_dog_data = [
  {
    age: 14,
    breed: 'Affenpinscher',
    id: 'qcD-OZUBBPFf4ZNZzDCC',
    img: 'https://frontend-take-home.fetch.com/dog-images/n02110627-affenpinscher/n02110627_10225.jpg',
    name: 'Brionna',
    zip_code: '06519',
  },
  {
    age: 1,
    breed: 'Great Dane',
    id: 'qcD-OZUBBPFf4ZNZzDCC',
    img: 'https://frontend-take-home.fetch.com/dog-images/n02110627-affenpinscher/n02110627_11798.jpg',
    name: 'Melody',
    zip_code: '06519',
  },
  {
    age: 0,
    breed: 'Weimeraner',
    id: 'qcD-OZUBBPFf4ZNZzDCC',
    img: 'https://frontend-take-home.fetch.com/dog-images/n02110627-affenpinscher/n02110627_12512.jpg',
    name: 'Nathan',
    zip_code: '06519',
  },
];

const SearchPage = () => {
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('asc');
  const [dogData, setDogData] = useState<IDogDataTypes[] | []>([]);
  const { name } = useAuth();
  const navigate = useNavigate();

  const PER_PAGE = 40;

  const params = {
    size: PER_PAGE.toString(),
    from: (PER_PAGE * (page - 1)).toString(),
    sort: `breed:${sortOrder}`,
  };

  const searchUrl = `${BASE_URL}/dogs/search?size=${params.size}&from=${params.from}&sort=${params.sort}`;

  const handleLogout = async () => {
    const url = `${BASE_URL}/auth/logout`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  const retrieveDogInfo = useCallback(async (ids: string[]) => {
    try {
      const response = await fetch('https://frontend-take-home-service.fetch.com/dogs', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ids),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      console.log(result);
      setDogData(result);
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        throw new Error((error as Error).message);
      }
    }
  }, []);

  // useEffect(() => {
  //   const getDogIds = async () => {
  //     try {
  //       const response = await fetch(searchUrl, {
  //         method: 'GET',
  //         credentials: 'include',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       });
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const data = await response.json();
  //       return data.resultIds;
  //     } catch (error) {
  //       if ((error as Error).name !== 'AbortError') {
  //         throw new Error((error as Error).message);
  //       }
  //     }
  //   };

  //   getDogIds()
  //     .then(res => {
  //       retrieveDogInfo(res);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }, [page, retrieveDogInfo, searchUrl, sortOrder]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div style={{ alignItems: 'flex-end', marginLeft: 'auto' }}>
        <Button
          variant="contained"
          onClick={() => handleLogout()}
          sx={{ height: '25px', width: '80px' }}
        >
          Logout
        </Button>
      </div>
      {name ? <h1>Hello, {name}!</h1> : <h1>Hello!</h1>}
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
      <h2>Find your new best friend:</h2>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          maxWidth: '98%',
        }}
      >
        {/* {dogData.map(dog => { */}
        {fake_dog_data.map(dog => {
          return (
            <div key={dog.id} style={{ display: 'flex', flexDirection: 'row', padding: '20px' }}>
              <Card sx={{ maxWidth: 400, border: '3px solid #FFA900' }}>
                <CardMedia sx={{ height: 200, width: 200 }} image={dog.img} title="photo of dog" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" sx={{ color: '#300D38' }}>
                    {dog.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#725C78' }}>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <div className="dogInfoLabel">Age:&nbsp;</div>
                        <div>{dog.age === 0 ? '< 1' : dog.age}</div>
                      </div>
                      <div>
                        <div>Breed:&nbsp;</div>
                        <div>{dog.breed}</div>
                      </div>
                    </div>
                  </Typography>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { SearchPage };
