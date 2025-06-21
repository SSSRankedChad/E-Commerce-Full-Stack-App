import React from 'react';
import "./header.css";
import img1 from '../../../public/resources/gold-zipper-on-black-fashion-backpack.jpg';
import img2 from '../../../public/resources/black-bag-over-the-shoulder.jpg';
import img3 from '../../../public/resources/stacked-bracelets.jpg';
import img4 from '../../../public/resources/DIY-beard-balm.jpg';
import img5 from '../../../public/resources/blue-t-shirt.jpg';


export const Header = () => {
  return (
    <div className="header">
      <span> Welcome! <span>
      <img src={img1} />
      <img src={img2} />
      <img src={img3} />
      <img src={img4} />
      <img src={img5} />
    <div/>
  );
}
