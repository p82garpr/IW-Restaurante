import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Collapse,
  Navbar as RSNavbar,
  NavbarToggler,
  NavbarBrand as RSNavbarBrand,
  Nav,
  NavItem,
  NavLink as RSNavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

const Navbar = styled(RSNavbar)`
  background-color: #ffffff;
  font-family: 'Roboto', sans-serif;
  padding: 10px 0;
`;

const NavbarBrand = styled(RSNavbarBrand)`
  color: #1a237e;
  font-size: 1.5rem;
  font-weight: bold;
`;

const NavLink = styled(RSNavLink)`
  color: #1a237e;
  font-size: 1.2rem;
  font-weight: 500;
  margin-right: 20px;
  transition: color 0.3s ease;
  
  &:hover {
    color: #3f51b5;
  }
`;

const TogglerIcon = styled.span`
  background-color: #1a237e;
`;

const StyledUncontrolledDropdown = styled(UncontrolledDropdown)`
  & .dropdown-toggle {
    color: #1a237e;
    font-size: 1.2rem;
    font-weight: 500;
    margin-right: 20px;
    transition: color 0.3s ease;

    &:hover {
      color: #3f51b5;
    }
  }

  & .dropdown-menu {
    background-color: #ffffff;
    border: none;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 0;
    margin-top: 10px;
  }

  & .dropdown-item {
    color: #1a237e;
    font-size: 1.2rem;
    font-weight: 500;
    padding: 10px 20px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #f5f5f5;
    }
  }
`;

function NavbarComponent(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar {...props}>
        <NavbarBrand href="/">QR-MENU</NavbarBrand>
        <NavbarToggler onClick={toggle}>
          <TogglerIcon />
        </NavbarToggler>
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <StyledUncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Categorias
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem href="/Entrantes">Entrantes</DropdownItem>
                  <DropdownItem href="/Principales">Principales</DropdownItem>
                  <DropdownItem href="/Bebidas">Bebidas</DropdownItem>
                  <DropdownItem href="/Postres">Postres</DropdownItem>
                </DropdownMenu>
              </StyledUncontrolledDropdown>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/Registro">Registro</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/IniciarSesion">Iniciar Sesión</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/CerrarSesion">Cerrar Sesión</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/Perfil">Perfil</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/Cesta">Cesta</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavbarComponent;
