import React from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import ServiceEdit from './components/ServiceEdit';
import ServiceList from './components/ServiceList';
import Page404 from './components/Page404';
import 'mini.css';

export default function App() {
  return (
    <Router>
      <div className="page">
        <Routes>
          <Route path="/services/:id" element={<ServiceEdit />} />
          <Route path="/services" element={<ServiceList />} />
          <Route path="/" element={<Navigate to="/services" />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </Router>
  );
}
