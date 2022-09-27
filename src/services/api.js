

export const APIService = {
    getCumuls: () => {
        return fetch(process.env.REACT_APP_API_BASE_URL + "cumul/")
            .then(res => res.json())

    },


    getCumul: (id) => {
        return fetch(process.env.REACT_APP_API_BASE_URL + "cumul/" + id)
            .then(res => res.json())

    },

    getValuation: () => {
        return fetch(process.env.REACT_APP_API_BASE_URL + "valuation/")
            .then(res => res.json())

    },

    getCotation: () => {
        return fetch(process.env.REACT_APP_API_BASE_URL + "cotation/")
            .then(res => res.json())

    },

    getTransaction: () => {
        return fetch(process.env.REACT_APP_API_BASE_URL + "transaction/")
            .then(res => res.json())

    },

    createTransaction: async (date, crypto, quantite, prix) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                date: date,
                crypto: crypto,
                quantite: quantite,
                prix: prix
            })
        };
        return fetch(process.env.REACT_APP_API_BASE_URL + 'transaction/', requestOptions).then(res => res.json());
    },

    updateTransaction: async (id, date, crypto, quantite, prix) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                date: date,
                crypto: crypto,
                quantite: quantite,
                prix: prix
            })
        };
        return fetch(process.env.REACT_APP_API_BASE_URL + 'transaction/' + id, requestOptions).then(res => res.json());
    },

    deleteTransaction: async (id, date, crypto, quantite, prix) => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };
        return fetch(process.env.REACT_APP_API_BASE_URL + 'transaction/' + id, requestOptions);
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

}