
import React, {useState} from 'react';
import i18n from 'i18next';

import Globe from '../../images/globe.svg'
import Arrow from '../../images/arrow.svg'

import './lngSwitcher.css'

function LngSwitcher() {
   const [isActive, setIsActive] = useState(false);

   const changeLanguageHandler = (lang) => {
      i18n.changeLanguage(lang);
   };

   return (
      <div id='lng-switcher-container'>
         <div id='lng-switcher-icon' onClick={() => setIsActive(!isActive)}>
            <img id='lng-globe' src={Globe} alt='globe' className={`${isActive ? 'is-active' : ''}`}/>
            <img id='lng-arrow' src={Arrow} alt='arrow' className={`${isActive ? 'is-active' : ''}`}/>
         </div>
          {isActive &&
              <div id='lng-dropdown' className={`${isActive ? 'is-active' : ''}`}>
                  <p className='lng-options' onClick={() => changeLanguageHandler('en')}>Eng</p>
                  <p className='lng-options' onClick={() => changeLanguageHandler('am')}>Arm</p>
                  <p className='lng-options' onClick={() => changeLanguageHandler('ru')}>Rus</p>
              </div>
          }
      </div>
   );
}

export default LngSwitcher;