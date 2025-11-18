import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateProfessor from "./pages/CreateProfessor";
import ListProfessors from "./pages/ListProfessors";
import ViewProfessor from "./pages/ViewProfessor";
import EditProfessor from "./pages/EditProfessor";

export default function App() {
  const [professores, setProfessores] = useState([]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/create"
          element={<CreateProfessor professores={professores} setProfessores={setProfessores} />}
        />
        <Route
          path="/list"
          element={<ListProfessors professores={professores} setProfessores={setProfessores} />}
        />
        <Route path="/view/:id" element={<ViewProfessor professores={professores} />} />
        <Route
          path="/edit/:id"
          element={<EditProfessor professores={professores} setProfessores={setProfessores} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
