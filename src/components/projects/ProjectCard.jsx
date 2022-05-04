// React-router
import { Link } from "react-router-dom";

// React-icons
import { BsPencil, BsFillTrashFill } from "react-icons/bs";

// CSS
import styles from "./ProjectCard.module.css";

function ProjectCard({ id, name, budget, category, handleRemove }) {
  const remove = (e) => {
    e.preventDefault();
    handleRemove(id);
  };

  // function log() {
  //   if (id == 2) {
  //     console.log("dois");
  //   }
  //   console.log(id);
  // }

  // log();

  return (
    <div className={styles.project_card}>
      <h4>{name}</h4>
      <p>
        <span>Orçamento: </span> R${budget}
      </p>
      <p className={styles.category_text}>
        <span className={`${styles[category.toLowerCase()]}`}></span> {category}
      </p>
      <div className={styles.project_card_actions}>
        <Link to={`/project/${id}`}>
          <BsPencil /> Editar
        </Link>
        <button onClick={remove}>
          <BsFillTrashFill /> Excluir
        </button>
      </div>
    </div>
  );
}

export default ProjectCard;
