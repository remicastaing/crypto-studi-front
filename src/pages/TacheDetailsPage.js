import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Tache from "../components/Tache";
import { APIService } from "../services/api";

export default function ListeDetailsPage() {

    let { id } = useParams();
    let navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [tache, setTache] = useState([]);
    const [utilisateurs, setUtilisateurs] = useState([]);

    useEffect(() => {

        APIService.getTache(id)
            .then(
                (result) => {
                    setIsLoaded(true);
                    setTache(result);
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
    }, [id])



    function closeForm() {
        navigate('/taches');
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <section className="py-5 container">
                <Tache tache={tache} cancel={closeForm} del={closeForm} update={closeForm} utilisateurs={utilisateurs} />
            </section >
        )
    }

}

