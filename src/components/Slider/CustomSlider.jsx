
import Slider from 'react-slick';
import CustomSlide from '../../components/Slider/CustomSlide';
import {reviews} from '../../lib/reviews';
import {useTranslation} from 'react-i18next';


import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


import './slider.css'


function CustomSlider(props) {

   const { t } = useTranslation();

   const settings = {
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 3,
      adaptiveHeight: true,
      speed: 500,
      dots: true,
      accessibility: true,
      arrows: false, 
      touchMove: true,
      appendDots: dots => (
         <div
            style={{
               display: 'flex',
               justifyContent: 'center',
               margin: '-20px 0',
               gap: 15,
            }}
         >
            {dots}
         </div>
      ),
      customPaging: i => (
         <div
            style={{
               width: '22px',
               height: '22px',
               borderRadius: '50%',
               backgroundColor: '#16D0B8',
               transition: 'width 0.3s, height 0.3s',
            }}
         ></div>
      ),

      responsive: [
         {
            breakpoint: 1279,
            settings: {
               slidesToShow: 2,
               slidesToScroll: 2,
               appendDots: dots => (
                  <div
                     style={{
                        display: 'flex',
                        justifyContent: 'center',
                        margin: '-10px 0',
                        gap: 5,
                     }}
                  >
                     {dots}
                  </div>
               ),
               customPaging: i => (
                  <div
                     style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        backgroundColor: '#16D0B8',
                        // transition: 'width 0.3s, height 0.3s',
                     }}
                  ></div>
               ),
            }
         },
         {
            breakpoint: 767,
            settings: {
               slidesToShow: 3,
               slidesToScroll: 3,
               centerMode: false,
               centerPadding: 0,
               appendDots: dots => (
                  <div
                     style={{
                        display: 'flex',
                        justifyContent: 'center',
                        margin: '-10px 0',
                     }}
                  >
                     {dots}
                  </div>
               ),
               customPaging: i => (
                  <div
                     style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: '#16D0B8',
                        // transition: 'width 0.3s, height 0.3s',
                     }}
                  ></div>
               ),
            }
         },

         {
            breakpoint: 639,
            settings: {
               className: 'center',
               slidesToShow: 1,
               slidesToScroll: 1,
               centerMode: true,
               centerPadding: '95px',
               appendDots: dots => (
                  <div
                     style={{
                        display: 'flex',
                        justifyContent: 'center',
                        margin: '-10px 0',
                     }}
                  >
                     {dots}
                  </div>
               ),
               customPaging: i => (
                  <div
                     style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: '#16D0B8',
                        // transition: 'width 0.3s, height 0.3s',
                     }}
                  ></div>
               ),
            }
         }
      ]
   };
    
   return (
      <div id='reviews' className='slider-main-container container'>
         <div className='slider__title-container container'>
            <p className='slider__title'>
               {t('reviews.title')}
            </p>
         </div>

         <div className='slider__cards-container slider-container'>
            <div className='slider__decor-1'>,,</div>
            <div className='slider__decor-2'>,,</div>
            <Slider {...settings}>
               {reviews.map((user, index) =>   
               <div key={index}>            
                  <CustomSlide key={index} user={user}/>
                  </div>
               )}
            </Slider>
      </div>
   </div>

   );
}

export default CustomSlider;