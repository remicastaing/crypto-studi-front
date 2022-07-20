import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table'
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { BsPersonPlus } from "react-icons/bs";
import FormUtilisateur from "../components/FormUtilisateur";
import { APIService } from "../services/api";


function UtilisateursPage() {

    let navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [utilisateurs, setUtilisateurs] = useState([]);
    const [formVisible, setFormVisbility] = useState(true);

    useEffect(() => {
        APIService.getUtilisateurs()
            .then(
                (result) => {
                    setIsLoaded(true);
                    setUtilisateurs(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    async function open(id) {
        navigate('/utilisateurs/' + id);
    }

    function toggleForm() {
        setFormVisbility(!formVisible)
    }

    function addUtilisateur(utilisateur) {
        toggleForm()
        setUtilisateurs(utilisateurs => [...utilisateurs, utilisateur])
    }

    if (error) {
        return (
            <section className="py-5 container">
                <center>
                    <Alert variant='danger'>
                        Error: {error.message}
                    </Alert>
                </center>
            </section>)

            ;
    } else if (!isLoaded) {
        return (
            <section className="py-5 container">
                <center>
                    <Spinner animation="border" variant="info" />
                </center>
            </section>);
    } else {
        return (
            <section className="py-5 container">
                <Card>
                    <Card.Header as="h5">
                        <Row>
                            <Col>Utilisateurs</Col>
                        </Row>
                    </Card.Header>

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Prénom</th>
                                <th>Nom</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {utilisateurs.map(utilisateur => (
                                <tr key={utilisateur.id} onClick={(e) => open(utilisateur.id)}>
                                    <td>{utilisateur.prenom}</td>
                                    <td>{utilisateur.nom}</td>
                                    <td>{utilisateur.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Card.Footer>
                        {formVisible ?
                            <Row>
                                <Col></Col>
                                <Col xs="1" lg="1"><BsPersonPlus size={24} onClick={toggleForm} /></Col>
                            </Row> : <div></div>
                        }
                    </Card.Footer>
                </Card>
                <br></br>


                {!formVisible ?
                    <FormUtilisateur addUtilisateur={addUtilisateur} cancel={toggleForm} />
                    : ''}

            </section >
        );
    }
}


export default UtilisateursPage