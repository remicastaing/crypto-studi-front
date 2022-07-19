import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { BsXSquare } from "react-icons/bs";
import { APIService } from "../services/api";


export default function FormTache({ liste, addtache, cancel, utilisateurs }) {

    const [nom, setNom] = useState('');
    const [statut, setStatut] = useState(false);
    const [attribution, setAttribution] = useState('');
    const [message, setMessage] = useState(null);


    async function create(e) {
        e.preventDefault();

        try {
            APIService.createTache(nom, liste, statut, attribution)
                .then(
                    (result) => {
                        addtache(result)
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
        setAttribution('');
        setStatut(false);
    }

    function toggleStatut() {
        setStatut(!statut)
    }

    function cancelInput() {
        clearfields()
        cancel()
    }



    return (
        <Card>
            <Card.Header as="h5">
                <Row>
                    <Col>Nouvelle tâche</Col>
                    <Col xs="1" lg="1"><BsXSquare size={24} onClick={cancelInput} /></Col>
                </Row>
            </Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group as={Row} className=" mb-3" controlId="formUtilisateurNom">
                        <Form.Label column sm="2" >Intitulé de la tâche</Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" className="col-sm-10" placeholder="Saisissez une tache" onChange={(e) => setNom(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className=" mb-3" controlId="formUtilisateurAttribution">
                        <Form.Label column sm="2" >Attribuée à</Form.Label>
                        <Col sm="10">
                            <Form.Select aria-label="Tâche attribuée à" onChange={(e) => setAttribution(e.target.value)}>
                                <option>Sélectionnez une personne</option>
                                {utilisateurs.map(u => (
                                    <option value={u.id} key={u.id}>{u.prenom} {u.nom}</option>
                                ))}
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className=" mb-3" controlId="formUtilisateurNom">
                        <Form.Label column sm="2" >Réalisée</Form.Label>
                        <Col sm="10">
                            <Form.Check type='checkbox' checked={statut} onChange={toggleStatut} />
                        </Col>
                    </Form.Group>

                </Form>
            </Card.Body>
            <Card.Footer>
                <Row>
                    <Col></Col>


                    <Col sm={{ span: 3 }} className="d-grid gap-2">
                        <Button type="submit" onClick={create}>Créer une tache</Button>
                    </Col>
                </Row>
            </Card.Footer>
            {message}
        </Card>
    )
}



