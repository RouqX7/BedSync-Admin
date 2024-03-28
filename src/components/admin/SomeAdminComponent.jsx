// SomeAdminComponent.jsx
import React, { useEffect, useState } from 'react';
import { db } from './firebase-config';

function SomeAdminComponent() {
  const [wards, setWards] = useState({});

  useEffect(() => {
    const unsubscribe = db.collection('wards').onSnapshot(snapshot => {
      const wardsData = {};
      snapshot.forEach(doc => wardsData[doc.id] = doc.data());
      setWards(wardsData);
    }, error => {
      console.error("Error listening to wards", error);
    });

    return () => unsubscribe();
  }, []);

  // Rest of the component rendering the data
}
export default SomeAdminComponent;