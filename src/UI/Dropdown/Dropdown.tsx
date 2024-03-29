import { useState } from "react";


import classes from "./dropdown.module.scss";
const Dropdown = ({ stadium, onClick, current }: { stadium: any[], onClick: any, current: string}) => {
  const [value, setValue] = useState<string>(stadium? stadium[0]?.title_en : 'Sports complex of Polytechnic University');
  const [open, setOpen] = useState<boolean>(false);


  return (
    <>
      <div className={classes.dropdown}>
        <div onClick={() => setOpen(!open)} className={classes.container}>
          {value}
          <span className={classes.arrow}></span>
        </div>
        {open && (
          <div className={classes.options}>
            <ul>
              {stadium.map((el, i) => (
                <li
                  onClick={() => {
                    setValue(el?.title_en);
                    setOpen(false);
                    onClick(el?.title_en)
                  }}
                  key={i}
                >
                  {el?.title_en}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Dropdown;
