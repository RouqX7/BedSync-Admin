import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

const DatatableResource = () => {
  const [users, setUsers] = useState([]);
  const [wards, setWards] = useState([]);
  const [beds, setBeds] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, "users");
      const usersSnapshot = await getDocs(usersCollection);
      const usersList = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersList);
    };

    const fetchPatients = async () => {
      const patientsCollection = collection(db, 'patients');
      const patientsSnapshot = await getDocs(patientsCollection);
      const patientsList = patientsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPatients(patientsList);
    };



    const fetchWards = async () => {
      const wardsCollection = collection(db, "wards");
      const wardsSnapshot = await getDocs(wardsCollection);
      const wardsList = wardsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setWards(wardsList);
    };

    const fetchHospitals = async () => {
      try {
        const hospitalsCollection = collection(db, "hospitals");
        const hospitalsSnapshot = await getDocs(hospitalsCollection);
        const hospitalsList = hospitalsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setHospitals(hospitalsList);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      }
    };

    fetchUsers();
    fetchWards();
    fetchPatients();
    fetchHospitals();
  }, []);

};

// Define column configurations

export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },

  {
    field: "user",

    headerName: "User",

    width: 100,

    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
        </div>
      );
    },
  },

  {
    field: "firstName",

    headerName: "First Name",

    width: 100,
  },

  {
    field: "lastName",

    headerName: "Last Name",

    width: 100,
  },

  {
    field: "email",

    headerName: "Email",

    width: 200,
  },

  {
    field: "address",

    headerName: "Address",

    width: 100,
  },

  {
    field: "role",

    headerName: "Role",

    width: 100,
  },

  {
    field: "phoneNumber",

    headerName: "Phone Number",

    width: 100,
  },
  {
    field: "hospitalId",

    headerName: "Hospital ID",

    width: 100,
  },
];

export const wardColumns = [
  { field: "id", headerName: "ID", width: 70 },

  {
    field: "name",

    headerName: "Ward Name",

    width: 150,
  },



  {
    field: "capacity",

    headerName: "Capacity",

    width: 100,
  },

  {
    field: "description",

    headerName: "Description",

    width: 160,
  },
  {
    field:"hospitalId",
    headerName:"Hospital ID",
    width:160
  },

  {
    field: "currentOccupancy",

    headerName: "Current Occupancy",

    width: 160,
  },

  {
    field: "responsibleDepartment",

    headerName: "Responsible Department",

    width: 200,
  },

  {
    field: "totalBeds",

    headerName: "Total Beds",

    width: 120,
  },

  {
    field: "availableBeds",

    headerName: "Available Beds",

    width: 140,
  },

];

export const bedColumns = [
  { field: "id", headerName: "ID", width: 70 },

  {
    field: "wardId",

    headerName: "Ward Name",

    width: 150,

    valueGetter: (params) => {
      return mapWardIdToName(params.row.wardId);
    },
  },

  {
    field: "available",

    headerName: "Available",

    width: 120,
  },

  {
    field: "bedNumber",

    headerName: "Bed Number",

    width: 150,
  },

  {
    field: "bedType",

    headerName: "Bed Type",

    width: 120,
  },

  {
    field: "clean",

    headerName: "Clean",

    width: 150,
  },

  {
    field: "patientId",

    headerName: "Patient ID",

    width: 150,
  },

  {
    field: "timestamp",

    headerName: "Timestamp",

    width: 200,
  },
];

export const PatientColumns = [
  {
    field: "firstName",

    headerName: "First Name",

    width: 150,
  },

  {
    field: "lastName",

    headerName: "Last Name",

    width: 150,
  },

  {
    field: "dateOfBirth",

    headerName: "Date of Birth",

    width: 150,
  },

  {
    field: "contactInformation",

    headerName: "Contact Information",

    width: 200,
  },

  {
    field: "medicalHistory",

    headerName: "Medical History",

    width: 200,
  },

  {
    field: "admissionHistory",

    headerName: "Admission History",

    width: 200,
  },
  {
    field: "hospitalId",

    headerName: " Hospital ID",

    width: 200,
  },

  {
    field: "timestamp",

    headerName: "Timestamp",

    width: 200,
  },
];

export default DatatableResource;
