// layout
import LinkButton from "../layout/LinkButton";

// CSS
import styles from "./Home.module.css";

// img
import savings from "../../img/savings.svg";

function Home() {
  return (
    <section className={styles.home_container}>
      <h1>
        Bem-vindo ao <span>Costs</span>
      </h1>
      <p>Comece a gerenciar os seus projetos agora mesmo</p>
      <LinkButton to="/newproject" text="Criar projeto" />
      <img src={savings} alt="" />
    </section>
  );
}

export default Home;
