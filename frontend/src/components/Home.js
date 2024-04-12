import React from 'react';
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';

const Home = () => {
    return (
        <Card>
            <CardBody>
                <CardTitle>Welcome to our restaurant menu!</CardTitle>
                <CardText>Explore our delicious dishes and place your order.</CardText>
                <Button>View Menu</Button>
            </CardBody>
        </Card>
    );
}

export default Home;
