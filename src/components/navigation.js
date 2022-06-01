import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from "react-bootstrap/Nav";
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/logo.svg';
import {
  Link
} from "react-router-dom";

function Navigation() {

  return <Navbar bg="dark" variant="dark" sticky="top">
    <Navbar.Brand href="/">
      <img
        alt=""
        src={logo}
        width="30"
        height="30"
        className="d-inline-block align-top"
      />{' '}
      React Bootstrap
    </Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link as={Link} to="/home">Home</Nav.Link>
      <Nav.Link as={Link} to="/trinome">Trinôme</Nav.Link>
      <Nav.Link as={Link} to="/operation">Opération</Nav.Link>
      <Nav.Link as={Link} to="/ventilation">Ventilation</Nav.Link>
      <Nav.Link as={Link} to="/utilisateurs">Utilisateurs</Nav.Link>
    </Nav>
  </Navbar>;

}

export default Navigation