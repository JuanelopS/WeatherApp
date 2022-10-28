import React from 'react';
import { ActualPosition } from '../components/ActualPosition';
import '../styles/HomePage.scss';

const HomePage = props => {
  return (
    <div className='homepage'>
      <header>Header</header>
      <main>Main</main>
      <aside>
        <ActualPosition />
      </aside>
      <footer>Footer</footer>
    </div>
  )
}

HomePage.propTypes = {

}

export default HomePage