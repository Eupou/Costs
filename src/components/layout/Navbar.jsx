// React-router
import { Link } from "react-router-dom";

// layout
import Container from "./Container";

// CSS
import styles from "./Navbar.module.css";

// Img
import logo from "../../img/costs_logo.png";

function Navbar() {
  return (
    <nav>
      <Container>
        <Link to="/">
          <img src={logo} alt="Página inicial" />
        </Link>
        <Link to="/">Home</Link>
        <Link to="/contact">Contato</Link>
        <Link to="/company">Empresa</Link>
        <Link to="/newproject">Novo projeto</Link>
      </Container>
    </nav>
  );
}

export default Navbar;

// estamos no minuto #4:17 da aula 20
// https://www.youtube.com/watch?v=WzLEISV2wa0&list=PLnDvRpP8BneyVA0SZ2okm-QBojomniQVO&index=20
