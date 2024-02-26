import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import styles from "./Navbar.module.scss";

function BrandExample() {
  return (
    <Navbar className={styles.containerNavbar}>
      <Container>
        <Navbar.Brand href="/">
          <img
            srcSet={require("../../../assets/logo/Nudo.png")}
            alt="Not found"
            width="80"
            height="80"
            /* className="d-inline-block align-top" */
            id={styles.image}
          />{" "}
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default BrandExample;
