import React, { useState, useEffect } from 'react';

export const ActualPosition = () => {

  const [ lat, setLat ] = useState(null);
  const [ long, setLong ] = useState(null);
  const [ weather, setWeather ] = useState(null);

  useEffect(() => {
    getCoords();
    dataFetch()
  }, [lat, long]);

  /* Retrieve location through HTML5 api related */

  const geolocationAPI = navigator.geolocation;
  
  const getCoords = () => {
    if(!geolocationAPI){
      console.log('Geolocation is not available');
    } else {
      geolocationAPI.getCurrentPosition( position => {
        const { coords } = position;
        setLat(coords.latitude);
        setLong(coords.longitude);
      });
    }
  }

  /* Fetch openweatherAPI data */

  const dataFetch = async () => {
    
    const data = await (fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=48f95418f83113c7fa27c6337592ab1e&units=metric&lang=sp`));
    const dataJson = await data.json();
    setWeather(dataJson);

  }

  return (
    <div>
      { weather.name }
    </div>
  )
}
