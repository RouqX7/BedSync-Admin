import './AdmissionMaster.css';
import React,{ useState } from 'react';

function AdmissionMaster({selectedWard, onWardClick}) {
     // Step 1: Create a state variable to store the total bed count
    const [totalBeds, setTotalBeds] = useState(0);

    // Step 2: Provide a way for the admin to add beds and update the total bed count
    const addBeds = (count) => {
    // You can implement the logic to add beds here.
    // For example, if you have an input field where the admin can enter the number of beds,
    // you can update the total bed count like this:
    setTotalBeds(totalBeds + count);
  };

    return (
        <div className="admission-master">
            <div className="tabs">
            <button 
                    className={`tab ${selectedWard === 'General Ward' ? 'active' : ''}`} 
                    onClick={() => onWardClick('General Ward')}
                >
                    General Ward
                </button>
                <button 
                    className={`tab ${selectedWard === 'Labour Ward' ? 'active' : ''}`} 
                    onClick={() => onWardClick('Labour Ward')}
                >
                    Labour Ward
                </button>
                {/* ... other tabs */}
            </div>

            <div className="ward-details">
            {selectedWard === 'General Ward' && (
          <>
            <h2>General Ward Room 1 (9)</h2>
            <div className="status">
              <span className="available">(7) Available</span>
              <span className="occupied">(2) Occupied</span>
            </div>
          </>
        )}
        {selectedWard === 'Labour Ward' && (
          <>
            {/* Step 3: Display the total bed count for the selected ward */}
            <h2>Labour Ward Room 1 (9)</h2>
            <div className="status">
              <span className="available">{totalBeds - 2} Available</span>
              <span className="occupied">2 Occupied</span>
            </div>
          </>
        )}
        {/* ... other ward details */}
      </div>
    </div>
  );
}
export default AdmissionMaster;
