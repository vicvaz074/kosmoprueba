import React, { useContext } from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { DarkModeContext } from './DarkModeContext';
import kosmoBasic from './assets/img/KOSMO_BASICO.svg';
import kosmoOxxo from './assets/img/KOSMO_OXXO.svg';
import kosmoConstructor from './assets/img/KOSMO_CONSTRUCTOR.svg';
import './StoreComponent.css'; // Make sure to create this CSS file

const plans = [
    {
      id: 'basic',
      title: 'KOSMO TIER BÁSICO - $29 dolares/mes',
      description: 'Asistencia 24/7 por Kosmo IA. Un bot con la personalidad por defecto para comunicación y ventas. Un ID único para administrar tus bots.',
      image: kosmoBasic,
    },
    {
      id: 'intermediate',
      title: 'KOSMO TIER INTERMEDIO - $79 dolares/mes',
      description: 'Incluye todo lo del Tier Básico. Personalización de la imagen de tu bot. Varios bots con personalidades únicas. Acceso mejorado a herramientas de análisis.',
      image: kosmoOxxo,
    },
    {
      id: 'premium',
      title: 'KOSMO TIER PREMIUM - $129 dolares/mes',
      description: 'Todos los beneficios de los Tiers anteriores. Acceso prioritario a atención al cliente. Herramientas de imagen y lenguaje adicionales para una mayor personalización.',
      image: kosmoConstructor,
    }
  ];

const StoreComponent = () => {
  const { darkMode } = useContext(DarkModeContext);

  const handlePurchase = (planId) => {
    // Implement purchase logic or redirection to payment
    console.log("Purchasing plan:", planId);
  };

  return (
    <Container className={`store-component ${darkMode ? 'dark-mode' : ''}`}>
      <h2 className="text-center mb-5">Explore Our Plans</h2>
      <Row>
        {plans.map(plan => (
          <Col md={4} key={plan.id} className="mb-4">
            <Card className="h-100">
              <Card.Img variant="top" src={plan.image} />
              <Card.Body>
                <Card.Title>{plan.title}</Card.Title>
                <Card.Text>{plan.description}</Card.Text>
                <Button variant="success" onClick={() => handlePurchase(plan.id)}>Buy Now</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default StoreComponent;
