import "./App.css";
import Layout from "./components/Layout/Layout";
import CardStack from "./pages/CardStack/CardStack";
import ProblemPage from "./pages/ProblemPage/ProblemPage";
import AddData from "./pages/AddData/AddData";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DataStructureDetails from "./pages/DetailsPage/DataStructureDetails";
import LoginPage from "./pages/LoginPage/LoginPage";
import { useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("authToken") !== null
  );

  return (
    <Router>
      <Layout
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      >
        <Routes>
          <Route path="/" element={<CardStack />} />
          <Route
            path="/data-structures/:name"
            element={<DataStructureDetails />}
          />
          <Route path="/problem/:problemName" element={<ProblemPage />} />
          <Route
            path="/login"
            element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            path="/adddata"
            element={
              isAuthenticated ? (
                <AddData />
              ) : (
                <LoginPage setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
