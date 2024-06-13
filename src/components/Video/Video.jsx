'use client';

import {useContext} from 'react';
import {LangContext} from '@/components/LandingPage/LandingPage';

function Video(props) {
   const dict = useContext(LangContext);
    
   return (
      <div id='demo' className='video-container container'>
         <p className='video-title'>{dict.video.videoTitle}</p>
         <div>
            <video className='video' controls>
               <source src='' type=''/>
            </video>
         </div>
      </div>
   );
}

export default Video;