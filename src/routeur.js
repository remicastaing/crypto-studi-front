import React from 'react';

import {
    Routes,
    Route,
} from "react-router-dom";

import HomePage from './pages/HomePage';
import OperationPage from './pages/OperationPage'
import VentilationPage from "./pages/VentilationPage";
import UtilisateursPage from './pages/UtilisateursPage';
import TrinomePage from "./pages/TrinomePage";

class Routeur extends React.Component {
    render() {
        return <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="home" element={<HomePage />} />
            <Route path="operation" element={<OperationPage />} />
            <Route path="trinome" element={<TrinomePage />} />
            <Route path="ventilation" element={<VentilationPage />} />
            <Route path="utilisateurs" element={<UtilisateursPage />} />
        </Routes>
    }
}


export default Routeur