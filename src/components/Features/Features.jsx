
import {useTranslation} from 'react-i18next';

import './features.css'

import Rectangle from '../../images/Rectangle.svg'
import Vector from '../../images/Vector.svg'
import Invitation from '../../images/invitation.svg'
import Stadium from '../../images/stadium.svg'
import Pencil from '../../images/pencil.svg'
import Chat from '../../images/chat.svg'



function Features(props) {

   const { t } = useTranslation();
   
   return (<>
      <div id='features' className='features container'>
         <p className='features__title'>{t('features.featuresTitle')}</p>
         <div className='features__icon-container'>
            {/*<img className='wave' src='wave.svg' alt='vector' />*/}
            {/*<Image className='wave' src='wave.svg' alt='vector' priority unoptimized height={401}*/}
            {/*       width={548}/>*/}
            <div className='features__icon-text-group'>
               <div className='features__icon'>
                  {/*<img className='features__rectangle' src='Rectangle.svg' alt='circle' />*/}
                  {/*<img className='features__vector chat' src='chat.svg'  alt='chat' />*/}
                  <img className='features__rectangle' src={Rectangle} alt='circle'  height={74}
                     width={74}/>
                  <img className='features__vector chat' src={Chat}  alt='chat'  height={43}
                     width={40}/>
               </div>
               <p className='features__icon-description'>{t('features.chat')}</p>
            </div>

            <div className='features__icon-text-group'>
               <div className='features__icon'>
                  {/*<img className='features__rectangle' src='Rectangle.svg' alt='circle' />*/}
                  {/*<img className='features__vector pencil' style={{zIndex: 30}} src='pencil.svg'  alt='pencil'/>*/}
                  {/*<img className='features__vector paper' src='Vector.svg' alt='paper'/>*/}
                  <img className='features__rectangle' src={Rectangle} alt='circle'  height={74}
                     width={74}/>
                  <img className='features__vector pencil' style={{zIndex: 30}} src={Pencil} alt='pencil'  height={26}
                     width={25}/>
                  <img  className='features__vector paper' src={Vector} alt='paper'  height={31}
                     width={34}/>
               </div>
               <p className='features__icon-description'>{t('features.game')}</p>
            </div>

            <div className='features__icon-text-group'>
               <div className='features__icon'>
                  <img className='features__rectangle' src={Rectangle} alt='circle'  height={74}
                     width={74}/>
                  <img className='features__vector stadium' src={Stadium} alt='stadium'  height={38}
                     width={37}/>
               </div>
               <p className='features__icon-description'>{t('features.stadiums')}</p>
            </div>

            <div className='features__icon-text-group'>
               <div className='features__icon'>
                  {/*<img className='features__rectangle' src='Rectangle.svg' alt='circle' />*/}
                  {/*<img className='features__vector invitation' src='invitation.svg' alt='invitation'/>*/}
                  <img className='features__rectangle' src={Rectangle} alt='circle'  height={74}
                     width={74}/>
                  <img className='features__vector invitation' src={Invitation} alt='invitation'  height={42}
                     width={42}/>
               </div>
               <p className='features__icon-description'>{t('features.invitation')}</p>
            </div>

         </div>
      </div>
   </>);
}

export default Features;