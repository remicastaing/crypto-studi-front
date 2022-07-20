import React, { useState, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import FormListe from "../components/FormListe";
import { BsJournalPlus } from "react-icons/bs";
import { APIService } from "../services/api";
import { listReducer } from "../services/listReducer";

function ListePage() {

    let navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [listes, dispatch] = useReducer(listReducer, []);
    const [formVisible, setFormVisbility] = useState(true);


    useEffect(() => {
        APIService.getListes()
            .then(
                (result) => {
                    setIsLoaded(true);
                    dispatch({
                        type: 'load',
                        items: result
                    })
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])


    async function open(id) {
        navigate('/liste/' + id);
    }

    function addListe(liste) {
        toggleForm()
        dispatch({
            type: 'add',
            item: liste
        })
    }

    function toggleForm() {
        setFormVisbility(!formVisible)
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
                            <Col>Listes</Col>
                        </Row>
                    </Card.Header>

                    <Table striped hover>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Nom</th>
                                <th>Complétion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listes.map(liste => (
                                <tr key={liste.id} onClick={(e) => open(liste.id)}>
                                    <td>{liste.date}</td>
                                    <td>{liste.nom}</td>
                                    <td><ProgressBar animated now={liste.completion / liste.nb_tache * 100} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Card.Footer>
                        {formVisible ?
                            <Row>
                                <Col></Col>
                                <Col xs="1" lg="1"><BsJournalPlus size={24} onClick={toggleForm} /></Col>
                            </Row> : ''
                        }
                    </Card.Footer>
                </Card>
                <br></br>
                {!formVisible ?
                    <FormListe addliste={addListe} />
                    : ''}

            </section >
        );
    }

}


export default ListePage