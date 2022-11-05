import { weatherImages } from '../helpers/weatherImages';
import { RaceBy } from '@uiball/loaders'
import '../styles/NextDaysWeather.scss';

export const NextDaysWeather = ({ weather, isLoading }) => {

  if(isLoading) return (
    <div className='loading-next-weather'>
      <RaceBy 
        className='weather-loading'
        size={200}
        lineWeight={15}
        speed={1.4} 
        color="white" 
      />
    </div>
    
  )

  return( 
    
    <div className='next-weather'>
      {
        weather.daily.time.map((day, index) => {
          return (<div className='card-day' key={index}>
            <div className='card-day-date'>{new Date(weather.daily.time[index]).toDateString().slice(0,10)}</div>
            <div className='card-day-image'>
              <img src={ './weather-images/' + weatherImages[weather.daily.weathercode[index]]} />
            </div>
            <div className='card-day-temps'>
              <p className='temp-max'>{ weather.daily.temperature_2m_max[index] }ºC</p>
              <p className='temp-min'>{ weather.daily.temperature_2m_min[index] }ºC</p>
            </div>
          </div>)
        })
      }
      

    </div>
  )
}
