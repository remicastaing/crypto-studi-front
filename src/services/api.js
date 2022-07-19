

export const APIService = {
    getUtilisateurs: () => {
        return fetch(process.env.REACT_APP_API_BASE_URL + "utilisateurs/")
            .then(res => res.json())

    },


    getUtilisateur: (id) => {
        return fetch(process.env.REACT_APP_API_BASE_URL + "utilisateurs/" + id)
            .then(res => res.json())

    },

    getTachesParUtilisateur: (id) => {
        return fetch(process.env.REACT_APP_API_BASE_URL + "utilisateurs/" + id + "/taches")
            .then(res => res.json())

    },

    createUtilisateur: async (prenom, nom, email) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                prenom: prenom,
                nom: nom,
                email: email,
            })
        };
        return fetch(process.env.REACT_APP_API_BASE_URL + 'utilisateurs/', requestOptions).then(res => res.json());
    },

    updateUtilisateur: (utilisateur) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nom: utilisateur.prenom,
                attribution: utilisateur.nom,
                statut: utilisateur.email
            })
        };

        return fetch(process.env.REACT_APP_API_BASE_URL + 'utilisateurs/' + utilisateur.id, requestOptions).then(res => res.json());
    },

    deleteUtilisateur: (id) => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };
        return fetch(process.env.REACT_APP_API_BASE_URL + 'utilisateurs/' + id, requestOptions);
    },

    getListes: () => {
        return fetch(process.env.REACT_APP_API_BASE_URL + "listes/")
            .then(res => res.json())
    },

    getListe: (id) => {
        return fetch(process.env.REACT_APP_API_BASE_URL + "listes/" + id)
            .then(res => res.json())
    },

    createListe: (nom) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nom: nom,
            })
        };
        return fetch(process.env.REACT_APP_API_BASE_URL + 'listes/', requestOptions).then(res => res.json());
    },

    updateListe: (liste) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nom: liste.nom,
            })
        };
        return fetch(process.env.REACT_APP_API_BASE_URL + 'listes/' + liste.id, requestOptions).then(res => res.json());
    },

    deleteListe: (id) => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };
        return fetch(process.env.REACT_APP_API_BASE_URL + 'listes/' + id, requestOptions);
    },

    getTachesInListe: (id) => {
        return fetch(process.env.REACT_APP_API_BASE_URL + "listes/" + id + "/taches")
            .then(res => res.json())
    },

    getTaches: () => {
        return fetch(process.env.REACT_APP_API_BASE_URL + "taches/")
            .then(res => res.json())
    },

    getTache: (id) => {
        return fetch(process.env.REACT_APP_API_BASE_URL + "taches/" + id)
            .then(res => res.json())
    },

    createTache: (nom, liste, statut, attribution) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nom: nom,
                liste: liste.id,
                statut: statut,
                attribution: attribution
            })
        };
        return fetch(process.env.REACT_APP_API_BASE_URL + 'taches/', requestOptions).then(res => res.json());
    },

    updateTache: (tache) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nom: tache.nom,
                attribution: tache.attribution,
                statut: tache.statut
            })
        };

        return fetch(process.env.REACT_APP_API_BASE_URL + 'taches/' + tache.id, requestOptions).then(res => res.json());
    },

    deleteTache: (id) => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };
        return fetch(process.env.REACT_APP_API_BASE_URL + 'taches/' + id, requestOptions);
    },
}