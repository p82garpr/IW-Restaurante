import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import principalesData from '../data/principalesData.json';

const Principales = () => {
  return (
    <div className="container">
      <h2 className="mt-5 mb-4">Platos Principales</h2>
      <div className="row">
        {principalesData.map(plato => (
          <div key={plato.id} className="col-md-4 mb-4">
            <Card>
              <CardImg top width="100%" src={plato.image} alt={plato.name} />
              <CardBody>
                <CardTitle>{plato.name}</CardTitle>
                <CardText>
                  {plato.description}<br />
                  <span style={{ color: 'green', fontWeight: 'bold' }}>{plato.price} €</span>
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

export default Principales;
