import React from 'react';

import {
    Routes,
    Route,
} from "react-router-dom";

import HomePage from './pages/HomePage';
import ActifsPage from './pages/ActifsPage';
import AdminPage from './pages/AdminPage';
import EvolPage from './pages/EvolPage';
import TransactionPage from "./pages/TransactionPage";

function Routeur() {

    return <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="actifs" element={<ActifsPage />} />
        <Route path="administration" element={<AdminPage />} />
        <Route path="evolution" element={<EvolPage />} />
        <Route path="transaction" element={<TransactionPage />} />
    </Routes>

}


export default Routeur