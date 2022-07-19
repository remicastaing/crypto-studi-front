import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { APIService } from "../services/api";
import {BsTrash, BsPencil} from "react-icons/bs";

function ListeName({ liste }) {

    let navigate = useNavigate();
    const [nom, setNom] = useState(null);
    const [edit, setEdit] = useState(false);

    async function clickTrash() {
        await APIService.deleteListe(liste.id).then(() => {
            navigate('/listes');
        })

    }

    function toggleEdit() {
        setNom(liste.nom)
        setEdit(!edit)
    }

    function onSubmit(e) {
        e.preventDefault();
        liste.nom = nom
        APIService.updateListe(liste)
        toggleEdit()
    }


    return (

        <Row>
            {edit ? <Col>
                <Form onSubmit={onSubmit}>

                    <Form.Group as={Row} className=" mb-3" controlId="formListeNom">
                        <Col sm="5">
                            <Form.Control type="text" size="lg" defaultValue={liste.nom} onChange={(e) => setNom(e.target.value)} /> 
                            
                        </Col>
                    </Form.Group>
                </Form>

            </Col> : <Col onClick={toggleEdit}><h1 > {liste? liste.nom : <Spinner animation="grow" />} <BsPencil size={24} /></h1></Col>}

            <Col xs="1" lg="1"><h1><BsTrash size={24} onClick={clickTrash} /></h1></Col>

        </Row >
    )
}


export default ListeName