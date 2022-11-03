const actualPosition = () => {
  
  const geolocationAPI = navigator.geolocation;
  
  if(!geolocationAPI){
    console.log('Geolocation is not available');
  } else {
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(res, rej);
    })
  }
}
export default actualPosition;