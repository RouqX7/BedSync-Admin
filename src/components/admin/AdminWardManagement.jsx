import React, { useState } from 'react';
import { db } from './firebase-config';

function AdminWardManagement() {
  const [wardName, setWardName] = useState('');
  const [totalBeds, setTotalBeds] = useState(0);
  const [availableBeds, setAvailableBeds] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newWardData = {
      totalBeds: totalBeds,
      available: availableBeds,
      occupied: totalBeds - availableBeds,
      // You might want to store room details separately
    };

    // Save to Firestore
    try {
      await db.collection('wards').doc(wardName.toLowerCase()).set(newWardData);
      console.log('Ward data saved successfully');
    } catch (error) {
      console.error('Error saving ward data', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={wardName}
        onChange={(e) => setWardName(e.target.value)}
        placeholder="Ward Name"
      />
      <input
        type="number"
        value={totalBeds}
        onChange={(e) => setTotalBeds(e.target.value)}
        placeholder="Total Beds"
      />
      <input
        type="number"
        value={availableBeds}
        onChange={(e) => setAvailableBeds(e.target.value)}
        placeholder="Available Beds"
      />
      <button type="submit">Save Ward Details</button>
    </form>
  );
}

export default AdminWardManagement;
