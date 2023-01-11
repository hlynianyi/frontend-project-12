import { Button, Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const NavigationBar = () => {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log("LOGGED OUT");
    navigate('login');
  };
 
  console.log('isLoggedIn', localStorage.getItem('user'));
  const isAuth = localStorage.getItem('token') !== null ? true : false;

  return (
    <Navbar bg="white" expand="lg" className ="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Hexlet Chat
        </Navbar.Brand>
        {
          isAuth &&
          <Button variant="primary" onClick={logOut}>Выйти</Button>
        }
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
 