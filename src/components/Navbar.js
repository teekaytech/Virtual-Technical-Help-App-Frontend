import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav>
    <Link to="/">
      <h1>Home</h1>
    </Link>
    <Link to="/user/:user_id/dashboard">
      <h1>Dashboard</h1>
    </Link>
  </nav>
);

export default Navbar;
