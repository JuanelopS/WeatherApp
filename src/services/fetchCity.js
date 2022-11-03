const fetchCity = async (lat, long) => {

  const city =  await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`);
  
  return city.json();
}  

export default fetchCity;
