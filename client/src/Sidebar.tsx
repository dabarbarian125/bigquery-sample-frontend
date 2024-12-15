import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div className="flex flex-col bg-primary text-background w-64 p-4">
      <Link to="/" className="mb-4">All Data</Link>
      {/* <Link to="/dashboard" className="mb-4">Dashboard</Link> */}
      <Link to="/about" className="mb-4">About</Link>
    </div>
  );
};

export default Sidebar;
