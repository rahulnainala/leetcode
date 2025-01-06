import "./App.css";
import CardStack from "./pages/CardStack";
import ProblemPage from "./pages/ProblemPage";
import DataStructureDetails from "./pages/DataStructureDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CardStack />} />
        <Route
          path="/data-structures/:name"
          element={<DataStructureDetails />}
        />
        <Route path="/problem/:problemName" element={<ProblemPage />} />
      </Routes>
    </Router>
  );
}

export default App;
