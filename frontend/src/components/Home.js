import React from 'react';
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <Card>
            <CardBody>
                <CardTitle>Welcome to our restaurant menu!</CardTitle>
                <CardText>Explore our delicious dishes and place your order.</CardText>
                
                
                <Link to="/components/MenuCategorias" ><Button>View Menu</Button></Link>
            </CardBody>
        </Card>
    );
}

export default Home;
