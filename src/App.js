import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SearchPage from './pages/Searchpage';
import DrugDetailsPage from './pages/DrugDetailPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/drugs/search" element={<SearchPage />} />
        <Route path="/drugs/:drugName" element={<DrugDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;

