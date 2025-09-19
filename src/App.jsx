import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Home from './Pages/Home';
import Stations from './Pages/Stations';
import Customers from './Pages/Customers';
import Analytics from './Pages/Analytics';
import Invoices from './Pages/Invoices';
import Logs from './Pages/Logs';
import Session from './Pages/Session'
import './App.css'

function App() {
  return (
    <Router>
      <div className="container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stations" element={<Stations />} />
             <Route path="/session" element={<Session />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/logs" element={<Logs />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
