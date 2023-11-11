import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/homePage/HomePage';
import ElectionHelper from "../pages/electionhelper/ElectionHelper";
import PartiesPage from "../pages/partiesPage/PartiesPage";
import PositionsPage from "../pages/positionsPage/PositionsPage";
import NavBar from "../Components/NavBar/NavBar";
import TestPage from "../pages/testPage/TestPage";
import { ScoreProvider } from '../context/ScoreContext';
import { LanguageProvider } from '../contexts/LanguageContext'; // Voeg je taalcontext toe
import { ThemeProvider } from '../contexts/ThemeContext'; // Voeg je themacontext toe
import { ModeProvider } from '../contexts/ModeContext'; // Voeg je moduscontext toe

function AppRoutes() {
    return (
        <LanguageProvider> {/* Taalcontext omhult alles */}
            <NavBar /> {/* NavBar buiten ThemeProvider */}
            <ThemeProvider> {/* Themacontext omhult alleen de Routes */}
                <ModeProvider> {/* Moduscontext omhult ook de Routes */}
                    <Router>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/kies-hulp" element={<ElectionHelper />} />
                            <Route path="/partij-pagina" element={<PartiesPage />} />
                            <Route path="/standpunten-pagina" element={<PositionsPage />} />
                            <Route path="/testpagina" element={<TestPage />} />
                            {/* Voeg hier meer routes toe */}
                        </Routes>
                    </Router>
                </ModeProvider>
            </ThemeProvider>
            <ScoreProvider> {/* ScoreProvider kan hier of binnen ThemeProvider afhankelijk van de vereisten */}
                {/* Optioneel: Andere componenten of routes die ScoreProvider vereisen */}
            </ScoreProvider>
        </LanguageProvider>
    );
}

export default AppRoutes;
