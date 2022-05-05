// Hooks
import { useState, useEffect } from "react";

import { v4 as uuidv4 } from "uuid";

// React-router
import { useLocation } from "react-router-dom";

// layout
import Message from "../layout/Message";
import Container from "../layout/Container";
import LinkButton from "../layout/LinkButton";
import Loading from "../layout/Loading";
import Pagination from "../layout/Pagination";
import SearchBar from "../layout/SearchBar";

// Projects
import ProjectCard from "../projects/ProjectCard";

// CSS
import styles from "./Projects.module.css";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [projectMessage, setProjectMessage] = useState("");
  const [firstEle, setFirstEle] = useState(0);
  const [lastEle, setLastEle] = useState(7);
  const [searchTerm, setSearchTerm] = useState();

  const location = useLocation();
  let message = "";
  if (location.state) {
    message = location.state.message;
  }

  function getFirstEle(e) {
    setFirstEle(e);
  }
  function getLastEle(e) {
    setLastEle(e);
  }

  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:5000/projects", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setProjects(data);
          setRemoveLoading(true);
          console.log(data);
        })
        .catch((err) => console.log(err));
    }, 300);
  }, []);

  function removeProjects(id) {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then(() => {
        setProjects(projects.filter((project) => project.id !== id));
        setProjectMessage("Projeto removido com sucesso!");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className={styles.project_container}>
      <div className={styles.tittle_container}>
        <h1>Meus projetos</h1>
        <SearchBar setSearchTerm={(e) => setSearchTerm(e)} />
        <LinkButton to="/newproject" text="Criar projeto" />
      </div>
      {message && <Message msg={message} type="sucess" />}
      {projectMessage && <Message msg={projectMessage} type="sucess" />}
      <Container customClass="start">
        {searchTerm
          ? projects.length > 0 &&
            projects
              .filter(
                (project) =>
                  project.name.toLowerCase().indexOf(searchTerm.toLowerCase()) >
                  -1
              )
              .map((project) => (
                <ProjectCard
                  id={project.id}
                  name={project.name}
                  budget={project.budget}
                  category={project.category.name}
                  key={uuidv4()}
                  handleRemove={removeProjects}
                />
              ))
          : projects.length > 0 &&
            projects.map(
              (project, index) =>
                index >= firstEle &&
                index <= lastEle && (
                  <ProjectCard
                    id={project.id}
                    name={project.name}
                    budget={project.budget}
                    category={project.category.name}
                    key={uuidv4()}
                    handleRemove={removeProjects}
                  />
                )
            )}

        <Pagination
          nTotalOfEle={projects.length}
          getFirstEle={getFirstEle}
          getLastEle={getLastEle}
        />
        {!removeLoading && <Loading />}
        {removeLoading && projects.length === 0 && (
          <p>Não há projetos cadastrados</p>
        )}
      </Container>
    </div>
  );
}

export default Projects;
