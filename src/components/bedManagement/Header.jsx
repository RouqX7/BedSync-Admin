import React from 'react';
import './Header.css';

function Header({ onNavigate}) {
    return (
        <div className="header">
      <button onClick={() => onNavigate('home')}>Home</button>
      <button onClick={() => onNavigate('admit')}>Admit</button>
      <button onClick={() => onNavigate('bedManagement')}>Bed Management</button>
    </div>
    );
}

export default Header;
