import { ThreeBody } from '@uiball/loaders';
import { weatherCodes } from '../helpers/weatherCodes';
import { weatherImages } from '../helpers/weatherImages';
import RoomIcon from '@mui/icons-material/Room';


export const ActualPositionWeather = ({ city, weather, isLoading }) => {

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
