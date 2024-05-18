import Home from "./pages/Home";
import InfoTeam from "./pages/InfoTeams";
import Stadiums from "./pages/Stadiums";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teams" element={<InfoTeam />} />
        <Route path="/stadiums" element={<Stadiums />} />
      </Routes>
    </Router>
  );
}

export default App;

