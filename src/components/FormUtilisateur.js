import React from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

class FormUtilisateurs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            prenom: '',
            nom: '',
            email: '',
            message: ''
        };
        this.create = this.create.bind(this);
    }



    create = async (e) => {
        e.preventDefault();
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prenom: this.state.prenom,
                    nom: this.state.nom,
                    email: this.state.email,
                })
            };
            const response = await fetch('http://127.0.0.1:80/utilisateurs/', requestOptions);
            const data = await response.json();
            if (data.status === 200) {
                this.state.message = "L'utilisateur a été créé.";
            } else {
                this.state.message = "Une erreur est survenu";
            }

        } catch (err) {
            console.log(err);
        }
    };

    handleChange(changeObject) {
        this.setState(changeObject)
    }

    render() {
        return <Card>
            <Card.Header as="h5">Créer un nouvel utilisateur</Card.Header>
            <Card.Body>
                <Card.Title>Données utilisateur</Card.Title>
                <Form>
                    <Form.Group className="mb-3" controlId="formUtilisateurPrenom">
                        <Form.Label>Prénom</Form.Label>
                        <Form.Control type="text" placeholder="Saisissez un prénom" onChange={(e) => this.handleChange({ prenom: e.target.value })} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formUtilisateurNom">
                        <Form.Label>Nom</Form.Label>
                        <Form.Control type="text" placeholder="Saisissez un nom" onChange={(e) => this.handleChange({ nom: e.target.value })} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formUtilisateuremail">
                        <Form.Label>Adresse email</Form.Label>
                        <Form.Control type="email" placeholder="Saisissez une adresse mail" onChange={(e) => this.handleChange({ email: e.target.value })} />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={(e) => this.create(e)}>
                        Enregistrer
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    }
}


export default FormUtilisateurs