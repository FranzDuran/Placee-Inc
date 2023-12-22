import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './FooterMobileAdmin.css';

function FooterMobileAdmin() {
  return (
    <>

      <Navbar className="bg-navbar">
        <Container>
          <Navbar.Brand href="/">
            <img
            srcSet={require('../../../assets/logo/Nudo.png')}
              alt="Not found"
              width="80"
              height="80"
              className="d-inline-block align-top"
            />{' '}
            
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default FooterMobileAdmin;