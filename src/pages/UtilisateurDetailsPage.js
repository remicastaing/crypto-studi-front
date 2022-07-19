import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { BsXSquare } from "react-icons/bs";
import ListeTaches from "../components/ListeTaches";

import { APIService } from "../services/api";


function UtilisateurDetailPage() {

    let { id } = useParams();
    let navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [prenom, setPrenom] = useState(null);
    const [nom, setNom] = useState(null);
    const [email, setEmail] = useState(null);
    const [taches, setTaches] = useState(null);
    const [listes, setListes] = useState([]);


    useEffect(() => {
        APIService.getUtilisateur(id)
            .then(
                (result) => {
                    setIsLoaded(true);
                    setPrenom(result.prenom);
                    setNom(result.nom);
                    setEmail(result.email);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [id]);

    useEffect(() => {
        APIService.getTachesParUtilisateur(id)
            .then(
                (result) => {
                    setIsLoaded(true);
                    setTaches(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }, [id]);

    useEffect(() => {
        APIService.getListes()
            .then(
                (result) => {
                    setIsLoaded(true);
                    setListes(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )

    }, [])

    function onSubmit(e) {
        e.preventDefault();
        var updatedUtilisateur = {};
        updatedUtilisateur.id = id;
        updatedUtilisateur.nom = nom;
        updatedUtilisateur.prenom = prenom;
        updatedUtilisateur.email = email;
        APIService.updateUtilisateur(updatedUtilisateur)
    }

    async function deleteUtilisateur(e) {
        e.preventDefault();
        await APIService.deleteUtilisateur(id);
        navigate('/utilisateurs/');
    }

    function cancel() {
        navigate('/utilisateurs/');
    }

    async function open(tache) {
        navigate('/tache/' + tache.id);
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <section className="py-5 container">
                <Card>
                    <Card.Header as="h5">
                        <Row>
                            <Col>Utilisateur</Col>
                            <Col xs="1" lg="1"><BsXSquare size={24} onClick={cancel} /></Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={onSubmit}>
                            <Form.Group as={Row} className="mb-3" controlId="prenom">
                                <Form.Label column sm={2}>
                                    Prenom
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="input" value={prenom ?? ""} onChange={(e) => setPrenom(e.target.value)} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="nom">
                                <Form.Label column sm={2}>
                                    Prenom
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="input" value={nom ?? ""} onChange={(e) => setNom(e.target.value)} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="email">
                                <Form.Label column sm={2}>
                                    Prenom
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="input" value={email ?? ""} onChange={(e) => setEmail(e.target.value)} />
                                </Col>
                            </Form.Group>


                            <Row>
                                <Col></Col>
                                <Col sm={{ span: 2 }} className="d-grid gap-2" >
                                    <Button variant="danger" onClick={deleteUtilisateur} >Supprimer</Button>
                                </Col>

                                <Col sm={{ span: 3 }} className="d-grid gap-2">
                                    <Button type="submit">Mettre à jour</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>
                <br></br>
                <Card>
                    <Card.Header as="h5">
                        <Row>
                            <Col>Listes des tâches attribuées à {prenom} {nom}</Col>
                        </Row>
                    </Card.Header>

                    {(taches ? taches.length : false) > 0 ? <ListeTaches taches={taches} listes={listes} attribution={false} onClick={open} /> :
                        <Card.Body>Cet utilisateur n'a aucune tâche à réaliser</Card.Body>}



                </Card>
            </section>
        );
    }

}


export default UtilisateurDetailPage