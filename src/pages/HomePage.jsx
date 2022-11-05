import { useState, useEffect } from 'react';

/* COMPONENT IMPORTS  */
import { ActualPositionWeather } from '../components/ActualPositionWeather';
import { NextDaysWeather } from '../components/NextDaysWeather';

/* LOGICAL IMPORTS  */
import actualPosition from '../services/actualPosition';
import fetchCity from '../services/fetchCity';
import { fetchActualWeather } from '../services/fetchWeather';
import { fetchNextWeather } from '../services/fetchWeather';

/*  VISUAL IMPORTS  */
import { Button } from '@mui/material';
import GpsFixedRoundedIcon from '@mui/icons-material/GpsFixedRounded';
import '../styles/HomePage.scss';
import { grey } from '@mui/material/colors';


export const HomePage = () => {

  const [ lat, setLat ] = useState();
  const [ long, setLong ] = useState();
  const [ weather, setWeather ] = useState(null);
  const [ nextWeather, setNextWeather ] = useState(null);
  const [ city, setCity ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    getPosition();
    getCity();
    (!!lat && !!long) && getWeather(lat,long);
    (!!lat && !!long) && getNextWeather(lat,long);
  }, [lat, long]); 


  /* RETRIEVE GEOLOCATION */

  const getPosition = async () => {
    await actualPosition().then(response => {
      setLat(response.coords.latitude);
      setLong(response.coords.longitude);
      
    });
  }

  /* RETRIEVE CITY */

  const getCity = async () => {
    await fetchCity(lat, long).then(response => {
      setCity(response);
    });
  }

  /* RETRIEVE WEATHER */

  const getWeather = async (lat, long) => {
    setTimeout(() => setIsLoading(false), 2500);
    await fetchActualWeather(lat, long).then(response => {
      setWeather(response);  
    });
  } 
  
  /* RETRIEVE NEXT WEATHER */

  const getNextWeather = async (lat, long) => {
    setTimeout(() => setIsLoading(false), 2500);
    await fetchNextWeather(lat, long)
            .then(response => setNextWeather(response));
  } 

  return (
    <div className='homepage'>
      <header>
        <NextDaysWeather 
          weather = { nextWeather }
          isLoading = { isLoading }
        />
      </header>
      <main>Main</main>
      <aside>
        <div className='actual-weather-buttons'>
          <Button variant='contained' sx={{ backgroundColor: grey[500] }}>Search for places</Button>
          <GpsFixedRoundedIcon sx={{ color: grey[50] }} className='gps-icon'/>
        </div>
        <div className='weather-info'>
          <ActualPositionWeather 
                city = { city } 
                weather = { weather }
                isLoading = { isLoading }
          />
        </div>
      </aside>
    </div>
  )
}

export default HomePage;