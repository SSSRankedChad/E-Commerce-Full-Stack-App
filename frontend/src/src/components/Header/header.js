import React from 'react';
import { Carousel } from 'react-responsive-3d-carousel';
import 'react-responsive-3d-carousel/dist/styles.css';
import './header.css';
import img1 from '../../public/resources/gold-zipper-on-black-fashion-backpack.jpg';
import img2 from '../../public/resources/black-bag-over-the-shoulder.jpg';
import img3 from '../../public/resources/stacked-bracelets.jpg';
import img4 from '../../public/resources/DIY-beard-balm.jpg';
import img5 from '../../public/resources/blue-t-shirt.jpg';

const images = [
  <img src={img1} />,
  <img src={img2} />,
  <img src={img3} />,
  <img src={img4} />,
  <img src={img5} />,
];




const Header = () => {
  return (
    <>
    <h1> Welcome! </h1>
    <div className="header">
      <Carousel
      items={images}
      startIndex={0}
      autoPlay
      showArrows={false}
      showIndicators={false}
      showStatus={false}
      infiniteLoop={true}
      currentIndex={(currentIndex) => console.log(currentIndex)} />
    </div>
  </>
  )
}

export default Header;
