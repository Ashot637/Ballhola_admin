import type { FC } from 'react';
import classes from './button.module.scss';
import clsx from 'clsx';

interface IButtonPropsBase {
  value: string;
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

interface IButtonProps extends IButtonPropsBase {
  onClick: () => void;
  type: 'button';
}

interface IButtonPropsSubmit extends IButtonPropsBase {
  type: 'submit';
}

const Button: FC<IButtonProps | IButtonPropsSubmit> = (props) => {
  return props.type === 'button' ? (
    <button
      type={props.type}
      disabled={props.disabled}
      className={clsx(classes.btn, props.className, classes[props.size || 'md'])}
      onClick={props.onClick}>
      {props.value}
    </button>
  ) : (
    <button
      type={props.type} 
      disabled={props.disabled}
      className={clsx(classes.btn, props.className, classes[props.size || 'md'])}>
      {props.value}
    </button>
  );
};

export default Button;
