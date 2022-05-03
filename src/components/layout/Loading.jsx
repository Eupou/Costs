// CSS
import styles from "./Loading.module.css";

// Img
import loading from "../../img/loading.svg";

function Loading() {
  return (
    <div className={styles.loader_container}>
      <img className={styles.loader} src={loading} alt="Carregando" />
    </div>
  );
}

export default Loading;
