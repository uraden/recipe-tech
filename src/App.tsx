import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListPage from "./components/ListPage";
import DetailPage from "./components/DetailPage";
import FormPage from "./components/FormPage";
import NavBarPage from "./components/NavBarPage";

function App() {
  return (
    <>
    <Router>
      <NavBarPage />
      <Routes>
        <Route path='/' element={<ListPage />} />
        <Route path='/form' element={<FormPage />} />
        <Route path='/form/:id' element={<FormPage />} />
        <Route path='/detail/:id' element={<DetailPage />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
