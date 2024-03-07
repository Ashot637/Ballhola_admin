import { memo, type FC } from 'react';

import classes from './uniforms.module.scss';

import redUniform from '../../../../../../images/uniform-red.png';
import blueUniform from '../../../../../../images/uniform-blue.png';
import yellowUniform from '../../../../../../images/uniform-yellow.png';
import whiteUniform from '../../../../../../images/uniform-white.png';

const images = [redUniform, blueUniform, yellowUniform, whiteUniform];

interface IUniformsProps {
  uniforms: number[];
  playersCount: number;
}

const Uniforms: FC<IUniformsProps> = memo(({ uniforms, playersCount }) => {
  return (
    <div>
      <h5>Uniforms</h5>
      {uniforms.map((uniformChoseUsersCount, index) => {
        return (
          <div key={index} className="pl-10 pr-10 mb-10 flex align-center c-gap-10">
            <img src={images[index]} alt={'Uniform-' + index} width={50} height={50} />
            <div className={classes.bar}>
              <div
                className={classes.progress}
                style={{
                  width: `${
                    uniformChoseUsersCount && (uniformChoseUsersCount / playersCount) * 100
                  }%`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
});

export default Uniforms;
