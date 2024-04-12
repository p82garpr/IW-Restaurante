import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle } from 'reactstrap';
import menuData from '../data/menuData.json';

const Menu = () => {
  return (
    <div>
      <h1>Menú</h1>
      <div className="card-container">
        {menuData.categories.map(category => (
          <Link key={category.id} to={`${category.name}`}>
            <Card>
              <CardBody>
                <CardTitle>{category.name}</CardTitle>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Menu;
