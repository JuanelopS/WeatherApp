import React, { useState, useEffect } from 'react';
import actualPosition from '../services/actualPosition';
import fetchCity from '../services/fetchCity';
import fetchWeather from '../services/fetchWeather';

import { ThreeBody } from '@uiball/loaders';
import { weatherCodes } from '../helpers/weatherCodes';
import { weatherImages } from '../helpers/weatherImages';
import RoomIcon from '@mui/icons-material/Room';


export const ActualPositionWeather = () => {

  const [ lat, setLat ] = useState();
  const [ long, setLong ] = useState();
  const [ weather, setWeather ] = useState(null);
  const [ city, setCity ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(true);
  
  useEffect(() => {
    getPosition();
    getCity();
    (!!lat && !!long) && getWeather(lat,long);
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
    await fetchWeather(lat, long).then(response => {
      setWeather(response);  
    });
  }    

  // TODO: REFACTORIZAR !ISLOADING 

  if(isLoading) return ( 
    <div className='weather-loading'>
      <ThreeBody size={55} color="white" /> 
    </div>
  );

  return (
    <div className='geolocation-weather-card'>
      <div className='geolocation-weather-text'>
        {/* Weather image */}
        <img className='weather-image' src={'./weather-images/' + weatherImages[weather.current_weather.weathercode]}/>
        <div className='weather-info-container'>
        <h2 className='actual-temp'>{weather.current_weather.temperature}º</h2>  
        <h3>{weatherCodes[weather.current_weather.weathercode]}</h3>
        {/* Wind Speed:{weather.current_weather.windspeed}km/h
        Rain: {weather.daily.precipitation_sum[0]} mm */}
        <h3>Today · {new Date(Date.now()).toLocaleDateString()}</h3>
        <h3><RoomIcon /> {city.city} {city.countryCode}</h3>
        </div>
      </div>
    </div>
  )
}
