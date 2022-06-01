import React, { useState } from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { APIService } from "../services/api";
function FormUtilisateurs() {

    const [prenom, setPrenom] = useState(null);
    const [nom, setNom] = useState(null);
    const [email, setEmail] = useState(null);
    const [message, setMessage] = useState(null);



    async function create(e) {
        e.preventDefault();

        try {
            const data = await APIService.createUtilisateur(prenom, nom, email)
            if (data.status === 200) {
                setMessage("L'utilisateur a été créé.");
            } else {
                setMessage("Une erreur est survenu");
            }

        } catch (err) {
            console.log(err);
        }
    };


    return <Card>
        <Card.Header as="h5">Créer un nouvel utilisateur</Card.Header>
        <Card.Body>
            <Card.Title>Données utilisateur</Card.Title>
            <Form>
                <Form.Group className="mb-3" controlId="formUtilisateurPrenom">
                    <Form.Label>Prénom</Form.Label>
                    <Form.Control type="text" placeholder="Saisissez un prénom" onChange={(e) => setPrenom(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formUtilisateurNom">
                    <Form.Label>Nom</Form.Label>
                    <Form.Control type="text" placeholder="Saisissez un nom" onChange={(e) => setNom(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formUtilisateuremail">
                    <Form.Label>Adresse email</Form.Label>
                    <Form.Control type="email" placeholder="Saisissez une adresse mail" onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={(e) => create(e)}>
                    Enregistrer
                </Button>
            </Form>
        </Card.Body>
    </Card>

}


export default FormUtilisateurs