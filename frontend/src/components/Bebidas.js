import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import bebidasData from '../data/bebidasData.json';

const Bebidas = () => {
  return (
    <div className="container">
      <h2 className="mt-5 mb-4">Bebidas</h2>
      <div className="row">
        {bebidasData.map(bebida => (
          <div key={bebida.id} className="col-md-4 mb-4">
            <Card>
              <CardImg top width="100%" src={bebida.image} alt={bebida.name} />
              <CardBody>
                <CardTitle>{bebida.name}</CardTitle>
                <CardText>
                  {bebida.description}<br />
                  <span style={{ color: 'green', fontWeight: 'bold' }}>{bebida.price} €</span>
                </CardText>
                <Button color="primary">Agregar al carrito</Button>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bebidas;
