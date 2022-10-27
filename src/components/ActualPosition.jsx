import React, { useState, useEffect } from 'react';
import { WeatherInfo } from './WeatherInfo';
import '../styles/ActualPosition.css';

export const ActualPosition = () => {

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
        // await fetchWeather(position.coords.latitude, position.coords.longitude);
        // await fetchCity(position.coords.latitude, position.coords.longitude);
      });
    } 

  }, []);

  return (
    <div className='geolocation-weather-card'>
      <WeatherInfo loading={ isLoading } weather={ weather } city = { city }/>
    </div>
  )
}
