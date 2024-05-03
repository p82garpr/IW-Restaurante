import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const AdminMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const MenuTitle = styled.h2`
  margin-bottom: 30px;
`;

const MenuItem = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 20px;
  margin-bottom: 15px;
  background-color: #f5f5f5;
  border-radius: 5px;
  text-decoration: none;
  color: #333;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #e0e0e0;
    transform: scale(1.05);
  }
`;

const MenuItemImage = styled.img`
  width: 200px;
  height: 200px;
  margin-bottom: 10px;
`;

const AdminMenu = () => {
  return (
    <AdminMenuContainer>
      <MenuTitle>Panel de Administración</MenuTitle>
      <MenuItem to="/admin/comandas">
        <MenuItemImage src={`/images/comandas.png`} alt="Comandas" />
        Comandas
      </MenuItem>
      <MenuItem to="/admin/mesas">
        <MenuItemImage src={`/images/mesas.png`} alt="Mesas" />
        Mesas
      </MenuItem>
    </AdminMenuContainer>
  );
};

export default AdminMenu;
