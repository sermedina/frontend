import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomeEncargado from "./components/HomeEncargado";
import HomeJefe from "./components/HomeJefe";
import HomeSecretaria from "./components/HomeSecretaria";
import Login from "./components/Login";
import NoMatch from "./components/NoMatch";

function App() {
  return (
    <Router>
      <div>
        {/* A <Routes> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<HomeEncargado />} />
          <Route path="/home" element={<HomeJefe />} />
          <Route path="/basic" element={<HomeSecretaria />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
