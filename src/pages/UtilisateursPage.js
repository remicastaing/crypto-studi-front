import React from 'react';
import Table from 'react-bootstrap/Table'
import FormUtilisateur from "../components/FormUtilisateur";

class UtilisateursPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            utilisateurs: []
        };
    }

    componentDidMount() {
        fetch("http://127.0.0.1:80/utilisateurs/")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        utilisateurs: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, utilisateurs } = this.state;
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
                                <tr key={utilisateur.id}>
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
}


export default UtilisateursPage