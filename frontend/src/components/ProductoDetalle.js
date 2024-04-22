import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Button } from 'reactstrap';

const ProductoDetalle = ({ producto }) => {
  return (
    <div className="container">
      <h2 className="mt-5 mb-4">{producto.name}</h2>
      <div className="row">
        <div className="col-md-6">
          <Card>
            <CardImg top width="100%" src={producto.image} alt={producto.name} />
          </Card>
        </div>
        <div className="col-md-6">
          <Card>
            <CardBody>
              <CardTitle>{producto.name}</CardTitle>
              <CardText>
                {producto.description}<br />
                <span style={{ color: 'green', fontWeight: 'bold' }}>{producto.price} €</span>
              </CardText>
              <Button color="primary">Agregar al carrito</Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductoDetalle;
