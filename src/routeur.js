import React from 'react';

import {
    Routes,
    Route,
} from "react-router-dom";

import HomePage from './pages/HomePage';
import UtilisateursPage from './pages/UtilisateursPage';
import UtilisateurDetailsPage from "./pages/UtilisateurDetailsPage";
import ListesPage from "./pages/ListesPage";
import ListeDetailsPage from "./pages/ListeDetailsPage";
import TachesPage from "./pages/TachesPage";
import TacheDetailsPage from "./pages/TacheDetailsPage";

function Routeur() {

    return <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="listes" element={<ListesPage />} />
        <Route path="liste/:id" element={<ListeDetailsPage />} />
        <Route path="taches" element={<TachesPage />} />
        <Route path="tache/:id" element={<TacheDetailsPage />} />
        <Route path="utilisateurs/:id" element={<UtilisateurDetailsPage />} />
        <Route path="utilisateurs" element={<UtilisateursPage />} />
    </Routes>

}


export default Routeur