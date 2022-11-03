import React from 'react';
import { ActualPositionWeather } from '../components/ActualPositionWeather';

import { Button } from '@mui/material';
import GpsFixedRoundedIcon from '@mui/icons-material/GpsFixedRounded';
import '../styles/HomePage.scss';
import { grey } from '@mui/material/colors';

const HomePage = () => {
  return (
    <div className='homepage'>
      <header>Header</header>
      <main>Main</main>
      <aside>
        <div className='actual-weather-buttons'>
          <Button variant='contained' sx={{ backgroundColor: grey[500] }}>Search for places</Button>
          <GpsFixedRoundedIcon sx={{ color: grey[50] }} className='gps-icon'/>
        </div>
        <div className='weather-info'>
          <ActualPositionWeather />
        </div>
      </aside>
    </div>
  )
}

export default HomePage;