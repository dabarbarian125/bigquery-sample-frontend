import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import AllDataPage from './pages/AllDataPage';

//const DashboardPage = () => <div>Dashboard Page</div>;
const AboutPage = () => <div>About Page</div>;

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<AllDataPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
//<Route path="/dashboard" element={<DashboardPage />} />
export default App;
