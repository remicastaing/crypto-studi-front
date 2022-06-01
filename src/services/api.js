

export const APIService = {
    getUtilisateurs: () => {
        return fetch(process.env.REACT_APP_API_BASE_URL + "utilisateurs/")
            .then(res => res.json())

    },


    getUtilisateur: (id) => {
        return fetch(process.env.REACT_APP_API_BASE_URL + "utilisateurs/" + id)
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
        const response = await fetch(process.env.REACT_APP_API_BASE_URL + 'utilisateurs/', requestOptions);
        return await response.json();
    },

    getOperations: () => {
        return fetch(process.env.REACT_APP_API_BASE_URL + "operations/")
            .then(res => res.json())
    },

    getOperation: (id) => {
        return fetch(process.env.REACT_APP_API_BASE_URL + "operations/" + id)
            .then(res => res.json())

    },

    getTrinomes: () => {
        return fetch(process.env.REACT_APP_API_BASE_URL + "trinomes/")
            .then(res => res.json())
    },

    getTrinome: (id) => {
        return fetch(process.env.REACT_APP_API_BASE_URL + "trinomes/" + id)
            .then(res => res.json())
    },

    getTrinomeActuel: (id) => {
        return fetch(process.env.REACT_APP_API_BASE_URL + "trinomes/actuel")
            .then(res => res.json())
    },
}