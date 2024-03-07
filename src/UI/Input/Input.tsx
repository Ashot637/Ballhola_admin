import type { FC } from 'react';
import classes from './input.module.scss';

interface IInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  type?: 'password' | 'text' | 'number';
}

const Input: FC<IInputProps> = ({ value, onChange, placeholder, label, type = 'text' }) => {
  if (!label) {
    <input
      className={classes.input}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />;
  }
  return (
    <div className={classes.box}>
      <label className={classes.label}>{label}</label>
      <input
        className={classes.input}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default Input;
