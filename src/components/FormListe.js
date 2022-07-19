import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { APIService } from "../services/api";


function FormListe({ addliste }) {

    const [nom, setNom] = useState('');
    const [message, setMessage] = useState(null);

    async function create(e) {
        e.preventDefault();

        try {
            APIService.createListe(nom)
                .then(
                    (result) => {
                        addliste(result)
                        setNom('')
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


    return (
        <Card>
            <Card.Header>Nouvelle liste</Card.Header>
            <Card.Body>
                <Form onSubmit={create}>
                    <Form.Group as={Row} controlId="formUtilisateurNom">
                        <Form.Label column  >Nom</Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" placeholder="Saisissez un nom" value={nom} onChange={(e) => setNom(e.target.value)} />
                        </Col>
                    </Form.Group>


                </Form>
            </Card.Body>
            <Card.Footer>
                <Row>
                    <Col></Col>
                    <Col sm={{ span: 3 }} className="d-grid gap-2">
                        <Button variant="primary" type="submit" onClick={(e) => create(e)}>
                            Enregistrer
                        </Button>
                    </Col>
                </Row>
            </Card.Footer>
        </Card>
    )
}


export default FormListe