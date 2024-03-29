import type { FC } from 'react';
import classes from './input.module.scss';
import { MdCalendarMonth } from 'react-icons/md';

interface IInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  type?: 'password' | 'text' | 'number';
  className?: string;
  calendar?: boolean;
  disabled?: boolean;
}

const Input: FC<IInputProps> = ({
  value,
  onChange,
  placeholder,
  label,
  type = 'text',
  className,
  calendar = false,
  disabled = false,
}) => {
  if (!label) {
    <input
      className={classes.input}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    />;
  }
  return (
    <div className={classes.box}>
      <label className={classes.label}>{label}</label>
      {calendar && (
        <div className={classes.calendarIcon}>
          <MdCalendarMonth />
        </div>
      )}
      <input
        className={className ? className + ' ' + classes.input : classes.input}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
