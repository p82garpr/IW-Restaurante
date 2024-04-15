import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import menuData from '../data/menuData.json';

const CategoriesContainer = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const CategoryCard = styled.div`
  text-decoration: none;
  color: inherit;
  margin: 10px;
  width: 200px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const Card = styled.div`
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CategoryTitle = styled.h2`
  text-align: center;
`;

const Menu = () => {
  return (
    <CategoriesContainer>
      <Title>Menú</Title>
      <CardContainer>
        {menuData.categories.map(category => (
          <Link key={category.id} to={`${category.name}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <CategoryCard>
              <Card>
                <CategoryTitle>{category.name}</CategoryTitle>
              </Card>
            </CategoryCard>
          </Link>
        ))}
      </CardContainer>
    </CategoriesContainer>
  );
}

export default Menu;
