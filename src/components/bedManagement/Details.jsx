import './Details.css'
import React from 'react';

function Details() {
    return (
        <div className="details">
            <div className="patient-details">
                <h2>Patient Details</h2>
                <div className="input-group">
                    <label>Patient ID:</label>
                    <input type="text" />
                </div>
                <div className="input-group">
                    <label>Patient Name:</label>
                    <input type="text" />
                </div>
                <div className="input-group">
                    <label>Age:</label>
                    <input type="text" />
                </div>
                <div className="input-group">
                    <label>Gender:</label>
                    <input type="text" />
                </div>
                {/* ... Add other fields similarly */}
            </div>

            <div className="bed-details">
                <h2>Bed Details</h2>
                <div className="input-group">
                    <label>Department:</label>
                    <input type="text" value="General Ward" />
                </div>
                <div className="input-group">
                    <label>Location:</label>
                    <input type="text" />
                </div>
                <div className="input-group">
                    <label>Room/Beds:</label>
                    <input type="text" />
                </div>
                <div className="input-group">
                    <label>Status:</label>
                    <input type="text" />
                </div>
                <div className="input-group">
                    <label>Tags:</label>
                    <input type="text" />
                </div>
                {/* ... Add other fields similarly */}
            </div>
        </div>
    );
}

export default Details;
