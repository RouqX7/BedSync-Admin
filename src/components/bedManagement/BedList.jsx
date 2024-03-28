import React from 'react';
import './BedList.css';


function BedList({ selectedWard, wardData }) {
   // Check if the wardData for the selectedWard exists before trying to access its properties.
    const beds = wardData[selectedWard.toLowerCase()];
     // Handle the scenario where beds is undefined by rendering null or some placeholder.
    if (!beds) {
        return <div>Loading ward data or not found...</div>;
    }

    // Now it's safe to use beds as it's confirmed to be defined
     const bedStatuses = Array(beds.totalBeds).fill().map((_, index) => {
        return index < beds.available ? 'available' : 'occupied';
     });

    return (
        <div className="bed-list">
            <h3>{`${selectedWard} - Total Beds (${beds.totalBeds})`}</h3>
            <div className="bed-statuses">
                {bedStatuses.map((status, index) => (
                    <div key={index} className={`bed ${status}`}>
                        Bed {index + 1} - {status.charAt(0).toUpperCase() + status.slice(1)}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BedList;