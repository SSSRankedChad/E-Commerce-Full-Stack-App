import React from 'react';
import SlideShow from '../../components/Swiper/swiper.js';
import './header.css';




const Header = () => {
  return (
    <div className="Header__container">
     <h1> Welcome! </h1>
     <div className="slidesshow__container">
      <SlideShow />
     </div>
   </div>
  )
}

export default Header;
