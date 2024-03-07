import classes from './spinner.module.scss';

const Spinner = () => {
  return (
    <div className="w-max h-100 flex align-center jst-center">
      <span className={classes.loader}></span>
    </div>
  );
};

export default Spinner;
