import React from 'react';
import Table from 'react-bootstrap/Table'

function ListeTaches({ taches, utilisateurs, onClick, attribution, listes }) {

    function nomUtilisateur(id) {
        let u
        u =  utilisateurs.filter(u=>u.id===id)
        if (u.length>0) 
            return u[0].prenom + ' ' + u[0].nom
        else
            return ''
    }

    function nomListe(id) {
        let l
        l =  listes.filter(l=>l.id===id)
        if (l.length>0) 
            return l[0].nom
        else
            return ''
    }

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Date</th>
                    {listes?  <th>Liste</th> : ''}
                    <th>Nom de la tâche</th>
                    {attribution ? <th>Attribution</th>: ''}
                    <th>Statut</th>
                </tr>
            </thead>
            <tbody>
                {taches.map(tache => (
                    <tr key={tache.id} onClick={(e) => onClick(tache)}>
                        <td>{tache.date}</td>
                        {listes?  <td>{nomListe(tache.liste)}</td> : ''}
                        <td>{tache.nom}</td>
                        {attribution ?  <td>{nomUtilisateur(tache.attribution)}</td> : ''}
                        <td>{tache.statut ? 'Réalisée' : 'A faire'}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}


export default ListeTaches