import React, {useState, useEffect}  from 'react';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table'
import FormUtilisateur from "../components/FormUtilisateur";
import { APIService } from "../services/api";


function UtilisateursPage() {

    let navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [utilisateurs, setUtilisateurs] = useState([]);

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

    async function open(id)  {
        navigate('/utilisateurs/' + id);
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>
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
                <FormUtilisateur />
            </div>
        );
    }
}


export default UtilisateursPage