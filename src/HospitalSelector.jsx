import { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, onSnapshot } from 'firebase/firestore';
const HospitalSelector = ({ selectedHospital, onHospitalChange }) => {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'hospitals'), (snapshot) => {
      const fetchedHospitals = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setHospitals(fetchedHospitals);
    });

    return () => unsubscribe();
  }, []);

  const handleSelectChange = (event) => {
    const newHospitalId = event.target.value;
    onHospitalChange(newHospitalId);
  };

  return (
    <select value={selectedHospital} onChange={handleSelectChange}>
      {hospitals.map(hospital => (
        <option key={hospital.id} value={hospital.id}>{hospital.name}</option>
      ))}
    </select>
  );
};

export default HospitalSelector;
