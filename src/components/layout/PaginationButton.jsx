import styles from "./PaginationButton.module.css";

function PaginationButton({ id, onClick }) {
  return (
    <div className={styles.btn} onClick={() => onClick(id)}>
      {id}
    </div>
  );
}

export default PaginationButton;
