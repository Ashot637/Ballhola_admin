import React, { useRef } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18next';
// import SwiperSlider from '../../components/Slider/SwiperSlider';

const Contact = React.lazy(() => import('../../components/Contact/Contact'));
const Footer = React.lazy(() => import('../../components/Footer/Footer'));
const Header = React.lazy(() => import('../../components/Header/Header'));
const Banner = React.lazy(() => import('../../components/Banner/Banner'));
const CustomSlider = React.lazy(() => import('../../components/Slider/CustomSlider'));
const Features = React.lazy(() => import('../../components/Features/Features'));
const Hero = React.lazy(() => import('../../components/Hero/Hero'));
const SwiperSlider = React.lazy(() => import('../../components/Slider/SwiperSlider'));


export default function LandingPage() {

   const heroRef = useRef(null);
   const featuresRef = useRef(null);
   const demoRef = useRef(null);
   const reviewsRef = useRef(null);
   const downloadRef = useRef(null);
   const contactRef = useRef(null);

   const refs = {
      heroRef,
      demoRef,
      featuresRef,
      reviewsRef,
      downloadRef,
      contactRef
   };

   return (
    <I18nextProvider i18n={i18n}>
      <main style={{display: 'flex', flexDirection: 'column'}}>
         <Header refs={refs}/>
         <div ref={heroRef}>
            <Hero />
         </div>
         <div ref={featuresRef}>
            <Features />
         </div>

         {/* <div ref={reviewsRef}>
            <CustomSlider />
         </div> */}
         <div ref={demoRef }>
            <SwiperSlider />
         </div>
         <div ref={downloadRef}>
            <Banner />
         </div>
         <div ref={contactRef}>
            <Contact />
         </div>
         <Footer refs={refs}/>
      </main>
      </I18nextProvider>
   );
}
