import React from 'react';
import { Link } from 'react-router-dom';


function MenuButton({ icon, label,to }) {
    if(icon.startsWith("/")) {
        // it's an image path
        return (
            <Link to={to}>
                <div className="menu-button">
                    {icon.startsWith("/") ? <img src={icon} alt={label} /> : <span>{icon}</span>}
                    <span>{label}</span>
                </div>
            </Link>
        );
    }
    // it's an emoji or text icon
    return (
        <div className="menu-button">
            <span>{icon}</span>
            <p>{label}</p>
        </div>
    );
}

export default MenuButton;
