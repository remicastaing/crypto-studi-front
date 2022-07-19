import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { BsXSquare } from "react-icons/bs";
import { APIService } from "../services/api";

export default function Tache({ tache, update, del, cancel, utilisateurs }) {

    const [error, setError] = useState(null);
    const [nom, setNom] = useState(tache.nom);
    const [attribution, setAttribution] = useState(tache.attribution);
    const [statut, setStatut] = useState(tache.statut);

    useEffect(() => {
        setNom(tache.nom)
        setAttribution(tache.attribution)
        setStatut(tache.statut)
    }, [tache]);

    async function deleteTache(e) {
        e.preventDefault();
        await APIService.deleteTache(tache.id)
        del(tache)
    }



    function onSubmit(e) {
        e.preventDefault();
        var updatedTache = tache
        updatedTache.nom = nom
        updatedTache.attribution = attribution
        updatedTache.statut = statut
        APIService.updateTache(updatedTache).then(()=>{
            update(updatedTache)
        })
    }


    if (error) {
        return <div>Error: {error.message}</div>;
    } else {
        return (
            <Card>
                <Card.Header as="h5">
                    <Row>
                        <Col>Tache</Col>
                        <Col xs="1" lg="1"><BsXSquare size={24} onClick={cancel} /></Col>
                    </Row>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={onSubmit}>
                        <Form.Group as={Row} className="mb-3" controlId="nom">
                            <Form.Label column sm={2}>
                                Intitulé de la tâche
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="input" value={nom ?? ""} onChange={(e) => setNom(e.target.value)} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="attribution">
                            <Form.Label column sm={2}>
                                Attributaire
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Select aria-label="Tâche attribuée à" value={attribution ?? ""} onChange={(e) => setAttribution(e.target.value)}>
                                    <option>Sélectionnez une personne</option>
                                    {utilisateurs.map(u => (
                                        <option value={u.id} key={u.id}>{u.prenom} {u.nom}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" >
                            <Form.Label column sm={2}>
                                Statut
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Check checked={statut} id="statut" onChange={(e) => setStatut(e.target.checked)} />
                            </Col>
                        </Form.Group>

                        <Row>
                            <Col></Col>
                            <Col sm={{ span: 2 }} className="d-grid gap-2" >
                                <Button variant="danger" onClick={deleteTache} >Supprimer</Button>
                            </Col>

                            <Col sm={{ span: 3 }} className="d-grid gap-2">
                                <Button type="submit">Mettre à jour</Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        )
    }

}

