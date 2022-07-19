import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { APIService } from "../services/api";


function FormListe() {

    const [nom, setNom] = useState(null);
    const [message, setMessage] = useState(null);

    async function create(e) {
        e.preventDefault();

        try {
            const data = await APIService.createListe(nom)
            if (data.status === 200) {
                setMessage("L'utilisateur a été créé.");
            } else {
                setMessage("Une erreur est survenu");
            }

        } catch (err) {
            console.log(err);
        }
    };


    return (
        <Card>
            <Card.Body>
                <Card.Header  as="h5">Nouvelle liste</Card.Header>
                <Card.Text>
                    <Form>
                        <Form.Group as={Row} className=" mb-3" controlId="formUtilisateurNom">
                            <Form.Label column sm="2" >Nom</Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" className="col-sm-10" placeholder="Saisissez un nom" onChange={(e) => setNom(e.target.value)} />
                            </Col>
                        </Form.Group>

                    </Form>
                </Card.Text>
                <Button variant="primary" type="submit" onClick={(e) => create(e)}>
                    Enregistrer
                </Button>
            </Card.Body>
        </Card>

    )
}


export default FormListe