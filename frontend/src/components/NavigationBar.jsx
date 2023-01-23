import { useTranslation } from 'react-i18next';
import { Button, Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/index.jsx';

const NavigationBar = () => {
  const { t } = useTranslation();

  const auth = useAuth();

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">
          {t('navbar.title')}
        </Navbar.Brand>
        {auth.loggedIn && (
          <Button variant="primary" as={Link} to="/login" onClick={auth.logOut}>
            {t('navbar.button')}
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
