import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomePage from '../pages/homePage/HomePage';
import ElectionHelper from "../pages/electionhelper/ElectionHelper";

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/kies-hulp" element={<ElectionHelper />} />
                {/* Voeg hier meer routes toe */}
            </Routes>
        </Router>
    );
}

export default AppRoutes;
