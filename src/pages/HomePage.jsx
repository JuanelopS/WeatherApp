import React from 'react';
import PropTypes from 'prop-types';
import '../styles/HomePage.scss';

const HomePage = props => {
  return (
    <div className='homepage'>
      <header>Header</header>
      <main>Main</main>
      <aside>Aside</aside>
      <footer>Footer</footer>
    </div>
  )
}

HomePage.propTypes = {

}

export default HomePage