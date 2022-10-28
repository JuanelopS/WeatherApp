import React from 'react'
import PropTypes from 'prop-types';
import { weatherCodes } from '../helpers/weatherCodes';
import { weatherImages } from '../helpers/weatherImages';
import { ThreeBody } from '@uiball/loaders';


export const WeatherInfo = ({ loading, weather, city }) => {
  return (
      <div className='geolocation-weather-text'>
        
        {!loading && (<img className='weather-image' src={'./weather-images/' + weatherImages[weather.current_weather.weathercode]}/>)}
        <h3> 
          {
            loading ? 
            <ThreeBody size={35} color="navy" />
            :
            `${city.city} ${city.countryCode} (${weather.latitude} - ${weather.longitude})`
          }
        </h3>
        <h3>
          {
            !(loading) && `${weatherCodes[weather.current_weather.weathercode]}`
          }
        </h3>
        <h3>
          {
          !(loading) && `Current temperature: ${weather.current_weather.temperature}º`
          }
        </h3>
        <h3>
          {
          !(loading) && `Wind Speed: ${weather.current_weather.windspeed}km/h`
          }
        </h3>
        <h3>
          {
          !(loading) && `Rain: ${weather.daily.precipitation_sum[0]} mm`
          }
        </h3>
      </div>
  )
}

WeatherInfo.propTypes = {
  loading: PropTypes.bool.isRequired,
  weather: PropTypes.object,
  city: PropTypes.object
}

export default WeatherInfo