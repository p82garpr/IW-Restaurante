import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const CategoriesContainer = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const CategoryCard = styled.div`
  text-decoration: none;
  color: inherit;
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CategoryTitle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  font-weight: bold;
  color: white;
  text-align: center;
`;

const Categoria = ({ cat }) => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/categorias/`);
        setCategorias(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [cat]);

  const mapCategoryName = {
    "entrante": "Entrantes",
    "postre": "Postres",
    "bebida": "Bebidas",
    "principal": "Principales"
  };

  return (
    <CategoriesContainer>
      <Title>Menú</Title>
      <CardContainer>
        {categorias.map(category => (
          <Link key={category._id} to={`/${mapCategoryName[category.nombre]}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <CategoryCard>
              <CardImage src={`/images/${category.imagen}`} alt={mapCategoryName[category.nombre]} />
              <CategoryTitle>{mapCategoryName[category.nombre]}</CategoryTitle>
            </CategoryCard>
          </Link>
        ))}
      </CardContainer>
    </CategoriesContainer>
  );
}

export default Categoria;
