import '../styles/HighLights.scss';

export const Highlights = () => {
  return (
    <div className='highlights'>
      <h2 className='highlights-title'>Today's Highlights</h2>
      <div className='highlights-container'>
        <div className='highlights-section wind'>
          <h3>Wind status</h3>
        </div>
        <div className='highlights-section humidity'>
          <h3>Humidity</h3>
        </div>
        <div className='highlights-section visibility'>
          <h3>Visibility</h3>
        </div>
        <div className='highlights-section air-pressure'>
          <h3>Air Pressure</h3>
        </div>
      </div>
    </div>
  )
}
