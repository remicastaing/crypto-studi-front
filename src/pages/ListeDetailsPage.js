import React, { useState, useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { APIService } from "../services/api";
import FormTache from "../components/FormTache";
import ListeName from "../components/ListeName";
import Tache from "../components/Tache";
import { BsJournalPlus } from "react-icons/bs";
import { Card, Col, Row } from 'react-bootstrap';
import ListeTaches from "../components/ListeTaches";
import { listReducer } from "../services/listReducer";

export default function ListeDetailsPage() {

    let { id } = useParams();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [liste, setListe] = useState(null);
    const [taches, dispatch] = useReducer(listReducer, []);
    const [tache, setTache] = useState(null);
    const [selectedForm, setForm] = useState(false);
    const [utilisateurs, setUtilisateurs] = useState([]);

    useEffect(() => {
        APIService.getListe(id)
            .then(
                (result) => {
                    setIsLoaded(true);
                    setListe(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );

        APIService.getTachesInListe(id)
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
            );

        APIService.getUtilisateurs()
            .then(
                (result) => {
                    setUtilisateurs(result);
                },
                (error) => {
                    console.log(error)
                }
            )
    }, [id])

    function openNewTache() {
        setForm('new')
    }

    function openTache(tache) {
        setTache(tache);
        setForm('update')
    }

    function closeForm() {
        setForm(null)
        setTache(null)
    }

    function deleleteTache(tache) {
        closeForm()
        dispatch({
            type: 'delete',
            item: tache
        })
    }
    function updateTache(tache) {
        closeForm()
        dispatch({
            type: 'update',
            item: tache
        })
    }


    function addTache(tache) {
        dispatch({
            type: 'add',
            item: tache
        })
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
                        <ListeName liste={liste} ></ListeName>
                    </Card.Header>

                    {taches.length > 0 ?
                        <ListeTaches taches={taches} utilisateurs={utilisateurs} attribution={true} onClick={openTache} />
                        : <Card.Body>Cette liste n'a pas encore de tâche.</Card.Body>}

                    <Card.Footer>
                        {!selectedForm ?
                            <Row>
                                <Col></Col>
                                <Col xs="1" lg="1"><BsJournalPlus size={24} onClick={openNewTache} /></Col>
                            </Row> : ''
                        }
                    </Card.Footer>
                </Card>
                <br></br>
                {selectedForm === 'new' ?
                    <FormTache addtache={addTache} liste={liste} cancel={closeForm} utilisateurs={utilisateurs} /> : ''
                }
                {selectedForm === 'update' ? <Tache tache={tache} cancel={closeForm} del={deleleteTache} update={updateTache} utilisateurs={utilisateurs} /> : ''}


            </section >
        );
    }

}

