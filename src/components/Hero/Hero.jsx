import {useTranslation} from 'react-i18next';

import './hero.css'
import GooglePlay from '../../images/google-play-logo.svg'
import AppStore from '../../images/app-store-logo.svg'
import Player from '../../images/player.webp'
import Phone from '../../images/phone.webp'

function Hero() {
   const { t } = useTranslation  ();

   return (<>
      <div className='hero'>
         <div className='hero__text-container'>
            <div className='hero__text__1'>
               {t('hero.discover')}
            </div>
            <div className='hero__text__2'>
               {t('hero.our')} <span>{t('hero.app')}</span> {t('hero.connects')} <br/>
               {t('hero.players')} <span> {t('hero.matches')}</span>
            </div>
            <div className='hero__text__3'>
               {t('hero.welcome')}
               <br/>
               {t('hero.ready')}
            </div>
            <div className='hero__logo-container'>
               <a href='https://apps.apple.com/am/app/ballhola/id6477875455' target="_blank" rel="noopener noreferrer">
                  <img className='hero__appstore-logo' src={AppStore} alt='app store'
                     height={57} width={165}/>

               </a>
               <a href='https://play.google.com/store/apps/details?id=com.tesvan.ballhola&pcampaignid=web_share'
                  target="_blank" rel="noopener noreferrer">
                  {/*<img className='hero__googleplay-logo' src='google-play-logo.svg' alt='google play'/>*/}
                  <img className='hero__googleplay-logo' src={GooglePlay} alt='google play' height={57} width={178}/>
               </a>
            </div>
         </div>
         <div className='hero__image-container '>

            <img className='hero__player-image' src={Player} alt='player' height={401}
               width={548}/>
            <img className='hero__phone-image' src={Phone} alt='phone' height={478}
               width={455}/>
         </div>
      </div>
   </>);
}

export default Hero;