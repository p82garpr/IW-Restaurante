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
  NavbarText,
} from 'reactstrap';

// Estilos inspirados en Material Design
const Navbar = styled(RSNavbar)`
  background-color: #ffffff; /* Fondo del navbar */
  font-family: 'Roboto', sans-serif; /* Fuente del texto */
  padding: 10px 0; /* Espaciado interior */
`;

const NavbarBrand = styled(RSNavbarBrand)`
  color: #1a237e; /* Color del texto del NavbarBrand */
  font-size: 1.5rem; /* Tamaño del texto del NavbarBrand */
  font-weight: bold; /* Peso de la fuente del NavbarBrand */
`;

const NavLink = styled(RSNavLink)`
  color: #1a237e; /* Color del texto de los NavLink */
  font-size: 1.2rem; /* Tamaño del texto de los NavLink */
  font-weight: 500; /* Peso de la fuente de los NavLink */
  margin-right: 20px; /* Espaciado entre los NavLink */
  transition: color 0.3s ease; /* Transición del color */
  
  &:hover {
    color: #3f51b5; /* Color del texto al pasar el cursor */
  }
`;

const TogglerIcon = styled.span`
  background-color: #1a237e; /* Color del icono del NavbarToggler */
`;

// Componente funcional principal
function Example(props) {
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
              <NavLink href="/MenuCategorias">Categorias</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">
                GitHub
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/components/Perfil">Perfil</NavLink>
            </NavItem>
            {/* Comentario para desactivar el DropdownMenu */}
            {/* <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> */}
          </Nav>
          {/*<NavbarText>Simple Text</NavbarText>*/}
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Example;
