import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomePage from '../pages/homePage/HomePage';
import ElectionHelper from "../pages/electionhelper/ElectionHelper";
import PartiesPage from "../pages/partiesPage/PartiesPage";
import PositionsPage from "../pages/positionsPage/PositionsPage";
import NavBar from "../Components/NavBar/NavBar";
import React from "react";
import TestPage from "../pages/testPage/TestPage";

function AppRoutes() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/kies-hulp" element={<ElectionHelper />} />
                <Route path="/partij-pagina" element={<PartiesPage />} />
                <Route path="/standpunten-pagina" element={<PositionsPage />} />
                <Route path="/testpagina" element={<TestPage />} />
                {/* Voeg hier meer routes toe */}
            </Routes>
        </Router>
    );
}

export default AppRoutes;
