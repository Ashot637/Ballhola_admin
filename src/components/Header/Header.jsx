
import {useState} from 'react';

import {useTranslation} from 'react-i18next';
import LngSwitcher from '../LngSwitcher/LngSwitcher';
// import Logo from '../../images/Logo.svg'
// import BollHolaLogo from '../../images/BollHola_logo.png';
import BollHolaLogo from '../../images/ballhola_green_x1024-01.png';


import './header.css'

function Header({refs}) {

   const { t } = useTranslation();

   const [isActive, setIsActive] = useState(false);

   const scrollToSection = (sectionRef) => {
      sectionRef?.current?.scrollIntoView({ behavior: 'smooth' });
   };

   return (<>
     <header className='header container'>
         <img className='header__logo' src={BollHolaLogo} alt='logo'/>

         <nav>
            <ul className='header__menu'>
               <li>
                  <a className='header__link' href='#features'
                     onClick={() => scrollToSection(refs.featuresRef)}>{t('nav.features')}</a>
               </li>
               <li>
                 <a className='header__link' href='#demo' onClick={() => scrollToSection(refs.demoRef)}>{t('nav.demo')}</a>
               </li>
               {/* <li>
                  <a className='header__link' href='#reviews'
                     onClick={() => scrollToSection(refs.reviewsRef)}>{t('nav.reviews')}</a>
               </li> */}
               <li>
                  <a className='header__link' href='#download'
                     onClick={() => scrollToSection(refs.downloadRef)}>{t('nav.download')}</a>
               </li>
               <li>
                  <a className='header__link contact_us' href='#contact'
                     onClick={() => scrollToSection(refs.contactRef)}>{t('nav.contact')}</a>
               </li>
            </ul>
         </nav>
         <div id='header__right'>
            {/*<a className='header__btn' href='#contact' onClick={() => scrollToSection(refs.contactRef)}>{dict.nav.contact}</a>*/}
            <LngSwitcher/>
            <button onClick={() => setIsActive(!isActive)} className={`hamburger ${isActive ? 'is-active' : ''}'`} title='menu'>
               <div className='bar'></div>
            </button>
         </div>
      </header>
      <nav>
         <ul className={`mobile-nav ${isActive ? 'is-active' : ''}`}>
            <li>
               <a href='#features' onClick={() => scrollToSection(refs.featuresRef)}>{t('nav.features')}</a>
            </li>
            <li>
              <a href='#demo' onClick={() => scrollToSection(refs.demoRef)}>{t('nav.demo')}</a>
            </li>
            {/* <li>
               <a href='#reviews' onClick={() => scrollToSection(refs.reviewsRef)}>{t('nav.reviews')}</a>
            </li> */}
            <li>
               <a href='#download' onClick={() => scrollToSection(refs.downloadRef)}>{t('nav.download')}</a>
            </li>
            <li>
               <a href='#contact' onClick={() => scrollToSection(refs.contactRef)}>{t('nav.contact')}</a>
            </li>
         </ul>
      </nav>

   </>);
}

export default Header;