export const fetchActualWeather = async (lat, long) => {
  
  const weather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum&current_weather=true&timezone=auto`);
  
  return weather.json();
}

export const fetchNextWeather = async (lat, long) => {

  /* Calculate days for fetch string api */

  const date = new Date();
  let tomorrow = new Date(date.setUTCDate(date.getUTCDate() + 1)).toISOString().slice(0,10); 
  let lastday = new Date(date.setUTCDate(date.getUTCDate() + 4)).toISOString().slice(0,10);
  
  const weather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto&start_date=${tomorrow}&end_date=${lastday}`);
  
  return weather.json();
}



