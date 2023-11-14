import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/homePage/HomePage';
import ElectionHelper from "../pages/electionhelper/ElectionHelper";
import PartiesPage from "../pages/partiesPage/PartiesPage";
import PositionsPage from "../pages/positionsPage/PositionsPage";
import NavBar from "../Components/NavBar/NavBar";
import TestPage from "../pages/testPage/TestPage";
import { ScoreProvider } from '../context/ScoreContext';
import {LanguageProvider} from "../context/LanguageContext";
import {ThemeProvider} from "../context/ThemeContext";
import {ModeProvider} from "../context/ModeContext";
import ScorePage from "../pages/scorePage/ScorePage";

function AppRoutes() {
    return (
        <LanguageProvider>
            <Router>
                <NavBar />
                <ScoreProvider> {/* ScoreProvider alleen voor de Routes */}
                    <ThemeProvider>
                        <ModeProvider>
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/kies-hulp" element={<ElectionHelper />} />
                                <Route path="/partij-pagina" element={<PartiesPage />} />
                                <Route path="/standpunten-pagina" element={<PositionsPage />} />
                                {/*<Route path="/testpagina" element={<TestPage />} />*/}
                                <Route path="/score-page" element={<ScorePage />} />
                                {/* Meer routes */}
                            </Routes>
                        </ModeProvider>
                    </ThemeProvider>
                </ScoreProvider>
            </Router>
        </LanguageProvider>
    );
}

export default AppRoutes;
