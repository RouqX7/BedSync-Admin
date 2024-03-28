import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import { PatientColumns } from "../../datatableResource"; // Importing patient columns
import { collection, getDocs, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { useRecoilState } from "recoil";
import { selectedHospitalState } from "../../../atoms/atoms";
import "./datatable.scss";

const PatientDatatable = () => {
  const [patients, setPatients] = useState([]);
  const [selectedHospital, setSelectedHospital] = useRecoilState(selectedHospitalState); // Assuming you have Recoil set up for state management
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch patients from the database
    const fetchPatients = async () => {
      const patientsCollection = collection(db, 'patients');
      const patientsSnapshot = await getDocs(patientsCollection);
      const patientsList = patientsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPatients(patientsList);
    };

    fetchPatients();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'patients'), (snapshot) => {
      const patients = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const filteredPatients = patients.filter(patient => {
        // Apply hospital filter if a hospital is selected
        return !selectedHospital || patient.hospitalId === selectedHospital;
      });
      setPatients(filteredPatients);
    }, (error) => {
      console.log(error);
    });

    return () => unsubscribe();
  }, [selectedHospital]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "patients", id));
      setPatients(patients.filter((patient) => patient.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddPatient = () => {
    navigate("/AdminPatients/new"); // Navigate to the route for adding a new patient
  };

  const patientActionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => (
        <div className="cellAction">
          <Link
            to={`/AdminPatients/${params.row.id}`}
            style={{ textDecoration: "none" }}
          >
            <div className="viewButton">View</div>
          </Link>
          <div
            className="deleteButton"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="datatable">
        <div className="datatableTitle">
          All Patients
          <div className="link" onClick={handleAddPatient}>
            Add Patient
          </div>
        </div>
        <DataGrid
          className="datagrid"
          rows={patients}
          columns={PatientColumns.concat(patientActionColumn)} // Using patient columns
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
      </div>
    </div>
  );
};

export default PatientDatatable;
