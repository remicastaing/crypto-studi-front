

export const APIService = {
    getUtilisateurs: () => {
        return fetch(process.env.REACT_APP_API_BASE_URL + "utilisateurs/")
            .then(res => res.json())

    },


    getUtilisateur: (id) => {
        return fetch(process.env.REACT_APP_API_BASE_URL + "utilisateurs/" + id)
            .then(res => res.json())

    }
}