import "./App.css";
import Layout from "./components/Layout/Layout";
import CardStack from "./pages/CardStack/CardStack";
import ProblemPage from "./pages/ProblemPage/ProblemPage";
import UserPage from "./pages/userData/userPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DataStructureDetails from "./pages/DetailsPage/DataStructureDetails";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<CardStack />} />
          <Route
            path="/data-structures/:name"
            element={<DataStructureDetails />}
          />
          <Route path="/problem/:problemName" element={<ProblemPage />} />
          <Route path="/user-profile" element={<UserPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
