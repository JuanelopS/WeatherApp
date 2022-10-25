import React, { useState, useEffect } from 'react';
import { ThreeBody } from '@uiball/loaders';
import { weatherCodes } from '../helpers/weatherCodes';
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

  }, [])


  return (
    <div className='geolocation-weather-card'>
      <div className='geolocation-weather-text'>
        <h3> 
          {
            isLoading ? 
            <ThreeBody className='loading'/>
            :
            `${city.city} ${city.countryCode} (${weather.latitude} - ${weather.longitude})`
          }
        </h3>
        <h3>
          {
            !(isLoading) && `${weatherCodes[weather.current_weather.weathercode]}`
          }
        </h3>
        <h3>
          {
          !(isLoading) && `Current temperature: ${weather.current_weather.temperature}º`
          }
        </h3>
        <h3>
          {
          !(isLoading) && `Wind Speed: ${weather.current_weather.windspeed}km/h`
          }
        </h3>
        <h3>
          {
          !(isLoading) && `Rain: ${weather.daily.precipitation_sum[0]} mm`
          }
        </h3>
      </div>
    </div>
  )
}
