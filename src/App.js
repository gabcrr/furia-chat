import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FuriaChatWelcome from './pages/FuriaChatWelcome';
import FuriaChatHome from './pages/FuriaChatHome';
import { ROUTES } from './constants/routes';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path={ROUTES.WELCOME} element={<FuriaChatWelcome />} />
          <Route path={ROUTES.HOME} element={<FuriaChatHome />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
