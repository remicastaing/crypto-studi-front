import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table'

import { APIService } from "../services/api";


function UtilisateurDetailPage() {

    let { id } = useParams();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [utilisateur, setUtilisateur] = useState(null);

    useEffect(() => {
        
        APIService.getUtilisateur(id)
            .then(
                (result) => {
                    setIsLoaded(true);
                    setUtilisateur(result);
                },
                // Remarque : il faut gérer les erreurs ici plutôt que dans
                // un bloc catch() afin que nous n’avalions pas les exceptions
                // dues à de véritables bugs dans les composants.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])


    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <section class="py-5 text-center container">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Prénom</th>
                            <th>Nom</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={utilisateur.id}>
                            <td>{utilisateur.prenom}</td>
                            <td>{utilisateur.nom}</td>
                            <td>{utilisateur.email}</td>
                        </tr>
                    </tbody>
                </Table>
            </section>
        );
    }

}


export default UtilisateurDetailPage