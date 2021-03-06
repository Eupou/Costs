// Hooks
import { useState, useEffect } from "react";

// React-router-dom
import { useParams } from "react-router-dom";

// uuid
import { parse, v4 as uuidv4 } from "uuid";

// CSS
import styles from "./Project.module.css";

// Layout
import Loading from "../layout/Loading";
import Container from "../layout/Container";
import Message from "../layout/Message";

// Projects
import ProjectForm from "../projects/ProjectForm";

// Services
import ServiceForm from "../services/ServiceForm";
import ServiceCard from "../services/ServiceCard";
import Pagination from "../layout/Pagination";
import SearchBar from "../layout/SearchBar";

function Project() {
  const { id } = useParams();

  const [project, setProject] = useState([]);
  const [services, setServices] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [message, setMessage] = useState();
  const [type, setType] = useState();
  const [firstEle, setFirstEle] = useState(0);
  const [lastEle, setLastEle] = useState(7);
  const [searchTerm, setSearchTerm] = useState();

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/projects/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setProject(data);
          setServices(data.services);
        })
        .catch((err) => console.log(err));
    }, 300);
  }, [id]);

  function editPost(project) {
    setMessage("");
    if (project.budget < project.cost) {
      setMessage("O orçamento não pode ser menor que o custo do projeto");
      setType("error");
      return false;
    }

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data);
        setShowProjectForm(false);
        setMessage("Projeto atualizado com sucesso");
        setType("sucess");
      })
      .catch((err) => console.log(err));
  }

  function createService(project) {
    console.log(project.services);
    setMessage("");
    //  last service
    const lastService = project.services[project.services.length - 1];
    lastService.id = uuidv4();

    const lastServiceCost = lastService.cost;
    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

    // maximum value validation
    if (newCost > parseFloat(project.budget)) {
      setMessage("Orçamento ultrapassado, verifique o valor do serviço");
      setType("error");
      project.services.pop();
      return false;
    }

    // add service total cost
    project.cost = newCost;

    // update project
    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setShowServiceForm(false);
      })
      .catch((err) => console.log(err));
  }

  function removeService(id, cost) {
    const servicesUpdated = project.services.filter(
      (service) => service.id !== id
    );

    const projectUpdated = project;
    projectUpdated.services = servicesUpdated;
    projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost);

    fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectUpdated),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(projectUpdated);
        setServices(servicesUpdated);
        setMessage("Serviço removido com sucesso");
        setType("sucess");
      })
      .catch((err) => console.log(err));
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
  }

  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          <Container customClass="column">
            {message && <Message type={type} msg={message} />}
            <div className={styles.details_container}>
              <h1>Projeto: {project.name}</h1>
              <SearchBar setSearchTerm={(e) => setSearchTerm(e)} />
              <button className={styles.btn} onClick={toggleProjectForm}>
                {!showProjectForm ? "Editar projeto" : "fechar"}
              </button>
              {!showProjectForm ? (
                <div className={styles.project_info}>
                  <p>
                    <span>Categoria:</span> {project.category.name}
                  </p>
                  <p>
                    <span>Total de orçamento:</span> {project.budget}
                  </p>
                  <p>
                    <span>Total utilizado:</span> {project.cost}
                  </p>
                </div>
              ) : (
                <div className={styles.project_info}>
                  <ProjectForm
                    handleSubmit={editPost}
                    btnText={"Cloncluir edição"}
                    projectData={project}
                  />
                </div>
              )}
            </div>
            <div className={styles.service_form_container}>
              <h2>Adicione um serviço</h2>
              <button className={styles.btn} onClick={toggleServiceForm}>
                {!showServiceForm ? "Adicionar serviço" : "fechar"}
              </button>
              <div className={styles.project_info}>
                {showServiceForm && (
                  <ServiceForm
                    handleSubmit={createService}
                    btnText="Adicionar Serviço"
                    projectData={project}
                  />
                )}
              </div>
            </div>
            <h2>serviços</h2>
            <Container customClass="start">
              {services.length > 0 && searchTerm
                ? services
                    .filter(
                      (service) =>
                        service.name
                          .toLowerCase()
                          .indexOf(searchTerm.toLowerCase()) > -1
                    )
                    .map(
                      (service, index) =>
                        index >= firstEle &&
                        index <= lastEle && (
                          <ServiceCard
                            id={service.id}
                            name={service.name}
                            cost={service.cost}
                            description={service.description}
                            key={service.id}
                            handleRemove={removeService}
                          />
                        )
                    )
                : services.map(
                    (service, index) =>
                      index >= firstEle &&
                      index <= lastEle && (
                        <ServiceCard
                          id={service.id}
                          name={service.name}
                          cost={service.cost}
                          description={service.description}
                          key={service.id}
                          handleRemove={removeService}
                        />
                      )
                  )}
              <Pagination
                nTotalOfEle={services.length}
                getFirstEle={(e) => setFirstEle(e)}
                getLastEle={(e) => setLastEle(e)}
              />
              {services.length === 0 && <p>Não há serviços cadastrados</p>}
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Project;
