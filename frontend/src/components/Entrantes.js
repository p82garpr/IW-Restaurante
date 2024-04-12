import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import entrantesData from '../data/entrantesData.json';

const Entrantes = () => {
  return (
    <div className="container">
      <h2 className="mt-5 mb-4">Entrantes</h2>
      <div className="row">
        {entrantesData.map(entrante => (
          <div key={entrante.id} className="col-md-4 mb-4">
            <Card>
              <CardImg top width="100%" src={entrante.image} alt={entrante.name} />
              <CardBody>
                <CardTitle>{entrante.name}</CardTitle>
                <CardText>
                  {entrante.description}<br />
                  <span style={{ color: 'green', fontWeight: 'bold' }}>{entrante.price} €</span>
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

export default Entrantes;
