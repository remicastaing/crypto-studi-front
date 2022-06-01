import React from 'react';
import { useParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table'
import FormUtilisateur from "../components/FormUtilisateur";
import { APIService } from "../services/api";

const UtilisateurDetailPage = (props) => {
    const params = useParams();
    return <WrappedUtilisateurDetailPage  {...{ ...props, match: { params } }} />
}


class WrappedUtilisateurDetailPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            utilisateurs: []
        };
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        APIService.getUtilisateur(id)
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        utilisateur: result
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
        const { error, isLoaded, utilisateur } = this.state;
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
                            <tr key={utilisateur.id}>
                                <td>{utilisateur.prenom}</td>
                                <td>{utilisateur.nom}</td>
                                <td>{utilisateur.email}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            );
        }
    }
}


export default UtilisateurDetailPage