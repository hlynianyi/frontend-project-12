import { useTranslation } from 'react-i18next';
import { Button, Col, Container, Navbar, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/index.jsx';
import { useState } from 'react';

const NavigationBar = () => {
  const { t, i18n } = useTranslation();
  const auth = useAuth();

  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  
  const changeLanguage = () => {
    const newLanguage = currentLanguage === 'ru' ? 'en' : 'ru';
    i18n.changeLanguage(newLanguage);
    setCurrentLanguage(newLanguage);
  }

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <Row>
          <Col>
            <Navbar.Brand as={Link} to="/">
              {t('navbar.title')}
            </Navbar.Brand>
          </Col>
        </Row>
        {auth.user && (
          <Row>
            <Col>
              <Button className="me-2" variant="light" onClick={changeLanguage}>
                {t('navbar.language')}
              </Button>
              <Button variant="danger" as={Link} to="/login" onClick={auth.logOut}>
                {t('navbar.button')}
              </Button>
            </Col>
          </Row>
        )}
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
