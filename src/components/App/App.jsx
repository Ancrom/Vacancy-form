import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "../Nav/Nav";
import VacancyForm from "../pages/VacancyForm/VacancyForm";
import VacancyList from "../pages/VacancyList/VacancyList";

import "./App.scss";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<VacancyList />} />
        <Route path="/vacancyform/new" element={<VacancyForm />} />
        <Route path="/vacancyform/:id" element={<VacancyForm />} />
      </Routes>
    </Router>
  );
}

export default App;
