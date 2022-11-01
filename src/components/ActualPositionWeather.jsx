import React, { useState, useEffect } from 'react';
import { ThreeBody } from '@uiball/loaders';
import { weatherCodes } from '../helpers/weatherCodes';
import { weatherImages } from '../helpers/weatherImages';
import RoomIcon from '@mui/icons-material/Room';

export const ActualPositionWeather = () => {

  const [ weather, setWeather ] = useState(null);
  const [ city, setCity ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(true);
  
  /* TODO: AÑADIR TRY/CATCH */
  /* FETCH CITY */

  const fetchCity = async (lat, long) => {
    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`)
    .then(response => response.json())
    .then(data => setCity(data))
    .catch(err => console.log(err));
  }  

  /* FETCH WEATHER */

  const fetchWeather = async (lat, long) => {
      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum&current_weather=true&timezone=auto`)
      .then(response => response.json())
      .then(data => setWeather(data))
      .catch(err => console.log(err));
  }  
  
  useEffect(() => {

    const geolocationAPI = navigator.geolocation;

    if(!geolocationAPI){
      console.log('Geolocation is not available');
    } else {
      geolocationAPI.getCurrentPosition( async position => {
        setTimeout(() => setIsLoading(false),3000);
        await fetchWeather(position.coords.latitude, position.coords.longitude);
        await fetchCity(position.coords.latitude, position.coords.longitude);
      });
    } 

  }, [])


  return (
    <div className='geolocation-weather-card'>
      <div className='geolocation-weather-text'>
        {/* Weather image */}
        {!isLoading && (<img className='weather-image' src={'./weather-images/' + weatherImages[weather.current_weather.weathercode]}/>)}
          {
            isLoading ? 
            <ThreeBody size={35} color="white" />
            :
            (
              <div className='weather-info-container'>
              <h2 className='actual-temp'>{weather.current_weather.temperature}º</h2>  
              <h3>{weatherCodes[weather.current_weather.weathercode]}</h3>
              {/* Wind Speed:{weather.current_weather.windspeed}km/h
              Rain: {weather.daily.precipitation_sum[0]} mm */}
              <h3>Today ·  {new Date(Date.now()).toLocaleDateString()}</h3>
              <h3><RoomIcon /> {city.city} {city.countryCode}</h3>
              </div>
            )
            
          }

      </div>
    </div>
  )
}
