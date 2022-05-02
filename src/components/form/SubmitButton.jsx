// CSS
import styles from "./SubmitButton.module.css";

function SumbmitButton({ text }) {
  return (
    <div>
      <button className={styles.btn}>{text}</button>
    </div>
  );
}

export default SumbmitButton;
