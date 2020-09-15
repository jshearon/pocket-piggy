import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => <React.Fragment>
  <Link to="/dashboard" className="navbar1"><i class="fas fa-tachometer-alt"></i></Link>
  <Link to="/wishlist" className="navbar2"><i class="fas fa-clipboard-list"></i></Link>
  <Link to="/jobs" className="navbar3"><i class="fas fa-broom"></i></Link>
  <Link to="/purchases" className="navbar4"><i class="fas fa-cash-register"></i></Link>
  <Link to="/goals" className="navbar5"><i class="fas fa-bullseye"></i></Link>
  </React.Fragment>;

export default Navbar;
