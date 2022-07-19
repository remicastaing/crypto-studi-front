import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { APIService } from "../services/api";
import ListeTaches from "../components/ListeTaches";

function TachesPage() {

    let navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [taches, setTaches] = useState([]);
    const [utilisateurs, setUtilisateurs] = useState([]);
    const [listes, setListes] = useState([]);

    useEffect(() => {
        APIService.getTaches()
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
        APIService.getUtilisateurs()
            .then(
                (result) => {
                    setUtilisateurs(result);
                },
                (error) => {
                    console.log(error)
                }
            );
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
                            <Col>Toutes les tâches</Col>
                        </Row>
                    </Card.Header>
                    <ListeTaches taches={taches} utilisateurs={utilisateurs} listes={listes} attribution={true} onClick={open} />
                </Card>
            </section >
        );
    }

}


export default TachesPage