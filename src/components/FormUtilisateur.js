import React, { useState } from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import { BsXSquare } from "react-icons/bs";
import { APIService } from "../services/api";


function FormUtilisateurs({ addUtilisateur, cancel }) {

    const [prenom, setPrenom] = useState(null);
    const [nom, setNom] = useState(null);
    const [email, setEmail] = useState(null);
    const [message, setMessage] = useState(null);
    const [validated] = useState(false);


    async function create(e) {
        e.preventDefault();

        try {
            APIService.createUtilisateur(prenom, nom, email)
                .then(
                    (result) => {
                        addUtilisateur(result)
                        cancelInput()
                        setMessage("La liste a été créée.");
                    },
                    (error) => {
                        setMessage("Une erreur est survenu");
                    }
                )

        } catch (err) {
            console.log(err);
        }
    };

    function clearfields() {
        setNom('');
        setPrenom('');
        setEmail(false);
    }


    function cancelInput() {
        clearfields()
        cancel()
    }
    return (
        <Card>
            <Card.Header as="h5">
                <Row>
                    <Col>Nouvel utilisateur</Col>
                    <Col xs="1" lg="1"><BsXSquare size={24} onClick={cancelInput} /></Col>
                </Row>
            </Card.Header>
            <Card.Body>
                <Form noValidate validated={validated}>
                    <Form.Group as={Row} className=" mb-3" controlId="formUtilisateurNom">
                        <Form.Label column sm="2" >Prénom</Form.Label>
                        <Col sm="10">
                            <Form.Control required type="text" className="col-sm-10" placeholder="Saisissez le prénom" onChange={(e) => setPrenom(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className=" mb-3" controlId="formUtilisateurNom">
                        <Form.Label column sm="2" >Nom</Form.Label>
                        <Col sm="10">
                            <Form.Control required type="text" className="col-sm-10" placeholder="Saisissez le nom" onChange={(e) => setNom(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className=" mb-3" controlId="formUtilisateurEmail">
                        <Form.Label column sm="2" >Email</Form.Label>
                        <Col sm="10">
                            <Form.Control required type="text" className="col-sm-10" placeholder="Saisissez une adresse mail" onChange={(e) => setEmail(e.target.value)} />
                        </Col>
                    </Form.Group>

                </Form>
            </Card.Body>
            <Card.Footer>
                <Row>
                    <Col></Col>


                    <Col sm={{ span: 3 }} className="d-grid gap-2">
                        <Button type="submit" onClick={create}>Créer un utilisateur</Button>
                    </Col>
                </Row>
            </Card.Footer>
            {message}
        </Card>
    )

}


export default FormUtilisateurs