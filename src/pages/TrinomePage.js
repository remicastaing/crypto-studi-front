import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table'
import { APIService } from "../services/api";

function TrinomePage() {

    let navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [trinomes, setTrinomes] = useState([]);

    useEffect(() => {
        APIService.getTrinomes()
            .then(
                (result) => {
                    setIsLoaded(true);
                    setTrinomes(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    async function open(id) {
        navigate('/trinomes/' + id);
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <section class="py-5 text-center container">
                <div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Couts kilométriques</th>
                                <th>Couts horaires</th>
                                <th>Couts journaliers</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trinomes.map(trinome => (
                                <tr key={trinome.id} onClick={(e) => open(trinome.id)}>
                                    <td>{trinome.date}</td>
                                    <td>{trinome.couts_kms}</td>
                                    <td>{trinome.couts_horaires}</td>
                                    <td>{trinome.couts_journaliers}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </section >
        );
    }

}


export default TrinomePage