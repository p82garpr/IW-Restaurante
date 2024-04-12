import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import postresData from '../data/postresData.json';

const Postres = () => {
  return (
    <div className="container">
      <h2 className="mt-5 mb-4">Postres</h2>
      <div className="row">
        {postresData.map(postre => (
          <div key={postre.id} className="col-md-4 mb-4">
            <Card>
              <CardImg top width="100%" src={postre.image} alt={postre.name} />
              <CardBody>
                <CardTitle>{postre.name}</CardTitle>
                <CardText>
                  {postre.description}<br />
                  <span style={{ color: 'green', fontWeight: 'bold' }}>{postre.price} €</span>
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

export default Postres;
