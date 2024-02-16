import React, { useState, useContext } from 'react';
import { Button, Card, Container, Row, Col, Modal, ListGroup, ListGroupItem } from 'react-bootstrap';
import { DarkModeContext } from './DarkModeContext';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import kosmoBasic from './assets/img/KOSMO_BASICO.svg';
import kosmoOxxo from './assets/img/KOSMO_OXXO.svg';
import kosmoConstructor from './assets/img/KOSMO_CONSTRUCTOR.svg';
import './StoreComponent.css';

const plans = [
  {
    id: 'basic',
    title: 'KOSMO TIER BÁSICO - Suscripción Mensual',
    description: '$29 dolares/mes - Asistencia 24/7 por Kosmo IA. Un bot con la personalidad por defecto para comunicación y ventas. Un ID único para administrar tus bots.',
    image: kosmoBasic,
    price: '29', // Agregar precio aquí
  },
  {
    id: 'intermediate',
    title: 'KOSMO TIER INTERMEDIO - Suscripción Mensual',
    description: '$79 dolares/mes - Incluye todo lo del Tier Básico. Personalización de la imagen de tu bot. Varios bots con personalidades únicas. Acceso mejorado a herramientas de análisis.',
    image: kosmoOxxo,
    price: '79', // Agregar precio aquí
  },
  {
    id: 'premium',
    title: 'KOSMO TIER PREMIUM',
    description: '$129 dolares/mes - Todos los beneficios de los Tiers anteriores. Acceso prioritario a atención al cliente. Herramientas de imagen y lenguaje adicionales para una mayor personalización.',
    image: kosmoConstructor,
    price: '129', // Agregar precio aquí
  }
];

const StoreComponent = () => {
  const [cart, setCart] = useState({});
  const [show, setShow] = useState(false);
  const { darkMode } = useContext(DarkModeContext);

  const handlePurchase = (plan) => {
    setCart(currentCart => {
      const existingItem = currentCart[plan.id];
      return {
        ...currentCart,
        [plan.id]: {
          ...plan,
          quantity: existingItem ? existingItem.quantity + 1 : 1,
        },
      };
    });
    setShow(true);
  };

  const handleRemove = (idToRemove) => {
    setCart(currentCart => {
      if (currentCart[idToRemove].quantity > 1) {
        return {
          ...currentCart,
          [idToRemove]: {
            ...currentCart[idToRemove],
            quantity: currentCart[idToRemove].quantity - 1,
          },
        };
      } else {
        const newCart = { ...currentCart };
        delete newCart[idToRemove];
        return newCart;
      }
    });
  };

  const calculateTotal = () => {
    return Object.values(cart).reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);
  };

  const handleClose = () => setShow(false);

  return (
    <PayPalScriptProvider options={{ "client-id": "Ac0qDlDi02O3I2ITV_94dnm3BFFMU3n872UKBZGHD4uPU5uqsDof_rPc9SZu5M2di2i_lkZZHuR3VxY4", "currency": "USD", "intent": "capture" }}>
      <Container className={`store-component ${darkMode ? 'dark-mode' : ''}`}>
        <h2 className="text-center mb-5">Explora Nuestros Planes</h2>
        <Row>
          {plans.map(plan => (
            <Col md={4} key={plan.id} className="mb-4">
              <Card className="h-100">
                <Card.Img variant="top" src={plan.image} />
                <Card.Body>
                  <Card.Title>{plan.title}</Card.Title>
                  <Card.Text>{plan.description}</Card.Text>
                  <Button variant="success" onClick={() => handlePurchase(plan)}>Comprar Ahora</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Carrito de Compras</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListGroup>
              {Object.values(cart).map((item, index) => (
                <ListGroupItem key={index} className="d-flex justify-content-between align-items-center">
                  {item.title} - ${item.price} x {item.quantity}
                  <Button variant="danger" size="sm" onClick={() => handleRemove(item.id)}>Eliminar</Button>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Modal.Body>
          <Modal.Footer>
            <div className="me-auto">
              <strong>Total: ${calculateTotal().toFixed(2)}</strong>
            </div>
            <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
            <PayPalButtons 
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [{
                    amount: {
                      value: calculateTotal().toString(),
                    },
                  }],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                  console.log(details);
                  handleClose();
                  setCart({});
                });
              }}
            />
          </Modal.Footer>
        </Modal>
      </Container>
    </PayPalScriptProvider>
  );
}

export default StoreComponent;
