import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomePage from '../pages/homePage/HomePage';
import ElectionHelper from "../pages/electionhelper/ElectionHelper";
import PartiesPage from "../pages/partiesPage/PartiesPage";
import PositionsPage from "../pages/positionsPage/PositionsPage";

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/kies-hulp" element={<ElectionHelper />} />
                <Route path="/partij-pagina" element={<PartiesPage />} />
                <Route path="/standpunten-pagina" element={<PositionsPage />} />
                {/* Voeg hier meer routes toe */}
            </Routes>
        </Router>
    );
}

export default AppRoutes;
