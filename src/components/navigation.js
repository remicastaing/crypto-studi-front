import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from "react-bootstrap/Nav";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Link
} from "react-router-dom";

import { BsMusicNoteList } from "react-icons/bs";


const style = { color: "aqua", fontSize: "1.5em" }

function Navigation() {

  return (
      <Navbar bg="dark" variant="dark" sticky="top">
        <section className="container">
        <Navbar.Brand href="/">
          {' '}<BsMusicNoteList style={style} />{' '}

          Lalalist
        </Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/listes">Listes</Nav.Link>
          <Nav.Link as={Link} to="/taches">Taches</Nav.Link>
          <Nav.Link as={Link} to="/utilisateurs">Utilisateurs</Nav.Link>
        </Nav>
        </section>
      </Navbar>
  );

}

export default Navigation