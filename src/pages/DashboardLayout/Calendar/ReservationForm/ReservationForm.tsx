import styles from "./reservationForm.module.scss";
import Input from "../../../../UI/Input/Input";
import Button from "../../../../UI/Button/Button";

const ReservationForm = () => {
  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <p style={{ fontSize: 24 }}>Make  a reservation</p>
          <Input
            className={styles.inputs}
            label="Player’ s name"
            value=""
            placeholder={"John Smith"}
            onChange={() => {}}
          />
            <Input
              className={styles.inputs}
              label="Player’s phone"
              placeholder={"+374 99123456"}
              value=""
              onChange={() => {}}
            />{" "}
            <Input
              className={styles.inputs}
              label="Player’s email"
              placeholder={"johnsmith@gmail.com"}
              onChange={() => {}}
              value=""

            />
          <Input
            className={styles.inputs}
            label="Player’s uniform"
            placeholder={"h"}
            onChange={() => {}}
            value=""
          />
          <Input
            className={styles.inputs}
            label="Player’s 1st guest"
            placeholder={"h"}
            value=""
            onChange={() => {}}
          />
           <Input
            className={styles.inputs}
            label="Player’s 2nd guest"
            placeholder={"h"}
            value=""
            onChange={() => {}}
          />
          <div className={styles.container}>
            <Button
              className={styles.confirm}
              onClick={() => {}}
              type="button"
              value="Confirm"
            />
            <Button
              className={styles.cancel}
              onClick={() => {}}
              type="button"
              value="Cancel"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ReservationForm;
