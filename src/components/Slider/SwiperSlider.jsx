import { useTranslation } from 'react-i18next';
import './swiper.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/mousewheel';

import {Navigation,Pagination, Mousewheel } from 'swiper/modules';

const SwiperSlider = () => {
  const { t } = useTranslation();

  return (
    <div className='slider-container'>
      <div className='slider-title-container'>
        <p className='slider-title'>
          {t('reviews.titleSlider')}
        </p>
      </div>
      <div className='slider-swiper'>
        <Swiper
          modules={[Navigation, Pagination, Mousewheel]}
          spaceBetween={50}
          slidesPerView={1}
          navigation={true}
          pagination={{ clickable: true }}
          mousewheel={true} 
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log('Swiper initialized:', swiper)}
        >
          <SwiperSlide>
            <video controls width="100%">
              <source src="" type="video/mp4" />
            </video>
          </SwiperSlide>
          <SwiperSlide>
            <video controls width="100%">
              <source src="" type="video/mp4" />
            </video>
          </SwiperSlide>
          <SwiperSlide>
            <video controls width="100%">
              <source src="" type="video/mp4" />
            </video>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default SwiperSlider;
