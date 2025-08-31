import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import './swiper.css'

import img1 from '../../public/resources/black-bag-over-the-shoulder.jpg';
import img2 from '../../public/resources/blue-t-shirt.jpg';
import img3 from '../../public/resources/DIY-beard-balm.jpg';
import img4 from '../../public/resources/gold-zipper-on-black-fashion-backpack.jpg';
import img5 from '../../public/resources/stacked-bracelets.jpg';


import 'swiper/css'

const SlideShow = () => {
  return (
  <div className="swiper__container">
   <Swiper
     modules={[Autoplay, EffectFade]}
    spaceBetween={2}
    slidesPerView={1}
    autoplay
    effect="fade"
    centeredSlides="true"
    onSwiper={(swiper) => console.log(swiper)}
    >
     <SwiperSlide><img src={img1}/></SwiperSlide>
     <SwiperSlide><img src={img2}/></SwiperSlide>
     <SwiperSlide><img src={img3}/></SwiperSlide>
     <SwiperSlide><img src={img4}/></SwiperSlide>
     <SwiperSlide><img src={img5}/></SwiperSlide>
    </Swiper>
  </div>
  )


}

export default SlideShow;
