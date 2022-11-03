const fetchWeather = async (lat, long) => {
  
  const weather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum&current_weather=true&timezone=auto`);
  
  return weather.json();
}

export default fetchWeather;